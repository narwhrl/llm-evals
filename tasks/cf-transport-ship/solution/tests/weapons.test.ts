import { describe, expect, it } from 'vitest';
import { WeaponState, createLoadout, switchSlot, consumeGrenade, resetLoadout, activeWeapon } from '../src/combat/weapons';
import { Character } from '../src/entities/character';
import { COMBAT, WEAPONS } from '../src/core/config';

describe('弹药守恒', () => {
  it('射击消耗与射速间隔', () => {
    const w = new WeaponState('ak');
    let now = 0;
    let shots = 0;
    for (; now < 3; now += 1 / 120) {
      if (w.fire(now)) shots++;
    }
    expect(shots).toBe(Math.floor(3 * WEAPONS.ak.rpm / 60)); // 600rpm → 30 发
    expect(w.mag).toBe(30 - 30);
  });

  it('换弹守恒：部分弹匣 + 有限备弹', () => {
    const w = new WeaponState('ak');
    w.mag = 12; w.reserve = 10;
    expect(w.beginReload(10)).toBe(true);
    w.finishReload();
    expect(w.mag).toBe(22);
    expect(w.reserve).toBe(0);
  });

  it('零备弹不能换弹', () => {
    const w = new WeaponState('ak');
    w.mag = 5; w.reserve = 0;
    expect(w.beginReload(10)).toBe(false);
  });

  it('换弹中切枪：取消且不获得弹药', () => {
    const lo = createLoadout('ak');
    lo.slots[0].mag = 5;
    lo.slots[0].beginReload(0);
    switchSlot(lo, 1, 0.2);
    expect(lo.slots[0].reloading).toBe(false);
    expect(lo.slots[0].mag).toBe(5); // 未补弹
  });

  it('反复换弹不能凭空增弹', () => {
    const w = new WeaponState('de'); // 7/35
    for (let i = 0; i < 40; i++) w.fire(i * 0.3);
    expect(w.mag).toBe(0);
    const total = w.mag + w.reserve;
    w.beginReload(20);
    w.finishReload();
    expect(w.mag + w.reserve).toBe(total);
    // 中断：beginReload 后立即 cancel
    w.beginReload(30);
    w.cancelReload();
    expect(w.mag + w.reserve).toBe(total);
  });

  it('栓动间隔：射击后 boltEnd 生效，切枪不能绕过', () => {
    const w = new WeaponState('awp');
    expect(w.fire(0)).toBe(true);
    expect(w.canFire(0.5)).toBe(false); // 拉栓/射速间隔中
    expect(w.canFire(1.35)).toBe(true);
    // 切枪重置 cooldown 但 bolt 状态独立于 loadout
    const lo = createLoadout('awp');
    lo.slots[0].fire(0);
    switchSlot(lo, 1, 0.01);
    switchSlot(lo, 0, 0.02);
    expect(lo.slots[0].canFire(0.03)).toBe(false); // drawTime 未过
    expect(lo.slots[0].canFire(1.4)).toBe(true);
  });

  it('出生重置补满弹药', () => {
    const lo = createLoadout('mp5');
    for (let i = 0; i < 30; i++) lo.slots[0].fire(i * 0.066);
    lo.grenades.he = 0;
    resetLoadout(lo);
    expect(lo.slots[0].mag).toBe(30);
    expect(lo.slots[0].reserve).toBe(120);
    expect(lo.grenades.he).toBe(1);
    expect(lo.slot).toBe(0);
  });
});

describe('装备切换', () => {
  it('1/2/3/4 与 Q 切换', () => {
    const lo = createLoadout('ak');
    expect(switchSlot(lo, 2, 0)).toBe(true);
    expect(lo.slot).toBe(2);
    expect(activeWeapon(lo).id).toBe('knife');
    switchSlot(lo, 0, 1);
    expect(lo.lastSlot).toBe(2);
    expect(switchSlot(lo, 3, 2)).toBe(true); // 投掷物
    expect(lo.slot).toBe(3);
    expect(switchSlot(lo, 3, 3)).toBe(false); // 重复
  });
  it('投掷物耗尽后 4 不可进入', () => {
    const lo = createLoadout('ak');
    lo.grenades.he = 0;
    lo.grenades.smoke = 0;
    expect(switchSlot(lo, 3, 0)).toBe(false);
  });
  it('消耗投掷物', () => {
    const lo = createLoadout('ak');
    expect(consumeGrenade(lo)).toBe(true);
    expect(lo.grenades.he).toBe(0);
  });
});

describe('生命 / 护甲 / 死亡幂等', () => {
  const mk = () => new Character('red', '测试', 'ak');

  it('护甲吸收 50% 并扣减', () => {
    const c = mk();
    c.takeDamage(30, null, { x: 1, y: 0, z: 0 }, 0);
    expect(c.hp).toBeCloseTo(100 - 15, 5);
    expect(c.armor).toBeCloseTo(100 - 15, 5);
  });

  it('护甲耗尽后全额扣血', () => {
    const c = mk();
    c.armor = 4;
    c.takeDamage(30, null, { x: 1, y: 0, z: 0 }, 0);
    // 吸收 min(4, 15)=4，护甲归零，其余 26 扣血
    expect(c.armor).toBe(0);
    expect(c.hp).toBeCloseTo(100 - 26, 5);
  });

  it('死亡只结算一次，重复伤害无效', () => {
    const a = mk();
    const b = new Character('blue', '击杀者', 'ak');
    expect(a.takeDamage(300, b, { x: 1, y: 0, z: 0 }, 0)).toBeGreaterThan(0);
    expect(a.alive).toBe(false);
    expect(b.kills).toBe(1);
    // 第二次致死伤害
    expect(a.takeDamage(300, b, { x: 1, y: 0, z: 0 }, 0.1)).toBe(0);
    expect(b.kills).toBe(1); // 不重复计分
    expect(a.die(b, 0.2)).toBe(false);
  });

  it('出生保护期内不受伤害', () => {
    const c = mk();
    c.respawn({ x: 57, y: 0, z: 0 }, 3.14, 0);
    expect(c.protectedNow(0.5)).toBe(true);
    expect(c.takeDamage(80, null, { x: 0, y: 0, z: 1 }, 1.0)).toBe(0);
    expect(c.hp).toBe(100);
    // 开火解除
    c.breakProtection(1.2);
    expect(c.protectedNow(1.3)).toBe(false);
    expect(c.takeDamage(80, null, { x: 0, y: 0, z: 1 }, 1.4)).toBeGreaterThan(0);
  });

  it('复活恢复全部状态', () => {
    const c = mk();
    c.takeDamage(300, null, { x: 0, y: 0, z: 1 }, 0);
    expect(c.alive).toBe(false);
    c.respawn({ x: -57, y: 0, z: 2 }, 1.5, 5);
    expect(c.alive).toBe(true);
    expect(c.hp).toBe(COMBAT.hp);
    expect(c.armor).toBe(COMBAT.armor);
    expect(c.loadout.slots[0].mag).toBe(c.loadout.slots[0].def.mag);
    expect(c.loadout.grenades.he).toBe(1);
  });
});
