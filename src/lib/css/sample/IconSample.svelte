<script lang="ts">
  import {
    AddCircleIcon,
    ArrowDropDownIcon,
    CancelCircleIcon,
    CheckIcon,
  } from "../css.svelte";
</script>

<h2>Icon</h2>

<h3>AddCircleIcon</h3>
<AddCircleIcon />

<h3>ArrowDropDownIcon</h3>
<ArrowDropDownIcon />

<h3>CancelCircleIcon</h3>
<CancelCircleIcon />

<h3>CheckIcon</h3>
<CheckIcon />

<h3>specify size</h3>
<CheckIcon -h="120px" -w="120px" />

<h3>color</h3>
<CheckIcon fill="red" />
