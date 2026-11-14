import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

// 确定性随机：同一布局每次打开一致
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20261114);

// ---------- 渲染器 / 场景 / 相机 ----------
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2c194);
scene.fog = new THREE.Fog(0xf2c194, 140, 320);

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 800);
const CAM_HOME = new THREE.Vector3(44, 40, 54);
const TARGET_HOME = new THREE.Vector3(0, 0, 1);
camera.position.copy(CAM_HOME);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(TARGET_HOME);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 22;
controls.maxDistance = 170;
controls.maxPolarAngle = 1.35;
controls.update();

// ---------- 灯光（傍晚 / 夜晚两套预设） ----------
const sun = new THREE.DirectionalLight(0xffbe78, 2.6);
sun.position.set(38, 44, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -45; sun.shadow.camera.right = 45;
sun.shadow.camera.top = 45; sun.shadow.camera.bottom = -45;
sun.shadow.camera.far = 160;
sun.shadow.bias = -0.0004;
scene.add(sun);
const hemi = new THREE.HemisphereLight(0xcfe4ff, 0x7a5c3e, 0.75);
scene.add(hemi);

// 夜晚才开启的三盏点光源：车站一盏 + 主街两盏，其余灯只用自发光
const nightLights = [];
function addNightLight(x, y, z) {
  const l = new THREE.PointLight(0xffc37a, 0, 30, 1.8);
  l.position.set(x, y, z);
  scene.add(l);
  nightLights.push(l);
}
addNightLight(0, 5, 15.5);
addNightLight(-8, 4.5, 8);
addNightLight(12, 4.5, 8);

// ---------- 材质 ----------
const M = {
  wood: new THREE.MeshStandardMaterial({ color: 0x8a5a33, roughness: 0.8 }),
  woodDark: new THREE.MeshStandardMaterial({ color: 0x5f3c20, roughness: 0.85 }),
  grass: new THREE.MeshStandardMaterial({ color: 0x77a355, roughness: 1 }),
  water: new THREE.MeshStandardMaterial({ color: 0x3f8fb5, roughness: 0.12, metalness: 0.35 }),
  sand: new THREE.MeshStandardMaterial({ color: 0xd9c193, roughness: 1 }),
  ballast: new THREE.MeshStandardMaterial({ color: 0x9a8d7a, roughness: 1, side: THREE.DoubleSide }),
  rail: new THREE.MeshStandardMaterial({ color: 0xb8bcc2, roughness: 0.3, metalness: 0.9 }),
  sleeper: new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.95 }),
  road: new THREE.MeshStandardMaterial({ color: 0x565a61, roughness: 0.95 }),
  roadLine: new THREE.MeshBasicMaterial({ color: 0xf5ead0 }),
  stone: new THREE.MeshStandardMaterial({ color: 0xa8a094, roughness: 0.95 }),
  steelGreen: new THREE.MeshStandardMaterial({ color: 0x3d5a45, roughness: 0.6 }),
  wallWhite: new THREE.MeshStandardMaterial({ color: 0xf1e7d3, roughness: 0.9 }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 1 }),
  pine: new THREE.MeshStandardMaterial({ color: 0x3e7a3e, roughness: 1, flatShading: true }),
  leaf: new THREE.MeshStandardMaterial({ color: 0x5d9b4a, roughness: 1, flatShading: true }),
  lampPole: new THREE.MeshStandardMaterial({ color: 0x2e4a3e, roughness: 0.7 }),
  lampHeadDay: new THREE.MeshStandardMaterial({ color: 0xfff2cf, roughness: 0.4 }),
  windowDay: new THREE.MeshStandardMaterial({ color: 0x33454f, roughness: 0.25, metalness: 0.4 }),
  tire: new THREE.MeshStandardMaterial({ color: 0x26262a, roughness: 0.9 }),
};
// 夜晚发光材质（切换时引用替换）
const lampHeadNight = new THREE.MeshStandardMaterial({
  color: 0xffd9a0, emissive: 0xffb45e, emissiveIntensity: 2.4,
});
const windowLit = new THREE.MeshStandardMaterial({
  color: 0xffd9a0, emissive: 0xffb45e, emissiveIntensity: 1.8,
});
const litWindows = [];   // 夜晚需要点亮的窗户
const lampHeads = [];    // 路灯灯头
const lampGlows = [];    // 路灯光晕

function box(w, h, d, mat, x = 0, y = 0, z = 0, cast = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = cast; m.receiveShadow = true;
  scene.add(m);
  return m;
}
const glintMat = new THREE.MeshBasicMaterial({ color: 0xbfe3f2, transparent: true, opacity: 0.35 });
// 三棱柱屋顶：屋脊沿 X 轴
function prismRoof(w, h, d, mat) {
  const hw = w / 2, hd = d / 2;
  const A = [-hw, 0, -hd], B = [hw, 0, -hd], C = [hw, 0, hd];
  const D = [-hw, 0, hd], E = [-hw, h, 0], F = [hw, h, 0];
  const tris = [
    ...A, ...B, ...F, ...A, ...F, ...E,   // 南坡
    ...D, ...E, ...F, ...D, ...F, ...C,   // 北坡
    ...A, ...E, ...D,                      // 西山墙
    ...B, ...C, ...F,                      // 东山墙
  ];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(tris, 3));
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

function addWindow(parent, w, h, x, y, z, ry = 0, lit = false) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M.windowDay);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  parent.add(m);
  if (lit) litWindows.push(m);
  return m;
}

// 房子：方盒 + 棱柱屋顶 + 门窗，朝向 +Z 为正面
function makeHouse({ w = 5, d = 4, wallH = 2.6, roofH = 1.6, wall = 0xf1e7d3, roof = 0xa8503c, litRatio = 0.45 }) {
  const g = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: wall, roughness: 0.9 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, d), wallMat);
  body.position.y = wallH / 2;
  body.castShadow = true; body.receiveShadow = true;
  g.add(body);
  const roofMat = new THREE.MeshStandardMaterial({ color: roof, roughness: 0.85, flatShading: true, side: THREE.DoubleSide });
  const r = prismRoof(w + 0.7, roofH, d + 0.7, roofMat);
  r.position.y = wallH;
  g.add(r);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.6),
    new THREE.MeshStandardMaterial({ color: 0x5f3c20, roughness: 0.9 }));
  door.position.set(0, 0.8, d / 2 + 0.01);
  g.add(door);
  const n = Math.max(2, Math.round(w / 1.8));
  for (let i = 0; i < n; i++) {
    const x = -w / 2 + (w / n) * (i + 0.5);
    if (Math.abs(x) < 0.8) continue; // 给门让位
    addWindow(g, 0.7, 0.8, x, 1.6, d / 2 + 0.01, 0, rand() < litRatio);
    addWindow(g, 0.7, 0.8, x, 1.6, -d / 2 - 0.01, Math.PI, rand() < litRatio);
  }
  return g;
}

// ---------- 底座 / 草地 / 桌面 ----------
box(66, 3, 46, M.wood, 0, -1.5, 0, false).receiveShadow = true; // 木底座
// 草地
{
  const g = new THREE.Mesh(new THREE.PlaneGeometry(64, 44), M.grass);
  g.rotation.x = -Math.PI / 2;
  g.position.y = 0.02;
  g.receiveShadow = true;
  scene.add(g);
}
// 草地色块（手工感）
{
  const greens = [0x6d9c4e, 0x82b25e, 0x74a856];
  for (let i = 0; i < 9; i++) {
    const r = 2 + rand() * 2.4;
    const c = new THREE.Mesh(new THREE.CircleGeometry(r, 18),
      new THREE.MeshStandardMaterial({ color: greens[i % 3], roughness: 1 }));
    c.rotation.x = -Math.PI / 2;
    c.position.set(-28 + rand() * 56, 0.03, -19 + rand() * 38);
    c.receiveShadow = true;
    scene.add(c);
  }
}
// 桌面
{
  const t = new THREE.Mesh(new THREE.PlaneGeometry(500, 500),
    new THREE.MeshStandardMaterial({ color: 0x4a3b2c, roughness: 1 }));
  t.rotation.x = -Math.PI / 2;
  t.position.y = -3.02;
  t.receiveShadow = true;
  scene.add(t);
}
// 边框
box(66, 0.55, 1.4, M.woodDark, 0, 0.275, 23.2);
box(66, 0.55, 1.4, M.woodDark, 0, 0.275, -23.2);
box(1.4, 0.55, 46, M.woodDark, 33.2, 0.275, 0);
box(1.4, 0.55, 46, M.woodDark, -33.2, 0.275, 0);
// 河流穿过边框处的涵洞盖（水从下面流过）
box(2.4, 0.6, 9, M.woodDark, 32.6, 0.3, -4);
box(2.4, 0.6, 9, M.woodDark, -32.6, 0.3, -4);

// ---------- 河流（沿 X 向，z = -4，宽 7） ----------
{
  const w = new THREE.Mesh(new THREE.PlaneGeometry(64, 7), M.water);
  w.rotation.x = -Math.PI / 2;
  w.position.set(0, 0.06, -4);
  w.receiveShadow = true;
  scene.add(w);
  const glint = new THREE.Mesh(new THREE.PlaneGeometry(64, 1.6), glintMat);
  glint.rotation.x = -Math.PI / 2;
  glint.position.set(0, 0.09, -4.6);
  scene.add(glint);
  // 河岸沙带
  for (const z of [-7.9, -0.1]) {
    const b = new THREE.Mesh(new THREE.PlaneGeometry(64, 1.1), M.sand);
    b.rotation.x = -Math.PI / 2;
    b.position.set(0, 0.045, z);
    b.receiveShadow = true;
    scene.add(b);
  }
}

// ---------- 闭合轨道 ----------
const trackPts = [
  [-20, 12], [0, 13], [20, 12], [24.5, 0],
  [20, -12], [0, -13], [-20, -12], [-24.5, 0],
].map(([x, z]) => new THREE.Vector3(x, 0, z));
const curve = new THREE.CatmullRomCurve3(trackPts, true, 'centripetal');
const LOOP_LEN = curve.getLength();
const RAIL_Y = 0.32;

function offsetCurve(dist, segments = 400) {
  const pts = [];
  const p = new THREE.Vector3(), t = new THREE.Vector3();
  for (let i = 0; i < segments; i++) {
    const u = i / segments;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, t);
    const nx = -t.z, nz = t.x; // 水平法线
    pts.push(new THREE.Vector3(p.x + nx * dist, 0, p.z + nz * dist));
  }
  return new THREE.CatmullRomCurve3(pts, true);
}
// 道砟带
{
  const N = 400;
  const pos = [], idx = [];
  const p = new THREE.Vector3(), t = new THREE.Vector3();
  for (let i = 0; i <= N; i++) {
    const u = (i % N) / N;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, t);
    const nx = -t.z * 1.25, nz = t.x * 1.25;
    pos.push(p.x + nx, 0.1, p.z + nz, p.x - nx, 0.1, p.z - nz);
    if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, M.ballast);
  m.receiveShadow = true;
  scene.add(m);
}
// 轨枕
{
  const count = Math.floor(LOOP_LEN / 1.05);
  const geo = new THREE.BoxGeometry(1.9, 0.1, 0.45);
  const inst = new THREE.InstancedMesh(geo, M.sleeper, count);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  const p = new THREE.Vector3(), t = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < count; i++) {
    const u = i / count;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, t);
    q.setFromAxisAngle(up, Math.atan2(t.x, t.z));
    m4.compose(new THREE.Vector3(p.x, 0.16, p.z), q, s);
    inst.setMatrixAt(i, m4);
  }
  inst.receiveShadow = true;
  scene.add(inst);
}
// 双轨
for (const d of [-0.62, 0.62]) {
  const tube = new THREE.TubeGeometry(offsetCurve(d), 400, 0.07, 6, true);
  const m = new THREE.Mesh(tube, M.rail);
  m.position.y = RAIL_Y;
  scene.add(m);
}

// 铁路跨河桥（东西各一座）：侧梁 + 石墩
function railBridge(x) {
  const g = new THREE.Group();
  const u = nearestU(x, -4);
  const p = curve.getPointAt(u), t = curve.getTangentAt(u);
  const yaw = Math.atan2(t.x, t.z);
  g.position.set(p.x, 0, p.z);
  g.rotation.y = yaw;
  const beamMat = new THREE.MeshStandardMaterial({ color: 0x7a3b2e, roughness: 0.7 });
  for (const s of [-1.35, 1.35]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 11), beamMat);
    beam.position.set(s, 0.9, 0);
    beam.castShadow = true;
    g.add(beam);
  }
  for (const s of [-3.4, 3.4]) {
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 2.4, 10), M.stone);
    pier.position.set(0, -0.6, s);
    pier.castShadow = true;
    g.add(pier);
  }
  scene.add(g);
}
function nearestU(x, z, n = 2000) {
  const p = new THREE.Vector3();
  let best = 0, bd = Infinity;
  for (let i = 0; i < n; i++) {
    curve.getPointAt(i / n, p);
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < bd) { bd = d; best = i / n; }
  }
  return best;
}
railBridge(23.5);
railBridge(-23.5);

// ---------- 道路 ----------
function roadPlane(w, d, x, z) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), M.road);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.04, z);
  m.receiveShadow = true;
  scene.add(m);
}
roadPlane(52, 3.4, 0, 6);        // 主街
roadPlane(3.4, 11, 8, 11.5);     // 车站支路（穿过轨道，设平交道）
roadPlane(3.4, 17, -10, -2.5);   // 北岸路（穿过河流，走公路桥）
roadPlane(8, 3, 8, 17.2);        // 车站前广场
// 主街虚线
for (let x = -24; x <= 24; x += 4) {
  if (Math.abs(x - 8) < 2.6 || Math.abs(x + 10) < 2.6) continue; // 路口留白
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.22), M.roadLine);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.055, 6);
  scene.add(m);
}
// 公路桥（x = -10 跨河）
{
  const g = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 12.5),
    new THREE.MeshStandardMaterial({ color: 0x8a7a63, roughness: 0.9 }));
  deck.position.set(-10, 0.45, -3.5);
  deck.castShadow = true; deck.receiveShadow = true;
  g.add(deck);
  for (const s of [-1, 1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.75, 12.5), M.woodDark);
    rail.position.set(-10 + s * 2, 1.0, -3.5);
    rail.castShadow = true;
    g.add(rail);
  }
  for (const z of [-6, -1.5]) {
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.65, 2.2, 10), M.stone);
    pier.position.set(-10, -0.5, z);
    pier.castShadow = true;
    g.add(pier);
  }
  scene.add(g);
}
// 平交道：木板 + 十字交叉牌
{
  const plank = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.16, 2.6), M.wood);
  plank.position.set(8, 0.22, 12.85);
  plank.receiveShadow = true;
  scene.add(plank);
  const signMat = new THREE.MeshStandardMaterial({ color: 0xf1e7d3, roughness: 0.7 });
  for (const [x, z] of [[5.6, 14.6], [10.4, 11.2]]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.4, 8), M.lampPole);
    pole.position.set(x, 1.2, z);
    pole.castShadow = true;
    scene.add(pole);
    for (const a of [Math.PI / 4, -Math.PI / 4]) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.16, 0.06), signMat);
      b.position.set(x, 2.2, z);
      b.rotation.z = a;
      scene.add(b);
    }
  }
}

// ---------- 车站 ----------
const STATION = { x: 0, z: 12.9 };
{
  // 站台
  const plat = new THREE.Mesh(new THREE.BoxGeometry(16, 0.8, 2.4), M.stone);
  plat.position.set(0, 0.4, 15.6);
  plat.castShadow = true; plat.receiveShadow = true;
  scene.add(plat);
  // 站房
  const hall = makeHouse({ w: 11, d: 3.6, wallH: 3, roofH: 1.8, wall: 0xe8d9bd, roof: 0x4a6b8a, litRatio: 0.7 });
  hall.position.set(0, 0, 19.4);
  scene.add(hall);
  // 雨棚：平板 + 立柱
  const canopyMat = new THREE.MeshStandardMaterial({ color: 0x4a6b8a, roughness: 0.7 });
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(14, 0.15, 2.6), canopyMat);
  canopy.position.set(0, 2.9, 15.4);
  canopy.castShadow = true;
  scene.add(canopy);
  for (let x = -6; x <= 6; x += 3) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.1, 8), M.lampPole);
    post.position.set(x, 1.85, 16.3);
    post.castShadow = true;
    scene.add(post);
  }
  // 站牌
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 64;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#2e3a45'; ctx.fillRect(0, 0, 256, 64);
  ctx.fillStyle = '#f5ead0'; ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('STATION', 128, 34);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.85),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) }));
  sign.position.set(0, 2.35, 17.55);
  sign.rotation.y = Math.PI;
  scene.add(sign);
  // 长椅
  for (const x of [-4, 4]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.5), M.woodDark);
    bench.position.set(x, 1.05, 15.9);
    bench.castShadow = true;
    scene.add(bench);
  }
  // 站台围栏
  for (let x = -7.5; x <= 7.5; x += 1.5) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), M.wallWhite);
    post.position.set(x, 1.25, 16.75);
    scene.add(post);
  }
  const railBar = new THREE.Mesh(new THREE.BoxGeometry(15.6, 0.1, 0.1), M.wallWhite);
  railBar.position.set(0, 1.65, 16.75);
  scene.add(railBar);
}

// ---------- 建筑群 ----------
function place(g, x, z, ry = 0) {
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  scene.add(g);
  return g;
}
// 主街商铺（北侧一排）
const shopColors = [0xd98f6a, 0x8fb8a8, 0xd9c27a];
for (let i = 0; i < 3; i++) {
  const shop = makeHouse({ w: 5, d: 3, wallH: 2.8, roofH: 1.2, wall: shopColors[i], roof: 0x5a4a3a, litRatio: 0.8 });
  place(shop, -6 + i * 6, 2.2);
  // 雨篷
  const awn = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.1, 1.2),
    new THREE.MeshStandardMaterial({ color: 0xf1e7d3, roughness: 0.9 }));
  awn.position.set(-6 + i * 6, 2.0, 4.35);
  awn.rotation.x = 0.25;
  awn.castShadow = true;
  scene.add(awn);
}
// 教堂
{
  const g = new THREE.Group();
  const nave = makeHouse({ w: 4.5, d: 7, wallH: 3, roofH: 2, wall: 0xefe6d2, roof: 0x6a4a3a, litRatio: 0.5 });
  g.add(nave);
  const towerMat = new THREE.MeshStandardMaterial({ color: 0xefe6d2, roughness: 0.9 });
  const tower = new THREE.Mesh(new THREE.BoxGeometry(2.2, 6.5, 2.2), towerMat);
  tower.position.set(0, 3.25, 4.2);
  tower.castShadow = true;
  g.add(tower);
  const spire = new THREE.Mesh(new THREE.ConeGeometry(1.7, 3, 8),
    new THREE.MeshStandardMaterial({ color: 0x4a5a6a, roughness: 0.7, flatShading: true }));
  spire.position.set(0, 8, 4.2);
  spire.castShadow = true;
  g.add(spire);
  addWindow(g, 0.9, 1.6, 0, 4.6, 5.32, 0, true);
  place(g, -17, -1, 0.15);
}
// 镇公所
{
  const hall = makeHouse({ w: 7, d: 4.5, wallH: 3.4, roofH: 2, wall: 0xe3d3ae, roof: 0x7a3b2e, litRatio: 0.6 });
  place(hall, 16.5, 0.5, -0.1);
}
// 住宅
place(makeHouse({ w: 4.6, d: 3.8, wallH: 2.6, roofH: 1.7, wall: 0xf3e3c2, roof: 0xa8503c }), -18, 10.2, 0.05);
place(makeHouse({ w: 4.2, d: 3.6, wallH: 2.5, roofH: 1.5, wall: 0xd9e4ec, roof: 0x5a6a7a }), 18, 10.2, -0.06);
place(makeHouse({ w: 4.4, d: 3.6, wallH: 2.6, roofH: 1.6, wall: 0xeed9c2, roof: 0x86592e }), -18.5, -12.5, 0.1);
place(makeHouse({ w: 4.8, d: 3.8, wallH: 2.7, roofH: 1.7, wall: 0xf1e7d3, roof: 0x94502e }), -1, -13, -0.05);
place(makeHouse({ w: 4.3, d: 3.7, wallH: 2.6, roofH: 1.6, wall: 0xdfe8d2, roof: 0x6a5a48 }), 13, -12.5, 0.08);

// ---------- 树木 ----------
function pineTree(s) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.2 * s, 0.9 * s, 7), M.trunk);
  trunk.position.y = 0.45 * s;
  trunk.castShadow = true;
  g.add(trunk);
  for (let i = 0; i < 2; i++) {
    const c = new THREE.Mesh(new THREE.ConeGeometry((1.15 - i * 0.35) * s, 1.3 * s, 8), M.pine);
    c.position.y = (1.3 + i * 0.85) * s;
    c.castShadow = true;
    g.add(c);
  }
  return g;
}
function leafTree(s) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13 * s, 0.18 * s, 1.1 * s, 7), M.trunk);
  trunk.position.y = 0.55 * s;
  trunk.castShadow = true;
  g.add(trunk);
  const top = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15 * s, 0), M.leaf);
  top.position.y = 1.8 * s;
  top.scale.y = 0.85;
  top.castShadow = true;
  g.add(top);
  return g;
}
{
  // 排除区：轨道、河流、道路、建筑
  const trackSamples = [];
  const pv = new THREE.Vector3();
  for (let i = 0; i < 200; i++) { curve.getPointAt(i / 200, pv); trackSamples.push([pv.x, pv.z]); }
  const houses = [
    [0, 19.4, 7, 3], [-6, 2.2, 3.5, 2.5], [0, 2.2, 3.5, 2.5], [6, 2.2, 3.5, 2.5],
    [-17, -1, 4, 5], [16.5, 0.5, 4.5, 3], [-18, 10.2, 3.5, 3], [18, 10.2, 3.5, 3],
    [-18.5, -12.5, 3.5, 3], [-1, -13, 3.5, 3], [13, -12.5, 3.5, 3],
  ];
  const clear = (x, z) => {
    if (Math.abs(z + 4) < 5.6) return false;                       // 河
    if (Math.abs(z - 6) < 3.2 && Math.abs(x) < 27) return false;   // 主街
    if (Math.abs(x - 8) < 3 && z > 4 && z < 19) return false;       // 支路
    if (Math.abs(x + 10) < 3 && z > -12 && z < 7) return false;     // 北岸路
    if (Math.abs(z - 12.9) < 3.4 && Math.abs(x) < 27) return false;// 轨道南段
    if (x > 3 && x < 13 && z > 14.5 && z < 19) return false;        // 广场
    if (Math.abs(x) < 9 && z > 13 && z < 22) return false;          // 车站
    for (const [hx, hz, hw, hd] of houses) {
      if (Math.abs(x - hx) < hw + 1.6 && Math.abs(z - hz) < hd + 1.6) return false;
    }
    for (const [tx, tz] of trackSamples) {
      const dx = x - tx, dz = z - tz;
      if (dx * dx + dz * dz < 9.5) return false;
    }
    return true;
  };
  let placedCount = 0, guard = 0;
  while (placedCount < 30 && guard++ < 600) {
    const x = -29 + rand() * 58, z = -19 + rand() * 38;
    if (!clear(x, z)) continue;
    const s = 0.8 + rand() * 0.7;
    place(rand() < 0.55 ? pineTree(s) : leafTree(s), x, z, rand() * Math.PI * 2);
    placedCount++;
  }
}

// ---------- 路灯 ----------
function glowTexture() {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 64;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  g.addColorStop(0, 'rgba(255,210,140,0.9)');
  g.addColorStop(1, 'rgba(255,210,140,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}
const glowTex = glowTexture();
function makeLamp(x, z) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.1, 8), M.lampPole);
  pole.position.y = 1.55;
  pole.castShadow = true;
  g.add(pole);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), M.lampHeadDay);
  head.position.y = 3.2;
  g.add(head);
  lampHeads.push(head);
  const spr = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.9,
  }));
  spr.scale.set(2.4, 2.4, 1);
  spr.position.y = 3.2;
  spr.visible = false;
  g.add(spr);
  lampGlows.push(spr);
  g.position.set(x, 0, z);
  scene.add(g);
}
for (const x of [-20, -12, -4, 4, 12, 20]) makeLamp(x, 8.2);
makeLamp(5.5, 16.5);
makeLamp(-7.5, 2.5);

// ---------- 列车（车头 + 两节车厢，各自沿轨道定位） ----------
const TRAIN_Y = RAIL_Y + 0.07 + 0.35; // 轨顶 + 轮半径
const wheelSets = []; // {mesh, r}
function addWheel(parent, x, z, r) {
  const geo = new THREE.CylinderGeometry(r, r, 0.16, 14);
  geo.rotateZ(Math.PI / 2);
  const w = new THREE.Mesh(geo, M.tire);
  w.position.set(x, 0, z);
  parent.add(w);
  wheelSets.push({ mesh: w, r });
}
function makeLoco() {
  const g = new THREE.Group();
  const green = new THREE.MeshStandardMaterial({ color: 0x2e6b46, roughness: 0.55 });
  const red = new THREE.MeshStandardMaterial({ color: 0x9c332a, roughness: 0.6 });
  const black = new THREE.MeshStandardMaterial({ color: 0x2b2b2e, roughness: 0.7 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.35, metalness: 0.7 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, 3.8), red);
  frame.position.y = 0.35; frame.castShadow = true; g.add(frame);
  const boiler = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 2.2, 16), green);
  boiler.geometry.rotateX(Math.PI / 2);
  boiler.position.set(0, 1.15, 0.55); boiler.castShadow = true; g.add(boiler);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.5, 1.25), green);
  cab.position.set(0, 1.25, -1.15); cab.castShadow = true; g.add(cab);
  const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.14, 1.55), black);
  cabRoof.position.set(0, 2.07, -1.15); cabRoof.castShadow = true; g.add(cabRoof);
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 0.62, 10), black);
  chimney.position.set(0, 2.0, 1.35); chimney.castShadow = true; g.add(chimney);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), brass);
  dome.position.set(0, 1.85, 0.55); g.add(dome);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0xfff2cf, emissive: 0xffd98a, emissiveIntensity: 0.7 }));
  lamp.position.set(0, 1.35, 1.72); g.add(lamp);
  const catcher = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 0.2), red);
  catcher.position.set(0, 0.25, 2.0); catcher.rotation.x = 0.5; g.add(catcher);
  for (const sx of [-1.0, 1.0]) for (const z of [1.2, 0, -1.2]) addWheel(g, sx, z, 0.35);
  return g;
}
function makeCoach(color) {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.35, 3.2), bodyMat);
  body.position.y = 1.05; body.castShadow = true; g.add(body);
  const bandMat = new THREE.MeshStandardMaterial({ color: 0xf3e6c8, roughness: 0.6 });
  const band = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.5, 2.9), bandMat);
  band.position.y = 1.35; g.add(band);
  // 车窗：深色小方块，夜晚部分点亮
  for (const s of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const lit = rand() < 0.6;
      const w = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.42), M.windowDay);
      w.position.set(s * 1.03, 1.35, -0.95 + i * 0.95);
      w.rotation.y = s > 0 ? Math.PI / 2 : -Math.PI / 2;
      g.add(w);
      if (lit) litWindows.push(w);
    }
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.16, 3.4),
    new THREE.MeshStandardMaterial({ color: 0xd8d2c2, roughness: 0.8 }));
  roof.position.y = 1.8; roof.castShadow = true; g.add(roof);
  for (const sx of [-1.0, 1.0]) for (const z of [1.0, -1.0]) addWheel(g, sx, z, 0.32);
  return g;
}
const loco = makeLoco();
const coach1 = makeCoach(0x9c332a);
const coach2 = makeCoach(0x2f5d8a);
scene.add(loco, coach1, coach2);
const OFF1 = 4.2, OFF2 = 8.0;

// 烟雾：7 个循环上升的气团
const puffs = [];
for (let i = 0; i < 7; i++) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xf2ede4, transparent: true, opacity: 0 }));
  m.visible = false;
  scene.add(m);
  puffs.push({ mesh: m, life: -1 });
}
let puffTimer = 0;
const _chimney = new THREE.Vector3();
function updateSmoke(dt, emitting) {
  if (emitting) {
    puffTimer -= dt;
    if (puffTimer <= 0) {
      puffTimer = 0.28;
      const p = puffs.find((q) => q.life < 0);
      if (p) {
        loco.updateWorldMatrix(true, false);
        _chimney.set(0, 2.3, 1.35).applyMatrix4(loco.matrixWorld);
        p.mesh.position.copy(_chimney);
        p.life = 0;
        p.mesh.visible = true;
      }
    }
  }
  for (const p of puffs) {
    if (p.life < 0) continue;
    p.life += dt;
    const k = p.life / 1.6;
    if (k >= 1) { p.life = -1; p.mesh.visible = false; continue; }
    p.mesh.position.y += dt * 1.4;
    p.mesh.scale.setScalar(1 + k * 2.2);
    p.mesh.material.opacity = 0.45 * (1 - k);
  }
}

// ---------- 运行状态 ----------
const BASE_SPEED = 7; // m/s @1×
const DWELL_TIME = 2; // 到站停靠秒数
const state = {
  running: true,
  speed: 1,
  mode: 'day',
  s: 0,            // 车头累计弧长
  dwelling: false,
  dwellT: 0,
  nextStop: 0,
};
// 车站停靠点：轨道上离站台中心最近处的弧长
const stationU = nearestU(STATION.x, STATION.z);
const S_STATION = stationU * LOOP_LEN;
// 初始车位：东直道（看得见、离站稍远）
state.s = nearestU(24, 2) * LOOP_LEN;
state.nextStop = S_STATION > state.s ? S_STATION : S_STATION + LOOP_LEN;
const S_HOME = state.s;

const _p = new THREE.Vector3(), _t = new THREE.Vector3();
function placeCar(group, s) {
  const u = (((s % LOOP_LEN) + LOOP_LEN) % LOOP_LEN) / LOOP_LEN;
  curve.getPointAt(u, _p);
  curve.getTangentAt(u, _t);
  group.position.set(_p.x, TRAIN_Y, _p.z);
  group.rotation.set(0, Math.atan2(_t.x, _t.z), 0);
}
function updateTrain(dt) {
  if (!state.running) return;
  if (state.dwelling) {
    state.dwellT -= dt; // 暂停时不进入此分支，到站计时随之暂停
    if (state.dwellT <= 0) {
      state.dwelling = false;
      state.nextStop += LOOP_LEN;
    }
    return;
  }
  state.s += BASE_SPEED * state.speed * dt;
  if (state.s >= state.nextStop) {
    state.s = state.nextStop;
    state.dwelling = true;
    state.dwellT = DWELL_TIME;
  }
  for (const w of wheelSets) w.mesh.rotation.x += (BASE_SPEED * state.speed * dt) / w.r;
  placeCar(loco, state.s);
  placeCar(coach1, state.s - OFF1);
  placeCar(coach2, state.s - OFF2);
}
placeCar(loco, state.s);
placeCar(coach1, state.s - OFF1);
placeCar(coach2, state.s - OFF2);

// ---------- 白天 / 夜晚 ----------
function applyMode(mode) {
  state.mode = mode;
  const night = mode === 'night';
  if (night) {
    scene.background.set(0x0e1626);
    scene.fog.color.set(0x0e1626);
    sun.color.set(0x8fa8ff); sun.intensity = 0.5;
    hemi.intensity = 0.25;
    renderer.toneMappingExposure = 1.0;
  } else {
    scene.background.set(0xf2c194);
    scene.fog.color.set(0xf2c194);
    sun.color.set(0xffbe78); sun.intensity = 2.6;
    hemi.intensity = 0.75;
    renderer.toneMappingExposure = 1.15;
  }
  for (const h of lampHeads) h.material = night ? lampHeadNight : M.lampHeadDay;
  for (const g of lampGlows) g.visible = night;
  for (const w of litWindows) w.material = night ? windowLit : M.windowDay;
  for (const l of nightLights) l.intensity = night ? 55 : 0;
  glintMat.opacity = night ? 0.08 : 0.35;
  btnDay.textContent = night ? '☀️ 白天' : '🌙 夜晚';
}

// ---------- 界面 ----------
const btnRun = document.getElementById('btnRun');
const btnReset = document.getElementById('btnReset');
const btnDay = document.getElementById('btnDay');
const speedInput = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');
const dot = document.getElementById('dot');
const statusText = document.getElementById('statusText');
let lastStatus = '';

btnRun.addEventListener('click', () => {
  state.running = !state.running;
  btnRun.textContent = state.running ? '⏸ 暂停' : '▶ 运行';
});
btnReset.addEventListener('click', () => {
  state.s = S_HOME;
  state.dwelling = false;
  state.dwellT = 0;
  state.nextStop = S_STATION > state.s ? S_STATION : S_STATION + LOOP_LEN;
  state.speed = 1;
  speedInput.value = '1';
  speedVal.textContent = '1.0×';
  if (!state.running) {
    state.running = true;
    btnRun.textContent = '⏸ 暂停';
  }
  camera.position.copy(CAM_HOME);
  controls.target.copy(TARGET_HOME);
  controls.update();
  placeCar(loco, state.s);
  placeCar(coach1, state.s - OFF1);
  placeCar(coach2, state.s - OFF2);
});
btnDay.addEventListener('click', () => applyMode(state.mode === 'day' ? 'night' : 'day'));
speedInput.addEventListener('input', () => {
  state.speed = parseFloat(speedInput.value);
  speedVal.textContent = `${state.speed.toFixed(2).replace(/0$/, '')}×`;
});
function refreshStatus() {
  let txt, cls = '';
  if (state.dwelling && state.running) { txt = '到站停靠…'; cls = 'dwell'; }
  else if (!state.running) { txt = '已暂停'; cls = 'paused'; }
  else { txt = `运行中 · ${speedVal.textContent}`; }
  if (txt !== lastStatus) {
    lastStatus = txt;
    statusText.textContent = txt;
    dot.className = cls;
  }
}

// ---------- 主循环 ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  updateTrain(dt);
  updateSmoke(dt, state.running);
  refreshStatus();
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
