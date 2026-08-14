<script lang="ts">
  import { type Snippet } from "svelte";
  import { type Value } from "$lib/kuro-comp/css.svelte";
  import { type DivData } from "../app.svelte";
  let { data, children }: { data: Value; children?: Snippet<[]> } = $props();

  const divData = $derived(data as DivData);
</script>

<div
  //----------------
  // layout parent
  //----------------
  style:display={divData.display}
  style:align-items={divData.alignItems}
  style:justify-content={divData.justifyContent}
  style:align-content={divData.alignContent}
  style:gap={divData.gap}
  style:flex-direction={divData.flexDirection}
  style:flex-wrap={divData.flexWrap}
  style:grid-template-columns={divData.gridTemplateColumns}
  style:grid-template-rows={divData.gridTemplateRows}
  style:align-self={divData.alignSelf}
  style:flex={divData.flex}
  style:flex-grow={divData.flexGrow}
  style:flex-shrink={divData.flexShrink}
  style:flex-basis={divData.flexBasis}
  style:grid-column={divData.gridColumn}
  style:grid-row={divData.gridRow}
  style:grid-column-start={divData.gridColumnStart}
  style:grid-column-end={divData.gridColumnEnd}
  style:grid-row-start={divData.gridRowStart}
  style:grid-row-end={divData.gridRowEnd}
  style:justify-delf={divData.justifySelf}
  style:position={divData.position}
  style:top={divData.top}
  style:right={divData.right}
  style:bottom={divData.bottom}
  style:left={divData.left}
  style:width={divData.width}
  style:height={divData.height}
  style:z-index={divData.zIndex}
  style:min-width={divData.minWidth}
  style:max-width={divData.maxWidth}
  style:min-height={divData.minHeight}
  style:max-height={divData.maxHeight}
  style:transition={divData.transition}
  style:transition-property={divData.transitionProperty}
  style:transition-duration={divData.transitionDuration}
  style:transition-timing-function={divData.transitionTimingFunction}
  style:transition-delay={divData.transitionDelay}
  style:color={divData.color}
  style:font-size={divData.fontSize}
  style:font-style={divData.fontStyle}
  style:font-variant={divData.fontVariant}
  style:font-family={divData.fontFamily}
  style:font-weight={divData.fontWeight}
  style:font-stretch={divData.fontStretch}
  style:line-height={divData.lineHeight}
  style:text-decoration={divData.textDecoration}
  style:text-align={divData.textAlign}
  style:letter-spacing={divData.letterSpacing}
  style:word-spacing={divData.wordSpacing}
  style:text-transform={divData.textTransform}
  style:white-space={divData.whiteSpace}
  style:word-break={divData.wordBreak}
  style:text-overflow={divData.textOverflow}
  style:background={divData.background}
  style:background-color={divData.backgroundColor}
  style:background-image={divData.backgroundImage}
  style:background-size={divData.backgroundSize}
  style:background-position={divData.backgroundPosition}
  style:background-repeat={divData.backgroundRepeat}
  style:overflow={divData.overflow}
  style:overflow-x={divData.overflowX}
  style:overflow-y={divData.overflowY}
  style:transform={divData.transform}
  style:transform-origin={divData.transformOrigin}
  style:margin={divData.margin}
  style:padding={divData.padding}
  style:border={divData.border}
  style:border-radius={divData.borderRadius}
  style:box-shadow={divData.boxShadow}
  style:opacity={divData.opacity}
  style:box-sizing={divData.boxSizing}
  style:cursor={divData.cursor}
  style:pointer-events={divData.pointerEvents}
  style:visibility={divData.visibility}
>
  {@render children?.()}
</div>
