import * as THREE from 'three';
import { CameraRig } from './cameraRig.js';
import {
  FULLSCREEN_VERTEX_SHADER,
  GEODESIC_FRAGMENT_SHADER,
} from './geodesic.js';
import { PostChain } from './post.js';
import { CAMERA_PRESETS, DEFAULT_PARAMS, QUALITY_TIERS } from './state.js';

// Full-screen triangle drawn directly in clip space: the three vertices cover
// the viewport, so a single draw call rasterizes every pixel exactly once and
// all visible imagery is produced per-pixel by the geodesic fragment shader.
const FULLSCREEN_GEOMETRY_POSITIONS = new Float32Array([
  -1, -1, 0,
   3, -1, 0,
  -1,  3, 0,
]);

/** Parameter key → shader uniform sink (camera params are routed separately). */
const PARAM_UNIFORMS = {
  diskInner: 'uDiskInner',
  diskOuter: 'uDiskOuter',
  diskHalfThickness: 'uDiskHalfThickness',
  diskTemperature: 'uDiskTemperature',
  diskBrightness: 'uDiskBrightness',
  orbitalSpeed: 'uOrbitalSpeedScale',
  turbulenceAmplitude: 'uTurbAmplitude',
  turbulenceSpeed: 'uTurbSpeed',
  starDensity: 'uStarDensity',
  galaxyBrightness: 'uGalaxyBrightness',
};

/**
 * Owns the WebGL context, the geodesic shader surface, the camera rig, and
 * the frame loop. Post-processing (HDR bloom + ACES), the HUD, the URL
 * capture contract, and context-loss recovery attach in later commits.
 */
export class GargantuaRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.scene = new THREE.Scene();
    // Identity camera: the full-screen triangle carries its own clip-space
    // positions. The *view* camera below only feeds shader uniforms.
    this.clipCamera = new THREE.Camera();
    this.viewCamera = new THREE.PerspectiveCamera(58, 1, 0.1, 300);

    this.params = { ...DEFAULT_PARAMS };
    this.qualityKey = 'high';
    this.simTime = 0;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(FULLSCREEN_GEOMETRY_POSITIONS), 3),
    );
    this.material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: GEODESIC_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uSimTime: { value: 0 },
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3(1, 0, 0) },
        uCamUp: { value: new THREE.Vector3(0, 1, 0) },
        uCamForward: { value: new THREE.Vector3(0, 0, -1) },
        uTanHalfFov: { value: Math.tan((58 / 2) * (Math.PI / 180)) },
        uDiskInner: { value: this.params.diskInner },
        uDiskOuter: { value: this.params.diskOuter },
        uDiskHalfThickness: { value: this.params.diskHalfThickness },
        uDiskTemperature: { value: this.params.diskTemperature },
        uDiskBrightness: { value: this.params.diskBrightness },
        uOrbitalSpeedScale: { value: this.params.orbitalSpeed },
        uTurbAmplitude: { value: this.params.turbulenceAmplitude },
        uTurbSpeed: { value: this.params.turbulenceSpeed },
        uTurbOctaves: { value: QUALITY_TIERS.high.turbOctaves },
        uStarDensity: { value: this.params.starDensity },
        uGalaxyBrightness: { value: this.params.galaxyBrightness },
        uMaxSteps: { value: QUALITY_TIERS.high.maxSteps },
        uDebugView: { value: 0 },
        uDiskOnly: { value: 0 },
      },
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);

    this.rig = new CameraRig(this.viewCamera, canvas, {
      onUserInteract: () => this.handleUserInteract?.(),
      onChange: () => this.readBackCameraParams(),
    });

    // HDR post chain: geodesic HDR target → bloom → ACES composite.
    this.post = new PostChain(this.renderer);
    this.drawingSize = new THREE.Vector2();

    this.lastFrameTime = 0;
    this.frameId = 0;
    this.running = false;
    this.render = this.render.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('resize', this.handleResize);
    this.setQuality(this.qualityKey);
    this.rig.applyState({
      distance: this.params.camDistance,
      azimuth: this.params.camAzimuth,
      elevation: this.params.camElevation,
      fov: this.params.fov,
    });
  }

  /** Apply one or more live parameters from the HUD/URL/persistence layers. */
  setParams(partial) {
    for (const [key, value] of Object.entries(partial)) {
      if (!(key in this.params)) continue;
      this.params[key] = value;
      const uniform = PARAM_UNIFORMS[key];
      if (uniform) this.material.uniforms[uniform].value = value;
    }
    if ('fov' in partial) {
      this.viewCamera.fov = this.params.fov;
      this.viewCamera.updateProjectionMatrix();
    }
    if (
      'camDistance' in partial || 'camAzimuth' in partial || 'camElevation' in partial
    ) {
      this.rig.applyState({
        distance: this.params.camDistance,
        azimuth: this.params.camAzimuth,
        elevation: this.params.camElevation,
        fov: this.params.fov,
      });
    }
  }

  getParams() {
    return { ...this.params };
  }

  /** Quality tier really changes budget: step count, octaves, resolution. */
  setQuality(key) {
    const tier = QUALITY_TIERS[key];
    if (!tier) return false;
    this.qualityKey = key;
    this.material.uniforms.uMaxSteps.value = tier.maxSteps;
    this.material.uniforms.uTurbOctaves.value = tier.turbOctaves;
    this.handleResize();
    return true;
  }

  getQuality() {
    return this.qualityKey;
  }

  setDebugView(index) {
    const value = Math.max(0, Math.min(9, index | 0));
    this.material.uniforms.uDebugView.value = value;
    this.material.uniforms.uDiskOnly.value = value === 8 ? 1 : 0;
    return value;
  }

  getDebugView() {
    return this.material.uniforms.uDebugView.value;
  }

  /** Move the camera to a named preset (distance/azimuth/elevation/fov). */
  applyPreset(index) {
    const preset = CAMERA_PRESETS[index];
    if (!preset) return false;
    this.setParams({
      camDistance: preset.distance,
      camAzimuth: preset.azimuth,
      camElevation: preset.elevation,
      fov: preset.fov,
    });
    return true;
  }

  toggleCinematic() {
    return this.rig.toggleCinematic();
  }

  isCinematic() {
    return this.rig.isCinematic();
  }

  handleUserInteract() {
    // Overridden by the interaction layer in a later commit; the rig already
    // stopped the cinematic loop before calling this.
  }

  /** OrbitControls is authoritative while damping; mirror it into params. */
  readBackCameraParams() {
    // The rig fires 'change' from its own constructor before we can assign
    // this.rig; nothing to read back yet.
    if (!this.rig) return;
    const state = this.rig.getState();
    this.params.camDistance = state.distance;
    this.params.camAzimuth = state.azimuth;
    this.params.camElevation = state.elevation;
    this.params.fov = state.fov;
  }

  handleResize() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const tier = QUALITY_TIERS[this.qualityKey];
    const dpr = Math.min(window.devicePixelRatio || 1, tier.maxDpr);
    // The canvas stays at device resolution for crisp post effects; the
    // geodesic + bloom targets scale with the quality tier's renderScale.
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    const sceneW = Math.max(2, Math.round(width * dpr * tier.renderScale));
    const sceneH = Math.max(2, Math.round(height * dpr * tier.renderScale));
    this.post.setSize(sceneW, sceneH, tier.bloomMips);
    this.material.uniforms.uResolution.value.set(sceneW, sceneH);
  }

  syncCameraUniforms() {
    this.viewCamera.updateMatrixWorld();
    const e = this.viewCamera.matrixWorld.elements;
    this.material.uniforms.uCamPos.value.copy(this.viewCamera.position);
    this.material.uniforms.uCamRight.value.set(e[0], e[1], e[2]);
    this.material.uniforms.uCamUp.value.set(e[4], e[5], e[6]);
    // The view camera looks down its local −Z; forward is the negated basis.
    this.material.uniforms.uCamForward.value.set(-e[8], -e[9], -e[10]);
    this.material.uniforms.uTanHalfFov.value =
      Math.tan((this.viewCamera.fov / 2) * (Math.PI / 180));
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    this.frameId = requestAnimationFrame(this.render);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  render() {
    if (!this.running) return;
    const now = performance.now();
    const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;
    this.rig.update(dt);
    this.simTime += dt * this.params.timeScale;
    this.material.uniforms.uSimTime.value = this.simTime;
    this.syncCameraUniforms();
    this.renderer.setRenderTarget(this.post.sceneRT);
    this.renderer.render(this.scene, this.clipCamera);
    this.renderer.getDrawingBufferSize(this.drawingSize);
    this.post.render({
      params: this.params,
      simTime: this.simTime,
      debugView: this.getDebugView(),
      drawingSize: this.drawingSize,
    });
    this.frameId = requestAnimationFrame(this.render);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.rig.dispose();
    this.post.dispose();
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
