import type { ActionType } from "../constants/data";

interface Props {
  type: ActionType;
}

export default function ActionButton({ type }: Props) {
  const isPayment = type === "pay";

  return (
    <button
      style={{
        background: isPayment ? "#0077A2" : "transparent",
        color: isPayment ? "#fff" : "#0077A2",
        border: isPayment ? "none" : "1.5px solid #0077A2",
        borderRadius: 6,
        padding: "5px 25px",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        letterSpacing: 1.5,
        marginTop: 10,
        transition: "opacity 0.18s",
        width: "150px",
        height: "32px"

      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {isPayment ? "ΠΛΗΡΩΜΗ" : "ΠΡΟΒΟΛΗ"}
    </button>
  );
}