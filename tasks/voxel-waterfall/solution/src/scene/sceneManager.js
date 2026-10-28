// Three.js orchestration layer: turns heightmap data into instanced meshes and
// drives the render loop (falling water, drifting clouds, orbit camera).
//
// Every layer record owns a THREE.Group in `group`; rebuilds dispose the previous
// group through one path so nothing is left in the scene.

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildHeightmap, buildVoxelMesh, PALETTES } from "./terrain.js";
import { clamp } from "../noise.js";

const V = new THREE.Vector3();
const M = new THREE.Matrix4();
const Q = new THREE.Quaternion();
const S = new THREE.Vector3(1, 1, 1);
const COL = new THREE.Color();

// Soft radial sprite used for the sun glow.
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.55, "rgba(255,255,255,0.28)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class VoxelWaterfallScene {
  constructor(container) {
    this.container = container;
    this.opts = null;
    this.map = null;
    this.time = 0;

    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, w / h, 1, 4000);
    this.camera.position.set(150, 92, 175);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 40;
    this.controls.maxDistance = 700;
    this.controls.maxPolarAngle = Math.PI * 0.495;

    this.hemi = new THREE.HemisphereLight(0xffffff, 0x404040, 0.6);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffffff, 1.1);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.terrain = null;
    this.water = null;
    this.clouds = null;
    this.pool = null;
    this.lake = null;
    this.poolCenter = null;

    this._onResize = this._onResize.bind(this);
    window.addEventListener("resize", this._onResize);
    this._resizeObs = new ResizeObserver(this._onResize);
    this._resizeObs.observe(container);

    this._raf = 0;
    this._last = 0;
    this._loop = this._loop.bind(this);
  }

  // Rebuild everything, or only the pieces that changed structurally.
  setOptions(opts) {
    const prev = this.opts;
    this.opts = opts;

    const structural =
      !prev ||
      prev.seed !== opts.seed ||
      prev.resolution !== opts.resolution ||
      prev.mesaTop !== opts.mesaTop ||
      prev.mesaRadius !== opts.mesaRadius ||
      prev.rimWidth !== opts.rimWidth ||
      prev.groundAmp !== opts.groundAmp ||
      prev.subPeakAmp !== opts.subPeakAmp ||
      prev.fallAngle !== opts.fallAngle ||
      prev.fallWidth !== opts.fallWidth;

    if (structural) this.map = buildHeightmap(opts);
    if (structural) this._rebuildTerrain();
    if (structural || !prev || prev.cloudCount !== opts.cloudCount || prev.cloudY !== opts.cloudY) {
      this._rebuildClouds();
    }
    if (structural || !prev || prev.fallCount !== opts.fallCount) this._rebuildWater();

    this._applyAtmosphere();
    if (structural) this._frameCamera();
  }

  _disposeLayer(layer) {
    if (!layer) return;
    const group = layer.group;
    if (!group || !Array.isArray(group.children)) return;
    this.scene.remove(group);
    for (const child of group.children) {
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    }
  }

  _rebuildTerrain() {
    this._disposeLayer(this.terrain);
    const opts = this.opts;
    const { count, positions, colors } = buildVoxelMesh(this.map, opts);

    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      count
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    S.set(1, 1, 1);
    for (let i = 0; i < count; i++) {
      V.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      M.compose(V, Q, S);
      mesh.setMatrixAt(i, M);
      COL.setRGB(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
      mesh.setColorAt(i, COL);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const group = new THREE.Group();
    group.add(mesh);
    this.scene.add(group);
    this.terrain = { group, mesh, count };
  }

  // Falling waterfall cubes plus pool spray. Each instance keeps a live
  // position/velocity that is advanced every frame and recycled on impact.
  _rebuildWater() {
    this._disposeLayer(this.water);
    this._disposeLayer(this.pool);
    this._disposeLayer(this.lake);

    const opts = this.opts;
    const f = this.map.features;
    const cx = opts.mesaCenter[0];
    const cz = opts.mesaCenter[1];
    const dirX = Math.cos(opts.fallAngle);
    const dirZ = Math.sin(opts.fallAngle);
    const perpX = -dirZ;
    const perpZ = dirX;
    this.poolCenter = { x: f.poolCx, z: f.poolCz, y: f.poolY, r: f.poolR };

    const count = opts.fallCount;
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.85, 1.5, 0.85),
      new THREE.MeshLambertMaterial({
        color: 0xcdeeff, transparent: true, opacity: 0.85, depthWrite: false, emissive: 0x1c4460,
      }),
      count
    );
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    // Emitter sits on the spillway notch at lake level and aims at the pool, so
    // the sheet follows the carved chute rather than free-falling in open air.
    const startX = cx + dirX * (opts.mesaRadius - 1);
    const startZ = cz + dirZ * (opts.mesaRadius - 1);
    const fallTime = Math.sqrt(Math.max(0.2, 2 * Math.max(1, f.lakeY - f.poolY) / 32));
    const aimVX = (f.poolCx - startX) / fallTime;
    const aimVZ = (f.poolCz - startZ) / fallTime;

    const spawn = (i, initial) => {
      const off = (Math.random() - 0.5) * opts.fallWidth;
      pos[i * 3] = startX + perpX * off;
      pos[i * 3 + 1] = initial
        ? f.poolY + Math.random() * (f.lakeY - f.poolY)
        : f.lakeY + Math.random() * 1.5;
      pos[i * 3 + 2] = startZ + perpZ * off;
      vel[i * 3] = aimVX * (0.7 + Math.random() * 0.5) + (Math.random() - 0.5) * 1.4;
      vel[i * 3 + 1] = -Math.random() * 2.5;
      vel[i * 3 + 2] = aimVZ * (0.7 + Math.random() * 0.5) + (Math.random() - 0.5) * 1.4;
    };
    for (let i = 0; i < count; i++) spawn(i, true);
    S.set(1, 1, 1);
    for (let i = 0; i < count; i++) {
      V.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      M.compose(V, Q, S);
      mesh.setMatrixAt(i, M);
    }

    // Pool spray: slow cubes rising from the impact point and recycling.
    const sprayCount = Math.round(count * 0.18);
    const spray = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
      new THREE.MeshLambertMaterial({
        color: 0xeaf7ff, transparent: true, opacity: 0.55, depthWrite: false, emissive: 0x2a4a5e,
      }),
      sprayCount
    );
    spray.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const spos = new Float32Array(sprayCount * 3);
    const svel = new Float32Array(sprayCount * 3);
    const spawnSpray = (i, initial) => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * f.poolR * 0.9;
      spos[i * 3] = f.poolCx + Math.cos(a) * r;
      spos[i * 3 + 1] = initial ? f.poolY + Math.random() * 6 : f.poolY + Math.random() * 0.8;
      spos[i * 3 + 2] = f.poolCz + Math.sin(a) * r;
      svel[i * 3] = Math.cos(a) * (1 + Math.random() * 3);
      svel[i * 3 + 1] = 4 + Math.random() * 7;
      svel[i * 3 + 2] = Math.sin(a) * (1 + Math.random() * 3);
    };
    for (let i = 0; i < sprayCount; i++) spawnSpray(i, true);

    const group = new THREE.Group();
    group.add(mesh);
    group.add(spray);
    this.scene.add(group);
    this.water = { group, mesh, pos, vel, spawn, spray, spos, svel, spawnSpray, sprayCount };

    this.pool = this._addWaterDisc(f.poolCx, f.poolCz, f.poolY, f.poolR * 1.15, 0x2f7fb5, 0.78);
    this.lake = this._addWaterDisc(cx, cz, f.lakeY, f.lakeR, 0x3f95c8, 0.82);
  }

  _addWaterDisc(cx, cz, y, r, colorHex, opacity) {
    const step = 2;
    const cells = [];
    for (let dz = -r; dz <= r; dz += step) {
      for (let dx = -r; dx <= r; dx += step) {
        if (dx * dx + dz * dz <= r * r) cells.push([dx, dz]);
      }
    }
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(step, 0.5, step),
      new THREE.MeshLambertMaterial({ color: colorHex, transparent: true, opacity, depthWrite: false }),
      cells.length
    );
    S.set(1, 1, 1);
    for (let i = 0; i < cells.length; i++) {
      V.set(cx + cells[i][0], y, cz + cells[i][1]);
      M.compose(V, Q, S);
      mesh.setMatrixAt(i, M);
    }
    mesh.instanceMatrix.needsUpdate = true;
    const group = new THREE.Group();
    group.add(mesh);
    this.scene.add(group);
    return { group, mesh, cells, baseY: y, cx, cz };
  }

  // Voxel clouds grouped into lumpy clusters that wrap the mountain waist, so
  // peaks poke through them and they occlude what sits behind. Unlit and
  // translucent so they read as vapour rather than floating rock.
  _rebuildClouds() {
    this._disposeLayer(this.clouds);
    const opts = this.opts;
    const count = opts.cloudCount;
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.62, depthWrite: false, fog: true }),
      count
    );
    mesh.renderOrder = 2;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const base = new Float32Array(count * 3);
    const scl = new Float32Array(count * 3);
    const extent = opts.resolution * 1.35;

    let i = 0;
    while (i < count) {
      // Cluster centre on a ring that starts inside the cliff line, so part of
      // the layer is genuinely threaded through the mountain.
      const a = Math.random() * Math.PI * 2;
      const ring = opts.mesaRadius * 0.8 + Math.pow(Math.random(), 0.7) * extent * 0.85;
      const ccx = Math.cos(a) * ring;
      const ccz = Math.sin(a) * ring;
      const ccy = opts.cloudY + (Math.random() - 0.5) * 4;
      const w = 6 + Math.random() * 7;
      const d = 6 + Math.random() * 7;
      const puffs = Math.min(count - i, 6 + Math.floor(Math.random() * 6));
      for (let p = 0; p < puffs; p++, i++) {
        base[i * 3] = ccx + (Math.random() - 0.5) * w * 1.5;
        base[i * 3 + 1] = ccy + (Math.random() - 0.5) * w * 0.75;
        base[i * 3 + 2] = ccz + (Math.random() - 0.5) * d * 1.5;
        const lump = 0.45 + Math.random() * 0.85;
        scl[i * 3] = w * lump;
        scl[i * 3 + 1] = Math.max(2.5, w * lump * 0.7);
        scl[i * 3 + 2] = d * lump;
      }
    }

    // Brighter toward the top of each cluster, so the layer keeps some volume.
    for (let k = 0; k < count; k++) {
      const rel = clamp((base[k * 3 + 1] - opts.cloudY) / 8 + 0.5, 0, 1);
      const t = 0.78 + rel * 0.22;
      COL.setRGB(t, t, Math.min(1, t + 0.05));
      mesh.setColorAt(k, COL);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const group = new THREE.Group();
    group.add(mesh);
    this.scene.add(group);
    this.clouds = { group, mesh, base, scl, extent, speed: opts.cloudSpeed };
  }

  _applyAtmosphere() {
    const opts = this.opts;
    const pal = PALETTES[opts.timeOfDay] || PALETTES.dusk;

    // The sky is a CSS gradient behind the transparent canvas; fog picks the
    // horizon colour so terrain dissolves into it.
    this.scene.background = null;
    this.container.style.setProperty("--sky-top", pal.skyTop);
    this.container.style.setProperty("--sky-horizon", pal.skyHorizon);
    this.scene.fog = new THREE.FogExp2(new THREE.Color(pal.fog).getHex(), opts.fogDensity);

    const sp = pal.sunPos;
    this.sun.color.setRGB(pal.sun[0], pal.sun[1], pal.sun[2]);
    this.sun.position.set(sp[0], sp[1], sp[2]);
    this.sun.target.position.set(0, 0, 0);
    this.sun.intensity = opts.lightIntensity;
    this.sunDistance = Math.hypot(sp[0], sp[1], sp[2]);

    if (!this.sunDisc) {
      const mat = new THREE.SpriteMaterial({
        map: makeGlowTexture(), transparent: true, depthWrite: false, opacity: 0.9,
      });
      this.sunDisc = new THREE.Sprite(mat);
      this.scene.add(this.sunDisc);
    }
    this.sunDisc.material.color.set(pal.sunColor);
    this.sunDisc.scale.setScalar(opts.resolution * 0.22);
    this.sunDisc.position.copy(this.sun.position).multiplyScalar(1.9);

    const cam = this.sun.shadow.camera;
    const d = opts.resolution * 0.95;
    cam.left = -d; cam.right = d; cam.top = d; cam.bottom = -d;
    cam.near = 1; cam.far = this.sunDistance * 2.4;
    cam.updateProjectionMatrix();

    this.hemi.color.setRGB(pal.hemi[0], pal.hemi[1], pal.hemi[2]);
    this.hemi.intensity = opts.hemiIntensity;

    this.renderer.shadowMap.enabled = opts.shadows;
    this.sun.castShadow = opts.shadows;
    if (this.terrain) {
      this.terrain.mesh.castShadow = opts.shadows;
      this.terrain.mesh.receiveShadow = opts.shadows;
    }
    this.controls.autoRotate = opts.autoRotate;
    this.controls.autoRotateSpeed = opts.rotateSpeed;
    this.controls.target.set(0, opts.mesaTop * 0.55, 0);
    this.controls.update();
  }

  _frameCamera() {
    const opts = this.opts;
    this.controls.target.set(0, opts.mesaTop * 0.55, 0);
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    if (!isFinite(dir.x) || dir.lengthSq() < 1e-6) dir.set(0.75, 0.5, 1).normalize();
    dir.y = Math.max(dir.y, 0.22);
    this.camera.position.copy(this.controls.target).addScaledVector(dir, opts.resolution * 0.98);
    this.controls.update();
  }

  _onResize() {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  start() {
    if (!this._raf) { this._last = performance.now(); this._raf = requestAnimationFrame(this._loop); }
  }

  stop() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
  }

  _loop(now) {
    const dt = Math.min(0.05, (now - this._last) / 1000);
    this._last = now;
    this.time += dt;
    this._updateWater(dt);
    this._updateClouds(dt);
    this._updateDiscs();
    this._updateSunOrbit();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this._raf = requestAnimationFrame(this._loop);
  }

  _updateWater(dt) {
    if (!this.water) return;
    const { mesh, pos, vel, spawn, spray, spos, svel, spawnSpray, sprayCount } = this.water;
    const pool = this.poolCenter;
    const n = pos.length / 3;
    S.set(1, 1, 1);
    for (let i = 0; i < n; i++) {
      vel[i * 3 + 1] -= 32 * dt;
      pos[i * 3] += vel[i * 3] * dt;
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      if (pos[i * 3 + 1] < pool.y) spawn(i, false);
      V.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      M.compose(V, Q, S);
      mesh.setMatrixAt(i, M);
    }
    mesh.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < sprayCount; i++) {
      svel[i * 3 + 1] -= 17 * dt;
      spos[i * 3] += svel[i * 3] * dt;
      spos[i * 3 + 1] += svel[i * 3 + 1] * dt;
      spos[i * 3 + 2] += svel[i * 3 + 2] * dt;
      if (spos[i * 3 + 1] < pool.y) spawnSpray(i, false);
      V.set(spos[i * 3], spos[i * 3 + 1], spos[i * 3 + 2]);
      M.compose(V, Q, S);
      spray.setMatrixAt(i, M);
    }
    spray.instanceMatrix.needsUpdate = true;
  }

  _updateClouds(dt) {
    if (!this.clouds) return;
    const { mesh, base, scl, extent, speed } = this.clouds;
    const n = base.length / 3;
    for (let i = 0; i < n; i++) {
      let x = base[i * 3] + this.time * speed;
      x = ((x + extent) % (extent * 2)) - extent;
      V.set(x, base[i * 3 + 1], base[i * 3 + 2]);
      S.set(scl[i * 3], scl[i * 3 + 1], scl[i * 3 + 2]);
      M.compose(V, Q, S);
      mesh.setMatrixAt(i, M);
    }
    S.set(1, 1, 1);
    mesh.instanceMatrix.needsUpdate = true;
  }

  _updateDiscs() {
    for (const disc of [this.pool, this.lake]) {
      if (!disc) continue;
      const { mesh, cells, baseY, cx, cz } = disc;
      for (let i = 0; i < cells.length; i++) {
        const wob = Math.sin(this.time * 1.7 + cells[i][0] * 0.22 + cells[i][1] * 0.18) * 0.16;
        V.set(cx + cells[i][0], baseY + wob, cz + cells[i][1]);
        M.compose(V, Q, S);
        mesh.setMatrixAt(i, M);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  _updateSunOrbit() {
    if (!this.opts?.sunOrbit) return;
    const a = this.time * 0.05;
    const r = this.sunDistance || 140;
    this.sun.position.set(Math.cos(a) * r, r * 0.5, Math.sin(a) * r);
    if (this.sunDisc) this.sunDisc.position.copy(this.sun.position).multiplyScalar(1.9);
  }

  dispose() {
    this.stop();
    window.removeEventListener("resize", this._onResize);
    this._resizeObs?.disconnect();
    this._disposeLayer(this.terrain);
    this._disposeLayer(this.water);
    this._disposeLayer(this.clouds);
    this._disposeLayer(this.pool);
    this._disposeLayer(this.lake);
    if (this.sunDisc) {
      this.scene.remove(this.sunDisc);
      this.sunDisc.material.map?.dispose();
      this.sunDisc.material.dispose();
      this.sunDisc = null;
    }
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
