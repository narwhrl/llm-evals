import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildWorld } from './scene/world.js';
import { createPipeline } from './core/pipeline.js';

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.15;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 120);
camera.position.set(17, 13.5, 22);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.2, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 9;
controls.maxDistance = 55;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = 1.42;
controls.rotateSpeed = 0.7;
controls.zoomSpeed = 0.8;
controls.update();

const world = buildWorld(scene);
const pipeline = createPipeline(renderer, scene, camera, world.noOutline);

// Shadows are static except for the sliding door, which casts none, so render the maps once.
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  pipeline.setSize(w, h);
  world.resize(w, h);
});

const timer = new THREE.Timer();
renderer.setAnimationLoop((now) => {
  timer.update(now);
  const dt = Math.min(timer.getDelta(), 0.1);
  controls.update();
  world.update(timer.getElapsed(), dt);
  pipeline.render();
});
