import * as THREE from 'three';

/**
 * Rain and drips.
 *
 * Both are the same idea — a field of vertical streaks whose position is
 * derived from a per-instance seed and the clock, entirely in the vertex
 * shader. Nothing touches the CPU per frame, so a few thousand streaks cost
 * one draw call and no per-frame allocation.
 */

const STREAK_VERTEX = /* glsl */ `
  attribute vec3 iOrigin;
  attribute vec2 iParams;   // x: fall speed, y: streak length

  uniform float uTime;
  uniform float uSpan;
  uniform float uWidth;
  uniform vec3 uDrift;

  varying vec2 vUv;
  varying float vFade;

  void main() {
    float speed = iParams.x;
    float cycle = mod(iOrigin.y - uTime * speed, uSpan);
    vec3 base = vec3(iOrigin.x, cycle, iOrigin.z);

    // Rain leans with the wind; heavier as it falls from higher up.
    float fall = (uSpan - cycle) / uSpan;
    base += uDrift * fall * 1.6;

    vec4 mv = modelViewMatrix * vec4(base, 1.0);
    mv.x += position.x * uWidth;
    mv.y += position.y * iParams.y;

    vUv = uv;
    vFade = 1.0;
    gl_Position = projectionMatrix * mv;
  }
`;

const STREAK_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vFade;

  void main() {
    // Soft at both ends and feathered at the sides so the streak reads as a
    // thin filament rather than a hard quad.
    float taper = smoothstep(0.0, 0.32, vUv.y) * smoothstep(1.0, 0.68, vUv.y);
    float sides = smoothstep(0.0, 0.42, vUv.x) * smoothstep(1.0, 0.58, vUv.x);
    float alpha = taper * sides * uOpacity * vFade;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function makeRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField(count, sampler, size) {
  const origins = new Float32Array(count * 3);
  const params = new Float32Array(count * 2);
  for (let i = 0; i < count; i += 1) {
    const o = sampler(i);
    origins[i * 3] = o[0];
    origins[i * 3 + 1] = o[1];
    origins[i * 3 + 2] = o[2];
    params[i * 2] = o[3];
    params[i * 2 + 1] = o[4];
  }
  const geometry = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1).toNonIndexed();
  geometry.setAttribute('position', quad.attributes.position);
  geometry.setAttribute('uv', quad.attributes.uv);
  geometry.setIndex(quad.index);
  geometry.setAttribute('iOrigin', new THREE.InstancedBufferAttribute(origins, 3));
  geometry.setAttribute('iParams', new THREE.InstancedBufferAttribute(params, 2));
  geometry.instanceCount = count;
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, size / 2, 0), size);
  quad.dispose();
  return geometry;
}

/**
 * A full curtain of rain over the diorama.
 *
 * The volume matches the base footprint exactly, so the weather never reads
 * as geometry spilling off the plinth.
 */
export function createRain({ half = 22.6, span = 26, count = 5200, seed = 20260928 } = {}) {
  const random = makeRandom(seed);
  const geometry = buildField(
    count,
    () => [
      (random() * 2 - 1) * half,
      random() * span,
      (random() * 2 - 1) * half,
      11.5 + random() * 6.5, // fall speed
      0.34 + random() * 0.46, // streak length
    ],
    span,
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSpan: { value: span },
      uWidth: { value: 0.022 },
      uColor: { value: new THREE.Color(0xa8c8ee) },
      uOpacity: { value: 0.4 },
      uDrift: { value: new THREE.Vector3(0.16, 0, 0.06) },
    },
    vertexShader: STREAK_VERTEX,
    fragmentShader: STREAK_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.name = 'rain';
  mesh.renderOrder = 6;

  return {
    mesh,
    update(time) {
      material.uniforms.uTime.value = time;
    },
  };
}

/**
 * Drips off eaves, container roofs and the rolled shutter.
 *
 * Accelerating fall and a hard reset at the ground, which is what separates a
 * drip from a rain streak: it starts from a fixed lip and ends on a surface.
 */
export function createDrips(emitters, { seed = 7717, perEmitter = 3 } = {}) {
  const random = makeRandom(seed);
  const samples = [];

  for (const emitter of emitters) {
    for (let i = 0; i < perEmitter; i += 1) {
      const spread = emitter.spread ?? 0.5;
      samples.push([
        emitter.position.x + (random() * 2 - 1) * spread,
        emitter.position.y,
        emitter.position.z + (random() * 2 - 1) * spread,
        emitter.rate ? emitter.rate * (0.7 + random() * 0.6) : 0.55 + random() * 0.5,
        0.1 + random() * 0.1,
      ]);
    }
  }

  if (samples.length === 0) return null;

  const maxSpan = samples.reduce((m, s) => Math.max(m, s[1]), 1);
  const geometry = buildField(samples.length, (i) => samples[i], maxSpan + 1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSpan: { value: maxSpan + 1 },
      uWidth: { value: 0.03 },
      uColor: { value: new THREE.Color(0xc6dcff) },
      uOpacity: { value: 0.85 },
      uDrift: { value: new THREE.Vector3(0.02, 0, 0.01) },
    },
    vertexShader: STREAK_VERTEX,
    fragmentShader: STREAK_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.name = 'drips';
  mesh.renderOrder = 6;

  return {
    mesh,
    update(time) {
      material.uniforms.uTime.value = time;
    },
  };
}
