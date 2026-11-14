export const YEAR_MIN = 2005;
export const YEAR_MAX = 2025;

export const ERAS = [
  {
    year: 2005,
    name: '卧室电脑角',
    desc: '一张小书桌挤在床和窗之间，CRT 呼呼地响。光盘盒堆在纸箱上，网线从门缝牵进来。',
  },
  {
    year: 2009,
    name: '第一块宽屏',
    desc: '换了宽屏和黑色机箱，游戏从光盘变成盒子。床还在，桌上多了一台主机手柄。',
  },
  {
    year: 2013,
    name: '双屏与联赛',
    desc: '两块屏幕、一把高背椅，墙上贴起赛程表。旧音箱还留着，只是不再开到最大声。',
  },
  {
    year: 2017,
    name: '整间房都是游戏',
    desc: '床搬走了，换来玻璃柜和洞洞板。桌面变大，收藏第一次有了自己的位置。',
  },
  {
    year: 2021,
    name: '直播与收藏',
    desc: '麦克风和补光灯上了桌，柜子里摆满这些年攒下的东西。窗台的小恐龙还在。',
  },
  {
    year: 2025,
    name: '二十年',
    desc: '设备都是新的，角落却留着 CRT 和那箱光盘。屏幕里还开着 2005 年那一关。',
  },
];

const boundaries = [2008.5, 2012.5, 2016.5, 2020.5, 2024.5];

export function eraIndexFor(year) {
  let index = 0;
  while (index < boundaries.length && year >= boundaries[index]) index++;
  return index;
}

export function eraFor(year) {
  return ERAS[eraIndexFor(year)];
}
