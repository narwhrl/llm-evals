import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Engine } from './engine.js';
import { createStore } from './store.js';
import { installAutomation } from './automation.js';
import {
  PARAMS,
  PARAM_GROUPS,
  PRESETS,
  DEBUG_MODES,
  QUALITY_LEVELS,
  QUALITY_PROFILES,
  defaultState,
  loadState,
  saveState,
  clearState,
  parseUrl,
} from './state.js';
import Hud from './Hud.jsx';

const url = parseUrl(window.location.search);

function initialState() {
  // Capture runs ignore persisted state so URLs render deterministically.
  const base = url.capture ? defaultState() : loadState();
  const s = { ...base, ...url.overrides };
  if ('preset' in url.overrides) s.params = { ...s.params, ...PRESETS[s.preset].camera };
  if (url.capture) s.cinematic = false;
  return s;
}

const store = createStore(initialState());

export const actions = {
  setPreset(index) {
    store.set((s) => ({ ...s, preset: index, cinematic: false, params: { ...s.params, ...PRESETS[index].camera } }));
  },
  setDebug(index) {
    store.set({ debug: index });
  },
  setQuality(level) {
    store.set({ quality: level });
  },
  cycleQuality() {
    const s = store.get();
    const i = QUALITY_LEVELS.indexOf(s.quality);
    store.set({ quality: QUALITY_LEVELS[(i + 1) % QUALITY_LEVELS.length] });
  },
  toggleHud() {
    store.set((s) => ({ ...s, hud: !s.hud }));
  },
  toggleCinematic() {
    store.set((s) => ({ ...s, cinematic: !s.cinematic }));
  },
  setParam(key, value) {
    store.setParams({ [key]: value });
  },
  reset() {
    clearState();
    const d = defaultState();
    store.set({ ...d, hud: true, cinematic: url.capture ? false : d.cinematic });
  },
};

function useStore() {
  return useSyncExternalStore(store.subscribe, store.get);
}

function isEditable(target) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) && target.type !== 'range');
}

export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const state = useStore();
  const [status, setStatus] = useState({ contextLost: false, renderSize: [0, 0], dpr: 1, error: null });

  useEffect(() => {
    let engine;
    try {
      engine = new Engine(canvasRef.current, store, {
        capture: url.capture,
        time: url.time,
        onStatus: (patch) => setStatus((prev) => ({ ...prev, ...patch })),
      });
    } catch (err) {
      console.error('[gargantua] WebGL2 initialisation failed', err);
      setStatus((prev) => ({ ...prev, error: String(err && err.message ? err.message : err) }));
      return undefined;
    }
    engineRef.current = engine;
    const uninstall = installAutomation({ store, engine, actions, rejected: url.rejected });
    engine.whenReady((shaderError) => {
      if (shaderError) {
        setStatus((prev) => ({ ...prev, error: 'Shader 编译失败' }));
        return;
      }
      document.documentElement.dataset.gargantuaReady = 'true';
    });
    return () => {
      uninstall();
      engine.dispose();
      engineRef.current = null;
      delete document.documentElement.dataset.gargantuaReady;
    };
  }, []);

  // Persist on every change, except in capture mode.
  useEffect(() => {
    if (!url.capture) saveState(state);
  }, [state]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isEditable(e.target)) return;
      const code = e.code || '';
      if (e.shiftKey && /^Digit[1-4]$/.test(code)) {
        actions.setPreset(Number(code.slice(5)) - 1);
      } else if (!e.shiftKey && /^(Digit|Numpad)[0-9]$/.test(code)) {
        actions.setDebug(Number(code.slice(-1)));
      } else if (code === 'Space') {
        actions.toggleCinematic();
      } else if (code === 'KeyH') {
        actions.toggleHud();
      } else if (code === 'KeyR') {
        actions.reset();
      } else if (code === 'KeyQ') {
        actions.cycleQuality();
      } else {
        return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="stage" aria-label="Schwarzschild 黑洞实时光线追踪画面" />
      <Hud
        state={state}
        status={status}
        actions={actions}
        params={PARAMS}
        groups={PARAM_GROUPS}
        presets={PRESETS}
        debugModes={DEBUG_MODES}
        qualityProfiles={QUALITY_PROFILES}
        capture={url.capture}
      />
      {status.contextLost && (
        <div className="overlay" role="alert">
          <strong>WebGL 上下文已丢失</strong>
          <span>渲染已暂停，状态已保存。浏览器恢复上下文后将自动重建资源并继续。</span>
        </div>
      )}
      {status.error && (
        <div className="overlay error" role="alert">
          <strong>无法启动渲染器</strong>
          <span>{status.error}。需要支持 WebGL 2 的浏览器。</span>
        </div>
      )}
    </>
  );
}
