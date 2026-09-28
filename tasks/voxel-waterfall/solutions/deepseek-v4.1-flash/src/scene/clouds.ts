import { VOXEL_COLORS } from './materials'
import { packColor, voxelKey } from './mesher'
import type { VoxelSet } from './mesher'
import { clamp, fbm2, valueNoise2 } from './noise'
import type { SceneOptions } from './options'
import type { Terrain } from './terrain'

export type CloudData = {
  voxels: VoxelSet
  /** 云层底面高度（世界单位）。 */
  baseY: number
  /** 云层顶面高度（世界单位）。 */
  topY: number
  /** 云块的边长（世界单位）：云的方块比地形体素大，保证面数与体量都可控。 */
  block: number
  voxelCount: number
}

/**
 * 山腰云带：云只围绕山体成环，不会铺满整片海面，因此从远处看是
 * “云雾缠绕山腰、山峰穿云而出”，而不是漂在海上的白色板块。
 * 云块用比地形更大的方块（block）生成，面数与内存只跟云格数相关。
 */
export function generateClouds(terrain: Terrain, options: SceneOptions): CloudData {
  const voxels: VoxelSet = new Map()
  const size = terrain.size
  const block = clamp(Math.round(options.cloudBlock), 3, 12)
  const seaLevel = terrain.seaLevel
  const peakRise = Math.max(8, terrain.peakHeight - seaLevel)
  // 全部按“云格”为单位生成，网格化时用 scale = block 放大成世界单位。
  const baseCell = Math.max(1, Math.round((seaLevel + peakRise * clamp(options.cloudHeight, 0.2, 0.9)) / block))
  const thickness = clamp(Math.round(options.cloudThickness), 1, 4)
  const cover = clamp(options.cloudCover, 0, 0.9)
  const margin = clamp(options.cloudMargin, 64, 768)

  // 生成范围：以山体为中心的一个方形区域，外扩 margin。
  const sizeCells = Math.round(size / block)
  const marginCells = Math.max(2, Math.round(margin / block))
  const cells = sizeCells + marginCells * 2
  const originCell = -marginCells
  // 山体中心在数组下标里的位置：index = 边界偏移 + 半个山体。
  const centerCell = marginCells + sizeCells / 2
  const radiusCells = sizeCells * 0.5
  const values = new Float32Array(cells * cells)
  const detail = new Float32Array(cells * cells)
  const lift = new Float32Array(cells * cells)
  for (let gz = 0; gz < cells; gz += 1) {
    for (let gx = 0; gx < cells; gx += 1) {
      const index = gz * cells + gx
      // 波长按“云格”给：主团块约 3 格（≈12 世界单位）、边缘细节约 1.3 格、云底起伏约 8 格。
      values[index] = fbm2(gx * 0.34, gz * 0.34, options.seed + 71, 4)
      detail[index] = valueNoise2(gx * 0.75, gz * 0.75, options.seed + 137)
      lift[index] = valueNoise2(gx * 0.12, gz * 0.12, options.seed + 211)
    }
  }

  const sorted = Float32Array.from(values).sort()
  const baseThreshold = sorted[Math.min(sorted.length - 1, Math.floor((1 - cover) * sorted.length))]
  const intensitySpan = Math.max(0.05, 1 - baseThreshold)

  let topCell = baseCell
  let count = 0

  for (let gz = 0; gz < cells; gz += 1) {
    for (let gx = 0; gx < cells; gx += 1) {
      const index = gz * cells + gx
      const value = values[index]

      // 环形云带权重：山体正上方云少（让峰顶穿出），离山太远也没有云。
      const distance = Math.hypot(gx - centerCell, gz - centerCell) / radiusCells
      const band = smoothBand(distance)
      if (band <= 0.01) continue
      const threshold = 1.08 - band * (1.08 - baseThreshold)
      if (value < threshold) continue

      // 云团内部厚、边缘薄，形成蓬松团块而不是等厚板；云带外缘靠减薄收边，不会留下孤立的碎块。
      const edge =
        values[(gz === 0 ? cells - 1 : gz - 1) * cells + gx] < threshold ||
        values[(gz === cells - 1 ? 0 : gz + 1) * cells + gx] < threshold ||
        values[gz * cells + (gx === 0 ? cells - 1 : gx - 1)] < threshold ||
        values[gz * cells + (gx === cells - 1 ? 0 : gx + 1)] < threshold
      const intensity = clamp((value - threshold) / intensitySpan, 0, 1)
      const layers = Math.max(
        1,
        Math.min(
          thickness + 2,
          Math.round(
            (1.9 + intensity * (thickness + 1) + detail[index] * 0.9) * (0.35 + band * 0.65),
          ) - (edge ? 1 : 0),
        ),
      )
      const offset = Math.round(lift[index] * 2.0)
      const cellX = originCell + gx
      const cellZ = originCell + gz
      for (let dy = layers - 1; dy >= 0; dy -= 1) {
        const cellY = baseCell + offset + dy
        if (cellY * block <= seaLevel) continue
        const bottom = dy === 0
        const hex = bottom ? VOXEL_COLORS.cloudShade : VOXEL_COLORS.cloud
        const shade = bottom ? 226 : 246 + Math.round(detail[index] * 10)
        voxels.set(voxelKey(cellX, cellY, cellZ), packColor(hex, shade))
        count += 1
        if (cellY + 1 > topCell) topCell = cellY + 1
      }
    }
  }

  return {
    voxels,
    baseY: baseCell * block,
    topY: topCell * block,
    block,
    voxelCount: count,
  }
}

/** 归一化半径 → 云带权重：0.2 以内几乎无云（让峰顶穿出），0.4–0.64 最浓，0.92 之外散尽。 */
function smoothBand(distance: number): number {
  const inner = smoothstep01((distance - 0.2) / 0.2)
  const outer = 1 - smoothstep01((distance - 0.64) / 0.28)
  return Math.max(0, inner * outer)
}

function smoothstep01(value: number): number {
  const x = clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}
