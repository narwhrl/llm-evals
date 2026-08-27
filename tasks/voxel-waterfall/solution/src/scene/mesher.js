import * as THREE from 'three';
import { VoxelBuilder } from './builder.js';
import { GRID } from './terrain.js';

// Corner AO factors: none / one / two-edge / occluded.
const AO_LEVELS = [1.0, 0.8, 0.66, 0.52];

/**
 * Build the terrain mesh from a (possibly carved) heightmap.
 * Only exposed faces are emitted: one top quad per column plus side
 * strips down to the lower neighbor. Top-face corners get classic
 * voxel ambient occlusion baked into vertex colors.
 *
 * Returns { mesh, quads }.
 */
export function buildTerrainMesh(heights, water, colorFn) {
  const b = new VoxelBuilder();
  const H = (x, z) => (x < 0 || z < 0 || x >= GRID || z >= GRID) ? 0 : heights[z * GRID + x];

  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      const h = heights[z * GRID + x];
      if (h <= 0) continue;
      const y = h;

      // --- top face with per-corner AO ---
      const [r, g, bl] = colorFn(x, z, y, true);
      // Occluders for a corner are neighbor columns strictly taller than this face.
      const ao = [];
      for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const s1 = H(x + dx, z) > y;
        const s2 = H(x, z + dz) > y;
        const co = H(x + dx, z + dz) > y;
        ao.push(AO_LEVELS[(s1 && s2) ? 3 : (s1 ? 1 : 0) + (s2 ? 1 : 0) + (co ? 1 : 0)]);
      }
      // corners in quad order: (x,z+1)(x+1,z+1)(x+1,z)(x,z) → corner offsets (-,+)(+,+)(+,-)(-,-)
      b.quad(
        [x - GRID / 2, y, z + 1 - GRID / 2],
        [x + 1 - GRID / 2, y, z + 1 - GRID / 2],
        [x + 1 - GRID / 2, y, z - GRID / 2],
        [x - GRID / 2, y, z - GRID / 2],
        0, 1, 0, r, g, bl,
        [ao[0], ao[1], ao[2], ao[3]],
      );

      // --- side faces: emit one quad per voxel layer above the neighbor ---
      const sides = [
        { dx: -1, dz: 0 }, { dx: 1, dz: 0 }, { dx: 0, dz: -1 }, { dx: 0, dz: 1 },
      ];
      for (const { dx, dz } of sides) {
        const hn = H(x + dx, z + dz);
        if (hn >= h) continue;
        for (let yy = hn; yy < h; yy++) {
          const [cr, cg, cb] = colorFn(x, z, yy + 1, false);
          emitSide(b, x, z, yy, dx, dz, cr, cg, cb);
        }
      }
    }
  }

  const mesh = new THREE.Mesh(
    b.build(true),
    new THREE.MeshLambertMaterial({ vertexColors: true }),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return { mesh, quads: b.quadCount };
}

/** One vertical quad of a side strip, spanning y ∈ [yy, yy+1]. */
function emitSide(b, x, z, yy, dx, dz, r, g, bl) {
  const x0 = x - GRID / 2, z0 = z - GRID / 2;
  const y0 = yy, y1 = yy + 1;
  // Cell corner coordinates for the face on the (dx,dz) side.
  const fx0 = (dx === 1) ? x0 + 1 : x0;
  const fx1 = (dx === -1) ? x0 : x0 + 1;
  const fz0 = (dz === 1) ? z0 + 1 : z0;
  const fz1 = (dz === -1) ? z0 : z0 + 1;

  if (dx === -1) { // west face, normal -x
    b.quad([fx0, y0, fz1], [fx0, y1, fz1], [fx0, y1, fz0], [fx0, y0, fz0], -1, 0, 0, r, g, bl);
  } else if (dx === 1) { // east face, normal +x
    b.quad([fx1, y0, fz0], [fx1, y1, fz0], [fx1, y1, fz1], [fx1, y0, fz1], 1, 0, 0, r, g, bl);
  } else if (dz === -1) { // north face, normal -z
    b.quad([fx0, y0, fz1], [fx0, y1, fz1], [fx1, y1, fz1], [fx1, y0, fz1], 0, 0, -1, r, g, bl);
  } else { // south face, normal +z
    b.quad([fx1, y0, fz0], [fx1, y1, fz0], [fx0, y1, fz0], [fx0, y0, fz0], 0, 0, 1, r, g, bl);
  }
}

/**
 * Build the water mesh from a water-surface map (water[i] = surface y, or -1).
 * Top faces everywhere; side faces only where the neighbor surface (or terrain)
 * is lower, which yields tall falling-water slabs at cliffs.
 *
 * Returns { mesh, quads } (geometry has position+normal only).
 */
export function buildWaterMesh(water, heights, material) {
  const b = new VoxelBuilder();
  const W = (x, z) => (x < 0 || z < 0 || x >= GRID || z >= GRID) ? -1 : water[z * GRID + x];
  const H = (x, z) => (x < 0 || z < 0 || x >= GRID || z >= GRID) ? 0 : heights[z * GRID + x];

  for (let z = 0; z < GRID; z++) {
    for (let x = 0; x < GRID; x++) {
      const s = water[z * GRID + x];
      if (s < 0) continue;
      const x0 = x - GRID / 2, z0 = z - GRID / 2;

      // top face
      b.quad(
        [x0, s, z0 + 1], [x0 + 1, s, z0 + 1], [x0 + 1, s, z0], [x0, s, z0],
        0, 1, 0, 1, 1, 1,
      );

      // side faces down to the lower neighbor limit
      const sides = [
        { dx: -1, dz: 0 }, { dx: 1, dz: 0 }, { dx: 0, dz: -1 }, { dx: 0, dz: 1 },
      ];
      for (const { dx, dz } of sides) {
        const nw = W(x + dx, z + dz);
        const nh = H(x + dx, z + dz);
        const lo = nw >= 0 ? Math.max(nw, Math.min(nh, s)) : Math.min(nh, s);
        if (s <= lo) continue;
        const fx0 = (dx === 1) ? x0 + 1 : x0;
        const fx1 = (dx === -1) ? x0 : x0 + 1;
        const fz0 = (dz === 1) ? z0 + 1 : z0;
        const fz1 = (dz === -1) ? z0 : z0 + 1;
        if (dx === -1) {
          b.quad([fx0, lo, fz1], [fx0, s, fz1], [fx0, s, fz0], [fx0, lo, fz0], -1, 0, 0, 1, 1, 1);
        } else if (dx === 1) {
          b.quad([fx1, lo, fz0], [fx1, s, fz0], [fx1, s, fz1], [fx1, lo, fz1], 1, 0, 0, 1, 1, 1);
        } else if (dz === -1) {
          b.quad([fx0, lo, fz1], [fx0, s, fz1], [fx1, s, fz1], [fx1, lo, fz1], 0, 0, -1, 1, 1, 1);
        } else {
          b.quad([fx1, lo, fz0], [fx1, s, fz0], [fx0, s, fz0], [fx0, lo, fz0], 0, 0, 1, 1, 1, 1);
        }
      }
    }
  }

  const mesh = new THREE.Mesh(b.build(false), material);
  mesh.receiveShadow = false;
  return { mesh, quads: b.quadCount };
}
