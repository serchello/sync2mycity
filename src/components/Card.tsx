import type { CardItem } from "../constants/data";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";

interface Props {
  card: CardItem;
  index: number;
}

export default function Card({ card, index }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d9e1e8",
        borderRadius: 10,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 145,
        height: "100%",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        animation: "fadeUp 0.35s ease both",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* TOP */}
      <div>
        <div style={{ marginTop: 2,display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 12, minHeight: 18,}}>
          {/* LEFT */}
          <div style={{ flex: 1, minWidth: 0}}>
            <div style={{ fontSize: 16, fontWeight: 600,color: "#1d232f", lineHeight: 1.3,marginBottom: 6}}>
              {card.title}
            </div>
          </div>
          <StatusBadge status={card.status} />
        </div>

        {/* META */}
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, minHeight: 22}}>
          {/* LEFT SIDE */}
          <div style={{ display:"flex",alignItems:"center",gap: 8,flexWrap:"wrap", minWidth: 0}}>
            {card.amount && (
              <span style={{ fontSize: 14,fontWeight: 700,color: "#1d232f" }}>
                {card.amount}
              </span>
            )}

            {card.deadline && (
              <span style={{ fontSize: 14, color: "#252830BF"}}>
                Προθεσμία {card.deadline}
              </span>
            )}

            <div style={{ fontSize: 14, color: "#7c8795", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
              {card.description || ""}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", alignItems: "center",gap: 10,flexShrink: 0}} >
            {card.ref && (
              <span style={{ fontSize: 14,color: "#7d8794",fontFamily: "monospace",whiteSpace: "nowrap"}}>
                {card.ref}
              </span>
            )}


          </div>

          {card.submittedLabel && (
            <span style={{ fontSize: 14, color: "#4d5560", whiteSpace: "nowrap", flexShrink: 0 }}>
              {card.submittedLabel} {card.date}
            </span>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <div style={{ marginTop: 14, width: "34%", minWidth: 96}}>
        <ActionButton type={card.action} />
      </div>
    </div>
  );
}