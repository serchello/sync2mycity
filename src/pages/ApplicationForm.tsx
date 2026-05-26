import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LayoutPanelLeft, Upload } from "lucide-react";
import HeaderTitle from "../ui/HeaderTitle";
import ActionButton from "../components/ActionButton";
import "../styles/ApplicationForm.css";


export default function ApplicationForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [textField, setTextField] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [date, setDate] = useState("2026-05-23");
  const [dateRangeFrom, setDateRangeFrom] = useState("2026-05-22");
  const [dateRangeTo, setDateRangeTo] = useState("2026-05-23");
  const [checkbox, setCheckbox] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const paymentAmount = "172.97";
  const paid = true;

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };



  return (
    <div className="main-content">
      <div className="application-form">
        <div className="application-form__header">
          <HeaderTitle title="Αίτηση Ειδικής Άδειας Στάθμευσης" type="default" />

          <button type="button" className="application-form__layout-btn">
            <LayoutPanelLeft size={18} />
          </button>
        </div>

        <div className="application-form__description">
          <p>
            Απαιτείται να δωρηθεί βεβαίωση ενός οικισμού κοινοποιηστικού στο
            πλαίσιο του υποέργου &ldquo;Διαχείριση Βιοαποβλήτων Δήμου
            Σπάτα&rdquo; το υλικό έχει εντοπιστεί στο ΕΠΙΧΕΙΡΗΣΙΑΚΟ ΠΡΟΓΡΑΜΜΑ
            &ldquo;ΥΠΟΔΟΜΕΣ ΜΕΤΑΦΟΡΩΝ, ΠΕΡΙΒΑΛΛΟΝ ΚΑΙ ΑΕΙΦΟΡΟΣ ΑΝΑΠΤΥΞΗ
            2014-2020&rdquo; και με κωδικό ΟΠΣ: 5079510.
          </p>

          <p className="application-form__description-title">
            Ακολουθείτε τις εξής υποχρεώσεις:
          </p>

          <ul>
            <li>
              Την εκδίωξη για τη σωστή λεπτομέρεια του καθένα σύμφωνα με τις
              οδηγίες του Δήμου.
            </li>
            <li>
              Την τοποθέτηση του πλαίσιο σε κατάλληλο χώρο βολικά σε γνωστό
              εδαφών με δυνατότητα αποφυγής των εμποδίων.
            </li>
            <li>
              Την επιβεβαίωση να αποπέψει στην εκπρόσωπο του Δήμου να επαλείψει
              το είδος έτσια από σχετική εκτέλεση.
            </li>
          </ul>

          <p className="application-form__note">
            Ο Δήμος βεβαιώνει ότι θα κρατείται για την επιστροφή του σκύβαλου
            κόστος κατά την επιλέξιμη δεσμευτικής συνεργαζόμενης εταιρίας χρήσεις
            αδικαιολόγητα από μέρους του χρήστη.
          </p>
        </div>

        <form className="application-form__fields">
          <FormField label="TEXTFIELD" required>
            <input
              className="form-control"
              type="text"
              placeholder="Text text text"
              value={textField}
              onChange={(event) => setTextField(event.target.value)}
            />
          </FormField>

          <FormField label="DROPDOWN" required>
            <div className="form-control-wrap">
              <select
                className={`form-control form-control--select ${
                  dropdown ? "" : "form-control--placeholder"
                }`}
                value={dropdown}
                onChange={(event) => setDropdown(event.target.value)}
              >
                <option value="" disabled>
                  Selection
                </option>
                <option value="opt1">Επιλογή 1</option>
                <option value="opt2">Επιλογή 2</option>
                <option value="opt3">Επιλογή 3</option>
              </select>

              <ChevronDown size={16} className="form-control-icon" />
            </div>
          </FormField>

          <FormField label="DATE" required>
            <input
              className="form-control form-control--date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </FormField>

          <FormField label="DATE RANGE" required>
            <DateRange
              from={dateRangeFrom}
              to={dateRangeTo}
              onFromChange={setDateRangeFrom}
              onToChange={setDateRangeTo}
            />
          </FormField>

          <FormField
            label="DATE RANGE"
            required
            hint="this is the description that comes with the element, below the component, italic, lowercase text"
          >
            <DateRange
              from={dateRangeFrom}
              to={dateRangeTo}
              onFromChange={setDateRangeFrom}
              onToChange={setDateRangeTo}
            />
          </FormField>

          <FormField label="CHECKBOX">
            <input
              className="form-checkbox"
              type="checkbox"
              checked={checkbox}
              onChange={(event) => setCheckbox(event.target.checked)}
            />
          </FormField>

          <FormField label="TEXT AREA">
            <textarea
              className="form-control form-textarea"
              value={textArea}
              onChange={(event) => setTextArea(event.target.value)}
              rows={5}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            />
          </FormField>

          <FormField label="FILE">
            <div
              className={`file-upload ${dragOver ? "file-upload--active" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={28} />

              <p>
                {fileName ??
                  "Σύρετε τα αρχεία εδώ για να ξεκινήσετε τη μεταφόρτωση"}
              </p>

              <button type="button" className="file-upload__btn">
                Αναζήτηση αρχείων
              </button>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </div>
          </FormField>

          <div className="payment-section">
            <p className="payment-section__title">ΠΛΗΡΩΜΕΣ</p>

            <FormField label="PAYMENT" required>
              <div className="payment-row">
                <div className="form-control-wrap payment-input">
                  <input
                    className="form-control"
                    type="text"
                    value={paymentAmount}
                    readOnly
                  />

                  <span className="form-control-currency">€</span>
                </div>

                <ActionButton type="pay" />
              </div>
            </FormField>

            <FormField label="PAYMENT" required>
              <div
                className={`payment-status ${
                  paid ? "payment-status--paid" : "payment-status--pending"
                }`}
              >
                <span>{paid ? "ΠΛΗΡΩΘΗΚΕ" : "ΕΚΚΡΕΜΕΙ"}</span>
                <strong>{paymentAmount} €</strong>
              </div>
            </FormField>
          </div>

          <div className="application-form__footer">
            <button
              type="button"
              className="form-btn form-btn--secondary"
              onClick={() => navigate(-1)}
            >
              Πίσω
            </button>

            <button type="submit" className="form-btn form-btn--primary">
              Υποβολή
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span> *</span>}
      </label>

      {hint && <p className="form-hint">{hint}</p>}

      {children}
    </div>
  );
}

function DateRange({
  from,
  to,
  onFromChange,
  onToChange,
}: {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}) {
  const handleFromChange = (value: string) => {
    onFromChange(value);

    if (to && value > to) {
      onToChange(value);
    }
  };

  const handleToChange = (value: string) => {
    onToChange(value);

    if (from && value < from) {
      onFromChange(value);
    }
  };

  return (
    <div className="date-range">
      <input
        className="form-control form-control--date"
        type="date"
        value={from}
        max={to || undefined}
        onChange={(event) => handleFromChange(event.target.value)}
      />

      <span>→</span>

      <input
        className="form-control form-control--date"
        type="date"
        value={to}
        min={from || undefined}
        onChange={(event) => handleToChange(event.target.value)}
      />
    </div>
  );
}
