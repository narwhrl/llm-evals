import * as THREE from 'three';
import * as TX from './textures.js';

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
const rand = (() => { let s = 99; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })();
const mat = (o) => new THREE.MeshStandardMaterial(o);
const toon = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, metalness: 0.05, ...o });
function box(w, h, d, m, x = 0, y = 0, z = 0, ry = 0) {
  const r = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  r.position.set(x, y, z); if (ry) r.rotation.y = ry; return r;
}
function cyl(rt, rb, h, m, x = 0, y = 0, z = 0, seg = 14) {
  const r = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
  r.position.set(x, y, z); return r;
}
function sph(r, m, x = 0, y = 0, z = 0, w = 12, h = 9) {
  const s = new THREE.Mesh(new THREE.SphereGeometry(r, w, h), m);
  s.position.set(x, y, z); return s;
}
function add(p, m, cast = true, recv = true) { p.add(m); m.castShadow = cast; m.receiveShadow = recv; return m; }
function plane(w, h, m, x, y, z, ry = 0) {
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
  p.position.set(x, y, z); if (ry) p.rotation.y = ry; return p;
}

export function buildWorld(scene) {
  const dyn = [];
  const interactives = []; // {obj, box3, onClick, name}
  const HALF_L = 4;         // cabin half length
  const R = 2.0;            // inner radius
  const WALL = 0.22;        // wall thickness

  /* ============================ EARTH ============================== */
  // A real 3D Earth sitting just OUTSIDE the porthole opening, close to the
  // glass, so its lit hemisphere fills the window. It rotates with the day
  // cycle; a night-light shell and cloud shell ride on top.
  const earthG = new THREE.Group();
  const PORT = { x: 1.4, y: 0.35, r: 0.95 };
  // shares the porthole x/y so it is centred in the aperture; a large sphere
  // just behind the glass reads as the Earth filling the window
  earthG.position.set(PORT.x, PORT.y, -R - 1.5);
  scene.add(earthG);
  const dayT = TX.earthDayTexture(), nightT = TX.earthNightTexture(), cloudT = TX.earthCloudTexture();
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1.9, 48, 32),
    new THREE.MeshStandardMaterial({ map: dayT, roughness: 1, metalness: 0, emissive: 0x2a4a7a, emissiveMap: dayT, emissiveIntensity: 0.6 })
  );
  earthG.add(earth);
  // night side — a second sphere blending city lights where day is dark
  const earthNight = new THREE.Mesh(
    new THREE.SphereGeometry(1.91, 48, 32),
    new THREE.MeshBasicMaterial({ map: nightT, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  earthG.add(earthNight);
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.95, 48, 32),
    new THREE.MeshStandardMaterial({ map: cloudT, transparent: true, opacity: 0.6, depthWrite: false, emissive: 0x88aacc, emissiveMap: cloudT, emissiveIntensity: 0.35 })
  );
  earthG.add(clouds);
  // atmosphere rim — a fresnel-ish glow shell
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(2.1, 48, 32),
    new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, depthWrite: false,
      uniforms: { c: { value: new THREE.Color(0x4aa8ff) }, p: { value: 3.2 } },
      vertexShader: `varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=(modelViewMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec3 vN;varying vec3 vP;uniform vec3 c;uniform float p;void main(){float i=pow(max(0.,dot(normalize(vN),normalize(-vP))),p);gl_FragColor=vec4(c,i*0.9);}`,
    })
  );
  earthG.add(atmo);
  // distant starfield so the void beyond the window is not a flat black
  {
    const pts = [];
    const rng = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
    for (let i = 0; i < 900; i++) pts.push((rng() - 0.5) * 90, (rng() - 0.5) * 90, -24 - rng() * 30);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xcfe0ff, size: 1.7, sizeAttenuation: false, transparent: true, opacity: 0.85 }));
    scene.add(stars);
  }

  /* ===================== CABIN SHELL (cut capsule) ================= */
  const hull = new THREE.Group();
  scene.add(hull);
  const wallTex = TX.hullWallTexture();
  wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping; wallTex.repeat.set(3, 1.4);
  const hullMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85, metalness: 0.12, side: THREE.DoubleSide });

  // Rear wall — a flat plate carrying a REAL circular aperture for the main
  // porthole, so Earth is seen through the hole (not through a faked decal).
  // The outline is arched on top so it still reads as a capsule section.
  // PORT is defined above next to the Earth group.
  const rearShape = new THREE.Shape();
  rearShape.moveTo(-HALF_L, -R);              // bottom-left
  rearShape.lineTo(HALF_L, -R);               // bottom-right
  rearShape.lineTo(HALF_L, 0.6);              // up the right side
  rearShape.absarc(0, 0.6, HALF_L, 0, Math.PI, false); // arch across the top
  rearShape.lineTo(-HALF_L, -R);              // down the left side
  const portHole = new THREE.Path();
  portHole.absarc(PORT.x, PORT.y, PORT.r, 0, Math.PI * 2, true);
  rearShape.holes.push(portHole);
  const rearWall = new THREE.Mesh(
    new THREE.ShapeGeometry(rearShape, 48),
    new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85, metalness: 0.12, side: THREE.DoubleSide })
  );
  rearWall.position.set(0, 0, -R);
  rearWall.receiveShadow = true;
  hull.add(rearWall);
  // a thicker rim plate just behind the wall face, same aperture, showing the cut edge
  const rim = new THREE.Mesh(new THREE.ShapeGeometry(rearShape, 48),
    new THREE.MeshStandardMaterial({ color: 0x7c848e, roughness: 0.7, metalness: 0.3, side: THREE.DoubleSide }));
  rim.position.set(0, 0, -R - 0.14);
  hull.add(rim);
  // gently curved ceiling shell closing the top back edge
  const crownGeo = new THREE.CylinderGeometry(R + WALL, R + WALL, HALF_L * 2, 48, 1, true, Math.PI * 0.9, Math.PI * 0.2);
  const crown = new THREE.Mesh(crownGeo, hullMat);
  crown.rotation.z = Math.PI / 2;
  crown.position.y = 0.6;
  crown.receiveShadow = true;
  hull.add(crown);
  // end caps — closed circular hatches at both ends
  for (const sx of [-1, 1]) {
    const cap = cyl(R + WALL, R + WALL, WALL, toon(0x9aa0a8), sx * HALF_L, 0, 0, 32);
    cap.rotation.z = Math.PI / 2;
    add(hull, cap);
    // hatch ring + small porthole + handle
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.09, 8, 24), toon(0x7c828a));
    ring.position.set(sx * (HALF_L - 0.12), 0, 0); ring.rotation.y = Math.PI / 2; hull.add(ring);
    const port = cyl(0.42, 0.42, 0.06, new THREE.MeshStandardMaterial({ color: 0x0e1a26, roughness: 0.2, metalness: 0.4 }), sx * (HALF_L - 0.13), 0, 0, 20);
    port.rotation.z = Math.PI / 2; hull.add(port);
    const portGlass = cyl(0.36, 0.36, 0.04, new THREE.MeshStandardMaterial({ color: 0x2a4a6a, roughness: 0.1, metalness: 0.6, emissive: 0x0a2038, emissiveIntensity: 0.5 }), sx * (HALF_L - 0.15), 0, 0, 20);
    portGlass.rotation.z = Math.PI / 2; hull.add(portGlass);
  }
  // floor — a slab with a grating texture and a warm light strip down the middle
  const floorTex = TX.floorTexture();
  const floor = box(HALF_L * 2, 0.18, R * 2 - 0.1, new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.9 }), 0, -R + 0.09, 0);
  floor.receiveShadow = true;
  hull.add(floor);
  // warm light strip inset along the floor centre
  const strip = box(HALF_L * 2 - 0.4, 0.05, 0.16, new THREE.MeshBasicMaterial({ color: 0xffd9a0 }), 0, -R + 0.19, 0);
  hull.add(strip);
  const stripGlow = new THREE.PointLight(0xffd9a0, 6, 7, 2);
  stripGlow.position.set(0, -R + 0.5, 0); hull.add(stripGlow);
  interactives.push({ obj: strip, name: 'lightstrip', action: 'nightcruise' });
  // low side rails along the open edges so the section reads as a cut hull
  for (const sz of [-1, 1]) {
    const rail = box(HALF_L * 2, 0.5, 0.14, toon(0x8a9098), 0, -R + 0.25, sz * (R - 0.07));
    hull.add(rail);
  }

  /* ====================== MAIN PORTHOLE (hero) ===================== */
  // Big round window set INTO the real aperture cut in the rear wall. Earth is
  // placed on the camera→porthole sight-line so the disc fills the opening.
  const PZ = -R;                              // rear wall inner surface
  const portFrame = new THREE.Mesh(new THREE.TorusGeometry(0.99, 0.13, 12, 40), toon(0x9aa4b0));
  portFrame.position.set(PORT.x, PORT.y, PZ + 0.04);
  hull.add(portFrame);
  const portRing = new THREE.Mesh(new THREE.TorusGeometry(0.99, 0.05, 10, 40),
    new THREE.MeshStandardMaterial({ color: 0xbfe0ff, roughness: 0.3, metalness: 0.6, emissive: 0x4a90c8, emissiveIntensity: 0.8 }));
  portRing.position.set(PORT.x, PORT.y, PZ + 0.09); hull.add(portRing);
  // a short inner barrel lining the aperture so the hole reads as a window
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.95, 0.34, 40, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x39404a, roughness: 0.6, metalness: 0.4, side: THREE.DoubleSide })
  );
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(PORT.x, PORT.y, PZ - 0.12);
  hull.add(barrel);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const b = cyl(0.03, 0.03, 0.08, toon(0x5c636c), PORT.x + Math.cos(a) * 0.99, PORT.y + Math.sin(a) * 0.99, PZ + 0.11, 8);
    b.rotation.x = Math.PI / 2;
    hull.add(b);
  }
  // the glass — almost fully clear so the Earth reads crisply through it
  const portGlassMain = new THREE.Mesh(
    new THREE.CircleGeometry(PORT.r - 0.02, 40),
    new THREE.MeshStandardMaterial({ color: 0x9cc8ff, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false })
  );
  portGlassMain.position.set(PORT.x, PORT.y, PZ - 0.02);
  hull.add(portGlassMain);
  // make the porthole clickable for fast-forward + drag
  interactives.push({ obj: portGlassMain, name: 'porthole', action: 'porthole' });

  /* two small portholes on the rear wall — different angles on the same sky */
  const smallPorts = [];
  for (const [px, py] of [[-2.6, 0.55], [-3.4, -0.2]]) {
    const fr = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.08, 10, 28), toon(0x8a929c));
    fr.position.set(px, py, PZ + 0.05); hull.add(fr);
    const gl = cyl(0.33, 0.33, 0.04, new THREE.MeshStandardMaterial({ color: 0x0a1626, roughness: 0.1, metalness: 0.5, transparent: true, opacity: 0.3, emissive: 0x1a3050, emissiveIntensity: 0.4 }), px, py, PZ + 0.06, 24);
    gl.rotation.x = Math.PI / 2;
    hull.add(gl);
    smallPorts.push(gl);
  }

  /* ========================== FURNISHING =========================== */
  /* ---- Sleeping zone (left end): vertical sleeping bag + photos --- */
  const sleepG = new THREE.Group(); sleepG.position.set(-3.2, 0, -R + 0.5); scene.add(sleepG);
  const bag = box(1.0, 1.9, 0.4, new THREE.MeshStandardMaterial({ map: TX.fabricTexture(0x5a7a8c), roughness: 1 }), 0, -R + 0.95, 0);
  bag.rotation.x = -0.1;
  add(sleepG, bag);
  // half-open zipper + pillow peeking out
  add(sleepG, box(0.06, 1.7, 0.04, toon(0xd8dde2), 0.28, -R + 0.95, 0.21), { cast: false });
  const zip = box(0.08, 0.1, 0.05, toon(0x9aa0a8), 0.28, -R + 0.55, 0.22);
  add(sleepG, zip);
  add(sleepG, box(0.5, 0.22, 0.18, toon(0xe8e2d4), -0.05, -R + 1.85, 0.1), {});
  // little partition board with taped photos + a handwritten note
  const board = box(1.1, 0.8, 0.05, toon(0x8a7a5f), 0.9, -R + 1.1, -0.05);
  add(sleepG, board);
  const ph1 = plane(0.28, 0.28, new THREE.MeshStandardMaterial({ map: TX.photoTexture(30), roughness: 0.9 }), 0.68, -R + 1.25, -0.02);
  const ph2 = plane(0.24, 0.24, new THREE.MeshStandardMaterial({ map: TX.photoTexture(210), roughness: 0.9 }), 1.1, -R + 1.05, -0.02);
  const nt = plane(0.3, 0.22, new THREE.MeshStandardMaterial({ map: TX.noteTexture('miss you\n— home'), roughness: 1 }), 1.02, -R + 1.35, -0.02);
  [ph1, ph2, nt].forEach(m => { m.rotation.y = Math.PI; sleepG.add(m); });
  // warm reading lamp
  const rl = new THREE.PointLight(0xffc87a, 5, 4, 2); rl.position.set(-2.4, -R + 1.4, -R + 1.1); scene.add(rl);
  add(scene, cyl(0.03, 0.05, 0.4, toon(0x777d85), -2.4, -R + 1.2, -R + 1.1, 8));
  const rlBulb = sph(0.06, new THREE.MeshBasicMaterial({ color: 0xffd9a0 }), -2.4, -R + 1.42, -R + 1.1);
  scene.add(rlBulb);
  interactives.push({ obj: bag, name: 'sleep', action: 'focus' });

  /* ---- Work zone (under the big porthole): desk + laptop + gear ---- */
  const workG = new THREE.Group(); workG.position.set(1.4, -R, -0.4); scene.add(workG);
  // folding desk
  add(workG, box(1.7, 0.08, 0.7, toon(0x9a8a6a), 0, 0.78, 0), {});
  for (const dx of [-0.7, 0.7]) add(workG, box(0.06, 0.78, 0.6, toon(0x777d85), dx, 0.39, 0), {});
  // open laptop showing telemetry
  const lap = new THREE.Group(); lap.position.set(-0.2, 0.86, 0); workG.add(lap);
  add(lap, box(0.7, 0.03, 0.45, toon(0x2c3036), 0, 0, 0), {});
  const screen = box(0.7, 0.42, 0.02, new THREE.MeshStandardMaterial({ map: TX.laptopScreenTexture().tex, emissive: 0xffffff, emissiveMap: TX.laptopScreenTexture().tex, emissiveIntensity: 0.9 }), 0, 0.24, -0.22);
  screen.rotation.x = -0.5;
  add(lap, screen);
  const lapGlow = new THREE.PointLight(0x38e0c8, 2.2, 2.6, 2); lapGlow.position.set(-0.2, -R + 1.1, -0.3); scene.add(lapGlow);
  // headphones hanging
  add(workG, new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 8, 20, Math.PI), toon(0x2c3036)), 0.75, 1.15, -0.15);
  add(workG, box(0.1, 0.14, 0.08, toon(0x1c2026), 0.75, 1.05, -0.3), {});
  // vacuum flask on a velcro pad
  add(workG, cyl(0.07, 0.07, 0.22, toon(0x4a6a8a), 0.55, 0.9, 0.15, 12), {});
  // clipped blueprints on the wall beside the desk
  for (let i = 0; i < 3; i++) {
    const bp = plane(0.4, 0.3, new THREE.MeshStandardMaterial({ map: TX.noteTexture(['ORBITAL\nTRACK', 'MODULE\n04', 'POWER\nFLOW'][i], '#dfe8ee', '#2a4a6a'), roughness: 1 }), 2.3 + i * 0.45, -R + 1.9, -R + 0.05);
    bp.rotation.y = Math.PI; scene.add(bp);
  }
  interactives.push({ obj: lap, name: 'work', action: 'focus' });

  /* ---- Viewing seat (right of the porthole): recliner + panel ------ */
  const seatG = new THREE.Group(); seatG.position.set(3.1, -R, 0.9); scene.add(seatG);
  add(seatG, box(0.9, 0.5, 0.9, toon(0x6a7078), 0, 0.25, 0), {});
  add(seatG, box(0.9, 1.0, 0.18, toon(0x6a7078), 0, 0.9, -0.36), {});
  add(seatG, box(0.9, 0.5, 0.7, toon(0x7c8592), 0, 0.5, 0.05), {});
  // armrest control panel with glowing buttons
  const panel = box(0.3, 0.06, 0.5, toon(0x2c3036), 0.52, 0.62, 0);
  add(seatG, panel);
  const btnCols = [0xff6b5a, 0x38e0c8, 0xffd27f, 0x4aa8ff];
  btnCols.forEach((c, i) => {
    const b = sph(0.03, new THREE.MeshBasicMaterial({ color: c }), 3.1 + 0.52, -R + 0.66, 0.9 - 0.16 + i * 0.1);
    scene.add(b);
    dyn.push((t) => { b.material.color.setHex(c); b.scale.setScalar(0.8 + 0.3 * Math.abs(Math.sin(t * (2 + i)))); });
  });
  interactives.push({ obj: seatG.children[0], name: 'seat', action: 'focus' });

  /* ---- Plant corner (between the two small portholes) -------------- */
  const plantG = new THREE.Group(); plantG.position.set(-3.05, -R, -0.7); scene.add(plantG);
  // 3-tier hydro rack
  for (let lvl = 0; lvl < 3; lvl++) {
    add(plantG, box(0.9, 0.06, 0.5, toon(0x8a9098), 0, 0.3 + lvl * 0.4, 0), {});
    for (const px of [-0.3, 0, 0.3]) {
      // little lettuce/basil clumps
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.16, 6), new THREE.MeshStandardMaterial({ color: 0x5aa040, roughness: 0.9 }));
      leaf.position.set(px, 0.42 + lvl * 0.4, 0); plantG.add(leaf);
      add(plantG, sph(0.04, new THREE.MeshStandardMaterial({ color: 0x7cc84f }), px, 0.36 + lvl * 0.4, 0.1), {});
      // water droplets on the leaves
      if (lvl === 1) add(plantG, sph(0.014, new THREE.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.6 }), px + 0.05, 0.42 + lvl * 0.4, 0.05), {});
    }
    for (const sx of [-0.42, 0.42]) add(plantG, box(0.05, 1.2, 0.05, toon(0x777d85), sx, 0.6, -0.2), {});
  }
  // pink-purple grow lights on top — the cabin's second light source
  const growMat = new THREE.MeshBasicMaterial({ color: 0xff7ad9 });
  const growBars = [];
  for (const px of [-0.28, 0, 0.28]) {
    const bar = box(0.22, 0.04, 0.06, growMat, px, 1.5, 0);
    plantG.add(bar); growBars.push(bar);
  }
  const growLight = new THREE.PointLight(0xff7ad9, 3.5, 2.6, 2);
  growLight.position.set(-3.05, -R + 1.6, -0.5); scene.add(growLight);
  interactives.push({ obj: plantG.children[0], name: 'plant', action: 'plant' });

  /* ---- Fitness corner (by the right hatch): exercise bike ---------- */
  const bikeG = new THREE.Group(); bikeG.position.set(3.4, -R, -0.6); scene.add(bikeG);
  add(bikeG, box(0.5, 0.06, 1.0, toon(0x3a3f45), 0, 0.03, 0), {});
  add(bikeG, cyl(0.3, 0.3, 0.06, toon(0x555b62), 0, 0.35, 0.3, 20), {}).rotation.x = Math.PI / 2;
  add(bikeG, box(0.08, 0.7, 0.08, toon(0x777d85), 0, 0.4, -0.2), {});
  add(bikeG, box(0.5, 0.1, 0.1, toon(0x2c3036), 0, 0.78, -0.35), {});
  // sweatband wrapped on the handlebar
  add(bikeG, new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 6, 12), toon(0xd8dde2)), 0.15, 0.78, -0.35);
  // towel on the wall above
  const towel = box(0.5, 0.5, 0.03, new THREE.MeshStandardMaterial({ map: TX.fabricTexture(0xc8b4a0), roughness: 1 }), 3.5, -R + 1.7, -R + 0.06);
  add(scene, towel);
  interactives.push({ obj: bikeG.children[0], name: 'bike', action: 'focus' });

  /* ---- Storage & misc along the wall -------------------------------- */
  // mesh cargo nets holding food packs, a tool, a cube
  for (let i = 0; i < 3; i++) {
    const nx = -1.2 + i * 1.0;
    const net = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), new THREE.MeshStandardMaterial({ color: 0x8a9098, wireframe: true }));
    net.position.set(nx, -R + 2.0, -R + 0.08); net.scale.y = 0.6; scene.add(net);
    add(scene, sph(0.14, toon([0xd8b46a, 0x7aa05a, 0x9a6a4a][i]), nx, -R + 1.95, -R + 0.1), {});
  }
  // clothes velcroed to the ceiling
  for (const [cx, c] of [[-0.6, 0x4a6a8a], [0.4, 0x8a5a4a], [1.2, 0x5a7a5a]]) {
    const cl = box(0.3, 0.5, 0.08, new THREE.MeshStandardMaterial({ map: TX.fabricTexture(c), roughness: 1 }), cx, R - 0.4, -0.4);
    add(scene, cl);
    add(scene, box(0.32, 0.06, 0.1, toon(0xd8dde2), cx, R - 0.16, -0.4), {});
  }
  // extinguisher + first-aid box on the wall
  add(scene, cyl(0.08, 0.08, 0.5, toon(0xc0392b), 0.2, -R + 1.1, -R + 0.1, 10), {});
  add(scene, box(0.4, 0.3, 0.12, toon(0xd8dde2), -0.5, -R + 1.3, -R + 0.08), {});
  const cross = plane(0.3, 0.3, new THREE.MeshBasicMaterial({ map: TX.labelTexture('✚', '#d8dde2', '#c0392b', 64, 64) }), -0.5, -R + 1.3, -R + 0.15);
  cross.rotation.y = Math.PI; scene.add(cross);
  // velcro slippers on the floor
  for (const sx of [-0.5, -0.1]) add(scene, box(0.14, 0.05, 0.34, toon(0xd8b4a0), sx, -R + 0.03, 1.0), {});
  // cable runs fixed with ties along the wall
  for (const cy of [1.0, 1.6]) {
    const cab = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, cy, -R + 0.08), new THREE.Vector3(-1, cy - 0.1, -R + 0.06),
      new THREE.Vector3(1.5, cy + 0.1, -R + 0.08), new THREE.Vector3(3.6, cy, -R + 0.1),
    ]), 20, 0.03, 5), toon(0x2c3036));
    scene.add(cab);
    for (let i = 0; i < 6; i++) add(scene, box(0.04, 0.1, 0.06, toon(0xd8b400), -3 + i * 1.2, cy, -R + 0.08), { cast: false });
  }
  // blinking indicator panel
  const ind = box(0.5, 0.3, 0.06, toon(0x2c3036), -2.0, -R + 1.5, -R + 0.06);
  add(scene, ind);
  const indLeds = [];
  [[0x38e0c8, 0], [0xffd27f, 1], [0xff6b5a, 2], [0x4aa8ff, 3]].forEach(([c, i]) => {
    const l = sph(0.02, new THREE.MeshBasicMaterial({ color: c }), -2.15 + i * 0.1, -R + 1.52, -R + 0.02);
    scene.add(l); indLeds.push({ l, c, ph: i * 1.3 });
  });
  dyn.push((t) => { indLeds.forEach(({ l, c, ph }) => { l.material.color.setHex(c); l.scale.setScalar(Math.sin(t * (2 + ph)) > 0 ? 1.2 : 0.6); }); });

  /* ---- Floating items — the "someone lives here" drift -------------- */
  const floaters = [];
  // pen — drifts and dodges the cursor; click spins it
  const pen = cyl(0.015, 0.015, 0.22, toon(0x2c3036), 0, 0, 0, 8);
  pen.rotation.z = 0.6; scene.add(pen);
  const penTip = cyl(0.02, 0.005, 0.05, toon(0xd8b400), 0, 0.13, 0, 8); pen.add(penTip);
  const penState = { m: pen, base: new THREE.Vector3(0.8, 0.3, 0.5), spin: 0, t: Math.random() * 9 };
  floaters.push(penState);
  interactives.push({ obj: pen, name: 'pen', action: 'pen' });
  // open technical manual — two pages drifting
  const book = new THREE.Group();
  const pgMat = new THREE.MeshStandardMaterial({ map: TX.noteTexture('FIG 4.2\nPRESSURE', '#f0ead8', '#3a4a5a'), roughness: 1, side: THREE.DoubleSide });
  const pg1 = plane(0.22, 0.3, pgMat, -0.11, 0, 0); pg1.rotation.y = 0.4;
  const pg2 = plane(0.22, 0.3, pgMat, 0.11, 0, 0); pg2.rotation.y = -0.4;
  book.add(pg1, pg2); book.position.set(-1.5, -R + 1.5, 0.4); scene.add(book);
  floaters.push({ m: book, base: new THREE.Vector3(-1.5, -R + 1.5, 0.4), spin: 0.2, t: 3 });
  // wireless earbuds drifting
  const buds = new THREE.Group();
  buds.add(sph(0.05, toon(0xd8dde2), 0, 0, 0), cyl(0.012, 0.012, 0.08, toon(0xd8dde2), 0.03, -0.06, 0, 6));
  buds.add(sph(0.05, toon(0xd8dde2), 0.12, 0.03, 0.02), cyl(0.012, 0.012, 0.08, toon(0xd8dde2), 0.15, -0.03, 0.02, 6));
  buds.position.set(0.5, -R + 1.8, -0.6); scene.add(buds);
  floaters.push({ m: buds, base: buds.position.clone(), spin: 0.3, t: 6 });
  // a water droplet escaped from the plant rack
  const drop = sph(0.05, new THREE.MeshStandardMaterial({ color: 0xbfe8ff, roughness: 0.05, metalness: 0.7, transparent: true, opacity: 0.85 }), -2.6, -R + 1.2, -0.4);
  scene.add(drop);
  floaters.push({ m: drop, base: drop.position.clone(), spin: 0, t: 1.5 });
  // a biscuit crumb
  const crumb = box(0.05, 0.04, 0.05, toon(0xc8a86a), 2.0, -R + 1.4, 0.2);
  scene.add(crumb);
  floaters.push({ m: crumb, base: crumb.position.clone(), spin: 1.2, t: 4.4 });

  /* ======================= LIGHTS (interior) ======================== */
  scene.add(new THREE.AmbientLight(0x223048, 0.5));
  const keyStrip = new THREE.PointLight(0xffd9a0, 0, 8, 2); // night floor strip already added; this is the cabin main
  keyStrip.position.set(0, -R + 0.8, 0); scene.add(keyStrip);
  // sun — a strong directional that swings around with the day cycle
  const sun = new THREE.DirectionalLight(0xfff2dc, 0);
  sun.position.set(0, 8, -20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -6; sun.shadow.camera.right = 6; sun.shadow.camera.top = 6; sun.shadow.camera.bottom = -6;
  scene.add(sun);
  // sun shaft — a hard circular pool of light thrown on the floor through the
  // porthole at local noon, the brightest beat of the day
  const shaft = new THREE.SpotLight(0xfff4d8, 0, 14, 0.42, 0.35, 1.2);
  shaft.position.set(PORT.x, PORT.y, -R + 0.3);       // at the glass
  shaft.target.position.set(PORT.x - 1.6, -R, 0.6);   // thrown down onto the floor
  scene.add(shaft); scene.add(shaft.target);
  // the visible pool — a bright disc on the floor that swells with daylight
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(1.05, 32),
    new THREE.MeshBasicMaterial({ color: 0xfff6e0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(PORT.x - 1.7, -R + 0.2, 0.7);
  scene.add(pool);
  // cool earthshine rim on the porthole frame at night
  const earthshine = new THREE.PointLight(0x4aa8ff, 0, 6, 2);
  earthshine.position.set(PORT.x, PORT.y, -1); scene.add(earthshine);

  /* ======================= STATE + INTERACTION ====================== */
  const state = {
    period: 90, t: 0.25, fast: false, nightCruise: false, plantOn: true,
    focus: null, focusTarget: new THREE.Vector3(0, -0.4, 0), camZoom: 1,
    draggingEarth: false,
  };

  return { state, earth, earthNight, clouds, earthG, sun, earthshine, shaft, pool, strip, stripGlow, keyStrip, rl, growLight, growBars, penState, floaters, interactives, dyn, portholeGlass: portGlassMain, mainPortPos: new THREE.Vector3(PORT.x, PORT.y, PZ) };
}
