/**
 * 导航图 A*：节点/边来自 mapData；跳跃边显式标注。
 * 高低层连接显式区分：普通边要求两端 y 差 <= 0.55，跳跃边按标记处理。
 */
import { NAV_EDGES, NAV_NODES, NavNode } from '../map/mapData';

export interface NavGraph {
  nodes: Map<number, NavNode>;
  adj: Map<number, Array<{ to: number; jump?: 'up' | 'down'; cost: number }>>;
}

export function buildNavGraph(): NavGraph {
  const nodes = new Map<number, NavNode>();
  for (const n of NAV_NODES) nodes.set(n.id, n);
  const adj = new Map<number, Array<{ to: number; jump?: 'up' | 'down'; cost: number }>>();
  const link = (a: number, b: number, jump?: 'up' | 'down') => {
    const na = nodes.get(a), nb = nodes.get(b);
    if (!na || !nb) return;
    const d = Math.hypot(nb.x - na.x, nb.z - na.z, (nb.y - na.y) * 2);
    const cost = d * (jump ? 2.2 : 1);
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a)!.push({ to: b, jump, cost });
    adj.get(b)!.push({ to: a, jump: jump === 'up' ? ('down' as const) : jump === 'down' ? ('up' as const) : undefined, cost });
  };
  for (const e of NAV_EDGES) link(e.a, e.b, e.jump);
  return { nodes, adj };
}

/** A* 最短路，返回节点 id 序列（含起终点），不可达返回 null */
export function astar(g: NavGraph, start: number, goal: number): number[] | null {
  if (start === goal) return [start];
  const open = new Map<number, { f: number; g: number }>();
  const came = new Map<number, number>();
  const ng = nodes(g, goal);
  open.set(start, { f: 0, g: 0 });
  const closed = new Set<number>();
  while (open.size) {
    let cur = -1, bestF = Infinity;
    for (const [id, v] of open) {
      if (v.f < bestF) { bestF = v.f; cur = id; }
    }
    if (cur === goal) {
      const path = [cur];
      while (came.has(cur)) { cur = came.get(cur)!; path.unshift(cur); }
      return path;
    }
    open.delete(cur);
    closed.add(cur);
    for (const e of g.adj.get(cur) ?? []) {
      if (closed.has(e.to)) continue;
      const gn = (open.get(cur)?.g ?? 0) + e.cost;
      const ex = open.get(e.to);
      if (!ex || gn < ex.g) {
        open.set(e.to, { g: gn, f: gn + ng(e.to) });
        came.set(e.to, cur);
      }
    }
  }
  return null;
}

function nodes(g: NavGraph, goal: number): (id: number) => number {
  const n = g.nodes.get(goal)!;
  return (id: number) => {
    const m = g.nodes.get(id)!;
    return Math.hypot(m.x - n.x, m.z - n.z, (m.y - n.y) * 2);
  };
}

/** 距离位置最近的可达节点（带 y 容差） */
export function nearestNode(g: NavGraph, x: number, y: number, z: number): number {
  let best = -1, bestD = Infinity;
  for (const n of g.nodes.values()) {
    const d = Math.hypot(n.x - x, (n.y - y) * 3, n.z - z);
    if (d < bestD) { bestD = d; best = n.id; }
  }
  return best;
}

/** 全图连通性检查（测试用）：从任一出生节点应可到达所有节点 */
export function allReachable(g: NavGraph, from: number): number[] {
  const seen = new Set<number>([from]);
  const queue = [from];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const e of g.adj.get(cur) ?? []) {
      if (!seen.has(e.to)) { seen.add(e.to); queue.push(e.to); }
    }
  }
  return [...seen];
}
