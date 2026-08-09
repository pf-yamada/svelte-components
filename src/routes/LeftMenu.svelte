<script lang="ts">
  import { css } from "$lib/css/css.svelte";
</script>

<div style="padding:8px">
  <label>
    <input
      type="radio"
      name="color-scheme"
      value="light"
      bind:group={css.scheme}
    />
    Light
  </label>
  <label>
    <input
      type="radio"
      name="color-scheme"
      value="dark"
      bind:group={css.scheme}
    />
    Dark
  </label>
  <div class="p-4">
    <h2>Menu</h2>
    <ul>
      <li><a href="?id=button">Button</a></li>
      <li><a href="?id=combo">Combo</a></li>
      <li><a href="?id=switch">Switch</a></li>
      <li><a href="?id=radio">Radio</a></li>
      <li><a href="?id=check">Check</a></li>
      <li><a href="?id=select">Select</a></li>
      <li><a href="?id=multiple">Multiple</a></li>
      <li><a href="?id=input">Input</a></li>
      <li><a href="?id=code">Code</a></li>
      <li><a href="?id=icon">Icon</a></li>
      <li><a href="?id=tree">Tree</a></li>
    </ul>
  </div>
</div>
