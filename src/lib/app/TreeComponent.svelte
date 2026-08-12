<script lang="ts">
  import { type TreeNode } from "$lib/kuro-comp/css.svelte";
  import { Text, Div, TreeComponent } from "./app.svelte";
  let {
    tree,
  }: {
    tree?: TreeNode[];
  } = $props();

  const components = {
    Text,
    Div,
  };
</script>

{#each tree as node}
  {@const Component = components[node.type as keyof typeof components]}
  {#if Component}
    {#if node.children}
      <Component data={node.data}>
        <TreeComponent tree={node.children} />
      </Component>
    {:else}
      <Component data={node.data} />
    {/if}
  {:else if node.children}
    <TreeComponent tree={node.children} />
  {/if}
{/each}
