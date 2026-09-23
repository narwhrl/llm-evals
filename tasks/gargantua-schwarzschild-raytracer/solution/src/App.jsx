// App.jsx - Main Application entry uniting React HUD, Three.js Renderer & Automation
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RaytracerRenderer } from './renderer/RaytracerRenderer.js';
import { HUD } from './components/HUD.jsx';
import { RecoveryBanner } from './components/RecoveryBanner.jsx';
import { ambientDrone } from './audio/ambientDrone.js';
import { parseUrlParameters, setupAutomationAPI } from './contracts/automationContract.js';
import {
  loadPersistedState,
  persistState,
  getDefaultState,
  QUALITY_TIERS
} from './contracts/stateDefaults.js';

export function App() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  // Load initial state (URL parameters override persisted state)
  const [appState, setAppState] = useState(() => {
    const persisted = loadPersistedState();
    const urlParams = parseUrlParameters();

    return {
      ...persisted,
      quality: urlParams.quality || persisted.quality,
      preset: urlParams.preset !== null ? urlParams.preset : persisted.preset,
      debug: urlParams.debug !== null ? urlParams.debug : persisted.debug,
      hudVisible: urlParams.hudVisible !== null ? urlParams.hudVisible : persisted.hudVisible,
      cinematicOrbit: urlParams.isCapture ? false : persisted.cinematicOrbit,
      audioEnabled: false // Audio always starts muted by default
    };
  });

  const [fps, setFps] = useState(60);
  const [isContextLost, setIsContextLost] = useState(false);
  const fpsFrames = useRef(0);
  const fpsLastTime = useRef(performance.now());
  const automationRef = useRef(null);
  const isFirstFrameRendered = useRef(false);

  // Handler for individual parameter changes
  const handleParameterChange = useCallback((id, val) => {
    setAppState((prev) => {
      const next = {
        ...prev,
        params: {
          ...prev.params,
          [id]: val
        }
      };
      persistState(next);
      return next;
    });

    if (rendererRef.current) {
      rendererRef.current.updateParameter(id, val);
    }
  }, []);

  // Handler for quality changes
  const handleQualityChange = useCallback((quality) => {
    setAppState((prev) => {
      const next = { ...prev, quality };
      persistState(next);
      return next;
    });

    if (rendererRef.current) {
      rendererRef.current.setQuality(quality);
    }
  }, []);

  // Handler for camera preset changes
  const handlePresetChange = useCallback((presetId) => {
    setAppState((prev) => {
      const next = { ...prev, preset: presetId };
      persistState(next);
      return next;
    });

    if (rendererRef.current) {
      rendererRef.current.applyPreset(presetId);
    }
  }, []);

  // Handler for debug view changes
  const handleDebugChange = useCallback((debugId) => {
    setAppState((prev) => {
      const next = { ...prev, debug: debugId };
      persistState(next);
      return next;
    });

    if (rendererRef.current) {
      rendererRef.current.setDebug(debugId);
    }
  }, []);

  // Handler for cinematic orbit toggle
  const handleCinematicToggle = useCallback(() => {
    setAppState((prev) => {
      const next = { ...prev, cinematicOrbit: !prev.cinematicOrbit };
      if (rendererRef.current) {
        rendererRef.current.setCinematicOrbit(next.cinematicOrbit);
      }
      return next;
    });
  }, []);

  // Handler for audio toggle
  const handleAudioToggle = useCallback(() => {
    const active = ambientDrone.toggle();
    setAppState((prev) => ({ ...prev, audioEnabled: active }));
  }, []);

  // Reset all parameters to defaults
  const handleResetAll = useCallback(() => {
    const def = getDefaultState();
    setAppState(def);
    persistState(def);

    if (rendererRef.current) {
      rendererRef.current.setQuality(def.quality);
      rendererRef.current.setDebug(def.debug);
      rendererRef.current.applyPreset(def.preset);
      rendererRef.current.setCinematicOrbit(def.cinematicOrbit);
      for (const [key, val] of Object.entries(def.params)) {
        rendererRef.current.updateParameter(key, val);
      }
    }
  }, []);

  // Toggle HUD visibility
  const handleToggleHUD = useCallback(() => {
    setAppState((prev) => {
      const next = { ...prev, hudVisible: !prev.hudVisible };
      persistState(next);
      return next;
    });
  }, []);

  // Initialize Three.js Renderer and setup Automation API
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const urlParams = parseUrlParameters();

    const renderer = new RaytracerRenderer(canvas, {
      quality: appState.quality,
      preset: appState.preset,
      debug: appState.debug,
      cinematicOrbit: appState.cinematicOrbit,
      params: appState.params,
      onFrame: (clockTime, dt) => {
        // Track FPS
        fpsFrames.current++;
        const now = performance.now();
        if (now - fpsLastTime.current >= 1000) {
          setFps(Math.round((fpsFrames.current * 1000) / (now - fpsLastTime.current)));
          fpsFrames.current = 0;
          fpsLastTime.current = now;
        }

        // Mark ready condition on first frame render
        if (!isFirstFrameRendered.current) {
          isFirstFrameRendered.current = true;
          if (automationRef.current) {
            automationRef.current.markReady();
          }
        }
      },
      onContextLost: () => {
        setIsContextLost(true);
      },
      onContextRestored: () => {
        setIsContextLost(false);
      },
      onCameraUserInteraction: () => {
        // User touched or dragged OrbitControls, disable cinematic orbit
        setAppState((prev) => {
          if (prev.cinematicOrbit) {
            renderer.setCinematicOrbit(false);
            return { ...prev, cinematicOrbit: false };
          }
          return prev;
        });
      }
    });

    rendererRef.current = renderer;

    // Apply URL time freeze if present
    if (urlParams.freezeTime !== null) {
      renderer.setTime(urlParams.freezeTime);
    }

    // Connect Automation Controller API
    const controller = {
      getFullState: () => {
        return {
          quality: renderer.quality,
          preset: renderer.presetIndex,
          debug: renderer.debugMode,
          time: renderer.clockTime,
          cinematicOrbit: renderer.cinematicOrbit,
          params: { ...renderer.params }
        };
      },
      applyQuality: (level) => {
        handleQualityChange(level);
      },
      applyPreset: (index) => {
        handlePresetChange(index);
      },
      applyDebug: (index) => {
        handleDebugChange(index);
      },
      applyTime: (sec) => {
        renderer.setTime(sec);
      }
    };

    automationRef.current = setupAutomationAPI(controller);

    renderer.start();

    // Resize handler
    const handleResize = () => {
      renderer.resize();
    };
    window.addEventListener('resize', handleResize);

    // Keyboard Hotkey Bindings
    const handleKeyDown = (e) => {
      // Ignore key events if focused in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // 0-9: Debug Modes
      if (e.key >= '0' && e.key <= '9' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        handleDebugChange(parseInt(e.key, 10));
        return;
      }

      // Shift+1 .. Shift+4: Presets
      if (e.shiftKey && e.code.startsWith('Digit')) {
        const digit = parseInt(e.code.replace('Digit', ''), 10);
        if (digit >= 1 && digit <= 4) {
          e.preventDefault();
          handlePresetChange(digit - 1);
          return;
        }
      }

      // Space: Toggle Cinematic Orbit
      if (e.code === 'Space') {
        e.preventDefault();
        handleCinematicToggle();
        return;
      }

      // H: Toggle HUD
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        handleToggleHUD();
        return;
      }

      // R: Reset All
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResetAll();
        return;
      }

      // Q: Cycle Quality
      if (e.key === 'q' || e.key === 'Q') {
        e.preventDefault();
        const keys = ['standard', 'high', 'cinematic'];
        setAppState((prev) => {
          const next = keys[(keys.indexOf(prev.quality) + 1) % keys.length];
          renderer.setQuality(next);
          persistState({ ...prev, quality: next });
          return { ...prev, quality: next };
        });
        return;
      }

      // M: Audio
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleAudioToggle();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      <HUD
        state={appState}
        fps={fps}
        onParameterChange={handleParameterChange}
        onQualityChange={handleQualityChange}
        onPresetChange={handlePresetChange}
        onDebugChange={handleDebugChange}
        onCinematicToggle={handleCinematicToggle}
        onAudioToggle={handleAudioToggle}
        onResetAll={handleResetAll}
        onToggleHUD={handleToggleHUD}
      />

      <RecoveryBanner visible={isContextLost} />
    </div>
  );
}
