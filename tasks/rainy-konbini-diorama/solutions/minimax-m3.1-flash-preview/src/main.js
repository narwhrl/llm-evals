import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createDiorama } from './world.js';
import './style.css';

const mount = document.querySelector('#stage');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 140);
camera.position.set(16.2, 10.4, 21.4);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.82;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
mount.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-0.5, 1.75, -2.0);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.enablePan = false;
controls.minDistance = 10;
controls.maxDistance = 48;
controls.minPolarAngle = 0.16;
controls.maxPolarAngle = 1.4;
controls.rotateSpeed = 0.62;
controls.zoomSpeed = 0.85;
controls.update();

const world = createDiorama(scene);

function resize() {
  const w = Math.max(1, mount.clientWidth);
  const h = Math.max(1, mount.clientHeight);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

let last = performance.now();
const startedAt = last;
let frame = 0;

function tick() {
  const now = performance.now();
  // Clamp dt so a backgrounded tab does not teleport the simulation.
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  world.update((now - startedAt) / 1000, dt);
  controls.update();
  renderer.render(scene, camera);
  frame = requestAnimationFrame(tick);
}

window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
  } else {
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }
});

resize();
// Render one frame synchronously so the canvas is never blank even if the
// first requestAnimationFrame is throttled.
world.update(0, 0.016);
renderer.render(scene, camera);
frame = requestAnimationFrame(tick);
