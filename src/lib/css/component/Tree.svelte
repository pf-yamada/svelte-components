<script lang="ts">
  import { setContext, onMount } from "svelte";
  import TreeItem from "./TreeItem.svelte";
  import { generateId, type MouseEventWithCurrentTarget } from "../css.svelte";

  import {
    type TreeNode,
    type DropPosition,
    type DragContext,
    type TreeContext,
  } from "../type/Tree";

  let {
    root = $bindable(),
    onMenu,
  }: {
    root: TreeNode[];
    onMenu?: (e: MouseEventWithCurrentTarget, node: TreeNode) => Promise<void>;
  } = $props();

  let selectedIds = $state(new Set<string>());

  const drag = $state<DragContext>({
    active: false,
    started: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    sourceId: null,
    sourceElement: null,
    preview: null,
    dragIds: [],
    targetId: null,
    position: null,
    moved: false,
  });

  const DRAG_THRESHOLD = 5;
  const PREVIEW_OFFSET_X = 12;
  const PREVIEW_OFFSET_Y = 12;

  /**
   * idで識別されるノードを選択中SETに追加する
   * CTRLが押されていたら追加で選択する
   *
   * @param id
   * @param isAddSelect
   */
  function selectNode(node: TreeNode, isAddSelect = false) {
    const id = node.id;
    if (isAddSelect) {
      const next = new Set(selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      selectedIds = next;
    } else {
      selectedIds = new Set([id]);
    }
  }

  /**
   * idで識別されるノードを削除する子ノード群から再帰的に検索して削除する
   * 削除できたらそのノードを返す。
   * このとき選択中の一覧からは消していないがいいのか？TODO
   *
   * @param items
   * @param id
   */
  function removeNode(
    items: TreeNode[] | undefined,
    id: string,
  ): TreeNode | undefined {
    if (!items) return undefined;

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) return items.splice(i, 1)[0];

      const result = removeNode(items[i].children, id);
      if (result) return result;
    }
  }

  /**
   * 子ノード群を再帰的に検索して、指定されたIDのノードを探して返す。
   * なければundefinedを返す。
   *
   * @param items
   * @param id
   */
  function findNode(
    items: TreeNode[] | undefined,
    id: string,
  ): TreeNode | undefined {
    if (!items) return undefined;

    for (const node of items) {
      if (node.id === id) return node;

      const result = findNode(node.children, id);
      if (result) return result;
    }
  }

  /**
   * 子ノード群の子を検索してIDが見つかったら子ノードを親として返す。
   * あまり人間的ではないけど、指定するのは子ノード群なのでルートは見つけられない？
   * いや、rootノードは配列（それ自体が子ノード群）なのでその心配はない。
   * 親子関係を持ってたどるよりはシンプルな実装と言えるしJSON化も気にしなくていい。
   *
   * @param items
   * @param id
   */
  function findParent(
    items: TreeNode[] | undefined,
    id: string,
  ): TreeNode | undefined {
    if (!items) return undefined;

    for (const node of items) {
      if (node.children?.some((child) => child.id === id)) return node;

      const parent = findParent(node.children, id);
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
    const parent = findParent(root, target.id);
    const siblings = parent ? parent.children! : root;
    if (!siblings) return undefined;

    const index = siblings.findIndex((i) => i.id === target.id);
    if (index < 0) return undefined;

    const item = newItem(label);
    siblings.splice(index + 1, 0, item);
    return item;
  }

  export function remove(node: TreeNode) {
    removeNode(root, node.id);
    selectedIds.delete(node.id);
    selectedIds = new Set(selectedIds);
  }

  /**
   * あるノードが、idで指定されたノードを持っているか再帰的に調べる。
   * 自分自身もIDのチェック対象となる。
   *
   * @param item
   * @param id
   */
  function contains(item: TreeNode, id: string): boolean {
    if (item.id === id) return true;
    return item.children?.some((child) => contains(child, id)) ?? false;
  }

  /**
   * 複数のノードを指定されたIDのノードのpositionに移動する。
   * positionには"before" | "inside" | "after"があるそれぞれ、
   *  before: 直前に移動
   *  inside: 中の末尾に移動
   *  after: 直後に移動
   * @param sourceIds
   * @param targetId
   * @param position
   */
  function move(sourceIds: string[], targetId: string, position: DropPosition) {
    if (sourceIds.includes(targetId)) return;

    const target = findNode(root, targetId);
    if (!target) return;

    const selectedNodes = sourceIds
      .map((id) => findNode(root, id))
      .filter((node): node is TreeNode => node !== undefined);

    const rootNodes = selectedNodes.filter(
      (node) =>
        !selectedNodes.some(
          (parent) => parent !== node && contains(parent, node.id),
        ),
    );

    if (rootNodes.some((node) => contains(node, targetId))) return;

    const movingNodes: TreeNode[] = [];

    for (const node of rootNodes) {
      const removed = removeNode(root, node.id);
      if (removed) movingNodes.push(removed);
    }

    if (movingNodes.length === 0) return;

    if (position === "inside") {
      target.children ??= [];
      target.children.push(...movingNodes);
      return;
    }

    const parent = findParent(root, targetId);
    const siblings = parent ? parent.children! : root;
    if (!siblings) return;

    const index = siblings.findIndex((n) => n.id === targetId);
    if (index < 0) return;

    if (position === "before") siblings.splice(index, 0, ...movingNodes);
    else siblings.splice(index + 1, 0, ...movingNodes);
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
    drag.targetId = null;
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

    // ドロップ先のIDを取得する
    const targetId = target.dataset.treeNodeId;

    // 自分自身・自分の子孫へのドロップはmove()側でも拒否するが、
    // ここではガイドを表示しない。
    if (drag.dragIds.includes(targetId)) {
      clearDropTarget();
      return;
    }

    // IDからドロップ先のアイテムを取得する
    // なければドロップ先をクリアする
    const targetNode = findNode(root, targetId);
    if (!targetNode) {
      clearDropTarget();
      return;
    }

    // 子の中にはドラッグできないのでドロップ先としては不適切
    // その場合ドロップ先をクリアする
    if (
      drag.dragIds.some((id) => {
        const source = findNode(root, id);
        return source ? contains(source, targetId) : false;
      })
    ) {
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
    drag.targetId = targetId;
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

    const dragIds = selectedIds.has(node.id) ? [...selectedIds] : [node.id];

    drag.active = true;
    drag.started = false;
    drag.pointerId = e.pointerId;
    drag.startX = drag.x = e.clientX;
    drag.startY = drag.y = e.clientY;
    drag.sourceId = node.id;
    drag.sourceElement = element;
    drag.dragIds = dragIds;
    drag.targetId = null;
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
    updateDropTarget();
    autoScroll();
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

    const targetId = drag.targetId;
    const position = drag.position;
    const ids = [...drag.dragIds];
    const wasStarted = drag.started;

    removePreview();

    drag.active = false;
    drag.started = false;
    drag.pointerId = -1;
    drag.sourceId = null;
    drag.sourceElement = null;
    drag.dragIds = [];
    clearDropTarget();

    if (!cancel && wasStarted && targetId && position) {
      move(ids, targetId, position);
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
   * selectedIdsは、参照された瞬間の選択中のID群
   * dragは、ドラッグ中の情報を参照するためのオブジェクト
   * pointerDownは、TreeNode側から呼び出される関数。
   */
  const context: TreeContext = {
    get selectedIds() {
      return selectedIds;
    },
    drag,
    pointerDown,
    selectNode,
    get onMenu() {
      return onMenu;
    },
  };

  setContext("tree", context);

  /**
   * ポップアップメニュー処理
   */
  let menu = $state(false);
  let menuXpos = $state(0);
  let menuYpos = $state(0);
  let currentNode = $state<TreeNode>(undefined!);
</script>

<div
  style:display="inline-block"
  style:border="1px solid #ccc"
  style:padding="4px"
  style:border-radius="8px"
  style:touch-action="none"
>
  {JSON.stringify(Array.from(selectedIds))}

  {#each root as node}
    <TreeItem {node} />
  {/each}
</div>
