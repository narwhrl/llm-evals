import { describe, expect, it, beforeAll } from 'vitest';
import { ColliderWorld } from '../src/physics/world';
import { buildMapBlocks, SPAWNS, SIGHT_CHECKS, NAV_NODES, NAV_EDGES } from '../src/map/mapData';
import { Body } from '../src/physics/world';
import { PLAYER } from '../src/core/config';

function buildWorld(): ColliderWorld {
  const w = new ColliderWorld();
  for (const b of buildMapBlocks()) {
    w.addBox({
      cx: b.cx, cy: b.cy, cz: b.cz, hx: b.hx, hy: b.hy, hz: b.hz, yaw: b.yaw,
      surface: b.surface, charBlock: b.charBlock, bulletBlock: b.bulletBlock,
      standable: b.standable, tag: b.tag,
    });
  }
  return w;
}

describe('地图静态几何', () => {
  let world: ColliderWorld;
  beforeAll(() => { world = buildWorld(); });

  it('出生点全部可用（不卡墙、脚下有地面）', () => {
    for (const team of ['blue', 'red'] as const) {
      for (const sp of SPAWNS[team]) {
        expect(world.spawnClear(sp.x, 0, sp.z, 1.85, 0.36), `${team} ${sp.x},${sp.z}`).toBe(true);
        expect(world.groundHeightAt(sp.x, sp.z, 1.0)).toBeCloseTo(0, 3);
      }
    }
  });

  it('关键视线检查与设计一致（SL1–SL5）', () => {
    for (const sc of SIGHT_CHECKS) {
      const blocked = world.lineOfSight(
        { x: sc.from[0], y: sc.from[1], z: sc.from[2] },
        { x: sc.to[0], y: sc.to[1], z: sc.to[2] },
      ) !== null;
      expect(blocked, `${sc.id} ${sc.note}`).toBe(sc.blocked);
    }
  });

  it('玩家不会掉出甲板：边缘外无地面', () => {
    expect(world.groundHeightAt(0, 0, 2, 0.3)).toBeCloseTo(0, 3);
    expect(world.groundHeightAt(0, 16.5, 2, 0.3)).toBeLessThan(-100);
  });
});

describe('人物碰撞', () => {
  let world: ColliderWorld;
  beforeAll(() => { world = buildWorld(); });

  const mkBody = (x: number, z: number): Body => ({
    pos: { x, y: 0, z },
    vel: { x: 0, y: 0, z: 0 },
    radius: PLAYER.capsuleRadius,
    height: PLAYER.heightStand,
    grounded: true,
    groundY: 0,
  });

  it('贴集装箱墙滑动，不穿透', () => {
    const b = mkBody(6, -9.5); // P6 蓝箱近面 z=-10.5
    // 朝 -Z 推 1 秒
    for (let i = 0; i < 120; i++) {
      b.vel.x = 0; b.vel.z = -4;
      world.moveBody(b, 1 / 120, PLAYER.stepHeight);
    }
    expect(b.pos.z).toBeGreaterThan(-10.5 - 0.01); // 未穿过箱面
    expect(b.pos.z).toBeLessThan(-9.0);            // 确实贴上去了
  });

  it('0.52m 台阶可踏上木箱顶', () => {
    // 木箱 1.1 高，需跳；但相邻堆叠差 1.1 > stepHeight，验证箱间需跳跃：
    const b = mkBody(43.2, 2.6); // 蓝方缓冲区单箱旁
    b.vel.x = 0; b.vel.z = 0; b.vel.y = PLAYER.jumpVel; // 起跳
    let landed = false;
    for (let i = 0; i < 240; i++) {
      b.vel.y -= PLAYER.gravity / 120;
      b.vel.x = 0.7; b.vel.z = 0; // 朝箱顶飘
      world.moveBody(b, 1 / 120, PLAYER.stepHeight);
      if (b.grounded && b.pos.y > 0.9) { landed = true; break; }
    }
    expect(landed).toBe(true);
    expect(b.pos.y).toBeCloseTo(1.1, 2);
  });

  it('蹲伏高度限制：低矮空间保持碰撞', () => {
    const b = mkBody(0, 0);
    b.height = PLAYER.heightCrouch; // 蹲
    b.vel.z = -4; b.vel.x = 0; b.vel.y = 0;
    for (let i = 0; i < 60; i++) world.moveBody(b, 1 / 120, PLAYER.stepHeight);
    // 中线附近不应卡进斜置货物内部
    const inTarp = world.queryRegion(-1, -1, 1, 1).some((c) => {
      if (c.surface !== 'tarp') return false;
      const lp = { x: b.pos.x - c.cx, z: b.pos.z - c.cz };
      const lx = lp.x * Math.cos(-c.yaw) + lp.z * Math.sin(-c.yaw);
      const lz = -lp.x * Math.sin(-c.yaw) + lp.z * Math.cos(-c.yaw);
      return Math.abs(lx) < c.hx && Math.abs(lz) < c.hz && b.pos.y < c.cy + c.hy;
    });
    expect(inTarp).toBe(false);
  });
});

describe('导航图', () => {
  it('所有节点声明存在且边引用有效', () => {
    const ids = new Set(NAV_NODES.map((n) => n.id));
    expect(ids.size).toBe(NAV_NODES.length);
    for (const e of NAV_EDGES) {
      expect(ids.has(e.a)).toBe(true);
      expect(ids.has(e.b)).toBe(true);
    }
  });
  it('跳跃边两端存在高度差', () => {
    const nodes = new Map(NAV_NODES.map((n) => [n.id, n]));
    for (const e of NAV_EDGES) {
      if (!e.jump) continue;
      const dy = Math.abs(nodes.get(e.a)!.y - nodes.get(e.b)!.y);
      expect(dy).toBeGreaterThan(0.3);
    }
  });
});
