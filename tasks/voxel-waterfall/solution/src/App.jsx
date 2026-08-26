import { memo, useCallback, useEffect, useState } from 'react';
import { ControlPanel } from './components/ControlPanel.jsx';
import { DEFAULT_SETTINGS } from './scene/constants.js';
import { VoxelCanvas } from './scene/VoxelCanvas.jsx';
import './App.css';
const MemoCanvas = memo(VoxelCanvas);

export default function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState(null);
  const [fps, setFps] = useState(60);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now) => {
      frames += 1;
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setReady(false);
  }, [
    settings.seed,
    settings.mountainScale,
    settings.vegetation,
    settings.cloudDensity,
    settings.cloudHeight,
  ]);

  return (
    <div className="app">
      <div className="canvas-wrap">
        <MemoCanvas settings={settings} onReady={handleReady} onStats={setStats} />
      </div>
      {!ready ? <div className="loading">生成体素山景…</div> : null}
      <ControlPanel
        settings={settings}
        stats={stats}
        fps={fps}
        onChange={setSettings}
        onReset={() => setSettings(DEFAULT_SETTINGS)}
      />
    </div>
  );
}
