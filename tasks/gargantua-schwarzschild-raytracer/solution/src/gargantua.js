import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShader from './shaders/fullscreen.vert.glsl?raw';
import blackholeFragment from './shaders/blackhole.frag.glsl?raw';
import postFragment from './shaders/post.frag.glsl?raw';
import { QUALITY } from './config.js';

function makeTarget(w, h) {
  return new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

/**
 * Owns the WebGL renderer, the OrbitControls camera, the HDR render targets
 * and the animation loop. The camera is used only to feed observation-ray
 * uniforms to the full-screen fragment shader; no 3D geometry is projected.
 */
export class GargantuaEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.cb = callbacks;
    this.state = null;
    this.simTime = 0;
    this.savedSimTime = 0;
    this.capture = false;
    this.frozenTime = 0;
    this.ready = false;
    this.running = false;
    this.contextLost = false;
    this.userControlled = false;
    this.playing = true;
    this.suppressCamera = false;
    this.lastFrame = 0;
    this.lastEmit = 0;
    this.raf = 0;
    this.cssW = 1;
    this.cssH = 1;
    this.dpr = 1;
    this.sceneTexel = [1, 1];
    this.bloomTexel = [1, 1];

    this._onLost = (e) => {
      e.preventDefault();                       // required for restoration
      this.contextLost = true;
      this.savedSimTime = this.simTime;
      this.stop();
      this.cb.onLost?.();
    };
    this._onRestored = () => this.rebuild();
    canvas.addEventListener('webglcontextlost', this._onLost, false);
    canvas.addEventListener('webglcontextrestored', this._onRestored, false);

    this.createRenderer();
    this.createGpuObjects();
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.autoClear = false;
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.debug.checkShaderErrors = true;

    // Interactive camera. Its position, orientation and FOV are uploaded to
    // the shader every frame; drag / wheel / touch really change the lens view.
    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 1000);
    this.camera.position.set(0, 3, 13);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 60;
    this.controls.rotateSpeed = 0.6;
    this.controls.zoomSpeed = 0.8;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('start', () => {
      this.userControlled = true;   // manual control is never taken back
      this.playing = false;
      this.cb.onPlayingChange?.(false);
    });
    this.controls.addEventListener('change', () => this.emitCamera());
    this.controls.addEventListener('end', () => {
      this.lastEmit = 0;
      this.emitCamera();
    });

    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  createGpuObjects() {
    // One shared uniform dictionary for both materials; unused entries are
    // ignored by the GLSL compiler, so updating a value updates both passes.
    this.uniforms = {
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamForward: { value: new THREE.Vector3(0, 0, -1) },
      uTanHalfFov: { value: 0.55 },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uMaxSteps: { value: 320 },
      uStepScale: { value: 0.12 },
      uDiskInner: { value: 2.4 },
      uDiskOuter: { value: 11 },
      uDiskThickness: { value: 0.35 },
      uDiskTemp: { value: 1.15 },
      uDiskIntensity: { value: 1.5 },
      uOrbitalSpeed: { value: 1 },
      uTurbAmp: { value: 0.65 },
      uTurbSpeed: { value: 0.35 },
      uStarDensity: { value: 1 },
      uGalaxyBrightness: { value: 1 },
      uDebug: { value: 0 },
      uScene: { value: null },
      uBloom: { value: null },
      uMode: { value: 0 },
      uTexel: { value: new THREE.Vector2(1, 1) },
      uBlurDir: { value: new THREE.Vector2(1, 0) },
      uBloomThreshold: { value: 0.9 },
      uBloomStrength: { value: 0.85 },
      uExposure: { value: 1 },
      uVignette: { value: 0.55 },
      uGrain: { value: 0.035 },
      uChromatic: { value: 0.6 },
    };

    this.sceneMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: blackholeFragment,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });
    this.postMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: postFragment,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.sceneMaterial);
    this.quad.frustumCulled = false;
    this.scene = new THREE.Scene();
    this.scene.add(this.quad);

    this.rtScene = makeTarget(2, 2);   // HDR linear radiance
    this.rtA = makeTarget(2, 2);       // bloom ping-pong (half res)
    this.rtB = makeTarget(2, 2);
  }

  disposeGpuObjects() {
    this.rtScene?.dispose();
    this.rtA?.dispose();
    this.rtB?.dispose();
    this.sceneMaterial?.dispose();
    this.postMaterial?.dispose();
    this.quad?.geometry.dispose();
  }

  setSize(cssW, cssH, dpr, renderScale) {
    this.cssW = Math.max(1, cssW);
    this.cssH = Math.max(1, cssH);
    this.dpr = dpr;
    const w = Math.max(2, Math.round(this.cssW * dpr * renderScale));
    const h = Math.max(2, Math.round(this.cssH * dpr * renderScale));
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.cssW, this.cssH, false);
    this.rtScene.setSize(w, h);
    const bw = Math.max(1, Math.round(w * 0.5));
    const bh = Math.max(1, Math.round(h * 0.5));
    this.rtA.setSize(bw, bh);
    this.rtB.setSize(bw, bh);
    this.uniforms.uAspect.value = w / h;
    this.sceneTexel = [1 / w, 1 / h];
    this.bloomTexel = [1 / bw, 1 / bh];
  }

  setSizeFromWindow() {
    const q = QUALITY[this.state?.quality] || QUALITY.high;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    const mobile = cssW < 700;
    // Retina handling plus a real quality downgrade on small / high-DPR screens.
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    const scale = mobile ? Math.min(q.renderScale, 0.8) : q.renderScale;
    this.setSize(cssW, cssH, dpr, scale);
  }

  /** Push the full application state into the renderer. */
  apply(state, opts = {}) {
    this.state = state;
    const q = QUALITY[state.quality] || QUALITY.high;
    const u = this.uniforms;
    u.uMaxSteps.value = q.maxSteps;      // quality = real integration budget
    u.uStepScale.value = q.stepScale;
    u.uDebug.value = state.debug;
    u.uDiskInner.value = state.diskInner;
    u.uDiskOuter.value = state.diskOuter;
    u.uDiskThickness.value = state.diskThickness;
    u.uDiskTemp.value = state.diskTemp;
    u.uDiskIntensity.value = state.diskIntensity;
    u.uOrbitalSpeed.value = state.orbitalSpeed;
    u.uTurbAmp.value = state.turbulenceAmp;
    u.uTurbSpeed.value = state.turbulenceSpeed;
    u.uStarDensity.value = state.starDensity;
    u.uGalaxyBrightness.value = state.galaxyBrightness;
    u.uBloomThreshold.value = state.bloomThreshold;
    u.uBloomStrength.value = state.bloomStrength;
    u.uExposure.value = state.exposure;
    u.uVignette.value = state.vignette;
    u.uGrain.value = state.grain;
    u.uChromatic.value = state.chromatic;

    this.camera.fov = state.fov;
    this.camera.aspect = this.cssW / this.cssH;
    this.camera.updateProjectionMatrix();

    if (opts.camera) {
      this.userControlled = false;
      this.setCameraSpherical(state.cameraDistance, state.cameraAzimuth, state.cameraElevation);
    }
    this.playing = state.playing && !this.userControlled;
    this.setSizeFromWindow();
  }

  setCameraSpherical(distance, azimuth, elevation) {
    const cp = Math.cos(elevation);
    this.suppressCamera = true;
    this.camera.position.set(
      distance * cp * Math.cos(azimuth),
      distance * Math.sin(elevation),
      distance * cp * Math.sin(azimuth),
    );
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.suppressCamera = false;
  }

  emitCamera() {
    if (this.suppressCamera || !this.cb.onCameraChange) return;
    // Throttle: damping emits 'change' every frame during a drag.
    const now = performance.now();
    if (now - this.lastEmit < 60) return;
    this.lastEmit = now;
    const p = this.camera.position;
    const d = p.length();
    if (d < 1e-4) return;
    this.cb.onCameraChange({
      cameraDistance: Math.min(40, Math.max(4, d)),
      cameraAzimuth: Math.atan2(p.z, p.x),
      cameraElevation: Math.asin(Math.min(1, Math.max(-1, p.y / d))),
    });
  }

  resumeCinematic() {
    this.userControlled = false;
    this.playing = true;
  }

  setCapture(capture, time) {
    this.capture = capture;
    this.frozenTime = time;
    this.simTime = time;
    if (capture) this.playing = false;
  }

  setTime(seconds) {
    this.simTime = seconds;
    if (this.capture) this.frozenTime = seconds;
  }

  getTime() { return this.simTime; }

  updateCinematicCamera() {
    const t = this.simTime * 0.12;
    const az = 0.35 + Math.sin(t * 0.5) * 0.9;
    const el = 0.28 + Math.sin(t * 0.31) * 0.22;
    this.setCameraSpherical(this.state.cameraDistance, az, el);
  }

  draw(target, material, mode) {
    this.uniforms.uMode.value = mode;
    this.quad.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.clear();
    this.renderer.render(this.scene, this.orthoCamera);
  }

  renderFrame() {
    const u = this.uniforms;

    // Decompose the real camera into world-space ray bases (position, right,
    // up, forward + FOV). Every pixel's observation ray is built in the shader.
    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    u.uCamPos.value.copy(this.camera.position);
    u.uCamRight.value.set(e[0], e[1], e[2]).normalize();
    u.uCamUp.value.set(e[4], e[5], e[6]).normalize();
    u.uCamForward.value.set(-e[8], -e[9], -e[10]).normalize();
    u.uTanHalfFov.value = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) * 0.5);
    u.uTime.value = this.simTime;

    // 1) Physical, per-pixel geodesic radiance -> HDR float target.
    this.draw(this.rtScene, this.sceneMaterial, 0);

    let bloomTex = this.rtScene.texture;
    if (this.state.debug === 0) {
      // uBloom is an ACTIVE sampler in the composite shader, so the driver
      // binds it on every post pass too. Point it away from the ping-pong
      // targets while they are being rendered into, or WebGL reports a
      // framebuffer/texture feedback loop and the passes are invalid.
      u.uBloom.value = this.rtScene.texture;
      // 2) HDR bright-pass prefilter with 4-tap downsample.
      u.uScene.value = this.rtScene.texture;
      u.uTexel.value.set(this.sceneTexel[0], this.sceneTexel[1]);
      this.draw(this.rtA, this.postMaterial, 0);

      // 3) Separable Gaussian blur; pass count is a quality budget.
      const passes = (QUALITY[this.state.quality] || QUALITY.high).bloomPasses;
      u.uTexel.value.set(this.bloomTexel[0], this.bloomTexel[1]);
      let src = this.rtA;
      let dst = this.rtB;
      for (let i = 0; i < passes; i++) {
        const radius = 1 + i * 0.9;
        u.uScene.value = src.texture;
        u.uBlurDir.value.set(radius, 0);
        this.draw(dst, this.postMaterial, 1);
        [src, dst] = [dst, src];
        u.uScene.value = src.texture;
        u.uBlurDir.value.set(0, radius);
        this.draw(dst, this.postMaterial, 1);
        [src, dst] = [dst, src];
      }
      bloomTex = src.texture;
    }

    // 4) Composite (Bloom / ACES / vignette / grain / CA), or a diagnostic
    //    passthrough that bypasses post-processing but keeps the same shader.
    u.uScene.value = this.rtScene.texture;
    u.uBloom.value = bloomTex;
    this.draw(null, this.postMaterial, 2);
  }

  tick(now) {
    if (!this.running || this.contextLost) return;
    const dt = this.lastFrame ? Math.min((now - this.lastFrame) / 1000, 0.05) : 0;
    this.lastFrame = now;
    if (!this.capture) {
      this.simTime += dt * (this.state?.timeScale ?? 1);
      if (this.playing && this.state?.playing) this.updateCinematicCamera();
    }
    this.controls.update();
    this.renderFrame();
    if (!this.ready) {
      this.ready = true;
      this.cb.onReady?.();
    }
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrame = 0;
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /** WebGL context restoration: rebuild GPU resources, restore state, resume. */
  rebuild() {
    // A lost context already destroyed every GPU object. Calling dispose() on
    // the stale handles against the restored context emits INVALID_OPERATION
    // warnings, so simply drop them by overwriting the references and create
    // fresh render targets, materials and geometry (Three.js itself has
    // already re-initialised its internal GL state on 'webglcontextrestored').
    this.createGpuObjects();
    this.contextLost = false;
    this.simTime = this.savedSimTime;
    this.ready = false;
    this.lastFrame = 0;
    if (this.state) this.apply(this.state, { camera: true });
    this.playing = this.capture ? false : (this.state?.playing && !this.userControlled);
    this.start();
    this.cb.onRestored?.();
  }

  dispose() {
    this.stop();
    this.controls?.dispose();
    this.disposeGpuObjects();
    this.renderer?.dispose();
    this.canvas.removeEventListener('webglcontextlost', this._onLost);
    this.canvas.removeEventListener('webglcontextrestored', this._onRestored);
  }
}
