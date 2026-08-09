<script lang="ts">
  import {
    css,
    Combo,
    type CssAttributes,
    type DivAttributes,
  } from "../css.svelte";

  let {
    value = $bindable(),
    onclick,
    "true-label": trueLabel = "ON",
    "false-label": falseLabel = "OFF",
    "-active-style": activeStyle = { "-bgc": "#d80000" },
    "-deactive-style": deactiveStyle = { "-bgc": "gray" },
    ...rest
  }: {
    value: boolean;
    onclick?: (v: boolean) => void;
    "true-label"?: string;
    "false-label"?: string;
    "-active-style"?: CssAttributes;
    "-deactive-style"?: CssAttributes;
  } & DivAttributes = $props();

  let trueStyle = $derived(
    typeof value === "boolean"
      ? value
        ? activeStyle
        : deactiveStyle
      : deactiveStyle,
  );
  let falseStyle = $derived(
    typeof value === "boolean"
      ? value
        ? deactiveStyle
        : activeStyle
      : deactiveStyle,
  );
</script>

<Combo
  bind:value
  options={[
    {
      k: trueLabel,
      v: true,
      s: trueStyle,
    },
    {
      k: falseLabel,
      v: false,
      s: falseStyle,
    },
  ]}
  label-name="k"
  value-name="v"
  style-name="s"
  {onclick}
  -gap="1px"
  -start-style={{
    "-rad": css.front("12px"),
    "-fs": "inherit",
    "-pad": "7px 6px 8px 10px",
  }}
  -end-style={{
    "-rad": css.back("12px"),
    "-fs": "inherit",
    "-pad": "7px 10px 8px 6px",
  }}
  {...{ "-rad": "16px" }}
  {...rest}
/>
