// Renderer: WebGL renderer + HDR composer chain (raytracer fullscreen shader
// pass → UnrealBloomPass → finish pass), OrbitControls feeding the camera,
// cinematic camera loop, quality budgets, context loss/restore handling, and
// the URL capture contract surface.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RAYTRACER_FRAG } from './shaders/raytracer.frag.js';
import { FINISH_FRAG } from './shaders/finish.frag.js';
import { QUALITY_BUDGET, PARAMS } from './store.js';

const FULLSCREEN_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

function sphericalToPosition(azimuthDeg, elevationDeg, distance) {
  const az = (azimuthDeg * Math.PI) / 180;
  const el = (elevationDeg * Math.PI) / 180;
  const ce = Math.cos(el);
  return new THREE.Vector3(
    distance * ce * Math.cos(az),
    distance * Math.sin(el),
    distance * ce * Math.sin(az),
  );
}

// Cinematic camera loop: smooth periodic drift, purely a function of the
// cinematic clock so capture mode is deterministic.
function cinematicPose(t) {
  const azimuth = 35 + (t * 360) / 96;
  const elevation = 20 + 13 * Math.sin((t * 2 * Math.PI) / 53);
  const distance = 12.0 + 1.9 * Math.sin((t * 2 * Math.PI) / 71 + 1.2);
  return { azimuth, elevation, distance };
}

export class GargantuaRenderer {
  constructor(canvas, store, capture) {
    this.canvas = canvas;
    this.store = store;
    this.capture = capture;
    this.simTime = capture.capture ? capture.time : 0;
    this.cineClock = 0;
    this.contextLost = false;
    this.rafId = 0;
    this.lastFrameT = 0;
    this.disposed = false;
    this.readyFired = false;
    this.frameCount = 0;

    this._buildRenderer();
    this._buildScene();
    this._buildControls();
    this._applyAllUniforms();
    this._resize();

    this.onResize = () => this._resize();
    window.addEventListener('resize', this.onResize);

    this.onContextLost = (e) => {
      e.preventDefault(); // allow restore
      this.contextLost = true;
      this._notifyOverlay();
    };
    this.onContextRestored = () => {
      // Rebuild every GPU resource from scratch: renderer, composer targets,
      // materials. State (persisted + in-store) survives untouched.
      try {
        this._teardownGpu();
        this._buildRenderer();
        this._buildScene();
        this._buildControls();
        this._applyAllUniforms();
        this._resize();
        this.contextLost = false;
        this._notifyOverlay();
        this.renderFrame(0);
      } catch (err) {
        console.error('[gargantua] context restore failed', err);
      }
    };
    canvas.addEventListener('webglcontextlost', this.onContextLost);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored);

    this.unsub = store.subscribe((state, what) => {
      this._applyAllUniforms();
      this.captureDirty = true; // state changed: capture mode must re-render once
      // preset/reset change the camera pose through the store: reposition the
      // camera before the readback logic can overwrite the new values
      if (what === 'preset' || what === 'reset' || what === 'capture-init') {
        const p = state.params;
        this.camera.position.copy(sphericalToPosition(p.azimuth, p.elevation, p.distance));
        this.camera.lookAt(0, 0, 0);
        this.controls?.update();
      }
    });

    // capture mode renders exactly one frozen frame chain; interactive mode loops
    if (capture.capture) {
      this.renderFrame(0);
      this.renderFrame(0); // warm all passes so the first complete frame is stable
    }
    this._loop = this._loop.bind(this);
    this.rafId = requestAnimationFrame(this._loop);
  }

  // ------------------------------------------------------------- GPU setup
  _buildRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    this.renderer.autoClear = true;
    this.renderer.toneMapping = THREE.NoToneMapping; // tone mapping lives in the finish pass
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // finish pass encodes sRGB itself
  }

  _buildScene() {
    const budget = QUALITY_BUDGET[this.store.get().quality] ?? QUALITY_BUDGET.high;

    this.scene = new THREE.Scene();
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));

    this.rayUniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uFov: { value: 0.8 },
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamFwd: { value: new THREE.Vector3(0, 0, -1) },
      uTime: { value: 0 },
      uTurbSpeed: { value: 1 },
      uDiskInner: { value: 2.3 },
      uDiskOuter: { value: 11 },
      uDiskHalfThick: { value: 0.15 },
      uDiskTemp: { value: 1 },
      uDiskEmission: { value: 1.6 },
      uOrbitSpeed: { value: 1 },
      uTurbAmp: { value: 0.55 },
      uStarDensity: { value: 0.7 },
      uGalaxyBright: { value: 0.85 },
      uMaxSteps: { value: budget.maxSteps },
      uMaxCross: { value: budget.maxCross },
      uDebugView: { value: 0 },
    };

    this.rayMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: RAYTRACER_FRAG,
      uniforms: this.rayUniforms,
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(geo, this.rayMaterial);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);

    // HDR composer chain
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      colorSpace: THREE.LinearSRGBColorSpace,
    });
    this.composer = new EffectComposer(this.renderer, rt);
    this.renderPass = new RenderPass(this.scene, this.quadCamera);
    this.composer.addPass(this.renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(Math.max(1, size.x / budget.bloomDiv), Math.max(1, size.y / budget.bloomDiv)),
      0.55, 0.65, 0.55,
    );
    this.composer.addPass(this.bloomPass);

    this.finishUniforms = {
      tDiffuse: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uExposure: { value: 0 },
      uChroma: { value: 0.25 },
      uVignette: { value: 0.32 },
      uGrain: { value: 0.35 },
      uTime: { value: 0 },
    };
    this.finishPass = new ShaderPass({
      uniforms: this.finishUniforms,
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: FINISH_FRAG,
    });
    this.composer.addPass(this.finishPass);
  }

  _buildControls() {
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    const p = this.store.get().params;
    this.camera.position.copy(sphericalToPosition(p.azimuth, p.elevation, p.distance));
    this.camera.lookAt(0, 0, 0);

    if (this.controls) {
      this.controls.dispose();
    }
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = false; // state is read back every frame; damping would fight it
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.8;
    this.controls.minDistance = PARAMS.distance[1];
    this.controls.maxDistance = PARAMS.distance[2];
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Any user interaction with the scene ends the cinematic loop; the user
    // never loses control afterward (cinematic can only be re-enabled explicitly).
    this.controls.addEventListener('start', () => {
      if (this.store.get().cinematic) {
        this.store.set({ cinematic: false }, 'user-override');
      }
    });
  }

  _teardownGpu() {
    try {
      this.composer?.dispose();
      this.rayMaterial?.dispose();
      this.quad?.geometry?.dispose();
      this.renderer?.dispose();
    } catch { /* already dead context */ }
  }

  // ------------------------------------------------------------- uniforms
  _applyAllUniforms() {
    const s = this.store.get();
    const p = s.params;
    const u = this.rayUniforms;
    const budget = QUALITY_BUDGET[s.quality] ?? QUALITY_BUDGET.high;

    u.uFov.value = (p.fov * Math.PI) / 180;
    u.uTurbSpeed.value = p.turbSpeed;
    u.uDiskInner.value = p.diskInner;
    u.uDiskOuter.value = p.diskOuter;
    u.uDiskHalfThick.value = p.diskHalfThick;
    u.uDiskTemp.value = p.diskTemp;
    u.uDiskEmission.value = p.diskEmission;
    u.uOrbitSpeed.value = p.orbitSpeed;
    u.uTurbAmp.value = p.turbAmp;
    u.uStarDensity.value = p.starDensity;
    u.uGalaxyBright.value = p.galaxyBright;
    u.uMaxSteps.value = budget.maxSteps;
    u.uMaxCross.value = budget.maxCross;
    u.uDebugView.value = s.debug;

    // diagnostic views encode data in hue; bloom would wash out the encoding
    this.bloomPass.strength = p.bloomStrength * (s.debug === 0 ? 1.0 : 0.15);
    this.bloomPass.threshold = p.bloomThreshold;
    this.bloomPass.radius = s.quality === 'cinematic' ? 0.8 : 0.55;

    this.finishUniforms.uExposure.value = p.exposure;
    this.finishUniforms.uChroma.value = p.chroma;
    this.finishUniforms.uVignette.value = p.vignette;
    this.finishUniforms.uGrain.value = p.grain;

    if (this.budgetScale !== budget.scale) {
      this.budgetScale = budget.scale;
      this._resize();
    }
    this._updateCameraUniforms();
  }

  _updateCameraUniforms() {
    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    this.rayUniforms.uCamPos.value.copy(this.camera.position);
    this.rayUniforms.uCamRight.value.set(e[0], e[1], e[2]).normalize();
    this.rayUniforms.uCamUp.value.set(e[4], e[5], e[6]).normalize();
    this.rayUniforms.uCamFwd.value.set(-e[8], -e[9], -e[10]).normalize();
  }

  // ------------------------------------------------------------- sizing
  _resize() {
    this.captureDirty = true;
    if (!this.renderer) return;
    const w = Math.max(1, this.canvas.clientWidth || window.innerWidth);
    const h = Math.max(1, this.canvas.clientHeight || window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scale = (this.budgetScale ?? 1) * dpr;
    this.renderer.setPixelRatio(1); // we drive the buffer size manually through scale
    this.renderer.setSize(Math.round(w * scale), Math.round(h * scale), false);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.rayUniforms.uResolution.value.set(size.x, size.y);
    this.finishUniforms.uResolution.value.set(size.x, size.y);
    if (this.composer) this.composer.setSize(size.x, size.y);
  }

  // ------------------------------------------------------------- frame loop
  _readBackControls() {
    // Write the interactive camera state back into the store so sliders, HUD,
    // persistence and capture all describe the same truth.
    const pos = this.camera.position;
    const dist = pos.length();
    const el = (Math.asin(Math.min(1, Math.max(-1, pos.y / Math.max(dist, 1e-6)))) * 180) / Math.PI;
    let az = (Math.atan2(pos.z, pos.x) * 180) / Math.PI;
    if (az > 180) az -= 360;
    if (az < -180) az += 360;
    const s = this.store.get();
    const p = s.params;
    const near = (a, b) => Math.abs(a - b) < 0.02;
    if (!near(p.azimuth, az) || !near(p.elevation, el) || !near(p.distance, dist)) {
      this.store.set(
        { params: { ...p, azimuth: az, elevation: el, distance: dist } },
        'camera',
      );
    }
  }

  renderFrame(dt) {
    const s = this.store.get();
    const p = s.params;

    if (!this.capture.capture) {
      this.simTime += dt * p.timeScale;
      this.cineClock += dt;
    }

    // cinematic loop: camera pose purely from the clock (deterministic)
    if (s.cinematic && !this.capture.capture) {
      const pose = cinematicPose(this.cineClock);
      this.camera.position.copy(sphericalToPosition(pose.azimuth, pose.elevation, pose.distance));
      this.camera.lookAt(0, 0, 0);
      this.controls.update();
    } else {
      this.controls.update();
      this._readBackControls();
    }
    this.camera.fov = p.fov;
    this.camera.updateProjectionMatrix();
    this._updateCameraUniforms();

    this.rayUniforms.uTime.value = this.simTime;
    this.finishUniforms.uTime.value = this.capture.capture ? this.capture.time : performance.now() / 1000;

    this.composer.render();
    this.frameCount++;

    if (!this.readyFired && this.frameCount >= 2) {
      this.readyFired = true;
      document.documentElement.dataset.gargantuaReady = 'true';
    }
  }

  _loop(tms) {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(this._loop);
    if (this.contextLost) return;
    const t = tms / 1000;
    const dt = this.lastFrameT ? Math.min(t - this.lastFrameT, 0.1) : 0.016;
    this.lastFrameT = t;
    // capture mode: simulation time is frozen, so the frame only changes when
    // state (uniforms/quality/debug/resize) changes. Rendering identical frames
    // continuously would waste the GPU for nothing.
    if (this.capture.capture && this.readyFired && !this.captureDirty) return;
    this.captureDirty = false;
    this.renderFrame(dt);
  }

  _notifyOverlay() {
    // the React HUD reads this through a custom event
    window.dispatchEvent(new CustomEvent('gargantua-context', { detail: { lost: this.contextLost } }));
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.unsub?.();
    this.controls?.dispose();
    this._teardownGpu();
  }
}
