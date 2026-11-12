// Greenery and street furniture: the street lamps, and seeded trees that keep clear of everything built.
import * as THREE from 'three'
import { box, cone, cyl, glow, mat, seeded } from './kit.js'
import { BOARD_X, BOARD_Z, RIVER_HALF, riverX } from './terrain.js'
import { keepOut } from './town.js'
import { LENGTH, TRACK_Z, pointAt } from './track.js'

// [x, z] — each stands just off a street edge, in a gap between house fronts.
const LAMPS = [
  [-12.2, -0.3], [-9.85, -2.1], [-6.1, -0.3], [-2.05, -0.3], [3.4, -2.15], [8.4, -2.1], [10.1, -0.3],
  [-2.1, -3.65], [-3.9, -5.65], [-2.1, -7.5], [-2.1, 3], [-6.2, 4.95], [0.9, 4.95], [-10.4, 4.6],
  [-8.6, 1.4], [11.9, 1.6], [10.1, 4.1], [-3.9, -11.2],
]
const LAMP_Y = 1.34

const iron = mat(0x2b2b2e)
const greens = [0x5f8a3a, 0x6f9a44, 0x4f7a35, 0x86a04a, 0xb99a3c]
const pines = [0x2f5d43, 0x3a6b4a]
const dummy = new THREE.Object3D()
const tint = new THREE.Color()

function lamp(scene, x, z) {
  cyl(scene, iron, 0.035, 1.25, x, 0.625, z)
  box(scene, glow.lamp, 0.15, 0.18, 0.15, x, LAMP_Y, z).castShadow = false
  cone(scene, iron, 0.15, 0.1, x, LAMP_Y + 0.09, z, 4)
  return { x, y: LAMP_Y, z }
}

function instances(scene, geometry, material, count) {
  const mesh = new THREE.InstancedMesh(geometry, material, count)
  mesh.castShadow = mesh.receiveShadow = true
  scene.add(mesh)
  return mesh
}

function put(mesh, i, x, y, z, radius, h, color) {
  dummy.position.set(x, y, z)
  dummy.scale.set(radius, h, radius)
  dummy.rotation.y = i * 2.4
  dummy.updateMatrix()
  mesh.setMatrixAt(i, dummy.matrix)
  if (color) mesh.setColorAt(i, tint.set(color))
}

function trees(scene, blocked) {
  const random = seeded(19)
  const track = []
  for (let i = 0; i < 240; i++) track.push(pointAt((i / 240) * LENGTH))
  const spots = []
  for (let tries = 0; tries < 2600 && spots.length < 150; tries++) {
    const x = (random() * 2 - 1) * (BOARD_X - 0.9)
    const z = (random() * 2 - 1) * (BOARD_Z - 0.9)
    // Wider clearance on the sides that face the opening view, so trees do not hide the train.
    const clear = x > 15 || z > TRACK_Z ? 2.5 : 1.7
    if (Math.abs(x - riverX(z)) < RIVER_HALF + 0.8) continue
    if (track.some((p) => Math.hypot(p.x - x, p.z - z) < clear)) continue
    if (blocked.some(([x0, x1, z0, z1]) => x > x0 - 0.5 && x < x1 + 0.5 && z > z0 - 0.5 && z < z1 + 0.5)) continue
    if (spots.some((spot) => Math.hypot(spot.x - x, spot.z - z) < 1.05)) continue
    spots.push({ x, z })
  }

  const leaf = () => mat(0xffffff, { flatShading: true })
  const trunks = instances(scene, new THREE.CylinderGeometry(0.06, 0.09, 1, 6).translate(0, 0.5, 0), mat(0x5d4230), spots.length)
  const crowns = instances(scene, new THREE.IcosahedronGeometry(1, 1), leaf(), spots.length)
  const tiers = instances(scene, new THREE.ConeGeometry(1, 1, 9).translate(0, 0.5, 0), leaf(), 2 * spots.length)
  let crown = 0
  let tier = 0
  spots.forEach(({ x, z }, i) => {
    const size = 0.75 + random() * 0.5
    put(trunks, i, x, 0, z, size, 0.7 * size)
    if (random() < 0.3) {
      const color = pines[i % 2]
      put(tiers, tier++, x, 0.4 * size, z, 0.55 * size, 1.1 * size, color)
      put(tiers, tier++, x, size, z, 0.4 * size, 0.95 * size, color)
    } else {
      put(crowns, crown++, x, 1.05 * size, z, 0.58 * size, 0.62 * size, greens[Math.floor(random() * greens.length)])
    }
  })
  crowns.count = crown
  tiers.count = tier
}

// Returns the lamp head positions, so the lighting can make some of them cast real light.
export function buildScenery(scene) {
  const heads = LAMPS.map(([x, z]) => lamp(scene, x, z))
  trees(scene, [...keepOut, ...LAMPS.map(([x, z]) => [x - 0.2, x + 0.2, z - 0.2, z + 0.2])])
  return heads
}
