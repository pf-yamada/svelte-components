<script lang="ts">
  import { Tree, type TreeItem } from "../css.svelte";

  let tree = $state<TreeItem[]>([
    {
      id: "1",
      label: "src",
      children: [
        {
          id: "2",
          label: "components",
          children: [
            {
              id: "3",
              label: "Button1",
            },
            {
              id: "4",
              label: "Button2",
            },
            {
              id: "5",
              label: "Button3",
            },
            {
              id: "6",
              label: "Button4",
            },
          ],
        },
        {
          id: "7",
          label: "pages",
          children: [
            {
              id: "8",
              label: "Page1",
            },
            {
              id: "9",
              label: "Page2",
              children: [
                {
                  id: "10",
                  label: "Page2-1",
                },
                {
                  id: "11",
                  label: "Page2-2",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
</script>

<Tree root={tree} />
