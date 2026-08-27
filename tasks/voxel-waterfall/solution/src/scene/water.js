import * as THREE from 'three';
import { GRID, smoothHeightmap } from './terrain.js';

const NEIGH8 = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

const mod = (v, p) => ((v % p) + p) % p;

/**
 * Trace a spring-to-footfall river and carve it into the heightmap.
 *
 * Strategy:
 *  1. pick a spring high on the main peak's flank;
 *  2. descend the *smoothed* heightmap (steepest descent + momentum +
 *     a bias toward the camera side so the falls are visible on load);
 *  3. make the elevation profile monotone, then amplify the steepest
 *     window into a cliff so a tall waterfall slab is guaranteed;
 *  4. carve the channel bed + banks into `heights` and fill the water
 *     surface map; finish with a plunge pool at the mountain foot.
 *
 * Mutates `heights`. Returns { water, fallWorldX, fallWorldZ, fallTopY, pathLen }.
 */
export function carveWater(heights, { seed, fallHeight, channelWidth }) {
  const hs = smoothHeightmap(heights, 3);
  const water = new Int16Array(GRID * GRID).fill(-1);
  const visited = new Uint8Array(GRID * GRID);

  // --- 1. spring: highest smoothed cell near the main peak's SE flank ---
  const pcx = Math.round(0.42 * GRID), pcz = Math.round(0.46 * GRID);
  let sx = pcx + 8, sz = pcz + 6, bestH = -1;
  for (let dz = -4; dz <= 4; dz++) {
    for (let dx = -4; dx <= 4; dx++) {
      const x = sx + dx, z = sz + dz;
      if (x < 12 || z < 12 || x >= GRID - 12 || z >= GRID - 12) continue;
      const v = hs[z * GRID + x];
      if (v > bestH) { bestH = v; sx = x; sz = z; }
    }
  }

  // --- 2. descent with momentum ---
  const path = [{ x: sx, z: sz }];
  visited[sz * GRID + sx] = 1;
  let dirX = 0.8, dirZ = 0.6;
  const BASE = 9.5;
  const BIAS_X = 0.806, BIAS_Z = 0.592; // toward the secondary peak / camera

  for (let step = 0; step < 600; step++) {
    const ch = hs[path[path.length - 1].z * GRID + path[path.length - 1].x];
    if (ch <= BASE) break;
    let bestX = -1, bestZ = -1, bestScore = Infinity, bestNx = 0, bestNz = 0;
    for (const [dx, dz] of NEIGH8) {
      const x = path[path.length - 1].x + dx;
      const z = path[path.length - 1].z + dz;
      if (x < 12 || z < 12 || x >= GRID - 12 || z >= GRID - 12) continue;
      const i = z * GRID + x;
      const len = Math.hypot(dx, dz);
      const nx = dx / len, nz = dz / len;
      let score = hs[i];
      score += visited[i] ? 8 : 0;                      // discourage loops
      score -= 2.0 * (nx * dirX + nz * dirZ);           // momentum
      score -= 0.9 * (nx * BIAS_X + nz * BIAS_Z);       // scenic bias
      if (score < bestScore) {
        bestScore = score; bestX = x; bestZ = z; bestNx = nx; bestNz = nz;
      }
    }
    if (bestX < 0) break;
    visited[bestZ * GRID + bestX] = 1;
    dirX = dirX * 0.55 + bestNx * 0.45;
    dirZ = dirZ * 0.55 + bestNz * 0.45;
    const dl = Math.hypot(dirX, dirZ) || 1;
    dirX /= dl; dirZ /= dl;
    path.push({ x: bestX, z: bestZ });
  }

  // --- 3. monotone profile + guaranteed cliff ---
  const e = path.map((p) => hs[p.z * GRID + p.x]);
  for (let i = 1; i < e.length; i++) e[i] = Math.min(e[i], e[i - 1]);

  let steepIdx = Math.floor(path.length * 0.45);
  let maxDrop = -Infinity;
  for (let i = 6; i < path.length - 6; i++) {
    const drop = e[i - 4] - e[i + 2];
    if (drop > maxDrop) { maxDrop = drop; steepIdx = i; }
  }
  for (let i = steepIdx + 2; i < e.length; i++) {
    e[i] = Math.min(e[i], Math.max(e[steepIdx] - fallHeight, 5));
  }

  // --- 4. carve channel + banks, set water surface ---
  const r = channelWidth + 1.2;
  const rCeil = Math.ceil(r + 1.5);
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    for (let dz = -rCeil; dz <= rCeil; dz++) {
      for (let dx = -rCeil; dx <= rCeil; dx++) {
        const x = p.x + dx, z = p.z + dz;
        if (x < 1 || z < 1 || x >= GRID - 1 || z >= GRID - 1) continue;
        const d = Math.hypot(dx, dz);
        if (d > r + 1.5) continue;
        const ci = z * GRID + x;
        const bed = e[i] - 1.8 - Math.max(0, r - d) * 0.9;
        const bedR = Math.round(bed);
        if (bedR < heights[ci]) {
          // cap carving depth so soft ground keeps a natural canyon
          heights[ci] = Math.max(1, Math.max(heights[ci] - 16, bedR));
        }
        const surf = e[i] - Math.max(0, d - (r - 0.8)) * 0.9;
        const sR = Math.round(surf);
        if (sR > heights[ci] && (water[ci] < 0 || sR > water[ci])) water[ci] = sR;
      }
    }
  }

  // --- 5. plunge pool at the mountain foot ---
  const end = path[path.length - 1];
  const poolR = 7 + channelWidth * 2;
  const poolLevel = Math.round(e[e.length - 1]);
  for (let dz = -poolR - 1; dz <= poolR + 1; dz++) {
    for (let dx = -poolR - 1; dx <= poolR + 1; dx++) {
      const x = end.x + dx, z = end.z + dz;
      if (x < 1 || z < 1 || x >= GRID - 1 || z >= GRID - 1) continue;
      const d = Math.hypot(dx, dz);
      if (d > poolR) continue;
      const ci = z * GRID + x;
      const bed = poolLevel - 1.5 - 3.8 * Math.max(0, 1 - (d / poolR) ** 2);
      const bedR = Math.round(bed);
      if (bedR < heights[ci]) heights[ci] = Math.max(1, bedR);
      if (poolLevel > heights[ci] && (water[ci] < 0 || poolLevel > water[ci])) {
        water[ci] = poolLevel;
      }
    }
  }

  const lip = path[steepIdx];
  const foot = path[Math.min(steepIdx + 3, path.length - 1)];
  return {
    water,
    fallWorldX: foot.x - GRID / 2 + 0.5,
    fallWorldZ: foot.z - GRID / 2 + 0.5,
    fallTopY: e[steepIdx],
    pathLen: path.length,
  };
}

// ---------------------------------------------------------------- shader ---

const WATER_VERT = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;
  void main() {
    vNormal = normal;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uFlow;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform vec3 uFallPos;
  uniform float uFallTopY;
  varying vec3 vWorld;
  varying vec3 vNormal;

  float hash21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p + 23.45);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 n = normalize(vNormal);
    float t = uTime * uFlow;
    vec3 deep = vec3(0.07, 0.30, 0.50);
    vec3 lite = vec3(0.22, 0.56, 0.76);
    float alpha = 0.82;
    vec3 col;

    if (n.y > 0.5) {
      // water surface: drifting ripples + splash foam at the fall base
      float r1 = sin(vWorld.x * 1.35 + t * 2.1) * sin(vWorld.z * 1.15 - t * 1.7);
      float r2 = sin((vWorld.x + vWorld.z) * 0.65 - t * 2.9);
      float sparkle = smoothstep(0.45, 0.95, r1 * r2 * 0.5 + 0.5);
      col = mix(deep, lite, 0.35 + sparkle * 0.45);
      float dFall = distance(vWorld.xz, uFallPos.xz);
      float splash = (1.0 - smoothstep(1.5, 8.5, dFall))
                   * (0.55 + 0.45 * sin(t * 6.0 + vWorld.x * 2.3 + vWorld.z * 1.7));
      col = mix(col, vec3(0.93, 0.97, 1.0), clamp(splash, 0.0, 1.0) * 0.7);
    } else {
      // falling / bank faces: foam streaks scrolling downward
      float u = abs(n.x) > 0.5 ? vWorld.z : vWorld.x;
      float yScroll = vWorld.y - t * 6.5;
      float rnd = hash21(vec2(floor(u * 1.6), floor(yScroll * 1.1)));
      float rnd2 = hash21(vec2(floor(u * 3.1) + 7.0, floor(yScroll * 2.3) + 3.0));
      float foam = smoothstep(0.52, 0.92, rnd * 0.7 + rnd2 * 0.3);
      col = mix(deep, lite, 0.4);
      col = mix(col, vec3(0.90, 0.95, 1.0), foam * 0.8);
      float lip = smoothstep(6.0, 0.5, abs(vWorld.y - uFallTopY));
      col = mix(col, vec3(0.95, 0.98, 1.0), lip * 0.35);
      alpha = 0.88;
    }

    // sun diffuse + manual fog
    float diff = max(dot(n, uSunDir), 0.0);
    col *= 0.55 + 0.75 * diff * uSunColor * 1.4 + uSunColor * 0.15;
    float dist = length(vWorld - cameraPosition);
    float f = smoothstep(uFogNear, uFogFar, dist);
    col = mix(col, uFogColor, f);
    alpha *= 1.0 - f * 0.5;

    gl_FragColor = vec4(pow(max(col, 0.0), vec3(0.4545)), alpha);
  }
`;

export function createWaterMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: WATER_VERT,
    fragmentShader: WATER_FRAG,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uFlow: { value: 1 },
      uSunDir: { value: new THREE.Vector3(0.5, 0.8, 0.3) },
      uSunColor: { value: new THREE.Color(0xffe0b8) },
      uFogColor: { value: new THREE.Color(0xc4d8e4) },
      uFogNear: { value: 150 },
      uFogFar: { value: 520 },
      uFallPos: { value: new THREE.Vector3(0, 0, 0) },
      uFallTopY: { value: 40 },
    },
  });
}
