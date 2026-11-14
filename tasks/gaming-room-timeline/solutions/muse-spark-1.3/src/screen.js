// Era screen painter + one tiny playable breakout game. Canvas 512x320, no assets.
export const ERA_GAMES = ['反恐精英 1.6', '魔兽世界', '英雄联盟', '绝地求生', '艾尔登法环', '怪物猎人：荒野'];
const WALL = [
  ['#3a6ea5', '#7db35c'], ['#1c3f6e', '#7fb2d9'], ['#0e7c7b', '#17a398'],
  ['#232a3a', '#3b4a6b'], ['#1b1e26', '#2e3440'], ['#141821', '#232b3d'],
];
const BAR = ['#245edb', '#1c1c1c', '#0072c6', '#101318', '#2b2f3a', '#0c0e14'];

export function createScreenEngine(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const S = {
    era: 0, mode: 'desk', score: 0, lives: 3,
    paddleX: W / 2, ball: null, bricks: [], launched: false, over: false,
  };

  function wallpaper(e) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, WALL[e][1]); g.addColorStop(1, WALL[e][0]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.16)';
    ctx.beginPath(); ctx.ellipse(W * .72, H * .38, 90, 46, -.2, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(W * .3, H * .7, 110, 40, .15, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    ctx.beginPath(); ctx.ellipse(W * .5, H * 1.02, W * .75, 60, 0, 0, 7); ctx.fill();
  }

  function taskbar(e, label) {
    ctx.fillStyle = BAR[e]; ctx.fillRect(0, H - 26, W, 26);
    ctx.fillStyle = e === 0 ? '#3d8a3d' : '#3fae5a';
    ctx.fillRect(0, H - 26, 84, 26);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(e === 0 ? '◉ 开始' : '◉', 10, H - 9);
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '11px sans-serif';
    ctx.fillText(label, 96, H - 10);
    ctx.fillText('21:37', W - 44, H - 10);
  }

  function icons(list) {
    ctx.font = '11px sans-serif';
    list.forEach((t, i) => {
      const x = 14 + i * 62;
      ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(x, 12, 34, 34);
      ctx.fillStyle = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad'][i % 4];
      ctx.fillRect(x, 12, 34, 10);
      ctx.fillStyle = '#fff'; ctx.fillText(t, x - 4, 60);
    });
  }

  function window_(title, lines, wide) {
    const w = wide || 300, h = 26 + lines.length * 18 + 12;
    const x = (W - w) / 2, y = 66;
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x + 4, y + 5, w, h);
    ctx.fillStyle = '#f4f1ea'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#2d3a55'; ctx.fillRect(x, y, w, 24);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(title, x + 10, y + 16);
    ctx.font = '12px monospace'; ctx.fillStyle = '#333';
    lines.forEach((l, i) => ctx.fillText(l, x + 12, y + 44 + i * 18));
  }

  const DESKS = [
    () => { icons(['我的电脑', 'CS1.6', 'MP3', '宽带连接']);
      window_('CS 1.6 — 服务器列表', ['> [电信] 高校联盟 … 32/32', '> [网通] 网吧 107 … 18/32', '  de_dust2  等待加入…', '双击进入 · 延迟 48ms']); },
    () => { icons(['计算机', 'WOW', 'QQ', '迅雷']);
      window_('魔兽世界 — 排队', ['服务器：暗影之眼', '排队位置  47 / 1200', '预计等待  1:23:05', '室友：帮我带份炒饭 ↑']); },
    () => { icons(['Steam', 'LOL', 'YY语音', '文件夹']);
      window_('英雄联盟 — 客户端', ['单双排 … 钻石Ⅱ  62胜点', '好友：开黑吗 (4)', '战绩 8/2/11  MVP ✓']); },
    () => { icons(['Steam', '吃鸡', 'Discord', 'OBS']);
      window_('绝地求生 — 大厅', ['大吉大利，今晚吃鸡', '四排缺一 · 段位铂金', '今晚 8 点开播 →']); },
    () => { icons(['Steam', '法环', 'B站', '剪映']);
      window_('游戏库 — 本周', ['艾尔登法环 … 112h ♥', '周末联机：约了大学室友', '录像：女武神第三天 ✓']); },
    () => { icons(['Steam', '荒野', '相册', '云存档']);
      window_('怪物猎人：荒野', ['HR 87 · 太刀毕业装 ✓', '今晚固定队 9 点集合', '旧存档 2005—2025 全部保留']); },
  ];

  function resetGame() {
    S.score = 0; S.lives = 3; S.launched = false; S.over = false;
    S.bricks = [];
    const cols = 8, rows = 3 + Math.min(S.era, 3);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        S.bricks.push({ x: 30 + c * 57, y: 44 + r * 24, hp: 1 });
    S.ball = { x: W / 2, y: H - 70, vx: 2.6, vy: -3.1 };
  }

  function paintGame() {
    ctx.fillStyle = '#0b0e16'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#8b93a8'; ctx.font = '12px sans-serif';
    ctx.fillText(`${ERA_GAMES[S.era]} · 休息一下`, 16, 22);
    ctx.fillStyle = '#ffb35c'; ctx.fillText(`分 ${S.score}   命 ${'●'.repeat(S.lives)}`, W - 130, 22);
    const pal = ['#e05252', '#e0a052', '#7bc96f', '#5aa9e6', '#b388eb', '#64dfdf'];
    S.bricks.forEach(b => {
      ctx.fillStyle = pal[(b.y / 24 | 0) % pal.length];
      ctx.fillRect(b.x, b.y, 49, 16);
    });
    ctx.fillStyle = '#f5e8d5';
    const pw = 76;
    ctx.fillRect(S.paddleX - pw / 2, H - 44, pw, 10);
    ctx.fillStyle = '#ffb35c';
    ctx.beginPath(); ctx.arc(S.ball.x, S.ball.y, 6, 0, 7); ctx.fill();
    if (!S.launched) {
      ctx.fillStyle = '#c9b69a'; ctx.font = '13px sans-serif';
      ctx.fillText('空格 / 点击发射 · ← → 移动', W / 2 - 105, H / 2 + 40);
    }
    if (S.over) {
      ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ffb35c'; ctx.font = 'bold 22px sans-serif';
      ctx.fillText(S.bricks.length === 0 ? '通关！早点休息' : '别灰心，再来一局', W / 2 - 110, H / 2);
      ctx.fillStyle = '#fff'; ctx.font = '13px sans-serif';
      ctx.fillText('按空格重开 · 点击屏幕回桌面', W / 2 - 105, H / 2 + 26);
    }
  }

  function stepGame(dt) {
    if (S.mode !== 'game' || S.over) return;
    if (!S.launched) { S.ball.x = S.paddleX; S.ball.y = H - 56; return; }
    const v = Math.min(dt, .033) * 60;
    S.ball.x += S.ball.vx * v; S.ball.y += S.ball.vy * v;
    if (S.ball.x < 8 || S.ball.x > W - 8) S.ball.vx *= -1;
    if (S.ball.y < 30) S.ball.vy *= -1;
    const pw = 76;
    if (S.ball.y > H - 56 && S.ball.y < H - 40 && Math.abs(S.ball.x - S.paddleX) < pw / 2) {
      S.ball.vy = -Math.abs(S.ball.vy);
      S.ball.vx = (S.ball.x - S.paddleX) / (pw / 2) * 3.2;
    }
    for (let i = S.bricks.length - 1; i >= 0; i--) {
      const b = S.bricks[i];
      if (S.ball.x > b.x - 6 && S.ball.x < b.x + 55 && S.ball.y > b.y - 6 && S.ball.y < b.y + 22) {
        S.bricks.splice(i, 1); S.ball.vy *= -1; S.score += 10;
      }
    }
    if (S.bricks.length === 0) { S.over = true; return; }
    if (S.ball.y > H - 6) {
      S.lives--;
      if (S.lives <= 0) S.over = true;
      else { S.launched = false; }
    }
  }

  function paint() {
    if (S.mode === 'game') paintGame();
    else {
      wallpaper(S.era);
      DESKS[S.era]();
      taskbar(S.era, ERA_GAMES[S.era]);
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.font = '11px sans-serif';
      ctx.fillText('◉ 点击屏幕玩一局小游戏', W - 168, 18);
    }
  }

  resetGame();
  paint();
  return {
    state: S,
    setEra(e) { if (e !== S.era) { S.era = e; if (S.mode === 'game') resetGame(); paint(); } },
    toggle() { S.mode = S.mode === 'desk' ? 'game' : 'desk'; if (S.mode === 'game') resetGame(); paint(); },
    movePaddle(clientX, rect) {
      const r = (clientX - rect.left) / rect.width;
      S.paddleX = Math.max(40, Math.min(W - 40, r * W));
    },
    nudge(dir) { S.paddleX = Math.max(40, Math.min(W - 40, S.paddleX + dir * 26)); },
    launch() {
      if (S.mode !== 'game') return;
      if (S.over) { resetGame(); paint(); return; }
      S.launched = true;
    },
    frame(dt) { stepGame(dt); paint(); },
  };
}

// Static side/vertical monitor content, painted once per era.
export function paintSide(canvas, era) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = ['#dfe9f2', '#10151d', '#0d1117', '#141a26', '#0c0f16', '#0a0d14'][era];
  ctx.fillRect(0, 0, W, H);
  ctx.font = '11px monospace';
  const pal = ['#335', '#7fd4ff', '#58d68d', '#9fb4ff', '#7fe0d0', '#ffc46b'];
  ctx.fillStyle = pal[era];
  const lines = [
    ['C:\\> ping 202.11.22.1', 'Reply … 48ms  52ms  47ms', 'de_dust2  800x600 ✓', 'MP3: 周杰伦 · 七里香'],
    ['YY 3312XX  上麦！', 'DKP +50  TAQ ✓', '迅雷下载  87% …', '19:00 开荒别迟到'],
    ['[弹幕] 6666666', '排位连胜 +3', '开黑 4=1  来AD', '周末网吧赛报名✓'],
    ['直播间 人气 12,304', '[房管] 房管威武', '吃鸡率 31% ↑', '感谢“室友”的火箭'],
    ['渲染 68% ██████▌', '周更视频剪辑中…', '联机三年 · 全成就✓', '云存档同步完成'],
    ['固定队 4/4 在线', '行李箱收好 · 搬家✓', '二十年存档 186GB', '晚安，明天继续'],
  ][era];
  lines.forEach((l, i) => ctx.fillText(l, 10, 24 + i * 20));
}
