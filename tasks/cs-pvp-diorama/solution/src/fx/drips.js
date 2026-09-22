// 滴水与涟漪：每个水源按自己的速率滴落，水滴沿竖直方向匀速下落，落地瞬间在同一条
// 实例化几何体的第二个 quad 上展开一圈涟漪。全部动画由 uTime 推出，只有一次 draw call。
import * as THREE from 'three';
import { clamp, makeRng } from '../gfx/rng.js';

// 与场景 FogExp2(0x0b1119, 0.0075) 一致
const FOG_DENSITY = 0.0075;
// 微缩尺度下的水滴下落速度与全场景水滴上限（保持稀疏、可读）
const FALL_SPEED = 3.2;
const MAX_DROPS = 300;
// 涟漪时长占整个滴落循环的比例、涟漪最大半径与水滴宽度之比
const RIPPLE_SPAN = 0.45;
const RIPPLE_SCALE = 5;

const vertexShader = `
uniform float uTime;
uniform float uIntensity;
uniform vec3 uCamRight;
uniform vec3 uCamPos;

attribute vec3 aOrigin;  // 水源位置
attribute float aPhase;  // 0..1 循环相位（同源水滴错峰）
attribute float aCycle;  // 每秒循环次数
attribute float aSeed;   // 0..1，决定亮度抖动与强度剔除顺序
attribute vec2 aSize;    // (水滴宽度, 水滴长度)
attribute float aDist;   // 下落距离
attribute float aGround; // 地面高度
attribute float aSplash; // 1 = 画出落地涟漪

varying vec2 vUv;
varying vec2 vLocal;
varying float vPart;   // 0 = 水滴，1 = 涟漪
varying float vAlpha;

void main() {
  vUv = uv;
  vLocal = position.xy;
  vPart = position.z;

  float alive = step(aSeed, uIntensity);
  float t = fract(aPhase + uTime * aCycle);
  float camDist = distance(uCamPos, aOrigin);
  float fog = exp(-pow(${FOG_DENSITY.toFixed(4)} * camDist, 2.0))
    * (1.0 - smoothstep(70.0, 140.0, camDist));

  // 宽度轴取相机右向量的水平分量，水滴保持世界竖直的圆柱形公告板
  vec3 side = vec3(uCamRight.x, 0.0, uCamRight.z);
  side = length(side) > 1e-4 ? normalize(side) : vec3(1.0, 0.0, 0.0);

  vec3 local;
  float alpha;
  if (vPart < 0.5) {
    // 水滴：贴图 uv.y = 0 的亮头正好落在下落进度 t 处，细尾向上拖出
    vec3 head = vec3(aOrigin.x, aOrigin.y - t * aDist, aOrigin.z);
    float fade = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.9, 1.0, t));
    alpha = fade * alive;
    vec2 corner = vec2(position.x, position.y + 0.5) * step(0.004, alpha);
    local = head + side * (corner.x * aSize.x) + vec3(0.0, corner.y * aSize.y, 0.0);
  } else {
    // 涟漪：t 回绕到 0 的时刻正是水滴触地时刻，于是涟漪随之扩散
    float ripple = (1.0 - smoothstep(0.0, ${RIPPLE_SPAN.toFixed(2)}, t)) * aSplash * alive;
    alpha = ripple;
    float radius = max(0.2, aSize.x * ${RIPPLE_SCALE.toFixed(1)}) * sqrt(clamp(t / ${RIPPLE_SPAN.toFixed(2)}, 0.0, 1.0));
    float spin = aSeed * 6.2831853;
    float cs = cos(spin);
    float sn = sin(spin);
    vec2 corner = vec2(position.x * cs - position.y * sn, position.x * sn + position.y * cs)
      * step(0.004, alpha);
    local = vec3(aOrigin.x, max(aGround, aOrigin.y - aDist) + 0.003, aOrigin.z)
      + vec3(corner.x * radius * 2.0, 0.0, corner.y * radius * 2.0);
  }

  vAlpha = alpha * fog * mix(0.6, 1.0, aSeed);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(local, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uSprite;
uniform vec3 uColor;
uniform vec3 uHeadColor;
uniform float uDropAlpha;
uniform float uRingAlpha;

varying vec2 vUv;
varying vec2 vLocal;
varying float vPart;
varying float vAlpha;

void main() {
  float alpha;
  vec3 tint;
  if (vPart < 0.5) {
    vec4 tex = texture2D(uSprite, vUv);
    alpha = tex.a * uDropAlpha;
    tint = mix(uColor, uHeadColor, tex.r); // 贴图红通道标记亮头
  } else {
    float r = length(vLocal) * 2.0;
    float rim = smoothstep(0.45, 0.85, r) * (1.0 - smoothstep(0.88, 1.0, r));
    alpha = (rim + (1.0 - smoothstep(0.1, 0.95, r)) * 0.18) * uRingAlpha;
    tint = uColor;
  }
  alpha *= vAlpha;
  if (alpha < 0.003) discard;
  // 加法混合下最终贡献为 tint * alpha
  gl_FragColor = vec4(tint, alpha);
}
`;

// 模块级贴图缓存：多个实例共享一张精灵图，最后一个实例释放时才真正销毁。
let spriteTexture = null;
let spriteRefs = 0;

// 32 位种子随机只用于贴图本身，与场景散布无关。
function buildSprite() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const image = ctx.createImageData(size, size);
  const data = image.data;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = (x + 0.5) / size;
      const v = 1 - (y + 0.5) / size; // v = 0 为贴图底部，即水滴亮头
      const cx = (u - 0.5) * 2;
      const head = Math.exp(-cx * cx * 22) * Math.exp(-v * v * 26);
      const tail = Math.exp(-cx * cx * 14) * (1 - v) * (1 - v) * 0.45;
      const a = Math.min(1, head * 1.1 + tail);
      const i = (y * size + x) * 4;
      const shade = head * 255;
      data[i] = shade;
      data[i + 1] = shade;
      data[i + 2] = shade;
      data[i + 3] = a * 255;
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

export function createDrips({ rng, layer = 1, sources = [] } = {}) {
  const random = rng ?? makeRng(0x2f1d);
  const list = Array.isArray(sources) ? sources : [];

  // 先按 rate × 下落耗时 估算每个水源需要几滴，再按相位错开形成均匀间隔
  const plan = list.map((source) => {
    const groundY = source.groundY ?? 0;
    const dist = Math.min(source.loop ?? source.y - groundY, Math.max(0.01, source.y - groundY));
    const cycle = Math.max(0.08, dist / FALL_SPEED);
    return { source, groundY, dist, cycle, wanted: Math.max(1, Math.round((source.rate ?? 1) * cycle)) };
  });

  // 全场景水滴上限：按比例压缩各水源配额，源数超过上限时以每源一滴保底
  const wanted = plan.reduce((sum, item) => sum + item.wanted, 0);
  if (wanted > MAX_DROPS) {
    const k = MAX_DROPS / wanted;
    for (const item of plan) item.wanted = Math.max(1, Math.floor(item.wanted * k));
  }
  const drops = plan.reduce((sum, item) => sum + item.wanted, 0);

  // 基础 quad 复制两份：position.z 区分水滴（0）与涟漪（1），索引同步偏移
  const quad = new THREE.PlaneGeometry(1, 1);
  const srcPosition = quad.attributes.position;
  const srcUv = quad.attributes.uv;
  const positions = new Float32Array(8 * 3);
  const uvs = new Float32Array(8 * 2);
  for (let i = 0; i < 8; i += 1) {
    const v = i & 3;
    positions[i * 3] = srcPosition.getX(v);
    positions[i * 3 + 1] = srcPosition.getY(v);
    positions[i * 3 + 2] = i < 4 ? 0 : 1;
    uvs[i * 2] = srcUv.getX(v);
    uvs[i * 2 + 1] = srcUv.getY(v);
  }
  const indices = new Uint16Array(12);
  for (let i = 0; i < 6; i += 1) {
    indices[i] = quad.index.array[i];
    indices[i + 6] = quad.index.array[i] + 4;
  }
  quad.dispose();

  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setIndex(Array.from(indices));
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  const origin = new Float32Array(drops * 3);
  const phase = new Float32Array(drops);
  const cycleRate = new Float32Array(drops);
  const seed = new Float32Array(drops);
  const dims = new Float32Array(drops * 2);
  const dist = new Float32Array(drops);
  const ground = new Float32Array(drops);
  const splash = new Float32Array(drops);

  let i = 0;
  for (const item of plan) {
    const { source } = item;
    for (let j = 0; j < item.wanted; j += 1) {
      origin[i * 3] = source.x;
      origin[i * 3 + 1] = source.y;
      origin[i * 3 + 2] = source.z;
      phase[i] = (j + random.range(0.05, 0.6)) / item.wanted;
      cycleRate[i] = 1 / item.cycle;
      seed[i] = random.next();
      dims[i * 2] = source.width ?? 0.045;
      dims[i * 2 + 1] = source.length ?? 0.4;
      dist[i] = item.dist;
      ground[i] = item.groundY;
      splash[i] = source.splash === false ? 0 : 1;
      i += 1;
    }
  }
  geometry.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(origin, 3));
  geometry.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  geometry.setAttribute('aCycle', new THREE.InstancedBufferAttribute(cycleRate, 1));
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 1));
  geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(dims, 2));
  geometry.setAttribute('aDist', new THREE.InstancedBufferAttribute(dist, 1));
  geometry.setAttribute('aGround', new THREE.InstancedBufferAttribute(ground, 1));
  geometry.setAttribute('aSplash', new THREE.InstancedBufferAttribute(splash, 1));
  geometry.instanceCount = drops;

  const texture = acquireSprite();
  const uniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 1 },
    uCamRight: { value: new THREE.Vector3(1, 0, 0) },
    uCamPos: { value: new THREE.Vector3() },
    uSprite: { value: texture },
    uColor: { value: new THREE.Color(0xbdd2e4) },
    uHeadColor: { value: new THREE.Color(0xeaf3fb) },
    uDropAlpha: { value: 0.4 },
    uRingAlpha: { value: 0.24 },
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
      releaseSprite();
    },

    get sourceCount() {
      return list.length;
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
