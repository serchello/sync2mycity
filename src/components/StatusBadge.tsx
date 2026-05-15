import { STATUS_CONFIG, type Status } from "../constants/data";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        borderRadius: 20,
        padding: "5px 10px",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
        height: 32
      }}
    >
      {cfg.label}
    </span>
  );
}