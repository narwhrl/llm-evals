import * as THREE from "three";
import { PORTHOLE, ROOM, ZONES, wallClear } from "./layout.js";
import { box, cyl, group, plane, rbox, sphere, std, tube } from "./utils.js";
import { labelTexture, noteTexture } from "./textures.js";

const WALL_Z = ROOM.wallZ;

function sleepZone(parent, materials) {
  const g = group(parent, { name: "sleep-zone" });
  const x = ZONES.sleep.x;
  // Vertical sleeping bag strapped to the wall, zip half open, pillow peeking.
  // Hung 0.46 m off the wall so it reads as a separate object, with its open
  // face turned slightly toward the cabin.
  const bag = group(g, { x: x + 0.02, y: 1.02, z: WALL_Z + 0.46, ry: 0.26 });
  const shell = rbox(0.62, 1.64, 0.26, 0.1, materials.sleepingBag, { x: 0, y: 0, z: 0 });
  bag.add(shell);
  // opening: a recessed darker fabric panel with the pillow
  const inner = rbox(0.46, 1.24, 0.07, 0.06, materials.fabricOlive, { x: 0, y: -0.16, z: 0.12 });
  bag.add(inner);
  const pillow = rbox(0.36, 0.21, 0.12, 0.055, materials.fabricBeige, { x: 0, y: 0.44, z: 0.14 });
  bag.add(pillow);
  // Quilted rolls across the foot of the bag.
  for (let i = 0; i < 3; i += 1) {
    bag.add(cyl(0.055, 0.055, 0.56, 12, materials.sleepingBag, { y: -0.5 - i * 0.1, z: 0.1, rz: Math.PI / 2 }));
  }
  // Hood roll at the top, so the bag reads as a bag rather than a panel.
  const hood = rbox(0.5, 0.16, 0.2, 0.07, materials.sleepingBag, { y: 0.78, z: 0.02 });
  bag.add(hood);
  // zipper teeth and pull
  const zipMat = std(0x9aa0a0, { metalness: 0.6, roughness: 0.4 });
  for (let i = 0; i < 22; i += 1) {
    const t = i / 21;
    const y = -0.76 + t * 1.48;
    const xo = 0.2 + Math.sin(t * 2.4) * 0.012;
    bag.add(box(0.012, 0.02, 0.012, zipMat, { x: xo, y, z: 0.18 }));
    bag.add(box(0.012, 0.02, 0.012, zipMat, { x: -xo, y, z: 0.18 }));
  }
  const slider = group(bag, { x: 0.2, y: 0.26, z: 0.2 });
  slider.add(box(0.035, 0.05, 0.02, materials.metal));
  const pull = group(slider, { x: 0, y: -0.03, z: 0.01 });
  pull.add(box(0.022, 0.1, 0.008, materials.darkMetal, { y: -0.06 }));
  pull.name = "zipper-pull";
  // straps to the wall
  for (const y of [0.55, -0.55]) {
    bag.add(box(0.66, 0.06, 0.02, materials.fabricOlive, { x: 0, y, z: 0.15 }));
    bag.add(box(0.03, 0.03, 0.18, materials.metal, { x: 0.31, y, z: -0.05 }));
  }

  // Divider board with photos and a handwritten note, on the wall beside the bag.
  const board = group(g, { x: x + 0.72, y: 0.72, z: WALL_Z + 0.06 });
  board.add(rbox(0.62, 0.66, 0.03, 0.02, materials.panel, { x: 0, y: 0 }));
  const photos = [
    { kind: 0, x: -0.16, y: 0.14, ry: 0.04, s: 1 },
    { kind: 1, x: 0.12, y: 0.2, ry: -0.05, s: 0.72 },
    { kind: 2, x: 0.14, y: -0.13, ry: 0.02, s: 0.82 },
  ];
  for (const p of photos) {
    const mat = materials.photo(p.kind);
    const photo = plane(0.2 * p.s, 0.25 * p.s, mat, { x: p.x, y: p.y, z: 0.024, rz: p.ry });
    board.add(photo);
    const tape = plane(0.06, 0.028, std(0xd9d2b6, { roughness: 0.9, transparent: true, opacity: 0.75 }), {
      x: p.x,
      y: p.y + 0.125 * p.s,
      z: 0.028,
    });
    board.add(tape);
  }
  const note = plane(0.17, 0.17, materials.note(["记得喝水", "检查 O2"]), { x: -0.19, y: -0.16, z: 0.025, rz: -0.06 });
  board.add(note);

  // Reading lamp.
  const lamp = group(g, { x: x - 0.44, y: 1.66, z: WALL_Z + 0.26 });
  lamp.add(box(0.05, 0.16, 0.05, materials.metal, { y: 0.06 }));
  lamp.add(cyl(0.09, 0.13, 0.15, 16, materials.metal, { y: -0.03, rx: Math.PI }));
  const bulb = sphere(0.055, 12, 10, materials.readLamp, { y: -0.12 });
  bulb.name = "reading-lamp";
  lamp.add(bulb);
  return { group: g, lamp, pull, bag };
}

function workZone(parent, materials) {
  const g = group(parent, { name: "work-zone" });
  const x = ZONES.work.x;
  const z = ZONES.work.z;
  // Fold-down desk under the big porthole.
  const desk = group(g, { x, y: 0.74, z });
  desk.add(rbox(1.86, 0.06, 0.56, 0.02, materials.panel, { x: 0, y: 0 }));
  desk.add(box(1.86, 0.03, 0.06, materials.metal, { x: 0, y: -0.035, z: 0.25 }));
  for (const dx of [-0.78, 0.78]) {
    const leg = box(0.05, 0.7, 0.05, materials.metal, { x: dx, y: -0.37, z: 0.2 });
    desk.add(leg);
    const brace = box(0.05, 0.05, 0.42, materials.metal, { x: dx, y: -0.7, z: 0.05 });
    desk.add(brace);
  }
  // Laptop, screen toward the viewer.
  const laptop = group(desk, { x: -0.16, y: 0.06, z: 0.02 });
  laptop.add(rbox(0.62, 0.02, 0.42, 0.012, materials.panelDark, { y: 0.01 }));
  laptop.add(rbox(0.56, 0.004, 0.3, 0.006, materials.black, { y: 0.023 }));
  const lid = group(laptop, { x: 0, y: 0.02, z: -0.19, rx: -0.24 });
  lid.add(rbox(0.62, 0.38, 0.018, 0.012, materials.panelDark, { y: 0.19 }));
  const screen = plane(0.56, 0.32, materials.screen, { y: 0.19, z: 0.011 });
  screen.name = "laptop-screen";
  lid.add(screen);
  // headphones hooked on the desk edge
  const hp = group(desk, { x: 0.66, y: 0.02, z: 0.22 });
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.017, 6, 20, Math.PI), materials.black);
  band.rotation.z = Math.PI;
  hp.add(band);
  for (const dx of [-0.115, 0.115]) {
    hp.add(cyl(0.048, 0.052, 0.05, 14, materials.black, { x: dx, y: -0.06, rz: Math.PI / 2 }));
  }
  // travel mug with velcro patch
  const mug = group(desk, { x: 0.56, y: 0.06, z: -0.05 });
  mug.add(cyl(0.058, 0.05, 0.2, 18, materials.porcelain, { y: 0.1 }));
  mug.add(cyl(0.061, 0.061, 0.035, 18, materials.darkMetal, { y: 0.2 }));
  mug.add(box(0.09, 0.02, 0.09, materials.stripe, { y: 0.005 }));
  // papers
  const sheet = plane(0.26, 0.34, materials.blueprint, { x: 0.16, y: 0.066, z: 0.1, rx: -Math.PI / 2, rz: 0.2 });
  desk.add(sheet);
  // small tool tray
  const tray = rbox(0.3, 0.04, 0.16, 0.01, materials.metal, { x: 0.24, y: 0.02, z: -0.16 });
  desk.add(tray);
  tray.add(box(0.16, 0.02, 0.02, materials.orange, { x: -0.04, y: 0.03, z: 0 }));
  tray.add(box(0.1, 0.02, 0.02, materials.darkMetal, { x: 0.05, y: 0.03, z: 0.04 }));

  // Drawings clipped to the wall beside the porthole, clear of the opening.
  const drawings = group(g, { x: x - 1.02, y: 1.6, z: WALL_Z + 0.06 });
  drawings.add(plane(0.34, 0.42, materials.blueprint, { x: 0, y: 0, rz: 0.03 }));
  drawings.add(plane(0.26, 0.34, materials.paper, { x: 0.33, y: -0.02, rz: -0.05 }));
  drawings.add(box(0.1, 0.02, 0.02, materials.metal, { x: 0.02, y: 0.2, z: 0.01 }));
  return { group: g, desk, screen, laptop };
}

function viewSeat(parent, materials) {
  const g = group(parent, { name: "view-seat" });
  const x = ZONES.seat.x;
  const z = ZONES.seat.z;
  const seat = group(g, { x, y: 0, z });
  // Fixed pedestal
  seat.add(cyl(0.2, 0.26, 0.1, 16, materials.metal, { y: 0.05 }));
  seat.add(cyl(0.08, 0.08, 0.34, 12, materials.darkMetal, { y: 0.26 }));
  // Seat pan, with the back reclined toward the window (-z) and the sitter
  // facing the porthole.
  seat.add(rbox(0.62, 0.12, 0.56, 0.05, materials.fabricBlue, { y: 0.5, z: 0.06 }));
  const back = group(seat, { x: 0, y: 0.56, z: 0.28, rx: -0.22 });
  back.add(rbox(0.6, 0.74, 0.16, 0.06, materials.fabricBlue, { y: 0.32 }));
  back.add(rbox(0.4, 0.24, 0.06, 0.03, materials.fabricBeige, { y: 0.46, z: -0.1 }));
  back.add(rbox(0.36, 0.2, 0.14, 0.05, materials.fabricBlue, { y: 0.74, z: -0.02 }));
  // Armrests with the control pad facing the sitter.
  for (const dx of [-0.34, 0.34]) {
    seat.add(box(0.09, 0.06, 0.5, materials.darkMetal, { x: dx, y: 0.66, z: 0.04 }));
    seat.add(box(0.05, 0.16, 0.05, materials.metal, { x: dx, y: 0.58, z: 0.22 }));
  }
  const pad = rbox(0.14, 0.02, 0.22, 0.008, materials.controlPanel, { x: 0.34, y: 0.695, z: 0.02 });
  seat.add(pad);
  const buttons = [];
  const buttonMats = [
    new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x6fe3ff, emissiveIntensity: 2.2 }),
    new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffa64d, emissiveIntensity: 2.0 }),
    new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x8dff9e, emissiveIntensity: 2.0 }),
  ];
  for (let i = 0; i < 3; i += 1) {
    const b = cyl(0.016, 0.016, 0.008, 10, buttonMats[i], { x: 0.34 + (i - 1) * 0.04, y: 0.708, z: -0.04 });
    seat.add(b);
    buttons.push(b);
  }
  // seat harness straps
  for (const dx of [-0.16, 0.16]) {
    const strap = box(0.07, 0.02, 0.5, materials.fabricOlive, { x: dx, y: 0.565, z: 0.06 });
    seat.add(strap);
  }
  return { group: g, seat, buttons };
}

function plantZone(parent, materials) {
  const g = group(parent, { name: "plant-zone" });
  const x = ZONES.plants.x;
  const z = ZONES.plants.z;
  const rack = group(g, { x, y: 0, z });
  // Frame
  const frameMat = materials.metal;
  for (const dx of [-0.42, 0.42]) {
    for (const dz of [-0.16, 0.16]) {
      rack.add(box(0.035, 1.5, 0.035, frameMat, { x: dx, y: 0.75, z: dz }));
    }
  }
  const shelfYs = [0.42, 0.86, 1.3];
  for (const y of shelfYs) {
    rack.add(rbox(0.92, 0.045, 0.4, 0.012, materials.panel, { y }));
    rack.add(box(0.9, 0.02, 0.36, materials.darkMetal, { y: y + 0.03 }));
  }
  // grow light bar
  const lightBar = group(rack, { y: 1.56, z: 0 });
  lightBar.add(box(0.86, 0.06, 0.08, materials.darkMetal, { y: 0 }));
  const glow = box(0.8, 0.018, 0.05, materials.growLight, { y: -0.032 });
  glow.name = "grow-light";
  lightBar.add(glow);
  const lampLight = new THREE.PointLight(0xff6bd4, 1.4, 2.6, 2);
  lampLight.position.set(0, 1.5, 0.06);
  lightBar.add(lampLight);

  // Hydroponic trays and plants on each shelf.
  const leaves = [];
  const rand = (n) => {
    const v = Math.sin(n * 12.9898) * 43758.5453;
    return v - Math.floor(v);
  };
  shelfYs.forEach((y, si) => {
    const tray = rbox(0.86, 0.08, 0.34, 0.015, materials.porcelain, { y: y + 0.06 });
    rack.add(tray);
    const water = box(0.8, 0.012, 0.28, std(0x6d8f9a, { roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.8 }), { y: y + 0.1 });
    rack.add(water);
    const count = si === 2 ? 4 : 5;
    for (let i = 0; i < count; i += 1) {
      const px = -0.34 + (i / (count - 1)) * 0.68 + rand(si * 7 + i) * 0.03;
      const pz = (rand(si * 13 + i * 3) - 0.5) * 0.18;
      const plant = group(rack, { x: px, y: y + 0.12, z: pz });
      const stem = cyl(0.006, 0.008, 0.16, 5, materials.stem, { y: 0.08 });
      plant.add(stem);
      const leafCount = 5 + Math.round(rand(si * 3 + i) * 3);
      for (let l = 0; l < leafCount; l += 1) {
        const a = (l / leafCount) * Math.PI * 2 + rand(i * 5 + l) * 0.8;
        const tilt = 0.55 + rand(i * 11 + l) * 0.5;
        const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.17), materials.leaf);
        leaf.position.set(Math.cos(a) * 0.055, 0.1 + l * 0.016, Math.sin(a) * 0.055);
        leaf.rotation.set(tilt * Math.cos(a), -a, tilt * Math.sin(a));
        leaf.castShadow = true;
        plant.add(leaf);
        leaves.push(leaf);
      }
    }
  });
  return { group: g, rack, glow, lampLight, leaves };
}

function bikeZone(parent, materials) {
  const g = group(parent, { name: "bike-zone" });
  const x = ZONES.bike.x;
  const z = ZONES.bike.z;
  const bike = group(g, { x, y: 0, z, ry: -0.35 });
  // frame
  const frameMat = std(0x4d555c, { roughness: 0.5, metalness: 0.5 });
  bike.add(box(0.06, 0.5, 0.06, frameMat, { x: 0, y: 0.4, z: 0.3, rx: -0.3 }));
  bike.add(box(0.06, 0.5, 0.06, frameMat, { x: 0, y: 0.4, z: -0.28, rx: 0.28 }));
  bike.add(box(0.06, 0.06, 0.6, frameMat, { x: 0, y: 0.52, z: 0.02 }));
  // flywheel
  const wheel = cyl(0.28, 0.28, 0.05, 24, materials.darkMetal, { y: 0.36, z: 0.42, rx: Math.PI / 2 });
  bike.add(wheel);
  bike.add(cyl(0.06, 0.06, 0.07, 12, materials.metal, { y: 0.36, z: 0.42, rx: Math.PI / 2 }));
  // base rails
  bike.add(box(0.12, 0.05, 0.9, frameMat, { y: 0.03, z: 0.04 }));
  bike.add(box(0.5, 0.05, 0.08, frameMat, { y: 0.03, z: -0.42 }));
  // seat and handlebars
  bike.add(rbox(0.2, 0.07, 0.28, 0.03, materials.black, { y: 0.78, z: -0.24 }));
  bike.add(box(0.06, 0.22, 0.06, materials.metal, { y: 0.66, z: -0.24 }));
  const bars = box(0.46, 0.04, 0.04, materials.metal, { y: 0.86, z: 0.26 });
  bike.add(bars);
  const tape = box(0.48, 0.05, 0.05, materials.towel, { y: 0.86, z: 0.26 });
  bike.add(tape);
  // pedals
  bike.add(box(0.16, 0.02, 0.06, materials.black, { y: 0.3, z: 0.1 }));
  bike.add(box(0.16, 0.02, 0.06, materials.black, { y: 0.22, z: 0.1 }));
  // small console
  bike.add(rbox(0.2, 0.12, 0.05, 0.01, materials.controlPanel, { y: 0.9, z: 0.22, rx: -0.5 }));

  // Towel hanging above.
  const towel = group(g, { x: x + 0.02, y: 1.56, z: WALL_Z + 0.09 });
  towel.add(box(0.34, 0.02, 0.03, materials.metal, { y: 0.22 }));
  const cloth = rbox(0.3, 0.5, 0.035, 0.01, materials.towel, { y: 0 });
  cloth.rotation.z = 0.03;
  towel.add(cloth);
  return { group: g, bike };
}

function storageZone(parent, materials) {
  const g = group(parent, { name: "storage-zone" });
  const x = ZONES.storage.x;
  // Nylon net pockets with food bags, tools, a cube. Pockets sit clear of the
  // window sightlines so nothing overlaps the glass in the first view.
  const pockets = [
    { x: -1.05, y: 1.3, w: 0.38, h: 0.3, contents: "food" },
    { x: -0.5, y: 1.3, w: 0.36, h: 0.3, contents: "tools" },
    { x: -1.05, y: 0.92, w: 0.34, h: 0.28, contents: "cube" },
  ];
  for (const p of pockets) {
    if (!wallClear(p.x, p.y, p.w / 2, p.h / 2, WALL_Z + 0.08)) continue;
    const holder = group(g, { x: p.x, y: p.y, z: WALL_Z + 0.08 });
    holder.add(rbox(p.w + 0.03, 0.02, 0.03, 0.01, materials.metal, { y: p.h / 2 }));
    const net = plane(p.w, p.h, materials.net, { z: 0.09 });
    holder.add(net);
    // side net
    holder.add(plane(p.h, 0.16, materials.net, { x: -p.w / 2, y: 0, z: 0.05, ry: Math.PI / 2 }));
    holder.add(plane(p.h, 0.16, materials.net, { x: p.w / 2, y: 0, z: 0.05, ry: Math.PI / 2 }));
    if (p.contents === "food") {
      holder.add(rbox(0.16, 0.24, 0.1, 0.02, materials.foodBag, { x: -0.08, y: -0.04, z: 0.03 }));
      holder.add(rbox(0.13, 0.18, 0.09, 0.02, materials.pouchOlive, { x: 0.1, y: -0.06, z: 0.03 }));
    } else if (p.contents === "tools") {
      holder.add(box(0.26, 0.05, 0.06, materials.metal, { y: 0.02, z: 0.04 }));
      holder.add(box(0.12, 0.08, 0.05, materials.orange, { x: -0.06, y: -0.06, z: 0.04 }));
      holder.add(cyl(0.02, 0.02, 0.2, 8, materials.darkMetal, { x: 0.08, y: -0.02, z: 0.05, rz: 0.4 }));
    } else {
      const cube = group(holder, { y: -0.04, z: 0.04, ry: 0.4, rx: 0.2 });
      const cols = [0xc4483c, 0xe0c04a, 0x4a8ac4, 0x4aa06a, 0xd8d2c0, 0xe08a3c];
      for (let i = 0; i < 6; i += 1) {
        const face = box(0.13, 0.13, 0.13, std(cols[i], { roughness: 0.7 }), {
          x: i === 0 ? 0.062 : i === 1 ? -0.062 : 0,
          y: i === 2 ? 0.062 : i === 3 ? -0.062 : 0,
          z: i === 4 ? 0.062 : i === 5 ? -0.062 : 0,
        });
        if (i < 2) face.scale.set(0.18, 1, 1);
        if (i === 2 || i === 3) face.scale.set(1, 0.18, 1);
        if (i >= 4) face.scale.set(1, 1, 0.18);
        cube.add(face);
      }
    }
  }

  // Fire extinguisher and first-aid box.
  const ext = group(g, { x: x - 1.55, y: 0.6, z: WALL_Z + 0.2 });
  ext.add(cyl(0.075, 0.075, 0.44, 16, materials.red, { y: 0.22 }));
  ext.add(sphere(0.075, 14, 8, materials.red, { y: 0.44 }));
  ext.add(cyl(0.02, 0.02, 0.1, 8, materials.darkMetal, { y: 0.52 }));
  ext.add(box(0.16, 0.03, 0.05, materials.darkMetal, { y: 0.58, z: 0.02 }));
  ext.add(box(0.14, 0.14, 0.01, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("EXT", { font: 44, bg: "#d8d4c6" }), roughness: 0.9 }), { y: 0.24, z: 0.077 }));
  ext.add(box(0.16, 0.03, 0.05, materials.metal, { y: 0.1, z: -0.06 }));
  // The first-aid box sits left of the window, clear of its opening.
  const firstAid = group(g, { x: 0.28, y: 0.78, z: WALL_Z + 0.08 });
  firstAid.add(rbox(0.42, 0.3, 0.13, 0.02, materials.porcelain, { y: 0 }));
  firstAid.add(plane(0.2, 0.2, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("+", { bg: "#e8e4d6", fg: "#b5382e", font: 110 }), roughness: 0.9, transparent: true }), { y: 0.0, z: 0.068 }));
  firstAid.add(box(0.05, 0.09, 0.02, materials.metal, { y: 0.16, z: 0.06 }));

  // Clothes tucked under the ceiling on velcro.
  const clothes = group(g, { x: x + 0.35, y: 2.26, z: -1.3 });
  for (const [dx, mat] of [
    [-0.16, materials.fabricBlue],
    [0.02, materials.fabricOlive],
    [0.18, materials.fabricBeige],
  ]) {
    const garment = rbox(0.2, 0.3, 0.07, 0.02, mat, { x: dx, y: 0 });
    garment.rotation.z = dx * 0.3;
    clothes.add(garment);
  }
  return { group: g };
}

export function createFurnishings(materials) {
  const root = group(null, { name: "furnishings" });
  const sleep = sleepZone(root, materials);
  const work = workZone(root, materials);
  const seat = viewSeat(root, materials);
  const plants = plantZone(root, materials);
  const bike = bikeZone(root, materials);
  const storage = storageZone(root, materials);
  return { root, sleep, work, seat, plants, bike, storage };
}

// Small objects that drift through the cabin forever.
export function createFloaters(materials) {
  const root = group(null, { name: "floaters" });
  const items = [];

  const pen = group(root, { name: "floating-pen" });
  pen.add(cyl(0.008, 0.008, 0.17, 8, materials.ceramicBlue, {}));
  pen.add(cyl(0.006, 0.001, 0.03, 8, materials.metal, { y: 0.1 }));
  pen.add(cyl(0.01, 0.01, 0.03, 8, materials.darkMetal, { y: -0.09 }));
  items.push({ object: pen, radius: 0.5, speed: 0.31, base: new THREE.Vector3(-0.6, 1.34, 0.15), phase: 0.4, spin: new THREE.Vector3(0.2, 0.5, 0.14) });

  const book = group(root, { name: "floating-book" });
  book.add(box(0.24, 0.03, 0.17, materials.paper, {}));
  book.add(box(0.25, 0.008, 0.18, materials.manual, { y: 0.019 }));
  book.add(box(0.25, 0.008, 0.18, materials.manual, { y: -0.019, rx: Math.PI }));
  items.push({ object: book, radius: 0.7, speed: 0.21, base: new THREE.Vector3(0.35, 1.5, 0.55), phase: 2.1, spin: new THREE.Vector3(0.1, 0.22, 0.08) });

  const buds = group(root, { name: "floating-earbuds" });
  for (const [dx, dz] of [
    [-0.05, 0],
    [0.06, 0.03],
  ]) {
    const bud = group(buds, { x: dx, y: 0, z: dz });
    bud.add(sphere(0.032, 12, 10, materials.porcelain, {}));
    bud.add(cyl(0.012, 0.012, 0.06, 8, materials.porcelain, { y: -0.04, rx: 0.4 }));
  }
  items.push({ object: buds, radius: 0.45, speed: 0.4, base: new THREE.Vector3(-1.2, 1.62, 0.75), phase: 4.4, spin: new THREE.Vector3(0.3, 0.4, 0.2) });

  const droplet = sphere(0.018, 10, 8, new THREE.MeshStandardMaterial({ color: 0xd6f2ff, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.85 }), {});
  const drop = group(root, { name: "floating-droplet" });
  drop.add(droplet);
  items.push({ object: drop, radius: 0.28, speed: 0.22, base: new THREE.Vector3(-1.95, 1.32, -0.9), phase: 5.6, spin: new THREE.Vector3(0, 0.2, 0) });

  const crumb = group(root, { name: "floating-crumb" });
  crumb.add(box(0.024, 0.014, 0.02, std(0xc79a5c, { roughness: 0.9 }), {}));
  crumb.add(box(0.012, 0.012, 0.012, std(0xb5864c, { roughness: 0.9 }), { x: 0.016, y: 0.006 }));
  items.push({ object: crumb, radius: 0.5, speed: 0.35, base: new THREE.Vector3(0.9, 1.2, 0.9), phase: 1.2, spin: new THREE.Vector3(0.6, 0.5, 0.3) });

  // Slip-on shoes on the floor, velcro pads.
  const shoes = group(root, { name: "slippers" });
  for (const [dx, ry] of [
    [-0.1, 0.2],
    [0.1, -0.15],
  ]) {
    const shoe = group(shoes, { x: dx, y: 0.035, z: 0, ry });
    shoe.add(rbox(0.11, 0.05, 0.24, 0.02, materials.fabricOlive, { y: 0.01 }));
    shoe.add(rbox(0.1, 0.02, 0.1, 0.01, materials.fabricBeige, { y: 0.04, z: 0.02 }));
  }
  shoes.position.set(-1.15, 0.01, 0.9);

  return {
    root,
    items,
    update(time, avoidance) {
      for (const item of items) {
        const t = time * item.speed + item.phase;
        const p = item.object.position;
        p.set(
          item.base.x + Math.sin(t * 0.7) * item.radius * 0.5,
          item.base.y + Math.sin(t * 0.53 + 1.3) * item.radius * 0.34,
          item.base.z + Math.cos(t * 0.61) * item.radius * 0.42,
        );
        item.object.rotation.x += item.spin.x * 0.004;
        item.object.rotation.y += item.spin.y * 0.004;
        item.object.rotation.z += item.spin.z * 0.004;
        if (item.object === avoidance.pen) {
          const d = avoidance.point.distanceTo(p);
          if (d < 0.32 && d > 0.0001) {
            const push = (0.32 - d) / 0.32;
            const dir = p.clone().sub(avoidance.point).normalize();
            p.addScaledVector(dir, push * 0.16);
            item.object.rotation.y += push * 0.05;
          }
          item.object.rotation.y += avoidance.spinBoost;
        }
      }
    },
  };
}
