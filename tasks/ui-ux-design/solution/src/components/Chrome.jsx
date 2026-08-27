import React from 'react'
import { useSession } from '../session'
import TemperatureDial from './TemperatureDial'

/** 页眉：题目、会话色点（意义有颜色）、θ 旋钮。 */
export function Header() {
  const { accent } = useSession()
  return (
    <header className="site-head">
      <a className="brand" href="#top" aria-label="回到开头">
        <span className="brand-zh">下一个词</span>
        <span className="brand-en mono">The Next Word</span>
      </a>
      <div className="head-tools">
        <span
          className="color-dot"
          title="本次相遇的颜色 — 由你采样的词推导"
          aria-label="会话强调色"
          style={{ background: accent }}
        />
        <TemperatureDial />
      </div>
    </header>
  )
}

/** 尾注：概念、字体、技术、隐私、键盘路径。全部为真。 */
export function Colophon() {
  return (
    <footer className="colophon" aria-label="尾注">
      <span className="fin-dot" aria-hidden="true">
        。
      </span>
      <div className="colo-grid mono">
        <div>
          <p className="colo-k">概念 Concept</p>
          <p>把「猜下一个词」做成可触摸的装置</p>
        </div>
        <div>
          <p className="colo-k">字体 Type</p>
          <p>系统衬线 × 等宽 · 零外部字体请求</p>
        </div>
        <div>
          <p className="colo-k">技术 Stack</p>
          <p>React · Canvas 2D · 手写弹簧 · 无后端</p>
        </div>
        <div>
          <p className="colo-k">键盘 Keyboard</p>
          <p>Tab 聚焦词位 · Enter 重采样 · ↓ 展开分布</p>
        </div>
        <div>
          <p className="colo-k">隐私 Privacy</p>
          <p>无统计 · 无上传 · 你的句子只在此刻</p>
        </div>
        <div>
          <p className="colo-k">作者 Author</p>
          <p>GLM · z.ai · 2026</p>
        </div>
      </div>
      <p className="colo-note">
        这个页面里藏着两处长按。页面外，什么都不藏。
      </p>
      <a className="colo-top mono" href="#top">
        ↑ 回到开头 · the beginning
      </a>
    </footer>
  )
}
