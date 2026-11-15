import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { GargantuaRenderer } from './three/GargantuaRenderer.js';
import { AmbientAudio } from './audio/ambient.js';
import Hud from './ui/Hud.jsx';
import { defaultState, PRESETS, QUALITY_LEVELS, DEBUG_MODES, clampParam } from './state/config.js';
import { loadState, saveState } from './state/storage.js';
import { readUrlState } from './state/urlState.js';

const CAMERA_KEYS = ['fov', 'cameraDistance', 'cameraAzimuth', 'cameraElevation'];

function nearlyEqual(a, b) {
  return CAMERA_KEYS.every((key) => Math.abs((a[key] ?? 0) - (b[key] ?? 0)) < 1e-3);
}

/**
 * Builds the state the application starts with: the persisted settings, with
 * the capture contract of the URL taking precedence.  The function is pure and
 * deterministic so that the very first React render already holds the final
 * values - a later effect can therefore never overwrite the URL preset with
 * the persisted camera.
 */
function buildInitialState() {
  const state = loadState();
  const url = readUrlState(window.location.search);
  if (url.quality) state.quality = url.quality;
  if (url.debug !== null) state.debug = url.debug;
  if (url.hud !== null) state.hudOpen = url.hud;
  if (url.preset !== null) {
    const preset = PRESETS[url.preset];
    if (preset) {
      state.params = { ...state.params, ...preset };
      state.preset = url.preset;
    }
  }
  if (url.capture) {
    state.cinematic = false;
    state.audio = false;
  }
  return state;
}

export default function App() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const audioRef = useRef(null);
  const stateRef = useRef(defaultState());
  const captureRef = useRef(false);
  const readyRef = useRef(false);

  const [state, setState] = useState(buildInitialState);
  const [status, setStatus] = useState({ fps: 0, contextLost: false, internalWidth: 0, internalHeight: 0 });
  const [ready, setReady] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [fatalError, setFatalError] = useState(null);

  const updateState = useCallback((updater) => {
    setState((prev) => (typeof updater === 'function' ? updater(prev) : updater));
  }, []);

  // ------------------------------------------------------------------ mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const url = readUrlState(window.location.search);
    const initial = buildInitialState();
    captureRef.current = url.capture;

    let renderer;
    try {
      renderer = new GargantuaRenderer(canvas, {
        onStatus: (info) => setStatus(info),
        onCameraChange: (cam) => {
          updateState((prev) => {
            const next = { ...prev.params };
            for (const key of CAMERA_KEYS) next[key] = cam[key];
            if (nearlyEqual(prev.params, next)) return prev;
            return { ...prev, params: next };
          });
        },
        onUserInteraction: () => {
          updateState((prev) => (prev.cinematic ? { ...prev, cinematic: false } : prev));
          rendererRef.current?.setCinematic(false);
        },
        onFirstFrame: () => {
          readyRef.current = true;
          setReady(true);
          document.documentElement.dataset.gargantuaReady = 'true';
        },
      });
    } catch (error) {
      setFatalError(error instanceof Error ? error.message : String(error));
      return undefined;
    }

    rendererRef.current = renderer;
    renderer.setQuality(initial.quality);
    renderer.setDebug(initial.debug);
    renderer.setParams(initial.params);
    renderer.applyCameraParams(initial.params);
    if (url.preset !== null) renderer.applyPreset(url.preset);
    if (url.capture) {
      renderer.capture = true;
      renderer.setCinematic(false);
      renderer.setTime(url.time === null ? 0 : url.time);
    } else {
      renderer.setCinematic(initial.cinematic);
    }
    renderer.start();

    const onResize = () => renderer.resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // ------------------------------------------------------------- persistence
  useEffect(() => {
    if (captureRef.current) return undefined;   // a capture run must not overwrite the saved settings
    const handle = window.setTimeout(() => saveState(state), 220);
    return () => window.clearTimeout(handle);
  }, [state]);

  // ------------------------------------------------------------ shader state
  useEffect(() => {
    rendererRef.current?.setParams(state.params);
  }, [state.params]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const { fov, cameraDistance, cameraAzimuth, cameraElevation } = state.params;
    const current = renderer.readCameraParams();
    const changed =
      Math.abs(current.fov - fov) > 1e-3 ||
      Math.abs(current.cameraDistance - cameraDistance) > 1e-3 ||
      Math.abs(current.cameraAzimuth - cameraAzimuth) > 1e-3 ||
      Math.abs(current.cameraElevation - cameraElevation) > 1e-3;
    if (changed) renderer.applyCameraParams({ fov, cameraDistance, cameraAzimuth, cameraElevation });
  }, [state.params.fov, state.params.cameraDistance, state.params.cameraAzimuth, state.params.cameraElevation]);

  useEffect(() => {
    rendererRef.current?.setQuality(state.quality);
  }, [state.quality]);

  useEffect(() => {
    rendererRef.current?.setDebug(state.debug);
  }, [state.debug]);

  useEffect(() => {
    rendererRef.current?.setCinematic(state.cinematic);
  }, [state.cinematic]);

  // ---------------------------------------------------------------- actions
  const setParam = useCallback(
    (key, value) => {
      const clamped = clampParam(key, value);
      if (clamped === null) return;
      updateState((prev) => {
        const params = { ...prev.params, [key]: clamped };
        if (key === 'diskInner') params.diskOuter = Math.max(params.diskOuter, clamped + 0.25);
        if (key === 'diskOuter') params.diskOuter = Math.max(clamped, params.diskInner + 0.25);
        return { ...prev, params };
      });
    },
    [updateState],
  );

  const applyPreset = useCallback(
    (index) => {
      const preset = PRESETS[index];
      if (!preset) return null;
      updateState((prev) => ({
        ...prev,
        preset: index,
        cinematic: false,
        params: { ...prev.params, ...preset },
      }));
      rendererRef.current?.applyPreset(index);
      rendererRef.current?.setCinematic(false);
      return { ...stateRef.current.params, ...preset };
    },
    [updateState],
  );

  const setDebug = useCallback(
    (index) => {
      if (!Number.isInteger(index) || index < 0 || index > 9) return null;
      updateState((prev) => ({ ...prev, debug: index }));
      rendererRef.current?.setDebug(index);
      return index;
    },
    [updateState],
  );

  const setQuality = useCallback(
    (level) => {
      if (!QUALITY_LEVELS.includes(level)) return null;
      updateState((prev) => ({ ...prev, quality: level }));
      rendererRef.current?.setQuality(level);
      return level;
    },
    [updateState],
  );

  const setTime = useCallback((seconds) => {
    const value = Number(seconds);
    if (!Number.isFinite(value) || value < 0) return null;
    const ok = rendererRef.current?.setTime(value);
    return ok === false ? null : value;
  }, []);

  const resetAll = useCallback(() => {
    const fresh = defaultState();
    const renderer = rendererRef.current;
    if (renderer) {
      renderer.setQuality(fresh.quality);
      renderer.setDebug(0);
      renderer.setParams(fresh.params);
      renderer.applyCameraParams(fresh.params);
      renderer.setCinematic(fresh.cinematic);
      renderer.setTime(0);
    }
    updateState(fresh);
    return fresh;
  }, [updateState]);

  const toggleHud = useCallback(() => {
    updateState((prev) => ({ ...prev, hudOpen: !prev.hudOpen }));
  }, [updateState]);

  const toggleCinematic = useCallback(() => {
    updateState((prev) => {
      const cinematic = !prev.cinematic;
      rendererRef.current?.setCinematic(cinematic);
      return { ...prev, cinematic };
    });
  }, [updateState]);

  const toggleAudio = useCallback(async () => {
    if (!audioRef.current) audioRef.current = new AmbientAudio();
    const on = await audioRef.current.toggle();
    setAudioOn(on);
    updateState((prev) => ({ ...prev, audio: on }));
    return on;
  }, [updateState]);

  // -------------------------------------------------------------- shortcuts
  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
      const isFormControl = tag === 'input' || tag === 'textarea' || tag === 'select';

      if (event.code === 'Space') {
        if (isFormControl || tag === 'button') return;
        event.preventDefault();
        toggleCinematic();
        return;
      }
      if (event.shiftKey && /^Digit[1-4]$/.test(event.code)) {
        event.preventDefault();
        applyPreset(Number(event.code.slice(5)) - 1);
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^Digit[0-9]$/.test(event.code)) {
        if (isFormControl) return;
        setDebug(Number(event.code.slice(5)));
        return;
      }
      const key = event.key.toLowerCase();
      if (key === 'h') {
        toggleHud();
      } else if (key === 'r') {
        resetAll();
      } else if (key === 'q') {
        const index = QUALITY_LEVELS.indexOf(stateRef.current.quality);
        setQuality(QUALITY_LEVELS[(index + 1) % QUALITY_LEVELS.length]);
      } else if (key === 'm') {
        toggleAudio();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [applyPreset, resetAll, setDebug, setQuality, toggleAudio, toggleCinematic, toggleHud]);

  // --------------------------------------------------- public automation API
  useEffect(() => {
    const api = {
      get ready() {
        return readyRef.current;
      },
      getState() {
        const current = stateRef.current;
        return {
          ready: readyRef.current,
          quality: current.quality,
          preset: current.preset,
          debug: current.debug,
          hudOpen: current.hudOpen,
          cinematic: current.cinematic,
          audio: current.audio,
          time: rendererRef.current ? rendererRef.current.time : 0,
          internalWidth: rendererRef.current ? rendererRef.current.internalWidth : 0,
          internalHeight: rendererRef.current ? rendererRef.current.internalHeight : 0,
          params: { ...current.params },
        };
      },
      setQuality(level) {
        const result = setQuality(level);
        if (result === null) return null;
        return api.getState();
      },
      setPreset(index) {
        if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return null;
        applyPreset(index);
        return api.getState();
      },
      setDebug(index) {
        if (!Number.isInteger(index) || index < 0 || index > 9) return null;
        setDebug(index);
        return api.getState();
      },
      setTime(seconds) {
        const result = setTime(seconds);
        if (result === null) return null;
        return api.getState();
      },
    };
    window.__GARGANTUA__ = api;
    return () => {
      if (window.__GARGANTUA__ === api) delete window.__GARGANTUA__;
    };
  }, [applyPreset, setDebug, setQuality, setTime]);

  // -------------------------------------------------------------------- view
  const hudProps = useMemo(
    () => ({
      state,
      status,
      ready,
      audioOn,
      debugModes: DEBUG_MODES,
      presets: PRESETS,
      qualityLevels: QUALITY_LEVELS,
      onParam: setParam,
      onPreset: applyPreset,
      onDebug: setDebug,
      onQuality: setQuality,
      onReset: resetAll,
      onToggleHud: toggleHud,
      onToggleCinematic: toggleCinematic,
      onToggleAudio: toggleAudio,
    }),
    [state, status, ready, audioOn, applyPreset, resetAll, setDebug, setParam, setQuality, toggleAudio, toggleCinematic, toggleHud],
  );

  return (
    <div className="app">
      <canvas ref={canvasRef} className="app__canvas" />
      {fatalError ? (
        <div className="overlay overlay--fatal">
          <div className="overlay__card">
            <h2>WebGL unavailable</h2>
            <p>{fatalError}</p>
          </div>
        </div>
      ) : null}
      {status.contextLost ? (
        <div className="overlay">
          <div className="overlay__card">
            <h2>Graphics context lost</h2>
            <p>Rendering is paused. The scene will resume as soon as the browser restores the WebGL context.</p>
          </div>
        </div>
      ) : null}
      <Hud {...hudProps} />
    </div>
  );
}
