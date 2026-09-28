// 体素地形：高度场生成（主峰 + 次峰 + 阶地陡崖）、瀑布河道追踪与开挖、实例化体素网格。
import * as THREE from 'three'
import { fbm, ridged, makeRng, smoothstep } from './noise.js'

export const WORLD_SIZE = 208
export const HALF = WORLD_SIZE / 2
export const POOL_LEVEL = 6

// 世界坐标 <-> 网格坐标：格子 (gx, gz) 占据 [gx-HALF, gx-HALF+1]，中心在 +0.5
export function cellToWorldX(gx) {
  return gx - HALF + 0.5
}
export function cellToWorldZ(gz) {
  return gz - HALF + 0.5
}

// 生成原始高度场（未开挖河道）。T[i] = 格子顶面高度（整数体素层数）。
export function generateHeightfield(seed) {
  const N = WORLD_SIZE
  const T = new Float32Array(N * N)
  const rng = makeRng(seed)

  const main = { x: -10 + (rng() - 0.5) * 12, z: -18 + (rng() - 0.5) * 10, r: 82, h: 40 }
  const secondaries = []
  const angles = [0.5, 2.4, 4.4]
  const dists = [70, 78, 72]
  for (let i = 0; i < 3; i++) {
    const ang = angles[i] + (rng() - 0.5) * 0.5
    secondaries.push({
      x: main.x + Math.cos(ang) * (dists[i] + (rng() - 0.5) * 8),
      z: main.z + Math.sin(ang) * (dists[i] + (rng() - 0.5) * 8),
      r: 38 + rng() * 8,
      h: 24 + rng() * 4,
    })
  }

  // 主峰周围的两道环形阶地陡崖：瀑布从崖顶跌落
  const benches = [
    { r: 28, h: 11, w: 1.6 },
    { r: 46, h: 9, w: 1.6 },
  ]

  for (let gz = 0; gz < N; gz++) {
    for (let gx = 0; gx < N; gx++) {
      const x = gx - HALF + 0.5
      const z = gz - HALF + 0.5
      // 域扭曲，让山脊走向更自然
      const wx = x + (fbm(x * 0.02 + 11.3, z * 0.02 + 5.7, seed, 3) - 0.5) * 16
      const wz = z + (fbm(x * 0.02 + 3.1, z * 0.02 + 23.7, seed, 3) - 0.5) * 16

      const base = 3.5 + fbm(x * 0.013, z * 0.013, seed ^ 0x51ab, 4) * 5.0

      let massif = 0
      let mainMask = 0
      {
        const d = Math.hypot(x - main.x, z - main.z) / main.r
        const m = Math.max(0, 1 - d)
        massif += main.h * Math.pow(m, 1.35)
        mainMask = m
      }
      for (let i = 0; i < secondaries.length; i++) {
        const p = secondaries[i]
        const d = Math.hypot(x - p.x, z - p.z) / p.r
        const m = Math.max(0, 1 - d)
        massif += p.h * Math.pow(m, 1.35)
      }

      const massifNorm = Math.min(1, massif / main.h)
      // ridged 细节呈钟形：山脊起伏集中在山腰，山顶保持平滑穹形，便于河流沿坡而下
      const bell = massifNorm * (1 - massifNorm) * 3.2
      const rid = ridged(wx * 0.014, wz * 0.014, seed ^ 0x77f2, 4)
      let h = base + massif + rid * (1.5 + 13 * bell)

      // 阶地陡崖只作用于主峰山体
      if (mainMask > 0.18) {
        const dm = Math.hypot(x - main.x, z - main.z)
        const ang = Math.atan2(z - main.z, x - main.x)
        const maskScale = smoothstep(0.18, 0.4, mainMask)
        for (let b = 0; b < benches.length; b++) {
          const bn = benches[b]
          const rr = bn.r + (fbm(Math.cos(ang) * 1.8 + 7.3, Math.sin(ang) * 1.8 + 2.9, (seed ^ 0x33c1) + b * 977, 3) - 0.5) * 12
          const lift = bn.h * (1 - smoothstep(0, bn.w, dm - rr))
          h += lift * maskScale
        }
      }

      // 次峰各带一道较小的陡崖，让次级河道也有跌水
      for (let i = 0; i < secondaries.length; i++) {
        const p = secondaries[i]
        const dm = Math.hypot(x - p.x, z - p.z)
        const m2 = 1 - dm / p.r
        if (m2 <= 0.15) continue
        const ang = Math.atan2(z - p.z, x - p.x)
        const rr = p.r * 0.55 + (fbm(Math.cos(ang) * 1.8 + 21.7, Math.sin(ang) * 1.8 + 13.1, (seed ^ 0x44d1) + i * 613, 3) - 0.5) * 8
        const lift = 5.5 * (1 - smoothstep(0, 1.4, dm - rr))
        h += lift * smoothstep(0.15, 0.35, m2)
      }

      T[gz * N + gx] = Math.round(h)
    }
  }

  return { T, main, secondaries }
}

// 在高度场上追踪并开挖瀑布河道（贪心下坡 + 阻塞时凿穿），返回路径与水域掩码。
export function traceWaterways(T0, sources, seed) {
  const N = WORLD_SIZE
  const T = T0.slice()
  const rng = makeRng(seed ^ 0x7ea11)
  const waterMask = new Uint8Array(N * N) // 0 陆地 1 河道 2 湖泊
  const paths = []
  const poolLevel = POOL_LEVEL
  const edgeMargin = 12

  const idx = (x, z) => z * N + x
  const inB = (x, z) => x >= 1 && x < N - 1 && z >= 1 && z < N - 1
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  for (let s = 0; s < sources.length; s++) {
    const src = sources[s]
    // 世界坐标 -> 网格下标（cellToWorldX 的逆变换）
    const sxg = Math.round(src.x + HALF - 0.5)
    const szg = Math.round(src.z + HALF - 0.5)
    // 在源头附近找最高点作为泉眼
    let bx = sxg
    let bz = szg
    let bh = -1
    for (let dz = -6; dz <= 6; dz++) {
      for (let dx = -6; dx <= 6; dx++) {
        const gx = sxg + dx
        const gz = szg + dz
        if (!inB(gx, gz)) continue
        const h = T[idx(gx, gz)]
        if (h > bh) {
          bh = h
          bx = gx
          bz = gz
        }
      }
    }

    let cx = bx
    let cz = bz
    let level = bh - 1 // 泉眼处下挖一格形成水口
    T[idx(cx, cz)] = Math.min(T[idx(cx, cz)], level)
    waterMask[idx(cx, cz)] = 1
    const onPath = new Set([idx(cx, cz)])
    const path = [{ x: cx, z: cz, f: level }]
    let dir = null
    let blockedRun = 0

    const maxSteps = 1400
    for (let step = 0; step < maxSteps; step++) {
      if (cx < edgeMargin || cx >= N - edgeMargin || cz < edgeMargin || cz >= N - edgeMargin) break
      if (level <= poolLevel) break

      let best = -1
      let bestH = Infinity
      for (let d = 0; d < 4; d++) {
        const nx = cx + dirs[d][0]
        const nz = cz + dirs[d][1]
        if (!inB(nx, nz) || onPath.has(idx(nx, nz))) continue
        let h = T[idx(nx, nz)]
        if (dirs[d][1] > 0) h -= 0.25 // 轻微南向偏置，让主瀑布落在面向镜头的一侧
        if (dir && dirs[d][0] === dir[0] && dirs[d][1] === dir[1]) h -= 0.25
        h += rng() * 0.15
        if (h < bestH) {
          bestH = h
          best = d
        }
      }
      if (best < 0) break

      const nx = cx + dirs[best][0]
      const nz = cz + dirs[best][1]
      const nh = T[idx(nx, nz)]
      let nl
      if (nh > level) {
        // 四邻严格更高（闭合洼地）：水位涨到最低垭口，下凿一格溢出
        blockedRun++
        nl = nh - 1
      } else {
        // 平地跨流或下坡（含阶地陡崖的整段跌落）
        blockedRun = 0
        nl = nh
      }
      T[idx(nx, nz)] = Math.min(nh, nl)
      onPath.add(idx(nx, nz))
      waterMask[idx(nx, nz)] = 1
      cx = nx
      cz = nz
      level = nl
      dir = [dirs[best][0], dirs[best][1]]
      path.push({ x: cx, z: cz, f: level })
    }

    if (path.length < 14) continue

    // 沿河道筑岸：河道两侧非河道格子至少高出水面一格
    for (let i = 0; i < path.length; i++) {
      const c = path[i]
      for (let d = 0; d < 4; d++) {
        const nx = c.x + dirs[d][0]
        const nz = c.z + dirs[d][1]
        if (!inB(nx, nz) || onPath.has(idx(nx, nz))) continue
        const need = c.f + 1
        if (T[idx(nx, nz)] < need) T[idx(nx, nz)] = need
      }
    }

    // 终点挖湖
    const pr = 6 + rng() * 3
    const ex = cx
    const ez = cz
    const floor = level - 1
    const R = Math.ceil(pr) + 2
    for (let dz = -R; dz <= R; dz++) {
      for (let dx = -R; dx <= R; dx++) {
        const gx = ex + dx
        const gz = ez + dz
        if (!inB(gx, gz)) continue
        const d = Math.hypot(dx, dz) + (fbm(gx * 0.3, gz * 0.3, seed ^ 0x991, 2) - 0.5)
        const i = idx(gx, gz)
        if (d <= pr) {
          T[i] = Math.min(T[i], floor)
          waterMask[i] = 2
        } else if (d <= pr + 1.6 && !onPath.has(i)) {
          if (T[i] < level + 1) T[i] = level + 1
        }
      }
    }

    // 汇总跌水点（用于浪花与水雾）
    const plunges = []
    for (let i = 0; i < path.length - 1; i++) {
      const drop = path[i].f - path[i + 1].f
      if (drop >= 3) {
        plunges.push({
          x: cellToWorldX((path[i].x + path[i + 1].x) / 2),
          y: path[i + 1].f + 0.45,
          z: cellToWorldZ((path[i].z + path[i + 1].z) / 2),
          drop,
        })
      }
    }

    paths.push({ cells: path, plunges, pool: { x: ex, z: ez, r: pr, level } })
  }

  return { T, paths, waterMask }
}

export function collectSources(terrainInfo, count) {
  const list = [terrainInfo.main]
  for (let i = 0; i < terrainInfo.secondaries.length && list.length < count; i++) {
    list.push(terrainInfo.secondaries[i])
  }
  return list.slice(0, count)
}

const tmpColor = new THREE.Color()

function colorForCell(h, slope, gx, gz, mask, poolLevel, out) {
  const j = (Math.sin(gx * 127.1 + gz * 311.7) * 43758.5453) % 1 // 快速逐格抖动
  const jitter = j - Math.floor(j)
  const patchN = fbm(gx * 0.055, gz * 0.055, 1234, 2)
  const snowline = 50 + fbm(gx * 0.05, gz * 0.05, 777, 2) * 10 - 5

  if (mask === 1) {
    out.setHSL(0.075, 0.3, 0.16 + jitter * 0.04)
  } else if (mask === 2) {
    out.setHSL(0.09, 0.34, 0.14 + jitter * 0.04)
  } else if (slope >= 4 || (h >= 38 && h < snowline && patchN > 0.42)) {
    out.setHSL(0.08, 0.07, 0.3 + jitter * 0.1)
  } else if (h >= snowline) {
    out.setHSL(0.58, 0.12, 0.88 + jitter * 0.06)
  } else if (h >= snowline - 5) {
    out.setHSL(0.09, 0.12, 0.45 + jitter * 0.1)
  } else if (h <= 4) {
    out.setHSL(0.09, 0.34, 0.24 + jitter * 0.05)
  } else if (mask === 0 && h <= poolLevel + 1 && patchN > 0.66) {
    out.setHSL(0.12, 0.42, 0.5 + jitter * 0.06)
  } else {
    const hue = 0.28 + patchN * 0.045
    out.setHSL(hue, 0.34 + jitter * 0.1, 0.27 + fbm(gx * 0.09, gz * 0.09, 555, 2) * 0.08)
  }
  out.multiplyScalar(0.96 + jitter * 0.08)
  return out
}

// 构建实例化体素网格：每列顶块 + 因邻列更低而暴露的侧壁块，边缘列补齐到底部。
export function buildTerrainMesh(T, waterMask) {
  const N = WORLD_SIZE
  const idx = (x, z) => z * N + x
  const positions = []
  const colors = []

  const push = (x, y, z, color, shade) => {
    positions.push(x, y, z)
    tmpColor.copy(color).multiplyScalar(shade)
    colors.push(tmpColor.r, tmpColor.g, tmpColor.b)
  }

  const col = new THREE.Color()
  const slopeCol = new THREE.Color()

  for (let gz = 0; gz < N; gz++) {
    for (let gx = 0; gx < N; gx++) {
      const i = idx(gx, gz)
      const h = T[i]
      let nmin = h
      if (gx > 0) nmin = Math.min(nmin, T[i - 1])
      else nmin = 0
      if (gx < N - 1) nmin = Math.min(nmin, T[i + 1])
      else nmin = 0
      if (gz > 0) nmin = Math.min(nmin, T[i - N])
      else nmin = 0
      if (gz < N - 1) nmin = Math.min(nmin, T[i + N])
      else nmin = 0

      const slope = h - nmin
      colorForCell(h, slope, gx, gz, waterMask[i], POOL_LEVEL, col)
      if (slope >= 4) slopeCol.setHSL(0.08, 0.07, 0.28)
      else slopeCol.copy(col)

      const wx = cellToWorldX(gx)
      const wz = cellToWorldZ(gz)
      // 顶块
      push(wx, h - 0.5, wz, col, 1)
      // 侧壁块：从 nmin 层到 h-2 层
      for (let y = nmin; y <= h - 2; y++) {
        push(wx, y + 0.5, wz, slopeCol, 0.78)
      }
    }
  }

  const count = positions.length / 3
  const geo = new THREE.BoxGeometry(1, 1, 1)
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const mesh = new THREE.InstancedMesh(geo, mat, count)
  const m = new THREE.Matrix4()
  for (let i = 0; i < count; i++) {
    m.makeTranslation(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
    mesh.setMatrixAt(i, m)
    mesh.setColorAt(i, tmpColor.setRGB(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]))
  }
  mesh.instanceColor.needsUpdate = true
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.frustumCulled = false

  return { mesh, instanceCount: count }
}
