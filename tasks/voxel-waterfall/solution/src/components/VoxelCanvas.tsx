import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { SceneManager, StatsData } from '../engine/SceneManager';
import { TerrainConfig } from '../engine/TerrainGenerator';
import { TimePreset } from '../engine/Environment';
import { CloudConfig } from '../engine/CloudSystem';

export interface VoxelCanvasHandle {
  regenerate: (config: TerrainConfig) => void;
  setAtmosphere: (preset: TimePreset) => void;
  setSunAngle: (elev: number, azim: number) => void;
  setFogDensity: (density: number) => void;
  setWaterSpeed: (speed: number) => void;
  setCloudConfig: (config: Partial<CloudConfig>) => void;
  setCameraPreset: (preset: 'overview' | 'waterfall' | 'peak' | 'lake' | 'top') => void;
  setAutoRotate: (enabled: boolean, speed?: number) => void;
}

interface VoxelCanvasProps {
  initialConfig: TerrainConfig;
  onStatsUpdate: (stats: StatsData) => void;
}

export const VoxelCanvas = forwardRef<VoxelCanvasHandle, VoxelCanvasProps>(
  ({ initialConfig, onStatsUpdate }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneMgrRef = useRef<SceneManager | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const mgr = new SceneManager();
      sceneMgrRef.current = mgr;
      mgr.init(containerRef.current);
      mgr.generateTerrain(initialConfig);
      mgr.onStatsUpdate(onStatsUpdate);

      return () => {
        mgr.dispose();
        sceneMgrRef.current = null;
      };
    }, []);

    useImperativeHandle(ref, () => ({
      regenerate: (config: TerrainConfig) => {
        sceneMgrRef.current?.generateTerrain(config);
      },
      setAtmosphere: (preset: TimePreset) => {
        sceneMgrRef.current?.setAtmosphere(preset);
      },
      setSunAngle: (elev: number, azim: number) => {
        sceneMgrRef.current?.setSunAngle(elev, azim);
      },
      setFogDensity: (density: number) => {
        sceneMgrRef.current?.setFogDensity(density);
      },
      setWaterSpeed: (speed: number) => {
        sceneMgrRef.current?.setWaterSpeed(speed);
      },
      setCloudConfig: (config: Partial<CloudConfig>) => {
        sceneMgrRef.current?.setCloudConfig(config);
      },
      setCameraPreset: (preset) => {
        sceneMgrRef.current?.setCameraPreset(preset);
      },
      setAutoRotate: (enabled: boolean, speed?: number) => {
        sceneMgrRef.current?.setAutoRotate(enabled, speed);
      }
    }));

    return (
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          backgroundColor: '#0b111e'
        }}
      />
    );
  }
);
