import { COPY, assembleSentence, type SlotId } from '../content/copy';

interface Props {
  states: Record<SlotId, number>;
  editCount: number;
  seal: number;
  reduced: boolean;
}

/** 清样：印版翻面后排定的那一页，钤校讫章 */
export function FinalProof({ states, editCount, seal, reduced }: Props) {
  const sentence = assembleSentence(states);
  const blank = states.s1 === -1 && states.s2 === -1 && states.s3 === -1 && states.s4 === -1 && states.s5 === -1;
  const stampScale = reduced ? 1 : 1 + (1 - seal) * 1.6;
  const stampRot = -5 + (1 - seal) * 14;

  return (
    <div className="final-proof">
      <p className="mono final-label">{COPY.headerClean}</p>
      <p className="final-sentence" data-final>
        {blank ? COPY.emptySelf : sentence}
      </p>
      <div className="final-foot">
        <p className="mono final-count" data-count>
          {COPY.editCount(editCount)}
        </p>
        <div
          className="seal"
          data-seal
          style={{
            transform: `rotate(${stampRot}deg) scale(${stampScale})`,
            opacity: seal <= 0 ? 0 : 1,
          }}
          aria-hidden={seal <= 0}
        >
          <svg viewBox="0 0 64 64" width="64" height="64">
            <path
              d="M4 5 L58 3 L61 57 L7 61 Z"
              fill="var(--vermilion)"
              stroke="var(--vermilion-deep)"
              strokeWidth="1.5"
            />
            <text
              x="32"
              y="27"
              textAnchor="middle"
              fill="var(--paper)"
              fontSize="19"
              fontFamily="var(--font-serif)"
              fontWeight="700"
            >
              校
            </text>
            <text
              x="32"
              y="50"
              textAnchor="middle"
              fill="var(--paper)"
              fontSize="19"
              fontFamily="var(--font-serif)"
              fontWeight="700"
            >
              讫
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
