import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { VERT, MAIN_FRAG, BRIGHT_FRAG, BLUR_FRAG, COMP_FRAG } from './shaders.js';
import { QUALITIES } from './state.js';

// Owns all GL resources. Camera + simulation state live here so a context
// restore can drop every GL object and rebuild without losing the scene.
export function createEngine(canvas, hooks) {
  const E = {
    renderer: null, controls: null, camera: null, quadCam: null,
    matMain: null, matBright: null, matBlur: null, matComp: null,
    scenes: [],
    rtScene: null, rtBright: null, rtA: null, rtB: null, rtC: null,
    time: 0, frames: 0, ready: false, running: true,
    view: { dist: 17, azim: 32, elev: 13, fov: 55 },
    params: null, quality: 'high', frozen: false,
    tmpV: null,
  };
  E.tmpV = null;

  function makeQuad(mat) {
    const geo = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    const sc = new THREE.Scene();
    sc.add(mesh);
    E.scenes.push({ sc, geo });
    return sc;
  }

  function disposeGL() {
    for (const s of E.scenes) s.geo.dispose();
    E.scenes = [];
    for (const m of [E.matMain, E.matBright, E.matBlur, E.matComp]) m?.dispose();
    for (const t of [E.rtScene, E.rtBright, E.rtA, E.rtB, E.rtC]) t?.dispose();
    E.controls?.dispose();
    E.renderer?.dispose();
    E.renderer = null;
  }

  function makeTargets() {
    for (const t of [E.rtScene, E.rtBright, E.rtA, E.rtB, E.rtC]) t?.dispose();
    E.rtScene = E.rtBright = E.rtA = E.rtB = E.rtC = null;
    const q = QUALITIES[E.quality];
    const w = Math.max(2, Math.floor(canvas.clientWidth || window.innerWidth));
    const h = Math.max(2, Math.floor(canvas.clientHeight || window.innerHeight));
    const pr = Math.min(window.devicePixelRatio || 1, 2);
    E.renderer.setPixelRatio(pr);
    E.renderer.setSize(w, h, false);
    const sw = Math.max(2, Math.floor(w * pr * q.scale));
    const sh = Math.max(2, Math.floor(h * pr * q.scale));
    const hw = Math.max(2, Math.floor(sw / 2));
    const hh = Math.max(2, Math.floor(sh / 2));
    const opt = { depthBuffer: false, stencilBuffer: false, type: THREE.HalfFloatType };
    E.rtScene = new THREE.WebGLRenderTarget(sw, sh, opt);
    E.rtBright = new THREE.WebGLRenderTarget(hw, hh, opt);
    E.rtA = new THREE.WebGLRenderTarget(hw, hh, opt);
    E.rtB = new THREE.WebGLRenderTarget(hw, hh, opt);
    E.rtC = new THREE.WebGLRenderTarget(hw, hh, opt);
    for (const t of [E.rtScene, E.rtBright, E.rtA, E.rtB, E.rtC]) {
      t.texture.minFilter = THREE.LinearFilter;
      t.texture.magFilter = THREE.LinearFilter;
    }
  }

  function buildMaterials() {
    const q = QUALITIES[E.quality];
    E.matMain = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: MAIN_FRAG,
      uniforms: {
        uCamPos: { value: new THREE.Vector3() },
        uFwd: { value: new THREE.Vector3(0, 0, -1) },
        uRight: { value: new THREE.Vector3(1, 0, 0) },
        uUp: { value: new THREE.Vector3(0, 1, 0) },
        uTanH: { value: 0.5 }, uAspect: { value: 1 },
        uTime: { value: 0 }, uSteps: { value: q.steps },
        uCrossings: { value: q.crossings }, uDebug: { value: 0 },
        uDiskIn: { value: 4 }, uDiskOut: { value: 17 }, uDiskH: { value: 0.3 },
        uDiskTemp: { value: 1 }, uDiskBright: { value: 2.5 },
        uOrbVel: { value: 1 }, uTurbAmp: { value: 0.8 }, uTurbSpeed: { value: 1 },
        uStarDensity: { value: 1 }, uGalaxy: { value: 1 },
      },
      depthTest: false, depthWrite: false,
    });
    E.matBright = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: BRIGHT_FRAG,
      uniforms: { tSrc: { value: null }, uThresh: { value: 1 } },
      depthTest: false, depthWrite: false,
    });
    E.matBlur = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: BLUR_FRAG,
      uniforms: {
        tSrc: { value: null },
        uTexel: { value: new THREE.Vector2(1 / 256, 1 / 256) },
        uDir: { value: new THREE.Vector2(1, 0) },
        uTaps: { value: q.taps },
      },
      depthTest: false, depthWrite: false,
    });
    E.matComp = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: COMP_FRAG,
      uniforms: {
        tScene: { value: null }, tBloom0: { value: null }, tBloom1: { value: null },
        uBloomLevels: { value: q.bloomLevels },
        uExposure: { value: 0 }, uBloom: { value: 0.8 },
        uVignette: { value: 0.5 }, uGrain: { value: 0.3 },
        uChromAb: { value: 0.5 }, uTime: { value: 0 },
        uDebug: { value: 0 }, uAspect: { value: 1 },
      },
      depthTest: false, depthWrite: false,
    });
  }

  function initGL() {
    E.renderer = new THREE.WebGLRenderer({
      canvas, antialias: false, stencil: false,
      powerPreference: 'high-performance', preserveDrawingBuffer: true,
    });
    E.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    E.renderer.toneMapping = THREE.NoToneMapping;
    E.renderer.autoClear = false;
    E.quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    E.camera = new THREE.PerspectiveCamera(E.view.fov, 1, 0.1, 400);
    applyView();
    E.controls = new OrbitControls(E.camera, canvas);
    E.controls.enableDamping = true;
    E.controls.dampingFactor = 0.08;
    E.controls.minDistance = 3.2;
    E.controls.maxDistance = 90;
    E.controls.autoRotate = false;
    E.controls.autoRotateSpeed = 0.7;
    E.controls.addEventListener('start', () => hooks.onUserTakeover?.());
    E.controls.addEventListener('change', () => hooks.onCamera?.(readView()));
    buildMaterials();
    makeTargets();
    E.scMain = makeQuad(E.matMain);
    E.scBright = makeQuad(E.matBright);
    E.scBlur = makeQuad(E.matBlur);
    E.scComp = makeQuad(E.matComp);
  }

  function readView() {
    const p = E.camera.position;
    const dist = p.length();
    const elev = Math.asin(Math.max(-1, Math.min(1, p.y / dist))) * 180 / Math.PI;
    let azim = Math.atan2(p.z, p.x) * 180 / Math.PI;
    return { dist, azim, elev, fov: E.camera.fov };
  }

  function applyView() {
    const { dist, azim, elev, fov } = E.view;
    const el = elev * Math.PI / 180, az = azim * Math.PI / 180;
    E.camera.position.set(
      dist * Math.cos(el) * Math.cos(az),
      dist * Math.sin(el),
      dist * Math.cos(el) * Math.sin(az),
    );
    E.camera.lookAt(0, 0, 0);
    if (Math.abs(E.camera.fov - fov) > 1e-3) {
      E.camera.fov = fov;
      E.camera.updateProjectionMatrix();
    }
  }

  function blurPass(src, dst, dx, dy, spread) {
    E.matBlur.uniforms.tSrc.value = src.texture;
    E.matBlur.uniforms.uTexel.value.set(spread / src.width, spread / src.height);
    E.matBlur.uniforms.uDir.value.set(dx, dy);
    E.renderer.setRenderTarget(dst);
    E.renderer.render(E.scBlur, E.quadCam);
  }

  const fwd = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3();

  function frame(dt) {
    if (!E.running || E.lost || E.disposed) return;
    const P = E.params;
    if (!E.frozen) E.time += dt * P.timeScale;
    E.controls.autoRotate = hooks.isPlaying?.() ?? false;
    E.controls.update();
    applyViewIfDirty();
    E.camera.getWorldDirection(fwd);
    right.crossVectors(fwd, E.camera.up).normalize();
    up.crossVectors(right, fwd).normalize();
    const u = E.matMain.uniforms;
    u.uCamPos.value.copy(E.camera.position);
    u.uFwd.value.copy(fwd); u.uRight.value.copy(right); u.uUp.value.copy(up);
    u.uTanH.value = Math.tan(E.camera.fov * 0.5 * Math.PI / 180);
    u.uAspect.value = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    u.uTime.value = E.time;
    u.uDebug.value = hooks.getDebug?.() ?? 0;
    u.uDiskIn.value = P.diskIn; u.uDiskOut.value = P.diskOut; u.uDiskH.value = P.diskH;
    u.uDiskTemp.value = P.diskTemp; u.uDiskBright.value = P.diskBright;
    u.uOrbVel.value = P.orbVel; u.uTurbAmp.value = P.turbAmp; u.uTurbSpeed.value = P.turbSpeed;
    u.uStarDensity.value = P.starDensity; u.uGalaxy.value = P.galaxy;

    const R = E.renderer;
    R.setRenderTarget(E.rtScene);
    R.render(E.scMain, E.quadCam);
    E.matBright.uniforms.tSrc.value = E.rtScene.texture;
    E.matBright.uniforms.uThresh.value = P.bloomThresh;
    R.setRenderTarget(E.rtBright);
    R.render(E.scBright, E.quadCam);
    const q = QUALITIES[E.quality];
    blurPass(E.rtBright, E.rtA, 1, 0, 1);
    blurPass(E.rtA, E.rtB, 0, 1, 1);
    let bloom1 = E.rtB;
    if (q.bloomLevels >= 2) {
      // Wide second lobe through spare targets; rtB (lobe 0) stays intact.
      blurPass(E.rtB, E.rtC, 1, 0, 3);
      blurPass(E.rtC, E.rtA, 0, 1, 3);
      bloom1 = E.rtA;
    }
    const c = E.matComp.uniforms;
    c.tScene.value = E.rtScene.texture;
    c.tBloom0.value = E.rtB.texture;
    c.tBloom1.value = bloom1.texture;
    c.uBloomLevels.value = q.bloomLevels;
    c.uExposure.value = P.exposure; c.uBloom.value = P.bloom;
    c.uVignette.value = P.vignette; c.uGrain.value = P.grain;
    c.uChromAb.value = P.chromAb; c.uTime.value = E.time;
    c.uDebug.value = u.uDebug.value;
    c.uAspect.value = u.uAspect.value;
    R.setRenderTarget(null);
    R.render(E.scComp, E.quadCam);

    E.frames++;
    if (!E.ready && E.frames >= 3) {
      E.ready = true;
      hooks.onReady?.();
    }
  }

  let viewDirty = true;
  function applyViewIfDirty() {
    if (viewDirty) { applyView(); viewDirty = false; }
  }

  const api = {
    mount(params, quality, view, time, frozen) {
      E.params = params; E.quality = quality;
      Object.assign(E.view, view);
      E.time = time; E.frozen = frozen;
      initGL();
      E.onLost = (e) => {
        e.preventDefault();
        E.lost = true;
        hooks.onContextLost?.(true);
      };
      E.onRestored = () => {
        // Dead GL objects cannot be trusted: drop everything and rebuild.
        // Camera, time, and params live outside GL and survive intact.
        try { disposeGL(); } catch { /* best effort */ }
        E.frames = 0; E.ready = false;
        initGL();
        makeTargets();
        E.lost = false;
        hooks.onContextLost?.(false);
        hooks.onReady?.();
      };
      canvas.addEventListener('webglcontextlost', E.onLost, false);
      canvas.addEventListener('webglcontextrestored', E.onRestored, false);
      window.addEventListener('resize', api.resize);
      api.resize();
    },
    setView(v) { Object.assign(E.view, v); viewDirty = true; },
    setParams(p) { E.params = p; },
    setTime(t) { E.time = t; },
    setQuality(q) {
      if (!(q in QUALITIES) || q === E.quality) return;
      E.quality = q;
      E.matMain.uniforms.uSteps.value = QUALITIES[q].steps;
      E.matMain.uniforms.uCrossings.value = QUALITIES[q].crossings;
      E.matBlur.uniforms.uTaps.value = QUALITIES[q].taps;
      E.matComp.uniforms.uBloomLevels.value = QUALITIES[q].bloomLevels;
      makeTargets();
    },
    setFrozen(f) { E.frozen = f; },
    startStop(run) { E.running = run; },
    resize() {
      if (!E.renderer) return;
      E.camera.aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
      E.camera.updateProjectionMatrix();
      makeTargets();
    },
    renderFrame(dt) { frame(dt); },
    readView() { return E.camera ? readView() : null; },
    getTime() { return E.time; },
    isLost() { return E.lost; },
    forceLose() {
      const ext = E.renderer?.getContext()?.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
      return !!ext;
    },
    forceRestore() {
      const ext = E.renderer?.getContext()?.getExtension('WEBGL_lose_context');
      if (ext) ext.restoreContext();
      return !!ext;
    },
    dispose() {
      E.disposed = true;
      window.removeEventListener('resize', api.resize);
      canvas.removeEventListener('webglcontextlost', E.onLost);
      canvas.removeEventListener('webglcontextrestored', E.onRestored);
      disposeGL();
    },
  };
  return api;
}
