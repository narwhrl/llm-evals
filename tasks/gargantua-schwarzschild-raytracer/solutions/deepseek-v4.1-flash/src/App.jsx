import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Engine } from './render/Engine.js';
import { createStore } from './state/store.js';
import { QUALITY_ORDER } from './state/schema.js';
import { createPublicApi } from './publicApi.js';
import Hud from './ui/Hud.jsx';
import { BootOverlay, ContextOverlay, ErrorOverlay } from './ui/Overlays.jsx';

function isTextEntry(target) {
  if (!target) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (tag === 'INPUT') return target.type !== 'range';
  return false;
}

export default function App() {
  const [store] = useState(() => createStore());
  const state = useSyncExternalStore(store.subscribe, store.getState);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const engine = new Engine({
      container: containerRef.current,
      store,
      onReady: () => setReady(true),
      onContextChange: (lost) => setContextLost(lost),
      onError: (failure) => setError(failure),
    });
    engineRef.current = engine;
    const api = createPublicApi(store, engine);
    window.__GARGANTUA__ = api;

    return () => {
      engine.dispose();
      engineRef.current = null;
      if (window.__GARGANTUA__ === api) delete window.__GARGANTUA__;
    };
  }, [store]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.defaultPrevented || event.repeat) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTextEntry(event.target)) return;
      if (event.target?.tagName === 'BUTTON' && (event.code === 'Space' || event.code === 'Enter')) return;

      const code = event.code;
      if (event.shiftKey) {
        const presetMatch = /^Digit([1-4])$/.exec(code);
        if (presetMatch) {
          event.preventDefault();
          store.setPreset(Number(presetMatch[1]) - 1);
        }
        return;
      }

      const debugMatch = /^Digit([0-9])$/.exec(code);
      if (debugMatch) {
        event.preventDefault();
        store.setDebug(Number(debugMatch[1]));
        return;
      }

      if (code === 'KeyH') {
        event.preventDefault();
        store.setHudOpen(!store.getState().hudOpen);
      } else if (code === 'KeyR') {
        event.preventDefault();
        store.reset();
      } else if (code === 'KeyQ') {
        event.preventDefault();
        const current = QUALITY_ORDER.indexOf(store.getState().quality);
        store.setQuality(QUALITY_ORDER[(current + 1) % QUALITY_ORDER.length]);
      } else if (code === 'Space') {
        event.preventDefault();
        store.setPlaying(!store.getState().playing);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [store]);

  const handleParam = useCallback((key, value) => store.setParam(key, value), [store]);
  const handleQuality = useCallback((quality) => store.setQuality(quality), [store]);
  const handlePreset = useCallback((index) => store.setPreset(index), [store]);
  const handleDebug = useCallback((index) => store.setDebug(index), [store]);
  const handleReset = useCallback(() => store.reset(), [store]);
  const handleToggleHud = useCallback((open) => {
    store.setHudOpen(typeof open === 'boolean' ? open : !store.getState().hudOpen);
  }, [store]);
  const handleTogglePlaying = useCallback(() => {
    store.setPlaying(!store.getState().playing);
  }, [store]);
  const handleRecover = useCallback(() => {
    engineRef.current?.recoverNow();
  }, []);

  return (
    <div className="app" data-capture={state.capture ? '1' : '0'}>
      <div ref={containerRef} className="viewport" />
      <Hud
        state={state}
        contextLost={contextLost}
        onParam={handleParam}
        onQuality={handleQuality}
        onPreset={handlePreset}
        onDebug={handleDebug}
        onReset={handleReset}
        onToggleHud={handleToggleHud}
        onTogglePlaying={handleTogglePlaying}
      />
      <BootOverlay ready={ready} error={error} />
      <ContextOverlay lost={contextLost && !error} onRecover={handleRecover} />
      <ErrorOverlay error={error} />
    </div>
  );
}
