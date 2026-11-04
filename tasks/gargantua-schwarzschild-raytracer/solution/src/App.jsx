import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GargantuaEngine } from './gargantua.js';
import {
  DEFAULTS, PARAMS, PRESETS, QUALITY, QUALITY_ORDER, DEBUG_VIEWS,
  loadState, saveState, clearState, applyUrlParams,
} from './config.js';
import './styles.css';

const GROUPS = ['Camera', 'Simulation', 'Disk', 'Background', 'Post'];

function formatValue(v, p) {
  if (p.step >= 1) return v.toFixed(0);
  if (p.step >= 0.01) return v.toFixed(2);
  return v.toFixed(3);
}

export default function App() {
  const bootRef = useRef(null);
  if (bootRef.current === null) {
    const boot = applyUrlParams(loadState());
    boot.state.audio = false;   // never auto-start audio (browser autoplay policy)
    bootRef.current = boot;
  }
  const { capture, time: frozenTime } = bootRef.current;

  const [state, setState] = useState(bootRef.current.state);
  const stateRef = useRef(bootRef.current.state);
  const engineRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef({ ctx: null, gain: null });
  const [contextLost, setContextLost] = useState(false);
  const [ready, setReady] = useState(false);

  const updateState = useCallback((patch, opts) => {
    const next = { ...stateRef.current, ...patch };
    stateRef.current = next;
    setState(next);
    engineRef.current?.apply(next, opts);
    saveState(next);
    return next;
  }, []);

  const getApiState = useCallback(() => ({
    ...stateRef.current,
    time: engineRef.current?.getTime() ?? 0,
  }), []);

  const reject = useCallback((error) => ({ ok: false, error, state: getApiState() }), [getApiState]);

  const applyPreset = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return false;
    const { name, ...cam } = PRESETS[index];
    updateState({ preset: index, ...cam, playing: false }, { camera: true });
    return true;
  }, [updateState]);

  const setQuality = useCallback((level) => {
    if (typeof level !== 'string' || !QUALITY[level]) return false;
    updateState({ quality: level });
    return true;
  }, [updateState]);

  const setDebug = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index > 9) return false;
    updateState({ debug: index });
    return true;
  }, [updateState]);

  const setTime = useCallback((seconds) => {
    if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return false;
    engineRef.current?.setTime(seconds);
    return true;
  }, []);

  const cycleQuality = useCallback(() => {
    const i = QUALITY_ORDER.indexOf(stateRef.current.quality);
    updateState({ quality: QUALITY_ORDER[(i + 1) % QUALITY_ORDER.length] });
  }, [updateState]);

  const togglePlaying = useCallback(() => {
    const next = !stateRef.current.playing;
    if (next) engineRef.current?.resumeCinematic();
    updateState({ playing: next });
  }, [updateState]);

  const setParam = useCallback((key, raw) => {
    const p = PARAMS.find((x) => x.key === key);
    if (!p) return;
    const value = Math.min(p.max, Math.max(p.min, Number(raw)));
    const patch = { [key]: value };
    if (p.camera) patch.playing = false;   // manual camera control wins over the loop
    updateState(patch, p.camera ? { camera: true } : undefined);
  }, [updateState]);

  const resetAll = useCallback(() => {
    clearState();
    const next = { ...DEFAULTS, audio: false };
    stateRef.current = next;
    setState(next);
    engineRef.current?.apply(next, { camera: true });
    engineRef.current?.resumeCinematic();
    engineRef.current?.setTime(capture ? frozenTime : 0);
    saveState(next);
  }, [capture, frozenTime]);

  const setAudio = useCallback((on) => {
    if (capture) return;                       // capture mode is silent
    let a = audioRef.current;
    if (on && !a.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 320;
      filter.connect(gain);
      [55, 82.4, 110, 164.8].forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 ? 'sine' : 'triangle';
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = 0.12 / (i + 1);
        osc.connect(g);
        g.connect(filter);
        osc.start();
      });
      a = { ctx, gain };
      audioRef.current = a;
    }
    if (!a.ctx) return;
    a.ctx.resume?.();
    a.gain.gain.setTargetAtTime(on ? 0.06 : 0, a.ctx.currentTime, on ? 0.4 : 0.2);
  }, [capture]);

  const toggleAudio = useCallback(() => {
    const next = !stateRef.current.audio;
    updateState({ audio: next });
    setAudio(next);
  }, [updateState, setAudio]);

  // Engine lifetime: created once, torn down on unmount.
  useEffect(() => {
    const engine = new GargantuaEngine(canvasRef.current, {
      onLost: () => setContextLost(true),
      onRestored: () => setContextLost(false),
      onPlayingChange: (playing) => {
        const next = { ...stateRef.current, playing };
        stateRef.current = next;
        setState(next);
        saveState(next);
      },
      onCameraChange: (cam) => {
        const next = { ...stateRef.current, ...cam };
        stateRef.current = next;
        setState(next);
        saveState(next);
      },
      onReady: () => {
        const api = {
          getState: getApiState,
          setQuality: (level) => (setQuality(level) ? getApiState() : reject('invalid quality')),
          setPreset: (index) => (applyPreset(index) ? getApiState() : reject('invalid preset')),
          setDebug: (index) => (setDebug(index) ? getApiState() : reject('invalid debug')),
          setTime: (seconds) => (setTime(seconds) ? getApiState() : reject('invalid time')),
        };
        Object.defineProperty(api, 'ready', { get: () => true, enumerable: true });
        window.__GARGANTUA__ = api;
        document.documentElement.dataset.gargantuaReady = 'true';
        setReady(true);
      },
    });
    engineRef.current = engine;
    engine.setCapture(capture, frozenTime);
    engine.apply(stateRef.current, { camera: true });
    engine.start();

    const onResize = () => engine.setSizeFromWindow();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      engine.dispose();
      engineRef.current = null;
      delete window.__GARGANTUA__;
      delete document.documentElement.dataset.gargantuaReady;
    };
  }, [capture, frozenTime, getApiState, reject, setQuality, applyPreset, setDebug, setTime]);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.shiftKey && /^Digit[1-4]$/.test(e.code)) {
        e.preventDefault();
        applyPreset(Number(e.code.slice(5)) - 1);
        return;
      }
      if (/^Digit[0-9]$/.test(e.code)) {
        e.preventDefault();
        updateState({ debug: Number(e.code.slice(5)) });
        return;
      }
      switch (e.code) {
        case 'Space': e.preventDefault(); togglePlaying(); break;
        case 'KeyH': updateState({ hudOpen: !stateRef.current.hudOpen }); break;
        case 'KeyR': resetAll(); break;
        case 'KeyQ': cycleQuality(); break;
        case 'KeyM': toggleAudio(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [applyPreset, updateState, togglePlaying, resetAll, cycleQuality, toggleAudio]);

  const q = QUALITY[state.quality] || QUALITY.high;
  const hudOpen = state.hudOpen;

  return (
    <div className="app">
      <canvas ref={canvasRef} className="scene" aria-label="Schwarzschild black hole raytracer" />

      {!capture && (
        <button
          className="hud-toggle"
          onClick={() => updateState({ hudOpen: !hudOpen })}
          title="Toggle HUD (H)"
        >{hudOpen ? 'Hide HUD (H)' : 'Show HUD (H)'}</button>
      )}

      {hudOpen && (
        <div className="hud">
          <div className="panel panel--info">
            <div className="brand">
              <div className="brand__title">GARGANTUA</div>
              <div className="brand__sub">Schwarzschild black hole raytracer</div>
            </div>
            <div className="status">
              <div><span>Quality</span><b>{q.label}</b></div>
              <div><span>Debug view</span><b>{state.debug} · {DEBUG_VIEWS[state.debug]}</b></div>
              <div><span>Camera preset</span><b>{PRESETS[state.preset]?.name ?? '—'}</b></div>
              <div><span>Cinematic</span><b>{capture ? 'Frozen (capture)' : state.playing ? 'Playing' : 'Paused'}</b></div>
              <div><span>Render budget</span><b>{q.maxSteps} steps · {q.bloomPasses} blur</b></div>
              <div><span>Shader</span><b className={ready ? 'ok' : ''}>{ready ? 'Ready' : 'Compiling…'}</b></div>
            </div>
            <div className="keys">
              <div className="keys__title">Shortcuts</div>
              <div>0–9 debug views</div>
              <div>Shift+1–4 camera presets</div>
              <div>Space play / pause cinematic</div>
              <div>H HUD · R reset · Q quality</div>
              <div>M ambient audio</div>
            </div>
          </div>

          <div className="panel panel--controls">
            <div className="row row--buttons">
              <span className="row__label">Presets</span>
              {PRESETS.map((p, i) => (
                <button
                  key={p.name}
                  className={state.preset === i ? 'chip chip--on' : 'chip'}
                  onClick={() => applyPreset(i)}
                  title={`Shift+${i + 1}`}
                >{i + 1} {p.name}</button>
              ))}
            </div>
            <div className="row row--buttons">
              <span className="row__label">Quality</span>
              {QUALITY_ORDER.map((level) => (
                <button
                  key={level}
                  className={state.quality === level ? 'chip chip--on' : 'chip'}
                  onClick={() => setQuality(level)}
                >{QUALITY[level].label}</button>
              ))}
            </div>
            <div className="row row--buttons">
              <span className="row__label">Debug</span>
              <div className="debug-grid">
                {DEBUG_VIEWS.map((label, i) => (
                  <button
                    key={i}
                    className={state.debug === i ? 'dbg dbg--on' : 'dbg'}
                    onClick={() => setDebug(i)}
                    title={label}
                  >{i}</button>
                ))}
              </div>
            </div>
            <div className="debug-caption">{state.debug} · {DEBUG_VIEWS[state.debug]}</div>

            <div className="row row--buttons row--actions">
              <button className="chip" onClick={togglePlaying}>{state.playing ? 'Pause' : 'Play'} (Space)</button>
              <button className="chip" onClick={toggleAudio}>{state.audio ? 'Audio on' : 'Audio off'} (M)</button>
              <button className="chip chip--warn" onClick={resetAll}>Reset (R)</button>
            </div>

            <div className="sliders">
              {GROUPS.map((group) => (
                <section className="group" key={group}>
                  <h4>{group}</h4>
                  {PARAMS.filter((p) => p.group === group).map((p) => (
                    <label className="slider" key={p.key}>
                      <span className="slider__top">
                        <span>{p.label}</span>
                        <b>{formatValue(state[p.key], p)}{p.unit}</b>
                      </span>
                      <input
                        type="range"
                        min={p.min}
                        max={p.max}
                        step={p.step}
                        value={state[p.key]}
                        onChange={(e) => setParam(p.key, e.target.value)}
                      />
                    </label>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      {contextLost && (
        <div className="overlay" role="status">
          <div className="overlay__box">
            <div className="overlay__title">WebGL context lost</div>
            <div>Rendering is paused. Waiting for the browser to restore the context…</div>
            <div className="overlay__hint">State is preserved and rendering will resume automatically.</div>
          </div>
        </div>
      )}
    </div>
  );
}
