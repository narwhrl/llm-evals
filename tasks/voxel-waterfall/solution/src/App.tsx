import React, { useState, useRef, useCallback } from 'react';
import { VoxelCanvas, VoxelCanvasHandle } from './components/VoxelCanvas';
import { UIOverlay } from './components/UIOverlay';
import { StatsData } from './engine/SceneManager';
import { TerrainConfig } from './engine/TerrainGenerator';
import { CloudConfig } from './engine/CloudSystem';
import { TimePreset } from './engine/Environment';

export const App: React.FC = () => {
  const canvasRef = useRef<VoxelCanvasHandle>(null);

  const [stats, setStats] = useState<StatsData>({
    fps: 60,
    voxelCount: 0,
    triangleCount: 0,
    drawCalls: 0,
  });

  const [terrainConfig, setTerrainConfig] = useState<TerrainConfig>({
    sizeX: 200,
    sizeY: 64,
    sizeZ: 200,
    seed: 42088,
    heightScale: 1.05,
    roughness: 1.0,
    treeDensity: 0.18,
    waterLevel: 8,
  });

  const [cloudConfig, setCloudConfig] = useState<CloudConfig>({
    baseY: 34,
    thickness: 4,
    density: 0.52,
    speed: 1.0,
    opacity: 0.85,
    worldSizeX: 200,
    worldSizeZ: 200,
  });

  const handleStatsUpdate = useCallback((newStats: StatsData) => {
    setStats(newStats);
  }, []);

  const handleUpdateTerrain = useCallback((config: TerrainConfig) => {
    setTerrainConfig(config);
    canvasRef.current?.regenerate(config);
  }, []);

  const handleUpdateAtmosphere = useCallback((preset: TimePreset) => {
    canvasRef.current?.setAtmosphere(preset);
  }, []);

  const handleUpdateSunAngle = useCallback((elev: number, azim: number) => {
    canvasRef.current?.setSunAngle(elev, azim);
  }, []);

  const handleUpdateFogDensity = useCallback((density: number) => {
    canvasRef.current?.setFogDensity(density);
  }, []);

  const handleUpdateWaterSpeed = useCallback((speed: number) => {
    canvasRef.current?.setWaterSpeed(speed);
  }, []);

  const handleUpdateCloud = useCallback((config: Partial<CloudConfig>) => {
    setCloudConfig(prev => ({ ...prev, ...config }));
    canvasRef.current?.setCloudConfig(config);
  }, []);

  const handleSelectCameraPreset = useCallback((preset: 'overview' | 'waterfall' | 'peak' | 'lake' | 'top') => {
    canvasRef.current?.setCameraPreset(preset);
  }, []);

  const handleToggleAutoRotate = useCallback((enabled: boolean, speed?: number) => {
    canvasRef.current?.setAutoRotate(enabled, speed);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <VoxelCanvas
        ref={canvasRef}
        initialConfig={terrainConfig}
        onStatsUpdate={handleStatsUpdate}
      />
      <UIOverlay
        stats={stats}
        terrainConfig={terrainConfig}
        cloudConfig={cloudConfig}
        onUpdateTerrain={handleUpdateTerrain}
        onUpdateAtmosphere={handleUpdateAtmosphere}
        onUpdateSunAngle={handleUpdateSunAngle}
        onUpdateFogDensity={handleUpdateFogDensity}
        onUpdateWaterSpeed={handleUpdateWaterSpeed}
        onUpdateCloud={handleUpdateCloud}
        onSelectCameraPreset={handleSelectCameraPreset}
        onToggleAutoRotate={handleToggleAutoRotate}
      />
    </div>
  );
};
export default App;