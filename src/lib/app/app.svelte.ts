export { default as Text } from "./component/Text.svelte";
export { default as Div } from "./component/Div.svelte";
export { default as TreeComponent } from "./TreeComponent.svelte";
export { default as TreeEditor } from "./TreeEditor.svelte";
export { default as TextProperty } from "./property/TextProperty.svelte";
export { default as DivProperty } from "./property/DivProperty.svelte";
import { type DivData, divData } from "./lib/Div.ts";

export const project = $state({
  tree: [
    {
      id: "pages",
      label: "pages",
      children: [
        {
          id: "text",
          label: "text",
          type: "Text",
          data: {
            text: "hogehoge",
          } satisfies TextData,
        },
        {
          id: "div",
          label: "div",
          type: "Div",
          data: {
            margin: "4px",
            padding: "8px",
            border: "1px solid black",
            background: "red",
            borderRadius: "8px",
          } satisfies DivData,
          children: [
            {
              id: "text1",
              label: "text1",
              type: "Text",
              data: {
                text: "hogehoge1",
              } satisfies TextData,
            },
            {
              id: "text2",
              label: "text2",
              type: "Text",
              data: {
                text: "hogehoge2",
              } satisfies TextData,
            },
            {
              id: "text3",
              label: "text3",
              type: "Text",
              data: {
                text: "hogehoge3",
              } satisfies TextData,
            },
          ],
        },
      ],
    },
    {
      id: "dialogs",
      label: "dialogs",
    },
  ],
});

export type TextData = {
  text?: string;
};
export { type DivData, divData };
