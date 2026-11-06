import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const TAU = Math.PI * 2;
const ivory = new THREE.MeshStandardMaterial({ color: '#eee9d6', roughness: 0.73 });
const white = new THREE.MeshStandardMaterial({ color: '#fcf6df', roughness: 0.62 });
const shade = new THREE.MeshStandardMaterial({ color: '#a6b9b0', roughness: 0.85 });
const gold = new THREE.MeshStandardMaterial({ color: '#c8a657', metalness: 0.55, roughness: 0.36 });
const roof = new THREE.MeshStandardMaterial({ color: '#789d9d', metalness: 0.2, roughness: 0.57 });
const recess = new THREE.MeshStandardMaterial({ color: '#264c57', roughness: 0.65 });
const glow = new THREE.MeshStandardMaterial({ color: '#fff1be', emissive: '#f8cf77', emissiveIntensity: 1.8 });

class Stonework {
  private batches = new Map<THREE.Material, THREE.BufferGeometry[]>();

  add(geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0, ry = 0) {
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)),
      new THREE.Vector3(1, 1, 1),
    );
    const transformed = geometry.index ? geometry.toNonIndexed() : geometry;
    transformed.applyMatrix4(matrix);
    transformed.deleteAttribute('uv');
    if (transformed !== geometry) geometry.dispose();
    const batch = this.batches.get(material) ?? [];
    batch.push(transformed);
    this.batches.set(material, batch);
  }

  cylinder(x: number, y: number, z: number, bottom: number, top: number, height: number, material = ivory, sides = 12) {
    this.add(new THREE.CylinderGeometry(top, bottom, height, sides), material, x, y + height / 2, z);
  }

  box(x: number, y: number, z: number, w: number, h: number, d: number, material = ivory, ry = 0) {
    this.add(new THREE.BoxGeometry(w, h, d), material, x, y + h / 2, z, ry);
  }

  finish(group: THREE.Group) {
    this.batches.forEach((geometries, material) => {
      const merged = mergeGeometries(geometries);
      if (!merged) throw new Error('Architecture geometry could not be merged.');
      const mesh = new THREE.Mesh(merged, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      geometries.forEach((geometry) => geometry.dispose());
    });
    this.batches.clear();
  }
}

function pointedArch(width: number, height: number, thickness: number, depth: number) {
  const w = width / 2;
  const shoulder = height * 0.53;
  const shape = new THREE.Shape();
  shape.moveTo(-w - thickness, 0);
  shape.lineTo(-w - thickness, shoulder);
  shape.quadraticCurveTo(-w - thickness, height * 0.82, 0, height + thickness);
  shape.quadraticCurveTo(w + thickness, height * 0.82, w + thickness, shoulder);
  shape.lineTo(w + thickness, 0);
  shape.lineTo(w, 0);
  shape.lineTo(w, shoulder);
  shape.quadraticCurveTo(w, height * 0.78, 0, height);
  shape.quadraticCurveTo(-w, height * 0.78, -w, shoulder);
  shape.lineTo(-w, 0);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 8 }).translate(0, 0, -depth / 2);
}

function arcade(b: Stonework, x: number, y: number, z: number, radius: number, height: number, count: number) {
  const width = 2 * radius * Math.sin(Math.PI / count) * 0.78;
  for (let i = 0; i < count; i++) {
    const angle = (i + 0.5) * TAU / count;
    b.add(pointedArch(width, height, 0.35, 0.8), white,
      x + Math.cos(angle) * radius, y, z + Math.sin(angle) * radius, Math.PI / 2 - angle);
    const a = i * TAU / count;
    const px = x + Math.cos(a) * radius;
    const pz = z + Math.sin(a) * radius;
    b.cylinder(px, y, pz, 0.58, 0.37, height * 0.9, ivory, 8);
    b.cylinder(px, y + height * 0.68, pz, 0.66, 0.66, 0.3, gold, 8);
    b.cylinder(px, y + height * 0.93, pz, 0.6, 0.08, 2.8, white, 6);
  }
}

function crown(b: Stonework, x: number, y: number, z: number, radius: number, height: number, count = 8) {
  b.cylinder(x, y, z, radius, radius * 0.82, 0.8, gold);
  for (let i = 0; i < count; i++) {
    const a = i * TAU / count;
    const px = x + Math.cos(a) * radius * 0.82;
    const pz = z + Math.sin(a) * radius * 0.82;
    b.cylinder(px, y, pz, radius * 0.14, radius * 0.09, height * 0.36, white, 6);
    b.cylinder(px, y + height * 0.36, pz, radius * 0.15, 0, height * 0.64, gold, 6);
  }
}

function spire(b: Stonework, x: number, y: number, z: number, height: number, radius: number, ruined = false) {
  b.cylinder(x, y, z, radius * 1.38, radius * 1.38, 1.3, ivory, 8);
  b.cylinder(x, y + 1.3, z, radius * 1.15, radius * 0.83, height * 0.62, white, 8);
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8;
    const sx = x + Math.cos(a) * radius * 0.91;
    const sz = z + Math.sin(a) * radius * 0.91;
    b.box(sx, y + height * 0.22, sz, radius * 0.34, height * 0.28, 0.15, recess, Math.PI / 2 - a);
    b.add(pointedArch(radius * 0.34, height * 0.3, 0.2, 0.23), gold,
      sx, y + height * 0.22, sz, Math.PI / 2 - a);
  }
  b.cylinder(x, y + height * 0.62, z, radius * 1.15, radius * 1.15, 0.7, gold, 8);
  if (ruined) {
    for (let i = 0; i < 5; i++) {
      const a = i * TAU / 8;
      b.cylinder(x + Math.cos(a) * radius * 0.8, y + height * 0.64, z + Math.sin(a) * radius * 0.8,
        0.5, 0.36, height * (0.04 + i * 0.025), shade, 5);
    }
    return;
  }
  b.cylinder(x, y + height * 0.64, z, radius * 1.12, radius * 0.5, height * 0.08, white, 8);
  b.cylinder(x, y + height * 0.72, z, radius * 0.68, 0, height * 0.29, roof, 8);
  b.cylinder(x, y + height * 0.92, z, radius * 0.17, 0, height * 0.2, gold, 6);
  crown(b, x, y + height * 0.64, z, radius * 1.08, height * 0.17);
}

function curvedBand(radius: number, width: number, depth: number, start: number, end: number, y: (a: number) => number) {
  const positions: number[] = [];
  const indices: number[] = [];
  const steps = Math.max(3, Math.ceil((end - start) * 35));
  for (let j = 0; j <= steps; j++) {
    const a = start + (end - start) * j / steps;
    for (const [r, h] of [[radius - width / 2, 0], [radius + width / 2, 0], [radius - width / 2, -depth], [radius + width / 2, -depth]]) {
      positions.push(Math.cos(a) * r, y(a) + h, Math.sin(a) * r);
    }
  }
  for (let j = 0; j < steps; j++) {
    const n = j * 4;
    for (const [a, c, d, e] of [[0, 4, 1, 5], [2, 3, 6, 7], [0, 2, 4, 6], [1, 5, 3, 7]]) {
      indices.push(n + a, n + c, n + d, n + d, n + c, n + e);
    }
  }
  indices.push(0, 1, 2, 2, 1, 3);
  const last = steps * 4;
  indices.push(last, last + 2, last + 1, last + 1, last + 2, last + 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function ringBridges(b: Stonework) {
  const radius = 110;
  const height = (a: number) => 8.2 + Math.sin(a * 2) * 5;
  const spans = 40;
  for (let i = 0; i < spans; i++) {
    const a = i * TAU / spans + 0.12;
    const next = (i + 1) * TAU / spans + 0.12;
    if (i === 15 || i === 16) continue;
    b.add(curvedBand(radius, 7.6, 1.65, a, next, height), ivory);
    for (const edge of [-4.05, 4.05]) {
      b.add(curvedBand(radius + edge, 0.48, 0.7, a, next, (angle) => height(angle) + 0.18), gold);
      b.add(curvedBand(radius + edge, 0.5, 0.4, a, next, (angle) => height(angle) + 2.3), white);
      for (let k = 0; k < 4; k++) {
        const t = a + (next - a) * (k + 0.5) / 4;
        b.add(pointedArch(2.75, 1.9, 0.16, 0.34), white,
          Math.cos(t) * (radius + edge), height(t), Math.sin(t) * (radius + edge), Math.PI / 2 - t);
      }
    }
    const middle = (a + next) / 2;
    const archHeight = 11.8;
    for (const edge of [-2.8, 2.8]) {
      b.add(pointedArch(15.1, archHeight, 1, 1.1), white,
        Math.cos(middle) * (radius + edge), height(middle) - archHeight - 1.8,
        Math.sin(middle) * (radius + edge), Math.PI / 2 - middle);
    }
    b.cylinder(Math.cos(a) * radius, height(a) - 16, Math.sin(a) * radius, 0.6, 1.5, 14.5, ivory, 8);
    b.cylinder(Math.cos(a) * radius, height(a) - 20, Math.sin(a) * radius, 0.08, 0.65, 4, gold, 6);
  }

  for (const a of [0.12, Math.PI / 2 + 0.12, Math.PI + 0.12, Math.PI * 1.5 + 0.12]) {
    const rotation = -a;
    const level = height(a);
    b.box(Math.cos(a) * 77, level - 1.3, Math.sin(a) * 77, 60, 1.8, 6.4, ivory, rotation);
    for (let i = 0; i < 3; i++) {
      const r = 55 + i * 20;
      b.add(pointedArch(17, 12, 1.1, 3.9), white, Math.cos(a) * r, level - 13.3, Math.sin(a) * r, rotation);
    }
    for (const side of [-3, 3]) {
      for (let i = 0; i < 15; i++) {
        const r = 48 + i * 4;
        const x = Math.cos(a) * r - Math.sin(a) * side;
        const z = Math.sin(a) * r + Math.cos(a) * side;
        b.add(pointedArch(3, 2.2, 0.22, 0.4), white, x, level + 0.5, z, rotation);
      }
    }
  }
}

function sanctuary(b: Stonework) {
  b.cylinder(0, 1, 0, 27, 27, 2, shade, 16);
  for (let i = 0; i < 5; i++) b.cylinder(0, 3 + i * 0.8, 0, 27 - i * 1.7, 27 - i * 1.7, 0.8, i === 4 ? gold : ivory, 16);
  b.cylinder(0, 7, 0, 15, 13.1, 29, ivory, 12);
  arcade(b, 0, 8, 0, 17.2, 19.5, 12);
  b.cylinder(0, 27.3, 0, 18.3, 18, 1.5, white, 12);
  b.cylinder(0, 28.8, 0, 18, 16.6, 1.1, gold, 12);
  b.cylinder(0, 30, 0, 16.8, 12.1, 7, white, 12);
  crown(b, 0, 30, 0, 16.1, 9, 12);

  b.cylinder(0, 36, 0, 11.2, 8.2, 39, ivory, 8);
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8;
    const x = Math.cos(a) * 10;
    const z = Math.sin(a) * 10;
    b.box(x, 41, z, 2.25, 22, 0.4, recess, Math.PI / 2 - a);
    b.add(pointedArch(2.25, 25, 0.38, 0.7), white, x, 41, z, Math.PI / 2 - a);
    b.cylinder(Math.cos(a + Math.PI / 8) * 10.3, 35, Math.sin(a + Math.PI / 8) * 10.3,
      1, 0.48, 34, white, 6);
    b.cylinder(Math.cos(a + Math.PI / 8) * 10.3, 69, Math.sin(a + Math.PI / 8) * 10.3,
      0.85, 0, 9, gold, 6);
  }
  b.cylinder(0, 72, 0, 11.6, 11.6, 1.4, gold, 12);
  b.cylinder(0, 73.4, 0, 12.3, 10.6, 2.2, white, 12);
  arcade(b, 0, 76, 0, 8.9, 15.5, 8);
  b.cylinder(0, 76, 0, 5.2, 4.8, 16, recess, 8);
  b.cylinder(0, 91, 0, 10.5, 8.4, 1.8, white, 12);
  b.cylinder(0, 92.8, 0, 8.6, 8.6, 0.65, gold, 12);
  b.cylinder(0, 93.5, 0, 8.2, 5.8, 19, ivory, 8);
  arcade(b, 0, 96, 0, 6.6, 12, 8);
  crown(b, 0, 111, 0, 7, 7);
  b.cylinder(0, 111, 0, 6.7, 3.5, 8.3, white, 8);
  b.cylinder(0, 119.3, 0, 3.8, 0.5, 19.5, white, 8);
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8;
    const path = new THREE.LineCurve3(
      new THREE.Vector3(Math.cos(a) * 3.9, 119.3, Math.sin(a) * 3.9),
      new THREE.Vector3(Math.cos(a) * 0.54, 139, Math.sin(a) * 0.54),
    );
    b.add(new THREE.TubeGeometry(path, 1, 0.16, 5, false), gold);
  }
  b.cylinder(0, 137, 0, 1.3, 0.6, 9, gold, 8);

  for (let i = 0; i < 6; i++) {
    const a = i * TAU / 6 + 0.25;
    const x = Math.cos(a) * 28;
    const z = Math.sin(a) * 25;
    const radius = i % 2 === 0 ? 4 : 3.5;
    b.cylinder(x, 1, z, radius * 1.48, radius * 1.38, 4, shade, 8);
    spire(b, x, 5, z, i % 2 === 0 ? 52 : 40, radius);
    b.add(pointedArch(11, 17, 1.2, 2), ivory,
      Math.cos(a) * 19.5, 5, Math.sin(a) * 17.5, -a);
  }

  // The arch faces follow the exposed cliff shelves, with their backs buried in stone.
  const cliffShelves = [[69.2, 0.133], [49.6, 0.195], [39.3, 0.329], [49.5, 0.326], [59.1, 0.225], [43.7, 0.523], [49.7, 0.173], [40.2, 0.171], [58.3, 0.136]];
  for (let i = 0; i < 9; i++) {
    const a = i * TAU / 9;
    const [radius, slope] = cliffShelves[i];
    const r = radius - 0.15;
    const y = -32 - (i % 3) * 5;
    const shear = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, slope, 1, 0, 0, 0, 0, 1);
    const arch = pointedArch(4, 14, 0.7, 1.25).applyMatrix4(shear);
    b.add(arch, shade, Math.cos(a) * r, y, Math.sin(a) * r, Math.PI / 2 - a);
    const buttress = new THREE.CylinderGeometry(0.6, 0.12, 7, 6).translate(0, -3.5, 0).applyMatrix4(shear);
    b.add(buttress, shade, Math.cos(a) * r, y, Math.sin(a) * r, Math.PI / 2 - a);
  }
}

function armillary() {
  const group = new THREE.Group();
  group.position.y = 152;
  const ringMaterial = new THREE.MeshStandardMaterial({ color: '#e0bc63', metalness: 0.45, roughness: 0.32, emissive: '#936822', emissiveIntensity: 0.17 });
  const angles = [[0.3, 0, 0.2], [1.24, 0.48, 0.15], [0.2, 1.03, 0.65], [Math.PI / 2, 0.2, 0]];
  angles.forEach(([x, y, z], i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(17.5 + i * 0.65, i === 3 ? 0.28 : 0.47, 8, 128), ringMaterial);
    ring.rotation.set(x, y, z);
    group.add(ring);
    if (i < 2) {
      const detail = new THREE.Group();
      for (let j = 0; j < 24; j++) {
        const a = j * TAU / 24;
        const tick = new THREE.Mesh(new THREE.BoxGeometry(j % 3 === 0 ? 0.42 : 0.22, j % 3 === 0 ? 1.7 : 0.8, 0.2), ringMaterial);
        tick.position.set(Math.cos(a) * (18 + i * 0.65), Math.sin(a) * (18 + i * 0.65), 0);
        tick.rotation.z = a - Math.PI / 2;
        detail.add(tick);
      }
      detail.rotation.copy(ring.rotation);
      group.add(detail);
    }
  });
  const inner = new THREE.Mesh(new THREE.OctahedronGeometry(3.2), glow);
  inner.scale.set(0.8, 1.7, 0.8);
  group.add(inner);
  const haloPixels = new Uint8Array(64 * 64 * 4);
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      const radius = Math.hypot((x - 31.5) / 32, (y - 31.5) / 32);
      const index = (y * 64 + x) * 4;
      haloPixels[index] = 255;
      haloPixels[index + 1] = 220;
      haloPixels[index + 2] = 134;
      haloPixels[index + 3] = Math.round(Math.max(0, 1 - radius) ** 3 * 120);
    }
  }
  const haloTexture = new THREE.DataTexture(haloPixels, 64, 64);
  haloTexture.needsUpdate = true;
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  halo.scale.set(19, 19, 1);
  group.add(halo);
  for (const y of [-1, 1]) {
    const spear = new THREE.Mesh(new THREE.ConeGeometry(1.7, 6, 6), ringMaterial);
    spear.position.y = y * 22;
    if (y < 0) spear.rotation.z = Math.PI;
    group.add(spear);
  }
  const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 44, 6), ringMaterial);
  group.add(axis);
  return group;
}

export function createArchitecture() {
  const group = new THREE.Group();
  const b = new Stonework();
  sanctuary(b);
  ringBridges(b);
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8 + 0.12;
    const x = Math.cos(a) * 110;
    const z = Math.sin(a) * 110;
    const y = 2 + Math.sin(a * 2) * 5;
    const h = [31, 42, 24, 37, 48, 26, 35, 22][i];
    for (let j = 0; j < 3; j++) b.cylinder(x, y + j * 0.8, z, 9.5 - j, 9.5 - j, 0.8, ivory, 10);
    spire(b, x, y + 2.4, z, h, 3.6 + (i % 3) * 0.6, i === 2 || i === 6);
    if (i % 2 === 0) {
      const ax = x + Math.cos(a + Math.PI / 2) * 11;
      const az = z + Math.sin(a + Math.PI / 2) * 11;
      arcade(b, ax, y + 1, az, 4.5, 7, 6);
      crown(b, ax, y + 8, az, 5, 5, 6);
    }
  }
  b.finish(group);
  const rings = armillary();
  group.add(rings);
  return {
    group,
    update(elapsed: number) {
      rings.rotation.y = elapsed * 0.025;
      rings.rotation.z = Math.sin(elapsed * 0.07) * 0.045;
    },
  };
}
