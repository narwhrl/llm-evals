import { useRef, useState } from 'react';

import { SceneControls } from './components/SceneControls.jsx';
import { SceneViewport } from './components/SceneViewport.jsx';
import { DEFAULT_SETTINGS } from './scene/VoxelWorld.js';

function initialSettings() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return { ...DEFAULT_SETTINGS, autoRotate: !prefersReducedMotion };
}

export default function App() {
  const [controlsOpen, setControlsOpen] = useState(() => !window.matchMedia('(max-width: 64rem)').matches);
  const [settings, setSettings] = useState(initialSettings);
  const [stats, setStats] = useState(null);
  const worldRef = useRef(null);

  return (
    <main className="app-shell">
      <SceneViewport onStats={setStats} settings={settings} worldRef={worldRef} />

      <header className="scene-title">
        <p className="eyebrow">Voxel wilderness / 001</p>
        <h1>云岭瀑境</h1>
        <p className="scene-subtitle">山峰从云海中升起，水流沿着岩脊落向林地。</p>
        <div className="stat-row" aria-label="场景状态">
          <span>128 × 128 体素地形</span>
          <span>{stats ? `${stats.fps} FPS` : '正在生成场景'}</span>
        </div>
      </header>

      <button
        aria-expanded={controlsOpen}
        aria-controls="scene-controls"
        className="controls-toggle"
        onClick={() => setControlsOpen((open) => !open)}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" />
        </svg>
        {controlsOpen ? '收起参数' : '调节景观'}
      </button>

      <div className="controls-slot" id="scene-controls">
        {controlsOpen ? (
          <SceneControls
            onChange={setSettings}
            onResetCamera={() => worldRef.current?.resetCamera()}
            settings={settings}
          />
        ) : null}
      </div>

      <div className="interaction-hint" aria-hidden="true">
        <span className="mouse-mark" />
        拖动环绕 · 滚轮缩放
      </div>
    </main>
  );
}
