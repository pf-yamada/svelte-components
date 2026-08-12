<script lang="ts">
  import { type Snippet } from "svelte";
  import { type Value } from "$lib/kuro-comp/css.svelte";
  import { type DivData } from "../app.svelte";
  let { data, children }: { data: Value; children?: Snippet<[]> } = $props();

  const divData = $derived(data as DivData);
</script>

<div
  style:padding={divData?.padding}
  style:margin={divData?.margin}
  style:border={divData?.border}
  style:background={divData?.background}
  style:display={divData?.display}
  style:flex-direction={divData?.flexDirection}
  style:align-items={divData?.alignItems}
  style:justify-content={divData?.justifyContent}
  style:border-radius={divData?.borderRadius}
>
  {@render children?.()}
</div>
