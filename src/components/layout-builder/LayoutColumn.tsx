import { ComponentCard } from "./ComponentCard";

interface LayoutColumnProps {
  index: number;
  components?: Array<"input" | "image" | "demo">;
  delay?: number;
}

export const LayoutColumn = ({ index, components = [], delay = 0 }: LayoutColumnProps) => {
  return (
    <div 
      className="layout-column flex-1 min-w-[180px] animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="badge-column">column{index}</span>
      
      <div className="flex flex-col gap-3 pt-2">
        {components.length > 0 ? (
          components.map((type, i) => (
            <ComponentCard 
              key={`${type}-${i}`} 
              type={type} 
              delay={delay + 100 + i * 50}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-20 border border-dashed border-column-border/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Drop components here</p>
          </div>
        )}
      </div>
    </div>
  );
};
