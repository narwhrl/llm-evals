// Era-appropriate simplified desktops rendered as self-contained SVG screens.
// Each screen carries a little operable content (playable bars, chat, queue,
// clip buttons) driven by plain DOM handlers in main.ts.

export type OsKind = "xp" | "w7" | "w10" | "w11";

export function osForYear(year: number): OsKind {
  if (year < 2010) return "xp";
  if (year < 2016) return "w7";
  if (year < 2023) return "w10";
  return "w11";
}

export interface ScreenSpec {
  svg: string;
  idPrefix: string;
  interactive: boolean;
}

function svgWrap(w: number, h: number, inner: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"` +
    ` preserveAspectRatio="none" style="display:block;width:100%;height:100%">${inner}</svg>`;
}

function rect(x: number, y: number, w: number, h: number, fill: string,
  extra = ""): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
}

function txt(x: number, y: number, s: string, size = 11,
  fill = "#fff", anchor = "start", bold = false): string {
  const b = bold ? ' font-weight="700"' : "";
  return `<text x="${x}" y="${y}" font-family="Tahoma,Segoe UI,sans-serif"` +
    ` font-size="${size}" fill="${fill}" text-anchor="${anchor}"${b}>${s}</text>`;
}

// ---------- Windows XP desktop (2005-2009) ----------
function xpDesktop(): string {
  const W = 320, H = 200;
  let s = "";
  s += `<defs><linearGradient id="xpbg" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="#2a6bd4"/><stop offset="0.55" stop-color="#4f9be8"/>` +
    `<stop offset="0.56" stop-color="#3f8f3f"/><stop offset="1" stop-color="#62b32e"/></linearGradient></defs>`;
  s += rect(0, 0, W, H, "url(#xpbg)");
  s += `<path d="M0 150 Q160 118 320 142 L320 200 L0 200 Z" fill="#58a830"/>`;
  const icons: [string, string, string][] = [
    ["我的电脑", "#ffd76e", "M12 24 h40 v26 h-40 z"],
    ["回收站", "#cfe3f0", "M12 58 h40 v30 h-40 z"],
    ["CS 1.6", "#e8e8e8", "M12 96 h40 v30 h-40 z"],
    ["作业.doc", "#f6f6f6", "M12 132 h40 v30 h-40 z"],
  ];
  for (const [name, c, d] of icons) {
    s += `<path d="${d}" fill="${c}" stroke="#6a6a6a" stroke-width="1" rx="3"/>`;
    const ly = name === "我的电脑" ? 58 : name === "回收站" ? 96 : name === "CS 1.6" ? 134 : 170;
    s += txt(32, ly, name, 10, "#fff", "middle");
  }
  s += rect(168, 26, 142, 108, "#ece9d8", 'stroke="#8b8b8b" rx="4"');
  s += rect(168, 26, 142, 16, "#245edb", 'rx="4"');
  s += txt(174, 38, "MSN Messenger", 10, "#fff", "start", true);
  s += rect(292, 29, 14, 10, "#d4493b");
  s += txt(299, 37, "×", 9, "#fff", "middle");
  const msgs: [string, string][] = [
    ["同桌-小杰:", "作业借我抄抄"],
    ["我:", "打 CS 呢, 别吵"],
    ["同桌-小杰:", "晚上 9 点局域网?"],
    ["我:", "行, 老地图 de_dust2"],
  ];
  let yy = 58;
  for (const [who, m] of msgs) {
    s += txt(176, yy, who, 9, "#245edb", "start", true);
    s += txt(232, yy, m, 9, "#222");
    yy += 18;
  }
  s += rect(0, 176, W, 24, "#245edb");
  s += `<path d="M0 176 h320 v3 h-320 z" fill="#4f9be8"/>`;
  s += rect(2, 179, 56, 18, "#3f9b2f", 'rx="9"');
  s += txt(30, 192, "开始", 11, "#fff", "middle", true);
  s += rect(64, 179, 60, 18, "#2f6fd4", 'rx="3"');
  s += txt(94, 192, "MSN", 10, "#cfe0ff", "middle");
  s += txt(296, 191, "21:47", 10, "#fff", "middle");
  return s;
}

// ---------- Windows 7 desktop (2010-2015) ----------
function w7Desktop(): string {
  const W = 320, H = 200;
  let s = "";
  s += `<defs><linearGradient id="w7bg" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#1b3a66"/><stop offset="0.5" stop-color="#2e6ea6"/>` +
    `<stop offset="1" stop-color="#12325c"/></linearGradient></defs>`;
  s += rect(0, 0, W, H, "url(#w7bg)");
  s += `<circle cx="160" cy="86" r="34" fill="none" stroke="#9fd0ff" stroke-width="2" opacity="0.8"/>`;
  s += `<path d="M160 52 v68 M126 86 h68" stroke="#9fd0ff" stroke-width="2" opacity="0.8"/>`;
  s += rect(30, 30, 260, 116, "rgba(10,14,20,0.78)", 'stroke="#c9a86a" rx="6"');
  s += rect(30, 30, 260, 18, "#3a2c14", 'rx="6"');
  s += txt(38, 43, "团队副本 · 冰冠堡垒 · 25人", 10, "#ffd77a", "start", true);
  s += rect(120, 56, 150, 14, "#333", 'stroke="#c9a86a"');
  s += `<rect id="bossHp" x="120" y="56" width="150" height="14" fill="#c0392b"/>`;
  s += txt(195, 67, "巫妖王 100%", 9, "#fff", "middle");
  s += `<rect id="dpsBtn" x="120" y="76" width="70" height="16" fill="#6b4fa0" rx="3"/>`;
  s += txt(155, 88, "输出!", 10, "#fff", "middle", true);
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 5; c++) {
      const dead = r === 1 && c === 3;
      s += rect(40 + c * 22, 96 + r * 20, 18, 14, dead ? "#5a2a2a" : "#2f5a8a", 'stroke="#8a6a3a"');
      s += txt(49 + c * 22, 106 + r * 20, dead ? "✝" : `${8 - c}`, 8, "#dfe9f0", "middle");
    }
  s += rect(196, 96, 84, 40, "rgba(0,0,0,0.5)", 'rx="3"');
  s += txt(200, 106, "[团队] 奶骑: 顶住!", 8, "#f2c14e");
  s += txt(200, 116, "[团队] 战士: 集合分摊", 8, "#9fd0ff");
  s += txt(200, 126, "[你] DPS 全开", 8, "#8fd08f");
  s += rect(0, 168, W, 32, "rgba(20,24,30,0.85)");
  s += `<circle cx="18" cy="184" r="11" fill="#2e6ea6" stroke="#9fd0ff"/>`;
  s += `<circle cx="18" cy="184" r="5" fill="#ffd77a"/>`;
  const tb: [string, number][] = [["WoW", 44], ["QQ", 96], ["PPS", 138], ["迅雷", 190]];
  for (const [n, x] of tb) {
    s += rect(x, 172, 44, 24, "rgba(255,255,255,0.08)", 'rx="3"');
    s += txt(x + 22, 187, n, 9, "#dfe9f0", "middle");
  }
  s += txt(306, 187, "23:12", 9, "#dfe9f0", "middle");
  return s;
}

// ---------- Windows 10 desktop (2016-2022) ----------
function w10Desktop(): string {
  const W = 320, H = 200;
  let s = "";
  s += `<defs><linearGradient id="w10bg" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="#0d1b2e"/><stop offset="1" stop-color="#1d3a5f"/></linearGradient></defs>`;
  s += rect(0, 0, W, H, "url(#w10bg)");
  s += `<path d="M0 60 L160 30 L320 64 L320 200 L0 200 Z" fill="#16324f"/>`;
  s += rect(28, 24, 264, 122, "#1b2838", 'stroke="#5a7a9a" rx="4"');
  s += rect(28, 24, 264, 20, "#171d25");
  s += txt(36, 38, "STEAM · 库", 10, "#c7d5e0", "start", true);
  s += rect(274, 27, 14, 14, "#c0392b");
  s += txt(281, 38, "×", 10, "#fff", "middle");
  const games: [string, string, string][] = [
    ["DOTA 2", "上次运行: 昨天", "#66c0f4"],
    ["CS:GO", "游戏时间 1284 小时", "#66c0f4"],
    ["星露谷物语", "已安装", "#66c0f4"],
    ["巫师 3", "下载中 68%", "#8f98a0"],
  ];
  let gy = 52;
  for (const [n, st, c] of games) {
    s += rect(36, gy, 46, 18, "#2a475e");
    s += txt(88, gy + 13, n, 10, c);
    s += txt(212, gy + 13, st, 8, "#8f98a0");
    gy += 22;
  }
  s += `<rect id="queueBtn" x="196" y="122" width="86" height="18" fill="#5a7a2a" rx="3"/>`;
  s += txt(239, 135, "寻找比赛", 10, "#d8f0b0", "middle", true);
  s += `<text id="queueTxt" x="239" y="112" font-family="Segoe UI" font-size="9"` +
    ` fill="#8f98a0" text-anchor="middle">DOTA2 · 天梯</text>`;
  s += rect(0, 168, W, 32, "#1f1f1f");
  s += rect(6, 174, 18, 18, "#0d6fd4");
  s += `<path d="M9 178 h12 M15 178 v8 M9 182 h12" stroke="#fff"/>`;
  s += rect(30, 174, 66, 18, "#2d2d2d", 'rx="3"');
  s += txt(63, 187, "在这里搜索", 9, "#9a9a9a", "middle");
  s += rect(102, 174, 18, 18, "#3a5f8a", 'rx="2"');
  s += txt(306, 187, "0:26", 9, "#e8e8e8", "middle");
  return s;
}

// ---------- Windows 11 desktop (2023-2025) ----------
function w11Desktop(): string {
  const W = 320, H = 200;
  let s = "";
  s += `<defs><linearGradient id="w11bg" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#0e2a4a"/><stop offset="0.5" stop-color="#4a1d6e"/>` +
    `<stop offset="1" stop-color="#101c3a"/></linearGradient></defs>`;
  s += rect(0, 0, W, H, "url(#w11bg)");
  s += `<circle cx="230" cy="60" r="60" fill="#7a4dd8" opacity="0.35"/>`;
  s += `<circle cx="90" cy="130" r="80" fill="#2a7ad8" opacity="0.3"/>`;
  s += rect(34, 22, 252, 118, "rgba(16,18,24,0.85)", 'stroke="#8a6fd8" rx="8"');
  s += rect(34, 22, 252, 20, "rgba(40,28,66,0.9)", 'rx="8"');
  s += txt(42, 36, "OBS · 直播中", 10, "#e8d8ff", "start", true);
  s += `<circle id="recDot" cx="272" cy="32" r="5" fill="#ff4d4d"/>`;
  s += rect(46, 50, 108, 80, "rgba(0,0,0,0.45)", 'rx="5"');
  const chat: [string, string][] = [
    ["路人甲:", "主播这操作可以"],
    ["老粉-风:", "爷青回, 还在玩这个"],
    ["我:", "复健中, 别奶"],
    ["路人乙:", "关注了"],
  ];
  let cy = 64;
  for (const [w, m] of chat) {
    s += txt(50, cy, w, 8, "#b49af0", "start", true);
    s += txt(96, cy, m, 8, "#e8e8f0");
    cy += 16;
  }
  s += rect(162, 50, 112, 36, "rgba(0,0,0,0.45)", 'rx="5"');
  s += txt(168, 62, "观众 1,204", 9, "#e8e8f0");
  s += txt(168, 76, "码率 6000kbps · 掉帧 0%", 8, "#9fd08f");
  s += `<rect id="clipBtn" x="162" y="96" width="112" height="20" fill="#5a3aa0" rx="4"/>`;
  s += txt(218, 110, "保存回放剪辑", 10, "#e8d8ff", "middle", true);
  s += `<text id="clipTxt" x="218" y="130" font-family="Segoe UI" font-size="8"` +
    ` fill="#9fd08f" text-anchor="middle"></text>`;
  s += rect(0, 168, W, 32, "rgba(24,26,34,0.9)");
  const cx = 160;
  s += rect(cx - 92, 172, 20, 20, "#3a6fd8", 'rx="5"');
  s += `<path d="M${cx - 88} 176 h12 M${cx - 82} 176 v10 M${cx - 88} 181 h12" stroke="#fff"/>`;
  const apps = ["搜索", "Steam", "OBS", "DC", "夹"];
  apps.forEach((n, i) => {
    s += rect(cx - 66 + i * 24, 172, 20, 20, "rgba(255,255,255,0.1)", 'rx="5"');
    s += txt(cx - 56 + i * 24, 186, n.slice(0, 1), 8, "#e8e8f0", "middle");
  });
  s += txt(306, 187, "1:05", 9, "#e8e8f0", "middle");
  return s;
}

export function screenForYear(year: number): ScreenSpec {
  const os = osForYear(year);
  switch (os) {
    case "xp": return { svg: svgWrap(320, 200, xpDesktop()), idPrefix: "xp", interactive: true };
    case "w7": return { svg: svgWrap(320, 200, w7Desktop()), idPrefix: "w7", interactive: true };
    case "w10": return { svg: svgWrap(320, 200, w10Desktop()), idPrefix: "w10", interactive: true };
    case "w11": return { svg: svgWrap(320, 200, w11Desktop()), idPrefix: "w11", interactive: true };
  }
}
