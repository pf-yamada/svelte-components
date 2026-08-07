<script lang="ts">
  import { onMount } from "svelte";
  import { type MenuItem } from "../css.svelte";

  let {
    open = $bindable(false),
    x = 0,
    y = 0,
    items = [],
  }: {
    open: boolean;
    x: number;
    y: number;
    items: MenuItem[];
  } = $props();

  function close() {
    open = false;
  }

  function clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest(".popup-menu")) {
      close();
    }
  }

  onMount(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });
</script>

{#if open}
  <div class="popup-menu" style:left={`${x}px`} style:top={`${y}px`}>
    {#each items as item}
      <button
        disabled={item.disabled}
        onclick={(e: MouseEvent) => {
          item.onclick?.();
          close();
        }}
      >
        {item.label}
      </button>
    {/each}
  </div>
{/if}

<style>
  .popup-menu {
    position: fixed;
    z-index: 1000;

    display: flex;
    flex-direction: column;

    min-width: 160px;

    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;

    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  }

  .popup-menu button {
    padding: 8px 12px;

    border: 0;
    background: transparent;

    text-align: left;
    cursor: pointer;
  }

  .popup-menu button:hover:not(:disabled) {
    background: #f5f5f5;
  }

  .popup-menu button:disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>
