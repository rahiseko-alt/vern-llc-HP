import { useState } from "react";
import type { PracticeDomain } from "../data/vernData";

interface CategoryTableProps {
  domains: PracticeDomain[];
  isStructureAwakened?: boolean;
}

/**
 * Interaction E — the Tafel der Categorien as the grid of Vern LLC's four practice domains.
 * Hovered/focused column: rules darken, three items lift a few px, notes sharpen.
 * Other columns stay fully visible for comparison.
 */
export function CategoryTable({ domains, isStructureAwakened = false }: CategoryTableProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div
      className={`category-grid ${isStructureAwakened ? "structure-highlight" : ""}`}
      role="list"
      aria-label="Vern LLC 四つの実践領域"
    >
      {domains.map((d) => {
        const awake = activeId === d.id || isStructureAwakened;
        return (
          <div
            key={d.id}
            role="listitem"
            tabIndex={0}
            className={`category-col ${awake ? "is-awakened" : ""}`}
            onPointerEnter={() => setActiveId(d.id)}
            onPointerLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(d.id)}
            onBlur={() => setActiveId(null)}
          >
            <div className="category-col__head">
              <div className="category-col__kant">
                <span className="category-col__numeral">{d.numeral}</span>
                <span className="category-col__kant-head">{d.kantHead}</span>
                <span className="category-col__kant-ja">{d.kantHeadJa}</span>
              </div>
              <h3 className="category-col__title">{d.domain}</h3>
              <div className={`category-col__status ${d.status === "展開予定" ? "is-planned" : ""}`}>
                {d.status}
              </div>
              <div className="category-col__rule" />
              <p className="category-col__lead">{d.lead}</p>
            </div>

            <ol className="category-moments">
              {d.moments.map((m, idx) => (
                <li
                  key={m.num}
                  className="category-moment-item"
                  style={{
                    transform: awake ? `translateY(-${3 + idx}px)` : undefined,
                    transitionDelay: awake ? `${idx * 40}ms` : "0ms",
                  }}
                >
                  <span className="category-moment-num">{m.num}</span>
                  <div className="category-moment-kant">
                    <i>{m.kant}</i>
                    <span> · {m.kantJa}</span>
                  </div>
                  <div className="category-moment-title">{m.title}</div>
                  {m.detail && <div className="category-moment-note">{m.detail}</div>}
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
