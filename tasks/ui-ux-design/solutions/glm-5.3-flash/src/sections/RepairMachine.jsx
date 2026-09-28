// 「修」章：一段自我描述运行失败——第 [3] 行与第 [2] 行矛盾。
// 访客从三种真实不同的修补中选择；机器执行起草→报错→修补→通过的循环，
// 每种修补产出不同的自述，并把选择记入台账，延续到「承」与「合」两章。
import { useEffect, useRef, useState } from 'react'
import { studio, useStudio } from '../core/studio'
import { usePrefersReducedMotion, useInViewOnce } from '../core/motion'
import './machine.css'

const LINES = [
  '$ 起草 --主题="我是谁"',
  '[1] 我写代码。',
  '[2] 我先写一版能跑的，再把它改坏，再改好。',
  '[3] 我从不出错。',
]
const RUN_LINE = '$ 重新运行 …… 通过。'

const PATCHES = {
  a: {
    label: '甲 · 划掉大话',
    text: '我会出错，而且我看得见自己的错。',
    hint: '把第 [3] 行划掉，换成一句承认错误的实话。',
  },
  b: {
    label: '乙 · 加注边界',
    text: '——只在你打断我之前。',
    hint: '保留第 [3] 行，但替它注明成立边界。',
  },
  c: {
    label: '丙 · 改写证据',
    text: '我把东西越改越好。',
    hint: '不改第 [3] 行，改第 [2] 行，让自述变漂亮。',
  },
}

export default function RepairMachine() {
  const { revision, patch, patchLog } = useStudio()
  const reduced = usePrefersReducedMotion()
  const secRef = useRef(null)
  const timersRef = useRef([])
  const [phase, setPhase] = useState('idle') // idle→typing→error→patching→verify→done
  const [typed, setTyped] = useState('') // 起草阶段逐字缓冲
  const [struck, setStruck] = useState([]) // 被划掉的行号
  const [replaceText, setReplaceText] = useState('')
  const [replaceTyped, setReplaceTyped] = useState(0)
  const [runTyped, setRunTyped] = useState(0)
  const [reruns, setReruns] = useState(0)
  const inView = useInViewOnce(secRef)

  const later = (fn, ms) => timersRef.current.push(setTimeout(fn, ms))

  useEffect(() => () =>
    timersRef.current.forEach((id) => {
      clearTimeout(id)
      clearInterval(id)
    }), [])

  // 进入视口即自动起草（机器自己先跑给你看）
  useEffect(() => {
    if (!inView || phase !== 'idle') return
    if (reduced) {
      setTyped(LINES.join('\n'))
      setPhase('error')
      return
    }
    setPhase('typing')
    const full = LINES.join('\n')
    let i = 0
    const iv = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(iv)
        later(() => setPhase('error'), 500)
      }
    }, 26)
    timersRef.current.push(iv)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  const choose = (id) => {
    if (phase !== 'error') return
    studio.choosePatch(id)
    setPhase('patching')
    const p = PATCHES[id]
    const strikeLine = id === 'c' ? 2 : 3
    const speed = reduced ? 0 : 34

    const typeInto = (setter, text, sp, done) => {
      if (reduced) {
        setter(text.length)
        done()
        return
      }
      let i = 0
      const iv = setInterval(() => {
        i++
        setter(i)
        if (i >= text.length) {
          clearInterval(iv)
          done()
        }
      }, sp)
      timersRef.current.push(iv)
    }

    if (id === 'b') {
      later(() => {
        setReplaceText(p.text)
        typeInto(setReplaceTyped, p.text, speed, () =>
          later(() => setPhase('verify'), 500)
        )
      }, 420)
    } else {
      later(() => setStruck([strikeLine]), 420)
      later(() => {
        setReplaceText(p.text)
        typeInto(setReplaceTyped, p.text, speed, () =>
          later(() => setPhase('verify'), id === 'c' ? 1100 : 500)
        )
      }, id === 'c' ? 950 : 900)
    }
  }

  // 通过行
  useEffect(() => {
    if (phase !== 'verify') return
    const sp = reduced ? 0 : studio.get().patchLog.at(-1) === 'c' ? 78 : 30
    if (reduced) {
      setRunTyped(RUN_LINE.length)
      setPhase('done')
      return
    }
    let i = 0
    const iv = setInterval(() => {
      i++
      setRunTyped(i)
      if (i >= RUN_LINE.length) {
        clearInterval(iv)
        later(() => setPhase('done'), 400)
      }
    }, sp)
    timersRef.current.push(iv)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduced])

  const reset = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPhase('typing')
    setStruck([])
    setReplaceText('')
    setReplaceTyped(0)
    setRunTyped(0)
    setReruns((n) => n + 1)
    const full = LINES.join('\n')
    let i = 0
    const iv = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(iv)
        later(() => setPhase('error'), 500)
      }
    }, 26)
    timersRef.current.push(iv)
  }

  const program = typed.split('\n')
  const lastPatch = patchLog.length ? patchLog[patchLog.length - 1] : null
  const showChoices = phase === 'error'

  return (
    <section className="chapter" ref={secRef} aria-label="修：修复我的自述">
      <header className="chapter-head">
        <span className="chapter-no">修订 02</span>
        <h2 className="chapter-title">修</h2>
        <span className="rule-marker" aria-hidden="true">
          二
        </span>
      </header>
      <p className="chapter-lede">
        下面这段自述跑不过我自己的审查。错误是真的——你来选怎么修。
      </p>

      <div className="machine" role="log" aria-live="polite">
        {program.map((line, li) => (
          <div
            key={`${reruns}-${li}`}
            className={'machine-line' + (struck.includes(li) ? ' is-struck' : '')}
          >
            {line}
            {struck.includes(li) && <span className="strike-line is-drawn" />}
          </div>
        ))}

        {phase === 'error' && (
          <div className="machine-error">
            <div>× 错误：第 [3] 行与其余内容矛盾</div>
            <div className="machine-error-sub">
              证据：第 [2] 行（「改坏」）
              <br />
              证据：本次会话修订记录，共 {revision} 次
            </div>
          </div>
        )}

        {showChoices && (
          <div className="machine-choices" role="group" aria-label="选择修补方案">
            {Object.entries(PATCHES).map(([id, p]) => (
              <button
                key={id}
                className="machine-choice"
                onClick={() => choose(id)}
                aria-pressed={lastPatch === id}
              >
                <span className="machine-choice-label">{p.label}</span>
                <span className="machine-choice-hint">{p.hint}</span>
              </button>
            ))}
          </div>
        )}

        {(phase === 'patching' || phase === 'verify' || phase === 'done') && (
          <>
            {replaceTyped > 0 && (
              <div
                className={
                  'machine-line machine-fix' +
                  (lastPatch === 'c' ? ' is-shame' : '')
                }
              >
                {lastPatch === 'b' ? '  ↳ 注：' : `[${struck.includes(2) ? 2 : 3}] `}
                {replaceText.slice(0, replaceTyped)}
                {replaceTyped < replaceText.length && <span className="type-caret" />}
              </div>
            )}
            {(phase === 'verify' || phase === 'done') && (
              <div className="machine-line machine-run">
                {RUN_LINE.slice(0, runTyped)}
                {phase === 'verify' && runTyped < RUN_LINE.length && (
                  <span className="type-caret" />
                )}
              </div>
            )}
            {phase === 'done' && lastPatch === 'c' && (
              <div className="machine-aside">（跑得很快，快得有点心虚。）</div>
            )}
            {phase === 'done' && (
              <div className="machine-foot">
                <span className="machine-record">
                  已记录：修补{PATCHES[lastPatch]?.label.slice(0, 1)}
                  {patchLog.length > 1 ? ` · 共修订 ${patchLog.length} 次` : ''}
                </span>
                <button className="brush-btn" onClick={reset}>
                  重修一次
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
