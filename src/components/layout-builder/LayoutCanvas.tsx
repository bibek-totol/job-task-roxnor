import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { LayoutRow } from "./LayoutRow";


export const LayoutCanvas = () => {
  const [rows, setRows] = useState([]);

  // Accept only ROW items
  const [, drop] = useDrop(() => ({
    accept: "ROW",
    drop: () => {
      setRows((prev) => [
        ...prev,
        { id: crypto.randomUUID(), columns: [] }
      ]);
    },
  }));

  return (
    <main
      ref={drop}
      className="ml-[260px] min-h-screen p-8"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Canvas</h2>
          <p className="text-sm text-muted-foreground">
            Build your layout by arranging rows, columns and components
          </p>
        </div>

        {/* Canvas box */}
        <div className="p-6 rounded-3xl bg-white border shadow-sm">
          <div className="flex flex-col gap-6">

            {/* Render rows */}
            {rows.map((row) => (
              <LayoutRow key={row.id} row={row} />
            ))}

            {/* Drop row hint */}
            <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-2xl text-sm text-muted-foreground">
              Drag a Row from Sidebar and drop here
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};
