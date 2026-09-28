import {
  AmbientLight,
  BackSide,
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from "three";

const SKY_VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SKY_FRAGMENT = /* glsl */ `
uniform vec3 topColor;
uniform vec3 horizonColor;
uniform vec3 sunColor;
uniform vec3 sunDir;
varying vec3 vWorld;
void main() {
  vec3 dir = normalize(vWorld);
  float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(horizonColor, topColor, pow(h, 0.75));
  float align = max(dot(dir, normalize(sunDir)), 0.0);
  col += sunColor * pow(align, 48.0) * 1.1;
  col += sunColor * pow(align, 5.0) * 0.16;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** 晨 / 午 / 昏三档；太阳方位取负值，让光从西侧来、影子朝镜头方向铺开。 */
export const TIME_OF_DAY = {
  dawn: {
    label: "晨",
    sun: { azimuth: -0.62, elevation: 0.2, color: 0xffc48f, intensity: 2.15 },
    hemi: { sky: 0x9db4d6, ground: 0x5a4a3c, intensity: 0.5 },
    ambient: 0.17,
    sky: { top: 0x41629b, horizon: 0xe9bb8b, sun: 0xffd8a4 },
    fog: { color: 0xd8b39a, near: 260, far: 920 },
    exposure: 1.0,
    glow: 0.4,
  },
  noon: {
    label: "午",
    sun: { azimuth: -0.5, elevation: 0.92, color: 0xfff5e2, intensity: 2.85 },
    hemi: { sky: 0xaac9e8, ground: 0x6e5d49, intensity: 0.66 },
    ambient: 0.2,
    sky: { top: 0x3c7dd2, horizon: 0xdbe8f3, sun: 0xfffdf4 },
    fog: { color: 0xd2dfee, near: 300, far: 1150 },
    exposure: 1.05,
    glow: 0.0,
  },
  dusk: {
    label: "昏",
    sun: { azimuth: -0.95, elevation: 0.14, color: 0xff9a58, intensity: 2.0 },
    hemi: { sky: 0x6a6f9c, ground: 0x4b3b33, intensity: 0.42 },
    ambient: 0.14,
    sky: { top: 0x2c3a64, horizon: 0xf0a273, sun: 0xffb168 },
    fog: { color: 0xd18c6c, near: 240, far: 880 },
    exposure: 0.98,
    glow: 1.0,
  },
};

const scratchDir = new Vector3();

export class Environment {
  constructor(scene, { bounds }) {
    this.scene = scene;
    this.bounds = bounds;

    this.sun = new DirectionalLight(0xffffff, 2.6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(4096, 4096);
    this.sun.shadow.bias = -0.0004;
    // 体素是 1×1×1 的立方体，法线偏移比 bias 更有效，能压掉大片阴影痤疮。
    this.sun.shadow.normalBias = 0.7;
    this.sun.target.position.set(0, 0, 0);
    scene.add(this.sun);
    scene.add(this.sun.target);

    this.hemi = new HemisphereLight(0xaac9e8, 0x6e5d49, 0.6);
    scene.add(this.hemi);

    this.ambient = new AmbientLight(0xffffff, 0.2);
    scene.add(this.ambient);

    const center = this.centerOf(bounds);
    const radius = this.radiusOf(bounds);
    const camera = this.sun.shadow.camera;
    camera.left = -radius;
    camera.right = radius;
    camera.top = radius;
    camera.bottom = -radius;
    camera.near = 1;
    camera.far = radius * 6;
    camera.updateProjectionMatrix();
    this.sun.target.position.copy(center);

    this.skyMaterial = new ShaderMaterial({
      uniforms: {
        topColor: { value: new Color(0x3c7dd2) },
        horizonColor: { value: new Color(0xdbe8f3) },
        sunColor: { value: new Color(0xfffdf4) },
        sunDir: { value: new Vector3(0, 1, 0) },
      },
      vertexShader: SKY_VERTEX,
      fragmentShader: SKY_FRAGMENT,
      side: BackSide,
      depthWrite: false,
      fog: false,
    });
    this.sky = new Mesh(new SphereGeometry(radius * 6, 32, 20), this.skyMaterial);
    this.sky.name = "sky";
    scene.add(this.sky);

    this.fog = new Fog(0xd2dfee, 300, 1150);
    scene.fog = this.fog;
    scene.background = null;

    this.lanternMaterials = [];
    this.setTimeOfDay("noon");
  }

  centerOf(bounds) {
    return new Vector3((bounds.minX + bounds.maxX) / 2, Math.min(30, bounds.maxY * 0.4), (bounds.minZ + bounds.maxZ) / 2);
  }

  radiusOf(bounds) {
    return Math.max(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ) * 0.62;
  }

  /** 灯笼等自发光材质随晨昏变化：黄昏点亮，正午几乎熄灭。 */
  setLanternMaterials(materials) {
    this.lanternMaterials = materials;
    this.applyGlow(this.glow ?? 0);
  }

  applyGlow(glow) {
    for (const material of this.lanternMaterials) {
      material.emissiveIntensity = 0.55 + glow * 2.1;
    }
  }

  setTimeOfDay(key) {
    const preset = TIME_OF_DAY[key] ?? TIME_OF_DAY.noon;
    this.key = key in TIME_OF_DAY ? key : "noon";
    this.glow = preset.glow;

    const { azimuth, elevation, color, intensity } = preset.sun;
    scratchDir
      .set(
        Math.sin(azimuth) * Math.cos(elevation),
        Math.sin(elevation),
        Math.cos(azimuth) * Math.cos(elevation),
      )
      .normalize();
    const center = this.centerOf(this.bounds);
    this.sun.position.copy(center).addScaledVector(scratchDir, this.radiusOf(this.bounds) * 2.4);
    this.sun.color.setHex(color);
    this.sun.intensity = intensity;

    this.hemi.color.setHex(preset.hemi.sky);
    this.hemi.groundColor.setHex(preset.hemi.ground);
    this.hemi.intensity = preset.hemi.intensity;
    this.ambient.intensity = preset.ambient;

    this.skyMaterial.uniforms.topColor.value.setHex(preset.sky.top);
    this.skyMaterial.uniforms.horizonColor.value.setHex(preset.sky.horizon);
    this.skyMaterial.uniforms.sunColor.value.setHex(preset.sky.sun);
    this.skyMaterial.uniforms.sunDir.value.copy(scratchDir);

    this.fog.color.setHex(preset.fog.color);
    this.fog.near = preset.fog.near;
    this.fog.far = preset.fog.far;
    this.scene.background = new Color(preset.sky.horizon);

    this.applyGlow(preset.glow);
    return preset;
  }

  resize(bounds) {
    this.bounds = bounds;
    this.sky.scale.setScalar(this.radiusOf(bounds) / (this.radiusOf(bounds) || 1));
    this.setTimeOfDay(this.key);
  }
}
