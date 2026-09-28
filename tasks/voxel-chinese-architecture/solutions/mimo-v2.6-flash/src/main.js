import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VoxelWorld, C } from './voxels.js';
import { buildMainHall, buildSideHall, buildGate, buildTower, buildPagoda } from './buildings.js';
import { buildEnvironment } from './environment.js';

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
scene.background = new THREE.Color(0xbcd3e6);
scene.fog = new THREE.Fog(0xbcd3e6, 260, 620);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.5, 1200);
camera.position.set(96, 78, 148);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 6, -8);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 30;
controls.maxDistance = 420;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;
controls.addEventListener('start', () => {
  controls.autoRotate = false;
});

/* Lighting: warm key light with shadows + cool sky fill. */
const sun = new THREE.DirectionalLight(0xffe2b8, 2.6);
sun.position.set(120, 95, 55);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.camera.left = -130;
sun.shadow.camera.right = 130;
sun.shadow.camera.top = 130;
sun.shadow.camera.bottom = -130;
sun.shadow.camera.near = 20;
sun.shadow.camera.far = 420;
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
scene.add(sun);
scene.add(sun.target);

const hemi = new THREE.HemisphereLight(0xcfe2f2, 0x5a6b3f, 0.85);
scene.add(hemi);

const bounce = new THREE.DirectionalLight(0xcad8e8, 0.35);
bounce.position.set(-70, 50, -60);
scene.add(bounce);

/* Assemble the voxel scene. */
const world = new VoxelWorld();
buildEnvironment(world);
buildGate(world, { cx: 0, cz: 62 });
buildTower(world, { cx: -34, cz: 44, kind: 'bell' });
buildTower(world, { cx: 34, cz: 44, kind: 'drum' });
buildSideHall(world, { cx: -42, cz: -6, facing: 'e' });
buildSideHall(world, { cx: 42, cz: -6, facing: 'w' });
buildMainHall(world, { cx: 0, cz: -52 });
buildPagoda(world, { cx: 0, cz: -82 });

const boxCount = world.build(scene, {
  emissive: (color) => (color === C.lantern ? 0.5 : 0),
});

window.__sceneInfo = { boxCount };
window.__view = { camera, controls, scene, renderer };

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
