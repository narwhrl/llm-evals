import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { PARAMETERS, QUALITY_PROFILES, normalizeState } from './config.js';
import fullscreenVertex from './shaders/fullscreen.vert.glsl?raw';
import geodesicFragment from './shaders/geodesic.frag.glsl?raw';
import brightFragment from './shaders/bright.frag.glsl?raw';
import blurFragment from './shaders/blur.frag.glsl?raw';
import compositeFragment from './shaders/composite.frag.glsl?raw';

const DEG2RAD = Math.PI / 180;
const TAU = Math.PI * 2;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function makeTarget(width = 2, height = 2) {
  const target = new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });
  target.texture.colorSpace = THREE.LinearSRGBColorSpace;
  return target;
}

function makeMaterial(fragmentShader, uniforms) {
  return new THREE.ShaderMaterial({
    vertexShader: fullscreenVertex,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
    transparent: false,
    toneMapped: false,
  });
}

export class GargantuaEngine {
  constructor(container, state, options = {}) {
    this.container = container;
    this.capture = Boolean(options.capture);
    this.callbacks = options.callbacks ?? {};
    this.simTime = options.simTime ?? 0;
    this.state = normalizeState(state);
    this.ready = false;
    this.contextLost = false;
    this.destroyed = false;
    this.frameHandle = 0;
    this.frameCount = 0;
    this.cinematicTime = 0;
    this.cinematicBase = { ...this.state.params };
    this.lastFrameTime = 0;
    this.shaderError = null;
    this.renderSize = { width: 0, height: 0, bloomWidth: 0, bloomHeight: 0, pixelRatio: 1 };

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
      const programLog = gl.getProgramInfoLog(program) || '';
      const vertexLog = gl.getShaderInfoLog(vertexShader) || '';
      const fragmentLog = gl.getShaderInfoLog(fragmentShader) || '';
      this.shaderError = new Error(`Shader compilation failed: ${[programLog, vertexLog, fragmentLog].filter(Boolean).join('\n')}`);
    };
    this.renderer.domElement.className = 'gargantua-canvas';
    this.renderer.domElement.setAttribute('aria-label', 'Numerically ray-traced Schwarzschild black hole');
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(this.state.params.fov, 1, 0.05, 200);
    this.screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
    this.screenCamera.position.z = 1;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.rotateSpeed = 0.48;
    this.controls.zoomSpeed = 0.72;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 34;
    this.controls.minPolarAngle = 10 * DEG2RAD;
    this.controls.maxPolarAngle = 170 * DEG2RAD;
    this.controlSyncActive = false;
    this.controlsInteracting = false;
    this.cameraSyncTimer = 0;
    this.scheduleCameraSync = () => {
      if (!this.controlSyncActive) return;
      window.clearTimeout(this.cameraSyncTimer);
      this.cameraSyncTimer = window.setTimeout(() => {
        this.callbacks.onCameraChange?.(this.getCameraParams());
        if (!this.controlsInteracting) this.controlSyncActive = false;
      }, 90);
    };
    this.controls.addEventListener('start', this.handleControlStart = () => {
      this.controlSyncActive = true;
      this.controlsInteracting = true;
      this.callbacks.onInteraction?.(this.getCameraParams());
    });
    this.controls.addEventListener('change', this.handleControlChange = () => this.scheduleCameraSync());
    this.controls.addEventListener('end', this.handleControlEnd = () => {
      this.controlsInteracting = false;
      this.scheduleCameraSync();
    });

    this.scene = new THREE.Scene();
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);

    this.geodesicUniforms = {
      uResolution: { value: new THREE.Vector2(2, 2) },
      uTime: { value: this.simTime },
      uAspect: { value: 1 },
      uTanHalfFov: { value: Math.tan(this.camera.fov * DEG2RAD * 0.5) },
      uCameraPos: { value: new THREE.Vector3() },
      uCameraForward: { value: new THREE.Vector3(0, 0, -1) },
      uCameraRight: { value: new THREE.Vector3(1, 0, 0) },
      uCameraUp: { value: new THREE.Vector3(0, 1, 0) },
      uMaxSteps: { value: 160 },
      uMaxDiskHits: { value: 4 },
      uDebug: { value: 0 },
      uDiskInner: { value: 3 },
      uDiskOuter: { value: 12.5 },
      uDiskHalfThickness: { value: 0.1 },
      uDiskTemperature: { value: 1.05 },
      uDiskEmission: { value: 3.2 },
      uOrbitalSpeed: { value: 1 },
      uTurbulenceAmount: { value: 0.7 },
      uTurbulenceSpeed: { value: 0.75 },
      uStarDensity: { value: 0.62 },
      uGalaxyBrightness: { value: 0.95 },
    };
    this.brightUniforms = {
      tInput: { value: null },
      uSourceTexel: { value: new THREE.Vector2(0.5, 0.5) },
      uThreshold: { value: 0.85 },
    };
    this.blurUniforms = {
      tInput: { value: null },
      uDirection: { value: new THREE.Vector2() },
    };
    this.compositeUniforms = {
      tScene: { value: null },
      tBloom: { value: null },
      uResolution: { value: new THREE.Vector2(2, 2) },
      uTime: { value: this.simTime },
      uExposure: { value: 1.05 },
      uBloomStrength: { value: 0.85 },
      uVignette: { value: 0.32 },
      uGrain: { value: 0.2 },
      uChromatic: { value: 0.16 },
      uDebug: { value: 0 },
    };

    this.geodesicMaterial = makeMaterial(geodesicFragment, this.geodesicUniforms);
    this.brightMaterial = makeMaterial(brightFragment, this.brightUniforms);
    this.blurMaterial = makeMaterial(blurFragment, this.blurUniforms);
    this.compositeMaterial = makeMaterial(compositeFragment, this.compositeUniforms);
    this.materials = [this.geodesicMaterial, this.brightMaterial, this.blurMaterial, this.compositeMaterial];
    this.createTargets();

    this.handleResize = () => this.resize();
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this.container);
    window.addEventListener('resize', this.handleResize, { passive: true });

    this.handleContextLost = (event) => {
      event.preventDefault();
      this.contextLost = true;
      this.ready = false;
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = 0;
      this.callbacks.onContextChange?.('lost');
    };
    this.handleContextRestored = () => {
      try {
        this.shaderError = null;
        this.createTargets(true);
        for (const material of this.materials) material.needsUpdate = true;
        this.renderer.resetState();
        this.resize();
        this.contextLost = false;
        this.applyState(this.state, { syncCamera: false });
        this.renderFrame();
        if (this.shaderError) throw this.shaderError;
        this.ready = true;
        this.callbacks.onContextChange?.('restored');
        this.start();
      } catch (error) {
        this.callbacks.onContextChange?.('error', error);
      }
    };
    this.renderer.domElement.addEventListener('webglcontextlost', this.handleContextLost);
    this.renderer.domElement.addEventListener('webglcontextrestored', this.handleContextRestored);
    this.frame = this.frame.bind(this);
  }

  createTargets(discardOld = false) {
    if (discardOld) {
      // Handles belonging to the lost GPU context must not be deleted in the new one.
      this.hdrTarget = null;
      this.bloomA = null;
      this.bloomB = null;
    } else {
      this.disposeTargets();
    }
    this.hdrTarget = makeTarget();
    this.bloomA = makeTarget();
    this.bloomB = makeTarget();
  }

  disposeTargets() {
    this.hdrTarget?.dispose();
    this.bloomA?.dispose();
    this.bloomB?.dispose();
  }

  initialize() {
    this.applyState(this.state, { syncCamera: true });
    this.resize();
    this.renderFrame();
    if (this.shaderError) throw this.shaderError;
    const gl = this.renderer.getContext();
    if (gl.isContextLost()) throw new Error('WebGL context was lost during initialization.');
    this.ready = true;
    this.start();
    return this.getRenderInfo();
  }

  applyState(nextState, { syncCamera = false } = {}) {
    const previous = this.state;
    const next = normalizeState(nextState);
    const qualityChanged = !previous || previous.quality !== next.quality;
    const enteredCinematic = next.playing && (!previous?.playing || syncCamera);
    this.state = next;

    if (syncCamera) this.setCameraFromParams(next.params);
    if (enteredCinematic) {
      this.cinematicTime = 0;
      this.cinematicBase = { ...next.params };
    }
    if (!next.playing && previous?.playing) this.cinematicTime = 0;

    this.camera.fov = next.params.fov;
    this.camera.updateProjectionMatrix();
    const profile = QUALITY_PROFILES[next.quality];
    this.geodesicUniforms.uMaxSteps.value = profile.maxSteps;
    this.geodesicUniforms.uMaxDiskHits.value = profile.maxDiskHits;
    this.geodesicUniforms.uDebug.value = next.debug;
    this.compositeUniforms.uDebug.value = next.debug;
    this.brightUniforms.uThreshold.value = next.params.bloomThreshold;

    for (const definition of PARAMETERS) {
      const uniform = this.geodesicUniforms[definition.uniform];
      if (uniform) uniform.value = next.params[definition.key];
      const compositeUniform = this.compositeUniforms[definition.uniform];
      if (compositeUniform) compositeUniform.value = next.params[definition.key];
    }
    this.geodesicUniforms.uTime.value = this.simTime;
    this.compositeUniforms.uTime.value = this.simTime;
    this.updateCameraUniforms();
    if (qualityChanged) this.resize();
    if (this.ready && this.capture && !this.contextLost) this.renderFrame();
  }

  setCameraFromParams(params) {
    const azimuth = params.azimuth * DEG2RAD;
    const elevation = params.elevation * DEG2RAD;
    const horizontal = params.distance * Math.cos(elevation);
    this.camera.position.set(
      horizontal * Math.sin(azimuth),
      params.distance * Math.sin(elevation),
      horizontal * Math.cos(azimuth),
    );
    this.camera.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.updateCameraUniforms();
  }

  updateCinematicCamera() {
    const base = this.cinematicBase;
    const phase = this.cinematicTime * TAU / 120;
    const params = {
      ...base,
      azimuth: base.azimuth + phase / DEG2RAD,
      elevation: clamp(base.elevation + Math.sin(phase) * 3.5, -78, 78),
      distance: clamp(base.distance + Math.sin(phase * 2) * 0.65, 6, 34),
    };
    this.setCameraFromParams(params);
  }

  updateCameraUniforms() {
    if (!this.geodesicUniforms) return;
    this.camera.updateMatrixWorld();
    this.camera.getWorldDirection(this.geodesicUniforms.uCameraForward.value);
    this.geodesicUniforms.uCameraPos.value.copy(this.camera.position);
    this.geodesicUniforms.uCameraRight.value.setFromMatrixColumn(this.camera.matrixWorld, 0).normalize();
    this.geodesicUniforms.uCameraUp.value.setFromMatrixColumn(this.camera.matrixWorld, 1).normalize();
    this.framingCompensation = Math.max(1, 0.85 / this.camera.aspect);
    this.geodesicUniforms.uTanHalfFov.value = Math.tan(this.camera.fov * DEG2RAD * 0.5) * this.framingCompensation;
  }

  getCameraParams() {
    const offset = this.camera.position.clone();
    const spherical = new THREE.Spherical().setFromVector3(offset);
    let azimuth = Math.atan2(offset.x, offset.z) / DEG2RAD;
    if (azimuth > 180) azimuth -= 360;
    return {
      fov: Math.round(this.camera.fov * 100) / 100,
      distance: Math.round(spherical.radius * 1000) / 1000,
      azimuth: Math.round(azimuth * 1000) / 1000,
      elevation: Math.round((90 - spherical.phi / DEG2RAD) * 1000) / 1000,
    };
  }

  resize() {
    if (this.destroyed || !this.renderer) return;
    const cssWidth = Math.max(2, this.container.clientWidth || window.innerWidth);
    const cssHeight = Math.max(2, this.container.clientHeight || window.innerHeight);
    const profile = QUALITY_PROFILES[this.state.quality];
    const pixelRatio = Math.min(window.devicePixelRatio || 1, profile.dprCap) * profile.scale;
    const width = Math.max(2, Math.floor(cssWidth * pixelRatio));
    const height = Math.max(2, Math.floor(cssHeight * pixelRatio));
    const bloomWidth = Math.max(2, Math.floor(width * profile.bloomScale));
    const bloomHeight = Math.max(2, Math.floor(height * profile.bloomScale));
    this.renderer.setSize(width, height, false);
    this.hdrTarget.setSize(width, height);
    this.bloomA.setSize(bloomWidth, bloomHeight);
    this.bloomB.setSize(bloomWidth, bloomHeight);
    this.camera.aspect = cssWidth / cssHeight;
    this.camera.updateProjectionMatrix();
    this.geodesicUniforms.uAspect.value = this.camera.aspect;
    this.geodesicUniforms.uResolution.value.set(width, height);
    this.compositeUniforms.uResolution.value.set(width, height);
    this.brightUniforms.uSourceTexel.value.set(1 / width, 1 / height);
    this.renderSize = { width, height, bloomWidth, bloomHeight, pixelRatio };
    this.updateCameraUniforms();
    if (this.ready && this.capture && !this.contextLost) this.renderFrame();
  }

  renderFrame() {
    if (this.contextLost || this.destroyed) return;
    this.renderer.setRenderTarget(this.hdrTarget);
    this.quad.material = this.geodesicMaterial;
    this.renderer.render(this.scene, this.screenCamera);

    this.brightUniforms.tInput.value = this.hdrTarget.texture;
    this.renderer.setRenderTarget(this.bloomA);
    this.quad.material = this.brightMaterial;
    this.renderer.render(this.scene, this.screenCamera);

    const { bloomPasses } = QUALITY_PROFILES[this.state.quality];
    const { bloomWidth, bloomHeight } = this.renderSize;
    for (let pass = 0; pass < bloomPasses; pass++) {
      const radius = 1 + pass * 0.72;
      this.blurUniforms.tInput.value = this.bloomA.texture;
      this.blurUniforms.uDirection.value.set(radius / bloomWidth, 0);
      this.renderer.setRenderTarget(this.bloomB);
      this.quad.material = this.blurMaterial;
      this.renderer.render(this.scene, this.screenCamera);

      this.blurUniforms.tInput.value = this.bloomB.texture;
      this.blurUniforms.uDirection.value.set(0, radius / bloomHeight);
      this.renderer.setRenderTarget(this.bloomA);
      this.renderer.render(this.scene, this.screenCamera);
    }

    this.compositeUniforms.tScene.value = this.hdrTarget.texture;
    this.compositeUniforms.tBloom.value = this.bloomA.texture;
    this.renderer.setRenderTarget(null);
    this.quad.material = this.compositeMaterial;
    this.renderer.render(this.scene, this.screenCamera);
    this.frameCount++;
  }

  start() {
    if (this.capture || this.destroyed || this.contextLost || this.frameHandle) return;
    this.lastFrameTime = performance.now();
    this.frameHandle = requestAnimationFrame(this.frame);
  }

  frame(now) {
    this.frameHandle = 0;
    if (this.destroyed || this.contextLost) return;
    const delta = Math.min(Math.max((now - this.lastFrameTime) / 1000, 0), 0.05);
    this.lastFrameTime = now;
    if (this.state.playing) {
      this.cinematicTime += delta;
      this.updateCinematicCamera();
    } else {
      this.controls.update();
      this.updateCameraUniforms();
    }
    this.simTime += delta * this.state.params.timeScale;
    this.geodesicUniforms.uTime.value = this.simTime;
    this.compositeUniforms.uTime.value = this.simTime;
    this.renderFrame();
    this.frameHandle = requestAnimationFrame(this.frame);
  }

  setTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return false;
    this.simTime = seconds;
    this.geodesicUniforms.uTime.value = seconds;
    this.compositeUniforms.uTime.value = seconds;
    if (!this.contextLost) this.renderFrame();
    return true;
  }

  getRenderInfo() {
    const profile = QUALITY_PROFILES[this.state.quality];
    return {
      ...this.renderSize,
      maxSteps: profile.maxSteps,
      maxDiskHits: profile.maxDiskHits,
      bloomPasses: profile.bloomPasses,
      frameCount: this.frameCount,
      time: this.simTime,
      contextLost: this.contextLost,
      camera: this.getCameraParams(),
      framingCompensation: this.framingCompensation ?? 1,
    };
  }

  dispose() {
    this.destroyed = true;
    cancelAnimationFrame(this.frameHandle);
    this.resizeObserver.disconnect();
    window.removeEventListener('resize', this.handleResize);
    window.clearTimeout(this.cameraSyncTimer);
    this.controls.removeEventListener('start', this.handleControlStart);
    this.controls.removeEventListener('change', this.handleControlChange);
    this.controls.removeEventListener('end', this.handleControlEnd);
    this.controls.dispose();
    this.renderer.domElement.removeEventListener('webglcontextlost', this.handleContextLost);
    this.renderer.domElement.removeEventListener('webglcontextrestored', this.handleContextRestored);
    this.disposeTargets();
    this.quad.geometry.dispose();
    for (const material of this.materials) material.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
