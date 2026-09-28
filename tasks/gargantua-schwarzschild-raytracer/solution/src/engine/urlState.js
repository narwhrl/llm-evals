// Parsing of the screenshot-automation URL contract:
//   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
//
// Per-field result:
//   undefined    -> parameter absent: keep the resolved (persisted/default) value
//   URL_DEFAULT  -> parameter present but invalid: force the safe default value
//   otherwise    -> validated value from the URL

export const URL_DEFAULT = Symbol('gargantua-url-default');

const QUALITY_SET = new Set(['standard', 'high', 'cinematic']);

function intField(raw, min, max) {
  if (raw === null) return undefined;
  if (!/^[+-]?\d+$/.test(raw.trim())) return URL_DEFAULT;
  const n = Number(raw.trim());
  if (!Number.isSafeInteger(n) || n < min || n > max) return URL_DEFAULT;
  return n;
}

export function parseCaptureUrl(search) {
  const q = new URLSearchParams(search || '');

  const capture = q.get('capture');
  const quality = q.get('quality');
  const hud = q.get('hud');
  const timeRaw = (q.get('time') || '').trim();

  let time;
  if (q.get('time') === null) {
    time = undefined;
  } else if (/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(timeRaw)) {
    const t = Number(timeRaw);
    time = Number.isFinite(t) && t >= 0 ? t : URL_DEFAULT;
  } else {
    time = URL_DEFAULT;
  }

  let hudValue;
  if (hud === null) hudValue = undefined;
  else if (hud === '0') hudValue = false;
  else if (hud === '1') hudValue = true;
  else hudValue = URL_DEFAULT;

  return {
    capture: capture === '1',
    quality: quality === null ? undefined : QUALITY_SET.has(quality.trim().toLowerCase()) ? quality.trim().toLowerCase() : URL_DEFAULT,
    preset: intField(q.get('preset'), 0, 3),
    debug: intField(q.get('debug'), 0, 9),
    hud: hudValue,
    time,
  };
}
