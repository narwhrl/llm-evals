import React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRaytracer } from './renderer.js';
import {
  DEBUG_LABELS,
  DEFAULT_PARAMETERS,
  PRESETS,
  QUALITY_BUDGETS,
  getParameterMeta,
  getPresetNames,
} from './state.js';

const QUALITY_LABELS = ['standard', 'high', 'cinematic'];

function clampStep(value, min, max, step) {
  const next = Math.min(max, Math.max(min, value));
  // Snap to the step grid; min becomes the base.
  const snapped = Math.round((next - min) / step) * step + min;
  return Math.min(max, Math.max(min, snapped));
}

function formatNumber(value) {
  if (Math.abs(value) >= 100) return value.toFixed(0);
  if (Math.abs(value) >= 10) return value.toFixed(1);
  if (Math.abs(value) >= 1)  return value.toFixed(2);
  return value.toFixed(3);
}

function PresetButton({ index, active, label, onActivate }) {
  return (
    <button
      type="button"
      className={'preset-btn' + (active ? ' active' : '')}
      data-preset={index}
      onClick={() => onActivate(index)}
      aria-pressed={active}
      aria-label={`Preset ${index + 1}: ${label}`}
    >
      <span className="preset-num">{index + 1}</span>
      <span className="preset-name">{label}</span>
    </button>
  );
}

function QualityButton({ level, active, onActivate }) {
  return (
    <button
      type="button"
      className={'quality-btn' + (active ? ' active' : '')}
      data-quality={level}
      onClick={() => onActivate(level)}
      aria-pressed={active}
    >
      {level}
    </button>
  );
}

function DebugOption({ value, label, active, onActivate }) {
  return (
    <button
      type="button"
      className={'debug-btn' + (active ? ' active' : '')}
      data-debug={value}
      onClick={() => onActivate(value)}
      aria-pressed={active}
      title={label}
    >
      <span className="debug-key">{value}</span>
      <span className="debug-name">{label}</span>
    </button>
  );
}

function ParameterRow({ name, value, meta, onChange }) {
  const handleSlider = useCallback((e) => {
    const v = Number(e.target.value);
    onChange(name, v);
  }, [name, onChange]);
  const handleNumber = useCallback((e) => {
    const v = Number(e.target.value);
    if (Number.isFinite(v)) onChange(name, clampStep(v, meta.min, meta.max, meta.step));
  }, [name, meta, onChange]);
  const handleReset = useCallback(() => {
    onChange(name, meta.defaultValue);
  }, [name, meta.defaultValue, onChange]);
  return (
    <div className="param-row" data-param={name}>
      <label className="param-label" htmlFor={`param-${name}`}>{meta.label}</label>
      <input
        id={`param-${name}`}
        type="range"
        min={meta.min}
        max={meta.max}
        step={meta.step}
        value={value}
        onChange={handleSlider}
        className="param-range"
      />
      <input
        type="number"
        min={meta.min}
        max={meta.max}
        step={meta.step}
        value={formatNumber(value)}
        onChange={handleNumber}
        className="param-number"
      />
      <button
        type="button"
        className="param-reset"
        onClick={handleReset}
        aria-label={`Reset ${meta.label}`}
        title="Reset to default"
      >
        ↺
      </button>
    </div>
  );
}

export function App({ store }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const containerRef = useRef(null);
  // On portrait / coarse-pointer devices we start with the HUD
  // collapsed so the black-hole structure is immediately visible.
  // A tap on the FAB expands the drawer; the toggle inside the header
  // flips back to collapsed.  This mirrors how mobile users expect a
  // full-bleed canvas experience with on-demand controls.
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const narrow = window.matchMedia('(max-width: 720px)').matches;
      return coarse && narrow;
    } catch (_) {
      return false;
    }
  });
  const [status, setStatus] = useState({ kind: 'booting', message: '' });
  const [focused, setFocused] = useState(false);
  // React when the viewport crosses the mobile threshold so a desktop
  // session rotated into portrait collapses the HUD automatically.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const mql = window.matchMedia('(max-width: 720px)');
    const coarseMql = window.matchMedia('(pointer: coarse)');
    function handle() {
      if (coarseMql.matches && mql.matches) setCollapsed(true);
    }
    handle();
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handle);
      return () => mql.removeEventListener('change', handle);
    }
    return undefined;
  }, []);
  // The store notifies on every config change and on time-tick (~1Hz
  // while playing).  We use a single subscription and aggregate the
  // values needed for the HUD into component state so the canvas /
  // renderer hot-path stays untouched.
  const [tick, setTick] = useState(() => store.getState());
  useEffect(() => {
    const unsub = store.subscribe((snap) => {
      setTick({
        time: snap.time,
        capture: !!snap.capture,
        parameters: snap.parameters,
        quality: snap.quality,
        preset: snap.preset,
        debug: snap.debug,
        hud: snap.hud,
        playing: snap.playing,
      });
    });
    return unsub;
  }, [store]);

  const params = tick.parameters;
  const quality = tick.quality;
  const preset = tick.preset;
  const debug = tick.debug;
  const playing = tick.playing;
  const hudVisible = tick.hud;
  const time = tick.time;
  const capture = tick.capture;
  // We use an imperative subscription (rather than useSyncExternalStore)
  // so we can pluck the fields the HUD needs without rebuilding the
  // entire React tree on every notification.

  // Build parameter metadata enriched with defaults.  We reuse the
  // exported DEFAULT_PARAMETERS from state.js so the per-row reset
  // button is always in lockstep with the store's true defaults.
  const parameterMeta = useMemo(() => {
    const meta = getParameterMeta();
    const out = {};
    for (const [name, m] of Object.entries(meta)) {
      out[name] = Object.freeze({
        ...m,
        defaultValue: DEFAULT_PARAMETERS[name],
      });
    }
    return out;
  }, []);

  const paramOrder = useMemo(
    () => Object.keys(parameterMeta),
    [parameterMeta],
  );

  const presetNames = useMemo(() => getPresetNames(), []);

  // ---- store actions ----
  const handlePreset = useCallback((index) => {
    store.setPreset(index);
  }, [store]);
  const handleQuality = useCallback((level) => {
    store.setQuality(level);
  }, [store]);
  const handleDebug = useCallback((d) => {
    store.setDebug(d);
  }, [store]);
  const handleParameter = useCallback((name, value) => {
    store.setParameter(name, value);
  }, [store]);
  const handleTogglePlay = useCallback(() => {
    store.setPlaying(!tick.playing);
  }, [store, tick.playing]);
  const handleResetAll = useCallback(() => {
    store.reset();
  }, [store]);
  const handleToggleHud = useCallback(() => {
    store.setHud(!tick.hud);
  }, [store, tick.hud]);

  // ---- keyboard shortcuts ----
  useEffect(() => {
    function isTypingTarget(target) {
      if (!target) return false;
      const tag = (target.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
      if (target.isContentEditable) return true;
      return false;
    }
    function onKey(e) {
      if (isTypingTarget(e.target)) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.shiftKey) {
        // Use `code` (Digit1..Digit4) so the handler works regardless
        // of keyboard layout where Shift+3 maps to '#' on key='3'.
        if (e.code === 'Digit1' || e.code === 'Digit2' ||
            e.code === 'Digit3' || e.code === 'Digit4') {
          const idx = Number(e.code.slice(-1)) - 1;
          handlePreset(idx);
          e.preventDefault();
          return;
        }
      }
      if (e.key === ' ') {
        if (!tick.capture) handleTogglePlay();
        e.preventDefault();
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        handleToggleHud();
        e.preventDefault();
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        handleResetAll();
        e.preventDefault();
        return;
      }
      if (e.key === 'q' || e.key === 'Q') {
        const order = ['standard', 'high', 'cinematic'];
        const cur = order.indexOf(tick.quality);
        const next = order[(cur + 1) % order.length];
        handleQuality(next);
        e.preventDefault();
        return;
      }
      if (e.key >= '0' && e.key <= '9') {
        handleDebug(Number(e.key));
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    handlePreset,
    handleTogglePlay,
    handleToggleHud,
    handleResetAll,
    handleQuality,
    handleDebug,
    tick.quality,
  ]);

  // ---- track focused input to suppress HUD focus styles elsewhere ----
  useEffect(() => {
    function onFocus(e) {
      const t = e.target;
      if (!t) return;
      const tag = (t.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA') setFocused(true);
    }
    function onBlur(e) {
      const t = e.target;
      if (!t) return;
      const tag = (t.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        // Defer slightly to allow focus to settle on another input.
        setTimeout(() => {
          const active = document.activeElement;
          if (!active) { setFocused(false); return; }
          const atag = (active.tagName || '').toUpperCase();
          if (atag !== 'INPUT' && atag !== 'TEXTAREA') setFocused(false);
        }, 0);
      }
    }
    window.addEventListener('focus', onFocus, true);
    window.addEventListener('blur', onBlur, true);
    return () => {
      window.removeEventListener('focus', onFocus, true);
      window.removeEventListener('blur', onBlur, true);
    };
  }, []);

  // ---- renderer lifecycle ----
  useEffect(() => {
    let cancelled = false;
    // Map renderer status → store status (so __GARGANTUA__.ready and
    // document.documentElement.dataset.gargantuaReady see the same
    // value as the local React state).  Without this bridge the
    // public API would be stuck on 'booting' forever.
    function handleStatus(s) {
      if (cancelled) return;
      let mapped;
      if (s.ready) {
        mapped = { kind: 'ready', message: '' };
      } else if (s.lost) {
        mapped = { kind: 'lost', message: 'WebGL context lost — auto-restoring.' };
      } else if (s.error) {
        mapped = { kind: 'error', message: s.error };
      } else {
        mapped = { kind: 'booting', message: '' };
      }
      setStatus(mapped);
      store.setStatus(mapped);
    }
    try {
      const api = createRaytracer(canvasRef.current, store, handleStatus);
      rendererRef.current = api;
    } catch (err) {
      const mapped = { kind: 'error', message: String(err && err.message || err) };
      setStatus(mapped);
      store.setStatus(mapped);
    }
    return () => {
      cancelled = true;
      if (rendererRef.current) {
        try { rendererRef.current.dispose(); } catch (_) {}
        rendererRef.current = null;
      }
    };
  }, [store]);

  const qualityLabel = QUALITY_LABELS.includes(quality) ? quality : 'high';
  const qualityBudget = QUALITY_BUDGETS[quality] || QUALITY_BUDGETS.high;
  const debugName = DEBUG_LABELS[debug] || DEBUG_LABELS[0];

  const showHud = hudVisible && status.kind !== 'error';

  return (
    <div
      ref={containerRef}
      className={
        'app' +
        (status.kind === 'ready' ? ' ready' : '') +
        (status.kind === 'error' ? ' error-state' : '') +
        (status.kind === 'lost' ? ' lost-state' : '') +
        (capture ? ' capture-mode' : '') +
        (focused ? ' hud-focused' : '')
      }
      data-status={status.kind}
    >
      <canvas ref={canvasRef} aria-label="Schwarzschild black-hole raytracer" />

      <div
        className={
          'status-overlay' +
          (status.kind === 'ready' ? ' hidden' : '') +
          (status.kind === 'error' ? ' error' : '') +
          (status.kind === 'lost' ? ' lost' : '')
        }
        role="status"
      >
        <div className="status-inner">
          {status.kind === 'booting' && (
            <>
              <div className="spinner" aria-hidden="true" />
              <p>Initialising WebGL raytracer…</p>
            </>
          )}
          {status.kind === 'lost' && <p>{status.message}</p>}
          {status.kind === 'error' && <p>WebGL error: {status.message}</p>}
        </div>
      </div>

      {/* Always-visible recovery button: when the full HUD is hidden
          the user has no keyboard or way to bring it back on devices
          without an H key (e.g. phones, kvm).  The floating button
          stays anchored in a corner and toggles the same store flag
          the keyboard shortcut does.  Capture-mode screenshots hide
          the FAB entirely — the HUD must not bleed into the captured
          frame even when the user has explicitly hidden it.  H key
          on desktop still toggles HUD back; mobile under capture
          cannot, by design (capture is a screenshot mode). */}
      <button
        type="button"
        className={'hud-fab' + (showHud || capture ? ' hidden' : '')}
        onClick={handleToggleHud}
        aria-label="Show HUD"
        title="Show HUD (H)"
      >
        ☰ HUD
      </button>

      {showHud && (
        <aside
          className={'hud' + (collapsed ? ' collapsed' : '')}
          role="region"
          aria-label="Raytracer HUD"
        >
          <header className="hud-header">
            <button
              type="button"
              className="hud-toggle"
              onClick={() => setCollapsed((c) => !c)}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Expand HUD' : 'Collapse HUD'}
              title={collapsed ? 'Expand HUD' : 'Collapse HUD'}
            >
              {collapsed ? '☰' : '×'}
            </button>
            <h1 className="hud-title">GARGANTUA</h1>
            <span className="hud-status">
              <span className={'status-dot ' + status.kind} />
              <span className="hud-status-line">
                {quality} · debug {debug} · {playing ? 'playing' : 'paused'} · t = {formatNumber(time)} s
              </span>
            </span>
          </header>

          {!collapsed && (
            <div className="hud-body">
              <section className="hud-section">
                <h2>Presets</h2>
                <div className="preset-row">
                  {PRESETS.map((p, i) => (
                    <PresetButton
                      key={i}
                      index={i}
                      active={preset === i}
                      label={presetNames[i] || `preset ${i + 1}`}
                      onActivate={handlePreset}
                    />
                  ))}
                </div>
              </section>

              <section className="hud-section">
                <h2>Quality</h2>
                <div className="quality-row">
                  {QUALITY_LABELS.map((l) => (
                    <QualityButton
                      key={l}
                      level={l}
                      active={qualityLabel === l}
                      onActivate={handleQuality}
                    />
                  ))}
                </div>
                <div className="quality-budget">
                  scale {qualityBudget.scale.toFixed(2)} ·{' '}
                  steps {qualityBudget.maxSteps} ·{' '}
                  crossings {qualityBudget.maxCrossings} ·{' '}
                  bloom taps {qualityBudget.bloomTaps}
                </div>
              </section>

              <section className="hud-section">
                <h2>Playback</h2>
                <div className="playback-row">
                  <button
                    type="button"
                    className={'play-btn' + (playing ? ' playing' : '')}
                    onClick={handleTogglePlay}
                    aria-pressed={playing}
                    disabled={capture}
                  >
                    {capture ? 'frozen' : (playing ? 'pause movie' : 'play movie')}
                  </button>
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={handleResetAll}
                    title="Reset all parameters to defaults"
                  >
                    reset all
                  </button>
                </div>
              </section>

              <section className="hud-section">
                <h2>Debug view</h2>
                <div className="debug-grid">
                  {DEBUG_LABELS.map((label, i) => (
                    <DebugOption
                      key={i}
                      value={i}
                      label={label}
                      active={debug === i}
                      onActivate={handleDebug}
                    />
                  ))}
                </div>
                <div className="debug-current">
                  current: {debug} — {debugName}
                </div>
              </section>

              <section className="hud-section">
                <h2>Parameters</h2>
                <div className="param-list">
                  {paramOrder.map((name) => (
                    <ParameterRow
                      key={name}
                      name={name}
                      value={params[name]}
                      meta={parameterMeta[name]}
                      onChange={handleParameter}
                    />
                  ))}
                </div>
              </section>

              <section className="hud-section">
                <h2>Keys</h2>
                <ul className="keys-list">
                  <li><kbd>Space</kbd> toggle movie</li>
                  <li><kbd>H</kbd> toggle HUD</li>
                  <li><kbd>R</kbd> reset all</li>
                  <li><kbd>Q</kbd> cycle quality</li>
                  <li><kbd>Shift+1..4</kbd> preset</li>
                  <li><kbd>0..9</kbd> debug view</li>
                </ul>
              </section>

              <footer className="hud-footer">
                <span className="hud-credit">
                  Local Three.js · Schwarzschild null geodesic
                </span>
              </footer>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}