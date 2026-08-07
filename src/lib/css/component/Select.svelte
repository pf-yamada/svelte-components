<script lang="ts">
  import { type Snippet } from "svelte";
  import { at, css, type SelectAttributes } from "../css.svelte";

  let {
    value = $bindable(),
    options = [],
    "value-name": valueName = "value",
    "label-name": labelName = "label",
    "style-name": styleName = "style",
    label,
    onvalue,
    ...rest
  }: {
    value?: any;
    options: any[];
    "value-name"?: string;
    "style-name"?: string;
    "label-name"?: string;
    label?: Snippet<[option: any]>;
    onvalue?: (v: any, e: Event) => void;
  } & SelectAttributes = $props();

  const attr = $derived<SelectAttributes>({
    "-fgc": "auto",
    "-bgc": css.bgc,
    "-pad": "4px",
    "-mgn": "2px",
    "-bdr": "1px darkgray solid",
    "-rad": "8px",
    "-sha": css.boxShadow,
  });
</script>

<select
  bind:value
  onchange={(e) => {
    onvalue?.(value, e);
  }}
  {...at(attr, rest)}
>
  {#each options ?? [] as option}
    <option
      value={option[valueName]}
      {...at({ fs: "inherit", fw: "inherit" }, option[styleName])}
    >
      {#if label}
        {@render label(option)}
      {:else}
        {option[labelName]}
      {/if}
    </option>
  {/each}
</select>
