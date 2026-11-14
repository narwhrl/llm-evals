import * as THREE from 'three';
import type { SharedMats } from './materials';

/**
 * 中央圣殿： stacked octagonal tiers, arcade insets, gold trim,
 * needle pinnacle, and the interlocking gold armillary on top.
 * Returns { group, armillary } — armillary spins in the main loop.
 */
export function buildSanctum(mats: SharedMats): { group: THREE.Group; armillary: THREE.Group } {
  const g = new THREE.Group();

  // stepped stylobate
  const steps = [120, 104, 90];
  steps.forEach((r, i) => {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 6, 9, 8), mats.ivoryFlat);
    s.position.y = 4.5 + i * 9;
    s.rotation.y = Math.PI / 8;
    g.add(s);
  });
  let y = 9 * steps.length;

  // stacked tiers: drum + arcade band + balcony, shrinking upward
  const tiers = [
    { r: 62, h: 52 }, { r: 50, h: 46 }, { r: 40, h: 42 },
    { r: 31, h: 38 }, { r: 23, h: 34 }, { r: 16, h: 30 },
  ];
  for (const [ti, t] of tiers.entries()) {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(t.r, t.r * 1.12, t.h, 8), mats.ivory);
    drum.position.y = y + t.h / 2;
    drum.rotation.y = Math.PI / 8;
    g.add(drum);

    // arcade shadow band: dark insets ringed around the drum
    const arches = 8;
    for (let i = 0; i < arches; i++) {
      const a = (i / arches) * Math.PI * 2 + Math.PI / 8;
      const inset = new THREE.Mesh(
        new THREE.PlaneGeometry(t.r * 0.42, t.h * 0.52), mats.dark,
      );
      const rr = t.r * 1.02;
      inset.position.set(Math.cos(a) * rr, y + t.h * 0.46, Math.sin(a) * rr);
      inset.rotation.y = -a + Math.PI / 2;
      g.add(inset);
      // slender colonnette between arches
      const col = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, t.h * 0.72, 8), mats.ivoryFlat);
      const ca = a + Math.PI / arches;
      col.position.set(Math.cos(ca) * (rr + 0.6), y + t.h * 0.44, Math.sin(ca) * (rr + 0.6));
      g.add(col);
    }

    // lancet glow windows on alternating faces
    for (let i = 0; i < 4; i++) {
      const a = ((i * 2 + (ti % 2)) / 8) * Math.PI * 2 + Math.PI / 8;
      const win = new THREE.Mesh(new THREE.PlaneGeometry(t.r * 0.16, t.h * 0.34), mats.glowWindow);
      const rr = t.r * 1.06 + 0.4;
      win.position.set(Math.cos(a) * rr, y + t.h * 0.5, Math.sin(a) * rr);
      win.rotation.y = -a + Math.PI / 2;
      g.add(win);
    }

    // balcony lip + gold trim ring
    const lip = new THREE.Mesh(new THREE.CylinderGeometry(t.r * 1.22, t.r * 1.22, 4, 8), mats.ivoryFlat);
    lip.position.y = y + t.h + 2;
    lip.rotation.y = Math.PI / 8;
    g.add(lip);
    const trim = new THREE.Mesh(new THREE.TorusGeometry(t.r * 1.22, 1.1, 8, 8 * 6), mats.gold);
    trim.position.y = y + t.h + 4;
    trim.rotation.x = Math.PI / 2;
    // octagonal feel: low segment torus reads as ring from distance
    g.add(trim);

    // corner pinnacles on the lower three tiers
    if (ti < 3) {
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const px = Math.cos(a) * t.r * 1.18;
        const pz = Math.sin(a) * t.r * 1.18;
        const pin = new THREE.Mesh(new THREE.ConeGeometry(3.4, 20 + (2 - ti) * 6, 6), mats.ivoryFlat);
        pin.position.set(px, y + t.h + 12, pz);
        g.add(pin);
        const orb = new THREE.Mesh(new THREE.OctahedronGeometry(1.8), mats.gold);
        orb.position.set(px, y + t.h + 24 + (2 - ti) * 6, pz);
        g.add(orb);
      }
    }
    y += t.h + 4;
  }

  // needle pinnacle
  const needleBase = y;
  const needle = new THREE.Mesh(new THREE.CylinderGeometry(4, 10, 60, 8), mats.ivory);
  needle.position.y = needleBase + 30;
  g.add(needle);
  const needleTip = new THREE.Mesh(new THREE.ConeGeometry(4, 46, 8), mats.ivoryFlat);
  needleTip.position.y = needleBase + 60 + 23;
  g.add(needleTip);
  const tipOrb = new THREE.Mesh(new THREE.OctahedronGeometry(4), mats.gold);
  tipOrb.position.y = needleBase + 60 + 50;
  g.add(tipOrb);

  // --- 天体仪式装置： interlocking gold rings around a radiant core ---
  const armillary = new THREE.Group();
  const coreY = needleBase + 60 + 52;
  const core = new THREE.Mesh(new THREE.SphereGeometry(9, 20, 14), mats.glowGold);
  armillary.add(core);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite(), color: 0xffe6a0, transparent: true, opacity: 0.85, depthWrite: false,
  }));
  halo.scale.setScalar(90);
  armillary.add(halo);

  const ringSpecs = [
    { r: 26, tube: 2.2, tilt: [0.4, 0, 0.2], speed: 0.10 },
    { r: 36, tube: 2.6, tilt: [0, 0.5, 1.1], speed: -0.07 },
    { r: 47, tube: 3.0, tilt: [1.1, 0, 0.5], speed: 0.05 },
    { r: 58, tube: 2.4, tilt: [0.2, 1.2, 0], speed: -0.04 },
  ];
  const spinners: THREE.Group[] = [];
  for (const s of ringSpecs) {
    const pivot = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(s.r, s.tube, 10, 72), mats.gold);
    pivot.add(ring);
    // tick marks: small gold studs around the ring
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const stud = new THREE.Mesh(new THREE.OctahedronGeometry(s.tube * 1.7), mats.gold);
      stud.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, 0);
      pivot.add(stud);
    }
    pivot.rotation.set(s.tilt[0], s.tilt[1], s.tilt[2]);
    pivot.userData.speed = s.speed;
    armillary.add(pivot);
    spinners.push(pivot);
  }
  armillary.userData.spinners = spinners;
  armillary.position.y = coreY;
  g.add(armillary);

  // slender mast linking needle to the armillary core
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 56, 8), mats.gold);
  mast.position.y = coreY - 30;
  g.add(mast);

  return { group: g, armillary };
}

let _glow: THREE.Texture | null = null;
function glowSprite(): THREE.Texture {
  if (_glow) return _glow;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const gr = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.35, 'rgba(255,240,200,0.7)');
  gr.addColorStop(1, 'rgba(255,240,200,0)');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, 128, 128);
  _glow = new THREE.CanvasTexture(c);
  _glow.colorSpace = THREE.SRGBColorSpace;
  return _glow;
}
