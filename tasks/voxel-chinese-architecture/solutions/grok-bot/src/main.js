import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VoxelWorld } from './voxel.js';
import { buildComplex } from './buildings.js';

const cellSize = 0.55;

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function createScene() {
  const scene = new THREE.Scene();
  // dusk / late-afternoon sky
  scene.background = new THREE.Color(0xc4a882);
  scene.fog = new THREE.Fog(0xc4a882, 70, 160);
  return scene;
}

function createLights(scene) {
  const hemi = new THREE.HemisphereLight(0xffe2c4, 0x3a4a3a, 0.55);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0xffd7a8, 0.28);
  scene.add(ambient);

  // warm low sun — dusk
  const sun = new THREE.DirectionalLight(0xffc07a, 1.45);
  sun.position.set(-55, 70, 40);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 10;
  sun.shadow.camera.far = 200;
  sun.shadow.camera.left = -80;
  sun.shadow.camera.right = 80;
  sun.shadow.camera.top = 80;
  sun.shadow.camera.bottom = -80;
  sun.shadow.bias = -0.0008;
  scene.add(sun);
  scene.add(sun.target);
  sun.target.position.set(0, 0, 5);

  // cool fill from opposite side
  const fill = new THREE.DirectionalLight(0x8ab4d4, 0.25);
  fill.position.set(40, 30, -50);
  scene.add(fill);

  // soft lantern-like point accents near gate & hall
  const accents = [
    [0, 8, 45],
    [0, 10, -10],
    [-28, 7, -5],
    [28, 7, -5],
  ];
  for (const [x, y, z] of accents) {
    const p = new THREE.PointLight(0xff8844, 0.55, 28, 2);
    p.position.set(x * cellSize, y * cellSize, z * cellSize);
    scene.add(p);
  }

  return sun;
}

function createCamera() {
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 400);
  // elevated overview looking from SE toward the complex — full ensemble visible immediately
  camera.position.set(38, 32, 58);
  return camera;
}

function buildWorld(scene) {
  const world = new VoxelWorld(cellSize);
  buildComplex(world);
  const group = world.buildGroup();
  scene.add(group);

  // ground shadow receiver plane under voxels
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(140, 140),
    new THREE.MeshStandardMaterial({ color: 0x3a6332, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  return world.count;
}

function main() {
  const renderer = createRenderer();
  const scene = createScene();
  const camera = createCamera();
  createLights(scene);
  const voxelCount = buildWorld(scene);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 4, 8);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minDistance = 12;
  controls.maxDistance = 120;
  controls.update();

  const hud = document.querySelector('#hud span');
  if (hud) {
    hud.textContent = `山门 → 庭院 → 主殿 · ${voxelCount.toLocaleString()} 体素 · 拖拽旋转 · 滚轮缩放`;
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // gentle auto-orbit so the default view stays lively without input
  let t0 = performance.now();
  function frame(now) {
    const dt = (now - t0) / 1000;
    t0 = now;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  console.info(`[voxel-chinese-architecture] ready · ${voxelCount} voxels`);
}

main();
