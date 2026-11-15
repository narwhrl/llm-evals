import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import fullscreenVert from '../shaders/fullscreen.vert.glsl?raw';
import raytraceFrag from '../shaders/raytrace.frag.glsl?raw';
import prefilterFrag from '../shaders/bloomPrefilter.frag.glsl?raw';
import blurFrag from '../shaders/bloomBlur.frag.glsl?raw';
import compositeFrag from '../shaders/composite.frag.glsl?raw';

import { QUALITY_PROFILES, DEFAULT_PARAMS, PRESETS } from '../state/config.js';

const DEG2RAD = Math.PI / 180;
const BLOOM_LEVELS = 3;

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

/**
 * Owns the WebGL context, the fullscreen shader passes, the OrbitControls
 * camera and the cinematic camera loop.  React only talks to it through the
 * small imperative API below.
 */
export class GargantuaRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.onStatus = options.onStatus || (() => {});
    this.onCameraChange = options.onCameraChange || (() => {});
    this.onUserInteraction = options.onUserInteraction || (() => {});
    this.onFirstFrame = options.onFirstFrame || (() => {});
    this.firstFrameDone = false;

    this.params = { ...DEFAULT_PARAMS };
    this.quality = 'high';
    this.profile = QUALITY_PROFILES.high;
    this.debug = 0;
    this.time = 0;
    this.cinematic = true;
    this.capture = false;
    this.contextLost = false;
    this.ready = false;
    this.running = false;
    this.rafId = 0;
    this.lastFrame = 0;
    this.fps = 0;
    this.cineTime = 0;
    this.cineBase = { azimuth: this.params.cameraAzimuth, elevation: this.params.cameraElevation, distance: this.params.cameraDistance };
    this.internalWidth = 2;
    this.internalHeight = 2;
    this.displayWidth = 2;
    this.displayHeight = 2;
    this.lastStatusEmit = 0;

    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initMaterials();
    this.resize();
    this.bindEvents();
  }

  // ------------------------------------------------------------------ setup
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.autoClear = true;
    this.renderer.setClearColor(0x000000, 1);
  }

  initScene() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );
    this.passGeometry = geometry;
    this.passScene = new THREE.Scene();
    this.passMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
    this.passMesh.frustumCulled = false;
    this.passScene.add(this.passMesh);
    this.passCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(this.params.fov, 1, 0.05, 400);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.055;
    this.controls.rotateSpeed = 0.5;
    this.controls.zoomSpeed = 0.85;
    this.controls.panSpeed = 0.5;
    this.controls.enablePan = false;
    this.controls.minDistance = 3.2;
    this.controls.maxDistance = 80;
    this.controls.minPolarAngle = 0.17;
    this.controls.maxPolarAngle = Math.PI - 0.17;
    this.applyCameraParams(this.params);
    this.controls.update();
  }

  createRayUniforms() {
    return {
      uResolution: { value: new THREE.Vector2(2, 2) },
      uCamPos: { value: new THREE.Vector3(0, 0, 24) },
      uCamBasis: { value: new THREE.Matrix3() },
      uTanHalfFov: { value: Math.tan(this.params.fov * 0.5 * DEG2RAD) },
      uTime: { value: 0 },
      uDiskInner: { value: this.params.diskInner },
      uDiskOuter: { value: this.params.diskOuter },
      uDiskHalf: { value: this.params.diskHalfThickness },
      uDiskTemp: { value: this.params.diskTemperature },
      uDiskIntensity: { value: this.params.diskIntensity },
      uDiskSigma: { value: this.params.diskOpacity },
      uOrbitSpeed: { value: this.params.orbitSpeed },
      uTurbAmp: { value: this.params.turbulenceAmp },
      uTurbSpeed: { value: this.params.turbulenceSpeed },
      uStarDensity: { value: this.params.starDensity },
      uStarBrightness: { value: this.params.starBrightness },
      uGalaxyBright: { value: this.params.galaxyBrightness },
      uDebug: { value: 0 },
      uMaxSteps: { value: this.profile.maxSteps },
      uStepPhi: { value: this.profile.stepPhi },
      uStarLayers: { value: this.profile.starLayers },
    };
  }

  initMaterials() {
    this.rayUniforms = this.createRayUniforms();
    this.rayMaterial = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: fullscreenVert,
      fragmentShader: raytraceFrag,
      uniforms: this.rayUniforms,
      depthTest: false,
      depthWrite: false,
    });

    this.prefilterMaterial = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: fullscreenVert,
      fragmentShader: prefilterFrag,
      uniforms: {
        uSource: { value: null },
        uTexel: { value: new THREE.Vector2() },
        uThreshold: { value: 0.85 },
        uKnee: { value: 0.55 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.blurMaterial = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: fullscreenVert,
      fragmentShader: blurFrag,
      uniforms: {
        uSource: { value: null },
        uDirection: { value: new THREE.Vector2() },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.compositeMaterial = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: fullscreenVert,
      fragmentShader: compositeFrag,
      uniforms: {
        uHdr: { value: null },
        uBloom0: { value: null },
        uBloom1: { value: null },
        uBloom2: { value: null },
        uBloomWeights: { value: new THREE.Vector3(1, 0.72, 0.46) },
        uBloomStrength: { value: 0.62 },
        uExposure: { value: 1.15 },
        uVignette: { value: 0.42 },
        uGrain: { value: 0.32 },
        uChromatic: { value: 0.006 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(2, 2) },
        uDebug: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
  }

  createTargets(width, height) {
    const options = {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    };
    this.hdrTarget = new THREE.WebGLRenderTarget(width, height, options);
    this.bloomWork = [];
    this.bloomBlur = [];
    for (let i = 0; i < BLOOM_LEVELS; i++) {
      const divisor = 2 ** (i + 1);
      const w = Math.max(2, Math.floor(width / divisor));
      const h = Math.max(2, Math.floor(height / divisor));
      this.bloomWork.push(new THREE.WebGLRenderTarget(w, h, options));
      this.bloomBlur.push(new THREE.WebGLRenderTarget(w, h, options));
    }
  }

  disposeTargets() {
    if (this.hdrTarget) this.hdrTarget.dispose();
    if (this.bloomWork) this.bloomWork.forEach((t) => t.dispose());
    if (this.bloomBlur) this.bloomBlur.forEach((t) => t.dispose());
  }

  // ------------------------------------------------------------------ events
  bindEvents() {
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.onResize);

    this.onContextLost = (event) => {
      event.preventDefault();
      this.contextLost = true;
      this.emitStatus(true);
    };
    this.onContextRestored = () => {
      this.contextLost = false;
      this.rebuildResources();
      this.emitStatus(true);
    };
    this.canvas.addEventListener('webglcontextlost', this.onContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this.onContextRestored, false);

    this.onControlsChange = () => {
      this.onCameraChange(this.readCameraParams());
    };
    this.onControlsStart = () => {
      this.onUserInteraction();
    };
    this.controls.addEventListener('change', this.onControlsChange);
    this.controls.addEventListener('start', this.onControlsStart);
  }

  /**
   * Rebuilds every GPU resource after a WebGL context loss.  The application
   * state (parameters, camera, quality) is kept and re-applied.
   */
  rebuildResources() {
    this.disposeTargets();
    this.rayMaterial.dispose();
    this.prefilterMaterial.dispose();
    this.blurMaterial.dispose();
    this.compositeMaterial.dispose();
    this.initMaterials();
    this.applyParams(this.params);
    this.resize();
  }

  // ------------------------------------------------------------------ sizing
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.round(rect.width || this.canvas.clientWidth || 1));
    const cssHeight = Math.max(1, Math.round(rect.height || this.canvas.clientHeight || 1));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(cssWidth, cssHeight, false);

    this.displayWidth = cssWidth;
    this.displayHeight = cssHeight;

    let scale = this.profile.renderScale;
    let pixelWidth = cssWidth * dpr * scale;
    let pixelHeight = cssHeight * dpr * scale;
    const total = pixelWidth * pixelHeight;
    if (total > this.profile.maxPixels) {
      const factor = Math.sqrt(this.profile.maxPixels / total);
      pixelWidth *= factor;
      pixelHeight *= factor;
    }
    const width = Math.max(2, Math.floor(pixelWidth));
    const height = Math.max(2, Math.floor(pixelHeight));
    this.internalWidth = width;
    this.internalHeight = height;

    this.camera.aspect = cssWidth / cssHeight;
    this.camera.updateProjectionMatrix();

    if (!this.hdrTarget) {
      this.createTargets(width, height);
    } else {
      this.hdrTarget.setSize(width, height);
      for (let i = 0; i < BLOOM_LEVELS; i++) {
        const divisor = 2 ** (i + 1);
        const w = Math.max(2, Math.floor(width / divisor));
        const h = Math.max(2, Math.floor(height / divisor));
        this.bloomWork[i].setSize(w, h);
        this.bloomBlur[i].setSize(w, h);
      }
    }
    this.clearTargets();
    this.rayUniforms.uResolution.value.set(width, height);
    this.compositeMaterial.uniforms.uResolution.value.set(cssWidth * dpr, cssHeight * dpr);
  }

  clearTargets() {
    const previous = this.renderer.getRenderTarget();
    const targets = [this.hdrTarget, ...this.bloomWork, ...this.bloomBlur];
    for (const target of targets) {
      this.renderer.setRenderTarget(target);
      this.renderer.clear(true, false, false);
    }
    this.renderer.setRenderTarget(previous);
  }

  // ------------------------------------------------------------------ state
  applyParams(params) {
    this.params = { ...this.params, ...params };
    const p = this.params;
    const u = this.rayUniforms;
    u.uDiskInner.value = p.diskInner;
    u.uDiskOuter.value = p.diskOuter;
    u.uDiskHalf.value = p.diskHalfThickness;
    u.uDiskTemp.value = p.diskTemperature;
    u.uDiskIntensity.value = p.diskIntensity;
    u.uDiskSigma.value = p.diskOpacity;
    u.uOrbitSpeed.value = p.orbitSpeed;
    u.uTurbAmp.value = p.turbulenceAmp;
    u.uTurbSpeed.value = p.turbulenceSpeed;
    u.uStarDensity.value = p.starDensity;
    u.uStarBrightness.value = p.starBrightness;
    u.uGalaxyBright.value = p.galaxyBrightness;
    u.uTanHalfFov.value = Math.tan(p.fov * 0.5 * DEG2RAD);

    const c = this.compositeMaterial.uniforms;
    c.uBloomStrength.value = p.bloomStrength;
    c.uExposure.value = p.exposure;
    c.uVignette.value = p.vignette;
    c.uGrain.value = p.grain;
    c.uChromatic.value = p.chromatic;

    this.prefilterMaterial.uniforms.uThreshold.value = p.bloomThreshold;
  }

  setParams(params) {
    this.applyParams(params);
  }

  applyCameraParams(params) {
    if (!this.controls) return;
    const distance = clamp(params.cameraDistance, this.controls.minDistance, this.controls.maxDistance);
    const elevation = clamp(params.cameraElevation, -1.4, 1.4);
    const azimuth = clamp(params.cameraAzimuth, -Math.PI, Math.PI);
    const polar = clamp(Math.PI / 2 - elevation, this.controls.minPolarAngle, this.controls.maxPolarAngle);
    // Three.js spherical convention: phi is measured from +Z towards +X.
    const phi = Math.PI / 2 - azimuth;
    this.camera.position.setFromSphericalCoords(distance, phi, polar);
    this.camera.fov = params.fov;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  readCameraParams() {
    const p = this.camera.position;
    const distance = p.length() || 1;
    return {
      cameraDistance: distance,
      cameraAzimuth: Math.atan2(p.z, p.x),
      cameraElevation: Math.asin(clamp(p.y / distance, -1, 1)),
      fov: this.camera.fov,
    };
  }

  applyPreset(index) {
    const preset = PRESETS[index];
    if (!preset) return null;
    const next = {
      fov: preset.fov,
      cameraDistance: preset.cameraDistance,
      cameraAzimuth: preset.cameraAzimuth,
      cameraElevation: preset.cameraElevation,
    };
    this.applyCameraParams(next);
    this.cineBase = {
      azimuth: next.cameraAzimuth,
      elevation: next.cameraElevation,
      distance: next.cameraDistance,
    };
    this.cineTime = 0;
    return next;
  }

  setQuality(level) {
    if (!QUALITY_PROFILES[level]) return false;
    this.quality = level;
    this.profile = QUALITY_PROFILES[level];
    this.rayUniforms.uMaxSteps.value = this.profile.maxSteps;
    this.rayUniforms.uStepPhi.value = this.profile.stepPhi;
    this.rayUniforms.uStarLayers.value = this.profile.starLayers;
    const weights = level === 'standard' ? [1.0, 0.72, 0.0] : level === 'high' ? [1.0, 0.72, 0.46] : [1.0, 0.78, 0.52];
    this.compositeMaterial.uniforms.uBloomWeights.value.set(weights[0], weights[1], weights[2]);
    this.resize();
    return true;
  }

  setDebug(index) {
    this.debug = clamp(Math.round(index), 0, 9);
    this.rayUniforms.uDebug.value = this.debug;
    this.compositeMaterial.uniforms.uDebug.value = this.debug;
    return this.debug;
  }

  setTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return false;
    this.time = seconds;
    return true;
  }

  setCinematic(enabled) {
    this.cinematic = !!enabled;
    if (this.cinematic) {
      const cam = this.readCameraParams();
      this.cineBase = {
        azimuth: cam.cameraAzimuth,
        elevation: cam.cameraElevation,
        distance: cam.cameraDistance,
      };
      this.cineTime = 0;
    }
    return this.cinematic;
  }

  // ------------------------------------------------------------------ loop
  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrame = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  loop = (now) => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.loop);
    const dt = Math.min((now - this.lastFrame) / 1000, 0.1);
    this.lastFrame = now;
    if (dt > 0) this.fps = this.fps * 0.9 + (1 / dt) * 0.1;

    if (this.contextLost) {
      this.emitStatus();
      return;
    }

    if (this.cinematic && !this.capture) {
      this.cineTime += dt;
      const t = this.cineTime;
      this.applyCameraParams({
        fov: this.params.fov,
        cameraDistance: clamp(this.cineBase.distance + 5.0 * Math.sin(t * 0.021), 3.2, 80),
        cameraAzimuth: this.cineBase.azimuth + t * 0.075,
        cameraElevation: clamp(this.cineBase.elevation + 0.16 * Math.sin(t * 0.037), -1.4, 1.4),
      });
    }

    if (!this.capture) {
      this.time += dt * this.params.timeScale;
    }

    this.render();
    if (!this.firstFrameDone) {
      this.firstFrameDone = true;
      this.onFirstFrame();
    }
    this.emitStatus();
  };

  updateCameraUniforms() {
    const u = this.rayUniforms;
    u.uCamPos.value.copy(this.camera.position);
    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    const right = new THREE.Vector3(e[0], e[1], e[2]);
    const up = new THREE.Vector3(e[4], e[5], e[6]);
    const forward = new THREE.Vector3(-e[8], -e[9], -e[10]);
    u.uCamBasis.value.set(
      right.x, up.x, forward.x,
      right.y, up.y, forward.y,
      right.z, up.z, forward.z,
    );
    u.uTime.value = this.time;
    this.compositeMaterial.uniforms.uTime.value = this.time;
  }

  renderPass(material, target) {
    this.passMesh.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.passScene, this.passCamera);
  }

  render() {
    this.controls.update();
    this.updateCameraUniforms();

    // 1) geodesic raytracing pass (HDR)
    this.renderPass(this.rayMaterial, this.hdrTarget);

    // 2) bloom pyramid
    const levels = this.profile.bloomLevels;
    this.prefilterMaterial.uniforms.uSource.value = this.hdrTarget.texture;
    this.prefilterMaterial.uniforms.uTexel.value.set(1 / this.internalWidth, 1 / this.internalHeight);
    this.renderPass(this.prefilterMaterial, this.bloomWork[0]);
    for (let i = 0; i < levels; i++) {
      const src = this.bloomWork[i];
      const tmp = this.bloomBlur[i];
      this.blurMaterial.uniforms.uSource.value = src.texture;
      this.blurMaterial.uniforms.uDirection.value.set(1 / src.width, 0);
      this.renderPass(this.blurMaterial, tmp);
      this.blurMaterial.uniforms.uSource.value = tmp.texture;
      this.blurMaterial.uniforms.uDirection.value.set(0, 1 / tmp.height);
      this.renderPass(this.blurMaterial, src);
    }
    if (levels < BLOOM_LEVELS) {
      // keep the unused pyramid levels black
      for (let i = levels; i < BLOOM_LEVELS; i++) {
        this.renderer.setRenderTarget(this.bloomWork[i]);
        this.renderer.clear(true, false, false);
      }
    }

    // 3) composite to the canvas
    const c = this.compositeMaterial.uniforms;
    c.uHdr.value = this.hdrTarget.texture;
    c.uBloom0.value = this.bloomWork[0].texture;
    c.uBloom1.value = this.bloomWork[1].texture;
    c.uBloom2.value = this.bloomWork[2].texture;
    this.passMesh.material = this.compositeMaterial;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.passScene, this.passCamera);
  }

  emitStatus(force = false) {
    const now = performance.now();
    if (!force && now - this.lastStatusEmit < 120) return;
    this.lastStatusEmit = now;
    this.onStatus({
      fps: this.fps,
      contextLost: this.contextLost,
      cinematic: this.cinematic,
      debug: this.debug,
      quality: this.quality,
      internalWidth: this.internalWidth,
      internalHeight: this.internalHeight,
      time: this.time,
    });
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    if (this.controls) {
      this.controls.removeEventListener('change', this.onControlsChange);
      this.controls.removeEventListener('start', this.onControlsStart);
      this.controls.dispose();
    }
    this.disposeTargets();
    this.rayMaterial.dispose();
    this.prefilterMaterial.dispose();
    this.blurMaterial.dispose();
    this.compositeMaterial.dispose();
    this.passGeometry.dispose();
    this.renderer.dispose();
  }
}
