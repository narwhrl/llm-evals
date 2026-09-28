import * as THREE from 'three';

// Fine rain: one LineSegments draw call, positions cycled entirely in the
// vertex shader. Slanted streaks with per-drop speed variation.
export function createRain({ count = 3800, area = 58, height = 34, len = 0.9, speed = 16 } = {}) {
  const positions = new Float32Array(count * 2 * 3);
  const seeds = new Float32Array(count * 2);
  const ends = new Float32Array(count * 2);
  let s = 12345;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * area;
    const z = (rand() - 0.5) * area;
    const y = rand() * height;
    const seed = rand();
    for (let v = 0; v < 2; v++) {
      const idx = (i * 2 + v);
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;
      seeds[idx] = seed;
      ends[idx] = v;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute('aEnd', new THREE.BufferAttribute(ends, 1));

  const uniforms = {
    uTime: { value: 0 },
    uHeight: { value: height },
    uLen: { value: len },
    uSpeed: { value: speed },
    uWind: { value: 0.12 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uHeight;
      uniform float uLen;
      uniform float uSpeed;
      uniform float uWind;
      attribute float aSeed;
      attribute float aEnd;
      varying float vFade;
      void main() {
        float sp = uSpeed * (0.72 + 0.55 * aSeed);
        float y = mod(position.y - uTime * sp, uHeight);
        float seg = uLen * (0.7 + 0.6 * aSeed);
        float yy = y + aEnd * seg;
        float xx = position.x + aEnd * seg * uWind;
        vFade = smoothstep(0.0, 2.0, y) * (1.0 - aEnd * 0.55);
        vec4 mv = modelViewMatrix * vec4(xx, yy, position.z, 1.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision mediump float;
      varying float vFade;
      void main() {
        gl_FragColor = vec4(0.62, 0.72, 0.86, 0.30 * vFade);
      }
    `,
  });
  const mesh = new THREE.LineSegments(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  return {
    mesh,
    update(t) {
      uniforms.uTime.value = t;
    },
  };
}
