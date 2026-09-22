/**
 * `window.__GARGANTUA__` — the automation surface described by the task's capture contract.
 *
 * Every method validates its input, returns the updated state, and never throws: an illegal value is
 * rejected by leaving the state unchanged and recording the reason in `lastCommand`, so a caller can
 * tell a rejection from an acceptance without try/catch.
 */
import { DEBUG_VIEWS, PRESETS, QUALITY_LEVELS } from './state/schema.js'

function snapshot(store, engine) {
  const state = store.getState()
  const info = engine ? engine.describe() : null
  return {
    ready: typeof document !== 'undefined' && document.documentElement.dataset.gargantuaReady === 'true',
    capture: state.capture,
    quality: state.quality,
    preset: state.preset,
    debug: state.debug,
    time: state.time,
    hudOpen: state.hudOpen,
    cinematic: state.cinematic,
    audio: state.audio,
    params: { ...state.params },
    budget: info ? info.budget : null,
    render: info ? info.render : null,
    rejectedQuery: state.rejectedQuery.slice(),
    lastCommand: state.lastCommand,
    capabilities: {
      qualityLevels: QUALITY_LEVELS.slice(),
      presets: PRESETS.map((preset) => preset.name),
      debugViews: DEBUG_VIEWS.map((view) => view.name),
    },
  }
}

export function installPublicApi(store, engine) {
  if (typeof window === 'undefined') return

  const api = {
    get ready() {
      return typeof document !== 'undefined' && document.documentElement.dataset.gargantuaReady === 'true'
    },
    getState() {
      return snapshot(store, engine)
    },
    setQuality(level) {
      try {
        store.setQuality(level)
      } catch {
        // snapshot() below reports the unchanged state
      }
      return snapshot(store, engine)
    },
    setPreset(index) {
      try {
        store.setPreset(index)
      } catch {
        // reported through lastCommand
      }
      return snapshot(store, engine)
    },
    setDebug(index) {
      try {
        store.setDebug(index)
      } catch {
        // reported through lastCommand
      }
      return snapshot(store, engine)
    },
    setTime(seconds) {
      try {
        store.setTime(seconds)
      } catch {
        // reported through lastCommand
      }
      return snapshot(store, engine)
    },
  }

  Object.defineProperty(window, '__GARGANTUA__', {
    value: api,
    writable: false,
    configurable: true,
    enumerable: false,
  })
}
