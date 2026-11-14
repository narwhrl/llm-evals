import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// —— 确定性值噪声（无外部依赖）——
function hash2(x, y, seed) {
  let h = (x * 374761393 + y * 668265263 + seed * 974634211) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967295
}

function valueNoise(x, y, seed) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash2(xi, yi, seed)
  const b = hash2(xi + 1, yi, seed)
  const c = hash2(xi, yi + 1, seed)
  const d = hash2(xi + 1, yi + 1, seed)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

function fbm(x, y, oct, seed) {
  let s = 0
  let amp = 0.5
  let f = 1
  let norm = 0
  for (let i = 0; i < oct; i++) {
    s += amp * valueNoise(x * f, y * f, seed + i * 101)
    norm += amp
    amp *= 0.5
    f *= 2.03
  }
  return s / norm // 0..1
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// 时段预设：太阳、半球光、天空、雾
export const TIMES = {
  morning: {
    label: '清晨',
    sun: 0xffd9a8, sunI: 2.6, sunPos: [140, 90, 60],
    hemiSky: 0xbfd9ff, hemiGround: 0x8a7a66, hemiI: 0.9,
    sky: 0xcfe4f7, fog: 0xd8e6f2, fogNear: 260, fogFar: 720,
  },
  noon: {
    label: '正午',
    sun: 0xffffff, sunI: 3.0, sunPos: [60, 200, 80],
    hemiSky: 0xcfe8ff, hemiGround: 0x9a917f, hemiI: 1.0,
    sky: 0x9fd0f5, fog: 0xc4dcee, fogNear: 300, fogFar: 800,
  },
  dusk: {
    label: '黄昏',
    sun: 0xff9e5e, sunI: 2.2, sunPos: [-160, 55, 110],
    hemiSky: 0xe8b48f, hemiGround: 0x5f5468, hemiI: 0.75,
    sky: 0xf2b58a, fog: 0xeec0a0, fogNear: 240, fogFar: 680,
  },
}

// 高度场：主峰 + 次峰 + fbm 起伏 + 边缘湖盆
function buildHeight(grid, peakHeight, seed) {
  const N = grid
  const h = new Float32Array(N * N)
  const cx = N * 0.5
  const cz = N * 0.44
  const peaks = [
    { x: cx, z: cz, h: peakHeight, s: N * 0.125 },
    { x: N * 0.74, z: N * 0.62, h: peakHeight * 0.55, s: N * 0.085 },
    { x: N * 0.27, z: N * 0.68, h: peakHeight * 0.45, s: N * 0.075 },
    { x: N * 0.62, z: N * 0.24, h: peakHeight * 0.34, s: N * 0.06 },
  ]
  const base = 8
  for (let z = 0; z < N; z++) {
    for (let x = 0; x < N; x++) {
      let y = base
      for (const p of peaks) {
        const dx = x - p.x
        const dz = z - p.z
        y += p.h * Math.exp(-(dx * dx + dz * dz) / (2 * p.s * p.s))
      }
      y += (fbm(x * 0.028, z * 0.028, 4, seed) - 0.5) * peakHeight * 0.42
      y += (fbm(x * 0.09, z * 0.09, 3, seed + 7) - 0.5) * 7
      // 前缘湖盆：瀑布汇入的湖
      const bx = x - N * 0.5
      const bz = z - N * 0.86
      y -= 16 * Math.exp(-(bx * bx + bz * bz) / (2 * (N * 0.13) ** 2))
      // 四周下沉收边
      const ex = Math.max(0, Math.abs(x - cx) - N * 0.44) / (N * 0.06)
      const ez = Math.max(0, Math.abs(z - N * 0.5) - N * 0.44) / (N * 0.06)
      y -= 10 * clamp(Math.max(ex, ez), 0, 1)
      h[z * N + x] = Math.round(y)
    }
  }
  return h
}

// 瀑布路径：从主峰山腰沿最速下降 + 噪声蛇形走到湖面
function traceFalls(h, N, peak, count, waterLevel, seed) {
  const paths = []
  for (let i = 0; i < count; i++) {
    const ang = count === 1 ? 0.18 : (i / (count - 1) - 0.5) * 0.9
    // 起点：主峰南坡（+z，朝向湖）山腰高处
    let x = Math.round(peak.x + Math.sin(ang) * N * 0.07)
    let z = Math.round(peak.z + Math.cos(ang) * N * 0.07)
    x = clamp(x, 1, N - 2)
    z = clamp(z, 1, N - 2)
    const path = []
    const seen = new Set()
    for (let s = 0; s < 600; s++) {
      const k = z * N + x
      if (seen.has(k)) break
      seen.add(k)
      path.push({ x, z, h: h[k] })
      if (h[k] <= waterLevel + 1) break
      // 8 邻域找最低，叠加蛇形偏置避免直线
      let bx = x
      let bz = z
      let bh = Infinity
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dz) continue
          const nx = x + dx
          const nz = z + dz
          if (nx < 1 || nz < 1 || nx >= N - 1 || nz >= N - 1) continue
          const wob = (valueNoise(nx * 0.15, nz * 0.15, seed + i * 31) - 0.5) * 3
          const v = h[nz * N + nx] + wob + (dz === 1 ? -0.6 : 0) // 偏向 +z（朝湖）
          if (v < bh) {
            bh = v
            bx = nx
            bz = nz
          }
        }
      }
      if (bh >= h[k] + 0.5 && h[k] > waterLevel + 1) {
        // 局部洼地：强行向湖方向走一步
        bz = Math.min(N - 2, z + 1)
      }
      x = bx
      z = bz
    }
    if (path.length > 8) paths.push(path)
  }
  return paths
}

function terrainColor(y, waterLevel, snowLine, rockLine, x, z, seed) {
  const n = hash2(x, z, seed)
  if (y <= waterLevel + 1) return new THREE.Color().setHSL(0.32 - n * 0.03, 0.32, 0.3 + n * 0.06) // 湖岸
  if (y >= snowLine) {
    const t = clamp((y - snowLine) / 8, 0, 1)
    return new THREE.Color().lerpColors(new THREE.Color(0x9aa3ad), new THREE.Color(0xf2f6fa), 0.35 + t * 0.65)
  }
  if (y >= rockLine) {
    const t = (y - rockLine) / Math.max(1, snowLine - rockLine)
    const c = new THREE.Color().lerpColors(new THREE.Color(0x6f7a68), new THREE.Color(0x8b8f96), t)
    c.offsetHSL(0, 0, (n - 0.5) * 0.05)
    return c
  }
  return new THREE.Color().setHSL(0.29 + n * 0.05, 0.45, 0.3 + n * 0.1) // 山脚植被绿
}

export function buildScene(container, cfg) {
  const N = cfg.grid
  const seed = 1337
  const waterLevel = 7

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.5,
    3000,
  )
  // 一打开即见全貌：南偏东俯视，湖在近处、主峰在远处
  camera.position.set(N * 0.62, N * 0.62, N * 1.02)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 16, -N * 0.06)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.maxPolarAngle = Math.PI * 0.495
  controls.minDistance = 40
  controls.maxDistance = N * 3.2
  controls.autoRotate = cfg.autoRotate
  controls.autoRotateSpeed = 0.55

  const sun = new THREE.DirectionalLight(0xffffff, 2.5)
  sun.castShadow = true
  const sc = N * 1.4
  sun.shadow.camera.left = -sc
  sun.shadow.camera.right = sc
  sun.shadow.camera.top = sc
  sun.shadow.camera.bottom = -sc
  sun.shadow.camera.far = N * 5
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.bias = -0.0006
  scene.add(sun, sun.target)
  const hemi = new THREE.HemisphereLight(0xbfd9ff, 0x8a7a66, 0.9)
  scene.add(hemi)
  scene.add(new THREE.AmbientLight(0xffffff, 0.12))

  const h = buildHeight(N, cfg.peakHeight, seed)
  const peak = { x: N * 0.5, z: N * 0.44 }
  const snowLine = 8 + cfg.peakHeight * 0.62
  const rockLine = 8 + cfg.peakHeight * 0.3
  const H = (x, z) => h[z * N + x]

  const box = new THREE.BoxGeometry(1, 1, 1)
  const dummy = new THREE.Object3D()
  const ox = -N / 2
  const oz = -N / 2
  let totalVoxels = 0

  // —— 地形：每列只保留可见壳（顶 + 最低邻居以上侧面），内部不填充 ——
  const items = [] // {x,y,z,color}
  for (let z = 0; z < N; z++) {
    for (let x = 0; x < N; x++) {
      const top = H(x, z)
      const nbs = []
      if (x > 0) nbs.push(H(x - 1, z))
      if (x < N - 1) nbs.push(H(x + 1, z))
      if (z > 0) nbs.push(H(x, z - 1))
      if (z < N - 1) nbs.push(H(x, z + 1))
      let minN = nbs.length ? Math.min(...nbs) : 0
      if (x === 0 || z === 0 || x === N - 1 || z === N - 1) minN = Math.min(minN, 1)
      for (let y = minN; y <= top; y++) {
        const c = y === top
          ? terrainColor(y, waterLevel, snowLine, rockLine, x, z, seed)
          : new THREE.Color().setHSL(0.07, 0.18, 0.24 + hash2(x + y, z - y, seed) * 0.06) // 侧面岩土
        items.push({ x: x + ox, y, z: z + oz, c, s: 1 })
      }
    }
  }

  // —— 底座封底 ——
  const baseSlab = new THREE.Mesh(
    new THREE.BoxGeometry(N + 6, 4, N + 6),
    new THREE.MeshLambertMaterial({ color: 0x4a4239 }),
  )
  baseSlab.position.y = -2.5
  baseSlab.receiveShadow = true
  scene.add(baseSlab)

  // —— 湖面 ——
  const waterCells = []
  for (let z = 0; z < N; z++)
    for (let x = 0; x < N; x++)
      if (H(x, z) <= waterLevel) waterCells.push({ x, z })
  const lakeMat = new THREE.MeshLambertMaterial({
    color: 0x3f9fd8, transparent: true, opacity: 0.82,
  })
  const lake = new THREE.InstancedMesh(box, lakeMat, Math.max(1, waterCells.length))
  waterCells.forEach((c, i) => {
    dummy.position.set(c.x + ox, waterLevel + 0.45, c.z + oz)
    dummy.scale.set(1, 0.5, 1)
    dummy.rotation.set(0, 0, 0)
    dummy.updateMatrix()
    lake.setMatrixAt(i, dummy.matrix)
  })
  lake.receiveShadow = true
  scene.add(lake)

  // —— 瀑布 ——
  const paths = traceFalls(h, N, peak, cfg.waterfallCount, waterLevel, seed)
  const fallCells = [] // {x,y,z,phase}
  paths.forEach((path, pi) => {
    // 路径切向与法向（用于加宽）
    for (let s = 0; s < path.length; s++) {
      const p = path[s]
      const q = path[Math.min(path.length - 1, s + 1)]
      let dx = q.x - p.x
      let dz = q.z - p.z
      if (!dx && !dz) { dx = 0; dz = 1 }
      const len = Math.hypot(dx, dz)
      const nx = -dz / len
      const nz = dx / len
      const half = Math.floor(cfg.fallWidth / 2)
      for (let w = -half; w <= half; w++) {
        const wx = clamp(Math.round(p.x + nx * w), 0, N - 1)
        const wz = clamp(Math.round(p.z + nz * w), 0, N - 1)
        const wy = Math.max(H(wx, wz), p.h)
        // 水体整块高出地表、贴在坡面上；陡坎处叠两块形成台阶
        fallCells.push({ x: wx + ox, y: wy + 0.85, z: wz + oz, phase: (s / path.length + pi * 0.37 + Math.abs(w) * 0.05) % 1 })
        if (s > 0 && p.h < path[s - 1].h - 1) {
          fallCells.push({ x: wx + ox, y: wy + 1.8, z: wz + oz, phase: (s / path.length + 0.5 + pi * 0.37) % 1 })
        }
      }
    }
    // 落点水花：白色泡沫圈 + 上方 mist
    const end = path[path.length - 1]
    for (let k = 0; k < 26; k++) {
      const a = hash2(k, pi, seed) * Math.PI * 2
      const r = 1 + hash2(k, pi + 9, seed) * (cfg.fallWidth * 0.9 + 1.5)
      fallCells.push({
        x: end.x + ox + Math.cos(a) * r, y: waterLevel + 0.7, z: end.z + oz + Math.sin(a) * r,
        phase: hash2(k, pi + 3, seed), foam: true,
      })
    }
  })
  const fallMat = new THREE.MeshLambertMaterial({
    color: 0xffffff, transparent: true, opacity: 0.88,
  })
  const falls = new THREE.InstancedMesh(box, fallMat, Math.max(1, fallCells.length))
  const fallBase = fallCells.map((f) => ({ ...f }))
  const cTop = new THREE.Color(0xeaf7ff)
  const cMid = new THREE.Color(0x5ec2ef)
  const tmpC = new THREE.Color()
  fallCells.forEach((f, i) => {
    dummy.position.set(f.x, f.y, f.z)
    dummy.scale.set(0.96, f.foam ? 0.55 : 0.96, 0.96)
    dummy.rotation.set(0, 0, 0)
    dummy.updateMatrix()
    falls.setMatrixAt(i, dummy.matrix)
    falls.setColorAt(i, f.foam ? cTop : cMid)
  })
  scene.add(falls)

  // —— 植被：山脚树木 + 草块 ——
  const treeItems = []
  const treeLine = waterLevel + 2 + cfg.peakHeight * 0.22
  const wantTrees = Math.round(cfg.treeDensity * 320)
  let guard = 0
  let planted = 0
  while (planted < wantTrees && guard++ < wantTrees * 40) {
    const x = Math.floor(hash2(guard, 1, seed) * N)
    const z = Math.floor(hash2(guard, 77, seed + 5) * N)
    const y = H(x, z)
    if (y < waterLevel + 2 || y > treeLine) continue
    // 避开瀑布路径
    let nearFall = false
    for (const p of paths) {
      for (let s = 0; s < p.length; s += 4) {
        if (Math.abs(p[s].x - x) + Math.abs(p[s].z - z) < 4) { nearFall = true; break }
      }
      if (nearFall) break
    }
    if (nearFall) continue
    const slope =
      Math.abs(H(Math.min(N - 1, x + 1), z) - y) + Math.abs(H(x, Math.min(N - 1, z + 1)) - y)
    if (slope > 3) continue
    const g = hash2(x, z, seed + 11)
    const trunkH = 3 + Math.floor(g * 2)
    const leafC = new THREE.Color().setHSL(0.3 + g * 0.06, 0.5, 0.28 + g * 0.08)
    const trunkC = new THREE.Color(0x6b4a2e)
    for (let t = 1; t <= trunkH; t++) treeItems.push({ x: x + ox, y: y + t, z: z + oz, c: trunkC })
    const ly = y + trunkH
    for (let dy = 0; dy < 2; dy++)
      for (let ddx = -2; ddx <= 2; ddx++)
        for (let ddz = -2; ddz <= 2; ddz++) {
          if (Math.abs(ddx) === 2 && Math.abs(ddz) === 2) continue
          if (dy === 1 && Math.abs(ddx) + Math.abs(ddz) > 2) continue
          treeItems.push({ x: x + ox + ddx, y: ly + dy, z: z + oz + ddz, c: leafC })
        }
    treeItems.push({ x: x + ox, y: ly + 2, z: z + oz, c: leafC })
    planted++
  }
  // 草块点缀
  const grassItems = []
  for (let k = 0; k < 1400; k++) {
    const x = Math.floor(hash2(k, 5, seed + 21) * N)
    const z = Math.floor(hash2(k, 9, seed + 22) * N)
    const y = H(x, z)
    if (y < waterLevel + 2 || y > treeLine + 2) continue
    grassItems.push({
      x: x + ox, y: y + 1, z: z + oz,
      c: new THREE.Color().setHSL(0.26 + hash2(k, 3, seed) * 0.08, 0.55, 0.35),
    })
  }

  // —— 穿云：山腰扁椭球 voxel 簇 ——
  const cloudY = cfg.cloudHeight
  const cloudCells = [] // {x,y,z,cloud}
  const nClouds = 8 + Math.round(cfg.cloudAmount * 10)
  for (let ci = 0; ci < nClouds; ci++) {
    const ang = hash2(ci, 2, seed + 31) * Math.PI * 2
    const rad = N * (0.18 + hash2(ci, 4, seed + 32) * 0.3)
    const ccx = Math.cos(ang) * rad
    const ccz = Math.sin(ang) * rad * 0.9
    const ccy = cloudY + (hash2(ci, 6, seed + 33) - 0.5) * 7
    const rx = 9 + hash2(ci, 8, seed + 34) * 10
    const ry = 1.6 + hash2(ci, 10, seed + 35) * 1.4
    const rz = 6 + hash2(ci, 12, seed + 36) * 7
    for (let yy = -3; yy <= 3; yy++)
      for (let xx = -Math.ceil(rx); xx <= Math.ceil(rx); xx++)
        for (let zz = -Math.ceil(rz); zz <= Math.ceil(rz); zz++) {
          const e = (xx * xx) / (rx * rx) + (yy * yy) / (ry * ry) + (zz * zz) / (rz * rz)
          if (e > 1) continue
          if (hash2(xx + ci * 57, zz * 3 + yy * 7, seed + 40) < 0.24) continue
          cloudCells.push({ x: ccx + xx, y: ccy + yy, z: ccz + zz, cloud: ci })
        }
  }

  // —— 合并静态体素（地形 + 树 + 草）为一次绘制 ——
  const staticItems = items.concat(treeItems, grassItems)
  totalVoxels = staticItems.length + fallCells.length + cloudCells.length + waterCells.length
  const terrainMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const terrain = new THREE.InstancedMesh(box, terrainMat, staticItems.length)
  staticItems.forEach((it, i) => {
    dummy.position.set(it.x, it.y, it.z)
    dummy.scale.set(1, 1, 1)
    dummy.rotation.set(0, 0, 0)
    dummy.updateMatrix()
    terrain.setMatrixAt(i, dummy.matrix)
    terrain.setColorAt(i, it.c)
  })
  terrain.castShadow = true
  terrain.receiveShadow = true
  scene.add(terrain)

  // —— 云（独立半透明 mesh，整团漂移）——
  const cloudMat = new THREE.MeshLambertMaterial({
    color: 0xffffff, transparent: true, opacity: 0.82, depthWrite: false,
    emissive: 0x8e99a8, emissiveIntensity: 0.45,
  })
  const clouds = new THREE.InstancedMesh(box, cloudMat, Math.max(1, cloudCells.length))
  const cloudBaseX = cloudCells.map((c) => c.x)
  cloudCells.forEach((c, i) => {
    dummy.position.set(c.x, c.y, c.z)
    const s = 0.9 + hash2(i, i, seed + 50) * 0.5
    dummy.scale.set(s, s * 0.75, s)
    dummy.rotation.set(0, 0, 0)
    dummy.updateMatrix()
    clouds.setMatrixAt(i, dummy.matrix)
    tmpC.setHSL(0.58, 0.08, 0.9 + hash2(i, 7, seed) * 0.08)
    clouds.setColorAt(i, tmpC)
  })
  scene.add(clouds)

  function applyTime(name) {
    const t = TIMES[name] || TIMES.morning
    sun.color.set(t.sun)
    sun.intensity = t.sunI
    sun.position.set(...t.sunPos)
    hemi.color.set(t.hemiSky)
    hemi.groundColor.set(t.hemiGround)
    hemi.intensity = t.hemiI
    scene.background = new THREE.Color(t.sky)
    scene.fog = new THREE.Fog(t.fog, t.fogNear, t.fogFar)
  }
  applyTime(cfg.timeOfDay)

  // —— 动画：水流下滚 + 云漂移 ——
  const clock = new THREE.Clock()
  let live = { flowSpeed: cfg.flowSpeed, cloudSpeed: cfg.cloudSpeed }
  let frames = 0
  let fps = 0
  let raf = 0
  let elapsed = 0
  function tick() {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(clock.getDelta(), 0.05)
    elapsed += dt
    frames++
    if (frames % 20 === 0) fps = Math.round(1 / Math.max(dt, 1e-4))
    // 瀑布：相位前滚，颜色白→蓝循环
    for (let i = 0; i < fallCells.length; i++) {
      const f = fallBase[i]
      if (f.foam) {
        const p = (elapsed * 1.4 + f.phase) % 1
        dummy.position.set(f.x, f.y + Math.sin((p + f.phase) * 6.28) * 0.18, f.z)
        dummy.scale.set(0.96, 0.55, 0.96)
      } else {
        const p = (f.phase + elapsed * live.flowSpeed * 0.35) % 1
        dummy.position.set(f.x, f.y - p * 0.45, f.z)
        dummy.scale.set(0.96, 0.96, 0.96)
        tmpC.lerpColors(cMid, cTop, p < 0.5 ? p * 1.4 : (1 - p) * 1.4)
        tmpC.offsetHSL(0, 0, p * 0.06)
        falls.setColorAt(i, tmpC)
      }
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      falls.setMatrixAt(i, dummy.matrix)
    }
    falls.instanceMatrix.needsUpdate = true
    if (falls.instanceColor) falls.instanceColor.needsUpdate = true
    // 云：整体向 +x 漂移，越界回绕
    const span = N + 90
    for (let i = 0; i < cloudCells.length; i++) {
      const c = cloudCells[i]
      let nx = cloudBaseX[i] + elapsed * live.cloudSpeed
      nx = ((nx + span / 2) % span + span) % span - span / 2
      dummy.position.set(nx, c.y, c.z)
      const s = 0.9 + hash2(i, i, seed + 50) * 0.5
      dummy.scale.set(s, s * 0.75, s)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      clouds.setMatrixAt(i, dummy.matrix)
    }
    clouds.instanceMatrix.needsUpdate = true
    controls.update()
    renderer.render(scene, camera)
  }
  tick()

  function onResize() {
    const w = container.clientWidth
    const hgt = container.clientHeight
    camera.aspect = w / hgt
    camera.updateProjectionMatrix()
    renderer.setSize(w, hgt)
  }
  window.addEventListener('resize', onResize)

  return {
    totalVoxels,
    grid: N,
    setLive(next) {
      live = { ...live, ...next }
      controls.autoRotate = next.autoRotate ?? controls.autoRotate
      if (next.timeOfDay) applyTime(next.timeOfDay)
    },
    getFps: () => fps,
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      scene.traverse((o) => {
        if (o.geometry && o.geometry !== box) o.geometry.dispose()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
      })
      box.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    },
  }
}
