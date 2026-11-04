import * as THREE from '../../vendor/three/three.module.js';
import { OrbitControls } from '../../vendor/three/addons/controls/OrbitControls.js';
import {
  fullscreenVertexShader,
  schwarzschildFragmentShader,
} from '../shaders/raytracerShader.js';
import {
  bloomPrefilterFragmentShader,
  bloomDownsampleFragmentShader,
  bloomUpsampleFragmentShader,
  compositeFragmentShader,
} from '../shaders/postShaders.js';
import { QUALITY_PROFILES } from '../state/schema.js';

export class GargantuaEngine {
  constructor(canvas, initialState, callbacks = {}) {
    this.canvas = canvas;
    this.state = {
      ...initialState,
      params: { ...initialState.params },
    };
    this.callbacks = callbacks;

    this.ready = false;
    this.contextLost = false;
    this.disposed = false;
    this.rafId = 0;
    this.lastFrameMs = 0;
    this.fpsSmooth = 60;
    this.frameCounter = 0;
    this.userInteracting = false;

    // Cinematic loop smooth state anchored seamlessly to current orbit
    this.loopElapsed = 0;
    this.loopAnchor = {
      distance: this.state.params.cameraDistance,
      elevation: this.state.params.cameraElevation,
      roll: this.state.params.cameraRoll,
    };

    // Scratch math objects (zero per-frame heap allocations)
    this._rightVec = new THREE.Vector3();
    this._upVec = new THREE.Vector3();
    this._backVec = new THREE.Vector3();
    this._forwardVec = new THREE.Vector3();
    this._rollQuat = new THREE.Quaternion();

    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.quadScene = null;
    this.quadCamera = null;
    this.quadMesh = null;
    this.quadGeometry = null;

    this.rayMaterial = null;
    this.prefilterMaterial = null;
    this.downsampleMaterial = null;
    this.upsampleMaterial = null;
    this.compositeMaterial = null;

    this.rtType = THREE.UnsignedByteType;
    this.sceneRT = null;
    this.bloomPrefilterRT = null;
    this.bloomDownRTs = [];
    this.bloomUpRTs = [];
    this.blackFallbackTex = null;

    this.renderBudget = {
      width: 1,
      height: 1,
      renderScale: 1,
      effectiveDpr: 1,
      maxSteps: 232,
      diskSubsamples: 2,
      starLayers: 3,
      bloomMips: 5,
      caSamples: 5,
    };

    this._onContextLost = this.handleContextLost.bind(this);
    this._onContextRestored = this.handleContextRestored.bind(this);
    this._onResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    this.canvas.addEventListener('webglcontextlost', this._onContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._onContextRestored, false);
    window.addEventListener('resize', this._onResize, { passive: true });

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: Boolean(this.state.capture),
    });
    this.renderer.autoClear = false;
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;

    // Setup Three.js PerspectiveCamera + OrbitControls
    this.camera = new THREE.PerspectiveCamera(this.state.params.fov, 1, 0.1, 200);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;
    this.controls.enableDamping = !this.state.capture;
    this.controls.dampingFactor = 0.075;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomSpeed = 0.85;
    this.controls.minDistance = 3.5;
    this.controls.maxDistance = 34.0;
    this.controls.minPolarAngle = THREE.MathUtils.degToRad(5.0);
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(175.0);

    this.applyCameraFromParams(true);

    this.controls.addEventListener('start', () => {
      this.userInteracting = true;
      if (this.state.cinematicPlaying) {
        this.state.cinematicPlaying = false;
        this.callbacks.onCameraInput?.({
          cinematicPlaying: false,
          preset: -1,
          params: { ...this.state.params },
        });
      }
    });

    this.controls.addEventListener('change', () => {
      if (this.userInteracting) {
        this.syncParamsFromCamera();
        this.callbacks.onCameraChange?.({
          params: { ...this.state.params },
          preset: -1,
        });
      }
    });

    this.controls.addEventListener('end', () => {
      this.userInteracting = false;
      this.syncParamsFromCamera();
      this.syncLoopAnchor();
      this.callbacks.onCameraInputEnd?.({
        params: { ...this.state.params },
      });
    });

    this.buildGpuResources();
    this.updateRenderTargets();
    this.renderFrame();

    this.ready = true;
    if (!this.state.capture) {
      this.startLoop();
    }
  }

  detectHdrRenderTargetType() {
    const gl = this.renderer.getContext();
    if (!gl) return THREE.UnsignedByteType;
    const isWebGL2 = this.renderer.capabilities.isWebGL2;
    if (isWebGL2) {
      const extFloat = gl.getExtension('EXT_color_buffer_float');
      const extHalf = gl.getExtension('EXT_color_buffer_half_float');
      if (extFloat || extHalf) {
        return THREE.HalfFloatType;
      }
    } else {
      const extHalf1 = gl.getExtension('EXT_color_buffer_half_float');
      const texHalf1 = gl.getExtension('OES_texture_half_float_linear');
      if (extHalf1 && texHalf1) {
        return THREE.HalfFloatType;
      }
    }
    return THREE.UnsignedByteType;
  }

  buildGpuResources() {
    this.disposeGpuResources();
    this.rtType = this.detectHdrRenderTargetType();

    // Single full-screen clip-space triangle covering [-1, 1]^2 with zero diagonal seam
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array([
      -1, -1, 0,
       3, -1, 0,
      -1,  3, 0,
    ]);
    const uvs = new Float32Array([
      0, 0,
      2, 0,
      0, 2,
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.quadGeometry = geometry;

    const blackPixels = new Uint8Array([0, 0, 0, 255]);
    this.blackFallbackTex = new THREE.DataTexture(blackPixels, 1, 1, THREE.RGBAFormat);
    this.blackFallbackTex.needsUpdate = true;

    const p = this.state.params;
    const profile = QUALITY_PROFILES[this.state.quality] || QUALITY_PROFILES.high;

    this.rayMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: schwarzschildFragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uCamPos: { value: new THREE.Vector3() },
        uCamForward: { value: new THREE.Vector3(0, 0, -1) },
        uCamRight: { value: new THREE.Vector3(1, 0, 0) },
        uCamUp: { value: new THREE.Vector3(0, 1, 0) },
        uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(p.fov) * 0.5) },
        uAspect: { value: 1.6 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: this.state.simTime },
        uMaxSteps: { value: profile.maxSteps },
        uStepScale: { value: profile.stepScale },
        uDiskSubsamples: { value: profile.diskSubsamples },
        uStarLayers: { value: profile.starLayers },
        uDebugMode: { value: this.state.debug },
        uDiskInner: { value: p.diskInnerRadius },
        uDiskOuter: { value: p.diskOuterRadius },
        uDiskHalfThickness: { value: p.diskHalfThickness },
        uDiskTemp: { value: p.diskTemperature },
        uDiskEmission: { value: p.diskEmission },
        uOrbitalSpeed: { value: p.orbitalSpeedScale },
        uTurbulenceAmp: { value: p.turbulenceAmp },
        uTurbulenceSpeed: { value: p.turbulenceSpeed },
        uStarDensity: { value: p.starDensity },
        uGalaxyBrightness: { value: p.galaxyBrightness },
      },
    });

    this.prefilterMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: bloomPrefilterFragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uInputTex: { value: this.blackFallbackTex },
        uTexelSize: { value: new THREE.Vector2(1, 1) },
        uThreshold: { value: p.bloomThreshold },
      },
    });

    this.downsampleMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: bloomDownsampleFragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uInputTex: { value: this.blackFallbackTex },
        uTexelSize: { value: new THREE.Vector2(1, 1) },
      },
    });

    this.upsampleMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: bloomUpsampleFragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uLowMipTex: { value: this.blackFallbackTex },
        uHighMipTex: { value: this.blackFallbackTex },
        uTexelSize: { value: new THREE.Vector2(1, 1) },
        uRadius: { value: 1.0 },
      },
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: compositeFragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uSceneTex: { value: this.blackFallbackTex },
        uBloomTex: { value: this.blackFallbackTex },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: this.state.simTime },
        uDebugMode: { value: this.state.debug },
        uCaSamples: { value: profile.caSamples },
        uBloomStrength: { value: p.bloomStrength },
        uExposure: { value: p.exposure },
        uVignette: { value: p.vignette },
        uFilmGrain: { value: p.filmGrain },
        uChromaticAberration: { value: p.chromaticAberration },
      },
    });

    this.quadScene = new THREE.Scene();
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadMesh = new THREE.Mesh(this.quadGeometry, this.rayMaterial);
    this.quadMesh.frustumCulled = false;
    this.quadScene.add(this.quadMesh);

    // Pre-compile materials so initial render has zero shader stutter
    this.renderer.compile(this.quadScene, this.quadCamera);
  }

  createHdrTarget(width, height) {
    return new THREE.WebGLRenderTarget(Math.max(1, width), Math.max(1, height), {
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

  disposeRenderTargets() {
    this.sceneRT?.dispose();
    this.sceneRT = null;
    this.bloomPrefilterRT?.dispose();
    this.bloomPrefilterRT = null;
    for (const rt of this.bloomDownRTs) rt.dispose();
    for (const rt of this.bloomUpRTs) rt.dispose();
    this.bloomDownRTs = [];
    this.bloomUpRTs = [];
  }

  disposeGpuResources() {
    this.disposeRenderTargets();
    this.quadGeometry?.dispose();
    this.quadGeometry = null;
    this.rayMaterial?.dispose();
    this.rayMaterial = null;
    this.prefilterMaterial?.dispose();
    this.prefilterMaterial = null;
    this.downsampleMaterial?.dispose();
    this.downsampleMaterial = null;
    this.upsampleMaterial?.dispose();
    this.upsampleMaterial = null;
    this.compositeMaterial?.dispose();
    this.compositeMaterial = null;
    this.blackFallbackTex?.dispose();
    this.blackFallbackTex = null;
    this.quadScene = null;
    this.quadCamera = null;
    this.quadMesh = null;
  }

  updateRenderTargets() {
    if (!this.renderer || this.contextLost) return;

    const rect = this.canvas.parentElement?.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.round(rect?.width || window.innerWidth || 1280));
    const cssHeight = Math.max(1, Math.round(rect?.height || window.innerHeight || 720));
    const isMobile = cssWidth <= 768;

    const profile = QUALITY_PROFILES[this.state.quality] || QUALITY_PROFILES.high;
    const rawDpr = window.devicePixelRatio || 1;
    const maxDpr = isMobile ? profile.mobileMaxDpr : profile.maxDpr;
    const effectiveDpr = Math.min(rawDpr, maxDpr);
    const scale = isMobile ? profile.mobileRenderScale : profile.renderScale;

    this.renderer.setPixelRatio(effectiveDpr);
    this.renderer.setSize(cssWidth, cssHeight, false);

    const internalWidth = Math.max(64, Math.round(cssWidth * effectiveDpr * scale));
    const internalHeight = Math.max(64, Math.round(cssHeight * effectiveDpr * scale));

    const mipsChanged = this.bloomDownRTs.length !== profile.bloomMips;
    const sizeChanged =
      !this.sceneRT ||
      this.sceneRT.width !== internalWidth ||
      this.sceneRT.height !== internalHeight;

    if (sizeChanged || mipsChanged) {
      this.disposeRenderTargets();
      this.sceneRT = this.createHdrTarget(internalWidth, internalHeight);

      let bw = Math.max(2, Math.floor(internalWidth * 0.5));
      let bh = Math.max(2, Math.floor(internalHeight * 0.5));
      this.bloomPrefilterRT = this.createHdrTarget(bw, bh);

      for (let i = 0; i < profile.bloomMips; i++) {
        bw = Math.max(2, Math.floor(bw * 0.5));
        bh = Math.max(2, Math.floor(bh * 0.5));
        this.bloomDownRTs.push(this.createHdrTarget(bw, bh));
      }

      // Upsample chain ascends from second-smallest mip back up to half-res prefilter size
      for (let i = profile.bloomMips - 2; i >= 0; i--) {
        const targetMip = this.bloomDownRTs[i];
        this.bloomUpRTs.push(this.createHdrTarget(targetMip.width, targetMip.height));
      }
      this.bloomUpRTs.push(
        this.createHdrTarget(this.bloomPrefilterRT.width, this.bloomPrefilterRT.height),
      );
    }

    this.renderBudget = {
      width: internalWidth,
      height: internalHeight,
      cssWidth,
      cssHeight,
      renderScale: Number(scale.toFixed(2)),
      effectiveDpr: Number(effectiveDpr.toFixed(2)),
      maxSteps: profile.maxSteps,
      diskSubsamples: profile.diskSubsamples,
      starLayers: profile.starLayers,
      bloomMips: profile.bloomMips,
      caSamples: profile.caSamples,
    };

    this.callbacks.onBudgetChange?.({ ...this.renderBudget });
  }

  handleResize() {
    if (this.disposed || this.contextLost) return;
    this.updateRenderTargets();
    if (!this.rafId) {
      this.renderFrame();
    }
  }

  syncLoopAnchor() {
    this.loopElapsed = 0;
    this.loopAnchor = {
      distance: this.state.params.cameraDistance,
      elevation: this.state.params.cameraElevation,
      roll: this.state.params.cameraRoll,
    };
  }

  applyCameraFromParams(instant = true) {
    if (!this.camera || !this.controls) return;
    const p = this.state.params;
    const dist = THREE.MathUtils.clamp(p.cameraDistance, 3.5, 34.0);
    const elRad = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(p.cameraElevation, -85, 85));
    const azRad = THREE.MathUtils.degToRad(p.cameraAzimuth);
    const cosEl = Math.cos(elRad);

    this.camera.position.set(
      dist * cosEl * Math.sin(azRad),
      dist * Math.sin(elRad),
      dist * cosEl * Math.cos(azRad),
    );
    this.camera.fov = p.fov;
    this.controls.target.set(0, 0, 0);

    const prevDamping = this.controls.enableDamping;
    if (instant) {
      this.controls.enableDamping = false;
    }
    this.controls.update();
    this.controls.enableDamping = prevDamping;
  }

  syncParamsFromCamera() {
    if (!this.camera) return;
    const pos = this.camera.position;
    const dist = THREE.MathUtils.clamp(pos.length(), 3.5, 34.0);
    const sinEl = THREE.MathUtils.clamp(pos.y / Math.max(dist, 1e-5), -1, 1);
    const elevation = THREE.MathUtils.clamp(THREE.MathUtils.radToDeg(Math.asin(sinEl)), -85, 85);
    let azimuth = THREE.MathUtils.radToDeg(Math.atan2(pos.x, pos.z));
    if (Object.is(azimuth, -0)) azimuth = 0;

    this.state.params.cameraDistance = Number(dist.toFixed(2));
    this.state.params.cameraElevation = Number(elevation.toFixed(2));
    this.state.params.cameraAzimuth = Number(azimuth.toFixed(2));
  }

  syncShaderUniforms() {
    if (!this.rayMaterial || !this.compositeMaterial || !this.sceneRT) return;
    const p = this.state.params;
    const profile = QUALITY_PROFILES[this.state.quality] || QUALITY_PROFILES.high;

    const canvasWidth = Math.max(1, this.canvas.width);
    const canvasHeight = Math.max(1, this.canvas.height);
    const aspect = canvasWidth / canvasHeight;

    this.camera.fov = p.fov;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld(true);

    this.camera.matrixWorld.extractBasis(this._rightVec, this._upVec, this._backVec);
    this._forwardVec.copy(this._backVec).negate().normalize();
    this._rightVec.normalize();
    this._upVec.normalize();

    const rollRad = THREE.MathUtils.degToRad(p.cameraRoll || 0);
    if (Math.abs(rollRad) > 1e-5) {
      this._rollQuat.setFromAxisAngle(this._forwardVec, rollRad);
      this._rightVec.applyQuaternion(this._rollQuat).normalize();
      this._upVec.applyQuaternion(this._rollQuat).normalize();
    }

    const ru = this.rayMaterial.uniforms;
    ru.uCamPos.value.copy(this.camera.position);
    ru.uCamForward.value.copy(this._forwardVec);
    ru.uCamRight.value.copy(this._rightVec);
    ru.uCamUp.value.copy(this._upVec);
    const baseTanHalf = Math.tan(THREE.MathUtils.degToRad(p.fov) * 0.5);
    const portraitScale = aspect < 1.0 ? 1 / Math.max(aspect * 1.08, 0.56) : 1.0;
    ru.uTanHalfFov.value = baseTanHalf * portraitScale;
    ru.uAspect.value = aspect;
    ru.uResolution.value.set(this.sceneRT.width, this.sceneRT.height);

    ru.uTime.value = this.state.simTime;
    ru.uMaxSteps.value = profile.maxSteps;
    ru.uStepScale.value = profile.stepScale;
    ru.uDiskSubsamples.value = profile.diskSubsamples;
    ru.uStarLayers.value = profile.starLayers;
    ru.uDebugMode.value = this.state.debug;

    ru.uDiskInner.value = p.diskInnerRadius;
    ru.uDiskOuter.value = p.diskOuterRadius;
    ru.uDiskHalfThickness.value = p.diskHalfThickness;
    ru.uDiskTemp.value = p.diskTemperature;
    ru.uDiskEmission.value = p.diskEmission;
    ru.uOrbitalSpeed.value = p.orbitalSpeedScale;
    ru.uTurbulenceAmp.value = p.turbulenceAmp;
    ru.uTurbulenceSpeed.value = p.turbulenceSpeed;
    ru.uStarDensity.value = p.starDensity;
    ru.uGalaxyBrightness.value = p.galaxyBrightness;

    const cu = this.compositeMaterial.uniforms;
    cu.uResolution.value.set(canvasWidth, canvasHeight);
    cu.uTime.value = this.state.simTime;
    cu.uDebugMode.value = this.state.debug;
    cu.uCaSamples.value = profile.caSamples;
    cu.uBloomStrength.value = p.bloomStrength;
    cu.uExposure.value = p.exposure;
    cu.uVignette.value = p.vignette;
    cu.uFilmGrain.value = p.filmGrain;
    cu.uChromaticAberration.value = p.chromaticAberration;
  }

  renderFrame() {
    if (this.disposed || this.contextLost || !this.renderer || !this.sceneRT || !this.quadMesh) {
      return;
    }

    if (this.controls && !this.state.capture && this.userInteracting) {
      this.controls.update();
    }

    this.syncShaderUniforms();

    // Pass 1: Schwarzschild Null Geodesic HDR Scene Render
    this.quadMesh.material = this.rayMaterial;
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.render(this.quadScene, this.quadCamera);

    let bloomResultTex = this.blackFallbackTex;
    const shouldRunBloom =
      this.state.debug === 0 &&
      this.state.params.bloomStrength > 0.001 &&
      this.bloomPrefilterRT &&
      this.bloomDownRTs.length > 0 &&
      this.bloomUpRTs.length > 0;

    if (shouldRunBloom) {
      // Pass 2: Soft-knee HDR Prefilter
      this.prefilterMaterial.uniforms.uInputTex.value = this.sceneRT.texture;
      this.prefilterMaterial.uniforms.uTexelSize.value.set(
        1 / this.sceneRT.width,
        1 / this.sceneRT.height,
      );
      this.prefilterMaterial.uniforms.uThreshold.value = this.state.params.bloomThreshold;
      this.quadMesh.material = this.prefilterMaterial;
      this.renderer.setRenderTarget(this.bloomPrefilterRT);
      this.renderer.render(this.quadScene, this.quadCamera);

      // Pass 3..N: Progressive Jimenez 13-tap Downsample Pyramid
      this.quadMesh.material = this.downsampleMaterial;
      let prevRT = this.bloomPrefilterRT;
      for (let i = 0; i < this.bloomDownRTs.length; i++) {
        const dstRT = this.bloomDownRTs[i];
        this.downsampleMaterial.uniforms.uInputTex.value = prevRT.texture;
        this.downsampleMaterial.uniforms.uTexelSize.value.set(
          1 / prevRT.width,
          1 / prevRT.height,
        );
        this.renderer.setRenderTarget(dstRT);
        this.renderer.render(this.quadScene, this.quadCamera);
        prevRT = dstRT;
      }

      // Pass N+1..M: Progressive 9-tap Tent Upsample Pyramid
      this.quadMesh.material = this.upsampleMaterial;
      let lowRT = this.bloomDownRTs[this.bloomDownRTs.length - 1];
      for (let step = 0; step < this.bloomUpRTs.length; step++) {
        const dstUpRT = this.bloomUpRTs[step];
        const highIdx = this.bloomDownRTs.length - 2 - step;
        const highRT = highIdx >= 0 ? this.bloomDownRTs[highIdx] : this.bloomPrefilterRT;

        this.upsampleMaterial.uniforms.uLowMipTex.value = lowRT.texture;
        this.upsampleMaterial.uniforms.uHighMipTex.value = highRT.texture;
        this.upsampleMaterial.uniforms.uTexelSize.value.set(
          1 / lowRT.width,
          1 / lowRT.height,
        );
        this.upsampleMaterial.uniforms.uRadius.value = 1.15;

        this.renderer.setRenderTarget(dstUpRT);
        this.renderer.render(this.quadScene, this.quadCamera);
        lowRT = dstUpRT;
      }

      bloomResultTex = lowRT.texture;
    }

    // Final Pass: Chromatic Aberration + HDR Bloom + ACES + Vignette + Film Grain -> Screen
    this.compositeMaterial.uniforms.uSceneTex.value = this.sceneRT.texture;
    this.compositeMaterial.uniforms.uBloomTex.value = bloomResultTex;
    this.quadMesh.material = this.compositeMaterial;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  startLoop() {
    if (this.rafId || this.disposed || this.contextLost || this.state.capture) return;
    this.lastFrameMs = performance.now();
    const tick = (nowMs) => {
      if (this.disposed || this.contextLost || this.state.capture) {
        this.rafId = 0;
        return;
      }
      this.rafId = window.requestAnimationFrame(tick);

      const rawDt = Math.max(0, (nowMs - this.lastFrameMs) * 0.001);
      this.lastFrameMs = nowMs;
      const dt = Math.min(rawDt, 0.1);

      if (rawDt > 0.0005) {
        const instFps = 1 / rawDt;
        this.fpsSmooth = this.fpsSmooth * 0.92 + instFps * 0.08;
      }

      // Advance relativistic simulation time
      this.state.simTime += dt * this.state.params.timeScale;

      // Advance cinematic camera loop smoothly when active and user is not dragging
      if (this.state.cinematicPlaying && !this.userInteracting) {
        this.loopElapsed += dt;
        const nextAz =
          (((this.state.params.cameraAzimuth + dt * 1.65 + 180) % 360) + 360) % 360 - 180;
        const elevWave = Math.sin(this.loopElapsed * 0.22) * 2.4;
        const distWave = (1 - Math.cos(this.loopElapsed * 0.16)) * -0.65;
        const rollWave = Math.sin(this.loopElapsed * 0.17) * 2.2;

        this.state.params.cameraAzimuth = Number(nextAz.toFixed(2));
        this.state.params.cameraElevation = Number(
          THREE.MathUtils.clamp(this.loopAnchor.elevation + elevWave, -82, 82).toFixed(2),
        );
        this.state.params.cameraDistance = Number(
          THREE.MathUtils.clamp(this.loopAnchor.distance + distWave, 4.0, 33.0).toFixed(2),
        );
        this.state.params.cameraRoll = Number(
          THREE.MathUtils.clamp(this.loopAnchor.roll + rollWave, -85, 85).toFixed(2),
        );
        this.applyCameraFromParams(true);
      } else if (this.controls.enableDamping) {
        this.controls.update();
      }

      this.renderFrame();

      this.frameCounter += 1;
      if (this.frameCounter % 12 === 0) {
        this.callbacks.onTelemetry?.({
          fps: Math.round(this.fpsSmooth),
          simTime: this.state.simTime,
          params: this.state.cinematicPlaying ? { ...this.state.params } : null,
        });
      }
    };
    this.rafId = window.requestAnimationFrame(tick);
  }

  stopLoop() {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  applyState(nextState, { cameraUpdated = false, resetAnchor = false, renderImmediate = true } = {}) {
    const qualityChanged = nextState.quality !== this.state.quality;
    const captureChanged = nextState.capture !== this.state.capture;

    this.state = {
      ...nextState,
      params: { ...nextState.params },
    };

    if (this.controls) {
      this.controls.enableDamping = !this.state.capture;
    }

    if (cameraUpdated) {
      this.applyCameraFromParams(true);
    }
    if (resetAnchor || cameraUpdated) {
      this.syncLoopAnchor();
    }
    if (qualityChanged) {
      this.updateRenderTargets();
    }
    if (captureChanged) {
      if (this.state.capture) {
        this.stopLoop();
      } else if (!this.contextLost) {
        this.startLoop();
      }
    }
    if (renderImmediate && !this.contextLost) {
      this.renderFrame();
    }
  }

  handleContextLost(event) {
    event.preventDefault();
    this.stopLoop();
    this.contextLost = true;
    this.ready = false;
    document.documentElement.dataset.gargantuaReady = 'false';
    document.documentElement.dataset.gargantuaContextLost = 'true';
    this.callbacks.onContextLost?.();
  }

  handleContextRestored() {
    if (this.disposed) return;
    // Allow Three.js WebGLRenderer internal onContextRestore listener to run first
    window.setTimeout(() => {
      if (this.disposed) return;
      try {
        this.contextLost = false;
        this.buildGpuResources();
        this.applyCameraFromParams(true);
        this.updateRenderTargets();
        this.renderFrame();

        this.ready = true;
        delete document.documentElement.dataset.gargantuaContextLost;
        document.documentElement.dataset.gargantuaReady = 'true';
        this.callbacks.onContextRestored?.();

        if (!this.state.capture) {
          this.startLoop();
        }
      } catch (err) {
        this.callbacks.onError?.(err);
      }
    }, 24);
  }

  dispose() {
    this.disposed = true;
    this.stopLoop();
    window.removeEventListener('resize', this._onResize);
    if (this.canvas) {
      this.canvas.removeEventListener('webglcontextlost', this._onContextLost, false);
      this.canvas.removeEventListener('webglcontextrestored', this._onContextRestored, false);
    }
    this.controls?.dispose();
    this.disposeGpuResources();
    this.renderer?.dispose();
    this.renderer = null;
  }
}
