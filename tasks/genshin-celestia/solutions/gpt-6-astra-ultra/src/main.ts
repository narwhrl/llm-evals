import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createIslands } from './islands';
import { createArchitecture } from './architecture';
import { createAtmosphere } from './atmosphere';
import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;

function showError(message: string) {
  const error = document.createElement('p');
  error.className = 'error';
  error.textContent = message;
  document.body.append(error);
}

async function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#b7d9e5', 0.00065);
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.5, 6000);
  const initialPosition = new THREE.Vector3(335, 140, 220);
  const target = new THREE.Vector3(0, 27, 0);
  camera.position.copy(initialPosition);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.minDistance = 150;
  controls.maxDistance = 720;
  controls.minPolarAngle = Math.PI * 0.18;
  controls.maxPolarAngle = Math.PI * 0.65;
  controls.rotateSpeed = 0.48;
  controls.zoomSpeed = 0.7;
  controls.update();

  scene.add(new THREE.HemisphereLight('#c3e7ff', '#456071', 1.15));
  const sunlight = new THREE.DirectionalLight('#fff0cd', 2.35);
  sunlight.position.set(-130, 240, 130);
  sunlight.target.position.set(0, 20, 0);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(4096, 4096);
  sunlight.shadow.camera.left = -190;
  sunlight.shadow.camera.right = 190;
  sunlight.shadow.camera.top = 210;
  sunlight.shadow.camera.bottom = -160;
  sunlight.shadow.camera.near = 30;
  sunlight.shadow.camera.far = 600;
  sunlight.shadow.normalBias = 0.3;
  sunlight.shadow.bias = -0.00008;
  sunlight.shadow.radius = 2;
  scene.add(sunlight, sunlight.target);
  const rim = new THREE.DirectionalLight('#b0d7f8', 0.8);
  rim.position.set(50, 50, -150);
  scene.add(rim);

  const islands = createIslands();
  const architecture = createArchitecture();
  const atmosphere = createAtmosphere();
  islands.group.scale.set(1.18, 0.9, 1.18);
  architecture.group.scale.set(1.18, 0.9, 1.18);
  scene.add(atmosphere.group, islands.group, architecture.group);
  atmosphere.update(0, camera);

  let disposed = false;
  let animationFrame = 0;
  let elapsed = 0;
  let previousTime = performance.now();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const render = (time: number) => {
    if (disposed) return;
    const delta = Math.min((time - previousTime) / 1000, 0.1);
    previousTime = time;
    if (!document.hidden) {
      if (!reducedMotion) elapsed += delta;
      controls.update();
      architecture.update(elapsed);
      islands.update(elapsed);
      atmosphere.update(elapsed, camera);
      renderer.render(scene, camera);
    }
    animationFrame = requestAnimationFrame(render);
  };

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.fov = camera.aspect < 1 ? 58 : 42;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const resetView = () => {
    const fit = Math.max(1, 1.3 / camera.aspect);
    camera.position.copy(initialPosition).sub(target).multiplyScalar(fit).add(target);
    controls.target.copy(target);
    controls.update();
  };
  resize();
  resetView();
  window.addEventListener('resize', resize);
  canvas.addEventListener('dblclick', resetView);
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    cancelAnimationFrame(animationFrame);
    showError('图形上下文已中断，请刷新页面重新加载天空岛。');
  });

  if (renderer.extensions.has('KHR_parallel_shader_compile')) await renderer.compileAsync(scene, camera);
  else renderer.compile(scene, camera);
  renderer.shadowMap.needsUpdate = true;
  animationFrame = requestAnimationFrame(render);

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    disposed = true;
    cancelAnimationFrame(animationFrame);
    controls.dispose();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line || object instanceof THREE.Sprite) {
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          materials.add(material);
          for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
          if (material instanceof THREE.ShaderMaterial) {
            for (const uniform of Object.values(material.uniforms)) if (uniform.value instanceof THREE.Texture) textures.add(uniform.value);
          }
        }
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
    sunlight.shadow.dispose();
    renderer.dispose();
    window.removeEventListener('resize', resize);
  });
}

start().catch((error: unknown) => {
  console.error(error);
  showError('无法初始化三维场景。请使用支持 WebGL 2 的浏览器并开启硬件加速。');
});
