import * as THREE from "three";
import { buildNature } from "./nature";
import { buildRing, islandMeshes, site } from "./ring";
import { makeIsland } from "./rock";
import { buildSettlements, buildUnderworks } from "./ruins";
import { buildSanctum, PLAZA } from "./sanctum";
import type { Tick } from "./sky";

export interface Celestia {
  group: THREE.Group;
  tick: Tick;
  /** What was actually built, for inspection from the console or an acceptance script. */
  inventory: { islets: number; armillaryRings: number; waterfalls: number; brokenSpans: number };
}

export function buildCelestia(): Celestia {
  const group = new THREE.Group();

  // The great central island: a paved plateau over an inverted mountain of rock.
  const main = site(
    makeIsland({ radius: 830, depth: 1280, seed: 7, segments: 180, rings: 50, hills: 64, plaza: PLAZA, spikes: 9 }),
    new THREE.Vector3(),
  );
  const sanctum = buildSanctum();
  const ring = buildRing(main);
  const settlements = buildSettlements(main, ring.islets);
  const nature = buildNature({
    main,
    islets: ring.islets,
    mainClear: (x, z) => {
      const r = Math.hypot(x, z);
      if (r < PLAZA + 26) return false;
      // Bridges land along the spoke directions; leave their approaches open.
      const a = Math.atan2(z, x);
      if (ring.spokeAngles.some((s) => Math.abs(Math.atan2(Math.sin(a - s), Math.cos(a - s))) * r < 30)) return false;
      return settlements.footprints.every(([fx, fz, fr]) => Math.hypot(x - fx, z - fz) > fr);
    },
  });

  group.add(islandMeshes(main), sanctum.group, ring.group, settlements.group, buildUnderworks(main), nature.group);
  return {
    group,
    tick: (t) => {
      sanctum.tick(t);
      nature.tick(t);
    },
    inventory: {
      islets: ring.islets.length,
      armillaryRings: sanctum.rings,
      waterfalls: nature.waterfalls,
      brokenSpans: ring.breaks.length / 2,
    },
  };
}
