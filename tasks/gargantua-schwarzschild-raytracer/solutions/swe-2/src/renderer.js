// Renderer: Three.js scene that exists solely to feed a full-screen fragment
// shader with an orbit-driven camera, plus an HDR bloom chain and graceful
// WebGL context loss/restore.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { QUALITY_LEVELS, PRESETS } from './config.js';
import fragmentShader from './shaders/blackhole.frag.glsl?raw';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Post topology: the geodesic pass writes LINEAR HDR radiance into a
// half-float target, UnrealBloom adds, then this grade pass applies exposure +
// ACES tonemap + vignette + film grain, and OutputPass performs the sRGB
// transfer. For debug views 1-9 (already display-encoded) the grade pass is
// bypassed via uEnabled.

const GRADE_FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D tDiffuse;
  uniform float uExposure;
  uniform float uVignette;
  uniform float uGrain;
  uniform float uTime;
  uniform int uEnabled;

  vec3 aces(vec3 x) {
    const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  void main() {
    vec3 col = texture2D(tDiffuse, vUv).rgb;
    if (uEnabled == 1) {
      col *= uExposure;
      col = aces(col);
      vec2 q = vUv - 0.5;
      col *= clamp(1.0 - uVignette * dot(q, q) * 1.8, 0.0, 1.0);
      col += (hash(gl_FragCoord.xy + fract(uTime) * 917.0) - 0.5) * uGrain * 0.06;
    }
    gl_FragColor = vec4(col, 1.0);
  }
`;

export class GargantuaRenderer {
  constructor(container, state) {
    this.state = state;
    this.container = container;
    this.disposed = false;
    this.contextLost = false;
    this.ready = false;
    this.simFrozen = false; // capture mode
    this.userInteracted = false;
    this.onReady = null;
    this.onContextLost = null;
    this.onContextRestored = null;
    this.onUserInteract = null;

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.setClearColor(0x000000, 1);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(52, 1, 0.05, 400);
    this.scene = new THREE.Scene();

    // camera rig driven by OrbitControls; its basis feeds the shader
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 3.5;
    this.controls.maxDistance = 60;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('start', () => {
      this.userInteracted = true;
      this.onUserInteract?.();
    });

    this._buildPipeline();

    const canvas = this.renderer.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.contextLost = true;
      this.onContextLost?.();
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.contextLost = false;
      this._buildPipeline();
      this.resize();
      this.onContextRestored?.();
    });

    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(container);
    this.resize();

    this.clock = new THREE.Clock();
    this.renderer.setAnimationLoop(() => this.frame());
    this.framesRendered = 0;
  }

  // Build or rebuild: shader material (recompiled with quality defines),
  // scene quad, composer chain. Called on init and context restore.
  _buildPipeline() {
    const q = QUALITY_LEVELS[this.state.quality] ?? QUALITY_LEVELS.high;

    if (this.quad) {
      this.scene.remove(this.quad);
      this.quad.geometry.dispose();
      this.quad.material.dispose();
      this.quad = null;
    }
    this.composer?.dispose?.();

    const defines = {
      MAX_STEPS: q.maxSteps,
      DISK_SAMPLES: q.diskSamples,
    };
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader,
      defines,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uFov: { value: 52 },
        uCamPos: { value: new THREE.Vector3() },
        uCamRight: { value: new THREE.Vector3() },
        uCamUp: { value: new THREE.Vector3() },
        uCamFwd: { value: new THREE.Vector3(0, 0, -1) },
        uDiskInner: { value: 2.2 },
        uDiskOuter: { value: 15 },
        uDiskHalfHeight: { value: 0.16 },
        uDiskTemp: { value: 1.15 },
        uDiskEmit: { value: 1.9 },
        uOrbitSpeed: { value: 1.0 },
        uTurbAmp: { value: 0.5 },
        uTurbSpeed: { value: 0.55 },
        uStarDensity: { value: 1.0 },
        uGalaxyBright: { value: 1.0 },
        uDispersion: { value: 0.35 },
        uDebugView: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);

    // Post chain: render HDR line buffer -> bloom -> grade/output.
    // Render target must be half-float so HDR emission survives to bloom.
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      colorSpace: THREE.LinearSRGBColorSpace,
      depthBuffer: false,
      stencilBuffer: false,
    });
    this.composer = new EffectComposer(this.renderer, rt);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(size.x * q.bloomResolution, size.y * q.bloomResolution),
      q.bloomStrength,
      q.bloomRadius * 0.6,
      1.15,
    );
    this.composer.addPass(this.bloom);

    this.gradePass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uExposure: { value: 1 },
        uVignette: { value: 0.55 },
        uGrain: { value: 0.35 },
        uTime: { value: 0 },
        uEnabled: { value: 1 },
      },
      vertexShader: VERT,
      fragmentShader: GRADE_FRAG,
    });
    this.composer.addPass(this.gradePass);
    this.composer.addPass(new OutputPass());

    this.applyParams();
    this.resize();
  }

  applyParams() {
    if (!this.material) return;
    const v = this.state.values;
    const u = this.material.uniforms;
    u.uFov.value = v.fov;
    u.uDiskInner.value = v.diskInner;
    u.uDiskOuter.value = v.diskOuter;
    u.uDiskHalfHeight.value = v.diskHalfHeight;
    u.uDiskTemp.value = v.diskTemp;
    u.uDiskEmit.value = v.diskEmit;
    u.uOrbitSpeed.value = v.orbitSpeed;
    u.uTurbAmp.value = v.turbAmp;
    u.uTurbSpeed.value = v.turbSpeed;
    u.uStarDensity.value = v.starDensity;
    u.uGalaxyBright.value = v.galaxyBright;
    u.uDispersion.value = this.simFrozen ? 0.0 : v.dispersion;
    u.uDebugView.value = this.state.debug;

    this.bloom.strength = v.bloomStrength;
    this.bloom.threshold = v.bloomThreshold;
    // bloom hurts several diagnostics (steps/mask/crossings); keep it on the
    // composite and the sky/radiance views where it is meaningful.
    this.bloom.enabled = [0, 6, 7, 8].includes(this.state.debug);

    this.gradePass.uniforms.uExposure.value = v.exposure;
    this.gradePass.uniforms.uVignette.value = v.vignette;
    this.gradePass.uniforms.uGrain.value = v.grain;
    this.gradePass.uniforms.uEnabled.value = this.state.debug === 0 ? 1 : 0;

    this.camera.fov = v.fov;
    this.camera.updateProjectionMatrix();
    this.controls.minDistance = Math.min(3.5, v.camDistance);
  }

  applyPreset(index, { keepFov = false } = {}) {
    const p = PRESETS[index];
    if (!p) return;
    if (!keepFov) this.state.values.fov = p.fov;
    this.state.values.camDistance = p.dist;
    this.state.values.camAzimuth = p.azimuth;
    this.state.values.camElevation = p.elevation;
    this.syncCameraFromState();
    this.applyParams();
  }

  // Position camera on the sphere described by the spherical params.
  syncCameraFromState() {
    const v = this.state.values;
    const r = v.camDistance;
    const el = v.camElevation;
    const az = v.camAzimuth;
    this.camera.position.set(
      r * Math.cos(el) * Math.sin(az),
      r * Math.sin(el),
      r * Math.cos(el) * Math.cos(az),
    );
    this.camera.fov = v.fov;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  // Camera moved by OrbitControls -> reflect back into spherical params
  // (without saving on every micro-delta; HUD reads live values anyway).
  syncStateFromCamera() {
    const p = this.camera.position;
    const r = p.length();
    const v = this.state.values;
    v.camDistance = r;
    v.camElevation = Math.asin(THREE.MathUtils.clamp(p.y / r, -1, 1));
    v.camAzimuth = Math.atan2(p.x, p.z);
  }

  resize() {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    const q = QUALITY_LEVELS[this.state.quality] ?? QUALITY_LEVELS.high;
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * q.renderScale;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.composer?.setSize(size.x, size.y);
    this.material?.uniforms.uResolution.value.set(size.x, size.y);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setQuality(level) {
    // recompile shader with the new step budget, rebuild targets
    this._buildPipeline();
  }

  frame() {
    if (this.disposed || this.contextLost) return;
    if (!this.material || !this.composer) return;

    // cinematic loop: slow orbital drift when the user hasn't grabbed the rig
    const dt = Math.min(this.clock.getDelta(), 0.1);
    if (!this.simFrozen) this.state.simTime += dt * this.state.values.timeScale;

    if (this.state.cinematic && !this.userInteracted) {
      const v = this.state.values;
      const t = this.state.simTime * 0.05;
      const az = v.camAzimuth + t * 0.35;
      const el = v.camElevation + Math.sin(t * 0.6) * 0.18;
      const r = v.camDistance * (1 + 0.12 * Math.sin(t * 0.23));
      this.camera.position.set(
        r * Math.cos(el) * Math.sin(az),
        r * Math.sin(el),
        r * Math.cos(el) * Math.cos(az),
      );
      this.camera.lookAt(0, 0, 0);
      this.controls.update();
    } else {
      this.controls.update();
      this.syncStateFromCamera();
    }

    // feed camera basis to the shader
    const u = this.material.uniforms;
    u.uTime.value = this.state.simTime;
    u.uCamPos.value.copy(this.camera.position);
    const m = this.camera.matrixWorld;
    u.uCamRight.value.set(m.elements[0], m.elements[1], m.elements[2]).normalize();
    u.uCamUp.value.set(m.elements[4], m.elements[5], m.elements[6]).normalize();
    u.uCamFwd.value.set(-m.elements[8], -m.elements[9], -m.elements[10]).normalize();
    this.gradePass.uniforms.uTime.value = this.state.simTime;

    // Mark ready once the first render call has been issued — the WebGL
    // pipeline is then compiled and the first presentable frame is on its way.
    // This keeps the automation contract responsive even on slow GPUs.
    if (!this.ready) {
      this.ready = true;
      this.onReady?.();
    }
    // capture mode: render a couple of warm frames (one to compile, one to
    // present), then park the loop so the frozen frame stays put and the GPU
    // is free for the caller's own screenshot timing.
    if (this.simFrozen && this.framesRendered >= 2) {
      this.renderer.setAnimationLoop(null);
    }
    this.composer.render();
    this.framesRendered++;
  }

  // Re-enter the animation loop after capture mode is lifted.
  resumeLoop() {
    this.renderer.setAnimationLoop(() => this.frame());
  }

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this._ro.disconnect();
    this.controls.dispose();
    this.quad?.geometry.dispose();
    this.quad?.material.dispose();
    this.composer?.dispose?.();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
