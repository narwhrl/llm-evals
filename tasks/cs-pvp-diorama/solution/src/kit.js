import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createOutlineMaterial } from './materials.js';

/**
 * Static geometry is merged per material so the whole diorama stays inside a
 * few dozen draw calls. Every merged part also contributes an inverted-hull
 * shell to a single outline mesh, which gives the crisp cel-shaded silhouette.
 */

export const OUTLINE_LAYER = 2;
export const GROUND_LAYER = 1;

const _dummy = new THREE.Object3D();

export function createBuilder(materials, outlineThickness = 0.0045) {
  const buckets = new Map();
  const outlineGeos = [];
  const outlineMaterial = createOutlineMaterial(outlineThickness);

  /**
   * @param {THREE.BufferGeometry} geometry
   * @param {string} matKey key into the material library
   */
  function add(geometry, matKey, opts = {}) {
    const {
      pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1],
      outline = true, shadow = true, receive = true,
    } = opts;

    _dummy.position.set(pos[0], pos[1], pos[2]);
    _dummy.rotation.set(rot[0], rot[1], rot[2]);
    _dummy.scale.set(scale[0], scale[1], scale[2]);
    _dummy.updateMatrix();

    const g = geometry.clone();
    g.applyMatrix4(_dummy.matrix);

    let bucket = buckets.get(matKey);
    if (!bucket) {
      bucket = { mat: materials[matKey], geos: [], shadow, receive };
      buckets.set(matKey, bucket);
    }
    bucket.geos.push(g.index ? g.toNonIndexed() : g);

    if (outline) {
      const shell = buildShell(g);
      if (shell) outlineGeos.push(shell);
    }
    return g;
  }

  /** Standalone mesh for anything that has to move later. */
  function mesh(geometry, matKey, opts = {}) {
    const { pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], shadow = true } = opts;
    const m = new THREE.Mesh(geometry, materials[matKey]);
    m.position.set(pos[0], pos[1], pos[2]);
    m.rotation.set(rot[0], rot[1], rot[2]);
    m.scale.set(scale[0], scale[1], scale[2]);
    m.castShadow = shadow;
    m.receiveShadow = true;
    return m;
  }

  function build() {
    const group = new THREE.Group();

    for (const [key, bucket] of buckets) {
      if (!bucket.geos.length) continue;
      const merged = mergeGeometries(bucket.geos, false);
      if (!merged) {
        console.warn('[kit] merge failed for material', key);
        continue;
      }
      const m = new THREE.Mesh(merged, bucket.mat);
      m.name = key;
      m.castShadow = bucket.shadow;
      m.receiveShadow = bucket.receive;
      group.add(m);
    }

    if (outlineGeos.length) {
      const merged = mergeGeometries(outlineGeos, false);
      if (merged) {
        const m = new THREE.Mesh(merged, outlineMaterial);
        m.name = 'outline';
        m.renderOrder = -1;
        m.castShadow = false;
        m.receiveShadow = false;
        m.layers.set(OUTLINE_LAYER);
        group.add(m);
      }
    }
    return group;
  }

  return { add, mesh, build, materials };
}

/**
 * Inverted-hull shell: smooth normals (so corners do not crack) plus the part
 * radius, which lets the shader clamp the line on tiny props.
 */
function buildShell(geometry) {
  const pos = geometry.getAttribute('position');
  if (!pos || pos.count < 3) return null;

  const merged = weld(geometry);
  if (!merged) return null;

  merged.computeVertexNormals();

  geometry.computeBoundingSphere();
  const radius = geometry.boundingSphere ? geometry.boundingSphere.radius : 0.5;

  const count = merged.getAttribute('position').count;
  const radii = new Float32Array(count);
  radii.fill(Math.max(radius, 0.02));
  merged.setAttribute('aOutlineRadius', new THREE.BufferAttribute(radii, 1));
  merged.deleteAttribute('uv');
  return merged;
}

/** Position-welded copy of a geometry, used only to average shell normals. */
function weld(geometry) {
  const posAttr = geometry.getAttribute('position');
  const count = posAttr.count;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', posAttr.clone());

  const precision = 1e4;
  const buckets = new Map();
  const map = new Uint32Array(count);
  let next = 0;
  for (let i = 0; i < count; i++) {
    const x = Math.round(posAttr.getX(i) * precision);
    const y = Math.round(posAttr.getY(i) * precision);
    const z = Math.round(posAttr.getZ(i) * precision);
    const key = `${x},${y},${z}`;
    let id = buckets.get(key);
    if (id === undefined) {
      id = next++;
      buckets.set(key, id);
    }
    map[i] = id;
  }

  // keep the original topology: an indexed source keeps its own triangles
  const src = geometry.index;
  const indices = new Uint32Array(src ? src.count : count);
  if (src) {
    for (let i = 0; i < src.count; i++) indices[i] = map[src.getX(i)];
  } else {
    for (let i = 0; i < count; i++) indices[i] = map[i];
  }
  g.setIndex(new THREE.BufferAttribute(indices, 1));
  return g;
}

// --- geometry helpers -----------------------------------------------------

export const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);

export const cyl = (rt, rb, h, seg = 16, open = false) =>
  new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);

export const plane = (w, h) => new THREE.PlaneGeometry(w, h);

/** Flat decal (graffiti, stencil, bullet holes) laid onto a surface. */
export function decal(b, matKey, x, y, z, w, h, rot = 0, tilt = 0) {
  b.add(plane(w, h), matKey, {
    pos: [x, y, z], rot: [tilt, rot, 0], outline: false, shadow: false,
  });
}

export const torus = (r, t, seg = 12, rad = 20) => new THREE.TorusGeometry(r, t, seg, rad);

export const sphere = (r, seg = 12) => new THREE.SphereGeometry(r, seg, Math.max(6, seg >> 1));

/**
 * Horizontal plate with rectangular holes (the slab top and the sewer mouths).
 * UVs are normalised over the 32x32 map so the painted floor texture lines up.
 */
export function plateWithHoles(rect, holes, y = 0) {
  const shape = new THREE.Shape();
  const p = (x, z) => [x, -z];
  const [ax, az] = p(rect.x0, rect.z0);
  const [bx, bz] = p(rect.x1, rect.z0);
  const [cx, cz] = p(rect.x1, rect.z1);
  const [dx, dz] = p(rect.x0, rect.z1);
  shape.moveTo(ax, az);
  shape.lineTo(bx, bz);
  shape.lineTo(cx, cz);
  shape.lineTo(dx, dz);
  shape.closePath();

  for (const h of holes) {
    const path = new THREE.Path();
    const q = (x, z) => [x, -z];
    const [h0x, h0z] = q(h.x0, h.z0);
    const [h1x, h1z] = q(h.x1, h.z0);
    const [h2x, h2z] = q(h.x1, h.z1);
    const [h3x, h3z] = q(h.x0, h.z1);
    path.moveTo(h0x, h0z);
    path.lineTo(h1x, h1z);
    path.lineTo(h2x, h2z);
    path.lineTo(h3x, h3z);
    path.closePath();
    shape.holes.push(path);
  }

  const geo = new THREE.ShapeGeometry(shape);
  const uv = geo.getAttribute('uv');
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) + 16) / 32, (uv.getY(i) + 16) / 32);
  }
  uv.needsUpdate = true;
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, y, 0);
  return geo;
}
