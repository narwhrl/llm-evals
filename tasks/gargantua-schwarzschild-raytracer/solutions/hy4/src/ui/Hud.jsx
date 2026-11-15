import { SHORTCUTS, DEBUG_VIEWS, QUALITY_LEVELS, PRESETS } from '../config.js';

const GROUPS = ['Camera', 'Accretion disk', 'Background', 'Post processing'];

function fmt(value, step) {
  if (step >= 1) return String(Math.round(value));
  return value.toFixed(2);
}

function Slider({ def, value, onChange, onReset }) {
  return (
    <div className="param">
      <div className="param-head">
        <label htmlFor={`p-${def.key}`} title={def.hint}>{def.label}</label>
        <span className="param-val">{fmt(value, def.step)}<em>{def.unit}</em></span>
        <button type="button" className="param-reset" title="Reset this control to its default" onClick={onReset}>↺</button>
      </div>
      <input
        id={`p-${def.key}`}
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        aria-label={def.label}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className={`stat ${tone ?? ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function Hud({ ui, engine, audioPlaying, onAudio, onClose }) {
  if (!ui) return null;

  const cameraState = ui.capture
    ? 'CAPTURE / FROZEN'
    : ui.cinematicPlaying ? 'CINEMATIC' : 'MANUAL';
  const budget = ui.qualityBudget;

  return (
    <>
      <button
        type="button"
        className="hud-tab"
        aria-expanded={ui.hudOpen}
        aria-controls="hud-panel"
        onClick={() => engine.setHud(!ui.hudOpen)}
      >
        {ui.hudOpen ? 'HUD  −' : 'HUD  +'}
      </button>

      <aside id="hud-panel" className={`hud ${ui.hudOpen ? 'open' : 'closed'}`}>
        <header className="hud-header">
          <div>
            <div className="hud-kicker">CONTROL DECK · SCHWARZSCHILD</div>
            <h2>GARGANTUA <span>r_s = 1</span></h2>
          </div>
          <button type="button" className="hud-close" aria-label="Collapse HUD" onClick={onClose}>×</button>
        </header>

        <div className="hud-scroll">
          <div className="status-grid">
            <Stat label="QUALITY" value={ui.quality.toUpperCase()} />
            <Stat label="DEBUG" value={`${ui.debug} · ${ui.debugView.name}`} tone="accent" />
            <Stat label="CAMERA" value={cameraState} />
            <Stat label="PRESET" value={ui.presetName} />
            <Stat label="TIME" value={`${ui.time.toFixed(2)} s`} />
            <Stat label="DPR / BUFFER" value={`${ui.dpr.toFixed(2)} · ${ui.renderSize.width}×${ui.renderSize.height}`} />
          </div>
          <p className="debug-desc"><b>DEBUG {ui.debug}</b> — {ui.debugView.desc}</p>

          <section className="hud-section">
            <h3>VIEW PRESETS <small>Shift + 1…4</small></h3>
            <div className="btn-row four">
              {PRESETS.map((preset, i) => (
                <button
                  type="button"
                  key={preset.name}
                  className={`chip ${ui.preset === i ? 'active' : ''}`}
                  onClick={() => engine.setPreset(i)}
                >
                  <b>{i + 1}</b>{preset.name}
                </button>
              ))}
            </div>
          </section>

          <section className="hud-section">
            <h3>QUALITY TIER <small>Q</small></h3>
            <div className="btn-row three">
              {QUALITY_LEVELS.map((level) => (
                <button
                  type="button"
                  key={level}
                  className={`chip ${ui.quality === level ? 'active' : ''}`}
                  onClick={() => engine.setQuality(level)}
                >
                  {level.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="budget">
              {budget.maxSteps} geodesic steps · {budget.diskSamples} disk samples ·{' '}
              {(budget.renderScale * 100).toFixed(0)}% internal scale · {budget.bloomLevels} bloom levels ·{' '}
              DPR ≤ {budget.dprCap}
            </p>
          </section>

          <section className="hud-section">
            <h3>DEBUG VIEWS <small>0…9</small></h3>
            <div className="debug-grid">
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`dbg ${ui.debug === i ? 'active' : ''}`}
                  title={`${i}: ${DEBUG_VIEWS[i].name} — ${DEBUG_VIEWS[i].desc}`}
                  onClick={() => engine.setDebug(i)}
                >
                  <b>{i}</b><span>{['FINAL', 'STEPS', 'HORIZON', 'CROSSINGS', 'DOPPLER', 'SKY', 'STARS', 'HDR', 'BENDING', 'r_MIN'][i]}</span>
                </button>
              ))}
            </div>
          </section>

          {GROUPS.map((group) => (
            <section className="hud-section" key={group}>
              <h3>{group.toUpperCase()}</h3>
              {ui.paramDefs
                .filter((def) => def.group === group)
                .map((def) => (
                  <Slider
                    key={def.key}
                    def={def}
                    value={ui.params[def.key]}
                    onChange={(v) => engine.setParam(def.key, v)}
                    onReset={() => engine.setParam(def.key, def.def)}
                  />
                ))}
            </section>
          ))}

          <section className="hud-section">
            <h3>KEYBOARD</h3>
            <ul className="shortcuts">
              {SHORTCUTS.map(([key, text]) => (
                <li key={key}><kbd>{key}</kbd><span>{text}</span></li>
              ))}
            </ul>
          </section>

          <section className="hud-section actions">
            <button type="button" className="wide" onClick={() => engine.reset()}>RESET ALL STATE (R)</button>
            <button type="button" className="wide" onClick={() => engine.toggleCinematic()}>
              {ui.cinematicPlaying ? 'PAUSE CINEMATIC (Space)' : 'PLAY CINEMATIC (Space)'}
            </button>
            <button type="button" className="wide" onClick={onAudio} disabled={ui.capture}>
              {audioPlaying ? 'AMBIENCE: ON (M)' : 'AMBIENCE: OFF (M)'}
            </button>
            <button type="button" className="wide" onClick={() => engine.simulateContextLoss()}>
              TEST WEBGL CONTEXT LOSS
            </button>
          </section>

          {!ui.storageOk && <p className="warn">localStorage unavailable: {ui.storageReason}</p>}
          {ui.warnings?.length > 0 && <p className="warn">{ui.warnings.join(' · ')}</p>}
          <p className="footnote">Drag to orbit · wheel / pinch to zoom. Every control writes shader uniforms or camera state and persists to localStorage.</p>
        </div>
      </aside>
    </>
  );
}
