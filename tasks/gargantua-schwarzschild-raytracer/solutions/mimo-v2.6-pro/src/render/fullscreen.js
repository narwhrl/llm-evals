// 全屏三角形几何 + Raytracer / Final 两个 ShaderMaterial 的构建。
// Three.js 几何仅承载全屏 Shader 与交互相机，不参与成像。
import * as THREE from '../../vendor/three/three.module.js';
import raytracerVert from '../shaders/raytracer.vert.glsl?raw';
import raytracerFrag from '../shaders/raytracer.frag.glsl?raw';
import finalFrag from '../shaders/final.frag.glsl?raw';

export function createFullscreenTriangle() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
  );
  return geometry;
}

export function createRaytracerMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: raytracerVert,
    fragmentShader: raytracerFrag,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uCamPos: { value: new THREE.Vector3() },
      uCamRight: { value: new THREE.Vector3(1, 0, 0) },
      uCamUp: { value: new THREE.Vector3(0, 1, 0) },
      uCamForward: { value: new THREE.Vector3(0, 0, -1) },
      uTanHalfFov: { value: Math.tan((60 * Math.PI) / 360) },
      uAspect: { value: 1 },
      uSimTime: { value: 0 },
      uDebugView: { value: 0 },
      uMaxSteps: { value: 340 },
      uMaxCrossings: { value: 5 },
      uOctaves: { value: 4 },
      // 吸积盘 / 背景参数（见 state/defaults.js 参数表）
      uDiskInner: { value: 3.0 },
      uDiskOuter: { value: 12.0 },
      uDiskHalfH: { value: 0.25 },
      uDiskTemp: { value: 1.0 },
      uDiskEmission: { value: 1.5 },
      uOrbitSpeed: { value: 1.0 },
      uTurbAmp: { value: 0.55 },
      uTurbSpeed: { value: 1.0 },
      uStarDensity: { value: 1.0 },
      uGalaxyBright: { value: 0.6 },
    },
  });
}

const FINAL_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export function createFinalMaterial() {
  return {
    uniforms: {
      tDiffuse: { value: null },
      uExposure: { value: 1.1 },
      uVignette: { value: 0.35 },
      uGrain: { value: 0.12 },
      uChroma: { value: 0.25 },
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uCATaps: { value: 3 },
    },
    vertexShader: FINAL_VERT,
    fragmentShader: finalFrag,
  };
}
