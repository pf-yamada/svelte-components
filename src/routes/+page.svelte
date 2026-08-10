<script lang="ts">
  import { page } from "$app/state";
  import {
    at,
    ButtonSample,
    ComboSample,
    SwitchSample,
    RadioSample,
    IconSample,
    CheckboxSample,
    SelectSample,
    InputSample,
    CodeSample,
    MultipleSample,
    TreeSample,
    PopupSample,
    MenuItemSample,
    DialogSample,
    LeftMenuLayoutSample,
    RightMenuLayoutSample,
  } from "$lib/kuro-comp/css.svelte";
  const id = $derived(page.url.searchParams.get("id"));

  const samples = {
    button: ButtonSample,
    combo: ComboSample,
    switch: SwitchSample,
    radio: RadioSample,
    checkbox: CheckboxSample,
    select: SelectSample,
    multiple: MultipleSample,
    input: InputSample,
    code: CodeSample,
    icon: IconSample,
    tree: TreeSample,
    popup: PopupSample,
    menuitem: MenuItemSample,
    dialog: DialogSample,
    left_menu_layout: LeftMenuLayoutSample,
    right_menu_layout: RightMenuLayoutSample,
  };
</script>

ID:{id}<br />
{#if id}
  {@const Component = samples[id as keyof typeof samples]}
  {#if id.includes("layout")}
    <Component />
  {:else}
    <div style:overflow="auto" style:min-width="0" style:min-height="0">
      <Component />
    </div>
  {/if}
{/if}
