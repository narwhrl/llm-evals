import { addLight } from '../fx/lights.js';
import { dripLine } from '../fx/registry.js';
import { decal } from './basic.js';
import { ladder } from './structures.js';

function wheel(k, x, z, r = 0.45, w = 0.32, flat = 0) {
  k.cyl('tire', [x, r - flat, z], r, w, { rot: [Math.PI / 2, 0, 0], seg: 14 });
  k.cyl('darkMetal', [x, r - flat, z + Math.sign(z) * 0.01], r * 0.5, w + 0.02, { rot: [Math.PI / 2, 0, 0], seg: 10, tint: 0x8a8e94 });
}

// Beat-up box truck; cab at local +x. Box roof and cab sides serve as cover.
export function boxTruck(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  k.box('darkMetal', [0, 0.45, 0], [7.2, 0.3, 1.9]);
  // cargo box
  k.box('corrugated', [-1.05, 0.75, 0], [5.0, 2.55, 2.35], { tint: 0xc9c2b0 });
  k.box('darkMetal', [-3.56, 0.75, 0], [0.04, 2.55, 2.3], { tint: 0x5a5a58 });
  decal(k, 'freightSign', [-1.2, 2.0, 1.19], 2.2, 1.6, '+z');
  decal(k, 'bullets', [0.4, 1.3, 1.19], 1.2, 1.2, '+z');
  decal(k, 'tagGG', [-2.6, 1.2, 1.19], 1.3, 1.3, '+z');
  decal(k, 'freightSign', [-1.0, 2.0, -1.19], 2.2, 1.6, '-z');
  // cab
  k.box('paint', [2.35, 0.75, 0], [1.9, 1.55, 2.2], { tint: 0x9a3a2a });
  k.box('paint', [2.25, 2.3, 0], [1.55, 0.7, 2.14], { tint: 0x8a3226 });
  k.box('glass', [3.02, 2.3, 0], [0.04, 0.58, 1.9], { rot: [0, 0, 0.18] });
  for (const s of [-1, 1]) k.box('glass', [2.2, 2.33, s * 1.075], [1.1, 0.52, 0.02]);
  k.box('darkMetal', [3.32, 0.62, 0], [0.12, 0.3, 2.3]);
  k.box('darkMetal', [3.31, 1.05, 0], [0.04, 0.5, 1.5], { tint: 0x2a2a2a });
  for (const s of [-0.8, 0.8]) k.box('plain', [3.31, 1.2, s], [0.05, 0.16, 0.28], { tint: 0x707060 });
  k.box('darkMetal', [-3.62, 0.42, 0], [0.12, 0.18, 2.1]);
  wheel(k, 2.4, 1.0);
  wheel(k, 2.4, -1.0, 0.45, 0.32, 0.12);
  for (const wx of [-2.1, -2.8]) for (const s of [-1, 1]) wheel(k, wx, s * 1.0);
  dripLine(k.world(-3.5, 3.32, 1.18), k.world(1.4, 3.32, 1.18), 6);
  ladder(k, -1.6, 0, 1.75, 0, 3.2, 'wood', -0.2);
  k.pop();
}

// Police van with a roof bar of red / blue beacons; nose at local +x.
export function policeVan(k, x, y, z, rot) {
  k.push([x, y, z], rot);
  k.box('paint', [0, 0.35, 0], [5.2, 1.85, 2.05], { tint: 0xe6e8ea });
  k.box('paint', [2.3, 0.35, 0], [0.62, 1.05, 2.02], { tint: 0xdfe1e3 });
  k.box('paint', [0, 0.95, 0], [5.22, 0.34, 2.07], { tint: 0x1f3f8a });
  k.box('glass', [2.25, 1.42, 0], [0.04, 0.72, 1.86], { rot: [0, 0, 0.3] });
  for (const s of [-1, 1]) k.box('glass', [1.3, 1.45, s * 1.035], [1.4, 0.62, 0.02]);
  k.box('darkMetal', [2.62, 0.45, 0], [0.1, 0.28, 2.1]);
  for (const s of [-0.7, 0.7]) k.box('lampCool', [2.62, 0.95, s], [0.04, 0.14, 0.32]);
  for (const wx of [1.7, -1.7]) for (const s of [-1, 1]) wheel(k, wx, s * 0.92, 0.38, 0.26);
  decal(k, 'policeLine', [-0.6, 1.02, 1.04], 2.4, 1.1, '+z');
  decal(k, 'ctEmblem', [0.5, 1.5, 1.04], 0.7, 0.7, '+z');
  decal(k, 'policeLine', [-0.6, 1.02, -1.04], 2.4, 1.1, '-z');
  k.box('darkMetal', [0.3, 2.2, 0], [1.5, 0.1, 0.4]);
  k.box('lampRed', [-0.05, 2.3, 0], [0.62, 0.16, 0.34]);
  k.box('lampBlue', [0.65, 2.3, 0], [0.62, 0.16, 0.34]);
  const red = k.world(-0.05, 2.5, 0);
  const blue = k.world(0.65, 2.5, 0);
  dripLine(k.world(-2.6, 2.2, 1.03), k.world(2.0, 2.2, 1.03), 5);
  k.pop();
  addLight({ pos: red, color: 0xff2a1a, intensity: 9, distance: 13, glow: 2.6, lamp: 'lampRed', mode: 'police', phase: 0 });
  addLight({ pos: blue, color: 0x3a64ff, intensity: 9, distance: 13, glow: 2.6, lamp: 'lampBlue', mode: 'police', phase: Math.PI });
}
