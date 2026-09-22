import {
  BufferAttribute,
  BufferGeometry,
  GLSL3,
  LinearFilter,
  Mesh,
  NoBlending,
  RawShaderMaterial,
  RGBAFormat,
  Scene,
  WebGLRenderTarget,
} from 'three';
import vertexShader from './shaders/fullscreen.vert.glsl?raw';

// A single clip-space triangle; the only geometry in the renderer.
export function createFullscreenGeometry() {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  return geometry;
}

export class FullscreenPass {
  constructor(name, geometry, fragmentShader, uniforms) {
    this.material = new RawShaderMaterial({
      name,
      glslVersion: GLSL3,
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
    });
    this.uniforms = this.material.uniforms;
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene = new Scene();
    this.scene.add(this.mesh);
  }

  render(renderer, camera, target) {
    renderer.setRenderTarget(target);
    renderer.render(this.scene, camera);
  }

  dispose() {
    this.material.dispose();
  }
}

export function createColorTarget(width, height, type) {
  return new WebGLRenderTarget(width, height, {
    type,
    format: RGBAFormat,
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });
}
