// 战斗 HUD：全部读数来自 Sim 的实际状态。小地图由同一份碰撞盒体生成。
import { GRENADE, GUNS, KNIFE, MATCH } from "../config";
import type { Box, World } from "../core/world";
import type { Actor } from "../game/actor";
import type { KillFeedEntry, Sim } from "../game/sim";
import { DECK, TEAM_NAME } from "../map/layout";
import { gunName } from "../render/viewmodel";

const MM_W = 300, MM_H = 86, MM_PAD = 4;
const CAUSE: Record<string, string> = { ak: "AK-47", m4: "M4A1", mp5: "MP5", awm: "AWM", deagle: "沙鹰", knife: "战术刀", he: "手雷", smoke: "烟雾弹", fall: "坠落" };

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, parent?: HTMLElement, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  e.className = cls;
  if (text !== undefined) e.textContent = text;
  parent?.appendChild(e);
  return e;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export class Hud {
  readonly root: HTMLDivElement;
  private cross: HTMLDivElement;
  private crossLines: HTMLDivElement[] = [];
  private hitmark: HTMLDivElement;
  private hitT = 0;
  private killNote: HTMLDivElement;
  private killT = 0;
  private scoreR: HTMLSpanElement;
  private scoreB: HTMLSpanElement;
  private timeEl: HTMLSpanElement;
  private targetEl: HTMLSpanElement;
  private mm: HTMLCanvasElement;
  private mmCtx: CanvasRenderingContext2D;
  private mmBase: HTMLCanvasElement;
  private hp: HTMLDivElement;
  private hpBar: HTMLDivElement;
  private ar: HTMLDivElement;
  private arBar: HTMLDivElement;
  private status: HTMLDivElement;
  private weapon: HTMLDivElement;
  private ammo: HTMLDivElement;
  private reserve: HTMLDivElement;
  private nades: HTMLDivElement;
  private reloadBar: HTMLDivElement;
  private reloadFill: HTMLDivElement;
  private feed: HTMLDivElement;
  private feedKey = "";
  private dmgDirs: { e: HTMLDivElement; t: number; from: [number, number, number] }[] = [];
  private board: HTMLDivElement;
  private boardT = 0;
  private scope: HTMLDivElement;
  private smoke: HTMLDivElement;
  private hurt: HTMLDivElement;
  private hurtT = 0;
  private tag: HTMLDivElement;
  private death: HTMLDivElement;
  private deathText: HTMLDivElement;
  private deathCount: HTMLDivElement;
  private deathPick: HTMLDivElement;
  private fps: HTMLDivElement;
  private debugEl: HTMLDivElement;
  private toast: HTMLDivElement;
  private toastT = 0;
  showFps = false;
  debug = false;

  constructor(parent: HTMLElement, world: World) {
    this.root = el("div", "hud", parent);
    this.smoke = el("div", "hud-smoke", this.root);
    this.hurt = el("div", "hud-hurt", this.root);
    this.scope = el("div", "hud-scope", this.root);
    this.scope.innerHTML = `<div class="scope-ring"></div><div class="scope-h"></div><div class="scope-v"></div><div class="scope-dot"></div>
      <div class="scope-mil">${[1, 2, 3, 4].map((i) => `<i style="left:calc(50% + ${i * 7}vh)"></i><i style="left:calc(50% - ${i * 7}vh)"></i>`).join("")}</div>`;
    this.cross = el("div", "hud-cross", this.root);
    for (const c of ["t", "b", "l", "r"]) this.crossLines.push(el("div", `cl cl-${c}`, this.cross));
    el("div", "cl-dot", this.cross);
    this.hitmark = el("div", "hud-hit", this.root);
    this.hitmark.innerHTML = "<i></i><i></i><i></i><i></i>";
    this.killNote = el("div", "hud-killnote", this.root);
    this.tag = el("div", "hud-tag", this.root);
    this.reloadBar = el("div", "hud-reload", this.root);
    this.reloadFill = el("div", "hud-reload-fill", this.reloadBar);

    const top = el("div", "hud-top", this.root);
    this.scoreR = el("span", "score score-r", top, "0");
    const mid = el("div", "score-mid", top);
    this.timeEl = el("span", "time", mid, "10:00");
    this.targetEl = el("span", "target", mid, "目标 100");
    this.scoreB = el("span", "score score-b", top, "0");
    el("span", "team-l team-r", top, TEAM_NAME[0]).style.order = "-1";
    el("span", "team-l team-b", top, TEAM_NAME[1]);

    const mmWrap = el("div", "hud-minimap", this.root);
    this.mm = el("canvas", "", mmWrap);
    this.mm.width = MM_W; this.mm.height = MM_H;
    this.mmCtx = this.mm.getContext("2d")!;
    this.mmBase = this.bakeMinimap(world);

    const bl = el("div", "hud-bl", this.root);
    const hpRow = el("div", "vital", bl);
    el("span", "vital-ico", hpRow, "✚");
    this.hp = el("div", "vital-num", hpRow, "100");
    const hpTrack = el("div", "vital-track", hpRow);
    this.hpBar = el("div", "vital-fill hp", hpTrack);
    const arRow = el("div", "vital", bl);
    el("span", "vital-ico", arRow, "⛨");
    this.ar = el("div", "vital-num", arRow, "100");
    const arTrack = el("div", "vital-track", arRow);
    this.arBar = el("div", "vital-fill ar", arTrack);
    this.status = el("div", "vital-status", bl);

    const br = el("div", "hud-br", this.root);
    this.weapon = el("div", "wpn-name", br);
    const ammoRow = el("div", "ammo-row", br);
    this.ammo = el("div", "ammo", ammoRow);
    this.reserve = el("div", "reserve", ammoRow);
    this.nades = el("div", "nades", br);

    this.feed = el("div", "hud-feed", this.root);
    this.board = el("div", "hud-board", this.root);
    this.death = el("div", "hud-death", this.root);
    this.deathText = el("div", "death-text", this.death);
    this.deathCount = el("div", "death-count", this.death);
    this.deathPick = el("div", "death-pick", this.death);
    this.fps = el("div", "hud-fps", this.root);
    this.debugEl = el("div", "hud-debug", this.root);
    this.toast = el("div", "hud-toast", this.root);
  }

  private mmX(x: number): number { return MM_PAD + ((x + DECK.halfLength) / (DECK.halfLength * 2)) * (MM_W - MM_PAD * 2); }
  private mmY(z: number): number { return MM_PAD + ((DECK.halfWidth - z) / (DECK.halfWidth * 2)) * (MM_H - MM_PAD * 2); }

  /** 小地图底图：顶面高度越高颜色越亮；平台/楼梯区分；只绘制真实碰撞盒体 */
  private bakeMinimap(world: World): HTMLCanvasElement {
    const c = document.createElement("canvas");
    c.width = MM_W; c.height = MM_H;
    const g = c.getContext("2d")!;
    g.fillStyle = "rgba(20,26,30,0.78)";
    g.fillRect(0, 0, MM_W, MM_H);
    const sx = (MM_W - MM_PAD * 2) / (DECK.halfLength * 2), sz = (MM_H - MM_PAD * 2) / (DECK.halfWidth * 2);
    const order = [...world.boxes].filter((b) => b.mat !== "clip" && b.kind !== "deck" && b.kind !== "roof" && b.kind !== "lintel" && b.kind !== "bridge").sort((a, b) => a.top - b.top);
    for (const b of order) {
      g.save();
      g.translate(this.mmX(b.cx), this.mmY(b.cz));
      g.rotate(b.yaw);
      g.fillStyle = mmColor(b);
      const w = Math.max(1, b.hx * 2 * sx), h = Math.max(1, b.hz * 2 * sz);
      g.fillRect(-w / 2, -h / 2, w, h);
      if (b.kind === "container" || b.kind.startsWith("crate") || b.kind === "tarp") {
        g.strokeStyle = "rgba(0,0,0,0.55)";
        g.lineWidth = 0.8;
        g.strokeRect(-w / 2, -h / 2, w, h);
      }
      g.restore();
    }
    g.fillStyle = "rgba(200,80,60,0.9)";
    g.font = "bold 9px sans-serif";
    g.fillText("潜", 6, MM_H / 2 + 3);
    g.fillStyle = "rgba(90,150,230,0.9)";
    g.fillText("保", MM_W - 15, MM_H / 2 + 3);
    return c;
  }

  flashHit(head: boolean): void {
    this.hitT = 0.22;
    this.hitmark.classList.toggle("head", head);
  }

  killNotice(text: string, head: boolean): void {
    this.killNote.textContent = text;
    this.killNote.classList.toggle("head", head);
    this.killT = 1.6;
  }

  damageFrom(from: [number, number, number]): void {
    const e = el("div", "hud-dmgdir", this.root);
    this.dmgDirs.push({ e, t: 1.4, from });
    if (this.dmgDirs.length > 4) this.dmgDirs.shift()!.e.remove();
    this.hurtT = 0.45;
  }

  notify(msg: string, sec = 3): void {
    this.toast.textContent = msg;
    this.toastT = sec;
  }

  update(sim: Sim, me: Actor, dt: number, spreadPx: number, opts: { tab: boolean; smoke: number; tag: string | null; fps: string; scoped: boolean }): void {
    const m = sim.match;
    this.scoreR.textContent = String(m.score[0]);
    this.scoreB.textContent = String(m.score[1]);
    this.timeEl.textContent = fmtTime(m.remaining);
    this.targetEl.textContent = `目标 ${m.rules.killTarget}`;
    this.root.classList.toggle("team-red", me.team === 0);

    // 准星：线距由实际散布换算
    const inv = me.inv;
    const showCross = me.alive && !opts.scoped && inv.slot !== 3;
    this.cross.style.display = showCross ? "block" : "none";
    if (showCross) {
      const gap = inv.slot === 2 ? 4 : Math.max(3, Math.min(90, spreadPx));
      this.cross.style.setProperty("--gap", `${gap.toFixed(1)}px`);
    }
    this.scope.style.display = opts.scoped && me.alive ? "block" : "none";

    this.hitT -= dt;
    this.hitmark.style.opacity = String(Math.max(0, this.hitT / 0.22));
    this.killT -= dt;
    this.killNote.style.opacity = String(Math.max(0, Math.min(1, this.killT / 0.4)));
    this.hurtT -= dt;
    this.hurt.style.opacity = String(Math.max(0, this.hurtT / 0.45) * 0.8);
    this.smoke.style.opacity = String(Math.min(0.97, opts.smoke * 1.05));
    this.tag.textContent = opts.tag ?? "";
    this.tag.style.display = opts.tag ? "block" : "none";

    // 生命与护甲
    this.hp.textContent = String(Math.ceil(me.health));
    this.hpBar.style.width = `${(me.health / MATCH.maxHealth) * 100}%`;
    this.hp.classList.toggle("low", me.health <= 30);
    this.ar.textContent = String(Math.ceil(me.armor));
    this.arBar.style.width = `${(me.armor / MATCH.maxArmor) * 100}%`;
    const st: string[] = [];
    if (me.alive && me.protect > 0) st.push(`出生保护 ${me.protect.toFixed(1)}s`);
    if (me.motor.crouched) st.push("蹲伏");
    else if (me.intent.walk) st.push("静步");
    this.status.textContent = st.join(" · ");
    this.status.classList.toggle("protect", me.protect > 0);

    // 武器
    const id = inv.slot === 0 ? inv.primary.def.id : inv.slot === 1 ? "deagle" : inv.slot === 2 ? "knife" : inv.nadeSel;
    const scopeTxt = inv.scope > 0 && GUNS.awm.scopeFov ? `  ${inv.scope === 1 ? "2×" : "6×"}` : "";
    this.weapon.textContent = (inv.slot === 2 ? KNIFE.short : gunName(id)) + scopeTxt;
    const g = inv.gun;
    if (g) {
      this.ammo.textContent = String(g.mag);
      this.reserve.textContent = `/ ${g.reserve}`;
      this.ammo.classList.toggle("low", g.mag <= Math.ceil(g.def.mag * 0.2));
    } else {
      this.ammo.textContent = inv.slot === 3 ? String(inv.nades[inv.nadeSel]) : "—";
      this.reserve.textContent = inv.slot === 3 ? "枚" : "";
      this.ammo.classList.remove("low");
    }
    this.nades.innerHTML = `<span class="${inv.nadeSel === "he" && inv.slot === 3 ? "sel" : ""}">高爆 ×${inv.nades.he}</span><span class="${inv.nadeSel === "smoke" && inv.slot === 3 ? "sel" : ""}">烟雾 ×${inv.nades.smoke}</span>`;
    const reloading = !!g?.reloading;
    const bolting = !!g && g.def.mode === "bolt" && g.boltProgress < 1 && !reloading;
    const drawing = inv.drawT > 0;
    this.reloadBar.style.display = me.alive && (reloading || bolting || drawing) ? "block" : "none";
    const prog = reloading ? g!.reloadProgress : bolting ? g!.boltProgress : 1 - inv.drawT / Math.max(0.01, inv.drawTimeOf(inv.slot));
    this.reloadFill.style.width = `${Math.max(0, Math.min(1, prog)) * 100}%`;
    this.reloadBar.dataset.label = reloading ? "换弹" : bolting ? "拉栓" : "切换";
    if (inv.throwT >= 0) { this.reloadBar.style.display = "block"; this.reloadBar.dataset.label = "投掷"; this.reloadFill.style.width = `${Math.min(1, inv.throwT / GRENADE.throwTime) * 100}%`; }

    this.updateFeed(sim.killfeed, sim.time, me);
    this.updateDmgDirs(me, dt);
    this.drawMinimap(sim, me);

    this.board.style.display = opts.tab ? "block" : "none";
    this.boardT -= dt;
    if (opts.tab && this.boardT <= 0) { this.boardT = 0.25; this.board.innerHTML = scoreboardHtml(sim, me); }

    // 死亡界面
    this.death.style.display = me.alive ? "none" : "flex";
    if (!me.alive) {
      this.deathCount.textContent = me.respawnT > 0 ? `${me.respawnT.toFixed(1)} 秒后复活` : "";
      const opts2 = (["ak", "m4", "mp5", "awm"] as const).map((p, i) => `<span class="${me.primaryChoice === p ? "sel" : ""}">[${i + 1}] ${GUNS[p].short}</span>`).join("");
      this.deathPick.innerHTML = `下次出生主武器：${opts2}`;
    }

    this.fps.style.display = this.showFps ? "block" : "none";
    this.fps.textContent = opts.fps;
    this.toastT -= dt;
    this.toast.style.opacity = String(Math.max(0, Math.min(1, this.toastT)));
    this.debugEl.style.display = this.debug ? "block" : "none";
    if (this.debug && Math.floor(sim.time * 4) !== Math.floor((sim.time - dt) * 4)) {
      const lines: string[] = [];
      for (const a of sim.actors) {
        const b = sim.brains.get(a.id);
        lines.push(`${a.team ? "蓝" : "红"} ${a.name.padEnd(3, "　")} ${a.alive ? "" : "✝ "}(${a.x.toFixed(1)},${a.y.toFixed(1)},${a.z.toFixed(1)}) ${b ? b.debug : "玩家"}`);
      }
      this.debugEl.textContent = lines.join("\n");
    }
  }

  setDeath(text: string): void {
    this.deathText.innerHTML = text;
  }

  private updateFeed(feed: readonly KillFeedEntry[], t: number, me: Actor): void {
    const live = feed.filter((f) => t - f.t < 7).slice(-5);
    const key = live.map((f) => `${f.t}`).join("|");
    if (key === this.feedKey) return;
    this.feedKey = key;
    this.feed.innerHTML = live.map((f) => {
      const mine = f.killer === me.name || f.victim === me.name;
      const tags = `${f.headshot ? '<b class="hs">爆头</b>' : ""}${f.penetrated ? '<b class="pen">穿透</b>' : ""}`;
      const killer = f.cause === "fall" ? "" : `<span class="t${f.killerTeam}">${esc(f.killer)}</span>`;
      return `<div class="feed-row${mine ? " mine" : ""}">${killer}<span class="cause">${CAUSE[f.cause] ?? f.cause}</span>${tags}<span class="t${f.victimTeam}">${esc(f.victim)}</span></div>`;
    }).join("");
  }

  private updateDmgDirs(me: Actor, dt: number): void {
    for (let i = this.dmgDirs.length - 1; i >= 0; i--) {
      const d = this.dmgDirs[i];
      d.t -= dt;
      if (d.t <= 0) { d.e.remove(); this.dmgDirs.splice(i, 1); continue; }
      const dx = d.from[0] - me.x, dz = d.from[2] - me.z;
      const rel = Math.atan2(-dx, -dz) - me.yaw; // 0 = 正前方，正值 = 左侧
      d.e.style.transform = `translate(-50%,-50%) rotate(${(-rel * 180) / Math.PI}deg)`;
      d.e.style.opacity = String(Math.min(1, d.t / 0.6));
    }
  }

  private drawMinimap(sim: Sim, me: Actor): void {
    const g = this.mmCtx;
    g.clearRect(0, 0, MM_W, MM_H);
    g.drawImage(this.mmBase, 0, 0);
    // 敌方开火暴露点：事件位置、短暂保留（不实时追踪）
    for (const r of sim.reveals) {
      const a = sim.actors[r.id];
      if (!a || a.team === me.team) continue;
      const k = 1 - (sim.time - r.t) / 1.5;
      if (k <= 0) continue;
      g.fillStyle = `rgba(235,70,55,${(0.9 * k).toFixed(2)})`;
      g.beginPath(); g.arc(this.mmX(r.x), this.mmY(r.z), 3, 0, Math.PI * 2); g.fill();
    }
    for (const a of sim.actors) {
      if (a.team !== me.team || a === me || !a.alive || a.dummy) continue;
      g.fillStyle = me.team === 0 ? "#f0a060" : "#7fb6ff";
      g.beginPath(); g.arc(this.mmX(a.x), this.mmY(a.z), 2.6, 0, Math.PI * 2); g.fill();
    }
    if (me.alive) {
      const x = this.mmX(me.x), y = this.mmY(me.z);
      // 屏幕：+x = 世界 +X，+y = 世界 −Z；视线方向 (−sin yaw, −cos yaw)
      const fx = -Math.sin(me.yaw), fy = Math.cos(me.yaw);
      g.fillStyle = "rgba(255,255,255,0.18)";
      g.beginPath(); g.moveTo(x, y);
      const a0 = Math.atan2(fy, fx);
      g.arc(x, y, 22, a0 - 0.6, a0 + 0.6); g.closePath(); g.fill();
      g.fillStyle = "#fff";
      g.beginPath();
      g.moveTo(x + fx * 5, y + fy * 5);
      g.lineTo(x - fx * 3 - fy * 3, y - fy * 3 + fx * 3);
      g.lineTo(x - fx * 3 + fy * 3, y - fy * 3 - fx * 3);
      g.closePath(); g.fill();
    }
  }

  reset(): void {
    this.feedKey = "";
    this.feed.innerHTML = "";
    for (const d of this.dmgDirs) d.e.remove();
    this.dmgDirs.length = 0;
    this.hitT = this.killT = this.hurtT = 0;
  }
}

function mmColor(b: Box): string {
  if (b.mat === "rail") return "rgba(150,160,165,0.7)";
  if (b.kind === "bulwark") return "#6b7378";
  if (b.kind === "cabin-wall") return "#c9c6bb";
  if (b.kind === "platform" || b.kind === "stair") return "#7e8a90";
  if (b.kind === "tarp") return "#5b7a3e";
  if (b.kind.startsWith("crate")) return b.top > 1.5 ? "#b08a55" : "#8d6c40";
  if (b.kind === "container") return b.top > 3 ? "#8fa3b0" : "#61788a";
  return "#56626a";
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

export function scoreboardHtml(sim: Sim, me: Actor | null): string {
  const cols = [0, 1].map((team) => {
    const rows = sim.actors.filter((a) => a.team === team && !a.dummy).sort((a, b) => b.score - a.score || b.kills - a.kills);
    return `<div class="board-team t${team}"><div class="board-head"><span>${TEAM_NAME[team]}</span><span>${sim.match.score[team]}</span></div>
      <table><tr><th>成员</th><th>击杀</th><th>死亡</th><th>爆头</th><th>得分</th></tr>
      ${rows.map((a) => `<tr class="${a === me ? "me" : ""}${a.alive ? "" : " dead"}"><td>${esc(a.name)}${a.isPlayer ? "（你）" : ""}</td><td>${a.kills}</td><td>${a.deaths}</td><td>${a.headshots}</td><td>${a.score}</td></tr>`).join("")}
      </table></div>`;
  });
  return `<div class="board-title">团队竞技 · 运输船 · 得分 = 击杀×2 + 爆头 + 每百伤害 1</div><div class="board-cols">${cols.join("")}</div>`;
}
