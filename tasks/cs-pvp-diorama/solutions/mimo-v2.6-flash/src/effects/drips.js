import * as THREE from 'three';
import { softDotTexture } from '../textures.js';

// Edge drips: falling droplets cycling from registered eave/gutter points.
export function createDrips(origins) {
  if (!origins.length) return { mesh: new THREE.Group(), update() {} };
  const n = origins.length * 2; // two droplets per origin, phase offset
  const positions = new Float32Array(n * 3);
  const seeds = new Float32Array(n);
  for (let i = 0; i < origins.length; i++) {
    const o = origins[i];
    for (let v = 0; v < 2; v++) {
      const idx = i * 2 + v;
      positions[idx * 3] = o.x;
      positions[idx * 3 + 1] = o.y;
      positions[idx * 3 + 2] = o.z;
      seeds[idx] = (i * 0.37 + v * 0.53) % 1;
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
        float rate = 0.55 + aSeed * 0.7;
        float phase = fract(uTime * rate * 0.45 + aSeed);
        float fall = phase / 0.38;
        float visible = step(phase, 0.38);
        float y = position.y - fall * fall * 4.5;
        vAlpha = visible * (1.0 - phase / 0.38);
        vec4 mv = modelViewMatrix * vec4(position.x, y, position.z, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (9.0 + aSeed * 5.0) * (30.0 / max(-mv.z, 1.0));
      }
    `,
    fragmentShader: /* glsl */ `
      precision mediump float;
      uniform sampler2D uMap;
      varying float vAlpha;
      void main() {
        float a = texture2D(uMap, gl_PointCoord).a * vAlpha * 0.85;
        if (a < 0.02) discard;
        gl_FragColor = vec4(0.7, 0.8, 0.95, a);
      }
    `,
  });
  const mesh = new THREE.Points(geo, mat);
  mesh.frustumCulled = false;
  return {
    mesh,
    update(t) {
      uniforms.uTime.value = t;
    },
  };
}
