import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { optionsNeedRebuild } from './options'
import type { SceneOptions } from './options'
import { applyTime, createResolvedTime, createSkyDome, sampleTime, timePhaseOf } from './sky'
import type { LightingRig } from './sky'
import { buildWorld } from './world'
import type { World } from './world'

export type ViewerStats = {
  fps: number
  voxels: number
  quads: number
  triangles: number
  drawCalls: number
  buildMs: number
  size: number
  seaLevel: number
  peakHeight: number
  trees: number
  waterFalls: number
  streams: number
  waterVoxels: number
  cloudVoxels: number
  plantVoxels: number
}

export type ViewerHandlers = {
  onStats(stats: ViewerStats): void
  onBusy(busy: boolean): void
}

export type ViewerHandle = {
  setOptions(next: SceneOptions): void
  resetView(): void
  dispose(): void
}

/** 几何重建的防抖时间：先让“正在生成”的提示有机会绘制出来。 */
const REBUILD_DELAY = 180
/** 用户拖动后多久恢复自动旋转。 */
const AUTO_ROTATE_RESUME = 4000

export function createViewer(
  container: HTMLElement,
  initial: SceneOptions,
  handlers: ViewerHandlers,
): ViewerHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = initial.shadows
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.domElement.className = 'scene-canvas'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const fog = new THREE.FogExp2(0xcfe1ef, initial.fogDensity)
  scene.fog = fog

  const camera = new THREE.PerspectiveCamera(50, 1, 1, 4000)
  camera.position.set(320, 190, 320)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = false
  controls.autoRotate = initial.autoRotate
  controls.autoRotateSpeed = initial.autoRotateSpeed
  controls.maxPolarAngle = THREE.MathUtils.degToRad(86)

  const sky = createSkyDome()
  scene.add(sky.mesh)

  const sun = new THREE.DirectionalLight(0xffffff, 1.4)
  sun.castShadow = initial.shadows
  sun.shadow.mapSize.set(initial.shadowMapSize, initial.shadowMapSize)
  sun.shadow.bias = -0.0002
  sun.shadow.normalBias = 0.08
  scene.add(sun)
  scene.add(sun.target)

  const hemi = new THREE.HemisphereLight(0xbdd7ff, 0x4c4a3a, 0.7)
  scene.add(hemi)

  const rig: LightingRig = { sun, hemi, fog, renderer, sky: sky.uniforms }
  const resolvedTime = createResolvedTime()

  let options: SceneOptions = { ...initial }
  let world: World | null = null
  let disposed = false
  let rebuildTimer: number | null = null
  let autoRotateTimer: number | null = null
  let rafId = 0
  let shadowMapSize = initial.shadowMapSize
  let cyclePhase = timePhaseOf(initial.timeOfDay)
  let cloudPhase = 0

  const clock = new THREE.Clock()
  let frames = 0
  let fpsElapsed = 0
  let fps = 0

  const sunDistance = (): number => {
    const size = world ? world.framing.size : 256
    return size * 2.4
  }

  const updateFocal = (): void => {
    if (!world || !world.mistUniforms) return
    const height = renderer.domElement.height
    const focal = (height * 0.5) / Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5)
    world.mistUniforms.uFocal.value = focal
  }

  const configureShadow = (): void => {
    if (!world) return
    const { size, maxY } = world.framing
    const extent = size * 0.78
    const shadowCamera = sun.shadow.camera
    shadowCamera.left = -extent
    shadowCamera.right = extent
    shadowCamera.top = extent
    shadowCamera.bottom = -extent
    shadowCamera.near = 1
    shadowCamera.far = Math.max(size * 3, maxY * 4)
    shadowCamera.updateProjectionMatrix()

    if (shadowMapSize !== options.shadowMapSize) {
      shadowMapSize = options.shadowMapSize
      sun.shadow.mapSize.set(shadowMapSize, shadowMapSize)
      if (sun.shadow.map) {
        sun.shadow.map.dispose()
        sun.shadow.map = null
      }
    }
  }

  const frameCamera = (): void => {
    if (!world) return
    const { size, centerY } = world.framing
    const distance = size * 1.42
    const elevation = THREE.MathUtils.degToRad(15)
    const azimuth = THREE.MathUtils.degToRad(38)
    const horizontal = Math.cos(elevation) * distance
    camera.position.set(
      horizontal * Math.sin(azimuth),
      centerY + Math.sin(elevation) * distance,
      horizontal * Math.cos(azimuth),
    )
    camera.near = 1
    camera.far = Math.max(2600, size * 8)
    camera.updateProjectionMatrix()
    controls.target.set(0, centerY, 0)
    controls.minDistance = size * 0.35
    controls.maxDistance = size * 3.2
    controls.update()
    // 天穹始终跟着相机，保证背景铺满整屏。
    sky.mesh.position.copy(camera.position)
    updateFocal()
  }

  const setShadowMode = (enabled: boolean): void => {
    renderer.shadowMap.enabled = enabled
    sun.castShadow = enabled
    if (world) {
      world.group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => {
            material.needsUpdate = true
          })
        }
      })
    }
  }

  const applyInstant = (): void => {
    fog.density = options.fogDensity
    controls.autoRotate = options.autoRotate
    controls.autoRotateSpeed = options.autoRotateSpeed
    if (world) {
      world.hazeMesh.visible = options.haze
      if (world.mistPoints) world.mistPoints.visible = options.mist
      if (world.mistUniforms) world.mistUniforms.uFogDensity.value = options.fogDensity
      configureShadow()
    }
  }

  const rebuild = (): void => {
    if (disposed) return
    if (world) {
      scene.remove(world.group)
      world.dispose()
      world = null
    }
    world = buildWorld(options)
    scene.add(world.group)
    frameCamera()
    configureShadow()
    setShadowMode(options.shadows)
    applyInstant()
    // 立刻出一帧：即使动画帧被浏览器节流，页面打开也已经能看到全貌。
    renderer.render(scene, camera)
    publishStats()
  }

  const handleResize = (): void => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width <= 0 || height <= 0) return
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    updateFocal()
  }

  const resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(container)
  handleResize()

  const pauseAutoRotate = (): void => {
    if (autoRotateTimer !== null) {
      window.clearTimeout(autoRotateTimer)
      autoRotateTimer = null
    }
    controls.autoRotate = false
  }

  const resumeAutoRotate = (): void => {
    if (autoRotateTimer !== null) window.clearTimeout(autoRotateTimer)
    autoRotateTimer = window.setTimeout(() => {
      autoRotateTimer = null
      controls.autoRotate = options.autoRotate
    }, AUTO_ROTATE_RESUME)
  }

  const canvas = renderer.domElement
  canvas.addEventListener('pointerdown', pauseAutoRotate)
  canvas.addEventListener('pointerup', resumeAutoRotate)
  canvas.addEventListener('wheel', resumeAutoRotate, { passive: true })

  const publishStats = (): void => {
    if (!world) return
    handlers.onStats({
      fps,
      voxels: world.stats.voxels,
      quads: world.stats.quads,
      triangles: world.stats.triangles,
      drawCalls: renderer.info.render.calls,
      buildMs: world.stats.buildMs,
      size: world.framing.size,
      seaLevel: world.framing.seaLevel,
      peakHeight: world.framing.peakHeight,
      trees: world.stats.trees,
      waterFalls: world.stats.waterFalls,
      streams: world.stats.streams,
      waterVoxels: world.stats.waterVoxels,
      cloudVoxels: world.stats.cloudVoxels,
      plantVoxels: world.stats.plantVoxels,
    })
  }

  const animate = (): void => {
    rafId = requestAnimationFrame(animate)
    const delta = Math.min(clock.getDelta(), 0.1)
    const elapsed = clock.elapsedTime

    if (options.dayCycle) {
      cyclePhase += delta * options.cycleSpeed
    } else {
      cyclePhase = timePhaseOf(options.timeOfDay)
    }
    sampleTime(cyclePhase, resolvedTime)
    applyTime(resolvedTime, rig, sunDistance())

    if (world) {
      const waterMap = world.waterMaterial.map
      if (waterMap) {
        waterMap.offset.y = (waterMap.offset.y + delta * options.waterFlowSpeed * 0.18) % 1
      }
      const seaMap = world.seaMaterial.map
      if (seaMap) {
        seaMap.offset.y = (seaMap.offset.y + delta * options.waterFlowSpeed * 0.035) % 1
      }
      world.seaMesh.position.y =
        world.framing.seaLevel - 0.06 + Math.sin(elapsed * 0.6) * 0.05

      // 云带绕着山体缓慢摆动：云始终缠在山腰，不会有漂走的空档。
      cloudPhase += delta * (0.08 + options.cloudDriftSpeed * 0.12)
      const block = Math.max(1, options.cloudBlock)
      const sway = Math.sin(cloudPhase) * options.cloudDriftSpeed * world.framing.size * 0.16
      world.cloudField.position.x = Math.round(sway / block) * block
      world.cloudField.position.z =
        Math.round(
          (Math.cos(cloudPhase * 0.75) * options.cloudDriftSpeed * world.framing.size * 0.05) / block,
        ) * block

      if (world.mistUniforms) {
        world.mistUniforms.uTime.value = elapsed
        world.mistUniforms.uFogDensity.value = options.fogDensity
      }
      world.hazeMaterial.color.copy(resolvedTime.fogColor)
      world.hazeMaterial.opacity = options.haze ? 0.09 : 0
      sky.mesh.position.copy(camera.position)
    }

    controls.update()
    renderer.render(scene, camera)

    frames += 1
    fpsElapsed += delta
    if (fpsElapsed >= 0.5) {
      fps = Math.round(frames / fpsElapsed)
      frames = 0
      fpsElapsed = 0
      publishStats()
    }
  }

  handlers.onBusy(true)
  rebuild()
  handlers.onBusy(false)
  // 首帧交给浏览器绘制后立刻启动循环，保证打开即见全貌。
  rafId = requestAnimationFrame(animate)

  return {
    setOptions(next: SceneOptions): void {
      const needsRebuild = world === null || optionsNeedRebuild(options, next)
      options = { ...next }
      if (needsRebuild) {
        handlers.onBusy(true)
        if (rebuildTimer !== null) window.clearTimeout(rebuildTimer)
        rebuildTimer = window.setTimeout(() => {
          rebuildTimer = null
          rebuild()
          handlers.onBusy(false)
        }, REBUILD_DELAY)
      } else {
        applyInstant()
      }
    },
    resetView(): void {
      frameCamera()
    },
    dispose(): void {
      if (disposed) return
      disposed = true
      if (rebuildTimer !== null) window.clearTimeout(rebuildTimer)
      if (autoRotateTimer !== null) window.clearTimeout(autoRotateTimer)
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', pauseAutoRotate)
      canvas.removeEventListener('pointerup', resumeAutoRotate)
      canvas.removeEventListener('wheel', resumeAutoRotate)
      controls.dispose()
      if (world) {
        scene.remove(world.group)
        world.dispose()
        world = null
      }
      sky.mesh.geometry.dispose()
      ;(sky.mesh.material as THREE.Material).dispose()
      renderer.dispose()
      if (canvas.parentNode === container) container.removeChild(canvas)
    },
  }
}
