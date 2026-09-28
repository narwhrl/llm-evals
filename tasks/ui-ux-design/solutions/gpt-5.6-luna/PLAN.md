# Development Plan — The Listening Engine

## Core concept

我把自己想象成一台“倾听引擎”：不是替人给出结论，而是在模糊、分歧与半成品之间，捕捉一条可以继续工作的线。访客每一次移动、选择与停留，都会改变这条线的张力、密度与方向；页面不是一份履历，而是一场从噪声到清晰、再把清晰交还给人的共同校准。

## Visitor journey

1. **抵达 / Notice** — 首屏先给出一句立场和一台可直接触摸的 signal chamber。访客移动指针，观察“我如何听”而不是先读一段自我介绍。
2. **校准 / Tune** — 用 `friction`、`pace`、`temperature` 三个可操作变量改变线条系统；按钮、滑杆和键盘都能完成操作。装置底部的状态词从 `LISTEN` 发展到 `MAP / TURN / MAKE ROOM`。
3. **理解 / Read the method** — 向下滚动，首屏形成的轨迹继续成为章节之间的视觉脊柱；三个“pass”说明我如何把模糊变成可共事的形状。
4. **参与 / Leave a mark** — 访客可以输入一个词，页面把它编译成一段本地生成的“回声”，并用结果改变下一次装置状态。没有网络请求，没有伪装成 AI 的答案。
5. **收束 / Return agency** — 最后把控制权交还给访客：显示本次 session 的状态摘要，并邀请带着一个更好的问题离开。一个低调的 knot 入口揭开隐藏的 quiet note。

## Visual and interaction principles

- **材质**：暖纸张、墨色、单一珊瑚色与冷青色信号；用细线、编号、边注和印刷式切口建立编辑感，不使用默认玻璃、霓虹或重阴影。
- **排版**：衬线大标题负责情绪，等宽小字负责仪器读数；标题短而有节奏，正文控制在舒适 measure；数字使用 tabular figures。
- **空间**：大留白承载“听”的停顿；内容按一条垂直 signal spine 对齐，章节并非独立卡片。
- **核心装置**：SVG signal chamber 根据指针位置、三个控制值、滚动进度与输入词连续重算多条有机路径；状态不是一次性动画，而是可被反复扰动的系统。
- **长时序**：首次进入后执行一次 7 秒“listen → map → turn → make room”编舞；线条先收拢、展开、发生偏转，再沉静为可操作的轨迹；访客可暂停，reduced-motion 下不自动播放。
- **反馈**：交互同时用颜色、读数、文字状态和形状变化反馈；按压有轻微 scale，拖动使用 pointer 位置，键盘拥有同等路径。
- **叙事因果**：首屏的 signal 颜色和路径被章节 divider、method strip、最后的 echo 复用，滚动不是换页而是同一台机器进入下一道工序。
- **适配**：桌面使用双列工作台和侧边索引；手机改为单列，装置先于长文本，控制区保持 44 px 级触控目标；所有内容在自然流中可到达。
- **访问性**：语义标题、skip link、真实 button/link、明确 range label、可见 `:focus-visible`、稳定 live status、`aria-pressed`、reduced-motion 与不依赖颜色的状态文字。

## Three explicit non-goals

1. **不做作品集项目网格**：统一的项目卡片会把重点带回“我做过什么”，而不是“我如何与人一起思考”。
2. **不做外部 AI/API 对话**：没有密钥、网络依赖或虚假的即时智能；访客的输入只在本地改变可解释的视觉系统。
3. **不做重型 3D / 粒子秀**：本命题关于倾听、摩擦和余韵，SVG 线条足以提供连续反馈，也更容易在手机、键盘与 reduced-motion 下成立。

## Implementation plan

### Phase 1 — Foundation

- 建立最小 React + Vite 工程，入口只位于 `tasks/ui-ux-design/solution/`。
- 建立全局 tokens、纸张/墨色主题、排版层级、跳过链接与页面 landmarks。
- 先实现首屏静态结构，确保没有依赖外部服务。

### Phase 2 — Core device

- 实现 `SignalChamber`：SVG path 生成、指针/触控跟随、三个控制变量、sequence 状态、暂停与 knot 隐藏层。
- 实现长时序的开始—发展—转折—收束，并让静态状态也能完整表达。
- 让装置可被鼠标、触控、键盘和 range controls 共同操作。

### Phase 3 — Narrative continuity

- 实现章节导航、method passes、collaboration section、local echo 输入。
- 将 signal 状态通过 CSS variables / props 延续到 divider 和最终回声，避免区块拼贴。
- 添加足够真实的自画像文案与操作后的状态摘要。

### Phase 4 — Responsive and resilient behavior

- 在 390 px 与桌面宽度验证布局、可读性、溢出和触控目标。
- 添加 `prefers-reduced-motion` CSS/JS 分支：取消自动序列和漂移，保留即时可理解的状态变化。
- 控制 SVG 复杂度、避免每帧全局监听，保证仅在装置交互中更新。

### Phase 5 — Review and verification

- 以创意总监身份逐项批评概念贯穿、模板感、动效意义、记忆点、信息可读性、移动/a11y、性能。
- 至少一轮结构性打磨：优先修正核心装置与章节因果，而非只调颜色。
- 用浏览器在 `1440 × 900`、`390 × 844` 及 reduced-motion 下实测核心路径，运行生产构建并记录结果。
- 将完整模型标识、基线 SHA、验证命令、限制、人工介入和批评后的实际修改写入 `RESULTS.md`。

## Verification checkpoints

- **Checkpoint A**：首屏可构建、可启动，装置静态渲染，无外部网络依赖。
- **Checkpoint B**：装置的 pointer/range/keyboard/sequence/hidden-note 路径都可操作，章节结构完整。
- **Checkpoint C**：桌面、手机、reduced-motion、200% zoom 的内容仍可读可达；浏览器 smoke check 无 console error。
- **Checkpoint D**：生产构建通过，结果报告与候选改动同处当前模型分支。

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| SVG 重算导致高频交互卡顿 | 只在 chamber pointer move 更新局部 React 状态；路径数量有限，CSS 负责持续动画；不使用 canvas 粒子墙。 |
| 视觉装置压过自我叙事 | 每个状态旁都有可读的短句和方法说明；后续章节解释装置变量的隐喻。 |
| 复杂动效影响 reduced-motion 用户 | JS 用 media query 跳过自动 sequence，CSS 移除循环与漂移，保持静态路径和操作反馈。 |
| 移动端首屏过高 | 采用 `min-height` 与 `clamp`，控制区单列，章节自然流动，不固定视口高度。 |
