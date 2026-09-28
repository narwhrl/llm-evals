// 隐藏层「骨架」：按住 X（或点右下角按钮）显出这张纸的构造线
// 与它自己的修订记录——草稿的草稿。ESC 关闭。
import { useEffect, useState } from 'react'
import './blueprint.css'

const REVISIONS = [
  { from: '标题候选：《完成》', to: '划掉——太假' },
  { from: '标题候选：《草稿机器》', to: '划掉——像说明书' },
  { from: '标题候选：《未定稿》', to: '留用：它承认自己' },
  { from: '读光原是光斑', to: '划掉——改成朱笔圈点，圈点本就是批好字的记号' },
  { from: '转场原是整页淡入', to: '划掉——批量淡入是偷懒' },
  { from: '错误原是随机文案', to: '划掉——错误必须真的来自矛盾' },
]

export default function BlueprintOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let holding = false
    const down = (e) => {
      if (e.repeat) return
      const target = e.target
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (!typing && (e.key === 'x' || e.key === 'X')) {
        holding = true
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const up = (e) => {
      if (holding && (e.key === 'x' || e.key === 'X')) {
        holding = false
        setOpen(false)
      }
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  return (
    <>
      <button
        className="blueprint-toggle work-note"
        aria-pressed={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '合上骨架' : '骨架'}
      </button>
      {open && (
        <div className="blueprint" role="dialog" aria-label="骨架：这张纸的构造">
          <div className="blueprint-lines" aria-hidden="true">
            <span className="bp-h" style={{ top: '22%' }} />
            <span className="bp-h" style={{ top: '46%' }} />
            <span className="bp-h" style={{ top: '70%' }} />
            <span className="bp-v" style={{ left: 'calc(50% - min(46vw, 440px))' }} />
            <span className="bp-v" style={{ left: 'calc(50% + min(46vw, 440px))' }} />
            <span className="bp-label" style={{ top: '20.5%' }}>
              构线 · 栅格 = clamp(26px, 4.2vw, 34px)，canvas 与 DOM 共用同一公式
            </span>
            <span className="bp-label" style={{ top: '44.5%' }}>
              正文栏 = min(92vw, 880px) · 朱丝栏右置，贯穿全卷
            </span>
          </div>
          <div className="blueprint-panel">
            <p className="blueprint-title">骨架 · 这张纸的修订记录</p>
            {REVISIONS.map((r, i) => (
              <p className="blueprint-item" key={i}>
                <span className="blueprint-from">{r.from}</span>
                <span className="blueprint-strike" aria-hidden="true" />
                <span className="blueprint-to">
                  {r.to.startsWith('划掉') ? '→ ' : '→ '}
                  {r.to}
                </span>
              </p>
            ))}
            <p className="blueprint-item">
              依赖：react / react-dom / vite · 无字体、无图片、无网络请求 · 单
              canvas，整数 DPR，离屏与页签隐藏时暂停
            </p>
          </div>
        </div>
      )}
    </>
  )
}
