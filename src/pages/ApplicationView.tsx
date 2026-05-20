import { useNavigate, useParams } from "react-router-dom";
import { Download, ZoomIn, ZoomOut, RotateCw, Maximize } from "lucide-react";

interface InfoRow {
  label: string;
  value: string;
  highlight?: boolean;
}

// Мок-данные — в будущем заменить на fetch по id
const INFO_ROWS: InfoRow[] = [
  { label: "ID",          value: "657124" },
  { label: "ΕΙΔΟΣ ΤΕΛΟΥΣ", value: "Ένσταση για Πρόστιμο Στάθμευσης" },
  { label: "ΠΡΟΘΕΣΜΙΑ",   value: "20.12.2025" },
  { label: "ΠΟΣΟ",        value: "RF231862850275937501875992", highlight: false },
  { label: "RF",          value: "RF231862850275937501875992" },
  { label: "ΚΑΤΑΣΤΑΣΗ",   value: "Paid" },
];

export default function ApplicationView() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="main-content" style={{ padding: 0, display: "flex",
                                           flexDirection: "column", overflow: "hidden" }}>

      {/* Page title */}
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #dde3ea",
                    background: "#fff" }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, letterSpacing: 1.5,
                     color: "#1a2d3d", textTransform: "uppercase" }}>
          Ένσταση για Πρόστιμο Στάθμευσης
        </h2>
      </div>

      {/* Body: sidebar + pdf viewer */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left sidebar — info */}
        <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid #dde3ea",
                      background: "#fafcfe", overflowY: "auto", padding: "20px 16px" }}>
          {INFO_ROWS.map((row) => (
            <div key={row.label} style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                          color: "#8090a0", textTransform: "uppercase", marginBottom: 4 }}>
                {row.label}
              </p>
              <p style={{ fontSize: 12, fontWeight: row.highlight ? 700 : 500,
                          color: row.label === "ΚΑΤΑΣΤΑΣΗ" ? "#2e7d32" : "#1a2d3d",
                          wordBreak: "break-all", lineHeight: 1.5 }}>
                {row.label === "ΚΑΤΑΣΤΑΣΗ" ? (
                  <span style={{ background: "#2e7d32", color: "#fff", borderRadius: 20,
                                 padding: "2px 12px", fontSize: 11, fontWeight: 700 }}>
                    {row.value}
                  </span>
                ) : row.value}
              </p>
            </div>
          ))}
        </div>

        {/* PDF Viewer */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column",
                      overflow: "hidden", background: "#e8edf2" }}>

          {/* PDF toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 16px", background: "#3a3a3a",
                        flexShrink: 0 }}>
            {/* File name */}
            <div style={{ display: "flex", alignItems: "center", gap: 6,
                          background: "rgba(255,255,255,0.1)", borderRadius: 4,
                          padding: "4px 10px", flex: 1, maxWidth: 200 }}>
              <span style={{ fontSize: 12, color: "#fff", whiteSpace: "nowrap",
                             overflow: "hidden", textOverflow: "ellipsis" }}>
                Όνομα Αρχείου...
              </span>
            </div>

            {/* Page nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ToolBtn label="‹" />
              <span style={{ fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>
                2 / 26
              </span>
              <ToolBtn label="›" />
            </div>

            {/* Zoom */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ToolIconBtn icon={<ZoomOut size={14} />} />
              <span style={{ fontSize: 11, color: "#fff", minWidth: 38,
                             textAlign: "center" }}>100%</span>
              <ToolIconBtn icon={<ZoomIn size={14} />} />
            </div>

            {/* Extra tools */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
              <ToolIconBtn icon={<RotateCw size={14} />} />
              <ToolIconBtn icon={<Maximize size={14} />} />
            </div>
          </div>

          {/* PDF content area */}
          <div style={{ flex: 1, overflowY: "auto", display: "flex",
                        justifyContent: "center", alignItems: "flex-start",
                        padding: "24px 16px" }}>
            <div style={{ background: "#fff", width: "100%", maxWidth: 680,
                          minHeight: 880, boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                          borderRadius: 2, padding: "48px 56px",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "flex-start" }}>

              {/* Big PDF label (placeholder) */}
              <p style={{ fontSize: 96, fontWeight: 900, color: "#e0e0e0",
                          letterSpacing: 16, marginBottom: 32, userSelect: "none" }}>
                PDF
              </p>

              {/* Lorem ipsum text blocks */}
              {[...Array(4)].map((_, i) => (
                <p key={i} style={{ fontSize: 12, color: "#444", lineHeight: 1.8,
                                    marginBottom: 20, width: "100%" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              ))}
            </div>
          </div>

          {/* Save PDF button */}
          <div style={{ padding: "12px 24px", background: "#fff",
                        borderTop: "1px solid #dde3ea", display: "flex",
                        justifyContent: "flex-start" }}>
            <button
              style={{ display: "flex", alignItems: "center", gap: 8,
                       background: "#0077a2", color: "#fff", border: "none",
                       borderRadius: 6, padding: "8px 20px", fontSize: 12,
                       fontWeight: 700, cursor: "pointer",
                       fontFamily: "'Open Sans', sans-serif",
                       letterSpacing: 0.5 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#005f82")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0077a2")}
            >
              <Download size={15} />
              Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Toolbar helpers ────────────────────────────

function ToolBtn({ label }: { label: string }) {
  return (
    <button style={{ background: "rgba(255,255,255,0.15)", border: "none",
                     borderRadius: 4, color: "#fff", width: 24, height: 24,
                     cursor: "pointer", fontSize: 14, lineHeight: 1,
                     display: "flex", alignItems: "center", justifyContent: "center" }}>
      {label}
    </button>
  );
}

function ToolIconBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button style={{ background: "rgba(255,255,255,0.1)", border: "none",
                     borderRadius: 4, color: "#fff", width: 28, height: 28,
                     cursor: "pointer",
                     display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </button>
  );
}