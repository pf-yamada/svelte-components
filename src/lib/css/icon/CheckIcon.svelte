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
  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
</svg>
