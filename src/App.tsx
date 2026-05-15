import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import "./styles/global.css";
 
export default function App() {
  const [activeNav, setActiveNav] = useState<number>(1);
 
  const renderPage = () => {
    switch (activeNav) {
      case 0: return <NewRequest />;
      case 1: return <Dashboard />;
      default: return <Dashboard />;
    }
  };
 
  return (
    <div className="layout">
      <Topbar />
      <div className="layout__body">
        <Sidebar activeIndex={activeNav} onSelect={setActiveNav} />
        {renderPage()}
      </div>
    </div>
  );
}