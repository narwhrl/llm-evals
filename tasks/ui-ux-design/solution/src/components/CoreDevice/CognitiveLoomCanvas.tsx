import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { PhaseId, TensionParameters } from '../../types';
import { audioEngine } from '../../utils/AudioEngine';

interface Props {
  phase: PhaseId;
  tension: TensionParameters;
  stressLevel: number;
  fractureProgress: number;
  inspectionMode: boolean;
  reducedMotion: boolean;
  onPointerEngage?: (x: number, y: number) => void;
}

export const CognitiveLoomCanvas: React.FC<Props> = ({
  phase,
  tension,
  stressLevel,
  fractureProgress,
  inspectionMode,
  reducedMotion,
  onPointerEngage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudCanvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [currentEnergy, setCurrentEnergy] = useState<number>(0.5);

  // References to keep Three.js state across re-renders
  const stateRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    coreMesh: THREE.Mesh | null;
    wireMesh: THREE.LineSegments | null;
    latticePoints: THREE.Points | null;
    orbitRings: THREE.Group | null;
    fractureShards: THREE.InstancedMesh | null;
    mouse: { x: number; y: number; targetX: number; targetY: number; vx: number; vy: number; isDown: boolean };
    clock: THREE.Clock;
    reqId: number | null;
    lastFrameTime: number;
    frameCount: number;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    coreMesh: null,
    wireMesh: null,
    latticePoints: null,
    orbitRings: null,
    fractureShards: null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, isDown: false },
    clock: new THREE.Clock(),
    reqId: null,
    lastFrameTime: performance.now(),
    frameCount: 0,
  });

  // Track props in refs for animation loop
  const propsRef = useRef({
    phase,
    tension,
    stressLevel,
    fractureProgress,
    inspectionMode,
    reducedMotion,
  });

  useEffect(() => {
    propsRef.current = {
      phase,
      tension,
      stressLevel,
      fractureProgress,
      inspectionMode,
      reducedMotion,
    };
  }, [phase, tension, stressLevel, fractureProgress, inspectionMode, reducedMotion]);

  // Handle pointer interactions
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    
    stateRef.current.mouse.targetX = nx;
    stateRef.current.mouse.targetY = ny;

    if (onPointerEngage) {
      onPointerEngage(nx, ny);
    }
  }, [onPointerEngage]);

  const handlePointerDown = useCallback(() => {
    stateRef.current.mouse.isDown = true;
    audioEngine.triggerHapticTick();
  }, []);

  const handlePointerUp = useCallback(() => {
    stateRef.current.mouse.isDown = false;
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060709, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.0);
    rimLight.position.set(-5, -4, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x10b981, 1.8, 12);
    accentLight.position.set(0, 0, 3);
    scene.add(accentLight);

    // 4. Core Geometry (Icosahedron with subdiv)
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 3);
    const posAttr = coreGeo.attributes.position;
    // Store original positions for deformation
    coreGeo.userData.origPositions = new Float32Array(posAttr.array);

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f1420,
      emissive: 0x09101d,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.85,
      transmission: 0.4,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 5. Wireframe Lattice Overlay
    const wireGeo = new THREE.WireframeGeometry(coreGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    coreMesh.add(wireMesh);

    // 6. Dynamic Point Clouds (Tension nodes)
    const pointCount = 600;
    const pointGeo = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const radius = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pointPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pointPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pointPositions[i * 3 + 2] = radius * Math.cos(phi);

      // Gradient colors
      const isAmber = Math.random() > 0.6;
      pointColors[i * 3] = isAmber ? 0.96 : 0.22;
      pointColors[i * 3 + 1] = isAmber ? 0.62 : 0.74;
      pointColors[i * 3 + 2] = isAmber ? 0.04 : 0.97;
    }

    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const latticePoints = new THREE.Points(pointGeo, pointMat);
    scene.add(latticePoints);

    // 7. Concentric Orbit Rings (Phase Telemetry Gyroscope)
    const orbitRings = new THREE.Group();
    const ringRadii = [2.8, 3.3, 3.8];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0xf59e0b : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35 - idx * 0.08,
        wireframe: true,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / (2 + idx);
      ringMesh.rotation.y = (idx * Math.PI) / 4;
      orbitRings.add(ringMesh);
    });
    scene.add(orbitRings);

    // 8. Instanced Fracture Shards (For Fracture & Re-synthesis sequence)
    const shardCount = 80;
    const shardGeo = new THREE.TetrahedronGeometry(0.18, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const fractureShards = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
    
    // Set initial shard matrices (collapsed inside core)
    const dummy = new THREE.Object3D();
    for (let i = 0; i < shardCount; i++) {
      dummy.position.set(0, 0, 0);
      dummy.scale.set(0.001, 0.001, 0.001);
      dummy.updateMatrix();
      fractureShards.setMatrixAt(i, dummy.matrix);
    }
    fractureShards.instanceMatrix.needsUpdate = true;
    scene.add(fractureShards);

    // Store state
    stateRef.current = {
      ...stateRef.current,
      scene,
      camera,
      renderer,
      coreMesh,
      wireMesh,
      latticePoints,
      orbitRings,
      fractureShards,
    };

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // HUD Canvas resize
      if (hudCanvasRef.current) {
        hudCanvasRef.current.width = width * window.devicePixelRatio;
        hudCanvasRef.current.height = height * window.devicePixelRatio;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 9. Animation Loop
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const {
        phase: curPhase,
        tension: curTension,
        stressLevel: curStress,
        fractureProgress: curFracture,
        inspectionMode: curInspection,
        reducedMotion: curReduced,
      } = propsRef.current;

      const delta = stateRef.current.clock.getDelta();
      const elapsed = stateRef.current.clock.getElapsedTime();
      const mouse = stateRef.current.mouse;

      // Smooth mouse spring interpolation
      const springDamp = curReduced ? 0.05 : 0.08;
      mouse.vx = (mouse.targetX - mouse.x) * springDamp;
      mouse.vy = (mouse.targetY - mouse.y) * springDamp;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // FPS Calculation
      stateRef.current.frameCount++;
      const now = performance.now();
      if (now - stateRef.current.lastFrameTime >= 1000) {
        setFps(Math.round((stateRef.current.frameCount * 1000) / (now - stateRef.current.lastFrameTime)));
        stateRef.current.frameCount = 0;
        stateRef.current.lastFrameTime = now;
      }

      // Energy metric for telemetry HUD
      const computedEnergy =
        0.3 +
        curTension.emergence * 0.4 +
        curTension.intuition * 0.2 +
        curStress * 0.5 +
        Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) * 2;
      setCurrentEnergy(Math.min(1.0, computedEnergy));

      // 1. Core mesh rotation & responsiveness
      if (coreMesh) {
        if (!curReduced) {
          const rotSpeed = 0.4 + curTension.emergence * 0.6 + curStress * 0.8;
          coreMesh.rotation.y = elapsed * rotSpeed * 0.5 + mouse.x * 1.2;
          coreMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.2 + mouse.y * -0.8;
          coreMesh.rotation.z = Math.cos(elapsed * 0.2) * 0.1;
        } else {
          // Static architectural alignment in reduced motion
          coreMesh.rotation.set(0.3, 0.4, 0);
        }

        // Deform vertices based on tension & harmonics
        const geo = coreMesh.geometry as THREE.IcosahedronGeometry;
        const pos = geo.attributes.position;
        const orig = geo.userData.origPositions as Float32Array;

        if (orig && !curReduced) {
          for (let i = 0; i < pos.count; i++) {
            const ox = orig[i * 3];
            const oy = orig[i * 3 + 1];
            const oz = orig[i * 3 + 2];
            const len = Math.sqrt(ox * ox + oy * oy + oz * oz);

            // Calculate spherical harmonic wave
            const wave =
              Math.sin(ox * 2.5 + elapsed * 2.0) *
              Math.cos(oy * 2.5 + elapsed * 1.5) *
              curTension.intuition *
              0.35;

            const spike =
              Math.sin(oz * 4.0 + elapsed * 3.0) *
              curTension.emergence *
              0.25;

            const rigorDamping = 1.0 - curTension.rigor * 0.7; // High rigor keeps shape geometric
            const stressDistortion =
              curStress * Math.sin(ox * 8.0 + elapsed * 6.0) * 0.35;

            const scale = (len + (wave + spike + stressDistortion) * rigorDamping) / len;

            pos.setXYZ(i, ox * scale, oy * scale, oz * scale);
          }
          pos.needsUpdate = true;
          geo.computeVertexNormals();
        }

        // Material dynamic adjustment
        if (coreMesh.material instanceof THREE.MeshPhysicalMaterial) {
          coreMesh.material.wireframe = curInspection;
          coreMesh.material.emissiveIntensity = 0.2 + curStress * 0.8 + curTension.emergence * 0.4;
          coreMesh.material.roughness = THREE.MathUtils.lerp(0.05, 0.4, curTension.rigor);
          
          if (curPhase === 'genesis') {
            coreMesh.material.emissive.setHex(0x0284c7);
          } else if (curPhase === 'dialectic') {
            coreMesh.material.emissive.setHex(0x38bdf8);
          } else if (curPhase === 'cocreation') {
            coreMesh.material.emissive.setHex(curStress > 0.5 ? 0xf59e0b : 0x818cf8);
          } else if (curPhase === 'archive') {
            coreMesh.material.emissive.setHex(0x10b981);
          }
        }
      }

      // 2. Wireframe lattice visibility and color
      if (wireMesh) {
        wireMesh.visible = curInspection || curTension.rigor > 0.4 || curPhase === 'dialectic';
        if (wireMesh.material instanceof THREE.LineBasicMaterial) {
          wireMesh.material.opacity = curInspection ? 0.85 : 0.2 + curTension.rigor * 0.5;
        }
      }

      // 3. Orbit Rings Rotation
      if (orbitRings) {
        if (!curReduced) {
          orbitRings.children.forEach((ring, idx) => {
            const dir = idx % 2 === 0 ? 1 : -1;
            ring.rotation.z += delta * 0.25 * dir * (1 + curTension.emergence);
            ring.rotation.x += delta * 0.15 * dir;
          });
        }
      }

      // 4. Point Cloud Drift
      if (latticePoints && !curReduced) {
        latticePoints.rotation.y = -elapsed * 0.08 + mouse.x * 0.4;
        latticePoints.rotation.x = Math.sin(elapsed * 0.1) * 0.15;
      }

      // 5. Fracture Shards Animation (Long-sequence turn & resolution)
      if (fractureShards) {
        const dummy = new THREE.Object3D();
        const shardCount = fractureShards.count;

        for (let i = 0; i < shardCount; i++) {
          if (curFracture > 0.01) {
            const phi = Math.acos(-1 + (2 * i) / shardCount);
            const theta = Math.sqrt(shardCount * Math.PI) * phi;
            
            // Explosion radius curves out then reorganizes into a crystalline ring
            const explosionDist = Math.sin(curFracture * Math.PI) * 3.5 * (1 + (i % 5) * 0.2);
            const ringDist = 2.6;
            const dist = THREE.MathUtils.lerp(explosionDist, ringDist, Math.max(0, (curFracture - 0.6) / 0.4));

            const sx = dist * Math.cos(theta) * Math.sin(phi);
            const sy = dist * Math.sin(theta) * Math.sin(phi);
            const sz = dist * Math.cos(phi);

            dummy.position.set(sx, sy, sz);
            dummy.rotation.set(elapsed * (i + 1) * 0.1, elapsed * 0.2, i * 0.5);
            
            const scale = Math.min(1.0, curFracture * 2.0);
            dummy.scale.set(scale, scale, scale);
          } else {
            dummy.scale.set(0.0001, 0.0001, 0.0001);
          }
          dummy.updateMatrix();
          fractureShards.setMatrixAt(i, dummy.matrix);
        }
        fractureShards.instanceMatrix.needsUpdate = true;
      }

      // Render 3D Scene
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      // 6. Draw 2D HUD / Vector Inspection Layer
      drawHUD(curInspection, curPhase, curTension, mouse, computedEnergy, elapsed);
    };

    animFrameId = requestAnimationFrame(animate);
    stateRef.current.reqId = animFrameId;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stateRef.current.clock.stop();
      } else {
        stateRef.current.clock.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
    };
  }, []);

  // 2D Canvas HUD & Inspection Overlay Drawing function
  const drawHUD = (
    inspection: boolean,
    _curPhase: PhaseId,
    t: TensionParameters,
    mouse: { x: number; y: number },
    _energy: number,
    time: number
  ) => {
    const canvas = hudCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, w, h);

    if (!inspection) {
      // Draw subtle orbital reticles and phase telemetry
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1 * dpr;

      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.38;

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - r - 20 * dpr, cy);
      ctx.lineTo(cx - r + 10 * dpr, cy);
      ctx.moveTo(cx + r - 10 * dpr, cy);
      ctx.lineTo(cx + r + 20 * dpr, cy);
      ctx.moveTo(cx, cy - r - 20 * dpr);
      ctx.lineTo(cx, cy - r + 10 * dpr);
      ctx.moveTo(cx, cy + r - 10 * dpr);
      ctx.lineTo(cx, cy + r + 20 * dpr);
      ctx.stroke();

      // Orbital ticks
      const tickCount = 24;
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * Math.PI * 2 + time * 0.05;
        const tx1 = cx + Math.cos(angle) * (r - 6 * dpr);
        const ty1 = cy + Math.sin(angle) * (r - 6 * dpr);
        const tx2 = cx + Math.cos(angle) * (r + 6 * dpr);
        const ty2 = cy + Math.sin(angle) * (r + 6 * dpr);

        ctx.beginPath();
        ctx.strokeStyle = i % 6 === 0 ? 'rgba(245, 158, 11, 0.35)' : 'rgba(56, 189, 248, 0.15)';
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(tx2, ty2);
        ctx.stroke();
      }

      ctx.restore();
      return;
    }

    // --- FULL INSPECTION MODE HUD ---
    ctx.save();
    ctx.font = `${10 * dpr}px "JetBrains Mono", monospace`;

    // 1. Barycentric Coordinate Grid
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.lineWidth = 1 * dpr;
    const gridStep = 40 * dpr;

    for (let x = 0; x < w; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 2. Mathematical Equations & Tensor Telemetry
    ctx.fillStyle = '#10B981';
    ctx.fillText(`// TENSOR_FIELD_INSPECTION_MODE [ACTIVE]`, 24 * dpr, 36 * dpr);
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`TOPOLOGICAL_MANIFOLD: S^3 × R (NON-EUCLIDEAN CONVEX)`, 24 * dpr, 54 * dpr);
    ctx.fillText(`CURVATURE: κ = |r'(t) × r''(t)| / |r'(t)|^3 = ${(1.24 + t.intuition * 0.8).toFixed(4)}`, 24 * dpr, 70 * dpr);
    ctx.fillText(`RIGOR_TENSOR: ${(t.rigor * 100).toFixed(1)}% | EMERGENCE: ${(t.emergence * 100).toFixed(1)}%`, 24 * dpr, 86 * dpr);

    // 3. Vector Pointer Tangent Line
    const cx = w / 2;
    const cy = h / 2;
    const mx = cx + mouse.x * (w * 0.4);
    const my = cy - mouse.y * (h * 0.4);

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.arc(mx, my, 8 * dpr, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#38BDF8';
    ctx.fillText(`VECTOR_P: [${mouse.x.toFixed(3)}, ${mouse.y.toFixed(3)}]`, mx + 14 * dpr, my + 4 * dpr);

    ctx.restore();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[480px] lg:min-h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="region"
      aria-label="认知折射核心体验装置（3D交互拓扑织机）"
    >
      {/* Primary 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* 2D Mathematical HUD / Vector Telemetry Overlay */}
      <canvas ref={hudCanvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-10" />

      {/* Telemetry Badge in bottom-left */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 px-3.5 py-2 rounded-full glass-panel border border-white/10 text-xs font-mono-tech text-mercury-300 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse"></span>
          <span>MANIFOLD: <strong className="text-white uppercase">{phase}</strong></span>
        </div>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1.5">
          <span>ENERGY:</span>
          <div className="w-12 h-1.5 rounded-full bg-titanium-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-aurora-cyan to-aurora-amber transition-all duration-300"
              style={{ width: `${Math.round(currentEnergy * 100)}%` }}
            />
          </div>
        </div>
        <span className="text-white/20">|</span>
        <span>{fps} FPS</span>
      </div>

      {/* Interactive Helper Prompt */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-titanium-900/80 border border-white/5 text-[11px] font-mono-tech text-mercury-400 pointer-events-none">
        <span className="text-aurora-cyan">⟲ 拖拽旋转</span>
        <span className="text-white/20">·</span>
        <span className="text-aurora-amber">波形随思考张力形变</span>
      </div>
    </div>
  );
};
