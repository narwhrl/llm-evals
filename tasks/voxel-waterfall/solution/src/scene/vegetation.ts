import { VOXEL_COLORS } from './materials'
import { packColor, voxelKey } from './mesher'
import type { VoxelSet } from './mesher'
import { clamp, createRng } from './noise'
import type { SceneOptions } from './options'
import type { Terrain } from './terrain'

export type VegetationData = {
  voxels: VoxelSet
  voxelCount: number
  trees: number
  bushes: number
}

/** 逐格抽样时保留的比例：概率抽样而非固定步长，植被才不会排成整齐的网格。 */
const SAMPLE_KEEP = 0.3

function isFlatEnough(terrain: Terrain, x: number, z: number): boolean {
  const height = terrain.getHeight(x, z)
  return (
    Math.abs(terrain.getHeight(x + 1, z) - height) <= 2 &&
    Math.abs(terrain.getHeight(x - 1, z) - height) <= 2 &&
    Math.abs(terrain.getHeight(x, z + 1) - height) <= 2 &&
    Math.abs(terrain.getHeight(x, z - 1) - height) <= 2
  )
}

/**
 * 山脚植被：在缓坡、海面以上且不高的岸坡上散布树与灌木，
 * 体素直接并进不透明网格，不额外增加 draw call。
 */
export function generateVegetation(
  terrain: Terrain,
  water: VoxelSet,
  options: SceneOptions,
): VegetationData {
  const voxels: VoxelSet = new Map()
  const density = clamp(options.vegetation, 0, 1)
  const rng = createRng(options.seed ^ 0x2f6a3d17)
  const seaLevel = terrain.seaLevel
  const treeLine = seaLevel + Math.max(6, Math.round((terrain.peakHeight - seaLevel) * 0.58))
  const size = terrain.size

  const candidates: number[] = []
  for (let z = 1; z < size - 1; z += 1) {
    for (let x = 1; x < size - 1; x += 1) {
      // 逐格按概率抽样：固定步长会让树木灌木在坡面上排成整齐的网格。
      if (rng() > SAMPLE_KEEP) continue
      const key = z * size + x
      const height = terrain.height[key]
      if (height <= seaLevel + 1 || height >= treeLine) continue
      if (!isFlatEnough(terrain, x, z)) continue
      let wet = false
      for (let y = height; y < height + 3 && !wet; y += 1) {
        if (water.has(voxelKey(x, y, z))) wet = true
      }
      if (wet) continue
      candidates.push(key)
    }
  }
  if (candidates.length === 0) {
    return { voxels, voxelCount: 0, trees: 0, bushes: 0 }
  }

  // 洗牌后按密度取前 N 个，保证分布均匀且同 seed 完全可复现。
  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    const swap = candidates[i]
    candidates[i] = candidates[j]
    candidates[j] = swap
  }

  let count = 0
  let trees = 0
  let bushes = 0

  const put = (x: number, y: number, z: number, hex: number, shade: number): void => {
    if (y < 0) return
    voxels.set(voxelKey(x, y, z), packColor(hex, shade))
    count += 1
  }

  const target = Math.round((density * size * size) / 360)
  for (let i = 0; i < candidates.length && trees < target; i += 1) {
    const key = candidates[i]
    const x = key % size
    const z = (key - x) / size
    const ground = terrain.getHeight(x, z)

    const isBush = rng() < 0.28
    if (isBush) {
      const height = 1 + (rng() < 0.5 ? 1 : 0)
      const seedShade = 232 + Math.round(rng() * 20)
      for (let dy = 0; dy < height; dy += 1) {
        put(x, ground + dy, z, VOXEL_COLORS.leafDeep, seedShade)
      }
      bushes += 1
      continue
    }

    const trunkHeight = 3 + Math.floor(rng() * 3)
    const top = ground + trunkHeight
    const trunkShade = 216 + Math.round(rng() * 24)
    for (let dy = 0; dy < trunkHeight; dy += 1) {
      put(x, ground + dy, z, VOXEL_COLORS.trunk, trunkShade)
    }

    const radius = 2.1 + rng() * 0.7
    const canopyShade = 226 + Math.round(rng() * 26)
    for (let dy = -2; dy <= 2; dy += 1) {
      for (let dz = -3; dz <= 3; dz += 1) {
        for (let dx = -3; dx <= 3; dx += 1) {
          const distance = Math.hypot(dx, dz, dy * 1.35)
          if (distance > radius) continue
          const hex = (dx + dy + dz) % 2 === 0 ? VOXEL_COLORS.leaf : VOXEL_COLORS.leafDeep
          put(x + dx, top + dy, z + dz, hex, canopyShade + Math.round((rng() - 0.5) * 18))
        }
      }
    }
    trees += 1
  }

  return { voxels, voxelCount: count, trees, bushes }
}
