/**
 * The cloud deck.
 *
 * Clouds are merged voxel puffs laid out in a coarse grid over the valley
 * floor. Their base altitude is tied to the mountain height so the range is
 * permanently half hidden and the taller summits break through the layer.
 *
 * Each puff is a cluster of overlapping boxes rather than one cube: that
 * breaks the cubic silhouette and gives the layer a lumpy, drifting read.
 */

import * as THREE from "three";
import { fbm, mulberry32 } from "./noise";
import { createBuffers, pushBox, toGeometry } from "./voxel";

export interface CloudBuild {
  group: THREE.Group;
  update: (elapsed: number) => void;
  dispose: () => void;
}

export interface CloudOptions {
  size: number;
  maxHeight: number;
  altitude: number;
  coverage: number;
  seed: number;
  /** Height field of the terrain, used to keep the deck on the mountain. */
  heights: Float32Array;
}

export function buildClouds(options: CloudOptions): CloudBuild {
  const group = new THREE.Group();
  const buf = createBuffers();
  const cell = 6.4;
  const columns = Math.ceil((options.size * 1.04) / cell);
  const base = options.altitude;
  const random = mulberry32(options.seed + 4021);
  const half = (options.size - 1) / 2;

  for (let gz = 0; gz < columns; gz++) {
    for (let gx = 0; gx < columns; gx++) {
      const wx = (gx - columns / 2) * cell;
      const wz = (gz - columns / 2) * cell;
      const radial = Math.hypot(wx, wz) / (options.size * 0.56);
      if (radial > 1) continue;

      // The deck only forms where the ground rises into the layer, so it
      // wraps the mountain flanks and leaves the valley floor clear.
      const cx = Math.round(wx + half);
      const cz = Math.round(wz + half);
      if (cx < 0 || cz < 0 || cx >= options.size || cz >= options.size) continue;
      const ground = options.heights[cz * options.size + cx];
      if (ground < base * 0.5) continue;

      const density = fbm(gx * 0.13 + 4.1, gz * 0.13 - 2.7, options.seed + 71, 4);
      // The deck thins out towards the rim of the range.
      const threshold = 0.42 - options.coverage * 0.26 + radial * 0.34;
      if (density < threshold) continue;

      const strength = Math.min(1, (density - threshold) * 4.5);
      const core = cell * (1.5 + strength * 1.3);

      // Core slab of the puff.
      const thickness = 2.6 + strength * 4.6;
      const lift = random() * 1.6;
      const coreShade = 0.93 + random() * 0.07;
      pushBox(
        buf,
        [wx - core / 2, base + lift, wz - core / 2],
        [wx + core / 2, base + lift + thickness, wz + core / 2],
        [coreShade, coreShade, coreShade * 1.01],
      );

      // Shoulder boxes break the cube silhouette.
      const shoulders = 3 + Math.floor(random() * 4);
      for (let s = 0; s < shoulders; s++) {
        const sw = core * (0.45 + random() * 0.6);
        const sd = core * (0.45 + random() * 0.6);
        const sh = thickness * (0.5 + random() * 0.8);
        const ox = (random() - 0.5) * core * 1.3;
        const oz = (random() - 0.5) * core * 1.3;
        const oy = lift + thickness * (random() * 0.8);
        const shade = 0.89 + random() * 0.11;
        pushBox(
          buf,
          [wx + ox - sw / 2, base + oy, wz + oz - sd / 2],
          [wx + ox + sw / 2, base + oy + sh, wz + oz + sd / 2],
          [shade, shade, shade * 1.02],
        );
      }
    }
  }

  const geometry = toGeometry(buf);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    emissive: new THREE.Color(0x8e9db2),
    emissiveIntensity: 0.62,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 3;
  group.add(mesh);

  const amplitude = options.size * 0.05;

  return {
    group,
    update: (elapsed: number) => {
      // A slow seamless sway instead of a wrap-around, so no cloud ever pops.
      group.position.x = Math.sin(elapsed * 0.035) * amplitude;
      group.position.z = Math.cos(elapsed * 0.021) * amplitude * 0.6;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}
