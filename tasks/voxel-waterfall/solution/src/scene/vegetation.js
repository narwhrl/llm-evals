// 植被与点缀：山脚森林（树干 + 两层树冠）、散落的岩石。
import * as THREE from 'three'
import { WORLD_SIZE, cellToWorldX, cellToWorldZ } from './terrain.js'
import { fbm, makeRng } from './noise.js'

export function createVegetation(T, waterMask, density) {
  const N = WORLD_SIZE
  const group = new THREE.Group()
  const rng = makeRng(51577)

  const trunkGeo = new THREE.BoxGeometry(0.7, 2.4, 0.7)
  const canopyGeo = new THREE.BoxGeometry(3.2, 2.4, 3.2)
  const canopyTopGeo = new THREE.BoxGeometry(2.0, 1.4, 2.0)
  const rockGeo = new THREE.BoxGeometry(1, 1, 1)

  // 先收集位置，再按精确数量创建 InstancedMesh
  const spots = []
  const idx = (x, z) => z * N + x
  for (let gz = 2; gz < N - 2; gz++) {
    for (let gx = 2; gx < N - 2; gx++) {
      const i = idx(gx, gz)
      const h = T[i]
      if (waterMask[i] !== 0) continue
      if (h < 8 || h > 36) continue
      // 坡度检查：四邻高差过大不长树
      const slope =
        Math.max(T[i + 1], T[i - 1], T[i + N], T[i - N]) -
        Math.min(T[i + 1], T[i - 1], T[i + N], T[i - N])
      if (slope > 2) continue
      const forest = fbm(gx * 0.045, gz * 0.045, 8642, 3)
      if (forest < 0.52 - density * 0.18) continue
      if (rng() > density * 0.34) continue
      spots.push({ x: cellToWorldX(gx), z: cellToWorldZ(gz), y: h, golden: rng() < 0.14, s: 0.85 + rng() * 0.4 })
      if (spots.length >= 1400) break
    }
    if (spots.length >= 1400) break
  }

  const trunkMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const canopyMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const rockMat = new THREE.MeshLambertMaterial({ color: 0xffffff })

  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, Math.max(1, spots.length))
  const canopies = new THREE.InstancedMesh(canopyGeo, canopyMat, Math.max(1, spots.length))
  const canopyTops = new THREE.InstancedMesh(canopyTopGeo, canopyMat, Math.max(1, spots.length))

  const dummy = new THREE.Object3D()
  const col = new THREE.Color()
  spots.forEach((s, i) => {
    dummy.position.set(s.x, s.y + 1.2 * s.s, s.z)
    dummy.scale.setScalar(s.s)
    dummy.rotation.set(0, 0, 0)
    dummy.updateMatrix()
    trunks.setMatrixAt(i, dummy.matrix)
    trunks.setColorAt(i, col.setHSL(0.07, 0.35, 0.2 + rng() * 0.05))

    dummy.position.set(s.x, s.y + 3.0 * s.s, s.z)
    dummy.updateMatrix()
    canopies.setMatrixAt(i, dummy.matrix)
    if (s.golden) col.setHSL(0.09, 0.55, 0.42)
    else col.setHSL(0.3 + rng() * 0.05, 0.45, 0.27 + rng() * 0.06)
    canopies.setColorAt(i, col)

    dummy.position.set(s.x, s.y + 4.5 * s.s, s.z)
    dummy.rotation.y = rng() * Math.PI
    dummy.updateMatrix()
    canopyTops.setMatrixAt(i, dummy.matrix)
    canopyTops.setColorAt(i, col)
  })
  trunks.instanceColor.needsUpdate = true
  canopies.instanceColor.needsUpdate = true
  canopyTops.instanceColor.needsUpdate = true
  trunks.castShadow = true
  canopies.castShadow = true
  canopyTops.castShadow = true
  group.add(trunks, canopies, canopyTops)

  // 岩石
  const rockCount = 90
  const rocks = new THREE.InstancedMesh(rockGeo, rockMat, rockCount)
  let placed = 0
  let guard = 0
  while (placed < rockCount && guard < 3000) {
    guard++
    const gx = 4 + Math.floor(rng() * (N - 8))
    const gz = 4 + Math.floor(rng() * (N - 8))
    const i = idx(gx, gz)
    const h = T[i]
    if (waterMask[i] !== 0 || h < 4 || h > 44) continue
    const s = 0.7 + rng() * 1.7
    dummy.position.set(cellToWorldX(gx), h + s * 0.25, cellToWorldZ(gz))
    dummy.scale.set(s, s * (0.6 + rng() * 0.5), s * (0.7 + rng() * 0.5))
    dummy.rotation.set(0, rng() * Math.PI, 0)
    dummy.updateMatrix()
    rocks.setMatrixAt(placed, dummy.matrix)
    rocks.setColorAt(placed, col.setHSL(0.08, 0.06, 0.34 + rng() * 0.12))
    placed++
  }
  for (let i = placed; i < rockCount; i++) {
    dummy.position.set(0, -50, 0)
    dummy.scale.setScalar(0.001)
    dummy.updateMatrix()
    rocks.setMatrixAt(i, dummy.matrix)
  }
  rocks.instanceColor.needsUpdate = true
  rocks.castShadow = true
  rocks.receiveShadow = true
  group.add(rocks)

  return {
    group,
    treeCount: spots.length,
    dispose() {
      trunkGeo.dispose()
      canopyGeo.dispose()
      canopyTopGeo.dispose()
      rockGeo.dispose()
      trunkMat.dispose()
      canopyMat.dispose()
      rockMat.dispose()
    },
  }
}
