import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { LayoutColumn } from "./LayoutColumn";

export const LayoutRow = ({ row, rowIndex, setCanvas }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROW_ITEM",
    item: { rowId: row.id },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }));

  const [, drop] = useDrop(() => ({
    accept: "COLUMN",
    drop: () => {
      setCanvas(prev => {
        const newRows = [...prev.rows];
        newRows[rowIndex].columns.push({ id: crypto.randomUUID(), components: [] });
        return { ...prev, rows: newRows };
      });
    }
  }));

  return (
    <div
      ref={node => drag(drop(node))}
      className={`mt-6 cursor-move p-4 rounded-2xl border-4 border-slate-400 border-dashed relative transition-all
        ${isDragging ? "opacity-60" : "opacity-100"}
      `}
    >
      <span className="absolute -top-3 left-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs">
        row{rowIndex}
      </span>

      <div className="flex flex-wrap gap-4">
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
            />
          ))
        )}
      </div>
    </div>
  );
};
