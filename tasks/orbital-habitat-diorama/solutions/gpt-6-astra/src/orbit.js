export const TAU = Math.PI * 2;
export const wrap = (value) => ((value % 1) + 1) % 1;
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function daylight(phase) {
  const altitude = Math.cos(wrap(phase) * TAU);
  const blend = clamp((altitude + 0.24) / 0.58, 0, 1);
  return blend * blend * (3 - 2 * blend);
}

export function advanceOrbit(phase, seconds, fast = false) {
  return wrap(phase + seconds / (fast ? 15 : 90));
}

export function scrubOrbit(phase, pixels, width) {
  return wrap(phase + pixels / Math.max(width * 0.6, 240));
}

export function isDrag(start, current) {
  return Math.hypot(current.x - start.x, current.y - start.y) > 6;
}

// Disjoint envelopes keep the five floating objects away from each other and fixtures.
export const floatHomes = [
  { id: 'pen', center: [1.02, 1.53, -0.38], radius: 0.34 },
  { id: 'manual', center: [-0.35, 1.22, 0.05], radius: 0.43 },
  { id: 'earbuds', center: [2.28, 1.53, 0.72], radius: 0.16 },
  { id: 'droplet', center: [-2.09, 1.98, -0.75], radius: 0.12 },
  { id: 'crumb', center: [-0.8, 1.92, 0.65], radius: 0.09 },
];
