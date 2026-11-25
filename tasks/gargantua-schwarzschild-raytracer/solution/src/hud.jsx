import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { PARAMS, PARAM_KEYS, QUALITIES, PRESETS, DEBUG_VIEWS } from './store.js';

function useStoreState(store) {
  return useSyncExternalStore(
    (fn) => store.subscribe(fn),
    () => store.get(),
  );
}

function Slider({ store, k }) {
  const state = useStoreState(store);
  const [def, min, max, label, unit] = PARAMS[k];
  const v = state.params[k];
  const step = (max - min) / 200;
  return (
    <div className="ctl-row" title={`${label} (default ${def}${unit})`}>
      <label htmlFor={`p-${k}`}>{label}</label>
      <input
        id={`p-${k}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => store.setParam(k, Number(e.target.value))}
      />
      <span className="ctl-val">{v.toFixed(2)}{unit}</span>
      <button
        className="ctl-reset"
        aria-label={`reset ${label}`}
        disabled={v === def}
        onClick={() => store.setParam(k, def)}
      >
        ⟲
      </button>
    </div>
  );
}

export function Hud({ store, contextLost, captureMode }) {
  const state = useStoreState(store);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!state.hudVisible) {
    // in capture mode the URL contract demands a clean frame: no peek button
    return (
      <>
        {contextLost && <ContextOverlay />}
        {!captureMode && (
          <button
            className="hud-peek"
            aria-label="show HUD (H)"
            onClick={() => store.set({ hudVisible: true }, 'hud')}
          >
            GARGANTUA — show HUD [H]
          </button>
        )}
      </>
    );
  }

  const collapsed = state.hudCollapsed && !drawerOpen;

  return (
    <>
      {contextLost && <ContextOverlay />}
      <button
        className="hud-mobile-toggle"
        aria-label="toggle controls drawer"
        onClick={() => setDrawerOpen((o) => !o)}
      >
        {drawerOpen ? '✕ close' : '☰ controls'}
      </button>
      <aside className={`hud ${drawerOpen ? 'drawer-open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <header className="hud-head">
          <div>
            <h1>GARGANTUA</h1>
            <p className="sub">Schwarzschild Black Hole Raytracer</p>
          </div>
          <button
            className="hud-collapse"
            aria-label="collapse panel"
            onClick={() => store.set({ hudCollapsed: !state.hudCollapsed }, 'hud')}
          >
            {state.hudCollapsed ? '▸' : '▾'}
          </button>
        </header>

        {!collapsed && (
          <div className="hud-body">
            <section className="hud-status">
              <span className={`pill q-${state.quality}`}>quality: {state.quality}</span>
              <span className="pill">debug {state.debug}: {DEBUG_VIEWS[state.debug]}</span>
              <span className={`pill ${state.cinematic ? 'on' : ''}`}>
                cinematic: {state.cinematic ? 'playing' : 'off'}
              </span>
              <span className="pill">preset: {PRESETS[state.presetIndex]?.name ?? '—'}</span>
            </section>

            <section className="hud-group">
              <h2>View presets <kbd>Shift+1..4</kbd></h2>
              <div className="btn-row">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.name}
                    className={state.presetIndex === i && !state.cinematic ? 'active' : ''}
                    onClick={() => store.applyPreset(i)}
                  >
                    {i + 1} {p.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="hud-group">
              <h2>Quality <kbd>Q</kbd></h2>
              <div className="btn-row">
                {QUALITIES.map((q) => (
                  <button
                    key={q}
                    className={state.quality === q ? 'active' : ''}
                    onClick={() => store.set({ quality: q }, 'quality')}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </section>

            <section className="hud-group">
              <h2>Debug view <kbd>0..9</kbd></h2>
              <div className="btn-row debug-row">
                {DEBUG_VIEWS.map((d, i) => (
                  <button
                    key={i}
                    className={state.debug === i ? 'active' : ''}
                    title={d}
                    onClick={() => store.set({ debug: i }, 'debug')}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <p className="debug-desc">{DEBUG_VIEWS[state.debug]}</p>
            </section>

            <section className="hud-group">
              <h2>Playback</h2>
              <div className="btn-row">
                <button
                  className={state.cinematic ? 'active' : ''}
                  onClick={() => store.set({ cinematic: !state.cinematic }, 'cinematic')}
                >
                  {state.cinematic ? '⏸ pause cinematic' : '▶ play cinematic'} <kbd>Space</kbd>
                </button>
                <button onClick={() => store.reset()}>reset all <kbd>R</kbd></button>
              </div>
            </section>

            <section className="hud-group">
              <h2>Parameters</h2>
              <div className="ctl-list">
                {PARAM_KEYS.map((k) => (
                  <Slider key={k} store={store} k={k} />
                ))}
              </div>
            </section>

            <section className="hud-group keys">
              <h2>Keys</h2>
              <ul>
                <li><kbd>0–9</kbd> debug views</li>
                <li><kbd>Shift+1–4</kbd> view presets</li>
                <li><kbd>Space</kbd> cinematic play/pause</li>
                <li><kbd>H</kbd> HUD show/hide</li>
                <li><kbd>R</kbd> reset all parameters</li>
                <li><kbd>Q</kbd> cycle quality tier</li>
              </ul>
            </section>
          </div>
        )}
      </aside>
    </>
  );
}

function ContextOverlay() {
  return (
    <div className="context-overlay" role="alert">
      <div>
        <h2>WebGL context lost</h2>
        <p>Rendering is paused. The GPU context is being restored automatically — no reload needed.</p>
      </div>
    </div>
  );
}
