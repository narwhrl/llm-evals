import React, { useCallback, useEffect, useRef, useState } from "react";

const ACTS = [
  { id: "hero", pass: "卷首", name: "落笔", arc: "开始", target: "top" },
  { id: "thinking", pass: "第一遍", name: "通读", arc: "开始", target: "thinking" },
  { id: "making", pass: "第二遍", name: "质疑", arc: "发展", target: "making" },
  { id: "collab", pass: "第三遍", name: "重写", arc: "转折", target: "collab" },
  { id: "finale", pass: "第四遍", name: "定稿", arc: "收束", target: "finale" },
];

const MODES = {
  desk: {
    label: "同桌审稿",
    note: "你圈哪里，我就重写哪里。适合早期：方向未定，需要高频红笔。",
    seal: "同桌已阅",
  },
  back: {
    label: "背靠背",
    note: "你定终点，我管路径。每周一次对稿，中间不打扰。适合执行期。",
    seal: "背靠背立约",
  },
  duel: {
    label: "红笔挑战",
    note: "你只准删，不准加。每一刀都要见血，留下的才是骨架。适合定稿前。",
    seal: "删后所剩皆是",
  },
};

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}

export default function App() {
  const [target, setTarget] = useState(12);
  const [eased, setEased] = useState(12);
  const [act, setAct] = useState(0);
  const [redline, setRedline] = useState(true);
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState("desk");
  const [sealed, setSealed] = useState(null);
  const [interleaf, setInterleaf] = useState(false);
  const [strokes, setStrokes] = useState(0);
  const manualAt = useRef(0);
  const dragging = useRef(false);
  const targetRef = useRef(12);
  const easedRef = useRef(12);
  const reducedRef = useRef(false);
  const canvasRef = useRef(null);
  const drawing = useRef(null);
  const pathsRef = useRef([]);
  const folioClicks = useRef([]);

  targetRef.current = target;

  /* ---- eased revision value drives --rev on <html> ---- */
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      const t = targetRef.current;
      const c = easedRef.current;
      if (reducedRef.current) {
        if (c !== t) {
          easedRef.current = t;
          setEased(t);
          document.documentElement.style.setProperty("--rev", String(t / 100));
        }
      } else if (Math.abs(t - c) > 0.05) {
        const n = c + (t - c) * 0.08;
        easedRef.current = n;
        setEased(n);
        document.documentElement.style.setProperty("--rev", String(n / 100));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.style.setProperty("--rev", String(targetRef.current / 100));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---- scroll drives revision target unless the visitor just took the pen ---- */
  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued || dragging.current) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        if (max <= 0) return;
        const p = clamp((window.scrollY / max) * 100, 0, 100);
        if (Date.now() - manualAt.current > 2500) {
          setTarget((prev) => (Math.abs(p - prev) > 1.5 ? Math.round(p) : prev));
        }
        const pos = window.scrollY + window.innerHeight * 0.4;
        let current = 0;
        for (const a of ACTS) {
          const el = document.getElementById(a.target);
          if (el && el.offsetTop <= pos) current = ACTS.indexOf(a);
        }
        setAct(current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- section wipe-in (ink, not fade-rise) ---- */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".wipe"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---- selecting text files a margin note ---- */
  const fileSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel) return;
    const text = sel.toString().trim().replace(/\s+/g, " ");
    if (text.length < 2 || text.length > 140) return;
    setNotes((prev) => {
      if (prev.some((n) => n.text === text)) return prev;
      return [...prev.slice(-5), { id: Date.now(), text }];
    });
  }, []);
  useEffect(() => {
    document.addEventListener("mouseup", fileSelection);
    document.addEventListener("keyup", fileSelection);
    return () => {
      document.removeEventListener("mouseup", fileSelection);
      document.removeEventListener("keyup", fileSelection);
    };
  }, [fileSelection]);

  /* ---- hidden interleaf: triple-click the folio, or press R ---- */
  const folioClick = useCallback(() => {
    const now = Date.now();
    folioClicks.current = [...folioClicks.current, now].slice(-3);
    const [a, , c] = folioClicks.current;
    if (folioClicks.current.length === 3 && c - a < 900) {
      setInterleaf((v) => !v);
      folioClicks.current = [];
    }
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "r" && e.key !== "R") return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
      setInterleaf((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---- annotation canvas ---- */
  const redraw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const r = cv.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    ctx.strokeStyle = "#c0392b";
    for (const p of pathsRef.current) {
      if (p.length < 2) continue;
      ctx.lineWidth = p.w || 2.4;
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
      ctx.stroke();
    }
  }, []);
  const fitCanvas = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    cv.width = Math.max(1, Math.round(r.width * dpr));
    cv.height = Math.max(1, Math.round(r.height * dpr));
    const ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    redraw();
  }, [redraw]);
  const onUp = () => {
    if (!drawing.current) return;
    if (drawing.current.pts.length > 1) {
      pathsRef.current = [
        ...pathsRef.current,
        Object.assign(drawing.current.pts, { w: drawing.current.w }),
      ];
      setStrokes((s) => s + 1);
    }
    drawing.current = null;
  };
  const canvasPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const onDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    canvasRef.current.setPointerCapture(e.pointerId);
    drawing.current = { pts: [canvasPos(e)], w: 2.4 };
  };
  const onMove = (e) => {
    if (!drawing.current) return;
    const [x, y] = canvasPos(e);
    const pts = drawing.current.pts;
    const last = pts[pts.length - 1];
    if (Math.hypot(x - last[0], y - last[1]) < 2) return;
    pts.push([x, y]);
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = drawing.current.w;
    ctx.beginPath();
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const addStroke = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    const r = cv.getBoundingClientRect();
    const y = r.height * (0.25 + Math.random() * 0.5);
    const pts = [];
    for (let x = r.width * 0.12; x <= r.width * 0.88; x += 8) {
      pts.push([x, y + Math.sin(x / 34) * 7]);
    }
    pathsRef.current = [...pathsRef.current, Object.assign(pts, { w: 2.4 })];
    redraw();
    setStrokes((s) => s + 1);
  };
  const clearStrokes = () => {
    pathsRef.current = [];
    redraw();
    setStrokes(0);
  };

  const setManual = (v) => {
    manualAt.current = Date.now();
    setTarget(clamp(Math.round(v), 0, 100));
  };

  const stamp = () => {
    setSealed({ at: new Date(), rev: Math.round(easedRef.current), mode });
  };

  const rev = Math.round(eased);
  const draftTone = rev < 34 ? "草稿" : rev < 67 ? "二校" : rev < 90 ? "三校" : "定稿";

  return (
    <>
      <a className="skip" href="#main">跳到正文</a>
      <div className="progress" aria-hidden="true" />

      <header className="mast">
        <button className="folio" onClick={folioClick} title="页码（连击三次有夹页）" aria-label="页码，第 1 页，连击三次打开隐藏夹页">
          Nº 1 <span className="folio-dot" aria-hidden="true">·</span> <span className="folio-state">{draftTone}</span>
        </button>
        <p className="mast-title">初稿与红笔 <span lang="en">A Manuscript Under Revision</span></p>
        <nav className="mast-nav" aria-label="章节">
          <a href="#thinking">通读</a>
          <a href="#making">质疑</a>
          <a href="#collab">重写</a>
          <a href="#finale">定稿</a>
        </nav>
        <p className="mast-rev" aria-live="polite">修订度 {rev}%</p>
      </header>

      <div className="sheet" id="main">
        <aside className="rail" aria-label="审稿四遍">
          <ol>
            {ACTS.map((a, i) => (
              <li key={a.id} className={i === act ? "on" : i < act ? "done" : ""}>
                <a href={`#${a.target}`}>
                  <span className="rail-pass">{a.pass}</span>
                  <span className="rail-name">{a.name}</span>
                  <span className="rail-arc">{a.arc}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="rail-hint">
            <p>试着选中任意一段话——它会被收进右侧批注栏。</p>
            <p>
              按 <kbd>R</kbd> 或连击页码，有夹页。
            </p>
          </div>
        </aside>

        <main className="body">
          {/* ——— 卷首 · 落笔 ——— */}
          <section className="hero wipe" id="top" aria-labelledby="hero-title">
            <p className="kicker">关于我 · 一份正在被修订的手稿</p>
            <h1 id="hero-title" className={"hero-title" + (rev > 70 ? " settled" : "")}>
              <span className="draft-line" aria-hidden={!redline}>
                我是一份{redline ? <s>写完就不改</s> : "写完就不改"}的初稿，
              </span>
              <span className="clean-line">
                我是一份<span className="ink">请你动笔</span>的初稿。
              </span>
            </h1>
            <p className="lede">
              我是与你同桌审稿的人：白天写界面，晚上改句子。相信好设计和好文章一样，
              都是改出来的——所以这一页的终稿，由你的手完成。
            </p>

            <div className="device" role="group" aria-labelledby="device-title">
              <div className="device-head">
                <h2 id="device-title">核心装置 · 红笔修订度</h2>
                <p>
                  拖动红笔，或向下滚动：整页从<span className="mono">草稿</span>走向
                  <span className="mono">定稿</span>。删改线浮现、批注长出、纸面收紧——同一个
                  <span className="mono">--rev</span> 驱动全站。
                </p>
              </div>
              <label className="pen" htmlFor="rev">
                <span className="pen-cap" aria-hidden="true" />
                <input
                  id="rev"
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(target)}
                  onChange={(e) => setManual(Number(e.target.value))}
                  onPointerDown={() => { dragging.current = true; }}
                  onPointerUp={() => { dragging.current = false; manualAt.current = Date.now(); }}
                  aria-valuetext={`修订度 ${Math.round(target)}%，${draftTone}`}
                />
                <span className="pen-scale" aria-hidden="true"><span>草稿 0</span><span>定稿 100</span></span>
              </label>

              <figure className="board">
                <figcaption>
                  批注板 · 在这里直接下笔（手指、鼠标均可；键盘用下方按钮）。已落笔 <span aria-live="polite">{strokes}</span> 笔。
                </figcaption>
                <canvas
                  ref={canvasRef}
                  className="board-canvas"
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                  role="img"
                  aria-label="批注板：用红笔圈点删改，笔迹会保留在纸面上"
                />
                <div className="board-actions">
                  <button type="button" onClick={addStroke}>键盘落一笔</button>
                  <button type="button" onClick={clearStrokes}>擦掉笔迹</button>
                  <button type="button" onClick={() => setRedline((v) => !v)} aria-pressed={redline}>
                    {redline ? "隐去删改线" : "显示删改线"}
                  </button>
                </div>
              </figure>
            </div>
          </section>

          {interleaf && (
            <section className="interleaf wipe in" aria-label="隐藏夹页">
              <p className="kicker">夹页 · 只给动手的人</p>
              <h2>红笔之下的上一稿</h2>
              <p>
                第一稿的我写的是「全栈创意工程师」，被我亲手删掉了——头衔越大，纸越空。
                现在只剩三句真话：我改稿比写稿快；我敢删自己的得意句；定稿前夜我会把字号调小两磅再看一遍。
              </p>
              <p className="mono">（再按 R 或连击页码收起夹页。）</p>
            </section>
          )}

          {/* ——— 第一遍 · 通读 ——— */}
          <section className="chapter wipe" id="thinking" aria-labelledby="thinking-h">
            <p className="kicker">第一遍 · 通读 —— 开始</p>
            <h2 id="thinking-h" className="chapter-title">我如何思考</h2>
            <p className="chapter-lede">先读顺，再读真。我的三条工作信条：</p>
            <ol className="creed">
              <li>
                <span className="n" aria-hidden="true">§1</span>
                <p><strong>概念先行，装饰靠边。</strong>每一稿先写一句话命题；{redline && <s>好看的先留着</s>} <ins>命题之外的先删掉</ins>。</p>
              </li>
              <li>
                <span className="n" aria-hidden="true">§2</span>
                <p><strong>先有效，再有味。</strong>信息读得懂是底线，{redline && <s>动效拉满</s>} <ins>节奏准确</ins>才是风格。</p>
              </li>
              <li>
                <span className="n" aria-hidden="true">§3</span>
                <p><strong>把修改权交出去。</strong>草稿属于作者，定稿属于读者——所以你在这一页的每一笔都算数。</p>
              </li>
            </ol>
          </section>

          {/* ——— 第二遍 · 质疑 ——— */}
          <section className="chapter wipe" id="making" aria-labelledby="making-h">
            <p className="kicker">第二遍 · 质疑 —— 发展</p>
            <h2 id="making-h" className="chapter-title">我如何创造</h2>
            <p className="chapter-lede">我的工作流就是审稿的四遍，每一遍只干一件事：</p>
            <ol className="passes">
              <li><strong>通读</strong><span>搭骨架：信息分了几章？每章一句话是什么？</span></li>
              <li><strong>质疑</strong><span>删装饰：没有理由的发光、卡片、动画，全部拿掉。</span></li>
              <li><strong>重写</strong><span>定节奏：转场必须有因果，动效必须有重量。</span></li>
              <li><strong>定稿</strong><span>校小样：移动端、键盘、降级，一条一条过。</span></li>
            </ol>
            <p className="note-line">这一页没有用任何重型 3D 或动效库：纸、墨、红笔三样，CSS 加一小块 Canvas 足矣。加载慢一秒，概念就碎一分。</p>
          </section>

          {/* ——— 第三遍 · 重写 ——— */}
          <section className="chapter wipe" id="collab" aria-labelledby="collab-h">
            <p className="kicker">第三遍 · 重写 —— 转折</p>
            <h2 id="collab-h" className="chapter-title">我如何与你协作</h2>
            <p className="chapter-lede">选一种合作模式，页边的批注与最后的印章都会跟着变——你的选择真的改写了这一页：</p>
            <fieldset className="modes">
              <legend className="sr">合作模式（三选一）</legend>
              {Object.entries(MODES).map(([key, m]) => (
                <label key={key} className={mode === key ? "mode on" : "mode"}>
                  <input type="radio" name="mode" value={key} checked={mode === key} onChange={() => setMode(key)} />
                  <span className="mode-label">{m.label}</span>
                  <span className="mode-note">{m.note}</span>
                </label>
              ))}
            </fieldset>
          </section>

          {/* ——— 第四遍 · 定稿 ——— */}
          <section className="chapter wipe finale" id="finale" aria-labelledby="finale-h">
            <p className="kicker">第四遍 · 定稿 —— 收束</p>
            <h2 id="finale-h" className="chapter-title">请盖章</h2>
            <p className="chapter-lede">
              当前模式：<strong>{MODES[mode].label}</strong>——{MODES[mode].note}
            </p>
            <div className="seal-row">
              <button type="button" className="stamp-btn" onClick={stamp}>
                {sealed ? "再盖一枚" : "盖下定稿印"}
              </button>
              <button type="button" className="ghost-btn" onClick={() => window.print()}>打印 / 存 PDF</button>
            </div>
            {sealed && (
              <p className="sealed-line" aria-live="polite">
                已定稿 · 修订度 {sealed.rev}% · {MODES[sealed.mode].seal} ·
                批注 {notes.length} 条 · 笔迹 {strokes} 笔
              </p>
            )}
            <div className={"seal" + (sealed ? " set" : "")} aria-hidden="true">
              <span>{sealed ? MODES[sealed.mode].seal : "虚位以待"}</span>
            </div>
            <dl className="colophon">
              <div><dt>纸</dt><dd>#FAF6EE · 墨 #1C1A16 · 朱砂 #C0392B · 花青 #274C77</dd></div>
              <div><dt>字</dt><dd>系统宋体 / Georgia 标题 · 系统黑体正文 · 等宽字体注文</dd></div>
              <div><dt>术</dt><dd>React + Vite，无动效库；一支 Canvas 红笔，一个 --rev 全站联动</dd></div>
              <div><dt>例外</dt><dd>减弱动态偏好下全部过渡直达终态；键盘可完成全部操作；离线本地可构建</dd></div>
            </dl>
          </section>

          <footer className="foot">
            <p>初稿与红笔 · 写于 2026 · 终稿由每一位动笔的访客完成</p>
            <p className="mono">不做的三件事：见 RESULTS.md「三不做」。</p>
          </footer>
        </main>

        <aside className="margin" aria-label="页边批注">
          <section className="margin-card">
            <h2>页边</h2>
            <p className="margin-mode">{MODES[mode].label} · {MODES[mode].note}</p>
          </section>
          <section className="margin-card notes-card">
            <h2>你圈出的句子（{notes.length}）</h2>
            {notes.length === 0 ? (
              <p className="margin-empty">选中正文任意一句试试——它会被抄到这里，成为你专属的批注。</p>
            ) : (
              <ol>
                {notes.map((n) => (
                  <li key={n.id}>「{n.text}」</li>
                ))}
              </ol>
            )}
            {notes.length > 0 && (
              <button type="button" className="ghost-btn" onClick={() => setNotes([])}>清空批注</button>
            )}
          </section>
          <section className="margin-card">
            <h2>校对记</h2>
            <p>修订度 {rev}% · {draftTone} · 笔迹 {strokes} 笔</p>
            <p>删改线 {redline ? "显示中" : "已隐去"} · 夹页 {interleaf ? "展开" : "未动"} · 印章 {sealed ? "已盖" : "虚位"}</p>
          </section>
        </aside>
      </div>
    </>
  );
}
