import { PRESETS, QUALITY_PROFILES, applyPresetToParams } from './schema.js';

const INT_RE = /^\d+$/;
const MAX_TIME = 1_000_000;

function readInt(params, key, min, max) {
  if (!params.has(key)) return null;
  const raw = params.get(key);
  if (!INT_RE.test(raw)) return NaN;
  const value = Number(raw);
  return value >= min && value <= max ? value : NaN;
}

// Query parameters are a session override, never persisted. Invalid values
// fall back to the documented defaults rather than throwing or leaving the
// previous view in place.
export function applyUrlState(baseState, search = '') {
  const query = new URLSearchParams(search);
  const state = {
    ...baseState,
    params: { ...baseState.params },
    capture: false,
    frozen: false,
  };

  if (query.has('capture')) {
    state.capture = query.get('capture') === '1';
  }

  if (query.has('quality')) {
    const value = query.get('quality');
    state.quality = QUALITY_PROFILES[value] ? value : 'high';
  }

  if (query.has('preset')) {
    const index = readInt(query, 'preset', 0, PRESETS.length - 1);
    state.preset = Number.isNaN(index) ? 0 : index;
    state.params = applyPresetToParams(state.params, state.preset);
  }

  if (query.has('debug')) {
    const index = readInt(query, 'debug', 0, 9);
    state.debug = Number.isNaN(index) ? 0 : index;
  }

  if (query.has('hud')) {
    const value = query.get('hud');
    state.hudOpen = value === '1' ? true : value === '0' ? false : true;
  }

  if (query.has('time')) {
    const time = Number(query.get('time'));
    state.time = Number.isFinite(time) && time >= 0 ? Math.min(time, MAX_TIME) : 0;
  }

  if (state.capture) {
    // Capture frames are deterministic: no cinematic orbit, no clock advance.
    state.playing = false;
    state.frozen = true;
  }

  return state;
}
