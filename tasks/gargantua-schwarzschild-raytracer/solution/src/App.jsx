import { useEffect, useRef, useState } from 'react';
import { GargantuaRenderer } from './gargantua/renderer.js';
import { GargantuaStore } from './gargantua/store.js';
import { Hud } from './gargantua/hud/Hud.jsx';

function isSnapshotEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  const keys = Object.keys(a);
  for (const key of keys) {
    if (key === 'params') continue;
    if (a[key] !== b[key]) return false;
  }
  for (const key of Object.keys(a.params)) {
    if (a.params[key] !== b.params?.[key]) return false;
  }
  return true;
}

export default function App() {
  const canvasRef = useRef(null);
  const [store, setStore] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const renderer = new GargantuaRenderer(canvasRef.current);
    const storeInstance = new GargantuaStore(renderer);

    // First-load convenience: on narrow screens start collapsed (drawer).
    if (window.innerWidth < 700 && !storeInstance.state.hudCollapsed) {
      storeInstance.state.hudCollapsed = true;
    }

    renderer.start();
    setStore(storeInstance);
    setSnapshot(storeInstance.snapshot());
    return () => renderer.dispose();
  }, []);

  // Camera damping and cinematic drift mutate renderer-side params; poll and
  // mirror them into the HUD snapshot at a modest rate.
  useEffect(() => {
    if (!store) return;
    let last = store.snapshot();
    const unsubscribe = store.subscribe((next) => {
      last = next;
      setSnapshot(next);
    });
    const id = setInterval(() => {
      store.pullCamera();
      const next = store.snapshot();
      if (!isSnapshotEqual(next, last)) {
        last = next;
        setSnapshot(next);
      }
    }, 150);
    return () => {
      unsubscribe();
      clearInterval(id);
    };
  }, [store]);

  // Global shortcuts: 0–9 debug views, Shift+1–4 presets, Space cinematic,
  // H HUD, R reset, Q quality. (M 音乐为可选项，本候选未实现音频。)
  useEffect(() => {
    if (!store) return;
    const onKeyDown = (e) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const onControl = e.target?.closest?.('input, textarea, select, button, a');
      if (e.code.startsWith('Digit')) {
        const digit = Number(e.code.slice(5));
        if (Number.isInteger(digit)) {
          if (e.shiftKey) {
            if (digit >= 1 && digit <= 4) {
              e.preventDefault();
              store.setPreset(digit - 1);
            }
          } else {
            store.setDebugView(digit);
          }
        }
        return;
      }
      if (e.code === 'Space') {
        if (!onControl) {
          e.preventDefault();
          store.toggleCinematic();
        }
        return;
      }
      if (e.code === 'KeyH') {
        store.toggleHud();
        return;
      }
      if (e.code === 'KeyR') {
        store.reset();
        return;
      }
      if (e.code === 'KeyQ') {
        store.cycleQuality();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [store]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="stage"
        aria-label="Gargantua 黑洞渲染画布"
      />
      {store && snapshot && <Hud store={store} snapshot={snapshot} />}
    </>
  );
}
