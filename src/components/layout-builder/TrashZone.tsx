import { Trash2 } from "lucide-react";

interface TrashZoneProps {
  delay?: number;
}

export const TrashZone = ({ delay = 0 }: TrashZoneProps) => {
  return (
    <div 
      className="trash-zone animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Trash2 className="w-5 h-5 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">TRASH</span>
    </div>
  );
};
