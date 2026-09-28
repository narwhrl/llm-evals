import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { generateWorld } from '../world/generate.js';
import {
  buildCloudMesh,
  buildTerrainMesh,
  buildVegetationMesh,
  buildWaterMesh,
  createSpray,
} from '../world/mesh.js';
import { skyFragment, skyVertex } from '../world/shaders.js';

export const DEFAULT_PARAMS = {
  seed: 20260827,
  size: 128,
  mountainHeight: 48,
  roughness: 0.52,
  waterfallWidth: 2,
  flowSpeed: 1.35,
  cloudHeight: 0.5,
  cloudDensity: 0.42,
  cloudOpacity: 0.74,
  vegetation: 0.78,
  timeOfDay: 0.22,
  fogDensity: 0.011,
  autoRotate: true,
  rotateSpeed: 0.1,
};

export function createEngine(container, rebuild, liveRef, onStats) {
  const world = generateWorld(rebuild);
  const origin = -world.size / 2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    46,
    container.clientWidth / Math.max(1, container.clientHeight),
    0.1,
    800,
  );
  const lookY = world.worldMax * 0.34;
  camera.position.set(world.size * 0.22, world.worldMax * 1.05, world.size * 1.05);
  camera.lookAt(0, lookY, -world.size * 0.04);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.target.set(0, lookY, -world.size * 0.04);
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minDistance = world.size * 0.4;
  controls.maxDistance = world.size * 2.2;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.45;

  const sky = createSky();
  scene.add(sky);

  const hemi = new THREE.HemisphereLight(0xffe6c8, 0x2f4a28, 0.85);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffd2a8, 1.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 10;
  sun.shadow.camera.far = 260;
  sun.shadow.camera.left = -world.size * 0.62;
  sun.shadow.camera.right = world.size * 0.62;
  sun.shadow.camera.top = world.size * 0.62;
  sun.shadow.camera.bottom = -world.size * 0.62;
  sun.shadow.bias = -0.00045;
  scene.add(sun);
  scene.add(sun.target);

  const fill = new THREE.DirectionalLight(0x8eb6ff, 0.32);
  fill.position.set(-50, 36, -24);
  scene.add(fill);

  scene.add(
    buildTerrainMesh(world, origin),
    buildWaterMesh(world, origin),
    buildVegetationMesh(world, origin),
    buildCloudMesh(world, origin, rebuild.cloudOpacity),
    createSpray(world, origin),
  );

  const water = scene.children.find((c) => c.material && c.material.uniforms && c.material.uniforms.uTime);
  const clouds = scene.children.find((c) => c.isInstancedMesh);
  const spray = scene.children.find((c) => c.isPoints);

  scene.fog = new THREE.FogExp2(0xe7c09a, 0.011);
  applyPalette(scene, sky, hemi, sun, sampleDaytime(rebuild.timeOfDay), renderer);

  const clock = new THREE.Clock();
  let frames = 0;
  let fpsTime = 0;
  let lastDay = rebuild.timeOfDay;
  let raf = 0;
  let disposed = false;

  const onResize = () => {
    if (disposed) return;
    const w = container.clientWidth;
    const h = Math.max(1, container.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  const tick = () => {
    if (disposed) return;
    raf = requestAnimationFrame(tick);
    const dt = clock.getDelta();
    const t = clock.elapsedTime;
    const live = liveRef.current;

    controls.autoRotate = !!live.autoRotate;
    controls.autoRotateSpeed = live.rotateSpeed * 5;
    controls.update();

    if (water && water.material.uniforms) {
      water.material.uniforms.uTime.value = t;
      water.material.uniforms.uSpeed.value = live.flowSpeed;
    }

    if (clouds) {
      clouds.material.opacity = live.cloudOpacity;
      clouds.position.x = Math.sin(t * 0.03) * 2.2;
      clouds.position.z = Math.cos(t * 0.022) * 1.4;
    }

    if (spray && spray.userData.base) {
      const base = spray.userData.base;
      const arr = spray.geometry.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        const phase = t * (1.6 + (i % 7) * 0.11) + i * 0.05;
        arr[i] = base[i] + Math.sin(phase) * 0.16;
        arr[i + 1] = base[i + 1] + ((Math.sin(phase * 1.7) * 0.45 + t * 2.0 + i) % 2.2);
        arr[i + 2] = base[i + 2] + Math.cos(phase * 0.9) * 0.16;
      }
      spray.geometry.attributes.position.needsUpdate = true;
      spray.material.opacity = 0.38 + Math.sin(t * 2.1) * 0.08;
    }

    if (Math.abs(live.timeOfDay - lastDay) > 0.002) {
      lastDay = live.timeOfDay;
      applyPalette(scene, sky, hemi, sun, sampleDaytime(live.timeOfDay), renderer);
    }
    scene.fog.density = live.fogDensity;

    renderer.render(scene, camera);

    frames += 1;
    fpsTime += dt;
    if (fpsTime >= 0.5) {
      const fps = frames / fpsTime;
      frames = 0;
      fpsTime = 0;
      if (onStats) {
        onStats({
          fps,
          columns: world.size * world.size,
          clouds: world.clouds.length,
          water: world.waterfall.cells.length,
          trees: world.plants.trees.length,
        });
      }
    }
  };
  tick();

  return {
    world,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}

function createSky() {
  const geo = new THREE.SphereGeometry(420, 32, 24);
  const mat = new THREE.ShaderMaterial({
    vertexShader: skyVertex,
    fragmentShader: skyFragment,
    uniforms: {
      uTop: { value: new THREE.Color(0x7eb0d8) },
      uHorizon: { value: new THREE.Color(0xf3c7a2) },
      uBottom: { value: new THREE.Color(0x6a5344) },
      uSunDir: { value: new THREE.Vector3(0.4, 0.25, 0.3) },
      uSunColor: { value: new THREE.Color(0xffd0a0) },
    },
    side: THREE.BackSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  return mesh;
}

function sampleDaytime(t) {
  const u = Math.min(1, Math.max(0, t));
  const dawn = {
    top: 0x6286c2,
    horizon: 0xf0a878,
    bottom: 0x5a3d32,
    fog: 0xe7b48c,
    sun: 0xffc28a,
    hemiSky: 0xffd4ae,
    hemiGround: 0x2f4028,
    sunDir: new THREE.Vector3(0.72, 0.26, 0.38),
    sunIntensity: 1.15,
    exposure: 0.9,
  };
  const noon = {
    top: 0x5ea0e0,
    horizon: 0xc5e0f6,
    bottom: 0x7f96a6,
    fog: 0xc5d8e8,
    sun: 0xfff2d0,
    hemiSky: 0xe7f2ff,
    hemiGround: 0x3d4d32,
    sunDir: new THREE.Vector3(0.35, 0.86, 0.22),
    sunIntensity: 1.42,
    exposure: 1.0,
  };
  const dusk = {
    top: 0x35487c,
    horizon: 0xff8d5e,
    bottom: 0x3f2628,
    fog: 0xd07d62,
    sun: 0xff8040,
    hemiSky: 0xffae86,
    hemiGround: 0x2a221b,
    sunDir: new THREE.Vector3(-0.7, 0.2, 0.28),
    sunIntensity: 1.05,
    exposure: 0.88,
  };
  if (u < 0.5) return mixPalette(dawn, noon, u / 0.5);
  return mixPalette(noon, dusk, (u - 0.5) / 0.5);
}

function mixPalette(a, b, t) {
  const lerpColor = (ca, cb) => new THREE.Color(ca).lerp(new THREE.Color(cb), t);
  return {
    top: lerpColor(a.top, b.top),
    horizon: lerpColor(a.horizon, b.horizon),
    bottom: lerpColor(a.bottom, b.bottom),
    fog: lerpColor(a.fog, b.fog),
    sun: lerpColor(a.sun, b.sun),
    hemiSky: lerpColor(a.hemiSky, b.hemiSky),
    hemiGround: lerpColor(a.hemiGround, b.hemiGround),
    sunDir: a.sunDir.clone().lerp(b.sunDir, t).normalize(),
    sunIntensity: a.sunIntensity + (b.sunIntensity - a.sunIntensity) * t,
    exposure: a.exposure + (b.exposure - a.exposure) * t,
  };
}

function applyPalette(scene, sky, hemi, sun, p, renderer) {
  sky.material.uniforms.uTop.value.copy(p.top);
  sky.material.uniforms.uHorizon.value.copy(p.horizon);
  sky.material.uniforms.uBottom.value.copy(p.bottom);
  sky.material.uniforms.uSunDir.value.copy(p.sunDir);
  sky.material.uniforms.uSunColor.value.copy(p.sun);
  hemi.color.copy(p.hemiSky);
  hemi.groundColor.copy(p.hemiGround);
  sun.color.copy(p.sun);
  sun.intensity = p.sunIntensity;
  sun.position.copy(p.sunDir).multiplyScalar(120);
  sun.target.position.set(0, 8, 0);
  scene.fog.color.copy(p.fog);
  scene.background = p.horizon;
  if (renderer) renderer.toneMappingExposure = p.exposure;
}
