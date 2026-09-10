import React, { useEffect, useRef } from 'react';
import { SceneManager } from '../engine/SceneManager';
import { SceneConfig, TerrainStats } from '../utils/types';

interface VoxelCanvasProps {
  config: SceneConfig;
  onStatsUpdate: (stats: TerrainStats) => void;
  sceneManagerRef: React.MutableRefObject<SceneManager | null>;
}

export const VoxelCanvas: React.FC<VoxelCanvasProps> = ({
  config,
  onStatsUpdate,
  sceneManagerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const manager = new SceneManager(containerRef.current, config);
    manager.setStatsCallback(onStatsUpdate);
    sceneManagerRef.current = manager;

    return () => {
      manager.destroy();
      sceneManagerRef.current = null;
    };
  }, []);

  // Sync config updates to SceneManager
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.updateConfig(config);
    }
  }, [config]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};
