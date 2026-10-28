// Geometry and prop builders. One shared unit box is scaled per mesh, so the
// whole diorama reuses a handful of geometries and the palette's materials.

import * as THREE from "three";
import { palette } from "./materials.js";
import { markNoBatch } from "./batch.js";
import { graffiti, bulletHoles, policeSign } from "./textures.js";

// Yaw that maps a group's local +X onto the world direction (dx, dz). Rotation
// about Y sends local +X to (cos, 0, -sin), so the dz term must be negated.
export const yawTo = (dx, dz) => Math.atan2(-dz, dx);

export const UNIT = new THREE.BoxGeometry(0.5, 0.5, 0.5); // 0.5 m voxel, scaled per use
export const PLANE = new THREE.PlaneGeometry(1, 1);
export const CYL = new THREE.CylinderGeometry(0.5, 0.5, 1, 14);
export const CONE = new THREE.ConeGeometry(0.5, 1, 12);
export const SPHERE = new THREE.SphereGeometry(0.5, 10, 8);
export const TORUS = new THREE.TorusGeometry(0.36, 0.13, 8, 16);

export function box(w, h, d, material, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(UNIT, material);
  m.scale.set(w, h, d);
  m.position.set(x, y + h / 2, z);
  m.castShadow = true;
  m.receiveShadow = true;
  if (parent) parent.add(m);
  return m;
}

export function shape(geo, material, scale, pos, parent) {
  const m = new THREE.Mesh(geo, material);
  m.scale.set(scale[0], scale[1], scale[2]);
  m.position.set(pos[0], pos[1], pos[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  if (parent) parent.add(m);
  return m;
}

// Decal quad laid on a wall or crate face for spray paint and bullet marks.
export function decal(texture, w, h, position, rotation, parent, opacity = 1) {
  const mat = new THREE.MeshBasicMaterial({
    map: texture, transparent: true, opacity, depthWrite: false, polygonOffset: true,
    polygonOffsetFactor: -2, polygonOffsetUnits: -2, toneMapped: false,
  });
  const m = new THREE.Mesh(PLANE, mat);
  m.scale.set(w, h, 1);
  m.position.copy(position);
  m.rotation.copy(rotation);
  if (parent) parent.add(m);
  return m;
}

// ---------------------------------------------------------------- tactical cover

export const crateStack = (parent, x, z, levels = 2, material = palette.wood()) => {
  const s = 1.5;
  for (let i = 0; i < levels; i++) {
    const off = i % 2 === 0 ? 0 : 0.18;
    box(s, s, s, material, x + off, i * s, z, parent);
  }
};

export const barrelBlue = (parent, x, z, y = 0) => {
  const m = shape(CYL, palette.metalPaint(0x3f6fb5), [0.9, 1.4, 0.9], [x, y + 0.7, z], parent);
  shape(TORUS, palette.metalRust(), [0.92, 0.92, 0.92], [x, y + 0.42, z], parent).rotation.x = Math.PI / 2;
  return m;
};

export const barrelQuad = (parent, x, z) => {
  [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([dx, dz]) =>
    barrelBlue(parent, x + dx, z + dz));
};

export const cardboardPile = (parent, x, z, n = 4) => {
  const mat = palette.cardboard();
  for (let i = 0; i < n; i++) {
    const w = 0.7 + (i % 3) * 0.24;
    const m = box(w, w * 0.8, w * 0.9, mat, x + (i % 2 ? 0.36 : -0.2), Math.floor(i / 2) * 0.72, z + (i % 3) * 0.22, parent);
    m.rotation.y = (i * 0.4) % 1.2 - 0.4;
  }
};

export const roadBarrier = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const base = box(2.1, 0.16, 0.9, palette.plastic(0x2f3339), 0, 0, 0, g);
  base.rotation.y = 0;
  const body = box(1.9, 0.62, 0.62, palette.plastic(0xdcd6c8), 0, 0.16, 0, g);
  box(1.9, 0.16, 0.64, palette.plastic(0xc4562f), 0, 0.4, 0, g);
  box(0.18, 0.5, 0.5, palette.plastic(0x2f3339), -0.86, 0.0, -0.02, g);
  box(0.18, 0.5, 0.5, palette.plastic(0x2f3339), 0.86, 0.0, -0.02, g);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const jerseyBlock = (parent, x, z, rotY = 0, w = 2.4) => {
  const m = box(w, 1.0, 0.7, palette.concrete(), x, 0, z, parent);
  m.rotation.y = rotY;
  box(w * 0.96, 0.12, 0.74, palette.concreteDark(), x, 1.0, z, parent).rotation.y = rotY;
  return m;
};

export const tire = (parent, x, z, rotZ = Math.PI / 2) => {
  const m = shape(TORUS, palette.rubber(), [1.5, 1.5, 1.1], [x, 0.28, z], parent);
  m.rotation.x = Math.PI / 2;
  return m;
};

export const pallet = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const mat = palette.wood();
  for (let i = -1; i <= 1; i++) box(1.6, 0.1, 0.16, mat, 0, 0.14, i * 0.34, g);
  for (let i = -1; i <= 1; i++) box(0.16, 0.14, 1.1, mat, i * 0.62, 0, 0, g);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const sandBags = (parent, x, z, rows = 3) => {
  const mat = palette.plastic(0x8d8a6c);
  for (let r = 0; r < rows; r++) {
    const count = rows - r;
    for (let i = 0; i < count; i++) {
      const m = box(0.62, 0.26, 0.44, mat, x + (i - (count - 1) / 2) * 0.5, r * 0.26, z, parent);
      m.rotation.y = 0.1 * ((i + r) % 3);
    }
  }
};

// ---------------------------------------------------------------- containers/walls

export const shippingContainer = (parent, x, z, y, rotY = 0, color = 0x3f7fae, len = 6.1) => {
  const g = new THREE.Group();
  const mat = palette.metalPaint(color);
  const body = box(len, 2.6, 2.44, mat, 0, 0, 0, g);
  // Corrugation ribs on both long faces.
  for (let i = -len / 2 + 0.35; i < len / 2 - 0.2; i += 0.42) {
    box(0.12, 2.3, 0.1, mat, i, 0.05, 1.24, g);
    box(0.12, 2.3, 0.1, mat, i, 0.05, -1.24, g);
  }
  box(len * 0.5, 0.14, 2.5, palette.metalRust(), 0, 2.55, 0, g);
  box(len * 0.5, 0.14, 2.5, palette.metalRust(), 0, -0.05, 0, g);
  g.position.set(x, y + 1.3, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const razorFence = (parent, x1, z1, x2, z2, height = 2.0, segments = 6) => {
  const g = new THREE.Group();
  const post = palette.metalRust();
  const mesh = new THREE.MeshBasicMaterial({ color: 0x6b7278, wireframe: true, transparent: true, opacity: 0.55 });
  const dir = new THREE.Vector3(x2 - x1, 0, z2 - z1);
  const length = dir.length();
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(length, height, segments * 3, 4), mesh);
  panel.position.set(0, height / 2, 0);
  g.add(panel);
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments - 0.5) * length;
    box(0.12, height, 0.12, post, t, 0, 0, g);
  }
  // Barbed crown.
  for (let i = 0; i < 3; i++) {
    const w = shape(CYL, post, [0.04, length, 0.04], [0, height + 0.12 + i * 0.16, 0], g);
    w.rotation.z = Math.PI / 2;
  }
  g.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
  g.rotation.y = yawTo(dir.x, dir.z);
  parent.add(g);
  return g;
};

export const concreteWall = (parent, x, z, w, h, d, rotY = 0, material = palette.concrete()) => {
  const m = box(w, h, d, material, x, 0, z, parent);
  m.rotation.y = rotY;
  if (h > 2.2) box(w * 0.99, 0.16, d * 1.08, palette.concreteDark(), x, h, z, parent).rotation.y = rotY;
  return m;
};

export const stairs = (parent, x, z, steps, rise = 0.32, run = 0.42, width = 1.6, rotY = 0, material = palette.concrete()) => {
  const g = new THREE.Group();
  for (let i = 0; i < steps; i++) {
    box(width, rise * (i + 1), run, material, 0, 0, -i * run, g);
  }
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const ladder = (parent, x, y, z, height = 3, rotY = 0, lean = 0.16) => {
  const g = new THREE.Group();
  const mat = palette.metalRust();
  box(0.09, height, 0.09, mat, -0.26, 0, 0, g);
  box(0.09, height, 0.09, mat, 0.26, 0, 0, g);
  for (let i = 0.3; i < height; i += 0.42) box(0.62, 0.07, 0.07, mat, 0, i, 0, g);
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  g.rotation.x = -lean;
  parent.add(g);
  return g;
};

// ---------------------------------------------------------------- vehicles

export const boxTruck = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const dark = palette.plastic(0x3a3f47);
  const body = palette.metalPaint(0x8c9299);
  box(2.3, 0.4, 5.4, dark, 0, 0.35, 0, g);                       // chassis
  [[-0.82, -1.8], [0.82, -1.8], [-0.82, 1.6], [0.82, 1.6]].forEach(([dx, dz]) => {
    const w = shape(TORUS, palette.rubber(), [1.1, 1.1, 0.8], [dx, 0.62, dz], g);
    w.rotation.x = Math.PI / 2;
  });
  box(2.2, 1.5, 1.7, body, 0, 0.75, 1.75, g);                     // cab
  box(2.1, 0.55, 0.12, palette.glass(0x9fb8c8), 0, 1.6, 2.55, g); // windscreen
  box(2.5, 2.3, 3.6, palette.plastic(0xb8bdc4), 0, 0.75, -1.1, g);// cargo box
  box(2.52, 0.12, 3.62, palette.metalRust(), 0, 3.05, -1.1, g);
  box(0.14, 2.1, 0.14, palette.metalRust(), 1.2, 0.8, -2.8, g);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  decal(graffiti(2), 1.5, 0.9, new THREE.Vector3(x + 1.26, 2.0, z - 1.1), new THREE.Euler(0, Math.PI / 2, 0), parent);
  return g;
};

export const policeVan = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const white = palette.plastic(0xdfe4ea);
  box(2.1, 2.0, 4.4, white, 0, 0.55, 0, g);
  box(2.12, 0.5, 4.42, palette.plastic(0x24303f), 0, 1.15, 0, g);
  box(2.0, 1.0, 1.2, white, 0, 2.55, 0.9, g);
  box(1.9, 0.7, 0.1, palette.glass(0xa8c4d8), 0, 2.7, 1.5, g);
  [[-0.75, -1.4], [0.75, -1.4], [-0.75, 1.4], [0.75, 1.4]].forEach(([dx, dz]) => {
    const w = shape(TORUS, palette.rubber(), [1.0, 1.0, 0.7], [dx, 0.55, dz], g);
    w.rotation.x = Math.PI / 2;
  });
  box(1.4, 0.18, 0.5, palette.plastic(0x2b3038), 0, 3.1, 0.6, g);
  const lightBar = new THREE.Group();
  const red = palette.emissive(0xff3b3b);
  const blue = palette.emissive(0x3f7bff);
  box(0.62, 0.26, 0.42, red, -0.34, 3.22, 0.6, lightBar);
  box(0.62, 0.26, 0.42, blue, 0.34, 3.22, 0.6, lightBar);
  markNoBatch(lightBar);
  g.add(lightBar);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  g.userData.lightBar = lightBar;
  return g;
};

// ---------------------------------------------------------------- interior props

export const shelf = (parent, x, z, levels = 5, rotY = 0, h = 3.2) => {
  const g = new THREE.Group();
  const mat = palette.metalRust();
  const w = 2.6;
  const d = 0.8;
  [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => box(0.12, h, 0.12, mat, sx * w / 2, 0, sz * d / 2, g)));
  for (let i = 0; i < levels; i++) {
    const y = (i / (levels - 1)) * (h - 0.3);
    box(w, 0.1, d, mat, 0, y, 0, g);
    if (i % 2 === 0) box(w * 0.7, 0.5, d * 0.7, palette.cardboard(), (i - 1) * 0.4, y + 0.1, 0, g);
    else if (i < levels - 1) box(w * 0.5, 0.42, d * 0.6, palette.plastic(0x6a7078), -0.4, y + 0.1, 0, g);
  }
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const forklift = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const yellow = palette.plastic(0xd9a520);
  box(1.3, 0.7, 1.8, yellow, 0, 0.45, 0.2, g);
  box(1.2, 1.6, 0.12, yellow, 0, 0.7, -0.9, g);
  box(0.1, 1.7, 0.1, palette.plastic(0x2b2f36), -0.5, 0.7, -0.9, g);
  box(0.1, 1.7, 0.1, palette.plastic(0x2b2f36), 0.5, 0.7, -0.9, g);
  box(1.2, 0.09, 0.5, palette.metalRust(), 0, 0.12, -1.25, g);
  [-1, 1].forEach((s) => {
    const w = shape(TORUS, palette.rubber(), [0.72, 0.72, 0.5], [s * 0.62, 0.36, 0.55], g);
    w.rotation.x = Math.PI / 2;
  });
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const desk = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const mat = palette.wood();
  box(1.5, 0.09, 0.8, mat, 0, 0.72, 0, g);
  [[-0.65, -0.3], [0.65, -0.3], [-0.65, 0.3], [0.65, 0.3]].forEach(([dx, dz]) => box(0.09, 0.72, 0.09, mat, dx, 0, dz, g));
  box(0.5, 0.22, 0.36, palette.plastic(0x2f3339), -0.35, 0.83, 0, g);   // radio
  shape(CYL, palette.plastic(0xd8d3c6), [0.12, 0.16, 0.12], [0.3, 0.85, 0.1], g); // coffee can
  box(0.42, 0.02, 0.3, palette.plastic(0xe8e4da), 0.45, 0.8, -0.15, g);  // newspaper
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const chair = (parent, x, z, rotY = 0, tipped = false) => {
  const g = new THREE.Group();
  const mat = palette.plastic(0x3a4048);
  box(0.5, 0.08, 0.5, mat, 0, 0.44, 0, g);
  box(0.5, 0.55, 0.08, mat, 0, 0.48, -0.24, g);
  [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(([dx, dz]) => box(0.07, 0.44, 0.07, mat, dx, 0, dz, g));
  g.position.set(x, tipped ? 0.28 : 0, z);
  g.rotation.set(tipped ? 1.4 : 0, rotY, tipped ? 0.3 : 0);
  parent.add(g);
  return g;
};

export const locker = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const mat = palette.metalPaint(0x5c6a74);
  box(1.0, 2.0, 0.5, mat, 0, 0, 0, g);
  box(0.06, 1.9, 0.06, palette.metalRust(), 0, 0.06, 0.26, g);
  box(0.44, 0.1, 0.06, palette.metalRust(), -0.24, 1.2, 0.27, g);
  box(0.44, 0.1, 0.06, palette.metalRust(), 0.24, 1.2, 0.27, g);
  g.position.set(x, 1.0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const trashBin = (parent, x, z, withLid = true) => {
  const g = new THREE.Group();
  const mat = palette.metalPaint(0x4e5a52);
  shape(CYL, mat, [1.0, 1.5, 1.0], [x, 0.75, z], g);
  if (withLid) shape(CYL, palette.metalRust(), [1.06, 0.12, 1.06], [x, 1.55, z], g);
  const spill = box(0.5, 0.3, 0.4, palette.cardboard(), x + 0.5, 0, z + 0.3, g);
  spill.rotation.z = 0.4;
  parent.add(g);
  return g;
};

export const acUnit = (parent, x, z) => {
  const g = new THREE.Group();
  box(1.1, 0.8, 0.7, palette.metalPaint(0xa8b0b8), 0, 0, 0, g);
  const fan = shape(CYL, palette.metalRust(), [0.62, 0.06, 0.62], [0, 0.82, 0], g);
  g.position.set(x, 0.9, z);
  parent.add(g);
  g.userData.fan = fan;
  return g;
};

export const industrialVent = (parent, x, y, z) => {
  const g = new THREE.Group();
  box(0.7, 0.7, 0.5, palette.metalRust(), 0, 0, 0, g);
  for (let i = -2; i <= 2; i++) box(0.62, 0.06, 0.06, palette.plastic(0x2f3339), 0, i * 0.13, 0.26, g);
  g.position.set(x, y, z);
  parent.add(g);
  return g;
};

export const gutter = (parent, x, y, z, length, rotY = 0) => {
  const g = new THREE.Group();
  const mat = palette.metalRust();
  box(length, 0.16, 0.28, mat, 0, 0, 0, g);
  box(length, 0.2, 0.06, mat, 0, 0.06, 0.13, g);
  for (let i = -length / 2 + 0.4; i < length / 2; i += 1.4) box(0.1, 0.12, 0.34, mat, i, -0.02, 0, g);
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const utilityPole = (parent, x, z, height = 6) => {
  const g = new THREE.Group();
  const mat = palette.plastic(0x454a52);
  box(0.22, height, 0.22, mat, 0, 0, 0, g);
  box(1.5, 0.12, 0.12, mat, 0, height - 0.5, 0, g);
  box(1.1, 0.12, 0.12, mat, 0, height - 1.0, 0, g);
  for (const sx of [-0.65, 0.65]) shape(CONE, palette.plastic(0x6a727c), [0.14, 0.3, 0.14], [sx, height - 0.42, 0], g);
  g.position.set(x, 0, z);
  parent.add(g);
  return { group: g, top: new THREE.Vector3(x, height - 0.5, z), cross: new THREE.Vector3(x, height - 0.9, z) };
};

export const streetLamp = (parent, x, z, height = 5.4) => {
  const g = new THREE.Group();
  const mat = palette.plastic(0x3c414a);
  box(0.2, height, 0.2, mat, 0, 0, 0, g);
  box(0.16, 0.16, 1.3, mat, 0, height, 0.6, g);
  const head = box(0.9, 0.24, 0.5, palette.plastic(0x2b2f36), 0, height - 0.1, 1.2, g);
  const bulb = box(0.74, 0.1, 0.36, palette.emissive(0xffd9a0), 0, height - 0.26, 1.2, g);
  shape(CONE, palette.plastic(0x3c414a), [1.1, 0.4, 0.7], [0, height + 0.1, 1.2], g);
  g.position.set(x, 0, z);
  parent.add(g);
  return { group: g, head, bulb, lampPos: new THREE.Vector3(x, height - 0.3, z + 1.2) };
};

export const bicycleWreck = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const frame = palette.metalRust();
  [-1, 1].forEach((s) => {
    const w = shape(TORUS, palette.rubber(), [1.0, 1.0, 0.5], [s * 0.6, 0.32, 0], g);
    w.rotation.x = Math.PI / 2;
    w.rotation.z = s * 0.5;
  });
  box(1.0, 0.07, 0.07, frame, 0, 0.42, 0, g);
  box(0.07, 0.4, 0.07, frame, -0.5, 0.5, 0, g);
  box(0.36, 0.06, 0.06, frame, 0.42, 0.62, 0, g);
  g.position.set(x, 0.06, z);
  g.rotation.set(0.2, rotY, 1.15);
  parent.add(g);
  return g;
};

export const cafeTable = (parent, x, z, tipped = false) => {
  const g = new THREE.Group();
  const mat = palette.metalRust();
  shape(CYL, mat, [1.1, 0.07, 1.1], [0, 0.75, 0], g);
  box(0.09, 0.75, 0.09, mat, 0, 0.0, 0, g);
  if (tipped) g.rotation.set(0, 0.4, 1.4);
  g.position.set(x, tipped ? 0.55 : 0, z);
  parent.add(g);
  return g;
};

export const securityShield = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  box(1.0, 1.7, 0.08, palette.glass(0x9fb6c8), 0, 0.9, 0, g);
  box(1.0, 0.2, 0.1, palette.plastic(0x27313f), 0, 0.06, 0, g);
  box(0.28, 0.9, 0.06, palette.plastic(0x27313f), 0, 0.9, 0.08, g);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
};

export const gearBox = (parent, x, z, rotY = 0) => {
  const g = new THREE.Group();
  const m = box(1.1, 0.7, 0.8, palette.plastic(0x37474f), x, 0, z, g);
  m.rotation.y = rotY;
  const vest = box(0.7, 0.22, 0.5, palette.plastic(0x2b3a44), x, 0.7, z, g);
  vest.rotation.y = rotY + 0.3;
  shape(SPHERE, palette.plastic(0x3c4a54), [0.34, 0.3, 0.4], [x + 0.3, 0.86, z + 0.2], g);
  parent.add(g);
  return g;
};

// Wall markings grouped with the surfaces that need them.
export function markSite(parent, center, size, letter) {
  const tex = letter === "A" ? graffiti(0) : graffiti(1);
  const m = new THREE.Mesh(PLANE, new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false,
  }));
  m.scale.set(size, size, 1);
  m.rotation.x = -Math.PI / 2;
  m.position.set(center.x, 0.02, center.z);
  parent.add(m);
  return m;
}

export function scuffWalls(parent, spots) {
  for (const s of spots) {
    decal(bulletHoles(s.seed), s.w, s.h, s.pos, s.rot, parent, 0.85);
  }
}

export const policeCrest = (parent, w, h, pos, rot) => decal(policeSign(), w, h, pos, rot, parent, 0.9);
