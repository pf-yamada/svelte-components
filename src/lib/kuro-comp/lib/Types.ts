import { presetColors } from "./Colors.ts";
export type PresetColors = keyof typeof presetColors;

import {
  cssGlobal,
  alignContent,
  alignItems,
  alignSelf,
  backgroundRepeat,
  borderStyle,
  boxSizing,
  cursor,
  display,
  flexDirection,
  flexWrap,
  justifyContent,
  justifySelf,
  overflow,
  pointerEvents,
  position,
  textAlign,
  textOverflow,
  whiteSpace,
  wordBreak,
  visibility,
} from "./Values.ts";

/**
 * 値の型
 */
export type CssGlobal = (typeof cssGlobal)[number];
export type AlignContent = (typeof alignContent)[number] | CssGlobal;
export type AlignItems = (typeof alignItems)[number] | CssGlobal;
export type AlignSelf = (typeof alignSelf)[number] | CssGlobal;
export type BackgroundRepeat = (typeof backgroundRepeat)[number] | CssGlobal;
export type BorderStyle = (typeof borderStyle)[number] | CssGlobal;
export type BoxSizing = (typeof boxSizing)[number] | CssGlobal;
export type Color =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | `hsla(${string})`
  | "transparent"
  | "currentcolor"
  | PresetColors
  | CssGlobal;
export type Cursor = (typeof cursor)[number] | CssGlobal;
export type Display = (typeof display)[number] | CssGlobal;
export type FlexDirection = (typeof flexDirection)[number] | CssGlobal;
export type FlexWrap = (typeof flexWrap)[number] | CssGlobal;
export type JustifyContent = (typeof justifyContent)[number] | CssGlobal;
export type JustifySelf = (typeof justifySelf)[number] | CssGlobal;
export type Overflow = (typeof overflow)[number] | CssGlobal;
export type PointerEvents = (typeof pointerEvents)[number] | CssGlobal;
export type Position = (typeof position)[number] | CssGlobal;
export type TextAlign = (typeof textAlign)[number] | CssGlobal;
export type TextOverflow = (typeof textOverflow)[number] | CssGlobal;
export type WhiteSpace = (typeof whiteSpace)[number] | CssGlobal;
export type WordBreak = (typeof wordBreak)[number] | CssGlobal;
export type Visibility = (typeof visibility)[number] | CssGlobal;

/**
 * CSSの型（ほぼ網羅してると思われる）
 */
export type Css = {
  // accent
  "-accent-color"?: string;

  // align
  "-align-content"?: string;
  "-align-items"?: string;
  "-align-self"?: string;
  "-align-tracks"?: string;

  // alignment
  "-alignment-baseline"?: string;

  // anchor
  "-anchor-default"?: string;
  "-anchor-name"?: string;
  "-anchor-scope"?: string;
  "-anchor-size"?: string;

  // appearance
  "-appearance"?: string;

  // animation
  "-animation"?: string;
  "-animation-delay"?: string;
  "-animation-direction"?: string;
  "-animation-duration"?: string;
  "-animation-fill-mode"?: string;
  "-animation-iteration-count"?: string;
  "-animation-name"?: string;
  "-animation-play-state"?: string;
  "-animation-range"?: string;
  "-animation-range-start"?: string;
  "-animation-range-end"?: string;
  "-animation-timeline"?: string;
  "-animation-timing-function"?: string;

  // aspect
  "-aspect-ratio"?: string;

  // backdrop
  "-backdrop-filter"?: string;

  // backface
  "-backface-visibility"?: string;

  // background
  "-background"?: string;
  "-background-attachment"?: string;
  "-background-blend-mode"?: string;
  "-background-clip"?: string;
  "-background-color"?: Color;
  "-background-image"?: string;
  "-background-origin"?: string;
  "-background-position"?: string;
  "-background-position-block"?: string;
  "-background-position-inline"?: string;
  "-background-position-x"?: string;
  "-background-position-y"?: string;
  "-background-repeat"?: string;
  "-background-repeat-x"?: string;
  "-background-repeat-y"?: string;
  "-background-size"?: string;

  // baseline
  "-baseline-shift"?: string;

  // bleed
  "-bleed"?: string;

  // block
  "-block-ellipsis"?: string;
  "-block-size"?: string;
  "-block-step"?: string;

  // bookmark
  "-bookmark-label"?: string;
  "-bookmark-level"?: string;
  "-bookmark-state"?: string;

  // border
  "-border"?: string;
  "-border-block"?: string;
  "-border-block-color"?: string;
  "-border-block-end"?: string;
  "-border-block-end-color"?: string;
  "-border-block-end-style"?: string;
  "-border-block-end-width"?: string;
  "-border-block-start"?: string;
  "-border-block-start-color"?: string;
  "-border-block-start-style"?: string;
  "-border-block-start-width"?: string;
  "-border-block-style"?: string;
  "-border-block-width"?: string;
  "-border-bottom"?: string;
  "-border-bottom-color"?: string;
  "-border-bottom-left-radius"?: string;
  "-border-bottom-right-radius"?: string;
  "-border-bottom-width"?: string;
  "-border-bottom-style"?: string;
  "-border-collapse"?: string;
  "-border-color"?: string;
  "-border-end-end-radius"?: string;
  "-border-end-start-radius"?: string;
  "-border-image"?: string;
  "-border-image-outset"?: string;
  "-border-image-repeat"?: string;
  "-border-image-slice"?: string;
  "-border-image-source"?: string;
  "-border-image-width"?: string;
  "-border-inline"?: string;
  "-border-inline-width"?: string;
  "-border-inline-style"?: string;
  "-border-inline-color"?: string;
  "-border-inline-end"?: string;
  "-border-inline-end-color"?: string;
  "-border-inline-end-style"?: string;
  "-border-inline-end-width"?: string;
  "-border-inline-start"?: string;
  "-border-inline-start-color"?: string;
  "-border-inline-start-style"?: string;
  "-border-inline-start-width"?: string;
  "-border-left"?: string;
  "-border-left-color"?: string;
  "-border-left-style"?: string;
  "-border-left-width"?: string;
  "-border-radius"?: string;
  "-border-right"?: string;
  "-border-right-color"?: string;
  "-border-right-style"?: string;
  "-border-right-width"?: string;
  "-border-spacing"?: string;
  "-border-start-end-radius"?: string;
  "-border-start-start-radius"?: string;
  "-border-style"?: string;
  "-border-top"?: string;
  "-border-top-color"?: string;
  "-border-top-left-radius"?: string;
  "-border-top-right-radius"?: string;
  "-border-top-width"?: string;
  "-border-top-style"?: string;
  "-border-width"?: string;

  // bottom
  "-bottom"?: string;

  // box
  "-box-decoration-break"?: string;
  "-box-sizing"?: string;
  "-box-shadow"?: string;

  // break
  "-break-after"?: string;
  "-break-before"?: string;
  "-break-inside"?: string;

  // buffered
  "-buffered-rendering"?: string;

  // caption
  "-caption-side"?: string;

  // caret
  "-caret-color"?: string;
  "-caret-shape"?: string;

  // clear
  "-clear"?: string;

  // clip
  "-clip"?: string;
  "-clip-path"?: string;
  "-clip-rule"?: string;

  // color
  "-color"?: Color | "auto";
  "-color-interpolation"?: string;
  "-color-interpolation-filters"?: string;
  "-color-rendering"?: string;
  "-color-scheme"?: string;

  // column
  "-columns"?: string;
  "-column-count"?: string;
  "-column-fill"?: string;
  "-column-gap"?: string;
  "-column-rule"?: string;
  "-column-rule-width"?: string;
  "-column-rule-style"?: string;
  "-column-rule-color"?: string;
  "-column-span"?: string;
  "-column-width"?: string;

  // content
  "-content"?: string;

  // continue
  "-continue"?: string;

  // corner
  "-corner-block-end-shape"?: string;
  "-corner-block-start-shape"?: string;
  "-corner-inline-end-shape"?: string;
  "-corner-inline-start-shape"?: string;
  "-corner-shape"?: string;

  // contain
  "-contain"?: string;
  "-contain-intrinsic-block-size"?: string;
  "-contain-intrinsic-height"?: string;
  "-contain-intrinsic-inline-size"?: string;
  "-contain-intrinsic-size"?: string;
  "-contain-intrinsic-width"?: string;
  "-content-visibility"?: string;

  // conteiner
  "-container"?: string;
  "-container-name"?: string;
  "-container-type"?: string;

  // counter
  "-counter-increment"?: string;
  "-counter-reset"?: string;
  "-counter-set"?: string;

  // cue
  "-cue"?: string;
  "-cue-after"?: string;
  "-cue-before"?: string;

  // cursor
  "-cursor"?: Cursor;

  // cx
  "-cx"?: string;

  // cy
  "-cy"?: string;

  // d
  "-d"?: string;

  // direction
  "-direction"?: string;

  // display
  "-display"?: Display;

  // dominant
  "-dominant-baseline"?: string;

  // dynamic
  "-dynamic-range-limit"?: string;

  // empty
  "-empty-cells"?: string;

  // field
  "-field-sizing"?: string;

  // fill
  "-fill"?: string;
  "-fill-opacity"?: string;

  // filter
  "-filter"?: string;

  // float
  "-float"?: string;

  // flow
  // "-flow-into"?: string;  // 廃止
  // "-flow-from"?: string;  // 廃止

  // font
  "-font"?: string;
  "-font-emphasize"?: string;
  "-font-emphasize-color"?: string;
  "-font-emphasize-position"?: string;
  "-font-emphasize-style"?: string;
  "-font-family"?: string;
  "-font-feature-settings"?: string;
  "-font-kerning"?: string;
  "-font-language-override"?: string;
  "-font-optical-sizing"?: string;
  "-font-palette"?: string;
  "-font-size"?: string;
  "-font-size-adjust"?: string;
  // "-font-smooth"?: string; // 非標準
  "-font-stretch"?: string;
  "-font-style"?: string;
  "-font-synthesis"?: string;
  "-font-synthesis-weight"?: string;
  "-font-synthesis-style"?: string;
  "-font-synthesis-small-caps"?: string;
  "-font-variant"?: string;
  "-font-variant-alternates"?: string;
  "-font-variant-caps"?: string;
  "-font-variant-east-asian"?: string;
  "-font-variant-emoji"?: string;
  "-font-variant-ligatures"?: string;
  "-font-variant-numeric"?: string;
  "-font-variant-position"?: string;
  "-font-variation-settings"?: string;
  "-font-weight"?: string;
  "-font-width"?: string;

  // flexbox
  "-flex"?: string;
  "-flex-basis"?: string;
  "-flex-direction"?: FlexDirection;
  "-flex-flow"?: string;
  "-flex-grow"?: string;
  "-flex-shrink"?: string;
  "-flex-wrap"?: string;

  // flood
  "-flood-color"?: string;
  "-flood-opacity"?: string;

  // forced
  "-forced-color-adjust"?: string;

  // gap
  "-gap"?: string;

  // grid
  "-grid"?: string;
  "-grid-area"?: string;
  "-grid-auto-columns"?: string;
  "-grid-auto-rows"?: string;
  "-grid-auto-flow"?: string;
  "-grid-column"?: string;
  "-grid-column-start"?: string;
  "-grid-column-end"?: string;
  "-grid-row"?: string;
  "-grid-row-end"?: string;
  "-grid-row-start"?: string;
  "-grid-template"?: string;
  "-grid-template-columns"?: string;
  "-grid-template-rows"?: string;
  "-grid-template-areas"?: string;

  // glyph
  // "-glyph-orientation-horizontal"?: string;  // 廃止
  // "-glyph-orientation-vertical"?: string;  // 廃止

  // hanging
  "-hanging-punctuation"?: string;

  // height
  "-height"?: string;

  // hyphens
  "-hyphens"?: string;

  // inline
  "-inline-size"?: string;

  // image
  "-image-rendering"?: string;

  // initial
  "-initial-letter"?: string;
  "-initial-letter-align"?: string;

  // ime
  // "-ime-mode"?: string; // 廃止

  // inser
  "-inset"?: string;
  "-inset-block"?: string;
  "-inset-block-end"?: string;
  "-inset-block-start"?: string;
  "-inset-inline"?: string;
  "-inset-inline-end"?: string;
  "-inset-inline-start"?: string;

  // isolation
  "-isolation"?: string;

  // justify
  "-justify-content"?: string;
  "-justify-items"?: string;
  "-justify-self"?: string;
  "-justify-tracks"?: string;

  // leading
  "-leading-trim"?: string;

  // left
  "-left"?: string;

  // letter
  "-letter-spacing"?: string;

  // list
  "-list-style"?: string;
  "-list-style-image"?: string;
  "-list-style-position"?: string;
  "-list-style-type"?: string;

  // lighting
  "-lighting-color"?: string;

  // line
  "-line-break"?: string;
  "-line-clamp"?: string;
  "-line-fit-edge"?: string;
  "-line-height"?: string;
  "-line-padding"?: string;

  // margin
  "-margin"?: string;
  "-margin-block"?: string;
  "-margin-block-start"?: string;
  "-margin-block-end"?: string;
  "-margin-bottom"?: string;
  "-margin-inline"?: string;
  "-margin-inline-start"?: string;
  "-margin-inline-end"?: string;
  "-margin-left"?: string;
  "-margin-right"?: string;
  "-margin-top"?: string;
  "-margin-trim"?: string;

  // maker
  "-marker"?: string;
  "-marker-end"?: string;
  "-marker-mid"?: string;
  "-marker-side"?: string;
  "-marker-start"?: string;

  // mask
  "-mask"?: string;
  "-mask-border"?: string;
  "-mask-border-mode"?: string;
  "-mask-border-outset"?: string;
  "-mask-border-repeat"?: string;
  "-mask-border-slice"?: string;
  "-mask-border-source"?: string;
  "-mask-border-width"?: string;
  "-mask-clip"?: string;
  "-mask-composite"?: string;
  "-mask-image"?: string;
  "-mask-mode"?: string;
  "-mask-origin"?: string;
  "-mask-position"?: string;
  "-mask-repeat"?: string;
  "-mask-size"?: string;
  "-mask-type"?: string;

  // masks
  "-marks"?: string;

  // math
  "-math-depth"?: string;
  "-math-shift"?: string;
  "-math-style"?: string;

  // masonry
  "-masonry-auto-flow"?: string;

  // min
  "-min-block-size"?: string;
  "-min-height"?: string;
  "-min-inline-size"?: string;
  "-min-width"?: string;

  // mix
  "-mix-blend-mode"?: string;

  // max
  "-max-block-size"?: string;
  "-max-height"?: string;
  "-max-inline-size"?: string;
  "-max-lines"?: string;
  "-max-width"?: string;

  // nav
  "-nav-down"?: string;
  "-nav-left"?: string;
  "-nav-right"?: string;
  "-nav-up"?: string;

  // navigation
  "-navigation"?: string;

  // object
  "-object-fit"?: string;
  "-object-position"?: string;
  "-object-view-box"?: string;

  // offset
  "-offset"?: string;
  "-offset-anchor"?: string;
  "-offset-distance"?: string;
  "-offset-path"?: string;
  "-offset-position"?: string;
  "-offset-rotate"?: string;

  // opacity
  "-opacity"?: string;

  // order
  "-order"?: string;

  // orphans
  "-orphans"?: string;

  // outline
  "-outline"?: string;
  "-outline-color"?: string;
  "-outline-offset"?: string;
  "-outline-style"?: string;
  "-outline-width"?: string;

  // overflow
  "-overflow"?: Overflow;
  "-overflow-anchor"?: string;
  "-overflow-block"?: string;
  "-overflow-clip"?: string;
  "-overflow-clip-margin"?: string;
  "-overflow-clip-margin-block"?: string;
  "-overflow-clip-margin-block-end"?: string;
  "-overflow-clip-margin-block-start"?: string;
  "-overflow-clip-margin-bottom"?: string;
  "-overflow-clip-margin-inline"?: string;
  "-overflow-clip-margin-inline-end"?: string;
  "-overflow-clip-margin-inline-start"?: string;
  "-overflow-clip-margin-left"?: string;
  "-overflow-clip-margin-right"?: string;
  "-overflow-clip-margin-top"?: string;
  "-overflow-inline"?: string;
  "-overflow-wrap"?: string;
  "-overflow-x"?: Overflow;
  "-overflow-y"?: Overflow;

  // overscroll
  "-overscroll-behavior"?: string;
  "-overscroll-behavior-block"?: string;
  "-overscroll-behavior-inline"?: string;
  "-overscroll-behavior-x"?: string;
  "-overscroll-behavior-y"?: string;

  // padding
  "-padding"?: string;
  "-padding-block"?: string;
  "-padding-block-end"?: string;
  "-padding-block-start"?: string;
  "-padding-bottom"?: string;
  "-padding-inline"?: string;
  "-padding-inline-end"?: string;
  "-padding-inline-start"?: string;
  "-padding-left"?: string;
  "-padding-right"?: string;
  "-padding-top"?: string;

  // page
  "-page"?: string;
  "-page-orientation"?: string;

  // paint
  "-paint-order"?: string;

  // pause
  "-pause"?: string;
  "-pause-after"?: string;
  "-pause-before"?: string;

  // persvective
  "-perspective"?: string;
  "-perspective-origin"?: string;

  // place
  "-place-content"?: string;
  "-place-items"?: string;
  "-place-self"?: string;

  // play
  "-play-during"?: string;

  // pointer
  "-pointer-events"?: string;

  // position
  "-position"?: Position;
  "-position-anchor"?: string;
  "-position-area"?: string;
  "-position-try"?: string;
  "-position-try-fallbacks"?: string;
  "-position-try-order"?: string;
  "-position-visibility"?: string;

  // print
  "-print-color-adjust"?: string;

  // quotes
  "-quotes"?: string;

  // r
  "-r"?: string;

  // reading
  "-reading-flow"?: string;
  "-reading-order"?: string;

  // resize
  "-resize"?: string;

  // rest
  "-rest"?: string;
  "-rest-after"?: string;
  "-rest-before"?: string;

  // right
  "-right"?: string;

  // rotate
  "-rotate"?: string;

  // row
  "-row-gap"?: string;

  // ruby
  "-ruby-align"?: string;
  "-ruby-merge"?: string;
  "-ruby-overhang"?: string;
  "-ruby-position"?: string;

  // rx
  "-rx"?: string;

  // ry
  "-ry"?: string;

  // scale
  "-scale"?: string;

  // scroll
  "-scroll-behavior"?: string;
  "-scroll-margin"?: string;
  "-scroll-margin-top"?: string;
  "-scroll-margin-right"?: string;
  "-scroll-margin-bottom"?: string;
  "-scroll-margin-left"?: string;
  "-scroll-padding"?: string;
  "-scroll-padding-block"?: string;
  "-scroll-padding-block-end"?: string;
  "-scroll-padding-block-start"?: string;
  "-scroll-padding-bottom"?: string;
  "-scroll-padding-inline"?: string;
  "-scroll-padding-inline-end"?: string;
  "-scroll-padding-inline-start"?: string;
  "-scroll-padding-left"?: string;
  "-scroll-padding-right"?: string;
  "-scroll-padding-top"?: string;
  "-scroll-margin-block"?: string;
  "-scroll-margin-block-end"?: string;
  "-scroll-margin-block-start"?: string;
  "-scroll-margin-inline"?: string;
  "-scroll-margin-inline-end"?: string;
  "-scroll-margin-inline-start"?: string;
  "-scroll-snap-align"?: string;
  //"-scroll-snap-coordinate"?: string; // 古い
  //"-scroll-snap-destination"?: string; // 古い
  //"-scroll-snap-margin"
  "-scroll-snap-stop"?: string;
  "-scroll-snap-type"?: string;
  "-scroll-start"?: string;
  "-scroll-start-block"?: string;
  "-scroll-start-inline"?: string;
  "-scroll-timeline"?: string;
  "-scroll-timeline-axis"?: string;
  "-scroll-timeline-name"?: string;

  // scrollbar
  "-scrollbar-color"?: string;
  "-scrollbar-gutter"?: string;
  "-scrollbar-width"?: string;

  // size
  "-size"?: string;

  // shape
  "-shape-image-threshold"?: string;
  "-shape-inside"?: string;
  "-shape-margin"?: string;
  "-shape-outside"?: string;
  "-shape-rendering"?: string;

  // speak
  "-speak"?: string;
  "-speak-as"?: string;
  "-speak-header"?: string;
  "-speak-numeral"?: string;
  "-speak-punctuation"?: string;

  // stop
  "-stop-color"?: string;
  "-stop-opacity"?: string;

  // stroke
  "-stroke"?: string;
  "-stroke-dasharray"?: string;
  "-stroke-dashoffset"?: string;
  "-stroke-linecap"?: string;
  "-stroke-linejoin"?: string;
  "-stroke-miterlimit"?: string;
  "-stroke-opacity"?: string;
  "-stroke-width"?: string;

  // tab
  "-tab-size"?: string;

  // table
  "-table-layout"?: string;

  // text
  "-text-align"?: string;
  "-text-align-last"?: string;
  "-text-anchor"?: string;
  "-text-autospace"?: string;
  "-text-box"?: string;
  "-text-box-edge"?: string;
  "-text-box-trim"?: string;
  "-text-combine-upright"?: string;
  "-text-decoration"?: string;
  "-text-decoration-color"?: string;
  "-text-decoration-line"?: string;
  "-text-decoration-skip"?: string;
  "-text-decoration-skip-ink"?: string;
  "-text-decoration-style"?: string;
  "-text-decoration-thickness"?: string;
  "-text-indent"?: string;
  "-text-justify"?: string;
  "-text-orientation"?: string;
  "-text-overflow"?: string;
  "-text-rendering"?: string;
  "-text-shadow"?: string;
  "-text-spacing"?: string;
  "-text-spacing-collapse"?: string;
  "-text-spacing-trim"?: string;
  "-text-transform"?: string;
  "-text-underline-offset"?: string;
  "-text-underline-position"?: string;
  "-text-wrap"?: string;
  "-text-wrap-mode"?: string;
  "-text-wrap-style"?: string;

  // timeline
  "-timeline-scope"?: string;

  // top
  "-top"?: string;

  // touch
  "-touch-action"?: string;

  // transition
  "-transition"?: string;
  "-transition-delay"?: string;
  "-transition-duration"?: string;
  "-transition-property"?: string;
  "-transition-timing-function"?: string;

  // transform
  "-transform"?: string;
  "-transform-box"?: string;
  "-transform-origin"?: string;
  "-transform-style"?: string;

  // translate
  "-translate"?: string;

  // unicode
  "-unicode-bidi"?: string;

  // user
  "-user-select"?: string;

  // vertical
  "-vertical-align"?: string;

  // view
  "-view-timeline"?: string;
  "-view-timeline-axis"?: string;
  "-view-timeline-inset"?: string;
  "-view-timeline-name"?: string;
  "-view-transition-class"?: string;
  "-view-transition-group"?: string;
  "-view-transition-image-pair"?: string;
  "-view-transition-name"?: string;
  "-view-transition-new"?: string;
  "-view-transition-old"?: string;

  // visibility
  "-visibility"?: string;

  // vector
  "-vector-effect"?: string;

  // voice
  "-voice-balance"?: string;
  "-voice-duration"?: string;
  "-voice-family"?: string;
  "-voice-pitch"?: string;
  "-voice-range"?: string;
  "-voice-rate"?: string;
  "-voice-stress"?: string;
  "-voice-volume"?: string;

  // width
  "-width"?: string;

  // word
  "-word-break"?: string;
  "-word-space-transform"?: string;
  "-word-spacing"?: string;

  // white-space
  "-white-space"?: string;
  "-white-space-collapse"?: string;

  // widows
  "-widows"?: string;

  // will
  "-will-change"?: string;

  // wrap
  "-wrap-after"?: string;
  "-wrap-before"?: string;
  "-wrap-flow"?: string;
  "-wrap-through"?: string;

  // writing
  "-writing-mode"?: string;

  // x
  "-x"?: string;

  // y
  "-y"?: string;

  // z
  "-z-index"?: string;
};
