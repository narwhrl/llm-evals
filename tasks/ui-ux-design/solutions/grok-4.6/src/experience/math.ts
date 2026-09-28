export function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function remap(x: number, a: number, b: number): number {
  if (b === a) return x >= b ? 1 : 0;
  return clamp((x - a) / (b - a), 0, 1);
}

export function smooth(a: number, b: number, x: number): number {
  const t = remap(x, a, b);
  return t * t * (3 - 2 * t);
}

export function smoother(a: number, b: number, x: number): number {
  const t = remap(x, a, b);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function unit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export function mix(seed: string, salt: string): number {
  return unit(`${seed}:${salt}`);
}

export function hypot(dx: number, dy: number): number {
  return Math.hypot(dx, dy);
}

export function stepSpring(
  value: number,
  velocity: number,
  target: number,
  dt: number,
  stiffness: number,
  damping: number,
): { value: number; vel: number } {
  const acc = (target - value) * stiffness - velocity * damping;
  const nextVelocity = velocity + acc * dt;
  return {
    value: value + nextVelocity * dt,
    vel: nextVelocity,
  };
}
