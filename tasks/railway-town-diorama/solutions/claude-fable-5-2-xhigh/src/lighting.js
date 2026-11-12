// Evening and night lighting. One 0..1 value blends between them, so the switch can ease.
import * as THREE from 'three'
import { glow } from './kit.js'

const EVENING = {
  sun: new THREE.Color(0xffd2a0),
  sky: new THREE.Color(0xffe2c2),
  ground: new THREE.Color(0x6e5a48),
  back: new THREE.Color(0x2b2019),
  sunPower: 3.6,
  fill: 1.1,
}
const NIGHT = {
  sun: new THREE.Color(0x8fa8ff),
  sky: new THREE.Color(0x7d93d6),
  ground: new THREE.Color(0x3a4160),
  back: new THREE.Color(0x0c111d),
  sunPower: 1.5,
  fill: 1.5,
}
const LAMP_POWER = 5

// spots are the positions that cast real light at night; returns a function taking the night amount.
export function buildLighting(scene, renderer, spots) {
  renderer.shadowMap.enabled = true
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  scene.background = new THREE.Color()

  // Low in the south-west: fronts facing the opening view are lit and shadows fall long toward the back right.
  const sun = new THREE.DirectionalLight()
  sun.position.set(-26, 22, 20)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.03
  sun.shadow.radius = 2
  Object.assign(sun.shadow.camera, { left: -28, right: 28, top: 28, bottom: -28, near: 1, far: 90 })
  const fill = new THREE.HemisphereLight()
  scene.add(sun, fill)

  // The lamps stay in the scene at zero power by day, which keeps the shaders from recompiling on the switch.
  const lamps = spots.map(({ x, y, z }) => {
    const light = new THREE.PointLight(0xffc98a, 0, 7, 2)
    light.position.set(x, y, z)
    scene.add(light)
    return light
  })

  return (night) => {
    sun.color.lerpColors(EVENING.sun, NIGHT.sun, night)
    sun.intensity = THREE.MathUtils.lerp(EVENING.sunPower, NIGHT.sunPower, night)
    fill.color.lerpColors(EVENING.sky, NIGHT.sky, night)
    fill.groundColor.lerpColors(EVENING.ground, NIGHT.ground, night)
    fill.intensity = THREE.MathUtils.lerp(EVENING.fill, NIGHT.fill, night)
    scene.background.lerpColors(EVENING.back, NIGHT.back, night)
    glow.window.emissiveIntensity = 1.5 * night
    glow.lamp.emissiveIntensity = 2.2 * night
    for (const light of lamps) light.intensity = LAMP_POWER * night
  }
}
