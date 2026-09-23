// 动态水体动画与材质系统

import * as THREE from 'three';
import { WaterfallInfo } from './TerrainGenerator';

export class WaterSystem {
  public waterMesh: THREE.Mesh | null = null;
  private origPositions: Float32Array | null = null;
  private origColors: Float32Array | null = null;
  private flowSpeed: number = 1.0;
  private waveHeight: number = 0.08;

  constructor() {}

  public setWaterMesh(mesh: THREE.Mesh) {
    this.waterMesh = mesh;
    const geo = mesh.geometry;
    const pos = geo.getAttribute('position');
    const col = geo.getAttribute('color');

    if (pos) {
      this.origPositions = new Float32Array(pos.array);
    }
    if (col) {
      this.origColors = new Float32Array(col.array);
    }
  }

  public setFlowSpeed(speed: number) {
    this.flowSpeed = speed;
  }

  public update(delta: number, time: number) {
    if (!this.waterMesh || !this.origPositions || !this.origColors) return;

    const geo = this.waterMesh.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = geo.getAttribute('color') as THREE.BufferAttribute;

    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;
    const origPos = this.origPositions;
    const origCol = this.origColors;

    const count = pos.length / 3;
    const effTime = time * this.flowSpeed;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = origPos[i3 + 0];
      const y = origPos[i3 + 1];
      const z = origPos[i3 + 2];

      // 对水体表面 (顶面，或靠近水面) 施加轻微体素波纹起伏
      const wave = Math.sin(x * 0.45 + z * 0.35 + effTime * 3.5) *
                   Math.cos(x * 0.25 - z * 0.4 + effTime * 2.8) * this.waveHeight;

      pos[i3 + 1] = y + wave;

      // 动态水花流动高光脉动 (流水体素颜色明暗流转)
      const pulse = Math.sin(y * 1.5 - effTime * 6.0 + x * 0.5) * 0.08;
      col[i3 + 0] = Math.max(0, Math.min(1, origCol[i3 + 0] + pulse));
      col[i3 + 1] = Math.max(0, Math.min(1, origCol[i3 + 1] + pulse * 1.2));
      col[i3 + 2] = Math.max(0, Math.min(1, origCol[i3 + 2] + pulse * 1.5));
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  }

  public dispose() {
    if (this.waterMesh) {
      this.waterMesh.geometry.dispose();
      (this.waterMesh.material as THREE.Material).dispose();
      this.waterMesh = null;
    }
    this.origPositions = null;
    this.origColors = null;
  }
}
