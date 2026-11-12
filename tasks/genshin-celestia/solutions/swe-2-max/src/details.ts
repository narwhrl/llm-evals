import * as THREE from "three";
import { mulberry32 } from "./noise";
import type { Mats } from "./palette";
import { colonnade, miniSpire, gateTower } from "./architecture";

// Tree: low-poly trunk + layered blobby canopy, optionally teal (celestial tree).
export function tree(mats: Mats, rng: () => number, teal = false): THREE.Group {
  const g = new THREE.Group();
  const h = 10 + rng() * 14;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.05, h * 0.08, h * 0.45, 6), mats.trunk);
  trunk.position.y = h * 0.22;
  trunk.castShadow = true;
  g.add(trunk);
  const leafMat = teal ? mats.leafTeal : rng() > 0.5 ? mats.leafA : mats.leafB;
  const blobs = 2 + Math.floor(rng() * 3);
  for (let i = 0; i < blobs; i++) {
    const r = h * (0.32 - i * 0.07);
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), leafMat);
    blob.position.set((rng() - 0.5) * h * 0.2, h * 0.45 + i * h * 0.24, (rng() - 0.5) * h * 0.2);
    blob.castShadow = true;
    g.add(blob);
  }
  const top = new THREE.Mesh(new THREE.ConeGeometry(h * 0.18, h * 0.3, 7), leafMat);
  top.position.y = h * 0.45 + blobs * h * 0.24;
  top.castShadow = true;
  g.add(top);
  return g;
}

export function scatterTrees(
  mats: Mats,
  parent: THREE.Group,
  topAt: (x: number, z: number) => number,
  radius: number,
  count: number,
  seed: number,
  tealRatio = 0.25,
) {
  const rng = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const a = rng() * Math.PI * 2;
    const r = Math.sqrt(rng()) * radius * 0.8;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const t = tree(mats, rng, rng() < tealRatio);
    t.position.set(x, topAt(x, z) - 0.3, z);
    const s = 0.7 + rng() * 0.9;
    t.scale.setScalar(s);
    t.rotation.y = rng() * Math.PI * 2;
    parent.add(t);
  }
}

// Waterfall: additive-striped falling sheet from an island edge.
export function waterfall(from: THREE.Vector3, length: number, width: number): { mesh: THREE.Mesh; mat: THREE.ShaderMaterial } {
  const uniforms = {
    uTime: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uTime;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
      }
      void main() {
        float fall = vUv.y + uTime * 0.35;
        float n = noise(vec2(vUv.x * 6.0, fall * 10.0)) * 0.6 + noise(vec2(vUv.x * 18.0, fall * 26.0)) * 0.4;
        float streak = smoothstep(0.35, 0.75, n);
        float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
        float fadeOut = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.6, 1.0 - vUv.y);
        float a = (0.25 + streak * 0.6) * edge * fadeOut * 0.85;
        vec3 col = mix(vec3(0.75, 0.9, 1.0), vec3(1.0), streak * 0.5);
        gl_FragColor = vec4(col, a);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, length, 1, 12), mat);
  mesh.position.set(from.x, from.y - length / 2, from.z);
  return { mesh, mat };
}

// Floating rock debris drifting around islands.
export function floatingDebris(
  mats: Mats,
  parent: THREE.Group,
  center: THREE.Vector3,
  radius: number,
  count: number,
  seed: number,
  rocks: THREE.Object3D[],
) {
  const rng = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const a = rng() * Math.PI * 2;
    const r = radius * (1.15 + rng() * 0.9);
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(2.5 + rng() * 7, 0), mats.stoneDark);
    rock.position.set(center.x + Math.cos(a) * r, center.y + (rng() - 0.4) * 160, center.z + Math.sin(a) * r);
    rock.scale.y = 1.4 + rng() * 1.8;
    rock.rotation.set(rng() * 3, rng() * 3, rng() * 3);
    rock.castShadow = true;
    rock.userData.base = rock.position.clone();
    rock.userData.speed = 0.15 + rng() * 0.4;
    rock.userData.phase = rng() * Math.PI * 2;
    rock.userData.amp = 3 + rng() * 9;
    parent.add(rock);
    rocks.push(rock);
    // small grass cap on some rocks
    if (rng() > 0.55) {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2.4), mats.grass);
      cap.scale.copy(rock.scale).multiplyScalar(0.8);
      cap.position.y = rock.geometry.boundingSphere ? 0 : 0;
      cap.position.y = 2.4;
      rock.add(cap);
    }
    if (rng() > 0.7) {
      const shard = miniSpire(mats, 8 + rng() * 14, 1.6);
      shard.position.y = 3;
      shard.rotation.z = (rng() - 0.5) * 0.5;
      rock.add(shard);
    }
  }
}

// Ruined spire: a snapped tower with jagged top and tilt.
export function ruinSpire(mats: Mats, h: number, r: number, rng: () => number): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.8, r, h, 9), mats.ivoryDark);
  body.position.y = h / 2;
  body.castShadow = true;
  g.add(body);
  // jagged crown: few angled blocks
  const n = 4 + Math.floor(rng() * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const tooth = new THREE.Mesh(new THREE.ConeGeometry(r * 0.22, h * (0.12 + rng() * 0.15), 4), mats.ivory);
    tooth.position.set(Math.cos(a) * r * 0.6, h + h * 0.05, Math.sin(a) * r * 0.6);
    tooth.rotation.z = (rng() - 0.5) * 0.6;
    tooth.castShadow = true;
    g.add(tooth);
  }
  g.rotation.z = (rng() - 0.5) * 0.22;
  return g;
}

// Broken ring road arc on an islet: arc of colonnade following the rim.
export function ringRoad(mats: Mats, r: number, startA: number, span: number): THREE.Group {
  const g = new THREE.Group();
  const cols = Math.max(4, Math.floor(span * r / 9));
  // bend: wrap segment around arc — approximated by curving instanced pieces
  // simpler: rebuild as arc of single columns + beam
  const n = cols;
  const colGeo = new THREE.CylinderGeometry(0.55, 0.7, 7, 6);
  const colMesh = new THREE.InstancedMesh(colGeo, mats.ivory, n + 1);
  const m = new THREE.Matrix4();
  for (let i = 0; i <= n; i++) {
    const a = startA + (i / n) * span;
    m.makeTranslation(Math.cos(a) * r, 3.5, Math.sin(a) * r);
    colMesh.setMatrixAt(i, m);
  }
  colMesh.castShadow = true;
  g.add(colMesh);
  // curved beam: torus arc segment
  const beam = new THREE.Mesh(new THREE.TorusGeometry(r, 0.9, 5, Math.floor(span * 14), span), mats.ivoryDark);
  beam.rotation.x = Math.PI / 2;
  beam.rotation.z = -startA - span;
  beam.position.y = 7.6;
  beam.castShadow = true;
  g.add(beam);
  return g;
}

// Decorative gate/archway.
export function archGate(mats: Mats, w: number, h: number): THREE.Group {
  const g = new THREE.Group();
  for (const s of [-1, 1]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.09, w * 0.12, h, 8), mats.ivory);
    col.position.set((s * w) / 2, h / 2, 0);
    col.castShadow = true;
    g.add(col);
  }
  const arch = new THREE.Mesh(new THREE.TorusGeometry(w / 2, w * 0.07, 6, 16, Math.PI), mats.ivory);
  arch.position.y = h;
  g.add(arch);
  const crest = new THREE.Mesh(new THREE.OctahedronGeometry(w * 0.1), mats.goldBright);
  crest.position.y = h + w * 0.56;
  g.add(crest);
  return g;
}

// Small pavilion: dome on columns.
export function pavilion(mats: Mats, r: number, h: number): THREE.Group {
  const g = new THREE.Group();
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, h, 6), mats.ivory);
    c.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
    c.castShadow = true;
    g.add(c);
  }
  const beam = new THREE.Mesh(new THREE.TorusGeometry(r, 0.8, 6, 24), mats.gold);
  beam.rotation.x = Math.PI / 2;
  beam.position.y = h + 0.3;
  g.add(beam);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(r * 1.15, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), mats.teal);
  dome.position.y = h + 0.5;
  dome.castShadow = true;
  g.add(dome);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.4, 6), mats.goldBright);
  tip.position.y = h + r * 1.15 + 1.4;
  g.add(tip);
  return g;
}

// Ruined colonnade half-sunk on a rock.
export function ruinedColonnade(mats: Mats, len: number, h: number, rng: () => number): THREE.Group {
  const n = Math.floor(len / 6);
  const g = colonnade(mats, len, h, n);
  // knock a few columns out by shrinking their random scale
  g.rotation.z = (rng() - 0.5) * 0.15;
  g.rotation.x = (rng() - 0.5) * 0.1;
  return g;
}

// Embedded ancient structure fragment on an inverted cliff face.
export function embeddedRuin(mats: Mats, w: number, h: number): THREE.Group {
  const g = new THREE.Group();
  const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.3), mats.ivoryDark);
  wall.castShadow = true;
  g.add(wall);
  const n = Math.max(2, Math.floor(w / 8));
  for (let i = 0; i < n; i++) {
    const a = new THREE.Mesh(new THREE.TorusGeometry(w * 0.08, w * 0.02, 5, 10, Math.PI), mats.ivory);
    a.position.set(-w / 2 + (i + 0.5) * (w / n), h * 0.1, w * 0.16);
    g.add(a);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.02, w * 0.025, h * 0.55, 5), mats.ivory);
    c.position.set(-w / 2 + (i + 0.5) * (w / n) - w * 0.08, -h * 0.2, w * 0.16);
    g.add(c);
  }
  return g;
}

// Twin guard tower pair for islet ends.
export function watchPost(mats: Mats, h: number): THREE.Group {
  const g = new THREE.Group();
  const t1 = gateTower(mats, h, h * 0.22);
  const t2 = gateTower(mats, h * 0.8, h * 0.18);
  t2.position.x = h * 0.55;
  g.add(t1, t2);
  return g;
}
