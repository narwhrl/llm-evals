import * as THREE from 'three';
import { OrbitControls } from '../../vendor/three/addons/controls/OrbitControls.js';
import {
  DEBUG_MODES,
  PRESETS,
  QUALITY_LEVELS,
  QUALITY_PROFILES,
  STORAGE_VERSION,
  clampParam,
  sanitizeParams,
} from '../config/constants.js';
import {
  FULLSCREEN_VERTEX_SHADER,
  SCHWARZSCHILD_FRAGMENT_SHADER,
} from '../shaders/schwarzschild.glsl.js';
import {
  BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
  BLOOM_PREFILTER_FRAGMENT_SHADER,
  BLOOM_UPSAMPLE_FRAGMENT_SHADER,
  COMPOSITE_FRAGMENT_SHADER,
} from '../shaders/postprocess.glsl.js';

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function normalizeAzimuthDeg(deg) {
  let d = ((deg + 180) % 360 + 360) % 360 - 180;
  if (d === -180) d = 180;
  return d;
}

function createFullscreenTriangleGeometry() {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
  const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return geo;
}

/**
 * Full-screen Three.js Schwarzschild Null-Geodesic Raytracing Engine.
 * - Uses Three.js PerspectiveCamera + OrbitControls as the authentic ray observer.
 * - Executes multi-pass HDR raytrace -> dual-filter Karis Bloom -> ACES filmic composite.
 * - Supports deterministic capture mode, dynamic quality budgets, and WebGL context recovery.
 */
export class GargantuaEngine {
  constructor(canvas, initialConfig, callbacks = {}) {
    this.canvas = canvas;
    this.callbacks = callbacks;

    this.captureMode = Boolean(initialConfig.captureMode);
    this.quality = QUALITY_LEVELS.includes(initialConfig.quality) ? initialConfig.quality : 'high';
    this.preset = Number.isInteger(initialConfig.preset) ? initialConfig.preset : 0;
    this.debugMode = Number.isInteger(initialConfig.debugMode) ? initialConfig.debugMode : 0;
    this.hudVisible = Boolean(initialConfig.hudVisible);
    this.hudExpanded = Boolean(initialConfig.hudExpanded);
    this.cinematicMode = this.captureMode ? false : Boolean(initialConfig.cinematicMode);
    this.audioEnabled = false;
    this.params = sanitizeParams(initialConfig.params);
    this.simTime = Number.isFinite(initialConfig.time) && initialConfig.time >= 0 ? initialConfig.time : 0;

    this.ready = false;
    this.contextLost = false;
    this.disposed = false;
    this.rafId = null;
    this.lastFrameMs = 0;
    this.fpsSamples = [];
    this.lastTelemetryEmitMs = 0;
    this.lastCameraUiSyncMs = 0;
    this.suppressControlSync = false;

    // Base angles for gentle cinematic orbital breathing
    this.cinematicPhase = 0;
    this.cinematicBaseElevation = this.params.cameraElevation;
    this.cinematicBaseDistance = this.params.cameraDistance;

    // Reusable camera basis vectors (zero per-frame allocations)
    this._camRight = new THREE.Vector3();
    this._camUp = new THREE.Vector3();
    this._camForward = new THREE.Vector3();
    this._spherical = new THREE.Spherical();
    this._orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.renderBudget = {
      viewportWidth: 1,
      viewportHeight: 1,
      dpr: 1,
      internalWidth: 1,
      internalHeight: 1,
      renderScale: 1,
      maxSteps: 220,
      diskSubSamples: 5,
      bloomMips: 4,
      hdrFormat: 'HalfFloat',
      fps: 0,
    };

    // Real Three.js PerspectiveCamera + OrbitControls
    this.camera = new THREE.PerspectiveCamera(this.params.fov, 1, 0.1, 1000);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.72;
    this.controls.zoomSpeed = 0.9;
    this.controls.minDistance = 6.5;
    this.controls.maxDistance = 40.0;
    this.controls.minPolarAngle = degToRad(8);
    this.controls.maxPolarAngle = degToRad(172);
    this.controls.target.set(0, 0, 0);

    this._onControlsStart = this._handleControlsStart.bind(this);
    this._onControlsChange = this._handleControlsChange.bind(this);
    this._onControlsEnd = this._handleControlsEnd.bind(this);
    this.controls.addEventListener('start', this._onControlsStart);
    this.controls.addEventListener('change', this._onControlsChange);
    this.controls.addEventListener('end', this._onControlsEnd);

    this._onResize = this.resize.bind(this);
    this._onContextLost = this._handleContextLost.bind(this);
    this._onContextRestored = this._handleContextRestored.bind(this);
    this._tick = this._loop.bind(this);

    window.addEventListener('resize', this._onResize);
    this.canvas.addEventListener('webglcontextlost', this._onContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._onContextRestored, false);

    // Apply initial camera position from state before GPU initialization
    this._applyCameraFromParams(true);

    // Build GPU resources, render initial deterministic frame, and expose automation hooks
    this._initGpuPipeline();
    this.resize();
    this.renderFrame();
    this._markReady(true);

    if (!this.captureMode) {
      this._startLoop();
    }
  }

  _initGpuPipeline() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    this.renderer.autoClear = false;
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;

    const gl = this.renderer.getContext();
    const supportsHalfFloatRT = Boolean(
      gl && (gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'))
    );
    this.rtType = supportsHalfFloatRT ? THREE.HalfFloatType : THREE.UnsignedByteType;
    this.renderBudget.hdrFormat = supportsHalfFloatRT ? 'RGBA16F' : 'RGBA8-Fallback';

    this.fsGeometry = createFullscreenTriangleGeometry();

    // Pass 1: Core Schwarzschild Null-Geodesic Fragment Shader
    this.raytraceMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: SCHWARZSCHILD_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3() },
        uCamUp: { value: new THREE.Vector3() },
        uCamForward: { value: new THREE.Vector3() },
        uTanHalfFov: { value: Math.tan(degToRad(this.params.fov * 0.5)) },
        uAspect: { value: 1.0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: this.simTime },
        uDebugMode: { value: this.debugMode },
        uMaxSteps: { value: QUALITY_PROFILES[this.quality].maxSteps },
        uStepScale: { value: QUALITY_PROFILES[this.quality].stepScale },
        uDiskSubSamples: { value: QUALITY_PROFILES[this.quality].diskSubSamples },
        uFbmOctaves: { value: QUALITY_PROFILES[this.quality].fbmOctaves },
        uStarLayers: { value: QUALITY_PROFILES[this.quality].starLayers },
        uDiskInner: { value: this.params.diskInnerRadius },
        uDiskOuter: { value: this.params.diskOuterRadius },
        uDiskHalfThickness: { value: this.params.diskHalfThickness },
        uDiskTemperature: { value: this.params.diskTemperature },
        uDiskEmission: { value: this.params.diskEmission },
        uOrbitalSpeedScale: { value: this.params.orbitalSpeedScale },
        uTurbulenceAmp: { value: this.params.turbulenceAmp },
        uTurbulenceSpeed: { value: this.params.turbulenceSpeed },
        uStarDensity: { value: this.params.starDensity },
        uGalaxyBrightness: { value: this.params.galaxyBrightness },
      },
    });
    this.raytraceScene = new THREE.Scene();
    this.raytraceScene.add(new THREE.Mesh(this.fsGeometry, this.raytraceMaterial));

    // Pass 2a: Bloom Soft-Knee Karis Prefilter
    this.bloomPrefilterMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_PREFILTER_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uSourceTex: { value: null },
        uTexelSize: { value: new THREE.Vector2(1, 1) },
        uThreshold: { value: this.params.bloomThreshold },
        uKnee: { value: 0.45 },
      },
    });
    this.bloomPrefilterScene = new THREE.Scene();
    this.bloomPrefilterScene.add(new THREE.Mesh(this.fsGeometry, this.bloomPrefilterMaterial));

    // Pass 2b: Bloom 13-tap Energy-Preserving Downsample
    this.bloomDownMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uSourceTex: { value: null },
        uTexelSize: { value: new THREE.Vector2(1, 1) },
      },
    });
    this.bloomDownScene = new THREE.Scene();
    this.bloomDownScene.add(new THREE.Mesh(this.fsGeometry, this.bloomDownMaterial));

    // Pass 2c: Bloom 9-tap Tent Filter Upsample
    this.bloomUpMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_UPSAMPLE_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uLowMipTex: { value: null },
        uHighMipTex: { value: null },
        uTexelSize: { value: new THREE.Vector2(1, 1) },
        uFilterRadius: { value: 1.15 },
      },
    });
    this.bloomUpScene = new THREE.Scene();
    this.bloomUpScene.add(new THREE.Mesh(this.fsGeometry, this.bloomUpMaterial));

    // Pass 3: Final Composite (Chromatic Aberration + Bloom + Exposure + ACES + Vignette + Grain)
    this.compositeMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: COMPOSITE_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uSceneTex: { value: null },
        uBloomTex: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uDebugMode: { value: this.debugMode },
        uBloomIntensity: { value: this.params.bloomIntensity },
        uExposure: { value: this.params.exposure },
        uVignetteIntensity: { value: this.params.vignetteIntensity },
        uGrainIntensity: { value: this.params.grainIntensity },
        uChromaticAberration: { value: this.params.chromaticAberration },
        uTime: { value: this.simTime },
      },
    });
    this.compositeScene = new THREE.Scene();
    this.compositeScene.add(new THREE.Mesh(this.fsGeometry, this.compositeMaterial));

    this.sceneTarget = null;
    this.bloomDownTargets = [];
    this.bloomUpTargets = [];
  }

  _disposeRenderTargets() {
    if (this.sceneTarget) {
      this.sceneTarget.dispose();
      this.sceneTarget = null;
    }
    for (const rt of this.bloomDownTargets) rt.dispose();
    for (const rt of this.bloomUpTargets) rt.dispose();
    this.bloomDownTargets = [];
    this.bloomUpTargets = [];
  }

  _disposeGpuPipeline() {
    this._disposeRenderTargets();
    if (this.raytraceMaterial) this.raytraceMaterial.dispose();
    if (this.bloomPrefilterMaterial) this.bloomPrefilterMaterial.dispose();
    if (this.bloomDownMaterial) this.bloomDownMaterial.dispose();
    if (this.bloomUpMaterial) this.bloomUpMaterial.dispose();
    if (this.compositeMaterial) this.compositeMaterial.dispose();
    if (this.fsGeometry) this.fsGeometry.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.raytraceMaterial = null;
    this.bloomPrefilterMaterial = null;
    this.bloomDownMaterial = null;
    this.bloomUpMaterial = null;
    this.compositeMaterial = null;
    this.fsGeometry = null;
  }

  _allocateRenderTargets(internalW, internalH, mipCount) {
    this._disposeRenderTargets();

    const rtOpts = {
      type: this.rtType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
    };

    this.sceneTarget = new THREE.WebGLRenderTarget(internalW, internalH, rtOpts);

    let mipW = Math.max(2, Math.floor(internalW * 0.5));
    let mipH = Math.max(2, Math.floor(internalH * 0.5));
    for (let i = 0; i < mipCount; i += 1) {
      this.bloomDownTargets.push(new THREE.WebGLRenderTarget(mipW, mipH, rtOpts));
      if (i < mipCount - 1) {
        this.bloomUpTargets.push(new THREE.WebGLRenderTarget(mipW, mipH, rtOpts));
      }
      mipW = Math.max(2, Math.floor(mipW * 0.5));
      mipH = Math.max(2, Math.floor(mipH * 0.5));
    }
  }

  resize() {
    if (this.disposed || this.contextLost || !this.renderer) return;
    const profile = QUALITY_PROFILES[this.quality];
    const cssWidth = Math.max(1, Math.floor(this.canvas.clientWidth || window.innerWidth));
    const cssHeight = Math.max(1, Math.floor(this.canvas.clientHeight || window.innerHeight));
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = Math.min(rawDpr, profile.maxDpr);

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(cssWidth, cssHeight, false);

    const backingW = Math.max(1, Math.floor(cssWidth * dpr));
    const backingH = Math.max(1, Math.floor(cssHeight * dpr));
    const internalW = Math.max(2, Math.floor(backingW * profile.renderScale));
    const internalH = Math.max(2, Math.floor(backingH * profile.renderScale));

    this.camera.aspect = cssWidth / cssHeight;
    this.camera.updateProjectionMatrix();

    this._allocateRenderTargets(internalW, internalH, profile.bloomMips);

    this.renderBudget = {
      ...this.renderBudget,
      viewportWidth: cssWidth,
      viewportHeight: cssHeight,
      dpr: Number(dpr.toFixed(2)),
      internalWidth: internalW,
      internalHeight: internalH,
      renderScale: profile.renderScale,
      maxSteps: profile.maxSteps,
      diskSubSamples: profile.diskSubSamples,
      bloomMips: profile.bloomMips,
    };

    if (this.callbacks.onTelemetry) {
      this.callbacks.onTelemetry({ ...this.renderBudget });
    }

    if (this.captureMode || !this.rafId) {
      this.renderFrame();
    }
  }

  _applyCameraFromParams(resetCinematicBase = false) {
    this.suppressControlSync = true;
    try {
      const dist = clampParam('cameraDistance', this.params.cameraDistance);
      const azDeg = clampParam('cameraAzimuth', this.params.cameraAzimuth);
      const elDeg = clampParam('cameraElevation', this.params.cameraElevation);
      const fov = clampParam('fov', this.params.fov);

      const phi = degToRad(90 - elDeg);
      const theta = degToRad(azDeg);
      this._spherical.set(dist, phi, theta);
      this.camera.position.setFromSpherical(this._spherical);
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(0, 0, 0);
      this.controls.target.set(0, 0, 0);
      this.controls.update();

      if (resetCinematicBase) {
        this.cinematicBaseElevation = elDeg;
        this.cinematicBaseDistance = dist;
        this.cinematicPhase = 0;
      }
    } finally {
      this.suppressControlSync = false;
    }
  }

  _syncParamsFromCamera(forceNotify = false) {
    this._spherical.setFromVector3(this.camera.position);
    const dist = clampParam('cameraDistance', Number(this._spherical.radius.toFixed(2)));
    const azDeg = clampParam('cameraAzimuth', Number(normalizeAzimuthDeg(radToDeg(this._spherical.theta)).toFixed(1)));
    const elDeg = clampParam('cameraElevation', Number((90 - radToDeg(this._spherical.phi)).toFixed(1)));

    this.params.cameraDistance = dist;
    this.params.cameraAzimuth = azDeg;
    this.params.cameraElevation = elDeg;
    this.params.fov = clampParam('fov', Number(this.camera.fov.toFixed(1)));

    const now = performance.now();
    if (forceNotify || now - this.lastCameraUiSyncMs > 75) {
      this.lastCameraUiSyncMs = now;
      if (this.callbacks.onCameraSync) {
        this.callbacks.onCameraSync({
          fov: this.params.fov,
          cameraDistance: dist,
          cameraAzimuth: azDeg,
          cameraElevation: elDeg,
          persist: forceNotify,
        });
      }
    }
  }

  _handleControlsStart() {
    // Yield cinematic camera immediately when user manually drags/zooms so user never loses control
    if (this.cinematicMode) {
      this.cinematicMode = false;
      if (this.callbacks.onCinematicChange) {
        this.callbacks.onCinematicChange(false);
      }
    }
  }

  _handleControlsChange() {
    if (this.suppressControlSync) return;
    this._syncParamsFromCamera(false);
    if (this.captureMode) {
      this.renderFrame();
    }
  }

  _handleControlsEnd() {
    if (this.suppressControlSync) return;
    this._syncParamsFromCamera(true);
    this.cinematicBaseElevation = this.params.cameraElevation;
    this.cinematicBaseDistance = this.params.cameraDistance;
  }

  _syncUniforms() {
    if (!this.raytraceMaterial || !this.compositeMaterial) return;
    const profile = QUALITY_PROFILES[this.quality];

    this.camera.updateMatrixWorld();
    this.camera.matrixWorld.extractBasis(this._camRight, this._camUp, this._camForward);
    this._camForward.negate().normalize();
    this._camRight.normalize();
    this._camUp.normalize();

    const u = this.raytraceMaterial.uniforms;
    u.uCamPos.value.copy(this.camera.position);
    u.uCamRight.value.copy(this._camRight);
    u.uCamUp.value.copy(this._camUp);
    u.uCamForward.value.copy(this._camForward);
    const baseTanHalfFov = Math.tan(degToRad(this.camera.fov * 0.5));
    // Portrait viewports widen vertical frustum subtly so the full black hole & accretion disk wings remain framed
    const portraitBoost = this.camera.aspect < 1.0 ? 1.0 / Math.pow(Math.max(this.camera.aspect, 0.45), 0.52) : 1.0;
    u.uTanHalfFov.value = baseTanHalfFov * portraitBoost;
    u.uAspect.value = this.camera.aspect;
    u.uResolution.value.set(this.renderBudget.internalWidth, this.renderBudget.internalHeight);

    u.uTime.value = this.simTime;
    u.uDebugMode.value = this.debugMode;
    u.uMaxSteps.value = profile.maxSteps;
    u.uStepScale.value = profile.stepScale;
    u.uDiskSubSamples.value = profile.diskSubSamples;
    u.uFbmOctaves.value = profile.fbmOctaves;
    u.uStarLayers.value = profile.starLayers;

    u.uDiskInner.value = this.params.diskInnerRadius;
    u.uDiskOuter.value = this.params.diskOuterRadius;
    u.uDiskHalfThickness.value = this.params.diskHalfThickness;
    u.uDiskTemperature.value = this.params.diskTemperature;
    u.uDiskEmission.value = this.params.diskEmission;
    u.uOrbitalSpeedScale.value = this.params.orbitalSpeedScale;
    u.uTurbulenceAmp.value = this.params.turbulenceAmp;
    u.uTurbulenceSpeed.value = this.params.turbulenceSpeed;
    u.uStarDensity.value = this.params.starDensity;
    u.uGalaxyBrightness.value = this.params.galaxyBrightness;

    this.bloomPrefilterMaterial.uniforms.uThreshold.value = this.params.bloomThreshold;

    const cu = this.compositeMaterial.uniforms;
    cu.uDebugMode.value = this.debugMode;
    cu.uBloomIntensity.value = this.params.bloomIntensity;
    cu.uExposure.value = this.params.exposure;
    cu.uVignetteIntensity.value = this.params.vignetteIntensity;
    cu.uGrainIntensity.value = this.params.grainIntensity;
    cu.uChromaticAberration.value = this.params.chromaticAberration;
    cu.uTime.value = this.simTime;
    cu.uResolution.value.set(
      this.renderBudget.viewportWidth * this.renderBudget.dpr,
      this.renderBudget.viewportHeight * this.renderBudget.dpr
    );
  }

  renderFrame() {
    if (this.disposed || this.contextLost || !this.renderer || !this.sceneTarget) return;

    this._syncUniforms();

    // 1. Render Schwarzschild Null-Geodesic Raytracer into HDR target
    this.renderer.setRenderTarget(this.sceneTarget);
    this.renderer.render(this.raytraceScene, this._orthoCamera);

    let bloomTex = this.sceneTarget.texture;

    // 2. Multi-mip Dual-Filter HDR Bloom (executed only in final composite mode 0)
    if (this.debugMode === 0 && this.bloomDownTargets.length > 0) {
      const mipCount = this.bloomDownTargets.length;

      // 2a. Soft-knee + Karis prefilter
      this.bloomPrefilterMaterial.uniforms.uSourceTex.value = this.sceneTarget.texture;
      this.bloomPrefilterMaterial.uniforms.uTexelSize.value.set(
        1 / this.sceneTarget.width,
        1 / this.sceneTarget.height
      );
      this.renderer.setRenderTarget(this.bloomDownTargets[0]);
      this.renderer.render(this.bloomPrefilterScene, this._orthoCamera);

      // 2b. Progressive 13-tap downsample
      for (let i = 1; i < mipCount; i += 1) {
        const src = this.bloomDownTargets[i - 1];
        const dst = this.bloomDownTargets[i];
        this.bloomDownMaterial.uniforms.uSourceTex.value = src.texture;
        this.bloomDownMaterial.uniforms.uTexelSize.value.set(1 / src.width, 1 / src.height);
        this.renderer.setRenderTarget(dst);
        this.renderer.render(this.bloomDownScene, this._orthoCamera);
      }

      // 2c. Progressive 9-tap tent upsample pyramid
      let prevTarget = this.bloomDownTargets[mipCount - 1];
      for (let i = mipCount - 2; i >= 0; i -= 1) {
        const highTarget = this.bloomDownTargets[i];
        const dstTarget = this.bloomUpTargets[i];
        this.bloomUpMaterial.uniforms.uLowMipTex.value = prevTarget.texture;
        this.bloomUpMaterial.uniforms.uHighMipTex.value = highTarget.texture;
        this.bloomUpMaterial.uniforms.uTexelSize.value.set(
          1 / prevTarget.width,
          1 / prevTarget.height
        );
        this.renderer.setRenderTarget(dstTarget);
        this.renderer.render(this.bloomUpScene, this._orthoCamera);
        prevTarget = dstTarget;
      }

      bloomTex = this.bloomUpTargets.length > 0
        ? this.bloomUpTargets[0].texture
        : this.bloomDownTargets[0].texture;
    }

    // 3. Final ACES + Optics Composite to screen canvas
    this.compositeMaterial.uniforms.uSceneTex.value = this.sceneTarget.texture;
    this.compositeMaterial.uniforms.uBloomTex.value = bloomTex;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.compositeScene, this._orthoCamera);
  }

  _startLoop() {
    if (this.rafId !== null || this.disposed || this.contextLost) return;
    this.lastFrameMs = performance.now();
    this.rafId = window.requestAnimationFrame(this._tick);
  }

  _stopLoop() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  _loop(nowMs) {
    if (this.disposed || this.contextLost) {
      this.rafId = null;
      return;
    }

    const dtSec = Math.min(Math.max((nowMs - this.lastFrameMs) * 0.001, 0), 0.1);
    this.lastFrameMs = nowMs;

    // Advance physics simulation clock
    if (!this.captureMode) {
      this.simTime += dtSec * this.params.timeScale;
    }

    // Advance smooth cinematic orbital camera when active
    if (this.cinematicMode && !this.captureMode) {
      this.cinematicPhase += dtSec;
      const nextAz = normalizeAzimuthDeg(this.params.cameraAzimuth + dtSec * 5.2);
      const nextEl = clampParam(
        'cameraElevation',
        this.cinematicBaseElevation + Math.sin(this.cinematicPhase * 0.24) * 5.8
      );
      const nextDist = clampParam(
        'cameraDistance',
        this.cinematicBaseDistance + Math.sin(this.cinematicPhase * 0.17) * 1.15
      );
      this.params.cameraAzimuth = Number(nextAz.toFixed(2));
      this.params.cameraElevation = Number(nextEl.toFixed(2));
      this.params.cameraDistance = Number(nextDist.toFixed(2));
      this._applyCameraFromParams(false);
    } else {
      this.controls.update();
    }

    this.renderFrame();

    // Track rolling FPS & emit light telemetry updates
    if (dtSec > 0.0005) {
      this.fpsSamples.push(1 / dtSec);
      if (this.fpsSamples.length > 24) this.fpsSamples.shift();
    }
    if (nowMs - this.lastTelemetryEmitMs > 320) {
      this.lastTelemetryEmitMs = nowMs;
      const avgFps =
        this.fpsSamples.length > 0
          ? Math.round(this.fpsSamples.reduce((a, b) => a + b, 0) / this.fpsSamples.length)
          : 0;
      this.renderBudget.fps = avgFps;
      if (this.callbacks.onTelemetry) {
        this.callbacks.onTelemetry({ ...this.renderBudget });
      }
      if (this.cinematicMode && this.callbacks.onCameraSync) {
        this.callbacks.onCameraSync({
          fov: this.params.fov,
          cameraDistance: Number(this.params.cameraDistance.toFixed(1)),
          cameraAzimuth: Number(this.params.cameraAzimuth.toFixed(1)),
          cameraElevation: Number(this.params.cameraElevation.toFixed(1)),
          persist: false,
        });
      }
    }

    this.rafId = window.requestAnimationFrame(this._tick);
  }

  _markReady(isReady) {
    this.ready = Boolean(isReady);
    document.documentElement.dataset.gargantuaReady = this.ready ? 'true' : 'false';
  }

  _handleContextLost(event) {
    event.preventDefault();
    this.contextLost = true;
    this._stopLoop();
    this._markReady(false);
    try {
      this._disposeGpuPipeline();
    } catch {
      // Ignore WebGL cleanup errors on an already-lost context
    }
    if (this.callbacks.onContextLostChange) {
      this.callbacks.onContextLostChange(true);
    }
  }

  _handleContextRestored() {
    if (this.disposed) return;
    try {
      this._initGpuPipeline();
      this.contextLost = false;
      this._applyCameraFromParams(false);
      this.resize();
      this.renderFrame();
      this._markReady(true);
      if (this.callbacks.onContextLostChange) {
        this.callbacks.onContextLostChange(false);
      }
      if (!this.captureMode) {
        this._startLoop();
      }
    } catch (err) {
      this.contextLost = true;
      this._markReady(false);
      if (this.callbacks.onError) {
        this.callbacks.onError(err);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Public State Control Methods (used by React HUD and window.__GARGANTUA__)
  // ---------------------------------------------------------------------------
  setQuality(level) {
    if (typeof level !== 'string' || !QUALITY_LEVELS.includes(level)) {
      return { ok: false, error: `Invalid quality level: ${String(level)}`, state: this.getState() };
    }
    this.quality = level;
    this.resize();
    this.renderFrame();
    return { ok: true, state: this.getState() };
  }

  setPreset(index) {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) {
      return { ok: false, error: `Invalid preset index: ${String(index)}`, state: this.getState() };
    }
    this.preset = index;
    const presetCam = PRESETS[index].camera;
    this.params.fov = presetCam.fov;
    this.params.cameraDistance = presetCam.cameraDistance;
    this.params.cameraAzimuth = presetCam.cameraAzimuth;
    this.params.cameraElevation = presetCam.cameraElevation;
    this._applyCameraFromParams(true);
    this.renderFrame();
    return { ok: true, state: this.getState() };
  }

  setDebug(index) {
    if (!Number.isInteger(index) || index < 0 || index >= DEBUG_MODES.length) {
      return { ok: false, error: `Invalid debug mode: ${String(index)}`, state: this.getState() };
    }
    this.debugMode = index;
    this.renderFrame();
    return { ok: true, state: this.getState() };
  }

  setTime(seconds) {
    if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
      return { ok: false, error: `Invalid time value: ${String(seconds)}`, state: this.getState() };
    }
    this.simTime = seconds;
    this.renderFrame();
    return { ok: true, state: this.getState() };
  }

  setCinematicMode(enabled) {
    if (this.captureMode) {
      this.cinematicMode = false;
      return;
    }
    this.cinematicMode = Boolean(enabled);
    if (this.cinematicMode) {
      this.cinematicBaseElevation = this.params.cameraElevation;
      this.cinematicBaseDistance = this.params.cameraDistance;
      this.cinematicPhase = 0;
    }
  }

  setHudState(hudVisible, hudExpanded) {
    if (typeof hudVisible === 'boolean') this.hudVisible = hudVisible;
    if (typeof hudExpanded === 'boolean') this.hudExpanded = hudExpanded;
  }

  setAudioState(enabled) {
    this.audioEnabled = Boolean(enabled);
  }

  setParam(key, value) {
    if (!Object.prototype.hasOwnProperty.call(this.params, key)) return;
    const clamped = clampParam(key, value);
    this.params[key] = clamped;

    // Enforce physical ordering: diskOuterRadius >= diskInnerRadius + 1.0
    if (key === 'diskInnerRadius' && this.params.diskOuterRadius < clamped + 1.0) {
      this.params.diskOuterRadius = clampParam('diskOuterRadius', clamped + 1.0);
    } else if (key === 'diskOuterRadius' && clamped < this.params.diskInnerRadius + 1.0) {
      this.params.diskOuterRadius = clampParam('diskOuterRadius', this.params.diskInnerRadius + 1.0);
    }

    const isCameraKey =
      key === 'fov' ||
      key === 'cameraDistance' ||
      key === 'cameraAzimuth' ||
      key === 'cameraElevation';
    if (isCameraKey) {
      // User explicitly adjusting camera sliders yields cinematic auto-orbit
      if (this.cinematicMode) {
        this.cinematicMode = false;
        if (this.callbacks.onCinematicChange) {
          this.callbacks.onCinematicChange(false);
        }
      }
      this._applyCameraFromParams(true);
    }
    this.renderFrame();
  }

  applyFullState(nextState) {
    if (QUALITY_LEVELS.includes(nextState.quality)) this.quality = nextState.quality;
    if (Number.isInteger(nextState.preset)) this.preset = nextState.preset;
    if (Number.isInteger(nextState.debugMode)) this.debugMode = nextState.debugMode;
    if (typeof nextState.hudVisible === 'boolean') this.hudVisible = nextState.hudVisible;
    if (typeof nextState.hudExpanded === 'boolean') this.hudExpanded = nextState.hudExpanded;
    if (typeof nextState.cinematicMode === 'boolean') {
      this.cinematicMode = this.captureMode ? false : nextState.cinematicMode;
    }
    if (nextState.params) {
      this.params = sanitizeParams(nextState.params);
    }
    this._applyCameraFromParams(true);
    this.resize();
    this.renderFrame();
  }

  getState() {
    return {
      ready: this.ready,
      capture: this.captureMode,
      time: Number(this.simTime.toFixed(4)),
      quality: this.quality,
      preset: this.preset,
      debug: this.debugMode,
      hudVisible: this.hudVisible,
      hudExpanded: this.hudExpanded,
      cinematicMode: this.cinematicMode,
      audioEnabled: this.audioEnabled,
      contextLost: this.contextLost,
      storageVersion: STORAGE_VERSION,
      params: { ...this.params },
      camera: {
        position: [
          Number(this.camera.position.x.toFixed(4)),
          Number(this.camera.position.y.toFixed(4)),
          Number(this.camera.position.z.toFixed(4)),
        ],
        target: [
          Number(this.controls.target.x.toFixed(4)),
          Number(this.controls.target.y.toFixed(4)),
          Number(this.controls.target.z.toFixed(4)),
        ],
        fov: Number(this.camera.fov.toFixed(2)),
      },
      renderBudget: { ...this.renderBudget },
    };
  }

  dispose() {
    this.disposed = true;
    this._stopLoop();
    window.removeEventListener('resize', this._onResize);
    this.canvas.removeEventListener('webglcontextlost', this._onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this._onContextRestored);
    this.controls.removeEventListener('start', this._onControlsStart);
    this.controls.removeEventListener('change', this._onControlsChange);
    this.controls.removeEventListener('end', this._onControlsEnd);
    this.controls.dispose();
    this._disposeGpuPipeline();
  }
}
