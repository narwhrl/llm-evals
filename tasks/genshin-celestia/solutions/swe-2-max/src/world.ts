import * as THREE from "three";
import { mulberry32 } from "./noise";
import { createIsland, type IslandInfo } from "./island";
import { createSanctum } from "./sanctum";
import {
  bridge, brokenBridge, colonnade, miniSpire, arcade, gateTower,
} from "./architecture";
import {
  scatterTrees, waterfall, floatingDebris, ruinSpire, ringRoad, pavilion, ruinedColonnade, embeddedRuin, watchPost, archGate,
} from "./details";
import type { Mats } from "./palette";

export interface BuiltWorld {
  group: THREE.Group;
  animated: {
    rings: THREE.Object3D[];
    glow: THREE.Mesh;
    falls: THREE.ShaderMaterial[];
    debris: THREE.Object3D[];
  };
}

interface Islet {
  angle: number;
  dist: number;
  radius: number;
  dy: number;
  seed: number;
}

export function buildWorld(mats: Mats): BuiltWorld {
  const group = new THREE.Group();
  const animated: BuiltWorld["animated"] = { rings: [], glow: null as unknown as THREE.Mesh, falls: [], debris: [] };
  const rng = mulberry32(20251112);

  // ============ CENTRAL ISLAND ============
  const central = createIsland(
    { radius: 360, depth: 640, plateau: 0.55, irregular: 0.26, seed: 11, withGrass: true },
    mats,
  );
  group.add(central.group);

  // main sanctum spire slightly off-center
  const sanctum = createSanctum(mats, 1.18);
  sanctum.group.position.set(24, central.topAt(24, -10) - 1, -10);
  group.add(sanctum.group);
  animated.rings.push(...sanctum.rings);
  animated.glow = sanctum.glow;

  // secondary white structures around the spire base
  const plazaY = central.topAt(24, -10);
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(150, 160, 6, 28), mats.ivoryDark);
  plaza.position.set(24, plazaY - 2.5, -10);
  plaza.receiveShadow = true;
  group.add(plaza);

  // ring of colonnade around the sanctum base
  const peristyle = new THREE.Mesh(new THREE.TorusGeometry(128, 2.6, 6, 40), mats.ivory);
  peristyle.rotation.x = Math.PI / 2;
  peristyle.position.set(24, plazaY + 16, -10);
  group.add(peristyle);
  const periCols = new THREE.InstancedMesh(new THREE.CylinderGeometry(1.5, 1.8, 15, 6), mats.ivory, 26);
  const pm = new THREE.Matrix4();
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    pm.makeTranslation(24 + Math.cos(a) * 128, plazaY + 7.5, -10 + Math.sin(a) * 128);
    periCols.setMatrixAt(i, pm);
  }
  periCols.castShadow = true;
  group.add(periCols);

  // satellite buildings on the meadow: watch posts, pavilions, mini spires
  const sat = [
    { b: watchPost(mats, 46), x: -140, z: 60 },
    { b: watchPost(mats, 38), x: 180, z: 90 },
    { b: pavilion(mats, 16, 14), x: -90, z: -150 },
    { b: pavilion(mats, 13, 11), x: 160, z: -140 },
    { b: miniSpire(mats, 90, 7), x: -190, z: -40 },
    { b: miniSpire(mats, 70, 6), x: 60, z: 190 },
    { b: miniSpire(mats, 55, 5), x: -50, z: 210 },
    { b: gateTower(mats, 60, 14), x: 200, z: 30 },
    { b: archGate(mats, 22, 18), x: -120, z: 130 },
  ];
  for (const s of sat) {
    s.b.position.set(s.x, central.topAt(s.x, s.z) - 0.5, s.z);
    s.b.rotation.y = rng() * Math.PI * 2;
    group.add(s.b);
  }

  // low arcade walls marking districts
  const arc1 = arcade(mats, 60, 0.8, 16, 2);
  arc1.position.set(-40, central.topAt(-40, 120) - 0.5, 120);
  arc1.rotation.y = 0.6;
  group.add(arc1);
  const arc2 = arcade(mats, 48, 0.6, 14, 2);
  arc2.position.set(140, central.topAt(140, -60) - 0.5, -60);
  arc2.rotation.y = -1.2;
  group.add(arc2);

  // trees on the meadow
  scatterTrees(mats, group, central.topAt, 320, 110, 555, 0.2);

  // waterfalls off the main island rim (three: one large, two small)
  const falls: Array<[number, number, number, number]> = [
    [0.5, 30, 420, 22],
    [2.4, 18, 300, 12],
    [4.4, 14, 240, 9],
  ];
  for (const [a, rOff, len, w] of falls) {
    const rr = 320 * 0.98;
    const x = Math.cos(a) * rr;
    const z = Math.sin(a) * rr;
    const topY = central.topAt(x * 0.92, z * 0.92) + 4;
    const f = waterfall(new THREE.Vector3(x * 1.02, topY, z * 1.02), len, w);
    f.mesh.rotation.y = Math.atan2(z, x) + Math.PI / 2;
    group.add(f.mesh);
    animated.falls.push(f.mat);
    // foam-ish glow at top
    const lip = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.7, w * 0.9, 3, 10), mats.water);
    lip.position.set(x * 1.0, topY - 1.5, z * 1.0);
    group.add(lip);
    void rOff;
  }

  // ancient structures embedded in the inverted cliff face, faintly visible
  for (let i = 0; i < 6; i++) {
    const a = rng() * Math.PI * 2;
    const rr = 320 * (0.45 + rng() * 0.4);
    const ruin = embeddedRuin(mats, 26 + rng() * 26, 18 + rng() * 22);
    ruin.position.set(Math.cos(a) * rr, -140 - rng() * 220, Math.sin(a) * rr);
    ruin.lookAt(0, ruin.position.y, 0);
    ruin.rotateY(Math.PI / 2);
    group.add(ruin);
  }
  // a few hanging roots/spikes under the island
  for (let i = 0; i < 10; i++) {
    const a = rng() * Math.PI * 2;
    const rr = 320 * (0.3 + rng() * 0.55);
    const spike = new THREE.Mesh(new THREE.ConeGeometry(4 + rng() * 7, 40 + rng() * 90, 5), mats.stoneDark);
    spike.position.set(Math.cos(a) * rr, -300 - rng() * 120, Math.sin(a) * rr);
    spike.rotation.x = Math.PI;
    spike.castShadow = true;
    group.add(spike);
  }

  // ============ RING OF ISLETS ============
  // 8 islets at varied distance/size/height — the signature ring.
  const isletDefs: Islet[] = [
    { angle: 0.15, dist: 760, radius: 120, dy: -30, seed: 21 },
    { angle: 0.95, dist: 690, radius: 92, dy: 24, seed: 22 },
    { angle: 1.8, dist: 800, radius: 138, dy: -58, seed: 23 },
    { angle: 2.55, dist: 720, radius: 84, dy: 40, seed: 24 },
    { angle: 3.3, dist: 830, radius: 150, dy: -12, seed: 25 },
    { angle: 4.05, dist: 700, radius: 96, dy: 60, seed: 26 },
    { angle: 4.8, dist: 790, radius: 112, dy: -40, seed: 27 },
    { angle: 5.6, dist: 740, radius: 128, dy: 18, seed: 28 },
  ];

  const isletInfos: { info: IslandInfo; def: Islet; pos: THREE.Vector3 }[] = [];
  for (const d of isletDefs) {
    const pos = new THREE.Vector3(Math.cos(d.angle) * d.dist, d.dy, Math.sin(d.angle) * d.dist);
    const info = createIsland(
      { radius: d.radius, depth: d.radius * 1.7, plateau: 0.5, irregular: 0.26, seed: d.seed, withGrass: true, skirt: true },
      mats,
    );
    info.group.position.copy(pos);
    group.add(info.group);
    isletInfos.push({ info, def: d, pos });

    const topAtW = (x: number, z: number) => pos.y + info.topAt(x - pos.x, z - pos.z);

    // each islet gets a landmark cluster
    const kind = Math.floor(rng() * 4);
    const cx = pos.x;
    const cz = pos.z;
    if (kind === 0) {
      const t = miniSpire(mats, 60 + rng() * 40, 7);
      t.position.set(cx, topAtW(cx, cz) - 0.5, cz);
      group.add(t);
      const t2 = miniSpire(mats, 34 + rng() * 20, 4.5);
      t2.position.set(cx + d.radius * 0.4, topAtW(cx + d.radius * 0.4, cz + 10), cz + 10);
      group.add(t2);
    } else if (kind === 1) {
      const p = pavilion(mats, d.radius * 0.22, 14);
      p.position.set(cx, topAtW(cx, cz) - 0.5, cz);
      group.add(p);
      const ruin = ruinSpire(mats, 34 + rng() * 18, 6, rng);
      ruin.position.set(cx - d.radius * 0.4, topAtW(cx - d.radius * 0.4, cz + 20) - 1, cz + 20);
      group.add(ruin);
    } else if (kind === 2) {
      const rc = ruinedColonnade(mats, d.radius * 0.9, 9, rng);
      rc.position.set(cx - d.radius * 0.2, topAtW(cx, cz) - 0.5, cz);
      rc.rotation.y = rng() * Math.PI;
      group.add(rc);
    } else {
      const gt = gateTower(mats, 44 + rng() * 20, 12);
      gt.position.set(cx, topAtW(cx, cz) - 0.5, cz);
      group.add(gt);
    }
    scatterTrees(mats, group, topAtW, d.radius, 10 + Math.floor(rng() * 16), d.seed * 31, 0.35);

    // small waterfall off one edge
    const fa = rng() * Math.PI * 2;
    const fx = cx + Math.cos(fa) * d.radius * 0.95;
    const fz = cz + Math.sin(fa) * d.radius * 0.95;
    const f = waterfall(new THREE.Vector3(fx, topAtW(cx, cz) + 3, fz), 120 + rng() * 160, 6 + rng() * 8);
    f.mesh.rotation.y = fa + Math.PI / 2;
    group.add(f.mesh);
    animated.falls.push(f.mat);

    floatingDebris(mats, group, pos, d.radius, 5 + Math.floor(rng() * 6), d.seed * 77, animated.debris);
  }

  // ============ CONNECTIVE RING: bridges + ring road arcs ============
  // bridge from central island out to each islet (radial spokes) — a few grand, one broken
  const bridgeWidth = 16;
  const spokeIdx = new Set([0, 2, 4, 6]);
  isletInfos.forEach(({ def }, i) => {
    if (!spokeIdx.has(i)) return;
    const a = def.angle;
    const inner = new THREE.Vector3(Math.cos(a) * 310, central.topAt(Math.cos(a) * 300, Math.sin(a) * 300) - 4, Math.sin(a) * 310);
    const outer = new THREE.Vector3(Math.cos(a) * (def.dist - def.radius * 0.85), def.dy + def.radius * 0.25, Math.sin(a) * (def.dist - def.radius * 0.85));
    inner.y = Math.max(inner.y, -20);
    const broken = i === 2;
    const b = broken ? brokenBridge(mats, inner, outer, bridgeWidth) : bridge(mats, inner, outer, bridgeWidth, 36 + rng() * 24);
    group.add(b);
  });

  // ring road arcs between neighboring islets (chordal bridges) — completes the ring
  for (let i = 0; i < isletDefs.length; i++) {
    const a = isletDefs[i];
    const b = isletDefs[(i + 1) % isletDefs.length];
    // skip one chord where the broken spoke is, to vary connectivity
    if (i === 2) continue;
    const pa = new THREE.Vector3(
      Math.cos(a.angle) * (a.dist + a.radius * 0.2),
      a.dy + a.radius * 0.22,
      Math.sin(a.angle) * (a.dist + a.radius * 0.2),
    );
    const pb = new THREE.Vector3(
      Math.cos(b.angle) * (b.dist + b.radius * 0.2),
      b.dy + b.radius * 0.22,
      Math.sin(b.angle) * (b.dist + b.radius * 0.2),
    );
    const chord = bridge(mats, pa, pb, 12, 30 + rng() * 22);
    group.add(chord);

    // every other chord gets a mid-arc colonnade fragment as a floating waystation
    if (i % 2 === 0) {
      const mid = pa.clone().add(pb).multiplyScalar(0.5);
      const col = colonnade(mats, 40, 9, 6);
      col.position.copy(mid);
      col.position.y -= 6;
      col.rotation.y = Math.atan2(pb.z - pa.z, pb.x - pa.x);
      group.add(col);
    }
  }

  // inner ring road ON the main island around the sanctum (visible road band)
  const road = new THREE.Mesh(new THREE.TorusGeometry(215, 6.5, 4, 80), mats.ivoryDark);
  road.rotation.x = Math.PI / 2;
  road.position.y = central.topAt(215, 0) + 1.2;
  road.scale.y = 1;
  group.add(road);
  // pale gold inlay on the road
  const inlay = new THREE.Mesh(new THREE.TorusGeometry(215, 2.4, 4, 80), mats.gold);
  inlay.rotation.x = Math.PI / 2;
  inlay.position.y = road.position.y + 0.9;
  group.add(inlay);

  // ring-road arcs on a few islet rims
  for (const { info, def, pos } of isletInfos) {
    if (def.seed % 2 === 0) continue;
    const arc = ringRoad(mats, def.radius * 0.62, rng() * Math.PI, Math.PI * (0.5 + rng() * 0.5));
    arc.position.set(pos.x, pos.y + info.topAt(0, 0) - 0.5, pos.z);
    group.add(arc);
  }

  // extra debris field between islands
  floatingDebris(mats, group, new THREE.Vector3(0, -40, 0), 520, 34, 4242, animated.debris);

  // a couple of lone far islets for depth
  for (const [x, y, z, r, s] of [
    [1500, -140, -900, 60, 61],
    [-1350, -90, 1100, 74, 62],
  ] as const) {
    const far = createIsland({ radius: r, depth: r * 1.6, plateau: 0.5, irregular: 0.3, seed: s, withGrass: true, skirt: true }, mats);
    far.group.position.set(x, y, z);
    group.add(far.group);
    const t = miniSpire(mats, 50, 5);
    t.position.set(x, y + far.topAt(0, 0), z);
    group.add(t);
  }

  return { group, animated };
}
