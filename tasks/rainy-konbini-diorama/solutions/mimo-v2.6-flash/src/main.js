import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createWorld } from './world.js';
import './style.css';

const app = document.getElementById('app');

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#0a0e1e');
scene.fog = new THREE.Fog('#0d1428', 38, 86);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 240);
camera.position.set(24.4, 11.6, 20.5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.6, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.75;
controls.zoomSpeed = 0.85;
controls.minDistance = 8;
controls.maxDistance = 64;
controls.maxPolarAngle = Math.PI * 0.495;
controls.minPolarAngle = 0.15;
controls.screenSpacePanning = false;
controls.update();

const world = createWorld(scene);

let time = 0;
let frames = 0;
const clock = new THREE.Clock();

function advance(dt) {
  time += dt;
  world.update(time, dt);
  controls.update();
  renderer.render(scene, camera);
  frames++;
}

function tick() {
  requestAnimationFrame(tick);
  advance(Math.min(clock.getDelta(), 0.05));
}
tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Introspection handle used by the local acceptance checks; it draws nothing.
// `advance(dt)` steps the simulation deterministically when requestAnimationFrame
// is suspended (background tabs), which is how motion is verified off-screen.
window.__diorama = {
  get time() { return time; },
  get frames() { return frames; },
  advance,
  camera,
  controls,
  renderer,
  scene
};
