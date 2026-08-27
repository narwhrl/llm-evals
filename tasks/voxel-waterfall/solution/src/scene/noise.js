// Seeded, allocation-free value noise utilities (2D).
// All functions are pure functions of (coords, seed) so worlds are reproducible.

function hash2(ix, iz, seed) {
  let h = (Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1) ^ Math.imul(seed, 0x9e3779b1)) | 0;
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296; // [0,1)
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Value noise in [0,1). */
export function valueNoise2D(x, z, seed) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = fade(x - ix), fz = fade(z - iz);
  const a = hash2(ix, iz, seed);
  const b = hash2(ix + 1, iz, seed);
  const c = hash2(ix, iz + 1, seed);
  const d = hash2(ix + 1, iz + 1, seed);
  const ab = a + (b - a) * fx;
  const cd = c + (d - c) * fx;
  return ab + (cd - ab) * fz;
}

/** Fractal Brownian motion in [0,1). */
export function fbm2D(x, z, seed, octaves = 4, lacunarity = 2, gain = 0.5) {
  let amp = 1, freq = 1, sum = 0, norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise2D(x * freq, z * freq, seed + o * 101);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / norm;
}

/** Ridged fBm in [0,1] — sharp crests, good for mountain ridges. */
export function ridged2D(x, z, seed, octaves = 4) {
  let amp = 1, freq = 1, sum = 0, norm = 0;
  for (let o = 0; o < octaves; o++) {
    const n = valueNoise2D(x * freq, z * freq, seed + o * 131);
    sum += amp * (1 - Math.abs(2 * n - 1));
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

/**
 * Value noise periodic along x with integer lattice period `xPeriod`.
 * Used for the cloud field so drifting + wrapping is seamless.
 */
export function periodicNoise2D(x, z, seed, xPeriod) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const wrap = (i) => ((i % xPeriod) + xPeriod) % xPeriod;
  const fx = fade(x - ix), fz = fade(z - iz);
  const a = hash2(wrap(ix), iz, seed);
  const b = hash2(wrap(ix + 1), iz, seed);
  const c = hash2(wrap(ix), iz + 1, seed);
  const d = hash2(wrap(ix + 1), iz + 1, seed);
  const ab = a + (b - a) * fx;
  const cd = c + (d - c) * fx;
  return ab + (cd - ab) * fz;
}

export { hash2 };
