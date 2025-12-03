import { Sidebar } from "@/components/layout-builder/Sidebar";
import { LayoutCanvas } from "@/components/layout-builder/LayoutCanvas";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-row-badge/5 rounded-full blur-3xl" />
      </div>
      
      <Sidebar />
      <LayoutCanvas />
    </div>
  );
};

export default Index;
