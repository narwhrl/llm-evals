import * as THREE from '../../vendor/three/three.module.js';
import { OrbitControls } from '../../vendor/three/addons/controls/OrbitControls.js';
import {
  QUALITY_PROFILES,
  CAMERA_PRESETS,
  cartesianToSpherical,
  sphericalToCartesian,
  clampParam,
  isMobileViewport,
} from '../config/stateSchema.js';
import {
  FULLSCREEN_VERTEX_SHADER,
  SCHWARZSCHILD_FRAGMENT_SHADER,
  BLOOM_PREFILTER_SHADER,
  BLOOM_BLUR_SHADER,
  COMPOSITE_POST_SHADER,
} from '../shaders/gargantuaShaders.js';

export class GargantuaRenderer {
  constructor({ canvas, initialState, onCameraSync, onStatusChange }) {
    this.canvas = canvas;
    this.onCameraSync = onCameraSync;
    this.onStatusChange = onStatusChange;

    this.state = {
      quality: initialState.quality,
      preset: initialState.preset,
      debug: initialState.debug,
      hudVisible: initialState.hudVisible,
      cinematicPlaying: initialState.cinematicPlaying,
      capture: Boolean(initialState.capture),
      simTime: initialState.simTime ?? 0,
      params: { ...initialState.params },
    };

    this.ready = false;
    this.contextLost = false;
    this.disposed = false;
    this.userDragging = false;
    this.rafId = null;
    this.lastFrameMs = 0;
    this.fps = 60;
    this.fpsAccum = 0;
    this.fpsFrames = 0;

    this.internalWidth = 1;
    this.internalHeight = 1;
    this.appliedDpr = 1;
    this.rtType = THREE.HalfFloatType;

    // Reusable math vectors to avoid per-frame allocations
    this._camForward = new THREE.Vector3();
    this._camRight = new THREE.Vector3();
    this._camUp = new THREE.Vector3();
    this._dirHoriz = new THREE.Vector2(1, 0);
    this._dirVert = new THREE.Vector2(0, 1);

    this.initRendererAndControls();
    this.buildGpuPipeline();
    this.applyCameraFromParams(true);
    this.resize();
    this.renderFrame();

    const gl = this.renderer.getContext();
    gl.flush();

    this.ready = true;
    document.documentElement.dataset.gargantuaReady = 'true';
    this.emitStatus();

    if (!this.state.capture) {
      this.startLoop();
    }
  }

  initRendererAndControls() {
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
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;

    // Register context loss/restoration listeners right after WebGLRenderer attaches its internal handlers
    this._handleContextLost = (event) => {
      event.preventDefault();
      this.contextLost = true;
      this.stopLoop();
      this.emitStatus();
    };

    this._handleContextRestored = () => {
      if (this.disposed) return;
      this.rebuildAfterContextRestore();
    };

    this.canvas.addEventListener('webglcontextlost', this._handleContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._handleContextRestored, false);

    this.camera = new THREE.PerspectiveCamera(this.state.params.fov, 16 / 9, 0.1, 250);
    this.camera.up.set(0, 1, 0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = !this.state.capture;
    this.controls.dampingFactor = 0.075;
    this.controls.rotateSpeed = 0.68;
    this.controls.zoomSpeed = 0.85;
    this.controls.panSpeed = 0.55;
    this.controls.enablePan = true;
    this.controls.minDistance = 3.8;
    this.controls.maxDistance = 40.0;
    this.controls.minPolarAngle = (5 * Math.PI) / 180;
    this.controls.maxPolarAngle = (175 * Math.PI) / 180;
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    this._onControlStart = () => {
      this.userDragging = true;
      if (this.state.cinematicPlaying) {
        this.state.cinematicPlaying = false;
        this.emitStatus();
      }
    };

    this._onControlChange = () => {
      if (this._suppressControlCallback) return;
      const spherical = cartesianToSpherical(this.camera.position, this.controls.target);
      this.state.params.camDistance = spherical.camDistance;
      this.state.params.camAzimuth = spherical.camAzimuth;
      this.state.params.camElevation = spherical.camElevation;
      this.onCameraSync?.(spherical, this.userDragging);
      if (this.state.capture && this.ready && !this.contextLost) {
        this.renderFrame();
      }
    };

    this._onControlEnd = () => {
      this.userDragging = false;
      const spherical = cartesianToSpherical(this.camera.position, this.controls.target);
      this.onCameraSync?.(spherical, false);
    };

    this.controls.addEventListener('start', this._onControlStart);
    this.controls.addEventListener('change', this._onControlChange);
    this.controls.addEventListener('end', this._onControlEnd);

    this._onWindowResize = () => {
      if (this.disposed || this.contextLost) return;
      this.resize();
      this.renderFrame();
      this.emitStatus();
    };
    window.addEventListener('resize', this._onWindowResize);
  }

  detectSupportedRenderTargetType() {
    const gl = this.renderer.getContext();
    if (!gl || gl.isContextLost()) return THREE.HalfFloatType;

    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('EXT_color_buffer_half_float');
    gl.getExtension('OES_texture_float_linear');
    gl.getExtension('OES_texture_half_float_linear');

    let testTarget = null;
    try {
      testTarget = new THREE.WebGLRenderTarget(4, 4, {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });
      this.renderer.setRenderTarget(testTarget);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      this.renderer.setRenderTarget(null);
      testTarget.dispose();
      return status === gl.FRAMEBUFFER_COMPLETE ? THREE.HalfFloatType : THREE.UnsignedByteType;
    } catch {
      if (testTarget) testTarget.dispose();
      this.renderer.setRenderTarget(null);
      return THREE.UnsignedByteType;
    }
  }

  createRenderTarget(w, h) {
    return new THREE.WebGLRenderTarget(Math.max(2, w), Math.max(2, h), {
      type: this.rtType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
    });
  }

  buildGpuPipeline() {
    this.rtType = this.detectSupportedRenderTargetType();

    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadScene = new THREE.Scene();

    // Full-screen single triangle covering [-1, 1]^2 without a diagonal quad seam
    this.fullscreenGeo = new THREE.BufferGeometry();
    const positions = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
    this.fullscreenGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.fullscreenGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    const profile = this.getActiveQualityProfile();
    const p = this.state.params;

    this.raytraceMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: SCHWARZSCHILD_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1280, 720) },
        uTime: { value: this.state.simTime },
        uCamPos: { value: new THREE.Vector3(0, 2, 14) },
        uCamForward: { value: new THREE.Vector3(0, 0, -1) },
        uCamRight: { value: new THREE.Vector3(1, 0, 0) },
        uCamUp: { value: new THREE.Vector3(0, 1, 0) },
        uFov: { value: (p.fov * Math.PI) / 180 },
        uMaxSteps: { value: profile.maxSteps },
        uStepScale: { value: profile.stepScale },
        uDiskSamples: { value: profile.diskSamples },
        uStarLayers: { value: profile.starLayers },
        uDiskInner: { value: p.diskInner },
        uDiskOuter: { value: p.diskOuter },
        uDiskThickness: { value: p.diskThickness },
        uDiskTemp: { value: p.diskTemp },
        uDiskIntensity: { value: p.diskIntensity },
        uOrbitalSpeed: { value: p.orbitalSpeed },
        uTurbulenceAmp: { value: p.turbulenceAmp },
        uTurbulenceSpeed: { value: p.turbulenceSpeed },
        uDiskOpacity: { value: p.diskOpacity },
        uStarDensity: { value: p.starDensity },
        uGalaxyBrightness: { value: p.galaxyBrightness },
        uDebugMode: { value: this.state.debug },
      },
    });

    this.prefilterMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_PREFILTER_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uHdrTex: { value: null },
        uThreshold: { value: p.bloomThreshold },
      },
    });

    this.blurMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_BLUR_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTex: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / 512, 1 / 512) },
        uDirection: { value: new THREE.Vector2(1, 0) },
        uRadius: { value: profile.bloomRadius },
        uTaps: { value: profile.blurTaps },
      },
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: COMPOSITE_POST_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uHdrTex: { value: null },
        uBloom0: { value: null },
        uBloom1: { value: null },
        uBloom2: { value: null },
        uBloom3: { value: null },
        uBloomMips: { value: profile.bloomMips },
        uBloomStrength: { value: p.bloomStrength },
        uExposure: { value: p.exposure },
        uVignette: { value: p.vignette },
        uFilmGrain: { value: p.filmGrain },
        uChromaticAberration: { value: p.chromaticAberration },
        uTime: { value: this.state.simTime },
        uResolution: { value: new THREE.Vector2(1280, 720) },
        uDebugMode: { value: this.state.debug },
      },
    });

    this.quadMesh = new THREE.Mesh(this.fullscreenGeo, this.raytraceMaterial);
    this.quadMesh.frustumCulled = false;
    this.quadScene.add(this.quadMesh);

    this.allocateRenderTargets(64, 64);
  }

  disposeRenderTargets() {
    this.hdrTarget?.dispose();
    this.brightTarget?.dispose();
    if (this.bloomMipsA) {
      for (const rt of this.bloomMipsA) rt.dispose();
    }
    if (this.bloomMipsB) {
      for (const rt of this.bloomMipsB) rt.dispose();
    }
    this.hdrTarget = null;
    this.brightTarget = null;
    this.bloomMipsA = null;
    this.bloomMipsB = null;
  }

  allocateRenderTargets(w, h) {
    this.disposeRenderTargets();
    const iw = Math.max(4, Math.floor(w));
    const ih = Math.max(4, Math.floor(h));
    this.internalWidth = iw;
    this.internalHeight = ih;

    this.hdrTarget = this.createRenderTarget(iw, ih);
    const bw = Math.max(2, iw >> 1);
    const bh = Math.max(2, ih >> 1);
    this.brightTarget = this.createRenderTarget(bw, bh);

    this.bloomMipsA = [];
    this.bloomMipsB = [];
    let mw = bw;
    let mh = bh;
    for (let i = 0; i < 4; i++) {
      this.bloomMipsA.push(this.createRenderTarget(mw, mh));
      this.bloomMipsB.push(this.createRenderTarget(mw, mh));
      mw = Math.max(2, mw >> 1);
      mh = Math.max(2, mh >> 1);
    }

    this.raytraceMaterial.uniforms.uResolution.value.set(iw, ih);
  }

  disposePipelineObjects() {
    this.disposeRenderTargets();
    if (this.quadMesh && this.quadScene) {
      this.quadScene.remove(this.quadMesh);
    }
    this.fullscreenGeo?.dispose();
    this.raytraceMaterial?.dispose();
    this.prefilterMaterial?.dispose();
    this.blurMaterial?.dispose();
    this.compositeMaterial?.dispose();
  }

  rebuildAfterContextRestore() {
    try {
      this.contextLost = false;
      this.disposePipelineObjects();
      this.buildGpuPipeline();
      this.resize();
      this.applyCameraFromParams(true);
      this.syncUniformsFromState();
      this.renderFrame();
      this.renderer.getContext()?.flush?.();
      this.emitStatus();
      if (!this.state.capture) {
        this.startLoop();
      }
    } catch (err) {
      this.contextLost = true;
      console.error('Failed to rebuild Gargantua WebGL resources after restore:', err);
    }
  }

  getActiveQualityProfile() {
    return QUALITY_PROFILES[this.state.quality] || QUALITY_PROFILES.high;
  }

  getActiveBudgetSummary() {
    const profile = this.getActiveQualityProfile();
    const mobile = isMobileViewport();
    const scale = mobile ? profile.mobileRenderScale : profile.renderScale;
    return {
      id: profile.id,
      label: profile.label,
      renderScale: scale,
      appliedDpr: this.appliedDpr,
      internalWidth: this.internalWidth,
      internalHeight: this.internalHeight,
      maxSteps: profile.maxSteps,
      stepScale: profile.stepScale,
      diskSamples: profile.diskSamples,
      starLayers: profile.starLayers,
      bloomMips: profile.bloomMips,
      blurTaps: profile.blurTaps,
    };
  }

  resize() {
    if (this.disposed || this.contextLost) return;
    const cssWidth = Math.max(1, window.innerWidth || this.canvas.clientWidth || 1280);
    const cssHeight = Math.max(1, window.innerHeight || this.canvas.clientHeight || 720);
    const profile = this.getActiveQualityProfile();
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = Math.min(rawDpr, profile.maxDpr);
    this.appliedDpr = Number(dpr.toFixed(2));

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(cssWidth, cssHeight, false);

    this.camera.aspect = cssWidth / cssHeight;
    this.camera.updateProjectionMatrix();

    const mobile = isMobileViewport();
    const scale = mobile ? profile.mobileRenderScale : profile.renderScale;
    const targetW = Math.max(64, Math.round(cssWidth * dpr * scale));
    const targetH = Math.max(64, Math.round(cssHeight * dpr * scale));

    if (targetW !== this.internalWidth || targetH !== this.internalHeight || !this.hdrTarget) {
      this.allocateRenderTargets(targetW, targetH);
    }
    this.compositeMaterial.uniforms.uResolution.value.set(
      Math.round(cssWidth * dpr),
      Math.round(cssHeight * dpr)
    );
  }

  applyCameraFromParams(immediate = true, resetTarget = false) {
    const p = this.state.params;
    this._suppressControlCallback = true;
    try {
      if (resetTarget) {
        this.controls.target.set(0, 0, 0);
      }
      const pos = sphericalToCartesian(
        p.camDistance,
        p.camAzimuth,
        p.camElevation,
        this.controls.target
      );
      this.camera.position.set(pos.x, pos.y, pos.z);
      this.camera.fov = p.fov;
      this.camera.updateProjectionMatrix();

      const prevDamping = this.controls.enableDamping;
      if (immediate) this.controls.enableDamping = false;
      this.controls.update();
      this.controls.enableDamping = prevDamping;
    } finally {
      this._suppressControlCallback = false;
    }
  }

  syncUniformsFromState() {
    if (!this.raytraceMaterial) return;
    const profile = this.getActiveQualityProfile();
    const p = this.state.params;
    const u = this.raytraceMaterial.uniforms;

    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    this._camRight.set(e[0], e[1], e[2]).normalize();
    this._camUp.set(e[4], e[5], e[6]).normalize();
    this._camForward.set(-e[8], -e[9], -e[10]).normalize();

    u.uCamPos.value.copy(this.camera.position);
    u.uCamRight.value.copy(this._camRight);
    u.uCamUp.value.copy(this._camUp);
    u.uCamForward.value.copy(this._camForward);
    u.uFov.value = (p.fov * Math.PI) / 180;
    u.uTime.value = this.state.simTime;

    u.uMaxSteps.value = profile.maxSteps;
    u.uStepScale.value = profile.stepScale;
    u.uDiskSamples.value = profile.diskSamples;
    u.uStarLayers.value = profile.starLayers;

    u.uDiskInner.value = p.diskInner;
    u.uDiskOuter.value = Math.max(p.diskOuter, p.diskInner + 1.0);
    u.uDiskThickness.value = p.diskThickness;
    u.uDiskTemp.value = p.diskTemp;
    u.uDiskIntensity.value = p.diskIntensity;
    u.uOrbitalSpeed.value = p.orbitalSpeed;
    u.uTurbulenceAmp.value = p.turbulenceAmp;
    u.uTurbulenceSpeed.value = p.turbulenceSpeed;
    u.uDiskOpacity.value = p.diskOpacity;

    u.uStarDensity.value = p.starDensity;
    u.uGalaxyBrightness.value = p.galaxyBrightness;
    u.uDebugMode.value = this.state.debug;

    this.prefilterMaterial.uniforms.uThreshold.value = p.bloomThreshold;
    this.blurMaterial.uniforms.uRadius.value = profile.bloomRadius;
    this.blurMaterial.uniforms.uTaps.value = profile.blurTaps;

    const cu = this.compositeMaterial.uniforms;
    cu.uBloomMips.value = profile.bloomMips;
    cu.uBloomStrength.value = p.bloomStrength;
    cu.uExposure.value = p.exposure;
    cu.uVignette.value = p.vignette;
    cu.uFilmGrain.value = p.filmGrain;
    cu.uChromaticAberration.value = p.chromaticAberration;
    cu.uTime.value = this.state.simTime;
    cu.uDebugMode.value = this.state.debug;
  }

  renderFrame() {
    if (this.disposed || this.contextLost || !this.hdrTarget) return;

    this.syncUniformsFromState();

    // Pass 1: Schwarzschild null-geodesic raytracing into HDR framebuffer
    this.quadMesh.material = this.raytraceMaterial;
    this.renderer.setRenderTarget(this.hdrTarget);
    this.renderer.render(this.quadScene, this.orthoCamera);

    const profile = this.getActiveQualityProfile();
    const runBloom = this.state.debug === 0 && this.state.params.bloomStrength > 0.001;

    if (runBloom) {
      // Pass 2: Soft-knee HDR bright-pass extraction
      this.prefilterMaterial.uniforms.uHdrTex.value = this.hdrTarget.texture;
      this.quadMesh.material = this.prefilterMaterial;
      this.renderer.setRenderTarget(this.brightTarget);
      this.renderer.render(this.quadScene, this.orthoCamera);

      // Pass 3..N: Multi-mip separable Gaussian bloom pyramid
      let inputTex = this.brightTarget.texture;
      let inputW = this.brightTarget.width;
      let inputH = this.brightTarget.height;

      this.quadMesh.material = this.blurMaterial;
      for (let i = 0; i < profile.bloomMips; i++) {
        const mipA = this.bloomMipsA[i];
        const mipB = this.bloomMipsB[i];

        // Horizontal blur + downsample into mipA
        this.blurMaterial.uniforms.uTex.value = inputTex;
        this.blurMaterial.uniforms.uTexelSize.value.set(1 / inputW, 1 / inputH);
        this.blurMaterial.uniforms.uDirection.value.copy(this._dirHoriz);
        this.renderer.setRenderTarget(mipA);
        this.renderer.render(this.quadScene, this.orthoCamera);

        // Vertical blur into mipB
        this.blurMaterial.uniforms.uTex.value = mipA.texture;
        this.blurMaterial.uniforms.uTexelSize.value.set(1 / mipA.width, 1 / mipA.height);
        this.blurMaterial.uniforms.uDirection.value.copy(this._dirVert);
        this.renderer.setRenderTarget(mipB);
        this.renderer.render(this.quadScene, this.orthoCamera);

        inputTex = mipB.texture;
        inputW = mipB.width;
        inputH = mipB.height;
      }
    }

    // Final Pass: Lens dispersion + Bloom composite + ACES Filmic Tone Mapping + Vignette + Film Grain
    const cu = this.compositeMaterial.uniforms;
    cu.uHdrTex.value = this.hdrTarget.texture;
    cu.uBloom0.value = this.bloomMipsB[0].texture;
    cu.uBloom1.value = this.bloomMipsB[1].texture;
    cu.uBloom2.value = this.bloomMipsB[2].texture;
    cu.uBloom3.value = this.bloomMipsB[3].texture;

    this.quadMesh.material = this.compositeMaterial;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.quadScene, this.orthoCamera);
  }

  startLoop() {
    if (this.rafId !== null || this.disposed || this.contextLost) return;
    this.lastFrameMs = performance.now();
    this.fpsAccum = 0;
    this.fpsFrames = 0;
    let warmupFrames = 2;
    const tick = (now) => {
      if (this.disposed || this.contextLost) {
        this.rafId = null;
        return;
      }
      const rawDt = Math.max(0, (now - this.lastFrameMs) / 1000);
      const dt = Math.min(rawDt, 0.1);
      this.lastFrameMs = now;

      if (warmupFrames > 0) {
        warmupFrames -= 1;
      } else {
        this.fpsAccum += rawDt;
        this.fpsFrames += 1;
        if (this.fpsAccum >= 0.45) {
          this.fps = Math.max(1, Math.round(this.fpsFrames / this.fpsAccum));
          this.fpsAccum = 0;
          this.fpsFrames = 0;
          this.emitStatus();
        }
      }

      if (!this.state.capture) {
        this.state.simTime += dt * this.state.params.timeScale;

        if (this.state.cinematicPlaying && !this.userDragging) {
          const orbitSpeedDeg = 4.6 * Math.max(0.2, Math.min(2.2, this.state.params.timeScale));
          const nextAz = clampParam('camAzimuth', this.state.params.camAzimuth + dt * orbitSpeedDeg);
          const nextEl = clampParam(
            'camElevation',
            this.state.params.camElevation + Math.sin(this.state.simTime * 0.28) * dt * 0.65
          );
          this.state.params.camAzimuth = nextAz;
          this.state.params.camElevation = nextEl;
          this.applyCameraFromParams(true, false);
          this.onCameraSync?.(
            {
              camDistance: this.state.params.camDistance,
              camAzimuth: Number(nextAz.toFixed(1)),
              camElevation: Number(nextEl.toFixed(1)),
            },
            true
          );
        } else {
          this.controls.update();
        }
      }

      this.renderFrame();
      this.rafId = window.requestAnimationFrame(tick);
    };
    this.rafId = window.requestAnimationFrame(tick);
  }

  stopLoop() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  setQuality(quality) {
    this.state.quality = quality;
    this.resize();
    this.renderFrame();
    this.emitStatus();
  }

  setPreset(presetIndex) {
    const preset = CAMERA_PRESETS[presetIndex];
    if (!preset) return;
    this.state.preset = presetIndex;
    this.state.params.fov = preset.fov;
    this.state.params.camDistance = preset.camDistance;
    this.state.params.camAzimuth = preset.camAzimuth;
    this.state.params.camElevation = preset.camElevation;
    this.applyCameraFromParams(true, true);
    this.renderFrame();
    this.emitStatus();
  }

  setDebug(debugIndex) {
    this.state.debug = debugIndex;
    this.renderFrame();
    this.emitStatus();
  }

  setSimTime(seconds) {
    this.state.simTime = seconds;
    this.renderFrame();
    this.emitStatus();
  }

  setCinematicPlaying(playing) {
    this.state.cinematicPlaying = Boolean(playing) && !this.state.capture;
    this.emitStatus();
  }

  updateParams(nextParams, { cameraChanged = false, resetTarget = false } = {}) {
    this.state.params = { ...this.state.params, ...nextParams };
    if (cameraChanged) {
      this.applyCameraFromParams(true, resetTarget);
    }
    this.renderFrame();
  }

  simulateContextLoss() {
    const ext = this.renderer?.getContext()?.getExtension('WEBGL_lose_context');
    if (!ext) return false;
    this._lostContextExt = ext;
    ext.loseContext();
    return true;
  }

  simulateContextRestore() {
    if (!this._lostContextExt) return false;
    this._lostContextExt.restoreContext();
    this._lostContextExt = null;
    return true;
  }

  getSnapshot(extra = {}) {
    return {
      ready: this.ready && !this.contextLost,
      contextLost: this.contextLost,
      capture: this.state.capture,
      quality: this.state.quality,
      qualityBudget: this.getActiveBudgetSummary(),
      preset: this.state.preset,
      presetName: CAMERA_PRESETS[this.state.preset]?.name ?? '',
      debug: this.state.debug,
      time: Number(this.state.simTime.toFixed(4)),
      cinematicPlaying: this.state.cinematicPlaying,
      fps: this.fps,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: this.appliedDpr,
      },
      camera: {
        position: [
          Number(this.camera.position.x.toFixed(4)),
          Number(this.camera.position.y.toFixed(4)),
          Number(this.camera.position.z.toFixed(4)),
        ],
        fov: this.state.params.fov,
        distance: this.state.params.camDistance,
        azimuth: this.state.params.camAzimuth,
        elevation: this.state.params.camElevation,
      },
      params: { ...this.state.params },
      ...extra,
    };
  }

  emitStatus() {
    this.onStatusChange?.({
      ready: this.ready,
      contextLost: this.contextLost,
      fps: this.fps,
      cinematicPlaying: this.state.cinematicPlaying,
      budget: this.getActiveBudgetSummary(),
    });
  }

  dispose() {
    this.disposed = true;
    this.stopLoop();
    window.removeEventListener('resize', this._onWindowResize);
    if (this.canvas) {
      this.canvas.removeEventListener('webglcontextlost', this._handleContextLost, false);
      this.canvas.removeEventListener('webglcontextrestored', this._handleContextRestored, false);
    }
    if (this.controls) {
      this.controls.removeEventListener('start', this._onControlStart);
      this.controls.removeEventListener('change', this._onControlChange);
      this.controls.removeEventListener('end', this._onControlEnd);
      this.controls.dispose();
    }
    this.disposePipelineObjects();
    this.renderer?.dispose();
  }
}
