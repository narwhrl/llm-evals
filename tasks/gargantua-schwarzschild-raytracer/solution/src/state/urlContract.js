import { DEBUG_MODES, PRESETS, QUALITY_LEVELS } from '../config/constants.js';

function parseStrictInt(raw, min, max) {
  if (raw === null || raw === undefined) return null;
  const trimmed = String(raw).trim();
  if (!/^-?\d+$/.test(trimmed)) return null;
  const value = Number.parseInt(trimmed, 10);
  if (!Number.isInteger(value) || value < min || value > max) return null;
  return value;
}

function parseFiniteNonNegative(raw) {
  if (raw === null || raw === undefined) return null;
  const trimmed = String(raw).trim();
  if (trimmed === '') return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

/**
 * Parses URL capture/override parameters with strict validation and safe fallbacks.
 * Supported contract: ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
 */
export function parseUrlContract(searchString = window.location.search) {
  const query = new URLSearchParams(searchString);
  const capture = query.get('capture') === '1';

  const result = {
    capture,
    hasQuality: query.has('quality'),
    quality: null,
    hasPreset: query.has('preset'),
    preset: null,
    hasDebug: query.has('debug'),
    debugMode: null,
    hasTime: query.has('time'),
    time: capture ? 0 : null,
    hasHud: query.has('hud'),
    hudVisible: null,
  };

  if (result.hasQuality) {
    const rawQ = String(query.get('quality') ?? '').trim();
    result.quality = QUALITY_LEVELS.includes(rawQ) ? rawQ : 'high';
  }

  if (result.hasPreset) {
    const parsedPreset = parseStrictInt(query.get('preset'), 0, PRESETS.length - 1);
    result.preset = parsedPreset !== null ? parsedPreset : 0;
  }

  if (result.hasDebug) {
    const parsedDebug = parseStrictInt(query.get('debug'), 0, DEBUG_MODES.length - 1);
    result.debugMode = parsedDebug !== null ? parsedDebug : 0;
  }

  if (result.hasTime) {
    const parsedTime = parseFiniteNonNegative(query.get('time'));
    result.time = parsedTime !== null ? parsedTime : 0;
  }

  if (result.hasHud) {
    const rawHud = String(query.get('hud') ?? '').trim();
    if (rawHud === '0') result.hudVisible = false;
    else if (rawHud === '1') result.hudVisible = true;
    else result.hudVisible = true;
  }

  return result;
}
