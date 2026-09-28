import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type RefObject,
} from 'react';
import { delePoints, ribbon, strikePoints, INK_VERMILION, type Box, type Pt } from '../engine/marks';

export interface MarksHandle {
  addStrike: (key: string, rect: Box, animate: boolean) => void;
  addInsert: (key: string, rect: Box) => void;
  clearStrikes: () => void;
}

interface Props {
  /** 判死笔迹写出进度 0..1（随滚动可回溯） */
  dele: number;
  reduced: boolean;
  /** 翻面后笔迹随校样沉入纸背 */
  sink: number;
  /** 判死笔迹的靶区（校样正文），为空则退到整面 */
  targetRef?: RefObject<HTMLElement>;
}

interface TransientMark {
  key: string;
  box: Box;
  seed: number;
  grow: number;
  fade: number;
  /** strike 与撕词一起走；insert 是替代词落位的插入号，留得久一点 */
  mode: 'strike' | 'insert';
}

const GROW_MS: Record<TransientMark['mode'], number> = { strike: 190, insert: 140 };
const FADE_MS: Record<TransientMark['mode'], number> = { strike: 340, insert: 720 };

/** 插入号 ⌃：替代词砸落补位的校对符号 */
function insertPoints(box: Box): Pt[] {
  const x0 = box.x + box.w * 0.08;
  const x1 = box.x + box.w * 0.92;
  const xm = box.x + box.w * 0.5;
  const yb = box.y + box.h + 5;
  const yt = box.y + box.h + 1;
  return [
    { x: x0, y: yb },
    { x: (x0 + xm) / 2, y: (yb + yt) / 2 },
    { x: xm, y: yt },
    { x: (xm + x1) / 2, y: (yt + yb) / 2 },
    { x: x1, y: yb },
  ];
}

/**
 * 笔迹层：删除线、插入号与删除号都以带笔压的色带写出。
 * 划除/插入随动作生灭（笔迹属于被删的那个词），删除号随滚动可回溯。
 * 空闲时不跑动画循环，只被事件唤醒。
 */
export const MarksLayer = forwardRef<MarksHandle, Props>(function MarksLayer(
  { dele, reduced, sink, targetRef },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const marksRef = useRef<TransientMark[]>([]);
  const rafRef = useRef(0);
  const wakeRef = useRef<() => void>(() => {});
  const deleRef = useRef(dele);
  deleRef.current = dele;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (sink >= 0.99) return;

    const sinkA = 1 - sink * 0.8;

    for (const m of marksRef.current) {
      ctx.globalAlpha = sinkA * (1 - m.fade);
      const pts = m.mode === 'insert' ? insertPoints(m.box) : strikePoints(m.box, m.seed);
      ribbon(ctx, pts, m.grow, m.mode === 'insert' ? 1.9 : 2.6, INK_VERMILION);
    }

    ctx.globalAlpha = sinkA;
    const d = deleRef.current;
    if (d > 0) {
      let box: Box;
      const target = targetRef?.current;
      if (target) {
        const t = target.getBoundingClientRect();
        const b = canvas.getBoundingClientRect();
        box = {
          x: t.left - b.left - 14,
          y: t.top - b.top - t.height * 0.34,
          w: t.width + 28,
          h: t.height * 1.68,
        };
      } else {
        box = { x: 10, y: h * 0.16, w: w - 20, h: h * 0.68 };
      }
      ribbon(ctx, delePoints(box, 91), d, 13, INK_VERMILION);
    }
    ctx.globalAlpha = 1;
  }, [sink, targetRef]);

  useEffect(() => {
    let running = false;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      let busy = false;
      for (const m of marksRef.current) {
        if (m.grow < 1) {
          m.grow = reduced ? 1 : Math.min(1, m.grow + dt / GROW_MS[m.mode]);
          busy = true;
        } else if (m.fade < 1) {
          m.fade = reduced ? 1 : Math.min(1, m.fade + dt / FADE_MS[m.mode]);
          busy = true;
        }
      }
      if (marksRef.current.some((m) => m.fade >= 1)) {
        marksRef.current = marksRef.current.filter((m) => m.fade < 1);
      }
      draw();
      if (busy) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        running = false;
        rafRef.current = 0;
      }
    };

    const wake = () => {
      if (reduced) {
        draw();
        return;
      }
      if (running) return;
      running = true;
      last = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    draw();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      running = false;
    };
  }, [draw, reduced]);

  // dele / 翻面随滚动变化时同步重绘
  useEffect(() => {
    draw();
  }, [draw, dele]);

  useImperativeHandle(
    ref,
    () => {
      const push = (key: string, rect: Box, mode: TransientMark['mode'], animate: boolean) => {
        marksRef.current.push({
          key,
          box: rect,
          seed: (key.charCodeAt(0) * 131 + marksRef.current.length * 17) >>> 0,
          grow: animate && !reduced ? 0 : 1,
          fade: 0,
          mode,
        });
        if (reduced) {
          // 直接定格在完成态一帧后消失，保持内容与反馈不减
          draw();
          window.setTimeout(() => {
            marksRef.current = marksRef.current.filter((m) => m.key !== key);
            draw();
          }, 240);
          return;
        }
        wakeRef.current();
      };
      return {
        addStrike(key, rect, animate) {
          push(key, rect, 'strike', animate);
        },
        addInsert(key, rect) {
          push(key, rect, 'insert', true);
        },
        clearStrikes() {
          marksRef.current = [];
          draw();
        },
      };
    },
    [draw, reduced],
  );

  return <canvas ref={canvasRef} className="marks-layer" aria-hidden="true" />;
});
