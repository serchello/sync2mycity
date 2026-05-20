import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../ui/HeaderTitle";
import ActionButton from "../components/ActionButton";

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

const ALL_ITEMS: CertItem[] = [
  {
    id: "657224",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Πιστοποιητικό",
    status: "Submitted",
    action: "view",
    completed: false,
  },
  {
    id: "657225",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Πιστοποιητικό",
    status: "In Progress",
    action: "view",
    completed: false,
  },
  {
    id: "657226",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Πιστοποιητικό",
    status: "Pending Info",
    action: "update",
    completed: false,
    history: [
      { time: "27 ώρες πριν", text: "Added new petition by ___ on 18.03.2026" },
      {
        time: "35 ώρες πριν",
        text: "Το αίτημα βρίσκεται σε αναμονή από τις 18.03.2026",
      },
      {
        time: "12 ώρες πριν",
        text: "Το αίτημα βρίσκεται σε αναμονή από τις 18.03.2026",
      },
      {
        time: "7 ώρες πριν",
        text: "Το αίτημα βρίσκεται σε αναμονή από τις 18.03.2026",
      },
    ],
  },
  {
    id: "657227",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Πιστοποιητικό",
    status: "Pending Payment",
    action: "pay",
    completed: false,
  },
  {
    id: "657228",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Βεβαίωση",
    status: "Paid",
    action: "view",
    completed: true,
  },
  {
    id: "657229",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Πιστοποιητικό",
    status: "Completed",
    action: "view",
    completed: true,
  },
  {
    id: "657230",
    title: "Ένσταση για Πρόστιμο Στάθμευσης",
    date: "20.12.2025 - 12:46",
    type: "Βεβαίωση",
    status: "Rejected",
    action: "view",
    completed: true,
  },
];

const PAGE_SIZE = 7;

const getStatusClass = (status: StatusType) =>
  status.toLowerCase().replace(/\s+/g, "-");

export default function Certificates() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<"active" | "completed">("active");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered = ALL_ITEMS.filter((item) =>
    tab === "active" ? !item.completed : item.completed
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const startEntry = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(page * PAGE_SIZE, filtered.length);

  const handleTabChange = (nextTab: "active" | "completed") => {
    setTab(nextTab);
    setPage(1);
    setExpandedIndex(null);
  };

  const handleAction = (item: CertItem, globalIndex: number) => {
    if (item.action === "update") {
      setExpandedIndex(expandedIndex === globalIndex ? null : globalIndex);
      return;
    }

    if (item.action === "view") {
      navigate(`/certificates/${item.id}`);
      return;
    }

    if (item.action === "pay") {
      console.log("Payment:", item.id);
    }
  };

  return (
    <div className="main-content">
      <div className="cert-header">
        <HeaderTitle title="Πιστοποιητικά" type="certificates" />

        <div className="cert-tabs">
          {(["active", "completed"] as const).map((itemTab) => (
            <button
              key={itemTab}
              type="button"
              className={`cert-tab ${
                tab === itemTab ? "cert-tab--active" : ""
              }`}
              onClick={() => handleTabChange(itemTab)}
            >
              {itemTab === "active" ? "ΕΝΕΡΓΑ" : "ΟΛΟΚΛΗΡΩΜΕΝΑ"}
            </button>
          ))}
        </div>
      </div>

      <div className="cert-table-wrap">
        <div className="cert-table">
          <div className="cert-row cert-row--head">
            <span>ID</span>
            <span>ΤΙΤΛΟΣ</span>
            <span>ΗΜ/ΝΙΑ ΥΠΟΒΟΛΗΣ</span>
            <span>ΤΙΠΟΣ ΑΙΤΗΣΗΣ</span>
            <span>ΚΑΤΑΣΤΑΣΗ</span>
            <span />
          </div>

          {paginated.map((item, i) => {
            const globalIndex = (page - 1) * PAGE_SIZE + i;
            const isExpanded = expandedIndex === globalIndex;
            const mobileDate = item.date.split(" - ")[0];

            return (
              <div key={`${item.id}-${item.status}`} className="cert-item">
                <div
                  className={`cert-row ${
                    isExpanded ? "cert-row--expanded" : ""
                  }`}
                >
                  <span className="cert-id">{item.id}</span>

                  <span className="cert-title">{item.title}</span>

                  <span className="cert-date">
                    <span className="cert-date-prefix">Υποβλήθηκε: </span>
                    <span className="cert-date-full">{item.date}</span>
                    <span className="cert-date-mobile">{mobileDate}</span>
                  </span>

                  <span className="cert-type">{item.type}</span>

                  <span className="cert-status-cell">
                    <span
                      className={`cert-status cert-status--${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </span>

                  <ActionButton
                    type={item.action}
                    onClick={() => handleAction(item, globalIndex)}
                  />
                </div>

                {isExpanded && item.history && (
                  <div className="cert-history">
                    {item.history.map((historyItem, historyIndex) => (
                      <div key={historyIndex} className="cert-history-item">
                        <span className="cert-history-dot" />

                        <div>
                          <span className="cert-history-time">
                            {historyItem.time}
                          </span>
                          <p className="cert-history-text">
                            {historyItem.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="cert-footer">
            <span>
              Εμφάνιση {startEntry} έως {endEntry} από {filtered.length}{" "}
              καταχωρήσεις
            </span>

            <div className="cert-pagination">
              <PageBtn
                label="‹"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              />

              {Array.from({ length: totalPages }, (_, i) => (
                <PageBtn
                  key={i}
                  label={String(i + 1)}
                  active={page === i + 1}
                  onClick={() => setPage(i + 1)}
                />
              ))}

              <PageBtn
                label="›"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageBtn({
  label,
  onClick,
  active,
  disabled,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={`page-btn ${active ? "page-btn--active" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}