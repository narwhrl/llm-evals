// Core cel-shading helpers: gradient map, toon materials, inverted-hull outlines,
// and a merged-geometry chunk builder to keep draw calls low.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const OUTLINE_COLOR = 0x0a0c11;
export const OUTLINE_WIDTH = 0.075;

let gradientMap = null;
export function getGradientMap() {
  if (!gradientMap) {
    // 4-step toon ramp (RGBA so rgb channels all carry the step value).
    const steps = [70, 130, 195, 255];
    const data = new Uint8Array(steps.length * 4);
    for (let i = 0; i < steps.length; i++) {
      data[i * 4 + 0] = steps[i];
      data[i * 4 + 1] = steps[i];
      data[i * 4 + 2] = steps[i];
      data[i * 4 + 3] = 255;
    }
    gradientMap = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.needsUpdate = true;
  }
  return gradientMap;
}

// Inverted-hull outline: BackSide mesh displaced along vertex normals.
export function makeOutlineMaterial(width = OUTLINE_WIDTH, color = OUTLINE_COLOR) {
  const m = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide, fog: true });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uOutlineWidth = { value: width };
    shader.vertexShader =
      'uniform float uOutlineWidth;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n\ttransformed += normal * uOutlineWidth;'
      );
  };
  return m;
}

export function addOutline(mesh, width = OUTLINE_WIDTH, color = OUTLINE_COLOR) {
  const outline = new THREE.Mesh(mesh.geometry, makeOutlineMaterial(width, color));
  outline.castShadow = false;
  outline.receiveShadow = false;
  outline.raycast = () => {};
  mesh.add(outline);
  return outline;
}

export function toonMat(params) {
  const { map, ...rest } = params;
  const mat = new THREE.MeshToonMaterial({ gradientMap: getGradientMap(), map, ...rest });
  return mat;
}

// Scale UVs of a geometry so tiled textures keep constant world density.
export function scaleUV(geo, su, sv) {
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  }
  return geo;
}

// ---------------------------------------------------------------------------
// Chunk: collects transformed geometries per material key and merges them into
// one mesh (+ outline mesh) per key. Positions use center-x/z, bottom-y.
// ---------------------------------------------------------------------------
export class Chunk {
  constructor() {
    this.buckets = new Map();
  }

  add(geo, matrix, key) {
    let g = geo.clone();
    if (matrix) g.applyMatrix4(matrix);
    if (g.index) g = g.toNonIndexed();
    if (!this.buckets.has(key)) this.buckets.set(key, []);
    this.buckets.get(key).push(g);
    return this;
  }

  // Box with center (cx, cz) and bottom at yb.
  box(key, w, h, d, cx, yb, cz, opts = {}) {
    const { ry = 0, rx = 0, rz = 0, uv = null } = opts;
    const g = new THREE.BoxGeometry(w, h, d);
    if (uv) scaleUV(g, uv[0], uv[1]);
    const m = new THREE.Matrix4();
    const e = new THREE.Euler(rx, ry, rz, 'YXZ');
    m.makeRotationFromEuler(e);
    m.setPosition(cx, yb + h / 2, cz);
    return this.add(g, m, key);
  }

  cyl(key, rTop, rBot, h, seg, cx, yb, cz, opts = {}) {
    const { ry = 0, rx = 0, rz = 0 } = opts;
    const g = new THREE.CylinderGeometry(rTop, rBot, h, seg);
    const m = new THREE.Matrix4();
    const e = new THREE.Euler(rx, ry, rz, 'YXZ');
    m.makeRotationFromEuler(e);
    m.setPosition(cx, yb + h / 2, cz);
    return this.add(g, m, key);
  }

  // Vertical plane facing +z (before ry), center (cx, cy, cz).
  plane(key, w, h, cx, cy, cz, opts = {}) {
    const { ry = 0, uv = null } = opts;
    const g = new THREE.PlaneGeometry(w, h);
    if (uv) scaleUV(g, uv[0], uv[1]);
    const m = new THREE.Matrix4().makeRotationY(ry);
    m.setPosition(cx, cy, cz);
    return this.add(g, m, key);
  }

  // Horizontal plane (facing +y), center (cx, y, cz).
  slab(key, w, d, cx, y, cz, opts = {}) {
    const { uv = null } = opts;
    const g = new THREE.PlaneGeometry(w, d);
    if (uv) scaleUV(g, uv[0], uv[1]);
    const m = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
    m.setPosition(cx, y, cz);
    return this.add(g, m, key);
  }

  build(mats, opts = {}) {
    const { outline = true, outlineWidth = OUTLINE_WIDTH, castShadow = true, receiveShadow = true } = opts;
    const group = new THREE.Group();
    for (const [key, geos] of this.buckets) {
      const merged = mergeGeometries(geos, false);
      const mat = mats[key];
      if (!mat) throw new Error(`Unknown material key: ${key}`);
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      group.add(mesh);
      if (outline && !mat.userData.noOutline) {
        const om = new THREE.Mesh(merged, makeOutlineMaterial(outlineWidth));
        om.castShadow = false;
        om.receiveShadow = false;
        om.raycast = () => {};
        group.add(om);
      }
    }
    this.buckets.clear();
    return group;
  }
}

// Flat decal plane (graffiti, markings, bullet holes). No outline, z-offset.
export function decalMesh(tex, w, h, opts = {}) {
  const { opacity = 1, lit = true } = opts;
  const mat = lit
    ? new THREE.MeshToonMaterial({
        map: tex,
        transparent: true,
        opacity,
        gradientMap: getGradientMap(),
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        depthWrite: false,
      })
    : new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        depthWrite: false,
      });
  mat.userData.noOutline = true;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.castShadow = false;
  m.receiveShadow = true;
  return m;
}

// Single toon mesh helper for dynamic / one-off objects.
export function mesh(geo, mat, opts = {}) {
  const { outline = true, outlineWidth = OUTLINE_WIDTH, castShadow = true, receiveShadow = true } = opts;
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = castShadow;
  m.receiveShadow = receiveShadow;
  if (outline && !mat.userData.noOutline) addOutline(m, outlineWidth);
  return m;
}
