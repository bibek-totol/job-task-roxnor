import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "../components/layout-builder/Sidebar";
import { LayoutCanvas } from "../components/layout-builder/LayoutCanvas";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <LayoutCanvas />
      </div>
    </DndProvider>
  );
}
