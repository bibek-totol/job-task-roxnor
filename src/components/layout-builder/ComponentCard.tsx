import React from "react";
import { FileText, Image, TextCursorInput } from "lucide-react";
import type { ComponentNode } from "./types";

export const ComponentCard: React.FC<{ comp: ComponentNode }> = ({ comp }) => {
  const cfg = {
    input: { title: "Input Component", description: "Text input field", Icon: TextCursorInput },
    image: { title: "Image Component", description: "Image placeholder", Icon: Image },
    demo: { title: "Demo Component", description: "Sample content block", Icon: FileText },
  } as const;

  const { title, description, Icon } = cfg[comp.kind];

  return (
    <div className="component-card p-3 bg-white rounded-md border flex items-start gap-3 shadow-sm">
      <div className="w-9 h-9 rounded-md bg-secondary/20 flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
