// The railway: ballast bed, sleepers, rails, the two river bridges and the level crossing.
import * as THREE from 'three'
import { asphalt, box, cyl, mat, speckleTexture } from './kit.js'
import { RIVER_HALF, WATER_Y, riverX } from './terrain.js'
import { LENGTH, TRACK_Z, pointAt } from './track.js'

export const CROSSING_X = -3
export const ROAD_WIDTH = 1.5
export const RAIL_TOP = 0.3

const GAUGE = 0.32
const DECK = 0.25
const SPAN = 2 * RIVER_HALF + 1.8

const timber = mat(0x4a3526)
const stone = mat(0xa39a8c, { roughness: 0.95 })
const p = {}

// A flat band that follows the loop between two lateral offsets (positive is outside the loop).
function ring(scene, material, inner, outer, y0, y1) {
  const outline = (offset) => {
    const points = []
    for (let i = 0; i < 360; i++) {
      pointAt((i / 360) * LENGTH, p)
      points.push(new THREE.Vector2(p.x + p.tz * offset, p.tx * offset - p.z))
    }
    return points
  }
  const shape = new THREE.Shape(outline(outer))
  shape.holes.push(new THREE.Path(outline(inner)))
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: y1 - y0, bevelEnabled: false })
  geometry.rotateX(-Math.PI / 2).translate(0, y0, 0)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = mesh.receiveShadow = true
  scene.add(mesh)
}

function sleepers(scene) {
  const count = Math.round(LENGTH / 0.42)
  const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.15, 0.06, 1.2), timber, count)
  const dummy = new THREE.Object3D()
  for (let i = 0; i < count; i++) {
    pointAt((i / count) * LENGTH, p)
    dummy.position.set(p.x, 0.19, p.z)
    dummy.rotation.y = Math.atan2(-p.tz, p.tx)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
  }
  mesh.castShadow = mesh.receiveShadow = true
  scene.add(mesh)
}

// The ballast band carries on across the river; this puts a bridge under and around it.
function bridge(scene, z, steel, truss) {
  const x = riverX(z)
  const left = x - SPAN / 2
  box(scene, steel, SPAN, DECK, 1.9, x, -DECK / 2, z)
  const pierH = -DECK - WATER_Y + 0.2
  for (const offset of [-RIVER_HALF + 0.1, 0, RIVER_HALF - 0.1]) {
    box(scene, stone, offset ? 0.7 : 0.45, pierH, 2.3, x + offset, -DECK - pierH / 2, z)
  }
  for (const side of [-1, 1]) {
    const edge = z + side * 0.95
    if (!truss) {
      box(scene, steel, SPAN, 0.62, 0.1, x, 0.19, edge)
      for (let i = 0; i <= 8; i++) box(scene, steel, 0.07, 0.62, 0.2, left + (i * SPAN) / 8, 0.19, edge)
      continue
    }
    const top = 2
    const panel = SPAN / 4
    box(scene, steel, SPAN, 0.16, 0.12, x, 0.06, edge)
    box(scene, steel, 2 * panel + 0.12, 0.12, 0.12, x, top, edge)
    for (let i = 0; i < 4; i++) {
      // Alternating diagonals make a Warren truss with sloping end posts.
      const diagonal = box(scene, steel, Math.hypot(panel, top), 0.11, 0.11, left + (i + 0.5) * panel, top / 2, edge)
      diagonal.rotation.z = (i % 2 ? -1 : 1) * Math.atan2(top, panel)
    }
  }
  if (truss) for (const i of [1, 2, 3]) box(scene, steel, 0.1, 0.1, 1.9, left + (i * SPAN) / 4, 2, z)
}

function crossing(scene) {
  const z = -TRACK_Z
  const y = RAIL_TOP - 0.045
  const white = mat(0xf1ece0)
  box(scene, timber, ROAD_WIDTH, 0.07, 2 * GAUGE - 0.12, CROSSING_X, y, z)
  for (const side of [-1, 1]) {
    box(scene, timber, ROAD_WIDTH, 0.07, 0.5, CROSSING_X, y, z + side * (GAUGE + 0.33))
    const ramp = box(scene, asphalt, ROAD_WIDTH, 0.06, 0.9, CROSSING_X, 0.14, z + side * 1.32)
    ramp.rotation.x = side * 0.3
    const postX = CROSSING_X - side * (ROAD_WIDTH / 2 + 0.3)
    cyl(scene, white, 0.045, 1.2, postX, 0.6, z + side * 1.5)
    for (const turn of [-1, 1]) {
      box(scene, white, 0.62, 0.09, 0.04, postX, 1.12, z + side * 1.55).rotation.z = (turn * Math.PI) / 4
    }
  }
}

export function buildRails(scene) {
  const ballastMap = speckleTexture('#8d8377', ['#756c61', '#a29a8d', '#665e55', '#b0a698'], 5200, 31)
  ring(scene, mat(0xffffff, { map: ballastMap, roughness: 1 }), -0.78, 0.78, 0, 0.16)
  sleepers(scene)
  const rail = mat(0x9a9ca0, { roughness: 0.38, metalness: 0.45 })
  for (const side of [-1, 1]) ring(scene, rail, side * GAUGE - 0.035, side * GAUGE + 0.035, 0.16, RAIL_TOP)
  bridge(scene, TRACK_Z, mat(0x7d3a2c, { roughness: 0.6 }), true)
  bridge(scene, -TRACK_Z, mat(0x3f5a55, { roughness: 0.6 }), false)
  crossing(scene)
}
