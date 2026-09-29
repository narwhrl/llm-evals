import { DEFAULT_SETTINGS, WEAPONS, type Difficulty, type Settings, type Team, type WeaponId } from './config';
import { MAP_BLOCKS } from './map';
import type { Game, GameEvent } from './game';

const primaryWeapons: WeaponId[] = ['vandal', 'sentinel', 'vector', 'longshot'];
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export function loadSettings(): Settings {
  try {
    const raw = JSON.parse(localStorage.getItem('transport-ship-settings') || '{}');
    return { ...DEFAULT_SETTINGS,
      sensitivity: typeof raw.sensitivity === 'number' ? Math.min(.006, Math.max(.0006, raw.sensitivity)) : DEFAULT_SETTINGS.sensitivity,
      scopeSensitivity: typeof raw.scopeSensitivity === 'number' ? Math.min(.9, Math.max(.2, raw.scopeSensitivity)) : DEFAULT_SETTINGS.scopeSensitivity,
      fov: typeof raw.fov === 'number' ? Math.min(100, Math.max(60, raw.fov)) : DEFAULT_SETTINGS.fov,
      volume: typeof raw.volume === 'number' ? Math.min(1, Math.max(0, raw.volume)) : DEFAULT_SETTINGS.volume,
      effectsVolume: typeof raw.effectsVolume === 'number' ? Math.min(1, Math.max(0, raw.effectsVolume)) : DEFAULT_SETTINGS.effectsVolume,
      quality: ['low', 'medium', 'high'].includes(raw.quality) ? raw.quality : DEFAULT_SETTINGS.quality,
      bob: typeof raw.bob === 'boolean' ? raw.bob : DEFAULT_SETTINGS.bob,
      invertY: typeof raw.invertY === 'boolean' ? raw.invertY : DEFAULT_SETTINGS.invertY,
      debug: false };
  } catch { return { ...DEFAULT_SETTINGS }; }
}
function timeText(seconds: number) { const s = Math.ceil(Math.max(0, seconds)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

export class UI {
  root: HTMLElement; settings: Settings;
  team: Team = 'red'; primary: WeaponId = 'vandal'; difficulty: Difficulty = 'normal'; practiceMinutes = 10;
  onStart: (team: Team, primary: WeaponId, difficulty: Difficulty, minutes: number) => void = () => {};
  onResume: () => void = () => {};
  onRestart: () => void = () => {};
  onNextPrimary: (id: WeaponId) => void = () => {};
  onSettings: (settings: Settings) => void = () => {};
  private elements = new Map<string, HTMLElement>(); private feed: { html: string; until: number }[] = [];
  private reveals: { x: number; z: number; until: number }[] = [];
  private lastHud = -1; private hitUntil = 0; private killUntil = 0; private messageUntil = 0;
  private mapCanvas!: HTMLCanvasElement; private mapCtx!: CanvasRenderingContext2D;
  constructor(root: HTMLElement, settings: Settings) { this.root = root; this.settings = settings; this.build(); this.bind(); }
  private el(id: string) { return this.elements.get(id)!; }
  private build() {
    this.root.innerHTML = `
      <div class="vignette"></div><div class="grain"></div>
      <div id="hud" class="hud hidden">
        <div class="topline"><span class="mode-label">TEAM DEATHMATCH <b>·</b> 运输船</span><span class="server-label">本地对局 <span class="live-dot"></span> 5 VS 5</span></div>
        <div class="match-bar"><div class="team-score red"><small>赤隼 · RED</small><strong id="red-score">00</strong></div><div class="match-mid"><b id="match-time">10:00</b><small id="target-score">先达 100</small></div><div class="team-score blue"><strong id="blue-score">00</strong><small>BLUE · 蓝鲸</small></div></div>
        <div class="radar"><div class="radar-title"><span>甲板雷达</span><span id="zone-label">出生舱</span></div><canvas id="minimap" width="248" height="248"></canvas><div class="radar-footer">N <span>SHIP / TDM-01</span> S</div></div>
        <div id="kill-feed" class="kill-feed"></div>
        <div id="crosshair" class="crosshair"><i class="ch up"></i><i class="ch down"></i><i class="ch left"></i><i class="ch right"></i><i class="ch center"></i></div>
        <div id="hit-marker" class="hit-marker hidden">✕</div><div id="kill-marker" class="kill-marker hidden">击杀确认</div>
        <div id="scope" class="scope hidden"><div class="scope-circle"><div class="scope-v"></div><div class="scope-h"></div><div class="scope-dot"></div><span class="scope-range">M90 / ×6</span></div></div>
        <div class="hud-bottom left"><div class="side-caption">COMBAT STATUS</div><div class="vitals"><div><span>生命值</span><strong id="hp-value">100</strong><small>HP</small></div><div><span>护甲值</span><strong id="armor-value">100</strong><small>AP</small></div></div><div class="meter"><span id="hp-meter"></span></div><div class="meter armor"><span id="armor-meter"></span></div><div id="status-text" class="status-text">战斗准备就绪</div></div>
        <div class="hud-bottom right"><div class="side-caption">ACTIVE LOADOUT <span id="slot-number">01 / PRIMARY</span></div><div class="weapon-name" id="weapon-name">AR-47 突击步枪</div><div class="ammo-line"><strong id="mag-value">30</strong><span>/</span><b id="reserve-value">90</b><small id="ammo-label">弹药</small></div><div class="inventory"><span id="he-count">高爆弹 × 1</span><span id="smoke-count">烟雾弹 × 1</span></div></div>
        <div id="debug" class="debug hidden"></div>
        <div id="scoreboard" class="scoreboard hidden"><div class="board-head"><span>运输船 / 对局战绩</span><span id="board-time">10:00</span></div><div class="board-cols"><div><h3>赤隼 <b id="board-red-score">0</b></h3><div id="board-red"></div></div><div><h3>蓝鲸 <b id="board-blue-score">0</b></h3><div id="board-blue"></div></div></div><div class="board-foot">TAB 按住查看 · K 击杀 · D 死亡</div></div>
        <div id="death" class="death hidden"><strong>已阵亡</strong><span id="death-count">3 秒后复活</span><small>按 F1–F4 为下次出生更换主武器</small><div id="death-weapons" class="mini-loadout"></div></div>
      </div>
      <div id="menu" class="overlay menu"><div class="menu-shell"><div class="menu-left"><div class="eyebrow">LOCAL COMBAT // 001</div><div class="emblem"><span>TS</span><i></i></div><h1>运输船<span>甲板攻防</span></h1><p>经典狭长甲板。三线推进，箱间交火。<br>与九名电脑角色打完一场完整的团队竞技。</p><div class="menu-spec"><span>01 <b>地图</b> 经典运输船</span><span>02 <b>模式</b> 5 对 5 团队竞技</span><span>03 <b>目标</b> 先达 100 击杀</span></div><div class="menu-controls"><b>基础操作</b><span>WASD 移动 · 鼠标瞄准/开火 · Shift 静步 · Ctrl 蹲伏</span><span>Space 跳跃 · R 换弹 · 1–4 切装备 · G 投掷 · Tab 战绩</span></div></div>
      <div class="menu-right"><div class="setup-heading"><span>战前配置</span><small>PREPARE LOADOUT</small></div><label class="form-label">阵营选择</label><div class="segmented"><button class="seg active" data-team="red">赤隼小队 <small>RED</small></button><button class="seg" data-team="blue">蓝鲸小队 <small>BLUE</small></button></div><label class="form-label">主武器 <small>死亡后可为下次出生重选</small></label><div id="weapon-options" class="weapon-options"></div><div class="form-row"><div><label class="form-label">电脑难度</label><select id="difficulty"><option value="easy">简单</option><option value="normal" selected>普通</option><option value="hard">困难</option></select></div><div><label class="form-label">局时</label><select id="duration"><option value="10" selected>正式对局 · 10 分钟</option><option value="2">练习局 · 2 分钟</option></select></div></div><button id="start-button" class="primary-button">进入对局 <span>↗</span></button><button id="menu-settings" class="text-button">画面 / 操作设置 <span>⚙</span></button><div class="menu-note">浏览器首次进入时需允许鼠标锁定。Esc 暂停并释放鼠标。</div></div></div><div class="menu-foot"><span>DECK / 01</span><span>LOCAL • NO ACCOUNT REQUIRED</span></div></div>
      <div id="pause" class="overlay pause hidden"><div class="modal"><div class="eyebrow">MATCH PAUSED</div><h2>暂停中</h2><p>本地时间与战斗已冻结。点击继续重新锁定鼠标。</p><button id="resume-button" class="primary-button">继续游戏 <span>↗</span></button><button id="pause-settings" class="text-button">画面 / 操作设置 <span>⚙</span></button><button id="restart-button" class="text-button danger">重新开始本局</button></div></div>
      <div id="end" class="overlay end hidden"><div class="modal result"><div class="eyebrow">MATCH COMPLETE</div><div id="result-symbol" class="result-symbol">◆</div><h2 id="result-title">对局结束</h2><p id="result-desc">比赛已结束</p><div id="result-score" class="result-score">00 — 00</div><button id="again-button" class="primary-button">再来一局 <span>↗</span></button></div></div>
      <div id="settings-panel" class="overlay settings-overlay hidden"><div class="settings-card"><div class="settings-top"><div><div class="eyebrow">CONTROL / DISPLAY</div><h2>设置</h2></div><button id="settings-close" class="close-button" aria-label="关闭设置">✕</button></div><div class="settings-grid">
        <label>鼠标灵敏度 <output id="sensitivity-out"></output><input id="sensitivity" type="range" min="0.0006" max="0.006" step="0.0001"></label>
        <label>狙击灵敏度 <output id="scopeSensitivity-out"></output><input id="scopeSensitivity" type="range" min="0.2" max="0.9" step="0.01"></label>
        <label>垂直视野 FOV <output id="fov-out"></output><input id="fov" type="range" min="60" max="100" step="1"></label>
        <label>总音量 <output id="volume-out"></output><input id="volume" type="range" min="0" max="1" step="0.01"></label>
        <label>音效音量 <output id="effectsVolume-out"></output><input id="effectsVolume" type="range" min="0" max="1" step="0.01"></label>
        <label>画质 <select id="quality"><option value="low">低</option><option value="medium">中</option><option value="high">高</option></select></label>
        <label class="check-label"><input id="bob" type="checkbox"> 镜头行走摆动</label><label class="check-label"><input id="invertY" type="checkbox"> 反转鼠标 Y 轴</label><label class="check-label"><input id="debug-setting" type="checkbox"> 显示电脑调试信息</label>
      </div><div class="settings-bottom">设置自动保存在本机。画质变更立即生效。</div></div></div>
      <div id="toast" class="toast hidden"></div>`;
    for (const e of this.root.querySelectorAll<HTMLElement>('[id]')) this.elements.set(e.id, e);
    this.mapCanvas = this.el('minimap') as HTMLCanvasElement; this.mapCtx = this.mapCanvas.getContext('2d')!;
    this.renderWeaponChoices(); this.renderDeathChoices(); this.syncSettingsInputs();
  }
  private renderWeaponChoices() {
    this.el('weapon-options').innerHTML = primaryWeapons.map((id, i) => `<button class="weapon-card ${this.primary === id ? 'active' : ''}" data-weapon="${id}"><span class="weapon-index">0${i + 1}</span><span class="weapon-symbol ${id}"><i></i><b></b></span><span class="weapon-card-text"><strong>${WEAPONS[id].name}</strong><small>${WEAPONS[id].className} · ${WEAPONS[id].mag} 发弹匣</small></span><span class="weapon-select-mark">◆</span></button>`).join('');
  }
  private renderDeathChoices() { this.el('death-weapons').innerHTML = primaryWeapons.map((id, i) => `<button data-respawn-weapon="${id}" class="${this.primary === id ? 'active' : ''}">F${i + 1} ${WEAPONS[id].name}</button>`).join(''); }
  setNextPrimary(id: WeaponId) { this.primary = id; this.renderDeathChoices(); }
  private bind() {
    this.root.addEventListener('click', ev => {
      const target = (ev.target as HTMLElement).closest<HTMLElement>('button'); if (!target) return;
      if (target.dataset.team) { this.team = target.dataset.team as Team; this.root.querySelectorAll('[data-team]').forEach(e => e.classList.toggle('active', (e as HTMLElement).dataset.team === this.team)); }
      if (target.dataset.weapon) { this.primary = target.dataset.weapon as WeaponId; this.renderWeaponChoices(); this.renderDeathChoices(); }
      if (target.dataset.respawnWeapon) { this.primary = target.dataset.respawnWeapon as WeaponId; this.renderDeathChoices(); this.onNextPrimary(this.primary); }
      switch (target.id) {
        case 'start-button': this.difficulty = (this.el('difficulty') as HTMLSelectElement).value as Difficulty; this.practiceMinutes = Number((this.el('duration') as HTMLSelectElement).value); this.onStart(this.team, this.primary, this.difficulty, this.practiceMinutes); break;
        case 'resume-button': this.onResume(); break;
        case 'restart-button': case 'again-button': this.onRestart(); break;
        case 'menu-settings': case 'pause-settings': this.el('settings-panel').classList.remove('hidden'); break;
        case 'settings-close': this.el('settings-panel').classList.add('hidden'); break;
      }
    });
    for (const key of ['sensitivity', 'scopeSensitivity', 'fov', 'volume', 'effectsVolume'] as const) {
      this.el(key).addEventListener('input', () => { (this.settings[key] as number) = Number((this.el(key) as HTMLInputElement).value); this.saveSettings(); this.syncSettingsInputs(); });
    }
    this.el('quality').addEventListener('change', () => { this.settings.quality = (this.el('quality') as HTMLSelectElement).value as Settings['quality']; this.saveSettings(); });
    for (const key of ['bob', 'invertY'] as const) this.el(key).addEventListener('change', () => { this.settings[key] = (this.el(key) as HTMLInputElement).checked; this.saveSettings(); });
    this.el('debug-setting').addEventListener('change', () => { this.settings.debug = (this.el('debug-setting') as HTMLInputElement).checked; this.saveSettings(); });
  }
  private saveSettings() { try { localStorage.setItem('transport-ship-settings', JSON.stringify(this.settings)); } catch { this.toast('设置在本次会话有效；浏览器未允许本地保存。'); } this.onSettings(this.settings); }
  private syncSettingsInputs() {
    for (const key of ['sensitivity', 'scopeSensitivity', 'fov', 'volume', 'effectsVolume'] as const) {
      (this.el(key) as HTMLInputElement).value = String(this.settings[key]);
      this.el(`${key}-out`).textContent = key === 'sensitivity' ? (this.settings[key] * 1000).toFixed(1) : key === 'fov' ? `${this.settings[key]}°` : key.includes('Volume') || key === 'volume' ? `${Math.round(this.settings[key] * 100)}%` : this.settings[key].toFixed(2);
    }
    (this.el('quality') as HTMLSelectElement).value = this.settings.quality;
    (this.el('bob') as HTMLInputElement).checked = this.settings.bob;
    (this.el('invertY') as HTMLInputElement).checked = this.settings.invertY;
    (this.el('debug-setting') as HTMLInputElement).checked = this.settings.debug;
  }
  showMenu() { this.el('menu').classList.remove('hidden'); this.el('hud').classList.add('hidden'); this.el('pause').classList.add('hidden'); this.el('end').classList.add('hidden'); }
  showGame() { this.el('menu').classList.add('hidden'); this.el('pause').classList.add('hidden'); this.el('end').classList.add('hidden'); this.el('hud').classList.remove('hidden'); this.el('settings-panel').classList.add('hidden'); }
  showPause() { this.el('pause').classList.remove('hidden'); this.el('scoreboard').classList.add('hidden'); }
  showEnd(game: Game) {
    this.el('pause').classList.add('hidden'); this.el('end').classList.remove('hidden'); this.el('scoreboard').classList.add('hidden');
    const won = game.winner === game.playerTeam, draw = game.winner === 'draw';
    this.el('result-title').textContent = draw ? '平局' : won ? '任务完成' : '本局失利';
    this.el('result-desc').textContent = draw ? '双方实力相当。下次在侧翼抢占先机。' : won ? '甲板已由你的队伍控制。' : '重整装备，再次登船。';
    this.el('result-symbol').textContent = draw ? '◇' : won ? '◆' : '✕';
    this.el('result-score').textContent = `${String(game.score.red).padStart(2, '0')} — ${String(game.score.blue).padStart(2, '0')}`;
  }
  setScoreboard(visible: boolean) { this.el('scoreboard').classList.toggle('hidden', !visible); }
  toast(message: string) { this.el('toast').textContent = message; this.el('toast').classList.remove('hidden'); window.setTimeout(() => this.el('toast').classList.add('hidden'), 3600); }
  consume(events: GameEvent[], game: Game) {
    for (const e of events) {
      if (e.type === 'hit' && e.actor === game.player.id && e.amount && e.amount > 0) { this.hitUntil = game.now + .15; if (game.getActor(e.target!)?.health === 0) this.killUntil = game.now + 1.2; }
      if (e.type === 'death') {
        const killer = game.getActor(e.actor!)!, victim = game.getActor(e.target!)!;
        if (killer && victim) this.feed.unshift({ html: `<span class="${killer.team}">${esc(killer.name)}</span><b>${esc(e.text || '击杀')}</b><span class="${victim.team}">${esc(victim.name)}</span>`, until: game.now + 5 });
      }
      if (e.type === 'shot' && e.actor !== game.player.id) {
        const source = game.getActor(e.actor!);
        if (source && source.team !== game.playerTeam) this.reveals.push({ x: e.x, z: e.z, until: game.now + 1.2 });
      }
    }
    this.feed = this.feed.filter(f => f.until > game.now).slice(0, 5);
    this.reveals = this.reveals.filter(r => r.until > game.now).slice(-15);
  }
  update(game: Game) {
    if (!game.actors.length) return;
    const player = game.player;
    this.el('hit-marker').classList.toggle('hidden', game.now >= this.hitUntil);
    this.el('kill-marker').classList.toggle('hidden', game.now >= this.killUntil);
    this.el('scope').classList.toggle('hidden', !(player.alive && player.ads && player.selected === 'longshot'));
    this.el('crosshair').classList.toggle('hidden', !player.alive || (player.ads && player.selected === 'longshot'));
    const spread = player.selected === 'grenade' || player.selected === 'knife' ? 11 : 7 + player.moving * 1.4 + player.shotCount * 1.8;
    this.el('crosshair').style.setProperty('--gap', `${spread}px`);
    this.el('death').classList.toggle('hidden', player.alive || game.phase === 'ended');
    if (!player.alive) this.el('death-count').textContent = `${Math.max(0, Math.ceil(player.respawnAt - game.now))} 秒后复活`;
    if (game.now - this.lastHud < .08 && game.phase !== 'paused') return;
    this.lastHud = game.now;
    this.el('red-score').textContent = String(game.score.red).padStart(2, '0');
    this.el('blue-score').textContent = String(game.score.blue).padStart(2, '0');
    this.el('match-time').textContent = timeText(game.remaining);
    this.el('target-score').textContent = `先达 ${game.scoreLimit}`;
    this.el('hp-value').textContent = String(Math.ceil(player.health));
    this.el('armor-value').textContent = String(Math.ceil(player.armor));
    this.el('hp-meter').style.width = `${player.health}%`; this.el('armor-meter').style.width = `${player.armor}%`;
    this.el('status-text').textContent = !player.alive ? '等待复活' : player.protectedUntil > game.now ? `出生保护 ${Math.ceil(player.protectedUntil - game.now)} 秒` : player.hitFlash > 0 ? '受到攻击' : player.ads ? '狙击瞄准中' : '战斗中';
    const selected = player.selected;
    this.el('weapon-name').textContent = selected === 'grenade' ? player.grenadeChoice === 'he' ? '高爆手雷' : '烟雾弹' : WEAPONS[selected].name;
    this.el('slot-number').textContent = selected === player.primary ? '01 / PRIMARY' : selected === 'revolver' ? '02 / SIDEARM' : selected === 'knife' ? '03 / MELEE' : '04 / UTILITY';
    this.el('mag-value').textContent = selected === 'grenade' ? String(player.grenades[player.grenadeChoice]) : selected === 'knife' ? '—' : String(player.gear[selected].mag);
    this.el('reserve-value').textContent = selected === 'grenade' || selected === 'knife' ? '—' : String(player.gear[selected].reserve);
    this.el('ammo-label').textContent = selected === 'knife' ? '近战' : selected === 'grenade' ? '库存' : player.gear[selected].reloadEnd > game.now ? '换弹中' : '弹药';
    this.el('he-count').textContent = `高爆弹 × ${player.grenades.he}`; this.el('smoke-count').textContent = `烟雾弹 × ${player.grenades.smoke}`;
    this.el('kill-feed').innerHTML = this.feed.map(f => `<div>${f.html}</div>`).join('');
    this.el('zone-label').textContent = Math.abs(player.body.z) > 28 ? '出生舱' : Math.abs(player.body.x) > 10.5 ? '舷侧通道' : player.body.y > 1.5 ? '高处平台' : Math.abs(player.body.z) < 9 ? '中央甲板' : '交火甲板';
    this.drawMap(game);
    this.drawScoreboard(game);
    this.el('debug').classList.toggle('hidden', !this.settings.debug);
    if (this.settings.debug) this.el('debug').textContent = game.actors.filter(a => a.ai).map(a => `${a.name} 路线 ${a.ai!.lane} 目标 ${a.ai!.targetId} 最近目视 ${Math.max(0, game.now - a.ai!.seenAt).toFixed(1)}s 卡住 ${a.ai!.stuckTime.toFixed(1)}s`).join('\n');
  }
  private drawScoreboard(game: Game) {
    this.el('board-time').textContent = timeText(game.remaining);
    for (const team of ['red', 'blue'] as Team[]) {
      this.el(`board-${team}-score`).textContent = String(game.score[team]);
      this.el(`board-${team}`).innerHTML = game.actors.filter(a => a.team === team).sort((a, b) => b.kills - a.kills).map(a => `<div class="board-row ${a.player ? 'self' : ''}"><span>${esc(a.name)}${a.player ? ' ★' : ''}</span><b>${a.kills}</b><b>${a.deaths}</b></div>`).join('');
    }
  }
  private drawMap(game: Game) {
    const ctx = this.mapCtx, w = this.mapCanvas.width, h = this.mapCanvas.height;
    ctx.clearRect(0, 0, w, h); ctx.fillStyle = 'rgba(10,25,32,.82)'; ctx.fillRect(0, 0, w, h);
    const sx = w / 30, sz = h / 80, px = (x: number) => w / 2 + x * sx, pz = (z: number) => h / 2 - z * sz;
    ctx.fillStyle = 'rgba(115,145,148,.15)'; ctx.fillRect(px(-13.6), pz(37.5), 27.2 * sx, 75 * sz);
    for (const b of MAP_BLOCKS) {
      if (b.y > 3.8 || b.kind === 'rail') continue;
      ctx.save(); ctx.translate(px(b.x), pz(b.z)); ctx.rotate(b.angle);
      ctx.fillStyle = b.kind === 'wood' ? '#8d7954' : b.kind === 'tarp' ? '#637860' : b.kind === 'wall' ? '#9eada9' : '#50666f';
      ctx.fillRect(-b.w * sx / 2, -b.d * sz / 2, b.w * sx, b.d * sz); ctx.restore();
    }
    for (const a of game.actors) {
      if (!a.alive || (a.team !== game.playerTeam && !this.reveals.some(r => Math.hypot(r.x - a.body.x, r.z - a.body.z) < 2.5))) continue;
      ctx.save(); ctx.translate(px(a.body.x), pz(a.body.z)); ctx.rotate(-a.yaw);
      ctx.fillStyle = a.player ? '#ffffff' : a.team === 'red' ? '#d67969' : '#74bbd0';
      ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(5, 5); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    ctx.strokeStyle = 'rgba(215,230,223,.4)'; ctx.lineWidth = 1; ctx.strokeRect(.5, .5, w - 1, h - 1);
  }
}
