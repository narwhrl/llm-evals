import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VoxelWorld, PAL, platform, columns, dougong, roof, hallBody } from './voxel.js';

const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// dawn sky — warm horizon cooling to a pale zenith
scene.background = new THREE.Color(0x2b2438);
scene.fog = new THREE.Fog(0x3a2f3a, 90, 260);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 600);
camera.position.set(58, 46, 118);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.target.set(0, 8, 10);
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 30; controls.maxDistance = 240;

/* ---------------- dawn lighting ---------------- */
scene.add(new THREE.HemisphereLight(0x9a8fb8, 0x35281c, 1.0));
const sun = new THREE.DirectionalLight(0xffc98a, 3.1);        // low warm sun
sun.position.set(-55, 60, 85);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -90; sun.shadow.camera.right = 90;
sun.shadow.camera.top = 90; sun.shadow.camera.bottom = -90;
sun.shadow.camera.far = 300; sun.shadow.bias = -0.0004;
scene.add(sun);
const rim = new THREE.DirectionalLight(0x7a8fd8, 0.85);       // cool back rim
rim.position.set(50, 45, -80); scene.add(rim);
const fill = new THREE.DirectionalLight(0xffe0b8, 0.5);       // soft front fill so facades read
fill.position.set(30, 30, 120); scene.add(fill);

/* ---------------- build the compound ---------------- */
const V = new VoxelWorld(scene);
const G = 0; // ground y

/* ground plane: grass field with a stone courtyard + processional path */
function ground() {
  const W = 130, D = 130, cx = 0, cz = 10;
  for (let x = cx - W / 2; x <= cx + W / 2; x++)
    for (let z = cz - D / 2; z <= cz + D / 2; z++) {
      // grass with subtle checkerboard variation
      const g = ((x + z) % 7 === 0) ? PAL.greenD : PAL.green;
      V.add(g, x, G, z);
    }
  // stone courtyard plaza around the main hall
  for (let x = -18; x <= 18; x++)
    for (let z = -6; z <= 22; z++)
      if (Math.abs(x) > 6 || z > 14 || z < 2) V.add(((x + z) % 4 === 0) ? PAL.stoneD : PAL.stone, x, G + 0.001, z);
  // processional path: mountain gate -> courtyard -> main hall
  for (let x = -3; x <= 3; x++)
    for (let z = -34; z <= 2; z++)
      V.add(((x + z) % 5 === 0) ? PAL.stoneD : PAL.stone, x, G + 0.001, z);
  // side paths to the flanking halls
  for (let z = 4; z <= 12; z += 1) {
    for (let x = -26; x <= -7; x++) V.add(PAL.stone, x, G + 0.001, z);
    for (let x = 7; x <= 26; x++) V.add(PAL.stone, x, G + 0.001, z);
  }
}

/* ————— 山门 (mountain gate), front entrance on the axis ————— */
function mountainGate() {
  const cx = 0, cz = -30;
  platform(V, cx, G + 1, cz, 16, 8, 3);
  // pillars
  columns(V, cx - 6, cx + 6, G + 2, cz + 3, 4, PAL.red);
  columns(V, cx - 6, cx + 6, G + 2, cz - 3, 4, PAL.red);
  // side walls between pillars
  hallBody(V, cx, G + 2, cz, 13, 5, 7, PAL.red);
  // central passage — leave the middle open
  for (let x = -2; x <= 2; x++)
    for (let y = 0; y < 4; y++)
      for (let z = cz - 3; z <= cz + 3; z++)
        V.add(PAL.window, x, G + 2 + y, z); // dark opening (will be carved look)
  // dougong under the eave
  dougong(V, cx - 6, cx + 6, G + 8, cz + 4, 4);
  dougong(V, cx - 6, cx + 6, G + 8, cz - 4, 4);
  // single-eave hip roof
  roof(V, cx, G + 8, cz, 18, 10, PAL.gold, true, 1);
  // two guardian stone lions flanking the steps
  for (const sx of [-1, 1]) {
    const lx = cx + sx * 5, lz = cz - 5;
    V.fill(PAL.white, lx, G + 1, lz, lx + 1, G + 1, lz + 1);
    V.fill(PAL.white, lx, G + 2, lz, lx + 1, G + 2, lz);
    V.add(PAL.white, lx, G + 3, lz);            // head
    V.add(PAL.stoneD, lx, G + 2, lz + 1);       // tail
  }
  // gate lanterns
  for (const sx of [-1, 1]) {
    const lx = cx + sx * 6, lz = cz + 4;
    V.fill(PAL.woodD, lx, G + 2, lz, lx, G + 4, lz);
    V.add(PAL.lampRed, lx, G + 5, lz);
    V.add(PAL.goldD, lx, G + 6, lz);
  }
}

/* ————— 主殿 大雄宝殿 (main hall) — largest, on the axis ————— */
function mainHall() {
  const cx = 0, cz = 14;
  // tall two-tier marble platform
  platform(V, cx, G + 1, cz, 30, 22, 4);
  platform(V, cx, G + 3, cz, 24, 16, 2);
  // perimeter columns
  columns(V, cx - 10, cx + 10, G + 4, cz + 7, 5, PAL.red);
  columns(V, cx - 10, cx + 10, G + 4, cz - 7, 5, PAL.red);
  hallBody(V, cx, G + 4, cz, 21, 6, 13, PAL.red);
  // dougong all around the eave
  dougong(V, cx - 11, cx + 11, G + 10, cz + 8, 4);
  dougong(V, cx - 11, cx + 11, G + 10, cz - 8, 4);
  // two-tier roof (重檐): lower skirt + upper hip-and-gable
  roof(V, cx, G + 10, cz, 30, 20, PAL.teal, false, 1);   // lower eave skirt
  roof(V, cx, G + 14, cz, 24, 15, PAL.gold, true, 1);    // upper main roof
  // hall lanterns along the front
  for (const sx of [-8, -4, 0, 4, 8]) {
    V.add(PAL.lampRed, cx + sx, G + 6, cz + 8);
    V.add(PAL.goldD, cx + sx, G + 7, cz + 8);
  }
}

/* ————— 配殿 (flanking halls), symmetric, facing the courtyard ————— */
function sideHall(sx) {
  const cx = sx * 27, cz = 14;
  platform(V, cx, G + 1, cz, 16, 12, 3);
  columns(V, cx - 5, cx + 5, G + 2, cz + 4, 5, PAL.red);
  hallBody(V, cx, G + 2, cz, 12, 4, 9, PAL.red);
  dougong(V, cx - 6, cx + 6, G + 6, cz + 5, 4);
  dougong(V, cx - 6, cx + 6, G + 6, cz - 5, 4);
  roof(V, cx, G + 6, cz, 18, 12, PAL.teal, true, 1);   // 青瓦 hip roof
  // lantern pair at the hall door
  for (const lx of [-2, 2]) {
    V.add(PAL.lampRed, cx + lx, G + 3, cz + 5);
    V.add(PAL.goldD, cx + lx, G + 4, cz + 5);
  }
}

/* ————— 宝塔 (pagoda), rear-right corner ————— */
function pagoda() {
  const cx = 26, cz = 40;
  platform(V, cx, G + 1, cz, 14, 14, 3);
  // tapering 5-storey tower
  let w = 9, y = G + 2;
  for (let storey = 0; storey < 5; storey++) {
    // storey body
    hallBody(V, cx, y, cz, w, 3, w, PAL.red, false);
    // door opening on the lowest storey
    if (storey === 0) for (let x = -1; x <= 1; x++) for (let yy = 0; yy < 3; yy++) V.add(PAL.window, cx + x, y + yy, cz + Math.floor(w / 2));
    // balcony ring
    for (let x = cx - Math.floor(w / 2) - 1; x <= cx + Math.floor(w / 2) + 1; x++)
      for (let z = cz - Math.floor(w / 2) - 1; z <= cz + Math.floor(w / 2) + 1; z++)
        if (Math.abs(x - cx) === Math.floor(w / 2) + 1 || Math.abs(z - cz) === Math.floor(w / 2) + 1)
          V.add(PAL.wood, x, y + 3, z);
    // storey roof (攒尖/多檐), shrinking
    roof(V, cx, y + 4, cz, w + 4, w + 4, PAL.teal, storey === 4, 1);
    w -= 2; y += 6;
  }
  // golden finial spire
  V.fill(PAL.goldD, cx, y + 4, cz, cx, y + 7, cz);
  V.add(PAL.gold, cx, y + 8, cz);
  V.add(PAL.goldD, cx - 1, y + 6, cz); V.add(PAL.goldD, cx + 1, y + 6, cz);
}

/* ————— 钟鼓楼 (bell tower), rear-left ————— */
function bellTower() {
  const cx = -26, cz = 38;
  platform(V, cx, G + 1, cz, 12, 12, 3);
  // open tower base on columns (you can see through it)
  columns(V, cx - 3, cx + 3, G + 2, cz + 3, 3, PAL.red);
  columns(V, cx - 3, cx + 3, G + 2, cz - 3, 3, PAL.red);
  for (let x = -3; x <= 3; x += 3) for (let z = -3; z <= 3; z += 3) columns(V, cx + x, cx + x, G + 2, cz + z, 99, PAL.red);
  // the great bell hung in the opening
  V.fill(PAL.goldD, cx, G + 4, cz, cx + 1, G + 5, cz);
  V.fill(PAL.gold, cx - 0, G + 6, cz, cx + 1, G + 6, cz);
  // upper chamber + roof
  hallBody(V, cx, G + 7, cz, 7, 3, 7, PAL.red, false);
  dougong(V, cx - 4, cx + 4, G + 10, cz + 4, 4);
  roof(V, cx, G + 10, cz, 13, 13, PAL.gold, true, 1);
}

/* ————— courtyard dressing: trees, lantern posts, incense burner ————— */
function dressing() {
  // pine-ish voxel trees flanking the courtyard
  for (const [tx, tz] of [[-16, -2], [16, -2], [-30, 20], [30, 20], [-18, 30], [18, 34]]) {
    V.fill(PAL.woodD, tx, G, tz, tx, G + 2, tz);
    for (let l = 0; l < 3; l++) {
      const r = 3 - l;
      for (let x = -r; x <= r; x++) for (let z = -r; z <= r; z++)
        if (Math.abs(x) + Math.abs(z) <= r) V.add(PAL.greenD, tx + x, G + 3 + l, tz + z);
    }
    V.add(PAL.greenD, tx, G + 6, tz);
  }
  // stone lantern posts along the path
  for (const sx of [-1, 1]) for (const zz of [-24, -12]) {
    const lx = sx * 5, lz = zz;
    V.fill(PAL.stoneD, lx, G, lz, lx, G + 3, lz);
    V.add(PAL.stone, lx - 0, G + 4, lz); V.add(PAL.lampRed, lx, G + 4, lz);
    V.add(PAL.stoneD, lx, G + 5, lz);
  }
  // central incense burner on the courtyard axis
  const bx = 0, bz = 2;
  V.fill(PAL.stoneD, bx, G, bz, bx + 2, G + 1, bz + 1);
  V.fill(PAL.stoneD, bx - 1, G + 2, bz, bx + 3, G + 2, bz + 1);
  V.fill(PAL.stoneD, bx, G + 3, bz, bx + 2, G + 4, bz + 1);
  V.add(PAL.lampRed, bx + 1, G + 5, bz); // ember
}

ground();
mountainGate();
mainHall();
sideHall(-1); sideHall(1);
pagoda();
bellTower();
dressing();

const voxelCount = V.build();
console.log('voxels:', voxelCount);
window.__voxels = voxelCount; // verification handle
window.__scene = scene; window.__cam = camera;

/* ---------------- animate ---------------- */
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
