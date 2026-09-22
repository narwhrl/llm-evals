// 入口：装配舞台、世界、后处理管线与动态效果，驱动渲染循环。
import * as THREE from 'three';
import { createStage, LAYER, VIEWS } from './core/stage.js';
import { createControls } from './core/controls.js';
import { createMaterials } from './gfx/materials.js';
import { setRunoffTime } from './gfx/toon.js';
import { createPostPipeline } from './core/composer.js';
import { PlanarReflection } from './core/planarReflection.js';
import { createLightRig } from './core/lightRig.js';
import { buildWorld } from './scene/index.js';
import { LAYOUT } from './scene/layout.js';
import { installDebugApi } from './core/debug.js';
import { createRain } from './fx/rain.js';
import { createDrips } from './fx/drips.js';
import { createSteam } from './fx/steam.js';
import { createLightning } from './fx/lightning.js';
import { makeRng } from './gfx/rng.js';

const SEED = 20260922;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const { renderer, scene, camera } = createStage(canvas);
const materials = createMaterials();
const timeUniform = { value: 0 };

const AMBIENT = { hemisphere: 2.2, moon: 2.6 };
const FLASH_BOOST = { hemisphere: 1.8, moon: 1.4 };

// ---- 环境光：冷蓝雨夜基调 -------------------------------------------------
const hemisphere = new THREE.HemisphereLight(0x4e6f9a, 0x1a212b, AMBIENT.hemisphere);
scene.add(hemisphere);

const moon = new THREE.DirectionalLight(0x9fc0e8, AMBIENT.moon);
moon.position.set(-42, 54, 30);
moon.target.position.set(0, 0, 0);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
moon.shadow.camera.left = -38;
moon.shadow.camera.right = 38;
moon.shadow.camera.top = 38;
moon.shadow.camera.bottom = -38;
moon.shadow.camera.near = 8;
moon.shadow.camera.far = 150;
moon.shadow.bias = -0.0007;
moon.shadow.normalBias = 0.035;
scene.add(moon);
scene.add(moon.target);

const fill = new THREE.DirectionalLight(0x3d5c86, 0.6);
fill.position.set(36, 26, -32);
scene.add(fill);

const reflection = new PlanarReflection({ renderer, scene, planeY: 0, scale: 0.5 });
const lightRig = createLightRig({ scene, rng: makeRng(SEED + 7) });

const world = buildWorld({
  scene,
  materials,
  reflection,
  timeUniform,
  lightRig,
  keyLight: moon,
  rng: makeRng(SEED + 3),
});

const pipeline = createPostPipeline({ renderer, scene, camera });
const reflectionUniforms = reflection.uniforms;
const controlsApi = createControls(camera, canvas);

// ---- 动态效果 -------------------------------------------------------------
// 屋顶遮挡区：这两个仓库 / 后街住宅是有内部的体量，雨丝落在顶面以下必须消隐。
const rainShadows = [
  { ...LAYOUT.aSite.rect, top: LAYOUT.aSite.roofY + 0.3 },
  {
    minX: LAYOUT.bSite.house.minX,
    maxX: LAYOUT.bSite.house.maxX,
    minZ: LAYOUT.bSite.house.minZ,
    maxZ: LAYOUT.bSite.house.maxZ,
    top: LAYOUT.bSite.house.roofY + 0.3,
  },
  {
    minX: LAYOUT.routes.culvert.minX,
    maxX: LAYOUT.routes.culvert.maxX,
    minZ: LAYOUT.routes.culvert.fromZ,
    maxZ: LAYOUT.routes.culvert.toZ,
    top: LAYOUT.routes.culvert.height + 0.1,
  },
];

const rain = createRain({
  rng: makeRng(SEED + 11),
  layer: LAYER.FX,
  count: 3600,
  area: { size: 56, height: 26 },
  roofs: rainShadows,
});
scene.add(rain.object3D);

const dripSources = world.fxSources.drips.slice(0, 30).map((source) => ({
  groundY: 0,
  rate: 1.1,
  length: 0.3,
  width: 0.05,
  loop: undefined,
  splash: true,
  ...source,
  loop: source.loop ?? Math.max(0.6, source.y - (source.groundY ?? 0)),
}));

const steamSources = world.fxSources.steam.slice(0, 8).map((source) => ({
  size: 1.3,
  rate: 0.42,
  rise: 0.42,
  drift: [0.12, 0.05],
  life: 5.2,
  ...source,
}));

const drips = createDrips({ rng: makeRng(SEED + 13), layer: LAYER.FX, sources: dripSources });
const steam = createSteam({ rng: makeRng(SEED + 17), layer: LAYER.FX, sources: steamSources });
scene.add(drips.object3D);
scene.add(steam.object3D);

const lightning = createLightning({ rng: makeRng(SEED + 19) });

const fxApi = {
  update(dt, elapsed) {
    rain.update(dt, elapsed, camera);
    drips.update(dt, elapsed, camera);
    steam.update(dt, elapsed, camera);
  },
  audit() {
    return {
      rain: rain.stats,
      drips: { sources: dripSources.length, drops: drips.stats.drops, drawCalls: drips.stats.drawCalls },
      steam: { sources: steamSources.length, puffs: steam.stats.puffs, drawCalls: steam.stats.drawCalls },
    };
  },
  setRain(value) {
    rain.setIntensity(value);
  },
  setSteam(value) {
    steam.setIntensity(value);
  },
};

// ---- 渲染循环 -------------------------------------------------------------
const frames = {
  elapsed: 0,
  paused: false,
  fps: 0,
  frameMs: 0,
  setTime(seconds) {
    frames.elapsed = seconds;
  },
};

let lastTime = performance.now();
let fpsAccumulator = 0;
let fpsFrames = 0;
const REFLECTION_INTERVAL = 2;
let reflectionFrame = 0;

// 单帧推进：requestAnimationFrame 与调试用 step() 共用，保证离线取证与实际渲染一致。
function tick(delta, wallDelta = delta) {
  if (!frames.paused) frames.elapsed += delta;

  const elapsed = frames.elapsed;
  timeUniform.value = elapsed;
  setRunoffTime(elapsed);

  controlsApi.update();
  lightRig.update(elapsed);
  fxApi.update(delta, elapsed);

  const flash = lightning.update(elapsed);
  if (flash > 0) {
    hemisphere.intensity = AMBIENT.hemisphere + flash * FLASH_BOOST.hemisphere;
    moon.intensity = AMBIENT.moon + flash * FLASH_BOOST.moon;
    pipeline.compositePass.uniforms.uFlash.value = flash;
  } else {
    hemisphere.intensity = AMBIENT.hemisphere;
    moon.intensity = AMBIENT.moon;
    pipeline.compositePass.uniforms.uFlash.value = 0;
  }

  renderer.info.reset();
  // 平面反射与实时效果无关的部分隔帧更新：相机缓慢环绕时几乎不可察觉，却省下一整趟场景渲染。
  reflectionFrame = (reflectionFrame + 1) % REFLECTION_INTERVAL;
  if (reflectionFrame === 0) reflection.update(camera);
  pipeline.render(delta);

  fpsAccumulator += wallDelta;
  fpsFrames += 1;
  if (fpsFrames >= 20) {
    frames.fps = Math.round(fpsFrames / Math.max(fpsAccumulator, 1e-4));
    frames.frameMs = Math.round((fpsAccumulator / fpsFrames) * 1000 * 100) / 100;
    fpsAccumulator = 0;
    fpsFrames = 0;
  }

  if (!canvas.classList.contains('ready')) {
    canvas.classList.add('ready');
    renderer.shadowMap.needsUpdate = true;
  }
}

function frame(now) {
  requestAnimationFrame(frame);
  const rawDelta = (now - lastTime) / 1000;
  lastTime = now;
  tick(Math.min(rawDelta, 0.05), rawDelta);
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  const buffer = renderer.getDrawingBufferSize(new THREE.Vector2());
  pipeline.setSize(width, height);
  reflection.setSize(buffer.x, buffer.y);
  renderer.shadowMap.needsUpdate = true;
}

window.addEventListener('resize', resize, { passive: true });
resize();

installDebugApi({
  renderer,
  scene,
  camera,
  controlsApi,
  pipeline,
  reflection,
  lightRig,
  world,
  fx: fxApi,
  frames,
  tick,
});

renderer.shadowMap.needsUpdate = true;
requestAnimationFrame(frame);

export { VIEWS, reflectionUniforms };
