import { useCallback, useState } from "react";
import { World, type WorldStats } from "./scene/World";
import { DEFAULT_PARAMS, type SceneParams } from "./scene/params";
import { ControlPanel } from "./ui/ControlPanel";
import { useDebouncedValue } from "./ui/useDebouncedValue";

const INITIAL_STATS: WorldStats = { voxels: 0, triangles: 0, fps: 0, buildMs: 0 };

export default function App() {
  const [params, setParams] = useState<SceneParams>(DEFAULT_PARAMS);
  const [presetIndex, setPresetIndex] = useState(0);
  const [stats, setStats] = useState<WorldStats>(INITIAL_STATS);
  const [building, setBuilding] = useState(true);
  const debounced = useDebouncedValue(params, 170);

  const patch = useCallback((next: Partial<SceneParams>) => {
    setParams((current) => ({ ...current, ...next }));
  }, []);

  const handleStats = useCallback((next: WorldStats) => {
    setStats((current) => ({ ...next, buildMs: next.buildMs || current.buildMs }));
  }, []);

  return (
    <div className="app">
      <World
        params={debounced}
        presetIndex={presetIndex}
        onStats={handleStats}
        onBuildingChange={setBuilding}
      />

      <div className="vignette" aria-hidden="true" />

      <header className="title-card">
        <p className="eyebrow">VOXEL LANDSCAPE · REALTIME</p>
        <h1>云山飞瀑</h1>
        <p className="subtitle">
          体素山脉 · 悬瀑穿云 · {debounced.size}×{debounced.size} 网格
        </p>
      </header>

      <ControlPanel
        params={params}
        stats={stats}
        presetIndex={presetIndex}
        onChange={patch}
        onPreset={setPresetIndex}
      />

      {building && (
        <div className="loading" role="status">
          <span className="spinner" aria-hidden="true" />
          正在重建场景…
        </div>
      )}
    </div>
  );
}
