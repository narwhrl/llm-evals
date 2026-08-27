import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { generateHeightmap, SIZE } from './heightmap.js';
import { buildTerrain } from './terrain.js';
import { planWaterfalls, carveWatercourses, buildWaterfalls } from './waterfall.js';
import { buildClouds } from './clouds.js';
import { buildTrees } from './vegetation.js';
import { applyTimeOfDay } from './lighting.js';

const CENTER = new THREE.Vector3(SIZE / 2, 16, SIZE / 2);

function disposeObject(obj) {
  obj.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => m.dispose());
    }
  });
}

export default function VoxelScene({ params, onStats, onFps }) {
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const statsRef = useRef({ terrain: 0, water: 0, trees: 0, clouds: 0 });
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;
  const onFpsRef = useRef(onFps);
  onFpsRef.current = onFps;

  // One-time renderer/scene/camera/lights setup.
  useEffect(() => {
    const mount = mountRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x8ec8ee, 240, 620);

    const camera = new THREE.PerspectiveCamera(
      52,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1500,
    );
    camera.position.set(160, 78, 150);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(CENTER);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 40;
    controls.maxDistance = 420;
    controls.maxPolarAngle = Math.PI / 2 - 0.03;

    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.camera.near = 20;
    sun.shadow.camera.far = 500;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.8;
    scene.add(sun);
    scene.add(sun.target);

    const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x6f7f5a, 0.7);
    scene.add(hemi);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(760, 760),
      new THREE.MeshLambertMaterial({ color: 0x6d8f57 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(CENTER.x, 0.5, CENTER.z);
    ground.receiveShadow = true;
    scene.add(ground);

    const engine = {
      world: null,
      clouds: null,
      buildWorld() {
        if (engine.world) {
          scene.remove(engine.world.group);
          disposeObject(engine.world.group);
        }
        const p = paramsRef.current;
        const { heights, size, peaks } = generateHeightmap(p.seed);
        const paths = planWaterfalls({ heights, size, peaks, seed: p.seed, count: p.waterfallCount });
        carveWatercourses({ heights, size, paths, seed: p.seed });
        const water = buildWaterfalls({ heights, size, paths });
        const terrain = buildTerrain({
          heights,
          size,
          snowLine: p.snowLine,
          wetSet: water.wetSet,
          sandSet: water.sandSet,
        });
        const blockedSet = new Set(water.wetSet);
        for (const key of water.wetSet) {
          const [x, z] = key.split(',').map(Number);
          for (let dz = -2; dz <= 2; dz++) {
            for (let dx = -2; dx <= 2; dx++) blockedSet.add(x + dx + ',' + (z + dz));
          }
        }
        const trees = buildTrees({
          heights,
          size,
          seed: p.seed,
          density: p.treeDensity,
          snowLine: p.snowLine,
          blockedSet,
        });
        const group = new THREE.Group();
        group.add(terrain.mesh, water.mesh, water.mist, trees.group);
        scene.add(group);
        engine.world = { group, water, terrain, trees };
        statsRef.current.terrain = terrain.count;
        statsRef.current.water = water.count;
        statsRef.current.trees = trees.count;
        const s = statsRef.current;
        onStatsRef.current({ voxels: s.terrain + s.water + s.trees + s.clouds });
      },
      buildClouds() {
        if (engine.clouds) {
          scene.remove(engine.clouds.mesh);
          disposeObject(engine.clouds.mesh);
        }
        const p = paramsRef.current;
        engine.clouds = buildClouds({
          seed: p.seed,
          count: p.cloudCount,
          level: p.cloudLevel,
          size: SIZE,
        });
        scene.add(engine.clouds.mesh);
        statsRef.current.clouds = engine.clouds.count;
        const s = statsRef.current;
        onStatsRef.current({ voxels: s.terrain + s.water + s.trees + s.clouds });
      },
      setTime(t) {
        applyTimeOfDay(t, { scene, sun, hemi, center: CENTER });
      },
    };
    engineRef.current = engine;
    if (import.meta.env.DEV) window.__voxel = { renderer, scene, camera, controls, engine };

    const clock = new THREE.Clock();
    let raf = 0;
    let fpsFrames = 0;
    let fpsTime = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.elapsedTime;
      const p = paramsRef.current;

      controls.autoRotate = p.autoRotate;
      controls.autoRotateSpeed = p.rotateSpeed * 2;
      controls.update();

      if (engine.world) {
        engine.world.water.mesh.visible = p.showWaterfall;
        if (p.showWaterfall) engine.world.water.update(t, p.flowSpeed, p.showMist);
        else engine.world.water.mist.visible = false;
      }
      if (engine.clouds) engine.clouds.mesh.rotation.y += p.cloudDrift * dt * 0.05;

      fpsFrames++;
      fpsTime += dt;
      if (fpsTime >= 0.5) {
        onFpsRef.current(Math.round(fpsFrames / fpsTime));
        fpsFrames = 0;
        fpsTime = 0;
      }
      if (!document.hidden && !engine.paused) renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      if (engine.world) disposeObject(engine.world.group);
      if (engine.clouds) disposeObject(engine.clouds.mesh);
      disposeObject(ground);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      engineRef.current = null;
    };
  }, []);

  const worldKey = [params.seed, params.snowLine, params.treeDensity, params.waterfallCount].join('|');
  const cloudKey = [params.seed, params.cloudCount, params.cloudLevel].join('|');

  useEffect(() => {
    engineRef.current?.buildWorld();
  }, [worldKey]);

  useEffect(() => {
    engineRef.current?.buildClouds();
  }, [cloudKey]);

  useEffect(() => {
    engineRef.current?.setTime(params.timeOfDay);
  }, [params.timeOfDay]);

  return <div ref={mountRef} className="scene-mount" />;
}
