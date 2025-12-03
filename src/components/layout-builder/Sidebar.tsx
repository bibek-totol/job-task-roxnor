import { Rows3, Columns3, Box, Image, TextCursorInput, Sparkles } from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  delay?: number;
}

const SidebarItem = ({ icon, label, delay = 0 }: SidebarItemProps) => (
  <div 
    className="sidebar-item animate-fade-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/80">
      {icon}
    </span>
    <span>{label}</span>
  </div>
);

const menuItems = [
  { icon: <Rows3 className="w-5 h-5" />, label: "Row" },
  { icon: <Columns3 className="w-5 h-5" />, label: "Column" },
  { icon: <Box className="w-5 h-5" />, label: "Demo Item" },
  { icon: <Image className="w-5 h-5" />, label: "Image" },
  { icon: <TextCursorInput className="w-5 h-5" />, label: "Input" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] glass-strong shadow-soft z-50">
      <div className="flex flex-col h-full p-5">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8 animate-fade-up">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-glow">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Layout Builder</h1>
            <p className="text-xs text-muted-foreground">Drag & Drop</p>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-border/60 mx-2 mb-6" />
        
        {/* Menu Label */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3 animate-fade-up" style={{ animationDelay: '50ms' }}>
          Components
        </p>
        
        {/* Menu Items */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              delay={100 + index * 50}
            />
          ))}
        </nav>
        
        {/* Bottom Section */}
        <div className="mt-auto px-2">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <p className="text-sm font-medium text-foreground mb-1">Pro Tip</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drag components onto the canvas to start building your layout.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
