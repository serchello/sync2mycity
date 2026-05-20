import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RequestItem {
  title: string;
  description: string;
  type: string;
}

interface RequestGroup {
  category: string;
  items: RequestItem[];
}

const DATA: RequestGroup[] = [
  {
    category: "Στάθμευση",
    items: [
      {
        title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
      {
        title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
        description: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisiltora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
        type: "Βεβαίωση",
      },
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
    ],
  },
  {
    category: "Ενστάσεις",
    items: [
      {
        title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Βεβαίωση",
      },
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
    ],
  },
  {
    category: "Ενστάσεις",
    items: [
      {
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
    ],
  },
];

const ALL_CATEGORIES = ["Όλες", ...Array.from(new Set(DATA.map((g) => g.category)))];

export default function NewRequest() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Όλες");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = DATA.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const matchSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        category === "Όλες" || group.category === category;
      return matchSearch && matchCategory;
    }),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="main-content">

      {/* Title */}
      <h2 style={{ fontWeight: 700, fontSize: 16, letterSpacing: 2,
                   color: "#0077a2", textTransform: "uppercase", marginBottom: 16 }}>
        Διαθέσιμες Αιτήσεις
      </h2>

      {/* Search + filter row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
          <input
            type="text"
            placeholder="ΑΝΑΖΗΤΗΣΗ"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 36px 9px 12px",
              border: "1.5px solid #c5d5e5",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: 1,
              color: "#3a5068",
              outline: "none",
              background: "#fff",
            }}
          />
          <span style={{ position: "absolute", right: 10, top: "50%",
                         transform: "translateY(-50%)", color: "#8090a0", fontSize: 16 }}>
            🔍
          </span>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "9px 32px 9px 12px",
            border: "1.5px solid #c5d5e5",
            borderRadius: 6,
            fontSize: 12,
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: 1,
            color: "#3a5068",
            background: "#fff",
            cursor: "pointer",
            outline: "none",
            minWidth: 160,
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat === "Όλες" ? "ΚΑΤΗΓΟΡΙΑ" : cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #dde3ea", borderRadius: 8, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 160px 140px",
                      background: "#0077a2", padding: "10px 16px", gap: 16 }}>
          {["ΤΙΤΛΟΣ", "ΠΕΡΙΓΡΑΦΗ", "ΤΙΠΟΣ ΑΙΤΗΣΗΣ", ""].map((col) => (
            <span key={col} style={{ fontSize: 11, fontWeight: 700, color: "#fff",
                                     letterSpacing: 1.2 }}>
              {col}
            </span>
          ))}
        </div>

        {/* Groups */}
        {filtered.map((group, gi) => {
          const key = `${group.category}-${gi}`;
          const isCollapsed = collapsed[key];
          return (
            <div key={key}>
              {/* Group header */}
              <div
                onClick={() => toggleGroup(key)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                         padding: "10px 16px", background: "#eaf4f8",
                         borderBottom: "1px solid #dde3ea", cursor: "pointer" }}
              >
                <span style={{ fontWeight: 600, fontSize: 13, color: "#1a2d3d" }}>
                  {group.category}
                </span>
                <span style={{ fontSize: 12, color: "#0077a2", fontWeight: 700,
                               transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                               transition: "transform 0.2s", display: "inline-block" }}>
                  ▲
                </span>
              </div>

              {/* Rows */}
              {!isCollapsed && group.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{ display: "grid", gridTemplateColumns: "220px 1fr 160px 140px",
                           padding: "14px 16px", gap: 16, alignItems: "start",
                           borderBottom: "1px solid #f0f4f8",
                           background: ii % 2 === 0 ? "#fff" : "#fafcfe",
                           animation: "fadeUp 0.25s ease both",
                           animationDelay: `${ii * 0.04}s` }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2d3d",
                                 lineHeight: 1.4 }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: 12, color: "#607080", lineHeight: 1.6 }}>
                    {item.description}
                  </span>
                  <span style={{ fontSize: 12, color: "#3a5068" }}>
                    {item.type}
                  </span>
                  <div>
                    <button
                      style={{ background: "#0077a2", color: "#fff", border: "none",
                               borderRadius: 6, padding: "6px 14px", fontSize: 11,
                               fontWeight: 700, letterSpacing: 1, cursor: "pointer",
                               fontFamily: "'Open Sans', sans-serif",
                               transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#005f82")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#0077a2")}
                      onClick={() => navigate(`/new-request/${encodeURIComponent(item.title)}`)}
                    >
                      ΝΕΑ ΑΙΤΗΣΗ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#8090a0", fontSize: 14 }}>
            Δεν βρέθηκαν αποτελέσματα
          </div>
        )}
      </div>
    </div>
  );
}