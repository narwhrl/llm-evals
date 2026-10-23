import { useCallback, useEffect, useRef, useState } from 'react';
import { GargantuaEngine } from './GargantuaEngine.js';
import {
  DEBUG_VIEWS,
  PARAMETER_GROUPS,
  PARAMETERS,
  PRESETS,
  QUALITY_PROFILES,
  cameraParamsForPreset,
  createDefaultState,
  formatParameter,
  getInitialState,
  normalizeState,
  persistState,
} from './config.js';

const CAMERA_KEYS = new Set(['fov', 'distance', 'azimuth', 'elevation']);
const QUALITY_LEVELS = Object.keys(QUALITY_PROFILES);

function OrbitMark() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="5.2" fill="currentColor" />
      <ellipse cx="22" cy="22" rx="19" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(-28 22 22)" />
      <ellipse cx="22" cy="22" rx="14" ry="19" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.45" transform="rotate(38 22 22)" />
      <circle cx="38" cy="13" r="1.8" fill="currentColor" />
    </svg>
  );
}

function ParameterControl({ definition, value, onChange }) {
  const progress = ((value - definition.min) / (definition.max - definition.min)) * 100;
  return (
    <div className="parameter">
      <div className="parameter-label">
        <label htmlFor={`parameter-${definition.key}`}>{definition.label}</label>
        <output htmlFor={`parameter-${definition.key}`}>{formatParameter(definition, value)}</output>
      </div>
      <input
        id={`parameter-${definition.key}`}
        aria-label={definition.label}
        data-parameter={definition.key}
        type="range"
        min={definition.min}
        max={definition.max}
        step={definition.step}
        value={value}
        style={{ '--range-progress': `${progress}%` }}
        onChange={(event) => onChange(definition.key, Number(event.target.value))}
      />
    </div>
  );
}

export default function App() {
  const initialRef = useRef(null);
  if (!initialRef.current) initialRef.current = getInitialState();
  const { capture } = initialRef.current;
  const [state, setState] = useState(initialRef.current.state);
  const stateRef = useRef(state);
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [contextStatus, setContextStatus] = useState('initializing');
  const [fatalError, setFatalError] = useState('');
  const [notice, setNotice] = useState('');
  const noticeTimer = useRef(0);
  const actionsRef = useRef({});

  const announce = useCallback((message) => {
    setNotice(message);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2600);
  }, []);

  const getPublicState = useCallback(() => {
    const snapshot = JSON.parse(JSON.stringify(stateRef.current));
    return {
      ...snapshot,
      ready: readyRef.current,
      capture,
      time: engineRef.current?.simTime ?? initialRef.current.simTime,
      render: engineRef.current?.getRenderInfo() ?? null,
    };
  }, [capture]);

  const commit = useCallback((update, options = {}) => {
    const patch = typeof update === 'function' ? update(stateRef.current) : update;
    const merged = {
      ...stateRef.current,
      ...patch,
      params: patch.params ? { ...stateRef.current.params, ...patch.params } : stateRef.current.params,
    };
    const next = normalizeState(merged);
    stateRef.current = next;
    setState(next);
    engineRef.current?.applyState(next, options);
    return next;
  }, []);

  const setQuality = useCallback((level) => {
    if (!QUALITY_LEVELS.includes(level)) return null;
    commit({ quality: level });
    return getPublicState();
  }, [commit, getPublicState]);

  const setPreset = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return null;
    commit({ preset: index, playing: false, params: cameraParamsForPreset(index) }, { syncCamera: true });
    return getPublicState();
  }, [commit, getPublicState]);

  const setDebug = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= DEBUG_VIEWS.length) return null;
    commit({ debug: index });
    return getPublicState();
  }, [commit, getPublicState]);

  const setTime = useCallback((seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return null;
    if (engineRef.current && !engineRef.current.setTime(seconds)) return null;
    return getPublicState();
  }, [getPublicState]);

  const updateParameter = useCallback((key, value) => {
    if (!PARAMETERS.some((parameter) => parameter.key === key) || !Number.isFinite(value)) return;
    const movesCamera = CAMERA_KEYS.has(key);
    commit({ params: { [key]: value }, ...(movesCamera ? { playing: false } : {}) }, { syncCamera: movesCamera });
  }, [commit]);

  const togglePlaying = useCallback(() => {
    if (capture) return;
    if (stateRef.current.playing) {
      const camera = engineRef.current?.getCameraParams();
      commit({ playing: false, ...(camera ? { params: camera } : {}) });
    } else {
      commit({ playing: true });
    }
  }, [capture, commit]);

  const reset = useCallback(() => {
    const defaults = createDefaultState();
    if (capture) defaults.playing = false;
    commit(defaults, { syncCamera: true });
    engineRef.current?.setTime(0);
    announce('Default spacetime restored');
  }, [announce, capture, commit]);

  actionsRef.current = {
    setQuality,
    setPreset,
    setDebug,
    setTime,
    togglePlaying,
    reset,
    interruptCamera: (camera) => commit({ playing: false, params: camera }),
    syncCamera: (camera) => commit({ playing: false, params: camera }),
  };

  useEffect(() => {
    if (capture) return undefined;
    const timer = window.setTimeout(() => persistState(state), 70);
    return () => window.clearTimeout(timer);
  }, [capture, state]);

  useEffect(() => {
    if (capture) return undefined;
    const flush = () => persistState(stateRef.current);
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, [capture]);

  useEffect(() => {
    let active = true;
    try {
      const engine = new GargantuaEngine(mountRef.current, stateRef.current, {
        capture,
        simTime: initialRef.current.simTime,
        callbacks: {
          onInteraction: (camera) => actionsRef.current.interruptCamera(camera),
          onCameraChange: (camera) => actionsRef.current.syncCamera(camera),
          onContextChange: (status, error) => {
            if (!active) return;
            setContextStatus(status);
            if (status === 'lost') {
              readyRef.current = false;
              setReady(false);
              document.documentElement.dataset.gargantuaReady = 'false';
            } else if (status === 'restored') {
              readyRef.current = true;
              setReady(true);
              setFatalError('');
              document.documentElement.dataset.gargantuaReady = 'true';
              announce('WebGL context restored · state recovered');
            } else if (status === 'error') {
              setFatalError(error?.message || 'Unable to restore WebGL resources.');
              document.documentElement.dataset.gargantuaReady = 'false';
            }
          },
        },
      });
      engineRef.current = engine;
      engine.initialize();
      if (active) {
        readyRef.current = true;
        setReady(true);
        setContextStatus('ready');
        document.documentElement.dataset.gargantuaReady = 'true';
      }
    } catch (error) {
      if (active) {
        setFatalError(error?.message || String(error));
        setContextStatus('error');
        document.documentElement.dataset.gargantuaReady = 'false';
      }
    }
    return () => {
      active = false;
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [announce, capture]);

  useEffect(() => {
    const api = {
      get ready() { return readyRef.current; },
      getState: getPublicState,
      setQuality: (level) => actionsRef.current.setQuality(level),
      setPreset: (index) => actionsRef.current.setPreset(index),
      setDebug: (index) => actionsRef.current.setDebug(index),
      setTime: (seconds) => actionsRef.current.setTime(seconds),
    };
    window.__GARGANTUA__ = Object.freeze(api);
    return () => { delete window.__GARGANTUA__; };
  }, [getPublicState]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName))) return;
      if (event.code === 'Space' && target instanceof HTMLElement && target.closest('button')) return;
      let handled = true;
      if (event.shiftKey && /^Digit[1-4]$/.test(event.code)) {
        actionsRef.current.setPreset(Number(event.code.slice(-1)) - 1);
      } else if (!event.shiftKey && /^Digit[0-9]$/.test(event.code)) {
        actionsRef.current.setDebug(Number(event.code.slice(-1)));
      } else if (event.code === 'Space') {
        actionsRef.current.togglePlaying();
      } else if (event.code === 'KeyH') {
        commit({ hudVisible: !stateRef.current.hudVisible });
      } else if (event.code === 'KeyR') {
        actionsRef.current.reset();
      } else if (event.code === 'KeyQ') {
        const current = QUALITY_LEVELS.indexOf(stateRef.current.quality);
        actionsRef.current.setQuality(QUALITY_LEVELS[(current + 1) % QUALITY_LEVELS.length]);
      } else {
        handled = false;
      }
      if (handled) event.preventDefault();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [commit]);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  const profile = QUALITY_PROFILES[state.quality];
  const debug = DEBUG_VIEWS[state.debug];
  const activeParameters = PARAMETERS.filter((parameter) => parameter.group === state.hudSection);

  return (
    <main className={`app ${capture ? 'is-capture' : ''} ${state.hudVisible ? '' : 'hud-is-hidden'}`}>
      <div ref={mountRef} className="scene" />

      {state.hudVisible && (
        <>
          <header className="brand hud-element">
            <div className="brand-mark"><OrbitMark /></div>
            <div>
              <div className="brand-name">GARGANTUA</div>
              <div className="brand-subtitle">SCHWARZSCHILD <span>/</span> RAYTRACER</div>
            </div>
            <div className="brand-status"><i className={ready ? 'online' : ''} />{capture ? 'CAPTURE' : ready ? 'LIVE' : 'INIT'}</div>
          </header>

          <section className="telemetry hud-element" aria-label="Renderer telemetry">
            <div className="telemetry-rule" />
            <dl>
              <div><dt>SPACETIME</dt><dd>M = 0.5 · a = 0</dd></div>
              <div><dt>INTEGRATOR</dt><dd>RK4 / ADAPTIVE</dd></div>
              <div><dt>OBSERVER</dt><dd>{state.params.distance.toFixed(1)} rₛ</dd></div>
            </dl>
            <p>LIGHT, BENT BY GRAVITY.<br />NOTHING HERE IS A TEXTURE.</p>
          </section>

          <nav className="preset-dock hud-element" aria-label="Camera presets">
            <div className="dock-label"><span>OBSERVATION PRESETS</span><span>SHIFT + 1—4</span></div>
            <div className="preset-list">
              {PRESETS.map((preset, index) => (
                <button
                  key={preset.name}
                  className={state.preset === index ? 'preset active' : 'preset'}
                  onClick={() => setPreset(index)}
                  aria-pressed={state.preset === index}
                  title={`${preset.name} · Shift+${index + 1}`}
                >
                  <span className="preset-number">0{index + 1}</span>
                  <span className="preset-copy"><strong>{preset.name}</strong><small>{preset.code}</small></span>
                </button>
              ))}
            </div>
          </nav>

          <aside className={`console hud-element ${state.hudCollapsed ? 'collapsed' : ''}`} aria-label="Spacetime console">
            {state.hudCollapsed ? (
              <button className="collapsed-console" onClick={() => commit({ hudCollapsed: false })} aria-label="Expand spacetime console">
                <span><i className="online" /> CONSOLE</span>
                <b>{state.quality.slice(0, 3).toUpperCase()} · {state.debug}</b>
              </button>
            ) : (
              <>
                <div className="console-header">
                  <div>
                    <div className="eyebrow">FLIGHT MANUAL / 01</div>
                    <h1>Spacetime console</h1>
                  </div>
                  <button className="icon-button" onClick={() => commit({ hudCollapsed: true })} aria-label="Collapse spacetime console" title="Collapse HUD">−</button>
                </div>

                <div className="console-scroll">
                  <section className="console-section quality-section">
                    <div className="section-heading"><span>RENDER BUDGET</span><span>Q TO CYCLE</span></div>
                    <div className="quality-control">
                      {QUALITY_LEVELS.map((level) => (
                        <button key={level} className={state.quality === level ? 'selected' : ''} onClick={() => setQuality(level)} aria-pressed={state.quality === level}>
                          {QUALITY_PROFILES[level].label}
                        </button>
                      ))}
                    </div>
                    <div className="budget-readout"><span>{profile.maxSteps} RK4 STEPS</span><span>{Math.round(profile.scale * 100)}% BUFFER</span></div>
                  </section>

                  <section className="console-section camera-state">
                    <button className={`play-button ${state.playing ? 'playing' : ''}`} onClick={togglePlaying} disabled={capture}>
                      <span className="play-icon">{state.playing ? 'Ⅱ' : '▷'}</span>
                      <span><strong>{state.playing ? 'CINEMATIC LOOP' : 'MANUAL ORBIT'}</strong><small>{capture ? 'FROZEN BY CAPTURE' : 'SPACE TO PLAY / PAUSE'}</small></span>
                      <i className={state.playing ? 'online' : ''} />
                    </button>
                  </section>

                  <section className="console-section debug-section">
                    <div className="section-heading"><span>DIAGNOSTIC VIEW</span><span>{String(state.debug).padStart(2, '0')} / 09</span></div>
                    <div className="debug-grid" role="group" aria-label="Debug views">
                      {DEBUG_VIEWS.map((view, index) => (
                        <button key={view.name} className={state.debug === index ? 'selected' : ''} onClick={() => setDebug(index)} aria-label={`${index}: ${view.name}`} aria-pressed={state.debug === index} title={view.name}>
                          {index}
                        </button>
                      ))}
                    </div>
                    <div className="debug-description"><span>{debug.short}</span><p>{debug.description}</p></div>
                  </section>

                  <section className="console-section parameters-section">
                    <div className="parameter-tabs" role="tablist" aria-label="Parameter groups">
                      {PARAMETER_GROUPS.map((group) => (
                        <button
                          key={group.id}
                          role="tab"
                          aria-selected={state.hudSection === group.id}
                          className={state.hudSection === group.id ? 'selected' : ''}
                          onClick={() => commit({ hudSection: group.id })}
                        >
                          <small>{group.index}</small>{group.label}
                        </button>
                      ))}
                    </div>
                    <div className="parameter-list" role="tabpanel">
                      {activeParameters.map((definition) => (
                        <ParameterControl key={definition.key} definition={definition} value={state.params[definition.key]} onChange={updateParameter} />
                      ))}
                    </div>
                  </section>

                  <section className="console-section shortcuts" aria-label="Keyboard shortcuts">
                    <div className="section-heading"><span>KEY MAP</span><span>LOCAL / OFFLINE</span></div>
                    <div className="shortcut-grid">
                      <span><kbd>0—9</kbd> Diagnostics</span><span><kbd>⇧ 1—4</kbd> Presets</span>
                      <span><kbd>Space</kbd> Camera</span><span><kbd>Q</kbd> Quality</span>
                      <span><kbd>H</kbd> HUD</span><span><kbd>R</kbd> Reset</span>
                    </div>
                  </section>
                </div>

                <div className="console-footer">
                  <span><i className={contextStatus === 'lost' ? 'warning' : 'online'} />{contextStatus === 'lost' ? 'GPU SIGNAL LOST' : 'GEODESICS ONLINE'}</span>
                  <button onClick={reset}>↺ <span>RESET ALL</span></button>
                </div>
              </>
            )}
          </aside>

          <div className="interaction-hint hud-element"><span className="mouse-symbol">⌁</span> DRAG TO ORBIT <i /> SCROLL TO APPROACH</div>
        </>
      )}

      {!state.hudVisible && !capture && (
        <button className="reveal-hud" onClick={() => commit({ hudVisible: true })}>SHOW HUD <kbd>H</kbd></button>
      )}

      {!ready && !fatalError && contextStatus !== 'lost' && (
        <div className="boot-status" role="status"><span /> COMPILING NULL GEODESICS</div>
      )}

      {contextStatus === 'lost' && !fatalError && (
        <div className="recovery-panel" role="alert">
          <OrbitMark />
          <div className="eyebrow">SIGNAL INTERRUPTED</div>
          <h2>WebGL context lost</h2>
          <p>The simulation is paused. Your camera and console state are safe; rendering will resume when the GPU restores the context.</p>
          <div className="recovery-status"><span /> WAITING FOR GPU RECOVERY</div>
        </div>
      )}

      {fatalError && (
        <div className="recovery-panel fatal" role="alert">
          <div className="eyebrow">RENDERER OFFLINE</div>
          <h2>Unable to trace spacetime</h2>
          <p>{fatalError}</p>
          <small>A WebGL 2 capable browser with floating-point render targets is required.</small>
        </div>
      )}

      {notice && <div className="notice" role="status">{notice}</div>}
    </main>
  );
}
