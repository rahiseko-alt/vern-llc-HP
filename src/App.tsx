import { useState } from "react";
import { VERN } from "./data/vernData";
import { TextFlip } from "./components/TextFlip";
import { Typewriter } from "./components/Typewriter";
import { ProximityLift } from "./components/ProximityLift";
import { InkReveal } from "./components/InkReveal";
import { CategoryTable } from "./components/CategoryTable";
import { ManuscriptCanvas } from "./components/ManuscriptCanvas";

export function App() {
  const [isStructureAwakened, setIsStructureAwakened] = useState(false);
  const [isFullyInked, setIsFullyInked] = useState(false);

  const { company, statement, faculties, domains, roadmap, activity, designSource } = VERN;
  const [verstand, vernunft] = faculties;

  return (
    <div className="editorial-root">
      <ManuscriptCanvas />

      <main className="editorial-container">
        <header className="colophon-bar">
          <div className="colophon-bar__left">
            <span className="colophon-bar__brand">{company.name}</span>
            <span>·</span>
            <span>{company.status}</span>
          </div>
          <div className="colophon-bar__right">
            <span className="colophon-bar__tag">Verstand / Vernunft</span>
            <span>教育 · コミュニティ · 開発 · 業務改善</span>
          </div>
        </header>

        {/* § I — Title page: statement */}
        <section className="editorial-section title-page" id="statement">
          <div className="title-page__ornament-top">
            <span className="title-page__line" />
            <span className="title-page__symbol">✦</span>
            <span className="title-page__line" />
          </div>

          <p className="title-page__subhead">{company.name} — Statement</p>

          <h1 className="title-page__main-title">
            {statement.lead}
            <TextFlip front={verstand.flipFront} back={verstand.flipBack} note={verstand.note} />
            {statement.mid}
            <TextFlip front={vernunft.flipFront} back={vernunft.flipBack} note={vernunft.note} />
            {statement.tail}
          </h1>

          <div className="title-page__double-rule" />

          <div className="title-page__author-block">
            <div className="title-page__author-name">{company.name}</div>
            <div className="title-page__author-title">
              {company.legal} · {company.status}
            </div>
          </div>

          <div className="title-page__typewriter-box">
            <p className="title-page__quote-de">
              <Typewriter text={statement.body} />
            </p>
            <div className="title-page__quote-meta">
              <span>Statement · 01</span>
              <span>{statement.motto}</span>
            </div>
          </div>

          <div className="title-page__imprint">{activity}</div>
        </section>

        {/* § II — Four practice domains on Kant's table of categories */}
        <section className="editorial-section" id="practice">
          <div className="section-label">
            <div>
              <span className="section-label__num">§ II</span>
              <span>四つの実践領域</span>
            </div>
            <div className="section-label__pagination">I · II · III · IV</div>
          </div>

          <header className="category-header">
            <ProximityLift as="h2" className="category-header__title">
              Tafel der Praxis
            </ProximityLift>
            <p className="category-header__preamble">
              カントは、知性が世界を捉える形式を四つの綱目——量・質・関係・様相——に整理した。
              Vern LLC の活動も、同じ{" "}
              <button
                type="button"
                className="structure-trigger"
                aria-pressed={isStructureAwakened}
                onPointerEnter={(e) => e.pointerType === "mouse" && setIsStructureAwakened(true)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setIsStructureAwakened(false)}
                onFocus={() => setIsStructureAwakened(true)}
                onBlur={() => setIsStructureAwakened(false)}
              >
                構造
              </button>{" "}
              で組まれている。
            </p>
          </header>

          <CategoryTable domains={domains} isStructureAwakened={isStructureAwakened} />
        </section>

        {/* § III — Nomen: origin of the name */}
        <section className="editorial-section" id="nomen">
          <div className="section-label">
            <div>
              <span className="section-label__num">§ III</span>
              <span>Nomen — 社名の由来</span>
            </div>
            <div className="section-label__pagination">i · ii</div>
          </div>

          <div className="manifesto-grid">
            <aside className="manifesto-marginalia">
              <div className="manifesto-marginalia__title">Vern</div>
              <p>{statement.origin}</p>
            </aside>

            <article className="manifesto-body">
              <div className="manifesto-toggle-bar">
                <button
                  type="button"
                  className="fix-ink-button"
                  aria-pressed={isFullyInked}
                  onClick={() => setIsFullyInked((v) => !v)}
                >
                  {isFullyInked ? "インクを戻す" : "全文を定着させる"}
                </button>
              </div>

              <InkReveal isFullyInked={isFullyInked}>
                <dl className="faculty-list">
                  {faculties.map((f) => (
                    <div className="faculty-item" key={f.german}>
                      <dt>
                        <span className="faculty-note">{f.note}</span>
                        <span className="faculty-german">{f.german}</span>
                        <span className="faculty-ja">{f.ja}</span>
                      </dt>
                      <dd>{f.definition}</dd>
                    </div>
                  ))}
                </dl>
                <p className="faculty-motto">{statement.motto}</p>
              </InkReveal>
            </article>
          </div>
        </section>

        {/* § IV — Ausblick: roadmap */}
        <section className="editorial-section" id="ausblick">
          <div className="section-label">
            <div>
              <span className="section-label__num">§ IV</span>
              <span>Ausblick — 今後の展開</span>
            </div>
            <div className="section-label__pagination">01 — 04</div>
          </div>

          <div className="colophon-grid">
            {roadmap.map((r) => (
              <div className="colophon-box" key={r.label}>
                <div className="colophon-box__title">{r.label}</div>
                <p className="colophon-box__heading">{r.title}</p>
                <p className="colophon-box__text">{r.text}</p>
              </div>
            ))}
          </div>

          <footer className="footer-citations">
            <div>© {company.name}</div>
            <div>Design source: {designSource}</div>
          </footer>
        </section>
      </main>
    </div>
  );
}
