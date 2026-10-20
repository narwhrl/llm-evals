import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Galley } from "./components/Galley";
import { Margin } from "./components/Margin";
import { Pencil, type PencilHandle } from "./components/Pencil";
import { Press } from "./components/Press";
import { Slug } from "./components/Slug";
import { LINES, SUBTITLE, TITLE, TOTAL_MARKS } from "./content";
import {
  initialState,
  isDefect,
  markCount,
  reducer,
  stageFor,
  type ProofState,
} from "./state";
import { clack, press as pressSound, scratch, setSoundEnabled, soundEnabled, thud } from "./sound";

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [section, setSection] = useState("起点");
  const [soundOn, setSoundOn] = useState(soundEnabled());
  const [missed, setMissed] = useState<string | null>(null);
  const pencilRef = useRef<PencilHandle>(null);
  const missTimer = useRef<number | undefined>(undefined);

  const marks = useMemo(() => markCount(state), [state]);
  const stage = useMemo(() => stageFor(marks), [marks]);

  // The pencil presses whenever a mark is made, wherever the mark was made.
  useEffect(() => {
    pencilRef.current?.press();
  }, [state.trail.length]);

  const activate = useCallback(
    (id: string) => {
      if (state.blind) {
        if (isDefect(id) && !state.found.includes(id)) {
          dispatch({ type: "find", id });
          scratch(0.8);
          clack();
        } else {
          thud();
          setMissed(id);
          window.clearTimeout(missTimer.current);
          missTimer.current = window.setTimeout(() => setMissed(null), 420);
        }
        return;
      }
      const before = stageFor(markCount(state)).name;
      dispatch({ type: "mark", id });
      scratch(1);
      const after = stageFor(markCount(state) + 1).name;
      if (before !== after) window.setTimeout(() => clack(), 220);
    },
    [state],
  );

  const toggleBlind = useCallback((on: boolean) => {
    dispatch({ type: "blind", on });
    scratch(0.6);
  }, []);

  const runPress = useCallback(() => {
    if (markCount(state) === 0) return;
    dispatch({ type: "press" });
    pressSound();
  }, [state]);

  // Keyboard: B toggles the blind proof, P runs the press.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "b" || event.key === "B") {
        event.preventDefault();
        toggleBlind(!state.blind);
      } else if ((event.key === "p" || event.key === "P") && markCount(state) > 0) {
        event.preventDefault();
        runPress();
      } else if (event.key === "Escape" && state.pressed) {
        dispatch({ type: "unpress" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.blind, state.pressed, state, runPress, toggleBlind]);

  const handleSound = useCallback((on: boolean) => {
    setSoundEnabled(on);
    setSoundOn(on);
    if (on) scratch(0.5);
  }, []);

  // The sheet tightens as the copy converges.
  const style = {
    "--lead": (2.05 - Math.min(marks, TOTAL_MARKS) * 0.011).toFixed(3),
    "--ink-strength": (0.84 + Math.min(marks, TOTAL_MARKS) * 0.005).toFixed(3),
  } as React.CSSProperties;

  return (
    <div className="sheet" style={style}>
      <a className="skip" href="#galley">
        跳到正文
      </a>

      <Slug
        state={state}
        marks={marks}
        soundOn={soundOn}
        onBlind={toggleBlind}
        onPress={runPress}
        onSound={handleSound}
      />

      <main className="sheet__body">
        <div className="sheet__page">
          <div className="sheet__column">
          <span className="sheet__stamp" data-stage={stage.name} aria-hidden="true">
            {stage.name}
          </span>
          <span className="crop crop--tl" aria-hidden="true" />
          <span className="crop crop--tr" aria-hidden="true" />
          <span className="crop crop--bl" aria-hidden="true" />
          <span className="crop crop--br" aria-hidden="true" />
          <header className="sheet__head">
            <h1 className="sheet__title">{TITLE}</h1>
            <p className="sheet__subtitle">{SUBTITLE}</p>
            <p className="sheet__lede">
              这是一份关于我的自述长稿。我把它排在了纸上，还没有被校完。
              <br />
              拿红笔的是你。每一处改动，都会改变这张纸最终的样子。
            </p>
            <p className="sheet__instruction">
              点一行，就是在那一行落笔；再点一次，换一个说法。
              键盘：上下键移动，Enter 落笔，B 盲校，P 付印。
              <br />
              改到第十四处，校次会变成「付印」；那时可以上机，把这张纸印成定稿。
            </p>
          </header>

          <div id="galley">
            <Galley
              state={{ ...state, marks: { ...state.marks } }}
              onActivate={activate}
              onCaret={(index) => dispatch({ type: "caret", index })}
              onSection={setSection}
            />
          </div>

          <footer className="sheet__foot">
            <p>
              校样 · 001 · 甲 · 共 {LINES.length} 段 · 印张 220×280 · 冷白 90g ·
              等宽 12pt · 校次 {stage.name}
            </p>
          </footer>
          </div>

          <Margin
            state={state}
            section={section}
            hinted={marks >= 9 && state.found.length < 3}
          />
        </div>
      </main>

      {state.pressed && (
        <Press
          state={state}
          marks={marks}
          onReset={() => dispatch({ type: "reset" })}
          onClose={() => dispatch({ type: "unpress" })}
        />
      )}

      <Pencil ref={pencilRef} />
      {missed && (
        <span className="miss" key={missed} aria-hidden="true">
          ×
        </span>
      )}
    </div>
  );
}

export type { ProofState };
