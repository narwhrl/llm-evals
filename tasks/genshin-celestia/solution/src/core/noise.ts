/** Deterministic PRNG (mulberry32), so the realm is identical on every load. */
export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Wraps an angle in radians into [-PI, PI]. */
export function wrapAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

const GRADIENTS = [
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
  1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
  0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
];
const F3 = 1 / 3;
const G3 = 1 / 6;

/** Seeded 3D simplex noise returning roughly [-1, 1]. */
export class SimplexNoise {
  private readonly perm = new Uint8Array(512);
  private readonly permMod12 = new Uint8Array(512);

  constructor(seed: number) {
    const random = createRng(seed);
    const source = new Uint8Array(256);
    for (let i = 0; i < 256; i++) source[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const swapped = source[i];
      source[i] = source[j];
      source[j] = swapped;
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = source[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  noise3(x: number, y: number, z: number): number {
    const perm = this.perm;
    const permMod12 = this.permMod12;
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    const z0 = z - (k - t);
    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1;
      } else {
        i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1;
      }
    } else if (y0 < z0) {
      i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1;
    } else if (x0 < z0) {
      i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1;
    } else {
      i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
    }
    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    let n = 0;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 > 0) {
      const g = permMod12[ii + perm[jj + perm[kk]]] * 3;
      t0 *= t0;
      n += t0 * t0 * (GRADIENTS[g] * x0 + GRADIENTS[g + 1] * y0 + GRADIENTS[g + 2] * z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 > 0) {
      const g = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
      t1 *= t1;
      n += t1 * t1 * (GRADIENTS[g] * x1 + GRADIENTS[g + 1] * y1 + GRADIENTS[g + 2] * z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 > 0) {
      const g = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
      t2 *= t2;
      n += t2 * t2 * (GRADIENTS[g] * x2 + GRADIENTS[g + 1] * y2 + GRADIENTS[g + 2] * z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 > 0) {
      const g = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
      t3 *= t3;
      n += t3 * t3 * (GRADIENTS[g] * x3 + GRADIENTS[g + 1] * y3 + GRADIENTS[g + 2] * z3);
    }
    return 32 * n;
  }
}

/** Fractal Brownian motion over `octaves` simplex layers, roughly [-1, 1]. */
export function fbm(noise: SimplexNoise, x: number, y: number, z: number, octaves = 4): number {
  let sum = 0;
  let amplitude = 1;
  let norm = 0;
  for (let octave = 0; octave < octaves; octave++) {
    sum += amplitude * noise.noise3(x, y, z);
    norm += amplitude;
    amplitude *= 0.5;
    x = x * 2.02 + 37.1;
    y = y * 2.02 + 17.3;
    z = z * 2.02 + 11.9;
  }
  return sum / norm;
}
