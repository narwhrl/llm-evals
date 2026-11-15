import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';
import * as L from './layout.js';
import { makeGlowTexture } from './utils.js';
import { createTextures } from './textures.js';
import { buildWorld } from './world.js';
import { createTrain } from './train.js';

const DEFAULT_SPEED = 8;
const DWELL_SECONDS = 2.0;
const INITIAL_CAMERA = new THREE.Vector3(58, 56, 64);
const INITIAL_TARGET = new THREE.Vector3(0, -0.5, 0);
const STATION_DIST = L.STATION_U * L.TRACK_LENGTH;

const diag = document.getElementById('diag');
const stateEl = document.getElementById('state');
window.addEventListener('error', (e) => {
  diag.textContent += `ERR: ${e.message} | `;
  console.error(e);
});
window.addEventListener('unhandledrejection', (e) => {
  diag.textContent += `REJ: ${e.reason} | `;
  console.error(e);
});

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (err) {
  diag.textContent += `FATAL: WebGL unavailable (${err.message}) | `;
  throw err;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('scene').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 600);
camera.position.copy(INITIAL_CAMERA);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(INITIAL_TARGET);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enablePan = false;
controls.rotateSpeed = 0.7;
controls.zoomSpeed = 0.9;
controls.minDistance = 42;
controls.maxDistance = 175;
controls.minPolarAngle = 0.16;
controls.maxPolarAngle = Math.PI / 2 - 0.045;
controls.update();

/* ------------------------------------------------------------ lighting --- */

const sun = new THREE.DirectionalLight(0xffc184, 2.6);
sun.position.set(-46, 38, 26);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -48;
sun.shadow.camera.right = 48;
sun.shadow.camera.top = 48;
sun.shadow.camera.bottom = -48;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 180;
sun.shadow.bias = -0.00035;
sun.shadow.normalBias = 0.025;
sun.target.position.set(0, 0, 0);
scene.add(sun, sun.target);

const ambient = new THREE.AmbientLight(0xffe0bd, 0.55);
scene.add(ambient);
const hemi = new THREE.HemisphereLight(0xffd9a8, 0x4a3a28, 0.6);
scene.add(hemi);
const fill = new THREE.DirectionalLight(0xa9c2e6, 0.18);
fill.position.set(42, 30, -34);
scene.add(fill);

const C = {
  daySun: new THREE.Color(0xffc184), nightSun: new THREE.Color(0x8fa8d8),
  dayAmb: new THREE.Color(0xffe0bd), nightAmb: new THREE.Color(0x4a5c86),
  daySky: new THREE.Color(0xffd9a8), nightSky: new THREE.Color(0x33456b),
  dayGround: new THREE.Color(0x4a3a28), nightGround: new THREE.Color(0x1a1f2e),
};

function updateLighting(mix) {
  sun.color.copy(C.daySun).lerp(C.nightSun, mix);
  sun.intensity = 2.6 + (0.45 - 2.6) * mix;
  ambient.color.copy(C.dayAmb).lerp(C.nightAmb, mix);
  ambient.intensity = 0.55 + (0.38 - 0.55) * mix;
  hemi.color.copy(C.daySky).lerp(C.nightSky, mix);
  hemi.groundColor.copy(C.dayGround).lerp(C.nightGround, mix);
  hemi.intensity = 0.6 + (0.45 - 0.6) * mix;
  fill.intensity = 0.18 + mix * 0.42;
}

/* --------------------------------------------------------------- world --- */

const T = createTextures();
const glowTex = makeGlowTexture();
const world = buildWorld(scene, T, glowTex);
const train = createTrain(glowTex);
scene.add(train.group);

/* --------------------------------------------------------------- state --- */

const stationKey = (d) => Math.floor((d - STATION_DIST) / L.TRACK_LENGTH);

const state = {
  playing: true,
  speed: DEFAULT_SPEED,
  nightTarget: 0,
  nightMix: 0,
  distance: L.START_U * L.TRACK_LENGTH,
  dwelling: false,
  dwellRemaining: 0,
  dwellCount: 0,
  prevK: 0,
};
state.prevK = stationKey(state.distance);

const playBtn = document.getElementById('btn-play');
const nightBtn = document.getElementById('btn-night');
const resetBtn = document.getElementById('btn-reset');
const speedInput = document.getElementById('speed');
const speedVal = document.getElementById('speed-val');
const statusEl = document.getElementById('status');

function refreshUI() {
  playBtn.innerHTML = state.playing ? '&#10074;&#10074; Pause' : '&#9654; Run';
  nightBtn.innerHTML = state.nightTarget ? '&#9728; Day' : '&#9789; Night';
  speedInput.value = String(state.speed);
  speedVal.textContent = `${(state.speed / DEFAULT_SPEED).toFixed(1)}\u00d7`;
  document.body.classList.toggle('night', state.nightTarget === 1);
  if (!state.playing) statusEl.textContent = 'Paused';
  else if (state.dwelling) statusEl.textContent = 'At station';
  else statusEl.textContent = 'Running';
}

playBtn.addEventListener('click', () => {
  state.playing = !state.playing;
  refreshUI();
});
nightBtn.addEventListener('click', () => {
  state.nightTarget = state.nightTarget ? 0 : 1;
  refreshUI();
});
speedInput.addEventListener('input', () => {
  state.speed = parseFloat(speedInput.value);
  refreshUI();
});

function reset() {
  state.distance = L.START_U * L.TRACK_LENGTH;
  state.prevK = stationKey(state.distance);
  state.dwelling = false;
  state.dwellRemaining = 0;
  state.dwellCount = 0;
  state.speed = DEFAULT_SPEED;
  state.playing = true;
  state.nightTarget = 0;
  state.nightMix = 0;

  // OrbitControls keeps its own spherical delta; flush it before restoring
  // the camera or the next update() would drag the view away again.
  controls.enableDamping = false;
  controls.update();
  camera.position.copy(INITIAL_CAMERA);
  controls.target.copy(INITIAL_TARGET);
  controls.update();
  controls.enableDamping = true;

  updateLighting(0);
  world.setNight(0);
  train.setNight(0);
  train.update(state.distance);
  refreshUI();
}
resetBtn.addEventListener('click', reset);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.__diorama = {
  state,
  reset,
  camera,
  controls,
  info: () => ({
    trackLength: L.TRACK_LENGTH,
    bridgeCount: L.BRIDGE_CENTERS.length,
    stationU: L.STATION_U,
    carCount: train.carCount,
    plotCount: world.plotCount,
    camera: camera.position.toArray().map((v) => +v.toFixed(2)),
    target: controls.target.toArray().map((v) => +v.toFixed(2)),
    cars: train.cars.map((c) => c.group.position.toArray().map((v) => +v.toFixed(2))),
  }),
};

/* ---------------------------------------------------------------- loop --- */

updateLighting(0);
train.update(state.distance);
refreshUI();

let last = performance.now();
let frames = 0;
let readyMarked = false;
let uiTick = 0;

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  // Keep simulation time tied to real time even when a software renderer
  // only manages a few frames per second; the bound still guards tab switches.
  const dtReal = Math.min((now - last) / 1000, 0.35);
  last = now;
  const dt = state.playing ? dtReal : 0;

  state.nightMix += (state.nightTarget - state.nightMix) * Math.min(1, dtReal * 2.6);
  if (Math.abs(state.nightTarget - state.nightMix) < 0.002) state.nightMix = state.nightTarget;
  updateLighting(state.nightMix);
  world.setNight(state.nightMix);
  train.setNight(state.nightMix);

  if (dt > 0) {
    if (state.dwelling) {
      state.dwellRemaining -= dt;
      if (state.dwellRemaining <= 0) {
        state.dwelling = false;
        state.dwellRemaining = 0;
      }
    } else {
      state.distance += state.speed * dt;
      const k = stationKey(state.distance);
      if (k > state.prevK) {
        state.distance = STATION_DIST + k * L.TRACK_LENGTH;
        state.dwelling = true;
        state.dwellRemaining = DWELL_SECONDS;
        state.dwellCount++;
      }
      state.prevK = k;
    }
    world.waterMap.offset.y += dt * 0.012;
  }

  train.update(state.distance);
  controls.update();
  renderer.render(scene, camera);

  frames++;
  if (uiTick++ % 8 === 0) refreshUI();
  if (!readyMarked && frames >= 3) {
    readyMarked = true;
    diag.dataset.ready = 'true';
    diag.textContent += `READY calls=${renderer.info.render.calls} triangles=${renderer.info.render.triangles} | `;
  }
  if (frames % 6 === 0) {
    stateEl.textContent = JSON.stringify({
      ready: readyMarked,
      playing: state.playing,
      speed: state.speed,
      night: state.nightTarget,
      nightMix: +state.nightMix.toFixed(2),
      dwelling: state.dwelling,
      dwellRemaining: +state.dwellRemaining.toFixed(2),
      dwellCount: state.dwellCount,
      distance: +state.distance.toFixed(1),
      laps: +(state.distance / L.TRACK_LENGTH).toFixed(2),
      cars: train.cars.map((c) => {
        const p = c.group.position;
        return [+p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2)];
      }),
    });
  }
}

animate();
