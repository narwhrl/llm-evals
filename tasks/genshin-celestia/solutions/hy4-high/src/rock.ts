import * as THREE from 'three';
import { palette, type Materials } from './materials';
import { noise2 } from './random';

const TAU = Math.PI * 2;

export interface IslandOptions {
  radius: number;
  depth: number;
  seed: number;
  segments?: number;
  layers?: number;
}

export interface FloatingIsland {
  group: THREE.Group;
  capRadius: number;
  capY: number;
}

/** An irregular floating rock mass with a thick turf cap and a huge inverted underside. */
export function createFloatingIsland(options: IslandOptions, materials: Materials): FloatingIsland {
  const segments = options.segments ?? 56;
  const layers = options.layers ?? 16;
  const { radius, depth, seed } = options;
  const capY = 2.4;

  const angleNoise = (a: number): number =>
    0.86 +
    0.14 * noise2(Math.cos(a) * 2.1 + seed, Math.sin(a) * 2.1 + seed) +
    0.075 * Math.sin(a * 5 + seed * 0.7) +
    0.045 * Math.sin(a * 11 + seed * 1.3);

  const layerScale = (t: number): number => {
    const taper = Math.pow(1 - t, 0.74);
    const shelf = 1 + 0.16 * Math.sin(t * 16 + seed * 0.9) * (1 - t * 0.6);
    const bulge = 1 + 0.14 * Math.exp(-Math.pow((t - 0.24) / 0.18, 2));
    return Math.max(0.015, taper * shelf * bulge);
  };

  const layerHeight = (t: number): number =>
    -depth * Math.pow(t, 1.16) + 5 * Math.sin(t * 12 + seed) * t;

  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const light = new THREE.Color(palette.rockLight);
  const dark = new THREE.Color(palette.rockDark);
  const shade = new THREE.Color();

  for (let k = 0; k <= layers; k += 1) {
    const t = k / layers;
    const base = radius * layerScale(t);
    const baseY = layerHeight(t);
    for (let j = 0; j < segments; j += 1) {
      const a = (j / segments) * TAU;
      const jitter = 1 + 0.16 * (noise2(j * 0.37 + seed, k * 0.61) - 0.5);
      const r = base * angleNoise(a) * jitter;
      const y = baseY + 3.4 * (noise2(j * 0.53, k * 0.78 + seed) - 0.5) * (0.35 + t);
      positions.push(Math.cos(a) * r, y, Math.sin(a) * r);
      shade.copy(light).lerp(dark, Math.pow(t, 0.82));
      shade.multiplyScalar(0.76 + 0.42 * noise2(j * 0.31 + seed, k * 0.47));
      colors.push(shade.r, shade.g, shade.b);
    }
  }

  for (let k = 0; k < layers; k += 1) {
    for (let j = 0; j < segments; j += 1) {
      const j2 = (j + 1) % segments;
      const a = k * segments + j;
      const b = k * segments + j2;
      const c = (k + 1) * segments + j2;
      const d = (k + 1) * segments + j;
      indices.push(a, b, d, b, c, d);
    }
  }

  const tipIndex = positions.length / 3;
  positions.push(0, -depth * 1.07, 0);
  colors.push(dark.r, dark.g, dark.b);
  for (let j = 0; j < segments; j += 1) {
    const j2 = (j + 1) % segments;
    indices.push(layers * segments + j, layers * segments + j2, tipIndex);
  }

  const bodyGeometry = new THREE.BufferGeometry();
  bodyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  bodyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  bodyGeometry.setIndex(indices);
  bodyGeometry.computeVertexNormals();
  const body = new THREE.Mesh(bodyGeometry, materials.rock);
  body.castShadow = true;
  body.receiveShadow = true;

  const capRadius = radius * 0.985;
  const capPositions: number[] = [0, capY, 0];
  const capIndices: number[] = [];
  const ringTop: Array<[number, number, number]> = [];
  for (let j = 0; j < segments; j += 1) {
    const a = (j / segments) * TAU;
    const r = capRadius * angleNoise(a) * (0.985 + 0.02 * noise2(j * 0.4, seed));
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = capY + 1.1 * (noise2(j * 0.29 + seed, 3.7) - 0.5);
    capPositions.push(x, y, z);
    ringTop.push([x, y, z]);
  }
  for (let j = 0; j < segments; j += 1) {
    const j2 = (j + 1) % segments;
    capIndices.push(0, 1 + j2, 1 + j);
  }
  const capGeometry = new THREE.BufferGeometry();
  capGeometry.setAttribute('position', new THREE.Float32BufferAttribute(capPositions, 3));
  capGeometry.setIndex(capIndices);
  capGeometry.computeVertexNormals();
  const cap = new THREE.Mesh(capGeometry, materials.grass);
  cap.receiveShadow = true;

  const skirtPositions: number[] = [];
  const skirtIndices: number[] = [];
  for (let j = 0; j < segments; j += 1) {
    const [x, y, z] = ringTop[j];
    skirtPositions.push(x, y, z, x * 1.004, y - 7.5, z * 1.004);
  }
  for (let j = 0; j < segments; j += 1) {
    const j2 = (j + 1) % segments;
    const a = j * 2;
    const b = j2 * 2;
    skirtIndices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const skirtGeometry = new THREE.BufferGeometry();
  skirtGeometry.setAttribute('position', new THREE.Float32BufferAttribute(skirtPositions, 3));
  skirtGeometry.setIndex(skirtIndices);
  skirtGeometry.computeVertexNormals();
  const skirt = new THREE.Mesh(skirtGeometry, materials.grassDark);

  const group = new THREE.Group();
  group.add(body, cap, skirt);
  return { group, capRadius, capY };
}
