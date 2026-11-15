import {
  STORAGE_KEY,
  STORAGE_VERSION,
  QUALITY_LEVELS,
  ALL_PARAMS,
  DEFAULT_PARAMS,
  PRESETS,
  defaultState,
  clampParam,
} from './config.js';

function clampInt(value, min, max, fallback) {
  if (!Number.isInteger(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/**
 * Reads the persisted settings. Anything that does not match the current
 * storage version, or that is out of range, falls back to the defaults.
 */
export function loadState() {
  const fallback = defaultState();
  let raw = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return fallback;
  }
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STORAGE_VERSION || !parsed.state) return fallback;
    const stored = parsed.state;

    const params = { ...DEFAULT_PARAMS };
    for (const def of ALL_PARAMS) {
      const value = clampParam(def.key, stored.params ? stored.params[def.key] : undefined);
      if (value !== null) params[def.key] = value;
    }
    params.diskOuter = Math.max(params.diskOuter, params.diskInner + 0.25);

    return {
      params,
      quality: QUALITY_LEVELS.includes(stored.quality) ? stored.quality : fallback.quality,
      preset: clampInt(stored.preset, 0, PRESETS.length - 1, fallback.preset),
      debug: clampInt(stored.debug, 0, 9, fallback.debug),
      hudOpen: typeof stored.hudOpen === 'boolean' ? stored.hudOpen : fallback.hudOpen,
      cinematic: typeof stored.cinematic === 'boolean' ? stored.cinematic : fallback.cinematic,
      // Audio is never restored automatically: browsers block autoplay and a
      // stale "playing" flag would raise console errors.
      audio: false,
    };
  } catch {
    return fallback;
  }
}

export function saveState(state) {
  try {
    const payload = {
      version: STORAGE_VERSION,
      state: {
        params: state.params,
        quality: state.quality,
        preset: state.preset,
        debug: state.debug,
        hudOpen: state.hudOpen,
        cinematic: state.cinematic,
      },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
