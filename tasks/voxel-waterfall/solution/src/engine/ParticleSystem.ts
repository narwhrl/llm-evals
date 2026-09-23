// 飞瀑水花粒子系统与环境光尘/萤火虫系统

import * as THREE from 'three';
import { WaterfallInfo } from './TerrainGenerator';

export class ParticleSystem {
  public group: THREE.Group;
  private splashParticles: THREE.Points;
  private splashGeo: THREE.BufferGeometry;
  private splashPositions: Float32Array;
  private splashVelocities: Float32Array;
  private splashLifetimes: Float32Array;
  private splashMaxLifetimes: Float32Array;
  private splashCount: number = 600;

  private fireflyParticles: THREE.Points;
  private fireflyGeo: THREE.BufferGeometry;
  private fireflyPositions: Float32Array;
  private fireflyOffsets: Float32Array;
  private fireflyCount: number = 250;

  private impactPoints: WaterfallInfo[] = [];

  constructor() {
    this.group = new THREE.Group();

    // 1. 飞瀑击水浪花与水雾粒子
    this.splashPositions = new Float32Array(this.splashCount * 3);
    this.splashVelocities = new Float32Array(this.splashCount * 3);
    this.splashLifetimes = new Float32Array(this.splashCount);
    this.splashMaxLifetimes = new Float32Array(this.splashCount);

    this.splashGeo = new THREE.BufferGeometry();
    this.splashGeo.setAttribute('position', new THREE.BufferAttribute(this.splashPositions, 3));

    // 方块体素风格水雾质感
    const splashCanvas = document.createElement('canvas');
    splashCanvas.width = 16;
    splashCanvas.height = 16;
    const ctx = splashCanvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 2, 12, 12); // 方形水花
    const splashTex = new THREE.CanvasTexture(splashCanvas);
    splashTex.magFilter = THREE.NearestFilter;

    const splashMat = new THREE.PointsMaterial({
      color: 0xddf4ff,
      size: 0.9,
      map: splashTex,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.splashParticles = new THREE.Points(this.splashGeo, splashMat);
    this.group.add(this.splashParticles);

    // 2. 森林与湖面萤火虫/光尘系统
    this.fireflyPositions = new Float32Array(this.fireflyCount * 3);
    this.fireflyOffsets = new Float32Array(this.fireflyCount * 3);

    for (let i = 0; i < this.fireflyCount; i++) {
      this.fireflyPositions[i * 3 + 0] = 20 + Math.random() * 160;
      this.fireflyPositions[i * 3 + 1] = 8 + Math.random() * 25;
      this.fireflyPositions[i * 3 + 2] = 40 + Math.random() * 150;

      this.fireflyOffsets[i * 3 + 0] = Math.random() * Math.PI * 2;
      this.fireflyOffsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      this.fireflyOffsets[i * 3 + 2] = Math.random() * Math.PI * 2;
    }

    this.fireflyGeo = new THREE.BufferGeometry();
    this.fireflyGeo.setAttribute('position', new THREE.BufferAttribute(this.fireflyPositions, 3));

    const fireflyMat = new THREE.PointsMaterial({
      color: 0xfff2a0,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.fireflyParticles = new THREE.Points(this.fireflyGeo, fireflyMat);
    this.group.add(this.fireflyParticles);
  }

  public setImpactPoints(points: WaterfallInfo[]) {
    this.impactPoints = points.filter(p => p.isImpact);
    // 初始化粒子位置
    for (let i = 0; i < this.splashCount; i++) {
      this.respawnSplash(i);
    }
  }

  private respawnSplash(i: number) {
    if (this.impactPoints.length === 0) return;
    const pt = this.impactPoints[Math.floor(Math.random() * this.impactPoints.length)];
    const i3 = i * 3;

    // 在落水点周围随机喷溅
    this.splashPositions[i3 + 0] = pt.x + (Math.random() - 0.5) * 2.5;
    this.splashPositions[i3 + 1] = pt.y + 0.3 + Math.random() * 0.5;
    this.splashPositions[i3 + 2] = pt.z + (Math.random() - 0.5) * 2.5;

    // 向上及向外迸射的速度
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.8 + Math.random() * 2.2;
    this.splashVelocities[i3 + 0] = Math.cos(angle) * speed * 0.7;
    this.splashVelocities[i3 + 1] = 1.8 + Math.random() * 2.8; // 向上冲起
    this.splashVelocities[i3 + 2] = Math.sin(angle) * speed * 0.7 + 0.5; // 轻微顺风

    this.splashLifetimes[i] = 0;
    this.splashMaxLifetimes[i] = 0.6 + Math.random() * 0.8;
  }

  public update(delta: number, time: number, timeMode: string) {
    // 1. 更新飞瀑水花与水雾
    const gravity = -6.0;
    for (let i = 0; i < this.splashCount; i++) {
      this.splashLifetimes[i] += delta;
      if (this.splashLifetimes[i] >= this.splashMaxLifetimes[i]) {
        this.respawnSplash(i);
        continue;
      }

      const i3 = i * 3;
      this.splashVelocities[i3 + 1] += gravity * delta;

      this.splashPositions[i3 + 0] += this.splashVelocities[i3 + 0] * delta;
      this.splashPositions[i3 + 1] += this.splashVelocities[i3 + 1] * delta;
      this.splashPositions[i3 + 2] += this.splashVelocities[i3 + 2] * delta;
    }
    this.splashGeo.attributes.position.needsUpdate = true;

    // 2. 更新萤火虫/漂浮微尘 (夜间为金绿光芒，白天为温润光尘)
    const pos = this.fireflyPositions;
    const off = this.fireflyOffsets;
    for (let i = 0; i < this.fireflyCount; i++) {
      const i3 = i * 3;
      pos[i3 + 0] += Math.sin(time * 0.8 + off[i3 + 0]) * 0.03;
      pos[i3 + 1] += Math.sin(time * 1.2 + off[i3 + 1]) * 0.02;
      pos[i3 + 2] += Math.cos(time * 0.9 + off[i3 + 2]) * 0.03;
    }
    this.fireflyGeo.attributes.position.needsUpdate = true;

    const fMat = this.fireflyParticles.material as THREE.PointsMaterial;
    if (timeMode === 'night') {
      fMat.color.setHex(0xaaff55); // 翠绿萤火
      fMat.size = 0.85;
      fMat.opacity = 0.9 + Math.sin(time * 3) * 0.1;
    } else if (timeMode === 'sunset') {
      fMat.color.setHex(0xffaa44); // 暮光金斑
      fMat.size = 0.6;
      fMat.opacity = 0.6;
    } else {
      fMat.color.setHex(0xffffff); // 晨光微尘
      fMat.size = 0.5;
      fMat.opacity = 0.35;
    }
  }

  public dispose() {
    this.splashGeo.dispose();
    (this.splashParticles.material as THREE.Material).dispose();
    this.fireflyGeo.dispose();
    (this.fireflyParticles.material as THREE.Material).dispose();
  }
}
