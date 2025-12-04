import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { LayoutRow } from "./LayoutRow";
import type { CanvasState } from "./types";
import { Trash2, Plus } from "lucide-react";

export const LayoutCanvas = () => {
  const [canvas, setCanvas] = useState<CanvasState>({ rows: [] });
  const [dragType, setDragType] = useState<null | string>(null);

  const [, drop] = useDrop(() => ({
    accept: "ROW",
    drop: () => {
      setCanvas(prev => ({
        ...prev,
        rows: [...prev.rows, { id: crypto.randomUUID(), columns: [] }]
      }));
    }
  }));

  const [, dropTrash] = useDrop(() => ({
    accept: ["ROW_ITEM", "COLUMN_ITEM", "COMPONENT_ITEM"],
    drop: (item: any, monitor) => {
      const type = monitor.getItemType();
      if (type === "ROW_ITEM") setCanvas(prev => ({ ...prev, rows: prev.rows.filter(r => r.id !== item.rowId) }));
      if (type === "COLUMN_ITEM") setCanvas(prev => {
        const updated = structuredClone(prev);
        updated.rows[item.rowIndex].columns.splice(item.colIndex, 1);
        return updated;
      });
      if (type === "COMPONENT_ITEM") setCanvas(prev => {
        const updated = structuredClone(prev);
        updated.rows.forEach(row => row.columns.forEach(col => col.components = col.components.filter(c => c.id !== item.compId)));
        return updated;
      });
      setDragType(null);
    },
    hover: (_, monitor) => setDragType(monitor.getItemType()),
    collect: monitor => { if (!monitor.isOver()) setDragType(null); }
  }));

  return (
    <main ref={drop} className="flex-1 ml-0 md:ml-60 min-h-screen p-4 sm:p-6">
      <div className="max-w-[870px] mx-auto relative">
        <div className="p-4 sm:p-6 rounded-3xl bg-card/60 border shadow-sm flex flex-col gap-6">
          {canvas.rows.map((row, rowIndex) => (
            <LayoutRow key={row.id} row={row} rowIndex={rowIndex} setCanvas={setCanvas} />
          ))}

          <div className="mt-10 h-24 border-4 border-slate-400 rounded-xl flex items-center justify-center text-muted-foreground">
            Drag a Row here
          </div>
        </div>

        {/* Trash zone */}
        <div
          ref={dropTrash}
          className={`fixed bottom-4 right-2 w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center rounded-xl border-4 transition-all duration-300
            ${dragType ? "border-green-600 bg-green-100" : "border-red-600"}
          `}
        >
          {dragType ? <Plus size={80} className="sm:size-[120px] text-green-700" /> : <Trash2 size={80} className="sm:size-[120px] text-red-700" />}
        </div>
      </div>
    </main>
  );
};
