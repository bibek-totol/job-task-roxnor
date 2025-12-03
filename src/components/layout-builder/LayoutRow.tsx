import { LayoutColumn } from "./LayoutColumn";

interface ColumnConfig {
  components: Array<"input" | "image" | "demo">;
}

interface LayoutRowProps {
  index: number;
  columns: ColumnConfig[];
  delay?: number;
}

export const LayoutRow = ({ index, columns, delay = 0 }: LayoutRowProps) => {
  return (
    <div 
      className="layout-row animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="badge-row">row{index}</span>
      
      <div className="flex gap-4 pt-3 flex-wrap lg:flex-nowrap">
        {columns.map((col, i) => (
          <LayoutColumn
            key={i}
            index={i}
            components={col.components}
            delay={delay + 100 + i * 100}
          />
        ))}
      </div>
    </div>
  );
};
