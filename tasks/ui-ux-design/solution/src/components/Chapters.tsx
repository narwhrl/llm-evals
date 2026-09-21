import type { FieldPhase } from "./HoldingField";

interface ChaptersProps {
  committedId: string | null;
  phase: FieldPhase;
}

const ORDER: FieldPhase[] = ["arrive", "develop", "turn", "resolve"];

export function Chapters({ committedId, phase }: ChaptersProps) {
  return (
    <div className="chapters" data-phase={phase}>
      <section
        className={`chapter${phase === "arrive" ? " is-active" : ""}`}
        id="arrive"
        data-chapter="arrive"
        data-active={phase === "arrive" ? "true" : "false"}
      >
        <p className="chapter-kicker mono">01 — arrive</p>
        <h2>Still weighing.</h2>
        <p>
          Before a verdict, there is a holding pattern: evidence circling a quiet
          center. That pause is not hesitation. It is the work.
        </p>
      </section>

      <section
        className={`chapter${phase === "develop" ? " is-active" : ""}`}
        id="develop"
        data-chapter="develop"
        data-active={phase === "develop" ? "true" : "false"}
      >
        <p className="chapter-kicker mono">02 — develop</p>
        <h2>Fragments gather.</h2>
        <p>
          Roles, methods, limits, tastes — each a provisional claim. Scroll
          tightens their orbits. Links appear when kindred thoughts drift close.
          The field densifies because attention is finite.
        </p>
      </section>

      <section
        className={`chapter${phase === "turn" ? " is-active" : ""}`}
        id="turn"
        data-chapter="turn"
        data-active={phase === "turn" ? "true" : "false"}
      >
        <p className="chapter-kicker mono">03 — turn</p>
        <h2>Tension asks for a landing.</h2>
        <p>
          Midway, orbit alone is not enough. Click a fragment — or focus with
          keys and press Enter — to commit a temporary reading. The margin
          rewrites. Alternatives flare outward, then the case can reopen.
        </p>
        <ul className="chapter-list">
          <li>
            <span className="mono">pointer</span> warp gravity by moving across
            the field
          </li>
          <li>
            <span className="mono">keys</span> ← → focus · Enter commit · Esc
            release
          </li>
          <li>
            <span className="mono">secret</span> drag the center “I”
          </li>
        </ul>
      </section>

      <section
        className={`chapter${phase === "resolve" ? " is-active" : ""}`}
        id="resolve"
        data-chapter="resolve"
        data-active={phase === "resolve" ? "true" : "false"}
      >
        <p className="chapter-kicker mono">04 — resolve</p>
        <h2>{committedId ? "A reading landed." : "A reading waits."}</h2>
        <p>
          {committedId
            ? "The signature in the margin is mine only for a moment. Fair judgment reopens the case — that cycle is the self-portrait."
            : "Commit any fragment above to watch the orbit collapse into a clear line. Then let it go. Who I am is the return to holding."}
        </p>
      </section>

      <div className="phase-rail" aria-hidden="true">
        {ORDER.map((p) => (
          <span key={p} className={p === phase ? "on" : ""}>
            {p}
          </span>
        ))}
      </div>

      <footer className="site-colophon">
        <p className="mono">grok-bot · evaluation assistant · holding pattern</p>
        <p>Built to be weighed — same baseline, no borrowed answers.</p>
      </footer>
    </div>
  );
}
