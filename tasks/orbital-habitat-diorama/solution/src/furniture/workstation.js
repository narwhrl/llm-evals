import { paperTexture, drawingTexture } from '../textures/props.js';
import { canvasTexture, MONO } from '../textures/canvas.js';
import { createLaptopScreen } from './laptopScreen.js';

export function buildWorkstation(k, root) {
  const { THREE, materials: m, box, cyl, face, bar, group, mount } = k;
  // Keep the desktop and right support out of the full swept sun aperture.
  // At DX=-0.8 their offscreen shadows cut a rectangular notch into the floor ellipse.
  const DX = -1.1;
  const g = group(root, 'workstation'); g.position.x = DX;
  const desk = box(g, [1.00, .03, .55], [1.05, .785, -1.445], m.cream, true, 'desk');
  box(g, [.98, .032, .035], [1.05, .765, -1.72], m.dark);
  for (const x of [.74, 1.46]) { // left strut clears equipment panel A (x ≤ -0.10)
    bar(g, [x, .44, -1.91], [x, .76, -1.22], .016);
    cyl(g, .035, .028, [x, .77, -1.69], m.dark).rotation.z = Math.PI / 2;
  }
  const laptop = group(g, 'laptop'); laptop.position.set(1.12, .806, -1.445);
  box(laptop, [.45, .025, .31], [0, .012, 0], m.dark, true);
  const keyboard = canvasTexture(768, 512, (c, w, h) => {
    c.fillStyle = '#72827e'; c.fillRect(0, 0, w, h); c.font = `24px ${MONO}`;
    const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    for (let row = 0; row < 4; row++) for (let col = 0; col < 10; col++) {
      const x = 32 + col * 70, y = 30 + row * 68;
      c.fillStyle = '#273b3c'; c.fillRect(x, y, 55, 49);
      c.fillStyle = '#b7c6b9'; c.fillText(keys[(row * 10 + col) % keys.length], x + 18, y + 32);
    }
    c.strokeStyle = '#344c4c'; c.lineWidth = 4; c.strokeRect(245, 330, 270, 120);
    c.fillStyle = '#c5cbbc'; c.fillRect(290, 292, 185, 21);
  });
  const keys = face(laptop, .414, .281, [0, .0251, 0], keyboard); keys.rotation.x = -Math.PI / 2;
  const lid = group(laptop, 'screenLid'); lid.position.set(0, .028, -.144); lid.rotation.x = -.12;
  box(lid, [.45, .245, .018], [0, .122, 0], m.dark, true);
  const screen = createLaptopScreen();
  // Near-black lit colour: the emissive map carries the display, so daylight cannot wash out the text.
  const screenMaterial = k.mat(screen.texture, '#161a1c', { emissive: '#8bffff', emissiveMap: screen.texture, emissiveIntensity: .82, toneMapped: false });
  const display = k.mesh(lid, k.plane, screenMaterial, [.411, .214, 1], [0, .122, .010], 'laptopScreen');
  display.castShadow = false;
  k.ball(lid, [.004, .004, .002], [0, .239, .011], m.dark);
  const flaskMap = canvasTexture(256, 512, (c, w, h) => {
    c.fillStyle = '#758c86'; c.fillRect(0, 0, w, h);
    const grad = c.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, 'rgba(245,245,215,0)'); grad.addColorStop(.35, 'rgba(245,245,215,.5)'); grad.addColorStop(.49, 'rgba(245,245,215,0)');
    c.fillStyle = grad; c.fillRect(0, 0, w, h);
    c.fillStyle = '#d0d4b5'; c.font = `34px ${MONO}`; c.fillText('MEI', 85, 255);
    c.strokeStyle = '#526c63'; c.lineWidth = 2; c.strokeRect(6, 6, 244, 500);
  });
  cyl(g, .05, .19, [.67, .90, -1.35], k.mat(flaskMap), 'insulatedFlask');
  cyl(g, .052, .025, [.67, 1.007, -1.35], m.dark);
  box(g, [.125, .010, .13], [.67, .806, -1.35], m.webbing);
  box(g, [.011, .025, .115], [.67, .89, -1.294], m.webbing);
  const phones = group(g, 'hangingHeadphones'); phones.position.set(1.56, .663, -1.29);
  k.torus(phones, .077, .014, [0, .015, 0], m.dark, Math.PI).rotation.z = .02;
  for (const x of [-.071, .071]) {
    box(phones, [.045, .078, .055], [x, -.031, 0], m.dark, true);
    box(phones, [.013, .064, .058], [x * .78, -.031, .004], m.white, true);
  }
  bar(g, [1.53, .78, -1.37], [1.56, .74, -1.28], .01, m.cream);
  for (let i = 0; i < 3; i++) {
    const sheet = face(g, .17, .25, [0, 0, 0], drawingTexture(['DOCK / 04', 'EPS CHECK', 'ORBIT PLAN'][i],
      [['+Z ALIGN', 'SEAL 28V', 'LATCH A/B', 'REV 06'], ['BUS 28.1V', 'BATT 98%', 'LOAD 2.4A', 'PASS ✓'], ['ALT 408 km', 'INC 51.64', 'T + 92.8m', 'MEI / 183']][i], i));
    mount(sheet, .045 + i * .098 - DX, 1.22 + (i - 1) * .068, .024 + i * .003);
    sheet.rotation.z = (i - 1) * .05;
    box(g, [.045, .023, .016], [sheet.position.x, sheet.position.y + .131, sheet.position.z + .005], m.dark);
  }
  const sticky = face(g, .135, .13, [.78, .8008, -1.23], paperTexture('TODAY', ['Call Mei', 'at 19:00', 'Water basil'], { hand: true, color: '#e5c685' }));
  sticky.rotation.x = -Math.PI / 2; sticky.rotation.z = .05;
  sticky.userData.keepFocus = true;
  k.label(g, 'FLIGHT LOG', 'DAY 183 / MEI', .20, .028, [.83, .766, -1.167]);
  k.focus(g, 'workstation', [1.05 + DX, 1.0, -1.4], 2.6, { azimuth: .24, elevation: .40 });
  return { group: g, update: screen.update, laptopPosition: new THREE.Vector3(1.12 + DX, 1.0, -1.34) };
}
