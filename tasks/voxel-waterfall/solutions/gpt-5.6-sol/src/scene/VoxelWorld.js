import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { createTerrainLodMap, generateHeightMap, generateWaterfallPaths, GRID_SIZE } from './terrain.js';
import {
  createCloudMesh,
  createLake,
  createSky,
  createTerrainMesh,
  createVegetationMeshes,
  createWaterfallMeshes,
  updateFlowParticles,
} from './voxelMeshes.js';

export const SCENE_PRESETS = {
  dawn: {
    bottom: 0xc0b9a5,
    exposure: 1.12,
    fog: 0xa8afa1,
    fogDensity: 0.0062,
    groundLight: 0x40514b,
    skyLight: 0xcad9ca,
    sun: 0xffc27d,
    sunIntensity: 2.65,
    sunPosition: [-78, 74, 48],
    top: 0x365964,
  },
  daylight: {
    bottom: 0xb9ccc4,
    exposure: 1.02,
    fog: 0xa7bdb8,
    fogDensity: 0.0052,
    groundLight: 0x45604f,
    skyLight: 0xd5e5dc,
    sun: 0xffefd1,
    sunIntensity: 2.35,
    sunPosition: [-55, 105, 72],
    top: 0x416f7a,
  },
  dusk: {
    bottom: 0xb69684,
    exposure: 1.06,
    fog: 0x9b8d87,
    fogDensity: 0.0068,
    groundLight: 0x3d4142,
    skyLight: 0xb8a79e,
    sun: 0xff956b,
    sunIntensity: 2.9,
    sunPosition: [82, 55, 28],
    top: 0x343f54,
  },
};

export const DEFAULT_SETTINGS = {
  autoRotate: true,
  cloudAltitude: 25,
  cloudCoverage: 0.78,
  mist: true,
  orbitSpeed: 0.55,
  preset: 'dawn',
  vegetation: 0.78,
  waterfallSpeed: 0.86,
  waterfalls: true,
};

function getMinimumPixelRatio(width, height) {
  return Math.max(
    0.22,
    Math.min(0.45, 330 / Math.max(1, width), 206 / Math.max(1, height)),
  );
}

export class VoxelWorld {
  constructor(canvas, settings = DEFAULT_SETTINGS, onStats = () => {}) {
    this.canvas = canvas;
    this.onStats = onStats;
    this.settings = { ...DEFAULT_SETTINGS, ...settings };
    this.disposed = false;
    this.elapsed = 0;
    this.framesSinceSample = 0;
    this.lastSampleTime = performance.now();
    this.lastRenderTime = Number.NEGATIVE_INFINITY;
    this.renderInterval = 16;
    this.highFpsSamples = 0;
    this.maxPixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);
    this.minPixelRatio = getMinimumPixelRatio(canvas.clientWidth, canvas.clientHeight);
    this.pixelRatio = this.maxPixelRatio;
    this.usingTerrainLod = false;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 900);
    this.renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      canvas,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.setPixelRatio(this.pixelRatio);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.045;
    this.controls.enablePan = false;
    this.controls.maxDistance = 280;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 48;
    this.controls.minPolarAngle = Math.PI * 0.18;
    this.controls.zoomToCursor = true;
    this.controls.listenToKeyEvents(window);

    this.resetCamera();
    this.buildScene();
    this.resize();
    this.updateSettings(this.settings);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    this.renderer.setAnimationLoop(this.animate);
  }

  buildScene() {
    this.heightMap = generateHeightMap();
    this.terrainLodMap = createTerrainLodMap(this.heightMap);
    this.waterfallPaths = generateWaterfallPaths(this.heightMap);
    this.waterfallPathsLod = generateWaterfallPaths(this.terrainLodMap);

    const sky = createSky();
    this.skyUniforms = sky.uniforms;
    this.scene.add(sky.sky, createLake());

    this.terrain = createTerrainMesh(this.heightMap);
    this.terrainLod = createTerrainMesh(this.terrainLodMap, 4);
    this.terrainLod.mesh.visible = false;
    this.scene.add(this.terrain.mesh, this.terrainLod.mesh);

    this.waterfalls = createWaterfallMeshes(this.heightMap, this.waterfallPaths);
    this.waterfallsLod = createWaterfallMeshes(this.terrainLodMap, this.waterfallPathsLod, 4);
    this.waterfallsLod.group.visible = false;
    this.scene.add(this.waterfalls.group, this.waterfallsLod.group);

    this.vegetation = createVegetationMeshes(this.heightMap, this.waterfalls.pathCells);
    this.scene.add(this.vegetation.group);

    this.clouds = createCloudMesh();
    this.cloudGroup = new THREE.Group();
    this.cloudGroup.add(this.clouds.mesh);
    this.scene.add(this.cloudGroup);

    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x445044, 1.65);
    this.sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    this.scene.add(this.hemisphereLight, this.sunLight, this.sunLight.target);
  }

  applyPreset(name) {
    const preset = SCENE_PRESETS[name] ?? SCENE_PRESETS.dawn;
    this.renderer.toneMappingExposure = preset.exposure;
    this.skyUniforms.topColor.value.set(preset.top);
    this.skyUniforms.bottomColor.value.set(preset.bottom);
    this.hemisphereLight.color.set(preset.skyLight);
    this.hemisphereLight.groundColor.set(preset.groundLight);
    this.sunLight.color.set(preset.sun);
    this.sunLight.intensity = preset.sunIntensity;
    this.sunLight.position.set(...preset.sunPosition);
    this.sunLight.target.position.set(0, 16, 0);
    this.scene.fog = new THREE.FogExp2(
      preset.fog,
      this.settings.mist ? preset.fogDensity : preset.fogDensity * 0.36,
    );
  }

  updateSettings(nextSettings) {
    const lightingChanged =
      !this.scene.fog ||
      ('preset' in nextSettings && nextSettings.preset !== this.settings.preset) ||
      ('mist' in nextSettings && nextSettings.mist !== this.settings.mist);
    this.settings = { ...this.settings, ...nextSettings };
    this.controls.autoRotate = this.settings.autoRotate;
    this.controls.autoRotateSpeed = this.settings.orbitSpeed;
    const cloudFactor = this.usingTerrainLod ? 0.58 : 1;
    this.clouds.mesh.count = Math.max(
      1,
      Math.round(this.clouds.maxCount * this.settings.cloudCoverage * cloudFactor),
    );
    this.clouds.mesh.computeBoundingSphere();
    this.cloudGroup.position.y = this.settings.cloudAltitude;
    const treeFactor = this.usingTerrainLod ? 0.42 : 1;
    const treeCount = Math.round(this.vegetation.maxTrees * this.settings.vegetation * treeFactor);
    this.vegetation.trunks.count = treeCount;
    this.vegetation.leaves.count = treeCount;
    this.waterfalls.group.visible = this.settings.waterfalls && !this.usingTerrainLod;
    this.waterfallsLod.group.visible = this.settings.waterfalls && this.usingTerrainLod;
    if (lightingChanged) this.applyPreset(this.settings.preset);
  }

  resetCamera() {
    const aspect = this.canvas.clientWidth / Math.max(1, this.canvas.clientHeight);
    const framingScale = aspect < 0.8 ? 1.25 : 1;
    this.camera.position.set(
      112 * framingScale,
      70 + (framingScale - 1) * 28,
      120 * framingScale,
    );
    this.controls.target.set(0, 19, 0);
    this.controls.update();
  }

  resize() {
    if (this.disposed) return;
    const width = Math.max(1, this.canvas.clientWidth);
    const height = Math.max(1, this.canvas.clientHeight);
    this.minPixelRatio = getMinimumPixelRatio(width, height);
    if (this.pixelRatio < this.minPixelRatio) {
      this.pixelRatio = this.minPixelRatio;
      this.renderer.setPixelRatio(this.pixelRatio);
    }
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate(timestamp) {
    if (this.disposed || timestamp - this.lastRenderTime < this.renderInterval) return;
    this.lastRenderTime = timestamp;
    const delta = Math.min(this.clock.getDelta(), 0.05);
    this.elapsed += delta;
    this.cloudGroup.rotation.y += delta * 0.0065;
    this.cloudGroup.position.y = this.settings.cloudAltitude + Math.sin(this.elapsed * 0.18) * 0.42;
    const activeWaterfalls = this.usingTerrainLod ? this.waterfallsLod : this.waterfalls;
    activeWaterfalls.material.emissiveIntensity = 0.46 + Math.sin(this.elapsed * 2.2) * 0.08;
    updateFlowParticles(
      this.waterfalls.particles,
      this.elapsed,
      this.settings.waterfallSpeed,
      this.settings.waterfalls && !this.usingTerrainLod,
    );
    updateFlowParticles(
      this.waterfallsLod.particles,
      this.elapsed,
      this.settings.waterfallSpeed,
      this.settings.waterfalls && this.usingTerrainLod,
    );
    this.controls.update(delta);
    this.renderer.render(this.scene, this.camera);
    this.canvas.dataset.sceneReady = 'true';
    this.sampleStats();
  }

  sampleStats() {
    this.framesSinceSample += 1;
    const now = performance.now();
    const sampleDuration = now - this.lastSampleTime;
    if (sampleDuration < 1000) return;

    const fps = Math.round((this.framesSinceSample * 1000) / sampleDuration);
    const stats = {
      cloudVoxels: this.clouds.mesh.count,
      drawCalls: this.renderer.info.render.calls,
      fps,
      gridSize: GRID_SIZE,
      terrainLevel: this.usingTerrainLod ? 'adaptive' : 'full',
      renderScale: this.pixelRatio,
      terrainVoxels: this.terrain.instanceCount,
      trees: this.vegetation.trunks.count,
      triangles: this.renderer.info.render.triangles,
      waterfallVoxels: (this.usingTerrainLod ? this.waterfallsLod : this.waterfalls).water.count,
    };
    window.__VOXEL_WORLD_STATS__ = stats;
    this.onStats(stats);
    this.adjustRenderScale(fps);
    this.framesSinceSample = 0;
    this.lastSampleTime = now;
  }

  adjustRenderScale(fps) {
    let nextPixelRatio = this.pixelRatio;
    if (fps < 28 && this.pixelRatio > this.minPixelRatio) {
      nextPixelRatio = Math.max(this.minPixelRatio, this.pixelRatio - 0.15);
      this.highFpsSamples = 0;
    } else if (fps < 28 && !this.usingTerrainLod) {
      this.enableAdaptiveLod();
      this.highFpsSamples = 0;
    } else if (fps > 38 && this.pixelRatio < this.maxPixelRatio) {
      this.highFpsSamples += 1;
      if (this.highFpsSamples >= 5) {
        nextPixelRatio = Math.min(this.maxPixelRatio, this.pixelRatio + 0.1);
        this.highFpsSamples = 0;
      }
    } else {
      this.highFpsSamples = 0;
    }

    if (nextPixelRatio !== this.pixelRatio) {
      this.pixelRatio = nextPixelRatio;
      this.renderer.setPixelRatio(this.pixelRatio);
      this.resize();
    }
  }

  enableAdaptiveLod() {
    this.usingTerrainLod = true;
    this.terrain.mesh.visible = false;
    this.terrainLod.mesh.visible = true;
    this.updateSettings({});
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.resizeObserver.disconnect();
    this.controls.stopListenToKeyEvents();
    this.controls.dispose();

    const geometries = new Set();
    const materials = new Set();
    this.scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (Array.isArray(object.material)) object.material.forEach((material) => materials.add(material));
      else if (object.material) materials.add(object.material);
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    this.renderer.dispose();
    this.canvas.removeAttribute('data-scene-ready');
    if (window.__VOXEL_WORLD_STATS__) delete window.__VOXEL_WORLD_STATS__;
  }
}
