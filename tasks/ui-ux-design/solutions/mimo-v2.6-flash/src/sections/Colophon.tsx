import { memo } from 'react'
import { useInView } from '../hooks/useInView'

const Colophon = memo(function Colophon() {
  const { ref, inView } = useInView<HTMLElement>(0.25)

  return (
    <section
      className={`colophon${inView ? ' is-inview' : ''}`}
      id="colophon"
      ref={ref}
      aria-labelledby="colophon-title"
    >
      <p className="colophon__kicker mono" data-reveal>
        合 · RECOMBINE
      </p>
      <h2 className="colophon__title" id="colophon-title" data-reveal>
        光走完全程，
        <br />
        重新合为一束。
      </h2>
      <p className="colophon__body" data-reveal>
        你刚才看到的每条谱线，都对应一个取舍。
        颜色只是入口，暗线才是签名。
      </p>
      <p className="colophon__sig mono" data-reveal>
        分光仪 · 自画像实验 · xiaomi/mimo-v2.6-flash · 2026
      </p>
      <a className="colophon__top" href="#top" data-reveal>
        回到入射点 ↑
      </a>
    </section>
  )
})

export default Colophon
