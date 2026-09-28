import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Gargantua } from './engine/gargantua.js';
import { parseCaptureUrl, URL_DEFAULT } from './engine/urlState.js';
import { loadPersistedState, clearPersistedState } from './engine/persistence.js';
import { PRESETS, QUALITY_LEVELS, defaultParams } from './engine/constants.js';
import Hud from './ui/Hud.jsx';

function resolveInitialState(url) {
  const persisted = loadPersistedState();
  const base = persisted
    ? {
        quality: persisted.quality,
        preset: persisted.preset,
        debug: persisted.debug,
        hudVisible: persisted.hudVisible,
        cinematic: persisted.cinematic,
        params: { ...persisted.params },
      }
    : {
        quality: prefersLowPower() ? 'standard' : 'high',
        preset: 0,
        debug: 0,
        hudVisible: true,
        cinematic: true,
        params: defaultParams(),
      };

  // URL overrides; invalid values fall back to the safe defaults (URL_DEFAULT).
  if (url.quality !== undefined) base.quality = url.quality === URL_DEFAULT ? 'high' : url.quality;
  if (url.preset !== undefined) base.preset = url.preset === URL_DEFAULT ? 0 : url.preset;
  if (url.debug !== undefined) base.debug = url.debug === URL_DEFAULT ? 0 : url.debug;
  if (url.hud !== undefined) base.hudVisible = url.hud === URL_DEFAULT ? true : url.hud;

  // Capture runs must be reproducible: no cinematic drift, no persisted camera
  // state, optional audio off (this build ships no audio at all), frozen time.
  if (url.capture) {
    base.cinematic = false;
    base.params = defaultParams();
    if (base.preset >= 0) {
      const preset = PRESETS[base.preset];
      Object.assign(base.params, {
        fov: preset.fov,
        camDistance: preset.camDistance,
        camAzimuth: preset.camAzimuth,
        camPolar: preset.camPolar,
      });
    }
  }

  return base;
}

function prefersLowPower() {
  try {
    return (
      window.matchMedia('(max-width: 760px)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    );
  } catch {
    return false;
  }
}

export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const url = useMemo(() => parseCaptureUrl(window.location.search), []);
  const initial = useMemo(() => resolveInitialState(url), [url]);

  const [state, setState] = useState(null);
  const [ready, setReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [fatalError, setFatalError] = useState(null);

  useEffect(() => {
    let engine;
    try {
      engine = new Gargantua(canvasRef.current, {
        initial: { ...initial, capture: url.capture, time: url.capture ? (url.time === undefined ? 0 : url.time === URL_DEFAULT ? 0 : url.time) : undefined },
        onChange: setState,
        onReady: () => setReady(true),
        onContextState: setContextLost,
        onError: (err) => setFatalError(String(err?.message || err)),
      });
    } catch (err) {
      setFatalError(String(err?.message || err));
      return undefined;
    }
    engineRef.current = engine;
    setState(engine.getPublicState());

    const onResize = () => engine.resize();
    window.addEventListener('resize', onResize);

    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const engine2 = engineRef.current;
      if (!engine2) return;

      if (e.shiftKey && /^Digit[1-4]$/.test(e.code)) {
        e.preventDefault();
        engine2.setPreset(Number(e.code.slice(5)) - 1);
        return;
      }
      if (/^Digit[0-9]$/.test(e.code)) {
        e.preventDefault();
        engine2.setDebug(Number(e.code.slice(5)));
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        if (tag === 'BUTTON' && e.target && typeof e.target.blur === 'function') {
          e.target.blur(); // keep Space from re-triggering the focused HUD button
        }
        engine2.setCinematic(!engine2.state.cinematic);
        return;
      }
      if (e.code === 'KeyH') {
        e.preventDefault();
        engine2.setHudVisible(!engine2.state.hudVisible);
        return;
      }
      if (e.code === 'KeyR') {
        e.preventDefault();
        clearPersistedState();
        engine2.resetAll();
        return;
      }
      if (e.code === 'KeyQ') {
        e.preventDefault();
        const idx = QUALITY_LEVELS.indexOf(engine2.state.quality);
        engine2.setQuality(QUALITY_LEVELS[(idx + 1) % QUALITY_LEVELS.length]);
      }
    };
    window.addEventListener('keydown', onKey);

    engine.startLoop();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      engine.dispose();
      delete window.__GARGANTUA__;
      engineRef.current = null;
    };
  }, [initial, url]);

  const engine = engineRef.current;

  return (
    <div className="app">
      <canvas ref={canvasRef} className="scene-canvas" />
      {!ready && !fatalError && (
        <div className="boot-veil">
          <div className="boot-title">GARGANTUA</div>
          <div className="boot-sub">integrating Schwarzschild null geodesics…</div>
        </div>
      )}
      {contextLost && (
        <div className="overlay-note" role="status">
          WebGL 上下文已丢失 — 渲染已暂停。上下文恢复后将自动继续，状态不会丢失。
        </div>
      )}
      {fatalError && (
        <div className="overlay-note error" role="alert">
          渲染器错误：{fatalError}
        </div>
      )}
      {engine && state && <Hud engine={engine} state={state} capture={url.capture} />}
    </div>
  );
}