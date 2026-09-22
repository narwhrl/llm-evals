// 后处理管线装配：法线深度 → 颜色 → Bloom → 描边/夜空合成 → 输出。
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { NormalDepthPass } from './normalDepthPass.js';
import { createCompositeShader } from './compositeShader.js';

export function createPostPipeline({ renderer, scene, camera }) {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());

  const colorTarget = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: 2,
    generateMipmaps: false,
  });
  const composer = new EffectComposer(renderer, colorTarget);

  // 描边取样与泛光都用半分辨率：视觉上几乎无损，但在集成显卡上省下大量像素填充。
  const normalPass = new NormalDepthPass(scene, camera, size, 0.5);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.x * 0.5, size.y * 0.5), 0.5, 0.6, 0.72);
  const compositePass = new ShaderPass(createCompositeShader());
  const outputPass = new OutputPass();

  compositePass.uniforms.tNormal.value = normalPass.texture;
  compositePass.uniforms.tDepth.value = normalPass.depthTexture;
  compositePass.uniforms.uNear.value = camera.near;
  compositePass.uniforms.uFar.value = camera.far;
  compositePass.uniforms.uResolution.value.set(size.x, size.y);

  composer.addPass(normalPass);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(compositePass);
  composer.addPass(outputPass);

  return {
    composer,
    normalPass,
    bloomPass,
    compositePass,
    render(deltaTime) {
      composer.render(deltaTime);
    },
    setSize(width, height) {
      composer.setSize(width, height);
      const buffer = renderer.getDrawingBufferSize(new THREE.Vector2());
      compositePass.uniforms.uResolution.value.set(buffer.x, buffer.y);
    },
  };
}
