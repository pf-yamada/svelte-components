<script lang="ts">
  import { TextArea } from "../css.svelte";

  let value = $state("");
</script>

<h2>TextArea</h2>
<pre>{JSON.stringify(value)}</pre>
<TextArea bind:value cols={48} rows={4} />
