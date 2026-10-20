/**
 * Sky dome and lighting rig.
 */

import * as THREE from "three";

export interface SkyPreset {
  id: string;
  label: string;
  sunColor: number;
  sunIntensity: number;
  sunElevation: number;
  sunAzimuth: number;
  topColor: number;
  horizonColor: number;
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  ambient: number;
  fogDensity: number;
  exposure: number;
}

export const SKY_PRESETS: SkyPreset[] = [
  {
    id: "dawn",
    label: "晨光",
    sunColor: 0xffb877,
    sunIntensity: 2.3,
    sunElevation: 12,
    sunAzimuth: 112,
    topColor: 0x24406e,
    horizonColor: 0xf0a464,
    hemiSky: 0x9fb8de,
    hemiGround: 0x6d5a42,
    hemiIntensity: 0.9,
    ambient: 0.26,
    fogDensity: 0.0022,
    exposure: 1.05,
  },
  {
    id: "noon",
    label: "正午",
    sunColor: 0xfff6e4,
    sunIntensity: 2.9,
    sunElevation: 58,
    sunAzimuth: 44,
    topColor: 0x2f6fbb,
    horizonColor: 0xbcd9f0,
    hemiSky: 0xa9cdee,
    hemiGround: 0x5f6a4e,
    hemiIntensity: 0.8,
    ambient: 0.14,
    fogDensity: 0.0013,
    exposure: 0.95,
  },
  {
    id: "dusk",
    label: "暮色",
    sunColor: 0xff8f57,
    sunIntensity: 2.1,
    sunElevation: 8,
    sunAzimuth: 244,
    topColor: 0x1a2050,
    horizonColor: 0xdb6d3d,
    hemiSky: 0x7d86c0,
    hemiGround: 0x5a4433,
    hemiIntensity: 0.95,
    ambient: 0.26,
    fogDensity: 0.0026,
    exposure: 1.12,
  },
  {
    id: "night",
    label: "夜色",
    sunColor: 0x9fb6ef,
    sunIntensity: 0.6,
    sunElevation: 44,
    sunAzimuth: 300,
    topColor: 0x05080f,
    horizonColor: 0x121c34,
    hemiSky: 0x27324f,
    hemiGround: 0x11161f,
    hemiIntensity: 0.55,
    ambient: 0.12,
    fogDensity: 0.0032,
    exposure: 1.2,
  },
];

const SKY_VERTEX = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uSunColor;
  uniform vec3 uSunDirection;
  uniform float uSunStrength;
  varying vec3 vDir;

  void main() {
    vec3 dir = normalize(vDir);
    float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(uHorizon, uTop, pow(h, 0.7));
    float sun = max(dot(dir, normalize(uSunDirection)), 0.0);
    color += uSunColor * pow(sun, 1400.0) * 7.0 * uSunStrength;
    color += uSunColor * pow(sun, 14.0) * 0.3 * uSunStrength;
    color += uSunColor * pow(sun, 3.0) * 0.08 * uSunStrength;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface SkyRig {
  sky: THREE.Mesh;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  ambient: THREE.AmbientLight;
  apply: (preset: SkyPreset) => void;
  dispose: () => void;
}

export function createSkyRig(): SkyRig {
  const geometry = new THREE.SphereGeometry(1, 32, 20);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: new THREE.Color(0x2f6fbb) },
      uHorizon: { value: new THREE.Color(0xbcd9f0) },
      uSunColor: { value: new THREE.Color(0xfff6e4) },
      uSunDirection: { value: new THREE.Vector3(0.4, 0.6, 0.6) },
      uSunStrength: { value: 1 },
    },
    vertexShader: SKY_VERTEX,
    fragmentShader: SKY_FRAGMENT,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
  });
  const sky = new THREE.Mesh(geometry, material);
  sky.scale.setScalar(5000);
  sky.renderOrder = -1000;
  sky.frustumCulled = false;

  const sun = new THREE.DirectionalLight(0xffffff, 2.9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 700;
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.04;

  const hemi = new THREE.HemisphereLight(0xa9cdee, 0x5f6a4e, 0.8);
  const ambient = new THREE.AmbientLight(0xffffff, 0.14);

  return {
    sky,
    sun,
    hemi,
    ambient,
    apply: (preset: SkyPreset) => {
      const elevation = THREE.MathUtils.degToRad(preset.sunElevation);
      const azimuth = THREE.MathUtils.degToRad(preset.sunAzimuth);
      const direction = new THREE.Vector3(
        Math.cos(elevation) * Math.sin(azimuth),
        Math.sin(elevation),
        Math.cos(elevation) * Math.cos(azimuth),
      );
      material.uniforms.uTop.value.setHex(preset.topColor);
      material.uniforms.uHorizon.value.setHex(preset.horizonColor);
      material.uniforms.uSunColor.value.setHex(preset.sunColor);
      material.uniforms.uSunDirection.value.copy(direction);
      material.uniforms.uSunStrength.value = preset.sunIntensity / 2.6;

      sun.color.setHex(preset.sunColor);
      sun.intensity = preset.sunIntensity;
      sun.position.copy(direction).multiplyScalar(260);

      hemi.color.setHex(preset.hemiSky);
      hemi.groundColor.setHex(preset.hemiGround);
      hemi.intensity = preset.hemiIntensity;
      ambient.intensity = preset.ambient;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}
