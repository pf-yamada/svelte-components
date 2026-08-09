<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { at, type Value, type DivAttributes, css } from "../css.svelte";

  const STATUS_OPEN = "==== OPEN ====";
  let {
    x = 0,
    y = 0,
    children,
    ...rest
  }: {
    x?: number;
    y?: number;
    children: Snippet<[]>;
  } & DivAttributes = $props();

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
  $inspect(status);

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
  <div
    style:position="fixed"
    style:z-index="1000"
    style:background={css.boxBgc}
    style:border={css.bdr}
    style:border-radius="6px"
    style:box-shadow={css.boxShadow}
    style:left={`${x}px`}
    style:top={`${y}px`}
    class="popup-menu" /*closestのチェックに*/
  >
    <div {...at(rest)}>
      {@render children?.()}
    </div>
  </div>
{/if}
