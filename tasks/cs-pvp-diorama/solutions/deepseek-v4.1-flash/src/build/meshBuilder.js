// 静态几何构建器：把大量基本体按材质合并成单个 Mesh，控制 draw call。
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const COMMON_ATTRIBUTES = ['position', 'normal', 'uv'];

function normalize(geometry) {
  for (const name of Object.keys(geometry.attributes)) {
    if (!COMMON_ATTRIBUTES.includes(name)) geometry.deleteAttribute(name);
  }
  geometry.clearGroups();
  if (!geometry.index) {
    const count = geometry.attributes.position.count;
    const index = new Uint32Array(count);
    for (let i = 0; i < count; i += 1) index[i] = i;
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
  }
  return geometry;
}

export function createMeshBuilder(material, name = 'merged') {
  const parts = [];
  const quaternion = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const matrix = new THREE.Matrix4();

  function place(geometry, x, y, z, options, anchorVertical) {
    const { rotX = 0, rotY = 0, rotZ = 0 } = options;
    if (anchorVertical === 'center') geometry.translate(0, 0, 0);
    euler.set(rotX, rotY, rotZ);
    quaternion.setFromEuler(euler);
    matrix.compose(new THREE.Vector3(x, y, z), quaternion, new THREE.Vector3(1, 1, 1));
    geometry.applyMatrix4(matrix);
    parts.push(normalize(geometry));
    return api;
  }

  const api = {
    // y 默认为物体「底面」高度，便于按地面标高摆放。
    box(width, height, depth, x, y, z, options = {}) {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      geometry.translate(0, options.anchor === 'center' ? 0 : height / 2, 0);
      return place(geometry, x, y, z, options, options.anchor);
    },
    cyl(radiusTop, radiusBottom, height, segments, x, y, z, options = {}) {
      const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, options.openEnded ?? false);
      geometry.translate(0, options.anchor === 'center' ? 0 : height / 2, 0);
      return place(geometry, x, y, z, options, options.anchor);
    },
    sphere(radius, x, y, z, options = {}) {
      const geometry = new THREE.SphereGeometry(radius, options.widthSegments ?? 12, options.heightSegments ?? 8);
      geometry.translate(0, options.anchor === 'bottom' ? radius : 0, 0);
      return place(geometry, x, y, z, options, options.anchor);
    },
    torus(radius, tube, x, y, z, options = {}) {
      const geometry = new THREE.TorusGeometry(radius, tube, options.radialSegments ?? 8, options.tubularSegments ?? 20);
      geometry.rotateX(options.flat === false ? 0 : Math.PI / 2);
      return place(geometry, x, y, z, options, options.anchor);
    },
    // 水平面片（默认朝上）
    plane(width, depth, x, y, z, options = {}) {
      const geometry = new THREE.PlaneGeometry(width, depth);
      geometry.rotateX(-Math.PI / 2);
      return place(geometry, x, y, z, options, options.anchor);
    },
    // 垂直面片（默认朝向 +Z）
    panel(width, height, x, y, z, options = {}) {
      const geometry = new THREE.PlaneGeometry(width, height);
      geometry.translate(0, options.anchor === 'center' ? 0 : height / 2, 0);
      return place(geometry, x, y, z, options, options.anchor);
    },
    // 任意几何体（需要调用方自行完成定位）
    raw(geometry) {
      parts.push(normalize(geometry));
      return api;
    },
    // 斜面板：从 (x1,y1,z1) 到 (x2,y2,z2) 的坡道面
    ramp(width, x1, y1, z1, x2, y2, z2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dz = z2 - z1;
      const length = Math.hypot(dx, dy, dz);
      const geometry = new THREE.BoxGeometry(width, 0.12, length);
      const target = new THREE.Vector3(x2, y2, z2);
      const origin = new THREE.Vector3(x1, y1, z1);
      const direction = target.clone().sub(origin).normalize();
      const alignQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
      const position = origin.clone().add(target).multiplyScalar(0.5);
      geometry.applyQuaternion(alignQuat);
      geometry.translate(position.x, position.y, position.z);
      parts.push(normalize(geometry));
      return api;
    },
    get count() {
      return parts.length;
    },
    finish(parent, options = {}) {
      if (!parts.length) return null;
      const merged = mergeGeometries(parts, false);
      if (!merged) throw new Error(`mergeGeometries failed for ${name}`);
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = options.name ?? name;
      mesh.castShadow = options.castShadow ?? true;
      mesh.receiveShadow = options.receiveShadow ?? true;
      if (options.layer !== undefined) mesh.layers.set(options.layer);
      if (parent) parent.add(mesh);
      parts.length = 0;
      return mesh;
    },
  };

  return api;
}
