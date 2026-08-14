<script lang="ts">
  import { at, css } from "../css.svelte";

  let {
    value = $bindable(),
    placeholder = "",
    disabled = false,
    rows = 4,
    cols,
    ...rest
  }: {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    cols?: number;
  } = $props();
</script>

<textarea
  bind:value
  {placeholder}
  {disabled}
  {rows}
  {cols}
  style:border={css.bdr}
  style:border-radius="8px"
  style:padding="8px"
  style:box-shadow={css.boxShadow}
  {...at(rest)}
></textarea>
