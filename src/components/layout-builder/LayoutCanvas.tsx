import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { LayoutRow } from "./LayoutRow";
import type { CanvasState } from "./types";
import {Trash2} from "lucide-react";

export const LayoutCanvas = () => {
  const [canvas, setCanvas] = useState<CanvasState>({
    rows: [],
  });

  const [, drop] = useDrop(() => ({
    accept: "ROW",
    drop: () => {
      setCanvas((prev) => ({
        ...prev,
        rows: [
          ...prev.rows,
          { id: crypto.randomUUID(), columns: [] }
        ]
      }));
    },
  }));

  return (
    <main ref={drop} className="ml-[260px] min-h-screen p-8 ">

      <div className="max-w-6xl mx-auto ">

        <div className="p-6 rounded-3xl bg-white border shadow-sm">
          <div className="flex flex-col gap-6">

            {canvas.rows.map((row, rowIndex) => (
              <LayoutRow
                key={row.id}
                row={row}
                rowIndex={rowIndex}
                setCanvas={setCanvas} 
              />
            ))}

            <div className="cursor-pointer h-24 border-4 rounded-xl flex items-center justify-center text-muted-foreground">
              Drag a Row here
            </div>

           

          </div>
        </div>

         <div className="flex  mt-6 justify-center w-full max-w-40 p-4 mx-auto rounded-md border-2 border-red-600 ">
              <Trash2 size={160} color="#c20f0f"/>
            </div>


      </div>
    </main>
  );
};
