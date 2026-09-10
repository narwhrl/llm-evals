import { FastNoise } from '../utils/perlin';
import { VoxelType, SceneConfig } from '../utils/types';

export interface WaterfallPoint {
  x: number;
  y: number;
  z: number;
  type: 'source' | 'flow' | 'drop' | 'pool' | 'splash';
  width: number;
}

export interface TreeData {
  x: number;
  y: number;
  z: number;
  type: 'pine' | 'oak' | 'sakura' | 'birch';
  height: number;
}

export interface TerrainData {
  gridSize: number;
  height: number;
  voxels: Uint8Array;
  heightMap: Int16Array;
  waterfallPoints: WaterfallPoint[];
  trees: TreeData[];
  waterLevel: number;
  mainPeakPos: { x: number; y: number; z: number };
}

export class TerrainGenerator {
  private noise: FastNoise;
  private detailNoise: FastNoise;
  private biomeNoise: FastNoise;

  constructor(seed = 1337) {
    this.noise = new FastNoise(seed);
    this.detailNoise = new FastNoise(seed + 999);
    this.biomeNoise = new FastNoise(seed + 54321);
  }

  public setSeed(seed: number) {
    this.noise.reseed(seed);
    this.detailNoise.reseed(seed + 999);
    this.biomeNoise.reseed(seed + 54321);
  }

  public generate(config: SceneConfig): TerrainData {
    const N = config.gridSize;
    const H = config.terrainHeight;
    const waterLevel = config.waterLevel;
    const voxels = new Uint8Array(N * H * N);
    const heightMap = new Int16Array(N * N);
    const waterfallPoints: WaterfallPoint[] = [];
    const trees: TreeData[] = [];

    const getIdx = (x: number, y: number, z: number) => (y * N * N) + (z * N) + x;
    const inBounds = (x: number, y: number, z: number) => x >= 0 && x < N && y >= 0 && y < H && z >= 0 && z < N;
    const setVoxel = (x: number, y: number, z: number, v: VoxelType) => {
      if (inBounds(x, y, z)) voxels[getIdx(x, y, z)] = v;
    };
    const getVoxel = (x: number, y: number, z: number) => {
      if (!inBounds(x, y, z)) return VoxelType.AIR;
      return voxels[getIdx(x, y, z)];
    };

    // 1. Peak Centers (Orographic uplift points)
    // Primary main peak (majestic summit piercing the cloud deck at y=74)
    const mainPeakX = Math.floor(N * 0.38);
    const mainPeakZ = Math.floor(N * 0.40);
    const mainPeakMaxH = Math.min(H - 4, 74);

    // Secondary Peaks (Surrounding sub-ridges)
    const secPeaks = [
      { x: Math.floor(N * 0.68), z: Math.floor(N * 0.30), h: 60, r: N * 0.35 },
      { x: Math.floor(N * 0.24), z: Math.floor(N * 0.68), h: 54, r: N * 0.32 },
      { x: Math.floor(N * 0.76), z: Math.floor(N * 0.72), h: 48, r: N * 0.38 },
      { x: Math.floor(N * 0.46), z: Math.floor(N * 0.85), h: 42, r: N * 0.28 },
    ];

    // Lake Basin Center (Lowest gravitational accumulation sink)
    const lakeX = Math.floor(N * 0.63);
    const lakeZ = Math.floor(N * 0.65);
    const lakeRadius = Math.floor(N * 0.36);

    // 2. Geomorphological Heightmap: FBM + Ridged Multi-fractal
    for (let z = 0; z < N; z++) {
      for (let x = 0; x < N; x++) {
        const nx = x / N;
        const nz = z / N;

        // Base tectonic terrain noise
        const baseNoise = this.noise.fbm2D(nx * 2.2, nz * 2.2, 4, 2.0, 0.5);
        // Sharp mountain crags and arêtes from ridged noise
        const ridgeNoise = this.noise.ridgedFBM2D(nx * 3.0 + 1.2, nz * 3.0 + 1.2, 5, 2.1, 0.55);
        // High-frequency weathering erosion micro-noise
        const microNoise = this.detailNoise.noise2D(nx * 8.0, nz * 8.0) * 0.08;

        // Distance to main peak
        const dMain = Math.hypot(x - mainPeakX, z - mainPeakZ) / (N * 0.45);
        const mainPeakMask = Math.max(0, 1.0 - Math.pow(Math.min(1.0, dMain), 1.5));

        // Secondary peak influences
        let secPeakMask = 0;
        for (const sp of secPeaks) {
          const d = Math.hypot(x - sp.x, z - sp.z) / sp.r;
          const mask = Math.max(0, 1.0 - Math.pow(Math.min(1.0, d), 1.6));
          secPeakMask = Math.max(secPeakMask, mask * (sp.h / mainPeakMaxH));
        }

        // Distance to lake basin with organic fractal shoreline
        const dLakeRaw = Math.hypot(x - lakeX, z - lakeZ) / lakeRadius;
        const shoreNoise = this.detailNoise.noise2D(nx * 5.5, nz * 5.5) * 0.12;
        const dLake = dLakeRaw + shoreNoise;
        const lakeDepression = Math.max(0, 1.0 - Math.min(1.0, dLake));

        // Combined mountain elevation curve
        let elevation = (baseNoise * 0.25 + ridgeNoise * 0.75 + microNoise);
        const peakFactor = Math.max(mainPeakMask, secPeakMask * 0.85);
        elevation = (elevation * 0.35 + 0.65) * peakFactor;

        // Foothill base elevation
        const foothill = Math.max(0, 0.16 + baseNoise * 0.12 - lakeDepression * 0.38);
        let finalElev = Math.max(foothill, elevation);

        // Valley & Lake carving: smoothly depress the lake basin
        if (lakeDepression > 0) {
          finalElev = finalElev * (1.0 - Math.pow(lakeDepression, 1.2) * 0.92);
        }

        // Map elevation to integer voxel height (clamped)
        let hVal = Math.floor(waterLevel + (finalElev * (mainPeakMaxH - waterLevel + 6)));
        if (dLake < 0.82) {
          // Lake basin floor carving: smoothly dip below waterLevel into a deep clear lake bed
          const depthFactor = Math.sin((1.0 - (dLake / 0.82)) * (Math.PI / 2));
          const bedDepth = Math.floor(depthFactor * 8) + 1;
          hVal = Math.max(4, Math.min(hVal, waterLevel - bedDepth));
        }

        hVal = Math.max(3, Math.min(H - 2, hVal));
        heightMap[z * N + x] = hVal;
      }
    }

    // 3. Hydraulic Gorge & Plunge Pool Carving (Hydrological erosion)
    // High mountain spring pond (cirque tarn) at y ≈ 58
    const springX = mainPeakX + 6;
    const springZ = mainPeakZ + 5;
    const springH = 58;

    for (let dz = -5; dz <= 5; dz++) {
      for (let dx = -5; dx <= 5; dx++) {
        const sx = springX + dx;
        const sz = springZ + dz;
        const dist = Math.hypot(dx, dz);
        if (dist <= 4.8 && inBounds(sx, 0, sz)) {
          const bedDepth = dist <= 2.2 ? 3 : (dist <= 3.8 ? 2 : 1);
          heightMap[sz * N + sx] = Math.min(heightMap[sz * N + sx], springH - bedDepth);
        }
      }
    }
    waterfallPoints.push({ x: springX, y: springH, z: springZ, type: 'source', width: 4 });

    // Mid-Mountain Cascade Plunge Pool at y ≈ 38
    const midPoolX = Math.floor(springX + (lakeX - springX) * 0.42);
    const midPoolZ = Math.floor(springZ + (lakeZ - springZ) * 0.42);
    const midPoolH = 38;

    for (let dz = -6; dz <= 6; dz++) {
      for (let dx = -6; dx <= 6; dx++) {
        const mx = midPoolX + dx;
        const mz = midPoolZ + dz;
        const dist = Math.hypot(dx, dz);
        if (dist <= 5.2 && inBounds(mx, 0, mz)) {
          const bedDepth = dist <= 2.5 ? 3 : (dist <= 4.2 ? 2 : 1);
          heightMap[mz * N + mx] = Math.min(heightMap[mz * N + mx], midPoolH - bedDepth);
        }
      }
    }
    waterfallPoints.push({ x: midPoolX, y: midPoolH, z: midPoolZ, type: 'pool', width: 5 });

    // Lake Inlet Plunge Point (Where the roaring waterfall plunges directly into the lake)
    const lakeInletX = Math.floor(midPoolX + (lakeX - midPoolX) * 0.68);
    const lakeInletZ = Math.floor(midPoolZ + (lakeZ - midPoolZ) * 0.68);

    // Deep hydraulic plunge pool depression at the lake entrance where waterfall lands
    for (let dz = -6; dz <= 6; dz++) {
      for (let dx = -6; dx <= 6; dx++) {
        const ix = lakeInletX + dx;
        const iz = lakeInletZ + dz;
        const dist = Math.hypot(dx, dz);
        if (dist <= 5.5 && inBounds(ix, 0, iz)) {
          const depth = dist <= 2.8 ? 6 : (dist <= 4.5 ? 4 : 2);
          heightMap[iz * N + ix] = Math.min(heightMap[iz * N + ix], waterLevel - depth);
        }
      }
    }

    // Carve V-shaped river gorges along the stream trajectory
    const carveGorge = (x1: number, z1: number, y1: number, x2: number, z2: number, y2: number, width: number) => {
      const steps = Math.max(1, Math.floor(Math.hypot(x2 - x1, z2 - z1) * 1.5));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const gx = Math.round(x1 + (x2 - x1) * t);
        const gz = Math.round(z1 + (z2 - z1) * t);
        const gy = Math.round(y1 + (y2 - y1) * t);

        for (let dz = -width; dz <= width; dz++) {
          for (let dx = -width; dx <= width; dx++) {
            const cx = gx + dx;
            const cz = gz + dz;
            const d = Math.hypot(dx, dz);
            if (d <= width + 0.5 && inBounds(cx, 0, cz)) {
              const targetFloor = gy - (d <= 1.2 ? 2 : 1);
              if (heightMap[cz * N + cx] > targetFloor) {
                heightMap[cz * N + cx] = Math.max(waterLevel - 1, targetFloor);
              }
            }
          }
        }
      }
    };

    // Upper gorge (High Tarn to Mid-Mountain Pool)
    carveGorge(springX, springZ, springH, midPoolX, midPoolZ, midPoolH, 3);
    // Lower cliff plunge gorge (Mid Pool to Lake Inlet)
    carveGorge(midPoolX, midPoolZ, midPoolH, lakeInletX, lakeInletZ, waterLevel - 1, 4);
    // Estuary delta (Lake Inlet expanding smoothly into the open Lake Basin)
    carveGorge(lakeInletX, lakeInletZ, waterLevel - 2, lakeX, lakeZ, waterLevel - 4, 6);

    // 4. Fill 3D Solid Voxel Grid with Geological Stratification & Ecological Zonation
    for (let z = 0; z < N; z++) {
      for (let x = 0; x < N; x++) {
        const surfaceH = heightMap[z * N + x];

        // Bedrock (Lithosphere basement)
        setVoxel(x, 0, z, VoxelType.STONE_DARK);

        for (let y = 1; y <= surfaceH; y++) {
          const depth = surfaceH - y;

          // Slope calculation: angle of repose check
          const hL = inBounds(x - 1, 0, z) ? heightMap[z * N + (x - 1)] : surfaceH;
          const hR = inBounds(x + 1, 0, z) ? heightMap[z * N + (x + 1)] : surfaceH;
          const hU = inBounds(x, 0, z - 1) ? heightMap[(z - 1) * N + x] : surfaceH;
          const hD = inBounds(x, 0, z + 1) ? heightMap[(z + 1) * N + x] : surfaceH;
          const slope = Math.max(Math.abs(hR - hL), Math.abs(hD - hU));

          // Distance to waterfall channel for humidity microclimate
          const distToSpring = Math.hypot(x - springX, z - springZ);
          const distToMid = Math.hypot(x - midPoolX, z - midPoolZ);
          const distToLakeInlet = Math.hypot(x - lakeInletX, z - lakeInletZ);
          const isSprayZone = distToSpring < 8 || distToMid < 8 || distToLakeInlet < 8;

          if (depth === 0) {
            // Surface Soil & Rock Layer
            if (y < waterLevel - 1) {
              // Submerged lacustrine sediment
              setVoxel(x, y, z, (x + z) % 3 === 0 ? VoxelType.GRAVEL : VoxelType.SAND);
            } else if (y <= waterLevel + 1) {
              // Riparian littoral zone / beach
              setVoxel(x, y, z, slope > 2 ? VoxelType.GRAVEL : VoxelType.SAND);
            } else if (y >= 54) {
              // Glacial & Alpine Nival Zone (Permanent Snow & Ice)
              if (y >= 64 || (y >= 56 && slope < 3)) {
                setVoxel(x, y, z, VoxelType.SNOW);
              } else {
                setVoxel(x, y, z, (x + y + z) % 4 === 0 ? VoxelType.ICE : VoxelType.STONE);
              }
            } else if (y >= 38) {
              // Subalpine Crags & Scree slopes
              if (slope >= 3) {
                // Steeper than angle of repose: bare stone
                setVoxel(x, y, z, (x + y) % 2 === 0 ? VoxelType.STONE_DARK : VoxelType.STONE);
              } else if (isSprayZone) {
                // High moisture spray zone: mossy stone
                setVoxel(x, y, z, VoxelType.STONE_MOSS);
              } else if (y < 46 && (x * 7 + z * 13) % 11 > 4) {
                // Alpine tundra grass
                setVoxel(x, y, z, VoxelType.GRASS_DARK);
              } else {
                setVoxel(x, y, z, VoxelType.STONE);
              }
            } else {
              // Montane Valley Zone (Vegetated soils & alluvium)
              if (slope >= 3) {
                // Eroded rock wall
                setVoxel(x, y, z, (x + z) % 4 === 0 ? VoxelType.STONE_MOSS : VoxelType.STONE);
              } else if (isSprayZone) {
                setVoxel(x, y, z, VoxelType.STONE_MOSS);
              } else {
                // Rich grassland soil
                setVoxel(x, y, z, (x * 3 + z * 5) % 7 === 0 ? VoxelType.GRASS_DARK : VoxelType.GRASS);
              }
            }
          } else if (depth <= 3) {
            // Sub-surface weathered regolith
            if (surfaceH >= 54) {
              setVoxel(x, y, z, VoxelType.STONE);
            } else if (surfaceH <= waterLevel + 1) {
              setVoxel(x, y, z, VoxelType.SAND);
            } else if (slope >= 3) {
              setVoxel(x, y, z, VoxelType.STONE);
            } else {
              setVoxel(x, y, z, VoxelType.DIRT);
            }
          } else {
            // Deep bedrock strata
            setVoxel(x, y, z, (x + y + z) % 6 === 0 ? VoxelType.STONE_DARK : VoxelType.STONE);
          }
        }

        // Fill Main Lake Basin
        if (surfaceH < waterLevel) {
          for (let wy = surfaceH + 1; wy <= waterLevel; wy++) {
            setVoxel(x, wy, z, VoxelType.WATER);
          }
        }
      }
    }

    // 5. Fill Cirque Tarn & Cascade Pools with Water
    // High Mountain Tarn (y up to springH)
    for (let dz = -5; dz <= 5; dz++) {
      for (let dx = -5; dx <= 5; dx++) {
        const sx = springX + dx;
        const sz = springZ + dz;
        const dist = Math.hypot(dx, dz);
        if (dist <= 4.2 && inBounds(sx, 0, sz)) {
          const bedH = heightMap[sz * N + sx];
          for (let wy = bedH + 1; wy <= springH; wy++) {
            setVoxel(sx, wy, sz, VoxelType.WATER);
          }
        }
      }
    }

    // Mid-Mountain Pool (y up to midPoolH)
    for (let dz = -6; dz <= 6; dz++) {
      for (let dx = -6; dx <= 6; dx++) {
        const mx = midPoolX + dx;
        const mz = midPoolZ + dz;
        const dist = Math.hypot(dx, dz);
        if (dist <= 4.8 && inBounds(mx, 0, mz)) {
          const bedH = heightMap[mz * N + mx];
          for (let wy = bedH + 1; wy <= midPoolH; wy++) {
            setVoxel(mx, wy, mz, VoxelType.WATER);
          }
        }
      }
    }

    // 6. Volumetric 3D Waterfall Continuous Columns (Free fall and cascade)
    const buildWaterfallStream = (
      startX: number, startZ: number, startY: number,
      endX: number, endZ: number, endY: number,
      width: number
    ) => {
      const steps = Math.max(1, Math.floor(Math.hypot(endX - startX, endZ - startZ) * 1.8));
      let prevY = startY;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const cx = Math.round(startX + (endX - startX) * t);
        const cz = Math.round(startZ + (endZ - startZ) * t);
        const currentWaterY = Math.round(startY + (endY - startY) * t);

        if (s === 0 || s === steps || s % 6 === 0) {
          waterfallPoints.push({
            x: cx,
            y: currentWaterY,
            z: cz,
            type: currentWaterY <= waterLevel + 2 ? 'splash' : (s === steps ? 'splash' : 'drop'),
            width: width,
          });
        }

        for (let dz = -width; dz <= width; dz++) {
          for (let dx = -width; dx <= width; dx++) {
            const wx = cx + dx;
            const wz = cz + dz;
            const d = Math.hypot(dx, dz);
            if (d <= width + 0.3 && inBounds(wx, 0, wz)) {
              const bedH = heightMap[wz * N + wx];
              const topY = Math.max(currentWaterY, prevY);
              const bottomY = Math.max(bedH + 1, currentWaterY - 1);

              for (let wy = bottomY; wy <= topY; wy++) {
                if (inBounds(wx, wy, wz)) {
                  setVoxel(wx, wy, wz, VoxelType.WATER_FALL);
                }
              }
            }
          }
        }
        prevY = currentWaterY;
      }
    };

    // Upper Grand Fall (From High Tarn to Mid-Mountain Pool)
    buildWaterfallStream(springX, springZ, springH, midPoolX, midPoolZ, midPoolH, 3);
    // Lower Roaring Fall (From Mid-Mountain Pool Cliff directly plunging into the Lake)
    buildWaterfallStream(midPoolX, midPoolZ, midPoolH, lakeInletX, lakeInletZ, waterLevel, 4);
    
    // Secondary Eastern Ridge Fall (Pouring into Northeast Bay of the Lake)
    const secBranchX = Math.floor(N * 0.70);
    const secBranchZ = Math.floor(N * 0.36);
    const secBranchH = 48;
    const secMergeX = Math.floor(lakeX + 6);
    const secMergeZ = Math.floor(lakeZ - 10);
    carveGorge(secBranchX, secBranchZ, secBranchH, secMergeX, secMergeZ, waterLevel - 1, 3);
    buildWaterfallStream(secBranchX, secBranchZ, secBranchH, secMergeX, secMergeZ, waterLevel, 2);

    // Register primary splash & wave points
    waterfallPoints.push({ x: lakeInletX, y: waterLevel, z: lakeInletZ, type: 'splash', width: 5 });
    waterfallPoints.push({ x: secMergeX, y: waterLevel, z: secMergeZ, type: 'splash', width: 3 });

    // 7. Botanical Altitudinal Zonation (Trees & Flora)
    const treeDensity = config.treeDensity ?? 0.85;
    for (let z = 6; z < N - 6; z += 3) {
      for (let x = 6; x < N - 6; x += 3) {
        const jx = x + ((x * 17 + z * 31) % 3) - 1;
        const jz = z + ((x * 23 + z * 13) % 3) - 1;
        if (!inBounds(jx, 0, jz)) continue;

        const surfaceH = heightMap[jz * N + jx];
        const topVoxel = getVoxel(jx, surfaceH, jz);
        const aboveVoxel = getVoxel(jx, surfaceH + 1, jz);

        if (aboveVoxel === VoxelType.WATER || aboveVoxel === VoxelType.WATER_FALL) continue;
        const isGrass = topVoxel === VoxelType.GRASS || topVoxel === VoxelType.GRASS_DARK;
        // Tree line cutoff at y=50 (above which only alpine tundra exists)
        if (!isGrass || surfaceH <= waterLevel + 1 || surfaceH >= 50) continue;

        // Trees cannot root on sheer cliffs (slope check)
        const hL = heightMap[jz * N + (jx - 1)];
        const hR = heightMap[jz * N + (jx + 1)];
        const hU = heightMap[(jz - 1) * N + jx];
        const hD = heightMap[(jz + 1) * N + jx];
        if (Math.max(Math.abs(hR - hL), Math.abs(hD - hU)) > 1) continue;

        const treeChance = ((jx * 73 + jz * 137 + config.seed) % 100) / 100;
        if (treeChance < 0.28 * treeDensity) {
          let treeType: 'pine' | 'oak' | 'sakura' | 'birch' = 'oak';
          if (surfaceH >= 32) {
            // High altitude / subalpine: Cold-resistant conifers
            treeType = 'pine';
          } else if (Math.hypot(jx - springX, jz - springZ) < 32 || Math.hypot(jx - lakeX, jz - lakeZ) < 28) {
            // Riparian zone: Flowering sakura or deciduous oak
            treeType = (jx + jz) % 3 === 0 ? 'sakura' : 'oak';
          } else if ((jx + jz) % 5 === 0) {
            treeType = 'birch';
          }

          const treeHeight = treeType === 'pine' ? 6 + ((jx + jz) % 3) : 4 + ((jx + jz) % 2);
          trees.push({ x: jx, y: surfaceH + 1, z: jz, type: treeType, height: treeHeight });
          this.buildVoxelTree(voxels, N, H, jx, surfaceH + 1, jz, treeType, treeHeight);
        } else if (treeChance < 0.65) {
          const flowerType = ((jx * 13 + jz * 47) % 3 === 0)
            ? VoxelType.FLOWER_RED
            : ((jx * 29 + jz * 19) % 3 === 0 ? VoxelType.FLOWER_YELLOW : VoxelType.FLOWER_BLUE);
          setVoxel(jx, surfaceH + 1, jz, flowerType);
        }
      }
    }

    // 8. Lakeside Wooden Pier & Glowing Post Lanterns
    const pierStartX = Math.floor(lakeX - 16);
    const pierStartZ = Math.floor(lakeZ + 4);
    const pierLength = 10;
    const pierWidth = 3;
    const pierY = waterLevel + 1;

    for (let px = 0; px < pierLength; px++) {
      for (let pz = 0; pz < pierWidth; pz++) {
        const wx = pierStartX + px;
        const wz = pierStartZ + pz;
        if (!inBounds(wx, pierY, wz)) continue;

        setVoxel(wx, pierY, wz, VoxelType.WOOD_PLANK);
        // Underwater wooden support stilts
        if (px === 0 || px === 4 || px === pierLength - 1) {
          const bedH = heightMap[wz * N + wx];
          for (let py = pierY - 1; py >= Math.max(1, bedH); py--) {
            setVoxel(wx, py, wz, VoxelType.WOOD_TRUNK);
          }
        }
      }
    }
    const endX = pierStartX + pierLength - 1;
    setVoxel(endX, pierY + 1, pierStartZ, VoxelType.WOOD_TRUNK);
    setVoxel(endX, pierY + 2, pierStartZ, VoxelType.LANTERN);
    setVoxel(endX, pierY + 1, pierStartZ + pierWidth - 1, VoxelType.WOOD_TRUNK);
    setVoxel(endX, pierY + 2, pierStartZ + pierWidth - 1, VoxelType.LANTERN);

    return {
      gridSize: N,
      height: H,
      voxels,
      heightMap,
      waterfallPoints,
      trees,
      waterLevel,
      mainPeakPos: { x: mainPeakX, y: mainPeakMaxH, z: mainPeakZ },
    };
  }

  private buildVoxelTree(
    voxels: Uint8Array,
    N: number,
    H: number,
    x: number,
    y: number,
    z: number,
    type: 'pine' | 'oak' | 'sakura' | 'birch',
    treeHeight: number
  ) {
    const getIdx = (vx: number, vy: number, vz: number) => (vy * N * N) + (vz * N) + vx;
    const inBounds = (vx: number, vy: number, vz: number) => vx >= 0 && vx < N && vy >= 0 && vy < H && vz >= 0 && vz < N;
    const set = (vx: number, vy: number, vz: number, v: VoxelType) => {
      if (inBounds(vx, vy, vz)) voxels[getIdx(vx, vy, vz)] = v;
    };

    const trunkType = type === 'birch' ? VoxelType.WOOD_BIRCH : VoxelType.WOOD_TRUNK;
    const leafType = type === 'pine' ? VoxelType.LEAVES_PINE : (type === 'sakura' ? VoxelType.LEAVES_SAKURA : VoxelType.LEAVES_OAK);

    // 1. Trunk
    for (let ty = 0; ty < treeHeight; ty++) {
      set(x, y + ty, z, trunkType);
    }

    // 2. Canopy
    if (type === 'pine') {
      const topY = y + treeHeight;
      set(x, topY + 1, z, leafType);
      set(x, topY, z, leafType);

      const layers = [
        { dy: 0, r: 1 },
        { dy: -1, r: 2 },
        { dy: -2, r: 1 },
        { dy: -3, r: 3 },
        { dy: -4, r: 2 },
      ];

      for (const l of layers) {
        const ly = topY + l.dy;
        for (let dz = -l.r; dz <= l.r; dz++) {
          for (let dx = -l.r; dx <= l.r; dx++) {
            if (Math.abs(dx) + Math.abs(dz) <= l.r + 0.5) {
              if (dx !== 0 || dz !== 0) set(x + dx, ly, z + dz, leafType);
            }
          }
        }
      }
    } else {
      const canopyCenterY = y + treeHeight;
      const radius = type === 'sakura' ? 3 : 2;

      for (let dy = -1; dy <= 2; dy++) {
        const r = dy === 2 ? radius - 1 : radius;
        for (let dz = -r; dz <= r; dz++) {
          for (let dx = -r; dx <= r; dx++) {
            const dist = Math.hypot(dx, dy * 0.8, dz);
            if (dist <= radius + 0.4) {
              if (dx !== 0 || dz !== 0 || dy >= 0) {
                set(x + dx, canopyCenterY + dy, z + dz, leafType);
              }
            }
          }
        }
      }
    }
  }
}
