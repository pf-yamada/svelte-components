<script lang="ts">
  import { at, css, type CssAttributes } from "../css.svelte";

  import Prism from "prismjs";
  // 使用したい言語コンポーネントをインポート
  import "prismjs/components/prism-markup";
  import "prismjs/components/prism-markup-templating";
  import "prismjs/components/prism-javascript";
  import "prismjs/components/prism-typescript";
  import "prismjs/components/prism-jsx";
  import "prismjs/components/prism-tsx";

  import "prismjs/components/prism-c";
  import "prismjs/components/prism-cpp";
  import "prismjs/components/prism-rust";
  import "prismjs/components/prism-go";
  import "prismjs/components/prism-python";
  import "prismjs/components/prism-php";
  import "prismjs/components/prism-java";
  import "prismjs/components/prism-kotlin";
  import "prismjs/components/prism-swift";

  import "prismjs/components/prism-bash";
  import "prismjs/components/prism-json";
  import "prismjs/components/prism-yaml";
  import "prismjs/components/prism-toml";
  import "prismjs/components/prism-sql";
  import "prismjs/themes/prism-okaidia.css";

  let {
    code,
    lang = "typescript",
    help = false,
    ...rest
  }: {
    code?: string;
    lang?: string;
    help?: boolean;
  } = $props();

  // PrismでハイライトしたHTML文字列を導出 ($derived)
  // 未対応言語の場合はエスケープのみ
  let highlighted = $derived(
    code
      ? Prism.languages[lang]
        ? Prism.highlight(code.trim(), Prism.languages[lang], lang)
        : Prism.util.encode(code.trim())
      : "",
  );

  let def = $derived({
    "-dsp": "inline-flex",
    "-bg": "#2d2d2d",
    "-fgc": "#ccc",
    "-pad": "1rem",
    "-rad": "8px",
    "-of-x": "auto",
    "-ff": "monospace",
    "-line-height": "1.5",
    "-sha": css.boxShadow,
  } satisfies CssAttributes);
</script>

{#if help}
  <div style="word-break: break-all;margin:8px;">
    {#each Object.keys(Prism.languages) as lang}
      <span style="padding:8px;">{lang}</span>
    {/each}
  </div>
{/if}

{#if code}
  <pre class={`language-${lang}`} {...at(def, rest)}><code
      >{@html highlighted}</code
    ></pre>
{/if}
