import * as THREE from '../vendor/three.module.js'
import { OrbitControls } from '../vendor/OrbitControls.js'
import { QUALITY, presetPatch } from './presets.js'
import { BLUR_FRAG, COMPOSITE_FRAG, EXTRACT_FRAG, RAY_FRAG, SCREEN_VERT } from './shaders.js'

function angleDelta(a, b) {
  const delta = Math.abs(a - b) % 360
  return Math.min(delta, 360 - delta)
}

function fullscreenTriangle() {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    -1, -1, 0,
    3, -1, 0,
    -1, 3, 0,
  ]), 3))
  return geometry
}

function makeTarget(width, height, type) {
  const target = new THREE.WebGLRenderTarget(width, height, {
    type,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  })
  target.texture.colorSpace = THREE.LinearSRGBColorSpace
  return target
}

function screenMaterial(fragmentShader, uniforms) {
  return new THREE.ShaderMaterial({
    vertexShader: SCREEN_VERT,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    precision: 'highp',
  })
}

export class GargantuaEngine {
  constructor(canvas, store) {
    this.canvas = canvas
    this.store = store
    this.ready = false
    this.disposed = false
    this.lost = false
    this.shaderFailed = false
    this.pointerDown = false
    this.wasPlaying = false
    this.azimuth = 0
    this.polarBase = 70
    this.simTime = store.getState().time
    this.uiAccum = 0
    this.appliedQuality = ''
    this.clock = new THREE.Clock()
    this.spherical = new THREE.Spherical()
    this.bufSize = new THREE.Vector2()
    this.camera = new THREE.PerspectiveCamera(46, 1, 0.1, 200)
    this.camera.position.set(0, 4, 14)
    this.ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene = new THREE.Scene()
    this.floatType = THREE.HalfFloatType
  }

  start() {
    const state = this.store.getState()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.toneMapping = THREE.NoToneMapping
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.debug.checkShaderErrors = true
    this.renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
      const log = [gl.getShaderInfoLog(vertexShader), gl.getShaderInfoLog(fragmentShader), gl.getProgramInfoLog(program)]
        .filter(Boolean)
        .join('\n')
        .slice(0, 2500)
      this.shaderFailed = true
      this.store.set({ shaderError: log || 'Shader failed to compile.' }, { source: 'engine', persist: false })
    }

    const gl = this.renderer.getContext()
    const halfFloat = gl.getExtension('EXT_color_buffer_half_float') || gl.getExtension('EXT_color_buffer_float')
    this.floatType = halfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType

    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.target.set(0, 0, 0)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.enablePan = false
    this.controls.zoomToCursor = false
    this.controls.minDistance = 5.5
    this.controls.maxDistance = 64
    this.controls.minPolarAngle = THREE.MathUtils.degToRad(4)
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(176)
    this.controls.rotateSpeed = 0.55
    this.controls.zoomSpeed = 0.65

    this.onControlStart = () => {
      this.pointerDown = true
      this.store.set({ playing: false, preset: null }, { source: 'controls', persist: false })
    }
    this.onControlEnd = () => {
      this.pointerDown = false
      const actual = this.readCamera()
      this.store.set({
        playing: false,
        preset: null,
        params: actual,
      }, { source: 'controls', persist: true })
    }
    this.controls.addEventListener('start', this.onControlStart)
    this.controls.addEventListener('end', this.onControlEnd)

    this.onLost = (event) => {
      event.preventDefault()
      this.lost = true
      this.store.set({ contextLost: true }, { source: 'engine', persist: false })
    }
    this.onRestored = () => {
      this.shaderFailed = false
      this.rebuildGpu()
      this.lost = false
      this.store.set({ contextLost: false, shaderError: '' }, { source: 'engine', persist: false })
      this.resize(true)
      this.syncUniforms()
      this.renderPipeline()
      this.markReady()
    }
    this.canvas.addEventListener('webglcontextlost', this.onLost, false)
    this.canvas.addEventListener('webglcontextrestored', this.onRestored, false)

    this.createMaterials()
    this.mesh = new THREE.Mesh(fullscreenTriangle(), this.rayMaterial)
    this.mesh.frustumCulled = false
    this.scene.add(this.mesh)

    this.unsubscribe = this.store.subscribe((next, meta) => this.onStore(next, meta))
    this.resizeObserver = new ResizeObserver(() => this.resize(false))
    this.resizeObserver.observe(this.canvas)

    this.exposeApi()
    this.azimuth = state.params.azimuth
    this.polarBase = state.params.polar
    this.writeCamera(state.params)
    this.controls.update()
    this.clock.getDelta()
    this.resize(true)
    this.syncUniforms()
    this.renderPipeline()
    this.markReady()
    this.frame = this.frame.bind(this)
    this.raf = requestAnimationFrame(this.frame)
  }

  createMaterials() {
    this.rayMaterial = screenMaterial(RAY_FRAG, {
      uResolution: { value: new THREE.Vector2(2, 2) },
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamForward: { value: new THREE.Vector3(0, 0, -1) },
      uFov: { value: 46 },
      uTime: { value: 0 },
      uMaxSteps: { value: 230 },
      uMaxCrossings: { value: 4 },
      uStepScale: { value: 0.9 },
      uDiskInner: { value: 3.05 },
      uDiskOuter: { value: 12 },
      uDiskH: { value: 0.2 },
      uTemp: { value: 8800 },
      uEmit: { value: 1.35 },
      uOrbital: { value: 1 },
      uTurbAmp: { value: 0.58 },
      uTurbSpeed: { value: 0.7 },
      uStarDensity: { value: 0.7 },
      uGalaxy: { value: 0.85 },
      uDebug: { value: 0 },
    })
    this.rayMaterial.name = 'schwarzschild-geodesic'
    this.rayUniforms = this.rayMaterial.uniforms

    this.extractMaterial = screenMaterial(EXTRACT_FRAG, {
      uScene: { value: null },
      uExposure: { value: 0.28 },
      uThreshold: { value: 1.2 },
    })
    this.extractUniforms = this.extractMaterial.uniforms

    this.blurMaterial = screenMaterial(BLUR_FRAG, {
      uImage: { value: null },
      uResolution: { value: new THREE.Vector2(2, 2) },
      uDirection: { value: new THREE.Vector2(1, 0) },
      uTaps: { value: 9 },
    })
    this.blurUniforms = this.blurMaterial.uniforms

    this.compMaterial = screenMaterial(COMPOSITE_FRAG, {
      uScene: { value: null },
      uBloom: { value: null },
      uResolution: { value: new THREE.Vector2(2, 2) },
      uDebug: { value: 0 },
      uExposure: { value: 0.28 },
      uBloomStrength: { value: 0.48 },
      uVignette: { value: 0.36 },
      uGrain: { value: 0.055 },
      uAberration: { value: 0.14 },
      uTime: { value: 0 },
    })
    this.compUniforms = this.compMaterial.uniforms
  }

  rebuildGpu() {
    this.disposeTargets()
    for (const material of [this.rayMaterial, this.extractMaterial, this.blurMaterial, this.compMaterial]) {
      material?.dispose()
    }
    this.mesh.geometry.dispose()
    this.mesh.geometry = fullscreenTriangle()
    this.createMaterials()
    this.mesh.material = this.rayMaterial
    this.appliedQuality = ''
  }

  resize(force) {
    const cssW = this.canvas.clientWidth || window.innerWidth
    const cssH = this.canvas.clientHeight || window.innerHeight
    if (cssW < 2 || cssH < 2) return
    const state = this.store.getState()
    const quality = QUALITY[state.quality] || QUALITY.high
    const mobile = cssW < 780
    const displayDpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
    if (!force && this.appliedQuality === state.quality && this.cssW === cssW && this.cssH === cssH && this.displayDpr === displayDpr) return
    this.appliedQuality = state.quality
    this.cssW = cssW
    this.cssH = cssH
    this.displayDpr = displayDpr

    this.renderer.setPixelRatio(displayDpr)
    this.renderer.setSize(cssW, cssH, false)
    this.camera.aspect = cssW / cssH
    this.camera.updateProjectionMatrix()
    this.renderer.getDrawingBufferSize(this.bufSize)
    this.compUniforms.uResolution.value.copy(this.bufSize)

    const rayDpr = Math.min(window.devicePixelRatio || 1, quality.dpr)
    let rw = Math.max(2, Math.floor(cssW * rayDpr * quality.scale))
    let rh = Math.max(2, Math.floor(cssH * rayDpr * quality.scale))
    const cap = mobile ? 650000 : 1400000
    const pixels = rw * rh
    if (pixels > cap) {
      const k = Math.sqrt(cap / pixels)
      rw = Math.max(2, Math.floor(rw * k))
      rh = Math.max(2, Math.floor(rh * k))
    }
    const bw = Math.max(2, Math.floor(rw / 2))
    const bh = Math.max(2, Math.floor(rh / 2))
    this.sceneRT = this.ensureTarget(this.sceneRT, rw, rh)
    this.bloomA = this.ensureTarget(this.bloomA, bw, bh)
    this.bloomB = this.ensureTarget(this.bloomB, bw, bh)
    this.rayUniforms.uResolution.value.set(rw, rh)
    this.blurUniforms.uResolution.value.set(bw, bh)
    this.extractUniforms.uScene.value = this.sceneRT.texture
    this.compUniforms.uScene.value = this.sceneRT.texture
    this.compUniforms.uBloom.value = this.bloomA.texture
    this.bloomPasses = quality.bloomPasses
  }

  ensureTarget(current, width, height) {
    if (current && current.width === width && current.height === height) return current
    if (current) current.dispose()
    return makeTarget(width, height, this.floatType)
  }

  disposeTargets() {
    this.sceneRT?.dispose()
    this.bloomA?.dispose()
    this.bloomB?.dispose()
    this.sceneRT = null
    this.bloomA = null
    this.bloomB = null
  }

  writeCamera(params) {
    this.spherical.radius = params.distance
    this.spherical.phi = THREE.MathUtils.degToRad(params.polar)
    this.spherical.theta = THREE.MathUtils.degToRad(params.azimuth)
    this.camera.position.setFromSpherical(this.spherical)
    this.camera.lookAt(this.controls?.target ?? new THREE.Vector3())
    this.camera.fov = params.fov
    this.camera.updateProjectionMatrix()
    this.azimuth = params.azimuth
  }

  readCamera() {
    this.spherical.setFromVector3(this.camera.position.clone().sub(this.controls.target))
    let azimuth = THREE.MathUtils.radToDeg(this.spherical.theta)
    if (azimuth < 0) azimuth += 360
    return {
      distance: this.spherical.radius,
      azimuth,
      polar: THREE.MathUtils.radToDeg(this.spherical.phi),
    }
  }

  onStore(state, meta) {
    if (this.disposed) return
    if (meta.syncTime) this.simTime = state.time
    if (meta.camera || meta.source === 'reset') {
      this.writeCamera(state.params)
      this.polarBase = state.params.polar - Math.sin(this.simTime * 0.15) * 3
    }
    if (state.quality !== this.appliedQuality) this.resize(true)
  }

  syncUniforms() {
    const state = this.store.getState()
    const params = state.params
    const quality = QUALITY[state.quality] || QUALITY.high
    this.camera.updateMatrixWorld(true)
    const elements = this.camera.matrixWorld.elements
    this.rayUniforms.uCamPos.value.copy(this.camera.position)
    this.rayUniforms.uCamRight.value.set(elements[0], elements[1], elements[2])
    this.rayUniforms.uCamUp.value.set(elements[4], elements[5], elements[6])
    this.rayUniforms.uCamForward.value.set(-elements[8], -elements[9], -elements[10])
    this.rayUniforms.uFov.value = params.fov
    this.rayUniforms.uTime.value = this.simTime
    this.rayUniforms.uMaxSteps.value = quality.steps
    this.rayUniforms.uMaxCrossings.value = quality.crossings
    this.rayUniforms.uStepScale.value = quality.stepScale
    this.rayUniforms.uDiskInner.value = params.diskInner
    this.rayUniforms.uDiskOuter.value = params.diskOuter
    this.rayUniforms.uDiskH.value = params.diskThickness
    this.rayUniforms.uTemp.value = params.diskTemperature
    this.rayUniforms.uEmit.value = params.diskEmission
    this.rayUniforms.uOrbital.value = params.orbitalSpeed
    this.rayUniforms.uTurbAmp.value = params.turbulence
    this.rayUniforms.uTurbSpeed.value = params.turbulenceSpeed
    this.rayUniforms.uStarDensity.value = params.starDensity
    this.rayUniforms.uGalaxy.value = params.galaxy
    this.rayUniforms.uDebug.value = state.debug
    this.extractUniforms.uExposure.value = params.exposure
    this.extractUniforms.uThreshold.value = params.bloomThreshold
    this.blurUniforms.uTaps.value = quality.bloomTaps
    this.bloomPasses = quality.bloomPasses
    this.compUniforms.uDebug.value = state.debug
    this.compUniforms.uExposure.value = params.exposure
    this.compUniforms.uBloomStrength.value = params.bloomStrength
    this.compUniforms.uVignette.value = params.vignette
    this.compUniforms.uGrain.value = params.grain
    this.compUniforms.uAberration.value = params.aberration
    this.compUniforms.uTime.value = this.simTime
  }

  renderPipeline() {
    if (!this.sceneRT) return
    const debug = this.store.getState().debug
    this.mesh.material = this.rayMaterial
    this.renderer.setRenderTarget(this.sceneRT)
    this.renderer.render(this.scene, this.ortho)

    if (debug === 0 && this.bloomA && this.bloomB) {
      this.mesh.material = this.extractMaterial
      this.renderer.setRenderTarget(this.bloomA)
      this.renderer.render(this.scene, this.ortho)
      const passes = this.bloomPasses || 3
      for (let pass = 0; pass < passes; pass += 1) {
        this.blurUniforms.uImage.value = this.bloomA.texture
        this.blurUniforms.uDirection.value.set(1, 0)
        this.mesh.material = this.blurMaterial
        this.renderer.setRenderTarget(this.bloomB)
        this.renderer.render(this.scene, this.ortho)
        this.blurUniforms.uImage.value = this.bloomB.texture
        this.blurUniforms.uDirection.value.set(0, 1)
        this.renderer.setRenderTarget(this.bloomA)
        this.renderer.render(this.scene, this.ortho)
      }
      this.compUniforms.uBloom.value = this.bloomA.texture
    }

    this.mesh.material = this.compMaterial
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.ortho)
  }

  markReady() {
    if (this.ready || this.shaderFailed || this.disposed || this.lost) return
    if (!this.sceneRT) return
    this.ready = true
    document.documentElement.dataset.gargantuaReady = 'true'
  }

  frame() {
    this.raf = requestAnimationFrame(this.frame)
    if (this.disposed || this.lost) return
    const dt = Math.min(0.05, this.clock.getDelta())
    const state = this.store.getState()
    if (!state.capture) this.simTime += dt * state.params.timeScale

    const playing = state.playing && !state.capture && !this.pointerDown
    if (playing && !this.wasPlaying) {
      this.azimuth = state.params.azimuth
      this.polarBase = state.params.polar - Math.sin(this.simTime * 0.15) * 3
    }
    if (playing) {
      this.azimuth += dt * 8 * state.params.timeScale
      const polar = this.polarBase + Math.sin(this.simTime * 0.15) * 3
      this.writeCamera({ ...state.params, azimuth: this.azimuth, polar })
    }
    this.wasPlaying = playing
    this.controls.update()

    if (!playing) {
      const actual = this.readCamera()
      const current = state.params
      const drifted = Math.abs(actual.distance - current.distance) > 0.02
        || Math.abs(actual.polar - current.polar) > 0.05
        || angleDelta(actual.azimuth, current.azimuth) > 0.05
      const now = performance.now()
      if (drifted && (!this.pointerDown || now - (this.lastHud || 0) > 60)) {
        this.lastHud = now
        this.store.set({
          params: {
            distance: actual.distance,
            azimuth: actual.azimuth,
            polar: actual.polar,
          },
        }, { source: 'controls', persist: !this.pointerDown })
      }
    }

    this.uiAccum += dt
    if (playing && this.uiAccum >= 0.1) {
      this.uiAccum = 0
      const actual = this.readCamera()
      this.store.set({
        time: this.simTime,
        params: actual,
      }, { source: 'engine', persist: false })
    } else if (!playing && this.uiAccum >= 0.2) {
      this.uiAccum = 0
      this.store.set({ time: this.simTime }, { source: 'engine', persist: false })
    }

    this.syncUniforms()
    this.renderPipeline()
    this.markReady()
  }

  snapshot() {
    const state = this.store.getState()
    return {
      ready: this.ready,
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hud: state.hud ? 1 : 0,
      time: this.simTime,
      playing: Boolean(state.playing),
      contextLost: Boolean(state.contextLost),
      capture: Boolean(state.capture),
      params: { ...state.params },
    }
  }

  setQuality(level) {
    if (this.disposed || typeof level !== 'string') return null
    const key = level.trim().toLowerCase()
    if (!QUALITY[key]) return null
    this.store.set({ quality: key }, { source: 'api', persist: !this.store.getState().capture })
    return this.snapshot()
  }

  setPreset(index) {
    if (this.disposed || !Number.isInteger(index) || index < 0 || index > 3) return null
    this.store.set(presetPatch(index), { source: 'api', persist: !this.store.getState().capture, camera: true })
    return this.snapshot()
  }

  setDebug(index) {
    if (this.disposed || !Number.isInteger(index) || index < 0 || index > 9) return null
    this.store.set({ debug: index }, { source: 'api', persist: !this.store.getState().capture })
    return this.snapshot()
  }

  setTime(seconds) {
    if (this.disposed || typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return null
    this.simTime = seconds
    this.store.set({ time: seconds }, { source: 'api', persist: false, syncTime: true })
    return this.snapshot()
  }

  exposeApi() {
    const engine = this
    window.__GARGANTUA__ = {
      get ready() {
        return engine.ready
      },
      getState() {
        return engine.snapshot()
      },
      setQuality(level) {
        return engine.setQuality(level)
      },
      setPreset(index) {
        return engine.setPreset(index)
      },
      setDebug(index) {
        return engine.setDebug(index)
      },
      setTime(seconds) {
        return engine.setTime(seconds)
      },
    }
  }

  dispose() {
    this.disposed = true
    this.ready = false
    cancelAnimationFrame(this.raf)
    this.unsubscribe?.()
    this.resizeObserver?.disconnect()
    this.controls?.removeEventListener('start', this.onControlStart)
    this.controls?.removeEventListener('end', this.onControlEnd)
    this.controls?.dispose()
    this.canvas.removeEventListener('webglcontextlost', this.onLost)
    this.canvas.removeEventListener('webglcontextrestored', this.onRestored)
    this.disposeTargets()
    this.mesh?.geometry?.dispose()
    for (const material of [this.rayMaterial, this.extractMaterial, this.blurMaterial, this.compMaterial]) {
      material?.dispose()
    }
    this.renderer?.dispose()
    delete document.documentElement.dataset.gargantuaReady
    if (window.__GARGANTUA__) delete window.__GARGANTUA__
  }
}
