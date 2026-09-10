import { QUALITY_TIERS } from './state.js';

/**
 * Parse and apply the URL screenshot-automation contract:
 *
 *   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
 *
 * Every parameter is validated independently; invalid values fall back to
 * their documented default without throwing or producing a black screen.
 * `capture=1` additionally freezes the simulation clock at `time` (default 0)
 * before the first rendered frame and keeps the cinematic loop off.
 */
export function applyUrlState(store, renderer) {
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const sp = new URLSearchParams(search);
  const result = { capture: false, time: 0, applied: {} };

  const quality = sp.get('quality');
  if (quality !== null) {
    const level = quality in QUALITY_TIERS ? quality : 'high';
    store.setQuality(level);
    result.applied.quality = level;
  }

  const presetRaw = sp.get('preset');
  if (presetRaw !== null) {
    const n = Number(presetRaw);
    const preset = Number.isInteger(n) && n >= 0 && n <= 3 ? n : 0;
    store.setPreset(preset);
    result.applied.preset = preset;
  }

  const debugRaw = sp.get('debug');
  if (debugRaw !== null) {
    const n = Number(debugRaw);
    const debug = Number.isInteger(n) && n >= 0 && n <= 9 ? n : 0;
    store.setDebugView(debug);
    result.applied.debug = debug;
  }

  const hudRaw = sp.get('hud');
  if (hudRaw !== null) {
    // hud=1 可见，hud=0 隐藏；其它值回退为可见。
    const collapsed = hudRaw !== '1' && hudRaw === '0';
    store.setHudCollapsed(collapsed);
    result.applied.hud = collapsed ? 0 : 1;
  }

  const captureRaw = sp.get('capture');
  result.capture = captureRaw === '1';
  const timeRaw = sp.get('time');
  let time = 0;
  if (timeRaw !== null) {
    const n = Number(timeRaw);
    if (Number.isFinite(n) && n >= 0) time = n;
  }
  result.time = time;
  if (result.capture) {
    // Non-deterministic advancement stops: cinematic stays off (its default)
    // and the clock is pinned so grain/turbulence/orbits hold still.
    if (store.state.cinematic) store.toggleCinematic();
    renderer.setTime(time);
  }
  return result;
}
