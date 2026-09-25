export function findPath(nodes, links, startId, goalId, allowJump = false) {
  if (!startId || !goalId) return [];
  if (startId === goalId) {
    const only = nodes.find((node) => node.id === startId);
    return only ? [{ ...only, via: "walk" }] : [];
  }
  const adj = new Map();
  for (const node of nodes) adj.set(node.id, []);
  for (const link of links) {
    const jump = link.type === "jump";
    const cost = jump ? (allowJump ? 4.5 : 80) : 1;
    const edge = { type: link.type || "walk", cost };
    adj.get(link.a)?.push({ id: link.b, ...edge });
    adj.get(link.b)?.push({ id: link.a, ...edge });
  }
  const dist = new Map([[startId, 0]]);
  const prev = new Map();
  const via = new Map();
  const open = [startId];
  while (open.length) {
    open.sort((a, b) => dist.get(a) - dist.get(b));
    const id = open.shift();
    if (id === goalId) break;
    for (const edge of adj.get(id) || []) {
      const next = dist.get(id) + edge.cost;
      if (next < (dist.get(edge.id) ?? Infinity)) {
        dist.set(edge.id, next);
        prev.set(edge.id, id);
        via.set(edge.id, edge.type);
        if (!open.includes(edge.id)) open.push(edge.id);
      }
    }
  }
  if (!prev.has(goalId) && startId !== goalId) return [];
  const out = [];
  let cursor = goalId;
  const guard = nodes.length + 2;
  let steps = 0;
  while (cursor && steps < guard) {
    const node = nodes.find((item) => item.id === cursor);
    if (!node) break;
    out.push({ ...node, via: via.get(cursor) || "walk" });
    if (cursor === startId) break;
    cursor = prev.get(cursor);
    steps += 1;
  }
  out.reverse();
  return out;
}

export function closestNode(nodes, x, y, z) {
  let best = nodes[0];
  let bestD = Infinity;
  for (const node of nodes) {
    const d = (node.x - x) ** 2 + (node.z - z) ** 2 + (node.y - y) ** 2 * 0.35;
    if (d < bestD) {
      bestD = d;
      best = node;
    }
  }
  return best;
}
