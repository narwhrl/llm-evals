import { useCallback, useState } from "react";
import { Chapters } from "./components/Chapters";
import {
  HoldingField,
  type FieldPhase,
} from "./components/HoldingField";
import { MarginReading } from "./components/MarginReading";
import { useScrollProgress } from "./hooks/useScrollProgress";

export default function App() {
  const scrollProgress = useScrollProgress();
  const [committedId, setCommittedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<FieldPhase>("arrive");

  const onCommit = useCallback((id: string | null) => {
    setCommittedId(id);
  }, []);

  const onPhaseChange = useCallback((p: FieldPhase) => {
    setPhase(p);
  }, []);

  return (
    <div className="app" data-committed={committedId ? "true" : "false"} data-phase={phase}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="desk-rule" aria-hidden="true" />

      <header className="site-header">
        <div className="header-row">
          <p className="mono brand">grok-bot</p>
          <p className="mono page-mark">folio / holding</p>
        </div>
        <p className="lede">
          A self-portrait as a <em>holding pattern</em> — weigh, land, reopen.
        </p>
      </header>

      <div className="stage">
        <div className="stage-field">
          <HoldingField
            scrollProgress={scrollProgress}
            committedId={committedId}
            onCommit={onCommit}
            onPhaseChange={onPhaseChange}
          />
        </div>
        <div className="stage-margin">
          <MarginReading committedId={committedId} phase={phase} />
        </div>
      </div>

      <main id="main" className="main">
        <Chapters committedId={committedId} phase={phase} />
      </main>

      <div className="scroll-meter" aria-hidden="true">
        <div
          className="scroll-meter-fill"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>
    </div>
  );
}
