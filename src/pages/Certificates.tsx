import { useState } from "react";
import { useNavigate } from "react-router-dom";

type StatusType =
  | "Submitted"
  | "In Progress"
  | "Pending Info"
  | "Pending Payment"
  | "Paid"
  | "Completed"
  | "Rejected";

interface HistoryEntry {
  time: string;
  text: string;
}

interface CertItem {
  id: string;
  title: string;
  date: string;
  type: string;
  status: StatusType;
  action: "view" | "update" | "pay";
  history?: HistoryEntry[];
  completed?: boolean;
}

const STATUS_STYLE: Record<StatusType, { bg: string; color: string }> = {
  Submitted:       { bg: "#1565c0", color: "#fff" },
  "In Progress":   { bg: "#6a1b9a", color: "#fff" },
  "Pending Info":  { bg: "#e65100", color: "#fff" },
  "Pending Payment":{ bg: "#e65100", color: "#fff" },
  Paid:            { bg: "#2e7d32", color: "#fff" },
  Completed:       { bg: "#1b5e20", color: "#fff" },
  Rejected:        { bg: "#b71c1c", color: "#fff" },
};

const ALL_ITEMS: CertItem[] = [
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Πιστοποιητικό", status: "Submitted",
    action: "view", completed: false,
  },
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Πιστοποιητικό", status: "In Progress",
    action: "view", completed: false,
  },
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Πιστοποιητικό", status: "Pending Info",
    action: "update", completed: false,
    history: [
      { time: "27 ώρες πριν", text: "Added new petition by ___ on 18.03.2026" },
      { time: "35 ώρες πριν", text: "Το αίτημα βρίσκεται σε αναμονή από τις 18.03.2026" },
      { time: "12 ώρες πριν", text: "Το αίτημα βρίσκεται σε αναμονή από τις 18.03.2026" },
      { time: "7 ώρες πριν",  text: "Το αίτημα βρίσκεται σε αναμονή από τις 18.03.2026" },
    ],
  },
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Πιστοποιητικό", status: "Pending Payment",
    action: "pay", completed: false,
  },
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Βεβαίωση", status: "Paid",
    action: "view", completed: true,
  },
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Πιστοποιητικό", status: "Completed",
    action: "view", completed: true,
  },
  {
    id: "657224", title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46", type: "Βεβαίωση", status: "Rejected",
    action: "view", completed: true,
  },
];

const PAGE_SIZE = 7;

export default function Certificates() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"active" | "completed">("active");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered = ALL_ITEMS.filter((item) =>
    tab === "active" ? !item.completed : item.completed
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const actionBtn = (item: CertItem, globalIndex: number) => {
    if (item.action === "pay") {
      return (
        <button style={{ ...actionStyle, background: "#0077a2", color: "#fff",
                         border: "none" }}>
          ΠΛΗΡΩΜΗ
        </button>
      );
    }
    if (item.action === "update") {
      return (
        <button
          style={{ ...actionStyle, background: "#e65100", color: "#fff", border: "none" }}
          onClick={() => setExpandedIndex(expandedIndex === globalIndex ? null : globalIndex)}
        >
          ΕΝΗΜΕΡΩΣΗ
        </button>
      );
    }
    return (
      <button style={actionStyle} onClick={() => navigate(`/certificates/${item.id}`)}>
        ΠΡΟΒΟΛΗ
      </button>
    );
  };

  return (
    <div className="main-content">

      {/* Page title + tabs */}
      <div style={{ display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontWeight: 700, fontSize: 16, letterSpacing: 2,
                     color: "#1a2d3d", textTransform: "uppercase" }}>
          Πιστοποιητικά
        </h2>
        <div style={{ display: "flex", gap: 4 }}>
          {(["active", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1); setExpandedIndex(null); }}
              style={{
                padding: "6px 20px",
                border: "none",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: "pointer",
                fontFamily: "'Open Sans', sans-serif",
                background: tab === t ? "#0077a2" : "transparent",
                color: tab === t ? "#fff" : "#607080",
                transition: "all 0.15s",
              }}
            >
              {t === "active" ? "ΕΝΕΡΓΑ" : "ΟΛΟΚΛΗΡΩΜΕΝΑ"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #dde3ea", borderRadius: 8,
                    overflow: "hidden", background: "#fff" }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 160px 140px 150px 140px",
                      background: "#0077a2", padding: "10px 16px", gap: 8 }}>
          {["ID", "ΤΙΤΛΟΣ", "ΗΜ/ΝΙΑ ΥΠΟΒΟΛΗΣ", "ΤΙΠΟΣ ΑΙΤΗΣΗΣ", "ΚΑΤΑΣΤΑΣΗ", ""].map((col) => (
            <span key={col} style={{ fontSize: 11, fontWeight: 700,
                                     color: "#fff", letterSpacing: 1 }}>
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {paginated.map((item, i) => {
          const globalIndex = (page - 1) * PAGE_SIZE + i;
          const isExpanded = expandedIndex === globalIndex;
          return (
            <div key={globalIndex}>
              {/* Main row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 160px 140px 150px 140px",
                  padding: "12px 16px",
                  gap: 8,
                  alignItems: "center",
                  borderBottom: "1px solid #f0f4f8",
                  background: isExpanded ? "#f0f7fa" : (i % 2 === 0 ? "#fff" : "#fafcfe"),
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: 12, color: "#607080" }}>{item.id}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2d3d" }}>
                  {item.title}
                </span>
                <span style={{ fontSize: 12, color: "#607080" }}>{item.date}</span>
                <span style={{ fontSize: 12, color: "#3a5068" }}>{item.type}</span>
                <div>
                  <span style={{
                    background: STATUS_STYLE[item.status].bg,
                    color: STATUS_STYLE[item.status].color,
                    borderRadius: 20, padding: "3px 12px",
                    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                  }}>
                    {item.status}
                  </span>
                </div>
                <div>{actionBtn(item, globalIndex)}</div>
              </div>

              {/* Expanded history */}
              {isExpanded && item.history && (
                <div style={{ background: "#f5fafc", borderBottom: "1px solid #dde3ea",
                              padding: "12px 24px" }}>
                  {item.history.map((h, hi) => (
                    <div key={hi} style={{ display: "flex", gap: 12,
                                           alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%",
                                     background: "#0077a2", flexShrink: 0,
                                     marginTop: 5 }} />
                      <div>
                        <span style={{ fontSize: 11, color: "#0077a2",
                                       fontWeight: 600 }}>{h.time}</span>
                        <p style={{ fontSize: 12, color: "#3a5068",
                                    marginTop: 2 }}>{h.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer: count + pagination */}
        <div style={{ display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "12px 16px",
                      borderTop: "1px solid #f0f4f8" }}>
          <span style={{ fontSize: 12, color: "#8090a0" }}>
            Εμφάνιση 1 έως {Math.min(PAGE_SIZE, filtered.length)} από {filtered.length} καταχωρήσεις
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <PageBtn label="‹" onClick={() => setPage(p => Math.max(1, p - 1))}
                     disabled={page === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <PageBtn key={i} label={String(i + 1)}
                       active={page === i + 1}
                       onClick={() => setPage(i + 1)} />
            ))}
            <PageBtn label="›" onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                     disabled={page === totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────

function PageBtn({ label, onClick, active, disabled }: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30,
        border: active ? "none" : "1px solid #dde3ea",
        borderRadius: 6,
        background: active ? "#0077a2" : "#fff",
        color: active ? "#fff" : disabled ? "#c5d5e5" : "#3a5068",
        fontSize: 12, fontWeight: 600,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "'Open Sans', sans-serif",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

const actionStyle: React.CSSProperties = {
  background: "transparent",
  color: "#0077a2",
  border: "1.5px solid #0077a2",
  borderRadius: 6,
  padding: "5px 14px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1,
  cursor: "pointer",
  fontFamily: "'Open Sans', sans-serif",
  whiteSpace: "nowrap",
};