import * as THREE from 'three'
import type { Terrain } from './terrain'

/** 稀疏体素集合：键为 voxelKey(x, y, z)，值为打包后的颜色 + 明暗。 */
export type VoxelSet = Map<number, number>

const KEY_OFFSET = 1024
const KEY_Z_SPAN = 2048
const KEY_Y_SPAN = 1024

export function voxelKey(x: number, y: number, z: number): number {
  return ((x + KEY_OFFSET) * KEY_Z_SPAN + (z + KEY_OFFSET)) * KEY_Y_SPAN + y
}

/** 颜色按 8 位线性 RGB 写入顶点属性；shade 为逐体素明暗系数（0–255）。 */
export function packRgb(r: number, g: number, b: number, shade = 255): number {
  const s = shade < 0 ? 0 : shade > 255 ? 255 : Math.round(shade)
  return (r & 0xff) | ((g & 0xff) << 8) | ((b & 0xff) << 16) | ((s & 0xff) << 24)
}

export function packColor(hex: number, shade = 255): number {
  return packRgb((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff, shade)
}

const SRGB_TO_LINEAR = new Float32Array(256)
for (let i = 0; i < 256; i += 1) {
  const value = i / 255
  SRGB_TO_LINEAR[i] = value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
}

export type FaceKind = 'top' | 'side'
export type FaceColorFn = (x: number, z: number, y: number, kind: FaceKind) => number

export type MeshStats = {
  quads: number
  vertices: number
  triangles: number
}

export type MeshBuild = {
  geometry: THREE.BufferGeometry
  stats: MeshStats
}

type FaceDefinition = {
  dx: number
  dy: number
  dz: number
  nx: number
  ny: number
  nz: number
  corners: readonly (readonly [number, number, number])[]
  uAxis: 0 | 1 | 2
  vAxis: 0 | 1 | 2
}

export const FACES: readonly FaceDefinition[] = [
  {
    dx: 1,
    dy: 0,
    dz: 0,
    nx: 1,
    ny: 0,
    nz: 0,
    corners: [
      [1, 0, 1],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
    ],
    uAxis: 2,
    vAxis: 1,
  },
  {
    dx: -1,
    dy: 0,
    dz: 0,
    nx: -1,
    ny: 0,
    nz: 0,
    corners: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    uAxis: 2,
    vAxis: 1,
  },
  {
    dx: 0,
    dy: 1,
    dz: 0,
    nx: 0,
    ny: 1,
    nz: 0,
    corners: [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
    uAxis: 0,
    vAxis: 2,
  },
  {
    dx: 0,
    dy: -1,
    dz: 0,
    nx: 0,
    ny: -1,
    nz: 0,
    corners: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
    uAxis: 0,
    vAxis: 2,
  },
  {
    dx: 0,
    dy: 0,
    dz: 1,
    nx: 0,
    ny: 0,
    nz: 1,
    corners: [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ],
    uAxis: 0,
    vAxis: 1,
  },
  {
    dx: 0,
    dy: 0,
    dz: -1,
    nx: 0,
    ny: 0,
    nz: -1,
    corners: [
      [1, 0, 0],
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    uAxis: 0,
    vAxis: 1,
  },
]

const TOP_FACE = FACES[2]
const SIDE_FACES: readonly FaceDefinition[] = [FACES[0], FACES[1], FACES[4], FACES[5]]

class MeshBuilder {
  private positions: Float32Array
  private normals: Int8Array
  private colors: Uint8Array
  private uvs: Float32Array | null
  private indices: Uint32Array
  private capacity: number
  private scale: number
  private quads = 0

  constructor(quadEstimate: number, withUv: boolean, scale = 1) {
    this.capacity = Math.max(16, Math.ceil(quadEstimate * 1.1))
    this.positions = new Float32Array(this.capacity * 12)
    this.normals = new Int8Array(this.capacity * 12)
    this.colors = new Uint8Array(this.capacity * 12)
    this.uvs = withUv ? new Float32Array(this.capacity * 8) : null
    this.indices = new Uint32Array(this.capacity * 6)
    this.scale = scale
  }

  private grow(): void {
    const capacity = this.capacity * 2
    const positions = new Float32Array(capacity * 12)
    positions.set(this.positions)
    this.positions = positions
    const normals = new Int8Array(capacity * 12)
    normals.set(this.normals)
    this.normals = normals
    const colors = new Uint8Array(capacity * 12)
    colors.set(this.colors)
    this.colors = colors
    if (this.uvs) {
      const uvs = new Float32Array(capacity * 8)
      uvs.set(this.uvs)
      this.uvs = uvs
    }
    const indices = new Uint32Array(capacity * 6)
    indices.set(this.indices)
    this.indices = indices
    this.capacity = capacity
  }

  addFace(face: FaceDefinition, x: number, y: number, z: number, packed: number): void {
    if (this.quads >= this.capacity) this.grow()

    const red = SRGB_TO_LINEAR[(packed >> 0) & 0xff]
    const green = SRGB_TO_LINEAR[(packed >> 8) & 0xff]
    const blue = SRGB_TO_LINEAR[(packed >> 16) & 0xff]
    const shade = ((packed >> 24) & 0xff) / 255
    const scale = this.scale

    const vertex = this.quads * 4
    const positions = this.positions
    const normals = this.normals
    const colors = this.colors
    const uvs = this.uvs
    const coordinates = [x, y, z]

    for (let i = 0; i < 4; i += 1) {
      const corner = face.corners[i]
      const offset = vertex * 3 + i * 3
      positions[offset] = (x + corner[0]) * scale
      positions[offset + 1] = (y + corner[1]) * scale
      positions[offset + 2] = (z + corner[2]) * scale
      normals[offset] = face.nx * 127
      normals[offset + 1] = face.ny * 127
      normals[offset + 2] = face.nz * 127
      colors[offset] = Math.min(255, Math.round(red * shade * 255))
      colors[offset + 1] = Math.min(255, Math.round(green * shade * 255))
      colors[offset + 2] = Math.min(255, Math.round(blue * shade * 255))
      if (uvs) {
        const uvOffset = vertex * 2 + i * 2
        uvs[uvOffset] = (coordinates[face.uAxis] + corner[face.uAxis]) * scale
        uvs[uvOffset + 1] = (coordinates[face.vAxis] + corner[face.vAxis]) * scale
      }
    }

    const indexOffset = this.quads * 6
    const indices = this.indices
    indices[indexOffset] = vertex
    indices[indexOffset + 1] = vertex + 1
    indices[indexOffset + 2] = vertex + 2
    indices[indexOffset + 3] = vertex
    indices[indexOffset + 4] = vertex + 2
    indices[indexOffset + 5] = vertex + 3

    this.quads += 1
  }

  build(): MeshBuild {
    const vertices = this.quads * 4
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.positions.slice(0, vertices * 3), 3),
    )
    geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(this.normals.slice(0, vertices * 3), 3, true),
    )
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(this.colors.slice(0, vertices * 3), 3, true),
    )
    if (this.uvs) {
      geometry.setAttribute('uv', new THREE.BufferAttribute(this.uvs.slice(0, vertices * 2), 2))
    }
    geometry.setIndex(new THREE.BufferAttribute(this.indices.slice(0, this.quads * 6), 1))
    geometry.computeBoundingSphere()
    geometry.computeBoundingBox()
    return {
      geometry,
      stats: { quads: this.quads, vertices, triangles: this.quads * 2 },
    }
  }
}

/**
 * 高度场专用网格化：每列只在邻居更低的方向、且只在该高度区间生成侧面，
 * 不需要为体素逐个建对象，因此 200×200 以上的地形也能秒级完成。
 */
export function meshHeightField(terrain: Terrain, colorOf: FaceColorFn): MeshBuild {
  const size = terrain.size
  const height = terrain.height
  const builder = new MeshBuilder(size * size, false)

  for (let z = 0; z < size; z += 1) {
    for (let x = 0; x < size; x += 1) {
      const columnHeight = height[z * size + x]
      if (columnHeight <= 0) continue

      builder.addFace(TOP_FACE, x, columnHeight - 1, z, colorOf(x, z, columnHeight - 1, 'top'))

      for (let f = 0; f < SIDE_FACES.length; f += 1) {
        const face = SIDE_FACES[f]
        const neighborHeight = terrain.getHeight(x + face.dx, z + face.dz)
        for (let y = neighborHeight; y < columnHeight; y += 1) {
          builder.addFace(face, x, y, z, colorOf(x, z, y, 'side'))
        }
      }
    }
  }

  return builder.build()
}

/**
 * 稀疏体素网格化：只保留与空气相邻的面。
 * isOccluded 用于接入外部遮挡（例如水体要判断地形是否实体）；
 * scale 用于把整块体素放大（云块比地形体素大，靠它控制面数）。
 */
export function meshVoxels(
  voxels: VoxelSet,
  isOccluded: (x: number, y: number, z: number) => boolean,
  options: { uv?: boolean; scale?: number } = {},
): MeshBuild {
  const builder = new MeshBuilder(voxels.size, options.uv === true, options.scale ?? 1)

  voxels.forEach((packed, key) => {
    const y = key % KEY_Y_SPAN
    const rest = (key - y) / KEY_Y_SPAN
    const zOffset = rest % KEY_Z_SPAN
    const z = zOffset - KEY_OFFSET
    const x = (rest - zOffset) / KEY_Z_SPAN - KEY_OFFSET

    for (let f = 0; f < FACES.length; f += 1) {
      const face = FACES[f]
      const nx = x + face.dx
      const ny = y + face.dy
      const nz = z + face.dz
      if (voxels.has(voxelKey(nx, ny, nz))) continue
      if (isOccluded(nx, ny, nz)) continue
      builder.addFace(face, x, y, z, packed)
    }
  })

  return builder.build()
}
