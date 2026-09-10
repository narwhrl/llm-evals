import * as THREE from 'three';
import { BLOCK, MATERIAL_CONFIGS } from './constants.js';

/**
 * Fast 3D Voxel World storage with coordinate packing,
 * occluded voxel culling, and InstancedMesh generation.
 */
export class VoxelWorld {
  constructor() {
    // Map of packed coordinate -> blockType
    this.voxels = new Map();
    this.totalVoxelsCount = 0;
  }

  /**
   * Pack integer coordinates (x: -256..255, y: -64..447, z: -256..255)
   * into a 27-bit SMI integer.
   */
  static pack(x, y, z) {
    return ((x + 256) & 0x1ff) | (((y + 64) & 0x1ff) << 9) | (((z + 256) & 0x1ff) << 18);
  }

  static unpack(key) {
    const x = (key & 0x1ff) - 256;
    const y = ((key >> 9) & 0x1ff) - 64;
    const z = ((key >> 18) & 0x1ff) - 256;
    return { x, y, z };
  }

  setVoxel(x, y, z, type) {
    x = Math.floor(x);
    y = Math.floor(y);
    z = Math.floor(z);

    if (x < -256 || x > 255 || y < -64 || y > 447 || z < -256 || z > 255) {
      return;
    }

    const key = VoxelWorld.pack(x, y, z);
    if (!type || type === BLOCK.AIR) {
      if (this.voxels.has(key)) {
        this.voxels.delete(key);
        this.totalVoxelsCount--;
      }
    } else {
      if (!this.voxels.has(key)) {
        this.totalVoxelsCount++;
      }
      this.voxels.set(key, type);
    }
  }

  getVoxel(x, y, z) {
    x = Math.floor(x);
    y = Math.floor(y);
    z = Math.floor(z);
    if (x < -256 || x > 255 || y < -64 || y > 447 || z < -256 || z > 255) {
      return BLOCK.AIR;
    }
    const key = VoxelWorld.pack(x, y, z);
    return this.voxels.get(key) || BLOCK.AIR;
  }

  isOpaque(type) {
    if (!type || type === BLOCK.AIR) return false;
    if (type === BLOCK.WATER || type === BLOCK.INCENSE_SMOKE) return false;
    return true;
  }

  /**
   * Helper: Fill an axis-aligned box with a block type
   */
  fillBox(minX, minY, minZ, maxX, maxY, maxZ, type) {
    const x1 = Math.min(minX, maxX);
    const x2 = Math.max(minX, maxX);
    const y1 = Math.min(minY, maxY);
    const y2 = Math.max(minY, maxY);
    const z1 = Math.min(minZ, maxZ);
    const z2 = Math.max(minZ, maxZ);

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          this.setVoxel(x, y, z, type);
        }
      }
    }
  }

  /**
   * Helper: Fill horizontal cylinder (e.g. for circular moon gates, ponds, stupa)
   */
  fillCylinder(cx, cy, cz, radius, height, type) {
    const r2 = radius * radius;
    const rCeil = Math.ceil(radius);
    for (let dx = -rCeil; dx <= rCeil; dx++) {
      for (let dz = -rCeil; dz <= rCeil; dz++) {
        if (dx * dx + dz * dz <= r2) {
          for (let dy = 0; dy < height; dy++) {
            this.setVoxel(cx + dx, cy + dy, cz + dz, type);
          }
        }
      }
    }
  }

  /**
   * Build Three.js InstancedMesh objects for all populated block types.
   * Culls voxels that are completely occluded by 6 solid neighbors.
   */
  buildMeshGroup() {
    const rootGroup = new THREE.Group();
    rootGroup.name = 'VoxelComplex';

    // Group visible coordinates by block type
    const visibleBlocks = new Map(); // type -> Array of {x, y, z}

    let renderedVoxelCount = 0;

    for (const [key, type] of this.voxels.entries()) {
      const { x, y, z } = VoxelWorld.unpack(key);

      // Check occlusion
      const isSelfOpaque = this.isOpaque(type);
      if (isSelfOpaque) {
        const top = this.isOpaque(this.getVoxel(x, y + 1, z));
        const btm = this.isOpaque(this.getVoxel(x, y - 1, z));
        const px = this.isOpaque(this.getVoxel(x + 1, y, z));
        const nx = this.isOpaque(this.getVoxel(x - 1, y, z));
        const pz = this.isOpaque(this.getVoxel(x, y, z + 1));
        const nz = this.isOpaque(this.getVoxel(x, y, z - 1));

        // If surrounded on all 6 sides by solid opaque blocks, skip
        if (top && btm && px && nx && pz && nz) {
          continue;
        }
      }

      if (!visibleBlocks.has(type)) {
        visibleBlocks.set(type, []);
      }
      visibleBlocks.get(type).push({ x, y, z });
      renderedVoxelCount++;
    }

    // Shared unit cube geometry
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const dummy = new THREE.Object3D();

    for (const [type, instances] of visibleBlocks.entries()) {
      const count = instances.length;
      if (count === 0) continue;

      const matConfig = MATERIAL_CONFIGS[type] || { color: 0x888888, roughness: 0.8 };
      const material = new THREE.MeshStandardMaterial({
        color: matConfig.color,
        roughness: matConfig.roughness !== undefined ? matConfig.roughness : 0.6,
        metalness: matConfig.metalness !== undefined ? matConfig.metalness : 0.1,
        emissive: matConfig.emissive || 0x000000,
        emissiveIntensity: matConfig.emissiveIntensity || 0,
        transparent: matConfig.transparent || false,
        opacity: matConfig.opacity !== undefined ? matConfig.opacity : 1.0,
      });

      const instancedMesh = new THREE.InstancedMesh(boxGeometry, material, count);
      instancedMesh.name = `VoxelType_${type}`;

      // Water and smoke don't cast heavy opaque shadows
      if (type !== BLOCK.WATER && type !== BLOCK.INCENSE_SMOKE) {
        instancedMesh.castShadow = true;
      }
      instancedMesh.receiveShadow = true;

      for (let i = 0; i < count; i++) {
        const p = instances[i];
        dummy.position.set(p.x + 0.5, p.y + 0.5, p.z + 0.5);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      rootGroup.add(instancedMesh);
    }

    return {
      group: rootGroup,
      totalVoxels: this.totalVoxelsCount,
      renderedVoxels: renderedVoxelCount,
    };
  }
}
