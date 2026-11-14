import * as THREE from 'three';

const geoCache = new Map();

function cached(key, make) {
  let geo = geoCache.get(key);
  if (!geo) {
    geo = make();
    geoCache.set(key, geo);
  }
  return geo;
}

export function std(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, ...opts });
}

export function box(w, h, d, material) {
  const geo = cached(`b:${w}:${h}:${d}`, () => new THREE.BoxGeometry(w, h, d));
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function cyl(rTop, rBottom, h, material, segments = 16) {
  const geo = cached(`c:${rTop}:${rBottom}:${h}:${segments}`, () =>
    new THREE.CylinderGeometry(rTop, rBottom, h, segments));
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function sphere(r, material, segments = 14) {
  const geo = cached(`s:${r}:${segments}`, () => new THREE.SphereGeometry(r, segments, Math.round(segments * 0.7)));
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function plane(w, h, material) {
  const geo = cached(`p:${w}:${h}`, () => new THREE.PlaneGeometry(w, h));
  const mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  return mesh;
}

export function add(parent, mesh, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  parent.add(mesh);
  return mesh;
}

export function group(name = '') {
  const g = new THREE.Group();
  g.name = name;
  return g;
}

export function note(object, data) {
  object.userData.note = data;
  return object;
}

// A timeline item owns its own materials so cross-fades never leak into neighbours.
export function stamp(object, config) {
  object.userData.timeline = config;
  object.userData.basePosition = object.position.clone();
  object.userData.baseScale = object.scale.clone();
  object.userData.baseRotationY = object.rotation.y;
  object.traverse((child) => {
    if (!child.isMesh) return;
    const clone = (material) => {
      const copy = material.clone();
      copy.userData.baseOpacity = copy.opacity;
      copy.userData.baseTransparent = copy.transparent;
      copy.userData.baseDepthWrite = copy.depthWrite;
      return copy;
    };
    child.material = Array.isArray(child.material) ? child.material.map(clone) : clone(child.material);
  });
  return object;
}

export function collectTimeline(root) {
  const items = [];
  const visit = (object) => {
    if (object.userData.timeline) {
      items.push(object);
      return;
    }
    for (const child of object.children) visit(child);
  };
  visit(root);
  return items;
}

export function eachMaterial(object, fn) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) fn(material);
  });
}

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const smooth = (a, b, t) => {
  const x = clamp((t - a) / (b - a || 1), 0, 1);
  return x * x * (3 - 2 * x);
};
export const lerp = (a, b, t) => a + (b - a) * t;
