import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  initSharedTextures, makeSharedMats, mulberry32,
} from './materials';
import { buildIsland, buildBridge, buildColonnade, buildRuinSpire, type IsletSpec } from './islands';
import { buildSanctum } from './spire';
import { plantTrees, buildWaterfall, buildDebris, buildBirds, type Animated } from './nature';
import { buildSky, buildCloudSea, buildLightShafts, buildDistantLand } from './sky';

initSharedTextures();

const app = document.getElementById('app')!;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcfe2f5, 2600, 7800);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 1, 22000);
// 电影级三分之四远景： first view frames the whole of Celestia, no input needed.
camera.position.set(1480, 790, 1770);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 150, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;
controls.minDistance = 420;
controls.maxDistance = 3400;
controls.maxPolarAngle = 1.78;
controls.minPolarAngle = 0.12;
controls.enablePan = false;

// ---- lights: soft golden sun + sky fill ----
const sunDir = new THREE.Vector3(-0.45, 0.5, -0.62).normalize();
const sun = new THREE.DirectionalLight(0xffe7bb, 2.5);
sun.position.copy(sunDir).multiplyScalar(3000);
scene.add(sun);
scene.add(new THREE.HemisphereLight(0xbcd9ff, 0xb59a7e, 1.15));
const bounce = new THREE.DirectionalLight(0xa9c6ee, 1.0);
bounce.position.set(800, -600, 900); // cool bounce off the cloud sea
scene.add(bounce);
const fill = new THREE.DirectionalLight(0xffe9c8, 0.9); // camera-side fill lifts the shaded faces
fill.position.set(1500, 900, 1800);
scene.add(fill);

const mats = makeSharedMats();
const animated: Animated[] = [];
const waterfallMats: THREE.ShaderMaterial[] = [];

// ---- environment ----
buildSky(scene);
const clouds = buildCloudSea(scene, 7);
buildLightShafts(scene, 21);
buildDistantLand(scene, 99);

// ---- central main island ----
const world = new THREE.Group();
scene.add(world);
const CENTRAL_R = 235;
world.add(buildIsland(mats, CENTRAL_R, 1234, 430));

// ---- ring of eight floating islets ----
const rand = mulberry32(20240);
const islets: (IsletSpec & { x: number; z: number; topY: number })[] = [];
const N = 8;
for (let i = 0; i < N; i++) {
  const angle = (i / N) * Math.PI * 2 + (rand() - 0.5) * 0.35;
  const dist = 660 + rand() * 130;
  const radius = 58 + rand() * 68;
  const topY = -30 + rand() * 55;
  islets.push({
    angle, dist, radius, seed: 5000 + i * 77, tall: 1,
    x: Math.cos(angle) * dist, z: Math.sin(angle) * dist, topY,
  });
}
for (const s of islets) {
  const isl = buildIsland(mats, s.radius, s.seed, s.radius * 2.6 + 60);
  isl.position.set(s.x, s.topY, s.z);
  world.add(isl);
}

// ---- bridges: full outer ring + 3 radial spokes; one span left broken ----
const edge = (cx: number, cz: number, r: number, towardX: number, towardZ: number, topY: number) => {
  const dx = towardX - cx;
  const dz = towardZ - cz;
  const d = Math.hypot(dx, dz);
  const k = Math.max(0, (d - r * 0.82) / d);
  return new THREE.Vector3(cx + dx * k, topY + 3, cz + dz * k);
};
for (let i = 0; i < N; i++) {
  const a = islets[i];
  const b = islets[(i + 1) % N];
  const pa = edge(a.x, a.z, a.radius, b.x, b.z, a.topY);
  const pb = edge(b.x, b.z, b.radius, a.x, a.z, b.topY);
  if (i === 4) {
    // broken span: two weathered stubs with a gap in the middle
    const midA = pa.clone().lerp(pb, 0.32);
    const midB = pa.clone().lerp(pb, 0.68);
    world.add(buildBridge(mats, pa, midA, 900 + i));
    world.add(buildBridge(mats, midB, pb, 950 + i));
    continue;
  }
  world.add(buildBridge(mats, pa, pb, 900 + i));
}
// radial spokes from the central island to islets 0, 3, 6
for (const i of [0, 3, 6]) {
  const s = islets[i];
  const pa = edge(0, 0, CENTRAL_R, s.x, s.z, 0);
  const pb = edge(s.x, s.z, s.radius, 0, 0, s.topY);
  world.add(buildBridge(mats, pa, pb, 800 + i));
}

// ---- colonnades: ring-road fragments on the main island + two islets ----
{
  const arc = (r: number, a0: number, a1: number, y: number): [THREE.Vector3, THREE.Vector3] => [
    new THREE.Vector3(Math.cos(a0) * r, y, Math.sin(a0) * r),
    new THREE.Vector3(Math.cos(a1) * r, y, Math.sin(a1) * r),
  ];
  const [c1a, c1b] = arc(150, 0.3, 1.25, 4);
  const [c2a, c2b] = arc(150, Math.PI + 0.4, Math.PI + 1.35, 4);
  world.add(buildColonnade(mats, c1a, c1b));
  world.add(buildColonnade(mats, c2a, c2b));
  const s1 = islets[1];
  world.add(buildColonnade(
    mats,
    new THREE.Vector3(s1.x - 40, s1.topY + 3, s1.z - 20),
    new THREE.Vector3(s1.x + 42, s1.topY + 3, s1.z + 24),
  ));
}

// ---- central sanctum ----
const { group: sanctum, armillary } = buildSanctum(mats);
world.add(sanctum);
animated.push({
  update(t: number) {
    for (const spin of armillary.userData.spinners as THREE.Group[]) {
      spin.rotation.z += (spin.userData.speed as number) * 0.016;
    }
    void t;
  },
});

// ---- pavilions: small white shrines with gold roofs ----
function pavilion(x: number, y: number, z: number, s: number, rotY: number): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(16 * s, 18 * s, 5 * s, 8), mats.ivoryFlat);
  base.position.y = 2.5 * s;
  base.rotation.y = Math.PI / 8;
  g.add(base);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(1.6 * s, 2 * s, 14 * s, 8), mats.ivory);
    col.position.set(Math.cos(a) * 11 * s, 12 * s, Math.sin(a) * 11 * s);
    g.add(col);
  }
  const roof = new THREE.Mesh(new THREE.ConeGeometry(17 * s, 12 * s, 8), mats.gold);
  roof.position.y = 25 * s;
  roof.rotation.y = Math.PI / 8;
  g.add(roof);
  const orb = new THREE.Mesh(new THREE.OctahedronGeometry(2 * s), mats.gold);
  orb.position.y = 33 * s;
  g.add(orb);
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  return g;
}
world.add(pavilion(120, 2, 60, 1.2, 0.5));
world.add(pavilion(-110, 2, -90, 1.0, 2.2));
world.add(pavilion(-40, 2, 140, 0.85, 1.1));
for (const i of [2, 5, 7]) {
  const s = islets[i];
  world.add(pavilion(s.x * 0.98, s.topY + 2, s.z * 0.98, 0.7, i));
}

// ---- ruin spires on the outer islets ----
for (const i of [1, 4, 6]) {
  const s = islets[i];
  const ruin = buildRuinSpire(mats, 34 + (i * 7) % 20, 300 + i);
  ruin.position.set(s.x + s.radius * 0.3, s.topY + 2, s.z - s.radius * 0.25);
  ruin.rotation.y = i * 1.3;
  world.add(ruin);
}

// ---- trees: groves on the main island + every islet ----
{
  const spots = [
    { x: 90, z: -60, r: 90, count: 34, seed: 11, sMin: 0.9, sMax: 1.6 },
    { x: -120, z: 70, r: 80, count: 28, seed: 12, sMin: 0.8, sMax: 1.4 },
    { x: 0, z: -150, r: 60, count: 18, seed: 13, sMin: 0.7, sMax: 1.2 },
  ];
  for (const [idx, s] of islets.entries()) {
    spots.push({ x: s.x, z: s.z, r: s.radius * 0.55, count: 8 + (idx % 3) * 4, seed: 40 + idx, sMin: 0.6, sMax: 1.1 });
  }
  // keep the sanctum plaza clear
  plantTrees(world, mats, spots.filter((sp) => Math.hypot(sp.x, sp.z) > 0 || sp.r < 100));
}

// ---- waterfalls over the rims, dissolving mid-air ----
{
  const wrand = mulberry32(777);
  for (let i = 0; i < 3; i++) {
    const a = 0.6 + i * 2.1;
    waterfallMats.push(buildWaterfall(
      world, Math.cos(a) * CENTRAL_R * 0.96, -4, Math.sin(a) * CENTRAL_R * 0.96,
      a, 16 + wrand() * 10, 300 + wrand() * 80,
    ));
  }
  for (const [idx, s] of islets.entries()) {
    if (idx % 2 === 0) continue;
    const a = s.angle + Math.PI / 2;
    waterfallMats.push(buildWaterfall(
      world, s.x + Math.cos(a) * s.radius * 0.9, s.topY - 2, s.z + Math.sin(a) * s.radius * 0.9,
      a, 9 + wrand() * 6, 190 + wrand() * 60,
    ));
  }
}

// ---- drifting debris + circling birds ----
animated.push(buildDebris(world, mats, 4242));
animated.push(buildBirds(world, 9));

// ---- loop ----
const clock = new THREE.Clock();
let firstFrame = true;
function tick(): void {
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  for (const m of waterfallMats) m.uniforms.uTime.value = t;
  for (const a of animated) a.update(t, dt);
  clouds.rotation.y += dt * 0.0016;
  controls.update();
  renderer.render(scene, camera);
  if (firstFrame) {
    firstFrame = false;
    const fade = document.getElementById('fade')!;
    fade.style.opacity = '0';
  }
}
tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
