/**
 * 武器状态机：弹药、射击间隔、换弹、拉栓、切枪。
 * 纯逻辑、时间由外部传入（测试可复现）；不触 DOM。
 */
import { WEAPONS, WeaponDef, GRENADE_IDS } from '../core/config';

export type GrenadeSel = 'he' | 'smoke';

export class WeaponState {
  readonly def: WeaponDef;
  mag: number;
  reserve: number;
  /** 下一次允许开火的时间（秒） */
  cooldownUntil = 0;
  reloadEnd = 0;
  reloading = false;
  boltEnd = 0;
  /** 连续射击散热（0..1，映射散布增长） */
  heat = 0;

  constructor(defId: string) {
    this.def = WEAPONS[defId];
    this.mag = this.def.mag;
    this.reserve = this.def.reserve;
  }

  canFire(now: number): boolean {
    if (this.reloading) return false;
    if (now < this.cooldownUntil) return false;
    if (now < this.boltEnd) return false;
    if (this.def.cls === 'melee') return true;
    return this.mag > 0;
  }

  /** 返回是否真正击发 */
  fire(now: number): boolean {
    if (!this.canFire(now)) return false;
    if (this.def.cls !== 'melee' && this.def.cls !== 'grenade') {
      this.mag -= 1;
    }
    // 槽位锚定射速：射击卡在节奏槽位上，与仿真采样频率无关（A28）
    this.cooldownUntil = (now - this.cooldownUntil > this.def.fireInterval ? now : this.cooldownUntil) + this.def.fireInterval;
    if (this.def.boltTime > 0) {
      // 栓动：射击后进入拉栓间隔（射速间隔之外叠加）
      this.boltEnd = now + this.def.boltTime;
    }
    this.heat = Math.min(1, this.heat + this.def.fireInterval);
    return true;
  }

  get dry(): boolean {
    return this.def.cls !== 'melee' && this.mag <= 0;
  }

  canReload(_now: number): boolean {
    if (this.reloading) return false;
    if (this.def.reloadTime <= 0) return false;
    if (this.def.cls === 'melee' || this.def.cls === 'grenade') return false;
    return this.mag < this.def.mag && this.reserve > 0;
  }

  beginReload(now: number): boolean {
    if (!this.canReload(now)) return false;
    this.reloading = true;
    this.reloadEnd = now + this.def.reloadTime;
    return true;
  }

  /** 换弹完成结算（由持有者在时刻到点调用）：弹药守恒 */
  finishReload(): void {
    if (!this.reloading) return;
    this.reloading = false;
    const need = this.def.mag - this.mag;
    const take = Math.min(need, this.reserve);
    this.mag += take;
    this.reserve -= take;
  }

  cancelReload(): void {
    this.reloading = false;
  }

  cool(dt: number): void {
    this.heat = Math.max(0, this.heat - dt * this.def.spreadRecover / Math.max(0.2, this.def.spreadGrow));
  }

  /** 出生/重置补满 */
  resetForSpawn(): void {
    this.mag = this.def.mag;
    this.reserve = this.def.reserve;
    this.reloading = false;
    this.cooldownUntil = 0;
    this.boltEnd = 0;
    this.heat = 0;
  }
}

export interface Loadout {
  primaryId: string;
  slots: WeaponState[];        // 0 主武器 1 手枪 2 近战
  grenades: Record<GrenadeSel, number>;
  slot: number;                // 0..2 枪械/近战；3 = 投掷物模式
  grenadeSel: GrenadeSel;
  switchEnd: number;           // 切枪完成时刻
  lastSlot: number;
}

export function createLoadout(primaryId: string): Loadout {
  return {
    primaryId,
    slots: [new WeaponState(primaryId), new WeaponState('de'), new WeaponState('knife')],
    grenades: { he: 1, smoke: 1 },
    slot: 0,
    grenadeSel: 'he',
    switchEnd: 0,
    lastSlot: 2,
  };
}

/** 当前生效的武器定义（含投掷物模式） */
export function activeWeapon(lo: Loadout): WeaponDef {
  if (lo.slot === 3) return WEAPONS[lo.grenadeSel];
  return lo.slots[lo.slot].def;
}

/** 切枪：返回是否成功（切枪期间允许，但会重置进行中的换弹） */
export function switchSlot(lo: Loadout, slot: number, now: number): boolean {
  if (slot === lo.slot) return false;
  if (slot === 3) {
    if (lo.grenades[lo.grenadeSel] <= 0) {
      // 尝试循环到另一种投掷物
      const other: GrenadeSel = lo.grenadeSel === 'he' ? 'smoke' : 'he';
      if (lo.grenades[other] > 0) lo.grenadeSel = other;
      else return false;
    }
  } else if (slot < 0 || slot > 2) return false;
  const cur = lo.slots[lo.slot];
  if (cur) cur.cancelReload();
  lo.lastSlot = lo.slot;
  lo.slot = slot;
  lo.switchEnd = now + activeWeapon(lo).drawTime;
  return true;
}

/** 消耗一枚投掷物（投出瞬间） */
export function consumeGrenade(lo: Loadout): boolean {
  if (lo.grenades[lo.grenadeSel] <= 0) return false;
  lo.grenades[lo.grenadeSel] -= 1;
  return true;
}

export function resetLoadout(lo: Loadout): void {
  for (const w of lo.slots) w.resetForSpawn();
  lo.grenades = { he: 1, smoke: 1 };
  lo.slot = 0;
  lo.grenadeSel = 'he';
  lo.switchEnd = 0;
  lo.lastSlot = 2;
}

export { GRENADE_IDS };
