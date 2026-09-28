import { QUALITY_LEVELS, QUALITY_PROFILES, PRESETS, DEBUG_MODES, isIntInRange } from './state.js';

// window.__GARGANTUA__: validated, non-throwing state interface for
// screenshot automation. Setters return { ok, state } or { ok: false, error }.
export function installAutomation({ store, engine, actions, rejected }) {
  const snapshot = () => {
    const s = store.get();
    return {
      ready: document.documentElement.dataset.gargantuaReady === 'true',
      quality: s.quality,
      qualityProfile: { ...QUALITY_PROFILES[s.quality] },
      preset: s.preset,
      presetName: PRESETS[s.preset].name,
      debug: s.debug,
      debugName: DEBUG_MODES[s.debug].name,
      hud: s.hud,
      cinematic: s.cinematic,
      capture: engine.capture,
      time: engine.simTime,
      renderSize: engine.targets ? [engine.targets.scene.width, engine.targets.scene.height] : null,
      drawingBuffer: [engine.size.x, engine.size.y],
      contextLost: engine.contextLost,
      params: { ...s.params },
      rejectedQuery: [...rejected],
    };
  };
  const ok = () => ({ ok: true, state: snapshot() });
  const fail = (error) => ({ ok: false, error, state: snapshot() });

  const api = {
    getState: snapshot,
    setQuality(level) {
      if (!QUALITY_LEVELS.includes(level)) return fail(`quality must be one of ${QUALITY_LEVELS.join(', ')}`);
      actions.setQuality(level);
      return ok();
    },
    setPreset(index) {
      if (!isIntInRange(index, 0, PRESETS.length - 1)) return fail(`preset must be an integer 0-${PRESETS.length - 1}`);
      actions.setPreset(index);
      return ok();
    },
    setDebug(index) {
      if (!isIntInRange(index, 0, 9)) return fail('debug must be an integer 0-9');
      actions.setDebug(index);
      return ok();
    },
    setTime(seconds) {
      if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return fail('time must be a finite non-negative number');
      engine.setTime(seconds);
      return ok();
    },
  };
  Object.defineProperty(api, 'ready', {
    enumerable: true,
    get: () => document.documentElement.dataset.gargantuaReady === 'true',
  });
  Object.freeze(api);
  Object.defineProperty(window, '__GARGANTUA__', { value: api, configurable: true, writable: false });
  return () => {
    delete window.__GARGANTUA__;
  };
}
