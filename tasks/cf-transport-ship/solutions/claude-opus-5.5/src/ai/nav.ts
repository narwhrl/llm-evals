// 电脑寻路图：直接从碰撞盒体采样生成，保证与实际可达结构一致。
// 连接分三类：步行（逐 0.1 m 检查高度差与人物空间）、跳上（有限高度，需起跳）、跳下（单向）。
// 不同楼层即使投影接近也只有在真实连通时才会相连。
import { PLAYER } from "../config";
import { type Box, type World } from "../core/world";

export type LinkKind = "walk" | "jump" | "drop";
export interface NavLink { to: number; kind: LinkKind; cost: number }
export interface NavNode { id: number; x: number; y: number; z: number; zone: string; links: NavLink[] }

const STEP = 0.5;
const SAMPLE = 0.1;
const CLEAR_R = 0.36;
const PATH_R = 0.1;
const MAX_STEP = PLAYER.stepHeight + 0.02;
const MAX_JUMP = 1.0; // 电脑只使用稳妥高度的跳箱；更高的斜跳留给玩家技巧
const MAX_DROP = 3.3;

export function zoneOf(x: number, y: number, z: number): string {
  if (Math.abs(x) > 42) return "cabin";
  if (Math.abs(x) > 35 && y > 1) return "platform";
  if (y > 2.2) return "high";
  if (y > 0.5) return "crate";
  if (z > 8.4) return "laneN";
  if (z < -8.4) return "laneS";
  return "deck";
}

export class NavGraph {
  nodes: NavNode[] = [];
  private cells = new Map<number, number[]>();
  private scratch: Box[] = [];
  // A* 复用缓冲
  private g = new Float64Array(0);
  private came = new Int32Array(0);
  private stamp = new Int32Array(0);
  private closed = new Int32Array(0);
  private run = 0;

  static build(world: World, seeds: { x: number; y: number; z: number }[]): NavGraph {
    const nav = new NavGraph();
    nav.sample(world);
    nav.connect(world);
    nav.prune(seeds);
    return nav;
  }

  private sample(world: World): void {
    const tmp: Box[] = [];
    for (let x = -49; x <= 49 + 1e-6; x += STEP)
      for (let z = -12; z <= 12 + 1e-6; z += STEP) {
        const tops = new Set<number>();
        world.query(x - 0.01, z - 0.01, x + 0.01, z + 0.01, tmp);
        for (const b of tmp) if (b.move && b.mat !== "clip" && b.mat !== "rail") tops.add(b.top);
        for (const y of tops) {
          if (world.groundAt(x, z, 0.05, y + 0.01, this.scratch) !== y) continue;
          if (world.cylinderBlocked(x, z, CLEAR_R, y + MAX_STEP, y + PLAYER.standHeight, this.scratch)) continue;
          // 盒体边缘附近：站立足迹须有至少一半落在支撑面上
          if (world.groundAt(x, z, 0.2, y + 0.01, this.scratch) !== y) continue;
          this.add(x, y, z);
        }
      }
  }

  private add(x: number, y: number, z: number): void {
    const id = this.nodes.length;
    this.nodes.push({ id, x, y, z, zone: zoneOf(x, y, z), links: [] });
    const k = cellKey(x, z);
    let l = this.cells.get(k);
    if (!l) this.cells.set(k, (l = []));
    l.push(id);
  }

  /** 沿 a→b 检查可通行性 */
  classify(world: World, a: NavNode, b: NavNode): LinkKind | null {
    const dx = b.x - a.x, dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    const n = Math.max(1, Math.ceil(len / SAMPLE));
    let y = a.y, maxRise = 0, maxDrop = 0, bigMoves = 0;
    for (let i = 1; i <= n; i++) {
      const t = i / n, x = a.x + dx * t, z = a.z + dz * t;
      const limit = y + (i === n ? Math.max(MAX_STEP, b.y - y + 0.01) : MAX_JUMP + 0.01);
      const gy = world.groundAt(x, z, 0.12, limit, this.scratch);
      if (gy === -Infinity) return null;
      const d = gy - y;
      if (d > MAX_STEP) { maxRise = Math.max(maxRise, d); bigMoves++; }
      else if (d < -MAX_STEP) { maxDrop = Math.max(maxDrop, -d); bigMoves++; }
      y = gy;
      // 端点已按完整体宽检查；路径中段只检查中心线（半径须小于地面采样半径，否则起跳目标会挡住自身）
      if (world.cylinderBlocked(x, z, PATH_R, y + MAX_STEP, y + PLAYER.standHeight, this.scratch)) return null;
    }
    if (Math.abs(y - b.y) > 0.02) return null;
    if (bigMoves === 0) return "walk";
    if (bigMoves > 1) return null;
    if (maxRise > 0) {
      if (maxRise > MAX_JUMP) return null;
      // 起跳需要头顶空间
      if (world.cylinderBlocked(a.x, a.z, CLEAR_R * 0.9, a.y + PLAYER.standHeight, a.y + PLAYER.standHeight + 1.1, this.scratch)) return null;
      return "jump";
    }
    return maxDrop <= MAX_DROP ? "drop" : null;
  }

  private connect(world: World): void {
    const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (const a of this.nodes) {
      for (const [ix, iz] of dirs) {
        const cand = this.cells.get(cellKey(a.x + ix * STEP, a.z + iz * STEP));
        if (!cand) continue;
        for (const bi of cand) {
          const b = this.nodes[bi];
          if (Math.abs(b.y - a.y) > MAX_DROP) continue;
          const ab = this.classify(world, a, b);
          const ba = this.classify(world, b, a);
          const d = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
          if (ab) a.links.push({ to: b.id, kind: ab, cost: d + (ab === "walk" ? 0 : ab === "jump" ? 1.5 : 0.6) });
          if (ba) b.links.push({ to: a.id, kind: ba, cost: d + (ba === "walk" ? 0 : ba === "jump" ? 1.5 : 0.6) });
        }
      }
      // 相邻箱体之间的起跳/跳下距离约 1 m：补充两格跨度的跳跃连接（不产生步行连接）
      for (const [ix, iz] of [[2, 0], [0, 2], [2, 1], [1, 2], [2, -1], [-1, 2]]) {
        const cand = this.cells.get(cellKey(a.x + ix * STEP, a.z + iz * STEP));
        if (!cand) continue;
        for (const bi of cand) {
          const b = this.nodes[bi];
          if (Math.abs(b.y - a.y) < MAX_STEP || Math.abs(b.y - a.y) > MAX_DROP) continue;
          const d = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
          for (const [p, q] of [[a, b], [b, a]]) {
            const k = this.classify(world, p, q);
            if (k === "jump" || k === "drop") p.links.push({ to: q.id, kind: k, cost: d + (k === "jump" ? 1.5 : 0.6) });
          }
        }
      }
    }
  }

  /** 只保留从出生点可达（或可回到出生点方向）的节点 */
  private prune(seeds: { x: number; y: number; z: number }[]): void {
    const keep = new Uint8Array(this.nodes.length);
    const queue: number[] = [];
    for (const s of seeds) {
      const n = this.nearest(s.x, s.y, s.z);
      if (n >= 0 && !keep[n]) { keep[n] = 1; queue.push(n); }
    }
    while (queue.length) {
      const i = queue.pop()!;
      for (const l of this.nodes[i].links) if (!keep[l.to]) { keep[l.to] = 1; queue.push(l.to); }
    }
    const remap = new Int32Array(this.nodes.length).fill(-1);
    const out: NavNode[] = [];
    for (const n of this.nodes) if (keep[n.id]) { remap[n.id] = out.length; out.push(n); }
    for (const n of out) {
      n.id = remap[n.id];
      n.links = n.links.filter((l) => remap[l.to] >= 0).map((l) => ({ ...l, to: remap[l.to] }));
    }
    this.nodes = out;
    this.cells.clear();
    for (const n of out) {
      const k = cellKey(n.x, n.z);
      let l = this.cells.get(k);
      if (!l) this.cells.set(k, (l = []));
      l.push(n.id);
    }
    const N = out.length;
    this.g = new Float64Array(N);
    this.came = new Int32Array(N);
    this.stamp = new Int32Array(N);
    this.closed = new Int32Array(N);
  }

  /** 最近节点：水平距离 + 高度差惩罚，只接受脚下附近楼层 */
  nearest(x: number, y: number, z: number, maxR = 2.5): number {
    let best = -1, bd = Infinity;
    const r = Math.ceil(maxR / STEP);
    const cx = Math.round(x / STEP), cz = Math.round(z / STEP);
    for (let i = -r; i <= r; i++)
      for (let j = -r; j <= r; j++) {
        const l = this.cells.get(cellKey((cx + i) * STEP, (cz + j) * STEP));
        if (!l) continue;
        for (const id of l) {
          const n = this.nodes[id];
          const dy = n.y - y;
          if (dy > 0.6 || dy < -1.2) continue;
          const d = Math.hypot(n.x - x, n.z - z) + Math.abs(dy) * 3;
          if (d < bd) { bd = d; best = id; }
        }
      }
    return best;
  }

  /** A*；bias 为按节点附加的代价（路线偏好） */
  path(from: number, to: number, bias?: (n: NavNode) => number): number[] | null {
    if (from < 0 || to < 0) return null;
    const run = ++this.run;
    const nodes = this.nodes, g = this.g, came = this.came, stamp = this.stamp, closed = this.closed;
    const goal = nodes[to];
    const heap = new MinHeap();
    stamp[from] = run; g[from] = 0; came[from] = -1;
    heap.push(from, h(nodes[from], goal));
    let expanded = 0;
    while (heap.size) {
      const cur = heap.pop();
      if (cur === to) break;
      if (closed[cur] === run) continue;
      closed[cur] = run;
      if (++expanded > 40000) return null;
      for (const l of nodes[cur].links) {
        if (closed[l.to] === run) continue;
        const ng = g[cur] + l.cost + (bias ? bias(nodes[l.to]) : 0);
        if (stamp[l.to] !== run || ng < g[l.to]) {
          stamp[l.to] = run; g[l.to] = ng; came[l.to] = cur;
          heap.push(l.to, ng + h(nodes[l.to], goal));
        }
      }
    }
    if (stamp[to] !== run) return null;
    const out: number[] = [];
    for (let c = to; c !== -1; c = came[c]) out.push(c);
    return out.reverse();
  }

  /** 半径内的节点（按网格间隔 stride 抽样，用于掩体搜索） */
  nodesNear(x: number, z: number, r: number, stride = 2, out: number[] = []): number[] {
    out.length = 0;
    const cr = Math.ceil(r / STEP);
    const cx = Math.round(x / STEP), cz = Math.round(z / STEP);
    for (let i = -cr; i <= cr; i += stride)
      for (let j = -cr; j <= cr; j += stride) {
        const l = this.cells.get(cellKey((cx + i) * STEP, (cz + j) * STEP));
        if (l) for (const id of l) out.push(id);
      }
    return out;
  }

  linkKind(a: number, b: number): LinkKind | null {
    for (const l of this.nodes[a].links) if (l.to === b) return l.kind;
    return null;
  }
}

function h(a: NavNode, b: NavNode): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

function cellKey(x: number, z: number): number {
  return (Math.round(x / STEP) + 1000) * 4096 + (Math.round(z / STEP) + 1000);
}

class MinHeap {
  private ids: number[] = [];
  private keys: number[] = [];
  get size(): number { return this.ids.length; }
  push(id: number, k: number): void {
    const ids = this.ids, keys = this.keys;
    let i = ids.length;
    ids.push(id); keys.push(k);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (keys[p] <= k) break;
      ids[i] = ids[p]; keys[i] = keys[p]; i = p;
    }
    ids[i] = id; keys[i] = k;
  }
  pop(): number {
    const ids = this.ids, keys = this.keys;
    const top = ids[0];
    const lid = ids.pop()!, lk = keys.pop()!;
    if (ids.length) {
      let i = 0;
      const n = ids.length;
      for (;;) {
        let c = 2 * i + 1;
        if (c >= n) break;
        if (c + 1 < n && keys[c + 1] < keys[c]) c++;
        if (keys[c] >= lk) break;
        ids[i] = ids[c]; keys[i] = keys[c]; i = c;
      }
      ids[i] = lid; keys[i] = lk;
    }
    return top;
  }
}
