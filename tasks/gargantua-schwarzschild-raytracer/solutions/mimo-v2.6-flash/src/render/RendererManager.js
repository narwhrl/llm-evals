// RendererManager — owns every GPU resource and the animation loop.
//
// React never drives the frame loop: this plain module holds the WebGLRenderer,
// the post-processing chain and the OrbitControls instance, reads the mutable
// store directly each frame, and publishes camera changes back into the store.
//
// Pipeline:  RenderPass(full-screen geodesic shader) -> UnrealBloomPass -> final
// ShaderPass (chromatic aberration, exposure, ACES, vignette, grain, sRGB).

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

import vertexSource from './shaders/raytracer.vert.glsl?raw'
import raytracerSource from './shaders/raytracer.frag.glsl?raw'
import finalSource from './shaders/final.frag.glsl?raw'

import {
  QUALITY_TIERS,
  getApp,
  getParams,
  runtime,
  setContextLost,
  syncCameraParams,
  takeManualControl,
} from '../state/store.js'
import { markReady } from '../state/bridge.js'

const TAU = Math.PI * 2
const CAMERA_EPSILON = { angle: 1e-4, distance: 2e-3, fov: 1e-3 }

// Spherical (azimuth, elevation, distance) -> cartesian, target at the origin.
function sphericalToCartesian(distance, azimuth, elevation) {
  const cosElevation = Math.cos(elevation)
  return new THREE.Vector3(
    distance * cosElevation * Math.sin(azimuth),
    distance * Math.sin(elevation),
    distance * cosElevation * Math.cos(azimuth),
  )
}

export class RendererManager {
  constructor(canvas) {
    this.canvas = canvas
    this.running = false
    this.disposed = false
    this.rafId = null
    this.lastFrameMs = 0
    this.firstFrameDone = false

    this.cinemaTime = 0
    this.cinemaBase = null
    this.cinemaWasPlaying = false

    this.appliedCamera = { fov: 0, dist: 0, azimuth: 0, elevation: 0 }
    this.lastSize = { width: 0, height: 0, pixelRatio: 0 }
    this.lastQuality = null

    // Scratch vectors reused every frame (no per-frame allocation).
    this._right = new THREE.Vector3()
    this._up = new THREE.Vector3()
    this._forward = new THREE.Vector3()

    this._buildRenderer()
    this._buildScene()
    this._buildPipeline()
    this._buildControls()
    this._bindEvents()
    this.applyQuality(true)
    this._pushCameraFromParams()
  }

  // -------------------------------------------------------------------------
  // Construction
  // -------------------------------------------------------------------------
  _buildRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false, // the image is post-processed; MSAA would only cost
      alpha: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    this.renderer.toneMapping = THREE.NoToneMapping // ACES lives in the final pass
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.autoClear = true
    this.gl = this.renderer.getContext()
  }

  _buildScene() {
    this.scene = new THREE.Scene()

    // Only purpose of this geometry is to fill the viewport: every scene pixel is
    // evaluated by the fragment shader from the camera-uniform-derived ray.
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uCamPos: { value: new THREE.Vector3(0, 0, 24) },
        uCamBasis: { value: new THREE.Matrix3() },
        uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(55) * 0.5) },
        uTime: { value: 0 },
        uDebug: { value: 0 },
        uMaxSteps: { value: 320 },
        uStepScale: { value: 1.0 },
        uDiskInner: { value: 6 },
        uDiskOuter: { value: 18 },
        uDiskThickness: { value: 0.5 },
        uDiskTemp: { value: 7200 },
        uDiskIntensity: { value: 1.4 },
        uOrbitSpeed: { value: 1.0 },
        uTurbAmp: { value: 0.55 },
        uTurbSpeed: { value: 1.0 },
        uStarDensity: { value: 1.0 },
        uGalaxyBrightness: { value: 0.9 },
      },
      vertexShader: vertexSource,
      fragmentShader: raytracerSource,
      depthTest: false,
      depthWrite: false,
    })

    this.quadGeometry = new THREE.PlaneGeometry(2, 2)
    this.quad = new THREE.Mesh(this.quadGeometry, this.material)
    this.quad.frustumCulled = false
    this.scene.add(this.quad)

    // Orthographic camera used only to issue the full-screen draw call.
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
  }

  _buildPipeline() {
    if (this.composer) this._disposePipeline()

    this.composer = new EffectComposer(this.renderer) // half-float HDR targets

    this.renderPass = new RenderPass(this.scene, this.quadCamera)
    this.composer.addPass(this.renderPass)

    const params = getParams()
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), params.bloomStrength, 0.5, params.bloomThreshold)
    this.composer.addPass(this.bloomPass)

    this.finalPass = new ShaderPass({
      name: 'GargantuaFinalPass',
      uniforms: {
        tDiffuse: { value: null },
        uExposure: { value: 1.15 },
        uVignette: { value: 0.35 },
        uGrain: { value: 0.06 },
        uChromatic: { value: 0.15 },
        uTime: { value: 0 },
        uDebug: { value: 0 },
      },
      vertexShader: vertexSource,
      fragmentShader: finalSource,
    })
    this.finalPass.renderToScreen = true
    this.composer.addPass(this.finalPass)
  }

  _disposePipeline() {
    if (!this.composer) return
    for (const pass of this.composer.passes) {
      if (typeof pass.dispose === 'function') pass.dispose()
    }
    if (typeof this.composer.dispose === 'function') this.composer.dispose()
    this.composer = null
    this.bloomPass = null
    this.finalPass = null
    this.renderPass = null
  }

  _buildControls() {
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 4000)
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.target.set(0, 0, 0)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.075
    this.controls.enablePan = false
    this.controls.minDistance = 5
    this.controls.maxDistance = 90
    this.controls.rotateSpeed = 0.85
    this.controls.zoomSpeed = 0.9
    this.canvas.style.touchAction = 'none'
  }

  _bindEvents() {
    this._onResize = () => this.applyQuality()
    window.addEventListener('resize', this._onResize)
    window.addEventListener('orientationchange', this._onResize)

    // Any manual interaction permanently hands the camera to the user.
    this._onUserInput = () => {
      takeManualControl()
    }
    this.canvas.addEventListener('pointerdown', this._onUserInput)
    this.canvas.addEventListener('wheel', this._onUserInput, { passive: true })
    this.canvas.addEventListener('touchstart', this._onUserInput, { passive: true })

    this._onContextLost = (event) => {
      event.preventDefault()
      this.stop()
      setContextLost(true)
    }
    this._onContextRestored = () => {
      // Rebuild on the next frame so three.js has finished re-initialising its
      // own GL state (it listens to the same event).
      requestAnimationFrame(() => this._rebuildAfterContextRestore())
    }
    this.canvas.addEventListener('webglcontextlost', this._onContextLost, false)
    this.canvas.addEventListener('webglcontextrestored', this._onContextRestored, false)
  }

  // -------------------------------------------------------------------------
  // Sizing / quality
  // -------------------------------------------------------------------------
  applyQuality(force = false) {
    const app = getApp()
    const tier = QUALITY_TIERS[app.quality] || QUALITY_TIERS.high
    const width = Math.max(1, this.canvas.clientWidth || window.innerWidth)
    const height = Math.max(1, this.canvas.clientHeight || window.innerHeight)
    const devicePixelRatio = window.devicePixelRatio || 1
    const pixelRatio = Math.min(devicePixelRatio, tier.dprCap) * tier.renderScale

    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(width, height, false)
    this.composer.setPixelRatio(pixelRatio)
    this.composer.setSize(width, height)
    this.bloomPass.setSize(Math.max(1, width * tier.bloomFactor), Math.max(1, height * tier.bloomFactor))

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.lastSize = { width, height, pixelRatio }
    this.lastQuality = tier.key
    if (force) this.lastFrameMs = 0
  }

  // -------------------------------------------------------------------------
  // Camera <-> store two-way sync
  // -------------------------------------------------------------------------
  _pushCameraFromParams() {
    const p = getParams()
    this.camera.position.copy(sphericalToCartesian(p.camDistance, p.camAzimuth, p.camElevation))
    this.camera.fov = p.fov
    this.camera.updateProjectionMatrix()
    this.camera.lookAt(this.controls.target)
    this.appliedCamera = { fov: p.fov, dist: p.camDistance, azimuth: p.camAzimuth, elevation: p.camElevation }
  }

  _syncCamera() {
    const p = getParams()
    const a = this.appliedCamera
    const paramsChanged =
      Math.abs(p.fov - a.fov) > 1e-6 ||
      Math.abs(p.camDistance - a.dist) > 1e-6 ||
      Math.abs(p.camAzimuth - a.azimuth) > 1e-6 ||
      Math.abs(p.camElevation - a.elevation) > 1e-6

    if (paramsChanged) {
      this._pushCameraFromParams()
      return
    }

    // No parameter change: OrbitControls may have moved the camera itself
    // (drag, wheel, pinch). Publish that back into the store.
    const position = this.camera.position
    const distance = position.length()
    if (distance < 1e-4) return
    const elevation = Math.asin(THREE.MathUtils.clamp(position.y / distance, -1, 1))
    let azimuth = Math.atan2(position.x, position.z)
    if (azimuth < 0) azimuth += TAU
    const fov = this.camera.fov

    const moved =
      Math.abs(azimuth - p.camAzimuth) > CAMERA_EPSILON.angle ||
      Math.abs(elevation - p.camElevation) > CAMERA_EPSILON.angle ||
      Math.abs(distance - p.camDistance) > CAMERA_EPSILON.distance ||
      Math.abs(fov - p.fov) > CAMERA_EPSILON.fov

    if (moved) {
      syncCameraParams(fov, distance, azimuth, elevation)
      this.appliedCamera = { fov, dist: distance, azimuth, elevation }
    }
  }

  // -------------------------------------------------------------------------
  // Cinematic loop
  // -------------------------------------------------------------------------
  _stepCinema(delta) {
    const app = getApp()
    const p = getParams()
    const playing = app.cinemaPlaying && !app.userHasTakenControl && !runtime.captureActive

    if (playing && !this.cinemaWasPlaying) {
      this.cinemaTime = 0
      this.cinemaBase = { azimuth: p.camAzimuth, elevation: p.camElevation, distance: p.camDistance }
    }
    this.cinemaWasPlaying = playing
    if (!playing) return

    const base = this.cinemaBase || { azimuth: p.camAzimuth, elevation: p.camElevation, distance: p.camDistance }
    this.cinemaTime += delta

    const azimuth = (base.azimuth + this.cinemaTime * 0.12) % TAU
    const elevation = THREE.MathUtils.clamp(base.elevation + 0.18 * Math.sin(this.cinemaTime * 0.25), -1.35, 1.35)
    const distance = THREE.MathUtils.clamp(base.distance * (1 + 0.08 * Math.sin(this.cinemaTime * 0.17)), 8, 80)

    syncCameraParams(p.fov, distance, azimuth < 0 ? azimuth + TAU : azimuth, elevation)
  }

  // -------------------------------------------------------------------------
  // Frame loop
  // -------------------------------------------------------------------------
  start() {
    if (this.running || this.disposed) return
    this.running = true
    this.lastFrameMs = 0
    this._render(0, true)
    this.rafId = requestAnimationFrame(this._tick)
  }

  stop() {
    this.running = false
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  dispose() {
    this.disposed = true
    this.stop()
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('orientationchange', this._onResize)
    this.canvas.removeEventListener('pointerdown', this._onUserInput)
    this.canvas.removeEventListener('wheel', this._onUserInput)
    this.canvas.removeEventListener('touchstart', this._onUserInput)
    this.canvas.removeEventListener('webglcontextlost', this._onContextLost)
    this.canvas.removeEventListener('webglcontextrestored', this._onContextRestored)
    this.controls.dispose()
    this._disposePipeline()
    this.quadGeometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }

  _tick = (nowMs) => {
    if (!this.running) return
    this.rafId = requestAnimationFrame(this._tick)
    const delta = this.lastFrameMs === 0 ? 1 / 60 : Math.min((nowMs - this.lastFrameMs) / 1000, 0.1)
    this.lastFrameMs = nowMs
    this._render(delta, false)
  }

  _rebuildAfterContextRestore() {
    if (this.disposed) return
    // The previous GL objects died with the lost context, so they are dropped
    // rather than disposed (deleting them would only raise INVALID_OPERATION on
    // the restored context). Fresh render targets and programs are built instead.
    this.composer = null
    this.bloomPass = null
    this.finalPass = null
    this.renderPass = null
    this._buildPipeline()
    this.material.needsUpdate = true
    this.applyQuality(true)
    this._pushCameraFromParams()
    setContextLost(false)
    this.start()
  }

  _render(delta, firstFrame) {
    const app = getApp()
    const p = getParams()
    const tier = QUALITY_TIERS[app.quality] || QUALITY_TIERS.high

    if (this.lastQuality !== tier.key) this.applyQuality();

    // --- simulated time -----------------------------------------------------
    if (runtime.captureActive) {
      runtime.time = runtime.captureTime
    } else if (!firstFrame) {
      runtime.time += delta * p.timeScale
    }
    runtime.frame += 1

    // --- camera ownership ---------------------------------------------------
    if (!firstFrame) this._stepCinema(delta)
    this._syncCamera()
    this.controls.update()
    this.camera.updateMatrixWorld()

    // --- shader uniforms ----------------------------------------------------
    const width = this.lastSize.width * this.lastSize.pixelRatio
    const height = this.lastSize.height * this.lastSize.pixelRatio
    const uniforms = this.material.uniforms
    uniforms.uResolution.value.set(width, height)
    uniforms.uCamPos.value.copy(this.camera.position)

    const right = this._right.setFromMatrixColumn(this.camera.matrixWorld, 0)
    const up = this._up.setFromMatrixColumn(this.camera.matrixWorld, 1)
    const forward = this._forward.setFromMatrixColumn(this.camera.matrixWorld, 2).negate()
    uniforms.uCamBasis.value.set(
      right.x, up.x, forward.x,
      right.y, up.y, forward.y,
      right.z, up.z, forward.z,
    )
    uniforms.uTanHalfFov.value = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) * 0.5)
    uniforms.uTime.value = runtime.time
    uniforms.uDebug.value = app.debug
    uniforms.uMaxSteps.value = tier.maxSteps
    uniforms.uStepScale.value = tier.stepScale
    uniforms.uDiskInner.value = p.diskInner
    uniforms.uDiskOuter.value = p.diskOuter
    uniforms.uDiskThickness.value = p.diskThickness
    uniforms.uDiskTemp.value = p.diskTemp
    uniforms.uDiskIntensity.value = p.diskIntensity
    uniforms.uOrbitSpeed.value = p.orbitSpeedMul
    uniforms.uTurbAmp.value = p.turbAmp
    uniforms.uTurbSpeed.value = p.turbSpeed
    uniforms.uStarDensity.value = p.starDensity
    uniforms.uGalaxyBrightness.value = p.galaxyBrightness

    // --- post processing ----------------------------------------------------
    const debugActive = app.debug !== 0
    this.bloomPass.strength = debugActive ? 0 : p.bloomStrength
    this.bloomPass.threshold = p.bloomThreshold

    const finalUniforms = this.finalPass.uniforms
    finalUniforms.uExposure.value = p.exposure
    finalUniforms.uVignette.value = p.vignette
    finalUniforms.uGrain.value = p.grain
    finalUniforms.uChromatic.value = p.chromatic
    finalUniforms.uTime.value = runtime.time
    finalUniforms.uDebug.value = app.debug

    this.composer.render(delta)

    if (!this.firstFrameDone) {
      this.firstFrameDone = true
      // "Ready" means the shader actually compiled and the first composed frame
      // was drawn without a GL error — that is what the capture contract
      // promises, so a broken program must not advertise itself as ready.
      if (this._verifyShaderCompilation()) markReady()
    }
  }

  _verifyShaderCompilation() {
    const glError = this.gl.getError()
    if (glError !== 0) {
      console.error(`[gargantua] WebGL reported error code ${glError} on the first frame`)
    }
    const programs = (this.renderer.info && this.renderer.info.programs) || []
    const broken = programs.filter((program) => program.diagnostics)
    if (broken.length > 0) {
      console.error('[gargantua] shader compilation failed', broken.map((program) => program.diagnostics))
    }
    return glError === 0 && broken.length === 0
  }
}
