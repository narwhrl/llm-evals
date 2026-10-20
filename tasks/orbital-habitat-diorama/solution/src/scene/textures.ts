import * as THREE from "three";

/**
 * Every texture in the diorama is loaded from `assets/`, which the generator
 * in `tools/` writes. Nothing is fetched from the network.
 */

const loader = new THREE.TextureLoader();

export interface TextureSet {
  earthDay: THREE.Texture;
  earthNight: THREE.Texture;
  earthClouds: THREE.Texture;
  wall: THREE.Texture;
  wallOuter: THREE.Texture;
  floor: THREE.Texture;
  bagFabric: THREE.Texture;
  towelFabric: THREE.Texture;
  desk: THREE.Texture;
  memo: THREE.Texture;
  book: THREE.Texture;
  net: THREE.Texture;
  leaf: THREE.Texture;
  blueprint: THREE.Texture;
  cable: THREE.Texture;
}

function load(url: string, options: { srgb?: boolean; repeat?: number[] } = {}) {
  const texture = loader.load(url);
  texture.colorSpace = options.srgb === false ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  if (options.repeat) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(options.repeat[0], options.repeat[1]);
  }
  return texture;
}

export function loadTextures(): TextureSet {
  return {
    earthDay: load("assets/earth_day.png"),
    earthNight: load("assets/earth_night.png"),
    earthClouds: load("assets/earth_clouds.png", { srgb: false }),
    wall: load("assets/wall_panels.png", { repeat: [3, 1] }),
    // The outside of the hull is seen from a long way off, so the same panel
    // plate is repeated more sparsely there.
    wallOuter: load("assets/wall_panels.png", { repeat: [0.6, 0.6] }),
    floor: load("assets/floor_grate.png", { repeat: [10, 4] }),
    bagFabric: load("assets/fabric_bag.png"),
    towelFabric: load("assets/fabric_towel.png"),
    desk: load("assets/desk_top.png"),
    memo: load("assets/memo_board.png"),
    book: load("assets/book_pages.png"),
    net: load("assets/net.png", { srgb: false, repeat: [1, 1] }),
    leaf: load("assets/leaf.png", { srgb: false }),
    blueprint: load("assets/blueprint.png"),
    cable: load("assets/cable_wrap.png", { repeat: [8, 1] }),
  };
}

/** The palette the whole diorama is built from. */
export const PALETTE = {
  enamel: 0xd8dad6,
  enamelDim: 0xa8aca8,
  steel: 0x9aa0a4,
  darkSteel: 0x4a5055,
  frame: 0x6f757a,
  graphite: 0x2b3036,
  rubber: 0x1d2126,
  warmLight: 0xffd9a8,
  plantLight: 0xff8ce0,
  screen: 0x1a3b4a,
  accent: 0xd2603a,
  fabric: 0x3d4d5c,
  towel: 0xa89b86,
  leaf: 0x4f8f3a,
  copper: 0xb87a4a,
};

export function standardMaterial(
  color: number,
  options: Partial<THREE.MeshStandardMaterialParameters> = {},
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.82,
    metalness: 0.05,
    ...options,
  });
}
