<script lang="ts">
  import { project, TreeComponent } from "$lib/app/app.svelte";
  import { json } from "@sveltejs/kit";
</script>

<div style:overflow="auto">
  <TreeComponent tree={project.tree} />

  <pre>{JSON.stringify(project.tree, null, 4)}</pre>
</div>
