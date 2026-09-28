// 云海：山腰高度的平板云块（部分山峰穿出云层）+ 瀑布跌水处的贴山水雾。
import * as THREE from 'three'
import { HALF } from './terrain.js'
import { fbm, makeRng } from './noise.js'

export function createClouds(mistPoints) {
  const group = new THREE.Group()
  const rng = makeRng(90210)

  // 云板材质：半透明白，受场景光照影响（黄昏时段自然染上暖色）
  const slabMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.78,
    depthWrite: true,
  })
  const puffMat = new THREE.MeshLambertMaterial({
    color: 0xf2f6fb,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  })

  const box = new THREE.BoxGeometry(1, 1, 1)
  const slabs = []
  const CLUSTER_TOTAL = 34
  let guard = 0
  while (slabs.length < CLUSTER_TOTAL && guard < 6000) {
    guard++
    // 七成云团环抱山腰（以地图中心为圆心），三成散布外围
    let x
    let z
    if (rng() < 0.7) {
      const ang = rng() * Math.PI * 2
      const rad = 24 + rng() * 72
      x = Math.cos(ang) * rad
      z = Math.sin(ang) * rad
    } else {
      x = (rng() * 2 - 1) * HALF * 1.05
      z = (rng() * 2 - 1) * HALF * 1.05
    }
    // 用低频噪声决定云量分布，形成有疏有密的云带
    const maskN = fbm(x * 0.008 + 31, z * 0.008 + 17, 4321, 3)
    if (maskN < 0.42) continue
    // 默认机位（南偏东上空）前方留出缺口，保证瀑布与山体可见
    if (z > 42 && Math.abs(x) < 125) continue
    if (x > 70 && z > -20) continue

    const cluster = new THREE.Group()
    const w = 13 + rng() * 18
    const d = 8 + rng() * 12
    const h = 1.1 + rng() * 1.0
    const parts = [
      [0, 0, 0, w, h, d],
      [w * 0.3, h * 0.18, -d * 0.2, w * 0.55, h * 0.9, d * 0.62],
      [-w * 0.34, h * 0.12, d * 0.18, w * 0.48, h * 0.8, d * 0.55],
    ]
    for (const [ox, oy, oz, sw, sh, sd] of parts) {
      const mesh = new THREE.Mesh(box, slabMat)
      mesh.scale.set(sw, sh, sd)
      mesh.position.set(ox, oy, oz)
      cluster.add(mesh)
    }
    cluster.position.set(x, 0, z)
    cluster.renderOrder = 2
    group.add(cluster)
    slabs.push({
      group: cluster,
      baseX: x,
      yJitter: rng() * 3,
      speed: 0.8 + rng() * 0.8,
      phase: rng() * Math.PI * 2,
    })
  }

  // 贴山水雾：环绕跌水点的低空雾团
  const puffs = []
  for (let i = 0; i < mistPoints.length; i++) {
    const mp = mistPoints[i]
    const count = 4
    for (let k = 0; k < count; k++) {
      const mesh = new THREE.Mesh(box, puffMat)
      const w = 5 + rng() * 5
      const d = 4 + rng() * 4
      mesh.scale.set(w, 2.2 + rng() * 1.2, d)
      mesh.position.set(mp.x + (rng() - 0.5) * 5, mp.y + 1 + rng() * 2.5, mp.z + (rng() - 0.5) * 5)
      mesh.renderOrder = 3
      group.add(mesh)
      puffs.push({ mesh, baseY: mesh.position.y, phase: rng() * Math.PI * 2 })
    }
  }

  let cloudHeight = 32
  let elapsed = 0
  let coverage = 1

  const applyCoverage = () => {
    const visible = Math.round(coverage * slabs.length)
    for (let i = 0; i < slabs.length; i++) {
      slabs[i].group.visible = i < visible
    }
  }

  const applyHeight = () => {
    for (const s of slabs) {
      s.group.position.y = cloudHeight + s.yJitter + Math.sin(elapsed * 0.25 + s.phase) * 0.4
    }
  }

  return {
    group,
    setCloudHeight(v) {
      cloudHeight = v
      applyHeight()
    },
    setCoverage(v) {
      coverage = v
      applyCoverage()
    },
    update(dt) {
      elapsed += dt
      for (const s of slabs) {
        s.baseX += dt * s.speed
        if (s.baseX > HALF * 1.2) s.baseX = -HALF * 1.2
        s.group.position.x = s.baseX
        s.group.position.y = cloudHeight + s.yJitter + Math.sin(elapsed * 0.25 + s.phase) * 0.4
      }
      for (const p of puffs) {
        p.mesh.position.y = p.baseY + Math.sin(elapsed * 0.35 + p.phase) * 0.6
      }
    },
    dispose() {
      slabMat.dispose()
      puffMat.dispose()
      box.dispose()
    },
  }
}
