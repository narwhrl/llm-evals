import * as THREE from 'three';
import { BASE_HALF, ROAD_A, ROAD_B, ALLEY, APARTMENT } from './layout';
import { box, cyl, flat, hull, toon } from './materials';
import * as T from './textures';

export interface WorldInfo {
  puddles: THREE.Vector3[];
  steamPoints: THREE.Vector3[];
}

// Ground-level plane helper (XZ footprint, top at y).
function slab(
  parent: THREE.Object3D,
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  y: number,
  mat: THREE.Material,
  tex?: THREE.Texture,
): THREE.Mesh {
  const w = x1 - x0;
  const d = z1 - z0;
  let material: THREE.Material | THREE.Material[] = mat;
  if (tex) {
    // project the tile texture on every face via a white base material
    const topMat = toon('#ffffff');
    const cloned = tex.clone();
    cloned.needsUpdate = true;
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.repeat.set(w / 1.4, d / 1.4);
    topMat.map = cloned;
    material = [topMat, topMat, topMat, topMat, topMat, topMat];
  }
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), material);
  m.position.set((x0 + x1) / 2, y - 0.06, (z0 + z1) / 2);
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function roadMark(
  parent: THREE.Object3D,
  x: number,
  z: number,
  w: number,
  d: number,
  mat: THREE.Material,
  y = 0.012,
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

export function buildWorld(scene: THREE.Scene): WorldInfo {
  /* ------------------------------------------------------------- sky */
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(42, 24, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      fog: false,
      uniforms: {
        uBottom: { value: new THREE.Color('#141c33') },
        uTop: { value: new THREE.Color('#2a3c68') },
      },
      vertexShader: /* glsl */ `
        varying vec3 vP;
        void main() {
          vP = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uBottom; uniform vec3 uTop;
        varying vec3 vP;
        void main() {
          float t = clamp(vP.y / 42.0 * 1.6 + 0.25, 0.0, 1.0);
          gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    }),
  );
  scene.add(sky);

  // faint stars on the upper dome
  const starPos: number[] = [];
  for (let i = 0; i < 140; i++) {
    const a = (i * 2.399963) % (Math.PI * 2);
    const y = 0.35 + (i % 17) / 17 * 0.55;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    starPos.push(Math.cos(a) * r * 39, y * 39, Math.sin(a) * r * 39);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      color: '#c9d6ef',
      size: 0.14,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      fog: false,
    }),
  );
  scene.add(stars);

  // soft moon with halo
  const moon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: T.radialGlow(),
      color: '#e7edff',
      fog: false,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    }),
  );
  moon.position.set(17, 24, -15);
  moon.scale.setScalar(2.6);
  scene.add(moon);
  const moonHalo = moon.clone();
  moonHalo.scale.setScalar(8);
  (moonHalo.material as THREE.SpriteMaterial).opacity = 0.22;
  scene.add(moonHalo);

  /* ------------------------------------------------------- base slab */
  const base = box(
    scene,
    BASE_HALF * 2,
    0.75,
    BASE_HALF * 2,
    0,
    -0.375,
    0,
    toon('#28304a'),
    { outline: 0.06, shadow: true },
  );
  base.receiveShadow = true;
  // thin edge trim so the model reads as a collectible plinth
  box(scene, BASE_HALF * 2 + 0.16, 0.1, BASE_HALF * 2 + 0.16, 0, -0.66, 0, toon('#1a2033'));

  /* ------------------------------------------------------- sidewalk */
  const walkMat = toon('#464d60');
  const walkTop = T.sidewalk();
  // SW block (store + alley + apartment + parking sit on top of it)
  slab(scene, -BASE_HALF, ROAD_B.x0, -BASE_HALF, ROAD_A.z0, 0.12, walkMat, walkTop);
  // north block
  slab(scene, -BASE_HALF, BASE_HALF, ROAD_A.z1, BASE_HALF, 0.12, walkMat, walkTop);
  // east block
  slab(scene, ROAD_B.x1, BASE_HALF, -BASE_HALF, ROAD_A.z1, 0.12, walkMat, walkTop);

  /* ---------------------------------------------------------- roads */
  const roadMat = toon('#242a38');
  roadMat.map = T.asphalt();
  const roadA = new THREE.Mesh(new THREE.PlaneGeometry(BASE_HALF * 2, ROAD_A.z1 - ROAD_A.z0), roadMat);
  roadA.rotation.x = -Math.PI / 2;
  roadA.position.set(0, 0.004, (ROAD_A.z0 + ROAD_A.z1) / 2);
  roadA.receiveShadow = true;
  scene.add(roadA);
  const roadB = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_B.x1 - ROAD_B.x0, (ROAD_A.z0 + BASE_HALF)), roadMat);
  roadB.rotation.x = -Math.PI / 2;
  roadB.position.set((ROAD_B.x0 + ROAD_B.x1) / 2, 0.004, (ROAD_A.z0 - BASE_HALF) / 2);
  roadB.receiveShadow = true;
  scene.add(roadB);

  // lane center dashes, skipping the intersection
  const dashMat = flat('#c9d2e4');
  for (let x = -6.1; x <= 6.1; x += 1.15) {
    if (x > 1.4 && x < 5.0) continue;
    roadMark(scene, x, (ROAD_A.z0 + ROAD_A.z1) / 2, 0.56, 0.1, dashMat);
  }
  for (let z = -6.1; z <= 1.2; z += 1.15) {
    roadMark(scene, (ROAD_B.x0 + ROAD_B.x1) / 2, z, 0.1, 0.56, dashMat);
  }
  // stop line in front of the crosswalk
  roadMark(scene, -3.5, (ROAD_A.z0 + ROAD_A.z1) / 2, 0.16, 2.5, dashMat);

  /* ------------------------------------------------------ crosswalk */
  const zebraMat = toon('#cdd6e8');
  zebraMat.emissive = new THREE.Color('#39415a');
  // crossing road A: stripes are long north-south, repeating east-west
  for (let i = 0; i < 6; i++) {
    roadMark(scene, -3.05 + i * 0.55, 3.3, 0.38, 2.4, zebraMat, 0.011);
  }
  // crossing road B: stripes long east-west, repeating north-south
  for (let i = 0; i < 5; i++) {
    roadMark(scene, 3.3, 2.3 + i * 0.55, 2.3, 0.38, zebraMat, 0.011);
  }

  /* -------------------------------------------- gutter grates + manhole */
  const grateMat = flat('#2b3242');
  const grateA = T.grate().clone();
  grateA.needsUpdate = true;
  grateA.wrapS = THREE.RepeatWrapping;
  grateA.wrapT = THREE.RepeatWrapping;
  grateA.repeat.set(8, 1);
  grateMat.map = grateA;
  const grateMat2 = flat('#2b3242');
  const grateB = T.grate().clone();
  grateB.needsUpdate = true;
  grateB.wrapS = THREE.RepeatWrapping;
  grateB.wrapT = THREE.RepeatWrapping;
  grateB.repeat.set(1, 8);
  grateMat2.map = grateB;
  roadMark(scene, -2.3, 1.78, 8.2, 0.24, grateMat, 0.02);
  roadMark(scene, 1.78, -2.4, 0.24, 8.2, grateMat2, 0.02);

  const manhole = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), flat('#181d29'));
  manhole.rotation.x = -Math.PI / 2;
  manhole.position.set(-1.2, 0.013, 3.3);
  scene.add(manhole);
  const manholeRim = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.4, 24), flat('#3a4356'));
  manholeRim.rotation.x = -Math.PI / 2;
  manholeRim.position.set(-1.2, 0.013, 3.3);
  scene.add(manholeRim);

  /* --------------------------------------------------------- puddles */
  const puddles: THREE.Vector3[] = [];
  const puddleMat = new THREE.MeshBasicMaterial({
    color: '#3b4f78',
    transparent: true,
    opacity: 0.85,
  });
  const puddleSpots: [number, number, number, number][] = [
    // x, z, radiusX, radiusZ
    [3.2, 3.5, 0.85, 0.6],
    [-4.9, 3.1, 0.7, 0.45],
    [3.1, -3.9, 0.8, 0.55],
    [-1.4, 2.25, 0.55, 0.4],
    [-2.1, -5.1, 0.9, 0.6],
    [-4.55, 0.5, 0.3, 0.5],
    [5.6, 1.3, 0.5, 0.35],
    [0.4, 5.5, 0.6, 0.4],
  ];
  for (const [x, z, rx, rz] of puddleSpots) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(1, 26), puddleMat);
    p.rotation.x = -Math.PI / 2;
    p.scale.set(rx, rz, 1);
    p.position.set(x, 0.014, z);
    scene.add(p);
    puddles.push(new THREE.Vector3(x, 0.02, z));
  }

  /* ----------------------------------------------------------- alley */
  const alleyFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(ALLEY.x1 - ALLEY.x0, ALLEY.z1 - ALLEY.z0),
    toon('#1d2231'),
  );
  alleyFloor.rotation.x = -Math.PI / 2;
  alleyFloor.position.set((ALLEY.x0 + ALLEY.x1) / 2, 0.126, (ALLEY.z0 + ALLEY.z1) / 2);
  alleyFloor.receiveShadow = true;
  scene.add(alleyFloor);

  // alley lamp on the store wall, AC unit + pipes on the apartment wall
  const lampBox = box(scene, 0.16, 0.1, 0.24, ALLEY.x1 - 0.02, 2.3, -0.9, flat('#ffdfae', false), {});
  hull(lampBox, 0.015);
  const alleyLight = new THREE.PointLight('#ffcf8f', 2.2, 3.2, 1.8);
  alleyLight.position.set(ALLEY.x1 - 0.15, 2.2, -0.9);
  scene.add(alleyLight);

  const acMat = toon('#aab0bc');
  const ac1 = box(scene, 0.5, 0.34, 0.26, ALLEY.x0 + 0.16, 1.5, -1.4, acMat, { outline: 0.02, rotY: Math.PI / 2 });
  ac1.castShadow = true;
  const pipeMat = toon('#5a616e');
  cyl(scene, 0.035, 0.035, 3.2, ALLEY.x0 + 0.05, 0, -2.6, pipeMat);
  cyl(scene, 0.035, 0.035, 3.2, ALLEY.x0 + 0.05, 0, -0.4, pipeMat);
  // rain barrel + small crates in the dead end
  cyl(scene, 0.22, 0.19, 0.5, (ALLEY.x0 + ALLEY.x1) / 2 - 0.1, 0.12, -2.0, toon('#31465a'), { outline: 0.02 });
  box(scene, 0.34, 0.24, 0.34, (ALLEY.x0 + ALLEY.x1) / 2 + 0.12, 0.24, -1.95, toon('#7a6a4e'), { outline: 0.02 });

  /* ------------------------------------------------- parking (rear) */
  const parkingMat = toon('#262c3a');
  parkingMat.map = T.asphalt();
  const parking = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 2.4), parkingMat);
  parking.rotation.x = -Math.PI / 2;
  parking.position.set(-1.55, 0.125, -5.05);
  parking.receiveShadow = true;
  scene.add(parking);
  const lineMat = flat('#c9d2e4');
  roadMark(scene, -1.55, -3.95, 5.2, 0.09, lineMat, 0.128);
  for (const lx of [-4.15, -1.55, 1.05]) {
    roadMark(scene, lx, -4.95, 0.09, 2.0, lineMat, 0.128);
  }
  // low wall closing the lot toward the base edge
  box(scene, 5.6, 0.42, 0.14, -1.5, 0.33, -6.35, toon('#3c4356'), { outline: 0.025, shadow: true });

  /* --------------------------------------------------- back lot props */
  // beer crates by the store's back door
  const crateMat = toon('#d9a73c');
  crateMat.map = T.beerCrate();
  const crate1 = box(scene, 0.46, 0.3, 0.36, -0.3, 0.27, -4.05, crateMat, { outline: 0.02 });
  crate1.castShadow = true;
  box(scene, 0.46, 0.3, 0.36, -0.3, 0.57, -4.05, crateMat, { outline: 0.02 });
  box(scene, 0.46, 0.3, 0.36, 0.22, 0.27, -4.0, crateMat, { outline: 0.02 });

  /* ------------------------------------------------ background blocks */
  // Apartment west of the alley: two floors, a few lit windows.
  const apt = box(
    scene,
    APARTMENT.x1 - APARTMENT.x0,
    APARTMENT.h,
    APARTMENT.z1 - APARTMENT.z0,
    (APARTMENT.x0 + APARTMENT.x1) / 2,
    APARTMENT.h / 2 + 0.12,
    (APARTMENT.z0 + APARTMENT.z1) / 2,
    toon('#4a4a5c'),
    { outline: 0.05, shadow: true },
  );
  void apt;
  box(scene, APARTMENT.x1 - APARTMENT.x0 + 0.3, 0.22, APARTMENT.z1 - APARTMENT.z0 + 0.3,
    (APARTMENT.x0 + APARTMENT.x1) / 2, APARTMENT.h + 0.12, (APARTMENT.z0 + APARTMENT.z1) / 2,
    toon('#3a3a4a'), { outline: 0.03 });
  const lit = flat('#ffd28f', false);
  const dark = flat('#1a2130');
  const aptWindows: [number, number][] = [
    [-6.05, 0.9], [-5.6, 0.9], [-5.15, 0.9], [-6.05, 2.35], [-5.6, 2.35], [-5.15, 2.35],
  ];
  aptWindows.forEach(([x, y], i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.52), i === 1 || i === 3 || i === 5 ? lit : dark);
    m.position.set(x, y + 0.12, APARTMENT.z1 + 0.011);
    scene.add(m);
  });
  // AC unit + small vent on the apartment's street face
  box(scene, 0.44, 0.3, 0.24, -5.9, 1.0, APARTMENT.z1 + 0.13, toon('#aab0bc'), { outline: 0.02 });

  // North block: two dim buildings with a shuttered ramen shop and a billboard.
  const b1 = box(scene, 4.3, 3.3, 1.7, -4.25, 1.77, 5.6, toon('#3f4458'), { outline: 0.05, shadow: true });
  void b1;
  box(scene, 4.3, 0.2, 1.7, -4.25, 3.52, 5.6, toon('#333848'), {});
  const shut = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), flat('#4a5162'));
  shut.material.map = T.shutter();
  shut.position.set(-5.2, 1.1, 4.74);
  scene.add(shut);
  const ramen = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.64), flat('#ff7a5c', false));
  ramen.material.map = T.ramenSign();
  ramen.position.set(-5.2, 2.15, 4.73);
  scene.add(ramen);
  for (const lx of [-6.1, -4.4]) {
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), flat('#ff6a55', false));
    lantern.scale.set(1, 1.25, 1);
    lantern.position.set(lx, 1.95, 4.7);
    scene.add(lantern);
  }
  const b2 = box(scene, 3.6, 2.7, 1.7, -0.1, 1.47, 5.6, toon('#464050'), { outline: 0.05, shadow: true });
  void b2;
  const b2win: [number, number][] = [[-1.2, 1.4], [-0.4, 1.4], [0.4, 1.4], [1.2, 1.4]];
  b2win.forEach(([x, y], i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.6), i === 0 || i === 3 ? lit : dark);
    m.position.set(x, y, 4.74);
    scene.add(m);
  });
  // rooftop billboard above B2
  const bill = new THREE.Mesh(
    new THREE.PlaneGeometry(2.9, 0.92),
    flat('#7ce8f4', false),
  );
  bill.material.map = T.billboard();
  bill.position.set(-0.1, 3.35, 5.35);
  scene.add(bill);
  box(scene, 0.08, 0.5, 0.08, -1.2, 2.95, 5.35, toon('#3a3f4e'), {});
  box(scene, 0.08, 0.5, 0.08, 1.0, 2.95, 5.35, toon('#3a3f4e'), {});

  // East block: shuttered warehouse + apartment with balconies.
  const e1 = box(scene, 1.7, 2.9, 3.8, 5.6, 1.57, -4.5, toon('#3f4458'), { outline: 0.05, shadow: true });
  void e1;
  const shutE = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), flat('#4a5162'));
  shutE.material.map = T.shutter();
  shutE.rotation.y = -Math.PI / 2;
  shutE.position.set(4.74, 1.05, -4.5);
  scene.add(shutE);
  const e2 = box(scene, 1.7, 3.7, 4.2, 5.6, 1.97, -0.5, toon('#383d50'), { outline: 0.05, shadow: true });
  void e2;
  const e2win: [number, number][] = [[0.9, 1.15], [1.9, 1.15], [-0.1, 1.15], [0.9, 2.6], [1.9, 2.6], [-0.1, 2.6]];
  e2win.forEach(([z, y], i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.56), i === 1 || i === 4 ? lit : dark);
    m.rotation.y = -Math.PI / 2;
    m.position.set(4.74, y, z - 0.5);
    scene.add(m);
  });
  // balcony rails
  const railMat = toon('#596070');
  box(scene, 0.06, 0.05, 1.1, 4.79, 1.75, 0.4, railMat, {});
  box(scene, 0.06, 0.05, 1.1, 4.79, 1.75, -1.4, railMat, {});
  box(scene, 0.5, 0.34, 0.26, 5.15, 2.2, 1.55, toon('#aab0bc'), { outline: 0.02, rotY: Math.PI / 2 });

  /* ----------------------------------------------------------- trees */
  const trunkMat = toon('#4a3a30');
  const leafMatA = toon('#2c4a3a');
  const leafMatB = toon('#35573f');
  function tree(x: number, z: number, s: number): void {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * s, 0.1 * s, 0.9 * s, 8), trunkMat);
    trunk.position.y = 0.45 * s;
    trunk.castShadow = true;
    g.add(trunk);
    const blobs: [number, number, number, THREE.Material][] = [
      [0, 1.15 * s, 0, leafMatA],
      [0.3 * s, 1.0 * s, 0.1 * s, leafMatB],
      [-0.25 * s, 1.05 * s, -0.15 * s, leafMatB],
    ];
    for (const [bx, by, bz, mat] of blobs) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.42 * s, 12, 10), mat);
      b.position.set(bx, by, bz);
      b.castShadow = true;
      hull(b, 0.025 * s);
      g.add(b);
    }
    g.position.set(x, 0.12, z);
    scene.add(g);
  }
  tree(-6.0, -3.7, 1.15);
  tree(-1.45, -5.95, 0.85);
  tree(6.0, 2.9, 1.0);
  // bushes along the north block curb
  for (const [bx, bz] of [[-5.2, 4.82], [-3.8, 4.82], [0.9, 4.82]] as [number, number][]) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), leafMatB);
    b.position.set(bx, 0.3, bz);
    b.scale.y = 0.75;
    hull(b, 0.02);
    scene.add(b);
  }

  return {
    puddles,
    steamPoints: [new THREE.Vector3(-1.2, 0.05, 3.3)],
  };
}
