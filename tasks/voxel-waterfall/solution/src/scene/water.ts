import { VOXEL_COLORS } from './materials'
import { packColor, voxelKey } from './mesher'
import type { VoxelSet } from './mesher'
import { clamp, createRng, hash2 } from './noise'
import type { SceneOptions } from './options'
import type { Terrain } from './terrain'

export type WaterImpact = { x: number; y: number; z: number; strength: number }

export type WaterData = {
  voxels: VoxelSet
  impacts: WaterImpact[]
  voxelCount: number
  falls: number
  streams: number
}

/** 落差达到该值即视为崖壁，用竖直水幕表现“倾泻”，否则刻渠成溪流。 */
const FALL_DROP = 3
/** 溪流只下挖一格：水面与原地表齐平，水才不会被埋在深沟里。 */
const STREAM_CARVE = 1
/** 源头水潭深度。 */
const SOURCE_POOL_DEPTH = 2
/** 上游每隔 6~12 格安排一次计划性落差，避免整条瀑布碎成小台阶。 */
const DROP_INTERVAL_MIN = 6
const DROP_INTERVAL_SPAN = 7
const NEIGHBORS: readonly (readonly [number, number])[] = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

type SourcePoint = { x: number; z: number; level: number }

type SourceCandidate = SourcePoint & { angle: number; distance: number }

/**
 * 在高处环带里挑若干互不重叠的源头：优先选“方位接近 + 地势高”的列，
 * 同 seed 下完全确定。若高处候选不足，则逐级放宽高度门槛。
 */
function pickSources(
  terrain: Terrain,
  count: number,
  minHeight: number,
  rng: () => number,
): SourcePoint[] {
  const size = terrain.size
  const center = size / 2
  const inner = size * 0.14
  const outer = size * 0.44
  const candidates: SourceCandidate[] = []

  for (let z = Math.floor(center - outer); z <= Math.ceil(center + outer); z += 2) {
    for (let x = Math.floor(center - outer); x <= Math.ceil(center + outer); x += 2) {
      if (!terrain.inBounds(x, z)) continue
      const distance = Math.hypot(x - center, z - center)
      if (distance < inner || distance > outer) continue
      const level = terrain.getHeight(x, z)
      if (level <= terrain.seaLevel + 6) continue
      candidates.push({ x, z, level, angle: Math.atan2(z - center, x - center), distance })
    }
  }
  if (candidates.length === 0) return []

  const minDistance = size * 0.22
  const sources: SourcePoint[] = []

  for (let i = 0; i < count; i += 1) {
    const azimuth = (i / count) * Math.PI * 2 + rng() * 1.1
    let best: SourceCandidate | null = null
    let bestScore = -Infinity

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const threshold = attempt === 0 ? minHeight : attempt === 1 ? (minHeight + terrain.seaLevel) / 2 : terrain.seaLevel + 8
      const weight = attempt === 0 ? 12 : attempt === 1 ? 5 : 1.5
      best = null
      bestScore = -Infinity
      for (const candidate of candidates) {
        if (candidate.level < threshold) continue
        let separated = true
        for (const other of sources) {
          if (Math.hypot(other.x - candidate.x, other.z - candidate.z) < minDistance) {
            separated = false
            break
          }
        }
        if (!separated) continue
        let delta = Math.abs(candidate.angle - azimuth)
        if (delta > Math.PI) delta = Math.PI * 2 - delta
        const score = candidate.level - delta * weight - candidate.distance * 0.02
        if (score > bestScore) {
          bestScore = score
          best = candidate
        }
      }
      if (best) break
    }

    if (best) sources.push({ x: best.x, z: best.z, level: best.level })
  }

  return sources
}

/**
 * 生成由山体高处倾泻而下的水系：浅滩体素水、溪流、崖壁水幕与山脚水潭。
 * 水流路径用最陡下降法在山体表面逐格推进，遇到洼地就刻开缺口继续下行，
 * 因此水始终贴着地形表面，不会悬空；上游还会每隔一段距离安排一次计划性落差，
 * 让每道瀑布都有几段真正“倾泻”的崖壁水幕，而不是一路碎台阶。
 */
export function generateWater(terrain: Terrain, options: SceneOptions): WaterData {
  const size = terrain.size
  const seaLevel = terrain.seaLevel
  const voxels: VoxelSet = new Map()
  const impacts: WaterImpact[] = []
  const width = clamp(Math.round(options.waterfallWidth), 1, 4)
  const halfWidth = Math.floor(width / 2)
  const rng = createRng(options.seed ^ 0x5bf03635)
  const minSourceHeight = seaLevel + Math.max(10, Math.round((terrain.peakHeight - seaLevel) * 0.58))

  let falls = 0
  let streams = 0

  const shadeAt = (x: number, y: number, z: number, spread: number): number =>
    244 + Math.round((hash2(x * 7 + y * 3, z * 5 - y, 23) - 0.5) * spread)

  const put = (x: number, y: number, z: number, hex: number, shade: number): void => {
    if (y < 1) return
    const key = voxelKey(x, y, z)
    if (voxels.has(key)) return
    voxels.set(key, packColor(hex, clamp(shade, 0, 255)))
  }

  const putColumn = (
    x: number,
    z: number,
    bottom: number,
    surface: number,
    hex: number,
    spread: number,
  ): void => {
    for (let y = bottom; y < surface; y += 1) {
      const isTop = y === surface - 1
      put(x, y, z, hex, shadeAt(x, y, z, spread) * (isTop ? 1 : 0.88))
    }
  }

  // 1) 浅滩：海面以下两格以内的空腔用体素水补出来，让岸线和溪流入海处有厚度。
  for (let z = 0; z < size; z += 1) {
    for (let x = 0; x < size; x += 1) {
      const columnHeight = terrain.getHeight(x, z)
      if (columnHeight >= seaLevel || seaLevel - columnHeight > 2) continue
      putColumn(x, z, columnHeight, seaLevel, VOXEL_COLORS.water, 14)
    }
  }

  // 2) 一道瀑布：源头水潭 → 沿表面最陡下降 → 崖壁水幕 / 溪流 → 水潭 → 入海。
  for (const source of pickSources(terrain, clamp(Math.round(options.waterfallCount), 1, 3), minSourceHeight, rng)) {
    let cx = source.x
    let cz = source.z
    let level = source.level
    let escapes = 0
    let steps = 0
    let sinceDrop = 0
    let nextDrop = DROP_INTERVAL_MIN + Math.floor(rng() * DROP_INTERVAL_SPAN)

    // 源头水潭
    const sourceRadius = 2
    for (let dz = -sourceRadius; dz <= sourceRadius; dz += 1) {
      for (let dx = -sourceRadius; dx <= sourceRadius; dx += 1) {
        if (Math.hypot(dx, dz) > sourceRadius + 0.4) continue
        const px = cx + dx
        const pz = cz + dz
        if (!terrain.inBounds(px, pz)) continue
        const groundLevel = terrain.getHeight(px, pz)
        if (groundLevel > level + 1) continue
        const floorLevel = Math.max(1, Math.min(level - SOURCE_POOL_DEPTH, groundLevel))
        if (groundLevel > floorLevel) terrain.setHeight(px, pz, floorLevel)
        putColumn(px, pz, floorLevel, level, VOXEL_COLORS.water, 16)
      }
    }

    while (steps < 900) {
      steps += 1

      let nextX = -1
      let nextZ = -1
      let lowest = level
      for (let n = 0; n < NEIGHBORS.length; n += 1) {
        const nx = cx + NEIGHBORS[n][0]
        const nz = cz + NEIGHBORS[n][1]
        if (!terrain.inBounds(nx, nz)) continue
        const candidate = terrain.getHeight(nx, nz)
        if (candidate < lowest) {
          lowest = candidate
          nextX = nx
          nextZ = nz
        }
      }

      if (nextX < 0) {
        // 洼地：在两格范围内找最低缺口，刻开一条通路继续下行。
        if (escapes >= 8) break
        escapes += 1
        let best: { x: number; z: number; level: number } | null = null
        for (const [dx, dz] of NEIGHBORS) {
          for (const scale of [2, 3]) {
            const ex = cx + dx * scale
            const ez = cz + dz * scale
            if (!terrain.inBounds(ex, ez)) continue
            const candidate = terrain.getHeight(ex, ez)
            if (!best || candidate < best.level) best = { x: ex, z: ez, level: candidate }
          }
        }
        if (!best) break
        const notchLevel = Math.max(seaLevel, Math.min(level - 1, best.level + 1))
        for (let step = 1; step <= 3; step += 1) {
          const tx = cx + Math.sign(best.x - cx) * step
          const tz = cz + Math.sign(best.z - cz) * step
          if (!terrain.inBounds(tx, tz)) continue
          if (terrain.getHeight(tx, tz) <= notchLevel) continue
          terrain.setHeight(tx, tz, notchLevel)
          putColumn(tx, tz, Math.max(1, notchLevel - STREAM_CARVE), notchLevel, VOXEL_COLORS.water, 16)
        }
        nextX = best.x
        nextZ = best.z
        lowest = best.level
      }

      // 计划性落差：隔一段距离主动拉出一个 4~10 格的崖口，让水真正“倾泻”而不是逐级蹭下去。
      let drop = level - lowest
      if (sinceDrop >= nextDrop && level > seaLevel + 12) {
        const planned = Math.min(4 + Math.floor(rng() * 7), level - seaLevel - 6)
        if (planned > drop) {
          drop = planned
          lowest = level - planned
        }
        sinceDrop = 0
        nextDrop = DROP_INTERVAL_MIN + Math.floor(rng() * DROP_INTERVAL_SPAN)
      } else {
        sinceDrop += 1
      }

      const dirX = nextX - cx
      const dirZ = nextZ - cz
      const length = Math.hypot(dirX, dirZ) || 1
      let perpX = Math.round(-dirZ / length)
      let perpZ = Math.round(dirX / length)
      if (perpX === 0 && perpZ === 0) perpX = 1

      const isFall = drop >= FALL_DROP
      const rim = Math.max(seaLevel, lowest)

      for (let w = 0; w < width; w += 1) {
        const offset = w - halfWidth
        const ux = cx + perpX * offset
        const uz = cz + perpZ * offset
        const vx = nextX + perpX * offset
        const vz = nextZ + perpZ * offset
        if (!terrain.inBounds(ux, uz) || !terrain.inBounds(vx, vz)) continue

        // 上游一侧只下挖一格：水面与原地表齐平，水才不会被两侧的土坡挡住。
        const upstreamHeight = terrain.getHeight(ux, uz)
        if (upstreamHeight > level + 2) continue
        const channelBottom = Math.max(1, Math.min(level - STREAM_CARVE, upstreamHeight))
        if (upstreamHeight > channelBottom) terrain.setHeight(ux, uz, channelBottom)
        putColumn(ux, uz, channelBottom, level, VOXEL_COLORS.water, 14)

        if (isFall) {
          // 崖壁：下游挖出水潭，水幕从池面一直挂到上游水面，整条白练贴在崖口外侧。
          const groundLevel = terrain.getHeight(vx, vz)
          const basin = Math.min(4, 1 + Math.floor(drop / 3))
          const floorLevel = Math.max(1, Math.min(rim - basin, groundLevel))
          if (groundLevel > floorLevel) terrain.setHeight(vx, vz, floorLevel)
          putColumn(vx, vz, floorLevel, rim, VOXEL_COLORS.water, 12)
          putColumn(vx, vz, rim, level, VOXEL_COLORS.foam, 20)
          falls += 1
          if (offset === 0) {
            impacts.push({ x: vx, y: rim, z: vz, strength: clamp(drop / 12, 0.3, 1) })
          }
        } else {
          const groundLevel = terrain.getHeight(vx, vz)
          if (groundLevel > level + 2) continue
          const bottom = Math.max(1, Math.min(rim - STREAM_CARVE, groundLevel))
          if (groundLevel > bottom) terrain.setHeight(vx, vz, bottom)
          putColumn(vx, vz, bottom, rim, VOXEL_COLORS.water, 14)
          streams += 1
        }
      }

      cx = nextX
      cz = nextZ
      level = lowest
      if (level <= seaLevel) {
        // 已经入海：把最后一段浅水接上，结束这道瀑布。
        putColumn(cx, cz, Math.max(1, seaLevel - STREAM_CARVE), seaLevel, VOXEL_COLORS.water, 12)
        break
      }
    }
  }

  return { voxels, impacts, voxelCount: voxels.size, falls, streams }
}
