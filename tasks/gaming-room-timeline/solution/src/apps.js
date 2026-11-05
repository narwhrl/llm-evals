import { FONT } from './textures.js';

export function txt(g, s, x, y, size, color, o = {}) {
  g.font = `${o.bold ? 'bold ' : ''}${size}px ${o.font ?? FONT}`;
  g.fillStyle = color;
  g.textAlign = o.align ?? 'left';
  g.textBaseline = 'middle';
  g.fillText(s, x, y);
}
export function rr(g, x, y, w, h, r, fill, stroke) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (stroke) { g.strokeStyle = stroke; g.lineWidth = 1; g.stroke(); }
}
export function grad(g, x0, y0, x1, y1, stops) {
  const gr = g.createLinearGradient(x0, y0, x1, y1);
  stops.forEach((c, i) => gr.addColorStop(i / (stops.length - 1), c));
  return gr;
}
function bevel(g, x, y, w, h, up) {
  g.fillStyle = '#c0c0c0'; g.fillRect(x, y, w, h);
  g.fillStyle = up ? '#fff' : '#808080'; g.fillRect(x, y, w, 2); g.fillRect(x, y, 2, h);
  g.fillStyle = up ? '#808080' : '#fff'; g.fillRect(x, y + h - 2, w, 2); g.fillRect(x + w - 2, y, 2, h);
}
export const inside = (x, y, bx, by, bw, bh) => x >= bx && x <= bx + bw && y >= by && y <= by + bh;
function avatar(g, x, y, r, col, label) {
  g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  txt(g, label[0], x, y + 1, r, '#fff', { bold: true, align: 'center' });
}
function button(g, x, y, w, h, label, bg, fg = '#fff', r = 4) {
  rr(g, x, y, w, h, r, bg);
  txt(g, label, x + w / 2, y + h / 2, 13, fg, { align: 'center', bold: true });
}
const FRIENDS = [['阿伟', '#d9534f'], ['胖子', '#e09a3e'], ['小林', '#4fa35a']];

// ---------- 2005 ----------

export function mines() {
  const N = 9, MINES = 10, CS = 18, GX = 8, GY = 44;
  let cells, state;
  const reset = () => { cells = Array.from({ length: N * N }, () => ({ mine: false, open: false, flag: false, n: 0 })); state = 'ready'; };
  const around = (i) => {
    const r = Math.floor(i / N), c = i % N, out = [];
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      const rr2 = r + dr, cc = c + dc;
      if ((dr || dc) && rr2 >= 0 && rr2 < N && cc >= 0 && cc < N) out.push(rr2 * N + cc);
    }
    return out;
  };
  const place = (safe) => {
    let k = 0;
    while (k < MINES) {
      const i = Math.floor(Math.random() * N * N);
      if (i === safe || cells[i].mine) continue;
      cells[i].mine = true;
      k++;
    }
    cells.forEach((c, i) => (c.n = around(i).filter((j) => cells[j].mine).length));
  };
  const flood = (start) => {
    const todo = [start];
    while (todo.length) {
      const i = todo.pop(), c = cells[i];
      if (c.open || c.flag) continue;
      c.open = true;
      if (c.n === 0) todo.push(...around(i));
    }
  };
  reset();
  const W = N * CS + GX * 2, HH = N * CS + GY + 8, face = [W / 2 - 12, 10, 24, 24];
  const NUM = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000', '#808080'];
  return {
    title: '扫雷', w: W, h: HH,
    draw(g) {
      g.fillStyle = '#c0c0c0'; g.fillRect(0, 0, W, HH);
      bevel(g, 5, 5, W - 10, 34, false);
      g.fillStyle = '#000'; g.fillRect(11, 12, 40, 20); g.fillRect(W - 51, 12, 40, 20);
      const flags = cells.filter((c) => c.flag).length;
      txt(g, String(MINES - flags).padStart(3, '0'), 31, 23, 17, '#ff2a1a', { bold: true, align: 'center', font: 'Consolas, monospace' });
      const left = cells.filter((c) => !c.mine && !c.open).length;
      txt(g, String(N * N - MINES - left).padStart(3, '0'), W - 31, 23, 17, '#ff2a1a', { bold: true, align: 'center', font: 'Consolas, monospace' });
      bevel(g, ...face, true);
      g.fillStyle = '#ffeb3b'; g.beginPath(); g.arc(W / 2, 22, 9, 0, 7); g.fill();
      g.strokeStyle = '#000'; g.lineWidth = 1.2; g.stroke();
      g.fillStyle = '#000';
      if (state === 'lost') { txt(g, 'x x', W / 2, 20, 8, '#000', { align: 'center', bold: true }); }
      else if (state === 'won') { g.fillRect(W / 2 - 7, 18, 14, 4); }
      else { g.fillRect(W / 2 - 4, 19, 2, 2); g.fillRect(W / 2 + 2, 19, 2, 2); }
      g.beginPath();
      if (state === 'lost') g.arc(W / 2, 29, 4, Math.PI, 0); else g.arc(W / 2, 23, 4, 0.2, Math.PI - 0.2);
      g.stroke();
      cells.forEach((c, i) => {
        const x = GX + (i % N) * CS, y = GY + Math.floor(i / N) * CS;
        if (!c.open) {
          bevel(g, x, y, CS, CS, true);
          if (c.flag) {
            g.fillStyle = '#f00'; g.beginPath(); g.moveTo(x + 6, y + 4); g.lineTo(x + 13, y + 7); g.lineTo(x + 6, y + 10); g.fill();
            g.fillStyle = '#000'; g.fillRect(x + 6, y + 4, 1.5, 10); g.fillRect(x + 4, y + 13, 9, 2);
          }
          return;
        }
        g.fillStyle = c.boom ? '#f00' : '#c0c0c0'; g.fillRect(x, y, CS, CS);
        g.strokeStyle = '#808080'; g.lineWidth = 0.6; g.strokeRect(x + 0.3, y + 0.3, CS - 0.6, CS - 0.6);
        if (c.mine) { g.fillStyle = '#000'; g.beginPath(); g.arc(x + CS / 2, y + CS / 2, 5, 0, 7); g.fill(); }
        else if (c.n) txt(g, `${c.n}`, x + CS / 2, y + CS / 2 + 1, 13, NUM[c.n], { bold: true, align: 'center', font: 'Arial' });
      });
    },
    click(x, y, btn) {
      if (inside(x, y, ...face)) return reset();
      const c = Math.floor((x - GX) / CS), r = Math.floor((y - GY) / CS);
      if (c < 0 || c >= N || r < 0 || r >= N || state === 'lost' || state === 'won') return;
      const i = r * N + c, cell = cells[i];
      if (btn === 2) { if (!cell.open) cell.flag = !cell.flag; return; }
      if (cell.flag || cell.open) return;
      if (state === 'ready') { place(i); state = 'play'; }
      if (cell.mine) {
        state = 'lost';
        cell.boom = true;
        cells.forEach((m) => { if (m.mine) m.open = true; });
        return;
      }
      flood(i);
      if (!cells.some((m) => !m.mine && !m.open)) state = 'won';
    },
  };
}

export function qq() {
  const B = [
    ['阿伟', '#d9534f', '今晚 CS？', '明天上午网吧，五块钱三小时！'],
    ['胖子', '#e09a3e', '网吧见', '我带了新刻的光盘，里面有魔兽地图。'],
    ['小林', '#4fa35a', '写作业中……', '数学第 35 页第三题你会吗？'],
    ['表哥', '#3e7cc4', '[离开] 打球去了', '你那块显卡要不要换？我有块旧的。'],
  ];
  let sel = -1;
  const W = 176, HH = 330;
  return {
    title: 'QQ2005', w: W, h: HH,
    draw(g) {
      g.fillStyle = '#eaf3fd'; g.fillRect(0, 0, W, HH);
      g.fillStyle = grad(g, 0, 0, 0, 56, ['#bfe0ff', '#7db7f0']); g.fillRect(0, 0, W, 56);
      g.fillStyle = '#111'; g.beginPath(); g.ellipse(26, 30, 13, 16, 0, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.ellipse(26, 34, 8, 11, 0, 0, 7); g.fill();
      g.fillStyle = '#f5a623'; g.beginPath(); g.moveTo(22, 24); g.lineTo(30, 24); g.lineTo(26, 28); g.fill();
      txt(g, '屿  (在线)', 48, 22, 13, '#123', { bold: true });
      txt(g, '期末考完啦！', 48, 40, 11, '#345');
      txt(g, '▼ 我的好友 (3/4)', 8, 70, 12, '#246');
      B.forEach(([name, col, sig], i) => {
        const y = 82 + i * 38;
        if (sel === i) { g.fillStyle = '#cfe4fb'; g.fillRect(2, y, W - 4, 36); }
        avatar(g, 22, y + 18, 13, i === 3 ? '#9aa5b1' : col, name);
        txt(g, name, 44, y + 11, 13, i === 3 ? '#777' : '#111', { bold: true });
        txt(g, sig, 44, y + 27, 11, '#678');
      });
      if (sel >= 0) {
        const [name, col, , msg] = B[sel];
        rr(g, 6, HH - 104, W - 12, 96, 6, '#fff', '#9cc3ea');
        txt(g, `${name}  21:3${sel}`, 14, HH - 90, 11, col, { bold: true });
        const words = [...msg];
        for (let l = 0; l < 3; l++) txt(g, words.slice(l * 12, l * 12 + 12).join(''), 14, HH - 70 + l * 18, 12, '#222');
      } else txt(g, '点一下好友，看看留言', W / 2, HH - 50, 11, '#89a', { align: 'center' });
    },
    click(x, y) {
      const i = Math.floor((y - 82) / 38);
      if (i >= 0 && i < B.length) sel = i;
    },
  };
}

export function note() {
  const lines = ['数学：练习册 P35—36', '英语：背 Unit 3 单词，明天听写', '', '周六上午 网吧 —— 阿伟 胖子 小林', '带上光盘包！', '', '妈妈说：十点前必须关机'];
  return {
    title: '作业.txt - 记事本', w: 300, h: 190,
    draw(g, w, h) {
      g.fillStyle = '#ece9d8'; g.fillRect(0, 0, w, 20);
      txt(g, '文件(F)  编辑(E)  格式(O)  帮助(H)', 6, 10, 11, '#000');
      g.fillStyle = '#fff'; g.fillRect(0, 20, w, h - 20);
      lines.forEach((l, i) => txt(g, l, 8, 34 + i * 20, 13, '#111', { font: `"SimSun", ${FONT}` }));
      if (Math.floor(performance.now() / 500) % 2) { g.fillStyle = '#000'; g.fillRect(8 + 13 * 11, 26 + 6 * 20, 1.5, 16); }
    },
    animated: () => true,
    click() {},
  };
}

export function computer() {
  const drives = [['本地磁盘 (C:)', '3.2 GB 可用，共 20 GB', 0.84], ['本地磁盘 (D:)', '游戏 · 存档 · 电影', 0.62], ['DVD 驱动器 (E:)', '仙剑奇侠传', 1]];
  return {
    title: '我的电脑', w: 320, h: 180,
    draw(g, w, h) {
      g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
      g.fillStyle = grad(g, 0, 0, 0, h, ['#7aa1e6', '#6375d6']); g.fillRect(0, 0, 90, h);
      txt(g, '系统任务', 10, 20, 12, '#fff', { bold: true });
      txt(g, '查看系统信息', 10, 42, 11, '#e8efff');
      drives.forEach(([n, d, f], i) => {
        const y = 22 + i * 52;
        rr(g, 102, y, 34, 26, 3, '#d8d8d8', '#888');
        txt(g, n, 146, y + 6, 12, '#000', { bold: true });
        txt(g, d, 146, y + 22, 11, '#555');
        if (f < 1) { g.fillStyle = '#ddd'; g.fillRect(146, y + 32, 150, 6); g.fillStyle = '#2a8cf0'; g.fillRect(146, y + 32, 150 * f, 6); }
      });
    },
    click() {},
  };
}

// ---------- 2008 ----------

export function lobby() {
  const rooms = [['DotA 6.59 新手勿进', 7], ['澄海 3C 娱乐', 5], ['DotA 路人 速来', 9], ['守卫剑阁', 3], ['真三国无双 4.5', 6]];
  let joined = null;
  const W = 380, HH = 260;
  return {
    title: '对战平台 - 大厅', w: W, h: HH,
    animated: () => joined && performance.now() - joined.at < 9000,
    draw(g) {
      const now = performance.now();
      g.fillStyle = '#1b2a3a'; g.fillRect(0, 0, W, HH);
      g.fillStyle = grad(g, 0, 0, W, 0, ['#2a5d8f', '#1b3554']); g.fillRect(0, 0, W, 30);
      txt(g, '魔兽争霸 III · 冰封王座  |  积分 1350  |  在线 128,402', 10, 15, 12, '#e3eefa');
      if (!joined) {
        rooms.forEach(([name, n], i) => {
          const y = 40 + i * 42;
          rr(g, 8, y, W - 16, 36, 4, i % 2 ? '#22364b' : '#263e56');
          txt(g, name, 18, y + 18, 13, '#fff', { bold: true });
          txt(g, `${n}/10`, W - 120, y + 18, 12, n >= 9 ? '#ffb84d' : '#9fc3e6');
          button(g, W - 72, y + 7, 56, 22, '加入', '#3d8b3d');
        });
        return;
      }
      const dt = now - joined.at;
      const count = Math.min(10, joined.n + Math.floor(dt / 450));
      txt(g, `房间：${joined.name}`, 12, 46, 14, '#ffd27a', { bold: true });
      const names = ['屿', '阿伟', '胖子', '小林', 'DK丶夜', '火影迷', '老王', 'Sky', '学霸', '冰'];
      for (let k = 0; k < 10; k++) {
        const x = 12 + (k % 5) * 72, y = 64 + Math.floor(k / 5) * 54;
        rr(g, x, y, 66, 46, 4, k < count ? (k < 5 ? '#2f5f2f' : '#5f2f2f') : '#2a3a4a');
        txt(g, k < count ? names[k] : '等待中', x + 33, y + 23, 12, k < count ? '#fff' : '#6a7f95', { align: 'center' });
      }
      if (count < 10) txt(g, `等待玩家加入 ${count}/10 …`, W / 2, 196, 13, '#9fc3e6', { align: 'center' });
      else if (dt < 6500) {
        const p = Math.min(1, (dt - 450 * (10 - joined.n)) / 2500);
        txt(g, '正在载入地图……', W / 2, 190, 13, '#fff', { align: 'center' });
        g.fillStyle = '#0d1520'; g.fillRect(40, 204, W - 80, 10);
        g.fillStyle = '#4caf50'; g.fillRect(40, 204, (W - 80) * Math.max(0, p), 10);
      } else {
        txt(g, '胜利！天灾军团的冰封王座被摧毁', W / 2, 192, 14, '#ffd27a', { align: 'center', bold: true });
        button(g, W / 2 - 50, 212, 100, 26, '返回大厅', '#2a5d8f');
      }
    },
    click(x, y) {
      if (!joined) {
        const i = Math.floor((y - 40) / 42);
        if (i >= 0 && i < rooms.length && x > W - 80) joined = { name: rooms[i][0], n: rooms[i][1], at: performance.now() };
      } else if (performance.now() - joined.at > 6500 && inside(x, y, W / 2 - 50, 212, 100, 26)) joined = null;
    },
  };
}

export function music() {
  const songs = [['七里香', 299], ['北京欢迎你', 380], ['稻香', 223], ['江南', 268], ['不能说的秘密', 296]];
  let cur = 1, playing = false, startAt = 0, pausedAt = 0;
  const W = 260, HH = 210;
  return {
    title: '千千静听', w: W, h: HH,
    animated: () => playing,
    draw(g) {
      const now = performance.now();
      g.fillStyle = grad(g, 0, 0, 0, HH, ['#2f3a33', '#141a16']); g.fillRect(0, 0, W, HH);
      const pos = playing ? (now - startAt) / 1000 : pausedAt;
      txt(g, songs[cur][0], 12, 18, 14, '#9cff9c', { bold: true });
      const m = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
      txt(g, `${m(pos)} / ${m(songs[cur][1])}`, W - 12, 18, 11, '#8fbf8f', { align: 'right', font: 'Consolas, monospace' });
      for (let i = 0; i < 24; i++) {
        const h = playing ? 6 + Math.abs(Math.sin(now / 180 + i * 1.7) * Math.sin(now / 420 + i)) * 38 : 3;
        g.fillStyle = grad(g, 0, 78 - h, 0, 78, ['#e8ff6a', '#3ccf55']);
        g.fillRect(12 + i * 9.6, 78 - h, 7, h);
      }
      g.fillStyle = '#0b100c'; g.fillRect(12, 86, W - 24, 4);
      g.fillStyle = '#5fe36f'; g.fillRect(12, 86, (W - 24) * Math.min(1, pos / songs[cur][1]), 4);
      for (const [i, sym] of [[0, '◀◀'], [1, playing ? '❚❚' : '▶'], [2, '▶▶']]) {
        rr(g, 70 + i * 42, 96, 36, 22, 11, '#3a4a3e', '#5a6f5f');
        txt(g, sym, 88 + i * 42, 107, 11, '#cfe9cf', { align: 'center' });
      }
      songs.forEach(([s], i) => {
        const y = 130 + i * 15;
        if (i === cur) { g.fillStyle = '#2c4a33'; g.fillRect(8, y - 7, W - 16, 15); }
        txt(g, `${i + 1}. ${s}`, 14, y, 12, i === cur ? '#b8ffb8' : '#88a88a');
      });
    },
    click(x, y) {
      const now = performance.now();
      const play = (i) => { cur = (i + songs.length) % songs.length; playing = true; startAt = now; };
      if (y >= 96 && y <= 118) {
        const b = Math.floor((x - 70) / 42);
        if (b === 0) play(cur - 1);
        else if (b === 2) play(cur + 1);
        else if (b === 1) {
          if (playing) { pausedAt = (now - startAt) / 1000; playing = false; } else { playing = true; startAt = now - pausedAt * 1000; }
        }
      } else if (y > 122) {
        const i = Math.floor((y - 123) / 15);
        if (i >= 0 && i < songs.length) play(i);
      }
    },
  };
}

export function group() {
  const msgs = [['胖子', '今晚八点老地方'], ['阿伟', 'DotA 谁来？三缺二'], ['小林', '我妈今天不在家 哈哈']];
  const mine = ['来！等我写完英语', '我开房间，密码 414', '我妈回来了，先下 >_<'];
  const replies = [['阿伟', '快点快点'], ['胖子', '进了进了'], ['小林', '你妈每次都十点回来……']];
  let k = 0, pending = null;
  const W = 300, HH = 270;
  return {
    title: '初三(2)班永远在一起 (群)', w: W, h: HH,
    animated: () => !!pending,
    draw(g) {
      if (pending && performance.now() > pending.at) { msgs.push(pending.msg); pending = null; }
      g.fillStyle = '#f5f9fe'; g.fillRect(0, 0, W, HH);
      const shown = msgs.slice(-6);
      shown.forEach(([who, m], i) => {
        const y = 14 + i * 32, me = who === '我';
        txt(g, who, me ? W - 10 : 10, y, 10, me ? '#2a7a2a' : '#2a5ea8', { align: me ? 'right' : 'left', bold: true });
        txt(g, m, me ? W - 10 : 10, y + 15, 13, '#222', { align: me ? 'right' : 'left' });
      });
      if (pending) txt(g, '对方正在输入……', 10, 204, 11, '#999');
      rr(g, 6, HH - 52, W - 80, 44, 3, '#fff', '#a9c4e3');
      txt(g, mine[k % mine.length], 12, HH - 30, 12, '#555');
      rr(g, W - 66, HH - 44, 58, 28, 4, '#3e86d9');
      txt(g, '发送', W - 37, HH - 30, 13, '#fff', { align: 'center', bold: true });
    },
    click(x, y) {
      if (!inside(x, y, W - 66, HH - 44, 58, 28) || pending) return;
      msgs.push(['我', mine[k % mine.length]]);
      pending = { at: performance.now() + 1300, msg: replies[k % replies.length] };
      k++;
    },
  };
}

// ---------- 2012 – 2025 ----------

const LIBS = {
  2012: [['我的世界', 211, '#6b8e23'], ['传送门 2', 18, '#3a6ea5'], ['上古卷轴 V', 160, '#5d6b7a'], ['求生之路 2', 74, '#8f2d2d'], ['泰拉瑞亚', 96, '#3f8f6f']],
  2016: [['巫师 3', 182, '#8b3a3a'], ['星露谷物语', 140, '#c6893f'], ['黑暗之魂 III', 97, '#4a4a55'], ['守望先锋', 330, '#e3843a'], ['反恐精英 GO', 512, '#385f8c']],
  2020: [['哈迪斯', 88, '#a83232'], ['星露谷物语', 210, '#c6893f'], ['糖豆人', 41, '#d65db1'], ['半衰期：爱莉克斯', 15, '#d48a2a'], ['我的世界', 260, '#6b8e23']],
  2025: [['黑神话：悟空', 120, '#8a6a3a'], ['双人成行', 34, '#d6534f'], ['星露谷物语', 268, '#c6893f'], ['博德之门 3', 230, '#5a4a7a'], ['仙剑奇侠传 重制', 22, '#3f7f8f']],
};
export function library(year) {
  const games = LIBS[year].map(([name, hours, col], i) => ({ name, hours, col, st: i === 1 && year !== 2025 ? 'none' : 'ok', at: 0 }));
  let sel = 0;
  const W = 520, HH = 320, dark = year < 2020;
  return {
    title: year === 2012 ? '游戏库 · 夏季特卖' : '游戏库', w: W, h: HH,
    animated: () => games.some((g) => g.st === 'dl' || g.st === 'run'),
    draw(g) {
      const now = performance.now();
      for (const gm of games) {
        if (gm.st === 'dl' && now - gm.at > 4000) gm.st = 'ok';
        if (gm.st === 'run' && now - gm.at > 3000) { gm.st = 'ok'; gm.hours += 1; }
      }
      g.fillStyle = dark ? '#1b2838' : '#20242c'; g.fillRect(0, 0, W, HH);
      g.fillStyle = dark ? '#16202d' : '#181b21'; g.fillRect(0, 0, 170, HH);
      txt(g, '全部游戏', 12, 18, 12, '#8fa8c3', { bold: true });
      games.forEach((gm, i) => {
        const y = 34 + i * 30;
        if (i === sel) { g.fillStyle = '#3d5a7c'; g.fillRect(0, y, 170, 28); }
        g.fillStyle = gm.col; g.fillRect(10, y + 6, 16, 16);
        txt(g, gm.name, 34, y + 14, 12, gm.st === 'none' ? '#6f7f90' : '#dfe8f2');
      });
      if (year === 2012) { rr(g, 8, HH - 56, 154, 46, 4, '#4c6b22'); txt(g, '夏季特卖 -75%', 85, HH - 33, 13, '#d2efa9', { align: 'center', bold: true }); }
      const gm = games[sel];
      g.fillStyle = grad(g, 180, 0, W, 150, [gm.col, '#111']); g.fillRect(180, 10, W - 190, 150);
      txt(g, gm.name, 196, 120, 26, '#fff', { bold: true });
      txt(g, gm.st === 'none' ? '尚未安装' : `已游玩 ${gm.hours} 小时`, 196, 186, 13, '#a9bccf');
      const bx = 196, by = 206;
      if (gm.st === 'dl') {
        const p = Math.min(1, (now - gm.at) / 4000);
        txt(g, `正在下载 ${Math.round(p * 100)}%  ·  ${(1.6 + Math.sin(now / 300) * 0.3).toFixed(1)} MB/s`, bx, by + 12, 13, '#cfe0f0');
        g.fillStyle = '#0d1520'; g.fillRect(bx, by + 30, 300, 10);
        g.fillStyle = '#5ba32b'; g.fillRect(bx, by + 30, 300 * p, 10);
      } else if (gm.st === 'run') {
        rr(g, bx, by, 150, 34, 3, '#2a6fbf');
        txt(g, '运行中……', bx + 75, by + 17, 14, '#fff', { align: 'center', bold: true });
      } else button(g, bx, by, 150, 34, gm.st === 'none' ? '安装' : '开始游戏', gm.st === 'none' ? '#2a6fbf' : '#5ba32b');
      txt(g, year >= 2020 ? '好友在线：阿伟、胖子、小林' : '好友：阿伟 正在游戏中', bx, HH - 30, 12, '#7f98b0');
    },
    click(x, y) {
      if (x < 170) {
        const i = Math.floor((y - 34) / 30);
        if (i >= 0 && i < games.length) sel = i;
        return;
      }
      const gm = games[sel];
      if (inside(x, y, 196, 206, 150, 34) && (gm.st === 'none' || gm.st === 'ok')) { gm.st = gm.st === 'none' ? 'dl' : 'run'; gm.at = performance.now(); }
    },
  };
}

export function aim() {
  const W = 400, HH = 300, TOTAL = 15;
  let st = 'idle', target = null, hits = [], misses = 0;
  const spawn = () => { target = { x: 30 + Math.random() * (W - 60), y: 60 + Math.random() * (HH - 90), at: performance.now() }; };
  return {
    title: '瞄准训练', w: W, h: HH,
    animated: () => st === 'run',
    draw(g) {
      g.fillStyle = '#111418'; g.fillRect(0, 0, W, HH);
      g.strokeStyle = 'rgba(80,140,200,0.12)'; g.lineWidth = 1;
      for (let x = 0; x < W; x += 25) { g.beginPath(); g.moveTo(x, 40); g.lineTo(x, HH); g.stroke(); }
      for (let y = 40; y < HH; y += 25) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      txt(g, `命中 ${hits.length}/${TOTAL}   失误 ${misses}`, 12, 20, 13, '#9fe0ff', { bold: true });
      if (st === 'idle') { button(g, W / 2 - 60, HH / 2 - 18, 120, 36, '开始训练', '#e94560'); txt(g, '144Hz 下的鼠标，比 60Hz 跟手多了', W / 2, HH / 2 + 40, 12, '#6f8696', { align: 'center' }); }
      if (st === 'run' && target) {
        const p = Math.sin((performance.now() - target.at) / 120) * 1.5;
        for (const [r, c] of [[16 + p, '#e94560'], [10, '#fff'], [5, '#e94560']]) { g.fillStyle = c; g.beginPath(); g.arc(target.x, target.y, r, 0, 7); g.fill(); }
      }
      if (st === 'done') {
        const avg = Math.round(hits.reduce((a, b) => a + b, 0) / hits.length);
        txt(g, `平均反应 ${avg} ms`, W / 2, HH / 2 - 30, 22, '#fff', { align: 'center', bold: true });
        txt(g, `命中率 ${Math.round((TOTAL / (TOTAL + misses)) * 100)}%`, W / 2, HH / 2, 14, '#9fe0ff', { align: 'center' });
        button(g, W / 2 - 50, HH / 2 + 24, 100, 30, '再来一次', '#e94560');
      }
    },
    click(x, y) {
      const now = performance.now();
      if (st !== 'run') {
        if (inside(x, y, W / 2 - 60, HH / 2 - 18, 120, 70)) { st = 'run'; hits = []; misses = 0; spawn(); }
        return;
      }
      if (Math.hypot(x - target.x, y - target.y) <= 18) {
        hits.push(now - target.at);
        if (hits.length >= TOTAL) { st = 'done'; target = null; } else spawn();
      } else misses++;
    },
  };
}

export function meet(desk) {
  let mute = false, cam = true;
  const W = 460, HH = 300;
  const people = [['产品 王姐', '#6c8ebf'], ['后端 老周', '#8f7a5a'], ['设计 Mia', '#b56a8a']];
  return {
    title: '视频会议 · 需求周会（12 人）', w: W, h: HH,
    draw(g) {
      g.fillStyle = '#1f2125'; g.fillRect(0, 0, W, HH);
      people.forEach(([n, c], i) => {
        const x = 8 + (i % 2) * 224, y = 8 + Math.floor(i / 2) * 118;
        rr(g, x, y, 216, 112, 6, '#2c2f35');
        avatar(g, x + 108, y + 50, 26, c, n.split(' ')[1]);
        txt(g, n, x + 8, y + 100, 11, '#ddd');
      });
      const x = 232, y = 126;
      rr(g, x, y, 216, 112, 6, cam ? '#56614f' : '#2c2f35');
      if (cam) {
        g.fillStyle = '#d9cfb4'; g.fillRect(x + 150, y + 30, 46, 40); g.fillStyle = '#334'; g.fillRect(x + 156, y + 35, 34, 26);
        g.fillStyle = '#f1c9a5'; g.beginPath(); g.arc(x + 90, y + 56, 22, 0, 7); g.fill();
        g.fillStyle = '#3a3a3a'; g.fillRect(x + 62, y + 80, 56, 32);
      } else avatar(g, x + 108, y + 50, 26, '#4a7a5a', '我');
      txt(g, `我${mute ? '（已静音）' : ''}`, x + 8, y + 100, 11, '#fff');
      g.fillStyle = '#16181b'; g.fillRect(0, HH - 50, W, 50);
      button(g, 14, HH - 38, 80, 28, mute ? '取消静音' : '静音', '#3a3f47');
      button(g, 102, HH - 38, 80, 28, cam ? '关闭视频' : '开启视频', '#3a3f47');
      button(g, W - 120, HH - 38, 106, 28, '下班！', '#d64545');
      txt(g, '17:59', W / 2 + 20, HH - 24, 13, '#9aa', { align: 'center' });
    },
    click(x, y) {
      if (y < HH - 50) return;
      if (x < 94) mute = !mute;
      else if (x < 182) cam = !cam;
      else if (x > W - 120) desk.clockOut();
    },
  };
}

export function sheet() {
  const rows = [['需求', '负责人', '工时', '状态'], ['登录改版', '我', '5', '进行中'], ['支付回调', '老周', '3', '完成'], ['埋点', 'Mia', '2', '待排期'], ['周报', '我', '1', '今天'], ['', '', '', '']];
  let sel = [1, 2];
  return {
    title: 'Q2 排期.xlsx', w: 340, h: 220,
    draw(g, w, h) {
      g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#217346'; g.fillRect(0, 0, w, 22);
      txt(g, '开始  插入  公式  数据  审阅', 8, 11, 11, '#fff');
      const cw = (w - 30) / 4;
      for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) {
        const x = 30 + c * cw, y = 30 + r * 23;
        g.strokeStyle = '#d4d4d4'; g.strokeRect(x, y, cw, 23);
        if (r === sel[0] && c === sel[1]) { g.strokeStyle = '#217346'; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, cw - 2, 21); g.lineWidth = 1; }
        const v = rows[r]?.[c];
        if (v) txt(g, v, x + 6, y + 12, 12, r === 0 ? '#217346' : '#222', { bold: r === 0 });
      }
      for (let r = 0; r < 8; r++) txt(g, `${r + 1}`, 15, 42 + r * 23, 11, '#888', { align: 'center' });
    },
    click(x, y, _b, w) {
      const c = Math.floor((x - 30) / ((w - 30) / 4)), r = Math.floor((y - 30) / 23);
      if (c >= 0 && c < 4 && r >= 0 && r < 8) sel = [r, c];
    },
  };
}

export function voice(year) {
  let joined = year === 2025, muted = false;
  const W = 400, HH = 300;
  const chat = year === 2025
    ? [['阿伟', '孩子睡了，十点上'], ['胖子', '我在高铁上，信号一般'], ['小林', '老规矩，先打一局再聊']]
    : [['阿伟', '居家第 40 天，今晚还上吗'], ['胖子', '上！我把以前的存档翻出来了'], ['小林', '记得戴耳机，别吵到邻居']];
  return {
    title: year === 2025 ? '语音 · 星际网吧（复刻）' : '语音 · 星际网吧', w: W, h: HH,
    animated: () => joined,
    draw(g) {
      const now = performance.now();
      g.fillStyle = '#313338'; g.fillRect(0, 0, W, HH);
      g.fillStyle = '#1e1f22'; g.fillRect(0, 0, 44, HH);
      ['#5865f2', '#d9534f', '#4fa35a'].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(22, 26 + i * 44, 16, 0, 7); g.fill(); });
      g.fillStyle = '#2b2d31'; g.fillRect(44, 0, 150, HH);
      txt(g, '# 闲聊', 56, 22, 12, '#949ba4');
      txt(g, '# 截图', 56, 42, 12, '#949ba4');
      txt(g, '🔊 老地方', 56, 66, 12, '#dbdee1', { bold: true });
      const members = [...FRIENDS, ...(joined ? [['屿', '#5865f2']] : [])];
      members.forEach(([n, c], i) => {
        const y = 88 + i * 26;
        const speaking = joined && Math.sin(now / 260 + i * 2.3) > 0.55 && !(n === '屿' && muted);
        if (speaking) { g.strokeStyle = '#23a55a'; g.lineWidth = 2; g.beginPath(); g.arc(70, y, 10, 0, 7); g.stroke(); }
        avatar(g, 70, y, 8, c, n);
        txt(g, n + (n === '屿' && muted ? ' 🔇' : ''), 86, y, 12, '#dbdee1');
      });
      button(g, 52, HH - 40, 64, 28, joined ? '断开' : '加入语音', joined ? '#da373c' : '#248046');
      if (joined) button(g, 122, HH - 40, 64, 28, muted ? '取消静音' : '静音', '#4e5058');
      chat.forEach(([n, m], i) => {
        const y = 24 + i * 48;
        avatar(g, 216, y + 8, 12, FRIENDS.find((f) => f[0] === n)[1], n);
        txt(g, n, 236, y, 12, '#f2f3f5', { bold: true });
        txt(g, m, 236, y + 18, 12, '#dbdee1');
      });
    },
    click(x, y) {
      if (inside(x, y, 52, HH - 40, 64, 28)) joined = !joined;
      else if (joined && inside(x, y, 122, HH - 40, 64, 28)) muted = !muted;
    },
  };
}

export function album(eras, onJump) {
  let sel = 5;
  const W = 560, HH = 330;
  const shapes = ['crt', 'lcd', 'lcd', 'lcd', 'wide', 'wide'];
  return {
    title: '照片 · 这个房间', w: W, h: HH,
    draw(g) {
      g.fillStyle = '#f7f5f2'; g.fillRect(0, 0, W, HH);
      eras.forEach((e, i) => {
        const x = 12 + (i % 3) * 182, y = 10 + Math.floor(i / 3) * 104;
        rr(g, x, y, 172, 96, 8, i === sel ? '#dfe9f7' : '#fff', i === sel ? '#5b8def' : '#ddd');
        g.fillStyle = grad(g, x, y, x, y + 70, ['#f3d9b1', '#c99a6b']); g.fillRect(x + 8, y + 8, 70, 52);
        g.fillStyle = '#333';
        if (shapes[i] === 'crt') { g.fillStyle = '#d9cfb4'; g.fillRect(x + 26, y + 20, 34, 30); g.fillStyle = '#4a6a8a'; g.fillRect(x + 30, y + 24, 26, 20); }
        else if (shapes[i] === 'lcd') { g.fillRect(x + 22, y + 22, 42, 26); g.fillStyle = '#6a9ac8'; g.fillRect(x + 24, y + 24, 38, 22); }
        else { g.fillRect(x + 14, y + 24, 58, 22); g.fillStyle = '#6a9ac8'; g.fillRect(x + 16, y + 26, 54, 18); }
        txt(g, `${e.year}`, x + 88, y + 24, 18, '#222', { bold: true, font: `Georgia, ${FONT}` });
        txt(g, e.age.split(' · ')[0], x + 88, y + 46, 11, '#777');
        txt(g, e.title.slice(0, 7), x + 10, y + 78, 12, '#444');
      });
      const e = eras[sel];
      rr(g, 12, HH - 106, W - 24, 96, 8, '#fff', '#ddd');
      txt(g, `${e.year} · ${e.title}`, 24, HH - 86, 14, '#222', { bold: true });
      const t = [...e.text];
      for (let l = 0; l < 2; l++) txt(g, t.slice(l * 32, l * 32 + 32).join(''), 24, HH - 62 + l * 18, 12, '#555');
      button(g, W - 140, HH - 44, 116, 28, `回到 ${e.year}`, '#5b8def');
    },
    click(x, y) {
      if (inside(x, y, W - 140, HH - 44, 116, 28)) return onJump(eras[sel].year);
      const c = Math.floor((x - 12) / 182), r = Math.floor((y - 10) / 104);
      if (c >= 0 && c < 3 && r >= 0 && r < 2) sel = r * 3 + c;
    },
  };
}
