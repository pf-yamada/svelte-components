<script lang="ts">
  import "../app.css";

  import { type Snippet } from "svelte";
  import { css, at, LeftMenuLayout } from "$lib/css/css.svelte";
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
    <div
      {...at({
        "-pad": "4px",
        "-fs": "9pt",
        "-fw": "bold",
        "-text-align": "center",
      })}
    >
      &copy;2026 KUROKO WORKS
    </div>
  {/snippet}

  {#snippet sidebar()}
    <div {...at({ h: "100%" })}>
      <LeftMenu />
    </div>
  {/snippet}

  <div {...at({ pad: "8px" })}>
    {@render children?.()}
  </div>
</LeftMenuLayout>
