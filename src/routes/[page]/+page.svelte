<script lang="ts">
  import { page } from "$app/state";
  import { Demo } from "$lib/kuro-comp/css.svelte";
  const pageId = $derived(page.params.page);
</script>

{pageId}
{#if pageId === "demo"}
  <Demo />
{/if}
