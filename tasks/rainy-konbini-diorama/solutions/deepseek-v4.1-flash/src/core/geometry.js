import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/**
 * Unit meshes are reused through a shared cache. Every prop is a transform of a
 * few primitives, which keeps geometry allocation low for a scene of this size.
 */
const unitBox = new THREE.BoxGeometry(1, 1, 1);
const roundedCache = new Map();

export const GEO = {
  box: unitBox,
  plane: new THREE.PlaneGeometry(1, 1),
  cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 16),
  cylLow: new THREE.CylinderGeometry(0.5, 0.5, 1, 10),
  cone: new THREE.ConeGeometry(0.5, 1, 16),
  sphere: new THREE.SphereGeometry(0.5, 16, 12),
  sphereLow: new THREE.SphereGeometry(0.5, 10, 8),
  torus: new THREE.TorusGeometry(0.5, 0.14, 8, 20),
  ring: new THREE.RingGeometry(0.5, 0.75, 32),
};

export function roundedBoxGeometry(radius = 0.08, segments = 2) {
  const cacheKey = `${radius}|${segments}`;
  let geo = roundedCache.get(cacheKey);
  if (!geo) {
    geo = new RoundedBoxGeometry(1, 1, 1, segments, radius);
    roundedCache.set(cacheKey, geo);
  }
  return geo;
}

/**
 * Adds a box-shaped mesh. Position is the centre unless `anchor` shifts it.
 */
export function box(parent, material, size, position, options = {}) {
  const { rotation, cast = true, receive = true, geometry = GEO.box } = options;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(size[0], size[1], size[2]);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  return mesh;
}

/** Box helper anchored by its min-Y so props sit on the ground naturally. */
export function boxOn(parent, material, size, x, z, baseY = 0, options = {}) {
  return box(parent, material, size, [x, baseY + size[1] / 2, z], options);
}

export function cylinder(parent, material, radius, height, position, options = {}) {
  const { rotation, cast = true, receive = true, geometry = GEO.cyl } = options;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(radius * 2, height, radius * 2);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  return mesh;
}

export function plane(parent, material, size, position, options = {}) {
  const { rotation, cast = false, receive = false, geometry = GEO.plane } = options;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(size[0], size[1], 1);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  return mesh;
}

export function group(parent, position = [0, 0, 0], rotationY = 0) {
  const g = new THREE.Group();
  g.position.set(position[0], position[1], position[2]);
  g.rotation.y = rotationY;
  parent.add(g);
  return g;
}

/**
 * Collects all geometries into one merged mesh where a prop is static and
 * shares a single material. Not used yet; kept out to avoid dead code.
 */

/** Thin outline shell used to give cel silhouettes a drawn edge. */
export function outlineMesh(mesh, thickness = 0.012) {
  const outline = new THREE.Mesh(
    mesh.geometry,
    new THREE.MeshBasicMaterial({ color: 0x0b0f1a, side: THREE.BackSide }),
  );
  outline.scale.copy(mesh.scale).multiplyScalar(1 + thickness);
  outline.position.copy(mesh.position);
  outline.rotation.copy(mesh.rotation);
  outline.castShadow = false;
  outline.receiveShadow = false;
  return outline;
}
