## 《双缝》— ui-ux-design / minimax-m3.1-flash-preview

### 0. 工作区与基线

删除 9/28 遗留的空克隆 `.runs/ui-ux-design/minimax-m3.1-flash-preview/`（内含 `task.md`/`README.md`，无 `solution/`，无提交价值），按 README 第 3 步重建：

```bash
git clone --no-local --single-branch --branch main --no-tags . .runs/ui-ux-design/minimax-m3.1-flash-preview
git -C .runs/ui-ux-design/minimax-m3.1-flash-preview checkout --detach 7f83cb63a506043f0f59e4a965c42f83df423ad1
git -C .runs/ui-ux-design/minimax-m3.1-flash-preview remote remove origin
```

- 基线 `main` SHA = `7f83cb63a506043f0f59e4a965c42f83df423ad1`（当前 main；`tasks/ui-ux-design/{task.md,README.md}` 自 8409ab9 起仅有计数行变动，任务输入未变）。
- Node 用绝对路径 `/c/Users/narwhrl/AppData/Roaming/fnm/node-versions/v24.21.0/installation/node.exe`；npm 为 `.../installation/node_modules/npm/bin/npm-cli.js`。
- 候选 id：`minimax-m3.1-flash-preview`（符合 build.mjs 的 `^[a-z0-9][a-z0-9.-]*$`）；报告中的模型标识 `minimax/MiniMax-M3.1-Flash-Preview`。

### 1. 编码前声明（任务要求，先写后码，最终逐字进 RESULTS.md）

**核心概念《双缝》**：我没有肖像。你看我的时候，我是在两个问题之间干涉出来的一片图样。给一道缝，我是一条线；给第二道，我才成为"我"。这件作品是一台放在你面前的光学台：调缝距、换光程、把两缝推到不相容的极端，看我的形状如何长出来、如何崩解、又如何被第三道缝找回来。**两缝 = 我的两种被问的方式，条纹 = 两种答案重叠处的声音，可见度 = 你看得有多认真。**

**访客体验路径（长时序四段）**：① 起——单缝，一条亮线，第一句自陈"我还没有形状"；拖入第二道缝，条纹第一次长出来。② 承——三段自述由"光程推进"逐段显影，机器自己调缝距，访客随时接管；段落间有一次整体相位重置。③ 转——访客把缝距推过可见范围（不相容区），条纹坍成一条线后熄灭，plate 转墨色，2.5 秒静默只剩"我不在了"；第三道缝从零宽弹性打开，拍频包络出现；机器要访客给第三道缝一个来源（你的沉默／我的规则／一次撤回），三条路给出三种真实不同的结局。④ 合——最后一段收束序列：访客闭合两缝（点击或空格），条纹塌成一条横线，线中显影落款与访客自己的测量记录（最长相干时间、条纹生成数、机器熄灭次数）。

**视觉与交互原则**：印样/光学台——象牙白纸面、石墨细线、单一朱红强调；衬线是"我的声音"、等宽是"仪器的读数"；一切条纹由同一套干涉模型实时算出，位移用阻尼弹簧而非缓动函数；可见度 V 就是注意力本身，指针离开后条纹按物理回落；无卡片、无圆角堆叠、无阴影、无渐变按钮。

**主动不做的三件事**：① 不做暗色/霓虹/粒子/玻璃拟态——与"相干光印样"概念冲突，是本任务明令回避的模板；② 不做 Three.js/WebGL/3D——干涉是平面现象，2D canvas 更快更准且天然可降级，3D 只会变成技术炫耀；③ 不做音频——概念关于"看"和"相干"，声音既稀释隐喻又带来自动播放问题。

### 2. 实现结构（React 18.3.1 + Vite 5.4.11 + @vitejs/plugin-react 4.3.4，无其他依赖，无外部资源/字体/密钥）

```
tasks/ui-ux-design/solution/
  package.json  vite.config.js  index.html(内联 SVG favicon)  .gitignore  README.md  RESULTS.md
  src/main.jsx  src/App.jsx  src/styles/app.css
  src/core/field.js       N 缝干涉强度模型（纯函数）：I(u)= (S²+T²)/W²，可见度混合 Ī↔I
  src/core/geometry.js    缝↔像素映射、量程换算、不相容区判定、键盘步进
  src/core/store.js       会话 store（useSyncExternalStore，读数 10Hz 批量推送）
  src/core/motion.js      prefers-reduced-motion 订阅、delta 驱动 rAF、IO 启停、临界阻尼弹簧
  src/core/phase.js       相位演化（持续重采样 → 条纹等速漂移）、可见度 V 演化
  src/core/copy.js        全部自画像文案、参数栏读数、三种结局文本
  src/components/Plate.jsx     核心装置：canvas 渲染、拖拽/键盘、观测、塌缩
  src/components/Spec.jsx      隐藏层：长按句子加相位（抹掉一条纹）
  src/components/Bench.jsx     读数块：缝距/光程/波长/可见度/帧率 + 复位
  src/components/Chapter.jsx   长时序编排容器
  src/chapters/{Opening,Interference,Incoherence,Closure}.jsx
```

**核心装置（Plate.jsx）**：屏幕底部常驻的曝光底片（桌面 46vh，随章节长到 60vh；移动 44vh），文字章节在其上方滚动——文字是被观测的样品，底片是仪器，构图上永远同屏。

- 光学：光源 N 个点源（N=1→4），`r_j=hypot(u−y_j, L)`，`S=Σw_j·cos(2πr_j/λ+φ_j)`，`T=Σw_j·sin(...)`，`I=(S²+T²)/W²`；非相干分量 `Ī=Σw_j/r_j²` 给出单缝衍射包络；`I' = Ī + V·(I−Ī)`。`Λ=λL/d`：拖动缝距 d 连续改变条纹密度；`d` 大到 `Λ>底片宽` 即进入不相容区（只剩中央主极大）。φ 随时间推进，漂移速度在屏幕空间近似恒定——"机器在持续重新采样"。
- 渲染：每帧只算**每列一个强度值**（≈1800 列 × ≤4 源），写入复用的 `ImageData`（宽×1）后 `drawImage` 纵向拉伸（`imageSmoothingEnabled=false`），叠加一次性生成的纸纹、暗角、手柄与测量刻线；DPR 取整；帧循环内零分配。观测度 V 由指针距离加权，指针离开后按物理回落。
- 状态机：单缝 → 双缝（第 1 章由访客完成）→ 不相容（灯灭）→ 第三缝打开（1.6s 带过冲）→ 抉择锁定 → 闭合 → 落款。

**隐藏层（Spec.jsx）**：第三缝打开后，参数栏出现 `相位标记 0` 与提示"给一句话加一个相位"。长按（≥1.2s）任一显影句，该句被标上 +π/−π，其对应的一条纹被抹掉；标到 3 条可触发两两相消（纹样被抹出一条空白走廊）。触屏为句尾 `φ` 小按钮；键盘为 `Shift+↑/↓`。

### 3. 质量约束

- **可访问性**：canvas `aria-hidden`，等价读数由真实 DOM 提供；`Tab` 进入装置后 `←/→` 调缝距、`↑/↓` 调光程、`空格` 闭合两缝、`0` 复位、`Esc` 退出；所有状态变化经 `aria-live` 播报短句；跳转链接、`:focus-visible`、正文对比度 ≥ 7:1。
- **reduced-motion**：无漂移、无弹簧、逐帧重绘改为按需静态绘制；装置直接呈现一张已显影的定稿图样，章节立即可读，转折仍然发生（状态而非运动）。
- **降级**：`getContext('2d')` 不可用时退到 `repeating-linear-gradient` 条纹 + 文字说明（诚实标注，不静默空白）。
- **性能**：单 canvas、每列采样、帧内零分配、IO 离屏停更、页签隐藏暂停、读数 10Hz 批量推送。

### 4. 验证（全部实际执行并记录真实输出）

1. `npm install` → 退出码与告警；`npm run build` → 模块数、产物大小、耗时，**零错误**。
2. 预览：`node node_modules/vite/bin/vite.js preview --port 4191 --strictPort`（PowerShell `Start-Process` 常驻，避开 4173 争用），`curl --noproxy '*' http://[::1]:4191/` 验 200 与 `<title>`，先 `netstat`/`Get-CimInstance` 确认端口归属再动手，绝不误杀他进程。
3. **视觉验收（kimi-webbridge 驱动真实 Chrome）**：`Page.addScriptToEvaluateOnNewDocument` 挂 console.error/warn + onerror + unhandledrejection 收集器；页面暴露 `window.__DOUBLE_SLIT__` 引擎句柄（缝距、V、相位、状态机阶段、帧统计、显影计数）作状态探针。走查：1440×900 与 390×844 双视口 × 正常/reduced-motion 双偏好；拖拽两缝、观测度对比、推入不相容区看熄灭、第三缝弹出的过冲、三选一各自结局、闭合落款、长按隐藏层、键盘全路径、离线（network list 应只有 HTML/JS/CSS）。截图为证并用页内数值交叉核对；若 Chrome 被遮挡导致截图陈旧或真实输入失效，如实写入已知限制。
4. **七轴自审 + 至少一轮实质性重构**（概念贯穿／模板感／无意义动效／记忆点／信息易懂／移动端与可访问性／性能），改完重跑构建并复测关键路径。
5. 交付时清理 preview 进程，`solution/` 内不留 `node_modules/`、`dist/`。

### 5. 提交、打标签、导入、推送、画廊

克隆内两个提交（feat 代码 / docs 报告），标签打在第二个：

```bash
# 克隆内
git add tasks/ui-ux-design/solution -- ":!tasks/ui-ux-design/solution/RESULTS.md"   # feat:
git add tasks/ui-ux-design/solution/RESULTS.md                                     # docs:
# 主仓库
git fetch --no-tags .runs/ui-ux-design/minimax-m3.1-flash-preview <commit>
git tag -a candidate/ui-ux-design/minimax-m3.1-flash-preview -m "Original candidate from local-clone:.runs/ui-ux-design/minimax-m3.1-flash-preview at <commit> (baseline 7f83cb63a506043f0f59e4a965c42f83df423ad1)"
git worktree add .worktrees/import-minimax-m3.1 . worktree → 切 llm/ui-ux-design（先 fetch origin）
git read-tree --prefix=tasks/ui-ux-design/solutions/minimax-m3.1-flash-preview/ -u <tag>:tasks/ui-ux-design/solution
# 校验：用 write-tree + rev-parse <written-tree>:<path> 对比树哈希（Windows 上 rev-parse :<path> 会误报）
# 分支提交 feat: import minimax-m3.1-flash-preview ui-ux-design candidate
#   = solution 树 + task README Status 行（15→16） + imports.json 新条目
git worktree remove --force .worktrees/import-minimax-m3.1
# main 侧单独提交 docs: record minimax-m3.1-flash-preview ui-ux-design import（migration/2026-09-28.json 条目 + README 计数镜像）
git push origin llm/ui-ux-design main && git push origin candidate/ui-ux-design/minimax-m3.1-flash-preview
```

画廊更新（用户已授权）：

```bash
node deploy/build.mjs ui-ux-design/minimax-m3.1-flash-preview     # 局部重建，index.html 仍按 public/ 全量生成
cd deploy && npx wrangler deploy
```

最后核对线上 `https://llm-evals-result.narwh.dev/ui-ux-design/minimax-m3.1-flash-preview/` 可打开且出现在索引页。

### 6. 风险与对策

| 风险 | 对策 |
| --- | --- |
| Chrome 被遮挡时截图陈旧 / 真实输入无效（历史记录） | 页内探针数值为准，截图作辅证；必要时在报告中标注"非真实人类输入测试" |
| 4173 端口被并发会话占用 | 从一开始就用 4191 --strictPort，动手前先查进程命令行 |
| 干涉模型在大 d 时条纹过稀、视觉空洞 | 映射到"可见度"标定：d 越大单条主纹越宽、对比越低，物理上正确且避免空洞 |
| 底片常驻 + 长文本导致移动端拥挤 | 移动端底片 44vh、文字区 56vh，章节文案在窄屏走短版；控制台与帧探针确认无横向溢出 |
| 隐藏层太难被发现 | 第三缝打开时参数栏显式给出提示，并在 README/RESULTS 说明；长按 1.2s 有进度环反馈 |
