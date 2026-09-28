import {
  WebGLRenderer,
  WebGLRenderTarget,
  RawShaderMaterial,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  Scene,
  OrthographicCamera,
  PerspectiveCamera,
  Matrix3,
  Vector2,
  Vector3,
  Spherical,
  MathUtils,
  HalfFloatType,
  RGBAFormat,
  LinearFilter,
  ClampToEdgeWrapping,
  GLSL3,
  NoToneMapping,
  LinearSRGBColorSpace,
} from '../vendor/three/three.module.js';
import { OrbitControls } from '../vendor/three/addons/controls/OrbitControls.js';
import { FULLSCREEN_VERT } from './shaders/common.js';
import { BLACKHOLE_FRAG } from './shaders/blackhole.js';
import { BRIGHT_FRAG, DOWN_FRAG, UP_FRAG, COMPOSITE_FRAG } from './shaders/post.js';
import { QUALITY_PROFILES, PRESETS, PARAM_BY_KEY } from './state.js';

const ESCAPE_RADIUS = 90;
const camKey = (p) => `${p.fov}|${p.distance}|${p.azimuth}|${p.elevation}`;
const roundTo = (v, digits) => +v.toFixed(digits);

function fullscreenTriangle() {
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  return geo;
}

function makeTarget(w, h) {
  return new WebGLRenderTarget(w, h, {
    type: HalfFloatType,
    format: RGBAFormat,
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

function material(fragmentShader, uniforms) {
  return new RawShaderMaterial({
    glslVersion: GLSL3,
    vertexShader: FULLSCREEN_VERT,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
}

// Cinematic loop: a slow orbit that breathes in distance and elevation.
function cinematicCamera(t) {
  return {
    azimuth: ((((t * 4.5 + 180) % 360) + 360) % 360) - 180,
    elevation: 7 + 9 * Math.sin(t * 0.11),
    distance: 24 + 6 * Math.sin(t * 0.07 + 1.3),
  };
}

export class Engine {
  constructor(canvas, store, { capture = false, time = 0, onStatus } = {}) {
    this.canvas = canvas;
    this.store = store;
    this.capture = capture;
    this.simTime = time;
    this.cineTime = 0;
    this.onStatus = onStatus || (() => {});
    this.contextLost = false;
    this.disposed = false;
    this.frame = 0;
    this.readyResolved = false;
    this.readyCallbacks = [];
    this.lastTs = null;
    this.syncingCamera = false;
    this.size = new Vector2(1, 1);

    this.camera = new PerspectiveCamera(55, 1, 0.1, 1000);
    this.camera.position.set(0, 3, 26);

    this.handleLost = this.handleLost.bind(this);
    this.handleRestored = this.handleRestored.bind(this);
    this.tick = this.tick.bind(this);
    this.handleResize = this.handleResize.bind(this);

    canvas.addEventListener('webglcontextlost', this.handleLost, false);
    canvas.addEventListener('webglcontextrestored', this.handleRestored, false);
    window.addEventListener('resize', this.handleResize);

    this.createRenderer();
    this.createControls();
    this.applyCameraFromState(store.get());
    this.unsubscribe = store.subscribe((s) => this.onState(s));
    this.raf = requestAnimationFrame(this.tick);
  }

  createRenderer() {
    this.shaderError = null;
    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    renderer.toneMapping = NoToneMapping;
    renderer.outputColorSpace = LinearSRGBColorSpace;
    renderer.autoClear = false;
    renderer.debug.onShaderError = (gl, program, vs, fs) => {
      const log = gl.getShaderInfoLog(fs) || gl.getShaderInfoLog(vs) || gl.getProgramInfoLog(program);
      this.shaderError = log || 'shader compile failed';
      console.error('[gargantua] shader error', this.shaderError);
    };
    this.renderer = renderer;
    this.quadScene = new Scene();
    this.quadCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new Mesh(fullscreenTriangle(), null);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);
    this.createResources();
  }

  // Materials and render targets; rebuilt after a context restore.
  createResources() {
    this.materials = {
      raytrace: material(BLACKHOLE_FRAG, {
        uResolution: { value: new Vector2(1, 1) },
        uCamPos: { value: new Vector3() },
        uCamBasis: { value: new Matrix3() },
        uTanHalfFov: { value: 0.5 },
        uAspect: { value: 1 },
        uTime: { value: 0 },
        uEscapeR: { value: ESCAPE_RADIUS },
        uDiskInner: { value: 6 },
        uDiskOuter: { value: 18 },
        uDiskH: { value: 0.2 },
        uDiskTemp: { value: 7800 },
        uDiskIntensity: { value: 2 },
        uOrbitalSpeed: { value: 1 },
        uTurb: { value: 0.5 },
        uTurbSpeed: { value: 1 },
        uStarDensity: { value: 1 },
        uGalaxy: { value: 1 },
        uMaxSteps: { value: 300 },
        uMaxCrossings: { value: 3 },
        uStepScale: { value: 1 },
        uDebug: { value: 0 },
      }),
      bright: material(BRIGHT_FRAG, {
        uSrc: { value: null },
        uTexel: { value: new Vector2() },
        uThreshold: { value: 1 },
        uExposure: { value: 1 },
      }),
      down: material(DOWN_FRAG, { uSrc: { value: null }, uTexel: { value: new Vector2() } }),
      up: material(UP_FRAG, {
        uSrc: { value: null },
        uBase: { value: null },
        uTexel: { value: new Vector2() },
        uRadius: { value: 1 },
      }),
      composite: material(COMPOSITE_FRAG, {
        uScene: { value: null },
        uBloom: { value: null },
        uExposure: { value: 1 },
        uBloomStrength: { value: 1 },
        uVignette: { value: 0.3 },
        uGrain: { value: 0.05 },
        uChromatic: { value: 0.3 },
        uCaTaps: { value: 3 },
        uTime: { value: 0 },
        uResolution: { value: new Vector2(1, 1) },
        uDebug: { value: 0 },
      }),
    };
    this.targets = null;
    this.targetKey = '';
    this.resize();
  }

  disposeResources() {
    if (this.targets) {
      this.targets.scene.dispose();
      for (const t of this.targets.mips) t.dispose();
      for (const t of this.targets.ups) t.dispose();
    }
    if (this.materials) for (const m of Object.values(this.materials)) m.dispose();
    this.targets = null;
  }

  profile() {
    return QUALITY_PROFILES[this.store.get().quality];
  }

  resize() {
    const p = this.profile();
    const dpr = Math.min(window.devicePixelRatio || 1, p.dprCap);
    const w = Math.max(1, window.innerWidth);
    const h = Math.max(1, window.innerHeight);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, true);
    const bw = Math.max(1, Math.round(w * dpr));
    const bh = Math.max(1, Math.round(h * dpr));
    this.size.set(bw, bh);
    const sw = Math.max(2, Math.round(bw * p.renderScale));
    const sh = Math.max(2, Math.round(bh * p.renderScale));
    const key = `${sw}x${sh}:${p.bloomLevels}`;
    if (key === this.targetKey && this.targets) return;
    if (this.targets) {
      this.targets.scene.dispose();
      for (const t of this.targets.mips) t.dispose();
      for (const t of this.targets.ups) t.dispose();
    }
    const mips = [];
    const ups = [];
    let mw = sw;
    let mh = sh;
    for (let i = 0; i < p.bloomLevels; i++) {
      mw = Math.max(1, Math.floor(mw / 2));
      mh = Math.max(1, Math.floor(mh / 2));
      mips.push(makeTarget(mw, mh));
      ups.push(makeTarget(mw, mh));
    }
    this.targets = { scene: makeTarget(sw, sh), mips, ups };
    this.targetKey = key;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.onStatus({ renderSize: [sw, sh], drawSize: [bw, bh], dpr });
  }

  handleResize() {
    if (this.contextLost || this.disposed) return;
    this.resize();
  }

  createControls() {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = PARAM_BY_KEY.distance.min;
    controls.maxDistance = PARAM_BY_KEY.distance.max;
    controls.minPolarAngle = MathUtils.degToRad(90 - PARAM_BY_KEY.elevation.max);
    controls.maxPolarAngle = MathUtils.degToRad(90 - PARAM_BY_KEY.elevation.min);
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.8;
    controls.target.set(0, 0, 0);
    // Manual input takes over from the cinematic loop immediately.
    controls.addEventListener('start', () => {
      if (this.store.get().cinematic) this.store.set({ cinematic: false });
      this.userInteracting = true;
    });
    controls.addEventListener('end', () => {
      this.userInteracting = false;
    });
    controls.addEventListener('change', () => {
      if (!this.syncingCamera) this.pushCameraToState();
    });
    this.controls = controls;
  }

  // Spherical camera params (degrees, elevation above the disk plane)
  // → OrbitControls camera.
  applyCamera({ distance, azimuth, elevation, fov }) {
    const sph = new Spherical(distance, MathUtils.degToRad(90 - elevation), MathUtils.degToRad(azimuth));
    this.syncingCamera = true;
    this.camera.position.setFromSpherical(sph);
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.controls.target);
    this.controls.update();
    this.syncingCamera = false;
    this.cameraKey = camKey({ distance, azimuth, elevation, fov });
  }

  applyCameraFromState(s) {
    this.applyCamera(s.params);
  }

  pushCameraToState() {
    const sph = new Spherical().setFromVector3(this.camera.position);
    const patch = {
      distance: roundTo(sph.radius, 2),
      azimuth: roundTo(MathUtils.radToDeg(sph.theta), 1),
      elevation: roundTo(90 - MathUtils.radToDeg(sph.phi), 1),
    };
    this.cameraKey = camKey({ ...patch, fov: this.camera.fov });
    this.store.setParams(patch);
  }

  onState(s) {
    if (this.disposed) return;
    if (camKey(s.params) !== this.cameraKey && !this.userInteracting) this.applyCamera(s.params);
    if (s.quality !== this.lastQuality) {
      this.lastQuality = s.quality;
      if (!this.contextLost) this.resize();
    }
  }

  setTime(t) {
    this.simTime = t;
  }

  whenReady(cb) {
    if (this.readyResolved) cb();
    else this.readyCallbacks.push(cb);
  }

  handleLost(event) {
    event.preventDefault();
    this.contextLost = true;
    cancelAnimationFrame(this.raf);
    this.onStatus({ contextLost: true });
  }

  handleRestored() {
    // Three.js re-initialises its GL state on restore; our programs and
    // render targets are recreated explicitly from the persisted state.
    this.disposeResources();
    this.createResources();
    this.applyCameraFromState(this.store.get());
    this.contextLost = false;
    this.lastTs = null;
    this.onStatus({ contextLost: false, restoredAt: performance.now() });
    this.raf = requestAnimationFrame(this.tick);
  }

  tick(ts) {
    if (this.disposed || this.contextLost) return;
    this.raf = requestAnimationFrame(this.tick);
    const s = this.store.get();
    const dt = this.lastTs === null ? 0 : Math.min(0.1, (ts - this.lastTs) / 1000);
    this.lastTs = ts;
    if (!this.capture) {
      this.simTime += dt * s.params.timeScale;
      if (s.cinematic && !this.userInteracting) {
        if (!this.cineStart) this.beginCinematic(s.params);
        this.cineTime += dt;
        const pose = this.cinematicPose();
        const cam = {
          distance: roundTo(pose.distance, 2),
          azimuth: roundTo(pose.azimuth, 1),
          elevation: roundTo(pose.elevation, 1),
        };
        this.applyCamera({ ...s.params, ...cam });
        this.store.setParams(cam);
      } else {
        this.cineStart = null;
      }
    }
    this.controls.update();
    this.render(s);
    this.frame++;
    if (!this.readyResolved && this.frame >= 2) {
      this.readyResolved = true;
      for (const cb of this.readyCallbacks.splice(0)) cb(this.shaderError);
    }
  }

  pass(mat, target) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  render(s) {
    const p = QUALITY_PROFILES[s.quality];
    const P = s.params;
    const { scene, mips, ups } = this.targets;
    const exposure = Math.pow(2, P.exposure);

    this.camera.updateMatrixWorld();
    const rt = this.materials.raytrace.uniforms;
    rt.uResolution.value.set(scene.width, scene.height);
    rt.uCamPos.value.copy(this.camera.position);
    rt.uCamBasis.value.setFromMatrix4(this.camera.matrixWorld);
    rt.uTanHalfFov.value = Math.tan(MathUtils.degToRad(this.camera.fov) / 2);
    rt.uAspect.value = this.camera.aspect;
    rt.uTime.value = this.simTime;
    rt.uDiskInner.value = P.diskInner;
    rt.uDiskOuter.value = Math.max(P.diskOuter, P.diskInner + 0.5);
    rt.uDiskH.value = P.diskHalfThickness;
    rt.uDiskTemp.value = P.diskTemperature;
    rt.uDiskIntensity.value = P.diskIntensity;
    rt.uOrbitalSpeed.value = P.orbitalSpeed;
    rt.uTurb.value = P.turbulence;
    rt.uTurbSpeed.value = P.turbulenceSpeed;
    rt.uStarDensity.value = P.starDensity;
    rt.uGalaxy.value = P.galaxyBrightness;
    rt.uMaxSteps.value = p.maxSteps;
    rt.uMaxCrossings.value = p.maxCrossings;
    rt.uStepScale.value = p.stepScale;
    rt.uDebug.value = s.debug;
    this.pass(this.materials.raytrace, scene);

    const bloomOn = s.debug === 0;
    if (bloomOn) {
      const br = this.materials.bright.uniforms;
      br.uSrc.value = scene.texture;
      br.uTexel.value.set(1 / scene.width, 1 / scene.height);
      br.uThreshold.value = P.bloomThreshold;
      br.uExposure.value = exposure;
      this.pass(this.materials.bright, mips[0]);
      const dn = this.materials.down.uniforms;
      for (let i = 1; i < mips.length; i++) {
        dn.uSrc.value = mips[i - 1].texture;
        dn.uTexel.value.set(1 / mips[i - 1].width, 1 / mips[i - 1].height);
        this.pass(this.materials.down, mips[i]);
      }
      const up = this.materials.up.uniforms;
      let src = mips[mips.length - 1];
      for (let i = mips.length - 2; i >= 0; i--) {
        up.uSrc.value = src.texture;
        up.uBase.value = mips[i].texture;
        up.uTexel.value.set(1 / src.width, 1 / src.height);
        up.uRadius.value = 1;
        this.pass(this.materials.up, ups[i]);
        src = ups[i];
      }
      this.bloomTexture = src.texture;
    }

    const c = this.materials.composite.uniforms;
    c.uScene.value = scene.texture;
    c.uBloom.value = bloomOn ? this.bloomTexture : scene.texture;
    c.uExposure.value = exposure;
    c.uBloomStrength.value = bloomOn ? P.bloomStrength / p.bloomLevels * 2.5 : 0;
    c.uVignette.value = P.vignette;
    c.uGrain.value = P.grain;
    c.uChromatic.value = P.chromatic;
    c.uCaTaps.value = p.caTaps;
    c.uTime.value = this.capture ? this.simTime : performance.now() / 1000;
    c.uResolution.value.copy(this.size);
    c.uDebug.value = s.debug;
    this.pass(this.materials.composite, null);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.unsubscribe();
    this.canvas.removeEventListener('webglcontextlost', this.handleLost);
    this.canvas.removeEventListener('webglcontextrestored', this.handleRestored);
    window.removeEventListener('resize', this.handleResize);
    this.controls.dispose();
    this.disposeResources();
    this.quad.geometry.dispose();
    this.renderer.dispose();
  }

  // The loop resumes from the current azimuth and eases distance/elevation
  // from the current pose, so play/pause never jumps.
  beginCinematic(params) {
    this.cineStart = { distance: params.distance, elevation: params.elevation };
    this.cineTime = 0;
    this.cinePhase = params.azimuth / 4.5;
  }

  cinematicPose() {
    const target = cinematicCamera(this.cineTime + this.cinePhase);
    const blend = MathUtils.smootherstep(this.cineTime, 0, 6);
    return {
      azimuth: target.azimuth,
      distance: MathUtils.lerp(this.cineStart.distance, target.distance, blend),
      elevation: MathUtils.lerp(this.cineStart.elevation, target.elevation, blend),
    };
  }
}
