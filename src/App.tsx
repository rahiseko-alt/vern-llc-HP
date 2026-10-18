import { useState } from "react";
import { KANT_ARCHIVE_DATA } from "./data/kantArchiveData";
import { TextFlip } from "./components/TextFlip";
import { Typewriter } from "./components/Typewriter";
import { ProximityLift } from "./components/ProximityLift";
import { InkReveal } from "./components/InkReveal";
import { CategoryTable } from "./components/CategoryTable";
import { ManuscriptCanvas } from "./components/ManuscriptCanvas";

export function App() {
  const [isStructureAwakened, setIsStructureAwakened] = useState(false);
  const [isFullyInked, setIsFullyInked] = useState(false);

  const { work, principles, categories } = KANT_ARCHIVE_DATA;

  return (
    <div className="editorial-root">
      {/* Background Manuscript Texture Layer (Opus postumum fragment) */}
      <ManuscriptCanvas />

      <main className="editorial-container">
        {/* Colophon Top Header */}
        <header className="colophon-bar">
          <div className="colophon-bar__left">
            <span>{work.edition}</span>
            <span>·</span>
            <span>Riga: Johann Friedrich Hartknoch</span>
          </div>
          <div className="colophon-bar__right">
            <span className="colophon-bar__tag">CRITIK I</span>
            <span>{work.citationRange}</span>
          </div>
        </header>

        {/* Section I: Title Page (Hero) */}
        <section className="editorial-section title-page" id="title-page">
          <div className="title-page__ornament-top">
            <span className="title-page__line" />
            <span className="title-page__symbol">✦</span>
            <span className="title-page__line" />
          </div>

          <p className="title-page__subhead">Systematische Philosophie · 1781</p>

          <h1 className="title-page__main-title">
            Critik der reinen{" "}
            <span className="title-page__flip-container">
              <TextFlip
                front={principles.heroFlipPair.front}
                back={principles.heroFlipPair.back}
                note="i"
              />
            </span>
          </h1>

          <div className="title-page__double-rule" />

          <div className="title-page__author-block">
            <div className="title-page__author-name">{work.author}</div>
            <div className="title-page__author-title">
              {work.authorTitle} ({work.lifespan})
            </div>
          </div>

          {/* Typewriter: Historic typesetting without terminal look */}
          <div className="title-page__typewriter-box">
            <p className="title-page__quote-de">
              <Typewriter text={principles.transcendentalQuote.german} speed={28} />
            </p>
            <div className="title-page__quote-meta">
              <span>{principles.transcendentalQuote.source}</span>
              <span>Transscendentale Elementarlehre</span>
            </div>
          </div>

          <div className="title-page__imprint">{work.imprint}</div>
        </section>

        {/* Section II: Tafel der Categorien */}
        <section className="editorial-section" id="categories">
          <div className="section-label">
            <div>
              <span className="section-label__num">§ II</span>
              <span>Tafel der Categorien (Table of Categories)</span>
            </div>
            <div className="section-label__pagination">A 80 / B 106</div>
          </div>

          <header className="category-header">
            <ProximityLift as="h2">
              Die reinen Verstandesbegriffe
            </ProximityLift>
            <p className="category-header__preamble">
              The fourfold division of synthetic understanding. Hovering the fundamental{" "}
              <button
                type="button"
                className="structure-trigger"
                onPointerEnter={() => setIsStructureAwakened(true)}
                onPointerLeave={() => setIsStructureAwakened(false)}
                onFocus={() => setIsStructureAwakened(true)}
                onBlur={() => setIsStructureAwakened(false)}
                aria-label="Awaken categorical structure rules"
              >
                STRUCTURE
              </button>{" "}
              manifests the architectural scaffolding connecting pure judgments to pure concepts.
            </p>
          </header>

          <CategoryTable
            categories={categories}
            isStructureAwakened={isStructureAwakened}
          />
        </section>

        {/* Section III: Analytic of Concepts (Manifesto & Ink Reveal) */}
        <section className="editorial-section" id="manifesto">
          <div className="section-label">
            <div>
              <span className="section-label__num">§ III</span>
              <span>Transscendentale Analytik · Grundsatz</span>
            </div>
            <div className="section-label__pagination">A 51 / B 75 · A 79 / B 105</div>
          </div>

          <div className="manifesto-grid">
            <aside className="manifesto-marginalia">
              <div className="manifesto-marginalia__title">Marginalia</div>
              <p style={{ marginBottom: "12px" }}>
                Gedanken ohne Inhalt sind leer; Anschauungen ohne Begriffe sind blind.
              </p>
              <p style={{ color: "var(--ink-faint)" }}>
                The intuition supplies the object; the category provides the pure concept. Knowledge exists solely in their synthesis.
              </p>
            </aside>

            <article className="manifesto-body">
              <div className="manifesto-toggle-bar">
                <button
                  type="button"
                  className="fix-ink-button"
                  aria-pressed={isFullyInked}
                  onClick={() => setIsFullyInked((prev) => !prev)}
                >
                  {isFullyInked ? "Restore Interactive Ink" : "Fix Ink [Read Full]"}
                </button>
              </div>

              <InkReveal isFullyInked={isFullyInked}>
                <p style={{ marginBottom: "24px" }}>
                  {principles.manifestoQuote.german}
                </p>
                <p style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>
                  {principles.manifestoQuote.english}
                </p>
              </InkReveal>
            </article>
          </div>
        </section>

        {/* Section IV: Opus postumum & Colophon */}
        <section className="editorial-section" id="colophon">
          <div className="section-label">
            <div>
              <span className="section-label__num">§ IV</span>
              <span>Opus postumum & Bibliographischer Nachweis</span>
            </div>
            <div className="section-label__pagination">AA XXI: 116</div>
          </div>

          <div className="colophon-grid">
            <div className="colophon-box">
              <div className="colophon-box__title">Manuscript Trace · 1796–1803</div>
              <p className="colophon-box__text">
                "{principles.opusPostumum.german}"
              </p>
              <div className="colophon-box__meta">
                {principles.opusPostumum.convolut}
              </div>
            </div>

            <div className="colophon-box">
              <div className="colophon-box__title">Synthesis & Understanding</div>
              <p className="colophon-box__text">
                "{principles.synthesisQuote.german}"
              </p>
              <div className="colophon-box__meta">
                Critik der reinen Vernunft · {principles.synthesisQuote.source}
              </div>
            </div>
          </div>

          <footer className="footer-citations">
            <div>{work.colophon}</div>
            <div>Typographie nach den Proportionsgesetzen von 1781 / 2026 Edition</div>
          </footer>
        </section>
      </main>
    </div>
  );
}
