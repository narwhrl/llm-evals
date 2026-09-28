import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mulberry32, wetStreakTexture } from './textures.js';
import { OutlinePipeline } from './post.js';
import { buildLighting } from './lighting.js';
import { buildBase } from './scene/base.js';
import { buildTSpawn } from './scene/tSpawn.js';
import { buildASite } from './scene/aSite.js';
import { buildMid } from './scene/mid.js';
import { buildBSite } from './scene/bSite.js';
import { buildCTSpawn } from './scene/ctSpawn.js';
import { buildAlleyAndFlank } from './scene/alley.js';
import { utilityPole, wire } from './scene/props.js';
import { createRain } from './effects/rain.js';
import { createDrips } from './effects/drips.js';
import { createRipples } from './effects/ripples.js';
import { createSteam } from './effects/steam.js';
import { createLightning } from './effects/lightning.js';

// ---------- renderer / camera / controls ----------
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1626);
scene.fog = new THREE.Fog(0x0e1626, 70, 170);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 1, 400);
camera.position.set(46, 36, 52);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 3, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.7;
controls.zoomSpeed = 0.85;
controls.minDistance = 24;
controls.maxDistance = 140;
controls.maxPolarAngle = 1.46;
controls.update();

// ---------- world context ----------
const ctx = {
  group: scene,
  rng: mulberry32(20260922),
  streaks: [],
  drips: [],
  steamVents: [],
  flickerLights: [],
  strobes: [],
  searchlight: null,
  shutterMesh: null,
  flashLight: null,
};

const { ground: groundMesh, reflector: puddleReflector, updateReflection } = buildBase(ctx);
buildTSpawn(ctx);
buildASite(ctx);
buildMid(ctx);
buildBSite(ctx);
buildCTSpawn(ctx);
buildAlleyAndFlank(ctx);
buildLighting(ctx);

// ---------- utility poles + crossing wires ----------
function buildPoles() {
  const poleMat = null; // utilityPole builds its own materials
  void poleMat;
  const e1 = utilityPole(10);
  e1.position.set(26.5, 0, -20);
  const e2 = utilityPole(10);
  e2.position.set(26.8, 0, 21);
  const w1 = utilityPole(10);
  w1.position.set(-27, 0, -6);
  const w2 = utilityPole(10);
  w2.position.set(-26.5, 0, 14);
  scene.add(e1, e2, w1, w2);
  const A = (x, z) => new THREE.Vector3(x, 9.5, z);
  // double strands per span
  const spans = [
    [A(-27, -6), A(26.5, -20), 1.3], // diagonal crossing the north half
    [A(26.5, -20), A(26.8, 21), 1.4], // east edge chain
    [A(-27, -6), A(-26.5, 14), 0.7], // alley chain
    [A(-26.5, 14), A(26.8, 21), 1.5], // crossing the south half
  ];
  for (const [a, b, sag] of spans) {
    for (const dy of [0, 0.35]) {
      const aa = a.clone();
      const bb = b.clone();
      aa.y -= dy;
      bb.y -= dy;
      scene.add(wire(aa, bb, sag + dy * 0.2));
    }
  }
}
buildPoles();

// ---------- wet streak cards (scrolling water on walls) ----------
const streakTex = wetStreakTexture();
const streakMat = new THREE.MeshBasicMaterial({
  map: streakTex,
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
});
for (const s of ctx.streaks) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), streakMat);
  m.position.set(s.x, s.y, s.z);
  m.rotation.y = s.ry || 0;
  m.renderOrder = 3;
  scene.add(m);
}

// ---------- dynamic effects ----------
const rain = createRain();
scene.add(rain.mesh);
const drips = createDrips(ctx.drips);
scene.add(drips.mesh);
const ripples = createRipples();
scene.add(ripples.mesh);
const steam = createSteam(ctx.steamVents);
scene.add(steam.mesh);
const lightning = createLightning(ctx, scene);

// ---------- toon outline post pipeline ----------
const pipeline = new OutlinePipeline(renderer);
function resizePipeline() {
  const dpr = renderer.getPixelRatio();
  pipeline.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
}
resizePipeline();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  resizePipeline();
});

// ---------- animation helpers ----------
function hash1(n) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

let shutterBaseX = ctx.shutterMesh ? ctx.shutterMesh.position.x : 0;
let nextVibeAt = 6 + Math.random() * 8;
let vibeEnd = -1;

function updateShutter(t) {
  const m = ctx.shutterMesh;
  if (!m) return;
  if (t > nextVibeAt && vibeEnd < 0) {
    vibeEnd = t + 0.35 + Math.random() * 0.4;
    nextVibeAt = t + 7 + Math.random() * 9;
  }
  if (t < vibeEnd) {
    m.position.x = shutterBaseX + Math.sin(t * 78) * 0.025 + Math.sin(t * 41) * 0.015;
    m.position.y = 3.0 + Math.sin(t * 95) * 0.01;
  } else {
    vibeEnd = -1;
    m.position.x = shutterBaseX;
    m.position.y = 3.0;
  }
}

function updateFlickerLights(t) {
  for (const f of ctx.flickerLights) {
    let v;
    if (f.mode === 'fluoro') {
      // broken tube: harsh sputter with random dropouts
      const bucket = Math.floor(t * 9);
      const r = hash1(bucket + 3.7);
      const sputter = 0.75 + 0.25 * Math.sin(t * 55 + Math.sin(t * 17));
      v = r < 0.16 ? 0.15 * sputter : sputter;
    } else {
      // street lamp: gentle shimmer with rare dips
      const bucket = Math.floor(t * 3);
      const dip = hash1(bucket + 9.1) < 0.1 ? 0.55 : 1;
      v = (0.9 + 0.1 * Math.sin(t * 11.7) * Math.sin(t * 3.1)) * dip;
    }
    f.light.intensity = f.base * v;
    if (f.mesh) f.mesh.visible = v > 0.3;
  }
}

function updateStrobes(t) {
  const phase = t % 1.7;
  const redOn = phase < 0.45 || (phase > 0.85 && phase < 1.1);
  const blueOn = phase >= 0.45 && phase < 0.85;
  for (const s of ctx.strobes) {
    s.red.intensity = redOn ? 60 : 0;
    s.blue.intensity = blueOn ? 60 : 0;
    s.redMesh.material.color.setHex(redOn ? 0xff2233 : 0x3a0a10);
    s.blueMesh.material.color.setHex(blueOn ? 0x3366ff : 0x0a103a);
  }
}

function updateSearchlight(t) {
  const s = ctx.searchlight;
  if (!s) return;
  const sway = Math.sin(t * 0.24);
  const sway2 = Math.cos(t * 0.17);
  s.target.position.x = s.baseTarget.x + sway * 16;
  s.target.position.z = s.baseTarget.z + sway2 * 10;
  s.head.rotation.y = sway * 0.35;
  // subtle flicker in the beam
  s.light.intensity = 900 * (0.92 + 0.08 * Math.sin(t * 19) * Math.sin(t * 2.3));
}

// ---------- main loop ----------
const clock = new THREE.Clock();
let elapsed = 0;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  elapsed += dt;
  const t = elapsed;

  // Real-time puddle reflection: update the mirror RT at top level, with the
  // asphalt ground hidden so only above-ground content is reflected.
  groundMesh.visible = false;
  updateReflection.call(puddleReflector, renderer, scene, camera);
  groundMesh.visible = true;

  rain.update(t);
  drips.update(t);
  ripples.update(t);
  steam.update(t);
  lightning.update(t, dt);
  streakTex.offset.y = -t * 0.045;
  updateShutter(t);
  updateFlickerLights(t);
  updateStrobes(t);
  updateSearchlight(t);

  controls.update();
  pipeline.render(scene, camera);
}
animate();
