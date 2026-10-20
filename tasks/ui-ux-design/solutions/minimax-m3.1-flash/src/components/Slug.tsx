import { TOTAL_MARKS } from "../content";
import type { ProofState } from "../state";
import { stageFor } from "../content";

interface SlugProps {
  state: ProofState;
  marks: number;
  soundOn: boolean;
  onBlind: (on: boolean) => void;
  onPress: () => void;
  onSound: (on: boolean) => void;
}

/**
 * The printer's slug: the strip of information that travels with a job
 * through the shop. It is also the only place the piece shows its numbers.
 */
export function Slug({
  state,
  marks,
  soundOn,
  onBlind,
  onPress,
  onSound,
}: SlugProps) {
  const stage = stageFor(marks);
  const lines = Math.max(12, 22 - Math.floor(marks / 6));

  return (
    <header className="slug">
      <div className="slug__id">
        <span className="slug__job">校样 · 001 · 甲</span>
        <span className="slug__rule" aria-hidden="true" />
        <span className="slug__stage" data-stage={stage.name}>
          {stage.name}
        </span>
      </div>

      <dl className="slug__readouts">
        <div className="slug__cell">
          <dt>纸</dt>
          <dd>冷白 90g · 220×280</dd>
        </div>
        <div className="slug__cell">
          <dt>版面</dt>
          <dd>{lines} 行 · 等宽 12pt</dd>
        </div>
        <div className="slug__cell">
          <dt>修订</dt>
          <dd>
            {marks}
            <span className="slug__of">/{TOTAL_MARKS}</span>
          </dd>
        </div>
        <div className="slug__cell">
          <dt>误植</dt>
          <dd>
            <button
              type="button"
              className="slug__defects"
              onClick={() => onBlind(!state.blind)}
              aria-pressed={state.blind}
              title="点击进入盲校，在纸上找出三处误植"
            >
              {state.found.length}
              <span className="slug__of">/3</span>
            </button>
          </dd>
        </div>
      </dl>

      <div className="slug__controls">
        <button
          type="button"
          className="slug__button"
          onClick={() => onBlind(!state.blind)}
          aria-pressed={state.blind}
        >
          盲校
          <kbd>B</kbd>
        </button>
        <button
          type="button"
          className="slug__button slug__button--press"
          onClick={onPress}
          disabled={marks === 0}
        >
          付印
          <kbd>P</kbd>
        </button>
        <button
          type="button"
          className="slug__button slug__button--icon"
          onClick={() => onSound(!soundOn)}
          aria-pressed={soundOn}
        >
          <span aria-hidden="true">{soundOn ? "♪" : "×"}</span>
          <span className="visually-hidden">
            {soundOn ? "关闭声音" : "打开声音"}
          </span>
        </button>
      </div>
    </header>
  );
}
