import { useRef } from 'react';

import { clamp, deriveLoomState } from '../device-state.js';

const PERCENT = new Intl.NumberFormat('zh-CN', {
  style: 'percent',
  maximumFractionDigits: 0,
});

const STRAND_COLORS = ['var(--clay)', 'var(--ink)', 'var(--moss)'];

function strandPath(index, focus, tension, journey) {
  const base = [188, 320, 452][index];
  const settle = Math.max(0, (journey - 0.78) / 0.22);
  const fracture = Math.max(0, 1 - Math.abs(journey - 0.67) / 0.13);
  const amplitude = (1 - focus) * 58 + tension * 30 - settle * 28;
  const pull = (focus - 0.5) * 88;
  const edgeLift = (index - 1) * tension * 34;
  const split = fracture * (index === 1 ? 56 : 26);

  return [
    `M 66 ${base + edgeLift}`,
    `C 156 ${base - amplitude + pull * 0.12}, 206 ${base + amplitude * 0.86}, 304 ${base - pull * 0.16}`,
    `C 356 ${base - amplitude * 0.55 - split}, 390 ${base + amplitude * 0.45 + split}, 444 ${base + pull * 0.14}`,
    `C 526 ${base + amplitude * 0.9}, 578 ${base - amplitude + pull * 0.12}, 654 ${base - edgeLift}`,
  ].join(' ');
}

function fieldPath(focus, tension, journey) {
  const left = 112 + focus * 38;
  const top = 84 + (1 - tension) * 30;
  const bend = 42 + tension * 48;
  const turn = Math.max(0, 1 - Math.abs(journey - 0.67) / 0.13) * 48;

  return [
    `M ${left} ${top}`,
    `C 260 ${top - bend}, 410 ${top + bend}, ${608 - focus * 30} ${top + 18}`,
    `L ${578 - turn} 512`,
    `C 430 ${548 + turn}, 250 ${472 - turn}, ${144 + focus * 24} 526`,
    'Z',
  ].join(' ');
}

export function Loom({ focus, tension, journey, onFocusChange, onTensionChange, reducedMotion }) {
  const surfaceRef = useRef(null);
  const state = deriveLoomState({ focus, tension, journey });
  const cursorX = 112 + focus * 496;
  const cursorY = 514 - tension * 430;
  const fracture = state.chapter === 'fracture';

  function updateFromPointer(event) {
    const surface = surfaceRef.current;
    if (!surface) return;

    const bounds = surface.getBoundingClientRect();
    onFocusChange(clamp((event.clientX - bounds.left) / bounds.width));
    onTensionChange(clamp(1 - (event.clientY - bounds.top) / bounds.height));
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromPointer(event);
  }

  function handlePointerMove(event) {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      updateFromPointer(event);
    }
  }

  function handleKeyDown(event) {
    const step = event.shiftKey ? 0.12 : 0.055;
    const directions = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const direction = directions[event.key];

    if (!direction) return;

    event.preventDefault();
    onFocusChange(clamp(focus + direction[0]));
    onTensionChange(clamp(tension + direction[1]));
  }

  return (
    <section className={`loom ${reducedMotion ? 'loom--still' : ''}`} aria-labelledby="loom-heading">
      <div className="loom-heading-row">
        <p className="eyebrow" id="loom-heading">核心装置 / 倾听织机</p>
        <p className="loom-chapter" aria-label={`叙事阶段：${state.chapterCue}`}>{state.chapterCue} · {state.chapterLabel}</p>
      </div>

      <button
        className="loom-surface"
        ref={surfaceRef}
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => event.currentTarget.releasePointerCapture?.(event.pointerId)}
        onPointerCancel={(event) => event.currentTarget.releasePointerCapture?.(event.pointerId)}
        onKeyDown={handleKeyDown}
        aria-describedby="loom-instructions loom-response"
        aria-label="调节倾听织机。横向移动改变注意力，纵向移动改变张力；也可用方向键细调。"
      >
        <svg className="loom-graphic" viewBox="0 0 720 640" aria-hidden="true" focusable="false">
          <g className="loom-outer-marks">
            <path d="M 92 112 H 628" />
            <path d="M 92 528 H 628" />
            <path d="M 116 96 V 544" />
            <path d="M 604 96 V 544" />
            <path d="M 156 126 H 564" />
            <path d="M 156 514 H 564" />
          </g>
          <path className="loom-field" d={fieldPath(focus, tension, journey)} />
          <path className="loom-field-shadow" d={fieldPath(Math.min(1, focus + 0.05), Math.max(0, tension - 0.05), journey)} />
          <g className="loom-threads">
            {STRAND_COLORS.map((color, index) => (
              <path
                key={color}
                className="loom-thread"
                d={strandPath(index, focus, tension, journey)}
                style={{
                  '--thread-color': color,
                  '--thread-delay': `${index * -1.25}s`,
                  '--thread-duration': `${15 - tension * 9 + index * 0.45}s`,
                }}
              />
            ))}
          </g>
          {fracture && (
            <g className="loom-fracture">
              <path d="M 344 114 L 369 248 L 335 348 L 384 522" />
              <circle cx="344" cy="114" r="6" />
              <circle cx="384" cy="522" r="6" />
            </g>
          )}
          <g className="loom-cursor">
            <path d={`M ${cursorX} 72 V 570`} />
            <path d={`M 74 ${cursorY} H 646`} />
            <circle cx={cursorX} cy={cursorY} r="12" />
            <circle cx={cursorX} cy={cursorY} r="4" />
          </g>
          <g className="loom-indexes">
            <text x="96" y="73">听</text>
            <text x="612" y="73">做</text>
            <text x="56" y="112">紧</text>
            <text x="56" y="532">松</text>
          </g>
        </svg>
        <span className="loom-touch-label">按住并移动</span>
      </button>

      <p className="loom-instructions" id="loom-instructions">
        横向收近问题，纵向拉出张力。每一次移动都会留下不同的工作姿态。
      </p>

      <div className="loom-controls" aria-label="织机细调">
        <label className="loom-control" htmlFor="focus-control">
          <span>注意力</span>
          <input
            id="focus-control"
            type="range"
            min="0"
            max="100"
            value={Math.round(focus * 100)}
            onChange={(event) => onFocusChange(Number(event.target.value) / 100)}
            aria-valuetext={`注意力 ${PERCENT.format(focus)}`}
          />
          <output>{PERCENT.format(focus)}</output>
        </label>
        <label className="loom-control" htmlFor="tension-control">
          <span>张力</span>
          <input
            id="tension-control"
            type="range"
            min="0"
            max="100"
            value={Math.round(tension * 100)}
            onChange={(event) => onTensionChange(Number(event.target.value) / 100)}
            aria-valuetext={`张力 ${PERCENT.format(tension)}`}
          />
          <output>{PERCENT.format(tension)}</output>
        </label>
      </div>

      <div className="loom-response" id="loom-response">
        <p className="eyebrow">此刻的姿态</p>
        <strong>{state.label}</strong>
        <p>{state.message}</p>
      </div>
    </section>
  );
}
