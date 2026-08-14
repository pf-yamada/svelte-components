<script lang="ts">
  import { css, SelectMultiple, type InputAttributes } from "../css.svelte";

  const options = [
    {
      value: "a",
      label: "A",
      style: { "-bgc": "red", "-fgc": "auto" },
    },
    {
      value: "b",
      label: "BB",
      style: { "-bgc": "purple", "-fgc": "auto" },
    },
    { value: "c", label: "CCC" },
    {
      value: "d",
      label: "DDDD",
      style: { "-bgc": "blue", "-fgc": "auto" },
    },
    {
      value: "e",
      label: "EEEEE",
    },
  ] satisfies { value: string; label: string; style?: InputAttributes }[];

  let value = $state([]);
</script>

<h2>Multiple</h2>
<h3>default</h3>
<SelectMultiple {options} bind:value />
