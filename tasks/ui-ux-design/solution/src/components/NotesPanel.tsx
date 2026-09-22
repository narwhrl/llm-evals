import { useEffect, useRef } from "react";
import { NOTES, NOTES_TITLE } from "../content/copy";

interface NotesPanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * 隐藏层：注记里的工作笔记。它解释这台机器此刻在做什么，
 * 也是这件作品唯一"直说"的地方。
 */
export function NotesPanel({ open, onClose }: NotesPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="notes" role="dialog" aria-modal="false" aria-labelledby="notes-title">
      <div className="notes__panel" ref={ref} tabIndex={-1}>
        <header className="notes__head">
          <h2 id="notes-title">
            {NOTES_TITLE}
            <span className="latin"> working notes</span>
          </h2>
          <button type="button" className="notes__close" onClick={onClose}>
            合上
          </button>
        </header>
        <dl className="notes__list">
          {NOTES.map((note, index) => (
            <div className="notes__item" key={note.head}>
              <dt>
                <span className="notes__num">{String(index + 1).padStart(2, "0")}</span>
                {note.head}
              </dt>
              <dd>{note.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
