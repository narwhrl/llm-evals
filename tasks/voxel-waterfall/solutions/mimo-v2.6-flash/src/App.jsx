import { useEffect, useRef, useState, useCallback } from 'react';
import { VoxelWorld } from './scene/world.js';
import './App.css';

const DEFAULT_OPTIONS = {
  seed: 20260922,
  gridSize: 208,
  waterfallCount: 2,
  waterfallWidth: 2,
  cloudHeight: 32,
  cloudDensity: 1.0,
  treeDensity: 0.6,
  timeOfDay: 0.18,
  fogDensity: 0.35,
  autoRotate: true,
};

function SceneCanvas({ options, onStats }) {
  const containerRef = useRef(null);
  const worldRef = useRef(null);
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;

  useEffect(() => {
    const world = new VoxelWorld(containerRef.current);
    worldRef.current = world;
    world.statsListener = (s) => onStatsRef.current?.(s);
    window.__voxelWorld = world; // exposed for automated visual acceptance
    world.update(options);
    world.start();
    return () => {
      world.dispose();
      worldRef.current = null;
      if (window.__voxelWorld === world) delete window.__voxelWorld;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    worldRef.current?.update(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return <div className="scene" ref={containerRef} />;
}

function Slider({ label, value, min, max, step = 1, onChange, format }) {
  return (
    <label className="opt">
      <span className="opt-label">
        {label}
        <em>{format ? format(value) : value}</em>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function OptionsPanel({ options, setOptions, stats }) {
  const set = useCallback(
    (key) => (value) => setOptions((o) => ({ ...o, [key]: value })),
    [setOptions],
  );

  return (
    <aside className="panel">
      <h1>体素瀑布 · Voxel Waterfall</h1>
      {stats.grid ? (
        <div className="stats">
          <div>
            网格 <b>{stats.grid}</b>
          </div>
          <div>
            体素总数 <b>{stats.total.toLocaleString()}</b>
          </div>
          <div className="stats-sub">
            山体 {stats.terrain.toLocaleString()} · 水体 {stats.water.toLocaleString()} ·
            云 {stats.clouds.toLocaleString()} · 植被 {stats.props.toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="stats">生成中…</div>
      )}

      <section>
        <h2>地形</h2>
        <Slider label="随机种子" value={options.seed} min={1} max={99999} onChange={set('seed')} />
        <Slider
          label="网格尺寸"
          value={options.gridSize}
          min={200}
          max={260}
          step={2}
          onChange={set('gridSize')}
          format={(v) => `${v} × ${v}`}
        />
      </section>

      <section>
        <h2>瀑布</h2>
        <Slider label="瀑布道数" value={options.waterfallCount} min={1} max={3} onChange={set('waterfallCount')} />
        <Slider label="水流宽度" value={options.waterfallWidth} min={1} max={3} onChange={set('waterfallWidth')} />
      </section>

      <section>
        <h2>云层</h2>
        <Slider
          label="云带高度"
          value={options.cloudHeight}
          min={14}
          max={48}
          onChange={set('cloudHeight')}
        />
        <Slider
          label="云量"
          value={options.cloudDensity}
          min={0.2}
          max={1.8}
          step={0.1}
          onChange={set('cloudDensity')}
          format={(v) => `${Math.round(v * 100)}%`}
        />
      </section>

      <section>
        <h2>环境</h2>
        <Slider
          label="晨昏时间"
          value={options.timeOfDay}
          min={0}
          max={1}
          step={0.02}
          onChange={set('timeOfDay')}
          format={(v) => (v < 0.33 ? '清晨' : v < 0.66 ? '正午' : '黄昏')}
        />
        <Slider
          label="雾气"
          value={options.fogDensity}
          min={0}
          max={1}
          step={0.05}
          onChange={set('fogDensity')}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <Slider
          label="植被密度"
          value={options.treeDensity}
          min={0}
          max={1}
          step={0.05}
          onChange={set('treeDensity')}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <label className="opt opt-check">
          <input
            type="checkbox"
            checked={options.autoRotate}
            onChange={(e) => set('autoRotate')(e.target.checked)}
          />
          <span>自动环绕</span>
        </label>
      </section>

      <button
        className="btn"
        onClick={() => set('seed')(1 + Math.floor(Math.random() * 99998))}
      >
        随机生成新地形
      </button>
      <p className="hint">拖拽旋转 · 滚轮缩放 · 右键平移</p>
    </aside>
  );
}

export default function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [stats, setStats] = useState({});

  return (
    <div className="app">
      <SceneCanvas options={options} onStats={setStats} />
      <OptionsPanel options={options} setOptions={setOptions} stats={stats} />
    </div>
  );
}
