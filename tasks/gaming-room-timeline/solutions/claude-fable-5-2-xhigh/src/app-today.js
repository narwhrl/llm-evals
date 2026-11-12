// 2023: a calm desktop. The emulator runs the very same Minesweeper board that was started in 2005.
import { minesWindow } from './app-xp.js';

const MEMS = [
  [2005, '第一次通关《剑与远方》，存档停在 Lv.37', '#b0528a'],
  [2009, '公会首杀，25 个人在语音里喊了半分钟', '#1d5a8a'],
  [2013, '宿舍五连胜，楼管上来敲门', '#1a5a6a'],
  [2017, '第一次吃鸡，手抖得截不了图', '#c9853a'],
  [2021, '线上聚会，小岛上放了一夜烟花', '#3a8a6a'],
];

export function today(s, st) {
  const { W, H, g } = s;
  st.mem ??= 0;
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#3a3550');
  bg.addColorStop(0.55, '#b5647a');
  bg.addColorStop(1, '#f0b070');
  s.rect(0, 0, W, H, bg);
  g.fillStyle = 'rgba(255,230,180,0.5)';
  g.beginPath();
  g.arc(W * 0.78, H * 0.62, 90, 0, 7);
  g.fill();

  const ex = 40, ew = 420, eh = 500;
  s.win(ex, 20, ew, eh, '复古模拟器 — 2005 年的那台电脑', '#3a2f28', '#3a6ea5', '#f4e6cc');
  minesWindow(s, ex + 78, 60, '扫雷', 30);
  s.text('硬盘镜像：2005-08-17 · 棋盘还是当年那一局', ex + ew / 2, eh - 2, 17, '#dfe8f5', 'center');
  g.fillStyle = 'rgba(0,0,0,0.12)';
  for (let y = 46; y < 20 + eh; y += 4) g.fillRect(ex, y, ew, 1);

  const ax = ex + ew + 40, aw = 420, [year, caption, col] = MEMS[st.mem];
  s.win(ax, 20, aw, 320, '回忆相册', '#b5532e', '#fbf3e4');
  s.rect(ax + 16, 60, aw - 32, 190, col, 6);
  s.text(String(year), ax + aw / 2, 150, 76, 'rgba(255,255,255,0.9)', 'center', 'bold');
  s.text(caption, ax + aw / 2, 276, 18, '#3b2f25', 'center');
  s.btn(ax + 16, 294, 70, 38, '‹', () => (st.mem = (st.mem + MEMS.length - 1) % MEMS.length), '#ead9bd', '#3b2f25', 26);
  s.btn(ax + aw - 86, 294, 70, 38, '›', () => (st.mem = (st.mem + 1) % MEMS.length), '#ead9bd', '#3b2f25', 26);
  s.text(`${st.mem + 1} / ${MEMS.length}`, ax + aw / 2, 314, 13, '#7a6857', 'center');

  s.rect(ax, 364, aw, 70, 'rgba(250,243,230,0.9)', 10);
  s.text('游戏库 1,204 款 · 还没打开过 931 款', ax + 18, 388, 18, '#3b2f25');
  s.rect(ax + 18, 408, aw - 36, 10, '#e0d0b4', 5);
  s.rect(ax + 18, 408, (aw - 36) * 0.23, 10, '#b5532e', 5);

  s.rect(ax, 448, aw, 72, 'rgba(250,243,230,0.9)', 10);
  s.hit(ax, 448, aw, 72, () => {});
  s.text('老周：周六老地方？带上你那台老古董', ax + 18, 468, 18, '#3b2f25');
  if (st.replied) s.text('已回复：“带，顺便把你欠我的那局打完” ✓', ax + 18, 500, 17, '#3e8f6b');
  else s.btn(ax + 18, 484, 130, 32, '回复：带！', () => (st.replied = true), '#b5532e', '#fff7ea', 17);

  if (W > ax + aw + 200) {
    const cx = ax + aw + 40, cw = W - cx - 40;
    s.rect(cx, 20, cw, 500, 'rgba(30,24,34,0.55)', 12);
    s.text('今晚', cx + 20, 52, 15, '#f4e6cc');
    s.text('22:40', cx + 20, 104, 54, '#fff7ea', 'left', 'bold');
    ['21:00  和老周他们开黑', '23:30  提醒：该睡了', '周六   给老主机除尘'].forEach((m, i) => s.text(m, cx + 20, 170 + i * 38, 18, '#f4e6cc'));
  }

  s.rect(W / 2 - 170, H - 50, 340, 40, 'rgba(250,243,230,0.85)', 12);
  ['#b5532e', '#3e8f6b', '#2f5fa8', '#e8b04a', '#7a5fc0', '#3a2f28'].forEach((c, i) => s.rect(W / 2 - 150 + i * 52, H - 44, 28, 28, c, 7));
}
