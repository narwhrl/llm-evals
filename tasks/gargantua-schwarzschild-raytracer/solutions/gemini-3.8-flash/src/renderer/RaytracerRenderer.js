// RaytracerRenderer.js - Orchestrates Three.js, shaders, OrbitControls, render targets & context loss
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  WebGLRenderTarget,
  RGBAFormat,
  HalfFloatType,
  LinearFilter,
  Vector2,
  Vector3,
  Matrix4
} from '@vendor/three.module.js';

import { OrbitControls } from '@vendor/OrbitControls.js';

import fullscreenVert from '../shaders/fullscreen.vert.glsl';
import raytracerFrag from '../shaders/raytracer.frag.glsl';
import bloomBlurFrag from '../shaders/bloomBlur.frag.glsl';
import compositeFrag from '../shaders/composite.frag.glsl';

import { QUALITY_TIERS, CAMERA_PRESETS } from '../contracts/stateDefaults.js';

export class RaytracerRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this.onFrameCallback = options.onFrame || null;
    this.onContextLostCallback = options.onContextLost || null;
    this.onContextRestoredCallback = options.onContextRestored || null;
    this.onCameraUserInteraction = options.onCameraUserInteraction || null;

    this.isContextLost = false;
    this.animationFrameId = null;
    this.clockTime = 0.0;
    this.frozenTime = null;
    this.lastTimestamp = performance.now();

    this.quality = options.quality || 'high';
    this.presetIndex = options.preset !== undefined ? options.preset : 0;
    this.debugMode = options.debug !== undefined ? options.debug : 0;
    this.cinematicOrbit = options.cinematicOrbit || false;

    // Cache current state parameters
    this.params = { ...(options.params || {}) };

    this.init();
  }

  init() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;

    // 1. WebGL Renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
      alpha: false
    });

    const tier = QUALITY_TIERS[this.quality] || QUALITY_TIERS.high;
    const dpr = Math.min(window.devicePixelRatio || 1.0, tier.maxDpr);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    // 2. Camera & OrbitControls
    this.camera = new PerspectiveCamera(this.params.uFov || 45.0, width / height, 0.1, 1000.0);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.8;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 0.8;
    this.controls.minDistance = 6.0;
    this.controls.maxDistance = 60.0;
    this.controls.target.set(0, 0, 0);

    // Yield auto-orbiting on user interaction
    this.controls.addEventListener('start', () => {
      if (this.onCameraUserInteraction) {
        this.onCameraUserInteraction();
      }
    });

    // 3. Orthographic Quad Camera and Fullscreen Mesh
    this.fsCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.fsGeometry = new PlaneGeometry(2, 2);

    // 4. Render Targets (HDR HalfFloat)
    this.buildRenderTargets(width * dpr * tier.resScale, height * dpr * tier.resScale);

    // 5. Shader Materials & Scenes
    this.buildMaterials();

    // 6. Apply initial camera preset
    this.applyPreset(this.presetIndex);

    // 7. Context Loss Listeners
    this.handleContextLost = (e) => {
      e.preventDefault();
      this.isContextLost = true;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.onContextLostCallback) {
        this.onContextLostCallback();
      }
    };

    this.handleContextRestored = () => {
      this.isContextLost = false;
      this.init();
      if (this.onContextRestoredCallback) {
        this.onContextRestoredCallback();
      }
      this.start();
    };

    this.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored, false);

    // Initial render
    this.renderFrame(0.016);
  }

  buildRenderTargets(w, h) {
    w = Math.max(Math.floor(w), 64);
    h = Math.max(Math.floor(h), 64);

    if (this.sceneRT) this.sceneRT.dispose();
    if (this.bloomRT1) this.bloomRT1.dispose();
    if (this.bloomRT2) this.bloomRT2.dispose();

    const rtParams = {
      type: HalfFloatType,
      format: RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
      stencilBuffer: false
    };

    this.sceneRT = new WebGLRenderTarget(w, h, rtParams);

    // Bloom at half resolution for performance and large blur radius
    const bw = Math.max(Math.floor(w * 0.5), 32);
    const bh = Math.max(Math.floor(h * 0.5), 32);
    this.bloomRT1 = new WebGLRenderTarget(bw, bh, rtParams);
    this.bloomRT2 = new WebGLRenderTarget(bw, bh, rtParams);
  }

  buildMaterials() {
    const tier = QUALITY_TIERS[this.quality] || QUALITY_TIERS.high;

    // 1. Raytracer Pass
    this.raytracerMaterial = new ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: raytracerFrag,
      uniforms: {
        uCameraPos: { value: new Vector3() },
        uCameraWorldMatrix: { value: new Matrix4() },
        uFov: { value: this.params.uFov || 45.0 },
        uResolution: { value: new Vector2(this.sceneRT.width, this.sceneRT.height) },
        uTime: { value: 0.0 },
        uMaxSteps: { value: tier.maxSteps },
        uDebugMode: { value: this.debugMode },

        // Accretion disk & physics
        uDiskInner: { value: this.params.uDiskInner || 2.6 },
        uDiskOuter: { value: this.params.uDiskOuter || 12.5 },
        uDiskThickness: { value: this.params.uDiskThickness || 0.08 },
        uDiskTemp: { value: this.params.uDiskTemp || 6500.0 },
        uDiskEmission: { value: this.params.uDiskEmission || 1.5 },
        uVelocityFactor: { value: this.params.uVelocityFactor || 1.0 },
        uTurbAmp: { value: this.params.uTurbAmp || 0.85 },
        uTurbSpeed: { value: this.params.uTurbSpeed || 1.0 },

        // Environment
        uStarDensity: { value: this.params.uStarDensity || 1.0 },
        uGalaxyBrightness: { value: this.params.uGalaxyBrightness || 1.3 }
      },
      depthWrite: false,
      depthTest: false
    });

    this.raytracerMesh = new Mesh(this.fsGeometry, this.raytracerMaterial);
    this.raytracerScene = new Scene();
    this.raytracerScene.add(this.raytracerMesh);

    // 2. Bloom Blur Pass
    this.bloomBlurMaterial = new ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: bloomBlurFrag,
      uniforms: {
        uTexture: { value: null },
        uDirection: { value: new Vector2(1.0, 0.0) },
        uResolution: { value: new Vector2(this.bloomRT1.width, this.bloomRT1.height) },
        uThreshold: { value: this.params.uBloomThreshold || 0.8 },
        uExtractThreshold: { value: false }
      },
      depthWrite: false,
      depthTest: false
    });
    this.bloomMesh = new Mesh(this.fsGeometry, this.bloomBlurMaterial);
    this.bloomScene = new Scene();
    this.bloomScene.add(this.bloomMesh);

    // 3. Composite Pass
    this.compositeMaterial = new ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: compositeFrag,
      uniforms: {
        uSceneTexture: { value: this.sceneRT.texture },
        uBloomTexture: { value: this.bloomRT1.texture },
        uDebugMode: { value: this.debugMode },
        uBloomStrength: { value: this.params.uBloomStrength || 0.85 },
        uExposure: { value: this.params.uExposure || 1.0 },
        uVignetteStrength: { value: this.params.uVignetteStrength || 0.35 },
        uGrainStrength: { value: this.params.uGrainStrength || 0.035 },
        uChromaticAberration: { value: this.params.uChromaticAberration || 0.003 },
        uTime: { value: 0.0 }
      },
      depthWrite: false,
      depthTest: false
    });
    this.compositeMesh = new Mesh(this.fsGeometry, this.compositeMaterial);
    this.compositeScene = new Scene();
    this.compositeScene.add(this.compositeMesh);
  }

  setQuality(level) {
    if (!QUALITY_TIERS[level]) return;
    this.quality = level;
    const tier = QUALITY_TIERS[level];
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1.0, tier.maxDpr);

    this.renderer.setPixelRatio(dpr);
    this.buildRenderTargets(width * dpr * tier.resScale, height * dpr * tier.resScale);

    this.raytracerMaterial.uniforms.uMaxSteps.value = tier.maxSteps;
    this.raytracerMaterial.uniforms.uResolution.value.set(this.sceneRT.width, this.sceneRT.height);
    this.bloomBlurMaterial.uniforms.uResolution.value.set(this.bloomRT1.width, this.bloomRT1.height);
    this.compositeMaterial.uniforms.uSceneTexture.value = this.sceneRT.texture;
    this.compositeMaterial.uniforms.uBloomTexture.value = this.bloomRT1.texture;

    this.renderFrame(0.016);
  }

  setDebug(mode) {
    this.debugMode = mode;
    if (this.raytracerMaterial) {
      this.raytracerMaterial.uniforms.uDebugMode.value = mode;
    }
    if (this.compositeMaterial) {
      this.compositeMaterial.uniforms.uDebugMode.value = mode;
    }
    this.renderFrame(0.016);
  }

  setTime(seconds) {
    this.frozenTime = seconds;
    this.clockTime = seconds;
    if (this.raytracerMaterial) {
      this.raytracerMaterial.uniforms.uTime.value = seconds;
    }
    if (this.compositeMaterial) {
      this.compositeMaterial.uniforms.uTime.value = seconds;
    }
    this.renderFrame(0.016);
  }

  setCinematicOrbit(enabled) {
    this.cinematicOrbit = enabled;
  }

  applyPreset(index) {
    const preset = CAMERA_PRESETS[index];
    if (!preset) return;
    this.presetIndex = index;

    const radAzimuth = (preset.azimuth * Math.PI) / 180.0;
    const radElevation = (preset.elevation * Math.PI) / 180.0;
    const dist = preset.distance;

    const x = dist * Math.cos(radElevation) * Math.sin(radAzimuth);
    const y = dist * Math.sin(radElevation);
    const z = dist * Math.cos(radElevation) * Math.cos(radAzimuth);

    this.camera.position.set(x, y, z);
    this.camera.fov = preset.fov;
    this.camera.updateProjectionMatrix();

    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Synchronize parameter mirrors
    this.params.cameraDist = dist;
    this.params.cameraAzimuth = preset.azimuth;
    this.params.cameraElevation = preset.elevation;
    this.params.uFov = preset.fov;

    if (this.raytracerMaterial) {
      this.raytracerMaterial.uniforms.uFov.value = preset.fov;
    }
    this.renderFrame(0.016);
  }

  updateCameraFromSpherical(dist, azimuthDeg, elevationDeg) {
    const radAzimuth = (azimuthDeg * Math.PI) / 180.0;
    const radElevation = (elevationDeg * Math.PI) / 180.0;

    const x = dist * Math.cos(radElevation) * Math.sin(radAzimuth);
    const y = dist * Math.sin(radElevation);
    const z = dist * Math.cos(radElevation) * Math.cos(radAzimuth);

    this.camera.position.set(x, y, z);
    this.controls.update();
  }

  updateParameter(paramId, value) {
    this.params[paramId] = value;

    if (paramId === 'cameraDist' || paramId === 'cameraAzimuth' || paramId === 'cameraElevation') {
      this.updateCameraFromSpherical(
        this.params.cameraDist,
        this.params.cameraAzimuth,
        this.params.cameraElevation
      );
      return;
    }

    if (paramId === 'uFov') {
      this.camera.fov = value;
      this.camera.updateProjectionMatrix();
      if (this.raytracerMaterial) {
        this.raytracerMaterial.uniforms.uFov.value = value;
      }
      return;
    }

    if (this.raytracerMaterial && this.raytracerMaterial.uniforms[paramId]) {
      this.raytracerMaterial.uniforms[paramId].value = value;
    }

    if (this.compositeMaterial && this.compositeMaterial.uniforms[paramId]) {
      this.compositeMaterial.uniforms[paramId].value = value;
    }

    if (paramId === 'uBloomThreshold' && this.bloomBlurMaterial) {
      this.bloomBlurMaterial.uniforms.uThreshold.value = value;
    }
  }

  resize() {
    if (this.isContextLost || !this.renderer) return;

    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const tier = QUALITY_TIERS[this.quality] || QUALITY_TIERS.high;
    const dpr = Math.min(window.devicePixelRatio || 1.0, tier.maxDpr);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    this.buildRenderTargets(width * dpr * tier.resScale, height * dpr * tier.resScale);

    this.raytracerMaterial.uniforms.uResolution.value.set(this.sceneRT.width, this.sceneRT.height);
    this.bloomBlurMaterial.uniforms.uResolution.value.set(this.bloomRT1.width, this.bloomRT1.height);
    this.compositeMaterial.uniforms.uSceneTexture.value = this.sceneRT.texture;
    this.compositeMaterial.uniforms.uBloomTexture.value = this.bloomRT1.texture;

    this.renderFrame(0.016);
  }

  renderFrame(dt) {
    if (this.isContextLost || !this.renderer) return;

    // Advance simulation time
    if (this.frozenTime === null) {
      const timeScale = this.params.uTimeScale !== undefined ? this.params.uTimeScale : 1.0;
      this.clockTime += dt * timeScale;
    } else {
      this.clockTime = this.frozenTime;
    }

    // Cinematic orbiting around black hole when enabled
    if (this.cinematicOrbit && this.frozenTime === null) {
      const speed = 0.12 * dt;
      const x = this.camera.position.x;
      const z = this.camera.position.z;
      const cosA = Math.cos(speed);
      const sinA = Math.sin(speed);
      this.camera.position.x = x * cosA - z * sinA;
      this.camera.position.z = x * sinA + z * cosA;
      this.controls.update();

      // Mirror azimuth back into state
      const currentDist = this.camera.position.length();
      const currentElev = Math.asin(this.camera.position.y / Math.max(currentDist, 0.001)) * (180 / Math.PI);
      const currentAzim = Math.atan2(this.camera.position.x, this.camera.position.z) * (180 / Math.PI);
      this.params.cameraDist = Math.round(currentDist * 10) / 10;
      this.params.cameraElevation = Math.round(currentElev);
      this.params.cameraAzimuth = Math.round(currentAzim);
    } else {
      this.controls.update();
      const currentDist = this.camera.position.length();
      const currentElev = Math.asin(this.camera.position.y / Math.max(currentDist, 0.001)) * (180 / Math.PI);
      const currentAzim = Math.atan2(this.camera.position.x, this.camera.position.z) * (180 / Math.PI);
      this.params.cameraDist = Math.round(currentDist * 10) / 10;
      this.params.cameraElevation = Math.round(currentElev);
      this.params.cameraAzimuth = Math.round(currentAzim);
    }

    // Camera matrix updates
    this.camera.updateMatrixWorld();
    this.raytracerMaterial.uniforms.uCameraPos.value.copy(this.camera.position);
    this.raytracerMaterial.uniforms.uCameraWorldMatrix.value.copy(this.camera.matrixWorld);
    this.raytracerMaterial.uniforms.uTime.value = this.clockTime;
    this.compositeMaterial.uniforms.uTime.value = this.clockTime;

    // --- PASS 1: Raytracer Core ---
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.render(this.raytracerScene, this.fsCamera);

    // If in debug mode, composite pass skips bloom and outputs directly
    if (this.debugMode === 0) {
      // --- PASS 2: HDR Bloom (Ping-Pong Separable Gaussian Blur) ---
      const tier = QUALITY_TIERS[this.quality] || QUALITY_TIERS.high;
      const passes = tier.bloomPasses;

      // Extract bright threshold into bloomRT1
      this.bloomBlurMaterial.uniforms.uExtractThreshold.value = true;
      this.bloomBlurMaterial.uniforms.uTexture.value = this.sceneRT.texture;
      this.bloomBlurMaterial.uniforms.uDirection.value.set(1.0, 0.0);
      this.renderer.setRenderTarget(this.bloomRT1);
      this.renderer.render(this.bloomScene, this.fsCamera);

      this.bloomBlurMaterial.uniforms.uExtractThreshold.value = false;

      for (let i = 0; i < passes; i++) {
        // Vertical blur into bloomRT2
        this.bloomBlurMaterial.uniforms.uTexture.value = this.bloomRT1.texture;
        this.bloomBlurMaterial.uniforms.uDirection.value.set(0.0, 1.0);
        this.renderer.setRenderTarget(this.bloomRT2);
        this.renderer.render(this.bloomScene, this.fsCamera);

        // Horizontal blur back into bloomRT1
        this.bloomBlurMaterial.uniforms.uTexture.value = this.bloomRT2.texture;
        this.bloomBlurMaterial.uniforms.uDirection.value.set(1.0, 0.0);
        this.renderer.setRenderTarget(this.bloomRT1);
        this.renderer.render(this.bloomScene, this.fsCamera);
      }
    }

    // --- PASS 3: Composite Pass (Bloom + ACES + Post) onto Canvas ---
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.compositeScene, this.fsCamera);
  }

  start() {
    this.lastTimestamp = performance.now();
    const animate = (timestamp) => {
      this.animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min((timestamp - this.lastTimestamp) / 1000.0, 0.1);
      this.lastTimestamp = timestamp;

      this.renderFrame(dt);

      if (this.onFrameCallback) {
        this.onFrameCallback(this.clockTime, dt);
      }
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  dispose() {
    this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.handleContextRestored);
    if (this.controls) this.controls.dispose();
    if (this.sceneRT) this.sceneRT.dispose();
    if (this.bloomRT1) this.bloomRT1.dispose();
    if (this.bloomRT2) this.bloomRT2.dispose();
    if (this.renderer) this.renderer.dispose();
  }
}
