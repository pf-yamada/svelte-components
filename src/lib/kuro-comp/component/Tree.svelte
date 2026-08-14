<script lang="ts">
  import { setContext, onMount, type Snippet } from "svelte";
  import TreeItem from "./TreeItem.svelte";
  import { at, generateId, type DivAttributes } from "../css.svelte";

  import {
    type TreeNode,
    type DropPosition,
    type DragContext,
    type TreeContext,
  } from "../type/Tree";

  let {
    root = $bindable(),
    value = $bindable(),
    selectedNodes = $bindable([]),
    item,
    onMoveChallenge,
    ...rest
  }: {
    root: TreeNode[];
    value?: TreeNode;
    selectedNodes?: TreeNode[];
    item?: Snippet<[TreeNode, DropPosition]>;
    onMoveChallenge?: (target: TreeNode, sources: TreeNode[]) => boolean;
    onSelect?: (target: TreeNode) => void;
  } & DivAttributes = $props();

  const drag = $state<DragContext>({
    active: false,
    started: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    sourceNode: null,
    sourceElement: null,
    preview: null,
    dragNodes: [],
    targetNode: null,
    position: null,
    moved: false,
  });

  const DRAG_THRESHOLD = 5;
  const PREVIEW_OFFSET_X = 12;
  const PREVIEW_OFFSET_Y = 12;

  /**
   * nodeで識別されるノードを選択中SETに追加する
   * CTRLが押されていたら追加で選択する
   *
   * @param node
   * @param isAddSelect
   */
  function selectNode(node: TreeNode, isAddSelect = false) {
    if (isAddSelect) {
      const next = new Set(selectedNodes);
      next.has(node) ? next.delete(node) : next.add(node);
      selectedNodes = Array.from(next);
    } else {
      selectedNodes = [node];
    }
    value = node;
  }

  /**
   * 子ノード群から再帰的にノードを検索して削除する
   * 削除できたらそのノードを返す。
   * このとき選択中の一覧からは消していないがいいのか？TODO
   *
   * @param items
   * @param node
   */
  function removeNode(
    items: TreeNode[] | undefined,
    node: TreeNode,
  ): TreeNode | undefined {
    if (!items) return undefined;

    for (let i = 0; i < items.length; i++) {
      if (items[i] === node) return items.splice(i, 1)[0];

      const result = removeNode(items[i].children, node);
      if (result) return result;
    }
  }

  /**
   * 任意のノードの親ノードを探して返す
   * 親子関係を持ってたどるよりはシンプルな実装と言えるしJSON化も気にしなくていい。
   *
   * @param items
   * @param target
   */
  function findParent(
    items: TreeNode[] | undefined,
    target: TreeNode,
  ): TreeNode | undefined {
    if (!items) return undefined;

    for (const node of items) {
      if (node.children?.some((child) => child === target)) return node;

      const parent = findParent(node.children, target);
      if (parent) return parent;
    }
  }

  /**
   * 新規アイテムを作成する。
   * 作成するだけでどこにどう格納するかは感知しない。
   * IDの戦闘はTNとしているTreeNodeの略。
   *
   * @param label
   */
  function newItem(label: string): TreeNode {
    return {
      id: "TN-" + generateId(),
      label,
      children: [],
    };
  }

  /**
   * あるノードが、ノードを持っているか再帰的に調べる。
   * 自分自身もIDのチェック対象となる。
   *
   * @param item
   * @param node
   */
  function contains(item: TreeNode, node: TreeNode): boolean {
    if (item === node) return true;
    return item.children?.some((child) => contains(child, node)) ?? false;
  }

  /**
   * 指定されたノードを親として、その子ノード群の末尾にノードを新規作成して追加する。
   * 親のchildrenが初期化されていないときはからの配列で初期化してから格納する。
   * 戻り値として新規作成したノードを返す。
   *
   * @param parent
   * @param label
   */
  export function addChild(parent: TreeNode, label: string): TreeNode {
    const item = newItem(label);
    parent.children ??= [];
    parent.children.push(item);
    return item;
  }

  /**
   * 指定されたノードを兄として、その次に子ノードを新規作成して追加する。
   * 戻り値として新規作成したノードを返す。
   *
   * @param target
   * @param label
   */
  export function addAfter(
    target: TreeNode,
    label: string,
  ): TreeNode | undefined {
    const parent = findParent(root, target);
    const siblings = parent ? parent.children! : root;
    if (!siblings) return undefined;

    const index = siblings.findIndex((n) => n === target);
    if (index < 0) return undefined;

    const item = newItem(label);
    siblings.splice(index + 1, 0, item);
    return item;
  }

  export function remove(node: TreeNode) {
    removeNode(root, node);
    const nodes = new Set(selectedNodes);
    if (nodes.has(node)) {
      nodes.delete(node);
      selectedNodes = Array.from(nodes);
    }
  }

  export function getParent(node: TreeNode) {
    return findParent(root, node);
  }

  /**
   * 複数のノードを指定されたIDのノードのpositionに移動する。
   * positionには"before" | "inside" | "after"があるそれぞれ、
   *  before: 直前に移動
   *  inside: 中の末尾に移動
   *  after: 直後に移動
   * @param sourceNodes
   * @param targetId
   * @param position
   */
  function move(
    sourceNodes: TreeNode[],
    target: TreeNode,
    position: DropPosition,
  ) {
    // 移動対象に移動先が入っていてはいけない
    if (sourceNodes.includes(target)) return;

    // 移動しなくていいノードを落とす
    // 親子で選択されていたら親だけ移動すればいい
    const rootNodes = sourceNodes.filter(
      (node) =>
        !sourceNodes.some(
          (parent) => parent !== node && contains(parent, node),
        ),
    );

    // 子には移動できない
    if (rootNodes.some((node) => contains(node, target))) return;

    // ここでユーザーのチェックを走らせるのがいいかもしれない
    if (onMoveChallenge && !onMoveChallenge(target, rootNodes)) return;

    // 移動するノードをツリーから取り外す
    // ここではもうキャンセルはできない
    const movingNodes: TreeNode[] = [];
    for (const node of rootNodes) {
      const removed = removeNode(root, node);
      if (removed) movingNodes.push(removed);
    }
    if (movingNodes.length === 0) return;

    // 移動さす
    if (position === "inside") {
      target.children ??= [];
      target.children.push(...movingNodes);
      return;
    }

    const parent = findParent(root, target);
    const siblings = parent ? parent.children! : root;
    if (!siblings) return;

    const index = siblings.findIndex((n) => n === target);
    if (index < 0) return;

    if (position === "before") {
      siblings.splice(index, 0, ...movingNodes);
    } else {
      siblings.splice(index + 1, 0, ...movingNodes);
    }
  }

  /**
   * ドラッグ中のエレメント(sourceElement)があれば複製しドラッグ中のアイテムとしてpreviewに設定する。
   */
  function createPreview() {
    if (!drag.sourceElement) return;

    const source = drag.sourceElement;
    const rect = source.getBoundingClientRect();
    const preview = source.cloneNode(true) as HTMLElement;

    preview.removeAttribute("data-tree-node-id");
    preview.setAttribute("aria-hidden", "true");

    Object.assign(preview.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: "0",
      pointerEvents: "none",
      opacity: "0.5",
      zIndex: "2147483647",
      boxSizing: "border-box",
      transition: "none",
      transform: `translate(${drag.x + PREVIEW_OFFSET_X}px, ${drag.y + PREVIEW_OFFSET_Y}px)`,
    });

    document.body.appendChild(preview);
    drag.preview = preview;
  }

  /**
   * ドラッグ座標が変わったら呼び出されてpreviewの位置を変更する。
   * つまりpointerMoveから呼び出される。
   * それ以外からは使われない
   */
  function updatePreview() {
    if (!drag.preview) return;
    drag.preview.style.transform = `translate(${drag.x + PREVIEW_OFFSET_X}px, ${drag.y + PREVIEW_OFFSET_Y}px)`;
  }

  /**
   * ドラッグが終わったときにcreatePreviewで作成したpreviewを削除する。
   * onMountで初期化時に呼ばれる。
   * また、finishDrag時に呼ばれる。
   */
  function removePreview() {
    drag.preview?.remove();
    drag.preview = null;
  }

  /**
   * ドロップターゲットがなくなったときに呼び出される。
   * updateDropTatgerで呼び出されることが多い。
   * finishDragでも呼び出される。
   */
  function clearDropTarget() {
    drag.targetNode = null;
    drag.position = null;
  }

  /**
   * ポインタが動くタブに、つまりpointerMoveから呼び出される。
   * ドラッグ座標下のエレメントを取得して
   *
   */
  function updateDropTarget() {
    if (!drag.started) return;

    // ドロップ先のアイテムのノードIDを取得する
    const element = document.elementFromPoint(
      drag.x,
      drag.y,
    ) as HTMLElement | null;
    const target = element?.closest<HTMLElement>("[data-tree-node-id]");

    // ドラッグ座標の下にドロップ先がないので選択を解除する
    // data-tree-node-idに空文字があり得る？TODO
    if (!target || !target.dataset.treeNodeId) {
      clearDropTarget();
      return;
    }

    // ドロップ先のIDをHTMLElementから取得する
    const targetId = target.dataset.treeNodeId;

    // IDからドロップ先のアイテムを取得する
    // なければドロップ先をクリアする
    function findNodeById(
      items: TreeNode[] | undefined,
      id: string,
    ): TreeNode | undefined {
      if (!items) return undefined;
      for (const node of items) {
        if (node.id === id) return node;
        const result = findNodeById(node.children, id);
        if (result) return result;
      }
    }

    const targetNode = findNodeById(root, targetId);
    if (!targetNode) {
      clearDropTarget();
      return;
    }

    // 自分自身・自分の子孫へのドロップはmove()側でも拒否するが、
    // ここではガイドを表示しない。
    if (drag.dragNodes.some((node) => node === targetNode)) {
      clearDropTarget();
      return;
    }

    // 子の中にはドラッグできないのでドロップ先としては不適切
    // その場合ドロップ先をクリアする
    if (drag.dragNodes.some((node) => contains(node, targetNode))) {
      clearDropTarget();
      return;
    }

    // ここまできたらドロップ先にドロップできるはず
    // ドロップ先の矩形を取得し、前か中か後のどこにドロップしようとしているか検出
    // 上25%にドロップしようとしていたら、前
    // 中50%にドロップしようとしていたら、中
    // 下25%にドロップしようとしていたら、後
    const rect = target.getBoundingClientRect();
    const rate = (drag.y - rect.top) / rect.height;

    let position: DropPosition;
    if (rate < 0.25) position = "before";
    else if (rate > 0.75) position = "after";
    else position = "inside";

    // ドロップ先と追加先情報をコンテキストに保存
    drag.targetNode = targetNode;
    drag.position = position;
  }

  /**
   * pointerMoveがら毎回呼び出されて必要ならドラッグ中にスクロールする。
   * ここでは画面の上と下のエッジを見ているがコンボー年とのエッジを見たほうがいいかもしれない。
   */
  function autoScroll() {
    const edge = 48;
    const speed = 12;

    if (drag.y < edge) {
      window.scrollBy(0, -speed);
    } else if (drag.y > window.innerHeight - edge) {
      window.scrollBy(0, speed);
    }
  }

  /**
   * ポインタ押下処理。
   * このイベントはsvelteのsetContext()を通じて子ノードから実行される。
   *
   * @param e
   * @param node
   * @param element
   */
  function pointerDown(e: PointerEvent, node: TreeNode, element: HTMLElement) {
    if (e.button !== 0) return;

    const dragNodes = new Set(selectedNodes).has(node)
      ? [...selectedNodes]
      : [node];

    drag.active = true;
    drag.started = false;
    drag.pointerId = e.pointerId;
    drag.startX = drag.x = e.clientX;
    drag.startY = drag.y = e.clientY;
    drag.sourceNode = node;
    drag.sourceElement = element;
    drag.dragNodes = dragNodes;
    drag.targetNode = null;
    drag.position = null;
    drag.moved = false;

    element.setPointerCapture(e.pointerId);
  }

  /**
   * ポインタ移動時の処理。
   * イベント登録される。
   *
   * @param e
   */
  function pointerMove(e: PointerEvent) {
    if (!drag.active || e.pointerId !== drag.pointerId) return;

    drag.x = e.clientX;
    drag.y = e.clientY;

    if (!drag.started) {
      const dx = drag.x - drag.startX;
      const dy = drag.y - drag.startY;

      // ちょこっと動くまではドラッグ開始にならない
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

      drag.started = true;
      drag.moved = true;
      createPreview();
    }

    updatePreview();
    autoScroll();
    updateDropTarget();
  }

  /**
   * ドラッグ終了時の処理
   * ドラッグ中のプレビューを廃棄して、ドロップ先に移動する処理を行う。
   *
   * 下記のイベントで呼び出される
   *  ・エスケープキーを押された
   *  ・ポインタのドラッグがキャンセルされた
   *  ・ポインタが押下が終わったとき
   *
   * @param cancel
   */
  function finishDrag(cancel = false) {
    if (!drag.active) return;

    const target = drag.targetNode;
    const position = drag.position;
    const nodes = [...drag.dragNodes];
    const wasStarted = drag.started;

    removePreview();

    drag.active = false;
    drag.started = false;
    drag.pointerId = -1;
    drag.sourceNode = null;
    drag.sourceElement = null;
    drag.dragNodes = [];
    clearDropTarget();

    if (!cancel && wasStarted && target && position) {
      if (target) move(nodes, target, position);
    }
  }

  /**
   * ポインタの押下を解除したときの処理
   * イベントから呼び出される。
   *
   * @param e
   */
  function pointerUp(e: PointerEvent) {
    if (!drag.active || e.pointerId !== drag.pointerId) return;
    finishDrag(false);
  }

  /**
   * ポインタのドラッグが何らかの理由でキャンセルされたときの処理
   * イベントから呼び出される。
   *
   * @param e
   */
  function pointerCancel(e: PointerEvent) {
    if (!drag.active || e.pointerId !== drag.pointerId) return;
    finishDrag(true);
  }

  /**
   * ドラッグ処理中にエスケープキーが押されてキャンセルされた処理
   * イベントから呼び出される。
   *
   * @param e
   */
  function keyDown(e: KeyboardEvent) {
    if (e.key === "Escape" && drag.active) {
      finishDrag(true);
    }
  }

  /**
   * マウント時には、イベントを設定する
   */
  onMount(() => {
    document.addEventListener("pointermove", pointerMove);
    document.addEventListener("pointerup", pointerUp);
    document.addEventListener("pointercancel", pointerCancel);
    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("pointerup", pointerUp);
      document.removeEventListener("pointercancel", pointerCancel);
      document.removeEventListener("keydown", keyDown);
      removePreview();
    };
  });

  /**
   * Treeでコンテキストを作成してTreeNodeから参照できるようにする
   *
   * これによってpropsで渡さなくてもよくなる。
   * selectedNodesは、参照された瞬間の選択中のNode群
   * dragは、ドラッグ中の情報を参照するためのオブジェクト
   * pointerDownは、TreeNode側から呼び出される関数。
   */
  const context: TreeContext = {
    get selectedNodes() {
      return selectedNodes;
    },
    drag,
    pointerDown,
    selectNode,
  };

  setContext("tree", context);
</script>

<div
  style:display="inline-block"
  style:padding="4px"
  style:touch-action="none"
  {...at(rest)}
>
  {#each root as node, i}
    <TreeItem bind:node={root[i]} {item} />
  {/each}
</div>
