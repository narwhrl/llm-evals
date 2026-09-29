import { useEffect, useRef, useState } from "react";

import { useEngine } from "../core/engineContext.js";
import { readoutOf, stepEngine } from "../core/engine.js";
import { sampleField } from "../core/field.js";
import { createLoop } from "../core/motion.js";
import { RANGE, inkTone } from "../core/ranges.js";
import { A11Y, BENCH_NOTES, IDENTITY } from "../core/copy.js";
import { announce, pushReadout, setCanvasFailed, setParagraph, setPhase } from "../core/store.js";
import Bench from "./Bench.jsx";
import Rail from "./Rail.jsx";
import Slab from "./Slab.jsx";

const PAPER = [243, 238, 227];
const MARK = [240, 234, 222];

/** 可复现的伪随机：纸纹每次重排都一样，不会在 resize 时"跳"。 */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPaper(width, height) {
  const off = document.createElement("canvas");
  off.width = Math.max(1, width);
  off.height = Math.max(1, height);
  const c = off.getContext("2d");
  if (!c) return off;
  c.fillStyle = `rgb(${PAPER.join(",")})`;
  c.fillRect(0, 0, off.width, off.height);

  // 纸纤维：极淡的斑点，只在重排尺寸时画一次。
  const random = mulberry32(20260929);
  const grain = Math.max(900, Math.round((off.width * off.height) / 420));
  c.fillStyle = "rgba(25, 23, 20, 0.045)";
  for (let i = 0; i < grain; i += 1) {
    const x = random() * off.width;
    const y = random() * off.height;
    c.fillRect(x, y, 1, 1);
  }
  // 顶部压边的一道亮，和整体的自上而下微光。
  const wash = c.createLinearGradient(0, 0, 0, off.height);
  wash.addColorStop(0, "rgba(255, 253, 247, 0.55)");
  wash.addColorStop(0.45, "rgba(255, 253, 247, 0)");
  wash.addColorStop(1, "rgba(25, 23, 20, 0.06)");
  c.fillStyle = wash;
  c.fillRect(0, 0, off.width, off.height);
  return off;
}

function mixTone(from, to, amount) {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

export default function Plate() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const loopRef = useRef(null);
  const artRef = useRef(null);
  const developedRef = useRef(false);
  const [fallback, setFallback] = useState(false);
  const [rig, setRig] = useState("aperture");
  const [developed, setDeveloped] = useState(false);
  const engine = useEngine();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return undefined;

    let ctx = null;
    try {
      ctx = canvas.getContext("2d", { alpha: false });
    } catch (error) {
      ctx = null;
    }
    if (!ctx) {
      setCanvasFailed(true);
      setFallback(true);
      return undefined;
    }

    engine.canvasFailed = false;
    engine.coarse = window.matchMedia("(pointer: coarse)").matches;
    if (engine.coarse) engine.visibilityFloor = RANGE.visibilityFloorCoarse;

    const art = {
      ctx,
      canvas,
      width: 1,
      height: 1,
      row: new Float32Array(1),
      image: null,
      strip: null,
      stripCtx: null,
      paper: null,
      readoutClock: 0,
    };
    artRef.current = art;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, Math.round(window.devicePixelRatio || 1)));
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (art.width === width && art.height === height) return;
      art.width = width;
      art.height = height;
      art.dpr = dpr;
      canvas.width = width;
      canvas.height = height;
      engine.width = width;
      engine.height = height;
      engine.centerX = width / 2;
      engine.dpr = dpr;
      art.row = new Float32Array(width);
      art.image = ctx.createImageData(width, 1);
      // drawImage 不接受 ImageData，条纹行先落进一张 1px 高的离屏画布再拉伸。
      art.strip = document.createElement("canvas");
      art.strip.width = width;
      art.strip.height = 1;
      art.stripCtx = art.strip.getContext("2d");
      art.paper = buildPaper(width, height);
      draw(art, engine);
    };

    const publish = (force) => {
      const now = performance.now();
      if (!force && now - art.readoutClock < 100) return;
      art.readoutClock = now;
      pushReadout(readoutOf(engine));
    };

    const onFrame = (dt) => {
      const reduced = loop.reduced;
      // 触屏没有"指针悬停"：按一下算作一次注视，一秒半内保持可见度。
      if (engine.coarse && engine.touchedAt && performance.now() - engine.touchedAt < 1600) {
        engine.observationTarget = 1;
      }
      stepEngine(engine, dt, reduced);
      const event = engine.event;
      if (event) {
        engine.event = null;
        applyEvent(event);
      }
      if (engine.phase !== rig) setRig(engine.phase);
      // 底片显影成墨色时，仪器自己的刻度也要翻面，否则读数看不见。
      if ((engine.darkness > 0.5) !== developedRef.current) {
        developedRef.current = engine.darkness > 0.5;
        setDeveloped(developedRef.current);
      }
      draw(art, engine);
      publish(false);
    };

    const applyEvent = (event) => {
      if (event === "interfere") {
        setPhase("interfere");
        announce("第二道缝到位，条纹开始出现。");
      } else if (event === "dark") {
        setPhase("dark");
        announce("不相容：干涉项归零。我不在了。");
      } else if (event === "demo") {
        announce("第二道缝拉开了，条纹长出来了。往下的自述，只在你看着底片时才会显影。");
      } else if (event === "third") {
        setPhase("third");
        announce("第三道缝打开，它需要一个来源。");
      } else if (event === "closed") {
        setPhase("closed");
        announce("两缝闭合。");
      } else if (event.startsWith("paragraph:")) {
        const index = Number(event.slice("paragraph:".length));
        setParagraph(index);
        announce(`第 ${index + 1} 段显影，光程已换。`);
      }
    };

    const loop = createLoop(onFrame);
    loopRef.current = loop;
    // 让装置外的控件（缝轨、读数、章节）在 reduced-motion 下也能补一帧。
    engine.loop = loop;

    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      const nearY = event.clientY > rect.top - 160 && event.clientY < rect.bottom + 80;
      const nearX = event.clientX > rect.left - 80 && event.clientX < rect.right + 80;
      engine.observationTarget = nearY && nearX ? 1 : 0;
    };
    const onDown = () => {
      engine.touchedAt = performance.now();
    };
    const onLeave = () => {
      engine.observationTarget = 0;
    };

    resize();
    draw(art, engine);
    publish(true);
    loop.start();

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("blur", onLeave);

    // 验收与调试用的引擎句柄：只读，用来在浏览器里核对真实状态。
    window.__DOUBLE_SLIT__ = {
      engine,
      art,
      readout: () => readoutOf(engine),
      step: (dt) => {
        stepEngine(engine, dt, loop.reduced);
        draw(art, engine);
        publish(true);
        return readoutOf(engine);
      },
      draw: () => draw(art, engine),
      // 同步渲染基准：后台标签里 rAF 会被节流，用它测真实每帧成本。
      bench: (frames = 60) => {
        const start = performance.now();
        for (let i = 0; i < frames; i += 1) {
          stepEngine(engine, 1 / 60, loop.reduced);
          draw(art, engine);
        }
        const total = performance.now() - start;
        return { frames, totalMs: Number(total.toFixed(2)), perFrameMs: Number((total / frames).toFixed(3)) };
      },
    };

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      loop.stop();
      delete window.__DOUBLE_SLIT__;
    };
  }, [engine]);

  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <div
      className="plate"
      ref={hostRef}
      data-rig={rig}
      data-dark={developed ? "true" : "false"}
      data-fallback={fallback ? "true" : "false"}
      role="img"
      aria-label={A11Y.plate}
    >
      <canvas className="plate__canvas" ref={canvasRef} aria-hidden="true" />

      <div className="plate__fallback" aria-hidden="false">
        <div className="fallback__fringes" />
        <p className="fallback__note">
          这台装置需要 Canvas 2D 才能逐列算出干涉强度。当前环境不支持，底片退化为静态条纹示意，
          读数与全部章节仍然可用。
        </p>
      </div>

      <p className="plate__legend" aria-hidden="true">
        <span>
          光学台 / <b>{rigLabel(rig)}</b>
        </span>
        <span>{BENCH_NOTES[rig] || IDENTITY.title}</span>
      </p>

      <div className="plate__silence" data-on={rig === "dark" ? "true" : "false"} aria-hidden="true">
        我不在了。
      </div>

      <div className="plate__stack">
        <Rail coarse={coarse} />
        <Bench />
      </div>
      <Slab />
    </div>
  );
}

function rigLabel(phase) {
  if (phase === "aperture") return "单缝";
  if (phase === "interfere") return "双缝";
  if (phase === "dark") return "不相容";
  if (phase === "third") return "第三缝";
  if (phase === "closed") return "闭合";
  return "闭合中";
}

/** 逐列采样 → 一行 RGBA → 纵向拉伸铺满底片 → 叠纸纹、渐隐与零级标记。 */
function draw(art, engine) {
  const { ctx, width, height } = art;
  if (!ctx || !art.image) return;

  sampleField(art.row, engine);

  const data = art.image.data;
  const dark = engine.darkness;
  const ink = mixTone(inkTone(engine.wavelength * 190), MARK, dark);
  const alphaFloor = dark > 0 ? 1 - dark : 0;
  const r = ink[0];
  const g = ink[1];
  const b = ink[2];

  for (let x = 0; x < width; x += 1) {
    let tone = 1 - art.row[x];
    tone = tone < 0 ? 0 : tone > 1 ? 1 : tone;
    tone = tone * (2 - tone); // 轻微的 S 曲线：亮部更亮，暗纹更实
    // 印刷留底：最深的条纹也不落到纯黑，底片始终是纸，不是洞。
    tone *= 0.7;
    const alpha = tone * (1 - alphaFloor) + (1 - tone) * alphaFloor;
    const o = x * 4;
    data[o] = r;
    data[o + 1] = g;
    data[o + 2] = b;
    data[o + 3] = Math.round(alpha * 200);
  }

  ctx.imageSmoothingEnabled = false;
  ctx.globalAlpha = 1;
  if (art.paper) ctx.drawImage(art.paper, 0, 0);

  // 熄灭：底片本身翻成墨色，图样随之变成纸上的光——两面一起翻才看得见。
  const inkRgb = inkTone(engine.wavelength * 190);
  if (dark > 0.002) {
    ctx.fillStyle = `rgb(${inkRgb.join(",")})`;
    ctx.globalAlpha = dark;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  }

  // 1px 高的条纹行纵向拉伸成一片竖直的干涉图样。
  if (art.stripCtx) {
    art.stripCtx.putImageData(art.image, 0, 0);
    ctx.drawImage(art.strip, 0, 0, width, 1, 0, 0, width, height);
  }
  ctx.imageSmoothingEnabled = true;

  // 上下渐隐的遮罩颜色也跟着一起翻面。
  const veil = mixTone(PAPER, inkRgb, dark);
  const fade = ctx.createLinearGradient(0, 0, 0, height);
  fade.addColorStop(0, `rgba(${veil.join(",")}, 1)`);
  fade.addColorStop(0.34, `rgba(${veil.join(",")}, 0)`);
  fade.addColorStop(0.7, `rgba(${veil.join(",")}, 0)`);
  fade.addColorStop(1, `rgba(${veil.join(",")}, 1)`);
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, width, height);

  // 零级条纹：真实干涉图样上会被标出来的那一条。
  const mark = dark > 0.5 ? `rgba(${MARK.join(",")}, 0.5)` : "rgba(180, 50, 31, 0.34)";
  ctx.strokeStyle = mark;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(engine.centerX + 0.5, height * 0.3);
  ctx.lineTo(engine.centerX + 0.5, height * 0.72);
  ctx.stroke();
}
