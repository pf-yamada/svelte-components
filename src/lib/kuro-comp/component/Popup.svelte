<script lang="ts">
  import { onMount, type Snippet, tick } from "svelte";
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

  let popup = $state<HTMLDivElement>();
  let status = $state<Value>("");
  let displayX = $state(0);
  let displayY = $state(0);
  /**
   * show関数の提供
   */
  let resolver: ((state: Value) => void) | undefined;
  export async function show(xpos: number, ypos: number) {
    x = xpos;
    y = ypos;

    displayX = xpos;
    displayY = ypos;

    status = STATUS_OPEN;

    await tick();

    if (popup) {
      const rect = popup.getBoundingClientRect();

      // 下にはみ出す場合は、指定座標の上に表示
      if (rect.bottom > window.innerHeight) {
        displayY = ypos - rect.height;
      }

      // 右にはみ出す場合
      if (rect.right > window.innerWidth) {
        displayX = window.innerWidth - rect.width;
      }

      // 左にはみ出す場合
      if (displayX < 0) {
        displayX = 0;
      }

      // 上にはみ出す場合
      if (displayY < 0) {
        displayY = 0;
      }
    }

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
  <div
    bind:this={popup}
    style:position="fixed"
    style:z-index="1000"
    style:background={css.boxBgc}
    style:border={css.bdr}
    style:border-radius="6px"
    style:box-shadow={css.boxShadow}
    style:left={`${displayX}px`}
    style:top={`${displayY}px`}
    class="popup-menu" /*closestのチェックに*/
  >
    <div {...at(rest)}>
      {@render children?.()}
    </div>
  </div>
{/if}
