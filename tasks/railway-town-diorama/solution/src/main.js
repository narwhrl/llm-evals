import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { Railway } from './train.js';
import { box, cylinder, sphere, beam, mesh, material, label, roundedRectShape, createHouse, createStation, createTree, createLamp, createPerson, createCar, setNight } from './models.js';
import './style.css';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#ede9df');

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
container.appendChild(renderer.domElement);
renderer.domElement.setAttribute('aria-label', 'Alderbrook 铁路小镇，拖动旋转，滚轮缩放');
renderer.domElement.tabIndex = 0;

const camera = new THREE.OrthographicCamera(-18, 18, 11, -11, 0.1, 150);
const initialCamera = new THREE.Vector3(23, 26, 31);
const initialTarget = new THREE.Vector3(0, 0.4, 0);
camera.position.copy(initialCamera);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(initialTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.enablePan = false;
controls.minZoom = 0.68;
controls.maxZoom = 2.35;
controls.minPolarAngle = 0.35;
controls.maxPolarAngle = 1.22;
controls.rotateSpeed = 0.65;
controls.zoomSpeed = 0.8;
controls.update();

const hemisphere = new THREE.HemisphereLight('#fff1d5', '#7a8061', 1.75);
scene.add(hemisphere);
const sun = new THREE.DirectionalLight('#ffd5a0', 3.1);
sun.position.set(-11, 22, 14);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -20;
sun.shadow.camera.right = 20;
sun.shadow.camera.top = 18;
sun.shadow.camera.bottom = -18;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 60;
sun.shadow.normalBias = 0.025;
sun.shadow.bias = -0.00025;
sun.shadow.radius = 3;
scene.add(sun);
const fill = new THREE.DirectionalLight('#dce5d4', 0.45);
fill.position.set(15, 10, -15);
scene.add(fill);

const floor = mesh(new THREE.PlaneGeometry(200, 200), material('#e8e4d9', { roughness: 1 }), scene, 0, -0.71, 0);
floor.rotation.x = -Math.PI / 2;
floor.castShadow = false;

function noiseTexture(base, type) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const context = canvas.getContext('2d');
  context.fillStyle = base;
  context.fillRect(0, 0, 512, 512);
  let seed = 417;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  if (type === 'wood') {
    for (let index = 0; index < 320; index++) {
      const y = random() * 512;
      context.strokeStyle = `rgba(${random() > 0.5 ? '60,35,17' : '236,190,117'},${0.03 + random() * 0.12})`;
      context.lineWidth = 0.4 + random() * 2;
      context.beginPath();
      context.moveTo(0, y);
      for (let x = 0; x <= 512; x += 16) context.lineTo(x, y + Math.sin(x * 0.022 + index) * (1 + random() * 3));
      context.stroke();
    }
  } else {
    for (let index = 0; index < 22000; index++) {
      const light = random() > 0.48;
      context.fillStyle = light ? `rgba(231,224,161,${random() * 0.10})` : `rgba(38,69,36,${random() * 0.09})`;
      const size = 0.4 + random() * 1.7;
      context.fillRect(random() * 512, random() * 512, size, size);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(type === 'wood' ? 1 : 4, type === 'wood' ? 1 : 3);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

const world = new THREE.Group();
scene.add(world);
const wood = new THREE.MeshStandardMaterial({ map: noiseTexture('#8d5e38', 'wood'), roughness: 0.68 });
const base = mesh(new RoundedBoxGeometry(27, 1.12, 16, 4, 0.18), wood, world, 0, -0.06, 0);
const inset = mesh(new RoundedBoxGeometry(26.65, 0.16, 15.65, 3, 0.13), material('#b48a55', { roughness: 0.68 }), world, 0, 0.49, 0);
const grassMaterial = new THREE.MeshStandardMaterial({ map: noiseTexture('#7f9258', 'grass'), roughness: 1 });
const groundShape = roundedRectShape(-12.85, -7.25, 25.7, 14.5, 0.35);
const ground = mesh(new THREE.ShapeGeometry(groundShape, 24), grassMaterial, world, 0, 0.60, 0);
ground.rotation.x = -Math.PI / 2;
ground.castShadow = false;
for (const z of [-7.55, 7.55]) box(world, 26.8, 0.20, 0.30, '#715035', 0, 0.62, z);
for (const x of [-13.22, 13.22]) box(world, 0.30, 0.20, 14.85, '#715035', x, 0.62, 0);
for (const z of [-7.36, 7.36]) box(world, 26.3, 0.055, 0.065, '#c69a5c', 0, 0.73, z);
for (const x of [-13.04, 13.04]) box(world, 0.065, 0.055, 14.65, '#c69a5c', x, 0.73, 0);
const plaque = box(world, 5.8, 0.52, 0.06, '#3e5346', 0, -0.02, 8.015, { metalness: 0.25, roughness: 0.45 });
label(world, 'ALDERBROOK  ·  VALLEY RAILWAY', 5.45, 0.32, 0, -0.01, 8.052, { background: '#3e5346', color: '#dec795', border: false });
for (const x of [-2.7, 2.7]) sphere(world, 0.045, '#c7a469', x, -0.02, 8.065, 10, 6);

const riverCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-13.1, 0.65, -5.8),
  new THREE.Vector3(-11.6, 0.65, -3.0),
  new THREE.Vector3(-10.55, 0.65, -0.2),
  new THREE.Vector3(-8.7, 0.65, 0.7),
  new THREE.Vector3(-5.5, 0.65, 0.0),
  new THREE.Vector3(-2.1, 0.65, -1.15),
  new THREE.Vector3(1.1, 0.65, -1.55),
  new THREE.Vector3(4.5, 0.65, -0.75),
  new THREE.Vector3(7.5, 0.65, -0.85),
  new THREE.Vector3(10.55, 0.65, -1.55),
  new THREE.Vector3(12.0, 0.65, -3.6),
  new THREE.Vector3(13.1, 0.65, -4.7),
]);

function ribbon(curve, width, y, mat, segments = 160) {
  const vertices = [];
  const indices = [];
  for (let index = 0; index <= segments; index++) {
    const u = index / segments;
    const point = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u);
    const variation = 1 + 0.10 * Math.sin(u * 24) + 0.06 * Math.cos(u * 41);
    for (const side of [-1, 1]) vertices.push(point.x - tangent.z * width * 0.5 * variation * side, y, point.z + tangent.x * width * 0.5 * variation * side);
    if (index < segments) {
      const offset = index * 2;
      indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const object = mesh(geometry, mat, world);
  object.castShadow = false;
  return object;
}
ribbon(riverCurve, 1.75, 0.614, material('#b6ae83', { side: THREE.DoubleSide }));
ribbon(riverCurve, 1.52, 0.625, material('#718f79', { side: THREE.DoubleSide }));
const waterMaterial = new THREE.MeshPhysicalMaterial({ color: '#639b94', roughness: 0.26, metalness: 0.18, clearcoat: 0.65, clearcoatRoughness: 0.22, side: THREE.DoubleSide });
ribbon(riverCurve, 1.32, 0.635, waterMaterial);
const ripplePositions = [];
for (let index = 0; index < 85; index++) {
  const u = (index + 0.5) / 86;
  const point = riverCurve.getPointAt(u);
  const tangent = riverCurve.getTangentAt(u);
  const offset = Math.sin(index * 4.13) * 0.40;
  const x = point.x - tangent.z * offset;
  const z = point.z + tangent.x * offset;
  const length = 0.12 + (index % 4) * 0.065;
  ripplePositions.push(x - tangent.x * length, 0.645, z - tangent.z * length, x + tangent.x * length, 0.645, z + tangent.z * length);
}
const rippleGeometry = new THREE.BufferGeometry();
rippleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ripplePositions, 3));
const ripples = new THREE.LineSegments(rippleGeometry, new THREE.LineBasicMaterial({ color: '#d0dfc1', transparent: true, opacity: 0.48 }));
world.add(ripples);

function road(points, width = 0.78) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)));
  ribbon(curve, width + 0.16, 0.622, material('#c4b99a', { side: THREE.DoubleSide }), 70);
  ribbon(curve, width, 0.63, material('#aaa88e', { side: THREE.DoubleSide }), 70);
  return curve;
}
road([[-7.0, 2.3], [-4.5, 2.0], [-1.65, 2.55], [1.1, 2.35], [4.2, 2.45], [7.1, 1.8]], 0.85);
road([[-1.65, 2.55], [-1.75, 0.65], [-1.55, -1.30], [-0.9, -3.35], [1.6, -3.6], [4.6, -3.2], [7.2, -3.0]], 0.82);
road([[-7.2, -3.4], [-5.1, -3.0], [-2.6, -3.35], [-0.9, -3.35]], 0.72);
road([[1.6, -3.6], [3.2, -4.8], [5.7, -4.25], [7.2, -3.0]], 0.65);
road([[-4.5, 2.0], [-5.4, 3.0], [-6.5, 3.15]], 0.65);

const railway = new Railway(world);

function railwayBridge(target) {
  let closestU = 0;
  let closestDistance = Infinity;
  for (let index = 0; index < 800; index++) {
    const point = railway.curve.getPointAt(index / 800);
    const distance = point.distanceTo(new THREE.Vector3(target[0], 0.86, target[1]));
    if (distance < closestDistance) { closestDistance = distance; closestU = index / 800; }
  }
  const point = railway.curve.getPointAt(closestU);
  const tangent = railway.curve.getTangentAt(closestU);
  const group = new THREE.Group();
  group.position.set(point.x, 0, point.z);
  group.rotation.y = Math.atan2(tangent.x, tangent.z);
  world.add(group);
  box(group, 1.20, 0.14, 3.4, '#5b6657', 0, 0.73, 0);
  for (const side of [-1, 1]) {
    box(group, 0.09, 0.10, 3.45, '#3c5b4e', side * 0.59, 0.85, 0);
    box(group, 0.07, 0.07, 3.45, '#4b6d58', side * 0.59, 1.29, 0);
    for (let segment = -2; segment <= 2; segment++) {
      const z = segment * 0.68;
      beam(group, [side * 0.59, 0.85, z], [side * 0.59, 1.29, z], 0.055, '#496853');
      if (segment < 2) beam(group, [side * 0.59, segment % 2 ? 1.28 : 0.86, z], [side * 0.59, segment % 2 ? 0.86 : 1.28, z + 0.68], 0.045, '#496853');
    }
  }
  for (const z of [-1.05, 1.05]) {
    box(group, 0.90, 0.26, 0.34, '#8c8b73', 0, 0.56, z);
    box(group, 1.05, 0.08, 0.44, '#b2ac8e', 0, 0.71, z);
  }
}
railwayBridge([-10.55, -0.2]);
railwayBridge([10.55, -1.55]);

const roadBridge = new THREE.Group();
roadBridge.position.set(-1.58, 0, -1.18);
roadBridge.rotation.y = -0.12;
world.add(roadBridge);
box(roadBridge, 1.02, 0.14, 2.55, '#aaa78c', 0, 0.66, 0);
for (const side of [-1, 1]) {
  box(roadBridge, 0.14, 0.26, 2.65, '#bdb498', side * 0.51, 0.75, 0);
  for (const z of [-1.05, 0, 1.05]) box(roadBridge, 0.21, 0.34, 0.21, '#c9bea0', side * 0.51, 0.87, z);
}

createStation(world);
createHouse(world, { x: -6.0, z: 1.10, width: 1.85, depth: 1.55, height: 1.65, wall: '#d5b47e', roofColor: '#875749', shop: true, name: 'BAKERY' });
createHouse(world, { x: 0.45, z: 1.22, width: 1.85, depth: 1.45, height: 1.75, wall: '#c6c6a2', roofColor: '#667465', shop: true, name: 'POST OFFICE' });
createHouse(world, { x: 3.55, z: 1.28, width: 2.15, depth: 1.55, height: 2.05, wall: '#c88768', roofColor: '#65554a', shop: true, name: 'GENERAL STORE' });
createHouse(world, { x: 6.50, z: 0.85, width: 1.60, depth: 1.55, height: 1.65, wall: '#ddcba2', roofColor: '#805a46', rotation: -0.16 });
createHouse(world, { x: -5.6, z: -4.15, width: 2.1, depth: 1.75, height: 2.05, wall: '#b5b68d', roofColor: '#665c4c' });
createHouse(world, { x: -2.95, z: -4.60, width: 1.65, depth: 1.45, height: 1.55, wall: '#d8bd92', roofColor: '#8d5d47' });
createHouse(world, { x: 4.6, z: -4.35, width: 1.85, depth: 1.55, height: 1.70, wall: '#d4c6a1', roofColor: '#627064' });
createHouse(world, { x: 7.05, z: -3.75, width: 1.55, depth: 1.45, height: 1.60, wall: '#bb876b', roofColor: '#67544a', rotation: -0.15 });

const church = new THREE.Group();
church.position.set(1.1, 0.67, -4.55);
world.add(church);
box(church, 1.65, 1.75, 2.10, '#d7cfb2', 0, 0.93, 0);
const churchRoof = new THREE.Shape();
churchRoof.moveTo(-0.95, 0); churchRoof.lineTo(0, 0.78); churchRoof.lineTo(0.95, 0); churchRoof.closePath();
const churchRoofGeometry = new THREE.ExtrudeGeometry(churchRoof, { depth: 2.45, bevelEnabled: false });
churchRoofGeometry.translate(0, 1.82, -1.22);
mesh(churchRoofGeometry, material('#647061'), church);
box(church, 0.82, 2.45, 0.82, '#c5bea2', 0, 1.28, 1.22);
box(church, 0.94, 0.12, 0.94, '#e2d7b8', 0, 2.50, 1.22);
for (const side of [-1, 1]) box(church, 0.27, 0.44, 0.025, '#52665b', side * 0.21, 2.20, 1.641);
const steeple = mesh(new THREE.ConeGeometry(0.70, 1.40, 4), material('#51685b'), church, 0, 3.24, 1.22);
steeple.rotation.y = Math.PI / 4;
beam(church, [0, 3.9, 1.22], [0, 4.38, 1.22], 0.035, '#b7a87b');
beam(church, [-0.13, 4.20, 1.22], [0.13, 4.20, 1.22], 0.035, '#b7a87b');
box(church, 0.43, 0.84, 0.035, '#4f6254', 0, 0.52, 1.645);
for (const side of [-1, 1]) {
  box(church, 0.025, 0.86, 0.40, '#617a6c', side * 0.837, 1.03, -0.3);
  box(church, 0.04, 0.87, 0.035, '#e3d6b5', side * 0.855, 1.03, -0.3);
}

const square = cylinder(world, 1.05, 1.05, 0.04, '#c2b89a', 2.8, 0.65, -2.85, 32);
cylinder(world, 0.46, 0.52, 0.20, '#aaa488', 2.8, 0.77, -2.85, 20);
cylinder(world, 0.38, 0.38, 0.05, '#76a39a', 2.8, 0.89, -2.85, 24);
cylinder(world, 0.12, 0.18, 0.48, '#b9b196', 2.8, 1.09, -2.85, 12);
sphere(world, 0.15, '#c5bda2', 2.8, 1.38, -2.85, 12, 8);

const treeData = [
  [-8.2,-3.5,1.05,1],[-7.6,-4.8,0.95,1],[-7.1,-2.8,0.8,0],[-4.1,-5.0,0.8,1],[-1.6,-5.1,0.75,1],
  [3.1,-5.0,0.9,1],[5.9,-5.0,0.95,1],[7.9,-4.7,0.85,1],[8.3,-3.0,0.9,0],[8.2,0.0,0.85,0],
  [-8.2,2.2,0.95,0],[-7.7,3.8,0.85,0],[-7.9,0.2,0.7,1],[-4.1,0.8,0.72,0],[-0.1,0.0,0.70,0],
  [2.0,0.6,0.72,0],[5.2,0.1,0.78,0],[7.7,2.0,0.9,0],[-7.2,6.35,0.8,0],[-4.9,6.65,0.72,0],
  [1.0,6.75,0.82,0],[4.2,6.55,0.9,0],[7.6,5.9,0.95,1],[10.9,5.2,1.05,1],[11.7,3.0,0.9,0],
  [11.8,-5.6,0.95,1],[10.0,-5.8,0.82,1],[-11.7,-5.9,0.95,1],[-11.7,2.5,0.9,0],[-11.7,5.2,0.8,0],
];
treeData.forEach(([x, z, scale, pine], index) => createTree(world, x, z, scale, Boolean(pine), index));
for (const [x, z, rotation] of [[-5.2,2.65,0],[-1.0,2.45,0],[2.0,2.1,0],[5.25,2.2,0],[-1.0,-3.65,Math.PI],[4.0,-3.0,Math.PI],[6.4,-2.9,Math.PI],[-5.6,-2.85,0]]) createLamp(world, x, z, rotation);
for (const [x, z, color, rotation] of [[-4.5,4.0,'#b27b4e',0.2],[-2.0,4.15,'#56747a',-0.5],[-0.9,4.15,'#bda46d',0.3],[-4.6,2.6,'#985c46',1.2],[2.2,-2.9,'#546b60',0.8],[3.3,-3.0,'#a26d53',2.1]]) createPerson(world, x, z, color, rotation);
createCar(world, -4.1, 1.97, '#8b9c8d', Math.PI / 2);
createCar(world, 5.6, 2.23, '#a7624b', Math.PI / 2 + 0.1);
createCar(world, 0.0, -3.55, '#cfbb83', Math.PI / 2);

for (const [x, z] of [[-7.6,-1.2],[-7.9,-1.45],[-8.2,-1.2],[-9.0,1.6],[-9.25,1.8],[3.4,-1.9],[3.7,-2.0],[8.9,-0.1],[9.2,-0.2]]) {
  const rock = mesh(new THREE.IcosahedronGeometry(0.16 + Math.abs(x % 0.12), 0), material('#a9a58a', { flatShading: true }), world, x, 0.69, z);
  rock.scale.set(1.4, 0.6, 1);
}
for (const [x, z] of [[-7.2,1.9],[4.8,1.8],[-4.8,-2.7],[6.4,-2.5]]) {
  box(world, 0.6, 0.18, 0.28, '#9c8056', x, 0.74, z);
  for (let index = 0; index < 5; index++) sphere(world, 0.095, index % 2 ? '#c99a61' : '#a76750', x - 0.24 + index * 0.12, 0.91, z, 8, 6);
}

function batchStaticModels() {
  world.updateMatrixWorld(true);
  const batches = new Map();
  const originals = [];
  world.traverse(object => {
    if (!object.isMesh || object.isInstancedMesh || Array.isArray(object.material)) return;
    let ancestor = object.parent;
    while (ancestor && ancestor !== world) {
      if (railway.units.includes(ancestor)) return;
      ancestor = ancestor.parent;
    }
    const geometry = object.geometry.clone().applyMatrix4(object.matrixWorld);
    if (!batches.has(object.material)) batches.set(object.material, []);
    batches.get(object.material).push(geometry);
    originals.push(object);
  });
  for (const original of originals) original.removeFromParent();
  for (const [mat, geometries] of batches) {
    const combined = mergeGeometries(geometries, false);
    const object = mesh(combined, mat, world);
    object.castShadow = true;
    for (const geometry of geometries) geometry.dispose();
  }
}
batchStaticModels();

let isNight = false;
let nightBlend = 0;
const eveningBackground = new THREE.Color('#ede9df');
const nightBackground = new THREE.Color('#293f42');
const eveningSun = new THREE.Color('#ffd5a0');
const nightSun = new THREE.Color('#a8c8e2');
const eveningFloor = new THREE.Color('#e8e4d9');
const nightFloor = new THREE.Color('#30474a');
const speedInput = document.querySelector('#speed');
const speedValue = document.querySelector('#speed-value');
const playButton = document.querySelector('#play-toggle');
const pauseIcon = document.querySelector('#pause-icon');
const playIcon = document.querySelector('#play-icon');
const status = document.querySelector('#train-status');

function updatePlayUI() {
  pauseIcon.hidden = !railway.running;
  playIcon.hidden = railway.running;
  pauseIcon.toggleAttribute('hidden', !railway.running);
  playIcon.toggleAttribute('hidden', railway.running);
  playButton.setAttribute('aria-label', railway.running ? '暂停列车' : '运行列车');
}
function togglePlay() {
  railway.running = !railway.running;
  updatePlayUI();
}
playButton.addEventListener('click', togglePlay);
speedInput.addEventListener('input', () => {
  railway.speed = Number(speedInput.value);
  speedValue.value = `${railway.speed}×`;
});
document.querySelector('#light-toggle').addEventListener('click', () => {
  isNight = !isNight;
  setNight(isNight);
  document.body.classList.toggle('night', isNight);
  document.querySelector('#light-label').textContent = isNight ? 'Night' : 'Evening';
  document.querySelector('#light-toggle').setAttribute('aria-label', isNight ? '切换到傍晚' : '切换到夜景');
});
function reset() {
  railway.reset();
  speedInput.value = '1';
  speedValue.value = '1×';
  camera.position.copy(initialCamera);
  camera.zoom = 1;
  camera.updateProjectionMatrix();
  controls.target.copy(initialTarget);
  controls.update();
  updatePlayUI();
}
document.querySelector('#reset').addEventListener('click', reset);
window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement) return;
  if (event.code === 'Space') { event.preventDefault(); togglePlay(); }
  if (event.key.toLowerCase() === 'r') reset();
});

function resize() {
  const aspect = window.innerWidth / window.innerHeight;
  const height = aspect < 1.3 ? 29 / aspect : 22.4;
  camera.left = -height * aspect / 2;
  camera.right = height * aspect / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resize);
resize();

let previousTime = performance.now();
let firstFrame = true;
function animate(time) {
  const delta = Math.max(0, (time - previousTime) / 1000);
  previousTime = time;
  railway.update(delta);
  controls.update();
  nightBlend = THREE.MathUtils.damp(nightBlend, isNight ? 1 : 0, 4, delta);
  scene.background.copy(eveningBackground).lerp(nightBackground, nightBlend);
  floor.material.color.copy(eveningFloor).lerp(nightFloor, nightBlend);
  sun.color.copy(eveningSun).lerp(nightSun, nightBlend);
  sun.intensity = THREE.MathUtils.lerp(3.1, 0.75, nightBlend);
  hemisphere.intensity = THREE.MathUtils.lerp(1.75, 0.95, nightBlend);
  fill.intensity = THREE.MathUtils.lerp(0.45, 0.35, nightBlend);
  renderer.render(scene, camera);
  const dwelling = railway.dwell > 0;
  status.classList.toggle('dwell', dwelling);
  status.innerHTML = `<i></i> ${!railway.running ? 'Paused' : dwelling ? 'At the station' : 'En route'}`;
  if (firstFrame) {
    document.querySelector('#loading').classList.add('loaded');
    firstFrame = false;
  }
}
renderer.setAnimationLoop(animate);
setNight(false);
