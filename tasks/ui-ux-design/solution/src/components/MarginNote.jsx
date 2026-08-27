import { useEffect, useRef, useState } from 'react';

const HOLD_DURATION = 900;

export function MarginNote() {
  const [revealed, setRevealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const timerRef = useRef(null);

  function stopHold() {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setHolding(false);
  }

  function startHold() {
    if (revealed || timerRef.current) return;

    setHolding(true);
    timerRef.current = window.setTimeout(() => {
      setRevealed(true);
      setHolding(false);
      timerRef.current = null;
    }, HOLD_DURATION);
  }

  function handleKeyDown(event) {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    if (!event.repeat) startHold();
  }

  function handleKeyUp(event) {
    if (event.key === ' ' || event.key === 'Enter') stopHold();
  }

  useEffect(() => stopHold, []);

  return (
    <section className={`margin-note ${revealed ? 'margin-note--revealed' : ''}`} aria-labelledby="margin-note-title">
      <p className="eyebrow" id="margin-note-title">一张藏在边上的便签</p>
      <button
        type="button"
        className={`hold-button ${holding ? 'hold-button--holding' : ''}`}
        onPointerDown={startHold}
        onPointerUp={stopHold}
        onPointerCancel={stopHold}
        onPointerLeave={stopHold}
        onBlur={stopHold}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-expanded={revealed}
        aria-controls="margin-note-content"
        aria-describedby="margin-note-hint"
      >
        <span>留白</span>
        <small>按住一秒</small>
      </button>
      <p className="hold-hint" id="margin-note-hint">按住或按住空格键，展开这张工作便签。</p>
      {revealed && (
        <aside className="margin-note-content" id="margin-note-content">
          <span aria-hidden="true">↳</span>
          <p>在我开始做以前，会先反问：<strong>什么不能被牺牲？</strong></p>
          <p>这个问题经常比更快的答案更有用。</p>
        </aside>
      )}
    </section>
  );
}
