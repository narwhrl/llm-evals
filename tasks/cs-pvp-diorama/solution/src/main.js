import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { C } from "./palette.js";
import { Kit } from "./outline.js";
import { buildGround } from "./ground.js";
import { buildTSpawn } from "./regions/tSpawn.js";
import { buildASite } from "./regions/aSite.js";
import { buildMidLane } from "./regions/midLane.js";
import { buildBSite } from "./regions/bSite.js";
import { buildCTSpawn } from "./regions/ctSpawn.js";
import { wires, utilityPole } from "./props.js";
import { createRain } from "./fx/rain.js";
import { createPuddles } from "./fx/puddle.js";
import { createSteam, createDrips } from "./fx/pointsFx.js";
import { createLightsFx } from "./fx/lightsFx.js";
import { createLightning } from "./fx/lightning.js";
import { glassStreakTex, softDotTex } from "./palette.js";

// ---------- 基础渲染环境 ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(C.sky);
scene.fog = new THREE.Fog(C.fog, 48, 130);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.14;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.set(30, 24, 33);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 10;
controls.maxDistance = 72;
controls.maxPolarAngle = 1.42;
controls.minPolarAngle = 0.12;
controls.screenSpacePanning = false;
controls.enabled = false;
controls.addEventListener("change", () => {
  controls.target.x = THREE.MathUtils.clamp(controls.target.x, -9, 9);
  controls.target.z = THREE.MathUtils.clamp(controls.target.z, -9, 9);
  controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0.2, 6);
});

// ---------- 全局光 ----------
const hemi = new THREE.HemisphereLight(0x3a4f6c, 0x181b22, 1.3);
hemi.userData.base = 1.3;
scene.add(hemi);

const fill = new THREE.DirectionalLight(0x5a6f8c, 0.7);
fill.position.set(20, 18, 22);
scene.add(fill);

const rim = new THREE.DirectionalLight(0x4a648f, 0.55);
rim.position.set(-18, 14, -24);
scene.add(rim);

const moon = new THREE.DirectionalLight(0x8fa8c8, 1.35);
moon.position.set(-24, 30, -14);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -24;
moon.shadow.camera.right = 24;
moon.shadow.camera.top = 24;
moon.shadow.camera.bottom = -24;
moon.shadow.camera.near = 5;
moon.shadow.camera.far = 90;
moon.shadow.bias = -0.0004;
moon.shadow.normalBias = 0.03;
moon.userData.base = 1.35;
scene.add(moon);

// ---------- 场景搭建 ----------
const kit = new Kit(scene);
const streak = glassStreakTex();
const softDot = softDotTex();

buildGround(kit);
const refs = {
  t: buildTSpawn(kit),
  a: buildASite(kit),
  mid: buildMidLane(kit, streak),
  b: buildBSite(kit, softDot),
  ct: buildCTSpawn(kit),
};

// 电线（杆-杆、杆-屋檐交错）
const pB = utilityPole(kit, 16.4, 0, -0.4, 7);
wires(kit, [
  refs.t.wireAnchors[0],
  new THREE.Vector3(-14.9, 5.35, -8.9),
  new THREE.Vector3(-4.7, 5.35, -2.2),
  new THREE.Vector3(6.5, 4.7, -0.5),
  pB,
], 1.15);
wires(kit, [
  pB.clone().add(new THREE.Vector3(-0.6, -0.75, 0)),
  new THREE.Vector3(15.3, 6.45, -5.5),
  new THREE.Vector3(14.4, 6.45, -9.1),
], 0.7);
wires(kit, [
  refs.ct.poleTop,
  new THREE.Vector3(-8, 3.35, 16.3),
  new THREE.Vector3(4, 3.35, 16.3),
], 0.8);

// ---------- 特效 ----------
const rain = createRain(1500);
scene.add(rain.lines);

const puddles = createPuddles(scene, 34);

const steams = [
  createSteam(softDot, -12.2, 5.05, -7.6, 1),
  createSteam(softDot, 11.2, 6.3, -8.4, 1.2),
  createSteam(softDot, 3.1, 0.2, 5.2, 0.8),
];
for (const s of steams) scene.add(s.points);

const drips = [
  createDrips(softDot, new THREE.Vector3(-14.0, 5.05, -1.42), new THREE.Vector3(1, 0, 0), 7.2),
  createDrips(softDot, new THREE.Vector3(10.35, 5.28, -12.26), new THREE.Vector3(1, 0, 0), 2.5),
  createDrips(softDot, new THREE.Vector3(8.7, 6.14, -3.85), new THREE.Vector3(1, 0, 0), 6.5),
  createDrips(softDot, new THREE.Vector3(-13.3, 3.42, -1.93), new THREE.Vector3(1, 0, 0), 5.6),
];
for (const d of drips) scene.add(d.points);

const lightsFx = createLightsFx(kit, refs, softDot);
const lightning = createLightning({ hemi, dir: moon, scene, renderer });

// ---------- 细微动效（卷帘门震动 / 玻璃雨水滑落） ----------
const shutter = refs.a.shutter;
let shakeAt = 6, shakeEnd = -1;
streak.offset.y = 0;

// ---------- 入场推近 + 主循环 ----------
const camFrom = new THREE.Vector3(37, 30, 42);
const camTo = new THREE.Vector3(28.5, 22, 36.5);
let introT = 0;
const INTRO = 2.4;
let introDone = false;
renderer.domElement.addEventListener("pointerdown", () => {
  if (!introDone) {
    introDone = true;
    controls.enabled = true;
  }
});

const clock = { last: performance.now() };
let elapsed = 0;

function tick(forcedDt) {
  const now = performance.now();
  const dt = typeof forcedDt === "number" ? forcedDt : Math.min((now - clock.last) / 1000, 0.1);
  clock.last = now;
  elapsed += dt;
  const t = elapsed;

  if (!introDone) {
    introT += dt;
    const k = Math.min(introT / INTRO, 1);
    const e = 1 - Math.pow(1 - k, 3);
    camera.position.lerpVectors(camFrom, camTo, e);
    camera.lookAt(controls.target);
    if (k >= 1) {
      introDone = true;
      controls.enabled = true;
      controls.update();
    }
  } else {
    controls.update();
  }

  rain.update(t);
  puddles.update(t);
  for (const s of steams) s.update(t);
  for (const d of drips) d.update(t);
  lightsFx.update(t);
  lightning.update(t, dt);

  // 卷帘门偶发细微震动
  if (t > shakeAt && t > shakeEnd) {
    shakeEnd = t + 0.4;
    shakeAt = t + 6 + Math.random() * 7;
  }
  if (t < shakeEnd) {
    shutter.position.x = -10.5 + (Math.random() - 0.5) * 0.024;
    shutter.position.y = (Math.random() - 0.5) * 0.012;
  } else {
    shutter.position.set(-10.5, 0, refs.a.wallZ1 - 0.05);
  }

  // 玻璃雨水缓缓滑落
  streak.offset.y -= dt * 0.05;

  renderer.render(scene, camera);
}

// 首帧同步渲染（后台标签页 rAF 节流下也保证画面就绪）
tick();
window.__ready = true;
window.__sceneStats = () => ({ calls: renderer.info.render.calls, tris: renderer.info.render.triangles });
window.__dbg = {
  exposure: () => renderer.toneMappingExposure,
  hemi: () => hemi.intensity,
  moon: () => moon.intensity,
  cam: () => camera.position.toArray().map((v) => +v.toFixed(2)),
  script: () => document.scripts[document.scripts.length - 1].src,
  bench: (n = 30) => {
    const t0 = performance.now();
    for (let i = 0; i < n; i++) renderer.render(scene, camera);
    const ms = (performance.now() - t0) / n;
    return { msPerFrame: +ms.toFixed(2), fpsEstimate: +(1000 / ms).toFixed(0) };
  },
  step: (n = 1, dt = 0.1) => {
    for (let i = 0; i < n; i++) tick(dt);
    return +elapsed.toFixed(2);
  },
};

renderer.setAnimationLoop(() => tick());

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
