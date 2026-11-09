import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7c889);
scene.fog = new THREE.Fog(0xe8b07e, 90, 180);

const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.1, 400);
const CAM_HOME = new THREE.Vector3(0, 46, 52);
const TARGET_HOME = new THREE.Vector3(0, 1.0, 0);
camera.position.copy(CAM_HOME);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(TARGET_HOME);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 18;
controls.maxDistance = 110;
controls.maxPolarAngle = Math.PI * 0.46;

// ---------- 材质 ----------
function canvasTex(draw, rx = 1, ry = 1) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  draw(g, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
const woodMat = new THREE.MeshStandardMaterial({
  map: canvasTex((g) => {
    g.fillStyle = '#8a5a30'; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = 'rgba(60,36,16,0.55)'; g.lineWidth = 2;
    for (let y = 0; y < 256; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(256, y); g.stroke(); }
    g.strokeStyle = 'rgba(120,80,40,0.5)';
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * 256;
      g.beginPath(); g.moveTo(0, y);
      g.bezierCurveTo(80, y + 3, 170, y - 3, 256, y); g.stroke();
    }
  }, 2, 2),
  roughness: 0.9, metalness: 0.02,
});
const grassMat = new THREE.MeshStandardMaterial({
  map: canvasTex((g) => {
    g.fillStyle = '#7a9a4e'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 3600; i++) {
      g.fillStyle = Math.random() < 0.5 ? '#6c8c42' : '#8aa85e';
      g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  }, 10, 8),
  roughness: 1,
});
const waterMat = new THREE.MeshStandardMaterial({
  color: 0x3f88a8, roughness: 0.18, metalness: 0.35, emissive: 0x06222e, emissiveIntensity: 0.5,
});
const railMat = new THREE.MeshStandardMaterial({ color: 0xb9c0c8, metalness: 0.9, roughness: 0.35 });
const tieMat = new THREE.MeshStandardMaterial({ color: 0x5a4128, roughness: 1 });
const ballastMat = new THREE.MeshStandardMaterial({ color: 0x8f857a, roughness: 1 });
const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xa89070, roughness: 0.85 });
const roofMats = [0x9e4038, 0x6b5a48, 0x4a5d7a, 0x7c5a3c].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })
);
const wallMats = [0xf0e2c8, 0xe8d3ae, 0xdcc8a8, 0xead9c0, 0xe2cfae].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 })
);
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 1 });
const leafMats = [0x4f7d3a, 0x5f8f42, 0x6f9a4c].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 1 }));
const lampPoleMat = new THREE.MeshStandardMaterial({ color: 0x3a3a40, roughness: 0.6, metalness: 0.5 });

function shadowed(mesh) { mesh.castShadow = true; mesh.receiveShadow = true; return mesh; }

// ---------- 舞台：木质底座 ----------
const table = new THREE.Group();
scene.add(table);
const boardTop = shadowed(new THREE.Mesh(new THREE.BoxGeometry(88, 4.2, 68), woodMat));
boardTop.position.y = -2.1;
table.add(boardTop);
const apron = new THREE.Mesh(
  new THREE.BoxGeometry(91, 1.0, 71),
  new THREE.MeshStandardMaterial({ color: 0x6e4524, roughness: 0.85 })
);
apron.position.y = -4.5;
table.add(apron);
const trim = shadowed(new THREE.Mesh(
  new THREE.BoxGeometry(89.6, 0.9, 69.6),
  new THREE.MeshStandardMaterial({ color: 0x4a2f18, roughness: 0.7 })
));
trim.position.y = -0.45;
table.add(trim);
const ground = shadowed(new THREE.Mesh(new THREE.BoxGeometry(86, 0.5, 66), grassMat));
ground.position.y = 0.25;
table.add(ground);

// ---------- 闭合轨道：圆角矩形 ----------
function roundedRectPoints(x0, z0, x1, z1, r, segPerCorner = 18) {
  const pts = [];
  const corners = [
    [x1 - r, z0 + r, -Math.PI / 2],
    [x0 + r, z0 + r, Math.PI],
    [x0 + r, z1 - r, Math.PI / 2],
    [x1 - r, z1 - r, 0],
  ];
  for (const [cx, cz, start] of corners) {
    for (let i = 0; i < segPerCorner; i++) {
      const a = start + (i / segPerCorner) * (Math.PI / 2);
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, 0, cz + Math.sin(a) * r));
    }
  }
  return pts;
}
const trackPts = roundedRectPoints(-26.5, -20, 26.5, 20, 13, 22);
const curve = new THREE.CatmullRomCurve3(trackPts, true);
// 桥上抬高
const oldGetPoint = curve.getPoint.bind(curve);
curve.getPoint = (t, target = new THREE.Vector3()) => {
  const p = oldGetPoint(t, target);
  p.y = bridgeHeight(p.x, p.z);
  return p;
};
const oldGetPointAt = curve.getPointAt.bind(curve);
curve.getPointAt = (u, target = new THREE.Vector3()) => {
  const p = oldGetPointAt(u, target);
  p.y = bridgeHeight(p.x, p.z);
  return p;
};
function bridgeHeight(x, z) {
  let y = 0;
  if (x < -26.5 + 0.1) {
    const d = Math.abs(x + 26.5);
    if (d < 5.5) y = Math.max(y, Math.sin((d / 5.5) * Math.PI) * 2.2);
  }
  if (x > 26.5 - 0.1) {
    const d = Math.abs(x - 26.5);
    if (d < 5.5) y = Math.max(y, Math.sin((d / 5.5) * Math.PI) * 2.2);
  }
  return y;
}
const trackLength = curve.getLength();

// 路砟带（宽条带，高度分开：地面高程在地表上，桥段跟随轨道抬高）
{
  const pts = curve.getSpacedPoints(320);
  const N2 = pts.length - 1;
  const pos = [];
  const idx = [];
  for (let i = 0; i <= N2; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % N2];
    const tx = q.x - p.x, tz = q.z - p.z;
    const tl = Math.hypot(tx, tz) || 1;
    const nx = -tz / tl, nz = tx / tl;
    const half = 2.0;
    pos.push(p.x - nx * half, 0.62 + p.y, p.z - nz * half);
    pos.push(p.x + nx * half, 0.62 + p.y, p.z + nz * half);
    if (i < N2) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const bg = new THREE.BufferGeometry();
  bg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  bg.setIndex(idx);
  bg.computeVertexNormals();
  const ballast = new THREE.Mesh(bg, ballastMat);
  ballast.receiveShadow = true;
  scene.add(ballast);
}
// 站台底座
{
  const plat = shadowed(new THREE.Mesh(new THREE.BoxGeometry(16, 0.35, 2.0), new THREE.MeshStandardMaterial({ color: 0xc0ac86, roughness: 1 })));
  plat.position.set(12, 0.68, -20.0);
  scene.add(plat);
}
// 钢轨（双轨）
for (const off of [-0.6, 0.6]) {
  const pts = [];
  const frames = curve.computeFrenetFrames(240, true);
  const spaced = curve.getSpacedPoints(240);
  for (let i = 0; i < spaced.length; i++) {
    const n = frames.normals[i] ? frames.normals[i].clone() : new THREE.Vector3(1, 0, 0);
    n.y = 0; n.normalize();
    const p = spaced[i].clone().addScaledVector(n, off);
    p.y += 0.55;
    pts.push(p);
  }
  const railCurve = new THREE.CatmullRomCurve3(pts, true);
  const rail = shadowed(new THREE.Mesh(new THREE.TubeGeometry(railCurve, 360, 0.09, 8, true), railMat));
  scene.add(rail);
}
// 枕木
{
  const tieGeo = new THREE.BoxGeometry(2.6, 0.14, 0.7);
  const N = 240;
  const ties = new THREE.InstancedMesh(tieGeo, tieMat, N);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < N; i++) {
    const t = (i / N) % 1;
    const p = curve.getPointAt(t);
    const tan = curve.getTangentAt(t); tan.y = 0; tan.normalize();
    const yaw = Math.atan2(tan.x, tan.z);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    m.compose(new THREE.Vector3(p.x, 0.6 + p.y, p.z), q, s);
    ties.setMatrixAt(i, m);
  }
  ties.castShadow = true; ties.receiveShadow = true;
  scene.add(ties);
}

//（桥面与轨面贴合：桥墩在桥下，桥面高度由轨道高程决定）
// ---------- 河流与桥梁（平行于铁路走廊的跨河石桥）----------
const river = new THREE.Mesh(new THREE.PlaneGeometry(90, 10), waterMat);
river.rotation.x = -Math.PI / 2;
river.position.set(0, 0.52, 0);
river.receiveShadow = true;
scene.add(river);
// 河岸石砌
for (const sz of [-1, 1]) {
  const bank = shadowed(new THREE.Mesh(new THREE.BoxGeometry(86, 0.5, 1.2), bridgeMat));
  bank.position.set(0, 0.5, sz * 5.0);
  scene.add(bank);
}

function makeBridge(cx) {
  const grp = new THREE.Group();
  // 桥面：按轨道高程拼 segments（两段拱形桥面）
  const segX = [-4, -2, 0, 2, 4];
  for (const dx of segX) {
    const x = cx + dx;
    const y = 0.72 + bridgeHeight(x, 0);
    const seg = shadowed(new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 5.2), bridgeMat));
    seg.position.set(x, y, 0);
    grp.add(seg);
  }
  const railL = shadowed(new THREE.Mesh(new THREE.BoxGeometry(17, 0.5, 0.3), bridgeMat));
  railL.position.set(cx, 1.5, 2.55);
  grp.add(railL);
  const railR = railL.clone();
  railR.position.z = -2.55;
  grp.add(railR);
  for (const sx of [-1, 1]) {
    const arch = shadowed(new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.4, 8, 16, Math.PI), bridgeMat));
    arch.position.set(cx + sx * 3.5, 0.65, 1.2);
    arch.rotation.z = Math.PI;
    grp.add(arch);
  }
  const pier = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 4.0), bridgeMat));
  pier.position.set(cx, 0.2, 0);
  grp.add(pier);
  return grp;
}
scene.add(makeBridge(-26.5));
scene.add(makeBridge(26.5));

// ---------- 道路（联系车站与各建筑区）----------
function straightRoad(x0, z0, x1, z1, w = 2.6) {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const road = shadowed(new THREE.Mesh(new THREE.PlaneGeometry(w, len), new THREE.MeshStandardMaterial({ color: 0x6e6459, roughness: 1 })));
  road.rotation.x = -Math.PI / 2;
  road.rotation.z = -Math.atan2(x1 - x0, z1 - z0);
  road.position.set((x0 + x1) / 2, 0.53, (z0 + z1) / 2);
  scene.add(road);
}
function curvedRoad(points, w = 2.2) {
  const c = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], 0.55, p[1])));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(c, 40, w / 2, 8, false), new THREE.MeshStandardMaterial({ color: 0x75685a, roughness: 1 }));
  tube.scale.y = 0.08;
  tube.position.y = 0.51;
  tube.receiveShadow = true;
  scene.add(tube);
}
straightRoad(-20, -22, 20, -22, 3.0);          // 车站前大街
straightRoad(-8, -22, -8, -15);                  // 车站 → 镇中心
straightRoad(14, -22, 14, -15);
straightRoad(-8, -15, 14, -15);
curvedRoad([[-8, -15], [8, -14], [18, -11], [22, -7]]);
curvedRoad([[14, -25.5], [19, -20], [22, -15], [20, -9]]);
straightRoad(-2, -7, -2, -18);                    // 小南街（避开桥梁 x 位置）
straightRoad(2, -7, 2, -18);

// ---------- 建筑 ----------
const windowMats = [];
function makeWindowMat() {
  const mat = new THREE.MeshStandardMaterial({ color: 0x2e4a5a, emissive: 0x000000, roughness: 0.3, metalness: 0.4 });
  windowMats.push(mat);
  return mat;
}
function addHouse(x, z, w = 3, d = 2.6, h = 2.4, rotY = 0, wallIdx = null, roofIdx = null) {
  const grp = new THREE.Group();
  const wall = wallMats[wallIdx ?? Math.floor(Math.random() * wallMats.length)];
  const roof = roofMats[roofIdx ?? Math.floor(Math.random() * roofMats.length)];
  const body = shadowed(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wall));
  body.position.y = h / 2 + 0.5;
  grp.add(body);
  const roofMesh = shadowed(new THREE.Mesh(
    new THREE.ConeGeometry(Math.max(w, d) * 0.72, 1.3, 4), roof
  ));
  roofMesh.position.y = h + 1.15;
  roofMesh.rotation.y = Math.PI / 4;
  roofMesh.scale.x = w / Math.max(w, d);
  roofMesh.scale.z = d / Math.max(w, d);
  grp.add(roofMesh);
  const chimney = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.4), new THREE.MeshStandardMaterial({ color: 0x9a6a4a, roughness: 1 })));
  chimney.position.set(w * 0.25, h + 1.1, 0);
  grp.add(chimney);
  // 门和窗
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.9 });
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.0), doorMat);
  door.position.set(0, 1.0, d / 2 + 0.02);
  grp.add(door);
  const wm = makeWindowMat();
  for (const sx of [-w * 0.3, w * 0.3]) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.55), wm);
    win.position.set(sx, 1.55, d / 2 + 0.02);
    grp.add(win);
  }
  grp.position.set(x, 0.5, z);
  grp.rotation.y = rotY;
  scene.add(grp);
  return grp;
}
// 站区（北侧，站台后一排）
addHouse(-22, -28.5, 3.4, 3, 2.8, 0, 0, 0);
addHouse(-18, -29, 3, 2.6, 2.4, 0, 1, 1);
addHouse(18, -29, 3, 2.6, 2.4, Math.PI, 3, 1);
addHouse(22, -28.5, 3.4, 3, 2.8, Math.PI, 4, 0);
// 站前广场两侧
addHouse(-12, -24.5, 2.8, 2.6, 2.2, Math.PI / 2, 2, 0);
addHouse(12, -24.5, 2.8, 2.6, 2.2, -Math.PI / 2, 3, 2);
// 镇中心（南北轴两侧）
addHouse(-11.5, -17, 3, 2.6, 2.4, Math.PI / 2, 1, 0);
addHouse(17.5, -17, 3, 2.6, 2.4, -Math.PI / 2, 0, 1);
addHouse(17.5, -20, 2.6, 2.4, 2.0, -Math.PI / 2, 2, 2);
// 河边小建筑（桥头以外的安全距离）
addHouse(-4, 12, 2.8, 2.4, 2.2, 0, 0, 2);
addHouse(4, 12, 2.8, 2.4, 2.2, 0, 1, 0);
// 南侧
addHouse(-18, 26, 3, 2.6, 2.4, 0, 2, 1);
addHouse(-14, 27, 2.8, 2.4, 2.2, 0, 3, 0);
addHouse(14, 26, 3, 2.6, 2.4, 0, 1, 2);
addHouse(18, 27, 2.8, 2.4, 2.2, 0, 4, 3);
addHouse(-8, 24, 2.6, 2.4, 2.0, 0, 0, 3);
addHouse(8, 24, 2.6, 2.4, 2.0, 0, 2, 1);
addHouse(-22, 24, 2.8, 2.4, 2.2, 0, 1, 0);
addHouse(22, 24, 2.8, 2.4, 2.2, 0, 3, 2);
addHouse(-6, 28, 2.6, 2.4, 2.0, 0, 2, 0);
addHouse(6, 28, 2.6, 2.4, 2.0, 0, 4, 1);

// ---------- 车站 ----------
const stationU = (() => {
  // 在北边直道上找离 z=-23.5 最近的 u
  let best = 0, bd = Infinity;
  for (let i = 0; i <= 400; i++) {
    const t = i / 400;
    const p = curve.getPointAt(t);
    if (Math.abs(p.z + 20.0) < bd && Math.abs(p.x - 12) < 5) { bd = Math.abs(p.z + 23.5); best = t; }
  }
  return best;
})();
const stationP = curve.getPointAt(stationU);
console.log('[station]', stationU, stationP.x, stationP.z);
{
  const grp = new THREE.Group();
  const stWall = new THREE.MeshStandardMaterial({ color: 0xe8d8b8, roughness: 0.9 });
  const stRoof = new THREE.MeshStandardMaterial({ color: 0x9a4034, roughness: 0.7 });
  const main = shadowed(new THREE.Mesh(new THREE.BoxGeometry(9.5, 3.2, 4.2), stWall));
  main.position.set(stationP.x, 0.5 + 1.6, stationP.z - 10);
  grp.add(main);
  const roof = shadowed(new THREE.Mesh(new THREE.ConeGeometry(7.2, 1.9, 4), stRoof));
  roof.position.set(stationP.x, 0.5 + 3.2 + 0.9, stationP.z - 10);
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.35, 1, 0.62);
  grp.add(roof);
  // 站台
  const plat = shadowed(new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 1.6), new THREE.MeshStandardMaterial({ color: 0xb8a888, roughness: 1 })));
  plat.position.set(stationP.x, 0.95, stationP.z - 4.6);
  grp.add(plat);
  // 顶棚四柱
  for (const dx of [-4.5, 0, 4.5]) {
    const col = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.6, 0.25), new THREE.MeshStandardMaterial({ color: 0x4a4a52, roughness: 0.6 })));
    col.position.set(stationP.x + dx, 1.8, stationP.z - 3.8);
    grp.add(col);
  }
  const canopy = shadowed(new THREE.Mesh(new THREE.BoxGeometry(13, 0.18, 2.6), stRoof));
  canopy.position.set(stationP.x, 2.65, stationP.z - 3.8);
  grp.add(canopy);
  // 站名牌（发光）
  const signMat = new THREE.MeshStandardMaterial({ color: 0x2a2a35, emissive: 0x000000, roughness: 0.6 });
  const sign = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.6, 0.15), signMat);
  sign.position.set(stationP.x, 2.3, stationP.z - 3.45);
  grp.add(sign);
  grp.userData.signMat = signMat;
  scene.add(grp);
  window.__stationSignMat = signMat;
}

// ---------- 植被 / 路灯 / 小件 ----------
function tree(x, z, s = 1) {
  const grp = new THREE.Group();
  const trunk = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.18 * s, 0.9 * s, 8), trunkMat));
  trunk.position.y = 0.45 * s + 0.5;
  grp.add(trunk);
  const lm = leafMats[Math.floor(Math.random() * leafMats.length)];
  const c = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.85 * s, 10, 8), lm));
  c.position.y = (0.9 + 0.55) * s + 0.5;
  grp.add(c);
  const c2 = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.6 * s, 8, 6), lm));
  c2.position.set(0.4 * s, (0.9 + 0.3) * s + 0.5, 0.3 * s);
  grp.add(c2);
  grp.position.set(x, 0.5, z);
  scene.add(grp);
}
const treeSpots = [
  [-36, -12], [-36, -4], [-36, 4], [-36, 8], [-34, 14], [-32, -16],
  [36, -10], [36, -2], [36, 6], [34, 14], [32, -18],
  [-8, 8], [8, 8], [-8, 18], [8, 18], [-20, 8], [20, 8],
  [-20, -12], [20, -12], [-4, 16], [4, 16], [-12, 12], [12, 12],
  [-30, 10], [30, 10], [-16, 14], [16, 14], [-38, -14], [38, -14],
  [-12, -20], [12, -20], [-6, -13], [6, 10], [-40, 0], [40, 0],
  [-12, 8], [12, 8], [-18, -10], [18, -10],
];
for (const [x, z] of treeSpots) tree(x, z, 0.9 + Math.random() * 0.5);

const lampGlowMat = new THREE.MeshStandardMaterial({ color: 0xfff2c8, emissive: 0x000000, roughness: 0.4 });
const lampLights = [];
function lamp(x, z) {
  const grp = new THREE.Group();
  const pole = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.6, 8), lampPoleMat));
  pole.position.y = 1.3;
  grp.add(pole);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), lampGlowMat);
  head.position.y = 2.65;
  grp.add(head);
  const light = new THREE.PointLight(0xffc87a, 0, 9, 1.8);
  light.position.y = 2.65;
  grp.add(light);
  lampLights.push(light);
  grp.position.set(x, 0.5, z);
  scene.add(grp);
}
lamp(-20, -25.5); lamp(20, -25.5); lamp(-8, -17); lamp(14, -17);
lamp(-8, -15); lamp(14, -15); lamp(0, -25.5);
lamp(-2, 9); lamp(2, 9); lamp(-2, -12); lamp(2, -12);

// 栅栏 / 货箱 / 水塔点缀
{
  const crateMat = new THREE.MeshStandardMaterial({ color: 0xa87848, roughness: 1 });
  for (const [x, z, r] of [[-24, -17, 0.2], [-23, -17.5, -0.1], [24, -17, 0.1], [3, -17.5, 0.3]]) {
    const c = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), crateMat));
    c.position.set(x, 0.95, z);
    c.rotation.y = r;
    scene.add(c);
  }
  // 小水塔
  const tank = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 1.6, 12), new THREE.MeshStandardMaterial({ color: 0xc8b890, roughness: 0.8 })));
  tank.position.set(-30, 3.4, 18);
  scene.add(tank);
  const tankRoof = shadowed(new THREE.Mesh(new THREE.ConeGeometry(1.3, 0.7, 12), roofMats[0]));
  tankRoof.position.set(-30, 4.55, 18);
  scene.add(tankRoof);
  for (const [dx, dz] of [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]) {
    const leg = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.18), trunkMat));
    leg.position.set(-30 + dx, 1.8, 18 + dz);
    scene.add(leg);
  }
}

// ---------- 光照：傍晚 ----------
const hemi = new THREE.HemisphereLight(0xffdcb0, 0x5a6a45, 0.55);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffb45e, 2.0);
sun.position.set(-30, 38, -14);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -55; sun.shadow.camera.right = 55;
sun.shadow.camera.top = 55; sun.shadow.camera.bottom = -55;
sun.shadow.camera.near = 1; sun.shadow.camera.far = 140;
sun.shadow.bias = -0.0004;
scene.add(sun);
const fill = new THREE.DirectionalLight(0x9ab0ff, 0.25);
fill.position.set(20, 25, 30);
scene.add(fill);

// ---------- 火车：车头 + 两节车厢，分别按弧长跟随 ----------
function buildLoco() {
  const grp = new THREE.Group();
  const body = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.1, 3.4), new THREE.MeshStandardMaterial({ color: 0x2e5a9e, roughness: 0.5, metalness: 0.2 })));
  body.position.y = 0.8;
  grp.add(body);
  const cab = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 1.2), new THREE.MeshStandardMaterial({ color: 0x244a82, roughness: 0.5 })));
  cab.position.set(0, 1.75, -1.1);
  grp.add(cab);
  const smoke = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.6, 12), new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5 })));
  smoke.position.set(0, 1.65, 1.2);
  grp.add(smoke);
  const stack = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 0.5, 10), new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 })));
  stack.position.set(0, 2.1, 1.2);
  grp.add(stack);
  const dome = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), new THREE.MeshStandardMaterial({ color: 0xc8a848, roughness: 0.35, metalness: 0.6 })));
  dome.position.set(0, 1.5, 0.3);
  grp.add(dome);
  const nose = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 0.08), new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.4 })));
  nose.position.set(0, 0.7, 1.72);
  grp.add(nose);
  // 车窗
  const winMat = makeWindowMat();
  for (const sx of [-0.76, 0.76]) {
    const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.4), winMat);
    w.position.set(sx, 1.8, -1.1);
    w.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
    grp.add(w);
  }
  // 车轮
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5, metalness: 0.5 });
  for (const [sx, sz] of [[-0.8, 1.1], [0.8, 1.1], [-0.8, -1.1], [0.8, -1.1]]) {
    const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 12), wheelMat);
    wh.rotation.z = Math.PI / 2;
    wh.position.set(sx, 0.28, sz);
    grp.add(wh);
  }
  // 车头灯（夜晚发光）
  const hl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), lampGlowMat);
  hl.position.set(0, 0.95, 1.8);
  grp.add(hl);
  return grp;
}
function buildCar(color) {
  const grp = new THREE.Group();
  const body = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.2, 3.9), new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.15 })));
  body.position.y = 0.85;
  grp.add(body);
  const roof = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.25, 3.7), new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.6 })));
  roof.position.y = 1.55;
  grp.add(roof);
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.25, 3.9), new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 }));
  skirt.position.y = 0.28;
  grp.add(skirt);
  // 车厢窗（双侧多扇，发光材质）
  const wm = makeWindowMat();
  for (const sx of [-0.93, 0.93]) {
    for (let i = 0; i < 4; i++) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.45), wm);
      w.position.set(sx, 1.05, -1.35 + i * 0.9);
      w.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
      grp.add(w);
    }
  }
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5, metalness: 0.5 });
  for (const [sx, sz] of [[-0.8, 1.4], [0.8, 1.4], [-0.8, -1.4], [0.8, -1.4]]) {
    const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 12), wheelMat);
    wh.rotation.z = Math.PI / 2;
    wh.position.set(sx, 0.28, sz);
    grp.add(wh);
  }
  return grp;
}
const loco = buildLoco();
const car1 = buildCar(0xb84a3a);
const car2 = buildCar(0x3a8ab8);
scene.add(loco, car1, car2);

// 运动学：每节按弧长采样，间距恒定，转弯朝向独立
const UNIT = 4.5; // 节长（含挂钩间距）
const units = [
  { obj: loco, s: 0 },
  { obj: car1, s: -UNIT },
  { obj: car2, s: -UNIT * 2 },
];
const _p = new THREE.Vector3(), _t = new THREE.Vector3(), _t2 = new THREE.Vector3();
function placeUnits() {
  for (const u of units) {
    const uu = ((u.s % trackLength) + trackLength) % trackLength / trackLength;
    curve.getPointAt(uu, _p);
    curve.getTangentAt(uu, _t);
    curve.getPointAt(((u.s + 1.0) % trackLength + trackLength) % trackLength / trackLength, _t2);
    // 用前方切向算偏航（模型前向 +Z）
    _t2.sub(_p);
    if (_t2.lengthSq() < 1e-8) _t2.copy(_t);
    u.obj.position.copy(_p);
    u.obj.position.y += 0.5;
    u.obj.rotation.set(0, Math.atan2(_t2.x, _t2.z), 0);
  }
}

// ---------- 白天 / 夜晚 ----------
let isNight = false;
function setDayNight(night) {
  isNight = night;
  if (night) {
    scene.background.set(0x1a2440);
    scene.fog.color.set(0x1a2440);
    sun.intensity = 0.35; sun.color.set(0x7a9ac8);
    hemi.intensity = 0.22;
    fill.intensity = 0.12;
    renderer.toneMappingExposure = 0.95;
    lampGlowMat.emissive.set(0xffc87a);
    lampGlowMat.emissiveIntensity = 3.5;
    for (const m of windowMats) { m.emissive.set(0xffd98a); m.emissiveIntensity = 1.4; }
    window.__stationSignMat.emissive.set(0xffd98a);
    window.__stationSignMat.emissiveIntensity = 2.0;
    for (const l of lampLights) l.intensity = 2.2;
  } else {
    scene.background.set(0xf7c889);
    scene.fog.color.set(0xe8b07e);
    sun.intensity = 2.0; sun.color.set(0xffb45e);
    hemi.intensity = 0.55;
    fill.intensity = 0.25;
    renderer.toneMappingExposure = 1.05;
    lampGlowMat.emissive.set(0x000000);
    lampGlowMat.emissiveIntensity = 0;
    for (const m of windowMats) { m.emissive.set(0x000000); m.emissiveIntensity = 0; }
    window.__stationSignMat.emissive.set(0x000000);
    window.__stationSignMat.emissiveIntensity = 0;
    for (const l of lampLights) l.intensity = 0;
  }
}

// ---------- 控制 ----------
let playing = true;
let speed = 1.0;           // 速度倍率
let dist = 0;              // 车头弧长（米）
const V0 = 3.2;            // 基础速度 m/s
let dwellT = 0;            // 停站剩余时间（秒）
let wasInDwell = false;
const DWELL = 2.0;
const _wp = new THREE.Vector3();
function stationDist() {
  curve.getPointAt(stationU, _wp);
  // 最近弧长：用切向投影？直接用采样查表（精确够用）
  return stationU * trackLength;
}
const STATION_DIST = stationU * trackLength;
window.__track = { curve, trackLength, stationU };

const btnPlay = document.getElementById('btnPlay');
const btnDay = document.getElementById('btnDay');
const btnReset = document.getElementById('btnReset');
const speedInput = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');

function applySpeed() {
  speed = parseFloat(speedInput.value);
  speedVal.textContent = speed.toFixed(1) + '×';
  window.__speed = speed;
}
speedInput.addEventListener('input', applySpeed);
applySpeed();

btnPlay.addEventListener('click', () => {
  playing = !playing;
  btnPlay.textContent = playing ? '暂停' : '继续';
  btnPlay.classList.toggle('active', !playing);
});
btnDay.addEventListener('click', () => {
  setDayNight(!isNight);
  btnDay.textContent = isNight ? '白天' : '夜晚';
  btnDay.classList.toggle('active', isNight);
});
function reset() {
  dist = Math.max(0, STATION_DIST - 35);
  dwellT = 0;
  wasInDwell = false;
  speedInput.value = '1.0';
  applySpeed();
  camera.position.copy(CAM_HOME);
  controls.target.copy(TARGET_HOME);
  controls.update();
}
btnReset.addEventListener('click', reset);
reset();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---------- 主循环 ----------
const clock = new THREE.Clock();
let sampled = [];
const STATION_STOP_U = stationU;
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.1);
  if (playing) {
    if (dwellT > 0) {
      dwellT -= dt;
    } else {
      dist += V0 * speed * dt;
      // 抵达车站（只触发一次入站；停留计时暂停一起走）
      const frac = ((dist % trackLength) + trackLength) % trackLength / trackLength;
      const dU = Math.abs(frac - STATION_STOP_U);
      const dU2 = Math.abs(frac - STATION_STOP_U - 1);
      const d = Math.min(dU, dU2);
      if (d < (V0 * speed * dt) / trackLength * 0.8 && !wasInDwell) {
        // 对齐到车站
        dist = STATION_DIST + Math.floor(dist / trackLength) * trackLength;
        dwellT = DWELL;
        wasInDwell = true;
      }
      if (d > 0.02) wasInDwell = false;
    }
  }
  units[0].s = dist;
  units[1].s = dist - UNIT;
  units[2].s = dist - UNIT * 2;
  placeUnits();
  controls.update();
  renderer.render(scene, camera);
}
frame();
