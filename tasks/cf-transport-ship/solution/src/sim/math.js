export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export function hypot2(x, z) {
  return Math.hypot(x, z);
}

export function approach(current, target, maxDelta) {
  const d = target - current;
  if (Math.abs(d) <= maxDelta) return target;
  return current + Math.sign(d) * maxDelta;
}

export function lookVector(yaw, pitch) {
  const cp = Math.cos(pitch);
  return { x: Math.sin(yaw) * cp, y: Math.sin(pitch), z: Math.cos(yaw) * cp };
}

export function rightVector(yaw) {
  return { x: Math.cos(yaw), y: 0, z: -Math.sin(yaw) };
}

export function addScaled(o, d, t) {
  return { x: o.x + d.x * t, y: o.y + d.y * t, z: o.z + d.z * t };
}

export function dist3(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

export function normalize(v) {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

export function turnToward(current, target, maxDelta) {
  let d = target - current;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  if (Math.abs(d) <= maxDelta) return target;
  return current + Math.sign(d) * maxDelta;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pointSegmentDistance(px, py, pz, a, b) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const abz = b.z - a.z;
  const len2 = abx * abx + aby * aby + abz * abz || 1;
  let t = ((px - a.x) * abx + (py - a.y) * aby + (pz - a.z) * abz) / len2;
  t = clamp(t, 0, 1);
  const x = a.x + abx * t;
  const y = a.y + aby * t;
  const z = a.z + abz * t;
  return Math.hypot(px - x, py - y, pz - z);
}
