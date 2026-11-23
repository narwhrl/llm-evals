import * as THREE from 'three';
import { ATMOSPHERE_FUNCTIONS, ATMOSPHERE_UNIFORMS, atmosphere } from '../core/atmosphere';
import { NOISE_FUNCTIONS, NOISE_UNIFORMS } from './shaderNoise';
import type { Puff } from './clouds';

const UP = new THREE.Vector3(0, 1, 0);

export const waterfallTime = { value: 0 };

const WATERFALL_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPhase;
uniform vec3 uOutward;
varying vec2 vUv;
varying float vDepth;
varying vec3 vRay;
void main() {
	vUv = uv;
	// The sheet swings further out the longer it has fallen.
	float swing = sin(uTime * 1.4 + uv.y * 16.0 + uPhase) * uv.y * 0.45;
	vec4 view = viewMatrix * vec4(position + uOutward * swing, 1.0);
	vDepth = -view.z;
	vRay = normalize(view.xyz);
	gl_Position = projectionMatrix * view;
}
`;

const WATERFALL_FRAGMENT = /* glsl */ `
${ATMOSPHERE_UNIFORMS}
${NOISE_UNIFORMS}
${ATMOSPHERE_FUNCTIONS}
${NOISE_FUNCTIONS}
uniform float uTime;
uniform float uPhase;
uniform vec3 uDeep;
uniform vec3 uFoam;
varying vec2 vUv;
varying float vDepth;
varying vec3 vRay;

void main() {
	// Water accelerates, so the time a drop takes grows with the square root of the distance fallen.
	vec2 flow = vec2(vUv.x * 1.5 + uPhase, sqrt(vUv.y) * 2.6 - uTime);
	float coarse = noiseFbm(flow * 0.5);
	float fine = noiseFbm(flow * 1.3 + 0.37);
	float streak = smoothstep(0.32, 0.72, coarse * 0.75 + fine * 0.5);
	// Glassy and unbroken where it leaves the lip, torn into bright rapids further down.
	float sheet = smoothstep(0.0, 0.8, vUv.y);
	float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
	float dissolve = 1.0 - smoothstep(0.68, 1.0, vUv.y + (coarse - 0.5) * 0.4);
	float alpha = edge * dissolve * mix(0.92, 0.62 + 0.38 * streak, sheet);
	vec3 color = mix(uDeep, uFoam, mix(0.6, streak, sheet));
	color = mix(color, atmosphereColor(vRay), atmosphereAmount(vDepth));
	gl_FragColor = vec4(color, alpha);
}
`;

export interface Waterfall {
  readonly mesh: THREE.Mesh;
  /** Furthest point the water reaches before turning to mist. */
  readonly foot: THREE.Vector3;
}

/**
 * A sheet of water leaving a cliff lip: it curls over the edge, then falls freely, widening and
 * dissolving into spray. Geometry is built straight in world space.
 */
export function createWaterfall(
  origin: THREE.Vector3,
  outward: THREE.Vector3,
  width: number,
  drop: number,
  phase: number,
  noise: THREE.Texture,
): Waterfall {
  const side = new THREE.Vector3().crossVectors(outward, UP);
  const crest = Math.min(1.6, width * 0.22);
  const along = 48;
  const across = 6;
  const positions = new Float32Array((along + 1) * (across + 1) * 3);
  const uvs = new Float32Array((along + 1) * (across + 1) * 2);
  const point = new THREE.Vector3();
  let footOut = 0;
  let footDown = 0;

  for (let i = 0; i <= along; i++) {
    const t = i / along;
    let out: number;
    let down: number;
    if (t < 0.07) {
      // Crest: a quarter turn from level water to a vertical fall.
      const a = (t / 0.07) * Math.PI * 0.5;
      out = -crest * Math.cos(a);
      down = 0.2 - crest * Math.sin(a);
    } else {
      // Free fall, thrown clear of the cliff fast enough to stay outside the rock all the way down.
      const fallen = drop * ((t - 0.07) / 0.93) ** 2;
      out = Math.sqrt(fallen * 1.9);
      down = 0.2 - crest - fallen;
    }
    footOut = out;
    footDown = down;
    const spread = width * (1 + 0.85 * t);
    const wander = Math.sin(t * 11 + phase) * 0.5 * t;
    for (let j = 0; j <= across; j++) {
      const across01 = j / across;
      point
        .copy(origin)
        .addScaledVector(outward, out)
        .addScaledVector(side, (across01 - 0.5) * spread + wander)
        .addScaledVector(UP, down);
      const v = i * (across + 1) + j;
      positions[v * 3] = point.x;
      positions[v * 3 + 1] = point.y;
      positions[v * 3 + 2] = point.z;
      uvs[v * 2] = across01;
      uvs[v * 2 + 1] = t;
    }
  }

  const indices: number[] = [];
  for (let i = 0; i < along; i++) {
    for (let j = 0; j < across; j++) {
      const a = i * (across + 1) + j;
      indices.push(a, a + 1, a + across + 1, a + 1, a + across + 2, a + across + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      ...atmosphere,
      uNoise: { value: noise },
      uTime: waterfallTime,
      uPhase: { value: phase },
      uOutward: { value: outward },
      uDeep: { value: new THREE.Color(0x8ccbea) },
      // Foam is pushed over white so the sunlit rapids bloom a little.
      uFoam: { value: new THREE.Color(0xf4fbff).multiplyScalar(1.4) },
    },
    vertexShader: WATERFALL_VERTEX,
    fragmentShader: WATERFALL_FRAGMENT,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 30;
  const foot = origin.clone().addScaledVector(outward, footOut).addScaledVector(UP, footDown);
  return { mesh, foot };
}

/** Still disc of water sitting in a basin hollow. */
export function createPond(centre: THREE.Vector3, radius: number, material: THREE.Material): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 48).rotateX(-Math.PI / 2), material);
  mesh.position.copy(centre);
  mesh.receiveShadow = true;
  mesh.renderOrder = 10;
  return mesh;
}

/** Spray where a waterfall lands and thins out: slow, wide, faint. */
export function waterfallMist(waterfall: Waterfall, outward: THREE.Vector3, width: number, out: Puff[], random: () => number): void {
  const side = new THREE.Vector3().crossVectors(outward, UP);
  for (let i = 0; i < 16; i++) {
    const t = i / 15;
    const reach = width * (1.2 + t * 1.6);
    out.push({
      position: waterfall.foot
        .clone()
        .addScaledVector(outward, (random() - 0.3) * reach * 0.8)
        .addScaledVector(side, (random() - 0.5) * reach * 2.4)
        .addScaledVector(UP, (t - 0.45) * width * 2.2),
      width: width * (1.6 + random() * 2.4),
      height: width * (1.1 + random() * 1.1),
      alpha: 0.07 + random() * 0.07,
      drift: new THREE.Vector3((random() - 0.5) * 6, 1 + random() * 3, (random() - 0.5) * 6),
      speed: 0.05 + random() * 0.07,
      phase: random() * Math.PI * 2,
      rotation: random() * Math.PI * 2,
      tint: new THREE.Color(0.93, 0.97, 1.0),
    });
  }
}
