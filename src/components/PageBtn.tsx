interface Props {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

export default function PageBtn({ label, onClick, active, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30,
        border: active ? "none" : "1px solid #dde3ea",
        borderRadius: 6,
        background: active ? "#0077a2" : "#fff",
        color: active ? "#fff" : disabled ? "#c5d5e5" : "#3a5068",
        fontSize: 12, fontWeight: 600,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "'Open Sans', sans-serif",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}