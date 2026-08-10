<script lang="ts">
  import { type Snippet, onMount } from "svelte";
  import {
    type ButtonAttributes,
    type DivAttributes,
    ArrowDropDownIcon,
    at,
    Button,
    Checkbox,
    css,
  } from "../css.svelte";

  let {
    value = $bindable([]),
    options = [],
    "value-name": valueName = "value",
    "label-name": labelName = "label",
    "style-name": styleName = "style",
    item,
    onvalue,
    ...rest
  }: {
    value?: any[];
    options: any[];
    "value-name"?: string;
    "style-name"?: string;
    "label-name"?: string;
    item?: Snippet<[option: any]>;
    onvalue?: (v: any) => void;
  } & ButtonAttributes = $props();

  let values = $state<{ [key: string]: boolean }>({});

  let open = $state(false);
  // svelte-ignore non_reactive_update
  let dropdown: HTMLDivElement;

  const handleClick = (event: MouseEvent) => {
    if (!dropdown?.contains(event.target as Node)) {
      open = false;
    }
  };

  $effect(() => {
    value = Object.keys(values).filter((key) => values[key]);
  });
  $effect(() => {
    onvalue?.(value);
  });

  onMount(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
</script>

{#if options.length > 0}
  <div class="relative">
    <Button
      -mgn="0"
      onclick={(e) => {
        e.stopPropagation();
        open = !open;
      }}
      {...rest}
    >
      {#if value.length === 0}
        選択してください
      {:else}
        {value.length}件選択中
      {/if}
      <ArrowDropDownIcon fill="currentcolor" />
    </Button>

    {#if open}
      <div bind:this={dropdown} style="position:relative;">
        <div
          {...at({
            "-bgc": css.boxBgc,
            "-fgc": "auto",
            "-bdr": css.bdr,
            "-dsp": "flex",
            "-flx-d": "column",
            "-pos": "absolute",
            "-rad": "8px",
            "-max-h": "160px",
            "-of": "auto",
            "-zi": "50",
            "-pad": "4px",
            "-left": "0px",
            "-sha": css.boxShadow,
          } satisfies DivAttributes)}
        >
          {#each options as option, i}
            <Checkbox
              bind:checked={values[option[valueName]]}
              value={option[valueName]}
              {...option[styleName]}
            >
              {#if item}
                {@render item(option)}
              {:else}
                {option[labelName]}
              {/if}
            </Checkbox>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <span>選択肢がありません</span>
{/if}
