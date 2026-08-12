<script lang="ts">
  import { page } from "$app/state";
  const pageId = $derived(page.params.page);
</script>

{pageId}
