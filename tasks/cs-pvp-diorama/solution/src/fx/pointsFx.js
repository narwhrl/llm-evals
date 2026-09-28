import * as THREE from "three";

// 点精灵特效工厂：蒸汽（上升）与滴水（下落）
function makePoints(count, opts) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = Math.random() * opts.width - opts.width / 2;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.random() * opts.depth - opts.depth / 2;
    seeds[i] = Math.random();
    speeds[i] = 0.75 + Math.random() * 0.5;
    sizes[i] = opts.size * (0.7 + Math.random() * 0.6);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLife: { value: opts.life },
      uRise: { value: opts.rise },
      uOpacity: { value: opts.opacity },
      uColor: { value: new THREE.Color(opts.color) },
      uMap: { value: opts.map },
      uScale: { value: 320 },
    },
    vertexShader: `
      attribute float aSeed;
      attribute float aSpeed;
      attribute float aSize;
      uniform float uTime;
      uniform float uLife;
      uniform float uRise;
      uniform float uScale;
      varying float vFade;
      void main() {
        vec3 p = position;
        float t = mod(uTime * aSpeed + aSeed * uLife, uLife);
        float k = t / uLife;
        p.y += uRise * k;
        p.x += sin(t * 1.4 + aSeed * 30.0) * 0.08;
        p.z += cos(t * 1.1 + aSeed * 21.0) * 0.08;
        vFade = smoothstep(0.0, 0.12, k) * (1.0 - k);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * (1.0 + k * ${opts.grow}) * (uScale / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform sampler2D uMap;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFade;
      void main() {
        vec4 tex = texture2D(uMap, gl_PointCoord);
        float a = tex.a * vFade * uOpacity;
        if (a < 0.003) discard;
        gl_FragColor = vec4(uColor, a);
      }`,
    transparent: true,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  return { points, mat };
}

// 通风口白色水汽
export function createSteam(map, x, y, z, scale = 1) {
  const { points, mat } = makePoints(26, {
    width: 0.5 * scale,
    depth: 0.5 * scale,
    life: 3.4,
    rise: 2.6 * scale,
    size: 26 * scale,
    opacity: 0.16,
    color: 0xcfd8e2,
    map,
    grow: "1.8",
  });
  points.position.set(x, y, z);
  points.renderOrder = 22;
  return { points, update(t) { mat.uniforms.uTime.value = t; } };
}

// 檐口滴水（沿边线分布）
export function createDrips(map, origin, dir, len, count = 7, drop = 0.5) {
  const { points, mat } = makePoints(count, {
    width: 0.1,
    depth: 0.1,
    life: 1.1,
    rise: -drop,
    size: 5,
    opacity: 0.8,
    color: 0xbfd2e4,
    map,
    grow: "0.0",
  });
  points.position.copy(origin);
  points.rotation.y = Math.atan2(dir.x, dir.z);
  // 用缩放把点云铺到边线上
  points.scale.set(len, 1, 1);
  mat.uniforms.uLife.value = 0.9 + Math.random() * 0.4;
  return { points, update(t) { mat.uniforms.uTime.value = t; } };
}
