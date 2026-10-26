import * as THREE from 'three';
import { canvasTexture, roundRect, rng } from '../core/textures.js';
import { toon, glow } from '../core/toon.js';
import { box, plane, group } from '../core/geometry.js';
import { STORE, WALK_Y } from './layout.js';

/**
 * The store interior.
 *
 * Everything here is placed relative to the store's inner floor so it reads
 * correctly through both glass faces. Furnishings are grouped by zone, roughly
 * following a real konbini layout: cooler wall at the back, gondola shelves in
 * the middle, checkout by the door, magazines and the oden counter along the
 * front glass, plus the back-room door and staff area.
 */

const FLOOR_Y = WALK_Y + 0.06;

/** Small text card used for price tags, shelf labels and posters. */
function labelTexture(text, { bg = '#ffffff', fg = '#2b3140', w = 256, h = 96, font = 0.5 } = {}) {
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fg;
    ctx.font = `700 ${Math.round(h * font)}px "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2);
  });
}

/** A backlit promotional lightbox with layered typography. */
function lightboxTexture(headline, sub, bg) {
  const w = 512;
  const h = 256;
  return canvasTexture(w, h, (ctx) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, bg[0]);
    grad.addColorStop(1, bg[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(h * 0.28)}px "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`;
    ctx.fillText(headline, w / 2, h * 0.4);

    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.font = `600 ${Math.round(h * 0.13)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
    ctx.fillText(sub, w / 2, h * 0.68);

    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, w - 20, h - 20);
  });
}

/** Floor guidance decal: an arrow pointing to the register. */
function floorArrowTexture() {
  const w = 256;
  const h = 256;
  return canvasTexture(w, h, (ctx) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(90,150,210,0.55)';
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.12);
    ctx.lineTo(w * 0.82, h * 0.5);
    ctx.lineTo(w * 0.62, h * 0.5);
    ctx.lineTo(w * 0.62, h * 0.88);
    ctx.lineTo(w * 0.38, h * 0.88);
    ctx.lineTo(w * 0.38, h * 0.5);
    ctx.lineTo(w * 0.18, h * 0.5);
    ctx.closePath();
    ctx.fill();
  });
}

/** Oden pot: a warm metal counter with compartments of simmering items. */
function odenTexture() {
  const w = 256;
  const h = 128;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#3a3d46';
    ctx.fillRect(0, 0, w, h);
    const items = ['#d8b878', '#c89858', '#e8d8a8', '#b87840', '#e0c890'];
    const cols = 5;
    const rows = 2;
    const cw = w / cols;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        ctx.fillStyle = '#5a4028';
        ctx.fillRect(c * cw + 3, r * rh + 3, cw - 6, rh - 6);
        ctx.fillStyle = items[(r * cols + c) % items.length];
        ctx.beginPath();
        ctx.ellipse(c * cw + cw / 2, r * rh + rh / 2, cw * 0.3, rh * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

export function buildInterior({ scene, materials, lighting }) {
  const root = new THREE.Group();
  root.name = 'interior';
  scene.add(root);

  const innerXMin = STORE.xMin + 0.2;
  const innerXMax = STORE.xMax - 0.2;
  const innerZMin = STORE.zMin + 0.24;
  const innerZMax = STORE.zMax - 0.16;
  const midX = (innerXMin + innerXMax) / 2;
  const wallTop = STORE.wallTop;

  const updateables = [];

  // ---------------------------------------------------------------------
  // Back wall: drinks cooler bank
  // ---------------------------------------------------------------------
  const coolerZ = innerZMin + 0.9;
  const coolerW = innerXMax - innerXMin - 0.3;
  const coolerGroup = group(root, [midX, FLOOR_Y, coolerZ]);

  // Cabinet body.
  box(coolerGroup, materials.plasticWhite, [coolerW, 2.05, 0.5], [0, 1.02, 0]);
  // Lit interior panels.
  const coolerFaceMat = glow('coolerFace', { color: 0xeaf6ff, transparent: false });
  const shelfCount = 5;
  const doorCount = 5;
  for (let d = 0; d < doorCount; d += 1) {
    const dx = -coolerW / 2 + (d + 0.5) * (coolerW / doorCount);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(coolerW / doorCount - 0.06, 1.86), materials.fridgeGlow);
    face.position.set(dx, 1.03, 0.255);
    coolerGroup.add(face);

    // Door frame.
    box(coolerGroup, materials.metal, [0.04, 1.9, 0.05], [dx - coolerW / doorCount / 2 + 0.03, 1.03, 0.28], { cast: false });
    box(coolerGroup, materials.metal, [0.04, 1.9, 0.05], [dx + coolerW / doorCount / 2 - 0.03, 1.03, 0.28], { cast: false });
    box(coolerGroup, materials.metal, [coolerW / doorCount - 0.02, 0.04, 0.05], [dx, 1.99, 0.28], { cast: false });
    box(coolerGroup, materials.metal, [coolerW / doorCount - 0.02, 0.04, 0.05], [dx, 0.07, 0.28], { cast: false });
    // Handle.
    box(coolerGroup, materials.steel, [0.03, 0.4, 0.03], [dx + coolerW / doorCount / 2 - 0.1, 1.1, 0.32], { cast: false });
  }
  // Shelf boards inside, seen through the doors.
  for (let s = 1; s < shelfCount; s += 1) {
    const y = 0.25 + (s / shelfCount) * 1.7;
    box(coolerGroup, materials.steel, [coolerW - 0.1, 0.02, 0.06], [0, y, 0.26], { cast: false });
  }
  // Top header band with a cool label.
  box(coolerGroup, materials.metalDark, [coolerW, 0.22, 0.54], [0, 2.16, 0]);

  // ---------------------------------------------------------------------
  // Back-room door and staff area
  // ---------------------------------------------------------------------
  const backDoorX = innerXMin + 0.62;
  const backDoor = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.95, 0.06), materials.metalDark);
  backDoor.position.set(backDoorX, FLOOR_Y + 0.98, innerZMin + 0.03);
  root.add(backDoor);
  box(root, materials.steel, [0.06, 0.06, 0.06], [backDoorX - 0.32, FLOOR_Y + 1.02, innerZMin + 0.09], { cast: false });
  // "STAFF ONLY" plate.
  const staffPlate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42, 0.13),
    glow('staffPlate', {
      color: 0xffffff,
      map: labelTexture('STAFF ONLY', { bg: '#f2ede0', fg: '#7a3a34', w: 256, h: 80, font: 0.46 }),
      transparent: false,
    }),
  );
  staffPlate.position.set(backDoorX, FLOOR_Y + 1.72, innerZMin + 0.065);
  root.add(staffPlate);

  // Storage crates beside the door.
  box(root, materials.blue, [0.36, 0.26, 0.32], [innerXMin + 0.24, FLOOR_Y + 0.13, innerZMin + 0.32]);
  box(root, materials.blue, [0.36, 0.26, 0.32], [innerXMin + 0.24, FLOOR_Y + 0.39, innerZMin + 0.32]);
  box(root, materials.orange, [0.3, 0.22, 0.28], [innerXMin + 0.6, FLOOR_Y + 0.11, innerZMin + 0.3]);

  // ---------------------------------------------------------------------
  // Gondola shelving rows in the centre. They sit close behind the glass so the
  // product artwork stays legible from the street instead of being lost to
  // distance and the glass tint.
  // ---------------------------------------------------------------------
  const gondolaRows = [
    { z: innerZMin + 1.5, w: innerXMax - innerXMin - 1.2, mat: materials.productStrip },
    { z: innerZMin + 2.3, w: innerXMax - innerXMin - 1.2, mat: materials.snackStrip },
  ];

  for (const row of gondolaRows) {
    const g = group(root, [midX - 0.25, FLOOR_Y, row.z]);
    // Base plinth.
    box(g, materials.plasticWhite, [row.w, 0.12, 0.62], [0, 0.06, 0]);
    // Back panel with the product artwork.
    const panelH = 1.28;
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(row.w, panelH), row.mat);
    panel.position.set(0, 0.12 + panelH / 2, -0.3);
    g.add(panel);
    const panelBack = panel.clone();
    panelBack.rotation.y = Math.PI;
    panelBack.position.z = 0.3;
    g.add(panelBack);

    // Shelf boards and price rails.
    for (let s = 0; s < 4; s += 1) {
      const y = 0.12 + (s / 4) * panelH;
      box(g, materials.steel, [row.w, 0.025, 0.66], [0, y + 0.01, 0], { cast: false });
      box(g, materials.plasticGrey, [row.w, 0.05, 0.04], [0, y + 0.05, 0.32], { cast: false });
    }
    // End caps.
    box(g, materials.plasticWhite, [0.05, 0.12 + panelH, 0.66], [-row.w / 2, 0.06 + panelH / 2, 0], { cast: false });
    box(g, materials.plasticWhite, [0.05, 0.12 + panelH, 0.66], [row.w / 2, 0.06 + panelH / 2, 0], { cast: false });
    // Top sign rail.
    box(g, materials.plasticGrey, [row.w, 0.06, 0.7], [0, 0.12 + panelH + 0.03, 0], { cast: false });
  }

  // ---------------------------------------------------------------------
  // Open chiller with bento and prepared food, against the east wall
  // ---------------------------------------------------------------------
  const chiller = group(root, [innerXMax - 0.42, FLOOR_Y, innerZMin + 1.9]);
  box(chiller, materials.plasticWhite, [0.72, 1.5, 2.0], [0, 0.75, 0]);
  const bentoFace = new THREE.Mesh(new THREE.PlaneGeometry(1.92, 1.3), materials.bentoStrip);
  bentoFace.rotation.y = -Math.PI / 2;
  bentoFace.position.set(-0.37, 0.8, 0);
  chiller.add(bentoFace);
  box(chiller, materials.metal, [0.04, 1.34, 1.96], [-0.38, 0.8, 0], { cast: false });
  // Warm strip light over the chiller mouth.
  const chillerLight = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 0.08),
    glow('chillerLight', { color: 0xffe8c0 }),
  );
  chillerLight.rotation.y = -Math.PI / 2;
  chillerLight.rotation.x = Math.PI / 2;
  chillerLight.position.set(-0.4, 1.44, 0);
  chiller.add(chillerLight);

  // ---------------------------------------------------------------------
  // Oden counter and hot snack warmer near the front glass
  // ---------------------------------------------------------------------
  const oden = group(root, [innerXMin + 1.05, FLOOR_Y, innerZMax - 0.72]);
  box(oden, materials.steel, [1.3, 0.78, 0.62], [0, 0.39, 0]);
  const odenTop = new THREE.Mesh(new THREE.PlaneGeometry(1.22, 0.54), toon('odenTop', { color: 0xffffff, map: odenTexture() }));
  odenTop.rotation.x = -Math.PI / 2;
  odenTop.position.set(0, 0.79, 0);
  oden.add(odenTop);
  // Glass sneeze guard.
  box(oden, materials.metal, [1.26, 0.02, 0.6], [0, 1.12, 0], { cast: false });
  box(oden, materials.metal, [0.02, 0.34, 0.02], [-0.6, 0.95, -0.28], { cast: false });
  box(oden, materials.metal, [0.02, 0.34, 0.02], [0.6, 0.95, -0.28], { cast: false });
  box(oden, materials.metal, [0.02, 0.34, 0.02], [-0.6, 0.95, 0.28], { cast: false });
  box(oden, materials.metal, [0.02, 0.34, 0.02], [0.6, 0.95, 0.28], { cast: false });
  // Steam wisps rise from the pot.
  const steam = new THREE.Group();
  steam.position.set(0, 0.82, 0);
  oden.add(steam);
  const steamMat = glow('steam', { color: 0xfff0d8, transparent: true, opacity: 0.16, depthWrite: false });
  const steamSprites = [];
  for (let i = 0; i < 5; i += 1) {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.34), steamMat);
    s.position.set(-0.4 + i * 0.2, 0.18, (i % 2) * 0.1 - 0.05);
    s.userData.phase = i * 1.7;
    steam.add(s);
    steamSprites.push(s);
  }
  updateables.push((dt, t) => {
    for (const s of steamSprites) {
      const phase = (t * 0.42 + s.userData.phase) % 1;
      s.position.y = 0.08 + phase * 0.5;
      s.material.opacity = 0.2 * (1 - phase);
      s.scale.setScalar(0.7 + phase * 0.7);
    }
  });

  // Hot snack warmer next to the oden pot.
  const warmer = group(root, [innerXMin + 2.25, FLOOR_Y, innerZMax - 0.72]);
  box(warmer, materials.metalDark, [0.86, 0.62, 0.6], [0, 0.31, 0]);
  const warmerGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.78, 0.44),
    glow('warmerGlow', { color: 0xffc98a, transparent: false }),
  );
  warmerGlow.position.set(0, 0.4, 0.31);
  warmer.add(warmerGlow);
  for (let i = 0; i < 4; i += 1) {
    box(warmer, materials.orange, [0.16, 0.1, 0.12], [-0.28 + i * 0.18, 0.4, 0.3], { cast: false });
  }

  // ---------------------------------------------------------------------
  // Checkout counter by the door
  // ---------------------------------------------------------------------
  const register = group(root, [innerXMin + 2.4, FLOOR_Y, innerZMax - 1.9]);
  box(register, materials.plasticWhite, [1.5, 0.94, 0.66], [0, 0.47, 0]);
  box(register, materials.trim, [1.54, 0.06, 0.7], [0, 0.97, 0]);
  // Register terminal.
  box(register, materials.metalDark, [0.3, 0.2, 0.24], [0.35, 1.1, 0], { cast: false });
  const posScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.15), glow('posScreen', { color: 0x9fe0ff }));
  posScreen.position.set(0.35, 1.16, 0.13);
  register.add(posScreen);
  const posScreenBack = posScreen.clone();
  posScreenBack.rotation.y = Math.PI;
  posScreenBack.position.z = -0.13;
  register.add(posScreenBack);
  // Card reader and small display facing the customer.
  box(register, materials.plasticGrey, [0.16, 0.1, 0.14], [-0.2, 1.05, 0.24], { cast: false });
  const custDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.12), glow('custDisplay', { color: 0xa8f0c8 }));
  custDisplay.position.set(-0.2, 1.14, 0.24);
  register.add(custDisplay);

  // Counter goods: a small tower of cups and a card rack.
  for (let i = 0; i < 3; i += 1) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.038, 0.12, 10), materials.plasticWhite);
    cup.position.set(-0.5, 1.06 + i * 0.12, -0.1);
    register.add(cup);
  }

  // Staff stool and a low cabinet behind.
  box(register, materials.metalDark, [0.34, 0.44, 0.34], [0.9, 0.22, -0.5]);
  box(register, materials.plasticWhite, [0.9, 0.7, 0.4], [-0.6, 0.35, -0.72]);

  // ---------------------------------------------------------------------
  // Coffee machine station
  // ---------------------------------------------------------------------
  const coffee = group(root, [innerXMin + 3.7, FLOOR_Y, innerZMax - 1.9]);
  box(coffee, materials.plasticWhite, [0.7, 0.9, 0.5], [0, 0.45, 0]);
  box(coffee, materials.metalDark, [0.58, 0.62, 0.42], [0, 1.2, 0], { cast: false });
  const coffeeScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.22), glow('coffeeScreen', { color: 0xffd8a0 }));
  coffeeScreen.position.set(0, 1.32, 0.22);
  coffee.add(coffeeScreen);
  box(coffee, materials.metal, [0.2, 0.14, 0.16], [0, 1.0, 0.24], { cast: false });
  // Cup stack on the side.
  for (let i = 0; i < 4; i += 1) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.042, 0.13, 10), materials.plasticWhite);
    cup.position.set(-0.24, 0.96 + i * 0.13, 0.14);
    coffee.add(cup);
  }

  // ---------------------------------------------------------------------
  // Magazine rack along the front glass
  // ---------------------------------------------------------------------
  const magRack = group(root, [innerXMax - 1.15, FLOOR_Y, innerZMax - 0.42]);
  box(magRack, materials.plasticWhite, [1.5, 0.62, 0.34], [0, 0.31, 0]);
  for (let s = 0; s < 3; s += 1) {
    const y = 0.16 + s * 0.2;
    const row = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.18), materials.magazineStack);
    row.position.set(0, y, 0.18);
    row.rotation.x = -0.34;
    magRack.add(row);
  }
  box(magRack, materials.plasticGrey, [1.5, 0.05, 0.36], [0, 0.66, 0], { cast: false });

  // ---------------------------------------------------------------------
  // Promotional lightbox and hanging posters
  // ---------------------------------------------------------------------
  const lightboxMat = glow('interiorLightbox', {
    color: 0xffffff,
    map: lightboxTexture('新商品', 'NEW ITEM FAIR', ['#d8484a', '#8a2438']),
    transparent: false,
  });
  const lightbox = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.58), lightboxMat);
  lightbox.position.set(midX + 0.4, 2.36, innerZMin + 0.62);
  root.add(lightbox);

  const lightbox2Mat = glow('interiorLightbox2', {
    color: 0xffffff,
    map: lightboxTexture('ホット', 'HOT DRINKS', ['#e8862f', '#b8541c']),
    transparent: false,
  });
  const lightbox2 = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.5), lightbox2Mat);
  lightbox2.rotation.y = -Math.PI / 2;
  lightbox2.position.set(innerXMax - 0.24, 2.3, innerZMin + 1.3);
  root.add(lightbox2);

  // Hanging price banners over the gondolas.
  for (let i = 0; i < 3; i += 1) {
    const bannerMat = glow(`banner${i}`, {
      color: 0xffffff,
      map: labelTexture(['おにぎり', 'パン', 'お菓子'][i], {
        bg: ['#3f76b8', '#e8b83c', '#4f8f5c'][i],
        fg: '#ffffff',
        w: 256,
        h: 72,
        font: 0.52,
      }),
      transparent: false,
    });
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.26), bannerMat);
    banner.position.set(midX - 1.1 + i * 1.0, 2.28, innerZMin + 1.9);
    root.add(banner);
  }

  // ---------------------------------------------------------------------
  // Floor guidance decal and the entrance light strip
  // ---------------------------------------------------------------------
  const arrowMat = new THREE.MeshBasicMaterial({
    map: floorArrowTexture(),
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const arrow = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), arrowMat);
  arrow.rotation.x = -Math.PI / 2;
  arrow.position.set(STORE.doorCenterX, FLOOR_Y + 0.005, innerZMax - 0.7);
  root.add(arrow);

  // Yellow tactile paving strip just inside the door.
  const tactileTex = canvasTexture(128, 64, (ctx, w, h) => {
    ctx.fillStyle = '#d8b445';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(180,140,40,0.7)';
    for (let x = 8; x < w; x += 16) {
      for (let y = 8; y < h; y += 16) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
  const tactile = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 0.32),
    toon('tactile', { color: 0xffffff, map: tactileTex }),
  );
  tactile.rotation.x = -Math.PI / 2;
  tactile.position.set(STORE.doorCenterX, FLOOR_Y + 0.006, innerZMax - 0.12);
  root.add(tactile);

  // ---------------------------------------------------------------------
  // Back-room glimpse: shelves and boxes visible through the doorway
  // ---------------------------------------------------------------------
  box(root, materials.wood, [0.5, 1.1, 0.36], [backDoorX + 0.4, FLOOR_Y + 0.55, innerZMin - 0.24]);
  box(root, materials.orange, [0.3, 0.22, 0.26], [backDoorX + 0.4, FLOOR_Y + 1.24, innerZMin - 0.24]);

  // ---------------------------------------------------------------------
  // Shelf-edge lighting: emissive strips that make the interior read warm
  // ---------------------------------------------------------------------
  const stripMat = glow('shelfStrip', { color: 0xfff0d0, transparent: false });
  for (const row of gondolaRows) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(innerXMax - innerXMin - 1.6, 0.035), stripMat);
    strip.rotation.x = -Math.PI / 2;
    strip.position.set(midX - 0.25, FLOOR_Y + 1.44, row.z);
    root.add(strip);
  }

  // ---------------------------------------------------------------------
  // Interior fill light so the room glows through the glass at night. Kept
  // modest and positioned high, so it lights the ceiling and upper shelving
  // instead of blowing out the counter directly beneath it.
  const interiorLight = new THREE.PointLight(0xffe4bc, 3.4, 7.2, 2);
  interiorLight.position.set(midX, wallTop - 0.35, (innerZMin + innerZMax) / 2);
  scene.add(interiorLight);

  const doorLight = new THREE.PointLight(0xfff0d4, 1.5, 3.2, 2);
  doorLight.position.set(STORE.doorCenterX, 1.9, innerZMax - 0.3);
  scene.add(doorLight);

  return {
    root,
    update(dt, elapsed) {
      for (const fn of updateables) fn(dt, elapsed);
      // Gentle breathing of the interior fill keeps the room feeling alive.
      interiorLight.intensity = 3.4 + Math.sin(elapsed * 0.9) * 0.14;
    },
  };
}
