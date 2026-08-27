import { useEffect, useRef, useState } from 'react';

const HOLD_DELAY = 540;

export function HoldMark({ active, onRevealChange }) {
  const timerRef = useRef(0);
  const [holding, setHolding] = useState(false);

  const cancelTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
  };

  const beginHold = () => {
    if (holding) return;
    setHolding(true);
    cancelTimer();
    timerRef.current = window.setTimeout(() => {
      timerRef.current = 0;
      onRevealChange(true);
    }, HOLD_DELAY);
  };

  const endHold = () => {
    cancelTimer();
    setHolding(false);
    onRevealChange(false);
  };

  useEffect(() => () => cancelTimer(), []);

  return (
    <button
      aria-label="按住查看这次决定删去的其他路径；使用辅助技术时可激活以切换"
      aria-pressed={active}
      className={`hold-mark${holding ? ' is-holding' : ''}`}
      onBlur={endHold}
      onClick={(event) => {
        if (event.detail === 0) onRevealChange(!active);
      }}
      onContextMenu={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          beginHold();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter' || event.key === ' ') endHold();
      }}
      onPointerCancel={endHold}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        beginHold();
      }}
      onPointerUp={endHold}
      type="button"
    >
      <span className="hold-mark__target" aria-hidden="true">
        <span />
      </span>
      <span className="hold-mark__label">
        <span lang="en">HOLD</span>
        <span>看见删去</span>
      </span>
    </button>
  );
}
