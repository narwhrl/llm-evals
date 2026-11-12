import * as THREE from "three";
import { arcade, finial, GOLD, IVORY, ROOF, spirelet, spireRoof, tier } from "./arch";
import { kitMeshes, MATERIALS, solid } from "./materials";
import type { Tick } from "./sky";
import { Kit, rng, trs } from "./util";

/** The sanctum is modelled at unit scale and enlarged to dominate the island. */
const SCALE = 1.16;
/** Radius of the paved plaza the sanctum stands on. */
export const PLAZA = 412 * SCALE;

/** The central sanctum: terraces, a six-storey white spire, its needle and the gold armillary. */
export function buildSanctum(): { group: THREE.Group; tick: Tick; rings: number } {
  const kit = new Kit();
  const cyl = (rt: number, rb: number, h: number, seg = 48) => new THREE.CylinderGeometry(rt, rb, h, seg);

  // Paved plaza, then stepped terraces with gold edging (kept just under each tread to avoid coplanar faces).
  kit.add(IVORY, cyl(410, 410, 3, 72), trs(0, -0.5, 0));
  let y = 1;
  for (const [r, h] of [[330, 9], [292, 10], [256, 12]]) {
    kit.add(IVORY, cyl(r, r + 7, h), trs(0, y + h / 2, 0));
    kit.add(GOLD, cyl(r + 1.8, r + 1.8, 1.6), trs(0, y + h - 1.2, 0));
    y += h;
  }

  // A broad podium, then five diminishing storeys of pointed arcades.
  const storeys: [number, number, number][] = [[206, 98, 26], [150, 128, 20], [114, 142, 16], [84, 142, 14], [60, 128, 12], [40, 104, 10]];
  const tops: number[] = [];
  for (const [R, h, bays] of storeys) {
    y = tier(kit, y, R, h, bays);
    tops.push(y);
  }
  // Needle rising through the armillary.
  kit.add(ROOF, spireRoof(46, 70, 16), trs(0, y, 0));
  kit.add(IVORY, spireRoof(30, 285, 12), trs(0, y + 8, 0));
  const needleTop = y + 293;
  finial(kit, 0, needleTop - 14, 0, 5);

  // Flanking towers tied to the spire by flying arches.
  const brace = new THREE.TorusGeometry(57, 5, 6, 18, Math.PI);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const major = i % 2 === 0;
    const r = major ? 266 : 304, h = major ? 350 : 215;
    spirelet(kit, Math.cos(a) * r, major ? 19 : 9, Math.sin(a) * r, major ? 17 : 13, h);
    if (major) kit.add(IVORY, brace, trs(Math.cos(a) * 208, tops[0] + 52, Math.sin(a) * 208, -a));
  }
  // Rings of lesser spires on the podium roof and the terrace above it.
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    spirelet(kit, Math.cos(a) * 180, tops[0], Math.sin(a) * 180, 10, 200);
    if (i % 2) spirelet(kit, Math.cos(a) * 131, tops[1], Math.sin(a) * 131, 8, 170);
  }

  // Gold inlays on the plaza and a partly fallen ring of arches around it.
  for (const r of [352, 380]) kit.add(GOLD, new THREE.TorusGeometry(r, 2.2, 4, 96).rotateX(Math.PI / 2), trs(0, 1.4, 0));
  const rand = rng(11);
  arcade(kit, 0, 0, 0, 398, 56, 50, 9, (i) => Math.sin(i * 0.9) + rand() * 0.8 > -0.25);
  // Lantern gallery at the needle's foot.
  arcade(kit, 0, y, 0, 30, 34, 8, 4);

  const group = kitMeshes(kit);
  group.scale.setScalar(SCALE);

  // --- the armillary: interlocking gold bands slowly tumbling around a radiant core ---
  const armillary = new THREE.Group();
  armillary.position.y = y + 150;
  const spinners: { mesh: THREE.Object3D; speed: number }[] = [];
  const bands: [number, number, number, number][] = [
    // radius, tilt x, tilt z, speed
    [212, 1.32, 0.12, 0.05],
    [188, 0.42, 0.55, -0.07],
    [164, -0.62, 1.05, 0.09],
    [140, 1.05, -0.75, -0.11],
    [116, 0.1, 0.3, 0.14],
  ];
  for (const [r, tx, tz, speed] of bands) {
    const holder = new THREE.Group();
    holder.rotation.set(tx, 0, tz);
    // Flattened tube = a broad astrolabe band; a bead rides on each ring.
    const band = solid(new THREE.TorusGeometry(r, 3.7, 8, 120).scale(1, 1, 2.6), "armillary");
    const bead = solid(new THREE.SphereGeometry(11, 12, 8).translate(r, 0, 0), "armillary");
    band.add(bead);
    holder.add(band);
    armillary.add(holder);
    spinners.push({ mesh: band, speed });
  }
  // Fixed equatorial band tying the device to the needle.
  armillary.add(solid(new THREE.TorusGeometry(230, 3.6, 6, 120).scale(1, 1, 2).rotateX(Math.PI / 2), "armillary"));
  armillary.add(new THREE.Mesh(new THREE.OctahedronGeometry(17, 1), MATERIALS.core));
  group.add(armillary);

  return {
    group,
    rings: bands.length + 1,
    tick: (t) => {
      for (const s of spinners) s.mesh.rotation.y = t * s.speed;
    },
  };
}
