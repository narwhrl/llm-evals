import { CROUCH_EYE, STAND_EYE } from "./sim/constants.js";
import { buildMap } from "./sim/map.js";
import { createMatch, emptyInput, playerActor, setPrimary, step } from "./sim/match.js";
import { lookVector } from "./sim/math.js";
import { PRIMARIES, WEAPONS } from "./sim/weapons.js";
import { createAudio } from "./render/audio.js";
import { createFx } from "./render/fx.js";
import { createHud } from "./render/hud.js";
import { createPeople } from "./render/people.js";
import { createViewmodel } from "./render/viewmodel.js";
import { createWorld } from "./render/world.js";

const STEP = 1 / 60;
const params = new URLSearchParams(location.search);
const canvas = document.querySelector("#view");
const menu = document.querySelector("#menu");
const pause = document.querySelector("#pause");
const sensInput = document.querySelector("#sens");
const sensPause = document.querySelector("#sens-pause");
const gunPause = document.querySelector("#gun-pause");

const map = buildMap();
let world;
try {
  world = createWorld(canvas, map.solids, { debug: params.has("debug") });
} catch {
  document.querySelector("#gl-error").hidden = false;
  menu.hidden = true;
  throw new Error("webgl unavailable");
}

const people = createPeople(world.scene);
  const guns = createViewmodel(world.camera);
  world.scene.add(world.camera);
const fx = createFx(world.scene);
const audio = createAudio();
const hud = createHud(map.solids);

let mode = params.has("overview") ? "overview" : "menu";
let paused = false;
let state = null;
let team = "gr";
let primary = "carbine";
let sens = loadSens();
sensInput.value = String(sens);
sensPause.value = String(sens);

const held = new Set();
let fireHeld = false;
let adsHeld = false;
let fireEdge = false;
let reloadEdge = false;
let slotEdge = 0;
let cycleEdge = 0;
let quickEdge = null;
let yawAcc = 0;
let pitchAcc = 0;
let bank = 0;
let last = performance.now();
let boardPin = false;

function lockPointer() {
  const lock = canvas.requestPointerLock();
  if (lock && typeof lock.catch === "function") lock.catch(() => {});
}

function loadSens() {
  const saved = Number(localStorage.getItem("cf-ship-sens"));
  return Number.isFinite(saved) && saved >= 0.0008 && saved <= 0.006 ? saved : 0.0022;
}

function saveSens(value) {
  sens = Number(value);
  localStorage.setItem("cf-ship-sens", String(sens));
  sensInput.value = String(sens);
  sensPause.value = String(sens);
}

function clearEdges() {
  fireEdge = false;
  reloadEdge = false;
  slotEdge = 0;
  cycleEdge = 0;
  quickEdge = null;
  yawAcc = 0;
  pitchAcc = 0;
}

function markGuns(container, current) {
  for (const button of container.querySelectorAll("[data-gun]")) {
    button.classList.toggle("on", button.dataset.gun === current);
  }
}

function buildPauseGuns() {
  gunPause.innerHTML = "";
  for (const id of PRIMARIES) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.gun = id;
    button.textContent = WEAPONS[id].name;
    button.addEventListener("click", () => {
      primary = id;
      if (state) setPrimary(state, id);
      markGuns(gunPause, primary);
      markGuns(document.querySelector("#gun-choice"), primary);
    });
    gunPause.appendChild(button);
  }
  markGuns(gunPause, primary);
}

function begin(nextTeam = team, nextGun = primary) {
  team = nextTeam;
  primary = nextGun;
  state = createMatch({ seed: Math.floor(Math.random() * 1e9), team, primary });
  bank = 0;
  fx.reset();
  hud.reset();
  hud.show(true);
  menu.hidden = true;
  pause.hidden = true;
  document.querySelector("#finish").hidden = true;
  paused = false;
  mode = "play";
  audio.resume();
  lockPointer();
}

function readInput(useEdges) {
  const input = emptyInput();
  if (held.has("KeyA")) input.moveX -= 1;
  if (held.has("KeyD")) input.moveX += 1;
  if (held.has("KeyW")) input.moveZ += 1;
  if (held.has("KeyS")) input.moveZ -= 1;
  input.jump = held.has("Space");
  input.crouch = held.has("ControlLeft") || held.has("ControlRight") || held.has("KeyC");
  input.walk = held.has("ShiftLeft") || held.has("ShiftRight");
  input.ads = adsHeld;
  input.fire = fireHeld;
  if (!useEdges) return input;
  input.firePressed = fireEdge;
  input.reload = reloadEdge;
  input.yawDelta = yawAcc;
  input.pitchDelta = pitchAcc;
  input.slot = slotEdge;
  input.cycle = cycleEdge;
  input.quick = quickEdge;
  return input;
}

function consume(useEdges) {
  const player = playerActor(state);
  const events = state.events;
  fx.pushEvents(events);
  audio.play(events, player);
  hud.note(events, player, state.actors);
  if (useEdges || events.some((event) => event.type === "shot" && event.actorId === "player")) {
    if (events.some((event) => event.type === "shot" && event.actorId === "player")) guns.trigger();
  }
  events.length = 0;
}

function simulate(dt) {
  bank = Math.min(0.1, bank + dt);
  let first = true;
  while (bank >= STEP) {
    step(state, STEP, readInput(first));
    consume(first);
    if (first) clearEdges();
    first = false;
    bank -= STEP;
  }
}

function placePlayCamera(player, dt) {
  const camera = world.camera;
  if (!player.alive) {
    const look = lookVector(player.yaw, 0);
    camera.position.set(player.x - look.x * 2.8, player.y + 2.15, player.z - look.z * 2.8);
    camera.up.set(0, 1, 0);
    camera.lookAt(player.x, player.y + 0.8, player.z);
    return;
  }
  const eye = player.y + (player.crouch ? CROUCH_EYE : STAND_EYE);
  camera.position.set(player.x, eye, player.z);
  camera.rotation.order = "YXZ";
  camera.rotation.y = Math.PI + player.yaw;
  camera.rotation.x = -player.pitch;
  const roll = (player.shotIndex % 2 === 0 ? 1 : -1) * Math.min(player.recoil, 0.035);
  camera.rotation.z = roll;
  const bolt = player.weapon === "bolt" && player.ads;
  const target = bolt ? 18 : player.ads ? 62 : 78;
  camera.fov = camera.fov + (target - camera.fov) * Math.min(1, dt * 12);
  camera.updateProjectionMatrix();
}

function placeOrbit(now) {
  const camera = world.camera;
  const ang = now * 0.00008;
  camera.position.set(Math.sin(ang) * 28, 15, Math.cos(ang) * 34);
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 2.2, 0);
  if (Math.abs(camera.fov - 52) > 0.1) {
    camera.fov = 52;
    camera.updateProjectionMatrix();
  }
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if ((mode === "play" && !paused) || mode === "overview") {
    if (!state) state = createMatch({ seed: 3, team, primary });
    simulate(dt);
    if (state.phase === "end" && mode === "play") {
      mode = "end";
      paused = false;
      if (document.pointerLockElement) document.exitPointerLock();
    }
  }
  const player = state ? playerActor(state) : null;
  if (mode === "play" && player) placePlayCamera(player, dt);
  else placeOrbit(now);

  world.update(now / 1000);
  if (state && player) {
    people.update(state.actors, player.team, dt);
    const showGun = mode === "play" && !paused && player.alive;
    guns.update(player, state.time, dt, showGun);
    fx.update(dt, state);
    hud.update(state, player, dt, {
      showHint: mode === "play" && !paused && document.pointerLockElement !== canvas,
      board: mode === "play" && (held.has("Tab") || boardPin),
    });
  }
  world.renderer.render(world.scene, world.camera);
  requestAnimationFrame(frame);
}

document.querySelector("#scorebar").addEventListener("click", () => {
  boardPin = !boardPin;
});

document.querySelector("#team-choice").addEventListener("click", (event) => {
  const button = event.target.closest("[data-team]");
  if (!button) return;
  team = button.dataset.team;
  for (const item of document.querySelectorAll("#team-choice button")) item.classList.toggle("on", item === button);
});

document.querySelector("#gun-choice").addEventListener("click", (event) => {
  const button = event.target.closest("[data-gun]");
  if (!button) return;
  primary = button.dataset.gun;
  markGuns(document.querySelector("#gun-choice"), primary);
});

sensInput.addEventListener("input", () => saveSens(sensInput.value));
sensPause.addEventListener("input", () => saveSens(sensPause.value));
document.querySelector("#start").addEventListener("click", () => begin());
document.querySelector("#resume").addEventListener("click", () => {
  audio.resume();
  lockPointer();
});
document.querySelector("#restart").addEventListener("click", () => begin());
document.querySelector("#again").addEventListener("click", () => begin());
buildPauseGuns();

canvas.addEventListener("click", () => {
  if (mode === "play" && !paused) lockPointer();
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener("pointerlockchange", () => {
  const locked = document.pointerLockElement === canvas;
  if (!locked && mode === "play") {
    paused = true;
    pause.hidden = false;
    buildPauseGuns();
    clearEdges();
    fireHeld = false;
    adsHeld = false;
  }
  if (locked) {
    paused = false;
    pause.hidden = true;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Tab" && mode === "play") {
    event.preventDefault();
    held.add("Tab");
  }
}, true);

document.addEventListener("keydown", (event) => {
  held.add(event.code);
  if (document.pointerLockElement === canvas && (event.code === "Tab" || event.code === "Space")) event.preventDefault();
  if (event.repeat) return;
  if (mode === "menu" && event.code === "Enter") begin();
  if (mode !== "play" || paused) return;
  if (event.code === "KeyR") reloadEdge = true;
  if (event.code === "Digit1") slotEdge = 1;
  if (event.code === "Digit2") slotEdge = 2;
  if (event.code === "Digit3") slotEdge = 3;
  if (event.code === "Digit4") slotEdge = 4;
  if (event.code === "Digit5") slotEdge = 5;
  if (event.code === "KeyG") quickEdge = "frag";
  if (event.code === "KeyX") quickEdge = "smoke";
  if (event.code === "KeyB" && document.pointerLockElement === canvas) document.exitPointerLock();
});
document.addEventListener("keyup", (event) => held.delete(event.code));

document.addEventListener("mousedown", (event) => {
  if (document.pointerLockElement !== canvas) return;
  if (event.button === 0) {
    fireHeld = true;
    fireEdge = true;
  }
  if (event.button === 2) adsHeld = true;
});
document.addEventListener("mouseup", (event) => {
  if (event.button === 0) fireHeld = false;
  if (event.button === 2) adsHeld = false;
});
document.addEventListener("mousemove", (event) => {
  if (document.pointerLockElement !== canvas) return;
  const player = state ? playerActor(state) : null;
  const adsScale = player?.ads ? (player.weapon === "bolt" ? 0.28 : 0.55) : 1;
  yawAcc += event.movementX * sens * adsScale;
  pitchAcc -= event.movementY * sens * adsScale;
});
window.addEventListener(
  "wheel",
  (event) => {
    if (document.pointerLockElement !== canvas) return;
    event.preventDefault();
    cycleEdge += Math.sign(event.deltaY);
  },
  { passive: false },
);

if (mode === "overview") {
  state = createMatch({ seed: 11, team, primary });
  hud.show(true);
  menu.hidden = true;
}

requestAnimationFrame(frame);
