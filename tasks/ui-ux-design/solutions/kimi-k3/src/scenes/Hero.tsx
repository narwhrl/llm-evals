export function Hero({ warpingDone }: { warpingDone: boolean }) {
  return (
    <header className="hero" aria-label="首屏：上经">
      <div className="hero-label">
        <span className="hero-mark" aria-hidden="true">织</span>
        <div className="hero-title">
          <h1>答案不是被找到的，<br />是被织出来的。</h1>
          <p>一份关于我如何思考、创造与协作的自画像。</p>
        </div>
      </div>
      <p className={`hero-hint${warpingDone ? ' is-on' : ''}`}>
        <span className="hero-hint-line" aria-hidden="true" />
        经线已绷紧 —— 往下滚，看它生长。
      </p>
    </header>
  )
}
