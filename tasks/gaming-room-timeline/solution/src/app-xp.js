// 2005: blue taskbar, green hill, Minesweeper and a music player.
// Every app is fn(s, st, t): s = Screens (helpers, logical size s.W x s.H), st = per-era state, t = seconds.
import { drawCover } from './keepsakes.js';

const NUM = ['', '#1a3fd0', '#1f8a2a', '#d02a2a', '#1a1a80', '#801a1a', '#1a8080', '#222', '#666'];

export function minesWindow(s, x, y, title = '扫雷', cell = 30) {
  const M = s.mines, n = M.n, w = n * cell + 24, h = n * cell + 96;
  s.win(x, y, w, h, title, '#2a5bd7', '#c0c0c0');
  s.rect(x + 12, y + 34, w - 24, 40, '#a8a8a8');
  const led = (lx, v) => {
    s.rect(lx, y + 40, 54, 28, '#200');
    s.text(String(v).padStart(3, '0'), lx + 27, y + 55, 22, '#f33', 'center', 'bold');
  };
  led(x + 18, M.count);
  led(x + w - 72, M.opened);
  const face = M.status === 'lost' ? '×_×' : M.status === 'won' ? '^o^' : '·‿·';
  s.btn(x + w / 2 - 24, y + 38, 48, 32, face, () => M.reset(), '#e8e0a0', '#222', 16);
  M.cells.forEach((c, i) => {
    const cx = x + 12 + (i % n) * cell, cy = y + 84 + ((i / n) | 0) * cell;
    const show = c.open || (M.status === 'lost' && c.mine);
    s.rect(cx, cy, cell, cell, '#808080');
    s.rect(cx + 1, cy + 1, cell - 2, cell - 2, show ? (c.mine ? '#e05a4a' : '#cfcfcf') : '#f4f4f4');
    if (!show) s.rect(cx + 3, cy + 3, cell - 4, cell - 4, '#bdbdbd');
    else if (c.mine) s.text('●', cx + cell / 2, cy + cell / 2, cell * 0.6, '#222', 'center');
    else if (c.near) s.text(c.near, cx + cell / 2, cy + cell / 2 + 1, cell * 0.62, NUM[c.near], 'center', 'bold');
    s.hit(cx, cy, cell, cell, () => M.reveal(i));
  });
}

export function xp(s, st, t) {
  const { W, H, g } = s;
  if (st.off) {
    s.rect(0, 0, W, H, '#000');
    s.text('现在可以安全地关闭计算机了。', W / 2, H / 2, 26, '#e08a2a', 'center');
    s.text('（点击屏幕重新开机）', W / 2, H / 2 + 44, 16, '#8a5a2a', 'center');
    return s.hit(0, 0, W, H, () => (st.off = false));
  }
  st.mines ??= true;
  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#2a6fd6');
  sky.addColorStop(0.65, '#a8d0f5');
  s.rect(0, 0, W, H, sky);
  for (const [cx, cy, rx, col] of [[0.3, 1.08, 0.8, '#5aa02c'], [0.9, 1.12, 0.6, '#6fb53a']]) {
    g.fillStyle = col;
    g.beginPath();
    g.ellipse(W * cx, H * cy, W * rx, H * 0.42, 0, 0, 7);
    g.fill();
  }

  const icons = [['我的电脑', '#d9d1bc'], ['扫雷', '#8a8a8a', 'mines'], ['音乐盒', '#e8b04a', 'music'], ['剑与远方', '#b0528a', 'game']];
  icons.forEach(([name, col, key], i) => {
    const y = 22 + i * 92;
    s.rect(34, y, 44, 44, col, 6);
    s.text(name, 56, y + 60, 14, '#fff', 'center');
    if (key) s.hit(14, y - 6, 86, 84, () => (st[key] = !st[key]));
  });

  if (st.game) {
    const x = W - 300, y = 230;
    s.win(x, y, 270, 300, '剑与远方');
    g.save();
    g.translate(x + 10, y + 34);
    drawCover(g, 250, 200, false);
    g.restore();
    s.text('请插入光盘 2，然后按“确定”', x + 135, y + 252, 14, '#222', 'center');
    s.btn(x + 95, y + 266, 80, 26, '确定', () => (st.game = false), '#e9e3d6', '#222', 14);
  }
  if (st.music) {
    const x = W - 300, y = 40;
    s.win(x, y, 270, 170, '音乐盒', '#3a3a3a', '#1c1c1c');
    for (let i = 0; i < 18; i++) {
      const bar = st.play ? 8 + Math.abs(Math.sin(t * 4 + i * 1.3)) * 60 : 5;
      s.rect(x + 16 + i * 13.5, y + 110 - bar, 10, bar, '#57d36a');
    }
    s.text(st.play ? '♪ 那些花儿.mp3' : '已暂停', x + 16, y + 132, 14, '#9fe0a8');
    s.btn(x + 180, y + 120, 74, 28, st.play ? '暂停' : '播放', () => (st.play = !st.play), '#57d36a', '#111', 14);
  }
  if (st.mines) minesWindow(s, 130, 40);

  if (st.menu) {
    const y = H - 34 - 190;
    s.rect(0, y, 220, 190, '#f4f4f0');
    s.rect(0, y, 220, 40, '#245edb');
    s.hit(0, y, 220, 190, () => {});
    s.text('我', 14, y + 20, 17, '#fff', 'left', 'bold');
    ['我的文档', '所有程序 ▶', '控制面板'].forEach((m, i) => s.text(m, 16, y + 62 + i * 30, 15, '#222'));
    s.btn(112, y + 152, 96, 28, '关闭计算机', () => Object.assign(st, { off: true, menu: false }), '#d9534f', '#fff', 14);
  }
  s.rect(0, H - 34, W, 34, '#245edb');
  s.btn(0, H - 34, 100, 34, '开始', () => (st.menu = !st.menu), '#3c9a3c', '#fff', 18, 0);
  s.text('21:47', W - 14, H - 17, 14, '#fff', 'right');
}
