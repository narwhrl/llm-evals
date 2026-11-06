import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createHouse, createStation, createChurch, windowMaterials } from './buildings.js';
import { sampleTrack, TRACK_LENGTH } from './railway.js';

const TAU = Math.PI * 2;
let seed = 73421;
function random() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
const material = (color, roughness = .85, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, ...extra });
const palette = {
  soil: material(0x9c8961), stone: material(0xc8bd9e), curb: material(0xd5c7a8),
  road: material(0xc6bca5), wood: material(0x68513b), dark: material(0x35433e),
  rail: material(0x777d73, .35, { metalness: .75 }), tie: material(0x645747),
  ballast: material(0x99917c), bridge: material(0x647d72, .65, { metalness: .2 }),
  cream: material(0xf6e3b8), trunk: material(0x7b6044), brass: material(0xc79c4f, .4, { metalness: .55 }),
};
const unitBox = new THREE.BoxGeometry(1, 1, 1);
const leaves = [0x70814b, 0x8b995d, 0x526e4e, 0x9eaa65, 0xb3ab61].map(c => material(c));
const leafGeometry = new THREE.IcosahedronGeometry(1, 2);
const pebbleGeometry = new THREE.IcosahedronGeometry(1, 0);

function mesh(parent, geometry, mat, x = 0, y = 0, z = 0) {
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(x, y, z);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}
function box(parent, w, h, d, mat, x, y, z) {
  const object = mesh(parent, unitBox, mat, x, y, z);
  object.scale.set(w, h, d);
  return object;
}
function cylinder(parent, rt, rb, height, mat, x, y, z, segments = 12) {
  return mesh(parent, new THREE.CylinderGeometry(rt, rb, height, segments), mat, x, y, z);
}
function beam(parent, from, to, radius, mat) {
  const start = new THREE.Vector3(...from), end = new THREE.Vector3(...to);
  const object = cylinder(parent, radius, radius, start.distanceTo(end), mat, 0, 0, 0, 8);
  object.position.copy(start).lerp(end, .5);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
  return object;
}
function textureCanvas(size, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d'), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
function textLabel(text, color = '#e9d7aa', background = '#3d554b', width = 1024, height = 128) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = background; context.fillRect(0, 0, width, height);
  context.strokeStyle = color; context.lineWidth = 2; context.strokeRect(9, 9, width - 18, height - 18);
  context.font = '40px Georgia'; context.fillStyle = color; context.textAlign = 'center'; context.textBaseline = 'middle';
  context.fillText(text, width / 2, height / 2);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return material(0xffffff, .8, { map: texture });
}
const riverX = z => 3.35 + .35 * Math.sin(z * .55);

function makeLand(parent) {
  const woodMap = textureCanvas(512, (ctx, size) => {
    ctx.fillStyle = '#896344'; ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 470; i++) {
      const y = random() * size;
      ctx.strokeStyle = `rgba(${random() > .5 ? '42,24,12' : '235,190,123'},${.025 + random() * .1})`;
      ctx.lineWidth = .4 + random() * 2.1; ctx.beginPath(); ctx.moveTo(0, y);
      for (let x = 0; x <= size; x += 16) ctx.lineTo(x, y + Math.sin(x * .012 + i) * (1 + 4 * random()));
      ctx.stroke();
    }
  });
  woodMap.wrapS = woodMap.wrapT = THREE.RepeatWrapping;
  const wood = material(0xffffff, .66, { map: woodMap, bumpMap: woodMap, bumpScale: .018 });
  mesh(parent, new RoundedBoxGeometry(21.3, .73, 13.6, 4, .15), wood, 0, -.55, 0);
  mesh(parent, new RoundedBoxGeometry(21.55, .15, 13.83, 3, .1), material(0x503d2e), 0, -.93, 0);
  const rim = material(0xb08b60, .65);
  for (const z of [-6.59, 6.59]) box(parent, 20.9, .2, .24, rim, 0, -.12, z);
  for (const x of [-10.37, 10.37]) box(parent, .24, .2, 13.4, rim, x, -.12, 0);
  const grassMap = textureCanvas(256, (ctx, size) => {
    ctx.fillStyle = '#9da36b'; ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 22000; i++) {
      ctx.fillStyle = random() > .5 ? '#d3c28a27' : '#375f3422';
      ctx.fillRect(random() * size, random() * size, 1 + random() * 2, 1 + random() * 2);
    }
  });
  grassMap.wrapS = grassMap.wrapT = THREE.RepeatWrapping; grassMap.repeat.set(7, 5);
  const grass = material(0xffffff, 1, { map: grassMap, bumpMap: grassMap, bumpScale: .035 });
  for (const side of [-1, 1]) {
    const shape = new THREE.Shape(); const edge = side * 10.22;
    shape.moveTo(edge, 6.45);
    for (let i = 0; i <= 100; i++) {
      const z = -6.45 + i * 12.9 / 100;
      shape.lineTo(riverX(z) + side * .88, -z);
    }
    shape.lineTo(edge, -6.45); shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: .26, bevelEnabled: false });
    const land = mesh(parent, geo, [grass, palette.soil], 0, -.23, 0);
    land.rotation.x = -Math.PI / 2;
  }
  const label = mesh(parent, new THREE.PlaneGeometry(3.25, .32), textLabel('W I L L O W B R O O K'), -3.8, -.53, 6.807);
  label.rotation.x = -.02;
  for (const x of [-5.25, -2.35]) {
    const screw = cylinder(parent, .025, .025, .015, palette.brass, x, -.53, 6.82, 8);
    screw.rotation.x = Math.PI / 2;
  }
  return grass;
}

function makeRiver(parent) {
  const positions = [], indices = [];
  for (let i = 0; i <= 100; i++) {
    const z = -6.45 + i * 12.9 / 100;
    positions.push(riverX(z) - .9, -.065, z, riverX(z) + .9, -.065, z);
    if (i < 100) { const n = i * 2; indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3); }
  }
  const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  const water = mesh(parent, geometry, material(0x558d8b, .28, { metalness: .22, side: THREE.DoubleSide }));
  water.castShadow = false;
  const rippleMat = material(0xb2d0b6, .4, { transparent: true, opacity: .38 });
  const ripples = new THREE.Group(); parent.add(ripples);
  for (let i = 0; i < 75; i++) {
    const z = random() * 12.5 - 6.25;
    const x = riverX(z) + (random() - .5) * 1.4;
    const ripple = box(ripples, .1 + random() * .3, .008, .014, rippleMat, x, -.047, z);
    ripple.rotation.y = -.18;
  }
  for (let i = 0; i < 100; i++) {
    const z = random() * 12.65 - 6.32;
    const rock = mesh(parent, pebbleGeometry, palette.stone, riverX(z) + (i % 2 ? 1 : -1) * (.82 + random() * .15), .005, z);
    rock.scale.set(.07 + random() * .13, .035 + random() * .09, .08 + random() * .13);
    rock.rotation.set(random(), random(), random());
  }
  return ripples;
}

class RailCurve extends THREE.Curve {
  constructor(offset, height) { super(); this.offset = offset; this.height = height; }
  getPoint(t, target = new THREE.Vector3()) {
    const p = sampleTrack(t * TRACK_LENGTH);
    return target.set(p.x - p.tz * this.offset, this.height, p.z + p.tx * this.offset);
  }
}
function makeTrack(parent) {
  const count = 500; const positions = [], indices = [];
  for (let i = 0; i <= count; i++) {
    const p = sampleTrack(i / count * TRACK_LENGTH);
    positions.push(p.x - p.tz * .47, .062, p.z + p.tx * .47, p.x + p.tz * .47, .062, p.z - p.tx * .47);
    if (i < count && Math.abs(p.x - riverX(p.z)) > 1.08) {
      const n = i * 2; indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
    }
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); geo.setIndex(indices); geo.computeVertexNormals();
  mesh(parent, geo, palette.ballast);
  for (const offset of [-.245, .245]) mesh(parent, new THREE.TubeGeometry(new RailCurve(offset, .205), 640, .028, 6, true), palette.rail);
  for (let s = 0; s < TRACK_LENGTH; s += .235) {
    const p = sampleTrack(s);
    const tie = box(parent, .105, .095, .77, palette.tie, p.x, .127, p.z);
    tie.rotation.y = -Math.atan2(p.tz, p.tx);
    if (Math.abs(p.x - riverX(p.z)) > 1.1) for (let j = 0; j < 4; j++) {
      const offset = (random() - .5) * .92;
      const rock = mesh(parent, pebbleGeometry, palette.stone, p.x - p.tz * offset, .085, p.z + p.tx * offset);
      rock.scale.set(.045, .025, .035);
    }
  }
  for (const z of [-4, 4]) {
    const x = riverX(z); const half = 1.18;
    box(parent, half * 2 + .2, .16, 1.02, palette.bridge, x, .005, z);
    for (const end of [-1, 1]) box(parent, .3, .34, 1.15, palette.stone, x + end * half, -.04, z);
    for (const side of [-.56, .56]) {
      box(parent, half * 2 + .15, .07, .065, palette.bridge, x, .79, z + side);
      box(parent, half * 2 + .15, .08, .065, palette.bridge, x, .24, z + side);
      for (let j = 0; j <= 4; j++) {
        const bx = x - half + j * half / 2;
        box(parent, .07, .69, .07, palette.bridge, bx, .46, z + side);
        if (j < 4) {
          beam(parent, [bx, .25, z + side], [bx + half / 2, .77, z + side], .028, palette.bridge);
          beam(parent, [bx, .77, z + side], [bx + half / 2, .25, z + side], .028, palette.bridge);
        }
      }
    }
  }
}

function road(parent, x, z, width, depth) {
  box(parent, width + .12, .045, depth + .12, palette.curb, x, .05, z);
  box(parent, width, .052, depth, palette.road, x, .056, z);
}
function tree(parent, x, z, size = 1, variant = 0) {
  const group = new THREE.Group(); parent.add(group); group.position.set(x, .03, z); group.scale.setScalar(size);
  cylinder(group, .06, .105, .83, palette.trunk, 0, .42, 0, 9);
  if (variant === 1) {
    for (let j = 0; j < 3; j++) cylinder(group, .025, .48 - j * .1, .8, leaves[2], 0, .95 + j * .38, 0, 9);
  } else {
    const colors = [leaves[Math.floor(random() * leaves.length)], leaves[Math.floor(random() * leaves.length)]];
    for (let i = 0; i < 5; i++) {
      const angle = i * 2.4;
      const canopy = mesh(group, leafGeometry, colors[i % 2], Math.sin(angle) * (i ? .24 : 0), 1.17 + (i === 0 ? .36 : random() * .22), Math.cos(angle) * (i ? .24 : 0));
      canopy.scale.set(.44 + random() * .1, .5 + random() * .15, .42 + random() * .09);
    }
  }
}
function fence(parent, x1, z1, x2, z2, color = palette.cream) {
  const length = Math.hypot(x2 - x1, z2 - z1);
  for (let i = 0; i <= Math.ceil(length / .28); i++) {
    const t = i / Math.ceil(length / .28);
    box(parent, .055, .39, .055, color, x1 + (x2 - x1) * t, .22, z1 + (z2 - z1) * t);
  }
  for (const y of [.16, .33]) beam(parent, [x1, y, z1], [x2, y, z2], .026, color);
}

function makeTown(parent, lights) {
  road(parent, -2.6, 1.03, 7.3, .65);
  road(parent, -2.3, -.32, .62, 2.65);
  road(parent, -2.05, -1.36, 7.4, .58);
  road(parent, 1.12, -.05, .62, 2.7);
  road(parent, 3.45, .85, 5.4, .52);
  // A pedestrian bridge continues the village lane across the river.
  const crossing = riverX(.85);
  box(parent, 2.35, .18, .69, palette.wood, crossing, .16, .85);
  for (const z of [.49, 1.21]) {
    beam(parent, [crossing - 1.16, .6, z], [crossing + 1.16, .6, z], .035, palette.cream);
    for (let i = 0; i < 6; i++) box(parent, .045, .48, .045, palette.cream, crossing - 1.16 + i * .464, .38, z);
  }
  for (let i = 0; i < 21; i++) box(parent, .085, .025, .65, palette.curb, crossing - 1.08 + i * .108, .264, .85);
  const station = createStation(); station.position.set(-1.15, .16, 2.24); parent.add(station);
  box(parent, 4.9, .22, 1.43, palette.stone, -1.15, .1, 2.89);
  box(parent, 4.95, .055, .15, palette.cream, -1.15, .235, 3.61);
  for (let i = 0; i < 28; i++) box(parent, .013, .004, 1.35, palette.curb, -3.5 + i * .174, .214, 2.87);
  const houses = [
    [-5.25, -2.45, { width: 1.45, depth: 1.15, height: 1.22, color: 0xe7cd9e, roofColor: 0x805043 }],
    [-3.32, -2.5, { width: 1.3, depth: 1.3, height: 1.75, color: 0xdbbc89, roofColor: 0x596b62 }],
    [-1.25, -2.45, { width: 1.55, depth: 1.25, height: 1.4, color: 0xe6d6b6, roofColor: 0x9b5949 }],
    [.85, -2.48, { width: 1.3, depth: 1.2, height: 1.12, color: 0xc2c9ab, roofColor: 0x6f7664 }],
    [-4.65, -.16, { width: 1.55, depth: 1.25, height: 1.35, color: 0xe7c392, roofColor: 0xa26348, style: 'bakery', label: 'BAKERY' }],
    [-.7, -.15, { width: 1.55, depth: 1.2, height: 1.48, color: 0xe8dbc0, roofColor: 0x717c70, style: 'cafe', label: 'THE CORNER' }],
    [6, -1.45, { width: 1.4, depth: 1.25, height: 1.2, color: 0xe6c792, roofColor: 0x975e49 }],
  ];
  for (const [x, z, options] of houses) {
    const house = createHouse(options); house.position.set(x, .08, z); parent.add(house);
    box(parent, options.width + .25, .07, options.depth + .35, palette.curb, x, .055, z + .05);
  }
  const church = createChurch(); church.position.set(-6.7, .055, .2); church.rotation.y = Math.PI / 2; church.scale.setScalar(.81); parent.add(church);
  road(parent, -6.35, 1.05, .85, .65);
  fence(parent, 5.05, -2.45, 7.05, -2.45);
  fence(parent, 7.05, -2.45, 7.05, -.65);
  road(parent, 6, -.05, .48, 1.3);
  const planted = [[-9.4, 3.4, 1.1], [-7.2, -.7, 1.15], [-8.2, -4, 1.1], [-6.8, -4.95, 1], [-4.9, -5.25, 1.15], [-2.8, -5.3, .85], [-.6, -5.3, 1], [1.5, -5.2, .8], [5.7, -5.2, 1], [7.5, -4.5, 1.2], [9.5, -3.2, 1], [6.9, .1, 1.05], [8.6, 4.6, 1], [6.5, 5.2, 1.15], [9.4, 2.9, 1.2], [1.55, 5.4, .7], [-6.1, 4.95, .95], [-8.2, 4.4, 1.15], [-9.55, 2.4, .8], [-9.55, -2.2, .85], [2, -.6, .62], [4.8, -2.4, .7], [5.25, 2.3, .9], [6.65, 1.9, .75], [-7.3, -1.9, .8], [-3.5, 2.1, .55]];
  for (let i = 0; i < planted.length; i++) tree(parent, ...planted[i], i % 6 === 0 ? 1 : 0);
  for (let i = 0; i < 45; i++) {
    const z = random() * 12 - 6, x = random() * 19.3 - 9.65;
    if (Math.abs(x - riverX(z)) < 1.1 || (Math.abs(z) < 4.7 && Math.abs(x) < 9.2)) continue;
    const shrub = mesh(parent, leafGeometry, leaves[i % leaves.length], x, .16, z);
    shrub.scale.set(.22, .2, .25);
  }
  fence(parent, -5.4, 5.1, -2.2, 5.1);
  fence(parent, -6.9, -5.15, -3.4, -5.15);
  // Small cultivated plots make the quiet bank read as part of the village.
  box(parent, 1.45, .05, 1.22, material(0x80714e), 5.85, .06, 3.1);
  for (let row = 0; row < 5; row++) for (let col = 0; col < 7; col++) {
    const plant = mesh(parent, pebbleGeometry, leaves[row % 3], 5.23 + col * .2, .15, 2.64 + row * .23);
    plant.scale.set(.08, .12, .08);
  }
  const glowMaterial = material(0xffe4a3, .3, { emissive: 0xffbf60, emissiveIntensity: .15 });
  for (const [x, z] of [[-5.8, 1.45], [-3.05, 1.46], [.86, 1.5], [1.62, -1.04], [-3.1, -1.02], [-5.9, -1.04], [5.3, 1.32], [-3.45, 3.29], [1.16, 3.28]]) {
    cylinder(parent, .035, .055, 1.18, palette.dark, x, .65, z, 8);
    cylinder(parent, .09, .11, .12, palette.dark, x, .11, z);
    box(parent, .18, .23, .18, glowMaterial, x, 1.3, z);
    cylinder(parent, 0, .155, .15, palette.dark, x, 1.49, z, 4).rotation.y = Math.PI / 4;
    for (const dx of [-.09, .09]) for (const dz of [-.09, .09]) box(parent, .02, .23, .02, palette.dark, x + dx, 1.3, z + dz);
    const light = new THREE.PointLight(0xffd28d, 0, 3.4, 2); light.position.set(x, 1.28, z); lights.push(light); parent.add(light);
  }
  windowMaterials.push(glowMaterial);
  // Tiny passengers and a bicycle-scale scene give the model a readable scale.
  const clothing = [material(0xa75e43), material(0x466b70), material(0xd3af63)];
  const skin = material(0xd6ab80);
  for (const [i, x, z] of [[0, -2.7, 3.25], [1, -.8, 3.32], [2, .4, 3.25], [1, -2.1, .87], [0, -4.1, .8], [2, 5.1, .8]]) {
    const y = z > 3 ? .24 : .08;
    cylinder(parent, .045, .065, .19, clothing[i], x, y + .19, z, 8);
    mesh(parent, new THREE.SphereGeometry(.052, 8, 6), skin, x, y + .33, z);
    for (const dx of [-.027, .027]) cylinder(parent, .017, .018, .12, palette.dark, x + dx, y + .06, z, 6);
  }
}

function makeTrain() {
  const green = material(0x294f49, .4, { metalness: .18 });
  const red = material(0x984b38, .6);
  const black = material(0x303633, .55, { metalness: .2 });
  const roof = material(0x4c5249, .55);
  const glass = material(0x90aaa0, .3, { emissive: 0xffc574, emissiveIntensity: 0 });
  windowMaterials.push(glass);
  const wheelGeometry = new THREE.CylinderGeometry(.145, .145, .07, 16);
  const cars = [], wheels = [];
  for (let i = 0; i < 3; i++) {
    const car = new THREE.Group(); cars.push(car); const length = i === 0 ? 1.22 : 1.36;
    box(car, length, .11, .52, black, 0, .3, 0);
    box(car, length + .06, .1, .59, i === 0 ? red : green, 0, .38, 0);
    for (const x of [-.43, .43]) for (const z of [-.28, .28]) {
      const wheel = mesh(car, wheelGeometry, black, x, .265, z); wheel.rotation.x = Math.PI / 2; wheels.push(wheel);
      const hub = cylinder(car, .055, .055, .075, palette.brass, x, .265, z, 12); hub.rotation.x = Math.PI / 2;
    }
    if (i === 0) {
      const boiler = cylinder(car, .215, .215, .73, green, .22, .65, 0, 20); boiler.rotation.z = Math.PI / 2;
      for (const x of [-.05, .4]) {
        const ring = mesh(car, new THREE.TorusGeometry(.219, .018, 6, 20), palette.brass, x, .65, 0); ring.rotation.y = Math.PI / 2;
      }
      const front = cylinder(car, .19, .19, .04, black, .6, .65, 0, 16); front.rotation.z = Math.PI / 2;
      box(car, .46, .53, .56, green, -.4, .71, 0);
      for (const z of [-.287, .287]) box(car, .29, .26, .018, glass, -.4, .78, z);
      mesh(car, new RoundedBoxGeometry(.59, .1, .7, 2, .04), roof, -.4, 1.02, 0);
      cylinder(car, .09, .065, .32, black, .4, .98, 0, 12);
      cylinder(car, .12, .09, .075, palette.brass, .4, 1.16, 0);
      cylinder(car, .075, .1, .14, palette.brass, .02, .9, 0);
      const lamp = cylinder(car, .055, .055, .05, material(0xffe7b1, .3, { emissive: 0xffbf69, emissiveIntensity: .7 }), .66, .72, 0, 12); lamp.rotation.z = Math.PI / 2;
      for (const z of [-.33, .33]) beam(car, [-.45, .27, z], [.45, .27, z], .025, palette.rail);
      const bumper = box(car, .15, .17, .7, red, .7, .35, 0); bumper.rotation.z = .12;
    } else {
      box(car, 1.27, .52, .57, palette.cream, 0, .68, 0);
      box(car, 1.29, .19, .59, green, 0, .49, 0);
      for (const z of [-.296, .296]) {
        for (const x of [-.43, -.14, .15, .44]) {
          box(car, .235, .27, .014, green, x, .76, z);
          box(car, .19, .22, .018, glass, x, .77, z + Math.sign(z) * .01);
        }
        box(car, 1.25, .023, .017, palette.brass, 0, .58, z + Math.sign(z) * .012);
      }
      mesh(car, new RoundedBoxGeometry(1.44, .14, .7, 3, .065), roof, 0, 1.01, 0);
      for (const x of [-.65, .65]) box(car, .025, .26, .22, green, x, .76, 0);
    }
    for (const x of [-.79, .79]) box(car, .18, .045, .055, black, x, .31, 0);
  }
  return { cars, wheels };
}

function mergeStatic(group) {
  group.updateMatrixWorld(true);
  const batches = new Map(), originals = [];
  group.traverse(object => {
    if (!object.isMesh || Array.isArray(object.material) || object.material.transparent) return;
    const key = object.material.uuid;
    if (!batches.has(key)) batches.set(key, { material: object.material, geometries: [] });
    const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
    if (geometry.getAttribute('uv')) geometry.deleteAttribute('uv');
    // Textured meshes retain their UVs and remain separate from the solid-color batches.
    if (object.material.map) { geometry.dispose(); return; }
    geometry.applyMatrix4(object.matrixWorld);
    batches.get(key).geometries.push(geometry); originals.push(object);
  });
  for (const { material: mat, geometries } of batches.values()) {
    if (!geometries.length) continue;
    mesh(group, mergeGeometries(geometries), mat);
    for (const geometry of geometries) geometry.dispose();
  }
  for (const object of originals) object.removeFromParent();
}

export function createWorld(scene) {
  const world = new THREE.Group(); scene.add(world);
  const lights = [];
  makeLand(world);
  const ripples = makeRiver(world);
  makeTrack(world);
  makeTown(world, lights);
  mergeStatic(world);
  const train = makeTrain();
  for (const car of train.cars) scene.add(car);
  const smokeMaterial = new THREE.MeshStandardMaterial({ color: 0xf1eee0, transparent: true, opacity: .42, roughness: 1, depthWrite: false });
  const smoke = Array.from({ length: 8 }, () => {
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), smokeMaterial.clone());
    scene.add(puff); return puff;
  });
  return { ...train, lights, windowMaterials, ripples, smoke };
}
