import * as THREE from 'three';
import { TAU } from '../core/builder';

const VERTEX = /* glsl */ `
attribute vec4 aBird;
uniform float uTime;
varying vec2 vUv;
varying float vFrame;
void main() {
	vUv = uv;
	// Blend continuously between wings raised and wings lowered.
	vFrame = 0.5 + 0.5 * sin(uTime * aBird.w + aBird.x * 9.0);
	vec4 view = viewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
	view.xy += position.xy * aBird.y;
	gl_Position = projectionMatrix * view;
}
`;

const FRAGMENT = /* glsl */ `
uniform sampler2D uMap;
varying vec2 vUv;
varying float vFrame;
void main() {
	vec2 cell = vec2(vUv.x * 0.5, vUv.y);
	gl_FragColor = mix(texture2D(uMap, cell), texture2D(uMap, cell + vec2(0.5, 0.0)), vFrame);
}
`;

/** Birds wheeling in a loose flock, each on its own radius and height. */
export class Flock {
  readonly object: THREE.InstancedMesh;
  private readonly material: THREE.ShaderMaterial;
  private readonly matrix = new THREE.Matrix4();
  private readonly orbit: Float32Array;

  constructor(
    count: number,
    private readonly centre: THREE.Vector3,
    private readonly radius: number,
    private readonly speed: number,
    texture: THREE.Texture,
    random: () => number,
  ) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    // aBird: phase, wingspan, flap rate.
    const bird = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    this.orbit = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      bird.array.set([random() * TAU, 1.5 + random() * 1.1, 5 + random() * 3], i * 3);
      this.orbit[i * 2] = 0.72 + random() * 0.56;
      this.orbit[i * 2 + 1] = (random() - 0.5) * 7;
    }
    geometry.setAttribute('aBird', bird);

    this.material = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uMap: { value: texture } }, vertexShader: VERTEX, fragmentShader: FRAGMENT, transparent: true, depthWrite: false });
    this.object = new THREE.InstancedMesh(geometry, this.material, count);
    this.object.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.object.frustumCulled = false;
    this.update(0);
  }

  update(time: number): void {
    this.material.uniforms.uTime.value = time;
    const bird = this.object.geometry.getAttribute('aBird').array as Float32Array;
    for (let i = 0; i < this.object.count; i++) {
      const angle = time * this.speed + bird[i * 3];
      const reach = this.radius * this.orbit[i * 2];
      this.matrix.makeTranslation(
        this.centre.x + Math.cos(angle) * reach,
        this.centre.y + this.orbit[i * 2 + 1] + Math.sin(angle * 2 + i) * 2.5,
        this.centre.z + Math.sin(angle) * reach,
      );
      this.object.setMatrixAt(i, this.matrix);
    }
    this.object.instanceMatrix.needsUpdate = true;
  }
}
