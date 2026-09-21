import { useCallback, useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { VoxelScene } from './components/VoxelScene';
import { DEFAULT_SETTINGS, type SceneSettings } from './voxel/types';

export default function App() {
  const [settings, setSettings] = useState<SceneSettings>(DEFAULT_SETTINGS);

  const onChange = useCallback((patch: Partial<SceneSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const onRegenerate = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      seed: (prev.seed % 200) + 1,
    }));
  }, []);

  return (
    <div className="app">
      <VoxelScene settings={settings} />
      <ControlPanel settings={settings} onChange={onChange} onRegenerate={onRegenerate} />
    </div>
  );
}
