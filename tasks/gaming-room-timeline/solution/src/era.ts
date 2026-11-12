// Era registry: variant lists are [fromYear, variant] sorted ascending.
// Old items move to a corner or get reused instead of vanishing.

export type Variant = string;

export const REG: Record<string, [number, Variant][]> = {
  monitor: [
    [2005, "crt"],
    [2011, "lcd19"],
    [2016, "ips27"],
    [2021, "uw34"],
  ],
  tower: [
    [2005, "beige"],
    [2011, "black"],
    [2017, "rgb"],
    [2023, "silent"],
  ],
  keyboard: [
    [2005, "ps2"],
    [2013, "mech"],
    [2020, "custom"],
  ],
  mouse: [
    [2005, "opt"],
    [2010, "gaming"],
    [2018, "wireless"],
  ],
  desk: [
    [2005, "small"],
    [2011, "std"],
    [2018, "big"],
  ],
  chair: [
    [2005, "wood"],
    [2010, "office"],
    [2016, "gaming"],
    [2023, "ergo"],
  ],
  bed: [
    [2005, "yes"],
    [2016, "gone"],
  ],
  shelf: [
    [2005, "none"],
    [2009, "small"],
    [2015, "double"],
    [2021, "display"],
  ],
  discs: [
    [2005, "spindle"],
    [2010, "cases"],
    [2015, "steel"],
    [2021, "few"],
  ],
  poster: [
    [2005, "cs"],
    [2009, "wow"],
    [2014, "dota"],
    [2018, "collage"],
    [2022, "framed"],
  ],
  os: [
    [2005, "xp"],
    [2010, "w7"],
    [2016, "w10"],
    [2023, "w11"],
  ],
  lamp: [
    [2005, "desk"],
    [2018, "bar"],
  ],
  ac: [
    [2005, "no"],
    [2009, "yes"],
  ],
  curtains: [
    [2005, "floral"],
    [2014, "dark"],
  ],
  router: [
    [2005, "adsl"],
    [2010, "wifi"],
    [2017, "mesh"],
  ],
  headset: [
    [2005, "none"],
    [2012, "yes"],
  ],
  mic: [
    [2005, "none"],
    [2019, "arm"],
  ],
  cam: [
    [2005, "none"],
    [2019, "yes"],
  ],
  plant: [
    [2005, "none"],
    [2020, "yes"],
  ],
  leds: [
    [2005, "none"],
    [2019, "soft"],
  ],
  retroNook: [
    [2005, "none"],
    [2019, "yes"],
  ],
  ups: [
    [2005, "none"],
    [2021, "yes"],
  ],
};

// Keepsakes run the whole twenty years; they relocate instead of retiring.
export const KEEPSAKES: Record<string, [number, Variant][]> = {
  plush: [
    [2005, "bed"],
    [2016, "shelf"],
  ],
  trophy: [
    [2005, "desk"],
    [2011, "shelf"],
    [2019, "center"],
  ],
  gameboy: [
    [2005, "desk"],
    [2008, "shelf"],
    [2019, "dock"],
  ],
  mug: [
    [2005, "desk"],
    [2013, "pens"],
  ],
};

export interface ClutterDef {
  id: string;
  from: number;
  to: number;
  in_: number;
  out: number;
  peak: number;
}

export const CLUTTER: ClutterDef[] = [
  { id: "homework", from: 2005, to: 2015, peak: 2007, in_: 0.6, out: 4 },
  { id: "noodles", from: 2005, to: 2012, peak: 2007, in_: 0.6, out: 3 },
  { id: "clothes", from: 2005, to: 2012, peak: 2008, in_: 0.6, out: 3 },
  { id: "cablemess", from: 2005, to: 2017, peak: 2010, in_: 1, out: 3 },
  { id: "oldcrt", from: 2011, to: 2015, peak: 2012, in_: 0.4, out: 1.5 },
  { id: "oldtower", from: 2011, to: 2016, peak: 2012, in_: 0.4, out: 1.5 },
  { id: "cans", from: 2009, to: 2017, peak: 2013, in_: 2, out: 3 },
  { id: "mcrate", from: 2015, to: 2017, peak: 2016, in_: 0.5, out: 0.7 },
  { id: "coffee", from: 2016, to: 2026, peak: 2020, in_: 2, out: 4 },
  { id: "dockables", from: 2019, to: 2026, peak: 2022, in_: 1, out: 4 },
];

export function pickVariant(entries: [number, Variant][], year: number): Variant {
  let v = entries[0][1];
  for (const [from, val] of entries) {
    if (year >= from) v = val; else break;
  }
  return v;
}

export function clutterLevel(def: ClutterDef, year: number): number {
  if (year <= def.from || year >= def.to) return 0;
  const a = Math.min(1, (year - def.from) / def.in_);
  const b = Math.min(1, (def.to - year) / def.out);
  return Math.max(0, Math.min(a, b));
}

export interface Phase {
  from: number;
  label: string;
}

export const PHASES: Phase[] = [
  { from: 2005, label: "初中 · 卧室电脑角" },
  { from: 2009, label: "高中 · 空调与宽带" },
  { from: 2011, label: "液晶时代 · CRT 退到角落" },
  { from: 2013, label: "大学 · 机械键盘与收纳" },
  { from: 2016, label: "工作第一年 · 床搬走" },
  { from: 2018, label: "游戏房成型 · 大桌与收藏墙" },
  { from: 2021, label: "直播雏形 · 带鱼屏与复古角" },
  { from: 2023, label: "成熟 · 各就各位" },
];

export function pickPhase(year: number): string {
  let p = PHASES[0].label;
  for (const ph of PHASES) if (year >= ph.from) p = ph.label;
  return p;
}

export const REPRESENTATIVE_YEARS = [
  2005, 2007, 2009, 2011, 2013, 2015, 2017, 2019, 2021, 2023, 2025,
];

export interface Info {
  title: string;
  era: string;
  mem: string;
}

export const INFOS: Record<string, Info> = {
  monitor: {
    title: "显示器",
    era: "随年代更换的显示设备",
    mem: "2005 年的 17 寸纯平 CRT 是家里换电脑时软磨硬泡留下的；2011 年换成液晶那天，老 CRT 在墙角又站了四年才卖给收废品的。",
  },
  tower: {
    title: "主机",
    era: "从米色大机箱到静音工作站",
    mem: "米色机箱的电源键要使劲按；2017 年第一次装侧透时整夜调灯，后来发现真常开着的只有 CPU 风扇那一个白光。",
  },
  keyboard: {
    title: "键盘",
    era: "PS/2 薄膜 → 机械 → 客制化",
    mem: "第一块机械键盘是大学勤工俭学买的青轴，室友投票把它赶到了客厅；现在的静音红轴反而没人有意见了。",
  },
  mouse: {
    title: "鼠标",
    era: "光电 → 游戏鼠标 → 无线",
    mem: "滚轮里卡过橡皮屑、饼干屑和不知道什么的屑。第一个游戏鼠标的侧键半年就掉了一颗。",
  },
  desk: {
    title: "桌子",
    era: "窄写字台 → 标准书桌 → 1.6m 大桌",
    mem: "最初的写字台放完 CRT 只剩半张 A4 的空当，卷子要压在键盘上写。",
  },
  chair: {
    title: "椅子",
    era: "餐椅 → 办公椅 → 电竞椅 → 人体工学",
    mem: "木椅子坐久了腿麻，写作业和打 CS 共用同一把；电竞椅买回来第一晚就后悔了——但还是坐了七年。",
  },
  bed: {
    title: "床",
    era: "2005–2016 卧室标配",
    mem: "床头插座永远插着手机和 GBASP 充电器。2016 年搬走床的那周，房间突然大得不习惯。",
  },
  plush: {
    title: "毛绒鲨鱼",
    era: "2005– 至今",
    mem: "十岁生日礼物。搬床那天它被郑重地放上书架最高层——这是全房间唯一有固定席位的非电子产品。",
  },
  trophy: {
    title: "奖杯",
    era: "2005– 至今",
    mem: "小学奥数区三等奖，底座漆都磨掉了。它从桌角落一路升到展示架正中，资历比任何一块显卡都老。",
  },
  gameboy: {
    title: "Game Boy SP",
    era: "2005– 至今",
    mem: "躲在被窝里玩的那一只是它。屏幕现在还会亮，2019 年给它配了专用底座，摆在复古角当常驻嘉宾。",
  },
  mug: {
    title: "马克杯",
    era: "2005– 至今",
    mem: "杯口磕掉一小块的那只。2013 年起不再装水，改行当笔筒——杯身上的游戏 logo 早洗花了。",
  },
  discs: {
    title: "实体游戏",
    era: "CD 筒 → 盒装 → 铁盒收藏",
    mem: "50 张一筒的刻录盘是高中时期的全部身家；现在铁盒一年只添两三只，但每只都值得摆出来。",
  },
  poster: {
    title: "海报",
    era: "CS → WoW → DOTA2 → 拼贴 → 装裱画",
    mem: "海报换过五代，胶带印子一层叠一层。2022 年终于用相框，墙皮终于得救。",
  },
  lamp: {
    title: "灯",
    era: "台灯 → 屏幕挂灯",
    mem: "老台灯照键盘也照卷子；挂灯只照桌面，不晃屏幕——这是看了三年评测才下的单。",
  },
  router: {
    title: "网络",
    era: "ADSL → 无线路由 → Mesh",
    mem: "ADSL 猫烫得能焐手，晚上偷玩要先听它嘀嘀嘀拨号。换光纤那晚下载速度让全家围观了半小时。",
  },
  retroNook: {
    title: "复古角",
    era: "2019– 至今",
    mem: "二手市场淘的 14 寸小 CRT，专门跑 DOS 老游戏和 GBA 实机。风扇声一响就是 2005 年。",
  },
  headset: {
    title: "耳机",
    era: "2012– 至今",
    mem: "为了开黑买的第一副头戴，麦克风杆现在已经会自己慢慢下垂，用胶带固定过两次。",
  },
  plant: {
    title: "绿萝",
    era: "2020– 至今",
    mem: "居家办公那年买来「给房间一点活物」。多肉养死两盆之后，只有它活了下来。",
  },
  ac: {
    title: "空调",
    era: "2009 年安装",
    mem: "2009 年夏天装空调，理由是「学习需要」，真正的原因大家心照不宣。",
  },
  mic: {
    title: "麦克风",
    era: "2019– 至今",
    mem: "第一次直播只有三个观众，其中一个是自己开的小号。",
  },
  window: {
    title: "窗与帘",
    era: "花窗帘 → 遮光帘",
    mem: "花窗帘是妈妈挑的；2014 年换成遮光帘之后，下午打本终于不用等太阳下山。",
  },
  shelf: {
    title: "书架",
    era: "2009 年起逐代扩容",
    mem: "第一个书架本来是放教辅的，教辅没几本，漫画和攻略倒是满了。",
  },
};
