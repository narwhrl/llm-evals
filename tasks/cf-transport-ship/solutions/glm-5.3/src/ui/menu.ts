/**
 * 菜单 / 暂停 / 死亡 / 结算 / 设置 面板。
 */
import { PRIMARY_IDS, WEAPONS, Difficulty, MatchMode, Team } from '../core/config';
import { Settings } from './settings';

const $ = (id: string) => document.getElementById(id)!;

export interface StartConfig {
  team: Team;
  primary: string;
  difficulty: Difficulty;
  mode: MatchMode;
}

export class UIMenu {
  team: Team = 'blue';
  primary = 'ak';
  difficulty: Difficulty = 'normal';
  mode: MatchMode = 'official';

  onStart: (cfg: StartConfig) => void = () => {};
  onResume: () => void = () => {};
  onQuit: () => void = () => {};
  onAgain: () => void = () => {};
  onMenu: () => void = () => {};
  onSettings: (s: Settings) => void = () => {};

  private settings: Settings;

  constructor(settings: Settings) {
    this.settings = { ...settings };
    this.buildWeaponList();
    this.bind();
    this.renderDetail();
  }

  private bind(): void {
    document.querySelectorAll('.team-btn').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.team-btn').forEach((x) => x.classList.remove('selected'));
        b.classList.add('selected');
        this.team = (b as HTMLElement).dataset.team as Team;
      });
    });
    document.querySelectorAll('.diff-btn').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach((x) => x.classList.remove('selected'));
        b.classList.add('selected');
        this.difficulty = (b as HTMLElement).dataset.diff as Difficulty;
      });
    });
    document.querySelectorAll('.mode-btn').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach((x) => x.classList.remove('selected'));
        b.classList.add('selected');
        this.mode = (b as HTMLElement).dataset.mode as MatchMode;
      });
    });
    $('btn-start').addEventListener('click', () => {
      this.audioKick();
      this.onStart({ team: this.team, primary: this.primary, difficulty: this.difficulty, mode: this.mode });
    });
    $('btn-settings').addEventListener('click', () => this.openSettings());
    $('btn-pause-settings').addEventListener('click', () => this.openSettings());
    $('btn-resume').addEventListener('click', () => this.onResume());
    $('btn-quit').addEventListener('click', () => this.onQuit());
    $('btn-again').addEventListener('click', () => this.onAgain());
    $('btn-menu').addEventListener('click', () => this.onMenu());
    $('btn-settings-close').addEventListener('click', () => {
      $('settings').classList.add('hidden');
      this.onSettings({ ...this.settings });
    });
  }

  /** 首次用户交互激活音频（由 Game 注入） */
  audioKick: () => void = () => {};

  private buildWeaponList(): void {
    const list = $('weapon-list');
    list.innerHTML = '';
    for (const id of PRIMARY_IDS) {
      const w = WEAPONS[id];
      const btn = document.createElement('button');
      btn.className = 'wpn-btn' + (id === this.primary ? ' selected' : '');
      btn.innerHTML = `<b>${esc(w.nameEn)}</b><i>${w.name.replace(w.nameEn, '').trim()}</i>`;
      btn.addEventListener('click', () => {
        this.primary = id;
        document.querySelectorAll('.wpn-btn').forEach((x) => x.classList.remove('selected'));
        btn.classList.add('selected');
        this.renderDetail();
      });
      list.appendChild(btn);
    }
  }

  private renderDetail(): void {
    const w = WEAPONS[this.primary];
    const d = $('weapon-detail');
    const stat = (label: string, v: number, num: string) =>
      `<div class="stat-row"><label>${label}</label><div class="stat-track"><div class="stat-fill" style="width:${v * 100}%"></div></div><span class="stat-num">${num}</span></div>`;
    d.innerHTML = `
      <h4>${esc(w.name)}</h4>
      <div class="wd-desc">${esc(w.desc)}</div>
      ${stat('伤害', w.stats.伤害, String(w.dmgTorso))}
      ${stat('射速', w.stats.射速, String(w.rpm))}
      ${stat('弹匣', Math.min(1, w.mag / 30), `${w.mag}/${w.reserve}`)}
      ${stat('穿透', Math.min(1, w.penThickness / 2.6), w.penThickness.toFixed(1) + 'm')}
      ${stat('机动', w.stats.机动, (w.drawTime).toFixed(2) + 's')}
    `;
  }

  openSettings(): void {
    const grid = $('settings-grid');
    grid.innerHTML = '';
    const row = (label: string, inner: string) => {
      const el = document.createElement('div');
      el.className = 'set-row';
      el.innerHTML = `<label>${label}</label>${inner}`;
      grid.appendChild(el);
      return el;
    };
    const s = this.settings;
    const slider = (key: keyof Settings, min: number, max: number, step: number, fmt: (v: number) => string) => {
      const el = row(key2label(key), `<input type="range" min="${min}" max="${max}" step="${step}" value="${s[key] as number}"><span class="val">${fmt(s[key] as number)}</span>`);
      const input = el.querySelector('input')!;
      const val = el.querySelector('.val')!;
      input.addEventListener('input', () => {
        (s[key] as number) = Number(input.value);
        val.textContent = fmt(Number(input.value));
        this.onSettings({ ...this.settings });
      });
    };
    slider('sensitivity', 0.2, 3, 0.05, (v) => v.toFixed(2));
    slider('adsSensitivity', 0.2, 2, 0.05, (v) => v.toFixed(2));
    slider('fov', 60, 110, 1, (v) => `${v}°`);
    slider('masterVolume', 0, 1, 0.05, (v) => `${Math.round(v * 100)}%`);
    slider('sfxVolume', 0, 1, 0.05, (v) => `${Math.round(v * 100)}%`);
    {
      const el = row('反转 Y 轴', `<input type="checkbox" ${s.invertY ? 'checked' : ''}>`);
      el.querySelector('input')!.addEventListener('change', (e) => {
        s.invertY = (e.target as HTMLInputElement).checked;
        this.onSettings({ ...this.settings });
      });
    }
    {
      const el = row('镜头晃动', `<input type="checkbox" ${s.headBob ? 'checked' : ''}>`);
      el.querySelector('input')!.addEventListener('change', (e) => {
        s.headBob = (e.target as HTMLInputElement).checked;
        this.onSettings({ ...this.settings });
      });
    }
    {
      const el = row('画质', `<select><option value="low">低</option><option value="med">中</option><option value="high">高</option></select>`);
      const sel = el.querySelector('select')!;
      sel.value = s.quality;
      sel.addEventListener('change', () => {
        s.quality = sel.value as 'low' | 'med' | 'high';
        this.onSettings({ ...this.settings });
      });
    }
    $('settings').classList.remove('hidden');
  }

  syncSettings(s: Settings): void {
    this.settings = { ...s };
  }

  showMenu(): void { $('menu').classList.remove('hidden'); }
  hideMenu(): void { $('menu').classList.add('hidden'); }
  showPause(): void { $('pause').classList.remove('hidden'); }
  hidePause(): void { $('pause').classList.add('hidden'); }
  showDeath(info: string, count: number): void {
    $('death-info').textContent = info;
    $('respawn-count').textContent = String(Math.max(0, Math.ceil(count)));
    $('death').classList.remove('hidden');
  }
  updateDeath(count: number): void {
    $('respawn-count').textContent = String(Math.max(0, Math.ceil(count)));
  }
  hideDeath(): void { $('death').classList.add('hidden'); }

  showEnd(result: 'win' | 'lose' | 'draw', blue: number, red: number, board: string): void {
    $('end-title').textContent = result === 'win' ? '胜利' : result === 'lose' ? '失败' : '平局';
    $('end-title').style.color = result === 'win' ? 'var(--gold)' : result === 'lose' ? 'var(--red)' : 'var(--text)';
    $('end-score').innerHTML = `<span style="color:var(--blue)">保卫者 ${blue}</span> : <span style="color:var(--red)">${red} 潜伏者</span>`;
    $('end-board').innerHTML = board;
    $('end').classList.remove('hidden');
  }
  hideEnd(): void { $('end').classList.add('hidden'); }
}

function key2label(k: keyof Settings): string {
  const m: Record<string, string> = {
    sensitivity: '鼠标灵敏度', adsSensitivity: '开镜灵敏度', fov: '视野（垂直）',
    invertY: '反转 Y 轴', masterVolume: '总音量', sfxVolume: '音效音量',
    quality: '画质档位', headBob: '镜头晃动',
  };
  return m[k] ?? k;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
