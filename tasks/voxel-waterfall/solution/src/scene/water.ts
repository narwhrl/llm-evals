/** 瀑布水幕（流动着色器）、浪花粒子与水雾。 */
import * as THREE from 'three';
import type { FallSheet } from './terrain';

export interface FallSystem {
  group: THREE.Group;
  update: (dt: number, speed: number) => void;
  dispose: () => void;
}

const FALL_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FALL_FRAG = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  // 向下滚动的水流条纹
  float t = uTime * uSpeed;
  float streak = vnoise(vec2(vUv.x * 12.0, vUv.y * 34.0 + t * 7.0));
  float streak2 = vnoise(vec2(vUv.x * 26.0 + 7.3, vUv.y * 64.0 + t * 12.0));
  float white = smoothstep(0.42, 0.9, streak * 0.62 + streak2 * 0.48);
  vec3 col = mix(vec3(0.30, 0.52, 0.86), vec3(0.94, 0.98, 1.0), white);
  // 边缘与上下端淡出
  float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
  float cap = smoothstep(1.0, 0.94, vUv.y) * 0.35 + 0.65;
  float foot = smoothstep(0.0, 0.1, vUv.y) * 0.4 + 0.6;
  float alpha = (0.5 + 0.42 * white) * edge * cap * foot;
  gl_FragColor = vec4(col, alpha);
}
`;

function mistTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.4)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 构建瀑布系统：水幕 ×N + 浪花粒子 + 水雾 sprite。 */
export function buildFalls(falls: FallSheet[], poolCenter: { x: number; y: number; z: number } | null): FallSystem {
  const group = new THREE.Group();
  const materials: THREE.Material[] = [];
  const uniformsList: { uTime: { value: number }; uSpeed: { value: number } }[] = [];

  for (const f of falls) {
    const height = Math.max(2, f.topY - f.baseY);
    const geo = new THREE.PlaneGeometry(f.width, height, 1, 1);
    const uniforms = {
      uTime: { value: Math.random() * 10 },
      uSpeed: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: FALL_VERT,
      fragmentShader: FALL_FRAG,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(f.x, (f.topY + f.baseY) / 2, f.z);
    mesh.rotation.y = Math.atan2(f.dirX, f.dirZ);
    group.add(mesh);
    materials.push(mat);
    uniformsList.push(uniforms);
  }

  // 浪花粒子（瀑底抛物线弹跳的小白点）
  const SPRAY = 64;
  const sprayGeo = new THREE.BufferGeometry();
  const sprayPos = new Float32Array(SPRAY * 3);
  const seeds: number[] = [];
  for (let i = 0; i < SPRAY; i++) seeds.push(Math.random());
  sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3));
  const sprayMat = new THREE.PointsMaterial({
    color: 0xeaf6ff,
    size: 1.1,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const spray = new THREE.Points(sprayGeo, sprayMat);
  group.add(spray);
  materials.push(sprayMat);

  // 水雾 sprite：瀑底升腾 + 山脚缭绕
  const tex = mistTexture();
  const sprites: { sprite: THREE.Sprite; phase: number; rate: number; rise: number; base: THREE.Vector3; amp: number }[] = [];
  const mistAnchors: { pos: THREE.Vector3; rise: number; scale: number }[] = [];
  if (falls.length > 0) {
    const f = falls[0];
    const dir = new THREE.Vector3(f.dirX, 0, f.dirZ);
    for (let i = 0; i < 6; i++) {
      mistAnchors.push({
        pos: new THREE.Vector3(f.x + dir.x * (2.5 + Math.random() * 4), f.baseY + 1 + Math.random() * 2, f.z + dir.z * (2.5 + Math.random() * 4)),
        rise: 7 + Math.random() * 5,
        scale: 10 + Math.random() * 8,
      });
    }
  }
  if (poolCenter) {
    for (let i = 0; i < 4; i++) {
      const a = Math.random() * Math.PI * 2;
      mistAnchors.push({
        pos: new THREE.Vector3(poolCenter.x + Math.cos(a) * 6, poolCenter.y + 1.5, poolCenter.z + Math.sin(a) * 6),
        rise: 5 + Math.random() * 4,
        scale: 12 + Math.random() * 8,
      });
    }
  }
  for (const anchor of mistAnchors) {
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      color: new THREE.Color(0xf2f6fa),
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(anchor.pos);
    group.add(sprite);
    materials.push(mat);
    sprites.push({
      sprite,
      phase: Math.random(),
      rate: 0.1 + Math.random() * 0.08,
      rise: anchor.rise,
      base: anchor.pos.clone(),
      amp: anchor.scale,
    });
  }

  let time = 0;
  let sprayTime = 0;

  const update = (dt: number, speed: number) => {
    time += dt;
    sprayTime += dt * speed;
    for (const u of uniformsList) {
      if ('uTime' in u) {
        u.uTime.value = time;
        u.uSpeed.value = 1.5 * speed;
      }
    }
    // 浪花：从瀑底向上抛洒后回落
    const f = falls[0];
    if (f) {
      const bx = f.x + f.dirX * 1.6;
      const bz = f.z + f.dirZ * 1.6;
      for (let i = 0; i < SPRAY; i++) {
        const life = (sprayTime * 0.55 + seeds[i]) % 1;
        const ang = seeds[i] * 37.7;
        const rad = 0.3 + (seeds[i] * 7.3 % 1) * f.width * 0.7;
        sprayPos[i * 3] = bx + Math.cos(ang) * rad + f.dirX * life * 3.2;
        sprayPos[i * 3 + 1] = f.baseY + life * (4.5 + (seeds[i] * 13.1 % 1) * 5.5) * (1 - life * 0.55);
        sprayPos[i * 3 + 2] = bz + Math.sin(ang) * rad + f.dirZ * life * 3.2;
      }
      sprayGeo.attributes.position.needsUpdate = true;
    }
    for (const m of sprites) {
      const t = (time * m.rate + m.phase) % 1;
      m.sprite.position.set(
        m.base.x + Math.sin(t * 6.28 + m.phase * 40) * 1.6,
        m.base.y + t * m.rise,
        m.base.z + Math.cos(t * 5.1 + m.phase * 31) * 1.2,
      );
      const s = m.amp * (0.5 + t * 0.9);
      m.sprite.scale.set(s, s * 0.75, 1);
      (m.sprite.material as THREE.SpriteMaterial).opacity = Math.sin(Math.PI * t) * 0.34;
    }
  };

  const dispose = () => {
    tex.dispose();
    for (const m of materials) m.dispose();
    group.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
    });
  };

  return { group, update, dispose };
}

/** 植被/岩石等实例规格。 */
export interface InstanceSpec {
  x: number;
  y: number;
  z: number;
  c: THREE.Color;
  s: number;
}
