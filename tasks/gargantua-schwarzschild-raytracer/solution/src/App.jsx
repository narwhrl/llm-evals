import { useEffect, useRef, useSyncExternalStore } from 'react';
import { Engine } from './render/Engine.js';
import { createStore } from './state/store.js';
import { defaultParams } from './state/paramSchema.js';
import { PRESETS } from './state/presets.js';

const config = createStore({
  params: { ...defaultParams(), ...PRESETS[0].pose },
  quality: 'high',
  preset: 0,
  debug: 0,
  cinematic: false,
});
const runtime = createStore({ phase: 'booting', ready: false, error: null, contextLost: false, fps: 0, frame: 0, time: 0, budget: null });

export default function App() {
  const containerRef = useRef(null);
  const status = useSyncExternalStore(runtime.subscribe, runtime.getState);

  useEffect(() => {
    const engine = new Engine({ container: containerRef.current, config, runtime, capture: false, initialTime: 0 });
    engine.start();
    return () => engine.dispose();
  }, []);

  return (
    <main className="app">
      <div ref={containerRef} className="viewport" />
      {status.phase !== 'ready' && <p className="boot-status">{status.error ? status.error.message : '正在编译测地线着色器…'}</p>}
    </main>
  );
}
