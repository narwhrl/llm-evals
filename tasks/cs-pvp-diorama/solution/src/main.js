import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import './style.css';
import { createMaterials } from './scene/materials.js';
import { buildWorld } from './scene/world.js';
import { createWeather } from './scene/weather.js';

const app = document.querySelector('#app');
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.28;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;
app.appendChild(renderer.domElement);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 120);
camera.position.set(34, 30, 37);
camera.zoom = 1;
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.3, -0.25);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.78;
controls.minZoom = 0.7;
controls.maxZoom = 2.35;
controls.minPolarAngle = 0.38;
controls.maxPolarAngle = 1.23;
controls.update();

const pmrem = new THREE.PMREMGenerator(renderer);
const roomEnvironment = new RoomEnvironment();
const environmentTarget = pmrem.fromScene(roomEnvironment, 0.04);
scene.environment = environmentTarget.texture;
scene.environmentIntensity = 0.78;
roomEnvironment.dispose();
pmrem.dispose();

const materials = createMaterials();
const diorama = buildWorld(scene, materials);
const weather = createWeather(
  scene,
  diorama.world,
  materials,
  diorama.lights,
  diorama.regions,
);

const outlineEffect = new OutlineEffect(renderer, {
  defaultThickness: 0.0024,
  defaultColor: [0.012, 0.022, 0.03],
  defaultAlpha: 0.9,
  defaultKeepAlive: true,
});
outlineEffect.setSize(window.innerWidth, window.innerHeight);

function updateCamera() {
  const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
  const frustumHeight = 32.8;
  camera.left = -frustumHeight * aspect * 0.5;
  camera.right = frustumHeight * aspect * 0.5;
  camera.top = frustumHeight * 0.5;
  camera.bottom = -frustumHeight * 0.5;
  camera.updateProjectionMatrix();
}
updateCamera();

function resize() {
  const width = window.innerWidth;
  const height = Math.max(window.innerHeight, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(width, height);
  outlineEffect.setSize(width, height);
  updateCamera();
}
window.addEventListener('resize', resize, { passive: true });

renderer.domElement.addEventListener('contextmenu', (event) => event.preventDefault());
renderer.domElement.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  renderer.setAnimationLoop(null);
});

const clock = new THREE.Clock();
let elapsed = 0;
let firstFrame = true;
renderer.setAnimationLoop(() => {
  const delta = Math.min(clock.getDelta(), 0.05);
  elapsed += delta;
  controls.update();
  diorama.update(elapsed, delta);
  weather.update(elapsed, delta);
  outlineEffect.render(scene, camera);

  if (firstFrame) {
    firstFrame = false;
    renderer.shadowMap.autoUpdate = false;
  }
});
