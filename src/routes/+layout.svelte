<script lang="ts">
  import "../app.css";

  import { type Snippet } from "svelte";
  import { css, at, LeftMenuLayout } from "$lib/kuro-comp/css.svelte";
  import LeftMenu from "./LeftMenu.svelte";
  import Header from "./Header.svelte";

  let { children }: { children: Snippet<[]> } = $props();

  let open = $state(true);

  $effect(() => {
    const root = document.documentElement;
    root.style.colorScheme = css.scheme;
    root.style.setProperty("--bg-color", css.bgc);
    root.style.setProperty("--text-color", css.fgc);
    root.style.setProperty("--link-color", css[css.scheme].linkColor);
    root.style.setProperty("--link-hover", css[css.scheme].linkHover);
    root.style.setProperty("--link-visited", css[css.scheme].linkVisited);
  });
</script>

<div
  style:display="flex"
  style:flex-direction="column"
  style:height="100%"
  style:min-height="0"
>
  <LeftMenuLayout bind:open>
    {#snippet header()}
      <Header
        bind:open
        -pad="4px"
        -bgc="rgba(128,128,128,0.7)"
        -w="100%"
        -dsp="block"
        -backdrop-filter="blur(4px)"
        -zi="9999"
      />
    {/snippet}

    {#snippet footer()}
      <footer
        style:padding="4px"
        style:font-size="9pt"
        style:font-weight="bold"
        style:text-align="center"
        style:background-color="rgba(128,128,128,0.7)"
      >
        &copy;2026 KUROKO WORKS
      </footer>
    {/snippet}

    {#snippet sidebar()}
      <div {...at({ h: "100%" })}>
        <LeftMenu />
      </div>
    {/snippet}
    <!-- そのままタグ装飾せずに出さないとflexが壊れる -->
    {@render children?.()}
  </LeftMenuLayout>
</div>
