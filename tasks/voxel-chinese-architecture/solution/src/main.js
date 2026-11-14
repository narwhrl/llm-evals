import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { materialFor } from './voxel.js';
import { buildScene } from './buildings.js';

const app = document.getElementById('app');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0bd85'); // 晨昏暖调
scene.fog = new THREE.Fog('#f0bd85', 220, 420);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1200);
camera.position.set(68, 54, 102);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 8, -2);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxPolarAngle = Math.PI * 0.495;
controls.minDistance = 20;
controls.maxDistance = 320;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.45;
controls.update();

// 光源：暖阳 + 天空漫射，投射阴影
const sun = new THREE.DirectionalLight('#ffe3b3', 2.6);
sun.position.set(90, 110, 60);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -80;
sun.shadow.camera.right = 80;
sun.shadow.camera.top = 80;
sun.shadow.camera.bottom = -80;
sun.shadow.camera.near = 20;
sun.shadow.camera.far = 400;
sun.shadow.bias = -0.0006;
scene.add(sun);
scene.add(new THREE.HemisphereLight('#ffe7c4', '#5d7a4e', 0.85));

// 体素场景
const { voxels, clouds } = buildScene();
scene.add(voxels.build(true));
const cloudGroup = clouds.build(false);
scene.add(cloudGroup);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
function tick() {
  requestAnimationFrame(tick);
  const t = clock.getElapsedTime();
  cloudGroup.position.x = Math.sin(t * 0.03) * 4; // 云缓慢漂移
  cloudGroup.position.z = Math.cos(t * 0.02) * 2;
  controls.update();
  renderer.render(scene, camera);
}
tick();

// 供验收脚本读取：场景体素数
window.__voxelCount = voxels.count;
