// 确定性随机与噪声工具：所有程序化贴图/散布都依赖固定种子，保证每次构建外观一致。

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const next = mulberry32(seed);
  return {
    next,
    range: (min, max) => min + next() * (max - min),
    int: (min, max) => Math.floor(min + next() * (max - min + 1)),
    pick: (list) => list[Math.floor(next() * list.length)],
    chance: (p) => next() < p,
    sign: () => (next() < 0.5 ? -1 : 1),
    around: (center, spread) => center + (next() - 0.5) * 2 * spread,
  };
}

function hash2(ix, iy, seed) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smooth = (t) => t * t * (3 - 2 * t);

// 平铺友好的值噪声：整数格点按 period 取模，贴图四边可无缝衔接。
export function tileableNoise(seed, period = 8) {
  const p = Math.max(2, Math.round(period));
  return function noise(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = smooth(x - x0);
    const fy = smooth(y - y0);
    const wrap = (v) => ((v % p) + p) % p;
    const x0w = wrap(x0);
    const y0w = wrap(y0);
    const x1w = wrap(x0 + 1);
    const y1w = wrap(y0 + 1);
    const n00 = hash2(x0w, y0w, seed);
    const n10 = hash2(x1w, y0w, seed);
    const n01 = hash2(x0w, y1w, seed);
    const n11 = hash2(x1w, y1w, seed);
    return (n00 * (1 - fx) + n10 * fx) * (1 - fy) + (n01 * (1 - fx) + n11 * fx) * fy;
  };
}

// 分形叠加噪声，返回 0..1。
export function fbm2D(seed, { octaves = 4, baseFrequency = 8, gain = 0.5 } = {}) {
  const layers = [];
  let amp = 1;
  let total = 0;
  for (let i = 0; i < octaves; i += 1) {
    const period = baseFrequency * 2 ** i;
    layers.push({ noise: tileableNoise(seed + i * 7919, period), frequency: period, amp });
    total += amp;
    amp *= gain;
  }
  return function fbm(x, y) {
    let sum = 0;
    for (let i = 0; i < layers.length; i += 1) {
      const layer = layers[i];
      sum += layer.noise(x * layer.frequency, y * layer.frequency) * layer.amp;
    }
    return sum / total;
  };
}

export const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
export const lerp = (a, b, t) => a + (b - a) * t;
