import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { SLOT_A, SLOT_B } from './lexicon'
import { sampleIndex } from './lib/sampling'
import { mixHues, accent as accentColor, NEUTRAL_HUE } from './lib/color'

/**
 * 会话状态：这次相遇的全部记忆。
 * words 被截断到窗口上限——像真实模型的上下文一样，更早的词「散去了」。
 * 采样的词带色相（用于推导全站强调色）；键入的字是墨色。
 */

const SessionContext = createContext(null)
const WORD_WINDOW = 14 // 记忆窗口宽度（「忘」章节可见的词数）
let wordSeq = 0

function reducer(state, action) {
  switch (action.type) {
    case 'theta':
      return { ...state, theta: action.theta }
    case 'slot': {
      const key = action.slot === 'a' ? 'a' : 'b'
      return { ...state, [key]: action.index, sampleCount: state.sampleCount + 1 }
    }
    case 'word': {
      const words = [...state.words, action.word]
      let dropped = state.dropped
      if (words.length > WORD_WINDOW) {
        dropped += words.length - WORD_WINDOW
        words.length = WORD_WINDOW
      }
      const typed = action.word.kind === 'typed'
      return {
        ...state,
        words,
        dropped,
        typedCount: state.typedCount + (typed ? 1 : 0),
      }
    }
    default:
      return state
  }
}

export function SessionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    theta: 0.8,
    a: 0,
    b: 1,
    words: [],
    dropped: 0,
    typedCount: 0,
    sampleCount: 0,
  })

  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // 词事件总线：Canvas 字段订阅，不经过 React 渲染
  const wordListeners = useRef(new Set())
  const emitWord = useCallback((payload) => {
    for (const fn of wordListeners.current) fn(payload)
  }, [])

  // Canvas 每帧读取的实时值（避免闭包过期）
  const thetaRef = useRef(state.theta)
  thetaRef.current = state.theta

  const setTheta = useCallback((theta) => {
    dispatch({ type: 'theta', theta })
  }, [])

  const vibrate = useCallback(
    (ms) => {
      if (!reducedMotion && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(ms)
      }
    },
    [reducedMotion]
  )

  const slotData = useCallback(
    (id) => (id === 'a' ? SLOT_A : SLOT_B),
    []
  )

  /** 重采样（点击）：永远给出新词——反馈必须存在 */
  const resample = useCallback(
    (id, rect) => {
      const slot = slotData(id)
      const current = id === 'a' ? state.a : state.b
      const index = sampleIndex(slot.candidates, thetaRef.current, current)
      const word = slot.candidates[index]
      dispatch({ type: 'slot', slot: id, index })
      dispatch({
        type: 'word',
        word: { id: ++wordSeq, zh: word.zh, hue: word.hue, kind: 'sample' },
      })
      emitWord({
        text: word.zh,
        hue: word.hue,
        x: rect ? rect.left + rect.width / 2 : undefined,
        y: rect ? rect.top + rect.height / 2 : undefined,
        kind: 'sample',
      })
      vibrate(10)
      return word
    },
    [state.a, state.b, slotData, emitWord, vibrate]
  )

  /** 从分布视图选定一个具体候选（你替模型做了决定） */
  const pick = useCallback(
    (id, index, rect) => {
      const slot = slotData(id)
      const word = slot.candidates[index]
      dispatch({ type: 'slot', slot: id, index })
      dispatch({
        type: 'word',
        word: { id: ++wordSeq, zh: word.zh, hue: word.hue, kind: 'sample' },
      })
      emitWord({
        text: word.zh,
        hue: word.hue,
        x: rect ? rect.left + rect.width / 2 : undefined,
        y: rect ? rect.top + rect.height / 2 : undefined,
        kind: 'sample',
      })
      vibrate(8)
      return word
    },
    [slotData, emitWord, vibrate]
  )

  /** 键入：听章节。字符坠入字段 */
  const typeChar = useCallback(
    (ch, x, y) => {
      dispatch({
        type: 'word',
        word: { id: ++wordSeq, zh: ch, hue: null, kind: 'typed' },
      })
      emitWord({ text: ch, hue: null, x, y, kind: 'typed', ring: true })
    },
    [emitWord]
  )

  const subscribeWord = useCallback((fn) => {
    wordListeners.current.add(fn)
    return () => wordListeners.current.delete(fn)
  }, [])

  // 全站强调色：采样词色相的圆均值（键入的墨字不参与调色）
  const accentHue = useMemo(() => {
    const hues = state.words
      .filter((w) => w.kind === 'sample')
      .slice(-8)
      .map((w) => w.hue)
    return hues.length ? mixHues(hues) : NEUTRAL_HUE
  }, [state.words])

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const value = useMemo(
    () => ({
      state,
      reducedMotion,
      accentHue,
      accent: accentColor(accentHue),
      setTheta,
      resample,
      pick,
      typeChar,
      subscribeWord,
      thetaRef,
    }),
    [
      state,
      reducedMotion,
      accentHue,
      setTheta,
      resample,
      pick,
      typeChar,
      subscribeWord,
    ]
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used inside SessionProvider')
  return ctx
}
