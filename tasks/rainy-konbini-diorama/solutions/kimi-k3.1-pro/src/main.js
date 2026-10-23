import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildStore } from './store.js';
import { buildStreet } from './street.js';
import { buildEffects } from './effects.js';
import './style.css';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setClearColor(0x080e1b, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x111a30, 0.0045);
const world = new THREE.Group();
world.name = 'AOI rainy-night miniature';
scene.add(world);

const updateStreet = buildStreet(world);
const store = buildStore(world);
const updateEffects = buildEffects(world);

const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 180);
camera.position.set(35, 29, 39);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1.0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.rotateSpeed = 0.65;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.6;
controls.minDistance = 18;
controls.maxDistance = 82;
controls.minPolarAngle = 0.18;
controls.maxPolarAngle = Math.PI / 2 - 0.065;
controls.zoomToCursor = true;
controls.update();

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);

const clock = new THREE.Clock();
let elapsed = 0;
renderer.setAnimationLoop(() => {
  const delta = Math.min(clock.getDelta(), 0.05);
  elapsed += delta;
  controls.update(delta);
  store.update(elapsed);
  updateStreet(elapsed);
  updateEffects(delta);
  renderer.render(scene, camera);
});
