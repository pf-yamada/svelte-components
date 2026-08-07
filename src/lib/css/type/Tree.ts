import { type MouseEventWithCurrentTarget } from "../css.svelte.ts";

/**
 * ツリーのノード（これをもとにツリーが描画される）
 */
export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

/**
 * ドロップ先の場所
 */
export type DropPosition = "before" | "inside" | "after";

/**
 * ドラッグ中の動作
 */
export type DragContext = {
  active: boolean;
  started: boolean;
  pointerId: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  sourceId: string | null;
  sourceElement: HTMLElement | null;
  preview: HTMLElement | null;
  dragIds: string[];
  targetId: string | null;
  position: DropPosition | null;
  moved: boolean;
};

/**
 * TreeとTreeItemがやり取りするためのオブジェクト
 */
export type TreeContext = {
  readonly selectedIds: Set<string>;
  readonly drag: DragContext;
  pointerDown: (e: PointerEvent, node: TreeNode, element: HTMLElement) => void;
  selectNode: (node: TreeNode, isAddSelect?: boolean) => void;
  onMenu?: (e: MouseEventWithCurrentTarget, node: TreeNode) => Promise<void>;
};

/**
 * bind型
 */
export type BindTree = {
  remove: (node: TreeNode) => void;
  addChild: (node: TreeNode, label: string) => void;
  addAfter: (node: TreeNode, label: string) => void;
};
