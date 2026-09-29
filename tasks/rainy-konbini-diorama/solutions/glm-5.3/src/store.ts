import * as THREE from 'three';
import { STORE } from './layout';
import { box, cyl, flat, hull, toon } from './materials';
import * as T from './textures';
import type { DripPoint } from './effects';

export interface FlickerEntry {
  mat: THREE.MeshBasicMaterial;
  base: THREE.Color;
  rate: number;
}

export interface FanSpin {
  mesh: THREE.Object3D;
  speed: number;
}

export interface StoreInfo {
  glassMats: THREE.ShaderMaterial[];
  door: AutoDoor;
  drips: DripPoint[];
  steamPoints: THREE.Vector3[];
  flickers: FlickerEntry[];
  fans: FanSpin[];
}

/* ------------------------------------------------------------ glass */

const GLASS_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const GLASS_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTint;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  // One layer of droplets crawling down the pane, leaving short trails.
  float dropLayer(vec2 uv, float t, float density, float speed) {
    float cx = floor(uv.x * density);
    float r = hash(vec2(cx, floor(t * 0.08)));
    float x = fract(uv.x * density) - 0.5;
    float y = fract(uv.y * (0.7 + r * 0.3) + t * speed * (0.4 + 0.6 * r) + r * 7.0);
    float head = smoothstep(0.10 + r * 0.08, 0.0, length(vec2(x * 1.7, (y - 0.06) * 2.4)));
    float trail = smoothstep(0.32, 0.0, abs(x) * 2.2) * smoothstep(0.5, 0.12, y) * step(0.16, y);
    return clamp(head + trail * 0.65, 0.0, 1.0);
  }

  void main() {
    float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
    float d = dropLayer(vUv, uTime, 8.0, 0.085) * 0.9
            + dropLayer(vUv + vec2(3.7, 1.3), uTime * 1.35, 5.0, 0.045) * 0.55;
    float a = uOpacity + fres * 0.16 + d * 0.5;
    vec3 col = mix(uTint, vec3(0.92, 0.95, 1.0), d * 0.7 + fres * 0.25);
    gl_FragColor = vec4(col, clamp(a, 0.0, 0.85));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function makeGlass(
  glassMats: THREE.ShaderMaterial[],
  opacity: number,
  tint = '#ccd8ea',
): THREE.ShaderMaterial {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTint: { value: new THREE.Color(tint) },
      uOpacity: { value: opacity },
    },
    vertexShader: GLASS_VERT,
    fragmentShader: GLASS_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  glassMats.push(mat);
  return mat;
}

/* -------------------------------------------------------- auto door */

type DoorState = 'idle' | 'opening' | 'hold' | 'closing';

export class AutoDoor {
  private state: DoorState = 'idle';
  private timer = 3.5;
  openness = 0;
  private readonly left: THREE.Group;
  private readonly right: THREE.Group;
  private readonly led: THREE.MeshBasicMaterial;
  private readonly travel = 0.72;

  constructor(parent: THREE.Object3D, glassMat: THREE.ShaderMaterial, frameMat: THREE.Material) {
    const cx = -1.4; // centre of the doorway
    const z = 1.26;
    const mk = (panelX: number): THREE.Group => {
      const g = new THREE.Group();
      const w = 0.74;
      // frame rails
      const railTop = new THREE.Mesh(new THREE.BoxGeometry(w, 0.07, 0.06), frameMat);
      railTop.position.set(panelX, 2.16, z);
      const railBottom = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, 0.06), frameMat);
      railBottom.position.set(panelX, 0.19, z);
      const stileL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.06, 0.05), frameMat);
      stileL.position.set(panelX - w / 2 + 0.03, 1.16, z);
      const stileR = stileL.clone();
      stileR.position.x = panelX + w / 2 - 0.03;
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.12, 1.95), glassMat);
      glass.position.set(panelX, 1.16, z);
      glass.renderOrder = 30;
      g.add(railTop, railBottom, stileL, stileR, glass);
      parent.add(g);
      return g;
    };
    this.left = mk(cx - 0.37);
    this.right = mk(cx + 0.37);
    // sensor box + status LED above the door
    box(parent, 0.34, 0.09, 0.1, cx, 2.26, 1.27, flat('#20242e'));
    this.led = flat('#4ae07a', false);
    const ledMesh = new THREE.Mesh(new THREE.CircleGeometry(0.028, 10), this.led);
    ledMesh.position.set(cx + 0.2, 2.26, 1.33);
    parent.add(ledMesh);
  }

  update(dt: number): void {
    this.timer -= dt;
    switch (this.state) {
      case 'idle':
        if (this.timer <= 0) {
          this.state = 'opening';
          this.timer = 1.15;
        }
        break;
      case 'opening':
        this.openness = Math.min(1, this.openness + dt / 1.15);
        if (this.openness >= 1) {
          this.state = 'hold';
          this.timer = 2.6;
        }
        break;
      case 'hold':
        if (this.timer <= 0) {
          this.state = 'closing';
        }
        break;
      case 'closing':
        this.openness = Math.max(0, this.openness - dt / 1.35);
        if (this.openness <= 0) {
          this.state = 'idle';
          this.timer = 6 + Math.random() * 8;
        }
        break;
    }
    const ease = this.openness * this.openness * (3 - 2 * this.openness);
    this.left.position.x = -ease * this.travel;
    this.right.position.x = ease * this.travel;
    this.led.color.set(this.state === 'idle' ? '#2e6a48' : '#4ae07a');
  }
}

/* ------------------------------------------------------------ store */

export function buildStore(scene: THREE.Scene): StoreInfo {
  const glassMats: THREE.ShaderMaterial[] = [];
  const drips: DripPoint[] = [];
  const flickers: FlickerEntry[] = [];
  const fans: FanSpin[] = [];
  const steamPoints: THREE.Vector3[] = [];

  const { x0, x1, z0, z1, h, wall } = STORE;
  const inX0 = x0 + wall;
  const inX1 = x1 - wall;
  const inZ0 = z0 + wall;
  const inZ1 = z1 - wall;

  const extMat = toon('#e7e0d2');
  const frameMat = toon('#5b6270');

  /* ------------------------------------------------------- shell */
  // back wall
  box(scene, x1 - x0, h, wall, (x0 + x1) / 2, h / 2, z0 + wall / 2, extMat, { outline: 0.035, shadow: true });
  // west wall
  box(scene, wall, h, z1 - z0 - wall, x0 + wall / 2, h / 2, (z0 + z1) / 2 + wall / 2, extMat, { outline: 0.035, shadow: true });
  // east wall, solid lower/south part
  box(scene, wall, h, inZ1 - (-1.5), x1 - wall / 2, h / 2, (-1.5 + inZ1) / 2, extMat, { outline: 0.035, shadow: true });
  // east corner pier north of the side window
  box(scene, wall, h, z1 - 1.0, x1 - wall / 2, h / 2, (1.0 + z1) / 2, extMat, { outline: 0.035, shadow: true });
  // front header above the glass
  box(scene, x1 - x0, h - 2.2, wall, (x0 + x1) / 2, 2.2 + (h - 2.2) / 2, z1 - wall / 2, extMat, { outline: 0.035, shadow: true });
  // front piers
  box(scene, 0.35, h, wall, -4.12, h / 2, z1 - wall / 2, extMat, { outline: 0.03, shadow: true });
  box(scene, 0.3, h, wall, 1.15, h / 2, z1 - wall / 2, extMat, { outline: 0.03, shadow: true });

  // parapet ring
  const parMat = toon('#d8d2c6');
  box(scene, x1 - x0 + 0.12, 0.27, 0.16, (x0 + x1) / 2, h + 0.135, z1 + 0.02, parMat, { outline: 0.025 });
  box(scene, x1 - x0 + 0.12, 0.27, 0.16, (x0 + x1) / 2, h + 0.135, z0 - 0.02, parMat, { outline: 0.025 });
  box(scene, 0.16, 0.27, z1 - z0, x0 - 0.02, h + 0.135, (z0 + z1) / 2, parMat, { outline: 0.025 });
  box(scene, 0.16, 0.27, z1 - z0, x1 + 0.02, h + 0.135, (z0 + z1) / 2, parMat, { outline: 0.025 });

  // roof deck + units
  const roof = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0 - 0.2, z1 - z0 - 0.2), toon('#7d786c'));
  roof.rotation.x = -Math.PI / 2;
  roof.position.set((x0 + x1) / 2, h + 0.005, (z0 + z1) / 2);
  roof.receiveShadow = true;
  scene.add(roof);

  const roofAcMat = toon('#aab0bc');
  for (const [ax, az] of [[-2.9, -2.6], [-1.5, -2.6]] as [number, number][]) {
    const ac = box(scene, 0.72, 0.42, 0.5, ax, h + 0.21, az, roofAcMat, { outline: 0.025, shadow: true });
    void ac;
    const fan = new THREE.Mesh(new THREE.CircleGeometry(0.17, 14), flat('#3c424e'));
    fan.rotation.x = -Math.PI / 2;
    fan.position.set(ax, h + 0.43, az);
    scene.add(fan);
    fans.push({ mesh: fan, speed: 2.2 + Math.random() });
  }
  cyl(scene, 0.09, 0.09, 1.1, 0.7, h, -2.7, toon('#8a8578')); // vent stack
  cyl(scene, 0.008, 0.008, 1.3, 0.9, h, 0.7, flat('#454b58')); // antenna

  /* -------------------------------------------------------- fascia */
  const fasciaFront = new THREE.MeshBasicMaterial({ map: T.fasciaSign(), toneMapped: false });
  const fasciaSide = toon('#0e6472');
  const fascia = new THREE.Mesh(
    new THREE.BoxGeometry(x1 - x0 + 0.3, 0.66, 0.22),
    [fasciaSide, fasciaSide, fasciaSide, fasciaSide, fasciaFront, fasciaSide],
  );
  fascia.position.set((x0 + x1) / 2, 2.62, z1 + 0.11);
  scene.add(fascia);
  flickers.push({ mat: fasciaFront, base: new THREE.Color('#ffffff'), rate: 0.1 });
  const signGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: T.radialGlow(), color: '#9fe8ff', transparent: true,
      opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending,
    }),
  );
  signGlow.scale.set(6.2, 1.7, 1);
  signGlow.position.set((x0 + x1) / 2, 2.62, z1 + 0.4);
  scene.add(signGlow);

  // vertical side lightbox on the east facade
  const sideFront = new THREE.MeshBasicMaterial({ map: T.sideSign(), toneMapped: false });
  const sideSignMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1.6, 0.56),
    [sideFront, toon('#0b6472'), toon('#0b6472'), toon('#0b6472'), toon('#0b6472'), toon('#0b6472')],
  );
  sideSignMesh.position.set(x1 + 0.1, 1.95, -3.0);
  scene.add(sideSignMesh);
  flickers.push({ mat: sideFront, base: new THREE.Color('#ffffff'), rate: 0.06 });

  /* -------------------------------------------------------- awning */
  const awnMat = toon('#efe6d4');
  const awnTop = toon('#ffffff');
  const stripes = T.awningTop().clone();
  stripes.needsUpdate = true;
  stripes.wrapS = THREE.RepeatWrapping;
  stripes.wrapT = THREE.RepeatWrapping;
  stripes.repeat.set(3, 1);
  awnTop.map = stripes;
  const awning = new THREE.Mesh(
    new THREE.BoxGeometry(4.95, 0.1, 0.62),
    [awnMat, awnMat, awnTop, awnMat, awnMat, awnMat],
  );
  awning.position.set(-1.475, 2.18, z1 + 0.31);
  awning.castShadow = true;
  scene.add(awning);
  hull(awning, 0.02);
  // teal brand band on the awning front edge
  box(scene, 4.95, 0.14, 0.03, -1.475, 2.15, z1 + 0.615, toon('#2e8ea0'));
  // drip rail along the awning edge
  cyl(scene, 0.018, 0.018, 4.9, -1.475, 2.13, z1 + 0.6, flat('#46506a'), { rotZ: Math.PI / 2, seg: 8 });

  /* ------------------------------------------------- storefront glass */
  const glassMat = makeGlass(glassMats, 0.07);
  const mkPane = (w: number, hh: number, x: number, z: number, rotY = 0): void => {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, hh), glassMat);
    pane.position.set(x, 0.14 + hh / 2, z);
    pane.rotation.y = rotY;
    pane.renderOrder = 30;
    scene.add(pane);
  };
  mkPane(1.81, 2.06, -3.045, z1 - 0.02); // left of the door
  mkPane(1.66, 2.06, 0.17, z1 - 0.02); // right of the door
  mkPane(2.5, 2.06, x1 - 0.02, -0.25, Math.PI / 2); // side showcase
  // mullions and rails
  for (const mx of [-3.95, -2.14, -0.66, 1.0]) {
    box(scene, 0.07, 2.2, 0.07, mx, 1.24, z1 - 0.02, frameMat);
  }
  box(scene, 5.02, 0.09, 0.09, -1.475, 2.24, z1 - 0.02, frameMat);
  box(scene, 5.02, 0.12, 0.12, -1.475, 0.14, z1 - 0.02, frameMat);
  box(scene, 0.08, 2.2, 0.08, x1 - 0.02, 1.24, -1.5, frameMat);
  box(scene, 0.08, 2.2, 0.08, x1 - 0.02, 1.24, 1.0, frameMat);
  box(scene, 0.08, 0.09, 2.58, x1 - 0.02, 2.24, -0.25, frameMat);
  box(scene, 0.08, 0.12, 2.58, x1 - 0.02, 0.14, -0.25, frameMat);

  const door = new AutoDoor(scene, makeGlass(glassMats, 0.12), frameMat);

  // entrance mat
  const mat = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.58), flat('#2b3040'));
  mat.material.map = T.welcomeMat();
  mat.rotation.x = -Math.PI / 2;
  mat.position.set(-1.4, 0.125, 1.52);
  scene.add(mat);

  // posters seen through the glass, from inside
  const posterMat = new THREE.MeshBasicMaterial({ map: T.posterNew(), transparent: true });
  const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.62), posterMat);
  p1.position.set(0.25, 1.55, z1 - 0.06);
  scene.add(p1);
  const p2 = p1.clone();
  p2.rotation.y = -Math.PI / 2;
  p2.position.set(x1 - 0.06, 1.55, -0.9);
  scene.add(p2);

  /* ------------------------------------------------------- interior */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(inX1 - inX0, inZ1 - inZ0), toon('#ffffff'));
  const flTex = T.interiorFloor().clone();
  flTex.needsUpdate = true;
  flTex.wrapS = THREE.RepeatWrapping;
  flTex.wrapT = THREE.RepeatWrapping;
  flTex.repeat.set(3, 3);
  (floor.material as THREE.MeshToonMaterial).map = flTex;
  floor.rotation.x = -Math.PI / 2;
  floor.position.set((inX0 + inX1) / 2, 0.14, (inZ0 + inZ1) / 2);
  floor.receiveShadow = true;
  scene.add(floor);

  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(inX1 - inX0, inZ1 - inZ0), toon('#f2efe6'));
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set((inX0 + inX1) / 2, 2.5, (inZ0 + inZ1) / 2);
  scene.add(ceil);

  // ceiling lightboxes
  const boxMatA = flat('#fff3d8', false);
  const boxMatB = flat('#fff3d8', false);
  for (const [lx, len, mm] of [[-2.9, 1.9, boxMatA], [-0.9, 1.9, boxMatA], [0.35, 1.7, boxMatB]] as [number, number, THREE.MeshBasicMaterial][]) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.26), mm);
    strip.rotation.x = Math.PI / 2;
    strip.position.set(lx, 2.49, -1.15);
    scene.add(strip);
  }
  flickers.push({ mat: boxMatB, base: new THREE.Color('#fff3d8'), rate: 0.05 });

  // warm interior lighting
  for (const [lx, lz] of [[-1.7, -2.1], [0.3, 0.15], [-3.3, -0.3]] as [number, number][]) {
    const pl = new THREE.PointLight('#ffd096', 5.4, 8.0, 1.8);
    pl.position.set(lx, 2.2, lz);
    scene.add(pl);
  }

  // back wall: row of glowing drink coolers
  const coolerBody = toon('#cfd6dd');
  const coolerFace = new THREE.MeshBasicMaterial({ map: T.coolerFront(), toneMapped: false });
  for (let i = 0; i < 4; i++) {
    const cx = -3.45 + i * 1.15;
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.08, 1.95, 0.55), coolerBody);
    body.position.set(cx, 0.14 + 1.95 / 2, inZ0 + 0.28);
    body.castShadow = true;
    scene.add(body);
    hull(body, 0.02);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 1.85), coolerFace);
    face.position.set(cx, 0.14 + 1.95 / 2, inZ0 + 0.561);
    scene.add(face);
  }

  // staff door on the back wall
  const staff = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 1.15), flat('#d8d2c4'));
  staff.material.map = T.staffDoor();
  staff.position.set(0.62, 0.14 + 0.575, inZ0 + 0.011);
  scene.add(staff);
  // posters above the coolers
  const bp1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), posterMat);
  bp1.position.set(-2.4, 2.35, inZ0 + 0.011);
  scene.add(bp1);
  const bp2 = bp1.clone();
  bp2.position.x = -1.2;
  scene.add(bp2);

  // gondola shelves with instanced merchandise
  const shelfMat = toon('#dfe3e8');
  function gondola(cx: number, cz: number): void {
    const len = 2.9;
    const base = new THREE.Mesh(new THREE.BoxGeometry(len, 0.16, 0.55), shelfMat);
    base.position.set(cx, 0.22, cz);
    base.castShadow = true;
    scene.add(base);
    const spine = new THREE.Mesh(new THREE.BoxGeometry(len, 1.5, 0.07), shelfMat);
    spine.position.set(cx, 0.14 + 0.75, cz);
    scene.add(spine);
    hull(spine, 0.018);
    for (const by of [0.62, 1.07, 1.52]) {
      for (const side of [-1, 1]) {
        const board = new THREE.Mesh(new THREE.BoxGeometry(len, 0.035, 0.24), shelfMat);
        board.position.set(cx, by, cz + side * 0.155);
        scene.add(board);
      }
    }
  }
  gondola(-2.2, -2.15);
  gondola(-2.2, -1.0);

  // one instanced mesh covers all shelf goods, bentos and magazines
  const goods = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    toon('#ffffff'),
    150,
  );
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const palette = ['#e85d4a', '#f2b04a', '#5cc8e8', '#7ed07a', '#ee88a8', '#f0ede2', '#8a7ad0', '#f08c2e'];
  let idx = 0;
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const put = (x: number, y: number, z: number, w: number, hh: number, d: number, rotY = 0): void => {
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, rotY, 0);
    dummy.scale.set(w, hh, d);
    dummy.updateMatrix();
    goods.setMatrixAt(idx, dummy.matrix);
    goods.setColorAt(idx, color.set(palette[Math.floor(rand() * palette.length)]));
    idx++;
  };
  for (const cz of [-2.15, -1.0]) {
    for (const by of [0.62, 1.07, 1.52]) {
      for (const side of [-1, 1]) {
        let gx = -3.45;
        while (gx < -0.95 && idx < 130) {
          const w = 0.13 + rand() * 0.09;
          put(gx + w / 2, by + 0.11, cz + side * 0.155, w, 0.15 + rand() * 0.1, 0.1 + rand() * 0.05, (rand() - 0.5) * 0.25);
          gx += w + 0.035;
        }
      }
    }
  }
  // bento boxes in the island showcase
  for (let i = 0; i < 8 && idx < 146; i++) {
    put(0.28 + (i % 4) * 0.22, 0.82, -1.55 - Math.floor(i / 4) * 0.3, 0.18, 0.07, 0.24, 0.1 * (rand() - 0.5));
  }
  goods.count = idx;
  goods.instanceMatrix.needsUpdate = true;
  if (goods.instanceColor) goods.instanceColor.needsUpdate = true;
  goods.castShadow = false;
  scene.add(goods);

  // island showcase (bento chiller) near the side glass
  const island = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.55, 0.78), shelfMat);
  island.position.set(0.5, 0.14 + 0.275, -1.45);
  island.castShadow = true;
  scene.add(island);
  hull(island, 0.02);
  const islandGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.1), flat('#ffe9c8', false));
  islandGlow.position.set(0.5, 0.72, -1.45);
  islandGlow.rotation.x = -Math.PI / 2;
  scene.add(islandGlow);

  // magazine rack along the west wall
  const rack = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.3, 1.8), shelfMat);
  rack.position.set(inX0 + 0.17, 0.14 + 0.65, -0.1);
  scene.add(rack);
  hull(rack, 0.018);
  for (const my of [0.55, 0.95, 1.35]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 1.7), toon('#c9cfd8'));
    m.position.set(inX0 + 0.34, my, -0.1);
    m.rotation.z = 0.12;
    scene.add(m);
  }

  // glass-top freezer near the front west corner
  const freezer = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.62, 0.68), toon('#cfd6dd'));
  freezer.position.set(-3.1, 0.14 + 0.31, 0.62);
  freezer.castShadow = true;
  scene.add(freezer);
  hull(freezer, 0.02);
  const fzGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.58), makeGlass(glassMats, 0.25, '#cfe2f4'));
  fzGlass.rotation.x = -Math.PI / 2;
  fzGlass.position.set(-3.1, 0.775, 0.62);
  fzGlass.renderOrder = 30;
  scene.add(fzGlass);

  // checkout counter with register, coffee machine and oden warmer
  const counter = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.78, 0.6), toon('#e8e2d4'));
  counter.position.set(0.4, 0.14 + 0.39, 0.45);
  counter.castShadow = true;
  scene.add(counter);
  hull(counter, 0.022);
  const counterBand = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.16, 0.02), toon('#2e8ea0'));
  counterBand.position.set(0.4, 0.62, 0.45 - 0.31);
  scene.add(counterBand);
  // register
  const reg = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.26, 0.3), toon('#3a4150'));
  reg.position.set(0.75, 0.14 + 0.78 + 0.13, 0.42);
  scene.add(reg);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.18), flat('#8ef0c8', false));
  screen.position.set(0.75, 1.14, 0.28);
  screen.rotation.x = -0.35;
  scene.add(screen);
  // coffee machine (visible through the side glass)
  const coffee = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.38, 0.3), toon('#c0392b'));
  coffee.position.set(0.98, 0.14 + 0.78 + 0.19, 0.5);
  scene.add(coffee);
  hull(coffee, 0.016);
  cyl(scene, 0.022, 0.022, 0.06, 0.98, 0.14 + 0.78, 0.5, flat('#2a2f3a'), { rotX: Math.PI / 2, seg: 8 });
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.09, 10), toon('#f0ede2'));
  cup.position.set(0.98, 0.14 + 0.78 + 0.045, 0.5);
  scene.add(cup);
  // oden warmer with steam (visible through the front glass)
  const odenCase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.34, 0.4), toon('#3a4150'));
  odenCase.position.set(-0.25, 0.14 + 0.78 + 0.17, 0.45);
  scene.add(odenCase);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.12, 14), toon('#4a3428'));
  pot.position.set(-0.25, 0.14 + 0.78 + 0.38, 0.45);
  scene.add(pot);
  hull(pot, 0.014);
  const broth = new THREE.Mesh(new THREE.CircleGeometry(0.13, 14), flat('#e8b45c', false));
  broth.rotation.x = -Math.PI / 2;
  broth.position.set(-0.25, 0.14 + 0.78 + 0.442, 0.45);
  scene.add(broth);
  for (const ox of [-0.06, 0.05]) {
    const egg = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), toon('#e8d8b0'));
    egg.position.set(-0.25 + ox, 0.14 + 0.78 + 0.44, 0.45 + (ox < 0 ? 0.03 : -0.04));
    scene.add(egg);
  }
  steamPoints.push(new THREE.Vector3(-0.25, 1.42, 0.45));

  // floor guidance arrows from the door to the register
  const arrowMat = new THREE.MeshBasicMaterial({ map: T.floorArrow(), transparent: true, opacity: 0.9 });
  const mkArrow = (x: number, z: number, rotY: number): void => {
    const g = new THREE.Group();
    const a = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.84), arrowMat);
    a.rotation.x = -Math.PI / 2;
    g.add(a);
    g.position.set(x, 0.148, z);
    g.rotation.y = rotY;
    scene.add(g);
  };
  mkArrow(-1.4, -0.1, Math.PI);
  mkArrow(-0.75, 0.5, Math.PI / 2);

  // hanging promotional banners
  const bannerMat = new THREE.MeshBasicMaterial({ map: T.bannerHang(), side: THREE.DoubleSide });
  for (const [bx, bz] of [[-2.0, -0.6], [0.2, -1.7]] as [number, number][]) {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8), flat('#596070'));
    rod.rotation.z = Math.PI / 2;
    rod.position.set(bx, 2.42, bz);
    scene.add(rod);
    const b = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.96), bannerMat);
    b.position.set(bx, 1.94, bz);
    scene.add(b);
  }

  // in-store umbrella stand and bin by the door
  cyl(scene, 0.11, 0.09, 0.34, -0.45, 0.14, 0.95, toon('#3c4356'), { outline: 0.015 });
  cyl(scene, 0.14, 0.12, 0.36, 0.95, 0.14, 0.95, toon('#4c7a55'), { outline: 0.015 });

  /* --------------------------------------------------- drip sources */
  for (let i = 0; i < 10; i++) {
    drips.push({ pos: new THREE.Vector3(-3.7 + i * 0.49, 2.12, z1 + 0.6), landY: 0.125 });
  }
  drips.push({ pos: new THREE.Vector3(-2.6, 2.3, z1 + 0.14), landY: 0.125 });
  drips.push({ pos: new THREE.Vector3(1.28, h + 0.25, 1.28), landY: 0.125 });
  drips.push({ pos: new THREE.Vector3(-4.28, h + 0.25, 1.28), landY: 0.128 });
  drips.push({ pos: new THREE.Vector3(0.7, h + 0.25, -3.68), landY: 0.125 });

  return { glassMats, door, drips, steamPoints, flickers, fans };
}
