import { useCallback, useState } from "react";
import { World, type SceneParams, type WorldStats } from "./scene/World";
import { ControlPanel } from "./ui/ControlPanel";

const INITIAL: SceneParams = {
  glazed: true,
  gateScale: 1,
  skyIndex: 1,
  autoRotate: false,
};

const INITIAL_STATS: WorldStats = { boxes: 0, triangles: 0, fps: 0, buildMs: 0 };

export default function App() {
  const [params, setParams] = useState<SceneParams>(INITIAL);
  const [viewIndex, setViewIndex] = useState(0);
  const [stats, setStats] = useState<WorldStats>(INITIAL_STATS);
  const [building, setBuilding] = useState(true);

  const patch = useCallback((next: Partial<SceneParams>) => {
    setParams((current) => ({ ...current, ...next }));
  }, []);

  const handleStats = useCallback((next: WorldStats) => {
    setStats((current) => ({ ...next, buildMs: next.buildMs || current.buildMs }));
  }, []);

  return (
    <div className="app">
      <World
        params={params}
        presetIndex={viewIndex}
        onStats={handleStats}
        onBuildingChange={setBuilding}
      />

      <div className="vignette" aria-hidden="true" />

      <header className="title-card">
        <p className="eyebrow">VOXEL · CHINESE CLASSICAL ARCHITECTURE</p>
        <h1>中轴宫苑</h1>
        <p className="subtitle">山门 · 庭院 · 大殿 · 配殿 · 浮屠</p>
      </header>

      <ControlPanel
        params={params}
        stats={stats}
        viewIndex={viewIndex}
        onChange={patch}
        onView={setViewIndex}
      />

      {building && (
        <div className="loading" role="status">
          <span className="spinner" aria-hidden="true" />
          正在营造…
        </div>
      )}
    </div>
  );
}
