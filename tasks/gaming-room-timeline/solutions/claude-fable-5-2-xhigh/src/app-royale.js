// 2017: battle-royale lobby. Fill the squad, queue, and see how the match goes.
const MODES = ['单排', '双排', '四排'], SIZE = [1, 2, 4], MATES = ['老周', '阿凯', '大鹏'];

export function royale(s, st, t) {
  const { W, H, g } = s;
  st.mode ??= 1;
  st.squad ??= 1;
  st.phase ??= 'lobby';

  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#2b3a5a');
  sky.addColorStop(0.6, '#d98a4a');
  sky.addColorStop(1, '#3a3020');
  s.rect(0, 0, W, H, sky);
  g.fillStyle = '#2a2a22';
  g.beginPath();
  g.moveTo(0, H * 0.72);
  for (const [x, y] of [[0.15, 0.6], [0.3, 0.68], [0.5, 0.55], [0.72, 0.66], [0.9, 0.58], [1, 0.64], [1, 1], [0, 1]]) g.lineTo(W * x, H * y);
  g.fill();
  // the player, with the helmet and the frying pan
  const px = W / 2;
  s.rect(px - 34, 250, 68, 150, '#3a4a3a', 12);
  s.rect(px - 26, 400, 22, 120, '#2a3040', 6);
  s.rect(px + 4, 400, 22, 120, '#2a3040', 6);
  s.rect(px - 26, 196, 52, 52, '#55604a', 22);
  s.rect(px - 18, 222, 36, 12, '#16181a', 4);
  s.rect(px + 38, 300, 44, 44, '#1a1a1a', 22);
  s.rect(px + 30, 318, 14, 8, '#1a1a1a');

  s.rect(0, 0, W, 46, 'rgba(0,0,0,0.55)');
  s.text('绝地大逃亡', 20, 24, 20, '#f2c94c', 'left', 'bold');
  ['大厅', '仓库', '战绩', '商城'].forEach((m, i) => s.text(m, 190 + i * 80, 24, 15, i ? '#b9b9b0' : '#fff'));

  const n = SIZE[st.mode];
  st.squad = Math.min(st.squad, n);
  for (let i = 0; i < n; i++) {
    const x = px - (n - 1) * 60 + i * 120 - 44, filled = i < st.squad;
    s.rect(x, 470, 88, 34, filled ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.18)', 6);
    s.text(filled ? (i ? MATES[i - 1] : '我') : '+ 邀请', x + 44, 488, 15, filled ? '#fff' : '#f2c94c', 'center');
    if (!filled && st.phase === 'lobby') s.hit(x, 470, 88, 34, () => st.squad++);
  }
  MODES.forEach((m, i) => s.btn(24 + i * 78, H - 122, 72, 34, m, () => st.phase === 'lobby' && (st.mode = i), i === st.mode ? '#f2c94c' : 'rgba(0,0,0,0.55)', i === st.mode ? '#222' : '#ddd', 15));

  const since = t - (st.t0 ?? t);
  if (st.phase === 'lobby') s.btn(24, H - 76, 228, 56, '开始游戏', () => Object.assign(st, { phase: 'match', t0: s.t }), '#f2c94c', '#222', 24, 4);
  if (st.phase === 'match') {
    s.btn(24, H - 76, 228, 56, `匹配中 00:0${Math.min(9, since | 0)}  取消`, () => (st.phase = 'lobby'), '#55604a', '#fff', 18, 4);
    if (since > 4) Object.assign(st, { phase: 'game', t0: t, rank: 1 + ((t * 7) | 0) % 3 });
  }
  if (st.phase === 'game') {
    const left = Math.max(st.rank, 100 - ((since * 11) | 0));
    s.rect(W - 210, 60, 190, 44, 'rgba(0,0,0,0.6)', 4);
    s.text(`剩余 ${left}   淘汰 ${Math.min(6, (since / 1.5) | 0)}`, W - 115, 83, 17, '#fff', 'center', 'bold');
    s.text('对局中…（队友在语音里吵着要跳哪）', 24, H - 48, 16, '#fff');
    if (left === st.rank && since > 10) st.phase = 'end';
  }
  if (st.phase === 'end') {
    s.rect(0, 150, W, 120, 'rgba(0,0,0,0.7)');
    s.text(st.rank === 1 ? '大吉大利，今晚吃鸡！' : `第 ${st.rank} 名 · 就差一点`, W / 2, 196, 34, '#f2c94c', 'center', 'bold');
    s.btn(W / 2 - 70, 226, 140, 34, '返回大厅', () => (st.phase = 'lobby'), '#f2c94c', '#222', 16);
  }
}
