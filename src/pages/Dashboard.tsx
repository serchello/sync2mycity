import { CARDS } from "../constants/data";
import Card from "../components/Card";
import { CirclePlus } from "lucide-react";
import HeaderTitle from "../ui/HeaderTitle";
import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <div className="main-content">
      <div className="dashboard-header">
        <HeaderTitle title="Τελευταίες Ενημερώσεις" type="dashboard" />

        <Link to="/new-request" className="new-request-btn">
          <CirclePlus size={18} strokeWidth={2} />
          Νέα Αίτηση
        </Link>
      </div>

      <div className="cards-grid">
        {CARDS.map((card, i) => (
          <Card key={card.ref || card.title} card={card} index={i} />
        ))}
      </div>

      <div className="more-wrap">
        <a href="#" className="more-link">
          Περισσότερα
        </a>
      </div>
    </div>
  );
}