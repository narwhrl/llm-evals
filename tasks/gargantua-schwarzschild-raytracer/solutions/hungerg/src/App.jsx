import { useCallback, useEffect, useRef, useState } from 'react';
import { GargantuaEngine } from './engine.js';
import {
  DEBUG_VIEWS,
  PARAM_GROUPS,
  PRESETS,
  QUALITY,
  cameraParams,
  clampParam,
  defaultState,
  loadState,
  saveState,
  sanitizeState,
} from './state.js';
import './styles.css';

function formatValue(value, unit) {
  if (unit === 'K') return `${Math.round(value)} ${unit}`;
  if (unit === 'rad') return `${value.toFixed(2)} ${unit}`;
  if (unit === '°') return `${value.toFixed(1)}${unit}`;
  if (unit === '×') return `${value.toFixed(2)}${unit}`;
  if (unit === 'rₛ') return `${value.toFixed(2)} ${unit}`;
  return value.toFixed(3);
}

function ParameterSlider({ item, value, onChange }) {
  const id = `param-${item.key}`;
  return (
    <label className="parameter" htmlFor={id}>
      <span className="parameter-label">{item.label}</span>
      <output htmlFor={id}>{formatValue(value, item.unit)}</output>
      <input
        id={id}
        type="range"
        min={item.min}
        max={item.max}
        step={item.step}
        value={value}
        onChange={(event) => onChange(item.key, Number(event.target.value))}
      />
    </label>
  );
}

function App() {
  const initialRef = useRef(null);
  if (!initialRef.current) initialRef.current = loadState();
  const [state, setState] = useState(initialRef.current.state);
  const stateRef = useRef(state);
  const captureRef = useRef(initialRef.current.capture);
  const engineRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [context, setContext] = useState('live');
  const [error, setError] = useState(null);
  const [apiNotice, setApiNotice] = useState('');

  const commit = useCallback((next) => {
    stateRef.current = next;
    setState(next);
    engineRef.current?.setState(next);
    saveState(next);
    return next;
  }, []);

  const update = useCallback((updater) => {
    const next = sanitizeState(updater(stateRef.current));
    return commit(next);
  }, [commit]);

  const setParameter = useCallback((key, value) => {
    update((current) => ({
      ...current,
      preset: ['fov', 'distance', 'azimuth', 'elevation'].includes(key) ? -1 : current.preset,
      params: { ...current.params, [key]: clampParam(key, value) },
    }));
  }, [update]);

  const selectPreset = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return null;
    const params = cameraParams(PRESETS[index]);
    const next = update((current) => ({ ...current, preset: index, params: { ...current.params, ...params } }));
    engineRef.current?.setPreset(params);
    return next;
  }, [update]);

  const setQuality = useCallback((quality) => {
    if (!Object.hasOwn(QUALITY, quality)) return null;
    return update((current) => ({ ...current, quality }));
  }, [update]);

  const setDebug = useCallback((debug) => {
    if (!Number.isInteger(debug) || debug < 0 || debug > 9) return null;
    return update((current) => ({ ...current, debug }));
  }, [update]);

  const setTime = useCallback((seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return null;
    engineRef.current?.setTime(seconds);
    return engineRef.current?.getDiagnostics() || { time: seconds };
  }, []);

  const reset = useCallback(() => {
    const next = defaultState();
    engineRef.current?.setTime(0);
    engineRef.current?.setPreset(cameraParams(PRESETS[0]));
    commit(next);
    setApiNotice('All controls reset');
  }, [commit]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let engine;
    try {
      engine = new GargantuaEngine(canvas, () => ({
        state: stateRef.current,
        capture: captureRef.current,
        time: initialRef.current.time,
      }), {
        onReady: () => {
          setReady(true);
          document.documentElement.dataset.gargantuaReady = 'true';
        },
        onContext: (status) => {
          setContext(status);
          document.documentElement.dataset.gargantuaContext = status;
          if (status === 'lost') {
            update((current) => ({ ...current, playing: false }));
            setReady(false);
            document.documentElement.dataset.gargantuaReady = 'false';
          }
        },
        onError: (nextError) => {
          setError(nextError.message);
          setReady(false);
          document.documentElement.dataset.gargantuaReady = 'false';
        },
        onManualControl: () => {
          update((current) => ({ ...current, playing: false, preset: -1 }));
        },
        onCameraChange: (params) => {
          update((current) => ({ ...current, params: { ...current.params, ...params } }));
        },
      });
    } catch (nextError) {
      setError(nextError.message);
      document.documentElement.dataset.gargantuaReady = 'false';
      return;
    }
    engineRef.current = engine;
    engine.setState(stateRef.current);
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [update]);

  useEffect(() => {
    const readState = () => ({
      ...stateRef.current,
      params: { ...stateRef.current.params },
      ready: ready && context === 'live',
      capture: captureRef.current,
      time: engineRef.current?.getDiagnostics().time ?? initialRef.current.time,
      context,
    });
    const api = {
      get ready() {
        return ready && context === 'live';
      },
      getState: readState,
      getDiagnostics() {
        return engineRef.current?.getDiagnostics() || null;
      },
      setQuality(level) {
        const next = setQuality(level);
        return next ? readState() : { ok: false, error: 'quality must be standard, high, or cinematic' };
      },
      setPreset(index) {
        const next = selectPreset(index);
        return next ? readState() : { ok: false, error: 'preset must be an integer from 0 to 3' };
      },
      setDebug(index) {
        const next = setDebug(index);
        return next ? readState() : { ok: false, error: 'debug must be an integer from 0 to 9' };
      },
      setTime(seconds) {
        const diagnostics = setTime(seconds);
        return diagnostics ? readState() : { ok: false, error: 'time must be a finite non-negative number' };
      },
    };
    Object.defineProperty(window, '__GARGANTUA__', { value: api, configurable: true });
    return () => {
      delete window.__GARGANTUA__;
    };
  }, [context, ready, selectPreset, setDebug, setQuality, setTime]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches('input, select, textarea') || target.isContentEditable)) return;
      if (event.key >= '0' && event.key <= '9') {
        setDebug(Number(event.key));
        return;
      }
      if (event.shiftKey && /^Digit[1-4]$/.test(event.code)) {
        event.preventDefault();
        selectPreset(Number(event.code.slice(-1)) - 1);
        return;
      }
      if (event.code === 'Space') {
        event.preventDefault();
        update((current) => ({ ...current, playing: !current.playing }));
      } else if (event.key.toLowerCase() === 'h') {
        update((current) => ({ ...current, hud: !current.hud }));
      } else if (event.key.toLowerCase() === 'r') {
        reset();
      } else if (event.key.toLowerCase() === 'q') {
        const levels = Object.keys(QUALITY);
        update((current) => ({ ...current, quality: levels[(levels.indexOf(current.quality) + 1) % levels.length] }));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [reset, selectPreset, setDebug, update]);

  const currentPreset = PRESETS[state.preset];
  const quality = QUALITY[state.quality];

  return (
    <main className="experience">
      <canvas ref={canvasRef} className="universe" aria-label="Interactive Schwarzschild black hole raytracer" />

      {!ready && !error && context === 'live' && (
        <div className="loading" role="status">
          <span className="loading-orbit" />
          <span>Integrating null geodesics…</span>
        </div>
      )}

      {context !== 'live' && (
        <div className="context-notice" role="status">
          <span className="context-dot" />
          {context === 'lost' ? 'WebGL context lost — waiting for restoration' : context === 'failed' ? 'WebGL recovery failed' : 'Restoring WebGL resources…'}
        </div>
      )}

      {error && (
        <div className="fatal" role="alert">
          <strong>Renderer unavailable</strong>
          <span>{error}</span>
        </div>
      )}

      {!state.hud && !captureRef.current && (
        <button className="hud-restore" onClick={() => update((current) => ({ ...current, hud: true }))}>
          HUD <kbd>H</kbd>
        </button>
      )}

      {state.hud && (
        <div className={`hud ${state.hudCollapsed ? 'is-collapsed' : ''}`}>
          <header className="brand">
            <div>
              <p className="eyebrow">Schwarzschild raytracer</p>
              <h1>GARGANTUA</h1>
            </div>
            <button
              className="icon-button collapse-button"
              aria-label={state.hudCollapsed ? 'Expand HUD' : 'Collapse HUD'}
              onClick={() => update((current) => ({ ...current, hudCollapsed: !current.hudCollapsed }))}
            >
              {state.hudCollapsed ? '＋' : '−'}
            </button>
          </header>

          <div className="hud-body">
            <section className="status-strip" aria-label="Renderer status">
              <span><i className="live-dot" />{quality.label}</span>
              <span>DEBUG {state.debug}</span>
              <span>{state.playing && !captureRef.current ? 'CINEMA' : 'MANUAL'}</span>
            </section>

            <section className="panel-section">
              <div className="section-heading">
                <h2>Viewpoints</h2>
                <span>{currentPreset ? currentPreset.name : 'Custom orbit'}</span>
              </div>
              <div className="preset-grid">
                {PRESETS.map((preset, index) => (
                  <button
                    key={preset.name}
                    className={`preset preset-${index} ${state.preset === index ? 'active' : ''}`}
                    onClick={() => selectPreset(index)}
                    aria-pressed={state.preset === index}
                  >
                    <span className="preset-orbit" />
                    <span className="preset-copy"><strong>{preset.name}</strong><small>{preset.caption}</small></span>
                    <kbd>⇧{index + 1}</kbd>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel-section transport">
              <button className="play-button" onClick={() => update((current) => ({ ...current, playing: !current.playing }))}>
                {state.playing && !captureRef.current ? 'Ⅱ Pause cinema' : '▶ Play cinema'}
              </button>
              <div className="quality-switch" aria-label="Quality">
                {Object.entries(QUALITY).map(([key, item]) => (
                  <button key={key} className={state.quality === key ? 'active' : ''} onClick={() => setQuality(key)}>
                    {item.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="panel-section debug-section">
              <div className="section-heading">
                <h2>Diagnostics</h2>
                <span>{DEBUG_VIEWS[state.debug]}</span>
              </div>
              <div className="debug-grid">
                {DEBUG_VIEWS.map((label, index) => (
                  <button
                    key={label}
                    className={state.debug === index ? 'active' : ''}
                    title={label}
                    aria-label={`Debug ${index}: ${label}`}
                    onClick={() => setDebug(index)}
                  >
                    {index}
                  </button>
                ))}
              </div>
            </section>

            <section className="panel-section parameters-section">
              <div className="section-heading">
                <h2>Parameters</h2>
                <span>21 live controls</span>
              </div>
              {PARAM_GROUPS.map((group, index) => (
                <details key={group.title} open={index < 2}>
                  <summary>{group.title}</summary>
                  <div className="parameter-list">
                    {group.items.map((item) => (
                      <ParameterSlider key={item.key} item={item} value={state.params[item.key]} onChange={setParameter} />
                    ))}
                  </div>
                </details>
              ))}
            </section>

            <section className="panel-section shortcuts">
              <div className="section-heading"><h2>Controls</h2><span>Drag · pinch · scroll</span></div>
              <p><kbd>0</kbd>–<kbd>9</kbd> debug <kbd>⇧1</kbd>–<kbd>⇧4</kbd> viewpoints <kbd>Space</kbd> cinema</p>
              <p><kbd>H</kbd> HUD <kbd>R</kbd> reset <kbd>Q</kbd> quality</p>
              <button className="reset-button" onClick={reset}>Reset all controls</button>
            </section>
          </div>
        </div>
      )}

      {state.hud && !state.hudCollapsed && (
        <div className="preset-dock" aria-label="Quick viewpoints">
          {PRESETS.map((preset, index) => (
            <button key={preset.name} className={state.preset === index ? 'active' : ''} onClick={() => selectPreset(index)}>
              <span>0{index + 1}</span>{preset.name}
            </button>
          ))}
        </div>
      )}

      {state.debug !== 0 && state.hud && (
        <div className="debug-badge">DEBUG {state.debug}<span>{DEBUG_VIEWS[state.debug]}</span></div>
      )}

      {apiNotice && <div className="sr-only" role="status">{apiNotice}</div>}
    </main>
  );
}

export default App;
