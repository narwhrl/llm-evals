import * as THREE from "three";
import type { Mats } from "./palette";

function cyl(rt: number, rb: number, h: number, mat: THREE.Material, seg = 16, open = false): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg, 1, open), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function box(w: number, h: number, d: number, mat: THREE.Material): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Ring of columns + arches (rotunda wrap for a tier).
function rotunda(mats: Mats, r: number, h: number, count: number): THREE.Group {
  const g = new THREE.Group();
  const colGeo = new THREE.CylinderGeometry(r * 0.05, r * 0.06, h, 8);
  const cols = new THREE.InstancedMesh(colGeo, mats.ivory, count);
  const m = new THREE.Matrix4();
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    m.makeTranslation(Math.cos(a) * r, h / 2, Math.sin(a) * r);
    cols.setMatrixAt(i, m);
  }
  cols.castShadow = true;
  g.add(cols);

  const step = (Math.PI * 2 * r) / count;
  const archGeo = new THREE.TorusGeometry(step / 2, r * 0.035, 6, 10, Math.PI);
  const arches = new THREE.InstancedMesh(archGeo, mats.ivory, count);
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < count; i++) {
    const a = ((i + 0.5) / count) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * r, h, Math.sin(a) * r);
    q.setFromEuler(new THREE.Euler(0, -a + Math.PI / 2, 0));
    m.compose(p, q, s);
    arches.setMatrixAt(i, m);
  }
  arches.castShadow = true;
  g.add(arches);
  return g;
}

export interface Sanctum {
  group: THREE.Group;
  rings: THREE.Object3D[];
  glow: THREE.Mesh;
}

// The great central spire + golden armillary sphere on top.
export function createSanctum(mats: Mats, scale = 1): Sanctum {
  const g = new THREE.Group();
  const H = 660 * scale;
  const R = 84 * scale;

  // ---- base: two-tier stepped plinth with corner pylons
  const plinth1 = box(R * 2.6, H * 0.05, R * 2.6, mats.ivoryDark);
  plinth1.position.y = H * 0.025;
  g.add(plinth1);
  const plinth2 = box(R * 2.15, H * 0.045, R * 2.15, mats.ivory);
  plinth2.position.y = H * 0.07;
  g.add(plinth2);
  const stairW = R * 0.9;
  for (const s of [-1, 1]) {
    // grand stairs on two sides
    for (let i = 0; i < 5; i++) {
      const st = box(stairW, H * 0.012, R * 0.22 - i * R * 0.028, mats.ivoryDark);
      st.position.set(s * (R * 1.35 + i * R * 0.05), H * (0.012 * (i + 1)), 0);
      st.rotation.y = s > 0 ? Math.PI : 0;
      g.add(st);
    }
  }

  // ---- tier 1: arcaded rotunda
  const t1H = H * 0.16;
  const t1R = R;
  const wall1 = cyl(t1R * 0.92, t1R, t1H, mats.ivory, 20);
  wall1.position.y = H * 0.09 + t1H / 2;
  g.add(wall1);
  const rot1 = rotunda(mats, t1R * 1.0, t1H * 0.82, 18);
  rot1.position.y = H * 0.09;
  g.add(rot1);
  // gold band + cornice
  const band1 = cyl(t1R * 1.06, t1R * 1.06, H * 0.014, mats.gold, 24);
  band1.position.y = H * 0.09 + t1H;
  g.add(band1);
  const corn1 = cyl(t1R * 1.14, t1R * 1.1, H * 0.018, mats.ivoryDark, 24);
  corn1.position.y = H * 0.09 + t1H + H * 0.016;
  g.add(corn1);

  // ---- tier 2: narrower, taller, windowed drum
  const t2H = H * 0.3;
  const t2R = R * 0.66;
  const drum2 = cyl(t2R, t2R * 1.08, t2H, mats.ivory, 18);
  drum2.position.y = H * 0.09 + t1H + H * 0.026 + t2H / 2;
  g.add(drum2);
  // vertical ribs
  const ribGeo = new THREE.BoxGeometry(t2R * 0.1, t2H * 0.92, t2R * 0.1);
  const ribs = new THREE.InstancedMesh(ribGeo, mats.ivoryDark, 12);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    m4.makeTranslation(Math.cos(a) * t2R * 1.04, H * 0.09 + t1H + H * 0.026 + t2H / 2, Math.sin(a) * t2R * 1.04);
    ribs.setMatrixAt(i, m4);
  }
  ribs.castShadow = true;
  g.add(ribs);
  // glowing window arcades on drum 2
  const winGeo = new THREE.BoxGeometry(t2R * 0.16, t2H * 0.5, t2R * 0.04);
  const wins = new THREE.InstancedMesh(winGeo, mats.window, 12);
  for (let i = 0; i < 12; i++) {
    const a = ((i + 0.5) / 12) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * t2R * 1.005, H * 0.09 + t1H + t2H * 0.52, Math.sin(a) * t2R * 1.005);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -a, 0));
    m4.compose(p, q, new THREE.Vector3(1, 1, 1));
    wins.setMatrixAt(i, m4);
  }
  g.add(wins);
  const band2 = cyl(t2R * 1.1, t2R * 1.1, H * 0.012, mats.gold, 20);
  band2.position.y = H * 0.09 + t1H + H * 0.026 + t2H;
  g.add(band2);

  // ---- tier 3: upper rotunda with dome + crown ring
  const t3H = H * 0.2;
  const t3R = R * 0.46;
  const drum3 = cyl(t3R, t3R * 1.05, t3H, mats.ivory, 16);
  drum3.position.y = H * 0.09 + t1H + H * 0.04 + t2H + t3H / 2;
  g.add(drum3);
  const rot3 = rotunda(mats, t3R * 1.35, t3H * 0.7, 12);
  rot3.position.y = H * 0.09 + t1H + H * 0.04 + t2H + t3H * 0.12;
  g.add(rot3);
  const band3 = cyl(t3R * 1.42, t3R * 1.42, H * 0.012, mats.gold, 20);
  band3.position.y = H * 0.09 + t1H + H * 0.04 + t2H + t3H * 0.86;
  g.add(band3);
  // small dome
  const dome = new THREE.Mesh(new THREE.SphereGeometry(t3R * 0.95, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), mats.ivory);
  dome.position.y = H * 0.09 + t1H + H * 0.04 + t2H + t3H;
  dome.castShadow = true;
  g.add(dome);
  const domeTip = cyl(0, t3R * 0.1, H * 0.05, mats.goldBright, 8);
  domeTip.position.y = dome.position.y + t3R * 0.9 + H * 0.024;
  g.add(domeTip);

  // ---- neck: slender shaft carrying the armillary
  const neckBase = dome.position.y + t3R * 0.55;
  const neckH = H * 0.12;
  const neck = cyl(R * 0.1, R * 0.16, neckH, mats.ivory, 10);
  neck.position.y = neckBase + neckH / 2;
  g.add(neck);
  // four flying buttress fins on the neck
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const fin = box(R * 0.05, neckH * 0.9, R * 0.16, mats.ivoryDark);
    fin.position.set(Math.cos(a) * R * 0.2, neckBase + neckH * 0.45, Math.sin(a) * R * 0.2);
    fin.rotation.y = -a;
    g.add(fin);
  }
  const neckBand = cyl(R * 0.2, R * 0.2, H * 0.01, mats.gold, 14);
  neckBand.position.y = neckBase + neckH * 0.85;
  g.add(neckBand);

  // ---- the armillary: nested golden rings around a glowing core
  const ringRoot = new THREE.Group();
  ringRoot.position.y = neckBase + neckH + R * 0.58;
  const rings: THREE.Object3D[] = [];
  const armR = R * 0.62;
  const ringDefs: Array<{ tilt: [number, number, number]; r: number; tube: number; mat: THREE.Material }> = [
    { tilt: [Math.PI / 2, 0, 0], r: armR, tube: R * 0.022, mat: mats.goldBright },
    { tilt: [Math.PI / 2, Math.PI / 3, 0], r: armR * 0.96, tube: R * 0.02, mat: mats.gold },
    { tilt: [Math.PI / 2, -Math.PI / 3, 0], r: armR * 0.96, tube: R * 0.02, mat: mats.gold },
    { tilt: [0, 0, Math.PI / 2.4], r: armR * 1.12, tube: R * 0.018, mat: mats.gold },
    { tilt: [0.5, 0.2, Math.PI / 1.9], r: armR * 1.2, tube: R * 0.014, mat: mats.goldBright },
  ];
  for (const def of ringDefs) {
    const tor = new THREE.Mesh(new THREE.TorusGeometry(def.r, def.tube, 8, 48), def.mat);
    tor.rotation.set(...def.tilt);
    tor.castShadow = true;
    ringRoot.add(tor);
    rings.push(tor);
  }
  // inner gyroscope axes
  const axis = cyl(R * 0.014, R * 0.014, armR * 2.5, mats.gold, 6);
  axis.rotation.z = Math.PI / 2;
  axis.rotation.y = 0.4;
  ringRoot.add(axis);
  const axis2 = cyl(R * 0.014, R * 0.014, armR * 2.5, mats.gold, 6);
  axis2.rotation.x = Math.PI / 2;
  axis2.rotation.z = -0.5;
  ringRoot.add(axis2);
  rings.push(axis, axis2);
  // glowing core
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(armR * 0.24, 16, 12),
    new THREE.MeshBasicMaterial({ color: "#ffe9a8" }),
  );
  ringRoot.add(glow);
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(armR * 0.36, 16, 12),
    new THREE.MeshBasicMaterial({ color: "#ffd97a", transparent: true, opacity: 0.28, depthWrite: false }),
  );
  ringRoot.add(halo);
  // cardinal jewels on the main ring
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const jewel = new THREE.Mesh(new THREE.OctahedronGeometry(R * 0.05), mats.goldBright);
    jewel.position.set(Math.cos(a) * armR, 0, Math.sin(a) * armR);
    ringRoot.add(jewel);
  }
  g.add(ringRoot);

  return { group: g, rings, glow };
}
