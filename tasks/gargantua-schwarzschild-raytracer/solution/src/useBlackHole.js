import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '../vendor/addons/controls/OrbitControls.js';
import { blackHoleFragmentShader, blackHoleVertexShader } from './shaders/blackHole.js';
import { RenderPipeline, QUALITY_PRESETS } from './pipeline.js';
import { PRESETS, clampParam } from './state.js';

// 把 React 状态接到 three.js：相机由 OrbitControls 驱动，
// 每帧把相机位置/朝向/FOV 与全部参数写进 shader uniforms。
//
// OrbitControls 的相机位置是「真值」，用户拖拽后由本组件把位置反解成
// 方位角/俯仰角/距离写回状态，保证 HUD 与画面一致。

const DEG = Math.PI / 180;

function sphericalToPosition(distance, azimuthDeg, elevationDeg) {
  const az = azimuthDeg * DEG;
  const el = elevationDeg * DEG;
  return [
    distance * Math.cos(el) * Math.sin(az),
    distance * Math.sin(el),
    distance * Math.cos(el) * Math.cos(az),
  ];
}

function positionToSpherical(x, y, z) {
  const distance = Math.hypot(x, y, z);
  const elevation = Math.asin(Math.min(1, Math.max(-1, y / Math.max(distance, 1e-6)))) / DEG;
  const azimuth = Math.atan2(x, z) / DEG;
  return { distance, azimuth, elevation };
}

export function useBlackHole({ params, quality, debug, cinematic, paused, onCameraChange, onError, onReady, timeRef }) {
  const mountRef = useRef(null);
  const runtimeRef = useRef(null);
  const paramsRef = useRef(params);
  const flagsRef = useRef({ debug, cinematic, paused });
  const [contextLost, setContextLost] = useState(false);
  const [stats, setStats] = useState({ fps: 0, ms: 0, scale: 0, steps: 0 });

  paramsRef.current = params;
  flagsRef.current = { debug, cinematic, paused };

  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let THREE = null;
    let renderer = null;
    let controls = null;
    let pipeline = null;
    let material = null;
    let canvas = null;
    let camera = null;

    async function boot() {
      THREE = await import('three');
      const mount = mountRef.current;
      if (!mount || disposed) return;

      canvas = document.createElement('canvas');
      canvas.className = 'gargantua-canvas';
      canvas.setAttribute('aria-label', '全屏 Schwarzschild 黑洞光追渲染画面');
      mount.appendChild(canvas);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      });
      renderer.setClearColor(0x000000, 1);
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      renderer.autoClear = false;

      const { params: initialParams } = paramsRef.current;
      camera = new THREE.PerspectiveCamera(initialParams.fov, 1, 0.1, 4000);
      const [px, py, pz] = sphericalToPosition(
        initialParams.cameraDistance,
        initialParams.azimuth,
        initialParams.elevation,
      );
      camera.position.set(px, py, pz);
      camera.lookAt(0, 0, 0);

      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.enablePan = false;
      controls.minDistance = 4;
      controls.maxDistance = 120;
      controls.rotateSpeed = 0.55;
      controls.zoomSpeed = 0.7;
      controls.addEventListener('change', () => {
        const { distance, azimuth, elevation } = positionToSpherical(
          camera.position.x,
          camera.position.y,
          camera.position.z,
        );
        onCameraChange({
          cameraDistance: clampParam('cameraDistance', distance),
          azimuth: clampParam('azimuth', azimuth),
          elevation: clampParam('elevation', elevation),
        });
      });

      material = new THREE.ShaderMaterial({
        vertexShader: blackHoleVertexShader,
        fragmentShader: blackHoleFragmentShader,
        uniforms: {
          uResolution: { value: new THREE.Vector2(1, 1) },
          uCamPos: { value: new THREE.Vector3() },
          uCamTarget: { value: new THREE.Vector3() },
          uCamUp: { value: new THREE.Vector3(0, 1, 0) },
          uFovY: { value: initialParams.fov * DEG },
          uTime: { value: 0 },
          uDiskInner: { value: initialParams.diskInner },
          uDiskOuter: { value: initialParams.diskOuter },
          uDiskThickness: { value: initialParams.diskThickness },
          uDiskTemp: { value: initialParams.diskTemp },
          uDiskEmission: { value: initialParams.diskEmission },
          uOrbitalSpeed: { value: initialParams.orbitalSpeed },
          uTurbAmplitude: { value: initialParams.turbAmplitude },
          uTurbSpeed: { value: initialParams.turbSpeed },
          uTurbScale: { value: initialParams.turbScale },
          uStarDensity: { value: initialParams.starDensity },
          uGalaxyBrightness: { value: initialParams.galaxyBrightness },
          uExposure: { value: initialParams.exposure },
          uMaxSteps: { value: 380 },
          uDiskSamples: { value: 4 },
          uDebug: { value: 0 },
        },
        depthTest: false,
        depthWrite: false,
      });

      pipeline = new RenderPipeline(THREE, renderer, material, quality);
      runtimeRef.current = { THREE, renderer, controls, pipeline, material, camera, canvas };

      const applySize = () => {
        const width = mount.clientWidth || window.innerWidth;
        const height = mount.clientHeight || window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        pipeline.resize(width, height, dpr);
        material.uniforms.uResolution.value.set(pipeline.width, pipeline.height);
      };
      applySize();

      const resizeObserver = new ResizeObserver(applySize);
      resizeObserver.observe(mount);
      const onWindowResize = () => applySize();
      window.addEventListener('resize', onWindowResize);

      // WebGL 上下文丢失 / 恢复：暂停渲染并显示可恢复状态，恢复后重建全部 GPU 资源。
      const onLost = (event) => {
        event.preventDefault();
        setContextLost(true);
        cancelAnimationFrame(raf);
      };
      const onRestored = () => {
        try {
          pipeline.dispose();
          pipeline = new RenderPipeline(THREE, renderer, material, quality);
          applySize();
          runtimeRef.current.pipeline = pipeline;
          setContextLost(false);
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } catch (error) {
          onError(error);
        }
      };
      canvas.addEventListener('webglcontextlost', onLost, false);
      canvas.addEventListener('webglcontextrestored', onRestored, false);

      runtimeRef.current.cleanup = () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', onWindowResize);
        canvas.removeEventListener('webglcontextlost', onLost);
        canvas.removeEventListener('webglcontextrestored', onRestored);
        controls.dispose();
        pipeline.dispose();
        material.dispose();
        renderer.dispose();
      };

      let last = performance.now();
      let frames = 0;
      let acc = 0;
      let simTime = 0;

      function frame(now) {
        if (disposed) return;
        try {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const flags = flagsRef.current;
        const current = paramsRef.current.params;

        if (flags.cinematic && !flags.paused) {
          const orbit = (now / 1000) * 0.035 * (current.timeScale || 1);
          const base = current.azimuth;
          const [px2, py2, pz2] = sphericalToPosition(
            current.cameraDistance,
            base + orbit * 57.2958,
            current.elevation,
          );
          camera.position.set(px2, py2, pz2);
        } else {
          const [px2, py2, pz2] = sphericalToPosition(
            current.cameraDistance,
            current.azimuth,
            current.elevation,
          );
          const drift = camera.position.distanceTo(new THREE.Vector3(px2, py2, pz2));
          if (drift > 1e-3) camera.position.set(px2, py2, pz2);
        }
        camera.lookAt(0, 0, 0);
        controls.update();

        simTime = timeRef.advance(dt * (current.timeScale ?? 1));

        const u = material.uniforms;
        u.uCamPos.value.copy(camera.position);
        u.uCamTarget.value.set(0, 0, 0);
        u.uCamUp.value.set(0, 1, 0);
        u.uFovY.value = current.fov * DEG;
        u.uTime.value = simTime;
        u.uDiskInner.value = current.diskInner;
        u.uDiskOuter.value = Math.max(current.diskOuter, current.diskInner + 0.5);
        u.uDiskThickness.value = current.diskThickness;
        u.uDiskTemp.value = current.diskTemp;
        u.uDiskEmission.value = current.diskEmission;
        u.uOrbitalSpeed.value = current.orbitalSpeed;
        u.uTurbAmplitude.value = current.turbAmplitude;
        u.uTurbSpeed.value = current.turbSpeed;
        u.uTurbScale.value = current.turbScale;
        u.uStarDensity.value = current.starDensity;
        u.uGalaxyBrightness.value = current.galaxyBrightness;
        u.uExposure.value = current.exposure;
        u.uDebug.value = flags.debug;

        window.__frameCount = (window.__frameCount || 0) + 1;
        if (flags.debug !== 0) {
          pipeline.renderDebug();
        } else {
          pipeline.render({
            time: simTime,
            bloomStrength: current.bloomStrength,
            bloomThreshold: current.bloomThreshold,
            exposure: current.exposure,
            vignette: current.vignette,
            grain: current.grain,
            chromatic: current.chromatic,
          });
        }

        frames += 1;
        acc += dt;
        if (acc >= 0.5) {
          setStats({
            fps: Math.round(frames / acc),
            ms: Math.round((acc / frames) * 1000 * 10) / 10,
            scale: pipeline.budget.scale,
            steps: pipeline.budget.maxSteps,
          });
          frames = 0;
          acc = 0;
        }

        if (!runtimeRef.current.diagnosticsChecked) {
          runtimeRef.current.diagnosticsChecked = true;
          const programs = renderer.info.programs || [];
          const diag = programs.map((p) => ({
            name: p.name,
            diagnostics: p.diagnostics || null,
          }));
          window.__shaderDiagnostics = diag;
        }

        onReady();
        raf = requestAnimationFrame(frame);
        } catch (error) {
          window.__frameError = String(error?.stack || error);
          console.error(error);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    boot().catch((error) => {
      window.__bootError = String(error?.stack || error);
      onError(error);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (runtimeRef.current?.cleanup) runtimeRef.current.cleanup();
      runtimeRef.current = null;
    };
    // 只在挂载时初始化一次；后续状态通过 ref 传递，避免重建 renderer。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (runtimeRef.current?.pipeline) runtimeRef.current.pipeline.setQuality(quality);
  }, [quality]);

  const resetCamera = (nextParams) => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    const [x, y, z] = sphericalToPosition(nextParams.cameraDistance, nextParams.azimuth, nextParams.elevation);
    runtime.camera.position.set(x, y, z);
    runtime.controls.update();
  };

  const loseContext = () => {
    const runtime = runtimeRef.current;
    if (!runtime) return false;
    const gl = runtime.renderer.getContext();
    const ext = gl.getExtension('WEBGL_lose_context');
    if (!ext) return false;
    ext.loseContext();
    window.setTimeout(() => ext.restoreContext(), 1200);
    return true;
  };

  return { mountRef, contextLost, stats, resetCamera, loseContext, runtimeRef };
}

export { QUALITY_PRESETS, PRESETS };
