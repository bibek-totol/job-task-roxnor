import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "../components/layout-builder/Sidebar";
import { LayoutCanvas } from "../components/layout-builder/LayoutCanvas";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-r from-[#08010F] via-[#380996] to-[#240404] flex flex-col md:flex-row">
        <Sidebar />
        <LayoutCanvas />
      </div>
    </DndProvider>
  );
}
