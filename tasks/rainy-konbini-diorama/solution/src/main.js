import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import './style.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#071422');
scene.fog = new THREE.Fog('#071422', 48, 88);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
renderer.domElement.setAttribute('aria-label', '雨夜便利店三维微缩场景。拖拽旋转，滚轮缩放。');
renderer.domElement.setAttribute('role', 'img');
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 160);
camera.position.set(24, 17, 26);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.enablePan = false;
controls.minDistance = 14;
controls.maxDistance = 52;
controls.minPolarAngle = 0.22;
controls.maxPolarAngle = Math.PI * 0.47;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.8;
controls.update();

const world = new THREE.Group();
scene.add(world);

let seed = 0x41c6ce57;
function random() {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const rand = (min, max) => min + random() * (max - min);
const pick = (items) => items[Math.floor(random() * items.length)];

const gradient = new THREE.DataTexture(new Uint8Array([42, 105, 178, 255]), 4, 1, THREE.RedFormat);
gradient.minFilter = THREE.NearestFilter;
gradient.magFilter = THREE.NearestFilter;
gradient.generateMipmaps = false;
gradient.needsUpdate = true;

const toon = (color, options = {}) => new THREE.MeshToonMaterial({ color, gradientMap: gradient, ...options });
const m = {
  base: new THREE.MeshStandardMaterial({ color: '#152b3b', roughness: 0.48, metalness: 0.28 }),
  baseTrim: toon('#294758'),
  pavement: toon('#61727b'),
  alley: new THREE.MeshStandardMaterial({ color: '#263b48', roughness: 0.3, metalness: 0.25 }),
  road: new THREE.MeshStandardMaterial({ color: '#172c3c', roughness: 0.32, metalness: 0.28 }),
  curb: toon('#a7b6b5'),
  wall: toon('#d9ddcf'),
  innerWall: toon('#f0dfbd', { emissive: '#b87535', emissiveIntensity: 0.18 }),
  teal: toon('#237b78'),
  darkTeal: toon('#17474f'),
  cream: toon('#f3e9cc'),
  coral: toon('#e8755e'),
  yellow: toon('#efc870'),
  metal: toon('#637984'),
  darkMetal: toon('#23343f'),
  whiteMetal: toon('#c8d5d1'),
  wood: toon('#9b6d4e'),
  rubber: toon('#111d28'),
  warmLight: new THREE.MeshStandardMaterial({ color: '#fff0c8', emissive: '#ffd18b', emissiveIntensity: 2.2 }),
  coolLight: new THREE.MeshStandardMaterial({ color: '#d6ffff', emissive: '#8de7e4', emissiveIntensity: 1.8 }),
  glass: new THREE.MeshPhysicalMaterial({
    color: '#d9e5e5', transparent: true, opacity: 0.12, roughness: 0.08,
    metalness: 0.08, clearcoat: 1, clearcoatRoughness: 0.08,
    depthWrite: false, side: THREE.DoubleSide,
  }),
  marking: new THREE.MeshStandardMaterial({ color: '#d9e4df', roughness: 0.27, metalness: 0.22, emissive: '#a8d5cf', emissiveIntensity: 0.12 }),
};
const productMaterials = ['#e77b65', '#edc36d', '#75b8ad', '#7ca6c8', '#b68bb5', '#e7e0c4', '#91b976'].map((c) => toon(c));

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const unitEdges = new THREE.EdgesGeometry(unitBox, 24);
const ink = new THREE.LineBasicMaterial({ color: '#142630', transparent: true, opacity: 0.72 });
function box(parent, size, position, material, outlined = false) {
  const mesh = new THREE.Mesh(unitBox, material);
  mesh.scale.set(...size);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (outlined) mesh.add(new THREE.LineSegments(unitEdges, ink));
  parent.add(mesh);
  return mesh;
}
function cylinder(parent, radius, height, position, material, segments = 12, radiusTop = radius) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radius, height, segments), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function rod(parent, from, to, radius, material, segments = 8) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const direction = b.clone().sub(a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), segments), material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
function tube(parent, points, radius, material, segments = 28) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, radius, 6, false), material);
  parent.add(mesh);
  return mesh;
}
function labelTexture(text, width, height, options) {
  const canvas = document.createElement('canvas');
  canvas.width = options.canvasWidth || 768;
  canvas.height = options.canvasHeight || Math.max(64, Math.min(768, Math.round(canvas.width * height / width)));
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  if (options.bg) {
    ctx.fillStyle = options.bg;
    ctx.fillRect(0, 0, w, h);
  }
  if (options.border) {
    ctx.strokeStyle = options.border;
    ctx.lineWidth = Math.max(4, h * 0.035);
    ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, w - ctx.lineWidth, h - ctx.lineWidth);
  }
  if (options.bands) {
    ctx.fillStyle = '#2b8a7d';
    ctx.fillRect(0, h * 0.83, w * 0.55, h * 0.17);
    ctx.fillStyle = '#ed7b61';
    ctx.fillRect(w * 0.55, h * 0.83, w * 0.25, h * 0.17);
    ctx.fillStyle = '#eac56d';
    ctx.fillRect(w * 0.8, h * 0.83, w * 0.2, h * 0.17);
  }
  ctx.fillStyle = options.fg || '#f7f1db';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const family = '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif';
  const mainSize = options.fontSize || Math.min(h * (options.sub ? 0.43 : 0.56), w / (Math.max(text.length, 3) * 0.7));
  ctx.font = `${options.weight || 700} ${mainSize}px ${family}`;
  ctx.fillText(text, w / 2, options.sub ? h * 0.34 : h * 0.51);
  if (options.sub) {
    ctx.font = `600 ${options.subSize || h * 0.18}px ${family}`;
    ctx.fillText(options.sub, w / 2, h * 0.67);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
}
function label(parent, text, width, height, position, options = {}) {
  const texture = labelTexture(text, width, height, options);
  const material = options.lit
    ? new THREE.MeshStandardMaterial({ map: texture, emissiveMap: texture, emissive: '#ffffff', emissiveIntensity: 0.75, roughness: 0.38, side: THREE.DoubleSide })
    : new THREE.MeshBasicMaterial({ map: texture, transparent: !options.bg || !!options.transparent, depthWrite: !!options.bg && !options.transparent, side: THREE.DoubleSide, toneMapped: options.toneMapped !== false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  parent.add(mesh);
  return mesh;
}

const glowCanvas = document.createElement('canvas');
glowCanvas.width = glowCanvas.height = 128;
const glowCtx = glowCanvas.getContext('2d');
const glowGradient = glowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
glowGradient.addColorStop(0, 'rgba(255,255,255,0.8)');
glowGradient.addColorStop(0.18, 'rgba(255,255,255,0.32)');
glowGradient.addColorStop(1, 'rgba(255,255,255,0)');
glowCtx.fillStyle = glowGradient;
glowCtx.fillRect(0, 0, 128, 128);
const glowMap = new THREE.CanvasTexture(glowCanvas);
function glow(parent, position, color, scale, opacity = 0.4) {
  const material = new THREE.SpriteMaterial({ map: glowMap, color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(...position);
  sprite.scale.set(scale, scale, 1);
  parent.add(sprite);
  return sprite;
}

// The collectible base and its L-shaped wet street.
const base = new THREE.Mesh(new RoundedBoxGeometry(20, 0.82, 20, 4, 0.18), m.base);
base.position.y = -0.43;
base.castShadow = true;
base.receiveShadow = true;
world.add(base);
box(world, [19.55, 0.12, 19.55], [0, 0.02, 0], m.pavement, true);
box(world, [19.2, 0.08, 6], [0, 0.1, 6.4], m.road);
box(world, [4.8, 0.08, 12.8], [7, 0.1, -3], m.road);
box(world, [2.75, 0.05, 6.5], [-7.75, 0.105, -2.55], m.alley);
box(world, [13.85, 0.2, 0.2], [-2.47, 0.2, 3.32], m.curb, true);
box(world, [0.2, 0.2, 12.8], [4.52, 0.2, -3.02], m.curb, true);
box(world, [0.22, 0.24, 1.0], [4.48, 0.22, 3.28], m.curb);
label(world, '雨夜・AMEMACHI', 3.5, 0.34, [0, -0.38, 9.94], { bg: '#1d3645', fg: '#d6bb7b', border: '#806f51', fontSize: 34 });

for (let i = 0; i < 6; i++) {
  box(world, [0.38, 0.025, 4.45], [0.05 + i * 0.56, 0.165, 6.15], m.marking);
}
for (let i = 0; i < 6; i++) {
  box(world, [1.25, 0.022, 0.11], [-8.4 + i * 1.35, 0.16, 6.2], m.marking);
  box(world, [0.11, 0.022, 1.15], [7.0, 0.16, -8.2 + i * 1.55], m.marking);
}
// Side-street parking bay.
box(world, [2.6, 0.022, 0.09], [7.05, 0.16, -7.25], m.marking);
box(world, [2.6, 0.022, 0.09], [7.05, 0.16, -3.95], m.marking);
box(world, [0.09, 0.022, 3.35], [5.76, 0.16, -5.6], m.marking);
box(world, [0.09, 0.022, 3.35], [8.34, 0.16, -5.6], m.marking);
label(world, 'P', 1.25, 1.25, [7.05, 0.175, -5.62], { fg: '#cbdedc', rotation: [-Math.PI / 2, 0, 0], transparent: true, fontSize: 110 });

// Drainage channels and individually modeled grates.
box(world, [12.9, 0.055, 0.25], [-2.85, 0.13, 3.03], m.darkMetal);
box(world, [0.25, 0.055, 11.7], [4.23, 0.13, -3.25], m.darkMetal);
for (let i = 0; i < 34; i++) {
  box(world, [0.055, 0.035, 0.25], [-9.15 + i * 0.38, 0.17, 3.03], m.metal);
}
for (let i = 0; i < 30; i++) {
  box(world, [0.25, 0.035, 0.055], [4.23, 0.17, -8.8 + i * 0.39], m.metal);
}

// Store shell: warm interior visible through two glazed elevations.
box(world, [9.4, 0.24, 6.4], [-1.5, 0.24, -2.6], m.innerWall, true);
box(world, [9.4, 4.9, 0.18], [-1.5, 2.83, -5.72], m.innerWall, true);
box(world, [0.18, 4.9, 6.4], [-6.12, 2.83, -2.6], m.innerWall, true);
box(world, [0.18, 4.9, 4.0], [3.12, 2.83, -3.8], m.wall, true);
box(world, [9.4, 1.65, 0.2], [-1.5, 4.36, 0.52], m.wall, true);
box(world, [0.2, 1.65, 6.4], [3.12, 4.36, -2.6], m.wall, true);
box(world, [9.9, 0.28, 6.9], [-1.5, 5.35, -2.6], m.darkTeal, true);
box(world, [9.65, 0.48, 0.16], [-1.5, 5.61, -5.92], m.teal, true);
box(world, [0.16, 0.48, 6.55], [-6.3, 5.61, -2.6], m.teal, true);

const frontGlass = box(world, [5.55, 3.02, 0.045], [-3.18, 2.0, 0.655], m.glass);
frontGlass.castShadow = false;
const sideGlass = box(world, [0.045, 3.02, 2.35], [3.135, 2.0, -0.63], m.glass);
sideGlass.castShadow = false;
for (const x of [-6.02, -4.1, -2.15, -0.34, 2.58, 3.04]) {
  box(world, [0.085, 3.15, 0.11], [x, 1.99, 0.69], m.darkTeal);
}
box(world, [5.75, 0.09, 0.11], [-3.18, 0.48, 0.69], m.darkTeal);
box(world, [5.75, 0.1, 0.11], [-3.18, 3.5, 0.69], m.darkTeal);
box(world, [0.11, 0.09, 2.45], [3.17, 0.48, -0.63], m.darkTeal);
box(world, [0.11, 0.1, 2.45], [3.17, 3.5, -0.63], m.darkTeal);
for (const z of [-1.83, -0.65, 0.55]) box(world, [0.11, 3.12, 0.075], [3.17, 2.0, z], m.darkTeal);

box(world, [9.9, 0.16, 1.15], [-1.5, 3.66, 1.06], m.darkTeal, true);
box(world, [1.0, 0.16, 3.15], [3.64, 3.66, -0.76], m.darkTeal, true);
for (let i = 0; i < 16; i++) {
  box(world, [0.61, 0.3, 0.1], [-6.03 + i * 0.603, 3.56, 1.61], i % 2 ? m.cream : m.teal);
}
box(world, [0.12, 0.3, 3.15], [4.12, 3.56, -0.76], m.teal, true);

box(world, [9.0, 1.12, 0.18], [-1.5, 4.35, 0.67], m.darkTeal, true);
const storeSign = label(world, 'あかり MART', 8.72, 0.92, [-1.5, 4.35, 0.771], {
  bg: '#f8f1d9', fg: '#1c6966', sub: '24 HOURS  •  コンビニ', bands: true, lit: true, canvasHeight: 128, fontSize: 60, subSize: 19,
});
box(world, [0.18, 1.02, 3.4], [3.24, 4.3, -0.85], m.darkTeal, true);
label(world, 'あかり', 3.15, 0.82, [3.341, 4.3, -0.85], {
  bg: '#f8f1d9', fg: '#1c6966', sub: 'AKARI 24H', bands: true, lit: true, rotation: [0, Math.PI / 2, 0],
});
label(world, 'OPEN 24', 1.35, 0.54, [-4.95, 3.0, 0.7], { bg: '#173f48', fg: '#ffe2a0', border: '#e9bd6e', fontSize: 42, lit: true });
label(world, 'HOT COFFEE', 0.95, 0.82, [-1.02, 2.65, 0.7], { bg: '#f1d6aa', fg: '#784c37', sub: 'ホット', border: '#ffffff', fontSize: 43 });
label(world, 'おにぎり', 0.86, 0.72, [-5.47, 2.15, 0.7], { bg: '#e9f0d8', fg: '#386b5c', sub: '新発売', border: '#ffffff' });
box(world, [2.8, 0.09, 0.2], [1.15, 3.48, 0.72], m.darkMetal);
box(world, [2.8, 0.08, 0.22], [1.15, 0.48, 0.72], m.darkMetal);
box(world, [2.65, 0.06, 0.95], [1.15, 0.17, 1.28], m.rubber, true);
label(world, 'WELCOME', 1.7, 0.45, [1.15, 0.207, 1.3], { fg: '#839a94', rotation: [-Math.PI / 2, 0, 0], transparent: true });

function doorPanel(x) {
  const group = new THREE.Group();
  group.position.set(x, 2.0, 0.735);
  const pane = box(group, [1.28, 2.78, 0.045], [0, 0, 0], m.glass);
  pane.castShadow = false;
  for (const side of [-0.66, 0.66]) box(group, [0.065, 2.94, 0.09], [side, 0, 0], m.darkTeal);
  for (const y of [-1.43, 1.43]) box(group, [1.37, 0.065, 0.09], [0, y, 0], m.darkTeal);
  box(group, [1.28, 0.045, 0.07], [0, 0.15, 0.035], m.whiteMetal);
  world.add(group);
  return group;
}
const leftDoor = doorPanel(0.45);
const rightDoor = doorPanel(1.85);
box(world, [0.24, 0.13, 0.16], [1.15, 3.42, 0.8], m.darkMetal);

// Interior refrigerator wall, fully stocked behind glass.
function fridge(x) {
  const group = new THREE.Group();
  group.position.set(x, 0.36, -5.24);
  box(group, [1.43, 2.56, 0.58], [0, 1.28, 0], m.whiteMetal, true);
  box(group, [1.24, 1.88, 0.04], [0, 1.25, 0.315], m.warmLight);
  for (let row = 0; row < 3; row++) {
    const y = 0.65 + row * 0.56;
    box(group, [1.22, 0.045, 0.42], [0, y - 0.23, 0.12], m.metal);
    for (let col = 0; col < 6; col++) {
      cylinder(group, 0.072, 0.22, [-0.5 + col * 0.2, y, 0.38], productMaterials[(row + col) % productMaterials.length], 8);
    }
  }
  const pane = box(group, [1.23, 1.9, 0.025], [0, 1.25, 0.46], m.glass);
  pane.castShadow = false;
  box(group, [0.04, 1.85, 0.05], [0, 1.25, 0.48], m.darkMetal);
  box(group, [0.035, 0.52, 0.06], [0.12, 1.3, 0.51], m.whiteMetal);
  label(group, 'COLD DRINKS', 1.26, 0.22, [0, 2.39, 0.32], { bg: '#e9f4e9', fg: '#36827d', fontSize: 38, lit: true });
  world.add(group);
}
[-4.9, -3.35, -1.8, -0.25].forEach(fridge);
label(world, 'STAFF ONLY', 1.4, 2.48, [2.03, 1.62, -5.606], { bg: '#87918a', fg: '#e9e3cc', sub: '関係者以外立入禁止', border: '#465c5c', fontSize: 54 });
box(world, [0.08, 0.35, 0.08], [2.55, 1.55, -5.49], m.darkMetal);

function productShelf(z, title) {
  const group = new THREE.Group();
  group.position.set(-2.55, 0.36, z);
  box(group, [3.72, 0.14, 0.82], [0, 0.08, 0], m.darkTeal, true);
  for (const x of [-1.79, 1.79]) box(group, [0.08, 1.42, 0.76], [x, 0.74, 0], m.metal);
  for (let level = 0; level < 3; level++) {
    const y = 0.25 + level * 0.43;
    box(group, [3.58, 0.06, 0.76], [0, y, 0], m.whiteMetal);
    for (let col = 0; col < 10; col++) {
      const material = productMaterials[(col + level * 2) % productMaterials.length];
      box(group, [0.25, 0.28 + (col % 3) * 0.035, 0.25], [-1.53 + col * 0.34, y + 0.18, 0.19], material);
      if (level < 2) box(group, [0.25, 0.25, 0.22], [-1.53 + col * 0.34, y + 0.16, -0.2], productMaterials[(col + level + 3) % productMaterials.length]);
    }
    box(group, [3.52, 0.09, 0.045], [0, y + 0.01, 0.405], m.cream);
  }
  label(group, title, 2.65, 0.21, [0, 1.58, 0.41], { bg: '#276f6b', fg: '#fff0c8', fontSize: 38 });
  world.add(group);
}
productShelf(-1.55, 'BENTO  •  ONIGIRI');
productShelf(-3.35, 'SNACKS  •  SWEETS');

const checkout = new THREE.Group();
checkout.position.set(1.45, 0.36, -1.45);
box(checkout, [1.78, 0.85, 0.8], [0, 0.43, 0], m.cream, true);
box(checkout, [1.87, 0.09, 0.88], [0, 0.89, 0], m.darkTeal);
label(checkout, 'COFFEE  •  ODEN', 1.5, 0.22, [0, 0.46, 0.412], { bg: '#e9dfc4', fg: '#39756d', fontSize: 38 });
box(checkout, [0.38, 0.18, 0.35], [-0.52, 1.02, 0.05], m.darkMetal);
const register = box(checkout, [0.46, 0.34, 0.08], [-0.52, 1.26, -0.05], m.darkMetal);
register.rotation.x = -0.18;
label(checkout, '¥ 680', 0.36, 0.22, [-0.52, 1.28, 0.001], { bg: '#b7e3cf', fg: '#264e4a', fontSize: 44, lit: true });
box(checkout, [0.58, 0.72, 0.46], [0.48, 1.28, -0.08], m.metal, true);
box(checkout, [0.42, 0.26, 0.035], [0.48, 1.43, 0.165], m.darkMetal);
for (const x of [0.37, 0.57]) {
  cylinder(checkout, 0.035, 0.19, [x, 1.16, 0.19], m.darkMetal, 8);
  cylinder(checkout, 0.075, 0.12, [x, 0.99, 0.2], m.cream, 10);
}
box(checkout, [0.64, 0.13, 0.43], [-0.02, 1.0, 0.22], m.metal);
for (let i = 0; i < 6; i++) box(checkout, [0.16, 0.055, 0.16], [-0.22 + (i % 3) * 0.2, 1.08, 0.13 + Math.floor(i / 3) * 0.18], productMaterials[i]);
world.add(checkout);

const magazines = new THREE.Group();
magazines.position.set(-5.83, 0.36, -1.65);
magazines.rotation.y = Math.PI / 2;
box(magazines, [1.85, 1.72, 0.32], [0, 0.87, 0], m.darkTeal, true);
for (let row = 0; row < 3; row++) {
  box(magazines, [1.72, 0.07, 0.34], [0, 0.32 + row * 0.48, 0.1], m.whiteMetal);
  for (let col = 0; col < 5; col++) {
    const cover = label(magazines, ['週刊', '映画', '漫画'][row], 0.28, 0.4, [-0.65 + col * 0.33, 0.52 + row * 0.48, 0.185], {
      bg: ['#e6b879', '#8eb6bd', '#d88c7d'][(row + col) % 3], fg: '#273c46', fontSize: 42,
    });
    cover.rotation.x = -0.08;
  }
}
label(magazines, 'MAGAZINES', 1.65, 0.22, [0, 1.66, 0.18], { bg: '#f0e5c8', fg: '#326c67', fontSize: 40 });
world.add(magazines);

const freezer = new THREE.Group();
freezer.position.set(-4.75, 0.36, -0.12);
box(freezer, [1.72, 0.77, 0.86], [0, 0.39, 0], m.cream, true);
const freezerGlass = box(freezer, [1.56, 0.045, 0.72], [0, 0.8, 0], m.glass);
freezerGlass.castShadow = false;
box(freezer, [0.05, 0.055, 0.75], [0, 0.83, 0], m.metal);
label(freezer, 'ICE CREAM', 1.42, 0.25, [0, 0.42, 0.44], { bg: '#8bc6c4', fg: '#173f4c', fontSize: 42 });
world.add(freezer);

for (const z of [-2.25, -3.75]) {
  label(world, '→', 0.62, 0.62, [0.05, 0.372, z], { fg: '#d7b65f', rotation: [-Math.PI / 2, 0, 0], transparent: true, fontSize: 110 });
}
label(world, 'お弁当  •  ホットスナック', 3.3, 0.48, [-2.5, 3.08, -4.7], { bg: '#f4e5bd', fg: '#537b6b', border: '#e0b66c', lit: true });
for (const x of [-3.9, -0.8, 1.8]) {
  box(world, [1.65, 0.07, 0.42], [x, 4.79, -2.4], m.warmLight);
}
const indoorLightA = new THREE.PointLight('#ffad62', 52, 10, 2);
indoorLightA.position.set(-2.7, 3.7, -2.1);
world.add(indoorLightA);
const indoorLightB = new THREE.PointLight('#ffbd75', 42, 8, 2);
indoorLightB.position.set(1.5, 3.4, -1.1);
world.add(indoorLightB);
glow(world, [-1.5, 4.32, 0.95], '#8de7d8', 8.5, 0.12);

// Rooftop equipment and exterior air conditioners.
box(world, [1.6, 0.72, 1.05], [-3.5, 5.82, -3.8], m.metal, true);
for (let i = 0; i < 7; i++) box(world, [1.3, 0.035, 0.045], [-3.5, 6.2, -4.15 + i * 0.12], m.darkMetal);
cylinder(world, 0.32, 0.65, [0.5, 5.78, -4.0], m.metal, 16);
cylinder(world, 0.42, 0.12, [0.5, 6.14, -4.0], m.darkMetal, 16);
box(world, [1.2, 0.16, 0.82], [1.65, 5.58, -1.95], m.metal, true);
box(world, [1.02, 0.045, 0.65], [1.65, 5.69, -1.95], m.darkMetal);
box(world, [0.86, 0.44, 0.72], [-0.8, 5.72, -1.85], m.whiteMetal, true);
for (let i = 0; i < 5; i++) box(world, [0.055, 0.3, 0.04], [-1.1 + i * 0.15, 5.72, -1.47], m.darkMetal);
tube(world, [[-3.0, 5.66, -3.8], [-2.35, 5.66, -3.8], [-2.35, 5.66, -2.3], [-1.25, 5.66, -2.3]], 0.09, m.metal, 16);
cylinder(world, 0.16, 0.72, [2.15, 5.85, -4.55], m.metal, 12);
cylinder(world, 0.25, 0.09, [2.15, 6.24, -4.55], m.darkMetal, 12);

function airConditioner(position, rotationY) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.y = rotationY;
  box(group, [1.3, 0.88, 0.48], [0, 0, 0], m.whiteMetal, true);
  const fan = new THREE.Mesh(new THREE.CircleGeometry(0.31, 24), m.darkMetal);
  fan.position.set(-0.25, 0, 0.251);
  group.add(fan);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.022, 6, 28), m.metal);
  ring.position.set(-0.25, 0, 0.265);
  group.add(ring);
  for (let i = 0; i < 6; i++) {
    const blade = box(group, [0.5, 0.025, 0.025], [-0.25, 0, 0.278], m.metal);
    blade.rotation.z = i * Math.PI / 6;
  }
  for (let i = 0; i < 5; i++) box(group, [0.35, 0.035, 0.03], [0.4, -0.24 + i * 0.12, 0.26], m.darkMetal);
  world.add(group);
}
airConditioner([3.44, 1.1, -4.35], Math.PI / 2);
airConditioner([-6.42, 1.15, -3.9], -Math.PI / 2);
tube(world, [[3.28, 1.3, -4.8], [3.3, 2.0, -5.0], [3.3, 3.4, -5.0]], 0.035, m.whiteMetal, 12);

// Side alley with a dark neighboring wall, posters, pipes and crates.
box(world, [0.24, 4.25, 6.55], [-9.15, 2.23, -2.55], toon('#354653'), true);
box(world, [0.32, 0.18, 6.7], [-9.13, 4.41, -2.55], m.darkMetal);
for (const z of [-4.8, -1.2]) {
  rod(world, [-9.0, 0.25, z], [-9.0, 3.95, z], 0.055, m.metal);
  tube(world, [[-9.0, 3.95, z], [-8.9, 4.15, z], [-8.45, 4.15, z]], 0.055, m.metal, 10);
}
label(world, '路地', 1.0, 0.5, [-7.72, 3.25, 0.61], { bg: '#26464e', fg: '#eac680', border: '#66867e', fontSize: 56, lit: true });
label(world, '映画祭', 0.78, 1.05, [-8.99, 2.15, -1.55], { bg: '#d79a75', fg: '#3f3c42', sub: 'AMEMACHI', border: '#edc99c', rotation: [0, Math.PI / 2, 0] });
label(world, '防犯', 0.68, 0.82, [-8.99, 1.65, -3.0], { bg: '#cbd8c5', fg: '#355e58', sub: 'みんなで', rotation: [0, Math.PI / 2, 0] });
box(world, [0.8, 0.55, 0.75], [-7.2, 0.43, -4.8], m.wood, true);
box(world, [0.65, 0.45, 0.62], [-7.75, 0.38, -5.0], m.wood, true);
const alleyLamp = new THREE.PointLight('#ffbf78', 16, 4.5, 2);
alleyLamp.position.set(-7.8, 3.15, -0.1);
world.add(alleyLamp);
box(world, [0.65, 0.16, 0.35], [-7.8, 3.25, 0.05], m.warmLight);
glow(world, [-7.8, 3.1, 0.4], '#ffbd72', 2.0, 0.25);

// Drink vending machine on the side elevation.
function vendingMachine() {
  const group = new THREE.Group();
  group.position.set(3.88, 0.15, -2.25);
  group.rotation.y = Math.PI / 2;
  box(group, [1.28, 2.3, 0.76], [0, 1.15, 0], m.coral, true);
  box(group, [1.02, 1.32, 0.04], [0, 1.35, 0.4], m.darkMetal);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      cylinder(group, 0.073, 0.21, [-0.36 + col * 0.24, 0.95 + row * 0.38, 0.455], productMaterials[(row * 2 + col) % productMaterials.length], 8);
      box(group, [0.15, 0.045, 0.025], [-0.36 + col * 0.24, 0.79 + row * 0.38, 0.47], m.coolLight);
    }
  }
  const pane = box(group, [1.0, 1.26, 0.025], [0, 1.36, 0.49], m.glass);
  pane.castShadow = false;
  label(group, 'つめた〜い', 1.08, 0.34, [0, 2.12, 0.4], { bg: '#f4e5cc', fg: '#c45249', fontSize: 52, lit: true });
  box(group, [0.3, 0.38, 0.06], [0.34, 0.48, 0.42], m.darkMetal);
  box(group, [0.11, 0.06, 0.035], [0.34, 0.55, 0.46], m.coolLight);
  box(group, [0.52, 0.18, 0.06], [-0.2, 0.23, 0.42], m.darkMetal);
  const light = new THREE.PointLight('#ffb89b', 12, 3.5, 2);
  light.position.set(0, 1.5, 0.8);
  group.add(light);
  glow(group, [0, 1.45, 0.65], '#ff9d85', 2.0, 0.16);
  world.add(group);
}
vendingMachine();

// Bicycle with frame, spokes, mudguards, basket and kickstand.
function bicycle() {
  const group = new THREE.Group();
  group.position.set(-4.05, 0.13, 1.72);
  group.rotation.y = -0.12;
  const frame = toon('#77b7a5');
  for (const x of [-0.78, 0.78]) {
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.49, 0.045, 8, 32), m.rubber);
    tire.position.set(x, 0.52, 0);
    group.add(tire);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.425, 0.014, 5, 28), m.whiteMetal);
    rim.position.copy(tire.position);
    group.add(rim);
    for (let i = 0; i < 10; i++) {
      const a = i * Math.PI / 5;
      rod(group, [x, 0.52, 0], [x + Math.cos(a) * 0.42, 0.52 + Math.sin(a) * 0.42, 0], 0.006, m.metal, 5);
    }
  }
  const rear = [-0.78, 0.52, 0];
  const front = [0.78, 0.52, 0];
  const crank = [-0.05, 0.55, 0];
  const seat = [-0.28, 1.14, 0];
  const head = [0.48, 1.13, 0];
  for (const [a, b] of [[rear, seat], [seat, crank], [crank, rear], [seat, head], [head, crank], [head, front]]) rod(group, a, b, 0.026, frame);
  rod(group, [-0.28, 1.08, 0], [-0.34, 1.36, 0], 0.025, m.metal);
  box(group, [0.35, 0.07, 0.18], [-0.36, 1.36, 0], m.rubber);
  rod(group, [0.48, 1.12, 0], [0.45, 1.48, 0], 0.025, m.metal);
  rod(group, [0.45, 1.48, -0.25], [0.45, 1.48, 0.25], 0.022, m.metal);
  box(group, [0.5, 0.38, 0.42], [0.83, 1.25, 0], m.darkTeal, true);
  for (let i = 0; i < 5; i++) box(group, [0.025, 0.4, 0.44], [0.63 + i * 0.1, 1.26, 0], m.metal);
  const chain = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.018, 5, 20), m.darkMetal);
  chain.position.set(-0.05, 0.55, 0.055);
  group.add(chain);
  rod(group, [-0.05, 0.55, 0.06], [0.18, 0.44, 0.06], 0.018, m.metal);
  box(group, [0.2, 0.04, 0.12], [0.2, 0.43, 0.06], m.rubber);
  rod(group, [-0.2, 0.5, 0], [-0.42, 0.05, 0.18], 0.018, m.metal);
  world.add(group);
}
bicycle();

// Umbrella rack, separated recycling bins and a small notice board.
const umbrellas = new THREE.Group();
umbrellas.position.set(-0.43, 0.15, 1.28);
box(umbrellas, [0.68, 0.35, 0.45], [0, 0.18, 0], m.metal, true);
for (let i = 0; i < 4; i++) {
  const x = -0.24 + i * 0.16;
  rod(umbrellas, [x, 0.25, 0], [x + 0.05, 1.23 + (i % 2) * 0.12, 0], 0.018, m.darkMetal);
  cylinder(umbrellas, 0.025, 0.75, [x + 0.025, 0.7, 0], productMaterials[(i + 1) % productMaterials.length], 8, 0.095);
}
world.add(umbrellas);

const bins = new THREE.Group();
bins.position.set(3.86, 0.15, 0.28);
bins.rotation.y = Math.PI / 2;
for (let i = 0; i < 2; i++) {
  const x = -0.4 + i * 0.8;
  box(bins, [0.66, 0.96, 0.62], [x, 0.48, 0], i ? m.teal : m.metal, true);
  box(bins, [0.7, 0.09, 0.66], [x, 1.0, 0], m.darkMetal);
  label(bins, i ? 'CAN' : 'PET', 0.46, 0.22, [x, 0.65, 0.321], { bg: '#e6e6cf', fg: '#355b5a', fontSize: 46 });
  box(bins, [0.3, 0.06, 0.04], [x, 0.9, 0.335], m.rubber);
}
world.add(bins);

const notice = new THREE.Group();
notice.position.set(-7.55, 0.15, 1.15);
for (const x of [-0.63, 0.63]) rod(notice, [x, 0, 0], [x, 2.15, 0], 0.045, m.darkMetal);
box(notice, [1.55, 1.18, 0.12], [0, 1.52, 0], m.wood, true);
label(notice, '町内掲示板', 1.38, 0.25, [0, 1.94, 0.07], { bg: '#e5d4ae', fg: '#5f4c3e', fontSize: 42 });
label(notice, '夏祭り', 0.55, 0.65, [-0.36, 1.45, 0.071], { bg: '#d98b6c', fg: '#f8e5bf', sub: '8.24', fontSize: 54 });
label(notice, '防災', 0.55, 0.65, [0.36, 1.45, 0.071], { bg: '#b8d2bf', fg: '#3f6257', sub: 'MAP', fontSize: 54 });
world.add(notice);

function plant(x, z) {
  cylinder(world, 0.24, 0.38, [x, 0.34, z], toon('#a7745d'), 12, 0.3);
  for (let i = 0; i < 7; i++) {
    const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), toon(i % 2 ? '#527d65' : '#6f9670'));
    leaf.scale.set(0.65, 1.7, 0.7);
    leaf.position.set(x + rand(-0.18, 0.18), rand(0.65, 0.95), z + rand(-0.15, 0.15));
    leaf.rotation.z = rand(-0.5, 0.5);
    leaf.castShadow = true;
    world.add(leaf);
  }
}
plant(-5.85, 1.18);
plant(2.92, 1.22);

// Street lamps, utility poles and gently sagging overhead wires.
cylinder(world, 0.1, 5.75, [4.18, 3.02, 2.68], m.darkMetal, 12);
cylinder(world, 0.22, 0.18, [4.18, 0.24, 2.68], m.metal, 12);
tube(world, [[4.18, 5.82, 2.68], [4.35, 6.02, 2.68], [4.85, 6.0, 2.68], [5.18, 5.72, 2.68]], 0.075, m.darkMetal, 18);
box(world, [0.75, 0.18, 0.45], [5.2, 5.63, 2.68], m.darkMetal, true);
box(world, [0.58, 0.055, 0.34], [5.2, 5.52, 2.68], m.warmLight);
const streetLight = new THREE.PointLight('#ffc27a', 48, 9, 2);
streetLight.position.set(5.2, 5.35, 2.68);
world.add(streetLight);
glow(world, [5.2, 5.43, 2.68], '#ffc271', 3.2, 0.42);

function utilityPole(x, z) {
  cylinder(world, 0.14, 7.55, [x, 3.93, z], toon('#4d5151'), 12);
  box(world, [1.85, 0.13, 0.16], [x, 7.05, z], m.darkMetal);
  box(world, [1.35, 0.12, 0.14], [x, 6.55, z], m.darkMetal);
  for (const dx of [-0.72, 0, 0.72]) {
    cylinder(world, 0.065, 0.26, [x + dx, 7.24, z], m.cream, 8);
  }
  cylinder(world, 0.33, 0.85, [x + 0.35, 5.9, z], m.metal, 14);
  label(world, '雨宮町', 0.82, 0.34, [x, 4.75, z + 0.16], { bg: '#315f67', fg: '#eef0d9', fontSize: 44 });
}
utilityPole(-8.15, -7.65);
utilityPole(8.25, -7.65);
for (let i = 0; i < 3; i++) {
  tube(world, [[-8.85 + i * 0.7, 7.3, -7.65], [-4.5 + i * 0.35, 6.45 - i * 0.12, -7.65], [0, 6.25 - i * 0.12, -7.65], [4.5 + i * 0.35, 6.45 - i * 0.12, -7.65], [7.55 + i * 0.7, 7.3, -7.65]], 0.022, m.rubber, 40);
}
tube(world, [[8.25, 6.6, -7.65], [8.4, 5.9, -3.5], [8.35, 5.75, 1.0], [8.3, 6.1, 6.8]], 0.025, m.rubber, 36);

// Corner street sign and guardrails.
rod(world, [-7.6, 0.15, 2.65], [-7.6, 3.65, 2.65], 0.055, m.metal);
label(world, '雨宮町  3', 1.75, 0.52, [-7.6, 3.38, 2.68], { bg: '#326c70', fg: '#f1edcf', sub: 'AMEMIYA  •  3-CHOME', border: '#c3d6c9' });
label(world, '一方通行', 1.15, 0.4, [-7.6, 2.75, 2.68], { bg: '#e9e5ce', fg: '#4d5c5c', border: '#697d79', fontSize: 45 });
for (const z of [-2.6, -0.8, 1.0]) {
  rod(world, [8.8, 0.15, z], [8.8, 1.15, z], 0.055, m.whiteMetal);
}
rod(world, [8.8, 0.98, -2.6], [8.8, 0.98, 1.0], 0.06, m.whiteMetal);
rod(world, [8.8, 0.52, -2.6], [8.8, 0.52, 1.0], 0.045, m.whiteMetal);
for (const x of [-8.5, -6.8, -5.1]) rod(world, [x, 0.15, 8.85], [x, 1.0, 8.85], 0.05, m.whiteMetal);
rod(world, [-8.5, 0.86, 8.85], [-5.1, 0.86, 8.85], 0.055, m.whiteMetal);

// A distant, deliberately subtle traffic signal.
rod(world, [8.1, 0.15, -7.0], [8.1, 3.95, -7.0], 0.07, m.darkMetal);
box(world, [0.52, 1.15, 0.34], [8.1, 3.55, -6.96], m.darkMetal, true);
const trafficColors = ['#d95c58', '#d7a64e', '#63b798'];
const trafficLights = trafficColors.map((color, i) => {
  const material = new THREE.MeshStandardMaterial({ color: '#243634', emissive: color, emissiveIntensity: i === 2 ? 2.2 : 0.12, roughness: 0.45 });
  const light = new THREE.Mesh(new THREE.CircleGeometry(0.14, 20), material);
  light.position.set(8.1, 3.9 - i * 0.35, -6.775);
  world.add(light);
  return material;
});
label(world, '歩行者優先', 1.3, 0.36, [8.1, 2.55, -6.96], { bg: '#416f70', fg: '#f0e8cb', fontSize: 42 });

// Stylized wet reflections: soft additive color, broken up by puddle geometry.
const reflectionCanvas = document.createElement('canvas');
reflectionCanvas.width = 128;
reflectionCanvas.height = 256;
const reflectionCtx = reflectionCanvas.getContext('2d');
const reflectionGradient = reflectionCtx.createRadialGradient(64, 128, 0, 64, 128, 126);
reflectionGradient.addColorStop(0, 'rgba(255,255,255,0.85)');
reflectionGradient.addColorStop(0.25, 'rgba(255,255,255,0.42)');
reflectionGradient.addColorStop(1, 'rgba(255,255,255,0)');
reflectionCtx.fillStyle = reflectionGradient;
reflectionCtx.fillRect(0, 0, 128, 256);
const reflectionMap = new THREE.CanvasTexture(reflectionCanvas);
const reflections = [];
function reflection(x, z, width, length, color, opacity, angle = 0) {
  const material = new THREE.MeshBasicMaterial({ map: reflectionMap, color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, length), material);
  mesh.rotation.set(-Math.PI / 2, 0, angle);
  mesh.position.set(x, 0.164, z);
  mesh.renderOrder = 2;
  world.add(mesh);
  reflections.push({ material, opacity, phase: rand(0, Math.PI * 2) });
}
reflection(-3.8, 4.95, 2.1, 4.0, '#55d7c4', 0.38, -0.08);
reflection(-1.4, 5.15, 1.25, 4.4, '#ffb17b', 0.32, 0.06);
reflection(0.4, 4.75, 1.3, 3.3, '#f5d68a', 0.28, -0.1);
reflection(5.95, 2.65, 1.6, 3.8, '#ffc071', 0.4, 0.12);
reflection(5.6, -2.3, 1.4, 3.0, '#ff7f79', 0.28, -0.06);
reflection(7.8, -6.4, 0.65, 1.8, '#65c4a6', 0.16);
reflection(-4.5, 6.4, 0.5, 3.8, '#78ead9', 0.2, 0.02);
reflection(-0.9, 6.3, 0.42, 3.4, '#ffc58b', 0.18, -0.08);

const puddleMaterial = new THREE.MeshStandardMaterial({ color: '#28495d', roughness: 0.08, metalness: 0.48, transparent: true, opacity: 0.68, depthWrite: false });
for (const [x, z, sx, sz] of [[-5.8, 5.0, 1.7, 0.65], [-1.8, 7.7, 1.3, 0.55], [2.6, 4.2, 1.1, 0.5], [6.2, 0.2, 0.75, 1.4], [7.7, -3.0, 0.7, 1.0], [-7.6, -1.8, 0.55, 1.2]]) {
  const shape = new THREE.Shape();
  for (let i = 0; i <= 24; i++) {
    const a = i / 24 * Math.PI * 2;
    const r = 0.82 + random() * 0.22;
    const px = Math.cos(a) * sx * r;
    const py = Math.sin(a) * sz * r;
    if (i === 0) shape.moveTo(px, py); else shape.lineTo(px, py);
  }
  const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), puddleMaterial);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0.153, z);
  mesh.renderOrder = 1;
  world.add(mesh);
}

// Lighting keeps the exterior cool while the store remains warm and legible.
scene.add(new THREE.HemisphereLight('#91b9dd', '#172331', 1.45));
const moon = new THREE.DirectionalLight('#a7caff', 2.15);
moon.position.set(-11, 19, 12);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -16;
moon.shadow.camera.right = 16;
moon.shadow.camera.top = 16;
moon.shadow.camera.bottom = -16;
moon.shadow.camera.near = 1;
moon.shadow.camera.far = 55;
moon.shadow.bias = -0.00035;
moon.shadow.normalBias = 0.025;
scene.add(moon);
const rim = new THREE.DirectionalLight('#42a6b3', 0.75);
rim.position.set(12, 8, -14);
scene.add(rim);

// Continuous rain uses preallocated buffers; no allocations in the frame loop.
const rainCount = 950;
const rainPositions = new Float32Array(rainCount * 6);
const rainSpeeds = new Float32Array(rainCount);
const rainLengths = new Float32Array(rainCount);
for (let i = 0; i < rainCount; i++) {
  const j = i * 6;
  const x = rand(-9.7, 9.7);
  const y = rand(0.2, 14);
  const z = rand(-9.7, 9.7);
  const length = rand(0.16, 0.42);
  rainLengths[i] = length;
  rainSpeeds[i] = rand(7, 12);
  rainPositions.set([x, y, z, x - 0.09, y + length, z + 0.025], j);
}
const rainGeometry = new THREE.BufferGeometry();
rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
const rainMaterial = new THREE.LineBasicMaterial({ color: '#b5d9ee', transparent: true, opacity: 0.32, depthWrite: false });
const rain = new THREE.LineSegments(rainGeometry, rainMaterial);
rain.frustumCulled = false;
world.add(rain);

const dripCount = 42;
const dripPositions = new Float32Array(dripCount * 6);
const dripSpeeds = new Float32Array(dripCount);
for (let i = 0; i < dripCount; i++) {
  const j = i * 6;
  const side = i >= 30;
  const x = side ? 4.14 : rand(-6.25, 3.25);
  const y = rand(0.25, 3.5);
  const z = side ? rand(-2.2, 0.7) : 1.65;
  dripSpeeds[i] = rand(3.2, 5.2);
  dripPositions.set([x, y, z, x, y + 0.13, z], j);
}
const dripGeometry = new THREE.BufferGeometry();
dripGeometry.setAttribute('position', new THREE.BufferAttribute(dripPositions, 3));
const drips = new THREE.LineSegments(dripGeometry, new THREE.LineBasicMaterial({ color: '#d2edf2', transparent: true, opacity: 0.5, depthWrite: false }));
world.add(drips);

function runoffFront(count) {
  const positions = new Float32Array(count * 6);
  const speeds = new Float32Array(count);
  const lengths = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const j = i * 6;
    const x = rand(-5.85, -0.48);
    const y = rand(0.58, 3.42);
    const length = rand(0.08, 0.27);
    lengths[i] = length;
    speeds[i] = rand(0.08, 0.26);
    positions.set([x, y, 0.687, x + 0.012, y + length, 0.687], j);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: '#dcf5ed', transparent: true, opacity: 0.28, depthWrite: false }));
  world.add(lines);
  return { positions, speeds, lengths, geometry };
}
const runoff = runoffFront(76);

const ripples = [];
const ripplePositions = [[-5.5, 4.9], [-3.9, 5.3], [-1.5, 7.6], [0.8, 4.4], [2.8, 5.0], [6.1, 0.3], [6.5, -0.4], [7.7, -3.0], [5.4, 3.0], [-7.6, -1.7], [-2.2, 4.1], [1.7, 7.8]];
for (const [x, z] of ripplePositions) {
  const material = new THREE.MeshBasicMaterial({ color: '#b7d9df', transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false });
  const mesh = new THREE.Mesh(new THREE.RingGeometry(0.82, 1, 32), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0.18, z);
  mesh.renderOrder = 3;
  world.add(mesh);
  ripples.push({ mesh, material, phase: random(), speed: rand(0.28, 0.48) });
}

const clock = new THREE.Clock();
let elapsed = 0;
const smoothstep = (a, b, value) => {
  const x = THREE.MathUtils.clamp((value - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};
function updateRain(dt) {
  for (let i = 0; i < rainCount; i++) {
    const j = i * 6;
    let x = rainPositions[j] - dt * 0.42;
    let y = rainPositions[j + 1] - rainSpeeds[i] * dt;
    let z = rainPositions[j + 2] + dt * 0.1;
    const overStore = x > -6.35 && x < 3.35 && z > -5.95 && z < 0.85;
    if (y < 0.16 || (overStore && y < 5.55) || x < -9.8 || z > 9.8) {
      x = rand(-9.65, 9.65);
      y = rand(11, 15);
      z = rand(-9.65, 9.65);
    }
    rainPositions[j] = x;
    rainPositions[j + 1] = y;
    rainPositions[j + 2] = z;
    rainPositions[j + 3] = x - 0.09;
    rainPositions[j + 4] = y + rainLengths[i];
    rainPositions[j + 5] = z + 0.025;
  }
  rainGeometry.attributes.position.needsUpdate = true;
  for (let i = 0; i < dripCount; i++) {
    const j = i * 6;
    let y = dripPositions[j + 1] - dripSpeeds[i] * dt;
    if (y < 0.15) y = 3.52;
    dripPositions[j + 1] = y;
    dripPositions[j + 4] = y + 0.13;
  }
  dripGeometry.attributes.position.needsUpdate = true;
  for (let i = 0; i < runoff.speeds.length; i++) {
    const j = i * 6;
    let y = runoff.positions[j + 1] - runoff.speeds[i] * dt;
    if (y < 0.55) y = 3.4;
    runoff.positions[j + 1] = y;
    runoff.positions[j + 4] = y + runoff.lengths[i];
  }
  runoff.geometry.attributes.position.needsUpdate = true;
}

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;
  updateRain(dt);

  for (const ripple of ripples) {
    const p = (elapsed * ripple.speed + ripple.phase) % 1;
    const scale = 0.08 + p * 0.72;
    ripple.mesh.scale.set(scale, scale, scale);
    ripple.material.opacity = (1 - p) * 0.28;
  }
  for (const item of reflections) item.material.opacity = item.opacity * (0.88 + Math.sin(elapsed * 1.7 + item.phase) * 0.12);

  const doorPhase = elapsed % 18;
  let doorOpen = 0;
  if (doorPhase >= 10 && doorPhase < 11.5) doorOpen = smoothstep(10, 11.5, doorPhase);
  else if (doorPhase >= 11.5 && doorPhase < 14) doorOpen = 1;
  else if (doorPhase >= 14 && doorPhase < 15.5) doorOpen = 1 - smoothstep(14, 15.5, doorPhase);
  leftDoor.position.x = 0.45 - doorOpen * 0.95;
  rightDoor.position.x = 1.85 + doorOpen * 0.95;

  const flicker = 0.96 + Math.sin(elapsed * 2.1) * 0.025 - Math.pow(Math.max(0, Math.sin(elapsed * 0.47)), 32) * 0.09;
  storeSign.material.emissiveIntensity = 0.78 * flicker;
  indoorLightA.intensity = 52 * (0.985 + Math.sin(elapsed * 0.7) * 0.015);

  const trafficPhase = elapsed % 16;
  const active = trafficPhase < 7 ? 2 : trafficPhase < 9 ? 1 : 0;
  trafficLights.forEach((material, i) => { material.emissiveIntensity = i === active ? 2.1 : 0.1; });

  controls.update();
  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);
});
