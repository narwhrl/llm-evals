// Global toggle state with a tiny change-event mechanism.
// Listeners fire synchronously only when a value actually changes (never per frame).

const listeners = new Map(); // key -> Set<fn(value, key)>

export const state = {
  nightCruise: false,
  plantLight: true,
  /** Explicit grow-light request during the current cruise; reset on cruise changes. */
  plantLightOverride: false,
  fastForward: false,
  /** Currently focused fixture id (string) or null for overview. */
  focused: null,
};

/** Set a state key; notifies listeners of that key and of '*' if the value changed. */
export function setState(key, value) {
  if (!(key in state)) throw new Error(`Unknown state key: ${key}`);
  if (state[key] === value) return;
  state[key] = value;
  if (key === 'nightCruise') setState('plantLightOverride', false);
  emit(key, value);
  emit('*', value, key);
}

export function toggleState(key) {
  setState(key, !state[key]);
  return state[key];
}

/** Subscribe to a key (or '*'). Returns an unsubscribe function. */
export function onState(key, fn) {
  let set = listeners.get(key);
  if (!set) listeners.set(key, (set = new Set()));
  set.add(fn);
  return () => set.delete(fn);
}

function emit(key, value, realKey = key) {
  const set = listeners.get(key);
  if (!set) return;
  for (const fn of set) fn(value, realKey);
}
