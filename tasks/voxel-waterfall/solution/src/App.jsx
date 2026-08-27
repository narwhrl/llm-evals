import { useCallback, useEffect, useRef, useState } from 'react';
import { VoxelScene } from './scene/VoxelScene.js';
import { DEFAULT_OPTIONS, randomSeed } from './options.js';
import ControlPanel from './ui/ControlPanel.jsx';

export default function App() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const optionsRef = useRef(DEFAULT_OPTIONS);
  const debounceRef = useRef(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [stats, setStats] = useState({ fps: 0, quads: 0, waterCells: 0, trees: 0, grid: 160 });

  useEffect(() => {
    const scene = new VoxelScene(mountRef.current, optionsRef.current, { onStats: setStats });
    sceneRef.current = scene;
    return () => {
      clearTimeout(debounceRef.current);
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  const handleChange = useCallback((patch) => {
    setOptions((prev) => {
      const next = { ...prev, ...patch };
      optionsRef.current = next;
      // debounce regeneration so slider drags stay responsive
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => sceneRef.current?.applyOptions(next), 90);
      return next;
    });
  }, []);

  const actions = {
    regenerate: () => handleChange({ seed: randomSeed() }),
    resetView: () => sceneRef.current?.resetView(),
  };

  return (
    <div className="app">
      <div ref={mountRef} className="scene-mount" />
      <ControlPanel options={options} onChange={handleChange} actions={actions} />
      <div className="hud">
        <span className={`fps ${stats.fps >= 30 ? 'ok' : 'low'}`}>{stats.fps} FPS</span>
        <span>{stats.grid}×{stats.grid} 体素</span>
        <span>{(stats.quads / 1000).toFixed(1)}k 面</span>
        <span>{stats.trees} 树</span>
        <span>种子 {options.seed}</span>
      </div>
      <div className="hint">拖拽旋转 · 滚轮缩放 · 右键平移</div>
    </div>
  );
}
