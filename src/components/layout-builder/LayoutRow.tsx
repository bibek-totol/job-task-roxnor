import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { LayoutColumn } from "./LayoutColumn";


export const LayoutRow = ({ row }) => {
  const [columns, setColumns] = useState([]);

  // Accept only COLUMN drop
  const [, drop] = useDrop(() => ({
    accept: "COLUMN",
    drop: () => {
      setColumns((prev) => [
        ...prev,
        { id: crypto.randomUUID(), items: [] }
      ]);
    },
  }));

  return (
    <div
      ref={drop}
      className="p-4 rounded-2xl border border-dashed relative bg-row-bg"
    >
      {/* Row Index Label */}
      <span className="absolute -top-3 left-4 bg-red-100 text-red-700 px-2 py-0.5 rounded-lg text-xs">
        row
      </span>

      {/* Columns */}
      <div className="flex gap-4 pt-3 flex-wrap">
        {columns.map((col, index) => (
          <LayoutColumn
            key={col.id}
            column={col}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
