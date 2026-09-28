// GARGANTUA rendering engine: owns the WebGL renderer, the full-screen
// geodesic shader, the post-processing chain, OrbitControls, the animation
// loop, quality budgets, URL-capture freezing and WebGL context recovery.
//
// Per-frame discipline: no allocations inside the loop — every uniform and
// scratch object is created once and mutated in place.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { QUALITY_BUDGETS, type Params, type Quality } from "../state/defaults";
import { store } from "../state/store";
import { RAYTRACE_FRAG, RAYTRACE_VERT } from "./shaders/raytrace";
import { BLUR_FRAG, BRIGHT_FRAG, COMPOSITE_FRAG, MAX_BLOOM_LEVELS, POST_VERT } from "./shaders/post";

export type EngineStatus = "ok" | "context-lost" | "webgl-unsupported";

export interface EngineCallbacks {
  onStatus: (status: EngineStatus, fps: number) => void;
  onFirstFrame: () => void;
}

const DEG = Math.PI / 180;
const CAM_SYNC_EPS = 0.02; // units / degrees considered "unchanged"

function angleDelta(a: number, b: number): number {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

export class Engine {
  private canvas: HTMLCanvasElement;
  private cb: EngineCallbacks;

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private quadScene!: THREE.Scene;
  private quad!: THREE.Mesh;
  private orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private rayMat!: THREE.ShaderMaterial;
  private brightMat!: THREE.ShaderMaterial;
  private blurMat!: THREE.ShaderMaterial;
  private compMat!: THREE.ShaderMaterial;

  private sceneRT!: THREE.WebGLRenderTarget;
  private bloomRTs: THREE.WebGLRenderTarget[] = [];
  private tmpRTs: THREE.WebGLRenderTarget[] = [];
  private blackTex!: THREE.Texture;

  private raf = 0;
  private running = false;
  private paused = false;
  private firstFrameDone = false;
  private disposed = false;
  // Set while recovering from a WebGL context loss: the old targets' GL
  // objects died with the lost context, so disposing them would only emit
  // "object does not belong to this context" warnings.
  private restoring = false;

  // Simulation clock (seconds). Frozen under capture=1.
  simTime = 0;
  frozen = false;

  // Camera two-way sync bookkeeping (store <-> OrbitControls).
  private applied = { dist: 0, az: 0, pitch: 0, fov: 0 };
  private lastCamPush = 0;
  private spherical = new THREE.Spherical();
  private drawSize = new THREE.Vector2();

  // Scratch uniforms (single instances).
  private uVec2 = (x: number, y: number) => ({ value: new THREE.Vector2(x, y) });

  constructor(canvas: HTMLCanvasElement, cb: EngineCallbacks) {
    this.canvas = canvas;
    this.cb = cb;
    this.init();
  }

  // -------------------------------------------------------------------------
  private init(): void {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch {
      this.cb.onStatus("webgl-unsupported", 0);
      return;
    }
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // final pass encodes sRGB itself
    this.renderer.autoClear = false;

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.75;
    this.controls.minDistance = 2.2;
    this.controls.maxDistance = 45;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener("start", () => {
      store.markCustomCamera();
      if (store.getSnapshot().cinematic) store.setCinematic(false);
    });

    // Initial camera placement from persisted params.
    const p0 = store.getSnapshot().params;
    this.applyCameraFromParams(p0);

    // Materials -------------------------------------------------------------
    this.rayMat = new THREE.ShaderMaterial({
      vertexShader: RAYTRACE_VERT,
      fragmentShader: RAYTRACE_FRAG,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
      uniforms: {
        uResolution: this.uVec2(1, 1),
        uTime: { value: 0 },
        uCamPos: { value: new THREE.Vector3(0, 1, 14) },
        uCamBasis: { value: new THREE.Matrix3() },
        uTanHalfFov: { value: Math.tan(27.5 * DEG) },
        uMaxSteps: { value: 300 },
        uDebug: { value: 0 },
        uDiskInner: { value: 3 },
        uDiskOuter: { value: 12 },
        uDiskHalfThick: { value: 0.16 },
        uDiskTemp: { value: 6200 },
        uDiskIntensity: { value: 1.35 },
        uOrbitSpeed: { value: 1 },
        uTurbAmp: { value: 0.65 },
        uTurbSpeed: { value: 1 },
        uStarDensity: { value: 0.5 },
        uGalaxyBrightness: { value: 0.9 },
      },
    });

    this.blackTex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
    this.blackTex.needsUpdate = true;

    this.brightMat = new THREE.ShaderMaterial({
      vertexShader: POST_VERT,
      fragmentShader: BRIGHT_FRAG,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
      uniforms: {
        tSrc: { value: null },
        uTexel: this.uVec2(1, 1),
        uThreshold: { value: 1 },
      },
    });

    this.blurMat = new THREE.ShaderMaterial({
      vertexShader: POST_VERT,
      fragmentShader: BLUR_FRAG,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
      uniforms: {
        tSrc: { value: null },
        uTexel: this.uVec2(1, 1),
        uDir: this.uVec2(1, 0),
      },
    });

    const bloomUniforms: Record<string, { value: THREE.Texture }> = {};
    for (let i = 0; i < MAX_BLOOM_LEVELS; i++) {
      bloomUniforms[`tBloom${i}`] = { value: this.blackTex };
    }
    this.compMat = new THREE.ShaderMaterial({
      vertexShader: POST_VERT,
      fragmentShader: COMPOSITE_FRAG,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
      uniforms: {
        tScene: { value: null },
        ...bloomUniforms,
        uBloomLevels: { value: 4 },
        uBloomIntensity: { value: 0.8 },
        uExposure: { value: 1.15 },
        uVignette: { value: 0.45 },
        uGrain: { value: 0.35 },
        uDispersion: { value: 0.5 },
        uTime: { value: 0 },
        uOutTexel: this.uVec2(1, 1),
        uDebug: { value: 0 },
      },
    });

    // Full-screen triangle carrying every pass --------------------------------
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );
    this.quad = new THREE.Mesh(geom, this.rayMat);
    this.quad.frustumCulled = false;
    this.quadScene = new THREE.Scene();
    this.quadScene.add(this.quad);

    // WebGL context loss / recovery -------------------------------------------
    this.canvas.addEventListener("webglcontextlost", this.onContextLost);
    this.canvas.addEventListener("webglcontextrestored", this.onContextRestored);

    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  // -------------------------------------------------------------------------
  private onContextLost = (e: Event): void => {
    e.preventDefault();
    this.paused = true;
    this.cb.onStatus("context-lost", 0);
  };

  private onContextRestored = (): void => {
    // three re-initialises its own GL state; rebuild every render target and
    // the fallback texture (their GL objects died with the old context) and
    // force program recompilation, then resume exactly where we were.
    this.restoring = true;
    this.rebuildTargets();
    this.restoring = false;
    // The old 1x1 fallback texture died with the lost context; replace the
    // reference without touching the dead GL object.
    this.blackTex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
    this.blackTex.needsUpdate = true;
    for (let i = 0; i < MAX_BLOOM_LEVELS; i++) {
      if (i >= this.bloomRTs.length) {
        this.compMat.uniforms[`tBloom${i}`].value = this.blackTex;
      }
    }
    this.rayMat.needsUpdate = true;
    this.brightMat.needsUpdate = true;
    this.blurMat.needsUpdate = true;
    this.compMat.needsUpdate = true;
    this.paused = false;
    this.cb.onStatus("ok", 0);
  };

  private onResize = (): void => {
    this.rebuildTargets();
  };

  private rebuildTargets(): void {
    const quality = store.getSnapshot().quality;
    const budget = QUALITY_BUDGETS[quality];
    const w = Math.max(1, this.canvas.clientWidth || this.canvas.width || 1);
    const h = Math.max(1, this.canvas.clientHeight || this.canvas.height || 1);
    const dpr = Math.min(window.devicePixelRatio || 1, budget.dprCap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);

    const iw = Math.max(8, Math.round(w * dpr * budget.renderScale));
    const ih = Math.max(8, Math.round(h * dpr * budget.renderScale));

    const rtOpts: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    };
    if (!this.restoring) this.sceneRT?.dispose();
    this.sceneRT = new THREE.WebGLRenderTarget(iw, ih, rtOpts);

    if (!this.restoring) {
      for (const rt of this.bloomRTs) rt.dispose();
      for (const rt of this.tmpRTs) rt.dispose();
    }
    this.bloomRTs = [];
    this.tmpRTs = [];
    for (let i = 0; i < budget.bloomLevels; i++) {
      const lw = Math.max(8, Math.floor(iw >> (i + 1)));
      const lh = Math.max(8, Math.floor(ih >> (i + 1)));
      this.bloomRTs.push(new THREE.WebGLRenderTarget(lw, lh, rtOpts));
      this.tmpRTs.push(new THREE.WebGLRenderTarget(lw, lh, rtOpts));
    }
    for (let i = 0; i < MAX_BLOOM_LEVELS; i++) {
      this.compMat.uniforms[`tBloom${i}`].value =
        i < this.bloomRTs.length ? this.bloomRTs[i].texture : this.blackTex;
    }
    this.compMat.uniforms.uBloomLevels.value = this.bloomRTs.length;
    this.rayMat.uniforms.uResolution.value.set(iw, ih);
  }

  // -------------------------------------------------------------------------
  // Camera: store params <-> OrbitControls two-way sync.
  private applyCameraFromParams(p: Params): void {
    this.camera.position.setFromSphericalCoords(
      p.camDist,
      (90 - p.camPitch) * DEG,
      p.camAzimuth * DEG,
    );
    this.camera.lookAt(0, 0, 0);
    if (Math.abs(this.camera.fov - p.fov) > 1e-6) {
      this.camera.fov = p.fov;
      this.camera.updateProjectionMatrix();
    }
    this.controls.update();
    this.applied = { dist: p.camDist, az: p.camAzimuth, pitch: p.camPitch, fov: p.fov };
  }

  private syncCamera(now: number): void {
    const p = store.getSnapshot().params;
    const uiChanged =
      Math.abs(p.camDist - this.applied.dist) > CAM_SYNC_EPS ||
      angleDelta(p.camAzimuth, this.applied.az) > CAM_SYNC_EPS ||
      Math.abs(p.camPitch - this.applied.pitch) > CAM_SYNC_EPS ||
      Math.abs(p.fov - this.applied.fov) > 1e-3;
    if (uiChanged) {
      this.applyCameraFromParams(p);
      return;
    }
    // Camera is the writer (drag / damping / cinematic loop): mirror it back
    // into the store (throttled — the HUD does not need 60 Hz updates).
    this.spherical.setFromVector3(this.camera.position);
    const pitch = 90 - this.spherical.phi / DEG;
    const moved =
      Math.abs(this.spherical.radius - this.applied.dist) > CAM_SYNC_EPS ||
      angleDelta(this.spherical.theta / DEG, this.applied.az) > CAM_SYNC_EPS ||
      Math.abs(pitch - this.applied.pitch) > CAM_SYNC_EPS;
    if (moved && now - this.lastCamPush > 120) {
      this.lastCamPush = now;
      store.setParams(
        {
          camDist: this.spherical.radius,
          camAzimuth: this.spherical.theta / DEG,
          camPitch: pitch,
        },
        true,
      );
      this.applied = {
        dist: this.spherical.radius,
        az: this.spherical.theta / DEG,
        pitch,
        fov: this.camera.fov,
      };
    }
  }

  // -------------------------------------------------------------------------
  private pushParamUniforms(p: Params, quality: Quality, debug: number): void {
    const ru = this.rayMat.uniforms;
    (ru.uCamPos.value as THREE.Vector3).copy(this.camera.position);
    this.camera.updateMatrixWorld();
    const e = this.camera.matrixWorld.elements;
    (ru.uCamBasis.value as THREE.Matrix3).set(
      e[0], e[4], -e[8],
      e[1], e[5], -e[9],
      e[2], e[6], -e[10],
    );
    ru.uTanHalfFov.value = Math.tan(this.camera.fov * 0.5 * DEG);
    ru.uTime.value = this.simTime;
    ru.uMaxSteps.value = QUALITY_BUDGETS[quality].maxSteps;
    ru.uDebug.value = debug;
    ru.uDiskInner.value = p.diskInner;
    ru.uDiskOuter.value = p.diskOuter;
    ru.uDiskHalfThick.value = p.diskThickness;
    ru.uDiskTemp.value = p.diskTemp;
    ru.uDiskIntensity.value = p.diskIntensity;
    ru.uOrbitSpeed.value = p.orbitSpeed;
    ru.uTurbAmp.value = p.turbAmp;
    ru.uTurbSpeed.value = p.turbSpeed;
    ru.uStarDensity.value = p.starDensity;
    ru.uGalaxyBrightness.value = p.galaxyBrightness;

    const cu = this.compMat.uniforms;
    cu.uBloomIntensity.value = p.bloomIntensity;
    cu.uExposure.value = p.exposure;
    cu.uVignette.value = p.vignette;
    cu.uGrain.value = p.grain;
    cu.uDispersion.value = p.dispersion;
    cu.uTime.value = this.simTime;
    cu.uDebug.value = debug;
    this.brightMat.uniforms.uThreshold.value = p.bloomThreshold;
  }

  private renderPass(material: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null): void {
    this.quad.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.orthoCam);
  }

  private renderFrame(): void {
    // 1. geodesic raytracer -> HDR target
    this.renderPass(this.rayMat, this.sceneRT);

    if (this.bloomRTs.length > 0) {
      // 2. bright pass into bloom level 0 (half internal resolution)
      const iw = this.sceneRT.width;
      const ih = this.sceneRT.height;
      this.brightMat.uniforms.tSrc.value = this.sceneRT.texture;
      (this.brightMat.uniforms.uTexel.value as THREE.Vector2).set(1 / iw, 1 / ih);
      this.renderPass(this.brightMat, this.bloomRTs[0]);

      // 3. blur pyramid: H+V per level, halving each step (level i reads the
      //    already-blurred level i-1; level 0 re-blurs the bright pass)
      for (let i = 0; i < this.bloomRTs.length; i++) {
        const src = i === 0 ? this.bloomRTs[0] : this.bloomRTs[i - 1];
        this.blurMat.uniforms.tSrc.value = src.texture;
        (this.blurMat.uniforms.uTexel.value as THREE.Vector2).set(
          1 / this.tmpRTs[i].width,
          1 / this.tmpRTs[i].height,
        );
        (this.blurMat.uniforms.uDir.value as THREE.Vector2).set(1, 0);
        this.renderPass(this.blurMat, this.tmpRTs[i]);

        this.blurMat.uniforms.tSrc.value = this.tmpRTs[i].texture;
        (this.blurMat.uniforms.uDir.value as THREE.Vector2).set(0, 1);
        this.renderPass(this.blurMat, this.bloomRTs[i]);
      }
    }

    // 4. composite to the canvas
    this.compMat.uniforms.tScene.value = this.sceneRT.texture;
    const size = this.renderer.getDrawingBufferSize(this.drawSize);
    (this.compMat.uniforms.uOutTexel.value as THREE.Vector2).set(1 / size.x, 1 / size.y);
    this.renderPass(this.compMat, null);
  }

  // -------------------------------------------------------------------------
  start(): void {
    if (this.running || this.disposed) return;
    this.running = true;
    let prev = performance.now();
    let fpsAccum = 0;
    let fpsCount = 0;

    const tick = (now: number) => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(tick);
      if (this.paused) return;

      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;

      const snap = store.getSnapshot();
      if (!this.frozen) this.simTime += dt * snap.params.timeScale;
      this.controls.autoRotate = snap.cinematic && !this.frozen;
      this.controls.autoRotateSpeed = 0.55;
      this.controls.update();
      this.syncCamera(now);

      // Quality changes rebuild the target pyramid.
      this.rayMat.uniforms.uMaxSteps.value = QUALITY_BUDGETS[snap.quality].maxSteps;
      this.pushParamUniforms(snap.params, snap.quality, snap.debug);

      this.renderFrame();

      fpsAccum += dt;
      fpsCount++;
      if (fpsAccum >= 0.5) {
        this.cb.onStatus("ok", fpsCount / fpsAccum);
        fpsAccum = 0;
        fpsCount = 0;
      }

      if (!this.firstFrameDone) {
        this.firstFrameDone = true;
        this.cb.onFirstFrame();
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  // -------------------------------------------------------------------------
  setTime(seconds: number): boolean {
    if (!Number.isFinite(seconds) || seconds < 0) return false;
    this.simTime = seconds;
    return true;
  }

  setFrozen(frozen: boolean): void {
    this.frozen = frozen;
  }

  forceRebuild(): void {
    this.rebuildTargets();
  }

  dispose(): void {
    this.disposed = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
    this.controls?.dispose();
    this.sceneRT?.dispose();
    for (const rt of this.bloomRTs) rt.dispose();
    for (const rt of this.tmpRTs) rt.dispose();
    this.blackTex?.dispose();
    this.quadScene?.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      (m.material as THREE.Material)?.dispose();
    });
    this.renderer?.dispose();
  }
}
