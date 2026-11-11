import * as THREE from 'three';
import { mesh, palette, seededRandom } from './palette';

export interface Island {
  x: number;
  y: number;
  z: number;
  radius: number;
  depth: number;
}

export const centralIsland: Island = { x: 0, y: 0, z: 0, radius: 69, depth: 153 };
export const outerIslands: Island[] = [
  { x: -113, y: -5, z: 27, radius: 24, depth: 54 },
  { x: -97, y: 6, z: -66, radius: 26, depth: 66 },
  { x: -25, y: 7, z: -117, radius: 21, depth: 53 },
  { x: 64, y: -1, z: -106, radius: 27, depth: 67 },
  { x: 125, y: 5, z: -33, radius: 25, depth: 62 },
  { x: 109, y: -8, z: 61, radius: 23, depth: 60 },
  { x: 34, y: -13, z: 113, radius: 20, depth: 46 },
  { x: -60, y: -10, z: 105, radius: 19, depth: 46 },
];

function rockGeometry(island: Island, seed: number): THREE.BufferGeometry {
  const random = seededRandom(seed);
  const segments = 64;
  const ringRadii = [0.92, 1.015, 0.99, 0.94, 0.83, 0.73, 0.59, 0.43, 0.25, 0.015];
  const ringHeights = [0, -0.06, -0.16, -0.28, -0.40, -0.53, -0.66, -0.78, -0.89, -1];
  const vertices: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const ridge: number[] = [];
  const tint = new THREE.Color();
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    ridge.push(0.87 + random() * 0.21 + Math.sin(a * 7 + seed) * 0.065 + Math.sin(a * 13) * 0.035);
  }
  ridge[segments] = ridge[0];
  for (let j = 0; j < ringRadii.length; j++) {
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const r = island.radius * ringRadii[j] * ridge[i];
      const sheer = j > 1 ? Math.sin(a * 19 + j * 0.16) * island.radius * 0.068 : 0;
      const y = island.y + ringHeights[j] * island.depth + (j === 0 ? Math.sin(a * 6) * 0.6 : (random() - 0.5) * 2.5);
      vertices.push(Math.cos(a) * (r + sheer), y, Math.sin(a) * (r + sheer));
      const lightness = 0.60 + random() * 0.24 + (j === 0 ? 0.08 : 0);
      tint.setRGB(lightness, lightness * 0.94, lightness * 0.84);
      colors.push(tint.r, tint.g, tint.b);
    }
  }
  for (let j = 0; j < ringRadii.length - 1; j++) {
    for (let i = 0; i < segments; i++) {
      const a = j * (segments + 1) + i;
      const b = a + segments + 1;
      if ((i + j) % 2 === 0) {
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      } else {
        indices.push(a, a + 1, b + 1, a, b + 1, b);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function grassGeometry(island: Island, seed: number): THREE.BufferGeometry {
  const random = seededRandom(seed + 2);
  const segments = 64;
  const vertices: number[] = [island.x, island.y + 0.25, island.z];
  const colors: number[] = [0.8, 0.95, 0.78];
  const indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const radius = island.radius * (0.89 + Math.sin(a * 7 + seed) * 0.058 + Math.sin(a * 13) * 0.03);
    vertices.push(island.x + Math.cos(a) * radius, island.y + 0.3, island.z + Math.sin(a) * radius);
    const brightness = 0.78 + random() * 0.24;
    colors.push(brightness * 0.82, brightness, brightness * 0.76);
  }
  for (let i = 0; i < segments; i++) indices.push(0, i + 2, i + 1);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function cliffFacet(parent: THREE.Scene, island: Island, angle: number, width: number, top: number, bottom: number, material: THREE.Material): void {
  const vertices: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const random = seededRandom(Math.floor(angle * 9000) + Math.floor(island.radius * 100));
  const sections = 6;
  const tint = new THREE.Color();
  for (let j = 0; j <= sections; j++) {
    const t = j / sections;
    const y = island.y - island.depth * (top + (bottom - top) * t);
    const profile = t < 0.14 ? 1 : t < 0.37 ? 0.97 : t < 0.60 ? 0.86 : t < 0.82 ? 0.67 : 0.39;
    const r = island.radius * profile;
    const halfWidth = width * (1 - t * 0.44) / island.radius;
    for (let k = 0; k < 3; k++) {
      const a = angle + (k - 1) * halfWidth;
      const ridge = k === 1 ? 1.5 : -0.3;
      vertices.push(island.x + Math.cos(a) * (r + ridge), y + (k === 1 ? -1 : 0), island.z + Math.sin(a) * (r + ridge));
      const light = 0.64 + random() * 0.17;
      tint.setRGB(light, light * 0.96, light * 0.88);
      colors.push(tint.r, tint.g, tint.b);
    }
    if (j < sections) {
      const n = j * 3;
      indices.push(n, n + 3, n + 1, n + 1, n + 3, n + 4, n + 1, n + 4, n + 2, n + 2, n + 4, n + 5);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  parent.add(mesh(geometry, material));
}

export function createTerrain(scene: THREE.Scene): void {
  const all = [centralIsland, ...outerIslands];
  all.forEach((island, index) => {
    const rock = mesh(rockGeometry(island, index * 117 + 41), palette.rock);
    rock.position.set(island.x, 0, island.z);
    scene.add(rock);
    scene.add(mesh(grassGeometry(island, index * 117 + 41), palette.grass));
    const random = seededRandom(1300 + index);
    if (index === 0) {
      for (let i = 0; i < 32; i++) {
        cliffFacet(scene, island, (i / 32) * Math.PI * 2, 4.3 + random() * 4.5, 0.035 + random() * 0.08, 0.72 + random() * 0.24, palette.rock);
      }
    }
    for (let i = 0; i < (index === 0 ? 115 : 22); i++) {
      const angle = random() * Math.PI * 2;
      const distance = island.radius * (0.3 + random() * 0.68);
      const height = (index === 0 ? 14 : 4) + random() * (index === 0 ? 35 : 14);
      const shard = mesh(new THREE.ConeGeometry(island.radius * (0.035 + random() * 0.055), height, 4 + Math.floor(random() * 3)), palette.rockDetail);
      shard.position.set(island.x + Math.cos(angle) * distance, island.y - island.depth * (0.54 + random() * 0.38), island.z + Math.sin(angle) * distance);
      shard.rotation.set(random() * 0.4, random() * Math.PI, Math.PI + (random() - 0.5) * 0.25);
      scene.add(shard);
    }
  });
  const random = seededRandom(8721);
  for (let i = 0; i < 66; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 66 + random() * 113;
    const size = 0.65 + random() * 3.2;
    const debris = mesh(new THREE.DodecahedronGeometry(size, 0), palette.rockDetail);
    debris.scale.y = 1.5 + random() * 2;
    debris.position.set(Math.cos(angle) * radius, -28 - random() * 60, Math.sin(angle) * radius);
    debris.rotation.set(random() * 3, random() * 3, random() * 3);
    scene.add(debris);
  }
}
