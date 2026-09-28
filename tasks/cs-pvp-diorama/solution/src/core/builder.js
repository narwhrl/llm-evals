import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * Static geometry accumulator.
 *
 * The map is authored piece by piece but shipped as one merged mesh per
 * material, plus one merged inverted-hull mesh for the outlines. That keeps a
 * scene with thousands of parts at roughly two dozen draw calls, which leaves
 * headroom for the rain and reflection passes.
 */
export class Builder {
  constructor(materials, outlineMaterial) {
    this.materials = materials;
    this.outlineMaterial = outlineMaterial;
    this.buckets = new Map();
    this.outlineBuckets = new Map();
  }

  /**
   * @param {THREE.BufferGeometry} geometry consumed by the builder
   * @param {string} materialKey key into the material table
   * @param {object} [options] position / rotation / scale / outline flags
   */
  add(geometry, materialKey, options = {}) {
    const {
      position = null,
      rotation = null,
      scale = null,
      outline = true,
    } = options;

    // Standard TRS order: scale and rotate the part about its own origin
    // first, then move it into place. Translating first would make every
    // subsequent rotation pivot around the world origin and scatter rotated
    // props across the map.
    if (scale) geometry.scale(scale[0], scale[1], scale[2]);
    if (rotation) {
      if (rotation[0]) geometry.rotateX(rotation[0]);
      if (rotation[1]) geometry.rotateY(rotation[1]);
      if (rotation[2]) geometry.rotateZ(rotation[2]);
    }
    if (position) geometry.translate(position[0], position[1], position[2]);

    push(this.buckets, materialKey, geometry);

    if (outline) {
      push(this.outlineBuckets, materialKey, makeHull(geometry));
    }
    return this;
  }

  /** Adds an already-built object (animated parts, lights, sprites). */
  attach(object) {
    this.attached = this.attached || [];
    this.attached.push(object);
    return this;
  }

  build(parent) {
    const group = new THREE.Group();
    group.name = 'diorama';

    for (const [key, geometries] of this.buckets) {
      const merged = mergeGeometries(geometries, false);
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, this.materials[key]);
      mesh.name = `fill:${key}`;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }

    for (const [key, geometries] of this.outlineBuckets) {
      const merged = mergeGeometries(geometries, false);
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, this.outlineMaterial);
      mesh.name = `outline:${key}`;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      group.add(mesh);
    }

    for (const object of this.attached || []) group.add(object);

    parent.add(group);
    return group;
  }
}

function push(map, key, geometry) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(geometry);
}

/**
 * Inverted hull.
 *
 * Box corners have split normals, so naively pushing along the existing
 * normals tears the outline apart at every edge. Averaging normals per welded
 * position first (within this single part, never across the merged map) keeps
 * each hull watertight.
 */
function makeHull(geometry) {
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;

  const groups = new Map();
  for (let i = 0; i < position.count; i += 1) {
    const key =
      `${Math.round(position.getX(i) * 4096)}|` +
      `${Math.round(position.getY(i) * 4096)}|` +
      `${Math.round(position.getZ(i) * 4096)}`;
    let group = groups.get(key);
    if (!group) {
      group = [];
      groups.set(key, group);
    }
    group.push(i);
  }

  const smoothed = new Float32Array(normal.count * 3);
  for (const group of groups.values()) {
    let nx = 0;
    let ny = 0;
    let nz = 0;
    for (const i of group) {
      nx += normal.getX(i);
      ny += normal.getY(i);
      nz += normal.getZ(i);
    }
    const length = Math.hypot(nx, ny, nz) || 1;
    nx /= length;
    ny /= length;
    nz /= length;
    for (const i of group) {
      smoothed[i * 3] = nx;
      smoothed[i * 3 + 1] = ny;
      smoothed[i * 3 + 2] = nz;
    }
  }

  const hull = new THREE.BufferGeometry();
  const pushed = new Float32Array(position.count * 3);
  for (let i = 0; i < position.count; i += 1) {
    const sx = smoothed[i * 3];
    const sy = smoothed[i * 3 + 1];
    const sz = smoothed[i * 3 + 2];
    pushed[i * 3] = position.getX(i) + sx * HULL_PUSH;
    pushed[i * 3 + 1] = position.getY(i) + sy * HULL_PUSH;
    pushed[i * 3 + 2] = position.getZ(i) + sz * HULL_PUSH;
  }
  hull.setAttribute('position', new THREE.BufferAttribute(pushed, 3));
  hull.setAttribute('normal', new THREE.BufferAttribute(smoothed, 3));
  return hull;
}

/**
 * The hull vertex shader scales this by view depth to hold a constant screen
 * width, so the value here is only a hint that keeps the scaled result away
 * from zero at grazing distances.
 */
const HULL_PUSH = 0.01;
