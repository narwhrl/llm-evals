import { QUALITY_TIERS } from './state.js';

function toInt(value) {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'string' && /^-?\d+$/.test(value.trim())) {
    return parseInt(value.trim(), 10);
  }
  return NaN;
}

/**
 * Expose the automation API on window.__GARGANTUA__:
 * read-only `ready`, `getState()`, and the validated setters
 * setQuality/setPreset/setDebug/setTime. Setters return the updated state or
 * null for invalid input; nothing here throws.
 */
export function exposeGargantuaApi(store, renderer, urlInfo) {
  const safe = (fn) => {
    try {
      return fn();
    } catch {
      return null;
    }
  };

  const state = () =>
    safe(() => ({
      ready: true,
      capture: urlInfo.capture,
      quality: store.state.quality,
      preset: store.state.presetIndex,
      debug: store.state.debugView,
      hud: store.state.hudCollapsed ? 0 : 1,
      time: renderer.getSimTime(),
      timeFrozen: renderer.isTimeFrozen(),
      cinematic: store.state.cinematic,
      params: { ...store.state.params },
    }));

  const api = {
    get ready() {
      return true;
    },
    getState: state,
    setQuality: (level) =>
      safe(() => {
        if (typeof level !== 'string' || !(level in QUALITY_TIERS)) return null;
        return store.setQuality(level) ? state() : null;
      }),
    setPreset: (index) =>
      safe(() => {
        const n = toInt(index);
        return Number.isInteger(n) && store.setPreset(n) ? state() : null;
      }),
    setDebug: (index) =>
      safe(() => {
        const n = toInt(index);
        return Number.isInteger(n) && store.setDebugView(n) ? state() : null;
      }),
    setTime: (seconds) =>
      safe(() => {
        const n = Number(seconds);
        if (typeof seconds !== 'number' && typeof seconds !== 'string') return null;
        if (!Number.isFinite(n) || n < 0) return null;
        if (!renderer.setTime(n)) return null;
        return state();
      }),
  };

  window.__GARGANTUA__ = api;
  return api;
}
