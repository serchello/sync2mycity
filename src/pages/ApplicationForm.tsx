import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import HeaderTitle from "../ui/HeaderTitle";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [textField, setTextField] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [date, setDate] = useState("23.05.2026");
  const [dateRangeFrom, setDateRangeFrom] = useState("22.05.2026");
  const [dateRangeTo, setDateRangeTo] = useState("23.05.2026");
  const [checkbox, setCheckbox] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [paymentAmount] = useState("172.97");
  const [paid] = useState(true);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="main-content">
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Title */}
        <div style={{ display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1.5,
                       color: "#1a2d3d", textTransform: "uppercase" }}>
            Αίτηση Ειδικής Άδειας Στάθμευσης
          </h2>
          <HeaderTitle title="Αίτηση Ειδικής Άδειας Στάθμευσης" />
          <button style={{ background: "#e8f4f8", border: "none", borderRadius: 6,
                           padding: 8, cursor: "pointer", color: "#0077a2" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          </button>
        </div>

        {/* Description box */}
        <div style={{ background: "#f5fafc", border: "1px solid #c5dfe8",
                      borderRadius: 8, padding: "14px 16px", marginBottom: 24,
                      fontSize: 12, color: "#3a5068", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            Απαιτείται να δωρηθεί βεβαίωση ενός οικισμού κοινοποιηστικού στο πλαίσιο του υποέργου
            &ldquo;Διαχείριση Βιοαποβλήτων Δήμου Σπάτα&rdquo; το υλικό έχει εντοπιστεί στο ΕΠΙΧΕΙΡΗΣΙΑΚΟ ΠΡΟΓΡΑΜΜΑ
            &ldquo;ΥΠΟΔΟΜΕΣ ΜΕΤΑΦΟΡΩΝ, ΠΕΡΙΒΑΛΛΟΝ ΚΑΙ ΑΕΙΦΟΡΟΣ ΑΝΑΠΤΥΞΗ 2014-2020&rdquo; και με κωδικό ΟΠΣ: 5079510.
          </p>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Ακολουθείτε τις εξής υποχρεώσεις:</p>
          <ul style={{ paddingLeft: 16 }}>
            <li>Την εκδίωξη για τη σωστή λεπτομέρεια του καθένα σύμφωνα με τις οδηγίες του Δήμου.</li>
            <li>Την τοποθέτηση του πλαίσιο σε κατάλληλο χώρο βολικά σε γνωστό εδαφών με δυνατότητα αποφυγής των εμποδίων.</li>
            <li>Την επιβεβαίωση να αποπέψει στην εκπρόσωπο του Δήμου να επαλείψει το είδος έτσια από σχετική εκτέλεση.</li>
          </ul>
          <p style={{ marginTop: 8, fontSize: 11, color: "#607080" }}>
            Ο Δήμος βεβαιώνει ότι θα κρατείται για την επιστροφή του σκύβαλου κόστος κατά την επιλέξιμη δεσμευτικής συνεργαζόμενης εταιρίας χρήσεις αδικαιολόγητα από μέρους του χρήστη.
          </p>
        </div>

        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* TEXTFIELD */}
          <div>
            <label style={labelStyle}>TEXTFIELD <Req /></label>
            <input
              type="text"
              placeholder="Text text text"
              value={textField}
              onChange={(e) => setTextField(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* DROPDOWN */}
          <div>
            <label style={labelStyle}>DROPDOWN <Req /></label>
            <div style={{ position: "relative" }}>
              <select
                value={dropdown}
                onChange={(e) => setDropdown(e.target.value)}
                style={{ ...inputStyle, appearance: "none", cursor: "pointer",
                         paddingRight: 32, color: dropdown ? "#1a2d3d" : "#a0aab4" }}
              >
                <option value="" disabled>Selection</option>
                <option value="opt1">Επιλογή 1</option>
                <option value="opt2">Επιλογή 2</option>
                <option value="opt3">Επιλογή 3</option>
              </select>
              <span style={{ position: "absolute", right: 10, top: "50%",
                             transform: "translateY(-50%)", pointerEvents: "none",
                             color: "#8090a0", fontSize: 12 }}>▾</span>
            </div>
          </div>

          {/* DATE */}
          <div>
            <label style={labelStyle}>DATE <Req /></label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
              <span style={{ position: "absolute", right: 10, top: "50%",
                             transform: "translateY(-50%)", color: "#8090a0" }}>
                📅
              </span>
            </div>
          </div>

          {/* DATE RANGE */}
          <div>
            <label style={labelStyle}>DATE RANGE <Req /></label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="text" value={dateRangeFrom}
                     onChange={(e) => setDateRangeFrom(e.target.value)}
                     style={{ ...inputStyle, flex: 1 }} />
              <span style={{ color: "#8090a0", fontSize: 14 }}>→</span>
              <input type="text" value={dateRangeTo}
                     onChange={(e) => setDateRangeTo(e.target.value)}
                     style={{ ...inputStyle, flex: 1 }} />
              <span style={{ color: "#8090a0" }}>📅</span>
            </div>
          </div>

          {/* DATE RANGE with hint */}
          <div>
            <label style={labelStyle}>DATE RANGE <Req /></label>
            <p style={{ fontSize: 11, color: "#e07b00", marginBottom: 6, lineHeight: 1.5 }}>
              this is the description that comes with the element, below the component, italic, lowercase text
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="text" value={dateRangeFrom}
                     onChange={(e) => setDateRangeFrom(e.target.value)}
                     style={{ ...inputStyle, flex: 1 }} />
              <span style={{ color: "#8090a0", fontSize: 14 }}>→</span>
              <input type="text" value={dateRangeTo}
                     onChange={(e) => setDateRangeTo(e.target.value)}
                     style={{ ...inputStyle, flex: 1 }} />
              <span style={{ color: "#8090a0" }}>📅</span>
            </div>
          </div>

          {/* CHECKBOX */}
          <div>
            <label style={labelStyle}>CHECKBOX</label>
            <input
              type="checkbox"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
              style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#0077a2" }}
            />
          </div>

          {/* TEXT AREA */}
          <div>
            <label style={labelStyle}>TEXT AREA</label>
            <textarea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              rows={5}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label style={labelStyle}>FILE</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              style={{
                border: `2px dashed ${dragOver ? "#0077a2" : "#c5d5e5"}`,
                borderRadius: 8,
                padding: "28px 16px",
                textAlign: "center",
                background: dragOver ? "#eaf4f8" : "#fafcfe",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <Upload size={28} color="#0077a2" style={{ marginBottom: 8 }} />
              <p style={{ fontSize: 12, color: "#607080", marginBottom: 12 }}>
                {fileName ?? "Σύρετε τα αρχεία εδώ για να ξεκινήσετε τη μεταφόρτωση"}
              </p>
              <button
                type="button"
                style={{ background: "#0077a2", color: "#fff", border: "none",
                         borderRadius: 6, padding: "7px 18px", fontSize: 12,
                         fontWeight: 600, cursor: "pointer",
                         fontFamily: "'Open Sans', sans-serif" }}
              >
                Αναζήτηση αρχείων
              </button>
              <input id="fileInput" type="file" style={{ display: "none" }}
                     onChange={handleFileChange} />
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div style={{ borderTop: "1px solid #dde3ea", paddingTop: 20, marginTop: 4 }}>
            <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700,
                        letterSpacing: 1.5, color: "#3a5068", marginBottom: 14 }}>
              ΠΛΗΡΩΜΕΣ
            </p>

            {/* Payment input + button */}
            <div>
              <label style={labelStyle}>PAYMENT <Req /></label>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <input
                    type="text"
                    value={paymentAmount}
                    readOnly
                    style={{ ...inputStyle, paddingRight: 28, color: "#1a2d3d" }}
                  />
                  <span style={{ position: "absolute", right: 10, top: "50%",
                                 transform: "translateY(-50%)", color: "#8090a0",
                                 fontSize: 13 }}>€</span>
                </div>
                <button
                  style={{ background: "#0077a2", color: "#fff", border: "none",
                           borderRadius: 6, padding: "8px 20px", fontSize: 12,
                           fontWeight: 700, letterSpacing: 1, cursor: "pointer",
                           fontFamily: "'Open Sans', sans-serif" }}
                >
                  ΠΛΗΡΩΜΗ
                </button>
              </div>
            </div>

            {/* Paid status */}
            <div style={{ marginTop: 12 }}>
              <label style={labelStyle}>PAYMENT <Req /></label>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                            background: paid ? "#eaf4f8" : "#fff3e0",
                            border: `1px solid ${paid ? "#0077a2" : "#e07b00"}`,
                            borderRadius: 6, padding: "10px 14px" }}>
                <span style={{ fontSize: 12, fontWeight: 700,
                               color: paid ? "#0077a2" : "#e07b00", letterSpacing: 1 }}>
                  {paid ? "ΠΛΗΡΩΘΗΚΕ" : "ΕΚΚΡΕΜΕΙ"}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a2d3d" }}>
                  {paymentAmount} €
                </span>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12,
                        marginTop: 12, paddingBottom: 24 }}>
            <button style={btnSecondary} onClick={() => navigate(-1)}>Πίσω</button>
            <button style={btnPrimary}>Υποβολή</button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Shared styles ──────────────────────────────

function Req() {
  return <span style={{ color: "#e53935" }}> *</span>;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.2,
  color: "#3a5068",
  marginBottom: 6,
  textTransform: "uppercase",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1.5px solid #c5d5e5",
  borderRadius: 6,
  fontSize: 13,
  fontFamily: "'Open Sans', sans-serif",
  color: "#1a2d3d",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const btnPrimary: React.CSSProperties = {
  background: "#0077a2",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "9px 32px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Open Sans', sans-serif",
};

const btnSecondary: React.CSSProperties = {
  background: "#fff",
  color: "#3a5068",
  border: "1.5px solid #c5d5e5",
  borderRadius: 6,
  padding: "9px 32px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Open Sans', sans-serif",
};