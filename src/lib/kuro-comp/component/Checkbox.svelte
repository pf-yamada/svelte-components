<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    css,
    at,
    type Color,
    type InputAttributes,
    CheckIcon,
  } from "../css.svelte";

  let {
    checked = $bindable(),
    children,
    gap,
    "-box-size": boxSize,
    "-box-color": boxColor,
    onChange,
    ...rest
  }: {
    checked: boolean;
    children?: Snippet<[]>;
    gap?: string;
    "-box-size"?: string;
    "-box-color"?: Color;
    onChange?: (v: boolean) => void;
  } & InputAttributes = $props();

  const attr = $derived({
    class: "checkbox",
    "--box-color": boxColor ?? "blue",
    "--box-size": boxSize ?? "18px",
    "--label-gap": gap ?? "0.5rem",
    "-pad": "4px",
  } satisfies InputAttributes);

  let checkColor = $derived(css.getFgc(attr["--box-color"] ?? "blue"));
</script>

<label {...at(attr, rest)}>
  <input
    type="checkbox"
    bind:checked
    onchange={(e: Event) => onChange?.(checked)}
  />
  <span class="box">
    <span class:checked class="check">
      <CheckIcon fill={checkColor} -w="100%" -h="100%" />
    </span>
  </span>
  {@render children?.()}
</label>

<style>
  input {
    display: none;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: var(--label-gap);
    cursor: pointer;
  }

  /*
        ボックス
    */
  .box {
    width: var(--box-size);
    height: var(--box-size);
    border: 2px solid #666;
    background-color: #f0f0f0;
    border-radius: 6px;
    position: relative;
    transition: 0.2s;
  }

  /*
        チェックマーク
  */
  .check {
    position: absolute;
    inset: 0;
    transform: rotate(-180deg) scale(0);
    opacity: 0;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }
  .check.checked {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }

  /*
    影
  */
  .box::before {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 6px;
    background: rgba(99, 102, 241, 0.15);
    transform: scale(0);
    transition: transform 0.3s;
  }

  /*
        チェックされたボックス
    */
  input:checked + .box {
    background: var(--box-color);
  }

  /*
        チェック時のチェックマーク
  */
  input:checked + .box::after {
    transform: rotate(45deg) scale(1);
  }

  .checkbox:hover .box {
    transform: scale(1.2);
  }
  .checkbox:hover .box::before {
    transform: scale(0.8);
  }
</style>
