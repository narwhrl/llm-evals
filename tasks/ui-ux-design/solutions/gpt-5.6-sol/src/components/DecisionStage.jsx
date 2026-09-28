import { useRef } from 'react';
import { useDecisionCanvas } from '../hooks/useDecisionCanvas.js';
import {
  integerPercentages,
  pointToWeights,
  weightsToPoint,
} from '../lib/decisionMath.js';
import { CalibrationControls } from './CalibrationControls.jsx';
import { HoldMark } from './HoldMark.jsx';

const STATE_LABELS = [
  '过量：路径仍未决定',
  '倾听：约束开始改变路径',
  '加压：三股张力正在校准',
  '刀口：等待一个明确决定',
  '留下：形状已获得立场',
];

function stateIndexForProgress(progress, committed) {
  if (committed) return 4;
  if (progress < 0.2) return 0;
  if (progress < 0.43) return 1;
  if (progress < 0.66) return 2;
  return 3;
}

export function DecisionStage({
  weights,
  onWeightsChange,
  progress,
  committed,
  revealDiscarded,
  onRevealChange,
  reducedMotion,
  voice,
}) {
  const canvasRef = useRef(null);
  const fieldRef = useRef(null);
  const draggingRef = useRef(false);
  const point = weightsToPoint(weights);
  const percentages = integerPercentages(weights);
  const stateIndex = stateIndexForProgress(progress, committed);

  useDecisionCanvas({
    canvasRef,
    weights,
    progress,
    committed,
    revealDiscarded,
    reducedMotion,
  });

  const updateFromPointer = (event) => {
    const bounds = fieldRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    onWeightsChange(pointToWeights(x, y));
  };

  const moveHandle = (event) => {
    const step = event.shiftKey ? 0.08 : 0.025;
    let x = point.x;
    let y = point.y;

    if (event.key === 'ArrowLeft') x -= step;
    else if (event.key === 'ArrowRight') x += step;
    else if (event.key === 'ArrowUp') y -= step;
    else if (event.key === 'ArrowDown') y += step;
    else return;

    event.preventDefault();
    onWeightsChange(pointToWeights(x, y));
  };

  return (
    <div className={`decision-stage stage-state-${stateIndex}`}>
      <canvas
        aria-hidden="true"
        className="decision-canvas"
        ref={canvasRef}
      />

      <div className="stage-ruler" aria-hidden="true">
        <span>INPUT / ∞</span>
        <span>DECISION / {String(Math.round(progress * 100)).padStart(3, '0')}</span>
        <span>REMAINS / {committed ? '01' : '—'}</span>
      </div>

      <div
        className="decision-field"
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
        onPointerDown={(event) => {
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (draggingRef.current) updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          if (draggingRef.current) updateFromPointer(event);
          draggingRef.current = false;
        }}
        ref={fieldRef}
      >
        <svg aria-hidden="true" className="decision-field__geometry" viewBox="0 0 100 100">
          <path d="M50 8 L8 90 L92 90 Z" />
          <path d="M50 8 L50 62 M8 90 L50 62 M92 90 L50 62" />
        </svg>
        <span className="vertex vertex--care">关照</span>
        <span className="vertex vertex--surprise">意外</span>
        <span className="vertex vertex--clarity">清晰</span>
        <button
          aria-describedby="decision-handle-help"
          aria-label={`决策点。清晰 ${percentages.clarity}%，意外 ${percentages.surprise}%，关照 ${percentages.care}%`}
          className="decision-handle"
          onKeyDown={moveHandle}
          style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
        <span className="sr-only" id="decision-handle-help">
          使用方向键移动；按住 Shift 可以大幅移动。也可使用下方三个滑杆精确校准。
        </span>
      </div>

      <div className="stage-voice" aria-live="polite" aria-atomic="true">
        <span className="stage-voice__index">0{stateIndex}</span>
        <p>{voice.zh}</p>
        <p lang="en">{voice.en}</p>
      </div>

      <CalibrationControls weights={weights} onChange={onWeightsChange} />

      <HoldMark active={revealDiscarded} onRevealChange={onRevealChange} />

      <div
        aria-hidden={!revealDiscarded}
        className={`discarded-note${revealDiscarded ? ' is-visible' : ''}`}
      >
        <span lang="en">GHOST DRAFTS</span>
        <p>被删掉的不是错误。它们只是不再服务于这一次决定。</p>
      </div>

      <p className="sr-only" role="status">
        {revealDiscarded ? '正在显示这次决定删去的其他路径。' : STATE_LABELS[stateIndex]}
      </p>
    </div>
  );
}
