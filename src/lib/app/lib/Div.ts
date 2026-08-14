import {
  alignContent,
  alignItems,
  alignSelf,
  backgroundRepeat,
  //borderStyle,
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
} from "$lib/kuro-comp/css.svelte.ts";

export const divData = {
  //----------------
  // layout parent
  //----------------
  display: display,

  // shared
  alignItems: alignItems,
  justifyContent: justifyContent,
  alignContent: alignContent,
  gap: [],

  // flex
  flexDirection: flexDirection,
  flexWrap: flexWrap,

  // grid
  gridTemplateColumns: [],
  gridTemplateRows: [],

  //----------------
  // layout child
  //----------------
  // shared
  alignSelf: alignSelf,

  // flex
  flex: [],
  flexGrow: [],
  flexShrink: [],
  flexBasis: [],

  // grid
  gridColumn: [],
  gridRow: [],
  gridColumnStart: [],
  gridColumnEnd: [],
  gridRowStart: [],
  gridRowEnd: [],
  justifySelf: justifySelf,

  //----------------
  // size/position
  //----------------
  position: position,
  top: [],
  right: [],
  bottom: [],
  left: [],
  width: [],
  height: [],
  zIndex: [],

  minWidth: [],
  maxWidth: [],
  minHeight: [],
  maxHeight: [],

  transition: [],
  transitionProperty: [],
  transitionDuration: [],
  transitionTimingFunction: [],
  transitionDelay: [],

  //----------------
  // typography
  //----------------
  color: [],
  fontSize: [],
  fontStyle: [],
  fontVariant: [],
  fontFamily: [],
  fontWeight: [],
  fontStretch: [],

  lineHeight: [],
  textDecoration: textOverflow,
  textAlign: textAlign,
  letterSpacing: [],
  wordSpacing: [],
  textTransform: [],
  whiteSpace: whiteSpace,
  wordBreak: wordBreak,
  textOverflow: [],

  //----------------
  // rectangle
  //----------------
  background: [],
  backgroundColor: [],
  backgroundImage: [],
  backgroundSize: [],
  backgroundPosition: [],
  backgroundRepeat: backgroundRepeat,
  overflow: overflow,
  overflowX: overflow,
  overflowY: overflow,
  transform: [],
  transformOrigin: [],

  margin: [],
  padding: [],
  border: [],
  borderRadius: [],
  boxShadow: [],
  opacity: [],
  boxSizing: boxSizing,
  cursor: cursor,
  pointerEvents: pointerEvents,
  visibility: visibility,
} as const;

export type DivData = { -readonly [K in keyof typeof divData]?: string };
