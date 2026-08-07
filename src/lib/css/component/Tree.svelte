<script lang="ts">
  import { setContext, onMount } from "svelte";
  import TreeNode from "./TreeNode.svelte";
  import {
    css,
    type TreeItem,
    type TreeChildren,
    PopupMenu,
    generateId,
    ModalDialog,
    Button,
  } from "../css.svelte";

  type DropPosition = "before" | "inside" | "after";

  type DragContext = {
    active: boolean;
    started: boolean;
    pointerId: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    sourceId: string | null;
    sourceElement: HTMLElement | null;
    preview: HTMLElement | null;
    dragIds: string[];
    targetId: string | null;
    position: DropPosition | null;
    moved: boolean;
  };

  type TreeContext = {
    selectedIds: Set<string>;
    drag: DragContext;
    pointerDown: (e: PointerEvent, node: TreeItem, element: HTMLElement) => void;
  };

  let { root }: { root: TreeChildren } = $props();

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

  function selectNode(id: string, ctrl = false) {
    if (ctrl) {
      const next = new Set(selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      selectedIds = next;
    } else {
      selectedIds = new Set([id]);
    }
  }

  function removeNode(items: TreeChildren, id: string): TreeItem | undefined {
    if (!items) return undefined;

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) return items.splice(i, 1)[0];

      const result = removeNode(items[i].children, id);
      if (result) return result;
    }
  }

  function findNode(items: TreeChildren, id: string): TreeItem | undefined {
    if (!items) return undefined;

    for (const node of items) {
      if (node.id === id) return node;

      const result = findNode(node.children, id);
      if (result) return result;
    }
  }

  function findParent(items: TreeChildren, id: string): TreeItem | undefined {
    if (!items) return undefined;

    for (const node of items) {
      if (node.children?.some((child) => child.id === id)) return node;

      const parent = findParent(node.children, id);
      if (parent) return parent;
    }
  }

  function newItem(label: string): TreeItem {
    return {
      id: "TN-" + generateId(),
      label,
      children: [],
    };
  }

  function addChild(parent: TreeItem, label: string): TreeItem {
    const item = newItem(label);
    parent.children ??= [];
    parent.children.push(item);
    return item;
  }

  function addAfter(target: TreeItem, label: string): TreeItem | undefined {
    const parent = findParent(root, target.id);
    const siblings = parent ? parent.children! : root;
    if (!siblings) return undefined;

    const index = siblings.findIndex((i) => i.id === target.id);
    if (index < 0) return undefined;

    const item = newItem(label);
    siblings.splice(index + 1, 0, item);
    return item;
  }

  function contains(item: TreeItem, id: string): boolean {
    if (item.id === id) return true;
    return item.children?.some((child) => contains(child, id)) ?? false;
  }

  function move(
    sourceIds: string[],
    targetId: string,
    position: DropPosition,
  ) {
    if (sourceIds.includes(targetId)) return;

    const target = findNode(root, targetId);
    if (!target) return;

    const selectedNodes = sourceIds
      .map((id) => findNode(root, id))
      .filter((node): node is TreeItem => node !== undefined);

    const rootNodes = selectedNodes.filter(
      (node) =>
        !selectedNodes.some(
          (parent) => parent !== node && contains(parent, node.id),
        ),
    );

    if (rootNodes.some((node) => contains(node, targetId))) return;

    const movingNodes: TreeItem[] = [];

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

  function updatePreview() {
    if (!drag.preview) return;

    drag.preview.style.transform =
      `translate(${drag.x + PREVIEW_OFFSET_X}px, ${drag.y + PREVIEW_OFFSET_Y}px)`;
  }

  function removePreview() {
    drag.preview?.remove();
    drag.preview = null;
  }

  function clearDropTarget() {
    drag.targetId = null;
    drag.position = null;
  }

  function updateDropTarget() {
    if (!drag.started) return;

    const element = document.elementFromPoint(drag.x, drag.y) as HTMLElement | null;
    const target = element?.closest<HTMLElement>("[data-tree-node-id]");

    if (!target || !target.dataset.treeNodeId) {
      clearDropTarget();
      return;
    }

    const targetId = target.dataset.treeNodeId;

    // 自分自身・自分の子孫へのドロップはmove()側でも拒否するが、
    // ここではガイドを表示しない。
    if (drag.dragIds.includes(targetId)) {
      clearDropTarget();
      return;
    }

    const targetNode = findNode(root, targetId);
    if (!targetNode) {
      clearDropTarget();
      return;
    }

    if (drag.dragIds.some((id) => {
      const source = findNode(root, id);
      return source ? contains(source, targetId) : false;
    })) {
      clearDropTarget();
      return;
    }

    const rect = target.getBoundingClientRect();
    const rate = (drag.y - rect.top) / rect.height;

    let position: DropPosition;
    if (rate < 0.33) position = "before";
    else if (rate > 0.66) position = "after";
    else position = "inside";

    drag.targetId = targetId;
    drag.position = position;
  }

  function autoScroll() {
    const edge = 48;
    const speed = 12;

    if (drag.y < edge) {
      window.scrollBy(0, -speed);
    } else if (drag.y > window.innerHeight - edge) {
      window.scrollBy(0, speed);
    }
  }

  function pointerDown(e: PointerEvent, node: TreeItem, element: HTMLElement) {
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

  function pointerMove(e: PointerEvent) {
    if (!drag.active || e.pointerId !== drag.pointerId) return;

    drag.x = e.clientX;
    drag.y = e.clientY;

    if (!drag.started) {
      const dx = drag.x - drag.startX;
      const dy = drag.y - drag.startY;

      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

      drag.started = true;
      drag.moved = true;
      createPreview();
    }

    updatePreview();
    updateDropTarget();
    autoScroll();
  }

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

  function pointerUp(e: PointerEvent) {
    if (!drag.active || e.pointerId !== drag.pointerId) return;
    finishDrag(false);
  }

  function pointerCancel(e: PointerEvent) {
    if (!drag.active || e.pointerId !== drag.pointerId) return;
    finishDrag(true);
  }

  function keyDown(e: KeyboardEvent) {
    if (e.key === "Escape" && drag.active) {
      finishDrag(true);
    }
  }

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

  const context: TreeContext = {
    get selectedIds() {
      return selectedIds;
    },
    drag,
    pointerDown,
  };

  setContext("tree", context);

  let menu = $state(false);
  let x = $state(0);
  let y = $state(0);
  let node = $state<TreeItem>(undefined!);

  const items = [
    {
      label: "子を追加",
      onclick: () => {
        addChild(node, "untitled");
      },
    },
    {
      label: "兄弟を追加",
      onclick: () => {
        addAfter(node, "untitled");
      },
    },
    {
      label: "削除",
      onclick: async () => {
        const status = await deleteDialog.show();
        if (status === "ok") {
          removeNode(root, node.id);
          selectedIds.delete(node.id);
          selectedIds = new Set(selectedIds);
        }
      },
    },
  ];

  function showMenu(e: MouseEvent, n: TreeItem) {
    x = e.clientX;
    y = e.clientY;
    menu = true;
    node = n;
  }

  let showDeleteDialog = $state("ready");
  let deleteDialog: { show: () => Promise<string> };
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
    <TreeNode
      {node}
      onSelect={selectNode}
      onMenu={(e, n: TreeItem) => showMenu(e, n)}
    />
  {/each}
</div>

<PopupMenu bind:open={menu} {x} {y} {items} />

<ModalDialog
  bind:this={deleteDialog}
  bind:status={showDeleteDialog}
  caption="ノードの削除"
>
  「{node.label}」を削除してもよろしいですか？
  <div
    style:display="flex"
    style:justify-content="space-evenly"
    style:padding-top="16px"
  >
    <Button
      onclick={() => {
        showDeleteDialog = "ok";
      }}>OK</Button
    >
    <Button
      -background-color={css.fgc}
      onclick={() => {
        showDeleteDialog = "cancel";
      }}>取消</Button
    >
  </div>
</ModalDialog>
