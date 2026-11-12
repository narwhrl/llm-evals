// Deterministic value noise + fbm, seeded so the terrain is stable per run.
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED = 1379;

function hash2(ix: number, iz: number): number {
  let h = (ix * 374761393 + iz * 668265263 + SEED * 144269) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

export function vnoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  const ux = smooth(fx);
  const uz = smooth(fz);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

export function fbm(x: number, z: number, octaves = 4): number {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    v += amp * (vnoise(x * freq, z * freq) * 2 - 1);
    amp *= 0.5;
    freq *= 2.03;
  }
  return v;
}

// Signed radial-noise radius factor for irregular island outlines.
export function edgeFactor(theta: number, lobes: number, strength: number, phase: number): number {
  const n =
    Math.sin(theta * lobes + phase) * 0.6 +
    Math.sin(theta * (lobes + 2.7) + phase * 1.7) * 0.4;
  return 1 + n * strength;
}
