import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../ui/HeaderTitle";
import ActionButton, { type ActionButtonType } from "../components/ActionButton";
import "../styles/Debts.css";

type DebtStatus =
  | "Paid"
  | "Submitted"
  | "In Progress"
  | "Pending Info"
  | "Pending Payment";

interface DebtItem {
  id: string;
  type: string;
  deadline: string;
  amount: string;
  amountHighlight?: boolean;
  ref: string;
  status: DebtStatus;
  action: Extract<ActionButtonType, "receipt" | "view" | "pay">;
  completed?: boolean;
}

const ALL_ITEMS: DebtItem[] = [
  {
    id: "657224",
    type: "Τέλος Φωτισμού",
    deadline: "20.12.2025",
    amount: "18.27 €",
    amountHighlight: true,
    ref: "RF231862850275937501875992",
    status: "Paid",
    action: "receipt",
    completed: true,
  },
  {
    id: "657225",
    type: "Τέλος Κυκλοφορίας",
    deadline: "20.12.2025",
    amount: "258.63 €",
    ref: "RF231862850275937501875992",
    status: "Submitted",
    action: "view",
    completed: false,
  },
  {
    id: "657226",
    type: "Δημοτικό Τέλος",
    deadline: "20.12.2025",
    amount: "28.06 €",
    ref: "RF231862850275937501875992",
    status: "In Progress",
    action: "view",
    completed: false,
  },
  {
    id: "657227",
    type: "Τέλος Στάθμευσης",
    deadline: "20.12.2025",
    amount: "71.42 €",
    ref: "RF231862850275937501875992",
    status: "Pending Info",
    action: "view",
    completed: false,
  },
  {
    id: "657228",
    type: "Τέλος Στάθμευσης",
    deadline: "20.12.2025",
    amount: "71.42 €",
    ref: "RF231862850275937501875992",
    status: "Pending Payment",
    action: "pay",
    completed: false,
  },
];

const PAGE_SIZE = 7;

const getStatusClass = (status: DebtStatus) =>
  status.toLowerCase().replace(/\s+/g, "-");

export default function Debts() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<"active" | "completed">("active");
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
  };

  const handleAction = (item: DebtItem) => {
    if (item.action === "pay") {
      console.log("Payment:", item.id);
      return;
    }

    navigate(`/debts/${item.id}`);
  };

  return (
    <div className="main-content">
      <div className="debt-header">
        
        <HeaderTitle title="Οφειλές" type="debts" />

        <div className="debt-tabs">
          {(["active", "completed"] as const).map((itemTab) => (
            <button
              key={itemTab}
              type="button"
              className={`debt-tab ${
                tab === itemTab ? "debt-tab--active" : ""
              }`}
              onClick={() => handleTabChange(itemTab)}
            >
              {itemTab === "active" ? "ΕΚΚΡΕΜΕΙΣ" : "ΕΞΟΦΛΗΜΕΝΕΣ"}
            </button>
          ))}
        </div>
      </div>

      <div className="debt-table-wrap">
        <div className="debt-table">
          <div className="debt-row debt-row--head">
            <span>ID</span>
            <span>ΕΙΔΟΣ ΤΕΛΟΥΣ</span>
            <span>ΠΡΟΘΕΣΜΙΑ</span>
            <span>ΠΟΣΟ</span>
            <span>RF</span>
            <span>ΚΑΤΑΣΤΑΣΗ</span>
            <span />
          </div>

          {paginated.length === 0 ? (
            <div className="debt-empty">Δεν υπάρχουν εγγραφές</div>
          ) : (
            paginated.map((item) => (
              <div key={item.id} className="debt-item">
                <div className="debt-row">
                  <span className="debt-id">{item.id}</span>

                  <span className="debt-type">{item.type}</span>

                  <span className="debt-deadline">
                    <span className="debt-deadline-prefix">Προθεσμία: </span>
                    {item.deadline}
                  </span>

                  <span
                    className={`debt-amount ${
                      item.amountHighlight ? "debt-amount--highlight" : ""
                    }`}
                  >
                    {item.amount}
                  </span>

                  <span className="debt-ref">{item.ref}</span>

                  <span className="debt-status-cell">
                    <span
                      className={`debt-status debt-status--${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </span>

                  <ActionButton
                    type={item.action}
                    onClick={() => handleAction(item)}
                  />
                </div>
              </div>
            ))
          )}

          <div className="debt-footer">
            <span>
              Εμφάνιση {startEntry} έως {endEntry} από {filtered.length}{" "}
              καταχωρήσεις
            </span>

            <div className="debt-pagination">
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