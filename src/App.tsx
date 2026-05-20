import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import ApplicationForm from "./pages/ApplicationForm";
import Certificates from "./pages/Certificates";
import Debts from "./pages/Debts";
import ApplicationView from "./pages/ApplicationView";



import "./styles/global.css";

function AppLayout() {
  const location = useLocation();

  // Определяем активный пункт меню по URL
  const getActiveIndex = () => {
    if (location.pathname.startsWith("/new-request")) return 0;
    if (location.pathname === "/")                    return 1;
    if (location.pathname.startsWith("/certificates"))return 2;
    if (location.pathname.startsWith("/debts"))       return 3;
    if (location.pathname.startsWith("/confirmations"))return 4;
    return 1;
  };

  return (
    <div className="layout">
      <Topbar />
      <div className="layout__body">
        <Sidebar activeIndex={getActiveIndex()} />
        <Routes>

          <Route path="/" element={<Dashboard />} />
          
          <Route path="/new-request"      element={<NewRequest />} />
          <Route path="/new-request/:id"  element={<ApplicationForm />} />
          
          <Route path="/certificates"     element={<Certificates />} />
          <Route path="/certificates/:id" element={<ApplicationView />} />
          
          <Route path="/debts"            element={<Debts />} />
          <Route path="/debts/:id"        element={<ApplicationView />} />
          


          <Route path="/applications/:id" element={<ApplicationView />} />



          {/* 404 — redirect to Home */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}