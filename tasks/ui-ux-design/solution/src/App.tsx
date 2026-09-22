import { useCallback, useEffect, useRef, useState } from 'react';
import { COPY, type SlotId } from './content/copy';
import { createPaperGrain } from './engine/paper';
import { flipProgress, sealProgress } from './engine/timeline';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useReducedMotion } from './hooks/useReducedMotion';
import { PencilCursor } from './components/PencilCursor';
import { ProofStrip, emptyStates } from './components/ProofStrip';
import { Colophon } from './components/Colophon';
import type { MarksHandle } from './components/MarksLayer';
import type { Scrap } from './components/Wastebasket';

const ZERO = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 };

export default function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(trackRef);
  const reduced = useReducedMotion();

  const marksRef = useRef<MarksHandle>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLUListElement>(null);

  const [states, setStates] = useState(emptyStates);
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [counts, setCounts] = useState<Record<SlotId, number>>({ ...ZERO });
  const [editCount, setEditCount] = useState(0);
  const [ghostUnlocked, setGhostUnlocked] = useState(false);
  const [dropTick, setDropTick] = useState<Record<SlotId, number>>({ ...ZERO });
  const [live, setLive] = useState('');

  // 纸纹只在开局铺一次
  useEffect(() => {
    const url = createPaperGrain();
    if (url) document.body.style.backgroundImage = `url(${url})`;
  }, []);

  const announce = useCallback((msg: string) => {
    setLive(msg);
  }, []);

  const setState = useCallback((id: SlotId, v: number) => {
    setStates((s) => ({ ...s, [id]: v }));
    setEditCount((n) => n + 1);
  }, []);

  const bumpDrop = useCallback((id: SlotId) => {
    setDropTick((d) => ({ ...d, [id]: d[id] + 1 }));
  }, []);

  const handleReset = useCallback(() => {
    setStates(emptyStates());
    setScraps([]);
    setCounts({ ...ZERO });
    setEditCount(0);
    setGhostUnlocked(false);
    setDropTick({ ...ZERO });
    marksRef.current?.clearStrikes();
    setLive('已回到初稿');
  }, []);

  const flip = flipProgress(progress);
  const seal = sealProgress(progress);

  return (
    <>
      <a className="skip-link mono" href="#strip">
        {COPY.skipToProof}
      </a>
      <div className="visually-hidden" aria-live="polite" data-live>
        {live}
      </div>
      <PencilCursor active={progress >= 0.3 && flip < 0.5} reduced={reduced} />

      <div ref={trackRef} className="scroll-track" data-track>
        <div className="stage">
          <div
            className={`plate${reduced ? ' no-flip' : ''}${flip >= 0.5 ? ' is-clean' : ''}`}
            style={reduced ? undefined : { transform: `rotateX(${flip * 180}deg)` }}
            data-plate
          >
            <ProofStrip
              progress={progress}
              reduced={reduced}
              marksRef={marksRef}
              faceRef={faceRef}
              basketRef={basketRef}
              states={states}
              setState={setState}
              scraps={scraps}
              setScraps={setScraps}
              counts={counts}
              setCounts={setCounts}
              editCount={editCount}
              ghostUnlocked={ghostUnlocked}
              setGhostUnlocked={setGhostUnlocked}
              announce={announce}
              dropTick={dropTick}
              bumpDrop={bumpDrop}
              onReset={handleReset}
              seal={seal}
            />
          </div>
        </div>
      </div>

      <Colophon onReset={handleReset} />
    </>
  );
}
