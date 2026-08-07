<script lang="ts">
  import { Checkbox } from "../css.svelte";

  let value = $state();
</script>

<h2>Checkbox</h2>
<h3>description</h3>
チェックボックスはコンポーネントにラップしてしまうとbind:groupは使えない。

<h3>value</h3>
{JSON.stringify(value)}

<h3>default</h3>
<Checkbox bind:checked={value}>A</Checkbox>

<h3>customize size and color</h3>
<Checkbox bind:checked={value} -box-color="lightgreen" -box-size="32px"
  >B</Checkbox
>
