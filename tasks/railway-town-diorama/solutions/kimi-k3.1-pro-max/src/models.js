import * as THREE from 'three';

const materials = new Map();
const nightMaterials = [];
const lamps = [];

export function material(color, options = {}) {
  const key = `${color}-${JSON.stringify(options)}`;
  if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.82, ...options }));
  return materials.get(key);
}

export function glowMaterial(color = '#ffe3a0', strength = 0) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, emissive: color, emissiveIntensity: strength });
  nightMaterials.push(mat);
  return mat;
}

export function mesh(geometry, mat, parent, x = 0, y = 0, z = 0) {
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(x, y, z);
  object.castShadow = true;
  object.receiveShadow = true;
  if (parent) parent.add(object);
  return object;
}

export function box(parent, w, h, d, color, x = 0, y = 0, z = 0, options) {
  return mesh(new THREE.BoxGeometry(w, h, d), material(color, options), parent, x, y, z);
}

export function cylinder(parent, rt, rb, h, color, x, y, z, segments = 12) {
  return mesh(new THREE.CylinderGeometry(rt, rb, h, segments), material(color), parent, x, y, z);
}

export function sphere(parent, radius, color, x, y, z, width = 12, height = 8) {
  return mesh(new THREE.SphereGeometry(radius, width, height), material(color), parent, x, y, z);
}

export function beam(parent, a, b, width, color) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const object = box(parent, width, start.distanceTo(end), width, color);
  object.position.copy(start).add(end).multiplyScalar(0.5);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
  return object;
}

export function roundedRectShape(x, y, w, h, r) {
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

export function label(parent, text, width, height, x, y, z, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = Math.round(1024 * height / width);
  const context = canvas.getContext('2d');
  context.fillStyle = options.background || '#f3e8cc';
  context.fillRect(0, 0, canvas.width, canvas.height);
  if (options.border !== false) {
    context.strokeStyle = options.color || '#304a3f';
    context.lineWidth = 5;
    context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  }
  context.fillStyle = options.color || '#304a3f';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `${options.italic ? 'italic ' : ''}${options.weight || '600'} ${canvas.height * 0.54}px ${options.font || 'Georgia'}`;
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const object = mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8, side: THREE.DoubleSide }), parent, x, y, z);
  object.castShadow = false;
  return object;
}

function roof(parent, width, depth, wallTop, rise, color) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(0, rise);
  shape.lineTo(width / 2, 0);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geometry.translate(0, wallTop, -depth / 2);
  mesh(geometry, material(color, { roughness: 0.92 }), parent);
  beam(parent, [-width / 2 - 0.02, wallTop + 0.025, depth / 2 + 0.02], [0, wallTop + rise + 0.025, depth / 2 + 0.02], 0.075, color);
  beam(parent, [0, wallTop + rise + 0.025, depth / 2 + 0.02], [width / 2 + 0.02, wallTop + 0.025, depth / 2 + 0.02], 0.075, color);
  for (let z = -depth / 2 + 0.13; z < depth / 2; z += 0.28) {
    beam(parent, [-width / 2, wallTop + 0.035, z], [0, wallTop + rise + 0.035, z], 0.023, '#a89a83');
    beam(parent, [0, wallTop + rise + 0.035, z], [width / 2, wallTop + 0.035, z], 0.023, '#a89a83');
  }
}

function windowUnit(parent, x, y, z, w = 0.42, h = 0.6, glowing = false, side = 0) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = side;
  parent.add(group);
  box(group, w + 0.10, h + 0.10, 0.055, '#ede2c8', 0, 0, 0);
  box(group, w, h, 0.025, glowing ? '#f8d995' : '#53716b', 0, 0, 0.04, glowing ? {} : { roughness: 0.28, metalness: 0.12 });
  if (glowing) {
    const pane = group.children[group.children.length - 1];
    pane.material = glowMaterial('#ffdc8b');
  }
  box(group, 0.035, h, 0.035, '#f1e5c8', 0, 0, 0.065);
  box(group, w, 0.035, 0.035, '#f1e5c8', 0, 0, 0.065);
  box(group, w + 0.17, 0.075, 0.13, '#d1c2a2', 0, -h / 2 - 0.06, 0.035);
}

export function createHouse(parent, { x, z, rotation = 0, width = 2.1, depth = 1.9, height = 1.75, wall = '#d9c59d', roofColor = '#77574a', shop = false, name = '' }) {
  const group = new THREE.Group();
  group.position.set(x, 0.67, z);
  group.rotation.y = rotation;
  parent.add(group);
  box(group, width + 0.15, 0.15, depth + 0.15, '#b9ac91', 0, 0.075, 0);
  box(group, width, height, depth, wall, 0, height / 2 + 0.12, 0);
  box(group, width + 0.05, 0.11, depth + 0.05, '#eee0bf', 0, height + 0.10, 0);
  roof(group, width + 0.35, depth + 0.35, height + 0.15, width * 0.35, roofColor);
  box(group, 0.28, 0.65, 0.3, '#ab765b', -width * 0.28, height + 0.65, -depth * 0.22);
  box(group, 0.35, 0.08, 0.36, '#d7c5a3', -width * 0.28, height + 0.98, -depth * 0.22);
  box(group, 0.48, 0.95, 0.055, '#42584c', 0, 0.60, depth / 2 + 0.04);
  box(group, 0.26, 0.30, 0.02, '#dec68c', 0, 0.78, depth / 2 + 0.077);
  sphere(group, 0.028, '#b39250', 0.16, 0.55, depth / 2 + 0.09, 8, 6);
  box(group, 0.68, 0.12, 0.40, '#c7b697', 0, 0.06, depth / 2 + 0.16);
  windowUnit(group, -width * 0.32, 1.08, depth / 2 + 0.03, 0.42, 0.59, true);
  windowUnit(group, width * 0.32, 1.08, depth / 2 + 0.03, 0.42, 0.59, false);
  windowUnit(group, -width / 2 - 0.035, 1.10, -0.30, 0.43, 0.62, true, -Math.PI / 2);
  windowUnit(group, width / 2 + 0.035, 1.10, 0.30, 0.43, 0.62, false, Math.PI / 2);
  windowUnit(group, -0.43, 1.05, -depth / 2 - 0.04, 0.4, 0.58, false, Math.PI);
  windowUnit(group, 0.43, 1.05, -depth / 2 - 0.04, 0.4, 0.58, true, Math.PI);
  if (height > 1.9) {
    windowUnit(group, -width * 0.3, height - 0.3, depth / 2 + 0.03, 0.36, 0.42, false);
    windowUnit(group, width * 0.3, height - 0.3, depth / 2 + 0.03, 0.36, 0.42, true);
  }
  if (shop) {
    const awning = box(group, width * 0.8, 0.07, 0.60, '#e3d5ad', 0, 1.47, depth / 2 + 0.25);
    awning.rotation.x = 0.18;
    for (let index = -2; index <= 2; index++) box(group, 0.15, 0.015, 0.60, roofColor, index * width * 0.13, 1.51, depth / 2 + 0.25).rotation.x = 0.18;
    label(group, name, width * 0.85, 0.25, 0, 1.70, depth / 2 + 0.08, { background: '#f2e5c4', border: false });
    box(group, 0.56, 0.4, 0.35, '#ad8554', -width / 2 - 0.3, 0.23, depth / 2 + 0.15);
    for (let index = 0; index < 4; index++) sphere(group, 0.075, index % 2 ? '#b5633f' : '#9d9e54', -width / 2 - 0.44 + (index % 2) * 0.19, 0.48, depth / 2 + 0.07 + Math.floor(index / 2) * 0.17, 8, 6);
  }
  return group;
}

export function createStation(parent) {
  const group = new THREE.Group();
  group.position.set(-3.1, 0.73, 3.62);
  parent.add(group);
  box(group, 7.0, 0.14, 2.05, '#b7b09b', 0, 0.07, 0.10);
  box(group, 7.0, 0.035, 0.17, '#e7d8ad', 0, 0.16, 1.03);
  for (let x = -3.3; x < 3.4; x += 0.25) box(group, 0.13, 0.02, 0.17, '#8c897b', x, 0.18, 1.03);
  const building = new THREE.Group();
  building.position.z = -0.45;
  group.add(building);
  box(building, 3.6, 1.5, 1.45, '#b56f50', 0, 0.83, 0);
  box(building, 3.67, 0.14, 1.52, '#eee0ba', 0, 0.22, 0);
  box(building, 3.67, 0.10, 1.52, '#eee0ba', 0, 1.47, 0);
  for (let y = 0.4; y < 1.45; y += 0.17) box(building, 3.62, 0.018, 0.012, '#915a43', 0, y, 0.731);
  roof(building, 4.05, 1.90, 1.55, 0.82, '#465b51');
  box(building, 0.88, 1.18, 0.07, '#375046', 0, 0.76, 0.76);
  box(building, 0.56, 0.44, 0.025, '#e9c987', 0, 0.93, 0.81).material = glowMaterial('#ffd794');
  box(building, 0.06, 0.45, 0.04, '#e9dfc3', 0, 0.93, 0.84);
  windowUnit(building, -1.15, 0.91, 0.76, 0.60, 0.68, true);
  windowUnit(building, 1.15, 0.91, 0.76, 0.60, 0.68, true);
  label(building, 'ALDERBROOK', 2.2, 0.34, 0, 1.40, 0.81, { background: '#efe2bd' });
  box(building, 0.38, 0.67, 0.4, '#a5684b', -1.2, 1.9, -0.3);
  box(building, 0.48, 0.1, 0.5, '#d6c8a5', -1.2, 2.25, -0.3);
  const canopy = box(group, 5.7, 0.13, 1.15, '#405c50', 0, 1.52, 0.53);
  canopy.rotation.x = -0.10;
  for (const x of [-2.65, -0.95, 0.95, 2.65]) {
    cylinder(group, 0.035, 0.045, 1.42, '#3a5148', x, 0.82, 0.85, 8);
    beam(group, [x, 1.15, 0.85], [x, 1.46, 0.36], 0.035, '#3a5148');
  }
  for (const x of [-2.35, 2.35]) {
    box(group, 0.95, 0.07, 0.32, '#916847', x, 0.46, 0.18);
    box(group, 0.95, 0.28, 0.06, '#916847', x, 0.64, 0.01);
    for (const side of [-0.36, 0.36]) box(group, 0.055, 0.34, 0.26, '#374c42', x + side, 0.29, 0.18);
  }
  for (const x of [-3.18, 3.18]) {
    cylinder(group, 0.035, 0.055, 1.9, '#3a5047', x, 1.04, 0.85, 10);
    const lamp = sphere(group, 0.14, '#ffe1a1', x, 2.03, 0.85, 12, 8);
    lamp.material = glowMaterial('#ffe1a1');
    cylinder(group, 0.20, 0.14, 0.12, '#385047', x, 2.17, 0.85, 10);
  }
  const clockFace = cylinder(building, 0.22, 0.22, 0.035, '#eee3c7', 0, 1.98, 0.12, 24);
  clockFace.rotation.x = Math.PI / 2;
  beam(building, [0, 1.98, 0.15], [0, 2.10, 0.15], 0.018, '#344c43');
  beam(building, [0, 1.98, 0.16], [0.10, 1.98, 0.16], 0.018, '#344c43');
  return group;
}

export function createTree(parent, x, z, scale = 1, pine = false, tint = 0) {
  const group = new THREE.Group();
  group.position.set(x, 0.67, z);
  group.scale.setScalar(scale);
  group.rotation.y = x * 2.7 + z;
  parent.add(group);
  cylinder(group, 0.07, 0.12, pine ? 1.0 : 1.15, '#756044', 0, pine ? 0.5 : 0.57, 0, 7);
  const colors = ['#637a46', '#76894f', '#4f7046', '#899459'];
  const color = colors[tint % colors.length];
  if (pine) {
    for (let level = 0; level < 3; level++) {
      const cone = mesh(new THREE.ConeGeometry(0.65 - level * 0.13, 1.2, 9), material(color), group, 0, 1.10 + level * 0.44, 0);
      cone.rotation.y = level * 0.42;
    }
  } else {
    const canopy = mesh(new THREE.IcosahedronGeometry(0.70, 1), material(color, { flatShading: true }), group, 0, 1.48, 0);
    canopy.scale.set(1, 1.2, 0.92);
    const lobe = mesh(new THREE.IcosahedronGeometry(0.48, 1), material(colors[(tint + 1) % colors.length], { flatShading: true }), group, 0.39, 1.38, 0.12);
    lobe.scale.y = 1.1;
  }
  cylinder(group, 0.35, 0.38, 0.04, '#a79f79', 0, 0.01, 0, 16);
  return group;
}

export function createLamp(parent, x, z, rotation = 0) {
  const group = new THREE.Group();
  group.position.set(x, 0.69, z);
  group.rotation.y = rotation;
  parent.add(group);
  cylinder(group, 0.09, 0.13, 0.12, '#344b43', 0, 0.06, 0, 10);
  cylinder(group, 0.028, 0.04, 1.45, '#344b43', 0, 0.79, 0, 8);
  beam(group, [0, 1.48, 0], [0, 1.67, 0.22], 0.045, '#344b43');
  const bulb = sphere(group, 0.11, '#ffe0a0', 0, 1.59, 0.26, 10, 8);
  bulb.material = glowMaterial('#ffdc92');
  cylinder(group, 0.17, 0.1, 0.13, '#344b43', 0, 1.73, 0.26, 10);
  const light = new THREE.PointLight('#ffca78', 0, 3.3, 2);
  light.position.set(0, 1.59, 0.26);
  group.add(light);
  lamps.push(light);
  return group;
}

export function createPerson(parent, x, z, color = '#a8674f', rotation = 0) {
  const group = new THREE.Group();
  group.position.set(x, 0.78, z);
  group.rotation.y = rotation;
  parent.add(group);
  cylinder(group, 0.085, 0.11, 0.32, color, 0, 0.34, 0, 8);
  sphere(group, 0.095, '#d7ad80', 0, 0.60, 0, 10, 8);
  cylinder(group, 0.12, 0.12, 0.04, '#5a5746', 0, 0.69, 0, 10);
  for (const side of [-1, 1]) {
    beam(group, [side * 0.045, 0.21, 0], [side * 0.065, 0.03, 0.02], 0.055, '#414d46');
    beam(group, [side * 0.10, 0.46, 0], [side * 0.14, 0.24, 0.025], 0.045, color);
  }
  return group;
}

export function createCar(parent, x, z, color, rotation = 0) {
  const group = new THREE.Group();
  group.position.set(x, 0.73, z);
  group.rotation.y = rotation;
  parent.add(group);
  box(group, 0.60, 0.27, 1.15, color, 0, 0.24, 0);
  const cabin = box(group, 0.51, 0.29, 0.60, color, 0, 0.49, -0.03);
  box(group, 0.44, 0.20, 0.025, '#75928b', 0, 0.50, 0.28, { roughness: 0.25 });
  box(group, 0.44, 0.20, 0.025, '#75928b', 0, 0.50, -0.34, { roughness: 0.25 });
  for (const side of [-1, 1]) {
    box(group, 0.025, 0.19, 0.42, '#75928b', side * 0.26, 0.50, -0.03, { roughness: 0.25 });
    for (const end of [-1, 1]) {
      const wheel = cylinder(group, 0.13, 0.13, 0.075, '#343d38', side * 0.31, 0.14, end * 0.35, 12);
      wheel.rotation.z = Math.PI / 2;
    }
    box(group, 0.17, 0.09, 0.025, '#ead6a0', side * 0.19, 0.26, 0.585);
  }
  return group;
}

export function setNight(isNight) {
  for (const mat of nightMaterials) mat.emissiveIntensity = isNight ? 2.2 : 0.06;
  for (const light of lamps) light.intensity = isNight ? 2.0 : 0;
}
