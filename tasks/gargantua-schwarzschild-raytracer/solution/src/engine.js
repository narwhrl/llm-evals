import * as THREE from 'three';
import { OrbitControls } from '../vendor/addons/controls/OrbitControls.js';
import { QUALITY } from './state.js';
import vertexShader from './shaders/fullscreen.vert.glsl?raw';
import raytraceShader from './shaders/raytrace.frag.glsl?raw';
import blurShader from './shaders/blur.frag.glsl?raw';
import outputShader from './shaders/output.frag.glsl?raw';

const degrees = Math.PI / 180;
const MAX_PIXELS = 1_400_000;

function screenMaterial(fragmentShader, uniforms) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
}

function target(width, height, rgbm) {
  return new THREE.WebGLRenderTarget(width, height, {
    type: rgbm ? THREE.UnsignedByteType : THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
    colorSpace: THREE.LinearSRGBColorSpace,
  });
}

function sphericalPosition(azimuth, elevation, radius) {
  const a = azimuth * degrees;
  const e = elevation * degrees;
  return new THREE.Vector3(
    radius * Math.cos(e) * Math.cos(a),
    radius * Math.sin(e),
    radius * Math.cos(e) * Math.sin(a),
  );
}

export class RaytracerEngine {
  constructor(canvas, getState, callbacks) {
    this.canvas = canvas;
    this.getState = getState;
    this.callbacks = callbacks;
    this.simTime = getState().time;
    this.ready = false;
    this.lost = false;
    this.disposed = false;
    this.syncingCamera = false;
    this.inputSuppressedUntil = 0;
    this.lastFrame = 0;
    this.onResize = () => this.resize();
    this.onContextLost = (event) => {
      event.preventDefault();
      this.lost = true;
      this.userInteracting = false;
      this.ready = false;
      cancelAnimationFrame(this.frameHandle);
      this.callbacks.onStatus('lost');
    };
    this.onContextRestored = () => {
      this.callbacks.onStatus('restoring');
      setTimeout(() => {
        if (this.disposed) return;
        try {
          this.destroyPipeline();
          this.createPipeline();
          // The old Three renderer may leave a WebGL error while releasing
          // resources from the previously lost context. Clear that stale
          // state before checking the first frame of the rebuilt pipeline.
          const gl = this.renderer.getContext();
          for (let i = 0; i < 8 && gl.getError() !== gl.NO_ERROR; i++);
          this.inputSuppressedUntil = performance.now() + 1500;
          this.controls.enabled = false;
          setTimeout(() => {
            if (!this.disposed && !this.lost) this.controls.enabled = true;
          }, 1500);
          this.lost = false;
          this.lastFrame = 0;
          this.start();
        } catch (error) {
          this.callbacks.onError(error);
        }
      }, 0);
    };
    canvas.addEventListener('webglcontextlost', this.onContextLost);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored);
    window.addEventListener('resize', this.onResize);
    this.createPipeline();
    this.start();
  }

  createPipeline() {
    this.compileError = null;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
      this.compileError = new Error(`Shader compile/link failed: ${gl.getProgramInfoLog(program)} ${gl.getShaderInfoLog(vertex)} ${gl.getShaderInfoLog(fragment)}`);
    };
    this.rgbm = !this.renderer.getContext().getExtension('EXT_color_buffer_float');

    this.orbitCamera = new THREE.PerspectiveCamera(48, 1, 0.01, 500);
    this.orbitCamera.up.set(0, 1, 0);
    this.controls = new OrbitControls(this.orbitCamera, this.canvas);
    this.controls.enableDamping = false;
    this.controls.enablePan = false;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 48;
    this.controls.minPolarAngle = 15 * degrees;
    this.controls.maxPolarAngle = 165 * degrees;
    this.userInteracting = false;
    this.controls.addEventListener('start', () => {
      this.userInteracting = true;
      this.reportCamera();
    });
    this.controls.addEventListener('change', () => {
      if (this.userInteracting) this.reportCamera();
    });
    this.controls.addEventListener('end', () => { this.userInteracting = false; });
    this.syncCamera();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    this.geometry = geometry;
    this.mesh = new THREE.Mesh(geometry, screenMaterial(raytraceShader, {
      uCameraPos: { value: new THREE.Vector3() },
      uCameraBasis: { value: new THREE.Matrix3() },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTanHalfFov: { value: 0.45 },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uMaxSteps: { value: 256 },
      uDiskSamples: { value: 2 },
      uDebug: { value: 0 },
      uRgbm: { value: this.rgbm },
      uDiskInner: { value: 5 },
      uDiskOuter: { value: 17 },
      uDiskHeight: { value: 0.22 },
      uDiskTemperature: { value: 1 },
      uDiskEmission: { value: 2 },
      uOrbitalSpeed: { value: 1 },
      uTurbulence: { value: 0.42 },
      uTurbulenceSpeed: { value: 1 },
      uStarDensity: { value: 1 },
      uGalaxyBrightness: { value: 1 },
    }));
    this.mesh.frustumCulled = false;
    this.rayMaterial = this.mesh.material;
    this.blurMaterial = screenMaterial(blurShader, {
      uInput: { value: null },
      uTexel: { value: new THREE.Vector2(1, 1) },
      uDirection: { value: new THREE.Vector2(1, 0) },
      uThreshold: { value: 1.2 },
      uApplyThreshold: { value: false },
      uRgbm: { value: this.rgbm },
    });
    this.outputMaterial = screenMaterial(outputShader, {
      uScene: { value: null },
      uBloom0: { value: null },
      uBloom1: { value: null },
      uBloom2: { value: null },
      uBloom3: { value: null },
      uBloomLevels: { value: 3 },
      uDebug: { value: 0 },
      uRgbm: { value: this.rgbm },
      uBloomStrength: { value: 0.85 },
      uExposure: { value: 1 },
      uVignette: { value: 0.18 },
      uGrain: { value: 0.025 },
      uChromaticAberration: { value: 0.0015 },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    });
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);
    this.screenCamera = new THREE.Camera();
    this.targets = [];
    this.resize();
  }

  destroyPipeline() {
    if (!this.renderer) return;
    this.controls?.dispose();
    this.targets?.forEach((item) => item.dispose());
    this.geometry?.dispose();
    this.rayMaterial?.dispose();
    this.blurMaterial?.dispose();
    this.outputMaterial?.dispose();
    this.renderer.dispose();
    this.renderer = null;
    this.targets = [];
  }

  syncCamera() {
    if (!this.orbitCamera) return;
    const params = this.getState().params;
    this.syncingCamera = true;
    this.orbitCamera.position.copy(sphericalPosition(params.azimuth, params.elevation, params.distance));
    this.orbitCamera.fov = params.fov;
    this.orbitCamera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.syncingCamera = false;
  }

  reportCamera() {
    if (this.syncingCamera || this.lost || performance.now() < this.inputSuppressedUntil) return;
    const position = this.orbitCamera.position;
    const radius = position.length();
    const azimuth = ((Math.atan2(position.z, position.x) / degrees) + 360) % 360;
    const elevation = Math.asin(position.y / radius) / degrees;
    this.callbacks.onCameraChange({ azimuth, elevation, distance: radius, fov: this.orbitCamera.fov });
  }

  resize() {
    if (!this.renderer || this.lost) return;
    const state = this.getState();
    const profile = QUALITY[state.quality];
    const cssWidth = Math.max(1, window.innerWidth);
    const cssHeight = Math.max(1, window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, profile.dprCap);
    const displayScale = Math.min(dpr, Math.sqrt(1_800_000 / (cssWidth * cssHeight)));
    const internalScale = Math.min(dpr * profile.scale, Math.sqrt(MAX_PIXELS / (cssWidth * cssHeight)));
    const displayWidth = Math.max(1, Math.round(cssWidth * displayScale));
    const displayHeight = Math.max(1, Math.round(cssHeight * displayScale));
    this.internalWidth = Math.max(1, Math.round(cssWidth * internalScale));
    this.internalHeight = Math.max(1, Math.round(cssHeight * internalScale));
    this.renderer.setSize(displayWidth, displayHeight, false);
    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;
    this.orbitCamera.aspect = cssWidth / cssHeight;
    this.orbitCamera.updateProjectionMatrix();
    this.targets.forEach((item) => item.dispose());
    this.sceneTarget = target(this.internalWidth, this.internalHeight, this.rgbm);
    this.targets = [this.sceneTarget];
    this.bloom = [];
    let width = this.internalWidth;
    let height = this.internalHeight;
    for (let level = 0; level < 4; level++) {
      width = Math.max(1, Math.floor(width / 2));
      height = Math.max(1, Math.floor(height / 2));
      const horizontal = target(width, height, this.rgbm);
      const vertical = target(width, height, this.rgbm);
      this.bloom.push({ horizontal, vertical, width, height });
      this.targets.push(horizontal, vertical);
    }
    this.rayMaterial.uniforms.uResolution.value.set(this.internalWidth, this.internalHeight);
    this.outputMaterial.uniforms.uResolution.value.set(displayWidth, displayHeight);
  }

  setTime(seconds) {
    this.simTime = seconds;
    this.lastFrame = performance.now();
  }

  getTime() {
    return this.simTime;
  }

  canTestContextRecovery() {
    return Boolean(this.renderer?.getContext().getExtension('WEBGL_lose_context'));
  }

  testContextRecovery() {
    if (this.disposed || this.lost) return false;
    const extension = this.renderer?.getContext().getExtension('WEBGL_lose_context');
    if (!extension) return false;
    extension.loseContext();
    setTimeout(() => {
      if (!this.disposed) extension.restoreContext();
    }, 800);
    return true;
  }

  start() {
    if (this.disposed || this.lost) return;
    this.frameHandle = requestAnimationFrame((stamp) => this.frame(stamp));
  }

  frame(stamp) {
    if (this.disposed || this.lost) return;
    try {
      const state = this.getState();
      const delta = this.lastFrame ? Math.min((stamp - this.lastFrame) / 1000, 0.1) : 0;
      this.lastFrame = stamp;
      if (!state.capture) this.simTime += delta * state.params.timeScale;
      if (state.cinematic && !state.capture) {
        const p = state.params;
        const azimuth = p.azimuth + 5 * Math.sin(this.simTime * 0.16) + this.simTime * 0.55;
        const elevation = p.elevation + 3.5 * Math.sin(this.simTime * 0.12);
        const radius = p.distance + 0.55 * Math.sin(this.simTime * 0.1);
        this.syncingCamera = true;
        this.orbitCamera.position.copy(sphericalPosition(azimuth, elevation, radius));
        this.controls.update();
        this.syncingCamera = false;
      }
      this.render(state);
      if (!this.ready) {
        if (this.compileError) throw this.compileError;
        const error = this.renderer.getContext().getError();
        if (error !== this.renderer.getContext().NO_ERROR) throw new Error(`WebGL error on initial frame: ${error}`);
        this.ready = true;
        this.callbacks.onReady();
      }
      this.start();
    } catch (error) {
      this.ready = false;
      this.callbacks.onError(error);
    }
  }

  render(state) {
    const profile = QUALITY[state.quality];
    const params = state.params;
    const ray = this.rayMaterial.uniforms;
    this.orbitCamera.updateMatrixWorld();
    ray.uCameraPos.value.copy(this.orbitCamera.position);
    ray.uCameraBasis.value.setFromMatrix4(this.orbitCamera.matrixWorld);
    ray.uTanHalfFov.value = Math.tan(this.orbitCamera.fov * degrees * 0.5);
    ray.uAspect.value = this.orbitCamera.aspect;
    ray.uTime.value = this.simTime;
    ray.uMaxSteps.value = profile.steps;
    ray.uDiskSamples.value = profile.diskSamples;
    ray.uDebug.value = state.debug;
    ray.uDiskInner.value = params.diskInner;
    ray.uDiskOuter.value = params.diskOuter;
    ray.uDiskHeight.value = params.diskHeight;
    ray.uDiskTemperature.value = params.diskTemperature;
    ray.uDiskEmission.value = params.diskEmission;
    ray.uOrbitalSpeed.value = params.orbitalSpeed;
    ray.uTurbulence.value = params.turbulence;
    ray.uTurbulenceSpeed.value = params.turbulenceSpeed;
    ray.uStarDensity.value = params.starDensity;
    ray.uGalaxyBrightness.value = params.galaxyBrightness;
    this.mesh.material = this.rayMaterial;
    this.renderer.setRenderTarget(this.sceneTarget);
    this.renderer.render(this.scene, this.screenCamera);

    const blur = this.blurMaterial.uniforms;
    const levels = state.debug === 0 ? profile.bloomLevels : 0;
    for (let level = 0; level < levels; level++) {
      const layer = this.bloom[level];
      const input = level === 0 ? this.sceneTarget : this.bloom[level - 1].vertical;
      const inputWidth = level === 0 ? this.internalWidth : this.bloom[level - 1].width;
      const inputHeight = level === 0 ? this.internalHeight : this.bloom[level - 1].height;
      blur.uInput.value = input.texture;
      blur.uTexel.value.set(1 / inputWidth, 1 / inputHeight);
      blur.uDirection.value.set(1, 0);
      blur.uThreshold.value = params.bloomThreshold;
      blur.uApplyThreshold.value = level === 0;
      this.mesh.material = this.blurMaterial;
      this.renderer.setRenderTarget(layer.horizontal);
      this.renderer.render(this.scene, this.screenCamera);
      blur.uInput.value = layer.horizontal.texture;
      blur.uTexel.value.set(1 / layer.width, 1 / layer.height);
      blur.uDirection.value.set(0, 1);
      blur.uApplyThreshold.value = false;
      this.renderer.setRenderTarget(layer.vertical);
      this.renderer.render(this.scene, this.screenCamera);
    }

    const output = this.outputMaterial.uniforms;
    output.uScene.value = this.sceneTarget.texture;
    for (let level = 0; level < 4; level++) output[`uBloom${level}`].value = this.bloom[level].vertical.texture;
    output.uBloomLevels.value = levels;
    output.uDebug.value = state.debug;
    output.uBloomStrength.value = params.bloomStrength;
    output.uExposure.value = params.exposure;
    output.uVignette.value = params.vignette;
    output.uGrain.value = params.grain;
    output.uChromaticAberration.value = params.chromaticAberration;
    output.uTime.value = this.simTime;
    this.mesh.material = this.outputMaterial;
    this.renderer.setRenderTarget(null);
    this.renderer.setViewport(0, 0, this.renderer.domElement.width, this.renderer.domElement.height);
    this.renderer.setScissorTest(false);
    this.renderer.render(this.scene, this.screenCamera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frameHandle);
    window.removeEventListener('resize', this.onResize);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.destroyPipeline();
  }
}
