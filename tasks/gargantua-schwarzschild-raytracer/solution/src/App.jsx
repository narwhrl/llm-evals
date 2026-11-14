import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CAMERA_PRESETS,
  PARAM_MAP,
  QUALITY_ORDER,
  buildInitialRuntimeState,
  clampParam,
  createDefaultAppState,
  isValidDebugIndex,
  isValidPresetIndex,
  isValidQuality,
  isValidSimTime,
  savePersistedState,
} from './config/stateSchema.js';
import { GargantuaRenderer } from './engine/GargantuaRenderer.js';
import { AmbientDrone } from './audio/AmbientDrone.js';
import { HudOverlay } from './components/HudOverlay.jsx';

const CAMERA_KEYS = new Set(['fov', 'camDistance', 'camAzimuth', 'camElevation']);

export default function App() {
  const [appState, setAppState] = useState(() => buildInitialRuntimeState());
  const [runtimeInfo, setRuntimeInfo] = useState({
    ready: false,
    contextLost: false,
    fps: 60,
    budget: null,
  });

  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const droneRef = useRef(null);
  const stateRef = useRef(appState);
  stateRef.current = appState;

  // Persist state changes to versioned localStorage (outside deterministic capture mode)
  useEffect(() => {
    if (appState.capture) return;
    const timer = window.setTimeout(() => {
      savePersistedState(appState);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [
    appState.capture,
    appState.quality,
    appState.preset,
    appState.debug,
    appState.hudVisible,
    appState.drawerCollapsed,
    appState.cinematicPlaying,
    appState.params,
  ]);

  const applyQuality = useCallback((nextQuality) => {
    if (!isValidQuality(nextQuality)) return null;
    engineRef.current?.setQuality(nextQuality);
    setAppState((prev) => {
      const updated = { ...prev, quality: nextQuality };
      stateRef.current = updated;
      if (!updated.capture) savePersistedState(updated);
      return updated;
    });
    return engineRef.current?.getSnapshot({ hud: stateRef.current.hudVisible }) ?? null;
  }, []);

  const applyPreset = useCallback((presetIndex) => {
    if (!isValidPresetIndex(presetIndex)) return null;
    const presetDef = CAMERA_PRESETS[presetIndex];
    engineRef.current?.setPreset(presetIndex);
    setAppState((prev) => {
      const updated = {
        ...prev,
        preset: presetIndex,
        params: {
          ...prev.params,
          fov: presetDef.fov,
          camDistance: presetDef.camDistance,
          camAzimuth: presetDef.camAzimuth,
          camElevation: presetDef.camElevation,
        },
      };
      stateRef.current = updated;
      if (!updated.capture) savePersistedState(updated);
      return updated;
    });
    return engineRef.current?.getSnapshot({ hud: stateRef.current.hudVisible }) ?? null;
  }, []);

  const applyDebug = useCallback((debugIndex) => {
    if (!isValidDebugIndex(debugIndex)) return null;
    engineRef.current?.setDebug(debugIndex);
    setAppState((prev) => {
      const updated = { ...prev, debug: debugIndex };
      stateRef.current = updated;
      if (!updated.capture) savePersistedState(updated);
      return updated;
    });
    return engineRef.current?.getSnapshot({ hud: stateRef.current.hudVisible }) ?? null;
  }, []);

  const applySimTime = useCallback((seconds) => {
    if (!isValidSimTime(seconds)) return null;
    engineRef.current?.setSimTime(seconds);
    setAppState((prev) => {
      const updated = { ...prev, simTime: seconds };
      stateRef.current = updated;
      return updated;
    });
    return engineRef.current?.getSnapshot({ hud: stateRef.current.hudVisible }) ?? null;
  }, []);

  const handleParamChange = useCallback((key, rawVal) => {
    if (!PARAM_MAP[key]) return null;
    const clamped = clampParam(key, rawVal);
    const baseParams = engineRef.current?.state?.params || stateRef.current.params;
    const nextParams = { ...baseParams, [key]: clamped };
    if (key === 'diskInner' && nextParams.diskOuter < clamped + 1.0) {
      nextParams.diskOuter = clampParam('diskOuter', clamped + 1.0);
    } else if (key === 'diskOuter' && nextParams.diskInner > clamped - 1.0) {
      nextParams.diskInner = clampParam('diskInner', clamped - 1.0);
    }

    const isCam = CAMERA_KEYS.has(key);
    if (isCam && key !== 'fov' && stateRef.current.cinematicPlaying) {
      engineRef.current?.setCinematicPlaying(false);
    }
    engineRef.current?.updateParams(nextParams, { cameraChanged: isCam });

    setAppState((prev) => {
      const mergedParams = { ...prev.params, [key]: clamped };
      if (key === 'diskInner' && mergedParams.diskOuter < clamped + 1.0) {
        mergedParams.diskOuter = clampParam('diskOuter', clamped + 1.0);
      } else if (key === 'diskOuter' && mergedParams.diskInner > clamped - 1.0) {
        mergedParams.diskInner = clampParam('diskInner', clamped - 1.0);
      }
      const updated = {
        ...prev,
        cinematicPlaying: isCam && key !== 'fov' ? false : prev.cinematicPlaying,
        params: mergedParams,
      };
      stateRef.current = updated;
      if (!updated.capture) savePersistedState(updated);
      return updated;
    });
    return engineRef.current?.getSnapshot({ hud: stateRef.current.hudVisible }) ?? null;
  }, []);

  const handleResetParam = useCallback(
    (key) => {
      const def = PARAM_MAP[key];
      if (!def) return;
      handleParamChange(key, def.defaultValue);
    },
    [handleParamChange]
  );

  const handleResetAll = useCallback(() => {
    const fresh = createDefaultAppState();
    const isCapture = stateRef.current.capture;
    const nextCinematic = isCapture ? false : fresh.cinematicPlaying;

    const eng = engineRef.current;
    if (eng) {
      eng.state.quality = fresh.quality;
      eng.state.preset = fresh.preset;
      eng.state.debug = fresh.debug;
      eng.state.cinematicPlaying = nextCinematic;
      eng.resize();
      eng.updateParams(fresh.params, { cameraChanged: true, resetTarget: true });
      eng.emitStatus();
    }

    const updated = {
      ...fresh,
      hudVisible: stateRef.current.hudVisible,
      drawerCollapsed: stateRef.current.drawerCollapsed,
      cinematicPlaying: nextCinematic,
      audioEnabled: stateRef.current.audioEnabled,
      capture: isCapture,
      simTime: isCapture ? stateRef.current.simTime : 0,
    };
    stateRef.current = updated;
    setAppState(updated);
    if (!isCapture) {
      savePersistedState(updated);
    }
    return eng?.getSnapshot({ hud: updated.hudVisible }) ?? null;
  }, []);

  const handleCycleQuality = useCallback(() => {
    const idx = QUALITY_ORDER.indexOf(stateRef.current.quality);
    const next = QUALITY_ORDER[(idx + 1) % QUALITY_ORDER.length];
    applyQuality(next);
  }, [applyQuality]);

  const handleTogglePlay = useCallback(() => {
    if (stateRef.current.capture) return;
    const next = !stateRef.current.cinematicPlaying;
    engineRef.current?.setCinematicPlaying(next);
    setAppState((prev) => {
      const updated = { ...prev, cinematicPlaying: next };
      stateRef.current = updated;
      return updated;
    });
  }, []);

  const handleToggleHud = useCallback(() => {
    setAppState((prev) => {
      const updated = { ...prev, hudVisible: !prev.hudVisible };
      stateRef.current = updated;
      if (!updated.capture) savePersistedState(updated);
      return updated;
    });
  }, []);

  const handleToggleDrawer = useCallback(() => {
    setAppState((prev) => {
      const updated = { ...prev, drawerCollapsed: !prev.drawerCollapsed };
      stateRef.current = updated;
      if (!updated.capture) savePersistedState(updated);
      return updated;
    });
  }, []);

  const handleToggleAudio = useCallback(() => {
    if (stateRef.current.capture) return;
    if (!droneRef.current) {
      droneRef.current = new AmbientDrone();
    }
    const nextActive = droneRef.current.setEnabled(!stateRef.current.audioEnabled);
    setAppState((prev) => {
      const updated = { ...prev, audioEnabled: nextActive };
      stateRef.current = updated;
      return updated;
    });
  }, []);

  // Initialize Three.js Schwarzschild renderer & automation API on window.__GARGANTUA__
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let lastSyncUiMs = 0;

    const rendererInstance = new GargantuaRenderer({
      canvas,
      initialState: stateRef.current,
      onCameraSync: (spherical, isContinuous) => {
        const now = performance.now();
        if (isContinuous && now - lastSyncUiMs < 75) return;
        lastSyncUiMs = now;
        setAppState((prev) => {
          const updated = {
            ...prev,
            params: {
              ...prev.params,
              camDistance: spherical.camDistance,
              camAzimuth: spherical.camAzimuth,
              camElevation: spherical.camElevation,
            },
          };
          stateRef.current = updated;
          return updated;
        });
      },
      onStatusChange: (status) => {
        setRuntimeInfo({
          ready: status.ready,
          contextLost: status.contextLost,
          fps: status.fps,
          budget: status.budget,
        });
        setAppState((prev) => {
          if (prev.cinematicPlaying === status.cinematicPlaying) return prev;
          const updated = { ...prev, cinematicPlaying: status.cinematicPlaying };
          stateRef.current = updated;
          return updated;
        });
      },
    });

    engineRef.current = rendererInstance;

    const api = {};
    Object.defineProperty(api, 'ready', {
      get: () => Boolean(engineRef.current?.ready && !engineRef.current?.contextLost),
      enumerable: true,
    });
    api.getState = () =>
      engineRef.current?.getSnapshot({
        hud: stateRef.current.hudVisible,
        audioEnabled: stateRef.current.audioEnabled,
      }) ?? null;
    api.setQuality = (level) => {
      try {
        return applyQuality(level);
      } catch {
        return null;
      }
    };
    api.setPreset = (index) => {
      try {
        return applyPreset(index);
      } catch {
        return null;
      }
    };
    api.setDebug = (index) => {
      try {
        return applyDebug(index);
      } catch {
        return null;
      }
    };
    api.setTime = (seconds) => {
      try {
        return applySimTime(seconds);
      } catch {
        return null;
      }
    };
    api.setHud = (visible) => {
      if (typeof visible !== 'boolean') return null;
      setAppState((prev) => {
        const updated = { ...prev, hudVisible: visible };
        stateRef.current = updated;
        return updated;
      });
      return api.getState();
    };
    api.setParam = (key, value) => {
      try {
        return handleParamChange(key, value);
      } catch {
        return null;
      }
    };
    api.reset = () => {
      try {
        return handleResetAll();
      } catch {
        return null;
      }
    };

    window.__GARGANTUA__ = api;

    return () => {
      delete window.__GARGANTUA__;
      delete document.documentElement.dataset.gargantuaReady;
      droneRef.current?.dispose();
      droneRef.current = null;
      rendererInstance.dispose();
      engineRef.current = null;
    };
  }, [applyDebug, applyPreset, applyQuality, applySimTime, handleParamChange, handleResetAll]);

  // Global keyboard shortcuts (0-9, Shift+1..4, Space, H, R, Q, M)
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          (tag === 'INPUT' && target.type !== 'range' && target.type !== 'button')
        ) {
          return;
        }
      }

      const { code, shiftKey } = event;

      if (shiftKey && /^Digit[1-4]$/.test(code)) {
        event.preventDefault();
        const presetIdx = Number(code.slice(5)) - 1;
        applyPreset(presetIdx);
        return;
      }

      if (!shiftKey && /^Digit[0-9]$/.test(code)) {
        event.preventDefault();
        const debugIdx = Number(code.slice(5));
        applyDebug(debugIdx);
        return;
      }

      if (code === 'Space') {
        event.preventDefault();
        handleTogglePlay();
        return;
      }

      if (code === 'KeyH') {
        event.preventDefault();
        handleToggleHud();
        return;
      }

      if (code === 'KeyR') {
        event.preventDefault();
        handleResetAll();
        return;
      }

      if (code === 'KeyQ') {
        event.preventDefault();
        handleCycleQuality();
        return;
      }

      if (code === 'KeyM') {
        event.preventDefault();
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
    handleToggleHud,
    handleTogglePlay,
  ]);

  return (
    <main className="viewport-shell">
      <canvas
        ref={canvasRef}
        className="raytracer-canvas"
        data-testid="gargantua-canvas"
        aria-label="Gargantua Schwarzschild Black Hole Raytracer Canvas"
      />
      <HudOverlay
        hudVisible={appState.hudVisible}
        capture={appState.capture}
        drawerCollapsed={appState.drawerCollapsed}
        quality={appState.quality}
        budget={runtimeInfo.budget}
        preset={appState.preset}
        debug={appState.debug}
        cinematicPlaying={appState.cinematicPlaying}
        audioEnabled={appState.audioEnabled}
        fps={runtimeInfo.fps}
        params={appState.params}
        contextLost={runtimeInfo.contextLost}
        onToggleHud={handleToggleHud}
        onToggleDrawer={handleToggleDrawer}
        onCycleQuality={handleCycleQuality}
        onSelectQuality={applyQuality}
        onSelectPreset={applyPreset}
        onSelectDebug={applyDebug}
        onTogglePlay={handleTogglePlay}
        onToggleAudio={handleToggleAudio}
        onParamChange={handleParamChange}
        onResetParam={handleResetParam}
        onResetAll={handleResetAll}
      />
    </main>
  );
}
