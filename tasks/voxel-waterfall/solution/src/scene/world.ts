import * as THREE from 'three'
import { generateClouds } from './clouds'
import {
  createCloudMaterial,
  createHazeMaterial,
  createMistMaterial,
  createOpaqueVoxelMaterial,
  createSeaMaterial,
  createWaterMaterial,
  VOXEL_COLORS,
} from './materials'
import type { MistUniforms } from './materials'
import { meshHeightField, meshVoxels, packColor } from './mesher'
import type { FaceKind } from './mesher'
import { createRng, fbm2 } from './noise'
import type { SceneOptions } from './options'
import { generateTerrain } from './terrain'
import type { Terrain } from './terrain'
import { generateVegetation } from './vegetation'
import { generateWater } from './water'

export type WorldStats = {
  buildMs: number
  voxels: number
  quads: number
  triangles: number
  terrainVoxels: number
  waterVoxels: number
  cloudVoxels: number
  plantVoxels: number
  waterFalls: number
  streams: number
  trees: number
  seaLevel: number
  peakHeight: number
  cloudBaseY: number
  cloudTopY: number
}

export type WorldFraming = {
  size: number
  seaLevel: number
  peakHeight: number
  /** 取景目标高度：山体视觉重心。 */
  centerY: number
  /** 场景水平半径，用于相机距离与阴影范围。 */
  radius: number
  /** 阴影相机需要覆盖的最高点。 */
  maxY: number
}

export type World = {
  group: THREE.Group
  stats: WorldStats
  framing: WorldFraming
  waterMaterial: THREE.MeshLambertMaterial
  waterMesh: THREE.Mesh
  seaMaterial: THREE.MeshLambertMaterial
  seaMesh: THREE.Mesh
  hazeMaterial: THREE.MeshBasicMaterial
  hazeMesh: THREE.Mesh
  cloudField: THREE.Group
  cloudMesh: THREE.Mesh
  mistPoints: THREE.Points | null
  mistUniforms: MistUniforms | null
  dispose(): void
}

function countTerrainVoxels(terrain: Terrain): number {
  let total = 0
  for (let i = 0; i < terrain.height.length; i += 1) {
    total += terrain.height[i]
  }
  return total
}

/** 按高度与面朝向给地形上色：沙滩、草地、岩层、雪线，明暗用低频噪声柔和过渡。 */
function createTerrainColorFn(terrain: Terrain) {
  const seaLevel = terrain.seaLevel
  const rise = Math.max(1, terrain.peakHeight - seaLevel)
  const grassLine = seaLevel + rise * 0.6
  const rockLine = seaLevel + rise * 0.72
  const neighborOffsets: readonly (readonly [number, number])[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  /** 列顶与四邻最低处的落差：落差大的列露出岩层而不是土层。 */
  const dropFromNeighbors = (x: number, z: number): number => {
    const height = terrain.getHeight(x, z)
    let lowest = height
    for (const [dx, dz] of neighborOffsets) {
      const nx = x + dx
      const nz = z + dz
      if (!terrain.inBounds(nx, nz)) continue
      const neighbor = terrain.getHeight(nx, nz)
      if (neighbor < lowest) lowest = neighbor
    }
    return height - lowest
  }

  // 同一列会连续查询顶面与若干侧面，按列缓存一次噪声与坡度结果。
  let memoX = -1
  let memoZ = -1
  let memoTop = 0
  let memoPatch = 0
  let memoShade = 0
  let memoBare = false

  const primeColumn = (x: number, z: number): void => {
    if (x === memoX && z === memoZ) return
    memoX = x
    memoZ = z
    memoTop = terrain.getHeight(x, z)
    memoPatch = fbm2(x * 0.055, z * 0.055, 37, 3)
    memoShade = 228 + fbm2(x * 0.17, z * 0.17, 71, 2) * 26
    memoBare = memoTop >= grassLine || dropFromNeighbors(x, z) >= 3
  }

  return (x: number, z: number, y: number, kind: FaceKind): number => {
    primeColumn(x, z)
    const patch = memoPatch
    const shade = memoShade

    // 雪线以上不分朝向一律积雪：陡峭的峰顶大多只露得出侧面，只给顶面上雪是看不到雪的。
    const snowShade = 238 + patch * 17
    if (y >= rockLine) {
      return packColor(VOXEL_COLORS.snow, kind === 'top' ? snowShade : snowShade * 0.95)
    }

    if (kind === 'top') {
      if (y <= seaLevel + 1) return packColor(VOXEL_COLORS.sand, shade)
      if (y >= grassLine) {
        return packColor(patch > 0.52 ? VOXEL_COLORS.gravel : VOXEL_COLORS.rock, shade)
      }
      if (patch > 0.68) return packColor(VOXEL_COLORS.rockWarm, shade)
      if (patch > 0.44) return packColor(VOXEL_COLORS.grassDry, shade)
      return packColor(patch > 0.22 ? VOXEL_COLORS.grass : VOXEL_COLORS.grassDeep, shade)
    }

    const depth = memoTop - 1 - y
    if (depth === 0) {
      if (y <= seaLevel + 1) return packColor(VOXEL_COLORS.sand, shade * 0.92)
      if (memoBare) return packColor(VOXEL_COLORS.rock, shade * 0.9)
      return packColor(VOXEL_COLORS.grassDry, shade * 0.9)
    }
    if (!memoBare && depth < 3) return packColor(VOXEL_COLORS.dirt, shade * 0.88)
    return packColor(y % 5 === 0 ? VOXEL_COLORS.rockDark : VOXEL_COLORS.rock, shade * 0.92)
  }
}

export function buildWorld(options: SceneOptions): World {
  const started = performance.now()
  const terrain = generateTerrain(options)
  const water = generateWater(terrain, options)
  const clouds = generateClouds(terrain, options)
  const plants = generateVegetation(terrain, water.voxels, options)

  const group = new THREE.Group()
  group.position.set(-terrain.size / 2, 0, -terrain.size / 2)

  const opaqueMaterial = createOpaqueVoxelMaterial()

  const terrainBuild = meshHeightField(terrain, createTerrainColorFn(terrain))
  const terrainMesh = new THREE.Mesh(terrainBuild.geometry, opaqueMaterial)
  terrainMesh.castShadow = true
  terrainMesh.receiveShadow = true
  group.add(terrainMesh)

  const isTerrainSolid = (x: number, y: number, z: number): boolean => terrain.isSolid(x, y, z)

  const plantBuild = meshVoxels(plants.voxels, isTerrainSolid)
  const plantMesh = new THREE.Mesh(plantBuild.geometry, opaqueMaterial)
  plantMesh.castShadow = true
  plantMesh.receiveShadow = true
  group.add(plantMesh)

  const waterMaterial = createWaterMaterial()
  const waterBuild = meshVoxels(water.voxels, isTerrainSolid, { uv: true })
  const waterMesh = new THREE.Mesh(waterBuild.geometry, waterMaterial)
  waterMesh.receiveShadow = true
  group.add(waterMesh)

  const seaMaterial = createSeaMaterial()
  const seaSize = Math.max(terrain.size * 8, 2000)
  const seaMesh = new THREE.Mesh(new THREE.PlaneGeometry(seaSize, seaSize), seaMaterial)
  seaMesh.rotation.x = -Math.PI / 2
  seaMesh.position.set(terrain.size / 2, terrain.seaLevel - 0.06, terrain.size / 2)
  group.add(seaMesh)

  const cloudMaterial = createCloudMaterial()
  const cloudBuild = meshVoxels(
    clouds.voxels,
    (x, y, z) => terrain.isSolid(x * clouds.block, y * clouds.block, z * clouds.block),
    { scale: clouds.block },
  )
  const cloudMesh = new THREE.Mesh(cloudBuild.geometry, cloudMaterial)
  cloudMesh.castShadow = true
  const cloudField = new THREE.Group()
  cloudField.add(cloudMesh)
  group.add(cloudField)

  const hazeMaterial = createHazeMaterial(0xdfe9f5, 0.09)
  const hazeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(terrain.size * 3.6, terrain.size * 3.6),
    hazeMaterial,
  )
  hazeMesh.rotation.x = -Math.PI / 2
  hazeMesh.position.set(terrain.size / 2, clouds.baseY + clouds.block * 1.5, terrain.size / 2)
  hazeMesh.visible = options.haze
  hazeMesh.renderOrder = 2
  group.add(hazeMesh)

  let mistPoints: THREE.Points | null = null
  let mistUniforms: MistUniforms | null = null
  if (water.impacts.length > 0) {
    const impacts = water.impacts.slice(0, 16)
    const perImpact = 40
    const total = impacts.length * perImpact
    const positions = new Float32Array(total * 3)
    const seeds = new Float32Array(total)
    const scales = new Float32Array(total)
    const rng = createRng(options.seed ^ 0x7a11f00d)
    let cursor = 0
    for (const impact of impacts) {
      for (let i = 0; i < perImpact; i += 1) {
        positions[cursor * 3] = impact.x + 0.5
        positions[cursor * 3 + 1] = impact.y + 0.5
        positions[cursor * 3 + 2] = impact.z + 0.5
        seeds[cursor] = rng()
        scales[cursor] = (0.5 + rng() * 1.1) * (0.6 + impact.strength * 0.6)
        cursor += 1
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    const mist = createMistMaterial()
    mistUniforms = mist.uniforms
    mistUniforms.uFogDensity.value = options.fogDensity
    mistPoints = new THREE.Points(geometry, mist.material)
    mistPoints.frustumCulled = false
    mistPoints.visible = options.mist
    group.add(mistPoints)
  }

  const terrainVoxels = countTerrainVoxels(terrain)
  const quads =
    terrainBuild.stats.quads +
    plantBuild.stats.quads +
    waterBuild.stats.quads +
    cloudBuild.stats.quads +
    2
  const stats: WorldStats = {
    buildMs: Math.round(performance.now() - started),
    voxels: terrainVoxels + water.voxelCount + clouds.voxelCount + plants.voxelCount,
    quads,
    triangles: quads * 2,
    terrainVoxels,
    waterVoxels: water.voxelCount,
    cloudVoxels: clouds.voxelCount,
    plantVoxels: plants.voxelCount,
    waterFalls: water.falls,
    streams: water.streams,
    trees: plants.trees,
    seaLevel: terrain.seaLevel,
    peakHeight: terrain.peakHeight,
    cloudBaseY: clouds.baseY,
    cloudTopY: clouds.topY,
  }

  const framing: WorldFraming = {
    size: terrain.size,
    seaLevel: terrain.seaLevel,
    peakHeight: terrain.peakHeight,
    centerY: terrain.peakHeight * 0.4,
    radius: terrain.size / 2,
    maxY: Math.max(terrain.peakHeight, clouds.topY + clouds.block * 4),
  }

  const dispose = (): void => {
    group.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        object.geometry.dispose()
      }
    })
    opaqueMaterial.dispose()
    waterMaterial.map?.dispose()
    waterMaterial.dispose()
    seaMaterial.map?.dispose()
    seaMaterial.dispose()
    cloudMaterial.dispose()
    hazeMaterial.dispose()
    if (mistPoints) {
      const material = mistPoints.material
      if (Array.isArray(material)) material.forEach((entry) => entry.dispose())
      else material.dispose()
    }
    group.clear()
  }

  return {
    group,
    stats,
    framing,
    waterMaterial,
    waterMesh,
    seaMaterial,
    seaMesh,
    hazeMaterial,
    hazeMesh,
    cloudField,
    cloudMesh,
    mistPoints,
    mistUniforms,
    dispose,
  }
}
