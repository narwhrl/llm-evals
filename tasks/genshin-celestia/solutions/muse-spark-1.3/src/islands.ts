import * as THREE from 'three';
import { mulberry32, wobble, type SharedMats } from './materials';

export interface IsletSpec {
  angle: number;
  dist: number;
  radius: number;
  seed: number;
  tall: number; // underside depth factor
}

/** Irregular grass-topped rock island with a rugged inverted underside. */
export function buildIsland(
  mats: SharedMats,
  radius: number,
  seed: number,
  depth: number,
  opts: { topY?: number; grassColor?: number } = {},
): THREE.Group {
  const g = new THREE.Group();
  const rand = mulberry32(seed);
  const topY = opts.topY ?? 0;

  // --- grass cap: squat cylinder, jittered rim, grass top / rock side ---
  const capH = radius * 0.16 + 8;
  const capGeo = new THREE.CylinderGeometry(radius, radius * 1.04, capH, 56, 2);
  const pos = capGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const r = Math.hypot(x, z);
    if (r > radius * 0.5) {
      const a = Math.atan2(z, x);
      const n = 1 + wobble(Math.cos(a) * 3 + seed, Math.sin(a) * 3, seed * 0.13) * 0.16 + (rand() - 0.5) * 0.05;
      const nr = (r / radius) * 0 + r * n;
      pos.setX(i, Math.cos(a) * nr);
      pos.setZ(i, Math.sin(a) * nr);
      if (pos.getY(i) > 0) pos.setY(i, pos.getY(i) + wobble(x * 0.05, z * 0.05, seed) * radius * 0.03);
    }
  }
  capGeo.computeVertexNormals();
  const grassMat = new THREE.MeshStandardMaterial({
    color: opts.grassColor ?? 0x71bd5d, roughness: 1, flatShading: true,
  });
  const cap = new THREE.Mesh(capGeo, [mats.rock, grassMat, mats.rockDark]);
  cap.position.y = topY - capH / 2 + 2;
  g.add(cap);

  // --- inverted rugged underside: displaced cone, apex down ---
  const underGeo = new THREE.ConeGeometry(radius * 1.0, depth, 40, 9, true);
  underGeo.translate(0, -depth / 2, 0);
  const up = underGeo.attributes.position;
  for (let i = 0; i < up.count; i++) {
    const x = up.getX(i);
    const y = up.getY(i);
    const z = up.getZ(i);
    const t = THREE.MathUtils.clamp(-y / depth, 0, 1); // 0 rim → 1 tip
    const a = Math.atan2(z, x);
    const jag = 1 + wobble(Math.cos(a) * 4 + t * 5, Math.sin(a) * 4 - t * 3, seed * 0.31) * (0.22 + t * 0.3);
    up.setX(i, x * jag);
    up.setZ(i, z * jag);
    up.setY(i, y + wobble(x * 0.06, z * 0.06, seed * 0.7) * depth * 0.06 * (0.3 + t));
  }
  underGeo.computeVertexNormals();
  const under = new THREE.Mesh(underGeo, mats.rock);
  under.position.y = topY - capH + 2;
  g.add(under);

  // --- strata ledges + ancient stubs clinging to the underside ---
  const strata = 2 + Math.floor(rand() * 2);
  for (let s = 0; s < strata; s++) {
    const t = 0.3 + (s / strata) * 0.5;
    const rr = radius * (1 - t * 0.78) * (0.82 + rand() * 0.3);
    const ledge = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr * 0.88, depth * 0.035, 18), mats.rock);
    ledge.position.y = topY - capH - depth * t;
    ledge.rotation.y = rand() * Math.PI;
    ledge.scale.x = 1 + (rand() - 0.5) * 0.12;
    g.add(ledge);
  }
  // faint ancient ruins embedded in the rock face (ivory stubs + ember windows)
  const ruinCount = 2 + Math.floor(rand() * 3);
  for (let s = 0; s < ruinCount; s++) {
    const a = rand() * Math.PI * 2;
    const t = 0.3 + rand() * 0.4;
    const rr = radius * (1 - t * 0.75);
    const stub = new THREE.Mesh(new THREE.BoxGeometry(10 + rand() * 14, 22 + rand() * 26, 10 + rand() * 10), mats.ivoryFlat);
    stub.position.set(Math.cos(a) * rr * 0.95, topY - capH - depth * t, Math.sin(a) * rr * 0.95);
    stub.rotation.y = a;
    stub.rotation.z = (rand() - 0.5) * 0.25;
    g.add(stub);
    const win = new THREE.Mesh(new THREE.PlaneGeometry(4 + rand() * 4, 7 + rand() * 6), mats.glowWindow);
    win.position.set(Math.cos(a) * (rr * 0.95 + 8), stub.position.y, Math.sin(a) * (rr * 0.95 + 8));
    win.rotation.y = a + Math.PI / 2;
    g.add(win);
  }
  return g;
}

/** Grand white arched bridge between two points (deck follows an arc, arch ring below). */

export function buildBridge(mats: SharedMats, a: THREE.Vector3, b: THREE.Vector3, seed: number): THREE.Group {
  const g = new THREE.Group();
  const rand = mulberry32(seed);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = a.distanceTo(b);
  const lift = 14 + len * 0.045; // deck camber
  const curve = new THREE.QuadraticBezierCurve3(
    a.clone(), mid.clone().add(new THREE.Vector3(0, lift, 0)), b.clone(),
  );
  const width = 16 + rand() * 6;
  const segs = Math.max(12, Math.floor(len / 14));

  // deck ribbon
  const deckGeo = new THREE.BufferGeometry();
  const verts: number[] = [];
  const idx: number[] = [];
  const side = new THREE.Vector3().subVectors(b, a).normalize().cross(new THREE.Vector3(0, 1, 0)).normalize();
  for (let i = 0; i <= segs; i++) {
    const p = curve.getPoint(i / segs);
    const w = width * (0.85 + 0.15 * Math.sin((i / segs) * Math.PI));
    verts.push(p.x - side.x * w / 2, p.y, p.z - side.z * w / 2);
    verts.push(p.x + side.x * w / 2, p.y, p.z + side.z * w / 2);
    if (i < segs) {
      const k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  deckGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  deckGeo.setIndex(idx);
  deckGeo.computeVertexNormals();
  const deck = new THREE.Mesh(deckGeo, new THREE.MeshStandardMaterial({
    color: 0xe9e0cb, roughness: 0.9, flatShading: true, side: THREE.DoubleSide,
  }));
  g.add(deck);

  // side rails + solid fascia beams so the deck reads from far away
  for (const s of [-1, 1]) {
    const edgePts: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i += 2) {
      const p = curve.getPoint(i / segs);
      edgePts.push(new THREE.Vector3(p.x + side.x * s * width / 2, p.y - 1.5, p.z + side.z * s * width / 2));
    }
    const fascia = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edgePts), segs, 2.4, 6),
      mats.ivoryFlat,
    );
    g.add(fascia);
    const railPts: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i += 2) {
      const p = curve.getPoint(i / segs);
      railPts.push(new THREE.Vector3(p.x + side.x * s * width / 2, p.y + 4.5, p.z + side.z * s * width / 2));
    }
    const rail = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(railPts), segs, 1.1, 6),
      mats.gold,
    );
    g.add(rail);
    // balusters
    const n = Math.floor(len / 26);
    for (let i = 0; i <= n; i++) {
      const p = curve.getPoint(i / n);
      const post = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5, 1.6), mats.ivoryFlat);
      post.position.set(p.x + side.x * s * width / 2, p.y + 2, p.z + side.z * s * width / 2);
      g.add(post);
    }
  }

  // grand arch beneath the deck
  const archR = len * 0.32;
  const arch = new THREE.Mesh(new THREE.TorusGeometry(archR, 3.2, 8, 24, Math.PI), mats.ivoryFlat);
  arch.position.copy(mid).add(new THREE.Vector3(0, -6, 0));
  arch.rotation.y = Math.atan2(b.x - a.x, b.z - a.z) + Math.PI / 2;
  arch.scale.y = 0.55;
  g.add(arch);

  // gold finials at both ends
  for (const p of [a, b]) {
    const ob = new THREE.Mesh(new THREE.OctahedronGeometry(3.2), mats.gold);
    ob.position.copy(p).add(new THREE.Vector3(0, 7, 0));
    g.add(ob);
  }
  return g;
}

/** A straight colonnade: slender columns + entablature beam + gold crest. */
export function buildColonnade(
  mats: SharedMats, from: THREE.Vector3, to: THREE.Vector3, spacing = 34,
): THREE.Group {
  const g = new THREE.Group();
  const dir = new THREE.Vector3().subVectors(to, from);
  const len = dir.length();
  dir.normalize();
  const n = Math.max(2, Math.floor(len / spacing));
  const colGeo = new THREE.CylinderGeometry(2.6, 3.2, 30, 10);
  const capGeo = new THREE.BoxGeometry(8, 2.6, 8);
  for (let i = 0; i <= n; i++) {
    const p = from.clone().addScaledVector(dir, (i / n) * len);
    const col = new THREE.Mesh(colGeo, mats.ivory);
    col.position.copy(p).add(new THREE.Vector3(0, 15, 0));
    g.add(col);
    const cap = new THREE.Mesh(capGeo, mats.ivoryFlat);
    cap.position.copy(p).add(new THREE.Vector3(0, 31, 0));
    cap.rotation.y = Math.atan2(dir.x, dir.z);
    g.add(cap);
  }
  const beamLen = len + 10;
  const beam = new THREE.Mesh(new THREE.BoxGeometry(7, 5, beamLen), mats.ivory);
  const mid = from.clone().add(to).multiplyScalar(0.5).add(new THREE.Vector3(0, 35, 0));
  beam.position.copy(mid);
  beam.rotation.y = Math.atan2(dir.x, dir.z);
  g.add(beam);
  const crest = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, beamLen), mats.gold);
  crest.position.copy(mid).add(new THREE.Vector3(0, 3.6, 0));
  crest.rotation.y = beam.rotation.y;
  g.add(crest);
  return g;
}

/** Broken ruin spire: snapped white tower, tilted fragment beside it. */
export function buildRuinSpire(mats: SharedMats, h: number, seed: number): THREE.Group {
  const g = new THREE.Group();
  const rand = mulberry32(seed);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(7, 10, h, 8), mats.ivoryFlat);
  base.position.y = h / 2;
  g.add(base);
  const lip = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 3, 8), mats.ivoryFlat);
  lip.position.y = h;
  g.add(lip);
  const frag = new THREE.Mesh(new THREE.CylinderGeometry(5, 7, h * 0.45, 8), mats.ivoryFlat);
  frag.position.set(12 + rand() * 6, h * 0.2, (rand() - 0.5) * 10);
  frag.rotation.z = 0.5 + rand() * 0.4;
  frag.rotation.y = rand() * 3;
  g.add(frag);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(6, 16, 8), mats.gold);
  tip.position.set(-9, h + 4, 5);
  tip.rotation.z = 1.1;
  g.add(tip);
  return g;
}
