import * as THREE from '../../vendor/three/three.module.js';
import { OrbitControls } from '../../vendor/three/addons/controls/OrbitControls.js';
import {
  CAMERA_PRESETS,
  QUALITY_PROFILES,
  PARAM_MAP,
  sanitizeParams,
} from '../config/constants.js';
import {
  FULLSCREEN_TRIANGLE_VERT,
  SCHWARZSCHILD_RAYTRACER_FRAG,
} from '../shaders/raytracer.glsl.js';
import {
  BLOOM_PREFILTER_FRAG,
  BLOOM_DOWNSAMPLE_FRAG,
  BLOOM_UPSAMPLE_FRAG,
  COMPOSITE_POST_FRAG,
} from '../shaders/postprocess.glsl.js';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function createFullscreenTriangleGeometry() {
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
  const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return geom;
}

export class GargantuaRenderer {
  constructor({
    canvas,
    initialState,
    onCameraInteractiveChange,
    onManualCameraStart,
    onContextStatusChange,
    onBudgetChange,
    onFirstFrameReady,
  }) {
    this.canvas = canvas;
    this.onCameraInteractiveChange = onCameraInteractiveChange;
    this.onManualCameraStart = onManualCameraStart;
    this.onContextStatusChange = onContextStatusChange;
    this.onBudgetChange = onBudgetChange;
    this.onFirstFrameReady = onFirstFrameReady;

    this.disposed = false;
    this.contextLost = false;
    this.firstFrameRendered = false;
    this.rafId = null;
    this.lastWallMs = null;

    // Authoritative simulation state mirrored synchronously for rendering & __GARGANTUA__ API
    this.quality = initialState.quality;
    this.preset = initialState.preset;
    this.debug = initialState.debug;
    this.captureMode = Boolean(initialState.captureMode);
    this.cinematicPlaying = Boolean(initialState.cinematicPlaying) && !this.captureMode;
    this.simTime = Number.isFinite(initialState.time) && initialState.time >= 0 ? initialState.time : 0;
    this.params = sanitizeParams(initialState.params);

    // Cinematic loop anchor so playback seamlessly orbits from current framing
    this.cinematicPhase = 0;
    this.cinematicBaseAzimuth = this.params.cameraAzimuth;
    this.cinematicBaseElevation = this.params.cameraElevation;
    this.cinematicBaseDistance = this.params.cameraDistance;

    // Reusable math scratch objects (zero per-frame heap allocations)
    this._camRight = new THREE.Vector3();
    this._camUp = new THREE.Vector3();
    this._camForward = new THREE.Vector3();
    this._camBasisMat = new THREE.Matrix4();
    this._syncingCameraFromCode = false;

    // Scene Camera & OrbitControls
    this.camera = new THREE.PerspectiveCamera(this.params.fov, 16 / 9, 0.1, 200);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enablePan = false;
    this.controls.enableDamping = !this.captureMode;
    this.controls.dampingFactor = 0.065;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomSpeed = 0.85;
    this.controls.minDistance = PARAM_MAP.cameraDistance.min;
    this.controls.maxDistance = PARAM_MAP.cameraDistance.max;
    this.controls.minPolarAngle = (90 - PARAM_MAP.cameraElevation.max) * DEG2RAD;
    this.controls.maxPolarAngle = (90 - PARAM_MAP.cameraElevation.min) * DEG2RAD;
    this.controls.target.set(0, 0, 0);

    this._handleControlsStart = () => {
      if (this.cinematicPlaying) {
        this.cinematicPlaying = false;
        if (this.onManualCameraStart) {
          this.onManualCameraStart();
        }
      }
    };

    this._handleControlsChange = () => {
      if (this._syncingCameraFromCode || this.disposed) return;
      this._extractSphericalParamsFromCamera();
      if (this.onCameraInteractiveChange) {
        this.onCameraInteractiveChange({
          cameraDistance: this.params.cameraDistance,
          cameraAzimuth: this.params.cameraAzimuth,
          cameraElevation: this.params.cameraElevation,
        });
      }
    };

    this.controls.addEventListener('start', this._handleControlsStart);
    this.controls.addEventListener('change', this._handleControlsChange);

    // WebGL Context Loss & Restoration Handlers (registered AFTER WebGLRenderer so Three.js
    // runs its internal onContextRestore -> initGLContext() before we rebuild targets/materials)
    this._handleContextLost = (event) => {
      event.preventDefault();
      if (this.disposed) return;
      this.contextLost = true;
      this._stopLoop();
      if (this.onContextStatusChange) {
        this.onContextStatusChange(true);
      }
    };

    this._handleContextRestored = () => {
      if (this.disposed) return;
      this._rebuildGpuPipeline();
      this.contextLost = false;
      this.applySphericalToCamera();
      this.renderSingleFrame();
      if (this.onContextStatusChange) {
        this.onContextStatusChange(false);
      }
      if (!this.captureMode) {
        this._startLoop();
      }
    };

    // Resize handling
    this._handleWindowResize = () => {
      if (this.disposed || this.contextLost) return;
      this.resize();
      this.renderSingleFrame();
    };
    window.addEventListener('resize', this._handleWindowResize);

    // Initialize GPU pipeline, attach context recovery listeners, sync camera, render initial frame
    this.applySphericalToCamera();
    this._initWebGLRenderer();
    this.canvas.addEventListener('webglcontextlost', this._handleContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._handleContextRestored, false);
    this._buildGpuResources();
    this.resize();
    this.renderSingleFrame();

    if (!this.captureMode) {
      this._startLoop();
    }
  }

  _initWebGLRenderer() {
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
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  _getRenderTargetType() {
    if (!this.renderer) return THREE.UnsignedByteType;
    if (
      this.renderer.capabilities.isWebGL2 ||
      this.renderer.extensions.has('EXT_color_buffer_half_float')
    ) {
      return THREE.HalfFloatType;
    }
    return THREE.UnsignedByteType;
  }

  _buildGpuResources() {
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.fsGeometry = createFullscreenTriangleGeometry();

    const profile = QUALITY_PROFILES[this.quality] || QUALITY_PROFILES.high;

    this.raytraceMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_TRIANGLE_VERT,
      fragmentShader: SCHWARZSCHILD_RAYTRACER_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3(1, 0, 0) },
        uCamUp: { value: new THREE.Vector3(0, 1, 0) },
        uCamForward: { value: new THREE.Vector3(0, 0, -1) },
        uTanHalfFov: { value: Math.tan((this.params.fov * 0.5) * DEG2RAD) },
        uAspect: { value: 16 / 9 },
        uPortraitBoost: { value: 1.0 },
        uTime: { value: this.simTime },
        uMaxSteps: { value: profile.maxSteps },
        uStepScale: { value: profile.stepScale },
        uDiskSubSamples: { value: profile.diskSubSamples },
        uStarOctaves: { value: profile.starOctaves },
        uDebugMode: { value: this.debug },
        uDiskInner: { value: this.params.diskInnerRadius },
        uDiskOuter: { value: this.params.diskOuterRadius },
        uDiskHalfThickness: { value: this.params.diskHalfThickness },
        uDiskTemp: { value: this.params.diskTemperature },
        uDiskIntensity: { value: this.params.diskIntensity },
        uOrbitalSpeedScale: { value: this.params.orbitalSpeedScale },
        uTurbulenceAmp: { value: this.params.turbulenceAmplitude },
        uTurbulenceSpeed: { value: this.params.turbulenceSpeed },
        uStarDensity: { value: this.params.starDensity },
        uGalaxyBrightness: { value: this.params.galaxyBrightness },
      },
    });

    this.prefilterMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_TRIANGLE_VERT,
      fragmentShader: BLOOM_PREFILTER_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tInput: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / 512, 1 / 512) },
        uThreshold: { value: this.params.bloomThreshold },
      },
    });

    this.downsampleMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_TRIANGLE_VERT,
      fragmentShader: BLOOM_DOWNSAMPLE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tInput: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / 256, 1 / 256) },
      },
    });

    this.upsampleMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_TRIANGLE_VERT,
      fragmentShader: BLOOM_UPSAMPLE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tLowMip: { value: null },
        tHighMip: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / 256, 1 / 256) },
        uRadiusWeight: { value: 0.86 },
      },
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_TRIANGLE_VERT,
      fragmentShader: COMPOSITE_POST_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tSceneHdr: { value: null },
        tBloom: { value: null },
        uResolution: { value: new THREE.Vector2(1440, 900) },
        uTime: { value: this.simTime },
        uDebugMode: { value: this.debug },
        uBloomStrength: { value: this.params.bloomStrength },
        uExposure: { value: this.params.exposure },
        uVignetteStrength: { value: this.params.vignetteStrength },
        uFilmGrainStrength: { value: this.params.filmGrainStrength },
        uChromaticAberration: { value: this.params.chromaticAberration },
      },
    });

    this.passScene = new THREE.Scene();
    this.passMesh = new THREE.Mesh(this.fsGeometry, this.raytraceMaterial);
    this.passMesh.frustumCulled = false;
    this.passScene.add(this.passMesh);

    this.hdrTarget = null;
    this.bloomDownTargets = [];
    this.bloomUpTargets = [];
  }

  _disposeRenderTargets() {
    if (this.hdrTarget) {
      this.hdrTarget.dispose();
      this.hdrTarget = null;
    }
    if (this.bloomDownTargets) {
      for (const rt of this.bloomDownTargets) rt.dispose();
      this.bloomDownTargets = [];
    }
    if (this.bloomUpTargets) {
      for (const rt of this.bloomUpTargets) rt.dispose();
      this.bloomUpTargets = [];
    }
  }

  _disposeMaterialsAndGeometry() {
    this._disposeRenderTargets();
    const mats = [
      this.raytraceMaterial,
      this.prefilterMaterial,
      this.downsampleMaterial,
      this.upsampleMaterial,
      this.compositeMaterial,
    ];
    for (const m of mats) {
      if (m) m.dispose();
    }
    if (this.fsGeometry) {
      this.fsGeometry.dispose();
      this.fsGeometry = null;
    }
  }

  _rebuildGpuPipeline() {
    this._disposeMaterialsAndGeometry();
    this._buildGpuResources();
    this.resize();
  }

  _allocateRenderTargets(internalW, internalH, bloomLevels) {
    this._disposeRenderTargets();

    const rtOptions = {
      type: this._getRenderTargetType(),
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };

    this.hdrTarget = new THREE.WebGLRenderTarget(internalW, internalH, rtOptions);

    let mipW = Math.max(2, Math.floor(internalW * 0.5));
    let mipH = Math.max(2, Math.floor(internalH * 0.5));

    for (let i = 0; i < bloomLevels; i++) {
      this.bloomDownTargets.push(new THREE.WebGLRenderTarget(mipW, mipH, rtOptions));
      if (i < bloomLevels - 1) {
        this.bloomUpTargets.push(new THREE.WebGLRenderTarget(mipW, mipH, rtOptions));
      }
      mipW = Math.max(2, Math.floor(mipW * 0.5));
      mipH = Math.max(2, Math.floor(mipH * 0.5));
    }
  }

  resize() {
    if (!this.renderer || this.contextLost) return;

    const cssW = Math.max(1, Math.floor(this.canvas.clientWidth || window.innerWidth || 1280));
    const cssH = Math.max(1, Math.floor(this.canvas.clientHeight || window.innerHeight || 720));

    const profile = QUALITY_PROFILES[this.quality] || QUALITY_PROFILES.high;
    const rawDpr = window.devicePixelRatio || 1;
    const cappedDpr = Math.min(rawDpr, profile.maxDpr);

    // Output framebuffer uses crisp capped DPR; internal raytracer uses quality renderScale
    this.renderer.setPixelRatio(cappedDpr);
    this.renderer.setSize(cssW, cssH, false);

    const outW = Math.max(2, Math.floor(cssW * cappedDpr));
    const outH = Math.max(2, Math.floor(cssH * cappedDpr));
    const internalW = Math.max(2, Math.floor(outW * profile.renderScale));
    const internalH = Math.max(2, Math.floor(outH * profile.renderScale));

    this.aspect = cssW / cssH;
    // Portrait FOV framing boost prevents narrow mobile viewports from cropping the accretion disk
    this.portraitBoost = this.aspect < 0.95 ? Math.min(2.15, Math.max(1.0, 0.96 / this.aspect)) : 1.0;

    this.camera.aspect = this.aspect;
    this.camera.fov = Math.min(
      125,
      2 * Math.atan(Math.tan((this.params.fov * 0.5) * DEG2RAD) * this.portraitBoost) * RAD2DEG,
    );
    this.camera.updateProjectionMatrix();

    this._allocateRenderTargets(internalW, internalH, profile.bloomLevels);

    this.compositeMaterial.uniforms.uResolution.value.set(outW, outH);

    this.currentBudget = {
      quality: this.quality,
      cssWidth: cssW,
      cssHeight: cssH,
      dpr: Number(cappedDpr.toFixed(2)),
      outputWidth: outW,
      outputHeight: outH,
      internalWidth: internalW,
      internalHeight: internalH,
      renderScale: profile.renderScale,
      maxSteps: profile.maxSteps,
      stepScale: profile.stepScale,
      diskSubSamples: profile.diskSubSamples,
      bloomLevels: profile.bloomLevels,
      starOctaves: profile.starOctaves,
    };

    if (this.onBudgetChange) {
      this.onBudgetChange(this.currentBudget);
    }
  }

  applySphericalToCamera() {
    this._syncingCameraFromCode = true;
    const r = this.params.cameraDistance;
    const az = this.params.cameraAzimuth * DEG2RAD;
    const el = this.params.cameraElevation * DEG2RAD;

    const cosEl = Math.cos(el);
    const x = r * cosEl * Math.sin(az);
    const y = r * Math.sin(el);
    const z = r * cosEl * Math.cos(az);

    this.camera.position.set(x, y, z);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(0, 0, 0);

    const prevDamping = this.controls.enableDamping;
    this.controls.enableDamping = false;
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.enableDamping = prevDamping;

    this.camera.updateMatrixWorld(true);
    this._syncingCameraFromCode = false;
  }

  _extractSphericalParamsFromCamera() {
    const pos = this.camera.position;
    const r = Math.max(PARAM_MAP.cameraDistance.min, Math.min(PARAM_MAP.cameraDistance.max, pos.length()));
    const el = Math.asin(Math.max(-1, Math.min(1, pos.y / Math.max(r, 1e-5)))) * RAD2DEG;
    const az = Math.atan2(pos.x, pos.z) * RAD2DEG;

    this.params.cameraDistance = Number(r.toFixed(2));
    this.params.cameraElevation = Number(
      Math.max(PARAM_MAP.cameraElevation.min, Math.min(PARAM_MAP.cameraElevation.max, el)).toFixed(2),
    );
    this.params.cameraAzimuth = Number(az.toFixed(2));
  }

  _syncUniformsBeforeRender() {
    const profile = QUALITY_PROFILES[this.quality] || QUALITY_PROFILES.high;
    const u = this.raytraceMaterial.uniforms;

    this.camera.updateMatrixWorld(true);
    this._camBasisMat.copy(this.camera.matrixWorld);
    this._camRight.setFromMatrixColumn(this._camBasisMat, 0).normalize();
    this._camUp.setFromMatrixColumn(this._camBasisMat, 1).normalize();
    this._camForward.setFromMatrixColumn(this._camBasisMat, 2).negate().normalize();

    u.uCamPos.value.copy(this.camera.position);
    u.uCamRight.value.copy(this._camRight);
    u.uCamUp.value.copy(this._camUp);
    u.uCamForward.value.copy(this._camForward);
    u.uTanHalfFov.value = Math.tan((this.params.fov * 0.5) * DEG2RAD);
    u.uAspect.value = this.aspect || 16 / 9;
    u.uPortraitBoost.value = this.portraitBoost || 1.0;

    u.uTime.value = this.simTime;
    u.uMaxSteps.value = profile.maxSteps;
    u.uStepScale.value = profile.stepScale;
    u.uDiskSubSamples.value = profile.diskSubSamples;
    u.uStarOctaves.value = profile.starOctaves;
    u.uDebugMode.value = this.debug;

    const safeInner = this.params.diskInnerRadius;
    const safeOuter = Math.max(safeInner + 0.5, this.params.diskOuterRadius);
    u.uDiskInner.value = safeInner;
    u.uDiskOuter.value = safeOuter;
    u.uDiskHalfThickness.value = this.params.diskHalfThickness;
    u.uDiskTemp.value = this.params.diskTemperature;
    u.uDiskIntensity.value = this.params.diskIntensity;
    u.uOrbitalSpeedScale.value = this.params.orbitalSpeedScale;
    u.uTurbulenceAmp.value = this.params.turbulenceAmplitude;
    u.uTurbulenceSpeed.value = this.params.turbulenceSpeed;
    u.uStarDensity.value = this.params.starDensity;
    u.uGalaxyBrightness.value = this.params.galaxyBrightness;

    this.prefilterMaterial.uniforms.uThreshold.value = this.params.bloomThreshold;

    const cu = this.compositeMaterial.uniforms;
    cu.uTime.value = this.simTime;
    cu.uDebugMode.value = this.debug;
    cu.uBloomStrength.value = this.params.bloomStrength;
    cu.uExposure.value = this.params.exposure;
    cu.uVignetteStrength.value = this.params.vignetteStrength;
    cu.uFilmGrainStrength.value = this.params.filmGrainStrength;
    cu.uChromaticAberration.value = this.params.chromaticAberration;
  }

  renderSingleFrame() {
    if (this.disposed || this.contextLost || !this.renderer || !this.hdrTarget) return;

    this._syncUniformsBeforeRender();

    // Pass 1: Schwarzschild Null-Geodesic Raytrace -> hdrTarget
    this.passMesh.material = this.raytraceMaterial;
    this.renderer.setRenderTarget(this.hdrTarget);
    this.renderer.render(this.passScene, this.orthoCamera);

    // Passes 2-4: Multi-Scale HDR Bloom Pyramid (skipped in diagnostic modes 1-9)
    let bloomFinalTexture = this.hdrTarget.texture;
    if (this.debug === 0 && this.bloomDownTargets.length > 0 && this.params.bloomStrength > 0.001) {
      // Prefilter + First Downsample
      this.passMesh.material = this.prefilterMaterial;
      this.prefilterMaterial.uniforms.tInput.value = this.hdrTarget.texture;
      this.prefilterMaterial.uniforms.uTexelSize.value.set(
        1 / this.hdrTarget.width,
        1 / this.hdrTarget.height,
      );
      this.renderer.setRenderTarget(this.bloomDownTargets[0]);
      this.renderer.render(this.passScene, this.orthoCamera);

      // Progressive Downsample Mips
      this.passMesh.material = this.downsampleMaterial;
      for (let i = 1; i < this.bloomDownTargets.length; i++) {
        const prevRt = this.bloomDownTargets[i - 1];
        const currRt = this.bloomDownTargets[i];
        this.downsampleMaterial.uniforms.tInput.value = prevRt.texture;
        this.downsampleMaterial.uniforms.uTexelSize.value.set(1 / prevRt.width, 1 / prevRt.height);
        this.renderer.setRenderTarget(currRt);
        this.renderer.render(this.passScene, this.orthoCamera);
      }

      // Progressive Tent Upsample
      this.passMesh.material = this.upsampleMaterial;
      let lowSourceRt = this.bloomDownTargets[this.bloomDownTargets.length - 1];
      for (let i = this.bloomUpTargets.length - 1; i >= 0; i--) {
        const highMipRt = this.bloomDownTargets[i];
        const destUpRt = this.bloomUpTargets[i];
        this.upsampleMaterial.uniforms.tLowMip.value = lowSourceRt.texture;
        this.upsampleMaterial.uniforms.tHighMip.value = highMipRt.texture;
        this.upsampleMaterial.uniforms.uTexelSize.value.set(
          1 / lowSourceRt.width,
          1 / lowSourceRt.height,
        );
        this.upsampleMaterial.uniforms.uRadiusWeight.value = 0.84;
        this.renderer.setRenderTarget(destUpRt);
        this.renderer.render(this.passScene, this.orthoCamera);
        lowSourceRt = destUpRt;
      }

      bloomFinalTexture = lowSourceRt.texture;
    }

    // Pass 5: Composite + ACES Fitted Tone Mapping -> Screen
    this.passMesh.material = this.compositeMaterial;
    this.compositeMaterial.uniforms.tSceneHdr.value = this.hdrTarget.texture;
    this.compositeMaterial.uniforms.tBloom.value = bloomFinalTexture;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.passScene, this.orthoCamera);

    if (!this.firstFrameRendered) {
      const gl = this.renderer.getContext();
      if (gl && typeof gl.finish === 'function') {
        gl.finish();
      }
      this.firstFrameRendered = true;
      if (this.onFirstFrameReady) {
        this.onFirstFrameReady();
      }
    }
  }

  _startLoop() {
    if (this.rafId !== null || this.disposed || this.contextLost) return;
    this.lastWallMs = performance.now();

    const tick = (nowMs) => {
      if (this.disposed || this.contextLost) {
        this.rafId = null;
        return;
      }
      this.rafId = window.requestAnimationFrame(tick);

      const rawDt = Math.min(0.1, Math.max(0, (nowMs - (this.lastWallMs ?? nowMs)) * 0.001));
      this.lastWallMs = nowMs;

      if (!this.captureMode) {
        this.simTime += rawDt * this.params.timeScale;

        if (this.cinematicPlaying) {
          this.cinematicPhase += rawDt * 0.14 * Math.max(0.25, this.params.timeScale);
          const az = ((this.cinematicBaseAzimuth + this.cinematicPhase * 22.0 + 540) % 360) - 180;
          const el = Math.max(
            -78,
            Math.min(78, this.cinematicBaseElevation + Math.sin(this.cinematicPhase * 0.85) * 6.5),
          );
          const dist = Math.max(
            PARAM_MAP.cameraDistance.min,
            Math.min(
              PARAM_MAP.cameraDistance.max,
              this.cinematicBaseDistance * (1.0 - 0.11 * Math.sin(this.cinematicPhase * 0.55)),
            ),
          );

          this.params.cameraAzimuth = Number(az.toFixed(2));
          this.params.cameraElevation = Number(el.toFixed(2));
          this.params.cameraDistance = Number(dist.toFixed(2));
          this.applySphericalToCamera();

          if (this.onCameraInteractiveChange) {
            this.onCameraInteractiveChange({
              cameraDistance: this.params.cameraDistance,
              cameraAzimuth: this.params.cameraAzimuth,
              cameraElevation: this.params.cameraElevation,
            });
          }
        } else if (this.controls.enableDamping) {
          this.controls.update();
        }
      }

      this.renderSingleFrame();
    };

    this.rafId = window.requestAnimationFrame(tick);
  }

  _stopLoop() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lastWallMs = null;
  }

  // -------------------------------------------------------------------------
  // Imperative State Mutators (Used by React HUD & window.__GARGANTUA__)
  // -------------------------------------------------------------------------
  setQuality(quality) {
    if (this.quality === quality) {
      if (this.captureMode) this.renderSingleFrame();
      return;
    }
    this.quality = quality;
    this.resize();
    this.renderSingleFrame();
  }

  setDebug(debugIndex) {
    this.debug = debugIndex;
    this.renderSingleFrame();
  }

  setTime(seconds) {
    this.simTime = seconds;
    this.renderSingleFrame();
  }

  setPreset(presetIndex, pauseCinematic = true) {
    const p = CAMERA_PRESETS[presetIndex];
    if (!p) return;
    this.preset = presetIndex;
    this.params.fov = p.fov;
    this.params.cameraDistance = p.cameraDistance;
    this.params.cameraAzimuth = p.cameraAzimuth;
    this.params.cameraElevation = p.cameraElevation;

    this.cinematicPhase = 0;
    this.cinematicBaseAzimuth = p.cameraAzimuth;
    this.cinematicBaseElevation = p.cameraElevation;
    this.cinematicBaseDistance = p.cameraDistance;

    if (pauseCinematic || this.captureMode) {
      this.cinematicPlaying = false;
    }

    this.camera.fov = Math.min(
      125,
      2 * Math.atan(Math.tan((this.params.fov * 0.5) * DEG2RAD) * (this.portraitBoost || 1.0)) * RAD2DEG,
    );
    this.camera.updateProjectionMatrix();
    this.applySphericalToCamera();
    this.renderSingleFrame();
  }

  setCinematicPlaying(playing) {
    if (this.captureMode) {
      this.cinematicPlaying = false;
      return;
    }
    const next = Boolean(playing);
    if (next && !this.cinematicPlaying) {
      // Anchor smooth orbit from current camera position so there is no jump
      this.cinematicPhase = 0;
      this.cinematicBaseAzimuth = this.params.cameraAzimuth;
      this.cinematicBaseElevation = this.params.cameraElevation;
      this.cinematicBaseDistance = this.params.cameraDistance;
    }
    this.cinematicPlaying = next;
  }

  updateParams(nextParams, { cameraChanged = false, pauseCinematic = false } = {}) {
    this.params = sanitizeParams(nextParams);
    if (pauseCinematic && this.cinematicPlaying) {
      this.cinematicPlaying = false;
    }
    if (cameraChanged) {
      this.camera.fov = Math.min(
        125,
        2 * Math.atan(Math.tan((this.params.fov * 0.5) * DEG2RAD) * (this.portraitBoost || 1.0)) * RAD2DEG,
      );
      this.camera.updateProjectionMatrix();
      this.applySphericalToCamera();
      this.cinematicPhase = 0;
      this.cinematicBaseAzimuth = this.params.cameraAzimuth;
      this.cinematicBaseElevation = this.params.cameraElevation;
      this.cinematicBaseDistance = this.params.cameraDistance;
    }
    if (this.captureMode || !this.rafId) {
      this.renderSingleFrame();
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this._stopLoop();
    window.removeEventListener('resize', this._handleWindowResize);
    this.canvas.removeEventListener('webglcontextlost', this._handleContextLost, false);
    this.canvas.removeEventListener('webglcontextrestored', this._handleContextRestored, false);
    if (this.controls) {
      this.controls.removeEventListener('start', this._handleControlsStart);
      this.controls.removeEventListener('change', this._handleControlsChange);
      this.controls.dispose();
    }
    this._disposeMaterialsAndGeometry();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}
