import * as THREE from "three";
import { arcade, column, GOLD, IVORY, pavilion, spirelet } from "./arch";
import { kitMeshes, MATERIALS } from "./materials";
import type { Site } from "./ring";
import { PLAZA } from "./sanctum";
import { Kit, rng, trs } from "./util";

const flip = new THREE.Matrix4().makeRotationZ(Math.PI);

/** A tower snapped in half: jagged stump, and its crown hanging askew in the air beside it. */
function brokenSpire(kit: Kit, p: THREE.Vector3, r: number, h: number, rand: () => number): void {
  kit.add(IVORY, new THREE.CylinderGeometry(r * 0.86, r, h * 0.42, 12), trs(p.x, p.y + h * 0.21, p.z));
  kit.add(GOLD, new THREE.CylinderGeometry(r * 1.08, r * 1.08, h * 0.015, 12), trs(p.x, p.y + h * 0.2, p.z));
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2, tooth = h * (0.03 + rand() * 0.12);
    kit.add(IVORY, new THREE.BoxGeometry(r * 0.5, tooth, r * 0.24), trs(p.x + Math.cos(a) * r * 0.74, p.y + h * 0.42 + tooth / 2, p.z + Math.sin(a) * r * 0.74, -a + Math.PI / 2));
  }
  const crown = new Kit();
  spirelet(crown, 0, -h * 0.2, 0, r * 0.86, h * 0.55);
  const tilt = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.5, rand() * 6, 0.62));
  kit.addKit(crown, new THREE.Matrix4().makeTranslation(p.x + r * 3.4, p.y + h * 0.95, p.z + r * 1.5).multiply(tilt));
}

/** White buildings and ruins across the main island and the ring islets. */
export function buildSettlements(main: Site, islets: Site[]): { group: THREE.Group; footprints: [number, number, number][] } {
  const kit = new Kit();
  const rand = rng(606);
  /** Local-space discs on the main island that planting must avoid. */
  const footprints: [number, number, number][] = [];

  // Main island: shrines and watch-spires in the meadows beyond the plaza.
  for (let i = 0; i < 11; i++) {
    const a = (i / 11) * Math.PI * 2 + rand() * 0.3;
    const r = Math.min(PLAZA + 70 + rand() * 230, main.island.rim(a) * 0.82);
    if (r < PLAZA + 40) continue;
    const p = main.at(Math.cos(a) * r, Math.sin(a) * r, -2);
    if (i % 3 === 0) spirelet(kit, p.x, p.y, p.z, 11 + rand() * 5, 150 + rand() * 90);
    else pavilion(kit, p.x, p.y, p.z, 20 + rand() * 12);
    footprints.push([p.x, p.z, 52]);
  }

  const pillar = column(1, 0.085);
  const pillars: THREE.Matrix4[] = [];
  const e = new THREE.Euler(), q = new THREE.Quaternion();
  /** A circle of columns, most of them broken short or leaning. */
  const henge = (s: Site, x: number, z: number, radius: number, n: number) => {
    for (let i = 0; i < n; i++) {
      if (rand() < 0.22) continue;
      const a = (i / n) * Math.PI * 2;
      const h = rand() < 0.45 ? 46 + rand() * 8 : 12 + rand() * 26;
      e.set((rand() - 0.5) * 0.22, rand() * 6, (rand() - 0.5) * 0.22);
      pillars.push(new THREE.Matrix4().compose(s.at(x + Math.cos(a) * radius, z + Math.sin(a) * radius, -2), q.setFromEuler(e), new THREE.Vector3(46, h, 46)));
    }
  };

  // Ring islets: every one carries something different, set to the side of the sky road.
  islets.forEach((s, i) => {
    const theta = Math.atan2(s.origin.z, s.origin.x), size = s.island.spec.radius;
    // Radial offsets keep buildings clear of the road, which runs along the tangent.
    const spot = (radial: number, tangent: number, lift = -2) =>
      s.at(Math.cos(theta) * radial - Math.sin(theta) * tangent, Math.sin(theta) * radial + Math.cos(theta) * tangent, lift);
    const local = (p: THREE.Vector3): [number, number] => [p.x - s.origin.x, p.z - s.origin.z];
    const out = spot(size * 0.48, 0), inn = spot(-size * 0.46, size * 0.1);
    switch (i % 4) {
      case 0: // shrine island
        pavilion(kit, out.x, out.y, out.z, size * 0.15);
        spirelet(kit, inn.x, inn.y, inn.z, size * 0.055, size * 0.85);
        break;
      case 1: // fallen colonnade
        henge(s, ...local(out), size * 0.2, 12);
        henge(s, ...local(inn), size * 0.16, 9);
        break;
      case 2: // watchtower island
        spirelet(kit, out.x, out.y, out.z, size * 0.075, size * 1.1);
        arcade(kit, inn.x, inn.y, inn.z, size * 0.2, size * 0.16, 14, size * 0.02, (b) => Math.sin(b * 1.7 + i) > -0.35);
        pavilion(kit, inn.x, inn.y, inn.z, size * 0.085);
        break;
      default: // broken spire
        brokenSpire(kit, out, size * 0.11, size * 1.25, rand);
        henge(s, ...local(inn), size * 0.2, 10);
    }
  });
  henge(main, 520, -300, 44, 12);
  henge(main, -470, 380, 38, 10);
  footprints.push([520, -300, 60], [-470, 380, 54]);

  const group = kitMeshes(kit);
  const columns = new THREE.InstancedMesh(pillar, MATERIALS.ivory, pillars.length);
  pillars.forEach((m, i) => columns.setMatrixAt(i, m));
  columns.castShadow = columns.receiveShadow = true;
  group.add(columns);
  return { group, footprints };
}

/** Ancient masonry half-swallowed by the hanging rock: galleries clinging to the cliff and inverted spires. */
export function buildUnderworks(main: Site): THREE.Group {
  const kit = new Kit();
  const rand = rng(1313);
  // Galleries at three depths; the rock's uneven wall buries some bays and exposes others.
  for (const [y, R, h, bays] of [[-230, 740, 92, 62], [-420, 590, 86, 50], [-680, 380, 78, 34]]) {
    arcade(kit, 0, y, 0, R, h, bays, 12, (i) => Math.sin(i * 0.55 + y) + rand() * 0.6 > -0.5);
  }
  // Spires that grew downward from the old city's foundations.
  for (let i = 0; i < 16; i++) {
    const a = rand() * Math.PI * 2, r = 150 + rand() * 520;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const hang = new Kit();
    spirelet(hang, 0, 0, 0, 13 + rand() * 9, 170 + rand() * 150);
    kit.addKit(hang, new THREE.Matrix4().makeTranslation(x, main.island.underY(x, z) + 34, z).multiply(flip));
  }
  return kitMeshes(kit, { ivory: "ancient", roof: "ancient" });
}
