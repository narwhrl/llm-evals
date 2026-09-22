// 道具实例化批处理：同类型道具合成一个 InstancedMesh，支持逐实例色调与湿面材质变体。
import * as THREE from 'three';
import { getProp } from './propRegistry.js';

export function createPropBatch({ materials, rng }) {
  const buckets = new Map();
  const scratch = {
    matrix: new THREE.Matrix4(),
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    euler: new THREE.Euler(),
    scale: new THREE.Vector3(),
    color: new THREE.Color(),
  };
  let total = 0;

  function bucketFor(type, wet) {
    const key = wet ? `${type}|wet` : type;
    let bucket = buckets.get(key);
    if (!bucket) {
      const prop = getProp(type);
      bucket = { type, wet, prop, entries: [] };
      buckets.set(key, bucket);
    }
    return bucket;
  }

  const api = {
    add(type, x, y, z, options = {}) {
      const { rotX = 0, rotY = 0, rotZ = 0, scale = 1, tint = null, wet = false } = options;
      const bucket = bucketFor(type, wet);
      bucket.entries.push({
        x,
        y,
        z,
        rotX,
        rotY,
        rotZ,
        sx: typeof scale === 'number' ? scale : scale[0],
        sy: typeof scale === 'number' ? scale : scale[1],
        sz: typeof scale === 'number' ? scale : scale[2],
        tint,
      });
      total += 1;
      return api;
    },
    // 便捷方法：在区域内随机撒放同一种道具
    scatter(type, count, area, options = {}) {
      const { y = 0, wet = false, jitterRotY = true, scaleRange = null, tintList = null } = options;
      for (let i = 0; i < count; i += 1) {
        const tint = tintList ? rng.pick(tintList) : null;
        api.add(type, rng.range(area[0], area[1]), y, rng.range(area[2], area[3]), {
          rotY: jitterRotY ? rng.range(0, Math.PI * 2) : 0,
          scale: scaleRange ? rng.range(scaleRange[0], scaleRange[1]) : 1,
          tint,
          wet,
        });
      }
      return api;
    },
    flush(parent) {
      const created = [];
      for (const bucket of buckets.values()) {
        const { prop, entries } = bucket;
        const geometry = prop.geometry();
        const material = bucket.wet ? materials.wet(prop.material) : materials.get(prop.material);
        const mesh = new THREE.InstancedMesh(geometry, material, entries.length);
        mesh.name = `props:${bucket.type}${bucket.wet ? ':wet' : ''}`;
        mesh.castShadow = prop.castShadow;
        mesh.receiveShadow = prop.receiveShadow;
        let hasTint = false;
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i];
          scratch.position.set(entry.x, entry.y, entry.z);
          scratch.euler.set(entry.rotX, entry.rotY, entry.rotZ);
          scratch.quaternion.setFromEuler(scratch.euler);
          scratch.scale.set(entry.sx, entry.sy, entry.sz);
          scratch.matrix.compose(scratch.position, scratch.quaternion, scratch.scale);
          mesh.setMatrixAt(i, scratch.matrix);
          if (entry.tint !== null) {
            hasTint = true;
            scratch.color.set(entry.tint);
            mesh.setColorAt(i, scratch.color);
          }
        }
        if (!hasTint && mesh.instanceColor) mesh.instanceColor = null;
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        mesh.computeBoundingSphere();
        parent.add(mesh);
        created.push(mesh);
      }
      return created;
    },
    summary() {
      const summary = {};
      for (const bucket of buckets.values()) {
        const key = bucket.wet ? `${bucket.type} (wet)` : bucket.type;
        summary[key] = (summary[key] ?? 0) + bucket.entries.length;
      }
      return summary;
    },
    get count() {
      return total;
    },
    get batchCount() {
      return buckets.size;
    },
  };

  return api;
}
