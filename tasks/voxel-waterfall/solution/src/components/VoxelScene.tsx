import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generateTerrain } from '../voxel/terrain';
import { BLOCK_COLORS, type BlockType, type SceneSettings } from '../voxel/types';

interface Props {
  settings: SceneSettings;
}

const SOLID_TYPES: BlockType[] = [
  'grass',
  'dirt',
  'stone',
  'snow',
  'sand',
  'leaf',
  'trunk',
];

function sunColor(t: number): THREE.Color {
  // t in [0,1]: dawn → noon → dusk feel
  const dawn = new THREE.Color(0xff9a5c);
  const noon = new THREE.Color(0xfff2d6);
  const dusk = new THREE.Color(0xff6b4a);
  if (t < 0.5) return dawn.clone().lerp(noon, t * 2);
  return noon.clone().lerp(dusk, (t - 0.5) * 2);
}

function skyColor(t: number): THREE.Color {
  const dawn = new THREE.Color(0x87a0c8);
  const noon = new THREE.Color(0x7ec8ff);
  const dusk = new THREE.Color(0xf0a070);
  if (t < 0.5) return dawn.clone().lerp(noon, t * 2);
  return noon.clone().lerp(dusk, (t - 0.5) * 2);
}

function fogColor(t: number): THREE.Color {
  return skyColor(t).clone().lerp(new THREE.Color(0xdde8f5), 0.35);
}

export function VoxelScene({ settings }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.1,
      2000,
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);
    const hemi = new THREE.HemisphereLight(0xb1d0ff, 0x3d5a3a, 0.55);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffe6c0, 1.1);
    sun.position.set(80, 120, 40);
    scene.add(sun);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 40;
    controls.maxDistance = 420;
    controls.autoRotate = settings.autoOrbit;
    controls.autoRotateSpeed = 0.45;

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const meshes = new Map<string, THREE.InstancedMesh>();
    const waterfallMeshes: THREE.InstancedMesh[] = [];
    const cloudMeshes: THREE.InstancedMesh[] = [];
    const dummy = new THREE.Object3D();

    const s = settingsRef.current;
    const terrain = generateTerrain(
      s.size,
      s.seed,
      s.mountainHeight,
      s.cloudHeight,
      s.cloudDensity,
      s.vegetation,
      s.showClouds,
    );

    const half = terrain.size / 2;
    const worldOffset = new THREE.Vector3(-half, 0, -half);

    // Group solid blocks by type
    const byType = new Map<BlockType, Array<{ x: number; y: number; z: number }>>();
    for (const t of SOLID_TYPES) byType.set(t, []);

    for (const [k, type] of terrain.blocks) {
      if (type === 'waterfall' || type === 'water' || type === 'cloud') continue;
      const [xs, ys, zs] = k.split(',').map(Number);
      const list = byType.get(type);
      if (list) list.push({ x: xs, y: ys, z: zs });
    }

    for (const [type, cells] of byType) {
      if (!cells.length) continue;
      const mat = new THREE.MeshLambertMaterial({ color: BLOCK_COLORS[type] });
      const mesh = new THREE.InstancedMesh(boxGeo, mat, cells.length);
      mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
      cells.forEach((c, i) => {
        dummy.position.set(c.x + worldOffset.x + 0.5, c.y + 0.5, c.z + worldOffset.z + 0.5);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      meshes.set(type, mesh);
    }

    // Pool water (static translucent)
    if (terrain.poolCells.length) {
      const mat = new THREE.MeshLambertMaterial({
        color: BLOCK_COLORS.water,
        transparent: true,
        opacity: s.waterOpacity,
        depthWrite: false,
      });
      const mesh = new THREE.InstancedMesh(boxGeo, mat, terrain.poolCells.length);
      terrain.poolCells.forEach((c, i) => {
        dummy.position.set(c.x + worldOffset.x + 0.5, c.y + 0.35, c.z + worldOffset.z + 0.5);
        dummy.scale.set(1, 0.7, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      dummy.scale.set(1, 1, 1);
      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      meshes.set('water', mesh);
    }

    // Waterfall — slightly smaller blocks, animated UV-ish via Y offset
    if (terrain.waterfallCells.length) {
      // Deduplicate
      const uniq = new Map<string, { x: number; y: number; z: number }>();
      for (const c of terrain.waterfallCells) uniq.set(`${c.x},${c.y},${c.z}`, c);
      const cells = [...uniq.values()];
      const mat = new THREE.MeshLambertMaterial({
        color: BLOCK_COLORS.waterfall,
        transparent: true,
        opacity: Math.min(0.95, s.waterOpacity + 0.1),
        depthWrite: false,
      });
      const mesh = new THREE.InstancedMesh(boxGeo, mat, cells.length);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      cells.forEach((c, i) => {
        dummy.position.set(c.x + worldOffset.x + 0.5, c.y + 0.5, c.z + worldOffset.z + 0.5);
        dummy.scale.set(0.85, 1, 0.85);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      dummy.scale.set(1, 1, 1);
      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      waterfallMeshes.push(mesh);
      // stash cells on userData for animation
      (mesh.userData as { cells: typeof cells }).cells = cells;
    }

    // Clouds — large soft translucent cubes
    if (terrain.cloudCells.length) {
      const mat = new THREE.MeshLambertMaterial({
        color: BLOCK_COLORS.cloud,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      const mesh = new THREE.InstancedMesh(boxGeo, mat, terrain.cloudCells.length);
      terrain.cloudCells.forEach((c, i) => {
        dummy.position.set(c.x + worldOffset.x + 0.5, c.y + 0.5, c.z + worldOffset.z + 0.5);
        dummy.scale.set(2.2, 1.1, 2.2);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      dummy.scale.set(1, 1, 1);
      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      cloudMeshes.push(mesh);
    }

    // Ground plane under map for silhouette
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(terrain.size + 40, terrain.size + 40),
      new THREE.MeshLambertMaterial({ color: 0x3a5a32 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // Default camera: elevated overview looking at main peak
    const peakWorld = new THREE.Vector3(
      terrain.mainPeak.x + worldOffset.x,
      terrain.mainPeak.h * 0.45,
      terrain.mainPeak.z + worldOffset.z,
    );
    controls.target.copy(peakWorld);
    camera.position.set(peakWorld.x + 110, terrain.mainPeak.h * 0.85 + 55, peakWorld.z + 130);
    controls.update();

    // Lighting / fog from time of day
    const applyAtmosphere = (t: number, fogOn: boolean, fogDen: number) => {
      const sky = skyColor(t);
      scene.background = sky;
      if (fogOn) {
        scene.fog = new THREE.FogExp2(fogColor(t).getHex(), fogDen);
      } else {
        scene.fog = null;
      }
      sun.color.copy(sunColor(t));
      sun.intensity = 0.7 + Math.sin(t * Math.PI) * 0.55;
      ambient.intensity = 0.35 + (1 - Math.abs(t - 0.5) * 2) * 0.2;
      const angle = (t - 0.15) * Math.PI;
      sun.position.set(Math.cos(angle) * 140, Math.sin(angle) * 120 + 40, 60);
    };
    applyAtmosphere(s.timeOfDay, s.fogEnabled, s.fogDensity);

    let frame = 0;
    let raf = 0;
    const clock = new THREE.Clock();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = Math.max(1, mount.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const cur = settingsRef.current;
      const dt = clock.getDelta();
      frame += dt * cur.waterfallSpeed;

      controls.autoRotate = cur.autoOrbit;
      applyAtmosphere(cur.timeOfDay, cur.fogEnabled, cur.fogDensity);

      // Animate waterfall: scroll blocks downward in a loop
      for (const mesh of waterfallMeshes) {
        const cells = (mesh.userData as { cells: Array<{ x: number; y: number; z: number }> }).cells;
        if (!cells) continue;
        const mat = mesh.material as THREE.MeshLambertMaterial;
        mat.opacity = Math.min(0.95, cur.waterOpacity + 0.1);
        cells.forEach((c, i) => {
          const flicker = ((c.x * 3 + c.z * 7 + frame * 8) % 1) * 0.15;
          const yOff = -((frame * 2 + c.x * 0.1 + c.z * 0.07) % 1) * 0.35;
          dummy.position.set(
            c.x + worldOffset.x + 0.5,
            c.y + 0.5 + yOff,
            c.z + worldOffset.z + 0.5,
          );
          dummy.scale.set(0.8 + flicker, 1.05, 0.8 + flicker * 0.5);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        });
        dummy.scale.set(1, 1, 1);
        mesh.instanceMatrix.needsUpdate = true;
      }

      for (const mesh of cloudMeshes) {
        mesh.visible = cur.showClouds;
        const mat = mesh.material as THREE.MeshLambertMaterial;
        mat.opacity = 0.4 + cur.cloudDensity * 0.3;
      }

      const waterMesh = meshes.get('water');
      if (waterMesh) {
        const mat = waterMesh.material as THREE.MeshLambertMaterial;
        mat.opacity = cur.waterOpacity;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      boxGeo.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.InstancedMesh) {
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else m.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // Rebuild when structural settings change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.size,
    settings.seed,
    settings.mountainHeight,
    settings.cloudHeight,
    settings.cloudDensity,
    settings.vegetation,
    settings.showClouds,
  ]);

  // Live-tweak non-structural settings without full rebuild (handled via settingsRef in animate)
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  return <div className="scene-root" ref={mountRef} />;
}
