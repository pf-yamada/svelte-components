<script lang="ts">
  import { page } from "$app/state";
  import {
    at,
    ButtonSample,
    ComboSample,
    SwitchSample,
    RadioSample,
    IconSample,
    CheckSample,
    SelectSample,
    InputSample,
    CodeSample,
    MultipleSample,
    TreeSample,
  } from "$lib/css/css.svelte";
  const id = $derived(page.url.searchParams.get("id"));
</script>

ID:{id}
<div {...at({ "-mgn": "16px" })}>
  {#if id === "button"}
    <ButtonSample />
  {:else if id === "combo"}
    <ComboSample />
  {:else if id === "switch"}
    <SwitchSample />
  {:else if id === "radio"}
    <RadioSample />
  {:else if id === "check"}
    <CheckSample />
  {:else if id === "select"}
    <SelectSample />
  {:else if id === "multiple"}
    <MultipleSample />
  {:else if id === "input"}
    <InputSample />
  {:else if id === "code"}
    <CodeSample />
  {:else if id === "icon"}
    <IconSample />
  {:else if id === "tree"}
    <TreeSample />
  {/if}
</div>
