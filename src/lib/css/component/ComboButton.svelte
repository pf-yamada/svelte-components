<script lang="ts">
  import {
    at,
    css,
    type CssAttributes,
    type DivAttributes,
    Button,
  } from "../css.svelte";

  let {
    onclick,
    value = $bindable(),
    options,
    "label-name": labelName = "label",
    "value-name": valueName = "value",
    "style-name": styleName = "style",
    "-base-style": baseStyle,
    "-start-style": startStyle,
    "-end-style": endStyle,
    "-active-style": activeStyle,
    "-deactive-style": deactiveStyle,
    ...rest
  }: {
    onclick?: (v: any, w: any) => void;
    value?: any;
    options: any[];
    "label-name"?: string;
    "value-name"?: string;
    "style-name"?: string;
    "-base-style"?: CssAttributes;
    "-start-style"?: CssAttributes;
    "-end-style"?: CssAttributes;
    "-active-style"?: CssAttributes;
    "-deactive-style"?: CssAttributes;
  } & DivAttributes = $props();

  const click = (v: any, w: any) => {
    value = v;
    onclick?.(v, w);
  };

  // デフォルトスタイル

  // 実際のスタイル（リアクティブ）
  let base = $derived<CssAttributes>({
    ...{
      "-mgn": "0px",
      "-pad": "8px",
      "-rad": "0px",
      "-box-shadow": "none",
    },
    ...baseStyle,
  });

  let start = $derived<CssAttributes>({
    ...{
      "-rad": css.front("16px"),
    },
    ...startStyle,
  });

  let end = $derived<CssAttributes>({
    ...{ "-rad": css.back("16px") },
    ...endStyle,
  });

  // スタティックなスタイル
  const { outline, active, deactive } = {
    outline: {
      "-sha": css.boxShadow,
      "-dsp": "inline-flex",
      "-rad": "16px",
    },
    active: {
      "-text-decoration": "underline",
      "-text-underline-offset": "4px",
      "-text-decoration-thickness": "2px",
    },
    deactive: { "-filter": "brightness(0.80)" },
  };
</script>

<div {...at(outline, rest)}>
  {#each options as option, i}
    {@const label = option[labelName] ?? option[valueName] ?? option}
    {@const selected = option[valueName] === value ? active : deactive}
    {@const button = option[styleName] ?? {}}

    {#if i === 0}
      <Button
        {...base}
        {...button}
        {...start}
        {...selected}
        onclick={() => click(option[valueName], option)}
      >
        {label}
      </Button>
    {:else if i === options.length - 1}
      <Button
        {...base}
        {...button}
        {...end}
        {...selected}
        onclick={() => click(option[valueName], option)}
      >
        {label}
      </Button>
    {:else}
      <Button
        {...base}
        {...button}
        {...selected}
        onclick={() => click(option[valueName], option)}
      >
        {label}
      </Button>
    {/if}
  {/each}
</div>
