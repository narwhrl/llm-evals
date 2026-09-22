import { COPY, GHOST_LINE, type SlotId } from '../content/copy';

export interface Scrap {
  id: number;
  slotId: SlotId;
  /** 被删去时词位所在的版本序号 */
  variant: number;
  text: string;
}

export function slotLabel(id: SlotId): string {
  return `词位${id.slice(1)}`;
}

interface Props {
  scraps: Scrap[];
  ghostUnlocked: boolean;
  onRestore: (id: number) => void;
  reduced: boolean;
  listRef?: React.RefObject<HTMLUListElement>;
}

/** 废稿篓：被删去的自我堆在页边；可取回，可翻出涂改痕 */
export function Wastebasket({ scraps, ghostUnlocked, onRestore, reduced, listRef }: Props) {
  return (
    <aside className="basket" aria-label={COPY.basketLabel}>
      <div className="basket-head">
        <span className="mono">{COPY.basketLabel}</span>
        <span className="mono basket-count">{String(scraps.length).padStart(2, '0')}</span>
      </div>
      <ul className="basket-list" ref={listRef} data-basket>
        {scraps.length === 0 && <li className="basket-empty mono">{COPY.basketEmpty}</li>}
        {scraps.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="scrap-chip"
              data-scrap={s.id}
              onClick={() => onRestore(s.id)}
              aria-label={`取回「${s.text}」到${slotLabel(s.slotId)}`}
            >
              <span className="scrap-text">{s.text}</span>
            </button>
          </li>
        ))}
      </ul>
      {ghostUnlocked && (
        <p className="ghost-line" data-ghost data-reduced={reduced ? '1' : '0'}>
          <span className="mono ghost-tag">{COPY.ghostLabel}</span>
          {GHOST_LINE}
        </p>
      )}
    </aside>
  );
}
