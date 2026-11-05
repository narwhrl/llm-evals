import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const geos = new Map();
const mats = new Map();
const once = (map, key, make) => map.get(key) ?? map.set(key, make()).get(key);

// Deterministic randomness so every load builds the same room.
export function rng(seed = 1) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function mat(color, rough = 0.7, metal = 0) {
  return once(mats, `${color}|${rough}|${metal}`, () => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal }));
}
export const tmat = (map, rough = 0.75, extra = {}) => new THREE.MeshStandardMaterial({ map, roughness: rough, ...extra });
export const glow = (color, strength = 1) => once(mats, `glow|${color}|${strength}`, () =>
  new THREE.MeshStandardMaterial({ color: '#000', emissive: color, emissiveIntensity: strength, roughness: 0.4 }));
export const glass = once(mats, 'glass', () => new THREE.MeshPhysicalMaterial({
  color: '#dfe9ea', roughness: 0.05, metalness: 0, transparent: true, opacity: 0.18, depthWrite: false,
}));

const boxGeo = (w, h, d, r) => once(geos, `b${w}|${h}|${d}|${r}`, () =>
  r ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2)) : new THREE.BoxGeometry(w, h, d));
const cylGeo = (a, b, h, s) => once(geos, `c${a}|${b}|${h}|${s}`, () => new THREE.CylinderGeometry(a, b, h, s));
const sphGeo = (r) => once(geos, `s${r}`, () => new THREE.SphereGeometry(r, 20, 14));
const planeGeo = (w, h) => once(geos, `p${w}|${h}`, () => new THREE.PlaneGeometry(w, h));

function put(parent, mesh, x, y, z, o) {
  mesh.position.set(x, y, z);
  mesh.rotation.set(o.rx ?? 0, o.ry ?? 0, o.rz ?? 0);
  if (o.s) mesh.scale.set(...o.s);
  mesh.castShadow = o.cast ?? true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

// box/cyl take y as the bottom face unless o.c (centered) is set.
export const box = (p, w, h, d, m, x = 0, y = 0, z = 0, o = {}) =>
  put(p, new THREE.Mesh(boxGeo(w, h, d, o.r ?? 0), m), x, o.c ? y : y + h / 2, z, o);
export const cyl = (p, rt, rb, h, m, x = 0, y = 0, z = 0, o = {}) =>
  put(p, new THREE.Mesh(cylGeo(rt, rb, h, o.seg ?? 20), m), x, o.c ? y : y + h / 2, z, o);
export const sph = (p, r, m, x = 0, y = 0, z = 0, o = {}) => put(p, new THREE.Mesh(sphGeo(r), m), x, y, z, o);
export const plane = (p, w, h, m, x = 0, y = 0, z = 0, o = {}) =>
  put(p, new THREE.Mesh(planeGeo(w, h), m), x, y, z, { cast: false, ...o });
export const mesh = (p, geo, m, x = 0, y = 0, z = 0, o = {}) => put(p, new THREE.Mesh(geo, m), x, y, z, o);

export function grp(parent, x = 0, y = 0, z = 0, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  return g;
}

export function cable(parent, points, r, m) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  return put(parent, new THREE.Mesh(new THREE.TubeGeometry(curve, points.length * 8, r, 5), m), 0, 0, 0, { cast: false });
}

// Screen plane whose vertices bulge forward like CRT glass; uvs stay planar for click mapping.
export function bulgedPlane(w, h, depth) {
  const g = new THREE.PlaneGeometry(w, h, 16, 12);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) / (w / 2), v = pos.getY(i) / (h / 2);
    pos.setZ(i, depth * (1 - 0.5 * (u * u + v * v)));
  }
  g.computeVertexNormals();
  return g;
}

// Open cylinder segment facing +z, for the curved ultrawide.
export function curvedPlane(w, h, radius) {
  const arc = w / radius;
  const g = new THREE.CylinderGeometry(radius, radius, h, 32, 1, true, Math.PI - arc / 2, arc);
  g.scale(-1, 1, 1); // flip so the inside faces the viewer and u runs left to right
  g.translate(0, 0, radius);
  return g;
}
