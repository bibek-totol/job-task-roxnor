import React from "react";
import { useDrop } from "react-dnd";
import { LayoutColumn } from "./LayoutColumn";

export const LayoutRow = ({ row, rowIndex, setCanvas }) => {

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
    }
  }));

  return (
    <div ref={drop} className="p-4 rounded-2xl border-4 border-dashed relative">

      <span className="absolute -top-3 left-4 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs">
        row{rowIndex}
      </span>

      <div className="flex gap-4 pt-3 flex-wrap">
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
