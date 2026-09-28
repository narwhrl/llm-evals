// 应用状态 store：极小可观察容器 + 动作（含参数约束）。
import {
  DEFAULT_PARAMS,
  DEFAULT_QUALITY,
  QUALITY_ORDER,
  PRESETS,
  PARAM_DEFS,
} from './defaults.js';

const DEF_BY_KEY = new Map(PARAM_DEFS.map((d) => [d.key, d]));

export function clampParam(key, value) {
  const def = DEF_BY_KEY.get(key);
  if (!def || typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(def.max, Math.max(def.min, value));
}

export function createAppStore(initial = {}) {
  let state = {
    params: { ...DEFAULT_PARAMS },
    quality: DEFAULT_QUALITY,
    preset: 0,
    debug: 0,
    hudOpen: true,
    playing: false,
    ctxStatus: 'normal', // normal | lost | restored
    capture: false,
    ...initial,
  };
  const subs = new Set();
  const get = () => state;
  const set = (patch) => {
    state = { ...state, ...patch };
    subs.forEach((fn) => fn(state));
  };

  const setParams = (partial) => {
    const params = { ...state.params };
    for (const key of Object.keys(partial)) {
      const c = clampParam(key, partial[key]);
      if (c !== null) params[key] = c;
    }
    // 盘外半径约束：≥ 盘内半径 + 1
    params.diskOuter = Math.max(params.diskOuter, params.diskInner + 1);
    set({ params });
  };

  const actions = {
    setParams,
    setParam(key, value) {
      setParams({ [key]: value });
    },
    applyPreset(i) {
      if (!Number.isInteger(i)) return false;
      const p = PRESETS[i];
      if (!p) return false;
      set({
        preset: i,
        playing: false, // 选择预设属于手动控制
        params: {
          ...state.params,
          camDist: p.camDist,
          camAzimuth: p.camAzimuth,
          camElevation: p.camElevation,
          fov: p.fov,
        },
      });
      return true;
    },
    setQuality(level) {
      if (!QUALITY_ORDER.includes(level)) return false;
      set({ quality: level });
      return true;
    },
    cycleQuality() {
      const i = QUALITY_ORDER.indexOf(state.quality);
      set({ quality: QUALITY_ORDER[(i + 1) % QUALITY_ORDER.length] });
    },
    setDebug(i) {
      if (!Number.isInteger(i) || i < 0 || i > 9) return false;
      set({ debug: i });
      return true;
    },
    toggleHud() {
      set({ hudOpen: !state.hudOpen });
    },
    setHud(open) {
      set({ hudOpen: !!open });
    },
    togglePlayback() {
      if (state.capture) return false; // capture 模式禁用电影镜头循环
      set({ playing: !state.playing });
      return true;
    },
    setPlaying(v) {
      set({ playing: state.capture ? false : !!v });
    },
    setCtxStatus(s) {
      set({ ctxStatus: s });
    },
    resetAll() {
      set({
        params: { ...DEFAULT_PARAMS },
        quality: DEFAULT_QUALITY,
        preset: 0,
        debug: 0,
        hudOpen: true,
        playing: false,
      });
    },
  };

  return { get, set, subscribe, ...actions };

  function subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }
}

export const appStore = createAppStore();
