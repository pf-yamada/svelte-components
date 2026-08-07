<script lang="ts">
  import { css, at, type DivAttributes } from "$lib/css/css.svelte";
  let { open = $bindable(), ...rest }: { open: boolean } & DivAttributes =
    $props();
</script>

<div {...at(rest)}>
  <button
    class="toggle"
    onclick={() => (open = !open)}
    {...at({ "-box-shadow": css.boxShadow })}
  >
    ☰
  </button>
</div>

<style>
  .toggle {
    z-index: 1100;
  }
</style>
