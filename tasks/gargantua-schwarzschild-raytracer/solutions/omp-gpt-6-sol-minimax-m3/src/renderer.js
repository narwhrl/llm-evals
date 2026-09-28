// Command-style raytracer renderer.
//
// Owns:
//   * One `THREE.WebGLRenderer` pinned to the supplied <canvas>.
//   * One `PerspectiveCamera` and one vendored `OrbitControls`.
//   * One linear HDR scene render target (RGBA16F / HalfFloat).
//   * One bright-pass render target at scene resolution.
//   * Two ping-pong separable-Gaussian blur render targets at HALF the
//     scene resolution (horizontal + vertical).
//   * One composite material that adds bloom, applies exposure / ACES /
//     vignette / grain / chromatic aberration, and writes sRGB pixels.
//
// Module 2 owns the post-process chain (HDR -> bright -> blurH -> blurV
// -> composite).  Module 1's behaviour (raytrace directly to canvas) is
// preserved only conceptually — physically the chain is HDR -> composite
// with a single sRGB conversion in composite.glsl.
//
// Module 3 added:
//   * Synchronous compile-then-render-first-frame ready handshake.
//     (compileAsync + setTimeout polling was removed because that
//      pattern races with React StrictMode's double-mount/dispose
//      and Three's internal checkMaterialsReady touches disposed
//      programs, throwing page errors.  We now render the pipeline
//      once and only mark ready if no compile error fired.)
//   * renderer.debug.onShaderError reporting.
//   * cinematic rotation that yields to manual OrbitControls input.
//
// Module 4 wired the WebGL context-loss / restore lifecycle:
//   * `webglcontextlost` calls `preventDefault`, cancels the rAF,
//     emits `{ready:false,lost:true,error:…}`, and tears down only
//     the GPU-bound resources (render targets; the Three renderer is
//     kept attached to the canvas because its internal `_gl`
//     reference survives the loss and is required for the restore
//     event).  All JS-side state (camera, OrbitControls, uniforms,
//     store subscription, event listeners) is preserved so the same
//     configuration (preset/quality/debug/time/HUD) continues once
//     the context comes back.
//   * `webglcontextrestored` allocates fresh render targets,
//     re-runs the full pipeline once to recompile every program,
//     and emits ready again.  No page reload.
//   * Repeated loss/restore cycles are idempotent: we keep a
//     single rAF loop on the JS side, listen once per canvas
//     lifetime, and the rAF slot is reused or cancelled cleanly.

import * as THREE from 'three';
// OrbitControls lives in vendor/three/addons (see vite.config.js alias for
// the bare `three` specifier).  Importing the addon file as a relative path
// keeps the production bundle self-contained.
import { OrbitControls } from '../vendor/three/addons/controls/OrbitControls.js';
import raytraceFragmentSource from './shaders/raytrace.glsl?raw';
import brightFragmentSource    from './shaders/bright.glsl?raw';
import blurFragmentSource      from './shaders/blur.glsl?raw';
import compositeFragmentSource from './shaders/composite.glsl?raw';

const FULLSCREEN_VERTEX = /* glsl */`
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const QUALITY_TO_INT = { standard: 0, high: 1, cinematic: 2 };

function buildFullscreenTriangleGeometry() {
  const geom = new THREE.BufferGeometry();
  // Single triangle that covers the viewport.
  const verts = new Float32Array([
    -1.0, -1.0,
     3.0, -1.0,
    -1.0,  3.0,
  ]);
  geom.setAttribute('a_position', new THREE.BufferAttribute(verts, 2));
  geom.setDrawRange(0, 3);
  return geom;
}

// Probe HalfFloat color-buffer support up front.  We require it because
// the HDR scene target is HalfFloat; without it we surface an explicit
// status to App rather than silently degrading to an SDR pipeline.
function detectHalfFloatSupport(gl) {
  if (!gl) return false;
  try {
    if (gl instanceof WebGL2RenderingContext) {
      // EXT_color_buffer_float / EXT_color_buffer_half_float cover
      // WebGL2.  Both are usually exposed when the platform supports
      // floating-point render targets.
      return !!gl.getExtension('EXT_color_buffer_float') ||
             !!gl.getExtension('EXT_color_buffer_half_float');
    }
  } catch (_) {}
  return false;
}

export function createRaytracer(canvas, store, onStatus) {
  const emit = (status) => {
    if (typeof onStatus === 'function') onStatus(status);
  };

  // WebGL2 context with deterministic friendly defaults.
  let gl = null;
  try {
    gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
      premultipliedAlpha: true,
    });
  } catch (e) {
    /* fall through to null */
  }
  if (!gl) {
    emit({
      ready: false,
      lost: false,
      error: 'WebGL2 context creation failed',
    });
    return {
      renderNow() {},
      dispose() {},
    };
  }

  if (!detectHalfFloatSupport(gl)) {
    emit({
      ready: false,
      lost: false,
      error: 'WebGL2 EXT_color_buffer_float / EXT_color_buffer_half_float not available; HDR pipeline unsupported on this device.',
    });
    return {
      renderNow() {},
      dispose() {},
    };
  }

  // Build the Three.js stack from the live context.
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
  } catch (err) {
    emit({ ready: false, lost: false, error: String(err && err.message || err) });
    return { renderNow() {}, dispose() {} };
  }
  renderer.autoClear = true;
  renderer.setClearColor(new THREE.Color(0x000000), 1.0);
  // The composite pass is the SOLE place that converts linear -> sRGB.
  // Setting outputColorSpace to LinearSRGBColorSpace tells Three NOT to
  // apply its own conversion on the way to the default framebuffer, so
  // composite.glsl's manual linearToSrgb is the only encoding step.
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  // Surface GLSL compile/link errors via the same status channel as
  // any other failure so the HUD can render a real error message
  // instead of a silent black canvas.  We set a persistent flag that
  // the synchronous first-frame block (and the rAF loop) check
  // before flipping ready=true.
  let persistentCompileError = null;
  if (renderer.debug) {
    renderer.debug.checkShaderErrors = true;
    renderer.debug.onShaderError = function (glCtx, program, glVertexShader, glFragmentShader) {
      const log = glCtx.getProgramInfoLog(program) || '';
      const vlog = glCtx.getShaderInfoLog(glVertexShader) || '';
      const flog = glCtx.getShaderInfoLog(glFragmentShader) || '';
      const message =
        'Shader compile/link failed' +
        (log ? `\nprogram: ${log}` : '') +
        (vlog ? `\nvertex: ${vlog}` : '') +
        (flog ? `\nfragment: ${flog}` : '');
      persistentCompileError = message;
      emit({ ready: false, lost: false, error: message });
    };
  }

  // Shader ------------------------------------------------------------

  // Register the canvas context-loss listeners EARLY — before the
  // synchronous first-frame — so a `webglcontextlost` event fired
  // during compile / link / initial GL calls still reaches us.  The
  // handlers themselves are bound later in the closure (so they can
  // see all renderer state), but here we install a thin dispatcher
  // that no-ops until the real handler is attached.  This pattern
  // matches what Three does internally: register early, bind late.
  let onContextLost = function earlyLost() {
    // Real handler not yet attached — nothing meaningful to do.
    // Three's own listener ran first; the renderer's internal
    // _isContextLost flag is already true so any subsequent GL
    // calls fail gracefully.
  };
  let onContextRestored = function earlyRestored() {
    // Real handler not yet attached.  Three's own listener has
    // already re-initialised the GL context.  The post-setup bind
    // step will replace this stub.
  };
  function dispatchLost(ev) { onContextLost(ev); }
  function dispatchRestored(ev) { onContextRestored(ev); }
  canvas.addEventListener('webglcontextlost', dispatchLost, false);
  canvas.addEventListener('webglcontextrestored', dispatchRestored, false);

  const fragmentShader = raytraceFragmentSource;
  const uniforms = {
    u_resolution:        { value: new THREE.Vector2(1, 1) },
    u_pixelAspect:       { value: 1.0 },
    u_cameraPos:         { value: new THREE.Vector3() },
    u_cameraRight:       { value: new THREE.Vector3(1, 0, 0) },
    u_cameraUp:          { value: new THREE.Vector3(0, 1, 0) },
    u_cameraForward:     { value: new THREE.Vector3(0, 0, -1) },
    u_cameraFovY:        { value: 46 * Math.PI / 180 },
    u_time:              { value: 0 },
    u_quality:           { value: QUALITY_TO_INT[store.getState().quality] ?? 1 },
    u_debug:             { value: store.getState().debug },

    u_cameraDistance:    { value: 22 },
    u_cameraAzimuth:     { value: 32 * Math.PI / 180 },
    u_cameraElevation:   { value: 24 * Math.PI / 180 },

    u_diskInner:         { value: 3 },
    u_diskOuter:         { value: 11 },
    u_diskHalfThickness: { value: 0.16 },
    u_diskTemperature:   { value: 1 },
    u_diskEmission:      { value: 1.2 },
    u_orbitalSpeed:      { value: 1 },
    u_turbulenceAmplitude:{ value: 0.35 },
    u_turbulenceSpeed:   { value: 0.7 },
    u_starDensity:       { value: 1 },
    u_galaxyBrightness:  { value: 0.7 },

    u_bloomIntensity:    { value: 0.65 },
    u_bloomThreshold:    { value: 1.2 },

    u_maxSteps:          { value: 176 },
    u_maxCrossings:      { value: 3 },
    u_pixelScale:        { value: 0.72 },
  };

  // RawShaderMaterial passes the shaders through verbatim; glslVersion=null
  // (the default) keeps both shaders in legacy GLSL ES 1.0 syntax against a
  // WebGL2 context, which matches what raytrace.glsl emits.
  const material = new THREE.RawShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });

  const geometry = buildFullscreenTriangleGeometry();
  const scene = new THREE.Scene();
  // A pseudo "camera" used only by the orthographic renderer so we can
  // drive the triangle; no projection maths affects the shader.
  const orthoCamera = new THREE.Camera();
  const quad = new THREE.Mesh(geometry, material);
  quad.frustumCulled = false;
  scene.add(quad);

  // Camera + OrbitControls (used only to derive u_cameraPos/Fov/basis)
  const perspectiveCamera = new THREE.PerspectiveCamera(
    46,
    1,
    0.1,
    500,
  );
  perspectiveCamera.up.set(0, 1, 0);
  perspectiveCamera.position.set(0, 4, 22);
  perspectiveCamera.lookAt(0, 0, 0);

  const controls = new OrbitControls(perspectiveCamera, canvas);
  controls.enablePan = false;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1.0;
  controls.minDistance = 12;
  controls.maxDistance = 45;

  let storeUnsub = null;

  // Context-loss lifecycle: `lost` is true between `webglcontextlost`
  // and `webglcontextrestored`.  We keep this module's JS state
  // (camera, OrbitControls, uniforms, listeners, store subscription)
  // intact across the loss so the same configuration resumes the
  // moment the GPU is back.  Only GPU-bound resources (render targets,
  // any in-flight RAF) are torn down and rebuilt.
  let lost = false;
  let restoreFailure = null;

  // ---- post-process materials / targets -------------------------------
  // Bright pass: extracts pixels above u_threshold; output kept linear.
  const brightUniforms = {
    u_hdr:        { value: null },
    u_texelSize:  { value: new THREE.Vector2(1, 1) },
    u_threshold:  { value: 1.2 },
    u_intensity:  { value: 1.0 },
    u_debug:      { value: 0 },
  };
  const brightMaterial = new THREE.RawShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: brightFragmentSource,
    uniforms: brightUniforms,
    depthTest: false,
    depthWrite: false,
  });

  // Separable Gaussian blur (used twice — horizontal + vertical).
  // u_radius scales the per-tap texel offset; widen it to spread the
  // soft-knee halo so bloom is visually obvious after ACES + sRGB.
  const blurUniforms = {
    u_src:       { value: null },
    u_direction: { value: new THREE.Vector2(1, 0) },
    u_texelSize: { value: new THREE.Vector2(1, 1) },
    u_taps:      { value: 9 },
    u_radius:    { value: 2.5 },
  };
  const blurMaterial = new THREE.RawShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: blurFragmentSource,
    uniforms: blurUniforms,
    depthTest: false,
    depthWrite: false,
  });

  // Composite: HDR + bloom + exposure + ACES + vignette + grain + CA + sRGB.
  const compositeUniforms = {
    u_hdr:         { value: null },
    u_bloom:       { value: null },
    u_resolution:  { value: new THREE.Vector2(1, 1) },
    u_exposure:    { value: 1.0 },
    u_vignette:    { value: 0.18 },
    u_grain:       { value: 0.025 },
    u_chromatic:   { value: 0.4 },
    u_bloomAmount: { value: 1.0 },
    u_debug:       { value: 0 },
  };
  const compositeMaterial = new THREE.RawShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: compositeFragmentSource,
    uniforms: compositeUniforms,
    depthTest: false,
    depthWrite: false,
  });

  // Pass scene: every fullscreen pass uses the same triangle geometry and
  // a dummy ortho camera; we share the geometry to avoid duplicate uploads.
  // The postQuad's material is swapped per pass — that swap is what
  // triggers Three to lazily link each post-process program the first
  // time it renders, so the very first frame actually compiles AND
  // draws every material in one synchronous pass.  No compileAsync
  // queue, no setTimeout polling, no race against StrictMode's
  // double-mount/dispose of the renderer.
  const postScene = new THREE.Scene();
  const postCamera = new THREE.Camera();
  const postQuad = new THREE.Mesh(geometry, brightMaterial);
  postQuad.frustumCulled = false;
  postScene.add(postQuad);

  // Render targets.  HDR is HalfFloat linear; bright / blur targets are
  // also HalfFloat so the chain stays in linear space end to end.
  // Blur targets are half-resolution in each dimension.
  let hdrTarget = null;
  let brightTarget = null;
  let blurHTarget = null;   // horizontal pass output (vertical input)
  let blurVTarget = null;   // vertical pass output (composite input)

  function makeHalfFloatTarget(w, h) {
    return new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
    });
  }

  function disposeTarget(t) {
    if (!t) return;
    try { t.dispose(); } catch (_) {}
  }

  function recreateTargets(pxW, pxH) {
    disposeTarget(hdrTarget);
    disposeTarget(brightTarget);
    disposeTarget(blurHTarget);
    disposeTarget(blurVTarget);
    hdrTarget     = makeHalfFloatTarget(pxW, pxH);
    brightTarget  = makeHalfFloatTarget(pxW, pxH);
    // Blur targets at half scene resolution.
    const bw = Math.max(1, Math.floor(pxW / 2));
    const bh = Math.max(1, Math.floor(pxH / 2));
    blurHTarget = makeHalfFloatTarget(bw, bh);
    blurVTarget = makeHalfFloatTarget(bw, bh);
  }

  // ---- size handling ------------------------------------------------
  let disposed = false;

  function coarsePointer() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    try { return window.matchMedia('(pointer: coarse)').matches; }
    catch (_) { return false; }
  }

  function maxDevicePixelRatio() {
    return coarsePointer() ? 1.5 : 2.0;
  }

  function effectiveDpr() {
    return Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio());
  }

  function applyQualityUniforms(quality) {
    const budgets = store.getQualityBudget();
    uniforms.u_maxSteps.value = budgets.maxSteps;
    uniforms.u_maxCrossings.value = budgets.maxCrossings;
    uniforms.u_pixelScale.value = budgets.scale;
    blurUniforms.u_taps.value = budgets.bloomTaps;
    const qInt = QUALITY_TO_INT[quality] ?? 1;
    if (uniforms.u_quality.value !== qInt) uniforms.u_quality.value = qInt;
  }

  function applyConfig() {
    const config = store.getConfigSnapshot();
    const p = config.parameters;
    uniforms.u_diskInner.value = p.diskInner;
    uniforms.u_diskOuter.value = p.diskOuter;
    uniforms.u_diskHalfThickness.value = p.diskHalfThickness;
    uniforms.u_diskTemperature.value = p.diskTemperature;
    uniforms.u_diskEmission.value = p.diskEmission;
    uniforms.u_orbitalSpeed.value = p.orbitalSpeed;
    uniforms.u_turbulenceAmplitude.value = p.turbulenceAmplitude;
    uniforms.u_turbulenceSpeed.value = p.turbulenceSpeed;
    uniforms.u_starDensity.value = p.starDensity;
    uniforms.u_galaxyBrightness.value = p.galaxyBrightness;
    brightUniforms.u_threshold.value = p.bloomThreshold;
    brightUniforms.u_intensity.value = 1.0; // raw extract; composite scales by amount
    compositeUniforms.u_exposure.value  = p.exposure;
    compositeUniforms.u_vignette.value  = p.vignette;
    compositeUniforms.u_grain.value     = p.grain;
    compositeUniforms.u_chromatic.value = p.chromaticAberration;
    compositeUniforms.u_bloomAmount.value = p.bloomIntensity;
    uniforms.u_bloomIntensity.value = p.bloomIntensity;
    uniforms.u_bloomThreshold.value = p.bloomThreshold;
    uniforms.u_cameraFovY.value = p.fov * Math.PI / 180;
    brightUniforms.u_debug.value = config.debug;
    compositeUniforms.u_debug.value = config.debug;
    if (uniforms.u_debug.value !== config.debug) {
      uniforms.u_debug.value = config.debug;
    }
    applyQualityUniforms(config.quality);
  }
  applyConfig();

  // Pull every time-dependent value (URL-supplied `time`, status, etc.)
  // out of the store BEFORE the first synchronous render so that the
  // first painted frame already matches what the capture URL expects.
  // Previously this happened only after the store subscribe fired,
  // meaning the "ready" pixel buffer corresponded to u_time=0 while
  // the next frame jumped to 12.5 — fatal for `capture=1` screenshot
  // determinism across reloads.
  function applyClockAndStatus() {
    const snap = store.getState();
    uniforms.u_time.value = snap.time;
  }
  applyClockAndStatus();

  // Sync store config -> camera on mount.  Module 3 keeps this in sync
  // with presets / url params.
  function applyCameraFromStore() {
    const p = store.getConfigSnapshot().parameters;
    const dist = p.cameraDistance;
    const az = p.azimuth * Math.PI / 180;
    const el = p.elevation * Math.PI / 180;
    const x = dist * Math.cos(el) * Math.sin(az);
    const y = dist * Math.sin(el);
    const z = dist * Math.cos(el) * Math.cos(az);
    perspectiveCamera.position.set(x, y, z);
    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.fov = p.fov;
    perspectiveCamera.updateProjectionMatrix();
    controls.update();
  }
  applyCameraFromStore();

  // Forward OrbitControls changes to store.  During the cinematic
  // loop we drive the camera directly so we set a flag to suppress
  // the store write that would otherwise loop back through the
  // subscribe handler and reset the cinematic offset.
  let suppressControlSync = false;
  controls.addEventListener('change', () => {
    if (suppressControlSync) return;
    if (!perspectiveCamera || !controls) return;
    const pos = perspectiveCamera.position;
    const r = pos.length();
    if (!(r > 0)) return;
    const azimuth = Math.atan2(pos.x, pos.z) * 180 / Math.PI;
    const elevation = Math.asin(Math.max(-1, Math.min(1, pos.y / r))) * 180 / Math.PI;
    store.setCameraFromControls({
      fov: perspectiveCamera.fov,
      cameraDistance: Math.max(12, Math.min(45, r)),
      azimuth,
      elevation,
    });
  });

  // Subscribe to store config changes to keep the camera aligned when
  // other sources (presets, sliders) update parameters.  Wrap the
  // `controls.update()` call with `suppressControlSync` so the
  // change listener does not write the camera we just programmed
  // back into the store (which would clobber preset tracking).
  //
  // We compare against the *previous* configuration snapshot rather
  // than recomputing the camera every notification; this lets
  // `advanceTime` (which emits time-only snapshots at ~1Hz without
  // invalidating the config) skip the camera-alignment branch
  // entirely and let the cinematic loop keep its offset.
  let prevConfig = null;
  storeUnsub = store.subscribe((next) => {
    const p = next.parameters;
    const cfgChanged = !prevConfig ||
      prevConfig.parameters.azimuth !== p.azimuth ||
      prevConfig.parameters.elevation !== p.elevation ||
      prevConfig.parameters.cameraDistance !== p.cameraDistance ||
      Math.abs(prevConfig.parameters.fov - p.fov) > 0.05;
    if (cfgChanged) {
      const dist = Math.max(12, Math.min(45, p.cameraDistance));
      const az = p.azimuth * Math.PI / 180;
      const el = p.elevation * Math.PI / 180;
      const expectedX = dist * Math.cos(el) * Math.sin(az);
      const expectedY = dist * Math.sin(el);
      const expectedZ = dist * Math.cos(el) * Math.cos(az);
      const curr = perspectiveCamera.position;
      const tolerance = 0.02;
      if (
        Math.abs(curr.x - expectedX) > tolerance ||
        Math.abs(curr.y - expectedY) > tolerance ||
        Math.abs(curr.z - expectedZ) > tolerance ||
        Math.abs(perspectiveCamera.fov - p.fov) > 0.05
      ) {
        suppressControlSync = true;
        try {
          curr.set(expectedX, expectedY, expectedZ);
          perspectiveCamera.fov = p.fov;
          perspectiveCamera.updateProjectionMatrix();
          controls.update();
        } finally {
          suppressControlSync = false;
        }
      }
    }
    prevConfig = next;
    // Pull every parameter, post-process uniform and debug/quality
    // setting from the snapshot.  The store only notifies on real
    // changes, so this is cheap.
    applyConfig();
    uniforms.u_time.value = next.time;
  });

  // ---- resize ------------------------------------------------------
  // The canvas's CSS box is controlled entirely by styles.css (100% of
  // the layout container).  The renderer only writes `canvas.width` /
  // `canvas.height` (the GL framebuffer size, in device pixels) and
  // lets CSS handle the layout size.  We rebuild render targets only
  // when DPR, scale or the container's CSS size actually change, so
  // shrinking the viewport from 1440 to 390 collapses the render
  // targets to the new container dimensions on the next frame.
  let lastDpr = -1;
  let lastCssW = -1;
  let lastCssH = -1;
  let lastScale = -1;

  function resize() {
    if (disposed) return;
    // While lost we cannot touch the renderer, but we still want the
    // cheap logical updates (resolution/aspect uniform) to be queued so
    // the post-restore render uses the latest dimensions.  Skip the
    // physical block — the restore handler re-runs resize() with a
    // fresh fingerprint.
    const lostNow = lost;
    const cssWidth = Math.max(1, canvas.clientWidth || canvas.width);
    const cssHeight = Math.max(1, canvas.clientHeight || canvas.height);
    const scale = uniforms.u_pixelScale.value || 1.0;
    const dpr = effectiveDpr();
    const pxW = Math.max(1, Math.round(cssWidth * dpr * scale));
    const pxH = Math.max(1, Math.round(cssHeight * dpr * scale));

    // Cheap logical updates: cheap to repeat every frame.
    uniforms.u_resolution.value.set(pxW, pxH);
    uniforms.u_pixelAspect.value = pxH / Math.max(pxW, 1);
    const aspect = pxW / Math.max(pxH, 1);
    if (Math.abs(perspectiveCamera.aspect - aspect) > 1e-4) {
      perspectiveCamera.aspect = aspect;
      perspectiveCamera.updateProjectionMatrix();
    }

    // Fingerprint: only when this changes do we touch the canvas
    // backing store, call setSize (which mutates WebGL state) or
    // reallocate render targets.
    const physicalChanged =
      canvas.width !== pxW ||
      canvas.height !== pxH ||
      lastDpr !== dpr ||
      lastCssW !== cssWidth ||
      lastCssH !== cssHeight ||
      lastScale !== scale;
    if (physicalChanged && !lostNow) {
      // Note: we DO NOT touch canvas.style.width/height — CSS controls
      // the layout box.  We only set the framebuffer pixel dimensions.
      canvas.width = pxW;
      canvas.height = pxH;
      renderer.setPixelRatio(1.0);
      renderer.setSize(pxW, pxH, false);
      recreateTargets(pxW, pxH);
      lastDpr = dpr;
      lastCssW = cssWidth;
      lastCssH = cssHeight;
      lastScale = scale;
    }

    // Uniforms that depend on the current target sizes — safe to write
    // every frame, even when the targets themselves were just rebuilt.
    if (brightTarget) {
      brightUniforms.u_texelSize.value.set(1 / brightTarget.width,
                                           1 / brightTarget.height);
    }
    if (blurHTarget) {
      blurUniforms.u_texelSize.value.set(1 / blurHTarget.width,
                                         1 / blurHTarget.height);
    }
    compositeUniforms.u_resolution.value.set(pxW, pxH);
  }

  const ro = (typeof ResizeObserver !== 'undefined')
    ? new ResizeObserver(() => resize())
    : null;
  if (ro) ro.observe(canvas);
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);

  // ---- render ------------------------------------------------------
  // Reusable scratch vectors — `updateCameraUniforms` is called every
  // frame so we avoid allocating new Vector3 instances each call.
  const _scratchRight = new THREE.Vector3();
  const _scratchUp = new THREE.Vector3();
  const _scratchFwd = new THREE.Vector3();

  function updateCameraUniforms() {
    const camera = perspectiveCamera;
    _scratchRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    _scratchUp.set(0, 1, 0).applyQuaternion(camera.quaternion);
    _scratchFwd.set(0, 0, -1).applyQuaternion(camera.quaternion);
    uniforms.u_cameraPos.value.copy(camera.position);
    uniforms.u_cameraRight.value.copy(_scratchRight).normalize();
    uniforms.u_cameraUp.value.copy(_scratchUp).normalize();
    uniforms.u_cameraForward.value.copy(_scratchFwd).normalize();
  }

  // Helper: run a fullscreen pass with `material` writing into `target`.
  function runPass(material, target) {
    postQuad.material = material;
    renderer.setRenderTarget(target);
    renderer.render(postScene, postCamera);
  }

  let ready = false;
  let firstFramePainted = false;
  let raf = 0;

  function renderPipeline() {
    if (disposed) return;
    // While the context is lost the GL state is invalid; skip without
    // touching the renderer.  Targets will be reallocated on restore.
    if (lost) return;
    if (!hdrTarget || !brightTarget || !blurHTarget || !blurVTarget) return;

    // 1) Raytrace -> HDR target (linear half-float).
    renderer.setRenderTarget(hdrTarget);
    renderer.clear(true, true, true);
    renderer.render(scene, orthoCamera);

    // 2) Bright pass: HDR -> bright target.
    brightUniforms.u_hdr.value = hdrTarget.texture;
    runPass(brightMaterial, brightTarget);

    // 3) Horizontal blur: bright -> blurH (half-res).
    blurUniforms.u_src.value = brightTarget.texture;
    blurUniforms.u_direction.value.set(1, 0);
    blurUniforms.u_texelSize.value.set(1 / Math.max(blurHTarget.width, 1),
                                       1 / Math.max(blurHTarget.height, 1));
    runPass(blurMaterial, blurHTarget);

    // 4) Vertical blur: blurH -> blurV (half-res).
    blurUniforms.u_src.value = blurHTarget.texture;
    blurUniforms.u_direction.value.set(0, 1);
    runPass(blurMaterial, blurVTarget);

    // 5) Present to screen.
    const debugMode = (uniforms.u_debug.value | 0);
    renderer.setRenderTarget(null);
    if (debugMode === 9) {
      // Threshold bright pass: composite's debug=9 branch reads the
      // u_bloom texture (rebound to the raw bright target) and
      // visualises the soft-knee extraction; no beauty steps run on
      // that branch.
      compositeUniforms.u_hdr.value = hdrTarget.texture;
      compositeUniforms.u_bloom.value = brightTarget.texture;
    } else {
      // debug 0..8: composite samples the HDR raytrace target.  The
      // raytrace shader's own u_debug branch produces the diagnostic
      // colour for 1..8, and the beauty pipeline handles 0.
      compositeUniforms.u_hdr.value = hdrTarget.texture;
      compositeUniforms.u_bloom.value = blurVTarget.texture;
    }
    runPass(compositeMaterial, null);
  }

  // Cinematic loop: rotate camera azimuth slowly when the user hasn't
  // taken manual control (no recent orbit drag, dolly, or touch).  The
  // rotation runs on the local camera so we don't write to the store
  // or localStorage every frame; OrbitControls still picks up the
  // updated position when `controls.update()` runs, so the shader
  // uniforms see the new camera state immediately.
  //
  // Fresh-page behaviour: cinematic starts as soon as the renderer is
  // up.  After the first user interaction, a 2-second cooldown gates
  // cinematic resumption so the user's chosen camera isn't yanked.
  let hasInteracted = false;
  let lastUserInteraction = 0;
  let cinematicActive = false;
  let cinematicAzimuthOffset = 0;
  const USER_INTERACTION_COOLDOWN = 2.0; // seconds
  const CINEMATIC_RADIANS_PER_SEC = 0.04;

  function markUserInteraction() {
    if (suppressControlSync) return;
    hasInteracted = true;
    lastUserInteraction = performance.now();
    cinematicActive = false;
    cinematicAzimuthOffset = 0;
  }
  controls.addEventListener('start', markUserInteraction);
  controls.addEventListener('change', markUserInteraction);
  canvas.addEventListener('wheel', markUserInteraction, { passive: true });
  canvas.addEventListener('pointerdown', markUserInteraction);
  canvas.addEventListener('touchstart', markUserInteraction, { passive: true });

  let lastFrameTime = performance.now();

  function frame() {
    if (disposed) return;
    // While the GPU context is lost we must not advance time, drive
    // OrbitControls, or call into the renderer — the latter throws
    // INVALID_OPERATION on most drivers.  Just idle until the context
    // comes back; the listener below schedules the next frame.
    if (lost) return;
    const now = performance.now();
    const dtMs = now - lastFrameTime;
    lastFrameTime = now;
    const dtSec = Math.min(0.1, dtMs / 1000);
    const state = store.getState();
    const cfg = store.getConfigSnapshot();

    // Time advancement: when playing and not capturing, advance the
    // shared simulation clock by timeScale * dt.  The store internally
    // throttles notifications to ~1Hz so React subscribers and
    // localStorage are not hammered every frame; we also keep the
    // shader uniform in sync directly for the in-between frames.
    if (state.playing && !state.capture) {
      const ts = cfg.parameters.timeScale;
      if (ts > 0) {
        uniforms.u_time.value += ts * dtSec;
        store.advanceTime(ts * dtSec);
      }
    }

    // Cinematic azimuth rotation: only when the user is idle, playing,
    // and not in capture mode.  The rotation is applied directly to the
    // camera position; we suppress the OrbitControls change listener
    // so the store doesn't get hammered with per-frame writes (and the
    // preset isn't marked custom).  OrbitControls still picks up the
    // updated position when `controls.update()` runs, so damping and
    // input handlers remain coherent.
    //
    // On a fresh page (no user interaction yet) the cooldown is
    // skipped so cinematic starts immediately.
    const idle = !hasInteracted ||
      ((now - lastUserInteraction) > USER_INTERACTION_COOLDOWN * 1000);
    const shouldCinematic = state.playing && !state.capture && idle;
    if (shouldCinematic) {
      // Reset offset when transitioning into cinematic so a recent
      // user drag doesn't suddenly re-apply a stale offset.
      if (!cinematicActive) {
        cinematicAzimuthOffset = 0;
      }
      cinematicActive = true;
      cinematicAzimuthOffset += CINEMATIC_RADIANS_PER_SEC * dtSec;
      const pos = perspectiveCamera.position;
      const r = pos.length();
      if (r > 0) {
        const azBase = (cfg.parameters.azimuth * Math.PI / 180);
        const el = (cfg.parameters.elevation * Math.PI / 180);
        const az = azBase + cinematicAzimuthOffset;
        suppressControlSync = true;
        try {
          pos.x = r * Math.cos(el) * Math.sin(az);
          pos.y = r * Math.sin(el);
          pos.z = r * Math.cos(el) * Math.cos(az);
        } catch (_) { /* defensive */ }
      }
    } else if (cinematicActive && (!state.playing || state.capture || !idle)) {
      cinematicActive = false;
      cinematicAzimuthOffset = 0;
    }

    // controls.update() can fire 'change' if it detects the position
    // moved (which we just did).  Keep the suppression flag set
    // through the update call so the change handler doesn't write the
    // cinematic-rotated camera back into the store.
    try {
      controls.update();
    } finally {
      suppressControlSync = false;
    }
    updateCameraUniforms();
    // `resize()` is cheap when the scene resolution has not changed —
    // it only allocates new GPU resources when scale/DPR/CSS size move.
    // Calling it every frame guarantees that quality changes (which
    // update `u_pixelScale` via applyConfig) propagate to the render
    // targets on the very next frame.
    resize();
    try {
      renderPipeline();
    } catch (err) {
      emit({ ready: false, lost: false, error: String(err && err.message || err) });
      disposed = true;
      return;
    }
    // onShaderError tripped during this frame (e.g. a program the
    // first frame did not exercise, or a hot-reloaded shader).
    // Halt the loop and report; never re-emit ready.
    if (persistentCompileError) {
      emit({ ready: false, lost: false, error: persistentCompileError });
      disposed = true;
      return;
    }
    if (!firstFramePainted) {
      firstFramePainted = true;
      ready = true;
      emit({ ready: true, lost: false });
    }
    raf = requestAnimationFrame(frame);
  }

  // Synchronous first-frame: compile every program by actually running
  // the pipeline once, then mark ready only if no compile error fired.
  // We deliberately avoid renderer.compileAsync() + setTimeout polling
  // because that path races with StrictMode's double-mount/dispose
  // and Three's internal `checkMaterialsReady` then touches disposed
  // programs, throwing "Cannot read properties of undefined
  // (reading 'isReady')".  Doing the work synchronously here means
  // any compile/link failure trips onShaderError *before* the rAF
  // loop is started, and only a clean first frame ever sets ready.
  try {
    resize();
    updateCameraUniforms();
    // Render the full pipeline once — this compiles the raytrace
    // program (via the raytrace scene), bright/blur/composite
    // programs (via postQuad.material swaps in renderPipeline), and
    // produces a real pixel buffer.  Any GLSL failure flows through
    // `onShaderError` synchronously.
    renderPipeline();
    if (persistentCompileError) {
      // A shader program failed to compile/link; surface the error
      // and stop.  Never mark ready in this case.
      emit({ ready: false, lost: false, error: persistentCompileError });
      return { renderNow() {}, dispose() {} };
    }
    // First frame painted cleanly — commit ready and start the loop.
    firstFramePainted = true;
    ready = true;
    emit({ ready: true, lost: false });
  } catch (err) {
    // Synchronous render failure (uniform link error, GL lost, etc.).
    emit({ ready: false, lost: false, error: String(err && err.message || err) });
    return { renderNow() {}, dispose() {} };
  }

  raf = requestAnimationFrame(frame);

  // ---- context loss / restore ----------------------------------------
  // Browsers emit `webglcontextlost` when the GPU is reclaimed (tab
  // background, OS pressure, driver reset, ANGLE fallback).  The
  // event is *not* preventable unless we call preventDefault(), and
  // even then most browsers will not let us hold the context forever;
  // what preventDefault() buys us is a guaranteed `restore` event
  // once the page is foregrounded again.  We tear down only the GPU
  // resources and pause animation, but keep all JS-side state (camera,
  // OrbitControls, uniforms, listeners, store subscription) so the
  // exact same configuration resumes the moment the context comes
  // back.  No reload.
  //
  // Three's renderer registers its own context listeners; we run
  // AFTER it (we register later) so the renderer's internal
  // _isContextLost flag is already true by the time our handler
  // runs.  The inverse ordering applies on restore.  The listeners
  // themselves were installed earlier in `createRaytracer` so a
  // context-lost event fired during the synchronous first-frame still
  // reaches us (it would otherwise hit the early-return path and be
  // missed entirely).  Here we just bind the real handler bodies.
  onContextLost = function (event) {
    if (disposed) return;
    if (typeof event.preventDefault === 'function') event.preventDefault();
    // Cancel the in-flight rAF immediately so we never call into the
    // renderer with an invalid context.
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    lost = true;
    restoreFailure = null;
    // Discard render targets — their backing textures are about to be
    // invalidated by the browser.  Setting them null makes the next
    // resize() rebuild fresh ones.  We deliberately do NOT dispose
    // the Three renderer; it remains attached to the canvas so its
    // internal _gl reference stays valid for the restore event.
    disposeTarget(hdrTarget);
    disposeTarget(brightTarget);
    disposeTarget(blurHTarget);
    disposeTarget(blurVTarget);
    hdrTarget = brightTarget = blurHTarget = blurVTarget = null;
    // Invalidate resize cache so the first post-restore call rebuilds
    // targets at the current dimensions instead of skipping due to a
    // stale fingerprint match.
    lastDpr = -1;
    lastCssW = -1;
    lastCssH = -1;
    lastScale = -1;
    firstFramePainted = false;
    ready = false;
    emit({
      ready: false,
      lost: true,
      error: 'WebGL context lost — auto-restoring.',
    });
  };

  onContextRestored = function () {
    if (disposed) return;
    if (!lost) return; // Three may dispatch restore in odd sequences; idempotent.
    lost = false;
    // The renderer's internal programs were invalidated by the
    // browser; onShaderError may now fire for programs that were
    // lazily compiled before the loss.  Reset the flag so a single
    // successful compile after restore counts as a clean pass.
    persistentCompileError = null;
    try {
      // Recompile every program by running the full pipeline once.
      // resize() rebuilds targets; renderPipeline() forces Three to
      // re-link the raytrace / bright / blur / composite programs.
      resize();
      updateCameraUniforms();
      renderPipeline();
      if (persistentCompileError) {
        restoreFailure = persistentCompileError;
        ready = false;
        emit({ ready: false, lost: false, error: persistentCompileError });
        return;
      }
      firstFramePainted = true;
      ready = true;
      restoreFailure = null;
      // Reset the time delta accumulator so the resumed rAF doesn't
      // see a giant dt and skip cinematic rotation forward by minutes.
      lastFrameTime = performance.now();
      emit({ ready: true, lost: false });
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    } catch (err) {
      restoreFailure = String(err && err.message || err);
      ready = false;
      emit({
        ready: false,
        lost: false,
        error: 'WebGL context restore failed: ' + restoreFailure,
      });
    }
  };

  function renderNow() {
    if (disposed) return;
    if (lost) return;
    resize();
    updateCameraUniforms();
    try {
      renderPipeline();
    } catch (err) {
      emit({ ready: false, lost: false, error: String(err && err.message || err) });
    }
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    lost = true; // suppress any racing frame() and any late restore
    window.removeEventListener('resize', resize);
    window.removeEventListener('orientationchange', resize);
    canvas.removeEventListener('webglcontextlost', dispatchLost, false);
    canvas.removeEventListener('webglcontextrestored', dispatchRestored, false);
    if (ro) { try { ro.disconnect(); } catch (_) {} }
    if (storeUnsub) { try { storeUnsub(); } catch (_) {} storeUnsub = null; }
    try { geometry.dispose(); } catch (_) {}
    try { material.dispose(); } catch (_) {}
    try { brightMaterial.dispose(); } catch (_) {}
    try { blurMaterial.dispose(); } catch (_) {}
    try { compositeMaterial.dispose(); } catch (_) {}
    disposeTarget(hdrTarget);
    disposeTarget(brightTarget);
    disposeTarget(blurHTarget);
    disposeTarget(blurVTarget);
    hdrTarget = brightTarget = blurHTarget = blurVTarget = null;
    try { renderer.dispose(); } catch (_) {}
    try { controls.dispose(); } catch (_) {}
    emit({ ready: false, lost: true });
  }

  return { renderNow, dispose };
}
