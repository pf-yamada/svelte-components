<script lang="ts">
  import { Radio } from "../css.svelte";

  let value = $state("1");
</script>

<h2>Radio</h2>
<h3>value</h3>
{JSON.stringify(value)}

<h3>default</h3>
<Radio value="1" bind:group={value}>default</Radio>

<h3>modify button size</h3>
<Radio -button-size="20px" value="2" bind:group={value}>ラジオボタン1</Radio>

<h3>modify button color</h3>
<Radio
  bind:group={value}
  value="3"
  -button-size="24px"
  -point-color="darkorange"
  -point-inset="5px"
  -active-border="red 2px solid"
  -deactive-border="gray 2px solid"
  -sha-t="2px 2px 3px gray"
  -fs="18pt"
>
  ラジオボタン2
</Radio>
