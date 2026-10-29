import * as THREE from 'three';

// 共享的几何体、材质与描边构建器。
// 描边用“反向外扩壳”：同几何体以背面渲染，顶点沿法线外扩固定厚度，
// 外扩量在世界空间按距离修正，使不同缩放下的线宽基本一致。

export const TOON_RAMP = (() => {
  const steps = new Uint8Array([92, 150, 208, 255]);
  const tex = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
  tex.needsUpdate = true;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
})();

export const OUTLINE_COLOR = 0x140f19;
export const OUTLINE_WIDTH = 1.0;

const toonCache = new Map();
export function toon(color, opts = {}) {
  const key = `${color}|${JSON.stringify(opts)}`;
  let mat = toonCache.get(key);
  if (!mat) {
    mat = new THREE.MeshToonMaterial({ color, gradientMap: TOON_RAMP, ...opts });
    toonCache.set(key, mat);
  }
  return mat;
}

const glowCache = new Map();
export function glow(color, opts = {}) {
  const key = `${color}|${JSON.stringify(opts)}`;
  let mat = glowCache.get(key);
  if (!mat) {
    mat = new THREE.MeshBasicMaterial({ color, ...opts });
    mat.userData.baseColor = new THREE.Color(color);
    glowCache.set(key, mat);
  }
  return mat;
}

const additiveCache = new Map();
export function additive(color, opacity = 0.5) {
  const key = `${color}|${opacity}`;
  let mat = additiveCache.get(key);
  if (!mat) {
    mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    additiveCache.set(key, mat);
  }
  return mat;
}

// 外扩量按几何体包围盒半径归一：小物件得到细线，大墙体也不会被撑爆。
// 外扩放在视空间完成，厚度以世界单位计，因此不受物体自身缩放影响。
const outlineVert = /* glsl */ `
  uniform float thickness;
  uniform float geometryScale;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
    vec3 viewNormal = normalize(mat3(viewMatrix) * worldNormal);
    mvPosition.xyz += viewNormal * thickness * geometryScale;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const OUTLINE_MIN = 0.004;
const OUTLINE_MAX = 0.05;

const outlineFrag = /* glsl */ `
  uniform vec3 outlineColor;
  void main() {
    gl_FragColor = vec4(outlineColor, 1.0);
  }
`;

const outlineMatCache = new Map();
function outlineMaterial(thickness, color, geometryScale) {
  const key = `${thickness}|${color}|${geometryScale}`;
  let mat = outlineMatCache.get(key);
  if (!mat) {
    mat = new THREE.ShaderMaterial({
      uniforms: {
        thickness: { value: thickness },
        geometryScale: { value: geometryScale },
        outlineColor: { value: new THREE.Color(color) },
      },
      vertexShader: outlineVert,
      fragmentShader: outlineFrag,
      side: THREE.BackSide,
    });
    outlineMatCache.set(key, mat);
  }
  return mat;
}

// 描边线宽按几何体包围球半径归一：小物件得到细线，大墙体也不会被撑爆。
const outlineScaleCache = new WeakMap();
function outlineScaleOf(geometry) {
  let scale = outlineScaleCache.get(geometry);
  if (scale === undefined) {
    if (!geometry.boundingSphere) geometry.computeBoundingSphere();
    const r = geometry.boundingSphere ? geometry.boundingSphere.radius : 1;
    scale = THREE.MathUtils.clamp(r * 0.02, OUTLINE_MIN, OUTLINE_MAX);
    outlineScaleCache.set(geometry, scale);
  }
  return scale;
}

/**
 * 返回一个自带描边壳的 Group。group.userData.mesh 是本体，shell 是反向外扩的描边壳。
 * 壳与本体共享几何体和材质实例，材质缓存保证绘制批次可复用。
 */
export function outlined(geometry, material, { thickness = OUTLINE_WIDTH, color = OUTLINE_COLOR } = {}) {
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const shell = new THREE.Mesh(geometry, outlineMaterial(thickness, color, outlineScaleOf(geometry)));
  shell.matrixAutoUpdate = false;
  shell.castShadow = false;
  shell.receiveShadow = false;
  shell.userData.isOutline = true;
  group.add(mesh, shell);
  group.userData.mesh = mesh;
  group.userData.shell = shell;
  return group;
}

export function box(w, h, d, material, x = 0, y = 0, z = 0, opts = {}) {
  const g = outlined(new THREE.BoxGeometry(w, h, d), material, opts);
  g.position.set(x, y + h / 2, z);
  return g;
}

export function cyl(rt, rb, h, material, x = 0, y = 0, z = 0, segments = 12, opts = {}) {
  const g = outlined(new THREE.CylinderGeometry(rt, rb, h, segments), material, opts);
  g.position.set(x, y + h / 2, z);
  return g;
}

/**
 * 把带描边的 Group 里的壳与本体对齐。
 */
export function syncOutline(group) {
  const { mesh, shell } = group.userData;
  if (!mesh || !shell) return;
  mesh.updateMatrix();
  shell.matrix.copy(mesh.matrix);
  shell.matrixWorldNeedsUpdate = true;
}

// 生成带透明通道的径向渐变贴图（光晕、光斑用）
export function radialTexture(size = 128, inner = 'rgba(255,255,255,0.9)', outer = 'rgba(255,255,255,0)') {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.45, inner);
  grad.addColorStop(1, outer);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
