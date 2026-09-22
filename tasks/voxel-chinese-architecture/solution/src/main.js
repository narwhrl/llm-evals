import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const colors = {
  earth: 0x8f8171, edge: 0x6d746a, grass: 0x82a48a, grassLight: 0x9ab799,
  grassDark: 0x6c917c, paving: 0xc5c4ad, pavingLight: 0xd5d1b8,
  pavingDark: 0xaaa995, stone: 0xb4b9ad, stoneDark: 0x899791,
  wall: 0xb53e32, wallLight: 0xc75942, redDark: 0x852d2b,
  wood: 0x5e3831, woodLight: 0x855042, woodDark: 0x352f32,
  gold: 0xd8ad58, goldLight: 0xf3cc72, teal: 0x315d62,
  tealLight: 0x45777b, tealDark: 0x244c54, tileHighlight: 0x619097,
  leaf: 0x386d5b, leafLight: 0x56906d, leafDark: 0x285948,
  blossom: 0xd7a3a0, water: 0x77aaa1,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb8cfc5);
scene.fog = new THREE.Fog(0xb8cfc5, 130, 245);

const host = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(host.clientWidth, host.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.55;
host.appendChild(renderer.domElement);

const camera = new THREE.OrthographicCamera();
const initialPosition = new THREE.Vector3(71, 86, 113);
const mobilePosition = new THREE.Vector3(30, 89, 130);
const target = new THREE.Vector3(0, 5, 1);
camera.position.copy(initialPosition);
camera.lookAt(target);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(target);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minZoom = 0.65;
controls.maxZoom = 3.2;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minPolarAngle = Math.PI * 0.13;
controls.enablePan = false;

scene.add(new THREE.HemisphereLight(0xe4f4ef, 0x8a8071, 2.2));
const sun = new THREE.DirectionalLight(0xffe4b6, 3.1);
sun.position.set(-45, 88, 48);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.camera.left = -85;
sun.shadow.camera.right = 85;
sun.shadow.camera.top = 85;
sun.shadow.camera.bottom = -85;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 240;
sun.shadow.bias = -0.00015;
sun.shadow.normalBias = 0.025;
scene.add(sun, sun.target);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const batches = new Map();
function box(material, x, y, z, width = 1, height = 1, depth = 1, casts = true) {
  const key = `${material}:${casts}`;
  if (!batches.has(key)) batches.set(key, []);
  batches.get(key).push([x, y, z, width, height, depth]);
}
function paired(fn) { for (const side of [-1, 1]) fn(side); }
function hash(a, b) {
  let n = (a * 374761393 + b * 668265263) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function ground() {
  box('earth', 0, -2.2, 0, 108, 3.4, 102, false);
  box('edge', 0, -0.56, 0, 106, 0.18, 100, false);
  for (let x = -52; x <= 52; x += 2) {
    for (let z = -49; z <= 49; z += 2) {
      const inside = Math.abs(x) < 44 && Math.abs(z) < 41;
      const paved = inside && ((Math.abs(x) < 6 && z > -12 && z < 38) ||
        (Math.abs(x) < 20 && z > -12 && z < 17) ||
        (Math.abs(x) < 18 && z < -30 && z > -39) ||
        (Math.abs(z - 21) < 3 && Math.abs(x) < 35));
      const h = hash(x, z);
      const material = paved ? (h > 0.78 ? 'pavingLight' : h < 0.15 ? 'pavingDark' : 'paving') :
        (h > 0.76 ? 'grassLight' : h < 0.22 ? 'grassDark' : 'grass');
      box(material, x, -0.35 + (paved ? 0.08 : 0), z, 1.94, 0.25, 1.94, false);
    }
  }
  // The court is set in a rectangular stone apron, with a tiled axial walk.
  for (const x of [-20, 20]) box('stoneDark', x, 0.01, 4, 0.35, 0.4, 35, false);
  for (const z of [-13, 20]) box('stoneDark', 0, 0.01, z, 40, 0.4, 0.35, false);
  for (let z = -9; z <= 34; z += 4) {
    box('pavingDark', 0, 0.02, z, 9.4, 0.12, 0.15, false);
  }
  for (let x = -43; x <= 43; x += 2) {
    box('stoneDark', x, -1.55, 50.4, 1.95, 1.2, 1.8, false);
    box('stone', x, -0.78, 50.4, 1.95, 0.34, 1.8, false);
  }
}

function boundary() {
  for (const side of [-1, 1]) {
    for (let z = -40; z <= 40; z += 2) {
      box('stoneDark', side * 44, 0.35, z, 1.7, 0.8, 1.95);
      box(z % 8 === 0 ? 'redDark' : 'wall', side * 44, 2.1, z, 1.25, 2.7, 1.95);
      box('tealDark', side * 44, 3.6, z, 2.1, 0.36, 2.1);
      if (z % 8 === 0) box('gold', side * 44, 3.86, z, 2.15, 0.14, 0.26);
    }
    for (let x = 14; x <= 42; x += 2) {
      const xx = x * side;
      for (const z of [-40, 40]) {
        box('stoneDark', xx, 0.35, z, 1.95, 0.8, 1.7);
        box(x % 8 === 0 ? 'redDark' : 'wall', xx, 2.1, z, 1.95, 2.7, 1.25);
        box('tealDark', xx, 3.6, z, 2.1, 0.36, 2.1);
      }
    }
  }
  for (let x = -12; x <= 12; x += 2) {
    box('stoneDark', x, 0.35, -40, 1.95, 0.8, 1.7);
    box('wall', x, 2.1, -40, 1.95, 2.7, 1.25);
    box('tealDark', x, 3.6, -40, 2.1, 0.36, 2.1);
  }
}

function stairs(cx, front, width, top = 1.6, direction = 1) {
  for (let step = 0; step < 5; step++) {
    const h = top * (step + 1) / 5;
    box(step % 2 ? 'stone' : 'pavingLight', cx, h / 2,
      front + direction * (4.1 - step * 0.72),
      width, h, 0.78);
  }
  paired(side => {
    for (let i = 0; i < 4; i++) {
      box('stoneDark', cx + side * (width / 2 + 0.6), 0.54 + i * 0.3,
        front + direction * (3.8 - i * 0.72), 0.65, 0.55 + i * 0.24, 0.75);
    }
  });
}

function plinth(cx, cz, width, depth, height = 1.6) {
  box('stoneDark', cx, height * 0.35 - 0.03, cz, width + 2, height * 0.7, depth + 2);
  box('stone', cx, height * 0.84, cz, width + 1.3, height * 0.3, depth + 1.3);
  box('pavingLight', cx, height + 0.03, cz, width, 0.16, depth);
  for (let x = -width / 2 + 2; x < width / 2; x += 3) {
    for (const side of [-1, 1]) box('pavingDark', cx + x, height + 0.13,
      cz + side * (depth / 2 - 0.5), 0.12, 0.08, 0.95, false);
  }
}

function roof(cx, cz, halfX, halfZ, eaveY, levels, scheme = 'teal') {
  const primary = scheme === 'teal' ? 'teal' : 'tealDark';
  box('woodDark', cx, eaveY - 0.38, cz, halfX * 2 + 0.8, 0.62, halfZ * 2 + 0.8);
  for (let layer = 0; layer < levels; layer++) {
    const hx = halfX - layer;
    const hz = halfZ - layer;
    const y = eaveY + layer * 0.62;
    for (let x = -hx; x <= hx; x++) {
      for (const z of [-hz, hz]) {
        const accent = x % 5 === 0 && layer < levels - 1;
        const tile = accent ? 'gold' : (x + layer) % 3 === 0 ? 'tileHighlight' : primary;
        const lift = layer === 0 && Math.abs(x) >= hx - 2 ? 0.4 * (Math.abs(x) - hx + 3) / 3 : 0;
        box(tile, cx + x, y + lift, cz + z, 0.98, 0.43, 0.98);
      }
    }
    for (let z = -hz + 1; z < hz; z++) {
      for (const x of [-hx, hx]) {
        const accent = z % 5 === 0 && layer < levels - 1;
        box(accent ? 'gold' : z % 3 === 0 ? 'tealLight' : primary,
          cx + x, y + (layer === 0 && Math.abs(z) >= hz - 2 ? 0.32 : 0), cz + z,
          0.98, 0.43, 0.98);
      }
    }
  }
  const topX = halfX - levels;
  const topZ = halfZ - levels;
  const topY = eaveY + levels * 0.62;
  for (let x = -topX; x <= topX; x++) {
    for (let z = -topZ; z <= topZ; z++) {
      box((x + z) % 4 === 0 ? 'tealLight' : primary, cx + x, topY, cz + z,
        0.98, 0.45, 0.98);
    }
  }
  // The raised ridge and turned corner tips make the stepped hip roof legible.
  for (let x = -topX - 1; x <= topX + 1; x++) {
    box('goldLight', cx + x, topY + 0.5, cz, 0.87, 0.38, 0.73);
  }
  paired(sx => paired(sz => {
    box('woodDark', cx + sx * (halfX + 0.55), eaveY + 0.15,
      cz + sz * (halfZ + 0.55), 1.6, 0.56, 1.6);
    box('gold', cx + sx * (halfX + 0.95), eaveY + 0.83,
      cz + sz * (halfZ + 0.95), 1.0, 0.55, 1.0);
    box('goldLight', cx + sx * (halfX + 1.18), eaveY + 1.4,
      cz + sz * (halfZ + 1.18), 0.5, 0.55, 0.5);
  }));
  for (let x = -halfX + 2; x < halfX; x += 3) {
    box('gold', cx + x, eaveY - 0.05, cz + halfZ + 0.15, 0.34, 0.28, 0.58);
  }
}

function bracket(cx, y, cz, side = 1) {
  box('woodDark', cx, y, cz, 1.15, 0.42, 1.1);
  box('gold', cx, y + 0.34, cz + side * 0.22, 1.65, 0.22, 1.4);
  box('woodLight', cx, y + 0.6, cz + side * 0.38, 2.05, 0.26, 1.6);
  box('gold', cx, y + 0.85, cz + side * 0.48, 2.35, 0.17, 1.85);
}

function lantern(x, y, z) {
  box('woodDark', x, y + 0.7, z, 0.12, 0.85, 0.12);
  box('gold', x, y + 0.22, z, 0.9, 0.2, 0.9);
  box('wallLight', x, y - 0.22, z, 0.77, 0.83, 0.77);
  box('gold', x, y - 0.66, z, 0.93, 0.16, 0.93);
  box('goldLight', x, y - 0.91, z, 0.17, 0.37, 0.17);
}

function lion(x, z, side) {
  box('stoneDark', x, 0.42, z, 1.8, 0.65, 1.55);
  box('stone', x, 1.21, z, 1.18, 0.9, 1.05);
  box('stone', x, 2.04, z + 0.26, 1.0, 0.78, 0.9);
  box('stoneDark', x + side * 0.37, 2.18, z + 0.73, 0.18, 0.19, 0.18);
  box('stoneDark', x - side * 0.3, 2.18, z + 0.73, 0.18, 0.19, 0.18);
  box('stoneDark', x + side * 0.62, 1.03, z + 0.38, 0.3, 0.42, 0.4);
}

function hall(cx, cz, width, depth, columns, roofLevels, height, ornament = false) {
  plinth(cx, cz, width, depth);
  const front = cz + depth / 2 - 0.65;
  const back = cz - depth / 2 + 0.65;
  const eave = height + 1.15;
  box('wall', cx, 4.6, back + 0.25, width - 1.4, 5.9, 0.65);
  for (const side of [-1, 1]) {
    box('wall', cx + side * (width / 2 - 0.65), 4.65, cz, 0.75, 5.8, depth - 1.8);
    box('woodDark', cx + side * (width / 2 - 0.65), 7.7, cz,
      0.82, 0.33, depth - 1.8);
  }
  box('woodDark', cx, height - 0.36, front, width + 0.4, 0.65, 0.8);
  box('gold', cx, height - 0.83, front + 0.44, width - 0.5, 0.2, 0.18);
  box('woodDark', cx, 2.0, front, width + 0.3, 0.45, 0.72);
  const spacing = (width - 2) / (columns - 1);
  for (let i = 0; i < columns; i++) {
    const x = cx - (width - 2) / 2 + i * spacing;
    for (const z of [front, back]) {
      box('stone', x, 1.88, z, 1.55, 0.38, 1.55);
      box('wood', x, (height + 2.2) / 2, z, 0.92, height - 2.2, 0.92);
      box('redDark', x, height - 0.38, z, 1.17, 0.36, 1.17);
      bracket(x, height + 0.15, z, z === front ? 1 : -1);
    }
    if (i < columns - 1) {
      const bayX = x + spacing / 2;
      const bayWidth = spacing - 1.12;
      box('woodDark', bayX, 4.63, front + 0.05, bayWidth, 4.7, 0.45);
      box(i === Math.floor((columns - 1) / 2) ? 'wall' : 'redDark',
        bayX, 4.53, front + 0.32, bayWidth - 0.35, 4.25, 0.16);
      box('woodDark', bayX, 5.04, front + 0.43, 0.16, 3.7, 0.15);
      for (let k = 0; k < 4; k++) {
        box('gold', bayX, 3.36 + k * 0.79, front + 0.47,
          bayWidth - 0.55, 0.09, 0.15);
      }
      for (const s of [-1, 1]) box('gold', bayX + s * (bayWidth - 0.65) / 4,
        5.12, front + 0.47, 0.08, 3.55, 0.15);
      box('goldLight', bayX + 0.2, 4.2, front + 0.57, 0.13, 0.17, 0.12);
    }
  }
  box('woodDark', cx, height - 1.25, front + 0.56, spacing * 1.05, 0.85, 0.32);
  for (const s of [-1, 1]) {
    box('gold', cx + s * spacing * 0.43, height - 1.25, front + 0.76,
      0.14, 0.61, 0.11);
    lantern(cx + s * (width / 2 - 2.1), height - 2.15, front + 1.0);
  }
  roof(cx, cz, Math.round(width / 2 + 3), Math.round(depth / 2 + 3),
    eave, roofLevels, ornament ? 'teal' : 'dark');
  stairs(cx, front + 0.1, ornament ? 9 : 5.5);
  if (ornament) {
    paired(side => lion(cx + side * 7.6, front + 5.5, side));
    for (const side of [-1, 1]) {
      for (let z = -depth / 2 + 2; z < depth / 2 - 2; z += 4) {
        box('stone', cx + side * (width / 2 + 0.9), 1.9, cz + z,
          0.5, 0.65, 0.5);
        box('stone', cx + side * (width / 2 + 0.9), 2.25, cz + z,
          0.7, 0.16, 0.7);
      }
    }
  }
}

function gate() {
  const cx = 0, cz = 32, width = 20, depth = 7;
  plinth(cx, cz, width, depth, 1.15);
  const front = cz + depth / 2 - 0.65;
  const back = cz - depth / 2 + 0.65;
  for (const x of [-9, -4.5, 4.5, 9]) {
    for (const z of [front, back]) {
      box('stone', x, 1.4, z, 1.5, 0.4, 1.5);
      box('wood', x, 4.35, z, 0.95, 5.6, 0.95);
      bracket(x, 7.25, z, z === front ? 1 : -1);
    }
  }
  paired(side => {
    box('wall', side * 6.75, 4.13, cz, 3.8, 5.6, depth - 1);
    box('woodDark', side * 6.75, 6.05, front + 0.15, 2.8, 0.32, 0.24);
    lantern(side * 8.65, 6.35, front + 1.3);
  });
  box('redDark', 0, 6.45, front, 8.8, 0.75, 0.65);
  paired(side => {
    box('woodDark', side * 3.1, 3.65, front + 0.11, 2.15, 4.65, 0.65);
    box('gold', side * 3.1, 3.6, front + 0.49, 0.14, 3.8, 0.18);
    for (const y of [2.75, 4.4, 5.58]) {
      box('gold', side * 3.1, y, front + 0.49, 1.8, 0.1, 0.17);
    }
  });
  box('woodDark', 0, 7.45, front + 0.5, 7, 0.82, 0.32);
  roof(cx, cz, 13, 7, 8.05, 5);
  stairs(0, front, 7, 1.15);
  stairs(0, back, 7, 1.15, -1);
  for (const side of [-1, 1]) lion(side * 11, 39.4, side);
}

function tower(cx, cz) {
  plinth(cx, cz, 8.5, 8.5, 1.25);
  for (const [base, eave, size, roofHalf, levels] of [
    [1.3, 7.1, 8, 7, 4], [9.0, 14.3, 6, 6, 6]
  ]) {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const x = cx + sx * (size / 2 - 0.4);
      const z = cz + sz * (size / 2 - 0.4);
      box('stone', x, base + 0.23, z, 1.25, 0.36, 1.25);
      box('wood', x, (base + eave) / 2, z, 0.8, eave - base, 0.8);
      bracket(x, eave - 0.2, z, sz);
    }
    box('wall', cx, (base + eave) / 2, cz, size - 1, eave - base - 0.8, size - 1);
    for (const side of [-1, 1]) {
      box('woodDark', cx + side * (size / 2 - 0.12), base + 2.5, cz,
        0.18, 2.2, 2.5);
      box('gold', cx + side * (size / 2 + 0.02), base + 2.5, cz,
        0.12, 1.9, 0.12);
    }
    box('woodDark', cx, base + 2.3, cz + size / 2 + 0.1, 2.5, 2.6, 0.2);
    box('gold', cx, base + 2.3, cz + size / 2 + 0.24, 1.9, 2.0, 0.12);
    roof(cx, cz, roofHalf, roofHalf, eave, levels);
    for (const side of [-1, 1]) lantern(cx + side * (size / 2 + 0.7),
      eave - 1.2, cz + size / 2 + 0.2);
  }
  for (let y = 18.7; y <= 21.7; y += 0.6) {
    box(y > 21 ? 'goldLight' : 'gold', cx, y, cz,
      y > 21 ? 0.55 : 1.05, 0.57, y > 21 ? 0.55 : 1.05);
  }
  stairs(cx, cz + 3.8, 3, 1.25);
}

function tree(x, z, scale = 1) {
  box('wood', x, 1.85 * scale, z, 0.9 * scale, 4 * scale, 0.9 * scale);
  for (let layer = 0; layer < 4; layer++) {
    const width = (4.2 - layer * 0.75) * scale;
    const y = (3.2 + layer * 1.1) * scale;
    for (let dx = -width; dx <= width; dx += 1.1 * scale) {
      for (let dz = -width; dz <= width; dz += 1.1 * scale) {
        if (Math.abs(dx) + Math.abs(dz) > width * 1.65) continue;
        const v = hash(Math.round(x * 7 + dx), Math.round(z * 7 + dz));
        box(v > 0.78 ? 'leafLight' : v < 0.24 ? 'leafDark' : 'leaf',
          x + dx, y + (v > 0.8 ? 0.18 : 0), z + dz,
          1.1 * scale, 0.9 * scale, 1.1 * scale);
      }
    }
  }
  box('leafLight', x, 7.75 * scale, z, 1.3 * scale, 1.2 * scale, 1.3 * scale);
}

function planters() {
  for (const sx of [-1, 1]) {
    for (const z of [-33, -1, 31]) tree(sx * 40, z, z === -1 ? 0.82 : 1);
    for (const z of [-2, 10]) {
      const x = sx * 17.1;
      box('stoneDark', x, 0.45, z, 3.7, 0.8, 3.7);
      box('earth', x, 0.87, z, 3.2, 0.16, 3.2);
      for (let i = -1; i <= 1; i++) {
        box(i === 0 ? 'blossom' : 'leafLight', x + i * 0.9, 1.38, z,
          0.82, 0.83, 0.82);
        box('leaf', x + i * 0.9, 1.0, z + 0.7, 0.8, 0.38, 0.6);
      }
    }
    for (const z of [6, 20]) {
      const x = sx * 6.8;
      box('stoneDark', x, 0.75, z, 0.65, 1.5, 0.65);
      box('woodDark', x, 2.1, z, 0.22, 1.4, 0.22);
      box('gold', x, 2.85, z, 1.2, 0.22, 1.2);
      box('wallLight', x, 3.28, z, 0.86, 0.85, 0.86);
      box('tealDark', x, 3.8, z, 1.4, 0.3, 1.4);
    }
  }
  for (let i = -4; i <= 4; i++) {
    box('water', i * 1.8, 0.05, 3.6, 1.62, 0.08, 0.26, false);
  }
}

ground();
boundary();
hall(0, -22, 29, 17, 5, 9, 8.25, true);
paired(side => hall(side * 30, -15, 16, 12, 4, 6, 6.6));
gate();
paired(side => tower(side * 30, 22));
planters();

const materials = Object.fromEntries(Object.entries(colors).map(([name, color]) => [name,
  new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 })]));
const dummy = new THREE.Object3D();
for (const [key, instances] of batches) {
  const [name, shadow] = key.split(':');
  const mesh = new THREE.InstancedMesh(geometry, materials[name], instances.length);
  mesh.castShadow = shadow === 'true';
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  instances.forEach(([x, y, z, width, height, depth], index) => {
    dummy.position.set(x, y, z);
    dummy.scale.set(width, height, depth);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);
}

function resize() {
  const width = host.clientWidth;
  const height = host.clientHeight;
  const aspect = width / height;
  const mode = aspect < 0.75 ? 'mobile' : 'desktop';
  if (mode !== framingMode) {
    camera.position.copy(mode === 'mobile' ? mobilePosition : initialPosition);
    controls.target.copy(target);
    framingMode = mode;
  }
  const span = Math.max(103, 140 / aspect);
  camera.left = -span * aspect / 2;
  camera.right = span * aspect / 2;
  camera.top = span / 2;
  camera.bottom = -span / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener('resize', resize);
let framingMode;
resize();

document.querySelector('#reset-view').addEventListener('click', () => {
  camera.position.copy(framingMode === 'mobile' ? mobilePosition : initialPosition);
  camera.zoom = 1;
  camera.updateProjectionMatrix();
  controls.target.copy(target);
  controls.update();
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
