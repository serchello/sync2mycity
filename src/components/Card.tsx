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
      className="card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div>
        <div className="card-top">
          <div className="card-title-wrap">
            <div className="card-title">{card.title}</div>
          </div>

          <StatusBadge status={card.status} />
        </div>

        <div className="card-meta">
          <div className="card-meta-left">
            {card.amount && (
              <span className="card-amount">{card.amount}</span>
            )}

            {card.deadline && (
              <span className="card-deadline">
                Προθεσμία {card.deadline}
              </span>
            )}

            <div className="card-description">
              {card.description || ""}
            </div>
          </div>

          <div className="card-meta-right">
            {card.ref && <span className="card-ref">{card.ref}</span>}

            {card.submittedLabel && (
              <span className="card-submitted">
                {card.submittedLabel} {card.date}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card-action">
        <ActionButton type={card.action} />
      </div>
    </div>
  );
}