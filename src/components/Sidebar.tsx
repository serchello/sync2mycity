import { useNavigate } from "react-router-dom";
import { Plus, Home, FileText, Folder, Stamp } from "lucide-react";
import { NAV_ITEMS } from "../constants/data";

const ICONS = [Plus, Home, FileText, Folder, Stamp];

const NAV_ROUTES = [
  "/new-request",
  "/",
  "/certificates",
  "/debts",
  "/confirmations",
];

interface Props {
  activeIndex: number;
}

export default function Sidebar({ activeIndex }: Props) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {NAV_ITEMS.map((item, i) => {
        const Icon = ICONS[i];
        return (
          <button
            key={i}
            onClick={() => navigate(NAV_ROUTES[i])}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "11px 14px",
              background: activeIndex === i ? "rgba(21,101,192,0.13)" : "transparent",
              border: "none",
              borderLeft: activeIndex === i ? "3px solid #1565c0" : "3px solid transparent",
              cursor: "pointer",
              fontWeight: activeIndex === i ? 600 : 400,
              fontSize: 13,
              color: activeIndex === i ? "#1565c0" : "#3a5068",
              width: "100%",
              textAlign: "left",
              transition: "all 0.15s",
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            <Icon size={17} strokeWidth={1.8} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge !== null && (
              <span style={{ background: "#e53935", color: "#fff", borderRadius: 10,
                             fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}