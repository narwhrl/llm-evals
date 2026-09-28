import * as THREE from 'three';

/**
 * Planar reflection for the standing water.
 *
 * Renders the scene once more from a camera mirrored through the puddle plane
 * into a small render target. The water shader samples it with projective UVs
 * and distorts them by the live ripple field, which is what sells "wet asphalt
 * reflecting lamps and building silhouettes" without an expensive SSR pass.
 */
export class PuddleReflector {
  constructor(renderer, scene, { height = 0.03, resolution = 640, hide = [] } = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.height = height;
    this.hide = hide;

    this.target = new THREE.WebGLRenderTarget(resolution, resolution, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      type: THREE.UnsignedByteType,
      depthBuffer: true,
      generateMipmaps: false,
    });

    this.camera = new THREE.PerspectiveCamera();
    this.textureMatrix = new THREE.Matrix4();

    this.normal = new THREE.Vector3(0, 1, 0);
    this.plane = new THREE.Plane(this.normal.clone(), -height);
    this.clipPlane = new THREE.Plane(this.normal.clone(), -(height + 0.02));

    this._planePoint = new THREE.Vector3();
    this._cameraPoint = new THREE.Vector3();
    this._view = new THREE.Vector3();
    this._target = new THREE.Vector3();
    this._lookAt = new THREE.Vector3();
    this._rotation = new THREE.Matrix4();
  }

  get texture() {
    return this.target.texture;
  }

  /** Recomputes the mirrored camera and re-renders the target. */
  render(camera, waterMesh) {
    this._planePoint.set(0, this.height, 0);
    this._cameraPoint.setFromMatrixPosition(camera.matrixWorld);

    this._view.subVectors(this._planePoint, this._cameraPoint);
    if (this._view.dot(this.normal) > 0) return; // camera is under the water
    this._view.reflect(this.normal).negate().add(this._planePoint);

    this._rotation.extractRotation(camera.matrixWorld);
    this._lookAt.set(0, 0, -1).applyMatrix4(this._rotation).add(this._cameraPoint);
    this._target.subVectors(this._planePoint, this._lookAt);
    this._target.reflect(this.normal).negate().add(this._planePoint);

    this.camera.position.copy(this._view);
    this.camera.up.set(0, 1, 0).applyMatrix4(this._rotation).reflect(this.normal);
    this.camera.lookAt(this._target);
    this.camera.far = camera.far;
    this.camera.near = camera.near;
    this.camera.updateMatrixWorld();
    this.camera.projectionMatrix.copy(camera.projectionMatrix);

    // World -> reflection texture clip space.
    this.textureMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    this.textureMatrix.multiply(this.camera.projectionMatrix);
    this.textureMatrix.multiply(this.camera.matrixWorldInverse);

    const renderer = this.renderer;
    const previousTarget = renderer.getRenderTarget();
    const previousClip = renderer.clippingPlanes;
    const visibility = this.hide.map((object) => object.visible);
    for (const object of this.hide) object.visible = false;

    renderer.clippingPlanes = [this.clipPlane];
    renderer.setRenderTarget(this.target);
    renderer.clear();
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(previousTarget);
    renderer.clippingPlanes = previousClip;

    this.hide.forEach((object, index) => {
      object.visible = visibility[index];
    });
  }

  dispose() {
    this.target.dispose();
  }
}
