<script lang="ts">
  // https://fonts.google.com/icons
  import { at, css, type SVGAttributes } from "../css.svelte";
  let { ...rest }: SVGAttributes = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 -960 960 960"
  width="24px"
  fill="currentColor"
  display="block"
  {...at(rest)}
>
  <path d="M480-360 280-560h400L480-360Z" />
</svg>
