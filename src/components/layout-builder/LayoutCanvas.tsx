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
    hover: (_, monitor) => setDragType(monitor.getItemType() as string),
    collect: monitor => { if (!monitor.isOver()) setDragType(null); }
  }));

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    setCanvas((prev) => {
      const updated = structuredClone(prev);
      const [draggedRow] = updated.rows.splice(dragIndex, 1);
      updated.rows.splice(hoverIndex, 0, draggedRow);
      return updated;
    });
  };

  const moveColumn = (sourceRowIndex: number, sourceColIndex: number, targetRowIndex: number, targetColIndex: number) => {
    setCanvas((prev) => {
      const updated = structuredClone(prev);
      const sourceColumns = updated.rows[sourceRowIndex].columns;
      const targetColumns = updated.rows[targetRowIndex].columns;
      const [draggedCol] = sourceColumns.splice(sourceColIndex, 1);
      targetColumns.splice(targetColIndex, 0, draggedCol);
      return updated;
    });
  };

  const moveComponent = (
    sourceRowIndex: number,
    sourceColIndex: number,
    sourceCompIndex: number,
    targetRowIndex: number,
    targetColIndex: number,
    targetCompIndex: number
  ) => {
    setCanvas((prev) => {
      const updated = structuredClone(prev);
      const sourceComps = updated.rows[sourceRowIndex].columns[sourceColIndex].components;
      const targetComps = updated.rows[targetRowIndex].columns[targetColIndex].components;
      const [draggedComp] = sourceComps.splice(sourceCompIndex, 1);
      targetComps.splice(targetCompIndex, 0, draggedComp);
      return updated;
    });
  };

  const resizeColumn = (rowIndex: number, colIndex: number, deltaX: number, rowWidth: number) => {
    setCanvas((prev) => {
      const updated = structuredClone(prev);
      const row = updated.rows[rowIndex];
      const col = row.columns[colIndex];
      const nextCol = row.columns[colIndex + 1];

      if (!nextCol) return prev;

      if (row.columns.some((c) => c.width === undefined)) {
        row.columns.forEach((c) => (c.width = 1));
      }

      const totalWeight = row.columns.reduce((sum, c) => sum + (c.width || 1), 0);
      const deltaWeight = (deltaX / rowWidth) * totalWeight;

      const newColWidth = (col.width || 1) + deltaWeight;
      const newNextColWidth = (nextCol.width || 1) - deltaWeight;

      if (newColWidth < 0.1 || newNextColWidth < 0.1) return prev;

      col.width = newColWidth;
      nextCol.width = newNextColWidth;

      return updated;
    });
  };

  return (
    <main ref={drop} className="flex-1 ml-0 md:ml-60 min-h-screen p-4 sm:p-6">
      <div className="max-w-[870px] mx-auto relative">
        <div className="p-4 sm:p-6 rounded-3xl bg-card/60 border shadow-sm flex flex-col gap-6">
          {canvas.rows.map((row, rowIndex) => (
            <LayoutRow
              key={row.id}
              row={row}
              rowIndex={rowIndex}
              setCanvas={setCanvas}
              moveRow={moveRow}
              moveColumn={moveColumn}
              moveComponent={moveComponent}
              resizeColumn={resizeColumn}
            />
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
