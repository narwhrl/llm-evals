import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GRID, generateHeightmap, makeColorFn } from './terrain.js';
import { buildTerrainMesh, buildWaterMesh } from './mesher.js';
import { carveWater, createWaterMaterial } from './water.js';
import { buildClouds } from './clouds.js';
import { buildTrees } from './vegetation.js';
import { createSky } from './sky.js';

// Option keys that force a full world regeneration.
const WORLD_KEYS = ['seed', 'heightScale', 'noiseScale', 'snowLine', 'fallHeight', 'channelWidth'];
const CLOUD_KEYS = ['cloudCoverage', 'cloudHeight'];

const INITIAL_CAMERA = new THREE.Vector3(178, 122, 200);
const INITIAL_TARGET = new THREE.Vector3(0, 28, 0);

/**
 * Owns the renderer, camera, controls and all scene content.
 * The React layer only calls applyOptions/resetView and reads stats.
 */
export class VoxelScene {
  constructor(container, options, { onStats } = {}) {
    this.container = container;
    this.options = { ...options };
    this.onStats = onStats;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      55, container.clientWidth / container.clientHeight, 0.5, 2000,
    );
    this.camera.position.copy(INITIAL_CAMERA);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.copy(INITIAL_TARGET);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.autoRotate = options.autoRotate;
    this.controls.autoRotateSpeed = 0.55;
    this.controls.minDistance = 50;
    this.controls.maxDistance = 420;
    this.controls.minPolarAngle = 0.12;
    this.controls.maxPolarAngle = 1.5;
    this.controls.update();

    // persistent water material: uniforms survive geometry rebuilds
    this.waterMaterial = createWaterMaterial();
    this.waterUniforms = this.waterMaterial.uniforms;

    this.sky = createSky(this.scene, this.waterUniforms);
    this.sky.setTimeOfDay(options.timeOfDay);
    this.waterUniforms.uFlow.value = options.flowSpeed;

    // ground skirt: hides the map border and fades into the horizon fog
    this.skirt = new THREE.Mesh(
      new THREE.PlaneGeometry(1400, 1400),
      new THREE.MeshLambertMaterial({ color: 0x4d7034 }),
    );
    this.skirt.rotation.x = -Math.PI / 2;
    this.skirt.position.y = 0.55;
    this.skirt.receiveShadow = true;
    this.scene.add(this.skirt);

    this.worldGroup = null;
    this.clouds = null;
    this.quadTotal = 0;
    this.waterCells = 0;
    this.treeCount = 0;

    this._buildWorld();
    this._buildClouds();

    this.clock = new THREE.Clock();
    this.elapsed = 0;
    this._frames = 0;
    this._fpsAccum = 0;

    this._resizeObserver = new ResizeObserver(() => this._resize());
    this._resizeObserver.observe(container);

    this._raf = 0;
    this._start();
  }

  // ------------------------------------------------------------ building ---

  _disposeWorld() {
    if (!this.worldGroup) return;
    for (const child of this.worldGroup.children) {
      child.geometry.dispose();
      if (child.material !== this.waterMaterial) child.material.dispose();
    }
    this.scene.remove(this.worldGroup);
    this.worldGroup = null;
  }

  _buildWorld() {
    const o = this.options;
    this._disposeWorld();

    const gen = generateHeightmap(o);
    this.pristine = gen.heights;
    this.maxH = gen.maxH;

    const heights = gen.heights.slice();
    const info = carveWater(heights, o); // mutates heights
    this.heights = heights;
    this.water = info.water;
    this.waterUniforms.uFallPos.value.set(info.fallWorldX, 0, info.fallWorldZ);
    this.waterUniforms.uFallTopY.value = info.fallTopY;

    const group = new THREE.Group();
    const colorFn = makeColorFn(heights, info.water, {
      seed: o.seed, snowLine: o.snowLine, maxH: this.maxH,
    });
    const terrain = buildTerrainMesh(heights, info.water, colorFn);
    group.add(terrain.mesh);

    const water = buildWaterMesh(info.water, heights, this.waterMaterial);
    water.mesh.visible = o.waterfall;
    group.add(water.mesh);
    this.waterMesh = water.mesh;

    const trees = buildTrees(heights, info.water, o);
    group.add(trees.mesh);
    this.treesMesh = trees.mesh;
    this.treeCount = trees.count;

    this.waterCells = 0;
    for (let i = 0; i < info.water.length; i++) {
      if (info.water[i] >= 0) this.waterCells++;
    }
    this.quadTotal = terrain.quads + water.quads;
    this.worldGroup = group;
    this.scene.add(group);
  }

  _buildClouds() {
    if (this.clouds) {
      this.clouds.dispose();
      this.scene.remove(this.clouds.group);
    }
    const o = this.options;
    this.clouds = buildClouds({
      seed: o.seed,
      cloudHeight: o.cloudHeight,
      threshold: 0.92 - o.cloudCoverage,
      opacity: o.cloudOpacity,
    });
    this.scene.add(this.clouds.group);
  }
  _rebuildTrees() {
    if (!this.worldGroup || !this.treesMesh) return;
    this.treesMesh.geometry.dispose();
    this.treesMesh.material.dispose();
    this.worldGroup.remove(this.treesMesh);
    const trees = buildTrees(this.heights, this.water, this.options);
    this.worldGroup.add(trees.mesh);
    this.treesMesh = trees.mesh;
    this.treeCount = trees.count;
  }

  // ------------------------------------------------------------- options ---

  applyOptions(next) {
    const prev = this.options;
    this.options = { ...next };

    const worldChanged = WORLD_KEYS.some((k) => next[k] !== prev[k]);
    if (worldChanged) this._buildWorld();
    if (worldChanged
        || CLOUD_KEYS.some((k) => next[k] !== prev[k])
        || next.seed !== prev.seed
        || !this.clouds) this._buildClouds();
    if (!worldChanged && next.treeDensity !== prev.treeDensity) this._rebuildTrees();

    // live updates
    this.waterUniforms.uFlow.value = next.flowSpeed;
    this.sky.setTimeOfDay(next.timeOfDay);
    this.controls.autoRotate = next.autoRotate;
    if (this.waterMesh) this.waterMesh.visible = next.waterfall;
    if (this.clouds) this.clouds.setOpacity(next.cloudOpacity);
  }

  resetView() {
    this.camera.position.copy(INITIAL_CAMERA);
    this.controls.target.copy(INITIAL_TARGET);
    this.controls.update();
  }

  // -------------------------------------------------------------- kernel ---

  _resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  _start() {
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      const dt = this.clock.getDelta();
      this.elapsed += dt;

      this.waterUniforms.uTime.value = this.elapsed;
      if (this.clouds) this.clouds.update(this.elapsed, this.options.cloudDrift);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);

      this._frames++;
      this._fpsAccum += dt;
      if (this._fpsAccum >= 0.5) {
        this.onStats?.({
          fps: Math.round(this._frames / this._fpsAccum),
          quads: this.quadTotal,
          waterCells: this.waterCells,
          trees: this.treeCount,
          grid: GRID,
        });
        this._frames = 0;
        this._fpsAccum = 0;
      }
    };
    tick();
  }

  dispose() {
    cancelAnimationFrame(this._raf);
    this._resizeObserver.disconnect();
    this.controls.dispose();
    this._disposeWorld();
    if (this.clouds) {
      this.clouds.dispose();
      this.scene.remove(this.clouds.group);
    }
    this.waterMaterial.dispose();
    this.sky.dispose();
    this.skirt.geometry.dispose();
    this.skirt.material.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
