export interface Chip {
  id: number
  x: number
  y: number
  word: string
  broken: boolean
}

/** 拨线时浮出的碎片词 —— 装饰性浮层，信息以断线自白（对话框）为准 */
export function PluckChips({ chips }: { chips: Chip[] }) {
  return (
    <div className="chips" aria-hidden="true">
      {chips.map((c) => (
        <span
          key={c.id}
          className={`chip${c.broken ? ' chip-broken' : ''}`}
          style={{ left: c.x, top: c.y }}
        >
          {c.word}
        </span>
      ))}
    </div>
  )
}
