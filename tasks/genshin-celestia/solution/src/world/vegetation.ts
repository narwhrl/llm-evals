import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { SimplexNoise, createRng, fbm, smoothstep } from '../core/noise';
import { TAU } from '../core/builder';
import type { Island } from './island';

type Kind = 'broadleaf' | 'cypress' | 'bush';

interface Planting {
  matrix: THREE.Matrix4;
  tint: THREE.Color;
}

interface Clearing {
  x: number;
  z: number;
  radius: number;
}

const SHADE_LOW = new THREE.Color(0.5, 0.62, 0.56);
const SHADE_HIGH = new THREE.Color(1.0, 1.08, 0.74);

/** Rounded lump of foliage, roughened by noise and shaded darker toward its underside. */
function foliage(radius: number, seed: number, stretch: number): THREE.BufferGeometry {
  const noise = new SimplexNoise(seed);
  const geometry = mergeVertices(new THREE.IcosahedronGeometry(radius, 2), 1e-3);
  const position = geometry.getAttribute('position');
  const point = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i);
    const lump = 1 + 0.2 * noise.noise3((point.x / radius) * 1.6, (point.y / radius) * 1.6, (point.z / radius) * 1.6);
    point.multiplyScalar(lump);
    point.y *= stretch;
    position.setXYZ(i, point.x, point.y, point.z);
  }
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  const box = geometry.boundingBox as THREE.Box3;
  const color = new Float32Array(position.count * 3);
  const shade = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    shade.copy(SHADE_LOW).lerp(SHADE_HIGH, smoothstep(box.min.y, box.max.y, position.getY(i)));
    color[i * 3] = shade.r;
    color[i * 3 + 1] = shade.g;
    color[i * 3 + 2] = shade.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
  return geometry;
}

/** Broadleaf crown: one large lump over four smaller ones, each with its own shaded underside. */
function broadleafCrown(): THREE.BufferGeometry {
  const lumps: [number, number, number, number, number][] = [
    [0, 4.6, 0, 2.3, 1],
    [1.5, 3.7, 0.5, 1.5, 2],
    [-1.4, 3.8, 0.7, 1.6, 3],
    [0.3, 3.9, -1.5, 1.5, 4],
    [-0.5, 3.6, 1.5, 1.4, 5],
    [0.9, 5.7, -0.6, 1.3, 6],
  ];
  const parts = lumps.map(([x, y, z, radius, seed]) => foliage(radius, seed, 0.85).translate(x, y, z));
  const crown = mergeGeometries(parts, false);
  if (!crown) throw new Error('Could not assemble the broadleaf crown');
  return crown;
}

/** Cypress: a tall spindle of foliage with soft, irregular edges. */
function cypressCrown(): THREE.BufferGeometry {
  const profile = [[0, 0.4], [0.75, 1.0], [1.05, 2.6], [1.0, 4.4], [0.72, 6.4], [0.36, 8.4], [0, 9.8]];
  const geometry = new THREE.LatheGeometry(profile.map(([radius, y]) => new THREE.Vector2(radius, y)), 12);
  const noise = new SimplexNoise(77);
  const position = geometry.getAttribute('position');
  const point = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i);
    const ripple = 1 + 0.16 * noise.noise3(point.x * 2.2, point.y * 0.9, point.z * 2.2);
    position.setXYZ(i, point.x * ripple, point.y, point.z * ripple);
  }
  geometry.computeVertexNormals();
  const color = new Float32Array(position.count * 3);
  const shade = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    shade.copy(SHADE_LOW).lerp(SHADE_HIGH, smoothstep(0, 9.8, position.getY(i)) * 0.85);
    color[i * 3] = shade.r;
    color[i * 3 + 1] = shade.g;
    color[i * 3 + 2] = shade.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
  return geometry;
}

const TINTS: Record<Kind, [number, number, number, number, number, number]> = {
  // hue low, hue high, saturation low, saturation high, lightness low, lightness high
  broadleaf: [0.23, 0.3, 0.5, 0.68, 0.36, 0.46],
  cypress: [0.28, 0.36, 0.38, 0.52, 0.26, 0.33],
  bush: [0.21, 0.29, 0.5, 0.7, 0.38, 0.5],
};

/**
 * Collects plants across every island and emits them as a handful of instanced meshes.
 * Positions are in world space; the meadow is never grown over cleared ground.
 */
export class Vegetation {
  private readonly plantings: Record<Kind, Planting[]> = { broadleaf: [], cypress: [], bush: [] };
  private readonly cleared: Clearing[] = [];
  private readonly matrix = new THREE.Matrix4();
  private readonly quaternion = new THREE.Quaternion();
  private readonly up = new THREE.Vector3(0, 1, 0);
  private readonly random: () => number;

  constructor(seed: number) {
    this.random = createRng(seed);
  }

  /** Keeps plants off a circular patch of ground. */
  clear(x: number, z: number, radius: number): void {
    this.cleared.push({ x, z, radius });
  }

  isCleared(x: number, z: number, margin: number): boolean {
    return this.cleared.some((patch) => Math.hypot(x - patch.x, z - patch.z) < patch.radius + margin);
  }

  plant(kind: Kind, x: number, y: number, z: number, scale: number, yaw: number): void {
    const [h0, h1, s0, s1, l0, l1] = TINTS[kind];
    const r = this.random;
    const tint = new THREE.Color().setHSL(h0 + r() * (h1 - h0), s0 + r() * (s1 - s0), l0 + r() * (l1 - l0));
    this.quaternion.setFromAxisAngle(this.up, yaw);
    this.matrix.compose(new THREE.Vector3(x, y, z), this.quaternion, new THREE.Vector3(scale, scale, scale));
    this.plantings[kind].push({ matrix: this.matrix.clone(), tint });
  }

  build(materials: Record<'trunk' | 'leaf' | 'bush', THREE.Material>): THREE.Group {
    const group = new THREE.Group();
    const broadleaf = this.plantings.broadleaf;
    const cypress = this.plantings.cypress;
    const bush = this.plantings.bush;
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, plants: Planting[], tinted: boolean): void => {
      if (plants.length === 0) return;
      const mesh = new THREE.InstancedMesh(geometry, material, plants.length);
      plants.forEach((plant, i) => {
        mesh.setMatrixAt(i, plant.matrix);
        if (tinted) mesh.setColorAt(i, plant.tint);
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };
    add(new THREE.CylinderGeometry(0.2, 0.4, 3.0, 7).translate(0, 1.5, 0), materials.trunk, broadleaf, false);
    add(broadleafCrown(), materials.leaf, broadleaf, true);
    add(new THREE.CylinderGeometry(0.12, 0.24, 1.2, 6).translate(0, 0.6, 0), materials.trunk, cypress, false);
    add(cypressCrown(), materials.leaf, cypress, true);
    add(foliage(1, 91, 0.7), materials.bush, bush, true);
    return group;
  }
}

/**
 * Scatters trees and bushes over an island's meadow. A slow noise decides where the groves are, so
 * the island keeps open ground as well as woodland.
 */
export function scatterPlants(
  vegetation: Vegetation,
  island: Island,
  islandPosition: THREE.Vector3,
  seed: number,
  trees: number,
): void {
  const random = createRng(seed);
  const grove = new SimplexNoise(seed + 5);
  const spot = (): [number, number, number] | null => {
    const angle = random() * TAU;
    const rho = Math.sqrt(random()) * 0.93;
    const x = Math.cos(angle) * rho * island.outline(angle);
    const z = Math.sin(angle) * rho * island.outline(angle);
    const y = island.heightAt(x, z);
    if (y < -0.4) return null; // under water
    const slope =
      Math.abs(island.heightAt(x + 1.2, z) - island.heightAt(x - 1.2, z)) +
      Math.abs(island.heightAt(x, z + 1.2) - island.heightAt(x, z - 1.2));
    return slope > 1.5 ? null : [x + islandPosition.x, y + islandPosition.y, z + islandPosition.z];
  };

  let placed = 0;
  for (let attempt = 0; attempt < trees * 16 && placed < trees; attempt++) {
    const found = spot();
    if (!found) continue;
    const [x, y, z] = found;
    if (vegetation.isCleared(x, z, 3)) continue;
    const woodland = fbm(grove, x * 0.04, 3.3, z * 0.04, 2) > -0.2;
    if (!woodland && random() < 0.8) continue;
    vegetation.plant(random() < 0.34 ? 'cypress' : 'broadleaf', x, y - 0.25, z, 0.75 + random() * 0.6, random() * TAU);
    placed++;
  }
  for (let attempt = 0; attempt < trees * 10 && placed < trees * 3; attempt++) {
    const found = spot();
    if (!found) continue;
    const [x, y, z] = found;
    if (vegetation.isCleared(x, z, 1.2)) continue;
    vegetation.plant('bush', x, y + 0.15, z, 0.8 + random() * 1.1, random() * TAU);
    placed++;
  }
}
