import * as THREE from 'three'
import { createRng } from './noise'

/** 体素调色板（sRGB 十六进制，写入顶点色时会由 mesher 转成线性空间）。 */
export const VOXEL_COLORS = {
  grass: 0x86ab52,
  grassDeep: 0x6b8f42,
  grassDry: 0xa3a85c,
  rock: 0x8d9199,
  rockDark: 0x6f747c,
  rockWarm: 0x9a8d7c,
  dirt: 0x8c6c48,
  sand: 0xd9c68d,
  snow: 0xeef4fb,
  gravel: 0x7d8288,
  leaf: 0x4f8f3b,
  leafDeep: 0x376f2c,
  trunk: 0x6d4c30,
  water: 0x4fa3e0,
  waterDeep: 0x2a6fae,
  foam: 0xf0f8ff,
  cloud: 0xffffff,
  cloudShade: 0xc2cfe3,
} as const

export type MistUniforms = {
  uTime: { value: number }
  /** 焦距（像素）：把世界尺度换算成 gl_PointSize。 */
  uFocal: { value: number }
  uFogDensity: { value: number }
  uOpacity: { value: number }
  uColor: { value: THREE.Color }
}

function createCanvas(width: number, height: number): {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
} {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('当前浏览器不支持 2D canvas，无法生成程序化贴图')
  return { canvas, context }
}

/**
 * 程序化水面贴图：白色为底，叠加上下左右都平铺无缝的竖向流纹。
 * 靠 map.offset.y 的滚动来表现水流，因此纵向必须无缝。
 */
export function createWaterTexture(): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(64, 128)
  context.fillStyle = '#f6fbff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  const rng = createRng(0x51a7c3)
  const offsetsX = [0, -canvas.width, canvas.width]
  const offsetsY = [0, -canvas.height, canvas.height]
  for (let i = 0; i < 30; i += 1) {
    const x = rng() * canvas.width
    const width = 1.5 + rng() * 6
    const y = rng() * canvas.height
    const length = 24 + rng() * 72
    const bright = rng() > 0.42
    const rgb = bright ? '255, 255, 255' : '150, 196, 232'
    const peak = bright ? 0.6 : 0.48
    const gradient = context.createLinearGradient(0, y, 0, y + length)
    gradient.addColorStop(0, `rgba(${rgb}, 0)`)
    gradient.addColorStop(0.5, `rgba(${rgb}, ${peak})`)
    gradient.addColorStop(1, `rgba(${rgb}, 0)`)
    context.fillStyle = gradient
    for (const dx of offsetsX) {
      for (const dy of offsetsY) {
        context.fillRect(x + dx, y + dy, width, length)
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.LinearFilter
  return texture
}

/** 不透明体素（地形 / 植被）共用材质，颜色完全来自顶点色。 */
export function createOpaqueVoxelMaterial(): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({ vertexColors: true })
}

/** 体素水体（溪流、水幕、水潭）：半透明 + 流纹贴图。 */
export function createWaterMaterial(): THREE.MeshLambertMaterial {
  const map = createWaterTexture()
  map.repeat.set(0.22, 0.22)
  return new THREE.MeshLambertMaterial({
    vertexColors: true,
    map,
    transparent: true,
    opacity: 0.9,
    depthWrite: true,
    emissive: new THREE.Color(0x0a2130),
  })
}

/** 远景海面：单张平面 + 更大的贴图重复，靠雾与地平线自然收边。 */
export function createSeaMaterial(): THREE.MeshLambertMaterial {
  const map = createWaterTexture()
  map.repeat.set(0.05, 0.05)
  return new THREE.MeshLambertMaterial({
    color: new THREE.Color(0x4b90cb),
    map,
    transparent: true,
    opacity: 0.92,
    depthWrite: true,
    emissive: new THREE.Color(0x0b2637),
  })
}

/** 云：半透明 + 轻微自发光，让山体从云隙里透出来，避免堆成一块白色厚板。 */
export function createCloudMaterial(): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    depthWrite: true,
    emissive: new THREE.Color(0xb9c8dd),
    emissiveIntensity: 0.18,
  })
}

/** 云层底部的薄雾：加性混合的平面，中心浓、四周淡，因此不会露出矩形的硬边。 */
export function createHazeMaterial(color: number, opacity: number): THREE.MeshBasicMaterial {
  const { canvas, context } = createCanvas(128, 128)
  const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
  gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.4)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  const map = new THREE.CanvasTexture(canvas)
  map.colorSpace = THREE.SRGBColorSpace
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    map,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
    side: THREE.DoubleSide,
  })
}

/** 瀑布水雾：加性点精灵，全部动画在顶点着色器里做，逐帧零 CPU 开销。 */
export function createMistMaterial(): {
  material: THREE.ShaderMaterial
  uniforms: MistUniforms
} {
  const uniforms: MistUniforms = {
    uTime: { value: 0 },
    uFocal: { value: 1150 },
    uFogDensity: { value: 0.0018 },
    uOpacity: { value: 0.45 },
    uColor: { value: new THREE.Color(0xffffff) },
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uFocal;
      uniform float uFogDensity;
      attribute float aSeed;
      attribute float aScale;
      varying float vAlpha;
      void main() {
        float life = fract(uTime * 0.16 + aSeed);
        vec3 pos = position;
        pos.y += life * aScale * 5.0;
        pos.x += sin((uTime * 0.7 + aSeed * 6.2831)) * 1.8 * life;
        pos.z += cos((uTime * 0.6 + aSeed * 6.2831)) * 1.8 * life;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = clamp((aScale * uFocal) / max(-mv.z, 1.0), 1.0, 42.0);
        float fog = exp(-uFogDensity * uFogDensity * mv.z * mv.z);
        vAlpha = (1.0 - life) * min(life * 4.0, 1.0) * fog;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        vec2 offset = gl_PointCoord - 0.5;
        float radius = length(offset);
        if (radius > 0.5) discard;
        float soft = smoothstep(0.5, 0.05, radius);
        gl_FragColor = vec4(uColor, vAlpha * soft * uOpacity);
      }
    `,
  })

  return { material, uniforms }
}
