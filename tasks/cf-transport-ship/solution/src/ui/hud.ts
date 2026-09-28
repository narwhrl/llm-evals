/**
 * HUD：准星（真实散布驱动）、比分/时间、生命护甲、弹药、投掷物、
 * 击杀信息、命中提示、受击方向、出生保护、Tab 战绩、狙击镜遮罩。
 */
import { Character } from '../entities/character';
import { activeWeapon } from '../combat/weapons';

export interface KillFeedEntry {
  killer: string;
  victim: string;
  weapon: string;
  killerTeam: string;
  victimTeam: string;
  involvesPlayer: boolean;
  t: number;
}

const $ = (id: string) => document.getElementById(id)!;

export class Hud {
  private root: HTMLElement;
  private crosshair: HTMLElement;
  private hitmarker: HTMLElement;
  private killfeed: HTMLElement;
  private dmgOverlay: HTMLElement;
  private protOverlay: HTMLElement;
  private centerMsg: HTMLElement;
  private scoreboard: HTMLElement;
  private hpFill: HTMLElement;
  private hpNum: HTMLElement;
  private armorFill: HTMLElement;
  private armorNum: HTMLElement;
  private ammoMag: HTMLElement;
  private ammoReserve: HTMLElement;
  private ammoBox: HTMLElement;
  private weaponName: HTMLElement;
  private nadeHe: HTMLElement;
  private nadeSmoke: HTMLElement;
  private slotPips: NodeListOf<HTMLElement>;
  private scoreBlue: HTMLElement;
  private scoreRed: HTMLElement;
  private matchTime: HTMLElement;
  private matchGoal: HTMLElement;
  private iconProtect: HTMLElement;
  private iconCrouch: HTMLElement;
  private iconSilent: HTMLElement;
  private scopeVignette: HTMLElement | null = null;
  private centerTimer = 0;
  private hitTimer = 0;
  private lastDmgDirs: Array<{ el: HTMLElement; born: number }> = [];
  private feed: KillFeedEntry[] = [];

  constructor() {
    this.root = $('hud');
    this.crosshair = $('crosshair');
    this.hitmarker = $('hitmarker');
    this.killfeed = $('killfeed');
    this.dmgOverlay = $('dmg-overlay');
    this.protOverlay = $('prot-overlay');
    this.centerMsg = $('center-msg');
    this.scoreboard = $('scoreboard');
    this.hpFill = $('hp-fill');
    this.hpNum = $('hp-num');
    this.armorFill = $('armor-fill');
    this.armorNum = $('armor-num');
    this.ammoMag = $('ammo-mag');
    this.ammoReserve = $('ammo-reserve');
    this.ammoBox = $('ammo');
    this.weaponName = $('weapon-name');
    this.nadeHe = document.querySelector('.pip-he')!;
    this.nadeSmoke = document.querySelector('.pip-smoke')!;
    this.slotPips = document.querySelectorAll('#slot-pips span');
    this.scoreBlue = $('score-blue');
    this.scoreRed = $('score-red');
    this.matchTime = $('match-time');
    this.matchGoal = $('match-goal');
    this.iconProtect = $('icon-protect');
    this.iconCrouch = $('icon-crouch');
    this.iconSilent = $('icon-silent');
  }

  show(): void { this.root.classList.remove('hidden'); }
  hide(): void { this.root.classList.add('hidden'); }

  setScope(on: boolean, fov: number): void {
    this.scopeVignette?.remove();
    this.scopeVignette = null;
    if (on) {
      const el = document.createElement('div');
      el.className = 'scope-vignette';
      // 镜内刻线
      const line = (w: number, h: number, x: number, y: number) => {
        const l = document.createElement('div');
        l.style.cssText = `position:absolute;left:${x}%;top:${y}%;width:${w}%;height:${h}%;background:rgba(10,14,10,0.9);`;
        el.appendChild(l);
      };
      line(0.12, 100, 49.94, 0); line(100, 0.12, 0, 49.94);
      line(30, 0.08, 35, 49.96); line(30, 0.08, 65, 49.96);
      line(0.08, 14, 49.96, 36); line(0.08, 14, 49.96, 64);
      document.getElementById('app')!.appendChild(el);
      this.scopeVignette = el;
    }
    void fov;
  }

  hit(head: boolean, kill: boolean): void {
    this.hitmarker.className = 'show' + (kill ? ' kill' : head ? ' head' : '');
    void this.hitmarker.offsetWidth;
    this.hitTimer = 0.18;
  }

  playerHurt(dirDeg: number, hp: number): void {
    this.dmgOverlay.classList.add('hurt');
    setTimeout(() => this.dmgOverlay.classList.remove('hurt'), 260);
    this.dmgOverlay.classList.toggle('low', hp < 35);
    const el = document.createElement('div');
    el.className = 'dmg-dir';
    el.style.transform = `rotate(${dirDeg}deg)`;
    this.root.appendChild(el);
    this.lastDmgDirs.push({ el, born: performance.now() });
  }

  centerMessage(text: string, dur = 1.6): void {
    this.centerMsg.textContent = text;
    this.centerMsg.classList.add('show');
    this.centerTimer = dur;
  }

  addKill(e: KillFeedEntry): void {
    this.feed.push(e);
    if (this.feed.length > 5) this.feed.shift();
    this.renderFeed();
  }

  private renderFeed(): void {
    this.killfeed.innerHTML = '';
    const now = performance.now() / 1000;
    for (const f of this.feed) {
      const age = now - f.t;
      if (age > 6) continue;
      const el = document.createElement('div');
      el.className = 'kf' + (age > 5 ? ' out' : '');
      const color = (team: string) => team === 'blue' ? 'var(--blue)' : 'var(--red)';
      el.innerHTML = `<span style="color:${color(f.killerTeam)}">${esc(f.killer)}</span>` +
        `<span class="w">${esc(f.weapon)}</span>` +
        `<span style="color:${color(f.victimTeam)}">${esc(f.victim)}</span>`;
      if (f.involvesPlayer) (el.firstElementChild as HTMLElement | null)?.classList.add('me');
      this.killfeed.appendChild(el);
    }
  }

  update(dt: number, p: Character, now: number, match: {
    blue: number; red: number; timeLeft: number; goal: number; ended: boolean;
    scoreboard: Array<{ name: string; team: string; kills: number; deaths: number; alive: boolean; isPlayer: boolean }>;
    tab: boolean;
  }, opts: { spreadPx: number; ads: boolean; scoped: boolean }): void {
    // 准星
    const gap = Math.min(30, Math.round(opts.spreadPx));
    (this.crosshair as HTMLElement).style.setProperty('--gap', `${gap}px`);
    this.crosshair.style.opacity = opts.scoped ? '0' : '1';
    if (this.hitTimer > 0) {
      this.hitTimer -= dt;
      if (this.hitTimer <= 0) this.hitmarker.className = '';
    }
    if (this.centerTimer > 0) {
      this.centerTimer -= dt;
      if (this.centerTimer <= 0) this.centerMsg.classList.remove('show');
    }
    // 生命护甲
    const hp = Math.max(0, Math.round(p.hp));
    this.hpFill.style.width = `${hp}%`;
    this.hpNum.textContent = String(hp);
    this.armorFill.style.width = `${Math.max(0, Math.round(p.armor))}%`;
    this.armorNum.textContent = String(Math.max(0, Math.round(p.armor)));
    // 弹药
    const lo = p.loadout;
    const def = activeWeapon(lo);
    this.weaponName.textContent = def.nameEn;
    if (lo.slot === 3) {
      this.ammoMag.textContent = String(lo.grenades[lo.grenadeSel]);
      this.ammoReserve.textContent = '—';
      this.ammoBox.className = '';
    } else {
      const ws = lo.slots[lo.slot];
      this.ammoMag.textContent = String(ws.mag);
      this.ammoReserve.textContent = def.cls === 'melee' ? '—' : String(ws.reserve);
      this.ammoBox.className = ws.mag === 0 ? 'mag-empty' : ws.reserve === 0 && ws.mag < def.mag * 0.3 ? 'reserve-low' : '';
    }
    this.nadeHe.className = 'pip pip-he' + (lo.grenades.he > 0 ? ' on' : '');
    this.nadeSmoke.className = 'pip pip-smoke' + (lo.grenades.smoke > 0 ? ' on' : '');
    this.slotPips.forEach((el) => {
      el.classList.toggle('active', Number(el.dataset.slot) === lo.slot);
    });
    // 图标
    this.iconProtect.classList.toggle('on', p.protectedNow(now));
    this.iconCrouch.classList.toggle('on', p.crouching);
    this.iconSilent.classList.toggle('on', p.alive && p.noiseLevel > 0 && p.noiseLevel <= 0.16);
    this.protOverlay.classList.toggle('on', p.protectedNow(now));
    // 比分时间
    this.scoreBlue.textContent = String(match.blue);
    this.scoreRed.textContent = String(match.red);
    const t = Math.max(0, match.timeLeft);
    this.matchTime.textContent = `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    this.matchGoal.textContent = `目标 ${match.goal}`;
    // 战绩板
    this.scoreboard.classList.toggle('hidden', !match.tab || match.ended);
    if (match.tab && !match.ended) {
      this.renderScoreboard(match.scoreboard);
    }
    // 受击方向箭头衰减
    const nowMs = performance.now();
    this.lastDmgDirs = this.lastDmgDirs.filter((d) => {
      if (nowMs - d.born > 900) { d.el.remove(); return false; }
      d.el.style.opacity = String(1 - (nowMs - d.born) / 900);
      return true;
    });
  }

  private renderScoreboard(rows: Array<{ name: string; team: string; kills: number; deaths: number; alive: boolean; isPlayer: boolean }>): void {
    const mk = (team: string) => {
      const head = `<tr><th style="width:45%">队员</th><th>击杀</th><th>死亡</th><th>K/D</th></tr>`;
      const body = rows.filter((r) => r.team === team).sort((a, b) => b.kills - a.kills).map((r) =>
        `<tr class="${r.alive ? '' : 'dead'} ${r.isPlayer ? 'me' : ''}"><td>${esc(r.name)}${r.isPlayer ? '（你）' : ''}</td><td>${r.kills}</td><td>${r.deaths}</td><td>${(r.kills / Math.max(1, r.deaths)).toFixed(2)}</td></tr>`).join('');
      return `<table>${head}${body}</table>`;
    };
    this.scoreboard.innerHTML =
      `<h3 class="blue">保卫者</h3>${mk('blue')}<h3 class="red">潜伏者</h3>${mk('red')}`;
  }

  updateFeedTime(): void {
    this.renderFeed();
  }
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
