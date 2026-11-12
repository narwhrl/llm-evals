import * as THREE from "three";
import { GOLD, IVORY, ROOF } from "./arch";
import type { Kit } from "./util";

// Banded toon ramp indexed by N·L (-1..1): unlit, half-tone, lit.
const ramp = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0, 105, 185, 255, 255]), 8, 1, THREE.RedFormat);
ramp.minFilter = ramp.magFilter = THREE.NearestFilter;
ramp.needsUpdate = true;

const toon = (params: THREE.MeshToonMaterialParameters) => new THREE.MeshToonMaterial({ gradientMap: ramp, ...params });

export const MATERIALS = {
  [IVORY]: toon({ color: 0xf4ecd9 }),
  [GOLD]: toon({ color: 0xf2c768, emissive: 0x8a5f14, emissiveIntensity: 0.55 }),
  [ROOF]: toon({ color: 0xc9dfea }),
  /** Buried masonry under the island: weathered, so it only half emerges from the rock. */
  ancient: toon({ color: 0xd9d2c8 }),
  armillary: toon({ color: 0xffdf80, emissive: 0xf0a622, emissiveIntensity: 0.62 }),
  core: new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 5.2, 3.4) }),
  /** Rock, grass and foliage carry their palette in vertex colours. */
  painted: toon({ vertexColors: true }),
  water: toon({ color: 0x74d3f2, emissive: 0x2a86b8, emissiveIntensity: 0.35 }),
} as const;

export type MaterialKey = keyof typeof MATERIALS;

export function solid(geometry: THREE.BufferGeometry, key: MaterialKey): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, MATERIALS[key]);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

/** One shadow-casting mesh per material used in the kit. */
export function kitMeshes(kit: Kit, remap: Partial<Record<string, MaterialKey>> = {}): THREE.Group {
  const group = new THREE.Group();
  for (const key of kit.keys()) group.add(solid(kit.geometry(key)!, remap[key] ?? (key as MaterialKey)));
  return group;
}

/** Instanced copies of a kit, one InstancedMesh per material. */
export function kitInstances(kit: Kit, matrices: THREE.Matrix4[]): THREE.Group {
  const group = new THREE.Group();
  for (const key of kit.keys()) {
    const mesh = new THREE.InstancedMesh(kit.geometry(key)!, MATERIALS[key as MaterialKey], matrices.length);
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
  }
  return group;
}
