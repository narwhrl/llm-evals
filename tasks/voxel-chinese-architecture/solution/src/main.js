import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VoxelWorld } from './world.js';
import { C } from './palette.js';
import { addGrass, buildPaving } from './ground.js';
import {
  buildWalls, buildGate, buildMainHall, buildSideHall, buildTower, buildPagoda,
} from './buildings.js';
import { lion, lanternPost, eaveLantern, burner, banner, cypress, blossomTree } from './props.js';

// ---------------------------------------------------------------- 渲染基础

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = makeSkyTexture();
scene.fog = new THREE.Fog(0xe0aa74, 380, 1100);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 2200);
camera.position.set(96, 70, 204);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 4, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 30;
controls.maxDistance = 560;
controls.maxPolarAngle = 1.45;
controls.update();

// ---------------------------------------------------------------- 光照（黄昏）

const hemi = new THREE.HemisphereLight(0xbcc8ea, 0x8a7455, 0.75);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffc48a, 1.7);
sun.position.set(-175, 105, 85);
sun.target.position.set(0, 0, -10);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.camera.left = -160;
sun.shadow.camera.right = 160;
sun.shadow.camera.top = 160;
sun.shadow.camera.bottom = -160;
sun.shadow.camera.near = 20;
sun.shadow.camera.far = 620;
sun.shadow.bias = -0.00015;
sun.shadow.normalBias = 0.35;
scene.add(sun, sun.target);

/** 黄昏渐变天空：顶部黛蓝 → 地平线暖金。 */
function makeSkyTexture() {
  const cv = document.createElement('canvas');
  cv.width = 16;
  cv.height = 256;
  const g = cv.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, '#2c3a5e');
  grad.addColorStop(0.45, '#6f6a8e');
  grad.addColorStop(0.78, '#d09068');
  grad.addColorStop(1.0, '#f0b478');
  g.fillStyle = grad;
  g.fillRect(0, 0, 16, 256);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------------------------------------------------------------- 场景搭建

const world = new VoxelWorld();

addGrass(scene);
buildPaving(world);

buildWalls(world);
buildGate(world);
buildMainHall(world);
buildSideHall(world, -1);
buildSideHall(world, 1);
buildTower(world, -1, 'bell');
buildTower(world, 1, 'drum');
buildPagoda(world);

// 石狮：山门前一对，主殿大阶旁一对
lion(world, -13, 78, 1);
lion(world, 13, 78, 1);
lion(world, -27, -20, 1, 2);
lion(world, 27, -20, 1, 2);

// 灯笼：前庭灯柱 + 山门/主殿檐下吊灯
for (const z of [8, 20, 32, 44]) {
  lanternPost(world, -9, z);
  lanternPost(world, 9, z);
}
eaveLantern(world, -6, 11, 76);
eaveLantern(world, 6, 11, 76);
eaveLantern(world, -18, 15, -19);
eaveLantern(world, 18, 15, -19);

// 香炉与幡旗
burner(world, -8, -9);
burner(world, 8, -9);
banner(world, -8, 2);
banner(world, 8, 2);

// 树木
for (const [x, z] of [[-20, 12], [20, 12], [-20, 30], [20, 30], [-10, -52], [10, -52],
  [-60, -40], [60, -40], [-40, -78], [40, -78]]) cypress(world, x, z);
for (const [x, z] of [[-20, 48], [20, 48], [-52, 50], [52, 50]]) blossomTree(world, x, z);

for (const mesh of world.buildMeshes()) scene.add(mesh);

// ---------------------------------------------------------------- 主循环

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
