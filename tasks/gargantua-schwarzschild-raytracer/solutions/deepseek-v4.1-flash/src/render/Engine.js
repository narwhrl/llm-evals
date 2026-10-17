import * as THREE from 'three';
import { OrbitControls } from '../../vendor/three/addons/controls/OrbitControls.js';
import { CAMERA_KEYS, QUALITY_PROFILES, clampParam } from '../state/schema.js';
import fullscreenVertex from './shaders/fullscreen.vert.glsl?raw';
import sceneFragment from './shaders/scene.frag.glsl?raw';
import thresholdFragment from './shaders/threshold.frag.glsl?raw';
import downsampleFragment from './shaders/downsample.frag.glsl?raw';
import blurFragment from './shaders/blur.frag.glsl?raw';
import compositeFragment from './shaders/composite.frag.glsl?raw';

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const BLOOM_LEVELS = 5;
const MIN_ELEVATION = 0.04;
const ORBIT_DEG_PER_SECOND = 2.35;
const TWEEN_MS = 1150;
const TELEMETRY_MS = 250;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function wrapDegrees(value) {
  return ((value % 360) + 360) % 360;
}

function cameraPosition(distance, azimuthDeg, elevationDeg) {
  const elevation = elevationDeg * D2R;
  const azimuth = azimuthDeg * D2R;
  const cosEl = Math.cos(elevation);
  return new THREE.Vector3(
    distance * cosEl * Math.sin(azimuth),
    distance * Math.sin(elevation),
    distance * cosEl * Math.cos(azimuth),
  );
}

function makeRenderTarget(width, height) {
  const target = new THREE.WebGLRenderTarget(Math.max(1, width), Math.max(1, height), {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });
  target.texture.colorSpace = THREE.LinearSRGBColorSpace;
  return target;
}

export class Engine {
  constructor({ container, store, onReady, onContextChange, onError }) {
    this.container = container;
    this.store = store;
    this.state = store.getState();
    this.onReady = onReady;
    this.onContextChange = onContextChange;
    this.onError = onError;

    this.ready = false;
    this.contextLost = false;
    this.disposed = false;
    this.error = null;
    this.raf = null;
    this.lastFrameAt = 0;
    this.simTime = Number.isFinite(this.state.time) ? this.state.time : 0;
    this.cineAzimuth = this.state.params.azimuth;
    this.tween = null;
    this.userOrbiting = false;
    this.fps = 0;
    this.fpsFrames = 0;
    this.fpsWindowStart = 0;
    this.lastTelemetryAt = 0;
    this.internalSize = { width: 1, height: 1 };
    this.cssSize = { width: 1, height: 1 };
    this.bloomSizes = [];

    this._boundLost = (event) => this._onContextLost(event);
    this._boundRestored = () => this._onContextRestored();
    this._frame = this._frame.bind(this);

    this.unsubscribe = store.subscribe((next, meta) => this._handleStore(next, meta));

    try {
      this._initRenderer();
      this._initScene();
      this._applyAllState();
      this._bindResize();
      this._startLoop();
    } catch (error) {
      this._fail(error);
    }
  }

  // ------------------------------------------------------------- lifecycle

  _initRenderer() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'gargantua-canvas';
    this.canvas.setAttribute('aria-label', 'Real-time Schwarzschild black hole raytracing viewport');
    this.canvas.tabIndex = 0;
    this.container.appendChild(this.canvas);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.debug.checkShaderErrors = true;

    this.camera = new THREE.PerspectiveCamera(
      this.state.params.fov,
      1,
      0.1,
      500,
    );
    this.camera.position.copy(cameraPosition(
      this.state.params.distance,
      this.state.params.azimuth,
      Math.max(Math.abs(this.state.params.elevation), MIN_ELEVATION)
        * Math.sign(this.state.params.elevation || 1),
    ));
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.7;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 60;
    this.controls.minPolarAngle = (90 - 75) * D2R;
    this.controls.maxPolarAngle = (90 + 75) * D2R;
    this.controls.addEventListener('start', () => this._onOrbitStart());
    this.controls.addEventListener('end', () => this._onOrbitEnd());

    this.canvas.addEventListener('webglcontextlost', this._boundLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._boundRestored, false);
  }

  _initScene() {
    this.passScene = new THREE.Scene();
    this.passCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    this.quadGeometry = new THREE.PlaneGeometry(2, 2);
    this.quadMesh = new THREE.Mesh(this.quadGeometry, null);
    this.quadMesh.frustumCulled = false;
    this.passScene.add(this.quadMesh);

    this.sceneUniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uAspect: { value: 1 },
      uCameraPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamForward: { value: new THREE.Vector3(0, 0, -1) },
      uTanHalfFov: { value: Math.tan((this.state.params.fov * D2R) / 2) },
      uPixelAngle: { value: 0.001 },
      uTime: { value: this.simTime },
      uDiskInner: { value: this.state.params.diskInner },
      uDiskOuter: { value: this.state.params.diskOuter },
      uDiskThickness: { value: this.state.params.diskThickness },
      uDiskTemperature: { value: this.state.params.diskTemperature },
      uDiskEmission: { value: this.state.params.diskEmission },
      uOrbitalSpeed: { value: this.state.params.orbitalSpeed },
      uTurbulenceAmount: { value: this.state.params.turbulenceAmount },
      uTurbulenceSpeed: { value: this.state.params.turbulenceSpeed },
      uStarDensity: { value: this.state.params.starDensity },
      uGalaxyBrightness: { value: this.state.params.galaxyBrightness },
      uDebug: { value: this.state.debug },
      uMaxSteps: { value: QUALITY_PROFILES[this.state.quality].maxSteps },
      uMaxCrossings: { value: QUALITY_PROFILES[this.state.quality].maxCrossings },
    };

    this.thresholdUniforms = {
      tInput: { value: null },
      uThreshold: { value: this.state.params.bloomThreshold },
      uKnee: { value: Math.max(0.04, this.state.params.bloomThreshold * 0.5) },
    };
    this.downsampleUniforms = {
      tInput: { value: null },
      uTexel: { value: new THREE.Vector2(1, 1) },
    };
    this.blurUniforms = {
      tInput: { value: null },
      uDirection: { value: new THREE.Vector2(1, 1) },
    };
    this.compositeUniforms = {
      tScene: { value: null },
      tBloom0: { value: null },
      tBloom1: { value: null },
      tBloom2: { value: null },
      tBloom3: { value: null },
      tBloom4: { value: null },
      uBloomLevels: { value: QUALITY_PROFILES[this.state.quality].bloomLevels },
      uBloomStrength: { value: this.state.params.bloomStrength },
      uExposure: { value: this.state.params.exposure },
      uVignette: { value: this.state.params.vignette },
      uGrain: { value: this.state.params.grain },
      uChromatic: { value: this.state.params.chromatic },
      uTime: { value: this.simTime },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uDebug: { value: this.state.debug },
    };

    this.sceneMaterial = this._makeMaterial(sceneFragment, this.sceneUniforms);
    this.thresholdMaterial = this._makeMaterial(thresholdFragment, this.thresholdUniforms);
    this.downsampleMaterial = this._makeMaterial(downsampleFragment, this.downsampleUniforms);
    this.blurMaterial = this._makeMaterial(blurFragment, this.blurUniforms);
    this.compositeMaterial = this._makeMaterial(compositeFragment, this.compositeUniforms);

    this.sceneTarget = null;
    this.bloomA = [];
    this.bloomB = [];
    this.bloomSizes = [];
    this._resize(true);
  }

  _makeMaterial(fragmentShader, uniforms) {
    return new THREE.ShaderMaterial({
      vertexShader: fullscreenVertex,
      fragmentShader,
      uniforms,
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
      toneMapped: false,
    });
  }

  _disposeScene() {
    const targets = [this.sceneTarget, ...(this.bloomA || []), ...(this.bloomB || [])];
    for (const target of targets) {
      if (target) target.dispose();
    }
    for (const material of [
      this.sceneMaterial,
      this.thresholdMaterial,
      this.downsampleMaterial,
      this.blurMaterial,
      this.compositeMaterial,
    ]) {
      if (material) material.dispose();
    }
    if (this.quadGeometry) this.quadGeometry.dispose();
    this.quadMesh = null;
    this.passScene = null;
  }

  _disposeRenderer() {
    if (this.canvas) {
      this.canvas.removeEventListener('webglcontextlost', this._boundLost);
      this.canvas.removeEventListener('webglcontextrestored', this._boundRestored);
    }
    if (this.controls) this.controls.dispose();
    if (this.renderer) this.renderer.dispose();
    if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    this.controls = null;
    this.renderer = null;
    this.canvas = null;
  }

  dispose() {
    this.disposed = true;
    this._stopLoop();
    if (this.unsubscribe) this.unsubscribe();
    this._disposeScene();
    this._disposeRenderer();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    window.removeEventListener('resize', this._onWindowResize);
  }

  // ---------------------------------------------------------------- render

  _startLoop() {
    if (this.raf || this.disposed || this.contextLost) return;
    this.lastFrameAt = performance.now();
    this.fpsWindowStart = this.lastFrameAt;
    this.fpsFrames = 0;
    this.raf = requestAnimationFrame(this._frame);
  }

  _stopLoop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  _frame(now) {
    if (this.disposed || this.contextLost) return;
    this.raf = requestAnimationFrame(this._frame);

    const dt = clamp((now - this.lastFrameAt) / 1000, 0, 0.05);
    this.lastFrameAt = now;

    const state = this.state;
    if (state.frozen) {
      this.simTime = state.time;
    } else if (!document.hidden) {
      this.simTime += dt * state.params.timeScale;
    }

    const cinematic = state.playing && !state.capture && !state.frozen
      && !this.userOrbiting && !this.tween;

    if (this.tween) {
      this._updateTween(now);
    } else if (cinematic) {
      this.cineAzimuth = wrapDegrees(this.cineAzimuth + dt * ORBIT_DEG_PER_SECOND);
      this._setCamera({
        distance: state.params.distance,
        azimuth: this.cineAzimuth,
        elevation: state.params.elevation,
        fov: state.params.fov,
      }, false);
    } else {
      this.controls.update();
    }

    try {
      this._renderFrame(now);
    } catch (error) {
      this._fail(error);
      return;
    }

    this.fpsFrames += 1;
    if (now - this.fpsWindowStart >= 1000) {
      this.fps = (this.fpsFrames * 1000) / (now - this.fpsWindowStart);
      this.fpsFrames = 0;
      this.fpsWindowStart = now;
    }

    if (now - this.lastTelemetryAt >= TELEMETRY_MS) {
      this.lastTelemetryAt = now;
      this.store.setTelemetry({
        time: this.simTime,
        fps: this.fps,
        camera: this._cameraSpherical(),
      });
    }
  }

  _renderFrame(now) {
    this._updateCameraUniforms(now);

    this._runPass(this.sceneMaterial, this.sceneTarget);
    this._checkPrograms();

    const profile = QUALITY_PROFILES[this.state.quality];
    const levels = Math.min(profile.bloomLevels, BLOOM_LEVELS);

    this.thresholdUniforms.tInput.value = this.sceneTarget.texture;
    this.thresholdUniforms.uThreshold.value = this.state.params.bloomThreshold;
    this.thresholdUniforms.uKnee.value = Math.max(0.04, this.state.params.bloomThreshold * 0.5);
    this._runPass(this.thresholdMaterial, this.bloomA[0]);

    for (let i = 1; i < levels; i++) {
      const source = this.bloomA[i - 1];
      const sourceSize = this.bloomSizes[i - 1];
      this.downsampleUniforms.tInput.value = source.texture;
      this.downsampleUniforms.uTexel.value.set(1 / sourceSize.width, 1 / sourceSize.height);
      this._runPass(this.downsampleMaterial, this.bloomA[i]);
    }

    for (let i = 0; i < levels; i++) {
      const size = this.bloomSizes[i];
      this.blurUniforms.tInput.value = this.bloomA[i].texture;
      this.blurUniforms.uDirection.value.set(1 / size.width, 0);
      this._runPass(this.blurMaterial, this.bloomB[i]);

      this.blurUniforms.tInput.value = this.bloomB[i].texture;
      this.blurUniforms.uDirection.value.set(0, 1 / size.height);
      this._runPass(this.blurMaterial, this.bloomA[i]);
    }

    this.compositeUniforms.tScene.value = this.sceneTarget.texture;
    for (let i = 0; i < BLOOM_LEVELS; i++) {
      this.compositeUniforms[`tBloom${i}`].value = this.bloomA[i].texture;
    }
    this._runPass(this.compositeMaterial, null);

    if (!this.ready) {
      this.ready = true;
      document.documentElement.dataset.gargantuaReady = 'true';
      this.onReady?.();
    }
  }

  _runPass(material, target) {
    this.quadMesh.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.clear();
    this.renderer.render(this.passScene, this.passCamera);
  }

  _checkPrograms() {
    if (this.ready) return;
    const gl = this.renderer.getContext();
    const programs = this.renderer.info.programs || [];
    for (const entry of programs) {
      if (entry.program && !gl.getProgramParameter(entry.program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(entry.program) || 'unknown link error';
        throw new Error(`Shader program failed to link: ${log}`);
      }
    }
  }

  _updateCameraUniforms(now) {
    this.camera.updateMatrixWorld();
    const elements = this.camera.matrixWorld.elements;
    const right = this.sceneUniforms.uCamRight.value.set(elements[0], elements[1], elements[2]).normalize();
    const up = this.sceneUniforms.uCamUp.value.set(elements[4], elements[5], elements[6]).normalize();
    const forward = this.sceneUniforms.uCamForward.value
      .set(-elements[8], -elements[9], -elements[10]).normalize();
    this.sceneUniforms.uCameraPos.value.copy(this.camera.position);
    this.sceneUniforms.uAspect.value = this.camera.aspect;
    const tanHalf = Math.tan((this.camera.fov * D2R) / 2);
    this.sceneUniforms.uTanHalfFov.value = tanHalf;
    this.sceneUniforms.uPixelAngle.value = (2 * tanHalf) / Math.max(1, this.internalSize.height);
    this.sceneUniforms.uTime.value = this.simTime;
    this.compositeUniforms.uTime.value = this.simTime;
  }

  // ---------------------------------------------------------------- camera

  _cameraSpherical() {
    const position = this.camera.position;
    const distance = position.length();
    const azimuth = wrapDegrees(Math.atan2(position.x, position.z) * R2D);
    const elevation = Math.asin(clamp(position.y / Math.max(distance, 1e-5), -1, 1)) * R2D;
    return { azimuth, elevation, distance, fov: this.camera.fov };
  }

  _setCamera({ distance, azimuth, elevation, fov }, updateCine = true) {
    const safeElevation = Math.abs(elevation) < MIN_ELEVATION
      ? MIN_ELEVATION * (elevation < 0 ? -1 : 1)
      : elevation;
    this.camera.position.copy(cameraPosition(distance, azimuth, safeElevation));
    this.camera.fov = clamp(fov, 20, 85);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
    this.controls.target.set(0, 0, 0);
    if (updateCine) this.cineAzimuth = wrapDegrees(azimuth);
  }

  _flushControls() {
    if (!this.controls) return;
    const damping = this.controls.enableDamping;
    this.controls.enableDamping = false;
    this.controls.update();
    this.controls.enableDamping = damping;
  }

  _onOrbitStart() {
    this.userOrbiting = true;
    this.tween = null;
    if (this.state.playing) this.store.setPlaying(false);
    this.cineAzimuth = this._cameraSpherical().azimuth;
  }

  _onOrbitEnd() {
    this.userOrbiting = false;
    const camera = this._cameraSpherical();
    this.cineAzimuth = camera.azimuth;
    this.store.setCameraFromUser(camera);
  }

  _beginTween() {
    const target = { ...this.state.params };
    if (this.state.capture || this.state.frozen) {
      this.tween = null;
      this._setCamera(target);
      return;
    }
    this._flushControls();
    const from = this._cameraSpherical();
    let delta = ((target.azimuth - from.azimuth + 540) % 360) - 180;
    this.tween = {
      start: performance.now(),
      from,
      to: { ...target, azimuth: from.azimuth + delta },
    };
  }

  _updateTween(now) {
    const tween = this.tween;
    const t = clamp((now - tween.start) / TWEEN_MS, 0, 1);
    const eased = t * t * (3 - 2 * t);
    const azimuth = tween.from.azimuth + (tween.to.azimuth - tween.from.azimuth) * eased;
    this._setCamera({
      distance: tween.from.distance + (tween.to.distance - tween.from.distance) * eased,
      azimuth: wrapDegrees(azimuth),
      elevation: tween.from.elevation + (tween.to.elevation - tween.from.elevation) * eased,
      fov: tween.from.fov + (tween.to.fov - tween.from.fov) * eased,
    }, false);
    if (t >= 1) {
      this.tween = null;
      this.cineAzimuth = wrapDegrees(tween.to.azimuth);
      this.store.setTelemetry({
        time: this.simTime,
        fps: this.fps,
        camera: this._cameraSpherical(),
      });
    }
  }

  // ------------------------------------------------------------ store sync

  _handleStore(state, meta) {
    this.state = state;
    if (!meta || meta.source === 'telemetry') return;

    if (meta.source === 'reset') {
      this.tween = null;
      this._applyAllState();
      return;
    }

    const changed = meta.changed;
    if (changed === 'quality') {
      this._applyQuality();
    } else if (changed === 'preset') {
      this._beginTween();
    } else if (changed === 'camera') {
      this.tween = null;
      this._flushControls();
      this._setCamera(state.params);
    } else if (changed === 'time') {
      this.simTime = state.time;
    } else if (changed === 'playing') {
      if (state.playing) {
        this.tween = null;
        this._flushControls();
        this.cineAzimuth = this._cameraSpherical().azimuth;
      }
    } else if (CAMERA_KEYS.includes(changed)) {
      this.tween = null;
      this._flushControls();
      this._setCamera(state.params);
    }

    this._pushUniforms(state);
  }

  _applyAllState() {
    const state = this.state;
    this.simTime = Number.isFinite(state.time) ? state.time : 0;
    this.cineAzimuth = state.params.azimuth;
    this.tween = null;
    this._applyQuality();
    this._setCamera(state.params);
    this.simTime = Number.isFinite(state.time) ? state.time : 0;
    this._pushUniforms(state);
  }

  _applyQuality() {
    const profile = QUALITY_PROFILES[this.state.quality];
    this.sceneUniforms.uMaxSteps.value = profile.maxSteps;
    this.sceneUniforms.uMaxCrossings.value = profile.maxCrossings;
    this.compositeUniforms.uBloomLevels.value = profile.bloomLevels;
    this._resize(true);
  }

  _pushUniforms(state) {
    const params = state.params;
    this.sceneUniforms.uDiskInner.value = params.diskInner;
    this.sceneUniforms.uDiskOuter.value = params.diskOuter;
    this.sceneUniforms.uDiskThickness.value = params.diskThickness;
    this.sceneUniforms.uDiskTemperature.value = params.diskTemperature;
    this.sceneUniforms.uDiskEmission.value = params.diskEmission;
    this.sceneUniforms.uOrbitalSpeed.value = params.orbitalSpeed;
    this.sceneUniforms.uTurbulenceAmount.value = params.turbulenceAmount;
    this.sceneUniforms.uTurbulenceSpeed.value = params.turbulenceSpeed;
    this.sceneUniforms.uStarDensity.value = params.starDensity;
    this.sceneUniforms.uGalaxyBrightness.value = params.galaxyBrightness;
    this.sceneUniforms.uDebug.value = state.debug;
    this.sceneUniforms.uTanHalfFov.value = Math.tan((this.camera.fov * D2R) / 2);

    this.thresholdUniforms.uThreshold.value = params.bloomThreshold;
    this.thresholdUniforms.uKnee.value = Math.max(0.04, params.bloomThreshold * 0.5);

    this.compositeUniforms.uBloomStrength.value = params.bloomStrength;
    this.compositeUniforms.uExposure.value = params.exposure;
    this.compositeUniforms.uVignette.value = params.vignette;
    this.compositeUniforms.uGrain.value = params.grain;
    this.compositeUniforms.uChromatic.value = params.chromatic;
    this.compositeUniforms.uDebug.value = state.debug;

    const profile = QUALITY_PROFILES[state.quality];
    this.sceneUniforms.uMaxSteps.value = profile.maxSteps;
    this.sceneUniforms.uMaxCrossings.value = profile.maxCrossings;
    this.compositeUniforms.uBloomLevels.value = profile.bloomLevels;
  }

  // ---------------------------------------------------------------- resize

  _bindResize() {
    this._onWindowResize = () => this._resize();
    window.addEventListener('resize', this._onWindowResize);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this._resize());
      this.resizeObserver.observe(this.container);
    }
  }

  _resize(force = false) {
    if (!this.renderer) return;
    const rect = this.container.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.round(rect.width));
    const cssHeight = Math.max(1, Math.round(rect.height));
    const profile = QUALITY_PROFILES[this.state.quality];
    const dpr = Math.min(window.devicePixelRatio || 1, profile.dprCap);
    const width = Math.max(1, Math.round(cssWidth * dpr * profile.renderScale));
    const height = Math.max(1, Math.round(cssHeight * dpr * profile.renderScale));

    if (!force
      && width === this.internalSize.width
      && height === this.internalSize.height
      && cssWidth === this.cssSize.width
      && cssHeight === this.cssSize.height) {
      return;
    }

    this.cssSize = { width: cssWidth, height: cssHeight };
    this.internalSize = { width, height };
    this.renderer.setSize(width, height, false);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.camera.aspect = cssWidth / cssHeight;
    this.camera.updateProjectionMatrix();
    this.sceneUniforms.uAspect.value = this.camera.aspect;
    this.sceneUniforms.uResolution.value.set(width, height);
    this.compositeUniforms.uResolution.value.set(width, height);
    this._createTargets(width, height);
  }

  _createTargets(width, height) {
    if (this.sceneTarget) this.sceneTarget.dispose();
    for (const target of [...this.bloomA, ...this.bloomB]) target.dispose();
    this.bloomA = [];
    this.bloomB = [];
    this.bloomSizes = [];

    this.sceneTarget = makeRenderTarget(width, height);

    let bloomWidth = Math.max(1, Math.floor(width / 2));
    let bloomHeight = Math.max(1, Math.floor(height / 2));
    for (let i = 0; i < BLOOM_LEVELS; i++) {
      this.bloomA.push(makeRenderTarget(bloomWidth, bloomHeight));
      this.bloomB.push(makeRenderTarget(bloomWidth, bloomHeight));
      this.bloomSizes.push({ width: bloomWidth, height: bloomHeight });
      bloomWidth = Math.max(1, Math.floor(bloomWidth / 2));
      bloomHeight = Math.max(1, Math.floor(bloomHeight / 2));
    }

    this.compositeUniforms.tScene.value = this.sceneTarget.texture;
    for (let i = 0; i < BLOOM_LEVELS; i++) {
      this.compositeUniforms[`tBloom${i}`].value = this.bloomA[i].texture;
    }
  }

  // ---------------------------------------------------------- context loss

  _onContextLost(event) {
    event.preventDefault();
    if (this.contextLost) return;
    this.contextLost = true;
    this.error = null;
    this._stopLoop();
    this.onContextChange?.(true);
  }

  _onContextRestored() {
    if (!this.contextLost || this.disposed) return;
    this._rebuildRenderer();
  }

  recoverNow() {
    if (!this.contextLost || this.disposed) return;
    this._rebuildRenderer();
  }

  _rebuildRenderer() {
    const camera = this._cameraSpherical();
    const time = this.simTime;
    const wasPlaying = this.state.playing;

    this._stopLoop();
    this._disposeScene();
    this._disposeRenderer();

    try {
      this._initRenderer();
      this._initScene();
      this._applyQuality();
      this._setCamera(camera);
      this.simTime = time;
      this.cineAzimuth = camera.azimuth;
      this._pushUniforms(this.state);
      this.contextLost = false;
      this.onContextChange?.(false);
      if (wasPlaying) this._flushControls();
      this._startLoop();
    } catch (error) {
      this._fail(error);
    }
  }

  _fail(error) {
    this.error = error;
    this._stopLoop();
    console.error('GARGANTUA render failure:', error);
    if (!this.contextLost) this.onError?.(error);
  }

  // ----------------------------------------------------------------- debug

  getTelemetry() {
    return {
      ready: this.ready,
      contextLost: this.contextLost,
      error: this.error ? String(this.error.message || this.error) : null,
      time: this.simTime,
      fps: this.fps,
      camera: this._cameraSpherical(),
      internalSize: { ...this.internalSize },
      cssSize: { ...this.cssSize },
    };
  }
}
