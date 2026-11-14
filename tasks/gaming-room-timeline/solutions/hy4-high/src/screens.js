import * as THREE from 'three';

export const SCREEN_W = 1024;
export const SCREEN_H = 640;

const THEMES = [
  { year: '2005', wall: ['#2f6fb8', '#78b45e'], bar: '#2a4f8f', accent: '#e9b74e', label: 'Windows 式桌面 · 1024×768' },
  { year: '2009', wall: ['#123047', '#3d6b87'], bar: '#1b2b3a', accent: '#5fc4d8', label: '宽屏桌面 · 游戏库' },
  { year: '2013', wall: ['#241a45', '#5b3b7a'], bar: '#1b1730', accent: '#a98ae8', label: '联赛客户端' },
  { year: '2017', wall: ['#14161c', '#333b46'], bar: '#101216', accent: '#d9a95e', label: '游戏库 · 深色主题' },
  { year: '2021', wall: ['#0e2b30', '#2b5a58'], bar: '#0c1e21', accent: '#6fd4c0', label: '直播工作台' },
  { year: '2025', wall: ['#26221f', '#5b5048'], bar: '#1b1815', accent: '#e0a869', label: '桌面 · 最后一格' },
];

function fill(ctx, x, y, w, h, color, r = 0) {
  ctx.fillStyle = color;
  if (r > 0) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }
}

function txt(ctx, str, x, y, size, color, align = 'left', weight = '400', family = '"Microsoft YaHei", sans-serif') {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.textAlign = align;
  ctx.fillText(str, x, y);
  ctx.textAlign = 'left';
}

function line(ctx, x1, y1, x2, y2, color, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function button(ctx, x, y, w, h, label, hits, action, color = '#e0a869', textColor = '#201812') {
  fill(ctx, x, y, w, h, color, 6);
  txt(ctx, label, x + w / 2, y + h / 2 + 6, 16, textColor, 'center', 'bold');
  hits.push({ x, y, w, h, action });
}

function icon(ctx, x, y, glyph, label, color, hits, action) {
  fill(ctx, x, y, 74, 66, color, 8);
  fill(ctx, x + 4, y + 4, 66, 8, 'rgba(255,255,255,0.14)', 4);
  txt(ctx, glyph, x + 37, y + 46, 34, '#fff7e8', 'center', 'bold', 'Georgia, serif');
  txt(ctx, label, x + 37, y + 90, 15, '#f6efdf', 'center');
  hits.push({ x: x - 6, y: y - 6, w: 86, h: 100, action });
}

function windowFrame(ctx, title, hits, w = 720, h = 440, accent = '#3a4a63') {
  const x = (SCREEN_W - w) / 2;
  const y = (SCREEN_H - h) / 2 - 8;
  fill(ctx, x + 5, y + 7, w, h, 'rgba(0,0,0,0.45)', 12);
  fill(ctx, x, y, w, h, '#1b1e24', 10);
  fill(ctx, x, y, w, 36, accent, 10);
  fill(ctx, x, y + 26, w, 10, accent);
  txt(ctx, title, x + 18, y + 24, 16, '#fff5e6', 'left', 'bold');
  button(ctx, x + w - 40, y + 5, 30, 26, '×', hits, { type: 'close' }, '#8d3b34', '#ffe9dd');
  return { x, y, w, h };
}

function taskbar(ctx, theme, state, hits) {
  fill(ctx, 0, SCREEN_H - 44, SCREEN_W, 44, theme.bar);
  fill(ctx, 0, SCREEN_H - 46, SCREEN_W, 2, 'rgba(255,255,255,0.18)');
  button(ctx, 12, SCREEN_H - 38, 104, 30, '▣ 开始', hits, { type: 'view', v: 'menu' }, theme.accent, '#201a14');
  txt(ctx, theme.label, 132, SCREEN_H - 17, 14, 'rgba(255,255,255,0.72)');
  txt(ctx, theme.year, SCREEN_W - 26, SCREEN_H - 17, 15, '#fff2dc', 'right', 'bold', 'Georgia, serif');
  if (state.message) {
    fill(ctx, 300, SCREEN_H - 92, 430, 38, 'rgba(20,18,16,0.88)', 8);
    txt(ctx, state.message, 316, SCREEN_H - 67, 14, '#ffd9a3');
  }
}

function drawDesktop(ctx, state, hits, era, theme) {
  const g = ctx.createLinearGradient(0, 0, SCREEN_W, SCREEN_H);
  g.addColorStop(0, theme.wall[0]);
  g.addColorStop(1, theme.wall[1]);
  fill(ctx, 0, 0, SCREEN_W, SCREEN_H, g);
  ctx.save();
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 22; i++) {
    line(ctx, 0, i * 32, SCREEN_W, i * 32 - 120, '#ffffff', 1);
  }
  ctx.restore();
  txt(ctx, theme.year, SCREEN_W - 40, 96, 92, 'rgba(255,255,255,0.12)', 'right', 'bold', 'Georgia, serif');

  const iconsByEra = [
    [['C', 'CS 1.6', '#3d6b96', { type: 'view', v: 'cs' }], ['◇', '扫雷', '#c2a055', { type: 'view', v: 'mines' }],
     ['▣', '我的电脑', '#4a7b58', { type: 'view', v: 'files' }], ['⌫', '回收站', '#6b6f78', { type: 'view', v: 'trash' }]],
    [['▶', '极速 2009', '#a8543b', { type: 'view', v: 'racer' }], ['▤', '游戏库', '#3c6f8c', { type: 'view', v: 'library' }],
     ['↓', '下载中', '#5b6b7a', { type: 'view', v: 'downloads' }], ['▣', '存档', '#4a7b58', { type: 'view', v: 'files' }]],
    [['◈', '联赛客户端', '#6b4c9c', { type: 'view', v: 'client' }], ['▦', '赛程表', '#3f6b9b', { type: 'view', v: 'schedule' }],
     ['▣', '截图', '#4a7b58', { type: 'view', v: 'shots' }]],
    [['▦', '游戏库', '#4b5b6b', { type: 'view', v: 'store' }], ['⚙', '设置', '#5a5a5a', { type: 'view', v: 'settings' }],
     ['▣', '录像', '#7a5b3b', { type: 'view', v: 'shots' }]],
    [['●', '直播台', '#39776d', { type: 'view', v: 'stream' }], ['▤', '聊天', '#3c6f8c', { type: 'view', v: 'stream' }],
     ['▣', '录像', '#4a7b58', { type: 'view', v: 'shots' }]],
    [['▣', '2005', '#9a7550', { type: 'view', v: 'folder' }], ['▤', '存档', '#4a7b58', { type: 'view', v: 'files' }],
     ['⚙', '设备', '#5a5a5a', { type: 'view', v: 'settings' }]],
  ];
  iconsByEra[era].forEach(([glyph, label, color, action], i) => {
    icon(ctx, 34, 40 + i * 112, glyph, label, color, hits, action);
  });

  if (era === 4) {
    fill(ctx, 560, 150, 400, 250, '#0d1518', 8);
    fill(ctx, 560, 150, 400, 28, '#173a38', 8);
    txt(ctx, '预览 · 摄像头', 574, 170, 14, '#9fe0d2');
    drawMiniGame(ctx, 576, 190, 368, 196, '#1a3a34');
    txt(ctx, state.live ? '● LIVE' : '○ 未开播', 574, 424, 16, state.live ? '#ff8b72' : '#8fa09c', 'left', 'bold');
    button(ctx, 800, 410, 148, 34, state.live ? '结束直播' : '开始直播', hits, { type: 'toggle', k: 'live' }, '#6fd4c0', '#10221f');
  }
  if (era === 5) {
    fill(ctx, 580, 160, 340, 220, 'rgba(28,24,20,0.82)', 10);
    txt(ctx, '便签', 604, 194, 15, '#e0a869', 'left', 'bold');
    txt(ctx, '别删那个文件夹。', 604, 232, 18, '#f0e4cd');
    txt(ctx, '里面是 2005 年夏天的存档。', 604, 264, 14, '#b6a894');
    txt(ctx, '—— 2025', 604, 316, 15, '#8a7c6a');
  }

  if (state.view === 'menu') {
    const x = 12;
    const y = SCREEN_H - 44 - 236;
    fill(ctx, x, y, 260, 236, '#22262e', 10);
    fill(ctx, x, y, 6, 236, theme.accent);
    txt(ctx, '开始菜单', x + 20, y + 32, 17, '#f4e8d4', 'left', 'bold');
    ['我的文档', '游戏', '控制面板', '关机…'].forEach((label, i) => {
      button(ctx, x + 18, y + 52 + i * 42, 224, 34, label, hits, { type: 'menu', i }, '#31363f', '#f0e6d5');
    });
  }
  taskbar(ctx, theme, state, hits);
}

function drawMiniGame(ctx, x, y, w, h, color) {
  fill(ctx, x, y, w, h, color);
  fill(ctx, x + w * 0.2, y + h * 0.25, w * 0.6, h * 0.5, 'rgba(255,255,255,0.08)');
  fill(ctx, x + w * 0.32, y + h * 0.35, w * 0.36, h * 0.3, 'rgba(0,0,0,0.28)');
}

function drawFps(ctx, state, hits, title, accent, era) {
  const f = windowFrame(ctx, title, hits, 780, 470, accent);
  const gx = f.x + 16;
  const gy = f.y + 52;
  const gw = f.w - 32;
  const gh = f.h - 112;
  fill(ctx, gx, gy, gw, gh, '#6b6250');
  fill(ctx, gx, gy + gh * 0.62, gw, gh * 0.38, '#4a4236');
  fill(ctx, gx + gw * 0.18, gy + gh * 0.16, gw * 0.64, gh * 0.46, '#8b7c62');
  fill(ctx, gx + gw * 0.32, gy + gh * 0.28, gw * 0.36, gh * 0.24, '#2f2a24');
  line(ctx, gx + gw / 2, gy - 4, gx + gw * 0.18, gy + gh * 0.62, 'rgba(255,255,255,0.12)', 2);
  line(ctx, gx + gw / 2, gy - 4, gx + gw * 0.82, gy + gh * 0.62, 'rgba(255,255,255,0.12)', 2);
  // crosshair
  const cx = gx + gw / 2;
  const cy = gy + gh / 2;
  line(ctx, cx - 16, cy, cx + 16, cy, '#f4e7c8', 2);
  line(ctx, cx, cy - 16, cx, cy + 16, '#f4e7c8', 2);
  txt(ctx, 'HP 100', gx + 18, gy + gh - 18, 17, '#e9dcc0', 'left', 'bold', 'monospace');
  txt(ctx, `AMMO 30   得分 ${state.score}`, gx + gw - 18, gy + gh - 18, 17, '#e9dcc0', 'right', 'bold', 'monospace');
  if (era === 5) {
    fill(ctx, gx + 20, gy + 20, 330, 44, 'rgba(20,18,16,0.78)', 6);
    txt(ctx, '还是这一关，只是屏幕宽了。', gx + 34, gy + 49, 17, '#ffd9a3');
  } else {
    txt(ctx, '点击画面 = 开火', f.x + 20, f.y + f.h - 22, 14, '#9aa0a8');
  }
  button(ctx, f.x + f.w - 168, f.y + f.h - 44, 148, 32, '开火 +1', hits, { type: 'fire' }, accent, '#1a1612');
  hits.push({ x: gx, y: gy, w: gw, h: gh, action: { type: 'fire' } });
}

function drawMines(ctx, state, hits) {
  const f = windowFrame(ctx, '扫雷 · 初级', hits, 620, 470, '#8d8f6b');
  const cols = 8;
  const rows = 6;
  const size = 54;
  const ox = f.x + (f.w - cols * size) / 2;
  const oy = f.y + 62;
  if (!state.cells.length) state.cells = Array(cols * rows).fill(false);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const x = ox + c * size;
      const y = oy + r * size;
      const open = state.cells[i];
      fill(ctx, x + 2, y + 2, size - 4, size - 4, open ? '#c9c3ae' : '#6f7464', 3);
      if (open) {
        const mine = (i * 5 + 3) % 11 === 0;
        txt(ctx, mine ? '✱' : String((i * 7 + 1) % 4), x + size / 2, y + size / 2 + 9, 26, mine ? '#a33' : '#37516b', 'center', 'bold', 'Georgia, serif');
      }
      hits.push({ x: x + 2, y: y + 2, w: size - 4, h: size - 4, action: { type: 'cell', i } });
    }
  }
  txt(ctx, '点格子翻开 · 踩到 ✱ 会重开一局', f.x + 20, f.y + f.h - 20, 14, '#9aa0a8');
  button(ctx, f.x + f.w - 150, f.y + f.h - 48, 130, 32, '重开', hits, { type: 'resetCells' }, '#c9a24a', '#221c12');
}

function drawFiles(ctx, state, hits, era) {
  const f = windowFrame(ctx, era === 5 ? '存档 · 2005—2025' : '我的电脑', hits, 660, 430, '#4a6b58');
  const rows = era === 5
    ? ['2005 暑假', 'CS 自动存档', '联赛录像 2013', '直播回放 2021', '照片']
    : ['我的文档', '游戏存档', '2005 暑假', '照片', '新建文件夹'];
  rows.forEach((label, i) => {
    const x = f.x + 26 + (i % 2) * 310;
    const y = f.y + 62 + Math.floor(i / 2) * 84;
    fill(ctx, x, y, 288, 66, '#2b3138', 6);
    txt(ctx, '▣', x + 18, y + 43, 28, '#d9b676', 'left', 'bold');
    txt(ctx, label, x + 62, y + 40, 17, '#ece2cd');
    hits.push({ x, y, w: 288, h: 66, action: { type: 'pickFile', label } });
  });
  txt(ctx, state.message || '双击一个文件夹看看', f.x + 26, f.y + f.h - 24, 15, '#9fc4a8');
}

function drawLibrary(ctx, state, hits, era) {
  const f = windowFrame(ctx, era === 1 ? '游戏库' : '游戏库 · 全部', hits, 720, 460, era === 1 ? '#2d5570' : '#3b4654');
  const games = era === 1
    ? ['极速 2009', '现代战争 2', '赛车计划', '夜班'] 
    : ['远征', '夜城', '山脊', '旧世界', '星港', '回声'];
  games.forEach((name, i) => {
    const x = f.x + 24 + (i % 3) * 224;
    const y = f.y + 56 + Math.floor(i / 3) * 138;
    const selected = state.selected === i;
    fill(ctx, x, y, 208, 120, selected ? '#4c5a4a' : '#262c34', 8);
    fill(ctx, x, y, 208, 62, selected ? '#6d7a5c' : '#39434e', 8);
    txt(ctx, String(i + 1).padStart(2, '0'), x + 14, y + 42, 26, '#e9d5aa', 'left', 'bold', 'Georgia, serif');
    txt(ctx, name, x + 14, y + 92, 17, '#f0e8d8');
    hits.push({ x, y, w: 208, h: 120, action: { type: 'select', i } });
  });
  txt(ctx, `已选中：${games[state.selected]}`, f.x + 24, f.y + f.h - 26, 15, '#9aa0a8');
  button(ctx, f.x + f.w - 160, f.y + f.h - 54, 140, 36, era === 1 ? '启动 ▶' : '启动 ▶', hits, { type: 'view', v: era === 1 ? 'racer' : 'fps' }, '#d9a95e', '#211a12');
}

function drawDetail(ctx, state, hits) {
  const f = windowFrame(ctx, '游戏详情', hits, 640, 430, '#3b4654');
  fill(ctx, f.x + 24, f.y + 56, 592, 190, '#222a32', 8);
  drawMiniGame(ctx, f.x + 40, f.y + 72, 560, 156, '#3b4a52');
  txt(ctx, `第 ${state.selected + 1} 个游戏`, f.x + 28, f.y + 282, 21, '#f0e5d0', 'left', 'bold');
  txt(ctx, '通关时间 42 小时 · 最后一次打开：上周五', f.x + 28, f.y + 314, 15, '#a8b0b8');
  button(ctx, f.x + f.w - 172, f.y + f.h - 56, 152, 38, '启动 ▶', hits, { type: 'view', v: 'fps' }, '#d9a95e', '#211a12');
}

function drawClient(ctx, state, hits) {
  const f = windowFrame(ctx, '联赛客户端 · SEASON 3', hits, 760, 470, '#4c3a76');
  ['守卫', '游侠', '术士'].forEach((name, i) => {
    const x = f.x + 26 + i * 238;
    const y = f.y + 66;
    fill(ctx, x, y, 218, 260, state.selected === i ? '#5f4a8d' : '#2a2536', 10);
    fill(ctx, x + 12, y + 12, 194, 170, ['#3d6b8c', '#6b5a3c', '#5a3c6b'][i], 8);
    txt(ctx, ['◈', '✦', '✶'][i], x + 109, y + 122, 74, '#f0dfba', 'center', 'bold', 'Georgia, serif');
    txt(ctx, name, x + 109, y + 218, 21, '#f2e8d7', 'center', 'bold');
    txt(ctx, state.selected === i ? '已选中' : '点击选择', x + 109, y + 244, 13, '#b6a8c8', 'center');
    hits.push({ x, y, w: 218, h: 260, action: { type: 'select', i } });
  });
  button(ctx, f.x + f.w - 200, f.y + f.h - 58, 178, 42, 'PLAY ▶ 开始匹配', hits, { type: 'view', v: 'game' }, '#a98ae8', '#1d1728');
  txt(ctx, '排队预计 00:12', f.x + 26, f.y + f.h - 30, 14, '#a99cc0');
}

function drawGame(ctx, state, hits) {
  const f = windowFrame(ctx, '对局中 · 12:04', hits, 780, 470, '#4c3a76');
  fill(ctx, f.x + 16, f.y + 52, f.w - 32, f.h - 108, '#202a26');
  fill(ctx, f.x + 16, f.y + 52 + (f.h - 108) * 0.55, f.w - 32, (f.h - 108) * 0.45, '#2e3c30');
  line(ctx, f.x + 16, f.y + 52 + (f.h - 108) * 0.55, f.x + f.w - 16, f.y + 52 + (f.h - 108) * 0.55, 'rgba(255,255,255,0.14)', 2);
  txt(ctx, '3 vs 3', f.x + 34, f.y + 84, 19, '#e8dcc0', 'left', 'bold', 'monospace');
  txt(ctx, `击杀 ${state.score}`, f.x + 34, f.y + 112, 16, '#a9c8b0', 'left', 'bold', 'monospace');
  // minimap
  const mx = f.x + f.w - 176;
  const my = f.y + 62;
  fill(ctx, mx, my, 156, 156, '#121a18', 6);
  for (let i = 0; i < 6; i++) {
    const px = mx + 20 + ((i * 47 + state.tick * 7) % 116);
    const py = my + 22 + ((i * 61) % 112);
    fill(ctx, px, py, 9, 9, i % 2 ? '#8fd0a0' : '#d98a7a', 2);
  }
  txt(ctx, '小地图', mx + 8, my + 148, 12, '#8ea396');
  hits.push({ x: mx, y: my, w: 156, h: 156, action: { type: 'ping' } });
  ['Q', 'W', 'E'].forEach((key, i) => {
    const x = f.x + 40 + i * 92;
    const y = f.y + f.h - 96;
    const cd = state.cooldowns[i];
    fill(ctx, x, y, 76, 66, cd > 0 ? '#454048' : '#6b5490', 8);
    txt(ctx, key, x + 38, y + 42, 30, '#f2e6d0', 'center', 'bold', 'Georgia, serif');
    if (cd > 0) txt(ctx, String(Math.ceil(cd)), x + 38, y + 42, 22, '#ffd0a0', 'center', 'bold');
    hits.push({ x, y, w: 76, h: 66, action: { type: 'skill', i } });
  });
  button(ctx, f.x + f.w - 196, f.y + f.h - 88, 172, 44, '攻击 +1', hits, { type: 'fire' }, '#a98ae8', '#1d1728');
}

function drawRacer(ctx, state, hits) {
  const f = windowFrame(ctx, '极速 2009 · 第 2 圈', hits, 780, 470, '#2d5570');
  fill(ctx, f.x + 16, f.y + 52, f.w - 32, f.h - 108, '#4a5c68');
  fill(ctx, f.x + 16, f.y + 52 + (f.h - 108) * 0.55, f.w - 32, (f.h - 108) * 0.45, '#3b3f42');
  fill(ctx, f.x + f.w / 2 - 110, f.y + 52 + (f.h - 108) * 0.55, 220, (f.h - 108) * 0.45, '#5b6063');
  for (let i = 0; i < 5; i++) {
    const t = i / 5 + (state.tick % 20) / 100;
    const y = f.y + 52 + (f.h - 108) * 0.55 + t * (f.h - 108) * 0.45;
    fill(ctx, f.x + f.w / 2 - 5 - t * 90, y, 10 + t * 180, 3, 'rgba(255,240,210,0.6)');
  }
  txt(ctx, `${180 + state.score * 7} km/h`, f.x + 34, f.y + 96, 28, '#ffe6bb', 'left', 'bold', 'Georgia, serif');
  txt(ctx, `得分 ${state.score}`, f.x + f.w - 34, f.y + 96, 18, '#d5e6ea', 'right', 'bold');
  button(ctx, f.x + 34, f.y + f.h - 90, 180, 44, '加速 ▶', hits, { type: 'fire' }, '#5fc4d8', '#10262c');
  txt(ctx, '点按钮或点赛道加速', f.x + 236, f.y + f.h - 62, 14, '#a9bcc4');
  hits.push({ x: f.x + 16, y: f.y + 52, w: f.w - 32, h: f.h - 108, action: { type: 'fire' } });
}

function drawStore(ctx, state, hits) {
  const f = windowFrame(ctx, '游戏库', hits, 780, 470, '#3b4654');
  for (let i = 0; i < 6; i++) {
    const x = f.x + 22 + (i % 3) * 246;
    const y = f.y + 56 + Math.floor(i / 3) * 180;
    fill(ctx, x, y, 226, 160, '#262c34', 8);
    fill(ctx, x, y, 226, 104, ['#3d5a6b', '#5a4a3c', '#3c5a4a', '#4a3c5a', '#5a5238', '#3d4a63'][i], 8);
    txt(ctx, String(i + 1).padStart(2, '0'), x + 16, y + 62, 34, '#f0dfba', 'left', 'bold', 'Georgia, serif');
    txt(ctx, ['远征', '夜城', '山脊', '旧世界', '星港', '回声'][i], x + 16, y + 138, 17, '#eee4d2');
    hits.push({ x, y, w: 226, h: 160, action: { type: 'detail', i } });
  }
  txt(ctx, '点一张封面看详情', f.x + 24, f.y + f.h - 22, 14, '#9aa0a8');
}

function drawSettings(ctx, state, hits) {
  const f = windowFrame(ctx, '设置', hits, 640, 430, '#4a4a4a');
  const keys = ['灯效', '高刷新率', '旧音效', '开机自启'];
  keys.forEach((label, i) => {
    const y = f.y + 66 + i * 76;
    fill(ctx, f.x + 24, y, f.w - 48, 62, '#2b2f35', 8);
    txt(ctx, label, f.x + 44, y + 40, 19, '#eee4d2');
    const on = state.toggles[i];
    fill(ctx, f.x + f.w - 130, y + 14, 92, 34, on ? '#7fb08a' : '#54585e', 17);
    fill(ctx, f.x + f.w - 130 + (on ? 58 : 4), y + 18, 26, 26, '#f2ead8', 13);
    hits.push({ x: f.x + f.w - 130, y: y + 14, w: 92, h: 34, action: { type: 'switch', i } });
  });
  txt(ctx, '开关只是习惯，房间从来不是靠灯变新的。', f.x + 24, f.y + f.h - 22, 14, '#9aa0a8');
}

function drawShots(ctx, state, hits) {
  const f = windowFrame(ctx, '截图 / 录像', hits, 720, 450, '#4a6b58');
  for (let i = 0; i < 4; i++) {
    const x = f.x + 22 + (i % 2) * 340;
    const y = f.y + 56 + Math.floor(i / 2) * 160;
    fill(ctx, x, y, 320, 140, '#252b31', 8);
    drawMiniGame(ctx, x + 8, y + 8, 304, 124, ['#3d5a6b', '#5a4a3c', '#3c5a4a', '#4a3c5a'][i]);
    hits.push({ x, y, w: 320, h: 140, action: { type: 'select', i } });
  }
  txt(ctx, `正在看第 ${state.selected + 1} 张 · 都是这间房`, f.x + 24, f.y + f.h - 22, 14, '#9fc4a8');
}

function drawSchedule(ctx, state, hits) {
  const f = windowFrame(ctx, '赛程表 · 2013', hits, 680, 430, '#3f6b9b');
  const rows = ['03.16  小组赛  21:00', '03.23  半决赛  20:30', '04.06  决赛    19:00', '04.07  网吧聚会  14:00'];
  rows.forEach((row, i) => {
    const y = f.y + 62 + i * 66;
    fill(ctx, f.x + 24, y, f.w - 48, 54, i % 2 ? '#27323c' : '#2e3b46', 6);
    txt(ctx, row, f.x + 44, y + 35, 18, '#e6eef4', 'left', '400', 'monospace');
  });
  button(ctx, f.x + f.w - 190, f.y + f.h - 58, 166, 38, state.reminder ? '已设提醒 ✓' : '设为提醒', hits, { type: 'toggle', k: 'reminder' }, '#5fc4d8', '#10262c');
}

function drawDownloads(ctx, state, hits) {
  const f = windowFrame(ctx, '下载中', hits, 660, 410, '#3c566b');
  const pct = state.download;
  fill(ctx, f.x + 30, f.y + 96, f.w - 60, 34, '#20272c', 8);
  fill(ctx, f.x + 30, f.y + 96, (f.w - 60) * (pct / 100), 34, '#5fc4d8', 8);
  txt(ctx, `补丁 1.4  ·  ${pct}%`, f.x + 34, f.y + 80, 19, '#e8f2f4', 'left', 'bold');
  txt(ctx, pct >= 100 ? '完成。可以开一局了。' : '56 kB/s · 剩余 12 分钟', f.x + 34, f.y + 166, 16, '#a9bcc4');
  button(ctx, f.x + 34, f.y + f.h - 74, 160, 40, state.paused ? '继续' : '暂停', hits, { type: 'toggle', k: 'paused' }, '#5fc4d8', '#10262c');
  button(ctx, f.x + 210, f.y + f.h - 74, 160, 40, '再下一点', hits, { type: 'download' }, '#3c566b', '#e8f2f4');
}

function drawStream(ctx, state, hits) {
  const f = windowFrame(ctx, '直播工作台', hits, 800, 480, '#1d4a46');
  fill(ctx, f.x + 20, f.y + 52, 520, 300, '#0d1518', 8);
  drawMiniGame(ctx, f.x + 32, f.y + 64, 496, 250, '#1a3a34');
  txt(ctx, state.live ? '● LIVE   00:42:18' : '○ 未开播', f.x + 36, f.y + 336, 18, state.live ? '#ff9a80' : '#8fa09c', 'left', 'bold');
  fill(ctx, f.x + 556, f.y + 52, 224, 300, '#101a1c', 8);
  txt(ctx, '聊天', f.x + 572, f.y + 80, 16, '#8fd8c8', 'left', 'bold');
  state.chat.slice(-8).forEach((msg, i) => {
    txt(ctx, msg, f.x + 572, f.y + 112 + i * 28, 13, '#c3cfc9');
  });
  txt(ctx, `观众 ${Math.floor(state.viewers)}`, f.x + 24, f.y + f.h - 26, 17, '#e8f2ee', 'left', 'bold');
  button(ctx, f.x + 180, f.y + f.h - 58, 160, 40, state.live ? '结束直播' : '开始直播', hits, { type: 'toggle', k: 'live' }, '#6fd4c0', '#10221f');
  button(ctx, f.x + 356, f.y + f.h - 58, 160, 40, '发条弹幕', hits, { type: 'chat' }, '#2c5a55', '#dff2ec');
  button(ctx, f.x + 532, f.y + f.h - 58, 160, 40, '点赞 +1', hits, { type: 'fire' }, '#2c5a55', '#dff2ec');
}

function drawFolder(ctx, state, hits) {
  const f = windowFrame(ctx, '2005', hits, 700, 440, '#7a5b3c');
  fill(ctx, f.x + 24, f.y + 56, f.w - 48, f.h - 118, '#2a2620', 8);
  icon(ctx, f.x + 52, f.y + 82, 'C', '那一关', '#3d6b96', hits, { type: 'view', v: 'retro' });
  icon(ctx, f.x + 52, f.y + 196, '▤', '旧截图', '#4a7b58', hits, { type: 'pickFile', label: '旧截图' });
  fill(ctx, f.x + 300, f.y + 84, 330, 230, '#f0e3bf', 4);
  txt(ctx, '别删。', f.x + 324, f.y + 128, 24, '#5d4a32', 'left', 'bold');
  txt(ctx, '2005 年夏天，第一次', f.x + 324, f.y + 168, 17, '#6c5940');
  txt(ctx, '通宵打完的那一关。', f.x + 324, f.y + 196, 17, '#6c5940');
  txt(ctx, '现在屏幕宽了，', f.x + 324, f.y + 240, 17, '#6c5940');
  txt(ctx, '人还是同一个人。', f.x + 324, f.y + 268, 17, '#6c5940');
  txt(ctx, state.message || '点「那一关」再打一次', f.x + 26, f.y + f.h - 24, 14, '#c3ad8c');
}

function drawTrash(ctx, hits) {
  const f = windowFrame(ctx, '回收站', hits, 560, 320, '#5a5f63');
  txt(ctx, '空的。', f.x + 40, f.y + 120, 34, '#ece2cd', 'left', 'bold');
  txt(ctx, '妈妈刚倒过，光盘盒还在纸箱里。', f.x + 40, f.y + 168, 17, '#a9b0b4');
}

export function createScreen() {
  const canvas = document.createElement('canvas');
  canvas.width = SCREEN_W;
  canvas.height = SCREEN_H;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const screen = {
    canvas, ctx, texture, hits: [], era: -1,
    state: freshState(),
  };
  return screen;
}

function freshState() {
  return {
    view: 'desktop', selected: 0, cells: [], score: 0, live: false,
    viewers: 128, chat: ['阿哲: 这房间眼熟', '小雨: 窗帘没换过！', '系统: 欢迎进来'],
    cooldowns: [0, 0, 0], toggles: [false, false, true, false],
    download: 34, paused: false, reminder: false, tick: 0,
    message: '', time: 0,
  };
}

export function setEra(screen, era) {
  if (screen.era === era) return;
  screen.era = era;
  screen.state = freshState();
  drawScreen(screen, era);
}

export function drawScreen(screen, era) {
  const { ctx, state } = screen;
  const hits = [];
  screen.hits = hits;
  ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
  drawDesktop(ctx, state, hits, era, THEMES[era]);

  switch (state.view) {
    case 'cs': drawFps(ctx, state, hits, 'CS 1.6 · de_dust', '#3d6b96', 0); break;
    case 'retro': drawFps(ctx, state, hits, '2005 · 还是这一关', '#7a5b3c', 5); break;
    case 'mines': drawMines(ctx, state, hits); break;
    case 'files': drawFiles(ctx, state, hits, era); break;
    case 'trash': drawTrash(ctx, hits); break;
    case 'library': drawLibrary(ctx, state, hits, 1); break;
    case 'racer': drawRacer(ctx, state, hits); break;
    case 'downloads': drawDownloads(ctx, state, hits); break;
    case 'client': drawClient(ctx, state, hits); break;
    case 'game': drawGame(ctx, state, hits); break;
    case 'schedule': drawSchedule(ctx, state, hits); break;
    case 'shots': drawShots(ctx, state, hits); break;
    case 'store': drawStore(ctx, state, hits); break;
    case 'detail': drawDetail(ctx, state, hits); break;
    case 'settings': drawSettings(ctx, state, hits); break;
    case 'stream': drawStream(ctx, state, hits); break;
    case 'folder': drawFolder(ctx, state, hits); break;
    default: break;
  }
  screen.texture.needsUpdate = true;
}

function applyAction(screen, action) {
  const s = screen.state;
  s.message = '';
  switch (action.type) {
    case 'close': s.view = 'desktop'; break;
    case 'view': s.view = action.v; break;
    case 'menu': s.message = ['我的文档里全是存档', '游戏都在 D 盘', '别动分辨率', '再打一局就关'][action.i]; s.view = 'desktop'; break;
    case 'fire': s.score += 1; break;
    case 'cell': {
      const i = action.i;
      s.cells[i] = true;
      if ((i * 5 + 3) % 11 === 0) {
        s.cells = [];
        s.message = '踩到了，重开一局。';
      }
      break;
    }
    case 'resetCells': s.cells = []; s.message = '新的一局。'; break;
    case 'select': s.selected = action.i; break;
    case 'detail': s.selected = action.i; s.view = 'detail'; break;
    case 'skill': s.cooldowns[action.i] = 5; s.message = '技能释放'; break;
    case 'ping': s.message = '小地图标记了一下'; break;
    case 'switch': s.toggles[action.i] = !s.toggles[action.i]; break;
    case 'toggle':
      if (action.k === 'live') {
        s.live = !s.live;
        s.message = s.live ? '开播了' : '下播了';
        s.chat.push(s.live ? '系统: 直播开始' : '系统: 直播结束');
      } else {
        s[action.k] = !s[action.k];
        s.message = action.k === 'paused' ? (s.paused ? '已暂停' : '继续下载') : (s.reminder ? '已设提醒' : '取消提醒');
      }
      break;
    case 'download': s.download = Math.min(100, s.download + 9); break;
    case 'chat': s.chat.push('我: 这间房二十年没变过朝向'); break;
    case 'pickFile': s.message = `${action.label} · 打开过了`; break;
    default: break;
  }
}

export function hitScreen(screen, era, u, v) {
  const x = u * SCREEN_W;
  const y = (1 - v) * SCREEN_H;
  for (let i = screen.hits.length - 1; i >= 0; i--) {
    const h = screen.hits[i];
    if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) {
      applyAction(screen, h.action);
      drawScreen(screen, era);
      return true;
    }
  }
  return false;
}

export function tickScreen(screen, era, dt) {
  const s = screen.state;
  const animated = ['cs', 'retro', 'racer', 'game', 'stream'].includes(s.view) || s.cooldowns.some((c) => c > 0) || (!s.paused && s.download < 100 && s.view === 'downloads');
  if (!animated) return false;
  s.time += dt;
  s.tick = Math.floor(s.time * 6);
  if (s.cooldowns.some((c) => c > 0)) s.cooldowns = s.cooldowns.map((c) => Math.max(0, c - dt));
  if (s.view === 'stream' && s.live) s.viewers += dt * 3;
  if (s.view === 'downloads' && !s.paused) s.download = Math.min(100, s.download + dt * 4);
  if (s.time - (screen.lastDraw || 0) < 0.14) return false;
  screen.lastDraw = s.time;
  drawScreen(screen, era);
  return true;
}

export function createSideScreenTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext('2d');
  fill(ctx, 0, 0, 512, 320, '#101a20');
  fill(ctx, 0, 0, 512, 34, '#1b3038');
  txt(ctx, '性能 / 聊天', 14, 23, 15, '#8fd8c8');
  txt(ctx, '60 FPS', 498, 23, 14, '#c8ded8', 'right', 'bold', 'monospace');
  const rows = ['CPU  38%', 'GPU  61%', 'PING  12ms', '在线  4 人'];
  rows.forEach((r, i) => {
    fill(ctx, 14, 50 + i * 42, 484, 32, i % 2 ? '#15242b' : '#182a31', 5);
    txt(ctx, r, 26, 72 + i * 42, 15, '#b9cec8', 'left', '400', 'monospace');
    fill(ctx, 330, 64 + i * 42, 150 * (0.3 + i * 0.16), 6, i === 1 ? '#e0a869' : '#5fae9a', 3);
  });
  for (let x = 14; x < 498; x += 8) {
    const h = 10 + Math.abs(Math.sin(x * 0.06)) * 22;
    fill(ctx, x, 250 - h, 4, h * 2, 'rgba(111,212,192,0.35)', 2);
  }
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
