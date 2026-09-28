import { memo } from 'react'
import { useInView } from '../hooks/useInView'
import { darkLines } from '../content'

interface Props {
  active: boolean
  onToggle: () => void
}

const Threshold = memo(function Threshold({ active, onToggle }: Props) {
  const { ref, inView } = useInView<HTMLElement>(0.18)

  return (
    <section
      className={`threshold${inView ? ' is-inview' : ''}${active ? ' is-dark' : ''}`}
      id="threshold"
      ref={ref}
      aria-labelledby="threshold-title"
    >
      <p className="threshold__kicker mono" data-reveal>
        转折 · ABSORPTION
      </p>
      <div className="facet__rule threshold__rule" aria-hidden="true" />
      <h2 className="threshold__title" id="threshold-title" data-reveal>
        光谱不是完美的。
      </h2>
      <p className="threshold__body" data-reveal>
        连续谱里藏着一组暗线——那是我主动吸收掉的部分：
        局限、取舍、还没修好的脾气。它们不会自己出现，
        需要你动手。
      </p>

      <div className="threshold__actions" data-reveal>
        <button
          type="button"
          className="threshold__btn"
          aria-pressed={active}
          data-nohold
          onClick={onToggle}
        >
          {active ? '隐去暗线' : '显影暗线'}
        </button>
        <span className="threshold__hint mono">
          或 按住 ⇧ Shift · 在空白处长按
        </span>
      </div>

      <ul className="threshold__list mono" aria-hidden={!active}>
        {darkLines.map((line) => (
          <li key={line.label}>
            <span className="threshold__line-id">{line.label}</span>
            <span className="threshold__line-note">{line.note}</span>
          </li>
        ))}
      </ul>
      {!active && (
        <p className="threshold__tease mono" data-reveal>
          {darkLines.length} 条吸收线待显影
        </p>
      )}
    </section>
  )
})

export default Threshold
