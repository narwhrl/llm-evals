import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  archBridge, armillary, exedra, gate, lineSpan, ringSpan, roadOn, rotunda, sanctum, spire, watchtower,
} from './architecture';
import { CLOUD_Y, cloudSea, cloudTime, continent, cumulus, lightShafts, puffs } from './clouds';
import { CAMERA_AZIMUTH, createLights, createSky, patchFogChunks } from './env';
import { Kit, MAT, T, sweep } from './kit';
import { Forest, debrisField, vines, waterUniforms, waterfall } from './nature';
import { fbm3, rng } from './noise';
import { createPost } from './postfx';
import { type Island, makeIsland } from './rock';

patchFogChunks();

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 1, 2); // enables the patched aerial-perspective chunks
const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 20, 300000);

scene.add(createSky(cloudTime));
createLights(scene);

const TAU = Math.PI * 2;
const rand = rng(2024);
const kit = new Kit();
const forest = new Forest();
const vinePts: { x: number; y: number; z: number; len: number }[] = [];
const waterfalls: THREE.Mesh[] = [];
const cloudPuffs: Parameters<typeof puffs>[0] = [];

function addIsland(isl: Island, x: number, y: number, z: number): THREE.Mesh {
  const [body] = ([[isl.body, MAT.rock], [isl.top, MAT.grass]] as const).map(([geo, mat]) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    m.updateMatrixWorld();
    scene.add(m);
    return m;
  });
  const n = Math.round(isl.spec.radius / 9);
  for (let i = 0; i < n; i++) {
    const a = rand() * TAU;
    const r = isl.rimR(a) * 0.985;
    vinePts.push({ x: x + r * Math.cos(a), y, z: z + r * Math.sin(a), len: 15 + rand() * rand() * isl.spec.radius * 0.5 });
  }
  return body;
}

const ray = new THREE.Raycaster();
/** Radius of the actual (noise-displaced) rock surface of a body centred on the Y axis. */
function surfaceAt(body: THREE.Mesh, a: number, y: number): number {
  ray.set(new THREE.Vector3(Math.cos(a) * 5000, y, Math.sin(a) * 5000), new THREE.Vector3(-Math.cos(a), 0, -Math.sin(a)));
  const hit = ray.intersectObject(body)[0];
  return hit ? 5000 - hit.distance : 0;
}

/** Scatters trees on an island top, keeping clear of `keep(x, z)` areas. */
function plant(isl: Island, ox: number, oy: number, oz: number, count: number, keep: (x: number, z: number) => boolean, rMin = 0): void {
  for (let i = 0; i < count; i++) {
    const a = rand() * TAU;
    const rf = Math.sqrt(rMin + rand() * (1 - rMin)) * 0.9;
    const x = Math.cos(a) * isl.rimR(a) * rf, z = Math.sin(a) * isl.rimR(a) * rf;
    if (keep(x, z) || fbm3(x / 160 + ox / 1000, 0.3, z / 160, 2) < -0.05) continue;
    forest.add(ox + x, oy + isl.topY(x, z), oz + z, 16 + rand() * 14, rand() < 0.14);
  }
}

function addWaterfall(isl: Island, ox: number, oy: number, oz: number, a: number, width: number, length: number): void {
  const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
  const rim = isl.rimR(a);
  const start = new THREE.Vector3(ox + dir.x * rim, oy + 1.5, oz + dir.z * rim);
  waterfalls.push(waterfall(start, dir, width, length));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 10; i++) {
    const r = rim * THREE.MathUtils.lerp(0.55, 1.0, i / 10);
    const aa = a + Math.sin(i * 0.9) * 0.04;
    const x = Math.cos(aa) * r, z = Math.sin(aa) * r;
    pts.push(new THREE.Vector3(ox + x, oy + isl.topY(x, z) - 0.6, oz + z));
  }
  kit.mesh(sweep(pts, width * 0.55, 1.8), 'water');
  cloudPuffs.push({ p: start.clone().addScaledVector(dir, 260).setY(start.y - length * 0.85), size: width * 9, light: 0.85, alpha: 0.28 });
}

// ---------------------------------------------------------------- central island
const AVENUES = [0, 1, 2, 3].map((k) => THREE.MathUtils.degToRad(32.5) + (k * Math.PI) / 2);
const avenueDist = (x: number, z: number) =>
  Math.min(...AVENUES.map((a) => {
    const along = x * Math.cos(a) + z * Math.sin(a);
    return along < 0 ? Infinity : Math.abs(-x * Math.sin(a) + z * Math.cos(a));
  }));
const MAIN = makeIsland({
  radius: 560, depth: 1250, seed: 11, seg: 180, rings: 90, hills: 10,
  paving: (x, z) => {
    const r = Math.hypot(x, z);
    const plaza = 1 - THREE.MathUtils.smoothstep(r, 290, 300);
    const ringRoad = 1 - THREE.MathUtils.smoothstep(Math.abs(r - 330), 10, 16);
    const ave = 1 - THREE.MathUtils.smoothstep(avenueDist(x, z), 16, 22);
    return Math.max(plaza, ringRoad, ave);
  },
});
const mainBody = addIsland(MAIN, 0, 0, 0);
const B = MAIN.topY(0, 0);
const armCenter = sanctum(kit, B);

// avenues: obelisk rows from the plinth to the rim
for (const a of AVENUES) {
  const c = Math.cos(a), s = Math.sin(a);
  for (let r = 330; r < MAIN.rimR(a) - 50; r += 42) {
    for (const side of [-1, 1]) {
      const x = c * r - s * side * 26, z = s * r + c * side * 26;
      const y = MAIN.topY(x, z);
      kit.inst('box', 'ivoryWarm', T(x, y - 4, z, 7, 10, 7, Math.PI / 2 - a));
      kit.inst('cyl8', 'ivory', T(x, y + 6, z, 2.6, 34, 2.6));
      kit.inst('cone8', 'gold', T(x, y + 40, z, 2.6, 9, 2.6));
    }
  }
}
// secondary temples between the avenues
const mainKeep: [number, number, number][] = [];
for (let k = 0; k < 4; k++) {
  const a = AVENUES[k] + Math.PI / 4;
  const c = Math.cos(a), s = Math.sin(a);
  const x = c * 405, z = s * 405;
  mainKeep.push([x, z, 85]);
  if (k % 2 === 0) rotunda(kit, x, MAIN.topY(x, z), z, 42, 120);
  else {
    spire(kit, x, MAIN.topY(x, z), z, 20, 300);
    for (const d of [-1, 1]) {
      const bx = x + -s * d * 60, bz = z + c * d * 60;
      spire(kit, bx, MAIN.topY(bx, bz), bz, 10, 150);
      mainKeep.push([bx, bz, 30]);
    }
  }
  for (const d of [-1, 1]) {
    const b = a + d * 0.28;
    const bx = Math.cos(b) * 450, bz = Math.sin(b) * 450;
    if (Math.hypot(bx, bz) < MAIN.rimR(b) - 60) {
      spire(kit, bx, MAIN.topY(bx, bz), bz, 8, 110);
      mainKeep.push([bx, bz, 25]);
    }
  }
}
// rim colonnade following the cliff edge, broken at the avenues
{
  const pts: THREE.Vector3[][] = [[]];
  // start on an avenue so every run of columns ends at an avenue break
  for (let i = 0; i < 240; i++) {
    const a = AVENUES[0] + (i / 240) * TAU;
    const nearAve = AVENUES.some((v) => Math.abs(Math.atan2(Math.sin(a - v), Math.cos(a - v))) < 0.07);
    if (nearAve) {
      if (pts[pts.length - 1].length) pts.push([]);
      continue;
    }
    const r = MAIN.rimR(a) - 34;
    const x = r * Math.cos(a), z = r * Math.sin(a);
    const y = MAIN.topY(x, z);
    pts[pts.length - 1].push(new THREE.Vector3(x, y, z));
    if (i % 3 === 0) {
      kit.inst('cyl', 'ivory', T(x, y - 3, z, 2.4, 29, 2.4));
      kit.inst('box', 'ivory', T(x, y - 4, z, 6, 6, 6));
    }
    if (i % 30 === 15) spire(kit, x, y, z, 7, 95);
  }
  for (const seg of pts) {
    if (seg.length < 2) continue;
    const top = seg.map((p) => p.clone().setY(p.y + 26));
    kit.mesh(sweep(top, 6, 4.5), 'ivory');
    kit.mesh(sweep(top.map((p) => p.clone().setY(p.y + 4.5)), 6.4, 1.2), 'gold');
  }
}
plant(MAIN, 0, 0, 0, 900, (x, z) => {
  const r = Math.hypot(x, z);
  if (r < 360 || Math.abs(r - 330) < 30 || avenueDist(x, z) < 40) return true;
  if (r > MAIN.rimR(Math.atan2(z, x)) - 50) return true;
  return mainKeep.some(([kx, kz, kr]) => Math.hypot(x - kx, z - kz) < kr);
}, 0.3);
addWaterfall(MAIN, 0, 0, 0, THREE.MathUtils.degToRad(100), 64, 1700);
addWaterfall(MAIN, 0, 0, 0, THREE.MathUtils.degToRad(4), 52, 1500);
addWaterfall(MAIN, 0, 0, 0, THREE.MathUtils.degToRad(200), 52, 1500);

// ancient structures half-buried in the inverted cliff
for (const [deg, depth, n] of [[62, 170, 5], [98, 320, 4], [24, 400, 3], [150, 230, 4], [335, 270, 4]] as const) {
  const a = THREE.MathUtils.degToRad(deg);
  const r = Math.min(surfaceAt(mainBody, a, -depth), surfaceAt(mainBody, a, -depth - 80)) - 4;
  kit.within(T(r * Math.cos(a), -depth - 80, r * Math.sin(a), 1, 1, 1, Math.PI / 2 - a), () => {
    for (let i = 0; i < n; i++) kit.inst('bayRound', 'ivoryWarm', T((i - (n - 1) / 2) * 38, 0, 0, 38, 80, 40));
    kit.inst('box', 'ivoryShade', T(0, -12, -20, n * 38 + 20, 12, 60));
    kit.inst('box', 'ivoryWarm', T(0, 80, -20, n * 38 + 12, 10, 56));
    kit.inst('box', 'gold', T(0, 84, 8.5, n * 38 + 12, 2, 1));
    kit.inst('box', 'ivoryShade', T(0, 0, -30, n * 38, 80, 40));
  });
}
for (const [deg, depth, h] of [[72, 480, 260], [190, 450, 220], [318, 560, 300], [40, 620, 200]] as const) {
  const a = THREE.MathUtils.degToRad(deg);
  const r = surfaceAt(mainBody, a, -depth - h * 0.45) + 6;
  kit.within(T(r * Math.cos(a), -depth, r * Math.sin(a), 1, 1, 1, 0, Math.PI), () => spire(kit, 0, 0, 0, 14, h));
}
{
  let r = 0;
  for (let k = 0; k < 24; k++) r = Math.max(r, surfaceAt(mainBody, (k / 24) * TAU, -650));
  r += 25;
  for (const [a0, a1] of [[0.2, 1.9], [2.4, 3.6], [4.1, 5.8]]) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const a = THREE.MathUtils.lerp(a0, a1, i / 40);
      pts.push(new THREE.Vector3(r * Math.cos(a), -650, r * Math.sin(a)));
    }
    kit.mesh(sweep(pts, 16, 12), 'ivoryWarm');
    kit.mesh(sweep(pts.map((p) => p.clone().setY(-638)), 17, 2), 'gold');
  }
}

// ---------------------------------------------------------------- ring of islets
const RR = 1180;
type Feature = 'exedra' | 'watch' | 'gate' | 'ruin' | 'twin' | 'rotunda' | 'temple' | 'arches';
const ISLETS: { deg: number; r: number; y: number; f: Feature; fall?: number }[] = [
  { deg: 32.5, r: 175, y: -30, f: 'exedra', fall: 60 },
  { deg: 77.5, r: 150, y: -70, f: 'watch' },
  { deg: 122.5, r: 240, y: -15, f: 'gate', fall: 150 },
  { deg: 167.5, r: 140, y: -85, f: 'ruin' },
  { deg: 212.5, r: 205, y: -40, f: 'twin' },
  { deg: 257.5, r: 135, y: -65, f: 'rotunda' },
  { deg: 302.5, r: 230, y: -20, f: 'temple', fall: 330 },
  { deg: 347.5, r: 150, y: -75, f: 'arches' },
];
const islets = ISLETS.map((d, i) => {
  const a = THREE.MathUtils.degToRad(d.deg + (rand() - 0.5) * 4);
  const isl = makeIsland({ radius: d.r, depth: d.r * (2.4 + rand() * 0.8), seed: 31 + i * 7, seg: 96, rings: 48, hills: 6 });
  const x = RR * Math.cos(a), z = RR * Math.sin(a);
  addIsland(isl, x, d.y, z);
  return { ...d, a, isl, x, z };
});
const roadY = (it: (typeof islets)[number]) => it.y + it.isl.topY(0, 0) + 1;

for (const it of islets) {
  const { isl, x, z, a, r } = it;
  const y0 = roadY(it);
  const half = (r * 0.82) / RR;
  roadOn(kit, ringSpan(RR, a - half, a + half, y0, y0));
  const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
  const tan = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));
  const at = (u: number, v: number) => new THREE.Vector3(x + out.x * u + tan.x * v, 0, z + out.z * u + tan.z * v);
  const gy = (p: THREE.Vector3) => it.y + isl.topY(p.x - x, p.z - z);
  const keep: [number, number, number][] = [];
  const put = (u: number, v: number, rad: number) => { const p = at(u, v); keep.push([p.x - x, p.z - z, rad]); return p; };

  switch (it.f) {
    case 'exedra': { const p = put(r * 0.42, 0, 70); exedra(kit, p.x, gy(p), p.z, 55, 34, a); break; }
    case 'watch': { const p = put(r * 0.4, -20, 40); watchtower(kit, p.x, gy(p), p.z, 20, 230); break; }
    case 'gate': {
      const g = at(0, 0); gate(kit, g.x, y0 + 8, g.z, 120, -Math.PI / 2 - a);
      const p = put(r * 0.5, 30, 60); rotunda(kit, p.x, gy(p), p.z, 40, 110);
      for (const v of [-90, 90]) { const q = put(-r * 0.45, v, 25); spire(kit, q.x, gy(q), q.z, 11, 200); }
      break;
    }
    case 'ruin': {
      const p = put(r * 0.35, 10, 40); spire(kit, p.x, gy(p), p.z, 18, 260, true, 7);
      for (let k = 0; k < 5; k++) {
        const q = put(-r * 0.3 + k * 18, 40 + k * 6, 12);
        kit.inst('cyl', 'ivoryWarm', T(q.x, gy(q) + 3, q.z, 3, 18 + k * 4, 3, k, Math.PI / 2));
      }
      break;
    }
    case 'twin': {
      for (const v of [-45, 45]) { const p = put(r * 0.35, v, 30); spire(kit, p.x, gy(p), p.z, 15, 330); }
      const q = put(-r * 0.5, 0, 60); exedra(kit, q.x, gy(q), q.z, 45, 28, a + Math.PI, 0.4, 9);
      break;
    }
    case 'rotunda': { const p = put(r * 0.4, 0, 50); rotunda(kit, p.x, gy(p), p.z, 34, 100); break; }
    case 'temple': {
      const p = put(r * 0.42, 0, 70); rotunda(kit, p.x, gy(p), p.z, 50, 150);
      for (const v of [-75, 75]) { const q = put(r * 0.4, v, 25); spire(kit, q.x, gy(q), q.z, 12, 230); }
      const w = put(-r * 0.5, 0, 40); watchtower(kit, w.x, gy(w), w.z, 16, 170);
      break;
    }
    case 'arches': {
      for (let k = 0; k < 6; k++) {
        const p = put(r * 0.4, -60 + k * 24, 15);
        const h = k === 2 || k === 4 ? 20 + k * 3 : 52;
        kit.inst('cyl', 'ivoryWarm', T(p.x, gy(p) - 3, p.z, 3.4, h, 3.4));
        if (h === 52 && k < 5) kit.inst('bayRound', 'ivoryWarm', T(p.x + tan.x * 12, gy(p) + 30, p.z + tan.z * 12, 24, 26, 20, Math.atan2(tan.x, tan.z) + Math.PI / 2));
      }
      break;
    }
  }
  plant(isl, x, it.y, z, Math.round(r * 0.9), (px, pz) => {
    const rr = isl.rimR(Math.atan2(pz, px));
    if (Math.hypot(px, pz) > rr - 25) return true;
    const along = Math.abs(px * tan.x + pz * tan.z), across = Math.abs(px * out.x + pz * out.z);
    if (across < 30 && along < r) return true;
    return keep.some(([kx, kz, kr]) => Math.hypot(px - kx, pz - kz) < kr);
  });
  if (it.fall) addWaterfall(isl, x, it.y, z, THREE.MathUtils.degToRad(it.fall), 40, 900 + r * 2);
}

// ring bridges between neighbouring islets (one has collapsed)
islets.forEach((it, i) => {
  const nx = islets[(i + 1) % islets.length];
  let a1 = nx.a;
  if (a1 < it.a) a1 += TAU;
  const s = ringSpan(RR, it.a + (it.r * 0.8) / RR, a1 - (nx.r * 0.8) / RR, roadY(it), roadY(nx));
  archBridge(kit, s, { colonnade: i % 2 === 0, broken: it.f === 'temple' ? [0.3, 0.66] : undefined, seed: i + 3 });
});
// radial spokes from the avenues to the spoke islets (one broken)
islets.filter((_, i) => i % 2 === 0).forEach((it, k) => {
  const a = it.a;
  const rm = MAIN.rimR(a) * 0.96;
  const p0 = new THREE.Vector3(rm * Math.cos(a), MAIN.topY(rm * Math.cos(a), rm * Math.sin(a)) - 4, rm * Math.sin(a));
  const ri = RR - it.r * 0.8;
  const p1 = new THREE.Vector3(ri * Math.cos(a), roadY(it), ri * Math.sin(a));
  archBridge(kit, lineSpan(p0, p1), { width: 30, colonnade: k % 2 === 1, broken: k === 2 ? [0.45, 0.62] : undefined, seed: 40 + k });
  roadOn(kit, lineSpan(p1, new THREE.Vector3(RR * Math.cos(a), roadY(it), RR * Math.sin(a))), 30);
});

// ---------------------------------------------------------------- distant islands for layered depth
for (let i = 0; i < 14; i++) {
  const a = rand() * TAU;
  const dist = 2600 + rand() * 7000;
  const r = 60 + rand() * 200;
  const isl = makeIsland({ radius: r, depth: r * (2 + rand()), seed: 200 + i, seg: 48, rings: 24, hills: 4 });
  const x = dist * Math.cos(a), z = dist * Math.sin(a), y = -500 + (rand() - 0.6) * 1600;
  addIsland(isl, x, y, z);
  plant(isl, x, y, z, Math.round(r * 0.4), (px, pz) => Math.hypot(px, pz) < r * 0.3);
  if (rand() < 0.6) spire(kit, x, y + isl.topY(0, 0), z, 8 + r * 0.05, 80 + r * 0.6, rand() < 0.6, i);
}

scene.add(kit.build(), forest.build(), vines(vinePts), ...waterfalls);
const debris = debrisField(170, 77);
scene.add(debris.mesh);
const arm = armillary(new THREE.Vector3(0, armCenter, 0));
arm.group.scale.setScalar(1.45);
scene.add(arm.group);

// ---------------------------------------------------------------- sky: sea of clouds, land, cumulus, shafts
scene.add(cloudSea(), continent());
for (let i = 0; i < 26; i++) {
  const a = rand() * TAU;
  const d = 14000 + rand() * 30000;
  const w = 1800 + rand() * 3500;
  cumulus(cloudPuffs, new THREE.Vector3(d * Math.cos(a), CLOUD_Y + 200, d * Math.sin(a)), w, w * (0.5 + rand() * 0.7), 22, 300 + i);
}
for (let i = 0; i < 12; i++) {
  const a = rand() * TAU;
  const d = 5500 + rand() * 9000;
  const w = 900 + rand() * 900;
  cumulus(cloudPuffs, new THREE.Vector3(d * Math.cos(a), CLOUD_Y + 200 + rand() * 700, d * Math.sin(a)), w, w * 0.7, 10, 500 + i, 0.85);
}
// mist clinging under the islands
for (const it of islets) {
  cumulus(cloudPuffs, new THREE.Vector3(it.x, it.y - it.isl.spec.depth * 0.8, it.z), it.r * 1.7, it.r * 0.6, 4, 700 + it.deg, 0.3);
}
cumulus(cloudPuffs, new THREE.Vector3(0, -1000, 0), 700, 300, 10, 801, 0.5);
scene.add(puffs(cloudPuffs));
// shafts fall through the gaps in the ring and down onto the cloud sea
const gapAt = (deg: number, r = RR, y = -60) => new THREE.Vector3(r * Math.cos(THREE.MathUtils.degToRad(deg)), y, r * Math.sin(THREE.MathUtils.degToRad(deg)));
scene.add(lightShafts([
  { through: gapAt(55), radius: 130, up: 2600, down: 5600, strength: 0.08 },
  { through: gapAt(100, 1250), radius: 100, up: 2400, down: 5400, strength: 0.07 },
  { through: gapAt(325, 1200, -120), radius: 160, up: 2800, down: 5600, strength: 0.07 },
  { through: gapAt(10, 850), radius: 80, up: 2000, down: 5800, strength: 0.06 },
  { through: gapAt(280, 1300), radius: 120, up: 2600, down: 5600, strength: 0.06 },
]));

// ---------------------------------------------------------------- camera, controls, loop
const target = new THREE.Vector3(0, 300, 0);
const DIST = 4750, ELEV = THREE.MathUtils.degToRad(9.2);
const shotAt = (az: number, el: number) =>
  new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(DIST).add(target);
camera.position.copy(shotAt(CAMERA_AZIMUTH, ELEV));
camera.lookAt(target);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(target);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 900;
controls.maxDistance = 12000;
// keeps the camera above the cloud deck even at max distance
controls.maxPolarAngle = THREE.MathUtils.degToRad(100);
let drifting = true;
controls.addEventListener('start', () => { drifting = false; });

const post = createPost(renderer, scene, camera);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  post.composer.setSize(window.innerWidth, window.innerHeight);
});

const timer = new THREE.Timer();
renderer.setAnimationLoop((now) => {
  timer.update(now);
  const t = timer.getElapsed();
  if (drifting) {
    // slow cinematic sway around the default three-quarter shot until the viewer takes over
    camera.position.copy(shotAt(CAMERA_AZIMUTH + Math.sin(t * 0.045) * 0.07, ELEV + Math.sin(t * 0.031) * 0.012));
    camera.lookAt(target);
  } else controls.update();
  cloudTime.value = t;
  waterUniforms.uTime.value = t;
  arm.update(t);
  debris.update(t);
  post.render(t);
});
