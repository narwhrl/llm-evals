// Parse and validate the capture URL contract.
// Illegal values are dropped (returning defaults).

const VALID_QUALITIES = new Set(['standard', 'high', 'cinematic']);
const VALID_PRESETS = new Set([0, 1, 2, 3]);
const VALID_DEBUG = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

export function parseCaptureUrl(search) {
  if (!search) return null;
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  if (!params.has('capture')) return null;
  const out = { capture: params.get('capture') === '1' };

  const q = params.get('quality');
  if (q && VALID_QUALITIES.has(q)) out.quality = q;
  else if (q) console.warn(`[gargantua] ignoring invalid quality="${q}"`);

  const p = params.get('preset');
  if (p !== null) {
    const n = Number.parseInt(p, 10);
    if (VALID_PRESETS.has(n)) out.preset = n;
    else console.warn(`[gargantua] ignoring invalid preset="${p}"`);
  }

  const d = params.get('debug');
  if (d !== null) {
    const n = Number.parseInt(d, 10);
    if (VALID_DEBUG.has(n)) out.debug = n;
    else console.warn(`[gargantua] ignoring invalid debug="${d}"`);
  }

  const h = params.get('hud');
  if (h !== null) {
    if (h === '0') out.hud = false;
    else if (h === '1') out.hud = true;
    else console.warn(`[gargantua] ignoring invalid hud="${h}"`);
  }

  const t = params.get('time');
  if (t !== null) {
    const n = Number.parseFloat(t);
    if (Number.isFinite(n) && n >= 0) out.time = n;
    else console.warn(`[gargantua] ignoring invalid time="${t}"`);
  }

  return out;
}