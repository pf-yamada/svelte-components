<script lang="ts">
  import { at, css, type InputAttributes } from "../css.svelte";

  let {
    value = $bindable(),
    onValue,
    ...rest
  }: {
    value?: string;
    onValue?: (
      e?: Event,
      value?: string,
      validator?: (value: string) => boolean,
    ) => void;
  } & InputAttributes = $props();

  let input: HTMLInputElement;
</script>

<input
  bind:this={input}
  bind:value
  style:border-radius="9999px"
  style:border={css.bdr}
  style:box-shadow={css.boxShadow}
  style:padding="6px 12px"
  oninput={(e: Event) => onValue?.(e, value, input.checkValidity)}
  {...at(rest)}
/>
