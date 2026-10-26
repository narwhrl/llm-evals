import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { canvasTexture, surface, label, paper, photo, leafTexture, glowTexture, drawScreen } from './textures.js';
import { floatHomes, TAU } from './orbit.js';

export function createHabitat(scene, windowMaterial) {
  const metal = surface('metal'), fabric = surface('fabric'), wood = surface('wood');
  const mat = (color, map = metal, extra = {}) => new THREE.MeshStandardMaterial({ color, map, roughness: 0.88, metalness: 0.12, ...extra });
  const m = {
    cream: mat('#d7d5bf'), ivory: mat('#f4ead1'), blue: mat('#56797d'), dark: mat('#263d45'),
    copper: mat('#b78d56'), orange: mat('#c67943', fabric), cloth: mat('#ded8bb', fabric),
    teal: mat('#406f70', fabric), rubber: mat('#233b40', fabric), red: mat('#b94c38'),
    wood: mat('#ffffff', wood), floor: mat('#a2aba0', surface('grate')),
    leaf: mat('#ffffff', leafTexture(), { side: THREE.DoubleSide, roughness: 0.92 }),
  };
  const root = new THREE.Group(); scene.add(root);
  const targets = new Map(), indicators = [], bolts = [];
  const glowMap = glowTexture();
  function group(name, at = [0, 0, 0], parent = root) {
    const g = new THREE.Group(); g.position.set(...at); parent.add(g);
    if (name) { g.userData.action = name; targets.set(name, g); }
    return g;
  }
  function mesh(geometry, material, at, parent = root) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(...at); object.castShadow = true; object.receiveShadow = true; parent.add(object);
    return object;
  }
  function box(w, h, d, material, at, parent = root, radius = 0.035) {
    return mesh(radius ? new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d), material, at, parent);
  }
  function cylinder(r, h, material, at, parent = root, segments = 16) {
    return mesh(new THREE.CylinderGeometry(r, r, h, segments), material, at, parent);
  }
  function ring(r, tube, material, at, parent = root, segments = 48) {
    return mesh(new THREE.TorusGeometry(r, tube, 8, segments), material, at, parent);
  }
  function line(points, radius, material, parent = root) {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return mesh(new THREE.TubeGeometry(curve, Math.max(8, points.length * 6), radius, 6, false), material, [0, 0, 0], parent);
  }
  function rod(a, b, radius, material, parent = root) {
    const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b);
    const object = cylinder(radius, av.distanceTo(bv), material, av.clone().add(bv).multiplyScalar(0.5).toArray(), parent, 8);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bv.sub(av).normalize());
    return object;
  }
  function decal(texture, w, h, at, parent = root) {
    const material = new THREE.MeshStandardMaterial({ map: texture, transparent: true, roughness: 1, metalness: 0, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
    const object = mesh(new THREE.PlaneGeometry(w, h), material, at, parent); object.castShadow = false;
    return object;
  }
  const text = (s, w, h, at, parent = root, options) => decal(label(s, options), w, h, at, parent);
  function bolt(x, y, z) { bolts.push([x, y, z]); }
  function light(color, intensity, distance, at, parent = root) {
    const l = new THREE.PointLight(color, intensity, distance, 2); l.position.set(...at); parent.add(l); return l;
  }
  function bulb(color, at, scale, parent = root) {
    const material = new THREE.MeshBasicMaterial({ color });
    const b = mesh(new THREE.SphereGeometry(scale * 0.11, 8, 6), material, at, parent); b.castShadow = false;
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowMap, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.position.set(...at); halo.scale.setScalar(scale); parent.add(halo);
    return { bulb: b, halo };
  }
  function indicator(x, y, z, color = '#9ce3bf', parent = root) {
    const b = bulb(color, [x, y, z], 0.11, parent); indicators.push(b); return b;
  }
  function vent(x, y, w, h, parent = root, z = -1.76) {
    box(w + 0.07, h + 0.08, 0.09, m.ivory, [x, y, z], parent);
    box(w, h, 0.025, m.dark, [x, y, z + 0.055], parent, 0);
    for (let yy = y - h / 2 + 0.035; yy < y + h / 2; yy += 0.045) box(w - 0.035, 0.012, 0.035, m.blue, [x, yy, z + 0.08], parent, 0);
  }
  function shadow(at, w, d, parent = root) {
    const shadowMat = new THREE.MeshBasicMaterial({ map: glowMap, color: '#050c13', transparent: true, opacity: 0.8, depthWrite: false });
    const s = mesh(new THREE.PlaneGeometry(w, d), shadowMat, at, parent); s.rotation.x = -Math.PI / 2; s.castShadow = false;
  }

  // The shell has actual openings, with a curved shoulder and exposed sandwich edges.
  box(8.85, 0.34, 4.3, m.dark, [0, -0.22, 0.08], root, 0.14);
  box(8.73, 0.12, 4.2, m.copper, [0, -0.115, 0.08], root, 0.05);
  box(8.75, 0.07, 4.22, m.ivory, [0, -0.025, 0.08], root, 0.05);
  for (let x = -3.9; x <= 3.91; x += 1.3) {
    for (let z = -1.25; z < 1.9; z += 1.05) box(1.26, 0.035, 1.01, m.floor, [x, 0.027, z], root, 0.012);
  }
  for (let x = -4.2; x < 4.3; x += 0.22) box(0.09, 0.095, 0.016, m.dark, [x, -0.16, 2.188], root, 0);
  text('HABITAT 04', 1.5, 0.18, [-2.8, -0.22, 2.24], root, { background: null, color: '#dcd8bb' });
  text('ORBITAL HOME / 400 KM', 2.0, 0.12, [1.85, -0.23, 2.24], root, { background: null, color: '#a2b9b4', size: 37 });

  const holes = [{ x: 1.42, y: 2.13, r: 1.04 }, { x: -3.41, y: 2.48, r: 0.29 }, { x: -1.49, y: 2.48, r: 0.29 }];
  const wallShape = new THREE.Shape();
  wallShape.moveTo(-4.3, 0.28); wallShape.lineTo(4.3, 0.28); wallShape.lineTo(4.3, 3.3); wallShape.lineTo(-4.3, 3.3); wallShape.closePath();
  for (const h of holes) { const hole = new THREE.Path(); hole.absarc(h.x, h.y, h.r, 0, TAU, true); wallShape.holes.push(hole); }
  mesh(new THREE.ExtrudeGeometry(wallShape, { depth: 0.17, bevelEnabled: false, curveSegments: 64 }), m.cream, [0, 0, -2.02]);

  const profile = [[-1.85, 0.03], [-1.99, 0.3], [-2.02, 3.25], [-1.92, 3.48], [-1.65, 3.69], [-1.27, 3.82]];
  for (let i = 2; i < profile.length - 1; i++) {
    const [z0, y0] = profile[i], [z1, y1] = profile[i + 1];
    const beam = box(8.6, Math.hypot(z1 - z0, y1 - y0), 0.17, i % 2 ? m.ivory : m.cream, [0, (y0 + y1) / 2, (z0 + z1) / 2]);
    beam.rotation.x = Math.atan2(z1 - z0, y1 - y0);
  }
  line([[-4.32, 0.06, 1.96], [-4.32, 0.1, -1.55], [-4.32, 0.32, -1.88], [-4.32, 3.23, -1.9], [-4.32, 3.59, -1.6], [-4.32, 3.79, -1.25]], 0.09, m.blue);
  line([[4.32, 0.06, 1.96], [4.32, 0.1, -1.55], [4.32, 0.32, -1.88], [4.32, 3.23, -1.9], [4.32, 3.59, -1.6], [4.32, 3.79, -1.25]], 0.09, m.blue);
  for (const x of [-4.12, -2.98, -1.0, 3.02, 4.12]) {
    line([[x, 0.04, -1.65], [x, 0.35, -1.76], [x, 3.24, -1.75], [x, 3.51, -1.57], [x, 3.7, -1.23]], 0.047, m.blue);
    for (let y = 0.45; y < 3.2; y += 0.27) bolt(x, y, -1.68);
  }
  for (const y of [0.4, 3.2, 3.55]) {
    for (let x = -4.15; x <= 4.2; x += 0.25) bolt(x, y, y > 3.3 ? -1.62 : -1.82);
  }
  const windowGroup = group('window');
  for (const [index, h] of holes.entries()) {
    const parent = index === 0 ? windowGroup : root;
    const disc = mesh(new THREE.CircleGeometry(h.r, 80), windowMaterial, [h.x, h.y, -1.873], parent); disc.castShadow = false;
    ring(h.r + 0.06, index === 0 ? 0.13 : 0.067, m.blue, [h.x, h.y, -1.73], parent);
    ring(h.r - 0.015, 0.028, m.dark, [h.x, h.y, -1.64], parent);
    ring(h.r + 0.075, 0.027, m.ivory, [h.x, h.y, -1.58], parent);
    const innerRim = mat('#a3def2', metal, { emissive: '#23516f', emissiveIntensity: 0.5 });
    ring(h.r - 0.03, 0.016, innerRim, [h.x, h.y, -1.607], parent);
    for (let n = 0; n < (index === 0 ? 24 : 12); n++) {
      const a = n * TAU / (index === 0 ? 24 : 12);
      bolt(h.x + (h.r + 0.09) * Math.cos(a), h.y + (h.r + 0.09) * Math.sin(a), -1.56);
    }
    if (index === 0) {
      for (const a of [0.3, Math.PI - 0.3]) {
        const latch = box(0.14, 0.3, 0.13, m.copper, [h.x + 1.17 * Math.cos(a), h.y + 1.17 * Math.sin(a), -1.56], parent); latch.rotation.z = a - Math.PI / 2;
      }
    }
  }
  text('CUPOLA / 03', 0.9, 0.13, [1.42, 3.43, -1.76]);
  text('HOME IS DOWN THERE', 1.5, 0.1, [1.42, 0.9, -1.72], root, { background: null, color: '#455d58', size: 32 });
  text('04', 0.55, 0.37, [-0.44, 2.81, -1.82], root, { background: null, color: '#365e65', size: 100 });
  text('O2 / 21.0\nNOMINAL', 0.46, 0.19, [-0.45, 2.36, -1.81], root, { size: 42 });
  vent(-0.45, 1.94, 0.42, 0.3);
  vent(3.62, 3.01, 0.64, 0.24);
  vent(-3.58, 3.18, 0.72, 0.16);
  text('ENVIRONMENTAL CONTROL', 1.2, 0.12, [-2.13, 3.39, -1.75], root, { size: 32 });

  // Bundled power/data lines with visible clamps and colored insulation.
  for (let i = 0; i < 4; i++) {
    line([[-4.16, 0.39 + i * 0.045, -1.68], [-2, 0.39 + i * 0.045, -1.68], [0, 0.43 + i * 0.045, -1.68], [3.65, 0.43 + i * 0.045, -1.68], [3.83, 0.7 + i * 0.04, -1.68], [3.83, 2.6, -1.68]], 0.018, [m.rubber, m.copper, m.blue, m.rubber][i]);
  }
  for (let x = -4; x < 3.8; x += 0.55) box(0.045, 0.24, 0.055, m.ivory, [x, 0.49, -1.62], root, 0.005);
  for (let i = 0; i < 3; i++) line([[-4.15, 3.3 + i * 0.045, -1.7], [-2, 3.3 + i * 0.045, -1.7], [-0.75, 3.3 + i * 0.045, -1.7]], 0.018, i === 1 ? m.copper : m.rubber);
  for (const x of [-3.9, -3.1, -2.3, -1.5]) box(0.05, 0.18, 0.045, m.blue, [x, 3.35, -1.66], root, 0);

  // Two sealed end hatches; only the rear half of each end bulkhead is retained.
  for (const sign of [-1, 1]) {
    const hatch = group(null, [sign * 4.12, 1.31, -0.9]); hatch.rotation.y = Math.PI / 2;
    const plate = cylinder(0.87, 0.15, m.blue, [0, 0, 0], hatch, 20); plate.rotation.x = Math.PI / 2;
    const center = cylinder(0.73, 0.18, m.ivory, [0, 0, 0.04], hatch, 20); center.rotation.x = Math.PI / 2;
    ring(0.77, 0.045, m.dark, [0, 0, 0.15], hatch, 24);
    const glass = cylinder(0.18, 0.06, mat('#294d60', metal, { emissive: '#17384b', emissiveIntensity: 0.6 }), [0, 0.22, 0.17], hatch); glass.rotation.x = Math.PI / 2;
    ring(0.2, 0.035, m.blue, [0, 0.22, 0.21], hatch, 24);
    text(sign < 0 ? '01 / TRANSFER' : '02 / AIRLOCK', 0.69, 0.12, [0, -0.1, 0.15], hatch);
    text('LOCKED', 0.33, 0.08, [0, -0.28, 0.16], hatch, { background: '#c9a956', size: 46 });
    rod([-0.3, -0.48, 0.18], [0.3, -0.48, 0.18], 0.045, m.blue, hatch);
    for (let i = 0; i < 8; i++) {
      const a = i * TAU / 8;
      const latch = box(0.11, 0.18, 0.1, m.copper, [Math.cos(a) * 0.78, Math.sin(a) * 0.78, 0.13], hatch); latch.rotation.z = a;
    }
  }

  const sleeping = group('sleeping', [-3.45, 0, -1.28]);
  box(0.95, 2.04, 0.24, m.dark, [0, 1.28, -0.17], sleeping, 0.1);
  box(0.9, 1.65, 0.4, m.orange, [0, 1.07, 0], sleeping, 0.16);
  box(0.8, 0.54, 0.24, m.rubber, [0, 1.86, 0.01], sleeping, 0.13);
  box(0.69, 0.33, 0.22, m.cloth, [0, 1.91, 0.16], sleeping, 0.1);
  for (let y = 0.45; y < 1.65; y += 0.2) line([[-0.37, y, 0.15], [0, y - 0.04, 0.218], [0.37, y, 0.15]], 0.008, m.copper, sleeping);
  line([[0, 0.35, 0.225], [0, 1.24, 0.225], [-0.2, 1.67, 0.22]], 0.015, m.ivory, sleeping);
  line([[0, 1.24, 0.227], [0.19, 1.68, 0.24]], 0.017, m.copper, sleeping);
  for (let y = 0.37; y < 1.27; y += 0.045) box(0.05, 0.015, 0.012, m.dark, [0, y, 0.24], sleeping, 0);
  const zipper = group(null, [0, 1.25, 0.25], sleeping);
  ring(0.028, 0.009, m.copper, [0, -0.035, 0], zipper, 8);
  box(0.045, 0.1, 0.012, m.copper, [0, -0.1, 0], zipper);
  for (const y of [0.5, 1.36]) box(1.03, 0.075, 0.045, m.rubber, [0, y, -0.26], sleeping, 0);
  text('M. REYES\nCREW / 01', 0.4, 0.18, [0.06, 0.84, 0.219], sleeping, { background: '#d5bd83', size: 43 });
  shadow([-3.4, 0.055, -1.05], 1.5, 1.2);

  box(0.96, 0.74, 0.06, m.copper, [-2.18, 1.02, -1.66]);
  for (let i = 0; i < 3; i++) {
    const p = decal(photo(i), 0.26, 0.31, [-2.49 + i * 0.3, 1.15 - (i % 2) * 0.06, -1.608]); p.rotation.z = (i - 1) * 0.12;
    const tape = box(0.12, 0.045, 0.008, m.cloth, [-2.49 + i * 0.3, 1.31 - (i % 2) * 0.06, -1.59]); tape.rotation.z = -0.15;
  }
  decal(paper('note'), 0.28, 0.33, [-2.14, 0.77, -1.6]);
  rod([-2.94, 1.6, -1.7], [-2.8, 1.85, -1.22], 0.028, m.dark);
  const shade = mesh(new THREE.ConeGeometry(0.17, 0.18, 12, 1, true), m.ivory, [-2.8, 1.82, -1.16]); shade.rotation.z = -0.35;
  bulb('#ffd78b', [-2.78, 1.73, -1.15], 0.33);
  const readingLight = light('#ffc17b', 4.6, 3.8, [-2.74, 1.65, -0.94]);

  const garden = group('garden', [-2.44, 0, -1.34]);
  for (const x of [-0.43, 0.43]) rod([x, 1.39, -0.12], [x, 2.92, -0.12], 0.025, m.blue, garden);
  for (let tier = 0; tier < 2; tier++) {
    const y = 1.58 + tier * 0.56;
    box(0.94, 0.11, 0.5, m.ivory, [0, y, 0], garden);
    box(0.82, 0.035, 0.4, m.dark, [0, y + 0.065, 0], garden);
    for (let p = 0; p < 3; p++) {
      const x = -0.28 + p * 0.28;
      cylinder(0.1, 0.15, m.blue, [x, y + 0.1, 0], garden);
      for (let j = 0; j < 7; j++) {
        const a = j * 2.399 + tier;
        const leaf = mesh(new THREE.SphereGeometry(1, 7, 5), m.leaf, [x + Math.cos(a) * 0.07, y + 0.22 + (j % 2) * 0.055, Math.sin(a) * 0.09], garden);
        leaf.scale.set(0.065, 0.155, 0.022); leaf.rotation.set(Math.sin(a) * 0.65, a, Math.cos(a) * 0.65);
      }
      const water = mesh(new THREE.SphereGeometry(0.014, 8, 6), new THREE.MeshPhysicalMaterial({ color: '#b7e5d4', metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.8 }), [x + 0.04, y + 0.32, 0.08], garden); water.castShadow = false;
    }
    text(`BASIL / ${tier + 1}   H2O`, 0.72, 0.065, [0, y, 0.258], garden, { size: 39 });
  }
  line([[0.39, 1.44, -0.1], [0.56, 1.5, 0], [0.56, 2.35, 0], [0.32, 2.4, 0]], 0.015, m.copper, garden);
  const growSwitch = group('growlight', [0, 2.73, 0], garden);
  box(0.98, 0.11, 0.4, m.dark, [0, 0, 0], growSwitch);
  const growMat = new THREE.MeshStandardMaterial({ color: '#f7c7e0', emissive: '#fc75c8', emissiveIntensity: 2.0 });
  for (let i = 0; i < 8; i++) box(0.075, 0.032, 0.28, growMat, [-0.4 + i * 0.115, -0.065, 0], growSwitch, 0.006);
  box(0.86, 0.025, 0.025, growMat, [0, -0.015, 0.215], growSwitch);
  text('GROW / 12H', 0.44, 0.065, [0, 0.015, 0.211], growSwitch, { background: null, color: '#b7c4b1', size: 45 });
  const plantLight = light('#f9a0d1', 2.3, 2.2, [0, 2.58, 0.19], garden);

  const workstation = group('workstation', [1.08, 0, -0.91]);
  box(2.55, 0.11, 0.94, m.wood, [0, 0.94, 0], workstation, 0.045);
  box(2.55, 0.045, 0.035, m.blue, [0, 0.94, 0.48], workstation);
  for (const x of [-0.98, 0.98]) {
    rod([x, 0.9, 0.3], [x, 0.35, -0.7], 0.037, m.blue, workstation);
    box(0.12, 0.45, 0.14, m.dark, [x, 0.65, -0.74], workstation);
  }
  const laptop = group(null, [-0.3, 1.03, -0.04], workstation);
  box(0.86, 0.045, 0.54, m.dark, [0, 0, 0], laptop);
  const keyboard = canvasTexture(512, 256, (c) => {
    c.fillStyle = '#506769'; c.fillRect(0, 0, 512, 256);
    for (let y = 15; y < 155; y += 31) for (let x = 15; x < 490; x += 38) {
      c.fillStyle = '#233d46'; c.fillRect(x, y, 31, 23); c.fillStyle = '#b5c9be'; c.font = '11px monospace'; c.fillText(String.fromCharCode(65 + (x + y) % 26), x + 9, y + 15);
    }
    c.strokeStyle = '#9bb5af'; c.strokeRect(174, 177, 160, 60);
  });
  const keys = decal(keyboard, 0.79, 0.47, [0, 0.025, 0], laptop); keys.rotation.x = -Math.PI / 2;
  const lid = group(null, [0, 0.04, -0.24], laptop); lid.rotation.x = -0.16;
  box(0.91, 0.6, 0.05, m.dark, [0, 0.29, 0], lid);
  const screenMap = canvasTexture(768, 480, (c) => drawScreen(c, 0, 0));
  const screenMat = new THREE.MeshBasicMaterial({ map: screenMap, toneMapped: false });
  mesh(new THREE.PlaneGeometry(0.82, 0.51), screenMat, [0, 0.3, 0.028], lid);
  indicator(0, 0.016, 0.29, '#78dbb4', laptop);
  light('#68d3c7', 0.65, 2.0, [-0.3, 1.4, 0], workstation);
  const cup = cylinder(0.1, 0.27, m.copper, [0.84, 1.135, 0.15], workstation, 24);
  ring(0.095, 0.014, m.ivory, [0.84, 1.278, 0.15], workstation).rotation.x = Math.PI / 2;
  cylinder(0.085, 0.012, m.dark, [0.84, 1.279, 0.15], workstation, 24);
  box(0.27, 0.015, 0.28, m.rubber, [0.84, 1.006, 0.15], workstation);
  text('EARTH\nCLUB', 0.13, 0.1, [0.84, 1.15, 0.25], workstation, { background: null, color: '#ede0b7', size: 42 });
  cup.material = cup.material.clone(); cup.material.roughness = 0.4;
  const notebook = box(0.34, 0.045, 0.42, m.teal, [0.36, 1.02, 0.15], workstation); notebook.rotation.y = 0.2;
  const note = decal(label('FIELD NOTES\nDAY 180', { background: '#9cbaaa' }), 0.22, 0.24, [0.36, 1.047, 0.15], workstation); note.rotation.x = -Math.PI / 2;
  const headset = group(null, [-0.98, 0.7, 0.5], workstation);
  mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 20, Math.PI), m.dark, [0, 0, 0], headset);
  for (const x of [-0.17, 0.17]) box(0.1, 0.2, 0.11, m.rubber, [x, -0.04, 0], headset);
  shadow([1.07, 0.055, -0.8], 3, 2);
  for (let i = 0; i < 2; i++) {
    const drawing = decal(paper('plan'), 0.33, 0.43, [-0.55 + i * 0.45, 1.4, -1.73]); drawing.rotation.z = (i ? -1 : 1) * 0.08;
    box(0.06, 0.035, 0.027, m.copper, [-0.55 + i * 0.45, 1.62, -1.69]);
  }

  // The chair faces the window; its pale back leaves a readable silhouette from the cutaway.
  const chair = group('chair', [1.45, 0, 0.71]);
  box(1.1, 0.08, 1.15, m.blue, [0, 0.09, 0], chair);
  cylinder(0.14, 0.45, m.dark, [0, 0.31, 0], chair);
  box(0.78, 0.18, 0.79, m.ivory, [0, 0.6, 0], chair, 0.09);
  box(0.69, 0.12, 0.69, m.teal, [0, 0.71, -0.035], chair, 0.08);
  const back = group(null, [0, 0.68, 0.3], chair); back.rotation.x = 0.24;
  box(0.83, 0.97, 0.18, m.ivory, [0, 0.42, 0.015], back, 0.09);
  box(0.68, 0.78, 0.13, m.teal, [0, 0.46, -0.125], back, 0.07);
  box(0.54, 0.2, 0.24, m.cloth, [0, 0.89, -0.04], back, 0.07);
  text('04 / OBSERVER', 0.55, 0.12, [0, 0.46, 0.111], back);
  box(0.08, 0.75, 0.02, m.rubber, [-0.24, 0.4, 0.117], back);
  for (const x of [-0.5, 0.5]) {
    rod([x, 0.45, 0.17], [x, 0.88, 0.17], 0.035, m.blue, chair);
    box(0.18, 0.09, 0.68, m.ivory, [x, 0.89, -0.07], chair);
  }
  const controls = box(0.16, 0.025, 0.3, m.dark, [0.5, 0.95, -0.17], chair);
  controls.rotation.x = 0.08;
  for (let i = 0; i < 3; i++) indicator(0.5, 0.98, -0.27 + i * 0.09, i === 2 ? '#e5a259' : '#9de6cd', chair);
  box(0.56, 0.06, 0.38, m.teal, [0, 0.34, -0.75], chair);
  shadow([1.45, 0.055, 0.7], 1.7, 1.9);

  const bike = group('bike', [3.1, 0, 0.25]);
  for (const z of [-0.55, 0.55]) box(0.66, 0.09, 0.13, m.dark, [0, 0.12, z], bike);
  const wheel = cylinder(0.3, 0.14, m.ivory, [0, 0.46, -0.31], bike, 24); wheel.rotation.z = Math.PI / 2;
  const wheelRing = ring(0.23, 0.025, m.copper, [0.08, 0.46, -0.31], bike); wheelRing.rotation.y = Math.PI / 2;
  rod([0, 0.2, 0.47], [0, 0.95, 0.26], 0.07, m.blue, bike);
  rod([0, 0.2, -0.55], [0, 1.12, -0.54], 0.055, m.ivory, bike);
  rod([0, 0.41, 0.14], [0, 0.71, -0.47], 0.06, m.copper, bike);
  box(0.42, 0.12, 0.3, m.rubber, [0, 1.02, 0.28], bike, 0.06);
  rod([-0.34, 1.2, -0.54], [0.34, 1.2, -0.54], 0.04, m.rubber, bike);
  for (const x of [-0.34, 0.34]) {
    rod([x, 1.19, -0.54], [x, 1.32, -0.38], 0.044, m.cloth, bike);
    for (let i = 0; i < 5; i++) box(0.095, 0.014, 0.07, m.blue, [x, 1.22 + i * 0.02, -0.51 + i * 0.025], bike, 0.005);
  }
  rod([-0.24, 0.48, 0.15], [0.24, 0.48, 0.15], 0.025, m.dark, bike);
  for (const sign of [-1, 1]) box(0.18, 0.04, 0.22, m.rubber, [sign * 0.25, 0.48 + sign * 0.08, 0.15], bike);
  text('CYCLE / 02', 0.15, 0.3, [0.08, 0.7, -0.18], bike).rotation.y = Math.PI / 2;
  shadow([3.1, 0.055, 0.25], 1.2, 1.9);
  rod([3.1, 2.35, -1.62], [3.85, 2.35, -1.62], 0.026, m.copper);
  const towelGeo = new THREE.PlaneGeometry(0.51, 0.67, 16, 12);
  const positions = towelGeo.attributes.position;
  for (let i = 0; i < positions.count; i++) positions.setZ(i, Math.sin(positions.getX(i) * 38) * 0.035);
  towelGeo.computeVertexNormals();
  const towelMat = mat('#a8c1b2', fabric, { side: THREE.DoubleSide });
  mesh(towelGeo, towelMat, [3.5, 2.01, -1.55]);
  text('180', 0.18, 0.1, [3.5, 1.77, -1.5], root, { background: null, color: '#426969', size: 60 });

  // Food, equipment and small personal possessions fill the remaining service panels.
  for (let p = 0; p < 3; p++) {
    const x = -1.18 + p * 0.64;
    box(0.53, 0.4, 0.18, m.teal, [x, 0.75, -1.58]);
    for (let k = 0; k < 2; k++) {
      const packet = box(0.18, 0.34, 0.08, k % 2 ? m.ivory : m.orange, [x - 0.12 + k * 0.24, 0.88, -1.43]); packet.rotation.z = (k ? 1 : -1) * 0.15;
      text(k ? 'RICE' : 'SOUP', 0.13, 0.05, [x - 0.12 + k * 0.24, 0.91, -1.38], root, { size: 40 });
    }
    for (let k = 0; k <= 5; k++) {
      rod([x - 0.27 + k * 0.105, 0.55, -1.35], [x - 0.27 + k * 0.105, 0.95, -1.35], 0.006, m.rubber);
      if (k < 5) rod([x - 0.27, 0.56 + k * 0.08, -1.345], [x + 0.27, 0.56 + k * 0.08, -1.345], 0.006, m.rubber);
    }
  }
  box(0.49, 0.4, 0.22, m.ivory, [3.17, 1.27, -1.6]);
  box(0.24, 0.065, 0.012, m.red, [3.17, 1.28, -1.478]);
  box(0.065, 0.24, 0.012, m.red, [3.17, 1.28, -1.477]);
  text('MED / 01', 0.34, 0.065, [3.17, 1.11, -1.477]);
  cylinder(0.1, 0.48, m.red, [3.77, 1.2, -1.52]);
  cylinder(0.055, 0.09, m.dark, [3.77, 1.48, -1.52]);
  line([[3.8, 1.52, -1.52], [3.96, 1.4, -1.5], [3.94, 1.13, -1.5]], 0.018, m.rubber);
  text('FIRE', 0.11, 0.13, [3.77, 1.22, -1.411], root, { background: '#ead7a6', size: 55 });
  text('CAUTION\nPRESSURIZED', 0.43, 0.16, [3.73, 0.78, -1.74], root, { background: '#d2aa58', size: 43 });
  for (let i = 0; i < 3; i++) {
    box(0.56, 0.2, 0.21, [m.cloth, m.teal, m.orange][i], [-0.5 + i * 0.69, 3.53, -1.49]);
    box(0.075, 0.22, 0.24, m.rubber, [-0.5 + i * 0.69, 3.53, -1.47]);
  }
  for (const x of [-0.76, 2.77, 3.75]) {
    box(0.14, 0.36, 0.07, m.dark, [x, 2.65, -1.72]);
    for (let i = 0; i < 3; i++) indicator(x, 2.75 - i * 0.1, -1.667, i === 1 ? '#efb76e' : '#9be2bb');
  }
  const storage = group('storage', [-2.2, 0, 0.65]);
  box(0.95, 0.42, 0.68, m.teal, [0, 0.26, 0], storage, 0.06);
  box(0.97, 0.07, 0.7, m.ivory, [0, 0.5, 0], storage);
  for (const x of [-0.28, 0.28]) box(0.08, 0.45, 0.72, m.rubber, [x, 0.27, 0], storage);
  text('PERSONAL / 01', 0.55, 0.12, [0, 0.29, 0.35], storage);
  const cube = group(null, [0.17, 0.67, 0], storage); cube.rotation.y = 0.25;
  box(0.22, 0.22, 0.22, m.dark, [0, 0, 0], cube, 0.01);
  const colors = ['#bc5c3c', '#bdac60', '#538b86', '#d7dbc3'];
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) box(0.06, 0.06, 0.008, mat(colors[(a * 3 + b) % 4]), [(a - 1) * 0.07, (b - 1) * 0.07, 0.114], cube, 0.004);
  for (const x of [-0.26, 0.06]) {
    const slipper = group(null, [-1.2 + x, 0.1, 1.15]); slipper.rotation.y = -0.3;
    box(0.23, 0.08, 0.48, m.rubber, [0, 0, 0], slipper, 0.06);
    box(0.24, 0.12, 0.22, m.cloth, [0, 0.08, -0.06], slipper, 0.05);
    box(0.22, 0.025, 0.045, m.copper, [0, 0.14, -0.06], slipper);
  }
  shadow([-2.2, 0.055, 0.65], 1.5, 1.2);

  const stripGroup = group('strip');
  const stripMat = new THREE.MeshStandardMaterial({ color: '#f4dec0', emissive: '#ffcf91', emissiveIntensity: 2 });
  box(7.9, 0.024, 0.16, m.dark, [0, 0.054, 1.74], stripGroup, 0.008);
  const strip = box(7.75, 0.014, 0.07, stripMat, [0, 0.069, 1.74], stripGroup, 0.005);
  // A central longitudinal service light is easy to reach in the overview.
  box(5.2, 0.018, 0.115, m.dark, [-0.2, 0.054, -0.12], stripGroup, 0.004);
  box(5.1, 0.015, 0.045, stripMat, [-0.2, 0.068, -0.12], stripGroup, 0.004);
  const stripLights = [-2.6, 0, 2.5].map((x) => light('#ffd79e', 2.0, 4.5, [x, 0.37, 1.25]));
  for (const x of [-3.9, 3.9]) {
    box(0.16, 0.04, 0.22, m.copper, [x, 0.07, 1.74], stripGroup);
    text('LIGHT', 0.16, 0.09, [x, 0.096, 1.74], stripGroup, { size: 52 }).rotation.x = -Math.PI / 2;
  }

  const floating = [];
  for (const home of floatHomes) {
    const g = group(home.id === 'pen' ? 'pen' : null, home.center); floating.push({ group: g, home });
    if (home.id === 'pen') {
      cylinder(0.023, 0.3, m.copper, [0, 0, 0], g, 8);
      cylinder(0.024, 0.09, m.dark, [0, 0.15, 0], g, 8);
      mesh(new THREE.ConeGeometry(0.023, 0.07, 8), m.ivory, [0, -0.18, 0], g).rotation.z = Math.PI;
      rod([0.03, 0.19, 0], [0.03, 0.08, 0], 0.007, m.ivory, g);
      const hit = mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }), [0, 0, 0], g); hit.castShadow = false;
    } else if (home.id === 'manual') {
      for (const sign of [-1, 1]) {
        const page = group(null, [sign * 0.16, 0, 0], g); page.rotation.z = sign * -0.15;
        box(0.31, 0.025, 0.39, m.cloth, [0, 0, 0], page);
        const printed = decal(paper('plan'), 0.3, 0.38, [0, 0.015, 0], page); printed.rotation.x = -Math.PI / 2;
      }
      g.rotation.y = -0.25;
    } else if (home.id === 'earbuds') {
      for (const sign of [-1, 1]) {
        mesh(new THREE.SphereGeometry(0.037, 10, 8), m.ivory, [sign * 0.07, 0.02, 0], g);
        cylinder(0.016, 0.1, m.ivory, [sign * 0.07, -0.04, 0], g);
      }
    } else if (home.id === 'droplet') {
      mesh(new THREE.SphereGeometry(0.043, 20, 16), new THREE.MeshPhysicalMaterial({ color: '#bbeced', roughness: 0.05, metalness: 0.35, transparent: true, opacity: 0.72 }), [0, 0, 0], g);
      bulb('#c4f4ef', [0.012, 0.02, 0.024], 0.06, g);
    } else {
      mesh(new THREE.DodecahedronGeometry(0.043), m.copper, [0, 0, 0], g);
    }
  }

  const boltGeo = new THREE.CylinderGeometry(0.022, 0.024, 0.017, 6); boltGeo.rotateX(Math.PI / 2);
  const boltMesh = new THREE.InstancedMesh(boltGeo, m.dark, bolts.length);
  const dummy = new THREE.Object3D();
  bolts.forEach((p, i) => { dummy.position.set(...p); dummy.updateMatrix(); boltMesh.setMatrixAt(i, dummy.matrix); });
  root.add(boltMesh);
  return { root, targets, floating, zipper, indicators, strip, stripMat, stripLights, growMat, plantLight, readingLight, screenMap, screenContext: screenMap.image.getContext('2d') };
}
