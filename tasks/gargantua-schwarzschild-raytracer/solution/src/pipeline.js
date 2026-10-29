import { fullscreenTriangle } from './shaders/fullscreen.js';
import { brightPassShader, blurShader, compositeShader, copyFragmentShader } from './shaders/post.js';

// 渲染管线：全屏 fragment shader 逐像素积分测地线 → HDR 目标 →
// 亮部提取 → 四级高斯模糊金字塔 → 合成（ACES + 暗角 + 颗粒 + 色散）。
//
// 质量档真实改变预算：内部分辨率比例、测地线最大步数、盘面采样数、
// Bloom 金字塔层数与后处理分辨率。

export const QUALITY_PRESETS = {
  standard: { label: 'Standard', scale: 0.55, maxSteps: 220, diskSamples: 3, bloomLevels: 3, dprCap: 1.0 },
  high: { label: 'High', scale: 0.8, maxSteps: 380, diskSamples: 4, bloomLevels: 4, dprCap: 1.5 },
  cinematic: { label: 'Cinematic', scale: 1.0, maxSteps: 620, diskSamples: 6, bloomLevels: 5, dprCap: 2.0 },
};

export class RenderPipeline {
  constructor(THREE, renderer, shaderMaterial, quality = 'high') {
    this.THREE = THREE;
    this.renderer = renderer;
    this.blackHole = shaderMaterial;
    this.quality = quality;
    this.width = 1;
    this.height = 1;
    this.dpr = 1;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(fullscreenTriangle, this.blackHole);
    this.quad.frustumCulled = false;
    this.scene.add(this.quad);
    this.bloomLevels = [];
    this.targets = null;
    this.brightMaterial = new THREE.ShaderMaterial({
      vertexShader: blackHoleVertex(),
      fragmentShader: brightPassShader,
      uniforms: {
        uScene: { value: null },
        uThreshold: { value: 1.0 },
        uKnee: { value: 0.6 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.blurMaterial = new THREE.ShaderMaterial({
      vertexShader: blackHoleVertex(),
      fragmentShader: blurShader,
      uniforms: {
        uSource: { value: null },
        uDirection: { value: new THREE.Vector2(0, 0) },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.copyMaterial = new THREE.ShaderMaterial({
      vertexShader: blackHoleVertex(),
      fragmentShader: copyFragmentShader,
      uniforms: {
        uScene: { value: null },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: blackHoleVertex(),
      fragmentShader: compositeShader,
      uniforms: {
        uScene: { value: null },
        uBloom: { value: null },
        uBloomStrength: { value: 0.85 },
        uExposure: { value: 1.0 },
        uVignette: { value: 0.35 },
        uGrain: { value: 0.025 },
        uChromatic: { value: 0.6 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.quad.material = this.brightMaterial;
    this.quad.visible = false;
    this.quad2 = new THREE.Mesh(fullscreenTriangle, this.blurMaterial);
    this.quad2.frustumCulled = false;
    this.quad2.visible = false;
    this.quad3 = new THREE.Mesh(fullscreenTriangle, this.compositeMaterial);
    this.quad3.frustumCulled = false;
    this.quad3.visible = false;
    this.scene.add(this.quad2, this.quad3);
    this.resize(1, 1, 1);
  }

  setQuality(quality) {
    if (!QUALITY_PRESETS[quality]) return;
    this.quality = quality;
    this.resize(this.cssWidth ?? this.width, this.cssHeight ?? this.height, this.dpr);
  }

  get budget() {
    return QUALITY_PRESETS[this.quality];
  }

  resize(cssWidth, cssHeight, devicePixelRatio) {
    const budget = this.budget;
    this.cssWidth = cssWidth;
    this.cssHeight = cssHeight;
    this.dpr = Math.min(devicePixelRatio || 1, budget.dprCap);
    this.width = Math.max(2, Math.round(cssWidth * budget.scale * this.dpr));
    this.height = Math.max(2, Math.round(cssHeight * budget.scale * this.dpr));
    this.disposeTargets();

    const THREE = this.THREE;
    const make = (w, h, type) =>
      new THREE.WebGLRenderTarget(w, h, {
        type: type ?? THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
        colorSpace: THREE.NoColorSpace,
      });

    this.targets = {
      hdr: make(this.width, this.height),
    };
    this.bloomLevels = [];
    let w = this.width;
    let h = this.height;
    for (let i = 0; i < budget.bloomLevels; i += 1) {
      w = Math.max(2, Math.round(w / 2));
      h = Math.max(2, Math.round(h / 2));
      this.bloomLevels.push({ a: make(w, h, THREE.UnsignedByteType), b: make(w, h, THREE.UnsignedByteType), w, h });
    }
    this.renderer.setSize(cssWidth, cssHeight, false);
  }

  disposeTargets() {
    if (this.targets) this.targets.hdr.dispose();
    for (const level of this.bloomLevels) {
      level.a.dispose();
      level.b.dispose();
    }
    this.targets = null;
    this.bloomLevels = [];
  }

  render(uniformValues) {
    const renderer = this.renderer;
    const budget = this.budget;

    // 主通道：全屏测地线积分，输出线性 HDR
    this.blackHole.uniforms.uMaxSteps.value = budget.maxSteps;
    this.blackHole.uniforms.uDiskSamples.value = budget.diskSamples;
    this.blackHole.uniforms.uResolution.value.set(this.width, this.height);
    this.blackHole.uniforms.uTime.value = uniformValues.time;

    this.quad.material = this.blackHole;
    this.quad.visible = true;
    this.quad2.visible = false;
    this.quad3.visible = false;
    renderer.setRenderTarget(this.targets.hdr);
    renderer.clear();
    renderer.render(this.scene, this.camera);

    // 亮部提取
    this.quad.material = this.brightMaterial;
    this.quad.visible = false;
    this.quad2.visible = true;
    this.brightMaterial.uniforms.uScene.value = this.targets.hdr.texture;
    this.brightMaterial.uniforms.uThreshold.value = uniformValues.bloomThreshold;
    this.brightMaterial.uniforms.uKnee.value = Math.max(0.05, uniformValues.bloomThreshold * 0.5);
    renderer.setRenderTarget(this.bloomLevels[0].a);
    renderer.render(this.scene, this.camera);

    // 高斯模糊金字塔：每层先横后纵，再向下采样
    let source = this.bloomLevels[0].a;
    for (let i = 0; i < this.bloomLevels.length; i += 1) {
      const level = this.bloomLevels[i];
      if (i > 0) {
        // 从上一层结果向下采样
        this.blurMaterial.uniforms.uSource.value = this.bloomLevels[i - 1].a.texture;
        this.blurMaterial.uniforms.uDirection.value.set(0, 0);
        renderer.setRenderTarget(level.a);
        renderer.render(this.scene, this.camera);
        source = level.a;
      }
      this.blurMaterial.uniforms.uSource.value = source.texture;
      this.blurMaterial.uniforms.uDirection.value.set(1 / level.w, 0);
      renderer.setRenderTarget(level.b);
      renderer.render(this.scene, this.camera);

      this.blurMaterial.uniforms.uSource.value = level.b.texture;
      this.blurMaterial.uniforms.uDirection.value.set(0, 1 / level.h);
      renderer.setRenderTarget(level.a);
      renderer.render(this.scene, this.camera);
    }

    // 合成到屏幕
    this.quad2.visible = false;
    this.quad3.visible = true;
    const composite = this.compositeMaterial.uniforms;
    composite.uScene.value = this.targets.hdr.texture;
    composite.uBloom.value = this.bloomLevels[this.bloomLevels.length - 1].a.texture;
    composite.uBloomStrength.value = uniformValues.bloomStrength;
    composite.uExposure.value = uniformValues.exposure;
    composite.uVignette.value = uniformValues.vignette;
    composite.uGrain.value = uniformValues.grain;
    composite.uChromatic.value = uniformValues.chromatic;
    composite.uTime.value = uniformValues.time;
    composite.uResolution.value.set(this.width, this.height);
    renderer.setRenderTarget(null);
    renderer.render(this.scene, this.camera);
    this.quad3.visible = false;
  }

  // 调试通道：主 shader 写 HDR 目标后直接呈现，跳过 Bloom 与 tone mapping。
  renderDebug() {
    const budget = this.budget;
    this.blackHole.uniforms.uMaxSteps.value = budget.maxSteps;
    this.blackHole.uniforms.uDiskSamples.value = budget.diskSamples;
    this.blackHole.uniforms.uResolution.value.set(this.width, this.height);
    this.quad.material = this.blackHole;
    this.quad.visible = true;
    this.quad2.visible = false;
    this.quad3.visible = false;
    this.renderer.setRenderTarget(this.targets.hdr);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.quad.visible = false;

    // 直接拷贝到屏幕：调试色已在 shader 内做过 sRGB 编码，
    // 这里用最简单的直通材质，避免任何 tone mapping 参与。
    this.copyMaterial.uniforms.uScene.value = this.targets.hdr.texture;
    this.quad3.material = this.copyMaterial;
    this.quad3.visible = true;
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.quad3.visible = false;
  }

  // 调试直出：HDR 目标 → 屏幕。诊断色已在 shader 内做过 sRGB 编码，
  // 这里只做恒等拷贝（合成 shader 的 exposure/vignette/grain/chromatic 全部归零）。
  presentDebug() {
    const renderer = this.renderer;
    const c = this.compositeMaterial.uniforms;
    c.uScene.value = this.targets.hdr.texture;
    c.uBloom.value = this.targets.hdr.texture;
    c.uBloomStrength.value = 0;
    c.uExposure.value = 0;
    c.uVignette.value = 0;
    c.uGrain.value = 0;
    c.uChromatic.value = 0;
    c.uTime.value = 0;
    c.uResolution.value.set(this.width, this.height);
    this.quad.visible = false;
    this.quad2.visible = false;
    this.quad3.material = this.compositeMaterial;
    this.quad3.visible = true;
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(this.scene, this.camera);
    this.quad3.visible = false;
  }

  dispose() {
    this.disposeTargets();
    this.brightMaterial.dispose();
    this.blurMaterial.dispose();
    this.compositeMaterial.dispose();
  }
}

function blackHoleVertex() {
  return /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `;
}
