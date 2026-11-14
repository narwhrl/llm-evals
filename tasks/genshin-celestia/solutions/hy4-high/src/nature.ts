import * as THREE from 'three';
import type { Materials } from './materials';
import { range, type Rng } from './random';

const TAU = Math.PI * 2;

export interface ForestOptions {
  innerRadius: number;
  outerRadius: number;
  count: number;
  rng: Rng;
  materials: Materials;
  groundY: number;
  treeScale?: number;
}

/** Instanced cartoon trees and grass tufts covering an island's turf. */
export function createForest(options: ForestOptions): THREE.Group {
  const { innerRadius, outerRadius, count, rng, materials, groundY } = options;
  const scale = options.treeScale ?? 1;
  const group = new THREE.Group();
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  const canopyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    flatShading: true,
  });
  const grassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const leafTones = [
    new THREE.Color(0x5da55f),
    new THREE.Color(0x6fb569),
    new THREE.Color(0x8fca79),
    new THREE.Color(0x4e9455),
  ];

  const trunks = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(1.4, 2.3, 1, 6),
    materials.trunk,
    count,
  );
  const canopies = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), canopyMaterial, count * 3);
  let canopyIndex = 0;
  for (let i = 0; i < count; i += 1) {
    const a = rng() * TAU;
    const r = Math.sqrt(innerRadius ** 2 + rng() * (outerRadius ** 2 - innerRadius ** 2));
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const height = scale * range(rng, 22, 40);

    dummy.position.set(x, groundY + height * 0.25, z);
    dummy.rotation.set(0, rng() * TAU, 0);
    dummy.scale.set(scale * range(rng, 0.8, 1.2), height * 0.5, scale * range(rng, 0.8, 1.2));
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);

    for (let k = 0; k < 3; k += 1) {
      const cr = height * range(rng, 0.24, 0.36);
      dummy.position.set(
        x + range(rng, -height * 0.16, height * 0.16),
        groundY + height * 0.62 + k * height * 0.12,
        z + range(rng, -height * 0.16, height * 0.16),
      );
      dummy.rotation.set(rng() * TAU, rng() * TAU, rng() * TAU);
      dummy.scale.set(cr, cr * range(rng, 0.7, 1), cr);
      dummy.updateMatrix();
      canopies.setMatrixAt(canopyIndex, dummy.matrix);
      canopies.setColorAt(canopyIndex, color.copy(leafTones[Math.floor(rng() * leafTones.length)]));
      canopyIndex += 1;
    }
  }
  trunks.instanceMatrix.needsUpdate = true;
  canopies.instanceMatrix.needsUpdate = true;
  if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;
  trunks.castShadow = true;
  canopies.castShadow = true;
  group.add(trunks, canopies);

  const grassCount = count * 3;
  const grass = new THREE.InstancedMesh(new THREE.ConeGeometry(1, 1, 4), grassMaterial, grassCount);
  for (let i = 0; i < grassCount; i += 1) {
    const a = rng() * TAU;
    const r = Math.sqrt((innerRadius * 0.5) ** 2 + rng() * (outerRadius ** 2 - (innerRadius * 0.5) ** 2));
    const size = scale * range(rng, 1.8, 4.6);
    dummy.position.set(Math.cos(a) * r, groundY + size * 0.5, Math.sin(a) * r);
    dummy.rotation.set(range(rng, -0.25, 0.25), rng() * TAU, range(rng, -0.25, 0.25));
    dummy.scale.set(size * 0.5, size, size * 0.5);
    dummy.updateMatrix();
    grass.setMatrixAt(i, dummy.matrix);
    color.setHex(rng() > 0.5 ? 0x76bd63 : 0x9ad07c).multiplyScalar(range(rng, 0.85, 1.15));
    grass.setColorAt(i, color);
  }
  grass.instanceMatrix.needsUpdate = true;
  if (grass.instanceColor) grass.instanceColor.needsUpdate = true;
  group.add(grass);
  return group;
}

export interface WaterfallOptions {
  x: number;
  z: number;
  topY: number;
  length: number;
  width: number;
  angle: number;
  materials: Materials;
  texture: THREE.Texture;
}

export interface Waterfall {
  group: THREE.Group;
  update(elapsed: number, delta: number): void;
}

/** A translucent falling sheet with animated streaks, foam and mist. */
export function createWaterfall(options: WaterfallOptions): Waterfall {
  const group = new THREE.Group();
  const texture = options.texture.clone();
  texture.needsUpdate = true;
  const material = options.materials.water.clone();
  material.map = texture;
  material.opacity = 0.72;

  const sheetGeometry = new THREE.PlaneGeometry(options.width, options.length, 1, 1);
  const sheetA = new THREE.Mesh(sheetGeometry, material);
  sheetA.position.set(options.x, options.topY - options.length * 0.5, options.z);
  sheetA.rotation.y = Math.PI / 2 - options.angle;
  const sheetB = new THREE.Mesh(sheetGeometry, material);
  sheetB.position.copy(sheetA.position);
  sheetB.rotation.y = sheetA.rotation.y + Math.PI / 2;
  group.add(sheetA, sheetB);

  const foamMaterial = options.materials.cloud.clone();
  foamMaterial.opacity = 0.5;
  for (let i = 0; i < 3; i += 1) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(options.width * 0.34, 10, 6), foamMaterial);
    puff.position.set(
      options.x + Math.cos(options.angle + i * 2) * options.width * 0.2,
      options.topY - (i + 1) * 3,
      options.z + Math.sin(options.angle + i * 2) * options.width * 0.2,
    );
    puff.scale.y = 0.42;
    group.add(puff);
  }
  const mistMaterial = options.materials.cloud.clone();
  mistMaterial.opacity = 0.24;
  const mist = new THREE.Mesh(new THREE.SphereGeometry(options.width * 1.1, 12, 8), mistMaterial);
  mist.position.set(options.x, options.topY - options.length, options.z);
  mist.scale.y = 0.3;
  group.add(mist);

  return {
    group,
    update(_elapsed, delta) {
      texture.offset.y += delta * 0.38;
    },
  };
}

export interface DebrisOptions {
  count: number;
  innerRadius: number;
  outerRadius: number;
  minY: number;
  maxY: number;
  rng: Rng;
  materials: Materials;
}

export interface Debris {
  group: THREE.Group;
  update(elapsed: number, delta: number): void;
}

interface DebrisItem {
  position: THREE.Vector3;
  scale: THREE.Vector3;
  rotationSpeed: number;
  phase: number;
  bob: number;
}

/** Slowly bobbing broken rock fragments suspended around the islands. */
export function createDebris(options: DebrisOptions): Debris {
  const group = new THREE.Group();
  const { count, innerRadius, outerRadius, minY, maxY, rng, materials } = options;
  const material = materials.debris.clone();
  material.color.setHex(0xffffff);
  const mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), material, count);
  const items: DebrisItem[] = [];
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const tones = [0x7d7466, 0x968b79, 0x5f574a, 0xa79c88];
  for (let i = 0; i < count; i += 1) {
    const a = rng() * TAU;
    const r = innerRadius + rng() * (outerRadius - innerRadius);
    const size = range(rng, 2.5, 13);
    const item: DebrisItem = {
      position: new THREE.Vector3(Math.cos(a) * r, range(rng, minY, maxY), Math.sin(a) * r),
      scale: new THREE.Vector3(size * range(rng, 0.7, 1.5), size * range(rng, 0.5, 1.1), size * range(rng, 0.7, 1.5)),
      rotationSpeed: range(rng, -0.12, 0.12),
      phase: rng() * TAU,
      bob: range(rng, 2, 9),
    };
    items.push(item);
    color.setHex(tones[Math.floor(rng() * tones.length)]);
    mesh.setColorAt(i, color);
  }
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);

  return {
    group,
    update(elapsed, delta) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        dummy.position.set(
          item.position.x,
          item.position.y + Math.sin(elapsed * 0.45 + item.phase) * item.bob,
          item.position.z,
        );
        dummy.rotation.set(item.phase + elapsed * item.rotationSpeed, item.phase * 0.6 + elapsed * item.rotationSpeed, 0);
        dummy.scale.copy(item.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      void delta;
    },
  };
}
