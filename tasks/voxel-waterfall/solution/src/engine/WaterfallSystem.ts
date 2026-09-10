import * as THREE from 'three';
import { SceneConfig } from '../utils/types';
import { TerrainData, WaterfallPoint } from './TerrainGenerator';

/**
 * Physical Splash Particle
 * Models ballistic projectile motion with gravity, aerodynamic drag, and buoyancy
 */
interface SplashParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  type: 'droplet' | 'mist';
  dropEnergy: number; // proportional to fall height h = v^2 / (2g)
}

export class WaterfallSystem {
  private group: THREE.Group;
  private splashGeometry: THREE.BufferGeometry;
  private splashMaterial: THREE.PointsMaterial;
  private splashPoints: THREE.Points;
  private mistGeometry: THREE.BufferGeometry;
  private mistMaterial: THREE.PointsMaterial;
  private mistPoints: THREE.Points;
  
  private particles: SplashParticle[] = [];
  private impactPoints: { x: number; y: number; z: number; dropHeight: number; intensity: number }[] = [];
  private waterfallPoints: WaterfallPoint[] = [];
  
  private maxParticles = 650;
  private maxMist = 450;
  private flowSpeed = 1.0;
  private time = 0;

  // Expanding foam ripples on lake surface with physical wave damping
  private rippleGroup: THREE.Group;
  private ripples: { mesh: THREE.Mesh; life: number; maxLife: number; startScale: number; maxScale: number }[] = [];

  // Wind vector (aligns with atmospheric circulation)
  private windVector = new THREE.Vector3(0.6, 0.0, 0.3);

  constructor() {
    this.group = new THREE.Group();
    this.rippleGroup = new THREE.Group();
    this.group.add(this.rippleGroup);

    // 1. Splash Particle System (Cubic Voxel Droplets)
    this.splashGeometry = new THREE.BufferGeometry();
    const splashPos = new Float32Array(this.maxParticles * 3);
    const splashCol = new Float32Array(this.maxParticles * 3);
    const splashSizes = new Float32Array(this.maxParticles);

    this.splashGeometry.setAttribute('position', new THREE.BufferAttribute(splashPos, 3));
    this.splashGeometry.setAttribute('color', new THREE.BufferAttribute(splashCol, 3));
    this.splashGeometry.setAttribute('size', new THREE.BufferAttribute(splashSizes, 1));

    // Voxel-styled crisp droplet square texture
    const splashCanvas = document.createElement('canvas');
    splashCanvas.width = 16;
    splashCanvas.height = 16;
    const ctx = splashCanvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 2, 12, 12);
    const splashTexture = new THREE.CanvasTexture(splashCanvas);
    splashTexture.magFilter = THREE.NearestFilter;
    splashTexture.minFilter = THREE.NearestFilter;

    this.splashMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: splashTexture,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    this.splashPoints = new THREE.Points(this.splashGeometry, this.splashMaterial);
    this.group.add(this.splashPoints);

    // 2. Mist Particle System (Soft buoyant water vapor)
    this.mistGeometry = new THREE.BufferGeometry();
    const mistPos = new Float32Array(this.maxMist * 3);
    const mistCol = new Float32Array(this.maxMist * 3);
    this.mistGeometry.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
    this.mistGeometry.setAttribute('color', new THREE.BufferAttribute(mistCol, 3));

    const mistCanvas = document.createElement('canvas');
    mistCanvas.width = 32;
    mistCanvas.height = 32;
    const mCtx = mistCanvas.getContext('2d')!;
    const grad = mCtx.createRadialGradient(16, 16, 2, 16, 16, 15);
    grad.addColorStop(0, 'rgba(240, 252, 255, 0.85)');
    grad.addColorStop(0.5, 'rgba(210, 245, 255, 0.45)');
    grad.addColorStop(1, 'rgba(200, 240, 255, 0)');
    mCtx.fillStyle = grad;
    mCtx.fillRect(0, 0, 32, 32);
    const mistTexture = new THREE.CanvasTexture(mistCanvas);

    this.mistMaterial = new THREE.PointsMaterial({
      size: 3.8,
      map: mistTexture,
      transparent: true,
      opacity: 0.45,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.mistPoints = new THREE.Points(this.mistGeometry, this.mistMaterial);
    this.group.add(this.mistPoints);

    // Initialize particle pools
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: 0,
        y: -100,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: 1,
        size: 1,
        color: new THREE.Color(0xd0f0ff),
        type: 'droplet',
        dropEnergy: 1.0,
      });
    }
  }

  public setup(terrainData: TerrainData, config: SceneConfig) {
    this.waterfallPoints = terrainData.waterfallPoints;
    this.flowSpeed = config.waterfallFlowSpeed || 1.0;
    this.impactPoints = [];

    const halfN = terrainData.gridSize / 2;

    // Detect impact zones: plunge pools & lake base
    // Calculate potential-to-kinetic energy conversion based on drop height
    for (const pt of this.waterfallPoints) {
      if (pt.type === 'splash' || pt.type === 'drop' || pt.type === 'pool') {
        const fallHeight = Math.max(8, pt.y - terrainData.waterLevel);
        const intensity = Math.sqrt(fallHeight) * 0.45;

        this.impactPoints.push({
          x: pt.x - halfN + 0.5,
          y: pt.y + 0.5,
          z: pt.z - halfN + 0.5,
          dropHeight: fallHeight,
          intensity: intensity,
        });
      }
    }

    // Reset particles
    for (const p of this.particles) {
      p.life = 0;
      p.y = -100;
    }

    // Clear ripples
    while (this.rippleGroup.children.length > 0) {
      this.rippleGroup.remove(this.rippleGroup.children[0]);
    }
    this.ripples = [];
  }

  public update(delta: number, config: SceneConfig) {
    this.time += delta * this.flowSpeed;
    const spawnRate = (config.splashParticleCount ?? 1.2);

    const posAttr = this.splashGeometry.attributes.position as THREE.BufferAttribute;
    const colAttr = this.splashGeometry.attributes.color as THREE.BufferAttribute;
    const mistPosAttr = this.mistGeometry.attributes.position as THREE.BufferAttribute;
    const mistColAttr = this.mistGeometry.attributes.color as THREE.BufferAttribute;

    const splashArr = posAttr.array as Float32Array;
    const splashColArr = colAttr.array as Float32Array;
    const mistArr = mistPosAttr.array as Float32Array;
    const mistColArr = mistColAttr.array as Float32Array;

    let mistIndex = 0;
    const GRAVITY = 9.81 * 1.6; // Scale calibrated gravitational acceleration
    const DRAG_COEFFICIENT = 0.94; // Air resistance / fluid drag
    const MIST_BUOYANCY = 1.8; // Upward thermal convection for water vapor

    // 1. Update and spawn particles with Newtonian physics
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (p.life > 0) {
        p.life -= delta;

        if (p.type === 'droplet') {
          // Ballistic projectile motion:
          // v_y(t) = v_y0 - g * dt
          p.vy -= GRAVITY * delta;
          // Fluid aerodynamic drag F_drag = -k * v
          p.vx *= DRAG_COEFFICIENT;
          p.vz *= DRAG_COEFFICIENT;

          p.x += p.vx * delta * 15;
          p.y += p.vy * delta * 15;
          p.z += p.vz * delta * 15;
        } else {
          // Mist aerosol vapor: buoyancy + wind advection
          p.vy += MIST_BUOYANCY * delta * 0.8;
          p.x += (p.vx + this.windVector.x * 0.8) * delta * 12;
          p.y += p.vy * delta * 12;
          p.z += (p.vz + this.windVector.z * 0.8) * delta * 12;

          p.vx *= 0.92;
          p.vz *= 0.92;
        }

        const progress = 1.0 - (p.life / p.maxLife);
        const alpha = Math.max(0, 1.0 - progress);

        // Position write
        splashArr[i * 3] = p.x;
        splashArr[i * 3 + 1] = p.y;
        splashArr[i * 3 + 2] = p.z;

        // Color & Luminosity Fade
        splashColArr[i * 3] = p.color.r * alpha;
        splashColArr[i * 3 + 1] = p.color.g * alpha;
        splashColArr[i * 3 + 2] = p.color.b * alpha;

        // Populate mist render buffer
        if (p.type === 'mist' && mistIndex < this.maxMist) {
          mistArr[mistIndex * 3] = p.x;
          mistArr[mistIndex * 3 + 1] = p.y + 0.3;
          mistArr[mistIndex * 3 + 2] = p.z;

          mistColArr[mistIndex * 3] = 0.92 * alpha;
          mistColArr[mistIndex * 3 + 1] = 0.96 * alpha;
          mistColArr[mistIndex * 3 + 2] = 1.0 * alpha;
          mistIndex++;
        }
      } else {
        // Spawn new splash/mist particle from impact plunge pool
        if (this.impactPoints.length > 0 && Math.random() < 0.32 * spawnRate) {
          const impact = this.impactPoints[Math.floor(Math.random() * this.impactPoints.length)];
          const isMist = Math.random() < 0.48;

          p.type = isMist ? 'mist' : 'droplet';
          p.dropEnergy = impact.intensity;

          // Impact coordinate with spray radius
          const sprayRadius = isMist ? 2.5 : 1.8;
          p.x = impact.x + (Math.random() - 0.5) * sprayRadius;
          p.y = impact.y + (Math.random() * 0.4);
          p.z = impact.z + (Math.random() - 0.5) * sprayRadius;

          // Ejection trajectory: Cone-distributed velocity vector
          // Velocity magnitude proportional to sqrt(2 * g * h)
          const angle = Math.random() * Math.PI * 2;
          const elevationAngle = (0.25 + Math.random() * 0.45) * Math.PI; // 45° - 80° upward cone
          const exitSpeed = (isMist ? 0.35 : 1.35) * impact.intensity * (0.85 + Math.random() * 0.5);

          p.vx = Math.cos(angle) * Math.cos(elevationAngle) * exitSpeed;
          p.vy = Math.sin(elevationAngle) * exitSpeed * (isMist ? 0.6 : 1.4);
          p.vz = Math.sin(angle) * Math.cos(elevationAngle) * exitSpeed;

          p.maxLife = isMist ? 2.2 + Math.random() * 1.4 : 0.65 + Math.random() * 0.55;
          p.life = p.maxLife;
          p.size = isMist ? 3.6 : 1.2;

          if (isMist) {
            p.color.setHex(0xe8f8ff);
          } else {
            p.color.setHex(Math.random() < 0.65 ? 0xffffff : 0x70d6ff);
          }

          // Trigger kinetic hydrodynamic lake ripple
          if (impact.intensity >= 1.8 && Math.random() < 0.1) {
            this.spawnRipple(impact.x, impact.y, impact.z, impact.intensity);
          }
        } else {
          splashArr[i * 3 + 1] = -100; // park inactive off-screen
        }
      }
    }

    // Clear unused mist buffer
    for (let m = mistIndex; m < this.maxMist; m++) {
      mistArr[m * 3 + 1] = -100;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    mistPosAttr.needsUpdate = true;
    mistColAttr.needsUpdate = true;

    // 2. Update lake wave ripples
    this.updateRipples(delta);
  }

  private spawnRipple(x: number, y: number, z: number, energy: number) {
    if (this.ripples.length > 15) return;

    const geo = new THREE.RingGeometry(0.35, 0.75, 8); // Voxel-stylized octagonal ripple
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xebf8ff,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y + 0.05, z);
    this.rippleGroup.add(mesh);

    this.ripples.push({
      mesh,
      life: 1.6,
      maxLife: 1.6,
      startScale: 0.5,
      maxScale: 2.2 + energy * 0.9,
    });
  }

  private updateRipples(delta: number) {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.life -= delta;
      if (r.life <= 0) {
        this.rippleGroup.remove(r.mesh);
        r.mesh.geometry.dispose();
        (r.mesh.material as THREE.Material).dispose();
        this.ripples.splice(i, 1);
      } else {
        const progress = 1.0 - (r.life / r.maxLife);
        // Wave speed propagation r(t)
        const scale = r.startScale + (r.maxScale - r.startScale) * progress;
        r.mesh.scale.set(scale, 1, scale);
        // Exponential wave amplitude attenuation A(t) = A_0 * (1 - t/t_max)^1.5
        (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0.7 * Math.pow(1.0 - progress, 1.4);
      }
    }
  }

  public getGroup() {
    return this.group;
  }

  public destroy() {
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }
    this.splashGeometry.dispose();
    this.splashMaterial.dispose();
    this.mistGeometry.dispose();
    this.mistMaterial.dispose();
    for (const r of this.ripples) {
      r.mesh.geometry.dispose();
      (r.mesh.material as THREE.Material).dispose();
    }
    this.ripples = [];
  }
}
