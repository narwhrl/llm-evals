import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createDiorama } from './world.js';
import './style.css';

const mount = document.querySelector('#stage');

const scene = new THREE.Scene();
// Opening framing. Pulled in and tilted slightly down from the first pass so
// the corner fills the frame instead of floating in the lower right with a
// third of the image left as empty sky.
const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 140);
camera.position.set(15.4, 10.7, 19.8);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.82;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
mount.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.4, 1.5, -1.4);
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
  // Re-read the ratio on every resize: browser zoom and dragging the window to
  // a display with a different density both change it, and a renderer left on
  // the startup ratio keeps drawing at the wrong resolution.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  // updateStyle must stay on. With it off the canvas keeps its intrinsic
  // backing-store size in CSS pixels, so on any display where the pixel ratio
  // is not 1 the canvas overflows #stage by exactly that factor and the scene
  // is silently cropped to its top-left corner.
  renderer.setSize(w, h);
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
