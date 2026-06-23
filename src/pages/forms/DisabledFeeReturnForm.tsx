import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import HeaderTitle from "../../ui/HeaderTitle";
import "../../styles/NewRequest.css";
import "./DisabledFeeReturnForm.css";

const ATTACHMENTS = [
  { id: "utility_bill", label: "Λογαριασμός Ηλεκτρικού Ρεύματος (και οι δύο όψεις)", required: true },
  { id: "bank_book", label: "Πρώτη σελίδα βιβλιαρίου τράπεζας (με IBAN)", required: true },
  { id: "disability_cert", label: "Πιστοποιητικό Αναπηρίας", required: true },
  { id: "e1_declaration", label: "Δήλωση Φορολογίας Εισοδήματος Ε1 (εφόσον μετρητής σε άλλο όνομα)", required: false },
  { id: "family_status_cert", label: "Πιστοποιητικό Οικογενειακής Κατάστασης (εφόσον μετρητής σε άλλο όνομα)", required: false },
];

interface FormFields {
  KEY1: string;
  KEY2: string;
  field_citizen_afm: string;
  KEY4: string;
  KEY5: string;
  KEY6: string;
}


interface FileMap {
  [key: string]: File | null;
}

export default function DisabledFeeReturnForm() {
  const navigate = useNavigate();

  const [fields, setFields] = useState<FormFields>({
    KEY1: "", KEY2: "", field_citizen_afm: "", KEY4: "", KEY5: "", KEY6: "",
  });

  const [files, setFiles] = useState<FileMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFieldChange = (key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (id: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fields.KEY1.trim()) newErrors.KEY1 = "Το πεδίο είναι υποχρεωτικό";
    if (!fields.KEY2.trim()) newErrors.KEY2 = "Το πεδίο είναι υποχρεωτικό";

    ATTACHMENTS.forEach((a) => {
      if (a.required && !files[a.id]) {
        newErrors[a.id] = "Το αρχείο είναι υποχρεωτικό";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!isDraft && !validate()) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("request_type", "disabled_fee_return");
      formData.append("is_draft", isDraft ? "1" : "0");
      formData.append("fields[KEY1]", fields.KEY1);
      formData.append("fields[KEY2]", fields.KEY2);

      ATTACHMENTS.forEach((a) => {
        if (files[a.id]) {
          formData.append(`attachments[${a.id}]`, files[a.id] as File);
        }
      });

      const res = await fetch("https://aitimata-admin.dotsoft.gr/api/vevaioseis_docutracks_petition/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setSubmitStatus("success");
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="main-content">
      <div className="request-header">
        <HeaderTitle title="Επιστροφή Τέλους Αναπηρίας" type="new-request" />
      </div>

      <div className="form-container">
<div className="form-sections-grid">
        {/* Fields */}
        <div className="form-section">
          <h3 className="form-section-title">Στοιχεία Αίτησης</h3>

          <div className="form-grid-2">
            {[
              { key: "KEY1", label: "Όνομα" },
              { key: "KEY2", label: "Επίθετο" },
              { key: "field_citizen_afm", label: "ΑΦΜ" },
              { key: "KEY4", label: "ΑΜΚΑ" },
              { key: "KEY5", label: "Τηλέφωνο" },
              { key: "KEY6", label: "Email" },
            ].map(({ key, label }) => (
              <div key={key} className="form-field">
                <label className="form-label">
                  {label} <span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors[key] ? "form-input--error" : ""}`}
                  value={fields[key as keyof FormFields]}
                  onChange={(e) => handleFieldChange(key as keyof FormFields, e.target.value)}
                  placeholder={`Εισάγετε ${label.toLowerCase()}`}
                />
                {errors[key] && <span className="form-error">{errors[key]}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Attachments */}
        <div className="form-section">
          <h3 className="form-section-title">Συνημμένα Έγγραφα</h3>

          {ATTACHMENTS.map((a) => (
            <div key={a.id} className="form-field">
              <label className="form-label">
                {a.label}
                {a.required && <span className="form-required"> *</span>}
              </label>

              <div
                className={`form-upload ${errors[a.id] ? "form-upload--error" : ""} ${files[a.id] ? "form-upload--filled" : ""}`}
                onClick={() => fileRefs.current[a.id]?.click()}
              >
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  ref={(el) => { fileRefs.current[a.id] = el; }}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(a.id, e.target.files?.[0] ?? null)}
                />

                {files[a.id] ? (
                  <div className="form-upload-filled">
                    <CheckCircle size={16} color="#059669" />
                    <span>{files[a.id]!.name}</span>
                    <button
                      type="button"
                      className="form-upload-remove"
                      onClick={(e) => { e.stopPropagation(); handleFileChange(a.id, null); }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="form-upload-placeholder">
                    <Upload size={16} />
                    <span>Επιλογή αρχείου (PDF, JPG, PNG)</span>
                  </div>
                )}
              </div>

              {errors[a.id] && <span className="form-error">{errors[a.id]}</span>}
            </div>
          ))}
        </div>
</div>
        {/* Status */}
        {submitStatus === "success" && (
          <div className="form-status form-status--success">
            <CheckCircle size={18} />
            <span>Η αίτηση υποβλήθηκε επιτυχώς!</span>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="form-status form-status--error">
            <AlertCircle size={18} />
            <span>Σφάλμα κατά την υποβολή. Δοκιμάστε ξανά.</span>
          </div>
        )}

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="form-btn form-btn--secondary"
            onClick={() => navigate(-1)}
          >
            ΑΚΥΡΩΣΗ
          </button>
          <button
            type="button"
            className="form-btn form-btn--draft"
            disabled={submitting}
            onClick={() => handleSubmit(true)}
          >
            ΑΠΟΘΗΚΕΥΣΗ ΠΡΟΧΕΙΡΟΥ
          </button>
          <button
            type="button"
            className="form-btn form-btn--primary"
            disabled={submitting}
            onClick={() => handleSubmit(false)}
          >
            {submitting ? "ΥΠΟΒΟΛΗ..." : "ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ"}
          </button>
        </div>

      </div>
    </div>
  );
}