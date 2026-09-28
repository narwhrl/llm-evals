import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createDiorama } from './world.js';
import './style.css';

const mount = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0b1222');

const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 90);
camera.position.set(17.5, 11.6, 21);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.setSize(mount.clientWidth, mount.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
mount.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.55, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.enablePan = false;
controls.minDistance = 8;
controls.maxDistance = 40;
controls.minPolarAngle = 0.22;
controls.maxPolarAngle = 1.42;
controls.rotateSpeed = 0.65;
controls.zoomSpeed = 0.8;
controls.update();

const world = createDiorama(scene);
const startedAt = performance.now();
let frameId = 0;

function resize() {
  const width = Math.max(1, mount.clientWidth);
  const height = Math.max(1, mount.clientHeight);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  frameId = requestAnimationFrame(animate);
  const time = (performance.now() - startedAt) / 1000;
  world.update(time);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(frameId);
  } else {
    animate();
  }
});
resize();
animate();
