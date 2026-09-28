import * as THREE from 'three';

export interface WeatherEffectLights {
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  streetLampLight?: THREE.PointLight | null;
  streetLampSpot?: THREE.SpotLight | null;
  guardhouseLight?: THREE.PointLight | null;
  warehouseLight?: THREE.PointLight | null;
  rearDoorGlow?: THREE.PointLight | null;
  policeBeaconRed?: THREE.PointLight | null;
  policeBeaconBlue?: THREE.PointLight | null;
  searchLightSpot?: THREE.SpotLight | null;
  rollUpDoorMesh?: THREE.Mesh | null;
}

export class WeatherEffects {
  public group: THREE.Group;
  private lights: WeatherEffectLights;

  // Rain Particles
  private rainGeom: THREE.BufferGeometry;
  private rainPositions: Float32Array;
  private rainCount: number = 2200;
  private rainAreaSize: number = 32;

  // Dripping Particles
  private dripGeom: THREE.BufferGeometry;
  private dripPositions: Float32Array;
  private dripCount: number = 60;
  private dripSpawns: THREE.Vector3[] = [];

  // Puddle Ripples
  private ripples: { mesh: THREE.Mesh; scale: number; maxScale: number; speed: number; x: number; z: number }[] = [];

  // Steam Vents
  private steamParticles: { mesh: THREE.Mesh; startY: number; vy: number; vx: number; opacity: number }[] = [];

  // Lightning state
  private lightningTimer: number = 4.0;
  private isFlashing: boolean = false;
  private flashProgress: number = 0;
  private baseAmbientColor: THREE.Color = new THREE.Color(0x182433);
  private baseDirColor: THREE.Color = new THREE.Color(0x354b66);

  constructor(lights: WeatherEffectLights) {
    this.group = new THREE.Group();
    this.lights = lights;

    this.rainGeom = new THREE.BufferGeometry();
    this.rainPositions = new Float32Array(this.rainCount * 3);

    this.dripGeom = new THREE.BufferGeometry();
    this.dripPositions = new Float32Array(this.dripCount * 3);

    this.initRainSystem();
    this.initDripSystem();
    this.initPuddleRipples();
    this.initSteamVents();
  }

  /**
   * Continuous fine falling rain particle streaks
   */
  private initRainSystem(): void {
    for (let i = 0; i < this.rainCount; i++) {
      this.rainPositions[i * 3] = (Math.random() - 0.5) * this.rainAreaSize;
      this.rainPositions[i * 3 + 1] = Math.random() * 18;
      this.rainPositions[i * 3 + 2] = (Math.random() - 0.5) * this.rainAreaSize;
    }
    this.rainGeom.setAttribute('position', new THREE.BufferAttribute(this.rainPositions, 3));

    const rainMat = new THREE.PointsMaterial({
      color: 0x90b8d8,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const rainPoints = new THREE.Points(this.rainGeom, rainMat);
    this.group.add(rainPoints);
  }

  /**
   * Water drops dripping from eaves, container edges, and roll-up shutter
   */
  private initDripSystem(): void {
    // Eaves & edge spawn origins
    this.dripSpawns = [
      new THREE.Vector3(-8.5, 4.3, 0),     // A site warehouse eave
      new THREE.Vector3(-8.5, 3.4, 4.5),   // A site shutter lip
      new THREE.Vector3(7.5, 3.7, -12.0),  // T container edge
      new THREE.Vector3(10.5, 5.6, -2.5),  // B site 2F roof eave
      new THREE.Vector3(8.5, 3.0, -1.0),   // B site balcony edge
      new THREE.Vector3(-4.7, 5.2, 4.4),   // Gutter downspout top
      new THREE.Vector3(0, 4.8, 0),        // Mid gateway arch
      new THREE.Vector3(-6.5, 2.5, 0.5)    // Police van roof
    ];

    for (let i = 0; i < this.dripCount; i++) {
      const spawn = this.dripSpawns[i % this.dripSpawns.length];
      this.dripPositions[i * 3] = spawn.x + (Math.random() - 0.5) * 1.5;
      this.dripPositions[i * 3 + 1] = Math.random() * spawn.y;
      this.dripPositions[i * 3 + 2] = spawn.z + (Math.random() - 0.5) * 1.5;
    }
    this.dripGeom.setAttribute('position', new THREE.BufferAttribute(this.dripPositions, 3));

    const dripMat = new THREE.PointsMaterial({
      color: 0xa8d0f0,
      size: 0.16,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });

    const dripPoints = new THREE.Points(this.dripGeom, dripMat);
    this.group.add(dripPoints);
  }

  /**
   * Expanding ripple rings on puddles
   */
  private initPuddleRipples(): void {
    const rippleGeom = new THREE.RingGeometry(0.05, 0.1, 16);
    rippleGeom.rotateX(-Math.PI / 2);

    const rippleLocations = [
      { x: 0, z: 0 },
      { x: -5.5, z: -8.0 },
      { x: 6.2, z: -5.5 },
      { x: -3.0, z: 9.0 },
      { x: 2.5, z: -11.0 },
      { x: -11.0, z: 0 },
      { x: 10.5, z: 3.0 }
    ];

    rippleLocations.forEach(loc => {
      for (let r = 0; r < 2; r++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x88c0e8,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const mesh = new THREE.Mesh(rippleGeom, mat);
        mesh.position.set(loc.x + (Math.random() - 0.5) * 1.2, 0.02, loc.z + (Math.random() - 0.5) * 1.2);
        this.group.add(mesh);

        this.ripples.push({
          mesh,
          scale: 0.2 + r * 0.8,
          maxScale: 1.8 + Math.random() * 0.6,
          speed: 0.8 + Math.random() * 0.4,
          x: loc.x,
          z: loc.z
        });
      }
    });
  }

  /**
   * Faint white steam/vapor rising from rooftop AC vents & sewer openings
   */
  private initSteamVents(): void {
    const steamGeom = new THREE.SphereGeometry(0.2, 6, 6);
    const ventOrigins = [
      new THREE.Vector3(-13.45, 2.4, -6.3), // AC condenser
      new THREE.Vector3(-6.5, 0.3, -7.5),   // Sewer intake
      new THREE.Vector3(10.7, 5.6, -3.6)    // B site roof vent
    ];

    ventOrigins.forEach(origin => {
      for (let s = 0; s < 5; s++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0xdde8f5,
          transparent: true,
          opacity: 0.25,
          depthWrite: false
        });
        const mesh = new THREE.Mesh(steamGeom, mat);
        mesh.position.set(
          origin.x + (Math.random() - 0.5) * 0.2,
          origin.y + Math.random() * 0.6,
          origin.z + (Math.random() - 0.5) * 0.2
        );
        this.group.add(mesh);

        this.steamParticles.push({
          mesh,
          startY: origin.y,
          vy: 0.4 + Math.random() * 0.3,
          vx: (Math.random() - 0.5) * 0.1,
          opacity: 0.25
        });
      }
    });
  }

  /**
   * Frame update loop for all weather and micro-animations
   */
  public update(delta: number, elapsedTime: number): void {
    // 1. Update Rain Particles
    const rPos = this.rainPositions;
    for (let i = 0; i < this.rainCount; i++) {
      const idx = i * 3;
      rPos[idx + 1] -= 22 * delta;     // Fall down
      rPos[idx] += 1.8 * delta;        // Wind X drift
      rPos[idx + 2] += 0.9 * delta;    // Wind Z drift

      if (rPos[idx + 1] < 0) {
        rPos[idx + 1] = 18;
        rPos[idx] = (Math.random() - 0.5) * this.rainAreaSize;
        rPos[idx + 2] = (Math.random() - 0.5) * this.rainAreaSize;
      }
    }
    this.rainGeom.attributes.position.needsUpdate = true;

    // 2. Update Dripping Particles
    const dPos = this.dripPositions;
    for (let i = 0; i < this.dripCount; i++) {
      const idx = i * 3;
      dPos[idx + 1] -= 7.5 * delta;

      if (dPos[idx + 1] < 0) {
        const spawn = this.dripSpawns[i % this.dripSpawns.length];
        dPos[idx] = spawn.x + (Math.random() - 0.5) * 1.5;
        dPos[idx + 1] = spawn.y;
        dPos[idx + 2] = spawn.z + (Math.random() - 0.5) * 1.5;
      }
    }
    this.dripGeom.attributes.position.needsUpdate = true;

    // 3. Update Puddle Ripples
    this.ripples.forEach(rip => {
      rip.scale += rip.speed * delta;
      if (rip.scale > rip.maxScale) {
        rip.scale = 0.1;
        rip.mesh.position.x = rip.x + (Math.random() - 0.5) * 1.6;
        rip.mesh.position.z = rip.z + (Math.random() - 0.5) * 1.6;
      }
      rip.mesh.scale.set(rip.scale, rip.scale, 1);
      const alpha = Math.max(0, 1 - rip.scale / rip.maxScale) * 0.55;
      (rip.mesh.material as THREE.MeshBasicMaterial).opacity = alpha;
    });

    // 4. Update Steam Particles
    this.steamParticles.forEach(sp => {
      sp.mesh.position.y += sp.vy * delta;
      sp.mesh.position.x += sp.vx * delta;
      const progress = (sp.mesh.position.y - sp.startY) / 1.4;
      const scale = 1.0 + progress * 2.2;
      sp.mesh.scale.set(scale, scale, scale);
      (sp.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - progress) * sp.opacity);

      if (progress >= 1.0) {
        sp.mesh.position.y = sp.startY;
      }
    });

    // 5. Police Strobe Light (Alternating Red / Blue pulses)
    const strobeTime = elapsedTime * 4.5;
    if (this.lights.policeBeaconRed) {
      const rIntensity = Math.sin(strobeTime) > 0 ? 4.2 : 0.2;
      this.lights.policeBeaconRed.intensity = rIntensity;
    }
    if (this.lights.policeBeaconBlue) {
      const bIntensity = Math.sin(strobeTime + Math.PI) > 0 ? 4.2 : 0.2;
      this.lights.policeBeaconBlue.intensity = bIntensity;
    }

    // 6. Street Lamp & Guardhouse Light subtle flicker in rain
    if (this.lights.streetLampLight) {
      const flicker = 2.8 + Math.sin(elapsedTime * 9.0) * 0.2 + (Math.random() - 0.5) * 0.15;
      this.lights.streetLampLight.intensity = Math.max(1.8, flicker);
    }
    if (this.lights.guardhouseLight) {
      const tubeBlink = Math.random() > 0.98 ? 0.4 : (2.2 + (Math.random() - 0.5) * 0.25);
      this.lights.guardhouseLight.intensity = tubeBlink;
    }

    // 7. Searchlight subtle wind sway
    if (this.lights.searchLightSpot) {
      this.lights.searchLightSpot.target.position.x = -3.5 + Math.sin(elapsedTime * 0.8) * 0.6;
      this.lights.searchLightSpot.target.position.z = -10.0 + Math.cos(elapsedTime * 0.6) * 0.4;
    }

    // 8. Warehouse Roll-up Shutter Micro-Vibration in wind
    if (this.lights.rollUpDoorMesh) {
      this.lights.rollUpDoorMesh.position.y = 3.4 + Math.sin(elapsedTime * 14.0) * 0.008;
    }

    // 9. Distant Sky Lightning Flashes
    this.lightningTimer -= delta;
    if (this.lightningTimer <= 0 && !this.isFlashing) {
      this.isFlashing = true;
      this.flashProgress = 0;
      this.lightningTimer = 7.0 + Math.random() * 8.0;
    }

    if (this.isFlashing) {
      this.flashProgress += delta * 6.0;
      const flashBrightness = Math.sin(this.flashProgress * Math.PI * 2) > 0.4 ? 1.8 : 0.2;
      if (this.flashProgress >= 1.0) {
        this.isFlashing = false;
        this.lights.ambientLight.color.copy(this.baseAmbientColor);
        this.lights.directionalLight.color.copy(this.baseDirColor);
        this.lights.ambientLight.intensity = 0.85;
      } else {
        this.lights.ambientLight.color.setHex(0x5078a0);
        this.lights.directionalLight.color.setHex(0x78a0d0);
        this.lights.ambientLight.intensity = 0.85 + flashBrightness * 1.5;
      }
    }
  }
}
