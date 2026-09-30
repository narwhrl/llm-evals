// 武器模型（程序建模）：第一人称与第三人称共用。原点在握把，枪口朝 -Z，单位米。
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

let M: Record<string, THREE.Material> | null = null;
function mats(): Record<string, THREE.Material> {
  if (M) return M;
  const s = (color: number, roughness: number, metalness: number) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  M = {
    steel: s(0x3b3d40, 0.45, 0.55), black: s(0x2a2c30, 0.55, 0.45), poly: s(0x33363a, 0.7, 0.1),
    wood: s(0x7a3f1c, 0.55, 0.05), olive: s(0x4d5238, 0.65, 0.2), tan: s(0x8c7a55, 0.7, 0.1),
    blade: s(0xb9bec4, 0.3, 0.6), lens: s(0x223344, 0.05, 0.9), brass: s(0xb8872e, 0.35, 0.6),
    green: s(0x3f4d32, 0.6, 0.3), grey: s(0x6f7477, 0.5, 0.55),
  };
  return M;
}

export interface GunModel {
  root: THREE.Group;
  mag: THREE.Object3D | null;
  bolt: THREE.Object3D | null;
  slide: THREE.Object3D | null;
  muzzle: THREE.Vector3;
  eject: THREE.Vector3;
  leftGrip: THREE.Vector3;
}

function box(p: THREE.Object3D, mat: string, x: number, y: number, z: number, w: number, h: number, d: number, rx = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats()[mat]);
  m.position.set(x, y, z);
  m.rotation.x = rx;
  p.add(m);
  return m;
}

function cyl(p: THREE.Object3D, mat: string, x: number, y: number, z: number, r: number, len: number, seg = 10): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), mats()[mat]);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  p.add(m);
  return m;
}

export function buildGun(id: string, scale: number): GunModel {
  const root = new THREE.Group();
  const g = new THREE.Group();
  root.add(g);
  let mag: THREE.Object3D | null = null, bolt: THREE.Object3D | null = null, slide: THREE.Object3D | null = null;
  let muzzle = new THREE.Vector3(0, 0.07, -0.7), eject = new THREE.Vector3(0.03, 0.08, -0.05), left = new THREE.Vector3(0, 0.02, -0.34);
  switch (id) {
    case "ak": {
      box(g, "steel", 0, 0.07, -0.08, 0.05, 0.07, 0.4);
      box(g, "steel", 0, 0.11, -0.08, 0.045, 0.02, 0.38);
      box(g, "wood", 0, -0.05, 0.0, 0.035, 0.12, 0.05, 0.3);
      box(g, "wood", 0, 0.05, 0.25, 0.04, 0.08, 0.3, -0.12);
      box(g, "wood", 0, 0.03, 0.38, 0.042, 0.13, 0.05);
      box(g, "wood", 0, 0.065, -0.38, 0.055, 0.06, 0.2);
      cyl(g, "steel", 0, 0.11, -0.4, 0.013, 0.22);
      cyl(g, "steel", 0, 0.07, -0.6, 0.01, 0.42);
      box(g, "steel", 0, 0.1, -0.74, 0.012, 0.05, 0.015);
      cyl(g, "black", 0, 0.07, -0.82, 0.016, 0.06);
      box(g, "steel", 0, 0.125, -0.24, 0.02, 0.02, 0.03);
      bolt = box(g, "steel", 0.03, 0.085, -0.05, 0.015, 0.015, 0.03);
      const m = new THREE.Group();
      m.position.set(0, 0.03, -0.14);
      box(m, "steel", 0, -0.06, 0, 0.03, 0.13, 0.07, -0.18);
      box(m, "steel", 0, -0.17, 0.035, 0.03, 0.12, 0.068, -0.45);
      g.add(m); mag = m;
      muzzle = new THREE.Vector3(0, 0.07, -0.86); left = new THREE.Vector3(0, 0.02, -0.38);
      break;
    }
    case "m4": {
      box(g, "black", 0, 0.07, -0.06, 0.05, 0.08, 0.34);
      box(g, "black", 0, 0.125, -0.12, 0.022, 0.03, 0.42);
      box(g, "poly", 0, -0.05, 0.01, 0.035, 0.12, 0.05, 0.35);
      cyl(g, "black", 0, 0.08, 0.2, 0.018, 0.22);
      box(g, "poly", 0, 0.06, 0.33, 0.045, 0.1, 0.12);
      box(g, "poly", 0, 0.075, -0.4, 0.06, 0.07, 0.3);
      for (const s of [-1, 1]) box(g, "black", s * 0.032, 0.075, -0.4, 0.008, 0.02, 0.28);
      cyl(g, "steel", 0, 0.075, -0.64, 0.009, 0.28);
      box(g, "black", 0, 0.13, -0.53, 0.012, 0.06, 0.02);
      box(g, "black", 0, 0.15, 0.05, 0.02, 0.04, 0.02);
      cyl(g, "black", 0, 0.075, -0.8, 0.014, 0.05);
      bolt = box(g, "black", 0.028, 0.085, 0.0, 0.01, 0.02, 0.04);
      const m = new THREE.Group();
      m.position.set(0, 0.03, -0.12);
      box(m, "steel", 0, -0.09, 0, 0.026, 0.19, 0.065, -0.08);
      g.add(m); mag = m;
      muzzle = new THREE.Vector3(0, 0.075, -0.83); left = new THREE.Vector3(0, 0.02, -0.4);
      break;
    }
    case "mp5": {
      box(g, "black", 0, 0.07, -0.08, 0.05, 0.08, 0.34);
      cyl(g, "black", 0, 0.12, -0.12, 0.014, 0.36);
      box(g, "poly", 0, -0.05, 0.0, 0.035, 0.12, 0.05, 0.3);
      box(g, "poly", 0, 0.065, -0.3, 0.05, 0.07, 0.16);
      cyl(g, "steel", 0, 0.07, -0.44, 0.012, 0.14);
      box(g, "black", 0, 0.05, 0.16, 0.02, 0.02, 0.24);
      box(g, "black", 0, 0.03, 0.29, 0.05, 0.1, 0.02);
      box(g, "black", 0, 0.14, 0.05, 0.02, 0.03, 0.03);
      bolt = box(g, "steel", 0.03, 0.12, -0.27, 0.012, 0.012, 0.03);
      const m = new THREE.Group();
      m.position.set(0, 0.03, -0.16);
      box(m, "steel", 0, -0.08, 0.01, 0.024, 0.17, 0.05, -0.3);
      g.add(m); mag = m;
      muzzle = new THREE.Vector3(0, 0.07, -0.52); left = new THREE.Vector3(0, 0.02, -0.3);
      break;
    }
    case "awm": {
      box(g, "green", 0, 0.06, -0.1, 0.06, 0.09, 0.5);
      box(g, "green", 0, 0.0, 0.2, 0.045, 0.14, 0.26, -0.05);
      box(g, "green", 0, 0.02, 0.36, 0.05, 0.16, 0.06);
      box(g, "poly", 0, -0.05, 0.02, 0.035, 0.12, 0.05, 0.25);
      cyl(g, "steel", 0, 0.08, -0.72, 0.016, 0.76);
      cyl(g, "black", 0, 0.08, -1.12, 0.024, 0.1);
      cyl(g, "black", 0, 0.18, -0.08, 0.026, 0.36, 16);
      cyl(g, "black", 0, 0.18, -0.3, 0.034, 0.08, 16);
      cyl(g, "black", 0, 0.18, 0.12, 0.03, 0.06, 16);
      cyl(g, "lens", 0, 0.18, -0.345, 0.03, 0.005, 16);
      for (const z of [-0.18, 0.02]) box(g, "black", 0, 0.14, z, 0.03, 0.05, 0.03);
      const b = new THREE.Group();
      b.position.set(0.035, 0.09, 0.02);
      box(b, "steel", 0.03, 0, 0, 0.06, 0.012, 0.012);
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 6), mats().steel);
      knob.position.set(0.065, 0, 0);
      b.add(knob);
      g.add(b); bolt = b;
      const m = new THREE.Group();
      m.position.set(0, 0.02, -0.12);
      box(m, "black", 0, -0.04, 0, 0.03, 0.08, 0.09);
      g.add(m); mag = m;
      muzzle = new THREE.Vector3(0, 0.08, -1.17); left = new THREE.Vector3(0, 0.03, -0.36); eject = new THREE.Vector3(0.04, 0.1, 0.0);
      break;
    }
    case "deagle": {
      const s = new THREE.Group();
      box(s, "grey", 0, 0.07, -0.1, 0.034, 0.045, 0.27);
      box(s, "steel", 0, 0.098, -0.1, 0.012, 0.012, 0.27);
      g.add(s); slide = s;
      box(g, "steel", 0, 0.035, -0.1, 0.03, 0.035, 0.22);
      box(g, "poly", 0, -0.04, 0.0, 0.033, 0.13, 0.055, 0.22);
      box(g, "steel", 0, 0.0, -0.06, 0.012, 0.03, 0.05);
      const m = new THREE.Group();
      m.position.set(0, -0.02, 0.0);
      box(m, "steel", 0, -0.06, 0.01, 0.024, 0.06, 0.04, 0.22);
      g.add(m); mag = m;
      muzzle = new THREE.Vector3(0, 0.07, -0.24); left = new THREE.Vector3(0, -0.03, 0.0); eject = new THREE.Vector3(0.02, 0.09, -0.08);
      break;
    }
    case "knife": {
      box(g, "poly", 0, 0.0, 0.0, 0.03, 0.035, 0.12);
      box(g, "steel", 0, 0.0, -0.07, 0.07, 0.015, 0.012);
      const bl = new THREE.Shape();
      bl.moveTo(0, -0.018); bl.lineTo(0.2, -0.012); bl.quadraticCurveTo(0.23, 0.0, 0.2, 0.02); bl.lineTo(0, 0.022);
      const bg = new THREE.ExtrudeGeometry(bl, { depth: 0.004, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 1 });
      bg.rotateY(Math.PI / 2);
      const blade = new THREE.Mesh(bg, mats().blade);
      blade.position.set(0.002, 0, -0.075);
      g.add(blade);
      muzzle = new THREE.Vector3(0, 0, -0.3);
      break;
    }
    case "he": case "smoke": default: {
      const body = new THREE.Mesh(id === "smoke" ? new THREE.CylinderGeometry(0.032, 0.032, 0.12, 12) : new THREE.SphereGeometry(0.038, 12, 10), id === "smoke" ? mats().grey : mats().olive);
      g.add(body);
      box(g, "steel", 0, 0.06, 0, 0.02, 0.03, 0.02);
      box(g, "steel", 0.02, 0.05, 0.0, 0.01, 0.06, 0.015, 0.3);
      muzzle = new THREE.Vector3(0, 0, -0.1);
      break;
    }
  }
  root.scale.setScalar(scale);
  return { root, mag, bolt, slide, muzzle, eject, leftGrip: left };
}

const merged = new Map<string, THREE.BufferGeometry>();
const _col = new THREE.Color();

/** 把若干网格烘焙为一个带顶点色的几何体（第三人称角色使用，大幅减少绘制调用） */
export function bakeMeshes(root: THREE.Object3D, base: THREE.Matrix4 | null = null): THREE.BufferGeometry {
  root.updateMatrixWorld(true);
  const inv = base ?? new THREE.Matrix4().copy(root.matrixWorld).invert();
  const parts: THREE.BufferGeometry[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    let g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
    for (const k of Object.keys(g.attributes)) if (k !== "position" && k !== "normal") g.deleteAttribute(k);
    g.clearGroups();
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
    const mat = m.material as THREE.MeshStandardMaterial;
    _col.copy(mat.color ?? _col.set(0xffffff));
    const n = g.attributes.position.count, c = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { c[i * 3] = _col.r; c[i * 3 + 1] = _col.g; c[i * 3 + 2] = _col.b; }
    g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    parts.push(g);
  });
  const out = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  if (!out) throw new Error("模型合并失败");
  return out;
}

export function mergedGun(id: string): THREE.BufferGeometry {
  let g = merged.get(id);
  if (!g) {
    const gm = buildGun(id, 1);
    g = bakeMeshes(gm.root);
    merged.set(id, g);
  }
  return g;
}
