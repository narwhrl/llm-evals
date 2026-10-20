import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { FULLSCREEN_VERT, GEODESIC_FRAG } from "./geodesicShader";
import {
  BRIGHT_FRAG,
  COMPOSITE_FRAG,
  DOWNSAMPLE_FRAG,
  UPSAMPLE_FRAG,
} from "./postShader";
import { ParamValues, defaultParamValues } from "../config/params";
import { QualityProfile, qualityProfile } from "../config/quality";
import { Settings } from "../config/settings";

const DEG = Math.PI / 180;

export interface EngineCameraState {
  fov: number;
  distance: number;
  azimuth: number;
  elevation: number;
}

export interface EngineStats {
  fps: number;
  frameMs: number;
  renderScale: number;
  steps: number;
  dpr: number;
  camera: EngineCameraState;
  cinematic: boolean;
  contextLost: boolean;
}

export interface EngineCallbacks {
  onCameraChange?: (state: EngineCameraState) => void;
  onContextLost?: () => void;
  onContextRestored?: () => void;
  onFirstFrame?: () => void;
  onStats?: (stats: EngineStats) => void;
}

/**
 * The renderer.
 *
 * One full-screen triangle carries the geodesic shader; every pass after that
 * is a post-process on the image it produced. The camera is an ordinary
 * Three.js perspective camera driven by OrbitControls, and its world matrix
 * is read straight into the shader's ray basis, so what the user drags is
 * exactly what the integration sees.
 */
export class GargantuaEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly quad: THREE.Mesh;
  private readonly passCamera = new THREE.Camera();

  private readonly geoMaterial: THREE.ShaderMaterial;
  private readonly brightMaterial: THREE.ShaderMaterial;
  private readonly downMaterial: THREE.ShaderMaterial;
  private readonly upMaterial: THREE.ShaderMaterial;
  private readonly compositeMaterial: THREE.ShaderMaterial;

  private sceneTarget: THREE.WebGLRenderTarget;
  private bloomTargets: THREE.WebGLRenderTarget[] = [];

  private params: ParamValues = defaultParamValues();
  private quality: QualityProfile = qualityProfile("high");
  private simTime = 0;
  private cinematic = true;
  private userControlled = false;
  private captureMode = false;
  private initialised = false;
  private disposed = false;
  private contextLost = false;
  private ready = false;

  private raf = 0;
  private lastFrame = 0;
  private cinematicClock = 0;
  private frameAccumulator = 0;
  private frameCounter = 0;
  private lastStats = 0;
  private adaptiveScale = 1;
  private slowFrames = 0;
  private fastFrames = 0;
  private lastReported: EngineCameraState | null = null;
  private orphaned = false;

  private readonly callbacks: EngineCallbacks;

  constructor(canvas: HTMLCanvasElement, callbacks: EngineCallbacks = {}) {
    this.canvas = canvas;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      // The capture contract hands the frame to a screenshot tool, so the
      // drawing buffer has to survive the compositing step.
      preserveDrawingBuffer: true,
    });
    this.renderer.autoClear = true;
    this.renderer.setClearColor(0x000000, 1);

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.05, 4000);
    // The disc lies in the z = 0 plane, so the world's up axis is the disc's
    // axis. The elevation slider then means what it says.
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(20, 0, 2.5);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.8;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 120;
    this.controls.minPolarAngle = 0.02;
    this.controls.maxPolarAngle = Math.PI - 0.02;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener("start", () => {
      // The user has taken the wheel; the loop must not take it back.
      this.userControlled = true;
      this.cinematic = false;
    });
    this.controls.addEventListener("change", () => {
      if (this.userControlled) this.reportCamera();
    });

    /* --- the full-screen triangle ------------------------------------------ */

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );

    this.geoMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: GEODESIC_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3() },
        uCamUp: { value: new THREE.Vector3() },
        uCamFwd: { value: new THREE.Vector3() },
        uTanHalf: { value: Math.tan(20 * DEG) },
        uMaxSteps: { value: 380 },
        uStepScale: { value: 0.022 },
        uNoiseOctaves: { value: 4 },
        uDiskIn: { value: 3 },
        uDiskOut: { value: 16 },
        uDiskThick: { value: 0.2 },
        uDiskTemp: { value: 7600 },
        uDiskEmission: { value: 1.7 },
        uDiskOpacity: { value: 0.9 },
        uOrbitalSpeed: { value: 1 },
        uTurbAmp: { value: 0.7 },
        uTurbSpeed: { value: 1 },
        uTurbScale: { value: 2.4 },
        uStarDensity: { value: 1 },
        uStarBright: { value: 1.2 },
        uGalaxyBright: { value: 0.9 },
        uDebug: { value: 0 },
      },
    });

    this.brightMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BRIGHT_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uSrc: { value: null },
        uThreshold: { value: 1.1 },
        uKnee: { value: 0.55 },
      },
    });

    this.downMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: DOWNSAMPLE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: { uSrc: { value: null }, uTexel: { value: new THREE.Vector2() } },
    });

    this.upMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: UPSAMPLE_FRAG,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uSrc: { value: null },
        uTexel: { value: new THREE.Vector2() },
        uRadius: { value: 1.15 },
      },
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: COMPOSITE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uScene: { value: null },
        uBloom: { value: null },
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uExposure: { value: 1.15 },
        uBloomIntensity: { value: 0.85 },
        uVignette: { value: 0.28 },
        uFilmGrain: { value: 0.035 },
        uDispersion: { value: 0.4 },
        uDebug: { value: 0 },
      },
    });

    this.quad = new THREE.Mesh(geometry, this.geoMaterial);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);

    this.sceneTarget = this.makeTarget(1, 1);

    this.canvas.addEventListener("webglcontextlost", this.handleContextLost, false);
    this.canvas.addEventListener("webglcontextrestored", this.handleContextRestored, false);

    this.resizeInternal();
    this.raf = requestAnimationFrame(this.tick);
  }

  /* ---------------------------------------------------------------------- */
  /*  Public surface                                                          */
  /* ---------------------------------------------------------------------- */

  applySettings(settings: Settings): void {
    const next = settings.params;
    const reported = this.lastReported;
    // The camera moves two ways: by the user, or by this class reporting
    // where OrbitControls left it. Only the first one should move it again.
    const echoesReport =
      reported !== null &&
      Math.abs(next.cameraAzimuth - reported.azimuth) < 0.02 &&
      Math.abs(next.cameraElevation - reported.elevation) < 0.02 &&
      Math.abs(next.cameraDistance - reported.distance) < 0.02;

    const cameraChanged =
      Math.abs(next.cameraAzimuth - this.params.cameraAzimuth) > 1e-4 ||
      Math.abs(next.cameraElevation - this.params.cameraElevation) > 1e-4 ||
      Math.abs(next.cameraDistance - this.params.cameraDistance) > 1e-4;

    this.params = { ...next };
    this.quality = qualityProfile(settings.quality);
    this.geoMaterial.uniforms.uDebug.value = settings.debug;
    this.compositeMaterial.uniforms.uDebug.value = settings.debug;

    if (cameraChanged && this.initialised && !echoesReport) {
      // A deliberate move of the camera takes the frame away from the loop.
      this.userControlled = true;
      this.cinematic = false;
    }
    this.initialised = true;

    this.camera.fov = this.params.fov;
    this.camera.updateProjectionMatrix();

    if ((this.userControlled || !this.cinematic) && !echoesReport) {
      this.applyCameraFromParams();
    }
    this.resizeInternal();
  }

  setCinematic(active: boolean): void {
    this.cinematic = active;
    if (active) {
      this.userControlled = false;
      this.cinematicClock = 0;
      this.applyCameraFromParams();
    }
  }

  isCinematic(): boolean {
    return this.cinematic && !this.userControlled;
  }

  setCaptureMode(active: boolean): void {
    this.captureMode = active;
    if (active) this.cinematic = false;
  }

  setTime(seconds: number): void {
    if (!Number.isFinite(seconds) || seconds < 0) return;
    this.simTime = seconds;
  }

  getTime(): number {
    return this.simTime;
  }

  getQuality(): QualityProfile {
    return this.quality;
  }

  /** Re-reads the canvas size and rebuilds the render targets. */
  resize(): void {
    this.resizeInternal();
  }

  isReady(): boolean {
    return this.ready;
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener("webglcontextlost", this.handleContextLost, false);
    this.canvas.removeEventListener("webglcontextrestored", this.handleContextRestored, false);
    this.controls.dispose();
    this.sceneTarget.dispose();
    for (const target of this.bloomTargets) target.dispose();
    this.geoMaterial.dispose();
    this.brightMaterial.dispose();
    this.downMaterial.dispose();
    this.upMaterial.dispose();
    this.compositeMaterial.dispose();
    this.renderer.dispose();
  }

  /* ---------------------------------------------------------------------- */
  /*  Camera                                                                  */
  /* ---------------------------------------------------------------------- */

  private applyCameraFromParams(): void {
    const azimuth = this.params.cameraAzimuth * DEG;
    const elevation = this.params.cameraElevation * DEG;
    const distance = this.params.cameraDistance;
    const horizontal = distance * Math.cos(elevation);
    this.camera.position.set(
      horizontal * Math.cos(azimuth),
      horizontal * Math.sin(azimuth),
      distance * Math.sin(elevation),
    );
    this.controls.target.set(0, 0, 0);
    // Flush the residual damping before the camera is moved, otherwise the
    // next update() drags it back to where the mouse let go.
    const damping = this.controls.enableDamping;
    this.controls.enableDamping = false;
    this.controls.update();
    this.camera.position.set(
      horizontal * Math.cos(azimuth),
      horizontal * Math.sin(azimuth),
      distance * Math.sin(elevation),
    );
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.enableDamping = damping;
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
  }

  private readCamera(): EngineCameraState {
    const offset = this.camera.position.clone().sub(this.controls.target);
    const distance = Math.max(offset.length(), 1e-6);
    const polar = Math.acos(THREE.MathUtils.clamp(offset.z / distance, -1, 1));
    return {
      fov: this.camera.fov,
      distance,
      azimuth: Math.atan2(offset.y, offset.x) / DEG,
      elevation: 90 - polar / DEG,
    };
  }

  private reportCamera(): void {
    const state = this.readCamera();
    this.lastReported = state;
    this.callbacks.onCameraChange?.(state);
  }

  /* ---------------------------------------------------------------------- */
  /*  Sizing                                                                  */
  /* ---------------------------------------------------------------------- */

  private makeTarget(width: number, height: number): THREE.WebGLRenderTarget {
    const target = new THREE.WebGLRenderTarget(Math.max(1, width), Math.max(1, height), {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      colorSpace: THREE.NoColorSpace,
    });
    return target;
  }

  /**
   * Releases the render targets.
   *
   * After a context loss the GL objects are already gone, and asking the
   * driver to delete them produces a stream of INVALID_OPERATION warnings for
   * objects that belong to a context that no longer exists. The orphaned flag
   * says so, and the JavaScript wrappers are simply dropped.
   */
  private releaseTargets(): void {
    if (this.orphaned) {
      this.orphaned = false;
    } else {
      this.sceneTarget.dispose();
      for (const target of this.bloomTargets) target.dispose();
    }
    this.bloomTargets = [];
  }

  private resizeInternal(): void {
    const parent = this.canvas.parentElement;
    const width = Math.max(1, Math.floor(parent?.clientWidth ?? this.canvas.clientWidth));
    const height = Math.max(1, Math.floor(parent?.clientHeight ?? this.canvas.clientHeight));
    const dpr = Math.min(window.devicePixelRatio || 1, this.quality.dprCap);

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    const bufferWidth = Math.max(1, Math.floor(width * dpr));
    const bufferHeight = Math.max(1, Math.floor(height * dpr));
    this.compositeMaterial.uniforms.uRes.value.set(bufferWidth, bufferHeight);

    const scale = this.quality.resolutionScale * this.adaptiveScale;
    const sceneWidth = Math.max(1, Math.floor(bufferWidth * scale));
    const sceneHeight = Math.max(1, Math.floor(bufferHeight * scale));

    this.releaseTargets();
    this.sceneTarget = this.makeTarget(sceneWidth, sceneHeight);
    this.geoMaterial.uniforms.uRes.value.set(sceneWidth, sceneHeight);

    let levelWidth = sceneWidth;
    let levelHeight = sceneHeight;
    for (let i = 0; i < this.quality.bloomLevels; i++) {
      levelWidth = Math.max(1, Math.floor(levelWidth / 2));
      levelHeight = Math.max(1, Math.floor(levelHeight / 2));
      this.bloomTargets.push(this.makeTarget(levelWidth, levelHeight));
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  Frame                                                                   */
  /* ---------------------------------------------------------------------- */

  private tick = (now: number): void => {
    this.raf = requestAnimationFrame(this.tick);
    if (this.disposed || this.contextLost) return;

    const delta = this.lastFrame ? Math.min((now - this.lastFrame) / 1000, 0.1) : 0;
    this.lastFrame = now;

    if (!this.captureMode) this.simTime += delta * this.params.timeScale;

    if (this.isCinematic()) {
      this.cinematicClock += delta;
      const t = this.cinematicClock;
      const azimuth = this.params.cameraAzimuth + t * 1.7;
      const elevation = THREE.MathUtils.clamp(
        this.params.cameraElevation + Math.sin(t * 0.13) * 4.5,
        -88,
        88,
      );
      const distance = this.params.cameraDistance * (1 + Math.sin(t * 0.083) * 0.055);
      const horizontal = distance * Math.cos(elevation * DEG);
      this.camera.position.set(
        horizontal * Math.cos(azimuth * DEG),
        horizontal * Math.sin(azimuth * DEG),
        distance * Math.sin(elevation * DEG),
      );
      this.controls.target.set(0, 0, 0);
    }

    this.controls.update();
    this.camera.updateMatrixWorld();

    this.render();

    if (!this.ready) {
      this.ready = true;
      this.callbacks.onFirstFrame?.();
    }

    this.frameAccumulator += delta;
    this.frameCounter += 1;
    if (now - this.lastStats > 250) {
      const seconds = this.frameAccumulator || 0.001;
      const fps = this.frameCounter / seconds;
      const frameMs = (seconds * 1000) / this.frameCounter;
      this.lastStats = now;
      this.frameAccumulator = 0;
      this.frameCounter = 0;
      this.adaptQuality(frameMs);
      this.callbacks.onStats?.({
        fps,
        frameMs,
        renderScale: this.quality.resolutionScale * this.adaptiveScale,
        steps: this.quality.maxSteps,
        dpr: this.renderer.getPixelRatio(),
        camera: this.readCamera(),
        cinematic: this.isCinematic(),
        contextLost: this.contextLost,
      });
    }
  };

  /**
   * If the frame is consistently over budget the internal resolution comes
   * down. It only ever falls, and never during a capture, so a screenshot
   * never depends on how fast the machine happened to be.
   */
  private adaptQuality(frameMs: number): void {
    if (this.captureMode || this.quality.id === "cinematic") return;
    if (frameMs > 55) {
      this.slowFrames += 1;
      this.fastFrames = 0;
    } else if (frameMs < 26) {
      this.fastFrames += 1;
      this.slowFrames = 0;
    }
    if (this.slowFrames >= 4 && this.adaptiveScale > 0.4) {
      this.adaptiveScale = Math.max(0.4, this.adaptiveScale - 0.12);
      this.slowFrames = 0;
      this.resizeInternal();
    } else if (this.fastFrames >= 12 && this.adaptiveScale < 1) {
      this.adaptiveScale = Math.min(1, this.adaptiveScale + 0.08);
      this.fastFrames = 0;
      this.resizeInternal();
    }
  }

  private render(): void {
    const uniforms = this.geoMaterial.uniforms;
    uniforms.uTime.value = this.simTime;
    uniforms.uCamPos.value.copy(this.camera.position);
    uniforms.uCamRight.value.setFromMatrixColumn(this.camera.matrixWorld, 0);
    uniforms.uCamUp.value.setFromMatrixColumn(this.camera.matrixWorld, 1);
    uniforms.uCamFwd.value.setFromMatrixColumn(this.camera.matrixWorld, 2).negate();
    uniforms.uTanHalf.value = Math.tan((this.camera.fov * 0.5) * DEG);
    uniforms.uMaxSteps.value = this.quality.maxSteps;
    uniforms.uStepScale.value = this.quality.id === "cinematic" ? 0.016 : this.quality.id === "standard" ? 0.028 : 0.022;
    uniforms.uNoiseOctaves.value = this.quality.noiseOctaves;
    uniforms.uDiskIn.value = this.params.diskInnerRadius;
    uniforms.uDiskOut.value = this.params.diskOuterRadius;
    uniforms.uDiskThick.value = this.params.diskHalfThickness;
    uniforms.uDiskTemp.value = this.params.diskTemperature;
    uniforms.uDiskEmission.value = this.params.diskEmission;
    uniforms.uDiskOpacity.value = this.params.diskOpacity;
    uniforms.uOrbitalSpeed.value = this.params.orbitalSpeed;
    uniforms.uTurbAmp.value = this.params.turbulenceAmplitude;
    uniforms.uTurbSpeed.value = this.params.turbulenceSpeed;
    uniforms.uTurbScale.value = this.params.turbulenceScale;
    uniforms.uStarDensity.value = this.params.starDensity;
    uniforms.uStarBright.value = this.params.starBrightness;
    uniforms.uGalaxyBright.value = this.params.galaxyBrightness;

    const composite = this.compositeMaterial.uniforms;
    composite.uTime.value = this.simTime;
    composite.uExposure.value = this.params.exposure;
    composite.uBloomIntensity.value = this.params.bloomIntensity;
    composite.uVignette.value = this.params.vignette;
    composite.uFilmGrain.value = this.params.filmGrain;
    composite.uDispersion.value = this.params.dispersion;

    /* 1. the geodesic pass -------------------------------------------------- */
    this.quad.material = this.geoMaterial;
    this.renderer.setRenderTarget(this.sceneTarget);
    this.renderer.render(this.scene, this.passCamera);

    /* 2. bright pass into the first bloom level ---------------------------- */
    this.brightMaterial.uniforms.uSrc.value = this.sceneTarget.texture;
    this.brightMaterial.uniforms.uThreshold.value = this.params.bloomThreshold;
    this.quad.material = this.brightMaterial;
    this.renderer.setRenderTarget(this.bloomTargets[0]);
    this.renderer.render(this.scene, this.passCamera);

    /* 3. down the pyramid --------------------------------------------------- */
    this.quad.material = this.downMaterial;
    for (let i = 1; i < this.bloomTargets.length; i++) {
      const source = this.bloomTargets[i - 1];
      this.downMaterial.uniforms.uSrc.value = source.texture;
      this.downMaterial.uniforms.uTexel.value.set(
        1 / source.width,
        1 / source.height,
      );
      this.renderer.setRenderTarget(this.bloomTargets[i]);
      this.renderer.render(this.scene, this.passCamera);
    }

    /* 4. back up the pyramid, adding each level into the one above ---------- */
    this.quad.material = this.upMaterial;
    this.renderer.autoClear = false;
    for (let i = this.bloomTargets.length - 1; i > 0; i--) {
      const source = this.bloomTargets[i];
      this.upMaterial.uniforms.uSrc.value = source.texture;
      this.upMaterial.uniforms.uTexel.value.set(1 / source.width, 1 / source.height);
      this.renderer.setRenderTarget(this.bloomTargets[i - 1]);
      this.renderer.render(this.scene, this.passCamera);
    }
    this.renderer.autoClear = true;

    /* 5. composite onto the canvas ----------------------------------------- */
    this.compositeMaterial.uniforms.uScene.value = this.sceneTarget.texture;
    this.compositeMaterial.uniforms.uBloom.value = this.bloomTargets[0].texture;
    this.quad.material = this.compositeMaterial;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.passCamera);
  }

  /* ---------------------------------------------------------------------- */
  /*  Context loss                                                           */
  /* ---------------------------------------------------------------------- */

  private handleContextLost = (event: Event): void => {
    // Preventing the default is what lets the browser hand the context back.
    event.preventDefault();
    this.contextLost = true;
    this.orphaned = true;
    cancelAnimationFrame(this.raf);
    this.callbacks.onContextLost?.();
  };

  private handleContextRestored = (): void => {
    const gl = this.renderer.getContext();
    // The float extensions have to be asked for again: a restored context
    // comes back with a new extension list, and a half-float target built
    // without them is an incomplete framebuffer and renders black.
    gl.getExtension("EXT_color_buffer_float");
    gl.getExtension("EXT_color_buffer_half_float");
    gl.getExtension("OES_texture_float_linear");

    this.geoMaterial.needsUpdate = true;
    this.brightMaterial.needsUpdate = true;
    this.downMaterial.needsUpdate = true;
    this.upMaterial.needsUpdate = true;
    this.compositeMaterial.needsUpdate = true;

    this.contextLost = false;
    this.lastFrame = 0;
    this.resizeInternal();
    this.raf = requestAnimationFrame(this.tick);
    this.callbacks.onContextRestored?.();
  };
}
