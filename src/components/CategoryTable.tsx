import { useState } from "react";
import { CategoryClass } from "../data/kantArchiveData";

interface CategoryTableProps {
  categories: CategoryClass[];
  isStructureAwakened?: boolean;
}

export function CategoryTable({
  categories,
  isStructureAwakened = false,
}: CategoryTableProps) {
  const [activeColId, setActiveColId] = useState<string | null>(null);

  return (
    <div
      className={`category-grid ${
        isStructureAwakened ? "structure-highlight" : ""
      }`}
      role="region"
      aria-label="Tafel der Categorien (1781)"
    >
      {categories.map((cat) => {
        const isHovered = activeColId === cat.id;
        const isAwakened = isHovered || isStructureAwakened;

        return (
          <div
            key={cat.id}
            tabIndex={0}
            className={`category-col ${isAwakened ? "is-awakened" : ""}`}
            onPointerEnter={() => setActiveColId(cat.id)}
            onPointerLeave={() => setActiveColId(null)}
            onFocus={() => setActiveColId(cat.id)}
            onBlur={() => setActiveColId(null)}
            aria-label={`${cat.numeral}. ${cat.germanTitle} (${cat.englishTitle})`}
          >
            <div className="category-col__head">
              <div className="category-col__numeral">{cat.numeral}</div>
              <h3 className="category-col__title">{cat.germanTitle}</h3>
              <div className="category-col__subtitle">{cat.englishTitle}</div>
              <div className="category-col__rule" />
              <div className="category-col__judgement" title="Korrespondierende Urteilsform">
                <span style={{ fontFeatureSettings: "'smcp' 1", color: "var(--accent)" }}>
                  Judicium:
                </span>{" "}
                {cat.judgementForm}
              </div>
            </div>

            <ul className="category-moments">
              {cat.moments.map((moment, idx) => (
                <li
                  key={moment.id}
                  className="category-moment-item"
                  style={{
                    transform: isAwakened
                      ? `translateY(-${3 + idx}px)`
                      : "translateY(0px)",
                  }}
                >
                  <span className="category-moment-num">{moment.num}</span>
                  <div className="category-moment-german">{moment.german}</div>
                  <div className="category-moment-english">{moment.english}</div>
                  <div className="category-moment-note">{moment.schemaNote}</div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
