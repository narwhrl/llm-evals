import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SceneConfig, TerrainStats, TimeOfDay } from '../utils/types';
import { TerrainGenerator, TerrainData } from './TerrainGenerator';
import { VoxelMeshBuilder, VoxelMeshResult } from './VoxelMeshBuilder';
import { WaterfallSystem } from './WaterfallSystem';
import { CloudSystem } from './CloudSystem';
import { SkyLightingSystem } from './SkyLightingSystem';
import { AtmosphereSystem } from './AtmosphereSystem';

export class SceneManager {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  private terrainGen: TerrainGenerator;
  private meshBuilder: VoxelMeshBuilder;
  private waterfallSystem: WaterfallSystem;
  private cloudSystem: CloudSystem;
  private skyLighting: SkyLightingSystem;
  private atmosphereSystem: AtmosphereSystem;

  private currentMeshResult: VoxelMeshResult | null = null;
  private currentTerrainData: TerrainData | null = null;
  private config: SceneConfig;

  // Animation & Loop
  private animFrameId: number | null = null;
  private clock: THREE.Clock;
  private isDestroyed = false;

  // Stats calculation
  private frameCount = 0;
  private lastFpsTime = 0;
  private currentFps = 60;
  private statsCallback: ((stats: TerrainStats) => void) | null = null;

  // Camera transitions
  private targetCameraPos = new THREE.Vector3();
  private targetCameraLookAt = new THREE.Vector3();
  private isTransitioningCamera = false;
  private tourAngle = 0;

  constructor(container: HTMLElement, initialConfig: SceneConfig) {
    this.container = container;
    this.config = { ...initialConfig };
    this.clock = new THREE.Clock();

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera (Wide view angle calibrated for grand 3D scene)
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(48, aspect, 0.5, 900);
    this.camera.position.set(118, 82, 126);

    // 3. Renderer with high performance settings and shadow maps
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // prevent going below bedrock
    this.controls.minDistance = 15;
    this.controls.maxDistance = 350;
    this.controls.target.set(5, 25, 5);
    this.controls.autoRotate = this.config.autoRotate;
    this.controls.autoRotateSpeed = this.config.autoRotateSpeed || 0.8;

    // 5. Systems
    this.terrainGen = new TerrainGenerator(this.config.seed);
    this.meshBuilder = new VoxelMeshBuilder();
    this.waterfallSystem = new WaterfallSystem();
    this.cloudSystem = new CloudSystem(this.config.seed + 100);
    this.skyLighting = new SkyLightingSystem(this.scene);
    this.atmosphereSystem = new AtmosphereSystem();

    this.scene.add(this.waterfallSystem.getGroup());
    this.scene.add(this.cloudSystem.getGroup());
    this.scene.add(this.atmosphereSystem.getGroup());

    // Window Resize Handler
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.onWindowResize);

    // Initial Build
    this.rebuildScene();
    this.applyCameraPreset(this.config.cameraPreset || 'overview', false);

    // Start Loop
    this.animate = this.animate.bind(this);
    this.lastFpsTime = performance.now();
    this.animFrameId = requestAnimationFrame(this.animate);
  }

  public setStatsCallback(cb: (stats: TerrainStats) => void) {
    this.statsCallback = cb;
  }

  public rebuildScene() {
    // 1. Remove old meshes
    if (this.currentMeshResult) {
      this.scene.remove(this.currentMeshResult.solidMesh);
      this.scene.remove(this.currentMeshResult.waterMesh);
      this.scene.remove(this.currentMeshResult.lanternMesh);

      this.currentMeshResult.solidMesh.geometry.dispose();
      this.currentMeshResult.waterMesh.geometry.dispose();
      this.currentMeshResult.lanternMesh.geometry.dispose();
      this.currentMeshResult = null;
    }

    // 2. Generate Terrain
    this.terrainGen.setSeed(this.config.seed);
    this.currentTerrainData = this.terrainGen.generate(this.config);

    // 3. Build Meshes
    this.currentMeshResult = this.meshBuilder.build(this.currentTerrainData);
    this.scene.add(this.currentMeshResult.solidMesh);
    this.scene.add(this.currentMeshResult.waterMesh);
    this.scene.add(this.currentMeshResult.lanternMesh);

    // 4. Setup Subsystems
    this.waterfallSystem.setup(this.currentTerrainData, this.config);
    this.cloudSystem.setup(this.config);
    this.atmosphereSystem.setup(this.currentTerrainData, this.config);
    this.skyLighting.applyConfig(this.config);
    this.updateWaterAppearance();

    // Notify initial stats
    this.reportStats();
  }

  private updateWaterAppearance() {
    const waterMat = this.meshBuilder.getWaterMaterial();
    if (!waterMat) return;

    waterMat.opacity = this.config.waterOpacity ?? 0.85;
    if (this.config.timeOfDay === 'sunset') {
      waterMat.color.setHex(0xfce7f3);
    } else if (this.config.timeOfDay === 'night') {
      waterMat.color.setHex(0x93c5fd);
    } else if (this.config.timeOfDay === 'dawn') {
      waterMat.color.setHex(0xcffafe);
    } else if (this.config.timeOfDay === 'fantasy') {
      waterMat.color.setHex(0x99f6e4);
    } else {
      waterMat.color.setHex(0xffffff);
    }
  }

  public updateConfig(newConfig: Partial<SceneConfig>) {
    const prevConfig = { ...this.config };
    this.config = { ...this.config, ...newConfig };

    // Check if full rebuild is needed
    const needsFullRebuild =
      newConfig.seed !== undefined && newConfig.seed !== prevConfig.seed ||
      newConfig.gridSize !== undefined && newConfig.gridSize !== prevConfig.gridSize ||
      newConfig.terrainHeight !== undefined && newConfig.terrainHeight !== prevConfig.terrainHeight ||
      newConfig.treeDensity !== undefined && newConfig.treeDensity !== prevConfig.treeDensity ||
      newConfig.waterLevel !== undefined && newConfig.waterLevel !== prevConfig.waterLevel;

    if (needsFullRebuild) {
      this.rebuildScene();
      return;
    }

    // Cloud changes
    if (
      newConfig.cloudAltitude !== undefined ||
      newConfig.cloudDensity !== undefined ||
      newConfig.cloudThickness !== undefined
    ) {
      this.cloudSystem.setup(this.config);
    }

    // Lighting & Water changes
    if (
      newConfig.timeOfDay !== undefined ||
      newConfig.fogDensity !== undefined ||
      newConfig.sunIntensity !== undefined ||
      newConfig.waterOpacity !== undefined
    ) {
      this.skyLighting.applyConfig(this.config);
      this.cloudSystem.updateLighting(this.config.timeOfDay);
      this.atmosphereSystem.updateLighting(this.config.timeOfDay);
      this.updateWaterAppearance();
    }

    // Controls
    if (newConfig.autoRotate !== undefined) {
      this.controls.autoRotate = newConfig.autoRotate;
    }
    if (newConfig.autoRotateSpeed !== undefined) {
      this.controls.autoRotateSpeed = newConfig.autoRotateSpeed;
    }
    if (newConfig.cameraPreset !== undefined && newConfig.cameraPreset !== prevConfig.cameraPreset) {
      this.applyCameraPreset(newConfig.cameraPreset, true);
    }
  }

  public applyCameraPreset(preset: SceneConfig['cameraPreset'], smooth = true) {
    if (preset === 'custom') return;

    let targetPos = new THREE.Vector3(118, 82, 126);
    let targetLook = new THREE.Vector3(5, 25, 5);

    switch (preset) {
      case 'overview':
        // Full majestic landscape view: peaks, waterfalls, and the grand lake
        targetPos.set(118, 82, 126);
        targetLook.set(5, 25, 5);
        break;
      case 'waterfall':
        // Dramatic close-up on the waterfall plunging directly into the lake
        targetPos.set(52, 36, 56);
        targetLook.set(10, 20, 12);
        break;
      case 'cloudPeak':
        // Looking up at the peak piercing cloud deck
        targetPos.set(-70, 75, -65);
        targetLook.set(-18, 62, -15);
        break;
      case 'lakeShore':
        // Low angle by the wooden pier looking across the lake at the roaring falls
        targetPos.set(28, 20, 48);
        targetLook.set(8, 24, 16);
        break;
      case 'cinematicTour':
        this.tourAngle = 0;
        break;
    }

    if (preset !== 'cinematicTour') {
      if (smooth) {
        this.targetCameraPos.copy(targetPos);
        this.targetCameraLookAt.copy(targetLook);
        this.isTransitioningCamera = true;
      } else {
        this.camera.position.copy(targetPos);
        this.controls.target.copy(targetLook);
        this.controls.update();
      }
    }
  }

  private animate() {
    if (this.isDestroyed) return;
    this.animFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Cinematic Camera Tour mode
    if (this.config.cameraPreset === 'cinematicTour') {
      this.tourAngle += delta * 0.18;
      const radius = 145;
      const camY = 65 + Math.sin(this.tourAngle * 2.0) * 18;
      this.camera.position.x = Math.cos(this.tourAngle) * radius;
      this.camera.position.z = Math.sin(this.tourAngle) * radius;
      this.camera.position.y = camY;
      this.controls.target.set(0, 32 + Math.sin(this.tourAngle) * 8, 0);
    } else if (this.isTransitioningCamera) {
      // Smooth Camera Interpolation
      this.camera.position.lerp(this.targetCameraPos, delta * 3.5);
      this.controls.target.lerp(this.targetCameraLookAt, delta * 3.5);

      if (
        this.camera.position.distanceTo(this.targetCameraPos) < 0.5 &&
        this.controls.target.distanceTo(this.targetCameraLookAt) < 0.5
      ) {
        this.camera.position.copy(this.targetCameraPos);
        this.controls.target.copy(this.targetCameraLookAt);
        this.isTransitioningCamera = false;
      }
    }

    this.controls.update();

    // 2. Update Subsystems
    this.waterfallSystem.update(delta, this.config);
    this.cloudSystem.update(delta, this.config);
    this.atmosphereSystem.update(delta, this.config);
    this.skyLighting.update(delta, this.camera);

    // 3. Render
    this.renderer.render(this.scene, this.camera);

    // 4. Calculate FPS
    this.calculateFps();
  }

  private calculateFps() {
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsTime >= 1000) {
      this.currentFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
      this.frameCount = 0;
      this.lastFpsTime = now;
      this.reportStats();
    }
  }

  private reportStats() {
    if (!this.statsCallback || !this.currentMeshResult || !this.currentTerrainData) return;

    this.statsCallback({
      gridSize: this.config.gridSize,
      voxelCount: this.currentMeshResult.voxelCount,
      faceCount: this.currentMeshResult.faceCount,
      treeCount: this.currentTerrainData.trees.length,
      waterVoxelCount: Math.round(this.currentMeshResult.voxelCount * 0.18),
      cloudVoxelCount: this.cloudSystem.getCloudCount(),
      fps: this.currentFps,
    });
  }

  public onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public captureScreenshot(): string {
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
  }

  public exportScreenshot(): string {
    return this.captureScreenshot();
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);

    if (this.currentMeshResult) {
      this.scene.remove(this.currentMeshResult.solidMesh);
      this.scene.remove(this.currentMeshResult.waterMesh);
      this.scene.remove(this.currentMeshResult.lanternMesh);
      this.currentMeshResult.solidMesh.geometry.dispose();
      this.currentMeshResult.waterMesh.geometry.dispose();
      this.currentMeshResult.lanternMesh.geometry.dispose();
    }

    this.waterfallSystem.destroy();
    this.cloudSystem.destroy();
    this.atmosphereSystem.destroy();
    this.skyLighting.destroy();

    this.controls.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
