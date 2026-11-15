import * as THREE from '../../vendor/three.module.js';
import { OrbitControls } from '../../vendor/OrbitControls.js';

import quadVert from './shaders/quad.vert.glsl?raw';
import geodesicFrag from './shaders/geodesic.frag.glsl?raw';
import brightFrag from './shaders/bright.frag.glsl?raw';
import copyFrag from './shaders/copy.frag.glsl?raw';
import blurFrag from './shaders/blur.frag.glsl?raw';
import compositeFrag from './shaders/composite.frag.glsl?raw';

import {
  QUALITY,
  QUALITY_LEVELS,
  PARAM_MAP,
  PARAM_DEFS,
  PRESETS,
  DEBUG_VIEWS,
} from '../config.js';
import {
  cloneState,
  saveState,
  clearState,
  defaultState,
  loadState,
  applyPreset,
  applyUrlOverrides,
} from '../store.js';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const CAMERA_KEYS = ['fov', 'distance', 'azimuth', 'pitch'];

export class Engine {
  constructor({ canvas, state, runtime, onStateChange, onContextState, onReady }) {
    this.canvas = canvas;
    this.state = state;
    this.runtime = runtime;
    this.onStateChange = onStateChange ?? (() => {});
    this.onContextState = onContextState ?? (() => {});
    this.onReady = onReady ?? (() => {});

    this.ready = false;
    this.contextLost = false;
    this.disposed = false;
    this._programmatic = false;
    this._dirty = true;
    this.warnings = [];
    this.renderCount = 0;
    this.frameHandle = 0;
    this.lastFrameTs = 0;
    this._lastUI = 0;
    this._lastSync = 0;
    this.simTime = runtime.timeFrozen ? runtime.frozenTime : state.time;
    this.dpr = 1;
    this.cssW = 1;
    this.cssH = 1;
    this.renderSize = { width: 0, height: 0 };
    this.hdrType = 'half-float';

    this._tmpVec = new THREE.Vector3();
    this._tmpSph = new THREE.Spherical();
    this.tickBound = (ts) => this.tick(ts);
    this.updateCinematicBase();
  }

  // ---------------------------------------------------------------- lifecycle
  init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // composite encodes sRGB
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.autoClear = true;

    const gl = this.renderer.getContext();
    if (!gl.getExtension('EXT_color_buffer_float')) {
      // HDR half-float render targets are unavailable; fall back to LDR while
      // keeping the same pipeline and report the limitation in getState().
      this.hdrType = 'unsigned-byte';
      this.warnings.push('EXT_color_buffer_float unavailable: LDR render targets');
    }

    this.camera = new THREE.PerspectiveCamera(this.state.params.fov, 1, 0.1, 2000);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = !this.runtime.capture;
    this.controls.dampingFactor = 0.075;
    this.controls.enablePan = false;
    this.controls.minDistance = PARAM_MAP.distance.min;
    this.controls.maxDistance = PARAM_MAP.distance.max;
    this.controls.minPolarAngle = 0.04;
    this.controls.maxPolarAngle = Math.PI - 0.04;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomSpeed = 0.9;
    this.controls.target.set(0, 0, 0);

    this._onControlsChange = () => this.handleControlsChange();
    this._onControlsStart = () => this.handleControlsStart();
    this.controls.addEventListener('change', this._onControlsChange);
    this.controls.addEventListener('start', this._onControlsStart);

    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    this._onLost = (event) => {
      event.preventDefault();
      this.handleContextLost();
    };
    this._onRestored = () => this.handleContextRestored();
    this.canvas.addEventListener('webglcontextlost', this._onLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._onRestored, false);

    this.quadScene = new THREE.Scene();
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.buildResources();
    this.applyState();
    this.resize();

    this.compileAndCheck();
    this.renderFrame(); // first screenshot-ready frame, URL state already applied
    this.markReady();
    this.start();
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.controls?.removeEventListener('change', this._onControlsChange);
    this.controls?.removeEventListener('start', this._onControlsStart);
    this.controls?.dispose();
    window.removeEventListener('resize', this._onResize);
    this.canvas.removeEventListener('webglcontextlost', this._onLost);
    this.canvas.removeEventListener('webglcontextrestored', this._onRestored);
    this.disposeResources();
    this.renderer?.dispose();
  }

  start() {
    if (this.frameHandle || this.disposed) return;
    this.lastFrameTs = 0;
    this.frameHandle = requestAnimationFrame(this.tickBound);
  }

  stop() {
    if (this.frameHandle) cancelAnimationFrame(this.frameHandle);
    this.frameHandle = 0;
  }

  // ------------------------------------------------------------------ resources
  buildResources() {
    const common = { depthTest: false, depthWrite: false, blending: THREE.NoBlending };
    this.quadGeo = new THREE.PlaneGeometry(2, 2);

    this.geodesicMaterial = new THREE.ShaderMaterial({
      ...common,
      vertexShader: quadVert,
      fragmentShader: geodesicFrag,
      uniforms: {
        uTime: { value: 0 },
        uTanHalfFov: { value: 0.5 },
        uAspect: { value: 1 },
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3(1, 0, 0) },
        uCamUp: { value: new THREE.Vector3(0, 1, 0) },
        uCamForward: { value: new THREE.Vector3(0, 0, -1) },
        uDiskInner: { value: 3 },
        uDiskOuter: { value: 12 },
        uDiskThickness: { value: 0.40 },
        uDiskTemp: { value: 1.30 },
        uEmission: { value: 1.75 },
        uOrbitSpeed: { value: 1 },
        uTurbAmp: { value: 0.35 },
        uTurbSpeed: { value: 1 },
        uStarDensity: { value: 1.15 },
        uGalaxyBrightness: { value: 0.75 },
        uStepScale: { value: 1 },
        uMaxSteps: { value: 150 },
        uDiskSamples: { value: 2 },
        uDebug: { value: 0 },
      },
    });

    this.brightMaterial = new THREE.ShaderMaterial({
      ...common,
      vertexShader: quadVert,
      fragmentShader: brightFrag,
      uniforms: {
        tSrc: { value: null },
        uThreshold: { value: 1.55 },
        uKnee: { value: 0.6 },
      },
    });

    this.copyMaterial = new THREE.ShaderMaterial({
      ...common,
      vertexShader: quadVert,
      fragmentShader: copyFrag,
      uniforms: { tSrc: { value: null } },
    });

    this.blurMaterial = new THREE.ShaderMaterial({
      ...common,
      vertexShader: quadVert,
      fragmentShader: blurFrag,
      uniforms: {
        tSrc: { value: null },
        uDir: { value: new THREE.Vector2(1, 0) },
        uRadius: { value: 1.3 },
      },
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      ...common,
      vertexShader: quadVert,
      fragmentShader: compositeFrag,
      uniforms: {
        tScene: { value: null },
        tBloom0: { value: null },
        tBloom1: { value: null },
        tBloom2: { value: null },
        uBloomIntensity: { value: 1.35 },
        uExposure: { value: 1.0 },
        uVignette: { value: 0.45 },
        uGrain: { value: 0.22 },
        uChroma: { value: 0.55 },
        uTime: { value: 0 },
        uBloomLevels: { value: 2 },
        uDebug: { value: 0 },
      },
    });

    this.allMaterials = [
      this.geodesicMaterial,
      this.brightMaterial,
      this.copyMaterial,
      this.blurMaterial,
      this.compositeMaterial,
    ];

    this.quad = new THREE.Mesh(this.quadGeo, this.geodesicMaterial);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);

    this.rtScene = null;
    this.brightTargets = [];
    this.tmpTargets = [];
    this.bloomTargets = [];
  }

  disposeResources() {
    for (const m of this.allMaterials ?? []) m.dispose();
    this.disposeTargets();
    this.quadScene?.remove(this.quad);
    this.quadGeo?.dispose();
  }

  disposeTargets() {
    for (const t of [this.rtScene, ...this.brightTargets, ...this.tmpTargets, ...this.bloomTargets]) {
      if (t) t.dispose();
    }
    this.rtScene = null;
    this.brightTargets = [];
    this.tmpTargets = [];
    this.bloomTargets = [];
  }

  buildTargets() {
    this.disposeTargets();
    const q = QUALITY[this.state.quality];
    const w = Math.max(2, Math.floor(this.cssW * this.dpr * q.renderScale));
    const h = Math.max(2, Math.floor(this.cssH * this.dpr * q.renderScale));
    this.renderSize = { width: w, height: h };

    const opts = {
      type: this.hdrType === 'half-float' ? THREE.HalfFloatType : THREE.UnsignedByteType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };
    const make = (tw, th) => new THREE.WebGLRenderTarget(Math.max(2, tw), Math.max(2, th), opts);

    this.rtScene = make(w, h);
    for (let l = 0; l < 3; l++) {
      const bw = Math.max(2, Math.floor(w / 2 ** (l + 1)));
      const bh = Math.max(2, Math.floor(h / 2 ** (l + 1)));
      this.brightTargets[l] = make(bw, bh);
      this.tmpTargets[l] = make(bw, bh);
      this.bloomTargets[l] = make(bw, bh);
    }

    // Clear every target so unused bloom levels never contribute stale data.
    for (const t of [this.rtScene, ...this.brightTargets, ...this.tmpTargets, ...this.bloomTargets]) {
      this.renderer.setRenderTarget(t);
      this.renderer.clear(true, false, false);
    }
    this.renderer.setRenderTarget(null);

    this.bindCompositeTextures();
  }

  bindCompositeTextures() {
    const u = this.compositeMaterial.uniforms;
    u.tScene.value = this.rtScene.texture;
    for (let l = 0; l < 3; l++) {
      u[`tBloom${l}`].value = this.bloomTargets[l].texture;
    }
  }

  // -------------------------------------------------------------------- sizing
  resize() {
    if (!this.renderer || this.contextLost || this.disposed) return;
    this._dirty = true;
    const w = Math.max(1, this.canvas.clientWidth || window.innerWidth);
    const h = Math.max(1, this.canvas.clientHeight || window.innerHeight);
    const q = QUALITY[this.state.quality];
    this.dpr = Math.min(window.devicePixelRatio || 1, q.dprCap);
    this.cssW = w;
    this.cssH = h;
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = this.state.params.fov;
    this.camera.updateProjectionMatrix();
    this.geodesicMaterial.uniforms.uAspect.value = w / h;
    this.buildTargets();
  }

  // -------------------------------------------------------------- camera state
  setCameraFromParams() {
    const p = this.state.params;
    const phi = THREE.MathUtils.degToRad(90 - p.pitch);
    const theta = THREE.MathUtils.degToRad(p.azimuth);
    this.camera.position.setFromSphericalCoords(p.distance, phi, theta);
    this.camera.fov = p.fov;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    // Flush any residual damping delta so a programmatic camera change is not
    // immediately overwritten by leftover 'change' events from a prior drag.
    const damping = this.controls.enableDamping;
    this.controls.enableDamping = false;
    this.controls.update();
    this.controls.enableDamping = damping;
  }

  updateCameraBasis() {
    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    const u = this.geodesicMaterial.uniforms;
    u.uCamPos.value.copy(this.camera.position);
    u.uCamRight.value.set(e[0], e[1], e[2]).normalize();
    u.uCamUp.value.set(e[4], e[5], e[6]).normalize();
    u.uCamForward.value.set(-e[8], -e[9], -e[10]).normalize();
    u.uTanHalfFov.value = Math.tan(THREE.MathUtils.degToRad(this.state.params.fov * 0.5));
  }

  applyState() {
    this._programmatic = true;
    this.setCameraFromParams();
    this._programmatic = false;
    this.updateCameraBasis();
    this.applyUniforms();
  }

  applyUniforms() {
    const p = this.state.params;
    const q = QUALITY[this.state.quality];
    const u = this.geodesicMaterial.uniforms;
    u.uTime.value = this.simTime;
    u.uDiskInner.value = p.diskInner;
    u.uDiskOuter.value = p.diskOuter;
    u.uDiskThickness.value = p.diskThickness;
    u.uDiskTemp.value = p.diskTemp;
    u.uEmission.value = p.emission;
    u.uOrbitSpeed.value = p.orbitSpeed;
    u.uTurbAmp.value = p.turbAmp;
    u.uTurbSpeed.value = p.turbSpeed;
    u.uStarDensity.value = p.starDensity;
    u.uGalaxyBrightness.value = p.galaxyBrightness;
    u.uStepScale.value = q.stepScale;
    u.uMaxSteps.value = q.maxSteps;
    u.uDiskSamples.value = q.diskSamples;
    u.uDebug.value = this.state.debug;

    const c = this.compositeMaterial.uniforms;
    c.uBloomIntensity.value = p.bloomIntensity;
    c.uExposure.value = p.exposure;
    c.uVignette.value = p.vignette;
    c.uGrain.value = p.grain;
    c.uChroma.value = p.chroma;
    c.uTime.value = this.simTime;
    c.uBloomLevels.value = q.bloomLevels;
    c.uDebug.value = this.state.debug;

    this.brightMaterial.uniforms.uThreshold.value = p.bloomThreshold;
    this.blurMaterial.uniforms.uRadius.value = q.blurRadius;
  }

  // Always captures the current camera params as the loop's centre. Called at
  // explicit control boundaries only, never while the loop is writing params.
  updateCinematicBase() {
    this.cinematicBase = {
      azimuth: this.state.params.azimuth,
      pitch: this.state.params.pitch,
      distance: this.state.params.distance,
    };
  }

  cinematicPose(t) {
    const b = this.cinematicBase ?? {
      azimuth: this.state.params.azimuth,
      pitch: this.state.params.pitch,
      distance: this.state.params.distance,
    };
    return {
      azimuth: b.azimuth + 22 * Math.sin(t * 0.11),
      pitch: clamp(b.pitch + 7 * Math.sin(t * 0.16), PARAM_MAP.pitch.min, PARAM_MAP.pitch.max),
      distance: clamp(b.distance * (1 + 0.06 * Math.sin(t * 0.07)), PARAM_MAP.distance.min, PARAM_MAP.distance.max),
    };
  }

  // -------------------------------------------------------------- state writers
  persistOnly() {
    this._dirty = true; // frozen capture mode must re-render on state changes
    this.state.time = this.runtime.timeFrozen ? this.runtime.frozenTime : this.simTime;
    const res = saveState(this.state);
    this.runtime.storageOk = res.ok;
    this.runtime.storageReason = res.error ?? 'saved';
    this.onStateChange(this.getState());
  }

  commit({ applyCamera = true } = {}) {
    if (applyCamera) this.applyState();
    else this.applyUniforms();
    this.persistOnly();
  }

  setParam(key, value) {
    const def = PARAM_MAP[key];
    if (!def) return false;
    const n = Number(value);
    if (!Number.isFinite(n)) return false;
    this.state.params[key] = clamp(n, def.min, def.max);
    if (CAMERA_KEYS.includes(key)) {
      this.state.preset = null;
      if (this.state.cinematicPlaying && !this.runtime.cinematicDisabled) this.state.cinematicPlaying = false;
      this.updateCinematicBase();
    }
    this.commit();
    return true;
  }

  setQuality(level) {
    if (!QUALITY_LEVELS.includes(level)) return false;
    if (this.state.quality === level) {
      this.commit();
      return true;
    }
    this.state.quality = level;
    this.applyUniforms();
    this.resize(); // render scale + DPR cap + bloom pyramid sizes all change
    this.persistOnly();
    return true;
  }

  setPreset(index) {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return false;
    applyPreset(this.state, index);
    if (this.state.cinematicPlaying && !this.runtime.cinematicDisabled) this.state.cinematicPlaying = false;
    this.updateCinematicBase();
    this.commit();
    return true;
  }

  setDebug(index) {
    if (!Number.isInteger(index) || index < 0 || index > 9) return false;
    this.state.debug = index;
    this.commit({ applyCamera: false });
    return true;
  }

  setTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return false;
    this.simTime = seconds;
    this.state.time = seconds;
    if (this.runtime.capture) this.runtime.frozenTime = seconds;
    this.commit({ applyCamera: false });
    return true;
  }

  setHud(open) {
    this.state.hudOpen = !!open;
    this.commit({ applyCamera: false });
    return true;
  }

  toggleCinematic() {
    if (this.runtime.cinematicDisabled) return this.state.cinematicPlaying;
    this.state.cinematicPlaying = !this.state.cinematicPlaying;
    this.updateCinematicBase();
    this.commit();
    return this.state.cinematicPlaying;
  }

  cycleQuality() {
    const i = QUALITY_LEVELS.indexOf(this.state.quality);
    const next = QUALITY_LEVELS[(i + 1) % QUALITY_LEVELS.length];
    this.setQuality(next);
    return next;
  }

  reset() {
    clearState();
    const fresh = defaultState();
    applyUrlOverrides(fresh, this.runtime, this.runtime.url);
    this.state = fresh;
    this.simTime = this.runtime.timeFrozen ? this.runtime.frozenTime : fresh.time;
    this.updateCinematicBase();
    this.commit();
    this.resize();
    return true;
  }

  getState() {
    const s = cloneState(this.state);
    const q = QUALITY[this.state.quality];
    const view = DEBUG_VIEWS[this.state.debug];
    return {
      ...s,
      time: this.simTime,
      ready: this.ready,
      capture: this.runtime.capture,
      frozen: this.runtime.timeFrozen,
      invalidKeys: [...(this.runtime.invalidKeys ?? [])],
      storageOk: this.runtime.storageOk,
      storageReason: this.runtime.storageReason,
      renderSize: { ...this.renderSize },
      dpr: this.dpr,
      qualityBudget: { ...q },
      debugView: { index: this.state.debug, name: view.name, desc: view.desc },
      presetName: this.state.preset == null ? 'CUSTOM' : PRESETS[this.state.preset].name,
      frames: this.renderCount,
      contextLost: this.contextLost,
      hdr: this.hdrType,
      warnings: [...this.warnings],
      paramDefs: PARAM_DEFS.map((p) => ({ ...p })),
    };
  }

  // ------------------------------------------------------------- orbit control
  handleControlsStart() {
    this.state.preset = null; // manual camera control supersedes any preset
    if (this.runtime.cinematicDisabled) return;
    if (this.state.cinematicPlaying) {
      this.state.cinematicPlaying = false;
      this.updateCinematicBase();
      this.persistOnly();
    }
  }

  handleControlsChange() {
    if (this._programmatic || this.contextLost || this.disposed) return;
    if (this.state.cinematicPlaying && !this.runtime.cinematicDisabled) return;
    const off = this._tmpVec.copy(this.camera.position).sub(this.controls.target);
    const sph = this._tmpSph.setFromVector3(off);
    const p = this.state.params;
    p.azimuth = clamp(THREE.MathUtils.radToDeg(sph.theta), PARAM_MAP.azimuth.min, PARAM_MAP.azimuth.max);
    p.pitch = clamp(90 - THREE.MathUtils.radToDeg(sph.phi), PARAM_MAP.pitch.min, PARAM_MAP.pitch.max);
    p.distance = clamp(sph.radius, PARAM_MAP.distance.min, PARAM_MAP.distance.max);
    this.updateCinematicBase();
    const now = performance.now();
    if (now - this._lastSync > 80) {
      this._lastSync = now;
      this.persistOnly();
    }
  }

  throttledUI() {
    const now = performance.now();
    if (now - this._lastUI < 100) return;
    this._lastUI = now;
    this.onStateChange(this.getState());
  }

  // ------------------------------------------------------------------ rendering
  compileAndCheck() {
    const previous = this.quad.material;
    for (const mat of this.allMaterials) {
      this.quad.material = mat;
      this.renderer.compile(this.quadScene, this.quadCamera);
    }
    this.quad.material = previous;
    const broken = (this.renderer.info.programs ?? []).filter((p) => p.diagnostics);
    if (broken.length) {
      const msg = broken
        .map((p) => p.diagnostics?.programLog || p.diagnostics?.fragmentShader?.log || 'shader error')
        .join('\n');
      throw new Error(`Shader compilation failed: ${msg}`);
    }
  }

  blit(material, target) {
    this.quad.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  blurPass(source, tmp, dest, radius) {
    this.blurMaterial.uniforms.tSrc.value = source.texture;
    this.blurMaterial.uniforms.uDir.value.set(1 / tmp.width, 0);
    this.blurMaterial.uniforms.uRadius.value = radius;
    this.blit(this.blurMaterial, tmp);

    this.blurMaterial.uniforms.tSrc.value = tmp.texture;
    this.blurMaterial.uniforms.uDir.value.set(0, 1 / tmp.height);
    this.blit(this.blurMaterial, dest);
  }

  renderBloom(q) {
    this.brightMaterial.uniforms.tSrc.value = this.rtScene.texture;
    this.brightMaterial.uniforms.uThreshold.value = this.state.params.bloomThreshold;
    this.blit(this.brightMaterial, this.brightTargets[0]);
    this.blurPass(this.brightTargets[0], this.tmpTargets[0], this.bloomTargets[0], q.blurRadius);

    for (let l = 1; l < q.bloomLevels; l++) {
      this.copyMaterial.uniforms.tSrc.value = this.bloomTargets[l - 1].texture;
      this.blit(this.copyMaterial, this.brightTargets[l]);
      this.blurPass(this.brightTargets[l], this.tmpTargets[l], this.bloomTargets[l], q.blurRadius);
    }
  }

  renderFrame() {
    if (this.contextLost || this.disposed || !this.rtScene) return;
    const q = QUALITY[this.state.quality];

    this.quad.material = this.geodesicMaterial;
    this.renderer.setRenderTarget(this.rtScene);
    this.renderer.render(this.quadScene, this.quadCamera);

    this.renderBloom(q);

    this.quad.material = this.compositeMaterial;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.quadScene, this.quadCamera);
    this.renderCount++;
  }

  // Diagnostic: re-render and read the default framebuffer so automated checks
  // can prove the image is non-black and structured without a PNG decoder.
  sampleFrame() {
    if (this.contextLost || this.disposed) return null;
    this.renderFrame();
    const gl = this.renderer.getContext();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    const w = this.canvas.width;
    const h = this.canvas.height;
    if (w < 2 || h < 2) return null;
    const buf = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buf);
    let sum = 0;
    let sum2 = 0;
    let n = 0;
    let dark = 0;
    let bright = 0;
    let centerSum = 0;
    let centerN = 0;
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const i = (y * w + x) * 4;
        const l = 0.2126 * buf[i] + 0.7152 * buf[i + 1] + 0.0722 * buf[i + 2];
        sum += l;
        sum2 += l * l;
        n++;
        if (l < 6) dark++;
        if (l > 170) bright++;
        if (Math.abs(x - w / 2) < w * 0.09 && Math.abs(y - h / 2) < h * 0.09) {
          centerSum += l;
          centerN++;
        }
      }
    }
    const mean = sum / Math.max(n, 1);
    return {
      width: w,
      height: h,
      mean,
      std: Math.sqrt(Math.max(sum2 / Math.max(n, 1) - mean * mean, 0)),
      darkFraction: dark / Math.max(n, 1),
      brightFraction: bright / Math.max(n, 1),
      centerMean: centerN ? centerSum / centerN : 0,
      samples: n,
    };
  }

  tick(ts) {
    this.frameHandle = requestAnimationFrame(this.tickBound);
    if (this.contextLost || this.disposed) return;
    // A frozen capture renders only when state actually changes; this keeps
    // the first screenshot-ready frame deterministic and avoids burning GPU
    // time re-rendering an identical frozen frame.
    if (this.runtime.timeFrozen && !this._dirty) return;

    const now = ts * 0.001;
    const dt = this.lastFrameTs ? Math.min(Math.max(now - this.lastFrameTs, 0), 0.1) : 0;
    this.lastFrameTs = now;

    if (this.runtime.timeFrozen) this.simTime = this.runtime.frozenTime;
    else this.simTime += dt * this.state.params.timeScale;

    const cinematicActive = this.state.cinematicPlaying && !this.runtime.cinematicDisabled;
    if (cinematicActive) {
      const pose = this.cinematicPose(this.simTime);
      this.state.params.azimuth = pose.azimuth;
      this.state.params.pitch = pose.pitch;
      this.state.params.distance = pose.distance;
      this._programmatic = true;
      this.setCameraFromParams();
      this._programmatic = false;
      this.throttledUI();
    } else {
      this.controls.update();
    }

    this.applyUniforms();
    this.updateCameraBasis();
    this.renderFrame();
    if (this.runtime.timeFrozen) this._dirty = false;
  }

  // ------------------------------------------------------------ context loss
  handleContextLost() {
    this.contextLost = true;
    this.stop();
    this.onContextState('lost');
  }

  handleContextRestored() {
    if (this.disposed) return;
    try {
      // Three.js reinitialises its own GL state; rebuild every resource we own
      // and re-apply the versioned persisted state (plus the URL contract).
      this.disposeResources();
      this.buildResources();
      const loaded = loadState();
      const restored = loaded.state;
      applyUrlOverrides(restored, this.runtime, this.runtime.url);
      this.state = restored;
      this.simTime = this.runtime.timeFrozen ? this.runtime.frozenTime : restored.time;
      this.runtime.storageOk = loaded.ok;
      this.updateCinematicBase();
      this.contextLost = false; // context is live again; allow resize/render
      this.applyState();
      this.resize();
      this.compileAndCheck();
      this._dirty = true;
      this.renderFrame();
      this.onContextState('restored');
      this.start();
    } catch (error) {
      this.warnings.push(`context restore: ${error?.message ?? error}`);
      this.onContextState('error', String(error?.message ?? error));
    }
  }

  simulateContextLoss() {
    const gl = this.renderer.getContext();
    const ext = gl.getExtension('WEBGL_lose_context');
    if (!ext) return { ok: false, reason: 'WEBGL_lose_context unavailable' };
    ext.loseContext();
    setTimeout(() => {
      try {
        ext.restoreContext();
      } catch (error) {
        this.warnings.push(`restoreContext: ${error?.message ?? error}`);
      }
    }, 1300);
    return { ok: true, reason: 'loss induced; restore scheduled in 1.3s' };
  }

  restoreContextNow() {
    const gl = this.renderer.getContext();
    const ext = gl.getExtension('WEBGL_lose_context');
    if (!ext) return { ok: false, reason: 'WEBGL_lose_context unavailable' };
    ext.restoreContext();
    return { ok: true, reason: 'restore requested' };
  }

  markReady() {
    this.ready = true;
    document.documentElement.dataset.gargantuaReady = 'true';
    this.onReady();
  }
}
