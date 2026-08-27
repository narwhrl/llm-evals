import * as THREE from 'three';
import { periodicNoise2D, hash2 } from './noise.js';
import { VoxelBuilder } from './builder.js';
import { GRID } from './terrain.js';

const CELL = 4;               // world units per cloud block
const N = GRID / CELL;        // lattice width (40) — x-period of the field
const mod = (v, p) => ((v % p) + p) % p;

/**
 * Cloud density sampled on a lattice that is periodic along x with
 * period N cells == GRID world units, so the layer can drift and wrap
 * seamlessly. Two octaves: soft blobs + finer variation.
 */
function cloudDensity(ix, iz, seed) {
  const wix = mod(ix, N);
  return 0.68 * periodicNoise2D(wix * 0.25, iz * 0.25, seed, N * 0.25)
       + 0.32 * periodicNoise2D(wix * 0.5, iz * 0.5, seed + 71, N * 0.5);
}

function buildLayer(seed, yBase, threshold, opacity) {
  const b = new VoxelBuilder();
  // x spans three full periods [-N, 2N): at any drift offset in [0, GRID)
  // the blocks always cover the terrain (plus margin) with no seams.
  for (let ix = -N; ix < 2 * N; ix++) {
    for (let iz = -24; iz < N + 24; iz++) {
      if (cloudDensity(ix, iz, seed) < threshold) continue;
      const thick = 2 + Math.floor(hash2(ix, iz, seed + 5) * 3); // 2..4
      const yj = hash2(ix, iz, seed + 9) * 2;
      const x = ix * CELL - GRID / 2;
      const z = iz * CELL - GRID / 2;
      b.box(x + 0.03, yBase + yj, z + 0.03,
            x + CELL - 0.03, yBase + yj + thick, z + CELL - 0.03, 1, 1, 1);
    }
  }
  const mesh = new THREE.Mesh(
    b.build(false),
    new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity,
      depthWrite: false,
      fog: true,
    }),
  );
  mesh.renderOrder = 2;
  return mesh;
}

export function buildClouds({ seed, cloudHeight, threshold, opacity }) {
  const group = new THREE.Group();
  const main = buildLayer(seed, cloudHeight, threshold, opacity);
  const veil = buildLayer(seed + 991, cloudHeight + 15, threshold + 0.1, opacity * 0.7);
  group.add(main, veil);

  return {
    group,
    update(elapsed, driftSpeed) {
      main.position.x = mod(elapsed * driftSpeed * 2.4, GRID);
      veil.position.x = mod(-elapsed * driftSpeed * 1.5, GRID);
    },
    setOpacity(base) {
      main.material.opacity = base;
      veil.material.opacity = base * 0.7;
    },
    dispose() {
      for (const m of [main, veil]) {
        m.geometry.dispose();
        m.material.dispose();
      }
    },
  };
}
