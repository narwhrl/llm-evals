import * as THREE from '../../vendor/three.module.js';
import { OrbitControls } from '../../vendor/addons/controls/OrbitControls.js';
import {
  fullscreenVert,
  blackholeFrag,
  bloomExtractFrag,
  bloomBlurFrag,
  compositeFrag,
} from '../shaders/shaders.js';
import { QUALITY_BUDGET, PRESETS } from './defaults.js';

function makeFullscreenMaterial(fragmentShader, uniforms) {
  return new THREE.RawShaderMaterial({
    vertexShader: fullscreenVert,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
}

/**
 * Fullscreen Schwarzschild geodesic raytracer + HDR bloom / ACES composite.
 * Three.js geometry only carries the fullscreen triangle and OrbitControls camera.
 */
export class GargantuaRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.onContextLost = options.onContextLost || (() => {});
    this.onContextRestored = options.onContextRestored || (() => {});
    this.onReady = options.onReady || (() => {});

    this.disposed = false;
    this.contextLost = false;
    this.ready = false;
    this.captureMode = false;
    this.frozenTime = 0;
    this.simTime = 0;
    this.cinematicPlaying = true;
    this.userOrbiting = false;
    this.cinematicPhase = 0;
    this.debug = 0;
    this.quality = 'high';
    this.params = options.params;
    this._lastTs = performance.now();

    this._onLost = (e) => {
      e.preventDefault();
      this.contextLost = true;
      this.onContextLost();
    };
    this._onRestored = () => {
      this.contextLost = false;
      this._rebuildAfterContextRestore();
      this.onContextRestored();
    };

    canvas.addEventListener('webglcontextlost', this._onLost, false);
    canvas.addEventListener('webglcontextrestored', this._onRestored, false);

    this._initRenderer();
    this._initScene();
    this._initTargets();
    this._initMaterials();
    this._initControls();
    this._bindResize();
    this.resize();

    this._raf = requestAnimationFrame((t) => this._frame(t));
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.autoClear = true;
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    this.camera.position.set(0, 6, 16);

    // Fullscreen triangle geometry in clip space
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    this.fsGeo = geo;

    this.bhScene = new THREE.Scene();
    this.blitScene = new THREE.Scene();
    this.bhCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.blitCam = this.bhCam;
  }

  _rt(w, h, opts = {}) {
    const rt = new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
      ...opts,
    });
    return rt;
  }

  _initTargets() {
    const w = 4;
    const h = 4;
    this.sceneRT = this._rt(w, h);
    this.bloomA = this._rt(w, h);
    this.bloomB = this._rt(w, h);
  }

  _initMaterials() {
    this.bhUniforms = {
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamForward: { value: new THREE.Vector3(0, 0, -1) },
      uFov: { value: 55 },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uTimeScale: { value: 1 },
      uDiskInner: { value: 2.2 },
      uDiskOuter: { value: 9.5 },
      uDiskHalfH: { value: 0.12 },
      uDiskTemp: { value: 1 },
      uDiskEmit: { value: 1.15 },
      uOrbitalSpeed: { value: 1 },
      uTurbAmp: { value: 0.55 },
      uTurbSpeed: { value: 0.8 },
      uStarDensity: { value: 1 },
      uGalaxyBright: { value: 0.85 },
      uExposure: { value: 1 },
      uMaxSteps: { value: 280 },
      uStepSize: { value: 0.04 },
      uDebug: { value: 0 },
    };

    this.bhMaterial = makeFullscreenMaterial(blackholeFrag, this.bhUniforms);
    this.bhMesh = new THREE.Mesh(this.fsGeo, this.bhMaterial);
    this.bhScene.add(this.bhMesh);

    this.extractUniforms = {
      tInput: { value: null },
      uThreshold: { value: 0.55 },
    };
    this.extractMaterial = makeFullscreenMaterial(bloomExtractFrag, this.extractUniforms);

    this.blurUniforms = {
      tInput: { value: null },
      uDirection: { value: new THREE.Vector2(1, 0) },
      uTexel: { value: new THREE.Vector2(1, 1) },
    };
    this.blurMaterial = makeFullscreenMaterial(bloomBlurFrag, this.blurUniforms);

    this.compUniforms = {
      tScene: { value: null },
      tBloom: { value: null },
      uBloomStrength: { value: 0.85 },
      uExposure: { value: 1.05 },
      uVignette: { value: 0.35 },
      uGrain: { value: 0.08 },
      uChromatic: { value: 0.0018 },
      uTime: { value: 0 },
      uDebug: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };
    this.compMaterial = makeFullscreenMaterial(compositeFrag, this.compUniforms);

    this.blitMesh = new THREE.Mesh(this.fsGeo, this.extractMaterial);
    this.blitScene.add(this.blitMesh);
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 4.5;
    this.controls.maxDistance = 55;
    this.controls.enablePan = false;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('start', () => {
      this.userOrbiting = true;
      // Manual control takes priority; cinematic resumes only if still playing flag and user stops
    });
    this.controls.addEventListener('end', () => {
      this.userOrbiting = false;
    });
  }

  _bindResize() {
    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(this.canvas.parentElement || this.canvas);
  }

  setParams(params) {
    this.params = params;
  }

  setQuality(level) {
    if (!QUALITY_BUDGET[level]) return false;
    this.quality = level;
    this.resize();
    return true;
  }

  setDebug(index) {
    const i = Number(index);
    if (!Number.isInteger(i) || i < 0 || i > 9) return false;
    this.debug = i;
    return true;
  }

  setPreset(index) {
    const i = Number(index);
    if (!Number.isInteger(i) || i < 0 || i > 3) return false;
    const p = PRESETS[i];
    const elev = p.elevation;
    const az = p.azimuth;
    const dist = p.distance;
    const x = dist * Math.cos(elev) * Math.sin(az);
    const y = dist * Math.sin(elev);
    const z = dist * Math.cos(elev) * Math.cos(az);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);
    this.camera.fov = p.fov;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    if (this.params) {
      this.params.fov = p.fov;
      this.params.camDistance = dist;
      this.params.camAzimuth = az;
      this.params.camElevation = elev;
    }
    return true;
  }

  setTime(seconds) {
    const t = Number(seconds);
    if (!Number.isFinite(t) || t < 0) return false;
    this.simTime = t;
    this.frozenTime = t;
    return true;
  }

  setCaptureMode(enabled, time = 0) {
    this.captureMode = !!enabled;
    if (this.captureMode) {
      this.cinematicPlaying = false;
      this.setTime(time);
    }
  }

  setCinematicPlaying(playing) {
    if (this.captureMode) {
      this.cinematicPlaying = false;
      return;
    }
    this.cinematicPlaying = !!playing;
  }

  applySphericalFromParams() {
    const p = this.params;
    if (!p) return;
    const dist = p.camDistance;
    const elev = p.camElevation;
    const az = p.camAzimuth;
    const x = dist * Math.cos(elev) * Math.sin(az);
    const y = dist * Math.sin(elev);
    const z = dist * Math.cos(elev) * Math.cos(az);
    this.camera.position.set(x, y, z);
    this.camera.fov = p.fov;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  syncParamsFromCamera() {
    const p = this.params;
    if (!p) return;
    const pos = this.camera.position;
    const dist = pos.length();
    p.camDistance = dist;
    p.camElevation = Math.asin(Math.min(1, Math.max(-1, pos.y / Math.max(dist, 1e-5))));
    p.camAzimuth = Math.atan2(pos.x, pos.z);
    p.fov = this.camera.fov;
  }

  resize() {
    if (this.disposed || this.contextLost) return;
    const parent = this.canvas.parentElement || this.canvas;
    const rect = parent.getBoundingClientRect();
    const budget = QUALITY_BUDGET[this.quality] || QUALITY_BUDGET.high;
    const dpr = Math.min(window.devicePixelRatio || 1, budget.dprCap);
    const cssW = Math.max(1, Math.floor(rect.width));
    const cssH = Math.max(1, Math.floor(rect.height));
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(cssW, cssH, false);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    const rw = Math.max(1, Math.floor(cssW * dpr * budget.internalScale));
    const rh = Math.max(1, Math.floor(cssH * dpr * budget.internalScale));
    this.sceneRT.setSize(rw, rh);
    const bw = Math.max(1, Math.floor(rw * budget.bloomScale));
    const bh = Math.max(1, Math.floor(rh * budget.bloomScale));
    this.bloomA.setSize(bw, bh);
    this.bloomB.setSize(bw, bh);

    this.camera.aspect = cssW / Math.max(cssH, 1);
    this.camera.updateProjectionMatrix();
    this.compUniforms.uResolution.value.set(cssW * dpr, cssH * dpr);
    this._drawW = rw;
    this._drawH = rh;
  }

  _rebuildAfterContextRestore() {
    // Recreate GPU resources after context restoration without page reload
    try {
      this.renderer.forceContextRestore?.();
    } catch {
      // ignore
    }
    this.bhMaterial.dispose();
    this.extractMaterial.dispose();
    this.blurMaterial.dispose();
    this.compMaterial.dispose();
    this.sceneRT.dispose();
    this.bloomA.dispose();
    this.bloomB.dispose();
    this._initTargets();
    this._initMaterials();
    this.bhScene.clear();
    this.bhScene.add(this.bhMesh);
    this.blitScene.clear();
    this.blitScene.add(this.blitMesh);
    this.resize();
    this.applySphericalFromParams();
  }

  _updateCinematic(dt) {
    if (!this.cinematicPlaying || this.userOrbiting || this.captureMode) return;
    this.cinematicPhase += dt * 0.08 * (this.params?.timeScale ?? 1);
    const base = this.params?.camDistance ?? 16;
    const elev = (this.params?.camElevation ?? 0.45) + Math.sin(this.cinematicPhase * 0.7) * 0.05;
    const az = (this.params?.camAzimuth ?? 0.4) + this.cinematicPhase * 0.15;
    const dist = base + Math.sin(this.cinematicPhase * 0.35) * 1.2;
    const x = dist * Math.cos(elev) * Math.sin(az);
    const y = dist * Math.sin(elev);
    const z = dist * Math.cos(elev) * Math.cos(az);
    this.camera.position.set(x, y, z);
    this.controls.target.set(0, 0, 0);
  }

  _pushUniforms() {
    const p = this.params;
    const budget = QUALITY_BUDGET[this.quality] || QUALITY_BUDGET.high;
    const u = this.bhUniforms;

    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    // Camera basis from world matrix
    const right = new THREE.Vector3(e[0], e[1], e[2]).normalize();
    const up = new THREE.Vector3(e[4], e[5], e[6]).normalize();
    const forward = new THREE.Vector3(-e[8], -e[9], -e[10]).normalize();

    u.uCamPos.value.copy(this.camera.position);
    u.uCamRight.value.copy(right);
    u.uCamUp.value.copy(up);
    u.uCamForward.value.copy(forward);
    u.uFov.value = this.camera.fov;
    u.uAspect.value = this.camera.aspect;
    u.uTime.value = this.simTime;
    u.uTimeScale.value = p.timeScale;
    u.uDiskInner.value = p.diskInner;
    u.uDiskOuter.value = p.diskOuter;
    u.uDiskHalfH.value = p.diskHalfThickness;
    u.uDiskTemp.value = p.diskTemp;
    u.uDiskEmit.value = p.diskEmissivity;
    u.uOrbitalSpeed.value = p.orbitalSpeed;
    u.uTurbAmp.value = p.turbulenceAmp;
    u.uTurbSpeed.value = p.turbulenceSpeed;
    u.uStarDensity.value = p.starDensity;
    u.uGalaxyBright.value = p.galaxyBrightness;
    u.uExposure.value = p.exposure;
    u.uMaxSteps.value = budget.maxSteps;
    u.uStepSize.value = budget.stepSize;
    u.uDebug.value = this.debug;

    this.extractUniforms.uThreshold.value = p.bloomThreshold;
    this.compUniforms.uBloomStrength.value = p.bloomStrength;
    this.compUniforms.uExposure.value = p.exposure;
    this.compUniforms.uVignette.value = p.vignette;
    this.compUniforms.uGrain.value = p.grain;
    this.compUniforms.uChromatic.value = p.chromatic;
    this.compUniforms.uTime.value = this.simTime;
    this.compUniforms.uDebug.value = this.debug;
  }

  _frame(ts) {
    if (this.disposed) return;
    this._raf = requestAnimationFrame((t) => this._frame(t));
    if (this.contextLost) return;

    const dt = Math.min(0.05, (ts - this._lastTs) / 1000);
    this._lastTs = ts;

    if (!this.captureMode) {
      this.simTime += dt * (this.params?.timeScale ?? 1);
      this._updateCinematic(dt);
      this.controls.update();
      this.syncParamsFromCamera();
    } else {
      this.simTime = this.frozenTime;
      this.controls.update();
    }

    this._pushUniforms();

    // 1) Geodesic HDR pass
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.clear();
    this.renderer.render(this.bhScene, this.bhCam);

    // 2) Bloom extract + separable blur (iterations from quality)
    const budget = QUALITY_BUDGET[this.quality] || QUALITY_BUDGET.high;
    this.blitMesh.material = this.extractMaterial;
    this.extractUniforms.tInput.value = this.sceneRT.texture;
    this.renderer.setRenderTarget(this.bloomA);
    this.renderer.clear();
    this.renderer.render(this.blitScene, this.blitCam);

    const texelA = this.blurUniforms.uTexel.value;
    texelA.set(1 / Math.max(this.bloomA.width, 1), 1 / Math.max(this.bloomA.height, 1));
    let read = this.bloomA;
    let write = this.bloomB;
    for (let i = 0; i < budget.bloomIterations; i++) {
      this.blitMesh.material = this.blurMaterial;
      this.blurUniforms.tInput.value = read.texture;
      this.blurUniforms.uDirection.value.set(1, 0);
      this.renderer.setRenderTarget(write);
      this.renderer.render(this.blitScene, this.blitCam);
      let tmp = read; read = write; write = tmp;

      this.blurUniforms.tInput.value = read.texture;
      this.blurUniforms.uDirection.value.set(0, 1);
      this.renderer.setRenderTarget(write);
      this.renderer.render(this.blitScene, this.blitCam);
      tmp = read; read = write; write = tmp;
    }

    // 3) Composite to screen
    this.blitMesh.material = this.compMaterial;
    this.compUniforms.tScene.value = this.sceneRT.texture;
    this.compUniforms.tBloom.value = read.texture;
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.blitScene, this.blitCam);

    if (!this.ready) {
      this.ready = true;
      this.onReady();
    }
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this._raf);
    this._ro?.disconnect();
    this.canvas.removeEventListener('webglcontextlost', this._onLost);
    this.canvas.removeEventListener('webglcontextrestored', this._onRestored);
    this.controls?.dispose();
    this.bhMaterial?.dispose();
    this.extractMaterial?.dispose();
    this.blurMaterial?.dispose();
    this.compMaterial?.dispose();
    this.sceneRT?.dispose();
    this.bloomA?.dispose();
    this.bloomB?.dispose();
    this.fsGeo?.dispose();
    this.renderer?.dispose();
  }
}
