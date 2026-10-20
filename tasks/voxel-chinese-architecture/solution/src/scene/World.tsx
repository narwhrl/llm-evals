/**
 * The Three.js world: renderer, camera rig and the rebuild pipeline.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildComplex, type ComplexLayout } from "./complex";
import { createGroundTexture, GROUND_SIZE } from "./props";
import { createSkyRig, SKY_PRESETS, type SkyRig } from "./sky";
import { createBuffers, pushBoxes, toGeometry } from "./voxel";

export interface SceneParams {
  glazed: boolean;
  gateScale: number;
  skyIndex: number;
  autoRotate: boolean;
}

export interface WorldStats {
  boxes: number;
  triangles: number;
  fps: number;
  buildMs: number;
}

interface WorldHandle {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  sky: SkyRig;
  model: THREE.Mesh | null;
  layout: ComplexLayout | null;
  applyPreset: (index: number) => void;
  dispose: () => void;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function sphericalPosition(
  target: THREE.Vector3,
  azimuth: number,
  elevation: number,
  distance: number,
): THREE.Vector3 {
  return new THREE.Vector3(
    target.x + distance * Math.cos(elevation) * Math.sin(azimuth),
    target.y + distance * Math.sin(elevation),
    target.z + distance * Math.cos(elevation) * Math.cos(azimuth),
  );
}

export function World({
  params,
  presetIndex,
  onStats,
  onBuildingChange,
}: {
  params: SceneParams;
  presetIndex: number;
  onStats: (stats: WorldStats) => void;
  onBuildingChange: (building: boolean) => void;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<WorldHandle | null>(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const presetRef = useRef(presetIndex);
  presetRef.current = presetIndex;
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;
  const onBuildingChangeRef = useRef(onBuildingChange);
  onBuildingChangeRef.current = onBuildingChange;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.5,
      9000,
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 30;
    controls.maxDistance = 480;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.minPolarAngle = 0.06;
    controls.target.set(0, 10, 12);
    controls.autoRotateSpeed = 0.3;

    const sky = createSkyRig();
    camera.add(sky.sky);
    scene.add(camera);
    scene.add(sky.sun);
    scene.add(sky.sun.target);
    scene.add(sky.hemi);
    scene.add(sky.ambient);
    sky.sun.target.position.set(0, 0, 0);

    const groundTexture = createGroundTexture();
    const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const handle: WorldHandle = {
      camera,
      controls,
      renderer,
      scene,
      sky,
      model: null,
      layout: null,
      applyPreset: () => undefined,
      dispose: () => undefined,
    };
    handleRef.current = handle;

    let tween: {
      fromPos: THREE.Vector3;
      toPos: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
      t: number;
      duration: number;
    } | null = null;
    let openingDone = false;

    const presets = [
      { azimuth: 0.32, elevation: 0.34, distance: 1.68, focus: [0, 10, 12] },
      { azimuth: 0.03, elevation: 0.19, distance: 1.66, focus: [0, 11, 20] },
      { azimuth: 0.52, elevation: 0.27, distance: 0.5, focus: [0, 10, -32] },
      { azimuth: 0.48, elevation: 0.86, distance: 1.72, focus: [0, 3, 10] },
    ];

    const computePreset = (index: number) => {
      const preset = presets[index] ?? presets[0];
      const target = new THREE.Vector3(preset.focus[0], preset.focus[1], preset.focus[2]);
      const radius = handle.layout?.radius ?? 120;
      const position = sphericalPosition(target, preset.azimuth, preset.elevation, radius * preset.distance);
      return { position, target };
    };

    const startTween = (index: number, duration: number) => {
      const { position, target } = computePreset(index);
      openingDone = true;
      tween = {
        fromPos: camera.position.clone(),
        toPos: position,
        fromTarget: controls.target.clone(),
        toTarget: target,
        t: 0,
        duration,
      };
    };
    handle.applyPreset = (index: number) => startTween(index, 1.1);

    const opening = computePreset(0);
    camera.position.set(
      opening.position.x * 1.5,
      opening.position.y * 1.45 + 30,
      opening.position.z * 1.5,
    );
    controls.target.copy(opening.target);
    const openingFrom = camera.position.clone();
    const openingTargetFrom = controls.target.clone();
    let openingT = 0;
    const cancelOpening = () => {
      openingDone = true;
    };
    renderer.domElement.addEventListener("pointerdown", cancelOpening, { once: true });
    renderer.domElement.addEventListener("wheel", cancelOpening, { once: true, passive: true });

    const clock = { last: performance.now() / 1000, elapsed: 0 };
    let frames = 0;
    let fpsAccumulator = 0;
    let fps = 0;
    let lastStats = 0;

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    const observer = new ResizeObserver(onResize);
    observer.observe(mount);

    renderer.setAnimationLoop(() => {
      const now = performance.now() / 1000;
      const delta = Math.min(now - clock.last, 0.05);
      clock.last = now;
      clock.elapsed += delta;
      const elapsed = clock.elapsed;

      if (!openingDone && openingT < 1) {
        openingT = Math.min(1, openingT + delta / 2.8);
        const e = easeOutCubic(openingT);
        camera.position.lerpVectors(openingFrom, opening.position, e);
        controls.target.lerpVectors(openingTargetFrom, opening.target, e);
      }
      if (tween) {
        tween.t = Math.min(1, tween.t + delta / tween.duration);
        const e = easeInOutCubic(tween.t);
        camera.position.lerpVectors(tween.fromPos, tween.toPos, e);
        controls.target.lerpVectors(tween.fromTarget, tween.toTarget, e);
        if (tween.t >= 1) tween = null;
      }

      controls.autoRotate = paramsRef.current.autoRotate;
      controls.update();
      renderer.render(scene, camera);

      frames += 1;
      fpsAccumulator += delta;
      if (fpsAccumulator >= 0.5) {
        fps = frames / fpsAccumulator;
        frames = 0;
        fpsAccumulator = 0;
      }
      if (elapsed - lastStats > 0.5) {
        lastStats = elapsed;
        onStatsRef.current({
          boxes: handle.layout?.boxes.length ?? 0,
          triangles: renderer.info.render.triangles,
          fps,
          buildMs: 0,
        });
      }
    });

    handle.dispose = () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      controls.dispose();
      handle.model?.geometry.dispose();
      ground.geometry.dispose();
      groundMaterial.dispose();
      groundTexture.dispose();
      sky.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      delete (window as unknown as { __TEMPLE__?: unknown }).__TEMPLE__;
    };

    (window as unknown as { __TEMPLE__?: unknown }).__TEMPLE__ = {
      scene,
      camera,
      renderer,
      controls,
      handle,
      THREE,
    };

    return () => {
      handle.dispose();
      handleRef.current = null;
    };
  }, []);

  // Rebuild the complex when its shape parameters change.
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;
    const started = performance.now();
    onBuildingChangeRef.current(true);

    const layout = buildComplex({ glazed: params.glazed, gateScale: params.gateScale });
    handle.layout = layout;

    if (handle.model) {
      handle.model.geometry.dispose();
      handle.model.geometry = new THREE.BufferGeometry();
    }
    const buffer = createBuffers();
    pushBoxes(buffer, layout.boxes);
    const geometry = toGeometry(buffer);
    if (!handle.model) {
      const material = new THREE.MeshLambertMaterial({ vertexColors: true });
      handle.model = new THREE.Mesh(geometry, material);
      handle.model.castShadow = true;
      handle.model.receiveShadow = true;
      handle.model.name = "complex";
      handle.scene.add(handle.model);
    } else {
      handle.model.geometry = geometry;
    }

    const preset = SKY_PRESETS[params.skyIndex] ?? SKY_PRESETS[1];
    handle.sky.apply(preset);
    handle.renderer.toneMappingExposure = preset.exposure;
    handle.scene.fog = new THREE.FogExp2(new THREE.Color(preset.horizonColor), preset.fogDensity);
    handle.scene.background = new THREE.Color(preset.horizonColor);

    const extent = 190;
    const shadowCam = handle.sky.sun.shadow.camera;
    shadowCam.left = -extent;
    shadowCam.right = extent;
    shadowCam.top = extent;
    shadowCam.bottom = -extent;
    shadowCam.updateProjectionMatrix();

    const buildMs = performance.now() - started;
    onBuildingChangeRef.current(false);
    onStatsRef.current({
      boxes: layout.boxes.length,
      triangles: handle.renderer.info.render.triangles,
      fps: 0,
      buildMs,
    });
  }, [params.glazed, params.gateScale, params.skyIndex]);

  // Camera framings requested from the panel.
  useEffect(() => {
    handleRef.current?.applyPreset(presetIndex);
  }, [presetIndex]);

  return <div ref={mountRef} className="world-canvas" />;
}
