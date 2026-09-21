import { QUALITY_LEVELS, createDefaultAppState } from './defaults.js';
import { sanitizeState } from './storage.js';

/**
 * Parse capture / launch query params.
 * Illegal values fall back to defaults without throwing.
 */
export function parseUrlLaunch(search = window.location.search) {
  const params = new URLSearchParams(search);
  const defaults = createDefaultAppState();
  const out = {
    capture: params.get('capture') === '1',
    quality: defaults.quality,
    preset: defaults.preset,
    debug: defaults.debug,
    time: 0,
    hud: defaults.hudVisible,
  };

  const q = String(params.get('quality') || '').toLowerCase();
  if (QUALITY_LEVELS.includes(q)) out.quality = q;

  const preset = Number(params.get('preset'));
  if (Number.isInteger(preset) && preset >= 0 && preset <= 3) out.preset = preset;

  const debug = Number(params.get('debug'));
  if (Number.isInteger(debug) && debug >= 0 && debug <= 9) out.debug = debug;

  const time = Number(params.get('time'));
  if (Number.isFinite(time) && time >= 0) out.time = time;

  const hud = params.get('hud');
  if (hud === '0') out.hud = false;
  else if (hud === '1') out.hud = true;

  return out;
}

export function applyLaunchToState(baseState, launch) {
  const next = sanitizeState({
    ...baseState,
    quality: launch.quality,
    preset: launch.preset,
    debug: launch.debug,
    hudVisible: launch.hud,
    simTime: launch.capture ? launch.time : baseState.simTime,
    cinematicPlaying: launch.capture ? false : baseState.cinematicPlaying,
  });
  if (launch.capture) {
    next.simTime = launch.time;
    next.cinematicPlaying = false;
  }
  return next;
}
