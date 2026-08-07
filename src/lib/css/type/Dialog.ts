import { type Value } from "../css.svelte.ts";

export type BindDialog = {
  show: () => Promise<Value>;
  exit: (code: Value) => void;
};
