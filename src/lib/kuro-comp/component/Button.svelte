<script lang="ts">
  import { type Snippet } from "svelte";
  import {
    css,
    at,
    type ButtonAttributes,
    type DivAttributes,
  } from "../css.svelte";

  let {
    onClick,
    children,
    "$enable-ripple": enableRipple = true,
    ...rest
  }: {
    onClick?: ButtonAttributes["onclick"];
    children?: Snippet<[]>;
    "$enable-ripple"?: boolean;
  } & ButtonAttributes = $props();

  type LocalEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
  };

  const attr = $derived({
    // デフォルト値
    "-rad": "8px",
    "-fs": "11pt",
    "-mgn": "8px",
    "-pad": "8px",
    "-bdr": "0px solid white",
    "-cur": "pointer",
    "-pos": "relative",
    "-of": "hidden",
    "-fw": "bold",
    "-fgc": "auto",
    "-bgc": css.bgc,
    "-sha": css.boxShadow,
    "-filter": css.scheme === "light" ? "" : "brightness(115%)",
  } satisfies ButtonAttributes);

  //
  // ripples
  //
  let ripples: any[] = $state([]);
  function ripple(event: LocalEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripples = [
      ...ripples,
      {
        id: crypto.randomUUID(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        size,
      },
    ];
  }

  function removeRipple(id: string) {
    ripples = ripples.filter((r) => r.id !== id);
  }
</script>

<button
  onclick={(e: LocalEvent) => {
    if (enableRipple) ripple(e);
    onClick?.(e);
  }}
  {...at(attr, rest)}
>
  {#each ripples as ripple (ripple.id)}
    <span
      class="ripple"
      style={`left:${ripple.x}px; top:${ripple.y}px; width:${ripple.size}px; height:${ripple.size}px;`}
      onanimationend={() => removeRipple(ripple.id)}
    ></span>
  {/each}
  <div
    {...at({
      "-dsp": "flex",
      "-align-items": "center",
      "-white-space": "nowrap",
    } satisfies DivAttributes)}
  >
    {@render children?.()}
  </div>
</button>

<style>
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    animation: ripple 600ms ease-out;
  }

  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
</style>
