export type ActionType = "view" | "pay";

export type Status =
  | "Completed"
  | "Pending Payment"
  | "Paid"
  | "Submitted"
  | "Rejected";

export interface NavItem {
  label: string;
  badge: number | null;
}

export interface CardItem {
  title: string;
  status: Status;
  description?: string;
  amount?: string;
  deadline?: string;
  ref?: string;
  submittedLabel?: string;
  date?: string;
  action: ActionType;
}

export interface StatusStyle {
  bg: string;
  color: string;
  label: string;
}

// ─────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "Νέα Αίτηση",    badge: null },
  { label: "Αρχική",         badge: null },
  { label: "Πιστοποιητικά", badge: null },
  { label: "Οφειλές",       badge: 1    },
  { label: "Βεβαιώσεις",    badge: null },
];

export const STATUS_CONFIG: Record<Status, StatusStyle> = {
  Completed:         { bg: "#2e7d32", color: "#fff", label: "Completed" },
  "Pending Payment": { bg: "#e65100", color: "#fff", label: "Pending Payment" },
  Paid:              { bg: "#1b5e20", color: "#fff", label: "Paid" },
  Submitted:         { bg: "#1565c0", color: "#fff", label: "Submitted" },
  Rejected:          { bg: "#b71c1c", color: "#fff", label: "Rejected" },
};

export const CARDS: CardItem[] = [
  {
    title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
    status: "Completed",
    description: "Η κατάσταση άλλαξε.",
    submittedLabel: "Υποβλήθηκε",
    date: "20.12.2025 - 12:46",
    action: "view",
  },
  {
    title: "Τέλη κατάληψης κοινοχρήστων χώρων",
    status: "Pending Payment",
    amount: "258.63 €",
    deadline: "20.12.2025",
    ref: "RF231862850275937501875992",
    action: "pay",
  },
  {
    title: "Τέλη διαφήμισης",
    status: "Paid",
    amount: "87.62 €",
    deadline: "20.12.2025",
    submittedLabel: "Υποβλήθηκε",
    date: "20.12.2025 - 12:46",
    action: "view",
  },
  {
    title: "Δημοτικά τέλη",
    status: "Submitted",
    amount: "19.28€",
    deadline: "20.12.2025",
    submittedLabel: "Υποβλήθηκε",
    date: "20.12.2025 - 12:46",
    action: "view",
  },
  {
    title: "Ένσταση για πρόστιμο στάθμευσης",
    status: "Rejected",
    description: "Η κατάσταση άλλαξε.",
    submittedLabel: "Υποβλήθηκε",
    date: "20.12.2025 - 12:46",
    action: "view",
  },
  {
    title: "Ακαθάριστα έσοδα",
    status: "Pending Payment",
    amount: "47.17 €",
    deadline: "20.12.2025",
    ref: "RF231862850275937501875992",
    action: "pay",
  },
];