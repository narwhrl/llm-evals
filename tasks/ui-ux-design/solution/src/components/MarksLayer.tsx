import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { delePoints, ribbon, strikePoints, INK_VERMILION, type Box } from '../engine/marks';

export interface MarksHandle {
  addStrike: (key: string, rect: Box, animate: boolean) => void;
  clearStrikes: () => void;
}

interface Props {
  /** 判死笔迹写出进度 0..1（随滚动可回溯） */
  dele: number;
  reduced: boolean;
  /** 翻面后笔迹随校样沉入纸背 */
  sink: number;
}

interface StrikeMark {
  key: string;
  box: Box;
  seed: number;
  grow: number;
}

const GROW_MS = 340;

/**
 * 笔迹层：删除线与删除号都以带笔压的色带写出。
 * 空闲时不跑动画循环，只被事件唤醒。
 */
export const MarksLayer = forwardRef<MarksHandle, Props>(function MarksLayer(
  { dele, reduced, sink },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const marksRef = useRef<StrikeMark[]>([]);
  const rafRef = useRef(0);
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

    ctx.globalAlpha = 1 - sink * 0.8;

    for (const m of marksRef.current) {
      ribbon(ctx, strikePoints(m.box, m.seed), m.grow, 2.6, INK_VERMILION);
    }

    const d = deleRef.current;
    if (d > 0) {
      const box: Box = { x: 10, y: h * 0.16, w: w - 20, h: h * 0.68 };
      ribbon(ctx, delePoints(box, 91), d, 13, INK_VERMILION);
    }
    ctx.globalAlpha = 1;
  }, [sink]);

  const tickRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    let running = false;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      let busy = false;
      if (!reduced) {
        for (const m of marksRef.current) {
          if (m.grow < 1) {
            m.grow = Math.min(1, m.grow + dt / GROW_MS);
            busy = true;
          }
        }
      } else {
        for (const m of marksRef.current) m.grow = 1;
      }
      draw();
      rafRef.current = busy ? requestAnimationFrame(tick) : 0;
      running = busy;
    };
    tickRef.current = tick;

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
    (draw as unknown as { wake?: () => void }).wake = wake;

    draw();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      running = false;
    };
  }, [draw, reduced]);

  // dele / 翻面随滚动变化时同步重绘
  useEffect(() => {
    draw();
  }, [draw, dele]);

  useImperativeHandle(
    ref,
    () => ({
      addStrike(key, rect, animate) {
        const existing = marksRef.current.find((m) => m.key === key);
        if (existing) {
          existing.box = rect;
          draw();
          return;
        }
        marksRef.current.push({
          key,
          box: rect,
          seed: (key.charCodeAt(0) * 131 + marksRef.current.length * 17) >>> 0,
          grow: animate && !reduced ? 0 : 1,
        });
        if (reduced) {
          draw();
          return;
        }
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        let last = performance.now();
        const localTick = (now: number) => {
          const dt = Math.min(64, now - last);
          last = now;
          let busy = false;
          for (const m of marksRef.current) {
            if (m.grow < 1) {
              m.grow = Math.min(1, m.grow + dt / GROW_MS);
              busy = true;
            }
          }
          draw();
          rafRef.current = busy ? requestAnimationFrame(localTick) : 0;
        };
        rafRef.current = requestAnimationFrame(localTick);
      },
      clearStrikes() {
        marksRef.current = [];
        draw();
      },
    }),
    [draw, reduced],
  );

  return <canvas ref={canvasRef} className="marks-layer" aria-hidden="true" />;
});
