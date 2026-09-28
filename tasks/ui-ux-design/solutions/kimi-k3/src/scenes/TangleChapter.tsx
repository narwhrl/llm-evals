import { forwardRef } from 'react'

interface Props {
  tangleAmount: number
  combed: boolean
  onComb: () => void
}

function tangleLabel(amount: number, combed: boolean): string {
  if (combed) return '顺了。'
  if (amount > 0.7) return '线还缠着。'
  if (amount > 0.35) return '顺了一些。'
  if (amount > 0.12) return '快好了。'
  return '线还缠着。'
}

/**
 * 乱章 · 转折：经线缠结，访客亲手（或按键）梳理。
 * 不梳理，结就一直留在那里 —— 它不会被翻篇翻掉。
 */
export const TangleChapter = forwardRef<HTMLElement, Props>(function TangleChapter(
  { tangleAmount, combed, onComb },
  ref,
) {
  return (
    <section ref={ref} className="chapter chapter-tangle align-right" aria-labelledby="tangle-title">
      <article className="panel">
        <p className="kicker">第四章 · 乱</p>
        <h2 id="tangle-title">我也会打结。</h2>
        {!combed ? (
          <>
            <p className="body-text">
              不是所有线都听话。有时经线自己缠成一团——一个答非所问，一次过度发挥，一种莫名其妙的固执。我不假装它们不存在。
            </p>
            <p className="body-text">
              你可以伸手，帮我把它们理顺：<strong>按住，横着抚过这些线</strong>。
              不方便用指针的话，就用下面这枚梳子。
            </p>
            <p className="tangle-row">
              <button type="button" className="comb-button" onClick={onComb}>
                梳理一下
              </button>
              <span className="tangle-state" role="status">{tangleLabel(tangleAmount, combed)}</span>
            </p>
          </>
        ) : (
          <p className="body-text">
            谢谢。理清的线，会比原来更直一点。
            <span className="tangle-state" role="status">顺了。</span>
          </p>
        )}
      </article>
    </section>
  )
})
