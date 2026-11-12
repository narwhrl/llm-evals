import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildTrackCurve, RIVER } from './track.js';
import { createMaterials } from './materials.js';
import { buildTown } from './town.js';
import { Train } from './train.js';

const app = document.getElementById('app');

// ---------------------------------------------------------------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// ---------------------------------------------------------------- camera
const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.5, 400);
const INIT_CAM = new THREE.Vector3(46, 42, 52);
const INIT_TARGET = new THREE.Vector3(0, -1, 0);
camera.position.copy(INIT_CAM);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(INIT_TARGET);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 22;
controls.maxDistance = 140;
controls.maxPolarAngle = Math.PI / 2 - 0.08;
controls.update();
controls.saveState();

// ---------------------------------------------------------------- lights
const hemi = new THREE.HemisphereLight(0xffd9b0, 0x4a4038, 0.55);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffb36b, 2.6);
sun.position.set(-38, 26, 34);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -52;
sun.shadow.camera.right = 52;
sun.shadow.camera.top = 44;
sun.shadow.camera.bottom = -44;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 140;
sun.shadow.bias = -0.0006;
sun.shadow.normalBias = 0.03;
scene.add(sun);

const fill = new THREE.DirectionalLight(0x8fa3c0, 0.25);
fill.position.set(30, 18, -30);
scene.add(fill);

// night extras, intensity 0 by day
const lampLights = [];
function addLampLight(x, y, z) {
  const l = new THREE.PointLight(0xffc684, 0, 13, 2);
  l.position.set(x, y, z);
  scene.add(l);
  lampLights.push(l);
}

// ---------------------------------------------------------------- world
const materials = createMaterials();
const curve = buildTrackCurve();
const town = buildTown(curve, materials);
scene.add(town.root);

// station approach point on the loop (u of the platform centre)
const stationU = (() => {
  const target = new THREE.Vector3(-16.5, 0, -12.9);
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < 2000; i++) {
    const u = i / 2000;
    const d = curve.getPointAt(u).distanceTo(target);
    if (d < bestD) {
      bestD = d;
      best = u;
    }
  }
  return best;
})();
const stationS = stationU * curve.getLength();

const train = new Train(curve, stationS);
scene.add(train.group);

// lamp point lights (a subset, enough to sell the night)
for (const lp of town.lampPositions) addLampLight(lp.x + 0.3, lp.y + 0.15, lp.z);
const stationLight = new THREE.PointLight(0xffd0a0, 0, 12, 2);
stationLight.position.set(-16.5, 2.2, -14.2);
scene.add(stationLight);
lampLights.push(stationLight);

// ---------------------------------------------------------------- sky modes
const skyDay = new THREE.Color(0xffc9a0);
const skyNight = new THREE.Color(0x12162e);
const fogDay = new THREE.Color(0xf2b183);
const fogNight = new THREE.Color(0x0d1020);
scene.fog = new THREE.Fog(fogDay.clone(), 90, 240);
scene.background = skyDay.clone();

let night = false;
let nightMix = 0; // animated 0..1

function applySky(mix) {
  scene.background.copy(skyDay).lerp(skyNight, mix);
  scene.fog.color.copy(fogDay).lerp(fogNight, mix);
  hemi.intensity = THREE.MathUtils.lerp(0.55, 0.12, mix);
  hemi.color.setHex(0xffd9b0).lerp(new THREE.Color(0x24304f), mix);
  sun.intensity = THREE.MathUtils.lerp(2.6, 0.18, mix);
  sun.color.setHex(0xffb36b).lerp(new THREE.Color(0x9aa8d8), mix);
  fill.intensity = THREE.MathUtils.lerp(0.25, 0.35, mix);
  materials.water.emissiveIntensity = THREE.MathUtils.lerp(0.15, 0.05, mix);
  const glow = THREE.MathUtils.lerp(0, 1, mix);
  materials.lampBulb.emissiveIntensity = glow * 2.4;
  for (const m of town.nightMats) m.emissiveIntensity = glow * 0.9;
  train.locoLampMat.emissiveIntensity = glow * 1.6;
  materials.beacon.emissiveIntensity = 0.35 + glow * 1.8;
  for (const l of lampLights) l.intensity = glow * 6.5;
}
applySky(0);

// ---------------------------------------------------------------- UI
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const nightBtn = document.getElementById('nightBtn');
const speedInput = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');

let running = true;
let speedFactor = 1;
const DEFAULT_SPEED_FACTOR = 1;

runBtn.addEventListener('click', () => {
  running = !running;
  runBtn.textContent = running ? 'Pause' : 'Run';
  runBtn.classList.toggle('active', !running);
});

resetBtn.addEventListener('click', () => {
  // flush residual damping deltas so the restore is exact
  controls.enableDamping = false;
  controls.update(); // flush pending orbit/zoom deltas before restoring
  controls.reset();
  controls.enableDamping = true;
  train.reset();
  speedFactor = DEFAULT_SPEED_FACTOR;
  speedInput.value = String(DEFAULT_SPEED_FACTOR);
  speedValue.textContent = '1.00\u00d7';
});

nightBtn.addEventListener('click', () => {
  night = !night;
  nightBtn.textContent = night ? 'Day' : 'Night';
  nightBtn.classList.toggle('active', night);
});

speedInput.addEventListener('input', () => {
  speedFactor = parseFloat(speedInput.value);
  speedValue.textContent = speedFactor.toFixed(2) + '\u00d7';
});

// ---------------------------------------------------------------- resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------- loop
const clock = new THREE.Clock();
const waterBase = RIVER.waterY;
let time = 0;

// deterministic state presets for verification builds, e.g. ?night=1&ff=8
const params = new URLSearchParams(location.search);
if (params.get('night') === '1') {
  night = true;
  nightMix = 1;
  applySky(1);
  nightBtn.textContent = 'Day';
  nightBtn.classList.add('active');
}
if (params.get('paused') === '1') {
  running = false;
  runBtn.textContent = 'Run';
  runBtn.classList.add('active');
}
if (params.get('speed')) {
  speedFactor = parseFloat(params.get('speed'));
  speedInput.value = String(speedFactor);
  speedValue.textContent = speedFactor.toFixed(2) + '×';
}
{
  const ff = parseFloat(params.get('ff') || '0');
  if (ff > 0) {
    // advance the train in fixed steps so dwell logic still applies
    const step = 1 / 60;
    for (let t = 0; t < ff; t += step) train.update(step * speedFactor);
  }
}

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.1);
  time += dt;

  // ease day/night transition
  const target = night ? 1 : 0;
  if (nightMix !== target) {
    nightMix = THREE.MathUtils.clamp(nightMix + (target > nightMix ? dt : -dt) * 1.6, 0, 1);
    applySky(nightMix);
  }

  if (running) train.update(dt * speedFactor);
  else train.update(0);

  // gentle water shimmer
  materials.water.opacity = 0.8 + Math.sin(time * 1.4) * 0.04;

  controls.update();
  renderer.render(scene, camera);
});

// expose for automated checks (harmless in production)
window.__diorama = { scene, camera, controls, train, renderer };
