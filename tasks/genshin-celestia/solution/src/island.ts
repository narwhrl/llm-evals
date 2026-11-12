import * as THREE from "three";
import { fbm, edgeFactor, mulberry32 } from "./noise";
import type { Mats } from "./palette";

export interface IslandInfo {
  group: THREE.Group;
  // world-space top surface height at a local (x,z) inside the island
  topAt: (x: number, z: number) => number;
  radius: number;
}

interface IslandOpts {
  radius: number;
  depth: number;
  topY?: number;
  plateau: number; // 0..1 flattens the interior
  irregular: number;
  seed: number;
  withGrass?: boolean;
  skirt?: boolean; // ivory ledge ring under the rim, used on islets
}

// Build the grass top surface: an irregular disc with a flattened interior.
function buildTop(opts: IslandOpts, mats: Mats): { mesh: THREE.Mesh; topAt: (x: number, z: number) => number } {
  const seg = 72;
  const rings = 7;
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const phase = opts.seed * 1.618;

  const topAt = (x: number, z: number) => {
    const r = Math.hypot(x, z) / opts.radius;
    const flat = opts.plateau;
    const dome = (1 - Math.min(1, r * r)) * opts.radius * 0.06 * (1 - flat);
    const n = fbm(x * 0.02 + opts.seed, z * 0.02, 3) * opts.radius * 0.05 * (1 - flat * 0.8);
    const rimDrop = Math.pow(Math.max(0, r - 0.82) / 0.18, 2) * opts.radius * 0.05;
    return (opts.topY ?? 0) + dome + n - rimDrop;
  };

  // ring 0 = single center vertex at index 0, then `seg` vertices per ring
  positions.push(0, topAt(0, 0), 0);
  normals.push(0, 1, 0);
  for (let ring = 1; ring <= rings; ring++) {
    const rt = ring / rings;
    for (let i = 0; i < seg; i++) {
      const theta = (i / seg) * Math.PI * 2;
      const rr = opts.radius * rt * edgeFactor(theta, 5, opts.irregular, phase);
      const x = Math.cos(theta) * rr;
      const z = Math.sin(theta) * rr;
      positions.push(x, topAt(x, z), z);
      normals.push(0, 1, 0);
    }
  }
  const at = (ring: number, i: number) => (ring === 0 ? 0 : 1 + (ring - 1) * seg + ((i % seg + seg) % seg));
  for (let i = 0; i < seg; i++) {
    indices.push(at(0, 0), at(1, i + 1), at(1, i));
  }
  for (let ring = 1; ring < rings; ring++) {
    for (let i = 0; i < seg; i++) {
      const a = at(ring, i);
      const b = at(ring, i + 1);
      const c = at(ring + 1, i);
      const d = at(ring + 1, i + 1);
      indices.push(a, d, c, a, b, d);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  g.setIndex(indices);
  g.computeVertexNormals();

  const mesh = new THREE.Mesh(g, opts.withGrass === false ? mats.stone : mats.grass);
  mesh.receiveShadow = true;
  return { mesh, topAt };
}

// Rough inverted rock cone under the top surface.
function buildRock(opts: IslandOpts, mats: Mats, topAt: (x: number, z: number) => number): THREE.Mesh {
  const seg = 60;
  const levels = 7;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const phase = opts.seed * 1.618;
  const rng = mulberry32(opts.seed * 977 + 13);
  const levelSquash: number[] = [];
  for (let l = 0; l <= levels; l++) levelSquash.push(0.75 + rng() * 0.5);

  const cTop = new THREE.Color("#a89a85");
  const cMid = new THREE.Color("#7a6b5a");
  const cTip = new THREE.Color("#524942");

  // top ring follows the surface edge, deeper rings contract toward a tip
  const topY = opts.topY ?? 0;
  for (let l = 0; l <= levels; l++) {
    const t = l / levels;
    const shrink = Math.pow(1 - t, 1.35) * (l === 0 ? 1 : levelSquash[l]);
    const y = topY - opts.depth * Math.pow(t, 1.15) - (l === 0 ? 0 : fbm(l * 3.1, opts.seed) * opts.depth * 0.06);
    for (let i = 0; i < seg; i++) {
      const theta = (i / seg) * Math.PI * 2;
      const jag = 1 + fbm(Math.cos(theta) * 3 + l * 5 + opts.seed, Math.sin(theta) * 3, 3) * 0.22;
      const rr =
        l === 0
          ? opts.radius * edgeFactor(theta, 5, opts.irregular, phase)
          : Math.max(0.01, opts.radius * shrink * edgeFactor(theta, 5, opts.irregular, phase) * jag);
      const x = Math.cos(theta) * rr;
      const z = Math.sin(theta) * rr;
      const yy = l === 0 ? topAt(x, z) - 0.4 : y;
      positions.push(x, yy, z);
      const mix = t < 0.5 ? cTop.clone().lerp(cMid, t * 2) : cMid.clone().lerp(cTip, (t - 0.5) * 2);
      const shade = 0.9 + hashJag(theta, l) * 0.2;
      colors.push(mix.r * shade, mix.g * shade, mix.b * shade);
    }
  }
  // bottom tip vertex
  positions.push(fbm(opts.seed, 3) * opts.radius * 0.15, topY - opts.depth * 1.12, fbm(7, opts.seed) * opts.radius * 0.15);
  colors.push(cTip.r, cTip.g, cTip.b);
  const tipIndex = positions.length / 3 - 1;

  const at = (l: number, i: number) => l * seg + ((i % seg + seg) % seg);
  for (let l = 0; l < levels; l++) {
    for (let i = 0; i < seg; i++) {
      const a = at(l, i);
      const b = at(l, i + 1);
      const c = at(l + 1, i);
      const d = at(l + 1, i + 1);
      indices.push(a, c, d, a, d, b);
    }
  }
  for (let i = 0; i < seg; i++) {
    indices.push(at(levels, i), tipIndex, at(levels, i + 1));
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  g.setIndex(indices);
  g.computeVertexNormals();

  const mat = mats.cliff.clone();
  mat.vertexColors = true;
  mat.color = new THREE.Color("#ffffff");
  const mesh = new THREE.Mesh(g, mat);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh;
}

function hashJag(theta: number, l: number): number {
  const s = Math.sin(theta * 12.9898 + l * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

// Ivory ledge + hanging parapet under the island rim (the Celestia edge trim).
function buildSkirt(opts: IslandOpts, mats: Mats, topAt: (x: number, z: number) => number): THREE.Group {
  const grp = new THREE.Group();
  const seg = 64;
  const phase = opts.seed * 1.618;
  const topY = opts.topY ?? 0;

  const edgePoint = (i: number, scale: number, drop: number) => {
    const theta = (i / seg) * Math.PI * 2;
    const rr = opts.radius * edgeFactor(theta, 5, opts.irregular, phase) * scale;
    const x = Math.cos(theta) * rr;
    const z = Math.sin(theta) * rr;
    return new THREE.Vector3(x, (drop >= 0 ? topAt(x / scale, z / scale) : topY) - drop, z);
  };

  // ledge: ring band just below the rim
  const ledgeGeo = new THREE.BufferGeometry();
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= seg; i++) {
    const outer = edgePoint(i, 1.015, 0.6);
    const inner = edgePoint(i, 0.86, 0.9);
    pos.push(outer.x, outer.y, outer.z, inner.x, inner.y, inner.z);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 2;
    idx.push(a, a + 2, a + 3, a, a + 3, a + 1);
  }
  ledgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  ledgeGeo.setIndex(idx);
  ledgeGeo.computeVertexNormals();
  const ledge = new THREE.Mesh(ledgeGeo, mats.ivoryDark);
  ledge.material.side = THREE.DoubleSide;
  grp.add(ledge);

  // hanging balustrade stubs
  const stubGeo = new THREE.BoxGeometry(opts.radius * 0.05, opts.radius * 0.1, opts.radius * 0.05);
  const stubs = new THREE.InstancedMesh(stubGeo, mats.ivory, seg / 2);
  const m = new THREE.Matrix4();
  let n = 0;
  for (let i = 0; i < seg; i += 2) {
    const p = edgePoint(i, 0.97, opts.radius * 0.06);
    m.makeTranslation(p.x, p.y, p.z);
    stubs.setMatrixAt(n++, m);
  }
  stubs.count = n;
  grp.add(stubs);
  return grp;
}

export function createIsland(opts: IslandOpts, mats: Mats): IslandInfo {
  const group = new THREE.Group();
  const { mesh: top, topAt } = buildTop(opts, mats);
  const rock = buildRock(opts, mats, topAt);
  group.add(top, rock);
  if (opts.skirt) group.add(buildSkirt(opts, mats, topAt));
  return { group, topAt, radius: opts.radius };
}
