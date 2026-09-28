// 通风口白汽：每个排气口按自己的速率吐出 puff，puff 在顶点着色器里随时间上升、膨胀、
// 漂移并淡入淡出。参数走 uniform 数组（按实例的源索引取值），单次 draw call。
import * as THREE from 'three';
import { clamp, fbm2D, makeRng } from '../gfx/rng.js';

// 与场景 FogExp2(0x0b1119, 0.0075) 一致
const FOG_DENSITY = 0.0075;
// 排气口数量上限（着色器 uniform 数组容量，shader 里的 #define 由此注入）
const MAX_SOURCES = 64;
// 膨胀范围与漂移扰动
const SCALE_FROM = 0.3;
const SCALE_TO = 2.2;

const vertexShader = `
#define MAX_SOURCES ${MAX_SOURCES}

uniform float uTime;
uniform float uIntensity;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamPos;
uniform vec4 uSourceA[MAX_SOURCES]; // xyz = 排气口位置，w = puff 直径
uniform vec4 uSourceB[MAX_SOURCES]; // x = 上升速度，yz = 漂移，w = 存活秒数

attribute float aSource; // 排气口索引
attribute float aPhase;  // 0..1 错峰相位
attribute float aSeed;   // 0..1 抖动种子

varying vec2 vUv;
varying float vAlpha;

void main() {
  vUv = uv;

  int si = int(aSource + 0.5);
  vec4 srcA = uSourceA[si];
  vec4 srcB = uSourceB[si];

  float life = srcB.w;
  float age = fract(aPhase + uTime / life) * life;
  float p = clamp(age / life, 0.0, 1.0);

  // 强度即"保留多少 puff"：种子大于强度的 puff 直接塌缩为零面积
  float alive = step(fract(aSeed * 7.317), uIntensity);

  vec3 center = srcA.xyz
    + vec3(srcB.y * age, srcB.x * age, srcB.z * age)
    + vec3(sin(age * 1.7 + aSeed * 6.2831853), 0.0, cos(age * 1.3 + aSeed * 3.1)) * 0.06;
  float scale = srcA.w * mix(${SCALE_FROM.toFixed(1)}, ${SCALE_TO.toFixed(1)}, smoothstep(0.0, 1.0, p));

  // 完整公告板 + 逐 puff 自转，避免所有水汽朝向一致
  float spin = aSeed * 6.2831853 + age * 0.5;
  float cs = cos(spin);
  float sn = sin(spin);
  vec2 corner = vec2(position.x * cs - position.y * sn, position.x * sn + position.y * cs)
    * scale * alive;
  vec3 local = center + uCamRight * corner.x + uCamUp * corner.y;

  float fade = smoothstep(0.0, 0.15, p) * (1.0 - smoothstep(0.4, 1.0, p));
  float camDist = distance(uCamPos, center);
  float fog = exp(-pow(${FOG_DENSITY.toFixed(4)} * camDist, 2.0));
  vAlpha = fade * (1.0 - 0.35 * p) * fog * mix(0.72, 1.0, aSeed) * alive;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(local, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uSprite;
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;
varying float vAlpha;

void main() {
  float alpha = texture2D(uSprite, vUv).a * vAlpha * uOpacity;
  if (alpha < 0.002) discard;
  // 普通混合、极低不透明度：峰值远低于泛光阈值
  gl_FragColor = vec4(uColor, alpha);
}
`;

// 模块级贴图缓存：多个实例共享同一张 puff 精灵图，最后一个实例释放时才真正销毁。
let spriteTexture = null;
let spriteRefs = 0;

// 程序化生成柔和且轮廓不规则的 puff 精灵图；只在首次使用时创建 canvas。
function buildSprite() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const rng = makeRng(0x9e3b);
  const noise = fbm2D(0x9e3b, { octaves: 3, baseFrequency: 3, gain: 0.55 });
  const ox = rng.range(0, 40);
  const oy = rng.range(0, 40);
  const image = ctx.createImageData(size, size);
  const data = image.data;
  const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = (x + 0.5) / size;
      const v = (y + 0.5) / size;
      const r = Math.hypot(u - 0.5, v - 0.5) * 2;
      const wobble = noise(u * 2.6 + ox, v * 2.6 + oy);
      let a = 1 - smoothstep(0.06, 0.62 + wobble * 0.36, r);
      a *= 0.45 + 0.55 * noise(u * 6.3 + ox, v * 6.3 + oy);
      const i = (y * size + x) * 4;
      data[i] = clamp(255 * (1 - r * 0.2), 0, 255);
      data[i + 1] = data[i];
      data[i + 2] = data[i];
      data[i + 3] = clamp(a, 0, 1) * 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function acquireSprite() {
  if (!spriteTexture) spriteTexture = buildSprite();
  spriteRefs += 1;
  return spriteTexture;
}

function releaseSprite() {
  spriteRefs -= 1;
  if (spriteRefs > 0) return;
  spriteTexture?.dispose();
  spriteTexture = null;
  spriteRefs = 0;
}

export function createSteam({ rng, layer = 1, sources = [] } = {}) {
  const random = rng ?? makeRng(0x5f36);
  const list = (Array.isArray(sources) ? sources : []).slice(0, MAX_SOURCES);

  // 每个排气口同时存在的 puff 数由 rate × life 决定，相位错开形成连续的白汽柱
  const plan = list.map((source) => {
    const life = Math.max(0.2, source.life ?? 4);
    const rate = Math.max(0, source.rate ?? 1);
    const drift = source.drift ?? [0, 0];
    return {
      source,
      life,
      driftX: drift[0] ?? 0,
      driftZ: drift[1] ?? 0,
      wanted: Math.max(1, Math.round(rate * life)),
    };
  });
  const puffs = plan.reduce((sum, item) => sum + item.wanted, 0);

  // 基础 quad：复制 index / position / uv 到实例化几何体
  const quad = new THREE.PlaneGeometry(1, 1);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setIndex(Array.from(quad.index.array));
  geometry.setAttribute('position', quad.attributes.position.clone());
  geometry.setAttribute('uv', quad.attributes.uv.clone());
  quad.dispose();

  const index = new Float32Array(puffs);
  const phase = new Float32Array(puffs);
  const seed = new Float32Array(puffs);
  let i = 0;
  for (let s = 0; s < plan.length; s += 1) {
    const item = plan[s];
    for (let j = 0; j < item.wanted; j += 1) {
      index[i] = s;
      phase[i] = (j + random.range(0.05, 0.6)) / item.wanted;
      seed[i] = random.next();
      i += 1;
    }
  }
  geometry.setAttribute('aSource', new THREE.InstancedBufferAttribute(index, 1));
  geometry.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 1));
  geometry.instanceCount = puffs;

  // uniform 数组按 MAX_SOURCES 定长，未使用的槽位保持零值
  const srcA = [];
  const srcB = [];
  for (let s = 0; s < MAX_SOURCES; s += 1) {
    const item = plan[s];
    srcA.push(new THREE.Vector4(item?.source.x ?? 0, item?.source.y ?? 0, item?.source.z ?? 0, item?.source.size ?? 1));
    srcB.push(new THREE.Vector4(item?.source.rise ?? 0.6, item?.driftX ?? 0, item?.driftZ ?? 0, item?.life ?? 1));
  }

  const texture = acquireSprite();
  const uniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 1 },
    uCamRight: { value: new THREE.Vector3(1, 0, 0) },
    uCamUp: { value: new THREE.Vector3(0, 1, 0) },
    uCamPos: { value: new THREE.Vector3() },
    uSourceA: { value: srcA },
    uSourceB: { value: srcB },
    uSprite: { value: texture },
    uColor: { value: new THREE.Color(0xd8e4ef) },
    uOpacity: { value: 0.16 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.layers.set(layer);

  let disposed = false;

  return {
    object3D: mesh,

    update(dt, elapsed, camera) {
      uniforms.uTime.value = elapsed;
      if (!camera || !camera.matrixWorld) return;
      camera.updateMatrixWorld();
      const e = camera.matrixWorld.elements;
      uniforms.uCamRight.value.set(e[0], e[1], e[2]);
      uniforms.uCamUp.value.set(e[4], e[5], e[6]);
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
      releaseSprite();
    },

    get sourceCount() {
      return list.length;
    },

    stats: {
      get puffs() {
        return puffs;
      },
      get drawCalls() {
        return 1;
      },
    },
  };
}
