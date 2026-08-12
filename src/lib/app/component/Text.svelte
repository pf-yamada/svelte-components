<script lang="ts">
  import { type Value } from "$lib/kuro-comp/css.svelte";
  import { Text, type TextData } from "../app.svelte";
  let { data }: { data: Value } = $props();

  const textData = $derived(data as TextData);
</script>

{textData.text}
