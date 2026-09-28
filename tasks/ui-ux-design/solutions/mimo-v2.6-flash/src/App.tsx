import { useRef } from 'react'
import Spectroscope from './spectro/Spectroscope'
import Hud, { type HudHandle } from './sections/Hud'
import Hero from './sections/Hero'
import FacetSection from './sections/FacetSection'
import Threshold from './sections/Threshold'
import Colophon from './sections/Colophon'
import { facets } from './content'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useMediaQuery, usePrefersReducedMotion } from './hooks/useMediaQuery'
import { useDarkLayer } from './hooks/useDarkLayer'

export default function App() {
  const progress = useScrollProgress()
  const reduced = usePrefersReducedMotion()
  const mobile = useMediaQuery('(max-width: 720px)')
  const { dark, active, toggle } = useDarkLayer()
  const hudRef = useRef<HudHandle>(null)

  return (
    <div className="page" data-dark={active ? 'on' : 'off'}>
      <Spectroscope
        progress={progress}
        dark={dark}
        reduced={reduced}
        mobile={mobile}
        onFrame={(info) => hudRef.current?.update(info)}
      />

      <header className="topbar">
        <a className="topbar__mark mono" href="#top">
          分光仪 / SPECTROSCOPE
        </a>
        <span className="topbar__tag mono">自画像 · v1.0</span>
      </header>

      <Hud ref={hudRef} progress={progress} darkActive={active} onToggle={toggle} />

      <main className="content">
        <Hero />
        {facets.map((facet) => (
          <FacetSection key={facet.id} facet={facet} />
        ))}
        <Threshold active={active} onToggle={toggle} />
        <Colophon />
      </main>
    </div>
  )
}
