import * as THREE from 'three';
import { mulberry32, puffTexture, type SharedMats } from './materials';

export interface Animated {
  update(t: number, dt: number): void;
}

/** Instanced stylized trees scattered on given discs. */
export function plantTrees(
  parent: THREE.Group,
  mats: SharedMats,
  spots: { x: number; z: number; r: number; count: number; seed: number; sMin: number; sMax: number }[],
): void {
  const trunkGeo = new THREE.CylinderGeometry(1.4, 2.2, 12, 6);
  const crownGeo = new THREE.IcosahedronGeometry(8, 1);
  let total = 0;
  for (const s of spots) total += s.count;
  const trunks = new THREE.InstancedMesh(trunkGeo, mats.trunk, total);
  const crowns = new THREE.InstancedMesh(crownGeo, mats.leaf, total);
  const crowns2 = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(5.2, 1), mats.leafLight, total);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const sc = new THREE.Vector3();
  const col = new THREE.Color();
  let k = 0;
  for (const s of spots) {
    const rand = mulberry32(s.seed);
    for (let i = 0; i < s.count; i++) {
      const a = rand() * Math.PI * 2;
      const rr = Math.sqrt(rand()) * s.r;
      const x = s.x + Math.cos(a) * rr;
      const z = s.z + Math.sin(a) * rr;
      const scv = s.sMin + rand() * (s.sMax - s.sMin);
      e.set(0, rand() * Math.PI, 0);
      q.setFromEuler(e);
      // trunk
      v.set(x, 6 * scv, z);
      sc.set(scv, scv, scv);
      m.compose(v, q, sc);
      trunks.setMatrixAt(k, m);
      // crown: two blobs offset
      v.set(x, (12 + 5) * scv, z);
      sc.set(scv * (0.9 + rand() * 0.3), scv * 0.85, scv * (0.9 + rand() * 0.3));
      m.compose(v, q, sc);
      crowns.setMatrixAt(k, m);
      col.setHSL(0.29 + rand() * 0.05, 0.55, 0.32 + rand() * 0.12);
      crowns.setColorAt(k, col);
      v.set(x + (rand() - 0.5) * 8 * scv, (12 + 9) * scv, z + (rand() - 0.5) * 8 * scv);
      sc.setScalar(scv * (0.55 + rand() * 0.25));
      m.compose(v, q, sc);
      crowns2.setMatrixAt(k, m);
      crowns2.setColorAt(k, col);
      k++;
    }
  }
  trunks.instanceMatrix.needsUpdate = true;
  crowns.instanceMatrix.needsUpdate = true;
  crowns2.instanceMatrix.needsUpdate = true;
  if (crowns.instanceColor) crowns.instanceColor.needsUpdate = true;
  if (crowns2.instanceColor) crowns2.instanceColor.needsUpdate = true;
  parent.add(trunks, crowns, crowns2);
}

function waterfallMaterial(topFade: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uTop: { value: topFade },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uTop;
      void main() {
        float streaks = smoothstep(0.35, 0.9,
          sin(vUv.x * 46.0 + sin(vUv.y * 22.0 + uTime * 2.2) * 1.4) * 0.5 + 0.5);
        float flow = smoothstep(0.25, 0.95,
          sin((vUv.y * 30.0) - uTime * 5.2 + sin(vUv.x * 18.0) * 2.0) * 0.5 + 0.5);
        float a = (0.25 + streaks * 0.55 + flow * 0.25);
        a *= smoothstep(0.0, uTop, vUv.y);          // fade in below the lip
        a *= 1.0 - smoothstep(0.55, 0.0, vUv.y) * 0.85; // dissolve mid-air
        vec3 col = mix(vec3(0.82, 0.93, 1.0), vec3(1.0), flow * 0.6);
        gl_FragColor = vec4(col, a * 0.85);
      }`,
  });
}

/**
 * Waterfall pouring from an island lip, dissolving mid-air (悬空瀑布).
 * uv.y = 1 at the top lip.
 */
export function buildWaterfall(
  parent: THREE.Group,
  x: number, topY: number, z: number,
  dirAngle: number, width: number, drop: number,
): THREE.ShaderMaterial {
  const mat = waterfallMaterial(0.12);
  const geo = new THREE.PlaneGeometry(width, drop, 1, 24);
  const fall = new THREE.Mesh(geo, mat);
  const dx = Math.cos(dirAngle);
  const dz = Math.sin(dirAngle);
  fall.position.set(x + dx * 6, topY - drop / 2 + 4, z + dz * 6);
  fall.rotation.y = -dirAngle + Math.PI / 2;
  // slight outward lean
  fall.rotateX(0.04);
  parent.add(fall);

  // foam lip + dissolving mist at the tail
  const foam = new THREE.Sprite(new THREE.SpriteMaterial({
    map: puffTexture, color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false,
  }));
  foam.position.set(x + dx * 4, topY + 2, z + dz * 4);
  foam.scale.set(width * 1.6, 10, 1);
  parent.add(foam);
  const mist = new THREE.Sprite(new THREE.SpriteMaterial({
    map: puffTexture, color: 0xe8f3ff, transparent: true, opacity: 0.55, depthWrite: false,
  }));
  mist.position.set(x + dx * 14, topY - drop + 10, z + dz * 14);
  mist.scale.set(width * 2.4, 46, 1);
  parent.add(mist);
  return mat;
}

/** Floating rock shards drifting around the islands; bob in the main loop. */
export function buildDebris(parent: THREE.Group, mats: SharedMats, seed: number): Animated {
  const rand = mulberry32(seed);
  const geo = new THREE.DodecahedronGeometry(1, 0);
  const mesh = new THREE.InstancedMesh(geo, mats.rock, 90);
  const base: { p: THREE.Vector3; s: number; ph: number; spin: number }[] = [];
  for (let i = 0; i < 90; i++) {
    const a = rand() * Math.PI * 2;
    const r = 260 + rand() * 720;
    const y = -40 - rand() * 320;
    base.push({
      p: new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r),
      s: 2 + rand() * 9,
      ph: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 0.6,
    });
  }
  parent.add(mesh);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  return {
    update(t: number) {
      for (let i = 0; i < base.length; i++) {
        const b = base[i];
        e.set(t * b.spin * 0.3, b.ph + t * b.spin, 0);
        q.setFromEuler(e);
        s.setScalar(b.s);
        m.compose(new THREE.Vector3(b.p.x, b.p.y + Math.sin(t * 0.4 + b.ph) * 8, b.p.z), q, s);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
    },
  };
}

/** Distant white birds: flapping V shapes circling the spire. */
export function buildBirds(parent: THREE.Group, seed: number): Animated {
  const rand = mulberry32(seed);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  interface Bird { g: THREE.Group; l: THREE.Mesh; r: THREE.Mesh; rad: number; h: number; ph: number; sp: number }
  const birds: Bird[] = [];
  const wingGeo = new THREE.PlaneGeometry(14, 4);
  wingGeo.translate(7, 0, 0);
  for (let i = 0; i < 14; i++) {
    const g = new THREE.Group();
    const l = new THREE.Mesh(wingGeo, mat);
    const r = new THREE.Mesh(wingGeo, mat);
    r.rotation.y = Math.PI;
    g.add(l, r);
    parent.add(g);
    birds.push({
      g, l, r,
      rad: 320 + rand() * 420,
      h: 160 + rand() * 260,
      ph: rand() * Math.PI * 2,
      sp: 0.05 + rand() * 0.05,
    });
  }
  return {
    update(t: number) {
      for (const b of birds) {
        const a = b.ph + t * b.sp;
        b.g.position.set(Math.cos(a) * b.rad, b.h + Math.sin(t * 0.7 + b.ph) * 12, Math.sin(a) * b.rad);
        b.g.rotation.y = -a;
        const flap = Math.sin(t * 6 + b.ph * 3) * 0.55;
        b.l.rotation.x = flap;
        b.r.rotation.x = -flap;
      }
    },
  };
}
