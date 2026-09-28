/** 渲染编排：场景组装、参数分流（重建型 / 实时型）、循环与统计。 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEFAULT_PARAMS, rebuildKeyOf } from './params';
import type { SceneParams } from './params';
import { generateTerrain } from './terrain';
import { buildTerrainMeshes } from './mesher';
import { buildFalls } from './water';
import type { FallSystem, InstanceSpec } from './water';
import { generateVegetation } from './vegetation';
import { buildClouds } from './clouds';
import type { CloudSystem } from './clouds';
import { buildSky } from './sky';
import type { SkySystem } from './sky';

export interface ViewerStats {
  fps: number;
  triangles: number;
  drawCalls: number;
  quads: number;
  shellVoxels: number;
  waterCells: number;
  treeCount: number;
  cloudSlabs: number;
  peakHeight: number;
  grid: number;
  falls: number[];
}

interface DebugApi {
  stats: () => ViewerStats;
  measureFps: (ms: number) => Promise<{ avg: number; min: number; max: number }>;
  setParams: (patch: Record<string, unknown>) => void;
  regenerate: (seed: string) => void;
  resetView: () => void;
  readPixels: () => number[];
  lastBuildMs: () => number;
  setCamera: (azDeg: number, elDeg: number, dist: number, targetY: number) => void;
  skyDebug: () => Record<string, number[]>;
}

declare global {
  interface Window {
    __voxel?: DebugApi;
  }
}

function makeInstanced(
  specs: InstanceSpec[],
  geo: THREE.BoxGeometry,
  mat: THREE.Material,
  castShadow: boolean,
): THREE.InstancedMesh | null {
  if (specs.length === 0) return null;
  const mesh = new THREE.InstancedMesh(geo, mat, specs.length);
  const m = new THREE.Matrix4();
  for (let i = 0; i < specs.length; i++) {
    const s = specs[i];
    m.makeScale(s.s, s.s, s.s);
    m.setPosition(s.x, s.y, s.z);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, s.c);
  }
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  return mesh;
}

export class VoxelViewer {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private sky: SkySystem;
  private clouds: CloudSystem;
  private world: THREE.Group = new THREE.Group();
  private falls: FallSystem | null = null;

  private terrainMat: THREE.MeshLambertMaterial;
  private waterMat: THREE.MeshLambertMaterial;
  private vegMat: THREE.MeshLambertMaterial;
  private boxGeo: THREE.BoxGeometry;

  private params: SceneParams = { ...DEFAULT_PARAMS };
  private lastRebuildKey = '';
  private lastBuildMs = 0;
  private stat: ViewerStats = {
    fps: 0, triangles: 0, drawCalls: 0, quads: 0, shellVoxels: 0,
    waterCells: 0, treeCount: 0, cloudSlabs: 0, peakHeight: 0, grid: 0, falls: [],
  };

  private raf = 0;
  private prevTime = 0;
  private frameCount = 0;
  private fpsWindowStart = 0;
  private onStats: ((s: ViewerStats) => void) | null;
  private resizeObserver: ResizeObserver | null = null;
  private disposed = false;

  constructor(container: HTMLElement, onStats?: (s: ViewerStats) => void) {
    this.onStats = onStats ?? null;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth || 800, container.clientHeight || 600);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.5, 4000);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 40;
    this.controls.maxDistance = 700;
    this.controls.maxPolarAngle = 1.52;
    this.controls.minPolarAngle = 0.12;
    this.controls.target.set(0, 20, 0);

    this.terrainMat = new THREE.MeshLambertMaterial({ vertexColors: true });
    this.waterMat = new THREE.MeshLambertMaterial({
      vertexColors: true,
      transparent: true,
      opacity: DEFAULT_PARAMS.waterOpacity,
      depthWrite: false,
    });
    this.vegMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.boxGeo = new THREE.BoxGeometry(1, 1, 1);

    this.sky = buildSky();
    this.scene.add(this.sky.group);
    this.scene.fog = this.sky.fog;

    this.clouds = buildClouds();
    this.scene.add(this.clouds.mesh);
    this.clouds.rebuild(DEFAULT_PARAMS.cloudDensity);

    this.scene.add(this.world);
    this.resetView();

    this.resizeObserver = new ResizeObserver(() => this.handleResize(container));
    this.resizeObserver.observe(container);

    if (import.meta.env.DEV) {
      window.__voxel = {
        stats: () => this.getStats(),
        measureFps: (ms: number) => this.measureFps(ms),
        setParams: (patch: Record<string, unknown>) => this.setParams({ ...this.params, ...patch } as SceneParams),
        regenerate: (seed: string) => this.setParams({ ...this.params, seed }),
        resetView: () => this.resetView(),
        readPixels: () => this.readPixelGrid(),
        lastBuildMs: () => this.lastBuildMs,
        setCamera: (azDeg: number, elDeg: number, dist: number, targetY: number) =>
          this.setCamera(azDeg, elDeg, dist, targetY),
        skyDebug: () => this.skyDebug(),
      };
    }

    this.prevTime = performance.now();
    this.fpsWindowStart = this.prevTime;
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  /** 初始相机位姿：东南方向仰望主峰与崖壁瀑布。 */
  resetView(): void {
    const el = THREE.MathUtils.degToRad(33);
    const az = THREE.MathUtils.degToRad(108); // 世界方位角（自 +X 起算），正对东南崖壁瀑布
    const r = 255;
    this.camera.position.set(
      r * Math.cos(el) * Math.cos(az),
      r * Math.sin(el) + 14,
      r * Math.cos(el) * Math.sin(az),
    );
    this.controls.target.set(0, 14, 0);
    this.controls.update();
  }

  setParams(next: SceneParams): void {
    const prev = this.params;
    this.params = { ...next };
    const key = rebuildKeyOf(next);
    if (key !== this.lastRebuildKey) {
      this.rebuildWorld(next);
      this.lastRebuildKey = key;
    }
    // 实时参数
    this.controls.autoRotate = next.autoRotate;
    this.controls.autoRotateSpeed = next.rotateSpeed * 2.2;
    this.waterMat.opacity = next.waterOpacity;
    this.sky.apply(next.timeOfDay, next.fogAmount, next.shadows, this.clouds.material);
    if (prev.cloudDensity !== next.cloudDensity) this.clouds.rebuild(next.cloudDensity);
    if (prev.shadows !== next.shadows) {
      this.world.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.material) {
          const m = mesh.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((mm) => (mm.needsUpdate = true));
          else m.needsUpdate = true;
        }
      });
    }
  }

  private rebuildWorld(p: SceneParams): void {
    const t0 = performance.now();
    // 清理旧世界
    for (const child of [...this.world.children]) {
      this.world.remove(child);
      child.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
    }
    this.falls?.dispose();
    this.falls = null;

    const terrain = generateTerrain(p);
    const meshes = buildTerrainMeshes(terrain, p);

    const terrainMesh = new THREE.Mesh(meshes.terrain, this.terrainMat);
    terrainMesh.castShadow = true;
    terrainMesh.receiveShadow = true;
    this.world.add(terrainMesh);

    const waterMesh = new THREE.Mesh(meshes.water, this.waterMat);
    waterMesh.receiveShadow = true;
    this.world.add(waterMesh);

    this.falls = buildFalls(terrain.falls, terrain.poolCenter);
    this.world.add(this.falls.group);

    const veg = generateVegetation(terrain, p);
    for (const specs of [veg.trunks, veg.leaves]) {
      const inst = makeInstanced(specs, this.boxGeo, this.vegMat, true);
      if (inst) this.world.add(inst);
    }
    for (const specs of [veg.rocks, veg.flowers]) {
      const inst = makeInstanced(specs, this.boxGeo, this.vegMat, false);
      if (inst) this.world.add(inst);
    }

    this.stat.quads = meshes.quadCount;
    this.stat.shellVoxels = meshes.shellVoxels;
    this.stat.waterCells = terrain.water.length;
    this.stat.treeCount = veg.treeCount;
    this.stat.peakHeight = terrain.peakHeight;
    this.stat.falls = terrain.falls.map((f) => [f.x, f.z, f.baseY, f.topY, f.width]).flat();
    this.stat.grid = terrain.size;
    this.lastBuildMs = performance.now() - t0;
  }

  private handleResize(container: HTMLElement): void {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private loop(now: number): void {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, (now - this.prevTime) / 1000);
    this.prevTime = now;

    this.controls.update();
    this.falls?.update(dt, this.params.waterfallSpeed);
    this.clouds.update(dt, this.params.cloudSpeed, this.params.cloudHeight);
    this.renderer.render(this.scene, this.camera);

    this.frameCount++;
    const elapsed = now - this.fpsWindowStart;
    if (elapsed >= 500) {
      this.stat.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.stat.triangles = this.renderer.info.render.triangles;
      this.stat.drawCalls = this.renderer.info.render.calls;
      this.stat.cloudSlabs = this.clouds.count();
      this.frameCount = 0;
      this.fpsWindowStart = now;
      this.onStats?.(this.getStats());
    }
  }

  getStats(): ViewerStats {
    return { ...this.stat };
  }

  /** 强制高速旋转下的 FPS 测量（用于验收）。 */
  async measureFps(ms: number): Promise<{ avg: number; min: number; max: number }> {
    const savedAuto = this.controls.autoRotate;
    const savedSpeed = this.controls.autoRotateSpeed;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 10;
    const samples: number[] = [];
    let frames = 0;
    let last = performance.now();
    const end = last + ms;
    await new Promise<void>((resolve) => {
      const tick = () => {
        const t = performance.now();
        frames++;
        if (t - last >= 400) {
          samples.push((frames * 1000) / (t - last));
          frames = 0;
          last = t;
        }
        if (t < end) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    this.controls.autoRotate = savedAuto;
    this.controls.autoRotateSpeed = savedSpeed;
    if (!samples.length) return { avg: 0, min: 0, max: 0 };
    return {
      avg: samples.reduce((a, b) => a + b, 0) / samples.length,
      min: Math.min(...samples),
      max: Math.max(...samples),
    };
  }

  /** 渲染一帧并返回降采样像素网格（验收用，[r,g,b]×160×100，自顶向下）。 */
  readPixelGrid(): number[] {
    this.renderer.render(this.scene, this.camera);
    const gl = this.renderer.getContext();
    const W = gl.drawingBufferWidth;
    const H = gl.drawingBufferHeight;
    const buf = new Uint8Array(W * H * 4);
    gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, buf);
    const cols = 160;
    const rows = 100;
    const out: number[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = Math.floor((c / cols) * W);
        const y = Math.floor((r / rows) * H);
        const i = ((H - 1 - y) * W + x) * 4;
        out.push(buf[i], buf[i + 1], buf[i + 2]);
      }
    }
    return out;
  }

  /** 验收用：显式设置相机球坐标位姿。 */
  setCamera(azDeg: number, elDeg: number, dist: number, targetY: number): void {
    const el = THREE.MathUtils.degToRad(elDeg);
    const az = THREE.MathUtils.degToRad(azDeg);
    this.controls.autoRotate = false;
    this.camera.position.set(
      dist * Math.cos(el) * Math.cos(az),
      dist * Math.sin(el) + targetY,
      dist * Math.cos(el) * Math.sin(az),
    );
    this.controls.target.set(0, targetY, 0);
    this.controls.update();
  }

  /** 验收用：天空/光照内部状态。 */
  skyDebug(): Record<string, number[]> {
    const u = this.sky.domeUniforms;
    return {
      zenith: [u.uZenith.value.r, u.uZenith.value.g, u.uZenith.value.b],
      horizon: [u.uHorizon.value.r, u.uHorizon.value.g, u.uHorizon.value.b],
      sunColor: [u.uSunColor.value.r, u.uSunColor.value.g, u.uSunColor.value.b],
      sunDir: [u.uSunDir.value.x, u.uSunDir.value.y, u.uSunDir.value.z],
      fog: [this.sky.fog.color.r, this.sky.fog.color.g, this.sky.fog.color.b, this.sky.fog.density],
      light: [this.sky.sun.color.r, this.sky.sun.color.g, this.sky.sun.color.b, this.sky.sun.intensity],
    };
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver?.disconnect();
    this.controls.dispose();
    this.falls?.dispose();
    this.clouds.dispose();
    this.sky.dispose();
    for (const child of [...this.world.children]) {
      child.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
    }
    this.terrainMat.dispose();
    this.waterMat.dispose();
    this.vegMat.dispose();
    this.boxGeo.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    if (import.meta.env.DEV && window.__voxel) delete window.__voxel;
  }
}
