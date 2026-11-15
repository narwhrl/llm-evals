import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createMaterials, applyEnvironment } from './materials.js';
import { createBuilder, GROUND_LAYER } from './kit.js';
import { buildBase } from './world/base.js';
import { buildTSpawn } from './world/tSpawn.js';
import { buildASite } from './world/aSite.js';
import { buildMidLane } from './world/midLane.js';
import { buildBSite } from './world/bSite.js';
import { buildCTSpawn } from './world/ctSpawn.js';
import { buildFlanks } from './world/flanks.js';
import { buildWires } from './world/wires.js';
import { createLighting, createSky, createEnvironment } from './lighting.js';
import { createPuddles } from './fx/puddles.js';
import { createWeather } from './fx/weather.js';
import { createPipeline } from './pipeline.js';

const canvas = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: 'high-performance',
  stencil: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a1018, 0.0075);

const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.5, 900);
camera.position.set(28, 27, 30);
camera.layers.enableAll(); // the painted floor and the outline shells live on their own layers

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.62;
controls.zoomSpeed = 0.85;
controls.panSpeed = 0.6;
controls.screenSpacePanning = false;
controls.minDistance = 14;
controls.maxDistance = 96;
controls.minPolarAngle = 0.14;
controls.maxPolarAngle = 1.40;
controls.target.set(0, 0.6, 0);
controls.update();

const LIMIT = 9;
controls.addEventListener('change', () => {
  const t = controls.target;
  t.x = THREE.MathUtils.clamp(t.x, -LIMIT, LIMIT);
  t.y = THREE.MathUtils.clamp(t.y, -1, 4);
  t.z = THREE.MathUtils.clamp(t.z, -LIMIT, LIMIT);
});

// --- world ---------------------------------------------------------------
const materials = createMaterials();
const builder = createBuilder(materials);

buildBase(builder);
buildTSpawn(builder);
buildASite(builder);
buildMidLane(builder);
buildBSite(builder);
buildCTSpawn(builder);
buildFlanks(builder);
buildWires(builder);

const world = builder.build();
scene.add(world);

// the slab and its painted floor sit below the water plane, so they are kept
// out of the reflection pass
for (const name of ['floor', 'slab']) {
  const mesh = world.getObjectByName(name);
  if (mesh) mesh.layers.set(GROUND_LAYER);
}

// --- atmosphere ----------------------------------------------------------
const envMap = createEnvironment(renderer);
scene.environment = envMap;
applyEnvironment(materials, envMap);

const sky = createSky(scene);
const lighting = createLighting(scene, renderer);
const puddles = createPuddles(scene, { width: 900, height: 900 });
const weather = createWeather(scene);

// the reflection camera only sees what stands above the water
const reflectionCamera = puddles.reflector.getReflectionCamera(camera);
reflectionCamera.layers.set(0);

// --- shutter vibration ---------------------------------------------------
const shutter = world.getObjectByName('shutter');
const shutterBase = shutter ? shutter.position.clone() : null;
let shake = 0;
let shakePhase = 0;

const pipeline = createPipeline(renderer, scene, camera);

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  pipeline.setSize(w, h);
}
window.addEventListener('resize', resize);
resize();

let last = performance.now();

function frame(now) {
  const rawDt = (now - last) / 1000;
  const dt = Math.min(rawDt, 0.05);
  last = now;
  const t = now / 1000;

  controls.update();

  const flash = weather.update(t, Math.min(rawDt, 0.25));
  if (flash > 0.02) lighting.strike(flash);
  lighting.update(t, dt);
  sky.update(lighting.flash);
  puddles.update(t);

  if (shutter) {
    if (Math.random() < dt * 0.5) {
      shake = 0.03 + Math.random() * 0.035;
      shakePhase = Math.random() * 10;
    }
    shake *= Math.exp(-dt * 7);
    shutter.position.x = shutterBase.x + Math.sin(t * 62 + shakePhase) * shake;
  }

  // water running down walls and sheet metal
  materials.streak.map.offset.y = (t * 0.12) % 1;

  pipeline.render(t);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

document.addEventListener('visibilitychange', () => { last = performance.now(); });
