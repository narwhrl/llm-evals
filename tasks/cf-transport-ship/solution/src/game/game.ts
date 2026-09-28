/**
 * Game：渲染、输入、对局编排。
 * 玩家与电脑共用同一开火/弹道/伤害/感知管线；固定步长仿真保证帧率无关性。
 */
import * as THREE from 'three';
import { COMBAT, PLAYER, SIM, WEAPONS } from '../core/config';
import { Rng } from '../core/rng';
import { ColliderWorld } from '../physics/world';
import { buildMap, MapBuildResult } from '../map/build';
import { Character, pickBotName } from '../entities/character';
import { CharacterModel } from '../entities/characterModel';
import { ViewModel } from '../entities/viewmodel';
import { Effects } from '../fx/effects';
import { AudioEngine } from '../audio/audio';
import { SmokeRegistry } from '../combat/smoke';
import { Grenade } from '../combat/projectiles';
import { resolveMelee, resolveShot } from '../combat/shooting';
import { activeWeapon, consumeGrenade, switchSlot } from '../combat/weapons';
import { BotBrain, BotHost, BotRole } from '../ai/bot';
import { NavGraph, buildNavGraph } from '../ai/nav';
import { Match } from './match';
import { Hud } from '../ui/hud';
import { Minimap } from '../ui/minimap';
import { UIMenu, StartConfig } from '../ui/menu';
import { Settings, loadSettings, saveSettings } from '../ui/settings';
import { STATIONS } from '../map/mapData';
import { clamp } from '../geometry/math';

export type GamePhase = 'menu' | 'playing' | 'paused' | 'dead' | 'ended';

export class Game {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  vm: ViewModel;
  world = new ColliderWorld();
  smoke = new SmokeRegistry();
  effects = new Effects();
  audio = new AudioEngine();
  hud = new Hud();
  minimap: Minimap;
  menu: UIMenu;
  settings: Settings;
  private mapBuild: MapBuildResult | null = null;
  private sun: THREE.DirectionalLight;
  private models = new Map<number, CharacterModel>();
  private nav: NavGraph;
  private rng = new Rng(0xc0ffee);

  characters: Character[] = [];
  player: Character | null = null;
  bots: BotBrain[] = [];
  grenades: Grenade[] = [];
  match: Match | null = null;
  phase: GamePhase = 'menu';

  // 时钟
  private simTime = 0;
  private acc = 0;
  private lastReal = 0;
  private frameCount = 0;

  // 输入
  private keys = new Set<string>();
  private mouseDownL = false;
  private mouseDownR = false;
  private wantFireClick = false;
  private locked = false;
  private tabHeld = false;
  private recoilPool = 0;
  private ads01 = 0;
  private bobT = 0;
  private quickNadeUntil = 0;
  private quickNadePrevSlot = 0;
  private meleeSwingAt = -9;
  private meleeHeavy = false;

  // 菜单背景相机
  private menuCamT = 0;

  // 诊断
  devMode = false;
  devCameraOverride: { pos: [number, number, number]; look: [number, number, number]; fov: number } | null = null;
  devLastShot: { origin: { x: number; y: number; z: number }; dir: { x: number; y: number; z: number }; spread: number; result: { stoppedBy: string; damages: number; end: { x: number; y: number; z: number } } } | null = null;
  fps = 0;
  private fpsFrames = 0;
  private fpsTime = 0;
  onPhaseChange: (p: GamePhase) => void = () => {};

  constructor(private canvas: HTMLCanvasElement) {
    this.settings = loadSettings().settings;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.scene.fog = new THREE.FogExp2(0xa8c2d4, 0.0035);

    this.camera = new THREE.PerspectiveCamera(this.settings.fov, window.innerWidth / window.innerHeight, 0.05, 600);
    this.vm = new ViewModel('blue');
    this.minimap = new Minimap(document.getElementById('minimap') as HTMLCanvasElement);
    this.menu = new UIMenu(this.settings);
    this.nav = buildNavGraph();

    // 灯光
    const hemi = new THREE.HemisphereLight(0xbdd3e4, 0x4a565e, 0.85);
    this.scene.add(hemi);
    this.sun = new THREE.DirectionalLight(0xfff1d8, 2.4);
    this.sun.position.set(60, 90, -45);
    this.sun.castShadow = true;
    this.sun.shadow.camera.left = -75;
    this.sun.shadow.camera.right = 75;
    this.sun.shadow.camera.top = 40;
    this.sun.shadow.camera.bottom = -40;
    this.sun.shadow.camera.far = 260;
    this.sun.shadow.bias = -0.0006;
    this.scene.add(this.sun);
    this.scene.add(new THREE.AmbientLight(0x8fa4b4, 0.25));

    this.buildStaticMap();
    this.applyQuality();

    this.bindUI();
    this.bindInput();
    // 菜单背景：初始就渲染一帧（rAF 节流时仍可见）
    this.updateCameraMenu(0.016);
    this.renderer.render(this.scene, this.camera);
  }

  private buildStaticMap(): void {
    this.world.clear();
    this.mapBuild?.dispose();
    if (this.mapBuild) this.scene.remove(this.mapBuild.group);
    this.mapBuild = buildMap(this.world);
    this.scene.add(this.mapBuild.group);
    this.minimap.bake(this.world);
  }

  private applyQuality(): void {
    const q = this.settings.quality;
    if (q === 'low') {
      this.renderer.shadowMap.enabled = false;
      this.renderer.setPixelRatio(1);
    } else if (q === 'med') {
      this.renderer.shadowMap.enabled = true;
      this.sun.shadow.mapSize.set(1024, 1024);
      this.renderer.setPixelRatio(1);
    } else {
      this.renderer.shadowMap.enabled = true;
      this.sun.shadow.mapSize.set(2048, 2048);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }
    this.sun.shadow.map?.dispose();
    this.sun.shadow.map = null;
    this.effects.setQuality(q);
  }

  // ---------------- UI 绑定 ----------------
  private bindUI(): void {
    this.menu.onStart = (cfg) => this.startMatch(cfg);
    this.menu.onResume = () => this.requestLock();
    this.menu.onQuit = () => this.quitToMenu();
    this.menu.onAgain = () => this.restart();
    this.menu.onMenu = () => this.quitToMenu();
    this.menu.onSettings = (s) => {
      const qualityChanged = s.quality !== this.settings.quality;
      this.settings = { ...s };
      this.applySettings({ qualityChanged });
    };
    this.menu.audioKick = () => { this.audio.init(); this.audio.resume(); };
    // 首次任意交互激活音频
    const kick = () => { this.audio.init(); this.audio.resume(); };
    window.addEventListener('pointerdown', kick, { once: true });
    window.addEventListener('keydown', kick, { once: true });
  }

  applySettings(opts: { qualityChanged?: boolean } = {}): void {
    this.camera.fov = this.settings.fov;
    this.camera.updateProjectionMatrix();
    this.audio.setVolumes(this.settings.masterVolume, this.settings.sfxVolume);
    this.menu.syncSettings(this.settings);
    if (opts.qualityChanged) this.buildStaticMap();
    this.applyQuality();
    const r = saveSettings(this.settings);
    if (!r.ok) console.warn('设置保存失败（保持会话内生效）：', r.error);
  }

  // ---------------- 输入 ----------------
  private bindInput(): void {
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      if (!this.locked && this.phase === 'playing') {
        this.setPhase('paused');
        this.clearInputs();
      }
      // 重新获得锁定：从暂停恢复对局
      if (this.locked && this.phase === 'paused' && this.match && !this.match.ended && this.player?.alive) {
        this.setPhase('playing');
      }
    });
    document.addEventListener('pointerlockerror', () => {
      console.warn('指针锁定失败：请再次点击画面');
    });
    // 点击画面：未锁定时请求锁定（Esc / 失焦后返回游戏的入口）
    this.canvas.addEventListener('click', () => {
      if ((this.phase === 'playing' || this.phase === 'paused') && !this.locked) {
        this.requestLock();
      }
    });
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.locked) return;
      if (e.button === 0) { this.mouseDownL = true; this.wantFireClick = true; }
      if (e.button === 2) { this.mouseDownR = true; }
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseDownL = false;
      if (e.button === 2) this.mouseDownR = false;
    });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('mousemove', (e) => {
      if (!this.locked || !this.player || this.phase !== 'playing') return;
      const p = this.player;
      let sens = this.settings.sensitivity * 0.0022;
      if (this.ads01 > 0.5 && p.weaponDef.adsFov > 0) sens *= this.settings.adsSensitivity * (p.weaponDef.adsFov / this.settings.fov);
      else if (this.ads01 > 0.5) sens *= this.settings.adsSensitivity;
      p.yaw -= e.movementX * sens;
      p.pitch -= (this.settings.invertY ? -1 : 1) * e.movementY * sens;
      p.pitch = clamp(p.pitch, -1.45, 1.45);
      this.vmLookDX = e.movementX;
      this.vmLookDY = e.movementY;
    });
    window.addEventListener('wheel', (e) => {
      if (!this.locked || this.phase !== 'playing' || !this.player) return;
      e.preventDefault();
      const dir = Math.sign(e.deltaY);
      this.cycleSlot(dir);
    }, { passive: false });
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Tab') {
        e.preventDefault();
        this.tabHeld = true;
      }
      if (this.phase === 'playing' && this.locked) {
        if (['Space', 'Tab', 'KeyQ'].includes(e.code)) e.preventDefault();
      }
      this.keys.add(e.code);
      if (this.phase !== 'playing' || !this.player) return;
      const now = this.simTime;
      switch (e.code) {
        case 'KeyR': this.reloadWeapon(this.player); break;
        case 'Digit1': this.playerSwitch(0); break;
        case 'Digit2': this.playerSwitch(1); break;
        case 'Digit3': this.playerSwitch(2); break;
        case 'Digit4': this.cycleGrenade(); break;
        case 'KeyQ': {
          const lo = this.player.loadout;
          switchSlot(lo, lo.lastSlot, now);
          this.vm.buildWeapon(activeWeapon(lo).cls);
          this.vm.playAnim('draw', now, activeWeapon(lo).drawTime);
          break;
        }
        case 'KeyG': this.quickThrow(); break;
        default: break;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Tab') this.tabHeld = false;
      this.keys.delete(e.code);
    });
    window.addEventListener('blur', () => this.clearInputs());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.clearInputs();
        if (this.phase === 'playing') this.setPhase('paused');
      }
    });
    window.addEventListener('resize', () => this.onResize());
  }
  private vmLookDX = 0;
  private vmLookDY = 0;

  private clearInputs(): void {
    this.keys.clear();
    this.mouseDownL = false;
    this.mouseDownR = false;
    this.tabHeld = false;
  }

  requestLock(): void {
    void this.canvas.requestPointerLock();
  }

  private playerSwitch(slot: number): void {
    if (!this.player) return;
    const lo = this.player.loadout;
    if (switchSlot(lo, slot, this.simTime)) {
      this.vm.buildWeapon(activeWeapon(lo).cls);
      this.vm.playAnim('draw', this.simTime, activeWeapon(lo).drawTime);
      this.audio.weaponSwitch();
    }
  }

  private cycleSlot(dir: number): void {
    if (!this.player) return;
    const order = [0, 1, 2, 3];
    let idx = order.indexOf(this.player.loadout.slot);
    idx = (idx + dir + order.length) % order.length;
    this.playerSwitch(order[idx]);
  }

  /** 4 键：循环投掷物类型并进入投掷模式 */
  private cycleGrenade(): void {
    if (!this.player) return;
    const lo = this.player.loadout;
    if (lo.slot !== 3) {
      this.playerSwitch(3);
    } else {
      const other = lo.grenadeSel === 'he' ? 'smoke' : 'he';
      if (lo.grenades[other] > 0) {
        lo.grenadeSel = other;
        this.vm.buildWeapon(other);
        this.vm.playAnim('draw', this.simTime, 0.3);
      }
    }
  }

  /** G 快速投掷：切出当前投掷物 → 投出 → 切回 */
  private quickThrow(): void {
    if (!this.player || !this.player.alive) return;
    const lo = this.player.loadout;
    if (lo.grenades[lo.grenadeSel] <= 0) {
      const other = lo.grenadeSel === 'he' ? 'smoke' : 'he';
      if (lo.grenades[other] > 0) lo.grenadeSel = other;
      else return;
    }
    this.quickNadePrevSlot = lo.slot !== 3 ? lo.slot : 0;
    switchSlot(lo, 3, this.simTime);
    this.vm.buildWeapon(lo.grenadeSel);
    this.vm.playAnim('draw', this.simTime, 0.2);
    this.quickNadeUntil = this.simTime + 0.24;
  }

  // ---------------- 对局生命周期 ----------------
  startMatch(cfg: StartConfig): void {
    this.lastCfg = cfg;
    this.audio.init();
    this.audio.resume();
    this.menu.hideMenu();
    this.menu.hideEnd();
    this.cleanupEntities();
    this.simTime = 0;
    this.acc = 0;

    const used = new Set<string>();
    this.rng = new Rng(Date.now() & 0xffff);

    // 玩家
    const player = new Character(cfg.team, '你', cfg.primary, true);
    this.player = player;
    this.characters = [player];
    this.vm.setTeam(cfg.team);

    // 队友 4 + 敌人 5
    const ownBots = 4, enemyBots = 5;
    const roles: BotRole[] = ['assault', 'flankPort', 'flankStar', 'sniper'];
    const weaponsFor = (role: BotRole) => {
      if (role === 'sniper') return 'awp';
      const r = this.rng.next();
      return r < 0.34 ? 'ak' : r < 0.67 ? 'm4' : 'mp5';
    };
    for (let i = 0; i < ownBots; i++) {
      const role = roles[i % roles.length];
      const c = new Character(cfg.team, pickBotName(cfg.team, used, this.rng), weaponsFor(role));
      this.characters.push(c);
    }
    const enemyTeam = cfg.team === 'blue' ? 'red' : 'blue';
    const enemyRoles: BotRole[] = ['assault', 'assault', 'flankPort', 'flankStar', 'sniper'];
    for (let i = 0; i < enemyBots; i++) {
      const role = enemyRoles[i];
      const c = new Character(enemyTeam, pickBotName(enemyTeam, used, this.rng), weaponsFor(role));
      this.characters.push(c);
    }

    // 模型（玩家不渲染本体）
    for (const c of this.characters) {
      if (c.isPlayer) continue;
      const m = new CharacterModel({ team: c.team, weaponCls: c.weaponDef.cls });
      this.scene.add(m.group);
      this.models.set(c.id, m);
    }

    // AI
    this.bots = [];
    let seed = 1;
    for (const c of this.characters) {
      if (c.isPlayer) continue;
      this.bots.push(new BotBrain(c, this.roleFor(c, enemyTeam, seed), cfg.difficulty, (Date.now() + seed * 7919) & 0xffffff, this.nav, () => this.botHost()));
      seed++;
    }

    this.match = new Match(cfg.mode, this.characters, this.world);
    this.match.playerTeam = cfg.team;
    this.match.reset(this.simTime);

    this.hud.show();
    this.minimap.bake(this.world);
    this.setPhase('playing');
    this.hud.centerMessage('对局开始', 1.4);
    this.requestLock();
  }

  private roleFor(c: Character, enemyTeam: string, seed: number): BotRole {
    // 己方 Assault/双翼/狙击；敌方均衡配置
    const isEnemy = c.team === enemyTeam;
    const pool: BotRole[] = isEnemy
      ? ['assault', 'assault', 'flankPort', 'flankStar', 'sniper']
      : ['assault', 'flankPort', 'flankStar', 'sniper'];
    return pool[(seed - 1) % pool.length];
  }

  restart(): void {
    if (!this.match || !this.player) return;
    const cfgSave = this.lastCfg;
    if (!cfgSave) return;
    this.menu.hideEnd();
    this.cleanupEntities();
    this.startMatch(cfgSave);
  }

  private lastCfg: StartConfig | null = null;

  quitToMenu(): void {
    if (document.pointerLockElement) document.exitPointerLock();
    this.cleanupEntities();
    this.match = null;
    this.player = null;
    this.hud.hide();
    this.menu.hidePause();
    this.menu.hideDeath();
    this.menu.hideEnd();
    this.menu.showMenu();
    this.setPhase('menu');
  }

  private cleanupEntities(): void {
    for (const [, m] of this.models) {
      this.scene.remove(m.group);
    }
    this.models.clear();
    for (const g of this.grenades) this.scene.remove(g.mesh);
    this.grenades = [];
    this.smoke.clear();
    this.effects.clear();
    this.characters = [];
    this.bots = [];
    this.clearInputs();
  }

  private setPhase(p: GamePhase): void {
    this.phase = p;
    if (p === 'paused') this.menu.showPause();
    else this.menu.hidePause();
    this.onPhaseChange(p);
  }

  // ---------------- 战斗管线（玩家/电脑共用） ----------------
  private botHost(): BotHost {
    return {
      world: this.world,
      smoke: this.smoke,
      characters: this.characters,
      now: this.simTime,
      fireWeapon: (c, aimAt) => this.fireWeapon(c, aimAt),
      throwGrenadeAt: (c, target) => this.throwGrenadeAt(c, target),
      reloadWeapon: (c) => this.reloadWeapon(c),
    };
  }

  reloadWeapon(c: Character): void {
    const ws = c.weaponState;
    if (!ws) return;
    if (ws.beginReload(this.simTime)) {
      if (c.isPlayer) {
        this.vm.playAnim('reload', this.simTime, ws.def.reloadTime);
        this.audio.reloadStage('out');
        setTimeout(() => this.audio.reloadStage('in'), ws.def.reloadTime * 450);
        setTimeout(() => this.audio.reloadStage('slide'), ws.def.reloadTime * 850);
      } else {
        this.audio.reloadStage('out', c.eyePos());
      }
    }
  }

  /** 统一开火：aimAt 为期望命中点（bot 带误差；玩家传 null 用当前朝向） */
  fireWeapon(c: Character, aimAt: { x: number; y: number; z: number } | null): void {
    const now = this.simTime;
    if (!c.alive || this.match?.ended) return;
    const lo = c.loadout;
    const def = activeWeapon(lo);
    if (now < lo.switchEnd) return;
    if (lo.slot === 3) {
      // 投掷模式下开火 = 投出
      this.throwGrenade(c, aimAt);
      return;
    }
    const ws = lo.slots[lo.slot];
    if (!ws) return;
    if (!ws.canFire(now)) {
      if (ws.dry && (c.isPlayer ? this.wantFireClick : true) && now > (ws.cooldownUntil)) {
        this.audio.dryFire(c.isPlayer ? undefined : c.eyePos());
        ws.cooldownUntil = now + 0.3;
      }
      return;
    }
    c.breakProtection(now);
    const fired = ws.fire(now);
    if (!fired) return;

    // 射击方向：玩家用当前视角；bot 朝 aimAt（含脑内误差）
    let origin = c.eyePos();
    let dir = c.lookDir();
    if (!c.isPlayer && aimAt) {
      const d = { x: aimAt.x - origin.x, y: aimAt.y - origin.y, z: aimAt.z - origin.z };
      const l = Math.hypot(d.x, d.y, d.z) || 1;
      dir = { x: d.x / l, y: d.y / l, z: d.z / l };
    }
    if (def.cls === 'melee') {
      const heavy = c.isPlayer ? this.meleeHeavy && now - this.meleeSwingAt < 0.1 : false;
      this.doMelee(c, origin, dir, def, heavy);
      return;
    }

    const spread = c.isPlayer ? c.currentSpread(now, this.ads01 > 0.6) : botSpread(c, now);
    const targets = this.characters.map((t) => ({
      id: t.id, team: t.team, alive: t.alive, crouching: t.crouching,
      pos: t.body.pos, yaw: t.yaw, radius: t.body.radius,
      standHeight: PLAYER.heightStand, crouchHeight: PLAYER.heightCrouch,
    }));
    const shot = resolveShot(this.world, targets, origin, dir, def, spread, this.rng, 240, c.team);
    if (this.devMode) {
      this.devLastShot = { origin: { ...origin }, dir: { ...dir }, spread, result: { stoppedBy: shot.stoppedBy, damages: shot.damages.length, end: { ...shot.endPoint } } };
    }
    this.applyShot(c, shot, def, origin, dir);
  }

  private applyShot(c: Character, shot: ReturnType<typeof resolveShot>, def: typeof WEAPONS[keyof typeof WEAPONS], origin: { x: number; y: number; z: number }, dir: { x: number; y: number; z: number }): void {
    const now = this.simTime;
    // 特效与声音
    const muzzle = {
      x: origin.x + dir.x * 0.5, y: origin.y + dir.y * 0.5 - 0.06, z: origin.z + dir.z * 0.5,
    };
    this.effects.muzzleFlash(muzzle, dir, now);
    this.effects.tracer(muzzle, shot.endPoint, def.tracerSpeed);
    for (const s of shot.surfaces) {
      this.effects.bulletHole(s.point, s.normal, s.surface);
      this.effects.impactPuff(s.point, s.surface);
    }
    if (c.isPlayer) {
      this.audio.gunshot(def.cls);
      // 后坐：视模 + 相机 + 瞄准扰动
      this.vm.fireKick(def.cls === 'sniper' ? 1.3 : def.cls === 'pistol' ? 0.7 : 0.45);
      this.recoilPool += def.recoilV * (this.ads01 > 0.6 ? 0.8 : 1) * (c.crouching ? 0.85 : 1);
      c.aimYaw += (this.rng.next() - 0.5) * 2 * def.recoilH * Math.PI / 180;
      // 抛壳（右手侧）
      const right = {
        x: Math.cos(c.yaw), y: 0, z: Math.sin(c.yaw),
      };
      this.effects.shell({ x: origin.x + dir.x * 0.3, y: origin.y - 0.05, z: origin.z + dir.z * 0.3 }, right);
      if (def.boltTime > 0) {
        this.vm.playAnim('bolt', now, Math.min(0.9, def.boltTime));
        setTimeout(() => this.audio.bolt(), 260);
      }
    } else {
      this.audio.gunshot(def.cls, c.eyePos());
      this.effects.shell(c.eyePos(), { x: Math.cos(c.yaw), y: 0, z: Math.sin(c.yaw) });
    }
    // 开火暴露（小地图）
    this.minimap.addFirePing(c.body.pos.x, c.body.pos.z, c.team, now);

    // 伤害结算
    for (const d of shot.damages) {
      const t = this.characters.find((x) => x.id === d.targetId);
      if (!t || !t.alive) continue;
      if (t.protectedNow(now)) continue;
      const dmgDir = dir;
      const applied = t.takeDamage(d.dmg, c, dmgDir, now);
      this.effects.bloodPuff(d.point);
      if (c.isPlayer && applied > 0) {
        this.hud.hit(d.part === 'head', !t.alive);
        this.audio.hitmarker(d.part === 'head');
        if (!t.alive) {
          this.audio.killCue();
          this.hud.centerMessage(d.part === 'head' ? '爆头击杀' : '击杀', 1.2);
        }
      }
    }
  }

  private doMelee(c: Character, origin: { x: number; y: number; z: number }, dir: { x: number; y: number; z: number }, def: typeof WEAPONS[keyof typeof WEAPONS], heavy: boolean): void {
    const now = this.simTime;
    const targets = this.characters.map((t) => ({
      id: t.id, team: t.team, alive: t.alive, crouching: t.crouching,
      pos: t.body.pos, yaw: t.yaw, radius: t.body.radius,
      standHeight: PLAYER.heightStand, crouchHeight: PLAYER.heightCrouch,
    }));
    const res = resolveMelee(this.world, targets, origin, dir, def, heavy, c.team);
    this.audio.meleeSwing(c.isPlayer ? undefined : c.eyePos());
    if (c.isPlayer) {
      this.vm.playAnim(heavy ? 'meleeHeavy' : 'melee', now, heavy ? 0.55 : 0.32);
    }
    if (res && res.hit) {
      const t = this.characters.find((x) => x.id === res.targetId);
      if (t && t.alive && !t.protectedNow(now)) {
        this.audio.meleeHit(res.point);
        t.takeDamage(res.dmg, c, dir, now);
        this.effects.bloodPuff(res.point);
        if (c.isPlayer) {
          this.hud.hit(false, !t.alive);
          if (!t.alive) { this.audio.killCue(); this.hud.centerMessage('击杀', 1.2); }
        }
      }
    }
  }

  throwGrenadeAt(c: Character, target: { x: number; y: number; z: number }): void {
    if (!c.alive || c.loadout.grenades.he <= 0) return;
    this.doThrow(c, 'he', target);
  }

  private throwGrenade(c: Character, aimAt: { x: number; y: number; z: number } | null): void {
    const lo = c.loadout;
    if (lo.grenades[lo.grenadeSel] <= 0) {
      // 自动切回主武器
      switchSlot(lo, 0, this.simTime);
      return;
    }
    const sel = lo.grenadeSel;
    if (c.isPlayer) {
      this.vm.playAnim('throw', this.simTime, 0.45);
    }
    this.doThrow(c, sel, aimAt);
  }

  private doThrow(c: Character, kind: 'he' | 'smoke', aimAt: { x: number; y: number; z: number } | null): void {
    const now = this.simTime;
    c.breakProtection(now);
    const lo = c.loadout;
    const origin = c.eyePos();
    let dir = c.lookDir();
    if (!c.isPlayer && aimAt) {
      const d = { x: aimAt.x - origin.x, y: aimAt.y - origin.y, z: aimAt.z - origin.z };
      const l = Math.hypot(d.x, d.y, d.z) || 1;
      dir = { x: d.x / l, y: d.y / l, z: d.z / l };
    }
    const vel = {
      x: dir.x * COMBAT.nadeThrowVel,
      y: dir.y * COMBAT.nadeThrowVel + COMBAT.nadeThrowVel * COMBAT.nadeUpBias,
      z: dir.z * COMBAT.nadeThrowVel,
    };
    const g = new Grenade(kind, { x: origin.x + dir.x * 0.4, y: origin.y + dir.y * 0.4, z: origin.z + dir.z * 0.4 }, vel, c);
    if (!consumeGrenade(lo)) return;
    this.scene.add(g.mesh);
    this.grenades.push(g);
    this.audio.nadePin(c.isPlayer ? undefined : origin);
    if (c.isPlayer) {
      // 投出后切回
      const back = this.quickNadePrevSlot;
      setTimeout(() => {
        if (this.phase === 'playing' && this.player) {
          switchSlot(this.player.loadout, back, this.simTime);
          this.vm.buildWeapon(activeWeapon(this.player.loadout).cls);
          this.vm.playAnim('draw', this.simTime, activeWeapon(this.player.loadout).drawTime);
        }
      }, 420);
    }
  }

  // ---------------- 仿真 ----------------
  tick(realDtMs: number): void {
    const realDt = Math.min(0.1, realDtMs / 1000);
    this.lastReal += realDt;
    this.frameCount++;
    this.fpsFrames++;
    this.fpsTime += realDt;
    if (this.fpsTime >= 0.5) {
      this.fps = Math.round(this.fpsFrames / this.fpsTime);
      this.fpsFrames = 0;
      this.fpsTime = 0;
    }

    if (this.phase === 'menu') {
      this.menuCamT += realDt;
      this.updateCameraMenu(realDt);
      this.mapBuild?.update(this.menuCamT, realDt);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    const running = this.phase === 'playing' || this.phase === 'dead';
    if (running) {
      this.acc += realDt;
      let steps = 0;
      while (this.acc >= SIM.dt && steps < SIM.maxStepsPerFrame) {
        this.stepSim(SIM.dt);
        this.acc -= SIM.dt;
        steps++;
      }
      if (steps >= SIM.maxStepsPerFrame) this.acc = 0;
    }

    // 相机与视觉
    this.updateCamera(realDt);
    this.updateModels(realDt);
    this.mapBuild?.update(this.simTime, realDt);
    this.effects.update(realDt, this.simTime, this.camera);
    this.updateHud(realDt);
    this.audio.updateListener(this.camera.position, this.camForward());

    this.renderer.render(this.scene, this.camera);
    if (this.player?.alive && this.phase === 'playing') {
      this.vm.update(realDt, this.simTime, {
        walkSpeed: Math.hypot(this.player.body.vel.x, this.player.body.vel.z),
        grounded: this.player.body.grounded,
        lookDX: this.vmLookDX, lookDY: this.vmLookDY,
        ads: this.ads01,
      });
      this.vmLookDX *= 0.6;
      this.vmLookDY *= 0.6;
      this.vm.render(this.renderer, this.camera, this.ads01 > 0.85 && this.player.weaponDef.adsFov > 0);
    }
  }

  /** 手动推进 n 帧（开发/截图模式，不依赖 rAF） */
  frame(n = 1, dtMs = 16.7): void {
    for (let i = 0; i < n; i++) this.tick(dtMs);
  }

  private stepSim(dt: number): void {
    const now = this.simTime;
    this.simTime += dt;

    if (this.match) this.match.update(dt, now);

    // 玩家
    if (this.player && this.phase === 'playing') {
      this.updatePlayer(dt, now);
    }
    // 机器人
    for (const b of this.bots) {
      b.update(dt);
      b.char.updateMovement(dt, b.intent, this.world, now);
      const ws = b.char.weaponState;
      if (ws) {
        if (ws.reloading && now >= ws.reloadEnd) ws.finishReload();
        ws.cool(dt);
      }
    }
    // 手雷
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i];
      g.update(dt, this.world);
      if (g.bounced) {
        g.bounced = false;
        this.audio.nadeBounce(g.pos);
      }
      if (g.fuse <= 0 || (g.kind === 'smoke' && g.fuse <= COMBAT.nadeFuse - COMBAT.smokeDelay)) {
        g.detonate(this.characters, this.world, this.smoke, this.effects, this.audio);
      }
      if (g.done) {
        this.scene.remove(g.mesh);
        this.grenades.splice(i, 1);
      }
    }
    this.smoke.update(dt);

    // 玩家换弹到点 & 冷却
    if (this.player) {
      const ws = this.player.weaponState;
      if (ws) {
        if (ws.reloading && now >= ws.reloadEnd) ws.finishReload();
        ws.cool(dt);
      }
      // 死亡视角 / 复活
      if (!this.player.alive && this.phase === 'playing') {
        this.setPhase('dead');
      }
      if (this.phase === 'dead') {
        const remain = this.player.respawnAt - now;
        this.menu.updateDeath(remain);
        if (this.match?.ended) {
          // 对局结束时死亡不再复活
        }
      }
    }

    // 对局结束
    if (this.match && this.match.ended && this.phase !== 'ended') {
      this.onMatchEnd();
    }

    // 角色事件（脚步/跳跃等）
    for (const c of this.characters) {
      const evts = c.drainEvents();
      for (const e of evts) {
        if (e.type === 'step') {
          const loud = e.loud as number;
          this.audio.footstep(c.body.pos, c.isPlayer ? loud * 0.7 : loud);
        } else if (e.type === 'jump') {
          this.audio.jump(c.isPlayer ? undefined : c.eyePos());
        } else if (e.type === 'land') {
          this.audio.land(c.body.pos, Boolean(e.hard));
        } else if (e.type === 'hurt') {
          if (c.isPlayer) {
            const from = this.characters.find((x) => x.id === e.from);
            if (from) {
              const ang = this.dmgDirectionDeg(from, c);
              this.hud.playerHurt(ang, c.hp);
            }
            this.audio.hurt();
          }
        } else if (e.type === 'death') {
          this.onDeath(c, e as unknown as { killer: number });
        }
      }
    }
  }

  private updatePlayer(dt: number, now: number): void {
    const p = this.player!;
    if (!p.alive) {
      p.updateMovement(dt, { forward: 0, right: 0, jump: false, crouch: false, silent: false, ads: false }, this.world, now);
      return;
    }
    const fwd = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const right = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    const jump = this.keys.has('Space');
    const crouch = this.keys.has('ControlLeft') || this.keys.has('KeyC');
    const silent = this.keys.has('ShiftLeft');

    // ADS（狙击开镜 / 步枪轻微稳定）
    const sniperAds = p.weaponDef.adsFov > 0 && this.mouseDownR && p.loadout.slot !== 2 && p.loadout.slot !== 3;
    const adsTarget = sniperAds ? 1 : (this.mouseDownR && p.loadout.slot <= 1 ? 0.35 : 0);
    this.ads01 += clamp(adsTarget - this.ads01, -dt * 6, dt * 6);

    // 开火
    const def = p.weaponDef;
    if (p.loadout.slot === 2) {
      // 近战：左键轻击，右键重击（各自独立触发时刻）
      if (this.wantFireClick) {
        this.meleeHeavy = false;
        this.meleeSwingAt = now;
        this.fireWeapon(p, null);
      } else if (this.mouseDownR && !this.meleeHeavyLatch) {
        this.meleeHeavy = true;
        this.meleeSwingAt = now;
        this.fireWeapon(p, null);
      }
      this.meleeHeavyLatch = this.mouseDownR;
    } else if (def.auto ? this.mouseDownL : this.wantFireClick) {
      this.fireWeapon(p, null);
    }
    this.wantFireClick = false;

    p.updateMovement(dt, { forward: fwd, right, jump, crouch, silent, ads: this.ads01 > 0.5 }, this.world, now);

    // 后坐恢复（部分自动回正）
    const rec = Math.min(this.recoilPool, def.recoilRecover * dt * 0.5);
    this.recoilPool -= rec;

    // 快速投掷到点
    if (this.quickNadeUntil > 0 && now >= this.quickNadeUntil) {
      this.quickNadeUntil = 0;
      this.throwGrenade(p, null);
    }

    // 离开出生保护区
    if (p.protectedNow(now)) {
      const teamSpawns = this.teamSpawnCenter(p.team);
      const d = Math.hypot(p.body.pos.x - teamSpawns.x, p.body.pos.z - teamSpawns.z);
      if (d > COMBAT.spawnProtectRadius + 6) p.breakProtection(now);
    }
  }
  private meleeHeavyLatch = false;

  private teamSpawnCenter(team: 'blue' | 'red'): { x: number; z: number } {
    return team === 'blue' ? { x: 57, z: 0 } : { x: -57, z: 0 };
  }

  private onDeath(victim: Character, e: { killer: number; [k: string]: unknown }): void {
    const killer = this.characters.find((c) => c.id === e.killer) ?? null;
    if (this.match) this.match.addKill(killer, victim);
    this.hud.addKill({
      killer: killer?.name ?? '世界', victim: victim.name,
      weapon: String(e.weapon || ''), killerTeam: killer?.team ?? 'red', victimTeam: victim.team,
      involvesPlayer: victim.isPlayer || killer?.isPlayer === true,
      t: performance.now() / 1000,
    });
    if (victim.isPlayer) {
      this.menu.showDeath(`被 ${killer?.name ?? '未知'} 击杀`, 3);
    }
  }

  private onMatchEnd(): void {
    if (!this.match || !this.player) return;
    this.setPhase('ended');
    if (document.pointerLockElement) document.exitPointerLock();
    this.menu.hideDeath();
    const snap = this.match.snapshot();
    const board = this.buildEndBoard();
    this.menu.showEnd(snap.result ?? 'draw', snap.blue, snap.red, board);
    this.hud.centerMessage(snap.result === 'win' ? '胜利' : snap.result === 'lose' ? '失败' : '平局', 3);
  }

  private buildEndBoard(): string {
    const rows = this.characters
      .slice()
      .sort((a, b) => b.kills - a.kills)
      .map((c) => `<tr class="${c.isPlayer ? 'me' : ''}"><td>${esc(c.name)}</td><td style="color:${c.team === 'blue' ? 'var(--blue)' : 'var(--red)'}">${c.team === 'blue' ? '保卫者' : '潜伏者'}</td><td>${c.kills}</td><td>${c.deaths}</td><td>${c.kills * 100}</td></tr>`)
      .join('');
    return `<table><tr><th>队员</th><th>阵营</th><th>击杀</th><th>死亡</th><th>得分</th></tr>${rows}</table>`;
  }

  // ---------------- 相机与视觉 ----------------
  private updateCameraMenu(dt: number): void {
    const st = STATIONS.find((s) => s.id === 'hero')!;
    const t = this.menuCamT * 0.06;
    const px = st.pos[0] + Math.sin(t) * 6;
    const pz = st.pos[2] + Math.cos(t) * 6;
    this.camera.position.set(px, st.pos[1], pz);
    this.camera.lookAt(st.look[0], st.look[1], st.look[2]);
    this.camera.fov = st.fov;
    this.camera.updateProjectionMatrix();
    void dt;
  }

  private updateCamera(realDt: number): void {
    const p = this.player;
    if (!p) return;
    if (this.devCameraOverride) {
      const o = this.devCameraOverride;
      this.camera.position.set(o.pos[0], o.pos[1], o.pos[2]);
      this.camera.lookAt(o.look[0], o.look[1], o.look[2]);
      if (Math.abs(this.camera.fov - o.fov) > 0.01) {
        this.camera.fov = o.fov;
        this.camera.updateProjectionMatrix();
      }
      return;
    }
    const def = p.weaponDef;
    // FOV：狙击真实开镜；普通枪轻微聚焦
    const targetFov = def.adsFov > 0
      ? this.settings.fov + (def.adsFov - this.settings.fov) * this.ads01
      : this.settings.fov * (1 - 0.08 * this.ads01);
    this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, realDt * 10);
    this.camera.updateProjectionMatrix();

    // 眼位 + 行走摆动
    let bobY = 0, bobRoll = 0;
    if (this.settings.headBob && p.alive) {
      const hSpeed = Math.hypot(p.body.vel.x, p.body.vel.z);
      if (p.body.grounded && hSpeed > 0.4) {
        this.bobT += realDt * (4 + hSpeed * 2.1);
        bobY = Math.abs(Math.sin(this.bobT)) * 0.028 * Math.min(1, hSpeed / 4.5);
        bobRoll = Math.sin(this.bobT) * 0.004 * Math.min(1, hSpeed / 4.5);
      }
    }
    const eye = p.eyePos();
    this.camera.position.set(eye.x, eye.y + bobY, eye.z);
    const pitch = p.pitch + this.recoilPool * 0.55;
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(pitch, p.yaw, bobRoll);
    // 死亡：低视角
    if (!p.alive) {
      this.camera.position.y = Math.max(0.35, this.camera.position.y - 1.0);
      this.camera.rotation.z = 0.5;
    }
    // 镜内遮罩
    const scopedNow = this.ads01 > 0.85 && def.adsFov > 0 && p.loadout.slot !== 2 && p.loadout.slot !== 3;
    if (scopedNow !== this.scopedPrev) {
      this.scopedPrev = scopedNow;
      this.hud.setScope(scopedNow, def.adsFov);
    }
    // 视模 ADS 状态
    this.vm.setAds(this.ads01);
  }
  private scopedPrev = false;

  private camForward(): { x: number; y: number; z: number } {
    const d = new THREE.Vector3();
    this.camera.getWorldDirection(d);
    return d;
  }

  private updateModels(dt: number): void {
    for (const c of this.characters) {
      const m = this.models.get(c.id);
      if (!m) continue;
      m.group.position.set(c.body.pos.x, c.body.pos.y, c.body.pos.z);
      m.setWeapon(c.weaponDef.cls);
      m.update(dt, {
        speed: Math.hypot(c.body.vel.x, c.body.vel.z),
        crouch01: c.crouch01, yaw: c.yaw, aimPitch: c.pitch + c.aimPitch,
        alive: c.alive,
        firing: false, reloading: c.weaponState?.reloading ?? false,
        grounded: c.body.grounded,
      });
    }
  }

  private updateHud(realDt: number): void {
    const p = this.player;
    if (!p || !this.match) return;
    const snap = this.match.snapshot();
    const spreadDeg = p.currentSpread(this.simTime, this.ads01 > 0.6);
    // 散布（度）→ 像素：近似投影 tan(spread)*屏高/2/fov 缩放
    const px = Math.tan((spreadDeg * Math.PI) / 180) / Math.tan((this.camera.fov * Math.PI / 360)) * (window.innerHeight / 2) + 4;
    this.hud.update(realDt, p, this.simTime, {
      ...snap,
      scoreboard: this.characters.map((c) => ({ name: c.name, team: c.team, kills: c.kills, deaths: c.deaths, alive: c.alive, isPlayer: c.isPlayer })),
      tab: this.tabHeld,
    }, { spreadPx: px, ads: this.ads01 > 0.5, scoped: this.scopedPrev });
    this.minimap.render(p, this.characters, this.simTime);
    this.hud.updateFeedTime();
    // 死亡阶段提示
    if (this.phase === 'dead' && p.alive) {
      this.menu.hideDeath();
      this.setPhase('playing');
      this.requestLock();
    }
  }

  private dmgDirectionDeg(from: Character, to: Character): number {
    const dx = from.body.pos.x - to.body.pos.x;
    const dz = from.body.pos.z - to.body.pos.z;
    const worldAng = Math.atan2(dx, -dz);
    return ((worldAng - to.yaw) * 180) / Math.PI;
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /** 只读弹道探针：复用生产判定，用于验收瞄准诊断 */
  probeShot(origin: { x: number; y: number; z: number }, dir: { x: number; y: number; z: number }, weaponId: string): Record<string, unknown> {
    const def = WEAPONS[weaponId] ?? WEAPONS.ak;
    const targets = this.characters.map((t) => ({
      id: t.id, team: t.team, alive: t.alive, crouching: t.crouching,
      pos: t.body.pos, yaw: t.yaw, radius: t.body.radius,
      standHeight: PLAYER.heightStand, crouchHeight: PLAYER.heightCrouch,
    }));
    const r = resolveShot(this.world, targets, origin, dir, def, 0, this.rng, 240, this.player?.team);
    return {
      stoppedBy: r.stoppedBy,
      endPoint: r.endPoint,
      damages: r.damages,
      surfaces: r.surfaces.map((s) => ({ tag: s.surface, point: s.point })),
    };
  }

  /** 调试/自动化快照 */
  snapshot(): Record<string, unknown> {
    return {
      phase: this.phase,
      lastShot: this.devLastShot,
      simTime: this.simTime,
      fps: this.fps,
      frame: this.frameCount,
      score: this.match ? this.match.snapshot() : null,
      player: this.player ? {
        alive: this.player.alive, hp: this.player.hp, armor: this.player.armor,
        pos: { ...this.player.body.pos }, yaw: this.player.yaw, pitch: this.player.pitch,
        slot: this.player.loadout.slot, weapon: this.player.weaponDef.id,
        ammo: this.player.loadout.slots.map((w) => ({ id: w.def.id, mag: w.mag, reserve: w.reserve })),
        grenades: { ...this.player.loadout.grenades },
      } : null,
      characters: this.characters.map((c) => ({
        id: c.id, name: c.name, team: c.team, alive: c.alive, hp: Math.round(c.hp),
        pos: { ...c.body.pos }, weapon: c.weaponDef.id, kills: c.kills, deaths: c.deaths,
      })),
      grenades: this.grenades.map((g) => ({ kind: g.kind, pos: { ...g.pos }, fuse: g.fuse })),
      smokes: this.smoke.clouds.map((s) => ({ pos: { ...s.pos }, age: s.age, active: s.active })),
      bots: this.bots.map((b) => b.debugState()),
    };
  }
}

function botSpread(c: Character, now: number): number {
  // 电脑散布：与武器一致 + 难度幅度
  return c.currentSpread(now, false) * 1.1;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
