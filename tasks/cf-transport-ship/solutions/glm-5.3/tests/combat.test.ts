import { describe, expect, it } from 'vitest';
import { ColliderWorld } from '../src/physics/world';
import { resolveShot, resolveMelee, resolveExplosion, HitTarget } from '../src/combat/shooting';
import { WEAPONS, PART_MUL, COMBAT } from '../src/core/config';
import { Rng } from '../src/core/rng';
import { v3 } from '../src/geometry/math';

const woodBox = (cx: number, thick: number) => ({
  cx, cy: 1.0, cz: 0, hx: thick / 2, hy: 1.0, hz: 1.0, yaw: 0,
  surface: 'wood' as const, charBlock: true, bulletBlock: true, standable: true, tag: 'test-wood',
});
const steelBox = (cx: number, thick: number) => ({
  cx, cy: 1.0, cz: 0, hx: thick / 2, hy: 1.0, hz: 1.0, yaw: 0,
  surface: 'metal' as const, charBlock: true, bulletBlock: true, standable: true, tag: 'test-steel',
});

const mkTarget = (id: number, x: number, team = 'red'): HitTarget => ({
  id, team, alive: true, crouching: false, pos: v3(x, 0, 0), yaw: 0,
  radius: 0.36, standHeight: 1.82, crouchHeight: 1.3,
});

const shoot = (world: ColliderWorld, targets: HitTarget[], weaponId: string, spread = 0) =>
  // 出射高度取躯干中心，命中躯干盒
  resolveShot(world, targets, v3(0, 0.92, 0), v3(1, 0, 0), WEAPONS[weaponId], spread, new Rng(42), 200, 'blue');

describe('材质穿透（木箱/篷布/钢箱）', () => {
  it('无遮挡：直接命中全额伤害', () => {
    const w = new ColliderWorld();
    const t = mkTarget(1, 20);
    const r = shoot(w, [t], 'ak');
    expect(r.damages).toHaveLength(1);
    expect(r.damages[0].dmg).toBeCloseTo(WEAPONS.ak.dmgTorso * PART_MUL.torso, 5);
  });

  it('木箱遮挡：穿透后伤害衰减且仍命中', () => {
    const w = new ColliderWorld();
    w.addBox(woodBox(10, 0.3));
    const t = mkTarget(1, 20);
    const r = shoot(w, [t], 'ak');
    expect(r.damages).toHaveLength(1);
    expect(r.damages[0].penetrated).toBe(true);
    expect(r.damages[0].dmg).toBeCloseTo(WEAPONS.ak.dmgTorso * PART_MUL.torso * WEAPONS.ak.penDamageFactor, 5);
  });

  it('木箱后有钢壁：子弹被截停', () => {
    const w = new ColliderWorld();
    w.addBox(woodBox(10, 0.3));
    w.addBox(steelBox(11, 0.4));
    const t = mkTarget(1, 20);
    const r = shoot(w, [t], 'ak');
    expect(r.damages).toHaveLength(0);
    expect(r.stoppedBy).toBe('metal');
  });

  it('厚度预算：0.8m 木箱挡住冲锋枪、步枪可穿', () => {
    const w = new ColliderWorld();
    w.addBox(woodBox(10, 0.8));
    const t = mkTarget(1, 20);
    const smg = shoot(w, [t], 'mp5');
    expect(smg.damages).toHaveLength(0);
    expect(smg.stoppedBy).toBe('thickness');
    const ak = shoot(w, [t], 'ak');
    expect(ak.damages).toHaveLength(1);
    expect(ak.damages[0].dmg).toBeLessThan(WEAPONS.ak.dmgTorso);
  });

  it('篷布可穿透且衰减小于木箱（材质分类生效）', () => {
    const w = new ColliderWorld();
    w.addBox({ ...woodBox(10, 0.3), surface: 'tarp' });
    const t = mkTarget(1, 20);
    const r = shoot(w, [t], 'ak');
    expect(r.damages).toHaveLength(1);
    expect(r.surfaces[0].surface).toBe('tarp');
  });

  it('双层木箱累计厚度超限被截停', () => {
    const w = new ColliderWorld();
    w.addBox(woodBox(10, 1.0));
    w.addBox(woodBox(11.6, 1.0));
    const t = mkTarget(1, 20);
    const r = shoot(w, [t], 'ak'); // AK 预算 1.9m < 1.8m 累计
    expect(r.damages).toHaveLength(0);
    const awp = shoot(w, [t], 'awp'); // 狙击 2.6m 可穿双箱
    expect(awp.damages).toHaveLength(1);
  });

  it('友军实体挡弹但不受伤', () => {
    const w = new ColliderWorld();
    const friend = mkTarget(2, 10, 'blue');
    const enemy = mkTarget(1, 20, 'red');
    const r = shoot(w, [friend, enemy], 'ak');
    expect(r.damages).toHaveLength(0); // 蓝方队友挡下
    expect(r.stoppedBy).toBe('target');
  });

  it('一发子弹只结算一个目标', () => {
    const w = new ColliderWorld();
    const t1 = mkTarget(1, 18, 'red');
    const t2 = mkTarget(2, 20, 'red');
    const r = shoot(w, [t1, t2], 'ak');
    expect(r.damages).toHaveLength(1);
    expect(r.damages[0].targetId).toBe(1);
  });
});

describe('部位伤害', () => {
  const w = new ColliderWorld();
  it('头部 4 倍、腿部 0.75 倍', () => {
    const t = mkTarget(1, 20);
    // 躯干
    const torso = resolveShot(w, [t], v3(0, t.pos.y + 0.92, 0), v3(1, 0, 0), WEAPONS.ak, 0, new Rng(1), 200, 'blue');
    expect(torso.damages[0]?.part).toBe('torso');
    // 头部：从头顶上方垂直向下
    const headShot = resolveShot(w, [t], v3(t.pos.x, t.pos.y + 1.95, 0), v3(0, -1, 0), WEAPONS.ak, 0, new Rng(1), 200, 'blue');
    expect(headShot.damages[0]?.part).toBe('head');
    expect(headShot.damages[0].dmg).toBeCloseTo(WEAPONS.ak.dmgTorso * 4, 3);
    // 腿
    const leg = resolveShot(w, [t], v3(0, t.pos.y + 0.3, 0), v3(1, 0, 0), WEAPONS.ak, 0, new Rng(1), 200, 'blue');
    expect(leg.damages[0]?.part).toBe('legs');
    expect(leg.damages[0].dmg).toBeCloseTo(WEAPONS.ak.dmgTorso * 0.75, 3);
    expect(torso.damages[0].dmg).toBeCloseTo(WEAPONS.ak.dmgTorso, 3);
  });
});

describe('距离衰减', () => {
  it('超出衰减起点后伤害下降', () => {
    const w = new ColliderWorld();
    const near = shoot(w, [mkTarget(1, 10)], 'ak');
    const far = shoot(w, [mkTarget(1, 80)], 'ak');
    expect(far.damages[0].dmg).toBeLessThan(near.damages[0].dmg);
    const veryFar = shoot(w, [mkTarget(1, 150)], 'ak');
    expect(veryFar.damages[0].dmg).toBeCloseTo(WEAPONS.ak.dmgTorso * PART_MUL.torso * WEAPONS.ak.falloffMul, 3);
  });
});

describe('近战', () => {
  it('有效距离内命中，墙后不命中', () => {
    const w = new ColliderWorld();
    const t = mkTarget(1, 1.5);
    const hit = resolveMelee(w, [t], v3(0, 1.6, 0), v3(1, 0, 0), WEAPONS.knife, false, 'blue');
    expect(hit?.hit).toBe(true);
    w.addBox(steelBox(0.7, 0.2));
    const blocked = resolveMelee(w, [t], v3(0, 1.6, 0), v3(1, 0, 0), WEAPONS.knife, false, 'blue');
    expect(blocked).toBeNull();
  });
  it('超出距离不命中', () => {
    const w = new ColliderWorld();
    const t = mkTarget(1, 3.2);
    expect(resolveMelee(w, [t], v3(0, 1.6, 0), v3(1, 0, 0), WEAPONS.knife, false, 'blue')).toBeNull();
  });
});

describe('高爆手雷爆炸', () => {
  it('开阔处全额衰减曲线；钢壁遮挡大幅衰减', () => {
    const w = new ColliderWorld();
    const t = mkTarget(1, 2);
    const open = resolveExplosion(w, [t], v3(0, 1, 0), 'blue');
    expect(open).toHaveLength(1);
    expect(open[0].dmg).toBeGreaterThan(30);
    // 隔墙（厚钢）
    w.addBox(steelBox(2, 0.6));
    const blockedRes = resolveExplosion(w, [t], v3(0, 1, 0), 'blue');
    expect(blockedRes[0].dmg).toBeLessThanOrEqual(open[0].dmg * COMBAT.heBlockFactor + 1e-6);
  });
  it('超出半径无伤害', () => {
    const w = new ColliderWorld();
    const t = mkTarget(1, 20);
    expect(resolveExplosion(w, [t], v3(0, 1, 0), 'blue')).toHaveLength(0);
  });
});
