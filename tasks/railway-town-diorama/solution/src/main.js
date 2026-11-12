// The page: builds the diorama, runs the train and wires the control panel.
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { buildLighting } from './lighting.js'
import { resetTrain, stepTrain } from './motion.js'
import { buildRails } from './rails.js'
import { buildScenery } from './scenery.js'
import { buildTerrain } from './terrain.js'
import { buildTown } from './town.js'
import { buildTrain } from './train.js'

const FOV = 30
const DESIGN_ASPECT = 1.6
const AZIMUTH = 0.56
const ELEVATION = 0.64
const DISTANCE = 82
// Fraction of the window height the picture is raised by, to clear the control bar.
const LIFT = 0.07

const byId = (id) => document.getElementById(id)
const toggle = byId('toggle')
const speed = byId('speed')
const speedValue = byId('speedValue')
const dayNight = byId('daynight')
const status = byId('status')

const renderer = new THREE.WebGLRenderer({ canvas: byId('scene'), antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
const scene = new THREE.Scene()

const waterMap = buildTerrain(scene)
buildRails(scene)
const stationSpots = buildTown(scene)
const lampHeads = buildScenery(scene)
const placeTrain = buildTrain(scene)
// Every second street lamp casts real light; the rest only glow, which keeps the light count modest.
const setNight = buildLighting(scene, renderer, [...stationSpots, ...lampHeads.filter((_, i) => i % 2 === 0)])

const camera = new THREE.PerspectiveCamera(FOV, DESIGN_ASPECT, 1, 600)
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, -1, 0.5)
camera.position.set(
  controls.target.x + DISTANCE * Math.sin(AZIMUTH) * Math.cos(ELEVATION),
  controls.target.y + DISTANCE * Math.sin(ELEVATION),
  controls.target.z + DISTANCE * Math.cos(AZIMUTH) * Math.cos(ELEVATION),
)
controls.enableDamping = true
controls.enablePan = false
controls.minDistance = 16
controls.maxDistance = 130
controls.maxPolarAngle = 1.45
controls.update()
controls.saveState()

function resize() {
  const aspect = innerWidth / innerHeight
  renderer.setSize(innerWidth, innerHeight, false)
  camera.aspect = aspect
  // Narrower windows widen the lens instead of cropping the board.
  camera.fov = 2 * THREE.MathUtils.radToDeg(Math.atan(Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * Math.max(1, DESIGN_ASPECT / aspect)))
  camera.setViewOffset(innerWidth, innerHeight, 0, LIFT * innerHeight, innerWidth, innerHeight)
}
addEventListener('resize', resize)
resize()

const train = resetTrain()
let night = false
let nightAmount = 0
let shownStatus = status.textContent

function syncPanel() {
  toggle.textContent = train.running ? '暂停' : '运行'
  toggle.setAttribute('aria-pressed', String(train.running))
  speed.value = train.factor
  speedValue.textContent = `${train.factor.toFixed(2)}×`
  dayNight.textContent = night ? '白天' : '夜晚'
  dayNight.setAttribute('aria-pressed', String(night))
}

toggle.addEventListener('click', () => {
  train.running = !train.running
  syncPanel()
})
speed.addEventListener('input', () => {
  train.factor = Number(speed.value)
  syncPanel()
})
dayNight.addEventListener('click', () => {
  night = !night
  syncPanel()
})
byId('reset').addEventListener('click', () => {
  resetTrain(train)
  // An undamped update flushes any leftover orbit inertia, so the camera lands exactly on the saved view.
  controls.enableDamping = false
  controls.update()
  controls.reset()
  controls.enableDamping = true
  syncPanel()
})
syncPanel()

// Handle for inspecting the train, camera and scene from the browser console.
window.__diorama = { train, camera, scene }

let last = performance.now()
renderer.setAnimationLoop((now) => {
  // Clamped so a tab that was hidden does not make the train jump.
  const dt = Math.min(0.1, (now - last) / 1000)
  last = now
  stepTrain(train, dt)
  placeTrain(train.s)
  const text = !train.running ? '已暂停' : train.dwell > 0 ? '到站停靠' : '行驶中'
  if (text !== shownStatus) status.textContent = shownStatus = text
  nightAmount += ((night ? 1 : 0) - nightAmount) * Math.min(1, dt * 4)
  setNight(nightAmount)
  waterMap.offset.y += dt * 0.02
  controls.update()
  renderer.render(scene, camera)
})
