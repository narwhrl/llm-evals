// GARGANTUA engine: WebGL renderer, HDR post pipeline, OrbitControls-driven
// camera rig with cinematic loop and presets, quality budgets, context-loss
// recovery, and the URL-capture ready contract.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  BLOOM_DOWN_FRAG,
  BLOOM_PREFILTER_FRAG,
  BLOOM_UP_FRAG,
  COMPOSITE_FRAG,
  FULLSCREEN_VERT,
} from './shaders/post.glsl';
import { RAYTRACE_FRAG } from './shaders/raytrace.glsl';
import { PRESETS, QUALITY_LEVELS, QUALITY_TIERS, type QualityLevel } from '../state/defaults';
import { store } from '../state/store';
import type { GargantuaAPI, GargantuaSnapshot } from '../state/api';

const DEG = Math.PI / 180;

function fullscreenTriangle(): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
  );
  return g;
}

interface RigState {
  radius: number;
  azimuth: number; // rad
  polar: number; // rad from +y
  fov: number; // deg
}

interface Tween {
  from: RigState;
  to: RigState;
  start: number;
  dur: number;
}

function smootherstep(t: number): number {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export class GargantuaEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private scene = new THREE.Scene();
  private mesh!: THREE.Mesh;
  private dummyCam = new THREE.Camera();

  private rayMat!: THREE.ShaderMaterial;
  private prefilterMat!: THREE.ShaderMaterial;
  private downMat!: THREE.ShaderMaterial;
  private upMat!: THREE.ShaderMaterial;
  private compositeMat!: THREE.ShaderMaterial;

  private sceneRT!: THREE.WebGLRenderTarget;
  private bloomRTs: THREE.WebGLRenderTarget[] = [];

  private raf = 0;
  private watchdog: ReturnType<typeof setInterval> | undefined;
  private lastRender = 0;
  private running = false;
  private paused = false;
  private ready = false;
  private simTime = 0;
  private timeFrozen = false;
  private lastTimeScale = 1;
  private lastFrame = performance.now();
  private frames = 0;
  private perfAccum = 0;
  private perfLast = performance.now();
  private lastCameraVersion = -1;
  private lastRigFeedback = -1;
  private lastWriteBack = 0;
  private cinemaPhase = 0;
  private tween: Tween | null = null;
  private userHold = false;
  private resizeObs: ResizeObserver | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.build();
    if (store.capture.capture) {
      this.simTime = store.capture.time;
      this.timeFrozen = true;
    }
    this.applyCameraParams(true);
    canvas.addEventListener('webglcontextlost', this.onContextLost);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored);
  }

  // ---- construction / teardown ------------------------------------------

  private build() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.debug.checkShaderErrors = true;

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.05, 300);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 2.5;
    this.controls.maxDistance = 45;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.7;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('start', () => {
      this.userHold = true;
      this.tween = null;
      store.setCinematic(false); // manual control is never taken back
    });
    this.controls.addEventListener('end', () => {
      this.userHold = false;
    });

    const geo = fullscreenTriangle();
    this.rayMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: RAYTRACE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3() },
        uCamUp: { value: new THREE.Vector3() },
        uCamFwd: { value: new THREE.Vector3() },
        uTanHalfFov: { value: Math.tan((55 * DEG) / 2) },
        uAspect: { value: 1 },
        uTime: { value: 0 },
        uMaxSteps: { value: 320 },
        uStepScale: { value: 1 },
        uDebug: { value: 0 },
        uDiskInner: { value: 2.6 },
        uDiskOuter: { value: 12 },
        uDiskThickness: { value: 0.35 },
        uDiskTemp: { value: 1 },
        uDiskIntensity: { value: 1 },
        uOrbitSpeed: { value: 1 },
        uTurbAmp: { value: 0.55 },
        uTurbSpeed: { value: 1 },
        uStarDensity: { value: 0.5 },
        uMilkyWay: { value: 0.7 },
      },
    });
    this.prefilterMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLOOM_PREFILTER_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDiffuse: { value: null },
        uThreshold: { value: 1 },
      },
    });
    this.downMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLOOM_DOWN_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDiffuse: { value: null },
        uTexel: { value: new THREE.Vector2() },
      },
    });
    this.upMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLOOM_UP_FRAG,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        tDiffuse: { value: null },
        uTexel: { value: new THREE.Vector2() },
      },
    });
    this.compositeMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: COMPOSITE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tScene: { value: null },
        tBloom: { value: null },
        uResolution: { value: new THREE.Vector2() },
        uTime: { value: 0 },
        uBloomStrength: { value: 0.45 },
        uExposure: { value: 1.1 },
        uVignette: { value: 0.35 },
        uGrain: { value: 0.035 },
        uChroma: { value: 0.5 },
        uDebug: { value: 0 },
      },
    });
    this.mesh = new THREE.Mesh(geo, this.rayMat);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);

    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(this.canvas.parentElement ?? this.canvas);
    this.resize();
  }

  private disposeGL() {
    this.resizeObs?.disconnect();
    this.resizeObs = null;
    this.controls?.dispose();
    this.sceneRT?.dispose();
    for (const rt of this.bloomRTs) rt.dispose();
    this.bloomRTs = [];
    this.mesh?.geometry.dispose();
    this.rayMat?.dispose();
    this.prefilterMat?.dispose();
    this.downMat?.dispose();
    this.upMat?.dispose();
    this.compositeMat?.dispose();
    this.renderer?.dispose();
  }

  dispose() {
    this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.disposeGL();
  }

  // ---- context loss / restoration ---------------------------------------

  private onContextLost = (e: Event) => {
    e.preventDefault();
    this.paused = true;
    store.setContextLost(true);
  };

  private onContextRestored = () => {
    // rebuild every GPU resource on the same canvas and resume from the
    // persisted store state; no page reload involved
    this.disposeGL();
    this.build();
    this.applyCameraParams(true);
    store.setContextLost(false);
    this.paused = false;
  };

  // ---- sizing / quality --------------------------------------------------

  private resize() {
    const parent = this.canvas.parentElement;
    const w = Math.max(1, parent?.clientWidth ?? window.innerWidth);
    const h = Math.max(1, parent?.clientHeight ?? window.innerHeight);
    const budget = QUALITY_TIERS[store.getState().quality];
    const dpr = Math.min(window.devicePixelRatio || 1, budget.dprCap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.rebuildTargets();
    this.appliedQuality = store.getState().quality;
  }

  private rebuildTargets() {
    const budget = QUALITY_TIERS[store.getState().quality];
    const db = new THREE.Vector2();
    this.renderer.getDrawingBufferSize(db);
    const w = Math.max(2, Math.round(db.x * budget.renderScale));
    const h = Math.max(2, Math.round(db.y * budget.renderScale));

    const opts: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    };
    this.sceneRT?.dispose();
    this.sceneRT = new THREE.WebGLRenderTarget(w, h, opts);

    for (const rt of this.bloomRTs) rt.dispose();
    this.bloomRTs = [];
    let bw = Math.max(2, w >> 1);
    let bh = Math.max(2, h >> 1);
    for (let i = 0; i < budget.bloomMips; i++) {
      this.bloomRTs.push(new THREE.WebGLRenderTarget(bw, bh, opts));
      bw = Math.max(2, bw >> 1);
      bh = Math.max(2, bh >> 1);
    }
    (this.compositeMat.uniforms.uResolution.value as THREE.Vector2).set(w, h);
  }

  // ---- camera rig ---------------------------------------------------------

  private currentRig(): RigState {
    const sph = new THREE.Spherical().setFromVector3(
      this.camera.position.clone().sub(this.controls.target),
    );
    return { radius: sph.radius, azimuth: sph.theta, polar: sph.phi, fov: this.camera.fov };
  }

  private setRig(r: RigState) {
    const clampedPolar = Math.min(Math.max(r.polar, 3 * DEG), 177 * DEG);
    const clampedRadius = Math.min(Math.max(r.radius, 2.5), 45);
    this.camera.position.setFromSphericalCoords(
      clampedRadius,
      clampedPolar,
      r.azimuth,
    );
    if (this.camera.fov !== r.fov) {
      this.camera.fov = r.fov;
      this.camera.updateProjectionMatrix();
    }
    this.camera.lookAt(this.controls.target);
  }

  /** apply camera params from the store (sliders snap; presets tween) */
  private applyCameraParams(initial = false) {
    const { params, preset } = store.getState();
    const to: RigState = {
      radius: params.camDistance,
      azimuth: params.camAzimuth * DEG,
      polar: params.camPolar * DEG,
      fov: params.fov,
    };
    if (initial || preset < 0) {
      this.setRig(to);
      this.tween = null;
    } else {
      const from = this.currentRig();
      // shortest azimuth path
      while (to.azimuth - from.azimuth > Math.PI) to.azimuth -= 2 * Math.PI;
      while (to.azimuth - from.azimuth < -Math.PI) to.azimuth += 2 * Math.PI;
      this.tween = { from, to, start: performance.now(), dur: initial ? 0 : 1400 };
    }
  }

  private syncCameraUniforms() {
    this.camera.updateMatrixWorld();
    const u = this.rayMat.uniforms;
    (u.uCamPos.value as THREE.Vector3).setFromMatrixPosition(this.camera.matrixWorld);
    const e = this.camera.matrixWorld.elements;
    (u.uCamRight.value as THREE.Vector3).set(e[0], e[1], e[2]).normalize();
    (u.uCamUp.value as THREE.Vector3).set(e[4], e[5], e[6]).normalize();
    (u.uCamFwd.value as THREE.Vector3).set(-e[8], -e[9], -e[10]).normalize();
    u.uTanHalfFov.value = Math.tan((this.camera.fov * DEG) / 2);
    u.uAspect.value = this.camera.aspect;
  }

  private writeBackCamera(now: number) {
    if (now - this.lastWriteBack < 200) return; // throttle HUD updates
    this.lastWriteBack = now;
    const rig = this.currentRig();
    store.setCameraFromRig(
      rig.radius,
      Math.round((rig.azimuth / DEG) * 10) / 10,
      Math.round((rig.polar / DEG) * 10) / 10,
      rig.fov,
    );
  }

  // ---- frame loop ---------------------------------------------------------

  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrame = performance.now();
    this.raf = requestAnimationFrame(this.loop);
    // rAF is fully paused in hidden tabs / minimized windows; keep rendering
    // (throttled) so tooling and capture flows never stall on a frozen loop
    this.watchdog = setInterval(() => {
      if (this.running && !this.paused && performance.now() - this.lastRender > 400) {
        this.frame(performance.now());
      }
    }, 250);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    clearInterval(this.watchdog);
  }

  private loop = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    this.frame(now);
  };

  private frame = (now: number) => {
    if (this.paused) return;

    const dtRaw = (now - this.lastFrame) / 1000;
    this.lastFrame = now;
    const dt = Math.min(Math.max(dtRaw, 0), 0.1);
    const state = store.getState();

    // camera params changed from UI/preset/capture
    if (store.cameraVersion !== this.lastCameraVersion) {
      this.lastCameraVersion = store.cameraVersion;
      this.lastRigFeedback = store.rigFeedback;
      this.applyCameraParams();
    }

    // preset tween
    if (this.tween) {
      const t = Math.min((now - this.tween.start) / this.tween.dur, 1);
      const k = smootherstep(t);
      const { from, to } = this.tween;
      this.setRig({
        radius: from.radius + (to.radius - from.radius) * k,
        azimuth: from.azimuth + (to.azimuth - from.azimuth) * k,
        polar: from.polar + (to.polar - from.polar) * k,
        fov: from.fov + (to.fov - from.fov) * k,
      });
      if (t >= 1) this.tween = null;
    } else if (state.cinematic && !this.userHold) {
      // slow orbital drift with gentle polar/radius breathing
      this.cinemaPhase += dt;
      const rig = this.currentRig();
      this.setRig({
        radius: rig.radius + Math.sin(this.cinemaPhase * 0.11) * 0.004,
        azimuth: rig.azimuth + dt * 0.03,
        polar: rig.polar + Math.cos(this.cinemaPhase * 0.07) * 0.0006,
        fov: rig.fov,
      });
    }

    this.controls.update();
    if (store.rigFeedback === this.lastRigFeedback) {
      // no external write-back this frame -> camera may have moved (drag /
      // damping / cinema): reflect it into the store (throttled)
      this.writeBackCamera(now);
    } else {
      this.lastRigFeedback = store.rigFeedback;
    }

    // simulation time
    if (state.params.timeScale !== this.lastTimeScale) {
      this.lastTimeScale = state.params.timeScale;
      this.timeFrozen = false; // touching the time scale resumes advancement
    }
    if (!this.timeFrozen) this.simTime += dt * state.params.timeScale;

    // uniforms
    this.syncCameraUniforms();
    const ru = this.rayMat.uniforms;
    const p = state.params;
    ru.uTime.value = this.simTime;
    const budget = QUALITY_TIERS[state.quality];
    ru.uMaxSteps.value = budget.maxSteps;
    ru.uStepScale.value = budget.stepScale;
    ru.uDebug.value = state.debug;
    ru.uDiskInner.value = p.diskInner;
    ru.uDiskOuter.value = p.diskOuter;
    ru.uDiskThickness.value = p.diskThickness;
    ru.uDiskTemp.value = p.diskTemp;
    ru.uDiskIntensity.value = p.diskIntensity;
    ru.uOrbitSpeed.value = p.orbitSpeed;
    ru.uTurbAmp.value = p.turbAmp;
    ru.uTurbSpeed.value = p.turbSpeed;
    ru.uStarDensity.value = p.starDensity;
    ru.uMilkyWay.value = p.milkyWay;

    // pass 1: geodesic raytrace -> HDR scene
    this.mesh.material = this.rayMat;
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.render(this.scene, this.dummyCam);

    const debugPassThrough = state.debug !== 0 && state.debug !== 8;
    if (!debugPassThrough && this.bloomRTs.length > 0) {
      // pass 2: threshold prefilter into bloom mip 0
      this.prefilterMat.uniforms.tDiffuse.value = this.sceneRT.texture;
      this.prefilterMat.uniforms.uThreshold.value = p.bloomThreshold;
      this.mesh.material = this.prefilterMat;
      this.renderer.setRenderTarget(this.bloomRTs[0]);
      this.renderer.render(this.scene, this.dummyCam);

      // pass 3: downsample chain
      this.mesh.material = this.downMat;
      for (let i = 1; i < this.bloomRTs.length; i++) {
        const src = this.bloomRTs[i - 1];
        (this.downMat.uniforms.uTexel.value as THREE.Vector2).set(
          1 / src.width,
          1 / src.height,
        );
        this.downMat.uniforms.tDiffuse.value = src.texture;
        this.renderer.setRenderTarget(this.bloomRTs[i]);
        this.renderer.render(this.scene, this.dummyCam);
      }

      // pass 4: additive upsample chain back into mip 0 — the targets already
      // hold the downsampled content, so clearing must stay off
      this.mesh.material = this.upMat;
      this.renderer.autoClear = false;
      for (let i = this.bloomRTs.length - 1; i > 0; i--) {
        const src = this.bloomRTs[i];
        (this.upMat.uniforms.uTexel.value as THREE.Vector2).set(
          1 / src.width,
          1 / src.height,
        );
        this.upMat.uniforms.tDiffuse.value = src.texture;
        this.renderer.setRenderTarget(this.bloomRTs[i - 1]);
        this.renderer.render(this.scene, this.dummyCam);
      }
      this.renderer.autoClear = true;
    }

    // pass 5: composite to screen
    const cu = this.compositeMat.uniforms;
    cu.tScene.value = this.sceneRT.texture;
    cu.tBloom.value = this.bloomRTs[0]?.texture ?? this.sceneRT.texture;
    cu.uTime.value = this.simTime;
    cu.uBloomStrength.value = p.bloomStrength;
    cu.uExposure.value = p.exposure;
    cu.uVignette.value = p.vignette;
    cu.uGrain.value = p.grain;
    cu.uChroma.value = p.chroma;
    cu.uDebug.value = state.debug;
    this.mesh.material = this.compositeMat;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.dummyCam);

    // quality change -> reallocate budgets
    if (this.appliedQuality !== state.quality) {
      this.resize();
    }

    // perf (2 Hz)
    this.frames++;
    this.perfAccum += dtRaw;
    if (now - this.perfLast >= 500) {
      const fps = (this.frames * 1000) / (now - this.perfLast);
      store.setPerf(Math.round(fps), Math.round((this.perfAccum / this.frames) * 1000));
      this.frames = 0;
      this.perfAccum = 0;
      this.perfLast = now;
    }

    if (!this.ready) this.markReady();
    this.lastRender = now;
  };

  private appliedQuality: QualityLevel | null = null;

  // ---- ready contract ------------------------------------------------------

  getSimTime(): number {
    return this.simTime;
  }

  private markReady() {
    // first successfully rendered frame is on screen (this code runs after the
    // composite pass): shaders compiled, URL state applied -> signal readiness
    this.ready = true;
    document.documentElement.dataset.gargantuaReady = 'true';

    const snapshot = (): GargantuaSnapshot => {
      const s = store.getState();
      return {
        ready: true,
        quality: s.quality,
        preset: s.preset,
        debug: s.debug,
        hud: s.hud,
        cinematic: s.cinematic,
        audio: s.audio,
        params: { ...s.params },
        time: this.simTime,
      };
    };

    const api: GargantuaAPI = {
      get ready() {
        return true;
      },
      getState: () => snapshot(),
      setQuality: (level: unknown) => {
        if (typeof level !== 'string' || !(QUALITY_LEVELS as string[]).includes(level)) {
          return { ok: false as const, error: `invalid quality: ${String(level)}` };
        }
        store.setQuality(level as QualityLevel);
        return snapshot();
      },
      setPreset: (index: unknown) => {
        if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index > PRESETS.length - 1) {
          return { ok: false as const, error: `invalid preset: ${String(index)}` };
        }
        store.applyPresetCamera(index);
        return snapshot();
      },
      setDebug: (index: unknown) => {
        if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index > 9) {
          return { ok: false as const, error: `invalid debug: ${String(index)}` };
        }
        store.setDebug(index);
        return snapshot();
      },
      setTime: (seconds: unknown) => {
        if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
          return { ok: false as const, error: `invalid time: ${String(seconds)}` };
        }
        this.simTime = seconds;
        this.timeFrozen = true;
        return snapshot();
      },
    };
    window.__GARGANTUA__ = api;

    // acceptance-testing hook: induce context loss via WEBGL_lose_context
    const ext = this.renderer.getContext().getExtension('WEBGL_lose_context');
    if (ext) {
      window.__GARGANTUA_DEBUG__ = {
        ...window.__GARGANTUA_DEBUG__,
        loseContext: () => ext.loseContext(),
        restoreContext: () => ext.restoreContext(),
      };
    }
  }
}
