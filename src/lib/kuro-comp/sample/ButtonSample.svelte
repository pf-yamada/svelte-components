<script lang="ts">
  import { css, Button } from "../css.svelte";
</script>

<h2>Button</h2>

<h3>default button</h3>
<Button>default</Button>

<h3>font setting</h3>
<Button -fs="24pt" -ff="IPAexMincho">確認</Button>

<h3>one corner</h3>
<Button -bgc="blue" -rad={css.top()}>TOP</Button>
<Button -bgc="blue" -rad={css.right()}>RIGHT</Button>
<Button -bgc="blue" -rad={css.bottom()}>BOTTOM</Button>
<Button -bgc="blue" -rad={css.left()}>LEFT</Button>

<h3>two corners</h3>
<Button -bgc="darkorange" -rad={css.upper()}>UPPER</Button>
<Button -bgc="darkorange" -rad={css.back()}>BACK</Button>
<Button -bgc="darkorange" -rad={css.lower()}>LOWER</Button>
<Button -bgc="darkorange" -rad={css.front()}>FRONT</Button>
<Button -bgc="darkorange" -rad={css.vertical()}>VERTICAL</Button>
<Button
  -bgc="darkorange"
  -rad={css.horizontal()}
  onClick={() => {
    console.log("horizontal");
  }}>HORIZONTAL</Button
>
<Button -bgc="darkorange" -rad={css.leaf()}>LEAF</Button>
<Button -bgc="darkorange" -rad={css.reaf()}>REAF</Button>

<h3>three corners</h3>
<Button -bgc="green" -rad={css.tip1()}>TIP1</Button>
<Button -bgc="green" -rad={css.tip2()}>TIP2</Button>
<Button -bgc="green" -rad={css.tip3()}>TIP3</Button>
<Button -bgc="green" -rad={css.tip4()}>TIP4</Button>

<h3>four corners</h3>
<Button -bgc="purple" -rad={css.around()}>AROUND</Button>
<Button -bgc="purple" -rad={css.square()}>SQUARE</Button>
<Button -bgc="purple" -rad={css.flat()}>FLAT</Button>

<h3>auto contrast text color</h3>
<Button -bgc="white">AROUND</Button>
<Button -bgc="black">AROUND</Button>

<h3>disable ripple</h3>
<Button $enable-ripple={false}>disable ripple</Button>
