// 菜单层：加载、主菜单、设置、暂停、结算、操作说明。所有可见控件都连接到真实回调。
import { DIFFICULTY, type Difficulty, GUNS, MATCH, type PrimaryId } from "../config";
import type { Team } from "../map/layout";
import { TEAM_NAME } from "../map/layout";
import { LIMITS, type Settings } from "./settings";

export interface MenuChoice { team: Team; primary: PrimaryId; difficulty: Difficulty; mode: "standard" | "practice" }

export interface MenuHandlers {
  start(c: MenuChoice): void;
  resume(): void;
  restart(): void;
  toMenu(): void;
  settingsChanged(s: Settings): void;
}

const PRIMARIES: PrimaryId[] = ["ak", "m4", "mp5", "awm"];
const ROLE: Record<PrimaryId, string> = {
  ak: "高伤害，后坐明显；短点射最稳",
  m4: "易控制，连射散布增长慢",
  mp5: "射速快、移动快；远距离衰减大",
  awm: "开镜一发躯干击倒；拉栓间隔长",
};

function h(html: string): HTMLElement {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
}

export const CONTROLS: [string, string][] = [
  ["W A S D", "移动（斜向速度归一化）"], ["鼠标", "观察"], ["Shift", "静步（更慢、脚步声更轻）"], ["Ctrl / C", "蹲伏"], ["Space", "跳跃（空中蹲伏可跳上更高的箱子）"],
  ["鼠标左键", "攻击；自动武器按住连发"], ["鼠标右键", "狙击开镜 / 切换倍率；战术刀重击"], ["R", "换弹"],
  ["1 / 2 / 3 / 4", "主武器 / 手枪 / 近战 / 投掷物（4 循环）"], ["滚轮 / Q", "切换装备 / 切回上一件"], ["G", "快速投出当前投掷物"],
  ["Tab", "按住查看战绩"], ["Esc", "释放鼠标并暂停"],
];

export class Menus {
  readonly root: HTMLDivElement;
  private loading: HTMLElement;
  private main: HTMLElement;
  private settingsEl: HTMLElement;
  private pause: HTMLElement;
  private results: HTMLElement;
  private help: HTMLElement;
  private choice: MenuChoice = { team: 0, primary: "ak", difficulty: "normal", mode: "standard" };
  private settingsBack: "main" | "pause" = "main";
  thumbs = new Map<PrimaryId, HTMLCanvasElement>();

  constructor(parent: HTMLElement, private hnd: MenuHandlers, private settings: Settings) {
    this.root = document.createElement("div");
    this.root.className = "menus";
    parent.appendChild(this.root);

    this.loading = h(`<div class="panel loading"><div class="logo">运输船 <small>TRANSPORT SHIP</small></div>
      <div class="load-step">正在初始化…</div><div class="load-bar"><div class="load-fill"></div></div>
      <div class="load-err" hidden><p></p><button class="btn primary" data-act="retry">重试</button></div></div>`);
    this.root.appendChild(this.loading);

    this.main = h(`<div class="panel main" hidden>
      <div class="logo">运输船 <small>TRANSPORT SHIP · 5V5 团队竞技</small></div>
      <div class="main-grid">
        <section><h3>阵营</h3><div class="seg" data-k="team">
          <button data-v="0" class="t0">${TEAM_NAME[0]}<small>西侧 · 红方</small></button>
          <button data-v="1" class="t1">${TEAM_NAME[1]}<small>东侧 · 蓝方</small></button></div>
          <h3>难度</h3><div class="seg" data-k="difficulty">${(["easy", "normal", "hard"] as Difficulty[]).map((d) => `<button data-v="${d}">${DIFFICULTY[d].label}</button>`).join("")}</div>
          <h3>模式</h3><div class="seg col" data-k="mode"><button data-v="standard">${MATCH.standard.label}</button><button data-v="practice">${MATCH.practice.label}</button></div>
        </section>
        <section><h3>主武器 <small>（另配 沙鹰 · 战术刀 · 高爆手雷 · 烟雾弹）</small></h3><div class="cards">
          ${PRIMARIES.map((p) => `<button class="card" data-primary="${p}"><div class="thumb" data-thumb="${p}"></div><div class="card-name">${GUNS[p].name}</div><div class="card-role">${ROLE[p]}</div>${statBars(p)}</button>`).join("")}
        </div></section>
      </div>
      <div class="main-actions"><button class="btn primary big" data-act="start">开始游戏</button><button class="btn" data-act="settings">设置</button><button class="btn" data-act="help">操作说明</button></div>
      <div class="lock-err" hidden></div>
      <div class="foot">本地对局 · 1 名玩家 + 9 名电脑 · 所有模型、贴图与音效均为程序生成</div></div>`);
    this.root.appendChild(this.main);

    this.settingsEl = h(`<div class="panel settings" hidden><h2>设置</h2><div class="set-grid">
      ${slider("sens", "鼠标灵敏度", LIMITS.sens, 0.05)}
      ${slider("scopeSens", "狙击开镜灵敏度倍率", LIMITS.scopeSens, 0.05)}
      ${slider("fov", "视野（水平角度，°）", LIMITS.fov, 1)}
      ${slider("master", "总音量", LIMITS.master, 0.05)}
      ${slider("sfx", "音效音量", LIMITS.sfx, 0.05)}
      <label class="set-row"><span>画质档位</span><select data-s="quality"><option value="low">低（无阴影、少粒子）</option><option value="medium">中（默认）</option><option value="high">高（高分辨率阴影）</option></select></label>
      <label class="set-row chk"><input type="checkbox" data-s="invertY"><span>反转 Y 轴</span></label>
      <label class="set-row chk"><input type="checkbox" data-s="bob"><span>行走摆动与受击晃动</span></label>
      <label class="set-row chk"><input type="checkbox" data-s="showFps"><span>显示实测帧率</span></label>
      </div><div class="set-msg"></div><div class="main-actions"><button class="btn primary" data-act="set-back">返回</button></div></div>`);
    this.root.appendChild(this.settingsEl);

    this.pause = h(`<div class="panel pause" hidden><h2>已暂停</h2><p class="muted">对局已冻结。点击「继续游戏」重新锁定鼠标。</p>
      <div class="col-actions"><button class="btn primary big" data-act="resume">继续游戏</button><button class="btn" data-act="settings">设置</button>
      <button class="btn" data-act="help">操作说明</button><button class="btn" data-act="restart">重新开始</button><button class="btn danger" data-act="menu">返回主菜单</button></div>
      <div class="lock-err" hidden></div></div>`);
    this.root.appendChild(this.pause);

    this.results = h(`<div class="panel results" hidden><h2 class="res-title"></h2><div class="res-sub muted"></div><div class="res-board"></div>
      <div class="main-actions"><button class="btn primary big" data-act="restart">再来一局</button><button class="btn" data-act="menu">返回主菜单</button></div></div>`);
    this.root.appendChild(this.results);

    this.help = h(`<div class="panel help" hidden><h2>操作说明</h2><table class="keys">${CONTROLS.map(([k, v]) => `<tr><td><kbd>${k}</kbd></td><td>${v}</td></tr>`).join("")}</table>
      <p class="muted">木箱可被步枪与狙击枪穿透（伤害降低）；集装箱、舱壁和甲板阻挡子弹。烟雾遮挡视线但不阻挡子弹。</p>
      <div class="main-actions"><button class="btn primary" data-act="help-back">返回</button></div></div>`);
    this.root.appendChild(this.help);

    this.root.addEventListener("click", (e) => this.onClick(e));
    this.settingsEl.addEventListener("input", (e) => this.onSetting(e));
    this.settingsEl.addEventListener("change", (e) => this.onSetting(e));
    this.syncChoice();
    this.syncSettings();
  }

  private helpBack: "main" | "pause" = "main";

  private onClick(e: MouseEvent): void {
    const t = (e.target as HTMLElement).closest("button");
    if (!t) return;
    const seg = t.parentElement?.dataset.k as keyof MenuChoice | undefined;
    if (seg && t.dataset.v !== undefined) {
      const v = t.dataset.v;
      if (seg === "team") this.choice.team = Number(v) as Team;
      else if (seg === "difficulty") this.choice.difficulty = v as Difficulty;
      else if (seg === "mode") this.choice.mode = v as MenuChoice["mode"];
      this.syncChoice();
      return;
    }
    if (t.dataset.primary) { this.choice.primary = t.dataset.primary as PrimaryId; this.syncChoice(); return; }
    switch (t.dataset.act) {
      case "start": this.hnd.start({ ...this.choice }); break;
      case "resume": this.hnd.resume(); break;
      case "restart": this.hnd.restart(); break;
      case "menu": this.hnd.toMenu(); break;
      case "settings": this.settingsBack = this.pause.hidden ? "main" : "pause"; this.show("settings"); break;
      case "set-back": this.show(this.settingsBack); break;
      case "help": this.helpBack = this.pause.hidden ? "main" : "pause"; this.show("help"); break;
      case "help-back": this.show(this.helpBack); break;
      case "retry": location.reload(); break;
    }
  }

  private onSetting(e: Event): void {
    const t = e.target as HTMLInputElement | HTMLSelectElement;
    const k = t.dataset.s as keyof Settings | undefined;
    if (!k) return;
    const s = this.settings as unknown as Record<string, unknown>;
    if (t instanceof HTMLInputElement && t.type === "checkbox") s[k] = t.checked;
    else if (k === "quality") s[k] = t.value;
    else s[k] = Number(t.value);
    this.syncSettings();
    this.hnd.settingsChanged(this.settings);
  }

  setSettingsMessage(msg: string | null): void {
    const m = this.settingsEl.querySelector<HTMLElement>(".set-msg")!;
    m.textContent = msg ?? "";
    m.classList.toggle("err", !!msg);
  }

  private syncChoice(): void {
    const c = this.choice;
    for (const b of this.main.querySelectorAll<HTMLElement>(".seg button")) {
      const k = b.parentElement!.dataset.k as keyof MenuChoice;
      b.classList.toggle("on", String(c[k]) === b.dataset.v);
    }
    for (const b of this.main.querySelectorAll<HTMLElement>(".card")) b.classList.toggle("on", b.dataset.primary === c.primary);
  }

  private syncSettings(): void {
    const s = this.settings as unknown as Record<string, unknown>;
    for (const i of this.settingsEl.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-s]")) {
      const v = s[i.dataset.s!];
      if (i instanceof HTMLInputElement && i.type === "checkbox") i.checked = !!v;
      else i.value = String(v);
      const out = this.settingsEl.querySelector<HTMLElement>(`[data-out="${i.dataset.s}"]`);
      if (out) out.textContent = typeof v === "number" ? (i.dataset.s === "fov" ? `${v}°` : v.toFixed(2)) : "";
    }
  }

  get current(): MenuChoice {
    return { ...this.choice };
  }

  setThumb(p: PrimaryId, c: HTMLCanvasElement): void {
    const slot = this.main.querySelector(`[data-thumb="${p}"]`);
    slot?.replaceChildren(c);
  }

  show(which: "loading" | "main" | "settings" | "pause" | "results" | "help" | null): void {
    this.loading.hidden = which !== "loading";
    this.main.hidden = which !== "main";
    this.settingsEl.hidden = which !== "settings";
    this.pause.hidden = which !== "pause";
    this.results.hidden = which !== "results";
    this.help.hidden = which !== "help";
    this.root.classList.toggle("open", which !== null);
    if (which === "settings") this.syncSettings();
    for (const e of this.root.querySelectorAll<HTMLElement>(".lock-err")) e.hidden = true;
  }

  get visible(): boolean {
    return this.root.classList.contains("open");
  }

  progress(step: string, k: number): void {
    this.loading.querySelector(".load-step")!.textContent = step;
    this.loading.querySelector<HTMLElement>(".load-fill")!.style.width = `${Math.round(k * 100)}%`;
  }

  loadError(msg: string): void {
    const e = this.loading.querySelector<HTMLElement>(".load-err")!;
    e.hidden = false;
    e.querySelector("p")!.textContent = msg;
  }

  lockError(msg: string): void {
    for (const e of this.root.querySelectorAll<HTMLElement>(".lock-err")) { e.textContent = msg; e.hidden = false; }
  }

  showResults(title: string, sub: string, boardHtml: string, cls: string): void {
    this.show("results");
    const t = this.results.querySelector<HTMLElement>(".res-title")!;
    t.textContent = title;
    t.className = `res-title ${cls}`;
    this.results.querySelector(".res-sub")!.textContent = sub;
    this.results.querySelector(".res-board")!.innerHTML = boardHtml;
  }
}

function slider(k: string, label: string, lim: readonly [number, number], step: number): string {
  return `<label class="set-row"><span>${label}</span><input type="range" data-s="${k}" min="${lim[0]}" max="${lim[1]}" step="${step}"><output data-out="${k}"></output></label>`;
}

function statBars(p: PrimaryId): string {
  const g = GUNS[p];
  const acc = g.scopeFov ? 0.97 : Math.max(0.1, 1 - (g.spreadBase + g.spreadPerShot * 6) / 0.05);
  const rows: [string, number][] = [
    ["伤害", g.damage / 115], ["射速", Math.min(1, g.rpm / 900)], ["精度", acc], ["机动", (g.moveMul - 0.75) / 0.35], ["穿透", g.pen / 2.6],
  ];
  return `<div class="stats">${rows.map(([n, v]) => `<div class="stat"><span>${n}</span><i><b style="width:${Math.round(Math.max(0.05, Math.min(1, v)) * 100)}%"></b></i></div>`).join("")}
    <div class="stat-txt">${g.mag} / ${g.reserve} · ${g.rpm} RPM</div></div>`;
}
