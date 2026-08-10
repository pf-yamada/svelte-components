/**
 * ツリーのノード（これをもとにツリーが描画される）
 */
export type TreeNode = {
  id: string;
  label: string;
  level?: number;
  children?: TreeNode[];
};

/**
 * ドロップ先の場所
 */
export type DropPosition = "before" | "inside" | "after" | null;

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
  sourceNode: TreeNode | null;
  sourceElement: HTMLElement | null;
  preview: HTMLElement | null;
  dragNodes: TreeNode[];
  targetNode: TreeNode | null;
  position: DropPosition | null;
  moved: boolean;
};

/**
 * TreeとTreeItemがやり取りするためのオブジェクト
 */
export type TreeContext = {
  readonly selectedNodes: TreeNode[];
  readonly drag: DragContext;
  pointerDown: (e: PointerEvent, node: TreeNode, element: HTMLElement) => void;
  selectNode: (node: TreeNode, isAddSelect?: boolean) => void;
};

/**
 * bind型
 */
export type BindTree = {
  remove: (node: TreeNode) => void;
  addChild: (node: TreeNode, label: string) => void;
  addAfter: (node: TreeNode, label: string) => void;
};
