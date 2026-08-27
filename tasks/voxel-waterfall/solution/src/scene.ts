import * as THREE from 'three';
import { generateTerrain, TerrainData, VOXEL, VoxelType } from './terrain';

export interface SceneSettings {
  size: number;
  voxelSize: number;
  baseHeight: number;
  amplitude: number;
  mainPeakHeight: number;
  seed: number;
  carveWaterfall: boolean;
  cloudDensity: number;
  cloudAltitude: number;
  cloudThickness: number;
  waterfallFlow: number;
  showVegetation: boolean;
  timeOfDay: number;
  autoRotate: boolean;
}

export const DEFAULT_SETTINGS: SceneSettings = {
  size: 128,
  voxelSize: 0.5,
  baseHeight: 14,
  amplitude: 28,
  mainPeakHeight: 36,
  seed: 1337,
  carveWaterfall: true,
  cloudDensity: 0.55,
  cloudAltitude: 22,
  cloudThickness: 4,
  waterfallFlow: 1,
  showVegetation: true,
  timeOfDay: 0.18,
  autoRotate: true,
};

const PALETTE: Array<{ name: string; type: VoxelType; transparent?: boolean }> = [
  { name: 'grass',  type: VOXEL.grass },
  { name: 'dirt',   type: VOXEL.dirt },
  { name: 'stone',  type: VOXEL.stone },
  { name: 'rock',   type: VOXEL.rock },
  { name: 'snow',   type: VOXEL.snow },
  { name: 'sand',   type: VOXEL.sand },
  { name: 'water',  type: VOXEL.water, transparent: true },
  { name: 'cloud',  type: VOXEL.cloud, transparent: true },
  { name: 'leaf',   type: VOXEL.leaf },
  { name: 'trunk',  type: VOXEL.trunk },
];

const SLOT_GRASS = 0;
const SLOT_DIRT = 1;
const SLOT_STONE = 2;
const SLOT_ROCK = 3;
const SLOT_SNOW = 4;
const SLOT_SAND = 5;
const SLOT_WATER = 6;
const SLOT_CLOUD = 7;
const SLOT_LEAF = 8;
const SLOT_TRUNK = 9;

export interface SceneStats {
  voxels: number;
  fps: number;
  drawCalls: number;
}

export interface BuiltScene {
  group: THREE.Group;
  stats: SceneStats;
  update(dt: number, camera: THREE.PerspectiveCamera): void;
  dispose(): void;
  applySettings(next: SceneSettings): void;
  needsTerrainRebuild(): boolean;
  rebuildTerrain(next: SceneSettings): BuiltScene;
}

function makeSlotMaterials(): THREE.Material[] {
  return PALETTE.map(({ type, transparent }) => {
    return new THREE.MeshLambertMaterial({
      color: type.color,
      transparent: !!transparent || (type.opacity !== undefined && type.opacity < 1),
      opacity: type.opacity ?? 1,
    });
  });
}

interface CloudState {
  idx: number;
  speed: number;
}

interface WaterfallState {
  idx: number;
  segIdx: number;
  phase: number;
}

interface SplashState {
  idx: number;
  phase: number;
  angle: number;
}

interface SceneInternals {
  settings: SceneSettings;
  data: TerrainData;
  meshes: THREE.InstancedMesh[];
  cloudState: CloudState[];
  waterfallState: WaterfallState[];
  splashState: SplashState[];
  voxelCount: number;
  needsTerrainRebuildFlag: boolean;
  ambient: THREE.AmbientLight;
  hemi: THREE.HemisphereLight;
  sun: THREE.DirectionalLight;
}

export function buildScene(initial: SceneSettings): BuiltScene {
  const internals = constructScene(initial);

  const stats: SceneStats = {
    voxels: internals.voxelCount,
    fps: 0,
    drawCalls: internals.meshes.length + 3,
  };

  function update(dt: number, _camera: THREE.PerspectiveCamera) {
    applyTimeOfDay(internals);
    animateClouds(internals, dt);
    if (internals.settings.carveWaterfall) {
      animateWaterfall(internals, dt);
    }
  }

  function dispose() {
    for (const m of internals.meshes) m.geometry?.dispose?.();
    for (const m of internals.meshes) (m.material as THREE.Material).dispose();
  }

  function applySettings(next: SceneSettings) {
    const terrainChanged =
      next.size !== internals.settings.size ||
      next.baseHeight !== internals.settings.baseHeight ||
      next.amplitude !== internals.settings.amplitude ||
      next.mainPeakHeight !== internals.settings.mainPeakHeight ||
      next.seed !== internals.settings.seed ||
      next.carveWaterfall !== internals.settings.carveWaterfall ||
      next.voxelSize !== internals.settings.voxelSize ||
      next.showVegetation !== internals.settings.showVegetation;
    if (terrainChanged) {
      internals.needsTerrainRebuildFlag = true;
    }
    internals.settings = { ...next };
  }

  function needsTerrainRebuild() {
    return internals.needsTerrainRebuildFlag;
  }

  function rebuildTerrain(next: SceneSettings): BuiltScene {
    return buildScene(next);
  }

  return {
    group: makeGroup(internals),
    stats,
    update,
    dispose,
    applySettings,
    needsTerrainRebuild,
    rebuildTerrain,
  };
}

function makeGroup(internals: SceneInternals): THREE.Group {
  const g = new THREE.Group();
  g.name = 'voxel-scene';
  for (const m of internals.meshes) g.add(m);
  g.add(internals.ambient);
  g.add(internals.hemi);
  g.add(internals.sun);
  return g;
}

function constructScene(settings: SceneSettings): SceneInternals {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = makeSlotMaterials();

  const data = generateTerrain({
    size: settings.size,
    voxelSize: settings.voxelSize,
    baseHeight: settings.baseHeight,
    amplitude: settings.amplitude,
    mainPeakHeight: settings.mainPeakHeight,
    seed: settings.seed,
    carveWaterfall: settings.carveWaterfall,
  });

  const slotCounts = new Int32Array(PALETTE.length);
  const positions: Array<[number, number, number, number]> = [];

  const snowLine = Math.floor(settings.mainPeakHeight * 0.78);
  const stoneLine = Math.floor(settings.mainPeakHeight * 0.55);
  const sandLine = settings.baseHeight - 2;

  for (let y = 0; y < data.size; y++) {
    for (let x = 0; x < data.size; x++) {
      const surface = data.heights[y * data.size + x];
      for (let vy = 0; vy <= Math.min(surface, 200); vy++) {
        const slot = pickSlot(vy, surface, snowLine, stoneLine, sandLine);
        positions.push([x, vy, y, slot]);
        slotCounts[slot]++;
      }
    }
  }

  if (settings.showVegetation) {
    addVegetation(data, positions, slotCounts, settings);
  }

  if (data.spawnWaterfall) {
    slotCounts[SLOT_WATER] += data.waterfallPath.length * 6 + 16;
  }
  slotCounts[SLOT_CLOUD] += Math.round(settings.size * settings.size * settings.cloudDensity * 0.18);

  const meshes: THREE.InstancedMesh[] = [];
  for (let i = 0; i < PALETTE.length; i++) {
    const mesh = new THREE.InstancedMesh(geometry, materials[i], slotCounts[i]);
    mesh.frustumCulled = false;
    mesh.count = 0;
    meshes.push(mesh);
  }

  const tempObj = new THREE.Object3D();
  let voxelCount = 0;
  for (const [x, y, z, slot] of positions) {
    const mesh = meshes[slot];
    tempObj.position.set(
      (x - data.size / 2 + 0.5) * data.voxelSize,
      (y + 0.5) * data.voxelSize,
      (z - data.size / 2 + 0.5) * data.voxelSize
    );
    tempObj.updateMatrix();
    mesh.setMatrixAt(mesh.count, tempObj.matrix);
    mesh.count++;
    voxelCount++;
  }

  const cloudState: CloudState[] = [];
  buildClouds(settings, meshes, cloudState);

  const waterfallState: WaterfallState[] = [];
  const splashState: SplashState[] = [];
  if (data.spawnWaterfall) {
    buildWaterfall(meshes, data, waterfallState, splashState);
  }

  for (const m of meshes) m.instanceMatrix.needsUpdate = true;

  const ambient = new THREE.AmbientLight(0x6c7a90, 0.55);
  const hemi = new THREE.HemisphereLight(0x9bc4ff, 0x3a2a1c, 0.35);
  const sun = new THREE.DirectionalLight(0xffd9a8, 1.05);
  sun.position.set(60, 90, 40);

  return {
    settings: { ...settings },
    data,
    meshes,
    cloudState,
    waterfallState,
    splashState,
    voxelCount,
    needsTerrainRebuildFlag: false,
    ambient,
    hemi,
    sun,
  };
}

function applyTimeOfDay(internals: SceneInternals) {
  const t = internals.settings.timeOfDay;
  // 0 = dawn (warm pink/orange), 0.25 = noon (cool white), 0.5 = dusk (deep orange), 1 = back to dawn
  const phase = t < 0.5 ? t : 1 - t; // 0..0.5 -> 0..0.5; 0.5..1 -> 0.5..0
  const dawnness = Math.max(0, 0.5 - phase) * 2; // 1 at dawn/dusk, 0 at noon

  const sun = internals.sun;
  const hemi = internals.hemi;
  const ambient = internals.ambient;

  // Sun arc: low at dawn/dusk, high at noon.
  const sunAngle = Math.PI * (0.1 + (1 - dawnness) * 0.4);
  const sunRadius = 90;
  sun.position.set(
    Math.cos(sunAngle + Math.PI) * sunRadius,
    Math.sin(sunAngle) * sunRadius * (0.4 + dawnness * 0.2),
    Math.sin(sunAngle + Math.PI) * sunRadius
  );

  const dayColor = new THREE.Color(0xffffff);
  const dawnColor = new THREE.Color(0xffb877);
  const noonColor = new THREE.Color(0xfff4d8);
  const hemiSky = new THREE.Color(0x9bc4ff);
  const hemiGround = new THREE.Color(0x3a2a1c);

  sun.color.copy(dawnColor).lerp(noonColor, 1 - dawnness);
  sun.intensity = 0.6 + (1 - dawnness) * 0.6;
  hemi.color.copy(hemiSky).lerp(dayColor, dawnness);
  hemi.groundColor.copy(hemiGround);
  hemi.intensity = 0.35 + dawnness * 0.2;
  ambient.color.set(0x6c7a90).lerp(dawnColor, dawnness * 0.4);
  ambient.intensity = 0.4 + dawnness * 0.25;

  // Fog also shifts with time of day for atmospheric depth.
  const fog = internals.meshes[0]?.parent?.userData?.fog as THREE.Fog | undefined;
  if (fog) {
    const fogColor = new THREE.Color(0x9bbcd8).lerp(dawnColor, dawnness * 0.7);
    fog.color.copy(fogColor);
  }
}

function animateClouds(internals: SceneInternals, dt: number) {
  if (internals.cloudState.length === 0) return;
  const mesh = internals.meshes[SLOT_CLOUD];
  const halfWorld = (internals.settings.size / 2) * internals.settings.voxelSize + 4;
  const tmpMatrix = new THREE.Matrix4();
  const tmpPos = new THREE.Vector3();
  const tmpQuat = new THREE.Quaternion();
  const tmpScale = new THREE.Vector3();
  const tmpObj = new THREE.Object3D();
  for (const c of internals.cloudState) {
    mesh.getMatrixAt(c.idx, tmpMatrix);
    tmpMatrix.decompose(tmpPos, tmpQuat, tmpScale);
    tmpPos.x += c.speed * dt * 0.4;
    if (tmpPos.x > halfWorld) tmpPos.x = -halfWorld;
    tmpObj.position.copy(tmpPos);
    tmpObj.quaternion.copy(tmpQuat);
    tmpObj.scale.copy(tmpScale);
    tmpObj.updateMatrix();
    mesh.setMatrixAt(c.idx, tmpObj.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

function animateWaterfall(internals: SceneInternals, dt: number) {
  const mesh = internals.meshes[SLOT_WATER];
  const path = internals.data.waterfallPath;
  if (path.length === 0 || mesh.count === 0) return;
  const voxelSize = internals.settings.voxelSize;
  const segCount = path.length;
  const tmpObj = new THREE.Object3D();

  for (const p of internals.waterfallState) {
    p.phase += dt * internals.settings.waterfallFlow;
    const t = p.phase % 1;
    const seg = p.segIdx % segCount;
    const segPt = path[seg];
    const xJit = ((p.idx % 3) - 1) * voxelSize * 0.45;
    const zJit = (Math.floor(p.idx / 3) % 3 - 1) * voxelSize * 0.45;
    const x = (segPt[0] - internals.data.size / 2 + 0.5 + xJit) * voxelSize;
    const z = (segPt[2] - internals.data.size / 2 + 0.5 + zJit) * voxelSize;
    const yTop = segPt[1] * voxelSize;
    const yBottom = (internals.settings.baseHeight - 1) * voxelSize;
    const y = yTop + (yBottom - yTop) * t;
    tmpObj.position.set(x, y, z);
    tmpObj.updateMatrix();
    mesh.setMatrixAt(p.idx, tmpObj.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  if (internals.splashState.length === 0) return;
  const last = path[path.length - 1];
  const sx = (last[0] - internals.data.size / 2 + 0.5) * voxelSize;
  const sz = (last[2] - internals.data.size / 2 + 0.5) * voxelSize;
  const sy = (internals.settings.baseHeight - 0.5) * voxelSize;
  for (const s of internals.splashState) {
    s.phase += dt * internals.settings.waterfallFlow * 1.4;
    const t = s.phase % 1;
    const r = t * 1.6 * voxelSize;
    const sc = (1 - t) * voxelSize * 0.9;
    tmpObj.position.set(
      sx + Math.cos(s.angle) * r,
      sy + Math.sin(t * Math.PI) * voxelSize * 1.2,
      sz + Math.sin(s.angle) * r
    );
    tmpObj.scale.set(sc / voxelSize, sc / voxelSize, sc / voxelSize);
    tmpObj.updateMatrix();
    mesh.setMatrixAt(s.idx, tmpObj.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

function pickSlot(
  vy: number,
  surface: number,
  snowLine: number,
  stoneLine: number,
  sandLine: number
): number {
  const depth = surface - vy;
  if (depth === 0) {
    if (surface >= snowLine) return SLOT_SNOW;
    if (surface >= stoneLine) return SLOT_STONE;
    if (surface <= sandLine) return SLOT_SAND;
    return SLOT_GRASS;
  }
  if (depth <= 2) return SLOT_DIRT;
  return SLOT_ROCK;
}

function addVegetation(
  data: TerrainData,
  positions: Array<[number, number, number, number]>,
  slotCounts: Int32Array,
  cfg: SceneSettings
) {
  let rngState = cfg.seed * 2654435761;
  const next = () => {
    rngState = (rngState * 1664525 + 1013904223) | 0;
    return ((rngState >>> 0) % 10000) / 10000;
  };
  const sandLine = cfg.baseHeight - 2;
  const stoneLine = Math.floor(cfg.mainPeakHeight * 0.55);
  let leaves = 0;
  let trunks = 0;
  for (let y = 4; y < data.size - 4; y++) {
    for (let x = 4; x < data.size - 4; x++) {
      const surface = data.heights[y * data.size + x];
      if (surface > stoneLine) continue;
      if (surface < sandLine + 1) continue;
      if (isNearWaterfall(x, y, data.waterfallPath)) continue;
      if (next() < 0.045) {
        const trunkH = 2 + Math.floor(next() * 2);
        for (let h = 1; h <= trunkH; h++) {
          positions.push([x, surface + h, y, SLOT_TRUNK]);
          trunks++;
        }
        const crownR = 1 + Math.floor(next() * 2);
        for (let dy = -crownR; dy <= crownR; dy++) {
          for (let dx = -crownR; dx <= crownR; dx++) {
            for (let dz = -crownR; dz <= crownR; dz++) {
              if (dx * dx + dy * dy + dz * dz > crownR * crownR + 1) continue;
              positions.push([x + dx, surface + trunkH + 1 + dy, y + dz, SLOT_LEAF]);
              leaves++;
            }
          }
        }
      }
    }
  }
  slotCounts[SLOT_LEAF] += leaves;
  slotCounts[SLOT_TRUNK] += trunks;
}

function isNearWaterfall(
  x: number,
  y: number,
  path: Array<[number, number, number]>
): boolean {
  for (const [px, , py] of path) {
    const dx = x - px;
    const dy = y - py;
    if (dx * dx + dy * dy < 16) return true;
  }
  return false;
}

function buildClouds(
  cfg: SceneSettings,
  meshes: THREE.InstancedMesh[],
  state: CloudState[]
) {
  const mesh = meshes[SLOT_CLOUD];
  if (!mesh) return;
  const half = cfg.size / 2;
  const voxelSize = cfg.voxelSize;
  const target = Math.round(cfg.size * cfg.size * cfg.cloudDensity * 0.18);

  let rngState = cfg.seed * 0x9e3779b1;
  const next = () => {
    rngState = (rngState * 1664525 + 1013904223) | 0;
    return ((rngState >>> 0) % 1000000) / 1000000;
  };

  let written = 0;
  let attempt = 0;
  while (written < target && attempt < target * 3) {
    attempt++;
    const cx = (next() * 2 - 1) * half * 0.95;
    const cz = (next() * 2 - 1) * half * 0.95;
    const cy = cfg.cloudAltitude + (next() - 0.5) * cfg.cloudThickness;
    const sx = 2 + Math.floor(next() * 4);
    const sy = 1 + Math.floor(next() * 2);
    const sz = 2 + Math.floor(next() * 4);
    const speed = 0.2 + next() * 0.6;
    for (let dy = 0; dy < sy; dy++) {
      for (let dz = 0; dz < sz; dz++) {
        for (let dx = 0; dx < sx; dx++) {
          if (written >= target) break;
          const jx = (next() - 0.5) * 0.6;
          const jy = (next() - 0.5) * 0.6;
          const jz = (next() - 0.5) * 0.6;
          const obj = new THREE.Object3D();
          obj.position.set(
            (cx + dx - sx / 2 + jx) * voxelSize,
            (cy + dy + jy) * voxelSize,
            (cz + dz - sz / 2 + jz) * voxelSize
          );
          const sc = 0.7 + next() * 0.6;
          obj.scale.set(sc, sc, sc);
          obj.updateMatrix();
          mesh.setMatrixAt(written, obj.matrix);
          state.push({ idx: written, speed });
          written++;
        }
      }
    }
  }
  mesh.count = written;
}

function buildWaterfall(
  meshes: THREE.InstancedMesh[],
  data: TerrainData,
  state: WaterfallState[],
  splash: SplashState[]
) {
  const mesh = meshes[SLOT_WATER];
  if (!mesh || data.waterfallPath.length < 2) return;

  let written = 0;
  for (let seg = 0; seg < data.waterfallPath.length; seg++) {
    for (let k = 0; k < 6; k++) {
      const obj = new THREE.Object3D();
      obj.position.set(0, -1000, 0);
      obj.updateMatrix();
      mesh.setMatrixAt(written, obj.matrix);
      state.push({ idx: written, segIdx: seg, phase: k / 6 });
      written++;
    }
  }
  for (let i = 0; i < 16; i++) {
    const obj = new THREE.Object3D();
    obj.position.set(0, -2000, 0);
    obj.updateMatrix();
    mesh.setMatrixAt(written, obj.matrix);
    splash.push({ idx: written, phase: i / 16, angle: i * 0.7 });
    written++;
  }
  mesh.count = written;
}
