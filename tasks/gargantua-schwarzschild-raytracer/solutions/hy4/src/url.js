import { QUALITY_LEVELS } from './config.js';

// Stable same-origin capture contract. `null` means "present but invalid" and
// the caller falls back to the documented default. Missing keys are not
// applied at all, so persisted state survives a plain reload.
export function parseUrl(search) {
  const p = new URLSearchParams(search);
  const result = { capture: p.get('capture') === '1', invalid: [] };

  if (p.has('quality')) {
    const v = p.get('quality');
    result.quality = QUALITY_LEVELS.includes(v) ? { present: true, value: v, valid: true } : { present: true, value: null, valid: false };
    if (!result.quality.valid) result.invalid.push('quality');
  }

  if (p.has('preset')) {
    const raw = p.get('preset');
    const ok = /^\d+$/.test(raw) && Number(raw) >= 0 && Number(raw) <= 3;
    result.preset = { present: true, value: ok ? Number(raw) : null, valid: ok };
    if (!ok) result.invalid.push('preset');
  }

  if (p.has('debug')) {
    const raw = p.get('debug');
    const ok = /^\d+$/.test(raw) && Number(raw) >= 0 && Number(raw) <= 9;
    result.debug = { present: true, value: ok ? Number(raw) : null, valid: ok };
    if (!ok) result.invalid.push('debug');
  }

  if (p.has('hud')) {
    const raw = p.get('hud');
    const ok = raw === '0' || raw === '1';
    result.hud = { present: true, value: ok ? raw === '1' : null, valid: ok };
    if (!ok) result.invalid.push('hud');
  }

  if (p.has('time')) {
    const raw = p.get('time');
    const n = Number(raw);
    const ok = raw !== '' && Number.isFinite(n) && n >= 0;
    result.time = { present: true, value: ok ? n : null, valid: ok };
    if (!ok) result.invalid.push('time');
  }

  return result;
}
