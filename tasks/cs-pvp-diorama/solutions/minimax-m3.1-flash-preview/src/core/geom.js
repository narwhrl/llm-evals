import * as THREE from 'three';

/**
 * Geometry helpers.
 *
 * Every piece of the diorama is static, so all of it is authored as raw
 * BufferGeometry and merged per material. Merging requires a uniform
 * attribute layout, which is why every helper here returns NON-INDEXED
 * geometry with exactly position / normal / uv.
 */

// BoxGeometry face order is +X, -X, +Y, -Y, +Z, -Z and each face owns four UVs.
// Scaling them by the two in-plane dimensions keeps texel density even no
// matter how the box is proportioned, which matters a lot on a scene made
// almost entirely of stretched slabs.
const FACE_PLANES = [
  [2, 1],
  [2, 1],
  [0, 2],
  [0, 2],
  [0, 1],
  [0, 1],
];

function scaleBoxUVs(geometry, size, texelsPerUnit) {
  const uv = geometry.attributes.uv;
  for (let face = 0; face < 6; face += 1) {
    const [u, v] = FACE_PLANES[face];
    const su = size[u] * texelsPerUnit;
    const sv = size[v] * texelsPerUnit;
    for (let corner = 0; corner < 4; corner += 1) {
      const i = face * 4 + corner;
      uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
    }
  }
  uv.needsUpdate = true;
  return geometry;
}

/** Axis-aligned box centred on the origin. `texels` is world units per UV tile. */
export function box(w, h, d, texels = 0.5) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  scaleBoxUVs(geometry, [w, h, d], texels);
  return geometry.toNonIndexed();
}

/** Box whose origin sits on the bottom face centre instead of the middle. */
export function boxOnFloor(w, h, d, texels = 0.5) {
  const geometry = box(w, h, d, texels);
  geometry.translate(0, h / 2, 0);
  return geometry;
}

export function cylinder(rTop, rBottom, h, radial = 12, texels = 0.5) {
  const geometry = new THREE.CylinderGeometry(rTop, rBottom, h, radial, 1, false);
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i += 1) {
    uv.setXY(i, uv.getX(i) * Math.max(rTop, rBottom) * 6 * texels, uv.getY(i) * h * texels);
  }
  uv.needsUpdate = true;
  return geometry.toNonIndexed();
}

export function sphere(r, widthSeg = 12, heightSeg = 8) {
  return new THREE.SphereGeometry(r, widthSeg, heightSeg).toNonIndexed();
}

export function torus(r, tube, radialSeg = 8, tubularSeg = 16) {
  return new THREE.TorusGeometry(r, tube, radialSeg, tubularSeg).toNonIndexed();
}

export function cone(r, h, radial = 10) {
  return new THREE.ConeGeometry(r, h, radial).toNonIndexed();
}

export function plane(w, h, wSeg = 1, hSeg = 1) {
  return new THREE.PlaneGeometry(w, h, wSeg, hSeg).toNonIndexed();
}

/** Quad in the XZ plane, facing +Y. Used for ground decals and water patches. */
export function groundPlane(w, d, texels = 1) {
  const geometry = new THREE.PlaneGeometry(w, d);
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i += 1) {
    uv.setXY(i, uv.getX(i) * w * texels, uv.getY(i) * d * texels);
  }
  uv.needsUpdate = true;
  const flat = geometry.toNonIndexed();
  flat.rotateX(-Math.PI / 2);
  return flat;
}

/**
 * Box with an arbitrary rotation, handy for leaning boards, tipped crates and
 * anything else that should not sit perfectly square.
 */
export function tiltedBox(w, h, d, rx, ry, rz, texels = 0.5) {
  const geometry = box(w, h, d, texels);
  if (rx) geometry.rotateX(rx);
  if (ry) geometry.rotateY(ry);
  if (rz) geometry.rotateZ(rz);
  return geometry;
}

/** Catenary-ish wire between two poles, sagging under its own weight. */
export function wire(from, to, sag, radius = 0.035, segments = 14) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(from, to, t);
    point.y -= Math.sin(t * Math.PI) * sag;
    points.push(point);
  }
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, segments, radius, 4, false).toNonIndexed();
}

/** Extrudes a closed 2D outline (XY) along +Z and recentres it. */
export function extrude(points, depth, bevel = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) shape.lineTo(points[i][0], points[i][1]);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 1,
    curveSegments: 4,
  });
  geometry.center();
  return geometry.toNonIndexed();
}
