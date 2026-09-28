import { useState } from 'react';
import VoxelScene from './scene/VoxelScene.jsx';
import ControlPanel from './ui/ControlPanel.jsx';

const DEFAULTS = {
  seed: 20260827,
  timeOfDay: 0.1,
  snowLine: 32,
  treeDensity: 0.6,
  waterfallCount: 2,
  showWaterfall: true,
  flowSpeed: 1.2,
  showMist: true,
  cloudCount: 14,
  cloudLevel: 22,
  cloudDrift: 0.5,
  autoRotate: true,
  rotateSpeed: 0.5,
};

export default function App() {
  const [params, setParams] = useState(DEFAULTS);
  const [stats, setStats] = useState({ voxels: 0 });
  const [fps, setFps] = useState(0);

  return (
    <div className="app">
      <VoxelScene params={params} onStats={setStats} onFps={setFps} />
      <ControlPanel params={params} onChange={setParams} stats={stats} fps={fps} />
    </div>
  );
}
