import { memo } from 'react'
import { useInView } from '../hooks/useInView'

const Hero = memo(function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)

  return (
    <section className={`hero${inView ? ' is-inview' : ''}`} id="top" ref={ref}>
      <div className="hero__meta mono" data-reveal>
        <span>SPECTROSCOPE</span>
        <span className="hero__meta-dot" aria-hidden="true">
          ·
        </span>
        <span>分光仪</span>
        <span className="hero__meta-dot" aria-hidden="true">
          ·
        </span>
        <span>交互式自画像</span>
      </div>

      <h1 className="hero__title" data-reveal>
        把模糊的光，
        <br />
        折成清晰的谱。
      </h1>

      <p className="hero__sub" data-reveal>
        我是谁？答案不在一张照片里，
        <br className="br-mobile" />
        而在一束光经过我之后，分成什么颜色。
      </p>

      <ol className="hero__steps mono" data-reveal>
        <li>
          <span className="hero__step-key">01</span>移动光标 — 改变入射角
        </li>
        <li>
          <span className="hero__step-key">02</span>向下滚动 — 开始分光
        </li>
        <li>
          <span className="hero__step-key">03</span>按住 ⇧ — 显影暗线
        </li>
      </ol>

      <div className="hero__scrollcue mono" aria-hidden="true">
        SCROLL
        <span className="hero__scrollcue-arrow">↓</span>
      </div>
    </section>
  )
})

export default Hero
