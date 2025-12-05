import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ComponentCard } from "./ComponentCard";

export const LayoutColumn = ({ column, rowIndex, colIndex, setCanvas, moveColumn, moveComponent, resizeColumn, isLastColumn }) => {
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
        }
      }
    }
  }), [rowIndex, colIndex, column.components.length, moveColumn, moveComponent]);

  drag(drop(ref));

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const rowWidth = ref.current?.parentElement?.offsetWidth;

    if (!rowWidth) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      // Reset startX to avoid accumulating delta if we wanted incremental updates, 
      // but here resizeColumn takes total delta from start? 
      // No, resizeColumn implementation takes deltaX.
      // If I call resizeColumn repeatedly, I should pass incremental delta or absolute?
      // My resizeColumn implementation:
      // col.width = (col.width || 1) + deltaWeight;
      // It uses current state. So if I call it multiple times, I should pass incremental delta.
      // But `startX` is fixed. `moveEvent.clientX - startX` is total delta from start.
      // If I use total delta, I need to apply it to the *initial* width.
      // But I don't have initial width here easily unless I capture it on MouseDown.
      // Alternatively, I can use incremental delta.
    };
    
    // Let's switch to incremental delta.
    let lastX = startX;
    
    const handleMouseMoveIncremental = (moveEvent: MouseEvent) => {
        const currentX = moveEvent.clientX;
        const deltaX = currentX - lastX;
        if (deltaX !== 0) {
            resizeColumn(rowIndex, colIndex, deltaX, rowWidth);
            lastX = currentX;
        }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMoveIncremental);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMoveIncremental);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={ref}
      style={{ flex: `${column.width || 1} 1 0px` }}
      className={`relative flex-1 min-w-[50px] p-3 rounded-lg border-4 border-slate-400 ${isDragging ? "opacity-50" : ""}`}
    >
      <span className="text-xs block mb-2 text-white">column{colIndex}</span>
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
      
      {!isLastColumn && (
        <div
          className="absolute top-0 -right-2 h-full w-4 cursor-col-resize hover:bg-blue-400/20 z-10 flex items-center justify-center group"
          onMouseDown={handleMouseDown}
        >
            <div className="w-1 h-8 bg-slate-300 rounded-full group-hover:bg-blue-500 transition-colors" />
        </div>
      )}
    </div>
  );
};
