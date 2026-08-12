<script lang="ts">
  import "../app.css";

  import { type Snippet } from "svelte";
  import { css, at, LeftMenuLayout } from "$lib/kuro-comp/css.svelte";
  import MainMenu from "$lib/app/MainMenu.svelte";

  let { children }: { children: Snippet<[]> } = $props();

  let open = $state(true);

  $effect(() => {
    const root = document.documentElement;
    root.style.colorScheme = css.scheme;
    root.style.setProperty("--bgc", css.bgc);
    root.style.setProperty("--fgc", css.fgc);
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
      <div
        style:padding="4px"
        style:background-color="rgba(128,128,128,0.7)"
        style:width="100%"
        style:display="block"
        style:backdrop-filter="blur(4px)"
        style:z-index="9999"
      >
        <button
          class="toggle"
          onclick={() => (open = !open)}
          {...at({ "-box-shadow": css.boxShadow })}
        >
          ☰
        </button>
      </div>
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
      <!-- <div {...at({ h: "100%" })}>menu</div> -->
      <MainMenu />
    {/snippet}
    <!--
      そのままタグ装飾せずに出さないとflexが引き継がれない。
      または、それを意識したタグでくくらないといけない。
    -->
    {@render children?.()}
  </LeftMenuLayout>
</div>

<style>
  .toggle {
    z-index: 1100;
  }
</style>
