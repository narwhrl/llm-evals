import * as THREE from 'three';

const gradient = new THREE.DataTexture(new Uint8Array([55, 125, 195, 255]), 4, 1, THREE.RedFormat);
gradient.minFilter = THREE.NearestFilter;
gradient.magFilter = THREE.NearestFilter;
gradient.needsUpdate = true;

export function toon(color, options = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap: gradient, ...options });
}

export const materials = {
  ink: new THREE.LineBasicMaterial({ color: 0x11182a, transparent: true, opacity: 0.82 }),
  base: toon(0x263249),
  baseTrim: toon(0x3d4b63),
  asphalt: new THREE.MeshStandardMaterial({ color: 0x172438, roughness: 0.27, metalness: 0.42 }),
  alley: new THREE.MeshStandardMaterial({ color: 0x223047, roughness: 0.34, metalness: 0.25 }),
  sidewalk: toon(0x748295),
  sidewalkLight: toon(0x929ca7),
  curb: toon(0xb1b9bd),
  grout: new THREE.LineBasicMaterial({ color: 0x3d4b61, transparent: true, opacity: 0.45 }),
  white: toon(0xe9e5d6),
  warmWhite: toon(0xf4dfba),
  wall: toon(0xc8c6ae),
  wallDark: toon(0x52606c),
  mint: toon(0x68b9a7),
  mintDark: toon(0x276f6d),
  orange: toon(0xe89a62),
  red: toon(0xc55f68),
  yellow: toon(0xe7c56e),
  navy: toon(0x273c58),
  metal: new THREE.MeshStandardMaterial({ color: 0x71818d, roughness: 0.42, metalness: 0.65 }),
  darkMetal: new THREE.MeshStandardMaterial({ color: 0x26313d, roughness: 0.4, metalness: 0.62 }),
  rubber: toon(0x17202c),
  wood: toon(0x96765f),
  paper: toon(0xe5d8b7),
  glass: new THREE.MeshPhysicalMaterial({
    color: 0xa8d9db,
    transparent: true,
    opacity: 0.16,
    roughness: 0.14,
    metalness: 0.05,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
  fridgeGlass: new THREE.MeshPhysicalMaterial({
    color: 0xb5e5e3,
    transparent: true,
    opacity: 0.2,
    roughness: 0.12,
    depthWrite: false,
  }),
  wet: new THREE.MeshPhysicalMaterial({
    color: 0x25425a,
    transparent: true,
    opacity: 0.72,
    roughness: 0.12,
    metalness: 0.62,
    depthWrite: false,
  }),
  roadPaint: new THREE.MeshStandardMaterial({
    color: 0xd9e3d7,
    emissive: 0x607577,
    emissiveIntensity: 0.16,
    roughness: 0.3,
    metalness: 0.2,
  }),
};

export const unitBox = new THREE.BoxGeometry(1, 1, 1);
export const unitBoxEdges = new THREE.EdgesGeometry(unitBox, 25);
export const unitPlane = new THREE.PlaneGeometry(1, 1);
const cylinderCache = new Map();
const cylinderEdgeCache = new Map();

export function box(parent, size, position, material, outline = true) {
  const mesh = new THREE.Mesh(unitBox, material);
  mesh.scale.set(...size);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (outline) {
    const edges = new THREE.LineSegments(unitBoxEdges, materials.ink);
    edges.renderOrder = 2;
    mesh.add(edges);
  }
  parent.add(mesh);
  return mesh;
}

export function cylinder(parent, radius, height, position, material, segments = 16, outline = false) {
  if (!cylinderCache.has(segments)) {
    const geometry = new THREE.CylinderGeometry(1, 1, 1, segments);
    cylinderCache.set(segments, geometry);
    cylinderEdgeCache.set(segments, new THREE.EdgesGeometry(geometry, 28));
  }
  const mesh = new THREE.Mesh(cylinderCache.get(segments), material);
  mesh.scale.set(radius, height, radius);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (outline) {
    mesh.add(new THREE.LineSegments(cylinderEdgeCache.get(segments), materials.ink));
  }
  parent.add(mesh);
  return mesh;
}

export function sphere(parent, radius, position, material, segments = 16) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, 10), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

export function plane(parent, size, position, material, rotation = [-Math.PI / 2, 0, 0]) {
  const mesh = new THREE.Mesh(unitPlane, material);
  mesh.scale.set(size[0], size[1], 1);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function beam(parent, start, end, radius, material, segments = 10, outline = false) {
  const a = new THREE.Vector3(...start);
  const b = new THREE.Vector3(...end);
  const direction = b.clone().sub(a);
  const mesh = cylinder(parent, radius, direction.length(), a.clone().add(b).multiplyScalar(0.5).toArray(), material, segments, outline);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return mesh;
}

export function tube(parent, points, radius, material, segments = 32) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, radius, 6, false), material);
  parent.add(mesh);
  return mesh;
}

export function instanced(parent, geometry, material, items, shadows = false) {
  if (!items.length) return null;
  const mesh = new THREE.InstancedMesh(geometry, material, items.length);
  const dummy = new THREE.Object3D();
  items.forEach((item, index) => {
    dummy.position.set(...item.p);
    dummy.scale.set(...item.s);
    dummy.rotation.set(...(item.r || [0, 0, 0]));
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = shadows;
  mesh.receiveShadow = shadows;
  parent.add(mesh);
  return mesh;
}

export function emissive(color, intensity = 1, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.45,
    ...options,
  });
}

export function basic(color, options = {}) {
  return new THREE.MeshBasicMaterial({ color, ...options });
}
