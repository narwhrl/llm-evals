import {
  QUALITY_LEVELS,
  STORAGE_KEY,
  STORAGE_VERSION,
  PRESETS,
  DEBUG_MODES,
  sanitizeParams,
} from '../config/constants.js';

function isValidQuality(value) {
  return typeof value === 'string' && QUALITY_LEVELS.includes(value);
}

function isValidIntRange(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

export function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== STORAGE_VERSION) {
      return null;
    }

    const state = {};
    if (isValidQuality(parsed.quality)) state.quality = parsed.quality;
    if (isValidIntRange(parsed.preset, 0, PRESETS.length - 1)) state.preset = parsed.preset;
    if (isValidIntRange(parsed.debugMode, 0, DEBUG_MODES.length - 1)) {
      state.debugMode = parsed.debugMode;
    }
    if (typeof parsed.hudVisible === 'boolean') state.hudVisible = parsed.hudVisible;
    if (typeof parsed.hudExpanded === 'boolean') state.hudExpanded = parsed.hudExpanded;
    if (typeof parsed.cinematicMode === 'boolean') state.cinematicMode = parsed.cinematicMode;
    if (parsed.params && typeof parsed.params === 'object') {
      state.params = sanitizeParams(parsed.params);
    }
    return state;
  } catch {
    return null;
  }
}

export function savePersistedState(state) {
  try {
    const payload = {
      version: STORAGE_VERSION,
      quality: state.quality,
      preset: state.preset,
      debugMode: state.debugMode,
      hudVisible: state.hudVisible,
      hudExpanded: state.hudExpanded,
      cinematicMode: state.cinematicMode,
      params: sanitizeParams(state.params),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearPersistedState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
