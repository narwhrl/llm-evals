import * as THREE from "three";
import type { Mats } from "./palette";

type V3 = THREE.Vector3;

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cyl(rt: number, rb: number, h: number, mat: THREE.Material, seg = 12, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Slender Celestia mini-spire: stacked ivory tiers, banded gold, needle tip.
export function miniSpire(mats: Mats, h: number, r: number): THREE.Group {
  const g = new THREE.Group();
  const baseH = h * 0.5;
  g.add(cyl(r * 1.35, r * 1.6, h * 0.08, mats.ivoryDark, 12, 0, h * 0.04, 0));
  g.add(cyl(r * 0.9, r * 1.15, baseH, mats.ivory, 10, 0, h * 0.08 + baseH / 2, 0));
  g.add(cyl(r * 1.05, r * 1.05, h * 0.03, mats.gold, 12, 0, h * 0.6, 0));
  g.add(cyl(r * 0.62, r * 0.82, h * 0.26, mats.ivory, 10, 0, h * 0.74, 0));
  g.add(cyl(r * 0.8, r * 0.8, h * 0.025, mats.gold, 12, 0, h * 0.88, 0));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(r * 0.7, h * 0.16, 10), mats.teal);
  roof.position.y = h * 0.95;
  roof.castShadow = true;
  g.add(roof);
  g.add(cyl(0, r * 0.08, h * 0.12, mats.goldBright, 6, 0, h * 1.06, 0));
  return g;
}

// Colonnade: freestanding arch row (bridge sides, ring road).
export function colonnade(mats: Mats, length: number, h: number, count: number): THREE.Group {
  const g = new THREE.Group();
  const step = length / count;
  const colGeo = new THREE.CylinderGeometry(h * 0.07, h * 0.085, h, 8);
  const cols = new THREE.InstancedMesh(colGeo, mats.ivory, count + 1);
  const m = new THREE.Matrix4();
  for (let i = 0; i <= count; i++) {
    m.makeTranslation(-length / 2 + i * step, h / 2, 0);
    cols.setMatrixAt(i, m);
  }
  cols.castShadow = true;
  g.add(cols);

  // arch between every pair of columns: half-torus
  const archR = step / 2;
  const tube = Math.max(0.18, h * 0.05);
  const archGeo = new THREE.TorusGeometry(archR, tube, 6, 12, Math.PI);
  const arches = new THREE.InstancedMesh(archGeo, mats.ivory, count);
  for (let i = 0; i < count; i++) {
    m.makeTranslation(-length / 2 + i * step + step / 2, h, 0);
    arches.setMatrixAt(i, m);
  }
  arches.castShadow = true;
  g.add(arches);

  // entablature
  g.add(box(length, h * 0.12, tube * 2.6, mats.ivoryDark, 0, h + archR + h * 0.06, 0));
  return g;
}

// Grand arched bridge between two points, with side colonnades and support ribs.
export function bridge(mats: Mats, a: V3, b: V3, width: number, archH: number): THREE.Group {
  const g = new THREE.Group();
  const dir = b.clone().sub(a);
  const len = Math.hypot(dir.x, dir.z);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const angle = Math.atan2(dir.z, dir.x);

  const deck = box(len, width * 0.32, width, mats.ivory, 0, 0, 0);
  g.add(deck);

  // arc ribs under the deck: two big arch ribs
  const ribR = len / 2;
  const sag = archH;
  const ribGeo = new THREE.TorusGeometry(ribR, width * 0.09, 6, 40, Math.PI);
  for (const side of [-1, 1]) {
    const rib = new THREE.Mesh(ribGeo, mats.ivoryDark);
    rib.rotation.z = Math.PI;
    rib.scale.y = sag / ribR;
    rib.position.set(0, -width * 0.16, (side * width) / 2.4);
    rib.castShadow = true;
    g.add(rib);
  }

  // balustrade: low wall + posts
  const postGeo = new THREE.BoxGeometry(width * 0.12, width * 0.42, width * 0.12);
  const nPost = Math.max(6, Math.floor(len / (width * 1.4)));
  const posts = new THREE.InstancedMesh(postGeo, mats.ivory, nPost * 2);
  const m = new THREE.Matrix4();
  let pi = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < nPost; i++) {
      const x = -len / 2 + (i + 0.5) * (len / nPost);
      m.makeTranslation(x, width * 0.32, (side * width) / 2.15);
      posts.setMatrixAt(pi++, m);
    }
  }
  posts.count = pi;
  g.add(posts);
  for (const side of [-1, 1]) {
    g.add(box(len, width * 0.1, width * 0.14, mats.ivoryDark, 0, width * 0.56, (side * width) / 2.15));
  }

  // support arches spanning downward (the famous stacked arches)
  const nArch = Math.max(2, Math.floor(len / (width * 4)));
  const archGeo = new THREE.TorusGeometry(len / (nArch * 2) * 0.82, width * 0.11, 6, 14, Math.PI);
  const arches = new THREE.InstancedMesh(archGeo, mats.ivory, nArch);
  for (let i = 0; i < nArch; i++) {
    const x = -len / 2 + (i + 0.5) * (len / nArch);
    m.makeTranslation(x, -width * 0.2, 0);
    arches.setMatrixAt(i, m);
  }
  g.add(arches);

  // end pylons
  for (const e of [-1, 1]) {
    const px = (e * len) / 2 - e * width * 0.2;
    g.add(box(width * 0.7, width * 1.5, width * 1.1, mats.ivory, px, -width * 0.3, 0));
    g.add(box(width * 0.85, width * 0.16, width * 1.25, mats.gold, px, width * 0.5, 0));
  }

  g.position.copy(mid);
  g.rotation.y = -angle;
  return g;
}

// Broken bridge: two stubs reaching toward a gap with floating debris.
export function brokenBridge(mats: Mats, a: V3, b: V3, width: number): THREE.Group {
  const g = new THREE.Group();
  const dir = b.clone().sub(a);
  const stubA = a.clone().add(dir.clone().multiplyScalar(0.32));
  const stubB = b.clone().add(dir.clone().multiplyScalar(-0.3));
  const d1 = bridge(mats, a, stubA, width, width * 0.8);
  const d2 = bridge(mats, b, stubB, width, width * 0.8);
  // jagged ends
  for (const [stub, sgn] of [
    [stubA, 1],
    [stubB, -1],
  ] as const) {
    const jag = box(width * 0.5, width * 0.4, width * 0.9, mats.ivoryDark, 0, -width * 0.3, 0);
    jag.position.copy(stub);
    jag.position.y -= width * 0.4;
    jag.rotation.y = Math.atan2(dir.z, dir.x);
    jag.rotation.z = sgn * 0.35;
    g.add(jag);
  }
  g.add(d1, d2);
  return g;
}

// Arcade wall: a curved/tiered white building block with arched openings.
export function arcade(mats: Mats, radius: number, arcFrac: number, h: number, tiers: number): THREE.Group {
  const g = new THREE.Group();
  const theta = Math.PI * 2 * arcFrac;
  for (let t = 0; t < tiers; t++) {
    const rr = radius * (1 - t * 0.16);
    const hh = h / tiers;
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr, hh, 24, 1, true, 0, theta), mats.ivory);
    wall.position.y = t * hh + hh / 2;
    wall.castShadow = true;
    wall.receiveShadow = true;
    wall.material.side = THREE.DoubleSide;
    g.add(wall);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(rr * 1.02, rr * 1.02, hh * 0.16, 24, 1, false, 0, theta), mats.gold);
    band.position.y = (t + 1) * hh;
    g.add(band);
  }
  return g;
}

// Sanctum gate tower: tall slim tower with a peaked crown.
export function gateTower(mats: Mats, h: number, w: number): THREE.Group {
  const g = new THREE.Group();
  g.add(box(w * 1.3, h * 0.16, w * 1.3, mats.ivoryDark, 0, h * 0.08, 0));
  g.add(box(w, h * 0.62, w, mats.ivory, 0, h * 0.4, 0));
  // arched window slots
  for (let i = 0; i < 3; i++) {
    g.add(box(w * 0.16, h * 0.2, w * 0.06, mats.window, -w * 0.28 + i * w * 0.28, h * 0.45, w * 0.51));
  }
  g.add(box(w * 1.18, h * 0.07, w * 1.18, mats.gold, 0, h * 0.74, 0));
  g.add(box(w * 0.85, h * 0.12, w * 0.85, mats.ivory, 0, h * 0.83, 0));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 0.62, h * 0.2, 4), mats.teal);
  roof.position.y = h * 0.99;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  g.add(roof);
  g.add(cyl(0, w * 0.06, h * 0.12, mats.goldBright, 6, 0, h * 1.14, 0));
  return g;
}
