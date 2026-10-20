/**
 * The weather.
 *
 * Rain is a single buffer of line segments whose fall is computed on the GPU,
 * so the CPU only moves a clock. The puddles are discs with a shader that
 * draws expanding rings, and the eaves drip.
 */

import * as THREE from "three";

export interface RainSystem {
  lines: THREE.LineSegments;
  drips: THREE.Points;
  update: (elapsed: number, delta: number) => void;
  dispose: () => void;
}

const RAIN_VERTEX = /* glsl */ `
  attribute float aSeed;
  attribute float aEnd;
  uniform float uTime;
  uniform float uHeight;
  uniform float uSpeed;
  varying float vFade;

  void main() {
    float speed = uSpeed * (0.72 + aSeed * 0.62);
    float y = uHeight - mod(aSeed * 97.31 + uTime * speed, uHeight);
    vec3 p = position;
    p.y = y - aEnd * (0.26 + aSeed * 0.2);
    p.x += aEnd * 0.05;
    vFade = smoothstep(0.0, 1.2, y) * (0.45 + aSeed * 0.55);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const RAIN_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  varying float vFade;
  void main() {
    gl_FragColor = vec4(uColor, vFade * 0.24);
  }
`;

export function createRain(
  area: { half: number; height: number },
  count: number,
  color: THREE.Color,
): RainSystem {
  const positions = new Float32Array(count * 2 * 3);
  const seeds = new Float32Array(count * 2);
  const ends = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 2 - 1) * area.half;
    const z = (Math.random() * 2 - 1) * area.half;
    const seed = Math.random();
    for (let k = 0; k < 2; k++) {
      const index = (i * 2 + k) * 3;
      positions[index] = x;
      positions[index + 1] = 0;
      positions[index + 2] = z;
      seeds[i * 2 + k] = seed;
      ends[i * 2 + k] = k;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aEnd", new THREE.BufferAttribute(ends, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: area.height },
      uSpeed: { value: 11 },
      uColor: { value: color },
    },
    vertexShader: RAIN_VERTEX,
    fragmentShader: RAIN_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.frustumCulled = false;

  // Drips falling from the shop canopy.
  const dripCount = 90;
  const dripPositions = new Float32Array(dripCount * 3);
  const dripSpeeds = new Float32Array(dripCount);
  for (let i = 0; i < dripCount; i++) {
    dripPositions[i * 3] = -6.1 + Math.random() * 8.2;
    dripPositions[i * 3 + 1] = 2.4 + Math.random() * 0.6;
    dripPositions[i * 3 + 2] = -3.0 + Math.random() * 0.1;
    dripSpeeds[i] = 1.8 + Math.random() * 1.4;
  }
  const dripGeometry = new THREE.BufferGeometry();
  dripGeometry.setAttribute("position", new THREE.BufferAttribute(dripPositions, 3));
  const dripMaterial = new THREE.PointsMaterial({
    color: 0xcfe4f5,
    size: 0.05,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const drips = new THREE.Points(dripGeometry, dripMaterial);
  drips.frustumCulled = false;

  return {
    lines,
    drips,
    update: (elapsed: number, delta: number) => {
      material.uniforms.uTime.value = elapsed;
      const attribute = dripGeometry.getAttribute("position") as THREE.BufferAttribute;
      const array = attribute.array as Float32Array;
      for (let i = 0; i < dripCount; i++) {
        array[i * 3 + 1] -= dripSpeeds[i] * delta;
        if (array[i * 3 + 1] < 0.15) {
          array[i * 3 + 1] = 2.4 + Math.random() * 0.6;
          array[i * 3] = -6.1 + Math.random() * 8.2;
        }
      }
      attribute.needsUpdate = true;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
      dripGeometry.dispose();
      dripMaterial.dispose();
    },
  };
}

const PUDDLE_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const PUDDLE_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uSky;
  uniform float uSeed;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;

    float rings = 0.0;
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 c = vec2(sin(uSeed + fi * 2.3) * 0.45, cos(uSeed * 1.7 + fi * 1.9) * 0.42);
      float d = length(p - c);
      float phase = fract(uTime * 0.55 + fi * 0.31 + uSeed);
      float wave = sin((d - phase * 0.8) * 46.0);
      rings += wave * exp(-abs(d - phase * 0.8) * 16.0) * (1.0 - phase);
    }

    vec3 color = mix(uDeep, uSky, smoothstep(0.1, 1.0, r) * 0.55);
    color += vec3(0.85, 0.9, 1.0) * max(rings, 0.0) * 0.28;
    float alpha = 0.62 * smoothstep(1.0, 0.75, r);
    gl_FragColor = vec4(color, alpha);
  }
`;

export function createPuddles(
  puddles: Array<[number, number, number, number]>,
): { mesh: THREE.Group; update: (elapsed: number) => void; dispose: () => void } {
  const group = new THREE.Group();
  const materials: THREE.ShaderMaterial[] = [];

  puddles.forEach(([x, z, rx, rz], index) => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDeep: { value: new THREE.Color(0.04, 0.05, 0.08) },
        uSky: { value: new THREE.Color(0.16, 0.2, 0.3) },
        uSeed: { value: index * 1.7 },
      },
      vertexShader: PUDDLE_VERTEX,
      fragmentShader: PUDDLE_FRAGMENT,
      transparent: true,
      depthWrite: false,
    });
    materials.push(material);
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(1, 28), material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.set(rx, rz, 1);
    mesh.position.set(x, 0.026, z);
    mesh.renderOrder = 4;
    group.add(mesh);
  });

  return {
    mesh: group,
    update: (elapsed: number) => {
      for (const material of materials) material.uniforms.uTime.value = elapsed;
    },
    dispose: () => {
      group.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      for (const material of materials) material.dispose();
    },
  };
}
