/**
 * 开发 / 验收入口（?dev=1）：固定机位、静态测试靶、导航图叠加、
 * 状态快照与性能采样。复用生产碰撞与战斗逻辑，不提供改生命/比分捷径。
 */
import * as THREE from 'three';
import { Game } from '../game/game';
import { Character } from '../entities/character';
import { CharacterModel } from '../entities/characterModel';
import { NAV_EDGES, NAV_NODES, STATIONS, Station } from '../map/mapData';

export class DevControls {
  private navOverlay: THREE.Group | null = null;
  private dummies: Character[] = [];
  private panel: HTMLElement;
  private perfSamples: number[] = [];
  private perfUntil = 0;
  private perfRunning = false;

  constructor(private game: Game) {
    this.panel = document.getElementById('dev-panel')!;
    this.panel.classList.remove('hidden');
  }

  stations(): Station[] {
    return STATIONS;
  }

  /** 固定机位截图模式：停用 bot，传送玩家回出生，覆盖相机 */
  shot(stationId: string): { ok: boolean; error?: string } {
    const st = STATIONS.find((s) => s.id === stationId);
    if (!st) return { ok: false, error: 'station not found: ' + stationId };
    this.game.bots = [];
    this.game.devCameraOverride = { pos: st.pos, look: st.look, fov: st.fov };
    return { ok: true };
  }

  release(): void {
    this.game.devCameraOverride = null;
  }

  /** 静态测试靶：真实角色（真实命中盒/伤害管线），不移动不开火 */
  spawnDummies(list?: Array<{ x: number; y?: number; z: number; yaw?: number; team?: 'blue' | 'red' }>): number {
    this.clearDummies();
    const pts = list ?? [
      { x: 14, z: 3, yaw: 180, team: 'red' as const },
      { x: 21, z: -6.5, yaw: 180, team: 'red' as const },
      { x: 28, z: -2.2, y: 3.3, yaw: 180, team: 'red' as const },
      { x: 2.2, z: -6.6, yaw: 0, team: 'red' as const },
    ];
    pts.forEach((p, i) => {
      const c = new Character(p.team ?? 'red', `测试靶${i + 1}`, 'ak');
      c.respawn({ x: p.x, y: p.y ?? 0, z: p.z }, ((p.yaw ?? 0) * Math.PI) / 180, this.game['simTime']);
      c.respawnAt = Number.MAX_SAFE_INTEGER / 2;
      this.game.characters.push(c);
      const m = new CharacterModel({ team: c.team, weaponCls: 'rifle' });
      this.game.scene.add(m.group);
      (this.game as unknown as { models: Map<number, CharacterModel> }).models.set(c.id, m);
      this.dummies.push(c);
    });
    return this.dummies.length;
  }

  clearDummies(): void {
    const models = (this.game as unknown as { models: Map<number, CharacterModel> }).models;
    for (const d of this.dummies) {
      const m = models.get(d.id);
      if (m) {
        this.game.scene.remove(m.group);
        models.delete(d.id);
      }
    }
    this.game.characters = this.game.characters.filter((c) => !this.dummies.includes(c));
    this.dummies = [];
  }

  nav(show: boolean): void {
    if (this.navOverlay) {
      this.game.scene.remove(this.navOverlay);
      this.navOverlay = null;
    }
    if (!show) return;
    const g = new THREE.Group();
    const nodeMap = new Map(NAV_NODES.map((n) => [n.id, n]));
    const pts: number[] = [];
    const colors: number[] = [];
    for (const e of NAV_EDGES) {
      const a = nodeMap.get(e.a)!, b = nodeMap.get(e.b)!;
      pts.push(a.x, a.y + 0.15, a.z, b.x, b.y + 0.15, b.z);
      const jump = e.jump === 'up' ? [0.2, 1, 0.2] : e.jump === 'down' ? [1, 0.6, 0.2] : [0.4, 0.75, 1];
      colors.push(...jump, ...jump);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    g.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ vertexColors: true })));
    const dotGeo = new THREE.SphereGeometry(0.14, 6, 4);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xe8c874 });
    for (const n of NAV_NODES) {
      const d = new THREE.Mesh(dotGeo, dotMat);
      d.position.set(n.x, n.y + 0.15, n.z);
      g.add(d);
    }
    this.navOverlay = g;
    this.game.scene.add(g);
  }

  perfStart(durationMs: number): boolean {
    this.perfSamples = [];
    this.perfUntil = performance.now() + durationMs;
    this.perfRunning = true;
    return true;
  }

  tick(frameDt: number): void {
    if (!this.perfRunning) return;
    this.perfSamples.push(frameDt);
    if (performance.now() >= this.perfUntil) this.perfRunning = false;
  }

  perfResult(): Record<string, unknown> {
    const s = this.perfSamples.slice().sort((a, b) => a - b);
    const sum = s.reduce((a, b) => a + b, 0);
    const q = (p: number) => (s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0);
    const info = this.game.renderer.info;
    return {
      samples: s.length,
      avgFps: s.length ? 1 / (sum / s.length) : 0,
      medianFrameMs: q(0.5) * 1000,
      p95FrameMs: q(0.95) * 1000,
      p99FrameMs: q(0.99) * 1000,
      maxFrameMs: s.length ? s[s.length - 1] * 1000 : 0,
      over50ms: s.filter((x) => x > 0.05).length,
      over33ms: s.filter((x) => x > 0.0333).length,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      running: this.perfRunning,
    };
  }

  updatePanel(): void {
    const snap = this.game.snapshot();
    const lines = [
      `FPS ${this.game.fps}  phase=${String(snap.phase)}  t=${Number(snap.simTime).toFixed(1)}`,
      `draws ${this.game.renderer.info.render.calls}  tris ${(this.game.renderer.info.render.triangles / 1000).toFixed(0)}k`,
      `score B${(snap.score as { blue: number }).blue} : R${(snap.score as { red: number }).red}`,
    ];
    for (const b of snap.bots as string[]) lines.push(b);
    this.panel.textContent = lines.join('\n');
  }
}
