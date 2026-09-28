import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RaytracerEngine } from './engine.js';
import {
  CONTROLS, DEBUG_VIEWS, PRESETS, QUALITY, STORAGE_KEY,
  defaultState, initialState, persistState, presetCamera, stateSnapshot, validateControl,
} from './state.js';

const qualityNames = Object.keys(QUALITY);
const groups = [...new Set(CONTROLS.map((control) => control.group))];
const cameraKeys = new Set(['fov', 'distance', 'azimuth', 'elevation']);

function formatValue(control, value) {
  const places = control.step < 0.001 ? 4 : control.step < 0.01 ? 3 : control.step < 1 ? 2 : 0;
  return `${Number(value).toFixed(places)}${control.unit}`;
}

export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [state, setState] = useState(() => initialState());
  const stateRef = useRef(state);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [contextTestAvailable, setContextTestAvailable] = useState(false);

  const update = useCallback((transform) => {
    const next = transform(stateRef.current);
    stateRef.current = next;
    setState(next);
    persistState(next);
    return next;
  }, []);

  const setQuality = useCallback((level) => {
    if (!Object.hasOwn(QUALITY, level)) return { ok: false, error: 'Invalid quality level' };
    const next = update((current) => ({ ...current, quality: level }));
    engineRef.current?.resize();
    return stateSnapshot(next);
  }, [update]);

  const setPreset = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index > 3) return { ok: false, error: 'Invalid preset index' };
    const camera = presetCamera(index, window.matchMedia('(max-width: 600px)').matches);
    const next = update((current) => ({
      ...current,
      preset: index,
      cinematic: false,
      params: { ...current.params, ...camera },
    }));
    engineRef.current?.syncCamera();
    return stateSnapshot(next);
  }, [update]);

  const setDebug = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index > 9) return { ok: false, error: 'Invalid debug view' };
    return stateSnapshot(update((current) => ({ ...current, debug: index })));
  }, [update]);

  const setTime = useCallback((seconds) => {
    if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return { ok: false, error: 'Time must be a finite non-negative number' };
    const next = update((current) => ({ ...current, time: seconds }));
    engineRef.current?.setTime(seconds);
    return stateSnapshot(next);
  }, [update]);

  const setControl = useCallback((key, value) => {
    const number = Number(value);
    if (!validateControl(key, number)) return;
    update((current) => ({
      ...current,
      params: { ...current.params, [key]: number },
      ...(cameraKeys.has(key) ? { preset: null, cinematic: false } : {}),
    }));
    if (cameraKeys.has(key)) engineRef.current?.syncCamera();
  }, [update]);

  const reset = useCallback(() => {
    if (!stateRef.current.capture) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be unavailable. */ }
    }
    const mobile = window.matchMedia('(max-width: 600px)').matches;
    const next = stateRef.current.capture ? initialState(window.location.search, mobile) : defaultState(mobile);
    stateRef.current = next;
    setState(next);
    persistState(next);
    engineRef.current?.setTime(next.time);
    engineRef.current?.syncCamera();
    engineRef.current?.resize();
    return stateSnapshot(next);
  }, []);

  useEffect(() => {
    let engine;
    document.documentElement.dataset.gargantuaReady = 'false';
    const publicApi = {
      get ready() { return Boolean(engineRef.current?.ready); },
      getState() {
        const snapshot = stateSnapshot(stateRef.current);
        snapshot.time = engineRef.current?.getTime() ?? snapshot.time;
        return snapshot;
      },
      setQuality,
      setPreset,
      setDebug,
      setTime,
    };
    Object.defineProperty(window, '__GARGANTUA__', { configurable: true, value: Object.freeze(publicApi) });
    try {
      engine = new RaytracerEngine(canvasRef.current, () => stateRef.current, {
        onCameraChange: (camera) => {
          update((current) => ({
            ...current,
            params: { ...current.params, ...camera },
            preset: null,
            cinematic: false,
          }));
        },
        onStatus: (nextStatus) => {
          document.documentElement.dataset.gargantuaReady = 'false';
          setStatus(nextStatus);
        },
        onReady: () => {
          document.documentElement.dataset.gargantuaReady = 'true';
          setStatus('ready');
          setError('');
        },
        onError: (cause) => {
          document.documentElement.dataset.gargantuaReady = 'false';
          setError(String(cause?.message || cause));
          setStatus('error');
          console.error(cause);
        },
      });
      engineRef.current = engine;
      setContextTestAvailable(engine.canTestContextRecovery());
    } catch (cause) {
      setError(String(cause?.message || cause));
      setStatus('error');
      console.error(cause);
    }
    return () => {
      engine?.dispose();
      engineRef.current = null;
      delete window.__GARGANTUA__;
      delete document.documentElement.dataset.gargantuaReady;
    };
  }, [setDebug, setPreset, setQuality, setTime, update]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const key = event.key.toLowerCase();
      if (event.shiftKey && /^Digit[1-4]$/.test(event.code)) {
        event.preventDefault();
        setPreset(Number(event.code.slice(-1)) - 1);
      } else if (!event.shiftKey && /^[0-9]$/.test(key)) {
        event.preventDefault();
        setDebug(Number(key));
      } else if (key === ' ') {
        event.preventDefault();
        if (!stateRef.current.capture) update((current) => ({ ...current, cinematic: !current.cinematic }));
      } else if (key === 'h') {
        update((current) => ({ ...current, hud: !current.hud }));
      } else if (key === 'r') {
        reset();
      } else if (key === 'q') {
        const current = qualityNames.indexOf(stateRef.current.quality);
        setQuality(qualityNames[(current + 1) % qualityNames.length]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reset, setDebug, setPreset, setQuality, update]);

  const toggleHud = () => update((current) => ({ ...current, hud: !current.hud }));
  const toggleDrawer = () => update((current) => ({ ...current, drawer: !current.drawer }));
  const toggleCinematic = () => {
    if (!state.capture) update((current) => ({ ...current, cinematic: !current.cinematic }));
  };

  return (
    <main className="app">
      <canvas ref={canvasRef} className="universe" aria-label="Interactive Schwarzschild black hole raytracer" />
      <div className="edge-glow" aria-hidden="true" />

      {status !== 'ready' && (
        <div className={`status ${status === 'error' ? 'status-error' : ''}`} role="status">
          <span className="status-light" />
          {status === 'loading' && 'INITIALIZING GEODESICS'}
          {status === 'lost' && 'WEBGL CONTEXT LOST · WAITING TO RESTORE'}
          {status === 'restoring' && 'RESTORING RENDERER'}
          {status === 'error' && `RENDER ERROR · ${error}`}
        </div>
      )}

      {state.hud && (
        <>
          <header className="masthead">
            <div className="eyebrow"><span className="eyebrow-line" /> A REAL-TIME RELATIVITY EXPERIMENT <span className="eyebrow-line" /></div>
            <h1>GARGANTUA<span className="title-dot">.</span></h1>
            <p>SCHWARZSCHILD BLACK HOLE RAYTRACER <span className="masthead-sep">/</span> M = 1</p>
          </header>

          <div className="side-index" aria-hidden="true">
            <span>01</span><span className="index-line" /><span>∞</span>
          </div>

          <section className="readout" aria-label="Scene status">
            <div className="readout-title">OBSERVER FEED <span className="live-pip" /> LIVE</div>
            <div className="readout-grid">
              <span>METRIC</span><strong>SCHWARZSCHILD</strong>
              <span>VIEW</span><strong>{state.preset === null ? 'CUSTOM ORBIT' : PRESETS[state.preset].name.toUpperCase()}</strong>
              <span>QUALITY</span><strong>{QUALITY[state.quality].label.toUpperCase()}</strong>
              <span>RAY STATE</span><strong>{DEBUG_VIEWS[state.debug].toUpperCase()}</strong>
            </div>
          </section>

          <nav className="preset-bar" aria-label="Camera presets">
            <span className="preset-label">OBSERVATION POINTS</span>
            <div className="preset-items">
              {PRESETS.map((preset, index) => (
                <button key={preset.name} type="button" className={`preset ${state.preset === index ? 'active' : ''}`} onClick={() => setPreset(index)}>
                  <span className="preset-number">0{index + 1}</span><span>{preset.name}</span>
                </button>
              ))}
            </div>
          </nav>

          <button className="mobile-open" type="button" onClick={toggleDrawer} aria-expanded={state.drawer}>
            {state.drawer ? 'CLOSE CONTROLS' : 'OPEN CONTROLS'} <span>{state.drawer ? '×' : '☷'}</span>
          </button>

          <aside className={`control-panel ${state.drawer ? 'mobile-expanded' : ''}`} aria-label="Raytracer controls">
            <div className="panel-heading">
              <div><span className="panel-kicker">MISSION CONTROL / 001</span><h2>Observer controls</h2></div>
              <button type="button" className="icon-button" onClick={toggleHud} title="Hide HUD (H)" aria-label="Hide HUD">×</button>
            </div>
            <div className="panel-scroll">
              <div className="panel-section panel-first">
                <div className="section-title"><span>RENDER BUDGET</span><span>01 / 05</span></div>
                <div className="quality-switch" role="group" aria-label="Quality">
                  {qualityNames.map((name) => <button key={name} type="button" className={state.quality === name ? 'selected' : ''} onClick={() => setQuality(name)}>{QUALITY[name].label}</button>)}
                </div>
                <div className="technical-note">{QUALITY[state.quality].steps} STEPS · {QUALITY[state.quality].diskSamples} DISK SAMPLES · {Math.round(QUALITY[state.quality].scale * 100)}% SCALE</div>
              </div>

              <div className="panel-section">
                <div className="section-title"><span>CAMERA MOTION</span><span>02 / 05</span></div>
                <div className="motion-row"><div><strong>Cinematic orbit</strong><small>{state.capture ? 'Frozen for capture' : state.cinematic ? 'Playing' : 'Paused'}</small></div><button type="button" onClick={toggleCinematic} disabled={state.capture}>{state.cinematic ? 'PAUSE' : 'PLAY'}</button></div>
              </div>

              {groups.map((group, groupIndex) => (
                <div className="panel-section" key={group}>
                  <div className="section-title"><span>{group.toUpperCase()}</span><span>{String(groupIndex + 3).padStart(2, '0')} / 06</span></div>
                  {CONTROLS.filter((control) => control.group === group).map((control) => (
                    <label className="control" key={control.key}>
                      <span className="control-header"><span>{control.label}</span><output>{formatValue(control, state.params[control.key])}</output></span>
                      <input type="range" min={control.min} max={control.max} step={control.step} value={state.params[control.key]}
                        onChange={(event) => setControl(control.key, event.target.value)} aria-label={control.label} />
                    </label>
                  ))}
                </div>
              ))}

              <div className="panel-section">
                <div className="section-title"><span>DIAGNOSTICS</span><span>07 / 07</span></div>
                <div className="debug-grid" role="group" aria-label="Debug views">
                  {DEBUG_VIEWS.map((label, index) => <button key={label} type="button" title={label} className={state.debug === index ? 'selected' : ''} onClick={() => setDebug(index)}>{index}</button>)}
                </div>
                <p className="debug-caption">{String(state.debug).padStart(2, '0')} — {DEBUG_VIEWS[state.debug]}</p>
                <button type="button" className="context-test" disabled={!contextTestAvailable || status !== 'ready'}
                  onClick={() => engineRef.current?.testContextRecovery()}>
                  {contextTestAvailable ? 'TEST WEBGL RECOVERY' : 'WEBGL RECOVERY TEST UNAVAILABLE'}
                </button>
              </div>

              <div className="panel-footer">
                <button type="button" className="reset-button" onClick={reset}>↺ &nbsp; RESET TO DEFAULTS</button>
                <p>0–9 DEBUG &nbsp;·&nbsp; SHIFT+1–4 PRESETS<br />SPACE MOTION &nbsp;·&nbsp; H HUD &nbsp;·&nbsp; R RESET &nbsp;·&nbsp; Q QUALITY</p>
                <p>DRAG TO ORBIT &nbsp;·&nbsp; SCROLL / PINCH TO ZOOM</p>
              </div>
            </div>
          </aside>
        </>
      )}
      {!state.hud && !state.capture && <button type="button" className="restore-hud" onClick={toggleHud}>SHOW HUD · H</button>}
    </main>
  );
}
