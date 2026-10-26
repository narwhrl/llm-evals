import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { labelTexture } from "./materials.js";

export const wallZ = (x) => -1.55 - 0.55 * (1 - (x / 4) ** 2);

export function mesh(parent, geometry, material, x = 0, y = 0, z = 0) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(x, y, z);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

export function box(parent, material, size, position, rounded = 0) {
  const geometry = rounded
    ? new RoundedBoxGeometry(...size, 2, rounded)
    : new THREE.BoxGeometry(...size);
  return mesh(parent, geometry, material, ...position);
}

export function cylinder(parent, material, radius, height, position, rotation = [0, 0, 0], segments = 24, topRadius = radius) {
  const object = mesh(parent, new THREE.CylinderGeometry(topRadius, radius, height, segments), material, ...position);
  object.rotation.set(...rotation);
  return object;
}

export function sphere(parent, material, radius, position, scale = [1, 1, 1], segments = 16) {
  const object = mesh(parent, new THREE.SphereGeometry(radius, segments, Math.max(8, segments / 2)), material, ...position);
  object.scale.set(...scale);
  return object;
}

export function torus(parent, material, radius, tube, position, rotation = [0, 0, 0], segments = 64) {
  const object = mesh(parent, new THREE.TorusGeometry(radius, tube, 10, segments), material, ...position);
  object.rotation.set(...rotation);
  return object;
}

export function tube(parent, material, points, radius = 0.025, smooth = true) {
  const vectors = points.map((p) => new THREE.Vector3(...p));
  const curve = smooth ? new THREE.CatmullRomCurve3(vectors) : new THREE.CurvePath();
  if (!smooth) {
    for (let i = 1; i < vectors.length; i++) curve.add(new THREE.LineCurve3(vectors[i - 1], vectors[i]));
  }
  return mesh(parent, new THREE.TubeGeometry(curve, Math.max(16, points.length * 8), radius, 7, false), material);
}

export function rod(parent, material, start, end, radius = 0.025, segments = 10) {
  const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end);
  const object = cylinder(parent, material, radius, a.distanceTo(b), a.clone().add(b).multiplyScalar(0.5).toArray(), [0, 0, 0], segments);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize());
  return object;
}

export function decal(parent, texture, width, height, position, rotation = [0, 0, 0]) {
  const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 1, side: THREE.DoubleSide });
  const object = mesh(parent, new THREE.PlaneGeometry(width, height), material, ...position);
  object.rotation.set(...rotation);
  object.castShadow = false;
  return object;
}

export function label(parent, title, subtitle, width, position, color, rotation = [0, 0, 0]) {
  return decal(parent, labelTexture(title, subtitle, color), width, width * 0.375, position, rotation);
}

export function makeMaterials(textures) {
  const standard = (color, options = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0.06, ...options });
  return {
    wall: standard("#f0ead7", { map: textures.metal, side: THREE.DoubleSide }),
    ivory: standard("#e9e3cf", { map: textures.painted }),
    shell: standard("#5b727d", { map: textures.metal }),
    trim: standard("#98a7a5", { map: textures.metal }),
    dark: standard("#30464c", { map: textures.metal }),
    rubber: standard("#1c3038", { map: textures.cloth }),
    floor: standard("#91a1a0", { map: textures.floor }),
    worktop: standard("#b3b6a4", { map: textures.worktop }),
    fabric: standard("#9cc6b7", { map: textures.cloth }),
    orange: standard("#e7ad75", { map: textures.orangeCloth }),
    yellow: standard("#d8a353", { map: textures.painted }),
    white: standard("#e2dfca", { map: textures.painted }),
    pipe: standard("#879f9b", { map: textures.metal }),
    copper: standard("#b08561", { map: textures.metal }),
    blue: standard("#5a9aa8", { map: textures.painted }),
    red: standard("#bd624a", { map: textures.painted }),
    leaf: standard("#629365", { side: THREE.DoubleSide }),
    leafLight: standard("#97b36d", { side: THREE.DoubleSide }),
    glass: standard("#397b92", { emissive: "#153e5c", emissiveIntensity: 0.55, roughness: 0.28 }),
    light: standard("#fff2d4", { emissive: "#ffe2a2", emissiveIntensity: 2.4, toneMapped: false }),
    grow: standard("#e9a0d5", { emissive: "#ff70d0", emissiveIntensity: 2.1, toneMapped: false }),
    cyan: standard("#8be5de", { emissive: "#53e5db", emissiveIntensity: 1.3, toneMapped: false }),
    amber: standard("#efb96c", { emissive: "#ffae43", emissiveIntensity: 1.0, toneMapped: false }),
  };
}

function makeWall(materials) {
  const shape = new THREE.Shape();
  shape.moveTo(4, 0);
  for (let i = 1; i <= 64; i++) {
    const angle = (i / 64) * Math.PI;
    shape.lineTo(Math.cos(angle) * 4, Math.sin(angle) * 2.55);
  }
  shape.lineTo(4, 0);
  const holes = [
    { x: 1.35, y: 1.64, r: 1.025 },
    { x: -3.12, y: 1.46, r: 0.405 },
    { x: -1.35, y: 1.68, r: 0.405 },
  ];
  for (const hole of holes) {
    const path = new THREE.Path();
    path.absarc(hole.x, hole.y, hole.r, 0, Math.PI * 2, true);
    shape.holes.push(path);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.025, bevelThickness: 0.018, curveSegments: 64 });
  geometry.translate(0, 0, -0.14);
  const group = new THREE.Group();
  mesh(group, geometry, materials.wall, 0, 0, -2.1);
  for (const hole of holes) {
    torus(group, materials.trim, hole.r + 0.06, hole.r > 0.8 ? 0.105 : 0.05, [hole.x, hole.y, -2.072]);
    torus(group, materials.rubber, hole.r + 0.004, 0.026, [hole.x, hole.y, -2.053]);
    torus(group, materials.ivory, hole.r + (hole.r > 0.8 ? 0.175 : 0.09), hole.r > 0.8 ? 0.065 : 0.036, [hole.x, hole.y, -2.03]);
    const count = hole.r > 0.8 ? 24 : 12;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const radius = hole.r + (hole.r > 0.8 ? 0.174 : 0.09);
      cylinder(group, materials.dark, 0.018, 0.025, [hole.x + Math.cos(angle) * radius, hole.y + Math.sin(angle) * radius, -1.969], [Math.PI / 2, 0, 0], 6);
    }
  }
  return group;
}

function makeEndHatch(parent, materials, side) {
  const x = side * 4.03;
  const group = new THREE.Group();
  group.position.set(x, 0.08, -1.51);
  group.rotation.y = side * 0.12;
  group.scale.setScalar(0.49);
  parent.add(group);
  const cap = cylinder(group, materials.shell, 2.03, 0.2, [side * -0.12, 1.32, 0], [0, 0, Math.PI / 2], 64);
  cap.scale.z = 0.83;
  const disc = cylinder(group, materials.dark, 1.46, 0.11, [0, 1.43, 0], [0, 0, Math.PI / 2], 64);
  disc.scale.z = 1.08;
  const hatch = cylinder(group, materials.ivory, 1.32, 0.16, [side * 0.08, 1.43, 0], [0, 0, Math.PI / 2], 64);
  hatch.scale.z = 1.08;
  torus(group, materials.trim, 1.35, 0.055, [side * 0.18, 1.43, 0], [0, side * Math.PI / 2, 0]);
  torus(group, materials.rubber, 1.21, 0.019, [side * 0.177, 1.43, 0], [0, side * Math.PI / 2, 0]);
  cylinder(group, materials.dark, 0.37, 0.12, [side * 0.20, 1.69, 0], [0, 0, Math.PI / 2], 40);
  cylinder(group, materials.glass, 0.3, 0.125, [side * 0.22, 1.69, 0], [0, 0, Math.PI / 2], 40);
  torus(group, materials.trim, 0.335, 0.036, [side * 0.29, 1.69, 0], [0, side * Math.PI / 2, 0]);
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    cylinder(group, materials.dark, 0.035, 0.06, [side * 0.2, 1.43 + Math.cos(angle) * 1.15, Math.sin(angle) * 1.25], [0, 0, Math.PI / 2], 6);
  }
  box(group, materials.dark, [0.09, 0.12, 1.15], [side * 0.185, 0.97, 0], 0.025);
  box(group, materials.trim, [0.15, 0.12, 0.58], [side * 0.25, 0.98, 0], 0.02);
  rod(group, materials.dark, [side * 0.34, 0.89, -0.19], [side * 0.34, 1.08, -0.19], 0.035);
  rod(group, materials.dark, [side * 0.34, 0.89, 0.19], [side * 0.34, 1.08, 0.19], 0.035);
  for (const z of [-0.95, 0.95]) {
    box(group, materials.dark, [0.15, 0.23, 0.13], [side * 0.21, 1.44, z], 0.02);
  }
  label(group, side > 0 ? "04" : "03", "PRESSURE LOCK", 0.55, [side * 0.19, 2.25, 0], "#d8c494", [0, side * Math.PI / 2, 0]);
  label(group, "CAUTION", "KEEP CLEAR", 0.49, [side * 0.185, 0.56, 0], "#d5ac65", [0, side * Math.PI / 2, 0]);
  return group;
}

function wallLabel(parent, title, sub, x, y, width = 0.5, color) {
  return label(parent, title, sub, width, [x, y, wallZ(x) + 0.037], color, [0, -Math.atan(0.275 * x / 4), 0]);
}

export function createHabitat(materials) {
  const root = new THREE.Group();
  root.name = "Orbital habitat 04";
  const structural = new THREE.Group();
  root.add(structural);
  box(structural, materials.dark, [8.46, 0.26, 3.76], [0, -0.15, -0.27], 0.07);
  box(structural, materials.shell, [8.4, 0.11, 3.72], [0, -0.31, -0.27], 0.045);
  box(structural, materials.trim, [8.38, 0.035, 3.7], [0, -0.045, -0.27], 0.015);
  box(structural, materials.floor, [8.14, 0.06, 3.49], [0, 0.01, -0.28], 0.04);
  for (const z of [-1.83, 1.37]) box(structural, materials.ivory, [8.28, 0.075, 0.08], [0, 0.025, z], 0.018);
  for (const x of [-4.08, 4.08]) box(structural, materials.ivory, [0.08, 0.075, 3.25], [x, 0.025, -0.23], 0.018);
  for (let i = 0; i < 22; i++) {
    const x = -3.96 + i * 0.375;
    box(structural, i % 2 ? materials.dark : materials.yellow, [0.18, 0.027, 0.065], [x, 0.053, 1.24]);
    cylinder(structural, materials.dark, 0.018, 0.025, [x, 0.062, -1.79], [0, 0, 0], 6);
  }
  for (const x of [-3.55, -1.3, 1.3, 3.55]) {
    box(structural, materials.dark, [0.42, 0.12, 0.15], [x, -0.18, 1.625], 0.012);
    box(structural, materials.copper, [0.29, 0.035, 0.153], [x, -0.145, 1.627]);
  }
  label(structural, "ORBITAL HOME", "MODULE 04 / LOW EARTH ORBIT", 1.12, [0.05, -0.15, 1.616], "#bac3b7");
  label(structural, "400 KM", "27 580 KM/H", 0.64, [2.84, -0.145, 1.616], "#bac3b7");
  structural.add(makeWall(materials));

  for (const x of [-3.94, -2.38, 0.0, 2.69, 3.94]) {
    const r = Math.sqrt(1 - (x / 4) ** 2) * 2.55;
    const points = [];
    for (let i = 0; i <= 24; i++) {
      const angle = i / 24 * Math.PI;
      points.push([Math.cos(angle) * 0.075 + x, Math.sin(angle) * (r - 0.03), wallZ(x) + 0.09]);
    }
    tube(structural, materials.trim, points, 0.044, false);
  }
  const rimPoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = i / 64 * Math.PI;
    const x = Math.cos(angle) * 3.99;
    rimPoints.push([x, Math.sin(angle) * 2.55, wallZ(x) + 0.01]);
  }
  tube(structural, materials.ivory, rimPoints, 0.092, false);
  tube(structural, materials.dark, rimPoints.map(([x, y, z]) => [x, y + 0.07, z - 0.08]), 0.036, false);
  tube(structural, materials.shell, rimPoints.map(([x, y, z]) => [x, y - 0.065, z - 0.11]), 0.052, false);
  for (let i = 0; i < 58; i++) {
    const angle = (i + 0.5) / 58 * Math.PI;
    const x = Math.cos(angle) * 3.84, y = Math.sin(angle) * 2.40;
    cylinder(structural, materials.trim, 0.023, 0.036, [x, y, wallZ(x) + 0.025], [Math.PI / 2, 0, 0], 6);
  }

  makeEndHatch(structural, materials, -1);
  makeEndHatch(structural, materials, 1);

  for (let row = 0; row < 3; row++) {
    const y = 0.28 + row * 0.15;
    tube(structural, row === 1 ? materials.copper : materials.pipe, [[-3.96, y, -1.51], [-2.6, y, wallZ(-2.6) + 0.13], [0, y, -1.85], [2.6, y, wallZ(2.6) + 0.13], [3.96, y, -1.51]], 0.027);
  }
  for (const x of [-3.65, -2.2, -0.7, 0.8, 2.3, 3.65]) {
    box(structural, materials.dark, [0.085, 0.55, 0.065], [x, 0.42, wallZ(x) + 0.16], 0.012);
    for (const y of [0.24, 0.53]) cylinder(structural, materials.trim, 0.025, 0.07, [x, y, wallZ(x) + 0.204], [Math.PI / 2, 0, 0], 6);
  }
  tube(structural, materials.rubber, [[-3.65, 0.18, -1.42], [-3.4, 0.1, -0.95], [-2.2, 0.09, -0.83], [-1.1, 0.09, -1.35]], 0.04);
  tube(structural, materials.copper, [[3.7, 0.15, -1.44], [3.25, 0.10, -0.9], [2.55, 0.10, -0.6]], 0.032);

  for (const x of [-3.5, -2.1, 2.55, 3.55]) {
    const y = x < 0 ? 0.87 : 2.18;
    const z = wallZ(x) + 0.025;
    box(structural, materials.dark, [0.56, 0.35, 0.025], [x, y, z], 0.015);
    box(structural, materials.trim, [0.48, 0.27, 0.025], [x, y, z + 0.02], 0.008);
    for (let j = 0; j < 6; j++) box(structural, materials.dark, [0.37, 0.017, 0.02], [x, y - 0.095 + j * 0.038, z + 0.039]);
    cylinder(structural, materials.yellow, 0.025, 0.03, [x + 0.2, y + 0.11, z + 0.04], [Math.PI / 2, 0, 0], 8);
  }
  wallLabel(structural, "O₂", "LIFE SUPPORT", -2.23, 2.24, 0.4, "#bccdbd");
  wallLabel(structural, "CAUTION", "MOVING PARTS", 3.14, 1.3, 0.43, "#d3b473");
  wallLabel(structural, "04", "HABITAT", -0.38, 2.24, 0.45, "#cbd2bd");
  wallLabel(structural, "ECLSS", "RETURN AIR", 3.12, 0.93, 0.4, "#c4cbbb");
  wallLabel(structural, "28V", "DC BUS", -3.6, 2.0, 0.31, "#d4be85");

  const strip = new THREE.Group();
  root.add(strip);
  box(strip, materials.dark, [6.45, 0.05, 0.125], [0.1, 0.06, 0.63], 0.025);
  box(strip, materials.light, [6.29, 0.024, 0.065], [0.1, 0.092, 0.63], 0.012);
  for (const x of [-3.10, 3.30]) box(strip, materials.trim, [0.075, 0.055, 0.14], [x, 0.08, 0.63], 0.012);
  for (const x of [-1.75, 1.95]) {
    box(structural, materials.dark, [0.45, 0.055, 0.3], [x, 0.055, 0.16], 0.03);
    box(structural, materials.trim, [0.39, 0.02, 0.24], [x, 0.088, 0.16], 0.025);
    for (const dx of [-0.13, 0.13]) cylinder(structural, materials.dark, 0.022, 0.025, [x + dx, 0.105, 0.16], [0, 0, 0], 6);
  }
  return { root, strip };
}
