import * as THREE from 'three';
import { box, flat, hull, toon } from './materials';
import * as T from './textures';
import type { DripPoint, FanSpin } from './effects';

export interface PropsInfo {
  drips: DripPoint[];
  fans: FanSpin[];
  traffic: TrafficSignal;
}

const UP = new THREE.Vector3(0, 1, 0);

function tube(
  parent: THREE.Object3D,
  from: THREE.Vector3,
  to: THREE.Vector3,
  r: number,
  mat: THREE.Material,
): THREE.Mesh {
  const dir = to.clone().sub(from);
  const len = dir.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), mat);
  m.position.copy(from).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(UP, dir.normalize());
  parent.add(m);
  return m;
}

/* -------------------------------------------------------- vending machine */

function vendingMachine(
  scene: THREE.Scene,
  x: number,
  z: number,
  rotY: number,
  drips: DripPoint[],
): void {
  const g = new THREE.Group();
  g.position.set(x, 0.12, z);
  g.rotation.y = rotY;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.78, 1.75, 0.58), toon('#2c3140'));
  body.position.y = 1.75 / 2;
  body.castShadow = true;
  g.add(body);
  hull(body, 0.024);
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 1.62),
    new THREE.MeshBasicMaterial({ map: T.vendingFront(), toneMapped: false }),
  );
  face.position.set(0, 0.89, 0.295);
  g.add(face);
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 1.0),
    new THREE.MeshBasicMaterial({
      color: '#7fd0ff', transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  glow.position.set(0, 0.95, 0.3);
  g.add(glow);
  // small warm spill onto the pavement
  const pl = new THREE.PointLight('#9fd8ff', 1.6, 2.4, 1.8);
  pl.position.set(0, 0.8, 0.55);
  g.add(pl);
  scene.add(g);
  // world-space drip point above the front edge
  const edge = new THREE.Vector3(0, 1.9, 0.25).applyAxisAngle(UP, rotY).add(g.position);
  drips.push({ pos: edge, landY: 0.125 });
}

/* ---------------------------------------------------------------- bicycle */

function bicycle(scene: THREE.Scene, x: number, z: number, rotY: number, frameColor: string): void {
  const g = new THREE.Group();
  g.position.set(x, 0.12, z);
  g.rotation.y = rotY;
  const frameMat = toon(frameColor);
  const darkMat = toon('#1e222c');
  const V = (ax: number, ay: number, az: number) => new THREE.Vector3(ax, ay, az);
  // wheels with a few spokes
  for (const wx of [-0.42, 0.42]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.032, 8, 22), darkMat);
    wheel.position.set(wx, 0.26, 0);
    wheel.castShadow = true;
    g.add(wheel);
    hull(wheel, 0.016);
    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.48, 6), toon('#596070'));
      spoke.position.set(wx, 0.26, 0);
      spoke.rotation.z = (i * Math.PI) / 3;
      g.add(spoke);
    }
  }
  tube(g, V(-0.42, 0.26, 0), V(-0.02, 0.3, 0), 0.02, frameMat);
  tube(g, V(-0.02, 0.3, 0), V(-0.24, 0.72, 0), 0.02, frameMat);
  tube(g, V(-0.24, 0.72, 0), V(-0.42, 0.26, 0), 0.014, frameMat);
  tube(g, V(-0.24, 0.7, 0), V(0.33, 0.72, 0), 0.02, frameMat);
  tube(g, V(0.33, 0.72, 0), V(-0.02, 0.3, 0), 0.02, frameMat);
  tube(g, V(0.33, 0.74, 0), V(0.42, 0.26, 0), 0.016, frameMat);
  tube(g, V(0.33, 0.72, 0), V(0.35, 0.84, 0), 0.018, frameMat);
  tube(g, V(0.35, 0.84, -0.17), V(0.35, 0.84, 0.17), 0.013, darkMat);
  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.045, 0.08), darkMat);
  saddle.position.set(-0.26, 0.76, 0);
  g.add(saddle);
  hull(saddle, 0.012);
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.17, 0.24), toon('#6d7484'));
  basket.position.set(0.5, 0.62, 0);
  g.add(basket);
  hull(basket, 0.014);
  // kickstand
  tube(g, V(-0.05, 0.3, 0.05), V(-0.1, 0.0, 0.16), 0.011, darkMat);
  scene.add(g);
}

/* ----------------------------------------------------------- streetlight */

function streetlight(
  scene: THREE.Scene,
  x: number,
  z: number,
  armDir: THREE.Vector3,
): THREE.Vector3 {
  const poleMat = toon('#2a2f3a');
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 3.2, 10), poleMat);
  pole.position.set(x, 0.12 + 1.6, z);
  pole.castShadow = true;
  scene.add(pole);
  hull(pole, 0.018);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.85, 8), poleMat);
  const head = new THREE.Vector3(x, 3.16, z).addScaledVector(armDir, 0.45);
  arm.position.copy(new THREE.Vector3(x, 3.22, z).addScaledVector(armDir, 0.45));
  arm.quaternion.setFromUnitVectors(UP, armDir);
  scene.add(arm);
  const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.2), poleMat);
  headBox.position.set(head.x, 3.14, head.z);
  scene.add(headBox);
  const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.14), flat('#eaf2ff', false));
  lens.rotation.x = Math.PI / 2;
  lens.position.set(head.x, 3.075, head.z);
  scene.add(lens);
  const pl = new THREE.PointLight('#cfe4ff', 5.5, 6.5, 1.8);
  pl.position.set(head.x, 2.9, head.z);
  scene.add(pl);
  // soft light pool on the ground
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(1, 26),
    new THREE.MeshBasicMaterial({
      color: '#cfe4ff', transparent: true, opacity: 0.14,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.scale.set(1.35, 0.9, 1);
  pool.rotation.z = Math.atan2(armDir.x, armDir.z);
  pool.position.set(head.x, 0.018, head.z);
  scene.add(pool);
  // faint volumetric cone
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1.05, 2.9, 18, 1, true),
    new THREE.MeshBasicMaterial({
      color: '#cfe4ff', transparent: true, opacity: 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }),
  );
  cone.rotation.x = Math.PI;
  cone.position.set(head.x, 3.05 - 1.45, head.z);
  scene.add(cone);
  return new THREE.Vector3(head.x, 3.02, head.z);
}

/* -------------------------------------------------------- utility pole */

function utilityPole(scene: THREE.Scene): void {
  const x = 5.45;
  const z = -0.7;
  const woodMat = toon('#4a4038');
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 4.3, 10), woodMat);
  pole.position.set(x, 0.12 + 2.15, z);
  pole.castShadow = true;
  scene.add(pole);
  hull(pole, 0.02);
  const armMat = toon('#3a3630');
  for (const ay of [3.95, 3.68]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.9), armMat);
    arm.position.set(x, 0.12 + ay, z);
    scene.add(arm);
  }
  // insulators on the crossarm tips
  const insMat = toon('#7ac0c8');
  for (const [ay, az] of [[4.02, -0.9], [4.02, 0.9], [3.75, -0.9], [3.75, 0.9], [3.75, -0.42], [3.75, 0.42]] as [number, number][]) {
    const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.1, 8), insMat);
    ins.position.set(x, 0.12 + ay, z + az);
    scene.add(ins);
  }
  // transformer canisters
  const tr1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.5, 12), toon('#5a5248'));
  tr1.rotation.x = Math.PI / 2;
  tr1.position.set(x, 0.12 + 3.15, z - 0.28);
  scene.add(tr1);
  hull(tr1, 0.018);
  const tr2 = tr1.clone();
  tr2.scale.setScalar(0.7);
  tr2.position.set(x, 0.12 + 2.95, z + 0.28);
  scene.add(tr2);

  // sagging wires to the surrounding rooftops
  const wireMat = flat('#0d1017');
  const wire = (from: THREE.Vector3, to: THREE.Vector3, sag: number): void => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.014, 5), wireMat);
    scene.add(m);
  };
  wire(new THREE.Vector3(x, 4.14, z - 0.9), new THREE.Vector3(1.25, 3.02, 1.25), 0.8);
  wire(new THREE.Vector3(x, 4.14, z + 0.9), new THREE.Vector3(-1.95, 2.72, 4.85), 1.0);
  wire(new THREE.Vector3(x, 3.87, z - 0.9), new THREE.Vector3(4.78, 3.72, 1.7), 0.45);
  wire(new THREE.Vector3(x, 3.87, z + 0.9), new THREE.Vector3(-4.95, 3.52, 0.95), 1.1);
  wire(new THREE.Vector3(x, 3.87, z - 0.42), new THREE.Vector3(4.78, 2.72, z - 0.42), 0.25);
  wire(new THREE.Vector3(x, 3.0, z + 0.2), new THREE.Vector3(4.78, 2.6, z + 0.2), 0.2);
}

/* ------------------------------------------------------------ guardrail */

function guardrail(scene: THREE.Scene, x: number, z: number, alongX: boolean, len: number): void {
  const g = new THREE.Group();
  g.position.set(x, 0.12, z);
  if (!alongX) g.rotation.y = Math.PI / 2;
  const stripeMat = toon('#e8c832');
  stripeMat.map = T.guardRail();
  const posts = Math.max(2, Math.round(len / 0.6) + 1);
  for (let i = 0; i < posts; i++) {
    const px = -len / 2 + (i * len) / (posts - 1);
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.5, 0.07), toon('#3c424e'));
    post.position.set(px, 0.25, 0);
    g.add(post);
  }
  for (const ry of [0.36, 0.14]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.12, 0.05), stripeMat);
    rail.position.set(0, ry, 0.035);
    g.add(rail);
    // black stripes as thin overlays
    for (let s = 0; s < Math.floor(len / 0.34); s++) {
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.012), flat('#20242c'));
      seg.position.set(-len / 2 + 0.17 + s * 0.34 + 0.09, ry, 0.065);
      seg.rotation.y = 0.5;
      g.add(seg);
    }
  }
  scene.add(g);
}

/* ------------------------------------------------------------ signposts */

function poleSign(
  scene: THREE.Scene,
  x: number,
  z: number,
  h: number,
  size: number,
  tex: THREE.Texture,
  square: boolean,
): THREE.Mesh {
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, h, 8), toon('#8a919e'));
  pole.position.set(x, 0.12 + h / 2, z);
  scene.add(pole);
  const face = new THREE.Mesh(
    square ? new THREE.PlaneGeometry(size, size) : new THREE.CircleGeometry(size / 2, 24),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true }),
  );
  face.position.set(x, 0.12 + h, z);
  face.rotation.y = Math.PI;
  scene.add(face);
  const back = new THREE.Mesh(
    square ? new THREE.PlaneGeometry(size, size) : new THREE.CircleGeometry(size / 2, 24),
    toon('#c9cfd8'),
  );
  back.position.set(x, 0.12 + h, z - 0.012);
  scene.add(back);
  void back;
  return face;
}

/* -------------------------------------------------------- traffic light */

export class TrafficSignal {
  readonly lensMats: THREE.MeshBasicMaterial[];
  private t = 4;
  private glow: THREE.Sprite;
  private glowMat: THREE.SpriteMaterial;

  constructor(scene: THREE.Scene, x: number, z: number) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.6, 10), toon('#2a2f3a'));
    pole.position.set(x, 0.12 + 1.3, z);
    pole.castShadow = true;
    scene.add(pole);
    hull(pole, 0.016);
    const head = new THREE.Group();
    head.position.set(x, 2.5, z);
    head.rotation.y = Math.atan2(-1, -1);
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.56, 0.16), toon('#20242c'));
    head.add(housing);
    hull(housing, 0.014);
    this.lensMats = [
      flat('#3a1518', false), flat('#3a3015', false), flat('#153a20', false),
    ];
    for (let i = 0; i < 3; i++) {
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.055, 14), this.lensMats[i]);
      lens.position.set(0, 0.17 - i * 0.17, 0.082);
      head.add(lens);
    }
    this.glowMat = new THREE.SpriteMaterial({
      map: T.radialGlow(), color: '#58e07a', transparent: true, opacity: 0.35,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.glow = new THREE.Sprite(this.glowMat);
    this.glow.scale.setScalar(0.7);
    this.glow.position.set(0, 0.17, 0.14);
    head.add(this.glow);
    scene.add(head);
  }

  update(dt: number): void {
    this.t += dt;
    const cycle = this.t % 14.2;
    const active = cycle < 7 ? 2 : cycle < 8.8 ? 1 : 0; // green, yellow, red
    const colors = ['#ff5a4d', '#ffc857', '#58e07a'];
    const dim = ['#3a1518', '#3a3015', '#153a20'];
    for (let i = 0; i < 3; i++) {
      this.lensMats[i].color.set(i === active ? colors[i] : dim[i]);
    }
    this.glow.position.y = 0.17 - active * 0.17;
    this.glowMat.color.set(colors[active]);
  }

  activeColor(): THREE.Color {
    return this.glowMat.color;
  }

  phase(): 'g' | 'y' | 'r' {
    const cycle = this.t % 14.2;
    return cycle < 7 ? 'g' : cycle < 8.8 ? 'y' : 'r';
  }
}

/* ------------------------------------------------------------------ AC */

function acUnit(
  scene: THREE.Scene,
  fans: FanSpin[],
  x: number,
  y: number,
  z: number,
  rotY: number,
): void {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.36, 0.26), toon('#aab0bc'));
  body.castShadow = true;
  g.add(body);
  hull(body, 0.018);
  const grill = new THREE.Mesh(new THREE.CircleGeometry(0.13, 16), flat('#3c424e'));
  grill.position.set(0.02, 0, 0.135);
  g.add(grill);
  const fan = new THREE.Mesh(new THREE.CircleGeometry(0.11, 12), flat('#535a66'));
  fan.position.set(0.02, 0, 0.132);
  g.add(fan);
  // three blades painted on a small disc that spins behind the grill
  const blade = new THREE.Mesh(new THREE.CircleGeometry(0.1, 12, 0, (Math.PI * 2) / 3), flat('#6d7484'));
  blade.position.set(0.02, 0, 0.134);
  g.add(blade);
  fans.push({ mesh: blade, speed: 3 });
  scene.add(g);
}

/* ---------------------------------------------------------------- main */

export function buildProps(scene: THREE.Scene): PropsInfo {
  const drips: DripPoint[] = [];
  const fans: FanSpin[] = [];

  // vending machines: two on the store's east facade, one by the apartment
  vendingMachine(scene, 1.6, 0.5, Math.PI / 2, drips);
  vendingMachine(scene, 1.6, -0.45, Math.PI / 2, drips);
  vendingMachine(scene, -5.35, 1.34, 0, drips);

  bicycle(scene, -3.4, 1.56, -0.12, '#c24d4d');
  bicycle(scene, -2.75, -4.85, Math.PI - 0.08, '#3f6fb4');

  // umbrella stand by the entrance with three closed umbrellas
  const stand = new THREE.Group();
  stand.position.set(-0.45, 0.12, 1.52);
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.1, 0.34, 12), toon('#3c4356'));
  bucket.position.y = 0.17;
  stand.add(bucket);
  hull(bucket, 0.014);
  const umbColors = ['#d64550', '#3f6fb4', '#4c7a55'];
  umbColors.forEach((c, i) => {
    const u = new THREE.Group();
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.52, 8), toon(c));
    canopy.position.y = 0.5;
    u.add(canopy);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.72, 6), toon('#8a919e'));
    stick.position.y = 0.36;
    u.add(stick);
    u.position.set((i - 1) * 0.045, 0.12, (i % 2 === 0 ? -0.03 : 0.03));
    u.rotation.z = (i - 1) * 0.14;
    stand.add(u);
  });
  scene.add(stand);

  // trash bins at the alley mouth
  const binA = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 0.6, 14), toon('#d9b23c'));
  binA.position.set(-4.62, 0.42, 0.95);
  binA.castShadow = true;
  scene.add(binA);
  hull(binA, 0.018);
  const binB = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 0.6, 14), toon('#4c7a55'));
  binB.position.set(-4.15, 0.42, 0.9);
  binB.castShadow = true;
  scene.add(binB);
  hull(binB, 0.018);
  box(scene, 0.5, 0.05, 0.5, -4.4, 0.75, 0.92, toon('#3c424e'), { rotY: 0.6 });

  // streetlights over both streets
  const sl1 = streetlight(scene, -3.95, 1.6, new THREE.Vector3(0, 0, 1));
  const sl2 = streetlight(scene, 2.4, 5.0, new THREE.Vector3(0, 0, -1));
  drips.push({ pos: sl1.clone(), landY: 0.02 });
  drips.push({ pos: sl2.clone(), landY: 0.02 });

  utilityPole(scene);

  // road signs
  poleSign(scene, 2.08, 0.5, 1.9, 0.44, T.noParking(), false);
  poleSign(scene, 1.0, -3.95, 1.35, 0.4, T.pSign(), true);

  // corner guardrails
  guardrail(scene, 1.2, 1.79, true, 1.15);
  guardrail(scene, 1.79, 1.2, false, 1.15);
  guardrail(scene, 5.25, 4.82, true, 1.1);
  guardrail(scene, 4.82, 5.25, false, 1.1);

  // roofed notice board near the alley entrance
  const board = new THREE.Group();
  board.position.set(-5.55, 0.12, 1.5);
  const legMat = toon('#4a4038');
  for (const lx of [-0.48, 0.48]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.0, 0.06), legMat);
    leg.position.set(lx, 0.5, 0);
    board.add(leg);
  }
  const caseBox = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.72, 0.07), toon('#5a4a3a'));
  caseBox.position.set(0, 1.05, 0);
  board.add(caseBox);
  hull(caseBox, 0.016);
  const papers = new THREE.Mesh(
    new THREE.PlaneGeometry(1.02, 0.6),
    new THREE.MeshBasicMaterial({ map: T.noticePapers() }),
  );
  papers.position.set(0, 1.05, 0.041);
  board.add(papers);
  const roofL = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.05, 0.34), toon('#3a3630'));
  roofL.position.set(0, 1.46, 0);
  roofL.rotation.z = 0.06;
  board.add(roofL);
  scene.add(board);

  // AC units: two on the store's back wall, one on the east block
  acUnit(scene, fans, -3.3, 1.0, -3.85, Math.PI);
  acUnit(scene, fans, -2.2, 1.0, -3.85, Math.PI);
  acUnit(scene, fans, 4.62, 0.9, -3.4, -Math.PI / 2);

  const traffic = new TrafficSignal(scene, 5.3, 5.3);
  return { drips, fans, traffic };
}
