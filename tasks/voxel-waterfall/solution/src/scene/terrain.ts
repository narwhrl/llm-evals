import { createRng, fbm2, smooth01 } from './noise'
import type { SceneOptions } from './options'

export type Peak = {
  x: number
  z: number
  height: number
  radius: number
  /** 剖面指数：>1 是尖峰（凹形山坡），<1 是宽缓的盾状基座。 */
  exponent: number
  main: boolean
}

export type Terrain = {
  size: number
  seaLevel: number
  /** size × size 的整数高度场：第 (x, z) 列在 y ∈ [0, height) 上为实体。 */
  height: Int16Array
  peakHeight: number
  peaks: Peak[]
  inBounds(x: number, z: number): boolean
  getHeight(x: number, z: number): number
  setHeight(x: number, z: number, value: number): void
  isSolid(x: number, y: number, z: number): boolean
}

/** 地图外与海边界的海床高度：低于海面，形成沉入水下的岛缘。 */
const SEA_FLOOR = 1

/**
 * 把连续高度向台阶吸附：山体出现 3–5 格的崖壁，为瀑布提供真实的落差，
 * 也让整体轮廓更像体素化的岩层。
 */
function terrace(value: number, step: number, blend: number): number {
  const quantized = Math.round(value / step) * step
  return value + (quantized - value) * blend
}

function smoothField(field: Int16Array, size: number, keepAbove: number): Int16Array {
  const next = new Int16Array(field)
  for (let z = 1; z < size - 1; z += 1) {
    for (let x = 1; x < size - 1; x += 1) {
      const index = z * size + x
      if (field[index] >= keepAbove) continue
      let sum = 0
      for (let dz = -1; dz <= 1; dz += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          sum += field[index + dz * size + dx]
        }
      }
      next[index] = Math.round(sum / 9)
    }
  }
  return next
}

export function generateTerrain(options: SceneOptions): Terrain {
  const size = Math.max(96, Math.round(options.terrainSize))
  const seaLevel = Math.max(4, Math.round(options.seaLevel))
  const center = size / 2
  const rng = createRng(options.seed)

  const mainRadius = size * (0.32 + rng() * 0.05)
  const mainHeight = Math.round((size * 0.19 + 14) * options.mountainScale + seaLevel)

  const peaks: Peak[] = [
    {
      x: center + (rng() - 0.5) * size * 0.05,
      z: center + (rng() - 0.5) * size * 0.05,
      height: mainHeight,
      radius: mainRadius,
      exponent: 1.32,
      main: true,
    },
  ]

  const secondary = Math.max(1, Math.round(options.peakCount) - 1)
  for (let i = 0; i < secondary; i += 1) {
    const angle = (i / secondary) * Math.PI * 2 + rng() * 0.8
    const distance = size * (0.13 + rng() * 0.13)
    peaks.push({
      x: center + Math.cos(angle) * distance,
      z: center + Math.sin(angle) * distance,
      height: mainHeight * (0.5 + rng() * 0.28),
      radius: mainRadius * (0.45 + rng() * 0.3),
      exponent: 1.25,
      main: false,
    })
  }

  // 山脚盾状基座：让山体从海面持续抬升，形成山脚的缓坡台地。
  peaks.push({
    x: center + (rng() - 0.5) * size * 0.05,
    z: center + (rng() - 0.5) * size * 0.05,
    height: mainHeight * (0.22 + rng() * 0.05),
    radius: size * (0.56 + rng() * 0.08),
    exponent: 0.55,
    main: false,
  })

  const raw = new Int16Array(size * size)
  let peakHeight = 0
  for (let z = 0; z < size; z += 1) {
    for (let x = 0; x < size; x += 1) {
      const edge = Math.min(x, z, size - 1 - x, size - 1 - z) / (size * 0.5)
      const mask = smooth01(edge * 2.4)

      let massif = 0
      for (const peak of peaks) {
        const distance = Math.hypot(x - peak.x, z - peak.z)
        if (distance >= peak.radius) continue
        const falloff = 1 - distance / peak.radius
        massif = Math.max(massif, peak.height * Math.pow(falloff, peak.exponent))
      }

      const nx = x / size
      const nz = z / size
      const warp = fbm2(nx * 3.1, nz * 3.1, options.seed + 11, 3)
      const ridge = 1 - Math.abs(fbm2(nx * 5.4 + warp * 0.06, nz * 5.4 - warp * 0.06, options.seed + 29, 5))
      const relief = (ridge - 0.45) * (4.5 + massif * 0.16)
      const swell = fbm2(nx * 1.6, nz * 1.6, options.seed + 5, 2) * 4

      const value = SEA_FLOOR + (massif + relief + swell) * mask
      const heightValue = Math.max(0, Math.round(value))
      raw[z * size + x] = heightValue
      if (heightValue > peakHeight) peakHeight = heightValue
    }
  }

  const keepAbove = Math.round(seaLevel + (peakHeight - seaLevel) * 0.86)
  let field = smoothField(raw, size, keepAbove)
  field = smoothField(field, size, keepAbove)

  // 山腰悬崖带：把这一段高度量化成 4 格一层的岩层台阶，给瀑布提供真实落差；
  // 叠一点噪声让岩层线自然弯曲，避免等高线式的规整台阶。
  const bandLow = seaLevel + Math.round((peakHeight - seaLevel) * 0.26)
  const bandHigh = seaLevel + Math.round((peakHeight - seaLevel) * 0.64)
  const height = new Int16Array(size * size)
  let finalPeak = 0
  for (let z = 0; z < size; z += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = z * size + x
      const value = field[index]
      const wobble = fbm2((x / size) * 9, (z / size) * 9, options.seed + 77, 2) * 2.2
      let stepped = value
      if (value > bandLow && value < bandHigh) {
        stepped = terrace(value + wobble, 4, 0.9)
      } else if (value > seaLevel + 18) {
        stepped = terrace(value, 3, 0.28)
      }
      const result = Math.max(0, Math.round(stepped))
      height[index] = result
      if (result > finalPeak) finalPeak = result
    }
  }

  return {
    size,
    seaLevel,
    height,
    peakHeight: finalPeak,
    peaks,
    inBounds(x: number, z: number): boolean {
      return x >= 0 && z >= 0 && x < size && z < size
    },
    getHeight(x: number, z: number): number {
      if (x < 0 || z < 0 || x >= size || z >= size) return SEA_FLOOR
      return height[z * size + x]
    },
    setHeight(x: number, z: number, value: number): void {
      if (x < 0 || z < 0 || x >= size || z >= size) return
      height[z * size + x] = Math.max(0, Math.round(value))
    },
    isSolid(x: number, y: number, z: number): boolean {
      if (y < 0) return true
      if (x < 0 || z < 0 || x >= size || z >= size) return false
      return y < height[z * size + x]
    },
  }
}
