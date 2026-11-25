import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createStore, defaultState, loadPersisted, parseCaptureUrl,
  PRESETS, QUALITIES,
} from './store.js';
import { GargantuaRenderer } from './renderer.js';
import { Hud } from './hud.jsx';
import './style.css';

// --- compose initial state: defaults ← persisted ← explicit URL values --------
// Explicit quality/preset/debug/hud URL values always win over persisted state
// (they are the stable screenshot contract); capture additionally freezes the
// simulation clock and disables the cinematic loop.
const capture = parseCaptureUrl();
// capture mode must be deterministic: ignore any persisted state entirely.
const persisted = capture.capture ? null : loadPersisted();
const initial = persisted ?? defaultState();
if (capture.quality) initial.quality = capture.quality;
if (capture.preset !== null) initial.presetIndex = capture.preset;
if (capture.debug !== null) initial.debug = capture.debug;
if (capture.hud !== null) initial.hudVisible = capture.hud;
if (capture.capture) initial.cinematic = false;
const store = createStore(initial, { persist: !capture.capture });

// the URL preset is the starting view: apply its camera pose before first render
if (capture.preset !== null) {
  const p = PRESETS[capture.preset];
  store.set({
    params: { ...store.get().params, azimuth: p.azimuth, elevation: p.elevation, distance: p.distance, fov: p.fov },
  }, 'capture-init');
}

// live renderer holder shared with the capture/inspection API
const rendererHolder = { current: null };

// --- keyboard shortcuts --------------------------------------------------------
function installKeys(store) {
  const onKey = (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const s = store.get();
    // Shift+1..4 → presets. Some layouts produce punctuation for shifted digits,
    // so match on the physical key code as well as the character.
    if (e.shiftKey && /^Digit[1-4]$/.test(e.code)) {
      store.applyPreset(Number(e.code.slice(-1)) - 1);
      e.preventDefault();
      return;
    }
    if (e.shiftKey) return; // other shifted keys: ignore
    if (/^[0-9]$/.test(e.key)) {
      store.set({ debug: Number(e.key) }, 'debug');
      return;
    }
    switch (e.code) {
      case 'Space':
        store.set({ cinematic: !s.cinematic }, 'cinematic');
        e.preventDefault();
        break;
      case 'KeyH':
        store.set({ hudVisible: !s.hudVisible }, 'hud');
        break;
      case 'KeyR':
        store.reset();
        break;
      case 'KeyQ': {
        const i = QUALITIES.indexOf(s.quality);
        store.set({ quality: QUALITIES[(i + 1) % QUALITIES.length] }, 'quality');
        break;
      }
      default:
        break;
    }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}

// --- capture/inspection API ------------------------------------------------------
// Read-only `ready`, validated setters that return the updated state or null
// for invalid input; nothing here throws.
Object.defineProperty(window, '__GARGANTUA__', {
  configurable: true,
  value: {
    get ready() {
      return document.documentElement.dataset.gargantuaReady === 'true';
    },
    getState() {
      const s = store.get();
      return JSON.parse(JSON.stringify({
        params: s.params,
        quality: s.quality,
        debug: s.debug,
        cinematic: s.cinematic,
        hudVisible: s.hudVisible,
        presetIndex: s.presetIndex,
        capture: capture.capture,
        time: rendererHolder.current?.simTime ?? 0,
      }));
    },
    setQuality(level) {
      if (typeof level !== 'string' || !QUALITIES.includes(level.toLowerCase())) return null;
      store.set({ quality: level.toLowerCase() }, 'quality');
      return this.getState();
    },
    setPreset(index) {
      if (!store.applyPreset(Number(index))) return null;
      return this.getState();
    },
    setDebug(index) {
      const n = Number(index);
      if (!Number.isInteger(n) || n < 0 || n > 9) return null;
      store.set({ debug: n }, 'debug');
      return this.getState();
    },
    setParam(key, value) {
      if (!store.setParam(key, value)) return null;
      return this.getState();
    },
    setTime(seconds) {
      const n = Number(seconds);
      if (!Number.isFinite(n) || n < 0) return null;
      if (rendererHolder.current) rendererHolder.current.simTime = n;
      return this.getState();
    },
  },
});

function App() {
  const canvasRef = useRef(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const renderer = new GargantuaRenderer(canvasRef.current, store, capture);
    rendererHolder.current = renderer;
    const offKeys = installKeys(store);
    const onCtx = (e) => setContextLost(e.detail.lost);
    window.addEventListener('gargantua-context', onCtx);
    const flush = () => store.flush();
    window.addEventListener('beforeunload', flush);
    return () => {
      window.removeEventListener('gargantua-context', onCtx);
      window.removeEventListener('beforeunload', flush);
      offKeys();
      renderer.dispose();
      rendererHolder.current = null;
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="gl-canvas" />
      <Hud store={store} contextLost={contextLost} captureMode={capture.capture} />
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
