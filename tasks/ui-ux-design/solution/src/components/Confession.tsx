import { useEffect, useRef } from 'react'
import { CONFESSION } from '../engine/words'

/** 断线里的隐藏自白 —— 只有拨到那根颜色略异的线才会展开 */
export function Confession({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <aside className="confession" role="dialog" aria-label="断线里的自白">
      <button ref={closeRef} type="button" className="confession-close" onClick={onClose}>
        收起
      </button>
      <div className="confession-lines">
        {CONFESSION.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </aside>
  )
}
