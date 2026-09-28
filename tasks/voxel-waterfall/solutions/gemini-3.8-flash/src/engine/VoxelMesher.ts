// 高性能体素网格生成器：面剔除 (Face Culling) + 顶点环境光遮蔽 (Vertex Ambient Occlusion)

import * as THREE from 'three';
import { VoxelWorld } from './TerrainGenerator';
import { VoxelType, VOXEL_DEFS } from './VoxelTypes';

export interface VoxelMeshes {
  terrainMesh: THREE.Mesh;
  waterMesh: THREE.Mesh;
  flowerMesh?: THREE.Mesh;
  triangleCount: number;
  voxelCount: number;
}

export class VoxelMesher {
  // 6个面的法线与顶点相对坐标
  // 面的顺序：0:+Y(Top), 1:-Y(Bottom), 2:+Z(Front), 3:-Z(Back), 4:+X(Right), 5:-X(Left)
  private static readonly FACES = [
    { // Top (+Y)
      dir: [0, 1, 0],
      corners: [
        [0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]
      ],
      uvs: [0, 0, 1, 0, 1, 1, 0, 1]
    },
    { // Bottom (-Y)
      dir: [0, -1, 0],
      corners: [
        [0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]
      ],
      uvs: [0, 0, 1, 0, 1, 1, 0, 1]
    },
    { // Front (+Z)
      dir: [0, 0, 1],
      corners: [
        [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]
      ],
      uvs: [0, 0, 1, 0, 1, 1, 0, 1]
    },
    { // Back (-Z)
      dir: [0, 0, -1],
      corners: [
        [1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]
      ],
      uvs: [0, 0, 1, 0, 1, 1, 0, 1]
    },
    { // Right (+X)
      dir: [1, 0, 0],
      corners: [
        [1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]
      ],
      uvs: [0, 0, 1, 0, 1, 1, 0, 1]
    },
    { // Left (-X)
      dir: [-1, 0, 0],
      corners: [
        [0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]
      ],
      uvs: [0, 0, 1, 0, 1, 1, 0, 1]
    }
  ];

  // 计算顶点 AO 遮挡值 (0: 全遮挡, 1: 弱光, 2: 浅遮挡, 3: 无遮挡)
  private static vertexAO(side1: boolean, side2: boolean, corner: boolean): number {
    if (side1 && side2) return 0;
    return 3 - ((side1 ? 1 : 0) + (side2 ? 1 : 0) + (corner ? 1 : 0));
  }

  // 根据方块和面获取4个顶点的AO系数
  private static getFaceAO(
    world: VoxelWorld,
    x: number, y: number, z: number,
    faceIdx: number
  ): [number, number, number, number] {
    const isSolid = (bx: number, by: number, bz: number): boolean => {
      const type = world.getVoxel(bx, by, bz);
      if (type === VoxelType.AIR) return false;
      const def = VOXEL_DEFS[type];
      return def ? def.isSolid : false;
    };

    let s1 = false, s2 = false, s3 = false, s4 = false;
    let c1 = false, c2 = false, c3 = false, c4 = false;

    if (faceIdx === 0) { // Top (+Y)
      const py = y + 1;
      s1 = isSolid(x - 1, py, z);
      s2 = isSolid(x + 1, py, z);
      s3 = isSolid(x, py, z - 1);
      s4 = isSolid(x, py, z + 1);
      c1 = isSolid(x - 1, py, z + 1);
      c2 = isSolid(x + 1, py, z + 1);
      c3 = isSolid(x + 1, py, z - 1);
      c4 = isSolid(x - 1, py, z - 1);
      return [
        this.vertexAO(s1, s4, c1),
        this.vertexAO(s2, s4, c2),
        this.vertexAO(s2, s3, c3),
        this.vertexAO(s1, s3, c4)
      ];
    } else if (faceIdx === 1) { // Bottom (-Y)
      const ny = y - 1;
      s1 = isSolid(x - 1, ny, z);
      s2 = isSolid(x + 1, ny, z);
      s3 = isSolid(x, ny, z - 1);
      s4 = isSolid(x, ny, z + 1);
      c1 = isSolid(x - 1, ny, z - 1);
      c2 = isSolid(x + 1, ny, z - 1);
      c3 = isSolid(x + 1, ny, z + 1);
      c4 = isSolid(x - 1, ny, z + 1);
      return [
        this.vertexAO(s1, s3, c1),
        this.vertexAO(s2, s3, c2),
        this.vertexAO(s2, s4, c3),
        this.vertexAO(s1, s4, c4)
      ];
    } else if (faceIdx === 2) { // Front (+Z)
      const pz = z + 1;
      s1 = isSolid(x - 1, y, pz);
      s2 = isSolid(x + 1, y, pz);
      s3 = isSolid(x, y - 1, pz);
      s4 = isSolid(x, y + 1, pz);
      c1 = isSolid(x - 1, y - 1, pz);
      c2 = isSolid(x + 1, y - 1, pz);
      c3 = isSolid(x + 1, y + 1, pz);
      c4 = isSolid(x - 1, y + 1, pz);
      return [
        this.vertexAO(s1, s3, c1),
        this.vertexAO(s2, s3, c2),
        this.vertexAO(s2, s4, c3),
        this.vertexAO(s1, s4, c4)
      ];
    } else if (faceIdx === 3) { // Back (-Z)
      const nz = z - 1;
      s1 = isSolid(x + 1, y, nz);
      s2 = isSolid(x - 1, y, nz);
      s3 = isSolid(x, y - 1, nz);
      s4 = isSolid(x, y + 1, nz);
      c1 = isSolid(x + 1, y - 1, nz);
      c2 = isSolid(x - 1, y - 1, nz);
      c3 = isSolid(x - 1, y + 1, nz);
      c4 = isSolid(x + 1, y + 1, nz);
      return [
        this.vertexAO(s1, s3, c1),
        this.vertexAO(s2, s3, c2),
        this.vertexAO(s2, s4, c3),
        this.vertexAO(s1, s4, c4)
      ];
    } else if (faceIdx === 4) { // Right (+X)
      const px = x + 1;
      s1 = isSolid(px, y, z + 1);
      s2 = isSolid(px, y, z - 1);
      s3 = isSolid(px, y - 1, z);
      s4 = isSolid(px, y + 1, z);
      c1 = isSolid(px, y - 1, z + 1);
      c2 = isSolid(px, y - 1, z - 1);
      c3 = isSolid(px, y + 1, z - 1);
      c4 = isSolid(px, y + 1, z + 1);
      return [
        this.vertexAO(s1, s3, c1),
        this.vertexAO(s2, s3, c2),
        this.vertexAO(s2, s4, c3),
        this.vertexAO(s1, s4, c4)
      ];
    } else { // Left (-X)
      const nx = x - 1;
      s1 = isSolid(nx, y, z - 1);
      s2 = isSolid(nx, y, z + 1);
      s3 = isSolid(nx, y - 1, z);
      s4 = isSolid(nx, y + 1, z);
      c1 = isSolid(nx, y - 1, z - 1);
      c2 = isSolid(nx, y - 1, z + 1);
      c3 = isSolid(nx, y + 1, z + 1);
      c4 = isSolid(nx, y + 1, z - 1);
      return [
        this.vertexAO(s1, s3, c1),
        this.vertexAO(s2, s3, c2),
        this.vertexAO(s2, s4, c3),
        this.vertexAO(s1, s4, c4)
      ];
    }
  }

  public static buildMeshes(world: VoxelWorld): VoxelMeshes {
    const { sizeX, sizeY, sizeZ } = world;

    // 预估顶点容量
    const maxFaces = 180000;
    const terrainPositions = new Float32Array(maxFaces * 4 * 3);
    const terrainNormals = new Float32Array(maxFaces * 4 * 3);
    const terrainColors = new Float32Array(maxFaces * 4 * 3);
    const terrainIndices = new Uint32Array(maxFaces * 6);

    const waterPositions = new Float32Array(maxFaces * 4 * 3);
    const waterNormals = new Float32Array(maxFaces * 4 * 3);
    const waterColors = new Float32Array(maxFaces * 4 * 3);
    const waterIndices = new Uint32Array(maxFaces * 6);

    let tVertexCount = 0;
    let tIndexCount = 0;
    let wVertexCount = 0;
    let wIndexCount = 0;
    let voxelCount = 0;

    const aoLevels = [0.46, 0.65, 0.82, 1.0];

    // 基础面固有明暗 (模拟Minecraft顶面最亮、底面最暗、侧面不同的假环境光)
    const faceLightMultiplier = [1.0, 0.55, 0.85, 0.80, 0.90, 0.75];

    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
          const type = world.getVoxel(x, y, z);
          if (type === VoxelType.AIR) continue;
          voxelCount++;

          const def = VOXEL_DEFS[type];
          if (!def) continue;

          const isWater = def.isFluid;

          // 检查6个面
          for (let f = 0; f < 6; f++) {
            const face = this.FACES[f];
            const nx = x + face.dir[0];
            const ny = y + face.dir[1];
            const nz = z + face.dir[2];

            const neighbor = world.getVoxel(nx, ny, nz);
            const neighborDef = VOXEL_DEFS[neighbor];

            let emitFace = false;
            if (isWater) {
              // 水体：只有临近非水体、或临近空气时渲染
              if (!neighborDef || !neighborDef.isFluid) {
                emitFace = true;
              }
            } else {
              // 固体地貌：邻近为空气或水或半透明物时渲染
              if (neighbor === VoxelType.AIR || (neighborDef && neighborDef.isTransparent)) {
                emitFace = true;
              }
            }

            if (!emitFace) continue;

            // 选择基础色彩 (顶/底/侧)
            let baseColor = def.sideColor;
            if (f === 0) baseColor = def.topColor;
            else if (f === 1) baseColor = def.bottomColor;

            // 轻微随机色差，增添体素真实手工质感
            const hash = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + f * 11.3) * 43758.5453;
            const noiseOffset = ((hash - Math.floor(hash)) - 0.5) * 0.05;

            const baseLight = faceLightMultiplier[f];

            // 计算该面4个顶点的AO遮挡
            const aos = isWater ? [3, 3, 3, 3] : this.getFaceAO(world, x, y, z, f);

            // 写入缓冲
            const corners = face.corners;
            const norm = face.dir;

            const isT = !isWater;
            let vOffset = isT ? tVertexCount : wVertexCount;
            const posArr = isT ? terrainPositions : waterPositions;
            const normArr = isT ? terrainNormals : waterNormals;
            const colArr = isT ? terrainColors : waterColors;
            const idxArr = isT ? terrainIndices : waterIndices;
            let iOffset = isT ? tIndexCount : wIndexCount;

            const baseV = vOffset;

            for (let c = 0; c < 4; c++) {
              const corner = corners[c];
              const pIdx = (vOffset + c) * 3;

              posArr[pIdx] = x + corner[0];
              posArr[pIdx + 1] = y + corner[1];
              posArr[pIdx + 2] = z + corner[2];

              normArr[pIdx] = norm[0];
              normArr[pIdx + 1] = norm[1];
              normArr[pIdx + 2] = norm[2];

              const aoFactor = aoLevels[aos[c]];
              const finalR = Math.max(0, Math.min(1, (baseColor[0] + noiseOffset) * baseLight * aoFactor));
              const finalG = Math.max(0, Math.min(1, (baseColor[1] + noiseOffset) * baseLight * aoFactor));
              const finalB = Math.max(0, Math.min(1, (baseColor[2] + noiseOffset) * baseLight * aoFactor));

              colArr[pIdx] = finalR;
              colArr[pIdx + 1] = finalG;
              colArr[pIdx + 2] = finalB;
            }

            // 两个三角形构成一个四边形面 (考虑AO对角线优化避免伪影)
            if (aos[0] + aos[2] > aos[1] + aos[3]) {
              idxArr[iOffset++] = baseV + 0;
              idxArr[iOffset++] = baseV + 1;
              idxArr[iOffset++] = baseV + 2;

              idxArr[iOffset++] = baseV + 0;
              idxArr[iOffset++] = baseV + 2;
              idxArr[iOffset++] = baseV + 3;
            } else {
              idxArr[iOffset++] = baseV + 1;
              idxArr[iOffset++] = baseV + 2;
              idxArr[iOffset++] = baseV + 3;

              idxArr[iOffset++] = baseV + 1;
              idxArr[iOffset++] = baseV + 3;
              idxArr[iOffset++] = baseV + 0;
            }

            if (isT) {
              tVertexCount += 4;
              tIndexCount = iOffset;
            } else {
              wVertexCount += 4;
              wIndexCount = iOffset;
            }
          }
        }
      }
    }

    // 创建 Terrain BufferGeometry
    const terrainGeo = new THREE.BufferGeometry();
    terrainGeo.setAttribute('position', new THREE.BufferAttribute(terrainPositions.subarray(0, tVertexCount * 3), 3));
    terrainGeo.setAttribute('normal', new THREE.BufferAttribute(terrainNormals.subarray(0, tVertexCount * 3), 3));
    terrainGeo.setAttribute('color', new THREE.BufferAttribute(terrainColors.subarray(0, tVertexCount * 3), 3));
    terrainGeo.setIndex(new THREE.BufferAttribute(terrainIndices.subarray(0, tIndexCount), 1));

    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.castShadow = true;
    terrainMesh.receiveShadow = true;

    // 创建 Water BufferGeometry
    const waterGeo = new THREE.BufferGeometry();
    waterGeo.setAttribute('position', new THREE.BufferAttribute(waterPositions.subarray(0, wVertexCount * 3), 3));
    waterGeo.setAttribute('normal', new THREE.BufferAttribute(waterNormals.subarray(0, wVertexCount * 3), 3));
    waterGeo.setAttribute('color', new THREE.BufferAttribute(waterColors.subarray(0, wVertexCount * 3), 3));
    waterGeo.setIndex(new THREE.BufferAttribute(waterIndices.subarray(0, wIndexCount), 1));

    const waterMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.12,
      metalness: 0.1,
      transparent: true,
      opacity: 0.82,
      flatShading: true
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.receiveShadow = true;

    const totalTriangles = (tIndexCount + wIndexCount) / 3;

    return {
      terrainMesh,
      waterMesh,
      triangleCount: totalTriangles,
      voxelCount
    };
  }
}
