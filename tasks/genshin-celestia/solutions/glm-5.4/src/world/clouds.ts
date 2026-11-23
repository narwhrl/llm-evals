import * as THREE from 'three';
import { ATMOSPHERE_FUNCTIONS, ATMOSPHERE_UNIFORMS, atmosphere } from '../core/atmosphere';
import { TAU } from '../core/builder';
import { NOISE_FUNCTIONS, NOISE_UNIFORMS } from './shaderNoise';

/** One soft billboard. */
export interface Puff {
  position: THREE.Vector3;
  width: number;
  height: number;
  /** Opacity before the texture's own alpha is applied. */
  alpha: number;
  /** How far it wanders over its cycle. */
  drift: THREE.Vector3;
  /** Radians per second of its drift cycle. */
  speed: number;
  phase: number;
  rotation: number;
  tint: THREE.Color;
}

export interface PuffFieldOptions {
  texture: THREE.Texture;
  lit: THREE.ColorRepresentation;
  shade: THREE.ColorRepresentation;
  opacity?: number;
  /** Puffs fade out as the camera closes in, and vanish entirely inside `fadeNear`. */
  fadeNear?: number;
  fadeFar?: number;
  renderOrder?: number;
}

const PUFF_VERTEX = /* glsl */ `
attribute vec4 aMotion;
attribute vec3 aDrift;
uniform float uTime;
varying vec2 vUv;
varying float vAlpha;
varying float vDepth;
varying vec3 vRay;
varying vec3 vTint;
void main() {
	vUv = uv;
	// Each puff drifts on its own slow cycle and always comes back, so the composition never drifts away.
	vec3 centre = instanceMatrix[3].xyz + aDrift * sin(uTime * aMotion.w + aMotion.z);
	float c = cos(aMotion.x);
	float s = sin(aMotion.x);
	vec2 corner = mat2(c, s, -s, c) * position.xy;
	corner *= vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz));
	vAlpha = aMotion.y;
	vTint = instanceColor;
	vec4 view = viewMatrix * vec4(centre, 1.0);
	vDepth = -view.z;
	vRay = normalize(view.xyz);
	view.xy += corner;
	gl_Position = projectionMatrix * view;
}
`;

const PUFF_FRAGMENT = /* glsl */ `
${ATMOSPHERE_UNIFORMS}
uniform sampler2D uMap;
uniform vec3 uLit;
uniform vec3 uShade;
uniform float uOpacity;
uniform vec2 uFade;
${ATMOSPHERE_FUNCTIONS}
varying vec2 vUv;
varying float vAlpha;
varying float vDepth;
varying vec3 vRay;
varying vec3 vTint;
void main() {
	vec4 texel = texture2D(uMap, vUv);
	float alpha = texel.a * vAlpha * uOpacity * smoothstep(uFade.x, uFade.y, vDepth);
	if (alpha < 0.004) discard;
	vec3 color = mix(uShade, uLit, texel.r) * vTint;
	color = mix(color, atmosphereColor(vRay), atmosphereAmount(vDepth));
	gl_FragColor = vec4(color, alpha);
}
`;

/**
 * Clouds or mist drawn as a single instanced mesh of camera-facing quads. Alpha blending needs a
 * back-to-front order that instancing cannot sort on the GPU, so instances are re-ordered on the CPU
 * whenever the view changes enough to matter.
 */
export class PuffField {
  private readonly puffs: Puff[] = [];
  private mesh: THREE.InstancedMesh | null = null;
  private material!: THREE.ShaderMaterial;
  private source: { matrix: Float32Array; color: Float32Array; motion: Float32Array; drift: Float32Array } | null = null;
  private order = new Uint32Array();
  private indices: number[] = [];
  private depths = new Float32Array();
  private readonly forward = new THREE.Vector3();
  private readonly eye = new THREE.Vector3();
  private readonly options: Required<PuffFieldOptions>;

  constructor(options: PuffFieldOptions) {
    this.options = {
      opacity: 1,
      fadeNear: 20,
      fadeFar: 60,
      renderOrder: 20,
      ...options,
    };
  }

  add(puff: Puff): void {
    this.puffs.push(puff);
  }

  build(): THREE.Mesh {
    const count = this.puffs.length;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const motion = new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4);
    const drift = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    geometry.setAttribute('aMotion', motion);
    geometry.setAttribute('aDrift', drift);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        ...atmosphere,
        uTime: { value: 0 },
        uMap: { value: this.options.texture },
        uLit: { value: new THREE.Color(this.options.lit) },
        uShade: { value: new THREE.Color(this.options.shade) },
        uOpacity: { value: this.options.opacity },
        uFade: { value: new THREE.Vector2(this.options.fadeNear, this.options.fadeFar) },
      },
      vertexShader: PUFF_VERTEX,
      fragmentShader: PUFF_FRAGMENT,
      transparent: true,
      depthWrite: false,
    });
    this.material = material;

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    const matrix = new THREE.Matrix4();
    this.puffs.forEach((puff, i) => {
      matrix.makeScale(puff.width, puff.height, 1);
      matrix.setPosition(puff.position);
      mesh.setMatrixAt(i, matrix);
      mesh.setColorAt(i, puff.tint);
      motion.array.set([puff.rotation, puff.alpha, puff.phase, puff.speed], i * 4);
      drift.array.set([puff.drift.x, puff.drift.y, puff.drift.z], i * 3);
    });
    const instanceColor = mesh.instanceColor as THREE.InstancedBufferAttribute;
    for (const attribute of [mesh.instanceMatrix, instanceColor, motion, drift]) {
      attribute.setUsage(THREE.DynamicDrawUsage);
    }

    mesh.frustumCulled = false;
    mesh.renderOrder = this.options.renderOrder;
    this.source = {
      matrix: new Float32Array(mesh.instanceMatrix.array),
      color: new Float32Array(instanceColor.array),
      motion: new Float32Array(motion.array),
      drift: new Float32Array(drift.array),
    };
    this.order = new Uint32Array(count);
    this.indices = Array.from({ length: count }, (_, i) => i);
    this.depths = new Float32Array(count);
    this.mesh = mesh;
    this.puffs.length = 0;
    return mesh;
  }

  update(time: number, camera: THREE.Camera): void {
    const mesh = this.mesh;
    const source = this.source;
    if (!mesh || !source || mesh.count < 2) return;
    this.material.uniforms.uTime.value = time;

    const count = mesh.count;
    camera.getWorldDirection(this.forward);
    camera.getWorldPosition(this.eye);
    const { matrix, motion, drift } = source;
    const { depths, indices } = this;
    for (let i = 0; i < count; i++) {
      const wave = Math.sin(time * motion[i * 4 + 3] + motion[i * 4 + 2]);
      const x = matrix[i * 16 + 12] + drift[i * 3] * wave - this.eye.x;
      const y = matrix[i * 16 + 13] + drift[i * 3 + 1] * wave - this.eye.y;
      const z = matrix[i * 16 + 14] + drift[i * 3 + 2] * wave - this.eye.z;
      depths[i] = x * this.forward.x + y * this.forward.y + z * this.forward.z;
    }
    indices.sort((a, b) => depths[b] - depths[a]);

    let changed = false;
    for (let i = 0; i < count; i++) {
      if (indices[i] !== this.order[i]) {
        changed = true;
        break;
      }
    }
    if (!changed) return;
    this.order.set(indices);

    const geometry = mesh.geometry;
    const target = {
      matrix: mesh.instanceMatrix.array as Float32Array,
      color: (mesh.instanceColor as THREE.InstancedBufferAttribute).array as Float32Array,
      motion: geometry.getAttribute('aMotion').array as Float32Array,
      drift: geometry.getAttribute('aDrift').array as Float32Array,
    };
    for (let rank = 0; rank < count; rank++) {
      const from = indices[rank];
      copy(target.matrix, source.matrix, from * 16, rank * 16, 16);
      copy(target.color, source.color, from * 3, rank * 3, 3);
      copy(target.motion, source.motion, from * 4, rank * 4, 4);
      copy(target.drift, source.drift, from * 3, rank * 3, 3);
    }
    mesh.instanceMatrix.needsUpdate = true;
    (mesh.instanceColor as THREE.InstancedBufferAttribute).needsUpdate = true;
    geometry.getAttribute('aMotion').needsUpdate = true;
    geometry.getAttribute('aDrift').needsUpdate = true;
  }
}

function copy(target: Float32Array, source: Float32Array, from: number, to: number, length: number): void {
  for (let i = 0; i < length; i++) target[to + i] = source[from + i];
}

/** Height of the cloud sea's flat, far layer. */
export const CLOUD_SEA_LEVEL = -380;

const SEA_VERTEX = /* glsl */ `
varying vec3 vWorldPos;
varying float vDepth;
varying vec3 vRay;
void main() {
	vec4 world = modelMatrix * vec4(position, 1.0);
	vWorldPos = world.xyz;
	vec4 view = viewMatrix * world;
	vDepth = -view.z;
	vRay = normalize(view.xyz);
	gl_Position = projectionMatrix * view;
}
`;

const SEA_FRAGMENT = /* glsl */ `
${ATMOSPHERE_UNIFORMS}
${NOISE_UNIFORMS}
${ATMOSPHERE_FUNCTIONS}
${NOISE_FUNCTIONS}
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uLit;
uniform vec3 uShade;
varying vec3 vWorldPos;
varying float vDepth;
varying vec3 vRay;

// Domain warping gives the tops their billowed shape.
float cloudDensity(vec2 p) {
	float warp = noiseFbm(p * 0.5 + vec2(3.1, 7.7));
	return noiseFbm(p + (warp - 0.5) * 1.6);
}

void main() {
	vec2 p = vWorldPos.xz * 0.0017 + vec2(uTime * 0.0035, uTime * 0.0014);
	float density = cloudDensity(p);
	// Shade from the slope of the density field, as if it were a height field.
	float e = 0.035;
	vec3 normal = normalize(vec3(
		-(cloudDensity(p + vec2(e, 0.0)) - density) / e * 0.85,
		1.0,
		-(cloudDensity(p + vec2(0.0, e)) - density) / e * 0.85));
	float light = clamp(dot(normal, uSunDir), 0.0, 1.0);
	float relief = smoothstep(0.3, 0.72, density);
	// Lit tops stay warm white; hollows between them fall back into blue shadow.
	vec3 color = mix(uShade, uLit, light * light * light) * (0.9 + 0.18 * relief);
	color += uLit * pow(max(dot(vRay, uSunDirView), 0.0), 6.0) * 0.22 * (1.0 - relief);
	// Thinner patches let the far country below show through.
	float alpha = smoothstep(0.2, 0.4, density);
	color = mix(color, atmosphereColor(vRay), atmosphereAmount(vDepth));
	gl_FragColor = vec4(color, alpha);
}
`;

/** The flat far layer of the cloud sea, sitting well below the islands. */
export function createCloudSea(noise: THREE.Texture): THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      ...atmosphere,
      uNoise: { value: noise },
      uTime: { value: 0 },
      // The flat layer is the shadowed ground between cloud tops, so it sits a step below their white.
      uLit: { value: new THREE.Color(0xeee8de) },
      uShade: { value: new THREE.Color(0x7f98c0) },
    },
    vertexShader: SEA_VERTEX,
    fragmentShader: SEA_FRAGMENT,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(9000, 96).rotateX(-Math.PI / 2), material);
  mesh.position.y = CLOUD_SEA_LEVEL;
  mesh.renderOrder = 15;
  mesh.frustumCulled = false;
  return mesh;
}

/** A cumulus: overlapping puffs around one centre, flat at the base and rounded on top. */
export function cumulus(
  out: Puff[],
  centre: THREE.Vector3,
  size: number,
  count: number,
  alpha: number,
  random: () => number,
): void {
  for (let i = 0; i < count; i++) {
    const angle = random() * TAU;
    const reach = size * 0.34 * Math.sqrt(random());
    const width = size * (0.45 + random() * 0.4);
    out.push({
      position: centre.clone().add(
        new THREE.Vector3(Math.cos(angle) * reach, size * (0.1 + random() * 0.22 * (1 - reach / (size * 0.36))), Math.sin(angle) * reach),
      ),
      width,
      height: width * (0.5 + random() * 0.25),
      alpha: alpha * (0.7 + random() * 0.5),
      drift: new THREE.Vector3((random() - 0.5) * size * 0.12, (random() - 0.5) * size * 0.04, (random() - 0.5) * size * 0.12),
      speed: 0.03 + random() * 0.05,
      phase: random() * TAU,
      rotation: (random() - 0.5) * 0.5,
      tint: new THREE.Color(0.97 + random() * 0.05, 0.97 + random() * 0.04, 1.0),
    });
  }
}
