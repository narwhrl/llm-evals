/**
 * Vegetation: broadleaf trees, conifers, boulders and ground cover.
 *
 * Everything is placed from the height field, so the planting follows the
 * terrain: conifers take over as the tree line thins out, and nothing grows
 * on cliffs or in the water.
 */

import * as THREE from "three";
import { clamp } from "./noise";
import type { TerrainField } from "./terrain";
import { createBuffers, pushBox, toGeometry } from "./voxel";

export interface VegetationBuild {
  group: THREE.Group;
  dispose: () => void;
}

const BARK = [0.33, 0.24, 0.16];
const BARK_LIGHT = [0.42, 0.31, 0.2];
const LEAF_A = [0.22, 0.46, 0.18];
const LEAF_B = [0.32, 0.58, 0.22];
const PINE_A = [0.13, 0.32, 0.22];
const PINE_B = [0.18, 0.4, 0.26];
const ROCK_A = [0.44, 0.46, 0.5];
const FLOWER_RED = [0.82, 0.24, 0.26];
const FLOWER_YELLOW = [0.93, 0.79, 0.29];

export function buildVegetation(field: TerrainField): VegetationBuild {
  const group = new THREE.Group();
  const treeBuf = createBuffers();
  const groundBuf = createBuffers();
  const { size, half, heights, slope, maxHeight, options } = field;

  const hash = (x: number, z: number) => {
    let h = Math.imul(x, 73856093) ^ Math.imul(z, 19349663) ^ options.seed;
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
    return ((h ^ (h >>> 15)) >>> 0) / 4294967296;
  };

  const treeLow = 2;
  const treeHigh = Math.round(maxHeight * options.treeLine);

  for (let z = 1; z < size - 1; z++) {
    for (let x = 1; x < size - 1; x++) {
      const h = heights[z * size + x];
      if (h <= treeLow || h > treeHigh) continue;
      if (slope[z * size + x] > 2) continue;
      const r = hash(x, z);
      if (r > 0.085) continue;

      const wx = x - half + 0.5;
      const wz = z - half + 0.5;
      const alt = h / Math.max(1, maxHeight);
      const conifer = alt > options.treeLine * 0.62;

      if (conifer) {
        const trunkH = 2 + Math.floor(r * 5);
        pushBox(treeBuf, [wx - 0.2, h, wz - 0.2], [wx + 0.2, h + trunkH, wz + 0.2], BARK);
        let radius = 1.8;
        let y = h + trunkH * 0.45;
        let layer = 0;
        while (radius > 0.2) {
          const shade = layer % 2 === 0 ? PINE_A : PINE_B;
          pushBox(treeBuf, [wx - radius, y, wz - radius], [wx + radius, y + 1.1, wz + radius], shade);
          radius -= 0.42;
          y += 1.0;
          layer++;
        }
      } else {
        const trunkH = 3 + Math.floor(r * 4);
        pushBox(treeBuf, [wx - 0.25, h, wz - 0.25], [wx + 0.25, h + trunkH, wz + 0.25], r > 0.5 ? BARK : BARK_LIGHT);
        // Minecraft-ish canopy: a wide slab, a narrower slab and a cap.
        const wide = 1.75;
        const narrow = 1.05;
        pushBox(treeBuf, [wx - wide, h + trunkH - 0.4, wz - wide], [wx + wide, h + trunkH + 0.9, wz + wide], LEAF_A);
        pushBox(treeBuf, [wx - narrow, h + trunkH + 0.9, wz - narrow], [wx + narrow, h + trunkH + 2.0, wz + narrow], LEAF_B);
        pushBox(treeBuf, [wx - 0.55, h + trunkH + 2.0, wz - 0.55], [wx + 0.55, h + trunkH + 2.8, wz + 0.55], LEAF_A);
      }
    }
  }

  // Boulders and ground cover.
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      if (h <= 1) continue;
      const r = hash(x * 3 + 1, z * 5 - 2);
      if (r > 0.02) continue;
      if (slope[z * size + x] > 1) continue;
      const wx = x - half + 0.5;
      const wz = z - half + 0.5;
      const s = 0.3 + r * 9;
      pushBox(groundBuf, [wx - s, h - 0.1, wz - s], [wx + s, h + s * 0.9, wz + s], ROCK_A);
    }
  }

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const h = heights[z * size + x];
      if (h <= 1 || h > treeHigh) continue;
      if (slope[z * size + x] > 1) continue;
      const r = hash(x * 11 - 5, z * 7 + 9);
      if (r > 0.16) continue;
      const wx = x - half + 0.5;
      const wz = z - half + 0.5;
      const tall = 0.3 + r * 0.5;
      pushBox(groundBuf, [wx - 0.16, h, wz - 0.16], [wx + 0.16, h + tall, wz + 0.16], LEAF_B, new Set(["-y"]));
      if (r > 0.145) {
        const flower = (x + z) % 3 === 0 ? FLOWER_RED : FLOWER_YELLOW;
        pushBox(groundBuf, [wx - 0.1, h + tall, wz - 0.1], [wx + 0.1, h + tall + 0.22, wz + 0.1], flower);
      }
    }
  }

  const treeGeometry = toGeometry(treeBuf);
  const treeMaterial = new THREE.MeshLambertMaterial({ vertexColors: true });
  const trees = new THREE.Mesh(treeGeometry, treeMaterial);
  group.add(trees);

  const groundGeometry = toGeometry(groundBuf);
  const groundMaterial = new THREE.MeshLambertMaterial({ vertexColors: true });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  group.add(ground);

  return {
    group,
    dispose: () => {
      treeGeometry.dispose();
      treeMaterial.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
    },
  };
}

export function vegetationDensity(scale: number): number {
  return clamp(scale, 0, 2);
}
