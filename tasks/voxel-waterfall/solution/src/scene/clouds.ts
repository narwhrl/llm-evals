/** 方块云层：粗网格噪声 → 行程合并为实例化薄板，逐实例回绕实现无限漂移。 */
import * as THREE from 'three';
import { Noise2D, hashSeed } from './noise';

const CELL = 8; // 云格边长（世界单位）
const HALF_CELLS = 44; // 单侧云格数 → 覆盖 704×704
const WRAP = CELL * HALF_CELLS * 2;

export interface CloudSystem {
  mesh: THREE.InstancedMesh;
  material: THREE.MeshLambertMaterial;
  rebuild: (density: number) => void;
  update: (dt: number, speed: number, cloudY: number) => void;
  dispose: () => void;
  count: () => number;
}

interface Slab {
  x: number;
  z: number;
  len: number;
}

/** 生成云层实例系统（初始不可见，rebuild 后生效）。 */
export function buildClouds(): CloudSystem {
  const noise = new Noise2D(hashSeed('cloud-deck-fixed'));
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.52,
    depthWrite: true,
  });
  const MAX = 1400;
  const mesh = new THREE.InstancedMesh(geo, material, MAX);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false; // 云层整体始终参与（回绕矩阵动态变化）
  mesh.renderOrder = 5;

  let slabs: Slab[] = [];
  let offset = 0;
  let curY = 26;
  const m4 = new THREE.Matrix4();

  const rebuild = (density: number) => {
    slabs = [];
    const coverage = 0.06 + 0.6 * density;
    const n = HALF_CELLS * 2;
    for (let cz = 0; cz < n; cz++) {
      let runStart = -1;
      for (let cx = 0; cx <= n; cx++) {
        const v01 = 0.5 + 0.5 * noise.fbm(cx * 0.13, cz * 0.11, 3);
        const filled = cx < n && v01 > 1 - coverage;
        if (filled && runStart < 0) runStart = cx;
        if (!filled && runStart >= 0) {
          const len = cx - runStart;
          if (len >= 2) {
            slabs.push({
              x: (runStart + len / 2 - HALF_CELLS) * CELL,
              z: (cz - HALF_CELLS + 0.5) * CELL,
              len,
            });
          }
          runStart = -1;
        }
      }
    }
    const count = Math.min(slabs.length, MAX);
    mesh.count = count;
    for (let i = 0; i < count; i++) {
      const s = slabs[i];
      m4.makeScale(s.len * CELL, 3, CELL * 0.96);
      m4.setPosition(s.x, curY, s.z);
      mesh.setMatrixAt(i, m4);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  const applyMatrices = () => {
    const count = mesh.count;
    for (let i = 0; i < count; i++) {
      const s = slabs[i];
      const x = ((((s.x + offset + WRAP / 2) % WRAP) + WRAP) % WRAP) - WRAP / 2; // 居中逐实例回绕
      m4.makeScale(s.len * CELL, 3, CELL * 0.96);
      m4.setPosition(x, curY, s.z);
      mesh.setMatrixAt(i, m4);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  const update = (dt: number, speed: number, cloudY: number) => {
    curY = cloudY;
    if (speed > 0) offset += dt * speed * 3.2;
    applyMatrices();
  };

  const dispose = () => {
    geo.dispose();
    material.dispose();
    mesh.dispose();
  };


  return { mesh, material, rebuild, update, dispose, count: () => mesh.count };
}
