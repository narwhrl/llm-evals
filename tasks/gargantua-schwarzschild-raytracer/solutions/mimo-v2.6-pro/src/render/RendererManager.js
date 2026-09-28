// 渲染管理器：WebGL renderer + 全屏 raytracer 场景 + HDR 后处理链
// （RenderPass → UnrealBloomPass → final ShaderPass）+ 质量档预算 + WebGL 上下文恢复。
import * as THREE from '../../vendor/three/three.module.js';
import { OrbitControls } from '../../vendor/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../../vendor/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../vendor/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../../vendor/three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from '../../vendor/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { createFullscreenTriangle, createRaytracerMaterial, createFinalMaterial } from './fullscreen.js';
import { QUALITY_LEVELS, DEFAULT_QUALITY } from '../state/defaults.js';

const DEG = Math.PI / 180;

export default class RendererManager {
  constructor(container) {
    this.container = container;
    this.quality = DEFAULT_QUALITY;
    this.debugView = 0;
    this.status = 'normal'; // normal | lost | restored
    this.onStatusChange = null;
    this.running = true;
    this.params = null;
    this._restoredTimer = 0;
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // 全链路手动线性 → ACES → sRGB
    this.renderer.domElement.className = 'gargantua-canvas';
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, this.width / Math.max(this.height, 1), 0.1, 3000);
    this.rayMaterial = createRaytracerMaterial();
    this.mesh = new THREE.Mesh(createFullscreenTriangle(), this.rayMaterial);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = false;
    this.controls.minDistance = 5.5;
    this.controls.maxDistance = 60;

    this._onLost = (e) => {
      e.preventDefault(); // 必须阻止默认行为，浏览器才会派发 webglcontextrestored
      this.running = false;
      this._setStatus('lost');
    };
    this._onRestored = () => {
      this.rebuildPipeline();
      this._setStatus('restored');
      this.running = true;
      clearTimeout(this._restoredTimer);
      this._restoredTimer = setTimeout(() => this._setStatus('normal'), 2000);
    };
    this.renderer.domElement.addEventListener('webglcontextlost', this._onLost, false);
    this.renderer.domElement.addEventListener('webglcontextrestored', this._onRestored, false);
    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    window.addEventListener('orientationchange', this._onResize);

    this.buildPipeline();
    this.resize();
    return this;
  }

  // ------------------------------------------------------------ 质量档与尺寸
  qualityBudget() {
    return QUALITY_LEVELS[this.quality];
  }

  pixelRatio() {
    const q = this.qualityBudget();
    return Math.min(window.devicePixelRatio || 1, q.dprCap) * q.renderScale;
  }

  setQuality(level) {
    if (!QUALITY_LEVELS[level]) return false;
    this.quality = level;
    this._applyQualityUniforms();
    this.resize();
    return true;
  }

  _applyQualityUniforms() {
    const q = this.qualityBudget();
    this.rayMaterial.uniforms.uMaxSteps.value = q.maxSteps;
    this.rayMaterial.uniforms.uMaxCrossings.value = q.maxCrossings;
    this.rayMaterial.uniforms.uOctaves.value = q.octaves;
    if (this.finalPass) this.finalPass.material.uniforms.uCATaps.value = q.caTaps;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const q = this.qualityBudget();
    const px = this.pixelRatio();
    this.camera.aspect = this.width / Math.max(this.height, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(px);
    this.renderer.setSize(this.width, this.height);
    if (this.composer) {
      this.composer.setPixelRatio(px);
      this.composer.setSize(this.width, this.height);
      // EffectComposer.setSize 会把 bloom 内部目标重设为全分辨率，恢复质量档缩放
      this.bloomPass.setSize(
        Math.max(1, Math.round(this.width * px * q.bloomScale)),
        Math.max(1, Math.round(this.height * px * q.bloomScale)),
      );
    }
    this.rayMaterial.uniforms.uAspect.value = this.camera.aspect;
    if (this.finalPass) this.finalPass.material.uniforms.uAspect.value = this.camera.aspect;
  }

  // ------------------------------------------------------------ 后处理管线
  buildPipeline() {
    const q = this.qualityBudget();
    const px = this.pixelRatio();
    const w = Math.max(1, Math.round(this.width * px));
    const h = Math.max(1, Math.round(this.height * px));

    const hdrTarget = new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      depthBuffer: true,
      stencilBuffer: false,
    });
    hdrTarget.texture.colorSpace = THREE.NoColorSpace;

    this.composer = new EffectComposer(this.renderer, hdrTarget);
    this.composer.setPixelRatio(px);
    this.composer.setSize(this.width, this.height);

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(Math.max(1, Math.round(w * q.bloomScale)), Math.max(1, Math.round(h * q.bloomScale))),
      0.7,
      0.55,
      0.85,
    );
    this.finalPass = new ShaderPass(createFinalMaterial());
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.finalPass);
    this.bloomPass.setSize(
      Math.max(1, Math.round(w * q.bloomScale)),
      Math.max(1, Math.round(h * q.bloomScale)),
    );
    this._applyQualityUniforms();
    if (this.params) this.applyParams(this.params);
  }

  disposePipeline() {
    if (!this.composer) return;
    for (const pass of [this.finalPass, this.bloomPass, this.renderPass]) {
      if (pass && pass.dispose) pass.dispose();
    }
    this.composer.renderTarget1.dispose();
    this.composer.renderTarget2.dispose();
    this.composer.dispose();
    this.composer = null;
    this.renderPass = null;
    this.bloomPass = null;
    this.finalPass = null;
  }

  // WebGL 上下文恢复后重建 renderer/target/material 所需资源并恢复状态
  rebuildPipeline() {
    this.disposePipeline();
    this.rayMaterial.needsUpdate = true;
    this.buildPipeline();
    this.resize();
  }

  // ------------------------------------------------------------ 参数 / 相机
  applyParams(params) {
    this.params = params;
    const u = this.rayMaterial.uniforms;
    u.uDiskInner.value = params.diskInner;
    u.uDiskOuter.value = params.diskOuter;
    u.uDiskHalfH.value = params.diskThickness;
    u.uDiskTemp.value = params.diskTemp;
    u.uDiskEmission.value = params.diskEmission;
    u.uOrbitSpeed.value = params.orbitSpeed;
    u.uTurbAmp.value = params.turbAmp;
    u.uTurbSpeed.value = params.turbSpeed;
    u.uStarDensity.value = params.starDensity;
    u.uGalaxyBright.value = params.galaxyBright;
    if (this.finalPass) {
      const f = this.finalPass.material.uniforms;
      f.uExposure.value = params.exposure;
      f.uVignette.value = params.vignette;
      f.uGrain.value = params.grain;
      f.uChroma.value = params.chroma;
    }
    if (this.bloomPass) {
      this.bloomPass.strength = params.bloomStrength;
      this.bloomPass.threshold = params.bloomThreshold;
    }
  }

  setCameraSpherical({ camDist, camAzimuth, camElevation, fov }) {
    const el = camElevation * DEG;
    const az = camAzimuth * DEG;
    this.camera.position.set(
      camDist * Math.cos(el) * Math.cos(az),
      camDist * Math.sin(el),
      camDist * Math.cos(el) * Math.sin(az),
    );
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.syncCameraUniforms();
  }

  getCameraSpherical() {
    const p = this.camera.position;
    const camDist = p.length();
    const camElevation = Math.asin(THREE.MathUtils.clamp(p.y / Math.max(camDist, 1e-6), -1, 1)) / DEG;
    let camAzimuth = Math.atan2(p.z, p.x) / DEG;
    if (camAzimuth < 0) camAzimuth += 360;
    return { camDist, camAzimuth, camElevation, fov: this.camera.fov };
  }

  syncCameraUniforms() {
    this.camera.updateMatrixWorld();
    const m = this.camera.matrixWorld.elements;
    const u = this.rayMaterial.uniforms;
    u.uCamPos.value.set(m[12], m[13], m[14]);
    u.uCamRight.value.set(m[0], m[1], m[2]);
    u.uCamUp.value.set(m[4], m[5], m[6]);
    u.uCamForward.value.set(-m[8], -m[9], -m[10]);
    u.uTanHalfFov.value = Math.tan((this.camera.fov * Math.PI) / 360);
    u.uAspect.value = this.camera.aspect;
  }

  setDebugView(index) {
    const n = Number(index);
    if (!Number.isInteger(n) || n < 0 || n > 9) return false;
    this.debugView = n;
    this.rayMaterial.uniforms.uDebugView.value = n;
    return true;
  }

  // ------------------------------------------------------------ 帧渲染
  renderFrame(simTime) {
    if (!this.running) return;
    this.controls.update();
    this.syncCameraUniforms();
    this.rayMaterial.uniforms.uSimTime.value = simTime;
    if (this.finalPass) this.finalPass.material.uniforms.uTime.value = simTime;
    if (this.debugView !== 0) {
      this.renderer.setRenderTarget(null); // 调试视图直通屏幕（仅 shader 内线性→sRGB）
      this.renderer.render(this.scene, this.camera);
    } else {
      this.composer.render();
    }
  }

  _setStatus(status) {
    this.status = status;
    if (this.onStatusChange) this.onStatusChange(status);
  }

  dispose() {
    clearTimeout(this._restoredTimer);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('orientationchange', this._onResize);
    this.renderer.domElement.removeEventListener('webglcontextlost', this._onLost, false);
    this.renderer.domElement.removeEventListener('webglcontextrestored', this._onRestored, false);
    this.disposePipeline();
    this.controls.dispose();
    this.rayMaterial.dispose();
    this.mesh.geometry.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
