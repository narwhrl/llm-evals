/**
 * 碰撞世界：静态盒体（yaw 旋转盒）+ 网格加速 + 角色胶囊移动。
 * 同一套 collider 同时服务：渲染几何、人物碰撞、弹道遮挡、电脑寻路。
 */
import {
  Box, Vec3, clamp, rayBox, rotY, vAdd, vCopy, vSub, vScale, v3,
} from '../geometry/math';

export type SurfaceMaterial = 'metal' | 'wood' | 'tarp' | 'deck' | 'glass';

export interface Collider extends Box {
  id: number;
  /** 弹道材质：metal/deck 阻挡；wood/tarp 可穿透 */
  surface: SurfaceMaterial;
  /** 是否阻挡人物移动 */
  charBlock: boolean;
  /** 是否阻挡子弹（栏杆网面、玻璃为 false 或按材质） */
  bulletBlock: boolean;
  /** 是否可站立（箱顶） */
  standable: boolean;
  /** 地图语义标签，用于调试与文档对照 */
  tag: string;
}

export interface Body {
  pos: Vec3;          // 脚底中心
  vel: Vec3;
  radius: number;
  height: number;     // 当前碰撞高度（站/蹲）
  grounded: boolean;
  groundY: number;
}

export interface StaticHit {
  t: number;
  point: Vec3;
  normal: Vec3;
  collider: Collider;
}

export interface PenHit {
  tEnter: number;
  tExit: number;
  collider: Collider;
}

const CELL = 5;

export class ColliderWorld {
  colliders: Collider[] = [];
  private nextId = 1;
  private grid = new Map<string, Collider[]>();

  addBox(c: Omit<Collider, 'id'>): Collider {
    const col: Collider = { ...c, id: this.nextId++ };
    this.colliders.push(col);
    const r = Math.hypot(col.hx, col.hz) + 0.1;
    const x0 = Math.floor((col.cx - r) / CELL), x1 = Math.floor((col.cx + r) / CELL);
    const z0 = Math.floor((col.cz - r) / CELL), z1 = Math.floor((col.cz + r) / CELL);
    for (let x = x0; x <= x1; x++) {
      for (let z = z0; z <= z1; z++) {
        const k = x + ',' + z;
        let arr = this.grid.get(k);
        if (!arr) { arr = []; this.grid.set(k, arr); }
        arr.push(col);
      }
    }
    return col;
  }

  clear(): void {
    this.colliders = [];
    this.grid.clear();
    this.nextId = 1;
  }

  /** 区域查询：与 AABB 相交的 collider（网格加速） */
  queryRegion(minX: number, minZ: number, maxX: number, maxZ: number): Collider[] {
    const out: Collider[] = [];
    const seen = new Set<number>();
    const x0 = Math.floor(minX / CELL), x1 = Math.floor(maxX / CELL);
    const z0 = Math.floor(minZ / CELL), z1 = Math.floor(maxZ / CELL);
    for (let x = x0; x <= x1; x++) {
      for (let z = z0; z <= z1; z++) {
        const arr = this.grid.get(x + ',' + z);
        if (!arr) continue;
        for (const c of arr) {
          if (seen.has(c.id)) continue;
          seen.add(c.id);
          const r = Math.hypot(c.hx, c.hz);
          if (c.cx + r >= minX && c.cx - r <= maxX && c.cz + r >= minZ && c.cz - r <= maxZ) out.push(c);
        }
      }
    }
    return out;
  }

  /** 最近静态命中（子弹 / 视线 / 手雷） */
  raycast(o: Vec3, d: Vec3, maxDist: number, opts?: { bullets?: boolean }): StaticHit | null {
    let best: StaticHit | null = null;
    for (const c of this.colliders) {
      if (opts?.bullets && !c.bulletBlock) continue;
      const h = rayBox(o, d, c);
      if (!h) continue;
      if (h.tEnter > maxDist || h.tExit <= 0) continue; // 完全在射线后方的不算
      const t = h.tEnter >= 0 ? h.tEnter : 0; // 起点在盒内
      if (best && t >= best.t) continue;
      // 求命中面法线：局部系中找最贴近的轴
      const pLocal = rotY(vSub(vAdd(o, vScale(d, t)), v3(c.cx, c.cy, c.cz)), -c.yaw);
      const dx = c.hx - Math.abs(pLocal.x), dy = c.hy - Math.abs(pLocal.y), dz = c.hz - Math.abs(pLocal.z);
      let nLocal: Vec3;
      if (dx <= dy && dx <= dz) nLocal = v3(Math.sign(pLocal.x) || 1, 0, 0);
      else if (dy <= dz) nLocal = v3(0, Math.sign(pLocal.y) || 1, 0);
      else nLocal = v3(0, 0, Math.sign(pLocal.z) || 1);
      const normal = rotY(nLocal, c.yaw);
      best = { t, point: vAdd(o, vScale(d, t)), normal, collider: c };
    }
    return best;
  }

  /** 沿射线的所有穿透候选（含进/出参数），按进入距离排序 */
  raycastPenetrations(o: Vec3, d: Vec3, maxDist: number): PenHit[] {
    const list: PenHit[] = [];
    for (const c of this.colliders) {
      if (!c.bulletBlock) continue;
      const h = rayBox(o, d, c);
      if (!h) continue;
      if (h.tExit <= 0 || h.tEnter >= maxDist) continue;
      list.push({ tEnter: Math.max(0, h.tEnter), tExit: Math.min(maxDist, h.tExit), collider: c });
    }
    list.sort((a, b) => a.tEnter - b.tEnter);
    return list;
  }

  /** 视线检测（电脑感知、爆炸遮挡共用）。返回 null=无遮挡，否则遮挡点距离 */
  lineOfSight(a: Vec3, b: Vec3, smokeTest?: (p: Vec3, q: Vec3) => boolean): number | null {
    const d = vSub(b, a);
    const dist = Math.hypot(d.x, d.y, d.z);
    if (dist < 1e-6) return null;
    const dir = vScale(d, 1 / dist);
    if (smokeTest && smokeTest(a, b)) return dist;
    const hit = this.raycast(a, dir, dist - 0.02, { bullets: true });
    return hit ? hit.t : null;
  }

  /**
   * 胶囊移动：dt 内积分并解决碰撞（含台阶、贴墙滑动、天花板）。
   * body.pos 为脚底中心。返回实际位移后状态。
   */
  moveBody(body: Body, dt: number, stepHeight: number): void {
    // 水平位移
    let nx = body.pos.x + body.vel.x * dt;
    let nz = body.pos.z + body.vel.z * dt;
    let ny = body.pos.y + body.vel.y * dt;
    const r = body.radius;

    const resolveAt = (px: number, pz: number, py: number): { x: number; z: number; pushY: number; hitWall: boolean; ceil: boolean } => {
      let ox = px, oz = pz, pushY = 0, hitWall = false, ceil = false;
      const cols = this.queryRegion(px - r - 1, pz - r - 1, px + r + 1, pz + r + 1);
      for (let iter = 0; iter < 3; iter++) {
        let moved = false;
        for (const c of cols) {
          if (!c.charBlock) continue;
          // 局部系胶囊底/顶
          const feet = py + 0.05;
          const head = py + body.height - 0.05;
          const top = c.cy + c.hy;
          const bottom = c.cy - c.hy;
          if (top <= feet || bottom >= head) {
            // 纯垂直关系：若脚在盒顶附近则由地面检测处理
            continue;
          }
          const lp = rotY(vSub(v3(ox, 0, oz), v3(c.cx, 0, c.cz)), -c.yaw);
          // 水平圆 vs 局部矩形（扩展 r）
          const ex = c.hx + r, ez = c.hz + r;
          if (Math.abs(lp.x) >= ex || Math.abs(lp.z) >= ez) continue;
          // 推出量与方向
          const dxE = ex - Math.abs(lp.x);
          const dzE = ez - Math.abs(lp.z);
          // 尝试踏台阶：盒顶在脚上方 stepHeight 内且头顶有空间
          if (top - py <= stepHeight && top - py > 0 && top < head - 0.4) {
            pushY = Math.max(pushY, top - py);
            continue;
          }
          hitWall = true;
          if (dxE < dzE) {
            const sign = lp.x >= 0 ? 1 : -1;
            lp.x = sign * ex;
          } else {
            const sign = lp.z >= 0 ? 1 : -1;
            lp.z = sign * ez;
          }
          const wp = rotY(lp, c.yaw);
          ox = c.cx + wp.x;
          oz = c.cz + wp.z;
          moved = true;
        }
        if (!moved) break;
      }
      return { x: ox, z: oz, pushY, hitWall, ceil };
    };

    const res = resolveAt(nx, nz, ny);
    nx = res.x; nz = res.z;
    if (res.pushY > 0 && res.pushY <= stepHeight) ny += res.pushY;

    // 垂直：地面（脚下方最高的可站立盒顶）
    let ground = -Infinity;
    const gcols = this.queryRegion(nx - r, nz - r, nx + r, nz + r);
    for (const c of gcols) {
      if (!c.standable && !c.charBlock) continue;
      const top = c.cy + c.hy;
      if (top <= ny + 0.35 && top > ground) {
        // 水平覆盖检查（局部）
        const lp = rotY(vSub(v3(nx, 0, nz), v3(c.cx, 0, c.cz)), -c.yaw);
        const rr = r * 0.6;
        if (Math.abs(lp.x) <= c.hx + rr && Math.abs(lp.z) <= c.hz + rr) ground = top;
      }
    }
    if (ny <= ground + 1e-4 && body.vel.y <= 0.001) {
      ny = ground;
      body.grounded = true;
      body.groundY = ground;
      body.vel.y = 0;
    } else {
      body.grounded = false;
      // 天花板
      if (body.vel.y > 0) {
        for (const c of gcols) {
          if (!c.charBlock) continue;
          const bottom = c.cy - c.hy;
          const headY = ny + body.height;
          const lp = rotY(vSub(v3(nx, 0, nz), v3(c.cx, 0, c.cz)), -c.yaw);
          if (Math.abs(lp.x) <= c.hx + r * 0.5 && Math.abs(lp.z) <= c.hz + r * 0.5) {
            if (bottom >= body.pos.y + body.height - 0.1 && headY > bottom) {
              ny = Math.min(ny, bottom - body.height - 0.01);
              body.vel.y = Math.min(0, body.vel.y);
            }
          }
        }
      }
    }
    body.pos.x = nx;
    body.pos.z = nz;
    body.pos.y = ny;
  }

  /** 指定水平位置、给定高度以下的最高站立面（出生点校验用） */
  groundHeightAt(x: number, z: number, belowY: number, radius = 0.3): number {
    let ground = -Infinity;
    for (const c of this.queryRegion(x - radius, z - radius, x + radius, z + radius)) {
      if (!c.standable && !c.charBlock) continue;
      const top = c.cy + c.hy;
      if (top <= belowY + 0.05 && top > ground) {
        const lp = rotY(vSub(v3(x, 0, z), v3(c.cx, 0, c.cz)), -c.yaw);
        if (Math.abs(lp.x) <= c.hx + radius && Math.abs(lp.z) <= c.hz + radius) ground = top;
      }
    }
    return ground;
  }

  /** 出生点是否被卡（脚部空间检查） */
  spawnClear(x: number, y: number, z: number, height: number, radius: number): boolean {
    const cols = this.queryRegion(x - radius, z - radius, x + radius, z + radius);
    for (const c of cols) {
      if (!c.charBlock) continue;
      if (c.cy + c.hy <= y + 0.1 || c.cy - c.hy >= y + height - 0.1) continue;
      const lp = rotY(vSub(v3(x, 0, z), v3(c.cx, 0, c.cz)), -c.yaw);
      if (Math.abs(lp.x) < c.hx + radius - 0.02 && Math.abs(lp.z) < c.hz + radius - 0.02) return false;
    }
    return true;
  }
}

export const cloneBox = (b: Box): Box => ({ cx: b.cx, cy: b.cy, cz: b.cz, hx: b.hx, hy: b.hy, hz: b.hz, yaw: b.yaw });
export const copyBodyPos = (b: Body): Vec3 => vCopy(b.pos);
export const clampLen = (v: Vec3, max: number): Vec3 => {
  const l = Math.hypot(v.x, v.y, v.z);
  return l > max && l > 1e-9 ? vScale(v, max / l) : v;
};
export { clamp };
