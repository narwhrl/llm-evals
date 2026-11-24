import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/addons/controls/OrbitControls.js';
import { QUALITY } from './state.js';
import { fullscreenVertex, geodesicFragment, brightFragment, blurFragment, compositeFragment } from './shaders.js';

function makeTarget(width, height) {
  return new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

function makeFullscreen(material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  const scene = new THREE.Scene();
  scene.add(mesh);
  return { scene, geometry, mesh };
}

export class GargantuaEngine {
  constructor(canvas, getSnapshot, callbacks) {
    this.canvas = canvas;
    this.getSnapshot = getSnapshot;
    this.callbacks = callbacks;
    this.state = getSnapshot().state;
    this.capture = getSnapshot().capture;
    this.simulationTime = getSnapshot().time;
    this.contextState = 'live';
    this.ready = false;
    this.frameId = 0;
    this.lastTimestamp = 0;
    this.userInteracting = false;
    this.lastCameraParams = null;
    this.width = 1;
    this.height = 1;

    this.onContextLost = (event) => {
      event.preventDefault();
      this.contextState = 'lost';
      this.ready = false;
      this.callbacks.onContext('lost');
      cancelAnimationFrame(this.frameId);
    };
    this.onContextRestored = () => {
      this.contextState = 'restored';
      this.callbacks.onContext('restored');
      try {
        this.releaseGL();
        this.createGL();
        this.resize();
        this.contextState = 'live';
        this.renderFrame(0);
        this.lastTimestamp = 0;
        this.frameId = requestAnimationFrame(this.animate);
        this.contextState = 'live';
        this.callbacks.onContext('live');
        this.callbacks.onReady();
      } catch (error) {
        this.contextState = 'failed';
        this.callbacks.onError(error);
      }
    };
    canvas.addEventListener('webglcontextlost', this.onContextLost, false);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored, false);

    this.createGL();
    window.addEventListener('resize', this.resize);
    this.resize();
    this.renderFrame(0);
    this.callbacks.onReady();
    this.frameId = requestAnimationFrame(this.animate);
  }

  createGL() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.debug.checkShaderErrors = true;
    this.shaderError = null;
    this.renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
      const details = [gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertexShader), gl.getShaderInfoLog(fragmentShader)]
        .filter(Boolean)
        .join('\n');
      const error = new Error(`Shader compilation failed: ${details}`);
      this.shaderError = error;
      this.callbacks.onError(error);
    };

    this.camera = new THREE.PerspectiveCamera(this.state.params.fov, 1, 0.1, 200);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.enablePan = false;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 42;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.7;
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener('start', () => {
      this.userInteracting = true;
      this.callbacks.onManualControl();
    });
    this.controls.addEventListener('change', () => {
      if (this.userInteracting) this.callbacks.onCameraChange(this.readCameraParams());
    });
    this.controls.addEventListener('end', () => {
      this.userInteracting = false;
      this.callbacks.onCameraChange(this.readCameraParams());
    });

    this.rayMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertex,
      fragmentShader: geodesicFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uCameraMatrix: { value: new THREE.Matrix3() },
        uCameraPosition: { value: new THREE.Vector3() },
        uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(this.state.params.fov * 0.5)) },
        uAspect: { value: 1 },
        uTime: { value: this.simulationTime },
        uMaxSteps: { value: QUALITY[this.state.quality].maxSteps },
        uDebug: { value: this.state.debug },
        uInnerRadius: { value: this.state.params.innerRadius },
        uOuterRadius: { value: this.state.params.outerRadius },
        uHalfThickness: { value: this.state.params.halfThickness },
        uTemperature: { value: this.state.params.temperature },
        uEmission: { value: this.state.params.emission },
        uOrbitalSpeed: { value: this.state.params.orbitalSpeed },
        uTurbulence: { value: this.state.params.turbulence },
        uTurbulenceSpeed: { value: this.state.params.turbulenceSpeed },
        uStarDensity: { value: this.state.params.starDensity },
        uGalaxyBrightness: { value: this.state.params.galaxyBrightness },
      },
    });
    this.rayPass = makeFullscreen(this.rayMaterial);

    this.brightMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertex,
      fragmentShader: brightFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTexture: { value: null },
        uThreshold: { value: this.state.params.bloomThreshold },
      },
    });
    this.brightPass = makeFullscreen(this.brightMaterial);

    this.blurMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertex,
      fragmentShader: blurFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTexture: { value: null },
        uDirection: { value: new THREE.Vector2() },
        uSamples: { value: QUALITY[this.state.quality].blurSamples },
      },
    });
    this.blurPass = makeFullscreen(this.blurMaterial);

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVertex,
      fragmentShader: compositeFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uScene: { value: null },
        uBloom: { value: null },
        uBloomStrength: { value: this.state.params.bloom },
        uExposure: { value: this.state.params.exposure },
        uVignette: { value: this.state.params.vignette },
        uGrain: { value: this.state.params.grain },
        uDispersion: { value: this.state.params.dispersion },
        uTime: { value: this.simulationTime },
        uDebug: { value: this.state.debug },
      },
    });
    this.compositePass = makeFullscreen(this.compositeMaterial);

    this.hdrTarget = makeTarget(1, 1);
    this.bloomTargetA = makeTarget(1, 1);
    this.bloomTargetB = makeTarget(1, 1);
    this.screenCamera = new THREE.Camera();
    this.applyCameraParams(this.state.params);
    this.lastCameraParams = { ...this.state.params };
    this.renderer.compile(this.rayPass.scene, this.screenCamera);
    this.renderer.compile(this.brightPass.scene, this.screenCamera);
    this.renderer.compile(this.blurPass.scene, this.screenCamera);
    this.renderer.compile(this.compositePass.scene, this.screenCamera);
    if (this.shaderError) throw this.shaderError;
  }

  readCameraParams() {
    const offset = this.camera.position.clone().sub(this.controls.target);
    const distance = offset.length();
    return {
      distance,
      azimuth: Math.atan2(offset.x, offset.z),
      elevation: Math.asin(THREE.MathUtils.clamp(offset.y / Math.max(distance, 0.001), -1, 1)),
      fov: this.camera.fov,
    };
  }

  applyCameraParams(params) {
    const horizontal = Math.cos(params.elevation) * params.distance;
    this.camera.position.set(
      Math.sin(params.azimuth) * horizontal,
      Math.sin(params.elevation) * params.distance,
      Math.cos(params.azimuth) * horizontal,
    );
    this.camera.fov = params.fov;
    this.camera.lookAt(this.controls.target);
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
    this.controls.update();
  }

  setState(nextState) {
    const previous = this.state;
    this.state = nextState;
    if (!this.renderer) return;
    const quality = QUALITY[nextState.quality];
    this.rayMaterial.uniforms.uMaxSteps.value = quality.maxSteps;
    this.blurMaterial.uniforms.uSamples.value = quality.blurSamples;
    this.rayMaterial.uniforms.uDebug.value = nextState.debug;
    this.compositeMaterial.uniforms.uDebug.value = nextState.debug;

    const cameraKeys = ['fov', 'distance', 'azimuth', 'elevation'];
    const cameraChanged = cameraKeys.some((key) => previous.params[key] !== nextState.params[key]);
    if (cameraChanged && !this.userInteracting) {
      this.applyCameraParams(nextState.params);
      this.lastCameraParams = { ...nextState.params };
    }
    if (previous.quality !== nextState.quality) this.resize();
  }

  setTime(seconds) {
    this.simulationTime = seconds;
    this.rayMaterial.uniforms.uTime.value = seconds;
    this.compositeMaterial.uniforms.uTime.value = seconds;
  }

  setPreset(params) {
    this.applyCameraParams(params);
    this.lastCameraParams = { ...params };
  }

  resize = () => {
    if (!this.renderer) return;
    this.width = Math.max(1, window.innerWidth);
    this.height = Math.max(1, window.innerHeight);
    const quality = QUALITY[this.state.quality];
    const dpr = Math.min(window.devicePixelRatio || 1, quality.dprCap);
    const renderWidth = Math.max(1, Math.floor(this.width * dpr * quality.renderScale));
    const renderHeight = Math.max(1, Math.floor(this.height * dpr * quality.renderScale));
    this.renderer.setSize(renderWidth, renderHeight, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.rayMaterial.uniforms.uAspect.value = this.width / this.height;
    this.hdrTarget.setSize(renderWidth, renderHeight);
    const bloomWidth = Math.max(1, Math.floor(renderWidth * quality.bloomScale));
    const bloomHeight = Math.max(1, Math.floor(renderHeight * quality.bloomScale));
    this.bloomTargetA.setSize(bloomWidth, bloomHeight);
    this.bloomTargetB.setSize(bloomWidth, bloomHeight);
  };

  updateUniforms() {
    const params = this.state.params;
    const uniforms = this.rayMaterial.uniforms;
    this.camera.updateMatrixWorld();
    uniforms.uCameraMatrix.value.setFromMatrix4(this.camera.matrixWorld);
    uniforms.uCameraPosition.value.copy(this.camera.position);
    uniforms.uTanHalfFov.value = Math.tan(THREE.MathUtils.degToRad(this.camera.fov * 0.5));
    uniforms.uTime.value = this.simulationTime;
    uniforms.uInnerRadius.value = params.innerRadius;
    uniforms.uOuterRadius.value = params.outerRadius;
    uniforms.uHalfThickness.value = params.halfThickness;
    uniforms.uTemperature.value = params.temperature;
    uniforms.uEmission.value = params.emission;
    uniforms.uOrbitalSpeed.value = params.orbitalSpeed;
    uniforms.uTurbulence.value = params.turbulence;
    uniforms.uTurbulenceSpeed.value = params.turbulenceSpeed;
    uniforms.uStarDensity.value = params.starDensity;
    uniforms.uGalaxyBrightness.value = params.galaxyBrightness;

    this.brightMaterial.uniforms.uThreshold.value = params.bloomThreshold;
    this.compositeMaterial.uniforms.uBloomStrength.value = params.bloom;
    this.compositeMaterial.uniforms.uExposure.value = params.exposure;
    this.compositeMaterial.uniforms.uVignette.value = params.vignette;
    this.compositeMaterial.uniforms.uGrain.value = params.grain;
    this.compositeMaterial.uniforms.uDispersion.value = params.dispersion;
    this.compositeMaterial.uniforms.uTime.value = this.simulationTime;
  }

  renderFrame(delta) {
    if (!this.renderer || this.contextState !== 'live') return;
    if (this.state.playing && !this.capture && !this.userInteracting) {
      this.simulationTime += Math.min(delta, 0.05) * this.state.params.timeScale;
      const offset = this.camera.position.clone().sub(this.controls.target);
      const azimuth = Math.atan2(offset.x, offset.z) + Math.min(delta, 0.05) * 0.018 * this.state.params.timeScale;
      const elevation = THREE.MathUtils.clamp(Math.asin(offset.y / offset.length()) + Math.sin(this.simulationTime * 0.09) * delta * 0.002, -1.45, 1.45);
      const distance = offset.length();
      const horizontal = Math.cos(elevation) * distance;
      this.camera.position.set(Math.sin(azimuth) * horizontal, Math.sin(elevation) * distance, Math.cos(azimuth) * horizontal);
    }
    this.controls.update();
    this.updateUniforms();

    this.renderer.setRenderTarget(this.hdrTarget);
    this.renderer.render(this.rayPass.scene, this.screenCamera);

    this.brightMaterial.uniforms.uTexture.value = this.hdrTarget.texture;
    this.renderer.setRenderTarget(this.bloomTargetA);
    this.renderer.render(this.brightPass.scene, this.screenCamera);

    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.blurMaterial.uniforms.uTexture.value = this.bloomTargetA.texture;
    this.blurMaterial.uniforms.uDirection.value.set(1 / this.bloomTargetA.width, 0);
    this.renderer.setRenderTarget(this.bloomTargetB);
    this.renderer.render(this.blurPass.scene, this.screenCamera);

    this.blurMaterial.uniforms.uTexture.value = this.bloomTargetB.texture;
    this.blurMaterial.uniforms.uDirection.value.set(0, 1 / this.bloomTargetA.height);
    this.renderer.setRenderTarget(this.bloomTargetA);
    this.renderer.render(this.blurPass.scene, this.screenCamera);

    this.compositeMaterial.uniforms.uScene.value = this.hdrTarget.texture;
    this.compositeMaterial.uniforms.uBloom.value = this.bloomTargetA.texture;
    this.renderer.setRenderTarget(null);
    this.renderer.setViewport(0, 0, size.x, size.y);
    this.renderer.render(this.compositePass.scene, this.screenCamera);
  }

  animate = (timestamp) => {
    const delta = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 1000 : 0;
    this.lastTimestamp = timestamp;
    this.renderFrame(delta);
    this.frameId = requestAnimationFrame(this.animate);
  };

  getDiagnostics() {
    return {
      context: this.contextState,
      time: this.simulationTime,
      quality: this.state.quality,
      maxSteps: QUALITY[this.state.quality].maxSteps,
      renderWidth: this.renderer?.domElement.width || 0,
      renderHeight: this.renderer?.domElement.height || 0,
      camera: this.readCameraParams(),
      programs: this.renderer?.info.programs?.length || 0,
    };
  }

  releaseGL() {
    this.controls?.dispose();
    this.rayPass?.geometry.dispose();
    this.brightPass?.geometry.dispose();
    this.blurPass?.geometry.dispose();
    this.compositePass?.geometry.dispose();
    this.rayMaterial?.dispose();
    this.brightMaterial?.dispose();
    this.blurMaterial?.dispose();
    this.compositeMaterial?.dispose();
    this.hdrTarget?.dispose();
    this.bloomTargetA?.dispose();
    this.bloomTargetB?.dispose();
    this.renderer?.dispose();
    this.renderer = null;
  }

  destroy() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.resize);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.releaseGL();
  }
}
