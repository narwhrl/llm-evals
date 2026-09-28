// 场景组装：渲染器与相机、地形/水/植被/云的构建与重建、动画循环、对外选项 API。
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  generateHeightfield,
  traceWaterways,
  collectSources,
  buildTerrainMesh,
} from './terrain.js'
import { createWater } from './water.js'
import { createClouds } from './clouds.js'
import { createVegetation } from './vegetation.js'
import { createEnvironment, PRESETS } from './environment.js'

export const DEFAULT_OPTIONS = {
  preset: 'dusk',
  cloudHeight: 32,
  cloudCoverage: 0.6,
  waterSpeed: 1,
  waterfallCount: 3,
  treeDensity: 0.7,
  seed: 20260928,
  autoRotate: true,
  shadows: true,
}

export function createScene(container, options, callbacks = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const { onStats, onAutoRotateChange } = callbacks

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(container.clientWidth || 1280, container.clientHeight || 720)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.domElement.style.display = 'block'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, (container.clientWidth || 1280) / (container.clientHeight || 720), 0.5, 2200)
  const HOME = { pos: new THREE.Vector3(112, 64, 196), target: new THREE.Vector3(0, 20, 0) }
  camera.position.copy(HOME.pos)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(HOME.target)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.autoRotate = opts.autoRotate
  controls.autoRotateSpeed = 0.5
  controls.minDistance = 60
  controls.maxDistance = 380
  controls.maxPolarAngle = 1.48
  controls.update()
  controls.addEventListener('start', () => {
    if (controls.autoRotate) {
      controls.autoRotate = false
      opts.autoRotate = false
      onAutoRotateChange?.(false)
    }
  })

  const env = createEnvironment(scene)
  env.applyTarget(PRESETS[opts.preset] || PRESETS.dusk, true)

  let terrainMesh = null
  let water = null
  let veg = null
  let clouds = null
  let lastTraced = null
  let counts = { voxels: 0, trees: 0, water: 0 }

  function disposeWorld() {
    if (terrainMesh) {
      scene.remove(terrainMesh)
      terrainMesh.geometry.dispose()
      terrainMesh.material.dispose()
      terrainMesh = null
    }
    if (water) {
      scene.remove(water.group)
      water.dispose()
      water = null
    }
    if (veg) {
      scene.remove(veg.group)
      veg.dispose()
      veg = null
    }
    if (clouds) {
      scene.remove(clouds.group)
      clouds.dispose()
      clouds = null
    }
  }

  function renderOnce() {
    renderer.render(scene, camera)
  }

  function rebuildWorld(newSeed) {
    if (newSeed) opts.seed = newSeed
    disposeWorld()
    const hf = generateHeightfield(opts.seed)
    lastTraced = traceWaterways(hf.T, collectSources(hf, opts.waterfallCount), opts.seed)

    const t = buildTerrainMesh(lastTraced.T, lastTraced.waterMask)
    terrainMesh = t.mesh
    scene.add(terrainMesh)

    water = createWater(lastTraced.paths, lastTraced.waterMask)
    water.setSpeed(opts.waterSpeed)
    water.setTint(env.currentTint)
    scene.add(water.group)

    veg = createVegetation(lastTraced.T, lastTraced.waterMask, opts.treeDensity)
    scene.add(veg.group)

    const mistPoints = []
    for (const p of lastTraced.paths) {
      for (const pl of p.plunges) {
        if (pl.drop >= 4) mistPoints.push(pl)
      }
    }
    clouds = createClouds(mistPoints)
    clouds.setCloudHeight(opts.cloudHeight)
    clouds.setCoverage(opts.cloudCoverage)
    scene.add(clouds.group)

    counts = { voxels: t.instanceCount, trees: veg.treeCount, water: water.waterCellCount }
    onStats?.({ fps: null, ...counts })
    renderOnce()
  }

  function rebuildVegetation() {
    if (!lastTraced) return
    if (veg) {
      scene.remove(veg.group)
      veg.dispose()
    }
    veg = createVegetation(lastTraced.T, lastTraced.waterMask, opts.treeDensity)
    scene.add(veg.group)
    counts.trees = veg.treeCount
    renderOnce()
  }

  rebuildWorld()

  const clock = new THREE.Clock()
  let raf = 0
  let fpsEMA = 60
  let statTimer = 0
  const tick = () => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(clock.getDelta(), 0.05)
    if (water) water.update(dt)
    if (clouds) clouds.update(dt)
    env.update(dt)
    controls.update()
    renderer.render(scene, camera)
    if (dt > 0) fpsEMA += (1 / dt - fpsEMA) * 0.05
    statTimer += dt
    if (statTimer > 0.5) {
      statTimer = 0
      onStats?.({ fps: Math.round(fpsEMA), ...counts })
    }
  }
  tick()

  const ro = new ResizeObserver(() => {
    const w = container.clientWidth
    const h = container.clientHeight
    if (w === 0 || h === 0) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    renderOnce()
  })
  ro.observe(container)

  return {
    setPreset(name) {
      if (PRESETS[name]) env.applyTarget(PRESETS[name], false)
    },
    setCloudHeight(v) {
      opts.cloudHeight = v
      clouds?.setCloudHeight(v)
    },
    setCloudCoverage(v) {
      opts.cloudCoverage = v
      clouds?.setCoverage(v)
    },
    setWaterSpeed(v) {
      opts.waterSpeed = v
      water?.setSpeed(v)
    },
    setWaterfallCount(n) {
      opts.waterfallCount = n
      rebuildWorld()
    },
    setTreeDensity(v) {
      opts.treeDensity = v
      rebuildVegetation()
    },
    regenerate() {
      rebuildWorld(Math.floor(Math.random() * 1e9))
    },
    setAutoRotate(v) {
      opts.autoRotate = v
      controls.autoRotate = v
    },
    resetView() {
      camera.position.copy(HOME.pos)
      controls.target.copy(HOME.target)
      controls.update()
    },
    setShadows(v) {
      env.sun.castShadow = v
    },
    dispose() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      disposeWorld()
      env.dispose()
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    },
  }
}
