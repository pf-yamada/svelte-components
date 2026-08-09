<script lang="ts">
  import { getContext, onMount, type Snippet } from "svelte";
  import TreeItem from "./TreeItem.svelte";
  import { ArrowDropDownIcon } from "../css.svelte";

  import {
    type TreeNode,
    type TreeContext,
    type DropPosition,
  } from "../type/Tree";

  let {
    node = $bindable(),
    level = 0,
    item,
  }: {
    node: TreeNode;
    level?: number;
    item?: Snippet<[TreeNode, DropPosition]>;
  } = $props();

  // コンテキストを取得=Treeで設定された値にアクセスできる
  const tree = getContext<TreeContext>("tree");

  let open = $state(true);

  const selected = $derived(!!tree.selectedNodes.find((n) => n === node));
  const dragging = $derived(
    tree.drag.started && tree.drag.dragNodes.includes(node),
  );
  const dropPosition = $derived(
    (tree.drag.targetNode === node ? tree.drag.position : null) as DropPosition,
  );

  /**
   * このアイテムでポインタが押下されたときの処理
   * イベントに設定される
   *
   * @param e
   */
  function pointerDown(e: PointerEvent) {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;

    // 展開ボタンやメニューボタンの操作はドラッグ開始対象にしない。
    if (target.closest("button, .menu")) return;

    // このアイテムのノード情報をもってTreeのpointerDownをコール
    tree.pointerDown(e, node, e.currentTarget as HTMLElement);
  }

  /**
   * クリック時の処理Treeに通知したほうがいいかもしれない
   * @param e
   */
  function click(e: MouseEvent) {
    // ドラッグ直後のclickは選択処理を発生させない。
    if (tree.drag.moved) {
      tree.drag.moved = false;
      return;
    }

    tree.selectNode(node, e.ctrlKey || e.metaKey);
  }

  /**
   * エンターが押されたときは選択する
   * @param e
   */
  function keydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      tree.selectNode(node);
    }
  }

  $effect(() => {
    node.level = level;
  });
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

    {#if item}
      {@render item(node, dropPosition)}
    {:else}
      <span class:inside={dropPosition === "inside"}>
        {node.label}
      </span>
    {/if}
  </div>

  {#if dropPosition === "after"}
    <div class="guide after" style:left={`${level * 20}px`}></div>
  {/if}
</div>

{#if open && node.children}
  {#each node.children as child, i}
    <TreeItem bind:node={node.children[i]} level={level + 1} {item} />
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
    height: 6px;
    background: lightgray;
    border-radius: 3px;
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
</style>
