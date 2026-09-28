import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mat, random } from './materials.js';
import { box, cylinder, tube, floorMark, sign, crate, barrel, pallet, sandbags, container, barrier, lamp, vehicle, bulletScars } from './geometry.js';

const flat = (color, opacity = 1) => new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, side: THREE.DoubleSide });

function plane(parent, material, x, y, z, w, d) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function wall(parent, x, z, w, d, h = 4.6, material = mat.plaster) {
  box(parent, mat.concrete, x, .18 + h / 2, z, w + .1, h, d + .1);
  box(parent, material, x, .2 + h / 2, z, w, h - .12, d);
  box(parent, mat.dark, x, .18 + h, z, w + .16, .12, d + .16, false);
}

function windowFrame(parent, x, y, z, w, h, rotation = 0) {
  const root = new THREE.Group();
  root.position.set(x, y, z);
  root.rotation.y = rotation;
  parent.add(root);
  box(root, mat.dark, 0, 0, 0, w + .18, h + .18, .11);
  box(root, mat.glass, 0, 0, .07, w, h, .025, false);
  box(root, mat.steel, 0, 0, .11, .07, h, .06, false);
  box(root, mat.steel, 0, 0, .11, w, .07, .06, false);
  return root;
}

function puddle(parent, x, z, sx, sz, ripples, reflected = false) {
  const pool = new THREE.Mesh(new THREE.CircleGeometry(1, 32), mat.puddle);
  pool.rotation.x = -Math.PI / 2;
  pool.scale.set(sx, sz, 1);
  pool.position.set(x, .115, z);
  parent.add(pool);
  if (reflected) {
    const mirror = new Reflector(new THREE.CircleGeometry(1, 32), {
      textureWidth: 512,
      textureHeight: 512,
      color: 0x435960,
      clipBias: .003,
    });
    mirror.rotation.x = -Math.PI / 2;
    mirror.scale.set(sx * .92, sz * .92, 1);
    mirror.position.set(x, .117, z);
    parent.add(mirror);
  }
  const glint = plane(parent, flat(0x92adb0, .12), x - sx * .2, .119, z - sz * .05, sx * .65, sz * .12);
  glint.rotation.z = -.14;
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(.1, .113, 24), flat(0xc7e7e5, .34));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x + (random() - .5) * sx, .127, z + (random() - .5) * sz);
    parent.add(ring);
    ripples.push({ mesh: ring, phase: random(), scale: .8 + random() * .6 });
  }
}

function site(parent, letter, x, z, radius) {
  const paint = new THREE.Mesh(new THREE.RingGeometry(radius - .1, radius, 48), flat(0xd9d4c3, .86));
  paint.rotation.x = -Math.PI / 2;
  paint.position.set(x, .15, z);
  parent.add(paint);
  floorMark(parent, letter, x, z, radius * 1.45, radius * 1.45, '#dcd6c6', 132);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    const dash = box(parent, mat.yellow, x + Math.sin(a) * (radius + .35), .155, z + Math.cos(a) * (radius + .35), .6, .012, .07, false);
    dash.rotation.y = -a;
  }
}

function ladder(parent, x, z, bottom, top, width = .65, rotation = 0) {
  const root = new THREE.Group();
  root.position.set(x, 0, z);
  root.rotation.y = rotation;
  parent.add(root);
  for (const sx of [-width / 2, width / 2]) tube(root, mat.steel, [sx, bottom, 0], [sx, top, 0], .045);
  for (let y = bottom + .24; y < top; y += .32) tube(root, mat.rust, [-width / 2, y, 0], [width / 2, y, 0], .035);
  return root;
}

function stairs(parent, x, z, steps, width, rise, run, rotation = 0) {
  const root = new THREE.Group();
  root.position.set(x, .14, z);
  root.rotation.y = rotation;
  parent.add(root);
  for (let i = 0; i < steps; i++) {
    box(root, mat.concrete, 0, (i + 1) * rise / 2, i * run, width, (i + 1) * rise, run + .02);
    box(root, mat.steel, 0, (i + 1) * rise + .015, i * run, width + .02, .03, run + .03, false);
  }
  return root;
}

function wire(parent, points) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, .018, 4), mat.dark);
  parent.add(mesh);
}

function pole(parent, x, z, height = 6.7) {
  cylinder(parent, mat.darkWood, x, height / 2 + .14, z, .12, height, 10);
  tube(parent, mat.dark, [x - .7, height - .25, z], [x + .7, height - .25, z], .055);
  for (const dx of [-.5, 0, .5]) cylinder(parent, mat.white, x + dx, height - .14, z, .065, .16, 8);
}

function fence(parent, x1, z1, x2, z2, height = 2.5) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const len = Math.hypot(dx, dz);
  const root = new THREE.Group();
  root.position.set((x1 + x2) / 2, .15, (z1 + z2) / 2);
  root.rotation.y = Math.atan2(dx, dz);
  parent.add(root);
  for (let p = -len / 2; p <= len / 2 + .01; p += Math.min(2, len)) cylinder(root, mat.steel, 0, height / 2, p, .05, height, 6);
  for (let y = .25; y < height; y += .22) tube(root, mat.steel, [0, y, -len / 2], [0, y, len / 2], .012, 4);
  for (let p = -len / 2; p < len / 2; p += .28) {
    tube(root, mat.steel, [0, .25, p], [0, height - .15, p + .23], .009, 4);
    tube(root, mat.steel, [0, height - .15, p], [0, .25, p + .23], .009, 4);
  }
  tube(root, mat.rust, [0, height + .2, -len / 2], [0, height + .2, len / 2], .025, 5);
}

function rack(parent, x, z, width = 2.3, height = 3.4, depth = .8) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(parent, mat.blueSteel, x + sx * width / 2, height / 2 + .2, z + sz * depth / 2, .09, height, .09);
  for (let y = .45; y < height; y += .69) {
    box(parent, mat.rust, x, y, z, width + .08, .07, depth + .06);
    for (let i = 0; i < 2; i++) {
      if (random() < .2) continue;
      const cargo = box(parent, i % 2 ? mat.paper : mat.wood, x + (i - .5) * .9, y + .17, z, .66 + random() * .2, .28, .58);
      cargo.rotation.y = (random() - .5) * .12;
    }
  }
}

function warehouse(parent, animated) {
  plane(parent, mat.concrete, -9.8, .135, -8.55, 8.8, 9.4);
  wall(parent, -14.13, -8.55, .3, 9.6, 5.2);
  wall(parent, -9.8, -13.2, 8.9, .3, 5.2);
  wall(parent, -5.49, -10.75, .3, 5.05, 5.2);
  wall(parent, -5.49, -4.22, .3, 1.15, 5.2);
  wall(parent, -12.96, -3.82, 2.62, .35, 5.2);
  wall(parent, -6.01, -3.82, 1.33, .35, 5.2);
  box(parent, mat.rust, -9.56, 4.61, -3.81, 4.35, 1.24, .18);
  for (let y = 4.08; y < 5.16; y += .17) box(parent, mat.dark, -9.56, y, -3.69, 4.32, .028, .03, false);
  const shutter = box(parent, mat.rust, -9.56, 3.95, -3.61, 4.25, .14, .18);
  animated.shutter = shutter;
  for (const zz of [-12.9, -9.1, -5.15]) box(parent, mat.steel, -9.8, 5.43, zz, 8.7, .22, .2);
  for (const xx of [-13.8, -10, -5.75]) box(parent, mat.steel, xx, 5.37, -8.5, .2, .24, 9.1);
  // Cutaway roofing leaves the shelving, loft, and site readable from above.
  box(parent, mat.blueSteel, -12.7, 5.55, -11.9, 2.6, .14, 2.5);
  box(parent, mat.blueSteel, -6.5, 5.55, -11.85, 1.65, .14, 2.45);
  box(parent, mat.blueSteel, -12.9, 5.55, -5.05, 2.35, .14, 2.06);
  sign(parent, 'A / FREIGHT DEPOT', -9.7, 5.03, -3.55, 3.9, .54, { background: '#3d5156', size: 60 });
  sign(parent, 'BAY 07', -7.24, 3.45, -3.6, 1.03, .39, { background: '#a66b4f', size: 60 });
  windowFrame(parent, -5.28, 2.72, -11.54, 1.3, 1.28, Math.PI / 2);
  windowFrame(parent, -5.28, 2.72, -8.88, 1.3, 1.28, Math.PI / 2);
  for (const zz of [-11.54, -8.88]) for (const off of [-.25, .24]) box(parent, mat.wood, -5.18, 2.72, zz + off, .13, 1.49, .18, false);
  box(parent, mat.darkWood, -5.28, 1.35, -6.72, .15, 2.3, 1.25);
  cylinder(parent, mat.yellow, -5.16, 1.29, -6.26, .052, .055, 8);
  site(parent, 'A', -9.66, -6.16, 1.5);
  // Interior cover is kept outside the marked planting circle.
  for (const [x, z] of [[-12.45, -10.8], [-12.45, -10.05], [-7.9, -6.8], [-7.1, -6.8], [-11.8, -4.65]]) crate(parent, x, z, .72, .72);
  crate(parent, -12.45, -10.42, .72, .72, .87);
  crate(parent, -7.45, -6.83, .72, .72, .87);
  rack(parent, -7.2, -10.6, 2.2, 3.3);
  rack(parent, -11.47, -12.08, 2.3, 3.3);
  rack(parent, -7.45, -12.08, 1.65, 3.3);
  box(parent, mat.concrete, -10.08, 2.63, -10.05, .74, 5.15, .74);
  box(parent, mat.dark, -10.08, 2.65, -10.05, .82, .16, .82);
  bulletScars(parent, -9.67, 2.6, -9.66, 12, Math.PI / 4);
  pallet(parent, -12.75, -6.32, .1);
  sandbags(parent, -7.9, -4.65, 3, Math.PI / 2);
  // Hand pallet truck / fork assembly.
  box(parent, mat.yellow, -11.95, .36, -5.75, 1.4, .14, .72);
  for (const xx of [-12.33, -11.57]) box(parent, mat.steel, xx, .22, -4.98, .19, .08, 1.28);
  tube(parent, mat.dark, [-11.95, .36, -6.07], [-11.95, 1.42, -6.67], .055);
  tube(parent, mat.dark, [-12.25, 1.42, -6.67], [-11.65, 1.42, -6.67], .055);
  // Iron loft and vertical access.
  box(parent, mat.blueSteel, -6.95, 3.22, -9.03, 2.52, .18, 3.05);
  for (const z of [-10.45, -7.62]) box(parent, mat.dark, -6.95, 3.67, z, 2.5, .75, .065, false);
  ladder(parent, -8.3, -7.95, .2, 3.85, .62);
  windowFrame(parent, -5.31, 4.3, -9.12, .85, .68, Math.PI / 2);
  box(parent, mat.dark, -12.7, 1.25, -12.44, 1.6, 1.45, .52);
  for (let i = 0; i < 5; i++) box(parent, mat.paper, -12.8 + random() * .9, .26, -5.7 + random() * .8, .45, .12, .38);
  for (const xx of [-11.2, -8.95]) box(parent, flat(0xc6eafa), xx, 5.21, -8.5, .9, .06, .16, false);
  const cold = new THREE.PointLight(0xcceaff, 24, 8, 2);
  cold.position.set(-10, 4.75, -8.5);
  parent.add(cold);
  const red = new THREE.PointLight(0xe04532, 8, 4);
  red.position.set(-12.4, 2.2, -12.8);
  parent.add(red);
  // Street-side service props.
  box(parent, mat.steel, -13.54, 1.02, -2.88, .95, .95, .56);
  for (let i = 0; i < 7; i++) box(parent, mat.dark, -13.92 + i * .12, 1.02, -2.58, .025, .65, .025, false);
  cylinder(parent, mat.greenSteel, -12.9, .68, -2.7, .33, 1.05);
  sign(parent, 'NORTHLINE / 04', -13.89, 3.25, -5.3, 1.8, .46, { rotation: Math.PI / 2, size: 56 });
}

function guardhouse(parent) {
  plane(parent, mat.concrete, 10.45, .14, -10.04, 5.1, 5.75);
  wall(parent, 10.45, -12.81, 4.9, .28, 3.9, mat.blueSteel);
  wall(parent, 12.81, -10.13, .28, 5.25, 3.9, mat.blueSteel);
  wall(parent, 8.14, -11.88, .27, 1.9, 3.9, mat.blueSteel);
  wall(parent, 8.14, -8.61, .27, 2.02, 3.9, mat.blueSteel);
  wall(parent, 8.91, -7.51, 1.85, .27, 3.9, mat.blueSteel);
  wall(parent, 12.36, -7.51, .92, .27, 3.9, mat.blueSteel);
  windowFrame(parent, 10.64, 2.21, -7.32, 1.62, 1.35);
  box(parent, flat(0xf5bd78, .22), 10.64, 2.21, -7.24, 1.49, 1.2, .012, false);
  windowFrame(parent, 12.63, 2.35, -10.32, 1.65, 1.2, Math.PI / 2);
  box(parent, mat.darkWood, 8.1, 1.28, -10.28, .15, 2.23, 1.25);
  box(parent, mat.darkWood, 11.14, 1.26, -7.42, 1.17, 2.15, .12);
  sign(parent, 'B / SIGNAL OFFICE', 10.44, 3.61, -7.28, 3.2, .42, { background: '#445e62', size: 57 });
  box(parent, mat.steel, 10.4, 4.07, -11.68, 4.95, .2, 2.25);
  for (const xx of [8.1, 10.42, 12.78]) box(parent, mat.dark, xx, 4.16, -10.04, .12, .17, 5.55);
  // Upper balcony is a firing position over the open B court.
  box(parent, mat.blueSteel, 10.64, 3.38, -7.04, 4.35, .16, 1.72);
  for (const xx of [8.56, 10.64, 12.72]) tube(parent, mat.steel, [xx, 3.43, -6.19], [xx, 4.47, -6.19], .044);
  tube(parent, mat.steel, [8.56, 4.42, -6.19], [12.72, 4.42, -6.19], .045);
  ladder(parent, 12.98, -8.28, .23, 4.25, .62, Math.PI / 2);
  box(parent, mat.dark, 11.88, 1.1, -11.42, 1.07, 1.75, .55);
  box(parent, mat.wood, 9.82, .92, -10.2, 1.58, .12, .75);
  for (const sx of [-1, 1]) box(parent, mat.dark, 9.82 + sx * .65, .5, -10.2, .08, .84, .63);
  box(parent, mat.rust, 10.25, .45, -9.27, .6, .1, .58);
  box(parent, mat.paper, 9.6, 1.05, -10.22, .43, .025, .34, false);
  cylinder(parent, mat.rust, 10.1, 1.11, -10.23, .08, .14);
  box(parent, mat.dark, 9.22, 3.75, -10.2, 1.26, .08, .11);
  const warm = new THREE.PointLight(0xffc985, 16, 6);
  warm.position.set(10.35, 3.2, -10.05);
  parent.add(warm);
  site(parent, 'B', 9.56, -4.75, 1.35);
  pallet(parent, 7.18, -5.95, -.3);
  pallet(parent, 12.35, -5.2, .4);
  barrel(parent, 6.97, -7.3, .15, mat.greenSteel);
  barrel(parent, 7.67, -7.3, .15, mat.rust);
  cylinder(parent, mat.greenSteel, 12.5, .68, -6.48, .34, 1.05);
  crate(parent, 10.25, -6.34, .65, .65);
  // Abandoned bicycle and toppled café furniture.
  for (const xx of [11.38, 12.6]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(.36, .055, 6, 16), mat.rubber);
    wheel.position.set(xx, .51, -4.07);
    wheel.castShadow = true;
    parent.add(wheel);
  }
  tube(parent, mat.steel, [11.38, .51, -4.07], [12.02, .88, -4.07], .04);
  tube(parent, mat.steel, [12.02, .88, -4.07], [12.6, .51, -4.07], .04);
  tube(parent, mat.steel, [11.38, .51, -4.07], [12.17, .52, -4.07], .04);
  tube(parent, mat.steel, [12.17, .52, -4.07], [12.02, .88, -4.07], .04);
  box(parent, mat.rust, 12.55, .45, -3.06, .95, .06, .68);
  for (const xx of [12.19, 12.91]) tube(parent, mat.rust, [xx, .44, -3.3], [xx, .14, -3.55], .035);
  lamp(parent, 13.45, -5.46, 5.5, true);
  barrier(parent, 12.85, -2.25, Math.PI / 2);
}

function mid(parent) {
  // Central corridor runs north/south; both side routes remain traversable.
  plane(parent, mat.asphalt, -.2, .12, 3.1, 6.7, 19.8);
  for (const xx of [-3.55, 3.55]) {
    box(parent, mat.concrete, xx, .43, 2.35, .27, .72, 10.2);
    for (let zz = -2.2; zz < 7; zz += 2.7) box(parent, mat.dark, xx, .84, zz, .28, .12, .23, false);
  }
  wall(parent, -2.55, -.34, 2.08, .48, 3.8, mat.concrete);
  wall(parent, 2.55, -.34, 2.08, .48, 3.8, mat.concrete);
  const doorL = box(parent, mat.rust, -.72, 1.66, -.13, 1.37, 3.06, .18);
  doorL.rotation.y = .39;
  const doorR = box(parent, mat.steel, .72, 1.66, -.13, 1.37, 3.06, .18);
  doorR.rotation.y = -.34;
  for (const xx of [-2.55, 2.55]) {
    box(parent, mat.dark, xx, 2.85, .015, .74, .56, .09, false);
    box(parent, mat.steel, xx, 2.85, .07, .57, .42, .03, false);
  }
  sign(parent, 'NORTHLINE / MID', 0, 4.18, -.32, 2.54, .48, { background: '#4d625f', size: 59 });
  bulletScars(parent, -2.38, 1.6, -.022, 14);
  bulletScars(parent, 2.7, 2.1, -.022, 9);
  // Long drainage trench with individual rusty grates.
  box(parent, mat.dark, 0, .115, 4.3, .72, .04, 5.35, false);
  for (let zz = 1.75; zz < 6.9; zz += .22) box(parent, mat.rust, 0, .155, zz, .75, .035, .065, false);
  box(parent, mat.concrete, -.9, .55, 7.35, 2.6, .84, .45);
  crate(parent, -1.55, 8.15, .73);
  sign(parent, 'NO ENTRY', -2.4, 1.46, 7.25, .82, .26, { background: '#905b47', size: 51 });
  // Visible sunken sewer entry and exit, linked by a recessed line in the road.
  for (const [x, z] of [[-2.9, -3.38], [2.75, 8.5]]) {
    box(parent, mat.concrete, x, .26, z, 1.55, .3, 1.24);
    box(parent, mat.dark, x, .43, z, 1.04, .06, .8, false);
    for (let k = -2; k <= 2; k++) box(parent, mat.rust, x + k * .18, .48, z, .045, .05, .81, false);
  }
  for (const xx of [-4.3, 4.4]) {
    box(parent, mat.concrete, xx, 1.52, 1.85, 1.22, 2.8, 1.18);
    windowFrame(parent, xx, 2.04, 2.49, .86, .58);
    box(parent, mat.steel, xx, 2.96, 1.85, 1.44, .18, 1.4);
    box(parent, mat.dark, xx, 1.04, 1.83, .62, .6, .36);
    box(parent, mat.rust, xx, .57, 1.81, .44, .08, .43);
  }
  pallet(parent, 2.4, 6.95, .3);
  barrier(parent, 1.9, -2.6, .1);
}

function spawnAreas(parent, animated) {
  // T unloading enclosure.
  fence(parent, -4.8, -14.15, -1.65, -14.15);
  fence(parent, 1.1, -14.15, 5.7, -14.15);
  fence(parent, 5.7, -14.15, 5.7, -11.6);
  floorMark(parent, 'T  START', -.2, -11.7, 3.1, .75, '#bc7b68', 86);
  vehicle(parent, -3.67, -11.15, false, .12);
  ladder(parent, -4.86, -10.24, .2, 2.7, .55, -.2);
  container(parent, 2.95, .13, -11.87, 3.6, 1.56, 1.8, mat.rust, 'NLU 806214');
  container(parent, 3.45, 1.71, -11.87, 2.58, 1.5, 1.8, mat.blueSteel, 'FRG 042');
  container(parent, 3.4, 3.23, -12.22, 1.72, 1.22, 1.17, mat.greenSteel, 'N 07');
  barrel(parent, -.92, -9.36); barrel(parent, -.16, -9.36);
  barrel(parent, -.92, -8.61); barrel(parent, -.16, -8.61);
  pallet(parent, .98, -9.42, .15);
  box(parent, mat.concrete, -.68, .39, -6.87, 3.6, .5, 2.2);
  box(parent, mat.asphalt, -.68, .66, -6.87, 3.6, .035, 2.2, false);
  box(parent, mat.concrete, -3.05, 1.4, -6.65, .36, 2.4, 2.4);
  box(parent, mat.dark, -3.04, 1.33, -6.65, .1, .9, .9, false);
  // CT blockaded street entry.
  wall(parent, 0, 14.15, 12.7, .42, 3.55, mat.concrete);
  floorMark(parent, 'CT  START', -.25, 11.47, 3.45, .75, '#a7c9d0', 82);
  sign(parent, 'POLICE   /   RESTRICTED AREA', 0, 2.45, 13.91, 4.7, .47, { background: '#344e5c', size: 52 });
  vehicle(parent, -5.2, 10.78, true, -.28);
  animated.police = [new THREE.PointLight(0x287cfd, 2, 5), new THREE.PointLight(0xff344b, 2, 5)];
  animated.police[0].position.set(-5.5, 2.3, 10.4);
  animated.police[1].position.set(-4.9, 2.3, 10.4);
  parent.add(...animated.police);
  for (const [x, z, a] of [[-2.45, 10.1, -.35], [.4, 9.7, .28], [2.3, 10.2, -.25]]) barrier(parent, x, z, a, true);
  box(parent, mat.blueSteel, 1.17, .62, 11.64, .84, 1.0, .18);
  sign(parent, 'CT', 1.17, .63, 11.75, .55, .46, { background: null, color: '#d6e8e8', size: 120 });
  crate(parent, -1.33, 13.11, .7);
  box(parent, mat.dark, -.83, .52, 13.08, .35, .48, .37);
  // Raised right flank and CT spotting platform.
  box(parent, mat.concrete, 6.82, 1.56, 10.5, 3.8, 2.9, 5.6);
  box(parent, mat.asphalt, 6.82, 3.04, 10.5, 3.85, .07, 5.64);
  for (const zz of [8.55, 10, 11.45, 12.8]) {
    box(parent, mat.dark, 8.76, 1.48, zz, .045, 2.18, .08, false);
    box(parent, mat.rust, 8.8, 1.53, zz + .48, .03, .9, .42, false);
  }
  sign(parent, 'CT / 02', 6.83, 1.85, 13.34, 2.38, .45, { background: '#435862', size: 67 });
  for (let i = 0; i < 5; i++) box(parent, mat.yellow, 5.2 + i * .53, .34, 13.34, .31, .09, .035, false);
  stairs(parent, 4.28, 9.6, 10, 1.3, .29, .34, -Math.PI / 2);
  for (const z of [8.05, 12.85]) tube(parent, mat.steel, [5.04, 3.09, z], [8.6, 3.09, z], .055);
  box(parent, mat.dark, 7.55, 3.39, 9.25, .56, .56, .62);
  cylinder(parent, mat.steel, 7.55, 3.88, 9.25, .1, .45);
  const spotlight = new THREE.SpotLight(0xd6edff, 53, 17, .38, .6, 1.1);
  spotlight.position.set(7.55, 4.16, 9.25);
  spotlight.target.position.set(2.4, .2, 1.5);
  parent.add(spotlight, spotlight.target);
  animated.spotlight = spotlight;
  for (const xx of [5.05, 8.61]) box(parent, mat.dark, xx, 3.5, 10.5, .13, .95, 5.5);
  sign(parent, 'OBSERVATION', 6.8, 2.15, 7.66, 2.35, .35, { background: '#536b6b', size: 53 });
}

function routesAndProps(parent, ripples) {
  // Left flank traces the warehouse wall through tight cover and a corner.
  plane(parent, mat.asphalt, -5.55, .13, 5.9, 2.6, 14.7);
  for (let z = .8; z < 11.3; z += 2.2) box(parent, mat.concrete, -6.67, .27, z, .34, .35, 1.45);
  barrier(parent, -5.62, 5.12, .42);
  crate(parent, -5.13, 2.32, .78);
  barrel(parent, -6.2, -.83, .15, mat.rust);
  barrel(parent, -5.52, -.83);
  sandbags(parent, -7.55, -2.19, 4, .13);
  for (const [x, z] of [[-9.25, 1.5], [-11.75, 4.5], [-8.8, 9.6], [10.85, 3.58], [4.15, -5.65]]) {
    box(parent, mat.concrete, x, .51, z, 1.7, .8, .62);
    box(parent, mat.dark, x, .93, z, 1.72, .08, .64, false);
  }
  // Right-side catwalk visibly joins the elevated B approach.
  box(parent, mat.concrete, 5.43, .8, 3.97, 1.8, 1.4, 7.5);
  box(parent, mat.steel, 5.43, 1.54, 3.97, 1.83, .08, 7.5);
  stairs(parent, 5.42, 8.3, 5, 1.62, .29, .36, Math.PI);
  stairs(parent, 5.42, -.38, 5, 1.62, .29, .36, 0);
  for (const xx of [4.5, 6.35]) {
    for (let zz = .35; zz < 7.7; zz += 1.18) tube(parent, mat.steel, [xx, 1.58, zz], [xx, 2.35, zz], .035);
    tube(parent, mat.steel, [xx, 2.32, .4], [xx, 2.32, 7.54], .037);
  }
  pallet(parent, 9.12, 5.4, .62);
  crate(parent, 6.45, -2.9, .86);
  crate(parent, 7.3, -2.9, .68);
  barrel(parent, 3.67, -4.8, .15, mat.rust);
  [[-1.58, 4.6, .9, 1.5], [1.95, 3.3, 1.2, .72], [-5.64, 7.15, .6, 1.25], [8.9, -3.35, 1.05, .55], [-8.8, -1.1, 1.2, .5], [1.2, -8.1, 1.15, .65], [8.8, 8.2, .7, 1.2], [-3.5, 11.3, .6, .9]].forEach(([x, z, sx, sz], i) => puddle(parent, x, z, sx, sz, ripples, i < 2));
  // Track-like freight markings, drains and surface cracks.
  for (const x of [-2.7, 2.7]) for (let z = -5.4; z < 8; z += 2.2) box(parent, mat.white, x, .14, z, .045, .01, .58, false);
  for (const z of [-1.8, 7.75]) for (let x = -13; x < 13; x += 1.05) box(parent, mat.yellow, x, .14, z, .64, .012, .05, false);
  for (let i = 0; i < 32; i++) {
    const x = -13.2 + random() * 26.4;
    const z = -13.2 + random() * 26.4;
    if ((x < -5.6 && z < -3.5) || (x > 8 && z < -7.5)) continue;
    const stone = box(parent, i % 3 ? mat.dark : mat.rust, x, .135, z, .04 + random() * .17, .012, .02 + random() * .13, false);
    stone.rotation.y = random() * Math.PI;
  }
  // Packing debris and used tires are clustered at route edges.
  for (const [x, z] of [[-12.9, 2.4], [-12.35, 2.2], [11.25, 2.1], [11.9, 2.7]]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.35, .13, 6, 12), mat.rubber);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, .28, z);
    ring.castShadow = true;
    parent.add(ring);
  }
  for (const [x, z] of [[-11.4, 2.4], [11.1, 5.8], [2.9, 11.5]]) {
    box(parent, mat.paper, x, .35, z, .66, .42, .48);
    box(parent, mat.paper, x + .35, .52, z + .24, .48, .38, .48);
  }
}

function infrastructure(parent, animated) {
  for (const [x, z] of [[-13.55, 7.4], [13.5, 7.4], [-13.58, -12.66], [13.4, -12.6]]) pole(parent, x, z);
  wire(parent, [[-13.55, 6.35, 7.4], [-7, 5.48, 5.1], [0, 5.1, 3.3], [7, 5.45, 5.1], [13.5, 6.35, 7.4]]);
  wire(parent, [[-13.58, 6.36, -12.66], [-6.2, 5.5, -8.8], [0, 5.17, -7.6], [7.1, 5.55, -9.4], [13.4, 6.36, -12.6]]);
  wire(parent, [[-13.55, 6.1, 7.4], [-13.35, 5.55, -3], [-13.58, 6.3, -12.66]]);
  for (const [x, z] of [[-13.68, -5.2], [-5.69, -9.0], [12.75, -11.1], [8.16, -8.8]]) {
    box(parent, mat.rust, x, 2.43, z, .11, 4.3, .14, false);
    cylinder(parent, mat.steel, x, .39, z, .1, .38);
  }
  lamp(parent, -7.2, 3.45, 5.05, false);
  const flicker = lamp(parent, 2.35, -4.7, 5.2, false);
  animated.flicker = flicker;
  for (const [x, z] of [[-13.75, -2.6], [12.85, -11.7]]) {
    box(parent, mat.dark, x, 3.45, z, .34, .26, .35);
    const mist = new THREE.Mesh(new THREE.SphereGeometry(.34, 8, 6), flat(0xc4d7d7, .1));
    mist.position.set(x, 3.5, z);
    mist.scale.set(1.7, .7, .7);
    parent.add(mist);
    animated.steam.push(mist);
  }
}

export function buildWorld(scene) {
  const world = new THREE.Group();
  scene.add(world);
  const animated = { ripples: [], steam: [], shutter: null, police: [], spotlight: null, flicker: null };
  // One unbroken concrete plinth; every placed object stays within its footprint.
  box(world, mat.concrete, 0, -.7, 0, 30, 1.4, 30);
  box(world, mat.dark, 0, -.03, 0, 29.75, .12, 29.75, false);
  plane(world, mat.asphalt, 0, .075, 0, 29.48, 29.48);
  for (const p of [-14.8, 14.8]) {
    box(world, mat.steel, p, .1, 0, .13, .19, 29.75, false);
    box(world, mat.steel, 0, .1, p, 29.75, .19, .13, false);
  }
  for (let i = 0; i < 6; i++) {
    const x = -12.5 + i * 5;
    box(world, mat.dark, x, -.45, 15.007, .48, .18, .025, false);
  }
  warehouse(world, animated);
  guardhouse(world);
  mid(world);
  spawnAreas(world, animated);
  routesAndProps(world, animated.ripples);
  infrastructure(world, animated);
  return animated;
}
