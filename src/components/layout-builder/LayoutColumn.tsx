import React from "react";
import { useDrop } from "react-dnd";
import { ComponentCard } from "./ComponentCard";
import type { ComponentNode, ComponentKind } from "./types";

type LayoutColumnProps = {
  column: { items: ComponentNode[] };
  index: number;
};

// Drag item matches ComponentKind
type DragItem = {
  type: ComponentKind;
};

export const LayoutColumn: React.FC<LayoutColumnProps> = ({ column, index }) => {
  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: "COMPONENT",
    drop: (item) => {
      column.items.push({
        id: crypto.randomUUID(),
        kind: item.type, // now type-safe
      });
    },
  });

  return (
    <div
      ref={drop}
      className="layout-column flex-1 min-w-[200px] p-3 rounded-lg border bg-column-bg"
    >
      <span className="badge-column text-xs inline-block mb-2">
        column{index}
      </span>

      <div className="flex flex-col gap-3">
        {column.items.length > 0 ? (
          column.items.map((comp) => (
            <ComponentCard key={comp.id} comp={comp} />
          ))
        ) : (
          <div className="h-20 border border-dashed rounded-lg flex items-center justify-center text-xs text-muted-foreground">
            Drop components here
          </div>
        )}
      </div>
    </div>
  );
};
