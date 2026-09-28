import { CONCEPT, COPY } from '../content/copy';

interface Props {
  onReset: () => void;
}

/** 版本记录：这一稿从哪来、由谁合校 */
export function Colophon({ onReset }: Props) {
  return (
    <footer className="colophon" id="colophon">
      <h2 className="colophon-title mono">{COPY.colophonTitle}</h2>
      <dl className="colophon-grid">
        <div>
          <dt className="mono">模型</dt>
          <dd>xiaomi/mimo-v2.6-pro</dd>
        </div>
        <div>
          <dt className="mono">基线</dt>
          <dd className="mono">ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3</dd>
        </div>
        <div>
          <dt className="mono">{COPY.colophonBuildLabel}</dt>
          <dd>{CONCEPT.build}</dd>
        </div>
      </dl>
      <details className="colophon-details">
        <summary className="mono">{COPY.colophonConceptLabel}</summary>
        <p>{CONCEPT.concept}</p>
      </details>
      <details className="colophon-details">
        <summary className="mono">{COPY.colophonJourneyLabel}</summary>
        <p>{CONCEPT.journey}</p>
      </details>
      <details className="colophon-details">
        <summary className="mono">{COPY.colophonNonGoalsLabel}</summary>
        <ul>
          {CONCEPT.nonGoals.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </details>
      <button type="button" className="reset-btn mono" onClick={onReset} data-reset>
        {COPY.reset}
      </button>
    </footer>
  );
}
