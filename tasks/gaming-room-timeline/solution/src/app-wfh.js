// 2020: working from home on an ultrawide. The meeting on the left, the island on the right.
const PEOPLE = [['老板', '#b5532e'], ['产品', '#3e8f6b'], ['设计', '#7a5fc0'], ['测试', '#2f5fa8'], ['实习生', '#e8b04a']];
const FISH = ['鲈鱼', '鲈鱼', '竹荚鱼', '鲈鱼', '一只旧靴子', '鲷鱼'];

export function wfh(s, st, t) {
  const { W, H, g } = s;
  st.mute ??= true;
  st.fish ??= 0;
  s.rect(0, 0, W, H, '#20242c');

  const mw = Math.round(W * 0.4);
  s.win(12, 12, mw, H - 64, st.left ? '周会 · 已离开' : '周会 · 已进行 01:12:44', '#2b2f3a', '#1c1f26');
  if (st.left) {
    s.text('你已离开会议。可以专心钓鱼了。', 12 + mw / 2, 230, 22, '#dfe8f5', 'center');
    s.btn(12 + mw / 2 - 80, 264, 160, 44, '重新加入', () => (st.left = false), '#3d6fd6', '#fff', 19);
  } else {
    const tw = (mw - 40) / 3, th = 170, speaking = ((t / 3) | 0) % 5;
    [...PEOPLE, ['我', '#6f9e5a']].forEach(([name, col], i) => {
      const x = 22 + (i % 3) * (tw + 8), y = 52 + ((i / 3) | 0) * (th + 8), me = i === 5;
      s.rect(x, y, tw, th, i === speaking && !me ? '#57d36a' : '#2b2f3a', 6);
      s.rect(x + 3, y + 3, tw - 6, th - 6, me && st.cam ? '#5a4a3a' : '#262a33', 5);
      if (me && st.cam) {
        s.rect(x + tw / 2 - 40, y + 96, 80, 66, '#d9a05a', 30);
        s.rect(x + tw / 2 - 28, y + 76, 16, 24, '#d9a05a', 4);
        s.rect(x + tw / 2 + 12, y + 76, 16, 24, '#d9a05a', 4);
        s.text('（猫入镜了）', x + tw / 2, y + 24, 17, '#fff', 'center');
      } else s.rect(x + tw / 2 - 30, y + 46, 60, 60, col, 30);
      s.text(name + (me && st.mute ? ' · 已静音' : ''), x + 10, y + th - 18, 17, '#dfe8f5');
    });
    const by = H - 104, bx = 12 + mw / 2;
    s.btn(bx - 200, by - 6, 126, 44, st.mute ? '解除静音' : '静音', () => (st.mute = !st.mute), st.mute ? '#8a3a3a' : '#3a4250', '#fff', 19);
    s.btn(bx - 63, by - 6, 126, 44, st.cam ? '关摄像头' : '开摄像头', () => (st.cam = !st.cam), '#3a4250', '#fff', 19);
    s.btn(bx + 74, by - 6, 126, 44, '离开', () => (st.left = true), '#d9534f', '#fff', 19);
  }

  const gx = mw + 24, gw = W - gx - 12, gh = H - 64, sea = 12 + gh * 0.55;
  s.win(gx, 12, gw, gh, '小岛物语', '#3a8a6a', '#9fd8ef');
  s.rect(gx, sea, gw, 12 + gh - sea, '#4aa3c9');
  g.fillStyle = '#e8d9a0';
  g.beginPath();
  g.ellipse(gx + gw * 0.36, sea + 10, gw * 0.36, 60, 0, 0, 7);
  g.fill();
  g.fillStyle = '#7fb86a';
  g.beginPath();
  g.ellipse(gx + gw * 0.33, sea - 6, gw * 0.3, 44, 0, 0, 7);
  g.fill();
  s.rect(gx + gw * 0.16, sea - 86, 84, 64, '#f4ead0', 4);
  g.fillStyle = '#c9463d';
  g.beginPath();
  g.moveTo(gx + gw * 0.16 - 10, sea - 84);
  g.lineTo(gx + gw * 0.16 + 42, sea - 124);
  g.lineTo(gx + gw * 0.16 + 94, sea - 84);
  g.fill();
  for (const k of [0.4, 0.48]) {
    s.rect(gx + gw * k + 14, sea - 70, 10, 46, '#8a5a34');
    s.rect(gx + gw * k - 6, sea - 110, 50, 50, '#4f8c55', 25);
  }
  // pier, villager, rod
  const vx = gx + gw * 0.66;
  s.rect(vx - 90, sea - 4, 110, 10, '#a67a4b');
  s.rect(vx - 14, sea - 56, 28, 52, '#e8b04a', 10);
  s.rect(vx - 16, sea - 88, 32, 32, '#f1d7b8', 16);
  g.strokeStyle = '#5a3d24';
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(vx + 10, sea - 40);
  g.lineTo(vx + 90, sea - 100);
  g.stroke();

  const waiting = st.cast && t < st.bite, biting = st.cast && t >= st.bite && t < st.bite + 2;
  if (st.cast && t >= st.bite + 2) Object.assign(st, { cast: 0, msg: '跑掉了…再来' });
  if (st.cast) {
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(vx + 90, sea - 100);
    g.lineTo(vx + 120, sea + 40 + (biting ? 8 : Math.sin(t * 3) * 3));
    g.stroke();
    s.rect(vx + 114, sea + 36 + (biting ? 8 : Math.sin(t * 3) * 3), 12, 12, '#e05a4a', 6);
  }
  if (biting) s.text('！', vx + 2, sea - 108, 34, '#e05a4a', 'center', 'bold');
  const label = biting ? '提竿！' : waiting ? '等待中…' : '抛竿';
  s.btn(gx + gw - 200, 12 + gh - 70, 180, 54, label, () => {
    if (biting) Object.assign(st, { cast: 0, fish: st.fish + 1, msg: `钓到了${FISH[st.fish % FISH.length]}！` });
    else if (!st.cast) Object.assign(st, { cast: s.t, bite: s.t + 2 + ((s.t * 13) % 3), msg: '' });
  }, biting ? '#e05a4a' : '#f4ead0', biting ? '#fff' : '#5a3d24', 24, 27);
  s.rect(gx + 14, 50, 360, 42, 'rgba(255,255,255,0.75)', 21);
  s.text(`今日渔获 ${st.fish}   ${st.msg ?? '朋友们都在线上'}`, gx + 32, 72, 20, '#5a3d24');

  s.rect(0, H - 40, W, 40, '#14171c');
  ['会议', '小岛物语', '语音', '表格'].forEach((m, i) => s.text(m, 24 + i * 110, H - 20, 17, '#b9c2cf'));
  s.text('周三 15:42', W - 16, H - 20, 17, '#dfe8f5', 'right');
}
