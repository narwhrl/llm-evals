// The town: a street grid inside the rail loop, the road bridge, the station and the buildings.
import * as THREE from 'three'
import { asphalt, box, cone, cyl, darkWindow, gable, glow, mat, seeded } from './kit.js'
import { CROSSING_X, ROAD_WIDTH } from './rails.js'
import { riverX } from './terrain.js'
import { STATION_X, TRACK_Z } from './track.js'

const HIGH_ST_Z = -1.2
const LANE_Z = 4
const WEST_ST_X = -9.5
const EAST_LANE_X = 11

// Rectangles [x0, x1, z0, z1] that scenery must keep clear: streets and building plots.
export const keepOut = []

const HALF = ROAD_WIDTH / 2
const S = 0
const N = Math.PI
const E = Math.PI / 2
const W = -Math.PI / 2

const STREETS = [
  [CROSSING_X - HALF, CROSSING_X + HALF, 1.75 - TRACK_Z, LANE_Z + HALF],
  [CROSSING_X - HALF, CROSSING_X + HALF, -12.6, -1.75 - TRACK_Z],
  [WEST_ST_X - HALF, 2.6, LANE_Z - HALF, LANE_Z + HALF],
  [-12.6, 12.9, HIGH_ST_Z - HALF, HIGH_ST_Z + HALF],
  [WEST_ST_X - HALF, WEST_ST_X + HALF, HIGH_ST_Z - HALF, LANE_Z + HALF],
  [EAST_LANE_X - HALF, EAST_LANE_X + HALF, HIGH_ST_Z - HALF, 4.6],
]

// [x, z, width, depth, floors, turn] — every house fronts the nearest street.
const HOUSES = [
  [-4.55, 2.2, 1.7, 1.4, 2, E], [-4.55, 0.45, 1.6, 1.4, 2, E], [-7.85, 2.35, 1.7, 1.3, 1, S],
  [-6.2, 2.45, 1.4, 1.2, 1, S], [-7.6, 0.4, 1.9, 1.3, 1, N], [1.4, 2.4, 1.7, 1.3, 1, S],
  [3.2, 2.4, 1.6, 1.3, 2, S], [1.6, 0.4, 2, 1.3, 2, N], [3.4, 0.45, 1.3, 1.2, 1, N],
  [-4.7, -2.75, 1.8, 1.3, 2, S], [-6.8, -2.8, 1.7, 1.3, 1, S], [-8.8, -2.75, 1.6, 1.3, 1, S],
  [-11, -2.8, 1.8, 1.3, 2, S], [-4.55, -4.7, 1.6, 1.4, 1, E], [-4.55, -6.5, 1.4, 1.3, 1, E],
  [-1.3, -2.75, 1.6, 1.3, 2, S], [0.7, -2.8, 1.8, 1.3, 1, S], [2.5, -2.75, 1.3, 1.2, 1, S],
  [-1.45, -4.7, 1.6, 1.4, 2, W], [-1.45, -6.5, 1.4, 1.3, 1, W], [-11.1, 2.6, 1.7, 1.3, 1, E],
  [-11.1, 0.5, 1.8, 1.3, 2, E], [9.15, 0.6, 1.7, 1.3, 1, N], [12.7, 0.5, 1.6, 1.3, 2, N],
  [10.6, -3.1, 1.9, 1.3, 1, S], [12.6, -3, 1.4, 1.2, 1, S], [9.1, 3, 1.4, 1.2, 1, E],
  [-5.3, -12.2, 1.7, 1.3, 2, E],
]

const random = seeded(5)
const pick = (list) => list[Math.floor(random() * list.length)]
const walls = [0xeadcb8, 0xf2e8d5, 0xb9593f, 0xd9a95a, 0xaec1c4, 0xbcc59c].map((color) => mat(color))
const roofs = [0xa5482f, 0x4e5661, 0x6e4a38].map((color) => mat(color))
const stone = mat(0xb3a898, { roughness: 0.95 })
const wood = mat(0x6b4a33)
const white = mat(0xf1ece0)
const dark = mat(0x2b2b2e)

function strip(scene, material, [x0, x1, z0, z1], h = 0.04) {
  keepOut.push([x0, x1, z0, z1])
  box(scene, material, x1 - x0, h, z1 - z0, (x0 + x1) / 2, h / 2, (z0 + z1) / 2).castShadow = false
}

function roadBridge(scene) {
  const x = riverX(HIGH_ST_Z)
  box(scene, stone, 4.4, 0.32, 1.8, x, -0.17, HIGH_ST_Z)
  for (const side of [-1, 1]) {
    box(scene, stone, 0.5, 0.6, 1.8, x + side * 0.8, -0.6, HIGH_ST_Z)
    box(scene, stone, 4.4, 0.3, 0.14, x, 0.15, HIGH_ST_Z + side * 0.83)
  }
}

// A gabled house with its ridge along local x and its front door toward local +z; returns the group for extras.
function house(scene, x, z, w, d, floors, turn, wall = pick(walls), roof = pick(roofs)) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  group.rotation.y = turn
  scene.add(group)
  const sideways = Math.abs(Math.sin(turn)) > 0.5
  const ex = (sideways ? d : w) / 2 + 0.45
  const ez = (sideways ? w : d) / 2 + 0.45
  keepOut.push([x - ex, x + ex, z - ez, z + ez])

  const h = 0.3 + floors * 0.85
  const rise = d * 0.42
  box(group, stone, w + 0.08, 0.14, d + 0.08, 0, 0.07, 0)
  box(group, wall, w, h, d, 0, h / 2, 0)
  // The wall gable pokes just past the wider roof prism, which leaves the roof as a bargeboard around it.
  gable(group, wall, w + 0.02, rise, d, 0, h, 0)
  gable(group, roof, w, rise + 0.12, d + 0.3, 0, h, 0)
  box(group, stone, 0.2, rise + 0.35, 0.2, w * 0.28, h + (rise + 0.35) / 2, -d * 0.15)
  box(group, wood, 0.3, 0.52, 0.06, 0, 0.4, d / 2)

  const pane = (px, py, pz, across) => {
    const material = random() < 0.6 ? glow.window : darkWindow
    box(group, material, across ? 0.06 : 0.26, 0.34, across ? 0.26 : 0.06, px, py, pz).castShadow = false
  }
  const columns = Math.max(2, Math.round(w / 0.75))
  for (let floor = 0; floor < floors; floor++) {
    const y = 0.62 + floor * 0.85
    for (const side of [-1, 1]) {
      pane((side * w) / 2, y, 0, true)
      for (let i = 0; i < columns; i++) {
        const px = ((i + 0.5) / columns - 0.5) * w
        if (floor || side < 0 || Math.abs(px) > 0.3) pane(px, y, (side * d) / 2)
      }
    }
  }
  return group
}

function waterTower(scene, x, z) {
  keepOut.push([x - 1, x + 1, z - 1, z + 1])
  for (const dx of [-0.35, 0.35]) for (const dz of [-0.35, 0.35]) cyl(scene, wood, 0.05, 1.4, x + dx, 0.7, z + dz)
  cyl(scene, wood, 0.6, 0.8, x, 1.8, z)
  cone(scene, roofs[2], 0.68, 0.35, x, 2.2, z)
}

// Returns where the station's lights hang, so the lighting can put real light there at night.
function station(scene) {
  const x = STATION_X + 2.9
  const z = TRACK_Z - 2.85
  const brick = walls[2]
  const slate = roofs[1]
  keepOut.push([x - 5.3, x + 5.3, 4.7, TRACK_Z])
  strip(scene, stone, [x - 3, x + 3, 4.7, 5.35], 0.05)
  box(scene, stone, 10.2, 0.34, 1.3, x, 0.17, TRACK_Z - 1.35)
  box(scene, white, 10.2, 0.02, 0.08, x, 0.345, TRACK_Z - 0.76).castShadow = false

  box(scene, brick, 5, 1.5, 1.7, x, 0.75, z)
  gable(scene, brick, 5.02, 0.7, 1.7, x, 1.5, z)
  gable(scene, slate, 5, 0.82, 2, x, 1.5, z)
  for (let i = -2; i <= 2; i++) {
    for (const side of [-1, 1]) box(scene, glow.window, 0.42, 0.6, 0.06, x + i * 0.95, 0.85, z + side * 0.85)
  }
  box(scene, brick, 1.1, 3, 1.1, x, 1.5, z - 0.65)
  cone(scene, slate, 0.85, 0.8, x, 3, z - 0.65, 4)
  box(scene, wood, 0.5, 0.8, 0.06, x, 0.4, z - 1.2)
  for (const side of [-1, 1]) {
    const face = z - 0.65 + side * 0.56
    cyl(scene, glow.lamp, 0.3, 0.04, x, 2.45, face).rotation.x = Math.PI / 2
    box(scene, dark, 0.035, 0.22, 0.02, x, 2.54, face + side * 0.03)
    box(scene, dark, 0.16, 0.035, 0.02, x + side * 0.07, 2.45, face + side * 0.03)
  }

  box(scene, slate, 5.6, 0.08, 1.5, x, 1.42, TRACK_Z - 1.3)
  for (let i = 0; i < 4; i++) cyl(scene, white, 0.045, 1.05, x - 2.4 + i * 1.6, 0.865, TRACK_Z - 0.8)
  const spots = [{ x, y: 1.9, z: 4.6 }]
  for (const dx of [-1.8, 0, 1.8]) {
    box(scene, glow.lamp, 0.3, 0.06, 0.3, x + dx, 1.35, TRACK_Z - 1.3).castShadow = false
    if (dx) spots.push({ x: x + dx, y: 1.2, z: TRACK_Z - 1.3 })
  }
  box(scene, white, 1.3, 0.32, 0.05, x + 4, 1.05, TRACK_Z - 1.8)
  for (const dx of [-0.5, 0.5]) cyl(scene, dark, 0.03, 0.56, x + 4 + dx, 0.62, TRACK_Z - 1.8)
  return spots
}

export function buildTown(scene) {
  for (const street of STREETS) strip(scene, asphalt, street)
  roadBridge(scene)
  for (const plot of HOUSES) house(scene, ...plot)

  const hall = house(scene, -1, 1.4, 2.6, 1.7, 2, W, walls[0], roofs[1])
  box(hall, white, 0.5, 0.5, 0.5, 0, 2.9, 0)
  cone(hall, roofs[1], 0.45, 0.5, 0, 3.15, 0, 4)
  const church = house(scene, -8.4, -5.3, 2.8, 1.5, 1.7, S, walls[1], roofs[1])
  box(church, walls[1], 1, 3, 1, -1, 1.5, 0)
  cone(church, roofs[1], 0.78, 1.5, -1, 3, 0, 4)
  house(scene, -0.6, -12.1, 2.2, 1.6, 1, W, walls[2], roofs[2])
  house(scene, 12.8, 3.2, 2.2, 1.6, 2, W, walls[2], roofs[2])
  cyl(scene, walls[2], 0.22, 3.4, 12.8, 1.7, 4.55)
  house(scene, 1.7, 6.2, 1.2, 1, 2, S, walls[1], roofs[0])
  waterTower(scene, -9.3, 6.4)
  return station(scene)
}
