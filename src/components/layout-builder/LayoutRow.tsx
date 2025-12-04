import React, { useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import { LayoutColumn } from "./LayoutColumn";

export const LayoutRow = ({ row, rowIndex, setCanvas, onDragStateChange }) => {

  // Make this row draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "EXISTING_ROW",
    item: { id: row.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // SEND drag state to parent whenever it changes
  useEffect(() => {
    onDragStateChange(isDragging);
  }, [isDragging]);

  // Allow dropping columns inside row
  const [, drop] = useDrop(() => ({
    accept: "COLUMN",
    drop: () => {
      setCanvas(prev => {
        const newRows = [...prev.rows];
        newRows[rowIndex].columns.push({
          id: crypto.randomUUID(),
          components: []
        });
        return { ...prev, rows: newRows };
      });
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`cursor-move  p-4 rounded-2xl border-4 border-slate-400 border-dashed relative transition-all ${
        isDragging ? "opacity-60" : "opacity-100"
      }`}
    >
      <span className="absolute -top-3 left-4 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs">
        row{rowIndex}
      </span>

      <div className="flex flex-col gap-4 pt-3 flex-wrap">
        {row.columns.length === 0 && (
          <p className="text-muted-foreground text-center">Insert Column Here</p>
        )}
        {row.columns.map((col, colIndex) => (
          <LayoutColumn
            key={col.id}
            column={col}
            rowIndex={rowIndex}
            colIndex={colIndex}
            setCanvas={setCanvas}
          />
        ))}
      </div>
    </div>
  );
};
