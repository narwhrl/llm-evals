import { COPY, type SlotId } from '../content/copy';

interface Props {
  slotId: SlotId;
  text: string;
  open: boolean;
  onToggle: () => void;
  onFocusOpen: () => void;
}

/** 页边后注：铅笔灰的 ⌇，探索（悬停/聚焦/点按）才显形 */
export function MarginNotes({ slotId, text, open, onToggle, onFocusOpen }: Props) {
  return (
    <span className={`note${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="note-mark"
        data-note={slotId}
        aria-expanded={open}
        aria-label={`词位${slotId.slice(1)}的后注`}
        onClick={onToggle}
        onFocus={onFocusOpen}
      >
        {COPY.noteMark}
      </button>
      <span className="note-body" role="note">
        {text}
      </span>
    </span>
  );
}
