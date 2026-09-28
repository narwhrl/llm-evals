/**
 * The render engine: owns the WebGL renderer, the real camera and OrbitControls, the full-screen
 * geodesic pass, and the bloom/grade chain.
 *
 * The engine is the only place that talks to WebGL. It is deliberately framework-free so the React
 * layer can stay a pure view of the store, and so the lifecycle rules that matter — resizing,
 * device-pixel-ratio handling, quality-tier rebuilds and WebGL context loss — live in one file.
 *
 * Camera contract: a real THREE.PerspectiveCamera is driven by a real OrbitControls, and the
 * shader receives `camera.matrixWorld` plus the tangent of half the vertical FOV. Dragging, wheel
 * zoom, pinch and `lookAt` therefore change the lensed image through exactly the same path a mesh
 * renderer would use.
 */
import {
  AdditiveBlending,
  ClampToEdgeWrapping,
  HalfFloatType,
  LinearFilter,
  NoToneMapping,
  PerspectiveCamera,
  RGBAFormat,
  Spherical,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { MAX_RENDER_PIXELS, QUALITY_TIERS } from '../state/schema.js'
import { createPassScene, createShaderMaterial } from './FullscreenPass.js'
import { SCENE_FRAGMENT_GLSL, SCENE_VERTEX_GLSL } from '../shaders/scene.glsl.js'
import {
  BRIGHT_PASS_FRAGMENT_GLSL,
  COMPOSITE_FRAGMENT_GLSL,
  DOWNSAMPLE_FRAGMENT_GLSL,
  FULLSCREEN_VERTEX_GLSL,
  UPSAMPLE_FRAGMENT_GLSL,
} from '../shaders/post.glsl.js'

const DEG = Math.PI / 180
const RAD = 180 / Math.PI

export class Engine {
  constructor(canvas, { onStateChange, onReady, onContextChange } = {}) {
    this.canvas = canvas
    this.onStateChange = onStateChange || (() => {})
    this.onReady = onReady || (() => {})
    this.onContextChange = onContextChange || (() => {})

    this.state = null
    this.ready = false
    this.contextLost = false
    this.disposed = false
    this.elapsed = 0
    this.cinematicPhase = 0
    this.cinematicBase = null
    this.lastFrameTime = 0
    this.lastCameraSync = 0
    this.frames = 0
    this.fps = 0
    this.fpsAccumulator = 0
    this.lastSize = { width: 0, height: 0, renderWidth: 0, renderHeight: 0, dpr: 1 }

    this.renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    })
    this.renderer.autoClear = false
    this.renderer.toneMapping = NoToneMapping
    this.renderer.setClearColor(0x000000, 1)

    const pass = createPassScene()
    this.passScene = pass.scene
    this.passCamera = pass.camera
    this.passMesh = pass.mesh

    this.camera = new PerspectiveCamera(42, 1, 0.01, 4000)
    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.target.set(0, 0, 0)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.075
    this.controls.rotateSpeed = 0.85
    this.controls.zoomSpeed = 0.9
    this.controls.enablePan = false
    this.controls.minDistance = 2.2
    this.controls.maxDistance = 90
    this.controls.minPolarAngle = 2 * DEG
    this.controls.maxPolarAngle = Math.PI - 2 * DEG

    this.sceneMaterial = createShaderMaterial({
      name: 'gargantua-scene',
      vertexShader: SCENE_VERTEX_GLSL,
      fragmentShader: SCENE_FRAGMENT_GLSL,
      uniforms: {
        uCameraMatrix: { value: this.camera.matrixWorld },
        uResolution: { value: new Vector2(1, 1) },
        uTanHalfFov: { value: Math.tan(42 * 0.5 * DEG) },
        uAspect: { value: 1 },
        uTime: { value: 0 },

        uMaxSteps: { value: 200 },
        uMaxCrossings: { value: 3 },
        uStepScale: { value: 1.7 },
        uTurbulenceOctaves: { value: 3 },
        uSkyOctaves: { value: 3 },

        uDiskInner: { value: 3 },
        uDiskOuter: { value: 15 },
        uDiskThickness: { value: 0.16 },
        uDiskTemperature: { value: 8000 },
        uDiskEmission: { value: 1 },
        uDiskOpacity: { value: 0.85 },
        uOrbitalSpeed: { value: 1 },
        uTurbulenceAmplitude: { value: 0.6 },
        uTurbulenceSpeed: { value: 1 },

        uStarDensity: { value: 0.9 },
        uGalaxyBrightness: { value: 0.6 },

        uDebugMode: { value: 0 },
      },
    })

    this.brightMaterial = createShaderMaterial({
      name: 'gargantua-bright',
      vertexShader: FULLSCREEN_VERTEX_GLSL,
      fragmentShader: BRIGHT_PASS_FRAGMENT_GLSL,
      uniforms: {
        uSource: { value: null },
        uTexelSize: { value: new Vector2() },
        uThreshold: { value: 1.15 },
        uKnee: { value: 0.6 },
      },
    })

    this.downsampleMaterial = createShaderMaterial({
      name: 'gargantua-downsample',
      vertexShader: FULLSCREEN_VERTEX_GLSL,
      fragmentShader: DOWNSAMPLE_FRAGMENT_GLSL,
      uniforms: {
        uSource: { value: null },
        uTexelSize: { value: new Vector2() },
      },
    })

    this.upsampleMaterial = createShaderMaterial({
      name: 'gargantua-upsample',
      vertexShader: FULLSCREEN_VERTEX_GLSL,
      fragmentShader: UPSAMPLE_FRAGMENT_GLSL,
      uniforms: {
        uSource: { value: null },
        uTexelSize: { value: new Vector2() },
        uRadius: { value: 1 },
      },
    })
    this.upsampleMaterial.blending = AdditiveBlending
    this.upsampleMaterial.transparent = true

    this.compositeMaterial = createShaderMaterial({
      name: 'gargantua-composite',
      vertexShader: FULLSCREEN_VERTEX_GLSL,
      fragmentShader: COMPOSITE_FRAGMENT_GLSL,
      uniforms: {
        uSource: { value: null },
        uBloom: { value: null },
        uTexelSize: { value: new Vector2() },
        uExposure: { value: 1.1 },
        uBloomStrength: { value: 0.5 },
        uVignette: { value: 0.42 },
        uFilmGrain: { value: 0.16 },
        uChromaticAberration: { value: 0.22 },
        uGrainSeed: { value: 0 },
        uDebugMode: { value: 0 },
      },
    })

    this.materials = [
      this.sceneMaterial,
      this.brightMaterial,
      this.downsampleMaterial,
      this.upsampleMaterial,
      this.compositeMaterial,
    ]

    this.hdrTarget = null
    this.bloomTargets = []
    this.tier = QUALITY_TIERS.standard

    this.handleContextLost = this.handleContextLost.bind(this)
    this.handleContextRestored = this.handleContextRestored.bind(this)
    this.handleControlStart = this.handleControlStart.bind(this)
    canvas.addEventListener('webglcontextlost', this.handleContextLost, false)
    canvas.addEventListener('webglcontextrestored', this.handleContextRestored, false)
    this.controls.addEventListener('start', this.handleControlStart)
  }

  // -- lifecycle -------------------------------------------------------------------------------

  handleControlStart() {
    // A manual gesture takes over: the cinematic loop yields and never reclaims control.
    if (this.state && this.state.cinematic) this.onStateChange({ cinematic: false })
  }

  handleContextLost(event) {
    // preventDefault is what makes the browser attempt a restore instead of discarding the context.
    event.preventDefault()
    this.contextLost = true
    if (this.raf !== undefined) {
      cancelAnimationFrame(this.raf)
      this.raf = undefined
    }
    this.onContextChange('lost')
  }

  handleContextRestored() {
    // Rebuild everything the context owned. three re-uploads geometries and textures lazily, but the
    // render targets and their attachments were destroyed with the old context and must be recreated.
    this.disposeTargets()
    this.contextLost = false
    this.lastSize = { width: 0, height: 0, renderWidth: 0, renderHeight: 0, dpr: 1 }
    for (const material of this.materials) material.needsUpdate = true
    this.resize()
    this.applyState()
    this.onContextChange('restored')
    this.lastFrameTime = 0
    if (!this.disposed) this.start()
  }

  disposeTargets() {
    if (this.hdrTarget) {
      this.hdrTarget.dispose()
      this.hdrTarget = null
    }
    for (const target of this.bloomTargets) target.dispose()
    this.bloomTargets = []
  }

  dispose() {
    this.disposed = true
    if (this.raf !== undefined) cancelAnimationFrame(this.raf)
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost)
    this.canvas.removeEventListener('webglcontextrestored', this.handleContextRestored)
    this.controls.removeEventListener('start', this.handleControlStart)
    this.controls.dispose()
    this.disposeTargets()
    this.passMesh.geometry.dispose()
    for (const material of this.materials) material.dispose()
    this.renderer.dispose()
  }

  // -- state -----------------------------------------------------------------------------------

  /** Receives every store change; decides what actually needs to be re-derived. */
  setState(state) {
    const previous = this.state
    this.state = state
    const qualityChanged = !previous || previous.quality !== state.quality
    if (qualityChanged) {
      this.tier = QUALITY_TIERS[state.quality] || QUALITY_TIERS.standard
      this.resize()
    }
    const cinematicStarted = (!previous || !previous.cinematic) && state.cinematic
    if (cinematicStarted) this.captureCinematicBase()
    this.applyState()
  }

  notifyStateChange(patch) {
    this.onStateChange(patch)
  }

  captureCinematicBase() {
    this.cinematicPhase = 0
    this.cinematicBase = {
      azimuth: this.state.params.camAzimuth,
      elevation: this.state.params.camElevation,
      distance: this.state.params.camDistance,
    }
  }

  applyState() {
    if (!this.state) return
    const { params, debug, capture } = this.state
    const u = this.sceneMaterial.uniforms

    u.uDiskInner.value = params.diskInner
    u.uDiskOuter.value = params.diskOuter
    u.uDiskThickness.value = params.diskThickness
    u.uDiskTemperature.value = params.diskTemperature
    u.uDiskEmission.value = params.diskEmission
    u.uDiskOpacity.value = params.diskOpacity
    u.uOrbitalSpeed.value = params.orbitalSpeed
    u.uTurbulenceAmplitude.value = params.turbulenceAmplitude
    u.uTurbulenceSpeed.value = params.turbulenceSpeed
    u.uStarDensity.value = params.starDensity
    u.uGalaxyBrightness.value = params.galaxyBrightness

    u.uMaxSteps.value = this.tier.maxSteps
    u.uMaxCrossings.value = this.tier.maxCrossings
    u.uStepScale.value = this.tier.stepScale
    u.uTurbulenceOctaves.value = this.tier.turbulenceOctaves
    u.uSkyOctaves.value = this.tier.skyOctaves
    u.uDebugMode.value = debug

    const c = this.compositeMaterial.uniforms
    c.uExposure.value = params.exposure
    c.uBloomStrength.value = params.bloomStrength
    c.uVignette.value = params.vignette
    c.uFilmGrain.value = params.filmGrain
    c.uChromaticAberration.value = params.chromaticAberration
    c.uDebugMode.value = debug

    this.brightMaterial.uniforms.uThreshold.value = params.bloomThreshold
    this.brightMaterial.uniforms.uKnee.value = Math.max(0.05, params.bloomThreshold * 0.5)
    this.upsampleMaterial.uniforms.uRadius.value = this.tier.bloomRadius

    if (this.camera.fov !== params.fov) {
      this.camera.fov = params.fov
      this.camera.updateProjectionMatrix()
    }
    this.sceneMaterial.uniforms.uTanHalfFov.value = Math.tan(params.fov * 0.5 * DEG)

    // In capture mode the camera is whatever the URL and the parameters say; the loop is off.
    if (!this.state.cinematic || capture) this.applyCameraFromParams()
  }

  applyCameraFromParams() {
    const { camDistance, camAzimuth, camElevation } = this.state.params
    const spherical = new Spherical(camDistance, (90 - camElevation) * DEG, camAzimuth * DEG)
    this.camera.position.setFromSpherical(spherical)
    this.controls.update()
    this.camera.updateMatrixWorld(true)
  }

  setCinematicBaseFromCamera() {
    const spherical = new Spherical().setFromVector3(this.camera.position)
    this.cinematicBase = {
      azimuth: spherical.theta * RAD,
      elevation: 90 - spherical.phi * RAD,
      distance: spherical.radius,
    }
    this.cinematicPhase = 0
  }

  // -- sizing ----------------------------------------------------------------------------------

  resize() {
    if (this.contextLost) return
    const tier = this.tier
    const rect = this.canvas.getBoundingClientRect()
    const cssWidth = Math.max(1, Math.round(rect.width || this.canvas.clientWidth || 1))
    const cssHeight = Math.max(1, Math.round(rect.height || this.canvas.clientHeight || 1))

    const rawDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    const dpr = Math.max(0.5, Math.min(rawDpr, tier.dprCap))

    const outputWidth = Math.max(1, Math.round(cssWidth * dpr))
    const outputHeight = Math.max(1, Math.round(cssHeight * dpr))

    let renderWidth = Math.max(32, Math.round(outputWidth * tier.renderScale))
    let renderHeight = Math.max(32, Math.round(outputHeight * tier.renderScale))
    const pixels = renderWidth * renderHeight
    if (pixels > MAX_RENDER_PIXELS) {
      const scale = Math.sqrt(MAX_RENDER_PIXELS / pixels)
      renderWidth = Math.max(32, Math.floor(renderWidth * scale))
      renderHeight = Math.max(32, Math.floor(renderHeight * scale))
    }

    const unchanged =
      this.lastSize.cssWidth === cssWidth &&
      this.lastSize.cssHeight === cssHeight &&
      this.lastSize.renderWidth === renderWidth &&
      this.lastSize.renderHeight === renderHeight &&
      this.lastSize.dpr === dpr
    if (unchanged && this.hdrTarget) return

    this.lastSize = { cssWidth, cssHeight, renderWidth, renderHeight, dpr, outputWidth, outputHeight }

    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(cssWidth, cssHeight, false)

    this.camera.aspect = cssWidth / cssHeight
    this.camera.updateProjectionMatrix()
    this.sceneMaterial.uniforms.uAspect.value = this.camera.aspect
    this.sceneMaterial.uniforms.uResolution.value.set(renderWidth, renderHeight)

    this.createTargets(renderWidth, renderHeight, tier.bloomMips)
  }

  createTargets(renderWidth, renderHeight, mipCount) {
    this.disposeTargets()

    const options = {
      type: HalfFloatType,
      format: RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
    }

    this.hdrTarget = new WebGLRenderTarget(renderWidth, renderHeight, options)
    // Clamp is required: the chromatic aberration and bloom taps must not wrap around the frame.
    this.hdrTarget.texture.wrapS = ClampToEdgeWrapping
    this.hdrTarget.texture.wrapT = ClampToEdgeWrapping
    this.hdrTarget.texture.generateMipmaps = false

    for (let i = 0; i < mipCount; i++) {
      const width = Math.max(1, Math.floor(renderWidth / 2 ** (i + 1)))
      const height = Math.max(1, Math.floor(renderHeight / 2 ** (i + 1)))
      const target = new WebGLRenderTarget(width, height, options)
      target.texture.wrapS = ClampToEdgeWrapping
      target.texture.wrapT = ClampToEdgeWrapping
      target.texture.generateMipmaps = false
      this.bloomTargets.push(target)
    }

    this.sceneMaterial.uniforms.uResolution.value.set(renderWidth, renderHeight)
  }

  // -- frame -----------------------------------------------------------------------------------

  start() {
    if (this.disposed || this.raf !== undefined) return
    this.lastFrameTime = 0
    const loop = (now) => {
      if (this.disposed || this.contextLost) return
      this.raf = requestAnimationFrame(loop)
      this.frame(now)
    }
    this.raf = requestAnimationFrame(loop)
  }

  frame(now) {
    if (!this.state) return
    const seconds = now * 0.001
    const delta = this.lastFrameTime > 0 ? Math.min(seconds - this.lastFrameTime, 0.1) : 0
    this.lastFrameTime = seconds

    this.fpsAccumulator += delta
    this.frames += 1
    this.frameCount = (this.frameCount || 0) + 1
    if (this.fpsAccumulator >= 0.5) {
      this.fps = this.frames / this.fpsAccumulator
      this.frames = 0
      this.fpsAccumulator = 0
    }

    let simulatedTime = this.state.time
    if (this.state.capture) {
      // Frozen: no cinematic advance, no wall-clock accumulation.
      simulatedTime = this.state.time
    } else {
      this.elapsed += delta
      simulatedTime = this.state.time + this.elapsed * this.state.params.timeScale
      if (this.state.cinematic) this.updateCinematic(delta)
      this.controls.update()
      // While the loop owns the camera the parameters keep the framing the user authored: writing
      // the animated camera back would silently overwrite camDistance/Azimuth/Elevation and leave
      // the sliders describing a camera nobody asked for.
      if (!this.state.cinematic) this.syncCameraFraming(now)
    }

    this.sceneMaterial.uniforms.uTime.value = simulatedTime
    this.compositeMaterial.uniforms.uGrainSeed.value = simulatedTime

    this.camera.updateMatrixWorld(true)
    this.renderFrame()

    if (!this.ready && this.programsLinked()) {
      this.ready = true
      this.onReady()
    }
  }

  updateCinematic(delta) {
    if (!this.cinematicBase) this.setCinematicBaseFromCamera()
    this.cinematicPhase += delta
    const t = this.cinematicPhase
    const base = this.cinematicBase

    const azimuth = base.azimuth + t * 5.5
    const elevation = Math.max(-85, Math.min(85, base.elevation + 6.5 * Math.sin(t * 0.21)))
    const distance = Math.max(2.4, base.distance * (1 + 0.085 * Math.sin(t * 0.13 + 1.1)))

    const spherical = new Spherical(distance, (90 - elevation) * DEG, azimuth * DEG)
    this.camera.position.setFromSpherical(spherical)
    this.camera.updateMatrixWorld(true)
  }

  syncCameraFraming(now) {
    if (now - this.lastCameraSync < 140) return
    this.lastCameraSync = now
    this.syncCameraNow()
  }

  /** Forces the live camera framing back into the store, bypassing the throttle. */
  syncCameraNow() {
    // The cinematic loop owns the camera while it runs, so a forced write-back here would replace
    // the authored framing with an animated one. The loop yields first (drag / preset / reset).
    if (this.state && this.state.cinematic) return
    const spherical = new Spherical().setFromVector3(this.camera.position)
    this.onStateChange({
      camera: {
        azimuth: spherical.theta * RAD,
        elevation: 90 - spherical.phi * RAD,
        distance: spherical.radius,
      },
    })
  }

  /** Live numbers for the HUD and `window.__GARGANTUA__.getState()`. */
  describe() {
    return {
      quality: this.tier.id,
      budget: {
        maxSteps: this.tier.maxSteps,
        maxCrossings: this.tier.maxCrossings,
        stepScale: this.tier.stepScale,
        bloomMips: this.tier.bloomMips,
        bloomRadius: this.tier.bloomRadius,
        renderScale: this.tier.renderScale,
        dprCap: this.tier.dprCap,
        turbulenceOctaves: this.tier.turbulenceOctaves,
        skyOctaves: this.tier.skyOctaves,
      },
      render: {
        cssWidth: this.lastSize.cssWidth || 0,
        cssHeight: this.lastSize.cssHeight || 0,
        renderWidth: this.lastSize.renderWidth || 0,
        renderHeight: this.lastSize.renderHeight || 0,
        dpr: this.lastSize.dpr || 1,
        fps: this.fps,
        frameCount: this.frameCount || 0,
        contextLost: this.contextLost,
        programCount: this.renderer.info.programs ? this.renderer.info.programs.length : 0,
        simulationsTime: this.sceneMaterial.uniforms.uTime.value,
      },
    }
  }

  /**
   * A genuine link check: three logs shader errors to the console but does not throw, so reading
   * LINK_STATUS off the compiled programs is the only reliable success signal before declaring the
   * page capture-ready.
   */
  programsLinked() {
    const gl = this.renderer.getContext()
    const programs = this.renderer.info.programs
    if (!programs || programs.length === 0) return false
    for (const wrapper of programs) {
      if (!wrapper.program) return false
      if (!gl.getProgramParameter(wrapper.program, gl.LINK_STATUS)) return false
    }
    return true
  }

  renderFrame() {
    if (!this.hdrTarget) return
    const { renderer, passScene, passCamera, passMesh } = this
    const debug = this.state.debug

    passMesh.material = this.sceneMaterial
    renderer.setRenderTarget(this.hdrTarget)
    renderer.render(passScene, passCamera)

    // Diagnostics must stay clean, so bloom only runs for the graded composite.
    if (debug === 0 && this.bloomTargets.length > 0) this.runBloom()

    passMesh.material = this.compositeMaterial
    this.compositeMaterial.uniforms.uSource.value = this.hdrTarget.texture
    this.compositeMaterial.uniforms.uTexelSize.value.set(
      1 / this.lastSize.renderWidth,
      1 / this.lastSize.renderHeight,
    )
    this.compositeMaterial.uniforms.uBloom.value =
      debug === 0 && this.bloomTargets.length > 0 ? this.bloomTargets[0].texture : this.hdrTarget.texture
    this.compositeMaterial.uniforms.uBloomStrength.value =
      debug === 0 ? this.state.params.bloomStrength : 0
    renderer.setRenderTarget(null)
    renderer.render(passScene, passCamera)
  }

  runBloom() {
    const { renderer, passScene, passCamera, passMesh, bloomTargets } = this
    const mipCount = bloomTargets.length

    // Bright pass: full-resolution HDR -> first (half-resolution) mip.
    passMesh.material = this.brightMaterial
    this.brightMaterial.uniforms.uSource.value = this.hdrTarget.texture
    this.brightMaterial.uniforms.uTexelSize.value.set(
      1 / this.lastSize.renderWidth,
      1 / this.lastSize.renderHeight,
    )
    renderer.setRenderTarget(bloomTargets[0])
    renderer.render(passScene, passCamera)

    // Downsample chain.
    passMesh.material = this.downsampleMaterial
    for (let i = 1; i < mipCount; i++) {
      const source = bloomTargets[i - 1]
      this.downsampleMaterial.uniforms.uSource.value = source.texture
      this.downsampleMaterial.uniforms.uTexelSize.value.set(1 / source.width, 1 / source.height)
      renderer.setRenderTarget(bloomTargets[i])
      renderer.render(passScene, passCamera)
    }

    // Upsample chain, accumulated additively into each lower mip.
    passMesh.material = this.upsampleMaterial
    for (let i = mipCount - 1; i > 0; i--) {
      const source = bloomTargets[i]
      this.upsampleMaterial.uniforms.uSource.value = source.texture
      this.upsampleMaterial.uniforms.uTexelSize.value.set(1 / source.width, 1 / source.height)
      renderer.setRenderTarget(bloomTargets[i - 1])
      renderer.render(passScene, passCamera)
    }
  }
}
