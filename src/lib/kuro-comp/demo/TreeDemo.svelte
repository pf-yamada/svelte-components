<script lang="ts">
  import {
    css,
    Tree,
    Popup,
    Dialog,
    Button,
    MenuItem,
    MoreVertIcon,
    type DropPosition,
    type TreeNode,
    type BindPopup,
    type BindTree,
    type BindDialog,
    type Value,
  } from "../css.svelte";

  let nodes = $state<TreeNode[]>([
    {
      id: "1",
      label: "src",
      children: [
        {
          id: "2",
          label: "components",
          children: [
            {
              id: "3",
              label: "Button1",
            },
            {
              id: "4",
              label: "Button2",
            },
            {
              id: "5",
              label: "Button3",
            },
            {
              id: "6",
              label: "Button4",
            },
          ],
        },
        {
          id: "7",
          label: "pages",
          children: [
            {
              id: "8",
              label: "Page1",
            },
            {
              id: "9",
              label: "Page2",
              children: [
                {
                  id: "10",
                  label: "Page2-1",
                },
                {
                  id: "11",
                  label: "Page2-2",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  /**
   *コンポーネントをハンドルして関数を使えるようにする
   */
  let tree = $state<BindTree>(undefined!);
  let popup = $state<BindPopup>(undefined!);
  let dialog = $state<BindDialog>(undefined!);

  let dialogMode = $state<"delete" | "create">(undefined!);
  let targetNode = $state<TreeNode>(undefined!);

  /**
   * メニューがクリックされたときの処理
   *
   * @param e
   * @param node
   */
  async function onMenu(e: MouseEvent, node: TreeNode) {
    targetNode = node;
    const action = await popup.show(e.clientX, e.clientY);
    console.log(action);
    switch (action) {
      case "delete": {
        dialogMode = "delete";
        const status = await dialog.showSync();
        if (status == "ok") {
          tree.remove(node);
        }
        break;
      }
      case "create": {
        dialogMode = "create";
        type ResultType = { status: Value; label: string };
        const { status, label } = (await dialog.showSync()) as ResultType;
        switch (status) {
          case "addChild":
            tree.addChild(node, label);
            break;
          case "addAfter":
            tree.addAfter(node, label);
            break;
        }
        break;
      }
    }
  }
  /**
   * 移動の可否をチェックするユーザ関数
   *
   * @param target
   * @param sources
   */
  function onMoveChallenge(target: TreeNode, sources: TreeNode[]) {
    return true;
  }

  let value = $state<TreeNode>(undefined!);
  let selectedNodes = $state<TreeNode[]>([]);
</script>

<div>
  {JSON.stringify(value ? value.id : "")}
  {JSON.stringify(selectedNodes.map((i) => i.id))}
</div>

<!--
  ツリーコンポーネント
-->
<Tree
  bind:this={tree}
  bind:root={nodes}
  bind:value
  bind:selectedNodes
  {onMoveChallenge}
>
  {#snippet item(node: TreeNode, dropPos: DropPosition)}
    <div class="treenode" class:inside={dropPos === "inside"}>
      [A]
      {node.label}
      {#if node.level !== 0}
        <div style:width="16px"></div>
        <button
          class="menuicon"
          onclick={async (e) => {
            e.stopPropagation();
            await onMenu(e, node);
          }}
        >
          <MoreVertIcon />
        </button>
      {/if}
    </div>
  {/snippet}
</Tree>

<!--
  ポップアップメニュー
-->
<Popup bind:this={popup} -dsp="flex" -flx-d="column" -pad="8px">
  <MenuItem onClick={() => popup.exit("delete")}>Delete</MenuItem>
  <MenuItem onClick={() => popup.exit("create")}>Create</MenuItem>
</Popup>

<!--
  ダイアログ
-->
<Dialog bind:this={dialog}>
  <!-- snippetはifの中に書くとマズイ？ -->
  {#snippet caption()}
    {#if dialogMode === "delete"}
      ノード削除
    {:else if dialogMode === "create"}
      ノード作成
    {:else}
      未定義の処理
    {/if}
  {/snippet}
  {#if dialogMode === "delete"}
    「{targetNode.label}」を削除してもよろしいですか？
    <div
      style:display="flex"
      style:justify-content="space-evenly"
      style:padding-top="16px"
    >
      <Button
        onclick={() => {
          dialog.exit("ok");
        }}>OK</Button
      >
      <Button
        -background-color={css.fgc}
        onclick={() => {
          dialog.exit("cancel");
        }}>取消</Button
      >
    </div>
  {:else if dialogMode === "create"}
    ノートを作成します
    <div
      style:display="flex"
      style:justify-content="space-evenly"
      style:padding-top="16px"
    >
      <Button
        onclick={() => {
          dialog.exit({ status: "addChild", label: "untitled" });
        }}>addChild</Button
      >
      <Button
        onclick={() => {
          dialog.exit({ status: "addAfter", label: "untitled" });
        }}>addAfter</Button
      >
      <Button
        -background-color={css.fgc}
        onclick={() => {
          dialog.exit({ status: "cancel", label: "dummy" });
        }}>取消</Button
      >
    </div>
  {/if}
</Dialog>

<style>
  .inside {
    padding: 2px;
    border-radius: 8px;
    background: rgba(99, 102, 241, 0.15);
  }

  .treenode {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .menuicon {
    border: 0px;
    background: transparent;
    margin-left: auto;
    visibility: hidden;
  }
  .treenode:hover .menuicon {
    visibility: visible;
  }
</style>
