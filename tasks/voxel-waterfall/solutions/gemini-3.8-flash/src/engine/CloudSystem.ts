// 3D 体素穿云系统 (增强版)：立体积云团、山腰环绕、山峰穿透、高低层次遮挡

import * as THREE from 'three';
import { SimplexNoise } from './Noise';

export interface CloudConfig {
  baseY: number;        // 云层基准高度 (默认 ~34)
  thickness: number;    // 云层厚度 (默认 5)
  density: number;      // 密度阈值 (0.3 - 0.7)
  speed: number;        // 飘移速度
  opacity: number;      // 半透明度
  worldSizeX: number;
  worldSizeZ: number;
}

export class CloudSystem {
  public group: THREE.Group;
  private cloudMesh: THREE.Mesh | null = null;
  private noise: SimplexNoise;
  private config: CloudConfig;
  private driftOffset: number = 0;

  constructor(noise: SimplexNoise, config: CloudConfig) {
    this.noise = noise;
    this.config = config;
    this.group = new THREE.Group();
    this.rebuild();
  }

  public setConfig(newConfig: Partial<CloudConfig>) {
    let needRebuild = false;
    if (newConfig.baseY !== undefined && newConfig.baseY !== this.config.baseY) {
      this.config.baseY = newConfig.baseY;
      needRebuild = true;
    }
    if (newConfig.thickness !== undefined && newConfig.thickness !== this.config.thickness) {
      this.config.thickness = newConfig.thickness;
      needRebuild = true;
    }
    if (newConfig.density !== undefined && newConfig.density !== this.config.density) {
      this.config.density = newConfig.density;
      needRebuild = true;
    }
    if (newConfig.opacity !== undefined) {
      this.config.opacity = newConfig.opacity;
      if (this.cloudMesh) {
        (this.cloudMesh.material as THREE.MeshStandardMaterial).opacity = this.config.opacity;
      }
    }
    if (newConfig.speed !== undefined) {
      this.config.speed = newConfig.speed;
    }
    if (needRebuild) {
      this.rebuild();
    }
  }

  public rebuild() {
    if (this.cloudMesh) {
      this.group.remove(this.cloudMesh);
      this.cloudMesh.geometry.dispose();
      (this.cloudMesh.material as THREE.Material).dispose();
      this.cloudMesh = null;
    }

    const { baseY, thickness, density, worldSizeX, worldSizeZ } = this.config;

    // 云层覆盖范围比世界宽大，呈现远近无垠的云海氛围
    const cloudSpanX = Math.floor(worldSizeX * 1.35);
    const cloudSpanZ = Math.floor(worldSizeZ * 1.35);
    const startX = -Math.floor(worldSizeX * 0.18);
    const startZ = -Math.floor(worldSizeZ * 0.18);

    const step = 2; // 体素步长
    const gridW = Math.floor(cloudSpanX / step);
    const gridD = Math.floor(cloudSpanZ / step);
    const gridH = Math.max(3, thickness);

    const cloudGrid = new Uint8Array(gridW * gridD * gridH);
    const getGridIdx = (gx: number, gy: number, gz: number) => gy * (gridW * gridD) + gz * gridW + gx;

    for (let gz = 0; gz < gridD; gz++) {
      for (let gx = 0; gx < gridW; gx++) {
        const worldX = startX + gx * step;
        const worldZ = startZ + gz * step;

        // 复合低频与高频噪声生成丰盈连绵的积云团块
        const n1 = this.noise.noise2D(worldX * 0.012, worldZ * 0.012);
        const n2 = this.noise.noise2D(worldX * 0.035, worldZ * 0.035) * 0.45;
        const n3 = this.noise.noise2D(worldX * 0.08, worldZ * 0.08) * 0.15;
        const nVal = (n1 + n2 + n3 + 1.6) / 2.8;

        const threshold = 1.0 - density;
        if (nVal > threshold) {
          const depthRatio = Math.min(1.0, (nVal - threshold) / (density * 0.9));
          const maxThick = Math.min(gridH, Math.max(1, Math.round(depthRatio * gridH)));

          // 呈现上下略薄、中间隆起的饱满立体云块
          for (let gy = 0; gy < maxThick; gy++) {
            cloudGrid[getGridIdx(gx, gy, gz)] = 1;
          }
        }
      }
    }

    const maxCloudQuads = 50000;
    const positions = new Float32Array(maxCloudQuads * 4 * 3);
    const normals = new Float32Array(maxCloudQuads * 4 * 3);
    const colors = new Float32Array(maxCloudQuads * 4 * 3);
    const indices = new Uint32Array(maxCloudQuads * 6);

    let vCount = 0;
    let iCount = 0;

    const FACES = [
      { dir: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]], shade: 1.0, tint: [1.0, 1.0, 1.0] },
      { dir: [0, -1, 0], corners: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], shade: 0.72, tint: [0.85, 0.88, 0.95] }, // 底部背光微泛天青
      { dir: [0, 0, 1], corners: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], shade: 0.90, tint: [0.96, 0.97, 1.0] },
      { dir: [0, 0, -1], corners: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]], shade: 0.82, tint: [0.92, 0.93, 0.98] },
      { dir: [1, 0, 0], corners: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]], shade: 0.94, tint: [0.98, 0.98, 1.0] },
      { dir: [-1, 0, 0], corners: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]], shade: 0.86, tint: [0.94, 0.95, 0.99] },
    ];

    for (let gz = 0; gz < gridD; gz++) {
      for (let gx = 0; gx < gridW; gx++) {
        for (let gy = 0; gy < gridH; gy++) {
          if (cloudGrid[getGridIdx(gx, gy, gz)] === 0) continue;

          const bx = startX + gx * step;
          const by = baseY + gy;
          const bz = startZ + gz * step;

          for (let f = 0; f < 6; f++) {
            const face = FACES[f];
            const ngx = gx + face.dir[0];
            const ngy = gy + face.dir[1];
            const ngz = gz + face.dir[2];

            let hasNeighbor = false;
            if (ngx >= 0 && ngx < gridW && ngy >= 0 && ngy < gridH && ngz >= 0 && ngz < gridD) {
              hasNeighbor = (cloudGrid[getGridIdx(ngx, ngy, ngz)] === 1);
            }

            if (!hasNeighbor) {
              if (vCount + 4 > positions.length / 3) break;

              const baseV = vCount;
              const shade = face.shade;
              const tint = face.tint;

              for (let c = 0; c < 4; c++) {
                const corner = face.corners[c];
                const pIdx = (vCount + c) * 3;

                positions[pIdx + 0] = bx + corner[0] * step;
                positions[pIdx + 1] = by + corner[1];
                positions[pIdx + 2] = bz + corner[2] * step;

                normals[pIdx + 0] = face.dir[0];
                normals[pIdx + 1] = face.dir[1];
                normals[pIdx + 2] = face.dir[2];

                colors[pIdx + 0] = tint[0] * shade;
                colors[pIdx + 1] = tint[1] * shade;
                colors[pIdx + 2] = tint[2] * shade;
              }

              indices[iCount++] = baseV + 0;
              indices[iCount++] = baseV + 1;
              indices[iCount++] = baseV + 2;

              indices[iCount++] = baseV + 0;
              indices[iCount++] = baseV + 2;
              indices[iCount++] = baseV + 3;

              vCount += 4;
            }
          }
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.subarray(0, vCount * 3), 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(normals.subarray(0, vCount * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors.subarray(0, vCount * 3), 3));
    geo.setIndex(new THREE.BufferAttribute(indices.subarray(0, iCount), 1));

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      transparent: true,
      opacity: this.config.opacity,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    this.cloudMesh = new THREE.Mesh(geo, mat);
    this.cloudMesh.receiveShadow = false;
    this.cloudMesh.castShadow = true;
    this.group.add(this.cloudMesh);
  }

  public update(delta: number) {
    if (this.cloudMesh && this.config.speed > 0) {
      this.driftOffset += this.config.speed * delta * 1.8;
      // 缓和对角漂移
      this.cloudMesh.position.x = (this.driftOffset * 0.8) % 50;
      this.cloudMesh.position.z = (this.driftOffset * 0.45) % 50;
    }
  }

  public dispose() {
    if (this.cloudMesh) {
      this.cloudMesh.geometry.dispose();
      (this.cloudMesh.material as THREE.Material).dispose();
    }
  }
}
