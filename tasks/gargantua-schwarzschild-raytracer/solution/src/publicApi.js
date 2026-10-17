// Stable automation surface. Methods validate their input and return a state
// snapshot on success or null on rejection; they never throw.
export function createPublicApi(store, engine) {
  function snapshot() {
    const state = store.getState();
    const telemetry = engine?.getTelemetry?.() || null;
    return {
      ready: Boolean(engine?.ready),
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hudOpen: state.hudOpen,
      playing: state.playing,
      capture: state.capture,
      frozen: state.frozen,
      time: telemetry && Number.isFinite(telemetry.time) ? telemetry.time : state.time,
      fps: telemetry && Number.isFinite(telemetry.fps) ? telemetry.fps : state.fps,
      params: { ...state.params },
      camera: telemetry?.camera ? { ...telemetry.camera } : null,
      contextLost: Boolean(telemetry?.contextLost),
      internalSize: telemetry?.internalSize ? { ...telemetry.internalSize } : null,
      cssSize: telemetry?.cssSize ? { ...telemetry.cssSize } : null,
    };
  }

  return {
    get ready() {
      return Boolean(engine?.ready);
    },

    getState() {
      try {
        return snapshot();
      } catch {
        return null;
      }
    },

    setQuality(level) {
      try {
        return store.setQuality(level) ? snapshot() : null;
      } catch {
        return null;
      }
    },

    setPreset(index) {
      try {
        return Number.isInteger(index) && store.setPreset(index) ? snapshot() : null;
      } catch {
        return null;
      }
    },

    setDebug(index) {
      try {
        return Number.isInteger(index) && store.setDebug(index) ? snapshot() : null;
      } catch {
        return null;
      }
    },

    setTime(seconds) {
      try {
        return store.setTime(seconds) ? snapshot() : null;
      } catch {
        return null;
      }
    },

    setParam(key, value) {
      try {
        if (!Object.prototype.hasOwnProperty.call(store.getState().params, key)) return null;
        store.setParam(key, value);
        return snapshot();
      } catch {
        return null;
      }
    },

    setHud(open) {
      try {
        store.setHudOpen(Boolean(open));
        return snapshot();
      } catch {
        return null;
      }
    },

    getTelemetry() {
      try {
        return engine?.getTelemetry?.() || null;
      } catch {
        return null;
      }
    },
  };
}
