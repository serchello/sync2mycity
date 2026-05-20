import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DebtStatus = "Paid" | "Submitted" | "In Progress" | "Pending Info" | "Pending Payment";

interface DebtItem {
  id: string;
  type: string;
  deadline: string;
  amount: string;
  amountHighlight?: boolean;
  ref: string;
  status: DebtStatus;
  action: "receipt" | "view" | "pay";
  completed?: boolean;
}

const STATUS_STYLE: Record<DebtStatus, { bg: string; color: string }> = {
  Paid:              { bg: "#2e7d32", color: "#fff" },
  Submitted:         { bg: "#1565c0", color: "#fff" },
  "In Progress":     { bg: "#6a1b9a", color: "#fff" },
  "Pending Info":    { bg: "#e65100", color: "#fff" },
  "Pending Payment": { bg: "#e65100", color: "#fff" },
};

const ALL_ITEMS: DebtItem[] = [
  {
    id: "657224", type: "Τέλος Φωτισμού",     deadline: "20.12.2025",
    amount: "18.27 €", amountHighlight: true,
    ref: "RF231862850275937501875992", status: "Paid",
    action: "receipt", completed: true,
  },
  {
    id: "657224", type: "Τέλος Κυκλοφορίας",  deadline: "20.12.2025",
    amount: "258.63 €",
    ref: "RF231862850275937501875992", status: "Submitted",
    action: "view", completed: false,
  },
  {
    id: "657224", type: "Δημοτικό Τέλος",     deadline: "20.12.2025",
    amount: "28.06 €",
    ref: "RF231862850275937501875992", status: "In Progress",
    action: "view", completed: false,
  },
  {
    id: "657224", type: "Τέλος Στάθμευσης",   deadline: "20.12.2025",
    amount: "71.42€",
    ref: "RF231862850275937501875992", status: "Pending Info",
    action: "view", completed: false,
  },
  {
    id: "657224", type: "Τέλος Στάθμευσης",   deadline: "20.12.2025",
    amount: "71.42€",
    ref: "RF231862850275937501875992", status: "Pending Payment",
    action: "pay", completed: false,
  },
];

const PAGE_SIZE = 7;

export default function Debts() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"active" | "completed">("active");
  const [page, setPage] = useState(1);

  const filtered = ALL_ITEMS.filter((item) =>
    tab === "active" ? !item.completed : item.completed
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderAction = (item: DebtItem) => {
    if (item.action === "pay") {
      return (
        <button style={{ ...btnBase, background: "#0077a2", color: "#fff", border: "none" }}>
          ΠΛΗΡΩΜΗ
        </button>
      );
    }
    if (item.action === "receipt") {
      return (
        <button
          style={{ ...btnBase, background: "#2e7d32", color: "#fff", border: "none" }}
          onClick={() => navigate(`/debts/${item.id}`)}
        >
          ΑΠΟΔΕΙΞΗ
        </button>
      );
    }
    return (
      <button style={btnBase} onClick={() => navigate(`/debts/${item.id}`)}>
        ΠΡΟΒΟΛΗ
      </button>
    );
  };

  return (
    <div className="main-content">

      {/* Title + tabs */}
      <div style={{ display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontWeight: 700, fontSize: 16, letterSpacing: 2,
                     color: "#1a2d3d", textTransform: "uppercase" }}>
          Οφειλές
        </h2>
        <div style={{ display: "flex", gap: 4 }}>
          {(["active", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1); }}
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
              {t === "active" ? "ΕΚΚΡΕΜΕΙΣ" : "ΕΞΟΦΛΗΜΕΝΕΣ"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #dde3ea", borderRadius: 8,
                    overflow: "hidden", background: "#fff" }}>

        {/* Header */}
        <div style={{ display: "grid",
                      gridTemplateColumns: "80px 1fr 120px 100px 1fr 140px 130px",
                      background: "#0077a2", padding: "10px 16px", gap: 8 }}>
          {["ID", "ΕΙΔΟΣ ΤΕΛΟΥΣ", "ΠΡΟΘΕΣΜΙΑ", "ΠΟΣΟ", "RF", "ΚΑΤΑΣΤΑΣΗ", ""].map((col) => (
            <span key={col} style={{ fontSize: 11, fontWeight: 700,
                                     color: "#fff", letterSpacing: 1 }}>
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8090a0", fontSize: 14 }}>
            Δεν υπάρχουν εγγραφές
          </div>
        ) : (
          paginated.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 120px 100px 1fr 140px 130px",
                padding: "12px 16px",
                gap: 8,
                alignItems: "center",
                borderBottom: "1px solid #f0f4f8",
                background: i % 2 === 0 ? "#fff" : "#fafcfe",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: 12, color: "#607080" }}>{item.id}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2d3d" }}>
                {item.type}
              </span>
              <span style={{ fontSize: 12, color: "#607080" }}>{item.deadline}</span>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: item.amountHighlight ? "#0077a2" : "#1a2d3d",
              }}>
                {item.amount}
              </span>
              <span style={{ fontSize: 11, color: "#8090a0",
                             fontFamily: "'DM Mono', monospace", wordBreak: "break-all" }}>
                {item.ref}
              </span>
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
              <div>{renderAction(item)}</div>
            </div>
          ))
        )}

        {/* Footer */}
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

const btnBase: React.CSSProperties = {
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