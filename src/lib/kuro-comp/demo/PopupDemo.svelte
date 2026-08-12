<script lang="ts">
  import {
    Code,
    Popup,
    MenuItem,
    Button,
    type BindPopup,
    type Value,
  } from "../css.svelte";

  let popup: BindPopup;
  let value = $state<Value>("");
</script>

<h2>Popup</h2>

<h3>Overview</h3>
<div>
  Popupはbind:thisで取得したコンポーネントからshow()を
  呼び出すことで同期的に実行することができます。<br />
  awaitで同期的にpopupの結果を取得できます。<br />
  {#if true}
    {@const src = `
<!--
  ボタンからPopupを起動するサンプル
-->
{JSON.stringify(value)}

<Popup bind:this={popup} -pad="4px" -dsp="flex" -flx-d="column">
  <MenuItem onClick={(e) => popup.exit("menu1")}>menu1</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu2")}>menu2</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu3")}>menu3</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu4")}>menu4</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu5")}>menu5</MenuItem>
</Popup>

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
<Popup bind:this={popup} -pad="4px" -dsp="flex" -flx-d="column">
  <MenuItem onClick={(e) => popup.exit("menu1")}>menu1</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu2")}>menu2</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu3")}>menu3</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu4")}>menu4</MenuItem>
  <MenuItem onClick={(e) => popup.exit("menu5")}>menu5</MenuItem>
</Popup>

<Button
  onClick={async (e) => {
    value = await popup.show(e.clientX, e.clientY);
  }}>Show Popup</Button
>
