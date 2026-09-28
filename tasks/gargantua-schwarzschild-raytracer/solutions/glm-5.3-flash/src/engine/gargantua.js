import * as THREE from '../../vendor/three.module.js';
import { OrbitControls } from '../../vendor/addons/controls/OrbitControls.js';
import { EffectComposer } from '../../vendor/addons/postprocessing/EffectComposer.js';
import { RenderPass } from '../../vendor/addons/postprocessing/RenderPass.js';
import { ShaderPass } from '../../vendor/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from '../../vendor/addons/postprocessing/UnrealBloomPass.js';
import { raytracerVertex, raytracerFragment } from './shaders/raytracer.glsl.js';
import { CompositeShader } from './shaders/composite.glsl.js';
import {
  QUALITY_LEVELS,
  QUALITY_PROFILES,
  PRESETS,
  defaultParams,
  sanitizeParams,
} from './constants.js';
import { savePersistedState } from './persistence.js';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const MAX_DPR = 2;

// scratch vectors reused every frame (no per-frame allocation)
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _upv = new THREE.Vector3();

function wrap360(deg) {
  return ((deg % 360) + 360) % 360;
}

function shortestAzimuthDelta(from, to) {
  let d = (to - from) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

// Engine owning the WebGL pipeline, simulation state, camera and persistence.
// React subscribes via callbacks; the engine is the source of truth for live
// values (the camera feeds back into camAzimuth/camPolar/camDistance).
export class Gargantua {
  constructor(canvas, { initial, onChange, onReady, onContextState, onError }) {
    this.canvas = canvas;
    this.onChange = onChange || (() => {});
    this.onReady = onReady || (() => {});
    this.onContextState = onContextState || (() => {});
    this.onError = onError || (() => {});

    this.state = {
      quality: initial.quality,
      preset: initial.preset,
      debug: initial.debug,
      hudVisible: initial.hudVisible,
      cinematic: initial.cinematic,
      params: { ...initial.params },
    };
    this.capture = !!initial.capture;
    this.simTime = Number.isFinite(initial.time) ? Math.max(0, initial.time) : 0;

    this.profile = QUALITY_PROFILES[this.state.quality];
    this.uniforms = null;
    this.compositePass = null;
    this.bloomPass = null;
    this.renderer = null;
    this.composer = null;
    this.ready = false;
    this.contextLost = false;
    this.framesRendered = 0;
    this.raf = 0;
    this.lastFrameTime = 0;
    this.fpsFrames = 0;
    this.fpsElapsed = 0;
    this.fps = 0;
    this.dirtyCamera = true;
    this.userDriving = false;
    this.tween = null;
    this._saveTimer = 0;
    this._lastNotify = 0;
    this._lastNotifiedCam = '';

    this._initScene();
    this._buildPipeline();
    this._initControls();
    this.resize();
    this._registerApi();
    this._registerContextHandlers();
    this._warmupRender();
  }

  // ------------------------------------------------------------------ scene

  _initScene() {
    this.camera = new THREE.PerspectiveCamera(this.state.params.fov, 1, 0.1, 300);
    this.scene = new THREE.Scene();
    this.uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamForward: { value: new THREE.Vector3(0, 0, -1) },
      uTanHalfFov: { value: Math.tan(30 * DEG2RAD) },
      uDiskInner: { value: 3.0 },
      uDiskOuter: { value: 12.5 },
      uDiskHalfThick: { value: 0.22 },
      uDiskTemp: { value: 6800 },
      uDiskEmission: { value: 1.6 },
      uOrbitSpeed: { value: 1.0 },
      uTurbAmp: { value: 1.0 },
      uTurbSpeed: { value: 1.0 },
      uStarDensity: { value: 1.0 },
      uGalaxyBrightness: { value: 1.0 },
      uDebug: { value: 0 },
      uMaxSteps: { value: 300 },
      uStepSize: { value: 0.05 },
      uDiskSamples: { value: 10 },
      uEscapeR: { value: 45 },
    };
    const material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: raytracerVertex,
      fragmentShader: raytracerFragment,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    this.raytracerMaterial = material;
  }

  _buildPipeline() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.toneMapping = THREE.NoToneMapping; // ACES lives in CompositeShader

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.6, 0.85, 1.0);
    this.composer.addPass(this.bloomPass);
    this.compositePass = new ShaderPass(CompositeShader);
    this.compositePass.renderToScreen = true;
    this.composer.addPass(this.compositePass);
  }

  _disposePipeline() {
    try {
      if (this.composer) {
        this.composer.renderTarget1?.dispose();
        this.composer.renderTarget2?.dispose();
        if (typeof this.composer.dispose === 'function') this.composer.dispose();
      }
    } catch {
      // context is gone; GL-side disposal may fail, that is expected
    }
    try {
      this.renderer?.dispose();
    } catch {
      // ignore
    }
    this.composer = null;
    this.renderer = null;
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.7;
    this.controls.minDistance = 3.5;
    this.controls.maxDistance = 40;
    this.controls.minPolarAngle = 5 * DEG2RAD; // camPolar max +85 deg
    this.controls.maxPolarAngle = 175 * DEG2RAD; // camPolar min -85 deg

    this._onControlsStart = () => {
      this.userDriving = true;
      this.tween = null;
      if (this.state.cinematic) {
        this.state.cinematic = false;
        this._notifyDiscrete();
      }
    };
    this._onControlsEnd = () => {
      this.userDriving = false;
      if (this.state.preset !== -1) {
        this.state.preset = -1; // custom view after manual control
        this._notifyDiscrete();
      }
    };
    this.controls.addEventListener('start', this._onControlsStart);
    this.controls.addEventListener('end', this._onControlsEnd);
  }

  _registerContextHandlers() {
    this._onContextLost = (e) => {
      e.preventDefault();
      this.contextLost = true;
      this.stopLoop();
      this.onContextState(true);
    };
    this._onContextRestored = () => {
      this.contextLost = false;
      this._disposePipeline();
      this._buildPipeline(); // shader programs, RTs and bloom rebuild on the restored context
      this.resize();
      this.onContextState(false);
      this.startLoop();
    };
    this.canvas.addEventListener('webglcontextlost', this._onContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this._onContextRestored, false);
  }

  // -------------------------------------------------------------- camera io

  _applyCameraFromParams() {
    const p = this.state.params;
    const el = Math.max(p.camPolar, -85) * DEG2RAD;
    const az = p.camAzimuth * DEG2RAD;
    const r = p.camDistance;
    this.camera.position.set(
      r * Math.cos(el) * Math.cos(az),
      r * Math.sin(el),
      r * Math.cos(el) * Math.sin(az),
    );
    this.camera.lookAt(0, 0, 0);
    this.controls.update();
  }

  _syncParamsFromCamera() {
    const pos = this.camera.position;
    const r = pos.length();
    if (!(r > 0)) return;
    const el = Math.asin(Math.max(-1, Math.min(1, pos.y / r))) * RAD2DEG;
    const az = wrap360(Math.atan2(pos.z, pos.x) * RAD2DEG);
    const p = this.state.params;
    const nextAz = Math.round(az * 2) / 2;
    const nextEl = Math.round(el * 2) / 2;
    const nextR = Math.round(r * 10) / 10;
    const sig = `${nextAz}|${nextEl}|${nextR}`;
    if (sig === this._lastNotifiedCam) return;
    this._lastNotifiedCam = sig;
    p.camAzimuth = nextAz;
    p.camPolar = nextEl;
    p.camDistance = nextR;
    this._scheduleSave();
    this._notifyThrottled();
  }

  // ------------------------------------------------------------ frame loop

  // Render one frame synchronously at init so the first visible image and the
  // gargantuaReady signal do not depend on requestAnimationFrame, which is
  // throttled or paused entirely in hidden/background tabs.
  _warmupRender() {
    try {
      this._applyCameraFromParams();
      this.dirtyCamera = false;
      this._updateUniforms();
      this.composer.render();
      this.framesRendered++;
      this.ready = true;
      document.documentElement.dataset.gargantuaReady = 'true';
      this.onReady();
    } catch (err) {
      console.error('[gargantua] warmup render failed:', err);
      this.onError(err);
    }
  }

  startLoop() {
    if (this.raf) return;
    this.lastFrameTime = performance.now();
    const tick = (now) => {
      this.raf = requestAnimationFrame(tick);
      this._frame(now);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stopLoop() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  _frame(now) {
    const dt = Math.min((now - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = now;

    const p = this.state.params;

    if (!this.capture) {
      this.simTime += dt * p.timeScale;
    }

    // cinematic loop: slow azimuth drift (frozen entirely in capture mode)
    if (this.state.cinematic && !this.capture && !this.userDriving) {
      p.camAzimuth = wrap360(p.camAzimuth + 1.3 * dt);
      this.dirtyCamera = true;
    }

    // tween towards a preset / slider target
    if (this.tween && !this.userDriving) {
      const t = this.tween;
      const k = Math.min(1, dt * 3.2);
      p.camDistance += (t.camDistance - p.camDistance) * k;
      p.camPolar += (t.camPolar - p.camPolar) * k;
      p.camAzimuth = wrap360(p.camAzimuth + shortestAzimuthDelta(p.camAzimuth, t.camAzimuth) * k);
      p.fov += (t.fov - p.fov) * k;
      if (
        Math.abs(t.camDistance - p.camDistance) < 0.02 &&
        Math.abs(t.camPolar - p.camPolar) < 0.05 &&
        Math.abs(shortestAzimuthDelta(p.camAzimuth, t.camAzimuth)) < 0.05 &&
        Math.abs(t.fov - p.fov) < 0.05
      ) {
        p.camDistance = t.camDistance;
        p.camPolar = t.camPolar;
        p.camAzimuth = wrap360(t.camAzimuth);
        p.fov = t.fov;
        this.tween = null;
      }
      this.dirtyCamera = true;
    }

    if (this.dirtyCamera && !this.userDriving) {
      this._applyCameraFromParams();
      this.dirtyCamera = false;
    } else {
      this._syncParamsFromCamera();
    }

    this.controls.update();
    this.camera.fov = p.fov;
    this.camera.updateProjectionMatrix();

    this._updateUniforms();
    try {
      this.composer.render();
    } catch (err) {
      console.error('[gargantua] render failed:', err);
      this.stopLoop();
      this.onError(err);
      return;
    }

    this.framesRendered++;
    if (!this.ready && this.framesRendered >= 2) {
      this.ready = true;
      document.documentElement.dataset.gargantuaReady = 'true';
      this.onReady();
    }

    this.fpsFrames++;
    this.fpsElapsed += dt;
    if (this.fpsElapsed >= 0.5) {
      this.fps = Math.round(this.fpsFrames / this.fpsElapsed);
      this.fpsFrames = 0;
      this.fpsElapsed = 0;
      this._notifyThrottled();
    }
  }

  _updateUniforms() {
    const u = this.uniforms;
    const p = this.state.params;
    const size = this.composer.renderTarget1; // internal HDR buffer size
    u.uResolution.value.set(size.width, size.height);
    u.uTime.value = this.simTime;

    u.uCamPos.value.copy(this.camera.position);
    _forward.copy(this.camera.position).multiplyScalar(-1).normalize();
    _right.crossVectors(_forward, this.camera.up).normalize();
    _upv.crossVectors(_right, _forward).normalize();
    u.uCamForward.value.copy(_forward);
    u.uCamRight.value.copy(_right);
    u.uCamUp.value.copy(_upv);
    u.uTanHalfFov.value = Math.tan(p.fov * DEG2RAD * 0.5);

    u.uDiskInner.value = p.diskInner;
    u.uDiskOuter.value = Math.max(p.diskOuter, p.diskInner + 1);
    u.uDiskHalfThick.value = p.diskThickness;
    u.uDiskTemp.value = p.diskTemp;
    u.uDiskEmission.value = p.diskEmission;
    u.uOrbitSpeed.value = p.orbitSpeed;
    u.uTurbAmp.value = p.turbAmp;
    u.uTurbSpeed.value = p.turbSpeed;
    u.uStarDensity.value = p.starDensity;
    u.uGalaxyBrightness.value = p.galaxyBrightness;

    u.uDebug.value = this.state.debug;
    u.uMaxSteps.value = this.profile.maxSteps;
    u.uStepSize.value = this.profile.stepSize;
    u.uDiskSamples.value = this.profile.diskSamples;
    u.uEscapeR.value = Math.max(45, p.camDistance * 1.25);

    this.bloomPass.strength = p.bloomStrength;
    this.bloomPass.threshold = p.bloomThreshold;
    this.bloomPass.radius = 0.85;

    const c = this.compositePass.uniforms;
    c.uTime.value = this.simTime;
    c.uDebug.value = this.state.debug;
    c.uExposure.value = p.exposure;
    c.uVignette.value = p.vignette;
    c.uGrain.value = p.grain;
    c.uChroma.value = p.chroma;
  }

  // ---------------------------------------------------------------- resize

  resize() {
    if (!this.renderer || !this.composer) return;
    const w = Math.max(1, this.canvas.clientWidth || window.innerWidth);
    const h = Math.max(1, this.canvas.clientHeight || window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    // Canvas at full device resolution; the raytracer/bloom buffer at an
    // explicit INTEGER pixel size (dpr * renderScale can be fractional, e.g.
    // 125% Windows scaling, and fractional RT dimensions break the framebuffer).
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, true);
    const scale = dpr * this.profile.renderScale;
    const pw = Math.max(1, Math.round(w * scale));
    const ph = Math.max(1, Math.round(h * scale));
    this.composer.setPixelRatio(1);
    this.composer.setSize(pw, ph);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ----------------------------------------------------------- public api

  getPublicState() {
    return {
      quality: this.state.quality,
      preset: this.state.preset,
      debug: this.state.debug,
      hudVisible: this.state.hudVisible,
      cinematic: this.state.cinematic,
      capture: this.capture,
      time: this.simTime,
      fps: this.fps,
      params: { ...this.state.params },
    };
  }

  setParams(partial, { tween = false } = {}) {
    const sanitized = sanitizeParams({ ...this.state.params, ...partial });
    const cameraKeys = ['fov', 'camDistance', 'camAzimuth', 'camPolar'];
    const touchesCamera = Object.keys(partial).some((k) => cameraKeys.includes(k));
    const prev = this.state.params;
    this.state.params = sanitized;
    if (touchesCamera) {
      if (tween) {
        this.tween = {
          fov: sanitized.fov,
          camDistance: sanitized.camDistance,
          camAzimuth: sanitized.camAzimuth,
          camPolar: sanitized.camPolar,
        };
      } else {
        // direct manual camera input (sliders): the user takes control, so the
        // cinematic loop must not keep fighting the slider
        this.tween = null;
        this.dirtyCamera = true;
        this.state.cinematic = false;
      }
    } else {
      // keep untouched camera params as they are now (sync may have updated them)
      for (const k of cameraKeys) sanitized[k] = prev[k];
    }
    this._scheduleSave();
    this._notifyDiscrete();
  }

  setQuality(level) {
    if (!QUALITY_LEVELS.includes(level)) return false;
    this.state.quality = level;
    this.profile = QUALITY_PROFILES[level];
    this.resize(); // rebuilds internal buffer sizes for the new budget
    this._scheduleSave();
    this._notifyDiscrete();
    return true;
  }

  setDebug(index) {
    if (!Number.isInteger(index) || index < 0 || index > 9) return false;
    this.state.debug = index;
    this._scheduleSave();
    this._notifyDiscrete();
    return true;
  }

  setPreset(index, { silent = false } = {}) {
    if (!Number.isInteger(index) || index < 0 || index > 3) return false;
    const preset = PRESETS[index];
    this.state.preset = index;
    this.setParams(
      { fov: preset.fov, camDistance: preset.camDistance, camAzimuth: preset.camAzimuth, camPolar: preset.camPolar },
      // capture runs need the exact camera on the first frame: snap, don't tween
      { tween: !this.capture },
    );
    if (!silent) this._notifyDiscrete();
    return true;
  }

  setCinematic(on) {
    this.state.cinematic = !!on;
    if (on) this.tween = null;
    this._scheduleSave();
    this._notifyDiscrete();
  }

  setHudVisible(on) {
    this.state.hudVisible = !!on;
    this._scheduleSave();
    this._notifyDiscrete();
  }

  resetAll() {
    this.state.params = defaultParams();
    this.state.quality = 'high';
    this.state.preset = 0;
    this.state.debug = 0;
    this.state.cinematic = true;
    this.profile = QUALITY_PROFILES.high;
    this.simTime = 0;
    this.tween = null;
    this.dirtyCamera = true;
    this.resize();
    this._scheduleSave();
    this._notifyDiscrete();
  }

  setTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return false;
    this.simTime = seconds;
    return true;
  }

  dispose() {
    this.stopLoop();
    this.canvas.removeEventListener('webglcontextlost', this._onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this._onContextRestored);
    this.controls.removeEventListener('start', this._onControlsStart);
    this.controls.removeEventListener('end', this._onControlsEnd);
    this.controls.dispose();
    this.raytracerMaterial.dispose();
    this._disposePipeline();
  }

  // ------------------------------------------------------- notifications

  _notifyDiscrete() {
    this._lastNotifiedCam = '';
    this.onChange(this.getPublicState());
  }

  _notifyThrottled() {
    const now = performance.now();
    if (now - this._lastNotify < 120) return;
    this._lastNotify = now;
    this.onChange(this.getPublicState());
  }

  _scheduleSave() {
    if (this.capture) return; // capture runs must not rewrite the user's prefs
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      savePersistedState({
        quality: this.state.quality,
        preset: this.state.preset,
        debug: this.state.debug,
        hudVisible: this.state.hudVisible,
        cinematic: this.state.cinematic,
        params: this.state.params,
      });
    }, 250);
  }

  // --------------------------------------------- window.__GARGANTUA__ api

  _registerApi() {
    const engine = this;
    const reject = () => null;
    window.__GARGANTUA__ = {
      get ready() {
        return engine.ready;
      },
      getState() {
        return engine.getPublicState();
      },
      setQuality(level) {
        try {
          return engine.setQuality(level) ? engine.getPublicState() : reject();
        } catch {
          return null;
        }
      },
      setPreset(index) {
        try {
          return engine.setPreset(index, { silent: true }) ? engine.getPublicState() : reject();
        } catch {
          return null;
        }
      },
      setDebug(index) {
        try {
          return engine.setDebug(index) ? engine.getPublicState() : reject();
        } catch {
          return null;
        }
      },
      setTime(seconds) {
        try {
          return engine.setTime(seconds) ? engine.getPublicState() : reject();
        } catch {
          return null;
        }
      },
    };
  }
}
