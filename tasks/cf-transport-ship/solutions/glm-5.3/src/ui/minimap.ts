/**
 * 小地图：与实际地图几何对应（俯视投影）。
 * 默认显示自身与友军；敌人在开火时以事件点短暂暴露，不常驻追踪。
 */
import { Collider, ColliderWorld } from '../physics/world';
import { Character } from '../entities/character';

interface Ping { x: number; z: number; born: number; team: string }

export class Minimap {
  private ctx: CanvasRenderingContext2D;
  private bg: HTMLCanvasElement;
  private pings: Ping[] = [];
  // 地图范围：x -66..66, z -16..16 → 画布 220x260 竖向（船长沿画布纵向）
  private readonly W = 220;
  private readonly H = 260;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.bg = document.createElement('canvas');
    this.bg.width = this.W;
    this.bg.height = this.H;
  }

  /** 预渲染静态几何（地图加载后调用一次） */
  bake(world: ColliderWorld): void {
    const c = this.bg.getContext('2d')!;
    c.clearRect(0, 0, this.W, this.H);
    // 船体轮廓
    this.toScreen = (x: number, z: number): [number, number] => {
      const sx = (x + 66) / 132 * this.W;
      const sy = (z + 16) / 32 * this.H;
      return [sx, sy];
    };
    const [hx0, hz0] = this.toScreen(-64.5, -15.3);
    const [hx1, hz1] = this.toScreen(52, 15.3);
    c.fillStyle = 'rgba(28, 44, 60, 0.85)';
    c.fillRect(hx0, hz0, hx1 - hx0, hz1 - hz0);
    // 甲板
    const [dx0, dz0] = this.toScreen(-52, -15);
    const [dx1, dz1] = this.toScreen(52, 15);
    c.fillStyle = 'rgba(52, 66, 76, 0.95)';
    c.fillRect(dx0, dz0, dx1 - dx0, dz1 - dz0);
    // 静态碰撞体
    for (const col of world.colliders) {
      this.drawBox(c, col, colorFor(col));
    }
  }
  private toScreen: (x: number, z: number) => [number, number] = (x, z) => [x, z];

  private drawBox(c: CanvasRenderingContext2D, col: Collider, color: string): void {
    if (col.surface === 'deck' || col.tag.includes('安全墙')) return;
    const corners: Array<[number, number]> = [
      [col.cx - col.hx, col.cz - col.hz], [col.cx + col.hx, col.cz - col.hz],
      [col.cx + col.hx, col.cz + col.hz], [col.cx - col.hx, col.cz + col.hz],
    ];
    // 局部系旋转
    const cos = Math.cos(col.yaw), sin = Math.sin(col.yaw);
    const pts = corners.map(([lx, lz]) => {
      const wx = col.cx + (lx - col.cx) * cos + (lz - col.cz) * sin;
      const wz = col.cz - (lx - col.cx) * sin + (lz - col.cz) * cos;
      return this.toScreen(wx, wz);
    });
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < 4; i++) c.lineTo(pts[i][0], pts[i][1]);
    c.closePath();
    c.fill();
  }

  addFirePing(x: number, z: number, team: string, now: number): void {
    this.pings.push({ x, z, born: now, team });
    if (this.pings.length > 24) this.pings.shift();
  }

  render(player: Character, characters: Character[], now: number): void {
    const c = this.ctx;
    c.clearRect(0, 0, this.W, this.H);
    c.drawImage(this.bg, 0, 0);
    // 过期 ping
    this.pings = this.pings.filter((p) => now - p.born < 2.0);
    // 敌方开火暴露点（事件位置 + 短暂持续）
    for (const p of this.pings) {
      if (p.team === player.team) continue;
      const [x, y] = this.toScreen(p.x, p.z);
      const age = (now - p.born) / 2.0;
      c.fillStyle = `rgba(255, 106, 94, ${1 - age})`;
      c.beginPath();
      c.arc(x, y, 3.4, 0, 7);
      c.fill();
    }
    // 友军
    for (const ch of characters) {
      if (!ch.alive || ch.team !== player.team || ch === player) continue;
      const [x, y] = this.toScreen(ch.body.pos.x, ch.body.pos.z);
      c.fillStyle = ch.isPlayer ? '#e8c874' : '#4da3ff';
      c.beginPath();
      c.arc(x, y, 3, 0, 7);
      c.fill();
    }
    // 自身（箭头朝向）
    const [px, py] = this.toScreen(player.body.pos.x, player.body.pos.z);
    c.save();
    c.translate(px, py);
    // 地图 x→画布x、z→画布y；yaw=0 朝 -Z（画布上方）
    c.rotate(player.yaw);
    c.fillStyle = '#e8c874';
    c.beginPath();
    c.moveTo(0, -6);
    c.lineTo(4.4, 4.6);
    c.lineTo(0, 2.4);
    c.lineTo(-4.4, 4.6);
    c.closePath();
    c.fill();
    c.restore();
  }
}

function colorFor(col: Collider): string {
  if (col.surface === 'metal' && col.tag.includes('集装箱')) return 'rgba(96, 128, 150, 0.95)';
  if (col.surface === 'wood') return 'rgba(150, 120, 78, 0.95)';
  if (col.surface === 'tarp') return 'rgba(96, 112, 72, 0.95)';
  if (col.tag.includes('舱')) return 'rgba(180, 190, 196, 0.9)';
  if (col.tag.includes('机舱') || col.tag.includes('吊机') || col.tag.includes('缆筒')) return 'rgba(110, 118, 122, 0.9)';
  if (col.tag.includes('舷墙')) return 'rgba(140, 150, 156, 0.9)';
  return 'rgba(120, 130, 138, 0.6)';
}
