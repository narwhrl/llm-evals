// 由地图碰撞盒体生成渲染几何：同一盒体即同一位置，保证画面与碰撞一致。
// 细节构件（箱框、绑带、门框、栏杆管）只做视觉，尺寸不超出对应碰撞体数厘米。
import * as THREE from "three";
import * as T from "./textures";

interface Bucket { pos: number[]; nor: number[]; uv: number[]; idx: number[] }
type FaceMat = { key: string; fit?: boolean; scale?: number } | null;
export interface BoxLike { cx: number; cy: number; cz: number; hx: number; hy: number; hz: number; cos: number; sin: number }

type V3 = [number, number, number];
const FACES: { n: V3; u: V3; v: V3 }[] = [
  { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
  { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
];

export class MeshBuilder {
  private buckets = new Map<string, Bucket>();

  private bucket(key: string): Bucket {
    let b = this.buckets.get(key);
    if (!b) this.buckets.set(key, (b = { pos: [], nor: [], uv: [], idx: [] }));
    return b;
  }

  box(b: BoxLike, mat: (face: number) => FaceMat): void {
    const h: V3 = [b.hx, b.hy, b.hz];
    const rot = (x: number, y: number, z: number): V3 => [x * b.cos + z * b.sin, y, -x * b.sin + z * b.cos];
    for (let f = 0; f < 6; f++) {
      const fm = mat(f);
      if (!fm) continue;
      const F = FACES[f];
      const hu = Math.abs(F.u[0]) * h[0] + Math.abs(F.u[1]) * h[1] + Math.abs(F.u[2]) * h[2];
      const hv = Math.abs(F.v[0]) * h[0] + Math.abs(F.v[1]) * h[1] + Math.abs(F.v[2]) * h[2];
      const cl: V3 = [F.n[0] * h[0], F.n[1] * h[1], F.n[2] * h[2]];
      const cw = rot(cl[0], cl[1], cl[2]);
      const uw = rot(F.u[0], F.u[1], F.u[2]), vw = rot(F.v[0], F.v[1], F.v[2]), nw = rot(F.n[0], F.n[1], F.n[2]);
      const fcx = b.cx + cw[0], fcy = b.cy + cw[1], fcz = b.cz + cw[2];
      const offU = fcx * uw[0] + fcy * uw[1] + fcz * uw[2];
      const offV = fcx * vw[0] + fcy * vw[1] + fcz * vw[2];
      const bk = this.bucket(fm.key);
      const base = bk.pos.length / 3;
      for (const [su, sv] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        bk.pos.push(fcx + uw[0] * su * hu + vw[0] * sv * hv, fcy + uw[1] * su * hu + vw[1] * sv * hv, fcz + uw[2] * su * hu + vw[2] * sv * hv);
        bk.nor.push(nw[0], nw[1], nw[2]);
        if (fm.fit) bk.uv.push((su + 1) / 2, (sv + 1) / 2);
        else { const s = fm.scale ?? 2; bk.uv.push((offU + su * hu) / s, (offV + sv * hv) / s); }
      }
      bk.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }

  geometry(key: string, g: THREE.BufferGeometry, m: THREE.Matrix4): void {
    const src = g.index ? g : g;
    const pos = src.getAttribute("position"), nor = src.getAttribute("normal"), uv = src.getAttribute("uv");
    const nm = new THREE.Matrix3().getNormalMatrix(m);
    const bk = this.bucket(key);
    const base = bk.pos.length / 3;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m);
      bk.pos.push(v.x, v.y, v.z);
      v.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize();
      bk.nor.push(v.x, v.y, v.z);
      bk.uv.push(uv ? uv.getX(i) : 0, uv ? uv.getY(i) : 0);
    }
    if (src.index) for (let i = 0; i < src.index.count; i++) bk.idx.push(base + src.index.getX(i));
    else for (let i = 0; i < pos.count; i++) bk.idx.push(base + i);
  }

  build(mats: Record<string, THREE.Material>, shadows: boolean): THREE.Group {
    const group = new THREE.Group();
    for (const [key, b] of this.buckets) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.pos, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.nor, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.uv, 2));
      g.setIndex(b.idx);
      g.computeBoundingSphere();
      const mat = mats[key];
      if (!mat) throw new Error(`缺少材质：${key}`);
      const mesh = new THREE.Mesh(g, mat);
      mesh.name = key;
      mesh.castShadow = shadows && key !== "glass";
      mesh.receiveShadow = shadows;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      group.add(mesh);
    }
    this.buckets.clear();
    return group;
  }
}

/** 以父盒体为坐标系放置一个子盒体（随父盒体朝向旋转） */
export function sub(p: BoxLike, lx: number, ly: number, lz: number, hx: number, hy: number, hz: number): BoxLike {
  return { cx: p.cx + lx * p.cos + lz * p.sin, cy: p.cy + ly, cz: p.cz - lx * p.sin + lz * p.cos, hx, hy, hz, cos: p.cos, sin: p.sin };
}

export function makeMaterials(): Record<string, THREE.Material> {
  const std = (o: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(o);
  const deck = T.deckPlate(1), deck2 = T.deckPlate(2, "#6c6f70"), deckDark = T.deckPlate(3, "#4a4c4d");
  const cabin = T.cabinWall(4), hull = T.hullSide(5), bump = T.corrugationBump();
  const m: Record<string, THREE.Material> = {
    deck: std({ map: deck, bumpMap: deck, bumpScale: 1.5, roughness: 0.85, metalness: 0.3 }),
    deck2: std({ map: deck2, bumpMap: deck2, bumpScale: 1.5, roughness: 0.8, metalness: 0.3 }),
    deckDark: std({ map: deckDark, bumpMap: deckDark, bumpScale: 1.5, roughness: 0.85, metalness: 0.3 }),
    steelDark: std({ color: 0x4a4e52, map: hull, roughness: 0.75, metalness: 0.45 }),
    hull: std({ map: hull, roughness: 0.8, metalness: 0.35 }),
    cabin: std({ map: cabin, bumpMap: cabin, bumpScale: 0.6, roughness: 0.78, metalness: 0.1, emissive: 0x24231f }),
    lamp: new THREE.MeshBasicMaterial({ color: 0xfff1d0 }),
    frame: std({ color: 0x2f3134, roughness: 0.6, metalness: 0.6 }),
    rail: std({ map: T.railMetal(), roughness: 0.55, metalness: 0.5 }),
    locker: std({ color: 0x5d6b5e, roughness: 0.6, metalness: 0.5 }),
    glass: std({ color: 0x1b2a33, roughness: 0.08, metalness: 0.9, envMapIntensity: 1.5 }),
    wood: std({ map: T.woodPlanks(6), bumpMap: T.woodPlanks(6), bumpScale: 0.8, roughness: 0.9, metalness: 0 }),
    wood2: std({ map: T.woodPlanks(7, "#9a7a52"), roughness: 0.9, metalness: 0 }),
    woodDark: std({ map: T.woodPlanks(8, "#6e5233"), roughness: 0.92, metalness: 0 }),
    tarp: std({ map: T.tarp(9), bumpMap: T.tarp(9), bumpScale: 1.2, roughness: 0.95, metalness: 0 }),
    strap: std({ color: 0x8a6d2e, roughness: 0.85, metalness: 0 }),
    croof: std({ color: 0x6a6f70, map: deckDark, roughness: 0.7, metalness: 0.4 }),
  };
  let seed = 20;
  for (const [look, col] of Object.entries(T.CONTAINER_COLORS)) {
    m[`cside-${look}`] = std({ map: T.containerSide(col, seed++), bumpMap: bump, bumpScale: 4, roughness: 0.62, metalness: 0.35 });
    m[`cdoor-${look}`] = std({ map: T.containerDoor(col, seed++), roughness: 0.62, metalness: 0.35 });
  }
  return m;
}
