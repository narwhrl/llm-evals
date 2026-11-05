import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLSL_ATMOSPHERE } from './env';
import { GEO, MAT, T } from './kit';
import { GLSL_NOISE, fbm3, rng } from './noise';
import { makeDebris } from './rock';

function canopyGeometry(seed: number): THREE.BufferGeometry {
  const rand = rng(seed);
  const parts: THREE.BufferGeometry[] = [];
  const blobs = [[0, 0.62, 0, 0.55], [0.3, 0.5, 0.12, 0.4], [-0.28, 0.48, -0.1, 0.42], [0.05, 0.9, -0.05, 0.38], [-0.1, 0.45, 0.3, 0.36]];
  for (const [x, y, z, r] of blobs) {
    const g = new THREE.SphereGeometry(r * (0.9 + rand() * 0.2), 10, 7);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const k = 1 + 0.18 * fbm3(p.getX(i) * 4 + seed, p.getY(i) * 4, p.getZ(i) * 4, 2);
      p.setXYZ(i, p.getX(i) * k + x, p.getY(i) * k * 0.85 + y, p.getZ(i) * k + z);
    }
    g.deleteAttribute('uv');
    parts.push(g);
  }
  const g = mergeGeometries(parts);
  g.computeVertexNormals();
  return g;
}

const LEAF = ['#5d9c39', '#72b043', '#4c8833', '#86bf4c', '#9cc955', '#5a9440'].map((c) => new THREE.Color(c));
const CYPRESS = ['#3f7a3a', '#477f3c', '#386f35'].map((c) => new THREE.Color(c));

/** Stylised broadleaf groves and slender cypresses, instanced. */
export class Forest {
  private trees: { m: THREE.Matrix4; trunk: THREE.Matrix4; c: THREE.Color; tall: boolean }[] = [];
  private rand = rng(99);

  add(x: number, y: number, z: number, size: number, tall = false): void {
    const r = this.rand;
    const ry = r() * Math.PI * 2;
    if (tall) {
      this.trees.push({
        m: T(x, y + size * 0.15, z, size * 0.32, size * 1.25, size * 0.32, ry),
        trunk: T(x, y - 2, z, size * 0.05, size * 0.4, size * 0.05),
        c: CYPRESS[Math.floor(r() * CYPRESS.length)], tall,
      });
    } else {
      this.trees.push({
        m: T(x, y + size * 0.25, z, size * (0.9 + r() * 0.3), size * (0.8 + r() * 0.3), size * (0.9 + r() * 0.3), ry),
        trunk: T(x, y - 2, z, size * 0.07, size * 0.65, size * 0.07),
        c: LEAF[Math.floor(r() * LEAF.length)].clone().offsetHSL((r() - 0.5) * 0.02, 0, (r() - 0.5) * 0.06), tall,
      });
    }
  }

  build(): THREE.Group {
    const group = new THREE.Group();
    for (const tall of [false, true]) {
      const list = this.trees.filter((t) => t.tall === tall);
      if (!list.length) continue;
      const canopy = new THREE.InstancedMesh(canopyGeometry(tall ? 3 : 1), MAT.leaf, list.length);
      const trunks = new THREE.InstancedMesh(GEO.cyl, MAT.trunk, list.length);
      list.forEach((t, i) => {
        canopy.setMatrixAt(i, t.m);
        canopy.setColorAt(i, t.c);
        trunks.setMatrixAt(i, t.trunk);
      });
      for (const m of [canopy, trunks]) {
        m.castShadow = m.receiveShadow = true;
        m.computeBoundingSphere();
        group.add(m);
      }
    }
    return group;
  }
}

/** Moss strands hanging off island rims. */
export function vines(points: { x: number; y: number; z: number; len: number }[]): THREE.InstancedMesh {
  const geo = new THREE.ConeGeometry(1, 1, 6).rotateX(Math.PI).translate(0, -0.5, 0);
  const mesh = new THREE.InstancedMesh(geo, MAT.leaf, points.length);
  const rand = rng(17);
  points.forEach((p, i) => {
    const w = 2.5 + rand() * 4;
    mesh.setMatrixAt(i, T(p.x, p.y + 2, p.z, w, p.len, w, rand() * 6));
    mesh.setColorAt(i, CYPRESS[i % 3].clone().lerp(LEAF[2], rand() * 0.6));
  });
  mesh.castShadow = true;
  mesh.computeBoundingSphere();
  return mesh;
}

const waterMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  uniforms: { uTime: { value: 0 } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    varying vec3 vWorld;
    void main() {
      vUv = uv;
      vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vWorld;
    ${GLSL_ATMOSPHERE}
    ${GLSL_NOISE}
    void main() {
      float v = vUv.y;
      float streak = fbm2(vec2(vUv.x * 9.0, v * 5.0 - uTime * 0.9));
      float fine = vnoise(vec2(vUv.x * 40.0, v * 14.0 - uTime * 1.6));
      float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
      float a = edge * (0.45 + 0.55 * streak) * (1.0 - smoothstep(0.35, 1.0, v)) * smoothstep(0.0, 0.02, v);
      a *= 0.7 + 0.3 * fine;
      vec3 c = mix(vec3(0.62, 0.84, 0.95), vec3(1.0), smoothstep(0.35, 0.8, streak + v * 0.6)) * 1.15;
      c = applyAerial(c, vWorld);
      gl_FragColor = vec4(c, a * 0.9);
    }`,
});

/** Ribbon waterfall pouring off a rim at `p0` towards horizontal direction `dir`. */
export function waterfall(p0: THREE.Vector3, dir: THREE.Vector3, width: number, length: number): THREE.Mesh {
  const rows = 48;
  const pos: number[] = [];
  const uv: number[] = [];
  const side = new THREE.Vector3(-dir.z, 0, dir.x);
  for (let j = 0; j <= rows; j++) {
    const v = j / rows;
    const d = v * length;
    const out = 7 * Math.sqrt(d) + d * 0.04;
    const w = width * (1 + v * 1.6);
    for (let i = 0; i <= 1; i++) {
      const p = p0.clone().addScaledVector(dir, out).addScaledVector(side, (i - 0.5) * w);
      p.y -= d;
      pos.push(p.x, p.y, p.z);
      uv.push(i, v);
    }
  }
  const idx: number[] = [];
  for (let j = 0; j < rows; j++) {
    const a = j * 2;
    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  const mesh = new THREE.Mesh(g, waterMaterial);
  mesh.renderOrder = 2;
  return mesh;
}
export const waterUniforms = waterMaterial.uniforms;

/** Floating rubble drifting between the islands. */
export function debrisField(count: number, seed: number): { mesh: THREE.Group; update: (t: number) => void } {
  const rand = rng(seed);
  const group = new THREE.Group();
  const variants = [makeDebris(1, true), makeDebris(2, false), makeDebris(3, true), makeDebris(4, false)];
  const items: { v: number; p: THREE.Vector3; s: number; ry: number; tilt: number; ph: number }[] = [];
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const ringBand = rand() < 0.7;
    const r = ringBand ? 1180 + (rand() - 0.5) * 600 : 450 + rand() * 1800;
    const y = -80 - Math.pow(rand(), 1.3) * 1300;
    const big = rand() < 0.08;
    items.push({
      v: Math.floor(rand() * 4), p: new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)),
      s: big ? 22 + rand() * 26 : 3 + rand() * rand() * 14, ry: rand() * 6, tilt: (rand() - 0.5) * 0.6, ph: rand() * 6,
    });
  }
  const meshes = variants.map((g, v) => {
    const list = items.filter((it) => it.v === v);
    const m = new THREE.InstancedMesh(g, MAT.rock, list.length);
    m.castShadow = m.receiveShadow = true;
    m.frustumCulled = false;
    group.add(m);
    return { m, list };
  });
  const update = (t: number) => {
    for (const { m, list } of meshes) {
      list.forEach((it, i) => {
        const bob = Math.sin(t * 0.25 + it.ph) * it.s * 0.25;
        m.setMatrixAt(i, T(it.p.x, it.p.y + bob, it.p.z, it.s, it.s, it.s, it.ry + t * 0.01, it.tilt, it.tilt * 0.5));
      });
      m.instanceMatrix.needsUpdate = true;
    }
  };
  update(0);
  return { mesh: group, update };
}
