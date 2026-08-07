<script lang="ts">
  import { getContext } from "svelte";
  import TreeNode from "./TreeNode.svelte";
  import {
    type TreeItem,
    ArrowDropDownIcon,
    MoreVertIcon,
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
    preview: HTMLElement | null;
    sourceId: string | null;
    sourceElement: HTMLElement | null;
    dragIds: string[];
    targetId: string | null;
    position: DropPosition | null;
    moved: boolean;
  };

  type TreeContext = {
    readonly selectedIds: Set<string>;
    readonly drag: DragContext;
    pointerDown: (e: PointerEvent, node: TreeItem, element: HTMLElement) => void;
  };

  let {
    node,
    level = 0,
    onSelect,
    onMenu,
  }: {
    node: TreeItem;
    level?: number;
    onSelect: (id: string, ctrl?: boolean) => void;
    onMenu: (e: MouseEvent, node: TreeItem) => void;
  } = $props();

  const tree = getContext<TreeContext>("tree");

  let open = $state(true);

  const selected = $derived(tree.selectedIds.has(node.id));
  const dragging = $derived(
    tree.drag.started && tree.drag.dragIds.includes(node.id),
  );
  const dropPosition = $derived(
    tree.drag.targetId === node.id ? tree.drag.position : null,
  );

  function pointerDown(e: PointerEvent) {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;

    // 展開ボタンやメニューボタンの操作はドラッグ開始対象にしない。
    if (target.closest("button, .menu")) return;

    tree.pointerDown(e, node, e.currentTarget as HTMLElement);
  }

  function click(e: MouseEvent) {
    // ドラッグ直後のclickは選択処理を発生させない。
    if (tree.drag.moved) {
      tree.drag.moved = false;
      return;
    }

    onSelect(node.id, e.ctrlKey || e.metaKey);
  }

  function keydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      onSelect(node.id);
    }
  }
</script>

<div
  role="treeitem"
  tabindex={0}
  aria-selected={selected}
  aria-expanded={open}
  class="node tree-item"
  class:dragging
  class:selected
  data-tree-node-id={node.id}
  onpointerdown={pointerDown}
  onclick={click}
  onkeydown={keydown}
  style={`padding-left:${level * 20}px`}
>
  {#if dropPosition === "before"}
    <div class="guide before" style:left={`${level * 20}px`}></div>
  {/if}

  <div class="row">
    {#if node.children && node.children.length > 0}
      <button
        aria-label={open ? "閉じる" : "開く"}
        onclick={(e) => {
          e.stopPropagation();
          open = !open;
        }}
        style:padding="0"
        style:border="0"
        style:background="transparent"
      >
        {#if open}
          <ArrowDropDownIcon />
        {:else}
          <ArrowDropDownIcon -transform="rotate(-90deg)" />
        {/if}
      </button>
    {:else}
      <div
        style:width="24px"
        style:height="24px"
        style:align-items="center"
        style:display="flex"
        style:justify-content="center"
      >
        ・
      </div>
    {/if}

    <span class:inside={dropPosition === "inside"}>
      {node.label}
    </span>

    <div style:width="16px"></div>

    <div class="menu" style:margin-left="">
      <MoreVertIcon
        onclick={(e) => {
          e.stopPropagation();
          onMenu(e, node);
        }}
      />
    </div>
  </div>

  {#if dropPosition === "after"}
    <div class="guide after" style:left={`${level * 20}px`}></div>
  {/if}
</div>

{#if open && node.children}
  {#each node.children as child}
    <TreeNode
      node={child}
      level={level + 1}
      onSelect={onSelect}
      onMenu={onMenu}
    />
  {/each}
{/if}

<style>
  .node {
    position: relative;
    user-select: none;
    touch-action: none;
  }

  .dragging {
    opacity: 0.35;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 24px;
  }

  .guide {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: lightgray;
    pointer-events: none;
  }

  .before {
    top: 0;
  }

  .after {
    bottom: 0;
  }

  .inside {
    outline: 2px solid blue;
  }

  .selected {
    background: #3390ff;
    color: white;
  }

  .tree-item .menu {
    margin-left: auto;
    visibility: hidden;
  }

  .tree-item:hover .menu {
    visibility: visible;
  }
</style>
