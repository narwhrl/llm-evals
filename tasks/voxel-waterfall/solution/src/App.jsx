import { useEffect, useRef, useState } from 'react';
import { createEngine, DEFAULT_PARAMS } from './scene/engine.js';
import { ControlPanel } from './ui/ControlPanel.jsx';

const REBUILD_KEYS = [
  'seed',
  'size',
  'mountainHeight',
  'roughness',
  'waterfallWidth',
  'cloudHeight',
  'cloudDensity',
  'vegetation',
];

export default function App() {
  const mountRef = useRef(null);
  const liveRef = useRef({ ...DEFAULT_PARAMS });
  const [params, setParams] = useState({ ...DEFAULT_PARAMS });
  const [revision, setRevision] = useState(0);
  const [open, setOpen] = useState(true);
  const [stats, setStats] = useState({ fps: 0, columns: 0, clouds: 0, trees: 0 });

  liveRef.current = params;
  const rebuildKey = REBUILD_KEYS.map((key) => params[key]).join('|') + '|' + revision;

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return undefined;
    const engine = createEngine(el, params, liveRef, setStats);
    return () => engine.dispose();
  }, [rebuildKey]);

  const onChange = (patch) => {
    setParams((prev) => ({ ...prev, ...patch }));
  };

  const onRebuild = () => setRevision((n) => n + 1);
  const onReset = () => {
    setParams({ ...DEFAULT_PARAMS });
    setRevision((n) => n + 1);
  };

  return (
    <div className="app">
      <div className="viewport" ref={mountRef} />
      <ControlPanel
        params={params}
        onChange={onChange}
        onRebuild={onRebuild}
        onReset={onReset}
        stats={stats}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
