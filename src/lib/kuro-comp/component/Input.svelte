<script lang="ts">
  import { at, css, type InputAttributes } from "../css.svelte";

  let {
    value = $bindable(),
    onValue,
    ...rest
  }: {
    value: string | null;
    onValue?: (
      e?: Event,
      value?: string | null,
      validator?: (value: string | null) => boolean,
    ) => void;
  } & InputAttributes = $props();

  let input: HTMLInputElement;

  let attr = $derived({
    "-rad": "9999px",
    "-bdr": css.bdr,
    "-sha": css.boxShadow,
    "-pad": "6px 12px",
  });
</script>

<input
  bind:this={input}
  bind:value
  oninput={(e: Event) => onValue?.(e, value, input.checkValidity)}
  {...at(attr, rest)}
/>
