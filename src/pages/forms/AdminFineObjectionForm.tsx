import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import HeaderTitle from "../../ui/HeaderTitle";
import "../../styles/NewRequest.css";
import "./DisabledFeeReturnForm.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";


const VIOLATION_TYPES = [
  { id: "parking_r69", label: "Για παράβαση ελεγχόμενης στάθμευσης (Ρ-69)" },
  { id: "kok", label: "Για λοιπές παραβάσεις Κ.Ο.Κ." },
  { id: "traffic_info", label: "Για απόδοση στοιχείων κυκλοφορίας" },
  { id: "regulatory", label: "Για Κανονιστικές Αποφάσεις" },
  { id: "smoking_pets", label: "Αντικαπνιστικός νόμος / Ζώα Συντροφιάς" },
];

interface FormFields {
  violation_types: string[];
  violation_number: string;
  violation_date: string;
  vehicle_number: string;
  last_name: string;
  first_name: string;
  father_name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email_reply: boolean;
  email: string;
  reason: string;
  note1: string;
  note2: string;
}

export default function ViolationObjectionForm() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const [fields, setFields] = useState<FormFields>({
    violation_types: [],
    violation_number: "",
    violation_date: "",
    vehicle_number: "",
    last_name: "", 
    first_name: "",
    father_name: "",
    address: "",
    city: "",
    postal_code: "",
    phone: "",
    email_reply: false,
    email: "",
    reason: "",
    note1: "",
    note2: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (!user) return;
    setFields((prev) => ({
      ...prev,
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.mail ?? "",
      phone: String(user.phone ?? ""),
      address: user.address ?? "",
    }));
  }, [user]);


  const handleChange = (key: keyof FormFields, value: any) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleCheckbox = (id: string) => {
    setFields((prev) => ({
      ...prev,
      violation_types: prev.violation_types.includes(id)
        ? prev.violation_types.filter((v) => v !== id)
        : [...prev.violation_types, id],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fields.last_name.trim()) newErrors.last_name = "Υποχρεωτικό";
    if (!fields.first_name.trim()) newErrors.first_name = "Υποχρεωτικό";
    if (!fields.violation_number.trim()) newErrors.violation_number = "Υποχρεωτικό";
    if (!fields.violation_date.trim()) newErrors.violation_date = "Υποχρεωτικό";
    if (!fields.vehicle_number.trim()) newErrors.vehicle_number = "Υποχρεωτικό";
    if (!fields.address.trim()) newErrors.address = "Υποχρεωτικό";
    if (!fields.city.trim()) newErrors.city = "Υποχρεωτικό";
    if (!fields.phone.trim()) newErrors.phone = "Υποχρεωτικό";
    if (fields.email_reply && !fields.email.trim()) newErrors.email = "Υποχρεωτικό";
    if (fields.violation_types.length === 0) newErrors.violation_types = "Επιλέξτε τουλάχιστον έναν τύπο";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!isDraft && !validate()) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("request_type", "violation_objection");
      formData.append("is_draft", isDraft ? "1" : "0");

      fields.violation_types.forEach((v) => formData.append("fields[violation_types][]", v));
      formData.append("fields[violation_number]", fields.violation_number);
      formData.append("fields[violation_date]", fields.violation_date);
      formData.append("fields[vehicle_number]", fields.vehicle_number);
      formData.append("fields[last_name]", fields.last_name);
      formData.append("fields[first_name]", fields.first_name);
      formData.append("fields[father_name]", fields.father_name);
      formData.append("fields[address]", fields.address);
      formData.append("fields[city]", fields.city);
      formData.append("fields[postal_code]", fields.postal_code);
      formData.append("fields[phone]", fields.phone);
      formData.append("fields[email_reply]", fields.email_reply ? "1" : "0");
      formData.append("fields[email]", fields.email);
      formData.append("fields[reason]", fields.reason);
      formData.append("fields[note1]", fields.note1);
      formData.append("fields[note2]", fields.note2);

      const res = await fetch("https://aitimata-admin.dotsoft.gr/api/test", {
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
        <HeaderTitle title="Αίτηση – Ένσταση" type="new-request" />
      </div>

      <div className="form-container">

        {/* Violation types */}
        <div className="form-section">
          <h3 className="form-section-title">Τύπος Αίτησης</h3>
          {errors.violation_types && <span className="form-error">{errors.violation_types}</span>}
          <div className="form-checkboxes">
            {VIOLATION_TYPES.map((v) => (
              <label key={v.id} className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={fields.violation_types.includes(v.id)}
                  onChange={() => handleCheckbox(v.id)}
                />
                {v.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-sections-grid">
          {/* Personal info */}
          <div className="form-section">
            <h3 className="form-section-title">Στοιχεία Αιτούντα</h3>
            <div className="form-grid-2">
              {[
                { key: "last_name", label: "Επώνυμο", required: true, readOnly: true },
                { key: "first_name", label: "Όνομα", required: true, readOnly: true },
                { key: "father_name", label: "Όν. Πατρός", required: false, readOnly: true },
                { key: "phone", label: "Τηλέφωνο", required: true, readOnly: true },
                { key: "postal_code", label: "Τ.Κ.", required: false, readOnly: true },
                { key: "city", label: "Πόλη", required: true, readOnly: true },
              ].map(({ key, label, required, readOnly }) => (
                <div key={key} className="form-field">
                  <label className="form-label">
                    {label} {required && <span className="form-required">*</span>}
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors[key] ? "form-input--error" : ""} ${readOnly ? "form-input--readonly" : ""}`}
                    value={fields[key as keyof FormFields] as string}
                    onChange={(e) => !readOnly && handleChange(key as keyof FormFields, e.target.value)}
                    readOnly={readOnly}
                    placeholder={readOnly ? "" : `Εισάγετε ${label.toLowerCase()}`}
                  />
                  {errors[key] && <span className="form-error">{errors[key]}</span>}
                </div>
              ))}
            </div>

            <div className="form-field">
              <label className="form-label">Δ/νση <span className="form-required">*</span></label>
              <input
                type="text"
                className={`form-input ${errors.address ? "form-input--error" : ""}`}
                value={fields.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Εισάγετε διεύθυνση"
              />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>

            <div className="form-field">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={fields.email_reply}
                  onChange={(e) => handleChange("email_reply", e.target.checked)}
                />
                Επιθυμώ απάντηση ηλεκτρονικά
              </label>
            </div>

            {fields.email_reply && (
              <div className="form-field">
                <label className="form-label">e-mail <span className="form-required">*</span></label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "form-input--error" : ""}`}
                  value={fields.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Εισάγετε email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            )}
          </div>

          {/* Violation info */}
          <div className="form-section">
            <h3 className="form-section-title">Στοιχεία Παράβασης</h3>

            <div className="form-field">
              <label className="form-label">Αρ. Παράβασης <span className="form-required">*</span></label>
              <input
                type="text"
                className={`form-input ${errors.violation_number ? "form-input--error" : ""}`}
                value={fields.violation_number}
                onChange={(e) => handleChange("violation_number", e.target.value)}
                placeholder="Αριθμός παράβασης"
              />
              {errors.violation_number && <span className="form-error">{errors.violation_number}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Ημ/νία Παράβασης <span className="form-required">*</span></label>
              <input
                type="date"
                className={`form-input ${errors.violation_date ? "form-input--error" : ""}`}
                value={fields.violation_date}
                onChange={(e) => handleChange("violation_date", e.target.value)}
              />
              {errors.violation_date && <span className="form-error">{errors.violation_date}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Αρ. Κυκλοφορίας <span className="form-required">*</span></label>
              <input
                type="text"
                className={`form-input ${errors.vehicle_number ? "form-input--error" : ""}`}
                value={fields.vehicle_number}
                onChange={(e) => handleChange("vehicle_number", e.target.value)}
                placeholder="ΑΒΓ-1234"
              />
              {errors.vehicle_number && <span className="form-error">{errors.vehicle_number}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Αιτιολογία</label>
              <textarea
                className="form-input form-textarea"
                value={fields.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                placeholder="Παρακαλώ όπως κάνετε δεκτή την αίτηση - ένστασή μου διότι..."
                rows={4}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Επισυνάπτονται/Παρατηρήσεις 1</label>
              <input
                type="text"
                className="form-input"
                value={fields.note1}
                onChange={(e) => handleChange("note1", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Επισυνάπτονται/Παρατηρήσεις 2</label>
              <input
                type="text"
                className="form-input"
                value={fields.note2}
                onChange={(e) => handleChange("note2", e.target.value)}
              />
            </div>
          </div>
        </div>

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

        <div className="form-actions">
          <button type="button" className="form-btn form-btn--secondary" onClick={() => navigate(-1)}>
            ΑΚΥΡΩΣΗ
          </button>
          <button type="button" className="form-btn form-btn--draft" disabled={submitting} onClick={() => handleSubmit(true)}>
            ΑΠΟΘΗΚΕΥΣΗ ΠΡΟΧΕΙΡΟΥ
          </button>
          <button type="button" className="form-btn form-btn--primary" disabled={submitting} onClick={() => handleSubmit(false)}>
            {submitting ? "ΥΠΟΒΟΛΗ..." : "ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ"}
          </button>
        </div>
      </div>
    </div>
  );
}