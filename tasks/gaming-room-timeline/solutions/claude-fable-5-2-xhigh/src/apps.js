// Era desktops for the main screen, and the passive content of the second monitor.
import { xp } from './app-xp.js';
import { mmo } from './app-mmo.js';
import { library } from './app-library.js';
import { royale } from './app-royale.js';
import { wfh } from './app-wfh.js';
import { today } from './app-today.js';

export const APPS = [xp, mmo, library, royale, wfh, today];

const STREAM = ['路人甲：主播跳哪', '老周：他落地成盒别看了', '弹幕：66666', '阿凯：我在隔壁直播间', '路人乙：这枪法能吃鸡？', '大鹏：来了来了'];
const VOICE = ['# 开黑大厅', '老周：上号', '阿凯：等我十分钟', '大鹏：今天玩啥', '老周：老规矩', '小满：我带了新人', '阿凯：到了', '大鹏：@我 快点'];

// 2017: streaming tool on the old 24". 2020 onward: chat on the upright 27".
export function drawSide(s, app, W, H, tick) {
  const g = s.g;
  if (app === 3) {
    s.rect(0, 0, W, H, '#1c1e24');
    const sky = g.createLinearGradient(0, 30, 0, 330);
    sky.addColorStop(0, '#2b3a5a');
    sky.addColorStop(1, '#d98a4a');
    s.rect(30, 30, W * 0.62, 330, sky, 4);
    s.rect(30, 280, W * 0.62, 80, '#2a2a22');
    s.rect(42, 42, 150, 34, '#d9342b', 4);
    s.text('● 直播中  观众 12', 117, 60, 15, '#fff', 'center', 'bold');
    s.text('直播助手', 30, 400, 16, '#8a93a3');
    s.text('码率 2500 kbps · 丢帧 0.3%', 30, 430, 15, '#57d36a');
    const cx = W * 0.62 + 50;
    s.rect(cx, 30, W - cx - 30, H - 60, '#262a33', 6);
    for (let i = 0; i < 9; i++) s.text(STREAM[(tick + i) % STREAM.length], cx + 14, 60 + i * 56, 17, i % 3 ? '#dfe8f5' : '#f2c94c');
    return;
  }
  // portrait chat column
  s.rect(0, 0, W, H, '#2b2d31');
  s.rect(0, 0, W, 44, '#1e1f22');
  s.text('老地方 · 语音', W / 2, 23, 17, '#fff', 'center', 'bold');
  for (let i = 0; i < 12; i++) {
    const m = VOICE[(tick + i) % VOICE.length], y = 62 + i * 44;
    s.rect(12, y, 28, 28, ['#b5532e', '#3e8f6b', '#2f5fa8', '#e8b04a'][(tick + i) % 4], 14);
    s.text(m, 48, y + 14, 15, '#dbdee1');
  }
}
