import * as THREE from "three";
import { HOLES } from "../sim/constants.js";
import { deckTexture, detailTexture, flagTexture, softTexture, textTexture } from "./textures.js";

const waterShader = {
  uniforms: {
    uTime: { value: 0 },
    uSun: { value: new THREE.Vector3(-0.35, 0.72, -0.45).normalize() },
    uAmp: { value: 1 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uAmp;
    varying vec3 vWorld;
    varying vec3 vPos;
    void main() {
      vec3 p = position;
      float a = uAmp;
      p.y += sin(p.x * 0.18 + uTime * 0.85) * 0.16 * a;
      p.y += sin(p.z * 0.13 - uTime * 0.55) * 0.22 * a;
      p.y += sin((p.x + p.z) * 0.07 + uTime * 0.35) * 0.12 * a;
      vec4 world = modelMatrix * vec4(p, 1.0);
      vWorld = world.xyz;
      vPos = p;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  fragmentShader: `
    uniform vec3 uSun;
    varying vec3 vWorld;
    varying vec3 vPos;
    void main() {
      float nx = cos(vPos.x * 0.18) * 0.28 + cos((vPos.x + vPos.z) * 0.07) * 0.12;
      float nz = cos(vPos.z * 0.13) * 0.32 + cos((vPos.x + vPos.z) * 0.07) * 0.12;
      vec3 n = normalize(vec3(-nx, 1.0, -nz));
      vec3 view = normalize(cameraPosition - vWorld);
      float fres = pow(1.0 - max(dot(n, view), 0.0), 3.2);
      vec3 ref = reflect(-uSun, n);
      float spec = pow(max(dot(ref, view), 0.0), 96.0);
      vec3 deep = vec3(0.03, 0.13, 0.18);
      vec3 mid = vec3(0.09, 0.32, 0.36);
      vec3 col = mix(deep, mid, 0.35 + fres * 0.4);
      col += vec3(0.95, 0.9, 0.78) * spec * 0.7;
      col = mix(col, vec3(0.62, 0.7, 0.74), fres * 0.28);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

const skyShader = {
  uniforms: {
    uSun: { value: new THREE.Vector3(-0.35, 0.72, -0.45).normalize() },
  },
  vertexShader: `
    varying vec3 vDir;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vDir = position;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uSun;
    varying vec3 vDir;
    void main() {
      vec3 dir = normalize(vDir);
      float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
      vec3 zenith = vec3(0.33, 0.55, 0.72);
      vec3 horizon = vec3(0.78, 0.72, 0.62);
      vec3 nadir = vec3(0.45, 0.52, 0.54);
      vec3 col = mix(horizon, zenith, smoothstep(0.08, 0.75, dir.y));
      col = mix(nadir, col, smoothstep(-0.2, 0.05, dir.y));
      float sun = pow(max(dot(dir, uSun), 0.0), 280.0);
      float glow = pow(max(dot(dir, uSun), 0.0), 8.0);
      col += vec3(1.0, 0.92, 0.75) * sun * 1.4;
      col += vec3(0.95, 0.72, 0.42) * glow * 0.28;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

const flagShader = {
  uniforms: { uTime: { value: 0 }, uMap: { value: null } },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 p = position;
      p.z += sin(p.x * 5.5 + uTime * 3.2) * 0.08 * uv.x;
      p.y += sin(p.x * 3.0 + uTime * 2.4) * 0.03 * uv.x;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uMap;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(uMap, vUv);
    }
  `,
};

function mergeGeometries(geos) {
  let vcount = 0;
  let icount = 0;
  for (const geo of geos) {
    vcount += geo.attributes.position.count;
    icount += geo.index.count;
  }
  const position = new Float32Array(vcount * 3);
  const normal = new Float32Array(vcount * 3);
  const uv = new Float32Array(vcount * 2);
  const color = new Float32Array(vcount * 3);
  const index = new Uint32Array(icount);
  let vertex = 0;
  let cursor = 0;
  for (const geo of geos) {
    const base = vertex;
    position.set(geo.attributes.position.array, vertex * 3);
    normal.set(geo.attributes.normal.array, vertex * 3);
    uv.set(geo.attributes.uv.array, vertex * 2);
    color.set(geo.attributes.color.array, vertex * 3);
    const src = geo.index.array;
    for (let i = 0; i < src.length; i += 1) index[cursor++] = src[i] + base;
    vertex += geo.attributes.position.count;
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute("position", new THREE.BufferAttribute(position, 3));
  merged.setAttribute("normal", new THREE.BufferAttribute(normal, 3));
  merged.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  merged.setAttribute("color", new THREE.BufferAttribute(color, 3));
  merged.setIndex(new THREE.BufferAttribute(index, 1));
  return merged;
}

function coloredBox(solid) {
  const geo = new THREE.BoxGeometry(solid.sx, solid.sy, solid.sz);
  const tint = new THREE.Color(solid.color);
  const count = geo.attributes.position.count;
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    colors[i * 3] = tint.r;
    colors[i * 3 + 1] = tint.g;
    colors[i * 3 + 2] = tint.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.applyMatrix4(new THREE.Matrix4().makeRotationY(solid.yaw || 0));
  geo.translate(solid.x, solid.y, solid.z);
  return geo;
}

function bucket(tag) {
  if (tag === "container") return "container";
  if (tag === "wood") return "wood";
  if (tag === "iron" || tag === "rail") return "metal";
  return "paint";
}

function buildHull() {
  const z0 = -43;
  const z1 = 38;
  const nz = 56;
  const samples = 18;
  const stride = samples + 1;
  const positions = [];
  const normals = [];
  const colors = [];
  const indices = [];
  const beamAt = (z) => {
    let beam = 9.55;
    if (z < -30.2) beam *= Math.cos(Math.min(1, (-30.2 - z) / 12.6) * Math.PI * 0.5);
    else if (z > 30.6) beam *= 1 - Math.min(1, (z - 30.6) / 7.2) * 0.38;
    return Math.max(beam, 0.15);
  };
  const keelAt = (z) => {
    if (z < -30) return -1.35 - (1 - Math.min(1, (-30 - z) / 12)) * 2.3;
    if (z > 33) return -2.4;
    return -3.85;
  };
  const sheerAt = (z) => {
    if (z < -30) return ((-30 - z) / 12) * 2.8;
    if (z > 32) return (z - 32) * 0.22;
    return 0;
  };
  for (let i = 0; i <= nz; i += 1) {
    const z = z0 + ((z1 - z0) * i) / nz;
    const beam = beamAt(z);
    const keel = keelAt(z);
    const sheer = sheerAt(z);
    const flare = z < -30 ? 0.85 : 0.15;
    for (let k = 0; k <= samples; k += 1) {
      const a = Math.PI * (1 - k / samples);
      const x = Math.cos(a) * beam;
      const y = Math.sin(a) * keel + sheer;
      positions.push(x, y, z);
      const outward = new THREE.Vector3(Math.cos(a), -Math.sin(a), flare * (z < -31 ? -1 : z > 33 ? 0.4 : 0));
      outward.normalize();
      normals.push(outward.x, outward.y, outward.z);
      let r = 0.52;
      let g = 0.56;
      let b = 0.58;
      if (y < -1.5) {
        r = 0.1;
        g = 0.26;
        b = 0.24;
      } else if (y < -0.35) {
        r = 0.48;
        g = 0.16;
        b = 0.13;
      }
      const grit = 0.92 + ((i * 17 + k * 13) % 9) * 0.012;
      colors.push(r * grit, g * grit, b * grit);
    }
  }
  for (let i = 0; i < nz; i += 1) {
    for (let k = 0; k < samples; k += 1) {
      const a = i * stride + k;
      const b = a + stride;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  return geo;
}

function buildDeck() {
  const shape = new THREE.Shape();
  const halfX = 8.15;
  const halfZ = 30.42;
  shape.moveTo(-halfX, -halfZ);
  shape.lineTo(halfX, -halfZ);
  shape.lineTo(halfX, halfZ);
  shape.lineTo(-halfX, halfZ);
  shape.closePath();
  for (const hole of HOLES) {
    const path = new THREE.Path();
    const hx = hole.sx * 0.5;
    const hz = hole.sz * 0.5;
    path.moveTo(hole.x - hx, hole.z - hz);
    path.lineTo(hole.x + hx, hole.z - hz);
    path.lineTo(hole.x + hx, hole.z + hz);
    path.lineTo(hole.x - hx, hole.z + hz);
    path.closePath();
    shape.holes.push(path);
  }
  const geo = new THREE.ShapeGeometry(shape);
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i += 1) {
    uv[i * 2] = (pos.getX(i) + 9) / 18;
    uv[i * 2 + 1] = (pos.getY(i) + 32) / 64;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geo.computeVertexNormals();
  return geo;
}

function standard(map, extra = {}) {
  return new THREE.MeshStandardMaterial({
    map,
    vertexColors: true,
    roughness: 0.78,
    metalness: 0.08,
    ...extra,
  });
}

function addWindow(parent, x, y, z, sx, sy, sz) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    new THREE.MeshStandardMaterial({
      color: 0x163844,
      emissive: 0x8ec7d8,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.4,
      transparent: true,
      opacity: 0.82,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  mesh.position.set(x, y, z);
  parent.add(mesh);
}

function dress(scene, reduce) {
  const steel = new THREE.MeshStandardMaterial({ color: 0x8d9494, roughness: 0.46, metalness: 0.72 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2c3336, roughness: 0.62, metalness: 0.4 });
  const rust = new THREE.MeshStandardMaterial({ color: 0x7a4630, roughness: 0.84, metalness: 0.2 });
  const group = new THREE.Group();

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 8.2, 8), steel);
  mast.position.set(0.2, 7.6, -26.2);
  mast.castShadow = true;
  group.add(mast);
  const yard = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 0.08), steel);
  yard.position.set(0.2, 10.6, -26.2);
  group.add(yard);
  const radar = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.08, 16), dark);
  radar.position.set(1.15, 9.1, -25.4);
  radar.rotation.x = 0.4;
  group.add(radar);

  const bowFlagMap = flagTexture("#d7a441", "#2b2418");
  const sternFlagMap = flagTexture("#6e2c2c", "#e6d7c4");
  const bowFlag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.86),
    new THREE.ShaderMaterial({
      uniforms: { uTime: flagShader.uniforms.uTime, uMap: { value: bowFlagMap } },
      vertexShader: flagShader.vertexShader,
      fragmentShader: flagShader.fragmentShader,
      side: THREE.DoubleSide,
    }),
  );
  bowFlag.position.set(1.55, 10.45, -26.2);
  group.add(bowFlag);
  const sternFlag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 0.78),
    new THREE.ShaderMaterial({
      uniforms: { uTime: flagShader.uniforms.uTime, uMap: { value: sternFlagMap } },
      vertexShader: flagShader.vertexShader,
      fragmentShader: flagShader.fragmentShader,
      side: THREE.DoubleSide,
    }),
  );
  sternFlag.position.set(-1.4, 6.4, 27.4);
  group.add(sternFlag);

  const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 2.4, 10), rust);
  funnel.position.set(2.3, 5.1, -26.4);
  funnel.castShadow = true;
  group.add(funnel);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.18, 10), dark);
  band.position.set(2.3, 4.4, -26.4);
  group.add(band);

  const crane = new THREE.Group();
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.2, 0.35), steel);
  post.position.set(0, 1.1, 0);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 1.1), dark);
  cab.position.set(0, 2.3, 0);
  const boom = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 7.5), steel);
  boom.position.set(0.1, 3.15, 3.3);
  boom.rotation.x = 0.22;
  crane.add(post, cab, boom);
  crane.position.set(-1.4, 3.5, -24.6);
  crane.traverse((obj) => {
    obj.castShadow = true;
  });
  group.add(crane);

  const sternMast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 3.2, 8), steel);
  sternMast.position.set(-0.4, 5.1, 27.2);
  group.add(sternMast);

  for (const side of [-1, 1]) {
    const boat = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 1.6, 4, 8), rust);
    boat.rotation.z = Math.PI / 2;
    boat.position.set(side * 9.35, 1.55, side * 6.5);
    boat.castShadow = true;
    group.add(boat);
    const davit = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), steel);
    davit.position.set(side * 8.7, 2.15, side * 6.5);
    group.add(davit);
  }

  const anchor = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.08, 8, 16), dark);
  anchor.position.set(0, 1.7, -36.5);
  anchor.rotation.y = Math.PI / 2;
  group.add(anchor);

  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 0.9),
    new THREE.MeshBasicMaterial({ map: textTexture(["北湾七号"], { font: "72px serif", color: "#f3ead7" }), transparent: true }),
  );
  plate.position.set(-7.2, 1.15, -33.5);
  plate.rotation.y = Math.PI / 2;
  group.add(plate);
  const plateStern = plate.clone();
  plateStern.position.set(7.4, 0.9, 33.2);
  plateStern.rotation.y = -Math.PI / 2;
  group.add(plateStern);

  const puffMap = softTexture("rgba(210,214,216,0.45)", "rgba(210,214,216,0)");
  const puffs = [];
  for (let i = 0; i < 4; i += 1) {
    const puff = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffMap, transparent: true, depthWrite: false, opacity: 0.35 }));
    puff.position.set(2.3, 6.4 + i * 0.7, -26.4);
    puff.scale.setScalar(1.2 + i * 0.45);
    group.add(puff);
    puffs.push(puff);
  }

  const birds = [];
  const birdMat = new THREE.MeshBasicMaterial({ color: 0x1c2428, side: THREE.DoubleSide });
  for (let i = 0; i < 6; i += 1) {
    const bird = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.18), birdMat);
    bird.position.set(-8 + i * 3.2, 8 + (i % 3), -10 + i * 4);
    group.add(bird);
    birds.push(bird);
  }

  addWindow(group, -3.05, 1.85, -20.96, 1.15, 0.62, 0.06);
  addWindow(group, 3.05, 1.85, -20.96, 1.15, 0.62, 0.06);
  addWindow(group, -3.05, 1.85, 20.96, 1.15, 0.62, 0.06);
  addWindow(group, 3.05, 1.85, 20.96, 1.15, 0.62, 0.06);
  addWindow(group, -4.96, 1.7, -25.4, 0.06, 0.5, 0.9);
  addWindow(group, 4.96, 1.7, 24.2, 0.06, 0.5, 0.8);
  addWindow(group, 6.7, 1.75, 25.3, 0.06, 0.55, 1.1);

  scene.add(group);
  return { radar, puffs, birds, reduceMotion: reduce };
}

export function createWorld(canvas, solids, options = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  if (!renderer.getContext()) throw new Error("webgl");
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xc5d0d2, 0.0085);
  const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.08, 420);
  camera.rotation.order = "YXZ";
  camera.layers.enable(0);

  const sunDir = new THREE.Vector3(-0.42, 0.78, -0.46).normalize();
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(280, 32, 20),
    new THREE.ShaderMaterial({
      uniforms: { uSun: { value: sunDir } },
      vertexShader: skyShader.vertexShader,
      fragmentShader: skyShader.fragmentShader,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  );
  scene.add(sky);

  const hemi = new THREE.HemisphereLight(0xc5d4de, 0x3d463c, 0.42);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1dc, 3.15);
  sun.position.copy(sunDir).multiplyScalar(40);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -28;
  sun.shadow.camera.right = 28;
  sun.shadow.camera.top = 42;
  sun.shadow.camera.bottom = -42;
  sun.shadow.camera.near = 4;
  sun.shadow.camera.far = 90;
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.035;
  sun.layers.enable(1);
  sun.shadow.camera.layers.enable(1);
  scene.add(sun, sun.target);

  const lamps = [
    [0, 2.45, -25.6, 0xffb27a, 16, 11],
    [0, 2.45, 25.6, 0xffb27a, 16, 11],
    [5.7, 2.3, 25.3, 0xf0c39a, 8, 6],
    [5.15, -1.15, -8, 0xffc48a, 7, 8],
    [5.15, -1.15, 7, 0xffc48a, 7, 8],
  ];
  for (const [x, y, z, color, intensity, distance] of lamps) {
    const lamp = new THREE.PointLight(color, intensity, distance, 2);
    lamp.position.set(x, y, z);
    scene.add(lamp);
  }

  const groups = { container: [], wood: [], metal: [], paint: [] };
  for (const solid of solids) groups[bucket(solid.tag)].push(coloredBox(solid));
  const maps = {
    container: detailTexture("ridge"),
    wood: detailTexture("wood"),
    metal: detailTexture("metal"),
    paint: detailTexture("paint"),
  };
  const materials = {
    container: standard(maps.container, { roughness: 0.58, metalness: 0.34 }),
    wood: standard(maps.wood, { roughness: 0.86, metalness: 0.02 }),
    metal: standard(maps.metal, { roughness: 0.42, metalness: 0.62 }),
    paint: standard(maps.paint, { roughness: 0.8, metalness: 0.12 }),
  };
  for (const key of Object.keys(groups)) {
    if (!groups[key].length) continue;
    const geo = mergeGeometries(groups[key]);
    for (const part of groups[key]) part.dispose();
    const mesh = new THREE.Mesh(geo, materials[key]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    if (options.debug) {
      scene.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), new THREE.LineBasicMaterial({ color: 0xb7f5c8 })));
    }
  }

  const deck = new THREE.Mesh(
    buildDeck(),
    new THREE.MeshStandardMaterial({ map: deckTexture(), roughness: 0.92, metalness: 0.04, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }),
  );
  deck.rotation.x = Math.PI / 2;
  deck.position.y = -0.02;
  deck.receiveShadow = true;
  scene.add(deck);

  const hull = new THREE.Mesh(
    buildHull(),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.72, metalness: 0.22, side: THREE.DoubleSide }),
  );
  hull.castShadow = true;
  hull.receiveShadow = true;
  scene.add(hull);

  const reduce = options.reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  waterShader.uniforms.uAmp.value = reduce ? 0.25 : 1;
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(460, 460, 70, 70),
    new THREE.ShaderMaterial({
      uniforms: waterShader.uniforms,
      vertexShader: waterShader.vertexShader,
      fragmentShader: waterShader.fragmentShader,
    }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -1.18;
  scene.add(water);

  const motion = dress(scene, reduce);

  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);

  return {
    scene,
    camera,
    renderer,
    update(elapsed) {
      const t = reduce ? elapsed * 0.35 : elapsed;
      waterShader.uniforms.uTime.value = t;
      flagShader.uniforms.uTime.value = t;
      sky.position.copy(camera.position);
      motion.radar.rotation.y = t * 0.7;
      motion.puffs.forEach((puff, index) => {
        const cycle = (t * 0.25 + index * 0.22) % 1;
        puff.position.y = 6.3 + cycle * 2.4;
        puff.material.opacity = 0.28 * (1 - cycle);
      });
      if (!reduce) {
        motion.birds.forEach((bird, index) => {
          bird.position.x += Math.sin(t * 0.7 + index) * 0.01;
          bird.position.z += 0.012;
          if (bird.position.z > 40) bird.position.z = -36;
          bird.lookAt(camera.position);
          bird.rotateZ(Math.sin(t * 6 + index) * 0.35);
        });
      }
    },
  };
}
