import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { createStore, QUALITY_BUDGETS, PRESETS } from './state.js';
import './styles.css';

function boot() {
  const search = (typeof window !== 'undefined' ? window.location.search : '') || '';
  const store = createStore(search);

  const rootEl = document.getElementById('root');
  if (!rootEl) {
    document.documentElement.dataset.gargantuaReady = 'false';
    if (typeof window !== 'undefined') {
      const stub = {
        get ready() { return false; },
        getState() { return null; },
        setQuality() { return null; },
        setPreset() { return null; },
        setDebug() { return null; },
        setTime() { return null; },
      };
      Object.defineProperty(window, '__GARGANTUA__', {
        value: Object.freeze(stub),
        writable: false,
        configurable: false,
        enumerable: true,
      });
    }
    return;
  }

  // Build the public `__GARGANTUA__` API exactly once.  The methods
  // validate input and return the resulting state snapshot, or `null`
  // on invalid input — never throw.
  let isReady = false;
  const api = {
    get ready() { return isReady; },
    getState() {
      return store.getState();
    },
    setQuality(level) {
      if (!Object.prototype.hasOwnProperty.call(QUALITY_BUDGETS, level)) return null;
      store.setQuality(level);
      return store.getState();
    },
    setPreset(index) {
      if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return null;
      store.setPreset(index);
      return store.getState();
    },
    setDebug(index) {
      if (!Number.isInteger(index) || index < 0 || index > 9) return null;
      store.setDebug(index);
      return store.getState();
    },
    setTime(seconds) {
      if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return null;
      store.setTime(seconds);
      return store.getState();
    },
  };
  Object.freeze(api);

  if (typeof window !== 'undefined' && !window.__GARGANTUA__) {
    Object.defineProperty(window, '__GARGANTUA__', {
      value: api,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  }

  // Bridge store status → public `ready` flag and document marker.
  // `ready` is true iff the renderer reports a successful compile and
  // first frame; `lost` and `error` flip it back off.
  function syncReady(snap) {
    const ready = !!(snap && snap.status && snap.status.kind === 'ready');
    if (ready !== isReady) {
      isReady = ready;
      document.documentElement.dataset.gargantuaReady = ready ? 'true' : 'false';
    }
  }
  store.subscribe(syncReady);
  syncReady(store.getState());

  store.setStatus({ kind: 'booting', message: '' });
  document.documentElement.dataset.gargantuaReady = 'false';

  createRoot(rootEl).render(
    <StrictMode>
      <App store={store} />
    </StrictMode>
  );
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}