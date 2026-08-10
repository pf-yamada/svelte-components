<script lang="ts">
  import { Switch } from "../css.svelte";

  let value = $state(false);
</script>

<h2>Switch</h2>

<h3>value</h3>
{JSON.stringify(value)}

<h3>default</h3>
<Switch bind:value />

<h3>modify labels</h3>
<Switch bind:value true-label="必須" false-label="任意" -fs="10pt" />

<h3>modify styles</h3>
<Switch
  bind:value
  -active-style={{ "-bgc": "blue" }}
  -deactive-style={{ "-bgc": "black" }}
  -fs="8pt"
  -sha="none"
/>
