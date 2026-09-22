import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const SIZE = 200;
const HALF = SIZE / 2;
const WATER_START = 23;
const WATER_END = -78;

function hash(x, z) {
  const n = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function noise(x, z) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  const a = THREE.MathUtils.lerp(hash(ix, iz), hash(ix + 1, iz), u);
  const b = THREE.MathUtils.lerp(hash(ix, iz + 1), hash(ix + 1, iz + 1), u);
  return THREE.MathUtils.lerp(a, b, v);
}

function gaussian(x, z, cx, cz, sx, sz, height) {
  const dx = (x - cx) / sx;
  const dz = (z - cz) / sz;
  return height * Math.exp(-0.5 * (dx * dx + dz * dz));
}

function streamX(z) {
  return 8 + 4.2 * Math.sin(z * 0.047) + 1.8 * Math.sin(z * 0.13);
}

function index(x, z) {
  return (z + HALF) * SIZE + (x + HALF);
}

function makeTerrain() {
  const heights = new Uint8Array(SIZE * SIZE);
  for (let z = -HALF; z < HALF; z++) {
    for (let x = -HALF; x < HALF; x++) {
      const main = gaussian(x, z, -10, 27, 28, 33, 42);
      const west = gaussian(x, z, -56, 37, 23, 29, 36);
      const east = gaussian(x, z, 50, 37, 24, 31, 34);
      const back = gaussian(x, z, -2, 75, 48, 24, 24);
      const highest = Math.max(main, west, east, back);
      const bulk = 2.4 + highest + (main + west + east + back - highest) * 0.17
        + gaussian(x, z, -36, 1, 30, 27, 6)
        + gaussian(x, z, -15, 23, 9, 11, 8)
        + gaussian(x, z, 8, 41, 8, 9, 7);
      const ruggedness = THREE.MathUtils.smoothstep(bulk, 4, 22);
      const variation = (noise(x * 0.077, z * 0.077) - 0.5) * 5.2
        + (noise(x * 0.19, z * 0.19) - 0.5) * 2.1;
      const lip = 9.5 * THREE.MathUtils.smoothstep(z, -13, -9)
        * Math.exp(-Math.pow((x - streamX(z)) / 15, 2));
      heights[index(x, z)] = THREE.MathUtils.clamp(Math.round(bulk + variation * ruggedness + lip), 2, 55);
    }
  }

  // Cut a continuous channel so its surface never climbs back uphill.
  let channelHeight = 55;
  for (let z = WATER_START; z >= WATER_END; z--) {
    const cx = Math.round(streamX(z));
    channelHeight = Math.min(channelHeight, heights[index(cx, z)]);
    for (let dx = -3; dx <= 3; dx++) {
      const x = cx + dx;
      const bank = Math.max(0, Math.abs(dx) - 2);
      heights[index(x, z)] = Math.min(heights[index(x, z)], channelHeight + bank);
    }
  }

  const pondX = streamX(WATER_END);
  for (let z = -89; z <= -68; z++) {
    for (let x = Math.floor(pondX - 16); x <= Math.ceil(pondX + 16); x++) {
      const d = Math.pow((x - pondX) / 15, 2) + Math.pow((z + 79) / 10, 2);
      if (d < 1) heights[index(x, z)] = Math.min(heights[index(x, z)], 3);
    }
  }
  return heights;
}

function heightAt(heights, x, z) {
  if (x < -HALF || x >= HALF || z < -HALF || z >= HALF) return 0;
  return heights[index(x, z)];
}

function makeTerrainMesh(heights) {
  const positions = [];
  const normals = [];
  const colors = [];
  const indices = [];
  const palette = {
    meadow: ['#648e60', '#739763', '#7a9d69', '#5b855f'],
    forest: ['#537e5e', '#608966', '#496f59', '#6a8b67'],
    moss: ['#697a69', '#74846e', '#68766a', '#788778'],
    stone: ['#87908b', '#929993', '#7b8582', '#9ca39b'],
    snow: ['#d4d8ce', '#e2e4dc', '#c6d0cb', '#edf0e8'],
    earth: ['#62675e', '#6d7166', '#737467', '#595f58'],
  };
  const converted = Object.fromEntries(Object.entries(palette).map(([key, values]) => [key, values.map((value) => new THREE.Color(value))]));

  function addQuad(vertices, normal, color) {
    const offset = positions.length / 3;
    for (const [x, y, z] of vertices) {
      positions.push(x, y, z);
      normals.push(...normal);
      colors.push(color.r, color.g, color.b);
    }
    indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
  }

  for (let z = -HALF; z < HALF; z++) {
    for (let x = -HALF; x < HALF; x++) {
      const h = heightAt(heights, x, z);
      const slope = Math.max(
        Math.abs(h - heightAt(heights, x - 1, z)),
        Math.abs(h - heightAt(heights, x + 1, z)),
        Math.abs(h - heightAt(heights, x, z - 1)),
        Math.abs(h - heightAt(heights, x, z + 1)),
      );
      const choice = Math.floor(hash(x * 3, z * 7) * 4);
      const topType = h > 39 ? 'snow' : h > 25 || slope > 4 ? 'stone' : h > 14 ? 'moss' : h > 5 ? 'forest' : 'meadow';
      const x0 = x - 0.5;
      const x1 = x + 0.5;
      const z0 = z - 0.5;
      const z1 = z + 0.5;
      addQuad([[x0, h, z1], [x1, h, z1], [x1, h, z0], [x0, h, z0]], [0, 1, 0], converted[topType][choice]);

      function wall(neighbor, vertices, normal) {
        for (let y = neighbor; y < h; y++) {
          const type = y > 37 ? 'snow' : y > 23 ? 'stone' : y > h - 3 && h < 18 ? 'forest' : 'earth';
          const color = converted[type][Math.floor(hash(x + y * 7, z - y * 3) * 4)];
          addQuad(vertices(y, y + 1), normal, color);
        }
      }
      const front = heightAt(heights, x, z - 1);
      if (h > front) wall(front, (a, b) => [[x0, a, z0], [x0, b, z0], [x1, b, z0], [x1, a, z0]], [0, 0, -1]);
      const back = heightAt(heights, x, z + 1);
      if (h > back) wall(back, (a, b) => [[x1, a, z1], [x1, b, z1], [x0, b, z1], [x0, a, z1]], [0, 0, 1]);
      const left = heightAt(heights, x - 1, z);
      if (h > left) wall(left, (a, b) => [[x0, a, z1], [x0, b, z1], [x0, b, z0], [x0, a, z0]], [-1, 0, 0]);
      const right = heightAt(heights, x + 1, z);
      if (h > right) wall(right, (a, b) => [[x1, a, z0], [x1, b, z0], [x1, b, z1], [x1, a, z1]], [1, 0, 0]);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  const material = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.FrontSide });
  return new THREE.Mesh(geometry, material);
}

function makeWater(heights) {
  const group = new THREE.Group();
  const blue = new THREE.MeshPhongMaterial({ color: '#3faec0', emissive: '#0c4456', emissiveIntensity: 0.28, shininess: 85, transparent: true, opacity: 0.93, depthWrite: true });
  const dropBlue = new THREE.MeshPhongMaterial({ color: '#59c9d5', emissive: '#146579', emissiveIntensity: 0.38, shininess: 90, transparent: true, opacity: 0.88, side: THREE.DoubleSide });
  const tile = new THREE.BoxGeometry(1, 0.18, 1.04);
  const strip = new THREE.BoxGeometry(1, 1, 1);
  const top = new THREE.InstancedMesh(tile, blue, (WATER_START - WATER_END + 1) * 5 + 600);
  const drops = new THREE.InstancedMesh(strip, dropBlue, 1500);
  const dummy = new THREE.Object3D();
  const flowPath = [];
  let topCount = 0;
  let dropCount = 0;

  for (let z = WATER_START; z >= WATER_END; z--) {
    const cx = Math.round(streamX(z));
    const centerY = heightAt(heights, cx, z);
    if (z < WATER_START) {
      const upper = heightAt(heights, Math.round(streamX(z + 1)), z + 1);
      for (let y = upper; y > centerY; y -= 0.65) flowPath.push(new THREE.Vector3(cx, y + 0.2, z + 0.48));
    }
    flowPath.push(new THREE.Vector3(cx, centerY + 0.35, z));
    for (let dx = -2; dx <= 2; dx++) {
      const x = cx + dx;
      const h = heightAt(heights, x, z);
      dummy.position.set(x, h + 0.18, z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      top.setMatrixAt(topCount++, dummy.matrix);

      if (z < WATER_START) {
        const upper = heightAt(heights, x, z + 1);
        if (upper > h) {
          const difference = upper - h;
          dummy.position.set(x, h + difference / 2 + 0.2, z + 0.49);
          dummy.scale.set(1.02, difference + 0.15, 0.16);
          dummy.updateMatrix();
          drops.setMatrixAt(dropCount++, dummy.matrix);
        }
      }
    }
  }
  top.count = topCount;
  drops.count = dropCount;
  top.instanceMatrix.needsUpdate = true;
  drops.instanceMatrix.needsUpdate = true;
  group.add(top, drops);

  const pond = new THREE.InstancedMesh(tile, blue, 600);
  let pondCount = 0;
  const pondX = streamX(WATER_END);
  for (let z = -89; z <= -68; z++) {
    for (let x = Math.floor(pondX - 16); x <= Math.ceil(pondX + 16); x++) {
      const d = Math.pow((x - pondX) / 14.5, 2) + Math.pow((z + 79) / 9.5, 2);
      if (d >= 1 || heightAt(heights, x, z) > 3) continue;
      dummy.position.set(x, 3.18, z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      pond.setMatrixAt(pondCount++, dummy.matrix);
    }
  }
  pond.count = pondCount;
  pond.instanceMatrix.needsUpdate = true;
  group.add(pond);

  const foamCount = 135;
  const foam = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: '#d8f6ec', transparent: true, opacity: 0.83 }), foamCount);
  foam.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(foam);
  const samples = flowPath;
  let distance = 0;
  const lengths = [0];
  for (let i = 1; i < samples.length; i++) {
    distance += samples[i].distanceTo(samples[i - 1]);
    lengths.push(distance);
  }

  function updateFoam(time, speed) {
    for (let i = 0; i < foamCount; i++) {
      const target = (time * speed * 23 + i * distance / foamCount) % distance;
      let lo = 0;
      let hi = lengths.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (lengths[mid] < target) lo = mid + 1;
        else hi = mid;
      }
      const next = Math.max(1, lo);
      const blend = (target - lengths[next - 1]) / Math.max(0.001, lengths[next] - lengths[next - 1]);
      dummy.position.copy(samples[next - 1]).lerp(samples[next], blend);
      dummy.position.x += (hash(i, 17) - 0.5) * 4.2;
      dummy.position.y += 0.13;
      const size = 0.13 + hash(i, 28) * 0.29;
      dummy.scale.set(size * 1.7, size * 0.48, size * 2.2);
      dummy.updateMatrix();
      foam.setMatrixAt(i, dummy.matrix);
    }
    foam.instanceMatrix.needsUpdate = true;
  }

  return { group, updateFoam };
}

function makeVegetation(heights) {
  const group = new THREE.Group();
  const locations = [];
  for (let z = -92; z < 92; z += 5) {
    for (let x = -92; x < 92; x += 5) {
      if (hash(x, z) < 0.43) continue;
      const px = Math.round(x + (hash(x + 3, z) - 0.5) * 3);
      const pz = Math.round(z + (hash(x, z + 3) - 0.5) * 3);
      const h = heightAt(heights, px, pz);
      if (h < 3 || h > 18 || Math.abs(px - streamX(pz)) < 7 && pz < WATER_START && pz > WATER_END) continue;
      const slope = Math.max(Math.abs(h - heightAt(heights, px + 1, pz)), Math.abs(h - heightAt(heights, px, pz + 1)));
      if (slope > 2 || Math.pow((px - streamX(WATER_END)) / 17, 2) + Math.pow((pz + 79) / 12, 2) < 1) continue;
      locations.push([px, h, pz, 0.8 + hash(px, pz) * 0.8]);
    }
  }
  const dummy = new THREE.Object3D();
  const trunk = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: '#74594a' }), locations.length);
  const tiers = [
    new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: '#315f4b' }), locations.length),
    new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: '#397053' }), locations.length),
    new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: '#4a805b' }), locations.length),
  ];
  locations.forEach(([x, h, z, scale], i) => {
    dummy.position.set(x, h + scale * 1.1, z);
    dummy.scale.set(scale * 0.55, scale * 2.2, scale * 0.55);
    dummy.updateMatrix();
    trunk.setMatrixAt(i, dummy.matrix);
    tiers.forEach((mesh, tier) => {
      const width = [3.25, 2.55, 1.75][tier] * scale;
      dummy.position.set(x, h + scale * (2.5 + tier * 1.05), z);
      dummy.scale.set(width, scale * 1.35, width);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
  });
  group.add(trunk, ...tiers);
  return group;
}

function makeClouds() {
  const anchors = [
    [-69, -17, 22, 27, 16, 85], [-36, -4, 24, 27, 16, 75],
    [27, -22, 23, 34, 15, 90], [74, -5, 24, 27, 20, 70],
    [-66, 39, 26, 30, 19, 75], [-16, 37, 25, 39, 18, 105],
    [48, 45, 27, 35, 18, 95], [9, 81, 30, 31, 17, 65],
  ];
  const cubes = [];
  anchors.forEach(([cx, cz, cy, rx, rz, count], bank) => {
    for (let i = 0; i < count; i++) {
      const angle = hash(i + bank * 101, 7) * Math.PI * 2;
      const radius = Math.sqrt(hash(i + bank * 71, 23));
      cubes.push({
        x: cx + Math.cos(angle) * radius * rx,
        z: cz + Math.sin(angle) * radius * rz,
        y: cy + (hash(i + bank * 61, 39) - 0.5) * 5,
        width: 3 + hash(i + bank * 57, 41) * 5.5,
        height: 1.6 + hash(i + bank * 43, 47) * 3.6,
        depth: 3 + hash(i + bank * 37, 53) * 5,
      });
    }
  });
  cubes.sort((a, b) => hash(a.x, a.z) - hash(b.x, b.z));
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: '#edf3ed', transparent: true, opacity: 0.78, depthWrite: true }),
    cubes.length,
  );
  const dummy = new THREE.Object3D();
  cubes.forEach((cube, i) => {
    dummy.position.set(cube.x, cube.y, cube.z);
    dummy.scale.set(cube.width, cube.height, cube.depth);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  const group = new THREE.Group();
  group.add(mesh);
  return { group, mesh, max: cubes.length };
}

const lightPresets = {
  dawn: { sky: '#c9ded9', fog: '#d7e4da', sun: '#ffd6aa', ambient: '#dcece6', sunPower: 2.45, ambientPower: 1.35, exposure: 1.22 },
  noon: { sky: '#c9e6e7', fog: '#dcebe4', sun: '#fff5db', ambient: '#e8f4ef', sunPower: 2.25, ambientPower: 1.55, exposure: 1.28 },
  dusk: { sky: '#a9bbc1', fog: '#bdc9c2', sun: '#f3a979', ambient: '#c3d4d5', sunPower: 2.05, ambientPower: 1.1, exposure: 1.08 },
};

export function createVoxelScene(container, initialOptions) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#d7e4da', 0.0031);
  const camera = new THREE.PerspectiveCamera(48, 1, 1, 700);
  const initialPosition = new THREE.Vector3(176, 132, -190);
  const initialTarget = new THREE.Vector3(0, 6, 5);
  camera.position.copy(initialPosition);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(initialTarget);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minDistance = 105;
  controls.maxDistance = 370;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.autoRotateSpeed = 0.45;
  controls.update();

  const ambient = new THREE.HemisphereLight('#e3f0ec', '#576b59', 1.35);
  const sun = new THREE.DirectionalLight('#ffd6aa', 2.45);
  sun.position.set(-78, 115, -60);
  scene.add(ambient, sun);

  const heights = makeTerrain();
  scene.add(makeTerrainMesh(heights));
  const base = new THREE.Mesh(new THREE.BoxGeometry(SIZE, 5, SIZE), new THREE.MeshLambertMaterial({ color: '#606c61' }));
  base.position.y = -2.5;
  scene.add(base);
  const water = makeWater(heights);
  scene.add(water.group);
  const vegetation = makeVegetation(heights);
  scene.add(vegetation);
  const clouds = makeClouds();
  scene.add(clouds.group);

  let options = { ...initialOptions };
  let animationFrame;
  let elapsed = 0;
  let lastTime = performance.now();
  let previousLight = '';

  function applyOptions() {
    controls.autoRotate = options.orbit;
    vegetation.visible = options.vegetation;
    clouds.mesh.count = Math.round(clouds.max * options.clouds / 100);
    if (options.light !== previousLight) {
      const preset = lightPresets[options.light];
      scene.background = new THREE.Color(preset.sky);
      scene.fog.color.set(preset.fog);
      sun.color.set(preset.sun);
      sun.intensity = preset.sunPower;
      ambient.color.set(preset.ambient);
      ambient.intensity = preset.ambientPower;
      renderer.toneMappingExposure = preset.exposure;
      previousLight = options.light;
    }
  }
  applyOptions();

  function resize() {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const mobile = width < 740;
    camera.aspect = width / height;
    camera.fov = mobile ? 96 : 48;
    initialTarget.y = mobile ? -4 : 6;
    controls.target.y = initialTarget.y;
    controls.update();
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function animate(now) {
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    elapsed += delta;
    clouds.group.position.x = Math.sin(elapsed * 0.055) * 2.5;
    water.updateFoam(elapsed, options.flow / 100);
    controls.update();
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(animate);
  }
  animationFrame = requestAnimationFrame(animate);

  return {
    updateOptions(next) { options = { ...options, ...next }; applyOptions(); },
    resetView() { camera.position.copy(initialPosition); controls.target.copy(initialTarget); controls.update(); },
    capture() {
      renderer.render(scene, camera);
      const link = document.createElement('a');
      link.download = 'voxel-waterfall.png';
      link.href = renderer.domElement.toDataURL('image/png');
      link.click();
    },
    destroy() {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
