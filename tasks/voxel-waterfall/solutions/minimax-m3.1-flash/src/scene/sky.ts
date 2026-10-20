/**
 * Sky dome and the lighting rig.
 *
 * The sky is a single inverted sphere with a gradient shader plus a sun disc
 * and bloom halo. It is parented to the camera so it always surrounds the
 * viewer and never clips against the terrain.
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
    label: "晨曦",
    sunColor: 0xffb478,
    sunIntensity: 2.4,
    sunElevation: 11,
    sunAzimuth: 108,
    topColor: 0x1b2c56,
    horizonColor: 0xf0a05f,
    hemiSky: 0x9db4dd,
    hemiGround: 0x6b5a45,
    hemiIntensity: 0.85,
    ambient: 0.18,
    fogDensity: 0.0032,
    exposure: 1.05,
  },
  {
    id: "morning",
    label: "清晨",
    sunColor: 0xfff0d2,
    sunIntensity: 2.9,
    sunElevation: 33,
    sunAzimuth: 74,
    topColor: 0x3d7ec6,
    horizonColor: 0xcfe4f6,
    hemiSky: 0xa8c8ea,
    hemiGround: 0x6a7059,
    hemiIntensity: 0.8,
    ambient: 0.14,
    fogDensity: 0.0022,
    exposure: 1.0,
  },
  {
    id: "noon",
    label: "正午",
    sunColor: 0xfffdf4,
    sunIntensity: 3.1,
    sunElevation: 63,
    sunAzimuth: 38,
    topColor: 0x2c6fbb,
    horizonColor: 0xbcd9f0,
    hemiSky: 0xa9cdee,
    hemiGround: 0x5f6a4e,
    hemiIntensity: 0.75,
    ambient: 0.12,
    fogDensity: 0.0016,
    exposure: 0.95,
  },
  {
    id: "dusk",
    label: "黄昏",
    sunColor: 0xff8b54,
    sunIntensity: 2.2,
    sunElevation: 7,
    sunAzimuth: 248,
    topColor: 0x182046,
    horizonColor: 0xdd6b3c,
    hemiSky: 0x7d86c0,
    hemiGround: 0x5a4433,
    hemiIntensity: 0.8,
    ambient: 0.16,
    fogDensity: 0.0036,
    exposure: 1.05,
  },
  {
    id: "night",
    label: "月夜",
    sunColor: 0x9fb6ef,
    sunIntensity: 0.55,
    sunElevation: 46,
    sunAzimuth: 300,
    topColor: 0x04070f,
    horizonColor: 0x0e1830,
    hemiSky: 0x27324f,
    hemiGround: 0x11161f,
    hemiIntensity: 0.5,
    ambient: 0.1,
    fogDensity: 0.0042,
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
    vec3 color = mix(uHorizon, uTop, pow(h, 0.75));
    float sun = max(dot(dir, normalize(uSunDirection)), 0.0);
    color += uSunColor * pow(sun, 900.0) * 6.0 * uSunStrength;
    color += uSunColor * pow(sun, 12.0) * 0.28 * uSunStrength;
    color += uSunColor * pow(sun, 3.0) * 0.08 * uSunStrength;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface SkyRig {
  sky: THREE.Mesh;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  ambient: THREE.AmbientLight;
  sunDirection: THREE.Vector3;
  apply: (preset: SkyPreset) => void;
  dispose: () => void;
}

export function createSkyRig(): SkyRig {
  const geometry = new THREE.SphereGeometry(1, 32, 20);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: new THREE.Color(0x2c6fbb) },
      uHorizon: { value: new THREE.Color(0xbcd9f0) },
      uSunColor: { value: new THREE.Color(0xfffdf4) },
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
  sky.scale.setScalar(4000);
  sky.renderOrder = -1000;
  sky.frustumCulled = false;

  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 900;
  sun.shadow.bias = -0.0009;
  sun.shadow.normalBias = 0.035;

  const hemi = new THREE.HemisphereLight(0xa9cdee, 0x5f6a4e, 0.75);
  const ambient = new THREE.AmbientLight(0xffffff, 0.12);

  const sunDirection = new THREE.Vector3();

  return {
    sky,
    sun,
    hemi,
    ambient,
    sunDirection,
    apply: (preset: SkyPreset) => {
      const elevation = THREE.MathUtils.degToRad(preset.sunElevation);
      const azimuth = THREE.MathUtils.degToRad(preset.sunAzimuth);
      sunDirection.set(
        Math.cos(elevation) * Math.sin(azimuth),
        Math.sin(elevation),
        Math.cos(elevation) * Math.cos(azimuth),
      );
      material.uniforms.uTop.value.setHex(preset.topColor);
      material.uniforms.uHorizon.value.setHex(preset.horizonColor);
      material.uniforms.uSunColor.value.setHex(preset.sunColor);
      material.uniforms.uSunDirection.value.copy(sunDirection);
      material.uniforms.uSunStrength.value = preset.sunIntensity / 2.6;

      sun.color.setHex(preset.sunColor);
      sun.intensity = preset.sunIntensity;
      sun.position.copy(sunDirection).multiplyScalar(320);

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
