import * as THREE from 'three';
import { FastNoise } from '../utils/perlin';
import { SceneConfig, TimeOfDay } from '../utils/types';
import { LIGHTING_PRESETS } from '../utils/colors';

export class CloudSystem {
  private group: THREE.Group;
  private cloudMesh: THREE.InstancedMesh | null = null;
  private mistParticles: THREE.Points | null = null;
  private noise: FastNoise;
  private cloudAltitude = 40;
  private cloudSpeed = 1.0;
  private worldSize = 144;
  private cloudInstances: { x: number; y: number; z: number; scaleY: number }[] = [];
  private dummy = new THREE.Object3D();
  private cloudMaterial: THREE.MeshStandardMaterial;

  constructor(seed = 8888) {
    this.group = new THREE.Group();
    this.noise = new FastNoise(seed);

    // Voxel Cloud Material with soft translucency
    this.cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.88,
      roughness: 0.85,
      metalness: 0.0,
      flatShading: true,
      depthWrite: true,
    });
  }

  public setup(config: SceneConfig) {
    // Clear existing
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
      if (child instanceof THREE.InstancedMesh || child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    }

    this.worldSize = config.gridSize;
    this.cloudAltitude = config.cloudAltitude || 40;
    this.cloudSpeed = config.cloudSpeed || 1.0;
    const thickness = config.cloudThickness || 3;
    const densityThreshold = 0.52 - (config.cloudDensity ?? 0.5) * 0.22;

    this.cloudInstances = [];
    const N = this.worldSize;
    const step = 2; // 2x2 voxel cloud block units

    // Generate 3D procedural voxel cloud clusters
    for (let z = -N * 0.65; z < N * 0.65; z += step) {
      for (let x = -N * 0.65; x < N * 0.65; x += step) {
        const nx = (x + N) / 80;
        const nz = (z + N) / 80;

        // Multi-octave cloud noise
        const n1 = this.noise.fbm2D(nx, nz, 3, 2.0, 0.5);
        const n2 = this.noise.noise2D(nx * 2.5, nz * 2.5) * 0.25;
        const density = n1 + n2;

        if (density > densityThreshold) {
          const heightOffset = Math.floor(this.noise.noise2D(nx * 4, nz * 4) * thickness);
          const cloudY = this.cloudAltitude + heightOffset;

          // Main layer
          this.cloudInstances.push({
            x,
            y: cloudY,
            z,
            scaleY: 1.8 + Math.abs(density - densityThreshold) * 3.0,
          });

          // Top puffy cap for dense center
          if (density > densityThreshold + 0.16) {
            this.cloudInstances.push({
              x,
              y: cloudY + 2,
              z,
              scaleY: 1.4,
            });
          }
        }
      }
    }

    if (this.cloudInstances.length > 0) {
      const boxGeo = new THREE.BoxGeometry(step, 1.6, step);
      this.cloudMesh = new THREE.InstancedMesh(boxGeo, this.cloudMaterial, this.cloudInstances.length);
      this.cloudMesh.castShadow = true;
      this.cloudMesh.receiveShadow = true;

      this.updateInstancesTransform();
      this.group.add(this.cloudMesh);
    }

    // Mountain wispy mist particles at cloud altitude
    this.setupMountainMist(N);

    // Apply time-of-day cloud tint
    this.updateLighting(config.timeOfDay);
  }

  private setupMountainMist(N: number) {
    const mistCount = 200;
    const mistGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(mistCount * 3);

    for (let i = 0; i < mistCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * N * 0.95;
      pos[i * 3 + 1] = this.cloudAltitude - 4 + Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * N * 0.95;
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mistMat = new THREE.PointsMaterial({
      size: 5.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.mistParticles = new THREE.Points(mistGeo, mistMat);
    this.group.add(this.mistParticles);
  }

  public update(delta: number, config: SceneConfig) {
    const speed = (config.cloudSpeed ?? 1.0) * delta * 2.5;
    const bound = this.worldSize * 0.65;

    // Drift clouds along wind direction (+X, +Z)
    for (const inst of this.cloudInstances) {
      inst.x += speed * 0.8;
      inst.z += speed * 0.4;

      if (inst.x > bound) inst.x = -bound;
      if (inst.z > bound) inst.z = -bound;
    }

    this.updateInstancesTransform();

    // Drift mist particles
    if (this.mistParticles) {
      const posAttr = this.mistParticles.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3] += speed * 0.5;
        arr[i * 3 + 2] += speed * 0.25;

        if (arr[i * 3] > bound) arr[i * 3] = -bound;
        if (arr[i * 3 + 2] > bound) arr[i * 3 + 2] = -bound;
      }
      posAttr.needsUpdate = true;
    }
  }

  private updateInstancesTransform() {
    if (!this.cloudMesh) return;

    for (let i = 0; i < this.cloudInstances.length; i++) {
      const inst = this.cloudInstances[i];
      this.dummy.position.set(inst.x, inst.y, inst.z);
      this.dummy.scale.set(1, inst.scaleY, 1);
      this.dummy.updateMatrix();
      this.cloudMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.cloudMesh.instanceMatrix.needsUpdate = true;
  }

  public updateLighting(timeOfDay: TimeOfDay) {
    const preset = LIGHTING_PRESETS[timeOfDay];
    if (preset && this.cloudMaterial) {
      this.cloudMaterial.color.setHex(preset.cloudTint);
      if (timeOfDay === 'night') {
        this.cloudMaterial.opacity = 0.72;
      } else {
        this.cloudMaterial.opacity = 0.88;
      }
    }
  }

  public setAltitude(altitude: number) {
    this.cloudAltitude = altitude;
    for (const inst of this.cloudInstances) {
      inst.y = altitude;
    }
    this.updateInstancesTransform();
  }

  public getCloudCount(): number {
    return this.cloudInstances.length;
  }

  public getGroup() {
    return this.group;
  }

  public destroy() {
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
      if (child instanceof THREE.InstancedMesh || child instanceof THREE.Mesh || child instanceof THREE.Points) {
        child.geometry.dispose();
      }
    }
    this.cloudInstances = [];
  }
}
