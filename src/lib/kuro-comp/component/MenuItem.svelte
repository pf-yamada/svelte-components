<script lang="ts">
  import { type Snippet } from "svelte";
  import { at, type ButtonAttributes } from "../css.svelte";

  let {
    disabled = false,
    onClick,
    children,
    ...rest
  }: {
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
    children: Snippet<[]>;
  } & ButtonAttributes = $props();
</script>

<button
  type="button"
  {disabled}
  onclick={(e: MouseEvent) => {
    onClick?.(e);
  }}
  {...at(rest)}
>
  {@render children()}
</button>

<style>
  button {
    padding: 6px 9px;

    border: 0;
    background: transparent;
    min-height: 26px;
    text-align: left;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: #f5f5f5;
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>
