import { ACESFilmicToneMapping, PCFShadowMap, Scene, SRGBColorSpace, Timer, WebGLRenderer } from "three";
import { ANCHORS, buildStages, createWorld, WORLD_BOUNDS } from "./build/layout.js";
import { compileVoxels } from "./core/voxels.js";
import { CameraRig, readUrlOptions, VIEWS } from "./render/controls.js";
import { Environment, TIME_OF_DAY } from "./render/environment.js";
import { Hud } from "./render/hud.js";

const canvas = document.getElementById("scene");
const urlOptions = readUrlOptions();

const state = {
  renderer: null,
  scene: null,
  world: null,
  compiled: null,
  environment: null,
  rig: null,
  frames: 0,
  elapsed: 0,
  fps: 0,
  stage: "初始化",
};

let hud = null;

function fail(error) {
  const message = error instanceof Error ? `${error.message}\n${(error.stack ?? "").split("\n").slice(0, 4).join("\n")}` : String(error);
  console.error("[voxel-scene]", error);
  if (hud) hud.error(message);
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function createRenderer() {
  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  return renderer;
}

function formatCount(value) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)} 万`;
  return value.toLocaleString("zh-CN");
}

function updateStats() {
  const { renderer, compiled } = state;
  if (!renderer || !compiled) return;
  const info = renderer.info.render;
  hud.setStats([
    `体素 <b>${formatCount(compiled.stats.voxels)}</b> · 合并盒 <b>${formatCount(compiled.stats.boxes)}</b>`,
    `draw call <b>${info.calls}</b> · 三角面 <b>${formatCount(info.triangles)}</b>`,
    `实例 <b>${formatCount(compiled.stats.instances)}</b> · 材质族 <b>${compiled.stats.families}</b>`,
    `FPS <b>${state.fps.toFixed(0)}</b>`,
  ]);
}

function applyTimeOfDay(key) {
  const environment = state.environment;
  if (!environment) return;
  const applied = environment.setTimeOfDay(key);
  state.renderer.toneMappingExposure = applied.exposure;
  hud.setActiveTime(environment.key);
}

function applyView(key) {
  if (!state.rig) return;
  if (state.rig.applyView(key)) hud.setActiveView(key);
}

async function boot() {
  hud = new Hud({ onView: applyView, onTimeOfDay: applyTimeOfDay });

  if (!canvas) throw new Error("页面里找不到 #scene 画布");
  const probe = document.createElement("canvas");
  if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
    throw new Error("当前浏览器没有可用的 WebGL 上下文");
  }

  state.renderer = createRenderer();
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    fail(new Error("WebGL 上下文丢失，可能是显存不足"));
  });

  const scene = new Scene();
  state.scene = scene;

  state.environment = new Environment(scene, { bounds: ANCHORS.ensemble ?? WORLD_BOUNDS });
  state.rig = new CameraRig({ canvas, anchors: ANCHORS, aspect: window.innerWidth / window.innerHeight });

  const initialView = VIEWS.some((view) => view.key === urlOptions.view) ? urlOptions.view : "bird";
  const initialTime = urlOptions.tod && TIME_OF_DAY[urlOptions.tod] ? urlOptions.tod : "noon";

  hud.buildViewButtons(VIEWS, initialView);
  hud.buildTimeButtons(TIME_OF_DAY, initialTime);

  const world = createWorld();
  state.world = world;
  const stages = buildStages();
  await nextFrame();
  for (let i = 0; i < stages.length; i++) {
    state.stage = stages[i].label;
    hud.progress(stages[i].label, (i / (stages.length + 1)) * 0.92);
    await nextFrame();
    stages[i].run(world);
  }

  hud.progress("合并体素 · 生成实例化网格", 0.94);
  await nextFrame();
  const compiled = compileVoxels(world);
  state.compiled = compiled;
  scene.add(compiled.group);

  const glowing = [];
  for (const [family, material] of compiled.materials) {
    if (family === "glowing") glowing.push(material);
  }
  state.environment.setLanternMaterials(glowing);
  applyTimeOfDay(initialTime);

  hud.progress("就绪", 1);
  state.rig.applyView(initialView, { immediate: true });
  hud.setActiveView(initialView);
  state.renderer.render(scene, state.rig.camera);
  updateStats();
  await nextFrame();
  hud.ready();

  window.addEventListener("resize", onResize);
  const timer = new Timer();
  // 接上 Page Visibility，标签页被隐藏时 delta 归零，避免切回来时跳一大步。
  timer.connect(document);
  let statsTimer = 0;
  state.renderer.setAnimationLoop((time) => {
    timer.update(time);
    const delta = Math.min(0.1, timer.getDelta());
    state.elapsed += delta;
    state.frames += 1;
    statsTimer += delta;
    state.rig.update(delta);
    state.renderer.render(scene, state.rig.camera);
    if (statsTimer >= 0.5) {
      state.fps = state.frames / state.elapsed;
      state.frames = 0;
      state.elapsed = 0;
      statsTimer = 0;
      updateStats();
    }
  });
}

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  state.renderer.setSize(width, height, false);
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  state.rig?.setAspect(width / height);
}

/** 供人工与自动化检查使用的最小调试面。 */
window.__voxelScene = {
  get stats() {
    return state.compiled?.stats ?? null;
  },
  get renderInfo() {
    return state.renderer ? { ...state.renderer.info.render } : null;
  },
  get view() {
    return state.rig?.view ?? null;
  },
  get timeOfDay() {
    return state.environment?.key ?? null;
  },
  get camera() {
    const camera = state.rig?.camera;
    return camera ? { position: camera.position.toArray(), aspect: camera.aspect, fov: camera.fov } : null;
  },
  setView: applyView,
  setTimeOfDay: applyTimeOfDay,
  views: VIEWS.map((view) => view.key),
  world: () => state.world,
  scene: () => state.scene,
  renderer: () => state.renderer,
};

boot().catch(fail);
