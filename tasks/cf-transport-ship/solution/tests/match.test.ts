import { describe, expect, it } from 'vitest';
import { Match } from '../src/game/match';
import { Character } from '../src/entities/character';
import { ColliderWorld } from '../src/physics/world';
import { buildMapBlocks } from '../src/map/mapData';
import { SmokeRegistry } from '../src/combat/smoke';
import { buildNavGraph, astar, allReachable } from '../src/ai/nav';
import { WeaponState } from '../src/combat/weapons';

function mapWorld(): ColliderWorld {
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

describe('对局状态机', () => {
  it('击杀上限触发一次结算，之后不再计分', () => {
    const w = mapWorld();
    const blue = new Character('blue', '蓝1', 'ak');
    const red = new Character('red', '红1', 'ak');
    blue.respawn({ x: 57, y: 0, z: 0 }, 3, 0);
    red.respawn({ x: -57, y: 0, z: 0 }, 0, 0);
    const m = new Match('practice', [blue, red], w); // 25 杀 / 180s
    m.playerTeam = 'blue';
    for (let i = 0; i < 24; i++) {
      red.takeDamage(999, blue, { x: 0, y: 0, z: 1 }, i);
      m.addKill(blue, red);
    }
    expect(m.scores.blue).toBe(24);
    expect(m.ended).toBe(false);
    red.takeDamage(999, blue, { x: 0, y: 0, z: 1 }, 30);
    m.addKill(blue, red);
    expect(m.scores.blue).toBe(25);
    expect(m.ended).toBe(true);
    expect(m.result).toBe('win');
    // 结束后再击杀不计分
    red.takeDamage(999, blue, { x: 0, y: 0, z: 1 }, 31);
    m.addKill(blue, red);
    expect(m.scores.blue).toBe(25);
  });

  it('时间结束分出胜负与平局', () => {
    const w = mapWorld();
    const a = new Character('blue', 'A', 'ak');
    const b = new Character('red', 'B', 'ak');
    a.respawn({ x: 57, y: 0, z: 0 }, 3, 0);
    b.respawn({ x: -57, y: 0, z: 0 }, 0, 0);
    const m = new Match('practice', [a, b], w);
    m.playerTeam = 'blue';
    m.timeLeft = 0.01;
    m.update(0.02, 0);
    expect(m.ended).toBe(true);
    expect(m.result).toBe('draw');
  });

  it('死亡后自动复活到本方出生点', () => {
    const w = mapWorld();
    const c = new Character('red', 'R', 'ak');
    c.respawn({ x: -57, y: 0, z: 0 }, 0, 0);
    const m = new Match('official', [c], w);
    c.takeDamage(999, null, { x: 0, y: 0, z: 1 }, 4); // 出生保护 2.5s 结束后
    expect(c.alive).toBe(false);
    m.update(0.1, 7.2); // respawnAt = 4 + 3
    expect(c.alive).toBe(true);
    expect(c.body.pos.x).toBeLessThan(-50); // 红方舱内
    expect(c.protectedNow(7.3)).toBe(true);
  });

  it('reset 清空比分并全员重生', () => {
    const w = mapWorld();
    const a = new Character('blue', 'A', 'ak');
    const b = new Character('red', 'B', 'ak');
    a.respawn({ x: 57, y: 0, z: 0 }, 3, 0);
    b.respawn({ x: -57, y: 0, z: 0 }, 0, 0);
    const m = new Match('official', [a, b], w);
    b.takeDamage(999, a, { x: 0, y: 0, z: 1 }, 1);
    m.addKill(a, b);
    m.timeLeft = 5;
    m.reset(10);
    expect(m.scores.blue).toBe(0);
    expect(m.timeLeft).toBe(m.duration);
    expect(a.alive).toBe(true);
    expect(b.alive).toBe(true);
    expect(a.kills).toBe(0);
    expect(b.deaths).toBe(0);
  });
});

describe('导航图连通性', () => {
  it('从任一出生节点可达全部节点（含跳跃链高点）', () => {
    const g = buildNavGraph();
    for (const from of [100, 200]) { // 蓝/红出生
      const reach = allReachable(g, from);
      expect(reach.length).toBe(g.nodes.size);
    }
  });
  it('A*：蓝出生到红出生路径存在且合理', () => {
    const g = buildNavGraph();
    const p = astar(g, 100, 200);
    expect(p).not.toBeNull();
    expect(p!.length).toBeGreaterThan(8);
  });
  it('A*：到右舷高点的路径包含跳跃边', () => {
    const g = buildNavGraph();
    const p = astar(g, 100, 450); // 高点1顶
    expect(p).not.toBeNull();
    let jumpEdges = 0;
    for (let i = 1; i < p!.length; i++) {
      const edges = g.adj.get(p![i - 1]) ?? [];
      if (edges.some((e) => e.to === p![i] && e.jump)) jumpEdges++;
    }
    expect(jumpEdges).toBeGreaterThanOrEqual(1); // 含至少一条跳跃上升边
  });
});

describe('烟雾遮挡', () => {
  it('烟雾遮蔽视线但不进入子弹碰撞', () => {
    const reg = new SmokeRegistry();
    const a = { x: -5, y: 1.5, z: 0 };
    const b = { x: 5, y: 1.5, z: 0 };
    expect(reg.blocksVision(a, b)).toBe(false);
    reg.spawn({ x: 0, y: 1, z: 0 });
    reg.update(3); // 起烟后
    expect(reg.blocksVision(a, b)).toBe(true);
    // 子弹世界无烟雾碰撞体：在通道内沿 +X 射线应无任何命中
    const w = mapWorld();
    expect(w.raycast({ x: 0.2, y: 1.5, z: -13.6 }, { x: 1, y: 0, z: 0 }, 48, { bullets: true })).toBeNull();
  });
  it('消散后不再遮挡', () => {
    const reg = new SmokeRegistry();
    reg.spawn({ x: 0, y: 1, z: 0 });
    reg.update(3);
    reg.update(14); // 超过持续
    const a = { x: -5, y: 1.5, z: 0 };
    const b = { x: 5, y: 1.5, z: 0 };
    expect(reg.blocksVision(a, b)).toBe(false);
  });
});

describe('帧率无关性', () => {
  it('120Hz 与 60Hz 步进 1 秒的移动距离一致', () => {
    const w = mapWorld();
    const run = (hz: number): number => {
      const c = new Character('blue', 'm', 'ak');
      c.respawn({ x: -44, y: 0, z: -13.6 }, Math.PI / 2, 0); // 左舷通道内朝船首
      const dt = 1 / hz;
      let t = 0;
      while (t < 1) {
        c.updateMovement(dt, { forward: 1, right: 0, jump: false, crouch: false, silent: false, ads: false }, w, t);
        t += dt;
      }
      return c.body.pos.x + 44;
    };
    const d120 = run(120);
    const d60 = run(60);
    expect(Math.abs(d120 - d60)).toBeLessThan(0.03);
    expect(d120).toBeGreaterThan(3); // 实际前进
  });

  it('不同步进频率下 1 秒内射速一致', () => {
    const fire = (hz: number): number => {
      const w = new WeaponState('ak');
      let now = 0; let shots = 0;
      const dt = 1 / hz;
      while (now < 2) {
        if (w.fire(now)) shots++;
        now += dt;
      }
      return shots;
    };
    expect(fire(120)).toBe(fire(60));
    expect(fire(120)).toBe(20); // 600rpm × 2s
  });
});
