import * as THREE from "three";
import { box, cylinder, sphere, torus, rod, tube, decal, label, wallZ } from "./habitat.js";
import { screenTexture, paperTexture, photoTexture, noteTexture, canvasTexture, labelTexture } from "./materials.js";

function headphones(parent, materials, position, floating = false) {
  const group = new THREE.Group();
  group.position.set(...position);
  parent.add(group);
  const points = [];
  for (let i = 0; i <= 18; i++) {
    const angle = (i / 18) * Math.PI;
    points.push([Math.cos(angle) * 0.17, Math.sin(angle) * 0.23, 0]);
  }
  tube(group, materials.rubber, points, 0.035, false);
  tube(group, materials.trim, points.map(([x, y, z]) => [x * 0.85, y * 0.94, z - 0.013]), 0.012, false);
  for (const side of [-1, 1]) {
    box(group, materials.dark, [0.075, 0.18, 0.14], [side * 0.17, -0.012, 0], 0.035);
    box(group, materials.fabric, [0.028, 0.14, 0.105], [side * 0.126, -0.012, 0], 0.018);
  }
  if (!floating) {
    rod(group, materials.dark, [0, 0.29, -0.03], [0, 0.32, -0.1], 0.018);
    group.rotation.z = 0.14;
  }
  return group;
}

function book(parent, materials, position, rotation = [0, 0, 0]) {
  const group = new THREE.Group();
  group.position.set(...position); group.rotation.set(...rotation);
  parent.add(group);
  box(group, materials.dark, [0.59, 0.027, 0.38], [0, 0, 0], 0.008);
  for (const side of [-1, 1]) {
    box(group, materials.white, [0.275, 0.028, 0.345], [side * 0.143, 0.025, 0], 0.007);
    decal(group, paperTexture("manual"), 0.254, 0.325, [side * 0.143, 0.056, 0], [-Math.PI / 2, 0, side < 0 ? Math.PI : 0]);
  }
  tube(group, materials.copper, [[-0.285, 0.01, -0.18], [-0.29, 0.05, 0], [-0.285, 0.01, 0.18]], 0.009, false);
  return group;
}

function createSleepArea(root, materials) {
  const group = new THREE.Group();
  group.position.set(-2.91, 0.08, -1.40);
  group.rotation.y = 0.30;
  root.add(group);
  box(group, materials.dark, [0.91, 2.04, 0.18], [0, 1.09, -0.06], 0.13);
  box(group, materials.fabric, [0.76, 1.89, 0.30], [0, 1.05, 0.075], 0.18);
  box(group, materials.orange, [0.61, 0.35, 0.22], [0, 1.81, 0.215], 0.11);
  box(group, materials.white, [0.44, 0.22, 0.15], [0, 1.84, 0.29], 0.075);
  box(group, materials.rubber, [0.43, 0.24, 0.045], [0, 1.55, 0.239], 0.05);
  box(group, materials.orange, [0.35, 0.12, 0.08], [0, 1.65, 0.27], 0.04);
  for (let i = 0; i < 15; i++) {
    const y = 0.28 + i * 0.079;
    const x = Math.sin(i * 0.28) * 0.021;
    box(group, materials.trim, [0.035, 0.035, 0.025], [x, y, 0.248], 0.003);
  }
  const zipper = new THREE.Group();
  zipper.position.set(0, 1.45, 0.273);
  group.add(zipper);
  box(zipper, materials.dark, [0.047, 0.075, 0.019], [0, 0, 0], 0.009);
  torus(zipper, materials.trim, 0.029, 0.008, [0, -0.045, 0.018], [0, 0, 0], 16);
  for (const x of [-0.26, 0.26]) {
    box(group, materials.rubber, [0.074, 1.74, 0.028], [x, 1.06, 0.244], 0.007);
    for (const y of [0.47, 1.16, 1.63]) {
      box(group, materials.dark, [0.14, 0.085, 0.05], [x, y, 0.25], 0.014);
    }
  }
  label(group, "SLEEP", "CREW / 01", 0.32, [0.16, 1.32, 0.249], "#bfccae");
  label(group, "04", "REST", 0.23, [-0.11, 0.31, 0.247], "#a5bca5");

  const board = new THREE.Group();
  board.position.set(-2.02, 1.13, -1.89);
  board.rotation.y = 0.13;
  root.add(board);
  box(board, materials.worktop, [0.87, 0.95, 0.065], [0, 0, 0], 0.04);
  box(board, materials.dark, [0.8, 0.035, 0.08], [0, 0.48, 0], 0.01);
  [[-0.23, 0.16, -0.05], [0.19, 0.20, 0.07], [-0.17, -0.23, -0.08]].forEach(([x, y, angle], i) => {
    const photo = decal(board, photoTexture(i), 0.28, 0.33, [x, y, 0.039], [0, 0, angle]);
    photo.material.roughness = 1;
  });
  decal(board, noteTexture(), 0.24, 0.24, [0.20, -0.22, 0.043], [0, 0, 0.1]);
  for (let i = 0; i < 3; i++) sphere(board, [materials.red, materials.yellow, materials.blue][i], 0.025, [-0.32 + i * 0.10, -0.43, 0.055], [1, 1, 0.3]);

  const lamp = new THREE.Group();
  lamp.position.set(-3.45, 1.35, -1.23); root.add(lamp);
  cylinder(lamp, materials.dark, 0.13, 0.08, [0, 0.65, -0.11], [Math.PI / 2, 0, 0]);
  rod(lamp, materials.copper, [0, 0.63, -0.08], [0.17, 0.64, 0.10], 0.026);
  rod(lamp, materials.copper, [0.17, 0.64, 0.10], [0.23, 0.38, 0.14], 0.023);
  cylinder(lamp, materials.yellow, 0.105, 0.16, [0.23, 0.35, 0.14], [0, 0, 0], 24, 0.17);
  cylinder(lamp, materials.light, 0.10, 0.008, [0.23, 0.263, 0.14]);
  const readingLight = new THREE.PointLight("#ffc176", 1.5, 3.2, 1.4);
  readingLight.position.set(-3.22, 1.55, -1.02); root.add(readingLight);
  return { group, zipper, readingLight };
}

function createWorkstation(root, materials) {
  const group = new THREE.Group();
  group.position.set(1.22, 0.08, -1.30);
  root.add(group);
  box(group, materials.dark, [2.10, 0.10, 0.85], [0, 0.88, 0.06], 0.035);
  box(group, materials.worktop, [2.04, 0.055, 0.79], [0, 0.947, 0.06], 0.025);
  for (const side of [-1, 1]) {
    rod(group, materials.trim, [side * 0.84, 0.05, 0.39], [side * 0.84, 0.89, -0.22], 0.031);
    rod(group, materials.dark, [side * 0.84, 0.12, 0.34], [side * 0.84, 0.75, -0.23], 0.023);
    box(group, materials.rubber, [0.16, 0.05, 0.16], [side * 0.84, 0.025, 0.40], 0.016);
  }
  box(group, materials.dark, [1.95, 0.17, 0.06], [0, 0.72, -0.345], 0.01);
  label(group, "WORK / 04", "ORBITAL SYSTEMS", 0.49, [-0.53, 0.735, -0.308], "#c8ccb9");

  const laptop = new THREE.Group();
  laptop.position.set(-0.24, 0.99, 0.04); group.add(laptop);
  box(laptop, materials.dark, [0.91, 0.035, 0.57], [0, 0, 0.08], 0.025);
  box(laptop, materials.trim, [0.87, 0.013, 0.53], [0, 0.023, 0.08], 0.02);
  const keyboardTexture = canvasTexture(512, 300, (ctx, w, h) => {
    ctx.fillStyle = "#304047"; ctx.fillRect(0, 0, w, h);
    for (let row = 0; row < 5; row++) for (let col = 0; col < 12; col++) {
      ctx.fillStyle = "#53636a"; ctx.fillRect(21 + col * 38 + (row === 3 ? 7 : 0), 20 + row * 37, 31, 28);
      ctx.fillStyle = "#a7bab7"; ctx.font = "11px monospace";
      ctx.fillText("QWERTYUIOPASD"[col] || "·", 32 + col * 38, 39 + row * 37);
    }
    ctx.fillStyle = "#667779"; ctx.fillRect(160, 226, 192, 57);
  });
  decal(laptop, keyboardTexture, 0.73, 0.40, [0, 0.033, 0.075], [-Math.PI / 2, 0, 0]);
  const lid = new THREE.Group(); lid.position.set(0, 0.035, -0.20); lid.rotation.x = -0.13; laptop.add(lid);
  box(lid, materials.dark, [0.90, 0.59, 0.034], [0, 0.28, 0], 0.025);
  const screenMap = screenTexture();
  const screenMaterial = new THREE.MeshStandardMaterial({ map: screenMap, emissiveMap: screenMap, emissive: "#ffffff", emissiveIntensity: 0.9, roughness: 1 });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.81, 0.49), screenMaterial);
  screen.position.set(0, 0.285, 0.02); lid.add(screen);
  cylinder(laptop, materials.cyan, 0.009, 0.006, [0.38, 0.037, 0.29], [0, 0, 0], 8);
  headphones(group, materials, [0.78, 0.62, -0.32]);

  cylinder(group, materials.dark, 0.09, 0.29, [0.67, 1.12, 0.20], [0, 0, 0], 24, 0.078);
  cylinder(group, materials.trim, 0.091, 0.025, [0.67, 1.267, 0.20]);
  cylinder(group, materials.copper, 0.083, 0.11, [0.67, 1.09, 0.20]);
  box(group, materials.rubber, [0.19, 0.041, 0.018], [0.67, 1.16, 0.286], 0.006);
  torus(group, materials.trim, 0.065, 0.016, [0.755, 1.14, 0.19], [0, Math.PI / 2, 0], 24);
  label(group, "COFFEE", "400 KM BLEND", 0.12, [0.67, 1.09, 0.286], "#d2b17c");

  for (let i = 0; i < 2; i++) {
    const page = decal(root, paperTexture("blueprint"), 0.44, 0.55, [0.11 + i * 0.51, 0.73 + i * 0.035, wallZ(0.11 + i * 0.51) + 0.025], [0, 0.03, i ? 0.06 : -0.025]);
    page.material.roughness = 1;
    box(root, materials.yellow, [0.14, 0.035, 0.012], [0.11 + i * 0.51, 1.01 + i * 0.035, wallZ(0.11 + i * 0.51) + 0.036]);
  }
  const notebook = new THREE.Group(); notebook.position.set(-0.71, 1.003, 0.25); notebook.rotation.y = -0.13; group.add(notebook);
  box(notebook, materials.red, [0.26, 0.038, 0.32], [0, 0, 0], 0.009);
  decal(notebook, paperTexture("manual"), 0.235, 0.285, [0, 0.021, 0], [-Math.PI / 2, 0, 0]);
  box(notebook, materials.rubber, [0.023, 0.042, 0.325], [0.089, 0.002, 0]);
  return { group, screenMap, screenCanvas: screenMap.image, screenContext: screenMap.image.getContext("2d") };
}

function createChair(root, materials) {
  const group = new THREE.Group(); group.position.set(1.62, 0.06, 0.10); group.rotation.y = Math.PI + 0.18; root.add(group);
  cylinder(group, materials.dark, 0.34, 0.07, [0, 0.04, 0], [0, 0, 0], 32);
  cylinder(group, materials.trim, 0.07, 0.39, [0, 0.25, 0.06]);
  const seat = new THREE.Group(); seat.position.set(0, 0.47, 0); seat.rotation.x = -0.12; group.add(seat);
  box(seat, materials.dark, [0.78, 0.13, 0.82], [0, 0, 0], 0.08);
  box(seat, materials.fabric, [0.67, 0.14, 0.69], [0, 0.105, -0.015], 0.10);
  const back = new THREE.Group(); back.position.set(0, 0.13, 0.29); back.rotation.x = 0.34; seat.add(back);
  box(back, materials.dark, [0.77, 0.90, 0.14], [0, 0.39, 0], 0.085);
  box(back, materials.fabric, [0.66, 0.72, 0.16], [0, 0.38, -0.07], 0.075);
  box(back, materials.orange, [0.44, 0.24, 0.16], [0, 0.74, -0.085], 0.06);
  for (const side of [-1, 1]) {
    rod(group, materials.trim, [side * 0.37, 0.34, 0.21], [side * 0.42, 0.78, 0.22], 0.028);
    box(group, materials.dark, [0.15, 0.105, 0.71], [side * 0.43, 0.77, -0.03], 0.045);
    box(group, materials.fabric, [0.12, 0.04, 0.55], [side * 0.43, 0.835, -0.005], 0.025);
  }
  box(group, materials.dark, [0.16, 0.036, 0.30], [0.43, 0.87, -0.08], 0.022);
  for (let i = 0; i < 3; i++) box(group, i === 0 ? materials.amber : materials.cyan, [0.069, 0.016, 0.048], [0.43, 0.895, -0.17 + i * 0.083], 0.006);
  for (const x of [-0.23, 0.23]) {
    rod(group, materials.trim, [x, 0.42, -0.31], [x, 0.19, -0.59], 0.027);
    box(group, materials.rubber, [0.18, 0.045, 0.31], [x, 0.17, -0.68], 0.018);
  }
  return group;
}

function createPlants(root, materials) {
  const group = new THREE.Group(); group.position.set(-2.03, 0.07, -1.10); group.rotation.y = 0.18; root.add(group);
  box(group, materials.dark, [0.78, 0.09, 0.61], [0, 0.08, 0], 0.03);
  for (const x of [-0.34, 0.34]) for (const z of [-0.24, 0.24]) rod(group, materials.trim, [x, 0.08, z], [x, 1.62, z], 0.025);
  for (let level = 0; level < 3; level++) {
    const y = 0.28 + level * 0.43;
    box(group, materials.ivory, [0.77, 0.085, 0.61], [0, y, 0], 0.025);
    box(group, materials.dark, [0.65, 0.03, 0.48], [0, y + 0.05, 0], 0.02);
    for (let row = 0; row < 2; row++) for (let col = 0; col < 3; col++) {
      const x = -0.22 + col * 0.22, z = -0.14 + row * 0.28;
      cylinder(group, materials.white, 0.07, 0.09, [x, y + 0.1, z], [0, 0, 0], 12, 0.055);
      for (let leaf = 0; leaf < 6; leaf++) {
        const angle = leaf / 6 * Math.PI * 2 + col;
        const geometry = new THREE.SphereGeometry(0.1, 7, 5);
        const object = new THREE.Mesh(geometry, (leaf + level) % 3 ? materials.leaf : materials.leafLight);
        object.scale.set(0.57, 1.25, 0.16);
        object.position.set(x + Math.cos(angle) * 0.055, y + 0.22, z + Math.sin(angle) * 0.055);
        object.rotation.set(Math.cos(angle) * 0.7, angle, Math.sin(angle) * 0.75);
        group.add(object);
      }
    }
    if (level < 2) {
      box(group, materials.dark, [0.67, 0.038, 0.19], [0, y + 0.39, -0.04], 0.014);
      box(group, materials.grow, [0.59, 0.013, 0.09], [0, y + 0.365, -0.035], 0.005);
    }
  }
  box(group, materials.dark, [0.72, 0.07, 0.34], [0, 1.60, 0], 0.025);
  box(group, materials.grow, [0.65, 0.018, 0.20], [0, 1.557, 0], 0.009);
  for (const x of [-0.16, 0.03, 0.23]) {
    sphere(group, materials.glass, 0.014, [x, 1.03, 0.27], [1, 1.3, 1], 10);
  }
  label(group, "EDEN", "HYDROPONICS / 02", 0.39, [0, 0.095, 0.317], "#b9c6a7");
  label(group, "BASIL", "DAY 164", 0.24, [0.18, 0.31, 0.321], "#d0d2b4");
  const light = new THREE.PointLight("#ee86c4", 1.25, 2.8, 1.3); light.position.set(0, 1.36, 0.28); group.add(light);
  return { group, light };
}

function createBike(root, materials) {
  const group = new THREE.Group(); group.position.set(3.0, 0.09, -0.25); group.rotation.y = -0.45; root.add(group);
  box(group, materials.dark, [0.79, 0.08, 0.76], [0, 0.055, 0], 0.035);
  box(group, materials.trim, [0.69, 0.025, 0.68], [0, 0.108, 0], 0.024);
  const flywheel = cylinder(group, materials.dark, 0.30, 0.12, [0, 0.43, -0.20], [0, 0, Math.PI / 2], 32);
  torus(group, materials.trim, 0.245, 0.035, [0.07, 0.43, -0.20], [0, Math.PI / 2, 0], 32);
  cylinder(group, materials.yellow, 0.08, 0.14, [0, 0.43, -0.20], [0, 0, Math.PI / 2], 16);
  rod(group, materials.trim, [0, 0.16, 0.24], [0, 0.94, 0.04], 0.045);
  rod(group, materials.dark, [0, 0.42, -0.19], [0, 0.88, 0.12], 0.051);
  rod(group, materials.trim, [0, 0.19, -0.28], [0, 1.05, -0.30], 0.038);
  box(group, materials.rubber, [0.32, 0.085, 0.27], [0, 1.09, -0.28], 0.05);
  rod(group, materials.trim, [0, 0.85, 0.1], [0, 1.17, 0.21], 0.035);
  rod(group, materials.rubber, [-0.31, 1.17, 0.21], [0.31, 1.17, 0.21], 0.037);
  for (const side of [-1, 1]) {
    tube(group, materials.rubber, [[side * 0.26, 1.17, 0.21], [side * 0.34, 1.16, 0.22], [side * 0.34, 1.02, 0.19]], 0.033, false);
    for (let i = 0; i < 7; i++) torus(group, materials.fabric, 0.037, 0.006, [side * 0.31, 1.17, 0.17 + i * 0.013], [0, 0, 0], 12);
    rod(group, materials.dark, [side * 0.04, 0.43, -0.2], [side * 0.16, 0.30 + side * 0.07, -0.2], 0.017);
    box(group, materials.rubber, [0.17, 0.04, 0.13], [side * 0.20, 0.29 + side * 0.07, -0.2], 0.015);
  }
  box(group, materials.dark, [0.22, 0.15, 0.07], [0, 1.22, 0.22], 0.017);
  label(group, "02:18", "104 W", 0.18, [0, 1.22, 0.258], "#153a40", [0, 0, 0]);
  const towel = new THREE.Group(); towel.position.set(-0.41, 0.9, -0.15); towel.rotation.z = 0.1; group.add(towel);
  box(towel, materials.orange, [0.23, 0.54, 0.05], [0, 0, 0], 0.024);
  for (let i = 0; i < 6; i++) box(towel, materials.white, [0.20, 0.013, 0.006], [0, -0.19 + i * 0.025, 0.028]);
  return { group, flywheel };
}

function createStorage(root, materials) {
  const group = new THREE.Group(); group.position.set(3.23, 1.15, -1.40); group.rotation.y = -0.32; root.add(group);
  for (let pocket = 0; pocket < 3; pocket++) {
    const x = (pocket - 1) * 0.36;
    box(group, materials.dark, [0.34, 0.56, 0.03], [x, 0, 0], 0.025);
    for (let row = 0; row < 5; row++) {
      const y = -0.23 + row * 0.105;
      tube(group, materials.fabric, [[x - 0.15, y, 0.025], [x, y - 0.024, 0.15], [x + 0.15, y, 0.025]], 0.011, false);
    }
    for (let col = 0; col < 4; col++) {
      const xx = x - 0.15 + col * 0.10;
      tube(group, materials.fabric, [[xx, -0.26, 0.03], [xx, -0.02, 0.17], [xx, 0.25, 0.03]], 0.01, false);
    }
    box(group, pocket === 1 ? materials.yellow : materials.white, [0.19, 0.29, 0.13], [x, -0.01, 0.074], 0.025);
    label(group, pocket === 0 ? "FOOD" : pocket === 1 ? "TOOLS" : "04", "PERSONAL", 0.19, [x, 0.31, 0.026], "#c9c9ac");
    if (pocket === 1) {
      rod(group, materials.trim, [x - 0.05, 0.08, 0.16], [x + 0.02, 0.24, 0.16], 0.022);
      torus(group, materials.trim, 0.041, 0.014, [x + 0.035, 0.25, 0.16], [0, 0, 0], 16);
    }
    if (pocket === 2) {
      const cube = new THREE.Group(); cube.position.set(x, 0.02, 0.18); cube.rotation.set(0.2, 0.3, 0.1); group.add(cube);
      box(cube, materials.dark, [0.15, 0.15, 0.15], [0, 0, 0], 0.008);
      for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
        box(cube, [materials.red, materials.yellow, materials.blue][(row + col) % 3], [0.042, 0.042, 0.005], [-0.048 + col * 0.048, -0.048 + row * 0.048, 0.078], 0.003);
      }
    }
  }
  const safety = new THREE.Group(); safety.position.set(3.67, 0.63, -0.80); safety.rotation.y = -0.55; root.add(safety);
  cylinder(safety, materials.red, 0.13, 0.53, [0, 0, 0], [0, 0, 0], 20);
  sphere(safety, materials.red, 0.13, [0, 0.265, 0], [1, 0.65, 1]);
  cylinder(safety, materials.dark, 0.055, 0.10, [0, 0.38, 0]);
  box(safety, materials.trim, [0.17, 0.045, 0.08], [0.04, 0.45, 0], 0.015);
  tube(safety, materials.rubber, [[0.08, 0.38, 0], [0.2, 0.31, 0.04], [0.19, -0.16, 0.04]], 0.025);
  label(safety, "FIRE", "CO₂", 0.17, [0, 0.05, 0.132], "#d2c6a6");
  for (const y of [-0.16, 0.20]) box(safety, materials.dark, [0.30, 0.055, 0.13], [0, y, -0.045], 0.012);
  box(root, materials.white, [0.41, 0.36, 0.18], [3.68, 1.42, -1.16], 0.04);
  box(root, materials.red, [0.07, 0.25, 0.013], [3.68, 1.42, -1.063]);
  box(root, materials.red, [0.25, 0.07, 0.013], [3.68, 1.42, -1.062]);

  const clothes = new THREE.Group(); clothes.position.set(-2.63, 2.19, -1.89); clothes.rotation.y = 0.18; root.add(clothes);
  for (let i = 0; i < 2; i++) {
    const x = i * 0.43;
    box(clothes, i ? materials.orange : materials.fabric, [0.34, 0.47, 0.07], [x, -0.11, 0], 0.07);
    box(clothes, materials.rubber, [0.12, 0.065, 0.015], [x, 0.14, 0.041], 0.02);
    for (const side of [-1, 1]) box(clothes, i ? materials.orange : materials.fabric, [0.13, 0.26, 0.055], [x + side * 0.19, 0.0, 0], 0.025);
    box(clothes, materials.rubber, [0.05, 0.48, 0.012], [x, -0.10, 0.043]);
  }

  for (let i = 0; i < 2; i++) {
    const slipper = new THREE.Group(); slipper.position.set(-2.55 + i * 0.29, 0.10, 0.39 + i * 0.05); slipper.rotation.y = -0.12 + i * 0.07; root.add(slipper);
    box(slipper, materials.dark, [0.23, 0.044, 0.49], [0, 0, 0], 0.085);
    box(slipper, materials.fabric, [0.22, 0.09, 0.23], [0, 0.055, -0.10], 0.065);
    box(slipper, materials.rubber, [0.235, 0.025, 0.055], [0, 0.098, -0.1], 0.012);
  }
  return group;
}

function createUtility(root, materials) {
  const group = new THREE.Group(); group.position.set(-0.62, 0.48, -1.86); root.add(group);
  box(group, materials.dark, [0.76, 0.43, 0.17], [0, 0, 0], 0.035);
  box(group, materials.trim, [0.69, 0.36, 0.05], [0, 0, 0.092], 0.02);
  label(group, "ECLSS", "AIR REVITALIZATION", 0.36, [0, 0.09, 0.12], "#bcc5b4");
  const indicators = [];
  for (let i = 0; i < 5; i++) {
    const material = materials.cyan.clone();
    const indicator = box(group, material, [0.042, 0.042, 0.021], [-0.24 + i * 0.12, -0.11, 0.126], 0.008);
    indicators.push(indicator);
  }
  tube(root, materials.pipe, [[-0.6, 0.68, -1.85], [-0.65, 0.98, -1.85], [-0.56, 1.13, -1.9]], 0.025);
  return indicators;
}

export function createFurniture(root, materials) {
  const sleep = createSleepArea(root, materials);
  const workstation = createWorkstation(root, materials);
  const chair = createChair(root, materials);
  const plants = createPlants(root, materials);
  const bike = createBike(root, materials);
  const storage = createStorage(root, materials);
  const indicators = createUtility(root, materials);

  const pen = new THREE.Group(); pen.position.set(0.98, 1.58, -0.79); root.add(pen);
  cylinder(pen, materials.yellow, 0.017, 0.32, [0, 0, 0], [0, 0, 0], 10);
  cylinder(pen, materials.dark, 0.017, 0.055, [0, -0.186, 0], [0, 0, 0], 10, 0.004);
  cylinder(pen, materials.trim, 0.018, 0.042, [0, 0.17, 0], [0, 0, 0], 10);
  box(pen, materials.trim, [0.012, 0.085, 0.013], [0.021, 0.122, 0], 0.003);
  pen.rotation.z = 1.0;

  const manual = book(root, materials, [1.92, 1.65, -0.88], [-0.28, 0.22, 0.1]);
  const earbuds = headphones(root, materials, [-0.53, 1.55, -0.63], true);
  earbuds.scale.setScalar(0.65);
  const droplet = sphere(root, materials.glass, 0.035, [-1.65, 1.71, -0.62], [0.85, 1.35, 0.85], 16);
  const crumb = sphere(root, materials.yellow, 0.026, [0.25, 1.44, -0.77], [1, 0.6, 0.8], 7);
  const screenLight = new THREE.PointLight("#78ddd5", 0.55, 2.2, 1.2); screenLight.position.set(0.98, 1.4, -0.97); root.add(screenLight);
  return { sleep, workstation, chair, plants, bike, storage, indicators, pen, manual, earbuds, droplet, crumb, screenLight };
}
