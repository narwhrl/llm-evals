import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TensegritySystem } from '../engine/physics';
import { sound } from '../engine/audio';
import { ChapterId, ViewMode, TelemetryData } from '../types';

interface TensegrityCanvasProps {
  chapter: ChapterId;
  viewMode: ViewMode;
  reducedMotion: boolean;
  onTelemetryUpdate: (data: TelemetryData) => void;
  dialecticCoupling?: number;
  sealParams?: { points: number; twist: number; tension: number };
}

export const TensegrityCanvas: React.FC<TensegrityCanvasProps> = ({
  chapter,
  viewMode,
  reducedMotion,
  onTelemetryUpdate,
  dialecticCoupling = 1.0,
  sealParams,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const systemRef = useRef<TensegritySystem>(new TensegritySystem());
  const animationFrameRef = useRef<number | null>(null);

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingNodeRef = useRef<boolean>(false);
  const isRotatingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const logicalSizeRef = useRef<{ w: number; h: number }>({ w: 600, h: 600 });

  // Sync chapter changes to physics system
  useEffect(() => {
    systemRef.current.setChapter(chapter);
  }, [chapter]);

  // Sync Dialectic coupling
  useEffect(() => {
    if (chapter === 'dialectic') {
      systemRef.current.setDialecticCoupling(dialecticCoupling);
    }
  }, [chapter, dialecticCoupling]);

  // Sync Seal customization
  useEffect(() => {
    if (chapter === 'artifact' && sealParams) {
      systemRef.current.updateSealTopology(sealParams.points, sealParams.twist, sealParams.tension);
    }
  }, [chapter, sealParams]);

  // Audio strain linkage
  useEffect(() => {
    systemRef.current.onStrainChange = (strainDelta, nodeIndex) => {
      sound.triggerPluck(strainDelta, nodeIndex);
    };
  }, []);

  // Main render & simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let currentFps = 60;

    const render = (time: number) => {
      const dt = Math.min(0.033, (time - lastTime) / 1000);
      lastTime = time;

      frameCount++;
      if (time - lastFpsUpdate > 500) {
        currentFps = Math.max(1, Math.round((frameCount * 1000) / (time - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      // 1. Maintain DPR and logical dimension
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const logicalWidth = Math.max(100, Math.floor(rect.width || canvas.clientWidth || 600));
      const logicalHeight = Math.max(100, Math.floor(rect.height || canvas.clientHeight || 600));
      logicalSizeRef.current = { w: logicalWidth, h: logicalHeight };

      const targetPixelWidth = Math.floor(logicalWidth * dpr);
      const targetPixelHeight = Math.floor(logicalHeight * dpr);

      if (canvas.width !== targetPixelWidth || canvas.height !== targetPixelHeight) {
        canvas.width = targetPixelWidth;
        canvas.height = targetPixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 2. Update Physics
      const system = systemRef.current;
      if (!reducedMotion || isDraggingNodeRef.current || isRotatingRef.current) {
        system.update(dt);
      }

      // 3. Clear canvas with background depending on ViewMode
      const width = logicalWidth;
      const height = logicalHeight;
      ctx.clearRect(0, 0, width, height);

      const isBlueprint = viewMode === 'blueprint';

      // Background styling
      if (isBlueprint) {
        ctx.fillStyle = '#002233';
        ctx.fillRect(0, 0, width, height);

        // CAD Grid
        ctx.strokeStyle = 'rgba(10, 132, 255, 0.12)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Concentric radar circles
        ctx.strokeStyle = 'rgba(10, 132, 255, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
        ctx.arc(width / 2, height / 2, 240, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Editorial Paper Styling
        ctx.fillStyle = '#F4F1EA';
        ctx.fillRect(0, 0, width, height);

        // Subtle architectural grid
        ctx.strokeStyle = 'rgba(213, 205, 190, 0.45)';
        ctx.lineWidth = 0.8;
        const gridSize = 60;
        for (let x = gridSize; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = gridSize; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Center origin crosshair
        ctx.strokeStyle = '#D5CDBE';
        ctx.lineWidth = 1;
        const cx = width / 2;
        const cy = height / 2;
        ctx.beginPath();
        ctx.moveTo(cx - 15, cy);
        ctx.lineTo(cx + 15, cy);
        ctx.moveTo(cx, cy - 15);
        ctx.lineTo(cx, cy + 15);
        ctx.stroke();
      }

      // 4. Project 3D nodes to 2D
      system.project(width, height, 520);

      // 5. Ground Shadow Projection (Floor plane)
      if (!isBlueprint) {
        ctx.save();
        ctx.fillStyle = 'rgba(24, 23, 21, 0.04)';
        for (const strut of system.struts) {
          const na = system.nodes[strut.nodeA];
          const nb = system.nodes[strut.nodeB];
          if (!na.px || !na.py || !nb.px || !nb.py) continue;

          const groundY = height * 0.82;
          const say = groundY + (na.py - height / 2) * 0.18;
          const sby = groundY + (nb.py - height / 2) * 0.18;

          ctx.beginPath();
          ctx.ellipse(na.px, say, 8 * (na.scale || 1), 3 * (na.scale || 1), 0, 0, Math.PI * 2);
          ctx.ellipse(nb.px, sby, 8 * (nb.scale || 1), 3 * (nb.scale || 1), 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(24, 23, 21, 0.03)';
          ctx.lineWidth = 5 * (na.scale || 1);
          ctx.moveTo(na.px, say);
          ctx.lineTo(nb.px, sby);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 6. Draw Tension Cables (with Plucked Catenary String Vibration)
      for (const cable of system.cables) {
        const na = system.nodes[cable.nodeA];
        const nb = system.nodes[cable.nodeB];
        if (na.px === undefined || na.py === undefined || nb.px === undefined || nb.py === undefined) continue;

        ctx.beginPath();
        const strain = cable.tension;

        if (strain > 0.15 && !reducedMotion) {
          const mx = (na.px + nb.px) / 2;
          const my = (na.py + nb.py) / 2;
          const dx = nb.px - na.px;
          const dy = nb.py - na.py;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const amp = Math.sin(cable.vibrationPhase || 0) * Math.min(10, strain * 12);

          ctx.moveTo(na.px, na.py);
          ctx.quadraticCurveTo(mx + nx * amp, my + ny * amp, nb.px, nb.py);
        } else {
          ctx.moveTo(na.px, na.py);
          ctx.lineTo(nb.px, nb.py);
        }

        if (isBlueprint) {
          ctx.strokeStyle = strain > 0.4 ? `rgba(255, 69, 58, ${0.4 + strain * 0.6})` : 'rgba(10, 132, 255, 0.45)';
          ctx.lineWidth = 1.2 + strain * 1.5;
          ctx.stroke();

          if (strain > 0.25) {
            const mx = (na.px + nb.px) / 2;
            const my = (na.py + nb.py) / 2;
            ctx.fillStyle = '#FF453A';
            ctx.font = '9px monospace';
            ctx.fillText(`+${(strain * 100).toFixed(0)}%`, mx + 4, my - 4);
          }
        } else {
          if (strain > 0.25) {
            ctx.strokeStyle = `rgba(217, 56, 30, ${0.4 + strain * 0.6})`;
            ctx.lineWidth = 1.4 + strain * 1.2;
          } else {
            ctx.strokeStyle = cable.color || 'rgba(164, 159, 150, 0.55)';
            ctx.lineWidth = 1.0;
          }
          ctx.stroke();
        }
      }

      // 7. Draw Compression Struts
      const sortedStruts = [...system.struts].sort((a, b) => {
        const za = ((system.nodes[a.nodeA].pz || 0) + (system.nodes[a.nodeB].pz || 0)) / 2;
        const zb = ((system.nodes[b.nodeA].pz || 0) + (system.nodes[b.nodeB].pz || 0)) / 2;
        return za - zb;
      });

      for (const strut of sortedStruts) {
        const na = system.nodes[strut.nodeA];
        const nb = system.nodes[strut.nodeB];
        if (na.px === undefined || na.py === undefined || nb.px === undefined || nb.py === undefined) continue;

        const avgScale = ((na.scale || 1) + (nb.scale || 1)) / 2;

        ctx.beginPath();
        ctx.moveTo(na.px, na.py);
        ctx.lineTo(nb.px, nb.py);

        if (isBlueprint) {
          ctx.strokeStyle = strut.color || '#FFFFFF';
          ctx.lineWidth = strut.thickness * avgScale * 1.1;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.fillStyle = '#0A84FF';
          ctx.fillRect(na.px - 2, na.py - 2, 4, 4);
          ctx.fillRect(nb.px - 2, nb.py - 2, 4, 4);
        } else {
          ctx.strokeStyle = strut.color || '#181715';
          ctx.lineWidth = strut.thickness * avgScale * 1.25;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = '#FAF8F5';
          ctx.lineWidth = 1.0 * avgScale;
          ctx.moveTo(na.px, na.py);
          ctx.lineTo(nb.px, nb.py);
          ctx.stroke();
        }
      }

      // 8. Draw Nodes & Callouts
      for (let i = 0; i < system.nodes.length; i++) {
        const node = system.nodes[i];
        if (node.px === undefined || node.py === undefined) continue;

        const isHovered = hoveredNode === i;
        const isDragged = system.draggedNodeIndex === i;
        const scale = node.scale || 1;
        const baseRadius = (isHovered || isDragged ? 7 : 4.5) * scale;

        ctx.beginPath();
        ctx.arc(node.px, node.py, baseRadius, 0, Math.PI * 2);

        if (isBlueprint) {
          ctx.fillStyle = isDragged ? '#FF453A' : isHovered ? '#FFFFFF' : '#0A84FF';
          ctx.fill();

          ctx.strokeStyle = 'rgba(10, 132, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.px, node.py, baseRadius + 6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#64D2FF';
          ctx.font = '10px monospace';
          ctx.fillText(`N${i} [${node.x.toFixed(0)}, ${node.y.toFixed(0)}, ${node.z.toFixed(0)}]`, node.px + 10, node.py - 6);
        } else {
          ctx.fillStyle = isDragged ? '#D9381E' : isHovered ? '#B32610' : '#181715';
          ctx.fill();

          ctx.strokeStyle = isDragged ? '#D9381E' : '#F4F1EA';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          if (isHovered || isDragged) {
            ctx.fillStyle = '#181715';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.fillText(node.label || `NODE #${i}`, node.px + 12, node.py - 8);

            ctx.fillStyle = '#7E7971';
            ctx.font = '10px monospace';
            ctx.fillText(`FORCE ${(Math.sqrt(node.vx*node.vx + node.vy*node.vy + node.vz*node.vz) * 10).toFixed(1)}N`, node.px + 12, node.py + 6);
          }
        }
      }

      // 9. Telemetry updates
      onTelemetryUpdate({
        fps: currentFps,
        nodeCount: system.nodes.length,
        strutCount: system.struts.length,
        cableCount: system.cables.length,
        totalEnergy: system.equilibriumEnergy,
        currentEquilibrium: Math.min(1.0, 1 / (1 + system.equilibriumEnergy * 0.1)),
        draggedNode: system.draggedNodeIndex,
        cursorDistance: 0,
        audioActive: !sound.isMuted,
        reducedMotion,
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [viewMode, reducedMotion, hoveredNode, onTelemetryUpdate]);

  // --- Interaction Handlers (Mouse & Touch) ---

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const coords = getCanvasCoords(e);
    const system = systemRef.current;
    const { w, h } = logicalSizeRef.current;

    const nearestNode = system.findNearestNode(coords.x, coords.y, 40);

    if (nearestNode !== null) {
      isDraggingNodeRef.current = true;
      system.draggedNodeIndex = nearestNode;
      const zTarget = system.nodes[nearestNode].z;
      const unprojected = system.unprojectMouseTo3D(coords.x, coords.y, w, h, zTarget);
      system.dragTarget = unprojected;
      sound.triggerPluck(0.7, nearestNode);
    } else {
      isRotatingRef.current = true;
      lastMouseRef.current = coords;
    }

    setIsInteracting(true);
  };

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const coords = getCanvasCoords(e);
    mousePosRef.current = coords;
    const system = systemRef.current;
    const { w, h } = logicalSizeRef.current;

    // Detect hover
    if (!isDraggingNodeRef.current && !isRotatingRef.current) {
      const nearest = system.findNearestNode(coords.x, coords.y, 32);
      setHoveredNode(nearest);
    }

    // Node dragging
    if (isDraggingNodeRef.current && system.draggedNodeIndex !== null) {
      const node = system.nodes[system.draggedNodeIndex];
      const unprojected = system.unprojectMouseTo3D(coords.x, coords.y, w, h, node.z);
      system.dragTarget = unprojected;

      const dx = coords.x - lastMouseRef.current.x;
      const dy = coords.y - lastMouseRef.current.y;
      const vel = Math.sqrt(dx * dx + dy * dy);
      sound.modulateVelocity(vel * 0.05);
    }

    // Viewport rotating
    if (isRotatingRef.current) {
      const dx = coords.x - lastMouseRef.current.x;
      const dy = coords.y - lastMouseRef.current.y;

      system.targetRotY += dx * 0.008;
      system.targetRotX -= dy * 0.008;
      system.velRotY = dx * 0.001;
      system.velRotX = -dy * 0.001;

      sound.modulateVelocity((Math.abs(dx) + Math.abs(dy)) * 0.03);
    }

    lastMouseRef.current = coords;
  }, []);

  const handlePointerUp = () => {
    const system = systemRef.current;
    if (isDraggingNodeRef.current && system.draggedNodeIndex !== null) {
      sound.triggerPluck(0.5, system.draggedNodeIndex);
    }
    isDraggingNodeRef.current = false;
    isRotatingRef.current = false;
    system.draggedNodeIndex = null;
    system.dragTarget = null;
    setIsInteracting(false);
  };

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />

      <div className="absolute top-4 right-4 pointer-events-none flex flex-col items-end gap-1 font-mono text-[11px] text-ink-500">
        <span className="bg-paper-50/80 backdrop-blur-sm px-2.5 py-1 rounded border border-paper-300">
          {isInteracting ? 'FORCE: ACTIVE DRAG' : 'TOUCH / DRAG TO PERTURB'}
        </span>
        <span className="text-[10px] text-ink-400">
          {viewMode === 'blueprint' ? 'BLUEPRINT DIAGNOSTIC: ACTIVE' : 'EQUILIBRIUM SOLVER: 60Hz'}
        </span>
      </div>
    </div>
  );
};
