import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ERAS, eraForYear } from './data.js';

const DEG = Math.PI / 180;

export class Room {
  constructor(canvas, onObjectClick) {
    this.canvas = canvas;
    this.onObjectClick = onObjectClick;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.interactive = [];
    this.eraGroups = [];
    this.currentYear = 2005;
    this.materials = new Map();
    this.buildLighting();
    this.buildRoom();
    this.buildKeepsakes();
    ERAS.forEach((era, index) => this.buildEra(era, index));
    this.setYear(2005, true);
  }

  texture(width, height, paint) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    paint(context, width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    return texture;
  }

  material(color, options = {}) {
    const key = `${color}-${JSON.stringify(options)}`;
    if (!this.materials.has(key)) {
      this.materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.75, ...options }));
    }
    return this.materials.get(key);
  }

  mesh(geometry, material, parent, position = [0, 0, 0], rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  box(parent, size, position, color, options = {}) {
    const { radius = 0.025, rotation = [0, 0, 0], material } = options;
    const geometry = radius > 0
      ? new RoundedBoxGeometry(...size, 2, Math.min(radius, Math.min(...size) / 3))
      : new THREE.BoxGeometry(...size);
    return this.mesh(geometry, material || this.material(color), parent, position, rotation);
  }

  cylinder(parent, radii, height, position, color, rotation = [0, 0, 0], segments = 24) {
    return this.mesh(new THREE.CylinderGeometry(radii[0], radii[1], height, segments), this.material(color), parent, position, rotation);
  }

  sphere(parent, radius, position, color, scale = [1, 1, 1]) {
    const mesh = this.mesh(new THREE.SphereGeometry(radius, 16, 12), this.material(color), parent, position);
    mesh.scale.set(...scale);
    return mesh;
  }

  rod(parent, start, end, radius, color) {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = b.clone().sub(a);
    const mesh = this.cylinder(parent, [radius, radius], direction.length(), a.clone().add(b).multiplyScalar(0.5).toArray(), color, [0, 0, 0], 10);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return mesh;
  }

  clickable(object, id) {
    object.userData.objectId = id;
    this.interactive.push(object);
    return object;
  }

  buildLighting() {
    this.scene.add(new THREE.HemisphereLight('#fff5dc', '#687664', 2.1));
    const sunlight = new THREE.DirectionalLight('#ffe8c5', 3.7);
    sunlight.position.set(-3, 10, 7);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(2048, 2048);
    sunlight.shadow.camera.left = -8;
    sunlight.shadow.camera.right = 8;
    sunlight.shadow.camera.top = 8;
    sunlight.shadow.camera.bottom = -8;
    sunlight.shadow.normalBias = 0.025;
    sunlight.shadow.bias = -0.0003;
    this.scene.add(sunlight);
    const fill = new THREE.DirectionalLight('#d9e9db', 1.4);
    fill.position.set(8, 5, 1);
    this.scene.add(fill);
    this.lampLight = new THREE.PointLight('#ffc77e', 2.2, 5, 2);
    this.lampLight.position.set(-0.8, 2.3, -1.7);
    this.scene.add(this.lampLight);
  }

  woodTexture() {
    return this.texture(512, 512, (ctx, w, h) => {
      ctx.fillStyle = '#b59671';
      ctx.fillRect(0, 0, w, h);
      let seed = 23;
      const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 3; col++) {
          const x = col * 171 + (row % 2) * 85;
          const y = row * 64;
          const light = Math.floor(random() * 15);
          ctx.fillStyle = `rgb(${166 + light},${132 + light},${93 + light})`;
          ctx.fillRect(x + 1, y + 1, 169, 62);
          ctx.strokeStyle = '#80684825';
          for (let line = 0; line < 8; line++) {
            ctx.beginPath();
            const ly = y + 8 + line * 6;
            ctx.moveTo(x, ly);
            ctx.bezierCurveTo(x + 50, ly + random() * 6, x + 100, ly - random() * 5, x + 170, ly + 2);
            ctx.stroke();
          }
        }
      }
    });
  }

  buildRoom() {
    this.base = new THREE.Group();
    this.scene.add(this.base);
    const floorMap = this.woodTexture();
    this.floorMaterial = new THREE.MeshStandardMaterial({ map: floorMap, color: '#ffffff', roughness: 0.82 });
    this.box(this.base, [9.25, 0.3, 7.25], [0, -0.2, 0], '#766650', { radius: 0.06 });
    this.box(this.base, [9, 0.08, 7], [0, -0.01, 0], '#ffffff', { material: this.floorMaterial, radius: 0 });
    this.wallMaterial = this.material('#d6d2b7', { roughness: 0.96 });
    this.wallBottomMaterial = this.material('#8a9c87', { roughness: 0.88 });
    this.box(this.base, [9.15, 4.65, 0.18], [0, 2.26, -3.56], '#ffffff', { material: this.wallMaterial, radius: 0.025 });
    this.box(this.base, [0.18, 4.65, 7.15], [-4.56, 2.26, 0], '#ffffff', { material: this.wallMaterial, radius: 0.025 });
    this.box(this.base, [9, 1.17, 0.04], [0, 0.58, -3.445], '#ffffff', { material: this.wallBottomMaterial, radius: 0 });
    this.box(this.base, [0.04, 1.17, 7], [-4.445, 0.58, 0], '#ffffff', { material: this.wallBottomMaterial, radius: 0 });
    this.box(this.base, [9.05, 0.09, 0.08], [0, 1.17, -3.39], '#e5e2cf', { radius: 0 });
    this.box(this.base, [0.08, 0.09, 7], [-4.39, 1.17, 0], '#e5e2cf', { radius: 0 });
    this.box(this.base, [9.05, 0.15, 0.1], [0, 0.1, -3.39], '#ebe7d4', { radius: 0 });
    this.box(this.base, [0.1, 0.15, 7], [-4.39, 0.1, 0], '#ebe7d4', { radius: 0 });
    this.buildWindow();
    this.buildRug();
    this.buildClock();
    const shadowTexture = this.texture(256, 256, (ctx, w, h) => {
      const gradient = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, 125);
      gradient.addColorStop(0, '#40503c40');
      gradient.addColorStop(0.6, '#40503c18');
      gradient.addColorStop(1, '#40503c00');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    });
    const shadow = this.mesh(new THREE.PlaneGeometry(13, 11), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }), this.scene, [0, -0.38, 0.2], [-Math.PI / 2, 0, 0]);
    shadow.castShadow = false;
  }

  buildWindow() {
    const group = new THREE.Group();
    group.position.set(-4.42, 2.85, -0.7);
    group.rotation.y = Math.PI / 2;
    this.base.add(group);
    this.box(group, [2.45, 2.05, 0.12], [0, 0, 0], '#eee9d8');
    const sky = this.texture(256, 256, (ctx, w, h) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#a5c5c0');
      gradient.addColorStop(0.7, '#e8dbb7');
      gradient.addColorStop(1, '#a2ad85');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#8f9d8490';
      ctx.beginPath(); ctx.moveTo(0, 215); ctx.lineTo(70, 140); ctx.lineTo(130, 205); ctx.lineTo(190, 125); ctx.lineTo(256, 210); ctx.lineTo(256, 256); ctx.lineTo(0, 256); ctx.fill();
    });
    this.mesh(new THREE.PlaneGeometry(2.2, 1.8), new THREE.MeshBasicMaterial({ map: sky }), group, [0, 0, 0.07]);
    this.box(group, [0.07, 1.9, 0.12], [0, 0, 0.14], '#e9e6d6');
    this.box(group, [2.3, 0.07, 0.12], [0, 0, 0.14], '#e9e6d6');
    this.box(group, [2.65, 0.12, 0.42], [0, -1.07, 0.1], '#d5c8ac');
    this.rod(group, [-1.5, 1.25, 0.25], [1.5, 1.25, 0.25], 0.035, '#776c54');
    for (const side of [-1, 1]) {
      const curtain = this.box(group, [0.48, 2.35, 0.08], [side * 1.25, -0.05, 0.27], '#e5d8b9', { radius: 0.04 });
      curtain.rotation.z = side * -0.025;
      for (let i = 0; i < 4; i++) this.box(group, [0.035, 2.27, 0.035], [side * 1.25 - 0.17 + i * 0.11, -0.05, 0.33], '#cabe9f', { radius: 0.01 });
    }
  }

  buildRug() {
    const rugMap = this.texture(512, 384, (ctx, w, h) => {
      ctx.fillStyle = '#b8b49b'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#e1d8bb'; ctx.lineWidth = 7; ctx.strokeRect(20, 20, w - 40, h - 40);
      ctx.strokeStyle = '#7f917d'; ctx.lineWidth = 3; ctx.strokeRect(32, 32, w - 64, h - 64);
      for (let x = 70; x < w - 30; x += 92) {
        for (let y = 70; y < h - 30; y += 82) {
          ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillStyle = '#8d9a83'; ctx.fillRect(-17, -17, 34, 34); ctx.fillStyle = '#d6cfb5'; ctx.fillRect(-9, -9, 18, 18); ctx.restore();
        }
      }
      for (let i = 0; i < 1300; i++) { ctx.fillStyle = i % 2 ? '#ffffff0a' : '#342d2109'; ctx.fillRect((i * 73) % w, (i * 151) % h, 1, 3); }
    });
    const rug = this.box(this.base, [4.25, 0.035, 2.8], [0.45, 0.06, 1.25], '#ffffff', { material: new THREE.MeshStandardMaterial({ map: rugMap, roughness: 1 }), radius: 0.02 });
    rug.castShadow = false;
  }

  buildClock() {
    const clock = new THREE.Group();
    clock.position.set(3.65, 3.7, -3.39);
    this.base.add(clock);
    this.cylinder(clock, [0.37, 0.37], 0.08, [0, 0, 0], '#e5dfca', [Math.PI / 2, 0, 0], 32);
    this.cylinder(clock, [0.32, 0.32], 0.086, [0, 0, 0.015], '#f5f0dd', [Math.PI / 2, 0, 0], 32);
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      this.box(clock, [0.015, 0.045, 0.01], [Math.sin(a) * 0.26, Math.cos(a) * 0.26, 0.065], '#536052', { rotation: [0, 0, -a], radius: 0 });
    }
    this.rod(clock, [0, 0, 0.08], [0.13, 0.11, 0.08], 0.012, '#455246');
    this.rod(clock, [0, 0, 0.08], [-0.06, 0.21, 0.08], 0.009, '#455246');
  }

  buildKeepsakes() {
    this.keepsakes = new THREE.Group();
    this.scene.add(this.keepsakes);
    this.buildLamp(this.keepsakes, [-0.8, 1.63, -2.12]);
    this.buildMug(this.keepsakes, [2.1, 1.68, -1.65]);
    this.buildRobot(this.keepsakes, [-1.42, 2.58, -3.14]);
  }

  buildLamp(parent, position) {
    const group = new THREE.Group(); group.position.set(...position); parent.add(group);
    this.cylinder(group, [0.28, 0.32], 0.075, [0, 0.02, 0], '#426550');
    this.rod(group, [0, 0.05, 0], [0.05, 0.57, 0], 0.035, '#456750');
    this.rod(group, [0.05, 0.57, 0], [0.3, 0.85, 0.02], 0.035, '#456750');
    const shade = this.mesh(new THREE.CylinderGeometry(0.16, 0.34, 0.31, 24, 1, true), this.material('#426b51', { side: THREE.DoubleSide }), group, [0.33, 0.79, 0.03], [0, 0, -0.28]);
    this.cylinder(group, [0.15, 0.15], 0.015, [0.33, 0.94, 0.03], '#426b51');
    this.sphere(group, 0.09, [0.33, 0.66, 0.03], '#fff0bd', [1, 0.5, 1]);
    this.box(group, [0.08, 0.015, 0.12], [0.07, 0.065, 0.17], '#d7d2ad');
    this.clickable(group, 'lamp');
    return shade;
  }

  buildMug(parent, position) {
    const group = new THREE.Group(); group.position.set(...position); parent.add(group);
    this.cylinder(group, [0.16, 0.13], 0.28, [0, 0.14, 0], '#e4dfc9');
    this.cylinder(group, [0.165, 0.165], 0.035, [0, 0.28, 0], '#a4513e');
    this.cylinder(group, [0.139, 0.139], 0.005, [0, 0.3, 0], '#493629');
    const handle = this.mesh(new THREE.TorusGeometry(0.12, 0.025, 8, 16), this.material('#ddd8c1'), group, [0.17, 0.17, 0], [0, 0, 0]);
    handle.scale.x = 0.75;
    this.clickable(group, 'mug');
  }

  buildRobot(parent, position) {
    const group = new THREE.Group(); group.position.set(...position); group.scale.setScalar(0.72); parent.add(group);
    this.box(group, [0.32, 0.38, 0.21], [0, 0.38, 0], '#9caa9a');
    this.box(group, [0.37, 0.29, 0.25], [0, 0.72, 0], '#b7bba4');
    this.box(group, [0.26, 0.11, 0.02], [0, 0.75, 0.135], '#425d55');
    for (const side of [-1, 1]) {
      this.sphere(group, 0.034, [side * 0.08, 0.76, 0.151], '#e9b75f');
      this.rod(group, [side * 0.16, 0.52, 0], [side * 0.26, 0.24, 0.02], 0.04, '#829488');
      this.box(group, [0.12, 0.26, 0.16], [side * 0.09, 0.09, 0], '#7e9184');
      this.box(group, [0.14, 0.06, 0.25], [side * 0.09, -0.02, 0.04], '#5b7166');
    }
    this.cylinder(group, [0.025, 0.025], 0.15, [0, 0.94, 0], '#72867a');
    this.sphere(group, 0.05, [0, 1.02, 0], '#c67b52');
    this.cylinder(group, [0.07, 0.07], 0.02, [0, 0.41, 0.115], '#d0b36e', [Math.PI / 2, 0, 0]);
    this.clickable(group, 'robot');
  }

  eraGroup(index) {
    const group = new THREE.Group();
    group.userData.eraIndex = index;
    group.userData.materials = [];
    this.scene.add(group);
    this.eraGroups.push(group);
    return group;
  }

  prepareFade(group) {
    const clones = new Map();
    group.traverse(object => {
      if (!object.isMesh) return;
      const source = object.material;
      if (!clones.has(source)) {
        const clone = source.clone();
        clone.transparent = true;
        clones.set(source, clone);
        group.userData.materials.push(clone);
      }
      object.material = clones.get(source);
    });
  }

  buildEra(era, index) {
    const group = this.eraGroup(index);
    this.buildDesk(group, era);
    this.buildComputer(group, era);
    this.buildChair(group, era);
    this.buildStorage(group, era);
    this.buildDecor(group, era);
    this.buildScreen(group, era);
    this.prepareFade(group);
  }

  buildDesk(parent, era) {
    const modern = era.year >= 2017;
    const mid = era.year >= 2013;
    const desk = new THREE.Group();
    parent.add(desk);
    const width = modern ? 4.65 : mid ? 4.35 : 3.95;
    const woodColor = modern ? '#80684d' : era.year === 2005 ? '#a48b63' : '#9a7c55';
    this.box(desk, [width, 0.14, 1.55], [0.8, 1.54, -2.25], woodColor, { radius: 0.04 });
    this.box(desk, [width - 0.15, 0.04, 1.48], [0.8, 1.46, -2.25], '#6a5944', { radius: 0.01 });
    if (era.year === 2005) {
      this.box(desk, [0.75, 1.42, 1.35], [2.35, 0.75, -2.25], '#9b8968');
      for (let i = 0; i < 3; i++) {
        this.box(desk, [0.69, 0.37, 0.05], [2.35, 1.22 - i * 0.43, -1.545], '#ad9873');
        this.box(desk, [0.22, 0.035, 0.04], [2.35, 1.25 - i * 0.43, -1.51], '#6d6857');
      }
      this.box(desk, [0.09, 1.42, 1.3], [-0.98, 0.75, -2.25], '#968364');
    } else {
      for (const x of [-1.05, 2.65]) {
        this.box(desk, [0.09, 1.44, 0.09], [x, 0.77, -2.78], '#3f4b44');
        this.box(desk, [0.09, 1.44, 0.09], [x, 0.77, -1.73], '#3f4b44');
        this.box(desk, [0.13, 0.07, 1.18], [x, 0.08, -2.25], '#3f4b44');
      }
      if (era.year < 2017) {
        this.box(desk, [0.75, 1.25, 1.2], [2.32, 0.72, -2.25], '#817258');
        for (let i = 0; i < 2; i++) this.box(desk, [0.68, 0.5, 0.04], [2.32, 1.05 - i * 0.57, -1.63], '#a18a65');
      }
    }
    if (era.year >= 2021) {
      this.box(desk, [0.65, 0.03, 0.12], [-0.45, 1.63, -1.55], '#b5a687');
      this.box(desk, [0.45, 0.055, 0.75], [-0.45, 1.66, -2.0], '#d2c7a9', { rotation: [0, -0.08, 0] });
      this.box(desk, [0.39, 0.005, 0.64], [-0.45, 1.693, -2.0], '#eee9d5', { rotation: [0, -0.08, 0], radius: 0 });
      this.rod(desk, [-0.5, 1.71, -2.3], [-0.3, 1.71, -1.75], 0.009, '#3e5149');
    }
    if (era.year === 2005) {
      this.box(desk, [0.48, 0.025, 0.65], [-0.35, 1.64, -1.85], '#b3aa86', { rotation: [0, 0.13, 0] });
      this.box(desk, [0.43, 0.005, 0.56], [-0.35, 1.657, -1.85], '#e5dfc4', { rotation: [0, 0.13, 0], radius: 0 });
    }
  }

  buildComputer(parent, era) {
    const year = era.year;
    const computer = new THREE.Group();
    parent.add(computer);
    const monitor = new THREE.Group();
    monitor.position.set(year >= 2025 ? 0.65 : 0.55, 0, -2.25);
    computer.add(monitor);
    if (year === 2005) {
      this.box(monitor, [1.45, 1.17, 1.03], [0, 2.27, -0.13], '#c8c2a6', { radius: 0.09 });
      this.box(monitor, [1.3, 1.0, 0.12], [0, 2.28, 0.43], '#ded8bd', { radius: 0.08 });
      this.box(monitor, [1.11, 0.79, 0.035], [0, 2.3, 0.505], '#344b44', { radius: 0.07 });
      this.box(monitor, [0.65, 0.09, 0.62], [0, 1.68, -0.04], '#b7b097');
      this.box(monitor, [0.11, 0.045, 0.03], [0.48, 1.88, 0.51], '#68755b');
    } else if (year < 2025) {
      const width = year >= 2021 ? 1.85 : year >= 2013 ? 1.65 : 1.35;
      this.box(monitor, [width, 1.08, 0.11], [0, 2.32, 0.12], year === 2009 ? '#737970' : '#27332f', { radius: 0.055 });
      this.box(monitor, [width - 0.09, 0.96, 0.025], [0, 2.34, 0.186], '#314840', { radius: 0.025 });
      this.box(monitor, [0.09, 0.5, 0.09], [0, 1.76, 0], '#4b5550');
      this.box(monitor, [0.65, 0.055, 0.4], [0, 1.66, 0.08], '#4b5550');
    } else {
      this.box(monitor, [2.45, 1.0, 0.13], [0, 2.3, 0.1], '#25322f', { radius: 0.11 });
      this.box(monitor, [2.32, 0.86, 0.025], [0, 2.32, 0.18], '#2f4944', { radius: 0.08 });
      this.box(monitor, [0.1, 0.45, 0.1], [0, 1.76, 0], '#4a5650');
      this.box(monitor, [0.85, 0.05, 0.4], [0, 1.65, 0.08], '#4a5650');
    }
    this.clickable(monitor, 'monitor');
    if (year < 2013) this.clickable(computer, 'computer');
    this.buildTower(computer, era);
    this.buildKeyboard(computer, era);
    if (year >= 2017 && year < 2025) {
      const second = new THREE.Group();
      second.position.set(-0.95, 0, -2.38);
      second.rotation.y = 0.18;
      computer.add(second);
      this.box(second, [0.86, 1.02, 0.09], [0, 2.26, 0.08], '#303b35', { radius: 0.04 });
      const map = this.makeScreenTexture(era, true);
      this.mesh(new THREE.PlaneGeometry(0.77, 0.9), new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: '#ffffff', emissiveIntensity: 0.45, roughness: 0.4 }), second, [0, 2.26, 0.135]);
      this.box(second, [0.07, 0.48, 0.08], [0, 1.73, 0], '#46534a');
      this.box(second, [0.48, 0.05, 0.32], [0, 1.65, 0.06], '#46534a');
      this.clickable(second, 'monitor');
    }
    if (year >= 2009) this.buildHeadset(computer, era);
    if (year >= 2013) {
      this.box(computer, [0.35, 0.09, 0.52], [2.18, 1.67, -2.45], '#e0ddd0', { radius: 0.04 });
      this.sphere(computer, 0.06, [2.08, 1.74, -2.45], '#454f49');
      this.sphere(computer, 0.06, [2.28, 1.74, -2.45], '#454f49');
      this.box(computer, [0.09, 0.03, 0.18], [2.18, 1.73, -2.28], '#424b45');
    }
    if (year >= 2021) {
      this.cylinder(computer, [0.035, 0.035], 0.38, [1.86, 1.86, -2.55], '#394b43');
      this.sphere(computer, 0.12, [1.86, 2.05, -2.55], '#35433d', [0.8, 1.15, 0.8]);
      this.rod(computer, [1.86, 1.66, -2.55], [1.65, 1.66, -2.55], 0.025, '#394b43');
    }
  }

  buildTower(parent, era) {
    const year = era.year;
    const group = new THREE.Group();
    parent.add(group);
    const onDesk = year <= 2013;
    group.position.set(year >= 2025 ? 2.72 : 2.6, onDesk ? 1.65 : 0.08, -2.48);
    const color = year === 2005 ? '#c8c1a6' : year === 2009 ? '#525b54' : '#303d37';
    this.box(group, [0.63, onDesk ? 0.92 : 1.24, 1.0], [0, onDesk ? 0.46 : 0.62, 0], color, { radius: 0.035 });
    const frontZ = 0.51;
    if (year === 2005) {
      this.box(group, [0.46, 0.055, 0.02], [0, 0.69, frontZ], '#8c8d7d');
      this.box(group, [0.46, 0.055, 0.02], [0, 0.56, frontZ], '#8c8d7d');
      this.box(group, [0.4, 0.1, 0.025], [0, 0.36, frontZ], '#a5a68f');
      this.cylinder(group, [0.055, 0.055], 0.02, [0.14, 0.16, frontZ], '#60755b', [Math.PI / 2, 0, 0]);
    } else {
      this.box(group, [0.42, 0.045, 0.02], [0, onDesk ? 0.76 : 1.06, frontZ], '#18241f');
      this.cylinder(group, [0.045, 0.045], 0.02, [0.13, onDesk ? 0.16 : 0.2, frontZ], '#7caa88', [Math.PI / 2, 0, 0]);
      if (year >= 2017) {
        this.box(group, [0.51, 0.84, 0.015], [0, 0.65, 0.518], '#263e35', { material: this.material('#5e8170', { transparent: true, opacity: 0.28, roughness: 0.15 }) });
        for (let y = 0.37; y < 1; y += 0.3) this.cylinder(group, [0.14, 0.14], 0.025, [0, y, 0.535], '#6b8c78', [Math.PI / 2, 0, 0]);
      }
    }
  }

  buildKeyboard(parent, era) {
    const group = new THREE.Group();
    group.position.set(0.55, 1.66, -1.75);
    parent.add(group);
    const color = era.year < 2013 ? '#c7c1a9' : '#37443e';
    this.box(group, [1.25, 0.07, 0.43], [0, 0, 0], color, { radius: 0.035 });
    const keyColor = era.year < 2013 ? '#e1dcc4' : '#59665d';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 13; col++) {
        this.box(group, [0.073, 0.028, 0.068], [-0.52 + col * 0.084, 0.045, -0.135 + row * 0.083], keyColor, { radius: 0.009 });
      }
    }
    this.box(group, [0.52, 0.029, 0.06], [0.08, 0.046, 0.15], keyColor, { radius: 0.007 });
    this.box(parent, [0.37, 0.025, 0.5], [1.5, 1.65, -1.75], era.year < 2013 ? '#738777' : '#526d5b');
    this.sphere(parent, 0.13, [1.5, 1.72, -1.75], color, [0.75, 0.43, 1.1]);
    this.box(parent, [0.012, 0.015, 0.1], [1.5, 1.78, -1.79], era.year < 2013 ? '#aaa68f' : '#84958a');
    if (era.year < 2017) this.rod(parent, [1.5, 1.69, -1.92], [1.65, 1.65, -2.75], 0.009, '#585b4d');
    this.clickable(group, 'keyboard');
  }

  buildHeadset(parent, era) {
    const group = new THREE.Group();
    group.position.set(1.95, 1.69, -1.96);
    group.rotation.set(-Math.PI / 2, 0, 0.2);
    parent.add(group);
    const band = this.mesh(new THREE.TorusGeometry(0.23, 0.035, 8, 20, Math.PI), this.material('#303b36'), group);
    band.rotation.z = 0;
    for (const side of [-1, 1]) this.box(group, [0.12, 0.18, 0.11], [side * 0.23, 0, 0], '#37443e', { radius: 0.045 });
    this.rod(group, [0.23, -0.02, 0], [0.35, -0.17, 0.04], 0.013, '#303b36');
    this.clickable(group, 'headset');
  }

  buildChair(parent, era) {
    const chair = new THREE.Group();
    chair.position.set(0.65, 0, 0.02);
    chair.rotation.y = era.year === 2005 ? -0.14 : 0.08;
    parent.add(chair);
    const modern = era.year >= 2021;
    const fabric = era.year < 2013 ? '#58736c' : '#384a43';
    this.cylinder(chair, [0.07, 0.07], 0.62, [0, 0.42, 0], '#657169');
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 2 / 5;
      const x = Math.sin(angle) * 0.52;
      const z = Math.cos(angle) * 0.52;
      this.rod(chair, [0, 0.18, 0], [x, 0.12, z], 0.035, '#55645b');
      this.sphere(chair, 0.065, [x, 0.08, z], '#35443d', [0.7, 1, 1]);
    }
    this.box(chair, [1.0, 0.18, 0.9], [0, 0.82, 0], fabric, { radius: 0.12 });
    this.box(chair, [0.96, modern ? 1.38 : 1.05, 0.18], [0, modern ? 1.58 : 1.42, 0.36], fabric, { radius: 0.13, rotation: [-0.08, 0, 0] });
    if (modern) {
      this.box(chair, [0.65, 0.28, 0.1], [0, 1.5, 0.24], '#61786a', { radius: 0.08 });
      this.box(chair, [0.58, 0.27, 0.12], [0, 2.3, 0.43], '#384a43', { radius: 0.09 });
      for (let i = 0; i < 5; i++) this.box(chair, [0.75, 0.025, 0.015], [0, 1.15 + i * 0.2, 0.255], '#7b8b7d', { radius: 0.005 });
    }
    for (const side of [-1, 1]) {
      this.rod(chair, [side * 0.43, 0.78, 0], [side * 0.52, 1.17, 0], 0.035, '#53635a');
      this.box(chair, [0.13, 0.07, 0.56], [side * 0.52, 1.18, -0.02], '#42544a', { radius: 0.035 });
    }
    if (era.year === 2005) {
      this.box(chair, [0.62, 0.09, 0.03], [0, 1.53, 0.25], '#789087', { radius: 0.03 });
    }
  }

  buildStorage(parent, era) {
    const year = era.year;
    const shelf = new THREE.Group();
    shelf.position.set(-1.6, 0, -3.2);
    parent.add(shelf);
    this.box(shelf, [1.12, 0.09, 0.48], [0, 2.45, 0], '#8e7858');
    this.box(shelf, [1.12, 0.09, 0.48], [0, 3.23, 0], '#8e7858');
    this.rod(shelf, [-0.44, 2.4, -0.12], [-0.44, 2.14, -0.22], 0.022, '#4e5b4e');
    this.rod(shelf, [0.44, 2.4, -0.12], [0.44, 2.14, -0.22], 0.022, '#4e5b4e');
    const games = new THREE.Group(); shelf.add(games);
    const colors = ['#a25d47', '#435f55', '#d0bb8b', '#6c7b83', '#7a584b', '#ac956d'];
    for (let i = 0; i < (year < 2013 ? 10 : 7); i++) {
      const book = this.box(games, [0.09 + (i % 2) * 0.025, 0.43 + (i % 3) * 0.035, 0.32], [-0.42 + i * 0.095, 2.72, 0.01], colors[i % colors.length], { radius: 0.008 });
      if (i === 3) book.rotation.z = -0.12;
      this.box(games, [0.05, 0.015, 0.01], [-0.42 + i * 0.095, 2.82, 0.18], '#ded9bc', { radius: 0 });
    }
    if (year >= 2013) {
      this.box(shelf, [0.62, 0.35, 0.33], [0.1, 3.46, 0], '#b3a07a');
      this.box(shelf, [0.25, 0.02, 0.015], [0.1, 3.46, 0.18], '#e1d8bb');
    }
    this.clickable(games, 'games');
    if (year <= 2009) this.buildBed(parent, era);
    else this.buildCabinet(parent, era);
    if (year >= 2017) this.buildTrophy(parent, [3.45, 2.82, -3.12]);
    if (year >= 2021) {
      this.buildPlant(parent, [3.6, 0.1, -0.7], 1.1);
      this.buildPlant(parent, [-3.8, 1.22, -1.7], 0.65);
    }
  }

  buildBed(parent, era) {
    const bed = new THREE.Group();
    bed.position.set(-3.05, 0, 1.35);
    parent.add(bed);
    this.box(bed, [2.1, 0.28, 3.1], [0, 0.38, 0], '#877154', { radius: 0.05 });
    this.box(bed, [2.0, 0.32, 2.95], [0, 0.62, 0], '#d9d4bb', { radius: 0.13 });
    this.box(bed, [2.08, 1.05, 0.14], [0, 0.75, -1.52], '#887354', { radius: 0.05 });
    const blanket = era.year === 2005 ? '#718b86' : '#7e8b72';
    this.box(bed, [2.04, 0.12, 1.98], [0, 0.85, 0.45], blanket, { radius: 0.08 });
    for (let i = 0; i < 6; i++) this.box(bed, [1.98, 0.012, 0.025], [0, 0.918, -0.32 + i * 0.29], era.year === 2005 ? '#94a49a' : '#9da68a', { radius: 0 });
    this.box(bed, [1.25, 0.22, 0.67], [0, 0.9, -0.98], '#e8e1c8', { radius: 0.15, rotation: [0, 0.08, 0] });
    this.box(bed, [0.65, 0.65, 0.65], [-0.48, 0.38, 1.95], '#a58e68');
    this.box(bed, [0.55, 0.02, 0.5], [-0.48, 0.715, 1.95], '#c3b694');
    this.clickable(bed, 'bed');
  }

  buildCabinet(parent, era) {
    const cabinet = new THREE.Group();
    cabinet.position.set(-3.25, 0, 0.6);
    parent.add(cabinet);
    this.box(cabinet, [1.7, 0.94, 0.85], [0, 0.63, 0], era.year >= 2021 ? '#8a7658' : '#7b6b52', { radius: 0.04 });
    for (const x of [-0.62, 0.62]) for (const z of [-0.27, 0.27]) this.box(cabinet, [0.09, 0.27, 0.09], [x, 0.16, z], '#4b584c');
    for (const x of [-0.41, 0.41]) {
      this.box(cabinet, [0.76, 0.76, 0.04], [x, 0.64, 0.445], '#9b8766');
      this.box(cabinet, [0.23, 0.035, 0.04], [x, 0.72, 0.48], '#4c574a');
    }
    const retro = new THREE.Group(); retro.position.set(-0.25, 1.12, 0); cabinet.add(retro);
    this.box(retro, [0.7, 0.58, 0.5], [0, 0.29, 0], '#bbb69c', { radius: 0.045 });
    this.box(retro, [0.54, 0.4, 0.025], [0, 0.31, 0.265], '#526c60', { radius: 0.04 });
    this.box(retro, [0.1, 0.03, 0.02], [0.22, 0.08, 0.26], '#786b53');
    for (let i = 0; i < 3; i++) this.box(cabinet, [0.58, 0.05, 0.75], [0.48, 1.14 + i * 0.055, 0.03], ['#a15e46', '#536d5d', '#c0ac7c'][i], { rotation: [0, i * 0.04, 0] });
    this.clickable(retro, 'computer');
    if (era.year >= 2021) {
      const sofa = new THREE.Group(); sofa.position.set(-2.7, 0, 2.25); parent.add(sofa);
      this.box(sofa, [2.35, 0.47, 0.85], [0, 0.5, 0], '#9b9e81', { radius: 0.13 });
      this.box(sofa, [2.35, 0.78, 0.25], [0, 0.88, -0.36], '#a9ab8b', { radius: 0.12 });
      for (const side of [-1, 1]) this.box(sofa, [0.22, 0.54, 0.86], [side * 1.09, 0.68, 0], '#92977a', { radius: 0.09 });
      this.box(sofa, [0.52, 0.43, 0.15], [-0.5, 0.88, -0.16], '#c2aa78', { radius: 0.1, rotation: [0.1, 0, 0.15] });
    }
  }

  buildTrophy(parent, position) {
    const trophy = new THREE.Group(); trophy.position.set(...position); parent.add(trophy);
    this.box(trophy, [0.42, 0.1, 0.3], [0, 0, 0], '#665a43');
    this.cylinder(trophy, [0.05, 0.07], 0.29, [0, 0.18, 0], '#c5a259');
    this.mesh(new THREE.CylinderGeometry(0.24, 0.1, 0.3, 20, 1, true), this.material('#c7a75d', { side: THREE.DoubleSide, metalness: 0.6, roughness: 0.3 }), trophy, [0, 0.43, 0]);
    for (const side of [-1, 1]) {
      const handle = this.mesh(new THREE.TorusGeometry(0.13, 0.023, 8, 12, Math.PI), this.material('#c7a75d', { metalness: 0.6 }), trophy, [side * 0.2, 0.43, 0], [0, 0, side * Math.PI / 2]);
      handle.scale.y = 0.8;
    }
    this.clickable(trophy, 'trophy');
  }

  buildPlant(parent, position, scale = 1) {
    const plant = new THREE.Group(); plant.position.set(...position); plant.scale.setScalar(scale); parent.add(plant);
    this.cylinder(plant, [0.28, 0.21], 0.46, [0, 0.23, 0], '#b39a76');
    this.cylinder(plant, [0.25, 0.25], 0.025, [0, 0.47, 0], '#574b35');
    for (let i = 0; i < 7; i++) {
      const angle = i * 2.4;
      const height = 0.75 + (i % 3) * 0.18;
      const x = Math.sin(angle) * 0.3;
      const z = Math.cos(angle) * 0.3;
      this.rod(plant, [0, 0.45, 0], [x, height, z], 0.017, '#4c7050');
      const leaf = this.sphere(plant, 0.25, [x, height, z], i % 2 ? '#537f55' : '#648c5d', [0.65, 1.45, 0.18]);
      leaf.rotation.set(Math.sin(angle) * 0.6, angle, Math.cos(angle) * 0.65);
    }
    this.clickable(plant, 'plant');
  }

  buildDecor(parent, era) {
    const year = era.year;
    const posterMap = this.texture(384, 512, (ctx, w, h) => {
      const palettes = [ ['#243f3b', '#d1b775', 'ORBIT', 'EXPLORER'], ['#934e3e', '#e6d1a1', 'WORLD', 'OF WARCRAFT'], ['#344c52', '#d9a867', 'THE LAST', 'OF US'], ['#536e79', '#e4ba75', 'THE FUTURE', 'IS A TEAM'], ['#bd9c70', '#4c6153', 'TAKE', 'A BREAK'], ['#2d4541', '#c6b58a', 'ASTRAL', 'DRIFT'] ];
      const palette = palettes[ERAS.indexOf(era)];
      ctx.fillStyle = palette[0]; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = palette[1]; ctx.lineWidth = 2; ctx.strokeRect(22, 22, w - 44, h - 44);
      ctx.beginPath(); ctx.arc(w / 2, 190, 95, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(w / 2, 190, 145, 35, -0.35, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = palette[1]; ctx.beginPath(); ctx.arc(w / 2 + 35, 158, 32, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = 'center'; ctx.font = 'bold 43px Georgia'; ctx.fillText(palette[2], w / 2, 350);
      ctx.font = '18px monospace'; ctx.fillText(palette[3], w / 2, 383);
      ctx.font = '10px monospace'; ctx.fillText(`ARCHIVE ${year} / PLAY FOREVER`, w / 2, 454);
    });
    this.mesh(new THREE.PlaneGeometry(1.25, 1.67), new THREE.MeshStandardMaterial({ map: posterMap, roughness: 0.9 }), parent, [2.55, 3.42, -3.445]);
    this.box(parent, [1.31, 0.035, 0.035], [2.55, 4.27, -3.42], '#766a52', { radius: 0 });
    const notes = this.texture(256, 256, (ctx, w, h) => {
      ctx.fillStyle = '#a78c63'; ctx.fillRect(0, 0, w, h);
      const cards = [[25, 30, 75, 65, '#e3d9ac'], [130, 45, 85, 95, '#d0dbbd'], [50, 130, 90, 70, '#d1b499'], [165, 165, 60, 55, '#e7dfbd']];
      for (const [x, y, cw, ch, color] of cards) { ctx.fillStyle = color; ctx.fillRect(x, y, cw, ch); ctx.fillStyle = '#776e5555'; for (let l = 0; l < 4; l++) ctx.fillRect(x + 8, y + 15 + l * 9, cw - 16 - l * 5, 2); }
    });
    this.mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshStandardMaterial({ map: notes, roughness: 1 }), parent, [-2.9, 3.1, -3.445]);
    if (year <= 2009) {
      const shoes = new THREE.Group(); shoes.position.set(-1.65, 0.12, 2.4); parent.add(shoes);
      for (const x of [-0.16, 0.16]) {
        this.box(shoes, [0.25, 0.15, 0.55], [x, 0, 0], '#c7c1aa', { radius: 0.08 });
        this.box(shoes, [0.26, 0.045, 0.56], [x, -0.07, 0], '#696e5c', { radius: 0.02 });
      }
    }
    if (year >= 2013) {
      this.box(parent, [1.25, 0.1, 0.45], [3.3, 2.62, -3.17], '#7b6b50');
      for (let i = 0; i < 4; i++) this.box(parent, [0.15, 0.48, 0.32], [2.88 + i * 0.18, 2.9, -3.15], ['#a1644d', '#536b5f', '#c3ac77', '#657780'][i]);
    }
  }

  makeScreenTexture(era, secondary = false) {
    return this.texture(640, 400, (ctx, w, h) => {
      if (era.screen === 'desktop') {
        ctx.fillStyle = era.year === 2005 ? '#3b83b5' : '#548c7b'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#6da34d'; ctx.beginPath(); ctx.moveTo(0, 290); ctx.quadraticCurveTo(190, 160, 410, 290); ctx.quadraticCurveTo(540, 220, 640, 270); ctx.lineTo(640, 400); ctx.lineTo(0, 400); ctx.fill();
        ctx.fillStyle = '#f2eedb'; ctx.fillRect(190, 70, 365, 245);
        ctx.fillStyle = '#216783'; ctx.fillRect(190, 70, 365, 27);
        ctx.fillStyle = '#fff'; ctx.font = '13px sans-serif'; ctx.fillText(era.game, 205, 88);
        ctx.fillStyle = '#c8d3b3'; ctx.fillRect(210, 116, 325, 145);
        ctx.fillStyle = '#3f5947'; ctx.font = 'bold 25px sans-serif'; ctx.fillText(era.game, 245, 175);
        ctx.font = '12px monospace'; ctx.fillText('CLICK TO RETURN TO YOUR SAVE', 260, 205);
        ctx.fillStyle = '#ddd9bd'; ctx.fillRect(0, 365, w, 35);
        ctx.fillStyle = '#347849'; ctx.fillRect(8, 371, 82, 23);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.fillText('start', 28, 388);
        for (let i = 0; i < 4; i++) { ctx.fillStyle = '#e7e6d5'; ctx.fillRect(22, 30 + i * 66, 30, 32); ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.fillText(['My PC', 'Games', 'Music', 'Trash'][i], 15, 77 + i * 66); }
      } else if (secondary) {
        ctx.fillStyle = '#1d2e31'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#81a790'; ctx.font = '18px monospace'; ctx.fillText('TEAM VOICE / ONLINE', 35, 50);
        for (let i = 0; i < 5; i++) { ctx.fillStyle = '#344c4a'; ctx.fillRect(35, 85 + i * 55, 570, 40); ctx.fillStyle = '#c3d3b9'; ctx.font = '14px monospace'; ctx.fillText(['PlayerOne', 'OldFriend', 'Healer_07', 'NoScope', 'You'][i], 55, 110 + i * 55); }
      } else if (era.screen === 'library') {
        const gradient = ctx.createLinearGradient(0, 0, w, h); gradient.addColorStop(0, '#1d343c'); gradient.addColorStop(1, '#59766a'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#13252dcc'; ctx.fillRect(70, 50, 510, 290);
        ctx.fillStyle = '#b4c9ac'; ctx.font = '14px sans-serif'; ctx.fillText('MY GAME LIBRARY', 95, 85);
        ctx.fillStyle = '#506b54'; ctx.fillRect(95, 110, 460, 140);
        ctx.fillStyle = '#e0e4c6'; ctx.font = 'bold 27px sans-serif'; ctx.fillText(era.game.toUpperCase(), 120, 200);
        ctx.fillStyle = '#b7ce8d'; ctx.fillRect(95, 275, 130, 35);
        ctx.fillStyle = '#243c30'; ctx.font = '12px sans-serif'; ctx.fillText('▶  PLAY', 125, 297);
      } else {
        ctx.fillStyle = '#101e2b'; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 90; i++) { ctx.fillStyle = i % 3 ? '#829aa4' : '#fff'; ctx.fillRect((i * 97) % w, (i * 53) % h, 1.5, 1.5); }
        const gradient = ctx.createRadialGradient(270, 145, 10, 320, 200, 135); gradient.addColorStop(0, '#d1b481'); gradient.addColorStop(0.6, '#956e57'); gradient.addColorStop(1, '#34434c'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(320, 210, 130, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#c0a479'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(320, 230, 210, 42, -0.2, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#c2d8d3'; ctx.font = '14px monospace'; ctx.fillText(`ASTRAL DRIFT / ${era.year}`, 25, 35); ctx.fillText('NEW JOURNEY', 470, 365);
      }
    });
  }

  buildScreen(parent, era) {
    const texture = this.makeScreenTexture(era);
    const material = new THREE.MeshStandardMaterial({ map: texture, emissiveMap: texture, emissive: '#ffffff', emissiveIntensity: 0.62, roughness: 0.42 });
    let width = 1.1;
    let height = 0.77;
    let x = 0.55;
    let y = 2.3;
    let z = -1.726;
    if (era.year > 2005) { width = era.year >= 2021 ? 1.76 : era.year >= 2013 ? 1.56 : 1.26; height = 0.93; y = 2.34; z = -2.049; }
    if (era.year === 2025) { width = 2.29; height = 0.83; x = 0.65; y = 2.32; z = -2.056; }
    const screen = this.mesh(new THREE.PlaneGeometry(width, height), material, parent, [x, y, z]);
    screen.castShadow = false;
    this.clickable(screen, 'monitor');
  }

  setYear(year, immediate = false) {
    this.currentYear = year;
    let currentIndex = 0;
    for (let i = 0; i < ERAS.length; i++) if (year >= ERAS[i].year) currentIndex = i;
    const nextIndex = Math.min(currentIndex + 1, ERAS.length - 1);
    const span = ERAS[nextIndex].year - ERAS[currentIndex].year || 1;
    const raw = (year - ERAS[currentIndex].year) / span;
    const blend = THREE.MathUtils.smoothstep(raw, 0.78, 1);
    this.eraGroups.forEach((group, index) => {
      let opacity = 0;
      if (index === currentIndex) opacity = 1 - blend;
      if (index === nextIndex) opacity = blend;
      if (currentIndex === nextIndex && index === currentIndex) opacity = 1;
      group.visible = opacity > 0.005;
      group.position.y = (index === nextIndex ? (1 - blend) * 0.05 : 0);
      for (const material of group.userData.materials) {
        material.opacity = opacity;
        material.depthWrite = opacity > 0.95;
      }
    });
    const era = ERAS[currentIndex];
    const next = ERAS[nextIndex];
    this.wallMaterial.color.copy(new THREE.Color(era.wall)).lerp(new THREE.Color(next.wall), blend);
    this.wallBottomMaterial.color.copy(new THREE.Color(era.wallBottom)).lerp(new THREE.Color(next.wallBottom), blend);
    this.floorMaterial.color.copy(new THREE.Color(era.floor)).lerp(new THREE.Color(next.floor), blend).multiplyScalar(1.45);
    this.lampLight.color.copy(new THREE.Color(era.light)).lerp(new THREE.Color(next.light), blend);
    if (immediate) this.renderer.render(this.scene, this.camera);
  }

  resize(width, height) {
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  pick(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const candidates = this.interactive.filter(object => {
      let current = object;
      while (current) { if (!current.visible) return false; current = current.parent; }
      return true;
    });
    const hits = this.raycaster.intersectObjects(candidates, true);
    if (!hits.length) return null;
    let object = hits[0].object;
    while (object && !object.userData.objectId) object = object.parent;
    return object ? { id: object.userData.objectId, point: hits[0].point, object } : null;
  }

  project(point) {
    const vector = point.clone().project(this.camera);
    const rect = this.canvas.getBoundingClientRect();
    return { x: (vector.x * 0.5 + 0.5) * rect.width, y: (-vector.y * 0.5 + 0.5) * rect.height };
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
