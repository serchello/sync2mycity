import "./ActionButton.css";

export type ActionButtonType = "view" | "update" | "pay" | "receipt";

interface Props {
  type: ActionButtonType;
  onClick?: () => void;
}

export default function ActionButton({ type, onClick }: Props) {
  const label =
    type === "pay"
      ? "ΠΛΗΡΩΜΗ"
      : type === "update"
      ? "ΕΝΗΜΕΡΩΣΗ"
      : type === "receipt"
      ? "ΑΠΟΔΕΙΞΗ"
      : "ΠΡΟΒΟΛΗ";

  return (
    <button
      type="button"
      className={`action-btn action-btn--${type}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}