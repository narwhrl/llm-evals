// 武器与装备状态机。所有计时由固定步长驱动；弹药只在换弹完成时从备弹转入弹匣。
import { GRENADE, GUNS, KNIFE, type GunDef, type MeleeAttack, type PrimaryId, type Slot } from "../config";

export class GunState {
  mag: number;
  reserve: number;
  cooldown = 0; // 下一发前的间隔（栓动时即拉栓时长）
  reloadT = -1; // <0 表示未换弹，否则为已进行时长
  shotsInBurst = 0;
  bloom = 0; // 连续射击累积的散布
  sinceShot = 99;
  constructor(readonly def: GunDef) {
    this.mag = def.mag;
    this.reserve = def.reserve;
  }
  get reloading(): boolean {
    return this.reloadT >= 0;
  }
  get reloadProgress(): number {
    return this.reloadT < 0 ? 0 : Math.min(1, this.reloadT / this.def.reloadTime);
  }
  /** 栓动武器的拉栓进度 0..1；非栓动恒为 1 */
  get boltProgress(): number {
    if (this.def.mode !== "bolt" || !this.def.boltTime) return 1;
    return 1 - Math.max(0, this.cooldown) / this.def.boltTime;
  }
  canReload(): boolean {
    return !this.reloading && this.mag < this.def.mag && this.reserve > 0;
  }
  startReload(): boolean {
    if (!this.canReload()) return false;
    this.reloadT = 0;
    return true;
  }
  cancelReload(): void {
    this.reloadT = -1;
  }
  /** 推进计时；返回 true 表示本步换弹完成 */
  tick(dt: number): boolean {
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.sinceShot += dt;
    if (this.sinceShot > 60 / this.def.rpm + 0.05) {
      this.shotsInBurst = 0;
      this.bloom = Math.max(0, this.bloom - this.def.spreadRecover * dt);
    }
    if (this.reloadT >= 0) {
      this.reloadT += dt;
      if (this.reloadT >= this.def.reloadTime) {
        const take = Math.min(this.def.mag - this.mag, this.reserve);
        this.mag += take;
        this.reserve -= take;
        this.reloadT = -1;
        return true;
      }
    }
    return false;
  }
  /** 消耗一发；调用前须确认可开火 */
  consume(): void {
    this.mag--;
    this.cooldown = this.def.mode === "bolt" ? (this.def.boltTime ?? 1) : 60 / this.def.rpm;
    this.shotsInBurst++;
    this.sinceShot = 0;
    this.bloom = Math.min(this.def.spreadMax, this.bloom + this.def.spreadPerShot);
  }
  refill(): void {
    this.mag = this.def.mag;
    this.reserve = this.def.reserve;
    this.cooldown = 0;
    this.reloadT = -1;
    this.shotsInBurst = 0;
    this.bloom = 0;
  }
}

export type GrenadeKind = "he" | "smoke";

export type InvEvent =
  | { type: "shot"; gun: GunState }
  | { type: "dry" }
  | { type: "reloadStart"; gun: GunState }
  | { type: "reloadDone"; gun: GunState }
  | { type: "melee"; heavy: boolean; attack: MeleeAttack }
  | { type: "meleeSwing"; heavy: boolean }
  | { type: "throw"; kind: GrenadeKind; lob: boolean }
  | { type: "switch"; slot: Slot }
  | { type: "scope"; level: number };

/** 一名角色的全部装备。玩家和电脑共用同一套规则。 */
export class Inventory {
  primary: GunState;
  pistol: GunState;
  nades: Record<GrenadeKind, number> = { he: 1, smoke: 1 };
  nadeSel: GrenadeKind = "he";
  slot: Slot = 0;
  lastSlot: Slot = 1;
  drawT = 0; // 切出剩余时间
  scope = 0; // 0 未开镜，1/2 为倍率档
  meleeT = -1; // 近战动作已进行时长
  meleeHeavy = false;
  meleeHitDone = false;
  throwT = -1; // 投掷动作已进行时长
  throwKind: GrenadeKind = "he";
  throwReturn: Slot | null = null;
  throwLob = false;
  triggerHeld = false;
  private triggerEdge = false;
  private dryLatch = false;
  readonly events: InvEvent[] = [];

  constructor(primaryId: PrimaryId) {
    this.primary = new GunState(GUNS[primaryId]);
    this.pistol = new GunState(GUNS.deagle);
    this.drawT = this.primary.def.drawTime;
  }

  get gun(): GunState | null {
    return this.slot === 0 ? this.primary : this.slot === 1 ? this.pistol : null;
  }
  get busy(): boolean {
    return this.meleeT >= 0 || this.throwT >= 0;
  }
  get totalNades(): number {
    return this.nades.he + this.nades.smoke;
  }
  get moveMul(): number {
    const g = this.gun;
    if (g) return g.def.moveMul * (this.scope > 0 ? 0.8 : 1);
    return this.slot === 2 ? KNIFE.moveMul : 1.05;
  }
  drawTimeOf(slot: Slot): number {
    return slot === 0 ? this.primary.def.drawTime : slot === 1 ? this.pistol.def.drawTime : slot === 2 ? KNIFE.drawTime : GRENADE.drawTime;
  }

  has(slot: Slot): boolean {
    return slot !== 3 || this.totalNades > 0;
  }

  select(slot: Slot): void {
    if (!this.has(slot)) return;
    if (slot === this.slot) {
      if (slot === 3 && this.nades[other(this.nadeSel)] > 0) this.nadeSel = other(this.nadeSel);
      return;
    }
    if (this.throwT >= 0) return; // 投掷动作已开始，不能中断
    this.gun?.cancelReload();
    this.meleeT = -1;
    this.lastSlot = this.slot;
    this.slot = slot;
    this.scope = 0;
    this.drawT = this.drawTimeOf(slot);
    if (slot === 3 && this.nades[this.nadeSel] <= 0) this.nadeSel = other(this.nadeSel);
    this.events.push({ type: "switch", slot });
  }

  cycle(dir: 1 | -1): void {
    const order: Slot[] = [0, 1, 2, 3];
    let i = order.indexOf(this.slot);
    for (let k = 0; k < 4; k++) {
      i = (i + dir + 4) % 4;
      if (this.has(order[i])) { this.select(order[i]); return; }
    }
  }

  quickSwitch(): void {
    this.select(this.has(this.lastSlot) ? this.lastSlot : 0);
  }

  setTrigger(held: boolean): void {
    if (held && !this.triggerHeld) this.triggerEdge = true;
    if (!held) this.dryLatch = false;
    this.triggerHeld = held;
  }

  reload(): void {
    const g = this.gun;
    if (!g || this.busy || this.drawT > 0) return;
    if (g.startReload()) {
      this.scope = 0;
      this.events.push({ type: "reloadStart", gun: g });
    }
  }

  /** 右键：狙击开镜循环 / 近战重击 */
  alt(): void {
    if (this.slot === 2) { this.startMelee(true); return; }
    const g = this.gun;
    if (!g || !g.def.scopeFov || g.reloading || this.drawT > 0) return;
    this.scope = (this.scope + 1) % (g.def.scopeFov.length + 1);
    this.events.push({ type: "scope", level: this.scope });
  }

  /** G 键：直接投出当前选择的投掷物，结束后回到原装备 */
  quickThrow(): void {
    if (this.busy || this.totalNades <= 0) return;
    if (this.nades[this.nadeSel] <= 0) this.nadeSel = other(this.nadeSel);
    const back = this.slot === 3 ? null : this.slot;
    if (this.slot !== 3) {
      this.gun?.cancelReload();
      this.lastSlot = this.slot;
      this.slot = 3;
      this.scope = 0;
      this.drawT = 0;
    }
    this.beginThrow(back, false);
  }

  private beginThrow(back: Slot | null, lob: boolean): void {
    this.throwT = 0;
    this.throwKind = this.nadeSel;
    this.throwReturn = back;
    this.throwLob = lob;
  }

  private startMelee(heavy: boolean): void {
    if (this.meleeT >= 0 || this.drawT > 0) return;
    this.meleeT = 0;
    this.meleeHeavy = heavy;
    this.meleeHitDone = false;
    this.events.push({ type: "meleeSwing", heavy });
  }

  /** 推进一步。产生的事件写入 events，由对局逻辑消费后清空。 */
  tick(dt: number): void {
    this.drawT = Math.max(0, this.drawT - dt);
    // 两把枪的冷却都会推进（收起时拉栓也在进行），换弹只可能发生在当前枪上
    this.primary.cooldown = Math.max(0, this.primary.cooldown - (this.slot === 0 ? 0 : dt));
    this.pistol.cooldown = Math.max(0, this.pistol.cooldown - (this.slot === 1 ? 0 : dt));
    const g = this.gun;
    if (g && g.tick(dt)) this.events.push({ type: "reloadDone", gun: g });

    const edge = this.triggerEdge;
    this.triggerEdge = false;

    if (this.meleeT >= 0) this.tickMelee(dt);
    if (this.throwT >= 0) { this.tickThrow(dt); return; }
    if (this.drawT > 0) return;

    if (g) {
      if (!this.triggerHeld) return;
      if (g.reloading) return;
      if (g.mag <= 0) {
        if (!this.dryLatch) {
          this.dryLatch = true;
          this.events.push({ type: "dry" });
          if (g.startReload()) { this.scope = 0; this.events.push({ type: "reloadStart", gun: g }); }
        }
        return;
      }
      if (g.cooldown > 0) return;
      if (g.def.mode !== "auto" && !edge) return;
      g.consume();
      this.events.push({ type: "shot", gun: g });
      if (g.def.mode === "bolt" && this.scope > 0) {
        this.scope = 0;
        this.events.push({ type: "scope", level: 0 });
      }
      return;
    }
    if (this.slot === 2) {
      if (this.triggerHeld && this.meleeT < 0) this.startMelee(false);
      return;
    }
    if (this.slot === 3 && edge && this.nades[this.nadeSel] > 0) this.beginThrow(null, false);
  }

  private tickMelee(dt: number): void {
    const atk = this.meleeHeavy ? KNIFE.heavy : KNIFE.light;
    this.meleeT += dt;
    if (!this.meleeHitDone && this.meleeT >= atk.hitTime) {
      this.meleeHitDone = true;
      this.events.push({ type: "melee", heavy: this.meleeHeavy, attack: atk });
    }
    if (this.meleeT >= atk.recovery) this.meleeT = -1;
  }

  private tickThrow(dt: number): void {
    const before = this.throwT;
    this.throwT += dt;
    if (before < GRENADE.throwTime && this.throwT >= GRENADE.throwTime) {
      if (this.nades[this.throwKind] > 0) {
        this.nades[this.throwKind]--;
        this.events.push({ type: "throw", kind: this.throwKind, lob: this.throwLob });
      }
    }
    if (this.throwT >= GRENADE.throwTime + 0.25) {
      this.throwT = -1;
      const back = this.throwReturn;
      this.throwReturn = null;
      if (this.nades[this.nadeSel] <= 0) this.nadeSel = other(this.nadeSel);
      const next: Slot = back ?? (this.totalNades > 0 ? 3 : 0);
      if (next !== 3) {
        this.slot = next;
        this.drawT = this.drawTimeOf(next);
        this.events.push({ type: "switch", slot: next });
      }
    }
  }

  /** 出生：恢复满弹药与投掷物，换上本次出生生效的主武器 */
  respawn(primaryId: PrimaryId): void {
    if (this.primary.def.id !== primaryId) this.primary = new GunState(GUNS[primaryId]);
    else this.primary.refill();
    this.pistol.refill();
    this.nades = { he: 1, smoke: 1 };
    this.nadeSel = "he";
    this.slot = 0;
    this.lastSlot = 1;
    this.scope = 0;
    this.meleeT = -1;
    this.throwT = -1;
    this.throwReturn = null;
    this.triggerHeld = false;
    this.triggerEdge = false;
    this.dryLatch = false;
    this.drawT = this.primary.def.drawTime;
    this.events.length = 0;
  }

  /** 死亡、暂停、结算时清空持续输入与进行中的动作（不改变弹药） */
  interrupt(): void {
    this.triggerHeld = false;
    this.triggerEdge = false;
    this.dryLatch = false;
    this.gun?.cancelReload();
    this.meleeT = -1;
    this.scope = 0;
  }
}

function other(k: GrenadeKind): GrenadeKind {
  return k === "he" ? "smoke" : "he";
}
