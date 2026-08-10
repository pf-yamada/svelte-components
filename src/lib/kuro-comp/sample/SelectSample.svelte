<script lang="ts">
  import { css, Select, type OptionAttributes } from "../css.svelte";

  const options = [
    {
      value: "a",
      label: "A",
      style: { "-bgc": "red", "-fgc": css.getFgc("red"), "-fw": "bold" },
    },
    {
      value: "b",
      label: "BB",
      style: { "-bgc": "purple", "-fgc": css.getFgc("purple") },
    },
    { value: "c", label: "CCC" },
    {
      value: "d",
      label: "DDDD",
      style: { "-bgc": "blue", "-fgc": css.getFgc("blue") },
    },
    {
      value: "e",
      label: "EEEEE",
    },
  ] satisfies { value: string; label: string; style?: OptionAttributes }[];

  let value = $state("a");
  let updated = $state("");
</script>

<h2>Select</h2>
<h3>description</h3>
<div>
  ・Selectはselectタグのラッパーコンポーネントで大したことはできない。<br />
  ・optionsは標準で "value" / "label" / "style" を参照するが、 これらは "value-name"
  / "label-name" / "style-name" 属性で変更できる。<br />
  ・multipleを指定できるが、SelectMultipleを使った方がいいだろう。<br />
</div>

<h3>value</h3>
{JSON.stringify(value)} / {JSON.stringify(updated)}

<h3>default</h3>
<Select bind:value onvalue={(v) => (updated = v)} {options} />

<h3>snippet</h3>
<Select bind:value {options}>
  {#snippet label(option)}
    {option.label} ({option.value})
  {/snippet}
</Select>
