import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEBUG_MODES,
  PARAM_SPEC_MAP,
  PRESETS,
  QUALITY_LEVELS,
  clampParam,
  createDefaultState,
} from './config/constants.js';
import { clearPersistedState, loadPersistedState, savePersistedState } from './state/storage.js';
import { parseUrlContract } from './state/urlContract.js';
import { GargantuaEngine } from './engine/GargantuaEngine.js';
import { AmbientDrone } from './audio/ambientDrone.js';
import { Hud } from './components/Hud.jsx';

function buildInitialAppState() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const url = parseUrlContract(window.location.search);

  // Capture mode starts deterministically from clean defaults + URL contract (ignores dirty localStorage)
  const base = createDefaultState(url.capture ? false : isMobile);
  const persisted = url.capture ? null : loadPersistedState();

  const merged = {
    ...base,
    ...(persisted || {}),
    params: {
      ...base.params,
      ...(persisted?.params || {}),
    },
  };

  if (url.capture) {
    merged.quality = 'high';
    merged.preset = 0;
    merged.debugMode = 0;
    merged.cinematicMode = false;
    merged.audioEnabled = false;
    merged.hudExpanded = false;
  }

  if (url.hasQuality) merged.quality = url.quality;
  if (url.hasPreset) {
    merged.preset = url.preset;
    const pCam = PRESETS[url.preset].camera;
    merged.params = {
      ...merged.params,
      fov: pCam.fov,
      cameraDistance: pCam.cameraDistance,
      cameraAzimuth: pCam.cameraAzimuth,
      cameraElevation: pCam.cameraElevation,
    };
  }
  if (url.hasDebug) merged.debugMode = url.debugMode;
  if (url.hasHud) merged.hudVisible = url.hudVisible;

  return {
    initialState: merged,
    urlContract: url,
  };
}

export default function App() {
  const bootRef = useRef(null);
  if (!bootRef.current) {
    bootRef.current = buildInitialAppState();
  }
  const { initialState, urlContract } = bootRef.current;

  const [state, setState] = useState(initialState);
  const [telemetry, setTelemetry] = useState(null);
  const [contextLost, setContextLost] = useState(false);

  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const droneRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const persistIfAllowed = useCallback(
    (nextState) => {
      if (!urlContract.capture) {
        savePersistedState(nextState);
      }
    },
    [urlContract.capture]
  );

  const applyPreset = useCallback(
    (index) => {
      const engine = engineRef.current;
      if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) {
        return { ok: false, error: `Invalid preset index: ${String(index)}` };
      }
      const pCam = PRESETS[index].camera;
      const result = engine ? engine.setPreset(index) : { ok: true };
      setState((prev) => {
        const next = {
          ...prev,
          preset: index,
          params: {
            ...prev.params,
            fov: pCam.fov,
            cameraDistance: pCam.cameraDistance,
            cameraAzimuth: pCam.cameraAzimuth,
            cameraElevation: pCam.cameraElevation,
          },
        };
        persistIfAllowed(next);
        return next;
      });
      return result;
    },
    [persistIfAllowed]
  );

  const applyQuality = useCallback(
    (level) => {
      if (typeof level !== 'string' || !QUALITY_LEVELS.includes(level)) {
        return { ok: false, error: `Invalid quality level: ${String(level)}` };
      }
      const engine = engineRef.current;
      const result = engine ? engine.setQuality(level) : { ok: true };
      setState((prev) => {
        const next = { ...prev, quality: level };
        persistIfAllowed(next);
        return next;
      });
      return result;
    },
    [persistIfAllowed]
  );

  const cycleQuality = useCallback(() => {
    const idx = QUALITY_LEVELS.indexOf(stateRef.current.quality);
    const nextLevel = QUALITY_LEVELS[(idx + 1) % QUALITY_LEVELS.length];
    applyQuality(nextLevel);
  }, [applyQuality]);

  const applyDebug = useCallback(
    (index) => {
      if (!Number.isInteger(index) || index < 0 || index >= DEBUG_MODES.length) {
        return { ok: false, error: `Invalid debug mode: ${String(index)}` };
      }
      const engine = engineRef.current;
      const result = engine ? engine.setDebug(index) : { ok: true };
      setState((prev) => {
        const next = { ...prev, debugMode: index };
        persistIfAllowed(next);
        return next;
      });
      return result;
    },
    [persistIfAllowed]
  );

  const toggleCinematic = useCallback(() => {
    if (urlContract.capture) return;
    const nextVal = !stateRef.current.cinematicMode;
    engineRef.current?.setCinematicMode(nextVal);
    const next = { ...stateRef.current, cinematicMode: nextVal };
    stateRef.current = next;
    persistIfAllowed(next);
    setState(next);
  }, [persistIfAllowed, urlContract.capture]);

  const toggleHudVisible = useCallback(() => {
    const nextVis = !stateRef.current.hudVisible;
    engineRef.current?.setHudState(nextVis, stateRef.current.hudExpanded);
    const next = { ...stateRef.current, hudVisible: nextVis };
    stateRef.current = next;
    persistIfAllowed(next);
    setState(next);
  }, [persistIfAllowed]);

  const toggleHudExpanded = useCallback(() => {
    const nextExp = !stateRef.current.hudExpanded;
    engineRef.current?.setHudState(stateRef.current.hudVisible, nextExp);
    const next = { ...stateRef.current, hudExpanded: nextExp };
    stateRef.current = next;
    persistIfAllowed(next);
    setState(next);
  }, [persistIfAllowed]);

  const changeParam = useCallback(
    (key, rawValue) => {
      if (!PARAM_SPEC_MAP[key]) return;
      const clamped = clampParam(key, rawValue);
      engineRef.current?.setParam(key, clamped);
      setState((prev) => {
        const nextParams = { ...prev.params, [key]: clamped };
        if (key === 'diskInnerRadius' && nextParams.diskOuterRadius < clamped + 1.0) {
          nextParams.diskOuterRadius = clampParam('diskOuterRadius', clamped + 1.0);
        } else if (key === 'diskOuterRadius' && clamped < nextParams.diskInnerRadius + 1.0) {
          nextParams.diskOuterRadius = clampParam('diskOuterRadius', nextParams.diskInnerRadius + 1.0);
        }
        const next = { ...prev, params: nextParams };
        persistIfAllowed(next);
        return next;
      });
    },
    [persistIfAllowed]
  );

  const resetParam = useCallback(
    (key) => {
      const spec = PARAM_SPEC_MAP[key];
      if (!spec) return;
      changeParam(key, spec.defaultValue);
    },
    [changeParam]
  );

  const toggleAudio = useCallback(async () => {
    if (urlContract.capture) return;
    const drone = droneRef.current;
    if (!drone) return;
    const target = !stateRef.current.audioEnabled;
    const active = await drone.setEnabled(target);
    engineRef.current?.setAudioState(active);
    setState((prev) => ({ ...prev, audioEnabled: active }));
  }, [urlContract.capture]);

  const resetAll = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const fresh = createDefaultState(isMobile);
    if (urlContract.capture) {
      fresh.quality = 'high';
      fresh.cinematicMode = false;
    }
    fresh.hudVisible = true;
    fresh.hudExpanded = stateRef.current.hudExpanded;
    if (!urlContract.capture) {
      clearPersistedState();
    }
    if (droneRef.current && stateRef.current.audioEnabled) {
      droneRef.current.setEnabled(false);
    }
    engineRef.current?.applyFullState(fresh);
    engineRef.current?.setAudioState(false);
    setState(fresh);
  }, [urlContract.capture]);

  // Mount Three.js engine & expose deterministic window.__GARGANTUA__ automation interface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const drone = new AmbientDrone();
    droneRef.current = drone;

    const engine = new GargantuaEngine(
      canvas,
      {
        captureMode: urlContract.capture,
        quality: initialState.quality,
        preset: initialState.preset,
        debugMode: initialState.debugMode,
        hudVisible: initialState.hudVisible,
        hudExpanded: initialState.hudExpanded,
        cinematicMode: initialState.cinematicMode,
        params: initialState.params,
        time: urlContract.time ?? 0,
      },
      {
        onTelemetry: (budget) => setTelemetry(budget),
        onContextLostChange: (lost) => setContextLost(lost),
        onCinematicChange: (active) => {
          setState((prev) => {
            if (prev.cinematicMode === active) return prev;
            const next = { ...prev, cinematicMode: active };
            if (!urlContract.capture) savePersistedState(next);
            return next;
          });
        },
        onCameraSync: ({ fov, cameraDistance, cameraAzimuth, cameraElevation, persist }) => {
          setState((prev) => {
            const next = {
              ...prev,
              params: {
                ...prev.params,
                fov,
                cameraDistance,
                cameraAzimuth,
                cameraElevation,
              },
            };
            if (persist && !urlContract.capture) {
              savePersistedState(next);
            }
            return next;
          });
        },
      }
    );
    engineRef.current = engine;

    const api = {
      get ready() {
        return Boolean(engineRef.current?.ready);
      },
      getState() {
        return engineRef.current ? engineRef.current.getState() : null;
      },
      setQuality(level) {
        if (typeof level !== 'string' || !QUALITY_LEVELS.includes(level)) {
          return {
            ok: false,
            error: `Invalid quality level: ${String(level)}`,
            state: engineRef.current ? engineRef.current.getState() : null,
          };
        }
        const res = engineRef.current.setQuality(level);
        setState((prev) => {
          const next = { ...prev, quality: level };
          if (!urlContract.capture) savePersistedState(next);
          return next;
        });
        return res;
      },
      setPreset(index) {
        if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) {
          return {
            ok: false,
            error: `Invalid preset index: ${String(index)}`,
            state: engineRef.current ? engineRef.current.getState() : null,
          };
        }
        const res = engineRef.current.setPreset(index);
        const pCam = PRESETS[index].camera;
        setState((prev) => {
          const next = {
            ...prev,
            preset: index,
            params: {
              ...prev.params,
              fov: pCam.fov,
              cameraDistance: pCam.cameraDistance,
              cameraAzimuth: pCam.cameraAzimuth,
              cameraElevation: pCam.cameraElevation,
            },
          };
          if (!urlContract.capture) savePersistedState(next);
          return next;
        });
        return res;
      },
      setDebug(index) {
        if (!Number.isInteger(index) || index < 0 || index >= DEBUG_MODES.length) {
          return {
            ok: false,
            error: `Invalid debug mode: ${String(index)}`,
            state: engineRef.current ? engineRef.current.getState() : null,
          };
        }
        const res = engineRef.current.setDebug(index);
        setState((prev) => {
          const next = { ...prev, debugMode: index };
          if (!urlContract.capture) savePersistedState(next);
          return next;
        });
        return res;
      },
      setTime(seconds) {
        if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
          return {
            ok: false,
            error: `Invalid time value: ${String(seconds)}`,
            state: engineRef.current ? engineRef.current.getState() : null,
          };
        }
        return engineRef.current.setTime(seconds);
      },
      setHud(visible) {
        if (typeof visible !== 'boolean') {
          return {
            ok: false,
            error: `Invalid hud flag: ${String(visible)}`,
            state: engineRef.current ? engineRef.current.getState() : null,
          };
        }
        engineRef.current.setHudState(visible, stateRef.current.hudExpanded);
        setState((prev) => {
          const next = { ...prev, hudVisible: visible };
          if (!urlContract.capture) savePersistedState(next);
          return next;
        });
        return { ok: true, state: engineRef.current.getState() };
      },
    };

    Object.defineProperty(window, '__GARGANTUA__', {
      value: api,
      configurable: true,
      writable: false,
    });

    return () => {
      delete window.__GARGANTUA__;
      document.documentElement.dataset.gargantuaReady = 'false';
      engine.dispose();
      engineRef.current = null;
      drone.dispose();
      droneRef.current = null;
    };
  }, [initialState, urlContract]);

  // Global keyboard shortcuts: 0-9, Shift+1..4, Space, H, R, Q, M
  useEffect(() => {
    function handleKeyDown(e) {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          (target.tagName === 'INPUT' && target.type !== 'range'))
      ) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Shift + 1..4 -> Camera presets 0..3 (check e.code so Shift+1 works reliably across keyboards)
      if (e.shiftKey && /^Digit[1-4]$/.test(e.code)) {
        e.preventDefault();
        const presetIndex = Number(e.code.slice(5)) - 1;
        applyPreset(presetIndex);
        return;
      }

      // 0..9 (without Shift) -> Debug diagnostic views 0..9
      if (!e.shiftKey && /^Digit[0-9]$/.test(e.code)) {
        e.preventDefault();
        const debugIndex = Number(e.code.slice(5));
        applyDebug(debugIndex);
        return;
      }

      const keyLower = e.key.toLowerCase();
      if (e.code === 'Space') {
        e.preventDefault();
        toggleCinematic();
      } else if (keyLower === 'h') {
        e.preventDefault();
        toggleHudVisible();
      } else if (keyLower === 'r') {
        e.preventDefault();
        resetAll();
      } else if (keyLower === 'q') {
        e.preventDefault();
        cycleQuality();
      } else if (keyLower === 'm') {
        e.preventDefault();
        toggleAudio();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [applyDebug, applyPreset, cycleQuality, resetAll, toggleAudio, toggleCinematic, toggleHudVisible]);

  return (
    <main className="app-viewport">
      <canvas
        ref={canvasRef}
        className="raytrace-canvas"
        aria-label="Gargantua Schwarzschild Black Hole Real-Time Geodesic Raytracer"
      />
      <Hud
        state={state}
        telemetry={telemetry}
        captureMode={urlContract.capture}
        contextLost={contextLost}
        onToggleHudExpanded={toggleHudExpanded}
        onToggleHudVisible={toggleHudVisible}
        onToggleCinematic={toggleCinematic}
        onSelectPreset={applyPreset}
        onSelectQuality={applyQuality}
        onCycleQuality={cycleQuality}
        onSelectDebug={applyDebug}
        onChangeParam={changeParam}
        onResetParam={resetParam}
        onResetAll={resetAll}
        onToggleAudio={toggleAudio}
      />
    </main>
  );
}
