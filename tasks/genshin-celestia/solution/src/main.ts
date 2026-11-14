import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createPostPipeline } from './core/postprocessing';
import { createCelestiaScene } from './scene/createCelestia';

const container = document.getElementById('app') ?? document.body;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Default cinematic three-quarter distant shot showcasing Celestia's full iconic silhouette:
// Central rock island + inverted craggy cliff + 8-islet ring & arched bridges + soaring white spire + golden armillary
const camera = new THREE.PerspectiveCamera(
  39,
  window.innerWidth / Math.max(1, window.innerHeight),
  2.5,
  14000,
);
camera.position.set(660, 245, 1235);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 38, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.rotateSpeed = 0.65;
controls.zoomSpeed = 0.85;
controls.panSpeed = 0.65;
controls.minDistance = 120;
controls.maxDistance = 2500;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = Math.PI * 0.88;
controls.update();

const celestia = createCelestiaScene();
const post = createPostPipeline(renderer, celestia.scene, camera);

const onResize = () => {
  const width = window.innerWidth;
  const height = Math.max(1, window.innerHeight);
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(pr);
  renderer.setSize(width, height);
  post.setSize(width, height, pr);
};
window.addEventListener('resize', onResize);

const clock = new THREE.Clock();
let rafId = 0;

function animate() {
  rafId = requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  controls.update();
  celestia.update(elapsed);
  post.render();
}

animate();

window.addEventListener('beforeunload', () => {
  cancelAnimationFrame(rafId);
  window.removeEventListener('resize', onResize);
  controls.dispose();
  post.dispose();
  celestia.dispose();
  renderer.dispose();
});
