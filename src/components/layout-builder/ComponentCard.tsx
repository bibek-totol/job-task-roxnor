import { Image, TextCursorInput, FileText } from "lucide-react";

type ComponentType = "input" | "image" | "demo";

interface ComponentCardProps {
  type: ComponentType;
  delay?: number;
}

const componentConfig = {
  input: {
    icon: <TextCursorInput className="w-4 h-4 text-muted-foreground" />,
    title: "Input Component",
    description: "Text input field",
  },
  image: {
    icon: <Image className="w-4 h-4 text-muted-foreground" />,
    title: "Image Component",
    description: "Image placeholder",
  },
  demo: {
    icon: <FileText className="w-4 h-4 text-muted-foreground" />,
    title: "Demo Component",
    description: "Sample content block",
  },
};

export const ComponentCard = ({ type, delay = 0 }: ComponentCardProps) => {
  const config = componentConfig[type];
  
  return (
    <div 
      className="component-card animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/60 shrink-0">
          {config.icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">{config.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{config.description}</p>
        </div>
      </div>
    </div>
  );
};
