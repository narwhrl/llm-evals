// Minimal external store shared by the React HUD and the render engine.
// Listeners are notified at most once per animation frame.

export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  let scheduled = false;

  const flush = () => {
    scheduled = false;
    for (const fn of listeners) fn(state);
  };

  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === 'function' ? patch(state) : { ...state, ...patch };
      if (next === state) return;
      state = next;
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
      }
    },
    setParams(partial) {
      let changed = false;
      for (const k in partial) {
        if (state.params[k] !== partial[k]) {
          changed = true;
          break;
        }
      }
      if (changed) this.set({ params: { ...state.params, ...partial } });
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
