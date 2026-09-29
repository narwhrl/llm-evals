import * as THREE from 'three';
import { MAP_BLOCKS, type Block } from './map';
import type { Team, WeaponId } from './config';

type HumanRig = { root: THREE.Group; leftLeg: THREE.Group; rightLeg: THREE.Group; leftArm: THREE.Group; rightArm: THREE.Group; head: THREE.Group; gun: THREE.Group };
const metal = new THREE.MeshStandardMaterial({ color: 0x596c72, metalness: .64, roughness: .58 });
const darkMetal = new THREE.MeshStandardMaterial({ color: 0x222c32, metalness: .68, roughness: .5 });
const brightMetal = new THREE.MeshStandardMaterial({ color: 0x9faeb0, metalness: .73, roughness: .4 });
const brass = new THREE.MeshStandardMaterial({ color: 0xb99b57, metalness: .68, roughness: .42 });
const skin = new THREE.MeshStandardMaterial({ color: 0xa9886c, roughness: .83 });
const glove = new THREE.MeshStandardMaterial({ color: 0x252c2c, roughness: .87 });
const wood = new THREE.MeshStandardMaterial({ color: 0x85704c, roughness: .88 });
const accentRed = new THREE.MeshStandardMaterial({ color: 0x9a493e, roughness: .87 });
const accentBlue = new THREE.MeshStandardMaterial({ color: 0x456b79, roughness: .87 });

function box(parent: THREE.Object3D, w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
}
function cylinder(parent: THREE.Object3D, r: number, h: number, mat: THREE.Material, x: number, y: number, z: number, rotationX = 0, rotationZ = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), mat);
  mesh.position.set(x, y, z); mesh.rotation.x = rotationX; mesh.rotation.z = rotationZ;
  mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
}
function texture(kind: 'deck' | 'steel' | 'wood' | 'tarp' | 'wall'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const colors = { deck: '#334149', steel: '#586970', wood: '#977e5b', tarp: '#536552', wall: '#c0c4ba' };
  ctx.fillStyle = colors[kind]; ctx.fillRect(0, 0, 512, 512);
  let state = ({ deck: 7, steel: 19, wood: 37, tarp: 43, wall: 61 })[kind];
  const rand = () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 4294967296; };
  for (let i = 0; i < 5000; i++) {
    const v = Math.floor(rand() * 80);
    ctx.fillStyle = `rgba(${kind === 'wood' ? '43,30,15' : '7,14,18'},${rand() * .15})`;
    ctx.fillRect(rand() * 512, rand() * 512, 1 + rand() * (kind === 'wood' ? 36 : 7), 1 + rand() * 2);
    if (v < 3 && kind !== 'tarp') { ctx.fillStyle = 'rgba(216,156,90,.17)'; ctx.fillRect(rand() * 512, rand() * 512, 12, 2); }
  }
  if (kind === 'steel') {
    for (let x = 8; x < 512; x += 24) {
      ctx.fillStyle = 'rgba(12,23,27,.25)'; ctx.fillRect(x, 0, 5, 512);
      ctx.fillStyle = 'rgba(214,226,222,.14)'; ctx.fillRect(x + 6, 0, 4, 512);
    }
    ctx.fillStyle = 'rgba(14,22,26,.32)'; ctx.fillRect(0, 477, 512, 7);
  } else if (kind === 'deck') {
    for (let y = 0; y < 512; y += 64) {
      ctx.fillStyle = 'rgba(12,20,26,.45)'; ctx.fillRect(0, y, 512, 4);
      ctx.fillStyle = 'rgba(179,189,185,.12)'; ctx.fillRect(0, y + 5, 512, 2);
      for (let x = 10; x < 512; x += 24) {
        ctx.fillStyle = 'rgba(192,205,203,.24)'; ctx.beginPath(); ctx.arc(x, y + 29, 2, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else if (kind === 'wood') {
    for (let y = 0; y < 512; y += 62) {
      ctx.fillStyle = 'rgba(31,24,15,.42)'; ctx.fillRect(0, y, 512, 4);
      ctx.fillStyle = 'rgba(239,210,156,.15)'; ctx.fillRect(0, y + 5, 512, 2);
      for (let k = 0; k < 9; k++) { ctx.strokeStyle = `rgba(42,28,16,${.05 + rand() * .14})`; ctx.beginPath(); const yy = y + 12 + rand() * 43; ctx.moveTo(0, yy); ctx.bezierCurveTo(140, yy + rand() * 6, 360, yy - rand() * 6, 512, yy); ctx.stroke(); }
    }
  } else if (kind === 'tarp') {
    for (let x = 0; x < 512; x += 45) {
      const grad = ctx.createLinearGradient(x, 0, x + 45, 0);
      grad.addColorStop(0, 'rgba(18,32,25,.2)'); grad.addColorStop(.3, 'rgba(216,227,195,.13)'); grad.addColorStop(1, 'rgba(10,24,16,.14)');
      ctx.fillStyle = grad; ctx.fillRect(x, 0, 45, 512);
    }
    ctx.strokeStyle = 'rgba(21,36,24,.3)'; ctx.lineWidth = 5;
    for (let y = 86; y < 512; y += 171) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y + 5); ctx.stroke(); }
  } else {
    for (let y = 0; y < 512; y += 110) { ctx.fillStyle = 'rgba(34,44,43,.16)'; ctx.fillRect(0, y, 512, 4); }
  }
  const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
  return map;
}

function materialSet() {
  const maps = { deck: texture('deck'), steel: texture('steel'), wood: texture('wood'), tarp: texture('tarp'), wall: texture('wall') };
  maps.deck.wrapS = maps.deck.wrapT = THREE.RepeatWrapping; maps.deck.repeat.set(6, 18);
  return {
    deck: new THREE.MeshStandardMaterial({ map: maps.deck, color: 0x9eabb0, metalness: .5, roughness: .8 }),
    steel: new THREE.MeshStandardMaterial({ map: maps.steel, color: 0xc2c9c7, metalness: .5, roughness: .7 }),
    wood: new THREE.MeshStandardMaterial({ map: maps.wood, color: 0xd6c29a, roughness: .91 }),
    tarp: new THREE.MeshStandardMaterial({ map: maps.tarp, color: 0xa4b19a, roughness: .97 }),
    wall: new THREE.MeshStandardMaterial({ map: maps.wall, color: 0xd1d5cf, metalness: .18, roughness: .79 }),
    rail: darkMetal
  };
}

function makeBlock(parent: THREE.Group, b: Block, mats: ReturnType<typeof materialSet>) {
  const group = new THREE.Group(); group.position.set(b.x, b.y, b.z); group.rotation.y = -b.angle; parent.add(group);
  const mat = mats[b.kind];
  box(group, b.w, b.h, b.d, mat, 0, b.h / 2, 0);
  if (b.kind === 'steel' && Math.min(b.w, b.d) > .5) {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      box(group, .12, b.h + .03, .14, brightMetal, sx * (b.w / 2 - .06), b.h / 2, sz * (b.d / 2 - .07));
    }
    for (const sy of [.09, b.h - .09]) {
      box(group, b.w + .02, .11, .1, darkMetal, 0, sy, b.d / 2 + .01);
      box(group, b.w + .02, .11, .1, darkMetal, 0, sy, -b.d / 2 - .01);
    }
    if (b.d > 2) {
      box(group, b.w * .46, b.h * .85, .035, mats.steel, -b.w * .25, b.h / 2, b.d / 2 + .04);
      box(group, b.w * .46, b.h * .85, .035, mats.steel, b.w * .25, b.h / 2, b.d / 2 + .04);
      for (const sx of [-.28, .28]) cylinder(group, .035, b.h * .83, brightMetal, b.w * sx, b.h / 2, b.d / 2 + .095);
    }
  } else if (b.kind === 'wood') {
    const frame = new THREE.MeshStandardMaterial({ color: 0x675238, roughness: .9 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(group, .12, b.h + .025, .12, frame, sx * (b.w / 2 - .06), b.h / 2, sz * (b.d / 2 - .06));
    for (const sy of [.1, b.h - .1]) {
      box(group, b.w + .02, .13, .12, frame, 0, sy, b.d / 2);
      box(group, b.w + .02, .13, .12, frame, 0, sy, -b.d / 2);
      box(group, .12, .13, b.d + .02, frame, b.w / 2, sy, 0);
      box(group, .12, .13, b.d + .02, frame, -b.w / 2, sy, 0);
    }
    const stencil = new THREE.MeshBasicMaterial({ color: 0xddd3b2, transparent: true, opacity: .6 });
    for (const sx of [-1, 1]) box(group, b.w * .33, .025, .025, stencil, sx * b.w * .2, b.h * .62, b.d / 2 + .07);
  } else if (b.kind === 'tarp') {
    const plank = new THREE.MeshStandardMaterial({ color: 0x6f5a3b, roughness: .95 });
    for (const sx of [-1, 1]) box(group, .15, .23, b.d * .95, plank, sx * (b.w / 2 - .22), .12, 0);
    for (const z of [-b.d * .29, b.d * .29]) {
      box(group, b.w + .09, .06, .075, brass, 0, b.h + .02, z);
      box(group, b.w + .09, .07, .075, brass, 0, .27, z);
      box(group, .065, b.h, .075, brass, b.w / 2 + .035, b.h / 2, z);
      box(group, .065, b.h, .075, brass, -b.w / 2 - .035, b.h / 2, z);
    }
  } else if (b.kind === 'wall' && b.h > 2 && b.w > 1) {
    box(group, b.w, .13, b.d + .04, brightMetal, 0, .08, 0);
    if (b.d < .7) {
      box(group, b.w, .14, b.d + .08, darkMetal, 0, b.h - .1, 0);
      for (let x = -b.w / 2 + 1; x < b.w / 2 - .5; x += 2.2) {
        const light = new THREE.Mesh(new THREE.CircleGeometry(.16, 14), new THREE.MeshBasicMaterial({ color: 0xb9cbcb }));
        light.position.set(x, b.h * .65, b.d / 2 + .02); group.add(light);
      }
    }
  }
  return group;
}

function makeSea(): THREE.Mesh {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec3 vPos; uniform float uTime; void main(){ vec3 p=position; p.z += sin(p.x*.09+uTime*.42)*.24 + sin(p.y*.13-uTime*.33)*.12; vPos=p; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`,
    fragmentShader: `varying vec3 vPos; uniform float uTime; void main(){ float a=sin(vPos.x*.17+vPos.y*.13+uTime*.52); float b=sin(vPos.x*.33-vPos.y*.21-uTime*.37); float c0=sin(vPos.x*.78+sin(vPos.y*.18)*1.8+uTime*.7); float mixv=.48+a*.13+b*.09+c0*.035; vec3 dark=vec3(.043,.17,.22), light=vec3(.13,.36,.43); vec3 c=mix(dark,light,mixv); float glint=pow(max(0.,a*b),12.); c+=vec3(.37,.42,.39)*glint*.12; gl_FragColor=vec4(c,1.); }`,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(900, 900, 128, 128), mat);
  mesh.rotation.x = -Math.PI / 2; mesh.position.y = -4.2; return mesh;
}

function makeSky(): THREE.Mesh {
  const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, '#3978a7'); gradient.addColorStop(.38, '#7fb5d2'); gradient.addColorStop(.58, '#c2dce2'); gradient.addColorStop(.7, '#dbe5df'); gradient.addColorStop(1, '#b9d0d5');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1024, 512);
  let seed = 61231; const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  ctx.filter = 'blur(7px)';
  for (let i = 0; i < 33; i++) {
    const x = rand() * 1024, y = 94 + rand() * 180, size = 26 + rand() * 55;
    for (let j = 0; j < 5; j++) {
      ctx.fillStyle = `rgba(247,249,242,${.08 + rand() * .13})`;
      ctx.beginPath(); ctx.ellipse(x + (j - 2) * size * .63, y + rand() * 17, size * (.8 + rand() * .7), size * (.15 + rand() * .24), 0, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.filter = 'none';
  const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
  const sky = new THREE.Mesh(new THREE.SphereGeometry(550, 32, 18), new THREE.MeshBasicMaterial({ map, side: THREE.BackSide, depthWrite: false, fog: false }));
  sky.renderOrder = -100; return sky;
}

export function buildWorld(scene: THREE.Scene, quality: 'low' | 'medium' | 'high') {
  scene.background = new THREE.Color(0xb8d6e1);
  scene.fog = new THREE.FogExp2(0xb7d2da, .0034);
  const hemi = new THREE.HemisphereLight(0xddeef0, 0x596060, 2.0); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0cf, 3.1);
  sun.position.set(-34, 70, -18); sun.castShadow = quality !== 'low';
  sun.shadow.mapSize.set(quality === 'high' ? 2048 : 1024, quality === 'high' ? 2048 : 1024);
  sun.shadow.camera.left = -52; sun.shadow.camera.right = 52; sun.shadow.camera.top = 52; sun.shadow.camera.bottom = -52;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 150; sun.shadow.bias = -.0004;
  scene.add(sun);
  const mats = materialSet();
  const ship = new THREE.Group(); scene.add(ship);
  const deck = box(ship, 27.4, .4, 75.5, mats.deck, 0, -.22, 0); deck.castShadow = false;
  const hull = new THREE.MeshStandardMaterial({ color: 0x344b55, roughness: .75, metalness: .43 });
  const waterline = new THREE.MeshStandardMaterial({ color: 0x8d423c, roughness: .84, metalness: .28 });
  box(ship, 27.4, 3.1, 75.5, hull, 0, -1.93, 0);
  box(ship, 27.5, .27, 75.6, waterline, 0, -3.2, 0);
  for (const b of MAP_BLOCKS) makeBlock(ship, b, mats);
  // Ribs, hatches and drainage grates make the deck readable at running speed.
  for (let z = -35; z <= 35; z += 5) {
    box(ship, 27.2, .028, .045, darkMetal, 0, .018, z);
    for (const x of [-12.1, 12.1]) box(ship, .48, .025, 1.35, darkMetal, x, .02, z + 1.3);
  }
  for (const x of [-12.9, 12.9]) {
    for (let z = -35; z <= 35; z += 3.6) {
      cylinder(ship, .035, 1.65, brass, x, .86, z);
      if (z < 34) box(ship, .055, .045, 3.6, brightMetal, x, 1.54, z + 1.8);
    }
  }
  // Two ochre gantries. Their overhead beams are set above the combat space.
  const cranePaint = new THREE.MeshStandardMaterial({ color: 0xb39955, metalness: .58, roughness: .58 });
  for (const z of [-24.5, 22.2]) {
    for (const x of [-13.1, 13.1]) {
      box(ship, .4, 8.5, .48, cranePaint, x, 4.3, z);
      box(ship, 2.7, .28, .34, cranePaint, x > 0 ? x - 1.4 : x + 1.4, 8.38, z);
      cylinder(ship, .05, 8.1, darkMetal, x > 0 ? x - 1.5 : x + 1.5, 4.4, z, 0, x > 0 ? -.24 : .24);
    }
    box(ship, 26.5, .38, .5, cranePaint, 0, 8.52, z);
    for (let x = -11.7; x < 12; x += 2.8) cylinder(ship, .04, 1.25, darkMetal, x, 7.77, z);
  }
  // Cabin fittings are decorative and do not create invisible obstructions.
  for (const s of [-1, 1]) {
    const z = s * 34.6;
    box(ship, 8, 1.0, .2, darkMetal, 0, 5.1, z);
    for (const x of [-5.3, -2.7, 0, 2.7, 5.3]) {
      const porthole = new THREE.Mesh(new THREE.CylinderGeometry(.22, .22, .065, 18), brightMetal);
      porthole.rotation.x = Math.PI / 2; porthole.position.set(x, 2.3, s * 28.65); ship.add(porthole);
      const glass = new THREE.Mesh(new THREE.CircleGeometry(.16, 18), new THREE.MeshStandardMaterial({ color: 0x334e57, metalness: .48, roughness: .2 }));
      glass.position.set(x, 2.3, s * 28.59); if (s > 0) glass.rotation.y = Math.PI; ship.add(glass);
    }
    for (const x of [-3.8, 3.8]) box(ship, .9, .55, 1.5, brightMetal, x, 4.52, s * 32.8);
  }
  const sea = makeSea(); scene.add(sea);
  const sky = makeSky(); scene.add(sky);
  // Distant silhouettes: cranes and freighters stay outside the playable ship.
  const distant = new THREE.MeshStandardMaterial({ color: 0x7f9da4, transparent: true, opacity: .68, roughness: 1 });
  for (const x of [-118, 135]) {
    box(scene, 24, 5, 44, distant, x, -2.5, -85);
    box(scene, 13, 6, 16, distant, x, 3.1, -93);
  }
  return { sea, sky, sun, mats, dispose: () => { ship.traverse(o => { if (o instanceof THREE.Mesh) o.geometry.dispose(); }); sky.geometry.dispose(); (sky.material as THREE.Material).dispose(); } };
}

export function createHuman(team: Team): HumanRig {
  const uniform = team === 'red' ? accentRed : accentBlue;
  const root = new THREE.Group();
  const waist = new THREE.Group(); waist.position.y = .86; root.add(waist);
  box(waist, .51, .7, .28, uniform, 0, .1, 0);
  box(waist, .56, .42, .32, darkMetal, 0, .12, .08);
  for (const x of [-.21, .21]) box(waist, .15, .23, .12, metal, x, .1, .26);
  box(waist, .33, .2, .25, uniform, 0, -.3, 0);
  const head = new THREE.Group(); head.position.set(0, 1.46, 0); root.add(head);
  const face = new THREE.Mesh(new THREE.SphereGeometry(.215, 12, 10), skin); face.castShadow = true; head.add(face);
  box(head, .47, .16, .43, uniform, 0, .17, -.03);
  box(head, .34, .085, .25, darkMetal, 0, .08, .15);
  box(head, .16, .09, .035, brightMetal, 0, .01, .22);
  const legs: THREE.Group[] = [], arms: THREE.Group[] = [];
  for (const sign of [-1, 1]) {
    const leg = new THREE.Group(); leg.position.set(sign * .16, .66, 0); root.add(leg); legs.push(leg);
    box(leg, .19, .48, .2, uniform, 0, -.23, 0);
    box(leg, .21, .17, .26, darkMetal, 0, -.54, .025);
    const arm = new THREE.Group(); arm.position.set(sign * .37, 1.29, 0); root.add(arm); arms.push(arm);
    box(arm, .18, .44, .2, uniform, 0, -.2, .075);
    box(arm, .14, .19, .18, glove, 0, -.48, .18);
    arm.rotation.x = -.57; arm.rotation.z = sign * .13;
  }
  const gun = new THREE.Group(); gun.position.set(.02, 1.04, .35); root.add(gun);
  box(gun, .13, .15, .58, darkMetal, 0, 0, .24);
  box(gun, .075, .075, .46, darkMetal, 0, .04, .71);
  box(gun, .09, .23, .12, darkMetal, 0, -.17, .22);
  box(root, .42, .12, .2, darkMetal, 0, 1.44, -.24); // backpack strap silhouette
  return { root, leftLeg: legs[0], rightLeg: legs[1], leftArm: arms[0], rightArm: arms[1], head, gun };
}
export function poseHuman(rig: HumanRig, t: number, move: number, crouch: boolean, alive: boolean, firing: boolean, reloading: boolean) {
  const swing = Math.sin(t * (move > .1 ? 10 : 2)) * Math.min(move / 5, 1);
  rig.leftLeg.rotation.x = swing * .43;
  rig.rightLeg.rotation.x = -swing * .43;
  rig.leftArm.rotation.x = -.6 - swing * .09 + (reloading ? .56 : 0);
  rig.rightArm.rotation.x = -.56 + swing * .09 - (firing ? .12 : 0);
  rig.head.rotation.y = Math.sin(t * .75) * .045;
  rig.root.scale.y = crouch ? .67 : 1;
  rig.root.rotation.x = alive ? 0 : -1.23;
  rig.root.position.y = alive ? 0 : .3;
}

export function createViewModel(id: WeaponId): { root: THREE.Group; magazine: THREE.Group; leftHand: THREE.Group; flash: THREE.Mesh } {
  const root = new THREE.Group(); root.position.set(.42, -.48, -1.13); root.rotation.y = -.08; root.scale.setScalar(.72);
  const bodyMat = id === 'vandal' ? new THREE.MeshStandardMaterial({ color: 0x2a3334, metalness: .6, roughness: .5 }) :
    id === 'sentinel' ? new THREE.MeshStandardMaterial({ color: 0x646e65, metalness: .55, roughness: .53 }) :
    id === 'vector' ? new THREE.MeshStandardMaterial({ color: 0x3a4848, metalness: .5, roughness: .6 }) : darkMetal;
  const long = id === 'longshot' ? 1.27 : id === 'revolver' ? .43 : id === 'knife' ? .47 : id === 'vector' ? .65 : .98;
  const weapon = new THREE.Group(); weapon.position.set(0, .06, 0); root.add(weapon);
  if (id === 'knife') {
    box(weapon, .12, .12, .4, glove, 0, -.08, .12);
    const blade = box(weapon, .075, .025, .6, brightMetal, 0, -.005, -.33); blade.rotation.x = -.08;
    box(weapon, .24, .07, .055, brass, 0, 0, -.1);
  } else {
    box(weapon, .18, .2, long * .7, bodyMat, 0, 0, -.1);
    box(weapon, .12, .1, long * .55, darkMetal, 0, .035, -long * .58);
    cylinder(weapon, id === 'longshot' ? .05 : .035, long * .48, darkMetal, 0, .03, -long * .85, Math.PI / 2);
    box(weapon, .17, .18, .29, bodyMat, 0, -.03, .34);
    box(weapon, .16, .035, long * .48, brightMetal, 0, .125, -.2);
    box(weapon, .045, .09, .05, darkMetal, 0, .2, -long * .7);
    box(weapon, .08, .045, .06, brightMetal, 0, .17, .12);
    box(weapon, .08, .22, .11, glove, 0, -.2, .17); // pistol grip
    for (const x of [-.085, .085]) {
      box(weapon, .018, .025, long * .34, darkMetal, x, .025, -long * .55);
      for (let j = 0; j < 5; j++) box(weapon, .025, .034, .018, brightMetal, x, .01, -long * (.42 + j * .08));
    }
    cylinder(weapon, .025, .18, brass, .07, -.06, -.05, Math.PI / 2);
    if (id === 'longshot') {
      cylinder(weapon, .105, .52, darkMetal, 0, .22, -.23, Math.PI / 2);
      cylinder(weapon, .12, .055, brightMetal, 0, .22, -.51, Math.PI / 2);
      box(weapon, .27, .05, .08, darkMetal, 0, .12, -.21);
    }
    if (id === 'vandal') box(weapon, .21, .055, .47, wood, 0, -.08, -.48);
    if (id === 'sentinel') for (const x of [-.1, .1]) box(weapon, .032, .08, .41, brightMetal, x, -.04, -.47);
  }
  const magazine = new THREE.Group(); magazine.position.set(0, -.14, -.04); weapon.add(magazine);
  if (id !== 'knife') { const mag = box(magazine, id === 'revolver' ? .12 : .15, id === 'longshot' ? .12 : .27, .16, darkMetal, 0, -.08, 0); if (id === 'vandal') mag.rotation.x = -.19; }
  const rightArm = new THREE.Group(); rightArm.position.set(.16, -.2, .23); root.add(rightArm);
  box(rightArm, .18, .18, .48, teamSleeve(), .06, -.13, .26);
  box(rightArm, .19, .17, .23, glove, -.02, -.02, -.06);
  const leftHand = new THREE.Group(); leftHand.position.set(-.25, -.15, -.34); root.add(leftHand);
  box(leftHand, .19, .18, .49, teamSleeve(), -.06, -.14, .23);
  box(leftHand, .2, .15, .22, glove, .02, -.02, -.09);
  const flash = new THREE.Mesh(new THREE.ConeGeometry(.12, .42, 7), new THREE.MeshBasicMaterial({ color: 0xffe9ac, transparent: true, opacity: .92, depthWrite: false }));
  flash.rotation.x = -Math.PI / 2; flash.position.set(0, .03, -long * 1.13); flash.visible = false; root.add(flash);
  return { root, magazine, leftHand, flash };
}
function teamSleeve() { return new THREE.MeshStandardMaterial({ color: 0x253b42, roughness: .91 }); }
