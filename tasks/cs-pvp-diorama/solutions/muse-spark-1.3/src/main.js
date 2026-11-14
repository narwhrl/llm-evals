import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildWorld } from './world.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0e16);
scene.fog = new THREE.FogExp2(0x0a0e16, 0.0072);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(36, 32, 46);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.minDistance = 16;
controls.maxDistance = 130;
controls.maxPolarAngle = 1.45;

// ---- global lights ----
scene.add(new THREE.HemisphereLight(0x3d4f73, 0x0b0d12, 1.05));
const moon = new THREE.DirectionalLight(0x8fb0ff, 0.9);
moon.position.set(-24, 38, 12);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -40;
moon.shadow.camera.right = 40;
moon.shadow.camera.top = 40;
moon.shadow.camera.bottom = -40;
moon.shadow.camera.far = 120;
moon.shadow.bias = -0.0004;
scene.add(moon);
const lightning = new THREE.DirectionalLight(0xcfe0ff, 0);
lightning.position.set(20, 40, -30);
scene.add(lightning);

const { tickers } = buildWorld(scene);

// lightning scheduler: brief double-pulse every 9–16 s
let nextBolt = 6;
let boltT = -1;
function lightningTick(t) {
  if (t > nextBolt) {
    boltT = 0;
    nextBolt = t + 9 + Math.random() * 7;
  }
  if (boltT >= 0) {
    boltT += 1 / 60;
    const k = boltT;
    const env = Math.max(0, Math.sin(k * 18) * Math.exp(-k * 3));
    lightning.intensity = env * 5;
    scene.background.setHex(0x0a0e16).lerp(new THREE.Color(0x3a4a66), Math.min(1, env * 0.7));
    if (k > 2) {
      boltT = -1;
      lightning.intensity = 0;
      scene.background.setHex(0x0a0e16);
    }
  }
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const t = clock.elapsedTime;
  for (const fn of tickers) fn(t, dt);
  lightningTick(t);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// hook for automated inspection
window.__diorama = {
  camera,
  controls,
  setView(px, py, pz, tx = 0, ty = 1.5, tz = 0) {
    camera.position.set(px, py, pz);
    controls.target.set(tx, ty, tz);
    controls.update();
  },
};
