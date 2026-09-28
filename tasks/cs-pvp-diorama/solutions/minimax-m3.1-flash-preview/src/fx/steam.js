import * as THREE from 'three';

/**
 * Vent steam.
 *
 * Soft billboard puffs that rise, spread and fade. Deliberately few and slow:
 * the brief asks for life in an otherwise frozen miniature, not for fog.
 */

const VERTEX = /* glsl */ `
  attribute vec3 iOrigin;
  attribute vec3 iParams;   // x: phase, y: speed, z: base size

  uniform float uTime;

  varying vec2 vUv;
  varying float vAlpha;

  void main() {
    float phase = iParams.x;
    float t = fract(uTime * iParams.y + phase);
    vec3 base = iOrigin;
    base.y += t * 1.5;
    base.x += sin(t * 3.1 + phase * 21.0) * 0.22 * t;
    base.z += cos(t * 2.6 + phase * 15.0) * 0.22 * t;

    vec4 mv = modelViewMatrix * vec4(base, 1.0);
    float size = iParams.z * (0.45 + t * 2.0);
    mv.xy += position.xy * size;

    vUv = uv;
    vAlpha = sin(t * 3.14159265);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vAlpha;

  void main() {
    vec2 d = vUv - 0.5;
    float falloff = 1.0 - smoothstep(0.12, 0.5, length(d));
    float alpha = falloff * vAlpha * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function createSteam(vents, { perVent = 14, seed = 4242 } = {}) {
  const points = [];
  for (const vent of vents) {
    for (let i = 0; i < perVent; i += 1) points.push([vent.x, vent.y, vent.z]);
  }
  if (points.length === 0) return null;

  let a = seed >>> 0;
  const random = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const origins = new Float32Array(points.length * 3);
  const params = new Float32Array(points.length * 3);
  points.forEach((p, i) => {
    origins[i * 3] = p[0];
    origins[i * 3 + 1] = p[1];
    origins[i * 3 + 2] = p[2];
    params[i * 3] = random();
    params[i * 3 + 1] = 0.09 + random() * 0.07;
    params[i * 3 + 2] = 0.22 + random() * 0.24;
  });

  const quad = new THREE.PlaneGeometry(1, 1).toNonIndexed();
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', quad.attributes.position);
  geometry.setAttribute('uv', quad.attributes.uv);
  geometry.setAttribute('iOrigin', new THREE.InstancedBufferAttribute(origins, 3));
  geometry.setAttribute('iParams', new THREE.InstancedBufferAttribute(params, 3));
  geometry.instanceCount = points.length;
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 2, 0), 30);
  quad.dispose();

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xc8d6e4) },
      uOpacity: { value: 0.17 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.name = 'steam';
  mesh.renderOrder = 5;

  return {
    mesh,
    update(time) {
      material.uniforms.uTime.value = time;
    },
  };
}
