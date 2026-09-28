import * as THREE from 'three';
import { SceneConfig, TimeOfDay } from '../utils/types';
import { TerrainData, TreeData } from './TerrainGenerator';

interface SakuraPetal {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  speedY: number;
  swayFreq: number;
  swayAmp: number;
  phase: number;
}

interface Firefly {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  pulseFreq: number;
  phase: number;
  color: THREE.Color;
}

interface AlpineSnow {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export class AtmosphereSystem {
  private group: THREE.Group;

  // 1. Sakura Petals
  private sakuraPoints: THREE.Points | null = null;
  private sakuraGeo: THREE.BufferGeometry | null = null;
  private sakuraPetals: SakuraPetal[] = [];
  private maxSakura = 250;

  // 2. Fireflies (Night / Sunset / Fantasy)
  private fireflyPoints: THREE.Points | null = null;
  private fireflyGeo: THREE.BufferGeometry | null = null;
  private fireflies: Firefly[] = [];
  private maxFireflies = 180;
  private fireflyMaterial: THREE.PointsMaterial | null = null;

  // 3. Alpine Snow Wind
  private snowPoints: THREE.Points | null = null;
  private snowGeo: THREE.BufferGeometry | null = null;
  private snowParticles: AlpineSnow[] = [];
  private maxSnow = 200;

  private time = 0;
  private peakPos = { x: 0, y: 70, z: 0 };

  constructor() {
    this.group = new THREE.Group();
    this.initSystems();
  }

  private initSystems() {
    // 1. Sakura Texture & Material
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffa7c4';
    ctx.fillRect(3, 2, 10, 12);
    const sakuraTex = new THREE.CanvasTexture(canvas);
    sakuraTex.magFilter = THREE.NearestFilter;
    sakuraTex.minFilter = THREE.NearestFilter;

    this.sakuraGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(this.maxSakura * 3);
    const sCol = new Float32Array(this.maxSakura * 3);
    this.sakuraGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    this.sakuraGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));

    const sakuraMat = new THREE.PointsMaterial({
      size: 1.1,
      map: sakuraTex,
      transparent: true,
      opacity: 0.88,
      vertexColors: true,
      depthWrite: false,
    });
    this.sakuraPoints = new THREE.Points(this.sakuraGeo, sakuraMat);
    this.group.add(this.sakuraPoints);

    // 2. Firefly Material
    const fCanvas = document.createElement('canvas');
    fCanvas.width = 32;
    fCanvas.height = 32;
    const fCtx = fCanvas.getContext('2d')!;
    const fGrad = fCtx.createRadialGradient(16, 16, 2, 16, 16, 15);
    fGrad.addColorStop(0, 'rgba(235, 255, 120, 1)');
    fGrad.addColorStop(0.4, 'rgba(160, 255, 100, 0.6)');
    fGrad.addColorStop(1, 'rgba(100, 255, 100, 0)');
    fCtx.fillStyle = fGrad;
    fCtx.fillRect(0, 0, 32, 32);
    const fireflyTex = new THREE.CanvasTexture(fCanvas);

    this.fireflyGeo = new THREE.BufferGeometry();
    const fPos = new Float32Array(this.maxFireflies * 3);
    const fCol = new Float32Array(this.maxFireflies * 3);
    this.fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
    this.fireflyGeo.setAttribute('color', new THREE.BufferAttribute(fCol, 3));

    this.fireflyMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: fireflyTex,
      transparent: true,
      opacity: 0.0,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.fireflyPoints = new THREE.Points(this.fireflyGeo, this.fireflyMaterial);
    this.group.add(this.fireflyPoints);

    // 3. Alpine Snow
    this.snowGeo = new THREE.BufferGeometry();
    const snPos = new Float32Array(this.maxSnow * 3);
    this.snowGeo.setAttribute('position', new THREE.BufferAttribute(snPos, 3));

    const snowMat = new THREE.PointsMaterial({
      size: 1.0,
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    this.snowPoints = new THREE.Points(this.snowGeo, snowMat);
    this.group.add(this.snowPoints);
  }

  public setup(terrainData: TerrainData, config: SceneConfig) {
    const halfN = terrainData.gridSize / 2;
    this.peakPos = {
      x: terrainData.mainPeakPos.x - halfN,
      y: terrainData.mainPeakPos.y,
      z: terrainData.mainPeakPos.z - halfN,
    };

    // 1. Setup Sakura Petals around Sakura trees
    this.sakuraPetals = [];
    const sakuraTrees = terrainData.trees.filter((t) => t.type === 'sakura');

    for (let i = 0; i < this.maxSakura; i++) {
      let ox = 0, oy = 25, oz = 0;
      if (sakuraTrees.length > 0) {
        const tree = sakuraTrees[i % sakuraTrees.length];
        ox = tree.x - halfN + (Math.random() - 0.5) * 6;
        oy = tree.y + tree.height + Math.random() * 2;
        oz = tree.z - halfN + (Math.random() - 0.5) * 6;
      } else {
        ox = (Math.random() - 0.5) * halfN;
        oy = 20 + Math.random() * 15;
        oz = (Math.random() - 0.5) * halfN;
      }

      this.sakuraPetals.push({
        x: ox,
        y: oy - Math.random() * 15,
        z: oz,
        originX: ox,
        originY: oy,
        originZ: oz,
        speedY: 0.8 + Math.random() * 0.6,
        swayFreq: 1.5 + Math.random() * 2.0,
        swayAmp: 0.6 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Setup Fireflies
    this.fireflies = [];
    for (let i = 0; i < this.maxFireflies; i++) {
      this.fireflies.push({
        x: (Math.random() - 0.5) * terrainData.gridSize * 0.8,
        y: terrainData.waterLevel + 1 + Math.random() * 14,
        z: (Math.random() - 0.5) * terrainData.gridSize * 0.8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.8,
        pulseFreq: 2.0 + Math.random() * 3.0,
        phase: Math.random() * Math.PI * 2,
        color: new THREE.Color(
          config.timeOfDay === 'fantasy' ? 0x67e8f9 : 0xfacc15
        ),
      });
    }

    // 3. Setup Alpine Snow particles around peak
    this.snowParticles = [];
    for (let i = 0; i < this.maxSnow; i++) {
      this.snowParticles.push({
        x: this.peakPos.x + (Math.random() - 0.5) * 45,
        y: this.peakPos.y - 18 + Math.random() * 25,
        z: this.peakPos.z + (Math.random() - 0.5) * 45,
        vx: 1.5 + Math.random() * 2.0,
        vy: -0.6 - Math.random() * 0.8,
        vz: 0.8 + Math.random() * 1.5,
      });
    }

    this.updateLighting(config.timeOfDay);
  }

  public update(delta: number, config: SceneConfig) {
    this.time += delta;

    // 1. Update Sakura Petals
    if (this.sakuraGeo && this.sakuraPetals.length > 0) {
      const posArr = (this.sakuraGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const colArr = (this.sakuraGeo.attributes.color as THREE.BufferAttribute).array as Float32Array;

      for (let i = 0; i < this.sakuraPetals.length; i++) {
        const p = this.sakuraPetals[i];
        p.y -= p.speedY * delta * 2.0;
        p.x += Math.sin(this.time * p.swayFreq + p.phase) * p.swayAmp * delta * 2.0 + delta * 0.4;
        p.z += Math.cos(this.time * p.swayFreq + p.phase) * p.swayAmp * delta * 1.2 + delta * 0.3;

        // Reset when fallen below ground
        if (p.y < config.waterLevel) {
          p.y = p.originY;
          p.x = p.originX + (Math.random() - 0.5) * 4;
          p.z = p.originZ + (Math.random() - 0.5) * 4;
        }

        posArr[i * 3] = p.x;
        posArr[i * 3 + 1] = p.y;
        posArr[i * 3 + 2] = p.z;

        colArr[i * 3] = 1.0;
        colArr[i * 3 + 1] = 0.65;
        colArr[i * 3 + 2] = 0.78;
      }
      this.sakuraGeo.attributes.position.needsUpdate = true;
      this.sakuraGeo.attributes.color.needsUpdate = true;
    }

    // 2. Update Fireflies
    if (this.fireflyGeo && this.fireflyMaterial && this.fireflies.length > 0) {
      const isNight = config.timeOfDay === 'night' || config.timeOfDay === 'sunset' || config.timeOfDay === 'fantasy';
      const targetOpacity = isNight ? (config.timeOfDay === 'night' ? 0.95 : 0.75) : 0.0;
      this.fireflyMaterial.opacity += (targetOpacity - this.fireflyMaterial.opacity) * delta * 3.0;

      if (this.fireflyMaterial.opacity > 0.05) {
        const posArr = (this.fireflyGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
        const colArr = (this.fireflyGeo.attributes.color as THREE.BufferAttribute).array as Float32Array;

        for (let i = 0; i < this.fireflies.length; i++) {
          const f = this.fireflies[i];
          f.x += f.vx * delta * 4.0 + Math.sin(this.time * 2.0 + f.phase) * 0.05;
          f.y += f.vy * delta * 3.0 + Math.cos(this.time * 1.5 + f.phase) * 0.03;
          f.z += f.vz * delta * 4.0;

          // Boundary bounce
          const b = config.gridSize * 0.42;
          if (Math.abs(f.x) > b) f.vx *= -1;
          if (Math.abs(f.z) > b) f.vz *= -1;
          if (f.y < config.waterLevel + 1 || f.y > config.waterLevel + 22) f.vy *= -1;

          // Pulsing glow brightness
          const pulse = Math.pow(Math.sin(this.time * f.pulseFreq + f.phase) * 0.5 + 0.5, 2.0);

          posArr[i * 3] = f.x;
          posArr[i * 3 + 1] = f.y;
          posArr[i * 3 + 2] = f.z;

          colArr[i * 3] = f.color.r * pulse;
          colArr[i * 3 + 1] = f.color.g * pulse;
          colArr[i * 3 + 2] = f.color.b * pulse;
        }
        this.fireflyGeo.attributes.position.needsUpdate = true;
        this.fireflyGeo.attributes.color.needsUpdate = true;
      }
    }

    // 3. Update Alpine Snow particles
    if (this.snowGeo && this.snowParticles.length > 0) {
      const posArr = (this.snowGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < this.snowParticles.length; i++) {
        const sn = this.snowParticles[i];
        sn.x += sn.vx * delta * 6.0;
        sn.y += sn.vy * delta * 4.0;
        sn.z += sn.vz * delta * 5.0;

        if (
          sn.x > this.peakPos.x + 35 ||
          sn.z > this.peakPos.z + 35 ||
          sn.y < this.peakPos.y - 25
        ) {
          sn.x = this.peakPos.x - 30 + (Math.random() - 0.5) * 15;
          sn.y = this.peakPos.y + Math.random() * 12;
          sn.z = this.peakPos.z - 30 + (Math.random() - 0.5) * 15;
        }

        posArr[i * 3] = sn.x;
        posArr[i * 3 + 1] = sn.y;
        posArr[i * 3 + 2] = sn.z;
      }
      this.snowGeo.attributes.position.needsUpdate = true;
    }
  }

  public updateLighting(timeOfDay: TimeOfDay) {
    if (!this.fireflies) return;
    for (const f of this.fireflies) {
      if (timeOfDay === 'fantasy') {
        f.color.setHex(0x5eead4);
      } else if (timeOfDay === 'sunset') {
        f.color.setHex(0xfde047);
      } else {
        f.color.setHex(0xa3e635);
      }
    }
  }

  public getGroup() {
    return this.group;
  }

  public destroy() {
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
      if (child instanceof THREE.Points) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    }
    this.sakuraPetals = [];
    this.fireflies = [];
    this.snowParticles = [];
  }
}
