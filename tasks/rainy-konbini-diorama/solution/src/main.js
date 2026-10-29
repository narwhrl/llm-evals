// 雨夜便利店街角微缩模型入口。
// 场景由三个模块拼装：street（底座与街景）、store（便利店与店内）、atmosphere（雨与湿地面）。
// 全部资产在本地用几何体与 canvas 程序化生成，运行时不请求任何外部资源。

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildStreet } from './street.js';
import { buildStore } from './store.js';
import { buildAtmosphere, animateGlassRunoff } from './atmosphere.js';

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x05070f, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a1024, 0.012);

const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(18, 16.5, 22.5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-1.6, 1.9, -0.8);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 12;
controls.maxDistance = 70;
controls.minPolarAngle = 0.16;
controls.maxPolarAngle = Math.PI * 0.478;
controls.rotateSpeed = 0.62;
controls.zoomSpeed = 0.8;
controls.enablePan = true;
controls.screenSpacePanning = false;
controls.update();

// ---- 灯光 ---------------------------------------------------------------
const hemi = new THREE.HemisphereLight(0x8ea9e0, 0x1e1826, 1.25);
scene.add(hemi);

const moon = new THREE.DirectionalLight(0xb8ceff, 2.15);
moon.position.set(-16, 26, 18);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -18;
moon.shadow.camera.right = 18;
moon.shadow.camera.top = 18;
moon.shadow.camera.bottom = -18;
moon.shadow.camera.near = 1;
moon.shadow.camera.far = 80;
moon.shadow.bias = -0.0008;
moon.shadow.normalBias = 0.02;
scene.add(moon);

const storeLightA = new THREE.PointLight(0xffcf8a, 38, 19, 2);
storeLightA.position.set(-2.2, 3.0, -1.4);
scene.add(storeLightA);
const storeLightB = new THREE.PointLight(0xffe3b0, 20, 14, 2);
storeLightB.position.set(-6.6, 2.6, -3.6);
scene.add(storeLightB);
const streetLight = new THREE.PointLight(0xffb765, 26, 16, 2);
streetLight.position.set(3.4, 6.4, 3.4);
scene.add(streetLight);
const neonCool = new THREE.PointLight(0x6ad8ff, 16, 14, 2);
neonCool.position.set(4.2, 3.4, -1.6);
scene.add(neonCool);

// ---- 场景 ---------------------------------------------------------------
const registry = {};
const diorama = new THREE.Group();
scene.add(diorama);
const street = buildStreet(registry);
const store = buildStore(registry);
diorama.add(street, store);

const atmosphere = buildAtmosphere(registry);
diorama.add(atmosphere.group);

// ---- 动画状态 -----------------------------------------------------------
const clock = new THREE.Clock();
let doorTimer = 0;
let doorTarget = 0;
let doorOpen = 0;
let trafficTimer = 0;
let trafficIndex = 0;
let flickerSeed = 0;

const signWhiteBase = new THREE.Color(0xd9d2c0);
const sideSignBase = new THREE.Color(0xfff1d2);

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  atmosphere.update(dt, t);
  animateGlassRunoff(registry.droplets, t, dt);

  // 自动门：每 8 秒切换一次开合
  doorTimer += dt;
  if (doorTimer > 8) {
    doorTimer = 0;
    doorTarget = doorTarget === 0 ? 1 : 0;
  }
  doorOpen += (doorTarget - doorOpen) * Math.min(1, dt * 2.8);
  const slide = doorOpen * 1.2;
  registry.doorA.position.x = registry.doorHome[0] - slide;
  registry.doorB.position.x = registry.doorHome[1] + slide;

  // 招牌轻微闪烁
  flickerSeed += dt;
  const flicker = 0.94 + Math.sin(flickerSeed * 11.0) * 0.03 + (Math.sin(flickerSeed * 37.0) > 0.96 ? -0.22 : 0);
  registry.signWhiteMat.color.copy(signWhiteBase).multiplyScalar(flicker);
  registry.sideSignMat.color.copy(sideSignBase).multiplyScalar(flicker);
  storeLightA.intensity = 38 * (0.95 + Math.sin(t * 0.8) * 0.05);

  // 远处交通灯
  trafficTimer += dt;
  if (trafficTimer > 5.5) {
    trafficTimer = 0;
    trafficIndex = (trafficIndex + 1) % 3;
  }
  const { lampRed, lampAmber, lampGreen } = registry.traffic;
  lampRed.material.color.copy(lampRed.material.userData.baseColor).multiplyScalar(trafficIndex === 0 ? 1 : 0.1);
  lampAmber.material.color.copy(lampAmber.material.userData.baseColor).multiplyScalar(trafficIndex === 1 ? 1 : 0.1);
  lampGreen.material.color.copy(lampGreen.material.userData.baseColor).multiplyScalar(trafficIndex === 2 ? 1 : 0.1);

  // 街灯 / 霓虹呼吸
  streetLight.intensity = 26 * (0.93 + Math.sin(t * 1.9) * 0.07);
  neonCool.intensity = 16 * (0.86 + Math.sin(t * 1.2 + 1.4) * 0.14);

  controls.update();
  registry.sync();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 只读验收探针
window.__diorama = {
  scene,
  camera,
  renderer,
  controls,
  stats: () => ({
    drawCalls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
  }),
  door: () => ({ open: doorOpen, target: doorTarget }),
  traffic: () => trafficIndex,
};

animate();
