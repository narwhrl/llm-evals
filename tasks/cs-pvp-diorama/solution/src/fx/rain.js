// 雨丝：GPU 驱动的实例化雨条。下落、竖直环绕、倾斜全部在顶点着色器里由 uTime 推出，
// 每帧只写 uniform（时间 / 强度 / 相机基向量），整片雨只有一次 draw call。
import * as THREE from 'three';
import { clamp, makeRng } from '../gfx/rng.js';

// 全场景统一的轻微雨势方向：近乎竖直，避免雨条变成夸张的斜线。
const WIND = new THREE.Vector3(0.055, -1, 0.028).normalize();

// 与场景 FogExp2(0x0b1119, 0.0075) 一致，让远处雨丝自然没入雾中而不是硬边裁切。
const FOG_DENSITY = 0.0075;

// 屋顶遮挡区上限（着色器里是定长循环，必须是编译期常量）。
const ROOF_LIMIT = 3;

const vertexShader = `
uniform float uTime;
uniform float uIntensity;
uniform vec3 uFallDir;
uniform float uHeight;
uniform vec3 uCamRight;
uniform vec3 uCamPos;
uniform float uMaxAlpha;
uniform vec4 uRoofPlan[${ROOF_LIMIT}]; // (minX, minZ, maxX, maxZ)
uniform float uRoofTop[${ROOF_LIMIT}]; // 顶面标高

attribute vec2 aHome;   // 雨滴所在的水平位置
attribute float aPhase; // 0..1 循环相位
attribute float aSpeed; // 单位/秒
attribute float aSeed;  // 0..1，决定亮度抖动与强度剔除顺序
attribute vec2 aSize;   // (雨条宽度, 雨条长度)

varying vec2 vUv;
varying float vAlpha;

void main() {
  vUv = uv;

  // 强度即"保留多少雨滴"：种子大于强度的雨滴直接塌缩为零面积
  float alive = step(aSeed, uIntensity);
  float fall = fract(aPhase + uTime * aSpeed / uHeight);
  vec3 center = vec3(aHome.x, uHeight, aHome.y) + uFallDir * (fall * uHeight);

  // 长轴恒为世界下落方向（近似竖直），只有宽度轴朝向相机水平垂线，不做完整公告板
  vec3 side = vec3(uCamRight.x, 0.0, uCamRight.z);
  side = length(side) > 1e-4 ? normalize(side) : vec3(1.0, 0.0, 0.0);

  vec3 local = center
    + side * (position.x * aSize.x * alive)
    + uFallDir * (position.y * aSize.y * alive);
  vec3 world = (modelMatrix * vec4(local, 1.0)).xyz;

  // 循环首尾淡化，避免雨滴在高空凭空出现或在落地前突然消失
  float edge = smoothstep(0.0, 0.05, fall) * (1.0 - smoothstep(0.95, 1.0, fall));
  float dist = distance(uCamPos, world);
  float fog = exp(-pow(${FOG_DENSITY.toFixed(4)} * dist, 2.0));
  float far = 1.0 - smoothstep(90.0, 170.0, dist);
  vAlpha = uMaxAlpha * edge * fog * far * mix(0.5, 1.0, aSeed) * alive;

  // 屋盖遮挡：屋顶平面内、顶面以下的雨丝直接消隐，否则室内会看到穿顶的雨。
  for (int i = 0; i < ${ROOF_LIMIT}; i += 1) {
    vec4 plan = uRoofPlan[i];
    if (world.x > plan.x && world.x < plan.z && world.z > plan.y && world.z < plan.w && world.y < uRoofTop[i]) {
      vAlpha = 0.0;
    }
  }

  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColor;
varying vec2 vUv;
varying float vAlpha;

void main() {
  // 横向柔边形成细线，纵向两端同时衰减
  float across = 1.0 - abs(vUv.x * 2.0 - 1.0);
  float body = across * across;
  float along = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.7, 1.0, vUv.y));
  float alpha = vAlpha * body * along;
  if (alpha < 0.002) discard;
  // 加法混合下最终贡献为 uColor * alpha，峰值低于泛光阈值
  gl_FragColor = vec4(uColor, alpha);
}
`;

export function createRain({ rng, layer = 1, count = 4200, area = { size: 58, height: 26 }, roofs = [] } = {}) {
  const random = rng ?? makeRng(0x7a17);
  const size = Math.max(1, area.size ?? 58);
  const height = Math.max(1, area.height ?? 26);
  const drops = Math.max(0, Math.floor(count));
  if (roofs.length > ROOF_LIMIT) {
    throw new Error(`createRain supports at most ${ROOF_LIMIT} roof zones, got ${roofs.length}`);
  }

  // 基础 quad：复制 index / position / uv 到实例化几何体
  const quad = new THREE.PlaneGeometry(1, 1);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setIndex(Array.from(quad.index.array));
  geometry.setAttribute('position', quad.attributes.position.clone());
  geometry.setAttribute('uv', quad.attributes.uv.clone());
  quad.dispose();

  const home = new Float32Array(drops * 2);
  const phase = new Float32Array(drops);
  const speed = new Float32Array(drops);
  const dims = new Float32Array(drops * 2);
  const seed = new Float32Array(drops);

  // 水平范围预留一个倾斜预算，保证雨条整根都落在 64×64 底座之内
  const slantBudget = height * Math.hypot(WIND.x, WIND.z);
  const half = Math.max(0.5, size * 0.5 - slantBudget);
  for (let i = 0; i < drops; i += 1) {
    home[i * 2] = random.range(-half, half);
    home[i * 2 + 1] = random.range(-half, half);
    phase[i] = random.next();
    speed[i] = random.range(14, 24);
    dims[i * 2] = random.range(0.012, 0.02);
    dims[i * 2 + 1] = random.range(0.45, 1.1);
    seed[i] = random.next();
  }
  geometry.setAttribute('aHome', new THREE.InstancedBufferAttribute(home, 2));
  geometry.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  geometry.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speed, 1));
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 1));
  geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(dims, 2));
  geometry.instanceCount = drops;

  const uniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 1 },
    uFallDir: { value: WIND.clone() },
    uHeight: { value: height },
    uCamRight: { value: new THREE.Vector3(1, 0, 0) },
    uCamPos: { value: new THREE.Vector3() },
    uColor: { value: new THREE.Color(0x9fb6cc) },
    uMaxAlpha: { value: 0.3 },
    // 未使用的槽位填退化的范围，着色器里永远匹配不上
    uRoofPlan: {
      value: Array.from({ length: ROOF_LIMIT }, (_, i) => {
        const roof = roofs[i];
        return roof ? new THREE.Vector4(roof.minX, roof.minZ, roof.maxX, roof.maxZ) : new THREE.Vector4(1, 1, -1, -1);
      }),
    },
    uRoofTop: { value: Array.from({ length: ROOF_LIMIT }, (_, i) => roofs[i]?.top ?? -1) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.layers.set(layer);

  let disposed = false;

  return {
    object3D: mesh,

    // 只写 uniform：不重建数组，不触碰 instanceMatrix
    update(dt, elapsed, camera) {
      uniforms.uTime.value = elapsed;
      if (!camera || !camera.matrixWorld) return;
      camera.updateMatrixWorld();
      const e = camera.matrixWorld.elements;
      uniforms.uCamRight.value.set(e[0], e[1], e[2]);
      uniforms.uCamPos.value.set(e[12], e[13], e[14]);
    },

    setIntensity(value) {
      uniforms.uIntensity.value = clamp(value, 0, 1);
    },

    dispose() {
      if (disposed) return;
      disposed = true;
      geometry.dispose();
      material.dispose();
    },

    stats: {
      get drops() {
        return drops;
      },
      get drawCalls() {
        return 1;
      },
    },
  };
}
