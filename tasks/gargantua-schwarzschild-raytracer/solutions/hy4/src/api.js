import { QUALITY_LEVELS, PRESETS } from './config.js';

// Stable automation contract. Every setter validates input and returns either
// the updated state (with ok:true) or a rejection (ok:false) instead of
// throwing. `ready` is a read-only getter.
export function installApi(engine) {
  const snapshot = () => {
    try {
      return engine.getState();
    } catch {
      return { ok: false, error: 'state unavailable' };
    }
  };
  const ok = () => ({ ok: true, ...snapshot() });
  const reject = (error) => ({ ok: false, error, ...snapshot() });
  const run = (fn) => {
    try {
      return fn() ? ok() : reject('invalid input');
    } catch (error) {
      return reject(String(error?.message ?? error));
    }
  };
  const api = {
    get ready() {
      return Boolean(engine.ready);
    },
    getState: snapshot,
    setQuality: (level) =>
      run(() => typeof level === 'string' && QUALITY_LEVELS.includes(level) && engine.setQuality(level)),
    setPreset: (index) =>
      run(() => Number.isInteger(index) && index >= 0 && index < PRESETS.length && engine.setPreset(index)),
    setDebug: (index) => run(() => Number.isInteger(index) && index >= 0 && index <= 9 && engine.setDebug(index)),
    setTime: (seconds) =>
      run(() => {
        const n = typeof seconds === 'number' ? seconds : typeof seconds === 'string' && seconds.trim() !== '' ? Number(seconds) : NaN;
        return Number.isFinite(n) && n >= 0 && engine.setTime(n);
      }),
    setParam: (key, value) => run(() => engine.setParam(key, value)),
    setHud: (open) => run(() => engine.setHud(Boolean(open))),
    reset: () => run(() => engine.reset()),
    cycleQuality: () => run(() => Boolean(engine.cycleQuality())),
    toggleCinematic: () => run(() => engine.toggleCinematic()),
    sampleFrame: () => {
      try {
        return { ok: true, ...engine.sampleFrame() };
      } catch (error) {
        return { ok: false, error: String(error?.message ?? error) };
      }
    },
    simulateContextLoss: () => {
      try {
        return engine.simulateContextLoss();
      } catch (error) {
        return { ok: false, reason: String(error?.message ?? error) };
      }
    },
    restoreContextNow: () => {
      try {
        return engine.restoreContextNow();
      } catch (error) {
        return { ok: false, reason: String(error?.message ?? error) };
      }
    },
  };

  Object.defineProperty(window, '__GARGANTUA__', {
    value: api,
    writable: false,
    configurable: true,
    enumerable: true,
  });
  return api;
}
