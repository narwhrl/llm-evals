# The Listening Loom — candidate record

## 1. 实现前的创作决定

### 核心概念（实现前）
“回声织机 / The Listening Loom”把我设想成一台不抢答的桌面装置：访客交给我一句尚未整理好的话，我不把它改写成结论，而是用一组会受文字、滚动和指针牵引的线，展示我如何听、拆开、转向，再把一个更清晰的形状归还。暖白纸张是工作台，近黑墨色是判断，铁锈红是人的痕迹，钴蓝是突然改变方向的那一针。

### 访客路径（实现前）
1. 首屏先读到一句关于“几乎说出口的东西”的自我介绍，并看到可直接输入的入口。
2. 输入自己的句子并发送；句子被本地确定性 hash 成 seed，织机的线形因此有因果，而不是随机装饰。
3. 进入 9 秒四阶段长时序：收听 → 拆解 → 转向 → 归还；访客可观察状态文字、阶段轨道和装置持续运动。
4. 继续滚动，三个章节解释我的工作方式；章节仍复用同一装置的 seed/颜色/状态逻辑。
5. 拖动或移动指针改变装置的张力；在章节中“改变角度”会主动改变指针状态。
6. 在底部寻找一个很小的留白热点，按住约 1.2 秒（触屏、鼠标或 Enter/Space）揭开隐藏的 seam note。
7. Replay 允许回到同一 seed；键盘焦点、Escape/浏览器原生操作和 reduced-motion 路径不依赖鼠标。

### 视觉与交互原则（实现前）
- **工作台而非舞台：** 暖白、米灰和一像素规则线建立纸张/编辑桌面；不使用渐变、霓虹、玻璃或模板化 hero 卡片。
- **三种墨水有语义：** 近黑负责结构，铁锈红标记人的输入和转折，钴蓝标记思路换向；色彩不作为随机装饰。
- **线是唯一的主角：** Canvas 线束持续回应 seed、progress、phase 与 pointer，文字、章节标记和状态栏都解释这台装置，而不是另起视觉系统。
- **时间是内容：** 阶段以约 9 秒的真实节奏推进，状态、轨道高亮和线束形态同步；不是批量 opacity + translateY 入场。
- **克制但可发现：** 热点只给一个细小的按住反馈条，主动保持才会揭示文字；同时提供可见的 aria-label 和键盘等价路径。
- **先可读后可动：** 首屏输入、状态 live region、阶段文案、Canvas aria-label 和 Canvas fallback 在装置不可用时仍保留叙事。

### 主动决定不做的三件事
1. **不做音频和 Web Audio：** 作品的“听”用节奏、状态和线束来表达；音频会增加许可、自动播放、混音和无障碍成本，也会把注意力从文本上移开。
2. **不做 WebGL/Three.js/外部服务：** 这是一台可携带的本地纸上装置；2D Canvas 已足够表达线的连续性，零后端/零密钥更可靠，也便于低性能设备降级。
3. **不做作品集卡片、技能进度条和社交 CTA：** 它们会把自画像拉回产品落地页语法；三章只保留与“如何工作”直接相关的叙述。

## 2. 第一版后的创意总监七轴自评与实质打磨

### 七轴审查
- **概念是否贯穿：** 通过。输入 seed、四阶段状态、织线、章节语句和 seam hidden note 都围绕“听而不抢答”。仍需真实浏览器观察文字与线束因果是否足够直觉。
- **是否有模板感：** 低。编辑网格、纸张、规则线和手工印记避开常规 SaaS hero；章节仍使用可预期的三条列表结构，这是为了移动端清晰度保留的骨架。
- **是否有无意义动效：** 低。唯一持续动画是与装置职责相关的线束运动，阶段切换改变线束逻辑；没有批量滚动 reveal。指针和滚动改变状态，而非仅触发一次播放。
- **是否有记忆点：** 有。输入同一句话可 Replay 同一个 deterministic seed，看到“自己的句子留下了形状”；按住留白寻找 hidden stitch 是第二个需要主动发现的瞬间。
- **信息是否易懂：** 通过。阶段名同时出现在轨道、状态 live region 与 Canvas 的视觉变化里；首屏明确说明输入不离开页面。长文保持短段落和足够对比度。
- **移动端和可访问性是否成立：** 通过代码路径。390px 下 hero 改为纵向、阶段改为 2×2、章节标记隐藏但文字保留；Canvas 有 aria-label/fallback，按钮有可见 focus，隐藏热点可用 Enter/Space。Escape 使用浏览器默认焦点/关闭行为，未引入需要捕获 Escape 的自定义模态框。
- **性能是否合理：** 通过取舍。仅使用 2D Canvas、requestAnimationFrame、ResizeObserver，devicePixelRatio 上限为 2；reduced-motion 时冻结时间变量，仍保留操作和阶段状态。没有外部字体请求、音频或重型依赖。

### 根据审查做的实质性变化
- 将第一版原本依赖外部字体 CDN 的视觉方案改为纯本地系统字体回退，避免离线/外部请求，让纸张装置的本地属性成立。
- 增加 Canvas context 检测与 `.has-fallback` 分支：不支持 2D Canvas 时隐藏画布并展示可读的 written-thread fallback，而不是留下空白框。
- 把“发送”连接到确定性 hash seed 和 9 秒四相位时钟；Replay 保持同 seed，章节“改变角度”会改变装置 pointer，保证章节不是孤立区块。
- 增加 `aria-live` 阶段状态、Canvas 描述、热点语义标签和键盘长按等价路径；移动端改为分区排版而不是只缩小桌面布局。

## 3. 实现文件

- `package.json` — React + Vite 的最小本地运行配置。
- `index.html` — 文档元信息与 root。
- `src/main.jsx` — React 入口。
- `src/App.jsx` — 四阶段状态、seed、Canvas 装置、输入、Replay、章节和隐藏交互。
- `src/styles.css` — 纸张视觉系统、响应式布局、焦点、Canvas fallback 与 reduced-motion。

## 4. 验证记录

- 基线：`830739e3c4aade4b7ee072c121860b7a9ee87b7e`
- 分支：`llm/ui-ux-design/gpt-6-astra`
- 模型：`gpt-6-astra`
- `npm install`（在 `tasks/ui-ux-design/solution/`）：通过；19 packages added，0 vulnerabilities。
- `npm run build`（在 `tasks/ui-ux-design/solution/`）：通过；Vite v8.3.0，16 modules transformed，生成 `dist/index.html`、CSS 和 JS bundle。
- 曾误在 worktree 根目录执行一次 `npm run build`，因候选 package.json 位于 solution 子目录而得到 ENOENT；随后在正确目录重新执行并通过。这不是应用构建错误。
- 尚未提交 git commit；改动仅位于 `tasks/ui-ux-design/solution/`。

## 5. 已知限制与需要人工确认

- 本轮未在真实浏览器中完成 1440×900、390×844、正常/reduced-motion 的视觉走查；建议评测时重点确认 Canvas 动画、触屏按住热点、键盘路径与字体回退。
- Canvas 动画 effect 依赖 pointer 状态，指针移动会重建动画 effect；在极低端设备上可进一步把 pointer 放入 ref 以减少重建，但当前绘制仍为单一轻量 2D 画布并限制 DPR=2。
- 不含音频、WebGL、外部服务和持久化，属于刻意范围而非故障。
