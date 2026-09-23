// automationContract.js - URL parsing and window.__GARGANTUA__ contract

import { QUALITY_TIERS } from './stateDefaults.js';

export function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);
  const isCapture = params.get('capture') === '1';

  let quality = params.get('quality');
  if (!quality || !['standard', 'high', 'cinematic'].includes(quality.toLowerCase())) {
    quality = null;
  } else {
    quality = quality.toLowerCase();
  }

  let preset = params.get('preset');
  if (preset !== null) {
    const p = parseInt(preset, 10);
    preset = (Number.isFinite(p) && p >= 0 && p <= 3) ? p : null;
  }

  let debug = params.get('debug');
  if (debug !== null) {
    const d = parseInt(debug, 10);
    debug = (Number.isFinite(d) && d >= 0 && d <= 9) ? d : null;
  }

  let hud = params.get('hud');
  let hudVisible = null;
  if (hud !== null) {
    if (hud === '0') hudVisible = false;
    else if (hud === '1') hudVisible = true;
  }

  let time = params.get('time');
  let freezeTime = null;
  if (time !== null) {
    const t = parseFloat(time);
    if (Number.isFinite(t) && t >= 0) {
      freezeTime = t;
    }
  }

  return {
    isCapture,
    quality,
    preset,
    debug,
    hudVisible,
    freezeTime
  };
}

export function setupAutomationAPI(controller) {
  let isReady = false;

  const api = {
    get ready() {
      return isReady;
    },
    getState() {
      try {
        return controller.getFullState();
      } catch (e) {
        console.error('__GARGANTUA__.getState error:', e);
        return null;
      }
    },
    setQuality(level) {
      try {
        if (typeof level !== 'string') return controller.getFullState();
        const norm = level.toLowerCase();
        if (!QUALITY_TIERS[norm]) return controller.getFullState();
        controller.applyQuality(norm);
        return controller.getFullState();
      } catch (e) {
        console.error('__GARGANTUA__.setQuality error:', e);
        return controller.getFullState();
      }
    },
    setPreset(index) {
      try {
        const idx = parseInt(index, 10);
        if (!Number.isFinite(idx) || idx < 0 || idx > 3) return controller.getFullState();
        controller.applyPreset(idx);
        return controller.getFullState();
      } catch (e) {
        console.error('__GARGANTUA__.setPreset error:', e);
        return controller.getFullState();
      }
    },
    setDebug(index) {
      try {
        const idx = parseInt(index, 10);
        if (!Number.isFinite(idx) || idx < 0 || idx > 9) return controller.getFullState();
        controller.applyDebug(idx);
        return controller.getFullState();
      } catch (e) {
        console.error('__GARGANTUA__.setDebug error:', e);
        return controller.getFullState();
      }
    },
    setTime(seconds) {
      try {
        const sec = parseFloat(seconds);
        if (!Number.isFinite(sec) || sec < 0) return controller.getFullState();
        controller.applyTime(sec);
        return controller.getFullState();
      } catch (e) {
        console.error('__GARGANTUA__.setTime error:', e);
        return controller.getFullState();
      }
    }
  };

  window.__GARGANTUA__ = api;

  return {
    markReady() {
      isReady = true;
      document.documentElement.dataset.gargantuaReady = "true";
    }
  };
}
