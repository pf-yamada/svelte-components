<script lang="ts">
  import { at, Input, type InputAttributes } from "../css.svelte";
  let {
    onvalue,
    ...rest
  }: { onvalue?: (value: string, e: Event) => void } & InputAttributes =
    $props();

  let value = $state("");
  let onval = $state("");
</script>

<h2>Input</h2>
<h3>value</h3>
{JSON.stringify(value)} / {JSON.stringify(onval)}

<h3>default</h3>
<Input disabled bind:value onvalue={(v) => (onval = v!)} {...rest} />
