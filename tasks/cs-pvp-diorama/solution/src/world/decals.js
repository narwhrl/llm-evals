import * as THREE from 'three';

/**
 * Decal placement helpers.
 *
 * Graffiti, freight stencils, bomb-site paint and bullet clusters are small
 * transparent quads laid a couple of centimetres off their host surface. They
 * merge into the same per-material batches as the geometry, so the whole map
 * still costs only a handful of draw calls.
 */

const LIFT = 0.022;

/** Quad on a vertical wall. `rotY` picks which face; 0 faces +Z. */
export function decalWall(b, material, x, y, z, width, height, rotY = 0) {
  const geometry = new THREE.PlaneGeometry(width, height).toNonIndexed();
  b.add(geometry, material, {
    position: [x, y, z],
    rotation: [0, rotY, 0],
    outline: false,
  });
  return geometry;
}

/** Quad lying on the ground, facing up. */
export function decalGround(b, material, x, y, z, size, rotY = 0, aspect = 1) {
  const geometry = new THREE.PlaneGeometry(size, size * aspect).toNonIndexed();
  geometry.rotateX(-Math.PI / 2);
  b.add(geometry, material, {
    position: [x, y, z],
    rotation: [0, rotY, 0],
    outline: false,
  });
  return geometry;
}

/** Nudges a wall decal clear of its surface by `LIFT` along the wall normal. */
export function wallNormalOffset(rotY, lift = LIFT) {
  return [Math.sin(rotY) * lift, Math.cos(rotY) * lift];
}
