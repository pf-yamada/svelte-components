<script>
  import { LeftMenuLayout, Button } from "../css.svelte";

  let open = $state(true);
</script>

<LeftMenuLayout bind:open -pad="16px">
  {#snippet header()}
    <div
      style:padding="4px"
      style:font-size="9pt"
      style:font-weight="bold"
      style:text-align="center"
      style:background-color="blue"
      style:color="white"
    >
      header
    </div>
  {/snippet}

  {#snippet footer()}
    <div
      style:padding="4px"
      style:font-size="9pt"
      style:font-weight="bold"
      style:text-align="center"
      style:background-color="blue"
      style:color="white"
    >
      footer
    </div>
  {/snippet}

  {#snippet sidebar()}
    <div>menu</div>
  {/snippet}
  <div style:padding="8px">
    <Button onClick={() => (open = !open)}>{open ? "close" : "open"}</Button>
  </div>
</LeftMenuLayout>
