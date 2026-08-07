import { type Css } from "./Types.ts";

export const cssAliases = {
  "-sha": "-box-shadow",
  "-sha-b": "-box-shadow",
  "-sha-t": "-text-shadow",
  "-fgc": "-color",
  "-bg": "-background",
  "-bgc": "-background-color",
  "-mgn": "-margin",
  "-rad": "-border-radius",
  "-pad": "-padding",
  "-bdr": "-border",
  "-fnt": "-font",
  "-dsp": "-display",
  "-pos": "-position",
  "-ff": "-font-family",
  "-fw": "-font-weight",
  "-fs": "-font-size",
  "-w": "-width",
  "-h": "-height",
  "-gap": "-gap",
  "-flx": "-flex",
  "-flx-d": "-flex-direction",
  "-max-h": "-max-height",
  "-max-w": "-max-width",
  "-min-h": "-min-height",
  "-min-w": "-min-width",
  "-of": "-overflow",
  "-of-x": "-overflow-x",
  "-of-y": "-overflow-y",
  "-zi": "-z-index",
  "-cur": "-cursor",
} as const satisfies Record<string, keyof Css>;

// typescriptはすげーよほんと
export type CssAliases = {
  [K in keyof typeof cssAliases]?: Css[(typeof cssAliases)[K]];
};
