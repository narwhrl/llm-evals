import * as THREE from 'three';

/**
 * Accumulates axis-aligned boxes grouped by color and bakes them into one
 * InstancedMesh per color, so the whole scene renders with a handful of draw calls.
 */
export class VoxelWorld {
  constructor() {
    /** @type {Map<number, number[]>} color -> [cx,cy,cz,sx,sy,sz, ...] */
    this.groups = new Map();
    this.boxCount = 0;
  }

  /** Add a box given its center and full size. */
  box(cx, cy, cz, sx, sy, sz, color) {
    let arr = this.groups.get(color);
    if (!arr) {
      arr = [];
      this.groups.set(color, arr);
    }
    arr.push(cx, cy, cz, sx, sy, sz);
    this.boxCount++;
  }

  /** Add a box given min corner and full size. */
  boxMin(x, y, z, sx, sy, sz, color) {
    this.box(x + sx / 2, y + sy / 2, z + sz / 2, sx, sy, sz, color);
  }

  /** Add many boxes from an array of [x, y, z, sx, sy, sz] tuples sharing one color. */
  boxes(list, color) {
    for (const [x, y, z, sx, sy, sz] of list) this.box(x, y, z, sx, sy, sz, color);
  }

  /**
   * Build InstancedMeshes for every color and add them to `root`.
   * `options.emissive(color)` may return an emissive intensity for glowing colors.
   */
  build(root, options = {}) {
    const { emissive = () => 0 } = options;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (const [color, data] of this.groups) {
      const count = data.length / 6;
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.85,
        metalness: 0.04,
      });
      const glow = emissive(color);
      if (glow > 0) {
        material.emissive = new THREE.Color(color);
        material.emissiveIntensity = glow;
      }
      const mesh = new THREE.InstancedMesh(geometry, material, count);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      for (let i = 0; i < count; i++) {
        const o = i * 6;
        position.set(data[o], data[o + 1], data[o + 2]);
        scale.set(data[o + 3], data[o + 4], data[o + 5]);
        matrix.compose(position, quaternion, scale);
        mesh.setMatrixAt(i, matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.name = `vox-${color.toString(16)}`;
      root.add(mesh);
    }
    return this.boxCount;
  }
}

/** Shared palette for the ensemble. */
export const C = {
  grass: 0x5d9240,
  grassDark: 0x4f8037,
  earth: 0x6b5a41,
  paving: 0xb3ab9d,
  pavingAlt: 0xa29a8c,
  stone: 0x9c978d,
  stoneDark: 0x7f7a71,
  stoneLight: 0xb5b0a6,
  redWall: 0x9e2b20,
  redWallDark: 0x84231a,
  column: 0x8f2a1e,
  wood: 0x8a5a33,
  woodDark: 0x6b4426,
  roofGrey: 0x5b7186,
  roofGreyDark: 0x47596b,
  roofGold: 0xd4a017,
  roofGoldDark: 0xb8890f,
  gold: 0xe0b12c,
  white: 0xded7c9,
  dark: 0x2a211a,
  lantern: 0xd8402c,
  leaf: 0x3e7d35,
  leafDark: 0x336a2c,
  trunk: 0x5d4326,
  bronze: 0x8a7a4a,
};
