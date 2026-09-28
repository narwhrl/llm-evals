import * as THREE from "three";

// 持续下落的细密雨丝（GPU 线段，随时间循环下落）
export function createRain(count = 1500) {
  const AREA = 44;
  const HEIGHT = 22;
  const positions = new Float32Array(count * 2 * 3);
  const seeds = new Float32Array(count * 2);
  const speeds = new Float32Array(count * 2);
  const ends = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * AREA;
    const z = (Math.random() - 0.5) * AREA;
    const seed = Math.random();
    const speed = 9 + Math.random() * 6;
    const y0 = Math.random() * HEIGHT;
    const len = 0.45 + Math.random() * 0.5;
    for (let v = 0; v < 2; v++) {
      const idx = i * 2 + v;
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y0;
      positions[idx * 3 + 2] = z;
      seeds[idx] = seed;
      speeds[idx] = speed;
      ends[idx] = v;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geo.setAttribute("aEnd", new THREE.BufferAttribute(ends, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: HEIGHT },
      uColor: { value: new THREE.Color(0x9db4cc) },
      uOpacity: { value: 0.34 },
    },
    vertexShader: `
      attribute float aSeed;
      attribute float aSpeed;
      attribute float aEnd;
      uniform float uTime;
      uniform float uHeight;
      varying float vFade;
      void main() {
        vec3 p = position;
        float cycle = mod(uTime * aSpeed + aSeed * uHeight * 3.7, uHeight);
        float y = uHeight - cycle - aEnd * 0.55;
        p.y = y;
        p.x += (uHeight - y) * 0.055 + sin(uTime * 0.8 + aSeed * 40.0) * 0.2;
        vFade = clamp(smoothstep(0.0, 1.6, y) * 0.75 + 0.25, 0.0, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFade;
      void main() {
        gl_FragColor = vec4(uColor, uOpacity * vFade);
      }`,
    transparent: true,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  lines.renderOrder = 20;
  return { lines, mat, update(t) { mat.uniforms.uTime.value = t; } };
}
