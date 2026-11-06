import { getEra } from './eras.js';

const WIDTH = 512;
const HEIGHT = 320;
const TARGETS = [
  [256, 155], [370, 212], [145, 110], [325, 105], [169, 222],
  [415, 145], [95, 190], [270, 230], [210, 105], [358, 175],
];

export function createScreen(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  let year = 2005;
  let eraYear = 2005;
  let mode = 'desktop';
  let score = 0;
  let remaining = 20;
  let targetIndex = 0;
  let elapsed = 0;
  let drawnTick = -1;

  function rect(x, y, width, height, fill, radius = 0) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
  }

  function label(value, x, y, size = 14, color = '#ecf0ed', weight = 400, align = 'left') {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${eraYear <= 2010 ? 'Tahoma, ' : ''}Arial, sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillText(value, x, y);
  }

  function star(x, y, radius, fill) {
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 === 0 ? radius : radius * 0.47;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function playButton(x, y, width = 174, text = 'PLAY STAR CATCH') {
    rect(x, y, width, 38, eraYear <= 2010 ? '#88bc64' : '#b2cba3', eraYear <= 2010 ? 2 : 6);
    label(text, x + width / 2, y + 19, 13, '#172725', 700, 'center');
  }

  function desktop() {
    if (eraYear === 2005) {
      rect(0, 0, WIDTH, HEIGHT, '#456fa0');
      ctx.fillStyle = '#6c966d';
      ctx.beginPath();
      ctx.ellipse(320, 318, 390, 130, -0.1, 0, Math.PI * 2);
      ctx.fill();
      rect(16, 20, 25, 20, '#f0e4bd', 2);
      rect(19, 23, 19, 13, '#7898a8');
      label('My PC', 30, 52, 10, '#fff', 400, 'center');
      rect(19, 80, 23, 19, '#e7c967');
      label('Games', 30, 113, 10, '#fff', 400, 'center');
      rect(80, 53, 396, 219, '#d5d1bf', 2);
      rect(83, 56, 390, 25, '#284d8e');
      label('A very good afternoon', 96, 68, 12, '#fff', 700);
      rect(450, 60, 17, 17, '#b96b55', 2);
      label('x', 458, 68, 12, '#fff', 700, 'center');
      label('STAR CATCH', 278, 119, 28, '#33443b', 700, 'center');
      label('Homework can wait for one round.', 278, 150, 13, '#526057', 400, 'center');
      for (let i = 0; i < 5; i += 1) star(212 + i * 33, 183, 9, '#b39a46');
      playButton(191, 213);
      rect(0, 294, 512, 26, '#2e5189');
      rect(0, 294, 63, 26, '#548f47', 3);
      label('start', 29, 307, 13, '#fff', 700, 'center');
      label('STAR CATCH', 82, 307, 11);
      label('16:30', 487, 307, 11, '#fff', 400, 'right');
    } else if (eraYear === 2010) {
      const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      gradient.addColorStop(0, '#1f4778');
      gradient.addColorStop(1, '#71aab1');
      rect(0, 0, WIDTH, HEIGHT, gradient);
      rect(23, 28, 318, 254, '#e9efea', 5);
      rect(23, 28, 318, 29, '#3b617b', 5);
      label('After school', 38, 43, 13, '#fff', 700);
      label('STAR CATCH', 182, 112, 28, '#223b49', 700, 'center');
      label('One more round before dinner.', 182, 147, 12, '#56726d', 400, 'center');
      star(182, 181, 18, '#b99a53');
      playButton(95, 220);
      rect(356, 28, 136, 254, '#e2ebe8', 5);
      label('FRIENDS', 370, 47, 12, '#34555d', 700);
      ['sunny', 'old_fish', 'player_2', 'littlebear'].forEach((name, i) => {
        rect(368, 75 + i * 45, 22, 22, ['#b5c2a2', '#d9b98e', '#a3c3d1', '#c7b4bd'][i], 3);
        label(name, 398, 82 + i * 45, 11, '#38565a');
        label(i < 3 ? 'online' : 'away', 398, 96 + i * 45, 9, '#6e8767');
      });
      rect(0, 298, 512, 22, '#25475b');
      label('Connected  |  4 friends', 16, 309, 10);
      label('22:14', 496, 309, 10, '#fff', 400, 'right');
    } else {
      rect(0, 0, WIDTH, HEIGHT, eraYear === 2025 ? '#192725' : '#1c2933');
      rect(0, 0, WIDTH, 35, '#111c23');
      label('LITTLE ORBIT', 19, 18, 13, '#d5dfd6', 700);
      label(eraYear === 2015 ? 'LIBRARY' : eraYear === 2020 ? 'TOGETHER' : 'FRIDAY NIGHT', 492, 18, 10, '#94b69a', 700, 'right');
      if (eraYear === 2015) {
        rect(0, 35, 118, 263, '#16212b');
        label('MY GAMES', 16, 58, 10, '#738993', 700);
        ['Star Catch', 'Faraway', 'Night Drive', 'Tiny Planet', 'The Return'].forEach((name, i) => {
          if (i === 0) rect(6, 77, 106, 27, '#2c4148', 3);
          label(name, 16, 91 + i * 31, 11, i === 0 ? '#d5e5d2' : '#8e9fa7');
        });
        rect(132, 49, 365, 135, '#35494b', 6);
        drawHills(132, 49, 365, 135);
        label('STAR CATCH', 151, 143, 30, '#f3e8c5', 700);
        label('A little game. A long way home.', 151, 167, 11, '#e2dbc8');
        playButton(149, 205);
        label('12 hours played', 149, 262, 10, '#9aaca8');
      } else if (eraYear === 2020) {
        label('Same team. Different rooms.', 27, 66, 22, '#ebeddf', 700);
        label('THE FRIDAY CREW', 27, 96, 10, '#88a99b', 700);
        ['YOU', 'SUNNY', 'OLD FISH', 'PLAYER 2'].forEach((name, i) => {
          rect(27 + i * 121, 118, 106, 82, '#2c3e44', 5);
          ctx.fillStyle = ['#cca984', '#8fadb0', '#b5ba8e', '#bba0a7'][i];
          ctx.beginPath();
          ctx.arc(80 + i * 121, 145, 13, 0, Math.PI * 2);
          ctx.fill();
          label(name, 80 + i * 121, 178, 10, '#d3e2d8', 700, 'center');
        });
        playButton(27, 224, 220, 'PLAY A WARM-UP ROUND');
        label('Ready when you are.', 269, 244, 11, '#a0b7a6');
      } else {
        rect(23, 52, 300, 226, '#34483e', 9);
        drawHills(23, 52, 300, 226);
        label('Hello again.', 43, 91, 30, '#eee9d5', 700);
        label('Your old favorite is still here.', 43, 119, 12, '#d5dbc8');
        star(170, 170, 23, '#d3b86a');
        playButton(43, 223, 260, 'PLAY ONE MORE GAME');
        label('EVENING PLANS', 344, 69, 10, '#98b49f', 700);
        label('A cup of tea.', 344, 108, 13, '#d9dfd2');
        label('A familiar voice.', 344, 136, 13, '#d9dfd2');
        label('One more game.', 344, 164, 13, '#d9dfd2');
        rect(342, 213, 146, 65, '#253a32', 7);
        label('sunny is online', 354, 234, 11, '#b4cfaa', 700);
        label('"same time as always?"', 354, 257, 10, '#a0b5a6');
      }
      rect(0, 298, 512, 22, '#111c23');
      label('STAR CATCH  /  OFFLINE GAME', 16, 309, 9, '#77918c');
      label('21:30', 493, 309, 10, '#bdd1bd', 400, 'right');
    }
  }

  function drawHills(x, y, width, height) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
    for (let i = 0; i < 3; i += 1) {
      ctx.fillStyle = ['#526654', '#71836b', '#3d5549'][i];
      ctx.beginPath();
      ctx.ellipse(x + width * (i % 2 ? 0.9 : 0.2), y + height + 25 + i * 21, width * 0.8, height * 0.72, i * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function game() {
    rect(0, 0, WIDTH, HEIGHT, '#142832');
    for (let i = 0; i < 38; i += 1) {
      const x = (i * 137 + 29) % WIDTH;
      const y = 52 + ((i * 67 + 18) % 215);
      rect(x, y, i % 3 === 0 ? 2 : 1, 2, '#41616a');
    }
    rect(0, 0, WIDTH, 42, '#203c44');
    label('< BACK', 15, 21, 12, '#c7d8c4', 700);
    label('STAR CATCH', WIDTH / 2, 21, 15, '#d8dfc6', 700, 'center');
    label(`${score} PTS`, 496, 21, 13, '#d7bc7e', 700, 'right');
    rect(18, 52, 476, 3, '#324851');
    rect(18, 52, 476 * Math.max(0, remaining / 20), 3, '#b2cba3');
    if (remaining > 0) {
      const [x, y] = TARGETS[targetIndex % TARGETS.length];
      ctx.strokeStyle = '#6c8c88';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 31 + Math.sin(elapsed * 5) * 2, 0, Math.PI * 2);
      ctx.stroke();
      star(x, y, 23, '#e7c77c');
      label('CLICK THE STARS', 256, 288, 13, '#98b7b2', 700, 'center');
      label(`${Math.ceil(remaining)}s`, 486, 288, 13, '#d5ddc4', 700, 'right');
    } else {
      label('A little brighter.', 256, 121, 28, '#e4debe', 700, 'center');
      label(`${score} stars caught`, 256, 165, 19, '#a6c4b3', 400, 'center');
      playButton(156, 210, 200, 'PLAY AGAIN');
    }
  }

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (mode === 'desktop') desktop();
    else game();
    texture.needsUpdate = true;
  }

  function startGame() {
    mode = 'game';
    score = 0;
    remaining = 20;
    targetIndex = 0;
    elapsed = 0;
    drawnTick = -1;
    draw();
  }

  function reset() {
    mode = 'desktop';
    score = 0;
    remaining = 20;
    targetIndex = 0;
    draw();
  }

  function click(u, v) {
    if (!Number.isFinite(u) || !Number.isFinite(v) || u < 0 || u > 1 || v < 0 || v > 1) return false;
    const x = u * WIDTH;
    const y = (1 - v) * HEIGHT;
    if (mode === 'desktop') {
      const button = eraYear === 2005 ? [191, 213, 174, 38]
        : eraYear === 2010 ? [95, 220, 174, 38]
          : eraYear === 2015 ? [149, 205, 174, 38]
            : eraYear === 2020 ? [27, 224, 220, 38]
              : [43, 223, 260, 38];
      if (x >= button[0] && x <= button[0] + button[2] && y >= button[1] && y <= button[1] + button[3]) {
        startGame();
        return true;
      }
      if (eraYear === 2005 && x < 60 && y > 70 && y < 125) {
        startGame();
        return true;
      }
      return false;
    }
    if (y < 42 && x < 90) {
      reset();
      return true;
    }
    if (remaining <= 0) {
      if (x >= 156 && x <= 356 && y >= 210 && y <= 248) {
        startGame();
        return true;
      }
      return false;
    }
    const [tx, ty] = TARGETS[targetIndex % TARGETS.length];
    if (Math.hypot(tx - x, ty - y) <= 35) {
      score += 1;
      targetIndex += 1;
      draw();
      return true;
    }
    return false;
  }

  draw();
  return {
    texture,
    canvas,
    setYear(nextYear) {
      year = Number(nextYear);
      const nextEra = getEra(year).year;
      if (nextEra !== eraYear) {
        eraYear = nextEra;
        reset();
      }
    },
    click,
    update(dt) {
      if (mode !== 'game' || remaining <= 0) return;
      const delta = Number.isFinite(dt) ? Math.max(0, dt) : 0;
      elapsed += delta;
      remaining = Math.max(0, remaining - delta);
      const tick = Math.floor(elapsed * 20);
      if (tick !== drawnTick || remaining === 0) {
        drawnTick = tick;
        draw();
      }
    },
    reset,
    getState() {
      const [x, y] = TARGETS[targetIndex % TARGETS.length];
      return {
        year,
        eraYear,
        mode,
        score,
        remaining,
        target: { u: x / WIDTH, v: 1 - y / HEIGHT },
      };
    },
  };
}
