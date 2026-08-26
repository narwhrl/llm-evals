import { useEffect, useRef, useState } from 'react';

import { VoxelWorld } from '../scene/VoxelWorld.js';

export function SceneViewport({ onStats, settings, worldRef }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let world;
    try {
      world = new VoxelWorld(canvasRef.current, settings, onStats);
      worldRef.current = world;
    } catch (reason) {
      console.error(reason);
      setError('无法启动 3D 场景。请确认浏览器已启用 WebGL，然后刷新页面。');
    }

    return () => {
      world?.dispose();
      if (worldRef.current === world) worldRef.current = null;
    };
  }, []);

  useEffect(() => {
    worldRef.current?.updateSettings(settings);
  }, [settings, worldRef]);

  return (
    <div className="scene-viewport">
      <canvas
        ref={canvasRef}
        aria-describedby="scene-description"
        aria-label="可旋转的体素山脉、瀑布和穿云景观"
        className="scene-canvas"
        tabIndex="0"
      />
      <p id="scene-description" className="sr-only">
        使用鼠标拖动或方向键环绕山峰，滚轮缩放。山腰分布体素云层，两道瀑布沿山体流向山脚。
      </p>
      {error ? <p className="scene-error" role="alert">{error}</p> : null}
    </div>
  );
}
