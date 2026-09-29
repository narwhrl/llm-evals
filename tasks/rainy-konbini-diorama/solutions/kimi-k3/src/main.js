// Rainy Konbini Diorama — entry point.
// Third-person miniature: orbit/zoom a rainy night konbini street corner.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildGround } from './ground.js';
import { buildStore, STORE } from './store.js';
import { buildInterior } from './interior.js';
import { buildProps } from './props.js';
import { makeRain, makeDrips, makeRipples, makeGlassRunoff, makeTrafficSignal } from './effects.js';

const FOG_COLOR = 0x0d1526;

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// ---------- scene / atmosphere ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(FOG_COLOR);
scene.fog = new THREE.FogExp2(FOG_COLOR, 0.0075);

// soft env reflections for wet surfaces
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.06;

// ---------- camera & controls ----------
const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.set(17, 11, 25);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-1, 1.5, 2);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 8;
controls.maxDistance = 70;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
controls.update();

// ---------- lights (cool night base; warm store lights live in interior.js) ----------
const hemi = new THREE.HemisphereLight(0x50628f, 0x252a3c, 1.9);
scene.add(hemi);
const moon = new THREE.DirectionalLight(0x9db8e8, 1.5);
moon.position.set(18, 30, -12);
scene.add(moon);
// cool spill from storefront onto wet sidewalk
const spill = new THREE.PointLight(0xbfe0f0, 26, 15, 2);
spill.position.set(-4.5, 3.4, 4.2);
scene.add(spill);

// ---------- build world ----------
const ground = buildGround(scene);
const store = buildStore(scene);
const interior = buildInterior(scene);
const props = buildProps(scene);

// ---------- effects ----------
const rain = makeRain(scene);
const drips = makeDrips(scene, {
  x0: store.awningX[0], x1: store.awningX[1],
  y: store.awningLipY - 0.05, z: store.awningLipZ,
});
const ripples = makeRipples(scene, ground.puddles);
const runoff = makeGlassRunoff(scene);
const signal = makeTrafficSignal(scene);

// ---------- animated state ----------
const state = {
  t: 0,
  doorOpen: 0,       // 0 closed .. 1 open
  doorTimer: 3.0,    // countdown: opens when it crosses 1.2
  doorHold: 0,
  doorAuto: true,
  flicker: 1,        // sign flicker multiplier
};

function updateDoor(dt) {
  if (!state.doorAuto) return; // scripted control via setDoor()
  if (state.doorHold > 0) {
    state.doorHold -= dt;
    if (state.doorHold <= 0) state.doorTimer = 4 + Math.random() * 6;
    return;
  }
  state.doorTimer -= dt;
  if (state.doorTimer <= 0) state.doorHold = 1.6 + Math.random() * 1.8;
  const target = (state.doorTimer < 1.2 || state.doorHold > 0) ? 1 : 0;
  state.doorOpen += (target - state.doorOpen) * Math.min(1, dt * 4.5);
  store.doorL.position.x = -4.5 - 0.7 - state.doorOpen * 1.1;
  store.doorR.position.x = -4.5 + 0.7 + state.doorOpen * 1.1;
}

function updateFlicker(dt) {
  // mostly steady, occasional dips
  if (Math.random() < dt * 0.7) {
    state.flicker = 0.72 + Math.random() * 0.28;
  } else {
    state.flicker += (1 - state.flicker) * Math.min(1, dt * 9);
  }
  store.signMesh.material.color.setScalar(0.72 + 0.28 * state.flicker);
  store.signGlow.material.opacity = 0.16 * state.flicker;
  store.openSign.material.opacity = 0.75 + 0.25 * state.flicker;
}

// ---------- debug / verification hooks (not UI) ----------
window.__DIORAMA__ = {
  scene, camera, controls, renderer,
  stats() {
    let meshes = 0, tris = 0;
    scene.traverse((o) => {
      if (o.isMesh) { meshes++; const g = o.geometry; if (g?.index) tris += g.index.count / 3; else if (g?.attributes?.position) tris += g.attributes.position.count / 3; }
    });
    return { meshes, tris: Math.round(tris), t: state.t, doorOpen: state.doorOpen };
  },
  setView(px, py, pz, tx = -1.5, ty = 2.2, tz = 1.0) {
    camera.position.set(px, py, pz);
    controls.target.set(tx, ty, tz);
    controls.update();
    renderer.render(scene, camera);
  },
  step(n = 1, dt = 1 / 60) {
    for (let i = 0; i < n; i++) tick(dt);
    renderer.render(scene, camera);
  },
  // Deterministic door control for verification: 'open' | 'closed' | 'auto'
  setDoor(mode) {
    if (mode === 'open') { state.doorAuto = false; state.doorOpen = 1; }
    else if (mode === 'closed') { state.doorAuto = false; state.doorOpen = 0; }
    else { state.doorAuto = true; state.doorTimer = 2.0; state.doorHold = 0; }
    store.doorL.position.x = -4.5 - 0.7 - state.doorOpen * 1.1;
    store.doorR.position.x = -4.5 + 0.7 + state.doorOpen * 1.1;
    renderer.render(scene, camera);
  },
};

// ---------- main loop ----------
const camQuat = new THREE.Quaternion();
function tick(dt) {
  state.t += dt;
  camera.getWorldQuaternion(camQuat);
  rain.update(dt, camQuat);
  drips.update(dt);
  ripples.update(dt);
  runoff.update(state.t);
  signal.update(dt);
  updateDoor(dt);
  updateFlicker(dt);
}
renderer.setAnimationLoop(() => {
  tick(Math.min(0.05, renderer.info.render.frame === 0 ? 1 / 60 : clockDelta()));
  controls.update();
  renderer.render(scene, camera);
});
let lastT = performance.now();
function clockDelta() {
  const now = performance.now();
  const d = (now - lastT) / 1000;
  lastT = now;
  return d;
}

// render one frame synchronously so a screenshot at load is meaningful
tick(1 / 60);
renderer.render(scene, camera);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
