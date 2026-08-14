export const cssGlobal = [
  "inherit",
  "initial",
  "unset",
  "revert",
  "revert-layer",
] as const;
//

export const alignContent = [
  "normal",
  "start",
  "end",
  "center",
  "flex-start",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
  "stretch",
] as const;

export const alignItems = [
  "normal",
  "stretch",
  "center",
  "start",
  "end",
  "flex-start",
  "flex-end",
  "baseline",
  "first baseline",
  "last baseline",
] as const;

export const alignSelf = [
  "auto",
  "normal",
  "stretch",
  "center",
  "start",
  "end",
  "flex-start",
  "flex-end",
  "baseline",
  "first baseline",
  "last baseline",
] as const;

export const backgroundRepeat = [
  "repeat",
  "repeat-x",
  "repeat-y",
  "no-repeat",
  "space",
  "round",
] as const;

export const borderStyle = [
  "none",
  "hidden",
  "solid",
  "dotted",
  "dashed",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
] as const;

export const boxSizing = ["content-box", "border-box"] as const;

export const cursor = [
  "auto",
  "default",
  "none",
  "pointer",
  "context-menu",
  "help",
  "progress",
  "wait",
  "cell",
  "crosshair",
  "text",
  "vertical-text",
  "alias",
  "copy",
  "move",
  "no-drop",
  "not-allowed",
  "grab",
  "grabbing",
  "e-resize",
  "w-resize",
  "n-resize",
  "s-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "col-resize",
  "row-resize",
  "all-scroll",
  "zoom-in",
  "zoom-out",
] as const;

export const display = [
  "block",
  "inline",
  "inline-block",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "flow-root",
  "contents",
  "inherit",
  "initial",
  "revert",
  "unset",
  "none",
  /*
  "table",
  "inline-table",
  "table-row",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-row-group",
  "table-header-group",
  "table-footer-group",
  "list-item",
  */
] as const;

export const flexDirection = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
] as const;

export const flexWrap = ["nowrap", "wrap", "wrap-reverse"] as const;

export const justifyContent = [
  "normal",
  "start",
  "end",
  "flex-start",
  "flex-end",
  "center",
  "left",
  "right",
  "space-between",
  "space-around",
  "space-evenly",
  "stretch",
] as const;

export const justifySelf = [
  "auto",
  "normal",
  "stretch",
  "center",
  "start",
  "end",
  "self-start",
  "self-end",
  "flex-start",
  "flex-end",
  "left",
  "right",
  "baseline",
  "first baseline",
  "last baseline",
] as const;

export const overflow = [
  "visible",
  "hidden",
  "clip",
  "scroll",
  "auto",
] as const;

export const pointerEvents = ["auto", "none"] as const;

export const position = [
  "static",
  "relative",
  "absolute",
  "fixed",
  "sticky",
] as const;

export const textAlign = [
  "start",
  "end",
  "left",
  "right",
  "center",
  "justify",
] as const;

export const textOverflow = ["clip", "ellipsis"] as const;

export const whiteSpace = [
  "normal",
  "pre",
  "nowrap",
  "pre-wrap",
  "pre-line",
  "break-spaces",
] as const;

export const wordBreak = [
  "normal",
  "break-all",
  "keep-all",
  "break-word",
  "auto-phrase",
] as const;

export const visibility = ["visible", "hidden", "collapse"] as const;
