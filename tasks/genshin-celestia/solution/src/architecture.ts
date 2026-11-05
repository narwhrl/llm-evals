import * as THREE from 'three';
import { GEO, Kit, MAT, T, band, lathe, sweep, type GeoKey, type MatKey } from './kit';
import { rng } from './noise';

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);

/** Places `n` copies around a circle; local +Z faces outward. */
function ring(
  kit: Kit, geo: GeoKey, mat: MatKey, n: number, r: number, y: number,
  sx: number, sy: number, sz: number, phase = 0,
): void {
  for (let k = 0; k < n; k++) {
    const a = phase + (k / n) * TAU;
    kit.inst(geo, mat, T(r * Math.cos(a), y, r * Math.sin(a), sx, sy, sz, Math.PI / 2 - a));
  }
}

/** Drum with an arcade of arched bays, pilasters and a cornice; returns the top height. */
function arcadeDrum(
  kit: Kit, r: number, y: number, h: number, n: number, kind: 'bayRound' | 'bayPointed' | 'bayWindow', coreMat: MatKey = 'ivoryShade',
): number {
  const depth = Math.max(3, r * 0.05);
  kit.inst('cyl', coreMat, T(0, y, 0, r - depth, h + 2, r - depth));
  const w = 2 * (r + depth / 2) * Math.tan(Math.PI / n);
  ring(kit, kind, 'ivory', n, r, y, w * 1.02, h, depth * 5);
  ring(kit, 'cyl', 'ivory', n, r + depth * 0.6, y, depth * 0.45, h, depth * 0.45, Math.PI / n);
  kit.mesh(band(r - depth, r + depth * 1.2, y + h, h * 0.08), 'ivory');
  kit.mesh(band(r + depth * 1.2, r + depth * 1.35, y + h + h * 0.015, h * 0.04), 'gold');
  kit.mesh(band(r - depth, r + depth * 1.6, y + h * 1.08, h * 0.025), 'ivory');
  return y + h * 1.105;
}

/** Ring of free-standing columns with a continuous entablature. */
function colonnade(kit: Kit, r: number, y: number, h: number, n: number, colR: number, roofed = true): number {
  ring(kit, 'cyl', 'ivory', n, r, y, colR, h, colR);
  ring(kit, 'cyl', 'ivory', n, r, y, colR * 1.45, colR * 0.9, colR * 1.45);
  ring(kit, 'cyl', 'ivory', n, r, y + h - colR * 0.8, colR * 1.4, colR * 0.8, colR * 1.4);
  if (roofed) {
    kit.mesh(band(r - colR * 2.2, r + colR * 2.2, y + h, colR * 2.2), 'ivory');
    kit.mesh(band(r + colR * 2.2, r + colR * 2.5, y + h + colR * 0.5, colR * 1.1), 'gold');
  }
  return y + h + colR * 2.2;
}

/** Slender spire: octagonal shaft, colonnette crown, needle roof and gold finial. */
export function spire(kit: Kit, x: number, y: number, z: number, r: number, h: number, ruined = false, seed = 1): void {
  kit.within(T(x, y, z), () => {
    kit.inst('cyl8', 'ivoryWarm', T(0, -10, 0, r * 1.45, h * 0.12 + 10, r * 1.45));
    const shaftH = h * 0.55;
    if (ruined) {
      kit.mesh(brokenShaft(r, shaftH, seed), 'ivoryWarm', T(0, h * 0.12, 0));
      return;
    }
    kit.inst('cyl8', 'ivory', T(0, h * 0.12, 0, r, shaftH, r));
    const top = h * 0.12 + shaftH;
    ring(kit, 'bayWindow', 'ivory', 8, r * 0.95, top - shaftH * 0.3, 2 * r * Math.tan(Math.PI / 8) * 1.05, shaftH * 0.25, 2, Math.PI / 8);
    kit.inst('cyl', 'gold', T(0, top, 0, r * 1.15, r * 0.22, r * 1.15));
    ring(kit, 'cyl', 'ivory', 8, r * 0.8, top + r * 0.22, r * 0.1, h * 0.08, r * 0.1);
    kit.inst('cyl', 'ivory', T(0, top + r * 0.22 + h * 0.08, 0, r * 1.05, r * 0.25, r * 1.05));
    const roofY = top + r * 0.47 + h * 0.08;
    kit.inst('cone8', 'ivory', T(0, roofY, 0, r * 0.98, h - roofY, r * 0.98));
    kit.inst('sphere', 'gold', T(0, h, 0, r * 0.22));
    kit.inst('cone', 'gold', T(0, h, 0, r * 0.08, h * 0.12, r * 0.08));
  });
}

function brokenShaft(r: number, h: number, seed: number): THREE.BufferGeometry {
  const g = new THREE.CylinderGeometry(r, r * 1.05, h, 8, 6).translate(0, h / 2, 0);
  const p = g.attributes.position as THREE.BufferAttribute;
  const rand = rng(seed);
  const cuts = Array.from({ length: 8 }, () => rand());
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    if (y < h * 0.99) continue;
    const a = (Math.atan2(p.getZ(i), p.getX(i)) / TAU + 1) % 1;
    const c = cuts[Math.floor(a * 8) % 8];
    p.setY(i, y - h * (0.08 + 0.45 * c * c) - (Math.hypot(p.getX(i), p.getZ(i)) < r * 0.5 ? h * 0.2 : 0));
  }
  g.computeVertexNormals();
  return g;
}

/** Domed rotunda temple with peristyle and gold finial. */
export function rotunda(kit: Kit, x: number, y: number, z: number, r: number, h: number): void {
  kit.within(T(x, y, z), () => {
    kit.inst('cyl', 'ivoryWarm', T(0, -12, 0, r * 1.35, 12 + h * 0.06, r * 1.35));
    kit.inst('cyl', 'ivory', T(0, h * 0.06, 0, r * 1.22, h * 0.04, r * 1.22));
    kit.inst('cyl', 'ivoryShade', T(0, h * 0.1, 0, r * 0.8, h * 0.62, r * 0.8));
    const top = colonnade(kit, r, h * 0.1, h * 0.55, 14, r * 0.07);
    kit.inst('cyl', 'ivory', T(0, top, 0, r * 0.9, h * 0.1, r * 0.9));
    kit.inst('dome', 'ivory', T(0, top + h * 0.1, 0, r * 0.86, r * 0.75, r * 0.86));
    kit.mesh(band(r * 0.86, r * 0.92, top + h * 0.08, h * 0.03), 'gold');
    const dTop = top + h * 0.1 + r * 0.75;
    kit.inst('cyl', 'ivory', T(0, dTop - 1, 0, r * 0.2, r * 0.28, r * 0.2));
    kit.inst('dome', 'gold', T(0, dTop + r * 0.27, 0, r * 0.2, r * 0.16, r * 0.2));
    kit.inst('cone', 'gold', T(0, dTop + r * 0.4, 0, r * 0.05, r * 0.6, r * 0.05));
  });
}

/** Semicircular exedra colonnade facing direction `face` (radians). */
export function exedra(kit: Kit, x: number, y: number, z: number, r: number, h: number, face: number, broken = 0, seed = 2): void {
  const rand = rng(seed);
  kit.within(T(x, y, z, 1, 1, 1, Math.PI / 2 - face), () => {
    kit.inst('cyl', 'ivoryWarm', T(0, -10, 0, r * 1.18, 11, r * 1.18));
    const n = 13;
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k < n; k++) {
      const a = Math.PI * (0.05 + (0.9 * k) / (n - 1));
      const px = r * Math.cos(a), pz = -r * Math.sin(a);
      pts.push(new THREE.Vector3(px, h, pz));
      const ch = broken && rand() < broken ? h * (0.2 + 0.5 * rand()) : h;
      kit.inst('cyl', 'ivory', T(px, 0, pz, h * 0.05, ch, h * 0.05));
      kit.inst('box', 'ivory', T(px, 0, pz, h * 0.14, h * 0.05, h * 0.14));
      if (!broken && ch === h) kit.inst('box', 'ivory', T(px, h - h * 0.04, pz, h * 0.13, h * 0.05, h * 0.13));
    }
    if (!broken) {
      kit.mesh(sweep(pts, h * 0.14, h * 0.1), 'ivory');
      kit.mesh(sweep(pts.map((p) => p.clone().setY(h * 1.1)), h * 0.15, h * 0.025), 'gold');
    }
    // central obelisk with a small gold ring
    kit.inst('cyl8', 'ivory', T(0, 0, -r * 0.15, h * 0.12, h * 1.7, h * 0.12));
    kit.inst('cone8', 'ivory', T(0, h * 1.7, -r * 0.15, h * 0.12, h * 0.5, h * 0.12));
    kit.mesh(new THREE.TorusGeometry(h * 0.35, h * 0.025, 6, 40), 'gold', T(0, h * 1.35, -r * 0.15));
  });
}

/** Monumental pointed gate arch straddling a road that runs along local X. */
export function gate(kit: Kit, x: number, y: number, z: number, h: number, ry: number): void {
  kit.within(T(x, y, z, 1, 1, 1, ry), () => {
    kit.inst('bayPointed', 'ivory', T(0, 0, 0, h * 0.95, h, h * 0.12, Math.PI / 2));
    kit.inst('box', 'ivory', T(0, h, 0, h * 0.16, h * 0.06, h * 1.05));
    kit.inst('box', 'gold', T(0, h * 1.06, 0, h * 0.17, h * 0.015, h * 1.06));
    for (const s of [-1, 1]) {
      kit.inst('cyl8', 'ivory', T(0, 0, s * h * 0.47, h * 0.09, h * 1.25, h * 0.09));
      kit.inst('cone8', 'ivory', T(0, h * 1.25, s * h * 0.47, h * 0.09, h * 0.45, h * 0.09));
      kit.inst('sphere', 'gold', T(0, h * 1.7, s * h * 0.47, h * 0.025));
    }
    kit.mesh(new THREE.TorusGeometry(h * 0.22, h * 0.02, 6, 40), 'gold', T(0, h * 0.82, 0, 1, 1, 1, Math.PI / 2));
  });
}

/** Watchtower with an open belfry and a small armillary echoing the great one. */
export function watchtower(kit: Kit, x: number, y: number, z: number, r: number, h: number): void {
  kit.within(T(x, y, z), () => {
    kit.inst('cyl8', 'ivoryWarm', T(0, -10, 0, r * 1.6, 10 + h * 0.06, r * 1.6));
    const top = arcadeDrum(kit, r, h * 0.06, h * 0.5, 8, 'bayWindow', 'ivory');
    kit.inst('cyl8', 'ivory', T(0, top, 0, r * 0.75, h * 0.18, r * 0.75));
    const t2 = colonnade(kit, r * 0.7, top + h * 0.18, h * 0.1, 8, r * 0.06);
    kit.inst('cone8', 'ivory', T(0, t2, 0, r * 0.78, h * 0.34, r * 0.78));
    const c = t2 + h * 0.34 + r * 0.6;
    for (const [rx, rz] of [[0, 0], [Math.PI / 2, 0.4], [0.9, -0.7]]) {
      kit.mesh(new THREE.TorusGeometry(r * 0.75, r * 0.05, 6, 40), 'goldGlow', T(0, c, 0, 1, 1, 1, rz, rx));
    }
    kit.inst('sphere', 'goldGlow', T(0, c, 0, r * 0.18));
  });
}

/** The central sanctum: stacked arcaded drums, satellite spires, lantern and needle spire. Returns armillary centre height. */
export function sanctum(kit: Kit, B: number): number {
  let center = 0;
  kit.within(T(0, B, 0), () => {
    // stepped plinth
    kit.inst('cyl', 'ivoryWarm', T(0, -30, 0, 272, 38, 272));
    kit.inst('cyl', 'ivory', T(0, 8, 0, 247, 10, 247));
    kit.inst('cyl', 'ivory', T(0, 18, 0, 224, 12, 224));
    kit.mesh(band(224, 225.5, 26, 3, 96), 'gold');
    kit.mesh(band(247, 248.5, 13, 3, 96), 'gold');
    colonnade(kit, 260, 8, 40, 60, 3.3);
    // grand stairs on the four avenues
    for (let k = 0; k < 4; k++) {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      for (let s = 0; s < 6; s++) {
        const rr = 262 + s * 9;
        kit.inst('box', 'ivory', T(rr * Math.cos(a), -8, rr * Math.sin(a), 34 - s * 0.5, 8 + 8 * (5 - s) / 5 * 2, 9, Math.PI / 2 - a));
      }
    }

    // tier 1: great arcaded drum
    let y = arcadeDrum(kit, 158, 30, 132, 36, 'bayRound');
    kit.inst('cyl', 'ivory', T(0, y, 0, 154, 14, 154));
    ring(kit, 'cone8', 'ivory', 36, 160, y + 14, 3, 16, 3);
    ring(kit, 'sphere', 'gold', 36, 160, y + 31, 1.6, 1.6, 1.6);
    const roof1 = y + 14;

    // eight satellite spires with flying buttresses
    for (let k = 0; k < 8; k++) {
      const a = Math.PI / 8 + (k * TAU) / 8;
      const c = Math.cos(a), s = Math.sin(a);
      spire(kit, 212 * c, 30, 212 * s, 17, 380);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const rr = THREE.MathUtils.lerp(198, 164, t);
        pts.push(new THREE.Vector3(rr * c, 30 + 220 - 70 * t * t, rr * s));
      }
      kit.mesh(sweep(pts, 6, 9, true), 'ivory');
      kit.mesh(sweep(pts.map((p) => p.clone().setY(p.y + 5)), 6.4, 1.2), 'gold');
    }

    // tier 2: pointed arcade with radial buttress fins
    const t2 = roof1;
    y = arcadeDrum(kit, 114, t2, 150, 24, 'bayPointed');
    for (let k = 0; k < 8; k++) {
      const a = (k * TAU) / 8;
      kit.inst('box', 'ivory', T(126 * Math.cos(a), t2, 126 * Math.sin(a), 7, 170, 30, Math.PI / 2 - a));
      kit.inst('cone8', 'ivory', T(134 * Math.cos(a), t2 + 170, 134 * Math.sin(a), 5, 36, 5));
      kit.inst('sphere', 'gold', T(134 * Math.cos(a), t2 + 207, 134 * Math.sin(a), 2.2));
      const b = a + Math.PI / 8;
      spire(kit, 142 * Math.cos(b), roof1, 142 * Math.sin(b), 6, 90);
    }
    kit.inst('cyl', 'ivory', T(0, y, 0, 110, 12, 110));
    const roof2 = y + 12;

    // tier 3: open peristyle around an inner core
    kit.inst('cyl', 'ivory', T(0, roof2, 0, 96, 10, 96));
    kit.inst('cyl', 'ivoryShade', T(0, roof2 + 10, 0, 56, 230, 56));
    for (const h of [60, 120, 180]) kit.mesh(band(56, 58, roof2 + 10 + h, 4), 'gold');
    y = colonnade(kit, 84, roof2 + 10, 180, 20, 3.8);
    kit.mesh(lathe([[52, y], [93, y], [90, y + 10], [76, y + 22], [62, y + 34], [55, y + 40], [52, y + 40]], 40), 'ivory');
    kit.mesh(band(90.5, 92, y + 6, 3, 64), 'gold');
    const roof3 = y + 40;

    // tier 4: octagonal lantern with lancet windows and corner pinnacles
    kit.inst('cyl8', 'ivory', T(0, roof3, 0, 50, 160, 50, Math.PI / 8));
    ring(kit, 'bayWindow', 'ivory', 8, 46.5, roof3 + 16, 38, 128, 2.5, 0);
    for (let k = 0; k < 8; k++) {
      const a = Math.PI / 8 + (k * TAU) / 8;
      kit.inst('cyl8', 'ivory', T(55 * Math.cos(a), roof3, 55 * Math.sin(a), 4.5, 190, 4.5));
      kit.inst('cone8', 'ivory', T(55 * Math.cos(a), roof3 + 190, 55 * Math.sin(a), 4.5, 34, 4.5));
      kit.inst('sphere', 'gold', T(55 * Math.cos(a), roof3 + 225, 55 * Math.sin(a), 2));
    }
    kit.inst('cyl8', 'gold', T(0, roof3 + 160, 0, 53, 4, 53, Math.PI / 8));
    kit.inst('cyl8', 'ivory', T(0, roof3 + 164, 0, 55, 6, 55, Math.PI / 8));
    const s0 = roof3 + 170;

    // tier 5: needle spire banded with gold, crowned by the armillary
    const sH = 440;
    const prof: [number, number][] = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      prof.push([THREE.MathUtils.lerp(47, 8, Math.pow(t, 0.8)), s0 + sH * t]);
    }
    kit.mesh(lathe([[0, s0], ...prof, [0, s0 + sH]], 8), 'ivory', T(0, 0, 0, 1, 1, 1, Math.PI / 8));
    for (let i = 1; i <= 5; i++) {
      const t = i / 6.5;
      const rr = THREE.MathUtils.lerp(47, 8, Math.pow(t, 0.8));
      kit.mesh(new THREE.TorusGeometry(rr + 1, 2 + (1 - t) * 1.5, 6, 32), 'gold', T(0, s0 + sH * t, 0, 1, 1, 1, 0, Math.PI / 2));
    }
    for (let k = 0; k < 4; k++) {
      const a = (k * TAU) / 4;
      spire(kit, 46 * Math.cos(a), s0, 46 * Math.sin(a), 6, 120);
    }
    kit.inst('cyl', 'gold', T(0, s0 + sH - 10, 0, 6, 60, 6));
    center = s0 + sH + 40;
  });
  return B + center;
}

/**
 * Gold armillary of interlocking rings around the spire tip. Each child ring spins on its own axis.
 */
export function armillary(center: THREE.Vector3): { group: THREE.Group; update: (t: number) => void } {
  const group = new THREE.Group();
  group.position.copy(center);
  const gold = MAT.gold, glow = MAT.goldGlow;
  const spinners: { obj: THREE.Object3D; axis: THREE.Vector3; speed: number }[] = [];

  const add = (obj: THREE.Object3D, tilt: THREE.Euler, axis: THREE.Vector3, speed: number) => {
    const holder = new THREE.Group();
    holder.rotation.copy(tilt);
    holder.add(obj);
    group.add(holder);
    obj.traverse((o) => { o.castShadow = true; });
    spinners.push({ obj, axis, speed });
  };
  const torus = (r: number, tube: number, mat = gold) => new THREE.Mesh(new THREE.TorusGeometry(r, tube, 10, 180), mat);

  // horizon ring (flat in XZ) with tick plates and knobs
  const horizon = new THREE.Group();
  horizon.add(torus(186, 4.2).rotateX(Math.PI / 2), torus(170, 2.2).rotateX(Math.PI / 2));
  const ticks = new THREE.InstancedMesh(GEO.box, gold, 48);
  const knobs = new THREE.InstancedMesh(GEO.sphere, glow, 12);
  for (let k = 0; k < 48; k++) {
    const a = (k / 48) * TAU;
    ticks.setMatrixAt(k, T(178 * Math.cos(a), -1.5, 178 * Math.sin(a), k % 4 === 0 ? 20 : 12, 3, 2.2, Math.PI / 2 - a));
    if (k % 4 === 0) knobs.setMatrixAt(k / 4, T(186 * Math.cos(a), 0, 186 * Math.sin(a), 7));
  }
  horizon.add(ticks, knobs);
  add(horizon, new THREE.Euler(0.06, 0, 0.04), new THREE.Vector3(0, 1, 0), 0.012);

  // Rings lie in their local XY plane and tumble about an in-plane axis, like gimbals.
  add(torus(158, 3.6), new THREE.Euler(0, 0, 0), new THREE.Vector3(0, 1, 0), 0.035);
  const ecl = new THREE.Group();
  const bandMat = gold.clone();
  bandMat.side = THREE.DoubleSide;
  ecl.add(new THREE.Mesh(new THREE.CylinderGeometry(140, 140, 16, 160, 1, true), bandMat));
  ecl.add(torus(140, 1.6).rotateX(Math.PI / 2).translateZ(8));
  ecl.add(torus(140, 1.6).rotateX(Math.PI / 2).translateZ(-8));
  const marks = new THREE.InstancedMesh(GEO.sphere, glow, 12);
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * TAU;
    marks.setMatrixAt(k, T(143 * Math.cos(a), 0, 143 * Math.sin(a), 4.5));
  }
  ecl.add(marks);
  add(ecl, new THREE.Euler(0.41, 0, 0.2), new THREE.Vector3(0, 1, 0), -0.05);
  add(torus(122, 3), new THREE.Euler(0.5, 0, 0), new THREE.Vector3(1, 0, 0), 0.045);
  add(torus(104, 2.8), new THREE.Euler(1.05, 0.6, 0), new THREE.Vector3(0, 1, 0), -0.06);
  add(torus(88, 2.6, glow), new THREE.Euler(-0.9, -0.7, 0.3), new THREE.Vector3(1, 0, 0), 0.08);

  // glowing core, polar axis and needle
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 3), glow);
  group.add(core);
  const axis = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 360, 8), gold);
  axis.rotation.z = 0.41;
  group.add(axis);
  const needle = new THREE.Mesh(new THREE.ConeGeometry(4.5, 220, 8).translate(0, 130, 0), gold);
  group.add(needle);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(6, 12, 8), glow);
  orb.position.y = 95;
  group.add(orb);
  group.traverse((o) => { o.castShadow = true; });

  const q = new THREE.Quaternion();
  const update = (t: number) => {
    for (const s of spinners) s.obj.quaternion.copy(q.setFromAxisAngle(s.axis, t * s.speed));
  };
  return { group, update };
}

export interface Span {
  /** Deck centreline (bottom of deck) at s in [0, 1]. */
  at: (s: number) => THREE.Vector3;
  length: number;
}

export function ringSpan(R: number, a0: number, a1: number, y0: number, y1: number): Span {
  return {
    at: (s) => {
      const a = THREE.MathUtils.lerp(a0, a1, s);
      return new THREE.Vector3(R * Math.cos(a), THREE.MathUtils.lerp(y0, y1, THREE.MathUtils.smootherstep(s, 0, 1)), R * Math.sin(a));
    },
    length: Math.abs(a1 - a0) * R,
  };
}

export function lineSpan(p0: THREE.Vector3, p1: THREE.Vector3): Span {
  return {
    at: (s) => {
      const p = p0.clone().lerp(p1, s);
      p.y = THREE.MathUtils.lerp(p0.y, p1.y, THREE.MathUtils.smootherstep(s, 0, 1));
      return p;
    },
    length: p0.distanceTo(p1),
  };
}

const offsetPts = (pts: THREE.Vector3[], off: number, dy = 0) =>
  pts.map((p, i) => {
    const t = pts[Math.min(i + 1, pts.length - 1)].clone().sub(pts[Math.max(i - 1, 0)]).normalize();
    return p.clone().addScaledVector(new THREE.Vector3().crossVectors(t, UP).normalize(), off).setY(p.y + dy);
  });

/**
 * Open-spandrel arch bridge: deck with gold edges and parapets, twin arch ribs below,
 * optional colonnade on top, optionally broken in the middle.
 */
export function archBridge(
  kit: Kit, span: Span,
  opts: { width?: number; colonnade?: boolean; broken?: [number, number]; seed?: number } = {},
): void {
  const W = opts.width ?? 26;
  const L = span.length;
  const D = THREE.MathUtils.clamp(L * 0.17, 40, 120);
  const n = Math.max(24, Math.round(L / 10));
  const rand = rng(opts.seed ?? 5);
  const [b0, b1] = opts.broken ?? [2, 2];
  const pieces: [number, number][] = opts.broken ? [[0, b0], [b1, 1]] : [[0, 1]];

  for (const [s0, s1] of pieces) {
    const m = Math.max(3, Math.round(n * (s1 - s0)));
    const deck: THREE.Vector3[] = [];
    for (let i = 0; i <= m; i++) deck.push(span.at(THREE.MathUtils.lerp(s0, s1, i / m)));
    kit.mesh(sweep(deck, W, 8), 'ivory');
    for (const side of [-1, 1]) {
      kit.mesh(sweep(offsetPts(deck, side * (W / 2 + 0.5), 2.5), 1.2, 3.2), 'gold');
      kit.mesh(sweep(offsetPts(deck, side * (W / 2 - 1.2), 8), 2.4, 4.5), 'ivory');
    }
    // arch ribs (extend a little past the deck ends so they bed into the rock)
    const ext = opts.broken ? 0 : 0.05;
    const r0 = s0 === 0 ? -ext : s0, r1 = s1 === 1 ? 1 + ext : s1;
    const rib: THREE.Vector3[] = [];
    const mr = Math.max(4, Math.round(n * (r1 - r0) * 1.5));
    for (let i = 0; i <= mr; i++) {
      const s = THREE.MathUtils.lerp(r0, r1, i / mr);
      const p = span.at(THREE.MathUtils.clamp(s, 0, 1));
      if (s < 0 || s > 1) p.add(span.at(s < 0 ? 0 : 1).sub(span.at(s < 0 ? 0.02 : 0.98)).multiplyScalar(Math.abs(s < 0 ? s : s - 1) / 0.02));
      p.y -= 5 + D * (1 - Math.sin(Math.PI * THREE.MathUtils.clamp(s, 0, 1)));
      rib.push(p);
    }
    for (const side of [-1, 1]) kit.mesh(sweep(offsetPts(rib, side * (W / 2 - 3.5)), 5, 9, true), 'ivory');
    kit.mesh(sweep(offsetPts(rib, 0, -4.5), W - 6, 2.5), 'ivoryShade');

    // spandrel posts between rib and deck
    const step = Math.max(1, Math.round(16 / (L / n)));
    for (let i = 0; i <= m; i += step) {
      const s = THREE.MathUtils.lerp(s0, s1, i / m);
      const top = span.at(s);
      const gap = 5 + D * (1 - Math.sin(Math.PI * s));
      if (gap < 9) continue;
      const t = span.at(Math.min(1, s + 0.01)).sub(span.at(Math.max(0, s - 0.01)));
      const ry = Math.atan2(t.x, t.z);
      for (const side of [-1, 1]) {
        const o = offsetPts([span.at(Math.max(0, s - 0.01)), top, span.at(Math.min(1, s + 0.01))], side * (W / 2 - 3.5))[1];
        kit.inst('box', 'ivory', T(o.x, top.y - gap, o.z, 3.2, gap, 3.2, ry));
      }
    }
    // colonnade along the deck edges
    if (opts.colonnade) {
      const cstep = Math.max(1, Math.round(22 / (L / n)));
      for (const side of [-1, 1]) {
        const edge = offsetPts(deck, side * (W / 2 - 2.2), 8);
        for (let i = 0; i < edge.length; i += cstep) {
          const p = edge[i];
          kit.inst('cyl', 'ivory', T(p.x, p.y, p.z, 1.9, 24, 1.9));
          kit.inst('cyl', 'ivory', T(p.x, p.y + 22.5, p.z, 2.8, 1.5, 2.8));
        }
        kit.mesh(sweep(edge.map((p) => p.clone().setY(p.y + 24)), 3.6, 3.5), 'ivory');
        kit.mesh(sweep(edge.map((p) => p.clone().setY(p.y + 27.5)), 3.9, 1.2), 'gold');
      }
    }
  }

  // tumbling fragments where the span has fallen away
  if (opts.broken) {
    for (let i = 0; i < 18; i++) {
      const s = THREE.MathUtils.lerp(b0, b1, rand());
      const p = span.at(s);
      const drop = 20 + rand() * rand() * 700;
      const sz = 4 + rand() * 12;
      kit.inst('box', i % 3 ? 'ivory' : 'ivoryShade', T(p.x + (rand() - 0.5) * 60, p.y - drop, p.z + (rand() - 0.5) * 60, sz, sz * (0.4 + rand()), sz * (0.6 + rand() * 1.4), rand() * 6, rand() * 6, rand() * 6));
    }
  }
}

/** Paved road segment along a span, sitting on an islet's surface. */
export function roadOn(kit: Kit, span: Span, W = 30): void {
  const n = Math.max(6, Math.round(span.length / 12));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= n; i++) pts.push(span.at(i / n));
  kit.mesh(sweep(pts, W, 8), 'ivory');
  for (const side of [-1, 1]) kit.mesh(sweep(offsetPts(pts, side * (W / 2 + 0.5), 4), 1.2, 3), 'gold');
}
