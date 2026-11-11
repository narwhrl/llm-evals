import * as THREE from 'three';

export const palette = {
  ivory: new THREE.MeshStandardMaterial({ color: '#e8e5d9', roughness: 0.78, metalness: 0.04 }),
  white: new THREE.MeshStandardMaterial({ color: '#fff7e8', roughness: 0.64, metalness: 0.04 }),
  shade: new THREE.MeshStandardMaterial({ color: '#94afba', roughness: 0.9 }),
  gold: new THREE.MeshStandardMaterial({ color: '#cda45e', roughness: 0.35, metalness: 0.64 }),
  paleGold: new THREE.MeshStandardMaterial({ color: '#e6c989', roughness: 0.51, metalness: 0.36 }),
  grass: new THREE.MeshStandardMaterial({ color: '#628559', roughness: 1, vertexColors: true }),
  leaves: new THREE.MeshStandardMaterial({ color: '#477a64', roughness: 0.96, flatShading: true }),
  lightLeaves: new THREE.MeshStandardMaterial({ color: '#729779', roughness: 0.96, flatShading: true }),
  bark: new THREE.MeshStandardMaterial({ color: '#777f78', roughness: 1 }),
  rock: new THREE.MeshStandardMaterial({ color: '#b8b2a4', roughness: 0.96, vertexColors: true, flatShading: true }),
  rockDetail: new THREE.MeshStandardMaterial({ color: '#a1a498', roughness: 0.94, flatShading: true }),
  ruin: new THREE.MeshStandardMaterial({ color: '#b8c2b8', roughness: 0.98 }),
  distantRock: new THREE.MeshStandardMaterial({ color: '#7e9aa5', roughness: 1, flatShading: true }),
};

export function seededRandom(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(1664525, value) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function shadow(mesh: THREE.Mesh): THREE.Mesh {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function mesh(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[]): THREE.Mesh {
  return shadow(new THREE.Mesh(geometry, material));
}

export function cylinder(
  parent: THREE.Object3D,
  radius: number,
  height: number,
  y: number,
  material: THREE.Material = palette.ivory,
  segments = 32,
): THREE.Mesh {
  const part = mesh(new THREE.CylinderGeometry(radius, radius, height, segments), material);
  part.position.y = y;
  parent.add(part);
  return part;
}

export function box(
  parent: THREE.Object3D,
  size: THREE.Vector3,
  position: THREE.Vector3,
  material: THREE.Material = palette.ivory,
): THREE.Mesh {
  const part = mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
  part.position.copy(position);
  parent.add(part);
  return part;
}

export function pointedRoof(
  parent: THREE.Object3D,
  radius: number,
  height: number,
  y: number,
  x = 0,
  z = 0,
): THREE.Group {
  const roof = new THREE.Group();
  const lower = mesh(new THREE.ConeGeometry(radius, height, 8, 1), palette.ivory);
  lower.position.y = height / 2;
  roof.add(lower);
  const collar = mesh(new THREE.CylinderGeometry(radius * 0.66, radius * 0.72, 0.35, 8), palette.paleGold);
  collar.position.y = height * 0.73;
  roof.add(collar);
  const needle = mesh(new THREE.CylinderGeometry(0.025, 0.11, height * 0.38, 8), palette.gold);
  needle.position.y = height * 1.05;
  roof.add(needle);
  const orb = mesh(new THREE.SphereGeometry(0.22, 10, 6), palette.gold);
  orb.position.y = height * 0.94;
  roof.add(orb);
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const rib = mesh(new THREE.CylinderGeometry(0.055, 0.11, height * 0.86, 5), palette.paleGold);
    rib.position.set(Math.cos(angle) * radius * 0.45, height * 0.47, Math.sin(angle) * radius * 0.45);
    rib.rotation.z = Math.atan2(radius * 0.8, height) * Math.cos(angle);
    rib.rotation.x = -Math.atan2(radius * 0.8, height) * Math.sin(angle);
    roof.add(rib);
  }
  roof.position.set(x, y, z);
  parent.add(roof);
  return roof;
}
