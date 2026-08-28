import { useEffect, useRef, useState } from 'react';
import { VoxelViewer } from './scene/viewer';
import type { ViewerStats } from './scene/viewer';
import { DEFAULT_PARAMS } from './scene/params';
import type { SceneParams } from './scene/params';
import { ControlPanel } from './components/ControlPanel';

export default function App() {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<VoxelViewer | null>(null);
  const [params, setParams] = useState<SceneParams>(DEFAULT_PARAMS);
  const [stats, setStats] = useState<ViewerStats | null>(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const viewer = new VoxelViewer(hostRef.current!, setStats);
    viewerRef.current = viewer;
    viewer.setParams(DEFAULT_PARAMS);
    const hintTimer = window.setTimeout(() => setHintVisible(false), 7000);
    return () => {
      window.clearTimeout(hintTimer);
      viewer.dispose();
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => {
    viewerRef.current?.setParams(params);
  }, [params]);

  const patch = (p: Partial<SceneParams>) => setParams((prev) => ({ ...prev, ...p }));

  return (
    <div className="app">
      <div ref={hostRef} className="canvas-host" />

      <header className="title-chip">
        <h1>体素山水 · Voxel Waterfall</h1>
        <p>Three.js 体素山岳 · 瀑布 · 穿云</p>
      </header>

      <div className="stats-chip" role="status" aria-live="off">
        {stats
          ? `${stats.fps} fps · ${(stats.triangles / 1000).toFixed(0)}k tris · ${stats.drawCalls} calls`
          : '初始化中…'}
      </div>

      <div className={`hint ${hintVisible ? '' : 'hide'}`}>左键拖拽旋转 · 滚轮缩放 · 右侧面板调参</div>

      <ControlPanel
        params={params}
        onPatch={patch}
        onResetView={() => viewerRef.current?.resetView()}
        onRegenerate={() => patch({ seed: Math.random().toString(36).slice(2, 9) })}
      />
    </div>
  );
}
