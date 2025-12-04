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


export type ComponentKind = "INPUT" | "IMAGE" | "DEMO";

export type ColumnDropType = "COMPONENT"; 



export type ComponentNode = {
  id: string;
  kind: ComponentKind;
};

