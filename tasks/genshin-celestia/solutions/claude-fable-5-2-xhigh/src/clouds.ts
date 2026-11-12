import * as THREE from "three";
import { CLOUD_SEA_Y, GLSL_ATMOS } from "./atmos";
import type { Tick } from "./sky";
import { GLSL_NOISE, rng } from "./util";

const SHELLS = 6;

/** The endless cloud deck: stacked noise shells give it thickness, and wide openings reveal Teyvat. */
function cloudSea(): { group: THREE.Group; tick: Tick } {
  const uTime = { value: 0 };
  const geometry = new THREE.CircleGeometry(120000, 64).rotateX(-Math.PI / 2);
  const group = new THREE.Group();
  for (let i = 0; i < SHELLS; i++) {
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime, uLayer: { value: i / (SHELLS - 1) } },
      vertexShader: /* glsl */ `
varying vec3 vToFrag;
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vToFrag = w.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,
      fragmentShader: /* glsl */ `
uniform float uTime;
uniform float uLayer;
varying vec3 vToFrag;
varying vec3 vWorld;
${GLSL_NOISE}
${GLSL_ATMOS}
float density(vec2 p) {
  vec2 wind = vec2(uTime * 16.0, uTime * 6.0);
  float cover = fbm(p * 0.000055 + vec2(2.4, 7.9));
  float d = fbm((p + wind) * 0.00042) * 0.72 + fbm((p + wind * 1.7) * 0.0017 + 3.0) * 0.28;
  return d * mix(0.6, 1.18, smoothstep(0.43, 0.61, cover));
}
void main() {
  vec2 p = vWorld.xz;
  float d = density(p);
  float th = mix(0.41, 0.585, uLayer);
  float a = smoothstep(th, th + 0.1, d);
  if (a < 0.004) discard;
  // Cheap self-shadowing: compare against the density a step toward the sun.
  float lit = d - density(p + SUN_DIR.xz * 260.0);
  float l = clamp(0.42 + uLayer * 0.42 + lit * 3.2, 0.0, 1.0);
  vec3 col = mix(vec3(0.50, 0.63, 0.86), vec3(0.86, 0.92, 1.0), smoothstep(0.2, 0.55, l));
  col = mix(col, vec3(1.0, 0.985, 0.95), smoothstep(0.6, 0.9, l));
  gl_FragColor = vec4(atmosphere(col, vToFrag, cameraPosition.y), a);
}`,
    });
    const shell = new THREE.Mesh(geometry, material);
    shell.position.y = CLOUD_SEA_Y + i * 85;
    shell.renderOrder = -8 + i;
    group.add(shell);
  }
  return { group, tick: (t) => (uTime.value = t) };
}

/** Anime-style cumulus built from instanced spheres with banded lighting. */
function cumulus(): { mesh: THREE.InstancedMesh; tick: Tick } {
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
uniform float uTime;
varying vec3 vNormalW;
varying vec3 vToFrag;
${GLSL_NOISE}
void main() {
  // Lumpy billows instead of perfect spheres.
  vec2 seed = instanceMatrix[3].xz * 0.013;
  float lump = vnoise(normal.xy * 1.9 + seed) + vnoise(normal.zy * 1.9 - seed + 9.0);
  vec4 w = modelMatrix * instanceMatrix * vec4(position * (0.82 + 0.18 * lump), 1.0);
  // Slow drift with the wind; each cloud wraps as a whole 60 km out, where haze hides the jump.
  float cx = instanceMatrix[3].x;
  w.x += mod(cx + uTime * 6.0 + 60000.0, 120000.0) - 60000.0 - cx;
  vNormalW = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
  vToFrag = w.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,
    fragmentShader: /* glsl */ `
varying vec3 vNormalW;
varying vec3 vToFrag;
${GLSL_ATMOS}
void main() {
  vec3 n = normalize(vNormalW);
  vec3 v = normalize(vToFrag);
  float l = smoothstep(-0.35, 0.6, dot(n, SUN_DIR)) * 0.72 + (n.y * 0.5 + 0.5) * 0.28;
  vec3 col = mix(vec3(0.55, 0.66, 0.88), vec3(0.84, 0.90, 1.0), smoothstep(0.26, 0.40, l));
  col = mix(col, vec3(1.0, 0.98, 0.94), smoothstep(0.58, 0.74, l));
  float rim = pow(1.0 - max(dot(n, -v), 0.0), 3.0);
  col += vec3(1.0, 0.86, 0.62) * rim * 0.22 * max(dot(v, SUN_DIR), 0.0);
  gl_FragColor = vec4(atmosphere(col, vToFrag, cameraPosition.y), 1.0);
}`,
  });

  const rand = rng(2024);
  const matrices: THREE.Matrix4[] = [];
  const puff = (cx: number, cy: number, cz: number, size: number, count: number) => {
    const yaw = rand() * Math.PI;
    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1, w = rand() * 2 - 1;
      const edge = Math.min(1, Math.hypot(u, w));
      const r = size * (0.34 + rand() * 0.34) * (1.05 - 0.6 * edge);
      const lx = u * size * 1.7, lz = w * size * 0.95;
      const x = cx + lx * Math.cos(yaw) - lz * Math.sin(yaw);
      const z = cz + lx * Math.sin(yaw) + lz * Math.cos(yaw);
      const y = cy + r * 0.45 + rand() * size * 0.35 * (1 - edge);
      matrices.push(new THREE.Matrix4().compose(
        new THREE.Vector3(x, y, z),
        new THREE.Quaternion(),
        new THREE.Vector3(r * (1 + rand() * 0.3), r * (0.72 + rand() * 0.2), r * (1 + rand() * 0.3)),
      ));
    }
  };

  // Cloud mountains rising out of the deck at every distance, for layered depth.
  for (let i = 0; i < 46; i++) {
    const a = rand() * Math.PI * 2;
    const r = 8200 + Math.pow(rand(), 1.6) * 52000;
    const size = 500 + rand() * 1100 + r * 0.035;
    puff(Math.cos(a) * r, CLOUD_SEA_Y + 120, Math.sin(a) * r, size, 16 + Math.floor(rand() * 12));
  }
  // Low mounds on the deck beneath the islands, so the sea has relief up close.
  for (let i = 0; i < 18; i++) {
    const a = rand() * Math.PI * 2, r = 1500 + rand() * 6500;
    puff(Math.cos(a) * r, CLOUD_SEA_Y + 60, Math.sin(a) * r, 280 + rand() * 420, 10 + Math.floor(rand() * 8));
  }
  // Wisps drifting at island height and around the hanging rock, to sell the scale.
  for (let i = 0; i < 22; i++) {
    const a = rand() * Math.PI * 2;
    const r = 2300 + rand() * 3800;
    const size = 130 + rand() * 300;
    puff(Math.cos(a) * r, -1900 + rand() * 1700, Math.sin(a) * r, size, 9 + Math.floor(rand() * 8));
  }

  const mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 3), material, matrices.length);
  matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
  mesh.frustumCulled = false;
  return { mesh, tick: (t) => (material.uniforms.uTime.value = t) };
}

export function buildClouds(scene: THREE.Scene): Tick {
  const sea = cloudSea();
  const puffs = cumulus();
  scene.add(sea.group, puffs.mesh);
  return (t) => {
    sea.tick(t);
    puffs.tick(t);
  };
}
