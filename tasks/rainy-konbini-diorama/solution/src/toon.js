// Shared toon-shading helpers. Cache GEOMETRY only — materials are cheap and
// must never be shared between callers that mutate them (map, emissive, ...).
import * as THREE from 'three';

const gradientCache = new Map();
export function toonGradient(steps = 4) {
  if (!gradientCache.has(steps)) {
    const data = new Uint8Array(steps);
    for (let i = 0; i < steps; i++) {
      data[i] = Math.round(((i + 1) / steps) * 255);
    }
    const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    gradientCache.set(steps, tex);
  }
  return gradientCache.get(steps);
}

const geoCache = new Map();
export function boxGeo(w, h, d) {
  const key = `b${w},${h},${d}`;
  if (!geoCache.has(key)) geoCache.set(key, new THREE.BoxGeometry(w, h, d));
  return geoCache.get(key);
}
export function cylGeo(rt, rb, h, seg = 12) {
  const key = `c${rt},${rb},${h},${seg}`;
  if (!geoCache.has(key)) geoCache.set(key, new THREE.CylinderGeometry(rt, rb, h, seg));
  return geoCache.get(key);
}
export function planeGeo(w, h) {
  const key = `p${w},${h}`;
  if (!geoCache.has(key)) geoCache.set(key, new THREE.PlaneGeometry(w, h));
  return geoCache.get(key);
}

// Fresh toon material per call.
export function toon(color, opts = {}) {
  const m = new THREE.MeshToonMaterial({ color, gradientMap: toonGradient(opts.steps ?? 4), ...opts });
  delete m.steps;
  return m;
}
export function flat(color, opts = {}) {
  return new THREE.MeshBasicMaterial({ color, ...opts });
}
export function glow(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color, transparent: opacity < 1, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
}

// Inverted-hull outline shell. The shell copies the mesh transform so the
// outline sits exactly on the mesh (never at the world origin).
const outlineMatCache = new Map();
function outlineMat(color) {
  const key = color.getHex();
  if (!outlineMatCache.has(key)) {
    outlineMatCache.set(key, new THREE.MeshBasicMaterial({ color, side: THREE.BackSide }));
  }
  return outlineMatCache.get(key);
}

export function outlined(geo, material, { color = 0x14121e, thickness = 0.025 } = {}) {
  const mesh = new THREE.Mesh(geo, material);
  const shell = new THREE.Mesh(geo, outlineMat(typeof color === 'number' ? new THREE.Color(color) : color));
  shell.scale.setScalar(1 + thickness);
  shell.renderOrder = -1;
  mesh.add(shell);
  return mesh;
}

export function box(w, h, d, material, outline) {
  return outlined(boxGeo(w, h, d), material, outline);
}
export function cyl(rt, rb, h, material, seg = 12, outline) {
  return outlined(cylGeo(rt, rb, h, seg), material, outline);
}

// Convenience: place a mesh.
export function at(mesh, x, y, z, ry = 0) {
  mesh.position.set(x, y, z);
  if (ry) mesh.rotation.y = ry;
  return mesh;
}
