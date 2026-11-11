import { eraForYear } from './data.js';

export function screenMarkup(year) {
  const era = eraForYear(year);
  if (era.screen === 'desktop') {
    return `<div class="pixel-desktop">
      <div class="desktop-icons"><div class="desktop-icon"><i>▣</i>我的电脑</div><div class="desktop-icon"><i>▱</i>我的游戏</div><div class="desktop-icon"><i>♪</i>音乐</div></div>
      <div class="desktop-window"><div class="window-title"><span>${era.game} · 单人游戏</span><span>×</span></div><div class="window-body"><h3>${era.game}</h3><p>一小片像素，也是一整个世界。</p><div class="pixel-game"><div class="pixel-ground"></div><div class="pixel-player" id="pixel-player"></div><div class="pixel-coin" id="pixel-coin"></div></div><button class="game-button" id="pixel-jump">跳跃 / 收集金币</button><p id="game-score" aria-live="polite">金币 0 · 点击跳跃</p></div></div>
      <div class="desktop-taskbar"><button class="start-button" id="start-button">开始</button><span>${era.game}</span><span class="taskbar-time">22:0${era.year === 2005 ? '5' : '9'}</span></div>
    </div>`;
  }
  if (era.screen === 'library') {
    return `<div class="modern-desktop"><div class="modern-top"><span>MY LIBRARY</span><span>● ONLINE</span></div><div class="library-window"><aside class="library-sidebar"><strong>GAME LIBRARY</strong><span class="selected">全部游戏</span><span>最近玩过</span><span>好友在线 · 4</span><span>愿望单</span></aside><div class="library-main"><h3>${era.game}</h3><p>已安装 · 本地存档已同步</p><div class="game-cover"><small>YOUR SAVE IS WAITING</small><strong>${era.game.toUpperCase()}</strong></div><div class="modern-actions"><button class="launch-button" id="launch-game">▶ 开始游戏</button><span id="play-time">${era.year === 2013 ? '12.5' : '128'} 小时</span></div></div></div><div class="modern-dock"><span>▣</span><span>◉</span><span>♪</span><span>⌕</span></div></div>`;
  }
  return `<div class="orbit-screen"><div class="stars"></div><div class="orbit-hud"><span>ASTRAL DRIFT / ${year}</span><span>SECTOR 07 · EXPLORER MODE</span></div><div class="planet"></div><div class="ship" id="ship">▲</div><div class="orbit-bottom"><span id="ship-coordinates">X 00 · Y 00 · 方向键 / WASD 驾驶</span><div><button id="ship-left" aria-label="飞船向左">←</button> <button id="ship-up" aria-label="飞船向上">↑</button> <button id="ship-down" aria-label="飞船向下">↓</button> <button id="ship-right" aria-label="飞船向右">→</button></div></div></div>`;
}

export function bindScreen(dialog, year) {
  const era = eraForYear(year);
  if (era.screen === 'desktop') {
    let score = 0;
    let jumping = false;
    const player = dialog.querySelector('#pixel-player');
    const coin = dialog.querySelector('#pixel-coin');
    dialog.querySelector('#pixel-jump').addEventListener('click', () => {
      if (jumping) return;
      jumping = true;
      player.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-65px)' }, { transform: 'translateY(0)' }], { duration: 520, easing: 'ease-in-out' });
      window.setTimeout(() => {
        score += 1;
        coin.style.left = `${25 + (score * 23) % 60}%`;
        dialog.querySelector('#game-score').textContent = `金币 ${score} · 再来一次！`;
        coin.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 250 });
        jumping = false;
      }, 480);
    });
    dialog.querySelector('#start-button').addEventListener('click', event => {
      event.currentTarget.textContent = event.currentTarget.textContent === '开始' ? '存档已读取 ✓' : '开始';
    });
  } else if (era.screen === 'library') {
    dialog.querySelector('#launch-game').addEventListener('click', event => {
      const playing = event.currentTarget.dataset.playing === 'true';
      event.currentTarget.dataset.playing = String(!playing);
      event.currentTarget.textContent = playing ? '▶ 开始游戏' : '■ 返回游戏库';
      dialog.querySelector('.game-cover strong').textContent = playing ? era.game.toUpperCase() : 'WELCOME BACK, PLAYER';
      dialog.querySelector('#play-time').textContent = playing ? '本地存档已同步' : '正在游玩 · 自动存档';
    });
  } else {
    let x = 0;
    let y = 0;
    const ship = dialog.querySelector('#ship');
    const move = (dx, dy) => {
      x = Math.max(-180, Math.min(180, x + dx));
      y = Math.max(-100, Math.min(100, y + dy));
      ship.style.left = `calc(50% + ${x}px)`;
      ship.style.top = `calc(52% + ${y}px)`;
      dialog.querySelector('#ship-coordinates').textContent = `X ${String(x).padStart(3, '0')} · Y ${String(y).padStart(3, '0')} · 方向键 / WASD 驾驶`;
    };
    for (const [id, dx, dy] of [['left', -20, 0], ['right', 20, 0], ['up', 0, -20], ['down', 0, 20]]) {
      dialog.querySelector(`#ship-${id}`).addEventListener('click', () => move(dx, dy));
    }
    dialog._screenKeyHandler = event => {
      const moves = { ArrowLeft: [-20, 0], a: [-20, 0], ArrowRight: [20, 0], d: [20, 0], ArrowUp: [0, -20], w: [0, -20], ArrowDown: [0, 20], s: [0, 20] };
      if (moves[event.key]) { event.preventDefault(); move(...moves[event.key]); }
    };
    dialog.addEventListener('keydown', dialog._screenKeyHandler);
  }
}
