// Map layout: a defusal map on one square concrete base, built strictly inside
// the footprint. Coordinates: x grows east, z grows south. T spawn sits north,
// CT spawn south, A site north-west, B site north-east, mid on the centre axis,
// the back-street alley on the west flank and the elevated catwalk on the east.

import * as THREE from "three";
import { palette } from "./materials.js";
import { markNoBatch } from "./batch.js";
import {
  yawTo, UNIT, PLANE, CYL, CONE, TORUS, box, shape, decal,
  crateStack, barrelBlue, barrelQuad, cardboardPile, roadBarrier, jerseyBlock, tire, pallet,
  sandBags, shippingContainer, razorFence, concreteWall, stairs, ladder, boxTruck, policeVan,
  shelf, forklift, desk, chair, locker, trashBin, acUnit, industrialVent, gutter, utilityPole,
  streetLamp, bicycleWreck, cafeTable, securityShield, gearBox, markSite, scuffWalls, policeCrest,
} from "./props.js";

export const BASE = 30;      // half-width of the concrete base
export const PLinth = 3.2;   // base slab thickness

const E = new THREE.Euler();
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// A closed, lit room whose openings are real holes: each requested hole is cut
// out of its wall by building the surrounding jamb, sill and lintel instead of
// deleting the whole face, so a "half-open" warehouse still reads as a building.
function room(parent, { x, z, w, d, h, wallMat, floorMat, roofMat, holes = {}, wallT = 0.34 }) {
  const g = new THREE.Group();
  const floor = box(w, 0.18, d, floorMat || palette.concreteDark(), 0, -0.09, 0, g);
  floor.receiveShadow = true;

  // One wall along an axis, with rectangular holes punched in it.
  function wall(face, span, thickness, along) {
    const spec = holes[face];
    const cuts = spec ? (Array.isArray(spec) ? spec : [spec]).map((c) => ({
      from: c.at - c.w / 2, to: c.at + c.w / 2, low: c.y || 0, high: (c.y || 0) + c.h,
    })).sort((a, b) => a.from - b.from) : [];
    const sign = face.startsWith("+") ? 1 : -1;
    const offset = sign * (along === "x" ? d / 2 - thickness / 2 : w / 2 - thickness / 2);

    let cursor = -span / 2;
    const solid = (from, to, low, high) => {
      if (to - from < 0.02 || high - low < 0.02) return;
      const len = to - from;
      const height = high - low;
      if (along === "x") box(len, height, thickness, wallMat, (from + to) / 2, low, offset, g);
      else box(thickness, height, len, wallMat, offset, low, (from + to) / 2, g);
    };
    for (const c of cuts) {
      solid(cursor, Math.max(cursor, c.from), 0, h);      // jamb before the hole
      solid(c.from, c.to, 0, c.low);                        // sill
      solid(c.from, c.to, c.high, h);                       // lintel
      cursor = Math.max(cursor, c.to);
    }
    solid(cursor, span / 2, 0, h);                          // jamb after the hole
  }

  wall("-z", w, wallT, "x");
  wall("+z", w, wallT, "x");
  wall("-x", d - wallT * 2, wallT, "z");
  wall("+x", d - wallT * 2, wallT, "z");

  const roof = box(w + 0.5, 0.34, d + 0.5, roofMat || wallMat, 0, h, 0, g);
  roof.castShadow = true;
  g.position.set(x, 0, z);
  g.userData = { h };
  parent.add(g);
  return g;
}

// Pierced window opening drawn as two wall slabs around a hole.
function windowHole(parent, wallGroup, pos, size, sillMat) {
  const { w, h } = size;
  const frame = box(w + 0.3, h + 0.3, 0.16, sillMat || palette.metalRust(), pos.x, pos.y, pos.z, wallGroup);
  frame.castShadow = false;
  const glass = box(w, h, 0.08, palette.glass(), pos.x, pos.y, pos.z + 0.02, wallGroup);
  glass.castShadow = false;
  for (let i = -1; i <= 1; i += 2) box(0.07, h, 0.12, palette.metalRust(), pos.x + (i * w) / 2, pos.y, pos.z + 0.06, wallGroup);
  return { frame, glass };
}

function shutterDoor(parent, x, y, z, w, h, openRatio, rotY = 0) {
  const g = new THREE.Group();
  const mat = palette.metalRust();
  const closedH = h * (1 - openRatio);
  for (let i = 0; i < Math.max(1, Math.round(closedH / 0.22)); i++) {
    box(w, 0.2, 0.1, i % 2 ? mat : palette.plastic(0x7d6a55), 0, i * 0.2, 0, g);
  }
  // Rolled-up coil above the opening.
  const coil = shape(CYL, mat, [0.5, w, 0.5], V(0, h - 0.25, 0.1), g);
  coil.rotation.z = Math.PI / 2;
  box(0.16, h, 0.24, palette.metalRust(), -w / 2 - 0.1, h / 2 - closedH / 2 + closedH / 2, 0, g);
  box(0.16, h, 0.24, palette.metalRust(), w / 2 + 0.1, 0, 0, g);
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  g.userData.shutterBottom = closedH;
  markNoBatch(g);
  parent.add(g);
  return g;
}

function ironGate(parent, x, z, w, h, rotY = 0, openGap = 0.32) {
  const g = new THREE.Group();
  const mat = palette.metalRust();
  const leaf = (side) => {
    const l = new THREE.Group();
    const lw = (w - openGap) / 2;
    box(lw, h, 0.16, mat, 0, 0, 0, l);
    for (let i = -2; i <= 2; i++) box(lw * 0.92, 0.09, 0.22, palette.plastic(0x3b3f47), 0, i * (h / 5), 0, l);
    box(0.12, h * 0.7, 0.12, palette.plastic(0x2f3339), side * (lw / 2 - 0.18), 0.2, 0.16, l);
    l.position.x = side * (openGap / 2 + lw / 2);
    l.rotation.y = side * 0.42; // half-open, leaves swung back
    return l;
  };
  g.add(leaf(-1), leaf(1));
  box(0.34, h + 0.5, 0.34, palette.concreteDark(), -w / 2 - 0.2, 0.25, 0, g);
  box(0.34, h + 0.5, 0.34, palette.concreteDark(), w / 2 + 0.2, 0.25, 0, g);
  box(w + 1.0, 0.36, 0.4, palette.concreteDark(), 0, h + 0.5, 0, g);
  // Firing slit through the lintel.
  box(0.7, 0.5, 0.1, palette.emissive(0x12161c), 0, h + 0.2, 0.22, g);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
}

function catwalk(parent, x1, z1, x2, z2, y, width = 1.6) {
  const g = new THREE.Group();
  const dir = V(x2 - x1, 0, z2 - z1);
  const len = dir.length();
  const deck = box(len, 0.16, width, palette.metalRust(), 0, 0, 0, g);
  deck.receiveShadow = true;
  for (let t = -len / 2 + 0.6; t < len / 2; t += 1.2) {
    box(0.1, 0.9, 0.1, palette.plastic(0x4a4f57), t, 0.45, width / 2 - 0.1, g);
    box(0.1, 0.9, 0.1, palette.plastic(0x4a4f57), t, 0.45, -width / 2 + 0.1, g);
  }
  for (const s of [-1, 1]) {
    const rail = shape(CYL, palette.plastic(0x4a4f57), [0.06, len, 0.06], V(0, 0.92, s * (width / 2 - 0.1)), g);
    rail.rotation.z = Math.PI / 2;
  }
  // Legs.
  for (const t of [-len / 2 + 0.8, len / 2 - 0.8]) {
    box(0.28, y, 0.28, palette.concreteDark(), t, -y / 2 - 0.1, 0, g);
  }
  g.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
  g.rotation.y = yawTo(dir.x, dir.z);
  parent.add(g);
  return g;
}

function sewerMouth(parent, x, z, rotY = 0, scale = 1) {
  const g = new THREE.Group();
  const arch = shape(CYL, palette.concreteDark(), [2.2 * scale, 2.0 * scale, 2.4 * scale], V(0, 0.9 * scale, 0), g);
  arch.rotation.x = Math.PI / 2;
  const dark = shape(CYL, new THREE.MeshBasicMaterial({ color: 0x05070a }), [1.9 * scale, 2.05 * scale, 2.3 * scale], V(0, 0.9 * scale, -0.12), g);
  dark.rotation.x = Math.PI / 2;
  box(3.0 * scale, 0.3, 0.7, palette.metalRust(), 0, 0.05, 0.9, g);
  for (let i = -3; i <= 3; i++) box(0.12, 0.34, 0.12, palette.metalRust(), i * 0.38 * scale, 0.28, 0.9, g);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  parent.add(g);
  return g;
}

function drainage(parent, x1, z1, x2, z2) {
  const g = new THREE.Group();
  const dir = V(x2 - x1, 0, z2 - z1);
  const len = dir.length();
  const trough = box(len, 0.24, 0.8, new THREE.MeshBasicMaterial({ color: 0x0b1015 }), 0, -0.02, 0, g);
  trough.receiveShadow = false;
  // Standing water in the trench catches the mirror pass.
  const water = box(len - 0.3, 0.03, 0.66, palette.emissive(0x16222c, 0.55), 0, 0.05, 0, g);
  water.receiveShadow = false;
  for (let t = -len / 2 + 0.25; t < len / 2; t += 0.46) {
    box(0.3, 0.06, 0.84, palette.metalRust(), t, 0.14, 0, g);
  }
  box(0.14, 0.34, len, palette.concreteDark(), -0.46, 0.05, 0, g).rotation.y = Math.PI / 2;
  box(0.14, 0.34, len, palette.concreteDark(), 0.46, 0.05, 0, g).rotation.y = Math.PI / 2;
  g.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
  g.rotation.y = yawTo(dir.x, dir.z);
  parent.add(g);
  return g;
}

// ---------------------------------------------------------------- regions

function buildBase(parent) {
  const slab = box(BASE * 2, PLinth, BASE * 2, palette.concrete(), 0, -PLinth, 0, parent);
  slab.castShadow = true;
  slab.receiveShadow = true;
  // Chamfered skirt so the plinth reads as a moulded collectible base.
  for (const [sx, sz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const strip = box(sx ? 0.9 : BASE * 2, 0.5, sz ? 0.9 : BASE * 2, palette.concreteDark(), sx * (BASE - 0.2), -PLinth - 0.25, sz * (BASE - 0.2), parent);
    strip.receiveShadow = true;
  }
  for (const cx of [-1, 1]) for (const cz of [-1, 1]) {
    box(1.5, 0.42, 1.5, palette.concreteDark(), cx * (BASE - 0.75), -PLinth - 0.55, cz * (BASE - 0.75), parent);
  }
}

function buildGround(parent, wet) {
  const ground = box(BASE * 2 - 0.4, 0.1, BASE * 2 - 0.4, wet, 0, 0, 0, parent);
  ground.castShadow = false;
  ground.receiveShadow = true;
  ground.layers.set(1); // excluded from the mirror pass
  return ground;
}

function buildTSide(parent, anim) {
  // Closed spawn yard behind the freight station, north edge.
  razorFence(parent, -22, -28.4, -2, -28.4, 2.1, 8);
  razorFence(parent, 2, -28.4, 20, -28.4, 2.1, 8);
  razorFence(parent, -22, -28.4, -22, -20, 2.1, 5);
  razorFence(parent, 20, -28.4, 20, -20, 2.1, 5);
  concreteWall(parent, -28.6, -24, 0.6, 5.6, 9, 0);
  concreteWall(parent, 28.6, -24, 0.6, 5.6, 9, 0);

  shippingContainer(parent, -14, -25.5, 0, 0, 0x8a4f3d);
  shippingContainer(parent, -14, -25.5, 2.6, 0, 0x3f7fae);
  shippingContainer(parent, -7.5, -25.5, 0, 0.06, 0x4c6b52);
  // Right-hand three-stack with a walk-through gap.
  shippingContainer(parent, 8, -26, 0, 0, 0x3f7fae);
  shippingContainer(parent, 8, -26, 2.6, 0, 0x8a4f3d);
  shippingContainer(parent, 8, -26, 5.2, 0.02, 0x4c6b52);
  shippingContainer(parent, 14.5, -25.2, 0, -0.35, 0x3f7fae);
  catwalk(parent, 6.5, -23.2, 15.5, -23.2, 5.6, 1.4);
  stairs(parent, 16.4, -22.6, 9, 0.62, 0.42, 1.4, -Math.PI / 2);

  // Box truck with a leaning ladder, and the signature cover set.
  boxTruck(parent, -19.5, -23.2, 0.32);
  ladder(parent, -17.6, 0.2, -22.4, 3.4, Math.PI / 2, 0.2);
  crateStack(parent, -19.4, -19.4, 2);
  crateStack(parent, -17.6, -19.9, 1);
  barrelQuad(parent, -3.4, -21.4);
  pallet(parent, -5.4, -19.6, 0.2);
  pallet(parent, -5.4, -20.7, 0.2);
  cardboardPile(parent, -9.4, -20.6, 5);
  tire(parent, 3.2, -21.6);
  tire(parent, 3.9, -20.9);

  // Ramp down towards mid and A, with a crouch-through breach in its wall.
  const ramp = box(7.4, 0.4, 8.4, palette.concreteDark(), 0, 0, 0, parent);
  ramp.position.set(-1, -0.2, -16.4);
  ramp.rotation.x = 0.17;
  ramp.receiveShadow = true;
  concreteWall(parent, 3.4, -17.2, 7.6, 3.4, 0.5, 0.16);
  concreteWall(parent, 3.4, -14.6, 3.0, 3.4, 0.5, 0.16);
  // Broken hole: two leaves with a gap the camera can read through.
  const breach = box(1.7, 1.5, 0.5, palette.concrete(), 5.4, 0, -15.8, parent);
  breach.rotation.y = 0.16;
  box(1.9, 0.6, 0.55, palette.concreteDark(), 5.4, 1.5, -15.8, parent).rotation.y = 0.16;
  barrelQuad(parent, -6.4, -15.2);
  crateStack(parent, 6.4, -18.6, 2);
  sewerMouth(parent, -2.6, -12.4, 0, 0.8);
  anim.sewerTop = V(-2.6, 0, -12.4);

  decal(graffitiAt(3), 2.2, 1.6, V(-21.9, 2.2, -24.2), E.set(0, Math.PI / 2, 0), parent, 0.7);
  scuffWalls(parent, [
    { seed: 1, w: 2.2, h: 2.2, pos: V(-12.9, 1.6, -23.1), rot: E.set(0, Math.PI / 2, 0) },
    { seed: 2, w: 1.8, h: 1.8, pos: V(7.9, 1.4, -22.6), rot: E.set(0, 0, 0) },
  ]);
}

function buildASite(parent, anim) {
  // Half-open warehouse: rolled shutter on the front, breakable plank windows
  // and an inward side door on the east face.
  const warehouse = room(parent, {
    x: -19, z: -8, w: 17, d: 12.4, h: 6.2, wallMat: palette.concrete(),
    holes: {
      "+z": [{ at: 0, w: 5.4, h: 4.6 }],
      "+x": [
        { at: -0.6, w: 2.0, h: 3.2 },          // side door opening
        { at: -3.6, w: 1.9, h: 1.5, y: 1.9 },  // plank window
        { at: 2.6, w: 1.9, h: 1.5, y: 1.9 },   // plank window
      ],
    },
  });
  const shut = shutterDoor(parent, -19, 0, -1.72, 5.4, 4.6, 0.52, 0);
  anim.shutters.push(shut);
  // Side door, hinged open.
  const door = box(1.9, 3.2, 0.16, palette.wood(), -10.6, 0, -8.6, parent);
  door.rotation.y = 1.15;
  // Breakable plank windows on the east face.
  for (const dz of [-11.6, -5.4]) {
    const w = box(1.9, 1.5, 0.2, palette.wood(), -10.4, 2.6, dz, parent);
    for (let i = 0; i < 4; i++) box(0.16, 1.5, 0.24, palette.plastic(0x9a7d58), -10.34, 2.6, dz - 0.7 + i * 0.46, parent);
    w.castShadow = true;
  }
  // Roof ribs and a rusted skylight strip.
  for (let x = -26.5; x < -11.5; x += 1.5) box(0.16, 0.24, 12.6, palette.metalRust(), x, 6.4, -8, parent);
  box(4.2, 0.14, 3.2, palette.glass(0x8fa8bc), -20, 6.5, -8, parent);
  gutter(parent, -19, 6.0, -1.9, 16, 0);
  gutter(parent, -27.6, 6.0, -8, 12, Math.PI / 2);
  anim.dripLines.push(
    { from: V(-27, 5.9, -2.1), to: V(-11, 5.9, -2.1), count: 7 },
    { from: V(-27.5, 5.9, -13), to: V(-11.5, 5.9, -13), count: 6 },
  );

  markSite(parent, V(-19, 0, -8), 6.4, "A");
  // Interior cover set.
  shelf(parent, -24.2, -11.2, 5, Math.PI / 2, 3.4);
  shelf(parent, -24.2, -5.2, 5, Math.PI / 2, 3.4);
  shelf(parent, -16.5, -12.4, 4, 0, 3.0);
  crateStack(parent, -14.2, -6.2, 2);
  crateStack(parent, -15.4, -3.6, 1);
  sandBags(parent, -21.2, -3.4, 3);
  forklift(parent, -18.2, -4.6, 0.6);
  for (let i = 0; i < 6; i++) {
    const s = box(0.9, 0.5, 0.6, palette.plastic(0xa9a08a), -12.6 + (i % 3) * 0.8, i > 2 ? 0.5 : 0, -9.4 + Math.floor(i / 3) * 0.7, parent);
    s.rotation.y = i * 0.3;
  }
  // Central peek column.
  const column = box(1.1, 6.2, 1.1, palette.concreteDark(), -19, 0, -8, parent);
  column.castShadow = true;
  box(1.5, 0.3, 1.5, palette.concrete(), -19, 6.2, -8, parent);

  // Steel loft in the far corner, reached by a vertical ladder, window looking
  // down over the site and the main entrance.
  const loft = box(6.0, 0.28, 4.6, palette.metalRust(), -23.4, 3.5, -12.2, parent);
  loft.receiveShadow = true;
  box(6.0, 1.0, 0.12, palette.plastic(0x4a4f57), -23.4, 4.1, -9.9, parent);
  box(0.12, 1.0, 4.6, palette.plastic(0x4a4f57), -26.4, 4.1, -12.2, parent);
  ladder(parent, -20.6, 3.6, -12.2, 2.8, Math.PI / 2, 0);
  const loftWindow = windowHole(parent, parent, V(-20.4, 4.6, -12.6), { w: 1.8, h: 1.0 });
  loftWindow.glass.rotation.y = Math.PI / 2;
  loftWindow.frame.rotation.y = Math.PI / 2;

  // Back-room door left ajar with the red glow through the gap.
  box(2.4, 3.4, 0.2, palette.metalRust(), -22.6, 0, -13.9, parent);
  const glow = box(0.5, 3.0, 0.06, palette.emissive(0xc0342a, 1.2), -21.3, 0.2, -13.85, parent);
  glow.castShadow = false;
  anim.redSeep.push(glow);

  // Sorting table, torn parcels, strapping and newsprint.
  const table = box(3.2, 0.16, 1.3, palette.wood(), -13.6, 0.9, -12.4, parent);
  [[-1.4, -0.5], [1.4, -0.5], [-1.4, 0.5], [1.4, 0.5]].forEach(([dx, dz]) => box(0.14, 0.9, 0.14, palette.metalRust(), -13.6 + dx, 0, -12.4 + dz, parent));
  for (let i = 0; i < 5; i++) {
    const p = box(0.5, 0.14, 0.36, palette.plastic(0xe6e2d8), -14.6 + i * 0.5, 1.02, -12.6 + (i % 2) * 0.4, parent);
    p.rotation.y = i * 0.7;
  }
  for (let i = 0; i < 4; i++) {
    const strap = box(1.7, 0.03, 0.09, palette.plastic(0x8d6a3f), -12.4 + (i % 2), 0.11, -11.2 + i * 0.6, parent);
    strap.rotation.y = i * 1.1;
  }
  cardboardPile(parent, -25.6, -3.2, 6);

  // Exterior wall gear and the narrow cut into the west alley.
  acUnit(parent, -27.9, -6.4);
  acUnit(parent, -27.9, -9.6);
  trashBin(parent, -26.2, -1.4, true);
  trashBin(parent, -24.9, -1.2, false);
  const freightSign = box(2.6, 1.3, 0.14, palette.metalPaint(0x2f5f8a), -27.9, 3.2, -4.4, parent);
  freightSign.rotation.y = Math.PI / 2;
  decal(graffitiAt(2), 2.2, 1.0, V(-27.72, 3.4, -4.4), E.set(0, Math.PI / 2, 0), parent, 0.9);
  concreteWall(parent, -28.6, 3.4, 0.6, 4.8, 8.2, 0);
  concreteWall(parent, -24.0, 6.6, 8.6, 4.8, 0.6, 0);
  industrialVent(parent, -27.6, 4.4, -11.4);
  anim.vents.push(V(-27.0, 4.6, -11.4));

  scuffWalls(parent, [
    { seed: 3, w: 2.4, h: 2.4, pos: V(-10.6, 1.8, -7.2), rot: E.set(0, Math.PI / 2, 0) },
    { seed: 4, w: 2.0, h: 2.0, pos: V(-19.2, 1.6, -1.66), rot: E.set(0, 0, 0) },
    { seed: 5, w: 1.8, h: 1.8, pos: V(-28.2, 2.0, 1.2), rot: E.set(0, Math.PI / 2, 0) },
  ]);
  decal(graffitiAt(3), 2.4, 1.8, V(-16.4, 2.4, -1.62), E.set(0, 0, 0), parent, 0.65);
}

function buildMid(parent, anim) {
  // Centre lane with the classic half-open double door and high firing walls.
  concreteWall(parent, -6.4, -4.2, 0.7, 7.4, 22, 0);
  concreteWall(parent, 6.4, -4.2, 0.7, 7.4, 22, 0);
  // Shooting ports reached from the flanking platforms.
  for (const sx of [-1, 1]) {
    const port = box(0.72, 1.2, 0.9, new THREE.MeshBasicMaterial({ color: 0x0a0d12 }), sx * 6.4, 4.6, -3.2, parent);
    port.castShadow = false;
    box(1.5, 0.2, 1.2, palette.concrete(), sx * 6.4, 5.3, -3.2, parent);
  }

  ironGate(parent, 0, -3.4, 5.6, 4.4, 0, 1.5);
  drainage(parent, 0, -14.5, 0, 12.5);

  // CT-side low wall with crates and a bent road sign behind it.
  jerseyBlock(parent, -2.2, 6.4, 2.6, 0);
  jerseyBlock(parent, 2.2, 6.4, 2.6, 0);
  crateStack(parent, 0, 8.4, 2);
  crateStack(parent, 1.8, 9.2, 1);
  const signPost = box(0.12, 2.4, 0.12, palette.metalRust(), -3.6, 0, 9.4, parent);
  const signPlate = box(1.3, 1.3, 0.08, palette.metalPaint(0x2f6f4f), -3.6, 2.2, 9.4, parent);
  signPlate.rotation.set(0.3, 0, 0.5);
  signPost.rotation.z = 0.18;

  // Guard booths on both sides of the lane, consoles visible through the rain.
  // Everything below is booth-local: room() already translates the group.
  for (const sx of [-1, 1]) {
    const inner = sx > 0 ? "-x" : "+x"; // glazing faces the lane
    const booth = room(parent, {
      x: sx * 8.6, z: 1.6, w: 3.2, d: 3.0, h: 2.9, wallMat: palette.metalPaint(0x6d7a86),
      holes: { [inner]: [{ at: 0, w: 2.2, h: 1.5, y: 0.9 }] },
    });
    const glass = box(0.08, 1.5, 2.2, palette.glass(0xa9c2d4), sx * -1.5, 1.65, 0, booth);
    glass.castShadow = false;
    box(1.7, 0.12, 0.7, palette.plastic(0x3c4650), sx * -0.4, 0.92, 0.6, booth);
    box(1.4, 0.5, 0.5, palette.plastic(0x242b33), sx * -0.4, 1.24, 0.6, booth);
    for (let i = 0; i < 6; i++) {
      box(0.12, 0.1, 0.1, palette.emissive(0x6fd0ff, 0.8), sx * -0.9 + i * 0.2, 1.53, 0.6, booth);
    }
    chair(booth, sx * 0.5, -0.7, 0, 0);
    anim.boothLights.push(V(sx * 8.6, 2.6, 1.6));
  }

  // Subway drop-in at the T ramp and its outlet beside the CT spawn.
  sewerMouth(parent, -2.6, -11.6, Math.PI, 0.85);
  sewerMouth(parent, 12.4, 21.4, -Math.PI / 2, 0.8);
  catwalk(parent, -8.2, -12.4, -8.2, 6.2, 5.4, 1.5);
  stairs(parent, -8.9, 7.2, 9, 0.6, 0.42, 1.4, Math.PI);
  concreteWall(parent, -11.2, -3.2, 0.6, 5.6, 8, 0);
  barrelQuad(parent, 3.6, -8.6);
  tire(parent, -3.4, 2.6);
  cardboardPile(parent, 4.4, 1.6, 4);
  scuffWalls(parent, [
    { seed: 6, w: 2.6, h: 3.0, pos: V(-6.02, 2.4, -8.4), rot: E.set(0, Math.PI / 2, 0) },
    { seed: 7, w: 2.2, h: 2.6, pos: V(6.02, 2.2, -1.4), rot: E.set(0, -Math.PI / 2, 0) },
  ]);
  decal(graffitiAt(0), 1.6, 1.6, V(-6.04, 2.0, 4.6), E.set(0, Math.PI / 2, 0), parent, 0.75);
  decal(graffitiAt(1), 1.6, 1.6, V(6.04, 2.0, 5.4), E.set(0, -Math.PI / 2, 0), parent, 0.75);
}

function buildBSite(parent, anim) {
  // Rear-street compound: open yard plus a two-storey tin house. The street
  // face (+z) carries the office glazing and the front door.
  const house = room(parent, {
    x: 18.6, z: -12.4, w: 11.4, d: 9.4, h: 3.4, wallMat: palette.metalPaint(0x7b8791),
    holes: { "+z": [{ at: -2.2, w: 2.9, h: 2.1, y: 0.85 }, { at: 1.6, w: 2.6, h: 2.4 }] },
  });
  const upper = room(parent, {
    x: 18.6, z: -12.4, w: 11.4, d: 9.4, h: 3.2, wallMat: palette.metalPaint(0x6f7b85),
    holes: { "+z": [{ at: -1.0, w: 3.4, h: 1.5, y: 0.8 }, { at: 3.0, w: 1.4, h: 2.0 }] },
  });
  upper.position.y = 3.4;
  // Front glass of the ground-floor office, and its double doors.
  const front = windowHole(parent, parent, V(16.4, 2.0, -7.6), { w: 2.6, h: 1.6 });
  front.glass.rotation.x = 0;
  const doorA = box(1.1, 2.3, 0.14, palette.metalRust(), 19.4, 0, -7.62, parent);
  doorA.rotation.y = 0.9;
  box(1.1, 2.3, 0.14, palette.metalRust(), 20.7, 0, -7.7, parent);
  const backDoor = box(1.2, 2.4, 0.14, palette.metalRust(), 21.8, 0, -15.9, parent);
  backDoor.rotation.y = -0.7;

  // Office interior: desk, tipped chair, duty board, dead fluorescent tube.
  desk(parent, 16.6, -10.4, 0.2);
  chair(parent, 17.6, -9.4, 2.4, true);
  const board = box(1.8, 1.1, 0.08, palette.plastic(0xcfc7b4), 20.6, 1.9, -15.4, parent);
  for (let i = 0; i < 4; i++) box(0.4, 0.28, 0.1, palette.plastic(0xe8e4da), 20.0 + i * 0.4, 2.1 - (i % 2) * 0.4, -15.35, parent);
  const tube = box(1.9, 0.14, 0.2, palette.emissive(0xffe2b0, 0.85), 18.4, 3.1, -11.4, parent);
  tube.castShadow = false;
  markNoBatch(tube);
  anim.flickerTube = tube;
  locker(parent, 21.6, -12.8, Math.PI / 2);
  locker(parent, 21.6, -11.4, Math.PI / 2);

  // Second-floor balcony and the fire escape that makes the classic high peek.
  const balcony = box(5.4, 0.22, 3.0, palette.metalRust(), 14.4, 3.4, -6.6, parent);
  for (let i = -2; i <= 2; i++) box(0.1, 1.0, 0.1, palette.plastic(0x4a4f57), 14.4 + i * 1.2, 3.6, -5.2, parent);
  box(5.4, 0.1, 0.1, palette.plastic(0x4a4f57), 14.4, 4.5, -5.2, parent);
  for (let i = 0; i < 8; i++) {
    const stepY = 3.4 - i * 0.42;
    if (stepY < 0) break;
    box(1.1, 0.1, 0.7, palette.metalRust(), 11.4, stepY, -5.6 + i * 0.72, parent);
    box(0.1, 1.0, 0.7, palette.plastic(0x4a4f57), 10.9, stepY + 0.5, -5.6 + i * 0.72, parent);
  }
  box(0.14, 7.2, 0.14, palette.metalRust(), 10.8, 0, -5.4, parent);
  box(0.14, 7.2, 0.14, palette.metalRust(), 12.0, 0, -5.4, parent);

  markSite(parent, V(15.6, 0, -3.2), 5.2, "B");
  // Irregular cover ring around the plant.
  pallet(parent, 12.4, -1.4, 0.3);
  pallet(parent, 12.4, -2.4, 0.3);
  trashBin(parent, 18.4, -1.8, true);
  trashBin(parent, 19.6, -2.2, false);
  bicycleWreck(parent, 14.2, -0.4, 0.8);
  cafeTable(parent, 16.8, 0.6, true);
  cafeTable(parent, 20.4, 0.2, false);
  chair(parent, 21.2, 1.0, 1.2, true);
  crateStack(parent, 23.4, -1.8, 2);
  barrelQuad(parent, 24.2, 2.4);
  sandBags(parent, 22.4, 4.2, 2);

  // Corner lamp whose halo spreads over the wet yard, and the low wall that
  // hides the CT shortcut.
  const lamp = streetLamp(parent, 11.8, 3.4, 5.2);
  anim.lamps.push(lamp);
  concreteWall(parent, 24.4, 6.2, 0.6, 3.2, 8, 0);
  concreteWall(parent, 19.4, 9.6, 9.4, 3.2, 0.6, 0);
  gutter(parent, 18.6, 6.7, -7.9, 11, 0);
  anim.dripLines.push({ from: V(13.2, 6.6, -7.9), to: V(24.0, 6.6, -7.9), count: 5 });
  industrialVent(parent, 23.4, 4.6, -8.2);
  anim.vents.push(V(23.4, 5.0, -8.4));

  scuffWalls(parent, [
    { seed: 8, w: 2.2, h: 2.4, pos: V(12.9, 1.8, -7.62), rot: E.set(0, 0, 0) },
    { seed: 9, w: 1.8, h: 2.0, pos: V(24.24, 1.6, -12.0), rot: E.set(0, Math.PI / 2, 0) },
  ]);
  decal(graffitiAt(3), 2.0, 1.5, V(21.0, 1.6, -7.56), E.set(0, 0, 0), parent, 0.6);
}

function buildCTSide(parent, anim) {
  // Police cordon across the south edge.
  concreteWall(parent, 0, 28.6, 44, 5.2, 0.7, 0);
  policeCrest(parent, 3.0, 2.4, V(-4.0, 2.6, 28.15), E.set(0, Math.PI, 0));
  decal(graffitiAt(2), 2.8, 1.4, V(4.0, 2.6, 28.15), E.set(0, Math.PI, 0), parent, 0.8);
  for (const sx of [-1, 1]) {
    concreteWall(parent, sx * 20, 22.6, 0.7, 4.6, 12, 0);
  }

  // Defensive line of blockers and shields.
  roadBarrier(parent, -6.4, 24.4, 0.1);
  roadBarrier(parent, -2.2, 24.0, -0.16);
  roadBarrier(parent, 2.2, 24.2, 0.22);
  securityShield(parent, -4.4, 23.2, 0.3);
  securityShield(parent, -3.2, 23.6, 0.1);
  securityShield(parent, 5.4, 23.4, -0.35);
  jerseyBlock(parent, 8.4, 24.6, 2.6, 0.1);

  const van = policeVan(parent, -14.6, 24.2, -0.24);
  anim.beacon = van.userData.lightBar;
  ladder(parent, -12.6, 0.2, 26.4, 3.2, Math.PI / 2, 0.18);

  // Concrete high platform with a searchlight over the mid entrance.
  const platform = box(9.0, 2.2, 8.4, palette.concrete(), 15.4, 0, 22.4, parent);
  platform.receiveShadow = true;
  stairs(parent, 10.4, 20.2, 7, 0.32, 0.44, 1.8, Math.PI / 2);
  const search = new THREE.Group();
  box(0.3, 1.2, 0.3, palette.plastic(0x3c414a), 0, 0, 0, search);
  const head = shape(CYL, palette.metalPaint(0x93a0ac), [0.9, 0.5, 0.9], V(0, 1.3, 0.4), search);
  head.rotation.x = Math.PI / 2.6;
  const lens = box(0.72, 0.72, 0.12, palette.emissive(0xfff2cf, 1.4), 0, 1.34, 0.72, search);
  lens.castShadow = false;
  search.position.set(16.4, 2.2, 21.4);
  markNoBatch(search);
  parent.add(search);
  anim.searchlight = { group: search, lens, base: 2.2 };
  const spot = new THREE.SpotLight(0xfff0cf, 900, 34, 0.42, 0.55, 1.4);
  spot.position.set(16.4, 3.6, 21.4);
  spot.target.position.set(1.5, 0, 8.0);
  parent.add(spot, spot.target);
  anim.searchSpot = spot;

  // Spare kit by the back wall and the two exit routes.
  gearBox(parent, -1.4, 26.8, 0.2);
  gearBox(parent, 1.2, 27.2, -0.3);
  crateStack(parent, 3.4, 26.4, 1);
  barrelQuad(parent, -18.4, 26.4);
  tire(parent, -20.4, 24.4);
  cardboardPile(parent, -7.2, 26.6, 4);
  concreteWall(parent, -22.4, 16.4, 0.7, 4.2, 9, 0);
  gutter(parent, -1.0, 4.9, 28.2, 26, 0);
  anim.dripLines.push({ from: V(-13, 4.8, 28.1), to: V(11, 4.8, 28.1), count: 9 });
  scuffWalls(parent, [
    { seed: 10, w: 2.6, h: 2.2, pos: V(-9.4, 1.8, 28.18), rot: E.set(0, Math.PI, 0) },
    { seed: 11, w: 2.2, h: 2.0, pos: V(12.4, 1.6, 28.18), rot: E.set(0, Math.PI, 0) },
  ]);
}

function buildAlleyAndFlank(parent, anim) {
  // West back-street route from A towards CT.
  concreteWall(parent, -21.4, 10.4, 0.7, 5.0, 8.4, 0);
  concreteWall(parent, -25.2, 14.6, 0.7, 4.6, 9.4, 0);
  concreteWall(parent, -18.4, 18.4, 8.2, 4.4, 0.7, 0);
  for (let i = 0; i < 4; i++) {
    crateStack(parent, -23.6 + i * 1.8, 8.4 + (i % 2) * 2.2, 1 + (i % 3));
  }
  barrelBlue(parent, -20.4, 13.2);
  barrelBlue(parent, -20.4, 14.4);
  tire(parent, -22.6, 16.4);
  trashBin(parent, -19.4, 16.2, true);
  pallet(parent, -24.4, 18.6, 0.4);
  cardboardPile(parent, -21.8, 20.6, 5);
  utilityPole(parent, -23.2, 6.4, 6.4);
  utilityPole(parent, -21.6, 22.4, 6.0);
  anim.poles.push(V(-23.2, 5.9, 6.4), V(-21.6, 5.5, 22.4));
  decal(graffitiAt(3), 2.2, 1.6, V(-21.02, 2.2, 11.4), E.set(0, Math.PI / 2, 0), parent, 0.7);

  // East elevated flank: stacked containers, catwalk and a crate staircase.
  shippingContainer(parent, 25.4, 8.4, 0, Math.PI / 2, 0x3f7fae);
  shippingContainer(parent, 25.4, 8.4, 2.6, Math.PI / 2, 0x8a4f3d);
  shippingContainer(parent, 25.4, 15.4, 0, Math.PI / 2, 0x4c6b52);
  catwalk(parent, 20.4, 12.4, 26.2, 18.4, 5.4, 1.6);
  crateStack(parent, 20.6, 11.2, 1);
  crateStack(parent, 20.6, 10.2, 2);
  concreteWall(parent, 17.4, 14.4, 0.7, 4.6, 12, 0);
  for (let i = 0; i < 3; i++) barrelBlue(parent, 22.4, 20.4 + i * 1.4);
  sandBags(parent, 26.2, 21.4, 2);
  utilityPole(parent, 26.4, 3.4, 6.2);
  anim.poles.push(V(26.4, 5.7, 3.4));
  scuffWalls(parent, [{ seed: 12, w: 2.4, h: 2.2, pos: V(17.06, 1.8, 12.2), rot: E.set(0, -Math.PI / 2, 0) }]);
  decal(graffitiAt(2), 1.8, 1.0, V(25.3, 6.0, 8.3), E.set(0, 0, 0), parent, 0.8);
}

function buildPerimeter(parent) {
  // Low perimeter wall so nothing reads as spilling off the plinth.
  const mat = palette.concreteDark();
  for (const [x, z, w, d] of [
    [0, -29.5, 60, 0.7], [0, 29.5, 60, 0.7], [-29.5, 0, 0.7, 60], [29.5, 0, 0.7, 60],
  ]) {
    const wall = box(w, 0.8, d, mat, x, 0, z, parent);
    wall.receiveShadow = true;
    box(w * 0.99, 0.12, d * 0.99, palette.metalRust(), x, 0.8, z, parent);
  }
}

// Graffiti variants are cached by index; a thin re-export keeps call sites tidy.
import { graffiti } from "./textures.js";
const graffitiAt = (i) => graffiti(i);

// ---------------------------------------------------------------- assembly

export function buildDiorama(scene, wetStreet) {
  const root = new THREE.Group();
  scene.add(root);
  const anim = {
    shutters: [], lamps: [], vents: [], poles: [], redSeep: [], dripLines: [],
    beacon: null, searchlight: null, searchSpot: null, flickerTube: null, boothLights: [],
  };

  buildBase(root);
  const ground = buildGround(root, wetStreet);
  buildPerimeter(root);
  buildTSide(root, anim);
  buildASite(root, anim);
  buildMid(root, anim);
  buildBSite(root, anim);
  buildCTSide(root, anim);
  buildAlleyAndFlank(root, anim);

  // Overhead power lines strung between the poles, sagged with a shallow arc.
  const wireMat = new THREE.LineBasicMaterial({ color: 0x14171d });
  const pts = [];
  for (let i = 0; i < anim.poles.length - 1; i++) {
    const a = anim.poles[i];
    const b = anim.poles[i + 1];
    if (a.distanceTo(b) > 26) continue;
    for (const drop of [0, 0.5]) {
      const line = [];
      for (let t = 0; t <= 1.0001; t += 0.08) {
        line.push(new THREE.Vector3(
          a.x + (b.x - a.x) * t,
          a.y - drop - Math.sin(Math.PI * t) * 1.1,
          a.z + (b.z - a.z) * t
        ));
      }
      pts.push(line);
    }
  }
  for (const line of pts) {
    root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(line), wireMat));
  }

  return { root, ground, anim };
}
