import { Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  return (
     <div
      style={{
        background: "#0077A2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 67,
        boxShadow: "0 2px 8px rgba(21,101,192,0.18)",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <img
        src="/logo.png"
        alt="Sync2myCity"
        style={{
          height: 36,
          width: "auto",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          className="desktop-user"
          style={{
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 6,
            letterSpacing: 0.4,
          }}
        >
          ΠΕΤΡΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ ▾
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={onMenuClick}
          aria-label="Open menu"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            width: 38,
            height: 38,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Menu size={24} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}