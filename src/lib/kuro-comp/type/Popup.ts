import { type Value } from "../css.svelte.ts";

export type BindPopup = {
  show: (xpos: number, ypos: number) => Promise<Value>;
  exit: (code: Value) => void;
};
