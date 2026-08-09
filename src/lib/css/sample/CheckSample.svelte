<script lang="ts">
  import { Check } from "../css.svelte";

  let value = $state();
</script>

<h2>Check</h2>
<h3>description</h3>
チェックボックスはコンポーネントにラップしてしまうとbind:groupは使えない。

<h3>value</h3>
{JSON.stringify(value)}

<h3>default</h3>
<Check bind:checked={value}>A</Check>

<h3>customize size and color</h3>
<Check bind:checked={value} -box-color="lightgreen" -box-size="32px">B</Check>
