import { type Value } from "../css.svelte.ts";

export type BindDialog = {
  show: () => void;
  showSync: () => Promise<Value>;
  exit: (code: Value) => void;
};
