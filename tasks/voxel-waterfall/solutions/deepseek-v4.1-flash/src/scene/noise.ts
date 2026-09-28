export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** 0→1 的平滑过渡，两端一阶导为 0。 */
export function smooth01(t: number): number {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

/** 线性映射并夹取到 0→1。 */
export function range01(value: number, from: number, to: number): number {
  if (from === to) return 0
  return clamp((value - from) / (to - from), 0, 1)
}

/** mulberry32：同一种子给出完全可复现的伪随机序列。 */
export function createRng(seed: number): () => number {
  let state = (seed | 0) ^ 0x9e3779b9
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 二维整数哈希，返回 [0, 1)。用于格点噪声与逐面明暗抖动。 */
export function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(seed | 0, 0x9e3779b1)
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b)
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function bilinear(
  n00: number,
  n10: number,
  n01: number,
  n11: number,
  u: number,
  v: number,
): number {
  const a = n00 + (n10 - n00) * u
  const b = n01 + (n11 - n01) * u
  return a + (b - a) * v
}

/** 值噪声，返回约 -1 → 1。 */
export function valueNoise2(x: number, y: number, seed: number): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const u = fade(x - xi)
  const v = fade(y - yi)
  const n = bilinear(
    hash2(xi, yi, seed),
    hash2(xi + 1, yi, seed),
    hash2(xi, yi + 1, seed),
    hash2(xi + 1, yi + 1, seed),
    u,
    v,
  )
  return n * 2 - 1
}

/** 分形叠加噪声，返回约 -1 → 1。 */
export function fbm2(
  x: number,
  y: number,
  seed: number,
  octaves: number,
  lacunarity = 2,
  gain = 0.5,
): number {
  let amplitude = 1
  let frequency = 1
  let sum = 0
  let norm = 0
  for (let i = 0; i < octaves; i += 1) {
    sum += valueNoise2(x * frequency, y * frequency, seed + i * 1013) * amplitude
    norm += amplitude
    amplitude *= gain
    frequency *= lacunarity
  }
  return norm > 0 ? sum / norm : 0
}

/** 可平铺的值噪声：整数格点按 period 取模，因此每隔 period 无缝重复。 */
export function periodicValueNoise2(
  x: number,
  y: number,
  period: number,
  seed: number,
): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const u = fade(x - xi)
  const v = fade(y - yi)
  const wrap = (value: number) => ((value % period) + period) % period
  const x0 = wrap(xi)
  const x1 = wrap(xi + 1)
  const y0 = wrap(yi)
  const y1 = wrap(yi + 1)
  const n = bilinear(
    hash2(x0, y0, seed),
    hash2(x1, y0, seed),
    hash2(x0, y1, seed),
    hash2(x1, y1, seed),
    u,
    v,
  )
  return n * 2 - 1
}

/** 可平铺的分形噪声：各层频率翻倍时周期同步翻倍，整体仍严格无缝。 */
export function periodicFbm2(
  x: number,
  y: number,
  period: number,
  seed: number,
  octaves: number,
  gain = 0.5,
): number {
  let amplitude = 1
  let frequency = 1
  let sum = 0
  let norm = 0
  for (let i = 0; i < octaves; i += 1) {
    sum +=
      periodicValueNoise2(
        x * frequency,
        y * frequency,
        period * frequency,
        seed + i * 1013,
      ) * amplitude
    norm += amplitude
    amplitude *= gain
    frequency *= 2
  }
  return norm > 0 ? sum / norm : 0
}
