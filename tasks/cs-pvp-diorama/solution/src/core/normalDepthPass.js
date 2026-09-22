// 描边辅助 pass：用覆盖材质把视图空间法线写进 rgb、把深度写进深度纹理。
import * as THREE from 'three';
import { Pass } from 'three/addons/postprocessing/Pass.js';
import { LAYER_MASK } from './stage.js';

export class NormalDepthPass extends Pass {
  constructor(scene, camera, size, scale = 1) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.scale = scale;
    this.needsSwap = false;

    this.normalMaterial = new THREE.MeshNormalMaterial({ side: THREE.FrontSide });

    const width = Math.max(1, Math.floor(size.x * scale));
    const height = Math.max(1, Math.floor(size.y * scale));
    this.renderTarget = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      type: THREE.HalfFloatType,
      depthBuffer: true,
      generateMipmaps: false,
    });
    this.renderTarget.depthTexture = new THREE.DepthTexture(width, height);
    this.renderTarget.depthTexture.format = THREE.DepthFormat;
    this.renderTarget.depthTexture.type = THREE.UnsignedIntType;
    this.renderTarget.depthTexture.minFilter = THREE.NearestFilter;
    this.renderTarget.depthTexture.magFilter = THREE.NearestFilter;

    // 特效层与地面之外的物体不参与描边取样判断。
    this.layersMask = LAYER_MASK.normal;
  }

  get texture() {
    return this.renderTarget.texture;
  }

  get depthTexture() {
    return this.renderTarget.depthTexture;
  }

  setSize(width, height) {
    this.renderTarget.setSize(
      Math.max(1, Math.floor(width * this.scale)),
      Math.max(1, Math.floor(height * this.scale)),
    );
  }

  render(renderer) {
    const previousOverride = this.scene.overrideMaterial;
    const previousMask = this.camera.layers.mask;
    const previousTarget = renderer.getRenderTarget();
    const previousAutoClear = renderer.autoClear;

    this.scene.overrideMaterial = this.normalMaterial;
    this.camera.layers.mask = this.layersMask;
    renderer.autoClear = true;
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, this.camera);

    renderer.setRenderTarget(previousTarget);
    renderer.autoClear = previousAutoClear;
    this.camera.layers.mask = previousMask;
    this.scene.overrideMaterial = previousOverride;
  }
}
