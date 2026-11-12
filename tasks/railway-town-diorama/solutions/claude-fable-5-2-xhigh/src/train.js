// The train: a steam locomotive and two coaches. Every vehicle is built with its front toward local +x.
import * as THREE from 'three'
import { box, cyl, darkWindow, glow, mat } from './kit.js'
import { OFFSETS, vehiclePose } from './motion.js'
import { RAIL_TOP } from './rails.js'

const black = mat(0x26262a, { roughness: 0.55 })
const green = mat(0x2f5a45, { roughness: 0.5 })
const red = mat(0xa5372c, { roughness: 0.6 })
const brass = mat(0xc9a24a, { roughness: 0.35, metalness: 0.6 })
const roof = mat(0x4d4a48)
const cream = mat(0xe9dcbd)
const pose = {}

function axle(group, radius, x) {
  for (const side of [-1, 1]) cyl(group, red, radius, 0.09, x, radius, side * 0.32).rotation.x = Math.PI / 2
}

function locomotive() {
  const group = new THREE.Group()
  for (const x of [-0.8, -0.15]) axle(group, 0.27, x)
  for (const x of [0.6, 1.1]) axle(group, 0.16, x)
  box(group, black, 3, 0.12, 0.72, 0, 0.48, 0)
  box(group, red, 0.1, 0.22, 0.84, 1.5, 0.48, 0)
  cyl(group, green, 0.34, 1.75, 0.45, 0.88, 0).rotation.z = Math.PI / 2
  cyl(group, black, 0.36, 0.22, 1.36, 0.88, 0).rotation.z = Math.PI / 2
  cyl(group, black, 0.1, 0.36, 1.2, 1.32, 0)
  cyl(group, black, 0.14, 0.06, 1.2, 1.5, 0)
  cyl(group, brass, 0.14, 0.2, 0.35, 1.26, 0)
  box(group, glow.lamp, 0.08, 0.15, 0.15, 1.5, 0.92, 0)
  box(group, green, 0.95, 0.9, 0.88, -0.98, 0.97, 0)
  box(group, darkWindow, 0.42, 0.3, 0.9, -0.98, 1.16, 0)
  box(group, roof, 1.12, 0.07, 0.98, -0.98, 1.45, 0)
  box(group, black, 0.4, 0.06, 0.1, -1.65, 0.45, 0)
  return group
}

function coach(material, last) {
  const group = new THREE.Group()
  for (const x of [-1.05, -0.75, 0.75, 1.05]) axle(group, 0.15, x)
  box(group, black, 2.8, 0.1, 0.7, 0, 0.38, 0)
  box(group, material, 2.8, 0.42, 0.88, 0, 0.64, 0)
  box(group, glow.window, 2.76, 0.3, 0.84, 0, 1, 0)
  box(group, cream, 2.8, 0.12, 0.88, 0, 1.21, 0)
  for (let i = 0; i <= 6; i++) box(group, cream, 0.1, 0.3, 0.88, -1.35 + i * 0.45, 1, 0)
  box(group, roof, 2.9, 0.07, 0.96, 0, 1.3, 0)
  box(group, roof, 2.7, 0.06, 0.6, 0, 1.36, 0)
  if (!last) box(group, black, 0.36, 0.06, 0.1, -1.55, 0.4, 0)
  return group
}

// Returns a function that places each vehicle on the track for a locomotive arc length s.
export function buildTrain(scene) {
  const vehicles = [locomotive(), coach(mat(0x7c2d2a, { roughness: 0.6 })), coach(mat(0x2c4a6e, { roughness: 0.6 }), true)]
  for (const vehicle of vehicles) {
    vehicle.position.y = RAIL_TOP
    scene.add(vehicle)
  }
  return (s) => {
    for (let i = 0; i < vehicles.length; i++) {
      vehiclePose(s - OFFSETS[i], pose)
      vehicles[i].position.x = pose.x
      vehicles[i].position.z = pose.z
      vehicles[i].rotation.y = pose.yaw
    }
  }
}
