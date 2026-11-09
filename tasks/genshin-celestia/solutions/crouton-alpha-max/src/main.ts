import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============================ renderer / scene ============================ */
const container = document.getElementById("app")!;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8eccf2);
scene.fog = new THREE.Fog(0xcfe6f7, 900, 3200);

// Sky dome: vertical gradient shader (abyss-free, airy)
{
  const geo = new THREE.SphereGeometry(4000, 32, 24);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color(0x4a8fd4) },
      mid: { value: new THREE.Color(0x8eccf2) },
      bot: { value: new THREE.Color(0xeaf5ff) },
    },
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 bot; varying vec3 vP;
      void main(){ float h=normalize(vP).y; vec3 c = h>0.08 ? mix(mid,top,smoothstep(0.08,0.85,h)) : mix(bot,mid,smoothstep(-0.25,0.08,h)); gl_FragColor=vec4(c,1.);}`,
  });
  scene.add(new THREE.Mesh(geo, mat));
}

/* ============================ camera / controls ============================ */
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
camera.position.set(880, 560, 1080); // cinematic 3/4 distant shot
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 140, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxDistance = 2600;
controls.minDistance = 120;
controls.update();

/* ============================ lights ============================ */
const sunDir = new THREE.Vector3(0.55, 0.8, 0.45).normalize();
const sun = new THREE.DirectionalLight(0xfff2d8, 2.6);
sun.position.copy(sunDir).multiplyScalar(1600);
sun.castShadow = true;
sun.shadow.camera.left = -900; sun.shadow.camera.right = 900;
sun.shadow.camera.top = 900; sun.shadow.camera.bottom = -900;
sun.shadow.camera.near = 400; sun.shadow.camera.far = 3200;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.bias = -0.0004;
scene.add(sun);
scene.add(new THREE.HemisphereLight(0xbfe3ff, 0x8fae7a, 0.85));
const fill = new THREE.DirectionalLight(0xcfd8ff, 0.35);
fill.position.set(-800, 400, -600);
scene.add(fill);

/* ============================ materials (toon-ish) ============================ */
const M = {
  stone: new THREE.MeshToonMaterial({ color: 0xf7f3e8, gradientMap: null }),
  stone2: new THREE.MeshToonMaterial({ color: 0xe9e2cf }),
  roof: new THREE.MeshToonMaterial({ color: 0x7fb6d9 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.85, roughness: 0.28, emissive: 0x6a4a00, emissiveIntensity: 0.25 }),
  goldPale: new THREE.MeshStandardMaterial({ color: 0xf7d98b, metalness: 0.7, roughness: 0.35 }),
  rock: new THREE.MeshToonMaterial({ color: 0x9a8d7a }),
  rockDark: new THREE.MeshToonMaterial({ color: 0x77694f }),
  rockCrack: new THREE.MeshBasicMaterial({ color: 0x4d4232 }),
  grass: new THREE.MeshToonMaterial({ color: 0x6fbf5a }),
  grassDeep: new THREE.MeshToonMaterial({ color: 0x4da344 }),
  trunk: new THREE.MeshToonMaterial({ color: 0x8a5a3b }),
  leaf: new THREE.MeshToonMaterial({ color: 0x5cb85c }),
  leafDark: new THREE.MeshToonMaterial({ color: 0x3f9e4d }),
  water: new THREE.MeshToonMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.75 }),
  cloud: new THREE.MeshToonMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 }),
  flower: new THREE.MeshToonMaterial({ color: 0xff8fb3 }),
  lamp: new THREE.MeshBasicMaterial({ color: 0xffe9a8 }),
};
// soft two-band gradient for toon shading
{
  const data = new Uint8Array([120, 200, 255]);
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter; tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  for (const k of ["stone", "stone2", "rock", "rockDark", "grass", "grassDeep", "roof"] as const)
    (M[k] as THREE.MeshToonMaterial).gradientMap = tex;
}

/* ============================ helpers ============================ */
const tmpV = new THREE.Vector3();
function box(w: number, h: number, d: number, mat: THREE.Material) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = true; m.receiveShadow = true; return m;
}
function cyl(rt: number, rb: number, h: number, mat: THREE.Material, seg = 16) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.castShadow = true; m.receiveShadow = true; return m;
}
function cone(r: number, h: number, mat: THREE.Material, seg = 16) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat);
  m.castShadow = true; m.receiveShadow = true; return m;
}
function sph(r: number, mat: THREE.Material, w = 12, h = 10) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, w, h), mat);
  m.castShadow = true; m.receiveShadow = true; return m;
}
function add(parent: THREE.Object3D, child: THREE.Object3D, x = 0, y = 0, z = 0) {
  child.position.set(x, y, z); parent.add(child); return child;
}
function rand(a: number, b: number) { return a + Math.random() * (b - a); }
// deterministic-ish noise for rock
function noise(x: number, z: number, seed: number) {
  return Math.sin(x * 0.11 + seed) * Math.cos(z * 0.13 + seed * 1.7) * Math.sin((x + z) * 0.05 + seed);
}

/* ---- rocky floating island: flat grassy top + craggy inverted cone bottom ---- */
function makeIsland(r: number, topY: number, opts: { grass?: boolean; seed?: number; depth?: number } = {}) {
  const g = new THREE.Group();
  const seed = opts.seed ?? Math.random() * 100;
  const depth = opts.depth ?? r * 1.6;

  // --- underside: inverted jagged rock cone ---
  const rockPts: THREE.Vector3[] = [];
  const ring = 26;
  const layers = 7;
  for (let L = 0; L <= layers; L++) {
    const t = L / layers;                 // 0 rim → 1 tip
    const rad = r * (1 - t * 0.92) * (1 + 0.18 * noise(L, seed, seed));
    const y = topY - t * depth;
    for (let i = 0; i <= ring; i++) {
      const a = (i / ring) * Math.PI * 2;
      const rr = rad * (1 + 0.16 * noise(Math.cos(a) * 3 + L, Math.sin(a) * 3, seed));
      rockPts.push(new THREE.Vector3(Math.cos(a) * rr, y, Math.sin(a) * rr));
    }
  }
  const idx: number[] = [];
  for (let L = 0; L < layers; L++)
    for (let i = 0; i < ring; i++) {
      const a = L * (ring + 1) + i, b = a + ring + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const rockGeo = new THREE.BufferGeometry();
  rockGeo.setIndex(idx);
  rockGeo.setAttribute("position", new THREE.Float32BufferAttribute(rockPts.flatMap((p) => [p.x, p.y, p.z]), 3));
  rockGeo.computeVertexNormals();
  const rock = new THREE.Mesh(rockGeo, M.rock);
  rock.castShadow = true; rock.receiveShadow = true;
  g.add(rock);

  // spire stalactites hanging below
  for (let i = 0; i < Math.floor(r / 9); i++) {
    const a = Math.random() * Math.PI * 2, d = Math.random() * r * 0.7;
    const len = rand(depth * 0.25, depth * 0.6);
    const st = add(g, cone(rand(2, 6), len, M.rockDark, 7), Math.cos(a) * d, topY - depth * 0.6 - len / 2, Math.sin(a) * d);
    st.rotation.x = Math.PI;
  }

  // --- top: grass mesa + stone rim cliff ---
  if (opts.grass !== false) {
    const mesa = add(g, cyl(r * 0.97, r * 0.86, r * 0.14 + 6, M.grassDeep, 30), 0, topY + (r * 0.14 + 6) / 2 - 2, 0);
    mesa.receiveShadow = true;
    const meadow = add(g, cyl(r * 0.94, r * 0.94, 3, M.grass, 30), 0, topY + r * 0.14 + 5, 0);
    // rim stones
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + rand(-0.1, 0.1);
      const s = add(g, box(rand(6, 14), rand(4, 9), rand(4, 8), M.rock), Math.cos(a) * r * 0.9, topY + 6, Math.sin(a) * r * 0.9);
      s.rotation.y = -a; s.rotation.z = rand(-0.15, 0.15);
    }
  }
  return g;
}

/* ---- white pavilion: columns + entablature + small pyramid roof ---- */
function makePavilion(w: number, h: number, mat = M.stone): THREE.Group {
  const g = new THREE.Group();
  add(g, box(w, 3, w, mat), 0, 1.5, 0);                       // base
  const colN = 4;
  for (let i = 0; i < colN; i++) {
    const a = (i / colN) * Math.PI * 2 + Math.PI / 4;
    add(g, cyl(0.9, 1.1, h, mat, 10), Math.cos(a) * w * 0.38, 3 + h / 2, Math.sin(a) * w * 0.38);
  }
  add(g, box(w * 1.1, 2.4, w * 1.1, mat), 0, 3 + h + 1.2, 0);   // architrave
  add(g, cone(w * 0.72, h * 0.55, M.roof, 4), 0, 3 + h + 2.4 + h * 0.27, 0).rotation.y = Math.PI / 4; // roof
  add(g, sph(1.6, M.goldPale), 0, 3 + h + 2.4 + h * 0.55 + 2, 0); // finial orb
  return g;
}

/* ---- slender spire tower (for ring islets & ruins) ---- */
function makeTower(h: number, base = 8, broken = false): THREE.Group {
  const g = new THREE.Group();
  add(g, box(base * 1.6, 4, base * 1.6, M.stone2), 0, 2, 0);
  add(g, cyl(base * 0.62, base * 0.78, h, M.stone, 12), 0, 4 + h / 2, 0);
  // arcade band
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    add(g, box(1.2, h * 0.4, 1.2, M.stone2), Math.cos(a) * base * 0.66, 4 + h * 0.55, Math.sin(a) * base * 0.66).rotation.y = -a;
  }
  add(g, cyl(base * 0.4, base * 0.62, h * 0.22, M.stone, 12), 0, 4 + h + h * 0.11, 0);
  if (broken) {
    // jagged broken stump + leaning shard
    const c = add(g, cone(base * 0.5, 6, M.stone2, 7), rand(-3, 3), 4 + h + 4, rand(-3, 3));
    c.rotation.z = rand(-0.5, 0.5);
  } else {
    add(g, cone(base * 0.55, h * 0.5, M.roof, 12), 0, 4 + h + h * 0.22 + h * 0.25, 0);
    const tip = add(g, sph(1.2, M.gold), 0, 4 + h + h * 0.72 + 4, 0);
    tip.scale.y = 1.8;
  }
  return g;
}

/* ---- arched bridge between two points (arc spine + 2 rail parapets) ---- */
function makeBridge(a: THREE.Vector3, b: THREE.Vector3, lift = 30, width = 7): THREE.Group {
  const g = new THREE.Group();
  const segs = 22;
  const mid = a.clone().add(b).multiplyScalar(0.5); mid.y += lift;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  for (let i = 0; i < segs; i++) {
    const p = curve.getPoint(i / segs), q = curve.getPoint((i + 1) / segs);
    const len = p.distanceTo(q) + 0.6;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(width, 2.4, len), M.stone);
    deck.position.copy(p).add(q).multiplyScalar(0.5);
    deck.lookAt(q.x, q.y, q.z);
    deck.castShadow = true; deck.receiveShadow = true;
    g.add(deck);
    // parapet balusters
    for (const s of [-1, 1]) {
      const par = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.2, len), M.stone2);
      const off = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), q.clone().sub(p)).normalize().multiplyScalar(s * width * 0.42);
      par.position.copy(p).add(q).multiplyScalar(0.5).add(off).add(new THREE.Vector3(0, 2.2, 0));
      par.lookAt(q.x + off.x, q.y + 2.2, q.z + off.z);
      par.castShadow = true;
      g.add(par);
    }
  }
  // arch support below the midspan
  const arch = new THREE.Mesh(new THREE.TorusGeometry(a.distanceTo(b) * 0.22, 3.2, 8, 24, Math.PI), M.stone);
  arch.position.copy(mid).y -= lift * 0.55;
  arch.lookAt(b.x, arch.position.y, b.z);
  arch.castShadow = true;
  g.add(arch);
  return g;
}

/* ---- colonnade: a wall segment of pillars + beams ---- */
function makeColonnade(len: number, h = 16): THREE.Group {
  const g = new THREE.Group();
  const n = Math.floor(len / 9);
  for (let i = 0; i <= n; i++) {
    const x = -len / 2 + (i / n) * len;
    add(g, box(4, 3, 3, M.stone2), x, 1.5, 0);
    add(g, cyl(1.4, 1.7, h, M.stone, 10), x, 3 + h / 2, 0);
    add(g, box(3, 2, 3, M.stone2), x, 3 + h + 1, 0);
  }
  add(g, box(len + 4, 2.6, 4.5, M.stone), 0, 3 + h + 3.2, 0);
  add(g, box(len + 4, 1.2, 5.4, M.stone2), 0, 3 + h + 5, 0);
  return g;
}

/* ---- tree / bush / rock cluster ---- */
function makeTree(scale = 1): THREE.Group {
  const g = new THREE.Group();
  add(g, cyl(0.7, 1.1, 8, M.trunk, 8), 0, 4, 0);
  const c1 = add(g, sph(5.5, Math.random() > 0.5 ? M.leaf : M.leafDark, 10, 8), 0, 11, 0); c1.scale.y = 0.85;
  add(g, sph(3.4, M.leaf, 9, 8), 3.4, 8.6, 1);
  add(g, sph(2.8, M.leafDark, 9, 8), -3, 9.2, -1);
  if (Math.random() > 0.6) add(g, sph(0.7, M.flower, 8, 6), rand(-3, 3), 12, rand(-3, 3));
  g.scale.setScalar(scale);
  return g;
}
function makeBush() {
  const b = add(new THREE.Group(), sph(rand(2, 3.6), Math.random() > 0.5 ? M.leaf : M.grassDeep, 9, 7));
  b.scale.y = 0.6; return b as THREE.Group;
}
function scatterGreenery(parent: THREE.Group, r: number, y: number, treeCount: number, bushCount: number) {
  for (let i = 0; i < treeCount; i++) {
    const a = Math.random() * Math.PI * 2, d = Math.random() * r * 0.82;
    add(parent, makeTree(rand(0.7, 1.5)), Math.cos(a) * d, y, Math.sin(a) * d);
  }
  for (let i = 0; i < bushCount; i++) {
    const a = Math.random() * Math.PI * 2, d = Math.random() * r * 0.88;
    add(parent, makeBush(), Math.cos(a) * d, y + 1, Math.sin(a) * d);
  }
}

/* ---- suspended waterfall: animated translucent plane + foam + mist ---- */
const waterfalls: { mat: THREE.MeshToonMaterial; speed: number }[] = [];
function makeWaterfall(x: number, yTop: number, z: number, drop: number, w = 5): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshToonMaterial({ color: 0xbfefff, transparent: true, opacity: 0.8 });
  const fall = new THREE.Mesh(new THREE.PlaneGeometry(w, drop, 1, 40), mat);
  fall.position.set(x, yTop - drop / 2, z);
  g.add(fall);
  waterfalls.push({ mat, speed: rand(0.5, 1.2) });
  // foam ring at base
  const foam = sph(w * 0.7, M.water, 12, 8); foam.scale.set(1, 0.35, 1); foam.position.set(x, yTop - drop, z); g.add(foam);
  // mist sprites
  for (let i = 0; i < 3; i++) {
    const mist = sph(w * 0.9, M.cloud, 10, 8); mist.scale.set(1, 0.5, 1);
    mist.position.set(x + rand(-w, w), yTop - drop + rand(2, 8), z + rand(-w, w));
    g.add(mist);
  }
  return g;
}

/* ---- cloud cluster (merged spheres) ---- */
function makeCloud(s = 1): THREE.Group {
  const g = new THREE.Group();
  const n = Math.floor(rand(5, 9));
  for (let i = 0; i < n; i++) {
    const c = sph(rand(14, 30) * s, M.cloud, 12, 10);
    c.position.set((i - n / 2) * 18 * s + rand(-6, 6), rand(-4, 8) * s, rand(-10, 10) * s);
    c.scale.y = 0.55; c.castShadow = false; c.receiveShadow = false;
    g.add(c);
  }
  return g;
}

/* ---- drifting rock debris ---- */
const debris: THREE.Group[] = [];
function makeDebris(s = 1): THREE.Group {
  const g = new THREE.Group();
  const n = Math.floor(rand(2, 4));
  for (let i = 0; i < n; i++) {
    const r = add(g, box(rand(3, 8) * s, rand(2, 5) * s, rand(3, 7) * s, M.rock), rand(-8, 8) * s, rand(-3, 3) * s, rand(-8, 8) * s);
    r.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3));
  }
  return g;
}

/* ============================ sky extras ============================ */
// sun sprite (billboard glow)
{
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: (() => {
      const c = document.createElement("canvas"); c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      const grd = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      grd.addColorStop(0, "rgba(255,250,220,1)"); grd.addColorStop(0.35, "rgba(255,230,160,0.55)"); grd.addColorStop(1, "rgba(255,230,160,0)");
      ctx.fillStyle = grd; ctx.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(c); return t;
    })(),
    transparent: true, depthWrite: false, fog: false,
  }));
  glow.position.copy(sunDir).multiplyScalar(2400);
  glow.scale.setScalar(700);
  scene.add(glow);
}

// sea of clouds (multiple layers below)
const cloudLayers: THREE.Group[] = [];
for (let L = 0; L < 4; L++) {
  const layer = new THREE.Group();
  const y = -320 - L * 130;
  const count = 26 - L * 3;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rand(-0.2, 0.2);
    const d = rand(300, 2200);
    const c = makeCloud(rand(1.6, 3.2));
    c.position.set(Math.cos(a) * d, y + rand(-40, 40), Math.sin(a) * d);
    layer.add(c);
  }
  // far clouds
  for (let i = 0; i < 8; i++) {
    const a = Math.random() * Math.PI * 2, d = rand(2400, 3200);
    const c = makeCloud(rand(3, 5)); c.position.set(Math.cos(a) * d, y + rand(-60, 60), Math.sin(a) * d);
    layer.add(c);
  }
  cloudLayers.push(layer);
  scene.add(layer);
}

// distant Teyvat continent below the clouds (faint, fog-faded)
{
  const cont = new THREE.Group();
  const base = add(cont, cyl(1400, 1100, 90, new THREE.MeshToonMaterial({ color: 0x7fa88a }), 48), 0, -760, 0);
  for (let i = 0; i < 5; i++) {
    const h = add(cont, cone(rand(120, 260), rand(160, 340), new THREE.MeshToonMaterial({ color: 0x8aa08c }), 24), rand(-800, 800), -660, rand(-800, 800));
  }
  cont.position.set(900, 0, -1400);
  cont.traverse((o) => { o.castShadow = false; o.receiveShadow = false; });
  scene.add(cont);
}

// volumetric light shafts (additive cones toward the spire)
const shafts: THREE.Mesh[] = [];
for (let i = 0; i < 9; i++) {
  const a = (i / 9) * Math.PI * 2;
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(60, 1400, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xffedba, transparent: true, opacity: 0.05, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })
  );
  cone.position.copy(sunDir).multiplyScalar(900);
  cone.position.x += Math.cos(a) * 500; cone.position.z += Math.sin(a) * 500;
  cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), sunDir.clone().negate());
  cone.castShadow = false; cone.receiveShadow = false;
  shafts.push(cone); scene.add(cone);
}

/* ============================ CELESTIA ============================ */
const celestia = new THREE.Group();
scene.add(celestia);

const RING_R = 620;      // ring radius
const MAIN_R = 340;      // central island radius
const TOP_Y = 0;         // main island top (y=0 reference)

/* ---- central island ---- */
const mainIsland = makeIsland(MAIN_R, TOP_Y, { seed: 7, depth: MAIN_R * 2.6 });
celestia.add(mainIsland);
const meadowY = TOP_Y + MAIN_R * 0.14 + 8;

// ring road around the meadow (stone torus band)
{
  const road = new THREE.Mesh(new THREE.TorusGeometry(MAIN_R * 0.62, 10, 8, 64), M.stone2);
  road.rotation.x = Math.PI / 2; road.position.y = meadowY + 1;
  road.receiveShadow = true; celestia.add(road);
  const inner = new THREE.Mesh(new THREE.TorusGeometry(MAIN_R * 0.45, 3, 6, 48), M.goldPale);
  inner.rotation.x = Math.PI / 2; inner.position.y = meadowY + 1; celestia.add(inner);
}

// radial spokes on the ring road (sacred geometry)
for (let i = 0; i < 8; i++) {
  const a = (i / 8) * Math.PI * 2;
  const spoke = box(MAIN_R * 0.2, 1.2, 5, M.goldPale);
  spoke.position.set(Math.cos(a) * MAIN_R * 0.53, meadowY + 1.5, Math.sin(a) * MAIN_R * 0.53);
  spoke.rotation.y = -a; celestia.add(spoke);
}

// greenery on main island
scatterGreenery(mainIsland, MAIN_R * 0.88, meadowY, 60, 40);

// grand white buildings on the meadow (pavilions ring)
const pavilionSlots: { angle: number; dist: number }[] = [];
for (let i = 0; i < 7; i++) {
  const a = (i / 7) * Math.PI * 2 + 0.4;
  const dist = MAIN_R * 0.68;
  const x = Math.cos(a) * dist, z = Math.sin(a) * dist;
  const pav = makePavilion(rand(26, 40), rand(14, 22));
  pav.position.set(x, meadowY, z); pav.rotation.y = -a;
  celestia.add(pav);
  pavilionSlots.push({ angle: a, dist });
}
// a couple of off-road pavilions
for (const [x, z, w] of [[-260, -180, 44], [240, 220, 52], [-190, 260, 38]] as const) {
  const pav = makePavilion(w, rand(18, 26));
  pav.position.set(x, meadowY, z); pav.rotation.y = rand(0, 3);
  celestia.add(pav);
}
// colonnades on the main island rim
for (let i = 0; i < 4; i++) {
  const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
  const col = makeColonnade(150, 18);
  col.position.set(Math.cos(a) * MAIN_R * 0.8, meadowY, Math.sin(a) * MAIN_R * 0.8);
  col.rotation.y = -a + Math.PI / 2;
  celestia.add(col);
}

// waterfalls off the main island rim (suspended)
celestia.add(makeWaterfall(MAIN_R * 0.95, meadowY + 30, 0, 700, 9));
celestia.add(makeWaterfall(-MAIN_R * 0.7, meadowY + 30, MAIN_R * 0.65, 620, 7));
celestia.add(makeWaterfall(-MAIN_R * 0.2, meadowY + 30, -MAIN_R * 0.96, 660, 8));

/* ---- THE GREAT SPIRE (central sanctum) ---- */
function makeGreatSpire(): THREE.Group {
  const g = new THREE.Group();
  const tiers: { y: number; w: number; h: number }[] = [];
  let y = 0;
  const spec = [
    { w: 150, h: 40 }, { w: 120, h: 34 }, { w: 94, h: 30 },
    { w: 72, h: 26 }, { w: 54, h: 22 }, { w: 40, h: 18 },
  ];
  for (const t of spec) {
    const base = add(g, box(t.w, 6, t.w, M.stone2), 0, y + 3, 0);
    base.scale.set(1, 1, 1);
    // column ring
    const colN = Math.max(8, Math.floor(t.w / 3));
    for (let i = 0; i < colN; i++) {
      const a = (i / colN) * Math.PI * 2;
      add(g, cyl(1.6, 2.1, t.h, M.stone, 8), Math.cos(a) * t.w * 0.38, y + 6 + t.h / 2, Math.sin(a) * t.w * 0.38);
    }
    // arcade wall ring (arched impression via pilaster boxes)
    for (let i = 0; i < colN; i++) {
      const a = ((i + 0.5) / colN) * Math.PI * 2;
      add(g, box(3.4, t.h * 0.8, 3.4, M.stone), Math.cos(a) * t.w * 0.44, y + 6 + t.h * 0.4, Math.sin(a) * t.w * 0.44).rotation.y = -a;
    }
    add(g, cyl(t.w * 0.42, t.w * 0.46, t.h * 0.55, M.stone, 20), 0, y + 6 + t.h * 0.28, 0); // core drum
    // tier roof band
    add(g, box(t.w, 3.2, t.w, M.stone2), 0, y + 6 + t.h + 1.6, 0);
    add(g, cone(t.w * 0.62, 10, M.roof, 4), 0, y + 6 + t.h + 3.2 + 5, 0).rotation.y = Math.PI / 4;
    y += t.h + 6;
  }
  // colossal upper drum + open lantern stage
  add(g, cyl(30, 38, 60, M.stone, 24), 0, y + 30, 0);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    add(g, cyl(2.4, 2.8, 46, M.stone, 8), Math.cos(a) * 30, y + 60 + 23, Math.sin(a) * 30);
  }
  add(g, cyl(40, 34, 8, M.goldPale, 24), 0, y + 60 + 46 + 4, 0); // gold lantern floor
  // pinnacle
  add(g, cone(34, 70, M.stone, 16), 0, y + 110 + 35, 0);
  add(g, sph(5, M.gold, 16, 12), 0, y + 110 + 70 + 8, 0);
  const needle = add(g, cyl(0.8, 3.2, 42, M.gold, 10), 0, y + 110 + 70 + 20, 0);
  needle.scale.y = 1;
  return g;
}
const spire = makeGreatSpire();
spire.position.y = meadowY;
celestia.add(spire);

// armillary: interlocking gold rings on the pinnacle
const armillary = new THREE.Group();
{
  const radii = [38, 30, 24, 19, 14];
  for (let i = 0; i < radii.length; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radii[i], 2.2, 10, 64), M.gold);
    ring.castShadow = true;
    const holder = new THREE.Group();
    holder.add(ring);
    holder.rotation.set(rand(0, 1), rand(0, 1), rand(0, 1));
    armillary.add(holder);
  }
  const orb = sph(8, M.goldPale, 20, 16);
  armillary.add(orb);
  const axis = cyl(1.4, 1.4, 96, M.gold, 8);
  axis.rotation.z = 0.6; armillary.add(axis);
  const axis2 = cyl(1.1, 1.1, 84, M.goldPale, 8);
  axis2.rotation.x = Math.PI / 2.4; axis2.rotation.y = 0.5; armillary.add(axis2);
  // satellite orbs on the bands
  for (let i = 0; i < 5; i++) {
    const s = sph(rand(2.5, 4.2), i % 2 ? M.gold : M.goldPale, 12, 10);
    const a = rand(0, Math.PI * 2), r = radii[i % radii.length] + rand(0, 6);
    s.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.6, Math.sin(a) * r);
    armillary.add(s);
  }
}
armillary.position.y = meadowY + 158 + 42;
celestia.add(armillary);

// secondary side spires flanking the sanctum
for (const [x, z, h] of [[-150, -60, 90], [150, -60, 90], [-70, 130, 70], [80, 140, 70]] as const) {
  const t = makeTower(h, 14);
  t.position.set(x, meadowY, z);
  celestia.add(t);
}
// lamps along the ring road
for (let i = 0; i < 16; i++) {
  const a = (i / 16) * Math.PI * 2;
  const x = Math.cos(a) * MAIN_R * 0.62, z = Math.sin(a) * MAIN_R * 0.62;
  add(celestia, cyl(0.5, 0.8, 7, M.stone2, 8), x, meadowY + 5, z);
  add(celestia, sph(1.1, M.lamp, 8, 6), x, meadowY + 9.5, z);
}

/* ---- under-island ancient structures (faint ruins on the inverted rock) ---- */
{
  const ruinA = makeTower(46, 10); ruinA.position.set(60, -260, 40); ruinA.rotation.x = Math.PI; // hanging upside-down
  celestia.add(ruinA);
  const ruinB = makeTower(34, 8, true); ruinB.position.set(-110, -340, -70); ruinB.rotation.x = Math.PI;
  celestia.add(ruinB);
  const ruinC = makePavilion(30, 14); ruinC.position.set(130, -420, -30); ruinC.rotation.x = Math.PI * 0.92;
  celestia.add(ruinC);
  // stone bridges stranded on the rock face
  celestia.add(makeColonnade(80, 12)).position.set(40, -180, 120);
}

/* ---- ring islets + bridges + ring roads ---- */
const isletData: { a: number; r: number; scale: number; y?: number }[] = [
  { a: 0.0, r: 130, scale: 1.0 },
  { a: 0.82, r: 100, scale: 0.85 },
  { a: 1.62, r: 150, scale: 1.15 },
  { a: 2.42, r: 95, scale: 0.8 },
  { a: 3.18, r: 135, scale: 1.05 },
  { a: 3.98, r: 105, scale: 0.9 },
  { a: 4.72, r: 145, scale: 1.1, y: -30 },
  { a: 5.55, r: 115, scale: 0.95, y: 20 },
];
const isletTops: THREE.Vector3[] = [];
const isletCenters: THREE.Vector3[] = [];

isletData.forEach((d, i) => {
  const x = Math.cos(d.a) * RING_R, z = Math.sin(d.a) * RING_R;
  const y = d.y ?? (i % 2 === 0 ? 0 : -18);
  const island = makeIsland(d.r, y, { seed: 30 + i, depth: d.r * 1.7 });
  island.position.set(x, 0, z);
  celestia.add(island);
  const top = y + d.r * 0.14 + 8;
  isletTops.push(new THREE.Vector3(x, top, z));
  isletCenters.push(new THREE.Vector3(x, y, z));

  // mini sanctum per islet: pavilion or tower(s)
  if (d.r >= 125) {
    const pav = makePavilion(d.r * 0.34, d.r * 0.16);
    pav.position.set(x, top, z); pav.rotation.y = rand(0, 3);
    celestia.add(pav);
    const tw = makeTower(d.r * 0.55, d.r * 0.09);
    tw.position.set(x + d.r * 0.4, top, z + d.r * 0.3);
    celestia.add(tw);
  } else {
    const tw = makeTower(d.r * 0.6, d.r * 0.1);
    tw.position.set(x, top, z);
    celestia.add(tw);
  }

  // colonnade arc on each islet rim
  const col = makeColonnade(d.r * 1.1, 12);
  const ca = d.a + Math.PI / 2;
  col.position.set(x + Math.cos(ca) * d.r * 0.5, top, z + Math.sin(ca) * d.r * 0.5);
  col.rotation.y = -ca;
  celestia.add(col);

  scatterGreenery(island, d.r * 0.85, d.r * 0.14 + 8, Math.floor(d.r / 8), Math.floor(d.r / 6));

  // ring road stub on each islet
  const stub = new THREE.Mesh(new THREE.TorusGeometry(d.r * 0.55, 4, 6, 36), M.stone2);
  stub.rotation.x = Math.PI / 2; stub.position.set(x, top + 1, z);
  stub.receiveShadow = true; celestia.add(stub);
});

/* grand arched bridges: main island ↔ each islet, plus ring links */
const bridgeEnds: THREE.Vector3[] = [];
for (let i = 0; i < isletData.length; i++) {
  const d = isletData[i];
  const dir = new THREE.Vector3(Math.cos(d.a), 0, Math.sin(d.a));
  const from = dir.clone().multiplyScalar(MAIN_R * 0.94);
  from.y = meadowY + 2;
  const to = isletCenters[i].clone().addScaledVector(dir, -d.r * 0.92);
  to.y = isletTops[i].y + 2;
  celestia.add(makeBridge(from, to, 46, 8));
  bridgeEnds.push(to);
}
// ring bridges between neighbouring islets (the signature ring silhouette)
for (let i = 0; i < isletData.length; i++) {
  const j = (i + 1) % isletData.length;
  const a = isletCenters[i].clone().addScaledVector(isletCenters[j].clone().sub(isletCenters[i]).normalize(), isletData[i].r * 0.9);
  const b = isletCenters[j].clone().addScaledVector(isletCenters[i].clone().sub(isletCenters[j]).normalize(), isletData[j].r * 0.9);
  a.y = isletTops[i].y + 2; b.y = isletTops[j].y + 2;
  // skip one link → broken bridge scar
  if (i === 6) {
    // broken: half bridge + tilted shard
    const mid = a.clone().add(b).multiplyScalar(0.5);
    celestia.add(makeBridge(a, mid.clone().add(new THREE.Vector3(0, -8, 0)), 30, 7));
    const shard = box(34, 5, 8, M.stone2);
    shard.position.copy(mid).add(new THREE.Vector3(10, -46, 4));
    shard.rotation.z = 0.6; shard.rotation.y = 0.4;
    celestia.add(shard);
  } else {
    celestia.add(makeBridge(a, b, 40, 7));
  }
}
// thin ring-road cables (torus arcs high above, linking islets faintly)
for (let i = 0; i < isletData.length; i++) {
  const a0 = isletData[i].a, a1 = isletData[(i + 1) % isletData.length].a;
  const span = a1 - a0 > 0 ? a1 - a0 : a1 - a0 + Math.PI * 2;
  const mid = a0 + span / 2;
  const p = new THREE.Vector3(Math.cos(mid) * (RING_R + 40), 90, Math.sin(mid) * (RING_R + 40));
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(span * RING_R / 2, 1.6, 6, 32, span), M.goldPale);
  ring1.position.copy(p).add(new THREE.Vector3(-Math.cos(mid) * (RING_R + 40), 0, -Math.sin(mid) * (RING_R + 40)));
  ring1.rotation.set(0, -a0 - Math.PI / 2, 0);
  celestia.add(ring1);
}

/* ---- ruins + debris in the gaps ---- */
for (let i = 0; i < 5; i++) {
  const a = rand(0, Math.PI * 2), d = rand(RING_R - 200, RING_R + 200);
  const ruin = makeTower(rand(24, 46), 8, true);
  ruin.position.set(Math.cos(a) * d, rand(-160, -40), Math.sin(a) * d);
  ruin.rotation.set(rand(-0.2, 0.2), rand(0, 3), rand(-0.2, 0.2));
  celestia.add(ruin);
}
for (let i = 0; i < 18; i++) {
  const a = rand(0, Math.PI * 2), d = rand(MAIN_R + 60, RING_R + 160);
  const deb = makeDebris(rand(0.8, 1.6));
  deb.position.set(Math.cos(a) * d, rand(-280, 120), Math.sin(a) * d);
  debris.push(deb);
  celestia.add(deb);
}

/* ============================ post feel (cheap, no passes) ============================ */
scene.environment = null; // keep cheap; toon + lights carry the look
renderer.outputColorSpace = THREE.SRGBColorSpace;

/* ============================ animation ============================ */
const clock = new THREE.Clock();
const armillaryHolders = armillary.children.slice() as THREE.Group[];
let debrisT = 0;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  debrisT += dt;

  // armillary slowly rotates (the celestial instrument turning)
  armillaryHolders.forEach((h, i) => {
    h.rotation.x += dt * (0.12 + i * 0.03);
    h.rotation.z += dt * (0.08 + i * 0.02);
  });
  armillary.rotation.y = Math.sin(t * 0.1) * 0.3;

  // waterfalls scroll
  for (const wf of waterfalls) {
    const off = (t * wf.speed) % 1;
    wf.mat.opacity = 0.55 + Math.sin(t * 2 + off * 6) * 0.15;
  }

  // cloud layers drift very slowly
  cloudLayers.forEach((layer, i) => {
    layer.rotation.y = Math.sin(t * 0.005 * (i + 1)) * 0.05;
  });

  // debris bob & sway
  for (let i = 0; i < debris.length; i++) {
    const d = debris[i];
    d.position.y += Math.sin(debrisT * 0.4 + i) * 0.01;
    d.rotation.y += dt * 0.02;
  }

  // light shafts shimmer
  shafts.forEach((s, i) => {
    (s.material as THREE.MeshBasicMaterial).opacity = 0.04 + Math.sin(t * 0.3 + i * 1.3) * 0.02;
  });

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
