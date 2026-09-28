import * as THREE from 'three';
import { softDotTexture } from '../textures.js';

// Vents breathing out pale steam: one Points draw call for all vents.
export function createSteam(vents) {
  if (!vents.length) return { mesh: new THREE.Group(), update() {} };
  const perVent = 16;
  const n = vents.length * perVent;
  const positions = new Float32Array(n * 3);
  const seeds = new Float32Array(n);
  for (let i = 0; i < vents.length; i++) {
    for (let j = 0; j < perVent; j++) {
      const idx = i * perVent + j;
      positions[idx * 3] = vents[i].x;
      positions[idx * 3 + 1] = vents[i].y;
      positions[idx * 3 + 2] = vents[i].z;
      seeds[idx] = (j / perVent + i * 0.31) % 1;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const uniforms = {
    uTime: { value: 0 },
    uMap: { value: softDotTexture() },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      uniform float uTime;
      attribute float aSeed;
      varying float vAlpha;
      void main() {
        float life = fract(uTime * 0.16 + aSeed);
        float driftX = sin(aSeed * 40.0 + uTime * 0.7) * 0.35 * life;
        float driftZ = cos(aSeed * 29.0 + uTime * 0.5) * 0.3 * life;
        vec3 p = position + vec3(driftX, life * 2.4, driftZ);
        vAlpha = sin(life * 3.14159) * 0.32;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (16.0 + life * 42.0) * (26.0 / max(-mv.z, 1.0));
      }
    `,
    fragmentShader: /* glsl */ `
      precision mediump float;
      uniform sampler2D uMap;
      varying float vAlpha;
      void main() {
        float a = texture2D(uMap, gl_PointCoord).a * vAlpha;
        if (a < 0.015) discard;
        gl_FragColor = vec4(0.82, 0.86, 0.92, a);
      }
    `,
  });
  const mesh = new THREE.Points(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 6;
  return {
    mesh,
    update(t) {
      uniforms.uTime.value = t;
    },
  };
}
