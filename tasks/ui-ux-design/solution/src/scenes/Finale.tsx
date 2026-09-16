import { forwardRef } from 'react'
import { WEFT_HEX, type WeftColor } from '../engine/palette'
import { GIFTS } from '../engine/words'

interface Props {
  finaleOn: boolean
  userRows: number
  giftsThrown: WeftColor[]
  settledAnnounced: boolean
  shuttleBlocked: boolean
  onThrow: (color: WeftColor) => void
}

const WEFTS: { id: WeftColor; name: string }[] = [
  { id: 'indigo', name: '靛蓝' },
  { id: 'madder', name: '茜红' },
  { id: 'gold', name: '一缕金' },
]

/**
 * 终章 · 成：最后三行由访客亲手织入。
 * 赠言不写在标签上——织进去，才读得到。
 */
export const Finale = forwardRef<HTMLElement, Props>(function Finale(
  { finaleOn, userRows, giftsThrown, settledAnnounced, shuttleBlocked, onThrow },
  ref,
) {
  const done = userRows >= 3
  return (
    <section ref={ref} className="chapter chapter-finale align-left" aria-labelledby="finale-title">
      <article className="panel">
        <p className="kicker">终章 · 成</p>
        <h2 id="finale-title">最后三行，交给你。</h2>
        {!settledAnnounced && (
          <>
            <p className="body-text">
              选一根纬线，投梭。你织进的每一行都会留在这块布上——连同它的赠言。
              也可以三根都选同一种颜色。在织口附近用力横甩，同样是投梭。
            </p>
            <div className="weft-row" role="group" aria-label="选择纬线并投梭">
              {WEFTS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className="weft-button"
                  disabled={!finaleOn || done}
                  onClick={() => onThrow(w.id)}
                >
                  <span className="swatch" style={{ background: WEFT_HEX[w.id] }} aria-hidden="true" />
                  {w.name}
                </button>
              ))}
            </div>
            <p className="finale-status" role="status">
              {done ? '梭子停了。等布落下来。' : `已织入 ${userRows} / 3 行。`}
            </p>
            {shuttleBlocked && (
              <p className="finale-blocked" role="alert">
                {done
                  ? '梭子在线结前停下了——回到第四章把线理顺，它会替你织完。'
                  : '线还乱着，梭子过不去。可以回到第四章，先帮它理顺。'}
              </p>
            )}
          </>
        )}
        {giftsThrown.length > 0 && (
          <ul className="gift-list" aria-label="你织入的赠言">
            {giftsThrown.map((c, i) => (
              <li key={i} className="gift-line">
                <span className="swatch" style={{ background: WEFT_HEX[c] }} aria-hidden="true" />
                {GIFTS[c]}
              </li>
            ))}
          </ul>
        )}
        {settledAnnounced && (
          <p className="finale-done">
            布成了。
            <strong>这块布里有你织的三行。</strong>
          </p>
        )}
      </article>
    </section>
  )
})
