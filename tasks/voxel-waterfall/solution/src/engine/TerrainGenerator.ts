// 地形生成器 (进阶版)：大尺度壮丽山脉、多级宏伟飞瀑、穿云峰顶、自然浮岛地层

import { SimplexNoise, PRNG } from './Noise';
import { VoxelType } from './VoxelTypes';

export interface TerrainConfig {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  seed: number;
  heightScale: number;
  roughness: number;
  treeDensity: number;
  waterLevel: number;
}

export interface WaterfallInfo {
  x: number;
  y: number;
  z: number;
  flowDirection: [number, number, number];
  isImpact: boolean;
}

export class VoxelWorld {
  public readonly sizeX: number;
  public readonly sizeY: number;
  public readonly sizeZ: number;
  public readonly voxels: Uint8Array;
  public readonly heightMap: Int16Array;
  public readonly waterMap: Int16Array;
  public readonly waterfallPoints: WaterfallInfo[] = [];

  constructor(sizeX: number, sizeY: number, sizeZ: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.sizeZ = sizeZ;
    this.voxels = new Uint8Array(sizeX * sizeY * sizeZ);
    this.heightMap = new Int16Array(sizeX * sizeZ);
    this.waterMap = new Int16Array(sizeX * sizeZ);
    this.waterMap.fill(-1);
  }

  public getIndex(x: number, y: number, z: number): number {
    return y * (this.sizeX * this.sizeZ) + z * this.sizeX + x;
  }

  public getVoxel(x: number, y: number, z: number): number {
    if (x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY || z < 0 || z >= this.sizeZ) {
      return VoxelType.AIR;
    }
    return this.voxels[this.getIndex(x, y, z)];
  }

  public setVoxel(x: number, y: number, z: number, val: number): void {
    if (x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY || z < 0 || z >= this.sizeZ) {
      return;
    }
    this.voxels[this.getIndex(x, y, z)] = val;
  }
}

export class TerrainGenerator {
  public static generate(config: TerrainConfig): VoxelWorld {
    const { sizeX, sizeY, sizeZ, seed, heightScale, roughness, treeDensity, waterLevel } = config;
    const world = new VoxelWorld(sizeX, sizeY, sizeZ);
    const noise = new SimplexNoise(seed);
    const rng = new PRNG(seed + 8888);

    // 1. 生成宏观山脉高度场 (主峰 + 3座起伏次峰 + 谷地 + 前景宽广平湖)
    const rawHeight = new Float32Array(sizeX * sizeZ);

    // 峰峦坐标布局
    const mainPeakX = sizeX * 0.44;  // 主峰 ~ 88
    const mainPeakZ = sizeZ * 0.38;  // 主峰 ~ 76
    const mainPeakH = 60 * heightScale;

    const sub1X = sizeX * 0.74;     // 东次峰 ~ 148
    const sub1Z = sizeZ * 0.32;     // ~ 64
    const sub1H = 48 * heightScale;

    const sub2X = sizeX * 0.22;     // 西侧峭壁峰 ~ 44
    const sub2Z = sizeZ * 0.62;     // ~ 124
    const sub2H = 44 * heightScale;

    const sub3X = sizeX * 0.62;     // 北侧连绵山脊 ~ 124
    const sub3Z = sizeZ * 0.68;     // ~ 136
    const sub3H = 39 * heightScale;

    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        const nx = x / sizeX;
        const nz = z / sizeZ;

        // 连绵山势与褶皱
        const baseFbm = noise.fbm2D(nx * 2.8, nz * 2.8, 5, 2.0, 0.52);
        const ridgeFbm = noise.ridged2D(nx * 3.5 + 0.8, nz * 3.5 + 0.8, 4);

        // 主峰尖锐度 (指数衰减，造就挺拔陡峭的阿尔卑斯式尖峰)
        const dMain = Math.hypot(x - mainPeakX, z - mainPeakZ);
        const mainWeight = Math.exp(-Math.pow(dMain / (sizeX * 0.21), 1.85));

        // 次峰权重
        const dSub1 = Math.hypot(x - sub1X, z - sub1Z);
        const sub1Weight = Math.exp(-Math.pow(dSub1 / (sizeX * 0.18), 1.8));

        const dSub2 = Math.hypot(x - sub2X, z - sub2Z);
        const sub2Weight = Math.exp(-Math.pow(dSub2 / (sizeX * 0.16), 1.7));

        const dSub3 = Math.hypot(x - sub3X, z - sub3Z);
        const sub3Weight = Math.exp(-Math.pow(dSub3 / (sizeX * 0.15), 1.7));

        // 总体地势：东北背山高耸，西南面南平缓，山脚形成开阔水湾
        const southSlope = Math.max(0, 1.0 - Math.pow(z / sizeZ, 1.35));
        const lakeBasin = Math.exp(-Math.pow(Math.hypot(x - sizeX * 0.52, z - sizeZ * 0.84) / (sizeX * 0.36), 2.2));

        let h = (mainWeight * mainPeakH) +
                (sub1Weight * sub1H) +
                (sub2Weight * sub2H) +
                (sub3Weight * sub3H);

        h += baseFbm * 18 * roughness * southSlope;
        h += ridgeFbm * 15 * roughness * southSlope;

        // 山脚湖泊盆地凹陷
        h = h * (1.0 - lakeBasin * 0.78) + 4;

        // 边缘平缓下切，使整体呈精致体素地貌切片
        const edgeDist = Math.min(x, sizeX - 1 - x, z, sizeZ - 1 - z);
        const edgeFactor = Math.min(1.0, Math.pow(edgeDist / 12, 0.75));
        h *= edgeFactor;

        rawHeight[z * sizeX + x] = Math.max(3, Math.min(sizeY - 3, h));
      }
    }

    // 2. 雕琢高山天池、峡谷与宽阔大落差主瀑布悬崖
    // 高山天池 (Y≈42)
    const tarnCenter = { x: Math.floor(sizeX * 0.53), z: Math.floor(sizeZ * 0.40), y: Math.floor(41 * heightScale) };
    const waterfallCliffZ = Math.floor(sizeZ * 0.52); // ~104 悬崖切线
    const midPool = { x: tarnCenter.x + 1, z: waterfallCliffZ + 12, y: Math.floor(22 * heightScale) }; // 中层碧潭

    // 刻蚀上游河道与天池湖盆
    for (let rz = tarnCenter.z - 8; rz <= waterfallCliffZ; rz++) {
      for (let rx = tarnCenter.x - 9; rx <= tarnCenter.x + 9; rx++) {
        if (rx < 0 || rx >= sizeX || rz < 0 || rz >= sizeZ) continue;
        const dx = rx - tarnCenter.x;
        const dz = rz - tarnCenter.z;
        const dist = Math.hypot(dx, dz);

        if (dist <= 8) {
          const depth = (8.2 - dist) * 1.2;
          rawHeight[rz * sizeX + rx] = Math.min(rawHeight[rz * sizeX + rx], tarnCenter.y - depth);
        } else if (rz >= tarnCenter.z && rz <= waterfallCliffZ) {
          // 河谷切槽
          const canalDist = Math.abs(rx - (tarnCenter.x + (rz - tarnCenter.z) * 0.1));
          if (canalDist <= 5) {
            const riverSlope = tarnCenter.y - ((rz - tarnCenter.z) / (waterfallCliffZ - tarnCenter.z)) * 3;
            rawHeight[rz * sizeX + rx] = Math.min(rawHeight[rz * sizeX + rx], riverSlope - (5 - canalDist) * 0.8);
          }
        }
      }
    }

    // 悬崖削切：主瀑布垂直跌落通道 (落差从 Y=38 垂直降至 Y=22)
    for (let rz = waterfallCliffZ - 1; rz <= midPool.z + 4; rz++) {
      for (let rx = midPool.x - 18; rx <= midPool.x + 18; rx++) {
        if (rx < 0 || rx >= sizeX || rz < 0 || rz >= sizeZ) continue;
        const dMid = Math.hypot(rx - midPool.x, rz - midPool.z);
        if (dMid <= 9) {
          // 中层碧潭汇水盆
          rawHeight[rz * sizeX + rx] = Math.min(rawHeight[rz * sizeX + rx], midPool.y - (9 - dMid) * 0.45);
        } else if (rz >= waterfallCliffZ && rz < midPool.z) {
          const cDist = Math.abs(rx - midPool.x);
          if (cDist <= 7) {
            // 瀑布垂直绝壁开槽
            rawHeight[rz * sizeX + rx] = Math.min(rawHeight[rz * sizeX + rx], midPool.y + 1);
          }
        }
      }
    }

    // 两道次级下层级联瀑布 (Stepped Cascades)
    const stream1 = [
      { x: midPool.x - 5, z: midPool.z + 6, y: 19 },
      { x: midPool.x - 9, z: midPool.z + 14, y: 15 },
      { x: midPool.x - 14, z: midPool.z + 23, y: 11 },
      { x: midPool.x - 16, z: midPool.z + 32, y: waterLevel }
    ];

    const stream2 = [
      { x: midPool.x + 6, z: midPool.z + 7, y: 18 },
      { x: midPool.x + 11, z: midPool.z + 15, y: 14 },
      { x: midPool.x + 14, z: midPool.z + 24, y: 10 },
      { x: midPool.x + 16, z: midPool.z + 33, y: waterLevel }
    ];

    for (const s of [stream1, stream2]) {
      for (const pt of s) {
        for (let dz = -3; dz <= 3; dz++) {
          for (let dx = -3; dx <= 3; dx++) {
            const rx = pt.x + dx;
            const rz = pt.z + dz;
            if (rx >= 0 && rx < sizeX && rz >= 0 && rz < sizeZ) {
              const d = Math.hypot(dx, dz);
              if (d <= 3.0) {
                rawHeight[rz * sizeX + rx] = Math.min(rawHeight[rz * sizeX + rx], pt.y - 1);
              }
            }
          }
        }
      }
    }

    // 写入离散高度图
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        world.heightMap[z * sizeX + x] = Math.max(1, Math.min(sizeY - 2, Math.round(rawHeight[z * sizeX + x])));
      }
    }

    // 3. 体素分层填充与地质切片
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        const topH = world.heightMap[z * sizeX + x];

        // 坡度计算
        let slope = 0;
        if (x > 0 && x < sizeX - 1 && z > 0 && z < sizeZ - 1) {
          const hL = world.heightMap[z * sizeX + (x - 1)];
          const hR = world.heightMap[z * sizeX + (x + 1)];
          const hU = world.heightMap[(z - 1) * sizeX + x];
          const hD = world.heightMap[(z + 1) * sizeX + x];
          slope = Math.max(Math.abs(hL - topH), Math.abs(hR - topH), Math.abs(hU - topH), Math.abs(hD - topH));
        }

        for (let y = 0; y <= topH; y++) {
          if (y === 0) {
            world.setVoxel(x, y, z, VoxelType.BEDROCK);
            continue;
          }

          // 深层岩石
          if (y < topH - 4) {
            world.setVoxel(x, y, z, VoxelType.STONE);
            continue;
          }

          // 近地表分层
          if (topH >= 46) {
            // 雪山之巅
            if (y === topH) {
              world.setVoxel(x, y, z, slope > 2 ? VoxelType.LIGHT_STONE : VoxelType.SNOW);
            } else if (y >= topH - 2) {
              world.setVoxel(x, y, z, VoxelType.PACKED_ICE);
            } else {
              world.setVoxel(x, y, z, VoxelType.LIGHT_STONE);
            }
          } else if (topH >= 36) {
            // 高山花岗岩带与悬崖
            if (slope >= 2) {
              world.setVoxel(x, y, z, VoxelType.DARK_STONE);
            } else {
              world.setVoxel(x, y, z, y === topH ? VoxelType.LIGHT_STONE : VoxelType.STONE);
            }
          } else if (topH >= 22) {
            // 中海拔山腰阶地与草坡
            if (slope >= 2) {
              world.setVoxel(x, y, z, VoxelType.STONE);
            } else if (y === topH) {
              world.setVoxel(x, y, z, VoxelType.GRASS);
            } else {
              world.setVoxel(x, y, z, VoxelType.DIRT);
            }
          } else if (topH <= waterLevel + 1) {
            // 滨水沙滩与砾石带
            if (y === topH) {
              world.setVoxel(x, y, z, rng.next() > 0.4 ? VoxelType.SAND : VoxelType.GRAVEL);
            } else {
              world.setVoxel(x, y, z, VoxelType.DIRT);
            }
          } else {
            // 山麓草甸
            if (slope >= 2) {
              world.setVoxel(x, y, z, VoxelType.STONE);
            } else if (y === topH) {
              world.setVoxel(x, y, z, VoxelType.GRASS);
            } else {
              world.setVoxel(x, y, z, VoxelType.DIRT);
            }
          }
        }
      }
    }

    // 4. 水体系统构建：宽广湖泊、高山天池、气势磅礴的大瀑布
    // 4.1 山脚开阔平湖 (WaterLevel = 8)
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        const topH = world.heightMap[z * sizeX + x];
        if (topH < waterLevel) {
          world.waterMap[z * sizeX + x] = waterLevel;
          for (let y = topH + 1; y <= waterLevel; y++) {
            world.setVoxel(x, y, z, VoxelType.WATER_STILL);
          }
        }
      }
    }

    // 4.2 高山天池 (Y = tarnCenter.y)
    for (let dz = -7; dz <= 7; dz++) {
      for (let dx = -7; dx <= 7; dx++) {
        const tx = tarnCenter.x + dx;
        const tz = tarnCenter.z + dz;
        const d = Math.hypot(dx, dz);
        if (d <= 7) {
          const topH = world.heightMap[tz * sizeX + tx];
          if (topH < tarnCenter.y) {
            world.waterMap[tz * sizeX + tx] = Math.max(world.waterMap[tz * sizeX + tx], tarnCenter.y);
            for (let y = topH + 1; y <= tarnCenter.y; y++) {
              world.setVoxel(tx, y, tz, VoxelType.WATER_STILL);
            }
          }
        }
      }
    }

    // 4.3 中层汇水碧潭 (Y = midPool.y)
    for (let dz = -8; dz <= 8; dz++) {
      for (let dx = -8; dx <= 8; dx++) {
        const mx = midPool.x + dx;
        const mz = midPool.z + dz;
        const d = Math.hypot(dx, dz);
        if (d <= 8) {
          const topH = world.heightMap[mz * sizeX + mx];
          if (topH < midPool.y) {
            world.waterMap[mz * sizeX + mx] = Math.max(world.waterMap[mz * sizeX + mx], midPool.y);
            for (let y = topH + 1; y <= midPool.y; y++) {
              world.setVoxel(mx, y, mz, d > 6 ? VoxelType.MOSS_STONE : VoxelType.WATER_STILL);
            }
          }
        }
      }
    }

    // 4.4 悬崖主瀑布 (大幅加宽至 7 格体素，双层水幕，气势雄浑)
    const fallTopY = Math.floor(38 * heightScale);
    const fallBottomY = midPool.y;
    const fallZ = waterfallCliffZ + 2;

    for (let w = -3; w <= 3; w++) {
      const fx = midPool.x + w;
      for (let y = fallTopY; y >= fallBottomY; y--) {
        // 内层水幕
        world.setVoxel(fx, y, fallZ, VoxelType.WATER_FLOW);
        // 外层飘洒水帘
        if (y < fallTopY && y > fallBottomY + 1) {
          world.setVoxel(fx, y, fallZ + 1, (Math.abs(w) === 3) ? VoxelType.WATER_FOAM : VoxelType.WATER_FLOW);
        }

        world.waterfallPoints.push({
          x: fx,
          y: y,
          z: fallZ + 1,
          flowDirection: [0, -1, 0.25],
          isImpact: (y === fallBottomY)
        });
      }

      // 落水白沫冲击圈
      for (let fz = 0; fz <= 3; fz++) {
        world.setVoxel(fx, fallBottomY, fallZ + fz, VoxelType.WATER_FOAM);
      }
    }

    // 4.5 次级级联瀑布 (两道分流支脉)
    const buildStream = (pts: { x: number; z: number; y: number }[]) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const steps = Math.max(Math.abs(p2.x - p1.x), Math.abs(p2.z - p1.z), Math.abs(p2.y - p1.y)) * 2;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const cx = Math.round(p1.x + (p2.x - p1.x) * t);
          const cz = Math.round(p1.z + (p2.z - p1.z) * t);
          const cy = Math.round(p1.y + (p2.y - p1.y) * t);

          for (let w = -1; w <= 1; w++) {
            const wx = cx + w;
            world.setVoxel(wx, cy, cz, (w === 0) ? VoxelType.WATER_FLOW : VoxelType.WATER_FOAM);
            world.waterfallPoints.push({
              x: wx,
              y: cy,
              z: cz,
              flowDirection: [0.1, -0.7, 0.5],
              isImpact: (cy <= waterLevel + 1)
            });
          }
        }
      }
    };

    buildStream(stream1);
    buildStream(stream2);

    // 次瀑入湖泡沫
    world.setVoxel(stream1[3].x, waterLevel, stream1[3].z, VoxelType.WATER_FOAM);
    world.setVoxel(stream1[3].x - 1, waterLevel, stream1[3].z, VoxelType.WATER_FOAM);
    world.setVoxel(stream2[3].x, waterLevel, stream2[3].z, VoxelType.WATER_FOAM);
    world.setVoxel(stream2[3].x + 1, waterLevel, stream2[3].z, VoxelType.WATER_FOAM);

    // 5. 植被与森林点缀 (高山冷杉、白桦林、红枫、繁花、湖面睡莲)
    const placePineTree = (tx: number, ty: number, tz: number) => {
      const trunkH = 5 + Math.floor(rng.next() * 3);
      for (let y = ty + 1; y <= ty + trunkH; y++) {
        world.setVoxel(tx, y, tz, VoxelType.WOOD_TRUNK);
      }
      const base = ty + trunkH - 3;
      // 树冠层
      for (let dz = -2; dz <= 2; dz++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
          if (world.getVoxel(tx + dx, base, tz + dz) === VoxelType.AIR) {
            world.setVoxel(tx + dx, base, tz + dz, VoxelType.LEAVES_PINE);
          }
        }
      }
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (world.getVoxel(tx + dx, base + 1, tz + dz) === VoxelType.AIR) {
            world.setVoxel(tx + dx, base + 1, tz + dz, VoxelType.LEAVES_PINE);
          }
        }
      }
      const cross = [[0, 1], [0, -1], [1, 0], [-1, 0], [0, 0]];
      for (const [dx, dz] of cross) {
        if (world.getVoxel(tx + dx, base + 2, tz + dz) === VoxelType.AIR) {
          world.setVoxel(tx + dx, base + 2, tz + dz, VoxelType.LEAVES_PINE);
        }
      }
      world.setVoxel(tx, base + 3, tz, VoxelType.LEAVES_PINE);
    };

    const placeBroadleafTree = (tx: number, ty: number, tz: number) => {
      const trunkH = 4 + Math.floor(rng.next() * 2);
      for (let y = ty + 1; y <= ty + trunkH; y++) {
        world.setVoxel(tx, y, tz, VoxelType.WOOD_TRUNK);
      }
      const topY = ty + trunkH;
      const leafType = rng.next() > 0.8 ? VoxelType.LEAVES_AUTUMN : VoxelType.LEAVES_OAK;
      for (let dy = -1; dy <= 2; dy++) {
        const radius = dy === 2 ? 1 : 2;
        for (let dz = -radius; dz <= radius; dz++) {
          for (let dx = -radius; dx <= radius; dx++) {
            if (Math.hypot(dx, dy * 0.7, dz) <= radius + 0.35) {
              if (world.getVoxel(tx + dx, topY + dy, tz + dz) === VoxelType.AIR) {
                world.setVoxel(tx + dx, topY + dy, tz + dz, leafType);
              }
            }
          }
        }
      }
    };

    const spacing = 4;
    for (let z = 5; z < sizeZ - 5; z += spacing) {
      for (let x = 5; x < sizeX - 5; x += spacing) {
        const jx = x + Math.floor((rng.next() - 0.5) * 3);
        const jz = z + Math.floor((rng.next() - 0.5) * 3);
        const jy = world.heightMap[jz * sizeX + jx];

        if (world.getVoxel(jx, jy, jz) === VoxelType.GRASS) {
          if (rng.next() < treeDensity) {
            if (jy >= 20) placePineTree(jx, jy, jz);
            else if (jy >= waterLevel + 1) {
              if (rng.next() > 0.4) placeBroadleafTree(jx, jy, jz);
              else placePineTree(jx, jy, jz);
            }
          } else {
            // 野花点缀
            const fVal = rng.next();
            if (fVal < 0.28) {
              const flower = fVal < 0.1 ? VoxelType.FLOWER_RED : (fVal < 0.2 ? VoxelType.FLOWER_YELLOW : VoxelType.FLOWER_BLUE);
              world.setVoxel(jx, jy + 1, jz, flower);
            }
          }
        } else if (world.getVoxel(jx, waterLevel, jz) === VoxelType.WATER_STILL && rng.next() < 0.05) {
          world.setVoxel(jx, waterLevel + 1, jz, VoxelType.LILYPAD);
        }
      }
    }

    return world;
  }
}
