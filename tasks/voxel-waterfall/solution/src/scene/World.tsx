/**
 * The Three.js world.
 *
 * The React component owns the parameter state; this module owns the renderer,
 * the camera rig and the rebuild pipeline that turns a parameter set into the
 * terrain, water, cloud and vegetation meshes.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildTerrainMesh, generateTerrain, type TerrainField } from "./terrain";
import { buildWater, type WaterBuild } from "./water";
import { buildClouds, type CloudBuild } from "./clouds";
import { buildVegetation, type VegetationBuild } from "./vegetation";
import { createSkyRig, SKY_PRESETS, type SkyRig } from "./sky";
import { createBlockGrainTexture } from "./textures";
import type { SceneParams } from "./params";

export interface WorldStats {
  voxels: number;
  triangles: number;
  fps: number;
  buildMs: number;
}

interface WorldHandle {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  field: TerrainField | null;
  water: WaterBuild | null;
  clouds: CloudBuild | null;
  vegetation: VegetationBuild | null;
  sky: SkyRig;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  worldGroup: THREE.Group;
  terrainMesh: THREE.Mesh | null;
  grainTexture: THREE.Texture;
  presetIndex: number;
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

  // ---------------------------------------------------------------------
  // One-time renderer / scene / camera setup.
  // ---------------------------------------------------------------------
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
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
      45,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.5,
      9000,
    );
    camera.position.set(190, 130, 230);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 30;
    controls.maxDistance = 900;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.minPolarAngle = 0.08;
    controls.target.set(0, 22, 0);
    controls.autoRotateSpeed = 0.35;

    const sky = createSkyRig();
    camera.add(sky.sky);
    scene.add(camera);
    scene.add(sky.sun);
    scene.add(sky.sun.target);
    scene.add(sky.hemi);
    scene.add(sky.ambient);
    sky.sun.target.position.set(0, 0, 0);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const grainTexture = createBlockGrainTexture();
    const terrainMaterial = new THREE.MeshLambertMaterial({
      map: grainTexture,
      vertexColors: true,
    });

    const handle: WorldHandle = {
      camera,
      controls,
      field: null,
      water: null,
      clouds: null,
      vegetation: null,
      sky,
      renderer,
      scene,
      worldGroup,
      terrainMesh: null,
      grainTexture,
      presetIndex: 0,
      applyPreset: () => undefined,
      dispose: () => undefined,
    };
    handleRef.current = handle;

    // Camera tween state.
    let tween: {
      fromPos: THREE.Vector3;
      toPos: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
      t: number;
      duration: number;
    } | null = null;

    const computePreset = (index: number) => {
      const p = paramsRef.current;
      const half = p.size / 2;
      const peak = p.peakHeight;
      const target = new THREE.Vector3(0, peak * 0.3, 0);
      let position: THREE.Vector3;
      switch (index) {
        case 1:
          target.set(0, peak * 0.26, 0);
          position = sphericalPosition(target, 0.12, 0.3, p.size * 1.28);
          break;
        case 2: {
          const fall = handle.field?.waterfalls[0];
          if (fall) {
            // Stand downstream of the lip and look back up at the cliff.
            const index = Math.floor(fall.path.length * 0.45);
            const point = fall.path[index];
            const lip = fall.surface[index];
            let dirX = point.dirX;
            let dirZ = point.dirZ;
            const length = Math.hypot(dirX, dirZ);
            if (length === 0) {
              dirX = 0;
              dirZ = 1;
            } else {
              dirX /= length;
              dirZ /= length;
            }
            target.set(point.x - half, lip - 3, point.z - half);
            const distance = p.size * 0.42;
            position = new THREE.Vector3(
              target.x + dirX * distance,
              target.y + distance * 0.22,
              target.z + dirZ * distance,
            );
          } else {
            target.set(0, peak * 0.3, 0);
            position = sphericalPosition(target, 0.85, 0.42, p.size * 1.35);
          }
          break;
        }
        case 3:
          target.set(0, peak * 0.16, 0);
          position = sphericalPosition(target, 0.78, 0.92, p.size * 1.2);
          break;
        default:
          target.set(0, peak * 0.3, 0);
          position = sphericalPosition(target, 1.05, 0.38, p.size * 1.25);
          break;
      }
      void half;
      return { position, target };
    };

    const startTween = (index: number, duration: number) => {
      const { position, target } = computePreset(index);
      tween = {
        fromPos: camera.position.clone(),
        toPos: position,
        fromTarget: controls.target.clone(),
        toTarget: target,
        t: 0,
        duration,
      };
      handle.presetIndex = index;
    };

    handle.applyPreset = (index: number) => startTween(index, 1.15);

    // Opening move: the page starts wide and settles onto the hero framing.
    const opening = computePreset(0);
    camera.position.set(
      opening.position.x * 1.55,
      opening.position.y * 1.5 + 40,
      opening.position.z * 1.55,
    );
    controls.target.copy(opening.target);
    let openingT = 0;
    const openingFrom = camera.position.clone();
    const openingTargetFrom = controls.target.clone();
    let openingDone = false;

    const cancelOpening = () => {
      openingDone = true;
    };
    renderer.domElement.addEventListener("pointerdown", cancelOpening, { once: true });
    renderer.domElement.addEventListener("wheel", cancelOpening, { once: true, passive: true });

    // ------------------------------------------------------------------
    // Render loop
    // ------------------------------------------------------------------
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
        openingT = Math.min(1, openingT + delta / 2.6);
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

      handle.water?.update(elapsed, delta);
      handle.clouds?.update(elapsed);

      renderer.render(scene, camera);

      frames += 1;
      fpsAccumulator += delta;
      if (fpsAccumulator >= 0.5) {
        fps = frames / fpsAccumulator;
        frames = 0;
        fpsAccumulator = 0;
      }
      if (elapsed - lastStats > 0.4) {
        lastStats = elapsed;
        const triangles = renderer.info.render.triangles;
        onStatsRef.current({
          voxels: handle.field ? handle.field.size * handle.field.size : 0,
          triangles,
          fps,
          buildMs: handle.field ? 0 : 0,
        });
      }
    });

    handle.dispose = () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      controls.dispose();
      handle.water?.dispose();
      handle.clouds?.dispose();
      handle.vegetation?.dispose();
      handle.terrainMesh?.geometry.dispose();
      terrainMaterial.dispose();
      grainTexture.dispose();
      sky.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      delete (window as unknown as { __VOXEL__?: unknown }).__VOXEL__;
    };

    // Inspection hook: lets automated checks read the live scene graph.
    (window as unknown as { __VOXEL__?: unknown }).__VOXEL__ = {
      scene,
      camera,
      renderer,
      controls,
      handle,
    };

    return () => {
      handle.dispose();
      handleRef.current = null;
    };
  }, []);

  // ---------------------------------------------------------------------
  // World rebuild: terrain, water, clouds and vegetation.
  // ---------------------------------------------------------------------
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;
    const started = performance.now();
    onBuildingChangeRef.current(true);

    const field = generateTerrain({
      size: params.size,
      peakHeight: params.peakHeight,
      seed: params.seed,
      ridgeSharpness: params.ridgeSharpness,
      snowLine: params.snowLine,
      treeLine: params.treeLine,
      waterStreams: params.waterStreams,
    });
    handle.field = field;

    if (handle.terrainMesh) {
      handle.worldGroup.remove(handle.terrainMesh);
      handle.terrainMesh.geometry.dispose();
    }
    const { geometry } = buildTerrainMesh(field);
    const material = new THREE.MeshLambertMaterial({
      map: handle.grainTexture,
      vertexColors: true,
    });
    const terrain = new THREE.Mesh(geometry, material);
    terrain.castShadow = true;
    terrain.receiveShadow = true;
    handle.worldGroup.add(terrain);
    handle.terrainMesh = terrain;

    handle.water?.dispose();
    if (handle.water) handle.worldGroup.remove(handle.water.group);
    const preset = SKY_PRESETS[params.skyIndex] ?? SKY_PRESETS[1];
    const water = buildWater(field, new THREE.Color(preset.horizonColor), new THREE.Color(preset.sunColor));
    handle.water = water;
    handle.worldGroup.add(water.group);

    handle.clouds?.dispose();
    if (handle.clouds) handle.worldGroup.remove(handle.clouds.group);
    const clouds = buildClouds({
      size: field.size,
      maxHeight: field.maxHeight,
      altitude: field.maxHeight * params.cloudAltitude,
      coverage: params.cloudCoverage,
      seed: params.seed,
      heights: field.heights,
    });
    handle.clouds = clouds;
    handle.worldGroup.add(clouds.group);

    handle.vegetation?.dispose();
    if (handle.vegetation) handle.worldGroup.remove(handle.vegetation.group);
    const vegetation = buildVegetation(field);
    handle.vegetation = vegetation;
    handle.worldGroup.add(vegetation.group);

    // Keep the whole diorama in frame after a rebuild.
    const distance = params.size * 1.25;
    const target = new THREE.Vector3(0, params.peakHeight * 0.3, 0);
    const position = sphericalPosition(target, 1.05, 0.38, distance);
    handle.camera.position.copy(position);
    handle.controls.target.copy(target);
    handle.controls.update();

    const buildMs = performance.now() - started;
    onBuildingChangeRef.current(false);
    onStatsRef.current({
      voxels: field.size * field.size,
      triangles: handle.renderer.info.render.triangles,
      fps: 0,
      buildMs,
    });
  }, [
    params.size,
    params.peakHeight,
    params.seed,
    params.ridgeSharpness,
    params.snowLine,
    params.treeLine,
    params.waterStreams,
    params.cloudCoverage,
    params.cloudAltitude,
  ]);

  // ---------------------------------------------------------------------
  // Lighting, fog and shadows react immediately.
  // ---------------------------------------------------------------------
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;
    const preset = SKY_PRESETS[params.skyIndex] ?? SKY_PRESETS[1];
    handle.sky.apply(preset);
    handle.renderer.toneMappingExposure = preset.exposure;
    handle.scene.fog = new THREE.FogExp2(
      new THREE.Color(preset.horizonColor),
      preset.fogDensity * params.fogScale,
    );
    handle.scene.background = new THREE.Color(preset.horizonColor);
    handle.renderer.shadowMap.enabled = params.shadows;
    handle.sky.sun.castShadow = params.shadows;
    const extent = params.size * 0.62;
    const shadowCam = handle.sky.sun.shadow.camera;
    shadowCam.left = -extent;
    shadowCam.right = extent;
    shadowCam.top = extent;
    shadowCam.bottom = -extent;
    shadowCam.updateProjectionMatrix();
    handle.worldGroup.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh && mesh !== handle.terrainMesh) {
        mesh.castShadow = params.shadows;
      }
    });
    handle.worldGroup.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) mesh.receiveShadow = params.shadows;
    });
  }, [params.skyIndex, params.fogScale, params.shadows, params.size]);

  // ---------------------------------------------------------------------
  // Camera presets requested from the UI.
  // ---------------------------------------------------------------------
  useEffect(() => {
    handleRef.current?.applyPreset(presetIndex);
  }, [presetIndex]);

  return <div ref={mountRef} className="world-canvas" />;
}
