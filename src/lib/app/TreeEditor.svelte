<script lang="ts">
  import {
    css,
    Tree,
    Popup,
    Dialog,
    Button,
    MenuItem,
    MoreVertIcon,
    Input,
    Select,
    type TreeNode,
    type Value,
    type BindTree,
    type BindPopup,
    type BindDialog,
    type DropPosition,
  } from "$lib/kuro-comp/css.svelte";

  import { project } from "$lib/app/app.svelte";

  let tree = $state<BindTree>(undefined!);
  let popup = $state<BindPopup>(undefined!);
  let dialog = $state<BindDialog>(undefined!);

  let dialogMode = $state<"delete" | "create" | "property">(undefined!);
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
          case "addChild": {
            const newNode = tree.addChild(node, label);
            newNode.type = nodeType;
            break;
          }
          case "addAfter": {
            const newNode = tree.addAfter(node, label);
            if (!newNode) break;
            newNode.type = nodeType;
            break;
          }
        }
        break;
      }
      case "property": {
        dialogMode = "property";
        await dialog.show();
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

  /**
   * ダイアログ用変数
   */
  let label = $state("");
  let nodeType = $state("Text");
</script>

<!--
  ツリーメニュー
-->
<Tree bind:this={tree} bind:root={project.tree} -width="100%">
  {#snippet item(node: TreeNode, dropPos: DropPosition)}
    <div class="treenode" class:inside={dropPos === "inside"}>
      {node.label}
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
    </div>
  {/snippet}
</Tree>

<!--
  ポップアップメニュー
-->
<Popup bind:this={popup} -dsp="flex" -flx-d="column" -pad="8px">
  <MenuItem onClick={() => popup.exit("create")}>Create</MenuItem>
  <MenuItem onClick={() => popup.exit("property")}>Property</MenuItem>
  {#if targetNode.level !== 0}
    <MenuItem onClick={() => popup.exit("delete")}>Delete</MenuItem>
  {/if}
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
    {:else if dialogMode === "property"}
      ノード設定
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
    <div style:padding="8px">{targetNode.label}にノードを作成します</div>
    <div style:padding="8px">
      <label style:display="block" style:padding="4px">
        タイプ <Select
          bind:value={nodeType}
          options={[
            { label: "text", value: "Text" },
            { label: "div", value: "Div" },
          ]}
        />
      </label>
      <label style:display="block" style:padding="4px">
        ラベル <Input bind:value={label} />
      </label>
    </div>

    <div style:display="flex" style:justify-content="space-evenly">
      <Button
        onclick={() => {
          dialog.exit({ status: "addChild", label });
        }}>addChild</Button
      >
      <Button
        onclick={() => {
          dialog.exit({ status: "addAfter", label });
        }}>addAfter</Button
      >
      <Button
        -background-color={css.fgc}
        onclick={() => {
          dialog.exit({ status: "cancel", label: "dummy" });
        }}>取消</Button
      >
    </div>
  {:else if dialogMode === "property"}
    {#if targetNode.type === "Text"}
      テキストエリアがそろそろいるな。
    {:else if targetNode.type === "Div"}
      CSSの編集ですねここは。
    {/if}
    <div style:display="flex" style:justify-content="space-evenly">
      <Button
        onclick={() => {
          dialog.exit({ status: "addAfter", label });
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
