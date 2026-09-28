import { STORAGE_KEY, STORAGE_VERSION, QUALITY_LEVELS, sanitizeParams } from './constants.js';

// Versioned localStorage persistence. Schema changes bump STORAGE_VERSION,
// which invalidates older records instead of misreading them.

function sanitizeState(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const state = {};
  state.quality = QUALITY_LEVELS.includes(raw.quality) ? raw.quality : 'high';
  state.preset = Number.isSafeInteger(raw.preset) && raw.preset >= -1 && raw.preset <= 3 ? raw.preset : 0;
  state.debug = Number.isSafeInteger(raw.debug) && raw.debug >= 0 && raw.debug <= 9 ? raw.debug : 0;
  state.hudVisible = typeof raw.hudVisible === 'boolean' ? raw.hudVisible : true;
  state.cinematic = typeof raw.cinematic === 'boolean' ? raw.cinematic : true;
  state.params = sanitizeParams(raw.params);
  return state;
}

export function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STORAGE_VERSION) return null;
    return sanitizeState(parsed.state);
  } catch {
    return null; // corrupted record, private-mode quota error, etc. -> defaults
  }
}

export function savePersistedState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, state }),
    );
  } catch {
    // Persistence is best-effort; rendering must keep working without it.
  }
}

export function clearPersistedState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
