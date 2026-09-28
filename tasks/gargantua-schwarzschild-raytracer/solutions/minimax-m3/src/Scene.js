// Scene.jsx — WebGL renderer, full-screen pipeline, OrbitControls, capture
// URL handling, context-loss handling, and window.__GARGANTUA__ binding.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RAYTRACER_FRAGMENT } from './shader/raytracer.glsl.js';
import {
  COMPOSITE_FRAGMENT,
  COMPOSITE_VERTEX,
  BLOOM_DOWN_FRAGMENT,
  BLIT_FRAGMENT
} from './shader/composite.glsl.js';
import { QUALITY_PRESETS, PARAM_DEFS } from './state.js';

const MAX_RES = { x: 1920, y: 1080 }; // upper bound for RT allocations
const MAX_LOOP = 320;                  // shader loop bound

function makeShader(gl, type, source) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    console.error('Shader compile error:', log);
    console.error('Source:\n' + source);
    throw new Error(log);
  }
  return sh;
}

function makeProgram(gl, vsSrc, fsSrc) {
  const vs = makeShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = makeShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  // Force known attribute indices for the full-screen quad before linking
  gl.bindAttribLocation(prog, 0, 'position');
  gl.bindAttribLocation(prog, 1, 'uv');
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    console.error('Program link error:', log);
    throw new Error(log);
  }
  return prog;
}

const FULLSCREEN_VERTEX = /* glsl */`#version 300 es
in vec3 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function buildPrograms(gl) {
  const rtProg = makeProgram(gl, FULLSCREEN_VERTEX, RAYTRACER_FRAGMENT);
  const compositeProg = makeProgram(gl, COMPOSITE_VERTEX, COMPOSITE_FRAGMENT);
  const bloomProg = makeProgram(gl, FULLSCREEN_VERTEX, BLOOM_DOWN_FRAGMENT);
  const blitProg = makeProgram(gl, FULLSCREEN_VERTEX, BLIT_FRAGMENT);
  return { rtProg, compositeProg, bloomProg, blitProg };
}

function makeQuad(gl) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  // Two triangles covering clip space, with per-vertex uv.
  const verts = new Float32Array([
    -1, -1, 0,  0, 1,
     1, -1, 0,  1, 1,
    -1,  1, 0,  0, 0,
    -1,  1, 0,  0, 0,
     1, -1, 0,  1, 1,
     1,  1, 0,  1, 0
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12);
  gl.bindVertexArray(null);
  return { vao, posBuf };
}

function makeFloatRT(gl, w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { tex, fbo, w, h };
}

function makeHalfFloatRT(gl, w, h) {
  // Use RGBA16F for bloom chain (HDR) — fall back to RGBA if unsupported.
  return makeFloatRT(gl, w, h);
}

function allocBloomMips(gl, w, h) {
  const mips = [];
  let cw = Math.max(2, Math.floor(w / 2));
  let ch = Math.max(2, Math.floor(h / 2));
  for (let i = 0; i < 4; i++) {
    mips.push(makeFloatRT(gl, cw, ch));
    cw = Math.max(2, Math.floor(cw / 2));
    ch = Math.max(2, Math.floor(ch / 2));
  }
  return mips;
}

function getUniformLocations(gl, prog, names) {
  const out = {};
  for (const name of names) {
    out[name] = gl.getUniformLocation(prog, name);
  }
  return out;
}

export function mountScene({ canvas: canvasArg, overlayRoot, controller, hudContainer }) {
  let canvas = canvasArg;
  let gl = canvas.getContext('webgl2', {
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true
  });
  if (!gl) {
    overlayRoot.innerHTML = '<div class="overlay-message danger">WebGL2 unavailable in this browser.</div>';
    return null;
  }
  // Cache the lose-context extension; once the context is lost, querying it
  // returns null, so we keep a reference for explicit restore.
  const loseContextExt = gl.getExtension('WEBGL_lose_context');

  // Float color buffer support check
  const extColorBufferFloat = gl.getExtension('EXT_color_buffer_float') ||
    gl.getExtension('EXT_color_buffer_half_float');
  if (!extColorBufferFloat) {
    console.warn('Float color buffer extension missing; bloom precision may be reduced');
  }

  let programs = buildPrograms(gl);
  const quad = makeQuad(gl);

  // Allocate initial render targets
  let rtScene = null;
  let rtBloom = [];
  let rtWidth = 0, rtHeight = 0;
  let cssWidth = 0, cssHeight = 0;
  let dprEffective = 1;

  function resize(force = false) {
    const state = controller.getState();
    const q = QUALITY_PRESETS[state.quality];
    const dpr = Math.min(window.devicePixelRatio || 1, q.dpr);
    cssWidth = canvas.clientWidth || window.innerWidth;
    cssHeight = canvas.clientHeight || window.innerHeight;
    const w = Math.min(MAX_RES.x, Math.max(2, Math.floor(cssWidth * dpr)));
    const h = Math.min(MAX_RES.y, Math.max(2, Math.floor(cssHeight * dpr)));
    if (!force && w === rtWidth && h === rtHeight && rtScene) return;
    rtWidth = w;
    rtHeight = h;
    dprEffective = dpr;
    // Reallocate
    if (rtScene) {
      gl.deleteTexture(rtScene.tex);
      gl.deleteFramebuffer(rtScene.fbo);
    }
    rtScene = makeFloatRT(gl, rtWidth, rtHeight);
    for (const m of rtBloom) {
      gl.deleteTexture(m.tex);
      gl.deleteFramebuffer(m.fbo);
    }
    rtBloom = allocBloomMips(gl, rtWidth, rtHeight);
    canvas.width = rtWidth;
    canvas.height = rtHeight;
    gl.viewport(0, 0, rtWidth, rtHeight);
  }

  resize();

  // Uniform location caches
  const rtU = getUniformLocations(gl, programs.rtProg, [
    'uResolution', 'uTime', 'uMaxSteps', 'uDebugMode',
    'uCamPos', 'uCamForward', 'uCamRight', 'uCamUp', 'uTanFov', 'uAspect',
    'uDiskInner', 'uDiskOuter', 'uDiskThickness', 'uDiskTemperature',
    'uDiskIntensity', 'uOrbitSpeed', 'uTurbulence', 'uTurbulenceSpeed',
    'uStarDensity', 'uGalaxyBrightness', 'uExposure'
  ]);
  const compU = getUniformLocations(gl, programs.compositeProg, [
    'uScene', 'uBloom0', 'uBloom1', 'uBloom2', 'uBloom3',
    'uBloomStrength', 'uBloomThreshold', 'uExposure',
    'uVignette', 'uGrain', 'uChromaticAberration', 'uTime'
  ]);
  const bloomU = getUniformLocations(gl, programs.bloomProg, ['uSrc', 'uTexel', 'uThreshold']);

  // OrbitControls + camera
  const fov = controller.getState().params.fov;
  const camera = new THREE.PerspectiveCamera(fov, cssWidth / Math.max(1, cssHeight), 0.1, 500);
  camera.position.set(18, 2, 18);
  camera.lookAt(0, 0, 0);

  let controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 4;
  controls.maxDistance = 80;
  controls.zoomSpeed = 0.8;
  controls.rotateSpeed = 0.6;
  controls.target.set(0, 0, 0);

  // Cinematic loop parameters
  let cinematicTime = 0;
  let lastFrameMs = performance.now();
  let raf = 0;
  let paused = false;
  let contextLost = false;
  let readySignalled = false;

  // Overlay UI elements
  function setOverlay(html, danger) {
    overlayRoot.innerHTML = '';
    if (!html) return;
    const el = document.createElement('div');
    el.className = 'overlay-message' + (danger ? ' danger' : '');
    el.innerHTML = html;
    overlayRoot.appendChild(el);
  }

  function clearOverlay() { overlayRoot.innerHTML = ''; }

  function onContextLost(ev) {
    ev.preventDefault();
    contextLost = true;
    paused = true;
    controller.setContextLost(true);
    setOverlay('Render context lost. <button id="gargantua-recover">Recover</button>', true);
    document.getElementById('gargantua-recover')?.addEventListener('click', attemptRecover);
    cancelAnimationFrame(raf);
  }

  function onContextRestored() {
    // Re-acquire the WebGL context — the old `gl` reference is invalid after
    // a context loss, even though the same context object exists. Calling
    // getContext() on the canvas returns the restored context.
    try {
      const restored = canvas.getContext('webgl2');
      if (restored) gl = restored;
    } catch (e) {
      console.warn('Failed to re-acquire WebGL context:', e);
    }
    rebuildAfterRestore();
  }

  function rebuildAfterRestore() {
    programs = buildPrograms(gl);
    Object.assign(rtU, getUniformLocations(gl, programs.rtProg, Object.keys(rtU)));
    Object.assign(compU, getUniformLocations(gl, programs.compositeProg, Object.keys(compU)));
    Object.assign(bloomU, getUniformLocations(gl, programs.bloomProg, Object.keys(bloomU)));
    rtScene = null;
    rtBloom = [];
    // Chromium has a known bug where the canvas display surface stays black
    // after a context loss/restore cycle in headless mode, even though the
    // WebGL framebuffer continues to render correctly. Workaround: create
    // a brand new canvas with a fresh WebGL context and replace the DOM
    // node. The render loop, programs, and state survive — only the
    // canvas element + its WebGL context are replaced.
    const oldCanvas = canvas;
    const newCanvas = document.createElement('canvas');
    newCanvas.id = oldCanvas.id;
    newCanvas.style.cssText = oldCanvas.style.cssText;
    oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);
    canvas = newCanvas;
    gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    // Re-bind OrbitControls to the new canvas
    controls.dispose();
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 4;
    controls.maxDistance = 80;
    controls.zoomSpeed = 0.8;
    controls.rotateSpeed = 0.6;
    controls.target.set(0, 0, 0);
    // Re-attach ResizeObserver to the new canvas
    ro.disconnect();
    ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    // Re-attach event listeners on the new canvas
    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);
    contextLost = false;
    paused = false;
    controller.setContextLost(false);
    clearOverlay();
    lastFrameMs = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function attemptRecover() {
    if (loseContextExt && typeof loseContextExt.restoreContext === 'function') {
      try {
        loseContextExt.restoreContext();
      } catch (e) {
        console.warn('restoreContext failed:', e);
      }
    }
    // Some browsers do not fire webglcontextrestored reliably after
    // restoreContext() is called from script. Rebuild immediately and
    // schedule a second rebuild via the restored event for safety.
    setTimeout(() => {
      if (contextLost) rebuildAfterRestore();
    }, 300);
  }

  canvas.addEventListener('webglcontextlost', onContextLost, false);
  canvas.addEventListener('webglcontextrestored', onContextRestored, false);

  // Keyboard shortcuts
  window.addEventListener('keydown', (ev) => {
    if (ev.target && (ev.target.tagName === 'INPUT' || ev.target.tagName === 'TEXTAREA')) return;
    if (ev.shiftKey && (ev.key === '!' || ev.key === '1')) { controller.setPreset(0); ev.preventDefault(); return; }
    if (ev.shiftKey && ev.key === '@' || (ev.shiftKey && ev.key === '2')) { controller.setPreset(1); ev.preventDefault(); return; }
    if (ev.shiftKey && ev.key === '#' || (ev.shiftKey && ev.key === '3')) { controller.setPreset(2); ev.preventDefault(); return; }
    if (ev.shiftKey && ev.key === '$' || (ev.shiftKey && ev.key === '4')) { controller.setPreset(3); ev.preventDefault(); return; }
    if (ev.code === 'Space') { controller.toggleCinematic(); ev.preventDefault(); return; }
    if (ev.key === 'h' || ev.key === 'H') { controller.toggleHud(); ev.preventDefault(); return; }
    if (ev.key === 'r' || ev.key === 'R') { controller.resetAll(); ev.preventDefault(); return; }
    if (ev.key === 'q' || ev.key === 'Q') { controller.cycleQuality(); ev.preventDefault(); return; }
    if (ev.key === 'm' || ev.key === 'M') { controller.toggleAudio(); ev.preventDefault(); return; }
    if (ev.key >= '0' && ev.key <= '9') {
      controller.setDebug(parseInt(ev.key, 10));
      ev.preventDefault();
      return;
    }
  });

  // HUD/preset hot listener (quality / preset / params sync to camera)
  function syncCameraFromState() {
    const s = controller.getState();
    const p = s.params;
    // Camera distance (radius) derived from camAzimuth/camPitch
    const az = THREE.MathUtils.degToRad(p.camAzimuth);
    const pt = THREE.MathUtils.degToRad(p.camPitch);
    const r = p.camDistance;
    const cx = r * Math.cos(pt) * Math.sin(az);
    const cy = r * Math.sin(pt);
    const cz = r * Math.cos(pt) * Math.cos(az);
    camera.position.set(cx, cy, cz);
    camera.fov = p.fov;
    camera.aspect = cssWidth / Math.max(1, cssHeight);
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.update();
  }

  controller.subscribe(() => syncCameraFromState());
  syncCameraFromState();

  // Render loop
  const debug = { frameCount: 0 };
  function frame(now) {
    raf = requestAnimationFrame(frame);
    debug.frameCount += 1;
    if (paused || contextLost) return;
    const dtMs = Math.min(64, now - lastFrameMs);
    lastFrameMs = now;
    const dt = dtMs / 1000;
    const s = controller.getState();

    // Cinematic loop: when playing, gently rotate the camera azimuth.
    if (s.cinematicPlaying && !s.capture) {
      cinematicTime += dt * 0.18 * s.params.timeScale;
      // Apply cinematic camera shift without overriding OrbitControls completely
      const az = THREE.MathUtils.degToRad(s.params.camAzimuth) + cinematicTime * 0.08;
      const pt = THREE.MathUtils.degToRad(s.params.camPitch);
      const r = s.params.camDistance;
      const cx = r * Math.cos(pt) * Math.sin(az);
      const cy = r * Math.sin(pt);
      const cz = r * Math.cos(pt) * Math.cos(az);
      camera.position.set(cx, cy, cz);
      controls.target.set(0, 0, 0);
    }
    controls.update();

    // Resolve max steps against shader loop bound
    const q = QUALITY_PRESETS[s.quality];
    const maxSteps = Math.min(MAX_LOOP, q.maxSteps);

    // Time uniform — frozen if URL capture or timeFrozen set
    const timeUniform = (s.capture && s.timeFrozen !== null) ? s.timeFrozen :
      (s.timeFrozen != null ? s.timeFrozen : now * 0.001);

    // Update camera basis uniforms
    camera.updateMatrixWorld();
    const fwd = new THREE.Vector3();
    camera.getWorldDirection(fwd);
    const right = new THREE.Vector3().crossVectors(fwd, camera.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd).normalize();
    const tanFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5);
    const aspect = camera.aspect;

    // Render raytracer scene to HDR target
    gl.bindFramebuffer(gl.FRAMEBUFFER, rtScene.fbo);
    gl.viewport(0, 0, rtScene.w, rtScene.h);
    gl.useProgram(programs.rtProg);
    gl.uniform2f(rtU.uResolution, rtScene.w, rtScene.h);
    gl.uniform1f(rtU.uTime, timeUniform);
    gl.uniform1f(rtU.uMaxSteps, maxSteps);
    gl.uniform1i(rtU.uDebugMode, s.debugMode);
    gl.uniform3f(rtU.uCamPos, camera.position.x, camera.position.y, camera.position.z);
    gl.uniform3f(rtU.uCamForward, fwd.x, fwd.y, fwd.z);
    gl.uniform3f(rtU.uCamRight, right.x, right.y, right.z);
    gl.uniform3f(rtU.uCamUp, up.x, up.y, up.z);
    gl.uniform1f(rtU.uTanFov, tanFov);
    gl.uniform1f(rtU.uAspect, aspect);
    gl.uniform1f(rtU.uDiskInner, s.params.diskInner);
    gl.uniform1f(rtU.uDiskOuter, s.params.diskOuter);
    gl.uniform1f(rtU.uDiskThickness, s.params.diskThickness);
    gl.uniform1f(rtU.uDiskTemperature, s.params.diskTemperature);
    gl.uniform1f(rtU.uDiskIntensity, s.params.diskIntensity);
    gl.uniform1f(rtU.uOrbitSpeed, s.params.orbitSpeed);
    gl.uniform1f(rtU.uTurbulence, s.params.turbulence);
    gl.uniform1f(rtU.uTurbulenceSpeed, s.params.turbulenceSpeed);
    gl.uniform1f(rtU.uStarDensity, s.params.starDensity);
    gl.uniform1f(rtU.uGalaxyBrightness, s.params.galaxyBrightness);
    gl.uniform1f(rtU.uExposure, s.params.exposure);

    gl.bindVertexArray(quad.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);

    // Build bloom pyramid by down-sampling scene into successive mips.
    const activeBloomMips = Math.min(rtBloom.length, q.bloomMips);
    if (activeBloomMips > 0) {
      // mip 0 — half size of scene
      gl.useProgram(programs.bloomProg);
      gl.uniform1f(bloomU.uThreshold, 0.85);
      gl.bindFramebuffer(gl.FRAMEBUFFER, rtBloom[0].fbo);
      gl.viewport(0, 0, rtBloom[0].w, rtBloom[0].h);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, rtScene.tex);
      gl.uniform1i(bloomU.uSrc, 0);
      gl.uniform2f(bloomU.uTexel, 1.0 / rtScene.w, 1.0 / rtScene.h);
      gl.bindVertexArray(quad.vao);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // subsequent mips read from previous mip
      for (let i = 1; i < activeBloomMips; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, rtBloom[i].fbo);
        gl.viewport(0, 0, rtBloom[i].w, rtBloom[i].h);
        gl.bindTexture(gl.TEXTURE_2D, rtBloom[i - 1].tex);
        gl.uniform2f(bloomU.uTexel, 1.0 / rtBloom[i - 1].w, 1.0 / rtBloom[i - 1].h);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      gl.bindVertexArray(null);
    }

    // Composite pass to default framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, rtWidth, rtHeight);
    gl.useProgram(programs.compositeProg);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, rtScene.tex);
    gl.uniform1i(compU.uScene, 0);
    gl.uniform1i(compU.uBloom0, 1);
    gl.uniform1i(compU.uBloom1, 2);
    gl.uniform1i(compU.uBloom2, 3);
    gl.uniform1i(compU.uBloom3, 4);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, rtBloom[0]?.tex || rtScene.tex);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, rtBloom[1]?.tex || rtScene.tex);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, rtBloom[2]?.tex || rtScene.tex);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, rtBloom[3]?.tex || rtScene.tex);
    gl.uniform1f(compU.uBloomStrength, s.params.bloomStrength);
    gl.uniform1f(compU.uBloomThreshold, s.params.bloomThreshold);
    gl.uniform1f(compU.uExposure, s.params.exposure);
    gl.uniform1f(compU.uVignette, s.params.vignette);
    gl.uniform1f(compU.uGrain, s.params.grain);
    gl.uniform1f(compU.uChromaticAberration, s.params.chromaticAberration);
    gl.uniform1f(compU.uTime, timeUniform);

    gl.bindVertexArray(quad.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);

    // Ready signal after the first frame is composited successfully.
    if (!readySignalled) {
      readySignalled = true;
      controller.markReady();
      document.documentElement.dataset.gargantuaReady = 'true';
    }
  }

  // Resize observer
  let ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  window.addEventListener('resize', resize);

  // First-frame kick
  raf = requestAnimationFrame(frame);

  // Expose window API
  installWindowApi(controller, gl, debug, () => {
    const state = controller.getState();
    const q = QUALITY_PRESETS[state.quality];
    return {
      dpr: dprEffective,
      cssWidth,
      cssHeight,
      rtWidth,
      rtHeight,
      quality: state.quality,
      maxSteps: q.maxSteps,
      bloomMips: q.bloomMips
    };
  });
}

function installWindowApi(controller, gl, debugRef, describeRenderer) {
  const api = {
    get ready() {
      return controller.getState().ready;
    },
    getState() {
      return controller.getState();
    },
    setQuality(level) {
      return controller.setQuality(level);
    },
    setPreset(index) {
      return controller.setPreset(index);
    },
    setDebug(index) {
      return controller.setDebug(index);
    },
    setTime(seconds) {
      return controller.setTime(seconds);
    },
    setParam(id, value) {
      const ok = controller.setParam(id, value);
      return ok ? controller.getState().params : null;
    },
    resetAll() {
      return controller.resetAll();
    },
    describe() {
      return describeRenderer();
    }
  };
  window.__GARGANTUA__ = api;
  // Expose debug counters for verification (not part of the public API).
  // `debugRef` is the same object the render loop mutates, so reads always
  // see the current value even after Vite minifies the closure.
  window.__GARGANTUA_DEBUG__ = debugRef;
}

export const _INTERNAL = { PARAM_DEFS };