<script lang="ts">
  import {
    css,
    Dialog,
    Input,
    Button,
    SelectEditable,
    clone,
    Combo,
    removeEmpty,
    type TreeNode,
    type BindDialog,
    cssGlobal,
  } from "$lib/kuro-comp/css.svelte";
  import { onMount } from "svelte";

  import { type DivData, divData } from "../app.svelte";

  let {
    open = $bindable(false),
    node = $bindable(),
    parentNode = $bindable(),
  }: {
    open: boolean;
    node: TreeNode;
    parentNode: TreeNode | undefined;
  } = $props();

  let dialog: BindDialog;
  let data = $state<DivData>(undefined!);
  let backup = $state<DivData>(undefined!);

  $effect(() => {
    if (!dialog) return;
    if (open) {
      node.data ??= {};
      if (!data) data = node.data;
      if (!backup) backup = clone(data);
      dialog.show();
    } else {
      data = undefined!;
      backup = undefined!;
      dialog.exit(false);
    }
  });

  const combo = [
    { label: "配置", value: "layout" },
    { label: "位置", value: "position" },
    { label: "文字", value: "typography" },
    { label: "矩形", value: "rectangle" },
  ];
  let tab = $state(combo[0]["value"]);

  let parentDisplay = $derived.by(() => {
    if (!parentNode) return undefined;
    if (!parentNode.data) return undefined;
    console.log(parentNode.data);
    return parentNode.data.display;
  });
</script>

<Dialog
  bind:this={dialog}
  caption="Divプロパティ"
  onClose={() => (open = false)}
>
  <div
    style:width="100%"
    style:text-align="center"
    style:padding-top="4px"
    style:padding-bottom="16px"
  >
    <Combo bind:value={tab} options={combo} />
  </div>
  {#if tab === "layout"}
    <div style:display="flex" style:align-items="flex-start">
      <div class="property-list">
        <div class="property-title">子要素を配置する親レイアウト要素</div>
        <span>display</span>
        <SelectEditable
          bind:value={data.display}
          options={["", ...divData.display, ...cssGlobal]}
        />
        {#if data.display === "flex"}
          <span>flex-direction</span>
          <SelectEditable
            bind:value={data.flexDirection}
            options={["", ...divData.flexDirection, ...cssGlobal]}
          />
          <span>flex-wrap</span>
          <SelectEditable
            bind:value={data.flexWrap}
            options={["", ...divData.flexWrap, ...cssGlobal]}
          />
        {:else if data.display === "grid"}
          <span>grid-template-columns</span>
          <SelectEditable
            bind:value={data.gridTemplateColumns}
            options={["", ...divData.gridTemplateColumns, ...cssGlobal]}
          />
          <span>grid-template-rows</span>
          <SelectEditable
            bind:value={data.gridTemplateRows}
            options={["", ...divData.gridTemplateRows, ...cssGlobal]}
          />
        {/if}
        <span>align-items</span>
        <SelectEditable
          bind:value={data.alignItems}
          options={["", ...divData.alignItems, ...cssGlobal]}
        />
        <span>justify-content</span>
        <SelectEditable
          bind:value={data.justifyContent}
          options={["", ...divData.justifyContent, ...cssGlobal]}
        />
        <span>align-content</span>
        <SelectEditable
          bind:value={data.alignContent}
          options={["", ...divData.alignContent, ...cssGlobal]}
        />
        <span>gap</span>
        <SelectEditable
          bind:value={data.gap}
          options={["", ...divData.gap, ...cssGlobal]}
        />
      </div>
      <div class="property-list">
        <div class="property-title">親のdisplay設定で変わる子要素</div>
        <span>align-self</span>
        <SelectEditable
          bind:value={data.alignSelf}
          options={["", ...divData.alignSelf, ...cssGlobal]}
        />
        {#if parentDisplay === "flex"}
          <span>flex</span>
          <SelectEditable
            bind:value={data.flex}
            options={["", ...divData.flex, ...cssGlobal]}
          />
          <span>flex-grow</span>
          <SelectEditable
            bind:value={data.flexGrow}
            options={["", ...divData.flexGrow, ...cssGlobal]}
          />
          <span>flex-shrink</span>
          <SelectEditable
            bind:value={data.flexShrink}
            options={["", ...divData.flexShrink, ...cssGlobal]}
          />
          <span>flex-basis</span>
          <SelectEditable
            bind:value={data.flexBasis}
            options={["", ...divData.flexBasis, ...cssGlobal]}
          />
        {:else if parentDisplay === "grid"}
          <span>grid-column</span>
          <SelectEditable
            bind:value={data.gridColumn}
            options={["", ...divData.gridColumn, ...cssGlobal]}
          />
          <span>grid-row</span>
          <SelectEditable
            bind:value={data.gridRow}
            options={["", ...divData.gridRow, ...cssGlobal]}
          />
          <span>grid-column-start</span>
          <SelectEditable
            bind:value={data.gridColumnStart}
            options={["", ...divData.gridColumnStart, ...cssGlobal]}
          />
          <span> grid-column-end</span>
          <SelectEditable
            bind:value={data.gridColumnEnd}
            options={["", ...divData.gridColumnEnd, ...cssGlobal]}
          />
          <span>grid-row-start</span>
          <SelectEditable
            bind:value={data.gridRowStart}
            options={["", ...divData.gridRowStart, ...cssGlobal]}
          />
          <span>grid-row-end</span>
          <SelectEditable
            bind:value={data.gridRowEnd}
            options={["", ...divData.gridRowEnd, ...cssGlobal]}
          />
          <span>justify-self</span>
          <SelectEditable
            bind:value={data.justifySelf}
            options={["", ...divData.justifySelf, ...cssGlobal]}
          />
        {/if}
      </div>
    </div>
  {:else if tab === "position"}
    <div style:display="flex" style:align-items="flex-start">
      <div class="property-list">
        <span>position</span>
        <SelectEditable
          bind:value={data.position}
          options={["", ...divData.position, ...cssGlobal]}
        />
        <span>top</span>
        <SelectEditable
          bind:value={data.top}
          options={["", ...divData.top, ...cssGlobal]}
        />
        <span>right</span>
        <SelectEditable
          bind:value={data.right}
          options={["", ...divData.right, ...cssGlobal]}
        />
        <span>bottom</span>
        <SelectEditable
          bind:value={data.bottom}
          options={["", ...divData.bottom, ...cssGlobal]}
        />
        <span>left</span>
        <SelectEditable
          bind:value={data.left}
          options={["", ...divData.left, ...cssGlobal]}
        />
        <span>width</span>
        <SelectEditable
          bind:value={data.width}
          options={["", ...divData.width, ...cssGlobal]}
        />
        <span>height</span>
        <SelectEditable
          bind:value={data.height}
          options={["", ...divData.height, ...cssGlobal]}
        />
        <span>z-index</span>
        <SelectEditable
          bind:value={data.zIndex}
          options={["", ...divData.zIndex, ...cssGlobal]}
        />
      </div>
      <div class="property-list">
        <span>min-width</span>
        <SelectEditable
          bind:value={data.minWidth}
          options={["", ...divData.minWidth, ...cssGlobal]}
        />
        <span>max-width</span>
        <SelectEditable
          bind:value={data.maxWidth}
          options={["", ...divData.maxWidth, ...cssGlobal]}
        />
        <span>min-height</span>
        <SelectEditable
          bind:value={data.minHeight}
          options={["", ...divData.minHeight, ...cssGlobal]}
        />
        <span>max-height</span>
        <SelectEditable
          bind:value={data.maxHeight}
          options={["", ...divData.maxHeight, ...cssGlobal]}
        />
        <span>transition</span>
        <SelectEditable
          bind:value={data.transition}
          options={["", ...divData.transition, ...cssGlobal]}
        />
        <span>transition-property</span>
        <SelectEditable
          bind:value={data.transitionProperty}
          options={["", ...divData.transitionProperty, ...cssGlobal]}
        />
        <span>transition-duration</span>
        <SelectEditable
          bind:value={data.transitionDuration}
          options={["", ...divData.transitionDuration, ...cssGlobal]}
        />
        <span>transition-timing-function</span>
        <SelectEditable
          bind:value={data.transitionTimingFunction}
          options={["", ...divData.transitionTimingFunction, ...cssGlobal]}
        />
        <span>transition-delay</span>
        <SelectEditable
          bind:value={data.transitionDelay}
          options={["", ...divData.transitionDelay, ...cssGlobal]}
        />
      </div>
    </div>
  {:else if tab === "typography"}
    <div style:display="flex" style:align-items="flex-start">
      <div class="property-list">
        <span>color</span>
        <SelectEditable
          bind:value={data.color}
          options={["", ...divData.color, ...cssGlobal]}
        />
        <span>font-size</span>
        <SelectEditable
          bind:value={data.fontSize}
          options={["", ...divData.fontSize, ...cssGlobal]}
        />
        <span>font-style</span>
        <SelectEditable
          bind:value={data.fontStyle}
          options={["", ...divData.fontStyle, ...cssGlobal]}
        />
        <span>font-variant</span>
        <SelectEditable
          bind:value={data.fontVariant}
          options={["", ...divData.fontVariant, ...cssGlobal]}
        />
        <span>font-family</span>
        <SelectEditable
          bind:value={data.fontFamily}
          options={["", ...divData.fontFamily, ...cssGlobal]}
        />
        <span>font-weight</span>
        <SelectEditable
          bind:value={data.fontWeight}
          options={["", ...divData.fontWeight, ...cssGlobal]}
        />
        <span>font-stretch</span>
        <SelectEditable
          bind:value={data.fontStretch}
          options={["", ...divData.fontStretch, ...cssGlobal]}
        />
        <span>line-height</span>
        <SelectEditable
          bind:value={data.lineHeight}
          options={["", ...divData.lineHeight, ...cssGlobal]}
        />
      </div>
      <div class="property-list">
        <span>text-decoration</span>
        <SelectEditable
          bind:value={data.textDecoration}
          options={["", ...divData.textDecoration, ...cssGlobal]}
        />
        <span>text-align</span>
        <SelectEditable
          bind:value={data.textAlign}
          options={["", ...divData.textAlign, ...cssGlobal]}
        />
        <span>letter-spacing</span>
        <SelectEditable
          bind:value={data.letterSpacing}
          options={["", ...divData.letterSpacing, ...cssGlobal]}
        />
        <span>word-spacing</span>
        <SelectEditable
          bind:value={data.wordSpacing}
          options={["", ...divData.wordSpacing, ...cssGlobal]}
        />
        <span>text-transform</span>
        <SelectEditable
          bind:value={data.textTransform}
          options={["", ...divData.textTransform, ...cssGlobal]}
        />
        <span>white-space</span>
        <SelectEditable
          bind:value={data.whiteSpace}
          options={["", ...divData.whiteSpace, ...cssGlobal]}
        />
        <span>word-break</span>
        <SelectEditable
          bind:value={data.wordBreak}
          options={["", ...divData.wordBreak, ...cssGlobal]}
        />
        <span>text-overflow</span>
        <SelectEditable
          bind:value={data.textOverflow}
          options={["", ...divData.textOverflow, ...cssGlobal]}
        />
      </div>
    </div>
  {:else if tab === "rectangle"}
    <div style:display="flex" style:align-items="flex-start">
      <div class="property-list">
        <span>background</span>
        <SelectEditable
          bind:value={data.background}
          options={["", ...divData.background, ...cssGlobal]}
        />
        <span>background-color</span>
        <SelectEditable
          bind:value={data.backgroundColor}
          options={["", ...divData.backgroundColor, ...cssGlobal]}
        />
        <span>background-image</span>
        <SelectEditable
          bind:value={data.backgroundImage}
          options={["", ...divData.backgroundImage, ...cssGlobal]}
        />
        <span>background-size</span>
        <SelectEditable
          bind:value={data.backgroundSize}
          options={["", ...divData.backgroundSize, ...cssGlobal]}
        />
        <span>background-position</span>
        <SelectEditable
          bind:value={data.backgroundPosition}
          options={["", ...divData.backgroundPosition, ...cssGlobal]}
        />
        <span>background-repeat</span>
        <SelectEditable
          bind:value={data.backgroundRepeat}
          options={["", ...divData.backgroundRepeat, ...cssGlobal]}
        />
        <span>overflow</span>
        <SelectEditable
          bind:value={data.overflow}
          options={["", ...divData.overflow, ...cssGlobal]}
        />
        <span>overflow-x</span>
        <SelectEditable
          bind:value={data.overflowX}
          options={["", ...divData.overflowX, ...cssGlobal]}
        />
        <span>overflow-y</span>
        <SelectEditable
          bind:value={data.overflowY}
          options={["", ...divData.overflowY, ...cssGlobal]}
        />
        <span>transform</span>
        <SelectEditable
          bind:value={data.transform}
          options={["", ...divData.transform, ...cssGlobal]}
        />
        <span>transform-origin</span>
        <SelectEditable
          bind:value={data.transformOrigin}
          options={["", ...divData.transformOrigin, ...cssGlobal]}
        />
      </div>
      <div class="property-list">
        <span>margin</span>
        <SelectEditable
          bind:value={data.margin}
          options={["", ...divData.margin, ...cssGlobal]}
        />
        <span>padding</span>
        <SelectEditable
          bind:value={data.padding}
          options={["", ...divData.padding, ...cssGlobal]}
        />
        <span>border</span>
        <SelectEditable
          bind:value={data.border}
          options={["", ...divData.border, ...cssGlobal]}
        />
        <span>border-radius</span>
        <SelectEditable
          bind:value={data.borderRadius}
          options={["", ...divData.borderRadius, ...cssGlobal]}
        />
        <span>box-shadow</span>
        <SelectEditable
          bind:value={data.boxShadow}
          options={["", ...divData.boxShadow, ...cssGlobal]}
        />
        <span>opacity</span>
        <SelectEditable
          bind:value={data.opacity}
          options={["", ...divData.opacity, ...cssGlobal]}
        />
        <span>box-sizing</span>
        <SelectEditable
          bind:value={data.boxSizing}
          options={["", ...divData.boxSizing, ...cssGlobal]}
        />
        <span>cursor</span>
        <SelectEditable
          bind:value={data.cursor}
          options={["", ...divData.cursor, ...cssGlobal]}
        />
        <span>pointer-events</span>
        <SelectEditable
          bind:value={data.pointerEvents}
          options={["", ...divData.pointerEvents, ...cssGlobal]}
        />
        <span>visibility</span>
        <SelectEditable
          bind:value={data.visibility}
          options={["", ...divData.visibility, ...cssGlobal]}
        />
      </div>
    </div>
  {/if}
  <div
    style:display="flex"
    style:justify-content="space-evenly"
    style:margin-top="16px"
  >
    <Button
      onclick={() => {
        open = false;
      }}>OK</Button
    >
    <Button
      -background-color={css.fgc}
      onclick={() => {
        node.data = backup;
        open = false;
      }}>取消</Button
    >
  </div>
</Dialog>

<style>
  .property-list {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 12px;
    row-gap: 8px;
    align-items: center;
    padding: 8px;
  }
  .property-title {
    grid-column: 1 / -1;
    font-weight: bold;
    text-align: center;
    margin-bottom: 4px;
    font-size: small;
  }
  .property-list span {
    text-align: right;
  }
</style>
