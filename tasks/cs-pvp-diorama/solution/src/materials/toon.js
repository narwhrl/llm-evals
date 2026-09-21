import * as THREE from 'three'

const gradientMap = (() => {
  const colors = new Uint8Array([40, 90, 160, 255])
  const map = new THREE.DataTexture(colors, 4, 1, THREE.RedFormat)
  map.minFilter = THREE.NearestFilter
  map.magFilter = THREE.NearestFilter
  map.needsUpdate = true
  return map
})()

export function toon(color, opts = {}) {
  return new THREE.MeshToonMaterial({
    color,
    gradientMap,
    ...opts,
  })
}

export const COLORS = {
  concrete: '#6e737a',
  concreteDark: '#4a4f56',
  asphalt: '#3a3e45',
  metal: '#7a828c',
  metalRust: '#8a6a55',
  wood: '#8b6b45',
  woodDark: '#5c4632',
  cardboard: '#b89a6a',
  blueBarrel: '#2f5f9e',
  blueBarrelDark: '#1f3f6e',
  tire: '#1a1a1c',
  graffitiRed: '#c23b3b',
  graffitiBlue: '#3b6fc2',
  graffitiYellow: '#c2a33b',
  bombMark: '#e8e8e8',
  warehouse: '#5a6068',
  tin: '#6d747c',
  glass: '#8ab4c8',
  barrier: '#c9a23a',
  police: '#2a3a55',
  warmLight: '#ffb060',
  coldLight: '#a8c8e8',
  greenFence: '#3d5a3d',
  container: '#3d6a55',
  containerOrange: '#a85a2a',
  containerBlue: '#2a4a7a',
  puddle: '#1a2838',
}
