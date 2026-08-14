<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import {
    type InputAttributes,
    type DivAttributes,
    type Value,
    MenuItem,
    at,
    Button,
    Input,
    css,
  } from "../css.svelte";

  let {
    value = $bindable(),
    options = [],
    item,
    onvalue,
    ...rest
  }: {
    value?: string;
    options?: Value[];
    item?: Snippet<[option: Value]>;
    onvalue?: (v: string) => void;
  } & InputAttributes = $props();

  let open = $state(false);
  let dropUp = $state(false);

  let input: HTMLDivElement;
  // svelte-ignore non_reactive_update
  let dropdown: HTMLDivElement;

  const handleClick = (event: MouseEvent) => {
    if (!dropdown?.contains(event.target as Node) && event.target !== input) {
      open = false;
    }
  };
  onMount(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  function openDropdown() {
    const rect = input.getBoundingClientRect();

    // ドロップダウンの最大高さ + 余白
    const dropdownHeight = 160;
    const margin = 8;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    dropUp = spaceBelow < dropdownHeight + margin && spaceAbove > spaceBelow;

    open = true;
  }
  function select(option: Value) {
    value = option;
    onvalue?.(value);
    open = false;
  }
</script>

<div class="relative">
  <div class="input-wrapper" bind:this={input}>
    <Input
      bind:value
      onclick={(e) => {
        e.stopPropagation();
        openDropdown();
      }}
      onfocus={() => {
        openDropdown();
      }}
      {...rest}
    />
  </div>

  {#if open}
    <div bind:this={dropdown} style="position:relative;">
      <div
        style:background-color={css.boxBgc}
        style:color={css.getFgc(css.boxBgc)}
        style:border={css.bdr}
        style:display="flex"
        style:flex-direction="column"
        style:position="absolute"
        style:border-radius="0px 0px 0px 8px"
        style:max-height="160px"
        style:overflow="auto"
        style:z-index="50"
        style:padding="4px"
        style:left="12px"
        style:box-shadow={css.boxShadow}
        class:drop-up={dropUp}
      >
        {#each options as option}
          <MenuItem
            class="option"
            onclick={(e) => {
              e.stopPropagation();
              select(option);
            }}
          >
            {#if item}
              {@render item(option)}
            {:else}
              {option}
            {/if}
          </MenuItem>
        {/each}

        {#if options.length === 0}
          <div class="empty">候補がありません</div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .relative {
    position: relative;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
  }

  .empty {
    padding: 6px 8px;
    opacity: 0.6;
  }

  .drop-up {
    bottom: 100%;
    top: auto;
  }

  .dropdown.drop-up {
    top: auto;
    bottom: 100%;
  }
</style>
