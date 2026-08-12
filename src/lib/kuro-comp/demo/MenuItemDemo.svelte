<script lang="ts">
  import { MenuItem } from "../css.svelte";
</script>

<h2>MenuItem</h2>

<MenuItem
  onClick={() => {
    console.log("hoge");
  }}
>
  hoge
</MenuItem>
