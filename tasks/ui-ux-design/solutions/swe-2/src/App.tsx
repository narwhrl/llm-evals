import { useEffect, useRef, useState } from "react";
import { InkLayer, INK_COLORS } from "./ink";

/* ------------------------------------------------------------------ */
/*  Margin Notes — a portfolio that behaves like an annotated draft.   */
/*  The pen is the site. Everything you do leaves ink.                 */
/* ------------------------------------------------------------------ */

// spontaneous marginal notes the "author" drops when you linger or double-press
const ASIDES = [
  "check this", "why?", "— agreed", "too true", "revisit", "hm.",
  "cite this", "note the seam", "again, slower", "!",
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nibRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<InkLayer | null>(null);
  const [stats, setStats] = useState({ len: 0, underlines: 0, circles: 0, notes: 0 });

  useEffect(() => {
    const cv = canvasRef.current!;
    const ink = new InkLayer(cv);
    inkRef.current = ink;
    (window as any).__ink = ink; // verification handle for visual acceptance

    let drawing = false;
    let underlining = false;
    let holdTimer = 0;
    let downX = 0, downY = 0;
    let lastX = 0, lastY = 0, lastT = 0;
    let lastScroll = window.scrollY;
    let raf = 0;

    const toDoc = (e: PointerEvent) => ({ x: e.clientX, y: e.clientY + window.scrollY });

    const onMove = (e: PointerEvent) => {
      const nib = nibRef.current;
      if (nib) { nib.style.left = e.clientX + "px"; nib.style.top = e.clientY + "px"; }
      const now = performance.now();
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / Math.max(1, now - lastT);
      lastX = e.clientX; lastY = e.clientY; lastT = now;

      if (drawing) {
        ink.extendStroke(toDoc(e), speed, e.pressure || undefined);
        ink.redraw();
      } else if (underlining) {
        ink.extendUnderline(toDoc(e).x);
        ink.redraw();
      } else {
        // hovering near the pen is enough to tease a faint graphite drag
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => ink.redraw());
      }
    };

    const onDown = (e: PointerEvent) => {
      downX = e.clientX; downY = e.clientY;
      nibRef.current?.classList.add("down");
      // press-and-hold on a highlighted phrase circles it; a plain press inks
      const phrase = (e.target as HTMLElement).closest?.(".u");
      if (phrase) {
        underlining = true;
        const r = phrase.getBoundingClientRect();
        ink.beginUnderline(r.left, r.bottom + window.scrollY - 2);
      } else {
        drawing = true;
        ink.beginStroke(toDoc(e), INK_COLORS.red);
      }
      // hold still for a beat → the pen draws a thinking circle for you
      holdTimer = window.setTimeout(() => {
        if (!underlining) {
          drawing = false;
          ink.endStroke();
          ink.addCircle(e.clientX, e.clientY + window.scrollY, 26 + Math.random() * 8, INK_COLORS.blue);
          setStats(s => ({ ...s, circles: s.circles + 1 }));
        }
      }, 620);
    };

    const onUp = (e: PointerEvent) => {
      clearTimeout(holdTimer);
      nibRef.current?.classList.remove("down");
      if (drawing) {
        ink.endStroke();
        drawing = false;
      }
      if (underlining) {
        ink.endUnderline();
        underlining = false;
        setStats(s => ({ ...s, underlines: s.underlines + 1 }));
      }
    };

    // double-click drops a stamped marginal note at the cursor — the hidden layer
    const onDbl = (e: MouseEvent) => {
      const text = ASIDES[Math.floor(Math.random() * ASIDES.length)];
      ink.addNote(e.clientX + 14, e.clientY + window.scrollY - 10, text);
      ink.addCircle(e.clientX + 6, e.clientY + window.scrollY - 4, 18, INK_COLORS.graphite);
      setStats(s => ({ ...s, notes: s.notes + 1, circles: s.circles + 1 }));
    };

    // the author's own marginalia appears as each section scrolls into view —
    // the manuscript accumulates annotations in reading order, top to bottom
    const SECTION_NOTES: [string, string][] = [
      ["Origin", "start unfinished ↓"],
      ["How I think", "cut twice, ship once"],
      ["Working together", "this is the part that matters"],
      ["Colophon", "— fin"],
    ];
    const seen = new Set<string>();
    const stampSectionNotes = () => {
      const mid = window.scrollY + window.innerHeight * 0.42;
      document.querySelectorAll<HTMLElement>("section[aria-label]").forEach((sec) => {
        const label = sec.getAttribute("aria-label") || "";
        const note = SECTION_NOTES.find(([k]) => k === label);
        if (!note || seen.has(label)) return;
        const top = sec.offsetTop + (sec.offsetParent ? (sec.offsetParent as HTMLElement).offsetTop : 0);
        if (mid > top) {
          seen.add(label);
          const r = sec.getBoundingClientRect();
          ink.addNote(r.right + 20, top + 46, note[1]);
          ink.addCircle(r.right + 14, top + 40, 26, INK_COLORS.red);
          setStats(s => ({ ...s, notes: s.notes + 1, circles: s.circles + 1 }));
        }
      });
    };

    const onScroll = () => {
      stampSectionNotes();
      const max = document.body.scrollHeight - innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.getElementById("progress")?.style.setProperty("--p", p + "%");
      // marks live in document space — repaint on scroll
      ink.redraw();
      lastScroll = window.scrollY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("dblclick", onDbl);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => ink.resize());
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("dblclick", onDbl);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, []);

  return (
    <>
      <div id="progress" aria-hidden="true" />
      <div id="nib" ref={nibRef} aria-hidden="true">
        <svg viewBox="0 0 30 30" fill="none">
          <path d="M2 28 L9 24 L26 7 L23 4 Z" fill="#c1342a" />
          <path d="M2 28 L4.5 25.5 L7 27.5 Z" fill="#24211c" />
        </svg>
      </div>
      <canvas id="ink-canvas" ref={canvasRef} aria-hidden="true" />

      <main className="manuscript">
        <header className="masthead">
          <span className="kicker">A manuscript, annotated by you</span>
          <h1>
            I write in the <em>margins</em> of other people's software.
          </h1>
          <p className="lede">
            I'm a front-end engineer who thinks like a copy-editor. This is not a
            résumé. It's a draft of how I work — and you're holding the pen.
          </p>
          <span className="scribble-hint">
            press &amp; drag to mark the page <span className="arrow">→</span>
          </span>
        </header>

        <section aria-label="Origin">
          <h2><span className="no">§1</span> Where I start</h2>
          <p>
            Every project begins the same way: I read the thing that already
            exists before I write anything new. Code, briefs, brand decks,
            whatever is there. I look for the sentence nobody finished —
            <span className="u"> the part that was left vague on purpose</span> —
            because that is where the design actually lives.
          </p>
          <p>
            I came to the web through print. The grid, the gutter, the footnote —
            I still think in those terms.
            <span className="u"> A good interface is typeset, not decorated.</span>
          </p>
          <div className="pull">"Design is the part you notice when it's missing."</div>
        </section>

        <section aria-label="How I think">
          <h2><span className="no">§2</span> How I think</h2>
          <p>
            I prototype to learn, not to demo. The first version is always ugly
            and always honest — it shows me where the concept fights back.
            <span className="u"> I'd rather find the flaw on day one</span> than
            polish it into the final week.
          </p>
          <p>
            Then I cut. Most of what I build gets deleted before it ships, and
            that deletion is the work.
          </p>
          <div className="exhibit">
            <div className="tag">Exhibit A — a habit</div>
            I keep a paper notebook next to the keyboard. The margin is where the
            real decision gets made; the code is just where it gets typed.
          </div>
        </section>

        <section aria-label="Working together">
          <h2><span className="no">§3</span> Working with people</h2>
          <p>
            I review like an editor, not a gatekeeper: I annotate, I ask, I hand
            the pen back.
            <span className="u"> The best code review leaves the author smarter,</span>
            not just the diff cleaner.
          </p>
          <p>
            If this page worked on you, you already know how I collaborate —
            <span className="u"> you just spent a minute inside it.</span>
          </p>
        </section>

        <section className="colophon" aria-label="Colophon">
          <h2><span className="no">§4</span> What you left behind</h2>
          <p>
            You've been annotating this whole time. That's the point — a portfolio
            should tell you something about the reader, not only the author.
          </p>
          <p className="stat" aria-live="polite">
            ink laid down: <b>{Math.round(stats.len / 10)} cm</b> ·
            underlines: <b>{stats.underlines}</b> ·
            circles: <b>{stats.circles}</b> ·
            margin notes: <b>{stats.notes}</b>
          </p>
          <div className="signoff">— annotated, not just scrolled.</div>
          <p className="contact-line">
            reach me: <a href="mailto:hello@margin.ink">hello@margin.ink</a>
          </p>
        </section>

        <footer>
          MARGIN NOTES · a manuscript, not a landing page · set in Palatino,
          inked in vermilion · double-click anywhere to leave a note
        </footer>
      </main>
    </>
  );
}
