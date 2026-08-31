import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './styles.css';

const mount = document.querySelector('#app');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x071017);

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 140);
camera.position.set(30, 27, 34);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.domElement.tabIndex = 0;
renderer.domElement.setAttribute(
  'aria-label',
  'CS 雨夜货运站微缩沙盘。拖拽旋转，滚轮或双指缩放。',
);
mount.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 24;
controls.maxDistance = 72;
controls.minPolarAngle = Math.PI * 0.16;
controls.maxPolarAngle = Math.PI * 0.46;
controls.update();

function resize() {
  const width = mount.clientWidth;
  const height = mount.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

window.addEventListener('resize', resize, { passive: true });
resize();

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
