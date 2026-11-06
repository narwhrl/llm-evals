import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 16);
const leafGeometry = new THREE.IcosahedronGeometry(1, 1);
const materials = new Map();

function material(color, roughness = 0.85) {
  const key = `${color}:${roughness}`;
  if (!materials.has(key)) {
    materials.set(key, new THREE.MeshStandardMaterial({ color, roughness }));
  }
  return materials.get(key);
}

const cream = material(0xf3e4c7);
const stone = material(0xc4bba4);
const timber = material(0x674e3c);
const green = material(0x385f55);
const terracotta = material(0xaf6244);
const foliage = material(0x496b3a);
const darkGlass = material(0x385354, 0.35);
const warmGlass = new THREE.MeshStandardMaterial({
  color: 0x667c71,
  roughness: 0.35,
  emissive: 0xffc477,
  emissiveIntensity: 0,
});
const goldenGlass = new THREE.MeshStandardMaterial({
  color: 0x73867b,
  roughness: 0.4,
  emissive: 0xffd395,
  emissiveIntensity: 0,
});

export const windowMaterials = [warmGlass, goldenGlass];

function mesh(parent, geometry, mat, x, y, z, sx = 1, sy = 1, sz = 1) {
  const result = new THREE.Mesh(geometry, mat);
  result.position.set(x, y, z);
  result.scale.set(sx, sy, sz);
  result.castShadow = true;
  result.receiveShadow = true;
  parent.add(result);
  return result;
}

function box(parent, mat, x, y, z, width, height, depth) {
  return mesh(parent, boxGeometry, mat, x, y, z, width, height, depth);
}

function gableRoof(parent, width, depth, height, rise, wall, roofColor, overhang = 0.1) {
  const triangle = new THREE.Shape();
  triangle.moveTo(-width / 2, height);
  triangle.lineTo(width / 2, height);
  triangle.lineTo(0, height + rise);
  triangle.closePath();
  const gableGeometry = new THREE.ExtrudeGeometry(triangle, {
    depth,
    bevelEnabled: false,
  });
  gableGeometry.translate(0, 0, -depth / 2);
  mesh(parent, gableGeometry, wall, 0, 0, 0);
  const roof = material(roofColor);
  const half = width / 2 + overhang;
  const angle = Math.atan2(rise, width / 2);
  const fall = half * Math.tan(angle);
  const slopeLength = half / Math.cos(angle);
  for (const side of [-1, 1]) {
    const panel = box(parent, roof, side * half / 2, height + rise - fall / 2, 0,
      slopeLength, 0.075, depth + overhang * 2);
    panel.rotation.z = -side * angle;
    for (let i = 1; i < 6; i++) {
      const t = i / 6;
      const seam = box(parent, roof, side * half * t, height + rise - fall * t + 0.04,
        0, 0.035, 0.018, depth + overhang * 2 + 0.008);
      seam.rotation.z = -side * angle;
    }
  }
  const ridge = mesh(parent, cylinderGeometry, roof, 0, height + rise + 0.035,
    0, 0.065, depth + overhang * 2, 0.065);
  ridge.rotation.x = Math.PI / 2;
}

function window(parent, x, y, z, width, height, { rotation = 0, shutters = false, lit = true } = {}) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = rotation;
  parent.add(group);
  box(group, timber, 0, 0, 0, width + 0.07, height + 0.07, 0.045);
  box(group, lit ? warmGlass : darkGlass, 0, 0, 0.027, width, height, 0.012);
  for (const side of [-1, 1]) {
    box(group, cream, side * (width / 2 + 0.012), 0, 0.04, 0.026, height + 0.055, 0.035);
    box(group, cream, 0, side * (height / 2 + 0.012), 0.04, width + 0.05, 0.026, 0.035);
    if (shutters) {
      box(group, green, side * (width * 0.74 + 0.045), 0, 0, width * 0.38, height + 0.04, 0.04);
      for (let i = -2; i <= 2; i++) {
        box(group, timber, side * (width * 0.74 + 0.045), i * height / 6, 0.027,
          width * 0.32, 0.013, 0.012);
      }
    }
  }
  box(group, cream, 0, 0, 0.045, 0.024, height, 0.025);
  box(group, cream, 0, 0, 0.045, width, 0.024, 0.025);
  box(group, stone, 0, -height / 2 - 0.045, 0.025, width + 0.12, 0.045, 0.13);
}

function flowerBox(parent, x, y, z, width = 0.35) {
  box(parent, terracotta, x, y, z, width, 0.09, 0.13);
  for (let i = 0; i < 4; i++) {
    const offset = (i / 3 - 0.5) * width * 0.8;
    mesh(parent, leafGeometry, foliage, x + offset, y + 0.075, z, 0.07, 0.07, 0.075);
    mesh(parent, leafGeometry, material(i % 2 ? 0xe5c75b : 0xc97471),
      x + offset + 0.015, y + 0.125, z + 0.02, 0.033, 0.03, 0.033);
  }
}

function sign(parent, text, width, height, x, y, z, color = '#f3e4c7', background = '#35594f') {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = Math.max(128, Math.round(768 * height / width));
  const context = canvas.getContext('2d');
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `600 ${Math.min(canvas.height * 0.57, canvas.width / (text.length * 0.68))}px Georgia, serif`;
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  box(parent, timber, x, y, z, width + 0.045, height + 0.045, 0.055);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(width, height),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 }));
  face.position.set(x, y, z + 0.029);
  parent.add(face);
}

function door(parent, x, z, height = 0.62, width = 0.28) {
  box(parent, cream, x, height / 2 + 0.04, z, width + 0.075, height + 0.07, 0.06);
  box(parent, green, x, height / 2 + 0.04, z + 0.035, width, height, 0.025);
  box(parent, goldenGlass, x, height * 0.73 + 0.04, z + 0.052, width * 0.7, height * 0.28, 0.015);
  box(parent, timber, x, height * 0.26 + 0.04, z + 0.052, width * 0.66, height * 0.3, 0.015);
  mesh(parent, leafGeometry, material(0xc5a75d, 0.35), x + width * 0.32,
    height * 0.45, z + 0.076, 0.022, 0.022, 0.022);
  box(parent, stone, x, 0.035, z + 0.07, width + 0.17, 0.07, 0.22);
}

export function createHouse({ width = 1.4, depth = 1.5, height = 1.35,
  color = 0xf2d8ae, roofColor = 0x8f5141, style = 'home', label = '' } = {}) {
  const group = new THREE.Group();
  const wall = material(color);
  box(group, stone, 0, 0.055, 0, width + 0.045, 0.11, depth + 0.045);
  box(group, wall, 0, height / 2, 0, width, height, depth);
  box(group, cream, 0, height * 0.53, 0, width + 0.045, 0.045, depth + 0.045);
  for (const x of [-width / 2, width / 2]) {
    box(group, cream, x, height / 2, depth / 2 + 0.014, 0.065, height, 0.045);
  }
  const rise = Math.min(width * 0.4, 0.65);
  gableRoof(group, width, depth, height, rise, wall, roofColor);
  box(group, material(0xb78266), -width * 0.23, height + rise * 0.85, -depth * 0.2,
    0.18, 0.58, 0.2);
  box(group, stone, -width * 0.23, height + rise * 0.85 + 0.3, -depth * 0.2,
    0.24, 0.07, 0.26);
  box(group, material(0x4c4338), -width * 0.23, height + rise * 0.85 + 0.34,
    -depth * 0.2, 0.115, 0.008, 0.135);
  const front = depth / 2 + 0.023;
  const windowWidth = Math.min(0.26, width * 0.2);
  const windowHeight = height * 0.24;
  for (const x of [-width * 0.25, width * 0.25]) {
    window(group, x, height * 0.77, front, windowWidth, windowHeight, { shutters: true });
    window(group, x, height * 0.7, -front, windowWidth, windowHeight, { rotation: Math.PI, lit: x < 0 });
  }
  for (const side of [-1, 1]) {
    for (const z of [-depth * 0.23, depth * 0.23]) {
      window(group, side * (width / 2 + 0.023), height * 0.73, z,
        windowWidth, windowHeight, { rotation: side * Math.PI / 2, lit: z > 0 });
    }
    window(group, side * (width / 2 + 0.023), height * 0.29, -depth * 0.18,
      windowWidth, windowHeight, { rotation: side * Math.PI / 2, lit: false });
  }
  if (style === 'home') {
    door(group, -width * 0.2, front, height * 0.43, width * 0.2);
    window(group, width * 0.27, height * 0.3, front, windowWidth, windowHeight);
    flowerBox(group, width * 0.27, height * 0.3 - windowHeight / 2 - 0.09, front + 0.075);
    flowerBox(group, -width * 0.25, height * 0.77 - windowHeight / 2 - 0.1, front + 0.075);
  } else {
    door(group, -width * 0.3, front, height * 0.44, width * 0.19);
    window(group, width * 0.18, height * 0.29, front, width * 0.42, height * 0.33);
    const canopyWidth = width * 0.9;
    const canopyMat = material(style === 'bakery' ? 0xb86e4f : 0x54776b);
    for (let i = 0; i < 9; i++) {
      const x = -canopyWidth / 2 + canopyWidth * (i + 0.5) / 9;
      const stripe = box(group, i % 2 ? cream : canopyMat, x, height * 0.55,
        front + 0.16, canopyWidth / 9, 0.035, 0.38);
      stripe.rotation.x = 0.16;
      box(group, i % 2 ? cream : canopyMat, x, height * 0.55 - 0.075,
        front + 0.345, canopyWidth / 9, 0.105, 0.025);
    }
    sign(group, label || (style === 'bakery' ? 'BAKERY' : 'CAFÉ'),
      width * 0.76, 0.14, 0, height * 0.61, front + 0.015);
    flowerBox(group, width * 0.45, 0.1, front + 0.17, 0.19);
  }
  return group;
}

function clockFace(parent, x, y, z, radius = 0.13) {
  const bezel = mesh(parent, cylinderGeometry, timber, x, y, z, radius + 0.024, 0.05, radius + 0.024);
  bezel.rotation.x = Math.PI / 2;
  const face = mesh(parent, cylinderGeometry, cream, x, y, z + 0.03, radius, 0.015, radius);
  face.rotation.x = Math.PI / 2;
  for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    const tick = box(parent, timber, x + Math.sin(angle) * radius * 0.8,
      y + Math.cos(angle) * radius * 0.8, z + 0.042, 0.009, 0.018, 0.008);
    tick.rotation.z = -angle;
  }
  const longHand = box(parent, timber, x + radius * 0.25, y, z + 0.05, radius * 0.58, 0.013, 0.009);
  longHand.rotation.z = 0.08;
  const shortHand = box(parent, timber, x - radius * 0.12, y + radius * 0.15,
    z + 0.052, 0.014, radius * 0.45, 0.01);
  shortHand.rotation.z = 0.65;
}

function bench(parent, x, z) {
  for (const side of [-1, 1]) {
    box(parent, timber, x + side * 0.27, 0.12, z, 0.045, 0.24, 0.26);
    box(parent, timber, x + side * 0.27, 0.28, z - 0.105, 0.045, 0.38, 0.04);
  }
  for (let i = 0; i < 3; i++) {
    box(parent, material(0x99734c), x, 0.23, z + (i - 1) * 0.08, 0.68, 0.04, 0.065);
    box(parent, material(0x99734c), x, 0.31 + i * 0.065, z - 0.11, 0.68, 0.045, 0.035);
  }
}

export function createStation() {
  const group = new THREE.Group();
  const wall = material(0xe7d4aa);
  box(group, stone, 0, 0.06, 0, 3.48, 0.12, 1.03);
  box(group, wall, 0, 0.59, 0, 3.4, 1.18, 1);
  for (const y of [0.16, 0.98]) box(group, cream, 0, y, 0, 3.45, 0.07, 1.04);
  for (const x of [-1.66, -0.4, 0.4, 1.66]) {
    box(group, cream, x, 0.59, 0.524, 0.075, 1.18, 0.04);
  }
  gableRoof(group, 3.4, 1, 1.18, 0.48, wall, 0x43655c, 0.12);
  door(group, 0, 0.54, 0.78, 0.36);
  window(group, -0.96, 0.65, 0.54, 0.54, 0.53);
  window(group, 0.96, 0.65, 0.54, 0.54, 0.53);
  window(group, -0.96, 0.65, -0.54, 0.54, 0.53, { rotation: Math.PI });
  window(group, 0.96, 0.65, -0.54, 0.54, 0.53, { rotation: Math.PI });
  for (const side of [-1, 1]) {
    window(group, side * 1.72, 0.65, 0, 0.34, 0.53, { rotation: side * Math.PI / 2 });
  }
  sign(group, 'WILLOWBROOK', 1.25, 0.17, 0, 1.23, 0.55);
  clockFace(group, 0, 1.5, 0.54, 0.11);
  const canopy = box(group, material(0x36574e), 0, 1.075, 0.76, 3.68, 0.065, 0.6);
  canopy.rotation.x = 0.08;
  box(group, cream, 0, 1.014, 1.06, 3.69, 0.075, 0.045);
  for (const x of [-1.57, 1.57]) {
    box(group, timber, x, 0.53, 1.02, 0.065, 1.06, 0.065);
    const brace = box(group, timber, x, 0.92, 0.88, 0.045, 0.38, 0.045);
    brace.rotation.x = -0.72;
    box(group, stone, x, 0.05, 1.02, 0.12, 0.1, 0.12);
  }
  bench(group, -0.92, 0.84);
  flowerBox(group, 1.38, 0.12, 0.79, 0.22);
  box(group, material(0x997150), 0.83, 0.13, 0.86, 0.25, 0.25, 0.22);
  box(group, timber, 0.83, 0.23, 0.86, 0.27, 0.025, 0.23);
  box(group, material(0xa58a62), 1.07, 0.085, 0.9, 0.18, 0.17, 0.19);
  return group;
}

function archShape(width, height) {
  const shape = new THREE.Shape();
  const radius = width / 2;
  shape.moveTo(-radius, -height / 2);
  shape.lineTo(radius, -height / 2);
  shape.lineTo(radius, height / 2 - radius);
  shape.absarc(0, height / 2 - radius, radius, 0, Math.PI, false);
  shape.lineTo(-radius, -height / 2);
  return shape;
}

function archedWindow(parent, x, y, z, width, height, rotation = 0) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = rotation;
  parent.add(group);
  const surround = new THREE.Mesh(new THREE.ShapeGeometry(archShape(width + 0.09, height + 0.09)), cream);
  group.add(surround);
  const pane = new THREE.Mesh(new THREE.ShapeGeometry(archShape(width, height)), goldenGlass);
  pane.position.z = 0.012;
  group.add(pane);
  box(group, stone, 0, -0.025, 0.025, 0.027, height - 0.04, 0.035);
  box(group, stone, 0, -height * 0.1, 0.025, width, 0.025, 0.035);
}

export function createChurch() {
  const group = new THREE.Group();
  const wall = material(0xe3d9bd);
  box(group, stone, 0, 0.06, -0.08, 1.45, 0.12, 1.76);
  box(group, wall, 0, 0.75, -0.08, 1.38, 1.5, 1.64);
  const roofGroup = new THREE.Group();
  roofGroup.position.z = -0.08;
  group.add(roofGroup);
  gableRoof(roofGroup, 1.38, 1.64, 1.5, 0.54, wall, 0x626b67, 0.06);
  for (const side of [-1, 1]) {
    for (const z of [-0.55, 0.14]) {
      archedWindow(group, side * 0.701, 0.91, z, 0.24, 0.66, side * Math.PI / 2);
    }
    for (const z of [-0.84, -0.17, 0.63]) {
      box(group, stone, side * 0.7, 0.52, z, 0.09, 1.04, 0.09);
    }
  }
  archedWindow(group, 0, 1.0, -0.911, 0.42, 0.76, Math.PI);
  box(group, wall, 0, 1.245, 0.61, 0.64, 2.49, 0.64);
  box(group, stone, 0, 0.08, 0.61, 0.71, 0.16, 0.7);
  for (const y of [1.48, 2.03, 2.44]) {
    box(group, cream, 0, y, 0.61, 0.71, 0.065, 0.7);
  }
  for (const side of [-1, 1]) {
    box(group, stone, side * 0.295, 1.22, 0.941, 0.045, 2.44, 0.025);
    archedWindow(group, side * 0.326, 1.73, 0.61, 0.22, 0.39, side * Math.PI / 2);
  }
  door(group, 0, 0.95, 0.7, 0.34);
  archedWindow(group, 0, 1.74, 0.945, 0.24, 0.4);
  clockFace(group, 0, 2.23, 0.95, 0.115);
  const spire = mesh(group, new THREE.ConeGeometry(0.51, 0.79, 4), material(0x47635b),
    0, 2.885, 0.61);
  spire.rotation.y = Math.PI / 4;
  box(group, material(0x958356, 0.45), 0, 3.33, 0.61, 0.018, 0.14, 0.018);
  box(group, material(0x958356, 0.45), 0, 3.355, 0.61, 0.09, 0.017, 0.018);
  return group;
}
