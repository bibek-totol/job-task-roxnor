import React, { useState } from "react";
import { Rows3, Columns3, Box, Image as ImageIcon, TextCursorInput, Sparkles } from "lucide-react";
import { useDrag } from "react-dnd";
const SidebarItem = ({ label, type, icon: Icon }) => {
  const isComponent = type === "INPUT" || type === "IMAGE" || type === "DEMO";

  const colors = {
    ROW: "bg-blue-200",
    COLUMN: "bg-purple-400",
    INPUT: "bg-green-200",
    IMAGE: "bg-yellow-200",
    DEMO: "bg-pink-200",
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: isComponent ? "COMPONENT" : type,
    item: { type: type.toLowerCase() },
    collect: (m) => ({ isDragging: !!m.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-3 p-2 text-black hover:text-white rounded-lg cursor-pointer hover:bg-primary/80 ${colors[type]} ${
        isDragging ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-md">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-medium">{label}</div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menu = [
    { label: "Row", type: "ROW", icon: Rows3 },
    { label: "Column", type: "COLUMN", icon: Columns3 },
    { label: "Input", type: "INPUT", icon: TextCursorInput },
    { label: "Image", type: "IMAGE", icon: ImageIcon },
    { label: "Demo", type: "DEMO", icon: Box },
  ];

  return (
    <>
      {/* Sidebar Toggle Button for small screens */}
      <button
        className="md:hidden fixed bottom-2 left-4 z-50 bg-primary/80 p-2 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 p-6 text-white border-r-black bg-purple-950 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className=" w-10 h-10  flex items-center justify-center rounded-xl bg-primary/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Layout Builder</h1>
            <div className="text-xs text-muted-foreground">Drag & Drop</div>
          </div>
        </div>

        <div className="uppercase text-xs font-semibold mb-3">Components</div>
        <div className="flex flex-col gap-2">
          {menu.map((m) => (
            <SidebarItem key={m.label} label={m.label} type={m.type} icon={m.icon} />
          ))}
        </div>

        <div className="mt-6 p-3 rounded-lg bg-card text-sm text-green-300">
          <strong>Pro Tip</strong>
          <div className="text-xs mt-1">
            Drag Row first, then drop Columns inside it.
            Components (Input, Image, Demo) must be dropped inside Columns.
            You can drop full Row in trash box.
          </div>
        </div>
      </aside>
    </>
  );
};
