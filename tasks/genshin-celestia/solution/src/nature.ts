import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GLSL_ATMOS } from "./atmos";
import { MATERIALS, solid } from "./materials";
import { RING_R, roadY, type Site } from "./ring";
import { boulderGeometry } from "./rock";
import type { Tick } from "./sky";
import { GLSL_NOISE, rng } from "./util";

/** Stylised round-canopy tree, one unit tall, palette baked into vertex colours. */
function treeGeometry(): THREE.BufferGeometry {
  const paint = (g: THREE.BufferGeometry, low: number, high: number) => {
    const p = g.attributes.position, col: number[] = [];
    const a = new THREE.Color(low), b = new THREE.Color(high), c = new THREE.Color();
    g.computeBoundingBox();
    const { min, max } = g.boundingBox!;
    for (let i = 0; i < p.count; i++) {
      c.copy(a).lerp(b, (p.getY(i) - min.y) / (max.y - min.y));
      col.push(c.r, c.g, c.b);
    }
    g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    g.deleteAttribute("uv");
    return g;
  };
  const blob = (x: number, y: number, z: number, r: number) =>
    paint(new THREE.IcosahedronGeometry(r, 1).scale(1, 0.82, 1).translate(x, y, z), 0x3f8f3c, 0xa6dc5c);
  const trunk = paint(new THREE.CylinderGeometry(0.05, 0.085, 0.5, 5).toNonIndexed().translate(0, 0.25, 0), 0x6d5138, 0x8a6a48);
  return mergeGeometries([trunk, blob(0, 0.66, 0, 0.33), blob(0.21, 0.54, 0.06, 0.23), blob(-0.19, 0.55, -0.1, 0.25), blob(0.02, 0.86, 0.03, 0.2)]);
}

/** Groves on a site. `clear` rejects spots that are paved, built on or crossed by a road. */
function grove(s: Site, count: number, rand: () => number, clear: (x: number, z: number) => boolean, out: THREE.Matrix4[]): void {
  const R = s.island.spec.radius;
  const q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  // Trees gather around a few centres so they read as copses, not noise.
  const centres = Array.from({ length: Math.max(2, Math.round(count / 9)) }, () => {
    const a = rand() * Math.PI * 2, r = R * (0.25 + rand() * 0.55);
    return [Math.cos(a) * r, Math.sin(a) * r];
  });
  for (let i = 0, tries = 0; i < count && tries < count * 20; tries++) {
    const [cx, cz] = centres[Math.floor(rand() * centres.length)];
    const x = cx + (rand() - 0.5) * R * 0.34, z = cz + (rand() - 0.5) * R * 0.34;
    if (Math.hypot(x, z) > s.island.rim(Math.atan2(z, x)) * 0.9 || !clear(x, z)) continue;
    const h = 30 + rand() * 26;
    out.push(new THREE.Matrix4().compose(s.at(x, z, -1), q.setFromAxisAngle(up, rand() * 6.3), new THREE.Vector3(h * (0.9 + rand() * 0.3), h, h * (0.9 + rand() * 0.3))));
    i++;
  }
}

const WATERFALL_MATERIAL = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  uniforms: { uTime: { value: 0 } },
  vertexShader: /* glsl */ `
varying vec2 vUv;
varying vec3 vToFrag;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vToFrag = w.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,
  fragmentShader: /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying vec3 vToFrag;
${GLSL_NOISE}
${GLSL_ATMOS}
void main() {
  float fall = 1.0 - vUv.y;
  float streak = vnoise(vec2(vUv.x * 10.0, vUv.y * 5.0 + uTime * 0.55));
  float foam = vnoise(vec2(vUv.x * 26.0, vUv.y * 22.0 + uTime * 1.3));
  float a = (0.5 + 0.5 * streak) * smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
  // The water never lands: it thins into mist long before the cloud sea.
  a *= 1.0 - smoothstep(0.35, 1.0, fall);
  vec3 col = mix(vec3(0.60, 0.86, 1.0), vec3(1.0), clamp(foam * 0.7 + fall * 0.6, 0.0, 1.0)) * 1.15;
  gl_FragColor = vec4(atmosphere(col, vToFrag, cameraPosition.y), a * 0.92);
}`,
});

/** A ribbon of water pouring off the rim at `theta`, plus the pool that feeds it. */
function waterfall(s: Site, theta: number, width: number, height: number): THREE.Group {
  const group = new THREE.Group();
  const g = new THREE.PlaneGeometry(width, height, 6, 24).translate(0, -height / 2, 0);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const v = -p.getY(i) / height;
    // Leaps outward, then spreads as it falls.
    p.setX(i, p.getX(i) * (1 + 1.6 * v));
    p.setZ(i, width * 1.4 * (1 - (1 - v) * (1 - v)) + 4);
  }
  const fall = new THREE.Mesh(g, WATERFALL_MATERIAL);
  const c = Math.cos(theta), sn = Math.sin(theta), r = s.island.rim(theta);
  fall.position.copy(s.at(c * r * 0.985, sn * r * 0.985, 2));
  fall.rotation.y = Math.PI / 2 - theta;
  fall.renderOrder = 10;
  // A stone-rimmed basin and the channel that carries its overflow to the edge (local x = outward).
  const reach = width * 2.4;
  const water = solid(mergeGeometries([
    new THREE.CircleGeometry(width * 1.25, 24).rotateX(-Math.PI / 2),
    new THREE.PlaneGeometry(reach, width * 0.8).rotateX(-Math.PI / 2).translate(reach / 2, 0, 0),
  ]), "water");
  water.castShadow = false;
  const kerb = solid(new THREE.TorusGeometry(width * 1.25, width * 0.09, 6, 28).rotateX(Math.PI / 2), "ivory");
  const basin = new THREE.Group().add(water, kerb);
  basin.position.copy(s.at(c * (r - reach), sn * (r - reach), 2.4));
  basin.rotation.y = -theta;
  group.add(fall, basin);
  return group;
}

export interface NaturePlan {
  main: Site;
  islets: Site[];
  /** Local-space test for ground that must stay free of trees on the main island. */
  mainClear: (x: number, z: number) => boolean;
}

export function buildNature({ main, islets, mainClear }: NaturePlan): { group: THREE.Group; tick: Tick; waterfalls: number } {
  const group = new THREE.Group();
  const rand = rng(909);

  const trees: THREE.Matrix4[] = [];
  grove(main, 190, rand, mainClear, trees);
  // Keep the road corridor through each islet open.
  for (const s of islets) grove(s, Math.round(s.island.spec.radius / 11), rand, (x, z) => {
    const a = Math.atan2(s.origin.z, s.origin.x);
    return Math.abs(x * Math.cos(a) + z * Math.sin(a)) > 34;
  }, trees);
  const forest = new THREE.InstancedMesh(treeGeometry(), MATERIALS.painted, trees.length);
  const tint = new THREE.Color();
  trees.forEach((m, i) => {
    forest.setMatrixAt(i, m);
    forest.setColorAt(i, tint.setHSL(0.26 + rand() * 0.06, 0.25, 0.86 + rand() * 0.14));
  });
  forest.castShadow = forest.receiveShadow = true;
  group.add(forest);

  // Suspended waterfalls: three off the main island, one each off the larger islets.
  const falls: [Site, number, number, number][] = [
    [main, 2.62, 46, 900], [main, 0.55, 34, 760], [main, 4.3, 38, 820],
    [islets[2], 2.2, 24, 520], [islets[6], 3.9, 22, 480], [islets[0], 5.6, 20, 430], [islets[4], 2.9, 20, 440],
  ];
  for (const [s, theta, w, h] of falls) group.add(waterfall(s, theta, w, h));

  // Drifting boulders: a loose belt around the ring and shards under every island.
  const mossy: THREE.Matrix4[] = [], bare: THREE.Matrix4[] = [];
  const q = new THREE.Quaternion(), e = new THREE.Euler();
  const rock = (x: number, y: number, z: number, size: number, turf = size > 34) => {
    // Shards tumble freely; only upright boulders keep their turf.
    const tumble = turf ? 0.4 : 3;
    e.set((rand() - 0.5) * tumble, rand() * 6.3, (rand() - 0.5) * tumble);
    (turf ? mossy : bare).push(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q.setFromEuler(e), new THREE.Vector3(size, size * (0.8 + rand() * 0.7), size)));
  };
  // Debris gathers along the ring and thins out away from it.
  for (let i = 0; i < 150; i++) {
    const a = rand() * Math.PI * 2, r = RING_R + (rand() + rand() - 1) * 560;
    rock(Math.cos(a) * r, roadY(a) - 60 - rand() * rand() * 620, Math.sin(a) * r, 5 + Math.pow(rand(), 4) * 70);
  }
  for (const s of [main, ...islets]) {
    const { radius, depth } = s.island.spec;
    for (let i = 0; i < 14; i++) {
      const a = rand() * Math.PI * 2, r = radius * (0.2 + rand() * 0.9);
      rock(s.origin.x + Math.cos(a) * r, s.origin.y - depth * (0.45 + rand() * 0.75), s.origin.z + Math.sin(a) * r, radius * (0.03 + rand() * 0.07), false);
    }
  }
  // Far-off sister islands, mostly haze: the outermost layer of the vista.
  const far = Array.from({ length: 9 }, () => {
    const a = rand() * Math.PI * 2, r = 5200 + rand() * 9000, k = 0.8 + rand() * 1.6;
    return new THREE.Matrix4().compose(new THREE.Vector3(Math.cos(a) * r, -1300 + rand() * 1700, Math.sin(a) * r), q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * 6.3), new THREE.Vector3(k, k, k));
  });
  for (const geometry of [islets[2].island.top, islets[2].island.bottom]) {
    const sisters = new THREE.InstancedMesh(geometry, MATERIALS.painted, far.length);
    far.forEach((m, i) => sisters.setMatrixAt(i, m));
    group.add(sisters);
  }
  for (const [list, geometry] of [[mossy, boulderGeometry(5, true)], [bare, boulderGeometry(9, false)]] as const) {
    const boulders = new THREE.InstancedMesh(geometry, MATERIALS.painted, list.length);
    list.forEach((m, i) => boulders.setMatrixAt(i, m));
    boulders.castShadow = boulders.receiveShadow = true;
    group.add(boulders);
  }

  return { group, waterfalls: falls.length, tick: (t) => (WATERFALL_MATERIAL.uniforms.uTime.value = t) };
}
