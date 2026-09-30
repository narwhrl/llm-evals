// 地图空间查询：同一组带朝向的盒体同时服务渲染、人物碰撞、弹道/视线遮挡与寻路采样。
// 坐标：+X 指向蓝方（东端），+Y 向上，+Z 指向北舷；单位米。

export type Mat = "steel" | "wood" | "tarp" | "hull" | "clip" | "rail";

export interface BoxSpec {
  id: string;
  kind: string;
  mat: Mat;
  c: [number, number, number];
  h: [number, number, number]; // 半尺寸
  yaw?: number;
  move?: boolean;
  bullet?: boolean;
  sight?: boolean;
  stand?: boolean;
  look?: string; // 渲染变体
  ref?: string; // 参考来源
}

export interface Box {
  id: string;
  kind: string;
  mat: Mat;
  cx: number; cy: number; cz: number;
  hx: number; hy: number; hz: number;
  yaw: number; cos: number; sin: number;
  move: boolean; bullet: boolean; sight: boolean; stand: boolean;
  look: string;
  ref: string;
  minX: number; maxX: number; minZ: number; maxZ: number;
  top: number; bottom: number;
  mark: number;
}

export interface RayHit {
  box: Box;
  tIn: number;
  tOut: number;
  nx: number; ny: number; nz: number;
}

export function makeBox(s: BoxSpec): Box {
  const yaw = s.yaw ?? 0;
  const cos = Math.cos(yaw), sin = Math.sin(yaw);
  const ex = Math.abs(s.h[0] * cos) + Math.abs(s.h[2] * sin);
  const ez = Math.abs(s.h[0] * sin) + Math.abs(s.h[2] * cos);
  const isClip = s.mat === "clip";
  return {
    id: s.id, kind: s.kind, mat: s.mat,
    cx: s.c[0], cy: s.c[1], cz: s.c[2],
    hx: s.h[0], hy: s.h[1], hz: s.h[2],
    yaw, cos, sin,
    move: s.move ?? true,
    bullet: s.bullet ?? !isClip,
    sight: s.sight ?? !isClip,
    stand: s.stand ?? false,
    look: s.look ?? "",
    ref: s.ref ?? "",
    minX: s.c[0] - ex, maxX: s.c[0] + ex, minZ: s.c[2] - ez, maxZ: s.c[2] + ez,
    top: s.c[1] + s.h[1], bottom: s.c[1] - s.h[1],
    mark: 0,
  };
}

/** 盒体局部坐标（与 three.js rotation.y = yaw 一致） */
export function toLocalX(b: Box, dx: number, dz: number): number {
  return dx * b.cos - dz * b.sin;
}
export function toLocalZ(b: Box, dx: number, dz: number): number {
  return dx * b.sin + dz * b.cos;
}

/** 射线与带朝向盒体求交；返回是否命中，并写入 out */
export function rayBox(
  b: Box, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, out: RayHit,
): boolean {
  const px = toLocalX(b, ox - b.cx, oz - b.cz);
  const pz = toLocalZ(b, ox - b.cx, oz - b.cz);
  const py = oy - b.cy;
  const lx = toLocalX(b, dx, dz);
  const lz = toLocalZ(b, dx, dz);
  let tIn = -Infinity, tOut = Infinity, axis = -1, sign = 0;
  const o = [px, py, pz], d = [lx, dy, lz], h = [b.hx, b.hy, b.hz];
  for (let i = 0; i < 3; i++) {
    if (Math.abs(d[i]) < 1e-9) {
      if (o[i] < -h[i] || o[i] > h[i]) return false;
      continue;
    }
    const inv = 1 / d[i];
    let t0 = (-h[i] - o[i]) * inv, t1 = (h[i] - o[i]) * inv;
    let s = -1;
    if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; s = 1; }
    if (t0 > tIn) { tIn = t0; axis = i; sign = s; }
    if (t1 < tOut) tOut = t1;
    if (tIn > tOut) return false;
  }
  if (tOut < 0) return false;
  let lnx = 0, lny = 0, lnz = 0;
  if (axis === 0) lnx = sign; else if (axis === 1) lny = sign; else if (axis === 2) lnz = sign;
  out.box = b;
  out.tIn = tIn;
  out.tOut = tOut;
  out.nx = lnx * b.cos + lnz * b.sin;
  out.ny = lny;
  out.nz = -lnx * b.sin + lnz * b.cos;
  return true;
}

/** 水平圆与盒体足迹的最近距离平方 */
export function circleDist2(b: Box, px: number, pz: number): number {
  const lx = toLocalX(b, px - b.cx, pz - b.cz);
  const lz = toLocalZ(b, px - b.cx, pz - b.cz);
  const qx = Math.max(-b.hx, Math.min(b.hx, lx));
  const qz = Math.max(-b.hz, Math.min(b.hz, lz));
  return (lx - qx) ** 2 + (lz - qz) ** 2;
}

export function pointInBox(b: Box, x: number, y: number, z: number): boolean {
  if (y < b.bottom || y > b.top) return false;
  const lx = toLocalX(b, x - b.cx, z - b.cz);
  const lz = toLocalZ(b, x - b.cx, z - b.cz);
  return Math.abs(lx) <= b.hx && Math.abs(lz) <= b.hz;
}

const CELL = 4;

/** 带均匀网格加速的盒体集合 */
export class World {
  readonly boxes: Box[];
  private grid = new Map<number, Box[]>();
  private stamp = 1;
  private hitPool: RayHit[] = [];
  private hits: RayHit[] = [];

  constructor(specs: BoxSpec[]) {
    this.boxes = specs.map(makeBox);
    for (const b of this.boxes) {
      for (let gx = Math.floor(b.minX / CELL); gx <= Math.floor(b.maxX / CELL); gx++)
        for (let gz = Math.floor(b.minZ / CELL); gz <= Math.floor(b.maxZ / CELL); gz++) {
          const k = key(gx, gz);
          let list = this.grid.get(k);
          if (!list) this.grid.set(k, (list = []));
          list.push(b);
        }
    }
  }

  /** 收集与水平矩形相交的盒体（去重） */
  query(minX: number, minZ: number, maxX: number, maxZ: number, out: Box[]): Box[] {
    out.length = 0;
    const st = ++this.stamp;
    for (let gx = Math.floor(minX / CELL); gx <= Math.floor(maxX / CELL); gx++)
      for (let gz = Math.floor(minZ / CELL); gz <= Math.floor(maxZ / CELL); gz++) {
        const list = this.grid.get(key(gx, gz));
        if (!list) continue;
        for (const b of list) {
          if (b.mark === st) continue;
          b.mark = st;
          if (b.maxX < minX || b.minX > maxX || b.maxZ < minZ || b.minZ > maxZ) continue;
          out.push(b);
        }
      }
    return out;
  }

  /**
   * 沿射线收集所有命中，按入射距离排序。filter 决定哪些盒体参与（弹道 / 视线 / 移动）。
   * 返回数组由 World 复用，调用方不得长期持有。
   */
  raycastAll(
    ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxT: number,
    filter: (b: Box) => boolean,
  ): RayHit[] {
    const hits = this.hits;
    hits.length = 0;
    const st = ++this.stamp;
    // 沿网格步进（2D DDA）
    let gx = Math.floor(ox / CELL), gz = Math.floor(oz / CELL);
    const ex = ox + dx * maxT, ez = oz + dz * maxT;
    const gxe = Math.floor(ex / CELL), gze = Math.floor(ez / CELL);
    const sx = dx > 0 ? 1 : -1, sz = dz > 0 ? 1 : -1;
    const tdx = Math.abs(dx) > 1e-9 ? CELL / Math.abs(dx) : Infinity;
    const tdz = Math.abs(dz) > 1e-9 ? CELL / Math.abs(dz) : Infinity;
    let tmx = Math.abs(dx) > 1e-9 ? ((dx > 0 ? (gx + 1) * CELL - ox : ox - gx * CELL) / Math.abs(dx)) : Infinity;
    let tmz = Math.abs(dz) > 1e-9 ? ((dz > 0 ? (gz + 1) * CELL - oz : oz - gz * CELL) / Math.abs(dz)) : Infinity;
    let guard = 0;
    for (;;) {
      const list = this.grid.get(key(gx, gz));
      if (list) {
        for (const b of list) {
          if (b.mark === st) continue;
          b.mark = st;
          if (!filter(b)) continue;
          const h = this.hitPool[hits.length] ?? (this.hitPool[hits.length] = blankHit());
          if (rayBox(b, ox, oy, oz, dx, dy, dz, h) && h.tIn <= maxT) hits.push(h);
        }
      }
      if ((gx === gxe && gz === gze) || ++guard > 256) break;
      if (tmx < tmz) { if (tmx > maxT) break; gx += sx; tmx += tdx; }
      else { if (tmz > maxT) break; gz += sz; tmz += tdz; }
    }
    hits.sort((a, b) => a.tIn - b.tIn);
    return hits;
  }

  /** 第一处满足过滤条件的命中距离（Infinity 表示无遮挡） */
  firstHit(
    ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxT: number,
    filter: (b: Box) => boolean,
  ): number {
    const hits = this.raycastAll(ox, oy, oz, dx, dy, dz, maxT, filter);
    for (const h of hits) if (h.tOut > 1e-4) return Math.max(0, h.tIn);
    return Infinity;
  }

  /** 两点之间是否被实体（视线）遮挡 */
  segmentBlocked(ax: number, ay: number, az: number, bx: number, by: number, bz: number, filter: (b: Box) => boolean): boolean {
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-6) return false;
    return this.firstHit(ax, ay, az, dx / len, dy / len, dz / len, len, filter) < len;
  }

  /**
   * 圆形足迹下、yMax 以下最高的可承载表面。无支撑返回 -Infinity。
   */
  groundAt(x: number, z: number, r: number, yMax: number, scratch: Box[]): number {
    this.query(x - r, z - r, x + r, z + r, scratch);
    let best = -Infinity;
    const r2 = r * r;
    for (const b of scratch) {
      if (!b.move || b.top > yMax || b.top <= best) continue;
      if (circleDist2(b, x, z) < r2) best = b.top;
    }
    return best;
  }

  /** 竖直区间 [y0, y1] 内的圆柱是否与任何移动阻挡体相交 */
  cylinderBlocked(x: number, z: number, r: number, y0: number, y1: number, scratch: Box[]): boolean {
    this.query(x - r, z - r, x + r, z + r, scratch);
    const r2 = r * r;
    for (const b of scratch) {
      if (!b.move || b.top <= y0 || b.bottom >= y1) continue;
      if (circleDist2(b, x, z) < r2) return true;
    }
    return false;
  }

  byId(id: string): Box | undefined {
    return this.boxes.find((b) => b.id === id);
  }
}

function key(gx: number, gz: number): number {
  return (gx + 512) * 1024 + (gz + 512);
}

function blankHit(): RayHit {
  return { box: null as unknown as Box, tIn: 0, tOut: 0, nx: 0, ny: 0, nz: 0 };
}

export const bulletFilter = (b: Box) => b.bullet;
export const sightFilter = (b: Box) => b.sight;
export const moveFilter = (b: Box) => b.move;
