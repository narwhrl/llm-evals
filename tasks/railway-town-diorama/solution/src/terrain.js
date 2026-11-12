// The display base: tabletop, thick wooden plinth with a raised frame, grass banks and the river channel.
import * as THREE from 'three'
import { box, mat, speckleTexture, woodTexture } from './kit.js'

export const BOARD_X = 20
export const BOARD_Z = 14
export const RIVER_HALF = 1.5

const FRAME = 1.5
const FRAME_TOP = 0.4
const BED_Y = -0.9
export const WATER_Y = -0.6
const BASE_BOTTOM = -3.4

// Centre line of the river, which runs from the back edge of the board to the front edge.
export const riverX = (z) => 5.6 + 1.1 * Math.sin(z * 0.33 + 0.6)

function bank(side, material) {
  const edge = side * BOARD_X
  const shape = new THREE.Shape()
  shape.moveTo(edge, BOARD_Z)
  shape.lineTo(edge, -BOARD_Z)
  for (let z = BOARD_Z; z >= -BOARD_Z; z -= 0.5) shape.lineTo(riverX(z) + side * RIVER_HALF, -z)
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: -BED_Y, bevelEnabled: false })
  geometry.rotateX(-Math.PI / 2).translate(0, BED_Y, 0)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.receiveShadow = true
  return mesh
}

// Returns the water texture so the caller can let it drift downstream.
export function buildTerrain(scene) {
  const table = new THREE.Mesh(new THREE.CircleGeometry(170, 48), mat(0x5f564f, { roughness: 0.95 }))
  table.rotation.x = -Math.PI / 2
  table.position.y = BASE_BOTTOM
  table.receiveShadow = true
  scene.add(table)

  const wood = mat(0xffffff, { map: woodTexture('#8f5d36', '#40240f', 7), roughness: 0.62 })
  const outerX = 2 * (BOARD_X + FRAME)
  const outerZ = 2 * (BOARD_Z + FRAME)
  box(scene, wood, outerX, BED_Y - BASE_BOTTOM, outerZ, 0, (BED_Y + BASE_BOTTOM) / 2, 0)
  const frameH = FRAME_TOP - BED_Y
  const frameY = (FRAME_TOP + BED_Y) / 2
  for (const side of [-1, 1]) {
    box(scene, wood, outerX, frameH, FRAME, 0, frameY, side * (BOARD_Z + FRAME / 2))
    // Turned rather than resized so the grain runs along the bar.
    box(scene, wood, 2 * BOARD_Z, frameH, FRAME, side * (BOARD_X + FRAME / 2), frameY, 0).rotation.y = Math.PI / 2
  }

  const grassMap = speckleTexture('#7c9a4a', ['#6c8b3f', '#8dab57', '#96a94f', '#5f7f3b'], 2600, 11)
  grassMap.repeat.set(0.2, 0.2)
  // Extrusions take [cap, side] materials: turf on top, bare earth down the river banks.
  const turf = [mat(0xffffff, { map: grassMap, roughness: 1 }), mat(0x7a5a3c, { roughness: 1 })]
  scene.add(bank(-1, turf), bank(1, turf))

  const waterMap = speckleTexture('#3d8497', ['#5aa3b4', '#2f6f84', '#7fbcc8', '#35798d'], 900, 23)
  waterMap.repeat.set(3, 4)
  const water = mat(0xffffff, { map: waterMap, roughness: 0.12, metalness: 0.15 })
  const waterWidth = 2 * (RIVER_HALF + 1.2)
  box(scene, water, waterWidth, WATER_Y - BED_Y, 2 * BOARD_Z, 5.6, (WATER_Y + BED_Y) / 2, 0).castShadow = false
  return waterMap
}
