import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Rainy konbini street-corner diorama. No UI, no people. Everything procedural.

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1020);
scene.fog = new THREE.FogExp2(0x0b1020, 0.016);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(15, 11.5, 17);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-1, 1.6, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.minDistance = 9;
controls.maxDistance = 46;
controls.maxPolarAngle = 1.45;
controls.minPolarAngle = 0.15;

// ---------- lights ----------
scene.add(new THREE.HemisphereLight(0x4a5a8a, 0x1a1420, 0.9));
const moon = new THREE.DirectionalLight(0x8fa8d8, 0.75);
moon.position.set(-10, 18, -8);
moon.castShadow = true;
moon.shadow.mapSize.set(1024, 1024);
moon.shadow.camera.left = -16;
moon.shadow.camera.right = 16;
moon.shadow.camera.top = 16;
moon.shadow.camera.bottom = -16;
scene.add(moon);
const warmIn1 = new THREE.PointLight(0xffc98a, 90, 14, 1.8);
warmIn1.position.set(-4, 2.9, -3);
scene.add(warmIn1);
const warmIn2 = new THREE.PointLight(0xffb46a, 50, 10, 1.8);
warmIn2.position.set(-1.5, 2.4, -0.5);
scene.add(warmIn2);

// ---------- toon setup ----------
const gradientMap = new THREE.DataTexture(new Uint8Array([120, 170, 220, 255]), 4, 1, THREE.RedFormat);
gradientMap.minFilter = THREE.NearestFilter;
gradientMap.magFilter = THREE.NearestFilter;
gradientMap.generateMipmaps = false;
gradientMap.needsUpdate = true;


const OUTLINE = 0x141a28;
function toon(color, opts = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap, ...opts });
}
function outline(mesh, s = 1.03) {
  const o = new THREE.Mesh(
    mesh.geometry,
    new THREE.MeshBasicMaterial({ color: OUTLINE, side: THREE.BackSide })
  );
  o.scale.setScalar(s);
  mesh.add(o);
  return o;
}
function box(w, h, d, color, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), opts.mat || toon(color, opts.matOpts));
  m.position.set(x, y, z);
  if (opts.ry) m.rotation.y = opts.ry;
  if (opts.rx) m.rotation.x = opts.rx;
  if (opts.rz) m.rotation.z = opts.rz;
  m.castShadow = opts.shadow !== false;
  m.receiveShadow = true;
  if (opts.outline !== false) outline(m, opts.os || 1.03);
  (opts.parent || scene).add(m);
  return m;
}
function cyl(rt, rb, h, color, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(rt, rb, h, opts.seg || 18),
    opts.mat || toon(color, opts.matOpts)
  );
  m.position.set(x, y, z);
  if (opts.rx) m.rotation.x = opts.rx;
  if (opts.rz) m.rotation.z = opts.rz;
  m.castShadow = opts.shadow !== false;
  m.receiveShadow = true;
  if (opts.outline !== false) outline(m, opts.os || 1.04);
  (opts.parent || scene).add(m);
  return m;
}
function plane(w, h, mat, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  if (opts.rx !== undefined) m.rotation.x = opts.rx;
  if (opts.ry) m.rotation.y = opts.ry;
  m.receiveShadow = opts.shadow !== false;
  (opts.parent || scene).add(m);
  return m;
}
function canvasTex(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function glowTex(inner, outer) {
  return canvasTex(128, 128, (g) => {
    const r = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    r.addColorStop(0, inner);
    r.addColorStop(1, outer);
    g.fillStyle = r;
    g.fillRect(0, 0, 128, 128);
  });
}
const softGlow = glowTex("rgba(255,255,255,0.9)", "rgba(255,255,255,0)");


// ---------- base ----------
const BASE = 26;
box(BASE, 1.2, BASE, 0x2a2f3a, 0, -0.6, 0, { outline: false }).receiveShadow = true;
// plinth trim
box(BASE + 0.3, 0.18, BASE + 0.3, 0xc9a86a, 0, -1.12, 0, { outline: false, shadow: false });
// sidewalk top
box(BASE - 0.4, 0.1, BASE - 0.4, 0x3d4350, 0, 0.05, 0, { outline: false });

// ---------- roads (L-shaped corner: south + east) ----------
const roadMat = new THREE.MeshStandardMaterial({ color: 0x2b3142, roughness: 0.28, metalness: 0.5 });
function road(w, d, x, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), roadMat);
  m.position.set(x, 0.1, z);
  m.receiveShadow = true;
  scene.add(m);
  return m;
}
road(BASE - 0.4, 4.2, 0, 8.6); // south road
road(4.2, BASE - 0.4, 8.6, 0); // east road

// drainage channel along south road edge
box(BASE - 0.4, 0.09, 0.5, 0x191d26, 0, 0.1, 6.15, { outline: false });
for (let i = 0; i < 24; i++) {
  box(0.08, 0.1, 0.44, 0x3a4150, -11.5 + i, 0.1, 6.15, { outline: false, shadow: false });
}
// crosswalk stripes (reflective)
const stripeMat = new THREE.MeshStandardMaterial({
  color: 0xdfe6f2, roughness: 0.15, metalness: 0.4,
  emissive: 0x8fa0c0, emissiveIntensity: 0.25,
});
for (let i = 0; i < 5; i++) {
  const s = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 3.4), stripeMat);
  s.position.set(-5.5 + i * 1.05, 0.16, 8.6);
  s.receiveShadow = true;
  scene.add(s);
}
// parking bay + P marking east side
const lineMat = new THREE.MeshBasicMaterial({ color: 0xe8d47a });
function flatLine(w, d, x, z, mat = lineMat) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.17, z);
  scene.add(m);
}
flatLine(3.4, 0.12, 4.4, 4.4);
flatLine(0.12, 2.4, 2.7, 5.5);
flatLine(0.12, 2.4, 6.1, 5.5);
const pTex = canvasTex(64, 64, (g) => {
  g.fillStyle = "#2b6cb0";
  g.fillRect(0, 0, 64, 64);
  g.fillStyle = "#fff";
  g.font = "bold 44px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("P", 32, 34);
});
plane(1.1, 1.1, new THREE.MeshBasicMaterial({ map: pTex, transparent: true }), 4.4, 0.17, 5.5, { rx: -Math.PI / 2, shadow: false });

// puddles (glossy) + neon reflection decals
const puddleMat = new THREE.MeshStandardMaterial({
  color: 0x11161f, roughness: 0.05, metalness: 0.9,
  transparent: true, opacity: 0.85,
});
const puddles = [];
function puddle(w, d, x, z) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), puddleMat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.155, z);
  m.receiveShadow = true;
  scene.add(m);
  puddles.push(m);
}
puddle(3.2, 2.0, -3, 7.6);
puddle(2.2, 1.6, 8.2, 3.5);
puddle(2.6, 1.8, 3.4, 8.8);
puddle(1.8, 1.4, -8.5, 4.2);
puddle(2.0, 1.5, 8.8, -4.5);
function neonPool(color, w, d, x, z, opacity = 0.3) {
  const t = glowTex(color, "rgba(0,0,0,0)");
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.18, z);
  scene.add(m);
  return m;
}
const reflections = [
  neonPool("rgba(255,170,80,0.85)", 7, 4, -4, 7.2, 0.32),
  neonPool("rgba(80,200,255,0.85)", 4, 3, 2.4, 4.6, 0.3),
  neonPool("rgba(255,120,160,0.8)", 4, 3, 8.4, 2.5, 0.26),
  neonPool("rgba(150,170,255,0.8)", 5, 3.4, 8.6, 8.6, 0.22),
];

// ---------- konbini building ----------
const store = new THREE.Group();
scene.add(store);
const SX0 = -8.5, SX1 = 0.5, SZ0 = -7.5, SZ1 = 0.5; // footprint
const SW = SX1 - SX0, SD = SZ1 - SZ0;
const CX = (SX0 + SX1) / 2, CZ = (SZ0 + SZ1) / 2;

// floor + ceiling + roof
box(SW, 0.12, SD, 0xf2e8d5, CX, 0.12, CZ, { parent: store, outline: false });
box(SW + 0.4, 0.25, SD + 0.4, 0x4a3f35, CX, 3.45, CZ, { parent: store });
box(SW + 0.9, 1.0, SD + 0.9, 0x3a4450, CX, 4.0, CZ, { parent: store }); // parapet band
box(SW + 0.2, 0.15, SD + 0.2, 0x2c2530, CX, 3.28, CZ, { parent: store, outline: false }); // ceiling slab
// rooftop units + antenna
box(1.4, 0.7, 1.0, 0x9aa0ab, -6.5, 4.85, -5.5, { parent: store });
box(1.0, 0.5, 0.8, 0x878d99, -4.5, 4.75, -6.0, { parent: store });
cyl(0.04, 0.04, 2.2, 0x666c78, -1.2, 5.4, -6.2, { parent: store, outline: false });

// walls (back + west solid, front/east glass)
const wallMat = toon(0xe8ded0);
function wall(w, h, d, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  outline(m);
  store.add(m);
  return m;
}
wall(SW, 3.2, 0.25, CX, 1.7, SZ0 + 0.12); // north
wall(0.25, 3.2, SD, SX0 + 0.12, 1.7, CZ); // west
wall(SW, 0.5, 0.25, CX, 3.0, SZ1 - 0.12); // south header above glass
wall(0.25, 0.5, SD, SX1 - 0.12, 3.0, CZ); // east header
// corner columns + mullions
for (const [x, z] of [[SX0 + 0.15, SZ1 - 0.15], [SX1 - 0.15, SZ1 - 0.15], [SX1 - 0.15, SZ0 + 0.15]]) {
  box(0.3, 3.2, 0.3, 0x3a4a5a, x, 1.6, z, { parent: store });
}
for (let i = 1; i <= 3; i++) {
  box(0.14, 2.6, 0.14, 0x3a4a5a, SX0 + (SW * i) / 4, 1.4, SZ1 - 0.12, { parent: store });
}
box(0.14, 2.6, 0.14, 0x3a4a5a, SX1 - 0.12, 1.4, -3.5, { parent: store });

// glass storefront
const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xbdd4e6, roughness: 0.06, metalness: 0.1,
  transparent: true, opacity: 0.16, clearcoat: 1,
});
function glass(w, h, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glassMat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  store.add(m);
  return m;
}
const glassFront = glass(SW - 0.5, 2.55, CX, 1.42, SZ1 - 0.1);
const glassEast = glass(SD - 0.5, 2.55, SX1 - 0.1, 1.42, CZ, -Math.PI / 2);

// sign band (flickers subtly)
const signTex = canvasTex(1024, 128, (g, w, h) => {
  g.fillStyle = "#fdf6ea";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#0e7a6d";
  g.fillRect(0, 0, w, 26);
  g.fillStyle = "#f28c28";
  g.fillRect(0, h - 26, w, 26);
  g.fillStyle = "#20303f";
  g.font = "bold 64px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("RAIN MART  雨夜マート  24h", w / 2, h / 2 + 2);
});
const signMat = new THREE.MeshBasicMaterial({ map: signTex });
const signMesh = new THREE.Mesh(new THREE.BoxGeometry(SW - 0.4, 1.0, 0.3), signMat);
signMesh.position.set(CX, 4.0, SZ1 + 0.35);
store.add(signMesh);
const signGlow = new THREE.PointLight(0xffd9a0, 25, 10, 1.8);
signGlow.position.set(CX, 3.9, SZ1 + 1.6);
scene.add(signGlow);

// awning over storefront
const awnMat = new THREE.MeshStandardMaterial({ color: 0x2e8f86, roughness: 0.4, metalness: 0.2, transparent: true, opacity: 0.92, side: THREE.DoubleSide });
const awning = new THREE.Mesh(new THREE.BoxGeometry(SW - 0.2, 0.08, 2.2), awnMat);
awning.position.set(CX - 0.5, 3.05, SZ1 + 1.0);
awning.rotation.x = 0.1;
awning.castShadow = true;
store.add(awning);
box(SW - 0.2, 0.1, 0.12, 0x275e59, CX - 0.5, 2.93, SZ1 + 2.05, { parent: store }); // gutter
// awning posts
for (const x of [SX0 + 0.5, CX - 0.5, SX1 - 1.2]) {
  cyl(0.06, 0.06, 2.9, 0x3a4a5a, x, 1.45, SZ1 + 1.95, { parent: store });
}
// entrance mat
plane(2.4, 1.1, new THREE.MeshStandardMaterial({ color: 0x27435f, roughness: 0.9 }), -1.5, 0.19, SZ1 + 1.2, { rx: -Math.PI / 2, parent: store });

// automatic sliding doors
const doorMat = new THREE.MeshPhysicalMaterial({ color: 0xcfe2f2, roughness: 0.05, transparent: true, opacity: 0.45 });
const doorL = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.3, 0.08), doorMat);
const doorR = doorL.clone();
doorL.position.set(-1.95, 1.3, SZ1 - 0.05);
doorR.position.set(-1.0, 1.3, SZ1 - 0.05);
store.add(doorL, doorR);
box(2.1, 0.18, 0.2, 0x20303f, -1.48, 2.62, SZ1 - 0.05, { parent: store });
// door open indicator
const doorLampMat = new THREE.MeshBasicMaterial({ color: 0x7dffb0 });
const doorLamp = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), doorLampMat);
doorLamp.position.set(-1.48, 2.78, SZ1 + 0.05);
store.add(doorLamp);

// ---------- interior ----------
// ceiling light panels
const panelMat = new THREE.MeshBasicMaterial({ color: 0xfff1d6 });
for (const [x, z] of [[-6, -2], [-2.5, -2], [-6, -5], [-2.5, -5]]) {
  plane(1.6, 0.9, panelMat, x, 3.26, z, { rx: Math.PI / 2, shadow: false, parent: store });
}
// floor guide arrows
const guideTex = canvasTex(128, 256, (g, w, h) => {
  g.clearRect(0, 0, w, h);
  g.fillStyle = "rgba(240,140,40,0.9)";
  g.fillRect(54, 40, 20, 130);
  g.beginPath();
  g.moveTo(24, 150);
  g.lineTo(64, 210);
  g.lineTo(104, 150);
  g.closePath();
  g.fill();
});
for (const x of [-5.5, -3.0]) {
  plane(0.5, 1.0, new THREE.MeshBasicMaterial({ map: guideTex, transparent: true }), x, 0.19, -1.2, { rx: -Math.PI / 2, shadow: false, parent: store });
}
// merchandise palette
const goods = [0xe15a5a, 0xf2a03d, 0xf2e14d, 0x7bc96f, 0x4da3d8, 0xb57edc, 0xf2789f, 0xfff6e8];
function shelfRow(x, z, len, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  store.add(g);
  box(len, 0.08, 0.7, 0x8a5a3b, 0, 0.45, 0, { parent: g });
  box(len, 1.3, 0.08, 0x6b4429, 0, 1.0, -0.32, { parent: g });
  for (let lvl = 0; lvl < 3; lvl++) {
    const y = 0.62 + lvl * 0.42;
    box(len, 0.05, 0.62, 0xa06a42, 0, y, 0, { parent: g, outline: false });
    for (let i = 0; i < Math.floor(len / 0.42); i++) {
      const c = goods[(i + lvl * 3 + Math.floor(x)) % goods.length];
      box(0.32, 0.3, 0.4, c, -len / 2 + 0.3 + i * 0.42, y + 0.18, (lvl % 2) * 0.06, { parent: g, outline: false, shadow: false });
    }
  }
  return g;
}
shelfRow(-4.5, -2.6, 4.6);
shelfRow(-4.5, -4.6, 4.6);
// drink fridge wall (north)
box(6.4, 2.2, 0.7, 0xdfe6ee, -4, 1.25, -6.9, { parent: store });
const fridgeGlowMat = new THREE.MeshBasicMaterial({ color: 0xd6ecff });
plane(6.0, 1.5, fridgeGlowMat, -4, 1.35, -6.53, { shadow: false, parent: store });
for (let r = 0; r < 2; r++) {
  for (let i = 0; i < 14; i++) {
    cyl(0.07, 0.07, 0.3, goods[(i + r * 5) % goods.length], -6.7 + i * 0.42, 1.0 + r * 0.55, -6.5, { parent: store, outline: false, shadow: false });
  }
}
// bento / onigiri counter
box(2.6, 0.9, 1.0, 0xffffff, -6.2, 0.63, -0.9, { parent: store });
for (let i = 0; i < 6; i++) {
  box(0.34, 0.12, 0.5, i % 2 ? 0xf5e6c8 : 0xe8a34d, -7.2 + i * 0.42, 1.14, -0.9, { parent: store, outline: false, shadow: false });
}
// checkout counter + register near door
box(1.8, 0.95, 0.8, 0x3f6d8e, -0.6, 0.65, -1.6, { parent: store });
box(0.5, 0.35, 0.4, 0x222a33, -0.9, 1.3, -1.7, { parent: store });
plane(0.4, 0.25, new THREE.MeshBasicMaterial({ color: 0x9fe8ff }), -0.9, 1.38, -1.49, { shadow: false, parent: store });
// coffee machine
box(0.7, 1.1, 0.6, 0x2b2f36, 0.0, 1.1, -2.6, { parent: store });
plane(0.4, 0.2, new THREE.MeshBasicMaterial({ color: 0xff9a3d }), 0.0, 1.45, -2.29, { shadow: false, parent: store });
// magazine rack by east glass
const mag = new THREE.Group();
mag.position.set(-0.3, 0, -4.2);
mag.rotation.y = -Math.PI / 2;
store.add(mag);
box(1.6, 1.1, 0.3, 0x7a4a2b, 0, 0.7, 0, { parent: mag });
for (let i = 0; i < 5; i++) {
  box(0.26, 0.4, 0.06, goods[(i * 2 + 1) % goods.length], -0.6 + i * 0.3, 1.15, 0.1, { parent: mag, outline: false, shadow: false, rx: -0.25 });
}
// freezer along west wall
box(0.9, 1.6, 3.0, 0xe8f4ff, -7.8, 0.95, -3.5, { parent: store });
plane(0.06, 1.0, new THREE.MeshBasicMaterial({ color: 0x9fd8ff }), -7.33, 1.0, -3.5, { ry: Math.PI / 2, shadow: false, parent: store });
// oden counter with pot
box(1.4, 0.9, 0.8, 0x8a5a3b, -2.6, 0.6, -0.7, { parent: store });
cyl(0.32, 0.32, 0.3, 0x333a44, -2.6, 1.2, -0.7, { parent: store });
const odenGlow = new THREE.Mesh(new THREE.CircleGeometry(0.28, 16), new THREE.MeshBasicMaterial({ color: 0xffd98a }));
odenGlow.rotation.x = -Math.PI / 2;
odenGlow.position.set(-2.6, 1.36, -0.7);
store.add(odenGlow);
// interior posters + lightbox
const posterDraws = [
  (g, w, h) => { g.fillStyle = "#ff6b81"; g.fillRect(0, 0, w, h); g.fillStyle = "#fff"; g.font = "bold 42px sans-serif"; g.textAlign = "center"; g.fillText("肉まん", w / 2, h / 2); g.font = "20px sans-serif"; g.fillText("¥140", w / 2, h / 2 + 34); },
  (g, w, h) => { g.fillStyle = "#2b6cb0"; g.fillRect(0, 0, w, h); g.fillStyle = "#fff"; g.font = "bold 36px sans-serif"; g.textAlign = "center"; g.fillText("COFFEE", w / 2, h / 2); g.font = "20px sans-serif"; g.fillText("HOT  ¥180", w / 2, h / 2 + 32); },
  (g, w, h) => { g.fillStyle = "#0e7a6d"; g.fillRect(0, 0, w, h); g.fillStyle = "#ffe9a8"; g.font = "bold 34px sans-serif"; g.textAlign = "center"; g.fillText("おでん", w / 2, h / 2); g.font = "18px sans-serif"; g.fillText("温かい", w / 2, h / 2 + 30); },
];
posterDraws.forEach((d, i) => {
  const t = canvasTex(128, 192, d);
  plane(0.7, 1.0, new THREE.MeshBasicMaterial({ map: t }), -6.5 + i * 1.2, 1.9, SZ0 + 0.28, { shadow: false, parent: store });
});
// back-room door + storage
box(1.0, 2.1, 0.12, 0x9a8a76, -1.2, 1.2, SZ0 + 0.2, { parent: store });
box(1.2, 1.6, 0.8, 0xb09a72, -0.2, 0.95, -6.6, { parent: store });

// ---------- exterior props ----------
// vending machine
const vm = new THREE.Group();
vm.position.set(2.4, 0, 1.6);
vm.rotation.y = -0.15;
scene.add(vm);
box(1.2, 2.0, 0.8, 0xd8362a, 0, 1.1, 0, { parent: vm });
const vmTex = canvasTex(128, 192, (g, w, h) => {
  g.fillStyle = "#fff4e0";
  g.fillRect(0, 0, w, h);
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) {
    g.fillStyle = ["#e15a5a", "#4da3d8", "#7bc96f", "#f2a03d"][(i + r) % 4];
    g.fillRect(10 + i * 28, 14 + r * 44, 20, 32);
  }
  g.fillStyle = "#d8362a";
  g.fillRect(0, h - 30, w, 30);
});
plane(0.95, 1.5, new THREE.MeshBasicMaterial({ map: vmTex }), 0, 1.15, 0.41, { shadow: false, parent: vm });
const vmLight = new THREE.PointLight(0xff9a7a, 12, 6, 1.8);
vmLight.position.set(2.4, 1.4, 2.8);
scene.add(vmLight);

// bicycle
const bike = new THREE.Group();
bike.position.set(-6.2, 0, 2.8);
bike.rotation.y = 0.5;
scene.add(bike);
const wheelG = new THREE.TorusGeometry(0.34, 0.045, 8, 20);
const wheelM = toon(0x22262e);
for (const x of [-0.55, 0.55]) {
  const w = new THREE.Mesh(wheelG, wheelM);
  w.position.set(x, 0.36, 0);
  w.castShadow = true;
  bike.add(w);
}
const frameM = toon(0x3fa7d6);
function tube(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, len, 8), frameM);
  m.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
  m.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
  m.castShadow = true;
  bike.add(m);
}
tube(-0.55, 0.36, 0.05, 0.75);
tube(0.55, 0.36, 0.05, 0.75);
tube(0.05, 0.75, -0.35, 0.78);
tube(-0.35, 0.78, -0.55, 0.36);
box(0.28, 0.06, 0.22, 0x4a3220, -0.35, 0.82, 0, { parent: bike });
box(0.3, 0.25, 0.35, 0xd8b65a, 0.62, 0.72, 0, { parent: bike }); // front basket
cyl(0.03, 0.03, 0.4, 0x888e99, 0.55, 1.0, 0, { parent: bike, outline: false, rx: Math.PI / 2 });

// umbrella stand by the door
const umb = new THREE.Group();
umb.position.set(-3.4, 0, 1.5);
scene.add(umb);
cyl(0.3, 0.26, 0.55, 0x2f6f8f, 0, 0.42, 0, { parent: umb });
for (let i = 0; i < 3; i++) {
  const a = (i / 3) * Math.PI * 2;
  cyl(0.02, 0.02, 0.9, 0x555c66, Math.cos(a) * 0.12, 0.85, Math.sin(a) * 0.12, { parent: umb, outline: false });
  const u = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 8), toon([0xe15a5a, 0x4da3d8, 0xf2e14d][i]));
  u.position.set(Math.cos(a) * 0.12, 1.15, Math.sin(a) * 0.12);
  u.castShadow = true;
  outline(u);
  umb.add(u);
}
// bins
for (const [x, c] of [[1.6, 0x3f7a4d], [2.3, 0x8a8f99]]) {
  cyl(0.28, 0.24, 0.7, c, x, 0.5, -0.4, {});
  cyl(0.3, 0.3, 0.08, 0x2b2f36, x, 0.89, -0.4, {});
}
// streetlight at the corner
const lampPost = new THREE.Group();
lampPost.position.set(6.2, 0, 6.2);
scene.add(lampPost);
cyl(0.09, 0.12, 4.6, 0x39404c, 0, 2.3, 0, { parent: lampPost });
box(1.4, 0.12, 0.12, 0x39404c, 0.6, 4.55, 0, { parent: lampPost });
const lampHeadMat = new THREE.MeshBasicMaterial({ color: 0xfff3cf });
box(0.5, 0.14, 0.3, 0x22262e, 1.25, 4.5, 0, { parent: lampPost });
plane(0.44, 0.24, lampHeadMat, 1.25, 4.42, 0, { rx: Math.PI / 2, shadow: false, parent: lampPost });
const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), lampHeadMat);
bulb.position.set(1.25, 4.38, 0);
lampPost.add(bulb);
const streetSpot = new THREE.SpotLight(0xffd9a0, 80, 14, 0.6, 0.5, 1.6);
streetSpot.position.set(7.45, 4.5, 6.2);
streetSpot.target.position.set(7.45, 0, 6.2);
streetSpot.castShadow = true;
scene.add(streetSpot, streetSpot.target);
const coneMat = new THREE.MeshBasicMaterial({ map: softGlow, color: 0xffd9a0, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
const cone = new THREE.Mesh(new THREE.ConeGeometry(1.8, 4.2, 20, 1, true), coneMat);
cone.position.set(7.45, 2.3, 6.2);
scene.add(cone);

// utility pole + sagging wires
function utilityPole(x, z, h = 6.2) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  scene.add(g);
  cyl(0.14, 0.18, h, 0x5a4632, 0, h / 2, 0, { parent: g });
  box(1.6, 0.12, 0.12, 0x5a4632, 0, h - 0.5, 0, { parent: g });
  box(1.3, 0.12, 0.12, 0x5a4632, 0, h - 1.1, 0, { parent: g });
  return { g, h };
}
const poleA = utilityPole(-10.5, 5.5);
const poleB = utilityPole(10.8, -3.5, 5.6);
const wireMat = new THREE.LineBasicMaterial({ color: 0x0c0e14 });
function wire(a, b, sag) {
  const mid = a.clone().lerp(b, 0.5);
  mid.y -= sag;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(24)), wireMat));
}
wire(new THREE.Vector3(-10.5, 5.4, 5.5), new THREE.Vector3(-4, 4.6, 0.9), 0.7);
wire(new THREE.Vector3(-10.5, 4.8, 5.5), new THREE.Vector3(10.8, 5.1, -3.5), 1.2);
wire(new THREE.Vector3(10.8, 4.5, -3.5), new THREE.Vector3(0.5, 4.2, -4.0), 0.6);
// road sign
cyl(0.05, 0.05, 2.6, 0x888e99, -7.2, 1.3, 5.4, { outline: false });
const roadSignTex = canvasTex(128, 96, (g, w, h) => {
  g.fillStyle = "#1d4fa3";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#fff";
  g.font = "bold 26px sans-serif";
  g.textAlign = "center";
  g.fillText("コンビニ", w / 2, 40);
  g.font = "bold 22px sans-serif";
  g.fillText("→ 30m", w / 2, 70);
});
plane(1.0, 0.75, new THREE.MeshBasicMaterial({ map: roadSignTex, side: THREE.DoubleSide }), -7.2, 2.4, 5.4, { shadow: false });
// guardrails along the corner
function guardrail(x0, z0, x1, z1) {
  const g = new THREE.Group();
  scene.add(g);
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(2, Math.round(len / 1.6));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    box(0.1, 0.7, 0.1, 0xb8bec9, x0 + (x1 - x0) * t, 0.5, z0 + (z1 - z0) * t, { parent: g });
  }
  const rail = box(len, 0.12, 0.08, 0xd6dbe4, (x0 + x1) / 2, 0.82, (z0 + z1) / 2, { parent: g });
  rail.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
}
guardrail(-11, 5.6, 4.8, 5.6);
guardrail(5.6, 4.8, 5.6, -11);
// traffic signal (distant corner, cycles green/yellow/red)
const sig = new THREE.Group();
sig.position.set(10.6, 0, 10.6);
scene.add(sig);
cyl(0.08, 0.1, 3.6, 0x2b2f36, 0, 1.8, 0, { parent: sig });
box(0.4, 1.0, 0.4, 0x1c2027, 0, 3.9, 0, { parent: sig });
const sigMats = {
  red: new THREE.MeshBasicMaterial({ color: 0x551111 }),
  yellow: new THREE.MeshBasicMaterial({ color: 0x554411 }),
  green: new THREE.MeshBasicMaterial({ color: 0x114422 }),
};
const sigRed = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), sigMats.red);
const sigYel = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), sigMats.yellow);
const sigGrn = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), sigMats.green);
sigRed.position.set(0, 4.15, 0.21);
sigYel.position.set(0, 3.9, 0.21);
sigGrn.position.set(0, 3.65, 0.21);
sig.add(sigRed, sigYel, sigGrn);
const sigGlow = new THREE.PointLight(0x51ff7a, 4, 5, 2);
sigGlow.position.set(10.6, 3.8, 10.0);
scene.add(sigGlow);
// outdoor AC unit on east wall
box(0.7, 0.55, 0.5, 0xc9cfd8, 1.0, 0.75, -3.0, {});
const fan = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 8, 18), toon(0x4a5058));
fan.position.set(1.36, 0.75, -3.0);
fan.rotation.y = Math.PI / 2;
scene.add(fan);
// notice / poster board
const nb = new THREE.Group();
nb.position.set(-9.8, 0, 2.2);
nb.rotation.y = 0.5;
scene.add(nb);
box(1.8, 1.2, 0.08, 0x6b4a2f, 0, 1.3, 0, { parent: nb });
box(2.0, 0.1, 0.3, 0x6b4a2f, 0, 2.0, 0, { parent: nb });
posterDraws.forEach((d, i) => {
  const t = canvasTex(96, 128, d);
  plane(0.42, 0.56, new THREE.MeshBasicMaterial({ map: t }), -0.55 + i * 0.55, 1.3, 0.06, { shadow: false, parent: nb });
});
// posters on the store west wall (alley side)
posterDraws.forEach((d, i) => {
  const t = canvasTex(96, 128, d);
  plane(0.5, 0.66, new THREE.MeshBasicMaterial({ map: t }), SX0 - 0.02, 1.75, -5.6 + i * 0.75, { ry: -Math.PI / 2, shadow: false });
});
// alley entrance west of the store
box(0.25, 2.6, 8.5, 0x4c4438, -11.2, 1.3, -3.5, {}); // alley outer wall
plane(8.0, 2.4, new THREE.MeshBasicMaterial({ map: canvasTex(256, 128, (g, w, h) => {
  g.fillStyle = "#3a3348";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#ff9a5a";
  g.beginPath();
  g.arc(200, 40, 16, 0, 7);
  g.fill();
  g.fillStyle = "#241f30";
  for (let i = 0; i < 4; i++) g.fillRect(20 + i * 55, 60, 36, 60);
}) }), -11.05, 1.3, -3.5, { ry: Math.PI / 2, shadow: false });
const lanternMat = new THREE.MeshBasicMaterial({ color: 0xffb46a });
const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), lanternMat);
lantern.position.set(-9.9, 2.2, -6.8);
scene.add(lantern);
const lanternLight = new THREE.PointLight(0xff9a5a, 8, 6, 1.8);
lanternLight.position.copy(lantern.position);
scene.add(lanternLight);
box(0.6, 0.5, 0.6, 0x7a5c38, -10.2, 0.4, -5.2, {});
box(0.5, 0.4, 0.5, 0x5a6e8e, -10.0, 0.35, -4.4, {});
// moon + stars
const moonSprite = new THREE.Mesh(
  new THREE.CircleGeometry(1.6, 24),
  new THREE.MeshBasicMaterial({ map: softGlow, color: 0xe8eeff, transparent: true, opacity: 0.95, fog: false })
);
moonSprite.position.set(-30, 26, -45);
moonSprite.lookAt(camera.position);
scene.add(moonSprite);
{
  const n = 160;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 55 + Math.random() * 25;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = 18 + Math.random() * 30;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xaebadd, size: 0.25, fog: false, transparent: true, opacity: 0.8 })));
}

// ---------- rain ----------
const RAIN = 1400;
const rainPos = new Float32Array(RAIN * 3);
const rainSpd = new Float32Array(RAIN);
for (let i = 0; i < RAIN; i++) {
  rainPos[i * 3] = (Math.random() - 0.5) * 36;
  rainPos[i * 3 + 1] = Math.random() * 16;
  rainPos[i * 3 + 2] = (Math.random() - 0.5) * 36;
  rainSpd[i] = 9 + Math.random() * 5;
}
const rainGeo = new THREE.BufferGeometry();
rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
const rain = new THREE.Points(rainGeo, new THREE.PointsMaterial({
  color: 0x9db8d9, size: 0.055, transparent: true, opacity: 0.65, sizeAttenuation: true,
}));
scene.add(rain);

// eave drips under the awning gutter
const DRIPS = 60;
const dripPos = new Float32Array(DRIPS * 3);
const dripSpd = new Float32Array(DRIPS);
for (let i = 0; i < DRIPS; i++) {
  dripPos[i * 3] = SX0 + Math.random() * SW;
  dripPos[i * 3 + 1] = 2.9 - Math.random() * 2.7;
  dripPos[i * 3 + 2] = SZ1 + 2.0 + (Math.random() - 0.5) * 0.15;
  dripSpd[i] = 3 + Math.random() * 2;
}
const dripGeo = new THREE.BufferGeometry();
dripGeo.setAttribute("position", new THREE.BufferAttribute(dripPos, 3));
scene.add(new THREE.Points(dripGeo, new THREE.PointsMaterial({ color: 0xbdd4f2, size: 0.07, transparent: true, opacity: 0.8 })));

// puddle ripple rings
const ripples = [];
const rippleGeo = new THREE.RingGeometry(0.18, 0.24, 24);
for (let i = 0; i < 26; i++) {
  const spots = [[-3, 7.6], [8.2, 3.5], [3.4, 8.8], [-8.5, 4.2], [8.8, -4.5]];
  const s = spots[i % spots.length];
  const m = new THREE.Mesh(rippleGeo, new THREE.MeshBasicMaterial({
    color: 0xbdd4f2, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false,
  }));
  m.rotation.x = -Math.PI / 2;
  m.position.set(s[0] + (Math.random() - 0.5) * 1.6, 0.17, s[1] + (Math.random() - 0.5) * 1.2);
  m.userData.t = Math.random();
  scene.add(m);
  ripples.push(m);
}

// glass runoff droplets on the storefront glass
const DROPS = 70;
const dropPos = new Float32Array(DROPS * 3);
const dropSpd = new Float32Array(DROPS);
for (let i = 0; i < DROPS; i++) {
  dropPos[i * 3] = SX0 + 0.4 + Math.random() * (SW - 0.8);
  dropPos[i * 3 + 1] = 0.3 + Math.random() * 2.3;
  dropPos[i * 3 + 2] = SZ1 + 0.02;
  dropSpd[i] = 0.15 + Math.random() * 0.4;
}
const dropGeo = new THREE.BufferGeometry();
dropGeo.setAttribute("position", new THREE.BufferAttribute(dropPos, 3));
scene.add(new THREE.Points(dropGeo, new THREE.PointsMaterial({ color: 0xd8ecff, size: 0.045, transparent: true, opacity: 0.85 })));

// oden steam wisps
const STEAM = 24;
const steamPos = new Float32Array(STEAM * 3);
for (let i = 0; i < STEAM; i++) {
  steamPos[i * 3] = -2.6 + (Math.random() - 0.5) * 0.3;
  steamPos[i * 3 + 1] = 1.4 + Math.random() * 1.0;
  steamPos[i * 3 + 2] = -0.7 + (Math.random() - 0.5) * 0.3;
}
const steamGeo = new THREE.BufferGeometry();
steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPos, 3));
scene.add(new THREE.Points(steamGeo, new THREE.PointsMaterial({
  map: softGlow, color: 0xfff4e0, size: 0.35, transparent: true, opacity: 0.3, depthWrite: false,
})));

// ---------- animation ----------
const clock = new THREE.Clock();
let doorT = 0; // 8s cycle
let firstFrame = true;

function flicker(t) {
  // mostly steady neon with an occasional brief dip
  const dip = Math.max(0, Math.sin(t * 0.9) - 0.985) * 60;
  const hum = Math.sin(t * 31) * 0.03 + Math.sin(t * 7.3) * 0.02;
  return 1 - Math.min(0.45, dip) + hum;
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const t = clock.elapsedTime;

  // rain fall
  const rp = rainGeo.attributes.position.array;
  for (let i = 0; i < RAIN; i++) {
    rp[i * 3 + 1] -= rainSpd[i] * dt;
    rp[i * 3] += dt * 1.2; // wind slant
    if (rp[i * 3 + 1] < 0) {
      rp[i * 3 + 1] = 15 + Math.random();
      rp[i * 3] = (Math.random() - 0.5) * 36;
      rp[i * 3 + 2] = (Math.random() - 0.5) * 36;
    }
    if (rp[i * 3] > 18) rp[i * 3] = -18;
  }
  rainGeo.attributes.position.needsUpdate = true;

  // eave drips
  const dp = dripGeo.attributes.position.array;
  for (let i = 0; i < DRIPS; i++) {
    dp[i * 3 + 1] -= dripSpd[i] * dt;
    if (dp[i * 3 + 1] < 0.15) {
      dp[i * 3 + 1] = 2.9;
      dp[i * 3] = SX0 + Math.random() * SW;
    }
  }
  dripGeo.attributes.position.needsUpdate = true;

  // ripples expand + fade
  for (const m of ripples) {
    m.userData.t += dt * 0.7;
    if (m.userData.t > 1) m.userData.t = 0;
    const k = m.userData.t;
    m.scale.setScalar(0.4 + k * 2.2);
    m.material.opacity = 0.45 * (1 - k);
  }

  // glass runoff
  const gp = dropGeo.attributes.position.array;
  for (let i = 0; i < DROPS; i++) {
    gp[i * 3 + 1] -= dropSpd[i] * dt;
    gp[i * 3] += Math.sin(t * 3 + i) * dt * 0.03;
    if (gp[i * 3 + 1] < 0.25) {
      gp[i * 3 + 1] = 2.6;
      gp[i * 3] = SX0 + 0.4 + Math.random() * (SW - 0.8);
    }
  }
  dropGeo.attributes.position.needsUpdate = true;

  // steam rise
  const sp = steamGeo.attributes.position.array;
  for (let i = 0; i < STEAM; i++) {
    sp[i * 3 + 1] += dt * 0.5;
    sp[i * 3] += Math.sin(t * 2 + i * 1.7) * dt * 0.15;
    if (sp[i * 3 + 1] > 2.6) sp[i * 3 + 1] = 1.4;
  }
  steamGeo.attributes.position.needsUpdate = true;

  // sign / lightbox flicker
  const f = flicker(t);
  signGlow.intensity = 25 * f;
  // door cycle: closed most of the time, opens briefly every 8s
  doorT = (doorT + dt) % 8;
  let open = 0;
  if (doorT > 4 && doorT < 5) open = doorT - 4;
  else if (doorT >= 5 && doorT < 6.2) open = 1;
  else if (doorT >= 6.2 && doorT < 7.2) open = 1 - (doorT - 6.2);
  doorL.position.x = -1.95 - open * 0.85;
  doorR.position.x = -1.0 + open * 0.85;
  doorLampMat.color.setHex(open > 0.05 ? 0x7dffb0 : 0x1d5a34);
  window.__doorOpen = open;

  // traffic signal: green 6s -> yellow 1.5s -> red 6s
  const st = t % 13.5;
  const on = (m, hex, dim) => m.color.setHex(hex);
  if (st < 6) {
    on(sigGrn.material, 0x33ff77); on(sigYel.material, 0x554411); on(sigMats.red, 0x551111);
    sigGlow.color.setHex(0x51ff7a);
  } else if (st < 7.5) {
    on(sigGrn.material, 0x114422); on(sigYel.material, 0xffbb33); on(sigMats.red, 0x551111);
    sigGlow.color.setHex(0xffbb33);
  } else {
    on(sigGrn.material, 0x114422); on(sigYel.material, 0x554411); on(sigMats.red, 0xff3344);
    sigGlow.color.setHex(0xff4455);
  }

  // wet-road reflection shimmer
  reflections.forEach((m, i) => {
    m.material.opacity = m.material.opacity * 0.96 + (0.24 + 0.08 * Math.sin(t * 2.2 + i * 2.1)) * 0.04;
  });
  fan.rotation.z += dt * 6;

  controls.update();
  renderer.render(scene, camera);
  if (firstFrame) {
    firstFrame = false;
    window.__dioramaReady = true;
  }
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener("error", (e) => {
  window.__dioramaError = String(e.message || e.error);
});

animate();
