import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

const sceneRoot = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#071525');
scene.fog = new THREE.Fog('#071525', 27, 54);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
sceneRoot.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 180);
camera.position.set(21.5, 20, 29);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.2, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.minDistance = 17;
controls.maxDistance = 58;
controls.minPolarAngle = 0.48;
controls.maxPolarAngle = 1.43;
controls.enablePan = true;
controls.panSpeed = 0.4;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.7;

const palette = {
  ink: 0x07121f,
  base: 0x101d2b,
  baseEdge: 0x1b3143,
  asphalt: 0x152633,
  asphaltBlue: 0x1c3443,
  sidewalk: 0x34505b,
  curb: 0x83a7a6,
  warmFloor: 0xdec49e,
  warmWall: 0x7c695a,
  storeWall: 0x21394a,
  roof: 0x17273c,
  teal: 0x66d6cf,
  aqua: 0xa5f4df,
  pink: 0xff708b,
  amber: 0xffd16c,
  cream: 0xfff0c6,
  cool: 0x8bc8ff,
  rain: 0x9ad9f7,
};

const rainMaterial = new THREE.LineBasicMaterial({ color: palette.rain, transparent: true, opacity: 0.32, depthWrite: false });
const coolGlowMaterial = new THREE.MeshStandardMaterial({ color: 0x5bc5d2, emissive: 0x1c7f95, emissiveIntensity: 0.8, roughness: 0.35, metalness: 0.15 });
const warmGlowMaterial = new THREE.MeshStandardMaterial({ color: 0xffd58a, emissive: 0xffa52f, emissiveIntensity: 1.1, roughness: 0.38 });
const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0x7fc9da, transparent: true, opacity: 0.18, roughness: 0.08, metalness: 0.12, transmission: 0.08, depthWrite: false, side: THREE.DoubleSide });

const animated = {
  rain: null,
  rainSpeeds: [],
  drips: [],
  glassStreaks: [],
  ripples: [],
  signMaterials: [],
  trafficBulbs: [],
  doors: null,
};

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.62,
    metalness: options.metalness ?? 0.08,
    flatShading: options.flatShading ?? true,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    side: options.side,
    depthWrite: options.depthWrite,
  });
}

function box(w, h, d, x, y, z, mat, parent = scene, rotation = null) {
  const object = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  object.position.set(x, y, z);
  if (rotation) object.rotation.set(rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function cylinder(radiusTop, radiusBottom, height, x, y, z, mat, parent = scene, radialSegments = 12) {
  const object = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments), mat);
  object.position.set(x, y, z);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function sphere(radius, x, y, z, mat, parent = scene, segments = 12) {
  const object = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments / 2), mat);
  object.position.set(x, y, z);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function outline(object, color = palette.ink, opacity = 0.82) {
  if (!object || !object.geometry) return object;
  const edges = new THREE.EdgesGeometry(object.geometry, 28);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  line.scale.setScalar(1.002);
  object.add(line);
  return object;
}

function cylinderBetween(a, b, radius, mat, parent = scene, radialSegments = 8) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const direction = end.clone().sub(start);
  const object = cylinder(radius, radius, direction.length(), 0, 0, 0, mat, parent, radialSegments);
  object.position.copy(start).add(end).multiplyScalar(0.5);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return object;
}

function textTexture(label, background = '#ffca68', foreground = '#101a28', width = 640, height = 150, font = '700 76px Trebuchet MS') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  context.fillStyle = foreground;
  context.font = font;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(label, width / 2, height / 2 + 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function addSign(label, width, height, x, y, z, background, foreground, parent = scene, rotationY = 0) {
  const signMat = new THREE.MeshStandardMaterial({
    map: textTexture(label, background, foreground),
    emissive: new THREE.Color(background),
    emissiveIntensity: 0.8,
    roughness: 0.42,
    metalness: 0.05,
  });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(width, height), signMat);
  sign.position.set(x, y, z);
  sign.rotation.y = rotationY;
  sign.castShadow = true;
  parent.add(sign);
  animated.signMaterials.push(signMat);
  return sign;
}

function addStreetLight(x, z, height = 5.8) {
  const poleMat = material(0x142434, { metalness: 0.6, roughness: 0.34 });
  cylinder(0.13, 0.2, height, x, 0.55 + height / 2, z, poleMat);
  const arm = box(1.15, 0.13, 0.13, x + 0.48, 0.55 + height - 0.22, z, poleMat, scene, { z: -0.04 });
  const lamp = sphere(0.23, x + 0.98, 0.55 + height - 0.32, z, warmGlowMaterial, scene, 14);
  outline(arm, palette.ink, 0.65);
  const light = new THREE.PointLight(0xffc777, 1.35, 8, 2);
  light.position.set(lamp.position.x, lamp.position.y - 0.08, lamp.position.z);
  scene.add(light);
  return light;
}

function addPuddle(x, z, w, d, color = 0x4b8190) {
  const puddleMat = material(color, { roughness: 0.18, metalness: 0.48, transparent: true, opacity: 0.62, emissive: 0x0a2330, emissiveIntensity: 0.45, flatShading: false });
  const puddle = new THREE.Mesh(new THREE.CircleGeometry(1, 28), puddleMat);
  puddle.rotation.x = -Math.PI / 2;
  puddle.scale.set(w, d, 1);
  puddle.position.set(x, 0.615, z);
  puddle.receiveShadow = true;
  scene.add(puddle);
  for (let i = 0; i < 2; i += 1) {
    const ringMat = material(0xa4edf1, { roughness: 0.18, transparent: true, opacity: 0.32, emissive: 0x347f91, emissiveIntensity: 0.42, flatShading: false });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.13 + i * 0.09, 0.16 + i * 0.09, 32), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.scale.set(w * 0.72, d * 0.72, 1);
    ring.position.set(x, 0.63 + i * 0.004, z);
    scene.add(ring);
    animated.ripples.push({ mesh: ring, phase: i * 1.4 + x * 0.11 + z * 0.08, speed: 0.7 + i * 0.22 });
  }
  return puddle;
}

function createRain() {
  const count = 700;
  const positions = new Float32Array(count * 6);
  const speeds = new Float32Array(count);
  const tops = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const x = THREE.MathUtils.randFloatSpread(31);
    const z = THREE.MathUtils.randFloatSpread(31);
    const top = THREE.MathUtils.randFloat(9, 17);
    const y = THREE.MathUtils.randFloat(0.85, top);
    const length = THREE.MathUtils.randFloat(0.28, 0.72);
    const offset = i * 6;
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
    positions[offset + 3] = x;
    positions[offset + 4] = y - length;
    positions[offset + 5] = z;
    speeds[i] = THREE.MathUtils.randFloat(10, 18);
    tops[i] = top;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const rain = new THREE.LineSegments(geometry, rainMaterial);
  rain.frustumCulled = false;
  scene.add(rain);
  animated.rain = rain;
  animated.rainSpeeds = speeds;
  animated.rainTops = tops;
}

function addDrain(x, z, length, alongX = true) {
  const drainMat = material(0x0a1721, { roughness: 0.88, metalness: 0.3 });
  box(alongX ? length : 0.32, 0.08, alongX ? 0.32 : length, x, 0.65, z, drainMat);
  const grateMat = material(0x506d73, { roughness: 0.55, metalness: 0.62 });
  const count = Math.floor(length / 0.6);
  for (let i = 0; i < count; i += 1) {
    const offset = -length / 2 + 0.3 + i * 0.6;
    box(alongX ? 0.07 : 0.29, 0.1, alongX ? 0.29 : 0.07, x + (alongX ? offset : 0), 0.69, z + (alongX ? 0 : offset), grateMat);
  }
}

function makeShelf(parent, x, z, width = 2.55) {
  const shelfMat = material(0x5c5e68, { roughness: 0.48, metalness: 0.28 });
  const trimMat = material(0xf4bf72, { roughness: 0.38, emissive: 0x9c5718, emissiveIntensity: 0.35 });
  for (const y of [1.45, 2.25, 3.05]) {
    box(width, 0.12, 0.68, x, y, z, shelfMat, parent);
    box(width - 0.08, 0.035, 0.035, x, y + 0.09, z + 0.36, trimMat, parent);
  }
  box(0.09, 3.2, 0.72, x - width / 2 + 0.08, 2.05, z, shelfMat, parent);
  box(0.09, 3.2, 0.72, x + width / 2 - 0.08, 2.05, z, shelfMat, parent);
  const productColors = [0xf59b72, 0x8fd7c4, 0xf4d27b, 0xaeb7ed, 0xef7381, 0x75b1e5];
  for (let row = 0; row < 3; row += 1) {
    for (let i = 0; i < 6; i += 1) {
      const px = x - width / 2 + 0.25 + i * 0.4;
      const py = 1.65 + row * 0.8;
      const pm = material(productColors[(i + row) % productColors.length], { roughness: 0.45, emissive: productColors[(i + row) % productColors.length], emissiveIntensity: 0.08 });
      const product = box(0.24, row === 1 ? 0.4 : 0.28, 0.15, px, py, z + 0.41, pm, parent);
      product.castShadow = false;
    }
  }
}

function makeStore() {
  const store = new THREE.Group();
  store.position.set(2.6, 0, -3.7);
  scene.add(store);

  const wallMat = material(palette.storeWall, { roughness: 0.7, metalness: 0.16 });
  const wallDarkMat = material(0x162b3c, { roughness: 0.72, metalness: 0.12 });
  const roofMat = material(palette.roof, { roughness: 0.48, metalness: 0.2 });
  const warmFloorMat = material(palette.warmFloor, { roughness: 0.55, metalness: 0.04 });

  box(13.8, 0.16, 7.6, 0, 0.68, 0, warmFloorMat, store);
  box(0.36, 6.45, 8, -7, 3.85, 0, wallMat, store);
  box(0.36, 6.45, 8, 7, 3.85, 0, wallMat, store);
  box(14, 6.45, 0.36, 0, 3.85, -3.82, wallDarkMat, store);
  outline(store.children[1], palette.ink, 0.78);
  outline(store.children[2], palette.ink, 0.78);
  outline(store.children[3], palette.ink, 0.78);
  box(14.8, 0.48, 8.55, 0, 7.25, -0.05, roofMat, store);
  outline(store.children[4], palette.ink, 0.8);

  const glass = glassMaterial.clone();
  glass.opacity = 0.12;
  box(5.55, 5.25, 0.08, -4.1, 3.7, 4.02, glass, store);
  box(4.35, 5.25, 0.08, 4.95, 3.7, 4.02, glass, store);
  const frameMat = material(0x213f55, { roughness: 0.35, metalness: 0.38 });
  for (const x of [-7, -1.45, 0.35, 2.25, 7]) box(0.14, 5.75, 0.18, x, 3.78, 4.08, frameMat, store);
  box(14, 0.14, 0.18, 0, 6.5, 4.08, frameMat, store);
  box(14, 0.14, 0.18, 0, 1.05, 4.08, frameMat, store);

  const fascia = box(14.5, 1.04, 0.46, 0, 6.76, 4.08, material(0xffc665, { roughness: 0.35, emissive: 0xa75a1b, emissiveIntensity: 0.5 }), store);
  outline(fascia, palette.ink, 0.72);
  const fasciaSign = addSign('MIZU MART', 9.4, 0.72, 0, 6.76, 4.34, '#fff0b0', '#17324a', store);
  fasciaSign.material.emissiveIntensity = 1.15;
  const signStripMat = material(0x53cbd0, { roughness: 0.32, emissive: 0x2b8d9f, emissiveIntensity: 0.85 });
  box(14.35, 0.18, 0.45, 0, 6.14, 4.07, signStripMat, store);
  box(14.35, 0.12, 0.42, 0, 5.89, 4.07, material(0xff708b, { roughness: 0.36, emissive: 0xc54669, emissiveIntensity: 0.7 }), store);

  const doorFrameMat = material(0x26394b, { roughness: 0.3, metalness: 0.45 });
  box(3.85, 5.75, 0.18, 0.45, 3.78, 4.11, doorFrameMat, store);
  const doorGlassMat = glassMaterial.clone();
  doorGlassMat.opacity = 0.28;
  const doorLeft = box(1.55, 4.65, 0.06, -0.45, 3.38, 4.17, doorGlassMat, store);
  const doorRight = box(1.55, 4.65, 0.06, 1.35, 3.38, 4.17, doorGlassMat, store);
  animated.doors = { left: doorLeft, right: doorRight };
  box(0.04, 4.3, 0.08, -0.45, 3.38, 4.22, material(0xb9e8e6, { roughness: 0.22, metalness: 0.55 }), store);
  box(0.04, 4.3, 0.08, 1.35, 3.38, 4.22, material(0xb9e8e6, { roughness: 0.22, metalness: 0.55 }), store);

  const ceilingMat = material(0x473f43, { roughness: 0.83 });
  box(13.3, 0.1, 7.3, 0, 6.95, 0, ceilingMat, store);
  const panelMat = material(0xffdfad, { roughness: 0.34, emissive: 0xffb45e, emissiveIntensity: 2.15 });
  for (const x of [-5.3, -1.8, 1.8, 5.1]) box(1.65, 0.07, 0.95, x, 6.87, 0.1, panelMat, store);

  makeShelf(store, -4.75, -0.95, 2.65);
  makeShelf(store, -1.8, -1.45, 2.55);
  makeShelf(store, 1.2, -1.25, 2.55);
  makeShelf(store, 4.3, -1.1, 2.35);

  const counterMat = material(0x6d4a3e, { roughness: 0.48, metalness: 0.18 });
  box(2.55, 1.05, 0.95, -1.2, 1.22, 2.65, counterMat, store);
  box(2.7, 0.12, 1.05, -1.2, 1.78, 2.65, warmGlowMaterial, store);
  box(0.44, 0.52, 0.34, -1.2, 2.08, 2.65, material(0x243445, { roughness: 0.25, metalness: 0.45 }), store);
  addSign('PAY', 0.72, 0.34, -1.2, 2.42, 2.67, '#65c9cd', '#102437', store);

  const coffeeMat = material(0x384d58, { roughness: 0.32, metalness: 0.38 });
  box(1.05, 1.25, 0.62, -3.9, 1.55, 2.4, coffeeMat, store);
  box(0.82, 0.13, 0.55, -3.9, 2.2, 2.4, material(0xffb56c, { roughness: 0.3, emissive: 0xf27d2c, emissiveIntensity: 0.75 }), store);
  for (let i = 0; i < 3; i += 1) cylinder(0.1, 0.12, 0.2, -4.2 + i * 0.3, 2.38, 2.35, material(0xffe3af, { roughness: 0.35 }), store, 10);

  const odenMat = material(0x6a4a3d, { roughness: 0.48 });
  box(2.15, 1.05, 0.9, -5.35, 1.2, 2.65, odenMat, store);
  box(2.05, 0.12, 0.78, -5.35, 1.78, 2.65, material(0xffc27a, { roughness: 0.3, emissive: 0xcc651f, emissiveIntensity: 0.8 }), store);
  for (let i = 0; i < 4; i += 1) sphere(0.13, -6.05 + i * 0.45, 1.94, 2.65, material([0xf6dc92, 0xf1a36a, 0xe4c276, 0xcda563][i], { roughness: 0.46 }), store, 10);
  addSign('ODEN', 1.15, 0.3, -5.35, 2.32, 2.67, '#ffcf80', '#4d2531', store);

  const coolerFrame = box(1.9, 4.0, 0.76, 5.55, 2.78, 0.95, material(0x3d6c7c, { roughness: 0.25, metalness: 0.42 }), store);
  outline(coolerFrame, palette.ink, 0.6);
  box(1.58, 3.45, 0.05, 5.55, 2.84, 1.35, glassMaterial.clone(), store);
  for (let row = 0; row < 3; row += 1) {
    box(1.4, 0.05, 0.06, 5.55, 1.62 + row * 1.15, 1.4, material(0x8dd2d1, { roughness: 0.26, emissive: 0x2b7b82, emissiveIntensity: 0.38 }), store);
    for (let i = 0; i < 6; i += 1) cylinder(0.07, 0.09, 0.34, 4.95 + i * 0.24, 1.86 + row * 1.15, 1.45, material([0xf2bd70, 0x8ad7d1, 0xef7684][i % 3], { roughness: 0.32, emissive: 0x30231a, emissiveIntensity: 0.18 }), store, 10);
  }
  addSign('DRINKS', 1.45, 0.3, 5.55, 4.98, 1.38, '#74ced2', '#102538', store);

  const magazineMat = material(0x4c5b65, { roughness: 0.5, metalness: 0.22 });
  box(1.45, 1.95, 0.55, 0.05, 1.65, -2.65, magazineMat, store);
  for (let i = 0; i < 4; i += 1) {
    box(0.24, 1.35, 0.06, -0.55 + i * 0.38, 1.76, -2.95, material([0xe47a77, 0x7dc1cf, 0xeec878, 0x9fa8db][i], { roughness: 0.48 }), store, { z: (i - 1.5) * 0.08 });
  }
  addSign('WEEKLY', 1.1, 0.28, 0.05, 2.73, -2.98, '#f5c86b', '#1d2639', store, Math.PI);

  const poster1 = material(0x9dd6ca, { roughness: 0.48, emissive: 0x194f50, emissiveIntensity: 0.25 });
  const poster2 = material(0xffa66e, { roughness: 0.48, emissive: 0x7a321d, emissiveIntensity: 0.2 });
  box(1.25, 1.65, 0.05, -2.8, 4.4, -3.63, poster1, store);
  box(1.25, 1.65, 0.05, -1.25, 4.4, -3.63, poster2, store);
  addSign('HOT', 0.75, 0.34, -2.8, 4.4, -3.66, '#4e9e9b', '#fce3a1', store, Math.PI);
  addSign('NEW', 0.75, 0.34, -1.25, 4.4, -3.66, '#da675f', '#fff0bb', store, Math.PI);
  box(1.8, 3.1, 0.18, 4.8, 3.05, -3.62, wallDarkMat, store);
  box(1.3, 2.5, 0.04, 4.8, 3.05, -3.74, material(0x263847, { roughness: 0.48 }), store);
  addSign('STOCK', 0.95, 0.26, 4.8, 4.6, -3.86, '#6f9fa2', '#d5f2d3', store, Math.PI);

  const floorStripeMat = material(0x6a9f9d, { roughness: 0.4, emissive: 0x284a4b, emissiveIntensity: 0.25 });
  for (const x of [-3.3, 2.3]) box(0.12, 0.02, 4.5, x, 0.78, 1.18, floorStripeMat, store);
  for (const z of [-2.7, -0.5, 1.7]) box(1.6, 0.02, 0.1, -0.05, 0.79, z, floorStripeMat, store);

  const dripMat = material(0x7ecfe0, { transparent: true, opacity: 0.55, roughness: 0.15, emissive: 0x1e6174, emissiveIntensity: 0.7, depthWrite: false });
  for (let i = 0; i < 13; i += 1) {
    const drop = box(0.035, THREE.MathUtils.randFloat(0.35, 0.9), 0.035, -6.65 + i * 1.08, 5.65, 4.34, dripMat, store);
    animated.drips.push({ mesh: drop, top: THREE.MathUtils.randFloat(5.25, 5.9), speed: THREE.MathUtils.randFloat(0.7, 1.5), phase: i * 0.29 });
  }
  for (let i = 0; i < 9; i += 1) {
    const streak = box(0.028, THREE.MathUtils.randFloat(0.55, 1.65), 0.018, -6.35 + i * 1.48, THREE.MathUtils.randFloat(2.1, 5.2), 4.14, dripMat, store);
    animated.glassStreaks.push({ mesh: streak, start: streak.position.y, speed: THREE.MathUtils.randFloat(0.18, 0.48), phase: i * 0.67 });
  }
  const storeLight = new THREE.PointLight(0xffc976, 18.0, 22, 2);
  storeLight.position.set(0, 5.0, 1.7);
  store.add(storeLight);
  const storeLight2 = new THREE.PointLight(0xffe2ae, 9.0, 16, 2);
  storeLight2.position.set(-4.5, 3.2, 2.5);
  store.add(storeLight2);
  const warmPanel = new THREE.RectAreaLight(0xffc978, 12, 11, 5.5);
  warmPanel.position.set(0, 6.3, 1.2);
  warmPanel.lookAt(0, 1.3, 1.2);
  store.add(warmPanel);
  return store;
}

function makeVendingMachine(x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  scene.add(group);
  const body = box(1.35, 3.4, 0.82, 0, 2.28, 0, material(0x315363, { roughness: 0.28, metalness: 0.46 }), group);
  outline(body, palette.ink, 0.8);
  box(1.05, 2.0, 0.04, 0, 2.44, 0.44, material(0x163447, { roughness: 0.2, metalness: 0.38, transparent: true, opacity: 0.9 }), group);
  box(0.78, 0.18, 0.04, 0, 3.42, 0.47, material(0x70d6d2, { roughness: 0.22, emissive: 0x2a8c98, emissiveIntensity: 0.8 }), group);
  addSign('DRINK', 0.72, 0.24, 0, 3.42, 0.5, '#66ced0', '#10253a', group);
  for (let i = 0; i < 4; i += 1) sphere(0.08, -0.36 + i * 0.24, 1.12, 0.47, material([0xf3be70, 0xef7884, 0x83cdd1, 0xd6df91][i], { roughness: 0.3, emissive: 0x5b3317, emissiveIntensity: 0.35 }), group, 10);
  box(0.72, 0.12, 0.08, 0, 0.85, 0.49, material(0xe6bd7a, { roughness: 0.3, emissive: 0x7c4c1c, emissiveIntensity: 0.3 }), group);
  return group;
}

function makeBicycle(x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0.62, z);
  const metal = material(0x6dd3c9, { roughness: 0.36, metalness: 0.55 });
  const tire = material(0x111b25, { roughness: 0.72, metalness: 0.15 });
  for (const wx of [-0.8, 0.8]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.065, 8, 24), tire);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(wx, 0.58, 0);
    wheel.castShadow = true;
    group.add(wheel);
    const hub = sphere(0.08, wx, 0.58, 0, metal, group, 8);
    hub.castShadow = false;
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2;
      cylinderBetween([wx, 0.58, 0], [wx + Math.cos(angle) * 0.5, 0.58 + Math.sin(angle) * 0.5, 0], 0.012, metal, group, 5);
    }
  }
  cylinderBetween([-0.8, 0.58, 0], [-0.1, 1.17, 0], 0.055, metal, group);
  cylinderBetween([-0.1, 1.17, 0], [0.8, 0.58, 0], 0.055, metal, group);
  cylinderBetween([-0.8, 0.58, 0], [0.8, 0.58, 0], 0.055, metal, group);
  cylinderBetween([-0.1, 1.17, 0], [0.16, 1.68, 0], 0.045, metal, group);
  cylinderBetween([0.16, 1.68, 0], [0.58, 1.7, 0], 0.04, metal, group);
  cylinderBetween([-0.1, 1.17, 0], [-0.53, 1.2, 0], 0.035, metal, group);
  box(0.4, 0.07, 0.18, -0.56, 1.23, 0, tire, group);
  return group;
}

function makeUmbrellaStand(x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0.62, z);
  const standMat = material(0x3c5862, { roughness: 0.4, metalness: 0.48 });
  cylinder(0.45, 0.52, 0.18, 0, 0.09, 0, standMat, group);
  cylinder(0.32, 0.38, 1.05, 0, 0.64, 0, standMat, group);
  const umbrellaColors = [0xe87b84, 0x73bcc4, 0xf1bf6f, 0x8797d2];
  for (let i = 0; i < 4; i += 1) {
    const angle = (i / 4) * Math.PI * 2;
    const ux = Math.cos(angle) * 0.15;
    const uz = Math.sin(angle) * 0.15;
    const handle = cylinder(0.025, 0.025, 1.9, ux, 1.25, uz, standMat, group, 6);
    handle.rotation.z = Math.cos(angle) * 0.08;
    handle.rotation.x = Math.sin(angle) * 0.08;
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.52, 0.25, 16), material(umbrellaColors[i], { roughness: 0.45, emissive: umbrellaColors[i], emissiveIntensity: 0.14 }), group);
    canopy.position.set(ux + Math.cos(angle) * 0.08, 2.12, uz + Math.sin(angle) * 0.08);
    canopy.rotation.y = angle;
  }
  return group;
}

function makeBin(x, z, color = 0x4f7e80) {
  const group = new THREE.Group();
  group.position.set(x, 0.62, z);
  const binMat = material(color, { roughness: 0.58, metalness: 0.28 });
  const body = box(0.75, 1.22, 0.75, 0, 0.61, 0, binMat, group);
  outline(body, palette.ink, 0.65);
  box(0.86, 0.13, 0.84, 0, 1.26, 0, material(0x273d49, { roughness: 0.45, metalness: 0.35 }), group);
  box(0.32, 0.04, 0.04, 0, 0.86, 0.39, material(0xd7dfc1, { roughness: 0.36, emissive: 0x5c6243, emissiveIntensity: 0.2 }), group);
  return group;
}

function makeGuardRail(x, z, length, alongX = true) {
  const railMat = material(0xa2c0bd, { roughness: 0.35, metalness: 0.52 });
  const count = Math.floor(length / 2.2);
  for (let i = 0; i <= count; i += 1) {
    const offset = -length / 2 + (length / count) * i;
    cylinder(0.08, 0.11, 1.2, x + (alongX ? offset : 0), 1.25, z + (alongX ? 0 : offset), railMat);
  }
  box(alongX ? length : 0.12, 0.13, alongX ? 0.12 : length, x, 1.75, z, railMat);
  box(alongX ? length : 0.1, 0.13, alongX ? 0.1 : length, x, 1.2, z, railMat);
}

function makeUtilityPole(x, z) {
  const poleMat = material(0x202d3a, { roughness: 0.6, metalness: 0.36 });
  cylinder(0.15, 0.22, 7.8, x, 4.45, z, poleMat);
  box(2.8, 0.12, 0.12, x, 7.95, z, poleMat);
  for (const offset of [-1.05, 0, 1.05]) sphere(0.12, x + offset, 8.13, z, material(0x6f8b91, { roughness: 0.36, metalness: 0.45 }), scene, 8);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x384c5c, transparent: true, opacity: 0.8 });
  const linePoints = [new THREE.Vector3(x - 1.05, 8.12, z), new THREE.Vector3(x - 7.8, 7.25, z + 0.8), new THREE.Vector3(x - 11.2, 7.05, z + 1.1)];
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePoints), lineMat);
  scene.add(line);
  const linePoints2 = [new THREE.Vector3(x + 1.05, 8.12, z), new THREE.Vector3(x + 7.3, 7.3, z - 0.6)];
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePoints2), lineMat));
}

function makeTrafficSignal(x, z) {
  const poleMat = material(0x1c2b38, { roughness: 0.55, metalness: 0.42 });
  cylinder(0.12, 0.18, 4.8, x, 2.98, z, poleMat);
  box(0.98, 2.15, 0.42, x, 5.65, z, material(0x1a2935, { roughness: 0.5, metalness: 0.25 }));
  const colors = [0xf0616b, 0xf2bf6a, 0x5ed48b];
  colors.forEach((color, index) => {
    const bulb = sphere(0.18, x, 6.28 - index * 0.66, z + 0.24, material(0x3a3e45, { roughness: 0.28, emissive: color, emissiveIntensity: index === 2 ? 1.2 : 0.25 }), scene, 12);
    animated.trafficBulbs.push({ mesh: bulb, color, index });
  });
}

function makeAcUnit(x, z) {
  const unit = box(1.5, 1.08, 0.75, x, 3.0, z, material(0x8a9d9d, { roughness: 0.46, metalness: 0.42 }));
  outline(unit, palette.ink, 0.6);
  for (let i = 0; i < 5; i += 1) box(0.1, 0.58, 0.05, x - 0.46 + i * 0.23, 3.0, z + 0.4, material(0x344c58, { roughness: 0.52, metalness: 0.42 }));
}

function makeScene() {
  const hemi = new THREE.HemisphereLight(0x6386a2, 0x0c1722, 1.2);
  scene.add(hemi);
  const moon = new THREE.DirectionalLight(0x9bc5ee, 1.8);
  moon.position.set(-10, 22, 14);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -24;
  moon.shadow.camera.right = 24;
  moon.shadow.camera.top = 24;
  moon.shadow.camera.bottom = -24;
  scene.add(moon);

  const base = box(30, 0.85, 30, 0, 0.2, 0, material(palette.base, { roughness: 0.7, metalness: 0.22 }));
  outline(base, palette.baseEdge, 0.95);
  box(28.2, 0.08, 28.2, 0, 0.66, 0, material(0x182d3b, { roughness: 0.66, metalness: 0.18 }));
  const edgeMat = material(0x2b5060, { roughness: 0.45, metalness: 0.34 });
  box(28.4, 0.16, 0.22, 0, 0.77, 14.05, edgeMat);
  box(28.4, 0.16, 0.22, 0, 0.77, -14.05, edgeMat);
  box(0.22, 0.16, 28.4, 14.05, 0.77, 0, edgeMat);
  box(0.22, 0.16, 28.4, -14.05, 0.77, 0, edgeMat);

  const asphalt = material(palette.asphalt, { roughness: 0.82, metalness: 0.2 });
  const asphaltSide = material(palette.asphaltBlue, { roughness: 0.78, metalness: 0.22 });
  box(27.5, 0.07, 10.8, 0, 0.73, 8.2, asphalt);
  box(6.3, 0.07, 15.5, -10.7, 0.73, 0.05, asphaltSide);
  box(5.2, 0.07, 7.5, -7.2, 0.735, -7.3, asphaltSide);

  const sidewalkMat = material(palette.sidewalk, { roughness: 0.78, metalness: 0.08 });
  box(27.5, 0.1, 3.0, 0, 0.79, 2.45, sidewalkMat);
  box(3.0, 0.1, 14.4, -7.45, 0.79, -0.05, sidewalkMat);
  box(6.0, 0.1, 3.2, -10.25, 0.79, -5.15, sidewalkMat);
  const curbMat = material(palette.curb, { roughness: 0.6, metalness: 0.2 });
  box(27.5, 0.18, 0.22, 0, 0.86, 3.87, curbMat);
  box(0.22, 0.18, 15.4, -7.52, 0.86, 0.05, curbMat);

  for (let i = 0; i < 7; i += 1) {
    box(0.58, 0.025, 2.45, -5.35 + i * 0.95, 0.85, 7.15, material(0xd1e0d5, { roughness: 0.43, emissive: 0x3c5d5b, emissiveIntensity: 0.18 }));
  }
  for (let i = 0; i < 5; i += 1) {
    box(2.4, 0.025, 0.16, 5.2, 0.85, 5.8 + i * 1.35, material(0xa5c4c2, { roughness: 0.43, emissive: 0x264d52, emissiveIntensity: 0.16 }));
  }
  addDrain(0, 3.55, 26, true);
  addDrain(-7.1, -0.6, 13.5, false);
  addDrain(-8.4, -8.5, 4.3, true);

  makeStore();
  makeVendingMachine(-6.6, 2.35);
  makeBicycle(-8.8, 2.35);
  makeUmbrellaStand(-4.95, 2.35);
  makeBin(7.85, 2.4, 0x5a7d7e);
  makeBin(8.8, 2.4, 0x637c70);
  makeGuardRail(-10.0, 3.0, 5.0, false);
  makeGuardRail(-10.35, -4.3, 4.2, true);
  addStreetLight(-9.5, 7.4, 5.8);
  addStreetLight(11.1, 8.4, 5.1);
  makeUtilityPole(10.8, -5.25);
  makeTrafficSignal(-12.2, 6.55);
  makeAcUnit(10.0, -3.0);

  const boardMat = material(0x344b54, { roughness: 0.48, metalness: 0.22 });
  box(1.6, 2.25, 0.22, -6.65, 2.0, 3.25, boardMat);
  box(1.28, 1.62, 0.05, -6.65, 2.12, 3.38, material(0x9ac9bd, { roughness: 0.48, emissive: 0x1d4c4e, emissiveIntensity: 0.28 }));
  addSign('NOTICE', 1.1, 0.28, -6.65, 3.45, 3.52, '#efaa72', '#283041');

  const alleyWall = material(0x273b4a, { roughness: 0.72, metalness: 0.15 });
  box(0.35, 3.8, 6.2, -8.8, 2.65, -8.9, alleyWall);
  box(4.5, 3.8, 0.35, -10.55, 2.65, -11.75, alleyWall);
  addSign('ALLEY', 1.85, 0.44, -8.55, 4.1, -8.05, '#5cc4c6', '#12273b', scene, Math.PI / 2);
  for (let i = 0; i < 3; i += 1) box(0.14, 2.4, 0.04, -8.58 + i * 0.52, 2.1, -8.02, material(0xf1bb78, { roughness: 0.3, emissive: 0xc5662b, emissiveIntensity: 0.44 }));

  addPuddle(-2.6, 5.7, 2.3, 0.7, 0x436f7b);
  addPuddle(3.1, 4.15, 2.8, 0.55, 0x4d7881);
  addPuddle(-9.8, 0.7, 1.55, 2.4, 0x375f6d);
  addPuddle(8.7, 7.7, 2.0, 0.7, 0x416a79);
  addPuddle(-5.8, -7.7, 1.8, 0.7, 0x3b6372);

  createRain();
}

makeScene();
window.__rainy = { scene, camera, renderer };

const clock = new THREE.Clock();
let elapsed = 0;

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  elapsed += delta;

  if (animated.rain) {
    const positions = animated.rain.geometry.attributes.position.array;
    const speeds = animated.rainSpeeds;
    const tops = animated.rainTops;
    for (let i = 0; i < speeds.length; i += 1) {
      const offset = i * 6;
      positions[offset + 1] -= speeds[i] * delta;
      positions[offset + 4] -= speeds[i] * delta;
      if (positions[offset + 4] < 0.72) {
        const top = tops[i];
        const length = positions[offset + 1] - positions[offset + 4];
        positions[offset + 1] = top;
        positions[offset + 4] = top - length;
      }
    }
    animated.rain.geometry.attributes.position.needsUpdate = true;
  }

  animated.drips.forEach((item) => {
    const wave = (elapsed * item.speed + item.phase) % 1;
    item.mesh.position.y = item.top - wave * 4.2;
    item.mesh.scale.y = 0.65 + Math.sin(wave * Math.PI) * 0.65;
  });
  animated.glassStreaks.forEach((item) => {
    item.mesh.position.y -= item.speed * delta;
    if (item.mesh.position.y < 1.25) item.mesh.position.y = item.start + Math.sin(elapsed * 0.3 + item.phase) * 0.25;
  });
  animated.ripples.forEach((item) => {
    const wave = (elapsed * item.speed + item.phase) % 1;
    const scale = 0.55 + wave * 0.88;
    item.mesh.scale.x = scale;
    item.mesh.scale.y = scale * 0.92;
    item.mesh.material.opacity = 0.42 * (1 - wave) + 0.06;
  });
  animated.signMaterials.forEach((mat, index) => {
    mat.emissiveIntensity = 0.72 + Math.sin(elapsed * 2.1 + index * 0.7) * 0.12 + (Math.sin(elapsed * 7.3 + index) > 0.96 ? 0.18 : 0);
  });
  if (animated.doors) {
    const cycle = elapsed % 13.5;
    let open = 0;
    if (cycle < 1.15) open = cycle / 1.15;
    else if (cycle < 3.6) open = 1;
    else if (cycle < 4.5) open = 1 - (cycle - 3.6) / 0.9;
    animated.doors.left.position.x = -0.45 - open * 0.82;
    animated.doors.right.position.x = 1.35 + open * 0.82;
  }
  animated.trafficBulbs.forEach((item) => {
    const active = Math.floor(elapsed / 2.4) % 3 === item.index;
    item.mesh.material.emissiveIntensity = active ? 1.35 : 0.16;
  });

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
