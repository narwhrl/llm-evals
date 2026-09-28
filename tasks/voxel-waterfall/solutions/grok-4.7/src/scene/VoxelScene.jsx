import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  Group,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { MATERIAL_COLORS, MATERIALS, buildTerrain } from "./terrain.js";
import { buildTerrainMesh } from "./mesh.js";
import { buildWaterfalls, waterfallColumns } from "./waterfall.js";
import { buildClouds } from "./clouds.js";
import { buildFoliage } from "./foliage.js";
import { geometryFromBucket, mergeBoxes } from "./geometry.js";
import { timeOfDay } from "./lighting.js";

function solidMaterial(color, options = {}) {
  return new MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.92,
    metalness: 0,
    flatShading: true,
    ...options,
  });
}

function disposeObject(obj) {
  obj.geometry?.dispose();
  if (Array.isArray(obj.material)) obj.material.forEach((item) => item.dispose());
  else obj.material?.dispose();
}

function addMesh(parent, bucket, material, shadows = true) {
  if (!bucket || bucket.positions.length === 0) return null;
  const mesh = new Mesh(geometryFromBucket(bucket), material);
  mesh.castShadow = shadows;
  mesh.receiveShadow = shadows;
  if (material.transparent) mesh.renderOrder = material.depthWrite ? 2 : 3;
  parent.add(mesh);
  return mesh;
}

function waterBoxes(falls) {
  const water = [];
  const foam = [];
  for (const fall of falls) {
    const { columns, mouth } = waterfallColumns(fall);
    for (const column of columns) {
      water.push({
        x: column.x + 0.18,
        y: column.y0 + 0.05,
        z: column.z + 0.18,
        sx: 0.64,
        sy: Math.max(1, column.y1 - column.y0),
        sz: 0.64,
      });
      if (column.foam) {
        foam.push({
          x: column.x + 0.05,
          y: column.y1 - 0.2,
          z: column.z + 0.05,
          sx: 0.9,
          sy: 0.3,
          sz: 0.9,
        });
      }
    }
    for (let dz = -4; dz <= 4; dz += 1) {
      for (let dx = -4; dx <= 4; dx += 1) {
        if (dx * dx + dz * dz > 14) continue;
        water.push({ x: mouth.x + dx, y: 0.05, z: mouth.z + dz, sx: 1, sy: 0.85, sz: 1 });
      }
    }
  }
  return { water, foam };
}

function cloudBoxes(clouds) {
  return clouds.cells.map((cell) => ({
    x: cell.x,
    y: cell.y,
    z: cell.z,
    sx: cell.s,
    sy: cell.h,
    sz: cell.s,
  }));
}

function foliageBoxes(foliage) {
  const trunks = [];
  const leaves = [];
  const shrubs = [];
  for (const tree of foliage.trees) {
    trunks.push({ x: tree.x + 0.3, y: tree.y, z: tree.z + 0.3, sx: 0.4, sy: tree.trunk, sz: 0.4 });
    const span = 1 + tree.canopy * 2;
    leaves.push({
      x: tree.x - tree.canopy,
      y: tree.y + tree.trunk - 1,
      z: tree.z - tree.canopy,
      sx: span,
      sy: 2,
      sz: span,
    });
    leaves.push({ x: tree.x - 0.2, y: tree.y + tree.trunk + 1, z: tree.z - 0.2, sx: 1.4, sy: 1, sz: 1.4 });
  }
  for (const shrub of foliage.shrubs) {
    shrubs.push({ x: shrub.x, y: shrub.y, z: shrub.z, sx: 1, sy: shrub.h, sz: 1 });
  }
  return { trunks, leaves, shrubs };
}

function applyTime(scene, sun, ambient, timeId, span) {
  const look = timeOfDay(timeId);
  scene.background = new Color(look.sky);
  scene.fog = new Fog(look.fog, span * 0.35, span * 2.3);
  sun.color.set(look.sun);
  sun.intensity = look.sunIntensity * 1.15;
  ambient.color.set(look.ambient);
  ambient.intensity = look.ambientIntensity;
  sun.position.set(Math.cos(look.azimuth) * span * 0.85, look.elevation * span * 0.75 + 20, Math.sin(look.azimuth) * span * 0.85);
}

export function VoxelScene({ settings, onStats }) {
  const mountRef = useRef(null);
  const settingsRef = useRef(settings);
  const runtimeRef = useRef(null);
  settingsRef.current = settings;

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.5, 1600);
    const renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    mount.appendChild(renderer.domElement);

    const world = new Group();
    scene.add(world);
    const sun = new DirectionalLight(0xffffff, 1.2);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 8;
    sun.shadow.camera.far = 900;
    scene.add(sun);
    scene.add(sun.target);
    const ambient = new AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const runtime = { water: null, materials: [], scene, sun, ambient };
    runtimeRef.current = runtime;

    const rebuild = () => {
      const current = settingsRef.current;
      for (const child of [...world.children]) {
        world.remove(child);
        disposeObject(child);
      }
      runtime.materials = [];
      const terrain = buildTerrain({ size: current.size, seed: current.seed, peakScale: current.peakScale });
      const buckets = buildTerrainMesh(terrain);
      for (const [materialId, bucket] of buckets) {
        const material = solidMaterial(MATERIAL_COLORS[materialId]);
        runtime.materials.push(material);
        addMesh(world, bucket, material);
      }
      const falls = buildWaterfalls(terrain, current.waterfallCount);
      const water = waterBoxes(falls);
      const waterMaterial = solidMaterial(MATERIAL_COLORS[MATERIALS.water], {
        transparent: true,
        opacity: 0.74,
        roughness: 0.16,
        depthWrite: false,
      });
      const foamMaterial = solidMaterial(MATERIAL_COLORS[MATERIALS.foam], {
        transparent: true,
        opacity: 0.84,
        roughness: 0.35,
        depthWrite: false,
      });
      runtime.materials.push(waterMaterial, foamMaterial);
      runtime.water = addMesh(world, mergeBoxes(water.water), waterMaterial, false);
      addMesh(world, mergeBoxes(water.foam), foamMaterial, false);

      const cloudMaterial = solidMaterial(0xf4f1ea, {
        transparent: true,
        opacity: 0.62,
        roughness: 1,
        depthWrite: true,
      });
      runtime.materials.push(cloudMaterial);
      addMesh(world, mergeBoxes(cloudBoxes(buildClouds(terrain, current))), cloudMaterial, false);

      const plants = foliageBoxes(buildFoliage(terrain, current.foliage));
      for (const [boxes, id] of [
        [plants.trunks, MATERIALS.trunk],
        [plants.leaves, MATERIALS.leaves],
        [plants.shrubs, MATERIALS.shrub],
      ]) {
        const material = solidMaterial(MATERIAL_COLORS[id]);
        runtime.materials.push(material);
        addMesh(world, mergeBoxes(boxes), material);
      }

      world.position.set(-terrain.size / 2, 0, -terrain.size / 2);
      const span = terrain.size;
      sun.shadow.camera.left = -span;
      sun.shadow.camera.right = span;
      sun.shadow.camera.top = span;
      sun.shadow.camera.bottom = -span;
      sun.shadow.camera.updateProjectionMatrix();
      sun.target.position.set(0, terrain.peak * 0.25, 0);
      camera.position.set(span * 0.28, terrain.peak * 0.62 + 18, span * 0.72);
      camera.lookAt(0, terrain.peak * 0.22, 0);
      camera.userData.radius = Math.hypot(camera.position.x, camera.position.z);
      camera.userData.baseY = camera.position.y;
      camera.userData.lookY = terrain.peak * 0.22;
      applyTime(scene, sun, ambient, current.time, span);
      onStats?.({
        size: terrain.size,
        peak: terrain.peak,
        falls: falls.length,
        cloudBase: terrain.cloudBase,
        columns: terrain.size * terrain.size,
      });
    };

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    rebuild();
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    let frame = 0;
    let disposed = false;
    const started = performance.now();
    const tick = (now) => {
      if (disposed) return;
      frame = requestAnimationFrame(tick);
      const t = (now - started) / 1000;
      const current = settingsRef.current;
      for (const material of runtime.materials) material.wireframe = current.wireframe;
      if (runtime.water) runtime.water.position.y = Math.sin(t * (1.1 + current.flow * 1.6)) * 0.08;
      if (current.autorotate) {
        const angle = t * 0.07;
        const radius = camera.userData.radius;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.position.y = camera.userData.baseY;
        camera.lookAt(0, camera.userData.lookY, 0);
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      world.traverse(disposeObject);
      renderer.dispose();
      renderer.domElement.remove();
      runtimeRef.current = null;
    };
  }, [
    settings.seed,
    settings.size,
    settings.peakScale,
    settings.waterfallCount,
    settings.flow,
    settings.cloudDensity,
    settings.cloudLift,
    settings.foliage,
    onStats,
  ]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    applyTime(runtime.scene, runtime.sun, runtime.ambient, settings.time, settings.size);
  }, [settings.time, settings.size]);

  return <div className="viewport" ref={mountRef} />;
}
