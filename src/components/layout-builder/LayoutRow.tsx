import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { LayoutColumn } from "./LayoutColumn";

export const LayoutRow = ({ row, rowIndex, setCanvas, moveRow, moveColumn, moveComponent }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROW_ITEM",
    item: { rowId: row.id, index: rowIndex },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }), [rowIndex, row.id]);

  const [, drop] = useDrop(() => ({
    accept: ["COLUMN", "ROW_ITEM"],
    drop: (item, monitor) => {
      if (monitor.getItemType() === "COLUMN") {
        setCanvas(prev => {
          const newRows = [...prev.rows];
          newRows[rowIndex].columns.push({ id: crypto.randomUUID(), components: [] });
          return { ...prev, rows: newRows };
        });
      }
    },
    hover: (item: any, monitor) => {
      if (!ref.current) return;
      if (monitor.getItemType() === "ROW_ITEM") {
        const dragIndex = item.index;
        const hoverIndex = rowIndex;

        if (dragIndex === hoverIndex) return;

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        moveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  }), [rowIndex, moveRow]);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`mt-6 cursor-move p-4 rounded-2xl border-4 border-slate-400 border-dashed relative transition-all
        ${isDragging ? "opacity-60" : "opacity-100"}
      `}
    >
      <span className="absolute -top-3 left-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs">
        row{rowIndex}
      </span>

      <div className="flex flex-wrap gap-4 ">
        {row.columns.length === 0 ? (
          <p className="text-muted-foreground text-center w-full">Insert Column Here</p>
        ) : (
          row.columns.map((col, colIndex) => (
            <LayoutColumn
              key={col.id}
              column={col}
              rowIndex={rowIndex}
              colIndex={colIndex}
              setCanvas={setCanvas}
              moveColumn={moveColumn}
              moveComponent={moveComponent}
            />
          ))
        )}
      </div>
    </div>
  );
};
