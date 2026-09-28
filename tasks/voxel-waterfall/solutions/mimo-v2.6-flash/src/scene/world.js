// Three.js voxel world: terrain shell, animated waterfalls, clouds, vegetation,
// sky/lighting, camera framing, and the animation loop.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  SEA_LEVEL,
  carveWaterfalls,
  collectSea,
  generateClouds,
  generateHeightmap,
  generateVegetation,
} from './heightmap.js';

const HEAVY_KEYS = [
  'seed',
  'gridSize',
  'waterfallCount',
  'waterfallWidth',
  'cloudHeight',
  'cloudDensity',
  'treeDensity',
];

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function lerpColor(a, b, t) {
  return a.clone().lerp(b, t);
}

function skyPalette(timeOfDay) {
  const dawn = {
    horizon: new THREE.Color('#ffb894'),
    zenith: new THREE.Color('#4a6bb5'),
    sun: new THREE.Color('#ff9d5c'),
    fog: new THREE.Color('#edc0a6'),
  };
  const noon = {
    horizon: new THREE.Color('#d6ecf8'),
    zenith: new THREE.Color('#4f8fd6'),
    sun: new THREE.Color('#fff3de'),
    fog: new THREE.Color('#cfe4ef'),
  };
  const dusk = {
    horizon: new THREE.Color('#ff9470'),
    zenith: new THREE.Color('#45598f'),
    sun: new THREE.Color('#ff8a5a'),
    fog: new THREE.Color('#e0aa98'),
  };
  const t = THREE.MathUtils.clamp(timeOfDay, 0, 1);
  const from = t < 0.5 ? dawn : noon;
  const to = t < 0.5 ? noon : dusk;
  const k = t < 0.5 ? t * 2 : (t - 0.5) * 2;
  return {
    horizon: lerpColor(from.horizon, to.horizon, k),
    zenith: lerpColor(from.zenith, to.zenith, k),
    sun: lerpColor(from.sun, to.sun, k),
    fog: lerpColor(from.fog, to.fog, k),
  };
}

function sunDirection(timeOfDay) {
  const t = THREE.MathUtils.clamp(timeOfDay, 0, 1);
  const elevDeg = 6 + 68 * Math.sin(t * Math.PI);
  const azimDeg = -70 + 140 * t;
  const E = (elevDeg * Math.PI) / 180;
  const A = (azimDeg * Math.PI) / 180;
  return new THREE.Vector3(
    Math.sin(A) * Math.cos(E),
    Math.sin(E),
    Math.cos(A) * Math.cos(E),
  ).normalize();
}

/** Terrain voxel colour by height / slope — grass foot, rock, snowy crest. */
function terrainColor(h, slope, snowline, rockline, out) {
  if (h >= snowline) {
    out.setRGB(1.05, 1.1, 1.25);
  } else if (h >= rockline || slope > 4.5) {
    const t = (h - rockline) / Math.max(1, snowline - rockline);
    out.setRGB(0.46 + t * 0.15, 0.43 + t * 0.13, 0.4 + t * 0.12);
  } else {
    const t = h / rockline;
    out.setRGB(0.28 + t * 0.16, 0.46 - t * 0.06, 0.2 + t * 0.04);
  }
  return out;
}

function makeWaterMaterial() {
  const mat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.92,
    depthWrite: true,
  });
  mat.userData.uTime = { value: 0 };
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = mat.userData.uTime;
    shader.vertexShader =
      'attribute float aFlow;\nvarying float vFlow;\nvarying float vInstY;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vInstY = instanceMatrix[3].y;
        #else
          vInstY = 0.0;
        #endif
        vFlow = aFlow;`,
      );
    shader.fragmentShader =
      'uniform float uTime;\nvarying float vFlow;\nvarying float vInstY;\n' +
      shader.fragmentShader
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
        {
          float isSea = 1.0 - step(-0.5, vFlow);
          float phase = vFlow + isSea * 1.0;
          float wave = sin(phase * 0.9 - uTime * 5.0 + vInstY * 1.3);
          float shimmer = 0.9 + 0.16 * wave;
          diffuseColor.rgb *= mix(1.0, shimmer, 1.0 - isSea * 0.5);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0), smoothstep(0.9, 1.06, wave) * 0.3 * (1.0 - isSea));
        }`,
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
        // Waterfalls / foam self-lift so they read on shaded faces; sea stays
        // flat-lit to match the outer ocean plane.
        totalEmissiveRadiance += vec3(0.1, 0.24, 0.38) * step(-0.5, vFlow);`,
        );
  };
  return mat;
}

export class VoxelWorld {
  constructor(container) {
    this.container = container;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.5,
      2000,
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 30;
    this.controls.maxDistance = 900;

    // Lights
    this.sun = new THREE.DirectionalLight(0xffffff, 1.6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0004;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.hemi = new THREE.HemisphereLight(0xbfd8ff, 0x6b5a4a, 0.65);
    this.scene.add(this.hemi);

    // Sky dome
    this.skyUniforms = {
      uZenith: { value: new THREE.Color('#4f8fd6') },
      uHorizon: { value: new THREE.Color('#d6ecf8') },
      uSunColor: { value: new THREE.Color('#fff3de') },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    };
    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uZenith;
        uniform vec3 uHorizon;
        uniform vec3 uSunColor;
        uniform vec3 uSunDir;
        varying vec3 vDir;
        void main() {
          vec3 dir = normalize(vDir);
          float h = dir.y;
          vec3 col = mix(uHorizon, uZenith, pow(clamp(h, 0.0, 1.0), 0.55));
          if (h < 0.0) col = mix(uHorizon, uHorizon * 0.7, clamp(-h * 2.5, 0.0, 1.0));
          float sun = max(dot(dir, normalize(uSunDir)), 0.0);
          col += uSunColor * (pow(sun, 40.0) * 1.1 + pow(sun, 5.0) * 0.22);
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16), skyMat);
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);

    this.terrainMesh = null;
    this.waterMesh = null;
    this.cloudMesh = null;
    this.propMesh = null;
    this.waterMaterial = makeWaterMaterial();
    this.fog = new THREE.Fog(0xcfe4ef, 200, 700);
    this.scene.fog = this.fog;

    this.stats = { grid: 0, terrain: 0, water: 0, clouds: 0, props: 0, total: 0 };
    this.prevOptions = null;
    this.clock = new THREE.Clock();

    this._onResize = () => this.resize();
    this.resizeObserver = new ResizeObserver(this._onResize);
    this.resizeObserver.observe(container);

    this._disposed = false;
  }

  update(options) {
    const prev = this.prevOptions;
    const heavyChanged =
      !prev || HEAVY_KEYS.some((k) => prev[k] !== options[k]);
    if (heavyChanged) this.rebuild(options);
    this.applyEnvironment(options);
    this.prevOptions = { ...options };
    this.statsListener?.(this.stats);
  }

  rebuild(options) {
    const { seed, gridSize: N, waterfallCount, waterfallWidth } = options;

    this._disposeMesh('terrainMesh');
    this._disposeMesh('waterMesh');
    this._disposeMesh('cloudMesh');
    this._disposeMesh('propMesh');
    this._disposeMesh('oceanMesh');

    // --- terrain ---------------------------------------------------------
    const heights = generateHeightmap(N, seed);
    let maxH = 0;
    for (let k = 0; k < heights.length; k++) {
      if (heights[k] > maxH) maxH = heights[k];
    }
    // Percentile colour lines over LAND only (sea cells would skew them).
    const sample = [];
    for (let k = 0; k < heights.length; k += 3) {
      if (heights[k] > SEA_LEVEL) sample.push(heights[k]);
    }
    sample.sort((a, b) => a - b);
    const pct = (q) => sample[Math.min(sample.length - 1, Math.floor(q * sample.length))];
    const snowline = pct(0.85);
    const rockline = pct(0.3);

    const { cells, pathCells } = carveWaterfalls(
      heights,
      N,
      seed,
      waterfallCount,
      waterfallWidth,
    );
    collectSea(heights, N, cells);

    // Shell voxels: top cube + side cubes exposed above the lowest neighbour.
    const mats = [];
    const cols = [];
    const color = new THREE.Color();
    const half = N / 2;
    let count = 0;

    // First pass: count
    const topIndex = new Int32Array(N * N);
    const sideBottom = new Int32Array(N * N); // lowest y to emit for column (inclusive)
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const idx = j * N + i;
        const h = heights[idx];
        let minNb = h;
        for (const [di, dj] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const ii = i + di;
          const jj = j + dj;
          if (ii < 0 || ii >= N || jj < 0 || jj >= N) {
            minNb = Math.min(minNb, h - 1);
            continue;
          }
          minNb = Math.min(minNb, heights[jj * N + ii]);
        }
        topIndex[idx] = h;
        // Always emit at least the top cube, even in local pits where every
        // neighbour is higher (minNb > h).
        sideBottom[idx] = Math.max(Math.min(minNb, h - 1) + 1, h - 40); // sanity cap
        count += h - sideBottom[idx] + 1;
      }
    }

    const terrain = new THREE.InstancedMesh(boxGeometry, this._terrainMaterial(), count);
    terrain.castShadow = true;
    terrain.receiveShadow = true;
    const m = new THREE.Matrix4();
    let p = 0;
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const idx = j * N + i;
        const h = topIndex[idx];
        const x = i - half;
        const z = j - half;
        const slope =
          h -
          Math.min(
            i + 1 < N ? heights[idx + 1] : h,
            i > 0 ? heights[idx - 1] : h,
            j + 1 < N ? heights[idx + N] : h,
            j > 0 ? heights[idx - N] : h,
          );
        const bottom = sideBottom[idx];
        for (let y = bottom; y <= h; y++) {
          m.setPosition(x, y, z);
          terrain.setMatrixAt(p, m);
          if (y === h) {
            terrainColor(h, slope, snowline, rockline, color);
          } else {
            // side strata: darker rock with layered tint
            const layer = ((y % 5) + 5) % 5;
            const shade = 0.72 + layer * 0.045;
            color.setRGB(0.44 * shade, 0.4 * shade, 0.36 * shade);
            if (h < SEA_LEVEL + 2 && y <= SEA_LEVEL) {
              color.setRGB(0.32, 0.3, 0.27);
            }
          }
          // slight variation
          const v = 0.94 + ((i * 7 + j * 13 + y * 3) % 10) * 0.012;
          terrain.setColorAt(p, color.clone().multiplyScalar(v));
          p++;
        }
      }
    }
    terrain.instanceMatrix.needsUpdate = true;
    if (terrain.instanceColor) terrain.instanceColor.needsUpdate = true;
    terrain.computeBoundingSphere();
    this.scene.add(terrain);
    this.terrainMesh = terrain;
    const terrainVoxels = p;

    // --- water -----------------------------------------------------------
    let waterCount = cells.size;
    const water = new THREE.InstancedMesh(boxGeometry, this.waterMaterial, Math.max(1, waterCount));
    const flowAttr = new Float32Array(Math.max(1, waterCount));
    const wColor = new THREE.Color();
    let wp = 0;
    let fcn = 0;
    let fcx = 0;
    let fcy = 0;
    let fcz = 0;
    for (const [k, v] of cells) {
      const [x, y, z] = k.split(',').map(Number);
      m.setPosition(x, y, z);
      water.setMatrixAt(wp, m);
      flowAttr[wp] = v.flow;
      if (v.kind === 0) wColor.setRGB(0.1, 0.36, 0.52); // sea
      else if (v.kind === 2) wColor.setRGB(0.88, 0.96, 1.0); // foam
      else {
        wColor.setRGB(0.45, 0.76, 1.0); // waterfall
        fcx += x;
        fcy += y;
        fcz += z;
        fcn++;
      }
      water.setColorAt(wp, wColor);
      wp++;
    }
    water.count = wp;
    water.geometry.setAttribute(
      'aFlow',
      new THREE.InstancedBufferAttribute(flowAttr, 1),
    );
    water.instanceMatrix.needsUpdate = true;
    if (water.instanceColor) water.instanceColor.needsUpdate = true;
    water.computeBoundingSphere();
    this.scene.add(water);
    this.waterMesh = water;

    // Ocean plane continues the sea past the grid edge (slightly below the
    // voxel sea tops at y = SEA_LEVEL + 0.5 to avoid z-fighting).
    if (!this._oceanMat) {
      this._oceanMat = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setRGB(0.11, 0.38, 0.55),
      });
    }
    const ocean = new THREE.Mesh(new THREE.PlaneGeometry(N * 5, N * 5), this._oceanMat);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = SEA_LEVEL + 0.49;
    this.scene.add(ocean);
    this.oceanMesh = ocean;

    // --- clouds ----------------------------------------------------------
    const cloudPos = generateClouds(
      N,
      seed,
      options.cloudHeight,
      options.cloudDensity,
    );
    const cloudN = cloudPos.length / 3;
    const clouds = new THREE.InstancedMesh(boxGeometry, this._cloudMaterial(), Math.max(1, cloudN));
    clouds.count = cloudN;
    const cColor = new THREE.Color();
    for (let c = 0; c < cloudN; c++) {
      m.setPosition(cloudPos[c * 3], cloudPos[c * 3 + 1], cloudPos[c * 3 + 2]);
      clouds.setMatrixAt(c, m);
      const v = 0.9 + ((c * 17) % 10) * 0.01;
      cColor.setRGB(v, v, Math.min(1, v + 0.02));
      clouds.setColorAt(c, cColor);
    }
    clouds.instanceMatrix.needsUpdate = true;
    if (clouds.instanceColor) clouds.instanceColor.needsUpdate = true;
    clouds.computeBoundingSphere();
    this.scene.add(clouds);
    this.cloudMesh = clouds;

    // --- vegetation ------------------------------------------------------
    const veg = generateVegetation(heights, N, seed, options.treeDensity, pathCells);
    const trunkN = veg.trunks.length / 3;
    const leafN = veg.leaves.length / 3;
    const props = new THREE.InstancedMesh(boxGeometry, this._propMaterial(), Math.max(1, trunkN + leafN));
    let pp = 0;
    for (let t = 0; t < trunkN; t++) {
      m.setPosition(veg.trunks[t * 3], veg.trunks[t * 3 + 1], veg.trunks[t * 3 + 2]);
      props.setMatrixAt(pp, m);
      color.setRGB(0.36, 0.24, 0.13);
      props.setColorAt(pp, color);
      pp++;
    }
    for (let t = 0; t < leafN; t++) {
      m.setPosition(veg.leaves[t * 3], veg.leaves[t * 3 + 1], veg.leaves[t * 3 + 2]);
      props.setMatrixAt(pp, m);
      const v = 0.85 + ((t * 7) % 8) * 0.03;
      color.setRGB(0.16 * v, 0.42 * v, 0.14 * v);
      props.setColorAt(pp, color);
      pp++;
    }
    props.count = pp;
    props.instanceMatrix.needsUpdate = true;
    if (props.instanceColor) props.instanceColor.needsUpdate = true;
    props.castShadow = true;
    props.receiveShadow = true;
    props.computeBoundingSphere();
    this.scene.add(props);
    this.propMesh = props;

    // --- camera framing (full view on load, angled at the waterfall face) --
    const dist = N * 1.12;
    this.controls.target.set(0, maxH * 0.35, 0);
    const az = fcn
      ? Math.atan2((fcx / fcn) * 0.5 + N * 0.18, (fcz / fcn) * 0.5 + N * 0.55)
      : Math.atan2(0.62, 0.78);
    const horiz = dist * 0.99;
    this.camera.position.set(Math.sin(az) * horiz, dist * 0.5, Math.cos(az) * horiz);
    this.controls.update();

    // shadow camera covers the island
    const sc = this.sun.shadow.camera;
    const span = N * 0.75;
    sc.left = -span;
    sc.right = span;
    sc.top = span;
    sc.bottom = -span;
    sc.near = 1;
    sc.far = N * 3;
    sc.updateProjectionMatrix();

    this.maxH = maxH;
    this.gridN = N;

    this.stats = {
      grid: `${N} x ${N}`,
      terrain: terrainVoxels,
      water: wp,
      clouds: cloudN,
      props: pp,
      total: terrainVoxels + wp + cloudN + pp,
    };
  }

  applyEnvironment(options) {
    const pal = skyPalette(options.timeOfDay);
    const sunDir = sunDirection(options.timeOfDay);

    this.skyUniforms.uZenith.value.copy(pal.zenith);
    this.skyUniforms.uHorizon.value.copy(pal.horizon);
    this.skyUniforms.uSunColor.value.copy(pal.sun);
    this.skyUniforms.uSunDir.value.copy(sunDir);

    const N = this.gridN || options.gridSize;
    this.sun.position.copy(sunDir).multiplyScalar(N * 1.6);
    this.sun.position.y = Math.max(this.sun.position.y, N * 0.3);
    this.sun.target.position.set(0, (this.maxH || 30) * 0.3, 0);
    this.sun.color.copy(pal.sun);
    this.sun.intensity = 1.1 + 0.7 * Math.sin(options.timeOfDay * Math.PI);

    this.hemi.color.copy(pal.zenith);
    this.hemi.groundColor.setRGB(0.42, 0.36, 0.3);
    this.hemi.intensity = 0.72;

    this.fog.color.copy(pal.fog);
    this.scene.background = pal.fog;
    this.fog.near = N * 0.55;
    this.fog.far = N * (5.5 - options.fogDensity * 4.0);

    this.controls.autoRotate = options.autoRotate;
    this.controls.autoRotateSpeed = 0.4;
  }

  _terrainMaterial() {
    if (!this._terrainMat) {
      this._terrainMat = new THREE.MeshLambertMaterial();
    }
    return this._terrainMat;
  }

  _cloudMaterial() {
    if (!this._cloudMat) {
      this._cloudMat = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0.9,
        depthWrite: true,
        emissive: 0x9aa0ac,
        emissiveIntensity: 0.55,
      });
    }
    return this._cloudMat;
  }

  _propMaterial() {
    if (!this._propMat) {
      this._propMat = new THREE.MeshLambertMaterial();
    }
    return this._propMat;
  }

  _disposeMesh(key) {
    const mesh = this[key];
    if (!mesh) return;
    this.scene.remove(mesh);
    if (typeof mesh.dispose === 'function') mesh.dispose();
    this[key] = null;
  }

  resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  start() {
    const tick = () => {
      if (this._disposed) return;
      this._raf = requestAnimationFrame(tick);
      const dt = this.clock.getDelta();
      this.waterMaterial.userData.uTime.value += dt;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  dispose() {
    this._disposed = true;
    cancelAnimationFrame(this._raf);
    this.resizeObserver.disconnect();
    this._disposeMesh('terrainMesh');
    this._disposeMesh('waterMesh');
    this._disposeMesh('cloudMesh');
    this._disposeMesh('propMesh');
    this._disposeMesh('oceanMesh');
    this.controls.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
