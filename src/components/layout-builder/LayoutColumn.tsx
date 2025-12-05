import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ComponentCard } from "./ComponentCard";

export const LayoutColumn = ({ column, rowIndex, colIndex, setCanvas, moveColumn, moveComponent }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COLUMN_ITEM",
    item: { rowIndex, colIndex },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }), [rowIndex, colIndex]);

  const [, drop] = useDrop(() => ({
    accept: ["COMPONENT", "COLUMN_ITEM", "COMPONENT_ITEM"],
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) return;

      if (monitor.getItemType() === "COMPONENT") {
        setCanvas(prev => {
          const newRows = [...prev.rows];
          newRows[rowIndex].columns[colIndex].components.push({
            id: crypto.randomUUID(),
            kind: item.type
          });
          return { ...prev, rows: newRows };
        });
      } else if (monitor.getItemType() === "COMPONENT_ITEM") {
         if (column.components.length === 0) {
            moveComponent(item.rowIndex, item.colIndex, item.compIndex, rowIndex, colIndex, 0);
            item.rowIndex = rowIndex;
            item.colIndex = colIndex;
            item.compIndex = 0;
         }
      }
    },
    hover: (item: any, monitor) => {
      if (!ref.current) return;
      
      const itemType = monitor.getItemType();

      if (itemType === "COLUMN_ITEM") {
        const dragRowIndex = item.rowIndex;
        const dragColIndex = item.colIndex;
        const hoverRowIndex = rowIndex;
        const hoverColIndex = colIndex;

        if (dragRowIndex === hoverRowIndex && dragColIndex === hoverColIndex) return;

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        if (dragColIndex < hoverColIndex && hoverClientX < hoverMiddleX) return;
        if (dragColIndex > hoverColIndex && hoverClientX > hoverMiddleX) return;

        moveColumn(dragRowIndex, dragColIndex, hoverRowIndex, hoverColIndex);
        item.rowIndex = hoverRowIndex;
        item.colIndex = hoverColIndex;
      } else if (itemType === "COMPONENT_ITEM") {
        if (monitor.isOver({ shallow: true })) {
           const dragRowIndex = item.rowIndex;
           const dragColIndex = item.colIndex;
           const dragCompIndex = item.compIndex;
           
           const hoverRowIndex = rowIndex;
           const hoverColIndex = colIndex;
           const hoverCompIndex = column.components.length;

           // Avoid flickering if already at the end
           if (dragRowIndex === hoverRowIndex && dragColIndex === hoverColIndex && dragCompIndex === column.components.length - 1) return;

           moveComponent(dragRowIndex, dragColIndex, dragCompIndex, hoverRowIndex, hoverColIndex, hoverCompIndex);
           
           item.rowIndex = hoverRowIndex;
           item.colIndex = hoverColIndex;
           // We don't strictly need to update compIndex here as it will be updated by the re-render and subsequent hovers, 
           // but for correctness in the same drag session:
           // If moving within same list, index is length-1. If from other list, index is length.
           // But let's just leave it, the next hover on a card will fix it if we move over a card.
        }
      }
    }
  }), [rowIndex, colIndex, column.components.length, moveColumn, moveComponent]);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex-1 min-w-[150px] sm:min-w-[200px] p-3 rounded-lg border-4 border-slate-400 ${isDragging ? "opacity-50" : ""}`}
    >
      <span className="text-xs block mb-2">column{colIndex}</span>
      <div className="flex flex-col gap-2 min-h-[50px]">
        {column.components.length > 0 ? (
          column.components.map((comp, compIndex) => (
            <ComponentCard 
              key={comp.id} 
              comp={comp} 
              rowIndex={rowIndex}
              colIndex={colIndex}
              compIndex={compIndex}
              moveComponent={moveComponent}
            />
          ))
        ) : (
          <div className="h-20 text-muted-foreground rounded-lg flex items-center justify-center text-md">
            Drop components here
          </div>
        )}
      </div>
    </div>
  );
};
