import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, Search } from "lucide-react";
import HeaderTitle from "../ui/HeaderTitle";
import "../styles/NewRequest.css";

interface RequestItem {
  id: string;
  title: string;
  description: string;
  type: string;
}

interface RequestGroup {
  category: string;
  items: RequestItem[];
}

const DATA: RequestGroup[] = [
  {
    category: "Στάθμευση",
    items: [
      {
        id: "parking-permit-1",
        title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos......",
        type: "Πιστοποιητικό",
      },
      {
        id: "parking-permit-2",
        title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
        description:
          "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
        type: "Βεβαίωση",
      },
      {
        id: "parking-objection-1",
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Πιστοποιητικό",
      },
    ],
  },
  {
    category: "Ενστάσεις",
    items: [
      {
        id: "objection-1",
        title: "Αίτηση Ειδικής Άδειας Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Βεβαίωση",
      },
      {
        id: "objection-2",
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Πιστοποιητικό",
      },
      {
        id: "objection-3",
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Πιστοποιητικό",
      },
      {
        id: "objection-4",
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Πιστοποιητικό",
      },
      {
        id: "objection-5",
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Πιστοποιητικό",
      },
      {
        id: "objection-6",
        title: "Ένσταση για Πρόστιμο Στάθμευσης",
        description:
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        type: "Πιστοποιητικό",
      },
    ],
  },
];

const ALL_CATEGORIES = [
  "Όλες",
  ...Array.from(new Set(DATA.map((group) => group.category))),
];

export default function NewRequest() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Όλες");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const normalizedSearch = search.trim().toLowerCase();

  const toggleGroup = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filtered = DATA.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const matchesSearch =
        normalizedSearch === "" ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.type.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "Όλες" || group.category === category;

      return matchesSearch && matchesCategory;
    }),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="main-content">
      <div className="request-header">
        <HeaderTitle title="Διαθέσιμες Αιτήσεις" type="new-request" />
      </div>

      <div className="request-filters">
        <div className="request-search">
          <input
            type="text"
            placeholder="ΑΝΑΖΗΤΗΣΗ"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Search size={16} />
        </div>

        <select
          className="request-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "Όλες" ? "ΚΑΤΗΓΟΡΙΑ" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="request-table-wrap">
        <div className="request-table">
          <div className="request-row request-row--head">
            <span>ΤΙΤΛΟΣ</span>
            <span>ΠΕΡΙΓΡΑΦΗ</span>
            <span>ΤΙΠΟΣ ΑΙΤΗΣΗΣ</span>
            <span />
          </div>

          {filtered.map((group, groupIndex) => {
            const groupKey = `${group.category}-${groupIndex}`;
            const isCollapsed = collapsed[groupKey];

            return (
              <div key={groupKey} className="request-group">
                <button
                  type="button"
                  className="request-group-header"
                  onClick={() => toggleGroup(groupKey)}
                >
                  <span>{group.category}</span>

                  <ChevronUp
                    size={16}
                    className={isCollapsed ? "request-chevron--collapsed" : ""}
                  />
                </button>

                {!isCollapsed &&
                  group.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="request-row request-row--body"
                      style={{ animationDelay: `${itemIndex * 0.04}s` }}
                    >
                      <span className="request-title">{item.title}</span>

                      <span className="request-description">
                        {item.description}
                      </span>

                      <span className="request-type">{item.type}</span>

                      <button
                        type="button"
                        className="request-action-btn"
                        onClick={() => navigate(`/new-request/${item.id}`)}
                      >
                        ΝΕΑ ΑΙΤΗΣΗ
                      </button>
                    </div>
                  ))}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="request-empty">Δεν βρέθηκαν αποτελέσματα</div>
          )}
        </div>
      </div>
    </div>
  );
}