import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initMaterials, WATER_TIME } from './core/materials.js';
import { Kit } from './core/kit.js';
import { ANIMATED } from './fx/registry.js';
import { lightGroup, updateLights } from './fx/lights.js';
import { createEnvironment, FLASH } from './fx/environment.js';
import { createWater } from './fx/water.js';
import { createPrecipitation, PX } from './fx/precipitation.js';
import { createPipeline } from './render/pipeline.js';
import { buildBase, HALF } from './map/base.js';
import { buildTSpawn, buildCTSpawn } from './map/spawns.js';
import { buildASite } from './map/asite.js';
import { buildMid } from './map/mid.js';
import { buildBlocks } from './map/blocks.js';
import { buildBSite } from './map/bsite.js';
import { buildRoutes } from './map/routes.js';

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.setClearColor(0x05080e, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 900);
camera.layers.enableAll();

initMaterials();
const env = createEnvironment(scene);

const kit = new Kit();
const dynamic = new THREE.Group();
dynamic.name = 'dynamic';
buildBase(kit);
buildTSpawn(kit);
buildCTSpawn(kit);
buildASite(kit, dynamic);
buildMid(kit);
buildBlocks(kit);
buildBSite(kit);
buildRoutes(kit, dynamic);
const world = kit.build('diorama');
scene.add(world, dynamic, lightGroup);

const water = createWater(scene, HALF);
const precip = createPrecipitation(scene, HALF - 0.8);
const pipeline = createPipeline(renderer, scene, camera);

// Orbit around the base; the target stays over the plinth and the camera above the deck.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 14;
controls.maxDistance = 150;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = 1.38;
controls.screenSpacePanning = false;
controls.target.set(0, 1.5, 1);
camera.position.set(52, 64, 72);
controls.update();
const limit = HALF - 4;
controls.addEventListener('change', () => {
  const t = controls.target;
  t.x = THREE.MathUtils.clamp(t.x, -limit, limit);
  t.z = THREE.MathUtils.clamp(t.z, -limit, limit);
  t.y = THREE.MathUtils.clamp(t.y, 0, 8);
});

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  const px = pipeline.resize();
  water.resize(px.w, px.h);
  PX.value = px.h / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
}
window.addEventListener('resize', resize);
resize();

let time = 0;
let last = performance.now();
function step(dt) {
  time += dt;
  WATER_TIME.value = time;
  env.update(time);
  updateLights(time, FLASH.value);
  precip.update(time);
  for (const fn of ANIMATED) fn(time, dt);
}

function frame() {
  const now = performance.now();
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  step(dt);
  controls.update();
  pipeline.render();
}

// Shadows are baked once: nothing that casts them moves.
renderer.shadowMap.needsUpdate = true;
step(0.016);
pipeline.render();
document.body.dataset.ready = '1';
renderer.setAnimationLoop(() => frame());

// Verification hooks for automated capture (no visible UI).
window.__diorama = {
  renderer, scene, camera, controls,
  step(n = 1, dt = 1 / 60) {
    for (let i = 0; i < n; i++) step(dt);
    controls.update();
    pipeline.render();
    return time;
  },
  bench(n = 30) {
    const t0 = performance.now();
    for (let i = 0; i < n; i++) pipeline.render();
    renderer.getContext().finish();
    return (performance.now() - t0) / n;
  },
};
