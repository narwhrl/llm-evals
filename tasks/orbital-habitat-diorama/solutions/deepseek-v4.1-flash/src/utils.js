import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const DEG = Math.PI / 180;

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

export function canvasTexture(canvas, { repeat = null, srgb = true, aniso = 8 } = {}) {
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = aniso;
  if (repeat) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat[0], repeat[1]);
  }
  return texture;
}

export function std(color, options = {}) {
  const { roughness = 0.88, metalness = 0.04, ...rest } = options;
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...rest });
}

export function emissive(color, intensity = 1.6, options = {}) {
  return new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 1,
    metalness: 0,
    ...options,
  });
}

export function box(w, h, d, material, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0 } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function rbox(w, h, d, r, material, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, seg = 2 } = {}) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2, h / 2, d / 2)), material);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function cyl(rt, rb, h, seg, material, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0 } = {}) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function sphere(r, wSeg, hSeg, material, { x = 0, y = 0, z = 0 } = {}) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, wSeg, hSeg), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function plane(w, h, material, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0 } = {}) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.receiveShadow = true;
  return mesh;
}

export function tube(points, radius, material, { tubular = 64, radial = 6, closed = false } = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), closed);
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, tubular, radius, radial, closed), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function group(parent, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, name = "" } = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.set(rx, ry, rz);
  g.name = name;
  if (parent) parent.add(g);
  return g;
}

export class Rivets {
  constructor(radius = 0.014, height = 0.01) {
    this.radius = radius;
    this.height = height;
    this.items = [];
    this.up = new THREE.Vector3(0, 1, 0);
  }

  add(position, normal, scale = 1) {
    this.items.push({ position: new THREE.Vector3(...position), normal: new THREE.Vector3(...normal).normalize(), scale });
  }

  addRow(from, to, count, normal, scale = 1) {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const p = a.clone().lerp(b, t);
      this.add([p.x, p.y, p.z], normal, scale);
    }
  }

  build(material) {
    if (!this.items.length) return null;
    const geo = new THREE.CylinderGeometry(this.radius, this.radius * 1.08, this.height, 8);
    const mesh = new THREE.InstancedMesh(geo, material, this.items.length);
    const dummy = new THREE.Object3D();
    this.items.forEach((item, i) => {
      dummy.position.copy(item.position);
      dummy.quaternion.setFromUnitVectors(this.up, item.normal);
      dummy.scale.setScalar(item.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }
}

// Sweep a (z, y) profile along X. `profile` entries are { z, y, nz, ny } with the
// normal pointing away from the cabin. Adds inner/outer surfaces, end caps and a
// rim cap at the final profile point, so a cut shell reads as a solid section.
// When `capMaterial` is given, the end caps and rim are a separate geometry group
// so they can show the sandwich layer.
export function sweepProfile(profile, thickness, x0, x1, material, { capMaterial = null } = {}) {
  const inner = profile.map((p) => [p.z, p.y]);
  const outer = profile.map((p) => [p.z + p.nz * thickness, p.y + p.ny * thickness]);
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  let surfaceCount = 0;
  const pushQuad = (a, b, c, d, n) => {
    const base = positions.length / 3;
    for (const v of [a, b, c, d]) positions.push(v[0], v[1], v[2]);
    for (let i = 0; i < 4; i += 1) normals.push(n[0], n[1], n[2]);
    uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  for (let i = 0; i < profile.length - 1; i += 1) {
    const p0 = profile[i];
    pushQuad(
      [x0, inner[i][1], inner[i][0]],
      [x1, inner[i][1], inner[i][0]],
      [x1, inner[i + 1][1], inner[i + 1][0]],
      [x0, inner[i + 1][1], inner[i + 1][0]],
      [-p0.nz, -p0.ny, 0],
    );
    pushQuad(
      [x0, outer[i][1], outer[i][0]],
      [x0, outer[i + 1][1], outer[i + 1][0]],
      [x1, outer[i + 1][1], outer[i + 1][0]],
      [x1, outer[i][1], outer[i][0]],
      [p0.nz, p0.ny, 0],
    );
  }
  surfaceCount = indices.length;
  for (const x of [x0, x1]) {
    const n = x === x0 ? [-1, 0, 0] : [1, 0, 0];
    for (let i = 0; i < profile.length - 1; i += 1) {
      pushQuad(
        [x, inner[i][1], inner[i][0]],
        [x, inner[i + 1][1], inner[i + 1][0]],
        [x, outer[i + 1][1], outer[i + 1][0]],
        [x, outer[i][1], outer[i][0]],
        n,
      );
    }
  }
  const p = profile[profile.length - 1];
  const i = profile.length - 1;
  pushQuad(
    [x0, inner[i][1], inner[i][0]],
    [x1, inner[i][1], inner[i][0]],
    [x1, outer[i][1], outer[i][0]],
    [x0, outer[i][1], outer[i][0]],
    [p.nz, p.ny, 0],
  );
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  if (capMaterial) {
    geo.addGroup(0, surfaceCount, 0);
    geo.addGroup(surfaceCount, indices.length - surfaceCount, 1);
    const mesh = new THREE.Mesh(geo, [material, capMaterial]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Deterministic low-frequency value noise for the diorama's paper/paper-like surfaces.
export function valueNoise2D(seed = 1) {
  const rand = mulberry32(seed);
  const grid = new Float32Array(64 * 64);
  for (let i = 0; i < grid.length; i += 1) grid[i] = rand();
  return (x, y) => {
    const xi = Math.floor(x) & 63;
    const yi = Math.floor(y) & 63;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const a = grid[yi * 64 + xi];
    const b = grid[yi * 64 + ((xi + 1) & 63)];
    const c = grid[((yi + 1) & 63) * 64 + xi];
    const d = grid[((yi + 1) & 63) * 64 + ((xi + 1) & 63)];
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };
}
