import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { createCelestiaWorld } from './celestia';
import { createEnvironment } from './environment';

declare global {
  interface Window {
    __CELESTIA_READY__?: boolean;
  }
}

const canvas = document.querySelector<HTMLCanvasElement>('#celestia-canvas');
if (!canvas) {
  throw new Error('The Celestia canvas could not be created.');
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  alpha: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.98;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xb7dbe8, 690, 2300);

const camera = new THREE.PerspectiveCamera(
  47,
  window.innerWidth / window.innerHeight,
  0.5,
  5200,
);
camera.position.set(250, 195, 400);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 34, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.enablePan = false;
controls.minDistance = 285;
controls.maxDistance = 880;
controls.minPolarAngle = 0.32;
controls.maxPolarAngle = 1.42;
controls.rotateSpeed = 0.36;
controls.zoomSpeed = 0.42;
controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
controls.autoRotateSpeed = 0.035;
controls.update();

const environment = createEnvironment();
scene.add(environment.group);

const celestia = createCelestiaWorld();
scene.add(celestia.group);

const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
  type: THREE.HalfFloatType,
  samples: 4,
  depthBuffer: true,
});
const composer = new EffectComposer(renderer, renderTarget);
composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
composer.setSize(window.innerWidth, window.innerHeight);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.22,
  0.58,
  1.08,
);
composer.addPass(bloom);

const colorGrade = new ShaderPass({
  uniforms: {
    tDiffuse: { value: null },
    uSoftness: { value: 1 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uSoftness;
    varying vec2 vUv;

    void main() {
      vec4 source = texture2D(tDiffuse, vUv);
      vec3 color = source.rgb;
      float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
      color = mix(vec3(luminance), color, 1.19);
      color *= vec3(1.025, 1.005, 0.97);
      color = (color - 0.5) * 1.035 + 0.5;
      float distanceFromCenter = length((vUv - 0.5) * vec2(1.08, 0.96));
      float vignette = 1.0 - smoothstep(0.38, 0.78, distanceFromCenter) * 0.19 * uSoftness;
      color *= vignette;
      gl_FragColor = vec4(color, source.a);
    }
  `,
});
composer.addPass(colorGrade);

composer.addPass(new OutputPass());

let previousTime = performance.now();
let elapsedTime = 0;
let firstFrame = true;

function setRendererSize(): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = Math.min(window.devicePixelRatio, width < 900 ? 1.35 : 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(width, height);
  camera.aspect = width / height;
  camera.fov = width / height < 1.05 ? 54 : 47;
  camera.updateProjectionMatrix();
  bloom.resolution.set(width, height);
}

window.addEventListener('resize', setRendererSize);

canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
});

renderer.compile(scene, camera);

renderer.setAnimationLoop(() => {
  const currentTime = performance.now();
  const delta = Math.min((currentTime - previousTime) / 1000, 0.05);
  previousTime = currentTime;
  elapsedTime += delta;
  const time = elapsedTime;
  controls.update(delta);
  environment.update(time, delta);
  celestia.update(time, delta);
  composer.render(delta);

  if (firstFrame) {
    firstFrame = false;
    window.__CELESTIA_READY__ = true;
    canvas.classList.add('is-ready');
    canvas.dataset.ready = 'true';
  }
});
