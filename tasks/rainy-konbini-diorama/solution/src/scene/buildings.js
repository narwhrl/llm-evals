import * as THREE from 'three';
import { toon, toonMap, glow, glowMap } from '../core/materials.js';
import { N1, N2 } from './layout.js';
import { windowTexture, shutterTexture, shopSignTexture, neonTexture, nameplateTexture } from './propTextures.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

function plane(ctx, mat, w, h, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  ctx.root.add(m);
  return m;
}

function windowPane(ctx, kind, seed, w, h, x, y, z, ry) {
  const tex = windowTexture(kind, seed);
  const mat = kind === 'dark' ? toonMap(tex) : glowMap(tex, kind === 'tv' ? 1.3 : 1.25);
  plane(ctx, mat, w, h, x, y, z, ry);
  return mat;
}

/** Liquor shop with a snack bar upstairs, fronting the side street. */
function liquorShop(ctx) {
  const { b } = ctx;
  const { x0, x1, z0, z1, h } = N1;
  const wall = toon(0xc9b89c);
  b.span(wall, x0, 0, z0, x1, h, z1);
  b.span(toon(0x8c7c66), x0 - 0.05, 3.0, z0, x1 + 0.05, 3.12, z1 + 0.05);
  b.span(toon(0xb1a186), x0 - 0.05, h, z0, x1 + 0.05, h + 0.35, z1 + 0.05);
  // East face: shutter, shop sign, canopy, upstairs window.
  plane(ctx, toonMap(shutterTexture()), 2.2, 2.3, x1 + 0.01, 1.15, (z0 + z1) / 2 + 0.3, Math.PI / 2);
  b.span(toon(0x5c6472), x1, 2.3, z0 + 0.4, x1 + 0.2, 2.45, z1 - 0.2);
  plane(ctx, toonMap(shopSignTexture()), 2.2, 0.55, x1 + 0.015, 2.7, (z0 + z1) / 2 + 0.3, Math.PI / 2);
  const tilt = 0.28;
  b.box(toon(0x3f6f5a), x1 + 0.4, 3.35, (z0 + z1) / 2 + 0.3, 0.8, 0.05, 2.7, 0, 0, -tilt);
  ctx.blockers.push([x1, z0 + 0.3, x1 + 0.8, z1, 3.25]);
  ctx.drips.push({ from: [x1 + 0.78, 3.2, z0 + 1.0], to: [x1 + 0.78, 3.2, z1 - 0.1], count: 8, floor: 0.14 });
  windowPane(ctx, 'lit', 3, 1.3, 1.0, x1 + 0.01, 4.5, -7.8, Math.PI / 2);
  windowPane(ctx, 'tv', 4, 1.0, 0.9, x1 + 0.01, 4.5, -6.3, Math.PI / 2);
  for (const z of [-7.8, -6.3]) b.span(toon(0x8c7c66), x1, 3.92, z - 0.72, x1 + 0.12, 3.98, z + 0.72);

  // Blade neon sign projecting from the corner.
  b.rod(toon(0x555b66), V(x1, 5.4, z1 - 0.3), V(x1 + 0.45, 5.4, z1 - 0.3), 0.025);
  b.rod(toon(0x555b66), V(x1, 3.9, z1 - 0.3), V(x1 + 0.45, 3.9, z1 - 0.3), 0.025);
  b.box(toon(0x2a0f2a), x1 + 0.5, 4.65, z1 - 0.3, 0.42, 1.7, 0.1);
  const neonA = glowMap(neonTexture(), 2.2);
  const neonB = glowMap(neonTexture(), 2.2);
  plane(ctx, neonA, 0.4, 1.65, x1 + 0.5, 4.65, z1 - 0.245);
  plane(ctx, neonB, 0.4, 1.65, x1 + 0.5, 4.65, z1 - 0.355, Math.PI);
  const pink = new THREE.PointLight(0xff5fc8, 2.5, 4, 2);
  pink.position.set(x1 + 0.9, 4.6, z1 + 0.2);
  ctx.root.add(pink);
  ctx.neon = { mats: [neonA, neonB], light: pink, base: 2.2 };
  ctx.rainLights.push([x1 + 0.5, 4.65, z1 - 0.3, 0.7]);

  // South face on the alley: back door, lamp, AC unit, meter, upstairs window.
  b.span(toon(0x6d5a4a), 0.9, 0, z1 - 0.02, 1.7, 2.0, z1 + 0.03);
  b.span(toon(0x5c6472), 0.75, 2.1, z1, 1.85, 2.16, z1 + 0.5);
  ctx.blockers.push([0.75, z1, 1.85, z1 + 0.5, 2.16]);
  b.box(glow(0xffcf8a, 3.2), 1.3, 2.3, z1 + 0.08, 0.18, 0.14, 0.12);
  const lamp = new THREE.PointLight(0xffc27a, 2.4, 3.5, 2);
  lamp.position.set(1.3, 2.2, z1 + 0.5);
  ctx.root.add(lamp);
  ctx.rainLights.push([1.3, 2.3, z1 + 0.2, 0.45]);
  b.box(toon(0xdfe1e4), -0.2, 0.35, z1 + 0.18, 0.8, 0.6, 0.3);
  b.rod(toon(0x3b414d), V(-0.3, 0.35, z1 + 0.33), V(-0.3, 0.35, z1 + 0.34), 0.2, 16);
  b.span(toon(0xe8e2c8), 0.1, 0.5, z1, 0.17, 4.2, z1 + 0.07);
  b.box(toon(0xaab1bc), 2.4, 1.4, z1 + 0.06, 0.3, 0.4, 0.12);
  windowPane(ctx, 'dark', 5, 1.2, 0.9, 1.9, 4.5, z1 + 0.01, 0);
  windowPane(ctx, 'lit', 6, 1.0, 0.9, -0.2, 4.5, z1 + 0.01, 0);
  // Rooftop water tank.
  for (const [x, z] of [
    [1.4, -7.8],
    [2.2, -7.8],
    [1.4, -7.0],
    [2.2, -7.0],
  ])
    b.span(toon(0x6c727d), x - 0.05, h, z - 0.05, x + 0.05, h + 0.8, z + 0.05);
  b.cyl(toon(0x7fb0c9), 1.8, h + 0.8, -7.4, 0.55, 0.8, 16);
  b.rod(toon(0x9aa2ad), V(-0.5, h, -8.2), V(-0.5, h + 1.4, -8.2), 0.02);
  b.rod(toon(0x9aa2ad), V(-0.9, h + 1.2, -8.2), V(-0.1, h + 1.2, -8.2), 0.015);
  ctx.blockers.push([x0 - 0.05, z0, x1 + 0.05, z1 + 0.05, h + 0.35]);
}

/** Two-storey apartment block facing the back yard. */
function apartment(ctx) {
  const { b } = ctx;
  const { x0, x1, z0, z1, h } = N2;
  b.span(toon(0xd9cfc0), x0, 0, z0, x1, h, z1);
  b.span(toon(0xa89c8a), x0 - 0.05, 2.75, z0, x1 + 0.05, 2.85, z1 + 0.05);
  b.span(toon(0x8f8575), x0 - 0.05, h, z0, x1 + 0.05, h + 0.3, z1 + 0.05);
  const kinds = [
    ['lit', 'dark', 'tv'],
    ['dark', 'lit', 'lit'],
  ];
  kinds.forEach((row, fl) => {
    row.forEach((kind, i) => {
      const x = -6.2 + i * 1.9;
      const y = 1.45 + fl * 2.75;
      windowPane(ctx, kind, 10 + fl * 3 + i, 1.2, 1.1, x, y, z1 + 0.01, 0);
      b.span(toon(0x6e6a64), x - 0.7, y + 0.6, z1, x + 0.7, y + 0.66, z1 + 0.12);
      b.box(toon(0xdfe1e4), x + 0.72, y - 0.35, z1 + 0.62, 0.55, 0.42, 0.22);
    });
  });
  // Upper balcony with railing and a drip line along its edge.
  b.span(toon(0xb8ae9f), -7.4, 2.85, z1, -1.6, 2.97, z1 + 0.95);
  const rail = toon(0x7a8190);
  b.rod(rail, V(-7.4, 3.9, z1 + 0.95), V(-1.6, 3.9, z1 + 0.95), 0.025);
  for (let x = -7.4; x <= -1.6; x += 0.29) b.rod(rail, V(x, 2.97, z1 + 0.95), V(x, 3.9, z1 + 0.95), 0.01);
  ctx.blockers.push([-7.4, z1, -1.6, z1 + 0.95, 2.97]);
  ctx.drips.push({ from: [-7.3, 2.84, z1 + 0.95], to: [-1.7, 2.84, z1 + 0.95], count: 10, floor: 0 });
  // Laundry forgotten on the rail.
  for (const [x, c] of [
    [-5.4, 0xf2f2ee],
    [-5.1, 0x8fb8e8],
  ])
    b.box(toon(c), x, 3.6, z1 + 0.97, 0.26, 0.4, 0.02);
  // External steel stair at the west end.
  const steel = toon(0x5b6474);
  const zb = z1 + 1.55;
  for (let i = 0; i < 11; i++) b.box(steel, -8.25, 0.25 + i * 0.24, zb - i * 0.1, 0.8, 0.04, 0.2);
  for (const x of [-8.65, -7.85]) {
    b.rod(steel, V(x, 0, zb + 0.1), V(x, 2.85, z1 + 0.7), 0.03);
    b.rod(steel, V(x, 0.9, zb + 0.1), V(x, 3.75, z1 + 0.7), 0.015);
  }
  b.span(steel, -8.7, 2.85, z1, -7.4, 2.9, z1 + 0.7);
  plane(ctx, toonMap(nameplateTexture()), 0.6, 0.22, -2.1, 2.3, z1 + 0.012);
  ctx.blockers.push([x0 - 0.05, z0, x1 + 0.05, z1 + 0.05, h + 0.3]);
}

export function buildBuildings(ctx) {
  liquorShop(ctx);
  apartment(ctx);
}
