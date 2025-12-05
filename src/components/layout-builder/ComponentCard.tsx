import React, { useRef } from "react";
import { FileText, Image, TextCursorInput } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import type { ComponentNode } from "./types";

export const ComponentCard: React.FC<{ 
  comp: ComponentNode;
  rowIndex: number;
  colIndex: number;
  compIndex: number;
  moveComponent: any;
}> = ({ comp, rowIndex, colIndex, compIndex, moveComponent }) => {
  const ref = useRef(null);
  const cfg = {
    input: { title: "Input Component", description: "Text input field", Icon: TextCursorInput },
    image: { title: "Image Component", description: "Image placeholder", Icon: Image },
    demo: { title: "Demo Component", description: "Sample content block", Icon: FileText },
  } as const;

  const { title, description, Icon } = cfg[comp.kind];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT_ITEM",
    item: { compId: comp.id, rowIndex, colIndex, compIndex },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }), [rowIndex, colIndex, compIndex]);

  const [, drop] = useDrop({
    accept: "COMPONENT_ITEM",
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragRowIndex = item.rowIndex;
      const dragColIndex = item.colIndex;
      const dragCompIndex = item.compIndex;
      
      const hoverRowIndex = rowIndex;
      const hoverColIndex = colIndex;
      const hoverCompIndex = compIndex;

      if (dragRowIndex === hoverRowIndex && dragColIndex === hoverColIndex && dragCompIndex === hoverCompIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragRowIndex === hoverRowIndex && dragColIndex === hoverColIndex) {
        if (dragCompIndex < hoverCompIndex && hoverClientY < hoverMiddleY) return;
        if (dragCompIndex > hoverCompIndex && hoverClientY > hoverMiddleY) return;
      }

      moveComponent(dragRowIndex, dragColIndex, dragCompIndex, hoverRowIndex, hoverColIndex, hoverCompIndex);
      
      item.rowIndex = hoverRowIndex;
      item.colIndex = hoverColIndex;
      item.compIndex = hoverCompIndex;
    }
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref} 
      className={`component-card p-2 sm:p-3 bg-white rounded-md border flex items-start gap-2 sm:gap-3 shadow-sm ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-secondary/20 flex items-center justify-center">
        <Icon className="w-3 sm:w-4 h-3 sm:h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
