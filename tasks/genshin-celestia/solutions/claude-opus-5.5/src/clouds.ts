import * as THREE from 'three';
import { GLSL_ATMOSPHERE, SUN_DIR } from './env';
import { GLSL_NOISE, fbm3, noise3, rng } from './noise';

export const CLOUD_Y = -2700;
const time = { value: 0 };
export const cloudTime = time;

const colors = /* glsl */ `
const vec3 CLOUD_LIT = vec3(0.93, 0.92, 0.89);
const vec3 CLOUD_SHADOW = vec3(0.46, 0.56, 0.80);
const vec3 CLOUD_DEEP = vec3(0.25, 0.34, 0.62);
`;

const cloudFn = /* glsl */ `
uniform float uTime;
const float CLOUD_AMP = 560.0;
// Union of rounded caps, one per Worley cell with its own size: billows with soft creases.
// Cap radius stays below one cell so the 3x3 search keeps the field continuous.
float dome(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float h = 0.0;
  for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 r = g + hash22(i + g) - f;
      float a = mix(0.45, 1.25, hash12(i + g + 19.7));
      float rad = 0.6 + 0.3 * a;
      float c = a * sqrt(max(0.0, 1.0 - dot(r, r) / (rad * rad)));
      // smooth max rounds the creases where neighbouring caps meet
      float k = max(0.22 - abs(h - c), 0.0) / 0.22;
      h = max(h, c) + k * k * 0.055;
    }
  return h;
}
float cloudHeight(vec2 p, bool fine) {
  vec2 q = p + vec2(uTime * 7.0, uTime * 2.5);
  q += (vec2(vnoise(q / 3200.0), vnoise(q / 3200.0 + 5.2)) - 0.5) * 1800.0;
  float cov = fbm2(q / 14000.0 + 4.0);
  float holes = smoothstep(0.4, 0.54, fbm2(q / 6500.0 + 11.0));
  float h = (cov - 0.3) * 1.5 + dome(q / 2600.0) * 0.5 + dome(q / 1000.0 + 7.3) * 0.3 - (1.0 - holes) * 1.0;
  // two framed openings onto the land, either side of the default shot
  h -= 1.2 * (1.0 - smoothstep(1400.0, 3600.0, length(p - vec2(-7400.0, -2700.0) + (vnoise(p / 1500.0) - 0.5) * 1800.0)));
  h -= 1.2 * (1.0 - smoothstep(1200.0, 3200.0, length(p - vec2(400.0, -7900.0) + (vnoise(p / 1500.0 + 3.0) - 0.5) * 1800.0)));
  // the deck closes up towards the horizon so gaps never reach past the modelled land
  h += smoothstep(22000.0, 38000.0, length(p));
  if (fine) h += dome(q / 380.0 + 1.7) * 0.1;
  return h - 0.36;
}
`;

/** Endless sea of cumulus far below, shaded from its heightfield, with gaps onto the land. */
export function cloudSea(): THREE.Mesh {
  const ringsN = 230, seg = 400, R = 90000;
  const pos: number[] = [];
  for (let j = 0; j <= ringsN; j++) {
    const r = R * Math.pow(j / ringsN, 2.3);
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pos.push(r * Math.cos(a), 0, r * Math.sin(a));
    }
  }
  const idx: number[] = [];
  for (let j = 0; j < ringsN; j++) {
    for (let i = 0; i < seg; i++) {
      const a = j * seg + i, b = j * seg + ((i + 1) % seg);
      const c = a + seg, d = b + seg;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uTime: time },
    vertexShader: /* glsl */ `
      ${GLSL_NOISE}
      ${cloudFn}
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        wp.y += max(cloudHeight(wp.xz, false), -0.25) * CLOUD_AMP;
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */ `
      ${GLSL_NOISE}
      ${cloudFn}
      ${GLSL_ATMOSPHERE}
      ${colors}
      varying vec3 vWorld;
      float islandShadow(vec2 p) {
        float d = length(p);
        float s = smoothstep(480.0, 760.0, d + (vnoise(p / 160.0) - 0.5) * 140.0);
        float ring = abs(d - 1180.0) + (vnoise(p / 110.0 + 3.0) - 0.5) * 160.0;
        return s * mix(0.5, 1.0, smoothstep(120.0, 300.0, ring));
      }
      void main() {
        float h = cloudHeight(vWorld.xz, true);
        float alpha = smoothstep(-0.06, 0.1, h);
        if (alpha < 0.01) discard;
        float dist = length(vWorld - cameraPosition);
        float e = max(8.0, dist * 0.003);
        float hx = cloudHeight(vWorld.xz + vec2(e, 0.0), true);
        float hz = cloudHeight(vWorld.xz + vec2(0.0, e), true);
        vec3 n = normalize(vec3(-(hx - h) * CLOUD_AMP * 1.2 / e, 1.0, -(hz - h) * CLOUD_AMP * 1.2 / e));
        float lit = smoothstep(-0.2, 0.75, dot(n, SUN_DIR));
        float ao = clamp(h * 1.1 + 0.3, 0.0, 1.0);
        vec2 sp = vWorld.xz + SUN_DIR.xz / SUN_DIR.y * (-350.0 - vWorld.y);
        float occl = islandShadow(sp);
        vec3 c = mix(mix(CLOUD_DEEP, CLOUD_SHADOW, ao), CLOUD_LIT, lit * occl * (0.55 + 0.45 * ao));
        vec3 v = (vWorld - cameraPosition) / dist;
        c += SUN_GLOW * pow(max(dot(v, SUN_DIR), 0.0), 5.0) * (1.0 - alpha * ao) * 0.7;
        c = applyAerial(c, vWorld);
        gl_FragColor = vec4(c, alpha);
      }`,
  });
  const mesh = new THREE.Mesh(g, mat);
  mesh.position.y = CLOUD_Y;
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  return mesh;
}

/**
 * Billboard cloud puffs. Each puff carries its own light term so clusters read as lit cumulus.
 */
export function puffs(list: { p: THREE.Vector3; size: number; light: number; alpha: number }[]): THREE.Mesh {
  const base = new THREE.PlaneGeometry(1, 1);
  const g = new THREE.InstancedBufferGeometry();
  g.index = base.index;
  g.setAttribute('position', base.attributes.position);
  const off = new Float32Array(list.length * 3), info = new Float32Array(list.length * 4);
  const rand = rng(5);
  list.forEach((it, i) => {
    off.set([it.p.x, it.p.y, it.p.z], i * 3);
    info.set([it.size, it.light, it.alpha, rand() * 100], i * 4);
  });
  g.setAttribute('offset', new THREE.InstancedBufferAttribute(off, 3));
  g.setAttribute('info', new THREE.InstancedBufferAttribute(info, 4));
  g.instanceCount = list.length;
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: time },
    vertexShader: /* glsl */ `
      attribute vec3 offset;
      attribute vec4 info;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec4 vInfo;
      varying vec2 vSun;
      ${GLSL_ATMOSPHERE}
      void main() {
        vUv = position.xy;
        vInfo = info;
        vec3 o = offset + vec3(uTime * 4.0, 0.0, uTime * 1.5);
        vWorld = o;
        vec4 mv = viewMatrix * vec4(o, 1.0);
        mv.xy += position.xy * info.x;
        vSun = normalize((viewMatrix * vec4(SUN_DIR, 0.0)).xy + 1e-4);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      ${GLSL_NOISE}
      ${GLSL_ATMOSPHERE}
      ${colors}
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec4 vInfo;
      varying vec2 vSun;
      void main() {
        vec2 p = vUv;
        float n = fbm2(p * 3.2 + vInfo.w);
        float d = length(p * vec2(1.0, 1.15)) * 2.0 + (n - 0.5) * 0.75;
        float a = smoothstep(1.0, 0.72, d) * smoothstep(-0.48, -0.2, p.y + (n - 0.5) * 0.25);
        a *= vInfo.z;
        if (a < 0.004) discard;
        float side = dot(p * 2.0, vSun) * 0.5 + 0.5;
        float lit = clamp(vInfo.y * (0.55 + 0.6 * side) + (n - 0.5) * 0.3, 0.0, 1.0);
        vec3 c = mix(mix(CLOUD_DEEP, CLOUD_SHADOW, smoothstep(0.0, 0.4, lit)), CLOUD_LIT, smoothstep(0.35, 0.85, lit));
        c = applyAerial(c, vWorld);
        gl_FragColor = vec4(c, a);
      }`,
  });
  const mesh = new THREE.Mesh(g, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 3;
  return mesh;
}

/** A cumulus cluster: puffs piled into a dome, lit from the sun side. */
export function cumulus(out: Parameters<typeof puffs>[0], c: THREE.Vector3, w: number, h: number, n: number, seed: number, alpha = 1): void {
  const rand = rng(seed);
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    const y = Math.pow(rand(), 1.4) * (1 - r * r * 0.7);
    const p = new THREE.Vector3(c.x + Math.cos(a) * r * w, c.y + y * h, c.z + Math.sin(a) * r * w);
    const dir = p.clone().sub(c).setY(p.y - c.y - h * 0.2).normalize();
    out.push({ p, size: (0.35 + rand() * 0.4) * Math.min(w, h) * (1.2 - y * 0.4), light: 0.45 + 0.5 * Math.max(0, dir.dot(SUN_DIR)) + y * 0.25, alpha });
  }
}

/** The land of Teyvat far below the clouds: hazy plains, rivers, ranges and a sea. */
export function continent(): THREE.Mesh {
  const size = 110000, n = 420;
  const g = new THREE.PlaneGeometry(size, size, n, n).rotateX(-Math.PI / 2);
  const p = g.attributes.position as THREE.BufferAttribute;
  const colors: number[] = [];
  const c = new THREE.Color();
  const water = new THREE.Color('#3f80b8'), beach = new THREE.Color('#d2c890'), low = new THREE.Color('#7db04e'),
    field = new THREE.Color('#b9bf5e'), forest = new THREE.Color('#3d7a3a'), high = new THREE.Color('#968e6a'),
    rock = new THREE.Color('#a39a92'), snow = new THREE.Color('#f4f6fa');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const base = fbm3(x / 16000 + 3.1, 0.5, z / 16000 - 1.7, 4);
    const ridge = 1 - Math.abs(noise3(x / 5000, 1.3, z / 5000));
    // peaks stay well below the cloud deck (continent sits 3.5 km under it)
    let h = base * 2400 + Math.pow(ridge, 3) * 1300 * THREE.MathUtils.smoothstep(base, -0.05, 0.3) + 150;
    const river = Math.abs(noise3(x / 6000, 4.4, z / 6000) + 0.3 * noise3(x / 1500, 5.1, z / 1500));
    if (h > 0 && h < 700 && river < 0.03) h = -10;
    const f = fbm3(x / 1800, 2.2, z / 1800, 3);
    if (h < 0) c.copy(water).offsetHSL(0, 0, Math.max(h, -1500) / 10000);
    else if (h < 60) c.copy(beach);
    else if (h < 700) c.copy(low).lerp(f > 0.12 ? forest : field, THREE.MathUtils.smoothstep(Math.abs(f), 0.05, 0.3));
    else if (h < 1300) c.copy(high).lerp(rock, (h - 700) / 600);
    else c.copy(rock).lerp(snow, THREE.MathUtils.smoothstep(h, 1400, 1700));
    p.setY(i, Math.max(h, 0));
    colors.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.computeVertexNormals();
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  // Weaker haze than the global model so the land stays faintly legible through cloud gaps.
  mat.onBeforeCompile = (s) => {
    s.fragmentShader = s.fragmentShader.replace(
      '#include <fog_fragment>',
      'gl_FragColor.rgb = mix(gl_FragColor.rgb, hazeColor(normalize(vFogWorldPos - cameraPosition)), pow(aerialAmount(vFogWorldPos), 4.0) * 0.62);',
    );
  };
  const mesh = new THREE.Mesh(g, mat);
  mesh.position.y = -6200;
  return mesh;
}

/** Soft additive light shafts along the sun direction, passing through `through`. */
export function lightShafts(list: { through: THREE.Vector3; radius: number; up: number; down: number; strength: number }[]): THREE.Group {
  const group = new THREE.Group();
  const geo = new THREE.CylinderGeometry(1, 1, 1, 24, 1, true).translate(0, 0.5, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), SUN_DIR);
  for (const s of list) {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uStrength: { value: s.strength }, uTime: time },
      vertexShader: /* glsl */ `
        varying vec3 vN;
        varying vec3 vV;
        varying float vT;
        varying vec3 vWorld;
        void main() {
          vT = position.y;
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          vec4 mv = viewMatrix * vec4(vWorld, 1.0);
          vN = normalize(normalMatrix * normal);
          vV = -mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uStrength;
        uniform float uTime;
        varying vec3 vN;
        varying vec3 vV;
        varying float vT;
        varying vec3 vWorld;
        ${GLSL_ATMOSPHERE}
        void main() {
          float core = pow(abs(dot(normalize(vN), normalize(vV))), 2.5);
          float along = smoothstep(0.0, 0.25, vT) * smoothstep(1.0, 0.55, vT);
          float flick = 0.85 + 0.15 * sin(uTime * 0.3 + vWorld.x * 0.002);
          float k = core * along * flick * uStrength * (1.0 - aerialAmount(vWorld)) * smoothstep(700.0, 2600.0, length(vV));
          gl_FragColor = vec4(vec3(1.0, 0.88, 0.64) * k, 1.0);
        }`,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(s.through).addScaledVector(SUN_DIR, -s.down);
    m.quaternion.copy(q);
    m.scale.set(s.radius, s.up + s.down, s.radius);
    m.renderOrder = 4;
    group.add(m);
  }
  return group;
}
