import { PARAMS, PRESETS, DEBUG_VIEWS, QUALITY_LEVELS, QUALITY_ORDER } from './config.js';

const GROUPS = [
  ['camera', 'Camera'],
  ['disk', 'Accretion disk'],
  ['sky', 'Sky'],
  ['post', 'Post-processing'],
];

export function Hud({ state, collapsed, onToggleCollapsed, engineRef, onTick }) {
  if (!state.hud) return null;

  const v = state.values;
  const dv = DEBUG_VIEWS[state.debug];
  const quality = QUALITY_LEVELS[state.quality];

  const set = (key, val) => {
    state.set(key, val);
    engineRef.current?.applyParams();
    // camera-bound params must push into the rig immediately
    if (['fov', 'camDistance', 'camAzimuth', 'camElevation'].includes(key)) {
      engineRef.current?.syncCameraFromState();
    }
    onTick();
  };

  const applyPreset = (i) => {
    state.setPreset(i);
    engineRef.current?.applyPreset(i);
    onTick();
  };

  const cycleQuality = (level) => {
    state.setQuality(level);
    engineRef.current?.setQuality(level);
    onTick();
  };

  const reset = () => {
    state.reset();
    const e = engineRef.current;
    if (e) {
      e.userInteracted = false;
      e.applyPreset(0);
      e.setQuality(state.quality);
      e.resize();
    }
    onTick();
  };

  const toggleCinematic = () => {
    const on = state.setCinematic(!state.cinematic);
    if (on && engineRef.current) engineRef.current.userInteracted = false;
    onTick();
  };

  return (
    <aside className={`hud${collapsed ? ' collapsed' : ''}`}>
      <div className="hud-head" onClick={onToggleCollapsed} role="button" aria-label="toggle hud">
        <div>
          <div className="hud-title">GARGANTUA</div>
          <div className="hud-sub">Schwarzschild raytracer · rs = 1</div>
        </div>
        <div className="hud-collapse">{collapsed ? '▸' : '▾'}</div>
      </div>

      <div className="hud-body">
        <dl className="status-grid">
          <dt>quality</dt>
          <dd><b>{quality.label}</b> · {quality.maxSteps} steps</dd>
          <dt>debug</dt>
          <dd>[{state.debug}] {dv.name}</dd>
          <dt>loop</dt>
          <dd>{state.cinematic ? 'cinematic ▶' : 'manual ⏸'}</dd>
          <dt>time</dt>
          <dd>{state.simTime.toFixed(1)} s</dd>
        </dl>

        <div className="group-label">View presets</div>
        <div className="presets">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              className={`preset-btn${state.preset === i ? ' active' : ''}`}
              onClick={() => applyPreset(i)}
            >
              {i + 1}. {p.name}
              <small>Shift+{i + 1}</small>
            </button>
          ))}
        </div>

        <div className="group-label">Quality</div>
        <div className="quality-row">
          {QUALITY_ORDER.map((k) => (
            <button
              key={k}
              className={state.quality === k ? 'active' : ''}
              onClick={() => cycleQuality(k)}
            >
              {QUALITY_LEVELS[k].label}
            </button>
          ))}
        </div>

        <div className="transport">
          <button onClick={toggleCinematic}>{state.cinematic ? '⏸ Pause loop' : '▶ Resume loop'}</button>
          <button className="warn" onClick={reset}>⟲ Reset all</button>
        </div>

        {GROUPS.map(([g, title]) => (
          <div key={g}>
            <div className="group-label">{title}</div>
            {PARAMS.filter((p) => p.group === g).map((p) => (
              <div className="ctl" key={p.key}>
                <div className="ctl-row">
                  <label htmlFor={`ctl-${p.key}`}>{p.label}</label>
                  <output>{p.fmt(v[p.key])}</output>
                </div>
                <input
                  id={`ctl-${p.key}`}
                  type="range"
                  min={p.min}
                  max={p.max}
                  step={p.step}
                  value={v[p.key]}
                  onChange={(e) => set(p.key, Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="group-label">Debug view — {dv.name}</div>
        <div className="keys" style={{ marginTop: 2 }}>{dv.desc}</div>

        <div className="keys">
          <kbd>0</kbd>–<kbd>9</kbd> debug view · <kbd>Shift+1..4</kbd> preset<br />
          <kbd>Space</kbd> cinematic loop · <kbd>H</kbd> HUD · <kbd>R</kbd> reset · <kbd>Q</kbd> quality · <kbd>M</kbd> music
        </div>
      </div>
    </aside>
  );
}
