// 应用层：渲染器与场景、菜单流程、指针锁定、主循环、相机、HUD 与调试入口。
import * as THREE from "three";
import { NavGraph } from "../ai/nav";
import { lineOfSight } from "../ai/perception";
import { AudioEngine } from "../audio/audio";
import { rayCharacter } from "../combat/combat";
import { insideSmoke } from "../combat/projectiles";
import { type Difficulty, MATCH, type PrimaryId, SIM_DT } from "../config";
import { World, sightFilter } from "../core/world";
import { buildLayout, spawnPoints, TEAM_NAME, type Team } from "../map/layout";
import { Characters } from "../render/characters";
import { Effects } from "../render/effects";
import { buildEnv, type Env, SUN_DIR } from "../render/env";
import { buildGun } from "../render/guns";
import { buildShip } from "../render/ship";
import { Viewmodel } from "../render/viewmodel";
import { Hud, scoreboardHtml } from "../ui/hud";
import { type MenuChoice, Menus } from "../ui/menus";
import { loadSettings, saveSettings, type Settings, vfovFromH } from "../ui/settings";
import { type Actor, clearEdges, emptyIntent } from "./actor";
import { Feedback } from "./feedback";
import { Input } from "./input";
import { FixedStep } from "./loop";
import { Sim } from "./sim";
import { FrameStats } from "./stats";

type State = "loading" | "menu" | "playing" | "paused" | "ended";

const PR: Record<Settings["quality"], number> = { low: 0.85, medium: 1, high: 1 };

export class App {
  readonly renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(70, 1, 0.05, 2500);
  readonly world: World;
  nav!: NavGraph;
  env!: Env;
  chars!: Characters;
  effects!: Effects;
  vm!: Viewmodel;
  readonly audio = new AudioEngine();
  hud!: Hud;
  menus!: Menus;
  input!: Input;
  feedback!: Feedback;
  sim: Sim | null = null;
  state: State = "loading";
  settings: Settings;
  choice: MenuChoice | null = null;
  readonly stepper = new FixedStep();
  readonly stats = new FrameStats();
  readonly debug: boolean;
  readonly noLock: boolean;
  seed = 0;
  fixedCam: { p: [number, number, number]; yaw: number; pitch: number; fov?: number } | null = null;
  private last = 0;
  private time = 0;
  private prevEye = new THREE.Vector3();
  private curEye = new THREE.Vector3();
  private lastLook: [number, number] = [0, 0];
  private tagT = 0;
  private tagText: string | null = null;
  private dir = new THREE.Vector3();
  private up = new THREE.Vector3();
  private sunView = new THREE.Vector3();
  private locked = false;
  private wantLock = false;
  private scratchIntent = emptyIntent();
  restarts = 0;

  constructor(private host: HTMLElement, params: URLSearchParams) {
    this.debug = params.has("debug");
    this.noLock = this.debug && params.has("nolock");
    const seedParam = params.get("seed");
    this.seed = seedParam && /^\d+$/.test(seedParam) ? Number(seedParam) : 0;
    const loaded = loadSettings();
    this.settings = loaded.s;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: this.debug });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.autoClear = false;
    this.renderer.info.autoReset = false; // 一帧含世界与视模两次绘制，统计按帧手动清零
    this.renderer.domElement.className = "game-canvas";
    this.renderer.domElement.tabIndex = 0;
    host.appendChild(this.renderer.domElement);
    this.world = new World(buildLayout());
    this.camera.rotation.order = "YXZ";
    if (loaded.error) queueMicrotask(() => this.hud?.notify(loaded.error!, 6));
  }

  /** 分步加载：每步更新真实进度；任一步失败显示错误与重试入口 */
  async boot(): Promise<void> {
    const ui = document.createElement("div");
    ui.className = "ui-layer";
    this.host.appendChild(ui);
    this.menus = new Menus(ui, {
      start: (c) => this.start(c),
      resume: () => this.resume(),
      restart: () => this.restart(),
      toMenu: () => this.toMenu(),
      settingsChanged: (s) => this.applySettings(s, true),
    }, this.settings);
    this.menus.show("loading");
    const steps: [string, () => void][] = [
      ["生成导航网格（电脑寻路）", () => { this.nav = NavGraph.build(this.world, [...spawnPoints(0), ...spawnPoints(1)]); }],
      ["构建船体、货物与材质", () => this.buildScene()],
      ["生成武器视模", () => { this.vm = new Viewmodel(this.scene.environment); }],
      ["生成界面", () => {
        this.hud = new Hud(ui, this.world);
        ui.insertBefore(this.hud.root, ui.firstChild);
        this.input = new Input(this.renderer.domElement);
        this.feedback = new Feedback(this.audio, this.effects, this.chars, this.vm, this.hud, this.camera.position, this.camera);
        this.feedback.onPlayerDeath = () => this.input.clear();
        this.input.onKey = (c) => this.onKey(c);
      }],
      ["预编译着色器", () => this.warmup()],
      ["渲染武器预览", () => this.renderThumbs()],
    ];
    for (let i = 0; i < steps.length; i++) {
      const [label, fn] = steps[i];
      this.menus.progress(`${label}…`, i / steps.length);
      // 让进度文字先绘制；后台标签页不触发 rAF，用定时器兜底
      await new Promise((r) => { requestAnimationFrame(() => r(null)); setTimeout(() => r(null), 60); });
      try {
        fn();
      } catch (e) {
        console.error(e);
        this.menus.loadError(`加载失败：${label}（${(e as Error).message}）`);
        return;
      }
    }
    this.menus.progress("完成", 1);
    this.bindWindow();
    this.applySettings(this.settings, false);
    this.resize();
    this.state = "menu";
    this.menus.show("main");
    this.last = performance.now();
    this.renderer.setAnimationLoop((t) => this.frame(t));
  }

  /** 构建（或按画质重建）世界场景 */
  private buildScene(): void {
    const shadows = this.settings.quality !== "low";
    if (this.env) {
      this.env.dispose();
      // 角色与特效使用模块级共享几何（跨场景复用），只释放船体与环境
      this.scene.remove(this.chars.group, this.effects.group);
      this.scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const mat of mats) { for (const v of Object.values(mat)) if (v instanceof THREE.Texture) v.dispose(); mat.dispose(); }
      });
      this.scene = new THREE.Scene();
    }
    this.renderer.shadowMap.enabled = shadows;
    this.env = buildEnv(this.scene, this.renderer, this.settings.quality);
    const ship = buildShip(this.world, shadows);
    this.scene.add(ship.group);
    this.chars = new Characters(shadows);
    this.scene.add(this.chars.group);
    this.effects = new Effects();
    this.scene.add(this.effects.group);
    if (this.feedback) this.feedback = new Feedback(this.audio, this.effects, this.chars, this.vm, this.hud, this.camera.position, this.camera);
    if (this.feedback) this.feedback.onPlayerDeath = () => this.input.clear();
    if (this.sim) this.chars.update(this.sim.actors, this.sim.player, 0, this.time);
  }

  private warmup(): void {
    this.camera.position.set(-40, 3, 0);
    this.camera.lookAt(0, 1, 0);
    this.renderer.compile(this.scene, this.camera);
    // 预先生成所有视模武器，避免首次切枪卡顿
    const dummy = new Sim({ world: this.world, nav: this.nav, difficulty: "normal", rules: MATCH.practice, seed: 1, playerTeam: 0, playerPrimary: "ak" });
    const p = dummy.player!;
    for (const id of ["ak", "m4", "mp5", "awm"] as PrimaryId[]) {
      p.inv.respawn(id);
      for (const slot of [0, 1, 2, 3] as const) { p.inv.slot = slot; this.vm.update(p, 0, 0, 0, 0, false, this.sunView); }
    }
    this.renderer.compile(this.vm.scene, this.vm.camera);
    this.chars.update(dummy.actors, null, 0, 0);
    this.renderer.compile(this.scene, this.camera);
    this.chars.clear();
  }

  /** 主武器卡片轮廓：用独立小渲染器画出实际视模模型 */
  private renderThumbs(): void {
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setSize(220, 84, false);
    r.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x404040, 2.2));
    const d = new THREE.DirectionalLight(0xffffff, 2.5);
    d.position.set(1, 2, 3);
    scene.add(d);
    const cam = new THREE.OrthographicCamera(-0.62, 0.62, 0.24, -0.24, 0.1, 10);
    cam.position.set(0, 0, 3);
    for (const id of ["ak", "m4", "mp5", "awm"] as PrimaryId[]) {
      const gm = buildGun(id, 1);
      const g = gm.root;
      g.rotation.y = -Math.PI / 2;
      const box = new THREE.Box3().setFromObject(g);
      const size = box.getSize(new THREE.Vector3());
      const s = 1.1 / Math.max(size.x, size.z, 0.01);
      g.scale.setScalar(s);
      box.setFromObject(g);
      g.position.sub(box.getCenter(new THREE.Vector3()));
      scene.add(g);
      r.render(scene, cam);
      const c = document.createElement("canvas");
      c.width = 220; c.height = 84;
      c.getContext("2d")!.drawImage(r.domElement, 0, 0);
      this.menus.setThumb(id, c);
      scene.remove(g);
    }
    r.dispose();
    r.forceContextLoss();
  }

  private bindWindow(): void {
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("pointerlockchange", () => this.onLockChange());
    document.addEventListener("pointerlockerror", () => this.onLockError("浏览器拒绝了鼠标锁定。请稍候片刻后再次点击，或检查浏览器权限。"));
    document.addEventListener("visibilitychange", () => { if (document.hidden) this.pause(); });
    window.addEventListener("blur", () => { this.input.clear(); if (!this.noLock) this.pause(); });
    this.renderer.domElement.addEventListener("click", () => {
      if (this.state === "paused" && this.menus.visible === false) this.resume();
    });
  }

  applySettings(s: Settings, save: boolean): void {
    const qualityChanged = this.renderer.getPixelRatio() !== PR[s.quality] || (this.renderer.shadowMap.enabled !== (s.quality !== "low"));
    this.settings = s;
    this.audio.setVolume(s.master, s.sfx);
    if (this.hud) this.hud.showFps = s.showFps || this.debug;
    if (this.hud) this.hud.debug = this.debug;
    if (qualityChanged || save) {
      this.renderer.setPixelRatio(PR[s.quality]);
      if (qualityChanged && this.env && save) this.buildScene();
    }
    this.resize();
    if (save) this.menus.setSettingsMessage(saveSettings(s) ?? "已保存到本地");
  }

  resize(): void {
    const w = this.host.clientWidth || window.innerWidth, h = this.host.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = `${w}px`;
    this.renderer.domElement.style.height = `${h}px`;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.vm?.resize(w / h);
  }

  // —— 对局流程 ——
  private newSim(c: MenuChoice): void {
    this.effects.clear();
    this.chars.clear();
    this.audio.stopAll();
    this.hud.reset();
    this.feedback.reset();
    this.input.clear();
    const seed = this.seed || (Date.now() & 0x7fffffff);
    this.sim = new Sim({
      world: this.world, nav: this.nav, difficulty: c.difficulty as Difficulty, rules: MATCH[c.mode], seed,
      playerTeam: c.team as Team, playerPrimary: c.primary, playerName: "你",
    });
    this.sim.player!.primaryChoice = c.primary;
    this.vm.setTeam(c.team);
    this.stepper.reset();
    this.snapEye();
  }

  start(c: MenuChoice): void {
    this.audio.unlock();
    this.audio.startAmbient();
    this.choice = c;
    this.newSim(c);
    this.requestPlay();
  }

  restart(): void {
    if (!this.choice) return;
    this.restarts++;
    this.audio.unlock();
    this.newSim(this.choice);
    this.requestPlay();
  }

  resume(): void {
    if (!this.sim || this.sim.ended) return;
    this.audio.unlock();
    this.requestPlay();
  }

  toMenu(): void {
    if (document.pointerLockElement) document.exitPointerLock();
    this.sim = null;
    this.effects.clear();
    this.chars.clear();
    this.audio.stopAll();
    this.input.clear();
    this.input.active = false;
    this.state = "menu";
    this.menus.show("main");
  }

  /** 进入游戏：真实模式必须获得指针锁定；调试无锁模式直接进入并在 HUD 标注 */
  private requestPlay(): void {
    if (this.noLock) { this.enterPlaying(); return; }
    this.wantLock = true;
    this.state = "paused";
    const el = this.renderer.domElement;
    try {
      const r = el.requestPointerLock({ unadjustedMovement: false } as PointerLockOptions) as unknown as Promise<void> | undefined;
      if (r && typeof r.catch === "function") r.catch((e: Error) => this.onLockError(`无法锁定鼠标：${e.message}。请再次点击「继续游戏」。`));
    } catch (e) {
      this.onLockError(`无法锁定鼠标：${(e as Error).message}`);
    }
  }

  private onLockChange(): void {
    this.locked = document.pointerLockElement === this.renderer.domElement;
    if (this.locked && this.wantLock && this.sim && !this.sim.ended) this.enterPlaying();
    else if (!this.locked && this.state === "playing") this.pause();
    this.wantLock = false;
  }

  private onLockError(msg: string): void {
    this.wantLock = false;
    if (this.sim && !this.sim.ended) {
      this.state = "paused";
      this.input.active = false;
      this.menus.show("pause");
    }
    this.menus.lockError(msg);
  }

  private enterPlaying(): void {
    this.state = "playing";
    this.input.clear();
    this.input.active = true;
    this.menus.show(null);
    this.audio.resume();
    this.stepper.reset();
    this.last = performance.now();
    this.renderer.domElement.focus();
  }

  pause(): void {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.input.clear();
    this.input.active = false;
    if (this.sim?.player) this.sim.player.intent = emptyIntent();
    if (document.pointerLockElement) document.exitPointerLock();
    this.audio.suspend();
    this.menus.show("pause");
  }

  private end(): void {
    const sim = this.sim!;
    const e = sim.match.ended!;
    this.state = "ended";
    this.input.clear();
    this.input.active = false;
    if (sim.player) sim.player.intent = emptyIntent();
    if (document.pointerLockElement) document.exitPointerLock();
    const me = sim.player;
    const title = e.winner === null ? "平局" : me && e.winner === me.team ? "胜利" : me ? "失败" : `${TEAM_NAME[e.winner]} 获胜`;
    const reason = e.reason === "kills" ? `率先达到 ${sim.match.rules.killTarget} 击杀` : "时间结束，按比分结算";
    this.menus.showResults(title, `${TEAM_NAME[0]} ${sim.match.score[0]} : ${sim.match.score[1]} ${TEAM_NAME[1]} · ${reason} · 用时 ${Math.floor(sim.match.elapsed / 60)}:${String(Math.floor(sim.match.elapsed % 60)).padStart(2, "0")}`,
      scoreboardHtml(sim, me), e.winner === null ? "draw" : me && e.winner === me.team ? "win" : "lose");
  }

  private onKey(code: string): void {
    const me = this.sim?.player;
    if (this.noLock && code === "Escape" && this.state === "playing") { this.pause(); return; }
    if (!me || me.alive || this.state !== "playing") return;
    const map: Record<string, PrimaryId> = { Digit1: "ak", Digit2: "m4", Digit3: "mp5", Digit4: "awm" };
    if (map[code]) { me.primaryChoice = map[code]; if (this.choice) this.choice.primary = map[code]; }
  }

  private snapEye(): void {
    const me = this.sim?.player;
    if (!me) return;
    this.curEye.set(me.x, me.motor.eyeY, me.z);
    this.prevEye.copy(this.curEye);
  }
  // —— 主循环 ——
  private frame(now: number): void {
    const raw = (now - this.last) / 1000;
    this.last = now;
    const dt = Math.min(0.1, Math.max(0, raw));
    this.time += dt;
    if (this.state === "playing") this.stats.push(raw * 1000);
    const sim = this.sim;
    let alpha = 1;
    if (sim && this.state === "playing") {
      const me = sim.player;
      this.look(me);
      alpha = this.stepper.advance(dt, () => {
        if (me) {
          this.prevEye.copy(this.curEye);
          if (me.alive) this.input.fill(me.intent, SIM_DT);
          else { this.input.fill(this.scratchIntent, SIM_DT); clearEdges(me.intent); me.intent.fire = false; }
        }
        const wasAlive = me?.alive ?? false;
        sim.step(SIM_DT);
        if (me) {
          if (me.motor.jumped) this.input.consumedJump();
          this.curEye.set(me.x, me.motor.eyeY, me.z);
          if (!wasAlive && me.alive) this.prevEye.copy(this.curEye);
          clearEdges(me.intent);
        }
        this.feedback.handle(sim, me, sim.events);
        if (sim.ended) { this.end(); return false; }
      });
      this.feedback.mechanics(me);
    }
    this.updateCamera(dt, alpha);
    this.renderWorld(this.state === "playing" ? dt : 0);
  }

  private bobPhase = 0;

  private look(me: Actor | null): void {
    const [dx, dy] = this.input.consumeLook();
    this.lastLook = [dx, dy];
    if (!me || !me.alive || (dx === 0 && dy === 0)) return;
    let k = this.settings.sens * 0.07 * (Math.PI / 180);
    const scope = me.inv.scope > 0 && me.inv.slot === 0 ? me.inv.primary.def.scopeFov?.[me.inv.scope - 1] : undefined;
    // 开镜：按视野比例缩放，再乘独立开镜倍率
    if (scope) k *= (Math.tan((scope * Math.PI) / 360) / Math.tan((this.settings.fov * Math.PI) / 360)) * this.settings.scopeSens;
    me.yaw -= dx * k;
    me.pitch -= dy * k * (this.settings.invertY ? -1 : 1);
    me.pitch = Math.max(-1.45, Math.min(1.45, me.pitch));
  }
  private hfov(me: Actor | null): number {
    if (this.fixedCam?.fov) return this.fixedCam.fov;
    if (me && me.alive && me.inv.slot === 0 && me.inv.scope > 0) {
      const f = me.inv.primary.def.scopeFov?.[me.inv.scope - 1];
      if (f) return f;
    }
    return this.settings.fov;
  }

  private updateCamera(dt: number, alpha: number): void {
    const cam = this.camera, me = this.sim?.player ?? null;
    const fov = vfovFromH(this.hfov(me), cam.aspect);
    if (Math.abs(cam.fov - fov) > 1e-3) { cam.fov = fov; cam.updateProjectionMatrix(); }
    if (this.fixedCam) {
      cam.position.fromArray(this.fixedCam.p);
      cam.rotation.set(this.fixedCam.pitch, this.fixedCam.yaw, 0);
      return;
    }
    if (!me || this.state === "menu") {
      // 菜单背景：缓慢环绕实际地图
      const t = this.time * 0.05;
      cam.position.set(Math.sin(t) * 34, 13 + Math.sin(t * 0.7) * 2, Math.cos(t) * 26);
      cam.lookAt(0, 0.5, 0);
      return;
    }
    const fx = this.feedback.fx, bob = this.settings.bob;
    fx.shake = Math.max(0, fx.shake - dt * 2.5);
    fx.landDip = Math.max(0, fx.landDip - dt * 5);
    cam.position.lerpVectors(this.prevEye, this.curEye, alpha);
    let pitch = me.pitch + me.kickP, yaw = me.yaw + me.kickY, roll = 0;
    if (me.alive) {
      const m = me.motor, sp = m.grounded ? Math.min(1, m.horizSpeed / 5) : 0;
      this.bobPhase += m.horizSpeed * dt * 1.9;
      if (bob) {
        cam.position.y += Math.abs(Math.sin(this.bobPhase)) * 0.028 * sp - fx.landDip * 0.06;
        roll = Math.sin(this.bobPhase) * 0.004 * sp;
        const s = fx.shake * fx.shake;
        pitch += Math.sin(this.time * 47) * 0.012 * s;
        yaw += Math.sin(this.time * 39 + 1) * 0.012 * s;
      }
    } else {
      // 死亡视角：下沉、侧倾，持续到复活
      const k = Math.min(1, (this.sim!.time - me.deathT) / 0.8), e = k * k * (3 - 2 * k);
      cam.position.y = THREE.MathUtils.lerp(me.motor.eyeY, me.y + 0.35, e);
      roll = e * 0.5;
      pitch = THREE.MathUtils.lerp(pitch, -0.25, e);
    }
    cam.rotation.set(pitch, yaw, roll);
  }
  private renderWorld(dt: number): void {
    const sim = this.sim, me = sim?.player ?? null, cam = this.camera;
    this.env.update(this.time, cam.position);
    if (sim) {
      this.chars.update(sim.actors, this.fixedCam ? null : me, dt, this.time);
      this.effects.update(dt, sim.smokes, sim.grenades, this.time);
    }
    const r = this.renderer;
    r.info.reset();
    r.clear();
    r.render(this.scene, cam);
    const fp = !!me && !this.fixedCam && this.state !== "menu";
    if (fp && me) {
      this.sunView.copy(SUN_DIR).transformDirection(cam.matrixWorldInverse);
      this.vm.update(me, dt, this.time, this.lastLook[0], this.lastLook[1], this.settings.bob, this.sunView);
      r.clearDepth();
      r.render(this.vm.scene, this.vm.camera);
    }
    // 空间音频监听者跟随相机
    cam.getWorldDirection(this.dir);
    const up = this.up.set(0, 1, 0).applyQuaternion(cam.quaternion);
    this.audio.setListener(cam.position, this.dir, up);
    this.hud.root.style.display = sim && this.state !== "menu" && !this.fixedCam ? "block" : "none";
    if (sim && me && this.state !== "menu") this.updateHud(sim, me, dt);
  }

  private updateHud(sim: Sim, me: Actor, dt: number): void {
    const cam = this.camera;
    const spread = sim.spreadOf(me);
    const px = (Math.tan(spread) / Math.tan((cam.fov * Math.PI) / 360)) * (this.renderer.domElement.clientHeight / 2);
    const scoped = me.inv.slot === 0 && me.inv.scope > 0;
    this.tagT -= dt;
    if (this.tagT <= 0) {
      this.tagT = 0.1;
      this.tagText = this.aimTag(sim, me);
    }
    const smoke = insideSmoke(sim.smokes, cam.position.x, cam.position.y, cam.position.z);
    const s = this.stats.summary();
    let fps = s.n ? `${s.fps.toFixed(0)} FPS · ${s.p50.toFixed(1)} ms · 绘制 ${this.renderer.info.render.calls}` : "测量中…";
    if (this.noLock) fps = `调试无锁模式 · ${fps}`;
    this.hud.update(sim, me, dt, px, { tab: this.input.tabHeld, smoke, tag: this.tagText, fps, scoped });
  }

  /** 准星下的角色名：只在实际视线（实体 + 烟雾）通畅时显示 */
  private aimTag(sim: Sim, me: Actor): string | null {
    if (!me.alive) return null;
    const e = me.eye(), d = me.aimDir();
    let best: Actor | null = null, bt = 80;
    for (const a of sim.actors) {
      if (a === me || !a.alive) continue;
      const h = rayCharacter(a, e[0], e[1], e[2], d[0], d[1], d[2], bt);
      if (h && h.t < bt) { bt = h.t; best = a; }
    }
    if (!best) return null;
    if (sim.world.firstHit(e[0], e[1], e[2], d[0], d[1], d[2], bt, sightFilter) < bt) return null;
    if (!lineOfSight(sim.world, sim.smokes, e, best)) return null;
    return best.team === me.team ? `友军 · ${best.name}` : `敌人 · ${best.name}`;
  }

  get player(): Actor | null {
    return this.sim?.player ?? null;
  }

  resnapEye(): void {
    this.snapEye();
  }

  /** 调试：以正式固定步长推进模拟（玩家无输入），返回推进的步数 */
  fastForward(sec: number): number {
    const sim = this.sim;
    if (!sim || sim.ended) return 0;
    const me = sim.player;
    let n = 0;
    for (let t = 0; t < sec && !sim.ended; t += SIM_DT, n++) {
      if (me) { clearEdges(me.intent); me.intent.fire = false; me.intent.fwd = me.intent.right = 0; }
      sim.step(SIM_DT);
      this.feedback.handle(sim, me, sim.events);
    }
    this.snapEye();
    if (sim.ended && this.state !== "ended") this.end();
    return n;
  }
}

