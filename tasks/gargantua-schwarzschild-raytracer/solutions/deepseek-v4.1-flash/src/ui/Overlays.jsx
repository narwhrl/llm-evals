export function BootOverlay({ ready, error }) {
  return (
    <div className={`boot-overlay ${ready || error ? 'is-hidden' : ''}`} aria-hidden={ready || error}>
      <div className="boot-card">
        <span className="boot-kicker">DEEP FIELD INSTRUMENT</span>
        <span className="boot-title">GARGANTUA</span>
        <span className="boot-sub">CALIBRATING SCHWARZSCHILD METRIC</span>
        <div className="boot-line"><span /></div>
        <span className="boot-hint">integrating null geodesics · building HDR frame</span>
      </div>
    </div>
  );
}

export function ContextOverlay({ lost, onRecover }) {
  if (!lost) return null;
  return (
    <div className="context-overlay" role="alertdialog" aria-modal="true" aria-labelledby="context-title">
      <div className="context-card">
        <span className="context-kicker">WEBGL CONTEXT SUSPENDED</span>
        <h2 id="context-title">SIGNAL LOST</h2>
        <p>
          The GPU context was released. Rendering is paused and every persisted
          setting is intact. The renderer, targets and shader programs are rebuilt
          when the context returns.
        </p>
        <button type="button" className="context-button" onClick={onRecover}>
          RE-ACQUIRE CONTEXT
        </button>
      </div>
    </div>
  );
}

export function ErrorOverlay({ error }) {
  if (!error) return null;
  return (
    <div className="context-overlay is-error" role="alertdialog" aria-modal="true" aria-labelledby="error-title">
      <div className="context-card">
        <span className="context-kicker">RENDER PIPELINE FAILURE</span>
        <h2 id="error-title">INSTRUMENT OFFLINE</h2>
        <p>{String(error.message || error)}</p>
        <p className="context-footnote">
          Check WebGL 2 availability and the browser console. The page does not
          reload itself; the failure is reported rather than hidden.
        </p>
      </div>
    </div>
  );
}
