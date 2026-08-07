<script lang="ts">
  import { type Snippet, tick } from "svelte";
  import { CancelCircleIcon, css } from "../css.svelte";

  let {
    status = $bindable("ready"),
    caption = "untitled",
    children,
  }: { status?: string; caption?: string; children?: Snippet<[]> } = $props();

  let x = $state(100);
  let y = $state(100);

  let dragging = false;

  let startMouseX = 0;
  let startMouseY = 0;

  let startDialogX = 0;
  let startDialogY = 0;

  function dragStart(e: MouseEvent) {
    dragging = true;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startDialogX = x;
    startDialogY = y;

    window.addEventListener("mousemove", dragMove);
    window.addEventListener("mouseup", dragEnd);
  }

  function dragMove(e: MouseEvent) {
    if (!dragging) return;

    x = startDialogX + (e.clientX - startMouseX);
    y = startDialogY + (e.clientY - startMouseY);
  }

  function dragEnd() {
    dragging = false;

    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("mouseup", dragEnd);
  }

  // svelte-ignore non_reactive_update
  let dialog: HTMLDivElement;
  $effect(() => {
    if (status !== "open") return;

    tick().then(() => {
      if (!dialog) return;
      // 起動したらど真ん中に表示する
      x = (window.innerWidth - dialog.offsetWidth) / 2;
      y = (window.innerHeight - dialog.offsetHeight) / 2;
    });
  });

  function close() {
    status = "cancel";
  }

  let resolver: ((state: string) => void) | undefined;
  export function show() {
    status = "open";
    return new Promise<string>((resolve) => {
      resolver = resolve;
    });
  }

  $effect(() => {
    if (status !== "open") {
      resolver?.(status);
      resolver = undefined;
    }
  });
</script>

{#if status === "open"}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="backdrop"
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        close();
      }
    }}
  >
    <div
      bind:this={dialog}
      style:left={`${x}px`}
      style:top={`${y}px`}
      style:box-shadow={css.boxShadow}
      style:border={css.boxBgc}
      style:position="fixed"
      style:background="white"
      style:border-radius="12px"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        style:border-radius="12px 12px 0px 0px"
        style:display="flex"
        style:align-items="center"
        style:color={css.bgc}
        style:background-color={css.fgc}
        style:box-shadow={css.boxShadow}
        style:justify-content="space-between"
        onmousedown={dragStart}
        class="caption"
      >
        <div>{caption}</div>
        <button class="close" onclick={close} aria-label="閉じる">
          <CancelCircleIcon fill={css.bgc} />
        </button>
      </div>

      <div
        style:padding="16px"
        style:background-color={css.bgc}
        style:border-radius="0px 0px 12px 12px"
      >
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}

<style>
  .caption {
    padding: 8px 12px;
    cursor: move;
    user-select: none;
  }

  .close {
    background-color: transparent;
    border: 0px;
  }

  .backdrop {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgb(0 0 0 / 40%);

    z-index: 1000;
  }
</style>
