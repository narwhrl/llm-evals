import * as THREE from 'three';
import { applyShaders, atmosphereHook, surfaceDetailHook, windHook } from '../core/atmosphere';

const IVORY = 0xf3ebdc;
const GOLD = 0xffc24a;

/**
 * Every material the geometry builder can address by key. All lit surfaces go through the atmosphere
 * hook, so distance haze is computed the same way everywhere.
 */
export function createMaterials(noise: THREE.Texture, plaza: THREE.Texture): Record<string, THREE.Material> {
  const stone = (parameters: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial =>
    new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0, ...parameters });

  // Stone is matte: the lower roughness would throw a bright rim along every column edge.
  const ivory = stone({ color: IVORY, roughness: 0.8 });
  // Gold is pure metal: its colour comes from what it mirrors, so it leans hard on the sky environment.
  const gold = stone({ color: GOLD, roughness: 0.34, metalness: 1, envMapIntensity: 2.0 });
  const bronze = stone({ color: 0xc08a52, roughness: 0.4, metalness: 0.9, envMapIntensity: 1.5 });
  const dark = stone({ color: 0x2a3140, roughness: 1 });
  // Lamp orbs: the one thing on the islands meant to bloom, so pushed well above the bloom threshold.
  const glow = stone({ color: 0xcdf3ff, emissive: 0x74d4ff, emissiveIntensity: 4.0, roughness: 0.35 });
  const roof = stone({ color: 0x7fc7bb, roughness: 0.42, metalness: 0.05 });
  const paving = stone({ color: 0xd8d0bd, roughness: 0.85 });
  const plazaFloor = new THREE.MeshStandardMaterial({ map: plaza, roughness: 0.8 });

  applyShaders(ivory, atmosphereHook, surfaceDetailHook(noise, { scale: 0.9, strength: 0.14, strata: 0 }));
  for (const material of [gold, bronze, dark, glow, roof, paving, plazaFloor]) applyShaders(material, atmosphereHook);

  return { ivory, gold, bronze, dark, glow, roof, stone: paving, plaza: plazaFloor };
}

/** Foliage multiplies three colours: baked shade in the mesh, the species colour, and a per-tree tint. */
export function createFoliageMaterials(): Record<'trunk' | 'leaf' | 'bush', THREE.MeshStandardMaterial> {
  // Trunks carry no baked shade, so they must not ask for vertex colours.
  const trunk = applyShaders(new THREE.MeshStandardMaterial({ color: 0x5b4634, roughness: 0.9 }), atmosphereHook);
  const leaf = applyShaders(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, vertexColors: true }), atmosphereHook, windHook);
  const bush = applyShaders(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, vertexColors: true }), atmosphereHook);
  return { trunk, leaf, bush };
}

/** Still water: mostly a mirror of the procedural sky, with a faint teal body. */
export function createWaterMaterial(): THREE.MeshStandardMaterial {
  const water = new THREE.MeshStandardMaterial({
    color: 0x2f93c4,
    roughness: 0.05,
    metalness: 0,
    transparent: true,
    opacity: 0.88,
    envMapIntensity: 1.5,
  });
  return applyShaders(water, atmosphereHook);
}
