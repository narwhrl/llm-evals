import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mainHall, sideHall, mountainGate, bellTower, pagoda } from './buildings.js';
import { buildGround, buildWall, buildProps } from './site.js';

// 场景：黄昏时分的体素寺院。所有建筑一次性构建，页面打开即是全景。

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fa2b6);
scene.fog = new THREE.Fog(0x9aabbe, 190, 330);

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 600);
// 首屏视角：略偏东的鸟瞰，正脊、配殿与山门同框，全貌一次看清。
camera.position.set(74, 78, 132);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 12, 8);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 45;
controls.maxDistance = 240;
controls.maxPolarAngle = Math.PI * 0.49;
controls.update();

// ---- 光照 ----------------------------------------------------------------
const hemi = new THREE.HemisphereLight(0xbcd0e8, 0x5c5340, 1.15);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffe2b8, 2.4);
sun.position.set(-78, 104, 74);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -80;
sun.shadow.camera.right = 80;
sun.shadow.camera.top = 80;
sun.shadow.camera.bottom = -80;
sun.shadow.camera.near = 10;
sun.shadow.camera.far = 260;
sun.shadow.bias = -0.0006;
scene.add(sun);

const fill = new THREE.DirectionalLight(0x93a8c8, 0.6);
fill.position.set(60, 40, -80);
scene.add(fill);

// ---- 场景装配 ------------------------------------------------------------
const world = new THREE.Group();
scene.add(world);

const parts = [
  buildGround(),
  buildWall(),
  buildProps(),
  mainHall(),
  sideHall(1),
  sideHall(-1),
  mountainGate(),
  bellTower(1),
  bellTower(-1),
  pagoda(),
];

const lampSpecs = [];
const sizes = [];
for (const part of parts) {
  sizes.push(`${part.name ?? "场地"}: ${part.batch.count} 体素`);
  world.add(part.batch.build());
  if (part.lamps) lampSpecs.push(...part.lamps);
}
console.info(sizes.join(" | "));

// 灯笼：少量实例化的发光体，配两盏暖光点光源照亮檐下
const lanternGeo = new THREE.BoxGeometry(0.5, 0.7, 0.5);
const lanternMat = new THREE.MeshBasicMaterial({ color: 0xffc46b });
const lanterns = new THREE.InstancedMesh(lanternGeo, lanternMat, lampSpecs.length);
const lampMatrix = new THREE.Matrix4();
lampSpecs.forEach((spec, i) => {
  lampMatrix.makeScale(spec.scale, spec.scale, spec.scale);
  lampMatrix.setPosition(spec.x, spec.y, spec.z);
  lanterns.setMatrixAt(i, lampMatrix);
});
lanterns.instanceMatrix.needsUpdate = true;
world.add(lanterns);

const warmA = new THREE.PointLight(0xffb066, 55, 44, 2);
warmA.position.set(0, 16, 14);
scene.add(warmA);

const warmB = new THREE.PointLight(0xffb066, 30, 36, 2);
warmB.position.set(0, 12, 36);
scene.add(warmB);

// ---- 交互与循环 ----------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

window.__voxel = {
  sizes,
  scene,
  camera,
  controls,
  renderer,
  stats: () => ({
    calls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    geometries: renderer.info.memory.geometries,
  }),
};
