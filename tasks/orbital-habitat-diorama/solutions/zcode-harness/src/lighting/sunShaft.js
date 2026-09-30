import * as THREE from 'three';

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const fragmentShader = /* glsl */ `
uniform float strength;
varying vec2 vUv;
void main() {
  float radial = 1.0 - smoothstep(0.12, 1.0, abs(vUv.x * 2.0 - 1.0));
  float ends = smoothstep(0.0, 0.20, vUv.y) * (1.0 - smoothstep(0.65, 1.0, vUv.y));
  gl_FragColor = vec4(1.0, 0.84, 0.61, radial * radial * ends * strength * 0.020);
}`;

/** Soft axis-centred scattering; the actual circular patch comes from sun shadows. */
export function createSunShaft(ctx) {
  const p = ctx.portholes.find((item) => item.id === 'big');
  const uniforms = { strength: { value: 0 } };
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(p.radius * 2, 1),
    new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      depthTest: true, side: THREE.DoubleSide, toneMapped: false,
      // Earth deliberately ignores depth; keep scattering out of every stencil aperture.
      stencilWrite: true, stencilRef: 0, stencilFunc: THREE.EqualStencilFunc,
      stencilFail: THREE.KeepStencilOp, stencilZFail: THREE.KeepStencilOp,
      stencilZPass: THREE.KeepStencilOp }));
  mesh.name = 'sunShaft';
  mesh.renderOrder = 3;
  mesh.raycast = () => {};
  mesh.userData.pickThrough = true;
  ctx.scene.add(mesh);
  const direction = new THREE.Vector3(), view = new THREE.Vector3();
  const across = new THREE.Vector3(), normal = new THREE.Vector3();
  const start = new THREE.Vector3(), basis = new THREE.Matrix4();
  function update(strength) {
    direction.copy(ctx.clock.sunDir).negate();
    // Start beyond the frame face, with the full width inside the cabin.
    start.copy(p.center).addScaledVector(direction, 0.42);
    const length = Math.min(3.1, (start.y - 0.08) / Math.max(0.25, ctx.clock.sunDir.y));
    view.subVectors(ctx.camera.position, start).normalize();
    across.crossVectors(direction, view).normalize();
    normal.crossVectors(across, direction).normalize();
    basis.makeBasis(across, direction, normal);
    mesh.position.copy(start).addScaledVector(direction, length * 0.5);
    mesh.quaternion.setFromRotationMatrix(basis);
    mesh.scale.y = length;
    uniforms.strength.value = strength;
    mesh.visible = strength > 0.005;
  }
  return { update };
}
