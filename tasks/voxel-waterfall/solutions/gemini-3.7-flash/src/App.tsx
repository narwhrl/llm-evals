import React, { useState, useRef, useCallback } from 'react';
import { VoxelCanvas } from './components/VoxelCanvas';
import { UIOverlay } from './components/UIOverlay';
import { SceneConfig, TerrainStats } from './utils/types';
import { SceneManager } from './engine/SceneManager';

const DEFAULT_CONFIG: SceneConfig = {
  seed: 42890,
  gridSize: 144,
  terrainHeight: 80,
  waterLevel: 14,
  
  // Environment & Lighting
  timeOfDay: 'day',
  sunIntensity: 1.0,
  fogDensity: 0.0035,
  
  // Clouds
  cloudAltitude: 40,
  cloudThickness: 3,
  cloudDensity: 0.55,
  cloudSpeed: 1.0,
  cloudPiercingEffect: true,
  
  // Waterfall & Water
  waterfallFlowSpeed: 1.2,
  waterfallFoamIntensity: 1.0,
  waterOpacity: 0.78,
  splashParticleCount: 1.2,
  
  // Foliage
  treeDensity: 0.85,
  flowerDensity: 1.0,
  
  // Camera
  autoRotate: true,
  autoRotateSpeed: 0.6,
  cameraPreset: 'overview',
};

export const App: React.FC = () => {
  const [config, setConfig] = useState<SceneConfig>(DEFAULT_CONFIG);
  const [stats, setStats] = useState<TerrainStats | null>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);

  const handleConfigChange = useCallback((newConfig: Partial<SceneConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleScreenshot = useCallback(() => {
    if (!sceneManagerRef.current) return;
    const dataUrl = sceneManagerRef.current.exportScreenshot();
    const link = document.createElement('a');
    link.download = `voxel-waterfall-${config.timeOfDay}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }, [config.timeOfDay]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <VoxelCanvas
        config={config}
        onStatsUpdate={setStats}
        sceneManagerRef={sceneManagerRef}
      />
      <UIOverlay
        config={config}
        onChangeConfig={handleConfigChange}
        stats={stats}
        onScreenshot={handleScreenshot}
      />
    </div>
  );
};
