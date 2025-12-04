import React from "react";
import { useDrag } from "react-dnd";
import {
  Rows3,
  Columns3,
  Image as ImageIcon,
  TextCursorInput,
  Box,
  Sparkles
} from "lucide-react";
import { ComponentKind } from "./types";

const SidebarItem = ({ label, type, icon: Icon }: { label: string; type: ComponentKind | "ROW" | "COLUMN"; icon: any }) => {
  const isComponent = type === "INPUT" || type === "IMAGE" || type === "DEMO";

  const [{ isDragging }, drag] = useDrag(() => ({
    type: isComponent ? "COMPONENT" : type, 
    item: { type: type.toLowerCase() },      
    collect: (m) => ({ isDragging: !!m.isDragging() }),
  }));


  return (
    <div
      ref={drag}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-primary/10 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-secondary/30">
        <Icon className="w-4 h-4" />
      </div>

      <div>
        <div className="text-sm font-medium">{label}</div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const menu = [
    { label: "Row", type: "ROW", icon: Rows3 },
    { label: "Column", type: "COLUMN", icon: Columns3 },
    { label: "Input", type: "INPUT", icon: TextCursorInput },
    { label: "Image", type: "IMAGE", icon: ImageIcon },
    { label: "Demo", type: "DEMO", icon: Box },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] p-6 bg-gray-50 border-r">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Layout Builder</h1>
          <div className="text-xs text-muted-foreground">Drag & Drop</div>
        </div>
      </div>

      {/* Menu */}
      <div className="uppercase text-xs font-semibold mb-3">Components</div>

      <div className="flex flex-col gap-2">
        {menu.map((m) => (
          <SidebarItem
            key={m.label}
            label={m.label}
            type={m.type}
            icon={m.icon}
          />
        ))}
      </div>

      {/* Pro Tip */}
      <div className="mt-6 p-3 rounded-lg bg-violet-50 text-sm">
        <strong>Pro Tip</strong>
        <div className="text-xs text-muted-foreground mt-1">
          Drag Row first, then drop Columns inside it.
          Components (Input, Image, Demo) must be dropped inside Columns.
        </div>
      </div>
    </aside>
  );
};
