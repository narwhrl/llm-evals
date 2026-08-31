import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA_LIMITS } from './scene/layout.js';
import { createWorld } from './scene/world.js';
import './styles.css';

const mount = document.querySelector('#app');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x06131b);
scene.fog = new THREE.FogExp2(0x07151d, 0.0125);

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 140);
camera.position.set(...CAMERA_LIMITS.initialPosition);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.92;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.tabIndex = 0;
renderer.domElement.setAttribute(
  'aria-label',
  'CS 雨夜货运站微缩沙盘。拖拽旋转，滚轮或双指缩放。',
);
renderer.domElement.setAttribute(
  'aria-keyshortcuts',
  'ArrowLeft ArrowRight ArrowUp ArrowDown + -',
);
mount.append(renderer.domElement);

const world = createWorld({ scene, renderer });
const clock = new THREE.Clock();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(...CAMERA_LIMITS.target);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = CAMERA_LIMITS.minDistance;
controls.maxDistance = CAMERA_LIMITS.maxDistance;
controls.minPolarAngle = CAMERA_LIMITS.minPolarAngle;
controls.maxPolarAngle = CAMERA_LIMITS.maxPolarAngle;
controls.update();

const keyboardOffset = new THREE.Vector3();
const keyboardOrbit = new THREE.Spherical();

function handleKeyboard(event) {
  const orbitStep = 0.085;
  const zoomFactor = 1.1;
  keyboardOffset.copy(camera.position).sub(controls.target);
  keyboardOrbit.setFromVector3(keyboardOffset);

  switch (event.key) {
    case 'ArrowLeft':
      keyboardOrbit.theta -= orbitStep;
      break;
    case 'ArrowRight':
      keyboardOrbit.theta += orbitStep;
      break;
    case 'ArrowUp':
      keyboardOrbit.phi -= orbitStep;
      break;
    case 'ArrowDown':
      keyboardOrbit.phi += orbitStep;
      break;
    case '+':
    case '=':
      keyboardOrbit.radius /= zoomFactor;
      break;
    case '-':
    case '_':
      keyboardOrbit.radius *= zoomFactor;
      break;
    default:
      return;
  }

  event.preventDefault();
  keyboardOrbit.phi = THREE.MathUtils.clamp(
    keyboardOrbit.phi,
    CAMERA_LIMITS.minPolarAngle,
    CAMERA_LIMITS.maxPolarAngle,
  );
  keyboardOrbit.radius = THREE.MathUtils.clamp(
    keyboardOrbit.radius,
    CAMERA_LIMITS.minDistance,
    CAMERA_LIMITS.maxDistance,
  );
  keyboardOffset.setFromSpherical(keyboardOrbit);
  camera.position.copy(controls.target).add(keyboardOffset);
  controls.update();
}

renderer.domElement.addEventListener('keydown', handleKeyboard);

function resize() {
  const width = Math.max(1, mount.clientWidth);
  const height = Math.max(1, mount.clientHeight);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(width, height, false);
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(mount);
resize();

let shadowsRendered = false;
let lastRenderedAt = -Infinity;

function renderFrame(timestamp) {
  if (timestamp - lastRenderedAt < 1000 / 30) return;
  lastRenderedAt = timestamp;
  controls.update();
  world.update(clock.getElapsedTime());
  renderer.render(scene, camera);
  if (!shadowsRendered) {
    renderer.shadowMap.autoUpdate = false;
    shadowsRendered = true;
  }
}

function setRendering(active) {
  renderer.setAnimationLoop(active ? renderFrame : null);
}

document.addEventListener('visibilitychange', () => {
  setRendering(!document.hidden);
});

renderer.domElement.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  setRendering(false);
  renderer.domElement.setAttribute('aria-label', 'WebGL 上下文丢失，沙盘渲染已暂停。');
});

renderer.domElement.addEventListener('webglcontextrestored', () => {
  shadowsRendered = false;
  renderer.shadowMap.autoUpdate = true;
  renderer.domElement.setAttribute(
    'aria-label',
    'CS 雨夜货运站微缩沙盘。拖拽旋转，滚轮或双指缩放。',
  );
  setRendering(true);
});

window.addEventListener('pagehide', () => {
  resizeObserver.disconnect();
  controls.dispose();
  world.dispose();
  renderer.dispose();
}, { once: true });

setRendering(true);
