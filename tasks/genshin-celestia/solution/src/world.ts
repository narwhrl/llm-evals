import * as THREE from 'three';
import { createRng, range, type Rng } from './random';
import { createMaterials, type Materials } from './materials';
import { createFloatingIsland } from './rock';
import {
  createArcadeSegment,
  createArmillary,
  createBridge,
  createColumn,
  createPavilion,
  createPinnacle,
  createRuinTower,
  createSanctum,
} from './architecture';
import { createDebris, createForest, createWaterfall } from './nature';
import { createCloudSea, createLightShafts, createSkyDome } from './sky';
import { createWaterfallTexture } from './textures';

const TAU = Math.PI * 2;
const MAIN_RADIUS = 290;
const MAIN_DEPTH = 440;
const RING_RADIUS = 545;

export interface World {
  root: THREE.Group;
  sunDirection: THREE.Vector3;
  update(elapsed: number, delta: number, camera: THREE.Camera): void;
}

interface RingIsland {
  x: number;
  z: number;
  y: number;
  radius: number;
  angle: number;
}

export function createWorld(): World {
  const rng: Rng = createRng(20261114);
  const materials: Materials = createMaterials();
  const root = new THREE.Group();
  const animations: Array<(elapsed: number, delta: number) => void> = [];
  const sunDirection = new THREE.Vector3(-0.55, 0.78, 0.3).normalize();

  const sky = createSkyDome(sunDirection);
  root.add(sky.group);
  const clouds = createCloudSea(materials, rng);
  root.add(clouds.group);
  animations.push(clouds.update);
  const shafts = createLightShafts(rng, sunDirection);
  root.add(shafts.group);
  animations.push(shafts.update);

  const rockRadiusAt = (t: number): number => MAIN_RADIUS * Math.pow(1 - t, 0.74);
  const rockHeightAt = (t: number): number => -MAIN_DEPTH * Math.pow(t, 1.16);

  const addRubble = (x: number, y: number, z: number, count: number): void => {
    for (let i = 0; i < count; i += 1) {
      const size = range(rng, 4, 15);
      const chunk = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 0), materials.debris);
      chunk.position.set(x + range(rng, -26, 26), y + range(rng, -22, 6), z + range(rng, -26, 26));
      chunk.rotation.set(rng() * TAU, rng() * TAU, rng() * TAU);
      root.add(chunk);
    }
  };

  const waterfallTexture = createWaterfallTexture();
  const addWaterfall = (
    x: number,
    z: number,
    topY: number,
    length: number,
    width: number,
    angle: number,
  ): void => {
    const waterfall = createWaterfall({ x, z, topY, length, width, angle, materials, texture: waterfallTexture });
    root.add(waterfall.group);
    animations.push(waterfall.update);
  };

  // ---------------------------------------------------------------- main island
  const main = createFloatingIsland({ radius: MAIN_RADIUS, depth: MAIN_DEPTH, seed: 11 }, materials);
  root.add(main.group);
  const groundY = main.capY;

  root.add(
    createForest({
      innerRadius: 145,
      outerRadius: 272,
      count: 66,
      rng,
      materials,
      groundY,
      treeScale: 1,
    }),
  );

  for (let i = 0; i < 9; i += 1) {
    const a = rng() * TAU;
    const r = range(rng, 150, 262);
    const patch = new THREE.Mesh(new THREE.CircleGeometry(range(rng, 14, 30), 12), materials.grassDark);
    patch.rotation.x = -Math.PI / 2;
    patch.position.set(Math.cos(a) * r, groundY + 0.7, Math.sin(a) * r);
    patch.scale.y = range(rng, 0.6, 1.25);
    root.add(patch);
  }

  const rim = new THREE.Mesh(new THREE.TorusGeometry(MAIN_RADIUS - 7, 2.4, 6, 72), materials.stoneLight);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = groundY;
  root.add(rim);

  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * TAU + 0.42;
    const r = range(rng, 172, 248);
    const pavilion = createPavilion(range(rng, 16, 24), materials);
    pavilion.position.set(Math.cos(a) * r, groundY, Math.sin(a) * r);
    root.add(pavilion);
  }
  for (let i = 0; i < 9; i += 1) {
    const a = rng() * TAU;
    const r = range(rng, 172, 262);
    const pinnacle = createPinnacle(range(rng, 26, 50), range(rng, 3.2, 5.4), materials);
    pinnacle.position.set(Math.cos(a) * r, groundY, Math.sin(a) * r);
    root.add(pinnacle);
  }

  // ancient structures half-buried in the inverted cliff face
  for (let i = 0; i < 7; i += 1) {
    const a = rng() * TAU;
    const t = range(rng, 0.16, 0.7);
    const r = rockRadiusAt(t) * 1.04;
    const y = rockHeightAt(t);
    const segment = createArcadeSegment({
      length: range(rng, 30, 58),
      count: 4,
      height: range(rng, 20, 34),
      materials,
      broken: rng() > 0.55,
    });
    segment.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
    segment.rotation.y = Math.PI / 2 - a;
    root.add(segment);
    const slab = new THREE.Mesh(new THREE.BoxGeometry(range(rng, 36, 62), 3, 15), materials.stoneShade);
    slab.position.set(Math.cos(a) * r, y - 2.2, Math.sin(a) * r);
    slab.rotation.y = Math.PI / 2 - a;
    root.add(slab);
  }
  for (let i = 0; i < 10; i += 1) {
    const a = rng() * TAU;
    const t = range(rng, 0.2, 0.76);
    const r = rockRadiusAt(t) * 1.02;
    const column = createColumn(range(rng, 20, 38), range(rng, 2.4, 4), materials);
    column.position.set(Math.cos(a) * r, rockHeightAt(t), Math.sin(a) * r);
    column.rotation.z = range(rng, -0.16, 0.16);
    root.add(column);
  }
  for (let i = 0; i < 5; i += 1) {
    const a = rng() * TAU;
    const r = range(rng, 70, 175);
    const chunk = new THREE.Mesh(new THREE.IcosahedronGeometry(range(rng, 16, 34), 0), materials.debris);
    chunk.position.set(Math.cos(a) * r, range(rng, -360, -210), Math.sin(a) * r);
    chunk.rotation.set(rng() * TAU, rng() * TAU, rng() * TAU);
    root.add(chunk);
  }

  for (let i = 0; i < 4; i += 1) {
    const a = (i / 4) * TAU + 0.45;
    addWaterfall(Math.cos(a) * 287, Math.sin(a) * 287, groundY, range(rng, 260, 350), range(rng, 20, 30), a);
  }

  // ---------------------------------------------------------------- central sanctum
  const sanctum = createSanctum(materials);
  sanctum.group.position.y = groundY;
  root.add(sanctum.group);
  for (let i = 0; i < 4; i += 1) {
    const a = (i / 4) * TAU + Math.PI / 4;
    const tower = createPinnacle(82, 10, materials);
    tower.position.set(Math.cos(a) * 106, groundY + 27, Math.sin(a) * 106);
    root.add(tower);
  }
  const armillary = createArmillary(materials);
  armillary.group.position.y = groundY + sanctum.topY;
  root.add(armillary.group);
  animations.push(armillary.update);

  // ---------------------------------------------------------------- outer ring of islets
  const islands: RingIsland[] = [];
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * TAU + range(rng, -0.06, 0.06);
    const r = RING_RADIUS + range(rng, -42, 42);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const topY = range(rng, -28, 38);
    const radius = range(rng, 68, 108);
    const islet = createFloatingIsland(
      { radius, depth: range(rng, 120, 230), seed: 100 + i * 7, segments: 40, layers: 12 },
      materials,
    );
    islet.group.position.set(x, topY, z);
    root.add(islet.group);
    const islandY = topY + islet.capY;
    islands.push({ x, z, y: islandY, radius, angle: a });

    root.add(
      createForest({
        innerRadius: radius * 0.4,
        outerRadius: radius * 0.86,
        count: 7,
        rng,
        materials,
        groundY: islandY,
        treeScale: 0.55,
      }),
    );

    if (i % 2 === 0) {
      const segment = createArcadeSegment({
        length: radius * 0.9,
        count: 5,
        height: range(rng, 22, 32),
        materials,
        broken: rng() > 0.5,
      });
      segment.position.set(x, islandY, z);
      segment.rotation.y = rng() * TAU;
      root.add(segment);
    } else if (i % 3 === 1) {
      const pavilion = createPavilion(range(rng, 17, 25), materials);
      pavilion.position.set(x, islandY, z);
      root.add(pavilion);
    } else {
      const tower = createRuinTower(range(rng, 40, 66), range(rng, 9, 13), materials, rng);
      tower.position.set(x, islandY, z);
      root.add(tower);
    }
    for (let k = 0; k < 3; k += 1) {
      const pa = rng() * TAU;
      const pr = radius * range(rng, 0.55, 0.85);
      const pinnacle = createPinnacle(range(rng, 20, 38), range(rng, 2.4, 4), materials);
      pinnacle.position.set(x + Math.cos(pa) * pr, islandY, z + Math.sin(pa) * pr);
      root.add(pinnacle);
    }
  }

  for (let i = 2; i < 8; i += 4) {
    const islet = islands[i];
    const a = islet.angle + 0.7;
    addWaterfall(
      islet.x + Math.cos(a) * islet.radius,
      islet.z + Math.sin(a) * islet.radius,
      islet.y,
      range(rng, 130, 190),
      range(rng, 10, 16),
      a,
    );
  }

  // grand arched bridges forming the ring road
  for (let i = 0; i < 8; i += 1) {
    const from = islands[i];
    const to = islands[(i + 1) % 8];
    const start = new THREE.Vector3(from.x, from.y + 2, from.z);
    const end = new THREE.Vector3(to.x, to.y + 2, to.z);
    const broken = i === 2 || i === 6;
    const arch = range(rng, 40, 58);
    const width = range(rng, 15, 20);
    if (broken) {
      root.add(createBridge({ from: start, to: end, arch, width, materials, fromT: 0, toT: 0.33 }));
      root.add(createBridge({ from: start, to: end, arch, width, materials, fromT: 0.7, toT: 1 }));
      const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
      mid.y += arch * Math.sin(Math.PI * 0.5);
      addRubble(mid.x, mid.y - 30, mid.z, 7);
    } else {
      root.add(createBridge({ from: start, to: end, arch, width, materials }));
    }
  }

  // radial bridges from the main island to the ring
  for (const index of [0, 2, 4, 6]) {
    const target = islands[index];
    const a = target.angle;
    const from = new THREE.Vector3(Math.cos(a) * 280, groundY, Math.sin(a) * 280);
    const to = new THREE.Vector3(target.x, target.y + 2, target.z);
    const arch = range(rng, 34, 48);
    const width = range(rng, 14, 18);
    if (index === 4) {
      root.add(createBridge({ from, to, arch, width, materials, fromT: 0, toT: 0.4 }));
      root.add(createBridge({ from, to, arch, width, materials, fromT: 0.72, toT: 1 }));
      const mid = new THREE.Vector3().lerpVectors(from, to, 0.56);
      addRubble(mid.x, mid.y - 24, mid.z, 6);
    } else {
      root.add(createBridge({ from, to, arch, width, materials }));
    }
  }

  // broken inner ring colonnade suspended between the islets and the main island
  for (let i = 0; i < 10; i += 1) {
    const a = (i / 10) * TAU + 0.18;
    const r = 410 + range(rng, -22, 22);
    const length = range(rng, 58, 92);
    const y = range(rng, -14, 14);
    const segment = createArcadeSegment({
      length,
      count: 5,
      height: range(rng, 22, 34),
      materials,
      broken: rng() > 0.45,
    });
    segment.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
    segment.rotation.y = Math.PI / 2 - a;
    root.add(segment);
    const base = new THREE.Mesh(new THREE.BoxGeometry(length + 8, 3.2, 13), materials.stoneShade);
    base.position.set(Math.cos(a) * r, y - 2, Math.sin(a) * r);
    base.rotation.y = Math.PI / 2 - a;
    root.add(base);
  }

  // ruined spires on detached rock fragments outside the ring
  for (let i = 0; i < 3; i += 1) {
    const a = (i / 3) * TAU + 0.85;
    const r = range(rng, 640, 760);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = range(rng, -45, 18);
    const fragment = createFloatingIsland(
      { radius: range(rng, 20, 30), depth: range(rng, 34, 60), seed: 300 + i, segments: 24, layers: 8 },
      materials,
    );
    fragment.group.position.set(x, y, z);
    root.add(fragment.group);
    const tower = createRuinTower(range(rng, 42, 70), range(rng, 8, 13), materials, rng);
    tower.position.set(x, y + fragment.capY, z);
    root.add(tower);
  }

  // distant islets fading into aerial perspective, for layered depth and scale
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * TAU + 0.35;
    const r = range(rng, 950, 1500);
    const fragment = createFloatingIsland(
      { radius: range(rng, 22, 48), depth: range(rng, 45, 95), seed: 500 + i, segments: 24, layers: 8 },
      materials,
    );
    fragment.group.position.set(Math.cos(a) * r, range(rng, -60, 80), Math.sin(a) * r);
    root.add(fragment.group);
  }

  const debris = createDebris({
    count: 120,
    innerRadius: 190,
    outerRadius: 920,
    minY: -450,
    maxY: 140,
    rng,
    materials,
  });
  root.add(debris.group);
  animations.push(debris.update);

  return {
    root,
    sunDirection,
    update(elapsed, delta, camera) {
      sky.follow(camera);
      for (const animate of animations) animate(elapsed, delta);
    },
  };
}
