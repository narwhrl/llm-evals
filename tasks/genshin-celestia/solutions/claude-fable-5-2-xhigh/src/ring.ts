import * as THREE from "three";
import { bridgeBay, type BaySize } from "./arch";
import { kitInstances, MATERIALS, solid } from "./materials";
import { makeIsland, type Island } from "./rock";
import { rng } from "./util";

/** Radius of the sky road that strings the outer islets into Celestia's ring. */
export const RING_R = 1700;
const BAY: BaySize = { L: 62, W: 30, H: 48 };
const deg = THREE.MathUtils.degToRad;

/** A piece of land things can be placed on. */
export interface Site {
  island: Island;
  origin: THREE.Vector3;
  /** World position on the surface for a local offset. */
  at(x: number, z: number, lift?: number): THREE.Vector3;
}

export function site(island: Island, origin: THREE.Vector3): Site {
  return { island, origin, at: (x, z, lift = 0) => new THREE.Vector3(origin.x + x, origin.y + island.topY(x, z) + lift, origin.z + z) };
}

export function islandMeshes(s: Site): THREE.Group {
  const group = new THREE.Group();
  group.add(solid(s.island.top, "painted"), solid(s.island.bottom, "painted"));
  group.position.copy(s.origin);
  return group;
}

/** The road undulates so the islets it threads sit at different heights. */
export const roadY = (theta: number) => 30 + 62 * Math.sin(2 * theta + 0.8) + 28 * Math.sin(3 * theta + 2.1);

// angle°, plateau radius, hanging depth
const ISLETS: [number, number, number][] = [
  [4, 235, 540], [49, 150, 340], [93, 290, 680], [141, 165, 400],
  [184, 220, 520], [226, 135, 300], [272, 255, 620], [318, 172, 380],
];
/** Stretches of the ring road that have fallen away (degrees). */
const RING_GAPS: [number, number][] = [[18, 31], [244, 255]];
/** Islets joined to the main island by radial bridges; the last one is broken mid-span. */
const SPOKES = [0, 2, 4, 6, 5];

export interface Ring {
  group: THREE.Group;
  islets: Site[];
  /** World-space spots where masonry has broken away. */
  breaks: THREE.Vector3[];
  /** Angles (radians) of the radial bridges, so planting keeps clear of them. */
  spokeAngles: number[];
}

export function buildRing(main: Site): Ring {
  const group = new THREE.Group();
  const rand = rng(404);

  const islets = ISLETS.map(([a, radius, depth], i) => {
    const theta = deg(a);
    const island = makeIsland({ radius, depth, seed: 31 + i * 7, segments: 60, rings: 14, hills: radius * 0.1, spikes: 3 });
    const s = site(island, new THREE.Vector3(Math.cos(theta) * RING_R, roadY(theta) - 7, Math.sin(theta) * RING_R));
    group.add(islandMeshes(s));
    return s;
  });

  const plain: THREE.Matrix4[] = [], colonnade: THREE.Matrix4[] = [], breaks: THREE.Vector3[] = [];
  const X = new THREE.Vector3(), Y = new THREE.Vector3(), Z = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  /** Lays bays along a path; `gap` bays are missing and their neighbours sag toward the void. */
  const lay = (path: (t: number) => THREE.Vector3, n: number, gap: (i: number) => boolean, roofed: (i: number) => boolean) => {
    for (let i = 0; i < n; i++) {
      const p0 = path(i / n), p1 = path((i + 1) / n);
      if (gap(i)) {
        if (!gap(i - 1) || !gap(i + 1)) breaks.push(p0.clone().lerp(p1, 0.5));
        continue;
      }
      X.subVectors(p1, p0);
      const len = X.length();
      X.normalize();
      Z.crossVectors(X, up).normalize();
      Y.crossVectors(Z, X);
      const m = new THREE.Matrix4().makeBasis(X, Y, Z).setPosition(p0.clone().lerp(p1, 0.5));
      const sag = gap(i + 1) ? -0.16 : gap(i - 1) ? 0.16 : 0;
      if (sag) m.multiply(new THREE.Matrix4().makeRotationZ(sag)).multiply(new THREE.Matrix4().makeTranslation(0, -14, 0));
      m.scale(new THREE.Vector3(len / BAY.L, 1, 1));
      (roofed(i) ? colonnade : plain).push(m);
    }
  };

  // The ring road itself.
  const ringBays = Math.round((2 * Math.PI * RING_R) / BAY.L);
  const ringPath = (t: number) => {
    const theta = t * Math.PI * 2;
    return new THREE.Vector3(Math.cos(theta) * RING_R, roadY(theta), Math.sin(theta) * RING_R);
  };
  const inRingGap = (i: number) => {
    const a = (((i + 0.5) / ringBays) * 360 + 360) % 360;
    return RING_GAPS.some(([from, to]) => a >= from && a <= to);
  };
  lay(ringPath, ringBays, inRingGap, (i) => Math.sin((i / ringBays) * Math.PI * 2 * 5 + 0.6) > -0.1);

  // Radial bridges bowing up from the main island to the ring.
  const spokeAngles: number[] = [];
  SPOKES.forEach((isletIndex, k) => {
    const theta = deg(ISLETS[isletIndex][0]);
    spokeAngles.push(theta);
    const c = Math.cos(theta), s = Math.sin(theta);
    const r0 = main.island.rim(theta) * 0.9, r1 = RING_R - BAY.W * 0.4;
    const y0 = main.at(c * r0, s * r0).y + 3, y1 = roadY(theta);
    const n = Math.round((r1 - r0) / BAY.L);
    const broken = k === SPOKES.length - 1;
    lay(
      (t) => new THREE.Vector3(c * (r0 + (r1 - r0) * t), y0 + (y1 - y0) * t + 64 * Math.sin(Math.PI * t), s * (r0 + (r1 - r0) * t)),
      n,
      (i) => broken && i >= Math.floor(n * 0.42) && i <= Math.floor(n * 0.66),
      (i) => i % 4 === 1 || i % 4 === 2,
    );
  });

  group.add(kitInstances(bridgeBay(BAY, false), plain), kitInstances(bridgeBay(BAY, true), colonnade));

  // Fallen masonry hanging in the air around every break.
  const blocks: THREE.Matrix4[] = [];
  const e = new THREE.Euler(), q = new THREE.Quaternion();
  for (const b of breaks) {
    for (let i = 0; i < 16; i++) {
      e.set(rand() * 6.3, rand() * 6.3, rand() * 6.3);
      const size = 5 + rand() * 17;
      blocks.push(new THREE.Matrix4().compose(
        new THREE.Vector3(b.x + (rand() - 0.5) * 150, b.y - 30 + (rand() - 0.6) * 170, b.z + (rand() - 0.5) * 150),
        q.setFromEuler(e),
        new THREE.Vector3(size * (1 + rand()), size, size * (0.6 + rand() * 0.8)),
      ));
    }
  }
  const rubble = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), MATERIALS.ivory, blocks.length);
  blocks.forEach((m, i) => rubble.setMatrixAt(i, m));
  rubble.castShadow = rubble.receiveShadow = true;
  group.add(rubble);

  return { group, islets, breaks, spokeAngles };
}
