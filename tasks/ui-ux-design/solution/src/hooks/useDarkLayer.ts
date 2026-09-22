import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 暗线显影层：
 * - 按住 Shift：按住期间显影（momentary）
 * - 空白处长按 400ms：切换显影（toggle，便于移动端阅读）
 * - 阈值区按钮：键盘/读屏等价入口
 */
export function useDarkLayer() {
  const [hold, setHold] = useState(false)
  const [toggled, setToggled] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)
  const pressRef = useRef({ sx: 0, sy: 0, fired: false })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setHold(true)
    }
    const up = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setHold(false)
    }
    const blur = () => setHold(false)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', blur)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', blur)
    }
  }, [])

  useEffect(() => {
    const clear = () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current)
        timerRef.current = undefined
      }
    }
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return
      const t = e.target as HTMLElement | null
      if (t?.closest('a, button, input, textarea, select, [data-nohold]')) return
      pressRef.current = { sx: e.clientX, sy: e.clientY, fired: false }
      timerRef.current = window.setTimeout(() => {
        pressRef.current.fired = true
        setToggled((v) => !v)
        try {
          navigator.vibrate?.(15)
        } catch {
          /* 无触觉反馈设备上忽略 */
        }
      }, 400)
    }
    const move = (e: PointerEvent) => {
      if (timerRef.current === undefined) return
      const dx = e.clientX - pressRef.current.sx
      const dy = e.clientY - pressRef.current.sy
      if (Math.hypot(dx, dy) > 12) clear()
    }
    const up = () => clear()
    const ctx = (e: Event) => {
      if (pressRef.current.fired) {
        e.preventDefault()
        pressRef.current.fired = false
      }
    }
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    window.addEventListener('contextmenu', ctx)
    return () => {
      clear()
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('contextmenu', ctx)
    }
  }, [])

  const toggle = useCallback(() => setToggled((v) => !v), [])
  const active = hold || toggled
  return { dark: active ? 1 : 0, active, hold, toggled, toggle }
}
