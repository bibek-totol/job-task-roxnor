import React from "react";
import { FileText, Image, TextCursorInput } from "lucide-react";
import { useDrag } from "react-dnd";
import type { ComponentNode } from "./types";

export const ComponentCard: React.FC<{ comp: ComponentNode }> = ({ comp }) => {
  const cfg = {
    input: { title: "Input Component", description: "Text input field", Icon: TextCursorInput },
    image: { title: "Image Component", description: "Image placeholder", Icon: Image },
    demo: { title: "Demo Component", description: "Sample content block", Icon: FileText },
  } as const;

  const { title, description, Icon } = cfg[comp.kind];

  const [, drag] = useDrag(() => ({
    type: "COMPONENT_ITEM",
    item: { compId: comp.id }
  }));

  return (
    <div ref={drag} className="component-card p-2 sm:p-3 bg-white rounded-md border flex items-start gap-2 sm:gap-3 shadow-sm">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-secondary/20 flex items-center justify-center">
        <Icon className="w-3 sm:w-4 h-3 sm:h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
