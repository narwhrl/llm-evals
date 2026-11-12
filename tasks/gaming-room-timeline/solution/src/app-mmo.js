// 2009: a 25-man raid in one window, the guild chat in another.
const SKILLS = ['寒冰箭', '火球术', '冰枪术', '奥术冲击'];
const REPLIES = ['来了来了', '等我 5 分钟，吃口面', '我妈查房，先挂机', '这把一定过'];

export function mmo(s, st, t) {
  const { W, H, g } = s;
  st.hp ??= 100;
  st.cd ??= [0, 0, 0, 0];
  st.chat ??= ['老周：今晚 8 点开荒，别迟到', '阿凯：我妈让我 10 点前下', '大鹏：谁有多的药水'];
  st.sent ??= 0;

  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1d5a8a');
  bg.addColorStop(1, '#49aebd');
  s.rect(0, 0, W, H, bg);

  const gx = 16, gy = 14, gw = W - 32, gh = 360, mid = gx + gw / 2;
  s.win(gx, gy, gw, gh, '魔域纪元 — 冰封王座（25 人）', '#30343c', '#101826');
  // throne room and the boss
  g.fillStyle = '#1c2c44';
  g.beginPath();
  g.moveTo(gx, gy + gh);
  g.lineTo(mid - 130, gy + 150);
  g.lineTo(mid + 130, gy + 150);
  g.lineTo(gx + gw, gy + gh);
  g.fill();
  const bob = Math.sin(t * 2) * 3, hurt = st.hitT && t - st.hitT < 0.25;
  g.fillStyle = hurt ? '#fff' : '#8fc4ea';
  g.beginPath();
  g.moveTo(mid, gy + 92 + bob);
  g.lineTo(mid + 48, gy + 220 + bob);
  g.lineTo(mid - 48, gy + 220 + bob);
  g.fill();
  s.rect(mid - 16, gy + 110 + bob, 32, 26, '#16223a', 4);
  s.rect(mid - 10, gy + 119 + bob, 6, 5, '#7fe0ff');
  s.rect(mid + 4, gy + 119 + bob, 6, 5, '#7fe0ff');

  s.rect(mid - 152, gy + 38, 304, 22, '#000');
  s.rect(mid - 150, gy + 40, 3 * st.hp, 18, '#c9302c');
  s.text(`霜之领主  ${st.hp}%`, mid, gy + 50, 14, '#fff', 'center', 'bold');
  for (let i = 0; i < 25; i++) s.rect(gx + 12 + (i % 5) * 27, gy + 74 + ((i / 5) | 0) * 17, 24, 13, i % 7 === 3 ? '#555' : '#3a9a4a');
  s.text('[团队] 老周：治疗跟上！', gx + 12, gy + gh - 84, 13, '#ff9a5a');
  s.text('[团队] 阿凯：我又 OT 了…', gx + 12, gy + gh - 64, 13, '#ff9a5a');
  if (st.hitT && t - st.hitT < 0.8) s.text(`-${st.dmg}`, mid + 70, gy + 150 - (t - st.hitT) * 50, 26, '#ffd94a', 'center', 'bold');

  SKILLS.forEach((name, i) => {
    const ready = t >= st.cd[i] && st.hp > 0;
    s.btn(mid - 190 + i * 96, gy + gh - 50, 90, 38, name, () => {
      if (s.t < st.cd[i] || st.hp <= 0) return;
      st.dmg = 4 + i * 2 + (((s.t * 10) | 0) % 4);
      st.hp = Math.max(0, st.hp - st.dmg);
      st.hitT = s.t;
      st.cd[i] = s.t + 0.5 + i * 0.5;
    }, ready ? '#2a4a8a' : '#2a2e36', ready ? '#fff' : '#777', 14);
  });
  if (st.hp <= 0) {
    s.rect(mid - 190, gy + 130, 380, 130, 'rgba(0,0,0,0.78)', 8);
    s.text('首领已击败 · 公会首杀！', mid, gy + 160, 22, '#ffd94a', 'center', 'bold');
    s.text('你赢得了 [霜纹法杖]（需求 98 点）', mid, gy + 192, 15, '#b48cff', 'center');
    s.btn(mid - 60, gy + 214, 120, 32, '再来一次', () => (st.hp = 100), '#d9b44a', '#222', 15);
  }

  const cx = W - 300, cy = H - 222;
  s.win(cx, cy, 284, 180, '公会群（37）', '#2a8fd6', '#f4f8fb');
  st.chat.slice(-4).forEach((m, i) => s.text(m, cx + 10, cy + 46 + i * 24, 13, m.startsWith('我') ? '#1a6a2a' : '#234'));
  s.rect(cx + 8, cy + 146, 200, 26, '#fff');
  s.text('说点什么…', cx + 14, cy + 159, 13, '#99a');
  s.btn(cx + 214, cy + 146, 62, 26, '发送', () => st.chat.push('我：' + REPLIES[st.sent++ % REPLIES.length]), '#2a8fd6', '#fff', 13);

  s.rect(0, H - 32, W, 32, 'rgba(16,32,56,0.88)');
  g.fillStyle = '#5ab0e8';
  g.beginPath();
  g.arc(22, H - 16, 12, 0, 7);
  g.fill();
  s.text('魔域纪元', 52, H - 16, 13, '#dfe8f5');
  s.text('公会群', 130, H - 16, 13, '#dfe8f5');
  s.text('23:12', W - 12, H - 16, 13, '#fff', 'right');
}
