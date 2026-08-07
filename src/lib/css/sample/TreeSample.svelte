<script lang="ts">
  import {
    css,
    Tree,
    Popup,
    Dialog,
    Button,
    type TreeNode,
    type BindPopup,
    type BindTree,
    type BindDialog,
    type MouseEventWithCurrentTarget,
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
</script>

<Tree
  bind:this={tree}
  root={nodes}
  onMenu={async (e: MouseEventWithCurrentTarget, node: TreeNode) => {
    targetNode = node;
    const action = await popup.show(e.clientX, e.clientY);
    switch (action) {
      case "delete": {
        dialogMode = "delete";
        const status = await dialog.show();
        if (status == "ok") {
          tree.remove(node);
        }
        break;
      }
      case "create": {
        dialogMode = "create";
        type ResultType = { status: Value; label: string };
        const { status, label } = (await dialog.show()) as ResultType;
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
  }}
  /*
.popup-menu button {
    padding: 8px 12px;

    border: 0;
    background: transparent;

    text-align: left;
    cursor: pointer;
  }

  .popup-menu button:hover:not(:disabled) {
    background: #f5f5f5;
  }

  .popup-menu button:disabled {
    opacity: 0.5;
    cursor: default;
  }
*/
/>

<!--
  ポップアップメニュー
-->
<Popup bind:this={popup}>
  <div style:display="flex" style:flex-direction="column">
    <button type="button" onclick={() => popup.exit("delete")}> Delete </button>
    <button type="button" onclick={() => popup.exit("create")}> Create </button>
  </div>
</Popup>

<!-- 削除ダイアログ（statusが"open"のときだけ表示） -->
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
