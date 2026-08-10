<script lang="ts">
  import { at, css, type InputAttributes } from "../css.svelte";

  type LocalEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

  let {
    value = $bindable(),
    onvalue,
    ...rest
  }: {
    value: string | null;
    onvalue?: (
      value?: string | null,
      validator?: (value: string | null) => boolean,
      e?: LocalEvent,
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
  oninput={(e: LocalEvent) => onvalue?.(value, input.checkValidity, e)}
  {...at(attr, rest)}
/>
