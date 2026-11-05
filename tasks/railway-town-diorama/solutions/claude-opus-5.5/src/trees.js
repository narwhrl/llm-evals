// Model-railway trees (lichen-like clumps and stacked-cone conifers) and night light pools, all instanced.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { noiseTexture, glowTexture } from './textures.js';

// Same displacement for every copy of a vertex position, so faces stay closed.
function lumpy(geometry, amount, seed) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = Math.sin(v.x * 9.1 + seed) * Math.sin(v.y * 7.3 + seed * 1.7) * Math.sin(v.z * 8.7 + seed * 2.3);
    v.multiplyScalar(1 + n * amount);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function clump(parts, seed) {
  return mergeGeometries(
    parts.map(([r, x, y, z], i) => lumpy(new THREE.IcosahedronGeometry(r, 1), 0.14, seed + i).translate(x, y, z)),
  );
}

function conifer() {
  return mergeGeometries(
    [[0.3, 0.5, 0.42], [0.24, 0.44, 0.66], [0.16, 0.38, 0.88]].map(([r, h, y], i) =>
      lumpy(new THREE.ConeGeometry(r, h, 8, 2), 0.08, 3 + i).translate(0, y, 0),
    ),
  );
}

export function buildTrees(trees) {
  const group = new THREE.Group();
  const bump = noiseTexture(128, 4, [[16, 0.6], [64, 0.4]]);
  bump.repeat.set(3, 3);
  const leaf = new THREE.MeshStandardMaterial({ roughness: 0.92, bumpMap: bump, bumpScale: 3 });
  const bark = new THREE.MeshStandardMaterial({ color: '#5a4332', roughness: 0.9 });
  const kinds = {
    round: [
      clump([[0.3, 0, 0.66, 0], [0.24, 0.17, 0.54, 0.08], [0.22, -0.15, 0.56, -0.1], [0.2, 0.02, 0.86, -0.03]], 1),
      clump([[0.28, 0, 0.62, 0], [0.26, -0.12, 0.74, 0.1], [0.2, 0.16, 0.6, -0.08]], 7),
    ],
    conifer: [conifer()],
  };
  const trunks = { round: new THREE.CylinderGeometry(0.03, 0.05, 0.5, 6).translate(0, 0.25, 0), conifer: new THREE.CylinderGeometry(0.03, 0.04, 0.3, 6).translate(0, 0.15, 0) };
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const color = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  for (const [kind, variants] of Object.entries(kinds)) {
    const list = trees.filter((t) => t.kind === kind);
    const trunk = new THREE.InstancedMesh(trunks[kind], bark, list.length);
    const crowns = variants.map((geo, vi) => {
      const subset = list.filter((_, i) => i % variants.length === vi);
      const mesh = new THREE.InstancedMesh(geo, leaf, subset.length);
      subset.forEach((t, i) => {
        q.setFromAxisAngle(up, t.rot);
        m.compose(new THREE.Vector3(t.x, t.y, t.z), q, new THREE.Vector3(t.scale, t.scale * (0.9 + t.hue * 0.3), t.scale));
        mesh.setMatrixAt(i, m);
        const autumn = kind === 'round' && t.hue > 0.93;
        if (autumn) color.setHSL(0.08 + (t.hue - 0.93) * 1.5, 0.6, 0.42);
        else if (kind === 'round') color.setHSL(0.2 + t.hue * 0.09, 0.42 + t.hue * 0.12, 0.3 + t.hue * 0.1);
        else color.setHSL(0.33 + t.hue * 0.06, 0.32, 0.2 + t.hue * 0.06);
        mesh.setColorAt(i, color);
      });
      return mesh;
    });
    list.forEach((t, i) => {
      q.setFromAxisAngle(up, t.rot);
      m.compose(new THREE.Vector3(t.x, t.y - 0.05, t.z), q, new THREE.Vector3(t.scale, t.scale, t.scale));
      trunk.setMatrixAt(i, m);
    });
    for (const mesh of [trunk, ...crowns]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }
  return group;
}

// Additive glow decals under lamps; opacity follows the night factor.
export function buildPools(pools) {
  const material = new THREE.MeshBasicMaterial({
    map: glowTexture(),
    color: '#ffb662',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
  });
  const geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const mesh = new THREE.InstancedMesh(geo, material, pools.length);
  const m = new THREE.Matrix4();
  const c = new THREE.Color();
  pools.forEach((p, i) => {
    m.makeScale(p.r * 2, 1, p.r * 2).setPosition(p.x, (p.y ?? 0) + 0.015, p.z);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, c.setScalar(p.k));
  });
  mesh.renderOrder = 2;
  return mesh;
}
