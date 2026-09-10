import { useEffect, useRef } from 'react';
import { GargantuaRenderer } from './gargantua/renderer.js';

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderer = new GargantuaRenderer(canvasRef.current);
    renderer.start();
    return () => renderer.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="stage"
      aria-label="Gargantua 黑洞渲染画布"
    />
  );
}
