import {
  HalfFloatType,
  NoToneMapping,
  OrthographicCamera,
  PerspectiveCamera,
  Spherical,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import geodesicShader from './shaders/geodesic.frag.glsl?raw';
import bloomDownShader from './shaders/bloomDown.frag.glsl?raw';
import bloomUpShader from './shaders/bloomUp.frag.glsl?raw';
import compositeShader from './shaders/composite.frag.glsl?raw';
import { createColorTarget, createFullscreenGeometry, FullscreenPass } from './passes.js';
import { internalResolution, MAX_DEVICE_PIXEL_RATIO, QUALITY_LEVELS } from './quality.js';
import {
  blendPose,
  CINEMATIC_BLEND_SECONDS,
  cinematicPose,
  copyPose,
  easeInOutCubic,
  posesEqual,
  PRESET_TRANSITION_SECONDS,
  smoothstep01,
} from './cameraPath.js';
import { CAMERA_KEYS, PARAM_BY_KEY, wrapDegrees } from '../state/paramSchema.js';

const DEG = Math.PI / 180;
// Simulated time in units of M per real second at time scale 1.
export const TIME_TO_M = 6;
const MIRROR_INTERVAL_MS = 80;
const STATS_INTERVAL_MS = 500;

const CONTEXT_ATTRIBUTES = Object.freeze({
  alpha: false,
  antialias: false,
  depth: false,
  stencil: false,
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  powerPreference: 'high-performance',
});

// OrbitControls applies its damping momentum inside update() even while no
// pointer is down; clear it so programmatic poses are reproduced exactly.
function haltControlsInertia(controls) {
  controls._sphericalDelta?.set(0, 0, 0);
  controls._panOffset?.set(0, 0, 0);
  if (typeof controls._scale === 'number') controls._scale = 1;
}

function poseFromParams(params) {
  return { distance: params.distance, azimuth: params.azimuth, elevation: params.elevation, fov: params.fov };
}

export class Engine {
  constructor({ container, config, runtime, capture, initialTime, onUserCameraInput }) {
    this.container = container;
    this.config = config;
    this.runtime = runtime;
    this.capture = capture;
    this.onUserCameraInput = onUserCameraInput;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'viewport-canvas';
    this.canvas.setAttribute('aria-label', 'Schwarzschild 黑洞实时光线追踪画面');
    container.appendChild(this.canvas);

    this.gl = null;
    this.renderer = null;
    this.gpu = null;
    this.loseContextExtension = null;
    this.raf = 0;
    this.disposed = false;
    this.contextLost = false;
    this.failed = false;
    this.ready = false;
    // 0 = idle, 1 = waiting for the first frame, 2 = first frame done, announce next tick.
    this.readyStage = 0;
    this.dirty = true;
    this.frame = 0;
    this.generation = 0;

    this.time = 0;
    this.orbitPhase = 0;
    this.turbPhase = 0;
    this.lastNow = 0;
    this.statsFrames = 0;
    this.statsStart = 0;
    this.fps = 0;

    this.applied = null;
    this.quality = QUALITY_LEVELS.high;

    this.orthoCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.camera = new PerspectiveCamera(42, 1, 0.1, 1000);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.9;
    this.controls.minDistance = PARAM_BY_KEY.distance.min;
    this.controls.maxDistance = PARAM_BY_KEY.distance.max;
    this.controls.minPolarAngle = (90 - PARAM_BY_KEY.elevation.max) * DEG;
    this.controls.maxPolarAngle = (90 - PARAM_BY_KEY.elevation.min) * DEG;
    this.userInteracting = false;

    this.pose = { distance: 28, azimuth: 0, elevation: 7, fov: 42 };
    this.mirrored = { ...this.pose };
    this.lastMirrorAt = 0;
    this.transition = null;
    this.cinematic = { active: false, t: 0, azimuthOrigin: 0, from: { ...this.pose } };
    this.scratchPose = { ...this.pose };
    this.spherical = new Spherical();
    this.basisRight = new Vector3();
    this.basisUp = new Vector3();
    this.basisForward = new Vector3();

    this.size = { cssWidth: 0, cssHeight: 0, dpr: 1, width: 0, height: 0, internalWidth: 0, internalHeight: 0 };
    this.resizePending = true;
    this.resizeObserver = new ResizeObserver(() => {
      this.resizePending = true;
    });
    this.resizeObserver.observe(container);

    this.handleControlsStart = () => {
      this.userInteracting = true;
      this.transition = null;
      this.cinematic.active = false;
      this.onUserCameraInput?.();
    };
    this.handleControlsEnd = () => {
      this.userInteracting = false;
    };
    this.handleContextLost = (event) => this.onContextLost(event);
    this.handleContextRestored = () => this.onContextRestored();
    this.frameCallback = (now) => this.loop(now);

    this.controls.addEventListener('start', this.handleControlsStart);
    this.controls.addEventListener('end', this.handleControlsEnd);
    this.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored, false);

    const initial = config.getState();
    copyPose(poseFromParams(initial.params), this.pose);
    this.applyPose(this.pose);
    copyPose(this.pose, this.mirrored);
    this.setTime(initialTime);
    this.unsubscribeConfig = config.subscribe((state) => this.applyConfig(state));
  }

  start() {
    this.gl = this.canvas.getContext('webgl2', CONTEXT_ATTRIBUTES);
    if (!this.gl) {
      this.fail('此浏览器或设备不支持 WebGL2，无法运行测地线着色器。');
      return;
    }
    this.loseContextExtension = this.gl.getExtension('WEBGL_lose_context');
    this.buildGpu();
    this.compileAndRun();
  }

  // --- GPU resources -------------------------------------------------------

  buildGpu() {
    const renderer = new WebGLRenderer({ canvas: this.canvas, context: this.gl });
    renderer.autoClear = false;
    renderer.toneMapping = NoToneMapping;
    renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
      const log = [gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertexShader), gl.getShaderInfoLog(fragmentShader)]
        .filter(Boolean)
        .join('\n')
        .trim();
      this.fail('着色器编译失败', log);
    };
    this.renderer = renderer;

    const hdrFloat = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
    const geometry = createFullscreenGeometry();
    const geodesic = new FullscreenPass('GeodesicRaytrace', geometry, geodesicShader, {
      uResolution: { value: new Vector2(1, 1) },
      uCamPos: { value: new Vector3() },
      uCamRight: { value: this.basisRight },
      uCamUp: { value: this.basisUp },
      uCamForward: { value: this.basisForward },
      uTanHalfFov: { value: 0.4 },
      uAspect: { value: 1 },
      uPixelAngle: { value: 0.001 },
      uEscapeU: { value: 1 / 80 },
      uMaxSteps: { value: 200 },
      uMaxDphi: { value: 0.1 },
      uRelStep: { value: 0.16 },
      uDiskSamples: { value: 3 },
      uNoiseOctaves: { value: 3 },
      uOrbitPhase: { value: 0 },
      uTurbPhase: { value: 0 },
      uDiskInner: { value: 6 },
      uDiskOuter: { value: 20 },
      uDiskHalfThickness: { value: 0.3 },
      uDiskTemperature: { value: 5800 },
      uDiskIntensity: { value: 1 },
      uOrbitSpeed: { value: 1 },
      uTurbulenceAmp: { value: 0.65 },
      uStarDensity: { value: 1 },
      uGalaxyBrightness: { value: 1 },
      uDebugMode: { value: 0 },
    });
    const bloomDown = new FullscreenPass('BloomDownsample', geometry, bloomDownShader, {
      uSource: { value: null },
      uSourceTexel: { value: new Vector2(1, 1) },
      uPrefilter: { value: 0 },
      uExposure: { value: 1 },
      uThreshold: { value: 1.2 },
      uKnee: { value: 0.6 },
    });
    const bloomUp = new FullscreenPass('BloomUpsample', geometry, bloomUpShader, {
      uCoarse: { value: null },
      uCurrent: { value: null },
      uCoarseTexel: { value: new Vector2(1, 1) },
      uScatter: { value: 0.7 },
    });
    const composite = new FullscreenPass('Composite', geometry, compositeShader, {
      uHdr: { value: null },
      uBloom: { value: null },
      uBloomEnabled: { value: 1 },
      uBloomIntensity: { value: 0.75 },
      uExposure: { value: 1 },
      uVignette: { value: 0.35 },
      uGrain: { value: 0.25 },
      uChromatic: { value: 0.3 },
      uChromaticTaps: { value: 3 },
      uAspect: { value: 1 },
      uGrainSeed: { value: 0 },
      uDebugMode: { value: 0 },
    });
    this.gpu = {
      geometry,
      hdrType: hdrFloat ? HalfFloatType : UnsignedByteType,
      hdrFloat,
      passes: [geodesic, bloomDown, bloomUp, composite],
      geodesic,
      bloomDown,
      bloomUp,
      composite,
      hdrTarget: null,
      bloomDownTargets: [],
      bloomUpTargets: [],
    };
    this.applied = null;
    this.applyConfig(this.config.getState());
    this.resizePending = true;
    this.resize();
  }

  releaseGpu() {
    if (this.gpu) {
      for (const pass of this.gpu.passes) pass.dispose();
      this.disposeTargets();
      this.gpu.geometry.dispose();
      this.gpu = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }

  disposeTargets() {
    const gpu = this.gpu;
    gpu.hdrTarget?.dispose();
    for (const target of gpu.bloomDownTargets) target.dispose();
    for (const target of gpu.bloomUpTargets) target.dispose();
    gpu.hdrTarget = null;
    gpu.bloomDownTargets = [];
    gpu.bloomUpTargets = [];
  }

  async compileAndRun() {
    const generation = ++this.generation;
    this.runtime.setState({ phase: 'compiling', ready: false });
    try {
      // compileAsync() warns when KHR_parallel_shader_compile is missing, so
      // only use it where the extension exists and compile directly otherwise.
      if (this.renderer.extensions.has('KHR_parallel_shader_compile')) {
        await Promise.all(this.gpu.passes.map((pass) => this.renderer.compileAsync(pass.scene, this.orthoCamera)));
      } else {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        if (generation !== this.generation || !this.renderer) return;
        for (const pass of this.gpu.passes) this.renderer.compile(pass.scene, this.orthoCamera);
      }
    } catch (error) {
      this.fail('着色器编译失败', String(error?.message ?? error));
      return;
    }
    if (generation !== this.generation || this.disposed || this.contextLost || this.failed) return;
    this.dirty = true;
    this.lastNow = performance.now();
    this.statsStart = this.lastNow;
    this.statsFrames = 0;
    this.readyStage = 1;
    this.raf = requestAnimationFrame(this.frameCallback);
  }

  fail(message, detail = '') {
    if (this.failed) return;
    this.failed = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.ready = false;
    if (detail) console.error(`[GARGANTUA] ${message}\n${detail}`);
    this.runtime.setState({ phase: 'error', ready: false, error: { message, detail } });
  }

  // --- configuration -------------------------------------------------------

  applyConfig(state) {
    const previous = this.applied;
    this.applied = state;
    if (previous && previous !== state) this.syncCameraFromConfig(state, previous);
    if (!previous || state.cinematic !== previous.cinematic) this.setCinematic(state.cinematic);
    if (!this.gpu) return;

    const p = state.params;
    const g = this.gpu.geodesic.uniforms;
    g.uDiskInner.value = p.diskInner;
    g.uDiskOuter.value = Math.max(p.diskOuter, p.diskInner + 1);
    g.uDiskHalfThickness.value = p.diskHalfThickness;
    g.uDiskTemperature.value = p.diskTemperature;
    g.uDiskIntensity.value = p.diskIntensity;
    g.uOrbitSpeed.value = p.orbitSpeed;
    g.uTurbulenceAmp.value = p.turbulenceAmp;
    g.uStarDensity.value = p.starDensity;
    g.uGalaxyBrightness.value = p.galaxyBrightness;
    g.uDebugMode.value = state.debug;

    const exposure = 2 ** p.exposure;
    const down = this.gpu.bloomDown.uniforms;
    down.uExposure.value = exposure;
    down.uThreshold.value = p.bloomThreshold;
    down.uKnee.value = Math.max(0.05, p.bloomThreshold * 0.5);

    const c = this.gpu.composite.uniforms;
    c.uExposure.value = exposure;
    c.uVignette.value = p.vignette;
    c.uGrain.value = p.grain;
    c.uChromatic.value = p.chromaticAberration;
    c.uDebugMode.value = state.debug;

    const quality = QUALITY_LEVELS[state.quality] ?? QUALITY_LEVELS.high;
    if (quality !== this.quality || !previous) {
      this.quality = quality;
      g.uMaxSteps.value = quality.maxSteps;
      g.uMaxDphi.value = quality.maxDphi;
      g.uRelStep.value = quality.relStep;
      g.uDiskSamples.value = quality.diskSamples;
      g.uNoiseOctaves.value = quality.noiseOctaves;
      c.uChromaticTaps.value = quality.chromaticTaps;
      this.resizePending = true;
    }
    this.dirty = true;
  }

  // Camera parameters in the config are a mirror of the live camera. A value
  // that differs from what the engine last mirrored came from outside (slider,
  // reset, preset before mount, restored state) and is applied immediately.
  syncCameraFromConfig(state, previous) {
    if (state.params === previous.params) return;
    const external = CAMERA_KEYS.some((key) => {
      const delta = state.params[key] - this.mirrored[key];
      return Math.abs(key === 'azimuth' ? wrapDegrees(delta) : delta) > 1e-6;
    });
    if (!external) return;
    this.transition = null;
    this.cinematic.active = false;
    copyPose(poseFromParams(state.params), this.pose);
    copyPose(this.pose, this.mirrored);
    this.applyPose(this.pose);
  }

  // --- camera --------------------------------------------------------------

  applyPose(pose) {
    haltControlsInertia(this.controls);
    this.camera.position.setFromSphericalCoords(pose.distance, (90 - pose.elevation) * DEG, pose.azimuth * DEG);
    this.camera.lookAt(0, 0, 0);
    if (this.camera.fov !== pose.fov) {
      this.camera.fov = pose.fov;
      this.camera.updateProjectionMatrix();
    }
    this.controls.update();
    this.dirty = true;
  }

  readPose(out) {
    this.spherical.setFromVector3(this.camera.position);
    out.distance = this.spherical.radius;
    out.elevation = 90 - this.spherical.phi / DEG;
    out.azimuth = wrapDegrees(this.spherical.theta / DEG);
    out.fov = this.camera.fov;
    return out;
  }

  moveTo(pose, { animate }) {
    this.cinematic.active = false;
    if (!animate) {
      this.transition = null;
      copyPose(pose, this.pose);
      this.applyPose(this.pose);
      this.mirrorPose(performance.now(), true);
      return;
    }
    this.transition = { from: { ...this.pose }, to: { ...pose }, elapsed: 0, duration: PRESET_TRANSITION_SECONDS };
    haltControlsInertia(this.controls);
  }

  setCinematic(playing) {
    if (playing && !this.cinematic.active) {
      this.transition = null;
      this.cinematic.active = true;
      this.cinematic.t = 0;
      this.cinematic.azimuthOrigin = this.pose.azimuth;
      copyPose(this.pose, this.cinematic.from);
      haltControlsInertia(this.controls);
    } else if (!playing) {
      this.cinematic.active = false;
    }
  }

  updateCamera(dt, now) {
    let moving = false;
    if (!this.userInteracting && this.cinematic.active) {
      const cin = this.cinematic;
      cin.t += dt;
      cinematicPose(cin.t, cin.azimuthOrigin, this.scratchPose);
      blendPose(cin.from, this.scratchPose, smoothstep01(cin.t / CINEMATIC_BLEND_SECONDS), this.pose);
      this.applyPose(this.pose);
      moving = true;
    } else if (!this.userInteracting && this.transition) {
      const tr = this.transition;
      tr.elapsed += dt;
      blendPose(tr.from, tr.to, easeInOutCubic(tr.elapsed / tr.duration), this.pose);
      if (tr.elapsed >= tr.duration) {
        copyPose(tr.to, this.pose);
        this.transition = null;
      }
      this.applyPose(this.pose);
      moving = this.transition !== null;
    } else if (this.controls.update()) {
      this.dirty = true;
      moving = true;
    }
    this.readPose(this.pose);
    this.mirrorPose(now, !moving && !this.userInteracting);
  }

  mirrorPose(now, settled) {
    if (posesEqual(this.pose, this.mirrored, 1e-4)) return;
    if (!settled && now - this.lastMirrorAt < MIRROR_INTERVAL_MS) return;
    this.lastMirrorAt = now;
    copyPose(this.pose, this.mirrored);
    this.mirrored.azimuth = wrapDegrees(this.mirrored.azimuth);
    const { distance, azimuth, elevation, fov } = this.mirrored;
    this.config.setState((state) => ({
      ...state,
      params: { ...state.params, distance, azimuth, elevation, fov },
    }));
  }

  cameraMode() {
    if (this.userInteracting) return 'interactive';
    if (this.cinematic.active) return 'cinematic';
    if (this.transition) return 'transition';
    return 'static';
  }

  // --- time ----------------------------------------------------------------

  // Deterministic clock: phases are pure functions of the simulated time when
  // it is set explicitly (URL `time`, setTime()); while running they integrate
  // the current rates so slider changes never make the pattern jump.
  setTime(seconds) {
    const p = this.config.getState().params;
    this.time = seconds;
    this.orbitPhase = seconds * TIME_TO_M * p.orbitSpeed;
    this.turbPhase = seconds * p.turbulenceSpeed;
    this.dirty = true;
  }

  advanceTime(dt) {
    const p = this.applied.params;
    const sim = dt * p.timeScale;
    this.time += sim;
    this.orbitPhase += sim * TIME_TO_M * p.orbitSpeed;
    this.turbPhase += sim * p.turbulenceSpeed;
    if (sim > 0) this.dirty = true;
  }

  // --- frame loop ----------------------------------------------------------

  loop(now) {
    if (this.disposed || this.contextLost || this.failed) return;
    this.raf = requestAnimationFrame(this.frameCallback);
    const dt = Math.min(Math.max((now - this.lastNow) / 1000, 0), 0.1);
    this.lastNow = now;

    if (!this.capture) this.advanceTime(dt);
    this.updateCamera(dt, now);
    this.resize();

    if (this.readyStage === 2 && !this.failed) {
      // The first frame was presented after the previous callback returned.
      this.readyStage = 0;
      this.ready = true;
      this.runtime.setState({ phase: 'ready', ready: true, contextLost: false });
    }
    if (this.dirty || !this.capture) {
      this.renderFrame();
      this.dirty = false;
      this.frame += 1;
      this.statsFrames += 1;
      if (this.readyStage === 1 && !this.failed) {
        // Block until the GPU has finished the first frame before announcing readiness.
        this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array(4));
        this.readyStage = 2;
      }
    }

    if (now - this.statsStart >= STATS_INTERVAL_MS) {
      this.fps = (this.statsFrames * 1000) / (now - this.statsStart);
      this.statsStart = now;
      this.statsFrames = 0;
      this.runtime.setState({ fps: this.fps, frame: this.frame, time: this.time, cameraMode: this.cameraMode() });
    }
  }

  resize() {
    if (!this.renderer || !this.gpu) return;
    const cssWidth = Math.max(1, this.container.clientWidth);
    const cssHeight = Math.max(1, this.container.clientHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
    const s = this.size;
    if (!this.resizePending && s.cssWidth === cssWidth && s.cssHeight === cssHeight && s.dpr === dpr) return;
    this.resizePending = false;
    s.cssWidth = cssWidth;
    s.cssHeight = cssHeight;
    s.dpr = dpr;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(cssWidth, cssHeight, false);
    s.width = this.canvas.width;
    s.height = this.canvas.height;
    const internal = internalResolution(this.quality, s.width, s.height);
    s.internalWidth = internal.width;
    s.internalHeight = internal.height;
    this.camera.aspect = cssWidth / cssHeight;
    this.camera.updateProjectionMatrix();
    this.rebuildTargets();
    this.dirty = true;
    this.runtime.setState({ budget: this.budget() });
  }

  rebuildTargets() {
    const gpu = this.gpu;
    this.disposeTargets();
    const { internalWidth, internalHeight } = this.size;
    gpu.hdrTarget = createColorTarget(internalWidth, internalHeight, gpu.hdrType);
    let w = internalWidth;
    let h = internalHeight;
    for (let i = 0; i < this.quality.bloomLevels; i += 1) {
      w = Math.max(1, Math.ceil(w / 2));
      h = Math.max(1, Math.ceil(h / 2));
      gpu.bloomDownTargets.push(createColorTarget(w, h, gpu.hdrType));
      if (i < this.quality.bloomLevels - 1) gpu.bloomUpTargets.push(createColorTarget(w, h, gpu.hdrType));
    }
  }

  budget() {
    const q = this.quality;
    const s = this.size;
    return {
      quality: q.id,
      label: q.label,
      canvasWidth: s.width,
      canvasHeight: s.height,
      cssWidth: s.cssWidth,
      cssHeight: s.cssHeight,
      devicePixelRatio: s.dpr,
      internalWidth: s.internalWidth,
      internalHeight: s.internalHeight,
      renderScale: s.width ? s.internalWidth / s.width : q.renderScale,
      maxSteps: q.maxSteps,
      maxDphi: q.maxDphi,
      relStep: q.relStep,
      diskSamples: q.diskSamples,
      noiseOctaves: q.noiseOctaves,
      bloomLevels: q.bloomLevels,
      chromaticTaps: q.chromaticTaps,
      hdrFloat: this.gpu?.hdrFloat ?? true,
    };
  }

  renderFrame() {
    const gpu = this.gpu;
    const renderer = this.renderer;
    const state = this.applied;
    const p = state.params;
    const g = gpu.geodesic.uniforms;

    this.camera.updateMatrixWorld();
    const m = this.camera.matrixWorld.elements;
    this.basisRight.set(m[0], m[1], m[2]).normalize();
    this.basisUp.set(m[4], m[5], m[6]).normalize();
    this.basisForward.set(-m[8], -m[9], -m[10]).normalize();
    const tanHalfFov = Math.tan((this.camera.fov * DEG) / 2);
    g.uCamPos.value.copy(this.camera.position);
    g.uTanHalfFov.value = tanHalfFov;
    g.uAspect.value = this.camera.aspect;
    g.uResolution.value.set(this.size.internalWidth, this.size.internalHeight);
    g.uPixelAngle.value = (2 * tanHalfFov) / this.size.internalHeight;
    g.uEscapeU.value = 1 / Math.max(80, 1.5 * this.camera.position.length(), 1.3 * p.diskOuter);
    g.uOrbitPhase.value = this.orbitPhase;
    g.uTurbPhase.value = this.turbPhase;

    gpu.geodesic.render(renderer, this.orthoCamera, gpu.hdrTarget);

    const bloomEnabled = (state.debug === 0 || state.debug === 8) && p.bloomIntensity > 0;
    const c = gpu.composite.uniforms;
    if (bloomEnabled) this.renderBloom();
    c.uHdr.value = gpu.hdrTarget.texture;
    c.uBloom.value = bloomEnabled ? (gpu.bloomUpTargets[0] ?? gpu.bloomDownTargets[0]).texture : gpu.hdrTarget.texture;
    c.uBloomEnabled.value = bloomEnabled ? 1 : 0;
    c.uBloomIntensity.value = p.bloomIntensity * this.bloomNormalization();
    c.uAspect.value = this.camera.aspect;
    c.uGrainSeed.value = this.capture ? this.time % 97 : (this.frame % 4096) + (this.time % 97);
    gpu.composite.render(renderer, this.orthoCamera, null);
  }

  // Every upsample adds the coarser level scaled by uScatter; dividing by the
  // geometric weight sum keeps the Bloom energy independent of the level count.
  bloomNormalization() {
    const scatter = this.gpu.bloomUp.uniforms.uScatter.value;
    let sum = 0;
    for (let i = 0, w = 1; i < this.gpu.bloomDownTargets.length; i += 1, w *= scatter) sum += w;
    return sum > 0 ? 1 / sum : 1;
  }

  renderBloom() {
    const gpu = this.gpu;
    const renderer = this.renderer;
    const down = gpu.bloomDown;
    const up = gpu.bloomUp;
    let source = gpu.hdrTarget;
    for (let i = 0; i < gpu.bloomDownTargets.length; i += 1) {
      const target = gpu.bloomDownTargets[i];
      down.uniforms.uSource.value = source.texture;
      down.uniforms.uSourceTexel.value.set(1 / source.width, 1 / source.height);
      down.uniforms.uPrefilter.value = i === 0 ? 1 : 0;
      down.render(renderer, this.orthoCamera, target);
      source = target;
    }
    let coarse = gpu.bloomDownTargets[gpu.bloomDownTargets.length - 1];
    for (let i = gpu.bloomUpTargets.length - 1; i >= 0; i -= 1) {
      const target = gpu.bloomUpTargets[i];
      up.uniforms.uCoarse.value = coarse.texture;
      up.uniforms.uCurrent.value = gpu.bloomDownTargets[i].texture;
      up.uniforms.uCoarseTexel.value.set(1 / coarse.width, 1 / coarse.height);
      up.render(renderer, this.orthoCamera, target);
      coarse = target;
    }
  }

  // --- context loss --------------------------------------------------------

  onContextLost(event) {
    event.preventDefault();
    this.contextLost = true;
    this.generation += 1;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.ready = false;
    this.readyStage = 0;
    // GL calls are ignored while the context is lost, so releasing here never
    // touches objects from the old context generation after restoration.
    this.releaseGpu();
    this.runtime.setState({ phase: 'context-lost', ready: false, contextLost: true });
  }

  onContextRestored() {
    if (this.disposed || this.failed) return;
    this.contextLost = false;
    this.runtime.setState({ phase: 'restoring', contextLost: false });
    this.buildGpu();
    this.compileAndRun();
  }

  requestContextRestore() {
    if (this.gl?.isContextLost() && this.loseContextExtension) this.loseContextExtension.restoreContext();
  }

  // --- diagnostics / teardown ----------------------------------------------

  diagnostics() {
    return {
      frame: this.frame,
      time: this.time,
      fps: this.fps,
      cameraMode: this.cameraMode(),
      contextLost: this.contextLost,
      budget: this.budget(),
    };
  }

  dispose() {
    this.disposed = true;
    this.generation += 1;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.unsubscribeConfig?.();
    this.resizeObserver.disconnect();
    this.controls.removeEventListener('start', this.handleControlsStart);
    this.controls.removeEventListener('end', this.handleControlsEnd);
    this.controls.dispose();
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost, false);
    this.canvas.removeEventListener('webglcontextrestored', this.handleContextRestored, false);
    this.releaseGpu();
    if (this.gl && !this.gl.isContextLost()) this.loseContextExtension?.loseContext();
    this.canvas.remove();
  }
}
