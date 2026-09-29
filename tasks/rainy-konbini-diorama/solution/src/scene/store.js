import * as THREE from 'three';
import { Builder } from '../core/builder.js';
import { toon, toonMap, glow, glowMap } from '../core/materials.js';
import { addGlass } from './glass.js';
import { STORE, AWNING, DOOR, PAL } from './layout.js';
import { fasciaTexture, sideFasciaTexture, valanceTexture, posterTexture, matTexture } from './storeTextures.js';

const { x0, x1, z0, z1, floor, top } = STORE;
const GLASS_Y0 = 0.3;
const GLASS_Y1 = 2.45;
const T = 0.15;

function plane(mat, w, h, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  return m;
}

function shell(ctx) {
  const { b } = ctx;
  const wall = toon(PAL.storeWall);
  const skirt = toon(PAL.storeSkirt);
  const frame = toon(PAL.frame);

  b.span(toon(0x8a90a0), x0, 0, z0, x1, floor, z1);
  // Solid walls: left, back, right-rear, front-left pillar.
  b.span(wall, x0, floor, z0, x0 + T, top - 0.02, z1);
  b.span(wall, x0, floor, z0, x1, top - 0.02, z0 + T);
  b.span(wall, x1 - T, floor, z0, x1, top - 0.02, -1.8);
  b.span(wall, x0, floor, z1 - T, -2.3, GLASS_Y1, z1);
  b.span(skirt, x0 - 0.02, 0, z0 - 0.02, x0 + 0.02, 0.32, z1 + 0.02);
  b.span(skirt, x0 - 0.02, 0, z0 - 0.02, x1 + 0.02, 0.32, z0 + 0.02);
  b.span(skirt, x1 - 0.02, 0, z0 - 0.02, x1 + 0.02, 0.32, -1.8);
  b.span(skirt, x0 - 0.02, 0, z1 - 0.02, -2.3, 0.32, z1 + 0.02);

  // Storefront frames: kick plates, rails, mullions.
  b.span(toon(PAL.darkFrame), -2.3, floor, z1 - 0.06, DOOR.x0, GLASS_Y0, z1 + 0.02);
  b.span(toon(PAL.darkFrame), DOOR.x1, floor, z1 - 0.06, x1, GLASS_Y0, z1 + 0.02);
  b.span(toon(PAL.darkFrame), x1 - 0.06, floor, -1.8, x1 + 0.02, GLASS_Y0, z1);
  for (const y of [GLASS_Y0, GLASS_Y1]) {
    b.span(frame, -2.3, y - 0.03, z1 - 0.05, x1, y + 0.03, z1 + 0.03);
    b.span(frame, x1 - 0.05, y - 0.03, -1.8, x1 + 0.03, y + 0.03, z1);
  }
  for (const x of [-2.3, -1.25, DOOR.x0, DOOR.x1, 2.65]) b.span(frame, x - 0.035, floor, z1 - 0.06, x + 0.035, GLASS_Y1, z1 + 0.03);
  b.span(frame, 2.65, floor, z1 - 0.15, x1 + 0.03, GLASS_Y1, z1 + 0.03);
  for (const z of [-1.8, -0.58]) b.span(frame, x1 - 0.06, floor, z - 0.035, x1 + 0.03, GLASS_Y1, z + 0.035);
  b.span(frame, DOOR.x0, DOOR.h, z1 - 0.1, DOOR.x1, GLASS_Y1, z1 + 0.03);

  // Fascia band, roof, parapet, ceiling.
  b.span(toon(0xf6f5f0), x0 - 0.05, GLASS_Y1, z1 - 0.1, x1 + 0.1, top, z1 + 0.1);
  b.span(toon(0xf6f5f0), x1 - 0.1, GLASS_Y1, z0 - 0.05, x1 + 0.1, top, z1 + 0.1);
  b.span(toon(0xd9d6cc), x0, 3.0, z0, x1, 3.12, z1);
  b.span(wall, x0, 3.12, z0, x0 + 0.12, 3.5, z1);
  b.span(wall, x0, 3.12, z0, x1, 3.5, z0 + 0.12);
  b.span(toon(0xfaf6ea), x0 + T, 2.94, z0 + T, x1 - T, 3.0, z1 - T);

  const fascia = glowMap(fasciaTexture(), 1.55);
  const side = glowMap(sideFasciaTexture(), 1.45);
  ctx.root.add(plane(fascia, x1 - x0 + 0.1, 0.78, (x0 + x1) / 2 + 0.02, 3.1, z1 + 0.105));
  ctx.root.add(plane(side, z1 - z0 + 0.1, 0.78, x1 + 0.105, 3.1, (z0 + z1) / 2, Math.PI / 2));
  ctx.signs.push({ mat: fascia, base: 1.55 }, { mat: side, base: 1.45 });

  // Rooftop condensers and a vent stack.
  const grey = toon(0xaeb4bf);
  for (const [cx, cz] of [
    [-1.6, -2.8],
    [-0.2, -2.8],
  ]) {
    b.box(grey, cx, 3.45, cz, 1.0, 0.66, 0.7);
    b.cyl(toon(0x444a57), cx, 3.79, cz, 0.24, 0.02, 14);
  }
  b.box(grey, 1.6, 3.35, -3.4, 0.5, 0.46, 0.5);
  b.cyl(toon(0x7e8592), 1.6, 3.58, -3.4, 0.08, 0.3, 8);
  ctx.blockers.push([x0 - 0.1, z0 - 0.1, x1 + 0.12, z1 + 0.12, top]);
}

function awning(ctx) {
  const { b } = ctx;
  const len = Math.hypot(AWNING.z1 - z1, AWNING.yWall - AWNING.yEdge);
  const tilt = Math.atan2(AWNING.yWall - AWNING.yEdge, AWNING.z1 - z1);
  const cz = (z1 + AWNING.z1) / 2;
  const cy = (AWNING.yWall + AWNING.yEdge) / 2;
  b.box(toon(0x1e8f88), (x0 + x1) / 2, cy, cz, x1 - x0 + 0.3, 0.06, len, tilt);
  b.box(toon(0xdfe8e6), (x0 + x1) / 2, cy - 0.04, cz, x1 - x0 + 0.26, 0.02, len - 0.04, tilt);
  const val = toonMap(valanceTexture(), { color: 0xffffff });
  val.map.wrapS = THREE.RepeatWrapping;
  val.map.repeat.set(4, 1);
  ctx.root.add(plane(val, x1 - x0 + 0.3, 0.2, (x0 + x1) / 2, AWNING.yEdge - 0.08, AWNING.z1 + 0.035));
  const rodMat = toon(0xd0d4dc);
  for (const x of [-2.9, -0.8, 1.9]) {
    b.rod(rodMat, new THREE.Vector3(x, 1.95, z1 + 0.1), new THREE.Vector3(x, AWNING.yEdge - 0.02, AWNING.z1 - 0.1), 0.02);
  }
  // Downlights under the awning.
  const lamp = glow(0xfff1d0, 3.2);
  for (let x = -2.6; x <= 2.4; x += 1.25) {
    b.box(lamp, x, cy - 0.07, cz, 0.22, 0.02, 0.22, tilt);
  }
  ctx.blockers.push([x0 - 0.15, z1, x1 + 0.15, AWNING.z1, AWNING.yEdge]);
  ctx.drips.push({ from: [x0 - 0.1, AWNING.yEdge - 0.05, AWNING.z1 + 0.02], to: [x1 + 0.1, AWNING.yEdge - 0.05, AWNING.z1 + 0.02], count: 26, floor: 0 });
}

function door(ctx) {
  const group = new THREE.Group();
  ctx.root.add(group);
  const leaves = [];
  const w = (DOOR.x1 - DOOR.x0) / 2 + 0.02;
  for (let i = 0; i < 2; i++) {
    const leaf = new THREE.Group();
    const lb = new Builder();
    const frame = toon(0xc3c9d3);
    lb.span(frame, -w / 2, 0, -0.025, w / 2, 0.08, 0.025);
    lb.span(frame, -w / 2, DOOR.h - floor - 0.06, -0.025, w / 2, DOOR.h - floor, 0.025);
    lb.span(frame, -w / 2, 0, -0.025, -w / 2 + 0.05, DOOR.h - floor, 0.025);
    lb.span(frame, w / 2 - 0.05, 0, -0.025, w / 2, DOOR.h - floor, 0.025);
    lb.span(toon(0x9aa2b0), i ? -w / 2 + 0.07 : w / 2 - 0.1, 0.95, -0.03, i ? -w / 2 + 0.1 : w / 2 - 0.07, 1.25, 0.03);
    lb.flush(leaf, { castShadow: false });
    addGlass(ctx, leaf, w - 0.1, DOOR.h - floor - 0.14, 0, (DOOR.h - floor) / 2, 0);
    const closedX = DOOR.x0 + w / 2 - 0.01 + i * (w - 0.02);
    leaf.position.set(closedX, floor, z1 - 0.08 - i * 0.05);
    group.add(leaf);
    leaves.push({ leaf, closedX, openX: closedX + (i ? 1 : -1) * (w - 0.08) });
  }
  // Sensor with a status LED above the opening.
  ctx.b.box(toon(0x3a4150), (DOOR.x0 + DOOR.x1) / 2, 2.34, z1 + 0.06, 0.34, 0.1, 0.08);
  const led = glow(0x7dff9a, 3);
  ctx.b.box(led, (DOOR.x0 + DOOR.x1) / 2 + 0.12, 2.34, z1 + 0.105, 0.03, 0.03, 0.01);

  const mat = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.55), toonMap(matTexture()));
  mat.rotation.x = -Math.PI / 2;
  mat.position.set((DOOR.x0 + DOOR.x1) / 2, 0.012, z1 + 0.34);
  mat.receiveShadow = true;
  ctx.root.add(mat);
  ctx.noReflect.push(mat);

  // Automatic door: sits closed, then opens every 9-20 s as if someone walked past the sensor.
  let state = 'closed';
  let timer = 4;
  let open = 0;
  ctx.updaters.push((t, dt) => {
    timer -= dt;
    if (state === 'closed' && timer <= 0) state = 'opening';
    if (state === 'opening') {
      open = Math.min(1, open + dt / 1.1);
      if (open >= 1) {
        state = 'hold';
        timer = 2 + Math.random() * 2.5;
      }
    } else if (state === 'hold' && timer <= 0) state = 'closing';
    else if (state === 'closing') {
      open = Math.max(0, open - dt / 1.4);
      if (open <= 0) {
        state = 'closed';
        timer = 9 + Math.random() * 11;
      }
    }
    const e = open * open * (3 - 2 * open);
    for (const l of leaves) l.leaf.position.x = l.closedX + (l.openX - l.closedX) * e;
    led.color.setRGB(e > 0 ? 3 : 0.4, 3, e > 0 ? 0.6 : 1.4);
  });
}

function glazing(ctx) {
  const root = ctx.root;
  const h = GLASS_Y1 - GLASS_Y0;
  const yc = (GLASS_Y0 + GLASS_Y1) / 2;
  addGlass(ctx, root, -0.2 - -2.3, h, (-2.3 + -0.2) / 2, yc, z1);
  addGlass(ctx, root, 2.65 - 1.2, h, (1.2 + 2.65) / 2, yc, z1);
  addGlass(ctx, root, 0.62 - -1.8, h, x1, yc, (-1.8 + 0.62) / 2, Math.PI / 2);
  addGlass(ctx, root, DOOR.x1 - DOOR.x0, GLASS_Y1 - DOOR.h - 0.02, (DOOR.x0 + DOOR.x1) / 2, (DOOR.h + GLASS_Y1) / 2, z1, 0, { wet: 0.6 });

  // Backlit posters stuck to the inside of the glass.
  const posters = [
    ['oden', -1.95, 0.72, z1 - 0.012, 0.42, 0],
    ['milk', -0.62, 0.72, z1 - 0.012, 0.36, 0],
    ['open', 2.3, 2.08, z1 - 0.012, 0.3, 0],
    ['atm', x1 - 0.012, 2.05, 0.2, 0.3, Math.PI / 2],
  ];
  for (const [kind, x, y, z, w, ry] of posters) {
    const p = plane(glowMap(posterTexture(kind), 1.15), w, w * 1.4, x, y, z, ry);
    root.add(p);
  }
}

function sideDetails(ctx) {
  const { b } = ctx;
  // Outdoor AC condensers stacked on a frame against the side wall, with piping.
  const unit = toon(0xdfe1e4);
  const dark = toon(0x3b414d);
  const pipe = toon(0xe8e2c8);
  for (const [z, y] of [
    [-3.0, 0.42],
    [-3.0, 1.18],
    [-2.1, 0.42],
  ]) {
    b.box(unit, x1 + 0.17, y, z, 0.3, 0.6, 0.8);
    b.rod(dark, new THREE.Vector3(x1 + 0.3, y, z - 0.1), new THREE.Vector3(x1 + 0.335, y, z - 0.1), 0.21, 16);
    b.span(toon(0x9ea4ae), x1 + 0.3, y - 0.2, z + 0.2, x1 + 0.33, y + 0.2, z + 0.34);
  }
  b.span(toon(0x6c7280), x1 + 0.02, 0, -3.45, x1 + 0.34, 0.1, -1.65);
  b.span(toon(0x6c7280), x1 + 0.02, 0.8, -3.45, x1 + 0.34, 0.84, -2.55);
  b.span(pipe, x1 + 0.02, 0.5, -2.62, x1 + 0.09, 2.9, -2.52);
  b.span(pipe, x1 + 0.02, 1.5, -3.52, x1 + 0.09, 2.9, -3.42);
  b.span(toon(0x9ea4ae), x1 + 0.02, 1.3, -1.55, x1 + 0.14, 1.75, -1.25);
  // Downpipe at the rear corner.
  b.cyl(toon(0x8d95a3), x1 + 0.08, 0, z0 + 0.1, 0.05, 3.4, 8);
  // Staff back door on the rear wall with a warm lamp.
  b.span(toon(0x8f99a8), 1.5, floor, z0 - 0.05, 2.3, 2.1, z0 + 0.02);
  b.span(toon(0x5b6474), 2.12, 1.0, z0 - 0.08, 2.2, 1.1, z0 - 0.05);
  b.box(glow(0xffd7a0, 3), 1.9, 2.3, z0 - 0.08, 0.2, 0.12, 0.1);
}

export function buildStore(ctx) {
  shell(ctx);
  awning(ctx);
  door(ctx);
  glazing(ctx);
  sideDetails(ctx);
}
