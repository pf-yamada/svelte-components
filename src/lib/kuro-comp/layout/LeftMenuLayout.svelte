<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { css, at, type DivAttributes } from "$lib/kuro-comp/css.svelte";

  let {
    open = $bindable(true),
    sidebar,
    children,
    "break-size": breakSize = 768,
    "storage-name": storageName = "left-sidebar",
    "width-min": widthMin = 100,
    "width-max": widthMax = 400,
    "default-width": width = 200,
    header,
    footer,
    ...rest
  }: {
    open: boolean;
    sidebar?: Snippet<[]>;
    header?: Snippet<[]>;
    footer?: Snippet<[]>;
    children?: Snippet<[]>;
    "break-size"?: number;
    "storage-name"?: string;
    "width-min"?: number;
    "width-max"?: number;
    "default-width"?: number;
  } & DivAttributes = $props();

  let mobile = $state(false);
  let resizing = $state(false);

  //
  //  resizerのonpointerdowns処理
  //
  function startResize(e: PointerEvent) {
    if (!open) return;

    function move(ev: PointerEvent) {
      width = Math.max(
        widthMin,
        Math.min(widthMax, startWidth + ev.clientX - startX),
      );
    }

    function up() {
      resizing = false;

      localStorage.setItem(storageName, String(width));

      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    }

    e.preventDefault();

    resizing = true;

    const startX = e.clientX;
    const startWidth = width;

    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    // クリックしたらmoveとupの処理を設定
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  //
  // リサイズ処理
  //
  const onResize = () => {
    const wasMobile = mobile;

    mobile = window.innerWidth < breakSize;

    // PC -> Mobole
    if (!wasMobile && mobile) {
      open = false;
    }
    // Mobile → PC
    if (wasMobile && !mobile) {
      open = true;
    }
  };

  //
  // マウント処理
  //
  onMount(() => {
    //  ローカルストレージから表示幅を取得する
    const saved = localStorage.getItem(storageName);
    if (saved) {
      const n = Number(saved);
      if (!Number.isNaN(n)) {
        width = Math.max(widthMin, Math.min(widthMax, n));
      }
    }

    // ウィンドウのサイズが変更されたときのハンドル処理
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
</script>

<!--
  モバイル時にメインを隠してクリック時に閉じられるようにする
-->
{#if mobile && open}
  <div
    role="button"
    tabindex="0"
    class="overlay"
    onclick={() => (open = false)}
    onkeydown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        open = !open;
      }
    }}
  ></div>
{/if}
<div
  style:color="auto"
  style:display="flex"
  style:flex-direction="column"
  style:flex="1 1 0"
  style:overflow="hidden"
  style:min-width="0"
  style:min-height="0"
  {...at(rest)}
>
  {#if header}
    <header style:flex-shrink="0">
      {@render header()}
    </header>
  {/if}
  <div
    style:display="flex"
    style:flex="1 1 0"
    style:min-width="0"
    style:min-height="0"
    style:overflow="hidden"
  >
    <!--
      左メニュー
    -->
    <aside
      class="sidebar"
      class:open
      class:resizing
      class:mobile
      style:width={open ? width + "px" : "0px"}
    >
      <div class="sidebar-content">
        {@render sidebar?.()}
      </div>
    </aside>

    <!--
      オープンの時は表示しないサイズ変更バー
    -->
    <div
      role="button"
      tabindex="0"
      class="resizer"
      class:hidden={!open}
      class:mobile
      onpointerdown={startResize}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          open = !open;
        }
      }}
    ></div>

    <!--
      メインコンテンツ
    -->
    <main
      style:display="flex"
      style:flex-direction="column"
      style:flex="1 1 0"
      style:overflow="hidden"
      style:min-width="0"
      style:min-height="0"
      /* style:background-color="green" */
    >
      {@render children?.()}
    </main>
  </div>

  {#if footer}
    <footer style:flex-shrink="0">
      {@render footer()}
    </footer>
  {/if}
</div>

<style>
  /*
    左バー
  */
  .sidebar {
    flex-shrink: 0;
    overflow: hidden;
    border-right: 1px solid #ddd;
    min-width: 0;

    transition:
      width 180ms ease,
      border-color 180ms ease;
  }

  .sidebar.resizing {
    transition: none;
  }

  .sidebar.mobile {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    box-shadow: 0 0 20px rgb(0 0 0 / 0.2);
  }

  .sidebar-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  /*
    サイズ変更
  */
  .resizer {
    width: 8px;
    flex-shrink: 0;

    cursor: ew-resize;
    user-select: none;
    touch-action: none;
  }

  .resizer:hover {
    background: rgb(0 0 0 / 0.08);
  }

  .resizer.hidden {
    width: 0;
    pointer-events: none;
  }

  .resizer.mobile {
    display: none;
  }

  /*
    モバイル時のオーバーレイ
  */
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgb(0 0 0 / 0.3);
  }
</style>
