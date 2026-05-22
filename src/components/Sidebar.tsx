import { useNavigate } from "react-router-dom";
import { Plus, Home, FileText, Wallet, Stamp, X } from "lucide-react";
import { NAV_ITEMS } from "../constants/data";
import "./Sidebar.css";

const ICONS = [Plus, Home, FileText, Wallet, Stamp];

const NAV_ROUTES = [
  "/new-request",
  "/",
  "/certificates",
  "/debts",
  "/confirmations",
];

interface Props {
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeIndex, isOpen, onClose }: Props) {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-mobile-header">
          <img src="/logo.png" alt="Sync2myCity" className="sidebar-mobile-logo" />

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {NAV_ITEMS.map((item, index) => {
          const Icon = ICONS[index];
          const isActive = activeIndex === index;

          return (
            <button
              key={item.label}
              type="button"
              className={`sidebar-item ${isActive ? "sidebar-item--active" : ""
                }`}
              onClick={() => handleNavigate(NAV_ROUTES[index])}
            >
              <Icon size={17} strokeWidth={1.8} />

              <span className="sidebar-item__label">{item.label}</span>

              {item.badge != null && (
                <span className="sidebar-item__badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </aside>
    </>
  );
}