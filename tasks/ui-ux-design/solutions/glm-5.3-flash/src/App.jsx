// 《未定稿》—— 一台用草稿思考的机器的自画像。
// 单页长卷：装置（首屏）→ 读 → 修 → 承（自白）→ 合（印），一根朱丝栏贯穿全篇。
import HeroField from './sections/HeroField'
import ReadingChapter from './sections/ReadingChapter'
import RepairMachine from './sections/RepairMachine'
import ConfessionChapter from './sections/ConfessionChapter'
import FinaleChapter from './sections/FinaleChapter'
import Colophon from './sections/Colophon'
import BlueprintOverlay from './sections/BlueprintOverlay'

export default function App() {
  return (
    <div className="page-root">
      <a className="skip-link" href="#main">
        跳到正文
      </a>
      <div className="margin-rule" aria-hidden="true" />
      <main id="main">
        <HeroField />
        <ReadingChapter />
        <RepairMachine />
        <ConfessionChapter />
        <FinaleChapter />
      </main>
      <Colophon />
      <BlueprintOverlay />
    </div>
  )
}
