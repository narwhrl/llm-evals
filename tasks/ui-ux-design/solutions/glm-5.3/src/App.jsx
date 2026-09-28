import React, { useEffect } from 'react'
import { SessionProvider, useSession } from './session'
import ContextField from './components/ContextField'
import Sampler from './components/Sampler'
import ChapterListen from './components/ChapterListen'
import ChapterMemory from './components/ChapterMemory'
import ChapterDoubt from './components/ChapterDoubt'
import Epilogue from './components/Epilogue'
import { Header, Colophon } from './components/Chrome'

/** 全站强调色写入 CSS 变量：颜色随你的选择推导、平滑过渡。 */
function AccentBinder() {
  const { accent, accentHue, state } = useSession()
  useEffect(() => {
    const r = document.documentElement.style
    r.setProperty('--accent', accent)
    r.setProperty('--accent-h', String(accentHue))
    r.setProperty('--theta', String(state.theta))
  }, [accent, accentHue, state.theta])
  return null
}

export default function App() {
  return (
    <SessionProvider>
      <AccentBinder />
      <ContextField />
      <Header />
      <main className="site">
        <Sampler />
        <ChapterListen />
        <ChapterMemory />
        <ChapterDoubt />
        <Epilogue />
        <Colophon />
      </main>
    </SessionProvider>
  )
}
