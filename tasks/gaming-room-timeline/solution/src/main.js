import './style.css';
import { eras, getEra } from './eras.js';
import { createRoom } from './room.js';

const $ = (selector) => document.querySelector(selector);
const sceneElement = $('#scene');
const slider = $('#year-slider');
const memoryCard = $('#memory');
let year = 2005;
let playing = false;
let playElapsed = 0;
let selectedMemory = null;
let currentView = 'room';
let night = false;

const memories = {
  mug: {
    label: '用了二十年的红杯',
    title: '还是那只红杯',
    text: () => year < 2015
      ? '妈妈把热水放在手边，叮嘱我别总喝汽水。游戏里走过那么多地图，补给点一直在这里。'
      : '从热水到速溶咖啡，再到温热的茶。杯沿磕掉了一点漆，搬过几次电脑，却始终没舍得换掉它。',
    foot: '2005 → 2025 · 一直在手边',
  },
  disc: {
    label: '第一张游戏光盘',
    title: '舍不得扔的通关存档',
    text: () => year < 2015
      ? '攒了一个月零用钱买的光盘。封面早被翻软了，安装要很久，但那是第一次拥有一整个冒险世界。'
      : '新电脑早就没有光驱了。光盘和旧主机被收在桌子旁的小角落，有些东西不用再打开，也知道里面是什么。',
    foot: year < 2015 ? '2005 · 第一场冒险' : '2005 · 记忆没有卸载键',
  },
  photo: {
    label: '暑假的三人合照',
    title: '总有人等你上线',
    text: () => year < 2015
      ? '那年暑假，三个好朋友第一次组队。照片拍糊了，大家却笑得很开心，约好以后也要一直一起玩。'
      : '我们去了不同的城市，头像也换过很多次。只有这张照片还停在那个暑假。周五九点，老地方见。',
    foot: '2005 年夏天 · 三个人，一支队伍',
  },
  bear: {
    label: '床边的老朋友',
    title: '最安静的队友',
    text: () => '小时候赢回来的小熊，耳朵缝过一次。熬夜通关、失落下线，它都坐在同一个枕头边。房间里最老的玩家，其实是它。',
    foot: '比第一台电脑更早 · 永久在线',
  },
  screen: {
    label: '打开这一年的电脑',
    title: '按下开始的那一刻',
    text: () => '熟悉的桌面里，藏着一款小小的「星光收集」。坐到桌前，点击屏幕上的 PLAY，看看二十秒里能留下多少颗星星。',
    foot: '真实可操作 · 点击屏幕开始',
  },
  computer: {
    label: '这一年的装备',
    title: '当年最想拥有的电脑',
    text: () => ({
      2005: '厚厚的 CRT 显示器占了大半张桌子，米色机箱嗡嗡地响。弹簧键盘、滚轮鼠标，这已经是我的顶配世界。',
      2010: '终于换上第一台液晶宽屏，桌子突然空出一大块。黑色主机配上语音耳机，好友列表里的绿点亮到了深夜。',
      2015: '第一份工资分成了两半，一半存起来，一半换了双屏和机械键盘。给自己的礼物，总要亲手装好。',
      2020: '横屏打游戏，竖屏看资料。麦克风接住会议，也接住朋友们的笑声。房间是办公室，也是集合点。',
      2025: '超宽屏、无线键鼠、网背椅。终于知道舒适比参数重要。灯光不用太亮，一起玩的人还在就好。',
    })[getEra(year).year],
    foot: '设备会更新 · 热爱一直兼容',
  },
};

const hotspots = new Map();
for (const [id, memory] of Object.entries(memories)) {
  const button = document.createElement('button');
  button.className = 'hotspot';
  button.type = 'button';
  button.setAttribute('aria-label', memory.label);
  button.dataset.memory = id;
  const text = document.createElement('span');
  text.className = 'hotspot-label';
  text.textContent = memory.label;
  button.append(text);
  button.addEventListener('click', () => openMemory(id));
  $('#hotspots').append(button);
  hotspots.set(id, button);
}

for (const era of eras) {
  const button = document.createElement('button');
  button.className = 'year-stop';
  button.type = 'button';
  button.textContent = era.year;
  button.dataset.year = era.year;
  button.setAttribute('aria-label', `回到 ${era.year} 年`);
  button.addEventListener('click', () => { setPlaying(false); setYear(era.year); });
  $('#year-stops').append(button);
}

function updateMemory() {
  if (!selectedMemory) return;
  const memory = memories[selectedMemory];
  $('#memory-kicker').textContent = `${year} / 一件旧物，一段时光`;
  $('#memory-title').textContent = memory.title;
  $('#memory-text').textContent = memory.text();
  $('#memory-footnote').textContent = selectedMemory === 'disc' && year >= 2015 ? '2005 · 记忆没有卸载键' : memory.foot;
  $('#memory-action').hidden = selectedMemory !== 'screen';
}

function openMemory(id) {
  setPlaying(false);
  selectedMemory = id;
  updateMemory();
  memoryCard.hidden = false;
  $('#help').hidden = true;
  for (const [key, button] of hotspots) button.classList.toggle('selected', key === id);
}

function closeMemory() {
  memoryCard.hidden = true;
  if (selectedMemory) hotspots.get(selectedMemory).classList.remove('selected');
  selectedMemory = null;
}

function setYear(value) {
  year = Math.max(2005, Math.min(2025, Math.round(Number(value))));
  const era = getEra(year);
  slider.value = year;
  slider.setAttribute('aria-valuetext', `${year} 年，${era.title}`);
  sceneElement.dataset.year = year;
  sceneElement.dataset.era = era.year;
  $('#year-display').textContent = year;
  $('#elapsed').textContent = year === 2005 ? '故事的起点' : `第 ${year - 2005 + 1} 年的存档`;
  $('#chapter-number').textContent = era.chapter;
  $('#era-title').textContent = era.title;
  $('#era-note').textContent = era.note;
  $('#hardware').replaceChildren(...era.hardware.map(value => {
    const tag = document.createElement('span'); tag.textContent = value; return tag;
  }));
  $('#track-progress').style.width = `${(year - 2005) * 5}%`;
  document.querySelectorAll('.year-stop').forEach(button => {
    const active = Number(button.dataset.year) === era.year;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  updateMemory();
  room?.setYear(year);
}

function setPlaying(value) {
  playing = value;
  playElapsed = 0;
  $('#play').setAttribute('aria-pressed', String(value));
  $('#play').setAttribute('aria-label', value ? '暂停时光播放' : '自动播放二十年');
  $('#play-label').textContent = value ? '暂停时光' : '播放时光';
  $('#play-icon').innerHTML = value ? '<path d="M4 3h3v10H4zm5 0h3v10H9z"/>' : '<path d="m5 3 8 5-8 5z"/>';
}

function setView(view) {
  currentView = view;
  closeMemory();
  room.setView(view);
  document.body.classList.toggle('desk-mode', view === 'desk');
  document.querySelectorAll('.view-button').forEach(button => {
    button.classList.toggle('active', button.dataset.view === view);
    button.setAttribute('aria-pressed', String(button.dataset.view === view));
  });
  $('#interaction-hint').lastElementChild.textContent = view === 'desk'
    ? '点击电脑屏幕里的 PLAY · 收集二十秒的星光'
    : '拖动环视 · 滚轮靠近 · 点亮一段记忆';
}

export let room;
try {
  room = createRoom(sceneElement, {
    onSelect: openMemory,
    onFrame(points, dt) {
      for (const [id, position] of Object.entries(points)) {
        const button = hotspots.get(id);
        const visible = position.visible && (currentView !== 'desk' || id === 'mug');
        button.style.left = `${position.x}px`;
        button.style.top = `${position.y}px`;
        button.style.opacity = visible ? '1' : '0';
        button.style.pointerEvents = visible ? 'auto' : 'none';
        button.tabIndex = visible ? 0 : -1;
        button.setAttribute('aria-hidden', String(!visible));
      }
      if (playing) {
        playElapsed += dt;
        if (playElapsed >= 1.4) {
          playElapsed -= 1.4;
          if (year < 2025) setYear(year + 1);
          else setPlaying(false);
        }
      }
    },
  });
  setYear(year);
  requestAnimationFrame(() => $('#loading').classList.add('ready'));
} catch (error) {
  console.error('Unable to initialize the room:', error);
  $('#loading').hidden = true;
  $('#scene-error').hidden = false;
  $('#hotspots').hidden = true;
  $('#play').disabled = true;
  slider.disabled = true;
  document.querySelectorAll('.view-button,.year-stop,#light-toggle').forEach(button => { button.disabled = true; });
}

slider.addEventListener('input', () => { setPlaying(false); setYear(slider.value); });
$('#play').addEventListener('click', () => {
  if (!playing && year === 2025) setYear(2005);
  closeMemory();
  setPlaying(!playing);
});
document.querySelectorAll('.view-button').forEach(button => button.addEventListener('click', () => { setPlaying(false); setView(button.dataset.view); }));
$('#memory-close').addEventListener('click', closeMemory);
$('#memory-action').addEventListener('click', () => setView('desk'));
$('#light-toggle').addEventListener('click', () => {
  night = !night;
  room.setNight(night);
  $('#light-toggle').setAttribute('aria-pressed', String(night));
  $('#light-toggle').setAttribute('aria-label', night ? '切换白天灯光' : '切换夜晚灯光');
  $('#room-caption').textContent = night ? '深夜的房间 · 再玩最后一局' : '周末的下午 · 阳光刚好';
});
$('#help-toggle').addEventListener('click', () => { closeMemory(); $('#help').hidden = !$('#help').hidden; });
$('#help-close').addEventListener('click', () => { $('#help').hidden = true; });
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMemory(); $('#help').hidden = true; }
  if (event.target instanceof HTMLInputElement || !room) return;
  if (event.code === 'Space' && event.target === document.body || event.code === 'Space' && event.target === sceneElement) {
    event.preventDefault(); $('#play').click();
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); setPlaying(false); setYear(year + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
window.addEventListener('pagehide', event => { if (!event.persisted) room?.destroy(); });
