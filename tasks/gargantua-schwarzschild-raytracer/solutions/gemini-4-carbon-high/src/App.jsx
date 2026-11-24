import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CAMERA_PRESETS,
  PARAM_MAP,
  QUALITY_ORDER,
  clearPersistedAppState,
  createDefaultAppState,
  isValidDebugIndex,
  isValidPresetIndex,
  isValidQuality,
  isValidTimeSeconds,
  loadInitialAppState,
  sanitizeParamValue,
  sanitizeParams,
  savePersistedAppState,
} from './config/constants.js';
import { GargantuaRenderer } from './engine/GargantuaRenderer.js';
import { AmbientSynth } from './audio/AmbientSynth.js';
import { HudOverlay } from './components/HudOverlay.jsx';

const CAMERA_PARAM_KEYS = new Set([
  'fov',
  'cameraDistance',
  'cameraAzimuth',
  'cameraElevation',
]);

export function App() {
  const [appState, setAppState] = useState(() => loadInitialAppState(window.location.search));
  const [contextLost, setContextLost] = useState(false);
  const [budget, setBudget] = useState(null);

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const synthRef = useRef(null);
  const stateRef = useRef(appState);
  const readyFlagRef = useRef(false);
  const contextLostRef = useRef(false);

  stateRef.current = appState;

  // Persist versioned configuration to localStorage whenever state changes in non-capture mode
  useEffect(() => {
    savePersistedAppState(appState);
  }, [appState]);

  const buildPublicStateSnapshot = useCallback(() => {
    const s = stateRef.current;
    const engine = rendererRef.current;
    return {
      ready: Boolean(readyFlagRef.current && !contextLostRef.current),
      captureMode: Boolean(s.captureMode),
      contextLost: Boolean(contextLostRef.current),
      quality: s.quality,
      preset: s.preset,
      debug: s.debug,
      hudVisible: Boolean(s.hudVisible),
      cinematicPlaying: Boolean(s.cinematicPlaying),
      audioEnabled: Boolean(s.audioEnabled),
      time: engine ? Number(engine.simTime.toFixed(4)) : s.time,
      params: { ...s.params },
      qualityBudget: engine && engine.currentBudget ? { ...engine.currentBudget } : null,
    };
  }, []);

  const applyQuality = useCallback((nextQuality) => {
    if (!isValidQuality(nextQuality)) return false;
    const engine = rendererRef.current;
    if (engine) {
      engine.setQuality(nextQuality);
    }
    const nextState = {
      ...stateRef.current,
      quality: nextQuality,
    };
    stateRef.current = nextState;
    setAppState(nextState);
    return true;
  }, []);

  const applyPreset = useCallback((presetIndex) => {
    if (!isValidPresetIndex(presetIndex)) return false;
    const presetObj = CAMERA_PRESETS[presetIndex];
    const engine = rendererRef.current;
    if (engine) {
      engine.setPreset(presetIndex, true);
    }
    const nextParams = sanitizeParams({
      ...stateRef.current.params,
      fov: presetObj.fov,
      cameraDistance: presetObj.cameraDistance,
      cameraAzimuth: presetObj.cameraAzimuth,
      cameraElevation: presetObj.cameraElevation,
    });
    const nextState = {
      ...stateRef.current,
      preset: presetIndex,
      cinematicPlaying: false,
      params: nextParams,
    };
    stateRef.current = nextState;
    setAppState(nextState);
    return true;
  }, []);

  const applyDebug = useCallback((debugIndex) => {
    if (!isValidDebugIndex(debugIndex)) return false;
    const engine = rendererRef.current;
    if (engine) {
      engine.setDebug(debugIndex);
    }
    const nextState = {
      ...stateRef.current,
      debug: debugIndex,
    };
    stateRef.current = nextState;
    setAppState(nextState);
    return true;
  }, []);

  const applyTime = useCallback((seconds) => {
    if (!isValidTimeSeconds(seconds)) return false;
    const engine = rendererRef.current;
    if (engine) {
      engine.setTime(seconds);
    }
    const nextState = {
      ...stateRef.current,
      time: seconds,
    };
    stateRef.current = nextState;
    setAppState(nextState);
    return true;
  }, []);

  const handleToggleHud = useCallback(() => {
    setAppState((prev) => {
      const next = { ...prev, hudVisible: !prev.hudVisible };
      stateRef.current = next;
      return next;
    });
  }, []);

  const handleCycleQuality = useCallback(() => {
    const idx = QUALITY_ORDER.indexOf(stateRef.current.quality);
    const nextQ = QUALITY_ORDER[(idx + 1) % QUALITY_ORDER.length];
    applyQuality(nextQ);
  }, [applyQuality]);

  const handleToggleCinematic = useCallback(() => {
    if (stateRef.current.captureMode) return;
    const nextPlaying = !stateRef.current.cinematicPlaying;
    const engine = rendererRef.current;
    if (engine) {
      engine.setCinematicPlaying(nextPlaying);
    }
    const nextState = {
      ...stateRef.current,
      cinematicPlaying: nextPlaying,
    };
    stateRef.current = nextState;
    setAppState(nextState);
  }, []);

  const handleToggleAudio = useCallback(async () => {
    if (stateRef.current.captureMode) return;
    if (!synthRef.current) {
      synthRef.current = new AmbientSynth();
    }
    const target = !stateRef.current.audioEnabled;
    const active = await synthRef.current.setEnabled(target);
    setAppState((prev) => {
      const next = { ...prev, audioEnabled: active };
      stateRef.current = next;
      return next;
    });
  }, []);

  const handleParamChange = useCallback((key, rawVal) => {
    if (!Object.prototype.hasOwnProperty.call(PARAM_MAP, key)) return;
    const cleanVal = sanitizeParamValue(key, rawVal);
    const rawMerged = {
      ...stateRef.current.params,
      [key]: cleanVal,
    };
    if (key === 'diskInnerRadius' && rawMerged.diskOuterRadius < cleanVal + 0.5) {
      rawMerged.diskOuterRadius = Math.min(PARAM_MAP.diskOuterRadius.max, cleanVal + 0.5);
    } else if (key === 'diskOuterRadius' && rawMerged.diskInnerRadius > cleanVal - 0.5) {
      rawMerged.diskInnerRadius = Math.max(PARAM_MAP.diskInnerRadius.min, cleanVal - 0.5);
    }

    const nextParams = sanitizeParams(rawMerged);
    const isCamParam = CAMERA_PARAM_KEYS.has(key);
    const pauseLoop = isCamParam && key !== 'fov';

    const engine = rendererRef.current;
    if (engine) {
      engine.updateParams(nextParams, {
        cameraChanged: isCamParam,
        pauseCinematic: pauseLoop,
      });
    }

    const nextState = {
      ...stateRef.current,
      cinematicPlaying: pauseLoop ? false : stateRef.current.cinematicPlaying,
      params: nextParams,
    };
    stateRef.current = nextState;
    setAppState(nextState);
  }, []);

  const handleParamReset = useCallback(
    (key) => {
      const def = PARAM_MAP[key];
      if (!def) return;
      handleParamChange(key, def.defaultValue);
    },
    [handleParamChange],
  );

  const handleResetAll = useCallback(() => {
    clearPersistedAppState();
    const fresh = createDefaultAppState();
    if (stateRef.current.captureMode) {
      fresh.captureMode = true;
      fresh.cinematicPlaying = false;
      fresh.audioEnabled = false;
      fresh.time = stateRef.current.time;
    }

    if (synthRef.current) {
      synthRef.current.setEnabled(false);
    }

    const engine = rendererRef.current;
    if (engine) {
      engine.setQuality(fresh.quality);
      engine.setDebug(fresh.debug);
      engine.updateParams(fresh.params, { cameraChanged: true, pauseCinematic: false });
      engine.setPreset(fresh.preset, false);
      engine.setCinematicPlaying(fresh.cinematicPlaying);
      engine.renderSingleFrame();
    }

    stateRef.current = fresh;
    setAppState(fresh);
  }, []);

  // Mount WebGL Raytracer & expose deterministic automation API on window.__GARGANTUA__
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    document.documentElement.dataset.gargantuaReady = 'false';
    readyFlagRef.current = false;

    const initialSnapshot = stateRef.current;
    let interactiveRafPending = false;
    let latestCamCoords = null;

    const engine = new GargantuaRenderer({
      canvas,
      initialState: initialSnapshot,
      onManualCameraStart: () => {
        setAppState((prev) => {
          if (!prev.cinematicPlaying) return prev;
          const next = { ...prev, cinematicPlaying: false };
          stateRef.current = next;
          return next;
        });
      },
      onCameraInteractiveChange: (coords) => {
        latestCamCoords = coords;
        if (interactiveRafPending) return;
        interactiveRafPending = true;
        window.requestAnimationFrame(() => {
          interactiveRafPending = false;
          if (!latestCamCoords) return;
          const c = latestCamCoords;
          setAppState((prev) => {
            const next = {
              ...prev,
              params: {
                ...prev.params,
                cameraDistance: c.cameraDistance,
                cameraAzimuth: c.cameraAzimuth,
                cameraElevation: c.cameraElevation,
              },
            };
            stateRef.current = next;
            return next;
          });
        });
      },
      onContextStatusChange: (isLost) => {
        contextLostRef.current = isLost;
        setContextLost(isLost);
        document.documentElement.dataset.gargantuaReady = isLost ? 'false' : 'true';
      },
      onBudgetChange: (b) => {
        setBudget(b);
      },
      onFirstFrameReady: () => {
        readyFlagRef.current = true;
        document.documentElement.dataset.gargantuaReady = 'true';
      },
    });

    rendererRef.current = engine;

    const api = {};
    Object.defineProperty(api, 'ready', {
      enumerable: true,
      configurable: false,
      get: () => Boolean(readyFlagRef.current && !contextLostRef.current),
    });

    api.getState = () => buildPublicStateSnapshot();

    api.setQuality = (level) => {
      try {
        if (!isValidQuality(level)) {
          return {
            ok: false,
            error: 'Invalid quality level. Expected standard, high, or cinematic.',
            state: buildPublicStateSnapshot(),
          };
        }
        applyQuality(level);
        return { ...buildPublicStateSnapshot(), ok: true };
      } catch (err) {
        return { ok: false, error: String(err), state: buildPublicStateSnapshot() };
      }
    };

    api.setPreset = (index) => {
      try {
        if (!isValidPresetIndex(index)) {
          return {
            ok: false,
            error: 'Invalid preset index. Expected integer 0..3.',
            state: buildPublicStateSnapshot(),
          };
        }
        applyPreset(index);
        return { ...buildPublicStateSnapshot(), ok: true };
      } catch (err) {
        return { ok: false, error: String(err), state: buildPublicStateSnapshot() };
      }
    };

    api.setDebug = (index) => {
      try {
        if (!isValidDebugIndex(index)) {
          return {
            ok: false,
            error: 'Invalid debug index. Expected integer 0..9.',
            state: buildPublicStateSnapshot(),
          };
        }
        applyDebug(index);
        return { ...buildPublicStateSnapshot(), ok: true };
      } catch (err) {
        return { ok: false, error: String(err), state: buildPublicStateSnapshot() };
      }
    };

    api.setTime = (seconds) => {
      try {
        if (!isValidTimeSeconds(seconds)) {
          return {
            ok: false,
            error: 'Invalid simulation time. Expected finite non-negative number.',
            state: buildPublicStateSnapshot(),
          };
        }
        applyTime(seconds);
        return { ...buildPublicStateSnapshot(), ok: true };
      } catch (err) {
        return { ok: false, error: String(err), state: buildPublicStateSnapshot() };
      }
    };

    window.__GARGANTUA__ = Object.freeze(api);

    // Ensure ready signal is published once API object is attached and first frame completed
    if (engine.firstFrameRendered && !engine.contextLost) {
      readyFlagRef.current = true;
      document.documentElement.dataset.gargantuaReady = 'true';
    }

    return () => {
      readyFlagRef.current = false;
      document.documentElement.dataset.gargantuaReady = 'false';
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      engine.dispose();
      rendererRef.current = null;
    };
  }, [applyDebug, applyPreset, applyQuality, applyTime, buildPublicStateSnapshot]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target;
      if (
        target &&
        (target.tagName === 'TEXTAREA' ||
          (target.tagName === 'INPUT' && target.type !== 'range'))
      ) {
        return;
      }

      const code = e.code || '';

      // Shift + 1..4 -> Presets 0..3
      if (e.shiftKey) {
        if (code === 'Digit1' || e.key === '!') {
          e.preventDefault();
          applyPreset(0);
          return;
        }
        if (code === 'Digit2' || e.key === '@') {
          e.preventDefault();
          applyPreset(1);
          return;
        }
        if (code === 'Digit3' || e.key === '#') {
          e.preventDefault();
          applyPreset(2);
          return;
        }
        if (code === 'Digit4' || e.key === '$') {
          e.preventDefault();
          applyPreset(3);
          return;
        }
        return;
      }

      // 0..9 -> Debug views 0..9
      if (/^Digit[0-9]$/.test(code)) {
        e.preventDefault();
        applyDebug(Number(code.slice(5)));
        return;
      }
      if (/^Numpad[0-9]$/.test(code)) {
        e.preventDefault();
        applyDebug(Number(code.slice(6)));
        return;
      }

      if (code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleToggleCinematic();
        return;
      }

      const lower = (e.key || '').toLowerCase();
      if (lower === 'h') {
        e.preventDefault();
        handleToggleHud();
      } else if (lower === 'r') {
        e.preventDefault();
        handleResetAll();
      } else if (lower === 'q') {
        e.preventDefault();
        handleCycleQuality();
      } else if (lower === 'm') {
        e.preventDefault();
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    applyDebug,
    applyPreset,
    handleCycleQuality,
    handleResetAll,
    handleToggleAudio,
    handleToggleCinematic,
    handleToggleHud,
  ]);

  return (
    <main className="viewport-root">
      <canvas
        ref={canvasRef}
        className="raytracer-canvas"
        aria-label="Gargantua Schwarzschild Black Hole Real-Time Geodesic Raytracer"
      />
      <HudOverlay
        hudVisible={appState.hudVisible}
        captureMode={appState.captureMode}
        contextLost={contextLost}
        quality={appState.quality}
        preset={appState.preset}
        debug={appState.debug}
        cinematicPlaying={appState.cinematicPlaying}
        audioEnabled={appState.audioEnabled}
        params={appState.params}
        budget={budget}
        onToggleHud={handleToggleHud}
        onCycleQuality={handleCycleQuality}
        onSelectQuality={applyQuality}
        onSelectPreset={applyPreset}
        onSelectDebug={applyDebug}
        onToggleCinematic={handleToggleCinematic}
        onToggleAudio={handleToggleAudio}
        onParamChange={handleParamChange}
        onParamReset={handleParamReset}
        onResetAll={handleResetAll}
      />
    </main>
  );
}
