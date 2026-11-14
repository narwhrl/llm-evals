import * as THREE from 'three';
import {
  rng, asphaltTex, concreteTex, corrugatedTex, woodTex, containerTex,
  bombsiteTex, graffitiTex, bulletTex, signTex, policeTex, emblemTex,
  rosterTex, grateTex, streakTex, glowTex, smokeTex, rainTex,
} from './textures.js';

const OUTLINE = 0x141821;

export function buildWorld(scene) {
  const tickers = [];
  const R = rng(2026);
  const pick = (a) => a[Math.floor(R() * a.length)];

  // ---- shared toon setup ----
  const grad = new Uint8Array([120, 165, 210, 255]);
  const gradMap = new THREE.DataTexture(grad, 4, 1, THREE.RedFormat);
  gradMap.minFilter = gradMap.magFilter = THREE.NearestFilter;
  gradMap.needsUpdate = true;

  const toonCache = new Map();
  const toon = (color, opts = {}) => {
    const key = `${color}|${opts.map?.uuid ?? ''}|${opts.emissive ?? ''}|${opts.e ?? 0}`;
    if (!toonCache.has(key)) {
      toonCache.set(key, new THREE.MeshToonMaterial({
        color, gradientMap: gradMap, map: opts.map ?? null,
        emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.e ?? 1,
      }));
    }
    return toonCache.get(key);
  };
  const flat = (color, opts = {}) => new THREE.MeshStandardMaterial({
    color, roughness: opts.rough ?? 0.85, metalness: opts.metal ?? 0.05,
    map: opts.map ?? null, emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.e ?? 1, transparent: !!opts.t, opacity: opts.o ?? 1,
  });

  const world = new THREE.Group();
  scene.add(world);
  const add = (m, parent = world) => {
    parent.add(m);
    return m;
  };

  function outline(mesh, s = 1.035) {
    const o = new THREE.Mesh(
      mesh.geometry,
      new THREE.MeshBasicMaterial({ color: OUTLINE, side: THREE.BackSide })
    );
    o.scale.setScalar(s);
    o.raycast = () => {};
    mesh.add(o);
    return mesh;
  }

  function B(w, h, d, mat, x, y, z, ry = 0, ol = 0) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.castShadow = true;
    m.receiveShadow = true;
    if (ol) outline(m, ol);
    return add(m);
  }

  function C(rt, rb, h, mat, x, y, z, seg = 14, ol = 0) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    if (ol) outline(m, ol);
    return add(m);
  }

  function decal(tex, w, h, x, y, z, ry = 0, rx = 0) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, polygonOffset: true, polygonOffsetFactor: -2 })
    );
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    return add(m);
  }

  const TEX = {
    asphalt: asphaltTex(),
    concrete: concreteTex(),
    concreteDark: concreteTex('#43464c'),
    corrug: corrugatedTex(),
    corrugRust: corrugatedTex('#5d6167'),
    wood: woodTex(),
    grate: grateTex(),
    glow: glowTex(),
    streak: streakTex(),
    smoke: smokeTex(),
    rain: rainTex(),
  };

  // ================= BASE =================
  {
    const slab = B(64, 2, 64, toon(0x565a61, { map: TEX.concrete }), 0, -1, 0);
    slab.castShadow = false;
    B(66, 1.2, 66, toon(0x2c2f34), 0, -2.4, 0); // skirt rim
    const g = new THREE.Mesh(
      new THREE.PlaneGeometry(63.6, 63.6),
      new THREE.MeshToonMaterial({ color: 0xffffff, map: TEX.asphalt, gradientMap: gradMap })
    );
    g.rotation.x = -Math.PI / 2;
    g.position.y = 0.02;
    g.receiveShadow = true;
    add(g);
  }

  // ================= PROP BUILDERS =================
  const MAT = {
    wood: toon(0xffffff, { map: TEX.wood }),
    drumBlue: toon(0x2456a8),
    drumRust: toon(0x7a4a26),
    tire: toon(0x1b1d20),
    barrier: toon(0xd8622a),
    barrierW: toon(0xcfd2d6),
    concrete: toon(0xffffff, { map: TEX.concrete }),
    concreteDark: toon(0xffffff, { map: TEX.concreteDark }),
    dark: toon(0x23262c),
    iron: toon(0x3a3f46),
    roof: toon(0x2b2f34),
    rustIron: toon(0x5e4630),
    glass: new THREE.MeshStandardMaterial({ color: 0x8fb4d8, roughness: 0.15, metalness: 0.7, transparent: true, opacity: 0.55 }),
    paper: toon(0xb9b2a0),
    sack: toon(0x9a8f74),
  };

  function crate(s, x, z, y = 0, ry = 0) {
    const m = B(s, s, s, MAT.wood, x, y + s / 2, z, ry, s > 1 ? 1.04 : 0);
    return m;
  }
  function pallet(x, z, y = 0, ry = 0) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = ry;
    for (let i = -1; i <= 1; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.22), MAT.wood);
      b.position.set(0, 0.18, i * 0.55);
      b.castShadow = b.receiveShadow = true;
      g.add(b);
    }
    for (let i = -1; i <= 1; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 1.4), MAT.wood);
      b.position.set(i * 0.6, 0.06, 0);
      g.add(b);
    }
    return add(g);
  }
  function drum(x, z, rust = false, y = 0) {
    const m = C(0.55, 0.55, 1.5, rust ? MAT.drumRust : MAT.drumBlue, x, y + 0.75, z, 14, 1.05);
    // ribs
    for (const dy of [-0.4, 0.1]) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.035, 6, 18), MAT.dark);
      r.rotation.x = Math.PI / 2;
      r.position.set(x, y + 0.75 + dy, z);
      add(r);
    }
    return m;
  }
  function tire(x, z, y = 0, flatLay = true) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.22, 8, 18), MAT.tire);
    m.position.set(x, y + (flatLay ? 0.22 : 0.5), z);
    if (flatLay) m.rotation.x = Math.PI / 2;
    m.castShadow = m.receiveShadow = true;
    return add(m);
  }
  function barrier(x, z, ry = 0) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 0.5), MAT.barrier);
    body.position.y = 0.75;
    body.castShadow = true;
    outline(body, 1.05);
    g.add(body);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.22, 0.54), MAT.barrierW);
    stripe.position.y = 0.78;
    g.add(stripe);
    for (const dx of [-0.9, 0.9]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.7), MAT.dark);
      leg.position.set(dx, 0.22, 0);
      g.add(leg);
    }
    return add(g);
  }
  function concBlock(x, z, ry = 0) {
    return B(2, 0.9, 0.5, MAT.concrete, x, 0.45, z, ry, 1.05);
  }
  function container(color, code, x, y, z, ry = 0) {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(6, 2.6, 2.5),
      toon(0xffffff, { map: containerTex(color, code) })
    );
    m.position.set(x, y + 1.3, z);
    m.rotation.y = ry;
    m.castShadow = m.receiveShadow = true;
    outline(m, 1.02);
    add(m);
    // corner posts
    for (const [dx, dz] of [[-2.9, -1.15], [2.9, -1.15], [-2.9, 1.15], [2.9, 1.15]]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.6, 0.25), MAT.rustIron);
      p.position.set(dx, 0, dz);
      m.add(p);
    }
    return m;
  }

  // ================= T SPAWN (north, z<0) =================
  {
    // barbed-wire enclosure fence
    const fenceMat = MAT.iron;
    for (let x = -14; x <= 14; x += 3.5) {
      B(0.18, 3, 0.18, fenceMat, x, 1.5, -30.5);
    }
    const wirePts = [];
    for (const h of [1.2, 2.0, 2.8]) {
      wirePts.push(new THREE.Vector3(-14, h, -30.5), new THREE.Vector3(14, h, -30.5));
    }
    for (let x = -14; x < 14; x += 3.5) {
      wirePts.push(new THREE.Vector3(x, 2.8, -30.5), new THREE.Vector3(x + 3.5, 3.15, -30.5));
    }
    const wire = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(wirePts),
      new THREE.LineBasicMaterial({ color: 0x9aa2ad })
    );
    add(wire);
    decal(signTex(['T SPAWN', '货运站后场']), 3, 1.5, -6, 2.1, -30.38);

    // box truck (left) + leaning ladder
    const truck = new THREE.Group();
    truck.position.set(-9, 0, -25.5);
    truck.rotation.y = 0.12;
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.2), toon(0x7a4a3a));
    cab.position.set(0, 1.5, 3.2);
    cab.castShadow = true;
    outline(cab, 1.04);
    truck.add(cab);
    const shield = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.9, 0.1), MAT.glass);
    shield.position.set(0, 1.8, 4.32);
    truck.add(shield);
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 5.2), toon(0x8b8f94, { map: TEX.corrug }));
    box.position.set(0, 1.7, -0.6);
    box.castShadow = true;
    outline(box, 1.02);
    truck.add(box);
    decal(containerTex('#7d838a', 'RF-2210'), 0, 0, 0, -99, 0); // no-op keep cache warm
    const wheelG = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 14);
    for (const [dx, dz] of [[-1.1, 3.2], [1.1, 3.2], [-1.1, -1.6], [1.1, -1.6], [-1.1, 0.2], [1.1, 0.2]]) {
      const w = new THREE.Mesh(wheelG, MAT.tire);
      w.rotation.z = Math.PI / 2;
      w.position.set(dx, 0.55, dz);
      w.castShadow = true;
      truck.add(w);
    }
    add(truck);
    // ladder leaning on cargo box
    const lad = new THREE.Group();
    for (const dx of [-0.35, 0.35]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 4.4, 0.09), MAT.wood);
      rail.position.set(dx, 0, 0);
      lad.add(rail);
    }
    for (let i = -2; i <= 2; i++) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.08, 0.08), MAT.wood);
      rung.position.y = i * 0.8;
      lad.add(rung);
    }
    lad.position.set(-7.2, 2.0, -24.2);
    lad.rotation.z = 0.35;
    lad.rotation.y = 0.12;
    add(lad);

    // stacked containers (right), two-high + third, gap for passage
    container('#2e5d8a', 'TGHU-4481', 9, 0, -27.5);
    container('#8a5a2e', 'RF-0917', 9, 2.6, -27.5);
    container('#4a6b3a', 'CAXU-3302', 9, 5.2, -27.5);
    container('#6b3a4a', 'RF-5560', 15.5, 0, -26, 0.06);

    // slope passage toward mid/A
    const ramp = B(6, 0.5, 8, MAT.concrete, 0, 0.6, -19, 0);
    ramp.rotation.x = -0.12;
    // slope side wall with peek hole
    B(0.5, 2.6, 7, MAT.concrete, 3.4, 1.6, -18.5);
    B(0.5, 0.9, 7, MAT.concrete, 3.4, 0.45, -18.5); // above-hole lintel band
    // four-drum cluster + pallets
    drum(5.5, -21);
    drum(6.7, -21);
    drum(6.1, -21, true);
    drum(6.1, -22.2, true);
    pallet(5.8, -19.2);
    crate(1.4, -3.5, -21.5, 0, 0.3);
    crate(1.1, -3.4, -20, 0, -0.2);
    decal(graffitiTex(0), 3, 1.5, 3.12, 1.6, -18.5, -Math.PI / 2);
    decal(bulletTex(), 1.6, 1.6, 3.12, 1.3, -21, -Math.PI / 2);
  }

  // ================= A SITE (northwest warehouse) =================
  let shutterDoor;
  {
    const cx = -20, cz = -10;
    B(17, 0.35, 13, MAT.concreteDark, cx, 0.17, cz); // floor
    // walls: north full; west with 2 boarded windows; east with side door; south open
    B(17, 6, 0.6, MAT.concrete, cx, 3, cz - 6.2, 0, 1.01);
    // west wall segments (windows at z=-11.5,-8.5, opening 2x1.6 at h 2.6..4.2)
    B(0.6, 6, 3.4, MAT.concrete, cx - 8.2, 3, cz - 4.6);
    B(0.6, 6, 3.4, MAT.concrete, cx - 8.2, 3, cz + 0.9);
    B(0.6, 6, 2.6, MAT.concrete, cx - 8.2, 3, cz - 1.85);
    B(0.6, 1.8, 2.0, MAT.concrete, cx - 8.2, 0.9, cz - 1.5);
    B(0.6, 1.8, 2.0, MAT.concrete, cx - 8.2, 5.1, cz - 1.5);
    B(0.6, 1.8, 2.0, MAT.concrete, cx - 8.2, 0.9, cz + 1.5);
    B(0.6, 1.8, 2.0, MAT.concrete, cx - 8.2, 5.1, cz + 1.5);
    // plank crosses on windows
    for (const wz of [cz - 1.5, cz + 1.5]) {
      const p1 = B(0.15, 2.6, 0.3, MAT.wood, cx - 8.2, 3, wz);
      p1.rotation.x = 0.6;
      const p2 = B(0.15, 2.6, 0.3, MAT.wood, cx - 8.2, 3, wz);
      p2.rotation.x = -0.6;
    }
    // east wall with side door opening (door at z=-7, opening 1.6 wide)
    B(0.6, 6, 5.6, MAT.concrete, cx + 8.2, 3, cz - 3.4);
    B(0.6, 6, 5.6, MAT.concrete, cx + 8.2, 3, cz + 3.4);
    B(0.6, 1.6, 2.0, MAT.concrete, cx + 8.2, 5.2, cz);
    const sideDoor = B(0.15, 4.2, 1.7, MAT.rustIron, cx + 8.2, 2.1, cz + 0.4, 0.5); // ajar inner door
    // columns + roof
    for (const [px, pz] of [[-7.5, -5.5], [7.5, -5.5], [-7.5, 5.5], [7.5, 5.5]]) {
      B(0.7, 6, 0.7, MAT.iron, cx + px, 3, cz + pz);
    }
    B(18.5, 0.7, 14.5, toon(0x4a4e55, { map: TEX.corrugRust }), cx, 6.4, cz, 0, 1.005);
    // half-rolled shutter on south face: lintel + rolled drum + hanging half curtain
    B(17, 1.6, 0.5, MAT.concrete, cx, 5.4, cz + 6.2);
    const drumRoll = C(0.55, 0.55, 15.5, MAT.rustIron, cx, 4.4, cz + 6.0, 14);
    drumRoll.rotation.z = Math.PI / 2;
    shutterDoor = B(15.5, 2.2, 0.18, toon(0x70767e, { map: TEX.corrug }), cx, 3.2, cz + 6.0);
    decal(signTex(['A 区', 'BOMB SITE']), 2.6, 1.3, cx + 9.5, 2.2, cz + 5.5, Math.PI / 2);

    // bombsite marking
    decal(bombsiteTex('A'), 6, 6, cx - 1, 0.38, cz + 1, 0, -Math.PI / 2);

    // center pillar (peek position)
    B(1.2, 6, 1.2, MAT.concrete, cx, 3, cz, 0, 1.03);
    decal(bulletTex(), 1.2, 1.2, cx + 0.62, 1.6, cz, Math.PI / 2);
    decal(graffitiTex(3), 2.4, 1.2, cx - 0.62, 2.2, cz + 1, -Math.PI / 2);

    // 5-level heavy rack along north wall
    const rack = new THREE.Group();
    rack.position.set(cx - 3, 0, cz - 5);
    for (const px of [-3.5, 0, 3.5]) {
      for (const pz of [-0.5, 0.5]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.6, 0.25), toon(0x8a3a2a));
        post.position.set(px, 2.3, pz);
        post.castShadow = true;
        rack.add(post);
      }
    }
    for (let s = 0; s < 5; s++) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.15, 1.3), MAT.iron);
      shelf.position.set(0, 0.5 + s * 0.95, 0);
      shelf.castShadow = true;
      rack.add(shelf);
      if (s < 4) {
        for (const bx of [-2.6, -0.6, 1.6]) {
          if (R() < 0.75) {
            const b = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 1.0), pick([MAT.wood, MAT.paper, MAT.sack]));
            b.position.set(bx, 0.95 + s * 0.95, 0);
            b.castShadow = true;
            rack.add(b);
          }
        }
      }
    }
    add(rack);

    // forklift
    const fk = new THREE.Group();
    fk.position.set(cx + 4, 0, cz + 3);
    fk.rotation.y = -0.5;
    const fb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 2.2), toon(0xc2a13a));
    fb.position.y = 0.8;
    fb.castShadow = true;
    outline(fb, 1.05);
    fk.add(fb);
    const cab2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.2), MAT.dark);
    cab2.position.set(0, 1.7, 0.4);
    fk.add(cab2);
    for (const mx of [-0.55, 0.55]) {
      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.6, 0.14), MAT.iron);
      mast.position.set(mx, 1.5, -1.2);
      fk.add(mast);
    }
    for (const fx of [-0.4, 0.4]) {
      const fork = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 1.4), MAT.iron);
      fork.position.set(fx, 0.35, -1.8);
      fk.add(fork);
    }
    const wg = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 12);
    for (const [dx, dz] of [[-0.7, 0.7], [0.7, 0.7], [-0.7, -0.7], [0.7, -0.7]]) {
      const w = new THREE.Mesh(wg, MAT.tire);
      w.rotation.z = Math.PI / 2;
      w.position.set(dx, 0.35, dz);
      fk.add(w);
    }
    add(fk);

    // crates + sacks + sorting table + parcels
    crate(1.6, cx - 5.5, cz + 3.5, 0.35, 0.2);
    crate(1.2, cx - 5.3, cz + 3.4, 1.95, -0.15);
    crate(1.3, cx + 5.8, cz - 2.5, 0.35, 0.4);
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), MAT.sack);
      s.scale.set(1, 0.62, 1);
      s.position.set(cx - 5 + R() * 2.4, 0.6, cz - 3 + R() * 1.6);
      s.castShadow = s.receiveShadow = true;
      add(s);
    }
    B(2.6, 0.12, 1.2, MAT.wood, cx - 6, 1.0, cz - 0.5);
    for (const [dx, dz] of [[-1.1, -0.4], [1.1, -0.4], [-1.1, 0.4], [1.1, 0.4]]) {
      B(0.12, 1.0, 0.12, MAT.iron, cx - 6 + dx, 0.5, cz - 0.5 + dz);
    }
    for (let i = 0; i < 4; i++) {
      B(0.5 + R() * 0.3, 0.35, 0.4, MAT.paper, cx - 6.6 + R() * 1.4, 1.25, cz - 0.8 + R() * 0.7, R());
    }
    // scattered packing straps + newspapers (thin planes)
    for (let i = 0; i < 8; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.35), MAT.paper);
      p.rotation.x = -Math.PI / 2;
      p.rotation.z = R() * 3;
      p.position.set(cx - 6 + R() * 12, 0.38, cz - 2 + R() * 8);
      add(p);
    }

    // loft (NE corner) + ladder + small window
    B(5, 0.25, 4, MAT.wood, cx + 5.2, 3.4, cz - 3.8);
    for (let i = 0; i < 4; i++) {
      B(0.12, 1.0, 0.12, MAT.rustIron, cx + 2.9 + i * 1.55, 4.0, cz - 1.95);
    }
    B(5, 0.1, 0.12, MAT.rustIron, cx + 5.2, 4.5, cz - 1.95);
    const loftLad = new THREE.Group();
    for (const dx of [-0.3, 0.3]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 3.8, 0.09), MAT.rustIron);
      rail.position.set(dx, 0, 0);
      loftLad.add(rail);
    }
    for (let i = -2; i <= 2; i++) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.07, 0.07), MAT.rustIron);
      rung.position.y = i * 0.7;
      loftLad.add(rung);
    }
    loftLad.position.set(cx + 2.6, 1.8, cz - 3.8);
    add(loftLad);
    // loft lookout slit on east wall
    B(0.7, 0.1, 2.2, MAT.dark, cx + 8.2, 4.6, cz - 3.8);

    // rear half-open door with red glow seam
    B(2.2, 4.2, 0.2, MAT.rustIron, cx - 6, 2.1, cz - 6.3, 0.45);
    const seam = new THREE.Mesh(
      new THREE.PlaneGeometry(0.35, 4.0),
      new THREE.MeshBasicMaterial({ color: 0xff2a22 })
    );
    seam.position.set(cx - 4.9, 2.0, cz - 6.28);
    add(seam);
    tickers.push((t) => {
      seam.material.color.setHSL(0.01, 0.9, 0.45 + Math.sin(t * 1.3) * 0.08);
    });

    // outside: AC units, sign, dumpster, alley gap
    for (let i = 0; i < 2; i++) {
      B(1.0, 0.8, 0.6, toon(0x9aa0a6), cx + 9.1, 0.9 + i * 1.0, cz + 1.5, 0, 1.04);
    }
    B(2.2, 1.4, 1.2, toon(0x2e5d4a), cx + 3, 0.7, cz + 8.6, 0.2, 1.03); // dumpster
    B(2.4, 0.15, 1.4, MAT.dark, cx + 3, 1.45, cz + 8.6, 0.2); // lid
    crate(1.2, cx - 11.5, cz + 6.5, 0, 0.35);
    crate(1.0, cx - 11.4, cz + 5.2, 0, -0.2);
    decal(bulletTex(), 2, 2, cx - 8.45, 1.6, cz + 4, Math.PI / 2);
  }

  // ================= MID LANE =================
  let gateL, gateR;
  {
    // high walls both sides with gate gap at z=0
    for (const sx of [-1, 1]) {
      B(1.2, 4.5, 13, MAT.concrete, sx * 4.2, 2.25, -8);
      B(1.2, 4.5, 13, MAT.concrete, sx * 4.2, 2.25, 8);
      // gate posts
      B(1.4, 5.2, 1.4, MAT.iron, sx * 4.2, 2.6, -0.2, 0, 1.04);
      // shooting hole + dark inset
      B(1.3, 1.0, 0.3, MAT.dark, sx * 4.2, 3.1, sx > 0 ? -5 : 5);
      // platform behind wall
      B(3.2, 0.3, 4, MAT.wood, sx * 7.2, 1.8, sx > 0 ? -5 : 5);
      for (const [dx, dz] of [[-1.3, -1.7], [1.3, -1.7], [-1.3, 1.7], [1.3, 1.7]]) {
        B(0.25, 1.8, 0.25, MAT.iron, sx * 7.2 + dx, 0.9, (sx > 0 ? -5 : 5) + dz);
      }
      crate(1.1, sx * 7.2, (sx > 0 ? -5 : 5) + 3.2, 0, 0.3);
      crate(1.1, sx * 7.2, (sx > 0 ? -5 : 5) + 3.2, 1.1, -0.2);
      // guard booths with console + chair, dusty glass
      const bx = sx * 8.6, bz = sx > 0 ? 1.5 : -1.5;
      B(2.6, 2.6, 0.3, MAT.concrete, bx, 1.3, bz - 1.2);
      B(2.6, 2.6, 0.3, MAT.concrete, bx, 1.3, bz + 1.2);
      B(0.3, 2.6, 2.7, MAT.concrete, bx - 1.25, 1.3, bz);
      B(2.6, 0.3, 2.7, MAT.concrete, bx, 2.75, bz);
      const gg = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.2), MAT.glass);
      gg.position.set(bx + 1.28, 1.5, bz);
      gg.rotation.y = Math.PI / 2;
      add(gg);
      B(1.2, 0.7, 0.6, MAT.dark, bx, 0.7, bz); // console
      B(0.5, 0.5, 0.5, MAT.rustIron, bx - 0.4, 0.55, bz + 0.5); // stool
    }
    // double iron doors, half open
    gateL = B(0.25, 4.0, 2.6, toon(0x37414d, { map: TEX.corrug }), -2.6, 2.0, -0.6, 0.7, 1.03);
    gateR = B(0.25, 4.0, 2.6, toon(0x37414d, { map: TEX.corrug }), 2.6, 2.0, 0.9, -1.15, 1.03);
    B(9.6, 0.8, 1.0, MAT.iron, 0, 5.4, 0); // lintel beam
    decal(signTex(['MID', '中路']), 2.2, 1.1, 0, 5.4, 0.55);

    // drainage channel with grate
    B(1.4, 0.25, 26, MAT.dark, 1.6, 0.1, 0);
    const grate = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.12, 26),
      new THREE.MeshToonMaterial({ color: 0xffffff, map: TEX.grate, gradientMap: gradMap })
    );
    grate.position.set(1.6, 0.22, 0);
    grate.receiveShadow = true;
    add(grate);

    // low wall cover near CT side + fallen sign
    B(5, 1.1, 0.5, MAT.concrete, -0.5, 0.55, 10.5, 0, 1.03);
    crate(1.2, -2.6, 11.4, 0, 0.4);
    const fallen = B(2.0, 1.0, 0.12, toon(0xffffff, { map: signTex(['B →', '包点']) }), 2.8, 0.35, 11.8, 0.5);
    fallen.rotation.z = 1.35;
    decal(graffitiTex(1), 2.6, 1.3, -4.85, 1.8, -3, -Math.PI / 2);

    // sewer culvert T-slope -> CT flank (cover slabs + open ends)
    for (let i = 0; i < 9; i++) {
      B(1.1, 0.18, 1.9, MAT.concreteDark, 5.6, 0.12, -16 + i * 4.1, 0.02 * (i % 2 ? 1 : -1));
    }
    for (const ez of [-18.5, 20.5]) {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.18, 8, 16), MAT.concrete);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(5.6, 0.15, ez);
      add(rim);
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.8, 16), new THREE.MeshBasicMaterial({ color: 0x05070b }));
      hole.rotation.x = -Math.PI / 2;
      hole.position.set(5.6, 0.12, ez);
      add(hole);
    }
  }

  // ================= B SITE (northeast) =================
  let guardLamp, guardLampGlow;
  {
    const hx = 21, hz = -11;
    // guardhouse walls h=3.6 with front (west) door+window, back door
    B(8, 3.6, 0.4, MAT.concrete, hx, 1.8, hz - 3.5, 0, 1.005); // north
    B(0.4, 3.6, 7.4, MAT.concrete, hx + 4, 1.8, hz); // east
    // south wall with back door opening
    B(3.0, 3.6, 0.4, MAT.concrete, hx - 2.5, 1.8, hz + 3.5);
    B(3.0, 3.6, 0.4, MAT.concrete, hx + 2.5, 1.8, hz + 3.5);
    B(2.0, 0.8, 0.4, MAT.concrete, hx, 3.2, hz + 3.5);
    // west wall: door (1.4) + window (2.4) openings
    B(0.4, 3.6, 1.6, MAT.concrete, hx - 4, 1.8, hz - 2.7);
    B(0.4, 3.6, 1.4, MAT.concrete, hx - 4, 1.8, hz + 2.8);
    B(0.4, 1.0, 2.6, MAT.concrete, hx - 4, 0.5, hz + 0.35);
    B(0.4, 0.8, 2.6, MAT.concrete, hx - 4, 3.2, hz + 0.35);
    // glass window
    const win = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.7), MAT.glass);
    win.position.set(hx - 4, 1.95, hz + 0.35);
    win.rotation.y = -Math.PI / 2;
    add(win);
    // flat roof + parapet
    B(8.8, 0.4, 8.2, MAT.roof, hx, 3.8, hz);
    B(8.8, 0.7, 0.3, MAT.concrete, hx, 4.3, hz - 3.9);
    B(8.8, 0.7, 0.3, MAT.concrete, hx, 4.3, hz + 3.9);
    B(0.3, 0.7, 8.2, MAT.concrete, hx + 4.25, 4.3, hz);
    // interior: desk, fallen chair, cabinet, roster, lamp, cans, papers
    B(2.4, 0.12, 1.0, MAT.wood, hx + 1, 0.95, hz - 1);
    for (const [dx, dz] of [[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]]) {
      B(0.1, 0.9, 0.1, MAT.iron, hx + 1 + dx, 0.45, hz - 1 + dz);
    }
    const chair = new THREE.Group();
    chair.position.set(hx + 0.6, 0.35, hz + 0.6);
    chair.rotation.set(Math.PI / 2.2, 0, 0.4);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.55), MAT.rustIron);
    chair.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.6, 0.1), MAT.rustIron);
    back.position.set(0, 0.3, -0.28);
    chair.add(back);
    add(chair);
    B(1.0, 2.0, 0.6, toon(0x4a5a52), hx + 3.2, 1.0, hz + 2.6, 0, 1.03); // locker
    decal(rosterTex(), 1.4, 1.4, hx + 0.5, 2.0, hz - 3.28, Math.PI);
    // dangling warm tube lamp
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6), MAT.dark);
    cord.position.set(hx, 3.2, hz);
    add(cord);
    guardLamp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.7, 10),
      new THREE.MeshBasicMaterial({ color: 0xffd9a0 })
    );
    guardLamp.rotation.z = Math.PI / 2;
    guardLamp.position.set(hx, 2.8, hz);
    add(guardLamp);
    guardLampGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX.glow, color: 0xffb45e, transparent: true, opacity: 0.55, depthWrite: false,
    }));
    guardLampGlow.scale.setScalar(1.8);
    guardLampGlow.position.set(hx, 2.8, hz);
    add(guardLampGlow);
    const guardPt = new THREE.PointLight(0xffc37a, 4, 8, 1.8);
    guardPt.position.set(hx, 1.5, hz);
    add(guardPt);
    tickers.push((t) => {
      const f = 0.85 + 0.1 * Math.sin(t * 23) * Math.sin(t * 7.3) + (Math.sin(t * 1.7) > 0.985 ? -0.5 : 0);
      guardPt.intensity = 4 * f;
      guardLampGlow.material.opacity = 0.7 * f;
    });
    // desk props: radio, cans, papers
    B(0.5, 0.18, 0.3, MAT.dark, hx + 0.4, 1.1, hz - 1);
    C(0.09, 0.09, 0.25, MAT.drumRust, hx + 1.5, 1.15, hz - 0.8, 8);
    C(0.09, 0.09, 0.25, MAT.drumRust, hx + 1.7, 1.15, hz - 1.2, 8);
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), MAT.paper);
      p.rotation.x = -Math.PI / 2;
      p.rotation.z = R() * 3;
      p.position.set(hx + 0.4 + R(), 1.02, hz - 1 + R() * 0.6);
      add(p);
    }

    // roof balcony (2F overwatch) + fire escape
    B(4.5, 0.25, 3.2, MAT.iron, hx + 1, 4.1, hz - 1.5);
    for (let i = 0; i <= 4; i++) {
      B(0.1, 0.9, 0.1, MAT.rustIron, hx - 1 + i * 1, 4.65, hz - 3.0);
    }
    B(4.2, 0.1, 0.1, MAT.rustIron, hx + 1, 5.1, hz - 3.0);
    // fire-escape stairs (south face)
    const stair = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.5), MAT.rustIron);
      s.position.set(0, 0.5 + i * 0.5, i * 0.45);
      s.castShadow = true;
      stair.add(s);
    }
    stair.position.set(hx - 2.5, 0, hz + 3.8);
    stair.rotation.y = Math.PI;
    add(stair);

    // bombsite marking in front of iron house
    decal(bombsiteTex('B'), 5.5, 5.5, hx - 7.5, 0.1, hz + 2.5, 0, -Math.PI / 2);

    // irregular cover: pallets, dumpsters, bicycle, overturned furniture
    pallet(hx - 7, hz + 5, 0, 0.2);
    crate(1.1, hx - 7, hz + 5, 0.25, 0.5);
    B(1.8, 1.2, 1.0, toon(0x37503f), hx - 4.5, 0.6, hz + 5.5, -0.15, 1.03);
    B(1.8, 1.2, 1.0, toon(0x37503f), hx - 9.5, 0.6, hz - 0.5, 0.35, 1.03);
    // bicycle
    const bike = new THREE.Group();
    bike.position.set(hx - 5.5, 0, hz + 4.2);
    bike.rotation.set(0, 0.7, Math.PI / 2 - 0.12);
    for (const dz of [-0.55, 0.55]) {
      const wh = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.05, 6, 16), MAT.dark);
      wh.position.set(0, 0, dz);
      bike.add(wh);
    }
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.1), toon(0x8a2a2a));
    frame.position.y = 0.35;
    bike.add(frame);
    add(bike);
    // overturned cafe table + chairs
    const tbl = C(0.5, 0.5, 0.08, MAT.rustIron, hx - 10.5, 0.55, hz + 3.5, 12);
    tbl.rotation.z = Math.PI / 2 - 0.2;
    const leg = C(0.05, 0.05, 1.0, MAT.rustIron, hx - 10.0, 0.5, hz + 3.5, 8);
    leg.rotation.z = 1.2;
    for (let i = 0; i < 2; i++) {
      const ch = B(0.45, 0.08, 0.45, MAT.wood, hx - 11.5 + i * 1.2, 0.25, hz + 4.5 - i, R());
      ch.rotation.z = 0.2;
    }
    decal(bulletTex(), 2.2, 2.2, hx - 4.2, 1.8, hz + 1, -Math.PI / 2);
    decal(graffitiTex(2), 3, 1.5, hx + 2, 1.9, hz + 3.72, 0);
  }

  // ================= CT SPAWN (south) =================
  const police = {};
  {
    // back wall with emblem + slogan
    B(30, 4, 0.8, MAT.concrete, 0, 2, 30.5, 0, 1.002);
    decal(emblemTex(), 4, 4, -6, 2.2, 30.05, Math.PI);
    decal(signTex(['坚守阵地', 'HOLD THE LINE'], '#1d2f52', '#dfe6f2'), 5, 2.2, 5, 2.3, 30.05, Math.PI);

    // police van (left)
    const van = new THREE.Group();
    van.position.set(-9, 0, 25);
    van.rotation.y = -0.18;
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 5.4), toon(0x2a3f66));
    body.position.y = 1.5;
    body.castShadow = true;
    outline(body, 1.03);
    van.add(body);
    const band = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.5, 5.44), MAT.barrierW);
    band.position.y = 1.4;
    van.add(band);
    const shield2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.9, 0.15), MAT.glass);
    shield2.position.set(0, 1.7, 2.75);
    shield2.rotation.x = -0.15;
    van.add(shield2);
    const wg2 = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 14);
    for (const [dx, dz] of [[-1.1, 1.8], [1.1, 1.8], [-1.1, -1.8], [1.1, -1.8]]) {
      const w = new THREE.Mesh(wg2, MAT.tire);
      w.rotation.z = Math.PI / 2;
      w.position.set(dx, 0.5, dz);
      van.add(w);
    }
    // light bar
    const barBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.4), MAT.dark);
    barBase.position.set(0, 2.6, 0.6);
    van.add(barBase);
    police.red = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.3, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xff2222 }));
    police.red.position.set(-0.45, 2.8, 0.6);
    van.add(police.red);
    police.blue = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.3, 0.35),
      new THREE.MeshBasicMaterial({ color: 0x2244ff }));
    police.blue.position.set(0.45, 2.8, 0.6);
    van.add(police.blue);
    const pDecal = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.0),
      new THREE.MeshBasicMaterial({ map: policeTex(), transparent: true }));
    pDecal.position.set(0, 1.55, 2.72);
    pDecal.rotation.y = 0;
    pDecal.rotation.x = 0;
    van.add(pDecal);
    add(van);
    police.redL = new THREE.PointLight(0xff2222, 0, 14, 1.8);
    police.redL.position.set(-9.5, 3.2, 25.6);
    add(police.redL);
    police.blueL = new THREE.PointLight(0x2244ff, 0, 14, 1.8);
    police.blueL.position.set(-8.5, 3.2, 25.6);
    add(police.blueL);
    tickers.push((t) => {
      const ph = (t * 0.9) % 2;
      const rOn = ph < 1;
      police.redL.intensity = rOn ? 16 : 0;
      police.blueL.intensity = rOn ? 0 : 16;
      police.red.material.color.setHex(rOn ? 0xff3333 : 0x550000);
      police.blue.material.color.setHex(rOn ? 0x000055 : 0x3355ff);
    });

    // concrete platform + stairs + searchlight (right)
    B(7, 2.2, 6, MAT.concrete, 10, 1.1, 26, 0, 1.01);
    for (let i = 0; i < 5; i++) {
      B(0.9, 0.4, 3, MAT.concreteDark, 6.05 - i * 0.9, 1.95 - i * 0.42, 26, 0);
    }
    const pole = C(0.12, 0.16, 3.4, MAT.iron, 10, 3.9, 26, 8);
    const head = new THREE.Group();
    head.position.set(10, 5.6, 26);
    const lampBox = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.7), MAT.dark);
    head.add(lampBox);
    const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xeaf2ff }));
    lens.position.z = -0.36;
    lens.rotation.y = Math.PI;
    head.add(lens);
    add(head);
    const spot = new THREE.SpotLight(0xd8e8ff, 90, 45, 0.32, 0.5, 1.6);
    spot.position.set(10, 5.6, 26);
    spot.target.position.set(0, 1, -6);
    add(spot);
    add(spot.target);
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(3.2, 16, 20, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x9fc4ff, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false })
    );
    cone.position.set(5, 3.4, 10);
    cone.rotation.x = -2.25;
    add(cone);
    tickers.push((t) => {
      const sway = Math.sin(t * 0.5) * 0.1;
      head.rotation.y = sway;
      spot.target.position.set(Math.sin(t * 0.5) * 4, 1, -6);
      const f = 0.9 + 0.1 * Math.sin(t * 17) * Math.sin(t * 5.1);
      spot.intensity = 90 * f;
      cone.material.opacity = 0.07 * f;
    });

    // defensive line: barriers + shields
    barrier(-4, 21); barrier(-1.5, 21.2, 0.1); barrier(1, 21, -0.08); barrier(3.5, 21.2, 0.05);
    for (const sx of [-2.7, 0, 2.7]) {
      B(0.9, 1.2, 0.12, toon(0x2a3f66), sx, 0.9, 20.2, 0.1 * sx, 1.05);
      B(0.12, 0.35, 0.12, MAT.dark, sx, 0.18, 20.2);
    }
    // gear crates (vests/helmets)
    crate(1.3, 14, 28.5, 0, 0.2);
    crate(1.0, 14.2, 28.3, 1.3, -0.3);
    decal(signTex(['防弹衣 · 头盔', 'GEAR']), 1.8, 0.9, 14, 1.0, 27.83, Math.PI);
    // split routes marker
    decal(signTex(['← 中路 MID', 'B 区 →'], '#3d4a3a', '#d8d4c0'), 3.4, 1.4, -14, 1.6, 19.5, 0.4);
  }

  // ================= SIDE ROUTES =================
  {
    // LEFT alley (west): corridor T -> A -> CT
    B(0.8, 3.4, 42, MAT.concrete, -28.5, 1.7, 0, 0, 1.002);
    B(0.8, 3.0, 20, MAT.concrete, -24.5, 1.5, -12);
    B(0.8, 3.0, 18, MAT.concrete, -24.5, 1.5, 12);
    crate(1.4, -26.5, -6, 0, 0.2);
    crate(1.1, -26.3, -6.2, 1.4, -0.3);
    crate(1.3, -26.5, 8, 0, 0.5);
    drum(-26.8, 2, true);
    drum(-26, 2.8);
    decal(graffitiTex(1), 3, 1.5, -28.05, 1.9, 2, Math.PI / 2);
    decal(bulletTex(), 2, 2, -24.05, 1.5, 14, Math.PI / 2);

    // RIGHT elevated flank: posts + deck + stairs + rails
    for (let z = -18; z <= 18; z += 6) {
      for (const px of [24, 28]) B(0.4, 2.4, 0.4, MAT.rustIron, px, 1.2, z);
    }
    B(5.2, 0.35, 38, MAT.wood, 26, 2.55, 0);
    for (const px of [23.6, 28.4]) {
      for (let z = -18; z <= 18; z += 3) B(0.12, 1.0, 0.12, MAT.rustIron, px, 3.2, z);
      B(0.14, 0.14, 38, MAT.rustIron, px, 3.7, 0);
    }
    for (let i = 0; i < 6; i++) {
      B(4.6, 0.35, 1.2, MAT.wood, 26, 2.3 - i * 0.4, -21 - i * 1.1);
      B(4.6, 0.35, 1.2, MAT.wood, 26, 2.3 - i * 0.4, 21 + i * 1.1);
    }
    crate(1.2, 26, -14, 2.7, 0.3);
    concBlock(26, 2, 0.2);
    decal(signTex(['高台 →', 'FLANK']), 2.2, 1.1, 24.5, 3.4, -17, 0.3);
  }

  // ================= STREET FURNITURE / CITY FABRIC =================
  let streetLamp, streetGlow, streetPt;
  {
    // B corner street lamp (warm)
    const lx = 14.5, lz = -3.5;
    C(0.14, 0.2, 6.5, MAT.iron, lx, 3.25, lz, 8);
    const arm = B(1.8, 0.14, 0.14, MAT.iron, lx - 0.8, 6.4, lz);
    streetLamp = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xffd9a0 }));
    streetLamp.position.set(lx - 1.6, 6.3, lz);
    add(streetLamp);
    streetGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX.glow, color: 0xffb45e, transparent: true, opacity: 0.85, depthWrite: false,
    }));
    streetGlow.scale.setScalar(5);
    streetGlow.position.copy(streetLamp.position);
    add(streetGlow);
    streetPt = new THREE.PointLight(0xffb45e, 35, 22, 1.9);
    streetPt.position.set(lx - 1.6, 6.0, lz);
    add(streetPt);
    // fake reflection streak on wet ground
    const streak = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 6),
      new THREE.MeshBasicMaterial({ map: TEX.streak, color: 0xffb45e, transparent: true, opacity: 0.35, depthWrite: false }));
    streak.rotation.x = -Math.PI / 2;
    streak.rotation.z = 0.3;
    streak.position.set(lx - 1.2, 0.06, lz + 2.5);
    add(streak);
    tickers.push((t) => {
      const f = 0.88 + 0.08 * Math.sin(t * 13) * Math.sin(t * 4.7) + (Math.sin(t * 0.9) > 0.992 ? -0.45 : 0);
      streetPt.intensity = 35 * f;
      streetGlow.material.opacity = 0.85 * f;
    });

    // power poles + sagging wires
    const poleTops = [];
    for (const [px, pz] of [[-26, -16], [-26, 8], [8, -24], [22, 6]]) {
      C(0.16, 0.22, 8.5, toon(0x4a3b2c), px, 4.25, pz, 8);
      B(1.8, 0.14, 0.14, MAT.dark, px, 8.0, pz);
      poleTops.push(new THREE.Vector3(px, 8.0, pz));
    }
    const wireMat = new THREE.LineBasicMaterial({ color: 0x0c0e12 });
    const spans = [[0, 1], [0, 2], [1, 3], [2, 3]];
    for (const [a, b] of spans) {
      const p0 = poleTops[a], p1 = poleTops[b];
      for (const off of [-0.7, 0, 0.7]) {
        const mid = p0.clone().lerp(p1, 0.5);
        mid.y -= 1.6;
        const curve = new THREE.QuadraticBezierCurve3(
          p0.clone().add(new THREE.Vector3(off, 0, 0)),
          mid.clone().add(new THREE.Vector3(off, 0, 0)),
          p1.clone().add(new THREE.Vector3(off, 0, 0))
        );
        add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(20)), wireMat));
      }
    }

    // drainage gutters with drip points on warehouse + guardhouse
    const dripSpots = [];
    for (const [gx, gy, gz] of [[-11.4, 6.0, -4], [-11.4, 6.0, -16], [25.2, 3.6, -8], [16.8, 3.6, -14]]) {
      C(0.09, 0.09, gy, MAT.rustIron, gx, gy / 2, gz, 8);
      dripSpots.push([gx, 0.3, gz]);
    }
    // exposed downspout on mid wall
    C(0.09, 0.09, 4.2, MAT.rustIron, 4.95, 2.1, 6, 8);
    dripSpots.push([4.95, 0.3, 6]);

    // ---- puddles + ripples ----
    const puddleMat = new THREE.MeshStandardMaterial({
      color: 0x11161f, roughness: 0.08, metalness: 0.92,
      transparent: true, opacity: 0.9, envMapIntensity: 1.4,
    });
    const puddles = [
      [-6, -14, 3.2, 2.2], [8, -8, 2.6, 1.8], [0, 4, 2.0, 3.0], [-14, 2, 3.6, 2.4],
      [12, 2, 2.4, 2.0], [4, 14, 3.0, 2.2], [-8, 18, 2.8, 2.0], [18, 12, 2.2, 2.6],
      [-22, -2, 2.4, 1.8], [24, -18, 2.6, 2.0], [-2, -24, 2.8, 2.0], [14, -12, 2.0, 1.6],
      [-18, -18, 2.2, 2.6], [2, 26, 2.6, 2.0],
    ];
    for (const [px, pz, rx, rz] of puddles) {
      const p = new THREE.Mesh(new THREE.CircleGeometry(1, 26), puddleMat);
      p.rotation.x = -Math.PI / 2;
      p.scale.set(rx, rz, 1);
      p.position.set(px, 0.05, pz);
      p.receiveShadow = true;
      add(p);
    }
    // ripple rings pool
    const ripples = [];
    const ringG = new THREE.RingGeometry(0.42, 0.5, 22);
    for (let i = 0; i < 26; i++) {
      const m = new THREE.Mesh(ringG, new THREE.MeshBasicMaterial({
        color: 0x9fc4e8, transparent: true, opacity: 0, depthWrite: false,
      }));
      m.rotation.x = -Math.PI / 2;
      const pd = pick(puddles);
      m.userData = { x: pd[0], z: pd[1], r: Math.min(pd[2], pd[3]), ph: R() };
      add(m);
      ripples.push(m);
    }
    tickers.push((t) => {
      for (const m of ripples) {
        const c = (t * 0.35 + m.userData.ph) % 1;
        const s = 0.3 + c * m.userData.r * 1.4;
        m.scale.set(s, s, 1);
        m.position.set(m.userData.x, 0.07, m.userData.z);
        m.material.opacity = 0.4 * (1 - c);
      }
    });

    // ---- rain (points) ----
    const RAIN = 1500;
    const pos = new Float32Array(RAIN * 3);
    const spd = new Float32Array(RAIN);
    for (let i = 0; i < RAIN; i++) {
      pos[i * 3] = (R() - 0.5) * 74;
      pos[i * 3 + 1] = R() * 36;
      pos[i * 3 + 2] = (R() - 0.5) * 74;
      spd[i] = 20 + R() * 8;
    }
    const rainG = new THREE.BufferGeometry();
    rainG.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const rain = new THREE.Points(rainG, new THREE.PointsMaterial({
      map: TEX.rain, size: 1.4, transparent: true, opacity: 0.5,
      color: 0xaac4e8, depthWrite: false, sizeAttenuation: true,
    }));
    add(rain);
    tickers.push((t, dt) => {
      const a = rainG.attributes.position.array;
      const step = Math.min(dt, 0.05);
      for (let i = 0; i < RAIN; i++) {
        a[i * 3 + 1] -= spd[i] * step;
        a[i * 3] += step * 1.5; // slant
        if (a[i * 3 + 1] < 0) {
          a[i * 3 + 1] = 34 + R() * 2;
          a[i * 3] = (R() - 0.5) * 74;
          a[i * 3 + 2] = (R() - 0.5) * 74;
        }
      }
      rainG.attributes.position.needsUpdate = true;
    });

    // ---- eave drips ----
    const DRIPS = 42;
    const dpos = new Float32Array(DRIPS * 3);
    const dsrc = [];
    for (let i = 0; i < DRIPS; i++) {
      const s = pick(dripSpots);
      const h = 2.5 + R() * 3.5;
      dsrc.push({ x: s[0] + (R() - 0.5), h, z: s[2] + (R() - 0.5), y: R() * h });
      dpos[i * 3] = dsrc[i].x;
      dpos[i * 3 + 1] = dsrc[i].y;
      dpos[i * 3 + 2] = dsrc[i].z;
    }
    const dripG = new THREE.BufferGeometry();
    dripG.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
    add(new THREE.Points(dripG, new THREE.PointsMaterial({
      map: TEX.rain, size: 0.55, transparent: true, opacity: 0.75,
      color: 0x9fc0e8, depthWrite: false,
    })));
    tickers.push((t, dt) => {
      const a = dripG.attributes.position.array;
      const step = Math.min(dt, 0.05);
      for (let i = 0; i < DRIPS; i++) {
        a[i * 3 + 1] -= 9 * step;
        if (a[i * 3 + 1] < 0.1) a[i * 3 + 1] = dsrc[i].h;
      }
      dripG.attributes.position.needsUpdate = true;
    });

    // ---- vent steam ----
    const steams = [];
    for (const [sx, sy, sz] of [[-13, 6.8, -10], [21, 4.4, -14.5]]) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: TEX.smoke, transparent: true, opacity: 0.5, depthWrite: false,
      }));
      sp.position.set(sx, sy, sz);
      sp.scale.setScalar(1.6);
      add(sp);
      steams.push({ sp, ph: R() });
    }
    tickers.push((t) => {
      for (const { sp, ph } of steams) {
        const c = (t * 0.22 + ph) % 1;
        sp.position.y += 0.004;
        sp.scale.setScalar(1.4 + c * 2.2);
        sp.material.opacity = 0.42 * (1 - c);
        if (c < 0.02) sp.position.y -= 2.4;
      }
    });

    // ---- warehouse cold light + mid fill ----
    const wh = new THREE.PointLight(0xcfe4ff, 16, 20, 1.8);
    wh.position.set(-20, 5.2, -10);
    add(wh);
    const whGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX.glow, color: 0xcfe4ff, transparent: true, opacity: 0.28, depthWrite: false,
    }));
    whGlow.scale.setScalar(2.4);
    whGlow.position.set(-20, 5.6, -10);
    add(whGlow);
    tickers.push((t) => {
      const f = 0.9 + 0.06 * Math.sin(t * 11) * Math.sin(t * 3.7) + (Math.sin(t * 1.1) > 0.996 ? -0.35 : 0);
      wh.intensity = 16 * f;
      whGlow.material.opacity = 0.28 * f;
    });
    const midPt = new THREE.PointLight(0x8fb0d8, 10, 16, 1.9);
    midPt.position.set(0, 5.5, 0);
    add(midPt);

    // ---- shutter micro vibration ----
    tickers.push((t) => {
      const burst = Math.max(0, Math.sin(t * 0.9) - 0.994) * 160;
      shutterDoor.position.x = -20 + Math.sin(t * 60) * 0.02 * burst;
    });
  }

  return { tickers, refs: { shutterDoor, gateL, gateR, streetLamp } };
}
