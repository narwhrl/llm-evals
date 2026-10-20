import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface PencilHandle {
  /** Presses the tip down, as if a stroke had been made. */
  press: () => void;
}

/**
 * The editor's red pencil.
 *
 * It follows the pointer with a little lag so that it feels like an object
 * with mass rather than a cursor, and it dips when the visitor makes a mark.
 * It is hidden on coarse pointers, where a finger already is the pencil.
 */
export const Pencil = forwardRef<PencilHandle>(function Pencil(_props, ref) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const pressed = useRef(0);
  const visible = useRef(false);

  useImperativeHandle(ref, () => ({
    press() {
      pressed.current = 1;
    },
  }));

  useEffect(() => {
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        visible.current = false;
        return;
      }
      target.current = { x: event.clientX, y: event.clientY };
      visible.current = true;
    };
    const onLeave = () => {
      visible.current = false;
    };

    const tick = () => {
      const root = rootRef.current;
      const tip = tipRef.current;
      if (root && tip) {
        current.current.x += (target.current.x - current.current.x) * 0.24;
        current.current.y += (target.current.y - current.current.y) * 0.24;
        pressed.current = Math.max(0, pressed.current - 0.055);
        const dip = Math.sin(pressed.current * Math.PI) * 7;
        const tilt = -24 + Math.sin(pressed.current * Math.PI) * 11;
        root.style.transform = `translate3d(${current.current.x}px, ${current.current.y + dip}px, 0)`;
        root.style.opacity = visible.current ? "1" : "0";
        tip.style.transform = `translate(-22px, -132px) rotate(${tilt}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pencil" ref={rootRef} aria-hidden="true">
      <div className="pencil__body" ref={tipRef}>
        <svg viewBox="0 0 44 132" width="44" height="132">
          <defs>
            <linearGradient id="pencilWood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c8a97e" />
              <stop offset="0.55" stopColor="#e4cb9f" />
              <stop offset="1" stopColor="#b8996d" />
            </linearGradient>
          </defs>
          <path d="M22 132 L13 112 L31 112 Z" fill="#e6d3ae" />
          <path d="M22 132 L17.5 118 L26.5 118 Z" fill="#2b2724" />
          <rect x="11" y="34" width="22" height="78" fill="url(#pencilWood)" />
          <rect x="11" y="34" width="22" height="9" fill="#b0352a" />
          <rect x="11" y="43" width="22" height="6" fill="#8d2a21" />
          <rect x="11" y="30" width="22" height="5" rx="1" fill="#9aa0a6" />
        </svg>
      </div>
    </div>
  );
});
