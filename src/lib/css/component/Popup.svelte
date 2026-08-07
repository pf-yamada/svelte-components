<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { type Value } from "../css.svelte";

  const STATUS_OPEN = "==== OPEN ====";
  let {
    x = 0,
    y = 0,
    children,
  }: {
    x?: number;
    y?: number;
    children: Snippet<[]>;
  } = $props();

  let status = $state<Value>("");

  /**
   * show関数の提供
   */
  let resolver: ((state: Value) => void) | undefined;
  export function show(xpos: number, ypos: number) {
    x = xpos;
    y = ypos;
    status = STATUS_OPEN;
    return new Promise<Value>((resolve) => {
      resolver = resolve;
    });
  }

  $effect(() => {
    if (status !== STATUS_OPEN) {
      resolver?.(status);
      resolver = undefined;
    }
  });

  /**
   * setStatusの提供
   */
  export function exit(code: any) {
    status = code;
  }

  /**
   * 閉じる
   */
  function close() {
    status = "";
  }

  /**
   * 外側がクリックされた
   * @param event
   */
  function clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest(".popup-menu")) {
      close();
    }
  }

  /**
   * onMount
   * 主にイベント登録
   */
  onMount(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });
</script>

{#if status === STATUS_OPEN}
  <div class="popup-menu" style:left={`${x}px`} style:top={`${y}px`}>
    {@render children?.()}
  </div>
{/if}

<style>
  .popup-menu {
    position: fixed;
    z-index: 1000;
    min-width: 160px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  }
</style>
