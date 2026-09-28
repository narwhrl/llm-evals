import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import {
  BODY,
  COPY,
  SLOTS,
  SLOT_ORDER,
  assembleSentence,
  type SlotId,
} from '../content/copy';
import {
  easeOutCubic,
  easePress,
  flipProgress,
  seg,
  deleProgress,
} from '../engine/timeline';
import { tearPose, TEAR_MS } from '../engine/tear';
import { MarksLayer, type MarksHandle } from './MarksLayer';
import { MarginNotes } from './MarginNotes';
import { Wastebasket, slotLabel, type Scrap } from './Wastebasket';
import { FinalProof } from './FinalProof';

type States = Record<SlotId, number>;

const INITIAL: States = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 };

export interface ProofStripProps {
  progress: number;
  reduced: boolean;
  marksRef: RefObject<MarksHandle>;
  faceRef: RefObject<HTMLDivElement>;
  basketRef: RefObject<HTMLUListElement>;
  states: States;
  /** 只记「删改」次数；取回不计 */
  setState: (id: SlotId, v: number) => void;
  /** 只记「删改」次数；取回不计 */
  bumpEdit: () => void;
  scraps: Scrap[];
  setScraps: React.Dispatch<React.SetStateAction<Scrap[]>>;
  counts: Record<SlotId, number>;
  setCounts: React.Dispatch<React.SetStateAction<Record<SlotId, number>>>;
  editCount: number;
  ghostUnlocked: boolean;
  setGhostUnlocked: (v: boolean) => void;
  announce: (msg: string) => void;
  dropTick: Record<SlotId, number>;
  bumpDrop: (id: SlotId) => void;
  onReset: () => void;
  seal: number;
}

/** 把元素矩形换算到印版正面坐标系 */
function boxIn(el: HTMLElement, base: HTMLElement) {
  const r = el.getBoundingClientRect();
  const b = base.getBoundingClientRect();
  return { x: r.left - b.left, y: r.top - b.top, w: r.width, h: r.height };
}

export function ProofStrip(props: ProofStripProps) {
  const {
    progress,
    reduced,
    marksRef,
    faceRef,
    basketRef,
    states,
    setState,
    bumpEdit,
    scraps,
    setScraps,
    counts,
    setCounts,
    editCount,
    ghostUnlocked,
    setGhostUnlocked,
    announce,
    dropTick,
    bumpDrop,
    seal,
  } = props;

  const [openNote, setOpenNote] = useState<SlotId | null>(null);
  const slotRefs = useRef<Record<SlotId, HTMLButtonElement | null>>({
    s1: null,
    s2: null,
    s3: null,
    s4: null,
    s5: null,
  });
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const scrapId = useRef(1);

  const flip = flipProgress(progress);
  const dele = deleProgress(progress);
  const interactive = progress >= 0.34 && flip < 0.03;

  // 封面的标题是「未干」的：随滚动定影，而不是从透明里淡入
  const titleT = reduced ? 1 : easeOutCubic(seg(progress, 0, 0.065));
  const pressAt = useCallback(
    (i: number) => (reduced ? 1 : seg(progress, 0.1 + i * 0.026, 0.152 + i * 0.026)),
    [progress, reduced],
  );

  const spawnTear = useCallback(
    (text: string, from: DOMRect, base: HTMLElement) => {
      if (reduced) return;
      const b = base.getBoundingClientRect();
      const basket = basketRef.current;
      const t = basket
        ? (() => {
            const r = basket.getBoundingClientRect();
            return { x: r.left - b.left + r.width / 2, y: r.top - b.top + 18 };
          })()
        : { x: base.clientWidth - 60, y: base.clientHeight - 60 };
      const local = {
        left: from.left - b.left,
        top: from.top - b.top,
        width: from.width,
        height: from.height,
      };

      const ghost = document.createElement('div');
      ghost.className = 'tear-ghost';
      ghost.textContent = text;
      base.appendChild(ghost);
      const start = performance.now();
      const step = (now: number) => {
        const t01 = Math.min(1, (now - start) / TEAR_MS);
        const pose = tearPose(t01, local, t);
        ghost.style.transform = `translate(${pose.x}px, ${pose.y}px) rotate(${pose.rot}deg) scale(${pose.scaleX}, ${pose.scaleY})`;
        ghost.style.opacity = String(pose.opacity);
        if (t01 < 1) requestAnimationFrame(step);
        else ghost.remove();
      };
      requestAnimationFrame(step);
    },
    [basketRef, reduced],
  );

  const restore = useCallback(
    (scrapDbId: number) => {
      const scrap = scraps.find((s) => s.id === scrapDbId);
      if (!scrap) return;
      const cur = states[scrap.slotId];
      if (cur === scrap.variant) return;
      setScraps((s) => {
        const rest = s.filter((x) => x.id !== scrapDbId);
        return cur < 0
          ? rest
          : [
              ...rest,
              {
                id: scrapId.current++,
                slotId: scrap.slotId,
                variant: cur,
                text: SLOTS[scrap.slotId].cycle[cur],
              },
            ];
      });
      setState(scrap.slotId, scrap.variant);
      bumpDrop(scrap.slotId);
      announce(`已把「${scrap.text}」放回${slotLabel(scrap.slotId)}`);
    },
    [announce, bumpDrop, scraps, setScraps, setState, states],
  );

  const strike = useCallback(
    (id: SlotId) => {
      const el = slotRefs.current[id];
      const face = faceRef.current;
      if (!el || !face || !interactive) return;
      const cur = states[id];

      // 删空的词位：点按＝从废稿篓取回最近一稿
      if (cur < 0) {
        const mine = [...scraps].reverse().find((s) => s.slotId === id);
        if (mine) restore(mine.id);
        else announce(`${slotLabel(id)}的废稿篓是空的`);
        return;
      }

      const wordEl = el.querySelector<HTMLElement>('.slot-word') ?? el;
      const rect = wordEl.getBoundingClientRect();
      const box = boxIn(wordEl, face);
      marksRef.current?.addStrike(`${id}-${counts[id]}-s`, box, true);
      spawnTear(SLOTS[id].cycle[cur], rect, face);

      const next = cur === 2 ? -1 : cur + 1;
      const n = counts[id] + 1;
      setState(id, next);
      bumpEdit();
      setCounts((c) => ({ ...c, [id]: n }));
      setScraps((s) => [
        ...s,
        { id: scrapId.current++, slotId: id, variant: cur, text: SLOTS[id].cycle[cur] },
      ]);
      bumpDrop(id);
      if (next >= 0) marksRef.current?.addInsert(`${id}-${n}-i`, boxIn(el, face));
      if (n >= 3 && !ghostUnlocked) setGhostUnlocked(true);
      navigator.vibrate?.(12);
      announce(
        next < 0
          ? `词位${id.slice(1)}已删空，废稿篓可取回`
          : `已删去「${SLOTS[id].cycle[cur]}」，换为「${SLOTS[id].cycle[next]}」`,
      );
    },
    [
      announce,
      bumpDrop,
      bumpEdit,
      counts,
      faceRef,
      ghostUnlocked,
      interactive,
      marksRef,
      restore,
      scraps,
      setCounts,
      setGhostUnlocked,
      setScraps,
      setState,
      spawnTear,
      states,
    ],
  );

  const onStripKeyDown = (e: React.KeyboardEvent) => {
    const id = (e.target as HTMLElement).closest<HTMLElement>('[data-slot]')?.dataset
      .slot as SlotId | undefined;
    if (!id) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const idx = SLOT_ORDER.indexOf(id);
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const nx = SLOT_ORDER[(idx + dir + SLOT_ORDER.length) % SLOT_ORDER.length];
      slotRefs.current[nx]?.focus();
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      const mine = [...scraps].reverse().find((s) => s.slotId === id);
      if (mine) restore(mine.id);
      else announce(`${slotLabel(id)}的废稿篓是空的`);
    }
    if (e.key === 'n' || e.key === 'N') {
      const def = SLOTS[id];
      if (def.note) setOpenNote((o) => (o === id ? null : id));
    }
  };

  useEffect(() => {
    if (!interactive) setOpenNote(null);
  }, [interactive]);

  let tokenIndex = 0;
  const prompt = editCount > 0 ? COPY.promptAfterEdit : COPY.promptInitial;

  return (
    <>
      <div className="plate-face plate-front" ref={faceRef} data-front>
        <MarksLayer ref={marksRef} dele={dele} reduced={reduced} sink={flip} targetRef={bodyRef} />
        <div className="rail mono" aria-hidden="true">
          <span className="rail-label">{COPY.feedLabel}</span>
          <span className="rail-track">
            <span className="rail-fill" style={{ height: `${progress * 100}%` }} />
          </span>
          <span className="rail-pct">{String(Math.round(progress * 100)).padStart(2, '0')}</span>
        </div>

        <div className="measure">
          <header className="sheet-head mono">
            <span>
              {COPY.titleCn} / {COPY.titleEn}
            </span>
            <span data-header-state>{progress < 0.8 ? COPY.headerDraft : COPY.headerClean}</span>
          </header>

          <div className="reg reg-tl" aria-hidden="true" />
          <div className="reg reg-br" aria-hidden="true" />

          <div
            className="title-block"
            style={{
              transform: `rotate(${(1 - titleT) * -1.6}deg) scale(${1.04 - titleT * 0.04})`,
              filter: `blur(${(1 - titleT) * 2.2}px)`,
              opacity: 0.55 + titleT * 0.45,
            }}
          >
            <h1 className="title-cn">
              <span className="title-glyph">{COPY.titleCn}</span>
            </h1>
            <p className="title-en mono">{COPY.titleEn}</p>
            <p className="title-sub">{COPY.subtitle}</p>
          </div>

          <p className="body-line" ref={bodyRef} onKeyDown={onStripKeyDown} data-strip>
            {BODY.map((part) => {
              const i = tokenIndex++;
              const t = pressAt(i);
              const press = {
                transform: `translateY(${(1 - easePress(t)) * -0.55}em) scale(${1 + (1 - t) * 0.13})`,
                filter: `blur(${(1 - t) * 3.5}px)`,
                opacity: Math.min(1, t * 1.4),
              };
              if (part.kind === 'text') {
                return (
                  <span key={`t${i}`} className="tok tok-text" style={press}>
                    {part.value}
                  </span>
                );
              }
              const def = SLOTS[part.id];
              const cur = states[part.id];
              return (
                <span key={part.id} className="tok tok-slot" style={press}>
                  <button
                    type="button"
                    ref={(el) => {
                      slotRefs.current[part.id] = el;
                    }}
                    className={`slot${cur < 0 ? ' is-empty' : ''}`}
                    data-slot={part.id}
                    disabled={!interactive}
                    onClick={() => strike(part.id)}
                    aria-label={
                      cur < 0
                        ? `${slotLabel(part.id)}，已删空，按 Enter 或 Backspace 从废稿篓取回`
                        : `${slotLabel(part.id)}，当前「${def.cycle[cur]}」，按 Enter 删改`
                    }
                  >
                    <span className="slot-word" key={`${part.id}-${cur}-${dropTick[part.id]}`}>
                      {cur < 0 ? '' : def.cycle[cur]}
                    </span>
                  </button>
                  {def.note && (
                    <MarginNotes
                      slotId={part.id}
                      text={def.note}
                      open={openNote === part.id}
                      onToggle={() => setOpenNote((o) => (o === part.id ? null : part.id))}
                      onFocusOpen={() => setOpenNote(part.id)}
                    />
                  )}
                </span>
              );
            })}
          </p>

          {openNote && SLOTS[openNote].note && (
            <div className="note-float" role="note" data-note-body={openNote}>
              <span className="mono note-float-tag">后注 / {openNote.toUpperCase()}</span>
              {SLOTS[openNote].note}
            </div>
          )}

          <p className="prompt" data-prompt>
            {prompt}
            <span className="prompt-hint mono">划词 / Enter 删改 · Backspace 取回 · N 后注</span>
          </p>

          <aside className="preview" data-preview>
            <p className="mono preview-label">{COPY.previewLabel}</p>
            <p className="preview-sentence">
              {editCount === 0 ? (
                <span className="preview-quiet">（尚未动笔）</span>
              ) : (
                assembleSentence(states)
              )}
            </p>
          </aside>
        </div>

        <div className="margin">
          <Wastebasket
            scraps={scraps}
            ghostUnlocked={ghostUnlocked}
            onRestore={restore}
            reduced={reduced}
            listRef={basketRef}
          />
        </div>

        <div className="cover-hint mono" style={{ opacity: progress < 0.06 ? 1 : 0 }}>
          向下滚动 = 走纸
        </div>

        <div
          className="condemned-tag mono"
          style={{ opacity: dele > 0.85 ? Math.min(1, (dele - 0.85) / 0.1) : 0 }}
        >
          —— 整句判死
        </div>
      </div>

      <div className="plate-face plate-back" data-back>
        <FinalProof states={states} editCount={editCount} seal={seal} reduced={reduced} />
      </div>
    </>
  );
}

export function emptyStates(): States {
  return { ...INITIAL };
}
