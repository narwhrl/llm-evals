import {
  QUALITY_LEVELS,
  PRESETS,
  DEFAULT_QUALITY,
  DEFAULT_PRESET,
  DEFAULT_DEBUG,
  DEFAULT_HUD_OPEN,
} from './config.js';

const INT_RE = /^[+-]?\d+$/;

function readInt(raw, min, max) {
  if (raw === null) return null;
  const value = raw.trim();
  if (!INT_RE.test(value)) return null;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return null;
  if (n < min || n > max) return null;
  return n;
}

/**
 * Parses the stable same-origin capture contract:
 *   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
 *
 * A parameter that is present but invalid falls back to its default value, a
 * parameter that is absent returns null so that the persisted state is used.
 * Nothing here can throw, so a malformed URL can never break the page.
 */
export function readUrlState(search) {
  const result = {
    capture: false,
    quality: null,
    preset: null,
    debug: null,
    time: null,
    hud: null,
  };
  if (!search) return result;
  const q = new URLSearchParams(search);

  if (q.get('capture') === '1') result.capture = true;

  if (q.has('quality')) {
    const quality = q.get('quality');
    result.quality = QUALITY_LEVELS.includes(quality) ? quality : DEFAULT_QUALITY;
  }

  if (q.has('preset')) {
    result.preset = readInt(q.get('preset'), 0, PRESETS.length - 1) ?? DEFAULT_PRESET;
  }

  if (q.has('debug')) {
    result.debug = readInt(q.get('debug'), 0, 9) ?? DEFAULT_DEBUG;
  }

  if (q.has('time')) {
    const timeRaw = q.get('time');
    const time = timeRaw === null || timeRaw.trim() === '' ? NaN : Number(timeRaw);
    result.time = Number.isFinite(time) && time >= 0 ? time : 0;
  }

  if (q.has('hud')) {
    const hud = q.get('hud');
    result.hud = hud === '0' || hud === '1' ? hud === '1' : DEFAULT_HUD_OPEN;
  }

  return result;
}
