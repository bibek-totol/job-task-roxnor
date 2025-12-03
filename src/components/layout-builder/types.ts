export type ItemType = "ROW" | "COLUMN" | "COMPONENT";


export interface ColumnNode {
  id: string;
  components: ComponentNode[];
}

export interface RowNode {
  id: string;
  columns: ColumnNode[];
}

export interface CanvasState {
  rows: RowNode[];
}

// Define component kinds
export type ComponentKind = "input" | "image" | "demo";

export type ColumnDropType = "COMPONENT"; // for type safety


// Component node type
export type ComponentNode = {
  id: string;
  kind: ComponentKind;
};

