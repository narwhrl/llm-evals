import * as THREE from 'three';
import { VoxelType } from '../utils/types';
import { VOXEL_COLORS } from '../utils/colors';
import { TerrainData } from './TerrainGenerator';

export interface VoxelMeshResult {
  solidMesh: THREE.Mesh;
  waterMesh: THREE.Mesh;
  lanternMesh: THREE.Mesh;
  voxelCount: number;
  faceCount: number;
}

// 6 Face Direction Definitions
// 0: +Y (Top), 1: -Y (Bottom), 2: +Z (North), 3: -Z (South), 4: +X (East), 5: -X (West)
const FACE_NORMALS = [
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
  [1, 0, 0],
  [-1, 0, 0],
];

const FACE_LIGHT_MULTIPLIER = [1.0, 0.55, 0.88, 0.88, 0.78, 0.78];

// 4 Corner Vertices for each face (relative to voxel origin 0..1)
const FACE_CORNERS = [
  // Top (+Y)
  [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]],
  // Bottom (-Y)
  [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]],
  // North (+Z)
  [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]],
  // South (-Z)
  [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]],
  // East (+X)
  [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]],
  // West (-X)
  [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]],
];

// AO Neighbor offsets for 4 vertices of each face
const AO_OFFSETS = [
  // Top (+Y)
  [
    [[-1, 1, 0], [0, 1, 1], [-1, 1, 1]],
    [[1, 1, 0], [0, 1, 1], [1, 1, 1]],
    [[1, 1, 0], [0, 1, -1], [1, 1, -1]],
    [[-1, 1, 0], [0, 1, -1], [-1, 1, -1]],
  ],
  // Bottom (-Y)
  [
    [[-1, -1, 0], [0, -1, -1], [-1, -1, -1]],
    [[1, -1, 0], [0, -1, -1], [1, -1, -1]],
    [[1, -1, 0], [0, -1, 1], [1, -1, 1]],
    [[-1, -1, 0], [0, -1, 1], [-1, -1, 1]],
  ],
  // North (+Z)
  [
    [[-1, 0, 1], [0, -1, 1], [-1, -1, 1]],
    [[1, 0, 1], [0, -1, 1], [1, -1, 1]],
    [[1, 0, 1], [0, 1, 1], [1, 1, 1]],
    [[-1, 0, 1], [0, 1, 1], [-1, 1, 1]],
  ],
  // South (-Z)
  [
    [[1, 0, -1], [0, -1, -1], [1, -1, -1]],
    [[-1, 0, -1], [0, -1, -1], [-1, -1, -1]],
    [[-1, 0, -1], [0, 1, -1], [-1, 1, -1]],
    [[1, 0, -1], [0, 1, -1], [1, 1, -1]],
  ],
  // East (+X)
  [
    [[1, 0, 1], [1, -1, 0], [1, -1, 1]],
    [[1, 0, -1], [1, -1, 0], [1, -1, -1]],
    [[1, 0, -1], [1, 1, 0], [1, 1, -1]],
    [[1, 0, 1], [1, 1, 0], [1, 1, 1]],
  ],
  // West (-X)
  [
    [[-1, 0, -1], [-1, -1, 0], [-1, -1, -1]],
    [[-1, 0, 1], [-1, -1, 0], [-1, -1, 1]],
    [[-1, 0, 1], [-1, 1, 0], [-1, 1, 1]],
    [[-1, 0, -1], [-1, 1, 0], [-1, 1, -1]],
  ],
];

export class VoxelMeshBuilder {
  private solidMaterial: THREE.MeshStandardMaterial;
  private waterMaterial: THREE.MeshStandardMaterial;
  private lanternMaterial: THREE.MeshStandardMaterial;

  constructor() {
    // Terrain Solid Material with vertex colors, slight roughness for crisp Minecraft feel
    this.solidMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.82,
      metalness: 0.05,
      flatShading: true,
      side: THREE.FrontSide,
    });

    // Vibrant Crystal Blue Water Material
    this.waterMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.1,
      metalness: 0.15,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    });

    // Glowing Lantern Material
    this.lanternMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffaa22,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      flatShading: true,
    });
  }

  public build(terrainData: TerrainData): VoxelMeshResult {
    const { gridSize: N, height: H, voxels } = terrainData;
    const halfN = N / 2;

    const getIdx = (x: number, y: number, z: number) => (y * N * N) + (z * N) + x;
    const inBounds = (x: number, y: number, z: number) => x >= 0 && x < N && y >= 0 && y < H && z >= 0 && z < N;
    const getVoxel = (x: number, y: number, z: number) => {
      if (!inBounds(x, y, z)) return VoxelType.AIR;
      return voxels[getIdx(x, y, z)];
    };

    const isWaterBlock = (v: VoxelType) => v === VoxelType.WATER || v === VoxelType.WATER_FALL;
    const isOpaque = (v: VoxelType) => {
      return v !== VoxelType.AIR && !isWaterBlock(v) && v !== VoxelType.CLOUD;
    };

    const isSolidBlock = (x: number, y: number, z: number) => {
      const v = getVoxel(x, y, z);
      return isOpaque(v);
    };

    // Buffers for Solid Terrain
    const solidPositions: number[] = [];
    const solidNormals: number[] = [];
    const solidColors: number[] = [];
    const solidIndices: number[] = [];

    // Buffers for Water
    const waterPositions: number[] = [];
    const waterNormals: number[] = [];
    const waterColors: number[] = [];
    const waterIndices: number[] = [];

    // Buffers for Lanterns
    const lanternPositions: number[] = [];
    const lanternNormals: number[] = [];
    const lanternColors: number[] = [];
    const lanternIndices: number[] = [];

    let totalVoxels = 0;
    let totalFaces = 0;

    const tmpColor = new THREE.Color();

    for (let y = 0; y < H; y++) {
      for (let z = 0; z < N; z++) {
        for (let x = 0; x < N; x++) {
          const voxel = getVoxel(x, y, z);
          if (voxel === VoxelType.AIR || voxel === VoxelType.CLOUD) continue;

          totalVoxels++;
          const isWater = isWaterBlock(voxel);
          const isWaterfall = voxel === VoxelType.WATER_FALL;
          const isLantern = voxel === VoxelType.LANTERN;

          let baseHex = VOXEL_COLORS[voxel as VoxelType] || 0xffffff;
          if (isWaterfall) {
            // High visibility vibrant cyan-blue for waterfall
            baseHex = (x + y + z) % 7 === 0 ? 0xe0f7fa : 0x00b4d8;
          } else if (isWater) {
            // Deep clear azure blue for lake & ponds
            baseHex = (x + z) % 5 === 0 ? 0x0284c7 : 0x0369a1;
          }
          tmpColor.setHex(baseHex);

          // Check all 6 faces
          for (let f = 0; f < 6; f++) {
            const [nx, ny, nz] = FACE_NORMALS[f];
            const neighborX = x + nx;
            const neighborY = y + ny;
            const neighborZ = z + nz;

            const neighborVoxel = getVoxel(neighborX, neighborY, neighborZ);

            let faceVisible = false;
            if (isWater) {
              // Water face is visible only against air/cloud (hide submerged internal water faces)
              faceVisible = neighborVoxel === VoxelType.AIR || neighborVoxel === VoxelType.CLOUD;
            } else {
              // Solid face visible against air, cloud, or water
              faceVisible = !isOpaque(neighborVoxel);
            }

            if (!faceVisible) continue;
            totalFaces++;

            const targetPos = isWater ? waterPositions : (isLantern ? lanternPositions : solidPositions);
            const targetNorm = isWater ? waterNormals : (isLantern ? lanternNormals : solidNormals);
            const targetCol = isWater ? waterColors : (isLantern ? lanternColors : solidColors);
            const targetIdx = isWater ? waterIndices : (isLantern ? lanternIndices : solidIndices);

            const baseIndex = targetPos.length / 3;
            const corners = FACE_CORNERS[f];
            const lightMul = FACE_LIGHT_MULTIPLIER[f];

            // 4 Quad Vertices
            for (let c = 0; c < 4; c++) {
              const [cx, cy, cz] = corners[c];
              const vx = x + cx - halfN;
              const vy = y + cy;
              const vz = z + cz - halfN;

              targetPos.push(vx, vy, vz);
              targetNorm.push(nx, ny, nz);

              // Calculate Vertex AO
              let aoFactor = 1.0;
              if (!isLantern) {
                const [s1, s2, corner] = AO_OFFSETS[f][c];
                const side1Solid = isSolidBlock(x + s1[0], y + s1[1], z + s1[2]);
                const side2Solid = isSolidBlock(x + s2[0], y + s2[1], z + s2[2]);
                const cornerSolid = isSolidBlock(x + corner[0], y + corner[1], z + corner[2]);

                let aoCount = (side1Solid ? 1 : 0) + (side2Solid ? 1 : 0);
                if (side1Solid || side2Solid) {
                  if (cornerSolid) aoCount += 1;
                }
                const aoCurve = [1.0, 0.82, 0.62, 0.45];
                aoFactor = aoCurve[aoCount];
              }

              // Color = Base Color * Face Shading * AO Factor
              const finalR = tmpColor.r * lightMul * aoFactor;
              const finalG = tmpColor.g * lightMul * aoFactor;
              const finalB = tmpColor.b * lightMul * aoFactor;

              targetCol.push(finalR, finalG, finalB);
            }

            // 2 Triangles for Quad (0-1-2 and 0-2-3)
            targetIdx.push(
              baseIndex, baseIndex + 1, baseIndex + 2,
              baseIndex, baseIndex + 2, baseIndex + 3
            );
          }
        }
      }
    }

    // Build Three.js BufferGeometries
    const createMesh = (
      pos: number[],
      norm: number[],
      col: number[],
      idx: number[],
      mat: THREE.Material,
      castShadow = true,
      receiveShadow = true
    ) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      geo.setIndex(idx);
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      return mesh;
    };

    const solidMesh = createMesh(solidPositions, solidNormals, solidColors, solidIndices, this.solidMaterial, true, true);
    const waterMesh = createMesh(waterPositions, waterNormals, waterColors, waterIndices, this.waterMaterial, false, true);
    const lanternMesh = createMesh(lanternPositions, lanternNormals, lanternColors, lanternIndices, this.lanternMaterial, false, false);

    return {
      solidMesh,
      waterMesh,
      lanternMesh,
      voxelCount: totalVoxels,
      faceCount: totalFaces,
    };
  }

  public getSolidMaterial() {
    return this.solidMaterial;
  }

  public getWaterMaterial(): THREE.MeshStandardMaterial {
    return this.waterMaterial;
  }
}
