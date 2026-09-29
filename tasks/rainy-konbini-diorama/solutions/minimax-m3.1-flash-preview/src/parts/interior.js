import * as THREE from 'three';
import { P } from '../palette.js';
import {
  make, slab, BOX, CYL, PLANE, toon, flat, textured,
  aisleTexture, posterTexture, fridgeTexture, canvasTexture,
} from '../kit.js';
import { STORE } from './store.js';

// Everything behind the glass. Bright, warm and dense enough that the shop
// reads as a real convenience store rather than an empty box.
export function buildInterior(scene) {
  const group = new THREE.Group();
  group.name = 'interior';

  const x0 = STORE.x0 + 0.24;
  const x1 = STORE.x1 - 0.24;
  const z0 = STORE.z0 + 0.24;
  const z1 = STORE.z1 - 0.24;
  const floorY = STORE.floorTop;
  const ceilY = 3.2;

  // ---- room --------------------------------------------------------------
  group.add(slab(x0, x1, 0, floorY, z0, z1, toon(P.floor), { receive: true, outline: false }));
  group.add(slab(x0, x1, ceilY, ceilY + 0.14, z0, z1, toon(P.ceiling)));
  group.add(slab(x0 - 0.02, x0, floorY, ceilY, z0, z1, toon(P.wallInShade), { outline: false }));
  group.add(slab(x1, x1 + 0.02, floorY, ceilY, z0, z1, toon(P.wallInShade), { outline: false }));
  group.add(slab(x0, x1, floorY, ceilY, z0 - 0.02, z0, toon(P.wallIn), { outline: false }));

  // Recessed ceiling light panels — the main reason the shop reads as bright.
  for (const lz of [-2.7, -4.7, -6.7]) {
    for (const lx of [-3.9, -0.5]) {
      group.add(slab(lx - 1.25, lx + 1.25, ceilY - 0.06, ceilY, lz - 0.22, lz + 0.22, flat(0xfff3dc), { outline: false }));
      group.add(slab(lx - 1.32, lx + 1.32, ceilY, ceilY + 0.05, lz - 0.29, lz + 0.29, toon(0xd8d3c6), { outline: false }));
    }
  }

  // ---- goods instancing --------------------------------------------------
  // Small merchandise is drawn with a handful of InstancedMeshes: one draw
  // call each instead of several hundred.
  const buckets = new Map();
  function stock(kind, w, h, d, x, y, z, color, ry = 0) {
    const key = `${kind}|${w}|${h}|${d}`;
    if (!buckets.has(key)) buckets.set(key, { w, h, d, items: [] });
    buckets.get(key).items.push({ x, y, z, color, ry });
  }
  const pick = (seed) => P.goods[seed % P.goods.length];

  // Three gondola runs running parallel to the shopfront.
  const runZ = [-4.25, -5.55, -6.85];
  const runX0 = -4.95;
  const runX1 = -0.35;
  for (const rz of runZ) {
    // Uprights and shelves.
    for (let s = 0; s < 5; s += 1) {
      const px = runX0 + (s / 4) * (runX1 - runX0);
      group.add(slab(px - 0.035, px + 0.035, floorY, floorY + 1.78, rz - 0.31, rz + 0.31, toon(P.shelfEdge), { outline: false }));
    }
    for (let lvl = 0; lvl < 4; lvl += 1) {
      const sy = floorY + 0.28 + lvl * 0.42;
      group.add(slab(runX0, runX1, sy, sy + 0.05, rz - 0.3, rz + 0.3, toon(P.shelf), { receive: true }));
      group.add(slab(runX0, runX1, sy - 0.055, sy, rz + 0.26, rz + 0.32, toon(P.shelfEdge), { outline: false }));
      // Price rail.
      group.add(slab(runX0, runX1, sy - 0.02, sy + 0.05, rz + 0.31, rz + 0.34, flat(0xf6f2e4), { outline: false }));
      const cols = 24;
      for (let c = 0; c < cols; c += 1) {
        const cx = runX0 + 0.14 + (c / (cols - 1)) * (runX1 - runX0 - 0.28);
        const jitter = ((lvl * 7 + c * 3) % 5) - 2;
        stock('shelf', 0.17, 0.31 + jitter * 0.014, 0.3, cx, sy + 0.19, rz, pick(lvl * 13 + c * 5 + runZ.indexOf(rz) * 31));
      }
    }
    // Topper with the category sign.
    group.add(slab(runX0, runX1, floorY + 1.78, floorY + 1.86, rz - 0.31, rz + 0.31, toon(P.shelf)));
  }

  // Drink fridge wall along the back.
  const fx0 = -4.9;
  const fx1 = -0.5;
  const fz = z0 + 0.32;
  group.add(slab(fx0, fx1, floorY, floorY + 2.05, fz, fz + 0.62, toon(0xdfe4ec), { cast: true }));
  const fridgeMap = fridgeTexture();
  const fridgeMat = flat(0xffffff);
  fridgeMat.map = fridgeMap;
  for (let d = 0; d < 5; d += 1) {
    const dx0 = fx0 + 0.08 + d * ((fx1 - fx0 - 0.16) / 5);
    const dx1 = dx0 + (fx1 - fx0 - 0.16) / 5 - 0.06;
    group.add(make(PLANE(dx1 - dx0, 1.5), fridgeMat, { pos: [(dx0 + dx1) / 2, floorY + 1.15, fz + 0.02], outline: false }));
    group.add(slab(dx0 - 0.05, dx1 + 0.05, floorY + 0.32, floorY + 1.92, fz + 0.02, fz + 0.08, toon(0x59627a), { outline: false }));
    group.add(slab(dx0, dx1, floorY + 2.02, floorY + 2.14, fz, fz + 0.62, toon(P.trim), { outline: false }));
  }

  // Chilled bento case on the west wall.
  const bx = x0 + 0.34;
  group.add(slab(x0, bx, floorY, floorY + 1.75, -6.7, -3.4, toon(0xe4e9f0), { cast: true }));
  for (let lvl = 0; lvl < 3; lvl += 1) {
    const sy = floorY + 0.32 + lvl * 0.46;
    group.add(slab(x0, bx, sy, sy + 0.05, -6.62, -3.48, toon(P.shelf), { outline: false }));
    for (let i = 0; i < 14; i += 1) {
      const bz = -6.5 + i * 0.22;
      stock('bento', 0.3, 0.14, 0.2, x0 + 0.18, sy + 0.12, bz, pick(lvl * 9 + i * 7));
    }
  }
  group.add(slab(x0, bx + 0.03, floorY + 1.72, floorY + 1.86, -6.75, -3.35, toon(P.orange), { outline: false }));
  group.add(slab(bx, bx + 0.06, floorY + 0.2, floorY + 1.72, -6.72, -6.62, toon(0x59627a), { outline: false }));

  // Magazine rack beside the door.
  group.add(slab(x0, x0 + 0.3, floorY, floorY + 1.45, -3.2, -1.95, toon(0xe9edf3), { cast: true }));
  for (let lvl = 0; lvl < 4; lvl += 1) {
    const sy = floorY + 0.3 + lvl * 0.32;
    group.add(slab(x0 + 0.02, x0 + 0.3, sy, sy + 0.04, -3.16, -1.99, toon(0xc9d0da), { outline: false }));
    for (let i = 0; i < 9; i += 1) {
      const mz = -3.1 + i * 0.14;
      stock('mag', 0.16, 0.24, 0.05, x0 + 0.2, sy + 0.15, mz, pick(lvl * 5 + i * 11), 0);
    }
  }

  // Oden hot-food counter facing the window.
  const ox0 = -4.5;
  const ox1 = -2.3;
  const oz = -2.55;
  group.add(slab(ox0, ox1, floorY, floorY + 0.86, oz, oz + 0.62, toon(0xdfe3ea), { cast: true }));
  group.add(slab(ox0 - 0.05, ox1 + 0.05, floorY + 0.86, floorY + 0.94, oz - 0.05, oz + 0.67, toon(0xb9c1cd)));
  group.add(slab(ox0 - 0.05, ox1 + 0.05, floorY + 0.94, floorY + 0.97, oz - 0.05, oz + 0.67, flat(P.warm, { opacity: 0.9 }), { outline: false }));
  // Pots and a sneeze guard.
  for (let i = 0; i < 4; i += 1) {
    group.add(make(CYL(0.15, 0.15, 0.2, 12), toon(0xc7ccd6), { pos: [ox0 + 0.36 + i * 0.5, floorY + 1.06, oz + 0.3] }));
    group.add(make(CYL(0.12, 0.12, 0.02, 12), flat(P.warmDeep), { pos: [ox0 + 0.36 + i * 0.5, floorY + 1.15, oz + 0.3], outline: false }));
  }
  group.add(slab(ox0 - 0.05, ox1 + 0.05, floorY + 0.97, floorY + 1.52, oz + 0.62, oz + 0.66, flat(0xd6ecff, { opacity: 0.16 }), { outline: false }));
  for (const px of [ox0, ox0 + 0.73, ox0 + 1.46, ox1 + 0.05]) {
    group.add(slab(px - 0.03, px + 0.03, floorY + 0.94, floorY + 1.54, oz + 0.6, oz + 0.68, toon(0xc2c9d4), { outline: false }));
  }
  // Warming lamps over the oden.
  for (const px of [ox0 + 0.6, ox0 + 1.6]) {
    group.add(slab(px - 0.3, px + 0.3, floorY + 1.72, floorY + 1.8, oz + 0.1, oz + 0.5, flat(0xffcf90), { outline: false }));
  }
  group.add(slab(ox0 - 0.05, ox1 + 0.05, floorY + 1.8, floorY + 1.84, oz + 0.06, oz + 0.54, toon(0x6d7684), { outline: false }));

  // Chest freezer by the door.
  group.add(slab(-1.85, -0.7, floorY, floorY + 0.78, -2.7, -1.98, toon(0xeceff4), { cast: true }));
  group.add(slab(-1.88, -0.67, floorY + 0.78, floorY + 0.86, -2.73, -1.95, toon(0xc3cad5)));
  group.add(slab(-1.8, -0.75, floorY + 0.86, floorY + 0.88, -2.66, -2.02, flat(0xcfe4f2, { opacity: 0.3 }), { outline: false }));
  group.add(slab(-1.85, -0.7, floorY + 0.4, floorY + 0.62, -1.96, -1.9, flat(0x6fa8dc, { opacity: 0.9 }), { outline: false }));

  // Checkout counter with register, coffee machine and a pastry case.
  const cx0 = 0.15;
  const cx1 = 1.26;
  const cz0 = -4.5;
  const cz1 = -2.4;
  group.add(slab(cx0, cx1, floorY, floorY + 0.98, cz0, cz1, toon(P.counter), { cast: true }));
  group.add(slab(cx0 - 0.06, cx1 + 0.04, floorY + 0.98, floorY + 1.06, cz0 - 0.06, cz1 + 0.06, toon(0xc6ccd6)));
  group.add(slab(cx0 - 0.3, cx0, floorY, floorY + 0.72, cz1 - 1.1, cz1, toon(0xdde2e9), { outline: false }));
  // Register.
  group.add(slab(0.35, 0.78, floorY + 1.06, floorY + 1.34, -3.3, -2.9, toon(0x2f3746)));
  group.add(make(PLANE(0.42, 0.28), flat(0x9fe8dc), { pos: [0.565, floorY + 1.44, -3.12], rot: [-0.35, 0, 0], outline: false }));
  // Coffee machine.
  group.add(slab(0.86, 1.2, floorY + 1.06, floorY + 1.62, -4.2, -3.82, toon(0x2b3340)));
  group.add(slab(0.9, 1.16, floorY + 1.2, floorY + 1.5, -3.82, -3.79, flat(0xffb257), { outline: false }));
  group.add(make(CYL(0.05, 0.05, 0.1, 8), toon(0x59627a), { pos: [0.96, floorY + 1.12, -3.76] }));
  group.add(make(CYL(0.05, 0.05, 0.1, 8), toon(0x59627a), { pos: [1.1, floorY + 1.12, -3.76] }));
  // Pastry case.
  group.add(slab(0.5, 1.16, floorY + 1.06, floorY + 1.42, -3.9, -3.4, flat(0xdcecf8, { opacity: 0.22 }), { outline: false }));
  group.add(slab(0.48, 1.18, floorY + 1.06, floorY + 1.1, -3.92, -3.38, toon(0xb9c1cd), { outline: false }));
  for (let i = 0; i < 5; i += 1) {
    group.add(slab(0.56 + i * 0.12, 0.64 + i * 0.12, floorY + 1.1, floorY + 1.18, -3.8, -3.5, toon(P.goods[i * 3 + 2]), { outline: false }));
  }
  // Hot cup shelf behind the till.
  group.add(slab(1.0, 1.24, floorY + 1.2, floorY + 1.9, -5.6, -4.7, toon(0xe4e8ee), { outline: false }));
  for (let i = 0; i < 4; i += 1) {
    group.add(slab(0.96, 1.0, floorY + 1.3 + i * 0.16, floorY + 1.34 + i * 0.16, -5.55, -4.75, toon(0xc4cbd6), { outline: false }));
  }

  // Back-room door and storage.
  group.add(slab(0.3, 1.22, floorY, floorY + 2.05, z0 - 0.02, z0 + 0.06, toon(0xd7dce4), { outline: false }));
  group.add(make(PLANE(0.5, 0.28), flat(0x3a4354), { pos: [0.76, floorY + 1.72, z0 + 0.08], outline: false }));
  group.add(slab(0.28, 0.5, floorY + 0.94, floorY + 1.06, z0 + 0.05, z0 + 0.12, toon(0x8f97a6), { outline: false }));
  group.add(slab(-0.4, 0.2, floorY, floorY + 1.9, z0 + 0.04, z0 + 0.42, toon(0xdde2ea), { cast: true }));
  for (let i = 0; i < 3; i += 1) {
    group.add(slab(-0.42, 0.22, floorY + 0.4 + i * 0.55, floorY + 0.45 + i * 0.55, z0 + 0.02, z0 + 0.44, toon(0xc6ccd6), { outline: false }));
    for (let j = 0; j < 3; j += 1) {
      stock('box', 0.3, 0.24, 0.24, -0.28 + j * 0.32, floorY + 0.58 + i * 0.55, z0 + 0.22, pick(i * 3 + j + 2));
    }
  }

  // Floor guidance: tactile paving from the door along the main aisle.
  group.add(slab(0.15, 0.45, floorY, floorY + 0.015, -3.9, z1 - 0.3, toon(P.floorGuide), { outline: false }));
  group.add(slab(-4.3, 0.45, floorY, floorY + 0.015, -3.9, -3.6, toon(P.floorGuide), { outline: false }));
  const arrowTex = canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(60,70,90,0.55)';
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.18);
    ctx.lineTo(w * 0.82, h * 0.5);
    ctx.lineTo(w * 0.64, h * 0.5);
    ctx.lineTo(w * 0.64, h * 0.84);
    ctx.lineTo(w * 0.36, h * 0.84);
    ctx.lineTo(w * 0.36, h * 0.5);
    ctx.lineTo(w * 0.18, h * 0.5);
    ctx.closePath();
    ctx.fill();
  });
  const arrowMat = textured(arrowTex, { opacity: 0.9 });
  for (const [ax, az, ry] of [[0.3, -2.5, 0], [-1.6, -3.75, Math.PI / 2], [-3.4, -3.75, Math.PI / 2]]) {
    group.add(make(PLANE(0.5, 0.5), arrowMat, { pos: [ax, floorY + 0.02, az], rot: [-Math.PI / 2, 0, -ry], outline: false }));
  }

  // ---- signage and posters ------------------------------------------------
  const aisleLabels = [['お菓子', P.orange], ['のりもの', 0x3f8ec4], ['おにぎり', 0x59b96a]];
  runZ.forEach((rz, i) => {
    const [label, color] = aisleLabels[i];
    const mat = new THREE.MeshBasicMaterial({ map: aisleTexture(label, color), side: THREE.DoubleSide });
    group.add(slab(runX0 - 0.05, runX1 + 0.05, 2.34, 2.62, rz - 0.03, rz + 0.03, mat, { outline: false }));
    group.add(slab(runX0 - 0.05, runX1 + 0.05, 2.62, 2.68, rz - 0.04, rz + 0.04, toon(0xd0d5de), { outline: false }));
    for (const hx of [runX0 + 0.3, runX1 - 0.3]) {
      group.add(make(CYL(0.015, 0.015, 0.72, 6), toon(0xb0b7c2), { pos: [hx, 3.0, rz], outline: false }));
    }
  });

  for (const [px, kind] of [[-3.6, 'sale'], [-1.4, 'coffee']]) {
    const mat = flat(0xffffff);
    mat.map = posterTexture(kind);
    group.add(make(PLANE(0.9, 1.2), mat, { pos: [px, 2.55, z0 + 0.03], outline: false }));
  }
  for (const [px, py, kind] of [[-3.0, 2.5, 'bento'], [1.05, 2.4, 'milk']]) {
    const mat = flat(0xffffff);
    mat.map = posterTexture(kind);
    group.add(make(PLANE(0.7, 0.95), mat, { pos: [px, py, -3.15], outline: false }));
  }

  // ---- lights -------------------------------------------------------------
  // The interior is deliberately over-lit relative to the street: the whole
  // point of the scene is the warm/cool contrast seen through the glass. The
  // range is kept tight so the warmth does not flood the pavement outside.
  const lamps = [
    [-3.9, 2.9, -2.7, 12], [-0.5, 2.9, -2.7, 11],
    [-2.2, 2.9, -5.3, 13], [-2.2, 2.9, -7.2, 10],
    [-3.5, 1.7, -2.2, 5],
  ];
  for (const [lx, ly, lz, power] of lamps) {
    const l = new THREE.PointLight(0xffd49a, power, 7, 1.5);
    l.position.set(lx, ly, lz);
    group.add(l);
  }
  const ceilingGlow = new THREE.PointLight(0xffe2b4, 8, 7, 1.6);
  ceilingGlow.position.set(-0.3, 1.4, -2.0);
  group.add(ceilingGlow);

  // ---- realise the instanced stock ---------------------------------------
  for (const [, bucket] of buckets) {
    const geo = BOX(bucket.w, bucket.h, bucket.d);
    const mat = toon(0xffffff);
    const inst = new THREE.InstancedMesh(geo, mat, bucket.items.length);
    inst.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3(1, 1, 1);
    const col = new THREE.Color();
    bucket.items.forEach((it, i) => {
      e.set(0, it.ry || 0, 0);
      q.setFromEuler(e);
      pos.set(it.x, it.y, it.z);
      m.compose(pos, q, scl);
      inst.setMatrixAt(i, m);
      col.setHex(it.color);
      inst.setColorAt(i, col);
    });
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.frustumCulled = false;
    group.add(inst);
  }

  scene.add(group);
  return group;
}
