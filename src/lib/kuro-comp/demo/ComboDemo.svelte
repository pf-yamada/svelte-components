<script lang="ts">
  import { css, Combo, Code } from "../css.svelte";

  const options = [
    {
      value: "a",
      label: "A",
      s: { "-bgc": "red", "-fw": "bold" },
    },
    {
      value: "b",
      label: "BB",
      s: { "-bgc": "purple" },
    },
    { value: "c", label: "CCC" },
    {
      value: "d",
      label: "DDDD",
      s: { "-bgc": "blue" },
    },
    {
      value: "e",
      label: "EEEEE",
      s: {
        "-bgc": "green",
        "-box-size": "32px",
        "-box-color": "white",
      },
    },
  ];

  let value = $state("");
</script>

<h2>Combo</h2>
<h3>selected value</h3>
{JSON.stringify(value)}

<h3>sample options</h3>
{#if true}
  {@const code = `
const options = [
  {
    value: "a",
    label: "A",
    s: { bgc: "red", fw: "bold" },
  },
  {
    value: "b",
    label: "BB",
    s: { bgc: "purple" },
  },
  { value: "c", label: "CCC" },
  {
    value: "d",
    label: "DDDD",
    s: { bgc: "blue" },
  },
  {
    value: "e",
    label: "EEEEE",
    s: {
      bgc: "green",
      "-box-size": "32px",
      "-box-color": "white",
    },
  },
];
`}
  <Code {code} />
{/if}

<h3>default</h3>
<Combo bind:value {options} onclick={(v) => console.log(v)} /><br />
{#if true}
  {@const code = `
<Combo bind:value {options} onclick={(v) => console.log(v)} />
`}
  <Code {code} />
{/if}

<h3>common attr</h3>
<Combo
  bind:value
  {options}
  onClick={(v) => console.log(v)}
  -base-style={{ "-bgc": "blue" }}
  -start-style={{ "-rad": css.top("12px") }}
  -end-style={{ "-rad": css.right("12px") }}
  -gap="4px"
  -pad="12px"
  -bgc="lightgray"
  -rad={css.leaf("16px")}
/><br />
{#if true}
  {@const code = `
<Combo
  bind:value
  {options}
  onClick={(v) => console.log(v)}
  -base-style={{ bgc: "blue" }}
  -start-style={{ rad: css.top("12px") }}
  -end-style={{ rad: css.right("12px") }}
  -gap="4px"
  -pad="12px"
  -bgc="lightgray"
  -rad={css.leaf("16px")}
/>`}
  <Code {code} lang="html" />
{/if}

<h3>style from options</h3>
<Combo
  bind:value
  {options}
  onClick={(v) => console.log(v)}
  style-name="s"
  -base-style={{ "-bgc": "orange", "-rad": css.upper("12px") }}
  -start-style={{ "-rad": css.upper("12px") }}
  -end-style={{ "-rad": css.upper("12px") }}
  -gap="2px"
  -sha="none"
/><br />
{#if true}
  {@const code = `
<Combo
  bind:value
  {options}
  onClick={(v) => console.log(v)}
  style-name="s"
  -base-style={{ bgc: "orange", rad: css.upper("12px") }}
  -start-style={{ rad: css.upper("12px") }}
  -end-style={{ rad: css.upper("12px") }}
  -gap="2px"
  -sha="none"
/>`}
  <Code {code} lang="html" />
{/if}
