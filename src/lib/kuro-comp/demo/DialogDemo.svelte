<script lang="ts">
  import {
    Code,
    Dialog,
    Button,
    type BindDialog,
    type Value,
  } from "../css.svelte";

  let dialog: BindDialog;
  let value = $state<Value>("");
</script>

<h2>Dialog</h2>

<h3>Overview</h3>
<div>
  Dialogはbind:thisで取得したコンポーネントからshow()を
  呼び出すことで同期的に実行することができます。<br />
  awaitで同期的に結果を取得できます。<br />
  {#if true}
    {@const src = `
<!--
  ボタンからDialogを起動するサンプル
-->
{JSON.stringify(value)}


<Button
  onClick={async (e) => {
    value = await popup.show(e.clientX, e.clientY);
  }}>Show Popup</Button
>
`}
    <Code code={src} />
  {/if}
</div>

<h3>Value</h3>
{JSON.stringify(value)}

<h3>Value</h3>
<Dialog bind:this={dialog}>
  <Button
    onClick={async (e) => {
      await dialog.exit("exit");
    }}>Exit Dialog</Button
  >
</Dialog>

<Button
  onClick={async (e) => {
    value = await dialog.show();
  }}>Show Dialog</Button
>
