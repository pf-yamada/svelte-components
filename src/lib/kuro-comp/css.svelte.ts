import {
  type HTMLAttributes,
  type HTMLButtonAttributes,
  type SVGAttributes as SvelteSVGAttributes,
  type HTMLSelectAttributes,
  type HTMLOptionAttributes,
  type HTMLInputAttributes,
} from "svelte/elements";

import { contrast } from "./lib/Colors.ts";
import { type Color, type Css } from "./lib/Types.ts";
import { type CssAliases, cssAliases } from "./lib/Aliases.ts";
// /**
//  * svelteコンポーネントに指定できるCSS属性の型
//  */

export const css = $state({
  scheme: "light" as "light" | "dark",
  which: <T>(light: T, dark: T): T => {
    return css.scheme === "light" ? light : dark;
  },

  light: {
    fgc: "#000000",
    bgc: "#ffffff",
    boxFgc: "#202020",
    boxBgc: "#e0e0e8",
    bdr: "#606060 solid 1px",
    boxShadow: "2px 4px 8px 0px rgba(0, 0, 0, 0.3)",
    linkColor: "#0000ff",
    linkVisited: "#d000d0",
    linkHover: "#ff00ff",
  },
  dark: {
    fgc: "#ffffff",
    bgc: "#000000",
    boxFgc: "#c0c0c8",
    boxBgc: "#404040",
    bdr: "#a0a0a0 solid 1px",
    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.8)",
    linkColor: "#0080ff",
    linkVisited: "#d000d0",
    linkHover: "#ff00ff",
  },

  get fgc() {
    return css[css.scheme].fgc as Color;
  },

  get bgc() {
    return css[css.scheme].bgc as Color;
  },

  get bdr() {
    return css[css.scheme].bdr as string;
  },

  get boxFgc() {
    return css[css.scheme].boxFgc as Color;
  },

  get boxBgc() {
    return css[css.scheme].boxBgc as Color;
  },

  get boxShadow() {
    return css[css.scheme].boxShadow as Color;
  },

  getFgc(bgc: Color) {
    return css.contrast(bgc, css.light.fgc, css.dark.fgc);
  },

  // １か所指定
  top: (size: string = "8px") => {
    return `${size} 0px 0px 0px`;
  },
  right: (size: string = "8px") => {
    return `0px ${size} 0px 0px`;
  },
  bottom: (size: string = "8px") => {
    return `0px 0px ${size} 0px`;
  },
  left: (size: string = "8px") => {
    return `0px 0px 0px ${size}`;
  },
  // ２か所指定
  upper: (size: string = "8px") => {
    return `${size} ${size} 0px 0px`;
  },
  back: (size: string = "8px") => {
    return `0px ${size} ${size} 0px`;
  },
  lower: (size: string = "8px") => {
    return `0px 0px ${size} ${size}`;
  },
  front: (size: string = "8px") => {
    return `${size} 0px 0px ${size}`;
  },
  vertical: (size: string = "8px") => {
    return `${size} 0px ${size} 0px`;
  },
  horizontal: (size: string = "8px") => {
    return `0px ${size} 0px ${size}`;
  },
  // ３か所指定
  tip1: (size: string = "8px") => {
    return `0px ${size} ${size} ${size}`;
  },
  tip2: (size: string = "8px") => {
    return `${size} 0px ${size} ${size}`;
  },
  tip3: (size: string = "8px") => {
    return `${size} ${size} 0px ${size}`;
  },
  tip4: (size: string = "8px") => {
    return `${size} ${size} ${size} 0px`;
  },
  // ４か所指定
  around: (size: string = "8px") => {
    return `${size} ${size} ${size} ${size}`;
  },

  // aliases
  leaf: (size: string = "8px") => {
    return css.vertical(size);
  },
  reaf: (size: string = "8px") => {
    return css.horizontal(size);
  },
  flat: () => {
    return css.around("0px");
  },
  square: () => {
    return css.around("4px");
  },

  contrast: (base: string, ...candidates: string[]) => {
    return contrast(base, ...candidates);
  },
});

//
// この関数は、コンポーネントの属性生成に呼び出してはいけない
// 最下層のHTMLのtagにだけ呼び出してよい
//
// deno-lint-ignore no-explicit-any
export const at = (...attributes: any[]) => {
  const attr: { [key: string]: string } = {};
  const style: { [key: string]: string } = {};

  for (const values of attributes) {
    if (!values) continue;
    for (const k of Object.keys(values)) {
      // エイリアスならCssのキーに変換、槽でなければそのまま
      const val = values[k as keyof typeof values];
      const key = cssAliases[k as keyof typeof cssAliases] ?? k;

      // CssAttributesをクラスとスタイルにまとめる

      // これはCSSプロパティなのでcssにまわす
      if (key.startsWith("--")) {
        style[key] = val;
      }
      // これは直のスタイル指定なのでハイフンを取り除いて配置
      else if (key.startsWith("-")) {
        style[key.slice(1)] = val;
      }
      // それ以外は属性値のはずなのでタグに渡す
      else {
        attr[k] = val;
      }
    }
  }
  // スタイル拡張パッチ処理
  if (style["background-color"] && style["color"] === "auto") {
    const bgc = style["background-color"];
    style["color"] = css.contrast(bgc, css.light.fgc, css.dark.fgc);
  }

  let s = "";
  for (const k in style) {
    s += `${k}:${style[k]};`;
  }
  if (s) attr["style"] = s;

  return attr;
};

/**
 * IDを生成する
 *
 * @param length
 * @returns
 */
export function generateId(length: number = 12): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const result: string[] = [];

  // 文字種数で割り切れる値を上限にする
  const max = 256 - (256 % chars.length);

  while (result.length < length) {
    // 16バイトの乱数を取得
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    // 生成した乱数を使って文字を選ぶ
    for (const byte of bytes) {
      if (byte >= max) continue;
      result.push(chars[byte % chars.length]);
      if (result.length === length) break;
    }
  }
  return result.join("");
}

// // component
export { default as Button } from "./component/Button.svelte";
export { default as Combo } from "./component/Combo.svelte";
export { default as Switch } from "./component/Switch.svelte";
export { default as Radio } from "./component/Radio.svelte";
export { default as Checkbox } from "./component/Checkbox.svelte";
export { default as Select } from "./component/Select.svelte";
export { default as Multiple } from "./component/Multiple.svelte";
export { default as Input } from "./component/Input.svelte";
export { default as Code } from "./component/Code.svelte";
export { default as Tree } from "./component/Tree.svelte";
export { default as Popup } from "./component/Popup.svelte";
export { default as Dialog } from "./component/Dialog.svelte";
export { default as MenuItem } from "./component/MenuItem.svelte";

// layout
export { default as LeftMenuLayout } from "./layout/LeftMenuLayout.svelte";
export { default as RightMenuLayout } from "./layout/RightMenuLayout.svelte";

// icon
export { default as AddCircleIcon } from "./icon/AddCircleIcon.svelte";
export { default as CancelCircleIcon } from "./icon/CancelCircleIcon.svelte";
export { default as ArrowDropDownIcon } from "./icon/ArrowDropDownIcon.svelte";
export { default as CheckIcon } from "./icon/CheckIcon.svelte";
export { default as MoreVertIcon } from "./icon/MoreVertIcon.svelte";

// sample
export { default as Demo } from "./demo/@Demo.svelte";
export { default as ButtonDemo } from "./demo/ButtonDemo.svelte";
export { default as ComboDemo } from "./demo/ComboDemo.svelte";
export { default as SwitchDemo } from "./demo/SwitchDemo.svelte";
export { default as RadioDemo } from "./demo/RadioDemo.svelte";
export { default as CheckboxDemo } from "./demo/CheckboxDemo.svelte";
export { default as IconDemo } from "./demo/IconDemo.svelte";
export { default as SelectDemo } from "./demo/SelectDemo.svelte";
export { default as MultipleDemo } from "./demo/MultipleDemo.svelte";
export { default as InputDemo } from "./demo/InputDemo.svelte";
export { default as CodeDemo } from "./demo/CodeDemo.svelte";
export { default as TreeDemo } from "./demo/TreeDemo.svelte";
export { default as PopupDemo } from "./demo/PopupDemo.svelte";
export { default as MenuItemDemo } from "./demo/MenuItemDemo.svelte";
export { default as DialogDemo } from "./demo/DialogDemo.svelte";
export { default as LeftMenuLayoutDemo } from "./demo/LeftMenuLayoutDemo.svelte";
export { default as RightMenuLayoutDemo } from "./demo/RightMenuLayoutDemo.svelte";

// type
export type { Color };

// 属性型
export type CssAttributes = Css & CssAliases & { [key: `--${string}`]: string };
export type DivAttributes = CssAttributes & HTMLAttributes<HTMLDivElement>;
export type PreAttributes = CssAttributes & HTMLAttributes<HTMLPreElement>;
export type SpanAttributes = CssAttributes & HTMLAttributes<HTMLSpanElement>;
export type FieldSetAttributes = CssAttributes &
  HTMLAttributes<HTMLFieldSetElement>;
export type InputAttributes = CssAttributes & HTMLInputAttributes;
export type ButtonAttributes = CssAttributes & HTMLButtonAttributes;
export type SVGAttributes = CssAttributes & SvelteSVGAttributes<SVGSVGElement>;
export type SelectAttributes = CssAttributes & HTMLSelectAttributes;
export type OptionAttributes = CssAttributes & HTMLOptionAttributes;

// その他
export { type BindPopup } from "./type/Popup.ts";
export {
  type BindTree,
  type TreeNode,
  type DropPosition,
} from "./type/Tree.ts";
export { type BindDialog } from "./type/Dialog.ts";

// anyのかわり
export type Value =
  | string
  | number
  | boolean
  | undefined
  | null
  | Value[]
  | { [key: string | number | symbol]: Value };
