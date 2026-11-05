import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import './style.css';
import { TRACK, TRAIN, planTown } from './layout.js';
import { createTrainMotion } from './motion.js';
import { Kit, createMaterials } from './kit.js';
import { building } from './buildings.js';
import { buildLandmarks } from './landmarks.js';
import { buildTrees, buildPools } from './trees.js';
import { buildTrack } from './track.js';
import { buildBase, namePlate, buildTerrain, buildWater, buildTable, buildSky } from './board.js';
import { createTrain } from './train.js';
import { createLighting } from './lighting.js';

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 1500);

// ---------- scene ----------
const materials = createMaterials();
const plan = planTown();
const kit = new Kit();
buildBase(kit);
for (const b of plan.buildings) building(kit, b);
const { signs, pools } = buildLandmarks(kit, plan);
const track = buildTrack(kit);
const water = buildWater();
const sky = buildSky();
const poolMesh = buildPools(pools);
scene.add(kit.build(materials), namePlate(), buildTerrain(), water, buildTable(), sky, buildTrees(plan.trees), poolMesh, track.group, ...signs);

const train = createTrain(materials);
scene.add(train.group);
const motion = createTrainMotion({ length: TRACK.length, ...TRAIN });

// ---------- post-processing ----------
const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
composer.setPixelRatio(renderer.getPixelRatio());
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.55, 0.92);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const applyLighting = createLighting({ scene, renderer, sky, materials, pools: poolMesh, signs, headlight: train.headlight, bloom });

// ---------- camera ----------
const HOME = { target: new THREE.Vector3(0.4, -0.9, 0.6), polar: THREE.MathUtils.degToRad(55), azimuth: THREE.MathUtils.degToRad(33) };
const controls = new OrbitControls(camera, canvas);
Object.assign(controls, {
  enableDamping: true,
  dampingFactor: 0.08,
  rotateSpeed: 0.6,
  zoomSpeed: 0.9,
  minDistance: 10,
  minPolarAngle: THREE.MathUtils.degToRad(8),
  maxPolarAngle: THREE.MathUtils.degToRad(80),
  maxTargetRadius: 16,
});

// Smallest distance at which the whole base fits the viewport with a margin.
function fitDistance() {
  const pts = [];
  for (const x of [-20.2, 20.2]) for (const z of [-14.2, 14.2]) for (const y of [-2.75, 2]) pts.push(new THREE.Vector3(x, y, z));
  pts.push(new THREE.Vector3(10.6, 4.1, -3.3), new THREE.Vector3(-4.9, 3.3, -6.4));
  const probe = camera.clone();
  const sph = new THREE.Spherical(0, HOME.polar, HOME.azimuth);
  const v = new THREE.Vector3();
  let lo = 20;
  let hi = 400;
  for (let i = 0; i < 40; i++) {
    sph.radius = (lo + hi) / 2;
    probe.position.setFromSpherical(sph).add(HOME.target);
    probe.lookAt(HOME.target);
    probe.updateMatrixWorld();
    const fits = pts.every((p) => {
      v.copy(p).project(probe);
      return Math.abs(v.x) < 0.93 && Math.abs(v.y) < 0.9;
    });
    if (fits) hi = sph.radius;
    else lo = sph.radius;
  }
  return hi;
}

function resetCamera() {
  const r = fitDistance();
  controls.maxDistance = r * 1.7;
  // Flush damping momentum first so the restored pose is exact.
  controls.enableDamping = false;
  controls.update();
  camera.position.setFromSpherical(new THREE.Spherical(r, HOME.polar, HOME.azimuth)).add(HOME.target);
  controls.target.copy(HOME.target);
  controls.update();
  controls.enableDamping = true;
}

// ---------- state & UI ----------
const ui = {
  toggle: document.getElementById('toggle'),
  reset: document.getElementById('reset'),
  speed: document.getElementById('speed'),
  speedValue: document.getElementById('speedValue'),
  status: document.getElementById('status'),
  modes: [...document.querySelectorAll('[data-night]')],
};
let paused = false;
let speed = 1;
let night = 0;
let nightTarget = 0;

function setPaused(p) {
  paused = p;
  ui.toggle.textContent = p ? '运行' : '暂停';
  ui.toggle.setAttribute('aria-pressed', String(p));
}
function setSpeed(s) {
  speed = s;
  ui.speed.value = String(s);
  ui.speedValue.textContent = `${s.toFixed(2)}×`;
}
function setNight(n) {
  nightTarget = n;
  for (const b of ui.modes) b.setAttribute('aria-pressed', String(Number(b.dataset.night) === n));
}
function reset() {
  motion.reset();
  setSpeed(1);
  setPaused(false);
  train.reset(motion.state);
  track.crossing.reset(motion.state.s);
  resetCamera();
}

ui.toggle.addEventListener('click', () => setPaused(!paused));
ui.reset.addEventListener('click', reset);
ui.speed.addEventListener('input', () => setSpeed(Number(ui.speed.value)));
for (const b of ui.modes) b.addEventListener('click', () => setNight(Number(b.dataset.night)));
window.addEventListener('keydown', (e) => {
  if (e.repeat || e.target instanceof HTMLInputElement) return;
  if (e.code === 'Space') {
    e.preventDefault();
    setPaused(!paused);
  } else if (e.code === 'KeyR') reset();
  else if (e.code === 'KeyN') setNight(nightTarget ? 0 : 1);
});

let lastStatus = '';
function updateStatus() {
  const { phase, dwellLeft } = motion.state;
  const left = `停靠剩余 ${Math.max(0, dwellLeft).toFixed(1)} 秒`;
  let text = phase === 'dwell' ? `柳河站 · ${left}` : '行驶中';
  if (paused) text = phase === 'dwell' ? `已暂停 · ${left}` : '已暂停';
  if (text !== lastStatus) ui.status.textContent = lastStatus = text;
}

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
});

// ---------- loop ----------
reset();
applyLighting(night);
const timer = new THREE.Timer();
renderer.setAnimationLoop((time) => {
  timer.update(time);
  const dt = Math.min(timer.getDelta(), 0.1);
  const simDt = paused ? 0 : dt;
  if (!paused) motion.update(dt, speed);
  train.update(motion.state, simDt);
  track.crossing.update(motion.state.s, simDt);
  water.material.normalMap.offset.y -= dt * 0.04;
  if (night !== nightTarget) {
    night += Math.sign(nightTarget - night) * Math.min(Math.abs(nightTarget - night), dt / 1.2);
    applyLighting(night);
  }
  controls.update(dt);
  composer.render(dt);
  updateStatus();
});
document.getElementById('loading').remove();

// Development-only handle for automated checks; stripped from production builds.
if (import.meta.env.DEV) window.__diorama = { motion, camera, controls, isPaused: () => paused };
