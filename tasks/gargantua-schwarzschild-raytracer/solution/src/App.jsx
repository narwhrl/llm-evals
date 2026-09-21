import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HUD from './components/HUD.jsx';
import { GargantuaRenderer } from './lib/renderer.js';
import {
  createDefaultAppState,
  createDefaultParams,
  PRESETS,
  QUALITY_LEVELS,
  DEBUG_VIEWS,
} from './lib/defaults.js';
import { loadState, saveState, clearState, sanitizeState } from './lib/storage.js';
import { parseUrlLaunch, applyLaunchToState } from './lib/urlCapture.js';

function cycleQuality(q) {
  const i = QUALITY_LEVELS.indexOf(q);
  return QUALITY_LEVELS[(i + 1) % QUALITY_LEVELS.length];
}

export default function App() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const stateRef = useRef(null);

  const launch = useMemo(() => parseUrlLaunch(), []);
  const [state, setState] = useState(() => {
    const loaded = loadState();
    return applyLaunchToState(loaded, launch);
  });
  const [contextLost, setContextLost] = useState(false);
  const [ready, setReady] = useState(false);

  stateRef.current = state;

  const commit = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const clean = sanitizeState(next);
      if (!launch.capture) saveState(clean);
      return clean;
    });
  }, [launch.capture]);

  const getPublicState = useCallback(() => {
    const s = stateRef.current;
    return {
      ready: !!rendererRef.current?.ready,
      quality: s.quality,
      preset: s.preset,
      debug: s.debug,
      time: rendererRef.current?.simTime ?? s.simTime,
      hud: s.hudVisible,
      cinematicPlaying: s.cinematicPlaying,
      params: { ...s.params },
      capture: launch.capture,
      debugLabel: (DEBUG_VIEWS[s.debug] || DEBUG_VIEWS[0]).name,
    };
  }, [launch.capture]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new GargantuaRenderer(canvas, {
      params: state.params,
      onContextLost: () => setContextLost(true),
      onContextRestored: () => {
        setContextLost(false);
        const s = stateRef.current;
        renderer.setParams(s.params);
        renderer.setQuality(s.quality);
        renderer.setDebug(s.debug);
        renderer.applySphericalFromParams();
      },
      onReady: () => {
        setReady(true);
        document.documentElement.dataset.gargantuaReady = 'true';
      },
    });
    rendererRef.current = renderer;

    renderer.setParams(state.params);
    renderer.setQuality(state.quality);
    renderer.setDebug(state.debug);
    renderer.setPreset(state.preset);
    // Re-apply spherical after preset so URL/camera params win when not using preset-only
    if (launch.capture) {
      renderer.setCaptureMode(true, launch.time);
      renderer.setTime(launch.time);
      renderer.setQuality(state.quality);
      renderer.setDebug(state.debug);
      renderer.setPreset(state.preset);
    } else {
      renderer.applySphericalFromParams();
      renderer.setCinematicPlaying(state.cinematicPlaying);
    }

    window.__GARGANTUA__ = {
      get ready() {
        return !!rendererRef.current?.ready;
      },
      getState: () => getPublicState(),
      setQuality: (level) => {
        const q = String(level || '').toLowerCase();
        if (!QUALITY_LEVELS.includes(q)) return { ok: false, error: 'invalid quality', state: getPublicState() };
        renderer.setQuality(q);
        stateRef.current = { ...stateRef.current, quality: q };
        commit((s) => ({ ...s, quality: q }));
        return { ok: true, state: getPublicState() };
      },
      setPreset: (index) => {
        const i = Number(index);
        if (!renderer.setPreset(i)) return { ok: false, error: 'invalid preset', state: getPublicState() };
        const params = {
          ...stateRef.current.params,
          fov: PRESETS[i].fov,
          camDistance: PRESETS[i].distance,
          camAzimuth: PRESETS[i].azimuth,
          camElevation: PRESETS[i].elevation,
        };
        stateRef.current = { ...stateRef.current, preset: i, params };
        commit((s) => ({ ...s, preset: i, params }));
        return { ok: true, state: getPublicState() };
      },
      setDebug: (index) => {
        const i = Number(index);
        if (!renderer.setDebug(i)) return { ok: false, error: 'invalid debug', state: getPublicState() };
        stateRef.current = { ...stateRef.current, debug: i };
        commit((s) => ({ ...s, debug: i }));
        return { ok: true, state: getPublicState() };
      },
      setTime: (seconds) => {
        if (!renderer.setTime(seconds)) return { ok: false, error: 'invalid time', state: getPublicState() };
        stateRef.current = { ...stateRef.current, simTime: Number(seconds) };
        commit((s) => ({ ...s, simTime: Number(seconds) }));
        return { ok: true, state: getPublicState() };
      },
    };

    return () => {
      delete window.__GARGANTUA__;
      delete document.documentElement.dataset.gargantuaReady;
      renderer.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep renderer params in sync
  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    r.setParams(state.params);
    r.setQuality(state.quality);
    r.setDebug(state.debug);
    r.setCinematicPlaying(state.cinematicPlaying);
  }, [state.params, state.quality, state.debug, state.cinematicPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      const r = rendererRef.current;
      if (!r) return;

      if (e.code === 'Space') {
        e.preventDefault();
        commit((s) => {
          const playing = !s.cinematicPlaying;
          r.setCinematicPlaying(playing);
          return { ...s, cinematicPlaying: playing };
        });
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        commit((s) => ({ ...s, hudVisible: !s.hudVisible }));
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        clearState();
        const fresh = applyLaunchToState(createDefaultAppState(), launch.capture ? launch : { ...launch, capture: false, hud: true });
        // Full reset ignores capture freeze for interactive reset unless still in capture URL
        const reset = launch.capture
          ? applyLaunchToState(createDefaultAppState(), launch)
          : createDefaultAppState();
        commit(() => reset);
        r.setParams(reset.params);
        r.setQuality(reset.quality);
        r.setDebug(reset.debug);
        r.setPreset(reset.preset);
        r.setCinematicPlaying(reset.cinematicPlaying);
        if (launch.capture) r.setCaptureMode(true, launch.time);
        return;
      }
      if (e.key === 'q' || e.key === 'Q') {
        commit((s) => {
          const nq = cycleQuality(s.quality);
          r.setQuality(nq);
          return { ...s, quality: nq };
        });
        return;
      }
      if (e.shiftKey && e.code >= 'Digit1' && e.code <= 'Digit4') {
        const idx = Number(e.code.replace('Digit', '')) - 1;
        if (r.setPreset(idx)) {
          commit((s) => ({
            ...s,
            preset: idx,
            params: {
              ...s.params,
              fov: PRESETS[idx].fov,
              camDistance: PRESETS[idx].distance,
              camAzimuth: PRESETS[idx].azimuth,
              camElevation: PRESETS[idx].elevation,
            },
          }));
        }
        return;
      }
      if (!e.shiftKey && e.code >= 'Digit0' && e.code <= 'Digit9') {
        const idx = Number(e.code.replace('Digit', ''));
        if (r.setDebug(idx)) commit((s) => ({ ...s, debug: idx }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [commit, launch]);

  const onParam = (key, value) => {
    commit((s) => {
      const params = { ...s.params, [key]: value };
      if (key === 'diskInner' && params.diskOuter < params.diskInner + 0.5) {
        params.diskOuter = params.diskInner + 0.5;
      }
      if (key === 'diskOuter' && params.diskOuter < params.diskInner + 0.5) {
        params.diskInner = Math.max(1.05, params.diskOuter - 0.5);
      }
      const r = rendererRef.current;
      if (r && (key === 'fov' || key === 'camDistance' || key === 'camAzimuth' || key === 'camElevation')) {
        r.setParams(params);
        r.applySphericalFromParams();
      }
      return { ...s, params };
    });
  };

  return (
    <div className="app">
      <div className="viewport">
        <canvas ref={canvasRef} />
      </div>
      {contextLost && (
        <div className="context-banner" role="status">
          WebGL context lost — waiting to restore (no page reload). State is preserved.
        </div>
      )}
      <HUD
        visible={state.hudVisible}
        state={state}
        onToggleHud={() => commit((s) => ({ ...s, hudVisible: !s.hudVisible }))}
        onParam={onParam}
        onQuality={(q) => {
          rendererRef.current?.setQuality(q);
          commit((s) => ({ ...s, quality: q }));
        }}
        onPreset={(i) => {
          rendererRef.current?.setPreset(i);
          commit((s) => ({
            ...s,
            preset: i,
            params: {
              ...s.params,
              fov: PRESETS[i].fov,
              camDistance: PRESETS[i].distance,
              camAzimuth: PRESETS[i].azimuth,
              camElevation: PRESETS[i].elevation,
            },
          }));
        }}
        onDebug={(i) => {
          rendererRef.current?.setDebug(i);
          commit((s) => ({ ...s, debug: i }));
        }}
        onToggleCinematic={() => {
          commit((s) => {
            const playing = !s.cinematicPlaying;
            rendererRef.current?.setCinematicPlaying(playing);
            return { ...s, cinematicPlaying: playing };
          });
        }}
        onReset={() => {
          clearState();
          const reset = launch.capture
            ? applyLaunchToState(createDefaultAppState(), launch)
            : createDefaultAppState();
          const r = rendererRef.current;
          commit(() => reset);
          if (r) {
            r.setParams(reset.params);
            r.setQuality(reset.quality);
            r.setDebug(reset.debug);
            r.setPreset(reset.preset);
            r.setCinematicPlaying(reset.cinematicPlaying);
            if (launch.capture) r.setCaptureMode(true, launch.time);
          }
        }}
      />
      {!ready && null}
    </div>
  );
}
