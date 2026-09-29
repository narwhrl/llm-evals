import * as THREE from 'three';

export const layout = [
  { id: 'main-hall', kind: 'hall', x: 0, z: -18, width: 25, depth: 13, height: 8, base: 2, doubleRoof: true, gold: true },
  { id: 'east-hall', kind: 'hall', x: 24, z: -10, width: 18, depth: 8, height: 5, base: 1.2, rotation: -Math.PI / 2 },
  { id: 'west-hall', kind: 'hall', x: -24, z: -10, width: 18, depth: 8, height: 5, base: 1.2, rotation: Math.PI / 2 },
  { id: 'rear-hall', kind: 'hall', x: 0, z: -33, width: 15, depth: 7, height: 4.5, base: 1 },
  { id: 'mountain-gate', kind: 'gate', x: 0, z: 30, width: 16, depth: 6, height: 5.5, base: 0.8 },
  { id: 'bell-tower', kind: 'tower', x: -23, z: 19, width: 7, depth: 7, height: 12, base: 1.4 },
  { id: 'drum-tower', kind: 'tower', x: 23, z: 19, width: 7, depth: 7, height: 12, base: 1.4 },
];

const palette = {
  red: ['#9f352e', '#ab3c31', '#b44939', '#923c31'],
  wood: ['#644135', '#79513e', '#885c43'],
  stone: ['#c9cdc0', '#bdc4b7', '#d5d8ca', '#b4bcad'],
  paving: ['#c1c9bc', '#cbd1c3', '#b9c3b6', '#d4d7c8'],
  jade: ['#396f68', '#438477', '#4d9182', '#366a62', '#5a9d88'],
  gold: ['#b78c3f', '#c69b48', '#d9ac51', '#e1b960', '#cc9e45'],
  grass: ['#617e52', '#718b59', '#7c935c', '#859c66'],
  leaf: ['#3d6548', '#4c7550', '#587e52', '#688b56', '#73965b'],
  pink: ['#d38a8b', '#e7acac', '#efbfba', '#cc8c99'],
};
const GOLD = '#d5b468';
const JADE = '#477d71';
const DARK = '#403d30';
const CELL = 0.5;

function hash(x, z, seed = 0) {
  const n = Math.sin(x * 127.1 + z * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
}
function shade(type, x, z, seed = 0) {
  const colors = palette[type];
  return colors[Math.floor(hash(x, z, seed) * colors.length)];
}

export class VoxelBatch {
  constructor() {
    this.groups = new Map();
    this.count = 0;
  }
  box(x, y, z, w, h, d, color, glow = false) {
    if (![x, y, z, w, h, d].every(Number.isFinite) || w <= 0 || h <= 0 || d <= 0) {
      throw new Error('Invalid voxel dimensions');
    }
    const key = glow ? 'glow' : 'solid';
    if (!this.groups.has(key)) this.groups.set(key, []);
    this.groups.get(key).push({ x, y, z, w, h, d, color });
    this.count++;
  }
  finish(parent) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const color = new THREE.Color();
    for (const [key, blocks] of this.groups) {
      const material = new THREE.MeshStandardMaterial({ roughness: 0.86, metalness: 0.03 });
      if (key === 'glow') {
        material.emissive.set('#ffae50');
        material.emissiveIntensity = 0.6;
      }
      const mesh = new THREE.InstancedMesh(geometry, material, blocks.length);
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        position.set(block.x, block.y, block.z);
        scale.set(block.w, block.h, block.d);
        mesh.setMatrixAt(i, matrix.compose(position, quaternion, scale));
        mesh.setColorAt(i, color.set(block.color));
      }
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.computeBoundingSphere();
      parent.add(mesh);
    }
  }
}

function localBox(batch, spec) {
  const c = Math.cos(spec.rotation || 0);
  const s = Math.sin(spec.rotation || 0);
  return (x, y, z, w, h, d, color, glow) => {
    batch.box(spec.x + x * c + z * s, y, spec.z - x * s + z * c,
      Math.abs(c) * w + Math.abs(s) * d, h, Math.abs(s) * w + Math.abs(c) * d, color, glow);
  };
}

function tiledPlane(box, x, y, z, w, d, type, cell = 1) {
  for (let ix = 0; ix < w; ix += cell) {
    for (let iz = 0; iz < d; iz += cell) {
      const sx = Math.min(cell, w - ix);
      const sz = Math.min(cell, d - iz);
      box(x - w / 2 + ix + sx / 2, y, z - d / 2 + iz + sz / 2,
        sx - 0.045, 0.16, sz - 0.045, shade(type, ix, iz));
    }
  }
}

export function roofHeight(x, z, width, depth, rise) {
  const hd = depth / 2;
  const ridge = Math.max(0, (width - depth) / 2);
  const slope = Math.min(1, Math.max(Math.abs(z) / hd, (Math.abs(x) - ridge) / hd));
  const corner = Math.pow(Math.max(0, (Math.abs(x) - width / 2 + 2.5) / 2.5), 2)
    * Math.pow(Math.max(0, (Math.abs(z) - hd + 2.5) / 2.5), 2) * 1.55;
  const eave = Math.pow(Math.max(0, (slope - 0.72) / 0.28), 2) * 0.48;
  return Math.round((rise * (1 - Math.pow(slope, 0.78)) + corner + eave) / 0.22) * 0.22;
}

function roof(box, width, depth, y, rise, gold = false) {
  const type = gold ? 'gold' : 'jade';
  for (let x = -width / 2 + CELL / 2; x < width / 2; x += CELL) {
    for (let z = -depth / 2 + CELL / 2; z < depth / 2; z += CELL) {
      const edge = Math.abs(x) > width / 2 - CELL || Math.abs(z) > depth / 2 - CELL;
      const h = roofHeight(x, z, width, depth, rise);
      box(x, y + h, z, CELL, 0.28, CELL, edge ? GOLD : shade(type, x, z));
      if (edge) box(x, y + h - 0.23, z, CELL, 0.25, CELL, '#713f30');
    }
  }
  const ridge = Math.max(0, (width - depth) / 2);
  for (let x = -ridge; x <= ridge; x += CELL) {
    box(x, y + rise + 0.32, 0, 0.48, 0.45, 0.48, GOLD);
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      box(side * (ridge + i * 0.32), y + rise + 0.4 + i * 0.28, 0, 0.45, 0.45, 0.45, GOLD);
    }
    for (const front of [-1, 1]) {
      for (let t = 0; t <= 1; t += 0.07) {
        const x = side * (ridge + depth / 2 * t);
        const z = front * depth / 2 * t;
        box(x, y + roofHeight(x, z, width, depth, rise) + 0.18, z, 0.37, 0.27, 0.37, GOLD);
      }
      for (let j = 0; j < 3; j++) {
        const x = side * (width / 2 - 1.25 - j * 0.55);
        const z = front * (depth / 2 - 1.25 - j * 0.55);
        box(x, y + roofHeight(x, z, width, depth, rise) + 0.5, z, 0.32, 0.48, 0.32, GOLD);
      }
    }
  }
}

function lantern(box, x, y, z) {
  box(x, y + 0.85, z, 0.08, 0.8, 0.08, DARK);
  box(x, y + 0.32, z, 0.58, 0.14, 0.58, GOLD);
  box(x, y - 0.12, z, 0.58, 0.72, 0.58, '#db5036', true);
  box(x, y - 0.58, z, 0.58, 0.12, 0.58, GOLD);
  box(x, y - 0.84, z, 0.09, 0.45, 0.09, '#ce903c');
}

function bracket(box, x, y, z) {
  box(x, y, z, 0.55, 0.28, 0.55, GOLD);
  box(x, y + 0.3, z, 1.05, 0.22, 0.7, '#448176');
  box(x, y + 0.56, z + 0.15, 0.8, 0.25, 1.25, '#a0513b');
  for (const side of [-1, 1]) {
    box(x + side * 0.53, y + 0.58, z, 0.27, 0.6, 0.5, GOLD);
    box(x, y + 0.83, z + side * 0.57, 0.55, 0.22, 0.42, JADE);
  }
  box(x, y + 1.05, z, 1.6, 0.22, 1.5, GOLD);
}

function railing(box, x, y, z, length, axis = 'x') {
  const segment = (p, dy, w, h, d, color) => axis === 'x'
    ? box(x + p, y + dy, z, w, h, d, color)
    : box(x, y + dy, z + p, d, h, w, color);
  segment(0, 0.92, length, 0.16, 0.2, '#dbdbcb');
  segment(0, 0.38, length, 0.14, 0.16, '#c4cbbd');
  for (let p = -length / 2; p <= length / 2; p += 1.5) {
    segment(p, 0.65, 0.26, 1.3, 0.26, '#d7d9c8');
    segment(p, 1.36, 0.38, 0.23, 0.38, '#e0e0cf');
  }
}

function windowPanel(box, x, y, z, w, h) {
  box(x, y, z, w, h, 0.18, '#31473d');
  box(x, y, z + 0.14, w + 0.2, 0.13, 0.1, GOLD);
  for (const side of [-1, 1]) {
    box(x + side * w / 2, y, z + 0.13, 0.12, h, 0.1, '#b9945b');
    box(x, y + side * h / 2, z + 0.13, w, 0.14, 0.1, '#b9945b');
  }
  for (let u = -w / 2 + 0.28; u < w / 2; u += 0.38) {
    box(x + u, y, z + 0.12, 0.06, h, 0.1, '#aa8952');
  }
  for (let v = -h / 2 + 0.28; v < h / 2; v += 0.42) {
    box(x, y + v, z + 0.15, w, 0.06, 0.1, '#aa8952');
  }
}

function hall(batch, spec) {
  const box = localBox(batch, spec);
  const { width: w, depth: d, height: h, base: b } = spec;
  for (let layer = 0; layer < 4; layer++) {
    box(0, b * (layer + 0.5) / 4, 0, w + 3.6 - layer * 0.6, b / 4, d + 3.6 - layer * 0.6,
      palette.stone[layer]);
  }
  tiledPlane(box, 0, b + 0.04, 0, w + 1.5, d + 1.5, 'stone');
  for (let i = 0; i < Math.ceil(b / 0.25); i++) {
    const height = Math.min(b, (i + 1) * 0.25);
    box(0, height / 2, d / 2 + 1.65 + (Math.ceil(b / 0.25) - i) * 0.35,
      spec.gold ? 7.6 : 4.4, height, 0.4, shade('stone', i, 4));
  }
  const wallFront = d / 2 - 1.2;
  const rear = -d / 2 + 0.55;
  const gate = spec.kind === 'gate';
  for (let x = -w / 2 + 0.25; x < w / 2; x += CELL) {
    for (let yy = b + 0.25; yy < b + h - 0.8; yy += CELL) {
      if (gate && Math.abs(x) < 3.2) continue;
      box(x, yy, rear, 0.5, 0.5, 0.6, shade('red', x, yy));
      const inDoor = !gate && Math.abs(x) < (spec.gold ? 3.3 : 1.5) && yy < b + h * 0.72;
      if (!inDoor) box(x, yy, wallFront, 0.5, 0.5, 0.5, shade('red', x, yy, 1));
    }
  }
  for (const side of [-1, 1]) {
    for (let z = rear; z < wallFront; z += CELL) {
      for (let y = b; y < b + h - 0.8; y += CELL) {
        box(side * (w / 2 - 0.3), y + 0.25, z, 0.6, 0.5, 0.5, shade('red', z, y, 2));
      }
    }
  }
  const bays = spec.gold ? 6 : 4;
  for (let i = 0; i <= bays; i++) {
    const x = -w / 2 + 0.7 + i * (w - 1.4) / bays;
    for (const z of [-d / 2 + 0.45, d / 2 - 0.25]) {
      if (gate && Math.abs(x) < 0.5) continue;
      box(x, b + 0.22, z, 0.9, 0.44, 0.9, '#c8c9b9');
      for (let yy = b + 0.5; yy < b + h; yy += 0.5) box(x, yy, z, 0.5, 0.5, 0.5, shade('red', x, yy, 6));
      box(x, b + h - 0.6, z, 0.66, 0.18, 0.65, GOLD);
      bracket(box, x, b + h - 0.55, z);
    }
    if (i < bays) {
      const midpoint = x + (w - 1.4) / bays / 2;
      if (Math.abs(midpoint) > (spec.gold ? 3 : gate ? 3.2 : 1.7)) {
        windowPanel(box, midpoint, b + h * 0.48, wallFront + 0.3, (w - 1.4) / bays - 0.55, h * 0.44);
      }
    }
  }
  for (const z of [-d / 2 + 0.45, d / 2 - 0.25]) {
    box(0, b + h - 0.3, z, w, 0.34, 0.54, '#794433');
    box(0, b + h + 0.24, z, w + 1, 0.26, 0.72, JADE);
    box(0, b + h + 0.59, z, w + 1.3, 0.24, 0.78, GOLD);
  }
  if (!gate) {
    const doorW = spec.gold ? 6 : 2.8;
    box(0, b + h * 0.34, wallFront + 0.24, doorW, h * 0.67, 0.22, '#684330');
    for (let x = -doorW / 2 + 0.15; x < doorW / 2; x += 0.55) {
      box(x, b + h * 0.35, wallFront + 0.4, 0.06, h * 0.67, 0.1, '#ae8250');
      for (let y = b + 0.5; y < b + h * 0.65; y += 0.6) box(x, y, wallFront + 0.43, 0.12, 0.12, 0.1, GOLD);
    }
    box(0, b + h * 0.69, wallFront + 0.45, doorW + 0.5, 0.24, 0.25, GOLD);
  }
  const signWidth = gate ? 3.6 : spec.gold ? 4.8 : 2.8;
  box(0, b + h - 0.8, d / 2 + 0.11, signWidth + 0.2, 1, 0.3, GOLD);
  box(0, b + h - 0.8, d / 2 + 0.3, signWidth, 0.83, 0.13, '#304d43');
  for (const x of [-w / 2 + 1.9, w / 2 - 1.9]) lantern(box, x, b + h - 1.55, d / 2 + 0.2);
  roof(box, w + 5, d + 5, b + h + 0.9, spec.gold ? 4 : 2.65, spec.gold);
  if (spec.doubleRoof) {
    box(0, b + h + 4.3, 0, w - 4, 2.4, d - 3, '#a24331');
    for (let x = -w / 2 + 2; x <= w / 2 - 2; x += 2.1) {
      bracket(box, x, b + h + 5, (d - 3) / 2);
      bracket(box, x, b + h + 5, -(d - 3) / 2);
    }
    roof(box, w + 1, d + 1, b + h + 6.15, 3.9, true);
  }
  if (spec.gold) {
    for (const side of [-1, 1]) {
      railing(box, side * 8.9, b + 0.15, d / 2 + 1, 8);
      railing(box, side * (w / 2 + 0.95), b + 0.15, 0, d + 1.8, 'z');
    }
  }
  return { box, signY: b + h - 0.8, signZ: d / 2 + 0.39, signWidth };
}

function tower(batch, spec) {
  const box = localBox(batch, spec);
  box(0, 0.65, 0, 10, 1.3, 10, '#b6bcae');
  box(0, 1.35, 0, 9.5, 0.2, 9.5, '#d1d4c3');
  for (let i = 0; i < 5; i++) box(0, (i + 1) * 0.14, 5.75 - i * 0.38, 3.2, (i + 1) * 0.28, 0.42, '#c9cebe');
  for (const x of [-3, 3]) {
    for (const z of [-3, 3]) {
      for (let y = 1.5; y < 12; y += 0.5) box(x, y, z, 0.6, 0.5, 0.6, shade('red', x, y));
      bracket(box, x, 5.4, z);
      bracket(box, x, 11.45, z);
    }
  }
  box(0, 4, -2.8, 5.8, 4.8, 0.6, '#a43e31');
  for (const x of [-2.8, 2.8]) box(x, 4, 0, 0.5, 4.8, 5.8, '#a43e31');
  windowPanel(box, 0, 3.5, 2.85, 3.9, 3);
  box(0, 6.3, 0, 7.3, 0.4, 7.3, '#6a4634');
  roof(box, 11, 11, 6.8, 2.8);
  box(0, 9.1, 0, 7.5, 0.3, 7.5, '#ad6041');
  for (const z of [-3.5, 3.5]) railing(box, 0, 9.15, z, 7);
  for (const x of [-3.5, 3.5]) railing(box, x, 9.15, 0, 7, 'z');
  box(0, 12, 0, 7, 0.4, 7, '#744634');
  roof(box, 10, 10, 12.55, 3.2);
  for (let j = 0; j < 4; j++) box(0, 16.1 + j * 0.3, 0, 0.85 - j * 0.16, 0.35, 0.85 - j * 0.16, GOLD);
  if (spec.id === 'bell-tower') {
    box(0, 11.4, 0, 0.22, 1.8, 0.22, '#775139');
    for (let i = 0; i < 4; i++) box(0, 10.95 - i * 0.4, 0, 1.3 + i * 0.33, 0.42, 1.3 + i * 0.33, '#a28449');
    box(0, 9.2, 0, 2.65, 0.28, 2.65, GOLD);
  } else {
    box(0, 10.45, 0, 2.6, 2, 1.55, '#983e30');
    for (const z of [-0.83, 0.83]) {
      box(0, 10.45, z, 2.7, 2.05, 0.18, '#cab77e');
      box(0, 10.45, z * 1.14, 2.2, 1.6, 0.1, '#e0cb97');
    }
    for (const x of [-1.2, 1.2]) box(x, 9.8, 0, 0.28, 2, 1.8, '#6b4632');
  }
  for (const x of [-2.5, 2.5]) lantern(box, x, 11.25, 3);
}

function wall(batch) {
  const box = batch.box.bind(batch);
  for (const side of [-1, 1]) {
    for (let z = -37; z <= 30; z++) {
      for (let y = 0.25; y <= 2.25; y += 0.5) box(side * 34, y, z, 0.8, 0.5, 1, shade('red', z, y, 8));
      box(side * 34, 2.64, z, 1.4, 0.35, 1.02, JADE);
      box(side * 34, 2.9, z, 0.68, 0.25, 1.02, '#4c8577');
    }
  }
  for (let x = -34; x <= 34; x++) {
    for (const z of [-37, 30]) {
      if (z === 30 && Math.abs(x) < 10) continue;
      for (let y = 0.25; y < 2.5; y += 0.5) box(x, y, z, 1, 0.5, 0.8, shade('red', x, y, 8));
      box(x, 2.64, z, 1.02, 0.35, 1.4, JADE);
      box(x, 2.9, z, 1.02, 0.25, 0.68, '#4c8577');
    }
  }
}

function tree(batch, x, z, scale = 1, blossom = false, seed = 0) {
  const box = (dx, y, dz, w, h, d, color) => batch.box(x + dx * scale, y * scale, z + dz * scale, w * scale, h * scale, d * scale, color);
  for (let i = 0; i < 10; i++) box(0, 0.35 + i * 0.5, 0, 0.65, 0.5, 0.65, shade('wood', i, seed));
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) box(side * i * 0.55, 3 + i * 0.3, 0, 0.6, 0.5, 0.6, '#79503a');
  }
  for (let i = 0; i < 5; i++) {
    const cx = (hash(i, seed, 1) - 0.5) * 3.5;
    const cz = (hash(i, seed, 2) - 0.5) * 3.5;
    const cy = 4.4 + hash(i, seed, 3) * 2;
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        for (let iy = 0; iy < 3; iy++) {
          if (Math.abs(ix) + Math.abs(iz) + iy > 4 || hash(ix + i * 5, iz + iy, seed) > 0.9) continue;
          box(cx + ix * 0.8, cy + iy * 0.7, cz + iz * 0.8, 0.86, 0.76, 0.86,
            shade(blossom ? 'pink' : 'leaf', ix + iy, iz, i));
        }
      }
    }
  }
}

function lion(batch, x, z, side) {
  const box = (dx, y, dz, w, h, d, color = '#b4b9aa') => batch.box(x + dx, y, z + dz, w, h, d, color);
  box(0, 0.3, 0, 1.7, 0.6, 2, '#c8cbbd');
  box(0, 0.8, 0, 1.4, 0.4, 1.7, '#d4d5c4');
  box(0, 1.5, -0.2, 1, 1.2, 1.05);
  box(0, 2.45, 0.1, 1.2, 1.15, 1.1);
  box(0, 2.4, 0.78, 0.72, 0.6, 0.5, '#c8cbbd');
  for (const s of [-1, 1]) {
    box(s * 0.55, 2.95, -0.05, 0.38, 0.5, 0.45);
    box(s * 0.37, 1.2, 0.53, 0.32, 0.72, 0.5);
    box(s * 0.3, 2.58, 0.76, 0.13, 0.13, 0.08, '#4c574b');
  }
  box(side * 0.55, 1.02, 0.77, 0.6, 0.5, 0.6, '#9ea99a');
  for (let i = 0; i < 3; i++) box(0.35, 1.25 + i * 0.33, -0.8 - i * 0.1, 0.3, 0.4, 0.3);
}

function pond(batch, x, z) {
  const box = batch.box.bind(batch);
  box(x, 0.17, z, 9, 0.25, 14, '#618f87');
  for (let ix = -4; ix <= 4; ix++) {
    for (let iz = -6.5; iz <= 6.5; iz++) {
      box(x + ix, 0.32, z + iz, 0.96, 0.12, 0.97, hash(ix, iz) > 0.5 ? '#6aa7a0' : '#77b3ac');
    }
  }
  for (const side of [-1, 1]) {
    box(x + side * 4.8, 0.4, z, 0.6, 0.5, 14.6, '#b4bfb0');
    box(x, 0.4, z + side * 7.2, 9.6, 0.5, 0.6, '#b4bfb0');
  }
  for (let i = 0; i < 13; i++) {
    const px = x + (hash(i, x) - 0.5) * 7;
    const pz = z + (hash(i, z, 3) - 0.5) * 11;
    box(px, 0.45, pz, 0.8, 0.07, 0.75, '#4b855d');
    if (i % 3 === 0) {
      box(px, 0.63, pz, 0.34, 0.25, 0.34, '#e3aaa2');
      box(px, 0.77, pz, 0.13, 0.1, 0.13, '#e8c989');
    }
  }
  // Stepped bridge leaves the longitudinal pond visible on both sides.
  for (let i = -5; i <= 5; i++) {
    const y = 0.65 + (5 - Math.abs(i)) * 0.12;
    box(x + i, y, z, 1.04, 0.28, 2.7, '#c9cfc0');
    for (const side of [-1, 1]) {
      box(x + i, y + 0.7, z + side * 1.24, 0.15, 1.3, 0.15, '#d0d7c6');
      box(x + i, y + 1.25, z + side * 1.24, 1.04, 0.14, 0.2, '#dce0cd');
    }
  }
}

function stoneLamp(batch, x, z) {
  batch.box(x, 0.3, z, 0.9, 0.6, 0.9, '#bcc6b4');
  batch.box(x, 1, z, 0.35, 1.1, 0.35, '#cbd1c0');
  batch.box(x, 1.6, z, 0.9, 0.22, 0.9, '#d5d8c8');
  batch.box(x, 2, z, 0.52, 0.65, 0.52, '#ffd088', true);
  batch.box(x, 2.45, z, 1.2, 0.26, 1.2, JADE);
  batch.box(x, 2.68, z, 0.8, 0.22, 0.8, JADE);
  batch.box(x, 2.88, z, 0.4, 0.2, 0.4, GOLD);
}

function incenseBurner(batch, x, z) {
  for (const side of [-1, 1]) batch.box(x + side * 0.8, 0.85, z, 0.3, 1.2, 0.35, '#596f5e');
  batch.box(x, 1.35, z, 2.6, 1.15, 1.9, '#647867');
  batch.box(x, 2, z, 2.9, 0.25, 2.2, '#c0b47d');
  for (const side of [-1, 1]) batch.box(x + side * 1.65, 1.7, z, 0.25, 1, 0.5, '#708673');
  batch.box(x, 2.3, z, 1.1, 0.38, 0.75, '#485b4c');
  for (const dx of [-0.3, 0, 0.3]) batch.box(x + dx, 2.9, z, 0.045, 0.9, 0.045, '#c7a76a');
}

function plaque(parent, spec, text, sign) {
  const canvas = typeof document === 'undefined' ? null : document.createElement('canvas');
  if (!canvas) return;
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e1bd71';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '76px KaiTi, STKaiti, serif';
  ctx.fillText(text, 256, 70);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(sign.signWidth * 0.8, 0.63),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }));
  const angle = spec.rotation || 0;
  mesh.position.set(spec.x + Math.sin(angle) * sign.signZ, sign.signY, spec.z + Math.cos(angle) * sign.signZ);
  mesh.rotation.y = angle;
  parent.add(mesh);
}

export function buildTemple({ labels = true } = {}) {
  const root = new THREE.Group();
  const batch = new VoxelBatch();
  const box = batch.box.bind(batch);
  box(0, -1.75, 0, 78, 3, 87, '#818f75');
  box(0, -0.35, 0, 78.6, 0.45, 87.6, '#a6b299');
  box(0, -0.05, 0, 77.5, 0.25, 86.5, '#8c9d73');
  for (let x = -38; x <= 38; x += 2) {
    for (const z of [-43.5, 43.5]) {
      box(x, -2.1, z, 1.95, 2.5 + hash(x, z) * 0.4, 0.18, shade('stone', x, z, 2));
      box(x, -0.6, z, 1.96, 0.45, 0.2, '#b0b79f');
    }
  }
  for (let z = -42; z <= 42; z += 2) {
    for (const x of [-39, 39]) box(x, -2.1, z, 0.18, 2.6 + hash(x, z) * 0.4, 1.96, shade('stone', x, z, 2));
  }
  tiledPlane(box, 0, 0.15, -3.5, 66, 65, 'paving', 1.5);
  tiledPlane(box, 0, 0.24, 20, 6, 45, 'stone');
  tiledPlane(box, 0, 0.25, 0, 52, 4, 'stone');
  tiledPlane(box, 0, 0.25, 15, 53, 3, 'stone');
  for (const side of [-1, 1]) {
    box(side * 3.25, 0.3, 14, 0.22, 0.15, 48, '#a5aa8e');
    pond(batch, side * 12, 9);
    for (const z of [-29, -5, 9, 27, 37]) {
      tree(batch, side * (z === 9 ? 30 : 29), z, z === -29 ? 1.15 : 0.95, z === 27 || z === -5, z);
    }
    for (const z of [-32, -22, -12, 0, 12, 24, 37]) {
      tree(batch, side * 36.8, z, 0.9, false, z + 7);
    }
    for (const z of [-3, 9, 22, 36]) stoneLamp(batch, side * 5, z);
    lion(batch, side * 5.3, 36, side);
    for (const z of [-8, 4, 26]) {
      box(side * 30, 0.35, z, 4.5, 0.6, 5.4, '#b1bba1');
      tiledPlane(box, side * 30, 0.7, z, 4.1, 5, 'grass', 0.6);
    }
    for (const z of [3, 23]) {
      box(side * 19, 0.5, z, 3.4, 0.3, 0.65, '#956448');
      for (const dx of [-1.2, 1.2]) box(side * 19 + dx, 0.25, z, 0.35, 0.5, 0.45, '#6b513a');
    }
  }
  for (let i = 0; i < 160; i++) {
    const x = (hash(i, 11) - 0.5) * 76;
    const z = (hash(i, 13) - 0.5) * 84;
    if (Math.abs(x) < 34 && z < 31 && z > -37) continue;
    box(x, 0.15, z, 0.25, 0.45, 0.25, '#6e8a53');
    if (i % 5 === 0) box(x, 0.42, z, 0.3, 0.16, 0.3, '#d9b477');
  }
  wall(batch);
  const signs = [];
  for (const spec of layout) {
    if (spec.kind === 'tower') tower(batch, spec);
    else signs.push([spec, hall(batch, spec)]);
  }
  incenseBurner(batch, 0, -5.5);
  batch.finish(root);
  if (labels) {
    const names = { 'main-hall': '大雄宝殿', 'mountain-gate': '青岚寺', 'east-hall': '藏经阁', 'west-hall': '伽蓝殿', 'rear-hall': '静心堂' };
    for (const [spec, sign] of signs) plaque(root, spec, names[spec.id], sign);
  }
  root.userData.voxelCount = batch.count;
  root.userData.buildingCount = layout.length;
  return root;
}
