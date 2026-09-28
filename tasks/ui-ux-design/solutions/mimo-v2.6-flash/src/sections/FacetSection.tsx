import { memo } from 'react'
import { useInView } from '../hooks/useInView'
import type { Facet } from '../content'

const BAND_LABEL: Record<Facet['band'], string> = {
  think: '红端',
  make: '绿段',
  collab: '蓝紫端',
}

const FacetSection = memo(function FacetSection({ facet }: { facet: Facet }) {
  const { ref, inView } = useInView<HTMLElement>(0.18)

  return (
    <section
      className={`facet facet--${facet.band}${inView ? ' is-inview' : ''}`}
      id={facet.id}
      ref={ref}
      aria-labelledby={`${facet.id}-title`}
    >
      <div className="facet__head mono" data-reveal>
        <span className="facet__index">{facet.index}</span>
        <span className="facet__band-tag">{BAND_LABEL[facet.band]}</span>
        <span className="facet__lambda">{facet.wavelength}</span>
      </div>

      <div className="facet__rule" aria-hidden="true" />

      <h2 className="facet__title" id={`${facet.id}-title`} data-reveal>
        {facet.title}
      </h2>

      <p className="facet__lead" data-reveal>
        {facet.lead}
      </p>

      <p className="facet__body" data-reveal>
        {facet.body}
      </p>

      <aside className="facet__note mono" data-reveal>
        {facet.marginNote}
      </aside>
    </section>
  )
})

export default FacetSection
