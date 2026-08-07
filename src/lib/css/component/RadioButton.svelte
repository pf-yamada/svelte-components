<script lang="ts">
  import { type Snippet } from "svelte";
  import { at, type Color, type InputAttributes } from "../css.svelte";

  let {
    value,
    group = $bindable(),
    "-button-size": buttonSize,
    "-point-inset": pointInset,
    "-point-color": pointColor,
    "-active-border": activeBorder,
    "-deactive-border": deactiveBorder,
    onclick,
    children,
    ...rest
  }: {
    value?: any;
    label?: string;
    group?: any;
    "-button-size"?: string;
    "-point-inset"?: string;
    "-point-color"?: Color;
    "-active-border"?: string;
    "-deactive-border"?: string;
    onclick?: (v: any) => void;
    children?: Snippet<[]>;
  } & InputAttributes = $props();

  const attr = $derived({
    class: "radio",
    "-gap": "0.2rem",
    "-white-space": "nowrap",
    "--button-size": buttonSize ?? "16px",
    "--inset-size": pointInset ?? "2px",
    "--point-color": pointColor ?? "#33f",
    "--active-border": activeBorder ?? "2px solid #33f",
    "--deactive-border": deactiveBorder ?? "2px solid #aaa",
  });
</script>

<label {...at(attr, rest)}>
  <input
    type="radio"
    {value}
    bind:group
    onclick={(e: MouseEvent) => onclick?.(value)}
  />
  <div class="circle"></div>
  {@render children?.()}
</label>

<style>
  /* 本来のラジオボタンは非表示にする */
  input {
    display: none;
  }

  .circle {
    width: var(--button-size);
    height: var(--button-size);
    border: var(--deactive-border);
    border-radius: 50%;
    position: relative;
    transition:
      border-color 0.25s ease,
      transform 0.2s ease;
  }

  /* 中の丸 */
  .circle::after {
    content: "";
    position: absolute;
    inset: var(--inset-size);
    border-radius: 50%;
    background: var(--point-color);
    transform: scale(0);
    transition: transform 0.25s ease;
  }

  /* 背景の薄い丸 */
  .circle::before {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.15);
    transform: scale(0);
    transition: transform 0.3s;
  }

  /*
    選択中なら外周の色を変えて中丸を表示
  */
  input:checked + .circle {
    border: var(--active-border);
  }

  input:checked + .circle::after {
    transform: scale(1);
  }

  /*
      テキストを含むボタン全体
  */
  .radio {
    display: inline-flex;
    align-items: center;

    gap: var(--label-gap); /* ボタンとラベルの隙間 */
    cursor: pointer;
    user-select: none;
  }

  /* ホバーしたときにcircleを大きくする */
  .radio:hover .circle {
    transform: scale(1.2);
  }

  /* クリックした瞬間ちょっと小さくする（押された感を出す） */
  .radio:active .circle {
    transform: scale(1);
  }

  /* テキストを含むボタン全体にホバーしたら背景の薄い丸井のサイズを変える */
  .radio:hover .circle::before {
    transform: scale(0.8);
  }
</style>
