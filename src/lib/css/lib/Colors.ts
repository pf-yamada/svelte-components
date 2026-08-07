import type { Color } from "./Types.ts";

type RGB = [number, number, number];

export const presetColors = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  transparent: "#00000000",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
} as const;

/**
 * sRGBの値を「線形RGB (Linear RGB)」に変換する
 * 見た目用に圧縮されたRGB値を、物理的な光の強さに戻す
 *
 * @param srgb
 * @returns
 */
function srgbToLinear(srgb: number) {
  srgb /= 255;
  if (srgb <= 0.04045) return srgb / 12.92;
  return ((srgb + 0.055) / 1.055) ** 2.4;
}

/**
 * WCAG 2.2 および IEC 61966-2-1 (sRGB) の定義
 * その色がどれくらい明るく見えるかを0〜1の値で表現
 *
 * @param param0
 * @returns
 */
function luminance([r, g, b]: RGB): number {
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

/**
 * hslをrgbに変換
 *
 * @param h
 * @param s
 * @param l
 * @returns
 */
function hslToRgb(h: number, s: number, l: number): RGB {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

/**
 * 様々な色指定をRGBに変換する
 *
 * @param color
 * @returns
 */
function parseColor(color: string): RGB {
  color = color.trim().toLowerCase();

  // 色名
  if (color in presetColors) {
    color = presetColors[color as keyof typeof presetColors];
  }

  // #RGB
  let m = color.match(/^#([0-9a-f]{3})$/i);
  if (m) {
    return [
      parseInt(m[1][0] + m[1][0], 16),
      parseInt(m[1][1] + m[1][1], 16),
      parseInt(m[1][2] + m[1][2], 16),
    ];
  }

  // #RGBA
  m = color.match(/^#([0-9a-f]{4})$/i);
  if (m) {
    return [
      parseInt(m[1][0] + m[1][0], 16),
      parseInt(m[1][1] + m[1][1], 16),
      parseInt(m[1][2] + m[1][2], 16),
    ];
  }

  // #RRGGBB
  m = color.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    return [
      parseInt(m[1].slice(0, 2), 16),
      parseInt(m[1].slice(2, 4), 16),
      parseInt(m[1].slice(4, 6), 16),
    ];
  }

  // #RRGGBBAA
  m = color.match(/^#([0-9a-f]{8})$/i);
  if (m) {
    return [
      parseInt(m[1].slice(0, 2), 16),
      parseInt(m[1].slice(2, 4), 16),
      parseInt(m[1].slice(4, 6), 16),
    ];
  }

  // rgb()/rgba()
  m = color.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+)?\s*\)$/i,
  );
  if (m) {
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  }

  // hsl/hsla
  m = color.match(
    /^hsla?\(\s*([\d.]+)(?:deg)?(?:\s*,|\s+)\s*([\d.]+)%\s*(?:,|\s+)\s*([\d.]+)%(?:\s*(?:\/|,)\s*[\d.]+)?\s*\)$/i,
  );

  if (m) {
    return hslToRgb(Number(m[1]), Number(m[2]), Number(m[3]));
  }

  throw new Error(`Unsupported color: ${color}`);
}

/**
 * WCAGのコントラスト比を求める
 *
 * @param a
 * @param b
 * @returns
 */
function contrastRatio(a: RGB, b: RGB): number {
  const l1 = luminance(a);
  const l2 = luminance(b);

  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);

  return (light + 0.05) / (dark + 0.05);
}

/**
 * 候補の中から一番コントラスト比の高いものを選ぶ
 *
 * @param background
 * @param candidates
 * @returns
 */
export function contrast(background: string, ...candidates: string[]) {
  if (candidates.length === 0) {
    throw new Error("候補色を1つ以上指定してください");
  }

  const bg = parseColor(background);

  let best = candidates[0];
  let bestContrast = 0;

  for (const candidate of candidates) {
    const fg = parseColor(candidate);
    const contrast = contrastRatio(bg, fg);

    if (contrast > bestContrast) {
      bestContrast = contrast;
      best = candidate;
    }
  }

  return best as Color;
}
