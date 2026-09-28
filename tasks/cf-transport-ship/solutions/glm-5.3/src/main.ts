/**
 * 入口：资源准备 → 主菜单 → 对局。
 * ?dev=1 启用开发/验收模式（固定机位、测试靶、导航叠加、性能采样、状态快照）。
 */
import './style.css';
import { Game } from './game/game';
import { DevControls } from './debug/dev';

function setLoad(pct: number, step: string): void {
  const fill = document.getElementById('load-fill');
  const label = document.getElementById('load-step');
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = step;
}

function fail(message: string): void {
  setLoad(100, message);
  const err = document.getElementById('webgl-error');
  if (err) {
    err.querySelector('p')!.textContent = message;
    err.classList.remove('hidden');
    document.getElementById('loading')?.classList.add('hidden');
  }
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  const params = new URLSearchParams(location.search);
  const dev = params.get('dev') === '1';

  setLoad(8, '检查运行环境…');
  if (!webglAvailable()) {
    fail('当前浏览器或驱动不支持 WebGL，游戏需要硬件加速的 WebGL 才能运行。');
    return;
  }

  setLoad(24, '初始化渲染器…');
  const canvas = document.getElementById('gl') as HTMLCanvasElement;
  let game: Game;
  try {
    game = new Game(canvas);
  } catch (e) {
    fail(`渲染器初始化失败：${e instanceof Error ? e.message : String(e)}`);
    return;
  }

  setLoad(62, '构建运输船场景…');
  // 首帧同步渲染（rAF 被节流时依然可截图/可就绪）
  game.frame(1, 16);
  setLoad(88, '准备音频与界面…');

  let devCtl: DevControls | null = null;
  if (dev) {
    devCtl = new DevControls(game);
    game.devMode = true;
    // 开发钩子：仅状态读取 + 相机/靶机控制，不提供改状态捷径
    (window as unknown as Record<string, unknown>).__CF__ = {
      snapshot: () => game.snapshot(),
      frame: (n: number, dtMs: number) => game.frame(n, dtMs),
      stations: () => devCtl!.stations(),
      shot: (id: string) => devCtl!.shot(id),
      release: () => devCtl!.release(),
      spawnDummies: (list?: Array<{ x: number; y?: number; z: number; yaw?: number; team?: 'blue' | 'red' }>) => devCtl!.spawnDummies(list),
      clearDummies: () => devCtl!.clearDummies(),
      nav: (on: boolean) => devCtl!.nav(on),
      perfStart: (ms: number) => devCtl!.perfStart(ms),
      perfResult: () => devCtl!.perfResult(),
      start: (cfg: { team?: 'blue' | 'red'; primary?: string; difficulty?: 'easy' | 'normal' | 'hard'; mode?: 'official' | 'practice' }) => {
        (document.querySelector('#btn-start') as HTMLButtonElement).focus();
        game.startMatch({
          team: cfg.team ?? 'blue',
          primary: cfg.primary ?? 'ak',
          difficulty: cfg.difficulty ?? 'normal',
          mode: cfg.mode ?? 'official',
        });
        game.frame(2, 16);
        return game.snapshot();
      },
      phase: () => game.phase,
      /** 只读弹道探针：复用生产 resolveShot 诊断瞄准（不发射、不改状态） */
      probeShot: (ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, weaponId: string) =>
        game.probeShot({ x: ox, y: oy, z: oz }, { x: dx, y: dy, z: dz }, weaponId),
    };
  }

  setLoad(100, '完成');
  document.getElementById('loading')?.classList.add('hidden');
  document.documentElement.dataset.cfReady = 'true';

  // 主循环
  let last = performance.now();
  const loop = (t: number): void => {
    const dt = Math.min(100, t - last);
    last = t;
    try {
      game.tick(dt);
      if (devCtl) {
        devCtl.tick(dt / 1000);
        devCtl.updatePanel();
      }
    } catch (e) {
      console.error('帧错误：', e);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

void main().catch((e) => {
  console.error(e);
  fail(`加载失败：${e instanceof Error ? e.message : String(e)}`);
});
