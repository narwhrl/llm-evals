// Track: ballast, sleepers and rails swept along the path, the two rail bridges, the road bridge and the level crossing.
import * as THREE from 'three';
import { mat, shade } from './kit.js';
import { TRACK, BRIDGES, ROAD_BRIDGE, CROSSING, BALLAST_TOP, RAIL_TOP, FRONT_Z, TRAIN } from './layout.js';
import { gravelTexture, grainTexture, stripeTexture } from './textures.js';

const I = new THREE.Matrix4();
const GAUGE = 0.5;

// Sweeps a counter-clockwise (lateral u, height y) profile along the track between s0 and s1.
function sweep(s0, s1, profile, closed, { uOffset = 0, step = 0.1, caps = false } = {}) {
  const n = Math.max(2, Math.ceil((s1 - s0) / step));
  const frames = [];
  for (let k = 0; k <= n; k++) {
    const s = s0 + ((s1 - s0) * k) / n;
    const p = TRACK.sample(s);
    frames.push({ x: p.x, z: p.z, lx: p.dz, lz: -p.dx, dx: p.dx, dz: p.dz, s });
  }
  const pos = [];
  const nor = [];
  const uv = [];
  const vert = (f, u, y) => [f.x + f.lx * (u + uOffset), y, f.z + f.lz * (u + uOffset)];
  const edges = closed ? profile.length : profile.length - 1;
  let along = 0;
  for (let i = 0; i < edges; i++) {
    const [u0, y0] = profile[i];
    const [u1, y1] = profile[(i + 1) % profile.length];
    const len = Math.hypot(u1 - u0, y1 - y0);
    const nu = (y1 - y0) / len;
    const ny = -(u1 - u0) / len;
    for (let k = 0; k < n; k++) {
      const fa = frames[k];
      const fb = frames[k + 1];
      const a = vert(fa, u0, y0);
      const b = vert(fa, u1, y1);
      const c = vert(fb, u1, y1);
      const d = vert(fb, u0, y0);
      const na = [fa.lx * nu, ny, fa.lz * nu];
      const nb = [fb.lx * nu, ny, fb.lz * nu];
      // Wind so the geometric normal agrees with the profile normal.
      const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
      const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
      const flip = cr[0] * na[0] + cr[1] * na[1] + cr[2] * na[2] < 0;
      const quad = flip ? [[a, na, fa, along], [c, nb, fb, along + len], [b, na, fa, along + len], [a, na, fa, along], [d, nb, fb, along], [c, nb, fb, along + len]]
        : [[a, na, fa, along], [b, na, fa, along + len], [c, nb, fb, along + len], [a, na, fa, along], [c, nb, fb, along + len], [d, nb, fb, along]];
      for (const [p, nn, f, v] of quad) {
        pos.push(...p);
        nor.push(...nn);
        uv.push(f.s, v * 4);
      }
    }
    along += len;
  }
  if (caps) {
    for (const [f, sign] of [[frames[0], -1], [frames[n], 1]]) {
      const nn = [f.dx * sign, 0, f.dz * sign];
      const c0 = vert(f, profile[0][0], profile[0][1]);
      for (let i = 1; i < profile.length - 1; i++) {
        const tri = [c0, vert(f, profile[i][0], profile[i][1]), vert(f, profile[i + 1][0], profile[i + 1][1])];
        const e1 = tri[1].map((v, j) => v - c0[j]);
        const e2 = tri[2].map((v, j) => v - c0[j]);
        const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
        if (cr[0] * nn[0] + cr[1] * nn[1] + cr[2] * nn[2] < 0) tri.reverse();
        for (const p of tri) {
          pos.push(...p);
          nor.push(...nn);
          uv.push(p[0], p[2]);
        }
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

const BALLAST = [[0.7, 0], [0.47, BALLAST_TOP], [-0.47, BALLAST_TOP], [-0.7, 0]];
const RAIL = [
  [-0.045, 0], [0.045, 0], [0.045, 0.012], [0.012, 0.02], [0.012, 0.055], [0.028, 0.06],
  [0.028, 0.08], [-0.028, 0.08], [-0.028, 0.06], [-0.012, 0.055], [-0.012, 0.02], [-0.045, 0.012],
].map(([u, y]) => [u, y + RAIL_TOP - 0.08]);

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

function abutments(kit, b) {
  for (const [x0, x1] of [[b.x0 - 0.85, b.x0 + 0.08], [b.x1 - 0.08, b.x1 + 0.85]]) {
    kit.box('stone', '#a99f8f', I, x1 - x0, 1.1, 1.7, (x0 + x1) / 2, -0.45, b.z);
    kit.box('stone', '#c4baa8', I, x1 - x0 + 0.06, 0.05, 1.76, (x0 + x1) / 2, 0.11, b.z);
  }
}

function trussBridge(kit, b) {
  const red = '#7d3a2c';
  const dark = shade(red, 0.75);
  const L = b.x1 - b.x0;
  const panels = 4;
  const pw = L / panels;
  const yb = 0.04;
  const yt = 1.52;
  const hw = 0.62;
  for (const side of [-1, 1]) {
    const z = b.z + side * hw;
    kit.beam('paint', red, I, v3(b.x0 - 0.05, yb, z), v3(b.x1 + 0.05, yb, z), 0.12, 0.08);
    kit.beam('paint', red, I, v3(b.x0 + pw / 2, yt, z), v3(b.x1 - pw / 2, yt, z), 0.1, 0.1);
    for (let i = 0; i < panels; i++) {
      const xa = b.x0 + i * pw;
      kit.beam('paint', red, I, v3(xa, yb, z), v3(xa + pw / 2, yt, z), 0.07, 0.06);
      kit.beam('paint', red, I, v3(xa + pw / 2, yt, z), v3(xa + pw, yb, z), 0.07, 0.06);
      if (i > 0) kit.beam('paint', red, I, v3(xa, yb, z), v3(xa, yt, z), 0.04, 0.04);
    }
  }
  for (let i = 0; i < panels; i++) {
    const xm = b.x0 + (i + 0.5) * pw;
    kit.beam('paint', red, I, v3(xm, yt, b.z - hw), v3(xm, yt, b.z + hw), 0.06, 0.05);
    if (i < panels - 1) {
      kit.beam('paint', dark, I, v3(xm, yt, b.z - hw), v3(xm + pw, yt, b.z + hw), 0.03);
      kit.beam('paint', dark, I, v3(xm, yt, b.z + hw), v3(xm + pw, yt, b.z - hw), 0.03);
    }
  }
  for (let i = 0; i <= panels; i++) kit.box('paint', dark, I, 0.08, 0.1, hw * 2 + 0.06, b.x0 + i * pw, 0.05, b.z);
  for (const s of [-1, 1]) kit.box('paint', dark, I, L + 0.1, 0.07, 0.07, b.x, 0.085, b.z + s * (GAUGE / 2));
  abutments(kit, b);
}

function girderBridge(kit, b) {
  const steel = '#4d5a5f';
  const rail = '#2e3438';
  const L = b.x1 - b.x0;
  for (const s of [-1, 1]) {
    const z = b.z + s * 0.36;
    kit.box('paint', steel, I, L + 0.1, 0.34, 0.04, b.x, -0.05, z);
    kit.box('paint', steel, I, L + 0.1, 0.03, 0.16, b.x, 0.105, z);
    kit.box('paint', steel, I, L + 0.1, 0.03, 0.16, b.x, -0.205, z);
    for (let x = b.x0 + 0.16; x < b.x1 - 0.1; x += 0.3) kit.box('paint', steel, I, 0.025, 0.3, 0.04, x, -0.05, z + s * 0.035);
    kit.box('wood', '#6b5a48', I, L, 0.03, 0.2, b.x, 0.11, b.z + s * 0.52);
    for (let i = 0; i <= 6; i++) kit.cyl('metal', rail, I, 0.012, 0.012, 0.4, b.x0 + (L * i) / 6, 0.32, b.z + s * 0.6, 6);
    for (const y of [0.32, 0.51]) kit.beam('metal', rail, I, v3(b.x0, y, b.z + s * 0.6), v3(b.x1, y, b.z + s * 0.6), 0.02);
  }
  kit.box('stone', '#a49a8a', I, 0.5, 0.8, 1.15, b.x, -0.62, b.z);
  kit.box('stone', '#c4baa8', I, 0.56, 0.05, 1.2, b.x, -0.2, b.z);
  abutments(kit, b);
}

function roadBridge(kit) {
  const b = ROAD_BRIDGE;
  const half = b.span;
  const arch = 1.4;
  const base = -0.95;
  const shape = new THREE.Shape();
  shape.moveTo(-half, base);
  shape.lineTo(-arch, base);
  shape.absellipse(0, base, arch, 0.78, Math.PI, 0, true);
  shape.lineTo(half, base);
  shape.lineTo(half, 0.04);
  shape.lineTo(-half, 0.04);
  shape.lineTo(-half, base);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: b.width, bevelEnabled: false, curveSegments: 20 });
  kit.add('stone', geo, '#b6aa96', mat(b.x, 0, b.z - b.width / 2));
  kit.box('paint', '#5e5c5a', I, half * 2, 0.02, b.width - 0.2, b.x, 0.05, b.z);
  for (const s of [-1, 1]) {
    kit.box('stone', '#b6aa96', I, half * 2, 0.16, 0.1, b.x, 0.12, b.z + s * (b.width / 2 - 0.05));
    kit.box('stone', '#d0c6b4', I, half * 2 + 0.04, 0.03, 0.13, b.x, 0.215, b.z + s * (b.width / 2 - 0.05));
  }
}

// Level crossing with half barriers that drop while the train approaches or occupies it.
function levelCrossing(kit, group) {
  const x = CROSSING.x;
  const z = FRONT_Z;
  const deckTop = RAIL_TOP - 0.005;
  kit.box('wood', '#7b6a55', I, CROSSING.width, deckTop - BALLAST_TOP, 1.5, x, (deckTop + BALLAST_TOP) / 2, z);
  for (const [zEdge, ry] of [[z - 0.75, Math.PI / 2], [z + 0.75, -Math.PI / 2]]) {
    const tri = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0, deckTop)]);
    const geo = new THREE.ExtrudeGeometry(tri, { depth: CROSSING.width, bevelEnabled: false });
    kit.add('paint', geo, '#5e5c5a', mat(x - (Math.sign(ry) * CROSSING.width) / 2, 0, zEdge, ry));
  }
  const armGeo = new THREE.BoxGeometry(1.0, 0.04, 0.035).translate(0.5, 0, 0);
  const armMat = new THREE.MeshStandardMaterial({ map: stripeTexture(), roughness: 0.6 });
  const lamps = [0, 1].map(() => new THREE.MeshStandardMaterial({ color: '#4a1410', emissive: '#ff3a1e', emissiveIntensity: 0 }));
  const lampGeo = new THREE.SphereGeometry(0.035, 10, 8);
  const gates = [];
  for (const [px, pz, yaw] of [[x - 0.72, z - 1.2, 0], [x + 0.72, z + 1.2, Math.PI]]) {
    kit.cyl('paint', '#ece7da', I, 0.028, 0.034, 0.9, px, 0.45, pz, 8);
    kit.box('paint', '#2b2b2b', I, 0.11, 0.2, 0.09, px, 0.56, pz);
    for (const rz of [0.62, -0.62]) kit.box('paint', '#f4f0e6', I, 0.36, 0.055, 0.012, px, 0.84, pz, 0, 0, rz);
    const pivot = new THREE.Group();
    pivot.position.set(px, 0.6, pz);
    pivot.rotation.y = yaw;
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.castShadow = true;
    pivot.add(arm);
    lamps.forEach((m, i) => {
      for (const side of [-1, 1]) {
        const lamp = new THREE.Mesh(lampGeo, m);
        lamp.position.set(px + (i ? 0.035 : -0.035), 0.7, pz + side * 0.05);
        group.add(lamp);
      }
    });
    group.add(pivot);
    gates.push(arm);
  }
  const train = TRAIN.cars;
  const front = train[0].half;
  const rear = train.at(-1).offset + train.at(-1).half;
  const L = TRACK.length;
  const closedFor = (s) => (((CROSSING.s - (s - rear - 0.4)) % L) + L) % L < front + rear + 0.4 + 3.2;
  let angle = Math.PI / 2;
  let time = 0;
  return {
    update(s, dt) {
      const closed = closedFor(s);
      const target = closed ? 0 : Math.PI / 2;
      angle += Math.sign(target - angle) * Math.min(Math.abs(target - angle), dt * 1.5);
      time += dt;
      for (const arm of gates) arm.rotation.z = angle;
      const blinking = closed || angle < Math.PI / 2 - 1e-3;
      const phase = Math.floor(time * 2.6) % 2;
      lamps.forEach((m, i) => (m.emissiveIntensity = blinking && phase === i ? 3 : 0));
    },
    reset(s) {
      angle = closedFor(s) ? 0 : Math.PI / 2;
      time = 0;
      this.update(s, 0);
    },
  };
}

export function buildTrack(kit) {
  const group = new THREE.Group();
  const L = TRACK.length;
  const { front, back } = BRIDGES;
  const gravel = gravelTexture();
  const ballastMat = new THREE.MeshStandardMaterial({ map: gravel, bumpMap: gravel, bumpScale: 2, roughness: 0.95 });
  for (const [s0, s1] of [[front.s1, back.s0], [back.s1, front.s0 + L]]) {
    const ballast = new THREE.Mesh(sweep(s0, s1, BALLAST, false, { caps: true, step: 0.2 }), ballastMat);
    ballast.receiveShadow = true;
    group.add(ballast);
  }
  for (const u of [-GAUGE / 2, GAUGE / 2]) kit.add('metal', sweep(0, L, RAIL, true, { uOffset: u }), '#8f8b85');

  const count = Math.round(L / 0.29);
  const sleepers = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.12, 0.05, 0.84),
    new THREE.MeshStandardMaterial({ color: '#6a5442', map: grainTexture(256, 256, 8), roughness: 0.85 }),
    count,
  );
  const m = new THREE.Matrix4();
  for (let i = 0; i < count; i++) {
    const p = TRACK.sample((i / count) * L);
    m.makeRotationY(Math.atan2(-p.dz, p.dx)).setPosition(p.x, BALLAST_TOP + 0.025, p.z);
    sleepers.setMatrixAt(i, m);
  }
  sleepers.castShadow = true;
  sleepers.receiveShadow = true;
  group.add(sleepers);

  trussBridge(kit, front);
  girderBridge(kit, back);
  roadBridge(kit);
  const crossing = levelCrossing(kit, group);
  return { group, crossing };
}
