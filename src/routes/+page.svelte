<script lang="ts">
  import { page } from "$app/state";
  import {
    at,
    ButtonSample,
    ComboButtonSample,
    SwitchSample,
    RadioButtonSample,
    IconSample,
    CheckboxSample,
    SelectSample,
    InputSample,
    CodeSample,
    SelectMultipleSample,
    TreeSample,
  } from "$lib/css/css.svelte";
  const id = $derived(page.url.searchParams.get("id"));
</script>

ID:{id}
<div {...at({ "-mgn": "16px" })}>
  {#if id === "button"}
    <ButtonSample />
  {:else if id === "combo_button"}
    <ComboButtonSample />
  {:else if id === "switch"}
    <SwitchSample />
  {:else if id === "radio_button"}
    <RadioButtonSample />
  {:else if id === "checkbox"}
    <CheckboxSample />
  {:else if id === "select"}
    <SelectSample />
  {:else if id === "select_multiple"}
    <SelectMultipleSample />
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
