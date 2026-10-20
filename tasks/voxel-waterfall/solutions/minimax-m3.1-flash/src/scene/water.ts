/**
 * Water: the falling sheets, the plunge pools, the spray and the mist.
 *
 * The falling sheet is built from the terrain route itself, so the water
 * always hugs the surface it runs over and turns into a vertical curtain
 * wherever the ground drops away. The cliff the stream pours over is wide, so
 * the curtain is a broad sheet of water rather than a thin ribbon.
 */

import * as THREE from "three";
import type { TerrainField, Waterfall } from "./terrain";
import { createBuffers, pushBox, toGeometry } from "./voxel";
import { createMistTexture, createSprayTexture, createWaterfallTexture } from "./textures";

export interface WaterBuild {
  group: THREE.Group;
  update: (elapsed: number, delta: number) => void;
  dispose: () => void;
}

const WATER_COLOR = [0.74, 0.9, 1.0];

/** Half width of the falling curtain, in cells. */
const CURTAIN_HALF_WIDTH = 2.9;

function buildChannelGeometry(field: TerrainField, waterfall: Waterfall) {
  const buf = createBuffers();
  const { half, heights, size } = field;
  const { path, surface } = waterfall;

  // The stream on the ground: the route cell plus its two flanking cells,
  // so the river reads as a ribbon rather than a line.
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    const top = surface[i];
    const cellHeight = heights[p.z * size + p.x];

    const cells: Array<[number, number]> = [[p.x, p.z]];
    const dx = p.dirX;
    const dz = p.dirZ;
    const length = Math.hypot(dx, dz);
    if (length > 0) {
      const px = -dz / length;
      const pz = dx / length;
      for (const sign of [-1, 1]) {
        const nx = Math.round(p.x + px * sign);
        const nz = Math.round(p.z + pz * sign);
        if (nx < 0 || nz < 0 || nx >= size || nz >= size) continue;
        // Only flood the flank when the ground there is not higher.
        if (heights[nz * size + nx] > cellHeight + 1) continue;
        cells.push([nx, nz]);
      }
    }

    for (const [cx, cz] of cells) {
      const wx = cx - half;
      const wz = cz - half;
      pushBox(buf, [wx + 0.02, top - 0.5, wz + 0.02], [wx + 0.98, top, wz + 0.98], WATER_COLOR);
    }
  }

  // Vertical curtains wherever the ground drops between two route cells.
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const topA = surface[i];
    const topB = surface[i + 1];
    const drop = topA - topB;
    if (drop <= 0.45) continue;

    const dx = Math.sign(b.x - a.x);
    const dz = Math.sign(b.z - a.z);
    const len = Math.hypot(dx, dz) || 1;
    const nx = dx / len;
    const nz = dz / len;
    // The curtain hugs the cliff face, pushed a hair into the lower cell.
    const boundaryX = (a.x - half) + (dx === 0 ? 0 : dx > 0 ? 1 : 0);
    const boundaryZ = (a.z - half) + (dz === 0 ? 0 : dz > 0 ? 1 : 0);
    const cx = boundaryX + nx * 0.08;
    const cz = boundaryZ + nz * 0.08;
    const px = -nz;
    const pz = nx;

    const halfWidth = CURTAIN_HALF_WIDTH;
    const thickness = 0.2;
    const x0 = cx - Math.abs(px) * halfWidth - Math.abs(nx) * thickness;
    const x1 = cx + Math.abs(px) * halfWidth + Math.abs(nx) * thickness;
    const z0 = cz - Math.abs(pz) * halfWidth - Math.abs(nz) * thickness;
    const z1 = cz + Math.abs(pz) * halfWidth + Math.abs(nz) * thickness;

    pushBox(
      buf,
      [Math.min(x0, x1), topB - 0.3, Math.min(z0, z1)],
      [Math.max(x0, x1), topA + 0.05, Math.max(z0, z1)],
      WATER_COLOR,
    );
  }

  return toGeometry(buf);
}

const POOL_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const POOL_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uImpact;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uSky;
  uniform vec3 uSun;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;

    // Concentric ripples spreading from where the fall lands.
    float wave = sin(r * 34.0 - uTime * 4.0) * exp(-r * 3.2);
    float wave2 = sin(r * 61.0 - uTime * 6.3 + uImpact) * exp(-r * 5.0) * 0.5;
    float chop = noise(p * 9.0 + vec2(uTime * 0.35, -uTime * 0.22)) - 0.5;

    float depth = smoothstep(0.15, 1.0, r);
    vec3 color = mix(uShallow, uDeep, depth);
    float highlight = clamp(wave + wave2 + chop * 0.6, -1.0, 1.0);
    color += uSun * max(highlight, 0.0) * 0.55;
    color = mix(color, uSky, smoothstep(0.45, 1.0, r) * 0.45);

    float alpha = mix(0.85, 0.5, smoothstep(0.7, 1.0, r));
    alpha *= smoothstep(1.0, 0.92, r);
    gl_FragColor = vec4(color, alpha);
  }
`;

interface Particles {
  points: THREE.Points;
  velocities: Float32Array;
  count: number;
  life: Float32Array;
  span: number;
  rise: number;
  size: number;
}

function createParticles(
  origin: THREE.Vector3,
  count: number,
  sprite: THREE.Texture,
  options: { size: number; rise: number; spread: number; span: number },
): Particles {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const life = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * options.spread;
    positions[i * 3 + 0] = origin.x + (Math.random() - 0.5) * options.span;
    positions[i * 3 + 1] = origin.y + Math.random() * 0.8;
    positions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * options.span;
    velocities[i * 3 + 0] = Math.cos(angle) * speed;
    velocities[i * 3 + 1] = options.rise * (0.6 + Math.random() * 0.8);
    velocities[i * 3 + 2] = Math.sin(angle) * speed;
    life[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size: options.size,
    map: sprite,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return { points, velocities, count, life, span: options.span, rise: options.rise, size: options.size };
}

export function buildWater(field: TerrainField, skyColor: THREE.Color, sunColor: THREE.Color): WaterBuild {
  const group = new THREE.Group();
  const fallTexture = createWaterfallTexture();
  fallTexture.repeat.set(1, 1);
  const fallMaterial = new THREE.MeshPhongMaterial({
    map: fallTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
    shininess: 120,
    specular: 0xffffff,
    emissive: new THREE.Color(0x4d7f9e),
    emissiveIntensity: 0.85,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const spraySprite = createSprayTexture();
  const mistSprite = createMistTexture();
  const sprays: Particles[] = [];
  const poolMaterials: THREE.ShaderMaterial[] = [];

  for (const waterfall of field.waterfalls) {
    const geometry = buildChannelGeometry(field, waterfall);
    const mesh = new THREE.Mesh(geometry, fallMaterial);
    mesh.renderOrder = 2;
    group.add(mesh);

    for (const pool of waterfall.pools) {
      const poolMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uImpact: { value: waterfall.id * 1.7 },
          uShallow: { value: new THREE.Color(0x8fd3e8) },
          uDeep: { value: new THREE.Color(0x1d5f7a) },
          uSky: { value: skyColor.clone() },
          uSun: { value: sunColor.clone() },
        },
        vertexShader: POOL_VERTEX,
        fragmentShader: POOL_FRAGMENT,
        transparent: true,
        depthWrite: false,
      });
      const disc = new THREE.Mesh(new THREE.CircleGeometry(pool.radius, 48), poolMaterial);
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(pool.x, pool.level + 0.02, pool.z);
      disc.renderOrder = 1;
      group.add(disc);
      poolMaterials.push(poolMaterial);

      const origin = new THREE.Vector3(pool.x, pool.level, pool.z);
      sprays.push(
        createParticles(origin, 240, spraySprite, {
          size: 1.4,
          rise: 5.5,
          spread: 2.6,
          span: pool.radius * 1.2,
        }),
      );
      // A soft cloud of mist that drifts up where the water lands.
      sprays.push(
        createParticles(origin, 90, mistSprite, {
          size: 6.5,
          rise: 1.5,
          spread: 1.1,
          span: pool.radius * 0.9,
        }),
      );
    }
  }

  for (const particles of sprays) group.add(particles.points);

  return {
    group,
    update: (elapsed: number, delta: number) => {
      fallTexture.offset.y = (fallTexture.offset.y - delta * 1.5) % 1;
      for (const material of poolMaterials) {
        material.uniforms.uTime.value = elapsed;
      }
      for (const particles of sprays) {
        const position = particles.points.geometry.getAttribute("position") as THREE.BufferAttribute;
        const array = position.array as Float32Array;
        for (let i = 0; i < particles.count; i++) {
          const i3 = i * 3;
          array[i3 + 1] += particles.velocities[i3 + 1] * delta;
          array[i3 + 0] += particles.velocities[i3 + 0] * delta;
          array[i3 + 2] += particles.velocities[i3 + 2] * delta;
          particles.velocities[i3 + 1] -= 3.4 * delta;
          particles.life[i] += delta * 0.55;
          if (particles.life[i] > 1 || array[i3 + 1] < particles.rise * 0.05) {
            particles.life[i] = 0;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * particles.size * 0.4;
            array[i3 + 0] = (Math.random() - 0.5) * particles.span;
            array[i3 + 2] = (Math.random() - 0.5) * particles.span;
            array[i3 + 1] = 0;
            particles.velocities[i3 + 0] = Math.cos(angle) * speed;
            particles.velocities[i3 + 1] = particles.rise * (0.6 + Math.random() * 0.8);
            particles.velocities[i3 + 2] = Math.sin(angle) * speed;
          }
        }
        position.needsUpdate = true;
      }
    },
    dispose: () => {
      fallTexture.dispose();
      fallMaterial.dispose();
      spraySprite.dispose();
      mistSprite.dispose();
      group.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const material = mesh.material as THREE.Material | THREE.Material[];
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
    },
  };
}
