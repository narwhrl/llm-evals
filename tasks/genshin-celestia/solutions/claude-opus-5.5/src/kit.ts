import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

function makeRamp(f: (s: (a: number, b: number) => number) => number): THREE.DataTexture {
  const n = 128;
  const data = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    const x = i / (n - 1);
    const v = f((a, b) => THREE.MathUtils.smoothstep(x, a, b));
    data.set([v * 255, v * 255, v * 255, 255], i * 4);
  }
  const tex = new THREE.DataTexture(data, n, 1);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}
// Crisp two-band ramp for architecture: the sun term fades out just past the terminator, leaving the cool sky fill.
const ramp = makeRamp((s) => 0.1 * s(0.38, 0.5) + 0.75 * s(0.5, 0.58) + 0.15 * s(0.58, 0.95));
// Broad ramp for faceted rock so small facets turning from the sun do not drop to full shadow.
const rockRamp = makeRamp((s) => 0.85 * s(0.3, 0.68) + 0.15 * s(0.68, 0.95));

// Warm sun-side rim plus a faint cool fresnel, the usual anime-render accent.
function addRim(shader: THREE.WebGLProgramParametersWithUniforms): void {
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <opaque_fragment>',
    /* glsl */ `
    {
      vec3 vdir = normalize(vViewPosition);
      float fres = pow(1.0 - clamp(dot(normal, vdir), 0.0, 1.0), 4.0);
      outgoingLight += diffuseColor.rgb * fres * vec3(0.22, 0.26, 0.34);
    }
    #include <opaque_fragment>`,
  );
}

export function toon(color: THREE.ColorRepresentation, params: THREE.MeshToonMaterialParameters = {}): THREE.MeshToonMaterial {
  const m = new THREE.MeshToonMaterial({ color, gradientMap: ramp, ...params });
  m.onBeforeCompile = addRim;
  return m;
}

export const MAT = {
  ivory: toon('#f4efe3'),
  ivoryShade: toon('#cfc8bb'),
  ivoryWarm: toon('#eadfca'),
  gold: toon('#e0b45c', { emissive: '#4a3208' }),
  goldGlow: toon('#f2cf7a', { emissive: '#b8862c', emissiveIntensity: 0.9 }),
  // MeshToonMaterial honours flatShading at runtime but its typings omit it.
  rock: Object.assign(toon('#ffffff', { vertexColors: true, gradientMap: rockRamp }), { flatShading: true }),
  grass: toon('#ffffff', { vertexColors: true }),
  leaf: toon('#ffffff'),
  trunk: toon('#7a5b43'),
  water: toon('#9fdcf0', { emissive: '#2c6f86', emissiveIntensity: 0.6 }),
};
export type MatKey = keyof typeof MAT;

const baseAt0 = (g: THREE.BufferGeometry) => g.translate(0, 0.5, 0);

function bayShape(kind: 'round' | 'pointed' | 'window'): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.5, 0);
  s.lineTo(-0.5, 1);
  s.lineTo(0.5, 1);
  s.lineTo(0.5, 0);
  if (kind === 'round') {
    s.lineTo(0.34, 0);
    s.lineTo(0.34, 0.5);
    s.absarc(0, 0.5, 0.34, 0, Math.PI, false);
    s.lineTo(-0.34, 0);
    s.lineTo(-0.5, 0);
  } else if (kind === 'pointed') {
    s.lineTo(0.3, 0);
    s.lineTo(0.3, 0.42);
    s.absarc(-0.3, 0.42, 0.6, 0, Math.PI / 3, false);
    s.absarc(0.3, 0.42, 0.6, (2 * Math.PI) / 3, Math.PI, false);
    s.lineTo(-0.3, 0);
    s.lineTo(-0.5, 0);
  } else {
    s.lineTo(-0.5, 0);
    const h = new THREE.Path();
    h.moveTo(0.2, 0.14);
    h.lineTo(0.2, 0.5);
    h.absarc(-0.2, 0.5, 0.4, 0, Math.PI / 3, false);
    h.absarc(0.2, 0.5, 0.4, (2 * Math.PI) / 3, Math.PI, false);
    h.lineTo(-0.2, 0.14);
    h.lineTo(0.2, 0.14);
    s.holes.push(h);
  }
  return s;
}

const bay = (kind: 'round' | 'pointed' | 'window') =>
  new THREE.ExtrudeGeometry(bayShape(kind), { depth: 0.2, bevelEnabled: false, curveSegments: 10 }).translate(0, 0, -0.1);

/** Unit primitives: columns, cones and boxes stand on y = 0 with unit height. */
export const GEO = {
  cyl: baseAt0(new THREE.CylinderGeometry(1, 1, 1, 18)),
  cyl8: baseAt0(new THREE.CylinderGeometry(1, 1, 1, 8)),
  cone: baseAt0(new THREE.ConeGeometry(1, 1, 18)),
  cone8: baseAt0(new THREE.ConeGeometry(1, 1, 8)),
  box: baseAt0(new THREE.BoxGeometry(1, 1, 1)),
  sphere: new THREE.SphereGeometry(1, 16, 12),
  dome: new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2),
  bayRound: bay('round'),
  bayPointed: bay('pointed'),
  bayWindow: bay('window'),
};
export type GeoKey = keyof typeof GEO;

const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
/** Matrix from position, scale and Y/X/Z rotation (YXZ order). */
export function T(x: number, y: number, z: number, sx = 1, sy = sx, sz = sx, ry = 0, rx = 0, rz = 0): THREE.Matrix4 {
  _q.setFromEuler(_e.set(rx, ry, rz, 'YXZ'));
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(sx, sy, sz));
}

/** Collects instanced primitives and one-off geometry, then emits one draw call per geometry/material pair. */
export class Kit {
  private instances = new Map<string, THREE.Matrix4[]>();
  private merged = new Map<MatKey, THREE.BufferGeometry[]>();
  base = new THREE.Matrix4();

  inst(geo: GeoKey, mat: MatKey, m: THREE.Matrix4): void {
    const key = `${geo}|${mat}`;
    let list = this.instances.get(key);
    if (!list) this.instances.set(key, (list = []));
    list.push(this.base.clone().multiply(m));
  }

  mesh(geometry: THREE.BufferGeometry, mat: MatKey, m?: THREE.Matrix4): void {
    let g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal') g.deleteAttribute(name);
    g.applyMatrix4(m ? this.base.clone().multiply(m) : this.base);
    let list = this.merged.get(mat);
    if (!list) this.merged.set(mat, (list = []));
    list.push(g);
  }

  /** Runs `fn` with an extra parent transform. */
  within(m: THREE.Matrix4, fn: () => void): void {
    const prev = this.base;
    this.base = prev.clone().multiply(m);
    fn();
    this.base = prev;
  }

  build(): THREE.Group {
    const group = new THREE.Group();
    for (const [key, list] of this.instances) {
      const [geo, mat] = key.split('|') as [GeoKey, MatKey];
      const im = new THREE.InstancedMesh(GEO[geo], MAT[mat], list.length);
      list.forEach((m, i) => im.setMatrixAt(i, m));
      im.castShadow = im.receiveShadow = true;
      im.computeBoundingSphere();
      group.add(im);
    }
    for (const [mat, list] of this.merged) {
      const mesh = new THREE.Mesh(mergeGeometries(list), MAT[mat]);
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh);
    }
    return group;
  }
}

/** Revolves a (radius, height) profile around Y. */
export const lathe = (pts: [number, number][], segments = 32) =>
  new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), segments);

/** Flat annular band: inner/outer radius, bottom y, height. */
export const band = (rIn: number, rOut: number, y: number, h: number, segments = 48) =>
  lathe([[rIn, y], [rOut, y], [rOut, y + h], [rIn, y + h], [rIn, y]], segments);

/**
 * Sweeps a rectangular section along a polyline. The section spans `w` sideways and `h` upwards
 * from the path (or is centred on it when `centered`).
 */
export function sweep(points: THREE.Vector3[], w: number, h: number, centered = false): THREE.BufferGeometry {
  const n = points.length;
  const up = new THREE.Vector3(0, 1, 0);
  const corners: THREE.Vector3[][] = [];
  for (let i = 0; i < n; i++) {
    const t = points[Math.min(i + 1, n - 1)].clone().sub(points[Math.max(i - 1, 0)]).normalize();
    const side = new THREE.Vector3().crossVectors(t, up).normalize().multiplyScalar(w / 2);
    const u = new THREE.Vector3().crossVectors(side, t).normalize().multiplyScalar(h);
    const p = centered ? points[i].clone().addScaledVector(u, -0.5) : points[i];
    corners.push([
      p.clone().sub(side),
      p.clone().add(side),
      p.clone().add(side).add(u),
      p.clone().sub(side).add(u),
    ]);
  }
  const pos: number[] = [];
  const idx: number[] = [];
  for (let s = 0; s < 4; s++) {
    const base = pos.length / 3;
    for (let i = 0; i < n; i++) {
      for (const c of [corners[i][s], corners[i][(s + 1) % 4]]) pos.push(c.x, c.y, c.z);
    }
    for (let i = 0; i < n - 1; i++) {
      const a = base + i * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  for (const [i, flip] of [[0, true], [n - 1, false]] as const) {
    const base = pos.length / 3;
    for (const c of corners[i]) pos.push(c.x, c.y, c.z);
    if (flip) idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    else idx.push(base, base + 2, base + 1, base, base + 3, base + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
