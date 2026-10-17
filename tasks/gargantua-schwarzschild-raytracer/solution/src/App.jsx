import { useEffect, useMemo, useRef, useState } from 'react';
import { GargantuaRenderer } from './renderer.js';
import { State, applyUrlParams } from './state.js';
import { Hud } from './Hud.jsx';
import { DEBUG_VIEWS, QUALITY_ORDER, QUALITY_LEVELS } from './config.js';

export default function App() {
  const stageRef = useRef(null);
  const engineRef = useRef(null);
  const state = useMemo(() => {
    const s = new State();
    s.load();
    return s;
  }, []);

  const [, force] = useState(0);
  const rerender = () => force((n) => n + 1);
  const [lost, setLost] = useState(false);
  const [hudCollapsed, setHudCollapsed] = useState(false);

  useEffect(() => {
    const url = applyUrlParams(state, window.location.search);
    const engine = new GargantuaRenderer(stageRef.current, state);
    engineRef.current = engine;
    engine.simFrozen = url.capture;

    engine.onUserInteract = () => {
      // once the user grabs the camera the cinematic loop yields for good
      // until they explicitly resume it — control is never silently lost
      if (state.cinematic) {
        state.setCinematic(false);
        rerender();
      }
    };
    engine.onContextLost = () => setLost(true);
    engine.onContextRestored = () => setLost(false);
    engine.onReady = () => {
      document.documentElement.dataset.gargantuaReady = 'true';
      const boot = document.getElementById('boot');
      if (boot) {
        // display:none immediately — the transition is only for real users on
        // the first paint; capture and automated flows must never see it.
        boot.style.display = 'none';
      }
    };

    state.on(rerender);
    engine.applyPreset(state.preset, { keepFov: true });
    engine.applyParams();
    // reflect URL-applied state (preset/debug/hud/quality) in the HUD
    rerender();

    // ---- automation surface -------------------------------------------
    window.__GARGANTUA__ = {
      ready: true,
      getState: () => state.snapshot(),
      setQuality: (level) => {
        const q = state.setQuality(level);
        if (q === level) engine.setQuality(level);
        return q;
      },
      setPreset: (index) => {
        const p = state.setPreset(index);
        engine.applyPreset(p);
        return p;
      },
      setDebug: (index) => {
        const d = state.setDebug(index);
        engine.applyParams();
        return d;
      },
      setTime: (seconds) => {
        const t = Number(seconds);
        if (Number.isFinite(t) && t >= 0) {
          state.simTime = t;
          engine.simFrozen = true;
        }
        return state.simTime;
      },
    };

    // ---- keyboard shortcuts --------------------------------------------
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.shiftKey && e.code.startsWith('Digit')) {
        const n = Number(e.code.slice(5));
        if (n >= 1 && n <= 4) {
          state.setPreset(n - 1);
          engine.applyPreset(n - 1);
          e.preventDefault();
        }
        return;
      }
      switch (e.code) {
        case 'Space':
          state.setCinematic(!state.cinematic);
          if (state.cinematic) engine.userInteracted = false;
          e.preventDefault();
          break;
        case 'KeyH':
          state.setHud(state.hud ? 0 : 1);
          break;
        case 'KeyR':
          state.reset();
          engine.userInteracted = false;
          engine.applyPreset(0);
          engine.setQuality(state.quality);
          engine.resize();
          break;
        case 'KeyQ': {
          const i = QUALITY_ORDER.indexOf(state.quality);
          const next = QUALITY_ORDER[(i + 1) % QUALITY_ORDER.length];
          state.setQuality(next);
          engine.setQuality(next);
          break;
        }
        case 'KeyM':
          state.setMusic?.(!state.musicOn);
          break;
        default: {
          if (!e.shiftKey && e.code.startsWith('Digit')) {
            const n = Number(e.code.slice(5));
            if (n >= 0 && n <= 9) {
              state.setDebug(n);
              engine.applyParams();
            }
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      delete window.__GARGANTUA__;
      delete document.documentElement.dataset.gargantuaReady;
      engine.dispose();
      engineRef.current = null;
    };
  }, [state]);

  const s = state;
  const q = QUALITY_LEVELS[s.quality];

  return (
    <div className="app">
      <div className="stage" ref={stageRef} />
      <Hud
        state={s}
        collapsed={hudCollapsed}
        onToggleCollapsed={() => setHudCollapsed((c) => !c)}
        engineRef={engineRef}
        onTick={rerender}
      />
      <div className="debug-chip" hidden={s.debug === 0}>
        [{s.debug}] {DEBUG_VIEWS[s.debug]?.name}
      </div>
      <div className="overlay" hidden={!lost}>
        <div className="big">WEBGL CONTEXT LOST</div>
        <div className="small">Rendering paused. State is preserved; the context will be restored automatically.</div>
      </div>
      <div className="overlay" hidden={!s.cinematic === false} />
    </div>
  );
}
