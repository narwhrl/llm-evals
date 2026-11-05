import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import {
  M, T, box, cyl, cone, sphere, mesh, plane, torus, group, put, decal, contact,
  rod, wire, ladder, crate, barrel, cardboardBox, pallet, barrier, tire, sandbag,
  trafficCone, fencePost,
} from './kit.js';

const GROUND = 57;
const HALF = GROUND / 2;

// Puddle coverage encoded in the red channel of a canvas texture.
function wetMask() {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#080808'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 34; i++) {
    const x = Math.random() * 512, y = Math.random() * 512, r = 12 + Math.random() * 66;
    const rg = g.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, 'rgb(240,240,240)');
    rg.addColorStop(0.5, 'rgb(150,150,150)');
    rg.addColorStop(1, 'rgb(8,8,8)');
    g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

// Custom reflector shader: dark wet asphalt with mirror-bright puddle patches.
const wetShader = {
  name: 'WetGroundShader',
  uniforms: {
    color: { value: null }, tDiffuse: { value: null },
    textureMatrix: { value: null }, tMask: { value: null }, uTime: { value: 0 },
  },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec2 vLocal;
    #include <common>
    #include <logdepthbuf_pars_vertex>
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vLocal = position.xy;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      #include <logdepthbuf_vertex>
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform sampler2D tMask;
    uniform float uTime;
    varying vec4 vUv;
    varying vec2 vLocal;
    #include <logdepthbuf_pars_fragment>
    float ov(float b, float s){ return b < 0.5 ? 2.0*b*s : 1.0-2.0*(1.0-b)*(1.0-s); }
    vec3 ov(vec3 b, vec3 s){ return vec3(ov(b.r,s.r), ov(b.g,s.g), ov(b.b,s.b)); }
    void main() {
      #include <logdepthbuf_fragment>
      vec2 uv = vLocal / ${GROUND.toFixed(1)} + 0.5;
      float wet = texture2D(tMask, uv).r;
      vec4 base = texture2DProj(tDiffuse, vUv);
      vec3 refl = ov(base.rgb, color);
      vec3 asphalt = vec3(0.05, 0.064, 0.08) + 0.016 * sin(vLocal.x * 0.8) * sin(vLocal.y * 0.7);
      vec3 col = mix(asphalt, refl, clamp(wet, 0.0, 1.0) * 0.88);
      col += refl * (0.05 + 0.02 * sin(uv.x * 140.0 + uTime * 2.0) * sin(uv.y * 110.0 - uTime * 1.6)) * (1.0 - wet);
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

export function buildWorld() {
  const root = new THREE.Group();
  const anim = {
    flicker: [], police: { red: null, blue: null, redMat: null, blueMat: null },
    search: {}, shutter: null, water: [], drips: [], ripples: [], vents: [],
    reflectorUniform: null, lightning: null,
  };
  const add = (o, x, y, z, ry) => {
    if (x === undefined) { root.add(o); return o; }
    o.position.set(x, y, z);
    if (ry !== undefined) o.rotation.y = ry;
    root.add(o);
    return o;
  };
  const raw = (o) => { root.add(o); return o; };
  const P = put;

  function addPoint(color, intensity, dist, x, y, z, flick = null) {
    const l = new THREE.PointLight(color, intensity, dist, 2);
    l.position.set(x, y, z);
    root.add(l);
    if (flick) anim.flicker.push({ light: l, base: intensity, amp: flick.amp ?? 0.14, speed: flick.speed ?? 3, phase: Math.random() * 6.28 });
    return l;
  }
  function glowBox(w, h, d, mat) { return box(w, h, d, mat, { outline: false, shadow: false }); }
  function drainPipe(x, y, z, h = 5) {
    raw(rod([x, y, z], [x, 0.15, z + 0.02], 0.09, M.rust));
    P(root, box(0.4, 0.18, 0.4, M.rust, { outline: false }), x, y - 0.05, z);
    anim.drips.push({ x, y: 0.15, z });
  }

  // -------------------------------------------------------------------------
  // Square concrete base, wet reflective ground, raised rim
  // -------------------------------------------------------------------------
  add(box(60, 1.8, 60, M.concrete), 0, -0.9, 0);
  const reflector = new Reflector(new THREE.PlaneGeometry(GROUND, GROUND), {
    clipBias: 0.003, textureWidth: 1024, textureHeight: 1024,
    color: 0x7a8894, shader: wetShader, multisample: 0,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.02;
  reflector.material.uniforms.tMask.value = wetMask();
  anim.reflectorUniform = reflector.material.uniforms.uTime;
  root.add(reflector);

  add(box(60, 0.55, 1.5, M.concrete), 0, 0.275, -29.25);
  add(box(60, 0.55, 1.5, M.concrete), 0, 0.275, 29.25);
  add(box(1.5, 0.55, 57, M.concrete), -29.25, 0.275, 0);
  add(box(1.5, 0.55, 57, M.concrete), 29.25, 0.275, 0);

  // ground stencil marks + scattered small surface detail
  add(decal(T.siteA, 5, 5, { x: -21, y: 0.035, z: -9, rx: -Math.PI / 2, opacity: 0.85 }));
  add(decal(T.siteB, 5, 5, { x: 19, y: 0.035, z: -6, rx: -Math.PI / 2, opacity: 0.85 }));
  for (const [x, z] of [[-8, -14], [8, -12], [-2, 6], [10, 8], [-16, 12], [16, 18], [-22, 20], [4, -24], [-6, 14], [22, 4]]) {
    anim.ripples.push({ x, z });
  }

  // -------------------------------------------------------------------------
  // Global illumination (cool rain-night) + occasional lightning
  // -------------------------------------------------------------------------
  root.add(new THREE.HemisphereLight(0x3b5878, 0x0d141e, 1.0));
  root.add(new THREE.AmbientLight(0x33445c, 0.55));
  const moon = new THREE.DirectionalLight(0x9cc0ea, 1.45);
  moon.position.set(-30, 46, -20);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const sc = moon.shadow.camera;
  sc.left = -34; sc.right = 34; sc.top = 34; sc.bottom = -34; sc.near = 1; sc.far = 140;
  moon.shadow.bias = -0.0004;
  root.add(moon); root.add(moon.target);
  anim.lightning = new THREE.DirectionalLight(0xbcd8ff, 0);
  anim.lightning.position.set(18, 34, 12);
  root.add(anim.lightning);

  // =========================================================================
  // 1. T SPAWN (north)
  // =========================================================================
  function tSpawn() {
    // barbed-wire perimeter
    for (let x = -11; x <= 11; x += 2.75) add(fencePost(2.6), x, 1.3, -27.4);
    for (const y of [1.1, 1.75, 2.4]) raw(rod([-11, y, -27.4], [11, y, -27.4], 0.022, M.steelDark));
    for (let i = 0; i < 26; i++) {
      const x = -10.5 + i * 0.85;
      raw(rod([x, 2.4, -27.4], [x + 0.18, 2.7, -27.4], 0.02, M.steelDark));
    }
    // side fences
    for (const sx of [-11, 11]) {
      for (let z = -27.4; z <= -19; z += 2.7) add(fencePost(2.4), sx, 1.2, z);
    }

    // three stacked shipping containers on the right (two firing levels)
    const cont = (w, h, d, mat) => {
      const g = group(box(w, h, d, mat));
      const n = 7;
      for (let i = 1; i < n; i++) {
        const xx = -w / 2 + (w / n) * i;
        P(g, box(0.07, h * 0.92, 0.05, M.rust, { outline: false, shadow: false }), xx, 0, d / 2 + 0.02);
      }
      return g;
    };
    add(cont(6.4, 2.7, 2.6, M.rust), 7.2, 1.35, -24.5);
    add(cont(6.4, 2.7, 2.6, M.blueDark), 7.2, 4.05, -24.5);
    add(cont(4.6, 2.7, 2.6, M.rust), 8.1, 6.75, -24.5);
    // gap between lower containers for a single-file passage
    add(cont(2.2, 2.7, 2.6, M.steel), 3.4, 1.35, -21.4, Math.PI / 2);
    add(contact(12, 7, 7, -23.5));
    // freight numbers on containers
    add(decal(T.freight, 3.2, 1.6, { x: 7.2, y: 2.0, z: -23.18, ry: 0, opacity: 0.8 }));
    add(decal(T.danger, 3.0, 1.5, { x: 8.1, y: 7.0, z: -23.18, opacity: 0.8 }));
    add(decal(T.bullets, 2.2, 2.2, { x: 5.2, y: 1.6, z: -23.17, opacity: 0.9 }));
    anim.drips.push({ x: 4.1, y: 2.7, z: -23.2 });
    anim.drips.push({ x: 10.3, y: 8.1, z: -23.2 });

    // battered cargo truck on the left
    const truck = group();
    P(truck, box(2.7, 2.6, 4.4, M.rust), 0, 1.9, -0.6);
    P(truck, box(2.5, 1.9, 1.9, M.rust), 0, 1.55, 2.5);
    P(truck, box(2.05, 0.85, 0.06, M.glass, { outline: false }), 0, 1.95, 3.46);
    P(truck, box(2.7, 0.16, 4.5, M.steelDark, { outline: false }), 0, 0.62, -0.6);
    for (const wx of [-1.28, 1.28]) for (const wz of [-1.9, 1.9]) {
      const w = cyl(0.5, 0.26, M.rubber, { outline: false, shadow: false });
      w.rotation.z = Math.PI / 2;
      P(truck, w, wx, 0.5, wz);
    }
    P(truck, box(2.2, 0.5, 0.1, M.orangeDark, { outline: false, shadow: false }), 0, 1.0, 3.45);
    add(truck, -7, 0, -24, 0.12);
    add(contact(4.4, 7, -7, -24));
    add(decal(T.graffitiB, 3.0, 1.5, { x: -7, y: 2.0, z: -21.88, opacity: 0.75 }));

    // wooden ladder leaning on the truck
    const lad = ladder(0.9, 4.2, 8, M.wood);
    lad.rotation.z = 0.32;
    add(lad, -9.4, 0.05, -23.4, 0.2);

    // ramp leading south to mid / A
    const ramp = group();
    const slope = box(7, 0.35, 5.2, M.concrete);
    slope.rotation.x = -0.16;
    P(ramp, slope, 0, 0.95, 0);
    P(ramp, box(7, 1.1, 0.5, M.wallDark), 0, 0.55, -2.5);
    add(ramp, -1.5, 0, -18.2);
    // broken hole in the ramp wall (dark recess + crouch hide)
    add(decal(T.bullets, 2.4, 2.2, { x: -3.2, y: 1.0, z: -20.66, ry: Math.PI, opacity: 0.9 }));
    add(box(1.5, 1.2, 0.15, M.steelDark, { outline: false }), -3.0, 0.7, -20.68);
    // four-pack oil drums + pallet at the ramp
    for (const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]) add(barrel(M.blue), -5.4 + dx, 0.75, -16.6 + dz);
    add(pallet(), -8.2, 0, -16.2, 0.3);
    add(crate(1.3), -8.2, 0.85, -16.2, 0.3);
  }

  // =========================================================================
  // 2. A SITE — half-open warehouse (north-west)
  // =========================================================================
  function aSite() {
    const cx = -19.5, zBack = -19, zFront = -6, xL = -27, xR = -12;
    add(contact(17, 15, cx, -12.5, 0.7));
    // shell
    add(box(15, 6, 0.6, M.wall), cx, 3, zBack);                 // back wall
    add(box(0.6, 6, 13, M.wall), xL, 3, -12.5);                // west wall
    add(box(0.6, 6, 13, M.wall), xR, 3, -12.5);                // east wall
    add(box(15, 0.4, 7, M.rust), cx, 6.2, -15.5);              // half roof (back only)
    add(box(0.55, 6, 0.55, M.concreteDark), xL, 3, zFront);
    add(box(0.55, 6, 0.55, M.concreteDark), xR, 3, zFront);
    // half-rolled rusty roller shutter (upper half closed, lower half open)
    const shutter = group();
    P(shutter, box(14, 3.0, 0.18, M.rust), 0, 4.5, 0);
    for (let i = 0; i < 12; i++) P(shutter, box(14, 0.05, 0.22, M.steelDark, { outline: false, shadow: false }), 0, 3.1 + i * 0.24, 0.02);
    P(shutter, cyl(0.55, 14.2, M.rust), 0, 6.05, 0);
    shutter.children[shutter.children.length - 1].rotation.z = Math.PI / 2;
    add(shutter, cx, 0, zFront);
    anim.shutter = shutter;
    anim.drips.push({ x: -24, y: 3.0, z: zFront + 0.1 });
    anim.drips.push({ x: -16, y: 3.0, z: zFront + 0.1 });
    // two boarded windows + inner side door on east wall
    for (const zz of [-15, -10.5]) {
      add(box(0.12, 1.8, 2.0, M.steelDark, { outline: false }), xR + 0.34, 3.4, zz);
      for (const yy of [3.0, 3.8]) add(box(0.1, 0.28, 2.2, M.wood, { outline: false }), xR + 0.42, yy, zz);
      add(box(0.1, 0.28, 2.2, M.wood, { outline: false }), xR + 0.42, 3.4, zz).rotation.z = 0.9;
    }
    const door = box(1.4, 2.6, 0.12, M.woodDark);
    add(door, xR + 0.45, 1.3, -8.2, -0.5);
    // central load-bearing pillar (classic peek spot)
    add(box(1.3, 6, 1.3, M.concrete), cx, 3, -12);
    add(box(1.7, 0.3, 1.7, M.concreteDark, { outline: false }), cx, 0.15, -12);
    // mezzanine loft (upper-right corner) + vertical ladder + small window
    add(box(5, 0.3, 3.2, M.steel), -14.6, 3.7, -17.2);
    raw(rod([-12.2, 0, -17.2], [-12.2, 3.7, -17.2], 0.07, M.steelDark));
    add(ladder(0.8, 3.7, 7, M.steelDark), -12.2, 0, -15.6);
    add(box(2.0, 1.1, 0.1, M.glass, { outline: false }), -14.6, 4.9, -18.7);
    add(box(5, 0.9, 0.12, M.steelDark, { outline: false }), -14.6, 4.2, -15.6);
    // cool-white emergency ceiling light
    add(glowBox(2.6, 0.18, 0.7, M.glowCool), cx, 5.85, -15.2);
    addPoint(0xbfe0ff, 66, 30, cx, 5.3, -15, { amp: 0.1, speed: 2.4 });
    // back room door half open, red crack light
    add(box(1.6, 2.8, 0.12, M.steelDark), -23.0, 1.4, -18.6, 0.35);
    add(glowBox(0.12, 2.4, 0.05, M.glowRed), -22.1, 1.4, -18.3);
    addPoint(0xff3b26, 16, 10, -22.1, 1.6, -17.6, { amp: 0.3, speed: 5 });

    // five-tier heavy shelf with crates
    const shelf = group();
    for (const sx of [-1.35, 1.35]) for (const sz of [-0.5, 0.5]) P(shelf, box(0.12, 3.4, 0.12, M.steelDark), sx, 1.7, sz);
    for (let i = 1; i <= 5; i++) P(shelf, box(2.9, 0.1, 1.1, M.steel), 0, i * 0.64, 0);
    add(shelf, -16.2, 0, -17.4);
    add(crate(1.0), -16.9, 0.7, -17.4);
    add(crate(0.9), -15.6, 2.0, -17.4);
    add(cardboardBox(1.0, 0.8, 0.9), -16.3, 3.3, -17.4);
    // forklift
    const fl = group();
    P(fl, box(1.2, 0.8, 1.9, M.yellow), 0, 0.5, 0);
    P(fl, box(1.0, 1.0, 0.9, M.steelDark), 0, 1.35, -0.45);
    P(fl, box(1.25, 2.5, 0.14, M.steelDark), 0, 1.45, 1.0);
    P(fl, box(0.14, 0.09, 1.3, M.steel, { outline: false }), -0.42, 0.18, 1.6);
    P(fl, box(0.14, 0.09, 1.3, M.steel, { outline: false }), 0.42, 0.18, 1.6);
    add(fl, -23.5, 0, -10.2, 0.5);
    // crates + sandbag cover clusters
    add(crate(1.6), -25.0, 0.8, -8.4);
    add(crate(1.3), -25.0, 2.3, -8.4, 0.2);
    for (const [sx, sz] of [[-14.2, -8.6], [-13.6, -9.4], [-14.8, -9.4]]) add(sandbag(1.2), sx, 0.16, sz, 0.2);
    add(crate(1.4), -21.5, 0.7, -7.4);
    add(crate(1.2), -20.2, 0.6, -7.6);
    // abandoned sorting table, broken parcels, strewn straps/newspapers
    add(box(3.2, 0.15, 1.4, M.wood), -24.5, 1.0, -16.6);
    for (const sx of [-25.7, -23.3]) for (const sz of [-17.1, -16.1]) add(box(0.14, 1.0, 0.14, M.woodDark, { outline: false }), sx, 0.5, sz);
    add(cardboardBox(1.0, 0.7, 0.8), -24.8, 1.4, -16.6, 0.3);
    add(decal(T.fragile, 1.8, 0.9, { x: -23.4, y: 0.04, z: -14.2, rx: -Math.PI / 2, opacity: 0.5 }));
    // exterior: AC unit, freight sign, industrial bin, alley to the left
    add(box(1.4, 1.2, 0.8, M.steel), -11.0, 1.6, -18.6);
    add(cyl(0.45, 0.1, M.steelDark, { outline: false }), -11.0, 1.6, -18.18).rotation.x = Math.PI / 2;
    add(box(2.6, 1.6, 0.14, M.rust), -11.0, 3.6, -6.6);
    add(decal(T.freight, 2.3, 1.15, { x: -11.0, y: 3.6, z: -6.52, opacity: 0.85 }));
    add(box(1.1, 1.5, 1.1, M.green), -10.2, 0.75, -8.0);
    add(box(1.2, 0.12, 1.2, M.steelDark, { outline: false }), -10.2, 1.56, -8.0);
    // wall graffiti + bullet impacts + running water streaks
    add(decal(T.graffitiA, 4.5, 2.2, { x: -26.66, y: 3.2, z: -12.5, ry: Math.PI / 2, opacity: 0.75 }));
    add(decal(T.bullets, 2.6, 2.6, { x: -19.0, y: 3.2, z: -18.66, ry: Math.PI, opacity: 0.9 }));
    const wsTex = T.water.clone(); wsTex.needsUpdate = true;
    anim.water.push(wsTex);
    add(plane(3.0, 5.4, new THREE.MeshBasicMaterial({ map: wsTex, transparent: true, depthWrite: false, side: THREE.DoubleSide }), { shadow: false })
      .rotateY(Math.PI / 2), -26.65, 3.0, -12.5);
    anim.drips.push({ x: -27, y: 6.2, z: -9.2 });
    drainPipe(-27, 6.2, -9.2, 6.2);
    anim.vents.push({ x: -22, y: 6.5, z: -15.5 });
  }

  // =========================================================================
  // 3. MIDDLE LANE (central duel corridor)
  // =========================================================================
  function midLane() {
    // tall concrete walls on both sides with a high firing slit each
    for (const sx of [-5.2, 5.2]) {
      add(box(0.9, 5.2, 11, M.wall), sx, 2.6, -10.5);
      add(box(0.9, 5.2, 11, M.wall), sx, 2.6, 10.5);
      add(box(0.9, 3.4, 2.0, M.wall), sx, 1.7, 0);
      add(box(0.9, 0.9, 2.0, M.wall), sx, 4.75, 0);
      add(box(0.5, 1.4, 1.6, M.steelDark, { outline: false }), sx + (sx < 0 ? -0.02 : 0.02), 3.6, 0);
    }
    // heavy double iron door, half open (classic mid peek gap)
    add(box(2.4, 5.2, 0.35, M.rust), -3.3, 2.6, -0.6, 0.42);
    add(box(2.4, 5.2, 0.35, M.rust), 3.3, 2.6, 0.6, -0.42);
    add(box(0.5, 5.6, 0.6, M.steelDark), -4.55, 2.8, 0);
    add(box(0.5, 5.6, 0.6, M.steelDark), 4.55, 2.8, 0);
    // rectangular drainage ditch + rusty grate across the lane
    add(box(9.4, 0.12, 1.7, M.steelDark, { outline: false }), 0, 0.02, 3.0);
    const grateMat = new THREE.MeshBasicMaterial({ map: T.grate, transparent: true, side: THREE.DoubleSide });
    add(plane(9.4, 1.6, grateMat, { shadow: false }).rotateX(-Math.PI / 2), 0, 0.09, 3.0);
    for (let i = 0; i < 3; i++) add(box(9.4, 0.16, 0.08, M.rust, { outline: false }), 0, 0.1, 2.3 + i * 0.7);
    // low cover wall near the CT side + crates + discarded road sign
    add(box(6.5, 1.5, 0.7, M.concreteDark), 0, 0.75, 12.0);
    add(crate(1.4), -2.2, 0.7, 11.0);
    add(crate(1.3), -0.7, 0.65, 11.2);
    add(box(0.12, 3.2, 0.12, M.steelDark, { outline: false }), 2.6, 1.6, 11.4);
    add(box(1.6, 1.0, 0.1, M.blue, { outline: false }), 2.6, 2.9, 11.4);
    add(decal(T.noEntry, 1.5, 0.75, { x: 2.6, y: 2.9, z: 11.46, opacity: 0.85 }));
    // two sentry boxes (interiors: console + seat + rain-streaked glass)
    for (const sx of [-7.0, 7.0]) {
      const sb = group();
      P(sb, box(2.4, 2.6, 2.4, M.wallDark), 0, 1.3, 0);
      P(sb, box(2.0, 1.0, 0.06, M.glass, { outline: false }), 0, 1.6, 1.23);
      P(sb, box(2.6, 0.2, 2.6, M.rust, { outline: false }), 0, 2.7, 0);
      P(sb, box(1.2, 0.5, 0.6, M.steel, { outline: false }), 0, 0.9, 0.6);
      P(sb, box(0.6, 0.9, 0.6, M.steelDark, { outline: false }), 0, 0.45, -0.6);
      add(sb, sx, 0, -6.0);
      anim.vents.push({ x: sx, y: 2.9, z: -6.0 });
    }
    // low sewer channel: two grated entrances + dark connecting strip
    for (const zz of [-14.5, 15.0]) {
      add(box(2.6, 0.12, 2.0, M.steelDark, { outline: false }), 0, 0.02, zz);
      add(plane(2.4, 1.8, grateMat.clone(), { shadow: false }).rotateX(-Math.PI / 2), 0, 0.09, zz);
      add(box(2.8, 0.5, 0.12, M.concreteDark, { outline: false }), 0, 0.25, zz - 1.05);
    }
    add(box(2.4, 0.06, 28, M.steelDark, { outline: false, shadow: false }), 0, 0.03, 0);
    anim.ripples.push({ x: 0, z: 3.0 });
  }

  // =========================================================================
  // 4. B SITE — two-storey tin guard shack (north-east)
  // =========================================================================
  function bSite() {
    const cx = 19, zBack = -19, zFront = -10;
    add(contact(14, 11, cx, -14.5, 0.7));
    // ground floor walls with a door gap in the front
    add(box(12, 3.4, 0.5, M.rust), cx, 1.7, zBack);
    add(box(0.5, 3.4, 9, M.rust), 13, 1.7, -14.5);
    add(box(0.5, 3.4, 9, M.rust), 25, 1.7, -14.5);
    add(box(4.0, 3.4, 0.5, M.rust), 15.0, 1.7, zFront);
    add(box(4.0, 3.4, 0.5, M.rust), 23.0, 1.7, zFront);
    add(box(4.5, 0.7, 0.5, M.rust), cx, 3.05, zFront);
    // glass window + front/back doors
    add(box(2.4, 1.5, 0.06, M.glass, { outline: false }), 15.2, 1.9, zFront - 0.28);
    add(box(1.8, 2.7, 0.12, M.steel), cx, 1.35, zFront - 0.3, 0.28);
    add(box(1.8, 2.7, 0.12, M.steel), cx, 1.35, zBack + 0.3, -0.2);
    // second storey (set back) + south balcony with railing
    add(box(12, 2.6, 6, M.rust), cx, 4.7, -16.5);
    add(box(12, 0.25, 3.6, M.steel), cx, 3.55, -11.8);
    for (const xx of [13.2, 16, 19, 22, 24.8]) add(box(0.1, 1.1, 0.1, M.steelDark, { outline: false }), xx, 4.1, -10.05);
    add(box(12, 0.1, 0.1, M.steelDark, { outline: false }), cx, 4.65, -10.05);
    // external fire escape on the east side
    add(box(0.14, 3.4, 0.14, M.steelDark, { outline: false }), 25.4, 1.7, -10.2);
    const st = group();
    for (let i = 0; i < 9; i++) P(st, box(1.5, 0.16, 0.6, M.steelDark, { outline: false }), 0, 0.4 * (i + 1), -0.5 * i);
    st.rotation.y = Math.PI / 2;
    add(st, 26.1, 0, -9.6);
    add(box(0.1, 1.0, 5.0, M.steelDark, { outline: false }), 26.7, 4.0, -12.0);
    // warm broken fluorescent inside + desk / chair / locker / duty roster
    add(glowBox(2.4, 0.16, 0.5, M.glowWarm), cx, 3.15, -14.0);
    addPoint(0xffc27a, 58, 24, cx, 2.9, -14, { amp: 0.16, speed: 3.2 });
    add(box(2.6, 0.14, 1.2, M.wood), cx, 1.0, -16.4);
    for (const xx of [17.9, 20.1]) for (const zz of [-17.0, -15.8]) add(box(0.12, 1.0, 0.12, M.woodDark, { outline: false }), xx, 0.5, zz);
    add(box(0.45, 0.3, 0.3, M.steel, { outline: false }), cx - 0.7, 1.2, -16.4);
    add(cyl(0.12, 0.22, M.steelDark, { outline: false }), cx + 0.5, 1.18, -16.2);
    const chair = group();
    P(chair, box(0.7, 0.12, 0.7, M.steelDark), 0, 0.5, 0);
    P(chair, box(0.7, 0.8, 0.1, M.steelDark), 0, 0.9, -0.3);
    chair.rotation.z = 0.9;
    add(chair, 21.5, 0, -15.0);
    add(box(0.9, 2.2, 0.7, M.steel), 13.7, 1.1, -17.6);
    add(decal(T.duty, 1.5, 1.9, { x: 13.72, y: 1.9, z: -14.5, ry: Math.PI / 2, opacity: 0.85 }));
    add(decal(T.graffitiC, 4.0, 2.0, { x: 19, y: 2.0, z: -19.26, ry: Math.PI, opacity: 0.7 }));
    add(decal(T.bullets, 2.4, 2.4, { x: 16, y: 2.0, z: -9.74, opacity: 0.9 }));
    anim.vents.push({ x: 22, y: 6.1, z: -16.0 });
    anim.drips.push({ x: 13, y: 3.4, z: -10 });
    drainPipe(13.1, 3.4, -10.0, 3.4);

    // irregular cover around the B mark
    add(pallet(), 15.0, 0, -6.2, 0.4);
    add(crate(1.3), 15.0, 0.85, -6.2, 0.4);
    add(box(1.1, 1.5, 1.1, M.green), 23.6, 0.75, -6.0);
    add(box(1.2, 0.12, 1.2, M.steelDark, { outline: false }), 23.6, 1.56, -6.0);
    // abandoned bicycle
    const bike = group();
    for (const wx of [-0.8, 0.8]) P(bike, torus(0.5, 0.06, M.steelDark, { outline: false }), wx, 0.5, 0);
    P(bike, rod([-0.8, 0.5, 0], [0.1, 1.0, 0], 0.045, M.rust), 0, 0, 0);
    P(bike, rod([0.1, 1.0, 0], [0.8, 0.5, 0], 0.045, M.rust), 0, 0, 0);
    P(bike, rod([-0.8, 0.5, 0], [0.1, 1.0, 0], 0.045, M.rust), 0, 0, 0);
    P(bike, box(0.5, 0.08, 0.2, M.steelDark, { outline: false }), 0.05, 1.05, 0);
    bike.rotation.y = 0.5; bike.rotation.z = 0.18;
    add(bike, 21.0, 0, -5.0);
    // overturned iron table + chairs
    const table = group();
    P(table, cyl(0.75, 0.08, M.steel, { outline: false }), 0, 0.4, 0);
    P(table, cyl(0.09, 0.8, M.steelDark, { outline: false }), 0, 0.0, 0);
    table.rotation.z = 1.2;
    add(table, 17.0, 0.4, -4.6);
    for (const [px, pz, rr] of [[16.0, -3.4, 0.6], [18.2, -3.2, -0.4]]) {
      const ch = group();
      P(ch, box(0.6, 0.08, 0.6, M.steelDark), 0, 0.4, 0);
      P(ch, box(0.6, 0.7, 0.08, M.steelDark), 0, 0.7, -0.26);
      ch.rotation.z = rr;
      add(ch, px, 0, pz);
    }
    // warm street lamp at the corner with a soft halo
    const lamp = group();
    P(lamp, cyl(0.12, 6.2, M.steelDark), 0, 3.1, 0);
    P(lamp, box(1.4, 0.12, 0.12, M.steelDark, { outline: false }), 0.7, 6.0, 0);
    P(lamp, glowBox(0.7, 0.25, 0.5, M.glowWarm), 1.35, 5.85, 0);
    P(lamp, sphere(0.42, M.glowWarm, { outline: false, shadow: false }), 1.35, 5.7, 0);
    add(lamp, 26.6, 0, -4.0);
    addPoint(0xffb85e, 92, 28, 27.9, 5.6, -4.0, { amp: 0.18, speed: 1.8 });
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: T.steam, color: 0xffc884, transparent: true, opacity: 0.22, depthWrite: false }));
    halo.scale.set(7, 7, 1); halo.position.set(27.9, 5.6, -4.0);
    root.add(halo);
    add(contact(2, 2, 26.6, -4.0));
    // corner low wall -> shortcut toward CT spawn
    add(box(0.8, 1.4, 6.0, M.concreteDark), 26.2, 0.7, 1.0);
    add(box(3.0, 1.4, 0.8, M.concreteDark), 25.0, 0.7, 4.0);
  }

  // =========================================================================
  // 5. CT SPAWN (south)
  // =========================================================================
  function ctSpawn() {
    // defensive array of barricades + police shields
    for (const [x, z, ry] of [[-6, 19.5, 0], [-2.5, 20.2, 0.1], [1.0, 20.0, -0.1], [4.5, 19.6, 0]]) add(barrier(M.caution), x, 0.45, z, ry);
    for (const [x, z] of [[-8.5, 18.6], [-5.2, 18.2], [6.0, 18.4]]) {
      const sh = group();
      P(sh, box(0.85, 1.5, 0.12, M.blue), 0, 0.75, 0);
      P(sh, box(0.4, 0.5, 0.14, M.white, { outline: false }), 0, 0.9, 0.08);
      add(sh, x, 0, z, (x - 0) * 0.03);
    }
    // police van on the left with alternating red/blue lightbar
    const van = group();
    P(van, box(2.5, 2.4, 4.6, M.steel), 0, 1.7, -0.4);
    P(van, box(2.4, 1.7, 1.8, M.steel), 0, 1.35, 2.5);
    P(van, box(2.0, 0.85, 0.06, M.glass, { outline: false }), 0, 1.7, 3.41);
    P(van, box(2.6, 0.16, 4.7, M.steelDark, { outline: false }), 0, 0.55, -0.4);
    for (const wx of [-1.2, 1.2]) for (const wz of [-1.8, 1.8]) {
      const w = cyl(0.48, 0.24, M.rubber, { outline: false, shadow: false });
      w.rotation.z = Math.PI / 2; P(van, w, wx, 0.48, wz);
    }
    add(van, -9.5, 0, 23.5, 0.1);
    add(contact(4, 7, -9.5, 23.5));
    const redMat = M.glowRed.clone(), blueMat = M.glowBlue.clone();
    const bar = group();
    P(bar, box(1.7, 0.16, 0.42, M.steelDark, { outline: false }), 0, 0, 0);
    P(bar, glowBox(0.7, 0.2, 0.44, redMat), -0.42, 0.02, 0);
    P(bar, glowBox(0.7, 0.2, 0.44, blueMat), 0.42, 0.02, 0);
    add(bar, -9.5, 3.0, 22.6, 0.1);
    anim.police.red = addPoint(0xff3322, 30, 18, -10.0, 3.2, 22.6);
    anim.police.blue = addPoint(0x3377ff, 30, 18, -9.0, 3.2, 22.6);
    anim.police.redMat = redMat; anim.police.blueMat = blueMat;

    // concrete high platform with exterior stairs + searchlight
    add(box(9, 3.0, 7, M.concrete), 10.5, 1.5, 23.5);
    add(contact(10, 8, 10.5, 23.5));
    const st = group();
    for (let i = 0; i < 8; i++) P(st, box(2.4, 0.36, 0.7, M.concrete, { outline: false }), 0, 0.18 + i * 0.36, i * 0.7);
    add(st, 10.5, 0, 27.2, Math.PI);
    for (const xx of [6.2, 10.5, 14.8]) add(box(0.12, 1.0, 0.12, M.steelDark, { outline: false }), xx, 3.5, 20.1);
    add(box(9, 0.1, 0.1, M.steelDark, { outline: false }), 10.5, 4.0, 20.1);
    // searchlight housing (slight sway) + spotlight
    const housing = group();
    P(housing, box(1.0, 0.8, 1.2, M.steel), 0, 3.5, 0);
    P(housing, cyl(0.45, 0.3, M.glowCool, { outline: false }), 0, 3.5, -0.7).rotation.x = Math.PI / 2;
    add(housing, 10.5, 0, 23.0);
    anim.search.housing = housing;
    const spot = new THREE.SpotLight(0xd6e9ff, 110, 70, 0.55, 0.5, 2);
    spot.position.set(10.5, 3.6, 22.6);
    spot.target.position.set(0, 1.0, -2);
    root.add(spot); root.add(spot.target);
    anim.flicker.push({ light: spot, base: 110, amp: 0.12, speed: 1.4, phase: 0.7 });

    // enclosed back wall with police emblem + warning slogan, gear crates
    add(box(26, 4.2, 0.8, M.wall), 0, 2.1, 27.4);
    add(decal(T.police, 4.2, 4.2, { x: 0, y: 2.3, z: 26.98, ry: Math.PI, opacity: 0.9 }));
    add(decal(T.noEntry, 4.0, 2.0, { x: -8.0, y: 2.3, z: 26.98, ry: Math.PI, opacity: 0.8 }));
    add(decal(T.danger, 4.0, 2.0, { x: 8.0, y: 2.3, z: 26.98, ry: Math.PI, opacity: 0.8 }));
    for (const [x, z] of [[-4.5, 25.6], [-2.6, 25.8], [3.2, 25.6], [5.0, 25.8]]) {
      add(crate(1.1, M.green), x, 0.55, z);
      add(box(0.9, 0.16, 0.9, M.white, { outline: false }), x, 1.16, z);
    }
    add(box(1.0, 0.9, 1.0, M.steel, { outline: false }), 16.5, 0.45, 25.5);
    anim.vents.push({ x: 16.5, y: 1.0, z: 25.5 });
    anim.drips.push({ x: -12, y: 4.2, z: 27.4 });
  }

  // =========================================================================
  // 6. ROUTES — left flanking alley, right elevated flank, scattered cover
  // =========================================================================
  function routes() {
    // left alley (west edge, CT side -> A site)
    add(box(0.7, 4.0, 22, M.wallDark), -21.5, 2.0, 8.0);
    add(box(0.7, 4.0, 9, M.wallDark), -27.0, 2.0, 14.0);
    add(box(0.7, 4.0, 9, M.wallDark), -27.0, 2.0, -2.0);
    add(box(1.4, 0.12, 22, M.steelDark, { outline: false }), -24.5, 0.02, 8.0);
    for (const [x, z] of [[-24.0, 2.0], [-23.2, 10.0], [-25.0, 16.0]]) add(barrel(M.rust), x, 0.75, z);
    add(crate(1.4), -24.0, 0.7, 6.0);
    add(tire({ flat: true }), -23.0, 0.25, 12.0);
    add(decal(T.graffitiB, 4.0, 2.0, { x: -21.14, y: 2.2, z: 8.0, ry: Math.PI / 2, opacity: 0.7 }));
    anim.drips.push({ x: -21.5, y: 4.0, z: 2.0 });
    drainPipe(-21.5, 4.0, 2.0, 4.0);

    // right elevated flank (east edge, raised walkway + stairs to B site)
    add(box(6.0, 2.4, 22, M.concrete), 24.0, 1.2, 9.0);
    add(contact(7, 23, 24.0, 9.0));
    const st2 = group();
    for (let i = 0; i < 8; i++) P(st2, box(2.6, 0.28, 0.7, M.concrete, { outline: false }), 0, 0.14 + i * 0.28, -i * 0.7);
    add(st2, 24.0, 0, 21.0);
    for (const xx of [21.2, 24.0, 26.8]) add(box(0.1, 1.0, 0.1, M.steelDark, { outline: false }), xx, 2.9, 20.0);
    add(box(6.0, 0.1, 0.1, M.steelDark, { outline: false }), 24.0, 3.4, 20.0);
    add(box(0.1, 1.0, 22, M.steelDark, { outline: false }), 27.0, 2.9, 9.0);
    for (const [x, z] of [[22.5, 4.0], [25.5, 12.0], [23.0, 16.0]]) add(crate(1.2), x, 2.4 + 0.6, z);
    add(barrel(M.blue), 26.0, 2.4 + 0.75, 6.0);
    add(barrier(M.concreteDark), 22.0, 2.4 + 0.45, -1.5, 0.2);
    anim.drips.push({ x: 21.0, y: 2.4, z: 14.0 });

    // assorted tactical cover scattered through open ground
    const scatter = [
      [-12, -2, 'crate'], [-9.5, -1, 'barrel'], [12, -2, 'crate'], [9, 2, 'tire'],
      [-10, 6, 'card'], [11, 6, 'crate'], [-14, 9, 'barrel'], [14, 10, 'tire'],
      [-18, 4, 'cone'], [18, 4, 'card'], [-6, -8, 'tire'], [6, -6, 'cone'],
      [-3, 9, 'crate'], [3, -10, 'card'], [20, -2, 'barrel'], [-20, -2, 'tire'],
      [2, 16, 'cone'], [-2, -16, 'card'],
    ];
    for (const [x, z, kind] of scatter) {
      let o;
      if (kind === 'crate') o = crate(1.3);
      else if (kind === 'barrel') o = barrel(M.blue);
      else if (kind === 'tire') o = tire({ flat: true });
      else if (kind === 'card') o = cardboardBox(1.2, 1.0, 1.1);
      else o = trafficCone();
      const y = kind === 'barrel' ? 0.75 : kind === 'tire' ? 0.22 : kind === 'card' ? 0.5 : kind === 'cone' ? 0.42 : 0.65;
      add(o, x, y, z, Math.random() * 1.5);
    }
    add(barrier(M.caution), -8, 0.45, 12.5, 0.4);
    add(barrier(M.concreteDark), 9, 0.45, 14.0, -0.3);
    add(pallet(), -13, 0, 3.0, 0.5);
    add(pallet(), 16, 0, -2.0, 0.2);
  }

  // =========================================================================
  // 7. GLOBAL ENVIRONMENT — utility poles, wires, drains, graffiti, vents
  // =========================================================================
  function environment() {
    const poles = [
      [-25, -25], [25, -25], [-25, 25], [25, 25], [-25, 2], [25, 2], [0, -26], [0, 26],
    ];
    for (const [x, z] of poles) {
      const p = group();
      P(p, cyl(0.16, 9.5, M.woodDark), 0, 4.75, 0);
      P(p, box(2.2, 0.16, 0.16, M.woodDark, { outline: false }), 0, 8.6, 0);
      P(p, box(1.5, 0.14, 0.14, M.woodDark, { outline: false }), 0, 7.6, 0);
      for (const xx of [-0.9, 0.9]) P(p, cyl(0.08, 0.3, M.steel, { outline: false }), xx, 8.85, 0);
      add(p, x, 0, z);
      anim.drips.push({ x, y: 8.6, z });
    }
    const links = [
      [[-25, -25], [25, -25]], [[-25, 25], [25, 25]],
      [[-25, -25], [-25, 2]], [[-25, 2], [-25, 25]],
      [[25, -25], [25, 2]], [[25, 2], [25, 25]],
      [[0, -26], [-25, -25]], [[0, -26], [25, -25]],
      [[0, 26], [-25, 25]], [[0, 26], [25, 25]],
      [[-25, 2], [25, 2]],
    ];
    for (const [a, b] of links) {
      raw(wire([a[0], 9.0, a[1]], [b[0], 9.0, b[1]], 1.6, 0.022, M.steelDark));
      raw(wire([a[0], 7.7, a[1]], [b[0], 7.7, b[1]], 1.2, 0.018, M.steelDark));
    }
    // extra wall-corner gutters and drips
    for (const [x, y, z] of [[-12, 6.2, -6], [13, 6.1, -19], [25, 6.0, -10], [5.2, 5.2, 10]]) {
      anim.drips.push({ x, y, z });
    }
    // faction spray + stencils on scattered surfaces
    add(decal(T.graffitiA, 3.2, 1.6, { x: -5.2, y: 2.6, z: 6.0, ry: Math.PI / 2, opacity: 0.7 }));
    add(decal(T.graffitiC, 3.2, 1.6, { x: 5.2, y: 2.6, z: -6.0, ry: -Math.PI / 2, opacity: 0.7 }));
    add(decal(T.fragile, 2.4, 1.2, { x: 0, y: 0.9, z: 12.36, opacity: 0.7 }));
    // steam vents on rooftops
    anim.vents.push({ x: -19, y: 6.6, z: -15.5 });
    anim.vents.push({ x: 19, y: 6.2, z: -16.5 });
    anim.vents.push({ x: 10.5, y: 3.2, z: 23.5 });
  }

  tSpawn();
  aSite();
  midLane();
  bSite();
  ctSpawn();
  routes();
  environment();

  return { root, anim };
}
