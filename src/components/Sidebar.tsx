import { CirclePlus, Home, FileText, Wallet, Stamp } from "lucide-react";
import { NAV_ITEMS } from "../constants/data";

const ICONS = [CirclePlus, Home, FileText, Wallet, Stamp];

interface Props {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Sidebar({ activeIndex, onSelect }: Props) {
  return (
    <div className="sidebar">
      {NAV_ITEMS.map((item, i) => {
        const Icon = ICONS[i];
        return (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            background: activeIndex === i ? "#0077A2" : "transparent",
            border: "none",
            borderLeft: activeIndex === i ? "3px solid #1565c0" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: 400,
            fontSize: 14,
            color: activeIndex === i ? "white" : "#0077A2",
            width: "100%",
            textAlign: "left",
            transition: "all 0.15s",
            height: 44,
          }}
        >
          <Icon size={17} strokeWidth={1.8} />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge !== null && (
            <span style={{ background: "#e53935", color: "#fff", borderRadius: 10, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>
              {item.badge}
            </span>
          )}
        </button>
       );
      })}
    </div>
  );
}