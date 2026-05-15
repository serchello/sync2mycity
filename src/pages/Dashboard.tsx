import { useState } from "react";
import { CARDS } from "../constants/data";
import Card from "../components/Card";
import { CirclePlus } from "lucide-react";

export default function Dashboard() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div className="main-content">

      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, letterSpacing: 2.5, color: "#1a2d3d", textTransform: "uppercase" }}>
          Τελευταίες Ενημερώσεις
        </h2>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: btnHovered ? "#065d7c" : "#0077A2",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "8px 16px",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(21,101,192,0.22)",
            transition: "background 0.18s",
          }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
        >
          <span style={{ fontSize: 14, fontWeight: 300 }}><CirclePlus/></span> Νέα Αίτηση
        </button>
      </div>

      {/* Cards grid */}
      <div className="cards-grid">
        {CARDS.map((card, i) => (
          <Card key={card.title} card={card} index={i} />
        ))}
      </div>

      {/* More */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <a href="#" style={{ color: "#1565c0", fontWeight: 500, fontSize: 14, textDecoration: "none", borderBottom: "1.5px solid #1565c0" }} >
          Περισσότερα
        </a>
      </div>

    </div>
  );
}