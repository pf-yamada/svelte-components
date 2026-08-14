<script lang="ts">
  import {
    css,
    Dialog,
    TextArea,
    Button,
    clone,
    removeEmpty,
    type TreeNode,
    type BindDialog,
  } from "$lib/kuro-comp/css.svelte";

  import { type TextData } from "../app.svelte";

  let {
    open = $bindable(false),
    node = $bindable(),
  }: {
    open: boolean;
    node: TreeNode;
  } = $props();

  let dialog: BindDialog;
  let data = $state<TextData>(undefined!);
  let backup = $state<TextData>(undefined!);

  $effect(() => {
    if (!dialog) return;
    if (open) {
      node.data ??= {};
      if (!data) data = node.data;
      if (!backup) backup = clone(data);
      dialog.show();
    } else {
      data = undefined!;
      backup = undefined!;
      dialog.exit(false);
    }
  });
</script>

<Dialog
  bind:this={dialog}
  caption="Textプロパティ"
  onClose={() => (open = false)}
>
  <TextArea bind:value={data.text} />
  <div style:display="flex" style:justify-content="space-evenly">
    <Button
      onclick={() => {
        open = false;
      }}>OK</Button
    >
    <Button
      -background-color={css.fgc}
      onclick={() => {
        node.data = backup;
        open = false;
      }}>取消</Button
    >
  </div>
</Dialog>
