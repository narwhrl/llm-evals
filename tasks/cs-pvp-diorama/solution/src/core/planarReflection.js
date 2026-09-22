// 平面反射：把场景镜像渲染到半分辨率 RT，供地面/水面 shader 用投影矩阵采样。
import * as THREE from 'three';
import { LAYER_MASK } from './stage.js';

export class PlanarReflection {
  constructor({ renderer, scene, planeY = 0, scale = 0.5 }) {
    this.renderer = renderer;
    this.scene = scene;
    this.planeY = planeY;
    this.scale = scale;

    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    this.renderTarget = new THREE.WebGLRenderTarget(
      Math.max(1, Math.floor(size.x * scale)),
      Math.max(1, Math.floor(size.y * scale)),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: false },
    );

    this.virtualCamera = new THREE.PerspectiveCamera();
    this.virtualCamera.layers.mask = LAYER_MASK.reflection;
    this.textureMatrix = new THREE.Matrix4();
    this.reflectionBackground = new THREE.Color(0x17242e);

    this.uniforms = {
      uReflectionMap: { value: this.renderTarget.texture },
      uReflectionMatrix: { value: this.textureMatrix },
    };

    this._normal = new THREE.Vector3(0, 1, 0);
    this._origin = new THREE.Vector3(0, planeY, 0);
    this._rotation = new THREE.Matrix4();
    this._lookAt = new THREE.Vector3();
    this._target = new THREE.Vector3();
  }

  setSize(width, height) {
    this.renderTarget.setSize(
      Math.max(1, Math.floor(width * this.scale)),
      Math.max(1, Math.floor(height * this.scale)),
    );
  }

  update(camera) {
    camera.updateMatrixWorld();
    const virtualCamera = this.virtualCamera;

    this._rotation.extractRotation(camera.matrixWorld);
    this._lookAt.set(0, 0, -1).applyMatrix4(this._rotation).add(camera.position);
    this._target
      .subVectors(this._origin, camera.position)
      .reflect(this._normal)
      .negate()
      .add(this._origin);

    virtualCamera.position.copy(this._target);
    virtualCamera.up.set(0, -1, 0).applyMatrix4(this._rotation).reflect(this._normal);
    virtualCamera.lookAt(this._lookAt);
    virtualCamera.near = camera.near;
    virtualCamera.far = camera.far;
    virtualCamera.updateMatrixWorld();
    virtualCamera.projectionMatrix.copy(camera.projectionMatrix);

    this.textureMatrix.set(
      0.5, 0, 0, 0.5,
      0, 0.5, 0, 0.5,
      0, 0, 0.5, 0.5,
      0, 0, 0, 1,
    );
    this.textureMatrix.multiply(virtualCamera.projectionMatrix);
    this.textureMatrix.multiply(virtualCamera.matrixWorldInverse);

    const renderer = this.renderer;
    const previousTarget = renderer.getRenderTarget();
    const previousMask = virtualCamera.layers.mask;
    const previousBackground = this.scene.background;
    const previousAutoClear = renderer.autoClear;

    this.scene.background = this.reflectionBackground;
    renderer.autoClear = true;
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, virtualCamera);

    renderer.setRenderTarget(previousTarget);
    renderer.autoClear = previousAutoClear;
    this.scene.background = previousBackground;
    virtualCamera.layers.mask = previousMask;
  }
}
