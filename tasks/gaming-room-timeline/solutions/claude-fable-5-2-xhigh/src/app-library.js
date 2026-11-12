// 2012: the library goes digital. Pick a game, launch it, accept an invite.
const GAMES = [
  ['符文峡谷', '#1a5a6a', '#d9b44a', 1840],
  ['像素方块', '#4a7a3a', '#c9a26a', 312],
  ['天际旅人', '#4a5a7a', '#c9d3de', 207],
  ['传送实验室', '#3a3a3a', '#e8a04a', 19],
  ['文明纪元', '#6a4a2a', '#e8d9a0', 466],
];
const FRIENDS = [['老周', '符文峡谷 · 选人中', '#57d36a'], ['阿凯', '在线', '#5ab0e8'], ['大鹏', '离开', '#e8b04a'], ['小满', '离线', '#667']];

export function library(s, st, t) {
  const { W, H, g } = s;
  st.sel ??= 0;
  s.rect(0, 0, W, H, '#1b2838');
  s.rect(0, 0, W, 40, '#171a21');
  ['商店', '库', '社区', '我'].forEach((m, i) => s.text(m, 24 + i * 70, 21, 16, i === 1 ? '#fff' : '#8a9bb0', 'left', i === 1 ? 'bold' : ''));

  s.rect(0, 40, 240, H - 40, '#202a3a');
  s.text('游戏（5）', 16, 62, 13, '#8a9bb0');
  GAMES.forEach(([name, a], i) => {
    const y = 80 + i * 48;
    if (i === st.sel) s.rect(0, y, 240, 44, '#3d5a80');
    s.rect(12, y + 6, 32, 32, a, 4);
    s.text(name, 54, y + 22, 15, st.run === i ? '#9fe08a' : '#dfe8f5');
    s.hit(0, y, 240, 44, () => (st.sel = i));
  });

  const [name, a, b, hours] = GAMES[st.sel], x = 256, w = W - x - 236, running = st.run === st.sel;
  const ban = g.createLinearGradient(x, 0, x + w, 0);
  ban.addColorStop(0, a);
  ban.addColorStop(1, '#0e1620');
  s.rect(x, 56, w, 230, ban, 6);
  s.text(name, x + 24, 120, 40, b, 'left', 'bold');
  if (running) {
    // toy minimap: three lanes, dots marching
    const mx = x + w - 190, my = 76;
    s.rect(mx, my, 170, 170, '#16301f', 4);
    g.strokeStyle = '#3a5a40';
    g.lineWidth = 8;
    g.strokeRect(mx + 14, my + 14, 142, 142);
    g.beginPath();
    g.moveTo(mx + 14, my + 156);
    g.lineTo(mx + 156, my + 14);
    g.stroke();
    for (let i = 0; i < 6; i++) {
      const k = (t * 0.12 + i / 6) % 1;
      s.rect(mx + 10 + k * 142, my + 152 - k * 142, 8, 8, i % 2 ? '#e05a4a' : '#5ab0e8', 4);
    }
    s.text('对局进行中', x + 24, 170, 16, '#9fe08a');
  }
  s.btn(x + 24, 216, 150, 46, running ? '停止' : '开始游戏', () => {
    st.run = running ? null : st.sel;
    st.runT = s.t;
  }, running ? '#8a3a3a' : '#5c9a2a', '#fff', 19, 4);
  const played = hours + (running ? Math.floor((t - st.runT) / 3) : 0);
  s.text(`总时数  ${played} 小时`, x, 318, 16, '#dfe8f5');
  s.text('成就', x, 356, 14, '#8a9bb0');
  s.rect(x + 50, 350, w - 60, 12, '#2a3a50', 6);
  s.rect(x + 50, 350, (w - 60) * (0.25 + st.sel * 0.14), 12, '#5ab0e8', 6);
  s.text('最近：和室友五排到凌晨三点', x, 396, 14, '#8a9bb0');

  const fx = W - 220;
  s.rect(fx, 40, 220, H - 40, '#18202c');
  s.text('好友', fx + 14, 62, 13, '#8a9bb0');
  FRIENDS.forEach(([n, status, col], i) => {
    s.rect(fx + 14, 84 + i * 46, 30, 30, col, 15);
    s.text(n, fx + 54, 92 + i * 46, 14, '#dfe8f5');
    s.text(status, fx + 54, 110 + i * 46, 12, '#8a9bb0');
  });

  s.rect(fx - 110, H - 110, 320, 96, '#2a3f5a', 6);
  s.hit(fx - 110, H - 110, 320, 96, () => {});
  if (st.invite) s.text(st.invite, fx - 94, H - 62, 15, '#9fe08a');
  else {
    s.text('老周 邀请你加入《符文峡谷》', fx - 94, H - 84, 15, '#fff');
    s.btn(fx - 94, H - 58, 100, 32, '接受', () => (st.invite = '已加入老周的队伍（2/5）'), '#5c9a2a', '#fff', 15);
    s.btn(fx + 20, H - 58, 100, 32, '稍后', () => (st.invite = '已回复：这把打完就来'), '#3d5a80', '#dfe8f5', 15);
  }
}
