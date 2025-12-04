import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { ComponentCard } from "./ComponentCard";

export const LayoutColumn = ({ column, rowIndex, colIndex, setCanvas }) => {
  const [, drag] = useDrag(() => ({
    type: "COLUMN_ITEM",
    item: { rowIndex, colIndex }
  }));

  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item) => {
      setCanvas(prev => {
        const newRows = [...prev.rows];
        newRows[rowIndex].columns[colIndex].components.push({
          id: crypto.randomUUID(),
          kind: item.type
        });
        return { ...prev, rows: newRows };
      });
    }
  });

  return (
    <div
      ref={node => drag(drop(node))}
      className="flex-1 min-w-[150px] sm:min-w-[200px] p-3 rounded-lg border-4 border-slate-400"
    >
      <span className="text-xs block mb-2">column{colIndex}</span>
      <div className="flex flex-col gap-2">
        {column.components.length > 0 ? (
          column.components.map(comp => <ComponentCard key={comp.id} comp={comp} />)
        ) : (
          <div className="h-20 text-muted-foreground rounded-lg flex items-center justify-center text-md">
            Drop components here
          </div>
        )}
      </div>
    </div>
  );
};
