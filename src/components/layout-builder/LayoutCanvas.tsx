import { LayoutRow } from "./LayoutRow";
import { TrashZone } from "./TrashZone";

// Sample layout configuration
const layoutConfig = [
  {
    columns: [
      { components: ["image" as const, "input" as const] },
      { components: ["demo" as const] },
      { components: ["input" as const] },
    ],
  },
  {
    columns: [
      { components: ["demo" as const, "image" as const] },
      { components: ["input" as const, "demo" as const] },
    ],
  },
];

export const LayoutCanvas = () => {
  return (
    <main className="ml-[260px] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Canvas</h2>
          <p className="text-muted-foreground mt-1">Build your layout by arranging rows, columns, and components</p>
        </div>
        
        {/* Canvas Area */}
        <div className="p-6 rounded-3xl bg-card/50 border border-border/50 shadow-soft " >
          <div className="flex flex-col gap-6">
            {layoutConfig.map((row, index) => (
              <LayoutRow
                key={index}
                index={index}
                columns={row.columns}
                delay={200 + index * 150}
              />
            ))}
            
            {/* Empty row placeholder */}
            <div 
              className="flex items-center justify-center h-32 border-2 border-dashed border-border/60 rounded-2xl transition-colors hover:border-primary/30 hover:bg-primary/5 cursor-pointer "
              style={{ animationDelay: '600ms' }}
            >
              <p className="text-sm text-muted-foreground">+ Add new row</p>
            </div>
          </div>
        </div>
        
        {/* Trash Zone */}
        <div className="flex justify-center mt-8">
          <TrashZone delay={700} />
        </div>
      </div>
    </main>
  );
};
