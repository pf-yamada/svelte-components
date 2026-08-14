<script lang="ts">
  import {
    at,
    css,
    ButtonDemo,
    ComboDemo,
    SwitchDemo,
    RadioDemo,
    IconDemo,
    CheckboxDemo,
    SelectDemo,
    InputDemo,
    CodeDemo,
    SelectMultipleDemo,
    TreeDemo,
    PopupDemo,
    MenuItemDemo,
    DialogDemo,
    TextAreaDemo,
    LeftMenuLayoutDemo,
    RightMenuLayoutDemo,
  } from "$lib/kuro-comp/css.svelte";

  let id = $state("");

  const Demos = {
    button: ButtonDemo,
    combo: ComboDemo,
    switch: SwitchDemo,
    radio: RadioDemo,
    checkbox: CheckboxDemo,
    select: SelectDemo,
    select_multiple: SelectMultipleDemo,
    input: InputDemo,
    code: CodeDemo,
    icon: IconDemo,
    tree: TreeDemo,
    popup: PopupDemo,
    menuitem: MenuItemDemo,
    dialog: DialogDemo,
    textarea: TextAreaDemo,
    left_menu_layout: LeftMenuLayoutDemo,
    right_menu_layout: RightMenuLayoutDemo,
  };

  function snakeToPascal(str: string) {
    return str
      .split("_")
      .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
      .join("");
  }
</script>

<div style:display="flex" style:flex-column="column" style:flex="1 1 0">
  <div style="padding:8px">
    <label>
      <input
        type="radio"
        name="color-scheme"
        value="light"
        bind:group={css.scheme}
      />
      Light
    </label>
    <label>
      <input
        type="radio"
        name="color-scheme"
        value="dark"
        bind:group={css.scheme}
      />
      Dark
    </label>
    <div class="p-4">
      <h2>Menu</h2>
      <ul>
        {#each Object.entries(Demos) as [demo, func]}
          <li>
            <button onclick={(e) => (id = demo)}>{snakeToPascal(demo)}</button>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  {#if id}
    {@const Component = Demos[id as keyof typeof Demos]}
    {#if id.includes("layout")}
      <Component />
    {:else}
      <div
        style:overflow="auto"
        style:width="100%"
        style:min-width="0"
        style:min-height="0"
      >
        <Component />
      </div>
    {/if}
  {/if}
</div>

<style>
  button {
    border: 0;
    background-color: transparent;
  }
</style>
