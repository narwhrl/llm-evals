import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { VERT_QUAD, FRAG_GEODESIC, FRAG_BRIGHT, FRAG_BLUR, FRAG_COMPOSITE } from './shaders.js';
import { QUALITY } from './state.js';

const v3 = () => new THREE.Vector3();

// Owns the WebGL renderer, the OrbitControls camera whose state feeds the shader,
// the HDR render targets and the multi-pass post chain. React never touches GL.
export class GargantuaRenderer {
  constructor(canvas, callbacks = {}) {
    this.callbacks = callbacks;
    this.contextLost = false;
    this.quality = 'high';
    this.blurIters = 2;
    this.size = null;

    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: false, alpha: false, powerPreference: 'high-performance',
    });
    const gl = this.renderer.getContext();
    const hdrOk = !!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'));
    this.hdrOk = hdrOk;
    this.hdrType = hdrOk ? THREE.HalfFloatType : THREE.UnsignedByteType;

    // OrbitControls owns the only 3D camera; its position/orientation/FOV are
    // read every frame and passed to the fragment shader as ray inputs.
    this.viewCamera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    this.viewCamera.position.set(0, 3, 16);
    this.viewCamera.lookAt(0, 0, 0);
    this.controls = new OrbitControls(this.viewCamera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 4.5;
    this.controls.maxDistance = 55;
    this.controls.minPolarAngle = 0.02;
    this.controls.maxPolarAngle = Math.PI - 0.02;
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 0.45;
    this.controls.target.set(0, 0, 0);

    this.quadCamera = new THREE.Camera();
    this.quadScene = new THREE.Scene();
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);

    this.uGeodesic = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uCamPos: { value: v3() }, uCamRight: { value: v3() },
      uCamUp: { value: v3() }, uCamForward: { value: v3() },
      uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(55) / 2) },
      uAspect: { value: 1 },
      uDiskInner: { value: 2.8 }, uDiskOuter: { value: 11 },
      uDiskThickness: { value: 0.26 }, uDiskTemp: { value: 1 },
      uEmission: { value: 1.5 }, uOrbitSpeed: { value: 1 },
      uTurbAmp: { value: 0.85 }, uTurbSpeed: { value: 1 },
      uStarDensity: { value: 150 }, uGalaxy: { value: 1 },
      uDebug: { value: 0 }, uMaxSteps: { value: 240 },
      uDPhi: { value: 0.032 }, uNoiseOctaves: { value: 3 },
    };
    this.uBright = { tDiffuse: { value: null }, uThreshold: { value: 1.05 } };
    this.uBlur = { tDiffuse: { value: null }, uTexel: { value: new THREE.Vector2(1, 1) },
      uDir: { value: new THREE.Vector2(1, 0) }, uRadius: { value: 1 } };
    this.uComposite = {
      tScene: { value: null }, tBloom: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) }, uAspect: { value: 1 },
      uBloomStrength: { value: 0.85 }, uExposure: { value: 1.15 },
      uVignette: { value: 0.5 }, uGrain: { value: 0.3 },
      uChromatic: { value: 0.5 }, uTime: { value: 0 }, uDebug: { value: 0 },
    };

    const mat = (fragmentShader, uniforms) => new THREE.ShaderMaterial({
      vertexShader: VERT_QUAD, fragmentShader, uniforms,
      depthTest: false, depthWrite: false,
    });
    this.matGeodesic = mat(FRAG_GEODESIC, this.uGeodesic);
    this.matBright = mat(FRAG_BRIGHT, this.uBright);
    this.matBlur = mat(FRAG_BLUR, this.uBlur);
    this.matComposite = mat(FRAG_COMPOSITE, this.uComposite);
    this.materials = [this.matGeodesic, this.matBright, this.matBlur, this.matComposite];

    this.rebuildTargets();

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.contextLost = true;                 // render loop pauses, HUD shows recoverable state
      this.callbacks.onContextLost?.();
    });
    canvas.addEventListener('webglcontextrestored', () => {
      // Three reinitialises its own GL state; rebuild our targets and force
      // shader recompilation. Persisted state lives in React/localStorage and
      // is unaffected, so rendering simply continues with the same state.
      this.rebuildTargets();
      for (const m of this.materials) m.needsUpdate = true;
      this.contextLost = false;
      this.callbacks.onContextRestored?.();
    });
  }

  makeTarget() {
    return new THREE.WebGLRenderTarget(2, 2, {
      type: this.hdrType, format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: false, stencilBuffer: false,
    });
  }

  rebuildTargets() {
    if (this.rtScene) {
      this.rtScene.dispose(); this.rtBrightA.dispose(); this.rtBrightB.dispose();
    }
    this.rtScene = this.makeTarget();
    this.rtBrightA = this.makeTarget();
    this.rtBrightB = this.makeTarget();
    this.rtScene.texture.name = 'gargantua.scene';
    this.rtBrightA.texture.name = 'gargantua.bloomA';
    this.rtBrightB.texture.name = 'gargantua.bloomB';
    if (this.size) {
      const s = this.size;
      this.rtScene.setSize(s.sw, s.sh);
      this.rtBrightA.setSize(s.bw2, s.bh2);
      this.rtBrightB.setSize(s.bw2, s.bh2);
    }
  }

  resize(w, h, quality = this.quality) {
    w = Math.max(2, Math.floor(w)); h = Math.max(2, Math.floor(h));
    this.quality = quality;
    const q = QUALITY[quality] || QUALITY.high;
    const dpr = Math.min(window.devicePixelRatio || 1, q.dprCap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    const bw = Math.max(2, Math.round(w * dpr)), bh = Math.max(2, Math.round(h * dpr));
    const sw = Math.max(2, Math.round(bw * q.scale)), sh = Math.max(2, Math.round(bh * q.scale));
    const bw2 = Math.max(2, Math.round(sw / 2)), bh2 = Math.max(2, Math.round(sh / 2));
    this.size = { w, h, bw, bh, sw, sh, bw2, bh2 };
    this.rtScene.setSize(sw, sh);
    this.rtBrightA.setSize(bw2, bh2);
    this.rtBrightB.setSize(bw2, bh2);
    this.viewCamera.aspect = w / h;
    this.viewCamera.updateProjectionMatrix();
    this.blurIters = q.blurIters;
  }

  setQuality(quality) {
    this.resize(this.size?.w || window.innerWidth, this.size?.h || window.innerHeight, quality);
  }

  setCameraFromParams(p) {
    const az = THREE.MathUtils.degToRad(p.azimuth);
    const el = THREE.MathUtils.degToRad(p.elevation);
    const r = p.distance;
    this.viewCamera.up.set(0, 1, 0);
    this.viewCamera.position.set(
      r * Math.cos(el) * Math.cos(az),
      r * Math.sin(el),
      r * Math.cos(el) * Math.sin(az),
    );
    this.viewCamera.lookAt(0, 0, 0);
    this.viewCamera.fov = p.fov;
    this.viewCamera.updateProjectionMatrix();
    this.controls.update();
  }

  getCameraParams() {
    const p = this.viewCamera.position;
    const r = Math.max(p.length(), 0.001);
    return {
      distance: r,
      elevation: THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(p.y / r, -1, 1))),
      azimuth: THREE.MathUtils.radToDeg(Math.atan2(p.z, p.x)),
    };
  }

  setAutoRotate(on) { this.controls.autoRotate = !!on; }

  renderPass(material, target) {
    this.quad.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  render(state, simTime) {
    const p = state.params;
    const q = QUALITY[state.quality] || QUALITY.high;
    const g = this.uGeodesic;
    const s = this.size;
    const q4 = this.viewCamera.quaternion;

    g.uCamPos.value.copy(this.viewCamera.position);
    g.uCamRight.value.set(1, 0, 0).applyQuaternion(q4);
    g.uCamUp.value.set(0, 1, 0).applyQuaternion(q4);
    g.uCamForward.value.set(0, 0, -1).applyQuaternion(q4);
    g.uTanHalfFov.value = Math.tan(THREE.MathUtils.degToRad(p.fov) / 2);
    g.uAspect.value = s.sw / s.sh;
    g.uResolution.value.set(s.sw, s.sh);
    g.uTime.value = simTime;
    g.uDiskInner.value = p.diskInner; g.uDiskOuter.value = p.diskOuter;
    g.uDiskThickness.value = p.diskThickness; g.uDiskTemp.value = p.diskTemp;
    g.uEmission.value = p.emission; g.uOrbitSpeed.value = p.orbitSpeed;
    g.uTurbAmp.value = p.turbAmp; g.uTurbSpeed.value = p.turbSpeed;
    g.uStarDensity.value = p.starDensity; g.uGalaxy.value = p.galaxy;
    g.uDebug.value = state.debug;
    g.uMaxSteps.value = q.maxSteps; g.uDPhi.value = q.dphi;
    g.uNoiseOctaves.value = q.noiseOctaves;

    this.uBright.uThreshold.value = this.hdrOk ? p.bloomThreshold : Math.min(p.bloomThreshold, 0.7);
    const c = this.uComposite;
    c.uBloomStrength.value = p.bloomStrength; c.uExposure.value = p.exposure;
    c.uVignette.value = p.vignette; c.uGrain.value = p.grain;
    c.uChromatic.value = p.chromatic; c.uTime.value = simTime;
    c.uDebug.value = state.debug; c.uAspect.value = s.w / s.h;
    c.uResolution.value.set(s.bw, s.bh);
    this.uBlur.uTexel.value.set(1 / s.bw2, 1 / s.bh2);

    this.renderPass(this.matGeodesic, this.rtScene);
    this.uBright.tDiffuse.value = this.rtScene.texture;
    this.renderPass(this.matBright, this.rtBrightA);
    if (state.debug === 0) {
      for (let i = 0; i < this.blurIters; i++) {
        this.uBlur.tDiffuse.value = this.rtBrightA.texture;
        this.uBlur.uDir.value.set(1, 0);
        this.uBlur.uRadius.value = 1.0 + i * 0.65;
        this.renderPass(this.matBlur, this.rtBrightB);
        this.uBlur.tDiffuse.value = this.rtBrightB.texture;
        this.uBlur.uDir.value.set(0, 1);
        this.renderPass(this.matBlur, this.rtBrightA);
      }
    }
    c.tScene.value = this.rtScene.texture;
    c.tBloom.value = this.rtBrightA.texture;
    this.renderPass(this.matComposite, null);
  }

  dispose() {
    this.controls.dispose();
    this.rtScene.dispose(); this.rtBrightA.dispose(); this.rtBrightB.dispose();
    this.quad.geometry.dispose();
    for (const m of this.materials) m.dispose();
    this.renderer.dispose();
  }
}
