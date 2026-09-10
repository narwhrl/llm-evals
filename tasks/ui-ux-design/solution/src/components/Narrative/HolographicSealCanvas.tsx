import React, { useRef, useEffect } from 'react';
import { TensionParameters } from '../../types';

interface Props {
  tension: TensionParameters;
  reducedMotion: boolean;
}

export const HolographicSealCanvas: React.FC<Props> = ({ tension, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += reducedMotion ? 0 : 0.02;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      // Save context
      ctx.save();
      ctx.translate(cx, cy);

      // 1. Outer Gyroscope Rings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = 1 * dpr;
      ctx.setLineDash([4 * dpr, 6 * dpr]);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.88, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Computed Polygon Vertices based on tension
      const vertexCount = Math.max(3, Math.round(4 + tension.rigor * 8));
      const vertices: { x: number; y: number }[] = [];

      for (let i = 0; i < vertexCount; i++) {
        const angle = (i / vertexCount) * Math.PI * 2 + time * 0.5;
        const harmonicRadius =
          r * 0.65 * (0.8 + Math.sin(angle * 3 + time) * tension.intuition * 0.25);
        const vx = Math.cos(angle) * harmonicRadius;
        const vy = Math.sin(angle) * harmonicRadius;
        vertices.push({ x: vx, y: vy });
      }

      // Draw faceted web
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 1.2 * dpr;
      ctx.beginPath();
      for (let i = 0; i < vertices.length; i++) {
        const p1 = vertices[i];
        const p2 = vertices[(i + 1) % vertices.length];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Internal diagonal cross-ties
        if (tension.constraint > 0.4) {
          const pOpposite = vertices[(i + Math.floor(vertexCount / 2)) % vertexCount];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(pOpposite.x, pOpposite.y);
        }
      }
      ctx.stroke();

      // 3. Central Core Glyph
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(0, 0, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Orbital Coordinates Text
      ctx.font = `${8 * dpr}px "JetBrains Mono", monospace`;
      ctx.fillStyle = 'rgba(226, 232, 240, 0.6)';
      ctx.textAlign = 'center';
      ctx.fillText(
        `κ=${(1 + tension.intuition * 0.5).toFixed(2)} | RIGOR=${Math.round(tension.rigor * 100)}%`,
        0,
        r * 0.95
      );

      ctx.restore();
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [tension, reducedMotion]);

  return (
    <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={144 * (window.devicePixelRatio || 1)}
        height={144 * (window.devicePixelRatio || 1)}
        className="w-36 h-36 block"
      />
    </div>
  );
};
