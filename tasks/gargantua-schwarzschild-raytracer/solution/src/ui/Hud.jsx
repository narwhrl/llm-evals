import {
  DEBUG_VIEWS,
  PRESETS,
  QUALITY_ORDER,
  QUALITY_PROFILES,
} from '../state/schema.js';
import ControlPanel from './ControlPanel.jsx';

function formatNumber(value, digits = 1) {
  return Number(value).toFixed(digits);
}

export default function Hud({
  state,
  contextLost,
  onParam,
  onQuality,
  onPreset,
  onDebug,
  onReset,
  onToggleHud,
  onTogglePlaying,
}) {
  const profile = QUALITY_PROFILES[state.quality];
  const debug = DEBUG_VIEWS[state.debug];
  const loopLabel = state.capture ? 'FROZEN' : state.playing ? 'CINEMATIC' : 'PAUSED';
  const presetLabel = state.preset >= 0 ? PRESETS[state.preset].name : 'CUSTOM';

  if (!state.hudOpen) {
    if (state.capture) return null;
    return (
      <div className="hud hud--closed">
        <button
          type="button"
          className="hud-trigger"
          onClick={() => onToggleHud(true)}
          aria-label="Open instrument HUD"
        >
          <span>OPEN HUD</span>
          <kbd>H</kbd>
        </button>
      </div>
    );
  }

  return (
    <div className="hud">
      <header className="hud-top">
        <div className="brand">
          <span className="brand-mark">GARGANTUA</span>
          <span className="brand-sub">SCHWARZSCHILD BLACK HOLE RAYTRACER · M = 1</span>
        </div>

        <div className="status-cluster">
          <span className={`status-pill ${contextLost ? 'is-alert' : ''}`}>
            <span className={`status-dot ${contextLost ? 'is-alert' : ''}`} />
            {contextLost ? 'NO SIGNAL' : 'LIVE'}
          </span>
          {state.capture && (
            <span className="status-pill capture-pill">CAPTURE · t={formatNumber(state.time, 2)}s</span>
          )}
          <span className="status-pill preset-pill">{presetLabel.toUpperCase()}</span>
          <div className="segmented" role="group" aria-label="Render quality">
            {QUALITY_ORDER.map((quality) => (
              <button
                key={quality}
                type="button"
                aria-pressed={state.quality === quality}
                title={`${QUALITY_PROFILES[quality].label}: ${QUALITY_PROFILES[quality].note}`}
                onClick={() => onQuality(quality)}
              >
                {QUALITY_PROFILES[quality].short}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="status-button"
            onClick={() => onToggleHud(false)}
            aria-label="Hide instrument HUD"
          >
            HUD <kbd>H</kbd>
          </button>
        </div>
      </header>

      <aside className="instrument-panel" aria-label="Observation console">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">INSTRUMENT / 01</span>
            <h1 className="panel-title">OBSERVATION CONSOLE</h1>
          </div>
          <div className="panel-actions">
            <button
              type="button"
              className="ghost-button"
              onClick={onTogglePlaying}
              disabled={state.capture}
              title={state.capture ? 'Camera loop disabled by the capture contract' : undefined}
              aria-label={state.playing ? 'Pause cinematic camera loop' : 'Play cinematic camera loop'}
            >
              {state.playing ? 'PAUSE' : 'PLAY'}
            </button>
            <button type="button" className="ghost-button" onClick={onReset}>
              RESET
            </button>
          </div>
        </div>

        <section className="panel-section panel-section--status">
          <div className="section-title">
            <span>Status</span>
            <span className="section-hint">metric units · G = c = 1</span>
          </div>
          <div className="readout-grid">
            <div><span>CAMERA</span><b>{loopLabel}</b></div>
            <div><span>PRESET</span><b>{presetLabel}</b></div>
            <div><span>AZ / EL</span><b>{formatNumber(state.params.azimuth)}° / {formatNumber(state.params.elevation)}°</b></div>
            <div><span>DIST / FOV</span><b>{formatNumber(state.params.distance)} M / {formatNumber(state.params.fov)}°</b></div>
            <div><span>RENDER</span><b>{profile.label} · {profile.maxSteps} steps</b></div>
            <div><span>FRAME</span><b>{formatNumber(state.fps, 0)} fps · t={formatNumber(state.time, 2)}s</b></div>
          </div>
          <div className="debug-readout" aria-live="polite">
            <span className="debug-number">{String(state.debug).padStart(2, '0')}</span>
            <div>
              <b>{debug.name}</b>
              <p>{debug.detail}</p>
            </div>
          </div>
          <div className="debug-strip" role="group" aria-label="Debug views">
            {DEBUG_VIEWS.map((view, index) => (
              <button
                key={view.id}
                type="button"
                className={`debug-key ${state.debug === index ? 'is-active' : ''}`}
                aria-pressed={state.debug === index}
                title={`${index} · ${view.name}`}
                onClick={() => onDebug(index)}
              >
                {index}
              </button>
            ))}
          </div>
          <div className="shortcut-inline" aria-label="Keyboard shortcuts">
            <span><kbd>0–9</kbd> debug</span>
            <span><kbd>⇧1–4</kbd> preset</span>
            <span><kbd>SPACE</kbd> loop</span>
            <span><kbd>H</kbd> HUD</span>
            <span><kbd>R</kbd> reset</span>
            <span><kbd>Q</kbd> quality</span>
          </div>
          <p className="profile-note">{profile.note}</p>
        </section>

        <section className="panel-section">
          <div className="section-title">
            <span>View presets</span>
            <span className="section-hint">shift + 1…4</span>
          </div>
          <div className="preset-grid">
            {PRESETS.map((preset, index) => (
              <button
                key={preset.id}
                type="button"
                className={`preset-button ${state.preset === index ? 'is-active' : ''}`}
                aria-pressed={state.preset === index}
                title={preset.blurb}
                onClick={() => onPreset(index)}
              >
                <span className="code">SHIFT + {index + 1}</span>
                {preset.name}
              </button>
            ))}
          </div>
        </section>

        <ControlPanel params={state.params} onParam={onParam} />

        <section className="panel-section">
          <div className="section-title">
            <span>Controls</span>
            <span className="section-hint">21 live parameters</span>
          </div>
          <div className="shortcut-grid">
            <span><kbd>0–9</kbd> debug view</span>
            <span><kbd>⇧1–4</kbd> preset</span>
            <span><kbd>SPACE</kbd> camera loop</span>
            <span><kbd>H</kbd> HUD</span>
            <span><kbd>R</kbd> reset</span>
            <span><kbd>Q</kbd> quality</span>
          </div>
          <p className="interaction-note">DRAG ORBIT · SCROLL / PINCH ZOOM · TOUCH SUPPORTED</p>
          <button type="button" className="ghost-button reset-wide" onClick={onReset}>
            RESET ALL PARAMETERS
          </button>
        </section>
      </aside>

      <footer className="hud-bottom">
        <span>OBSERVATORY / SCHWARZSCHILD NULL-GEODESIC INTEGRATOR</span>
        <span>0 EVENT HORIZON · 3M PHOTON SPHERE · 3√3M CRITICAL IMPACT</span>
      </footer>
    </div>
  );
}
