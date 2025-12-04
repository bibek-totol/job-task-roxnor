import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { LayoutRow } from "./LayoutRow";
import type { CanvasState } from "./types";
import { Trash2, Plus } from "lucide-react";

export const LayoutCanvas = () => {
  const [canvas, setCanvas] = useState<CanvasState>({ rows: [] });

  // NEW: holds drag state from child
  const [isDraggingRow, setIsDraggingRow] = useState(false);

  // Drop a NEW row
  const [, drop] = useDrop(() => ({
    accept: "ROW",
    drop: () => {
      setCanvas((prev) => ({
        ...prev,
        rows: [...prev.rows, { id: crypto.randomUUID(), columns: [] }],
      }));
    },
  }));

// Delete row when dropped on trash
const [, dropTrash] = useDrop(() => ({
  accept: "EXISTING_ROW",

  // When dropped -> delete row & reset drag state
  drop: (item) => {
    setCanvas((prev) => ({
      ...prev,
      rows: prev.rows.filter((r) => r.id !== item.id),
    }));
    setIsDraggingRow(false); // RESET HERE
  },

  // When row is dragged over the trash
  hover: () => {
    setIsDraggingRow(true);
  },

  // When the cursor leaves the trash zone
  collect: (monitor) => {
    if (!monitor.isOver()) {
      setIsDraggingRow(false);    // RESET when leaving hover
    }
  },
}));


  return (
    <main ref={drop} className="ml-[260px] min-h-screen p-8 ">
      <div className="max-w-6xl mx-auto ">

        <div className="p-6 rounded-3xl bg-card/60 border shadow-sm">
          <div className="flex flex-col gap-6">

            {canvas.rows.map((row, rowIndex) => (
              <LayoutRow
                key={row.id}
                row={row}
                rowIndex={rowIndex}
                setCanvas={setCanvas}
                onDragStateChange={setIsDraggingRow} 
              />
            ))}

            <div className="mt-10 h-24 border-4 border-slate-400 rounded-xl flex items-center justify-center text-muted-foreground">
              Drag a Row here
            </div>

          </div>
        </div>

        {/* TRASH ZONE */}
        <div
          ref={dropTrash}
          className={`flex mt-6 justify-center p-4 mx-auto rounded-md border-2 
          transition-all duration-300 ${
            isDraggingRow ? "border-green-600 bg-green-100" : "border-red-600"
          }`}
        >
          {isDraggingRow ? (
            <Plus size={160} className="text-green-700" />
          ) : (
            <Trash2 size={160} color="#c20f0f" />
          )}
        </div>

      </div>
    </main>
  );
};
