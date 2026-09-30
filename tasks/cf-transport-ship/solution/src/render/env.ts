// 海天环境：天空、海面、阳光与阴影、云，以及不影响玩法的远景动态（吊机、直升机、海鸥、远处货轮）。
import * as THREE from "three";

export type Quality = "low" | "medium" | "high";

export const SUN_DIR = new THREE.Vector3(-0.45, 0.78, 0.43).normalize();
const HORIZON = new THREE.Color(0xc9dbe6);
const ZENITH = new THREE.Color(0x4f86bf);
export const SEA_LEVEL = -6;

export interface Env {
  sun: THREE.DirectionalLight;
  update(t: number, camPos: THREE.Vector3): void;
  dispose(): void;
}

export function buildEnv(scene: THREE.Scene, renderer: THREE.WebGLRenderer, quality: Quality): Env {
  scene.background = HORIZON.clone();
  scene.fog = new THREE.Fog(HORIZON.getHex(), 180, 1400);

  const hemi = new THREE.HemisphereLight(0xdfeeff, 0x5b5346, 1.25);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1d6, 3.1);
  sun.position.copy(SUN_DIR).multiplyScalar(120);
  sun.target.position.set(0, 0, 0);
  scene.add(sun, sun.target);
  if (quality !== "low") {
    sun.castShadow = true;
    const s = quality === "high" ? 4096 : 2048;
    sun.shadow.mapSize.set(s, s);
    const c = sun.shadow.camera;
    c.left = -64; c.right = 64; c.top = 36; c.bottom = -36; c.near = 20; c.far = 260;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
  }

  const sky = skyDome();
  scene.add(sky);
  // 用天空生成环境反射（金属、玻璃、海面）
  const pm = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.add(skyDome());
  const envRT = pm.fromScene(envScene, 0.02);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.55;
  pm.dispose();

  const sea = seaMesh();
  scene.add(sea);
  const clouds = cloudLayer(quality === "low" ? 8 : 16);
  scene.add(clouds);
  const props = ambientProps();
  scene.add(props.group);

  return {
    sun,
    update(t, cam) {
      (sea.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      sea.position.set(Math.round(cam.x / 20) * 20, SEA_LEVEL, Math.round(cam.z / 20) * 20);
      sky.position.copy(cam);
      clouds.position.set(cam.x * 0.9 + ((t * 0.8) % 1800) - 900, 0, cam.z * 0.9);
      props.update(t);
    },
    dispose() {
      envRT.dispose();
    },
  };
}

function skyDome(): THREE.Mesh {
  const g = new THREE.SphereGeometry(1800, 32, 16);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { uSun: { value: SUN_DIR }, uH: { value: HORIZON }, uZ: { value: ZENITH } },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: `uniform vec3 uSun, uH, uZ; varying vec3 vDir;
      void main(){
        float h = clamp(vDir.y, -0.2, 1.0);
        vec3 c = mix(uH, uZ, pow(max(h, 0.0), 0.55));
        c = mix(c, uH * 0.92, smoothstep(0.0, -0.2, h));
        float s = max(dot(vDir, uSun), 0.0);
        c += vec3(1.0, 0.9, 0.7) * (pow(s, 900.0) * 6.0 + pow(s, 12.0) * 0.18);
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.renderOrder = -10;
  mesh.frustumCulled = false;
  return mesh;
}

function seaMesh(): THREE.Mesh {
  const g = new THREE.PlaneGeometry(3200, 3200, 200, 200);
  g.rotateX(-Math.PI / 2);
  const m = new THREE.ShaderMaterial({
    fog: false,
    uniforms: {
      uTime: { value: 0 }, uSun: { value: SUN_DIR }, uH: { value: HORIZON }, uZ: { value: ZENITH },
      uDeep: { value: new THREE.Color(0x0e3550) }, uShallow: { value: new THREE.Color(0x2b6c86) },
    },
    vertexShader: `uniform float uTime; varying vec3 vW; varying vec3 vN;
      vec3 wave(vec2 p, vec2 d, float a, float k, float s, inout vec3 dn){
        float f = dot(d, p) * k + uTime * s; float c = cos(f);
        dn.x += d.x * a * k * c; dn.z += d.y * a * k * c; return vec3(0., a * sin(f), 0.);
      }
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.);
        vec3 dn = vec3(0.);
        float fade = 1.0 - smoothstep(300.0, 1400.0, length(w.xz - cameraPosition.xz));
        vec3 o = wave(w.xz, normalize(vec2(1.,.3)), .28, .09, 1.1, dn)
               + wave(w.xz, normalize(vec2(-.4,1.)), .18, .16, 1.6, dn)
               + wave(w.xz, normalize(vec2(.7,-.8)), .10, .31, 2.3, dn)
               + wave(w.xz, normalize(vec2(-1.,-.2)), .05, .7, 3.1, dn);
        w.y += o.y * fade;
        vW = w.xyz; vN = normalize(vec3(-dn.x * fade, 1., -dn.z * fade));
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `uniform vec3 uSun, uH, uZ, uDeep, uShallow; uniform float uTime; varying vec3 vW; varying vec3 vN;
      void main(){
        vec3 v = normalize(cameraPosition - vW);
        vec3 n = normalize(vN + vec3(sin(vW.x*1.7+uTime*2.)*.04, 0., cos(vW.z*1.9+uTime*1.7)*.04));
        float fr = pow(1.0 - max(dot(n, v), 0.0), 4.0);
        vec3 r = reflect(-v, n);
        vec3 sky = mix(uH, uZ, pow(clamp(r.y, 0., 1.), .5));
        vec3 c = mix(mix(uDeep, uShallow, .25 + .25 * n.y), sky, .15 + .75 * fr);
        float sp = pow(max(dot(r, uSun), 0.), 280.);
        c += vec3(1., .92, .75) * sp * 3.;
        float d = length(vW.xz - cameraPosition.xz);
        c = mix(c, uH, smoothstep(250., 1500., d));
        gl_FragColor = vec4(c, 1.);
      }`,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.position.y = SEA_LEVEL;
  mesh.frustumCulled = false;
  return mesh;
}

function cloudLayer(n: number): THREE.Group {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  for (let i = 0; i < 9; i++) {
    const x = 30 + Math.random() * 68, y = 50 + Math.random() * 30, r = 22 + Math.random() * 26;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, "rgba(255,255,255,0.75)"); grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const grp = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false, opacity: 0.85 }));
    const a = (i / n) * Math.PI * 2 + Math.random();
    const r = 500 + Math.random() * 500;
    s.position.set(Math.cos(a) * r, 130 + Math.random() * 140, Math.sin(a) * r);
    s.scale.set(260 + Math.random() * 220, 90 + Math.random() * 60, 1);
    grp.add(s);
  }
  return grp;
}

function ambientProps(): { group: THREE.Group; update(t: number): void } {
  const group = new THREE.Group();
  const yellow = new THREE.MeshStandardMaterial({ color: 0xd9a92a, roughness: 0.6, metalness: 0.4 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2c2e, roughness: 0.6, metalness: 0.5 });
  // 船舱顶部吊机：立柱 + 仰起的吊臂 + 吊钩，全部位于交火高度之上
  for (const sx of [-1, 1]) {
    const crane = new THREE.Group();
    crane.add(mesh(new THREE.CylinderGeometry(0.55, 0.7, 6, 14), yellow, 0, 3, 0));
    crane.add(mesh(new THREE.BoxGeometry(1.6, 1.3, 1.8), yellow, 0, 6.4, 0));
    const jib = new THREE.Group();
    jib.position.set(0, 6.6, 0);
    jib.rotation.z = -sx * 0.42; // 吊臂朝甲板中部方向上仰
    const arm = mesh(new THREE.BoxGeometry(15, 0.55, 0.55), yellow, -sx * 7.5, 0, 0);
    jib.add(arm);
    crane.add(jib);
    const tipX = -sx * 15 * Math.cos(0.42), tipY = 6.6 + 15 * Math.sin(0.42);
    crane.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 3.5, 4), dark, tipX, tipY - 1.75, 0));
    crane.add(mesh(new THREE.BoxGeometry(0.35, 0.5, 0.35), dark, tipX, tipY - 3.7, 0));
    crane.position.set(sx * 44, 4.7, sx * 7.6);
    crane.rotation.y = sx * 0.35;
    group.add(crane);
  }
  // 远处货轮
  const ship = new THREE.Group();
  const hullM = new THREE.MeshStandardMaterial({ color: 0x3a2a26, roughness: 0.8 });
  ship.add(mesh(new THREE.BoxGeometry(160, 14, 26), hullM, 0, 1, 0));
  const cols = [0x2d5f8a, 0x8a4430, 0x4f6a45, 0xb0642c, 0x7c8588];
  for (let i = 0; i < 12; i++) ship.add(mesh(new THREE.BoxGeometry(10, 7 + (i % 3) * 2.6, 22), new THREE.MeshStandardMaterial({ color: cols[i % 5], roughness: 0.8 }), -60 + i * 10.5, 10, 0));
  ship.add(mesh(new THREE.BoxGeometry(12, 18, 20), new THREE.MeshStandardMaterial({ color: 0xd8d6cc }), 72, 16, 0));
  ship.position.set(-380, SEA_LEVEL, 620);
  ship.rotation.y = 0.35;
  group.add(ship);
  // 直升机
  const heli = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color: 0x3f4a3a, roughness: 0.6, metalness: 0.3 });
  heli.add(mesh(new THREE.CapsuleGeometry(1.4, 3.5, 4, 10).rotateZ(Math.PI / 2), body, 0, 0, 0));
  heli.add(mesh(new THREE.BoxGeometry(6, 0.4, 0.4), body, -4.5, 0.4, 0));
  const rotor = mesh(new THREE.BoxGeometry(11, 0.06, 0.35), dark, 0, 1.6, 0);
  heli.add(rotor);
  group.add(heli);
  // 海鸥
  const gullM = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.8 });
  const gulls: { g: THREE.Group; wl: THREE.Mesh; wr: THREE.Mesh; r: number; h: number; s: number; p: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.12, 0.14), gullM, 0, 0, 0));
    const wl = mesh(new THREE.BoxGeometry(0.06, 0.02, 0.55), gullM, 0, 0, 0.3);
    const wr = mesh(new THREE.BoxGeometry(0.06, 0.02, 0.55), gullM, 0, 0, -0.3);
    wl.geometry.translate(0, 0, 0); g.add(wl, wr);
    group.add(g);
    gulls.push({ g, wl, wr, r: 40 + i * 14, h: 22 + i * 4, s: 0.12 + i * 0.02, p: i * 1.3 });
  }
  return {
    group,
    update(t) {
      const a = t * 0.05;
      heli.position.set(Math.cos(a) * 420, 70 + Math.sin(t * 0.3) * 4, Math.sin(a) * 420);
      heli.rotation.y = -a - Math.PI / 2;
      rotor.rotation.y = t * 30;
      for (const q of gulls) {
        const ang = t * q.s + q.p;
        q.g.position.set(Math.cos(ang) * q.r, q.h + Math.sin(t * 0.7 + q.p) * 2, Math.sin(ang) * q.r * 0.5);
        q.g.rotation.y = -ang;
        const f = Math.sin(t * 7 + q.p) * 0.5;
        q.wl.rotation.x = f; q.wr.rotation.x = -f;
      }
    },
  };
}

function mesh(g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const o = new THREE.Mesh(g, m);
  o.position.set(x, y, z);
  return o;
}
