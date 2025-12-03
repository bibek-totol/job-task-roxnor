import React from "react";
import { useDrop } from "react-dnd";



export const TrashZone: React.FC<{
  onDropRow?: (rowId: string) => void;
  onDropColumn?: (rowId: string, colId: string) => void;
}> = ({ onDropRow, onDropColumn }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ["ROW", "COLUMN", "COMPONENT"],
      drop: (item: any) => {
        if (item.type === "ROW" && item.id && onDropRow) onDropRow(item.id);
        if (item.type === "COLUMN" && item.rowId && item.colId && onDropColumn) onDropColumn(item.rowId, item.colId);
        // components and other items could be handled similarly
      },
    }),
    [onDropRow, onDropColumn]
  );

  return (
    <div ref={drop} className="w-60 h-16 rounded-xl border border-dashed flex items-center justify-center bg-red-50 text-red-700">
      Drop to Trash
    </div>
  );
};
